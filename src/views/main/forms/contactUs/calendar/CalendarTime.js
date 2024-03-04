import React, { useState } from 'react'
import './CalendarComponent.scss'

const CalendarTime = ({ handleShowForm }) => {
    const [clickedTime, setClickedTime] = useState(null)

    const time = [
        {
            time: '3:30pm'
        },
        {
            time: '3:40pm'
        },
        {
            time: '3:50pm'
        },
        {
            time: '4:00pm'
        },
        {
            time: '4:10pm'
        },
        {
            time: '4:20pm'
        },
        {
            time: '4:50pm'
        },
        {
            time: '9:20am'
        },
        {
            time: '10:20am'
        },
        {
            time: '10:00am'
        }
    ]

    const handleTimeClick = (time) => {
        setClickedTime(time)
    }

    return (
        <>
            <div className="timeButton d-flex flex-column gap-1" style={{ overflowY: "scroll", maxHeight: "500px", marginTop: "35px", paddingBottom: "5px" }}>
                {
                    time.map((currTime, index) => {
                        return (
                            <>
                                <div className="allButton d-flex" key={index}>
                                    <button className=' p-1 fw-lig' style={{
                                        width: clickedTime === currTime.time ? "50%" : "100%",
                                        border: clickedTime === currTime.time ? "1px solid #A9A9A9" : "1px solid #086eff",
                                        color: clickedTime === currTime.time ? "#000" : "#086eff",
                                        borderRadius: "3px",
                                        marginRight: "5px",
                                        marginBottom: " 5px",
                                        background: clickedTime === currTime.time ? '#ffff' : 'white'
                                    }}
                                        onClick={() => handleTimeClick(currTime.time)}
                                    >
                                        {currTime.time}</button>
                                    {clickedTime === currTime.time && (
                                        <button className='border-0 text-light' style={{ width: "50%", background: "#086eff", borderRadius: "3px", height: "48px" }} onClick={handleShowForm}>
                                            Next
                                        </button>
                                    )}
                                </div>
                            </>
                        )
                    })
                }

            </div >
        </>
    )
}

export default CalendarTime