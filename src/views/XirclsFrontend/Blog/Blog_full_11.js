import React from 'react'
import Header from '../base/Header'
import Footer from '../base/Footer'
import { Container, Row, Col } from 'reactstrap'
import { Mail} from 'react-feather'
import { Link } from 'react-router-dom'
import { SiFacebook, SiWhatsapp, SiLinkedin, SiTwitter } from 'react-icons/si'
import BlogHead from './BlogHead'
import BlogFoot from './BlogFoot'

const Blog_full_11 = () => {
    return (
        <div className='products'>
            
            <Container className='px-md-4 pb-1 pt-5'>
                <BlogHead component='conflict' />
                <Row className='mb-lg-3 py-5 px-md-4'>
                    <Col md={12} className='py-1 px-md-3'>
                        <img src='https://api.xircls.com/static/images/website-slide/blog/b11_img_1.jpg' style={{ maxWidth: '100%' }} />
                    </Col>
                </Row>                
                <Row className='mb-1'>
                    <Col md={12}>
                        <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Most people would say they don’t like conflict. It doesn’t feel good— it’s disruptive, tense, uncomfortable, perhaps even torturous. It is often perceived as an enemy that needs to be defeated in order for us to restore happiness. One thing worth exploring, however, is instead reconceptualising conflict as our greatest tool; one that builds what everyone is ultimately seeking in life: connection.</p>
                        <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Think of yourself as a crying child. In that moment of conflict, what did you ultimately want from your parents; the people taking care of you? At your very core, you wanted attention, compassion, empathy, and validation. If conflict is seen as an opportunity rather than a threat, this situation can become a beautiful moment of connection between the child and parent.</p>
                        <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>As one grows up and becomes an adult, those desires become less apparent to us, and our reactions to their absence may become much more subdued. However, one would be mistaken to think their urgency ever goes away— these are core human needs, after all.</p>
                        <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Given that we are now the ones who have to take care of ourselves, it is imperative that we provide ourselves with the same treatment we would have wanted from an available, kind, and loving parent. We often get frustrated with ourselves for our desires or perceived inadequacies; we criticise, blame, punish. The truth is that the more we suppress something inside of us, the more it will come out. That part of us is begging to be seen and attended to; we would be foolish to think that it can be ignored. It will find ways to come to the surface— all that will happen if we try to suppress it is that it will come out in subconscious ways, without us even realising that we are acting from that hurt part of us. We would therefore do better to consciously spend time with it; to approach it with compassion and curiosity. Think of how a plant blossoms: it requires a lot of attention and care to grow. Criticising it won’t make it grow faster!</p>
                        <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>So what comes out of conflict? Many would say distance and resentment. But if we stop resisting it and instead embrace it with an open mind, it can have a much more positive outcome— that of growth, understanding, and closeness, both with others as well as one-self. Reflect on the most meaningful things to happen in your life. Wasn’t there some kind of internal conflict precipitating those changes, a struggle of some sort?</p>
                        <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>We at XIRCLS therefore believe that anyone who we feel threatened by is doing us a service. The first step to any positive change is awareness, and they are giving us the gift of just that— they are bringing our attention to what is aching to be seen inside of us. Who knows how long our journey to accepting that part of ourselves would have been delayed if not for them shining a light on it? It is precisely in this way that conflict can, if met with curiosity and openness, lead to connection— in this case, a deeper connection with oneself and one’s desires.</p>
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
                                    <img width={110} height={110} className='rounded-circle mb-1' src={'https://api.xircls.com/static/images/website-slide/blog/a9.jpeg'} />
                                    <p className='fw-bolder text-dark font-two sixth-font-blog mb-1'>Darina Litvina</p>
                                    <p className='font-two text-dark sixth-font-blog'>Content Writer at XIRCLS</p>
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
                    <Col md={7} className='ps-md-5 d-flex flex-column justify-content-start'>
                        <h5 className='font-two fw-light text-dark mb-3 sixth-font-blog'>Darina is a content writer with a degree in Honours Communication Studies and a Philosophy minor. She grew up in Eastern Europe and moved to Canada, where she is currently based, for university.</h5>
                        <div>
                            <Link to='/blog/author/Darina_Litvina/' className="blog-learnmore-btn text-uppercase">Learn More</Link>
                        </div>
                    </Col>
                </Row>
                <Row className='my-3'>
                    <BlogFoot component='conflict' />
                </Row>
            </Container>
            <Footer />
        </div >
    )
}

export default Blog_full_11