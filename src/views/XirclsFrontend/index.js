import React, { useState } from 'react'
import { Pagination, Navigation, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js'
import { Container, Row, Col } from 'reactstrap'
import LogoSection from './components/LogoSection'
import { AiFillCaretRight } from "react-icons/ai"
import { Link } from 'react-router-dom'
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import 'swiper/modules/navigation/navigation.min.css'
import 'swiper/modules/autoplay/autoplay.min.css'
import IconCard from '../../@core/components/custom_components/IconCard'
import xircls_logo from "@src/assets/images/website-slide/xircls_logo.jpg"
import bounce_rate from "@src/assets/images/website-slide/home/xircls_bounce-rate.png"
import xircls_conversion from "@src/assets/images/website-slide/home/xircls_conversion.png"
import xircls_magnet from "@src/assets/images/website-slide/home/xircls_magnet.png"
import decentralized from "@src/assets/images/website-slide/home/xircls_decentralized_icon.jpg"
import blockchain from "@src/assets/images/website-slide/home/xircls_blockchain_icon.jpg"
import peer from "@src/assets/images/website-slide/home/xircls_peer-to-peer_icon.jpg"
import shield from "@src/assets/images/website-slide/home/xircls_shield_icon.jpg"
import reach from "@src/assets/images/website-slide/home/xircls_reach.jpg"
import expand from "@src/assets/images/website-slide/home/xircls_expand_icon.jpg"
import reward from "@src/assets/images/website-slide/home/xircls_reward_icon.jpg"
import noticed from "@src/assets/images/website-slide/home/xircls_noticed_icon.jpg"
import trust from "@src/assets/images/website-slide/home/xircls_trust_icon.jpg"
import dataIcon from "@src/assets/images/website-slide/home/xircls_data_icon.jpg"
import manufacturers from "@src/assets/images/website-slide/home/xircls_manufacturers_icon.jpg"
import service from "@src/assets/images/website-slide/home/xircls_service_icon.jpg"
import startups from "@src/assets/images/website-slide/home/xircls_startups_icon.jpg"
import govtBodies from "@src/assets/images/website-slide/home/xircls_govt-bodies_icon.jpg"
import organisations from "@src/assets/images/website-slide/home/xircls_organisations_icon.jpg"
import communities from "@src/assets/images/website-slide/home/xircls_communities_icon.jpg"
import coupons from "@src/assets/images/website-slide/home/xircls_coupons_icon.jpg"
import rewards from "@src/assets/images/website-slide/home/xircls_rewards_icon.jpg"
import contests from "@src/assets/images/website-slide/home/xircls_contests_icon .jpg"
import information_icon from "@src/assets/images/website-slide/home/xircls_service-information_icon.jpg"
import samples_icon from "@src/assets/images/website-slide/home/xircls_samples_icon.jpg"
import exclusive from "@src/assets/images/website-slide/home/xircls_exclusive_icon.jpg"
import Footer from './base/Footer'
import CountUp from 'react-countup/build/index'
import { InView } from 'react-intersection-observer'
import SignSection from '../../default_components/SignSection'


const Home = () => {
    const [sectVisible, setSectVisible] = useState(false)

    return (
        <>

            <div className="products text-dark bg-white home-page">

                <Swiper
                    slidesPerView={1}
                    spaceBetween={0}
                    navigation={true}
                    autoplay={{ delay: 4000 }}
                    speed={1000}
                    loop={true}
                    modules={[Pagination, Navigation, Autoplay]}
                    className="mySwiper"
                    initialSlide={0}
                >
                    <SwiperSlide>
                        <div className="">
                            <Container className='pb-5 pt-2'>
                                <Row className='py-1'>
                                    <Col md={3} className='right-order mb-3 d-flex justify-content-center'>
                                        <img width={260} height={260} src={xircls_logo} />
                                    </Col>
                                    <Col md={9} className='d-flex flex-column justify-content-center'>
                                        <h1 className="main-font text-dark mb-2">The <span className="text-blue">
                                            World's First Decentralized,<br />
                                            Collaborative
                                        </span> Marketing Network.</h1>
                                        <h3 className='third-font text-dark fst-italic my-2'>Building the Web3 of Marketing</h3>
                                        <Row className='mt-5'>
                                            <Col xs={4}>
                                                <p className='second-font text-dark fw-700'><CountUp start={0} end={100} duration={1.5} suffix={'%'} /></p>
                                                <p className='sixth-font'>Verified Customer
                                                    Engagement</p>
                                            </Col>
                                            <Col xs={4}>
                                                <p className='second-font text-dark fw-700'><CountUp start={0} end={3} duration={1.5} suffix={'%'} /></p>
                                                <p className='sixth-font'>Average click through</p>
                                            </Col>
                                            <Col xs={4}>
                                                <p className='second-font text-dark fw-700'><CountUp start={0} end={13} duration={1.5} suffix={'%'} /></p>
                                                <p className='sixth-font'>Conversion Rate</p>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className='match-height py-1 pe-1'>
                                    <Col md={2} className='sixth-font border-md-end'>Instant Marketing Collaboration.</Col>
                                    <Col md={2} className='sixth-font border-md-end'>Ledger-based Verification.</Col>
                                    <Col md={2} className='sixth-font border-md-end'>Real-Time Customer Reach.</Col>
                                    <Col md={2} className='sixth-font border-md-end'>Instant Customer Gratification.</Col>
                                    <Col md={2} className='sixth-font'>No Sharing Data.</Col>
                                </Row>
                            </Container>
                        </div>
                    </SwiperSlide >
                    <SwiperSlide>
                        <Container className="pb-5 pt-2">
                            <Row className='py-1'>
                                <Col md={3} className='right-order mb-3 d-flex justify-content-center'>
                                    <img width={260} height={260} src={xircls_logo} />
                                </Col>
                                <Col md={9} className='d-flex flex-column justify-content-center'>
                                    <h1 className="main-font text-dark mb-2">Your <span className="text-blue">
                                        Customers Stay Yours<br />
                                        And Yours Alone
                                    </span>.</h1>
                                    <h3 className='third-font text-dark fst-italic my-2'>Explore a world beyond Aggregators!</h3>
                                </Col>
                            </Row>
                            <Row className='match-height pe-1'>
                                <Col md={3} className='sixth-font border-md-end'>Stop driving customers to your competition. </Col>
                                <Col md={3} className='sixth-font border-md-end'>Create sustainable options to harmful discounting.</Col>
                                <Col md={3} className='sixth-font'>Cultivate loyalty for your business, not third-party platforms.</Col>
                            </Row>
                        </Container>
                    </SwiperSlide >
                    <SwiperSlide>
                        <Container className="pb-5 pt-2">
                            <Row className='py-1'>
                                <Col md={3} className='right-order mb-3 d-flex justify-content-center'>
                                    <img width={260} height={260} src={xircls_logo} />
                                </Col>
                                <Col md={9} className='d-flex flex-column justify-content-center'>
                                    <h1 className="main-font text-dark mb-2">Say Hello To Always-On <span className="text-blue">Marketing!</span></h1>
                                    <h3 className='third-font text-dark fst-italic my-2'>Because Customers shop when they want to.<br />
                                        Not when you want them to. </h3>
                                    <p className='fifth-font my-2'>Stop-Start Marketing Campaigns Lose You Customers Buying Right Now.</p>
                                </Col>
                            </Row>
                            <Row className='match-height py-2 pe-1'>
                                <Col md={3} className='sixth-font border-md-end'>Run a perpetual marketing campaign. </Col>
                                <Col md={3} className='sixth-font border-md-end'>Reach customers when they're most likely to buy from you.</Col>
                                <Col md={3} className='sixth-font'>Lock your competition out.</Col>
                            </Row>
                        </Container>
                    </SwiperSlide >
                </Swiper>
                <div className="pb-md-5 py-4 mt-2 mb-5 back-beige">

                    <Container>
                        <Row>
                            <Col md={12} className='mb-3 mx-auto'>
                                <LogoSection />
                            </Col>
                            <Col md={12} className="text-center">
                                <Link to='/merchant/signup/' className='btn sixth-font px-2 text-white button-1'>JOIN THE NETWORK</Link>
                            </Col>
                        </Row>
                    </Container>

                </div>
                <div className='back-blue my-5 py-5'>
                    <Container>
                        <div className="pb-5">
                            <h2 className="second-font text-white text-center">Partner with other Businesses</h2>
                            <h5 className='sixth-font text-white text-center'>
                                Across Sectors, Online or Offline, Anywhere in the World.
                                Instantly.
                            </h5>
                        </div>
                        <div className="pb-5">
                            <h2 className="second-font text-white text-center">Market Directly to their Customers</h2>
                            <h5 className='sixth-font text-white text-center'>
                                At the Moment of Transaction. Without Customer Data shared.
                            </h5>
                        </div>
                        <div>
                            <h2 className="second-font text-white text-center">Retain Existing Customers</h2>
                            <h5 className='sixth-font text-white text-center'>At Zero Cost, Via Partner Rewards.</h5>
                        </div>
                    </Container>
                </div>
                <Container className='py-6 my-5'>
                    <h2 className="second-font text-dark text-center mb-3">
                        Drive high-quality traffic to your website. <br /> Optimize for more
                        conversions!
                    </h2>
                    <h4 className="mb-4 text-dark text-center fourth-font">
                        Leverage collaborations to transform your website sales funnel.
                    </h4>
                    <Row className="my-5 px-md-3">
                        <IconCard col={4} image={bounce_rate} title="Reduce bounce rates." para="Get genuine, verified traffic from your partners to your e-commerce storefront." />
                        <IconCard col={4} image={xircls_conversion} title="Convert with instant rewards." para="Incentivize actions and purchases with partner offers." />
                        <Col md={4} className="py-2 text-center">
                            <img src={xircls_magnet} width={64} height={64} alt="" className="img-fluid" />
                            <h4 className="text-blue my-2 fourth-font">Improve customer retention.</h4>
                            <h5 className='seventh-font'>
                                Promise partner offers on future actions & purchases.
                                &nbsp;<u>Kick off a perpetual rewards loop!</u>
                            </h5>
                        </Col>
                    </Row>
                </Container>
                <div className="d-block mb-5 back-green px-5 text-center" style={{ padding: '30px' }}>
                    <div className="container">
                        <h3 className="three-fifth-font text-white">
                            No sign-up fee. No monthly commitments.&nbsp;
                            <Link to='/merchant/signup' className='text-white'>
                                <span className="underline-2">Join here. <AiFillCaretRight /></span>
                            </Link>
                        </h3>
                    </div>
                </div>
                <Container className='text-center py-6'>
                    <div className="pb-5 mb-5 ">
                        <h2 className="second-font text-blue mb-2">
                            100% Genuine Customer Reach. <br />
                            <u>Guaranteed!</u>
                        </h2>
                        <h5 className='fifth-font text-dark'>
                            Market to active shoppers, not anonymous users on the internet.
                        </h5>
                    </div>
                    <div className="py-5">
                        <h2 className="second-font text-blue">
                            100% Verification. <br />
                            <u> 0% Fraud</u>
                        </h2>
                        <h5 className='fifth-font text-dark'>
                            Optimize every marketing dollar. Engage genuine buyers,<br /> verified in real time by your partners.
                        </h5>
                    </div>
                </Container>
                {/* <div className="container clearfix py-6">
                    <div className="row text-center">
                        <div className="col-md-12">
                            <h2 className="text-blue colorb mt-4 mb-3">100% Genuine Customer Reach.<br /><u className="underline">Guaranteed!</u></h2>
                            <h5 className="mb-0">Engage genuine customers, not anonymous users on the internet.</h5>
                        </div>
                    </div>
                </div> */}
                <div className="back-blue mb-5">
                    <Container className="py-1">
                        <Row className="py-5">
                            <Col md={12}>
                                <h2 className="second-font text-white text-center">
                                    Instant Brand Collaborations For Lead Nurturing, Conversions,
                                    Customer Retention & Loyalty.
                                </h2>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div>
                    <Container className="py-5 px-md-5">
                        <h1 className="second-font text-center text-dark mt-5 mb-3">Join a Global Network of Companies</h1>
                        <Row className="my-card">
                            <IconCard col={3} image={decentralized} title="DECENTRALIZED" para="Global network of companies with no third-party or central authority." paraClass="fifth-font lh-sm" />
                            <IconCard col={3} image={blockchain} title="PEER-TO-PEER VERIFIED" para="Real-time customer verification by companies." paraClass="fifth-font lh-sm" />
                            <IconCard col={3} image={peer} title="LEDGER-BASED" para="A ledger-based verification model that encompasses transactions and actions." paraClass="fifth-font lh-sm" />
                            <IconCard col={3} image={shield} title="NO DATA SHARING" para="Customer data remains localized and 100% secure with built-in data protocols." paraClass="fifth-font lh-sm" />

                        </Row>
                    </Container>
                </div>
                <Container className='my-5 py-5'>
                    <Row className='mb-4'>
                        <Col md={12}>
                            <h2 className="second-font text-center text-dark">Why Collaboration Makes Sense</h2>
                            <h5 className="text-dark text-center fifth-font">
                                Partnerships Make Marketing Smarter, Cost-Efficient & Personalised.
                            </h5>
                        </Col>
                    </Row>
                    <Row>
                        <IconCard col={4} image={reach} title="Reach Real Customers" para="Reach 100% real people, verified by genuine transactions or actions in real-time, in your chosen categories." imageClass="my-1 p-1 border-dark rounded-circle" paraClass="fifth-font" width={88} />
                        <IconCard col={4} image={expand} title="Expand Your Reach" para="Exponentially. Just a few strategic partnerships can expose you to hundreds of thousands of new prospects every year." imageClass="my-1 p-1 border-dark rounded-circle" paraClass="fifth-font" width={88} />
                        <IconCard col={4} image={reward} title="Reward Perpetually" para="Source unlimited rewards from other businesses. Keep customers hooked without blowing up your budget." imageClass="my-1 p-1 border-dark rounded-circle" paraClass="fifth-font" width={88} />
                        <IconCard col={4} image={noticed} title="Get Noticed" para="Directly reach a customer’s inbox when they’re most likely to be engaged. Make an impression." imageClass="my-1 p-1 border-dark rounded-circle" paraClass="fifth-font" width={88} />
                        <IconCard col={4} image={trust} title="Gain Trust" para="When your partners recommend you in real-time to their customers, your message gains depth, utility and value!" imageClass="my-1 p-1 border-dark rounded-circle" paraClass="fifth-font" width={88} />
                        <IconCard col={4} image={dataIcon} title="Access Rich Data" para="Gain valuable insights on your customers – what they buy, what makes them happy." imageClass="my-1 p-1 border-dark rounded-circle" paraClass="fifth-font" width={88} />
                    </Row>
                </Container>

                <div className='back-blue py-2 mt-3 mb-5'>
                    <Container className='py-5'>
                        <h3 className='second-font text-center text-white'>
                            Enhance Your Inbound Marketing Efforts. <br />
                            Increase Conversions.
                            Reduce Your CAC!
                        </h3>
                    </Container>
                </div>
                <Container className='py-5'>
                    <Row className='mb-2'>
                        <Col md={12}>
                            <h2 className="second-font text-center text-dark">For You.<br />
                                No Matter Who You Are. </h2>
                            <h5 className="text-dark text-center fifth-font">
                                A one-of-its-kind marketing platform that has something for everyone.
                            </h5>
                        </Col>
                    </Row>
                    <Row>
                        <IconCard col={4} image={manufacturers} title="Manufacturers & Retailers" para="Implement real-time contextual marketing at a hyperlocal level." imageClass="my-1" paraClass="fifth-font" width={88} />
                        <IconCard col={4} image={service} title="Service Providers" para="Reward every transaction with offers matched to customer profile." imageClass="my-1" paraClass="fifth-font" width={88} />
                        <IconCard col={4} image={startups} title="Startups & Local Businesses" para="Market to target customers at low cost. Delight customers with big ticket rewards." imageClass="my-1" paraClass="fifth-font" width={88} />
                        <IconCard col={4} image={govtBodies} title="Govt. Bodies" para="Give tangible, locally-sourced incentives to citizens for diverse actions." imageClass="my-1" paraClass="fifth-font" width={88} />
                        <IconCard col={4} image={organisations} title="Organisations" para="Reward people for doing good with offers sourced from brands & local businesses." imageClass="my-1" paraClass="fifth-font" width={88} />
                        <IconCard col={4} image={communities} title="Communities" para="Perpetually reward community members who follow best civic & social practices." imageClass="my-1" paraClass="fifth-font" width={88} />

                    </Row>
                </Container>
                <Container className='py-5'>
                    <Row className='mb-3'>
                        <Col md={12}>
                            <h2 className="second-font text-center text-dark">How can you promote through XIRCLS?</h2>
                            <h5 className="text-dark text-center fifth-font">
                                Choose a marketing message ideal for your target/existing customers
                            </h5>
                        </Col>
                    </Row>
                    <Row>
                        <IconCard col={4} image={coupons} title="Coupons & discounts" imageClass="p-1 border-dark rounded-circle" width={88} />
                        <IconCard col={4} image={rewards} title="Rewards & incentives" imageClass="p-1 border-dark rounded-circle" width={88} />
                        <IconCard col={4} image={contests} title="Contests & Polls" imageClass="p-1 border-dark rounded-circle" width={88} />
                        <IconCard col={4} image={information_icon} title="Product / Service Information" imageClass="p-1 border-dark rounded-circle" width={88} />
                        <IconCard col={4} image={samples_icon} title="Samples & Freebies" imageClass="p-1 border-dark rounded-circle" width={88} />
                        <IconCard col={4} image={exclusive} title="Exclusive Access / VIP Invites" imageClass="p-1 border-dark rounded-circle" width={88} />

                    </Row>
                </Container>
                <Container className='py-5'>
                    <Row className='mb-4'>
                        <Col md={12}>
                            <InView as="div"
                                onChange={(inView) => {
                                    inView ? setSectVisible(true) : setSectVisible(false)
                                }}
                                triggerOnce={true}
                                threshold={0.25}
                            >
                                <h2 className="text-center text-dark">More than <span className="text-blue font-monospace"><CountUp start={0} end={sectVisible ? 760000 : 0} duration={1.5} /></span>+ transactions<br /> rewarded.<br />
                                    Over <span className="text-blue">700,000</span> Genuine Customers<br /> marketed to.</h2>
                                <h5 className="text-dark text-center mb-5">
                                    With zero customer data shared.
                                </h5>

                                <div className='mt-5 w-50 mx-auto back-beige rounded-3'>
                                    <div className='back-blue load-bar position-relative rounded-3' style={{ width: sectVisible ? '80%' : '0%', height: '0.25rem', transition: '1.5s ease-in-out' }}>
                                        {/* <div className='position-absolute font-20px-res bg-black text-white text-center' style={{ paddingRight: '8px', paddingTop: '6px', top: '-56px', left: 'calc(100% - 2.2rem)' }}><CountUp style={{ padding: `0px 15px` }} start={0} end={sectVisible ? 760000 : 0} duration={1.5} className='loader-number position-relative' /></div> */}
                                        <span style={{top: "0px", right: "0px", position: "absolute", transform: "translate(0px, -41px)"}}>
                                            <span className='position-relative d-flex justify-content-center'>
                                                <svg
                                                    width={"97px"}
                                                    height={"41px"}
                                                    viewBox="0 0 97 41"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className='position-absolute'
                                                >
                                                    <path d="M48 41l-9.526-14.25h19.052L48 41z" fill="#000" />
                                                    <path fill="#000" d="M0 0H97V31H0z" />
                                                </svg>
                                                <span className='position-absolute fw-bold text-white fs-4' style={{top: "3px"}}><CountUp start={0} end={sectVisible ? 760000 : 0} duration={1.5} /></span>
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </InView>
                        </Col>
                    </Row>
                </Container>
                <SignSection />
                <Footer />
            </div>
        </>

    )
}

export default Home