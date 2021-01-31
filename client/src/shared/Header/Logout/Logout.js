import React from 'react';
import Button from "../Button/Button";
import { Link } from "react-router-dom";

const Logout = () => {
    return (
        <Link to={'/logout'} className={'navBtn'}><Button name={"Logout"} /></Link>
    )
}

export default Logout;