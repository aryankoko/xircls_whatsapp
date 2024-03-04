import React from 'react'

const SelectInput = ({options, disabled}) => {
    return (
        <>
            <select style={{ padding: "5px 10px", cursor: "pointer" }} className='form-control rounded' id="mySelect" disabled={disabled}>
                {
                    options?.map(ele => (
                        <option key={ele.value} value={ele.value}>{ele.label}</option>
                    ))
                }
            </select>
        </>
    )
}

export default SelectInput