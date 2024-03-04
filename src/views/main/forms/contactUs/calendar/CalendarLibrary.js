import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const CalendarLibrary = ({ handleDateClick }) => {

  const [date, setDate] = useState(Date());

  const onChange = (newDate) => {
    setDate(newDate);
    console.log(newDate);
  };

  return (
    <div className=''>
      <Calendar
        onClickDay={handleDateClick}
        onChange={onChange}
        value={date}
      />
    </div>
  )
}

export default CalendarLibrary
