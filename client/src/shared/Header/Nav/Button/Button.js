import React from 'react';
import './Button.css';

const Button = ({name, action}) => <button onClick={(e)=>action(e)} className={'navBtn'}>{name}</button>

export default Button;