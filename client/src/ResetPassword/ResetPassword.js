import React, {useState} from 'react';
import axios from "axios";
import LogInOutModal from "../shared/LogInOutModal/LogInOutModal";
import {NavLink, useParams} from "react-router-dom";
import Button from "../shared/Button";
import {validateEmail} from "../utils/validate";

const ResetPassword = () => {

    const [email,setEmail] = useState(false);
    const [error, setError] = useState(false);
    const [confirm, setConfirm] = useState(false);

    const {token} = useParams()

    const reset = (e) => {
        setError(false)
        setConfirm(false)
        if (!email.val) {
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
            },
            withCredentials: true,
            url: "http://localhost:5000/api/reset",
        })
            .then(res=>{
                setError(false)
                setConfirm("An email has been sent, click the link to update your password")
            })
            .catch(err=>{
                setConfirm(false)
                setError("An error occurred, please try again")
            })
    }

    return (
        <LogInOutModal>
            <form>
                {error ? <div className={"error"}>{error}</div> : null}
                {confirm ? <div className={"confirm"}>{confirm}</div> : null}
                <input
                    type={"email"}
                    placeholder={"Email Address"}
                    onChange={e=>setEmail({...email, val:e.target.value})}
                    onBlur={()=>setEmail({...email, dirty: true})}
                    required={true}
                />
                <Button
                    text={"reset"}
                    handler={reset}
                />
            </form>
            <span className={'registerText'}>Already registered?</span>
            <NavLink exact to={'/login'} className={'registerLink'}>
                Log In
            </NavLink>
        </LogInOutModal>
    )
}

export default ResetPassword;