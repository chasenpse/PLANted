import React from 'react';
import './Main.css';

const Main = ({children}) => {
    return (
        <main className={'main'}>
            {children}
        </main>
    )
};

export default Main;