import React from 'react';
import './TableView.css';
import { formatDate } from '../../utils/formatDate';

const TableView = ({Header, Data}) => {
    const generateRow = (header, row, i) => (
        <tr key={`tvr-${i}`}>
            {header.map((col,k) => (
                <td key={`tvd-${k}`}>
                    { col.name === 'start' ? formatDate(row[col.prop]) :
                        col.name === 'end' ? formatDate(row[col.prop]) :
                            row[col.prop] }
                </td>
            ))}
        </tr>
    );
    return (
        <table className={'tableView'}>
            <thead>
                <tr>
                    { Header.map((x, i) => <th key={`tvh-${i}`}>{x.name}</th> ) }
                </tr>
            </thead>
            <tbody>
            {
                Data.map((row,i) => generateRow(Header, row, i))
            }
            </tbody>
        </table>
    )
}

export default TableView;