import React, { useContext, useState, useEffect, useMemo } from 'react';
import './CropLibrary.css';
import {CropContext} from "./CropContext";
import Main from "../shared/Main";
import Sidebar from "../shared/Sidebar/Sidebar";
import Button from "../shared/Button";
import TableView from "../shared/TableView/TableView";
import axios from "axios";
import Loading from "../shared/Loading/Loading";

const conn = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:5000/api/crops",
})

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

    const {
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
    } = useContext(CropContext);
    const [tmp, setTmp] = useState(newCrop);

    // Load the user's instances
    useEffect(() => {
        setLoading(true);
        (async () => {
            try {
                const res = await conn.get('/');
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
        return <Loading />;
    }

    const updateField = (e, n) => {
        return n ? setTmp({...tmp, [e.target.name]:+e.target.value}) : setTmp({...tmp, [e.target.name]:e.target.value})
    }

    const updateCrops = async () => {
        try {
            const res = await conn.get('/');
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
            const res = await conn.post('/', tmp);
            await updateCrops();
            setSelected(res.data.id)
        } catch (err) {
            console.log(err, e)
        }
    }

    const saveHandler = async (e) => {
        try {
            await conn.put(`/${tmp.id}`, tmp)
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
            const res = await conn.delete(`/${tmp.id}`);
            setSelected(res.data.length > 0 ? 0 : undefined);
            await updateCrops();
        } catch(err) {
            console.log(err, e)
        }
    }

    return (
        <>
            <Main>
                <Button className={'main'} text={'add crop'} handler={addCrop} />
                <TableView
                    Cols={[
                        { name: "name", prop: "name", type: "string" },
                        { name: "grow time", prop: "growTime", type: "int" },
                        { name: "sprout time", prop: "sproutTime", type: "int" },
                    ]}
                    Data={crops}
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
                    <Button className={'save'} text={'save'} handler={selected === "new" ? addHandler : saveHandler} />
                    <Button className={'outline'} text={'cancel'} handler={cancelHandler} />
                    <Button className={'red right'} text={'delete'} handler={deleteHandler} />
                </form>
            </Sidebar>
        </>
    )
}

export default CropLibrary;