
import { Container, Row, Col } from "reactstrap"
import { Link } from 'react-router-dom'
import { Check, FileText, Heart, Power } from 'react-feather'
import Footer from "./base/Footer"
import SignSection from "../../default_components/SignSection"
import { useEffect } from "react"
import { affiliateTracking } from "../Validator"

const Sniper = () => {

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        if (params.get('aft_no') || localStorage.getItem('aft_no')) {
            affiliateTracking(params.get('aft_no') ? params.get('aft_no') : localStorage.getItem('aft_no'))
        }
    }, [])

    return (
        <>
            <div className="products bg-white">
                <Container>
                    <Row className='pt-2 mb-4 pb-3'>
                        <Col md={9} className="text-center mx-auto">
                            <img src="https://api.xircls.com/static/images/website-slide/Sniper-logo.jpg" className="page-logo" />
                            <h1 className="my-3 main-font text-black fw-bold"><span className="text-blue">Everyone's </span>Customers Are <br /><span className="text-blue">Now Yours!</span></h1>
                            <p className='third-font lh-base text-dark'>Precisely Reach Only Your Desired Audience.<br /> <span className="text-blue underline-2">While they shop</span>. Nobody Else.</p>
                        </Col>
                        <Col md={12} className="text-center my-1">
                            <Link to='/merchant/signup' className='btn fs-4 px-2 py-1 text-white button-1'>START A SNIPER CAMPAIGN</Link>
                        </Col>
                    </Row>
                    <Row className="py-md-5 my-md-5">
                        <Col md={12}>
                            <h2 className="text-center text-blue second-font mb-2">100% Genuine Customer Reach<br /> <span className="underline-2">Guaranteed!</span></h2>
                            <p className="text-center lh-base fifth-font text-dark">
                                Market to active shoppers, not anonymous users on the internet.
                            </p>
                        </Col>
                    </Row>
                    <Row className="py-md-5 my-md-5">
                        <Col md={10} className='mx-auto'>
                            <h2 className="text-center text-blue second-font mb-2">100% Verification. <span className="underline-2">0% Fraud</span></h2>
                            <p className="text-center lh-base fifth-font text-dark mb-0">
                                A model that eliminates the possibility of fraud or pilferage by middlemen.<br />
                                We guarantee your every marketing dollar is spent to reach a genuine human being,
                                verified in real time by your partners.
                            </p>
                        </Col>
                    </Row>
                    <Row className="py-md-5 my-md-5 back-beige-light">
                        <Col md={10} className='mx-auto'>
                            <h2 className="text-center text-blue second-font mb-2">Engage customers when they are <br />ready to buy.</h2>
                            <p className="text-center lh-base letter-spacing-1 text-dark mb-0 fourth-font">
                                Market your brand every time someone buys from a partner company.
                            </p>
                        </Col>
                        <Col md={12} className="text-center mt-4">
                            <Link to='/merchant/signup/' className='btn fs-4 px-2 py-1 text-white button-1'>JOIN THE NETWORK!</Link>
                        </Col>
                    </Row>
                    <Row className="py-md-5 my-md-5">
                        <Col md={10} className='mx-auto'>
                            <h2 className="text-center text-dark second-font mb-2">Become authentic in your marketing.</h2>
                            <h3 className="third-font text-center text-dark">Stay true to your brand and your customers.</h3>
                            <p className="text-center lh-base fifth-font text-dark mb-1">
                                Collaborate with companies that cater to the same audience as you.<br />Positively engage potential customers when they’re in the same state of mind as<br />your brand voice.
                            </p>
                            <p className="text-center lh-base fifth-font text-dark mb-0">
                                Be loyal to your brand’s vision by joining hands with companies that share that same vision.
                            </p>
                        </Col>
                    </Row>
                    <Row className='px-md-5'>
                        <Container className='px-md-5'>
                            <Row className="mx-auto px-md-5 py-md-5 my-5">
                                <Col md={3} className="mb-2 d-flex align-items-center justify-content-center">
                                    <img src="https://api.xircls.com/static/images/website-slide/sn1.jpg" alt="" title="" height="150px" />
                                </Col>
                                <Col md={9} className="right-order px-md-5 d-flex flex-column justify-content-start lh-base">
                                    <h3 className="text-blue third-font mb-2">Real-time matchmaking for businesses.</h3>
                                    <p className="mb-0 fifth-font lh-base">Our machine-learning, matchmaking algorithms track customer spending behaviour in real-time to trigger relevant partner offers.
                                        This ensures companies on our network effectively reach their target customer profile, every single time.</p>
                                </Col>
                            </Row>
                            <Row className="mx-auto px-md-5 py-md-5 my-5">
                                <Col md={3} className="right-order mb-2 d-flex align-items-center justify-content-center">
                                    <img width="150px" src='https://api.xircls.com/static/images/website-slide/sn2.jpg' />
                                </Col>
                                <Col md={9} className="px-md-5 d-flex flex-column justify-content-start lh-base">
                                    <h3 className="text-blue third-font mb-2">We make profiling and targeting customers easy.</h3>
                                    <p className="mb-0 fifth-font lh-base">Partner with companies to reach your target customer base.
                                        <br />100% guaranteed.</p>
                                </Col>
                            </Row>
                            <Row className="mx-auto px-md-5 py-md-5 my-5">
                                <Col md={3} className="mb-2 d-flex align-items-center justify-content-center">
                                    <img src="https://api.xircls.com/static/images/website-slide/sn3.jpg" alt="" title="" height="150px" />
                                </Col>
                                <Col md={9} className="right-order px-md-5 d-flex flex-column justify-content-start lh-base">
                                    <h3 className="text-blue third-font mb-2">Real-time matchmaking for businesses.</h3>
                                    <p className="mb-0 fifth-font lh-base">Get real-time performance reports. <br />Track the outcome of every marketing campaign. </p>
                                </Col>
                            </Row>
                        </Container>
                    </Row>
                    <Row className="pt-md-5 mt-md-5 px-md-5">
                        <Col md={12} className='px-md-4'>
                            <h2 className="text-center text-dark second-font mb-2 px-md-4">Market to customers when they’re most happy!</h2>
                            <p className="text-center lh-base text-dark fifth-font">
                                Fact: A shopper who has just completed a transaction is in the most receptive mind space.
                            </p>
                            <p className="text-center lh-base text-secondary fifth-font">
                                Not browsing, nor researching, or worrying, but ready to spend more.
                            </p>
                        </Col>
                    </Row>
                    <Row className="pb-md-5 mb-md-5 px-md-5 match-height">
                        <Col md={6} className='px-md-4 my-2 hover-div cursor-pointer'>
                            <Row>
                                <Col xs={3} className='right-order'>
                                    <div className='icon-hover rounded-circle me-md-auto'>
                                        <Heart size={30} />
                                    </div>
                                </Col>
                                <Col xs={9} className='ps-md-4'>
                                    <h4 className="fourth-font text-md-end text-blue text-uppercase">Tap into the ‘Retail Golden Hour’!</h4>
                                    <p className="text-md-end lh-base text-secondary sixth-font">
                                        Engage customers right in the middle of their post-purchase dopamine rush!
                                    </p>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={6} className='px-md-4 my-2 hover-div cursor-pointer'>
                            <Row className=''>
                                <Col xs={3}>
                                    <div className='icon-hover rounded-circle ms-md-auto'>
                                        <FileText size={30} />
                                    </div>
                                </Col>
                                <Col xs={9} className='right-order pe-md-4'>
                                    <h4 className="fourth-font text-start text-blue text-uppercase">Make them feel they’ve earned your offer.</h4>
                                    <p className="text-start lh-base text-secondary sixth-font">
                                        Deliver your marketing message right after the order confirmation email that they’re waiting to receive.
                                    </p>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={6} className='px-md-4 my-2 hover-div cursor-pointer'>
                            <Row>
                                <Col xs={3} className='right-order'>
                                    <div className='icon-hover rounded-circle me-md-auto'>
                                        <Power size={30} />
                                    </div>
                                </Col>
                                <Col xs={9} className='ps-md-4'>
                                    <h4 className="fourth-font text-md-end text-blue text-uppercase">Get personally recommended.</h4>
                                    <p className="text-md-end lh-base text-secondary sixth-font">
                                        Nothing can have a greater impact than being recommended by a company that the customer already trusts!
                                    </p>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={6} className='px-md-4 my-2 hover-div cursor-pointer'>
                            <Row>
                                <Col xs={3}>
                                    <div className='icon-hover rounded-circle ms-md-auto'>
                                        <Check size={30} />
                                    </div>
                                </Col>
                                <Col xs={9} className='right-order pe-md-4'>
                                    <h4 className="fourth-font text-start text-blue text-uppercase">Hit their inboxes when they’re sure to be looking.!</h4>
                                    <p className="text-start lh-base text-secondary sixth-font">
                                        Since customers receive your offer as a reward for their spend at another business, they’re more likely to redeem it.
                                    </p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className='px-md-5'>
                        <Col>
                            <Row className="mx-auto px-md-5 pt-md-5 mt-5">
                                <Col md={5} className="right-order mb-2 d-flex align-items-center justify-content-center">
                                    <img width="280px" src='https://api.xircls.com/static/images/website-slide/sn4.jpg' />
                                </Col>
                                <Col md={7} className="px-md-5 d-flex flex-column justify-content-start lh-base">
                                    <h3 className="text-blue second-font mb-2">Why Sniper is The <br />Smarter Choice.</h3>
                                    <ul className='text-dark sixth-font'>
                                        <li>No wasted expense on bots, fake accounts etc.</li>
                                        <li>
                                            Enable customers to retrieve your marketing messages at any time,<br />
                                            via their inbox
                                        </li>
                                        <li>Get recommended by partner companies</li>
                                        <li>Engage customers when they’re most receptive!</li>
                                    </ul>
                                </Col>
                            </Row>
                            <Row className="mx-auto px-md-5 pb-md-5 mb-5">
                                <Col md={12} className="text-start my-1 px-md-4">
                                    <Link to='/merchant/login' className='btn fs-4 px-2 py-1 text-white button-1'>SIGN IN</Link>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className='py-md-5 my-md-5 px-md-5'>
                        <Col md={12} className='px-md-5'>
                            <Row>
                                <Col md={4} className="my-3 px-2 text-center">
                                    <img className="mb-2" width="110" src={'https://api.xircls.com/static/images/website-slide/sn5.jpg'} />
                                    <h4 className="mb-1 fourth-font text-blue">Reach active customer inboxes
                                        <br /> via your partners.</h4>
                                    <p className="fifth-font">Leverage the power of collaboration to gain an edge in your email marketing efforts.
                                        Hit an inbox when it’s most likely to be open and engaged with. </p>
                                </Col>
                                <Col md={4} className="my-3 px-2 text-center">
                                    <img className="mb-2" width="110" src={'https://api.xircls.com/static/images/website-slide/sn6.jpg'} />
                                    <h4 className="mb-1 fourth-font text-blue">Get personally recommended by partner companies.</h4>
                                    <p className="fifth-font">Nothing beats word-of-mouth marketing. Especially when it’s another business that vouches for you.</p>
                                </Col>
                                <Col md={4} className="my-3 px-2 text-center">
                                    <img className="mb-2" width="110" src={'https://api.xircls.com/static/images/website-slide/sn7.jpg'} />
                                    <h4 className="mb-1 fourth-font text-blue">Stop fighting for mindspace. Lock your competition out.</h4>
                                    <p className="fifth-font">Don’t worry about competition stealing the spotlight. We ensure that no two competing brands market to the same customer at one time.</p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    </Container>
                    <Row>
                        <Col md={12} className="py-md-5 my-md-5 px-0">
                            <Container fluid
                                className="py-5 back-beige"
                            >
                                <Row>
                                    <Col md={12}>
                                        <h2
                                            className="htext text-center mb-2 second-font fw-bold letter-spacing-1 text-black text-capitalize">
                                            Market on Fact, Not Assumptions
                                        </h2>
                                        <p className='text-center fs-3 lh-base text-black'>
                                            We’ve created the only marketing solution in the world
                                            <br />that triggers marketing messages against real customer actions & purchases,
                                            <br />verified by partner companies in real-time.
                                        </p>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                    <Row className='parallax' style={{ padding: "135px"}}>
                        <Col md={7} className='px-md-5 py-5'>
                            <h2 className='mb-3' style={{ color: '#333', letterSpacing: '-2px', fontFamily: 'sans-serif'}}>
                                Our algorithms find your customers, eliminating the guesswork.
                            </h2>
                            <h5 className='mb-3 text-dark' style={{ fontWeight: '400' }}>
                            A lot of your time and money is invested in filtering and engaging your target prospects with zero promise of conversion.
                            </h5>
                            <h5 className='text-dark' style={{ fontWeight: '400' }}>
                            We help you instantly narrow down on your ideal customers, so that you can focus your resources on wooing them right.
                            </h5>
                        </Col>
                    </Row>
                    <SignSection />
                <Footer />
            </div>
        </>
    )
}

export default Sniper