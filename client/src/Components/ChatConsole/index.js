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
    useToast
} from '@chakra-ui/react';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ChatConsole({history}) {

    const initialMessagesState = {}
    const toastId = "test-toast";
    const [fileOriginal, setFileOriginal] = useState('');
    const [formData, setFormData] = useState('')
    const [progressPercent, setProgressPercent] = useState(0)
    const [error, setError] = useState({
        found: false,
        message:''
    })

    const upload = ({target: {files}}) => {
        let data = new FormData()
        data.append('fileSend', files[0])
        setFileOriginal(files[0].name);
        setFormData(data)
    }

    const handleOpen = () => {
        if(currentChat.chatName !== ""){
            setOpen(true);
        } else {
            if(!toast.isActive(toastId)){
                toast({
                    id: toastId,
                    description: "Select A Person To Send The File To",
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                    status: "error"
                })
            }
        }
    }

    const handleClose = () => {
        setOpen(false);
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
                setProgressPercent(0);
                handleClose();
            }, 1000)
            sendFileMessage(`I have sent a file ${fileOriginal}`, fileOriginal, res.data.sendFile);
        })
        .catch(err => {
            setError({
                found: true,
                message: err.response.data.err
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

    const toast = useToast();
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

    function handleKeyDown(e){
        if(e.keyCode === 13){
            sendMessage();
        }
    }

    function activeChat() {
        var childrenElem = [...document.getElementById("joined").children]

        childrenElem.forEach((elem) => {
            if(elem.id === currentChat.receiverId){
                document.getElementById(`${elem.id}`).style.backgroundColor = "#d1d0cd";
            } else {
                document.getElementById(`${elem.id}`).style.backgroundColor = "white";
            }
        })
    }

    function sendFileMessage(message, fileOriginal, fileName) {
        if(message !== "" && currentChat.chatName !== ""){
            const payloadFile = {
                message: message,
                type:"file",
                name: fileOriginal,
                fileName: fileName,
                to: currentChat.receiverId,
                sender: username,
                chatName: currentChat.chatName
            }

            socketRef.current.emit("sendMessage", payloadFile);
            const newMessage = immer(messages, draft => {
                draft[currentChat.chatName].push({
                    sender: "You",
                    message: message
                })
            })
            setMessages(newMessage);
        }
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
            setMessage("");
        }
    }

    function toggleChat(currentChat) {
        if(!messages[currentChat.chatName]){
            const newMessages = immer(messages, draft => {
                draft[currentChat.chatName] = [];
            });
            setMessages(newMessages);
        }
        activeChat();
        setCurrentChat(currentChat);
    }

    const logout = () => {
        signout();
        history.push('/login');
    }

    function renderUsers(user) {
        if(user.id === socketRef.current.id){
        } else {
            const currentChatc = {
                chatName: user.username,
                receiverId: user.id
            }

            return (
                <Element id={`${user.id}`} style={currentChat.chatName !== "" ?  currentChat.receiverId === user.id ? {backgroundColor: "#d1d0cd"} : null : null} onClick={() => {toggleChat(currentChatc)}} key={user.id}>
                    {user.username}
                </Element>
            )
        }
    }

    function downloadFile(original, fileName) {
        axios({
            method: "POST",
            url: `${process.env.REACT_APP_SEND_FILE}/getFile`,
            responseType: "blob",
            headers: {},
            data:{
                original: original,
                fileName: fileName
            },
        })
        .then((res) => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `${original}`);
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(url);
            })
        .catch((err) => {
            toast({
                title: "File Download Failed",
                position: "bottom",
                duration: 3000,
                isClosable: true,
                status: "error"
            })
        })
    }

    function renderMessages(message, index) {
        return(
            <MessagePanel key={index} style={message.sender === "You" ? {textAlign: "end"} : {textAlign: "start"}} onClick={message.type ? () => {downloadFile(message.name, message.fileName)} : null} >
                <h3 style={{fontSize: "18px"}}>{message.sender}</h3>
                <p style={message.type ? {cursor: "pointer"} : null}>{message.message}</p>
            </MessagePanel>
        )
    }

    useEffect(() => {
        socketRef.current = io.connect("https://securecomm.tk:443");

        socketRef.current.on("newUser", alluser => {
            setAllUsers(alluser);
        })
        socketRef.current.emit("joinedChat", username);
        socketRef.current.on("newMessage", ({message, sender, chatName, type, name, fileName}) => {
            setMessages(messages => {
                const newMessages = immer(messages, draft => {
                    if(draft[chatName]){
                        draft[chatName].push({message, type, name, fileName, sender});
                    } else {
                        draft[chatName] = [{message, type, name, fileName, sender}];
                    }
                })
                return newMessages;
            })
        })
    },[connected, username])

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
                            <ButtonAS onClick={handleOpen}>Attach File</ButtonAS>
                            <Input
                                value={message}
                                onChange={handleMessageChange}
                                variant="outlined"
                                style={{backgroundColor:"white", borderRadius: "5px", padding: "5px"}}
                                onKeyDown={handleKeyDown}
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
                                <FormLabel>File To Be Sent</FormLabel>
                                <I type='file'name='profilePic' placeholder="Choose an file" variant="flushed" focusBorderColor="purple.400" onChange={upload}/>
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