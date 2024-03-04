/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'reactstrap'
import Footer from '@src/views/main/utilities/footer/Footer'
import toast from 'react-hot-toast'
import { baseURL } from '../../../../assets/auth/jwtService'
import axios from 'axios'
import FrontBaseLoader from '../../../Components/Loader/Loader'

export default function LoginPage() {
    const [EmailData, setEmailData] = useState()
    //   erors
    const [emailError, setemailError] = useState(false)
    const [apiLoader, setApiLoader] = useState(false)

    //   form validation
    const validateForm = () => {
        if (!EmailData) {
            setemailError(true)
            return false
        }
        setemailError(false)

        return true
    }
    // make a toast

    //   from sub,mit
    const handleSubmit = (e) => {
        e.preventDefault()
        if (validateForm()) {
            // Submit the form data or perform any other action.
            setApiLoader(true)

            const form_data = new FormData()
            form_data.append('email_id', EmailData)
            axios.post(`${baseURL}/api/v1/send_forgot_password/`, form_data)
                .then((resp) => {
                    console.log(resp)
                    if (resp.data.NoUserExist === "0") {

                        const form_data = new FormData()
                        form_data.append('email', EmailData)
                        form_data.append('passwordResetPage', "SEND EMAIL")
                        axios.post(`${baseURL}/api/v1/password_reset/`, form_data)
                            .then((resp) => {
                                console.log(resp)
                                toast.success('Please check your inbox.')
                                setApiLoader(false)

                            })
                            .catch((error) => {
                                console.log(error)
                                setApiLoader(false)

                            })
                    } else {
                        setApiLoader(false)
                        toast.error("User not found")
                    }
                })
                .catch((error) => {
                    setApiLoader(false)
                    console.log(error)
                })
        } else {
            console.log('Form data is invalid')

        }
    }


    return (
        <div className='login_cont' style={{ background: "#fff" }}>
            {
                apiLoader ? <FrontBaseLoader /> : ''
            }
            {/* <Navbar /> */}
            <div className='  ' >
                <Row className=' justify-content-center mt-lg-1 pt-lg-5 '>
                    <Col md="10" xl="8">
                        <form className='mt-2  rounded-2  p-3 ' onSubmit={handleSubmit}>
                            <h1 className='display-3 main-heading text-center fw-bolder    ' >
                                Reset Password
                            </h1>
                            <Row className=' px-0 px-md-5 mt-1 '>

                                <Col xs="12" className='mt-2'>
                                    <label className="fs-4 main-heading">Enter Email Address  </label>
                                    <input autoFocus type="text" className={`form-control form-control  fs-5 text-dark rounded-1  `} onChange={e => setEmailData(e.target.value)} placeholder="Email" name="email" style={{ marginTop: "4px" }} />
                                    <span className="error text-danger ">{emailError && 'Please enter your registered email.'} </span>

                                </Col>
                                <Col xs="12" className='mt-2'>
                                    <h5 className='text-dark'>Enter the email address you used to sign up to receive a password reset link
                                        in your inbox.<br /> Click on the link and follow instructions to reset your password in a flash!</h5>

                                </Col>
                            </Row>

                            <div className='text-center mt-1'>
                                <h4 className='btn  main-btn-black btn-lg fs-4 px-5' onClick={handleSubmit}> Send Email</h4>
                            </div>

                        </form>
                    </Col>
                </Row>
            </div>
            <hr className='mt-5' />
            <Footer />

        </div>
    )
}
