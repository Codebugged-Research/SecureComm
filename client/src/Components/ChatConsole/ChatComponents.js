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

export const Participants = styled.div`
    height: 100%;
    border-radius: 10px;
    box-shadow: 3px 0px 0px 0px #888888;
`

export const ChatSection  =styled.div``