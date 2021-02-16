import React, { Fragment } from 'react';
import './Schedule.css';
import Button from "../shared/Button";
import Sidebar from "../shared/Sidebar/Sidebar";
import TableView from "../shared/TableView/TableView";
import Main from "../shared/Main";
import {ScheduleProvider} from "./ScheduleContext";

const Schedule = () => {

    return (
        <ScheduleProvider>
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
                    />
                </Main>
                <Sidebar
                    title={'Instance Properties'}>
                    <div>
                        <label>Crop:</label>
                        <select>
                            <option value={'Blue Curled Scotch Kale'}>Blue Curled Scotch Kale</option>
                            <option value={'Butter King Lettuce'}>Butter King Lettuce</option>
                            <option value={'Chinese Hilton Cabbage'}>Chinese Hilton Cabbage</option>
                            <option value={'Purple Lady Bok Choy'}>Purple Lady Bok Choy</option>
                            <option value={'Vulcan Swiss Chard'}>Vulcan Swiss Chard</option>
                        </select>
                    </div>
                    <div>
                        <label>Quantity:</label>
                        <input type={'number'} min={1} />
                    </div>
                    <div>
                        <label>Stages:</label>
                        <input type={'number'} min={1} />
                    </div>
                    <div>
                        <label>Start Date:</label>
                        <input type={'date'} value={'2021-01-09'} />
                    </div>
                    <div>
                        <label>End Date:</label>
                        <input type={'date'} value={'2021-01-09'} />
                    </div>
                    <div>
                        <label>Notes:</label>
                    </div>
                    <textarea/>
                    <Button type={'cancel'} text={'cancel'} />
                    <Button type={'save right'} text={'save'} />
                </Sidebar>
            </Fragment>
        </ScheduleProvider>
    )
}

export default Schedule;