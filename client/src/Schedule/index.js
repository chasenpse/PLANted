import React, { Fragment, useState, useEffect, useContext } from 'react';
import './Schedule.css';
import Button from "../shared/Button";
import Sidebar from "../shared/Sidebar/Sidebar";
import TableView from "../shared/TableView/TableView";
import Main from "../shared/Main";
import { TiDelete } from 'react-icons/ti';

const Schedule = () => {

    const mockItem = {
        id: 123,
        crop: "Butter King Lettuce",
        quantity: 1,
        stages: 4,
        startDate: '2021-01-21',
        endDate: '2021-05-01',
        notes: ''
    }

    const [instance, setInstance] = useState(mockItem);
    return (
        <Fragment>
            <Button type={'main'} text={'add instance'} />
            <Main>
                <TableView />
            </Main>
            <Sidebar title={'Instance Properties'}>
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
    )
}

export default Schedule;