import React, { useState } from 'react'
import Navbar from '@src/views/main/utilities/navbar/Navbar'
import { Col, Container, Row } from 'reactstrap'
import Footer from '@src/views/main/utilities/footer/Footer'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

export default function AffiliateLoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    //   erors
    const [formErrors, setFormErrors] = useState({
        email: '',
        password: ''
    })

    //   change event
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }
    // make toast

    //   form validation
    const validateForm = () => {
        const errors = {}
        let isValid = true
        for (const key in formData) {
            if (!formData[key].trim()) {
                errors[key] = 'This field is required'
                isValid = false
            }
            if (!isValid) {
                break
            }
        }
        setFormErrors(errors)
        return isValid
    }

    // make a toast
    const makeToast = () => {
        toast.error('Invalid Email or Password', {
            position: "top-center"
        })
    }
    //   from sub,mit
    const handleSubmit = (e) => {
        e.preventDefault()
        if (validateForm()) {
            makeToast()
            // Submit the form data or perform any other action.
            console.log('Form data is valid:', formData)
        } else {
            console.log('Form data is invalid')
            makeToast()

        }
    }


    return (
        <div className='' style={{ background: "#fff" }}>

                {/* <Navbar /> */}
                <Container fluid="sm" className='login_cont' >
                    <Row className=' justify-content-center mt-lg-1 pt-lg-5 '>
                        <Col md="10" xl="8">
                            <form className='mt-2  rounded-2  p-3 ' >
                                <h1 className='display-3 main-heading text-center fw-bolder    ' >
                                    Login
                                    {/* for Merchant Account */}
                                </h1>
                                <h4 className='text-center text-secondary '>To Your Affiliate Account</h4>
                                <Row className=' px-0 px-md-5 mt-1 '>

                                    <Col xs="12" className='mt-2'>
                                        <label className="fs-4 main-heading">Email Address  </label>
                                        <input type="text" className={`form-control form-control  fs-5 text-dark rounded-1  `} onChange={handleInputChange} placeholder="Email" name="email" style={{ marginTop: "4px" }} />
                                        <span className="error text-danger ">{formErrors.email}</span>

                                    </Col>

                                    <Col xs="12" className='mt-2'>
                                        <label className="fs-4 main-heading">Password  </label>
                                        <input type="password" className={`form-control form-control  fs-5 text-dark rounded-1  `} onChange={handleInputChange} placeholder="Password" name="password" style={{ marginTop: "4px" }} />
                                        <span className="error text-danger ">{formErrors.password}</span>
                                    </Col>
                                    <div className='mt-1'>
                                        <Link to='/merchant/password_reset' className='text-dark  fs-5'>Forgotten Password?</Link>
                                    </div>
                                </Row>

                                <div className='text-center mt-1'>
                                    <h4 className='btn  main-btn-black btn-lg fs-4 px-5 fw-lig' onClick={handleSubmit}> Login</h4>
                                </div>
                                <div className='text-center'>
                                    {/* <Link to='/merchant/signup' className='fs-4 '>New to XIRCLS? <span className='text-primary'> Signup here.</span></Link> */}
                                </div>
                            </form>
                        </Col>
                    </Row>
                </Container>
                <hr className='mt-5' />
                <Footer />

        </div>
    )
}
