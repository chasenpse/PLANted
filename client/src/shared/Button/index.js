import React from 'react';
import './Button.css';

const Button = ({className, text, handler}) => {
    return (
        <button className={className} onClick={e=>{e.preventDefault(); handler(e)}}>
            {text}
        </button>
    )
};

export default Button;