import React, { useState } from "react"
import { Container, Row, Col } from "reactstrap"
import './NewFrontBase.css'
import Swipe from "../../default_components/ProductSlide"
import { useNavigate } from "react-router-dom"


const SelectProduct = () => {
    const [selectProduct, setSelectedProduct] = useState(1)
    const navigate = useNavigate()
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
                        <div className="bg-dark w-100 rounded-pill" style={{ padding: '0.25rem' }}></div>
                        <div className="bg-light-secondary w-100 rounded-pill" style={{ padding: '0.25rem' }}></div>
                        
                    </Col>
                    <div className="w-100"></div>
                    <Col className="text-black px-2 py-1">Step 02/ <span className="text-secondary">03</span></Col>
                </Row>
                <Row className="match-height px-2" style={{ transition: '0.3s ease' }}>
                    <Col lg={6} style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/020/598/535/large_2x/data-analytics-dashboard-and-business-finance-report-concept-with-people-character-outline-design-style-minimal-illustration-for-landing-page-web-banner-infographics-hero-images-vector.jpg')", backgroundSize: '100%', backgroundPosition: 'center' }}>
                    </Col>
                    <Col lg={6} className='d-flex flex-column justify-content-between'>
                        <div>
                            <h1 className="text-black mb-2 main-headerText">Select Product to Get Started</h1>
                            <Swipe selectProduct={selectProduct} setSelectedProduct={setSelectedProduct} />
                        </div>

                        <div className="text-end px-2">
                            <button onClick={() => {
                                navigate('/new_signup/new_mode/')
                            }} className="btn text-black">Back</button>
                            {/* <button onClick={() => {
                                navigate(`/plan_pricing/${selectProduct}`)
                            }} style={{ backgroundColor: 'black' }} className="btn px-3 text-white rounded-pill waves-effect waves-float waves-light">Save & Next</button> */}
                        </div>
                    </Col>
                    
                </Row>
            </Container>
        </div>
    )
}

export default SelectProduct