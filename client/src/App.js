import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Header from "./shared/Header/Header";
import Overview from "./Calendar";
import CropLibrary from "./CropLibrary";
import Schedule from "./Schedule";
import { ScheduleProvider } from "./Schedule/ScheduleContext";

const App = () => {

    return (
        <div className={"container"}>
            <Header />
            <Route exact path={"/"} component={Overview} />
            <Route exact path={"/library"} component={CropLibrary} />
            <ScheduleProvider>
                <Route exact path={"/schedule"} component={Schedule} />
            </ScheduleProvider>
        </div>
    );
}

export default App;