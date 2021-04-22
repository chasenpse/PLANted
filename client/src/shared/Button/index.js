import React from 'react';
import './Button.css';

const Button = ({className, text, handler, disabled}) => {
    return (
        <button
            className={className}
            onClick={e=>{
                e.preventDefault();
                handler(e)
            }}
            disabled={disabled}
        >
            {text}
        </button>
    )
};

export default Button;