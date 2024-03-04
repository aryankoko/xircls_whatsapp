import React, { useEffect, useState } from 'react'
import './custom_scss.scss'
import { ChevronLeft, ChevronRight } from 'react-feather'

const CalenderCustom = ({dateClick}) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [currMonth, setCurrMonth] = useState(currentDate.getMonth())
  const [currYear, setCurrYear] = useState(currentDate.getFullYear())
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedMonth, setSelectedMonth] = useState(null)
  const [selectedYear, setSelectedYear] = useState(null)

  const months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ]
  const handleDayClick = (day) => {
    
    setSelectedDate(day)
    setSelectedMonth(months[currMonth])
    setSelectedYear(currYear)

    dateClick(`${day} ${months[currMonth]}, ${currYear}`)
    // You can do something with the selected date here
    // console.log(`Selected Date: ${day}, ${months[currMonth]}, ${currYear}`);
  }

  const renderCalendar = () => {
    const firstDayOfMonth = new Date(currYear, currMonth, 1).getDay()
    const lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate()
    const lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay()
    const lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate()

    const days = []

    for (let i = firstDayOfMonth; i > 0; i--) {
      days.push(
        <li key={`inactive-${i}`} className="inactive">
          {lastDateOfLastMonth - i + 1}
        </li>
      )
    }

    for (let i = 1; i <= lastDateOfMonth; i++) {
      const isToday =
        i === currentDate.getDate() &&
        currMonth === currentDate.getMonth() &&
        currYear === currentDate.getFullYear()

      days.push(
        <li
          key={i}
          className={`${isToday ? 'active' : ''} ${((selectedDate === i) && selectedMonth === months[currMonth] && selectedYear === currYear) ? 'selected' : ''}`}
          onClick={() => handleDayClick(i)}
        >
          {i}
        </li>
      )
    }

    for (let i = lastDayOfMonth; i < 6; i++) {
      days.push(
        <li key={`inactive-last-${i}`} className="inactive">
          {i - lastDayOfMonth + 1}
        </li>
      )
    }

    return days
  }

  const handleMonthChange = (increment) => {
    setCurrMonth((prevMonth) => prevMonth + increment)
  
    if (currMonth + increment < 0 || currMonth + increment > 11) {
      const newDate = new Date(currYear, currMonth + increment, currentDate.getDate())
      setCurrYear(newDate.getFullYear())
      setCurrMonth(newDate.getMonth())
    } else {
      setCurrentDate(new Date())
    }

    // Reset selected date when the month changes
    // setSelectedDate(null)
  }

  useEffect(() => {
    // Add any additional logic you need when the state variables change
  }, [currYear, currMonth, currentDate])

  return (
    <div className="test ">
      <div className="wrapper border">
        <header>
          <div className="icons  w-100 justify-content-between  align-items-center ">
            <span onClick={() => handleMonthChange(-1)} className="material-symbols-rounded d-flex justify-content-center align-items-center ">
            <ChevronLeft size={18}/>
            </span>
          <p className="current-date fs-4 p-0 m-0">{`${currentDate.getDate()} ${months[currMonth]} ${currYear}`}</p>

            <span onClick={() => handleMonthChange(1)} className="material-symbols-rounded d-flex justify-content-center align-items-center">
              <ChevronRight size={18}/>
            </span>
          </div>
        </header>
        <div className="calendar">
          <ul className="weeks p-0 fs-6">
            <li>S</li>
            <li>M</li>
            <li>T</li>
            <li>W</li>
            <li>T</li>
            <li>F</li>
            <li>S</li>
          </ul>
          <ul className="days p-0">{renderCalendar()}</ul>
        </div>
      </div>
    </div>
  )
}

export default CalenderCustom