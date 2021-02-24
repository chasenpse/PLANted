import React, { Fragment, useContext, useState, useEffect } from 'react';
import './Schedule.css';
import Button from "../shared/Button";
import Sidebar from "../shared/Sidebar/Sidebar";
import TableView from "../shared/TableView/TableView";
import { formatDate } from "../utils/formatDate";
import Main from "../shared/Main";
import {ScheduleContext} from "./ScheduleContext";

const Schedule = () => {
    const {instances, crops, selected, setSelected, loading} = useContext(ScheduleContext);
    const [tmp, setTmp] = useState(selected !== undefined ? instances[selected] : null);
    const userId = 1;

    useEffect(()=>setTmp(instances[selected]),[selected])

    if (loading) {
        return (<div>loading...</div>);
    }

    const updateField = (e, n) => {
        return n ? setTmp({...tmp, [e.target.name]:+e.target.value}) : setTmp({...tmp, [e.target.name]:e.target.value})
    }

    return (
        <Fragment>
            <Button type={'main'} text={'add instance'} />
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
            <Sidebar title={'Instance Properties'} selected={selected}>
                <div>
                    <label>Crop:</label>
                    <select
                        name={"cropId"}
                        value={selected !== undefined ? crops.find(crop => crop.id === tmp.cropId).id : "none"}
                        onChange={e=>updateField(e,false)}
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
                        value={selected !== undefined ? tmp.quantity : 1}
                        onChange={e=>updateField(e,true)}
                    />
                </div>
                <div>
                    <label>Stages:</label>
                    <input
                        name={"stages"}
                        type={'number'}
                        min={1}
                        value={selected !== undefined ? tmp.stages : 1}
                        onChange={e=>updateField(e,true)}
                    />
                </div>
                <div>
                    <label>Start Date:</label>
                    <input
                        name={"startDate"}
                        type={'date'}
                        value={selected !== undefined ? formatDate(tmp.startDate) : formatDate(new Date())}
                        onChange={e=>updateField(e,false)}
                    />
                </div>
                <div>
                    <label>End Date:</label>
                    <input
                        name={"endDate"}
                        type={'date'}
                        value={selected !== undefined ? formatDate(tmp.endDate) : formatDate(new Date())}
                        onChange={e=>updateField(e,false)}
                    />
                </div>
                <div>
                    <label>Notes:</label>
                </div>
                <textarea
                    name={"notes"}
                    value={selected !== undefined ? tmp.notes : ""}
                    onChange={e=>updateField(e,false)}
                />
            </Sidebar>
        </Fragment>
    )
}

export default Schedule;