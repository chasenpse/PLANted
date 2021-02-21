import React, { Fragment, useContext, useState } from 'react';
import './Schedule.css';
import Button from "../shared/Button";
import Sidebar from "../shared/Sidebar/Sidebar";
import TableView from "../shared/TableView/TableView";
import { formatDate } from "../utils/formatDate";
import Main from "../shared/Main";
import {ScheduleContext} from "./ScheduleContext";

const Schedule = () => {

    const {instances, crops, selected, setSelected, loading} = useContext(ScheduleContext);
    const [tmpInstance, setTmpInstance] = useState();

    if (loading) {
        return (<div style={{
            textAlign: "center",
            fontSize: "3rem",
            fontWeight: "bold",
        }}>AYO I'M LOADIN HERE</div>);
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
            <Sidebar title={'Instance Properties'}>
                <div>
                    <label>Crop:</label>
                    <select
                        defaultValue={"none"}
                        value={
                            selected !== undefined ? crops.find(crop => crop.id === instances[selected].cropId).id : "none"}
                    >
                        <option disabled={'disabled'} value={"none"}>Select Crop</option>
                        {
                            crops.map(crop => (
                                <option key={`crop-${crop.id}`} value={crop.id}>
                                    {crop.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <label>Quantity:</label>
                    <input type={'number'} min={1} defaultValue={1} value={selected !== undefined ? instances[selected].quantity : null}
                    />
                </div>
                <div>
                    <label>Stages:</label>
                    <input type={'number'} min={1} defaultValue={1} value={selected !== undefined ? instances[selected].stages : null} />
                </div>
                <div>
                    <label>Start Date:</label>
                    <input type={'date'} defaultValue={formatDate(new Date())} value={selected !== undefined ? formatDate(instances[selected].startDate) : null} />
                </div>
                <div>
                    <label>End Date:</label>
                    <input type={'date'} defaultValue={formatDate(new Date())} value={selected !== undefined ? formatDate(instances[selected].endDate) : null} />
                </div>
                <div>
                    <label>Notes:</label>
                </div>
                <textarea value={selected !== undefined ? instances[selected].notes : null}/>
            </Sidebar>
        </Fragment>
    )
}

export default Schedule;