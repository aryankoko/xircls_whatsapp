// import axios from "axios"
import { useEffect, useState } from "react"
import { CheckCircle, Wind } from "react-feather"
import { Link } from "react-router-dom"
import { Card, CardBody, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane, Table } from "reactstrap"
import StatsVertical from "../../../@core/components/widgets/stats/StatsVertical"
import MomentTime from "../../Components/Time-Moment/MomentTime"
import { getReq, postReq } from "../../../../src/assets/auth/jwtService"
import toast from "react-hot-toast"
import FrontBaseLoader from "../../Components/Loader/Loader"
import { ownUrl } from "../../Validator"
// import { networkDashboard } from "../../../@core/auth/new_jwt/APIHandler"
// import newCountry from './newCountry.json'

const NetworkDashboard = () => {

    const [data, setData] = useState({})
    const [apiLoader, setApiLoader] = useState(false)
    const [active, setActive] = useState(1)

    const nav_link = ["Network Alerts", "Partner Requests", "Manage Partners", "Invites Sent", "Blocked Outlets"]

    const toggle = (tabNo) => {
        if (active !== tabNo) {
            setActive(tabNo)
            // setTab(buttonId)
        }
    }

    const getAllNetworkDashboard = async () => {
       getReq('networkDashboard')
       .then((resp) => {
            setData(resp.data.data)
       })
       .catch((error) => {
            console.log(error)
       })
    }

    useEffect(() => {
        getAllNetworkDashboard()
        
    }, [])

    const newtworkAlerts = (type, id, message) => {
        setApiLoader(true)
        const form_data = new FormData()
        form_data.append('req_outlet_id', id)
        form_data.append('action', type)
        postReq('innerXirclsRequest', form_data)
        .then((resp) => {
            console.log(resp)
            getAllNetworkDashboard()
            toast.success(message)
            setApiLoader(false)
        })
        .catch((error) => {
            console.log(error)
            setApiLoader(false)
            toast.error('Something went wrong')
        })
    }
    

    return (
        <div className="network-dashboard">
            {
                apiLoader ? <FrontBaseLoader /> : ''
            }
            <Row className="match-height">
                <Col md={12}>
                    <Card>
                        <CardBody>
                            <div className="d-flex justify-content-between">
                                <div className="flex-grow-1" style={{ marginTop: '10px' }}>
                                    <h4>Network Dashboard</h4>
                                </div>
                                <div className="d-flex gap-2">
                                    <Link to="/merchant/add_partner/" className="btn btn-primary mr-1 waves-effect waves-float waves-light">Add Partner</Link>
                                    {/* <a href="" className="btn btn-primary waves-effect waves-float waves-light"><Settings size={15} /></a> */}
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <CardBody className="text-center">
                            <h3>0</h3>
                            <h6 className="mb-0">Outlets that have viewed your profile</h6>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <CardBody className="text-center">
                            <h3>0</h3>
                            <h6 className="mb-0">New Outlets on XIRCLS</h6>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <CardBody className="text-center">
                            <h3>0</h3>
                            <h6 className="mb-0">Best match for you</h6>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={6}>
                    <StatsVertical icon={<Wind size={25} />} color='success' stats="" statTitle='Invite a Business' />
                </Col>
                <Col md={6}>
                    <StatsVertical icon={<Wind size={25} />} color='success' stats="" statTitle='Inner XIRCL' />
                </Col>
                <Col xs={12}>
                    <Card>
                        <CardBody>
                            <Nav tabs>
                                {nav_link.map((curElem, i) => {
                                    return <NavItem key={i}>
                                        <NavLink
                                            active={active === (i + 1)}
                                            onClick={() => {
                                                toggle(i + 1)
                                            }}
                                        >
                                            <span className='align-middle'>{curElem}</span>
                                        </NavLink>
                                    </NavItem>
                                })}
                            </Nav>
                            <TabContent className="mt-3 px-1" activeTab={active}>
                                <TabPane tabId={1}>
                                    <Row>
                                        <Col md={6}>
                                            <h4 className="mb-2">Campaign Alerts</h4>
                                            <ul className="p-0 px-1 m-0" style={{ listStyle: 'none', maxHeight: '65vh', overflowY: "scroll", overflowX: 'visible' }}>
                                                {data.campaign_alerts?.length !== 0 ? data.campaign_alerts?.map((ele, key) => {
                                                    let color
                                                    if (ele.event_type === 'NEW_PART') {
                                                        color = 'info'
                                                    } else if (ele.event_type === 'INV_REC') {
                                                        color = 'warning'
                                                    } else if (ele.event_type === 'INV_SNT') {
                                                        color = 'success'
                                                    }

                                                    return (
                                                        <li key={key} className="position-relative px-3 pb-3" style={{ borderLeft: '0.5px dotted black' }}>
                                                            <span className={`position-absolute rounded-pill bg-${color}`} style={{ width: 14, height: 14, top: 0, left: 0, transform: 'translate(-7px, 2.5px)' }}></span>
                                                            <h5 className="d-flex justify-content-between">New Partner Alert<span className="fw-normal text-secondary" style={{ fontSize: '0.95rem' }}><MomentTime time={ele.created_at} format={'YYYY/MM/DD, hh:mm'} /></span></h5>
                                                            <p>{ele.log_text}</p>
                                                            <div className="d-flex align-items-center">
                                                                <a href={'#'}><img src={`${ele?.outlet_who_fired_event?.outlet_logo}`} className="rounded-pill" width={50} style={{ aspectRatio: '1' }} alt="logo" /></a>
                                                                <p className="mb-0 ms-2">{ele?.company?.company_name}</p>
                                                            </div>
                                                        </li>
                                                    )
                                                }) : <h6>No Campaign alerts to show</h6>
                                                }
                                            </ul>
                                        </Col>
                                        <Col md={6}>
                                            <h4 className="mb-2">Network Alerts</h4>
                                            <ul className="p-0 px-1 m-0" style={{ listStyle: 'none', maxHeight: '65vh', overflowY: "scroll", overflowX: 'visible' }}>
                                                {data.network_alerts?.length !== 0 ? data.network_alerts?.map((ele, key) => {
                                                    let color
                                                    let heading
                                                    if (ele.event_type === 'NEW_PART') {
                                                        color = 'info'
                                                        heading = 'New Partner Alert'
                                                    } else if (ele.event_type === 'INV_REC') {
                                                        color = 'warning'
                                                        heading = 'Invite Recieved'
                                                    } else if (ele.event_type === 'INV_SNT') {
                                                        color = 'success'
                                                        heading = 'Invite Sent'
                                                    }

                                                    return (
                                                        <li key={key} className="position-relative px-3 pb-3" style={{ borderLeft: '0.5px dotted black' }}>
                                                            <span className={`position-absolute rounded-pill bg-${color}`} style={{ width: 14, height: 14, top: 0, left: 0, transform: 'translate(-7px, 2.5px)' }}></span>
                                                            <h5 className="d-flex justify-content-between">{heading}<span className="fw-normal text-secondary" style={{ fontSize: '0.95rem' }}><MomentTime time={ele.created_at} format={'YYYY/MM/DD, hh:mm'} /></span></h5>
                                                            <p>{ele.log_text}</p>
                                                            <div className="d-flex align-items-center">
                                                                <a href={'#'}><img src={`${ele?.outlet_who_fired_event?.outlet_logo}`} className="rounded-pill" width={50} style={{ aspectRatio: '1' }} alt="logo" /></a>
                                                                <p className="mb-0 ms-2">{ele?.company?.company_name}</p>
                                                            </div>
                                                        </li>
                                                    )
                                                }) : <h6>No Network alerts to show</h6>
                                                }
                                            </ul>
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tabId={2}>
                                    <Row>
                                        <Col md={6}>
                                            <h4 className="mb-2">Requests sent</h4>
                                            <ul className="p-0 px-1 m-0" style={{ listStyle: 'none', maxHeight: '65vh', overflowY: "scroll", overflowX: 'visible' }}>
                                                {data.partner_sent?.length !== 0 ? data.partner_sent?.map((ele, key) => {
                                                    return (
                                                        <li key={key} className="position-relative px-3 pb-3" style={{ borderLeft: '0.5px dotted black' }}>
                                                            <span className="position-absolute border-success bg-white rounded-pill d-flex justify-content-center align-items-center" style={{ width: 30, height: 30, top: 0, left: 0, transform: 'translate(-15px, 2.5px)' }}>
                                                                <CheckCircle size={17.5} color='#28c76f' />
                                                            </span>
                                                            <h5 className="d-flex justify-content-between">Invite Sent <span className="fw-normal text-secondary" style={{ fontSize: '0.95rem' }}><MomentTime time={ele.create_at} format={'YYYY/MM/DD, hh:mm'} /></span></h5>
                                                            <p>You've sent a Preferred Partner request to {ele.in_circle_outlet.outlet_name}. You will be notified when your request is accepted</p>
                                                            <hr />
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <div className="d-flex align-items-center">
                                                                    <a href={`#`}><img src={`${ownUrl}${ele.in_circle_outlet.outlet_logo}`} className="rounded-pill" width={'80px'} style={{ aspectRatio: '1' }} alt="logo" /></a>
                                                                    <p className="mb-0 ms-2">{ele.in_circle_outlet.outlet_name}</p>
                                                                </div>
                                                                <button className="btn btn-sm btn-outline-danger" onClick={() => newtworkAlerts('REMOVE_PARTNER', ele?.in_circle_outlet?.id, "Request cancelled")}>Cancel request</button>
                                                            </div>
                                                        </li>
                                                    )
                                                }) : <h6>No Requests Sent Yet</h6>
                                                }
                                            </ul>
                                        </Col>
                                        <Col md={6}>
                                            <h4 className="mb-2">Requests Recieved</h4>
                                            <ul className="p-0 px-1 m-0" style={{ listStyle: 'none', maxHeight: '65vh', overflowY: "scroll", overflowX: 'visible' }}>
                                                {data.partner_receive?.length !== 0 ? data.partner_receive?.map((ele, key) => {
                                                    return (
                                                        <li key={key} className="position-relative px-3 pb-3" style={{ borderLeft: '0.5px dotted black' }}>
                                                            <span className="position-absolute bg-warning rounded-pill" style={{ width: 14, height: 14, top: 0, left: 0, transform: 'translate(-7px, 2.5px)' }}>

                                                            </span>
                                                            <h5 className="d-flex justify-content-between">Invite Recieved <span className="fw-normal text-secondary" style={{ fontSize: '0.95rem' }}><MomentTime time={ele.create_at} format={'YYYY/MM/DD, hh:mm'} /></span></h5>
                                                            <p>You have received a new XIRCLS invite from {ele.sent_rq_outlet.outlet_name}</p>
                                                            <hr />
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <div className="d-flex align-items-center">
                                                                    <a href={'#'}><img src={`${ownUrl}${ele.sent_rq_outlet.outlet_logo}`} className="rounded-pill" width={50} style={{ aspectRatio: '1' }} alt="logo" /></a>
                                                                    <p className="mb-0 ms-2">{ele.sent_rq_outlet.outlet_name}</p>
                                                                </div>
                                                                <div className="d-flex gap-1">
                                                                    <button className="btn btn-sm btn-success" onClick={() => newtworkAlerts('ACCEPT_PARTNER', ele?.sent_rq_outlet?.id, "Request Accepted")}>Accept</button>
                                                                    <button className="btn btn-sm btn-danger" onClick={() => newtworkAlerts('REMOVE_PARTNER', ele?.sent_rq_outlet?.id, "Request Rejected")}>Reject</button>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    )
                                                }) : <h6>No Requests Recieved Yet</h6>
                                                }
                                            </ul>
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tabId={3}>
                                    <Row>
                                        <Col md={12} style={{ maxHeight: '65vh', overflow: 'scroll' }}>
                                            {data.partner_details?.length !== 0 ? data.partner_details?.map((ele, key) => {
                                                return (
                                                    <Row key={key} className={`align-items-center ${key === 0 ? 'border-top  border-bottom' : 'border-bottom'} py-1`}>
                                                        <Col xs={3} className='text-center'>
                                                            <img width={'150px'} style={{ aspectRatio: '1' }} className='rounded-pill border' src={`${ownUrl}${ele?.outlet_logo}`} alt="" />
                                                        </Col>
                                                        <Col xs={6} className='text-center'>
                                                            <a href="#" className="text-primary fs-5">{ele.outlet_name}</a>
                                                        </Col>
                                                        <Col xs={3} className='text-center'><button className="btn text-danger fs-5" onClick={() => newtworkAlerts('REMOVE_PARTNER', ele?.id, "Partner Removed")}>REMOVE</button></Col>
                                                    </Row>
                                                )
                                            }) : <h6>No Partners To Manage</h6>
                                            }
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tabId={4}>
                                    {data.invite_outlet?.length !== 0 ? <div style={{ maxHeight: '65vh', overflowY: 'scroll', position: 'relative' }}>
                                        <Table bordered>
                                            <thead style={{ position: 'sticky', top: '0px' }} >
                                                <tr>
                                                    <th className='text-center'>
                                                        Email
                                                    </th>
                                                    <th className='text-center'>
                                                        Date
                                                    </th>
                                                    <th className='text-center'>
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.invite_outlet?.map((ele, key) => {
                                                    return (
                                                        <tr key={key}>
                                                            <td className="text-center">
                                                                {ele.req_email}
                                                            </td>
                                                            <td className="text-center">
                                                                <MomentTime time={ele.outlet.created_at} format={'YYYY-MM-D'} />
                                                            </td>
                                                            <td className="text-center">
                                                                @mdo
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </Table>
                                    </div> : <div className="d-flex flex-column justify-content-start align-items-center">
                                        <h3>No Businesses Invited yet.</h3>
                                        <p>Get started and Invite a Business</p>
                                        <Link to="/merchant/xircls/create-network/" className="btn btn-primary waves-effect waves-float waves-light">Invite a Business</Link>
                                    </div>}
                                </TabPane>
                                <TabPane tabId={5}>
                                    {data.block_outlet?.length !== 0 ? <div style={{ maxHeight: '65vh', overflowY: 'scroll', position: 'relative' }}>
                                        <Table bordered>
                                            <thead style={{ position: 'sticky', top: '0px' }} >
                                                <tr>
                                                    <th className='text-center'>
                                                        Outlet name
                                                    </th>
                                                    <th className='text-center'>
                                                        Outlet category
                                                    </th>
                                                    <th className='text-center'>
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.block_outlet?.map((ele, key) => {
                                                    return (
                                                        <tr key={key}>
                                                            <td className="text-center">
                                                                {ele.block_outlet.outlet_name}
                                                            </td>
                                                            <td className="text-center">
                                                                {ele.block_outlet.outlet_name}
                                                            </td>
                                                            <td className="text-center">
                                                                <a href="#">Unblock</a>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </Table>
                                    </div> : <div className="d-flex flex-column justify-content-start align-items-center">
                                        <h3>No Businesses Invited yet.</h3>
                                        <p>Get started and Invite a Business</p>
                                        <Link to="/merchant/xircls/create-network/" className="btn btn-primary waves-effect waves-float waves-light">Invite a Business</Link>
                                    </div>}
                                </TabPane>
                            </TabContent>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div >
    )
}

export default NetworkDashboard