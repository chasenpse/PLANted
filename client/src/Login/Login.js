import React, {useState, useEffect} from 'react';
import axios from "axios";
import LogInOutModal from "../shared/LogInOutModal/LogInOutModal";
import Button from "../shared/Button"
import {NavLink, useParams} from "react-router-dom";
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
    const [confirm, setConfirm] = useState();
    const [resend, setResend] = useState();

    const {token} = useParams()

    useEffect(()=> {
        if (token) {
            axios({
                method: "post",
                data: {
                    token
                },
                withCredentials: true,
                url: "http://localhost:5000/api/confirm",
            })
                .then(res => {
                    setConfirm("Your account has been verified")
                })
                .catch(err=>{
                    switch(err.response.status) {
                        case 401:
                            setError("Verification link expired, a new confirmation has been sent");
                            break;
                        case 403:
                            setError("Invalid verification link") //account is already verified
                            break;
                        default:
                            setError("Invalid verification link")
                            break;
                    }
                })
        }
    },[token])

    const sendValidationEmail = (e) => {
        e.preventDefault()
        axios({
            method: "put",
            data: {
                email: email.val
            },
            withCredentials: true,
            url: "http://localhost:5000/api/register/resend",
        }).then(res=>{
            setError(false)
            setConfirm("Please check your email for a confirmation")
            setResend(false)
        }).catch(err=> {
            setConfirm(false)
            switch (err.response.status) {
                case 401:
                    setError("Invalid email address")
                    break;
                default:
                    setError("An error occurred, please try again")
                    break;
            }
        })
    }

    const login = (e) => {
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
                setError(false);
                setConfirm(false);
                setUser(res.data)
            })
            .catch(err=>{
                switch(err.response.status) {
                    case 401:
                        setError("Invalid password")
                        break;
                    case 403:
                        setError("Your account is pending verification, please check your email")
                        setResend(true);
                        break;
                    default:
                        setError("An error occurred, please try again")
                        break;
                }
            })
    }

    return (
        <LogInOutModal>
            <form>
                {error ? <div className={"error"}>{error}</div> : null}
                {confirm ? <div className={"confirm"}>{confirm}</div> : null}
                {resend ? <div><button className={"resend"} onClick={e=>sendValidationEmail(e)}>Resend verification?</button></div> : null}
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
            <br />
            <NavLink exact to={'/reset'} className={'registerLink'}>
                Forgot password
            </NavLink>
        </LogInOutModal>
    )
}

export default Login;