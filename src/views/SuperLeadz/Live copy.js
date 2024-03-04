import React, { useEffect, useState } from 'react'
import { MapPin } from 'react-feather'
import { getCurrentOutlet } from '../Validator'

const LiveUpdates = () => {

    const [showData, setShowData] = useState([])

    const [sideBarData, setSideBarData] = useState([])

    const [activeIndex, setActiveIndex] = useState(0)

    const [total, setTotal] = useState(0)
    const [verified, setVerified] = useState(0)
    const outletData = getCurrentOutlet()

    function getUpdates() {
        const formData = new FormData()
        formData.append("shop", outletData[0]?.web_url)
        formData.append("app_name", 'superleadz')
        const updateUrl = new URL(`https://api.xircls.com/api/v1/add/customer_visit/?shop=${outletData[0]?.web_url}&app_name=superleadz`)
        fetch(updateUrl)
        .then((resp) => resp.json())
        .then((data) => {
            console.log("data is the", data)

            setTotal(data.total_leads)
            setVerified(data.verified_leads)

            const subArray = new Array()
            let showIndex
            data?.status?.map((ele, index) => {
                if (index === 0 || subArray.some(item => item.ip_address !== ele.ip_address)) {
                    subArray.push({ ip_address: ele.ip_address, browser_details: JSON.parse(ele.browser_details.replaceAll(`'`, `"`).replaceAll('False', false).replaceAll('True', true)), activities: [{ created_at: ele.created_at, current_page: ele.current_page }] })
                    showIndex = index
                } else if (subArray.some(item => item.ip_address === ele.ip_address)) {
                    subArray[showIndex].activities.push({ created_at: ele.created_at, current_page: ele.current_page })
                }
            })
            setSideBarData([...subArray[0]?.activities])
            setShowData(subArray)
        })
    }

    console.log(total, verified)

    useEffect(() => {
        getUpdates()
        const interval = setInterval(() => {
            getUpdates()
        }, 300000)
        return () => clearInterval(interval)
    }, [])

    // useEffect(() => {
    //     getUpdates()
    // }, [])
    return (
        <>
            <div className="main_content">
                <div className="xircls_content m-0 p-0" style={{ minWidth: '100%' }}>
                    <div className="container-fluid">
                        <div className="row border-bottom">
                            <div className="col-12">
                                <div className='mt-2' style={{ height: `100%`, display: `flex`, justifyContent: `start`, alignItems: `center`}}>
                                    <h3 className="fw-bolder" style={{ fontSize: '1.35rem' }}>Live</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    {showData?.length >= 1 ? <div className="container-fluid px-0">
                        <div className='row'>

                            {/* Left Column Container */}
                            <div className="col-md-6 border-end">
                                <div className="container-fluid">
                                    <div className="row position-relative px-2 mt-3" style={{ maxHeight: '90vh', overflow: 'auto' }}>

                                        {/* Loop this column */}
                                        {showData?.map((ele, key) => {
                                            return (
                                                <div key={key} onClick={() => {
                                                    setSideBarData([...ele.activities])
                                                    setActiveIndex(key)
                                                }} className={`col-12 rounded-3 py-4 px-3 border-bottom d-flex align-items-center live-users-list ${activeIndex === key ? "active-user" : ""}`} style={{ cursor: 'pointer' }}>
                                                    <div className="position-relative">
                                                        <img style={{ aspectRatio: '1' }} width={'40px'} className='rounded-pill' src="https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg" alt="" />
                                                        {ele.browser_details.country && <span style={{ inset: 'auto auto -5px -5px' }} className='position-absolute'><img src={`https://app.wigzo.com/assets/img/flags/${ele.browser_details.country}.png`} alt="" /></span>}
                                                    </div>
                                                    <div className='ps-4 flex-grow-1'>
                                                        <p className='mb-2' style={{ fontSize: '15px', fontWeight: 'bolder', color: '#464646' }}>{window.btoa(window.btoa(ele.ip_address.replaceAll("1", key)))}</p>
                                                        <p style={{ fontSize: '12.5px', visibility: (ele.browser_details.city || ele.browser_details.country_name) ? "visible" : "hidden" }} className='d-flex align-items-center gap-2 text-secondary'>
                                                            <MapPin size={12.5} />{ele.browser_details.city && `${ele.browser_details.city},`} {ele.browser_details.country_name}</p>
                                                    </div>
                                                    <div className='d-flex flex-column align-items-end justify-content-center'>
                                                        {/* <span className='text-secondary mb-2' style={{ fontWeight: 'lighter', fontSize: '12.5px' }}>15 minutes ago</span> */}
                                                        <div className="d-flex gap-1">
                                                            <img width={'15px'} src="https://upload.wikimedia.org/wikipedia/commons/8/87/Google_Chrome_icon_%282011%29.png" alt="" />
                                                            <img width={'15px'} src="https://w7.pngwing.com/pngs/708/433/png-transparent-android-computer-icons-android-logo-grass-android.png" alt="" />
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column Container */}
                            <div className="col-md-6 px-0">
                                <div className="container-fluid">
                                    <div className="row border-bottom">
                                        <div className="col-sm-4 py-3 border-end">
                                            <div className='d-flex flex-column justify-content-center align-items-center gap-3'>
                                                <span style={{ fontSize: '30px' }}>{showData?.length}</span>
                                                <span>Total Visitors</span>
                                            </div>
                                        </div>
                                        <div className="col-sm-4 py-3 border-end">
                                            <div className='d-flex flex-column justify-content-center align-items-center gap-3'>
                                                <span style={{ fontSize: '30px' }}>{total}</span>
                                                <span>Total Leads</span>
                                            </div>
                                        </div>
                                        <div className="col-sm-4 py-3 border-end">
                                            <div className='d-flex flex-column justify-content-center align-items-center gap-3'>
                                                <span style={{ fontSize: '30px' }}>{verified}</span>
                                                <span>Verified Leads</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="col-12 my-4"><h3 className='mb-0'>Activities</h3></div>
                                        </div>
                                    </div>
                                    <div className="row scroll-custom" style={{ maxHeight: '75vh', overflowY: 'scroll' }}>
                                        {sideBarData?.map((ele, key) => {
                                            return (
                                                <div key={key} className="col-12 live-users-list py-3">
                                                    Visited <span className="text-dark fw-bolder">{ele.current_page === "/" ? "home page" : ele.current_page}</span> at <span className="fw-bolder">{ele.created_at}</span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> : (
                        <div className='text-center p-5'>No Visitors Found</div>
                    )}
                </div>
            </div>
        </>
    )
}

export default LiveUpdates