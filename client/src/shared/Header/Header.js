import React from 'react';
import './Header.css';
import Overlay from "../Overlay/Overlay";
import Title from "../Title/Title";
import Nav from "./Nav/Nav";
import Logout from "./Logout/Logout";
import MobileNav from "../MobileNav";

const Header = ({menu}) => {

    return (
        <>
            {menu.navOpen ? <Overlay style={{zIndex: 50}} close={()=>menu.setNavOpen(false)} /> : null}
            <header onClick={e=>e.stopPropagation()} className={menu.navOpen ? "open" : null}>
                <MobileNav menu={menu} />
                <Title />
                <Nav close={()=>menu.setNavOpen(false)} />
                <Logout close={()=>menu.setNavOpen(false)} />
            </header>
        </>
    )
};

export default Header;