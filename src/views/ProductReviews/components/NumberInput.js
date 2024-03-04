import React from 'react'

const NumberInput = (props) => {
    const { title, name, value, handleStyling, min, max } = props
    return (
        <div className=" w-75">
            <label htmlFor="fontSize">{title}</label><br />
            <input type="number" className="form-control mb-1" name={name} id={name} min={min} max={max} value={value} onChange={(e) => handleStyling(e)} />
        </div>
    )
}

export default NumberInput