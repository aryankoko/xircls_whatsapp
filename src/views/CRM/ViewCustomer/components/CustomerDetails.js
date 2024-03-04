import React, { useState } from 'react'
import { Container, Row, Col, Card, CardBody, Label, Input, Button, CardHeader } from 'reactstrap'
import { LuTrendingUp } from "react-icons/lu"
import { LiaUserSlashSolid, LiaUserSolid } from "react-icons/lia"
import { PiMoneyThin, PiStarThin } from "react-icons/pi"
import { GoPlus } from "react-icons/go"
import { FiUser } from "react-icons/fi"
import { IoMdCheckmark } from "react-icons/io"
import { SlFlag } from "react-icons/sl"
import { IoCallOutline } from "react-icons/io5"
import { Image } from 'react-bootstrap'
import userprofile from '../../assets/user_profile.jpg'
import { User, Flag, Phone, Star, Send, Layout } from 'react-feather'
import { crmURL } from '../../../../assets/auth/jwtService'
import { useNavigate, useParams } from 'react-router-dom'
// import axios from 'axios'
// import { crmURL } from '../../../../assets/auth/jwtService'
// import { useParams } from 'react-router-dom'

const CustomerDetails = ({ userData }) => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [activeTab, setActiveTab] = useState(0)

    const handleClick = (index) => {
        setActiveTab(index)
    }
    const tabs = [
        { label: 'CLV' },
        { label: 'Last Purchase' }
    ]

    console.log(userData)

    return (
        <>
            <style>
                {`
                    .tab {
                        position: relative;
                        text-decoration: none;
                        color: #000; /* Set your desired text color */
                    }
                    .underline {
                        position: absolute;
                        left: 0;
                        bottom: -2px;
                        width: 100%;
                        height: 2px;
                        background-color: #000; /* Set your desired underline color */
                        transform: scaleX(0); /* Initially, set the underline to be invisible */
                        transition: transform 0.3s ease;
                    }
            `}
            </style>
            <Row className='match-height'>
                <Col md='9'>
                    <Card>
                        <CardBody>
                            <div>
                                <Row className='d-flex justify-content-between'>
                                    <Col md='4' className=' d-flex gap-2 justify-content-start align-items-center' style={{ height: "fit-content" }}>
                                        {
                                            userData?.user_profile_img ? (
                                                <Image src={`${crmURL}/static${userData?.user_profile_img}`} className="img-thumbnail" style={{ height: '104px' }} />
                                            ) : <Image src={userprofile} className="img-thumbnail" style={{ height: '104px' }} />
                                        }

                                        <div className='d-flex flex-column justify-content-center'>
                                            <h4><span style={{textTransform: "capitalize"}}>{userData?.title}</span> {userData?.customer_name}</h4>
                                            <div><span className='font-small-4'>{userData?.email}</span></div>
                                            <button type="button" className="btn btn-primary mt-1" style={{ width: "fit-content" }} onClick={() => navigate(`/merchant/customers/edit_customer/${userData.id}?type=edit`)}>Edit</button>
                                        </div>
                                    </Col>
                                    <Col md='8' className='d-flex justify-content-end gap-5'>

                                        <div className='d-flex gap-3 align-items-center mt-1 justify-content-end'>
                                            <div className='d-flex flex-column gap-1'>
                                                <span className='d-flex gap-2 align-items-center font-small-3'><User size='16px' />Full name</span>
                                                <span className='d-flex gap-2 align-items-center font-small-3'><Star size='16px' />Status</span>
                                                <span className='d-flex gap-2 align-items-center font-small-3'><Star size='16px' />Type</span>
                                                {/* <span className='d-flex gap-2 align-items-center fs-6 fw-bold'><Flag size='16px' />Country</span> */}
                                            </div>
                                            <div className='d-flex flex-column gap-1'>
                                                <div> <span className='font-small-3'>{userData?.customer_name ? userData.customer_name : "-"}</span></div>
                                                <div><span className='font-small-3'>Inactive</span></div>
                                                <div><span className='font-small-3'>Regular</span></div>
                                                {/* <div><span className='font-small-4'>{userData?.country}</span></div> */}
                                            </div>
                                        </div>


                                        <div className='d-flex gap-3 align-items-start mt-1 justify-content-end'>
                                            <div className='d-flex flex-column gap-1'>
                                                <span className='d-flex gap-2 align-items-center fs-6 fw-bold'><Flag size='16px' />Country</span>
                                                <span className='d-flex gap-2 align-items-center fs-6 fw-bold'><Phone size='16px' />Contact</span>
                                                {/* <span className='d-flex gap-2 align-items-center fs-6 fw-bold'><Star size='16px' />Email</span> */}
                                            </div>
                                            <div className='d-flex flex-column gap-1'>
                                                <div><span className='font-small-4'>{userData?.country ? userData.country : "-"}</span></div>
                                                <div><span className='font-small-4'>{userData?.phone_no ? userData.phone_no : "-"}</span></div>
                                                {/* <div><span className='font-small-4'>{userData?.email}</span></div> */}
                                            </div>
                                        </div>


                                    </Col>
                                </Row>

                                <Row className='mt-3'>
                                    <Col md='12'>
                                        <Row>
                                            <Col md='2' className='d-flex gap-1 justify-content-center align-items-center'>
                                                <div>
                                                    <div className='d-flex justify-content-center align-items-center' style={{ width: "35px", height: "36px", borderRadius: "100%" }}>
                                                        <LuTrendingUp size={18} className="text-dark" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <h6>1907</h6>
                                                    <span className='font-small-3'>Total Sales</span>
                                                </div>
                                            </Col>

                                            <Col md='2' className='d-flex gap-1 justify-content-center align-items-center'>
                                                <div>
                                                    <div className='d-flex justify-content-center align-items-center' style={{ width: "35px", height: "36px", borderRadius: "100%" }}>
                                                        <LiaUserSolid size={18} className="text-dark" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <h6>0</h6>
                                                    <span className='font-small-3'>Total Revenue</span>
                                                </div>
                                            </Col>

                                            <Col md='2' className='d-flex gap-1 justify-content-center align-items-center'>
                                                <div>
                                                    <div className='d-flex justify-content-center align-items-center' style={{ width: "35px", height: "36px", borderRadius: "100%" }}>
                                                        <LiaUserSlashSolid size={18} className="text-dark" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <h6>1907</h6>
                                                    <span className='font-small-3'>Wallet</span>
                                                </div>
                                            </Col>

                                            <Col md='2' className='d-flex gap-1 justify-content-center align-items-center'>
                                                <div>
                                                    <div className='d-flex justify-content-center align-items-center' style={{ width: "35px", height: "36px", borderRadius: "100%" }}>
                                                        <PiMoneyThin size={18} className="text-dark" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <h6>₹0</h6>
                                                    <span className='font-small-3'>Balance To Pay</span>
                                                </div>
                                            </Col>

                                            <Col md='2' className='d-flex gap-1 justify-content-center align-items-center'>
                                                <div>
                                                    <div className='d-flex justify-content-center align-items-center' style={{ width: "35px", height: "36px", borderRadius: "100%" }}>
                                                        <PiMoneyThin size={18} className="text-dark" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <h6>₹0</h6>
                                                    <span className='font-small-3'>Reward Point</span>
                                                </div>
                                            </Col>

                                            <Col md='2' className='d-flex gap-1 justify-content-center align-items-center'>
                                                <div>
                                                    <div className='d-flex justify-content-center align-items-center' style={{ width: "35px", height: "36px", borderRadius: "100%" }}>
                                                        <PiMoneyThin size={18} className="text-dark" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <h6>₹0</h6>
                                                    <span className='font-small-3'>Loyalty Points Redeemed</span>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>

                                {/* <div className='d-flex gap-2 mt-4'>
                                    {customerStatisticsData.map((ele) => (
                                        <div className='d-flex align-items-start gap-1'>
                                            <div
                                                className={` d-flex justify-content-center align-items-center d-black bg-opacity-25 ${ele.iconStyle && ele.iconStyle
                                                    }`}
                                                style={{
                                                    width: "35px",
                                                    height: "32px",
                                                    borderRadius: "100%"
                                                }}>
                                                {ele.icon}
                                            </div>
                                            <div className="">
                                                <h6 className=" fw-semibold">
                                                    {ele.type === "money" ? `₹${ele.data}` : ele.data}
                                                    {ele.amount && <GoPlus className='text-success' role='button' onClick={{}} />}
                                                </h6>
                                                <span className='font-small-3'>{ele.name}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div> */}
                            </div>
                        </CardBody>
                    </Card>
                </Col>

                <Col md='3'>
                    <Card>
                        <CardBody>
                            <div className="d-flex gap-3 justify-content-center">
                                {tabs.map((tab, index) => (
                                    <div
                                        key={index}
                                        className={`tab ${activeTab === index ? 'active' : ''}`}
                                        onClick={() => handleClick(index)}
                                    >
                                        <span>{tab.label}</span>
                                        <div className="underline"></div>
                                    </div>
                                ))}
                            </div>
                            <div className='d-flex justify-content-center mt-5'>
                                {activeTab === 0 ? (
                                    <h2>₹ 0</h2>
                                ) : ""}
                            </div>

                        </CardBody>
                    </Card>
                </Col>
            </Row >

            <Row className='match-height'>
                <Col md='5'>
                    <Card>
                        <CardBody>
                            <Row>
                                <Col md='12'>
                                    <h4>User Timeline</h4>
                                </Col>
                            </Row>
                            {/* <Row className='mt-2 ms-2'>
                                <Col md='8'>
                                    <h6>A Vehicle has been added.</h6>
                                    <span>Delivery Date: 30-01-2015</span>
                                </Col>
                                <Col>
                                    <span>03 Jan, 15:19 p.m.</span>
                                </Col>
                            </Row> */}
                        </CardBody>
                    </Card>
                </Col>

                <Col md='7'>
                    <Row>
                        <Col md='4'>
                            <Card>
                                <CardBody>
                                    <div className='d-flex justify-content-center align-items-center flex-column'>
                                        <div className='d-flex justify-content-center align-items-center' style={{ height: "45px", width: "45px", borderRadius: "30px" }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" color='#454545' viewBox="0 0 24 24" fill="#fff" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle font-medium-5" onclick="ischeckboxselected()"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                                        </div>
                                        <div className='mt-1'>
                                            <h5>Add to group</h5>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>

                        <Col md='4'>
                            <Card className=' cursor-pointer' onClick={() => navigate(`/merchant/customers/add-vehicle/${id}?type=customer`)}>
                                <CardBody>
                                    <div className='d-flex justify-content-center align-items-center flex-column'>
                                        <div className='d-flex justify-content-center align-items-center' style={{ height: "45px", width: "45px", borderRadius: "30px" }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" color='#454545' stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-key font-medium-5"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>
                                        </div>
                                        <div className='mt-1'>
                                            <h5>Add Vehicle</h5>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>

                        <Col md='4'>
                            <Card className=' cursor-pointer' onClick={() => navigate(`/merchant/customers/add-insurance/${id}?type=customer`)}>
                                <CardBody>
                                    <div className='d-flex justify-content-center align-items-center flex-column'>
                                        <div className='d-flex justify-content-center align-items-center' style={{ height: "45px", width: "45px", borderRadius: "30px" }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" color='#454545' width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye font-medium-5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                        </div>
                                        <div className='mt-1'>
                                            <h5>Add Insurance</h5>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md='4'>
                            <Card className=' cursor-pointer' onClick={() => navigate(`/merchant/customers/add-servicing/${id}?type=customer`)}>
                                <CardBody>
                                    <div className='d-flex justify-content-center align-items-center flex-column'>
                                        <div className='d-flex justify-content-center align-items-center' style={{ height: "45px", width: "45px", borderRadius: "30px" }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" color='#454545' stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-tool font-medium-5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
                                        </div>
                                        <div className='mt-1'>
                                            <h5>Add Servicing</h5>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>

                        <Col md='4'>
                            <Card className=' cursor-pointer' onClick={() => navigate(`/merchant/customers/jmd-finance-customers/${id}?type=customer`)}>
                                <CardBody>
                                    <div className='d-flex justify-content-center align-items-center flex-column'>
                                        <div className='d-flex justify-content-center align-items-center' style={{ height: "45px", width: "45px", borderRadius: "30px" }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" color='#454545' class="feather feather-tool font-medium-5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
                                        </div>
                                        <div className='mt-1'>
                                            <h5>Add Finance</h5>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>

                        <Col md='4'>
                            <Card>
                                <CardBody>
                                    <div className='d-flex justify-content-center align-items-center flex-column'>
                                        <div className='d-flex justify-content-center align-items-center' style={{ height: "45px", width: "45px", borderRadius: "30px" }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" color='#454545' stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clock font-medium-5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                        </div>
                                        <div className='mt-1'>
                                            <h5>Send Reminder</h5>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md='4'>
                            <Card>
                                <CardBody>
                                    <div className='d-flex justify-content-center align-items-center flex-column'>
                                        <div className='d-flex justify-content-center align-items-center' style={{ height: "45px", width: "45px", borderRadius: "30px" }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" color='#454545' stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bell font-medium-5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                                        </div>
                                        <div className='mt-1'>
                                            <h5>Send Notification</h5>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>

                        <Col md='4'>
                            <Card className=' cursor-pointer' onClick={() => navigate('/merchant/customers/add_call/')}>
                                <CardBody>
                                    <div className='d-flex justify-content-center align-items-center flex-column'>
                                        <div className='d-flex justify-content-center align-items-center' style={{ height: "45px", width: "45px", borderRadius: "30px" }}>
                                            <Phone color='#454545' size='23px' />
                                        </div>
                                        <div className='mt-1'>
                                            <h5>Add Call</h5>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default CustomerDetails