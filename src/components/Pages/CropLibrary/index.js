import React, {Fragment} from 'react';
import './CropLibrary.css';
import Sidebar from "../../Common/Sidebar/Sidebar";
import Button from "../../Common/Button";
import TableView from "../../Common/TableView/TableView";

const CropLibrary = () => {
    return (
        <Fragment>
            <Button />
            <TableView />
            <Sidebar>
                Crop Lib
            </Sidebar>
        </Fragment>
    )
}

export default CropLibrary;