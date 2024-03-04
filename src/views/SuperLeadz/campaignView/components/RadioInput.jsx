import React from 'react'

const RadioInput = ({ title, name }) => {
    return (
        <>
          
            <label class="container mb-1">
                {title}
                <input type="radio" name={name} />
                <span class="checkmark"></span>
            </label>
        </>
    )
}

export default RadioInput