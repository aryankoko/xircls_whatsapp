import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Form, Label, Input, Button, Card, CardBody, InputGroup } from 'reactstrap'
import { selectPhoneList } from '../../../Helper/data'
import Select from "react-select"
import { validForm } from '../../Validator'
import toast from 'react-hot-toast'
import { postReq } from '../../../assets/auth/jwtService'

function BusinessCreation() {
    const [isValidPassword, setIsValidPassword] = useState()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        companySize: "",
        industry: "",
        contact: "",
        timezone: "",
        password: "",
        countryCode: "",
        preferredBillingCurrency: ""
    })


    const formValuesCheck = [
        {
            name: 'name',
            message: 'Enter Full Name',
            type: 'string',
            id: 'name'
        },
        {
            name: 'email',
            message: 'Enter Email',
            type: 'email',
            id: 'email'
        },
        // {
        //   name: 'password',
        //   message: 'Password should be at least 6 characters & must contain at least one special character',
        //   type: 'string',
        //   id: 'password'
        // },
        {
            name: 'company',
            message: 'Enter Company Name',
            type: 'string',
            id: 'company'
        },
        {
            name: 'companySize',
            message: 'Select Company Size',
            type: 'string',
            id: 'companySize'
        },
        {
            name: 'industry',
            message: 'Select Industry',
            type: 'string',
            id: 'industry'
        },
        {
            name: 'countryCode',
            message: 'Select Country Code',
            type: 'string',
            id: 'countryCode'
        },
        {
            name: 'contact',
            message: 'Enter Mobile Number',
            type: 'number',
            id: 'contact'
        },
        {
            name: 'preferredBillingCurrency',
            message: 'Enter Preferred Billing Currency',
            type: 'string',
            id: 'preferredBillingCurrency'
        },
        {
            name: 'timezone',
            message: 'Enter Timezone',
            type: 'string',
            id: 'timezone'
        }

    ]


    const industryOptions = [
        { value: 'Ecommerce', label: 'Ecommerce' },
        { value: 'Education', label: 'Education' },
        { value: 'Automotive', label: 'Automotive' },
        { value: 'IT Services', label: 'IT Services' },
        { value: 'Real Estate', label: 'Real Estate' },
        { value: 'SAAS/Apps', label: 'SAAS/Apps' },
        { value: 'Gaming', label: 'Gaming' },
        { value: 'Entertainment', label: 'Entertainment' },
        { value: 'Finance and Banking', label: 'Finance and Banking' },
        { value: 'Other', label: 'Other' }
    ]


    const companySizeOptions = [
        { value: '1-10', label: '1-10 Employees' },
        { value: '10-20', label: '10-20 Employees' },
        { value: '20-50', label: '20-50 Employees' },
        { value: '50-200', label: '50-200 Employees' },
        { value: '200+', label: '200+ Employees' }
    ]

    const timeZoneData = [{ value: 'Asia/Calcutta GMT+05:30', label: '(UTC+05:30) India Standard Time (IST)' }]

    const currencyData = [
        { value: 'INR', label: 'Indian Rupee' },
        { value: 'USD', label: 'United States Dollar' }

    ]


    const validatePassword = (password) => {
        // const regexTest = /[!@#$%^&*(),.?":{}|<>]/
        return password.length >= 5
    }


    const handleInputChange = (e) => {

        const { name, value } = e.target
        setIsValidPassword(validatePassword(value))
        // console.log(validatePassword(value))
        setFormData(prev => ({ ...prev, [name]: value }))
    }


    const postData = async () => {

        console.log(formData)
        const form_data = new FormData()
        Object.entries(formData).map(([key, value]) => {
            form_data.append(key, value)
        })
        postReq("Business_view", formData)
            // .then(response => {
            //     if (!response.ok) {
            //         throw new Error(`HTTP error! Status: ${response.status}`)
            //     }
            //     return response.json()
            // })
            .then((res) => {
                console.log(res)
                // if (res.ok) {
                toast.success('Account Created Successfully')
                // } else {
                //     console.error('Error submitting data:', res.statusText)
                //     toast.error('Something went wrong')
                // }
                // setLoader(false)
            }).catch((err) => {
                if (err.response && err.response.status === 400) {
                    toast.error(err.response.data.message)
                    console.log(err.response)
                } else {
                    toast.error('Something went wrong')
                }
            })

    }

    const handleSubmit = () => {
        const checkForm = validForm(formValuesCheck, formData)
        console.log("formData", formData)
        console.log(checkForm, 'checkForm')
        if (checkForm && isValidPassword) {
            postData()
        } else if (!isValidPassword) {
            toast.error("Enter Valid Password")
        } else {
            console.log('Something went wrong!')
        }
    }

    return (
        <Container>

            <Card>
                <CardBody>
                    <div className='title'>
                        <h4>Create Business</h4>
                    </div>
                </CardBody>
            </Card>

            <Card>
                <CardBody >
                    <Row>
                        <Col md={6}>
                            <Label for="name">Full Name</Label>
                            <Input
                                name='name'
                                id='name'
                                type='text'
                                placeholder='Full Name'
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                            <p id="fullName_val" className="text-danger m-0 p-0 vaildMessage"></p>
                        </Col>
                        <Col md={6}>
                            <Label for="email">Email</Label>
                            <Input
                                name='email'
                                id='email'
                                type='email'
                                placeholder='Email'
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            <p id="email_val" className="text-danger m-0 p-0 vaildMessage"></p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className="mt-1">
                            <Label for="password">Password</Label>
                            <Input
                                name='password'
                                id='password'
                                type='password'
                                placeholder='Password'
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                            <p className="text-secondary m-0 p-0 vaildMessage">
                                <ul>
                                    <li>Password should be at least 6 characters</li>
                                    <li>Must contain at least one special character</li>
                                </ul>
                            </p>
                        </Col>
                        <Col md={6} className="mt-1">
                            <Label for="company">Company Name</Label>
                            <Input
                                name='company'
                                id='company'
                                type='text'
                                placeholder='Company Name'
                                value={formData.company}
                                onChange={handleInputChange}
                            />
                            <p id="companyName_val" className="text-danger m-0 p-0 vaildMessage"></p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className="">
                            <Label for="companySize">Company Size</Label>
                            <Select
                                name='companySize'
                                id='companySize'
                                options={companySizeOptions}
                                value={companySizeOptions.filter((ele) => ele.value === formData.companySize)}
                                onChange={((value) => {
                                    handleInputChange({ target: { name: 'companySize', value: value.value } })
                                })}
                            />
                            <p id="companySize_val" className="text-danger m-0 p-0 vaildMessage"></p>
                        </Col>
                        <Col md={6} className="">
                            <Label for="industry">Industry</Label>
                            <Select
                                name='industry'
                                id='industry'
                                options={industryOptions}
                                value={industryOptions.filter((ele) => ele.value === formData.industry)}
                                onChange={((value) => {
                                    handleInputChange({ target: { name: 'industry', value: value.value } })
                                })}
                            />
                            <p id="industry_val" className="text-danger m-0 p-0 vaildMessage"></p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className="mt-1">
                            <Label for="contact">Mobile Number</Label>
                            <InputGroup>
                                <Select
                                    name="countryCode"
                                    id="countryCode"
                                    options={selectPhoneList}
                                    value={selectPhoneList.filter((ele) => ele.value === formData.countryCode)}
                                    onChange={((value) => {
                                        handleInputChange({ target: { name: 'countryCode', value: value.value } })
                                    })}
                                />
                                <Input
                                    name='contact'
                                    id='contact'
                                    type='text'
                                    className='ms-1'
                                    placeholder='Mobile Number'
                                    value={formData.contact}
                                    onChange={handleInputChange}
                                    maxLength={10}
                                />
                            </InputGroup>
                            <p id="countryCode_val" className="text-danger m-0 p-0 vaildMessage"></p>
                            <p id="mobileNumber_val" className="text-danger m-0 p-0 vaildMessage"></p>
                        </Col>
                        <Col md={6} className="mt-1">
                            <Label for="preferredBillingCurrency">Preferred Billing Currency</Label>

                            <Select
                                name='preferredBillingCurrency'
                                id='preferredBillingCurrency'
                                type='text'
                                options={currencyData}
                                value={currencyData.filter((ele) => ele.value === formData.preferredBillingCurrency)}
                                onChange={((value) => {
                                    handleInputChange({ target: { name: 'preferredBillingCurrency', value: value.value } })
                                })}
                            />
                            <p id="preferredBillingCurrency_val" className="text-danger m-0 p-0 vaildMessage"></p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className="mt-1">
                            <Label for="timezone">Timezone</Label>
                            <Select
                                name='timezone'
                                id='timezone'
                                type='text'
                                options={timeZoneData}
                                placeholder='Timezone'
                                value={timeZoneData.filter((ele) => ele.value === formData.timezone)}
                                onChange={((value) => {
                                    handleInputChange({ target: { name: 'timezone', value: value.value } })
                                })}
                            />

                            <p id="timezone_val" className="text-danger m-0 p-0 vaildMessage"></p>
                        </Col>
                    </Row>
                    <div>
                        <div className='submit_btn text-end '>
                            <Button Button type="submit" className='btn-primary text-end ' onClick={() => handleSubmit()}>Submit</Button>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </Container>
    )
}

export default BusinessCreation