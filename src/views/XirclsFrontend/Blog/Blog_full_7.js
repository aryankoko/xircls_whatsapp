import React from 'react'
import Header from '../base/Header'
import Footer from '../base/Footer'
import { Container, Row, Col } from 'reactstrap'
import { Mail} from 'react-feather'
import { Link } from 'react-router-dom'
import { SiFacebook, SiWhatsapp, SiLinkedin, SiTwitter } from 'react-icons/si'
import BlogHead from './BlogHead'
import BlogFoot from './BlogFoot'

const Blog_full_7 = () => {
    return (
        <div className="products">
            
            <Container className='px-md-4 pb-1 pt-5'>
                <BlogHead component='marketing' />
                <Container fluid className='py-6'>
                      <div style={{ display: `flex`, justifyContent: `center`, alignItems: `center` }}>
                          <img src='https://api.xircls.com/static/images/website-slide/blog/b7.jpg' className='w-100' />
                        </div>
                    </Container>
                    <Row className='mb-1'>
                        <Col md={12}>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Have you noticed your paycheck doesn’t go as far as it once did?</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>We’ve all noticed how the price of everything adds up so much faster than it used to. Not that long ago, I used to keep a small rainy-day fund, just in case things ever got really bad. But, I stopped putting my spare change, all my nickels and dimes that fell under the car seat, into that jar several months ago. The dollars just aren't going far enough, and now I don’t have any change left to spare.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Look at the price of gas. Look at the price of food. The price of everything is going up and is not stopping. Don’t even consider looking at the price of having an evening out or you will never want to leave the house.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>We have to pinch our pennies right now, but why? Partially, it's fall-out from the pandemic. Economically, in addition to medically, the world is still going to be recovering for some time. Partially, it’s because of the price of oil. If it costs stores more to move their products from the manufacturers’ warehouse to the store shelves, they aren’t going to just eat that cost themselves. They are going to pass that added expense on to the consumer. In the end, profit to the company is everything.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>But perhaps an unexpected reason why prices have recently inflated so dramatically is marketing.</p>
                        </Col>
                    </Row>
                    <Row className='mb-3 py-5'>
                        <Col md={12} className='py-1'>
                            <img src='https://api.xircls.com/static/images/website-slide/blog/b7_img_2.jpg' className='w-100' />
                        </Col>
                    </Row>
                    <Row className='my-3'>
                        <Col md={12}>
                            <h3 className='fourth-font font-two text-black fw-bolder mb-2'>Marketing is everywhere </h3>
                        </Col>
                    </Row>
                    <Row className='mb-1'>
                        <Col md={12}>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Marketing has become so ubiquitous that we fail to even notice it anymore. But if we look just a little closely, we’ll realize we can’t escape it.</p>
                            <ul className='font-two fw-normal text-black lh-lg-md sixth-font-blog text-justify ps-1'>
                                <li>Pick up a jar of peanut butter. You’ll see a recipe for cookies calling for peanut butter & chocolate chips. That’s marketing. The company isn’t just giving you an idea of how to use the peanut butter, they want you to go buy the chocolate chips too.</li>
                                <li>Read a magazine and you will still find those scratch-and-sniff perfume sample cards glued to the pages. This old-school technique is designed to get you to buy a bottle of perfume. Now you don’t even have to leave the house to find a scent you enjoy. The perfume company’s website is listed right on the card and you already have the tester.</li>
                                <li>Watch a TV show. You can’t escape the advertising here. Back before the days of streaming services, your advertisement content on television was mostly from the commercial breaks cutting into all your favorite shows. But even today’s on-demand streaming services are riddled with advertisements, and, likely, you don’t even know it. Is the main character on your can’t-miss police drama typing a report on a Mac or a PC? And, is she drinking a Coke or a Pepsi? This “product placement” works because what you see others doing is what you’re more likely to want to do too.</li>
                                <li>Go online. Some days, as I’m wading through the pop-ups flooding my email inbox, it feels like the internet should be called “the interrupt” instead! Sometimes it seems as if the internet is nothing but ads.</li>
                            </ul>
                        </Col>
                    </Row>
                    <Row className='mb-3 py-5'>
                        <Col md={12} className='py-1'>
                            <img src='https://api.xircls.com/static/images/website-slide/blog/b7_img_3.jpg' className='w-100' />
                        </Col>
                    </Row>
                    <Row className='my-3'>
                        <Col md={12}>
                            <h3 className='fourth-font font-two text-black fw-bolder mb-2'>Infinite Marketing Equals Inflation</h3>
                        </Col>
                    </Row>
                    <Row className='mb-1'>
                        <Col md={12}>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Why is the all-pervasiveness of marketing important to take note of? Because it breeds a sense of normalcy on the surface, while driving up costs without consumers realizing that they are essentially paying for the ads that they are fed. </p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>To some degree, advertising has always influenced a product’s price since companies factor in advertising costs into the final cost price for the consumer. Before the internet, advertisers paid to place ads: </p>
                            <ul className='font-two fw-normal text-black lh-lg-md sixth-font-blog text-justify ps-1'>
                                <li>In magazines, </li>
                                <li>In newspapers, </li>
                                <li>On the radio, </li>
                                <li>On television. </li>
                            </ul>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>And while they still do this today, the internet is now the advertising King and Queen.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>But here’s where the cost of advertising online differs. Marketers previously paid for a limited amount of space owned by a company. A magazine only has so many pages, and any half-hour TV show only has time for so many commercials. What the marketers were paying for was finite.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>The internet is dynamic and therefore infinite. Yet internet companies charge advertisers top-dollar rates for a prized spot on search engine results placements. Analytics is the boss.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Want your ad to be at the top of search results? You pay the search engine. And of course, just like the stores that pass on to their customers the increased cost of keeping products on the shelf, companies pass on their increased cost of online advertising.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>The bottomline? We pay more for the products that companies sell to us because it costs those companies more to advertise the products to us online. And since online ad space is unlimited, companies will keep charging customers more.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>It’s a vicious cycle - and we, the consumers, are right in the center of it and paying the price.</p>
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
                                        <img width={110} height={110} className='rounded-circle mb-1' src={'https://api.xircls.com/static/images/website-slide/blog/a2.jpeg'} />
                                        <h5 className='fw-bolder text-dark fs-4 font-two'>Lauren Deah</h5>
                                        <p className='font-two fs-4 text-dark'>Copywriter, Content writer and Blogger, XIRCLS</p>
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
                            <h5 className='font-two fw-light text-dark mb-3 sixth-font-blog lh-base'>Lauren has a B.A. in Creative Writing and English from The University of Southern New Hampshire, and she is a member of the Sigma Tau Delta English Honors Society.<br />Lauren grew up on the East Coast of the United States and traveled around the world after high school. She has come full circle and is once again living in Maryland. </h5>
                            <div>
                                <Link to='/blog/author/Lauren_Deah/' className="blog-learnmore-btn text-uppercase">Learn More</Link>
                            </div>
                        </Col>
                    </Row>
                    
                <Row className='my-3'>
                    <BlogFoot component='marketing' />
                </Row>
            </Container>
            <Footer />
        </div >
    )
}

export default Blog_full_7