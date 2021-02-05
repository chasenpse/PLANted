import React from 'react';
import './TableView.css';

const TableView = ({Cols, children}) => {
    return (
        <table className={'tableView'}>
            <thead>
                <tr>
                    { Cols.map(col => <th key={Math.random()}>{col}</th> )}
                </tr>
            </thead>
            <tbody>
            {children}
            </tbody>
        </table>
    )
}

export default TableView;