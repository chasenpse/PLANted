import React, {Fragment} from 'react';
import './Schedule.css';
import Button from "../../Common/Button";
import Sidebar from "../../Common/Sidebar/Sidebar";
import TableView from "../../Common/TableView/TableView";

const Schedule = () => {
    return (
        <Fragment>
            <Button />
            <TableView />
            <Sidebar>
                Schedule
            </Sidebar>
        </Fragment>
    )
}

export default Schedule;