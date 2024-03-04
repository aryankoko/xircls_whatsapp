import React from 'react'

const CheckBox = ({title}) => {
    return (
        <>
             <div className="form-check form-switch gap-1 ">
                <input className="form-check-input" type="checkbox" role="switch"/>
                <label className="form-check-label" >{title}</label>
            </div>
        </>
    )
}

export default CheckBox