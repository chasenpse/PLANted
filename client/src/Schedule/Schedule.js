import React, {useContext, useState, useEffect, useMemo} from 'react';
import './Schedule.css';
import Button from "../shared/Button";
import Sidebar from "../shared/Sidebar/Sidebar";
import TableView from "../shared/TableView/TableView";
import { formatDate } from "../utils/formatDate";
import Main from "../shared/Main";
import {ScheduleContext} from "./ScheduleContext";
import axios from "axios";

const Schedule = () => {
    const newInstance = useMemo(()=>(
        {
            "id": 0,
            "crop.name": "",
            "quantity": 1,
            "stages": 1,
            "startDate": new Date().toISOString(),
            "endDate": new Date().toISOString(),
            "notes": "",
        }
    ), [])

    const {instances, setInstances, crops, selected, setSelected, loading} = useContext(ScheduleContext);
    const [tmp, setTmp] = useState(newInstance);

    useEffect(()=>setTmp(selected !== undefined ? instances[selected] : newInstance),[instances, selected, newInstance])

    const updateField = (e, n) => {
        return n ? setTmp({...tmp, [e.target.name]:+e.target.value}) : setTmp({...tmp, [e.target.name]:e.target.value})
    }

    const saveHandler = async (e) => {
        try {
            const res = await axios.put(`http://localhost:5000/api/instances/${tmp.id}`, tmp)
            const data = instances.map(i=>{
                if (i.id === res.data.id) {
                    i.cropId = res.data.cropId;
                    i['crop.name'] = crops.find(i=>i.id===tmp.cropId).name;
                    i.quantity = res.data.quantity;
                    i.stages = res.data.stages;
                    i.startDate = res.data.startDate;
                    i.endDate = res.data.endDate;
                    i.notes = res.data.notes;
                }
                return i;
            })
            setInstances(data);
        } catch(err) {
            console.log(err, e)
        }
    }

    const cancelHandler = (e) => {
        try {
            setTmp(instances[selected])
        } catch (err) {
            console.log(err, e);
        }
    }

    const deleteHandler = async (e) => {
        try {
            const res = await axios.delete(`http://localhost:5000/api/instances/${tmp.id}`);
            const data = instances.filter(i=>i.id !== tmp.id);
            setSelected(undefined);
            setInstances(data);
        } catch(err) {
            console.log(err, e)
        }
    }

    if (loading) {
        return (<div>loading...</div>);
    }

    return (
        <>
            <Button type={'main'} text={'add instance'} handler={saveHandler} />
            <Main>
                <TableView
                    Header={[
                        { name: "Crop", prop: "crop.name" },
                        { name: "quantity", prop: "quantity" },
                        { name: "stages", prop: "stages" },
                        { name: "start", prop: "startDate", type: "date" },
                        { name: "end", prop: "endDate", type: "date" },
                    ]}
                    Data={instances}
                    Selected={selected}
                    SetSelected={setSelected}
                />
            </Main>
            <Sidebar title={'Instance Properties'} selected={selected} saveHandler={saveHandler} cancelHandler={cancelHandler} deleteHandler={deleteHandler}>
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
                        value={formatDate(tmp.startDate)}
                        onChange={e=>updateField(e,false)}
                    />
                </div>
                <div>
                    <label>End Date:</label>
                    <input
                        name={"endDate"}
                        type={'date'}
                        value={formatDate(tmp.endDate)}
                        onChange={e=>updateField(e,false)}
                    />
                </div>
                <div>
                    <label>Notes:</label>
                    <textarea
                        name={"notes"}
                        value={tmp.notes}
                        onChange={e=>updateField(e,false)}
                    />
                </div>
            </Sidebar>
        </>
    )
}

export default Schedule;