import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Header from "./components/Header/Header";
import Overview from "./components/Pages/Overview";
import CropLibrary from "./components/Pages/CropLibrary";
import Schedule from "./components/Pages/Schedule";

const App = () => {

    return (
        <div className={"container"}>
            <Header />
            <Route exact path={"/"} component={Overview} />
            <Route exact path={"/library"} component={CropLibrary} />
            <Route exact path={"/schedule"} component={Schedule} />
        </div>
    );
}

export default App;