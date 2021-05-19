import React from 'react';
import './Main.css';

const Main = ({children, selected}) => {
    return (
        <main className={selected ? 'main open' : 'main'}>
            {children}
        </main>
    )
};

export default Main;