import React, {Fragment} from 'react';
import './Schedule.css';
import Button from "../shared/Button";
import Sidebar from "../shared/Sidebar/Sidebar";
import TableView from "../shared/TableView/TableView";
import Main from "../shared/Main";
import { TiDelete } from 'react-icons/ti';

const Schedule = () => {
    return (
        <Fragment>
            <Button type={'main'} />
            <Main>
                <TableView />
            </Main>
            <Sidebar>
                <div className={'form__title'}>
                    <h2>Instance Properties</h2><TiDelete/>
                </div>
                <form className={'sidebar-form'}>
                    <div className={''}>
                        <label>Crop:</label>
                        <select className={'form__select'}>
                            <option value={'Blue Curled Scotch Kale'}>Blue Curled Scotch Kale</option>
                            <option value={'Butter King Lettuce'}>Butter King Lettuce</option>
                            <option value={'Chinese Hilton Cabbage'}>Chinese Hilton Cabbage</option>
                            <option value={'Purple Lady Bok Choy'}>Purple Lady Bok Choy</option>
                            <option value={'Vulcan Swiss Chard'}>Vulcan Swiss Chard</option>
                        </select>
                    </div>
                    <div>
                        <label>Quantity:</label>
                        <input className={'form__input'} type={'number'} min={1} value={88} />
                    </div>
                    <div>
                        <label>Stages:</label>
                        <input  className={'form__input'}type={'number'} min={1} value={1} />
                    </div>
                    <div>
                        <label>Start Date:</label>
                        <input className={'form__date'} type={'date'} value={'2021-01-09'} />
                    </div>
                    <div>
                        <label>End Date:</label>
                        <input className={'form__date'} type={'date'} value={'2021-01-09'} />
                    </div>
                    <div>
                        <label>Notes:</label>
                        <textarea className={'form__textarea'}/>
                    </div>
                </form>
            </Sidebar>
        </Fragment>
    )
}

export default Schedule;