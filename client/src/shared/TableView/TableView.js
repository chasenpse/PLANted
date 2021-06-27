import React from 'react'
import './TableView.css';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti'
import { dateToYYYYMMDD } from '../../utils/formatDate';

const TableView = ({
    Cols,
    Data,
    Selected,
    SetSelected,
    orderBy,
    setOrderBy,
    order,
    setOrder,
}) => {

    const generateRow = (col, row, i) => (
        <tr key={`tvr-${i}`} onClick={()=>SetSelected(row.id)} className={row.id===Selected ? 'selected' : null}>
            {col.map((c,k) => (
                <td key={`tvd-${i}-${k}`}>
                    { c.type === 'date' ? dateToYYYYMMDD(row[c.prop]) : row[c.prop] }
                </td>
            ))}
        </tr>
    );

    const sortBy = (col) => {
        console.log(col)
        if (col.prop === orderBy.prop) {
            setOrder(order==='asc'?'desc':'asc')
        } else {
            setOrder(col.type==='string'?'asc':'desc')
            setOrderBy({prop:col.prop, type:col.type})
        }
    }

    const sortTable = (data) => {
        return data.sort(function(a, b){
            switch (orderBy.type) {
                case 'string':
                    if(a[orderBy.prop].toLowerCase() < b[orderBy.prop].toLowerCase()) { return order==='asc'?-1:1; }
                    if(a[orderBy.prop].toLowerCase() > b[orderBy.prop].toLowerCase()) { return order==='asc'?1:-1; }
                    return 0;
                default:
                    if(a[orderBy.prop] < b[orderBy.prop]) { return order==='asc'?-1:1; }
                    if(a[orderBy.prop] > b[orderBy.prop]) { return order==='asc'?1:-1; }
                    return 0;
            }
        })
    }

    const genSortByMarker = (col) => {
        if (col.prop === orderBy.prop) {
            return order==='asc'?<TiArrowSortedUp />:<TiArrowSortedDown />
        }
        return null;
    }

    return (
        <table className={'tableView'}>
            <thead>
                <tr>
                    { Data ? Cols.map((x, i) => <th key={`tvh-${i}`} onClick={()=>sortBy(x)}>{x.name}{genSortByMarker(x)}</th> ): null }
                </tr>
            </thead>
            <tbody>
            {
                Data ? sortTable(Data).map((row,i) => generateRow(Cols, row, i)) : null
            }
            </tbody>
        </table>
    )
}

export default TableView;