import React, {useState, useEffect} from 'react';
import './App.css';
import { Route, Redirect, Switch } from 'react-router-dom';
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
import ResetPassword from "./ResetPassword/ResetPassword";
import axios from "axios";
import Loading from "./shared/Loading/Loading";

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
        return <Loading />;
    }

    // Routes for non logged in user
    if (!user && !loading) {
        return (
            <UserContext.Provider value={{user, setUser}}>
                <Switch>
                    <Route exact path={"/"}>
                        <Login setUser={setUser} />
                    </Route>
                    <Route exact path={"/login"}>
                        <Login setUser={setUser} />
                    </Route>
                    <Route exact path={"/confirm/:token"}>
                        <Login setUser={setUser} />
                    </Route>
                    <Route exact path={"/register"} component={Register} />
                    <Route exact path={"/reset"} component={ResetPassword} />
                    <Route exact path={"/reset/:token"} component={ResetPassword} />
                    <Redirect to="/" />
                </Switch>
            </UserContext.Provider>
        )
    }

    return (
        <UserContext.Provider value={{user, setUser}}>
            <span className={"drawerToggle"} onClick={(e)=>{e.preventDefault();setNavOpen(!navOpen)}}>
                <span />
                <span />
                <span />
            </span>
            <Header menu={{navOpen, setNavOpen}} />
            <div className={"container"}>
                <OverviewProvider>
                    <Switch>
                        <Route exact path={"/calendar"} component={Overview} />
                    </Switch>
                </OverviewProvider>

                <CropProvider>
                    <Switch>
                        <Route exact path={"/library"} component={CropLibrary} />
                    </Switch>
                </CropProvider>

                <ScheduleProvider>
                    <Switch>
                        <Route exact path={"/schedule"} component={Schedule} />
                    </Switch>
                </ScheduleProvider>
                <Switch>
                    <Redirect to="/calendar" />
                </Switch>
            </div>
        </UserContext.Provider>
    );
}

export default App;