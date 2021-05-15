import React from 'react'
import Field from "./Field/Field";

const Form = ({fields, values, dataset, errors, update, children}) => {
    return (
        <form className={'sidebar-form'}>
            {fields.map(({label, name, type, min=null, max=null, step=null}, i) => (
                <Field
                    key={i}
                    label={label}
                    name={name}
                    type={type}
                    min={min}
                    max={max}
                    step={step}
                    dataset={dataset}
                    value={values[name]}
                    update={update}
                    error={errors[name]}
                />
            ))}
            {children}
        </form>
    )
}

export default Form;