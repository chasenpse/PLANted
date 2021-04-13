import React, {useState} from 'react'
import './Register.css'
import axios from "axios";
import Title from "../shared/Title/Title";
import { NavLink } from "react-router-dom";
import Button from "../shared/Button";

const Register = ({setUser}) => {
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
                },
                withCredentials: true,
                url: "http://localhost:5000/api/register",
            })
                .then(res => setUser(res.data))
                .catch(err=>console.log(err))
        } else if (pass.length < 8) {
            console.log("pass not long")
        } else if (pass!==confirmPass) {
            console.log("passes dont match")
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