import React from 'react';
import './Button.css';

const Button = ({name, onClickHandler, className}) => <button className={className} onClick={(e)=>onClickHandler(e)}>{name}</button>

export default Button;