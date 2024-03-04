import React from 'react'
import { Card, Col, Container, Row } from 'reactstrap'


import FaqComponent from '@src/views/main/components/Faq/FaqComponent'

//  navbar
import Footer from '@src/views/main/utilities/footer/Footer'
import Navbar from '@src/views/main/utilities/navbar/Navbar'
import SubNavbar from '@src/views/main/utilities/navbar/SubNavbar'

// icons 
import { AiOutlineSolution, AiTwotoneShop } from 'react-icons/ai'
import { BiCookie, BiLineChart, BiRightArrowAlt } from 'react-icons/bi'
import { FaRegNewspaper } from 'react-icons/fa'
import { FaMoneyBillTransfer } from 'react-icons/fa6'
import { GiTakeMyMoney } from 'react-icons/gi'
import { MdDeveloperMode, MdWifiTethering } from 'react-icons/md'
import { PiHandshakeFill } from 'react-icons/pi'
import { SiGooglemarketingplatform } from 'react-icons/si'
// components 
import CardLeft from '@src/views/main/components/CardLeft'
import { Link } from 'react-router-dom'
// data 
const whoPartners = [
    {
        title: "Web Developers",
        icon: <MdDeveloperMode />,
        desc: "Who can offer XIRCLS integrations as value additions in their tech stack."
    },
    {
        title: "Marketing Agencies",
        icon: <SiGooglemarketingplatform />,
        desc: "Who want to recommend XIRCLS solutions to their clients."
    },
    {
        title: "Startup Communities",
        icon: <AiTwotoneShop />,
        desc: "Such as incubators & accelerators who wish to offer startups a sustainable way to kickstart revenue generations."
    },
    {
        title: "Publishers & Influencer",
        icon: <FaRegNewspaper />,
        desc: "Interested in earning commission by referring their audience."
    },
    {
        title: "Other Solution Providers",
        icon: <AiOutlineSolution />,
        desc: "Such as resellers, consultancies who offer consulting & implementation services"
    }
]
const whyPartners = [
    {
        title: "Instant Trust",
        icon: <PiHandshakeFill />,
        desc: "Boost your credibility with an industry-transforming martech company that consistently launches innovative marketing solutions."
    },
    {
        title: "Scale & Grow",
        icon: <BiLineChart />,
        desc: "Expand your business by offering XIRCLS solutions to existing & new customers, thereby attracting new business opportunities."
    },
    {
        title: "Industry-Leading Commissions",
        icon: <GiTakeMyMoney />,
        desc: "Earn upto 20% commission per sale on first & recurring sales."
    },
    {
        title: "Extended Cookie Life",
        icon: <BiCookie />,
        desc: "Get paid for any visitor who makes a purchase within 120 days of clicking on your affiliate link."
    },
    {
        title: "Earn in Multiple Currencies",
        icon: <FaMoneyBillTransfer />,
        desc: "Earn sales commissions in the currencies that your clients purchase our plans in. Set up a global revenue stream."
    },
    {
        title: "Remote-First Culture",
        icon: <MdWifiTethering />,
        desc: "Our team is accustomed to working with partners across the globe. Stay connected to us no matter where you are."
    }

]
// s7
const steps = [
    {
        title: "Sign up",
        desc: "While anyone can become a XIRCLS partner, a successful partner will have a client base/audience who need powerful yet simple martech solutions to scale their sales & establish a lasting brand name."
    },
    {
        title: "Spread the word",
        desc: "Begin sharing affiliate links and track performance from your own dashboard. We will support you with product demos, training manuals and other helpful resources to get you going."
    },
    {
        title: "Earn!",
        desc: "Earn 30% lifetime commission for every paying customer on XIRCLS through your affiliate links."
    }
]
// faq data
const faqData = [
    {
        q: "Are there any deposits or fees that I have to pay?",
        a: "There is no deposit, fee or investment of any kind. You can simply sign up and get going!"
    },
    {
        q: "Do I need to relocate? / Where is this opportunity based?",
        a: "There is no fixed location! You can be a XIRCLS Partner right where you are, ANYWHERE in the world."
    },
    {
        q: "Will I have to commit a fixed number of hours or meet any minimum sales targets?",
        a: "There is no time commitment. You decide the number of hours you want to put in! There are no minimum sales targets to be met. However, if there is no activity from your end for 60 days, your partner account access will be revoked."
    },
    {
        q: "Will you give me qualified leads to follow up on?",
        a: "We expect our partners to tap into their own network to identify & convert leads into sales."
    },
    {
        q: "Will I receive any training and/or support?",
        a: "Absolutely. All partners will be given online training & documentation. Our team will also offer assistance with sales queries, onboarding & integration issues during the first few months."
    },
    {
        q: "How are referrals tracked?",
        a: "Once you become a XIRCLS partner, you will receive access to our partner dashboard where you can manage your affiliate referral links and track performance. Our tracking cookie window is 30 days."
    },
    {
        q: "What information can I track about my referrals?",
        a: "You can track your total referrals and those who have successfully purchased a paid plan. For privacy reasons, you cannot track the revenue of a specific merchant."
    },
    {
        q: "What is the commission process?",
        a: "Your affiliate link has a 30-day cookie window, which is activated after someone clicks your link. If that person signs up, and ultimately becomes a paying subscriber, you'll earn a 20% commission in the month following the month where they subscribed. No commissions are given for referrals that don't purchase, request a refund, or have their payment rejected or charged back."
    },
    {
        q: "How will payouts work?",
        a: "Payouts happen on the 1st of the month, and will happen NET-45 i.e. you'll receive a payout on the 1st of the month 30-day refund policy. There is a minimum payout of $50 to receive your commissions. after at least 45 days have passed since your referral became a paying customer.This delay is to account for our"
    }
]


export default function Partner() {
    return (
        <div className='partnerPage' style={{ background: "#fff" }}>


            {/* <Navbar position={'notFixed'} /> */}
            {/* <SubNavbar navTitle="partners" /> */}

            {/* section 1 */}
            <div className=' d-flex  flex-column justify-content-center mt160 '  >
                <h1 className='display-1 text-center main-heading fw-bolder  lh-83' > Leverage Your Network. <br />
                    Earn Recurring Revenue. </h1>
                <h1 className=' mt-1 text-center text-black fw-bold px-1 '>Grow your business while you hello your audience grow theirs.<br /><span className='text-black fw-bolder'> Earn a 20% commission every time </span>your referrals buy from us. </h1>
            </div>
            {/* section 2 */}
            <div>
                <Row className='justify-content-center mt160'>
                    <Col xs="10" >
                        <Row className='text-start match-height  justify-content-between m-auto'>
                            <Col lg="4" md="6" className=' d-flex justify-content-center align-items-center mb-2 mb-md-0'>
                                <div >
                                    <h4 className='display-5 fw-bolder main-heading ' >Who can become a XIRCLS partner ?</h4>
                                </div>
                            </Col>
                            {
                                whoPartners.map((data, index) => {
                                    return (
                                        <Col lg="4" md="6" className='' key={index}>
                                            <CardLeft icon={data.icon} title={data.title} desc={data.desc} />
                                        </Col>
                                    )
                                })
                            }
                        </Row>


                        {/* // section 3 */}
                        <div className='m-auto text-center  mt180'>
                            <h2
                                className='display-2 text-center main-heading fw-bolder'>
                                Your Network, Our Ideal Audience
                            </h2>

                            <Row className='match-height  py-2 d-flex justify-content-center px- px-md-0  px-sm-0' >
                                <Col md="6" lg="3"  >
                                    <Card className='border-dark shadow-none rounded-pill  py-1 m-0 mt-2 d-flex justify-content-center align-items-center  '>
                                        <h3 className='fs-3 text-center text-black m-0 '>Small Business Owners</h3>
                                    </Card>
                                </Col>
                                <Col md="6" lg="3"  >
                                    <Card className='border-dark shadow-none rounded-pill  py-1 m-0 mt-2 d-flex justify-content-center align-items-center '>
                                        <h3 className='fs-3 text-center text-black m-0 '>Reputed Brands</h3>
                                    </Card>
                                </Col>
                                <Col md="6" lg="3"  >
                                    <Card className='border-dark shadow-none rounded-pill  py-1 m-0 mt-2 d-flex justify-content-center align-items-center '>
                                        <h3 className='fs-3 text-center text-black m-0 '>Publications</h3>
                                    </Card>
                                </Col>
                                <Col md="6" lg="3"  >
                                    <Card className='border-dark shadow-none rounded-pill  py-1 m-0 mt-2 d-flex justify-content-center align-items-center '>
                                        <h3 className='fs-3 text-center text-black m-0 '>Ad & Media Agencies</h3>
                                    </Card>
                                </Col>
                                <Col md="6"  lg="5" xl="4" >
                                    <Card className='border-dark  shadow-none rounded-pill py-1 m-0 mt-2 d-flex justify-content-center align-items-center  '>
                                        <h3 className='fs-3 text-center  text-black m-0 '>Infrastructure & Utilities Companies</h3>
                                    </Card>
                                </Col>
                                <Col md="6"  lg="5" xl="4" >
                                    <Card className='border-dark shadow-none rounded-pill  py-1 m-0 mt-2 d-flex justify-content-center align-items-center '>
                                        <h3 className='fs-4 text-center text-black m-0 '>Financial Services</h3>
                                    </Card>

                                </Col>
                            </Row>
                        </div>

                        {/* section 4 */}
                        <div className=' text-center mt180'>
                            <h2 className='display-2 text-center main-heading fw-bolder'>
                                Why Become a XIRCLS Partner?
                            </h2>

                            <Row className='text-start match-height mt-1  '>
                                {
                                    whyPartners.map((data, index) => {
                                        return (
                                            <Col lg="4" md="6" className='' key={index}>
                                                <CardLeft icon={data.icon} title={data.title} desc={data.desc} />
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        </div>

                        {/* section 5 */}
                        <Row className=' justify-content-start  mt170'>
                            <h3 className='display-1  main-heading fw-bolder'>Always Stay in  ‘Earning Mode’</h3>
                            <Col lg="7" className=' p-0 '>
                                <h1 className='fs-1 ms-1 main-heading lh-32  '>Your affiliate links are yours to share - on your website, social media,
                                    visiting cards... anywhere you want. Link it and leave it!</h1>
                            </Col>
                        </Row>

                    </Col>
                </Row>
            </div>
            {/* section6 */}

            <div className='section8Test d-flex flex-column justify-content-center align-items-center mt190 p-0 p-sm-5' style={{ background: "#000" }}>
                <div>
                    <Row className='justify-content-center '>
                        <Col xs="10" md="12" xl="11">
                            <h1 className='display-1 fw-bolder mt-3 text-white text-start lh-sm ' >Get the <br />XIRCLS Partner <br /> Advantage.</h1>
                            <Row className='match-height mt-2 '>
                                <Col lg="6" md="6" className=''>
                                    <Card className=' border-none  shadow-none  d-flex flex-column p-1 justify-content-start align-items-start' style={{ background: "#000", border: 'none' }}>
                                        <h4 className=' fs-2  fw-lig w-75 text-light' >Performing at the highest degree possible, these are the common traits reps accepted to XIRCLS have in common.</h4>
                                        <Link to="/contact-us" className=' btn  btn-lg main-btn-white fw-bolder  mt-3 px-3 py-1'> Apply Now</Link>
                                        <div className='ms-auto arrow' >
                                            <img className='d-none d-lg-block ' src="https://uploads-ssl.webflow.com/5fac11c3554384e2baf6481c/61fa78aa61452b33bdbd7c9c_Arrow_01.svg" alt="" width={220} style={{ position: "relative", top: '-30px', left: "40px" }} />
                                        </div>
                                    </Card>
                                </Col>
                                <Col lg="6" md="6" >
                                    <Card className=' border-none   shadow-none  d-flex flex-column p-1 justify-content-end align-items-center mt-2' style={{ background: "#000", border: 'none' }}>
                                        <ul className='d-flex flex-column gap-3'>
                                            <li className='d-flex align-items-center gap-3' ><img src="https://uploads-ssl.webflow.com/5fac11c3554384e2baf6481c/61fa78aa67d329961f45979f_check-icon.svg" alt="" srcSet="" width={40} /><h4 className='fs-1 text-white fw-lig m-0'>No Sign-up Costs</h4></li>
                                            <li className='d-flex align-items-center gap-3' ><img src="https://uploads-ssl.webflow.com/5fac11c3554384e2baf6481c/61fa78aa67d329961f45979f_check-icon.svg" alt="" srcSet="" width={40} /><h4 className='fs-1 text-white fw-lig m-0'>Track Performance</h4></li>
                                            <li className='d-flex align-items-center gap-3' ><img src="https://uploads-ssl.webflow.com/5fac11c3554384e2baf6481c/61fa78aa67d329961f45979f_check-icon.svg" alt="" srcSet="" width={40} /><h4 className='fs-1 text-white fw-lig m-0'>First Access</h4></li>
                                            <li className='d-flex align-items-center gap-3' ><img src="https://uploads-ssl.webflow.com/5fac11c3554384e2baf6481c/61fa78aa67d329961f45979f_check-icon.svg" alt="" srcSet="" width={40} /><h4 className='fs-1 text-white fw-lig m-0'>Comprehensive Support</h4></li>
                                        </ul>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>


            {/* section 7 */}
            <div>
                <Row className='justify-content-center  mt170'>
                    <Col xs="10" md="12" xl="10">
                        <div className='text-center'>
                            <h2 className='display-2 text-center main-heading fw-bolder'  > How it Works! </h2>
                            <h1 className='text-black ' >While anyone can become a XIRCLS partner,<br /> to be a successful partner you must: <span className='SelectBlack' style={{ color: "#000" }}>Three simple steps</span>.</h1>
                        </div>
                        <Row className="mt-3 lh-32 justify-content-center px-3 " >
                            {
                                steps.map((data, index) => (
                                    <Col lg="4" className='mt-2 px-2' key={index}>
                                        <div className='d-flex  align-items-center fs-3 text-black'>Step {index + 1}  <BiRightArrowAlt /><span className='fs-1 fw-bolder ms-1 main-heading' > {data.title}</span></div>
                                        <hr style={{ background: "#D0D4CA", width: "97%" }} />
                                        <div><h2 className='fs-3 text-black mt-1 lh-32'>{data.desc}</h2></div>
                                    </Col>
                                ))
                            }
                        </Row>
                        <div className='text-center mt-1 mt-sm-0'>
                            <Link to="/contact-us" className=' btn  btn-lg main-btn-dark fs-3 mt-3 '> Start for Free</Link>
                        </div>
                    </Col>
                </Row>
            </div>

            {/* faQ */}
            <div className="mt170">

                <FaqComponent data={faqData} name='partner' theme="theme-white" />
            </div>

            {/* banner */}
            <div>
                <Row className='justify-content-center  mt170'>
                    <Col xs="12" md="12" xl="11">
                        <Card className=' p-2 p-md-5 border shadow-none' style={{ background: "#e5e7eb" }}>
                            <div>
                                <h1 className='mainHeader display-2 main-heading fw-bolder m-0 mt-2'>
                                    Start Earning <br /> Today
                                </h1>
                                <h1 className='text-black mt-2 fs-1'>
                                    Earn upto <span className='text-warning fw-bolder'>20% commission</span> <br /> for every XIRCLS product purchase.
                                </h1>
                                <br />
                                <Row className=''>
                                    <Col className='mb-2' xs="10" md="7" xl="6">
                                        <div className='d-flex gap-2 flex-wrap'>
                                            <Link to='/contact-us' className='btn main-btn-black btn-lg fs-3 px-3 py-1 '>Get Started</Link>
                                            <Link to='/contact-us' className='btn main-btn-dark btn-lg  fs-3 px-3 py-1' >Speak with our team</Link>
                                        </div>
                                    </Col>
                                    <Col xs="12" md="4  " xl="6" className='text-end d-none'>
                                        <Link to='/contact-us' className=' text-black fw-bold fs-3' style={{ boxShadow: 'none' }}>Sign up as a XIRCLS Partner<BiRightArrowAlt /></Link>
                                        
                                    </Col>

                                </Row>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>


            <hr className='mt100' />
            <Footer />


        </div >
    )
}
