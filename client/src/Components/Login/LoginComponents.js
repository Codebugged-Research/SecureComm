import styled from 'styled-components';

export const Section = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 1300px;
    height: 100%;
    padding: 50px;
    // background-color: #a4ebf3;
`

export const Holder = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 15px;
    width: 100%;
    min-height: 500px;
    box-shadow: 1px 2px 2px 3px #888888;
    border-radius: 10px;
    overflow: hidden;
    transition: all 1s ease-in-out;
`

export const  DetailComponent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px 10px;
    flex-direction: column;
    background-color: blue;
`

export const AuthComponent = styled.div`
    padding: 30px 20px; 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
`

export const Heading = styled.div`
    width: 100%;
    text-align: center;
    font-family: Georgia, sans-serif;
    font-size: 40px;
`

export const Description = styled.div`
    font-family: Nunito, sans-serif;
    font-family: 24px;
    color: white;
    text-align: center;
    line-height: 1.6em;
`

export const FormContainer = styled.div`
    margin-top: 15px;
    width: 100%;
    padding: 0px 25px;
`

export const Button = styled.button`
    display: flex;
    margin-top: 25px;
    width: 75%;
    text-align: center;
    border-radius: 50px;
    background: #0575e6; /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #0575e6, #021b79); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #0575e6, #021b79); 
    margin-left: auto;
    margin-right: auto;
    align-self: center;
    padding: 8px;
    color: white;
    font-family: Nunito, sans-serif;
    font-size: 18px;
    border: none;
    justify-content: center;
    outline: none;
    
    &:hover{
        cursor: pointer;
        box-shadow: 2px 4px #888888;
        transition: all 0.3s ease;
    }
`

export const TextPara = styled.div`
    width: 100%;
    text-align: center;
    font-family: Nunito, sans-serif;
    font-family: 18px;
    margin: 30px 0px 30px 0px;
`

export const ButtonShort = styled.button`
    padding: 20px 30px;
    width: 15%;
    text-align: center;
    margin: 0px auto;
    border-radius: 50px;
    color: #0575e6;
    box-shadow: -3px 3px #D5D5D5;
    padding: 5px;
    background-color:  white;
    outline: none;
    border: none;

    &:hover{
        cursor: pointer;
        box-shadow: 2px 4px #888888;
        transition: all 0.7s ease;
    }
`

export const Footer = styled.div`
    position: absolute;
    bottom: 0;
    padding: 10px;
    border-top: 2px solid #888888;
    width: 65%;
`
