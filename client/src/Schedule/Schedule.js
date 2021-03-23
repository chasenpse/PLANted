import React, {useContext, useState, useEffect, useMemo} from 'react';
import './Schedule.css';
import {ScheduleContext} from "./ScheduleContext";
import Main from "../shared/Main";
import Sidebar from "../shared/Sidebar/Sidebar";
import Button from "../shared/Button";
import TableView from "../shared/TableView/TableView";
import { dateToYYYYMMDD } from "../utils/formatDate";
import axios from "axios";

const Schedule = () => {
    const newInstance = useMemo(()=>(
        {
            "cropId": "none",
            "quantity": 1,
            "stages": 1,
            "startDate": new Date().toISOString(),
            "endDate": new Date().toISOString(),
            "notes": "",
        }
    ), [])

    const {instances, setInstances, crops, setCrops, selected, setSelected, loading, setLoading} = useContext(ScheduleContext);
    const [tmp, setTmp] = useState(newInstance);

    // Load the user's instances
    useEffect(() => {
        setLoading(true);
        (async () => {
            try {
                const instanceRes = await axios.get(`http://localhost:5000/api/instances/`);
                const cropRes = await axios.get(`http://localhost:5000/api/crops/1/names`);
                setInstances(instanceRes.data);
                setCrops(cropRes.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        })();
    }, [setCrops, setInstances, setLoading]);

    // update tmp object when selected is changed
    useEffect(()=>{
        if (selected !== undefined && selected !== "new") {
            setTmp(instances.find(i=>i.id === selected))
        }
        else if (selected === "new") {
            setTmp(newInstance)
        }
    },[instances, selected, newInstance])

    const updateField = (e, n) => {
        return n ? setTmp({...tmp, [e.target.name]:+e.target.value}) : setTmp({...tmp, [e.target.name]:e.target.value})
    }

    const updateInstances = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/instances/`);
            setInstances(res.data);
        } catch (e) {
            console.log(e)
        }
    }

    const addInstance = () => {
        setSelected("new");
    }

    const addHandler = async (e) => {
        if (tmp.cropId === "none") {
            return false;
        }
        try {
            const res = await axios.post(`http://localhost:5000/api/instances/`, tmp);
            await updateInstances();
            setSelected(res.data.id)
        } catch (err) {
            console.log(err, e)
        }
    }

    const saveHandler = async (e) => {
        try {
            await axios.put(`http://localhost:5000/api/instances/${tmp.id}`, tmp)
            await updateInstances();
        } catch(err) {
            console.log(err, e)
        }
    }

    const cancelHandler = (e) => {
        try {
            setSelected(undefined)
        } catch (err) {
            console.log(err, e);
        }
    }

    const deleteHandler = async (e) => {
        try {
            const res = await axios.delete(`http://localhost:5000/api/instances/${tmp.id}`);
            setSelected(res.data.length > 0 ? 0 : undefined);
            await updateInstances();
        } catch(err) {
            console.log(err, e)
        }
    }

    if (loading) {
        return (<div>loading...</div>);
    }

    return (
        <>
            <Main>
                <Button type={'main'} text={'add instance'} handler={addInstance} />
                <TableView
                    Cols={[
                        { name: "Crop", prop: "crop.name" },
                        { name: "quantity", prop: "quantity" },
                        { name: "stages", prop: "stages" },
                        { name: "start", prop: "startDate", type: "date" },
                        { name: "end", prop: "endDate", type: "date" },
                    ]}
                    Rows={instances}
                    Selected={selected}
                    SetSelected={setSelected}
                />
            </Main>
            <Sidebar
                display={selected}
            >
                <div className={'title'}>
                    <h2>Instance Properties</h2>
                </div>
                <form className={'sidebar-form'}>
                    <div>
                        <label>Crop:</label>
                        <select
                            name={"cropId"}
                            value={tmp.cropId}
                            onChange={e=>updateField(e,true)}
                        >
                            <option disabled={'disabled'} value={"none"}>Select Crop</option>
                            {
                                crops.map(crop => <option key={`crop-${crop.id}`} value={crop.id}>{crop.name}</option>)
                            }
                        </select>
                    </div>
                    <div>
                        <label>Quantity:</label>
                        <input
                            name={"quantity"}
                            type={'number'}
                            min={1}
                            max={99}
                            step={1}
                            value={tmp.quantity}
                            onChange={e=>updateField(e,true)}
                        />
                    </div>
                    <div>
                        <label>Stages:</label>
                        <input
                            name={"stages"}
                            type={'number'}
                            min={1}
                            max={99}
                            step={1}
                            value={tmp.stages}
                            onChange={e=>updateField(e,true)}
                        />
                    </div>
                    <div>
                        <label>Start Date:</label>
                        <input
                            name={"startDate"}
                            type={'date'}
                            value={dateToYYYYMMDD(tmp.startDate)}
                            onChange={e=>updateField(e,false)}
                        />
                    </div>
                    <div>
                        <label>End Date:</label>
                        <input
                            name={"endDate"}
                            type={'date'}
                            value={dateToYYYYMMDD(tmp.endDate)}
                            onChange={e=>updateField(e,false)}
                        />
                    </div>
                    <div>
                        <label>Notes:</label>
                        <textarea
                            name={"notes"}
                            value={tmp.notes !== null ? tmp.notes : ""}
                            onChange={e=>updateField(e,false)}
                        />
                    </div>
                    <Button type={'save'} text={'save'} handler={selected === "new" ? addHandler : saveHandler} />
                    <Button type={'cancel'} text={'cancel'} handler={cancelHandler} />
                    <Button type={'delete right'} text={'delete'} handler={deleteHandler} />
                </form>
            </Sidebar>
        </>
    )
}

export default Schedule;