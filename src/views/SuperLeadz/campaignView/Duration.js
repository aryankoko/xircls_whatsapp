import React, { useState } from 'react'
import Wrapper from './Wrapper'
import PickerDefault from '../../Components/Date-picker/NormalDatePicker'

const Duration = () => {
    const [startDate, setStartDate] = useState('today')
    const [endDateEnabled, setEndDateEnabled] = useState(false)

    const handleEndDate = () => {
        setEndDateEnabled(!endDateEnabled)
    }

    return (
        <>
            <Wrapper />
            <div className='mt-3' style={{ width: "240px" }}>
                <label htmlFor="" className='form-control-label' style={{ fontSize: "0.85rem" }}>Start Date</label>
                <PickerDefault picker={startDate} setPicker={setStartDate} minDate={"today"} dateFormat={"Y-m-d h:i K"} enableTime={true} value={startDate} />

                <div className="form-check d-flex align-items-center gap-1 mx-0 p-0 my-2">
                    <label style={{ fontSize: "0.85rem" }} htmlFor="" className="form-check-label m-0 p-0">Set end date</label>
                    <input id='endDate' type="checkbox" className="form-check-input m-0 cursor-pointer" onChange={handleEndDate} />
                </div>

                {endDateEnabled && (
                    <div>
                        <label htmlFor="" className='form-control-label' style={{ fontSize: "0.85rem" }}>End Date</label>
                        <PickerDefault minDate={startDate} dateFormat={"Y-m-d h:i K"} enableTime={true} setPicker={setStartDate} />
                    </div>
                )}
            </div>
        </>
    )
}

export default Duration
