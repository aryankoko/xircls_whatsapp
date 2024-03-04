import React, { useContext, useEffect, useState } from 'react'
import { User, BarChart2, RefreshCw, DollarSign, Info, Menu, UserPlus, UserCheck, Users, Percent, Check } from 'react-feather'
import { Button, Card, CardBody, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import CardCom from '../Components/SuperLeadz/CardCom'
import { SiConvertio } from "react-icons/si"
import axios from 'axios'
import moment from 'moment/moment'
import { SuperLeadzBaseURL, getReq, postReq } from '../../assets/auth/jwtService'
import Spinner from '../Components/DataTable/Spinner'
import toast from 'react-hot-toast'
import { getCurrentOutlet } from '../Validator'
import { Link, useNavigate } from 'react-router-dom'
import { AiFillPhone, AiOutlineMail, AiFillCaretRight, AiOutlineQuestion } from 'react-icons/ai'
import { BiDollar } from "react-icons/bi"
import mainLogo from "./assets/Spider-man.png"
import "./css/Dashboard.css"
import SuperLeadzCampaign from '../Apps/SuperLeadzCampaign'
import AllCampaigns from '../NewCustomizationFlow/AllCampaigns'
import { PermissionProvider } from '../../Helper/Context'
import Flatpickr from 'react-flatpickr'

function SuperLeadzDashboard() {
    const { userPermission } = useContext(PermissionProvider)
    const [performanceData, setPerformanceData] = useState({
        active_campaign: "0",
        campaign_revenue: "0",
        impressions: "0",
        engaged: "0",
        leadsGenerated: "0",
        uniqueLeadsGenerated: "0",
        verifiedLeads: "0",
        uniqueVerifiedLeads: "0",
        vists: "0",
        vistsToLead: "0",
        leadConverted: "0.00",
        leadToCustomer: "0.00"

    })
    // const [totalRevenue, setTotalRevenue] = useState(0)
    // const [isRevenue, setIsRevenue] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const [chargesLoader, setChargesLoader] = useState(true)
    const [toLoadCampaign, setToLoadCampaign] = useState(false)
    const [cancel, setCancel] = useState(false)
    // const currentDate = moment()
    const [selectedData, setSelectedData] = useState([moment(new Date()).subtract(7, 'd').format('YYYY-MM-DD'), moment(new Date()).format('YYYY-MM-DD')])
    const [filterType, setSetFilterType] = useState("week")
    const navigate = useNavigate()
    const [isCampagin, setIsCampagin] = useState(0)
    const [campaignLoader, setCampaignLoader] = useState(false)

    // const [filterOption, setFilterOption] = useState({
    //     graphTitle: "total_visitors",
    //     maxDayValue: "7",
    //     options: [
    //         {
    //             value: "total_visitors",
    //             label: "Total Visitors",
    //             yAxis: "Total Visitors"
    //         },
    //         {
    //             value: "leads_generated",
    //             label: "Leads Generated",
    //             yAxis: "Leads Generated"
    //         },
    //         {
    //             value: "verified_leads",
    //             label: "Verified Leads",
    //             yAxis: "Verified Leads"
    //         },
    //         {
    //             value: "leads_converted",
    //             label: "Leads Converted",
    //             yAxis: "Leads Converted"
    //         }
    //     ],
    //     selectedData: [moment(new Date()).subtract(7, 'd'), moment(new Date())],
    //     showDate: [moment(new Date()).subtract(7, 'd').format('YYYY-MM-DD'), moment(new Date()).format('YYYY-MM-DD')],
    //     graphData: []
    // })
    const [billing, setBilling] = useState({
        usage_count: 0,
        usage_charge: 0,
        mainLoadeder: true,
        daysLeft: 0,
        trial_days: 0,
        mainData: [],
        price: ""
    })

    // console.log(filterOption, "filterOption")

    const params = new URLSearchParams(location.search)
    const outletData = getCurrentOutlet()

    const options = [
        {value: "all", label: "Lifetime"},
        {value: "today", label: "Today"},
        {value: "week", label: "This Week"},
        {value: "month", label: "This Month"},
        {value: "year", label: "This Year"},
        {value: "custom", label: "Custom"}
    ]

    // const campaignData = userPermission?.campaign ? userPermission?.campaign?.filter((cur) => {
    //     return userPermission?.appName === cur.app
    // }) : []

    const getData = () => {
        setIsLoading(true)
        const form_data = new FormData()
        const currentDate = moment()

        form_data.append('shop', outletData[0]?.web_url)
        form_data.append('app_name', "superleadz")
        form_data.append('type', filterType)

        if (filterType === "week") {
            form_data.append('start_date', currentDate.clone().subtract(1, 'week').format('YYYY-MM-DD'))
            form_data.append('end_date', moment(new Date()).format('YYYY-MM-DD'))
        } else if (filterType === "month") {
            form_data.append('start_date', currentDate.clone().subtract(1, 'month').format('YYYY-MM-DD'))
            form_data.append('end_date', moment(new Date()).format('YYYY-MM-DD'))
        } else if (filterType === "year") {
            form_data.append('start_date', currentDate.clone().subtract(1, 'year').format('YYYY-MM-DD'))
            form_data.append('end_date', moment(new Date()).format('YYYY-MM-DD'))
        } else if (filterType === "custom") {
            form_data.append('start_date', moment(selectedData[0]).format('YYYY-MM-DD'))
            form_data.append('end_date', moment(selectedData[1]).format('YYYY-MM-DD'))
        }

        const updateUrl = new URL(`${SuperLeadzBaseURL}/api/v1/dashboard_reports/`)
        fetch(updateUrl, {
            method: 'POST',
            body: form_data
        })
        .then((resp) => resp.json())
        .then((data) => {
            const updatedData = {
                active_campaign: data?.active_campaign ? data?.active_campaign : "0",
                campaign_revenue: data?.campaign_revenue ? data?.campaign_revenue : "0",
                impressions: data?.impression ? data?.impression : "0",
                engaged: data?.engagment ? data?.engagment : "0",
                leadsGenerated: data?.leads[0]?.totalLeads ? data?.leads[0]?.totalLeads : "0",
                uniqueLeadsGenerated: data?.leads[0]?.uniqueLeads ? data?.leads[0]?.uniqueLeads : "0",
                verifiedLeads: data?.leads[0]?.verifiedLeads ? data?.leads[0]?.verifiedLeads : "0",
                uniqueVerifiedLeads: data?.leads[0]?.uniqueVerifiedLeads ? data?.leads[0]?.uniqueVerifiedLeads : "0",
                vists: data?.total_visit ? data?.total_visit : "0",
                vistsToLead: data?.leads[0]?.totalLeads && data?.total_visit ? Number(data?.leads[0]?.totalLeads / data?.total_visit * 100).toFixed(2) : "0.00",
                leadConverted: data?.lead_converted ? data?.lead_converted : "0",
                leadToCustomer: data?.lead_converted && data?.leads[0]?.verifiedLeads ? Number(data?.lead_converted / data?.leads[0]?.verifiedLeads * 100).toFixed(2) : "0.00"
            }
            setPerformanceData((preData) => ({
                ...preData,
                ...updatedData
            }))
            setIsLoading(false)
        })
        .catch((error) => {
            console.log(error)
            setIsLoading(false)
        })
    }

    useEffect(() => {
        console.log(selectedData.length)
        if (filterType === "custom") {
            if (selectedData.length === 2) {
                getData()
            }
        } else {
            getData()
        }

        getReq('campaignData', `?app=${userPermission?.appName}`)
        .then((resp) => {
            console.log(resp)
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


    }, [filterType, selectedData])

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

    // const getTotalRevenue = () => {
    //     fetch(`${SuperLeadzBaseURL}/api/v1/orders_revenue/?shop=${outletData[0]?.web_url}&app_name=superleadz`, {
    //         method: 'GET'
    //         // body: formData
    //     })
    //         .then((resp) => resp.json())
    //         .then((result) => {
    //             console.log(result)
    //             setTotalRevenue(result.total_revenue)
    //             setIsRevenue(false)
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //             setIsRevenue(false)
    //         })
    // }

    useEffect(() => {
        // getData()
        if (params.get('charge_id')) {
            chargeApi()
        } else {
            planData()
        }
        // getTotalRevenue()
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

    // useEffect(() => {
    //     // setGraphIsLoading(true)
    //     const form_data = new FormData()
    //     form_data.append('type_data', filterOption.graphTitle)
    //     form_data.append('start_date', moment(filterOption.selectedData[0]).format('YYYY-MM-DD'))
    //     form_data.append('end_date', moment(filterOption.selectedData[1]).format('YYYY-MM-DD'))
    //     form_data.append('shop', outletData[0]?.web_url)
    //     form_data.append('app', 'superleadz')

    //     fetch(`${SuperLeadzBaseURL}/utils/api/v1/state_wise_data/`, {
    //         method: "POST",
    //         body: form_data
    //     })
    //         .then((resp) => resp.json())
    //         .then((data) => {
    //             setFilterOption({ ...filterOption, graphData: data.response })
    //             // setGraphIsLoading(false)
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //             // setGraphIsLoading(false)
    //         })
    // }, [filterOption.selectedData, filterOption.graphTitle])

    // console.log(filterOption, "opop")

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
                                        <img src={mainLogo} height={64} width={64} style={{ borderRadius: "100%", border: "solid 1px #afafaf" }} />
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
                                                                return  <option value={curElem.value} selected={curElem.value === filterType}>{curElem.label}</option>
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
                                                <SuperLeadzCampaign toLoadCampaign={toLoadCampaign} outletData={outletData} />
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
                                                                    return  <option value={curElem.value} selected={curElem.value === filterType}>{curElem.label}</option>
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
                                                                return  <option value={curElem.value} selected={curElem.value === filterType}>{curElem.label}</option>
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
                    <CardCom icon={<img src='https://cdn-icons-png.flaticon.com/512/1773/1773345.png' width='27px' />} title="Campaign Revenue" info={'Sum Total Revenue through SuperLeadz Campaign'} data={!isLoading ? `₹${Number(performanceData?.campaign_revenue).toFixed(2)}` : <Spinner size={'25px'} />} />
                </Col>

                <div className='col-md-6 cursor-default'>
                    <CardCom icon={<Check width={'27px'}/>} title={<>Remaining <br /> Visits</>} data={!chargesLoader ? Number(billing?.usage_charge) - Number(billing?.usage_count)  : <Spinner size={'25px'} />} info={`Total number of pop-ups (according to the plan) - number of pop-ups loaded on the website`} />
                </div>
                
                <div className='col-md-6 cursor-default'>
                    <CardCom icon={<Check width={'27px'}/>} title={<>Active Campaigns</>} data={!isLoading ? performanceData.active_campaign : <Spinner size={'25px'} />} info={`Number of SuperLeadz campaigns i.e. pop-ups that are active on the website`} />
                </div>


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
                                                navigate("/merchant/SuperLeadz/joinus/", { state: billing?.price })
                                            }} className='btn btn-sm btn-success text-white'>Upgrade</button>
                                        </div>
                                        {
                                            chargesLoader ? <div className='d-flex justify-content-center align-items-center'><Spinner width='45px' /></div> : <div className="d-flex justify-content-between align-items-center w-100">
                                                <h4 style={{ borderBottom: '0px dotted lightgray', fontSize: '18px', position: "relative", cursor: 'pointer' }}>{<p style={{ color: "" }}>Your Current PLan is <span style={{ color: "#48a441", textTransform: 'capitalize' }}>{billing?.mainData[0]?.plan_id}</span></p>}<span className='position-absolute cursor-pointer' title={`Plan that you have subscribed to`} style={{ top: '-8px', right: '-16px' }}></span></h4>
                                                <div className='d-flex gap-3 align-items-center'>
                                                    <p className='position-relative' style={{ fontSize: `0.85rem`, borderBottom: '0.5px dotted lightgray;', cursor: 'pointer' }} onClick={() => navigate('/leads')}>{"Pop-ups - "}</p>
                                                    <h5 style={{ fontSize: `3rem`, cursor: "default" }}>{`${billing?.usage_count}/${billing?.usage_charge}`}</h5>
                                                </div>
                                            </div>
                                        }

                                    </div>
                                </>
                            }

                        </CardBody>
                    </Card>
                </Col>

                <div className='col-md-6 cursor-default d-none'>
                    <CardCom icon={<Check width={'27px'} />} title={<>Impressions</>} data={!isLoading ? performanceData.impressions : <Spinner size={'25px'} />} info={`Number of times the pop-up is shown`} />
                </div>

                <div className='col-md-6 cursor-default d-none'>
                    <CardCom icon={<Check width={'27px'} />} title={<>Engaged</>} data={!isLoading ? performanceData.engaged : <Spinner size={'25px'} />} info={`Number of clicks on any button; inside the pop-up`} />
                </div>

                <div className='col-md-6 cursor-pointer'>
                    <CardCom icon={<UserPlus width={'27px'} />} title="Leads Generated" data={!isLoading ? performanceData?.leadsGenerated : <Spinner size={'25px'} />} info={`Total entries registered; including duplicates, verified or unverified`} />

                </div>

                <div className='col-md-6 cursor-pointer d-none'>
                    <CardCom icon={<UserPlus width={'27px'} />} title="Unique leads Generated" data={!isLoading ? performanceData?.uniqueLeadsGenerated : <Spinner size={'25px'} />} info={`Total entries registered excluding duplicate entries`} />

                </div>

                <div className='col-md-6 cursor-pointer d-none'>
                    <CardCom icon={<UserCheck width={'27px'} />} title="Verified Leads" data={!isLoading ? performanceData?.verifiedLeads : <Spinner size={'25px'} />} info={`Total entries registered who have verified via OTP`} />

                </div>

                <div className='col-md-6 cursor-pointer d-none'>
                    <CardCom icon={<UserCheck width={'27px'} />} title="Unique Verified Leads" data={!isLoading ? performanceData?.uniqueVerifiedLeads : <Spinner size={'25px'} />} info={`Total entries registered who have verified via OTP excluding duplicates`} />

                </div>

                <div className='col-md-6 cursor-pointer'>
                    <CardCom icon={<User width={'27px'} />} title="Visits" data={!isLoading ? performanceData?.vists : <Spinner size={'25px'} />} info={`Total visits on all pages`}/>

                </div>

                <div className='col-md-6 cursor-default'>
                    <CardCom icon={<Users width={'27px'} />} title={<>Visitor-to-Lead <br /> Conversion Rate</>} data={!isLoading ? `${performanceData?.vistsToLead}%` : <Spinner size={'25px'} />} info={`Number of Sessions to Leads`} />
                </div>

                <div className='col-md-6 cursor-pointer'>
                    <CardCom icon={<SiConvertio size={'25px'} />} title="Leads Converted" data={!isLoading ? performanceData.leadConverted : <Spinner size={'25px'} />} info={`Unique Leads / Customers`}/>
                </div>

                <div className='col-md-6 cursor-default'>
                    <CardCom icon={<Percent width={'27px'} />} title={<>Lead-to-Customer <br /> Conversion Rate</>} data={!isLoading ? `${performanceData?.leadToCustomer}%` : <Spinner size={'25px'} />} info={`(Unique Leads / Customers) * 100`} />
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

            <Row className='mt-2'>
                <Card>
                    <CardBody>
                        <AllCampaigns name={"Campaigns"} custom={true} create={false} draft={false} viewAll="/merchant/SuperLeadz/all_campaigns/" />
                    </CardBody>
                </Card>
            </Row>

        </div>
    )
}

export default SuperLeadzDashboard