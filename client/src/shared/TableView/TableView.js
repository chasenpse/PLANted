import React from 'react';
import './TableView.css';

const TableView = () => {
    return (
        <table className={'tableView'}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Grow Time (Days)</th>
                    <th>Sprout Time (Days)</th>
                    <th>Yield (G)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Butter King Lettuce</td>
                    <td>65</td>
                    <td>15</td>
                    <td>80</td>
                </tr>
                <tr className={'selected'}>
                    <td>Purple Lady Bok Choy</td>
                    <td>40</td>
                    <td>12</td>
                    <td>60</td>
                </tr>
                <tr>
                    <td>Chinese Hilton Cabbage</td>
                    <td>55</td>
                    <td>15</td>
                    <td>100</td>
                </tr>
                <tr>
                    <td>Blue Curled Scotch Kale</td>
                    <td>60</td>
                    <td>15</td>
                    <td>60</td>
                </tr>
                <tr>
                    <td>Vulcan Swiss Chard</td>
                    <td>60</td>
                    <td>20</td>
                    <td>80</td>
                </tr>
            </tbody>
        </table>
    )
}

export default TableView;