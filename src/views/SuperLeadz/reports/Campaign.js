import React, { useContext, useEffect, useState } from 'react'
import { User, BarChart2, RefreshCw, DollarSign, Info, Menu, UserPlus, UserCheck, Users, Percent, Check } from 'react-feather'
import { Button, Card, CardBody, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import { SiConvertio } from "react-icons/si"
import moment from 'moment/moment'
import { Link, useNavigate } from 'react-router-dom'
import "../css/Dashboard.css"
import { SuperLeadzBaseURL } from '../../../assets/auth/jwtService'
import Spinner from '../../Components/DataTable/Spinner'
import CardCom from '../../Components/SuperLeadz/CardCom'
import { getCurrentOutlet } from '../../Validator'
import { PermissionProvider } from '../../../Helper/Context'
import AllCampaigns from '../../NewCustomizationFlow/AllCampaigns'

const Campaign = () => {
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

    const [selectedData, setSelectedData] = useState([moment(new Date()).subtract(7, 'd').format('YYYY-MM-DD'), moment(new Date()).format('YYYY-MM-DD')])
    const [filterType, setSetFilterType] = useState("week")

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(true)
    const [chargesLoader, setChargesLoader] = useState(true)
    const [toLoadCampaign, setToLoadCampaign] = useState(false)
    console.log(toLoadCampaign)
    const [billing, setBilling] = useState({
        usage_count: 0,
        usage_charge: 0,
        mainLoadeder: true,
        daysLeft: 0,
        trial_days: 0,
        mainData: [],
        price: ""
    })

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
        // getData()
        if (params.get('charge_id')) {
            chargeApi()
        } else {
            planData()
        }
        // getTotalRevenue()
    }, [])

    useEffect(() => {
        console.log(selectedData.length)
        if (filterType === "custom") {
            if (selectedData.length === 2) {
                getData()
            }
        } else {
            getData()
        }
    }, [filterType, selectedData])

  return (

    <>
        <Card>
            <CardBody className='d-flex justify-content-between align-items-center'>
                <h4 className='mb-0'>Campaign Reports</h4>
                <select className='form-control' style={{ width: '120px' }} onChange={(e) => setSetFilterType(e.target.value)}>
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
            </CardBody>
        </Card>
        <Row className='match-height'>

            <div className='col-md-6'>
                <CardCom icon={<Check width={'20px'}/>} title={<>Remaining <br /> Visits</>} data={!chargesLoader ? Number(billing?.usage_charge) - Number(billing?.usage_count)  : <Spinner size={'25px'} />} info={`Total number of pop-ups (according to the plan) - number of pop-ups loaded on the website`} />
            </div>

            <Col className='col-md-6'>
                <CardCom icon={<img src='https://cdn-icons-png.flaticon.com/512/1773/1773345.png' width='25px' />} title="Campaign Revenue" info={'Sum Total Revenue through SuperLeadz Campaign'} data={!isLoading ? `${userPermission?.currencySymbol}${Number(performanceData?.campaign_revenue).toFixed(2)}` : <Spinner size={'25px'} />} />
            </Col>
            
            <div className='col-md-6'>
                <CardCom icon={<Check width={'20px'}/>} title={<>Active Campaigns</>} data={!isLoading ? performanceData.active_campaign : <Spinner size={'25px'} />} info={`Number of SuperLeadz campaigns i.e. pop-ups that are active on the website`} />
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

            <div className='col-md-6'>
                <CardCom icon={<Check width={'25px'} />} title={<>Impressions</>} data={!isLoading ? performanceData.impressions : <Spinner size={'25px'} />} info={`Number of times the pop-up is shown`} />
            </div>

            <div className='col-md-6'>
                <CardCom icon={<Check width={'25px'} />} title={<>Engaged</>} data={!isLoading ? performanceData.engaged : <Spinner size={'25px'} />} info={`Number of clicks on any button; inside the pop-up`} />
            </div>

            <div className='col-md-6'>
                <CardCom icon={<UserPlus width={'25px'} />} title="Leads Generated" data={!isLoading ? performanceData?.leadsGenerated : <Spinner size={'25px'} />} info={`Total entries registered; including duplicates, verified or unverified`} />

            </div>

            <div className='col-md-6'>
                <CardCom icon={<UserPlus width={'25px'} />} title="Unique leads Generated" data={!isLoading ? performanceData?.uniqueLeadsGenerated : <Spinner size={'25px'} />} info={`Total entries registered excluding duplicate entries`} />

            </div>

            <div className='col-md-6'>
                <CardCom icon={<UserCheck width={'25px'} />} title="Verified Leads" data={!isLoading ? performanceData?.verifiedLeads : <Spinner size={'25px'} />} info={`Total entries registered who have verified via OTP`} />

            </div>

            <div className='col-md-6'>
                <CardCom icon={<UserCheck width={'25px'} />} title="Unique Verified Leads" data={!isLoading ? performanceData?.uniqueVerifiedLeads : <Spinner size={'25px'} />} info={`Total entries registered who have verified via OTP excluding duplicates`} />

            </div>

            <div className='col-md-6'>
                <CardCom icon={<User width={'25px'} />} title="Visits" data={!isLoading ? performanceData?.vists : <Spinner size={'25px'} />} info={`Total visits on all pages`}/>

            </div>

            <div className='col-md-6'>
                <CardCom icon={<Users width={'25px'} />} title={<>Visitor-to-Lead <br /> Conversion Rate</>} data={!isLoading ? `${performanceData?.vistsToLead}%` : <Spinner size={'25px'} />} info={`Number of Sessions to Leads`} />
            </div>

            <div className='col-md-6'>
                <CardCom icon={<SiConvertio size={'25px'} />} title="Leads Converted" data={!isLoading ? performanceData.leadConverted : <Spinner size={'25px'} />} info={`Unique Leads / Customers`}/>
            </div>

            <div className='col-md-6'>
                <CardCom icon={<Percent width={'25px'} />} title={<>Lead-to-Customer <br /> Conversion Rate</>} data={!isLoading ? `${performanceData?.leadToCustomer}%` : <Spinner size={'25px'} />} info={`(Unique Leads / Customers) * 100`} />
            </div>

        </Row>

        <Row className='mt-2'>
            <Card>
                <CardBody>
                    <AllCampaigns name={"Campaigns"} draft={true}  />
                </CardBody>
            </Card>
        </Row>
    </>
  )
}

export default Campaign