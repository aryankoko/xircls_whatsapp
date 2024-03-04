import React from 'react'
import Header from '../base/Header'
import Footer from '../base/Footer'
import { Container, Row, Col } from 'reactstrap'
import { Mail} from 'react-feather'
import { Link } from 'react-router-dom'
import { SiFacebook, SiWhatsapp, SiLinkedin, SiTwitter } from 'react-icons/si'
import BlogHead from './BlogHead'
import BlogFoot from './BlogFoot'

const Blog_full_5 = () => {
    return (
        <div className="products">
            <Container className='px-md-4 pb-1 pt-5'>
                <BlogHead component='mind' />
                <Container fluid className='py-6'>
                        <div style={{ display: `flex`, justifyContent: `center`, alignItems: `center` }}>
                            <img src='https://api.xircls.com/static/images/website-slide/blog/b5.jpg' className='w-100' />                            
                          </div>
                    </Container>
                    <Row className='mb-1'>
                        <Col md={12}>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Everyone loves a deal. From cash cows and billionaire tycoons to the middle-class and even those barely scraping by - we all want the same thing. We want to get the most for our money.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>From the BOGO deals to the reward card discounts, it seems like super saver deals are all around us, but are we really saving? I can go to the fancy grocery store down the street that is advertising a HUGE sale on a normally expensive brand of cereal, but if I go a little further to another store that is slightly less high-end, I find the same cereal. Here, it is marked full price but costs much less than the other more “glamorous” store. Interestingly enough, the more expensive store seems to remain full of eager clientele paying higher prices, even when there is a more affordable option nearby. Counterintuitive, wouldn’t you say?</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Yet, the massive success of commercial retail rests on such psychological tactics, making your little box of cereal look like a pot of gold at the end of a rainbow. It’s a trick advertising plays on your mind - like you’re a squirrel scurrying about to get that shiny something and stash it away in your little nest before your greedy little neighbor squirrel gets to it.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>In short, they play us: They’re not giving us a deal, but are simply marking up their prices and wrapping them in a pretty package, using your excitement as a tool toward profit.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>So you end up paying for not only the product, but the way it is delivered to you and the psychological reward you feel when you think you’re getting something special for a “HUGE DISCOUNT”! The quick spike of our “happy” chemical, dopamine, that occurs when we fall for these “deals”, is comparable to how an addict feels when they get their fix.</p>
                        </Col>
                    </Row>
                    <Row className='mb-3 py-5'>
                        <Col md={12} className='py-1'>
                            <img  src='https://api.xircls.com/static/images/website-slide/blog/b5_img_1.jpg' className='w-100' />
                        </Col>
                    </Row>
                    <Row className='mb-1'>
                        <Col md={12}>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Sad, sick and morally wrong as it may be, advertisers are relentless in their pursuit of profit - no holds barred.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Let’s have Miss Suzie, who lives on a fixed income, rush to the store for the Friday markdown on the ribeye! Poor Miss Suzie thinks she is an outright genius for believing these pretty little fibs, but we know better.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>While I take no pride in bursting society’s bubble when I say their $14.99 per pound cut of meat tastes exactly the same as the $8.99 per pound cut from two miles down the road, I do find myself in the same quandary when I see this strange phenomenon continue year after year. It begs the question: Do people really want to save money or is there something else going on here entirely?</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Think about your favorite shampoo. Why is it your favorite? Does it REALLY make your hair stronger, grow faster, look more luxurious? Chances are, there is a cheaper alternative that can achieve the same results. It is very likely you have fallen victim to a little thing known as affective conditioning. This happens when a product is marketed in such a way that makes it more appealing to the masses. For example, you may have seen a commercial with this shampoo and a gorgeous man or woman washing their hair in absolute ecstasy and you think, “Now THAT’S some good shampoo!” Although you probably lack the same ridiculous, over-the-top reaction when washing your hair, the psychological affect it has on your association with the product causes you to continue to buy it even though it costs $30 a bottle and the brand uses the EXACT SAME ingredients as a less expensive alternative brand.</p>
                        </Col>
                    </Row>
                    <Row className='mb-3 py-5'>
                        <Col md={12} className='py-1'>
                            <img src='https://api.xircls.com/static/images/website-slide/blog/b5_img_2.jpg' className='w-100' />
                        </Col>
                    </Row>
                    <Row className='mb-1'>
                        <Col md={12}>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Here’s another little fun tidbit for you. You know those hideous shoes trending on social media? They may be downright UGLY, but they sell for $250 a pair and all the coolest celebrities are wearing them. Soon, you even see people around you wearing these horrifying excuses for shoes, and the next thing you know, you find yourself shopping for these wastes of ad space, having decided that they’re not so bad after all.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>This, my friend, is called the Jones Effect.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Advertising companies use this sneaky little tactic to influence people, taking advantage of our inherent human desire for acceptance. They have ways to convince even the most intelligent of consumers to spend hundreds of dollars on a product that may well have cost less than $5 to make. Let’s throw on a 20% off sticker and watch them fly off the shelves! Is it a good deal or a mind game? You tell me. </p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>This ‘psychological warfare’ doesn’t just make casualties out of consumers like you and me. Small businesses are obliterated in their wake. Do you remember that corner market you always went to after school? Have you ever wondered why it disappeared? Think about it… is your small town perhaps a little bigger today? Is it now illuminated by bright lights and dotted with billboards of the newer, cooler stores that have awesome, aesthetic pictures but the same products? You have experienced a personal example of the smiting of a small business - it was simply wrapped up in a pretty package.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>While we may all be aware of everything I’ve said here, we must periodically ask ourselves what really influences our buying choices. I would assume the vast majority of us know that the Vegas-like grocery stores in town are much more expensive than the modest corner market in our neighborhood, but like a moth to a flame, we choose the pricier option. Is it for a false sense of superiority or is there a much more complex phenomenon at play, one that is so deeply ingrained in our psyche that it has conditioned us to consciously make frivolous choices?</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Perhaps we should consider getting to know the Joneses, before we decide to keep up with them.</p>
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
                                        <img width={110} height={110} className='rounded-circle mb-1' src={'https://api.xircls.com/static/images/website-slide/blog/a1.jpg'} />
                                        <h5 className='fw-bolder text-dark fs-4 font-two'>Allie Hinds</h5>
                                        <p className='font-two fs-4 text-dark'>Head of Content, XIRCLS </p>
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
                            <h5 className='font-two fw-light text-dark mb-3 sixth-font-blog lh-base'>As Head of Content at XIRCLS, Allie Hinds examines the current technological space and its tremendous impact on human behavior. She observes the correlation between the degradation of mental health and the circulation of images popular Tech companies use to influence their “ideals” on mainstream culture. With the help of the XIRCLS team, she strives to bring an awareness to the public about the manipulative tactics used by AdTech and MarTech giants, and how they have shifted the priorities of the masses from those of value to a distorted and diluted version of a Hollywood movie. </h5>
                            <div>
                                <Link to='/blog/author/Allie_Hinds/' className="blog-learnmore-btn text-uppercase">Learn More</Link>
                            </div>
                        </Col>
                    </Row>   
                <Row className='my-3'>
                    <BlogFoot component='mind' />
                </Row>
            </Container>
            <Footer />
        </div >
    )
}

export default Blog_full_5