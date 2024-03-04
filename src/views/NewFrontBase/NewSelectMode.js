import React, { useState } from "react"
import { Monitor, ShoppingCart } from "react-feather"
import { useNavigate } from "react-router-dom"
import { Container, Row, Col } from "reactstrap"
import './NewFrontBase.css'
import { postReq } from "../../assets/auth/jwtService"
import toast from "react-hot-toast"
// import { postReq } from "../../assets/auth/jwtService"


const NewSelectMode = () => {
    const navigate = useNavigate()
    const [mode, setMode] = useState("online")

    const getSelectedCardStyle = (currentMode) => {
        const commonStyles = 'rounded-3 h-100 w-100 d-flex flex-column gap-2 justify-content-center align-items-center'
        return mode === currentMode ? `back-black ${commonStyles}` : `bg-light color-black ${commonStyles}`
    }

    const selectOutletType = () => {
        if (mode === "offline") {
            toast.success('Offline coming soon')
            navigate('/select_product/')
        } else {
            const form_data = new FormData()
            form_data.append('outlet_type', mode)
            postReq('outletType', form_data)
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                  toast.success('SuccessFully Saved')
                  navigate('/select_product/')
                }
              })
              .catch((err) => {
                toast.error('Something went wrong!')
                console.log(err)
              })

        }
    }

    return (
        <div>
            <Container fluid>
                <Row className="w-100 px-2">
                    <Col xs={2}>
                        <img className="py-2" width={'70%'} src="https://api.xircls.com/static/images/website-slide/logo-dark2.png" alt="Logo" />
                    </Col>
                    <div className="w-100"></div>
                    <Col xs={4} className='d-flex gap-2 px-2'>
                        <div className="bg-dark w-100 rounded-pill" style={{ padding: '0.25rem' }}></div>
                        <div className="bg-light-secondary w-100 rounded-pill" style={{ padding: '0.25rem' }}></div>
                        <div className="bg-light-secondary w-100 rounded-pill" style={{ padding: '0.25rem' }}></div>
                        
                    </Col>
                    <div className="w-100"></div>
                    <Col className="text-black px-2 py-1">Step 01/ <span className="text-secondary">03</span></Col>
                </Row>
                <Row className="match-height px-2" style={{ transition: '0.3s ease' }}>
                    <Col lg={6} style={{ height: 500 }} className='d-flex flex-column justify-content-between'>
                        <div>
                            <h1 className="text-black mb-2 main-headerText">What's your mode of business?</h1>
                            
                            <div className="rounded-3 p-2" style={{ backgroundColor: '#f3f3f3' }}>
                                <div className='new-hero rounded-3 d-flex flex-row gap-2 d-flex gap-2 justify-content-between align-items-center' style={{ height: 170, overflow: 'visible' }}>
                                    <div style={{ boxShadow: '3px 3px 7.5px rgba(0,0,0,0.5)' }} onClick={() => setMode("online")} className={` ${getSelectedCardStyle('online')} cursor-pointer`}>
                                        <div id="online-icon">
                                            <Monitor size={35} />
                                        </div>
                                        <p className="fs-3 fw-bold">Online</p>
                                    </div>
                                    <div style={{ boxShadow: '3px 3px 7.5px rgba(0,0,0,0.5)' }} onClick={() => setMode("offline")} className={` ${getSelectedCardStyle('offline')} cursor-pointer`}>
                                        <div id="offline-icon">
                                            <ShoppingCart size={35} />
                                        </div>
                                        <p className="fs-3 fw-bold">Offline</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-end px-2">
                            <button onClick={() => {
                                navigate('/merchant/login/')
                            }} className="btn text-black">Back</button>
                            <button onClick={() => {
                                selectOutletType()
                            }} style={{ backgroundColor: 'black' }} className="btn px-3 text-white rounded-pill waves-effect waves-float waves-light">Save & Next</button>
                        </div>
                    </Col>
                    <Col lg={6} style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/020/598/535/large_2x/data-analytics-dashboard-and-business-finance-report-concept-with-people-character-outline-design-style-minimal-illustration-for-landing-page-web-banner-infographics-hero-images-vector.jpg')", backgroundSize: '100%', backgroundPosition: 'center' }}>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default NewSelectMode