import React, { useContext, useState, useEffect, useMemo } from 'react';
import './CropLibrary.css';
import {CropContext} from "./CropContext";
import Main from "../shared/Main";
import Sidebar from "../shared/Sidebar/Sidebar";
import Button from "../shared/Button";
import TableView from "../shared/TableView/TableView";
import axios from "axios";

const CropLibrary = () => {
    const newCrop = useMemo(()=>(
        {
            "id": 0,
            "name": "",
            "growTime": 1,
            "sproutTime": 1,
            "notes": "",
        }
    ), [])

    const {crops, setCrops, selected, setSelected, loading, setLoading} = useContext(CropContext);
    const [tmp, setTmp] = useState(newCrop);

    // Load the user's instances
    useEffect(() => {
        setLoading(true);
        (async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/crops`);
                setCrops(res.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        })();
    }, [setCrops, setLoading]);

    // reassign tmp object on select changes
    useEffect(()=>{
        if (selected !== undefined && selected !== "new") {
            setTmp(crops.find(i=>i.id === selected))
        }
        else if (selected === "new") {
            setTmp(newCrop)
        }
    },[crops, selected, newCrop])

    if (loading) {
        return (<div>loading...</div>);
    }

    const updateField = (e, n) => {
        return n ? setTmp({...tmp, [e.target.name]:+e.target.value}) : setTmp({...tmp, [e.target.name]:e.target.value})
    }

    const updateCrops = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/crops/`);
            setCrops(res.data);
        } catch (e) {
            console.log(e)
        }
    }

    const addCrop = () => {
        setSelected("new");
    }

    const addHandler = async (e) => {
        if (tmp.id === "none") {
            return false;
        }
        try {
            const res = await axios.post(`http://localhost:5000/api/crops/`, tmp);
            await updateCrops();
            setSelected(res.data.id)
        } catch (err) {
            console.log(err, e)
        }
    }

    const saveHandler = async (e) => {
        try {
            await axios.put(`http://localhost:5000/api/crops/${tmp.id}`, tmp)
            await updateCrops();
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
            const res = await axios.delete(`http://localhost:5000/api/crops/${tmp.id}`);
            setSelected(res.data.length > 0 ? 0 : undefined);
            await updateCrops();
        } catch(err) {
            console.log(err, e)
        }
    }

    return (
        <>
            <Main>
                <Button type={'main'} text={'add crop'} handler={addCrop} />
                <TableView
                    Cols={[
                        { name: "name", prop: "name" },
                        { name: "grow time", prop: "growTime" },
                        { name: "sprout time", prop: "sproutTime" },
                    ]}
                    Rows={crops}
                    Selected={selected}
                    SetSelected={setSelected}
                />
            </Main>
            <Sidebar
                display={selected}
            >
                <div className={'title'}>
                    <h2>Crop Properties</h2>
                </div>
                <form className={'sidebar-form'}>
                    <div>
                        <label>Name:</label>
                        <input
                            name={"name"}
                            type={'text'}
                            value={tmp.name}
                            onChange={e=>updateField(e,false)}
                        />
                    </div>
                    <div>
                        <label>Grow Time:</label>
                        <input
                            name={"growTime"}
                            type={'number'}
                            min={1}
                            max={180}
                            step={1}
                            value={tmp.growTime}
                            onChange={e=>updateField(e,true)}
                        />
                    </div>
                    <div>
                        <label>Sprout Time:</label>
                        <input
                            name={"sproutTime"}
                            type={'number'}
                            min={1}
                            max={180}
                            step={1}
                            value={tmp.sproutTime}
                            onChange={e=>updateField(e,true)}
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
                    <Button type={'save'} text={'save'} handler={selected === "new" ? addHandler : saveHandler} />
                    <Button type={'cancel'} text={'cancel'} handler={cancelHandler} />
                    <Button type={'delete right'} text={'delete'} handler={deleteHandler} />
                </form>
            </Sidebar>
        </>
    )
}

export default CropLibrary;