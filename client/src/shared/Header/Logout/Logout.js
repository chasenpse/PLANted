import React, {useContext} from 'react';
import Button from "../Nav/Button/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import {UserContext} from "../../../UserContext";

const Logout = () => {
    const {setUser} = useContext(UserContext)

    const logout = (e) => {
        e.preventDefault()
        axios({
            method: "get",
            withCredentials: true,
            url: `/api/logout`,
        })
            .then(res => res.data ? setUser(false):null)
            .catch(err=>console.log(err))

    }

    return (
        <Link to={'/logout'} className={'navBtn'}>
            <Button name={"Logout"} action={e=>logout(e)} />
        </Link>
    )
}

export default Logout;