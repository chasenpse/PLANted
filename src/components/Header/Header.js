import React from 'react';
import './Header.css';
import Title from "./Title/Title";
import Nav from "./Nav/Nav";
import Logout from "./Logout/Logout";

const Header = () => {
    return (
        <header>
            <Title />
            <Nav />
            <Logout />
        </header>
    )
};

export default Header;