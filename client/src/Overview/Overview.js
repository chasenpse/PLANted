import React, {useContext, useState, useEffect} from 'react';
import './Overview.css';
import {OverviewContext} from "./OverviewContext";
import Main from "../shared/Main";
import Sidebar from "../shared/Sidebar/Sidebar";
import Calendar from "./Calendar/Calendar";
import * as dateUtils from "../utils/formatDate";
import axios from "axios";

const Overview = () => {
    const {cal, setCal, instances, setInstances, selected, setSelected, loading, setLoading} = useContext(OverviewContext);
    const currentDate = new Date();
    const tmpEndDate = new Date(currentDate).setMonth(currentDate.getMonth() + 5);
    const [startDate, setStartDate] = useState(dateUtils.fullDateToYYYYMM(currentDate));
    const [endDate, setEndDate] = useState(dateUtils.fullDateToYYYYMM(tmpEndDate));

    // Load the user's instances
    useEffect(() => {
        setLoading(true);
        (async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/instances`);
                setInstances(res.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        })();
    }, [setInstances, setLoading]);

    return (
        <>
            <Main>
                <input name={'startDate'} type={'month'} value={startDate} onChange={(e)=>setStartDate(e.target.value)} />
                <input name={'endDate'} type={'month'} min={startDate} value={endDate} onChange={(e)=>setEndDate(e.target.value)} />
                <div>
                    <Calendar startDate={dateUtils.YYYYMMtoFullDate(startDate)} endDate={dateUtils.YYYYMMtoFullDate(endDate)} />
                </div>
            </Main>
            <Sidebar title={"Friday, March 5th"} selected={selected}>
                qwerty!
            </Sidebar>
        </>
    )
}

export default Overview;