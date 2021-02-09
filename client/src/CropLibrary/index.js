import React, {Fragment} from 'react';
import './CropLibrary.css';
import Main from "../shared/Main";
import Sidebar from "../shared/Sidebar/Sidebar";
import Button from "../shared/Button";
import TableView from "../shared/TableView/TableView";

const CropLibrary = () => {
    return (
        <Fragment>
            <Button type={'main'} text={'add crop'} />
            <Main>
                <TableView Cols={['name', 'grow time', 'sprout time', 'yield']} />
            </Main>
            <Sidebar>
                Crop Lib
            </Sidebar>
        </Fragment>
    )
}

export default CropLibrary;