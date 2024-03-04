import React, { useContext, useEffect, useState } from 'react'
import { User, BarChart2, RefreshCw, DollarSign, Info, Menu, UserPlus, UserCheck, Users, Percent } from 'react-feather'
import { Button, Card, CardBody, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import CardCom from '../Components/SuperLeadz/CardCom'
import BarChart from '../Components/Charts/BarChart'
// import total_vistors from "../../assets/images/superLeadz/total_visitors.png"
// import leadsGenerated from "../../assets/images/superLeadz/leadsGenerated.png"
// import verifiedLeads from "../../assets/images/superLeadz/verifiedLeads.png"
// import vistorToConversion from "../../assets/images/superLeadz/vistorToConversion.png"
// import leadsConvertions from "../../assets/images/superLeadz/leadsConvertions.png"
import { SiConvertio } from "react-icons/si"
// import leadsToCustomers from "../../assets/images/superLeadz/leadsToCustomers.png"
import axios from 'axios'
import Flatpickr from 'react-flatpickr'
import moment from 'moment/moment'
import { SuperLeadzBaseURL, postReq } from '../../assets/auth/jwtService'
import Spinner from '../Components/DataTable/Spinner'
import toast from 'react-hot-toast'
import { getCurrentOutlet } from '../Validator'
import { Link, useNavigate } from 'react-router-dom'
import { ImCheckmark } from 'react-icons/im'
import { PiNumberTwo, PiNumberThree } from 'react-icons/pi'
import { AiFillPhone, AiOutlineMail, AiFillCaretRight } from 'react-icons/ai'
import mainLogo from "./assets/Spider-man.png"
import "./css/Dashboard.css"
import SuperLeadzCampaign from '../Apps/SuperLeadzCampaign'
import { BsThreeDots } from "react-icons/bs"
import { GrShare } from "react-icons/gr"
import YTlogo from "./assets/YouTube-Logo.jpg"
import IGlogo from "./assets/Instagram.jpeg"
import FBlogo from "./assets/Facebook.png"
import TWlogo from "./assets/Twitter.png"
import AllCampaigns from '../NewCustomizationFlow/AllCampaigns'
import { PermissionProvider } from '../../Helper/Context'

function SuperLeadzDashboard() {
    const { userPermission } = useContext(PermissionProvider)
    const [performanceData, setPerformanceData] = useState()
    // const [showData, setShowData] = useState([])
    const [total, setTotal] = useState(0)
    const [verified, setVerified] = useState(0)
    const [totalVistor, setTotalVistor] = useState(0)
    // const [subscription, setSubscription] = useState(false)
    const [graphIsLoading, setGraphIsLoading] = useState(true)
    const [chargesLoader, setChargesLoader] = useState(true)
    const [toLoadCampaign, setToLoadCampaign] = useState(false)
    const [cancel, setCancel] = useState(false)

    const navigate = useNavigate()

    const [filterOption, setFilterOption] = useState({
        graphTitle: "total_visitors",
        maxDayValue: "7",
        options: [
            {
                value: "total_visitors",
                label: "Total Visitors",
                yAxis: "Total Visitors"
            },
            {
                value: "leads_generated",
                label: "Leads Generated",
                yAxis: "Leads Generated"
            },
            {
                value: "verified_leads",
                label: "Verified Leads",
                yAxis: "Verified Leads"
            },
            {
                value: "leads_converted",
                label: "Leads Converted",
                yAxis: "Leads Converted"
            }
        ],
        selectedData: [moment(new Date()).subtract(7, 'd'), moment(new Date())],
        showDate: [moment(new Date()).subtract(7, 'd').format('YYYY-MM-DD'), moment(new Date()).format('YYYY-MM-DD')],
        graphData: []
    })
    const [billing, setBilling] = useState({
        usage_count: 0,
        usage_charge: 0,
        mainLoadeder: true,
        daysLeft: 0,
        trial_days: 0,
        mainData: [],
        price: ""
    })

    console.log(filterOption, "filterOption")

    const params = new URLSearchParams(location.search)
    const outletData = getCurrentOutlet()

    const campaignData = userPermission?.campaign ? userPermission?.campaign?.filter((cur) => {
        return userPermission?.appName === cur.app
      }) : []

    const getData = () => {
        const updateUrl = new URL(`${SuperLeadzBaseURL}/api/v1/add/customer_visit/?shop=${outletData[0]?.web_url}&app_name=superleadz`)

        fetch(updateUrl, {
            method: 'GET'
            // body: formData
        })
        .then((resp) => resp.json())
        .then((data) => {
            // console.log("data ===================>>", data)
            setPerformanceData(data)
            setTotal(data?.total_leads)
            setVerified(data?.verified_leads)
            const totalVistor = data?.status.filter((curElem) => {
                return curElem.is_close === 1 || curElem.is_close === '1'
            })
            setTotalVistor(totalVistor.length)
            // const subArray = new Array()
            // const refArray = new Array()
            // data?.status?.map((ele) => {
            //     if (!refArray.includes(window.atob(window.atob(ele.ip_address)))) {
            //         subArray.push({ ip_address: ele.ip_address, browser_details: JSON.parse(ele.browser_details.replaceAll(`'`, `"`).replaceAll('False', false).replaceAll('True', true)), activities: [{ created_at: ele.created_at, current_page: ele.current_page }] })
            //         refArray.push(window.atob(window.atob(ele.ip_address)))
            //     } else {
            //         subArray[refArray.indexOf(window.atob(window.atob(ele.ip_address)))].activities.push({ created_at: ele.created_at, current_page: ele.current_page })
            //     }
            // })
            // setShowData([])
            // setShowData(subArray)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const cancelApi = (type = "") => {
        const form_data = new FormData()
        // form_data.append('charge_id', params.get('charge_id'))
        form_data.append('app', 'superleadz')
        form_data.append('shop', outletData[0]?.web_url)
        form_data.append('type', type)

        postReq('planSubscription', form_data)
        .then((resp) => {
            console.log(resp)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const planData = () => {
        setChargesLoader(true)
        
        const form_data = new FormData()
        form_data.append('shop', outletData[0]?.web_url)
        form_data.append('app', "superleadz")
        form_data.append('type', "ACTIVE")

        fetch(`${SuperLeadzBaseURL}/api/v1/get_active_shop_billing/`, {
            method: "POST",
            body: form_data
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data, "billing ")
            const updatedDate = data?.data?.filter((cur) => cur.is_active === 1)
            setToLoadCampaign(true)
            console.log(updatedDate, "currentPlan")
            console.log(updatedDate[0]?.usage_count, "usage")
            const json = JSON.parse(updatedDate[0]?.plan_details_json)

            const setData = {
                usage_charge: updatedDate[0]?.billing_usage_apply_after,
                usage_count: updatedDate[0]?.usage_count,
                daysLeft: json?.created_at ? moment(new Date()).diff(moment(json?.created_at), 'days') : 0,
                trial_days: json?.trial_days,
                price: json?.price,
                mainData: data?.data
            }

            setBilling((preData) => ({
                ...preData,
                ...setData
            }))

            setChargesLoader(false)
        })
        .catch((error) => {
            console.log(error)
            const setData = {
                usage_charge: 0,
                usage_count: 0,
                daysLeft: 0,
                trial_days: 0,
                price: "",
                mainData: []
            }

            setBilling((preData) => ({
                ...preData,
                ...setData
            }))
            setChargesLoader(false)
            setToLoadCampaign(true)
        })
    }

    const chargeApi = () => {
        const form_data = new FormData()
        form_data.append('charge_id', params.get('charge_id'))
        form_data.append('app', 'superleadz')
        form_data.append('shop', outletData[0]?.web_url)
        axios({
            method: "POST",
            data: form_data,
            url: `${SuperLeadzBaseURL}/api/v1/add/billing/`
        })
        .then((data) => {
            console.log(data)
            if (data?.data?.response === "billing created successfully") {
                navigate('/merchant/SuperLeadz/')
                planData()
                cancelApi()

            } else {
                planData()
            }
        })
        .catch((error) => console.log(error))
    }

    // console.log(moment(new Date()).diff(moment(JSON.parse(currentPlan?.created_at), 'days'), "pppppp"))
    // console.log(currentPlan.created_at, "ppp")
    // console.log(currentPlan, "ppppppp")

    useEffect(() => {
        getData()
        if (params.get('charge_id')) {
            chargeApi()
        } else {
            planData()
        }
        
    }, [])

    const cancelTrial = () => {
        setChargesLoader(true)
        setToLoadCampaign(false)
        const form_data = new FormData()
        form_data.append('shop', outletData[0]?.web_url)
        form_data.append('app', 'superleadz')

        fetch(`${SuperLeadzBaseURL}/api/v1/cancel_billing/`, {
            method: "POST",
            body: form_data
        })
        .then((data) => data.json())
        .then((resp) => {
            console.log(resp)
            setToLoadCampaign(false)
            setChargesLoader(true)
            setCancel(!cancel)
            planData()
            cancelApi("deactive")
            toast.success('Plan Cancelled')
        })
        .catch((error) => {
            console.log(error)
            setChargesLoader(false)
            setToLoadCampaign(true)
            toast.error('Something went wrong')
        })
    }

    // const upgradePlan = () => {
    //     const form_data = new FormData()
    //     form_data.append('shop', outletData[0]?.web_url)
    //     form_data.append('app', 'superleadz')

    //     fetch(`${SuperLeadzBaseURL}/api/v1/upgrade_billing/`, {
    //         method: "POST",
    //         body: form_data
    //     })
    //     .then((data) => data.json())
    //     .then((resp) => {
    //         console.log(resp)
    //         window.location.href = resp?.upgrade_billing?.recurring_application_charge?.update_capped_amount_url
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //         toast.error('Something went wrong')
    //     })
    // }

    useEffect(() => {
        setGraphIsLoading(true)
        const form_data = new FormData()
        form_data.append('type_data', filterOption.graphTitle)
        form_data.append('start_date', moment(filterOption.selectedData[0]).format('YYYY-MM-DD'))
        form_data.append('end_date', moment(filterOption.selectedData[1]).format('YYYY-MM-DD'))
        form_data.append('shop', outletData[0]?.web_url)
        form_data.append('app', 'superleadz')

        fetch(`${SuperLeadzBaseURL}/utils/api/v1/state_wise_data/`, {
            method: "POST",
            body: form_data
        })
            .then((resp) => resp.json())
            .then((data) => {
                setFilterOption({ ...filterOption, graphData: data.response })
                setGraphIsLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setGraphIsLoading(false)
            })
    }, [filterOption.selectedData, filterOption.graphTitle])

    console.log(filterOption, "opop")

    return (
        <div className='popup-cust'>
            <style>
                {`.apexcharts-toolbar {
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
                                        <img src={mainLogo} height={64} width={64} style={{borderRadius:"100%", border:"solid 1px #afafaf"}}/>
                                    </div>
                                    <div className="text-center text-sm-start">
                                        <h3 className='text-black'>Hey, {userPermission?.currencySymbol_name}! Need a sidekick?</h3>
                                        <h6 className='SmallTxt'>Our team will help you set up your campaign for out-of-this-world results!</h6>
                                        <div className='mt-2 d-flex justify-content-start gap-1'>
                                            <Link to='/merchant/SuperLeadz/' className='shedule_btn btn btn-sm btn-primary btnCustom text-nowrap' style={{width:"140px"}}>
                                                <AiFillPhone size={14} style={{marginBottom:"2px"}}/>
                                                <span className='boxPadbtn' style={{fontSize:"11px"}}>Schedule a Call</span>
                                            </Link>
                                            
                                            <Link to='/merchant/SuperLeadz/' className=' btn btn-sm btn-primary btnCustom text-nowrap' style={{width:"140px"}}>
                                                <AiOutlineMail size={14} style={{marginBottom:"2px"}}/>
                                                <span className='boxPadbtn' style={{fontSize:"11px"}}>Email Us</span>
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
                    (campaignData[0]?.status === 0 || campaignData[0]?.status === "0") ? (
                        <div className="col-md-12">
                            <Card>
                                <CardBody>
                                    <div className='bg-primary text-center my-1 rounded-right WidthAdjust' style={{width:"420px", padding:"6px", position:"relative", left:"-30px"}}>
                                        <h4 className='bb text-white m-0' style={{fontSize:"16px"}}>Complete these steps to convert leads faster!</h4>
                                    </div>
                                    <div className='cc text-center my-1 rounded-right ' style={{width:"40px", padding:"6px", position:"absolute", left:"30px", top:"-1px", rotate:"290deg", zIndex:"-999", backgroundColor:"#4233ea"}}>
                                        <h4 className='text-info'>Complete</h4>
                                    </div>
                                    <div className="row justify-content-start align-items-center flex-nowrap overflow-auto">
                                        <SuperLeadzCampaign toLoadCampaign={toLoadCampaign} outletData={outletData} />
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    ) : ''
                }
                
                
            </div>

            <Row className="d-none justify-content-evenly ">
                <Col className="col-xl-3 col-6 d-flex justify-content-center px-sm-0 px-2 ">
                    <Card
                    style={{
                    borderRadius:"20px",
                    width:"290px"
                    }}
                    >
                    <CardBody
                    style={{position:"relative"}}
                    >
                        <div className="d-flex justify-content-end ">
                        <BsThreeDots />
                        </div>
                        <div className="d-flex justify-content-center mx-auto"
                        style={{ width: "80px", marginTop:"15px", paddingBottom:"6px" }}
                        >
                        <img src={YTlogo} style={{height:"100%", width:"100%"}}/>
                        </div>
                        <div className="d-flex justify-content-center ">
                        <h6
                            style={{
                            fontSize: "43px",
                            fontWeight: "lighter",
                            marginTop: "50px",
                            color: "#000000"
                            }}
                        >
                            4.2m
                        </h6>
                        </div>
                        <div className="d-flex justify-content-center">
                        <p
                        className="GreyText"
                        style={{
                            marginBottom: "70px",
                            paddingBottom:"15px"
                        }}
                        >SUBSCRIBERS COUNT &nbsp;<GrShare size={10} style={{marginBottom:"6px", opacity:"0.5"}}/></p>
                        </div>
                        <div
                        style={{borderTop:"solid 1px #9e9e9f76", width:"289px", position:"absolute", left:"0px"}}
                        ></div>
                        <div className="d-flex justify-content-center text-center mt-2">
                        <div className="col">
                            <p className="m-0 GreyText">INFLUENCE</p>
                            <p
                            style={{color:"#3b3b3b"}}
                            >87%</p>
                        </div>
                        <div className="col">
                            <p className="m-0 GreyText">ENGAGEMENT</p>
                            <p
                            style={{color:"#008c00df"}}
                            >94%</p>
                        </div>
                        <div className="col">
                            <p className="m-0 GreyText">REACH</p>
                            <p
                            style={{color:"#008c00df"}}
                            >95%</p>
                        </div>
                        </div>
                    </CardBody>
                    </Card>
                </Col>
                <Col className="col-xl-3 col-6 d-flex justify-content-center px-sm-0 px-1 ">
                <Card
                    style={{
                    borderRadius:"20px",
                    width:"290px"
                    }}
                    >
                    <CardBody
                    style={{position:"relative"}}
                    >
                        <div className="d-flex justify-content-end ">
                        <BsThreeDots />
                        </div>
                        <div className="d-flex justify-content-center mx-auto"
                        style={{ width: "90px", marginTop:"32px", paddingBottom:"16px" }}
                        >
                        <img src={IGlogo} style={{height:"100%", width:"100%"}}/>
                        </div>
                        <div className="d-flex justify-content-center ">
                        <h6
                            style={{
                            fontSize: "43px",
                            fontWeight: "lighter",
                            marginTop: "50px",
                            color: "#000000"
                            }}
                        >
                            2.2m
                        </h6>
                        </div>
                        <div className="d-flex justify-content-center">
                        <p
                        className="GreyText"
                        style={{
                            marginBottom: "70px",
                            paddingBottom:"11px"
                        }}
                        >FOLLOWERS COUNT &nbsp;<GrShare size={10} style={{marginBottom:"6px", opacity:"0.5"}}/></p>
                        </div>
                        <div
                        style={{borderTop:"solid 1px #9e9e9f76", width:"290px", position:"absolute", left:"0px"}}
                        ></div>
                        <div className="d-flex justify-content-center text-center mt-2">
                        <div className="col">
                            <p className="m-0 GreyText">INFLUENCE</p>
                            <p
                            style={{color:"#3b3b3b"}}
                            >49%</p>
                        </div>
                        <div className="col">
                            <p className="m-0 GreyText">ENGAGEMENT</p>
                            <p
                            style={{color:"#3b3b3b"}}
                            >73%</p>
                        </div>
                        <div className="col">
                            <p className="m-0 GreyText">REACH</p>
                            <p
                            style={{color:"#3b3b3b"}}
                            >59%</p>
                        </div>
                        </div>
                    </CardBody>
                </Card>
                </Col>
                <Col className="col-xl-3 col-6 d-flex justify-content-center px-sm-0 px-1 ">
                <Card
                    style={{
                    borderRadius:"20px",
                    width:"290px"
                    }}
                    >
                    <CardBody
                    style={{position:"relative"}}
                    >
                        <div className="d-flex justify-content-end ">
                        <BsThreeDots />
                        </div>
                        <div className="d-flex justify-content-center mx-auto"
                        style={{ width: "90px", marginTop:"28px", paddingBottom:"12px" }}
                        >
                        <img src={FBlogo} style={{height:"100%", width:"100%"}}/>
                        </div>
                        <div className="d-flex justify-content-center ">
                        <h6
                            style={{
                            fontSize: "43px",
                            fontWeight: "lighter",
                            marginTop: "50px",
                            color: "#000000"
                            }}
                        >
                            1.2m
                        </h6>
                        </div>
                        <div className="d-flex justify-content-center"
                        style={{paddingBottom:"0px"}}
                        >
                        <p
                        className="GreyText"
                        style={{
                            marginBottom: "70px",
                            paddingBottom:"10px"
                        }}
                        >FOLLOWERS COUNT &nbsp;<GrShare size={10} style={{marginBottom:"6px", opacity:"0.5"}}/></p>
                        </div>
                        <div
                        style={{borderTop:"solid 1px #9e9e9f76", width:"290px", position:"absolute", left:"0px"}}
                        ></div>
                        <div className="d-flex justify-content-center text-center mt-2">
                        <div className="col">
                            <p className="m-0 GreyText">INFLUENCE</p>
                            <p
                            style={{color:"#3b3b3b"}}
                            >52%</p>
                        </div>
                        <div className="col">
                            <p className="m-0 GreyText">ENGAGEMENT</p>
                            <p
                            style={{color:"#3b3b3b"}}
                            >84%</p>
                        </div>
                        <div className="col">
                            <p className="m-0 GreyText">REACH</p>
                            <p
                            style={{color:"#3b3b3b"}}
                            >73%</p>
                        </div>
                        </div>
                    </CardBody>
                </Card>
                </Col>
                <Col className="col-xl-3 col-6 d-flex justify-content-center px-sm-0 px-1 ">
                <Card
                    style={{
                    borderRadius:"20px",
                    width:"290px"
                    }}
                    >
                    <CardBody
                    style={{position:"relative"}}
                    >
                        <div className="d-flex justify-content-end ">
                        <BsThreeDots />
                        </div>
                        <div className="d-flex justify-content-center mx-auto"
                        style={{ width: "90px", marginTop:"18px" }}
                        >
                        <img src={TWlogo} style={{height:"100%", width:"100%"}}/>
                        </div>
                        <div className="d-flex justify-content-center ">
                        <h6
                            style={{
                            fontSize: "43px",
                            fontWeight: "lighter",
                            marginTop: "50px",
                            color: "#000000"
                            }}
                        >
                            10.1k
                        </h6>
                        </div>
                        <div className="d-flex justify-content-center"
                        style={{paddingTop:"0px"}}
                        >
                        <p
                        className="GreyText"
                        style={{
                            marginBottom: "72px",
                            paddingBottom:"11px"
                        }}
                        >FOLLOWERS COUNT &nbsp;<GrShare size={10} style={{marginBottom:"6px", opacity:"0.5"}}/></p>
                        </div>
                        <div
                        style={{borderTop:"solid 1px #9e9e9f76", width:"290px", position:"absolute", left:"0px"}}
                        ></div>
                        <div className="d-flex justify-content-center text-center mt-2">
                        <div className="col">
                            <p className="m-0 GreyText">INFLUENCE</p>
                            <p
                            style={{color:"#3b3b3b"}}
                            >52%</p>
                        </div>
                        <div className="col">
                            <p className="m-0 GreyText">ENGAGEMENT</p>
                            <p
                            style={{color:"#3b3b3b"}}
                            >84%</p>
                        </div>
                        <div className="col">
                            <p className="m-0 GreyText">REACH</p>
                            <p
                            style={{color:"#3b3b3b"}}
                            >73%</p>
                        </div>
                        </div>
                    </CardBody>
                </Card>
                </Col>
                </Row>

            <Row className='match-height'>
                <Col md="6">
                    <CardCom icon={<img src='https://cdn-icons-png.flaticon.com/512/1773/1773345.png' width='25px' />} title="Revenue" data={performanceData?.total_redeem ? performanceData.total_redeem : 0} info={'Total earnings'} />
                </Col>

                <Col md="6" className='d-none'>
                    <Card>
                        <CardBody>
                            {
                                chargesLoader ? <div className='d-flex justify-content-center align-items-center'><Spinner width='45px' /></div> : billing?.mainData.length === 0 ? <>
                                    <div className=" d-flex flex-column normal-card text-center">
                                        <h5>No Plan Purchased</h5>
                                        <div className='mt-1'>
                                            <Link to="/merchant/SuperLeadz/joinus/" className='btn btn-primary'>BUY NOW</Link>
                                        </div>
                                    </div>
                                </> : <>
                                    <div className="normal-card">
                                        <div className='d-flex justify-content-between align-items-center flex-grow-1 w-100 mb-2'>
                                            {/* <img width={"25px"} src="https://static.vecteezy.com/system/resources/previews/000/512/317/non_2x/vector-wallet`-glyph-black-icon.jpg" alt="" /> */}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-clipboard"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
                                            <button onClick={() => {
                                                navigate("/merchant/SuperLeadz/joinus/", {state: billing?.price})
                                            }} className='btn btn-sm btn-success text-white'>Upgrade</button>
                                        </div>
                                        {
                                            chargesLoader ? <div className='d-flex justify-content-center align-items-center'><Spinner width='45px' /></div> : <div className="d-flex justify-content-between align-items-center w-100">
                                                <h4 style={{ borderBottom: '0px dotted lightgray', fontSize: '18px', position: "relative", cursor: 'pointer' }}>{<p style={{color:""}}>Your Current PLan is <span style={{color:"#48a441", textTransform: 'capitalize'}}>{billing?.mainData[0]?.plan_id}</span></p>}<span className='position-absolute cursor-pointer' title={`Plan that you have subscribed to`} style={{ top: '-8px', right: '-16px' }}></span></h4>
                                                <div className='d-flex gap-3 align-items-center'>
                                                    <p className='position-relative' style={{ fontSize: `0.85rem`, borderBottom: '0.5px dotted lightgray;', cursor: 'pointer' }} onClick={() => navigate('/leads')}>{"Pop-ups - "}</p>
                                                    <h5 style={{ fontSize: `3rem`, cursor:"default"}}>{`${billing?.usage_count}/${billing?.usage_charge}`}</h5>
                                                </div>
                                            </div>
                                        }
                                        
                                    </div>
                                </>
                            }
                            
                        </CardBody>
                    </Card>
                </Col>
                <div className='col-md-3 cursor-pointer' onClick={() => setFilterOption({ ...filterOption, graphTitle: "total_visitors" })}>
                    <CardCom icon={<User width={'20px'}/>} title="Total Visitors" data={totalVistor ? totalVistor : '0'} info={`Total website traffic (since SuperLeadz was installed - July 15th, 2023 3:55pm)`} />

                </div>
                <div className='col-md-3 cursor-pointer' onClick={() => setFilterOption({ ...filterOption, graphTitle: "leads_generated" })}>
                    <CardCom icon={<UserPlus width={'20px'}  />} title="Leads Generated" data={total ? total : '0'} info={`Total visitors who've submitted their contact information via a SuperLeadz pop-up`} />

                </div>
            </Row>

            <Row className='match-height'>
                <div className='col-md-12'>
                    <div className='row match-height'>
                        <div className='col-md-3 cursor-pointer' onClick={() => setFilterOption({ ...filterOption, graphTitle: "verified_leads" })}>
                            <CardCom icon={<UserCheck width={'20px'} />} title="Verified Leads" data={verified ? verified : 0} info={`Total leads who've verified their contact information via OTP authentication`} />

                        </div>
                        <div className='col-md-3 cursor-default'>
                            <CardCom icon={<Users width={'20px'} />} title={<>Visitor-to-Lead <br /> Conversion Rate</>} data={performanceData?.total_redeem ? performanceData.total_redeem : 0} info={`Proportion of visitors to your website who convert to self-qualified leads`} />
                        </div>
                        <div className='col-md-3 cursor-pointer' onClick={() => setFilterOption({ ...filterOption, graphTitle: "leads_converted" })}>
                            <CardCom icon={<SiConvertio size={'20px'}/>} title="Leads Converted" data={performanceData?.total_redeem ? performanceData.total_redeem : 0} info={`Total leads who redeemed their discount`} />
                        </div>
                        <div className='col-md-3 cursor-default'>
                            <CardCom icon={<Percent width={'20px'}/>} title={<>Lead-to-Customer <br /> Conversion Rate</>} data={performanceData?.total_redeem ? performanceData.total_redeem : 0} info={`The ratio of leads who convert to customers`} />
                        </div>
                    </div>
                </div>
                <div className='col-md-6 d-none'>
                    <div className='card'>
                        <div className='card-body'>
                            <div className="d-flex justify-content-between align-items-center">
                                <select name='graphTitle' className='h4' onChange={(e) => setFilterOption({ ...filterOption, [e.target.name]: e.target.value })} style={{ border: 'none', background: 'transparent', appearance: 'none', cursor: 'pointer' }}>
                                    {
                                        filterOption.options.map((curElem) => {
                                            return <option value={curElem.value} selected={curElem.value === filterOption.graphTitle}>{curElem.label}</option>
                                        })
                                    }
                                </select>
                                <div className="right d-flex justify-content-between align-items-center gap-1">
                                    <p className='me-1 mt-1'>Date: </p>
                                    <Flatpickr options={{ // Sets the minimum date as 14 days ago
                                        maxDate: "today", // Sets the maximum date as today
                                        mode: "range",
                                        dateFormat: "Y-m-d"
                                    }} className='form-control' value={filterOption?.showDate} onChange={(date) => setFilterOption({ ...filterOption, selectedData: date })} id='default-picker' placeholder='Search' />
                                    {/* <div className="dropdown">
                                        <a role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <Menu size={'19px'} />
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <a name="maxDayValue" style={{background: filterOption.maxDayValue === '7' ? '#e8e6f8' : '#fff'}} className="dropdown-item" href="#" onClick={() => setFilterOption({...filterOption, maxDayValue: '7' })} value="7">Last 7 days</a>
                                            </li>
                                            <li>
                                                <a name="maxDayValue" style={{background: filterOption.maxDayValue === '30' ? '#e8e6f8' : '#fff'}} className="dropdown-item" href="#" onClick={() => setFilterOption({...filterOption, maxDayValue: '30' })} value="30">Last 30 days</a>
                                            </li>
                                            <li>
                                                <a name="maxDayValue" style={{background: filterOption.maxDayValue === '365' ? '#e8e6f8' : '#fff'}} className="dropdown-item" href="#" onClick={() => setFilterOption({...filterOption, maxDayValue: '365' })} value="1">Last 1 year</a>
                                            </li>
                                        </ul>

                                    </div> */}

                                </div>
                            </div>
                            {
                                graphIsLoading ? (
                                    <div className='d-flex justify-content-center align-items-center h-100'>
                                        <Spinner width={"100px"} />
                                    </div>
                                    ) : (
                                    <BarChart loading={graphIsLoading} data={filterOption?.graphData} filterOption={filterOption} />
                                )
                            }

                        </div>
                        {/* yAxis={filterOption?.graphTitle ? filterOption?.options} */}
                    </div>
                </div>

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

            <Row className='mt-2'>
                <Card>
                    <CardBody>
                        <AllCampaigns custom={true} />
                    </CardBody>
                </Card>
            </Row>

        </div>
    )
}

export default SuperLeadzDashboard