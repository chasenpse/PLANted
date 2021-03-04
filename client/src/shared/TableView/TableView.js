import './TableView.css';
import { formatDate } from '../../utils/formatDate';

const TableView = ({Cols, Rows, Selected, SetSelected}) => {
    const generateRow = (col, row, i) => (
        <tr key={`tvr-${i}`} id={`tvr-${i}`} onClick={()=>SetSelected(row.id)} className={row.id===Selected ? 'selected' : null}>
            {col.map((c,k) => (
                <td key={`tvd-${i}-${k}`} id={`tvd-${i}-${k}`}>
                    { c.type === 'date' ? formatDate(row[c.prop]) : row[c.prop] }
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