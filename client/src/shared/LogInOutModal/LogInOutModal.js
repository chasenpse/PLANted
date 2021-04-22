import React from 'react';
import './LogInOutModal.css'
import Title from "../Title/Title";

const LogInOutModal = ({children}) => {
    return (
        <div className={"loginContainer"}>
            <div className={'loginForm'}>
                <div className={'loginTitleContainer'}>
                    <Title />
                </div>
                {children}
            </div>
        </div>
    );
}

export default LogInOutModal;