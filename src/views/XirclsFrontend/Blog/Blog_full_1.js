import React from 'react'
import Header from '../base/Header'
import Footer from '../base/Footer'
import { Container, Row, Col } from 'reactstrap'
import { Mail } from 'react-feather'
import { Link } from 'react-router-dom'
import { SiFacebook, SiWhatsapp, SiLinkedin, SiTwitter } from 'react-icons/si'
import BlogHead from './BlogHead'
import BlogFoot from './BlogFoot'

const Currency = () => {
    return (
        <div className='products'>
            <Container className='pb-1 pt-5'>
                <BlogHead component='currency' />
                <Container fluid className='py-6'>
                   <div style={{ display: `flex`, justifyContent: `center`, alignItems: `center` }}>
                        <img src='https://api.xircls.com/static/images/website-slide/blog/b11.jpg' className='first-img' />
                   </div>
                </Container>
                
                <Row className='mb-1'>
                    <Col md={12}>
                        <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Data tracking has become so deeply integrated into our personal lives that society has forgotten the value of true privacy. Under the guise of social connection, creativity and networking, the very platforms we use daily have distracted us from their ultimate motive: to profit from the most intimate details of our lives. The general public has willingly bartered their private moments, locations, pictures and personal interests to the highest bidders in exchange for a few “likes” and targeted ads. </p>
                        <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Some of these stealthy “stealers” of our life’s most precious moments include, but are not limited to: Facebook, Google and Instagram. Similar to a manipulative narcissist, they inadvertently seduce us with their clever methods of “love bombing” and insist that we should appreciate this concept of identity exploitation. Assuming we use caution in choosing who we allow into our personal space, why should our digital associations be any different? Why have we accepted this ideology that suggests we should nonchalantly sell our intimate moments? Are these business strategies truly improving the quality of our lives or are they leaving us exposed and vulnerable?</p>
                        <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>We have laid down our armor and allowed an insidious, slithering animal to creep in and infect its venom into our lives. We continuously feed a dangerous beast with an insatiable appetite that indiscriminately destroys the self-esteem and values of billions of people worldwide. Did I mention they have contributed to economic decline and obliteration of businesses for the sake of greed? Well, that is an entirely different conversation. Nonetheless, that familiar voice inside your head that gives warning that you are on the precipice of danger has been dulled by systematic desensitization of the things that once made us human.</p>
                        <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>I will move on to the bottom line - our safety is at risk for the financial gain of billion dollar corporations. We literally feed the soul-consuming beast with every stroke of a button. There must be accountability for those who endanger and exploit others for the sake of wealth and power.</p>
                    </Col>
                </Row>
                <Row className='mb-3 py-5'>
                    <Col md={12} className='py-1'>
                        <img src='https://api.xircls.com/static/images/website-slide/blog/b12.jpg' className='w-100' />
                    </Col>
                </Row>
                <Row className='mb-1'>
                    <Col md={12}>
                        <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Allow me to elucidate. There is a term, unknown to the vast majority, that refers to the obtaining and selling of your private data. It’s called “data brokering”. Data brokers have discovered a way to legally obtain and/or sell your information with your permission, but perhaps without your comprehension. With every online check-in, like and purchase we are giving data brokers more financial fuel to perpetuate a system that manufactures realities while attempting to convince us they are their own. This information is sold to companies for insight to who we are, our habits and locations. The information collected also has a direct impact on the ads and articles you see during your social media scrolling. The technical term for how these placements of information are managed, is called an algorithm. Unfortunately, the algorithms that interpret our interests are not entirely fault-free, and ads or content they present are far from credible. </p>
                        <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Often, misinformation tends to re-circulate and spread like wildfire. It has the potential to threaten our lives physically, financially and emotionally. Misinformation is generally spread without the intent of malice but the negative outcomes do not distinguish intent. Disinformation, however, is the intentional circulation of inaccurate information with the intent of influencing others based on untruths (for your reference). Because there is little evidence available to prove whether false information is spread with malicious intent, no one is held accountable for the social casualties the influence leaves behind. Thus, all inaccurate information is used under the umbrella term “misinformation”. </p>
                        <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Social media platforms have little to no regulation on the information circulated or its accuracy, but they do target individuals who have liked or shared related posts (true or not). This can have detrimental social outcomes depending on the information or “propaganda” communicated. The sharing of biased propaganda has led to the perpetuation of unhealthy belief systems, especially in the young and impressionable. Much of this circulated propaganda contributes to the ultimate continuation of the racism, sexism, bigotry and prejudice we face today. Let us not forget the sexualization of our young people.</p>
                    </Col>
                </Row>
                <Row className='mb-3 py-5'>
                    <Col md={12} className='py-1'>
                        <img src='https://api.xircls.com/static/images/website-slide/blog/b13.jpg' className='w-100' />
                    </Col>
                </Row>
                <Row className='mb-1'>
                    <Col md={12}>
                        <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>One has to wonder, are these methods truly necessary for the technological advancement of digital marketing? Where do we draw the line between ethics and revenue? Modern civilization has forfeited its traditional value systems that have been carried on through generations for the sake of convenience. While the evolution of the human race is a natural result of information gathering throughout the span of time, the complete disregard for privacy and autonomy that defines our current age is simply unjustified.</p>
                        <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>This, my friend, is called the Jones Effect.</p>
                        <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>A choice must be made about the current reality of social “connections”. Will our lives continue to be the currency which we exchange for attention and convenience, or is it possible to enjoy the convenience we crave without exploitation? With only a few tech giants monopolizing an entire industry, we have had limited options and exposure to alternatives thus far. However, a compromise without the sacrifice may be closer than you realize. </p>
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
                    <BlogFoot component='currency' />
                </Row>
            </Container>
            <Footer />
        </div >
    )
}

export default Currency