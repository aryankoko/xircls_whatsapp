import React, { useState } from "react"
import { Bell, Box, Check, Clock, Eye, File, Flag, Gift, Key, Phone, PlusCircle, Send, Star, Tool, TrendingUp, User, X } from "react-feather"
import { Container, Card, CardBody, Row, Col } from 'reactstrap'
import './CustomerProfile.css'
import CustomerProfileNav from "./CustomerProfileNav"

const CustomerProfileDetails = () => {

    const [vis, setVis] = useState(true)

    return (
        <>
            <Container fluid className="customer-profile px-0">
                <Card>
                    <CardBody>
                        <h3 className="mb-0">Customer Profile</h3>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <Container className="px-2">
                            <CustomerProfileNav />
                        </Container>
                    </CardBody>
                </Card>

                <Row className="match-height">
                    <Col md={9}>
                        <Card>
                            <CardBody>
                                <Row className="match-height mb-2">
                                    <Col md={8}>
                                        <div className="d-flex gap-1">
                                            <div style={{ width: '100px', height: '100px' }}>
                                                <img src="https://www.xircls.com/static/app-assets/images/avatars/default_user.jpg" style={{ width: '100%' }} />
                                            </div>
                                            <div>
                                                <h4 className="mb-0">Customer Name</h4>
                                                <p>example@gmail.com</p>
                                                <button className="btn btn-primary">Edit</button>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={4}>
                                        <div className="d-flex justify-content-between mb-1">
                                            <div className="d-flex fw-light w-50 align-items-center gap-1 fs-small"><User size={15} />Full Name</div>
                                            <div className="fw-800 fs-small w-50 text-start">Full Name</div>
                                        </div>
                                        <div className="d-flex justify-content-between mb-1">
                                            <div className="d-flex fw-light w-50 align-items-center gap-1 fs-small"><Check size={15} />Status</div>
                                            <div className="fw-800 fs-small w-50 text-start">Status</div>
                                        </div>
                                        <div className="d-flex justify-content-between mb-1">
                                            <div className="d-flex fw-light w-50 align-items-center gap-1 fs-small"><Star size={15} />Type</div>
                                            <div className="fw-800 fs-small w-50 text-start">Type</div>
                                        </div>
                                        <div className="d-flex justify-content-between mb-1">
                                            <div className="d-flex fw-light w-50 align-items-center gap-1 fs-small"><Flag size={15} />Country</div>
                                            <div className="fw-800 fs-small w-50 text-start">Country</div>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <div className="d-flex fw-light w-50 align-items-center gap-1 fs-small"><Phone size={15} />Contacts</div>
                                            <div className="fw-800 fs-small w-50 text-start">Contacts</div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="match-height py-1">
                                    <Col md={2} className=' '>
                                        <div className="mb-1 d-flex align-items-center justify-content-center gap-1 fs-2"><span style={{ width: '30px', height: '30px' }} className='bg-light-warning d-flex justify-content-center align-items-center rounded'><TrendingUp size={20} /></span>0</div>
                                        <div className="text-center fs-small">Total Invoice</div>
                                    </Col>
                                    <Col md={2} className=" border-start">
                                        <div className="mb-1 d-flex align-items-center justify-content-center gap-1 fs-2"><span style={{ width: '30px', height: '30px' }} className='bg-light-info d-flex justify-content-center align-items-center rounded fs-4'>₹</span>0</div>
                                        <div className="text-center fs-small">Total Revenue</div>
                                    </Col>
                                    <Col md={2} className=" border-start">
                                        <div className="mb-1 d-flex align-items-center justify-content-center gap-1 fs-2"><span style={{ width: '30px', height: '30px' }} className='bg-light-success d-flex justify-content-center align-items-center rounded fs-4'>₹</span>0</div>
                                        <div className="text-center fs-small">Wallet</div>
                                    </Col>
                                    <Col md={2} className=" border-start">
                                        <div className="mb-1 d-flex align-items-center justify-content-center gap-1 fs-2"><span style={{ width: '30px', height: '30px' }} className='bg-light-danger d-flex justify-content-center align-items-center rounded fs-4'>₹</span>0</div>
                                        <div className="text-center fs-small">Balance to Pay</div>
                                    </Col>
                                    <Col md={2} className=" border-start">
                                        <div className="mb-1 d-flex align-items-center justify-content-center gap-1 fs-2"><span style={{ width: '30px', height: '30px' }} className='bg-light-info d-flex justify-content-center align-items-center rounded'><Box size={20} /></span>0</div>
                                        <div className="text-center fs-small">Reward Point</div>
                                    </Col>
                                    <Col md={2} className=" border-start">
                                        <div className="mb-1 d-flex align-items-center justify-content-center gap-1 fs-2"><span style={{ width: '30px', height: '30px' }} className='bg-light-primary d-flex justify-content-center align-items-center rounded'><Box size={20} /></span>0</div>
                                        <div className="text-center fs-small">Loyalty Points Redeemed</div>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card className="border border-primary">
                            <CardBody>
                                <Row className="px-1">
                                    <Col md={6} onClick={() => setVis(true)} className={`text-center cursor-pointer ${vis && 'active'} `}>
                                        CLV
                                    </Col>
                                    <Col md={6} onClick={() => setVis(false)} className={`text-center cursor-pointer ${!vis && 'active'}`}>
                                        Last Purchase
                                    </Col>
                                </Row>
                                <Row className="h-100">
                                    <Col md={12} className={`${!vis && 'd-none'} h-100`}>
                                        <div className="fs-1 h-100 d-flex justify-content-center align-items-center">₹0</div>
                                    </Col>
                                    <Col md={12} className={vis && 'd-none'}>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row className="match-height">
                    <Col md={5}>
                        <Card>
                            <CardBody>
                                <h4 className="text-center">User Timeline</h4>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={7}>
                        <Row>
                            <Col md={4}>
                                <Card>
                                    <CardBody className="d-flex flex-column justify-content-center align-items-center">
                                        <div style={{ width: '50px', height: '50px' }} className="bg-light-success d-flex justify-content-center align-items-center rounded-circle mb-2"><Send size={25} /></div>
                                        <h5 className="mb-0">Send Offers</h5>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col md={4}>
                                <Card>
                                    <CardBody className="d-flex flex-column justify-content-center align-items-center">
                                        <div style={{ width: '50px', height: '50px' }} className="bg-light-success d-flex justify-content-center align-items-center rounded-circle mb-2"><PlusCircle size={25} /></div>
                                        <h5 className="mb-0">Add to Group</h5>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col md={4}>
                                <Card>
                                    <CardBody className="d-flex flex-column justify-content-center align-items-center">
                                        <div style={{ width: '50px', height: '50px' }} className="bg-light-success d-flex justify-content-center align-items-center rounded-circle mb-2"><PlusCircle size={25} /></div>
                                        <h5 className="mb-0">Book Appointment</h5>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col md={4}>
                                <Card>
                                    <CardBody className="d-flex flex-column justify-content-center align-items-center">
                                        <div style={{ width: '50px', height: '50px' }} className="bg-light-success d-flex justify-content-center align-items-center rounded-circle mb-2"><Send size={25} /></div>
                                        <h5 className="mb-0">Redeem & Issue Offers</h5>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col md={4}>
                                <Card>
                                    <CardBody className="d-flex flex-column justify-content-center align-items-center">
                                        <div style={{ width: '50px', height: '50px' }} className="bg-light-success d-flex justify-content-center align-items-center rounded-circle mb-2"><Eye size={25} /></div>
                                        <h5 className="mb-0">Add Insurances</h5>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col md={4}>
                                <Card>
                                    <CardBody className="d-flex flex-column justify-content-center align-items-center">
                                        <div style={{ width: '50px', height: '50px' }} className="bg-light-success d-flex justify-content-center align-items-center rounded-circle mb-2"><Key size={25} /></div>
                                        <h5 className="mb-0">Add Vehicle</h5>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col md={4}>
                                <Card>
                                    <CardBody className="d-flex flex-column justify-content-center align-items-center">
                                        <div style={{ width: '50px', height: '50px' }} className="bg-light-success d-flex justify-content-center align-items-center rounded-circle mb-2"><Tool size={25} /></div>
                                        <h5 className="mb-0">Add Servicing</h5>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col md={4}>
                                <Card>
                                    <CardBody className="d-flex flex-column justify-content-center align-items-center">
                                        <div style={{ width: '50px', height: '50px' }} className="bg-light-success d-flex justify-content-center align-items-center rounded-circle mb-2 fs-1">₹</div>
                                        <h5 className="mb-0">Add Finance</h5>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col md={4}>
                                <Card>
                                    <CardBody className="d-flex flex-column justify-content-center align-items-center">
                                        <div style={{ width: '50px', height: '50px' }} className="bg-light-success d-flex justify-content-center align-items-center rounded-circle mb-2"><Clock size={25} /></div>
                                        <h5 className="mb-0">Send Reminder</h5>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col md={4}>
                                <Card>
                                    <CardBody className="d-flex flex-column justify-content-center align-items-center">
                                        <div style={{ width: '50px', height: '50px' }} className="bg-light-success d-flex justify-content-center align-items-center rounded-circle mb-2"><Bell size={25} /></div>
                                        <h5 className="mb-0">Send Notifications</h5>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col md={4}>
                                <Card>
                                    <CardBody className="d-flex flex-column justify-content-center align-items-center">
                                        <div style={{ width: '50px', height: '50px' }} className="bg-light-success d-flex justify-content-center align-items-center rounded-circle mb-2"><Gift size={25} /></div>
                                        <h5 className="mb-0">Add Gift</h5>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col md={4}>
                                <Card>
                                    <CardBody className="d-flex flex-column justify-content-center align-items-center">
                                        <div style={{ width: '50px', height: '50px' }} className="bg-light-success d-flex justify-content-center align-items-center rounded-circle mb-2"><Send size={25} /></div>
                                        <h5 className="mb-0">Issue Rewards</h5>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col md={4}>
                                <Card>
                                    <CardBody className="d-flex flex-column justify-content-center align-items-center">
                                        <div style={{ width: '50px', height: '50px' }} className="bg-light-success d-flex justify-content-center align-items-center rounded-circle mb-2"><Phone size={25} /></div>
                                        <h5 className="mb-0">Add Call</h5>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col md={4}>
                                <Card>
                                    <CardBody className="d-flex flex-column justify-content-center align-items-center">
                                        <div style={{ width: '50px', height: '50px' }} className="bg-light-success d-flex justify-content-center align-items-center rounded-circle mb-2"><File size={25} /></div>
                                        <h5 className="mb-0">Add Invoice</h5>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default CustomerProfileDetails