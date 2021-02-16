import './TableView.css';
import { formatDate } from '../../utils/formatDate';

const TableView = ({Header, Data, Selected, SetSelected}) => {
    const generateRow = (header, row, i) => (
        <tr key={`tvr-${i}`} id={`tvr-${i}`} onClick={(e)=>SetSelected(i)} className={i===Selected ? 'selected' : ''}>
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
                    { Data ? Header.map((x, i) => <th key={`tvh-${i}`}>{x.name}</th>): null }
                </tr>
            </thead>
            <tbody>
            {
                Data ? Data.map((row,i) => generateRow(Header, row, i)) : null
            }
            </tbody>
        </table>
    )
}

export default TableView;