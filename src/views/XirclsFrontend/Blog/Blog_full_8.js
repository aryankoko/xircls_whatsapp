import React from 'react'
import Header from '../base/Header'
import Footer from '../base/Footer'
import { Container, Row, Col } from 'reactstrap'
import { Mail} from 'react-feather'
import { Link } from 'react-router-dom'
import { SiFacebook, SiWhatsapp, SiLinkedin, SiTwitter } from 'react-icons/si'
import BlogHead from './BlogHead'
import BlogFoot from './BlogFoot'

const Blog_full_8 = () => {
    return (
        <div className="products">
            
            <Container className='px-md-4 pb-1 pt-5'>
                <BlogHead component='war' />
                <Container fluid className='py-6'>
                      <div style={{ display: `flex`, justifyContent: `center`, alignItems: `center` }}>
                            <img src='https://api.xircls.com/static/images/website-slide/blog/b8.jpg' className='w-100' />
                          </div>
                    </Container>
                    <Row className='mb-1'>
                        <Col md={12}>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Whenever you buy or intend to buy a service or product from a company, you inadvertently become their target audience. You are now a subject of their intense scrutiny, as they attempt to study your behaviour, your interests, and gather more information on you, ranging from your demographic to psychographic information. Much like a stalker, if you think about it.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>I recently decided to delve into the aforementioned marketing concept of ‘target audience’. Why ‘target’? The word brings with it a decidedly negative connotation, along with various dismissive synonyms, such as ‘prey’. Some other synonyms of this word that drew my attention are ‘quarry’, ‘game’, and ‘kill’. Are companies in a ceaseless war with their customers where a ‘kill’ is needed to win the game? And if they are, then who is winning? What is the prize?</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>What is actually intriguing about this conflict is the unequal distribution of power because as I will explain below, the company is in complete control while the customer is monitored and blindfolded.</p>
                        </Col>
                    </Row>
                    <Row className='mb-3 py-5'>
                        <Col md={12} className='py-1'>
                            <img src='https://api.xircls.com/static/images/website-slide/blog/b8_img_2.jpg' className='w-100' />
                        </Col>
                    </Row>
                    <Row className='my-3'>
                        <Col md={12}>
                            <h3 className='fourth-font font-two text-black fw-bolder mb-2'>Panopticon: Where the Market Keeps Its Targets</h3>
                        </Col>
                    </Row>
                    <Row className='mb-1'>
                        <Col md={12}>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Please reread the heading above. Now, let me go ahead and explain this extended metaphor. A panopticon, as you can see in the picture <Link to='/' className="font-two text-blue">here</Link>, is an institutional building designed by <Link to='/' className="font-two text-blue">Jeremy Bentham</Link>. The building consists of a tower in the center for the guardian or watchman, and it is surrounded by a circular shaped building of cells. This architectural outline’s salient purpose is to surveil its occupants, without them knowing when or why they are being monitored and watched. At the same time, the occupants of the rooms cannot look into the central tower. This building is the best way to see others, to have power over others, without them having power over you. Evidently there is an absence of reciprocity and connectedness in this type of relationship, between the guardian in the tower and the inhabitants. Michael Foucault describes this interrelation quite exquisitely in his book Discipline and Punish (1975): </p>
                            <p className='font-two fw-light lh-lg-md sixth-font-blog text-justify fst-italic'>“He is seen, but he does not see; he is an object of information, never a subject in communication.” Michael Foucault </p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Therefore, the inhabitant is trapped and cornered into a one-sided relationship.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>How does the notion of target audience fit in this analogy? Well, the company who sells a product or service has the power to deceive individuals who they deem are part of their target audience into entering a unilateral and unequal relationship. The customer is an object of information; they are monitored, controlled, but not worthy enough to be part of the conversation. The customer is studied as an experiment, but they do not know which treatment or intervention they will receive. The customer is exposed to a variety of stimuli or marketing tricks and strategies without even a debriefing session, or enough information in order to make a rational decision. The customer is first chosen and placed under a microscope, then scrutinised and ripped apart, in order for companies to grasp each and every detail of their ‘target audience’. When their ‘targets’ are settled and selected, they fight for them with their competitors, and these targets become ‘prey’.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>How do we end up inside a panopticon over and over again? I will attempt to explain some of the reasons in this post.</p>
                        </Col>
                    </Row>
                    <Row className='mb-3 py-5'>
                        <Col md={12} className='py-1'>
                            <img src='https://api.xircls.com/static/images/website-slide/blog/b8_img_3.jpg' className='w-100' />
                        </Col>
                    </Row>
                    <Row className='my-3'>
                        <Col md={12}>
                            <h3 className='fourth-font font-two text-black fw-bolder mb-2'>Target Audience? More Like Fraudulence</h3>
                        </Col>
                    </Row>
                    <Row className='mb-1'>
                        <Col md={12}>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>How do we end up under a microscope? How do we become an inmate in an 18th century prison? How do we allow someone to study every single detail about us without consciously understanding their motivation? How do we share private and intimate information without even noticing or comprehending? Some of the major characters that make this happen are data brokers.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Data brokers are companies that we are not familiar with. However, they know you more than you’ll ever imagine. Their job includes selling your personal information. They make a profit out of your intimate moments. Why? Well, because all this information is tremendously valuable to other companies. They are able to do this because of complex algorithms that allow them to analyse personal details including: demographic information, religious beliefs, political leanings, sexual history, purchasing power, hobbies, medical history, physical and personality traits.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>One of the significant problems concerning this practice is it entails a threat. When the user agrees to the sharing and compilation of their personal data, most of the time they are not aware of where the data is going to end up, who receives and analyses it, and for how long they can store and process it. The data obtained is not always used for fraudulent activities, some of the data is used to improve and facilitate the user’s life. Nonetheless, the issue revolves around the inability of the user to accurately and consciously understand to what extent their data is being used, and with what purpose.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Data brokers have access to information you probably do not let your inner circle have access to, in some cases you don’t even let yourself acknowledge that information about you. Hence, just like in the Panopticon, you are selected, regularly monitored and analysed by a company, a data broker, or an individual that you know nothing about. Do you know one of the worst similarities between the panopticon and the algorithm used to access your information? Once you go in, you can never come out of it. </p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>In this way, data brokers effectuate the sharing of inconceivable amounts of personal data, what the world has come to call ‘Big Data’. Data brokers are the owners of the central tower inside the Panopticon and they allow the company or guard to monitor their targets. </p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>After the company has enough information in order to identify their target audience they make sure to make use of your information in order to convince you to never leave the Panopticon - they call this loyalty. They disguise the words prey, war, quarry, behind concepts such as ‘target audience’ and ‘market competition’. Despite all of this, how do the companies distract and deflect us from everything that is going on under our nose? </p>
                        </Col>
                    </Row>
                    <Row className='mb-3 py-5'>
                        <Col md={12} className='py-1'>
                            <img src='https://api.xircls.com/static/images/website-slide/blog/b8_img_4.jpg' className='w-100' />
                        </Col>
                    </Row>
                    <Row className='my-3'>
                        <Col md={12}>
                            <h3 className='fourth-font font-two text-black fw-bolder mb-2'>Tricks, Schemes, and Clicks</h3>
                        </Col>
                    </Row>
                    <Row className='mb-1'>
                        <Col md={12}>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Marketing has become a playground of deception and schemes. With every click, they create new tricks. Did you know some websites pay people to click on their ads, because they earn revenue from it? Thus sometimes ‘target customers’ are not even customers: they are not even real! With such tricks companies are able to distract us from what is actually going on.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>I would like to illustrate one prevalent example of deception nowadays: influencers. A company identifies which influencers have an impact over their target audience and they collaborate with them. Nevertheless, in many cases you are not involved in this collaboration, because no one cooperates with you as the customer. When an influencer proceeds to promote certain products or services to uninformed consumers, you are reduced to being nothing more than collateral damage.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>As consumers we should make an effort in order to be literate about any product or service we intend to buy. Still, it is unethical, vain, and crass of some influencers to promote a product without being educated about it, and even more, if they decide to withhold given information in order to make a better case for the product or service.  </p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Another example is artificial scarcity, a supposed scarcity of products. The company pretends the product’s availability is lower than it actually is. Artificial scarcity plays around with the laws of supply and demand, since the perceived difficulty of obtaining the limited product makes it more valuable. This marketing strategy creates an illusion where the supply decreases, so the demand increases. This fuels a feeling of social anxiety, and companies have heard about it and applied it to their advantage. FOMO (Fear of Missing Out) is marketing speak more than anything, a means to convince consumers they are indeed missing out on something someone else is experiencing. This marketing strategy or scheme induces fear and anxiety and in spite of that, companies use it against us and even create artificial situations or environments.</p>
                        </Col>
                    </Row>
                    <Row className='mb-3 py-5'>
                        <Col md={12} className='py-1'>
                            <img src='https://api.xircls.com/static/images/website-slide/blog/b8_img_5.jpg' className='w-100' />
                        </Col>
                    </Row>
                    <Row className='mb-1'>
                        <Col md={12}>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Companies sell us ideas of ‘happiness’, ‘accomplishment’', ‘self-love’, ‘health’, ‘knowledge’, ‘luxury’, ‘privilege’, ‘status’, etc. They make us believe that somehow their product or service is going to make our lives better. But, their goal was never for us to reach the ideal self we wish for; nor for us to feel happy or accomplished. Their goal is to make us feel unhappy and incompetent, because that is the only way we would still buy their lies and their products. They have created an illusion which we have unconsciously agreed to reside in. An illusion where we need what these companies are selling to survive and be the best versions of ourselves, but in reality, they need us more than we need them. </p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>So that brings us to the question - why do we keep buying from the people who have locked us into a metaphorical Panopticon and studied us without our consent and comprehension? </p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Stockholm Syndrome is a paradox where the victim develops a close and strong bond towards their captor or kidnapper. When the victim feels the captor or guard has too much power over them, when they feel threatened, they start creating a bond. When the guard decides not to harm the victim, then the victim feels immensely grateful and indebted to the captor.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>In the same way, we have come to feel as if we owe the companies who offer us products and services, we feel as if we owe them loyalty and gratitude. They have made us believe we owe them, they have made us believe we need them. We need to understand, they need us, more than we need them.</p>
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
                                        <img width={110} height={110} className='rounded-circle mb-1' src={'https://api.xircls.com/static/images/website-slide/blog/a6.jpg'} />
                                        <h5 className='fw-bolder text-dark fs-4 font-two'>Adriana Marcela Torrenegra</h5>
                                        <p className='font-two fs-4 text-dark'>Copywriter & Content Writer at XIRCLS</p>
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
                            <h5 className='font-two fw-light text-dark mb-3 sixth-font-blog'>Adriana is a copywriter, content writer, and blogger at XIRCLS. She is also a Human Resources intern at the company.</h5>
                            <div>
                                <Link to='/blog/author/Adriana_Marcela_Torrenegra/' className="blog-learnmore-btn text-uppercase">Learn More</Link>
                            </div>
                        </Col>
                    </Row> 
                <Row className='my-3'>
                    <BlogFoot component='war' />
                </Row>
            </Container>
            <Footer />
        </div >
    )
}

export default Blog_full_8