import React, { useContext, useEffect, useState } from 'react'
import { PermissionProvider } from '../../Helper/Context'
import { Button, Card, CardBody, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import { Link } from 'react-router-dom'
import { AiFillPhone, AiOutlineMail, AiOutlineQuestion } from 'react-icons/ai'
import Flatpickr from "react-flatpickr"
import Spinner from '../Components/DataTable/Spinner'
import CardCom from '../Components/SuperLeadz/CardCom'
import { Check, Percent, User, UserCheck, UserPlus, Users } from 'react-feather'
import { SiConvertio } from 'react-icons/si'
import { BiDollar } from 'react-icons/bi'
import { getCurrentOutlet } from '../Validator'
import { getReq } from '../../assets/auth/jwtService'
import WhatsappCampaign from './WhatsappCampaign'

const Dashboard = () => {
    const { userPermission } = useContext(PermissionProvider)
    const outletData = getCurrentOutlet()
    const [filterType, setSetFilterType] = useState("week")
    const [cancel, setCancel] = useState(false)
    const toLoadCampaign = true
    const [campaignLoader, setCampaignLoader] = useState(false)
    const [isCampagin, setIsCampagin] = useState(false)
    const isLoading = false
    const chargesLoader = false
    const options = [
        { value: "all", label: "Lifetime" },
        { value: "today", label: "Today" },
        { value: "week", label: "This Week" },
        { value: "month", label: "This Month" },
        { value: "year", label: "This Year" },
        { value: "custom", label: "Custom" }
    ]
    useEffect(() => {
        getReq('campaignData', `?app=${userPermission?.appName}`)
        .then((resp) => {
            // console.log(resp)
            setCampaignLoader(true)
            const timeLine = resp?.data?.data?.timeline

            const showingTimeLine = timeLine?.filter((curElem) => curElem?.isShow === 1)
            const completedTimeLine = timeLine?.filter((curElem) => curElem?.isShow === 1 && curElem?.isComplete === 1)

            if (showingTimeLine.length === completedTimeLine.length) {
                setIsCampagin(1)
            } else {
                setIsCampagin(0)
            }
            // setIsCampagin(resp?.data?.data?.status)
        })
        .catch((error) => {
            console.log(error)
            setCampaignLoader(true)
        })
    }, [])
    return (
        <div>
            <style>
                {`
                    .apexcharts-toolbar {
                        display: none;
                    }
                `}
            </style>

            <div className="row match-height">
                <div className="d-none col-md-5">
                    <Card>
                        <CardBody>
                            <div className="row">
                                <div className="d-flex justify-content-start align-items-start gap-1">
                                    <div className="img">
                                        <img src={""} height={64} width={64} style={{ borderRadius: "100%", border: "solid 1px #afafaf" }} />
                                    </div>
                                    <div className="text-center text-sm-start">
                                        <h3 className='text-black'>Hey, {userPermission?.currencySymbol_name}! Need a sidekick?</h3>
                                        <h6 className='SmallTxt'>Our team will help you set up your campaign for out-of-this-world results!</h6>
                                        <div className='mt-2 d-flex justify-content-start gap-1'>
                                            <Link to='/merchant/SuperLeadz/' className='shedule_btn btn btn-sm btn-primary btnCustom text-nowrap' style={{ width: "140px" }}>
                                                <AiFillPhone size={14} style={{ marginBottom: "2px" }} />
                                                <span className='boxPadbtn' style={{ fontSize: "11px" }}>Schedule a Call</span>
                                            </Link>

                                            <Link to='/merchant/SuperLeadz/' className=' btn btn-sm btn-primary btnCustom text-nowrap' style={{ width: "140px" }}>
                                                <AiOutlineMail size={14} style={{ marginBottom: "2px" }} />
                                                <span className='boxPadbtn' style={{ fontSize: "11px" }}>Email Us</span>
                                            </Link>

                                            {/* <Link to='/merchant/create_support/' className=' btn btn-sm btn-primary btnCustom text-nowrap' style={{width:"140px"}}>
                                                <AiOutlineMail size={14} style={{marginBottom:"2px"}}/>
                                                <span className='boxPadbtn' style={{fontSize:"11px"}}>Support</span>
                                            </Link> */}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
                {/* <div className="col-md-1"></div> */}

                {
                    campaignLoader ? (isCampagin === 0 || isCampagin === "0") ? (
                    <>
                        <div className=''>
                            <div className="col-md-4 d-none">
                                <Card>
                                    <CardBody>
                                        <div className="row">
                                            <div className="d-flex justify-content-start align-items-start gap-1">
                                                <div className="text-center text-sm-start">
                                                    <h3 className='text-black'>{userPermission?.currencySymbol_name}, we’d love to help!</h3>
                                                    <h6 className='SmallTxt'>Let our team assist you with your first campaign</h6>
                                                    <div className='mt-2 d-flex justify-content-start gap-1'>
                                                        <Link to='/merchant/SuperLeadz/' className='shedule_btn btn btn-sm btn-primary btnCustom text-nowrap' style={{ width: "140px" }}>
                                                            <AiFillPhone size={14} style={{ marginBottom: "2px" }} />
                                                            <span className='boxPadbtn' style={{ fontSize: "11px" }}>Schedule a Call</span>
                                                        </Link>

                                                        <Link to='/merchant/SuperLeadz/' className=' btn btn-sm btn-primary btnCustom text-nowrap' style={{ width: "140px" }}>
                                                            <AiOutlineMail size={14} style={{ marginBottom: "2px" }} />
                                                            <span className='boxPadbtn' style={{ fontSize: "11px" }}>Email Us</span>
                                                        </Link>

                                                        {/* <Link to='/merchant/create_support/' className=' btn btn-sm btn-primary btnCustom text-nowrap' style={{width:"140px"}}>
                                                                <AiOutlineMail size={14} style={{marginBottom:"2px"}}/>
                                                                <span className='boxPadbtn' style={{fontSize:"11px"}}>Support</span>
                                                            </Link> */}
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </div>
                            <div className="col-md-12">
                                <Card>
                                    <CardBody>

                                        <div className="left_side d-flex justify-content-between align-items-center mb-1">
                                            <div className='bg-primary text-center rounded-right WidthAdjust' style={{ width: "425px", padding: "6px", marginLeft: '-25px' }}>
                                                <h4 className='bb text-white m-0' style={{ fontSize: "16px" }}>Complete these steps to convert leads faster!</h4>
                                            </div>
                                            <div className="right d-none justify-content-end align-items-center gap-1">
                                                <select className='form-control' style={{ width: '140px' }} onChange={(e) => setSetFilterType(e.target.value)}>
                                                    {
                                                        options.map((curElem) => {
                                                            return <option value={curElem.value} selected={curElem.value === filterType}>{curElem.label}</option>
                                                        })
                                                    }

                                                </select>

                                                {
                                                    filterType === "custom" ? (
                                                        <div className="custom">
                                                            <Flatpickr options={{ // Sets the minimum date as 14 days ago
                                                                maxDate: "today", // Sets the maximum date as today
                                                                mode: "range",
                                                                dateFormat: "Y-m-d"
                                                            }} className='form-control' value={selectedData} onChange={(date) => setSelectedData(date)} id='default-picker' placeholder='Search' />

                                                        </div>
                                                    ) : ''
                                                }
                                            </div>
                                        </div>
                                        {/* <div className='cc text-center my-1 rounded-right ' style={{ width: "40px", padding: "6px", position: "absolute", left: "30px", top: "-1px", rotate: "290deg", zIndex: "-999", backgroundColor: "#4233ea" }}>
                                                <h4 className='text-info'>Complete</h4>
                                            </div> */}
                                        <div className="row justify-content-start align-items-center flex-nowrap overflow-auto">
                                            <WhatsappCampaign toLoadCampaign={toLoadCampaign} outletData={outletData} />
                                        </div>
                                    </CardBody>
                                </Card>
                            </div>
                        </div>
                        <div className="col-md-12 d-none">
                            <Card>
                                <CardBody>
                                    <div className='row'>
                                        <div className='col-md-4 d-flex justify-content-start align-items-center'>
                                            <h4 className='m-0'>Dashboard</h4>
                                        </div>
                                        <div className='col-md-4'>
                                            <div className='d-flex justify-content-center align-items-center h-100 gap-1'>
                                                {/* <Link className="btn btn-primary" to="/merchant/SuperLeadz/"> Quick Set-Up</Link> */}
                                                <Link className="btn btn-primary" to="/merchant/SuperLeadz/themes/"> Create Campaign</Link>
                                            </div>

                                        </div>
                                        <div className='col-md-4'>
                                            <div className="parent d-flex justify-content-end align-items-center gap-1">
                                                <div className="left_side d-flex justify-content-end align-items-center gap-1">
                                                    <select className='form-control' style={{ width: '140px' }} onChange={(e) => setSetFilterType(e.target.value)}>
                                                        {
                                                            options.map((curElem) => {
                                                                return <option value={curElem.value} selected={curElem.value === filterType}>{curElem.label}</option>
                                                            })
                                                        }

                                                    </select>

                                                    {
                                                        filterType === "custom" ? (
                                                            <div className="custom">
                                                                <Flatpickr options={{ // Sets the minimum date as 14 days ago
                                                                    maxDate: "today", // Sets the maximum date as today
                                                                    mode: "range",
                                                                    dateFormat: "Y-m-d"
                                                                }} className='form-control' value={selectedData} onChange={(date) => setSelectedData(date)} id='default-picker' placeholder='Search' />

                                                            </div>
                                                        ) : ''
                                                    }
                                                </div>
                                                <div className="right_side">
                                                    <div className="d-flex justify-content-end align-items-start gap-1">
                                                        <Link to='/merchant/create_support/' className='shedule_btn btn btn-sm btn-primary btnCustom text-nowrap' title="Support">
                                                            <AiFillPhone size={14} style={{ marginBottom: "2px" }} />
                                                        </Link>
                                                        <Link to='/merchant/SuperLeadz/faq/' className='shedule_btn btn btn-sm btn-primary btnCustom text-nowrap' title="FAQ">
                                                            <AiOutlineQuestion size={14} style={{ marginBottom: "2px" }} />
                                                            {/* <span className='boxPadbtn' style={{fontSize:"11px"}}>Support</span> */}
                                                        </Link>
                                                        <Link to='/merchant/SuperLeadz/billing/' className='shedule_btn btn btn-sm btn-primary btnCustom text-nowrap' title="Billing">
                                                            <BiDollar size={14} style={{ marginBottom: "2px" }} />
                                                            {/* <span className='boxPadbtn' style={{fontSize:"11px"}}>Support</span> */}
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    </>

                    ) : (
                    <div className="col-md-12">
                        <Card>
                            <CardBody>
                                <div className='row'>
                                    <div className='col-md-4 d-flex justify-content-start align-items-center'>
                                        <h4 className='m-0'>Dashboard</h4>
                                    </div>
                                    <div className='col-md-4'>
                                        <div className='d-flex justify-content-center align-items-center h-100 gap-1'>
                                            {/* <Link className="btn btn-primary" to="/merchant/SuperLeadz/"> Quick Set-Up</Link> */}
                                            <Link className="btn btn-primary" to="/merchant/SuperLeadz/themes/"> Create Campaign</Link>
                                        </div>

                                    </div>
                                    <div className='col-md-4'>
                                        <div className="parent d-flex justify-content-end align-items-center gap-1">
                                            <div className="left_side d-flex justify-content-end align-items-center gap-1">
                                                <select className='form-control' style={{ width: '140px' }} onChange={(e) => setSetFilterType(e.target.value)}>
                                                    {
                                                        options.map((curElem) => {
                                                            return <option value={curElem.value} selected={curElem.value === filterType}>{curElem.label}</option>
                                                        })
                                                    }
                                                </select>

                                                {
                                                    filterType === "custom" ? (
                                                        <div className="custom">
                                                            <Flatpickr options={{ // Sets the minimum date as 14 days ago
                                                                maxDate: "today", // Sets the maximum date as today
                                                                mode: "range",
                                                                dateFormat: "Y-m-d"
                                                            }} className='form-control' value={selectedData} onChange={(date) => setSelectedData(date)} id='default-picker' placeholder='Search' />

                                                        </div>
                                                    ) : ''
                                                }
                                            </div>
                                            <div className="right_side">
                                                <div className="d-flex justify-content-end align-items-start gap-1">
                                                    <Link to='/merchant/create_support/' className='shedule_btn btn btn-sm btn-primary btnCustom text-nowrap' title="Support">
                                                        <AiFillPhone size={14} style={{ marginBottom: "2px" }} />
                                                    </Link>
                                                    <Link to='/merchant/SuperLeadz/faq/' className='shedule_btn btn btn-sm btn-primary btnCustom text-nowrap' title="FAQ">
                                                        <AiOutlineQuestion size={14} style={{ marginBottom: "2px" }} />
                                                        {/* <span className='boxPadbtn' style={{fontSize:"11px"}}>Support</span> */}
                                                    </Link>
                                                    <Link to='/merchant/SuperLeadz/billing/' className='shedule_btn btn btn-sm btn-primary btnCustom text-nowrap' title="Billing">
                                                        <BiDollar size={14} style={{ marginBottom: "2px" }} />
                                                        {/* <span className='boxPadbtn' style={{fontSize:"11px"}}>Support</span> */}
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                    ) : <Card>
                        <CardBody>
                            <div className='w-100 d-flex justify-content-center align-items-center'>
                                <Spinner size={'25px'} />
                            </div>
                        </CardBody>
                    </Card>
                }
            </div>

            <Row className='match-height'>

                <Col className='col-md-6 cursor-default'>
                    <CardCom icon={<img src='https://cdn-icons-png.flaticon.com/512/1773/1773345.png' width='27px' />} title="Campaign Revenue" info={'Sum Total Revenue through SuperLeadz Campaign'} data={!isLoading ? `₹${0}` : <Spinner size={'25px'} />} />
                </Col>

                <div className='col-md-6 cursor-default'>
                    <CardCom icon={<Check width={'27px'} />} title={<>Remaining <br /> Visits</>} data={!chargesLoader ? 0 : <Spinner size={'25px'} />} info={`Total number of pop-ups (according to the plan) - number of pop-ups loaded on the website`} />
                </div>

                <div className='col-md-6 cursor-default'>
                    <CardCom icon={<Check width={'27px'} />} title={<>Active Campaigns</>} data={!isLoading ? 0 : <Spinner size={'25px'} />} info={`Number of SuperLeadz campaigns i.e. pop-ups that are active on the website`} />
                </div>


                <Col md="6" className='d-none'>
                    <Card>
                        <CardBody>
                            {
                                chargesLoader ? <div className='d-flex justify-content-center align-items-center'><Spinner width='45px' /></div> : <>
                                    <div className="normal-card">
                                        <div className='d-flex justify-content-between align-items-center flex-grow-1 w-100 mb-2'>
                                            {/* <img width={"25px"} src="https://static.vecteezy.com/system/resources/previews/000/512/317/non_2x/vector-wallet`-glyph-black-icon.jpg" alt="" /> */}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-clipboard"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
                                            <button onClick={() => {
                                                navigate("/merchant/SuperLeadz/joinus/", { state: 0 })
                                            }} className='btn btn-sm btn-success text-white'>Upgrade</button>
                                        </div>
                                        {
                                            chargesLoader ? <div className='d-flex justify-content-center align-items-center'><Spinner width='45px' /></div> : <div className="d-flex justify-content-between align-items-center w-100">
                                                <h4 style={{ borderBottom: '0px dotted lightgray', fontSize: '18px', position: "relative", cursor: 'pointer' }}>{<p style={{ color: "" }}>Your Current PLan is <span style={{ color: "#48a441", textTransform: 'capitalize' }}>0</span></p>}<span className='position-absolute cursor-pointer' title={`Plan that you have subscribed to`} style={{ top: '-8px', right: '-16px' }}></span></h4>
                                                <div className='d-flex gap-3 align-items-center'>
                                                    <p className='position-relative' style={{ fontSize: `0.85rem`, borderBottom: '0.5px dotted lightgray;', cursor: 'pointer' }} onClick={() => navigate('/leads')}>{"Pop-ups - "}</p>
                                                    <h5 style={{ fontSize: `3rem`, cursor: "default" }}></h5>
                                                </div>
                                            </div>
                                        }

                                    </div>
                                </>
                                // : billing?.mainData.length === 0 ? <>
                                //     <div className=" d-flex flex-column normal-card text-center">
                                //         <h5>No Plan Purchased</h5>
                                //         <div className='mt-1'>
                                //             <Link to="/merchant/SuperLeadz/joinus/" className='btn btn-primary'>BUY NOW</Link>
                                //         </div>
                                //     </div>
                                // </> 

                            }

                        </CardBody>
                    </Card>
                </Col>

                <div className='col-md-6 cursor-default d-none'>
                    <CardCom icon={<Check width={'27px'} />} title={<>Impressions</>} data={!isLoading ? 0 : <Spinner size={'25px'} />} info={`Number of times the pop-up is shown`} />
                </div>

                <div className='col-md-6 cursor-default d-none'>
                    <CardCom icon={<Check width={'27px'} />} title={<>Engaged</>} data={!isLoading ? 0 : <Spinner size={'25px'} />} info={`Number of clicks on any button; inside the pop-up`} />
                </div>

                <div className='col-md-6 cursor-pointer'>
                    <CardCom icon={<UserPlus width={'27px'} />} title="Leads Generated" data={!isLoading ? 0 : <Spinner size={'25px'} />} info={`Total entries registered; including duplicates, verified or unverified`} />

                </div>

                <div className='col-md-6 cursor-pointer d-none'>
                    <CardCom icon={<UserPlus width={'27px'} />} title="Unique leads Generated" data={!isLoading ? 0 : <Spinner size={'25px'} />} info={`Total entries registered excluding duplicate entries`} />

                </div>

                <div className='col-md-6 cursor-pointer d-none'>
                    <CardCom icon={<UserCheck width={'27px'} />} title="Verified Leads" data={!isLoading ? 0 : <Spinner size={'25px'} />} info={`Total entries registered who have verified via OTP`} />

                </div>

                <div className='col-md-6 cursor-pointer d-none'>
                    <CardCom icon={<UserCheck width={'27px'} />} title="Unique Verified Leads" data={!isLoading ? 0 : <Spinner size={'25px'} />} info={`Total entries registered who have verified via OTP excluding duplicates`} />

                </div>

                <div className='col-md-6 cursor-pointer'>
                    <CardCom icon={<User width={'27px'} />} title="Visits" data={!isLoading ? 0 : <Spinner size={'25px'} />} info={`Total visits on all pages`} />

                </div>

                <div className='col-md-6 cursor-default'>
                    <CardCom icon={<Users width={'27px'} />} title={<>Visitor-to-Lead <br /> Conversion Rate</>} data={!isLoading ? `${0}%` : <Spinner size={'25px'} />} info={`Number of Sessions to Leads`} />
                </div>

                <div className='col-md-6 cursor-pointer'>
                    <CardCom icon={<SiConvertio size={'25px'} />} title="Leads Converted" data={!isLoading ? 0 : <Spinner size={'25px'} />} info={`Unique Leads / Customers`} />
                </div>

                <div className='col-md-6 cursor-default'>
                    <CardCom icon={<Percent width={'27px'} />} title={<>Lead-to-Customer <br /> Conversion Rate</>} data={!isLoading ? `${0}%` : <Spinner size={'25px'} />} info={`(Unique Leads / Customers) * 100`} />
                </div>

            </Row>

            <Row className='match-height'>

                <Modal
                    isOpen={cancel}
                    toggle={() => setCancel(!cancel)}
                    className='modal-dialog-centered'
                >
                    <ModalHeader toggle={() => setCancel(!cancel)}>Are you sure you want cancel the Plan</ModalHeader>
                    <ModalBody>
                    </ModalBody>
                    <ModalFooter>
                        <Button outline onClick={() => setCancel(!cancel)}>
                            No
                        </Button>
                        <Button color='primary' onClick={() => cancelTrial()}>
                            Yes
                        </Button>
                    </ModalFooter>
                </Modal>
            </Row>
            {/* 
            <Row className='mt-2'>
                <Card>
                    <CardBody>
                        <AllCampaigns name={"Campaigns"} custom={true} create={false} draft={false} viewAll="/merchant/SuperLeadz/all_campaigns/" />
                    </CardBody>
                </Card>
            </Row> */}

        </div>
    )
}

export default Dashboard