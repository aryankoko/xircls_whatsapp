import React, { useEffect, useState } from 'react'
import { Card, CardBody, Container, Row, Col, Input } from "reactstrap"
import Select from "react-select"
import { validForm } from '../../Validator'
import { crmURL, getReq, postReq } from '../../../assets/auth/jwtService'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import Flatpickr from 'react-flatpickr'
import moment from 'moment'
// import { validForm } from "../Validator"

const AddCall = () => {

   const valueToCheck = [
      {
         name: 'xircls_customer_id',
         message: 'Enter Customer Name',
         type: 'string',
         id: 'xircls_customer_id'
      },
      {
         name: 'Call_Status',
         message: 'Select Call Status',
         type: 'string',
         id: 'Call_Status'
      },
      {
         name: 'Call_Purpose',
         message: 'Select Call Purpose',
         type: 'string',
         id: 'call_purpos'
      },
      {
         name: 'Lead_Status',
         message: 'Select Lead Status',
         type: 'string',
         id: 'Lead_Status'
      },
      {
         name: 'Interested',
         message: 'Select Interested',
         type: 'string',
         id: 'Interested'
      }
   ]

   const navigate = useNavigate()

   const { id } = useParams()
   const [customerList, setCustomerList] = useState([])
   // console.log(useParams(), "params")
   const params = new URLSearchParams(location.search)

   // const [formData, setFormData] = useState({ schedule_call: false })
   const [data, setData] = useState({
      customer_name: "",
      Call_Status: "",
      Call_Purpose: "",
      Lead_Status: "",
      xircls_customer_id: "",
      Notes: "",
      Interested: "",
      schedule_Next_Call: false,
      schedule_Next_Call_date: "",
      schedule_Next_Call_time: "",
      email: false,
      sms: false
   })

   // {
   //    "customer_name": "Fname Lname",
   //    "Call_Status": "Junk Lead",
   //    "Call_Purpose": "sale_call",
   //    "Lead_Status": "Cold",
   //    "xircls_customer_id": 57154,
   //    "schedule_call": false,
   //    "Note": "asfsdf",
   //    "Interested": "Maybe",
   //    "schedule_Next_Call": true,
   //    "schedule_Next_Call_date": "2024-01-24",
   //    "schedule_Next_Call_time": "12:00",
   //    "email": true,
   //    "sms": true
   // }

   const inputChangeHandler = (e) => {
      setData({ ...data, [e.target.name]: e.target.value })
   }

   const saveData = (action) => {

      const form_data = new FormData()

      Object.entries(data).map(([key, value]) => form_data.append(key, value))

      if (params.get('type') === "edit") {
         form_data.append("add_call_id", id)
      }

      postReq('add_call', form_data)
      .then((resp) => {
         console.log(resp)
         if (action === "SAVE & CLOSE") {
            navigate(-1)
         } else {
            navigate(`/merchant/customers/add_call/${resp?.data?.data?.id}?type=edit`)
         }

         toast.success("Saved Successfully")
      })
      .catch((error) => {
         console.log(error)
         toast.error("Something went wrong!")
      })
   }

   const handleSubmitSection = (e, action) => {
      e.preventDefault()

      const checkForm = validForm(valueToCheck, data)
      console.log(checkForm, "result")

      if (checkForm) {
         console.log("Form is valid")

         saveData(action)
      }
   }

   console.log(data, "data")

   const handleInputChange = (e, type) => {
      if (type === undefined) {
         const { name, value, type } = e.target
         setData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? !prev[name] : value
         }))
      } else {
         setData(prev => ({
            ...prev,
            [type]: value
         }))
      }
   }

   const getCustomer = () => {
      getReq("getAllCustomer", "", crmURL)
      .then((resp) => {
         console.log(resp)
         setCustomerList(resp?.data?.success?.map((curElem) => {
            return { label: curElem?.customer_name ? curElem?.customer_name : '-', value: curElem?.xircls_customer_id }
         }))
      })
      .catch((error) => {
         console.log(error)
      })
  }

   const callStatusOptions = [
      { value: 'Not Contacted', label: 'Not Contacted' },
      { value: 'Attempted to Contact', label: 'Attempted to Contact' },
      { value: 'Contacted', label: 'Contacted' },
      { value: 'Junk Lead', label: 'Junk Lead' },
      { value: 'Not Interested', label: 'Not Interested' },
      { value: 'DND (Call & SMS)', label: 'DND (Call & SMS)' },
      { value: 'DND (Email)', label: 'DND (Email)' },
      { value: 'DND (All)', label: 'DND (All)' },
      { value: 'Junk Lead', label: 'Junk Lead' }
   ]

   const callPurposeOptions = [
      { value: 'prospecting', label: 'Prospecting' },
      { value: 'sale_call', label: 'Sale Call' },
      { value: 'negotiation', label: 'Negotiation' },
      { value: 'close_Sale', label: 'Close Sale' }
   ]

   const leadStatusOptions = [
      { value: 'Cold', label: 'Cold' },
      { value: 'Warm', label: 'Warm' },
      { value: 'Hot', label: 'Hot' }
      // { value: 'File Pickup', label: 'File Pickup' }
   ]

   const linterestedOptions = [
      { value: 'Yes', label: 'Yes' },
      { value: 'No', label: 'No' },
      { value: 'Maybe', label: 'Maybe' }
   ]

   const fetchServiceData = () => {

      const form_data = new FormData()
      
      if (params.get('type') === "customer") {
         form_data.append("edit_type", "is_customer_detail")
      } else if (params.get('type') === "edit") {
         form_data.append("edit_type", "is_add_call")
      }

      form_data.append("id", id)
      postReq("get_view_customer", form_data)
      .then((resp) => {
         console.log("ResponseId:", resp)
         let updatedData
         if (params.get('type') === "customer") {
            updatedData = {
               customer_name: resp?.data?.success[0]?.customer_name,
               xircls_customer_id: resp?.data?.success[0]?.id
            }

         } else if (params.get('type') === "edit") {
            updatedData = {
               customer_name: resp?.data?.success[0]?.customer?.customer_name,
               xircls_customer_id: resp?.data?.success[0]?.customer?.id,
               Call_Status: resp?.data?.success[0]?.Call_Status,
               Call_Purpose: resp?.data?.success[0]?.Call_Purpose,
               Lead_Status: resp?.data?.success[0]?.Lead_Status,
               Notes: resp?.data?.success[0]?.Notes,
               Interested: resp?.data?.success[0]?.Interested,
               schedule_Next_Call: resp?.data?.success[0]?.schedule_Next_Call,
               schedule_Next_Call_date: resp?.data?.success[0]?.schedule_Next_Call_date,
               schedule_Next_Call_time: resp?.data?.success[0]?.schedule_Next_Call_time,
               email: false,
               sms: false
            }
         }
         setData((preData) => ({
            ...preData,
            ...updatedData
         }))
      })
      .catch((error) => {
         console.error("Error:", error)
         toast.error('Failed to fetch Customer details')
      })
   }

   useEffect(() => {
      if (id) {
         fetchServiceData()
      }
      getCustomer()
   }, [])

   return (
      <>
         <div className="customer-profile">
            <Card>
               <CardBody>
                  {/* <h3 className="mb-0">{id ? 'Edit Vehicle' : 'Add Vehilcle'}</h3> */}
                  <h3 className="mb-0">Add Call</h3>
               </CardBody>
            </Card>
            <Card>
               <CardBody>
                  <form >
                     <Container fluid className="px-0 pb-1">
                        <Row>
                           <Col md={12} className="">
                              <h4 className="mb-0">Call Details</h4>
                           </Col>
                           <Col md={6} className="mt-2">
                              <label htmlFor="customer-name">Customer Name</label>
                              {/* <input type='text' id='customer-name' name='customer_name' className="form-control"
                                 value={data?.customer_name}
                                 onChange={(e) => {
                                    inputChangeHandler(e)
                                 }}
                                 disabled
                              /> */}
                              <Select
                                 placeholder='Customer Name'
                                 id="insurance-type"
                                 options={customerList}
                                 closeMenuOnSelect={true}
                                 name='xircls_customer_id'
                                 value={customerList?.find($ => Number($.value) === Number(data?.xircls_customer_id))}
                                 // components={{ Menu: CustomSelectComponent }}
                                 onChange={(value) => {
                                    setData(prevData => ({ ...prevData, xircls_customer_id: value.value }))
                                 }}
                                 isDisabled={params.get('type') === "customer" || params.get('type') === "edit"}
                              />
                              <p id="xircls_customer_id_val" className="text-danger m-0 p-0 vaildMessage"></p>
                           </Col>
                           <Col md={6} className="mt-2">
                              <label htmlFor="Call_Status">Call Status</label>
                              <Select
                                 placeholder='Call Status'
                                 id="call_status"
                                 name="Call_Status"
                                 options={callStatusOptions}
                                 closeMenuOnSelect={true}
                                 onChange={(e) => {
                                    inputChangeHandler({ target: { name: 'Call_Status', value: e?.value } })
                                 }}
                                 value={callStatusOptions.filter(option => data.Call_Status === option.value)}
                              />
                              <p id="Call_Status_val" className="text-danger m-0 p-0 vaildMessage"></p>
                           </Col>
                           <Col md={6} className="mt-2">
                              <label htmlFor="call_purpos">Call Purpose</label>
                              <Select
                                 placeholder='Call Purpose'
                                 id="call_purpos"
                                 name="Call_Purpose"
                                 options={callPurposeOptions}
                                 closeMenuOnSelect={true}
                                 onChange={(e) => {
                                    inputChangeHandler({ target: { name: 'Call_Purpose', value: e?.value } })
                                 }}
                                 value={callPurposeOptions.filter(option => data.Call_Purpose === option.value)}
                              />
                              <p id="call_purpos_val" className="text-danger m-0 p-0 vaildMessage"></p>
                           </Col>
                           <Col md={6} className="mt-2">
                              <label htmlFor="Lead_Status" className="" style={{ margin: '0px' }}>
                                 Lead Status
                              </label>
                              <Select
                                 placeholder='Lead Status'
                                 id="Lead_Status"
                                 name="Lead_Status"
                                 // isDisabled={viewPage}
                                 options={leadStatusOptions}
                                 closeMenuOnSelect={true}
                                 onChange={(e) => {
                                    inputChangeHandler({ target: { name: 'Lead_Status', value: e?.value } })
                                 }}
                                 value={leadStatusOptions.filter(option => data.Lead_Status === option.value)}

                              // value={leadStatusOptions?.filter(option => option.value === formData?.vehicle_type)}
                              // onChange={e => handleInputChange(e, 'vehicle_type')}
                              />
                              <p id="Lead_Status_val" className="text-danger m-0 p-0 vaildMessage"></p>
                           </Col>
                           <Col md={12} className="mt-2">
                              <label htmlFor="notes-label" className="" style={{ margin: '0px' }}>
                                 Notes
                              </label>
                              {/* <div className="form-floating"> */}
                              <textarea className="form-control" placeholder="Leave a note here" id="notes-label" style={{ minHeight: '90px' }}
                                 onChange={(e) => {
                                    console.log(e.target.value)
                                    inputChangeHandler({ target: { name: 'Notes', value: e.target.value } })
                                 }} value={data?.Notes} />
                           </Col>
                           <Col md={6} className="mt-2">
                              <label htmlFor="interested" className="" style={{ margin: '0px' }}>
                                 Interested
                              </label>
                              <Select
                                 placeholder='Interested'
                                 // isDisabled={viewPage}
                                 options={linterestedOptions}
                                 closeMenuOnSelect={true}
                                 onChange={(e) => {
                                    inputChangeHandler({ target: { name: 'Interested', value: e?.value } })
                                 }}
                                 value={linterestedOptions?.filter(option => option.value === data?.Interested)}
                              // onChange={e => handleInputChange(e, 'vehicle_type')}
                              />
                              <p id="Interested_val" className="text-danger m-0 p-0 vaildMessage"></p>
                           </Col>
                           <Row>
                              <Col md={12} className="mt-2">
                                 <div className="d-flex justify-content-start align-items-center gap-1">
                                    <input
                                       type="checkbox"
                                       id="schedule_Next_Call"
                                       className="form-check-input cursor-pointer"
                                       name="schedule_Next_Call"
                                       checked={data.schedule_Next_Call}
                                       onChange={handleInputChange}
                                    />
                                    <label htmlFor="schedule_Next_Call">Schedule Next Call</label>
                                 </div>
                              </Col>

                              {data.schedule_Next_Call && (
                                 <>
                                    {/* ... (previous code) */}
                                    <Col md={6} className="mt-2">
                                       <label htmlFor="vehicle-delivery-date">Date:</label>
                                       <Flatpickr className='form-control' 
                                          onChange={(e) => {
                                             handleInputChange({target: {name: "schedule_Next_Call_date", value: moment(e[0]).format("YYYY-MM-DD")}})
                                          }} 
                                          options={{ minDate: "today", dateFormat: "Y-m-d" }} 
                                          placeholder="Date"
                                          value={data.schedule_Next_Call_date} 
                                       />
                                       {/* <input
                                          placeholder="Date"
                                          type="date"
                                          id="vehicle-delivery-date"
                                          name="schedule_Next_Call_date"
                                          className="form-control"
                                          value={data.schedule_Next_Call_date}
                                          onChange={handleInputChange}
                                       /> */}
                                    </Col>
                                    <Col md={6} className="mt-2">
                                       <label htmlFor="vehicle-delivery-date">Time:</label>
                                       <input
                                          type="time"
                                          id="appt"
                                          className="form-control"
                                          name="schedule_Next_Call_time"
                                          value={data.schedule_Next_Call_time}
                                          onChange={handleInputChange}
                                       />
                                    </Col>
                                 </>
                              )}
                           </Row>

                           <Row className='d-none'>
                              <Col md={12} className="mt-2">
                                 <h4 className="mb-0">Send</h4>
                              </Col>
                              <Col md={12} className="mt-1">
                                 <div className="d-flex justify-content-start align-items-center gap-1">
                                    <input
                                       type="checkbox"
                                       id="send_email"
                                       className="form-check-input m-0 p-0 cursor-pointer"
                                       name="email"
                                       checked={data?.email}
                                       onChange={handleInputChange}
                                    />
                                    <label htmlFor="send_email" >Send Email</label>
                                 </div>
                              </Col>
                              <Col md={12} className="mt-1">
                                 <div className="d-flex justify-content-start align-items-center gap-1">
                                    <input
                                       type="checkbox"
                                       id="send_sms"
                                       className="form-check-input cursor-pointer"
                                       name="sms"
                                       checked={data?.sms}
                                       onChange={handleInputChange}
                                    />
                                    <label htmlFor="send_sms">Send SMS</label>
                                 </div>
                              </Col>
                           </Row>
                        </Row>
                        <div className='w-100 d-flex justify-content-between mt-3'>
                           <div>
                              <button className="btn btn-primary" type="button" onClick={() => navigate(-1)} >Back</button>
                           </div>
                           {/* {!viewPage &&  */}
                           <div className='d-flex justify-content-center align-items-center gap-2'>
                              <button className="btn btn-primary ms-2" type="button" onClick={e => handleSubmitSection(e, 'SAVE')}>Save</button>
                              <button className="btn btn-primary" type="button" onClick={e => handleSubmitSection(e, 'SAVE & CLOSE')} >Save & Close</button>
                           </div>
                           {/* } */}
                        </div>
                     </Container>
                  </form>
               </CardBody>
            </Card>
         </div>
      </>
   )
}

export default AddCall