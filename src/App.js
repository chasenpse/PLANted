import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";


const App = () => {

    return (
        <div style={{
            marginTop: '160px'
        }}>
            <Header />
            <Sidebar />
        </div>
    );
}

export default App;