import React, {useContext, useState, useEffect} from 'react';
import './Overview.css';
import {OverviewContext} from "./OverviewContext";
import Main from "../shared/Main";
import Sidebar from "../shared/Sidebar/Sidebar";
import Calendar from "./Calendar/Calendar";
import * as dateUtils from "../utils/formatDate";
import axios from "axios";

const Overview = () => {
    const {calData, setCalData, instances, setInstances, selected, setSelected, loading, setLoading} = useContext(OverviewContext);
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

    const generateHeader = (date) => (
        <div className={'title'}>
            <span>{date.toLocaleString("default", {weekday: "long"})}</span>
            <h2>{date.toLocaleString("default", {month: "long"})} {dateUtils.ordinal(date.getDate())}, {date.getFullYear()}</h2>
        </div>
    )

    return (
        <>
            <Main>
                <div className={'calRange'}>
                    <input name={'startDate'} type={'month'} min={"2010-01"} max={endDate} value={startDate} onChange={(e)=>setStartDate(e.target.value)} />
                    <input name={'endDate'} type={'month'} min={startDate} value={endDate} onChange={(e)=>setEndDate(e.target.value)} />
                </div>
                <div>
                    <Calendar startDate={dateUtils.YYYYMMtoFullDate(startDate)} endDate={dateUtils.YYYYMMtoFullDate(endDate)} selected={selected} setSelected={setSelected} />
                </div>
            </Main>
            <Sidebar title={"Friday, March 5th"} display={selected}>
                {generateHeader(selected)}
            </Sidebar>
        </>
    )
}

export default Overview;