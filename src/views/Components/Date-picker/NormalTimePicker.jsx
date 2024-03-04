import React, { Fragment, useEffect, useState } from 'react'
import TimePicker from 'react-time-picker'
import 'react-time-picker/dist/TimePicker.css'
import 'react-clock/dist/Clock.css'

const NormalTimePicker = () => {
    const [value, setValue] = useState("")
    useEffect(() => {
        const timePickerClass = document.querySelectorAll("input.react-time-picker__inputGroup__input")
        timePickerClass.forEach(time => {
            time.classList.add("form-control")
        })
        console.log(timePickerClass)
    }, [])
    return (
        <Fragment>
            <style>
                {`
                    .react-time-picker__clock.react-time-picker__clock--open, .react-time-picker__clock-button.react-time-picker__button {
                        display: none;
                    }
                `}
            </style>
            <TimePicker onChange={setValue} value={value} />
        </Fragment>
    )
}

export default NormalTimePicker