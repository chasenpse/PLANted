import React, {useState} from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Header from "./shared/Header/Header";
import { ModalContext } from "./ModalContext";
import Overview from "./Overview";
import { OverviewProvider } from "./Overview/OverviewContext";
import CropLibrary from "./CropLibrary";
import { CropProvider } from "./CropLibrary/CropContext";
import Schedule from "./Schedule";
import { ScheduleProvider } from "./Schedule/ScheduleContext";

const App = () => {

    const [navOpen, setNavOpen] = useState(false);

    return (
        <ModalContext.Provider value={{navOpen, setNavOpen}}>
            <div className={"drawerToggle"} onClick={()=>setNavOpen(!navOpen)}>
                <span />
                <span />
                <span />
            </div>
            <Header menu={{navOpen, setNavOpen}} />
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
        </ModalContext.Provider>
    );
}

export default App;