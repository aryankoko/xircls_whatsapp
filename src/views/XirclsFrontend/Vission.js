import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Modal } from 'reactstrap'
import image1 from "@src/assets/images/website-slide/vision_mission/Xircls_friendship.png"
import image2 from '@src/assets/images/website-slide/vision_mission/Xircls_relation.png'
import image3 from '@src/assets/images/website-slide/vision_mission/xircls_vision-mission_01.png'
import mission_statement_logo from '@src/assets/images/website-slide/mission_statement_logo.jpg'
import xircls_vission_video from '@src/assets/images/website-slide/vision_mission/xircls_xircls-in-three-words_video.png'
import { Check, Play } from 'react-feather'
import Footer from './base/Footer'
import SignSection from '../../default_components/SignSection'
import vision01 from "@src/assets/images/website-slide/home/vision_01.png"
import vision02 from "@src/assets/images/website-slide/home/vision_02.png"
import vision03 from "@src/assets/images/website-slide/home/vision_03.png"
import vision04 from "@src/assets/images/website-slide/home/vision_04.png"
import vision05 from "@src/assets/images/website-slide/home/vision_05.png"
import vision06 from "@src/assets/images/website-slide/home/vision_06.png"


const VisionMission = (...args) => {
    const [modal, setModal] = useState(false)
    return (
        <>
            <style>
                {`
                    .pdleft{
                        padding-left:8px !important;
                    }
                `}
            </style>
            <div className="products text-dark bg-white">
                <Container>
                    <Row className='pt-2  pb-1'>
                        <Col md={12} className="text-center mx-auto">
                            <img src={mission_statement_logo} className="page-logo" />
                            <h1 className="my-2 main-font text-dark fw-bold">Our <span className="text-blue">Vision & Mission</span></h1>
                            <h3 className='third-font lh-base'>To build a world where businesses, globally, can instantly connect to<br />
                                fulfill their mutually compatible marketing goals - with no third-party<br />
                                involvement or personal data violations.</h3>
                        </Col>
                    </Row>
                    <Row className='pt-2 px-md-5 mb-5'>
                        <h4 className="mb-3 fourth-font text-dark d-flex justify-content-center">We aim to be:</h4>
                        <Col md={12} className="text-center mx-auto">
                            <Row>
                                <Col md={4}  className="border-end-dark">
                                    <p className='fourth-font text-start lh-base pdleft'>A global, verified network of companies, businesses, marketers & content publishers.</p>
                                </Col>
                                <Col md={4} className='border-end-dark'>
                                    <p className='fourth-font text-start lh-base pdleft'>A transparent marketing platform that they can trust.
                                    </p>
                                </Col>
                                <Col md={4} className="">
                                    <p className='fourth-font text-start lh-base pdleft'>Affordable, yet hyper-precise. </p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <div className="d-flex justify-content-center pt-3 pb-5">
                                <a href="" className='button-1 seventh-font'>DOWNLOAD OUR VISION AND MISSION DOCUMENT</a>
                            </div>
                            <div className="d-flex justify-content-center p-5">
                                <h1 className="main-font p-1">What We <span className='text-blue'>Believe</span></h1>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Container className='ps-3 pe-3'>
                    <Row className="py-6">
                        <Col md={5} className="d-flex justify-content-center">
                            <img src={image1} alt="" width={250} height={250} />
                        </Col>
                        <Col md={7} className="right-order">
                            <h2 className='second-font mb-1'>
                                <span className='text-blue'>Collaboration</span>, not <br /> Competition.
                            </h2>
                            <h6 className='sixth-font'>
                                Living in an atmosphere of fear, doubt and competition, the world has come to accept this seeming status quo. XIRCLS aims to build a revolutionary alternative, not just in the field of marketing technology, but in the way that we choose to live our lives. We want to show the world there is a gentler way to live.
                            </h6>
                        </Col>
                    </Row>
                    <Row className="py-6">
                        <Col md={5} className="d-flex justify-content-center right-order mb-2">
                            <img src={image2} alt="" width={250} height={250} />
                        </Col>
                        <Col md={7}>
                            <h2 className='second-font mb-1'>
                                Relationships <span className="text-blue">Drive Growth</span>
                            </h2>
                            <h6 className='sixth-font pb-1'>
                                As long as money trumps relationships in the world of business, companies will struggle to acquire and retain their customers.
                            </h6>
                            <h6 className='sixth-font pb-1'>
                                Because any company that pays the ad platform or aggregator more money, gets the customer.
                            </h6>
                            <h6 className='sixth-font pb-1'>
                                At XIRCLS, when businesses collaborate, they are invested in each other’s growth and success is shared, not won.
                            </h6>
                        </Col>
                    </Row>
                    <Row className="py-6">
                        <Col md={5} className="d-flex justify-content-center mb-2 ">
                            <img src={image3} alt="" width={250} height={250} />
                        </Col>
                        <Col md={7} className="right-order">
                            <h2 className='second-font mb-1'>
                                We'll Be a Global <span className='text-blue'>Repository of Marketing</span> Best Practices.
                            </h2>
                            <h6 className='sixth-font pb-1'>
                                As a one-of-its-kind business network founded on the principles of collaboration & goodwill, XIRCLS will become its own knowledge economy built on tried-and-tested marketing methods, strategies & results, tips & advice from merchants and marketing professionals with decades of on-the-ground marketing experience from around the world.
                            </h6>
                            <h6 className='sixth-font pb-1'>
                                This repository will serve to offset the hype & confusion surrounding current marketing fads by giving young entrepreneurs and marketers a more balanced and seasoned viewpoint on how to grow their business for the long term.
                            </h6>
                        </Col>
                    </Row>
                </Container>
                <Container className='py-6'>
                    <Row>
                        <Col md={12} className='d-flex justify-content-center '>
                            <h1 className='main-font mb-3'>Our Mission <span className='text-blue'>in Action</span></h1>
                        </Col>
                        <Col md={12} className='d-flex justify-content-center '>
                            <h4 className='fourth-font mb-3 '>
                                To empower them to market on their own terms, we will always ensure that companies:
                            </h4>
                        </Col>
                    </Row>
                    <Row className='px-md-5'>
                        <Col md={10} className='d-flex pb-1 mx-auto'>
                            <div>
                                <Check size={30} strokeWidth={3} />
                            </div>
                            <h4 className="fourth-font mx-1">
                                Can instantly connect with any non-competing business, globally, nationally, locally and hyperlocally
                            </h4>
                        </Col>
                        <Col md={10} className='d-flex pb-1 mx-auto'>
                            <div>
                                <Check size={30} strokeWidth={3} />
                            </div>
                            <h4 className="fourth-font mx-1">
                                Will reach ONLY genuine, verified customers via their partners
                            </h4>
                        </Col>
                        <Col md={10} className='d-flex pb-1 mx-auto'>
                            <div>
                                <Check size={30} strokeWidth={3} />
                            </div>
                            <h4 className="fourth-font mx-1">
                                Will have 100% control over offer distribution i.e. they will reach actual customers, not a demographic group (without data shared)
                            </h4>
                        </Col>
                        <Col md={10} className='d-flex pb-1 mx-auto'>
                            <div>
                                <Check size={30} strokeWidth={3} />
                            </div>
                            <h4 className="fourth-font mx-1">
                                Can discreetly reward their new and existing customers with no public display of offers
                            </h4>
                        </Col>
                        <Col md={10} className='d-flex pb-1 mx-auto'>
                            <div>
                                <Check size={30} strokeWidth={3} />
                            </div>
                            <h4 className="fourth-font mx-1">
                                Will always be able to track campaign performance <u>down to every single lead and customer</u>. (without data shared)
                            </h4>
                        </Col>
                        <Col md={10} className='d-flex pb-1 mx-auto'>
                            <div>
                                <Check size={30} strokeWidth={3} />
                            </div>
                            <h4 className="fourth-font mx-1">
                                Will be respected with 100% transparency in our pricing & performance reports
                            </h4>
                        </Col>
                    </Row>
                </Container>
                <Container fluid className='back-blue my-5'>
                    <Container className="py-6">
                        <Row >
                            <Col md={4} className="d-flex">
                                <h2 className='second-font text-white mt-5'>Our Culture</h2>
                            </Col>
                            <Col md={8} className="row">
                                <Col md={6}>
                                    <h4 className='fourth-font text-white mb-1'>Attract. Never Promote.</h4>
                                    <h5 className='fifth-font text-white'>
                                        XIRCLS overturns the traditional mindset of persuasion &amp; aggression - an outward flow of energy and therefore wasteful - to create a culture of value creation that is sustainable and benefits everyone involved.
                                    </h5>
                                </Col>
                                <Col md={6}>
                                    <h4 className='fourth-font text-white mb-1'>Inspire Trust</h4>
                                    <h5 className='fifth-font text-white'>
                                        Through the principle of service, we aim to create a global community of individuals who consistently work to become pillars of support. We are the people you turn to when the road ahead seems unclear. Knowing fully well that when you reach out to us, you will receive what is best for you.
                                    </h5>
                                </Col>
                                <h4 className='fourth-font text-white mt-4 mb-1'>Always Be of Service.</h4>
                                <h5 className='fifth-font text-white'>
                                    To constantly deliver value, we assume a consciously directed state of inner reflection that can be summed up with the question: “How can I be of service to someone today?”
                                </h5>
                                <h5 className='fifth-font text-white'>
                                    Service is not just a concept at XIRCLS. It is the greater aim that we, and the people who join us on our journey, live by. It gives purpose to our interactions with everyone around us, from clients and coworkers to friends &amp; family to a stranger on the street.
                                </h5>
                            </Col>
                        </Row>
                    </Container>
                </Container>
                <Container className="py-6">
                    <Row style={{ justifyContent: `center`, alignItems: `center`}}>
                        <Col md={6} className="text-left">
                            <h2 className='second-font text-blue mb-1'>Why culture is important to us.</h2>
                            <h5 className='fifth-font mb-1'>
                                1. We believe it is crucial to our long-term success that the values we’ve defined for ourselves and our team bind us to a common purpose greater than our individual selves and keep us on path with our mission.
                            </h5>
                            <h5 className='mb-1 fifth-font'>
                                2. To counter a naively self-celebratory culture that idolizes the grifter hero who goes for all he can get, regardless of its side-effects.
                            </h5>
                            <h5 className='fifth-font'>
                                3. To build a global team of employees, interns and partners who are aligned with our values & goals.
                            </h5>
                        </Col>
                        <Col md={6} className="text-center mb-0 px-md-4 position-relative right-order">
                            <div className="mb-3 modal-image home-all-devices-access_now-embed-image rounded-2 overflow-hidden border border-black" data-ref="home-all-devices-access_now" data-toggle="modal" data-target="#homeVideoModal" id="vidImg" onClick={() => setModal(!modal)} style={{ position: "relative", cursor: "pointer" }}>
                                <div className="position-absolute w-100 top-0 left-0 bottom-0 right-0 d-flex justify-content-center align-items-center" id="playBtn">
                                    <Play size={90} color={"white"} strokeWidth={1} />
                                </div>
                                <img src={xircls_vission_video} className=" any-module-textvideo-img mx-auto w-100" alt="" title="" />
                            </div>
                        </Col>
                    </Row>
                    <Row className='py-md-5 my-md-5 px-md-5'>
                        <Col md={12} className='d-flex justify-content-center '>
                            <h1 className='main-font mb-3'>Our Core <span className='text-blue'>Values</span></h1>
                        </Col>
                        <Col md={12} className='px-md-5'>
                            <Row>
                                <Col md={4} className="my-3 px-2 text-center">
                                    <img className="mb-2" width="76" height="76" src={vision01} />
                                    <h4 className="mb-1 text-blue">HONESTY</h4>
                                    <h5 className="mb-3 fs-5">We are always willing to learn. We know our strengths, but also our shortcomings. All our actions stem from here.</h5>
                                </Col>
                                <Col md={4} className="my-3 px-2 text-center">
                                    <img className="mb-2" width="76" height="76" src={vision02} />
                                    <h4 className="mb-1 fs-3 text-blue">PERFECTION-DRIVEN</h4>
                                    <h5 className="mb-3 fs-5">We aim for 100% efficiency in all our processes, knowing that the effort towards perfection can never stop.</h5>
                                </Col>
                                <Col md={4} className="my-3 px-2 text-center">
                                    <img className="mb-2" width="76" height="76" src={vision03} />
                                    <h4 className="mb-1 fs-3 text-blue">INTEGRITY</h4>
                                    <h5 className="mb-3 fs-5">We don’t compromise. We don’t take shortcuts, even if it means taking that extra moment to do something right.</h5>
                                </Col>
                                <Col md={4} className="my-3 px-2 text-center">
                                    <img className="mb-2" width="76" height="76" src={vision04} />
                                    <h4 className="mb-1 fs-3 text-blue">PURPOSE-DRIVEN</h4>
                                    <h5 className="mb-3 fs-5">A clear sense of purpose informs everything we do. We are not superfluous in logic, design and communication.</h5>
                                </Col>
                                <Col md={4} className="my-3 px-2 text-center">
                                    <img className="mb-2" width="76" height="76" src={vision05} />
                                    <h4 className="mb-1 fs-3 text-blue">ORIGINALITY</h4>
                                    <h5 className="mb-3 fs-5">We create solutions that subvert common perception. We are original in idea and execution.</h5>
                                </Col>
                                <Col md={4} className="my-3 px-2 text-center">
                                    <img className="mb-2" width="76" height="76" src={vision06} />
                                    <h4 className="mb-1 fs-3 text-blue">TRANSPARENCY</h4>
                                    <h5 className="mb-3 fs-5">With a core team of media professionals & journalists, we’re highly committed to the greatest levels of transparency in both our professional and personal lives.</h5>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
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
                                <source src="https://api.xircls.com/static/images/website-slide/videos/xircls_in_three_words7.mp4" type="video/mp4" />

                            </video>
                        </div>
                    </div>
                </Modal>
                <SignSection />
                <Footer />
            </div>

        </>
    )
}

export default VisionMission