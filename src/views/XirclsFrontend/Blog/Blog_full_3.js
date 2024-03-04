import React from 'react'
import Header from '../base/Header'
import Footer from '../base/Footer'
import { Container, Row, Col } from 'reactstrap'
import { Mail} from 'react-feather'
import { Link } from 'react-router-dom'
import { SiFacebook, SiWhatsapp, SiLinkedin, SiTwitter } from 'react-icons/si'
import BlogHead from './BlogHead'
import BlogFoot from './BlogFoot'

const Blog_full_3 = () => {
    return (
        <div className='products'>
            <Container className='px-md-4 pb-1 pt-5'>
                <BlogHead component='loyalty' />
                <Container fluid className='py-6'>
                        <div style={{ display: `flex`, justifyContent: `center`, alignItems: `center` }}>
                            <img src='https://api.xircls.com/static/images/website-slide/blog/b3.jpg' className='w-100' />
                        </div>
                    </Container>
                    <Row className='mb-1'>
                        <Col md={12}>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>According to <Link to='/' className="text-blue hover-black">recent data</Link>, in just the United States, there are over 4 billion loyalty program memberships, and growing! Moreover, a <span className="fw-bold">whopping <Link to='/' className="text-blue hover-black">86 percent</Link> of American consumers are members of at least one loyalty program.</span> </p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Literally every business that a consumer purchases from has some sort of loyalty building strategy in place. Which begs the question: what is it about your loyalty program that makes it special?</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>When businesses make a strategic decision to be customer-centric, opting for a customer loyalty program is among the first things on their list. </p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>However, loyalty programs have all been viewed from a singular lens for decades now, disregarding the inherent dangers that come with it.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>This is because every standard customer loyalty program <u>fundamentally assumes two things:</u> </p>
                            <ul className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify ps-2 mb-3'>
                                <li>That the cost of running a loyalty program has to be borne by the company itself</li>
                                <li>That all customers are committed to earning loyalty points over a sustained period for the promise of a future reward</li>
                            </ul>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Let’s look at both these assumptions in detail.</p>
                        </Col>
                    </Row>
                    <Row className='mb-3 py-5'>
                        <Col md={12} className='py-1'>
                            <img  src='https://api.xircls.com/static/images/website-slide/blog/b3_img_1.jpg' className='w-100' />
                        </Col>
                    </Row>
                    <Row className='mb-1'>
                        <Col md={12}>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>The biggest danger of running a self-funded loyalty program - where all discounts come from a company’s own pocket - is that you get your customers accustomed to not paying full price, turning a privilege into an expectation. This subsequently de-values your product/service in the eyes of your customer base. Furthermore, since there is no additional value that the business can give their customers over time, the discounts themselves stop being enough.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>And it’s not just a single business being affected. When customers get used to discounts at one business, they begin expecting it everywhere. And what started out as a way for a business to stand out and give a special something to their loyal customers becomes something they HAVE to do as a bare minimum <u>because everyone else does it too</u> . In fact, generic loyalty programs hurt the market value of the entire sector. </p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Points-based loyalty programs are especially misleading to customers. To earn enough points to redeem, customers must keep buying. And when they finally do redeem, the money they supposedly ‘save’ has come from their own pockets. In other words, <u>customers pay for their loyalty to a brand!</u> </p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Then comes another harsh reality from the perspective of companies looking to build loyalty: in today’s world of unlimited choice, a loyal customer is hard to find. Just keeping a loyalty program going can be damaging to small and medium-sized businesses, and doesn’t always guarantee a growing base of loyal customers over time!</p>
                        </Col>
                    </Row>
                    <Row className='my-3'>
                        <Col md={12}>
                            <h3 className='fourth-font font-two text-black fw-bolder mb-2'>So what’s the solution?</h3>
                        </Col>
                    </Row>
                    <Row className='mb-1'>
                        <Col md={12}>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>It’s really quite simple - to truly build customer loyalty and to be valued by your customers, you have to first give them value consistently over time. And on your own, the value you can give is limited to your product/service and your own marketing budget.</p>
                        </Col>
                    </Row>
                    <Row className='mb-3 py-5'>
                        <Col md={12} className='py-1'>
                            <img src='https://api.xircls.com/static/images/website-slide/blog/b3_img_2.jpg' className='w-100' />
                        </Col>
                    </Row>
                    <Row className='mb-1'>
                        <Col md={12}>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Through B2B collaborations, XIRCLS has completely reimagined the loyalty program paradigm in a way that <u>preserves the best interests of both businesses and their customers - for the longer term.</u></p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>On the XIRCLS network, companies give their customers instant value for every purchase by automatically rewarding their customers with offers from their partner companies.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Essentially, XIRCLS has made a customer loyalty building moment at one business a customer acquisition moment for another! </p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Besides conserving loyalty marketing costs, a collaborative loyalty solution helps companies give their customers a variety of rewards via partners. And through strategic collaborations, a company can actually curate a unique loyalty experience that makes sense for their customer base and one that no other competitor can match.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>For example, an online children’s library can reward its customers i.e. parents for an annual subscription with partner offers in categories such as kids clothing, educational toys, school supplies, chocolates and healthy snacks & beverages. By curating partner offers that parents will actually find useful, the library is able to add true value to their daily lives.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Furthermore, by gifting partner offers that are valid for a longer period - say 6 months - the library is able to create a more powerful brand impact on its customers through multiple reward moments spread out over time, rather than a single reward event.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>A collaborative rewards program is a win-win from the customer’s perspective too. They are instantly rewarded for their purchase, eliminating any possibility of buyer’s remorse. In fact, the value of the partner offers they receive may not just be equal to, but perhaps even greater than the value of the purchase. When a customer can gain more value than value lost, he is sure to return.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Loyal customers are people willing to invest in your product or service consistently over time, and in today’s world, that’s priceless. Through instant collaborations, customers can finally be rewarded in a way they deserve and a company can truly distinguish itself from its competitors.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Read more about the Semper Fi loyalty program <Link to='/' className="text-blue hover-black">here</Link>.</p>
                        </Col>
                    </Row>
                    <Row className='my-3'>
                        <Col md={11}>
                            <Row>
                                <Col sm={2} className="font-two sixth-font-blog">Share this Post:</Col>
                                <Col sm={10} className='d-flex gap-1 align-items-center mb-2'>
                                    <Link to='/'>
                                        <div className='display-icon overflow-hidden twitter rounded'>
                                            <div className="icon-container d-flex flex-column justify-content-between align-items-center">
                                                <span className='icon-social text-dark d-flex justify-content-center align-items-center'>
                                                    <SiTwitter size={20} />
                                                </span>
                                                <span className='icon-social text-light d-flex justify-content-center align-items-center'>
                                                    <SiTwitter size={20} />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                    <Link to='/'>
                                        <div className='display-icon overflow-hidden linkedin rounded'>
                                            <div className="icon-container d-flex flex-column justify-content-between align-items-center">
                                                <span className='icon-social text-dark d-flex justify-content-center align-items-center'>
                                                    <SiLinkedin size={20} />
                                                </span>
                                                <span className='icon-social text-light d-flex justify-content-center align-items-center'>
                                                    <SiLinkedin size={20} />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                    <Link to='/'>
                                        <div className='display-icon overflow-hidden mail rounded'>
                                            <div className="icon-container d-flex flex-column justify-content-between align-items-center">
                                                <span className='icon-social text-dark d-flex justify-content-center align-items-center'>
                                                    <Mail size={20} />
                                                </span>
                                                <span className='icon-social text-light d-flex justify-content-center align-items-center'>
                                                    <Mail size={20} />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                    <Link to='/'>
                                        <div className='display-icon overflow-hidden whatsapp rounded'>
                                            <div className="icon-container d-flex flex-column justify-content-between align-items-center">
                                                <span className='icon-social text-dark d-flex justify-content-center align-items-center'>
                                                    <SiWhatsapp size={20} />
                                                </span>
                                                <span className='icon-social text-light d-flex justify-content-center align-items-center'>
                                                    <SiWhatsapp size={20} />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={1}>
                            <Link to='/' className="text-blue hover-black cursor-pointer">Disclaimer</Link>
                        </Col>
                    </Row>
                    <Row className='my-5 py-5'>
                        <Col md={4} className='blog-img d-flex align-items-center justify-content-center mb-2'>
                            <Row>
                                <Col md={12}>
                                    <div className="text-center">
                                        <img width={110} height={110} className='rounded-circle mb-1' src={'https://api.xircls.com/static/images/website-slide/blog/a3_new.jpg'} />
                                        <h5 className='fw-bolder text-dark fs-4 font-two'>Dineo Magakwa</h5>
                                        <p className='font-two fs-4 text-dark'>Marketing Intern at XIRCLS</p>
                                    </div>
                                </Col>
                                <Col md={12} className='d-flex align-items-center justify-content-center'>
                                    <Link to='/'>
                                        <div className='display-icon overflow-hidden facebook rounded-start'>
                                            <div className="icon-container d-flex flex-column justify-content-between align-items-center">
                                                <span className='icon-social text-dark d-flex justify-content-center align-items-center'>
                                                    <SiFacebook size={20} />
                                                </span>
                                                <span className='icon-social text-light d-flex justify-content-center align-items-center'>
                                                    <SiFacebook size={20} />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                    <Link to='/'>
                                        <div className='display-icon overflow-hidden linkedin'>
                                            <div className="icon-container d-flex flex-column justify-content-between align-items-center">
                                                <span className='icon-social text-dark d-flex justify-content-center align-items-center'>
                                                    <SiLinkedin size={20} />
                                                </span>
                                                <span className='icon-social text-light d-flex justify-content-center align-items-center'>
                                                    <SiLinkedin size={20} />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                    <Link to='/'>
                                        <div className='display-icon overflow-hidden mail rounded-end'>
                                            <div className="icon-container d-flex flex-column justify-content-between align-items-center">
                                                <span className='icon-social text-dark d-flex justify-content-center align-items-center'>
                                                    <Mail size={20} />
                                                </span>
                                                <span className='icon-social text-light d-flex justify-content-center align-items-center'>
                                                    <Mail size={20} />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={7} className='ps-md-5 d-flex flex-column justify-content-center'>
                            <h5 className='font-two fw-light text-dark mb-3 sixth-font-blog lh-base'>Dineo Magakwa is a marketing intern at XIRCLS. She has a Bachelor of Philosophy (Honours) in Marketing Management from the prestigious Institution of Marketing Management (IMM) GSM Graduate School with majors in digital marketing, strategic marketing and global marketing.</h5>
                            <div>
                                <Link to='/blog/author/Dineo-Magakwa/' className="blog-learnmore-btn text-uppercase">Learn More</Link>
                            </div>
                        </Col>
                    </Row>
                <Row className='my-3'>
                    <BlogFoot component='loyalty' />
                </Row>
            </Container>
            <Footer />
        </div >
    )
}

export default Blog_full_3