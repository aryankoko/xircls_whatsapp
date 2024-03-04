import React from 'react'
import { Col, Row, Container } from 'reactstrap'
import Navbar from '@src/views/main/utilities/navbar/Navbar'
import Footer from '@src/views/main/utilities/footer/Footer'
import { BsHeart, BsReverseLayoutTextSidebarReverse, BsHandThumbsUp, BsInboxes } from "react-icons/bs"
import { Link } from 'react-router-dom'

export default function Sniper() {
    const happydata = [
        {
            icon: <BsHeart size={50} color='black' />,
            title: "Tap into the ‘retail golden hour’!",
            desc: 'Engage customers right in the middle of their post-purchase dopamine rush!'
        },
        {
            icon: <BsReverseLayoutTextSidebarReverse size={50} color='black' />,
            title: "Get personally recommended.",
            desc: 'Nothing can have a greater impact than being recommended by a company that the customer already trusts!'
        },
        {
            icon: <BsHandThumbsUp size={50} color='black' />,
            title: "Make them feel they’ve earned your offer.",
            desc: 'Deliver your marketing message right after the order confirmation email that they’re waiting to receive.'
        },

        {
            icon: <BsInboxes size={50} color='black' />,
            title: "Hit their inboxes when they’re sure to be looking!",
            desc: 'Since customers receive your offer as a reward for their spend at another business, they’re more likely to redeem it.'
        }
    ]

    const choiceData = [
        {
            icon: <BsHeart size={50} color='white' />,
            img: "https://api.xircls.com/static/images/website-slide/sn5.jpg",
            title: 'Reach active customer inboxes via your partners.',
            desc: 'Leverage the power of collaboration to gain an edge in your email marketing efforts. Hit an inbox when it’s most likely to be open and engaged with.'
        },
        {
            icon: <BsHeart size={50} color='white' />,
            img: "https://api.xircls.com/static/images/website-slide/sn6.jpg",
            title: 'Get personally recommended by partner companies.',
            desc: 'Nothing beats word-of-mouth marketing. Especially when it’s another business that vouches for you.'
        },
        {
            icon: <BsHeart size={50} color='white' />,
            img: "https://api.xircls.com/static/images/website-slide/sn7.jpg",
            title: 'Stop fighting for mindspace. Lock your competition out.',
            desc: 'Don’t worry about competition stealing the spotlight. We ensure that no two competing brands market to the same customer at one time.'
        }
    ]
    return (
        <div style={{ background: "#fff" }} >

            {/* <Navbar /> */}

            {/* section 1 */}
            <div className='  text-center  '  >
                <h1 className='display-1  main-heading fw-bolder  mt240 lh-83 '>
                    Everyone's Customers<br /> Are Now Yours!
                </h1>
                <h1 className='text-center text-black  ' >Precisely Reach Only Your Desired Audience.  While they shop. Nobody Else. </h1>
                <Link to='/merchant/signup' className=' btn  main-btn-blue fs-3 mt-3 fw-lig'>Start a Sniper Campaign</Link>
            </div>

            {/* section 2 */}

            <Row className='mt180 justify-content-center '>
                <Col xs="11" md="10" className='text-center' >
                    <div>
                        <h1 className='display-4  main-heading fw-bolder'>100% Genuine Customer Reach Guaranteed!</h1>
                        <h3 className='fs-1 text-center text-black '>Market to active shoppers, not anonymous users on the internet.</h3>
                    </div>
                    <div className='mt160'>
                        <h1 className='display-4  main-heading fw-bolder'>100% Verification. 0% Fraud</h1>
                        <h1 className='fs-1  text-center text-black   '>A model that eliminates the possibility of fraud or pilferage by middlemen.<br />
                            We guarantee your every marketing dollar is spent to reach a genuine human being, verified in real time by your partners.</h1>
                    </div>
                </Col>
            </Row>

            {/* Section 4 */}
            <div className='p-1 py-3 p-lg-5  mt180' style={{ background: "#e5e7eb" }}>
                <Row className='justify-content-center  text-center '>
                    <Col md="12" lg="11" >
                        <h1 className='display-3  main-heading fw-bolder '>
                            Engage Customers When They Are<br />Ready To Buy
                        </h1>
                        <h3 className='text-black m-0 fs-1 '>Market your brand every time someone buys from a partner company.</h3>
                        <br />
                        <Link to="/merchant/signup" className=" btn  main-btn-blue fs-3 mt-3 fw-lig">Join the Network</Link>
                    </Col>
                </Row>
            </div>

            {/* Section 5 */}
            <Container fluid='sm' className='mt180'>

                <h1 className='display-2  main-heading fw-bolder text-center'>Become Authentic In Your Marketing.</h1>

                <div className='d-flex flex-column  mt-1 text-center'>
                    <h3 className='fs-2 text-center text-black   '>Stay true to your brand and your customers.</h3>
                    <h3 className='fs-2 text-center text-black   '>Collaborate with companies that cater to the same audience as you.</h3>
                    <h3 className='fs-2 text-center text-black   '>Positively engage potential customers when they’re in the same state of mind as your brand voice.</h3>
                    <h3 className='fs-2 text-center text-black   '>Be loyal to your brand’s vision by joining hands with companies that share that same vision.</h3>
                </div>


                <Row className=' justify-content-center '>
                    <Col xs="11"   >
                        {/*  */}
                        <div className=' mt180 px-0 px-lg-5 '>
                            <Row className='d-flex  justify-content-start  align-items-center '>
                                <Col md="4">
                                    <img src="https://api.xircls.com/static/images/website-slide/sn1.jpg" alt="" width={120}  />
                                </Col>
                                <Col md='8'>
                                    <h1 className='main-heading fw-bolder  display-4 '>Real-time match making for businesses.</h1>
                                    <h2 className='text-black lh-32'>Our machine-learning, matchmaking algorithms track customer spending behaviour in real-time to trigger relevant partner offers. This ensures companies on our network effectively reach their target customer profile, every single time.</h2>
                                </Col>
                            </Row>
                            <Row className='d-flex flex-row-reverse    justify-content-end  align-items-center mt170'>
                                <Col md="4">
                                    <img src="https://api.xircls.com/static/images/website-slide/sn2.jpg" alt="" width={120}  />

                                </Col>
                                <Col md='8'>
                                    <h1 className='main-heading fw-bolder  display-4 '>We make profiling and targeting customers easy.</h1>
                                    <h2 className='text-black lh-32'>Partner with companies to reach your target customer base.<br />100% guaranteed.</h2>
                                </Col>
                            </Row>
                            <Row className='d-flex  justify-content-start  align-items-center mt170'>
                                <Col md="4">

                                    <img src="https://api.xircls.com/static/images/website-slide/sn3.jpg" alt="" width={120}  />
                                </Col>
                                <Col md='8'>
                                    <h1 className='main-heading fw-bolder  display-4'>Real-time match making for businesses.</h1>
                                    <h2 className='text-black lh-32'>Get real-time performance reports. <br />Track the outcome of every marketing campaign.</h2>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>


                <Row className='mt180 justify-content-center '>
                    <Col xs="11" lg="11" xl="9"  >
                        <div className='text-center'>
                            <h1 className='main-heading fw-bolder display-2  '>Market to customers when they’re most happy!</h1>
                            <h1 className='text-black mt-0'>Fact: A shopper who has just completed a transaction is in the most receptive mind space.<br />
                                Not browsing, nor researching, or worrying, but ready to spend more.</h1>
                        </div>
                        <Row className='mt-4 justify-content-around '>
                            {/* <Col lg="5" className=' d-flex gap-2  mt-2 flex-row-reverse  align-items-start  justify-content-start'>
                                <div className=' bg-secondary p-1 rounded-circle d-flex  align-items-center  justify-content-center' style={{ minWidth: '50px', minHeight: "50px", maxWidth: '50px', maxHeight: "50px" }}><BsHeart size={50} color='white' /></div>
                                <div className=' text-lg-end'>
                                    <h1 className='main-heading fw-bolder '>Tap into the ‘retail golden hour’!</h1>
                                    <h3 className='text-black'>Engage customers right in the middle of their post-purchase dopamine rush!</h3>
                                </div>
                        </Col> */}
                            {
                                happydata.map((data) => (
                                    <Col lg="6" className=' d-flex gap-2  mt-2   align-items-start  justify-content-start'>
                                        <div className='  p-1 rounded-circle d-flex  align-items-center  justify-content-center' style={{ minWidth: '50px', minHeight: "50px", maxWidth: '50px', maxHeight: "50px", background: "#F4EEEE" }}>{data.icon}</div>
                                        <div className=' text-lg-start'>
                                            <h1 className='main-heading fw-bolder '>{data.title}</h1>
                                            <h2 className='text-black'>{data.desc}</h2>
                                        </div>
                                    </Col>
                                ))
                            }
                        </Row>


                        <div className='mt180 '>
                            <h1 className='main-heading fw-bolder display-2 text-center'>Why Sniper is The Smarter Choice.</h1>

                            <Row className='mt-4 justify-content-center '>
                                <Col lg="4" className='text-center text-lg-end '>
                                    <img src="https://api.xircls.com/static/images/website-slide/sn4.jpg" alt="" width={120} />
                                </Col>
                                <Col lg="8" className=''>
                                    <ul>
                                        <li className='fs-1 text-black'>No wasted expense on bots, fake accounts etc.</li>
                                        <li className='fs-1 text-black'>Enable customers to retrieve your marketing messages at any time,via their inbox</li>
                                        <li className='fs-1 text-black'>Get recommended by partner companies</li>
                                        <li className='fs-1 text-black'>Engage customers when they’re most receptive!</li>
                                        <Link to='/merchant/signup' className='main-btn-black rounded-3  btn-lg btn fs-3 mt-2 px-4 fw-lig'>Signup</Link>
                                    </ul>
                                </Col>
                            </Row>
                        </div>


                    </Col>
                </Row>

                <Row className=' justify-content-center mt180 '>
                    <Col xs="10" lg="12" xl="10"  >
                        <Row className='  justify-content-center  mt-4 '>
                            {
                                choiceData.map((data, index) => {
                                    return (
                                        <Col lg="4" md="6" className='mt-1' key={index}>
                                            <div>
                                                <img src={data.img} alt="" width={80} />
                                                <h1 className='fs-1 main-heading fw-bolder mt-1'>{data.title}</h1>
                                                <h1 className='fs-3 text-black mt-1'>{data.desc}</h1>
                                            </div>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </Col>
                </Row>
            </Container>


            <div className='p-1 py-3 p-lg-5  mt180' style={{ background: "#e5e7eb" }}>

                <Row className='justify-content-center  text-center '>
                    <h1 className='display-2  main-heading fw-bolder '>
                        Market On Fact, Not Assumptions
                    </h1>
                    <Col lg="8"  >
                        <h3 className='text-black  fs-1 mt-1 '>We’ve created the only marketing solution in the world
                            that triggers marketing messages against real customer actions & purchases,
                            verified by partner companies in real-time.</h3>
                    </Col>
                </Row>
            </div>
            <Row className=" justify-content-center mt180 py-5" style={{ background: "#000" }}>
                <Col lg="10" xs="10">
                    <Container fluid='sm'>

                        <Row>
                            <h1 className='display-4  mb-2  text-white fw-lig'>Our Algorithms Find Your Customers, Eliminating The Guesswork.</h1>
                            <Col lg="8" >
                                <div>
                                    <h1 className='fs-2 mt-2 text-white fw-lig'>A lot of your time and money is invested in filtering and engaging your target prospects with zero promise of conversion.</h1>
                                    <h1 className='fs-2 mt-2 text-white fw-lig'>We help you instantly narrow down on your ideal customers, so that you can focus your resources on wooing them right.</h1>
                                </div>
                            </Col>
                        </Row>
                    </Container>

                </Col>
            </Row>

            <Footer />

        </div>


    )
}
