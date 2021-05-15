import React from 'react';
import './Field.css'
import {dateToYYYYMMDD} from "../../../../utils/formatDate";

const Field = ({label, name, type, min, max, step, dataset, value, update, error}) => {

    const genField = () => {
        switch (type) {
            case "text":
                return (
                    <input
                        name={name}
                        type={type}
                        value={value}
                        onChange={e => update(e)}
                    />
                )
            case "number":
                return (
                    <input
                        name={name}
                        type={type}
                        min={min}
                        max={max}
                        step={step}
                        value={value}
                        onChange={e => update(e)}
                    />
                )
            case "date":
            case "month":
                return (
                    <input
                        name={name}
                        type={type}
                        min={min}
                        max={max}
                        step={step}
                        value={dateToYYYYMMDD(value)}
                        onChange={e => update(e)}
                    />
                )
            case "textarea":
                return (
                    <textarea
                        name={name}
                        value={value}
                        onChange={e => update(e)}
                    />
                )
            case "select":
                return (
                    <select
                        name={name}
                        value={value}
                        onChange={e => update(e)}
                    >
                        <option disabled value={"0"}>Select Crop</option>
                        {dataset.map(crop => <option key={`crop-${crop.id}`} value={crop.id}>{crop.name}</option>)}
                    </select>
                )
            default:
                return (
                    <input
                        name={name}
                        type={type}
                        value={value}
                        onChange={e => update(e)}
                    />
                )
        }
    }

    return (
        <div className={"sidebar-field"}>
            <label>{label}</label>
            {genField()}
            {error ? <span className={"errorMsg"}>{error}</span> : null}
        </div>
    )
}

export default Field;