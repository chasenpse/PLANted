import React, {useContext, useEffect} from 'react';
import {OverviewContext} from "./OverviewContext";
import Main from "../shared/Main";
import Sidebar from "../shared/Sidebar/Sidebar";
import Calendar from "./Calendar/Calendar";
import * as dateUtils from "../utils/formatDate";
import axios from "axios";
import Loading from "../shared/Loading/Loading";

const conn = axios.create({
    withCredentials: true,
    baseURL: `/api`,
})

const Overview = () => {
    const {
        calData,
        setCalData,
        setInstances,
        selected,
        setSelected,
        loading,
        setLoading,
        startDate,
        setStartDate,
        endDate,
        setEndDate
    } = useContext(OverviewContext);

    // Load the user's instances
    useEffect(() => {
        setLoading(true);
        (async () => {
            try {
                const res = await conn.get(`instances`);
                setInstances(res.data);
                setLoading(false);
                setCalData(genCalData(res.data));
            } catch (err) {
                console.log(err);
            }
        })();
    }, [setInstances, setLoading, setCalData]);

    const generateHeader = (date) => (
        <div className={'title'}>
            <span>{date.toLocaleString("default", {weekday: "long"})}</span>
            <h2>{date.toLocaleString("default", {month: "long"})} {dateUtils.ordinal(date.getDate())}, {date.getFullYear()}</h2>
        </div>
    )

    const genCalData = (instances) => {
        const markers = new Set();
        const data = [];

        instances.map((i)=>{
            const {
               id,
               quantity,
               stages,
                'crop.growTime':growTime,
                'crop.sproutTime':sproutTime,
                'crop.name':name,
            } = i;
            const interval = Math.floor((growTime - sproutTime)/stages);

            // split on 'Z' to use local time, since we don't care about time just the date
            const curr = new Date(i.startDate.split("Z", 1)[0])
            const last = new Date(i.endDate.split("Z", 1)[0])
            last.setDate(last.getDate() - growTime)
            while (curr <= last) {
                let sprintStartDate = new Date(curr)
                for (let x = 0; x <= stages+1; x++) {
                    let sel = data.find(obj=>obj.date===sprintStartDate.toISOString().split('T',1)[0]);
                    if (sel===undefined) {
                        data.push({
                            date: sprintStartDate.toISOString().split('T',1)[0],
                            events: [{id, name, quantity, actions: [x === 0 ? "sow" : x === stages+1 ? "harvest" : "rotate"]}]
                        })
                    } else {
                        let tmp = sel.events.find(o=>o.id===id)
                        if (tmp===undefined) {
                            sel.events.push({id: i.id, name, actions: [x === 0 ? "sow" : x === stages+1 ? "harvest" : "rotate"]})
                        } else {
                            tmp.actions = [...tmp.actions, x === 0 ? "sow" : x === stages+1 ? "harvest" : "rotate"]
                        }
                    }
                    markers.add(sprintStartDate.toISOString().split('T',1)[0])
                    if (x===0) {
                        sprintStartDate.setDate(sprintStartDate.getDate() + sproutTime)
                    } else {
                        sprintStartDate.setDate(sprintStartDate.getDate() + interval)
                    }
                }
                curr.setDate(curr.getDate() + interval)
            }
        })
        return { markers, data }
    }

    const dayDetails = () => {
        const data = calData.data.find(i=>i.date===dateUtils.dateToYYYYMMDD(selected))
        if (data !== undefined) {
            return (
                data.events.map((c,index)=>{
                    return (
                        <div key={index} className={"detailsContainer"}>
                            <div className={"cropDetailsContainer"}>
                                <span className={"cropDetailsName"}>
                                    {data.events.find(i=>i.id === c.id).name}
                                </span>
                            {c.actions.map((e,index)=>
                                <div
                                    key={index}
                                    className={"cropEvent"}
                                    style={{ fontWeight: e==='harvest' ?
                                        700
                                        : 'normal' }}
                                    >
                                    {`${e}`}
                                </div>
                            )}
                            </div>
                        </div>
                    )
                })
            )
        }
        return null
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <Main>
                <div className={'calRange'}>
                    <input
                        name={'startDate'}
                        type={'month'}
                        min={"2010-01"}
                        max={endDate}
                        value={startDate}
                        onChange={(e)=>setStartDate(e.target.value)}
                    />
                    <input
                        name={'endDate'}
                        type={'month'}
                        min={startDate}
                        max={"2030-01"}
                        value={endDate}
                        onChange={(e)=>setEndDate(e.target.value)}
                    />
                </div>
                <Calendar
                    startDate={dateUtils.YYYYMMtoFullDate(startDate)}
                    endDate={dateUtils.YYYYMMtoFullDate(endDate)}
                    selected={selected}
                    setSelected={setSelected}
                    markers={calData.markers}
                />
            </Main>
            <Sidebar display={selected}>
                {generateHeader(selected)}
                {dayDetails()}
            </Sidebar>
        </>
    )
}

export default Overview;