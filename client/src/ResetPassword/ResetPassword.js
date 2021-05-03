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
    const [pass, setPass] = useState(false);
    const [confirmPass, setConfirmPass] = useState(false);

    const {token} = useParams()

    const sendResetEmail = (e) => {
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
            method: "put",
            data: {
                email: email.val,
            },
            withCredentials: true,
            url: `/api/reset`,
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

    const changePass = (e) => {
        setError(false)
        setConfirm(false)
        if (!pass.val || !confirmPass.val) {
            setError("Missing required fields")
            return;
        }
        if (pass.val.length < 8) {
            setError("Password must be at least 8 characters")
            return;
        }
        if (pass.val !== confirmPass.val) {
            setError("Passwords do not match")
            return;
        }
        axios({
            method: "post",
            data: {
                token,
                pass: pass.val,
            },
            withCredentials: true,
            url: `/api/reset`,
        })
            .then(res=>setConfirm("Password successfully updated!"))
            .catch(err=>{
                switch (err.response.status) {
                    case 401:
                        setError("Invalid request")
                        return;
                    case 403:
                        setError("Token expired")
                        return;
                    default:
                        setError("An error occurred, please try again")
                        return;
                }
            })
    }

    const renderForm = () => {
        if (token && token.length === 21) {
            return (
                <>
                    <input
                        type={"password"}
                        placeholder={"New Password"}
                        onChange={e=>setPass({...pass, val:e.target.value})}
                        onBlur={()=>setPass({...pass, dirty: true})}
                        required={true}
                    />
                    <input
                        type={"password"}
                        placeholder={"Confirm Password"}
                        onChange={e=>setConfirmPass({...confirmPass, val:e.target.value})}
                        onBlur={()=>setConfirmPass({...confirmPass, dirty: true})}
                        required={true}
                    />
                    <Button
                        text={"submit"}
                        handler={changePass}
                        disabled={confirm}
                    />
                </>
            )
        }
        return (
            <>
                <input
                    type={"email"}
                    placeholder={"Email Address"}
                    onChange={e=>setEmail({...email, val:e.target.value})}
                    onBlur={()=>setEmail({...email, dirty: true})}
                    required={true}
                />
                <Button
                    text={"reset"}
                    handler={sendResetEmail}
                    disabled={confirm}
                />
            </>
        )
    }

    return (
        <LogInOutModal>
            <form>
                {error ? <div className={"error"}>{error}</div> : null}
                {confirm ? <div className={"confirm"}>{confirm}</div> : null}
                {renderForm()}
            </form>
            <span className={'registerText'}>Already registered?</span>
            <NavLink exact to={'/login'} className={'registerLink'}>
                Log In
            </NavLink>
        </LogInOutModal>
    )
}

export default ResetPassword;