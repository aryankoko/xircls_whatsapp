import React, { useEffect, useState } from 'react'
import { MapPin, Search, RefreshCcw } from 'react-feather'
import { Card, CardBody, Col, Row } from 'reactstrap'
import Spinner from '../Components/DataTable/Spinner'
import MomentTime from '../Components/Time-Moment/MomentTime'
import SlUsersAnalytics from "./SlUsersAnalytics"
import moment from 'moment/moment'
import axios from 'axios'
import { getCurrentOutlet } from '../Validator'
import { SuperLeadzBaseURL } from '../../assets/auth/jwtService'
import { MdOutlineRefresh } from "react-icons/md"
import worker from './app.worker'
import WebWorker from './WebWorker'

// import moment from 'moment/moment'

const LiveUpdates = () => {
    const webWorker = new WebWorker(worker)
    const [showData, setShowData] = useState([])

    const [sideBarData, setSideBarData] = useState([])

    const [activeIndex, setActiveIndex] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [total, setTotal] = useState(0)
    const [verified, setVerified] = useState(0)
    const [dateRange, setDateRange] = useState("")
    const [cardDataObj, setCardDataObj] = useState({})
    const outletData = getCurrentOutlet()
    const [lineGraphLive, setLineGraphLive] = useState([])

    // dateRange.map(date => console.log(moment(date).format('MMMM Do YYYY, h:mm:ss a')))

    console.log("dateRange", Array.isArray(dateRange) ? dateRange.map(date => moment(date).format('YYYY-MM-DD')) : "")


    // dateRange.map((date) => {
    //     console.log(moment(date).format('MMMM Do YYYY, h:mm:ss a'))
    // })

    const getGraphData = (start_date, end_date) => {
        const dataIs = {
            app: "superleadz",
            shop: outletData[0]?.web_url,
            start_date,
            end_date
        }
        const formData = new FormData()
        Object.entries(dataIs).map(([key, value]) => {
            formData.append(key, value)
        })
        const updateUrl = new URL(`${SuperLeadzBaseURL}/api/v1/customer_visitor_data/`)
        axios({
            method: "POST",
            url: updateUrl,
            data: formData
        })
            .then(data => {
                setLineGraphLive(data.data.active_users)
            })
            .catch(err => console.log(err))
    }

    const TimelineItem = ({ item }) => {
        return (

            <div className="live-users-list mb-2 d-flex justify-content-center align-items-center gap-2" style={{ marginLeft: "30px" }}>

                <div className="col-md-2 col-3 ">
                    <div className="fw-bolder "><MomentTime time={item.created_at} format={'h:mm:ss a'} /></div>
                </div>
                <div className="col-md-10 col-9 margin-leftback">
                    <div className='d-flex justify-content-start align-items-center'>
                        <div style={{ height: "10px", width: "10px", backgroundColor: "#fbcd0c", marginRight: "5px", borderRadius: "50%" }}></div>Visited &nbsp;<a target='_blank' href={`https://${outletData[0]?.web_url}${item.current_page}`} className="text-dark fw-bolder">{item.current_page === "/" ? "home page" : item.current_page}</a>
                    </div>
                </div>

            </div>
        )
    }

    // Organize data into an object with dates as keys and arrays of items as values
    const dataByDate = sideBarData.reduce((acc, item) => {
        const date = item.created_at.split('T')[0] // Extract date from the created_at property
        if (!acc[date]) {
            acc[date] = []
        }
        acc[date].push(item)
        return acc
    }, {})


    function getUpdates() {
        setIsLoading(true)
        const formData = new FormData()
        formData.append("shop", outletData[0]?.web_url)
        formData.append("app_name", 'superleadz')
        const updateUrl = new URL(`${SuperLeadzBaseURL}/api/v1/add/customer_visit/?shop=${outletData[0]?.web_url}&app_name=superleadz`)
        fetch(updateUrl)
            .then((resp) => resp.json())
            .then((data) => {
                console.log("data is", data)
                setTotal(data?.total_leads)
                setVerified(data?.verified_leads)
                setIsLoading(false)
                // const subArray = new Array()
                // const refArray = new Array()
                // data?.status?.map((ele) => {
                //     try {
                //         if (!refArray.includes(ele.ip_address)) {
                //             subArray.push({ ip_address: ele.ip_address, visitor_type: ele.visitor_type, browser_details: JSON.parse(JSON.stringify(ele.browser_details)), activities: [{ created_at: ele.created_at, current_page: ele.current_page }], source: ele?.source })
                //             refArray.push(ele.ip_address)
                //             // refArray.push(ele.visitor_type)
                //         } else {
                //             subArray[refArray.indexOf(ele.ip_address)].activities.push({ created_at: ele.created_at, current_page: ele.current_page })
                //         }
                //         setSideBarData([...subArray[0]?.activities])

                //     } catch (error) {
                //         console.log(error, "Error in browser Details", ele?.id)
                //     }
                // })
                // console.log(subArray, "asd")
                // setShowData(subArray)
                webWorker.postMessage({ data })
                webWorker.addEventListener('message', (event) => {
                    const subArray = event.data?.subArray
                    const activity = event.data?.activity
                    // const dataByDate = event.data?.dataByDate
                    setShowData(subArray)
                    setSideBarData([...activity])
                    // setDataByDate(dataByDate)
                })
            })
            .catch((error) => {
                console.log(error)
                setIsLoading(false)
            })

        const cardUrl = new URL(`${SuperLeadzBaseURL}/api/v1/customer_visit_all_reports/?shop=${outletData[0]?.web_url}&app=superleadz`)

        axios({
            method: "GET",
            url: cardUrl
        })
            .then((data) => {
                console.log("reports", data)
                if (data && data.data) {
                    setCardDataObj({ ...data.data })
                }
                setIsLoading(false)
            })
    }

    console.log(total, verified)

    useEffect(() => {
        getUpdates()
        setDateRange(`${moment(new Date).subtract(7, 'd').format("YYYY-MM-DD")} - ${moment(new Date).format("YYYY-MM-DD")}`)
        const interval = setInterval(() => {
            getUpdates()
        }, 300000)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        if (Array.isArray(dateRange)) {
            getGraphData(moment(dateRange[0]).format('YYYY-MM-DD'), moment(dateRange[1]).format('YYYY-MM-DD'))
        }
    }, [dateRange])

    console.log(sideBarData)
    return (
        <>
            <style>
                {
                    `   
                    .activeuser{
                        border:solid 3px;
                        border-color:#fbcd0c;
                    }
                        .timeline .timeline-item:last-of-type:after {
                            background: linear-gradient(#fbcd0c, transparent) !important;
                        }
                        /* For Webkit-based browsers (Chrome, Safari and Opera) */
                        .scrollbar-hide::-webkit-scrollbar {
                        display: none;
                        }
                        
                        /* For IE, Edge and Firefox */
                        .scrollbar-hide {
                        -ms-overflow-style: none;  /* IE and Edge */
                        scrollbar-width: none;  /* Firefox */
                        }

                        .margin-leftback{
                            margin-left: -30px
                        }

                        @media screen and (max-width:900px){
                            .margin-leftback{
                                margin-left: 10px
                            }
                        }
                    `
                }
            </style>
            {/* <Card>
                <CardBody>
                    <h4>Live</h4>
                </CardBody>
            </Card> */}
            {<>
                <SlUsersAnalytics cardDataObj={cardDataObj} dateRange={dateRange} isLoading={isLoading} setDateRange={setDateRange} graphData={lineGraphLive} />

                {showData?.length > 0 ? <Row className='match-height'>
                    <Col md='6'>
                        <Card>
                            <CardBody>
                                <>
                                    <Row>
                                        <div className='d-flex justify-content-between'>
                                            <h4>Lead Activity</h4>
                                            <div style={{ cursor: "pointer" }} onClick={() => getUpdates()}><MdOutlineRefresh size='25px' /></div>
                                        </div>
                                    </Row>

                                    <hr />
                                    <div className="entries scrollbar-hide" style={{ maxHeight: '500px', overflow: 'auto' }}>
                                        {isLoading ? (
                                            <div className='d-flex justify-content-center align-items-center'><Spinner size='40px' /></div>
                                        ) : (
                                            showData?.map((ele, key) => (
                                                <div className={`parent d-flex justify-content-between align-items-center p-1 mb-1 cursor-pointer rounded ${activeIndex === key ? "activeuser" : ""}`} key={key} onClick={() => {
                                                    setSideBarData([...ele.activities])
                                                    setActiveIndex(key)
                                                }}>
                                                    <div className="image_div d-flex justify-content-between align-items-center gap-2 position-relative">
                                                        <div>
                                                            <img className='rounded-pill' width="50px" src="https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg" />
                                                            {ele.browser_details.country && <span style={{ inset: 'auto auto -5px -5px' }} className='position-absolute'><img src={`https://app.wigzo.com/assets/img/flags/${ele.browser_details.country}.png`} alt="" /></span>}
                                                        </div>
                                                        <h5 style={{ wordWrap: 'anywhere' }}>{window.btoa(window.btoa(ele.ip_address.replaceAll("1", key)))}</h5>
                                                    </div>
                                                    <div>
                                                        {ele.visitor_type === "Returning Visitor" ? (
                                                            <div>
                                                                <span className="badge bg-secondary">Returning Visitor</span>
                                                                
                                                            </div>
                                                        ) : ele.visitor_type === "First Visitor" ? (
                                                            <>
                                                                <span className="badge bg-secondary">First-Time Visitor</span>
                                                            </>
                                                        ) : ele.visitor_type === "Registered User" ? (
                                                            <>
                                                                <span className="badge bg-secondary">Registered User</span>
                                                            </>
                                                        ) : null}
                                                        {ele?.source && ele?.source !== "null" ? <>
                                                            <h5 className='mt-1 text-center'>
                                                                {ele?.source}
                                                            </h5>
                                                        </> : ''}
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md='6'><Card>
                        <CardBody>
                            <>
                                <h4 className='mb-2'>Activity Timeline</h4>
                                <hr />
                                <div className='mb-3 text-center d-none' style={{ justifyContent: "space-evenly", alignItems: "center" }}>
                                    <div>
                                        {/* added span for diffn */}
                                        <h4 style={{ fontWeight: "800" }}><span>0.22</span> Hrs</h4>
                                        <h4>Avg. Visit Duration</h4>
                                    </div>
                                    <div>
                                        <h4 style={{ fontWeight: "800" }}>2</h4>
                                        <h4>No. of Visits</h4>
                                    </div>
                                </div>
                                {
                                    isLoading ? (
                                        <div className='d-flex justify-content-center align-items-center'><Spinner size='40px' /></div>
                                    ) : (
                                        <Row className="scroll-custom scrollbar-hide" style={{ maxHeight: '500px', overflow: 'auto' }}>
                                            {Object.keys(dataByDate).map((date, index) => (
                                                <div key={index}>
                                                    <h4 className='mb-2'>{date}</h4>
                                                    <div className="row mb-3 ">
                                                        {dataByDate[date].map((item, key) => (
                                                            <TimelineItem key={key} item={item} />
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}

                                        </Row>
                                    )
                                }

                            </>

                        </CardBody>
                    </Card>

                    </Col>
                </Row> : <div className='d-flex justify-content-center align-items-center'><Spinner size='40px' /></div>}
            </>
            }
        </>
    )
}

export default LiveUpdates