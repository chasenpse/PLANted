import React from 'react';
import './Header.css';
import Backdrop from "../Backdrop/Backdrop";
import Title from "./Title/Title";
import Nav from "./Nav/Nav";
import Logout from "./Logout/Logout";

const Header = ({menu}) => {
    return (
        <>
            {menu.navOpen ? <Backdrop /> : null}
            <header className={menu.navOpen ? "open" : null}>
                <Title />
                <Nav close={()=>menu.setNavOpen(false)} />
                <Logout />
            </header>
        </>
    )
};

export default Header;