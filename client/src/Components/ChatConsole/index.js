import React, { useState, useRef, useEffect } from 'react';
import immer from "immer";
import io from 'socket.io-client';
import {
    Section,
    Navbar,
    NavbarBrand,
    Holder,
    Disclaimer,
    Participants,
    Element,
    ChatSection,
    Message,
    MessagePanel,
    Writer,
    ButtonAS
} from './ChatComponents';
import { BiLogOut } from 'react-icons/bi';
import { signout } from '../../helpers/auth.helpers';
import {
    Input
} from '@material-ui/core';
import {
    AiOutlineSend
} from 'react-icons/ai';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { 
    Stack,
    Input as I,
    FormControl,
    FormLabel,
    Progress,
    Center,
    Button,
    toast
} from '@chakra-ui/react';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ChatConsole({history}) {

    const initialMessagesState = {
    }

    const [formData, setFormData] = useState('')
    const [progressPercent, setProgressPercent] = useState(0)
    const [error, setError] = useState({
        found: false,
        message:''
    })

    const upload = ({target: {files}}) => {
        let data = new FormData()
        data.append('fileSend', files[0])
        setFormData(data)
    }

    const onSubmitFile = (e) => {
        e.preventDefault();
        setProgressPercent(0)
        const options = {
            onUploadProgress: (progressEvent) => {
                const {loaded, total} = progressEvent
                let percent = Math.floor((loaded * 100)/total)
                setProgressPercent(percent)
            }
        }
        axios.post(`${process.env.REACT_APP_SEND_FILE}/uploadFile`, formData, options)
        .then((res) => {
            setTimeout(() => {
                setProgressPercent(0)
                setOpen(false);
            }, 1000)
            toast.success("File Sent Successfully!")
        })
        .catch(err => {
            setError({
                found: true,
                message:err.response.data.err
            })
            setTimeout(() => {
                setError({
                    found: false,
                    message:''
                })
                setProgressPercent(0);
            }, 3000)
        })
    }

    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState(localStorage.getItem("user"));
    const [connected, setConnected] = useState(true);
    const [allUsers, setAllUsers] = useState([]);
    const [currentChat, setCurrentChat] = useState({chatName: "", receiverId: ""});
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState(initialMessagesState);
    const socketRef = useRef();

    function handleMessageChange(e){
        setMessage(e.target.value);
    }

    function sendMessage(){
        if(message !== "" && currentChat.chatName !== ""){
            const payload = {
                message: message,
                to: currentChat.receiverId,
                sender: username,
                chatName:  currentChat.chatName
            }

            socketRef.current.emit("sendMessage", payload);
            const newMessages = immer(messages, draft => {
                draft[currentChat.chatName].push({
                    sender: "You",
                    message: message
                })
            })
            setMessages(newMessages);
        }
    }

    function toggleChat(currentChat) {
        if(!messages[currentChat.chatName]){
            const newMessages = immer(messages, draft => {
                draft[currentChat.chatName] = [];
            });
            setMessages(newMessages);
        }
        setCurrentChat(currentChat);
    }

    const logout = () => {
        signout();
        history.push('/login');
    }

    function renderUsers(user) {
        if(user.id === socketRef.current.id){
        } else {
            const currentChat = {
                chatName: user.username,
                receiverId: user.id
            }

            return (
                <Element onClick={() => {toggleChat(currentChat)}} key={user.id}>
                    {user.username}
                </Element>
            )
        }
    }

    function renderMessages(message, index) {
        return(
            <MessagePanel key={index}>
                <h3>{message.sender}</h3>
                <p>{message.message}</p>
            </MessagePanel>
        )
    }

    useEffect(() => {
        socketRef.current = io.connect("http://localhost:3001");

        socketRef.current.on("newUser", alluser => {
            setAllUsers(alluser);
        })
        socketRef.current.emit("joinedChat", username);
        socketRef.current.on("newMessage", ({message, sender, chatName}) => {
            setMessages(messages => {
                const newMessages = immer(messages, draft => {
                    if(draft[chatName]){
                        draft[chatName].push({message, sender});
                    } else {
                        draft[chatName] = [{message, sender}];
                    }
                })
                return newMessages;
            })
        })
    },[connected, username])

    useEffect(() => {
        setMessage("");
    }, [messages])

    return (
        <Section>
            <Navbar>
                <NavbarBrand>Secure Communication</NavbarBrand>
                <BiLogOut style={{fontSize: "25px", cursor: "pointer"}} onClick={logout} />
            </Navbar>
            {connected ? 
                <Holder>
                    <Participants id="joined">
                        {
                            allUsers.length > 1 ? 
                                allUsers.map(renderUsers)
                            :
                                <Disclaimer>
                                    No one else is here!
                                </Disclaimer> 
                        }
                    </Participants>
                    <ChatSection>
                        <Message>
                            {
                                currentChat.chatName !== "" ? messages[currentChat.chatName].map(renderMessages) : null
                            }
                        </Message>
                        <Writer>
                            <ButtonAS onClick={() => {setOpen(true)}}>Attach File</ButtonAS>
                            <Input
                                value={message}
                                onChange={handleMessageChange}
                                variant="outlined"
                                style={{backgroundColor:"white", borderRadius: "5px", padding: "5px"}}
                            />
                            <ButtonAS><AiOutlineSend style={{fontSize: "20px"}} onClick={sendMessage}/></ButtonAS>
                        </Writer>
                    </ChatSection>
                </Holder>
            : 
                <Disclaimer>
                    You are not connected to the server.
                </Disclaimer>
            }
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => {setOpen(false)}}
                fullWidth
            >
                <DialogTitle>{"Select File To Send"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                    {error.found && <div className="alert alert-danger mt-2" role="alert" >{error.message}</div>}
                    <form onSubmit={onSubmitFile} autoComplete="off" >
                        <Stack spacing={5} pt={4}>
                        <Progress value={progressPercent} colorScheme="purple">{progressPercent}</Progress>
                            <FormControl>
                                <FormLabel>Profile Picture</FormLabel>
                                <I type='file'name='profilePic' placeholder="Choose an image" variant="flushed" focusBorderColor="purple.400" onChange={upload}/>
                            </FormControl>
                            <Center>
                                <Button type="submit" style={{backgroundColor: "#0000FF"}} color="white" w={["100%", "75%"]}>Upload</Button>
                            </Center>
                        </Stack>
                    </form> 
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </Section>
    )
}

export default ChatConsole;