import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Header from "./shared/Header/Header";
import Overview from "./Overview";
import { OverviewProvider } from "./Overview/OverviewContext";
import CropLibrary from "./CropLibrary";
import { CropProvider } from "./CropLibrary/CropContext";
import Schedule from "./Schedule";
import { ScheduleProvider } from "./Schedule/ScheduleContext";

const App = () => {

    return (
        <>
            <Header />
            <div className={"container"}>
                <OverviewProvider>
                    <Route exact path={"/"} component={Overview} />
                </OverviewProvider>

                <CropProvider>
                    <Route exact path={"/library"} component={CropLibrary} />
                </CropProvider>

                <ScheduleProvider>
                    <Route exact path={"/schedule"} component={Schedule} />
                </ScheduleProvider>
            </div>
        </>
    );
}

export default App;