import React, { useState } from "react"
import { Card, CardBody, Container, Row, Col } from 'reactstrap'
import OnlineOutletNav from "./OnlineOutletNav"
import './css/OnlineOutlet.css'

const OnlineOutletBasic = () => {


    const [outletBasicDesc, setOutletBasicDesc] = useState('Description - Demo Account ')
    const [descLength, setDescLength] = useState(outletBasicDesc.length)
    const [basicSenderId, setBasicSenderId] = useState('info@xircls.com')
    const [mobileApp, setMobileApp] = useState(false)
    const [http, setHttp] = useState(false)

    const basicTextareaFunc = (event, type) => {
        if (type === 1) {
            setOutletBasicDesc(event.target.value)
            setDescLength(event.target.value.length)
        }
        if (type === 2) {
            setBasicSenderId(event.target.value)
        }
    }
    return (
        <>
            <Container fluid className="online-outlet px-0">
                <Card>
                    <CardBody>
                        <h3 className="mb-0">Edit Online Outlet</h3>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <OnlineOutletNav />
                        <Container fluid>
                            <div className="border rounded my-2 mx-1 px-2 pt-2">
                                <Row>
                                    <Col md={12} className='mb-1'>
                                        <h4>Basic Info</h4>
                                        <hr />
                                    </Col>
                                    <Col md={6} className='mb-3'>
                                        <Row>
                                            <Col md={3}>
                                                <label htmlFor="basic-protocol">
                                                    Protocol
                                                </label>
                                                <select id='basic-protocol' className="form-select cursor-pointer" aria-label="Default select example">
                                                    <option onClick={() => setHttp(false)} selected>https://</option>
                                                    <option onClick={() => setHttp(true)} value="1">http://</option>
                                                </select>
                                            </Col>
                                            <Col md={9}>
                                                <label htmlFor="outlet-web-url">
                                                    Outlet Website URL
                                                </label>
                                                <input placeholder="Outlet Website URL" type='text' id='outlet-web-url' name='outlet-web-url' className="form-control" />
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col md={12} className={`${!http && 'd-none'} mb-3`}>
                                        <div className="p-1 text-danger bg-light-danger rounded">
                                            <h5 style={{ fontWeight: 'bold' }} className="text-danger">Your website is NOT secure.</h5>
                                            <p style={{ fontWeight: 'light' }}>Your Outlet website MUST have an SSL certificate (depicted by the https:// prefix) to start a cross-marketing campaign on XIRCLS. This is to ensure a safe & secure shopping experience for customers of all our merchants. Please renew your SSL certificate immediately.</p>
                                        </div>
                                    </Col>
                                    <div className="w-100"> </div>
                                    <Col md={6} className='mb-3'>
                                        <label htmlFor="outlet-web-app-name">
                                            Website / Mobile App Name
                                        </label>
                                        <input placeholder="Website / Mobile App Name" type='text' id='outlet-web-app-name' name='outlet-web-app-name' className="form-control" />
                                    </Col>
                                    <div className="w-100"> </div>
                                    <Col md={6} className='mb-3'>
                                        <label htmlFor="outlet-basic-country">
                                            Country
                                        </label>
                                        <select id='outlet-basic-country' className="form-select cursor-pointer" aria-label="Default select example">
                                            <option selected disabled>Select Country</option>
                                        </select>
                                    </Col>
                                    <Col md={6} className='mb-3'>
                                        <label htmlFor="outlet-basic-state">
                                            State / Province
                                        </label>
                                        <select id='outlet-basic-state' className="form-select cursor-pointer" aria-label="Default select example">
                                            <option selected disabled>Select State / Province</option>
                                        </select>
                                    </Col>
                                    <Col md={6} className='mb-3'>
                                        <label htmlFor="outlet-basic-city">
                                            City
                                        </label>
                                        <select id='outlet-basic-city' className="form-select cursor-pointer" aria-label="Default select example">
                                            <option selected disabled>Select City</option>
                                        </select>
                                    </Col>
                                    <Col md={6} className='mb-3'>
                                        <label htmlFor="outlet-basic-ph-code">
                                            Phonecode
                                        </label>
                                        <select id='outlet-basic-ph-code' className="form-select cursor-pointer" aria-label="Default select example">
                                            <option selected disabled>Select Phonecode</option>
                                        </select>
                                    </Col>
                                    <Col md={6} className='mb-3'>
                                        <label htmlFor="outlet-basic-time-zone">
                                            Timezone
                                        </label>
                                        <select id='outlet-basic-time-zone' className="form-select cursor-pointer" aria-label="Default select example">
                                            <option selected disabled>Select Timezone</option>
                                        </select>
                                    </Col>
                                    <Col md={6} className='mb-3'>
                                        <label htmlFor="outlet-basic-currency">
                                            Currency
                                        </label>
                                        <select id='outlet-basic-currency' className="form-select cursor-pointer" aria-label="Default select example">
                                            <option selected disabled>Select Currency</option>
                                        </select>
                                    </Col>
                                    <Col md={6} className='mb-3'>
                                        <label htmlFor="outlet-basic-currency-name">
                                            Currency Name
                                        </label>
                                        <input readOnly id='outlet-basic-currency-name' placeholder="Currency Name" className="form-control" value={"Currency Name"} />
                                    </Col>
                                </Row>
                                <Row className=" my-2">
                                    <Col s={6}>
                                        <div>
                                            <h5>Do you have a Mobile App?</h5>
                                            <div className='d-flex' style={{ gap: '2rem' }}>
                                                <div className='cursor-pointer form-check' onClick={() => setMobileApp(true)}>
                                                    <input checked={mobileApp} type='radio' name='outlet-basic-radio' id='outlet-basic-radio1' className=' form-check-input cursor-pointer' />
                                                    <label htmlFor='outlet-basic-radio1' className='cursor-pointer form-check-label'>Yes</label>
                                                </div>
                                                <div className='cursor-pointer custom-control form-check' onClick={() => setMobileApp(false)}>
                                                    <input checked={!mobileApp} type='radio' name='outlet-basic-radio' id='outlet-basic-radio2' className=' form-check-input cursor-pointer' />
                                                    <label htmlFor='outlet-basic-radio2' className='cursor-pointer form-check-label'>No</label>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className='mt-3'>
                                    <Col md={6} className={`${!mobileApp && 'd-none'}  mb-3`}>
                                        <label htmlFor="outlet-basic-ios-url">
                                            IOS App URL
                                        </label>
                                        <input id='outlet-basic-ios-url' placeholder="IOS App URL" className="form-control" />
                                    </Col>
                                    <Col md={6} className={`${!mobileApp && 'd-none'}  mb-3`}>
                                        <label htmlFor="outlet-basic-android-url">
                                            Android App URL
                                        </label>
                                        <input id='outlet-basic-android-url' placeholder="Android App URL" className="form-control" />
                                    </Col>
                                    <Col md={12} className='mb-3'>
                                        <label htmlFor="outlet-basic-description">
                                            Description
                                        </label>
                                        <textarea maxLength={200} placeholder="Description - E.g. We sell cool t-shirts and streetwear from Ed Hardy, Diesel, Replay etc." onChange={(event) => basicTextareaFunc(event, 1)} id='outlet-basic-description' value={outletBasicDesc} className="form-control" />
                                        <span style={{ fontSize: '0.8rem' }} className={`${descLength === 200 ? 'text-danger' : 'text-secondary'}`} >{200 - (descLength)} characters remaining</span>
                                    </Col>
                                    <Col md={6} className='mb-3'>
                                        <label htmlFor="outlet-basic-sender-id">
                                            Please specify a Sender ID to Issue Your Offers (Default - <span className="fw-bold text-black">info@xircls.com</span>)
                                        </label>
                                        <input onChange={(event) => basicTextareaFunc(event, 2)} id='outlet-basic-sender-id' value={basicSenderId} placeholder="Sender ID" className="form-control" />
                                    </Col>
                                    <div className="w-100">
                                    </div>
                                    <Col md={6} className='mb-3'>
                                        <label htmlFor="basic-product-consump">
                                            Product Consumption
                                        </label>
                                        <select id='basic-product-consump' className="form-select cursor-pointer" aria-label="Default select example">
                                            <option disabled selected>Select Product Consumption</option>
                                            <option value="1">offline</option>
                                            <option value="2">online</option>
                                            <option value="3">hybrid</option>
                                        </select>
                                    </Col>
                                    <Col md={6} className='mb-3'>
                                    </Col>
                                </Row>
                            </div>
                            <Row className="my-2 mx-0">
                                <Col s={6}><button className="btn btn-primary rounded-2">Back</button></Col>
                                <Col s={6} className='text-end'><button className="btn btn-primary rounded-2 mx-2">Save</button><button className="btn btn-primary rounded-2">Save & Proceed</button></Col>
                            </Row>

                        </Container>
                    </CardBody>
                </Card>
            </Container>

        </>
    )
}

export default OnlineOutletBasic