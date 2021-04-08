import React, {useState, useEffect} from 'react';
import './App.css';
import { Route, Redirect } from 'react-router-dom';
import Header from "./shared/Header/Header";
import { ModalContext } from "./ModalContext";
import Login from "./Login";
import Register from "./Register";
import Overview from "./Overview";
import { OverviewProvider } from "./Overview/OverviewContext";
import CropLibrary from "./CropLibrary";
import { CropProvider } from "./CropLibrary/CropContext";
import Schedule from "./Schedule";
import { ScheduleProvider } from "./Schedule/ScheduleContext";
import axios from "axios";

const conn = axios.create({
    withCredentials: true,
    baseURL: "http://172.30.1.15:5000/api",
})

const App = () => {

    const [user, setUser] = useState();
    const [navOpen, setNavOpen] = useState(false);

    useEffect(()=>{
        (async ()=> {
            try {
                const res = await conn.get('user')
                setUser(res.data)
            } catch (err) {
                console.log(err)
            }
        })()
        },[])

    // Routes for non logged in user
    if (!user) {
        return (
            <>
                <Route exact path={"/"}>
                    <Login user={user} setUser={setUser} />
                </Route>
                <Route exact path={"/login"}>
                    <Login user={user} setUser={setUser} />
                </Route>
                <Route exact path={"/register"} component={Register} />
            </>
        )
    }

    return (
        <ModalContext.Provider value={{navOpen, setNavOpen}}>
            <Redirect from="/" to="/calendar" />

            <a className={"drawerToggle"} onClick={(e)=>{e.preventDefault();setNavOpen(!navOpen)}}>
                <span />
                <span />
                <span />
            </a>
            <Header menu={{navOpen, setNavOpen}} />
            <div className={"container"}>
                <OverviewProvider>
                    <Route exact path={"/calendar"} component={Overview} />
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