import { React, useEffect, useState, useContext } from 'react'
import { Col, Row, Card, CardBody } from 'reactstrap'
import logo from '@src/assets/images/dashboard/Infiniti_strategy.png'
import { SuperLeadzBaseURL, getReq, postReq } from '../../assets/auth/jwtService'
import RadicalChart from '../Components/Charts/DashboardCharts'
import "./Dashboard.css"
import DountCharts from '../Components/Charts/Donut'
import { Briefcase, Mail, UserCheck } from 'react-feather'
import { formatNumberWithCommas } from '../Validator'
import MomentTime from '../Components/Time-Moment/MomentTime'
import Spinner from '../Components/DataTable/Spinner'
import AreaChart from '../Components/Charts/Area'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { PermissionProvider } from '../../Helper/Context'
import moment from 'moment/moment'
import { BsFillCreditCard2BackFill, BsCashStack, BsWind, BsCircle } from "react-icons/bs"
import NewsFeed from './components/NewsFeed'
import ReportsFeed from './components/ReportsFeed'
// import axios from 'axios'


const Dashboard = () => {
    const [newType, setNewType] = useState("reports")
    const params = new URLSearchParams(location.search)
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [campaignLoader, setCampaignLoader] = useState(true)
    const { userPermission } = useContext(PermissionProvider)
    const [graphData, setGraphData] = useState({
        data: {},
        totalReach: 0,
        click: 0,
        redemptions: 0,
        revenue: 0,
        campaign_alerts: []
    })

    const quickAccess = [
        {
            icon: <BsWind />,
            link: "/merchant/xircls/create-network/",
            text: "Invite a Business"
        },
        {
            icon: <BsCircle />,
            link: "/merchant/view_inner_xircl/",
            text: "My Inner XIRCLS"
        },
        {
            icon: <BsCircle />,
            link: "/merchant/plugin/website/",
            text: "Campaign Settings"
        },
        {
            icon: <BsCircle />,
            link: "/merchant/offers/",
            text: "My Offers"
        }
    ]

    const getData = () => {

        getReq('getDashboardData')
        .then((data) => {
            console.log(data, "dash")
            // setData(resp.data.data)

            // const total = data.data.temp.issuance_obj_acq + data.data.temp.issuance_obj_ret
            // const total_reach = Math.ceil(parseFloat(`${data.data.temp.total_amount}`) / parseFloat(`${data.data.temp.price_cost}`))

            const updatedData = {
                totalReach: data?.data?.total_reach,
                click: data?.data?.get_click,
                redemptions: data?.data?.total_redeem,
                revenue: data?.data?.total_revenue,
                campaign_alerts: data?.data?.campaign_alerts,
                data: {}
            }

            setGraphData((preElem) => ({
                ...preElem,
                ...updatedData
            }))

            setIsLoading(false)
        })
        .catch((error) => {
            console.log(error)
            setIsLoading(false)
        })
    }

    const getCampaginDetails = () => {
        getReq('getDashboardCampaginDetails')
        .then((resp) => {
            console.log(resp, "dash")
            setData(resp.data)
            setCampaignLoader(false)
        })
        .catch((error) => {
            console.log(error)
            setCampaignLoader(false)
        })
    }

    const chargeApi = () => {
        const form_data = new FormData()
        form_data.append('charge_id', params.get('charge_id'))
        

        const shop = userPermission?.multipleDomain.filter((cur) => cur.api_key === userPermission?.apiKey)

        console.log(shop, "ppp")
        form_data.append('app', userPermission?.appName)
        
        form_data.append('shop', shop[0]?.web_url) 
        axios({
            method: "POST",
            data: form_data,
            url: `${SuperLeadzBaseURL}/api/v1/add/billing/`
        })
        .then((data) => {
            console.log(data)
            if (data?.data?.response === "billing created successfully") {
                params.delete('charge_id')
                const form_data = new FormData()
                // form_data.append('charge_id', params.get('charge_id'))
                form_data.append('app', 'infiniti')
                const shop = userPermission?.multipleDomain.filter((cur) => cur.api_key === userPermission?.apiKey)

                console.log(shop, "ppp")
                
                form_data.append('shop', shop[0]?.web_url) 

                postReq('planSubscription', form_data)
                .then((resp) => {
                    console.log(resp)
                })
                .catch((error) => {
                    console.log(error)
                })

            }
        })
        .catch((error) => console.log(error))
    }

    useEffect(() => {
        getData()
        getCampaginDetails()
        if (params.get('charge_id')) {
            chargeApi()
        }
    }, [])


    return (
        <>
            <Row className='match-height'>
                <Col xl='12'>
                    <Card>
                        <CardBody>
                            <Row>
                                <Col md="3" style={{borderRight: '1px solid #e1dede'}}>
                                    <div className="text-center">
                                        <h4 style={{letterSpacing: '1px', fontSize: '1.286rem'}}>Total Reach</h4>
                                        <h2
                                            id="totalOfferCount"
                                            style={{
                                            fontSize: 40,
                                            fontWeight: "300",
                                            letterSpacing: 3,
                                            margin: "10px 0px 0px"
                                            }}
                                        >
                                            {isLoading ? <>
                                                <Spinner size="35px" />
                                            </> : <Link to="/merchant/reports/total_reach/" style={{color: 'inherit'}}>{graphData?.totalReach ? formatNumberWithCommas(Number(graphData.totalReach)) : 0}</Link>}
                                        </h2>
                                        <div style={{ position: "relative" }}>
                                            <RadicalChart color={'#6f3470'} percent={graphData.totalReach} />
                                            <img
                                            className="make_center total_reach_image"
                                            style={{
                                                position: "absolute",
                                                top: "50%",
                                                left: "50%",
                                                transform: "translate(-50%, -50%)",
                                                width: 50
                                            }}
                                            src="https://api.xircls.com/static/images/reach.png"
                                            />
                                        </div>
                                    </div>
                                </Col>
                                <Col md="3"  style={{borderRight: '1px solid #e1dede'}}>
                                    <div className="text-center">
                                        <h4 style={{letterSpacing: '1px', fontSize: '1.286rem'}}>Clicks</h4>
                                        <h2
                                            id="totalOfferCount"
                                            style={{
                                            fontSize: 40,
                                            fontWeight: "300",
                                            letterSpacing: 3,
                                            margin: "10px 0px 0px"
                                            }}
                                        >
                                            {isLoading ? <>
                                                <Spinner size="35px" />
                                            </> : <Link to="/merchant/reports/total_clicks/" style={{color: 'inherit'}}>{graphData?.click ? formatNumberWithCommas(Number(graphData.click)) : 0}</Link>}
                                        </h2>
                                        <div style={{ position: "relative" }}>
                                            <RadicalChart color={'#349b8e'} percent={graphData.click} />
                                            <img
                                            className="make_center total_reach_image"
                                            style={{
                                                position: "absolute",
                                                top: "50%",
                                                left: "50%",
                                                transform: "translate(-50%, -50%)",
                                                width: 50
                                            }}
                                            src="https://api.xircls.com/static/images/clicks.png"
                                            />
                                        </div>
                                        
                                    </div>
                                </Col>
                                <Col md="3"  style={{borderRight: '1px solid #e1dede'}}>
                                    <div className="text-center">
                                        <h4 style={{letterSpacing: '1px', fontSize: '1.286rem'}}>Redemptions</h4>
                                        <h2
                                            id="totalOfferCount"
                                            style={{
                                            fontSize: 40,
                                            fontWeight: "300",
                                            letterSpacing: 3,
                                            margin: "10px 0px 0px"
                                            }}
                                        >
                                            {isLoading ? <>
                                                <Spinner size="35px" />
                                            </> : <Link to="/merchant/reports/total_redemptions/" style={{color: 'inherit'}}>{graphData?.redemptions ? formatNumberWithCommas(Number(graphData.redemptions)) : 0}</Link>}
                                        </h2>
                                        <div style={{ position: "relative" }}>
                                            <RadicalChart color={'#28c76f'} percent={graphData.redemptions} />
                                            <img
                                            className="make_center total_reach_image"
                                            style={{
                                                position: "absolute",
                                                top: "50%",
                                                left: "50%",
                                                transform: "translate(-50%, -50%)",
                                                width: 50
                                            }}
                                            src="https://api.xircls.com/static/images/redemption.png"
                                            />
                                        </div>
                                        
                                    </div>
                                </Col>
                                <Col md="3">
                                    <div className="text-center">
                                        <h4 style={{letterSpacing: '1px', fontSize: '1.286rem'}}>Revenue</h4>
                                        <h2
                                            id="totalOfferCount"
                                            style={{
                                            fontSize: 40,
                                            fontWeight: "300",
                                            letterSpacing: 3,
                                            margin: "10px 0px 0px"
                                            }}
                                        >
                                            {isLoading ? <>
                                                <Spinner size="35px" />
                                            </> : <Link to="/merchant/reports/total_revenue/" style={{color: 'inherit'}}>{graphData?.revenue ? formatNumberWithCommas(Number(graphData.revenue)) : 0}</Link>}
                                        </h2>
                                        <div style={{ position: "relative" }}>
                                            <RadicalChart color={'#4388cf'} percent={graphData.revenue} />
                                            <img
                                                className="make_center total_reach_image"
                                                style={{
                                                    position: "absolute",
                                                    top: "50%",
                                                    left: "50%",
                                                    transform: "translate(-50%, -50%)",
                                                    width: 50
                                                }}
                                                src="https://api.xircls.com/static/images/revenue.png"
                                            />
                                        </div>
                                        
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row className='match-height'>
                <Col xl='8'>
                    <Row className='match-height'>
                        <Col xl='6'>
                            <Card>
                                <CardBody className=' d-flex justify-content-between'>
                                    <div>
                                        <h4>CAC</h4>
                                        <h3>0</h3>
                                    </div>
                                    <div className=' logo logoRedeemed d-flex justify-content-center align-items-center fs-4 border rounded-5 '>
                                        <BsFillCreditCard2BackFill />
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xl='6'>
                            <Card>
                                <CardBody className=' d-flex justify-content-between' style={{ height: `100px`}}>
                                    <div>
                                        <h4>CTR</h4>
                                        <h3>
                                            {
                                                isLoading ? <>
                                                    <Spinner size="30px" />
                                                </> : parseFloat((graphData?.click / graphData.totalReach) * 100).toFixed(2) 
                                            }
                                        </h3>
                                    </div>
                                    <div className='logo logoReferrals d-flex justify-content-center align-items-center fs-4 border rounded-5 '>
                                        <BsCashStack />
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row className='match-height'>
                        <Col md="12">
                            <Card>
                                <CardBody>
                                    <ul className=' list-unstyled d-inline-flex'>
                                        <li className={ newType === "reports" ? " feedToggle mx-1 fs-6 fw-bolder text-capitalize cursor-pointer" : "fs-6 mx-1 fw-bold text-capitalize cursor-pointer"} onClick={() => setNewType("reports")}>Report</li>
                                        <li className={newType === "notification" ? " feedToggle mx-3 fs-6 fw-bold text-capitalize cursor-pointer" : "mx-3 fs-6 fw-bold text-capitalize cursor-pointer"} onClick={() => setNewType("notification")}>Notification</li>
                                    </ul>
                                    <div style={{maxHeight: '430px', overflowY: "scroll", overflowX: 'visible'}}>

                                        {
                                            newType === "reports" ? (
                                                <>
                                                    <ReportsFeed />
                                                </>
                                            ) : (
                                                <>
                                                    <NewsFeed isLoading={isLoading} graphData={graphData} />
                                                </>
                                            )
                                        }

                                    </div>
                                    
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col xl='4'>
                    <Row>
                        <Col md='12'>
                            <Card>
                                <CardBody>
                                    <h4 style={{ lineHeight: `1.5rem`, marginBottom: `1rem`}}>Current Campaign</h4>
                                    {
                                        campaignLoader ? <div className='py-1'>
                                            <Spinner size="35px" />
                                        </div> : <>
                                            <Row>
                                                <Col sm='7'>
                                                    <p className="card-text font-small-3">Product - { data?.product_name ?  data?.product_name : "--"}</p>
                                                    <p className="card-text font-small-3">Active -  Forever Free Plan</p>
                                                    <p className="card-text font-small-3">Start Date - {data?.user_plan_subcription ? moment(data?.user_plan_subcription[0]?.start_date).format('DD/MM/YYYY') : "--"}</p>
                                                </Col>
                                                <Col sm='5'>
                                                    <Row>
                                                        <Col xl='12' className='d-flex justify-content-center align-items-center'>
                                                            <img style={{ width: `100px`}} src={logo}></img>
                                                            
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                            <Row className='mt-2'>
                                                <Col xl='6'>
                                                    <p className="card-text font-small-3 mb-1"><b>Plan Amount: {userPermission?.currencySymbol}{Number(data?.plan_amount)} </b></p>
                                                    <p className="card-text font-small-3 mb-1"><b>Spent: {userPermission?.currencySymbol}{data?.spent_amt} </b></p>
                                                    <p className="card-text font-small-3 mb-1"><b>Balance: {userPermission?.currencySymbol}{data?.balance_amt} </b></p>
                                                </Col>
                                            </Row>
                                            <br />
                                            <Row className="row d-flex justify-content-center align-items-center">
                                                <Col sm='7' className='d-flex justify-content-start align-items-center'>

                                                    <h5>
                                                        Status: {data?.campaign_active ? <span className="badge bg-success"> Live</span>  : <span className="badge bg-danger">Inactive</span>} 
                                                    </h5>

                                                </Col>
                                                <Col sm='5' className='d-flex justify-content-center align-items-center'>
                                                    <Link to="/plan_pricing/1/"><button type="button" style={{ display: `inline`, padding: `0.786rem 1rem`, backgroundColor: `#28c76f !important`, border: `none`}} className="btn btn-success waves-effect waves-float waves-light text-white">Renew/ Upgrade</button></Link>

                                                </Col>

                                            </Row>
                                        </>
                                    }
                                    
                                </CardBody>
                            </Card>

                        </Col>
                    </Row>
                    <Row className='match-height'>
                        {
                            quickAccess.map((curElem) => {
                                return <Col md="6">
                                    <Card >
                                        <CardBody>
                                            <Link to={curElem.link} className='d-flex flex-column justify-content-center align-items-center gap-1 p-1 rounded-1'>
                                                <div className='logo logoSample fs-4 d-flex justify-content-center align-items-center'>
                                                    {curElem.icon}
                                                </div>
                                                <div>
                                                    <a className='text-dark fs-5 fw-bolder text-center'>{curElem.text}</a>
                                                </div>
                                            </Link>
                                        </CardBody>
                                    </Card>
                                </Col>
                            })
                        }
                        
                        {/* <Col md="6">
                            <Card >
                                <CardBody className=' d-flex flex-column justify-content-center align-items-center gap-1 p-1 rounded-1'>
                                    <div className='logo logoSample fs-4 d-flex justify-content-center align-items-center'>
                                        <BsCircle />
                                    </div>
                                    <div>
                                        <Link to="/merchant/view_inner_xircl/" className='text-dark fs-5 fw-bolder text-center'>My Inner XIRCLS</Link>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="6">
                            <Card >
                                <CardBody className=' d-flex flex-column justify-content-center align-items-center gap-1 p-1 rounded-1'>
                                    <div className='logo logoSample fs-4 d-flex justify-content-center align-items-center'>
                                        <BsCircle />
                                    </div>
                                    <div>
                                        <Link to="/merchant/plugin/website/" className='text-dark fs-5 fw-bolder text-center'>Campaign Settings</Link>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="6">
                            <Card >
                                <CardBody className=' d-flex flex-column justify-content-center align-items-center gap-1 p-1 rounded-1'>
                                    <div className='logo logoSample fs-4 d-flex justify-content-center align-items-center'>
                                        <BsCircle />
                                    </div>
                                    <div>
                                        <Link to="/merchant/offers/" className='text-dark fs-5 fw-bolder text-center'>My Offers</Link>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col> */}
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default Dashboard 