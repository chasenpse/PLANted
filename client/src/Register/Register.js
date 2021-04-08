import React, {useState} from 'react'
import './Register.css'
import axios from "axios";
import Title from "../shared/Title/Title";
import { NavLink, Redirect } from "react-router-dom";
import Button from "../shared/Button";

const Register = () => {
    const [email, setEmail] = useState();
    const [pass, setPass] = useState();
    const [confirmPass, setConfirmPass] = useState();

    const register = (e) => {
        e.preventDefault()
        if (pass===confirmPass) {
            axios({
                method: "post",
                data: {
                    email,
                    pass,
                    confirmPass,
                },
                withCredentials: true,
                url: "http://172.30.1.15:5000/api/register",
            })
                .then(res => console.log(res))
                .catch(err=>console.log(err))
        }
    }

    return (
        <div className={"loginContainer"}>
            <div className={'loginForm'}>
                <div className={'loginTitleContainer'}>
                    <Title/>
                </div>
                <form>
                    <input type={"email"} placeholder={"Email Address"} onChange={(e)=>setEmail(e.target.value)} />
                    <input type={"password"} placeholder={"Password"} onChange={(e)=>setPass(e.target.value)} />
                    <input type={"password"} placeholder={"Confirm Password"} onChange={(e)=>setConfirmPass(e.target.value)} />
                    <Button
                        text={"register"}
                        type={""}
                        handler={register}
                    />
                </form>
                <span className={'registerText'}>Already registered?</span>
                <NavLink exact to={'/login'} className={'registerLink'}>
                    Log In
                </NavLink>
            </div>
        </div>
    )
}

export default Register;