import React, { useState } from 'react';
import {
    Section,
    Holder, 
    DetailComponent,
    AuthComponent,
    Heading,
    Description,
    FormContainer,
    Button,
    TextPara,
    ButtonShort,
    Footer
} from './LoginComponents';
import TextField from '@material-ui/core/TextField';
import {
    FaGooglePlusG
} from 'react-icons/fa';
import { 
    GoogleLogin
} from 'react-google-login';
import axios from 'axios';
import { authenticate } from '../../helpers/auth.helpers';
import { useToast } from '@chakra-ui/react';

function Login(){

    const [disInd, setDisInd] = useState(true);
    const toast = useToast();

    const handleSignIn = (e) => {
        e.preventDefault();

        axios.post(`${process.env.REACT_APP_AUTH}/login`,{
            email: e.target[0].value,
            password: e.target[1].value
        })
        .then((res) => {
            if(res.data.response === 1){
                authenticate(res);
                toast({
                    title: "Login Succesfull",
                    description: "Redirecting to Chat console...",
                    status: "success",
                    duration: 3000,
                    position: "top",
                    isClosable: true
                })
            }else{
                toast({
                    title: "Error",
                    description: "Invalid Email or Password",
                    duration: 3000,
                    position: "top",
                    status: "error",
                    isClosable: true
                })
            }
        })
        .catch((err) => {
            toast({
                title: "Error",
                description: "Please try again after some time.",
                status: "error",
                isClosable: true,
                duration: 3000,
                position: "top"
            })
        })
    }

    const handleSignUp = (e) => {
        e.preventDefault();

        axios.post(`${process.env.REACT_APP_AUTH}/signUp`,{
            name: e.target[0].value,
            email: e.target[1].value,
            password: e.target[2].value, 
        })
        .then((res) => {
            if(res.data.response === 1){
                authenticate(res);
                toast({
                    title: "Signup successfull",
                    description: "Redirecting to Chat console...",
                    status: "success",
                    isClosable: true,
                    duration: 3000,
                    position: "top"
                })
            } else {
                toast({
                    title: "Error",
                    description: "User with this email already exists",
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                    status: "error"
                })
            }
        })
        .catch((err) => {
            toast({
                title: "Error",
                description: "Please try again after some time.",
                status: "error",
                isClosable: true,
                duration: 3000,
                position: "top"
            })
        })
    }

    const toggleDisplay = () => {
        setDisInd(!disInd);
    }

    const responseGoogle = (response) => {
        console.log(response);
    }

    return(
        <Section>
            <Holder>
                <DetailComponent>
                    <Heading style={{color: "white"}}>Secure Communication</Heading>
                    <Description>This project is aimed at providing a secure communication and file sharing mechanism to avoid any theft of information and mantaining user privacy.</Description>
                    <Description>
                        Made By - Vasu Pandey | Sajal Gupta | Yash Goel<br/>
                        B.tech CSE specialization in cyber security and forensics - 3rd Year<br/>
                        Mentor - Amandeep saini
                    </Description>
                </DetailComponent>
                <AuthComponent style={{display: disInd ? "flex" : "none"}}>
                    <Heading>Sign In</Heading>
                    <FormContainer>
                        <form onSubmit={handleSignIn}>
                            <TextField
                                fullWidth
                                required
                                name="email"
                                placeholder="Your E-mail"
                                label="Email"
                                type="email"
                                autoComplete="off"
                                style={{marginBottom: "25px"}}
                            />
                            <TextField
                                fullWidth
                                required
                                name="password"
                                placeholder="Your Password"
                                label="Password"
                                type="password"
                                autoComplete="off"
                            />
                            <Button type="submit">
                                Sign In
                            </Button>
                        </form>
                    </FormContainer>
                    <TextPara>or Sign in with</TextPara>
                    <GoogleLogin
                        clientId="15093828558-7g0ev4kaseu5qhfnsro3bpmi32jifs4r.apps.googleusercontent.com"
                        render={renderProps => (
                            <ButtonShort onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                <FaGooglePlusG style={{width: "100%"}}/>
                            </ButtonShort>
                        )}
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />

                    <Footer>
                        <TextPara style={{margin: "0px"}}>Not A Member? <span style={{color: "#0575e6", cursor: "pointer"}} onClick={toggleDisplay}>Sign Up</span></TextPara>
                    </Footer>
                </AuthComponent>
                <AuthComponent style={{display: disInd ? "none" : "flex"}}>
                <Heading>Sign Up</Heading>
                    <FormContainer>
                        <form onSubmit={handleSignUp}>
                            <TextField
                                fullWidth
                                required
                                name="name"
                                placeholder="Your Name"
                                label="Name"
                                type="text"
                                autoComplete="off"
                                style={{marginBottom: "20px"}}
                            />
                            <TextField
                                fullWidth
                                required
                                name="email"
                                placeholder="Your E-mail"
                                label="Email"
                                type="email"
                                autoComplete="off"
                                style={{marginBottom: "20px"}}
                            />
                            <TextField
                                fullWidth
                                required
                                name="password"
                                placeholder="Your Password"
                                label="Password"
                                type="password"
                                autoComplete="off"
                            />
                            <Button type="submit">
                                Sign Up
                            </Button>
                        </form>
                    </FormContainer>
                    <TextPara style={{margin: "20px 0px"}}>or Sign up using</TextPara>
                    <GoogleLogin
                        clientId="15093828558-7g0ev4kaseu5qhfnsro3bpmi32jifs4r.apps.googleusercontent.com"
                        render={renderProps => (
                            <ButtonShort onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                <FaGooglePlusG style={{width: "100%"}}/>
                            </ButtonShort>
                        )}
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                    <Footer>
                        <TextPara style={{margin: "0px"}}>Already A Member? <span style={{color: "#0575e6", cursor: "pointer"}} onClick={toggleDisplay}>Sign In</span></TextPara>
                    </Footer>
                </AuthComponent>
            </Holder>
        </Section>
    )
}

export default Login;