import React, {  useState } from 'react'
import { Row, Col } from 'reactstrap'
import { BsClock, BsCameraVideo, BsCalendar4, BsGlobeAsiaAustralia, BsArrowLeft } from 'react-icons/bs'
// import CalendarLibrary from './CalendarLibrary'
import CalendarTime from './CalendarTime'
import Select from 'react-select'
import './CalendarComponent.scss'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
// import FullCalendar from '@fullcalendar/react'
// import dayGridPlugin from '@fullcalendar/daygrid'
// import interactionPlugin from "@fullcalendar/interaction"
import CalenderCustom from './CalenderCustom'

const options = [
  { value: '190', label: '(UTC-12:00) International Date Line West' },
  { value: '571', label: '(UTC-11:00) Coordinated Universal Time-11' },
  { value: '172', label: '(UTC-10:00) Hawaii' },
  { value: '323', label: '(UTC-09:00) Alaska' },
  { value: '634', label: '(UTC-08:00) Pacific Time (US & Canada)' },
  { value: '95', label: '(UTC-07:00) Arizona' },
  { value: '406', label: '(UTC-07:00) Mountain Time (US & Canada)' }
]
const Products = [
  { value: 'superleadz', label: 'SuperLeadz' },
  { value: 'infiniti', label: 'Infiniti' },
  { value: 'semper', label: 'Semper Fi' },
  { value: 'sniper', label: 'Sniper' }

]

const CalendarComponent = () => {
  const [showThirdColumn, setShowThirdColumn] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [showGuestInput, setShowGuestInput] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null) // Set the default value here
  // eslint-disable-next-line no-unused-vars
  const [selectedProducts, setSelectedProducts] = useState(null) // Set the default value here
  const [SelectedDate, setSelectedDate] = useState(null)
  const type = useParams().type

  const handleShowForm = () => setShowForm(!showForm)

  const handleGuestInput = () => setShowGuestInput(true)

  // form validation
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  //   erors
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    message: ''
  })

  //   change event
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }
  //   form validation
  const validateForm = () => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
    const errors = {}
    let isValid = true
    for (const key in formData) {
      if (!formData[key].trim()) {
        errors[key] = 'This field is required'
        isValid = false
      }
      // Email validation
      if (formData.email) {
        if (!emailPattern.test(formData.email)) {
          errors.email = 'Invalid email address'
          isValid = false
        }
      }
      if (!isValid) {
        console.log("break")
        break
      }
    }
    setFormErrors(errors)
    return isValid
  }

  //   from sub,mit
  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      toast.success(() => <h6>success</h6>, {
        position: "top-center"
      })
    } else {
      console.log('Form data is invalid')
    }
  }


  const handleDateClickFull = (info) => {
    console.log(info)
    setShowThirdColumn(true)
    setSelectedDate(info)

  }
  
  return (
    <>
      <div className=" mt-3 ">
        <div className="calendar">
          <Row className='d-flex justify-content-center' >
            {showForm ? (
              <>
                <Col lg="3" style={{ Height: "500px", color: "black", boxShadow: "rgba(0, 0, 0, 0.16) 0px 0px 1px" }} className='p-2'>
                  <div className="back top-0 position-sticky z-3 " style={{ background: "white" }}>
                    <button className='mb-1 border bg-transparent' type="button" onClick={handleShowForm} style={{ borderRadius: "50%", padding: "6px", marginTop: "10px" }}><BsArrowLeft size={25} color='blue' /></button>
                  </div>
                  <div className="info allColumns" style={{ overflowY: "scroll", height: "85%" }}>
                    <span style={{ fontSize: "16px", fontWeight: "700" }}>Operations froazdasdm Xircls</span>
                    <h1 className=' fw-bolder mt-1'>Talk directly to us</h1>
                    <div className="time d-flex flex-column gap-1 mb-1 mt-1">
                      <div className="clock d-flex">
                        <BsClock size={20} /> <span style={{ marginLeft: "10px", fontSize: "16px" }}>15 min</span>
                      </div>
                      <div className="video d-flex align-items-center ">
                        <BsCameraVideo size={25} /> <span style={{ marginLeft: "10px", fontSize: "16px" }}>Web conferencing details provided upon confirmation.</span>
                      </div>
                      <div className="date-time d-flex align-items-center">
                        <BsCalendar4 size={25} /> <span style={{ marginLeft: "10px", fontSize: "16px" }}>3:30pm - 3:45pm, Wednesday, November 8, 2023</span>
                      </div>
                      <div className="time-zone d-flex align-items-center">
                        <BsGlobeAsiaAustralia size={25} /> <span style={{ marginLeft: "10px", fontSize: "16px" }}>India Standard Time</span>
                      </div>
                    </div>
                    <p className='mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae sequi maiores nostrum ut autem nobis non, accusantium facere tempore placeat itaque deserunt quod voluptatum doloremque, hic rem impedit ipsa quo quisquam reiciendis voluptatem culpa. Libero, eligendi possimus vel, consequatur sequi maiores iusto dignissimos magnam ducimus repellendus aliquid natus quasi veniam!</p>
                  </div>
                </Col>
                <Col className='allColumns' lg="4" style={{ Height: "500px", overflowY: "scroll", boxShadow: "rgba(0, 0, 0, 0.16) 0px 0px 1px" }}>
                  <div className="event-form p-2">
                    <form>
                      <span className='fw-bolder' style={{ fontSize: "20px", color: "black" }}>Enter Details</span>
                      <div className="name d-flex flex-column mt-1">
                        <span className=' text-black '>Name *</span>
                        <input type="text" className={`form-control form-control-sm text-dark rounded-1 `} onChange={handleInputChange} placeholder="Name" name="name" style={{ marginTop: "4px", fontSize: "15px" }} />
                        <span className="error text-danger ">{formErrors.name}</span>
                      </div>
                      <div className="email d-flex flex-column mt-1">
                        <span className=' text-black '>Email *</span>
                        <input type="email" className={`form-control form-control-sm text-dark rounded-1 `} onChange={handleInputChange} placeholder="Email" name="email" style={{ marginTop: "4px", fontSize: "15px" }} />
                        <span className="error text-danger ">{formErrors.email}</span>
                      </div>
                      {showGuestInput ? (
                        <>
                          <div className="guest-email d-flex flex-column mt-1 mb-2">
                            <span className='text-black'>Guest Email(s)</span>
                            <textarea className='form-control form-control-sm text-dark rounded-1 mb-1' rows="3" name="guest" placeholder="Email(s)" style={{ marginTop: "4px", fontSize: "15px" }}></textarea>
                            <span>Notify up to 10 additional guests of the scheduled event.</span>
                          </div>
                        </>
                      ) : (
                        <button className='mt-1 btn rounded-pill main-btn-dark px-2 fs-5' onClick={handleGuestInput}>Add Guests</button>
                      )
                      }
                      <div className=" mt-1">
                        <p className=' text-black '>Please share anything that will help prepare for our meeting.</p>
                        <div>
                          <textarea className='form-control form-control-sm text-dark rounded-1 ' rows="3" name="message" onChange={handleInputChange} placeholder="Message" style={{ marginTop: "4px", fontSize: "15px" }}></textarea>
                          <span className="error text-danger ">{formErrors.message}</span>
                        </div>
                        <h4 className='main-btn-blue rounded-pill d-inline-block  ' onClick={handleSubmit} style={{ padding: "8px 26px", fontSize: "16px", marginTop: "20px" }}>Schedule Event</h4>
                      </div>
                    </form>
                  </div>
                </Col>
              </>
            ) : (
              <>
                <Col lg="3" style={{ Height: "500px", color: "black", boxShadow: "rgba(0, 0, 0, 0.16) 0px 0px 1px" }} className=' p-2 '>
                  <div className="info allColumns h-100" style={{ overflowY: "scroll" }}>
                    <span style={{ fontSize: "16px", fontWeight: "700" }}>Operations from Xircls</span>
                    <h1 className=' fw-bolder mt-1'>Talk directly to us</h1>
                    <div className="time d-flex flex-column gap-1 mb-1 mt-1">
                      <div className="clock d-flex">
                        <BsClock size={20} /> <span style={{ marginLeft: "10px", fontSize: "16px" }}>15 min</span>
                      </div>
                      <div className="video d-flex align-items-center ">
                        <BsCameraVideo size={25} /> <span style={{ marginLeft: "10px", fontSize: "16px" }}>Web conferencing details provided upon confirmation.</span>
                      </div>
                    </div>
                    <p >Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae sequi maiores nostrum ut autem nobis non, accusantium facere tempore placeat itaque deserunt quod voluptatum doloremque, hic rem impedit ipsa quo quisquam reiciendis voluptatem culpa. Libero, eligendi possimus vel, consequatur sequi maiores iusto dignissimos magnam ducimus repellendus aliquid natus quasi veniam!</p>
                    <p >Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae sequi maiores nostrum ut autem nobis non, accusantium facere tempore placeat itaque deserunt quod voluptatum doloremque, hic rem impedit ipsa quo quisquam reiciendis voluptatem culpa. Libero, eligendi possimus vel, consequatur sequi maiores iusto dignissimos magnam ducimus repellendus aliquid natus quasi veniam!</p>
                    <p >Also, don’t worry, we are a lot friendlier than we look :P </p>
                  </div>
                </Col>
                <Col lg="4" className=' p-2 allColumns' style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 0px 1px " }}>

                  <div className="time-zone" style={{ marginTop: "20px", width: "400px" }}>
                    <h3 className='main-heading fs-3'  >Select Products</h3>
                    <div className="timezone-select" style={{ marginTop: "7px" }}>
                      {type === "superleadz" ? (
                        <Select options={Products} defaultValue={{ value: 'superleadz', label: 'SuperLeadz' }} onChange={(selectedProducts) => setSelectedProducts(selectedProducts)} />
                      ) : type === "infiniti" ? (
                        <Select options={Products} defaultValue={{ value: 'infiniti', label: 'Infiniti' }} onChange={(selectedProducts) => setSelectedProducts(selectedProducts)} />
                      ) : type === "semper" ? (
                        <Select options={Products} defaultValue={{ value: 'semper', label: 'Semper Fi' }} onChange={(selectedProducts) => setSelectedProducts(selectedProducts)} />
                      ) : type === "sniper" ? (
                        <Select options={Products} defaultValue={{ value: 'sniper', label: 'Sniper' }} onChange={(selectedProducts) => setSelectedProducts(selectedProducts)} />
                      ) : (
                        <Select options={Products} onChange={(selectedProducts) => setSelectedProducts(selectedProducts)} />
                      )}
                    </div>
                  </div>
                  <div className="time-zone" style={{ marginTop: "20px", width: "400px" }}>
                    <h3 className='main-heading fs-3'  >Time Zone</h3>

                    <div className="timezone-select" style={{ marginTop: "7px" }}>
                      <Select options={options} value={selectedOption} onChange={(selectedOption) => setSelectedOption(selectedOption)} />
                    </div>
                  </div>

                  <div className='mt-2'>
                    <h3 className='main-heading fs-3'  >Select a Date and Time</h3>
                    {/* <CalendarLibrary  /> */}
                    <div className='customeFullCalender'>
                      {/* <FullCalendar width="-110px"
                        plugins={[dayGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        dateClick={handleDateClickFull}
                        dayHeaderContent={dayHeaderContent}
                      /> */}

                      <CalenderCustom dateClick={handleDateClickFull} />
                    </div>
                  </div>
                </Col>

                <Col lg='2' className='p-2 allColumns ' style={{ display: `${showThirdColumn ? "" : "none"}`, boxShadow: "rgba(0, 0, 0, 0.16) 0px 0px 1px" }}>
                  <span className='fw-medium' style={{ fontSize: "16px" }}>{SelectedDate}</span>
                  <CalendarTime handleShowForm={handleShowForm} />
                </Col>
              </>
            )}
          </Row>
        </div>
      </div>
    </>
  )
}

export default CalendarComponent