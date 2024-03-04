import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import Footer from './base/Footer'

const InfluencerWaitlist = () => {
  return (
    <>
    <div className="container-fuild products">
        <Container>
            <Row>
                <Col md={8}>
                    <div className="mt-2 px-2">
                        <Row>
                        <h1 style={{ fontFamily: 'source sans pro', color: "#464646" }}>Take your <span style={{ color: '#593ffb' }}>Influence Game</span> to the Next Level.</h1>
                        </Row>
                        <Row>
                        <h3 className='my-2' style={{ fontStyle: 'italic', fontSize: '29px', lineHeight: '1', fontFamily: 'source sans pro', color: "#464646" }}>Join our all-star roster of influencers and collaborate with companies of YOUR choice.</h3>
                        </Row>
                        <Row>
                        <h4 className='my-1' style={{ fontSize: "20px", color: "#464646" }}>Monetise your Impact with Content that Speaks - to You and Your Audience. No more scripted promos and compromise - unleash your authentic self and let your creativity shine.</h4>
                        </Row>
                    </div>
                </Col>
                <Col md={4}>
                    <div className="d-flex justify-content-center ps-1">
                        <img src="https://api.xircls.com/static/images/website-slide/Influencer_page_pic.png" alt="Image" width={'100%'} />
                    </div>
                </Col>
            </Row>
            <div className="px-2 mt-3 mb-5 pb-5">
                <Row>
                <Col xs={4}>
                    <div style={{ fontSize: "20px", color: "#464646", borderRight: "1px solid #464646" }}>
                        <h5 className='text-wrap'>Collaborate with top merchants and brands of YOUR choice</h5>
                    </div>
                </Col>
                <Col xs={4}>
                    <div style={{ fontSize: "20px", color: "#464646", borderRight: "1px solid #464646" }}>
                        <h5 className='text-wrap'>Freedom to create authentic content that aligns with your personal brand</h5>
                    </div>
                </Col>
                <Col xs={4}>
                    <div style={{ fontSize: "20px", color: "#464646" }}>
                        <h5 className='text-wrap'>Boost your revenue potential with lucrative commissions from creative partnerships</h5>
                    </div>
                </Col>
                </Row>
            </div>
        </Container >
      
        <div style={{ backgroundColor: "#f3f2fd" }}>
            <div className="container py-5 mb-5">
                <Row className='text-center'>
                    <p style={{ fontFamily: 'source sans pro', fontSize: "23px", color: "#464646" }}><span className='text-decoration-underline'>Real is the new Viral</span>. Let's Talk!</p>
                </Row>
                <Row className='text-center'>
                    <p className='display-5' style={{ color: "#464646" }}>Join the <span style={{ color: "#593ffb" }}>Waitlist Now.</span></p>
                </Row>
                <Col md={6} className='offset-md-3'>
                    <Row className="mb-2 mt-2">
                        <Col md="6">
                            <div className="form-group">
                                <label className='fs-4'>First Name</label>
                                <input type="text" className="form-input" id="fname" style={{backgroundColor: 'transparent'}} />
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="form-group">
                                <label className='fs-4'>Last Name</label>
                                <input type="text" className="form-input" id="lname" style={{backgroundColor: 'transparent'}} />
                            </div>
                        </Col>
                    </Row>
                    <Row className="mb-2 mt-2">
                        <div className='col'>
                            <div className="form-group">
                            <label className='fs-4'>Email</label>
                            <input type="email" className="form-input" id="email" style={{backgroundColor: 'transparent'}} />
                            </div>
                        </div>
                    </Row>
                    <Row className="mb-2 mt-2">
                        <div className='col'>
                            <div className="form-group">
                            <label className='fs-4'>Country</label>
                            <select className="form-select" type="search" style={{backgroundColor: 'transparent'}}>
                                <option selected value="india">India</option>
                                <option value="afghanistan">Afghanistan</option>
                                <option value="austria">Austria</option>
                            </select>
                            </div>
                        </div>
                    </Row>
                    <Row className="mb-2 mt-2">
                        <div className='col'>
                            <div className="form-group">
                            <label className='fs-4'>Mobile Number</label>
                            <input type="number" className="form-input" id='numb' style={{backgroundColor: 'transparent'}} />
                            </div>
                        </div>
                    </Row>
                    <Row className="mb-2 mt-2">
                        <div className='col'>
                            <div className="form-group">
                            <label className='fs-4'>Category</label>
                            <input type="text" className="form-input" id='category' style={{backgroundColor: 'transparent'}} />
                            </div>
                        </div>
                    </Row>
                </Col>
                <div className='d-flex justify-content-center align-items-center m-2'>
                    <button className='btn' style={{ backgroundColor: '#f84873', color: 'white', borderRadius: '100px', padding: '10px 35px', lineHeight: '24px', letterSpacing: '1px', fontSize: '15px' }}>SUBMIT</button>
                </div>
            </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default InfluencerWaitlist