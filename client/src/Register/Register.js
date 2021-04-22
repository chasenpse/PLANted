import React, {useState} from 'react'
import axios from "axios";
import LogInOutModal from "../shared/LogInOutModal/LogInOutModal";
import { NavLink } from "react-router-dom";
import Button from "../shared/Button";
import {validateEmail} from "../utils/validate";

const Register = () => {
    const [email, setEmail] = useState({
        val: null,
        dirty: false,
    });
    const [pass, setPass] = useState({
        val: null,
        dirty: false,
    });
    const [confirmPass, setConfirmPass] = useState({
        val: null,
        dirty: false,
    });

    const [error, setError] = useState();
    const [confirm, setConfirm] = useState(false)

    const register = (e) => {
        e.preventDefault()
        setError(false)
        if (!email.val || !pass.val || !confirmPass.val) {
            setError("Missing required fields")
            return;
        }
        if (!validateEmail(email.val)) {
            setError("Invalid email format")
            return;
        }
        if (pass.val !== confirmPass.val) {
            setError("Passwords do not match")
            return;
        }
        if (pass.val.length < 8) {
            setError("Password must be at least 8 characters")
            return;
        }
        axios({
            method: "post",
            data: {
                email: email.val,
                pass: pass.val,
            },
            withCredentials: true,
            url: "http://localhost:5000/api/register",
        })
            .then(res => setConfirm(res.data))
            .catch(err=>{
                switch(err.response.status) {
                    case 409:
                        setError("Account already exists")
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
                {confirm ? <div className={"confirm"}>Please check your email for a confirmation</div> : null}
                <input
                    type={"email"}
                    placeholder={"Email Address"}
                    onChange={(e)=>setEmail({...email, val: e.target.value})}
                    onBlur={()=>setEmail({...email, dirty: true})}
                    required={true}
                />
                <input
                    type={"password"}
                    placeholder={"Password"}
                    onChange={(e)=>setPass({...pass, val: e.target.value})}
                    onBlur={()=>setPass({...pass, dirty: true})}
                    required={true}
                />
                <input
                    type={"password"}
                    placeholder={"Confirm Password"}
                    onChange={(e)=>setConfirmPass({...confirmPass, val:e.target.value})}
                    onBlur={()=>setConfirmPass({...confirmPass, dirty: true})}
                    required={true}
                />
                <Button
                    text={"register"}
                    type={""}
                    handler={register}
                    disabled={confirm}
                />
            </form>
            <span className={'registerText'}>Already registered?</span>
            <NavLink exact to={'/login'} className={'registerLink'}>
                Log In
            </NavLink>
        </LogInOutModal>
    )
}

export default Register;