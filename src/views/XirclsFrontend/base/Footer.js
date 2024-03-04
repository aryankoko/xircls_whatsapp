import React from "react"
import { Link } from "react-router-dom"
import { Container, Row, Col } from "reactstrap"
import logoDark from "./assets/logo-dark.png"
import shopifyLogo from '@src/assets/images/logo/shopify-logo.png'
import wooCommerceLogo from '@src/assets/images/logo/WooCommerce_logo.png'
import magentoLogo from '@src/assets/images/logo/magento-logo.png'
import ind from './assets/ind.png'
import us from './assets/us.png'
import email from './assets/email.png'
// import { faInstagram, faLinkedin, faTwitter, faYoutube, faFacebookSquare } from "@fortawesome/free-brands-svg-icons"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Footer = () => {

    return (
        <div className="products">
            <Container fluid className="back-dark">
                <Container className="py-3 ">
                    <Row className="footer-color mb-1">
                        <Col md={4}>
                            <Row>
                                <Col md={12}>
                                    <Link to="/" >
                                        <img src={logoDark} height={80} alt="" />
                                        <br />
                                    </Link>
                                    <p className="mt-2 mb-1 eigth-font-footer lh-md-small">The World's First Decentralized Collaborative <br /> Marketing Network </p>
                                </Col >
                                <Col md={12}>
                                    <div className="ninth-font text-white mb-1">
                                        XIRCLS is a registered trademark of ALTISSADVANCE TECH PVT. LTD.
                                    </div>
                                </Col>
                                <Col md={12} className="mb-1 eighth-font-footer">
                                    <strong className="sixth-font-nav">HQ</strong> <br />
                                    C-9/10, 3rd floor, Govardhan Baug, <br />
                                    Manmala Tank Road, Matunga West, <br /> Mumbai - 400016
                                </Col >

                                <Col md={12} className="mb-1 eighth-font-footer">
                                    <strong className="sixth-font-nav">Registered Address</strong> <br />
                                    Mahim House, Chhatrapati Shivaji Maharaj Marg, <br /> 
                                    New Mogal Lane, <br /> 
                                    Mahim, Mumbai - 400016
                                </Col >

                                <Col md={12}>
                                    <img className="me-1" src={ind} width={20} alt="" />
                                    +91 9969 333 666 <br />
                                    <img className="me-1" src={us} width={20} alt="" />
                                    +1 (936) 333 6363 <br />
                                    <img className="me-1" src={email} alt="" width={20} />
                                    info@xircls.com
                                </Col >
                            </Row>
                        </Col>
                        <Col md={4}>
                            <Row>
                                <Col md={12} className="mb-1">
                                    <p className="text-blue sixth-font-blog mb-0 p-padding">Products</p>
                                    <hr className="text-blue w-75 mt-0" />
                                    <p style={{fontSize: '15px'}}>
                                        <Link style={{color: 'white'}} to='/products/infiniti/customer-acquisition-and-loyalty'>
                                            Infiniti
                                        </Link>
                                    </p>
                                    <p style={{fontSize: '15px'}}>
                                        <Link style={{color: 'white'}} to='/products/semperfi/customer-loyalty'>
                                            Semper Fi
                                        </Link>
                                    </p>
                                    <p style={{fontSize: '15px'}}>
                                        <Link style={{color: 'white'}} to='/products/sniper/customer-acquisition'>
                                            Sniper
                                        </Link>
                                    </p>
                                </Col>
                                <Col md={12}>
                                    {/* <Link to='/careers/'>
                                    <p className="text-blue sixth-font-blog mb-0 p-padding">Careers</p>
                                    <hr className="text-blue w-75 mt-0" />
                                    </Link>
                                    <br />

                                    <Link to='/channel-partners/partners-form/'>
                                    <p className="text-blue sixth-font-blog mb-0 p-padding">Channel Partners</p>
                                    <hr className="text-blue w-75 mt-0" />
                                    </Link>
                                    <br /> */}

                                    <Link to='/contactus'>
                                    <p className="text-blue sixth-font-blog mb-0 p-padding">Contact Us</p>
                                    <hr className="text-blue w-75 mt-0" />
                                    </Link>
                                </Col>
                                <Col md={12} className="mt-2">
                                    <Row>
                                        <Col md={3}>
                                            <img src={shopifyLogo} width={31} height={31} alt="" />
                                            <p>Shopify</p>
                                        </Col>
                                        <Col md={3}>
                                            <img src={wooCommerceLogo} width={31} height={35} alt="" />
                                            <p>Woo <br /> Commerce</p>
                                        </Col>
                                        <Col md={3}>
                                            <img src={magentoLogo} width={31} height={31} alt="" />
                                            <p>Magento</p>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={4}>
                            <Row>
                                <Col md={12} className="mb-1">
                                    <h2 className="text-white four-fifth-font m-0">4481020</h2>
                                    <span className="text-white seventh-font" style={{fontSize: "16px"}}>Real-Time Marketing Collaborations Enabled </span>
                                </Col>
                                <Col md={12} className="mb-1 mt-1">
                                    <h2 className="text-white four-fifth-font m-0">111</h2>
                                    <span className="text-white seventh-font" style={{fontSize: "16px"}}>Partner Companies </span>
                                </Col>
                                {/* <Col md={12} className="mt-1">
                                    <h2 className="text-white four-fifth-font m-0" style={{fontSize: "1.4rem"}}>Follow Us:</h2>
                                        <div className="entry-title mt-1">
                                            <div
                                                className="parent d-flex justify-content-start align-items-center text-white"
                                                style={{ gap: 18, marginLeft: 5, fontSize: "16px" }}
                                            >
                                            <a href="https://www.instagram.com/xircls/" target="_blank" className="social_icon">
                                                <FontAwesomeIcon icon={faInstagram} style={{ fontSize: 18 }} className="social_icon" />
                                            </a>
                                            <a href="https://www.linkedin.com/company/xircls/" target="_blank" className="social_icon">
                                                <FontAwesomeIcon icon={faLinkedin} style={{ fontSize: 18 }} className="social_icon" />
                                            </a>
                                            <a href="https://twitter.com/xircls/" target="_blank" className="social_icon">
                                                <FontAwesomeIcon icon={faTwitter} style={{ fontSize: 18 }} className="social_icon" />
                                            </a>
                                            <a href="https://www.facebook.com/XIRCLS/" target="_blank" className="social_icon">
                                                <FontAwesomeIcon icon={faFacebookSquare} style={{ fontSize: 18 }} className="social_icon" />
                                            </a>
                                            <a href="https://youtube.com/@XIRCLS" target="_blank" className="social_icon">
                                                <FontAwesomeIcon icon={faYoutube} style={{ fontSize: 18 }} className="social_icon" />
                                            </a>
                                        </div>
                                    </div>
                                </Col> */}
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        
                        <Col md={4} className='ninth-font text-center'>
                            Copyright © 2022 All Rights Reserved. AltissAdvance Tech Private <br /> Limited
                            <div className="d-flex justify-content-center">
                                <Link to="/terms-of-use/" className="a-color">Terms Of Use</Link>
                                <Link to="/privacy-policy/" className="mx-1 a-color">Privacy Policy</Link>
                                {/* <Link to="/employee-login/" className="a-color">Employee Login</Link> */}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </div>
    )
}

export default Footer