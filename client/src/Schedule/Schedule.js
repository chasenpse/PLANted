import React, {useContext, useState, useEffect, useMemo} from 'react';
import './Schedule.css';
import {ScheduleContext} from "./ScheduleContext";
import Main from "../shared/Main";
import Sidebar from "../shared/Sidebar/Sidebar";
import Button from "../shared/Button";
import TableView from "../shared/TableView/TableView";
import { dateToYYYYMMDD } from "../utils/formatDate";
import axios from "axios";
import Loading from "../shared/Loading/Loading";
import Modal from "../shared/Modal";

const conn = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:5000/api",
})

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

    const {
        instances,
        setInstances,
        crops,
        setCrops,
        selected,
        setSelected,
        loading,
        setLoading,
        orderBy,
        setOrderBy,
        order,
        setOrder,
    } = useContext(ScheduleContext);

    const [tmp, setTmp] = useState(newInstance);
    const [modal, setModal] = useState(false);

    // Load the user's instances
    useEffect(() => {
        setLoading(true);
        (async () => {
            try {
                const instanceRes = await conn.get(`instances`);
                const cropRes = await conn.get(`crops/names`);
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
            const res = await conn.get(`instances`);
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
            const res = await conn.post(`instances`, tmp);
            await updateInstances();
            setSelected(res.data.id)
        } catch (err) {
            console.log(err, e)
        }
    }

    const saveHandler = async (e) => {
        try {
            await conn.put(`instances/${tmp.id}`, tmp)
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
            const res = await conn.delete(`instances/${tmp.id}`);
            setSelected(res.data.length > 0 ? 0 : undefined);
            setModal(false);
            await updateInstances();
        } catch(err) {
            console.log(err, e)
        }
    }

    if (loading) {
        return <Loading />;
    }

    const modalBody = () => {
        return (
            <>
                <p>Are you sure you want to delete the instance:</p>
                <p className={"bold"}>{tmp['crop.name']}</p>
                <p className={'bold'}>This action cannot be undone.</p>
            </>
        )
    }

    return (
        <>
            <Main>
                {modal?<Modal body={modalBody()} confirm={deleteHandler} cancel={()=>setModal(false)}/>:null}
                <Button className={'main'} text={'add instance'} handler={addInstance} />
                <TableView
                    Cols={[
                        { name: "crop", prop: "crop.name", type: "string" },
                        { name: "quantity", prop: "quantity", type: "int" },
                        { name: "stages", prop: "stages", type: "int" },
                        { name: "start", prop: "startDate", type: "date" },
                        { name: "end", prop: "endDate", type: "date" },
                    ]}
                    Data={instances}
                    Selected={selected}
                    SetSelected={setSelected}
                    orderBy={orderBy}
                    order={order}
                    setOrderBy={setOrderBy}
                    setOrder={setOrder}
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
                    <Button className={'save'} text={'save'} handler={selected === "new" ? addHandler : saveHandler} />
                    <Button className={'outline'} text={'cancel'} handler={cancelHandler} />
                    {tmp.id?<Button className={'red right'} text={'delete'} handler={()=>{setModal(true)}} />:null}
                </form>
            </Sidebar>
        </>
    )
}

export default Schedule;