import React, { useState } from 'react' 
import { Check } from 'react-feather' 
import toast from "react-hot-toast"
import NavbarAdmin from './NavbarAdmin'
import { Card, CardBody, Col, Container, Row, Progress } from 'reactstrap'
import { SuperLeadzBaseURL } from '../../assets/auth/jwtService'

const CPS = () => {
  const [formData, setFormData] = useState({
    email: '',
    cps: '',
    on_issuance: '',
    on_click: '',
    base_plan_price: ''
  }) 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    }) 
  } 

  const handleSubmit = (e) => {
    e.preventDefault() 
    const formdata = new FormData() 
    formdata.append('email', formData.email) 
    formdata.append('on_issuance', formData.on_issuance) 
    formdata.append('on_click', formData.on_click) 
    formdata.append('base_plan_price', formData.base_plan_price) 
    formdata.append('cps', formData.cps) 
  
    const requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    } 
  
    fetch(`${SuperLeadzBaseURL}/utils/api/v1/create_commission_user/`, requestOptions)
      .then((response) => {
        if (response.status === 200) {
          toast.success('Details Updated Successfully')
          console.log('Successfully sent POST request') 
        } else {
          console.log('Failed to send POST request') 
        }
      })
      .catch((error) => {
        toast.error('Something went wrong!')
        console.log('Error:', error) 
      }) 
  } 
  return (
    <div>
      
      <div className='d-flex align-items-center justify-content-between p-2 text-center' style={{height:"vh", width:"100%", backgroundColor:"#7367F0"}}>
          <h1 style={{color:"white", textAlign:"center", marginLeft:"30px"}} className='d-flex align-items-center '>CPS Tags</h1>
          <NavbarAdmin />
      </div>

      {/* <Card className='row' style={{marginTop:"7%"}}>
          <CardBody className='d-flex justify-content-center align-items-center'> */}
          <div className='d-flex align-items-center justify-content-center p-2' style={{marginTop:"6%"}}>
            <Card className='card col-6 shadow-lg'>
              <CardBody className='card-body'>
                <div className='text-center mb-3'>
                  <h2>Create Commission Details</h2>
                </div>
                <form id='commissionForm' onSubmit={handleSubmit}>
                  <div className='d-flex justify-content-center align-items-center px-1 my-1 gap-1'>
                    <div className='d-flex justify-content-between align-items-center col-3'>
                      <label className='' htmlFor='email'>Email:</label>
                    </div>
                    <div className='col-9'>
                      <input
                        type='text'
                        className='form-control'
                        id='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
    
                  {/* CPS Input */}
                  <div className='d-flex justify-content-center align-items-center px-1 my-1 gap-1'>
                    <div className='d-flex justify-content-between align-items-center col-3'>
                      <label htmlFor='cps'>CPS:</label>
                    </div>
                    <div className='col-9'>
                      <input
                        type='number'
                        className='form-control'
                        id='cps'
                        name='cps'
                        value={formData.cps}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
    
                  {/* On Issuance Input */}
                  <div className='d-flex justify-content-center align-items-center px-1 my-1 gap-1'>
                    <div className='d-flex justify-content-between align-items-center col-3'>
                      <label htmlFor='on_issuance'>On Issuance:</label>
                    </div>
                    <div className='col-9'>
                      <input
                        type='number'
                        className='form-control'
                        id='on_issuance'
                        name='on_issuance'
                        value={formData.on_issuance}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
    
                  {/* On Click Input */}
                  <div className='d-flex justify-content-center align-items-center px-1 my-1 gap-1'>
                    <div className='d-flex justify-content-betweem align-items-center col-3'>
                      <label htmlFor='on_click'>On Click:</label>
                    </div>
                    <div className='col-9'>
                      <input
                        type='number'
                        className='form-control'
                        id='on_click'
                        name='on_click'
                        value={formData.on_click}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
    
                  {/* Base Plan Price Input */}
                  <div className='d-flex justify-content-center align-items-center px-1 my-1 gap-1'>
                    <div className='d-flex justify-content-between align-items-center col-3'>
                      <label htmlFor='base_plan_price'>Base Plan Price:</label>
                    </div>
                    <div className='col-9'>
                      <input
                        type='number'
                        className='form-control'
                        id='base_plan_price'
                        name='base_plan_price'
                        value={formData.base_plan_price}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className='d-flex justify-content-center align-items-center'>
                    <button className='btn bg-light-success mt-1 px-3 d-flex align-items-center' type='submit'>
                      <Check />
                      &nbsp;
                        Submit
                    </button>
                  </div>
                </form>
              </CardBody>
            </Card>
            </div>
          {/* </CardBody>
        </Card> */}

    </div>
  )
}

export default CPS