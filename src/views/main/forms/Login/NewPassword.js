/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Col, Container, Row } from 'reactstrap'
import Footer from '@src/views/main/utilities/footer/Footer'
import toast from 'react-hot-toast'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { baseURL } from '../../../../assets/auth/jwtService'
import axios from 'axios'
import FrontBaseLoader from '../../../Components/Loader/Loader'
import { BsCheck, BsEyeFill, BsEyeSlashFill } from 'react-icons/bs'

export default function NewPassword() {
    const { slug } = useParams()
    const navigate = useNavigate()
    const [apiLoader, setApiLoader] = useState(false)

    const [ShowPass, setShowPass] = useState({
        pass: false,
        cpass: false
    })

    const [formData, setFormData] = useState({
        password: "",
        confirm_password: "",
        checkPassword: true
    })
    const [formErrors, setFormErrors] = useState({})
    // password error no pass chnage only
    const generateErrorMessage = (condition, message) => {
        const isSuccess = condition ? 'text-secondary' : 'text-success'
        return (
            <h6 className={`m-0 p-0 d-flex justify-content-start align-items-center ${isSuccess}`}>
                <BsCheck />
                {message}
            </h6>
        )
    }
    const passValid = (value) => {
        const errors = {}
        const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,18}$/

        const isValid = passwordPattern.test(value)

        errors.uppercase = generateErrorMessage(!/(?=.*[A-Z])/.test(value), 'one uppercase letter,')
        errors.lowercase = generateErrorMessage(!/(?=.*[a-z])/.test(value), 'one lowercase letter,')
        errors.number = generateErrorMessage(!/(?=.*\d)/.test(value), 'one number,')
        errors.specialChar = generateErrorMessage(!/(?=.*[@#$%^&+=!])/.test(value), 'one special character')
        errors.length = generateErrorMessage(
            value.length < 8 || value.length > 18,
            'password must be 8 to 18 characters long'
        )

        setFormErrors(errors)
        setFormData((preData) => ({
            ...preData,
            checkPassword: isValid
        }))

        return isValid
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
        if (name === 'password') {
            passValid(value)
        }
    }

    const validateForm = () => {
        const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,18}$/

        if (!formData.password) {
            setFormErrors({ password: "Please enter your password" })
            return false
        }
        passValid(formData.password)
        if (!formData.checkPassword) {
            return false
        }
        if (!formData.confirm_password) {
            setFormErrors({ confirm_password: "Please confirm your password" })
            return false
        }
        if (formData.confirm_password && (formData.confirm_password !== formData.password)) {
            setFormErrors({ confirm_password: "Password does not match" })
            return false
        }
        setFormErrors({})
        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Form data is valid:', formData)
        if (validateForm()) {
            setApiLoader(true)
            const form_data = new FormData()
            form_data.append('uid', slug.split("-")[0])
            form_data.append('token', `${slug.split("-")[1]}-${slug.split("-")[2]}`)
            form_data.append('new_password1', formData.password)
            form_data.append('new_password2', formData.confirm_password)
            form_data.append('change_password', "CHANGE PASSWORD")
            axios.post(`${baseURL}/api/v1/password_reset_confirm/`, form_data)
                .then((resp) => {
                    console.log(resp)
                    setApiLoader(false)
                    toast.success('Password change successful')
                    navigate('/merchant/login/')
                })
                .catch((error) => {
                    console.log(error)
                    setApiLoader(false)
                })
        } else {
            toast.error('invalid form data')

        }
    }

    return (
        <div className='login_cont' style={{ background: "#fff" }}>
            {
                apiLoader ? <FrontBaseLoader /> : ''
            }
            {/* <Navbar /> */}
            <Container fluid="sm" className='  ' >
                <Row className=' justify-content-center mt-lg-1 pt-lg-5 '>
                    <Col md="10" xl="8">
                        <form className='mt-2  rounded-2  p-3 ' >
                            <h1 className='display-3 main-heading text-center fw-bolder    ' >
                                New Password
                            </h1>
                            <Row className=' px-0 px-md-5 mt-1 '>


                                <Col xs="12" className='mt-2  position-relative '>
                                    <label className="fs-4 main-heading">Password  </label>
                                    <input type={ShowPass.pass ? 'text' : 'password'} className="form-control form-control  fs-5 text-dark rounded-1" id="signup_pass_input" onChange={handleInputChange} placeholder="New Password" name="password" style={{ marginTop: "4px" }} autoComplete="new-password" />

                                    <h4 className='position-absolute  cursor-pointer' style={{ top: "38px", right: "30px", color: "#a9a9a9" }} onClick={() => setShowPass({ ...ShowPass, pass: !ShowPass.pass })} >{ShowPass.pass ? <BsEyeFill /> : <BsEyeSlashFill />}</h4>
                                    <div className='text-danger'> {formErrors.password}</div>
                                    <div className='d-flex flex-column user-select-none' >

                                        {formErrors.uppercase}
                                        {formErrors.lowercase}
                                        {formErrors.number}
                                        {formErrors.specialChar}
                                        {formErrors.length}
                                    </div>

                                </Col>
                                <Col xs="12" className='mt-2 mt-2 position-relative'>
                                    <label className="fs-4 main-heading">Confirm Password  </label>
                                    <input type={ShowPass.cpass ? 'text' : 'password'} className="form-control form-control  fs-5 text-dark rounded-1" onChange={handleInputChange} placeholder="Confirm Password" name="confirm_password" style={{ marginTop: "4px" }} autoComplete="new-password" />
                                    <h4 className='position-absolute  cursor-pointer' style={{ top: "38px", right: "30px", color: "#a9a9a9" }} onClick={() => setShowPass({ ...ShowPass, cpass: !ShowPass.cpass })} >{ShowPass.cpass ? <BsEyeFill /> : <BsEyeSlashFill />}</h4>

                                    <span className="error text-danger ">{formErrors.confirm_password}</span>
                                </Col>

                            </Row>

                            <div className='text-center mt-1' >
                                <h4 className='btn  main-btn-black btn-lg fs-4 px-5' onClick={handleSubmit}>
                                    Change password</h4>
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
