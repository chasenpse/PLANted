import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Header from "./shared/Header/Header";
import Overview from "./Calendar";
import CropLibrary from "./CropLibrary";
import Schedule from "./Schedule";
import { ScheduleProvider } from "./Schedule/ScheduleContext";
import { CropProvider } from "./CropLibrary/CropContext";

const App = () => {

    return (
        <div className={"container"}>
            <Header />
            <Route exact path={"/"} component={Overview} />

            <CropProvider>
                <Route exact path={"/library"} component={CropLibrary} />
            </CropProvider>

            <ScheduleProvider>
                <Route exact path={"/schedule"} component={Schedule} />
            </ScheduleProvider>
        </div>
    );
}

export default App;