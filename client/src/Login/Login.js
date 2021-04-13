import React, {useState} from 'react';
import './Login.css'
import axios from "axios";
import Title from "../shared/Title/Title";
import Button from "../shared/Button"
import { NavLink } from "react-router-dom";
import {validateEmail} from "../utils/validate";

const Login = ({setUser}) => {

    const [email, setEmail] = useState({
        val: null,
        dirty: false,
    });
    const [pass, setPass] = useState({
        val: null,
        dirty: false,
    });
    const [error, setError] = useState();

    const login = (e) => {
        e.preventDefault();
        if (!email.val || !pass.val) {
            setError("Missing required fields")
            return;
        }
        if (!validateEmail(email.val)) {
            setError("Invalid email format")
            return;
        }
        axios({
            method: "post",
            data: {
                email: email.val,
                pass: pass.val,
            },
            withCredentials: true,
            url: "http://localhost:5000/api/login",
        })
            .then(res => {
                setUser(res.data)
            })
            .catch(err=>{
                switch(err.response.status) {
                    case 401:
                        setError("Invalid password")
                }
            })
    }

    return (
        <div className={"loginContainer"}>
            <div className={'loginForm'}>
                <div className={'loginTitleContainer'}>
                    <Title />
                </div>
                <form>
                    {error ? <div className={"error"}>{error}</div> : null}
                    <input
                        type={"email"}
                        placeholder={"Email Address"}
                        onChange={e=>setEmail({...email, val:e.target.value})}
                        onBlur={()=>setEmail({...email, dirty: true})}
                        required={true}
                    />
                    <input
                        type={"password"}
                        placeholder={"Password"}
                        onChange={(e)=>setPass({...pass, val:e.target.value})}
                        onBlur={()=>setPass({...pass, dirty: true})}
                        required={true}
                    />
                    <Button
                        text={"log in"}
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