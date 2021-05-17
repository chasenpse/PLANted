import React from 'react';
import './Header.css';
import Overlay from "../Overlay/Overlay";
import Title from "../Title/Title";
import Nav from "./Nav/Nav";
import Logout from "./Logout/Logout";

const Header = ({menu}) => {

    return (
        <>
            {menu.navOpen ? <Overlay close={()=>menu.setNavOpen(false)} /> : null}
            <header className={menu.navOpen ? "open" : null}>
                <Title />
                <Nav close={()=>menu.setNavOpen(false)} />
                <Logout close={()=>menu.setNavOpen(false)} />
            </header>
        </>
    )
};

export default Header;