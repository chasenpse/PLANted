import React from 'react';
import './Button.css';

const Button = ({type, text}) => {
    return (
        <button className={`btn ${type}`}>{text}</button>
    )
};

export default Button;