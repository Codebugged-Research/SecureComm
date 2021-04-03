import React from 'react';
import {
    Section,
    Navbar,
    NavbarBrand,
    Holder,
    Participants,
    ChatSection
} from './ChatComponents';
import { BiLogOut } from 'react-icons/bi';
import { signout } from '../../helpers/auth.helpers';

function ChatConsole({history}) {

    const logout = () => {
        signout();
        history.push('/login');
    }

    return (
        <Section>
            <Navbar>
                <NavbarBrand>Secure Communication</NavbarBrand>
                <BiLogOut style={{fontSize: "25px", cursor: "pointer"}} onClick={logout} />
            </Navbar>
            <Holder>
                <Participants id="joined"></Participants>
                <ChatSection></ChatSection>
            </Holder>
        </Section>
    )
}

export default ChatConsole;