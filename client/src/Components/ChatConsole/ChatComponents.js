import styled from 'styled-components';

export const Section = styled.div`
    max-width: 1300px;
    height: 100vh;
`

export const Navbar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 10%;
    padding: 0px 30px;
    background-color: #0000FF;
    color: white;
`

export const NavbarBrand = styled.div`
    font-family: Georgia;
    font-size: 25px;
    transition: all 0.5s ease;

    &:hover{
        font-family: Nunito;
    }
`

export const Holder = styled.div`
    display: grid;
    grid-template-columns: 6fr 14fr;
    width: 100%;
    height: 90%;
`

export const Disclaimer = styled.div`
    display: flex;
    width: 100%;
    height: 90%;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    font-family: Nunito;
`

export const Participants = styled.div`
    height: 100%;
    border-radius: 5px;
    box-shadow: 3px 0px 0px 0px #888888;
    overflow: scroll;
`

export const Element = styled.div`
    width: 100%;
    padding: 5px;
    text-align: center;
    font-size: 18px;
    font-family: Nunito;
    cursor: pointer;
`

export const ChatSection = styled.div`
    position: relative;
`

export const Message = styled.div`
    width: 100%;
    padding: 15px;
    background-color: transparent;
    overflow: scroll;
`

export const MessagePanel = styled.div`
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #888888;
    margin-bottom: 5px;
` 

export const Writer = styled.div`
    position: absolute;
    width: 100%;
    bottom: 0;
    right:0;
    padding: 15px 10px 15px 10px;
    background-color: #0000FF;
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
    display: grid;
    grid-template-columns: 2fr 6fr 2fr;
    grid-gap: 5px;
`

export const ButtonAS = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
    font-size: 15px;
    font-family: Nunito;
    padding: 10px;
    outline: none !important;
    color: white;
`