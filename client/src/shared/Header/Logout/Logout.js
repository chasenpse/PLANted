import React from 'react';
import Button from "../Nav/Button/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { Route, Redirect } from 'react-router-dom';

const Logout = () => {

    const logout = (e) => {
        e.preventDefault()
        axios({
            method: "get",
            withCredentials: true,
            url: "http://172.30.1.15:5000/api/logout",
        })
            .then(res => console.log(res.data))
            .catch(err=>console.log(err))
    }

    return (
        <Link to={'/logout'} className={'navBtn'}>
            <Button name={"Logout"} action={e=>logout(e)} />
        </Link>
    )
}

export default Logout;