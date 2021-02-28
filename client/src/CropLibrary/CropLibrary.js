import React, { useContext, useState, useEffect, useMemo } from 'react';
import './CropLibrary.css';
import Button from "../shared/Button";
import Sidebar from "../shared/Sidebar/Sidebar";
import TableView from "../shared/TableView/TableView";
import Main from "../shared/Main";
import {CropContext} from "./CropContext";

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

    const {crops, selected, setSelected, loading} = useContext(CropContext);
    const [tmp, setTmp] = useState(newCrop);

    useEffect(()=>setTmp(selected !== undefined ? crops[selected] : newCrop),[crops, selected, newCrop])

    if (loading) {
        return (<div>loading...</div>);
    }

    const updateField = (e, n) => {
        return n ? setTmp({...tmp, [e.target.name]:+e.target.value}) : setTmp({...tmp, [e.target.name]:e.target.value})
    }

    return (
        <>
            <Button type={'main'} text={'add crop'} />
            <Main>
                <TableView
                    Header={[
                        { name: "name", prop: "name" },
                        { name: "grow time", prop: "growTime" },
                        { name: "sprout time", prop: "sproutTime" },
                    ]}
                    Data={crops}
                    Selected={selected}
                    SetSelected={setSelected}
                />
            </Main>
            <Sidebar title={'Crop Properties'} selected={selected}>
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
            </Sidebar>
        </>
    )
}

export default CropLibrary;