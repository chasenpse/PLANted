import './TableView.css';
import { dateToYYYYMMDD } from '../../utils/formatDate';

const TableView = ({Cols, Rows, Selected, SetSelected}) => {
    const generateRow = (col, row, i) => (
        <tr key={`tvr-${i}`} onClick={()=>SetSelected(row.id)} className={row.id===Selected ? 'selected' : null}>
            {col.map((c,k) => (
                <td key={`tvd-${i}-${k}`}>
                    { c.type === 'date' ? dateToYYYYMMDD(row[c.prop]) : row[c.prop] }
                </td>
            ))}
        </tr>
    );

    return (
        <table className={'tableView'}>
            <thead>
                <tr>
                    { Rows ? Cols.map((x, i) => <th key={`tvh-${i}`}>{x.name}</th>): null }
                </tr>
            </thead>
            <tbody>
            {
                Rows ? Rows.map((row,i) => generateRow(Cols, row, i)) : null
            }
            </tbody>
        </table>
    )
}

export default TableView;