import React from 'react'
import Header from '../base/Header'
import Footer from '../base/Footer'
import { Container, Row, Col } from 'reactstrap'
import { Mail } from 'react-feather'
import { Link } from 'react-router-dom'
import { SiFacebook, SiWhatsapp, SiLinkedin, SiTwitter } from 'react-icons/si'
import BlogHead from './BlogHead'
import BlogFoot from './BlogFoot'

const Blog_full_6 = () => {
    return (
        <div className='products'>
            <Header />
            <Container className='px-md-4 pb-1 pt-5'>
                <BlogHead component='hunters' />
                <Container fluid className='py-6'>
                      <div style={{ display: `flex`, justifyContent: `center`, alignItems: `center` }}>
                        <img src='https://api.xircls.com/static/images/website-slide/blog/b6.jpg' className='w-100' />
                      </div>
                </Container>
                    <Row className='mb-1'>
                        <Col md={12}>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Whether you’re a small business owner just starting out or in the marketing department of a large corporation, one thing’s for sure - bargain hunters aren’t the kind of customers you should be hoping for.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>So who exactly are bargain hunters, what draws them to a business and if they are indeed trouble, how do you steer clear of them?</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Simply put, attractive discounts attract bargain hunters. These are customers who are primarily focused on getting the best deal. They are discount-loyal, not brand loyal. They will show up at every sale you announce, sort products by ‘Most Discounted’ or ‘Lowest Priced’ and make quick purchases that drive up your short-term revenue and keep your marketing team happy. But if you dare to stay off the discount wagon for too long or try to encourage repurchases with more sustainable marketing strategies, they make their way to the next best thing and never look back. </p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Simply put, attractive discounts attract bargain hunters. These are customers who are primarily focused on getting the best deal. They are discount-loyal, not brand loyal. They will show up at every sale you announce, sort products by ‘Most Discounted’ or ‘Lowest Priced’ and make quick purchases that drive up your short-term revenue and keep your marketing team happy. But if you dare to stay off the discount wagon for too long or try to encourage repurchases with more sustainable marketing strategies, they make their way to the next best thing and never look back. </p>
                        </Col>
                    </Row>
                    <Row className='my-3'>
                        <Col md={12}>
                            <h3 className='fifth-font font-two text-black fw-bolder mb-2'>The Discounting Death Spiral</h3>
                        </Col>
                    </Row>
                    <Row className='mb-1'>
                        <Col md={12}>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>On the plus side, discounts and sales are a great way to attract new customers, create brand awareness, increase adoption of new products and move inventory. Strategic discounting has been proven to boost a business’s sales and expand its customer base if done correctly.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>However, a blind and unhealthy dependence on discount pricing to keep sales up and internal team morale high can have a disastrous effect on the future of a business.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>In fact, what’s truly dangerous about having a business whose revenue is primarily driven by discount-hunters is that you don’t see it until it’s too late.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>When the going is good, it’s a surface-level win-win situation: the bargain hunters get the thrill of a good deal and marketing teams ride high on the rush of a high ROAS (Return on Ad Spend).</p>
                        </Col>
                    </Row>
                    <Row className='mb-3 py-5'>
                        <Col md={12} className='py-1'>
                            <img src='https://api.xircls.com/static/images/website-slide/blog/b6_img_1.jpg' className='w-100' />
                        </Col>
                    </Row>
                    <Row className='mb-1'>
                        <Col md={12}>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Yet, past a critical tipping point, excessive and unmitigated sales and discounts can begin to have a negative impact on sales and customer retention.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Think about it - if you knew that a company is likely to announce a sale in the near future, are you going to purchase its product at full price, ever? Worse yet, if you know that the company usually discounts at 30% or higher at regular intervals, will a 15% discount be enough to get you to pull out your credit card?</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Moreover, when your customer base consists mostly of itinerant discount buyers, any brand loyalty you cultivate will last as long as your next advertised sale.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Besides marketing, the impact of regular discounting on a company can spread to other departments as well. When a majority of your customers base their purchase decision on your product’s price rather than quality, product innovation is no longer an organizational priority. Neither is customer support - a reminder that in the long run, deep discounting is harmful for customers as well.</p>
                        </Col>
                    </Row>
                    <Row className='mb-3 py-5'>
                        <Col md={12} className='py-1'>
                            <img src='https://api.xircls.com/static/images/website-slide/blog/b6_img_2.jpg' className='w-100' />
                        </Col>
                    </Row>
                    <Row className='my-3'>
                        <Col md={12}>
                            <h3 className='fifth-font font-two text-black fw-bolder mb-2'>Join Hands, Not Cut Prices</h3>
                        </Col>
                    </Row>
                    <Row className='mb-1'>
                        <Col md={12}>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>So am I saying you should stop discounting altogether? The answer is no because it’s not that simple. Rather, you should look into implementing responsible discount pricing strategies that attract long-term customers and keep your marketing budget in check.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Perhaps one of the most simple and responsible ways that companies can continue to lavish discounts on their customers without jeopardizing their bottom line is collaborative marketing.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>By making customer retention at one company a customer acquisition moment for another, collaborative marketing technology gives businesses the best of both worlds - they can perpetually reward their customers with partner offers and engage only those consumers who are verified, paying customers of their allied partner companies.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Ultimately, we must acknowledge that bargain hunters are the unfortunate consequence of a cut-throat, fear-driven business environment where companies are willing to bleed themselves out to get ahead of the competition. In such a scenario, only the one with the deepest pockets wins.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Collaborative marketing is not just a technological innovation; it is a shift in a deeply rooted mindset that future-driven companies must adopt to introduce a more sustainable way of marketing to the world. And this change starts with you.</p>
                            <p className='font-two fw-bold text-black lh-lg-md sixth-font-blog text-justify'>Read more about collaborative marketing through the XIRCLS Infiniti product <u>here</u>.</p>
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
                                        <img width={110} height={110} className='rounded-circle mb-1' src={'https://api.xircls.com/static/images/website-slide/blog/a5.jpeg'} />
                                        <h5 className='fw-bolder text-black fs-4 font-two'>Kwanele Ngobese</h5>
                                        <p className='font-two fs-4 text-black'>Marketing & Branding Intern at XIRCLS </p>
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
                            <h5 className='font-two fw-light text-black mb-3 sixth-font-blog lh-base'>Kwanele Ngobese is a marketing & branding intern at XIRCLS. She comes from the tropical town of Tzaneen, Limpopo and lives in Johannesburg, South Africa. She is currently in her final year at the University of South Africa, pursuing a BA in Communication Science. </h5>
                            <div>
                                <Link to='/blog/author/Kwanele_Ngobese/' className="blog-learnmore-btn text-uppercase">Learn More</Link>
                            </div>
                        </Col>
                    </Row>
                <Row className='my-3'>
                    <BlogFoot component='hunters' />
                </Row>
            </Container>
            <Footer />
        </div >
    )
}

export default Blog_full_6