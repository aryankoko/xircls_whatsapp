import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Modal } from "reactstrap"
import Footer from './base/Footer'
import SignSection from '../../default_components/SignSection'
import SemperFislide1 from "@src/assets/images/website-slide/semperfi/semperFi_01.jpg"
import SemperFislide2 from "@src/assets/images/website-slide/semperfi/semperFi_02.jpg"
import SemperFislide3 from "@src/assets/images/website-slide/semperfi/semperFi_03.jpg"
import { affiliateTracking } from '../Validator'

const SemperFi = (...args) => {


    const [modal, setModal] = useState(false)

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
                    <Row>
                        <Col md={9} className="mt-2 text-center mx-auto">
                            <img src="https://api.xircls.com/static/images/website-slide/Semper%20Fi-man%20logo.jpg" className="page-logo" />
                            <h1 className="my-2 main-font text-black fw-bold"><span className="text-blue">Retain</span> Customers with Rewards <span className="text-blue">You Don’t Pay For.</span></h1>
                            <h3 className='fs-4'>Semper Fi* is the only customer loyalty program in the world where other businesses pay to help YOU retain YOUR customers!</h3>
                            <p>*Semper Fi comes from Semper Fidelis - a Latin phrase that means 'Always Loyal’. </p>
                        </Col>
                        <Col md={12} className="text-center my-5">
                            <Link to='/merchant/signup' className='btn fs-4 px-2 py-1 text-white button-1'>START A SEMPER-FI CAMPAIGN</Link>
                        </Col>
                    </Row>
                    <Row className='py-md-5 my-md-5 px-md-5'>
                        <Col md={12} className='px-md-5'>
                            <Row>
                                <Col md={4} className="my-3 px-2 text-center">
                                    <img className="mb-2" width="76" height="76" src={SemperFislide1} />
                                    <h4 className="mb-1 fs-3 text-blue">Start a conversation.</h4>
                                    <p className="mb-3 fs-5">Meaningfully engage with your prospects and customers in ways that make a real difference to them. Give them a reason to engage back with you.</p>
                                </Col>
                                <Col md={4} className="my-3 px-2 text-center">
                                    <img className="mb-2" width="76" height="76" src={SemperFislide2} />
                                    <h4 className="mb-1 fs-3 text-blue">Become part of their daily lives.</h4>
                                    <p className="mb-3 fs-5">Stay at the top of their minds. Deliver value that goes beyond their direct relationship with your brand. Become synonymous with value.</p>
                                </Col>
                                <Col md={4} className="my-3 px-2 text-center">
                                    <img className="mb-2" width="76" height="76" src={SemperFislide3} />
                                    <h4 className="mb-1 fs-3 text-blue">Enhance your brand value.</h4>
                                    <p className="mb-3 fs-5">Through partner recommendations delivered straight to their inbox (including regular email reminders), be relevant without diluting your brand. </p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} className='px-md-5'>
                            <Row>
                                <h2 className="text-center second-font">How Semper Fi is Different</h2>
                            </Row>
                            <Row className="py-5 px-md-5 mx-auto">
                                <Col lg={6} className="px-md-5 mb-4">
                                    <div className="mx-auto border p-2 border-dark pt-2 table rounded">
                                        <h3 className='text-blue fs-1 mb-2'>Typical Loyalty Programs</h3>
                                        <ul className="t1">
                                            <li className='my-1 fs-4'>Reward points take too long to collect</li>
                                            <li className='my-1 fs-4'>Collected points stay unredeemed</li>
                                            <li className='my-1 fs-4'>Doesn’t address a customer’s immediate needs; instant gratification is missing</li>
                                            <li className='my-1 fs-4'>Your rewarding capacity is limited to your own marketing budget / product or service range</li>
                                            <li className='my-1 fs-4'>Most importantly, all customer retention costs come from your own pocket!</li>
                                        </ul>
                                    </div>
                                </Col>
                                <Col lg={6} className="px-md-5 mb-4">
                                    <div className="mx-auto border p-2 border-dark pt-2 table rounded">
                                        <h3 className='text-blue fs-1 mb-2'>Semper Fi</h3>
                                        <ul className="t2">
                                            <li className='my-1 fs-4'>Reward instantly</li>
                                            <li className='my-1 fs-4'>No reward points to collect</li>
                                            <li className='my-1 fs-4'>Instant customer gratification</li>
                                            <li className='my-1 fs-4'>Cross-brand relationship marketing</li>
                                            <li className='my-1 fs-4'>Reward every engagement & purchase</li>
                                            <li className='my-1 fs-4'>Run a rewards program that works across borders!</li>
                                            <li className='my-1 fs-4'>Ensure your customers receive the star treatment everywhere they go</li>
                                            <li className='my-1 fs-4'>Reward across categories & experiences</li>
                                            <li className='my-1 fs-4'>Cultivate loyalty without fear of marketing expense!</li>
                                        </ul>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Container fluid>
                            <Row className="py-5 my-4">
                                <Col md={12}>
                                    <h2 className="text-center text-blue second-font mb-2">
                                        Create a <span className='underline'>virtuous </span>cycle of goodwill.</h2>
                                    <p className="text-center" style={{ fontSize: "20px", lineHeight: 1.2 }}>
                                        Equate your brand with unlimited value in the minds of your
                                        customers.
                                        <br />
                                        Make their purchases with you a source of perpetual delight!
                                    </p>
                                </Col>
                            </Row>
                        </Container>
                    </Row>
                    <Row className='px-md-5'>
                        <Container className='px-md-5'>
                            <Row className="mx-auto my-5 p-md-5">
                                <Col md={3} className="mb-3 d-flex align-items-center justify-content-center right-order mb-3">
                                    <img height="180px" src='https://api.xircls.com/static/images/website-slide/sf011.jpg' />
                                </Col>
                                <Col md={9} className="px-md-5 d-flex flex-column justify-content-center">
                                    <h3 className="text-blue third-font mb-2">Start building Loyalty Today!</h3>
                                    <div className='fs-4'>
                                        <p className="para-text mb-0">Semper Fi eliminates the need to </p>
                                        <ul className="para-text px-3">
                                            <li>Stay limited to one’s own marketing budget to reward customers</li>
                                            <li>Create complex, time-consuming loyalty programs/rewards systems</li>
                                            <li>Pursue time-consuming cross-marketing partnerships with other brands</li>
                                        </ul>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mx-auto my-5 p-md-5">
                                <Col md={3} className="mb-3 d-flex align-items-center justify-content-center">
                                    <img height="180px" src='https://api.xircls.com/static/images/website-slide/sf2.jpg' />
                                </Col>
                                <Col md={9} className="right-order px-md-5 d-flex flex-column justify-content-center">
                                    <h3 className="text-blue third-font mb-2">Trigger real-time intelligence to reward contextually…</h3>
                                    <div className='fs-4'>
                                        <p className="para-text mb-0">XIRCLS matchmaking algorithms measure previous & current customer engagement to gain real-time behavioral insights and auto-curate more relevant reward experiences.</p>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mx-auto my-5 p-md-5">
                                <Col md={3} className="mb-3 d-flex align-items-center justify-content-center right-order">
                                    <img height="180px" src='https://api.xircls.com/static/images/website-slide/sf3.jpg' />
                                </Col>
                                <Col md={9} className="px-md-5 d-flex flex-column justify-content-center">
                                    <h3 className="text-blue third-font mb-2">… or choose exactly how you want to reward your customers.</h3>
                                    <div className='fs-4'>
                                        <p className="para-text mb-0">An ‘Inner XIRCL’ gives you 100% control over the customer reward experience.</p>
                                        <ul className="para-text px-3">
                                            <li>Create a private network of ideal partner companies</li>
                                            <li>Direct offers from select partners to different sections of your customer base</li>
                                            <li>Hyper-curate your customers’ rewards experience with handpicked offers</li>
                                        </ul>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mx-auto my-5 p-md-5">
                                <Col md={3} className="mb-3 d-flex align-items-center justify-content-center">
                                    <img height="180px" src='https://api.xircls.com/static/images/website-slide/sf4.jpg' />
                                </Col>
                                <Col md={9} className="right-order px-md-5 d-flex flex-column justify-content-center">
                                    <h3 className="text-blue third-font mb-2">Make them feel they've 'earned' your offers.</h3>
                                    <div className='fs-4'>
                                        <p className="para-text mb-0">Since customers receive your offers as a reward for their purchase, they instantly attach a personal value to your offers.</p>
                                        <p className="para-text mb-0">This motivates them to redeem the offers to get their money’s worth.</p>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mx-auto my-5 p-md-5">
                                <Col md={3} className="mb-3 d-flex align-items-center justify-content-center right-order">
                                    <img height="180px" src='https://api.xircls.com/static/images/website-slide/sf5.jpg' />
                                </Col>
                                <Col md={9} className="px-md-5 d-flex flex-column justify-content-center">
                                    <h3 className="text-blue third-font mb-2">Don’t Bear the Burden of Rewarding your Customers Alone.</h3>
                                    <div className='fs-4'>
                                        <p className="para-text mb-0" >Customer retention has never been easier on your bottom line.</p>
                                        <p className="para-text mb-0" >Reward your customers with diverse offers from non-competing merchants for every purchase they make.</p>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mx-auto my-5 p-md-5">
                                <Col md={3} className="mb-3 d-flex align-items-center justify-content-center">
                                    <img height="180px" src='https://api.xircls.com/static/images/website-slide/sf6.jpg' />
                                </Col>
                                <Col md={9} className="right-order px-md-5 d-flex flex-column justify-content-center">
                                    <h3 className="text-blue third-font mb-2">Tap Into Collaboration’s Most Powerful Aspect – Trust</h3>
                                    <div className='fs-4'>
                                        <p className="para-text mb-0">Introduce your customers to new brands, and in turn they will introduce you to their customers, leveraging the trust-invoking power of the personal recommendations.</p>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mx-auto my-5 p-md-5">
                                <Col md={3} className="mb-3 d-flex align-items-center justify-content-center right-order">
                                    <img height="180px" src='https://api.xircls.com/static/images/website-slide/sf7.jpg' />
                                </Col>
                                <Col md={9} className="px-md-5 d-flex flex-column justify-content-center">
                                    <h3 className="text-blue third-font mb-2">Win Customers for Life.</h3>
                                    <div className='fs-4'>
                                        <p className="para-text mb-0">Prove to your customers that their money is always well spent at your business.</p>
                                        <p className="para-text mb-0">Show them that every visit with you is a reason to celebrate!</p>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Row>
                    <Row>
                        <Col md={12} className="py-1 my-1 px-0">
                            <Container fluid
                                className="my-5 py-5 back-beige"
                            >
                                <Row>
                                    <Col md={12}>
                                        <h2
                                            className="htext text-center mb-2 second-font fw-bold letter-spacing-1 text-black text-capitalize">
                                            Instant gratification never felt so good.
                                        </h2>
                                        <p className='text-center fs-3 lh-base text-black'>
                                            Generously reward your customers on every single purchase without
                                            feeling the pinch.<br />
                                            Reserve your marketing budget for other activities
                                            <br />
                                            while actively cultivating loyalty for your brand every single
                                            day.
                                        </p>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} className='px-0'>
                            <div className="py-3 my-3">
                                <Container fluid className="item-align-center px-md-5 py-5 my-5 back-blue">
                                    <Row className='px-2'>
                                        <Col lg={4} className="my-lg-5 d-flex align-items-center">
                                            <div className="heading-block border-bottom-0 pe-1">
                                                <h2 className="text-light text-capitalize second-font">
                                                    Why<br /> Customer Retention Makes Sense.
                                                </h2>
                                            </div>
                                        </Col>
                                        <Col ld={8}>
                                            <Row className="mt-lg-6">
                                                <Col md={6} className="py-4">
                                                    <h2 className="text-white mb-1"> Lower Spending </h2>
                                                    <p className="text-white fs-4">
                                                        {" "}
                                                        Acquiring a new customer is 5 times more expensive
                                                        than retaining an existing customer.{" "}
                                                    </p>
                                                </Col>

                                                <Col md={6} className="py-4">
                                                    <h2 className="text-white mb-1"> Higher Conversion </h2>
                                                    <p className="text-white fs-4">
                                                        {" "}
                                                        The probability of selling to an existing customer is
                                                        60-70%. The probability of selling to a new prospect
                                                        is as little as 5-20%.{" "}
                                                    </p>
                                                </Col>

                                                <Col md={6} className="py-4">
                                                    <h2 className="text-white mb-1"> Greater Profits </h2>
                                                    <p className="text-white fs-4">
                                                        {" "}
                                                        Increasing customer retention rates by 5% increases
                                                        profits by 25-95%.{" "}
                                                    </p>
                                                </Col>

                                                <Col md={6} className="py-4">
                                                    <h2 className="text-white mb-1"> Improved CLV </h2>
                                                    <p className="text-white fs-4">
                                                        {" "}
                                                        Lower your customer churn rates and increase your
                                                        Customer Lifetime Value (CLV), both important
                                                        indicators of your business health.{" "}
                                                    </p>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        </Col>
                    </Row>
                    <Row className="py-5">
                        <Col md={12}>
                            <Container fluid className='px-md-3 py-3'>
                                <Row className="align-items-center px-md-3 justify-content-center">
                                    <Col md={6} className="text-center mb-0 px-md-4 position-relative right-order">
                                        <div className="mb-3 modal-image home-all-devices-access_now-embed-image rounded-2 overflow-hidden" data-ref="home-all-devices-access_now" data-toggle="modal" data-target="#homeVideoModal" id="vidImg" onClick={() => setModal(!modal)} style={{ position: "relative", cursor: "pointer" }}>
                                            <div className="position-absolute w-100 top-0 left-0 bottom-0 right-0 d-flex justify-content-center align-items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-play text-white w-50 h-50" viewBox="0 0 16 16" id="playBtn">
                                                    <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z" />
                                                </svg>
                                            </div>
                                            <img src="https://api.xircls.com/static/images/website-slide/videoback.jpg" className=" any-module-textvideo-img mx-auto w-100" alt="" title="" />
                                        </div>
                                    </Col>
                                    <Col md={6} className="text-xl-left mb-3 mb-xl-0">
                                        <div className="px-md-3 text-left">
                                            <h2 className="text-blue mb-1 second-font">Launch a Perpetual Rewards Loop</h2>
                                            <h5 style={{ fontSize: "22px" }}>Gift your customers with partner offers every single time they buy from you to keep them coming back for more.</h5>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                    <Modal className="products modal-lg" centered isOpen={modal} toggle={() => setModal(!modal)} {...args}>
                        <div className="modal-body text-center" style={{ padding: "0" }}>
                            <div className="" data-ref="home-all-devices-access_now" style={{ padding: "0" }}>
                                <video
                                    id="home-all-devices-access_now"
                                    className="video-js vjs-fill vjs-big-play-centered border border-dark rounded-3 w-100 cursor-pointer"
                                    controls
                                    fluid
                                    preload="auto"
                                    data-setup="{}"
                                >
                                    <source src="https://api.xircls.com/static/images/website-slide/videos/XIRCLS%20E-Commerce%20Demo.mp4" type="video/mp4" />

                                </video>
                            </div>
                        </div>
                    </Modal>
                    <Row className="my-5 py-5">
                        <Container fluid>
                            <Row className="text-center">
                                <Col md={12} className="mb-2">
                                    <h2 className="text-blue second-font"> Give value to become truly invaluable.</h2>
                                </Col>
                                <Col md={8} className="offset-md-2 text-center">
                                    <h6 className="mb-1 fs-4">‘You must give to receive.’ We help you put this principle to practice. </h6>
                                    <h6 className="mb-1 fs-4">Instead of leaving it to your customers to reap the benefits of their loyalty to you, we ask you to take the first step and reward them from their very first purchase – and forever after that.</h6>
                                    <h6 className="mb-1 fs-4">Consistently give them value.</h6>
                                </Col>
                            </Row>
                        </Container>
                    </Row>
                </Container>
                <SignSection />
                <Footer />
            </div>
        </>
    )
}

export default SemperFi