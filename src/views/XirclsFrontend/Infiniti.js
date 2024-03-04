
import CheckCircle from 'react-feather/dist/icons/check-circle'
import { Container, Row, Col, Card, CardBody } from "reactstrap"
import infinitiLogo from "@src/assets/images/website-slide/home/xircls_Infiniti_logo1.jpg"
import Footer from './base/Footer'
import SignSection from '../../default_components/SignSection'
import acquisitionimg from '@src/assets/images/website-slide/infiniti/acquisitionimg.jpg'
import InfinitiLogocropped from '@src/assets/images/website-slide/infiniti/Infiniti-logocropped.jpg'
import retentionimg from '@src/assets/images/website-slide/infiniti/retentionimg.jpg'
import first from '@src/assets/images/website-slide/infiniti/01.jpg'
import second from '@src/assets/images/website-slide/infiniti/02.jpg'
import third from '@src/assets/images/website-slide/infiniti/03.jpg'
import fourth from '@src/assets/images/website-slide/infiniti/04.jpg'
import fivth from '@src/assets/images/website-slide/infiniti/05.jpg'
import sixth from '@src/assets/images/website-slide/infiniti/06.jpg'
import seventh from '@src/assets/images/website-slide/infiniti/07.jpg'
import eighth from '@src/assets/images/website-slide/infiniti/08.jpg'
import ninth from '@src/assets/images/website-slide/infiniti/09.jpg'
import tenth from '@src/assets/images/website-slide/infiniti/010.jpg'
import eleven from '@src/assets/images/website-slide/infiniti/011.jpg'
import twelve from '@src/assets/images/website-slide/infiniti/012.jpg'
import peer from '@src/assets/images/website-slide/infiniti/peer-to-peer.jpg'
import trust from '@src/assets/images/website-slide/infiniti/trustless.jpg'
import privatePublic from '@src/assets/images/website-slide/infiniti/public-private.jpg'
import { useEffect } from 'react'
import { affiliateTracking } from '../Validator'

const Infiniti = () => {

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        if (params.get('aft_no') || localStorage.getItem('aft_no')) {
            affiliateTracking(params.get('aft_no') ? params.get('aft_no') : localStorage.getItem('aft_no'))
        }
    }, [])

    return (
        <>
            <div className="products bg-white">
                <Container fluid>
                    <Row className='pt-2 mb-4'>
                        <Col md={9} className="text-center mx-auto">
                            <img src={infinitiLogo} className="page-logo" />
                            <h1 className="my-2 main-font text-black fw-bold">From<span className="text-blue"> First Purchase</span><br />to <span className="text-blue">Forever Loyal.</span></h1>
                        </Col>
                    </Row>
                    <Row className='py-md-5 my-md-5 px-md-5 match-height text-dark'>
                        <Col md={5} className="my-2 px-2 text-center justify-content-center align-items-center">
                            <img className="mb-2" width="90" height="90" src={acquisitionimg} />
                            <h3 className="mb-2 third-font text-dark">Customer Acquisition</h3>
                            <h5>Engage Customers of Partner Businesses <br/> Acquire Valuable Leads <br /> Raise Customer Lifetime Value</h5>
                            
                        </Col>
                        <Col md={2} className="my-2 d-flex justify-content-center align-items-center">
                            <img className="mb-2" width="83" src={InfinitiLogocropped} />
                        </Col>
                        <Col md={5} className="my-2 px-2 text-center justify-content-center align-items-center">
                            <img className="mb-2" width="90" height="90" src={retentionimg} />
                            <h3 className="mb-2 third-font text-dark">Customer Retention</h3>
                            <h5>Other businesses reward your customers <br /> for shopping with you. <span className="fst-italic">Instantly! <br /> No points to collect. No waiting for redemption.</span> </h5>
                            
                        </Col>
                    </Row>
                </Container>
                <Row>
                    <Col md={12} className='px-md-5 py-md-3'>
                        <Row>
                            <h2 className="text-center second-font mb-5 text-dark">Why Infiniti is Marketing 2.0</h2>
                        </Row>
                        <Row className='px-md-5'>
                            <Container className='px-md-5'>
                                <Row className="mx-auto px-md-5 py-2 my-5">
                                    <Col md={3} className="mb-2 d-flex align-items-center justify-content-center">
                                        <img width="150px" src={first} />
                                    </Col>
                                    <Col md={9} className="right-order px-md-5 d-flex flex-column justify-content-start lh-base">
                                        <h3 className="text-blue third-font mb-2">Instant Partnerships</h3>
                                        <h5 className="mb-0 fifth-font lh-base">Build & leverage your business relationships. Collaborate towards mutually profitable and precisely measurable goals.</h5>
                                    </Col>
                                </Row>
                                <Row className="mx-auto px-md-5 py-2 my-5">
                                    <Col md={3} className="right-order mb-2 d-flex align-items-center justify-content-center">
                                        <img width="150px" src={second} />
                                    </Col>
                                    <Col md={9} className="px-md-5 d-flex flex-column justify-content-start lh-base">
                                        <h3 className="text-blue third-font mb-2">Instant Delivery</h3>
                                        <h5 className="mb-0 fifth-font lh-base">Your marketing message is email-delivered by partner companies to their customers.</h5>
                                    </Col>
                                </Row>
                                <Row className="mx-auto px-md-5 py-2 my-5">
                                    <Col md={3} className="mb-2 d-flex align-items-center justify-content-center">
                                        <img width="150px" src={third} />
                                    </Col>
                                    <Col md={9} className="right-order px-md-5 d-flex flex-column justify-content-start lh-base">
                                        <h3 className="text-blue third-font mb-2">Real-Time Engagement</h3>
                                        <h5 className="mb-0 fifth-font lh-base">Reward potential customers making purchases in partner categories.</h5>
                                    </Col>
                                </Row>
                                <Row className="mx-auto px-md-5 py-2 my-5">
                                    <Col md={3} className="right-order mb-2 d-flex align-items-center justify-content-center">
                                        <img width="150px" src={fourth} />
                                    </Col>
                                    <Col md={9} className="px-md-5 d-flex flex-column justify-content-start lh-base">
                                        <h3 className="text-blue third-font mb-2">No-Cost Loyalty</h3>
                                        <h5 className="mb-0 fifth-font lh-base">Reward your customers with partner offers every single time they buy from you.</h5>
                                    </Col>
                                </Row>
                                <Row className="mx-auto px-md-5 py-2 my-5">
                                    <Col md={3} className="mb-2 d-flex align-items-center justify-content-center">
                                        <img width="150px" src={fivth} />
                                    </Col>
                                    <Col md={9} className="right-order px-md-5 d-flex flex-column justify-content-start lh-base">
                                        <h3 className="text-blue third-font mb-2">Instant Goodwill</h3>
                                        <h5 className="mb-0 fifth-font lh-base">Partner company recommendations create the perfect first impression for potential customers.</h5>
                                    </Col>
                                </Row>
                                <Row className="mx-auto px-md-5 py-2 my-5">
                                    <Col md={3} className="right-order mb-2 d-flex align-items-center justify-content-center">
                                        <img width="150px" src={sixth} />
                                    </Col>
                                    <Col md={9} className="px-md-5 d-flex flex-column justify-content-start lh-base">
                                        <h3 className="text-blue third-font mb-2">Precision Marketing</h3>
                                        <h5 className="mb-0 fifth-font lh-base">Stop wasting your money on assumption-based advertising. Instantly zero in on your ideal customer base.</h5>
                                    </Col>
                                </Row>
                            </Container>
                        </Row>
                    </Col>
                </Row>
                <Row className='px-md-3'>
                    <Col md={12} className="py-md-6 ">
                        <Container className="my-5 py-3 px-0 back-beige">
                            <Row>
                                <Col md={3} className='px-3 my-1'>
                                    <h3 className='second-font text-center text-blue'>140000+</h3>
                                    <p className='text-center fs-3 lh-base mb-0'>Real-Time <br /> Marketing <br />Collaborations <br />Enabled.</p>
                                </Col>
                                <Col md={3} className='px-3 my-1'>
                                    <h3 className='second-font text-center text-blue'>97000+</h3>
                                    <p className='text-center fs-3 lh-base mb-0'>Transactions <br />rewarded.</p>
                                </Col>
                                <Col md={3} className='px-3 my-1'>
                                    <h3 className='second-font text-center text-blue'>1250000+</h3>
                                    <p className='text-center fs-3 lh-base mb-0'>Value of offers <br />rewarded by <br />partners.</p>
                                </Col>
                                <Col md={3} className='px-3 my-1'>
                                    <h3 className='second-font text-center text-blue'>800+</h3>
                                    <p className='text-center fs-3 lh-base mb-0'>Customers<br /> successfully <br />retained.</p>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
                <Row className='py-5'>
                    <Container>
                        <h2 className="text-center second-font mb-2 text-dark">Your Affinity Partners Are Waiting!</h2>
                        <p className='text-center fs-3 text-dark'>Join the XIRCLS network and instantly partner with companies in these categories.</p>
                            
                        <Row className="text-center my-3 px-md-5">
                            <Col md={2} sm={6} className="text-center px-3 my-1">
                                <img src={seventh} className="my-2" alt="" width="50" />
                                <h5 className='fs-3'>Food &amp; Beverages</h5>
                            </Col>
                            <Col md={2} sm={6} className="text-center px-3 my-1">
                                <img src={eighth} className="my-2" alt="" width="50" />
                                <h5 className='fs-3'>Fashion &amp; Accessories</h5>
                            </Col>
                            <Col md={2} sm={6} className="text-center px-3 my-1">
                                <img src={ninth} className="my-2" alt="" width="50" />
                                <h5 className='fs-3'>Jewellery</h5>
                            </Col>
                            <Col md={2} sm={6} className="text-center px-3 my-1">
                                <img src={tenth} className="my-2" alt="" width="50" />
                                <h5 className='fs-3'>Health &amp; Wellness</h5>
                            </Col>
                            <Col md={2} sm={6} className="text-center px-3 my-1">
                                <img src={eleven} className="my-2" alt="" width="50" />
                                <h5 className='fs-3'>Makeup &amp; Beauty</h5>
                            </Col>
                            <Col md={2} sm={6} className="text-center px-3 my-1">
                                <img src={twelve} className="my-2" alt="" width="50" />
                                <h5 className='fs-3'>Kids</h5>
                            </Col>
                        </Row>
                    </Container>
                </Row>
                <Row className='p-5'>
                    <Col md={12} className="my-1 px-md-5 py-md-3">
                        <Container className="my-5 py-3 px-md-2 back-beige">
                            <Row>
                                <Col md={7} className='mx-auto'>
                                    <h2 className="text-center second-font mb-2 text-dark">Decentralized Marketing</h2>
                                    <p className='text-center fs-3 text-dark'>Revolutionary technology makes XIRCLS<br /> a truly democratic & decentralised marketing network<br /> run by businesses for businesses.</p>
                                </Col>
                            </Row>
                            <Row className='px-md-5 match-height'>
                                <Col md={4} className="mt-3 px-1 text-center">
                                    <Card>
                                        <CardBody className='px-3 py-5 d-flex flex-column align-items-center gap-1'>
                                            <img className="mb-2" width="76" src={peer} />
                                            <h4 className="mb-1 fs-2 text-blue">Peer-to-Peer</h4>
                                            <p className="mb-3 fs-3" style={{lineHeight: "25px"}}>Companies come together to achieve mutually beneficial marketing goals with no intermediaries.</p>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col md={4} className="mt-3 px-1 text-center">
                                    <Card>
                                        <CardBody className='px-3 py-5 d-flex flex-column align-items-center gap-1'>
                                            <img className="mb-2" width="76" src={trust} />
                                            <h4 className="mb-1 fs-2 text-blue">100% Trustless</h4>
                                            <p className="mb-3 fs-3" style={{lineHeight: "25px"}}>Every customer marketed to is verified in real-time by companies themselves, eliminating the compulsion to trust a third party with possibly vested interests.</p>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col md={4} className="mt-3 px-1 text-center">
                                    <Card>
                                        <CardBody className='px-3 py-5 d-flex flex-column align-items-center gap-1'>
                                            <img className="mb-2" width="76" src={privatePublic} />
                                            <h4 className="mb-1 fs-2 text-blue">Public, Yet Private</h4>
                                            <p className="mb-3 fs-3" style={{lineHeight: "25px"}}>No customer data is ever shared between companies while verifying and marketing to each other’s customers.</p>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
                <Row className='back-beige-light mt-3 pt-3 mb-5 pb-5'>
                    <Col md={6} className='d-flex align-items-center justify-content-center mb-3'>
                        <h3 className='third-font text-blue'>XIRCLS Campaigns Are:</h3>
                    </Col>
                    <Col md={6} className='text-dark ps-3'>
                        <p className='fs-3'><span className="text-blue me-3 my-1"><CheckCircle size={45} /></span>Easy to track</p>
                        <p className='fs-3'><span className="text-blue me-3 my-1"><CheckCircle size={45} /></span>ROI-focused</p>
                        <p className='fs-3'><span className="text-blue me-3 my-1"><CheckCircle size={45} /></span>Low risk</p>
                        <p className='fs-3'><span className="text-blue me-3 my-1"><CheckCircle size={45} /></span>Cross-Channel</p>
                        <p className='fs-3'><span className="text-blue me-3 my-1"><CheckCircle size={45} /></span>Quick to launch</p>
                        <p className='fs-3'><span className="text-blue me-3 my-1"><CheckCircle size={45} /></span>Fraud-Proof</p>
                        <p className='fs-3'><span className="text-blue me-3 my-1"><CheckCircle size={45} /></span>Optimization-friendly</p>
                        <p className='fs-3'><span className="text-blue me-3 my-1"><CheckCircle size={45} /></span>Budget-friendly</p>
                    </Col>
                </Row>
                <SignSection />
                <Footer />
            </div>
        </>
    )
}

export default Infiniti