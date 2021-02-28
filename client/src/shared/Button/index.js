import React from 'react';
import './Button.css';

const Button = ({type, text, handler}) => {
    return (
        <button className={`btn ${type}`} onClick={e=>{e.preventDefault(); handler(e)}}>
            {text}
        </button>
    )
};

export default Button;