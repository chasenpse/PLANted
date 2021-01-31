import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Header from "./shared/Header/Header";
import Overview from "./Calendar";
import CropLibrary from "./CropLibrary";
import Schedule from "./Schedule";

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