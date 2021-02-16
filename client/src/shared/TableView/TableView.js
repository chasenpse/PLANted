import React, {useContext} from 'react';
import './TableView.css';
import { formatDate } from '../../utils/formatDate';
import {ScheduleContext} from "../../Schedule/ScheduleContext";

const TableView = ({Header}) => {
    const [instances, setInstances, crops, setCrops, selected, setSelected] = useContext(ScheduleContext);
    const generateRow = (header, row, i) => (
        <tr key={`tvr-${i}`} id={`tvr-${i}`} onClick={(e)=>setSelected(i)} className={i===selected ? 'selected' : ''}>
            {header.map((col,k) => (
                <td key={`tvd-${i}-${k}`} id={`tvd-${i}-${k}`}>
                    { col.type === 'date' ? formatDate(row[col.prop]) : row[col.prop] }
                </td>
            ))}
        </tr>
    );

    return (
        <table className={'tableView'}>
            <thead>
                <tr>
                    { instances ? Header.map((x, i) => <th key={`tvh-${i}`}>{x.name}</th>): null }
                </tr>
            </thead>
            <tbody>
            {
                instances ? instances.map((row,i) => generateRow(Header, row, i)) : null
            }
            </tbody>
        </table>
    )
}

export default TableView;