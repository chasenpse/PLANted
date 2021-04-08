import React, {useState} from 'react';
import './Login.css'
import axios from "axios";
import Title from "../shared/Title/Title";
import Button from "../shared/Button"
import { NavLink } from "react-router-dom";

const Login = ({user, setUser}) => {

    const [email, setEmail] = useState();
    const [pass, setPass] = useState();

    const login = (e) => {
        e.preventDefault()
        axios({
            method: "post",
            data: {
                email,
                pass,
            },
            withCredentials: true,
            url: "http://172.30.1.15:5000/api/login",
        })
            .then(res => {
                console.log("blehhhhh",res.data)
                setUser(res.data)
            })
            .catch(err=>console.log(err))
    }

    return (
        <div class={"loginContainer"}>
            <div className={'loginForm'}>
                <div className={'loginTitleContainer'}>
                    <Title />
                </div>
                <form>
                    <input type={"email"} placeholder={"Email Address"} onChange={(e)=>setEmail(e.target.value)} />
                    <input type={"password"} placeholder={"Password"} onChange={(e)=>setPass(e.target.value)} />
                    <Button
                        text={"log in"}
                        type={""}
                        handler={login}
                    />
                </form>
                <span className={'registerText'}>Don't have an account?</span>
                <NavLink exact to={'/register'} className={'registerLink'}>
                    Create account
                </NavLink>
            </div>
        </div>
    )
}

export default Login;