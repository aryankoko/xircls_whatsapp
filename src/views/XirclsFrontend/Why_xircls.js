import React from "react"
import { Container, Row, Col } from 'react-bootstrap'
import { AiFillCaretRight } from 'react-icons/ai' 
import imgbanner from '@src/assets/images/website-slide/why_xircls/xircls_why-xircls_02.jpg'
import image1 from '@src/assets/images/website-slide/why_xircls/xircls_why-xircls_03.jpg'
import image2 from '@src/assets/images/website-slide/why_xircls/xircls_why-xircls_01.jpg'
import image3 from '@src/assets/images/website-slide/why_xircls/xircls_why-xircls_04.jpg'
import image4 from '@src/assets/images/website-slide/why_xircls/xircls_why-xircls_05.jpg'
import image5 from '@src/assets/images/website-slide/why_xircls/xircls_why-xircls_15.jpg'
import image6 from '@src/assets/images/website-slide/why_xircls/xircls_why-xircls_06.jpg'
import image7 from '@src/assets/images/website-slide/why_xircls/xircls_why-xircls_07.jpg'
import image8 from '@src/assets/images/website-slide/why_xircls/xircls_why-xircls_08.jpg'
import image9 from '@src/assets/images/website-slide/why_xircls/xircls_why-xircls_09.jpg'
import image10 from '@src/assets/images/website-slide/why_xircls/xircls_why-xircls_10.jpg'
import image11 from '@src/assets/images/website-slide/why_xircls/xircls_why-xircls_11.jpg'
import image12 from '@src/assets/images/website-slide/why_xircls/xircls_why-xircls_12.jpg'
import image13 from '@src/assets/images/website-slide/why_xircls/xircls_why-xircls_13.jpg'
import image14 from '@src/assets/images/website-slide/why_xircls/xircls_why-xircls_14.jpg'
import Footer from "./base/Footer"
import logo2 from "./base/assets/logo12.jpg"
import { Link } from 'react-router-dom'


const WhyXircls = () => {
    return (
        <div className="products">
            <Container className='px-md-5 pb-6'>
                <Row className='pt-2  pb-1'>
                    <Col md={12} className="text-center mx-auto">
                        <img src={logo2} className="page-logo" />
                        <h1 className="my-2 main-font text-dark fw-bold">Why <span className="text-blue">XIRCLS?</span></h1>
                        <h3 className='third-font lh-base mb-1'>
                            We are a global movement to decentralize online marketing<br />
                            practices and transfer power back from a few to the<br />
                            millions of businesses that actually run the world.
                        </h3>
                    </Col>
                </Row>
            </Container>
            <Container className="py-6">
                <Row className="text-center">
                    <Col md={12}>
                        <h2 className="second-font mb-1">
                            Every business in the world <br />
                            obsesses daily over two fundamentals:
                        </h2>
                        <h2 className="second-font mb-1">
                            1. <span className="text-blue">Customer Acquisition</span> 2. <span className="text-blue">Customer Retention</span>
                        </h2>
                        <h5 className="fifth-font mb-1">
                            Ironically, companies have little control over their marketing activity aims <br />
                            to fulfill these fundamentals.
                        </h5>
                        <h5 className="fifth-font mb-1">
                            Instead, they must trust the platforms they advertise on to deliver their message <br />
                            to the right audience at the right time.
                        </h5>
                        <h5 className="fifth-font mb-1">
                            XIRCLS is the world’s first decentralized, collaborative marketing platform that, for the first time, <br />
                            <u>
                                has eliminated the need for companies to trust and be wholly dependent on a third party <br />
                                to secure their financial future.
                            </u>
                        </h5>
                    </Col>
                </Row>
            </Container>
            <Container fluid className="py-6">
                <Row>
                    <Col md={6} className="team-img right-order" style={{ backgroundImage: `url(${imgbanner})` }} >
                    </Col>
                    <Col md={6} className="p-md-5">
                        <Container className="p-md-5">
                            <Row className="py-3">
                                <Col md={12}>
                                    <h3 className="third-font p-md-1" style={{lineHeight: "1.6"}}>
                                        XIRCLS offers an alternative to current advertising & marketing practices with a global, virtual network for online and offline companies to collaborate and market to each other's customers.
                                    </h3>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
            <Container className="py-6">
                <Row className="text-center">
                    <Col md={12}>
                        <h2 className="second-font mb-2">
                            <span className="text-blue">XIRCLS</span> is a countermeasure to bring <br />
                            power back into the hands of the millions <br />
                            of <span className="text-blue">businesses</span> that actually run <span className="text-blue">the world</span>.
                        </h2>
                        <h5 className="fifth-font mb-2">
                            We’re going back to the values of the free internet by empowering companies <br />
                            around the world to market to each others’ customers on their own terms. Without sharing customer data.
                        </h5>
                        <h5 className="fifth-font">
                            By replacing greed and fear with a sense of ease and community in the way business gets done, <br />
                            we want to fundamentally change the way companies work to achieve their marketing goals.
                        </h5>
                    </Col>
                </Row>
            </Container>
            <Container className="py-6 my-6">
                <Row className="text-center">
                    <Col md={12}>
                        <h2 className="second-font mb-2">
                            We’ve been <span className="text-blue">helping businesses</span> navigate <br />
                            their own course in a highly manufactured <br />
                            ad environment for over <span className="text-blue">two decades</span>.
                        </h2>
                        <h5 className="fifth-font mb-2">
                            XIRCLS is the outcome of the founding team’s 20+ years of experience as advertising, <br />
                            communications & marketing tech professionals.
                        </h5>
                        <h5 className="fifth-font">Meet the team <a className="text-blue" href="">here</a>.</h5>
                    </Col>
                </Row>
            </Container>
            <Container className="py-6 my-6">
                <Row className="text-center">
                    <Col md={12}>
                        <h2 className="second-font mb-2">
                            <span className="text-blue">XIRCLS</span> is not new. <span className="text-blue">It’s eternal</span>.
                        </h2>
                        <h5 className="fifth-font mb-3">
                            It is our attempt at building technology that doesn’t just reinvent marketing but is an expression of life itself.
                        </h5>
                        <h5 className="fifth-font mb-3">
                            Everything in life is connected to each other, often in ways we don't know (yet).
                        </h5>
                        <h5 className="fifth-font mb-3">
                            XIRCLS is the physical manifestation of this universal connectedness of things. <br />
                            It is the line connecting two points anywhere in the world, no matter what those points are.
                        </h5>
                        <h5 className="fifth-font mb-3">
                            We visualize XIRCLS to be the start of a collaborative, transparent world not just in marketing & business <br />
                            but the way we live our lives. Come join us on this journey.
                        </h5>
                    </Col>
                </Row>
            </Container>
            <Container fluid className="py-6 my-5">
                <Row className="mb-4">
                    <div className="team-img col-lg-6 col-12 min-vh-50 min-vh-md-100 " style={{ backgroundImage: `url(${image1})` }}>
                    </div>
                    <Col md={6} className='p-md-5'>
                        <Container className="p-md-5">
                            <Row className="py-3">
                                <div className="col-md-12 px-4">
                                    <div className="p-2 w-100">
                                        <h3 className="third-font mb-2">1. No More Targeting Anonymous Users.</h3>
                                        <h6 className="sixth-font lh-small">
                                            If you’ve long been suspecting the authenticity of your online marketing reach, XIRCLS is for you. When you collaborate with genuine companies accepting payments from your target customer base, you know your marketing message is reaching a genuine human being, not a bot.
                                        </h6>
                                    </div>
                                </div>
                            </Row>
                        </Container>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col md={6} className="team-img right-order" style={{ backgroundImage: `url(${image2})` }}>
                    </Col>
                    <Col md={6} className='p-md-5'>
                        <Container className="p-md-5">
                            <Row className="p-3">
                                <Col md={12}>
                                    <div className="p-2 w-100">
                                        <h3 className="third-font mb-2">2. No More Blind Ads and Offers.</h3>
                                        <h6 className="sixth-font lh-small mb-2">
                                            What is the real impact of an ‘impression’? How do you verify if your offer was redeemed by a genuine customer? These are questions you no longer need to ask.
                                        </h6>
                                        <h6 className="sixth-font lh-small mb-2">
                                            With XIRCLS, make every marketing dollar count! Accurately track partner customer engagement such as email opens and clicks on your marketing messages and offer redemptions.
                                        </h6>
                                        <h6 className="sixth-font lh-small mb-2">
                                            Note: XIRCLS shows you engagement on your marketing messages via partner companies without sharing customer data.
                                        </h6>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col md={6} className="team-img" style={{ backgroundImage: `url(${image3})` }}>
                    </Col>
                    <Col md={6} className='p-md-5'>
                        <Container className="p-md-5">
                            <Row className="p-3">
                                <Col md={12}>
                                    <div className="p-2 w-100">
                                        <h3 className="third-font mb-2">3. Freedom from Third-party Platforms</h3>
                                        <h6 className="sixth-font lh-small mb-2">
                                            Stop actively driving your customers to your competitors on third-party delivery & coupon platforms!
                                        </h6>
                                        <h6 className="sixth-font lh-small ">
                                            XIRCLS is a peer-to-peer marketing platform where you can directly reach your target audience without sharing the stage with your competitors, engaging in discount wars or paying hefty commissions.
                                        </h6>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col md={6} className="team-img right-order" style={{ backgroundImage: `url(${image4})` }}>
                    </Col>
                    <Col md={6} className='p-md-5'>
                        <Container className="p-md-5">
                            <Row className="p-3">
                                <Col md={12}>
                                    <div className="p-2 w-100">
                                        <h3 className="third-font mb-2">4. Protect Customer Data</h3>
                                        <h6 className="sixth-font lh-small">
                                            Take a stand against unethical data sharing practices. Lead your partners’ customers directly to your website and keep their data 100% secure.
                                        </h6>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col md={6} className="team-img" style={{ backgroundImage: `url(${image5})` }}>
                    </Col>
                    <Col md={6} className='p-md-5'>
                        <Container className="p-md-5">
                            <Row className="p-3">
                                <Col md={12}>
                                    <div className="p-2 w-100">
                                        <h3 className="third-font mb-2">5. Prepare For a Cookie-Less Future</h3>
                                        <h6 className="sixth-font lh-small mb-2">
                                            Cookie-based advertising is on its way out, impacting the ability of advertisers to deliver targeted messages and track engagement.
                                        </h6>
                                        <h6 className="sixth-font lh-small ">
                                            Stay ahead of the curve. Direct high-quality, inbound traffic directly from partner companies.
                                        </h6>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col md={6} className="team-img right-order" style={{ backgroundImage: `url(${image6})` }}>
                    </Col>
                    <Col md={6} className='p-md-5'>
                        <Container className="p-md-5">
                            <Row className="p-3">
                                <Col md={12}>
                                    <div className="p-2 w-100">
                                        <h3 className="third-font mb-2">6. Set Your Own Terms</h3>
                                        <h6 className="sixth-font lh-small">
                                            Choose your partners, customize marketing messages by partner audience types, give out discounts you’re comfortable with, create separate sets of offers for new customer acquisition and retention & more!
                                        </h6>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col md={6} className="team-img" style={{ backgroundImage: `url(${image7})` }}>
                    </Col>
                    <Col md={6} className='p-md-5'>
                        <Container className="p-md-5">
                            <Row className="p-3">
                                <Col md={12}>
                                    <div className="p-2 w-100">
                                        <h3 className="third-font mb-2">7. Collaborate with Like-minded Businesses</h3>
                                        <h6 className="sixth-font lh-small mb-2">
                                            Discover affinity partner companies on the XIRCLS network or invite them to partner with you.
                                        </h6>
                                        <h6 className="sixth-font lh-small mb-2">
                                            For example, a customer just bought from your clothing store? Gift her offers from businesses that sell fashion accessories & footwear!
                                        </h6>
                                        <h6 className="sixth-font lh-small">
                                            Are you a WooCommerce store that sells vegan makeup? Partner with other vegan businesses in categories like fashion, food & groceries.
                                        </h6>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col md={6} className="team-img right-order" style={{ backgroundImage: `url(${image8})` }}>
                    </Col>
                    <Col md={6} className='p-md-5'>
                        <Container className="p-md-5">
                            <Row className="p-3">
                                <Col md={12}>
                                    <div className="p-2 w-100">
                                        <h3 className="third-font mb-2">8. Market Precisely</h3>
                                        <h6 className="sixth-font lh-small">
                                            XIRCLS gives you precision targeting like never before. Via your partners, instantly reach out to your ideal customer base with exclusive offers they can’t refuse!
                                        </h6>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col md={6} className="team-img" style={{ backgroundImage: `url(${image9})` }}>
                    </Col>
                    <Col md={6} className='p-md-5'>
                        <Container className="p-md-5">
                            <Row className="p-3">
                                <Col md={12}>
                                    <div className="p-2 w-100">
                                        <h3 className="third-font">9. Keep your customers in a Perpetual Rewards Loop!</h3>
                                        <h6 className="sixth-font lh-small mb-2">
                                            Reward every purchase at your website or store with partner offers. At zero cost to you. Perpetually! Run a 24/7, 365-day loyalty program where other businesses pay to reward your customers.
                                        </h6>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col md={6} className="team-img right-order" style={{ backgroundImage: `url(${image10})` }}>
                    </Col>
                    <Col md={6} className='p-md-5'>
                        <Container className="p-md-5">
                            <Row className="p-3">
                                <Col md={12}>
                                    <div className="p-2 w-100">
                                        <h3 className="third-font mb-2">10. Multiply Reach</h3>
                                        <h6 className="sixth-font lh-small">
                                            As you grow your partner network on XIRCLS, exponentially increase your marketing reach. Let every purchase at a partner’s be an acquisition moment for you!
                                        </h6>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col md={6} className="team-img" style={{ backgroundImage: `url(${image11})` }}>
                    </Col>
                    <Col md={6} className='p-md-5'>
                        <Container className="p-md-5">
                            <Row className="p-3">
                                <Col md={12}>
                                    <div className="p-2 w-100">
                                        <h3 className="third-font">11. Get Incredible ROIs</h3>
                                        <h6 className="sixth-font lh-small mb-2">
                                            Collaborative marketing is far more effective and with higher ROIs compared to your regular online marketing activities. Companies on the XIRCLS network currently see ROIs that exceed industry standards!
                                        </h6>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col md={6} className="team-img right-order" style={{ backgroundImage: `url(${image12})` }}>
                    </Col>
                    <Col md={6} className='p-md-5'>
                        <Container className="p-md-5">
                            <Row className="p-3">
                                <Col md={12}>
                                    <div className="p-2 w-100">
                                        <h3 className="third-font mb-2">12. Elevate your Brand Image</h3>
                                        <h6 className="sixth-font lh-small">
                                            Reap the rewards of the company you keep! When allied / affinity companies keep recommending you to their customers, you create new brand associations in the minds of your target audience.
                                        </h6>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col md={6} className="team-img" style={{ backgroundImage: `url(${image13})` }}>
                    </Col>
                    <Col md={6} className='p-md-5'>
                        <Container className="p-md-5">
                            <Row className="p-3">
                                <Col md={12}>
                                    <div className="p-2 w-100">
                                        <h3 className="third-font">13. Go Beyond Generic Discounts. Give Meaningful Value.</h3>
                                        <h6 className="sixth-font lh-small mb-2">
                                            Delight your customers with timely discounts on partner products/services that go perfectly with what they just purchased with you or suits their lifestyle.
                                        </h6>
                                        <h6 className="sixth-font lh-small mb-2">
                                            For example, a customer just bought from your clothing store? Gift her offers from businesses that sell fashion accessories & footwear!
                                        </h6>
                                        <h6 className="sixth-font lh-small mb-2">
                                            Are you a store that sells vegan makeup? Partner with other vegan businesses in categories like fashion, food & groceries.
                                        </h6>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col md={6} className="team-img right-order" style={{ backgroundImage: `url(${image14})` }}>
                    </Col>
                    <Col md={6} className='p-md-5'>
                        <Container className="p-md-5">
                            <Row className="p-3">
                                <Col md={12}>
                                    <div className="p-2 w-100">
                                        <h3 className="third-font mb-2">14. Adopt an Always-On Approach</h3>
                                        <h6 className="sixth-font lh-small">
                                            No more stop-start marketing campaigns. Run a year-long loyalty program while also acquiring high-quality customers from your partners. Read more about Infiniti <a href="" className="text-blue">here</a>.
                                        </h6>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
            <Container className="py-6">
                <Row className="text-center">
                    <Col md={12}>
                        <h2 className="second-font mb-2">
                            <span className="text-blue">Join</span> a collaborative marketing <span className="text-blue">movement.</span>
                        </h2>
                        <h4 className="fourth-font">
                            Adapt to the global transition from an advertising- <br />
                            led internet to a <u className="underline-5 underline-blue" >transaction-led internet.</u>
                        </h4>
                    </Col>
                </Row>
            </Container>
            <Container fluid className="pt-5">
                <Row style={{ backgroundColor: "#2e82cb" }}>
                    <Col md={12} className="text-dark text-center text-md-right sign_up d-flex justify-content-center align-items-center">
                        Join the XIRCLS network! <a href="#" className="ms-1  " style={{ color: 'white', fontWeight: 'lighter' }}>
                        <Link to='/merchant/signup' className='text-white'> 
                            <u>  Sign up here.</u>
                        </Link>
                        </a>
                        <AiFillCaretRight size={30} />
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    )
}

export default WhyXircls