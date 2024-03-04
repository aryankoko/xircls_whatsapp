import React, { useState } from 'react'

const FormEditSection = () => {
    const inputFields = [{ name: 'names' }, { name: 'email' }, { name: 'phone' }, { name: 'birthday' }, { name: 'opt-in' }]
    const [checkedFields, setCheckedFields] = useState(['names', 'phone'])
    return (
        <div className='p-2'>
            <label className='mb-2'>Input fields: </label>
            <div className="inputs-selection d-flex justify-content-between flex-wrap mb-2">
                {inputFields.map((ele, key) => {
                    return (
                        <label key={key} style={{ cursor: 'pointer', color: checkedFields.includes(ele.name) ? 'white' : '#174150', backgroundColor: checkedFields.includes(ele.name) ? '#174150' : 'rgba(0,0,0,0)', border: '1px solid #174150', transition: '0.25s ease' }} className={`d-flex align-items-center gap-2 text-capitalize px-2 py-1 rounded mb-2`} htmlFor={`id-${ele.name}-input`}>
                            <input checked={checkedFields.includes(ele.name)} onChange={(e) => {
                                if (e.target.checked) {
                                    setCheckedFields([...checkedFields, ele.name])
                                } else {
                                    setCheckedFields(checkedFields.length === 2 ? checkedFields : [...checkedFields].filter(item => item !== ele.name))
                                }
                            }} style={{ display: 'none' }} type="checkbox" id={`id-${ele.name}-input`} />
                            {ele.name}
                        </label>
                    )
                })}
            </div>
            <div className="inputs">
                {inputFields.filter(item => checkedFields.some(ele => item.name === ele)).map((ele, key) => {
                    return (
                        <div key={key} className='d-flex flex-column align-items-start mb-2'>
                            <label htmlFor={`input-${ele.name}`}>
                                <span className='text-capitalize'>{ele.name}</span>:
                            </label>
                            <input style={{ border: 'none', outline: 'none' }} id={`input-${ele.name}`} type="text" className='form-control' />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default FormEditSection