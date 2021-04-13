import React, {useState, useEffect} from 'react';
import './App.css';
import { Route, Redirect } from 'react-router-dom';
import Header from "./shared/Header/Header";
import { UserContext } from "./UserContext";
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
    baseURL: "http://localhost:5000/api",
})

const App = () => {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(false);
    const [navOpen, setNavOpen] = useState(false);

    useEffect(()=>{
        setLoading(true);
        (async ()=> {
            try {
                const res = await conn.get('user')
                setUser(res.data)
                setLoading(false)
            } catch (err) {
                console.log(err)
            }
        })()
        },[])

    if (loading) {
        return (<div className={"loading"}><span>loading...</span></div>);
    }

    // Routes for non logged in user
    if (!user && !loading) {
        return (
            <UserContext.Provider value={{user, setUser}}>
                <Redirect to="/" />
                <Route exact path={"/"}>
                    <Login setUser={setUser} />
                </Route>
                <Route exact path={"/login"}>
                    <Login setUser={setUser} />
                </Route>
                <Route exact path={"/register"}>
                    <Register setUser={setUser} />
                </Route>
            </UserContext.Provider>
        )
    }

    return (
        <UserContext.Provider value={{user, setUser}}>
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
        </UserContext.Provider>
    );
}

export default App;