import React from 'react'

const ColorsInput = (props) => {
    const { title, name, value, handleStyling } = props
    return (
        <>
            <div className="">
                <label className="" for={name}>{title}</label><br />
                <input className=" w-75 mb-1 form-control" type="color" name={name} id={name} value={value} onChange={(e) => handleStyling(e)} />
            </div>
        </>
    )
}

export default ColorsInput