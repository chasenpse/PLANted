import React from 'react';
import './Header.css';
import Overlay from "../Overlay/Overlay";
import Title from "../Title/Title";
import Nav from "./Nav/Nav";
import Logout from "./Logout/Logout";

const Header = ({menu}) => {

    return (
        <>
            {menu.navOpen ? <Overlay /> : null}
            <header className={menu.navOpen ? "open" : null}>
                <Title />
                <Nav close={()=>menu.setNavOpen(false)} />
                <Logout />
            </header>
        </>
    )
};

export default Header;