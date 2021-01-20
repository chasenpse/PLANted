import React from 'react';
import './Button.css';

const Button = ({type}) => {
    return (
        <button className={`btn ${type}`}>Schedule Instance</button>
    )
};

export default Button;