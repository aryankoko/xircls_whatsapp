import React, { useContext, useState } from 'react'
import { Col, Row, Container } from 'reactstrap'
import Footer from '@src/views/main/utilities/footer/Footer'
import { Link, useNavigate } from 'react-router-dom'
import { BsCheck, BsEyeFill, BsEyeSlashFill } from 'react-icons/bs'
import toast from 'react-hot-toast'
import { selectPhoneList } from '../../Helper/data'
import Select from 'react-select'
import axios from 'axios'
import { baseURL, postReq } from '../../assets/auth/jwtService'
import { setToken } from '../../assets/auth/auth'
import FrontBaseLoader from '../Components/Loader/Loader'
import { PermissionProvider } from "../../Helper/Context"

export default function FlowSignUp() {
    const [apiLoader, setApiLoader] = useState(false)
    const params = new URLSearchParams(location.search)
    const { setUserPermission, userPermission } = useContext(PermissionProvider)
    const navigate = useNavigate()
    const [ShowPass, setShowPass] = useState({
        pass: false,
        cpass: false
    })
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        phone_code: "",
        phone_no: "",
        email: params.get('email'),
        password: "",
        confirm_password: "",
        app: params.get('app'),
        website: params.get('shop'),
        currency: params.get('currency'),
        shopify_xircls_app_id: params.get('shopify_xircls_app_id'),
        termsAndCondition: false,
        checkPassword: true,
        checkShop: true,
        checkEmail: true
    })

    const CustErrorMsg = {
        first_name: 'Please enter your first name',
        last_name: 'Please enter your last name',
        email: 'Please enter your email ID',
        phone_no: 'Please enter your phone number',
        phone_code: 'Please enter your country code',
        password: 'Please enter your password',
        confirm_password: 'Please confirm your password',
        termsAndCondition: 'Please check the terms and privacy policy',
        uppercase: 'one uppercase letter,',
        lowercase: 'one lowercase letter,',
        number: 'one number,',
        specialChar: 'one special character,',
        length: 'password must be 8 to 18 characters long,'
    }

    //   erors
    const [formErrors, setFormErrors] = useState({})

    // password valid error
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


    //  handle emial is exist or not
    const isEmailExist = () => {
        const Email_error = document.getElementById("Email_error")
        let isExist = true
        const form_data = new FormData()
        // form_data.append('email', formData.email)
        form_data.append('email', formData.email)
        axios.post(`${baseURL}/merchant/check_validation/`, form_data)
            .then(resp => {
                // console.log(resp)
                if (resp.status === 400) {
                    toast.error(resp.message)
                    setFormErrors({ email_exist: "Email already exist" })
                    setFormData({ ...formData, checkEmail: false })
                    Email_error.style.display = "block"
                } else {
                    setFormData((preData) => ({
                        ...preData,
                        checkEmail: true
                    }))
                    isExist = false
                    Email_error.style.display = "none"
                }
            })
            .catch((error) => {
                console.log(error)
                setFormErrors({ email_exist: "Email already exist" })
                setFormData({ ...formData, checkEmail: false })
                Email_error.style.display = "block"
                toast.error(`Email already exist`)
            })
        console.log(formData)
        return isExist
    }
    const isShopExist = () => {
        const website_error = document.getElementById("website_error")
        let isExist = true
        const form_data = new FormData()
        // form_data.append('email', formData.email)
        form_data.append('website', formData.website)
        axios.post(`${baseURL}/merchant/check_validation/`, form_data)
            .then(resp => {
                // console.log(resp)
                if (resp.status === 400) {
                    toast.error(resp.message)
                    // let updatedData

                    setFormErrors({ website: "Shop already exist" })
                    website_error.style.display = "block"
                    setFormData({ ...formData, checkShop: false })
                } else {

                    setFormData((preData) => ({
                        ...preData,
                        checkShop: true
                    }))
                    isExist = false
                    website_error.style.display = "none"

                }
            })
            .catch((error) => {
                console.log(error)
                setFormErrors({ website: "Shop already exist" })
                setFormData({ ...formData, checkShop: false })
                toast.error(` 'Website already exist`)
                website_error.style.display = "block"

            })
        console.log(formData)
        return isExist
    }
    //   input handle event
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target

        if (type === 'checkbox') {
            setFormData({
                ...formData,
                [name]: checked
            })
        } else {
            setFormData({
                ...formData,
                [name]: value
            })

            if (name === 'password') {
                passValid(value)
            }
        }
    }


    //  all form validation
    const validateForm = () => {
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

        if (!formData.first_name) {
            setFormErrors({ first_name: CustErrorMsg.first_name })
            return false
        }
        if (!formData.last_name) {
            setFormErrors({ last_name: CustErrorMsg.last_name })
            return false
        }

        isShopExist('website')
        if (formData.website && !formData.checkShop) {
            return false
        }

        if (!formData.email) {
            setFormErrors({ email: CustErrorMsg.email })
            return false
        }

        if (!emailPattern.test(formData.email)) {
            setFormErrors({ email: "Invalid email address" })
            return false

        }

        isEmailExist('email')
        if (!formData.checkEmail) {
            return false
        }

        if (!formData.phone_no) {
            setFormErrors({ phone_no: CustErrorMsg.phone_no })
            return false
        }
        if (!formData.phone_code) {
            setFormErrors({ phone_no: CustErrorMsg.phone_code })
            return false
        }
        if (!formData.password) {
            setFormErrors({ password: CustErrorMsg.password })
            return false

        }
        passValid(formData.password)
        if (!formData.checkPassword) {
            return false
        }
        if (!formData.confirm_password) {
            setFormErrors({ confirm_password: CustErrorMsg.confirm_password })
            return false
        }
        if (formData.confirm_password && (formData.confirm_password !== formData.password)) {
            setFormErrors({ confirm_password: "Password does not match" })
            return false
        }
        if (!formData.termsAndCondition) {
            setFormErrors({ termsAndCondition: "Please check the terms and privacy policy" })
            return false
        }
        setFormErrors({})
        return true
    }

    //   from submit
    const handleSubmit = (e) => {
        e.preventDefault()

        console.log("fromErrors", formErrors)
        console.log('Form data is valid:', formData)
        if (validateForm()) {
            setApiLoader(true)
            // Submit the form data or perform any other action.
            // toast.success(() => <h6>success</h6>, {
            //     position: "top-center"
            // })
            // return null
            const newformData = new FormData()
            Object.entries(formData).map(([key, value]) => newformData.append(key, value))

            if (localStorage.getItem('aft_no')) {
                newformData.append("aft_no", localStorage.getItem('aft_no'))
            }

            newformData.append("platform", params.get("platform"))
            // console.log(newformData)
            postReq("signup", newformData)
                .then((res) => {
                    // setApiLoader(false)
                    console.log(res.data)
                    const tokenValue = JSON.stringify(res.data)
                    setToken(tokenValue)
                    setUserPermission({...userPermission, appName: params.get('app')})
                    // if (res.status === 201) {
                    // toast.success('Signed In')
                    navigate(`/processing/?app=${params.get('app')}&shop=${params.get('shop')}&email=${formData.email}&platform=${params.get("platform")}`)
                    // }
                })
                .catch((err) => {
                    console.log(err)
                    // setApiLoader(false)
                    toast.error("Something went wrong!")
                    setApiLoader(false)

                })
        } else {
            console.log('Form data is invalid')

        }
        setApiLoader(false)

    }


    return (
        <div className='' style={{ background: "#fff" }}>
            {
                apiLoader ? <FrontBaseLoader /> : ''
            }
            <Container fluid="sm" className='customeHomeDiv' >
                <Row className='justify-content-center mt-lg-1 pt-lg-5 '>
                    <Col md="10" xl="8" style={{width: '950px', maxWidth: '100%'}}>
                        <form className='mt-2 p-3' onSubmit={handleSubmit} >
                            <h1 className='display-3 main-heading text-center fw-bolder    ' >
                                Sign Up
                                {/* for Merchant Account */}
                            </h1>
                            <h4 className='text-center text-secondary '>For a New Merchant Account</h4>
                            <Row className=' px-0 px-md-5 mt-3 '>
                                <Col xs="12" md="6" className=''>
                                    <label className="fs-4 main-heading">First Name  </label>
                                    <input type="text" className="form-control form-control  fs-5 text-capitalize text-dark rounded-1" onChange={handleInputChange} placeholder="First Name" value={formData?.first_name} name="first_name" style={{ marginTop: "4px" }} />
                                    <span className="error text-danger ">{formErrors.first_name}</span>
                                </Col>
                                <Col xs="12" md="6" className='mt-1 mt-md-0'>
                                    <label className="fs-4 main-heading">Last Name  </label>
                                    <input type="text" className="form-control form-control  fs-5 text-capitalize text-dark rounded-1" onChange={handleInputChange} placeholder="Last Name" name="last_name" value={formData?.last_name} style={{ marginTop: "4px" }} />
                                    <span className="error text-danger ">{formErrors.last_name}</span>

                                </Col>

                                <Col xs="12" className='mt-2'>
                                    <label className="fs-4 main-heading">Store URL  </label>
                                    <input type="text" className="form-control form-control  fs-5 text-dark rounded-1" onChange={handleInputChange} onBlur={() => { isShopExist('website') }} placeholder="Store URL" value={formData?.website} name="website" style={{ marginTop: "4px" }} />
                                    <span className="error text-danger " id="website_error" style={{ display: "none" }}>Shop already exist</span>

                                </Col>
                                <Col xs="12" className='mt-2'>
                                    <label className="fs-4 main-heading">Email Address  </label>
                                    <input type="text" className="form-control form-control  fs-5 text-dark rounded-1" onChange={handleInputChange} onBlur={() => { isEmailExist('email') }} placeholder="Email" name="email" value={formData?.email} style={{ marginTop: "4px" }} />
                                    <span className="error text-danger ">{formErrors.email}</span>
                                    <span className="error text-danger " id="Email_error" style={{ display: "none" }}>Email already exist</span>
                                </Col>

                                {/* mobile  */}
                                <Col xs="12" className='mt-2'>
                                    <label className="fs-4 main-heading">Mobile Number</label>
                                    <Row className=' row-gap-1 '>
                                        <Col xs="12" md="4" className=''>
                                            <Select
                                                isMulti={false}
                                                options={selectPhoneList}
                                                closeMenuOnSelect={true}
                                                name="phone_code"
                                                onChange={(e) => setFormData({ ...formData, phone_code: e.value })}
                                                styles={{
                                                    control: (baseStyles) => ({
                                                        ...baseStyles,
                                                        fontSize: '14px',
                                                        padding: "3px 0px",
                                                        height: '100%'
                                                    })
                                                }}
                                            />
                                        </Col>
                                        <Col xs="12" md="8" className=''>
                                            <input type="number" className={`form-control form-control fs-5 text-dark rounded-1`} onChange={handleInputChange} name="phone_no" value={formData?.phone_no} placeholder="Mobile" />

                                        </Col>
                                    </Row>
                                    <div className='d-flex justify-content-center  align-items-start ' style={{ marginTop: "4px" }}>

                                    </div>
                                    <span className="error text-danger ">{formErrors.phone_no}</span>

                                </Col>

                                <Col xs="12" className='mt-2  position-relative '>
                                    <label className="fs-4 main-heading">Password  </label>
                                    <input type={ShowPass.pass ? 'text' : 'password'} className="form-control form-control  fs-5 text-dark rounded-1" id="signup_pass_input" onChange={handleInputChange} placeholder="Password" name="password" value={formData?.password} style={{ marginTop: "4px" }} autoComplete="new-password" />

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
                                    <input type={ShowPass.cpass ? 'text' : 'password'} className="form-control form-control  fs-5 text-dark rounded-1" onChange={handleInputChange} placeholder="Confirm Password" name="confirm_password" value={formData?.confirm_password} style={{ marginTop: "4px" }} autoComplete="new-password" />
                                    <h4 className='position-absolute  cursor-pointer' style={{ top: "38px", right: "30px", color: "#a9a9a9" }} onClick={() => setShowPass({ ...ShowPass, cpass: !ShowPass.cpass })} >{ShowPass.cpass ? <BsEyeFill /> : <BsEyeSlashFill />}</h4>

                                    <span className="error text-danger ">{formErrors.confirm_password}</span>
                                </Col>


                                <Col xs="12" className='mt-2'>

                                    <h5 className='text-black'> <input type="checkbox" name="termsAndCondition" id="" className='me-1' checked={formData?.termsAndCondition} onChange={handleInputChange} /> BY SIGNING UP, YOU AGREE TO XIRCLS' TERMS OF USE AND PRIVACY POLICY.</h5>
                                    <span className="error text-danger ">{formErrors.termsAndCondition}</span>

                                </Col>
                            </Row>
                            <div className='text-center mt-3'>
                                <button type='submit' className='btn  main-btn-black btn-lg fs-4 px-5 fw-lig' onClick={handleSubmit}> Signup</button>
                            </div>
                            <div className='text-center'>
                                <Link to='/merchant/login' className='fs-4 '>Already a XIRCLS merchant?<span className='text-primary'> Login here.</span></Link>
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
