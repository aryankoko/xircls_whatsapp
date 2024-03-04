import React, { useState } from 'react'
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { Facebook, Linkedin, Mail, Twitter, X } from 'react-feather'
import { Link } from 'react-router-dom'
import Footer from './base/Footer'
import { SiLinkedin } from 'react-icons/si'

const Team = () => {
    const [modal1, setModal1] = useState(false)
    const [modal2, setModal2] = useState(false)
    const [modal3, setModal3] = useState(false)

    return (
        <div className="products">
            <Container fluid className='back-beige py-1'>
                <Container>
                    <Row>
                        <Col md={12} className='py-3 px-md-4'>
                            <h3 className='fw-medium text-black three-quarter-font letter-spacing-1 mb-1 text-uppercase'>Founding Team</h3>
                        </Col>
                    </Row>
                </Container>
            </Container>
            <Container fluid className='my-5'>
                <Container>
                    <Row className=''>
                        <Col md={5} className='img-1 min-vh-75' style={{background: `url('https://api.xircls.com/static/images/website-slide/team/Deepak.jpg') center center no-repeat`, backgroundSize: 'cover'}}>
                            {/* <img className='w-100 h-100' src={'https://api.xircls.com/static/images/website-slide/team/Deepak.jpg'} /> */}
                            
                        </Col>
                        <Col md={7} className='px-md-5'>
                            <Row style={{paddingLeft: '10px'}}>
                                <Col md={12} className='py-5'>
                                    <h3 className='fw-bold text-blue fs-4 mb-1'>
                                        CEO & Co-Founder
                                    </h3>
                                    <h2 className='text-dark fs-1'><span className="underline-3">De</span>epak Dhingra</h2>
                                </Col>
                                <Col md={12} className='mb-2'>
                                    <p className='text-black font-two fw-bolder lh-md seventh-font'>A technology entrepreneur who has worked deep in the heart of the Indian retail industry for over three decades.</p>
                                    <p className="text-black font-two fw-normal lh-md seventh-font">In 1986, Deepak Dhingra dropped out of college and began working in South Bombay’s niche retail shops, doing everything from product procurement to front-end sales.</p>
                                    <p className="text-black font-two fw-normal lh-md seventh-font">After breaking off for two years to give India its first local cable TV network in Mumbai, he returned to retail as e-commerce arrived in India in the late-90s.</p>
                                    <p className="text-black font-two fw-normal lh-md seventh-font">Deepak set up one of India’s first boutique digital agencies, M/s Nucleus Advertising and M/s Nucleus Internet, to offer marketing, advertising, communication, Internet and E-commerce solutions to scores of small to medium-size retailers. <span onClick={() => setModal1(!modal1)} className="text-blue cursor-pointer">Read More</span></p>
                                </Col>
                                <Col md={12} className='mb-5'>
                                    <Row>
                                        <Col lg={1} xs={2}>
                                            <div className='display-icon overflow-hidden linkedin rounded'>
                                                <a target='_blank' href='https://www.linkedin.com/in/deepakdhingra1969'>
                                                    <div className="icon-container d-flex flex-column justify-content-between align-items-center">
                                                        <span className='icon-social text-dark d-flex justify-content-center align-items-center'>
                                                           <SiLinkedin size={17.5} />
                                                        </span>
                                                        <span className='icon-social text-light d-flex justify-content-center align-items-center'>
                                                           <SiLinkedin size={17.5} />
                                                        </span>
                                                    </div>
                                                </a>
                                            </div>
                                        </Col>
                                        <Col lg={1} xs={2}>
                                            <div className='display-icon overflow-hidden twitter rounded'>
                                                <a target='_blank' href='https://twitter.com/deepakd1969'>
                                                    <div className="icon-container d-flex flex-column justify-content-between align-items-center">
                                                        <span className='icon-social text-dark d-flex justify-content-center align-items-center'>
                                                            <Twitter size={20} />
                                                        </span>
                                                        <span className='icon-social text-light d-flex justify-content-center align-items-center'>
                                                            <Twitter size={20} />
                                                        </span>
                                                    </div>
                                                </a>
                                            </div>
                                        </Col>
                                        <Col lg={1} xs={2}>
                                            <div className='display-icon overflow-hidden mail rounded'>
                                                <a href='mailto:deepak@xircls.com?&subject=&cc=&bcc=&body=&ogbl%23inbox/FMfcgzGmvnxHzjJXRmBwwzJxbMhQHFdM?compose=CllgCJTKWKrsmQKLBxSNCmDxgpbrPkKBRXwDhRCMmKpqQvkBpVXRXWzKHXSjGqVTfshktLFnsXq'>
                                                    <div className="icon-container d-flex flex-column justify-content-between align-items-center">
                                                        <span className='icon-social text-dark d-flex justify-content-center align-items-center'>
                                                            <Mail size={20} />
                                                        </span>
                                                        <span className='icon-social text-light d-flex justify-content-center align-items-center'>
                                                            <Mail size={20} />
                                                        </span>
                                                    </div>
                                                </a>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Container>
            <Container fluid className='my-5'>
                <Container>
                    <Row className='justify-content-center align-items-center'>
                        <Col lg={6} className='mb-5'>
                            <Row className=''>
                                <Col md={6} className='d-flex justify-content-center align-items-center py-4'>
                                    <img width="306px" height="374px" src={'https://api.xircls.com/static/images/website-slide/team/Pallavi.jpg'} />
                                </Col>
                                <Col md={6} className='px-md-2 d-flex flex-column justify-content-center align-items-center'>
                                    <Row>
                                        <Col md={12}>
                                            <h2 className='text-dark fw-bolder text-uppercase fs-2'>Pallavi Dhingra</h2>
                                            <h4 className='fw-bold fs-7 fst-italic text-blue mb-1'>
                                                Co-Founder
                                            </h4>
                                        </Col>
                                        <Col md={12}>
                                            <p className='text-black fw-bolder lh-md seventh-font'>Pallavi is a client management and advertising professional with expertise in the luxury retail & hospitality space.</p>
                                            <p className="text-black fw-normal lh-md seventh-font">Pallavi is a History graduate from Sophia College with a Master’s Degree in Ancient Indian Culture from Xavier’s Institute of Communication. <span onClick={() => setModal2(!modal2)} className="text-blue cursor-pointer">Read More</span></p>
                                        </Col>
                                        <Col md={12}>
                                            <Row>
                                                <Col xs={2}>
                                                    <div className='display-icon overflow-hidden linkedin rounded'>
                                                        <a target='_blank' href='https://www.linkedin.com/in/pallavi-dhingra'>
                                                            <div className="icon-container d-flex flex-column justify-content-between align-items-center">
                                                                <span className='icon-social text-dark d-flex justify-content-center align-items-center'>
                                                                   <SiLinkedin size={17.5} />
                                                                </span>
                                                                <span className='icon-social text-light d-flex justify-content-center align-items-center'>
                                                                   <SiLinkedin size={17.5} />
                                                                </span>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </Col>
                                                <Col xs={2}>
                                                    <div className='display-icon overflow-hidden mail rounded'>
                                                        <a href='mailto:pallavi@xircls.com?&subject=&cc=&bcc=&body=&ogbl%23inbox/FMfcgzGmvnxHzjJXRmBwwzJxbMhQHFdM?compose=CllgCJTKWKrsmQKLBxSNCmDxgpbrPkKBRXwDhRCMmKpqQvkBpVXRXWzKHXSjGqVTfshktLFnsXq'>
                                                            <div className="icon-container d-flex flex-column justify-content-between align-items-center">
                                                                <span className='icon-social text-dark d-flex justify-content-center align-items-center'>
                                                                    <Mail size={20} />
                                                                </span>
                                                                <span className='icon-social text-light d-flex justify-content-center align-items-center'>
                                                                    <Mail size={20} />
                                                                </span>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={6} className='mb-5'>
                            <Row className=''>
                                <Col md={6} className='d-flex justify-content-center align-items-center py-4'>
                                    <img width="306px" height="374px" src={'https://api.xircls.com/static/images/website-slide/team/UTTARIKA.jpg'} />
                                </Col>
                                <Col md={6} className='px-md-2 d-flex flex-column justify-content-center align-items-center'>
                                    <Row>
                                        <Col md={12}>
                                            <h2 className='text-dark fw-bolder text-uppercase fs-2'>Uttarika Kumaran</h2>
                                            <h4 className='fw-bold fs-5 fst-italic text-blue mb-1'>
                                                Co-Founder
                                            </h4>
                                        </Col>
                                        <Col md={12}>
                                            <p className='text-black fw-bolder lh-md seventh-font'>A former journalist and marketing communications specialist. </p>
                                            <p className="text-black fw-normal lh-md seventh-font">Uttarika began her career as a journalist and copy editor in leading print houses in Mumbai & Hyderabad, but was disgruntled with paid news and sponsored content taking over mainstream journalism. <span onClick={() => setModal3(!modal3)} className="text-blue cursor-pointer">Read More</span></p>
                                        </Col>
                                        <Col md={12}>
                                            <Row>
                                                <Col xs={2}>
                                                    <div className='display-icon overflow-hidden linkedin rounded'>
                                                        <a target='_blank' href='https://www.linkedin.com/in/uttarika'>
                                                            <div className="icon-container d-flex flex-column justify-content-between align-items-center">
                                                                <span className='icon-social text-dark d-flex justify-content-center align-items-center'>
                                                                   <SiLinkedin size={17.5} />
                                                                </span>
                                                                <span className='icon-social text-light d-flex justify-content-center align-items-center'>
                                                                   <SiLinkedin size={17.5} />
                                                                </span>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </Col>
                                                <Col xs={2}>
                                                    <div className='display-icon overflow-hidden mail rounded'>
                                                        <a href='mailto:uttarika@xircls.com?&subject=&cc=&bcc=&body=&ogbl%23inbox/FMfcgzGmvnxHzjJXRmBwwzJxbMhQHFdM?compose=CllgCJTKWKrsmQKLBxSNCmDxgpbrPkKBRXwDhRCMmKpqQvkBpVXRXWzKHXSjGqVTfshktLFnsXq'>
                                                            <div className="icon-container d-flex flex-column justify-content-between align-items-center">
                                                                <span className='icon-social text-dark d-flex justify-content-center align-items-center'>
                                                                    <Mail size={20} />
                                                                </span>
                                                                <span className='icon-social text-light d-flex justify-content-center align-items-center'>
                                                                    <Mail size={20} />
                                                                </span>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Container>
            <Container fluid className='my-5'>
                <Container>
                    <Row className=''>
                        <Col md={12}>
                            <h3 className='mt-5 mb-3 third-font text-dark text-center'>
                                <span className="overline">Team</span>
                            </h3>
                        </Col>
                    </Row>
                    <Row className=''>
                        <Col lg={4} sm={6} className='mb-5 text-center'>
                            <div className='parent'>
                                <div className='image-center d-flex justify-content-center align-items-center'>
                                    <img className='mb-2' width={306} height={374} src={'https://api.xircls.com/static/images/website-slide/team/Harshitha.jpg'} />
                                </div>
                                <h4 className='text-uppercase fw-bolder fs-3 text-dark'>Harshitha Shah</h4>
                                <p className='fw-bold fs-5 fst-italic text-blue mb-1'>
                                    HR & Marketing Co-ordinator
                                </p>
                                <Row>
                                    <Col md={12} className='d-flex justify-content-center align-items-center gap-2'>
                                        <div className='display-icon overflow-hidden linkedin rounded'>
                                            <a target='_blank' href='https://www.linkedin.com/in/harshitha-shah-3977011a2'>
                                                <div className="icon-container d-flex flex-column justify-content-between align-items-center">
                                                    <span className='icon-social text-dark d-flex justify-content-center align-items-center'>
                                                       <SiLinkedin size={17.5} />
                                                    </span>
                                                    <span className='icon-social text-light d-flex justify-content-center align-items-center'>
                                                       <SiLinkedin size={17.5} />
                                                    </span>
                                                </div>
                                            </a>
                                        </div>
                                        <div className='display-icon overflow-hidden mail rounded'>
                                            <a href='mailto:harshitha@xircls.com?&subject=&cc=&bcc=&body=&ogbl%23inbox/FMfcgzGmvnxHzjJXRmBwwzJxbMhQHFdM?compose=CllgCJTKWKrsmQKLBxSNCmDxgpbrPkKBRXwDhRCMmKpqQvkBpVXRXWzKHXSjGqVTfshktLFnsXq'>
                                                <div className="icon-container d-flex flex-column justify-content-between align-items-center">
                                                    <span className='icon-social text-dark d-flex justify-content-center align-items-center'>
                                                        <Mail size={20} />
                                                    </span>
                                                    <span className='icon-social text-light d-flex justify-content-center align-items-center'>
                                                        <Mail size={20} />
                                                    </span>
                                                </div>
                                            </a>
                                        </div>
                                    </Col>
                                </Row>

                            </div>
                        </Col>
                        <Col lg={4} sm={6} className='mb-5 text-center'>
                            <div className='parent'>
                                <div className='image-center d-flex justify-content-center align-items-center'>
                                    <img className='mb-2' width={306} height={374} src={'https://api.xircls.com/static/images/website-slide/team/Astha.jpeg'} />
                                </div>
                                <h4 className='text-uppercase fw-bolder fs-3 text-dark'>Astha Botadra</h4>
                                <p className='fw-bold fs-5 fst-italic text-blue mb-1'>
                                    Assistant Operations Manager
                                </p>
                            
                                <Row>
                                    <Col md={12} className='d-flex justify-content-center align-items-center gap-2'>
                                        <div className='display-icon overflow-hidden linkedin rounded'>
                                            <a target='_blank' href='https://www.linkedin.com/in/astha-botadra-a283361ab'>
                                                <div className="icon-container d-flex flex-column justify-content-between align-items-center">
                                                    <span className='icon-social text-dark d-flex justify-content-center align-items-center'>
                                                       <SiLinkedin size={17.5} />
                                                    </span>
                                                    <span className='icon-social text-light d-flex justify-content-center align-items-center'>
                                                       <SiLinkedin size={17.5} />
                                                    </span>
                                                </div>
                                            </a>
                                        </div>
                                        <div className='display-icon overflow-hidden mail rounded'>
                                            <a href='mailto:astha.botadra@xircls.com?&subject=&cc=&bcc=&body=&ogbl%23inbox/FMfcgzGmvnxHzjJXRmBwwzJxbMhQHFdM?compose=CllgCJTKWKrsmQKLBxSNCmDxgpbrPkKBRXwDhRCMmKpqQvkBpVXRXWzKHXSjGqVTfshktLFnsXq'>
                                                <div className="icon-container d-flex flex-column justify-content-between align-items-center">
                                                    <span className='icon-social text-dark d-flex justify-content-center align-items-center'>
                                                        <Mail size={20} />
                                                    </span>
                                                    <span className='icon-social text-light d-flex justify-content-center align-items-center'>
                                                        <Mail size={20} />
                                                    </span>
                                                </div>
                                            </a>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col lg={4} sm={6} className='mb-5 text-center'>
                            <div className='parent'>
                                <div className='image-center d-flex justify-content-center align-items-center'>
                                    <img className='mb-2' width={306} height={374} src={'https://api.xircls.com/static/images/website-slide/team/Anish.jpg'} />
                                    </div>
                                <h4 className='text-uppercase fw-bolder fs-3 text-dark'>Anish Saha</h4>
                                <p className='fw-bold fs-5 fst-italic text-blue mb-1'>
                                    Head - Partnerships | Head - Sales
                                </p>
                                <Row>
                                    <Col md={12} className='d-flex justify-content-center align-items-center gap-2'>
                                        <div className='display-icon overflow-hidden linkedin rounded'>
                                            <a target='_blank' href='https://www.linkedin.com/in/anish-saha-410574146'>
                                                <div className="icon-container d-flex flex-column justify-content-between align-items-center">
                                                    <span className='icon-social text-dark d-flex justify-content-center align-items-center'>
                                                       <SiLinkedin size={17.5} />
                                                    </span>
                                                    <span className='icon-social text-light d-flex justify-content-center align-items-center'>
                                                       <SiLinkedin size={17.5} />
                                                    </span>
                                                </div>
                                            </a>
                                        </div>
                                        <div className='display-icon overflow-hidden mail rounded'>
                                            <a href='mailto:anish@xircls.com?&subject=&cc=&bcc=&body=&ogbl%23inbox/FMfcgzGmvnxHzjJXRmBwwzJxbMhQHFdM?compose=CllgCJTKWKrsmQKLBxSNCmDxgpbrPkKBRXwDhRCMmKpqQvkBpVXRXWzKHXSjGqVTfshktLFnsXq'>
                                                <div className="icon-container d-flex flex-column justify-content-between align-items-center">
                                                    <span className='icon-social text-dark d-flex justify-content-center align-items-center'>
                                                        <Mail size={20} />
                                                    </span>
                                                    <span className='icon-social text-light d-flex justify-content-center align-items-center'>
                                                        <Mail size={20} />
                                                    </span>
                                                </div>
                                            </a>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>
            <Modal className='products team-modal rounded' isOpen={modal1}>
                <ModalHeader>
                    <div className="w-100 d-flex justify-content-between align-items-start"><span className='third-font fw-bolder text-dark'>Deepak Dhingra</span><span className='cursor-pointer' onClick={() => setModal1(!modal1)}><X /></span></div>
                </ModalHeader>
                <ModalBody className='overflow-auto h-75vh'>
                    <p className='text-black fw-bolder lh-md seventh-font'>A technology entrepreneur who has worked deep in the heart of the Indian retail industry for over three decades.</p>
                    <p className="text-black fw-normal lh-md seventh-font">In 1986, Deepak Dhingra dropped out of college and began working in South Bombay’s niche retail shops, doing everything from product procurement to front-end sales.</p>
                    <p className="text-black fw-normal lh-md seventh-font">After breaking off for two years to give India its first local cable TV network in Mumbai, he returned to retail as e-commerce arrived in India in the late-90s.</p>
                    <p className="text-black fw-normal lh-md seventh-font">Deepak set up one of India’s first boutique digital agencies, M/s Nucleus Advertising and M/s Nucleus Internet, to offer marketing, advertising, communication, Internet and E-commerce solutions to scores of small to medium-size retailers.He has worked in Fashion, Food, Travel, Hospitality and the Beauty sectors, and his clients have included Intercontinental Marine Drive (a landmark Mumbai hotel), High Street Phoenix (India’s first premium shopping mall) and Cheryl's Cosmeceuticals (now a L'Oreal-owned brand).</p>
                    <p className="text-black fw-normal lh-md seventh-font">No matter how big or small their companies were, Deepak saw a common problem that all his clients faced - how to use limited marketing budgets to reach out to the largest possible customer base for higher conversions and better retention. A growing digital-savvy middle-class with rising incomes meant that multiple businesses in different sectors were often targeting the same online customer base. Furthermore, ad fraud and lack of transparency in online advertising meant that companies couldn’t really measure the performance of their campaigns or know for certain that their ads were reaching actual human beings.</p>
                    <p className="text-black fw-normal lh-md seventh-font">In 2012, Deepak and his team set up the online consumer video reviews platform RealReviews.in to explore the possibility of a more authentic and direct relationship between consumers and companies, not sullied by corporate interests and paid advertising.</p>
                    <p className="text-black fw-normal lh-md seventh-font">This same vision was given another form with ShopLyne, which Deepak co-founded in 2015 under the partnership firm Nucleus Digital. ShopLyne was a hyperlocal marketplace app where local retailers were empowered with mobile technology - at a fraction of the cost of creating and maintaining their own mobile app - to sell and market directly to their customers. Retailers loved the idea and came onboard, but when it came to marketing themselves, they were again restricted by their ability to spend.</p>
                    <p className="text-black fw-normal lh-md seventh-font">The way out of this conundrum came as a flash to Deepak, and eventually became the building block for the XIRCLS collaborative marketing technology as it exists today.</p>
                    <p className="text-black fw-normal lh-md seventh-font">It was promoted as the Get Back All You Spend promise, where merchants on ShopLyne could pool in their offers to collectively reward their customers as well as acquire new ones. However, Deepak quickly realized the immense global potential of cross-marketing on a digital platform, not just for small to medium size retailers but also large consumer product companies, as well as other big players in the retail space, such as manufacturers and distributors. ShopLyne thus pivoted to XIRCLS in its present form.</p>
                    <p className="text-black fw-normal lh-md seventh-font">Deepak has been at the helm of ideation, the technology build and charting a vision for XIRCLS, which has grown from just one product to multiple products catering to diverse industries.</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() => setModal1(!modal1)}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
            <Modal className='products team-modal rounded' isOpen={modal2}>
                <ModalHeader>
                    <div className="w-100 d-flex justify-content-between align-items-start"><span className='third-font fw-bolder text-dark'>Pallavi Dhingra</span><span className='cursor-pointer' onClick={() => setModal2(!modal2)}><X /></span></div>
                </ModalHeader>
                <ModalBody className='overflow-auto h-75vh'>
                    <p className='text-black fw-bolder lh-md seventh-font'>Pallavi is a client management and advertising professional with expertise in the luxury retail & hospitality space. </p>
                    <p className="text-black fw-normal lh-md seventh-font">Pallavi is a History graduate from Sophia College with a Master’s Degree in Ancient Indian Culture from Xavier’s Institute of Communication.</p>
                    <p className="text-black fw-normal lh-md seventh-font">Pallavi believes human relationships are what drive the world, including the world of commerce where companies can benefit from realizing the importance of nurturing authentic relationships with their customers.</p>
                    <p className="text-black fw-normal lh-md seventh-font">Over the past 20 years, along with her husband Deepak, Pallavi has managed prominent clients in the luxury retail and hospitality sector. Pallavi has previously worked with the Tata Group and the Times of India Group. She is also a former voiceover and theatre actor. </p>
                    <p className="text-black fw-normal lh-md seventh-font">At XIRCLS, Pallavi oversees sales training, sales communications and client relationship building. </p>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() => setModal2(!modal2)}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
            <Modal className='products team-modal rounded' isOpen={modal3}>
                <ModalHeader>
                    <div className="w-100 d-flex justify-content-between align-items-start"><span className='third-font fw-bolder text-dark'>Uttarika Kumaran</span><span className='cursor-pointer' onClick={() => setModal3(!modal3)}><X /></span></div>
                </ModalHeader>
                <ModalBody className='overflow-auto h-75vh'>
                    <p className='text-black fw-bolder lh-md seventh-font'>A former journalist and marketing communications specialist. </p>
                    <p className="text-black fw-normal lh-md seventh-font">Uttarika began her career as a journalist and copy editor in leading print houses in Mumbai & Hyderabad, but was disgruntled with paid news and sponsored content taking over mainstream journalism.</p>
                    <p className="text-black fw-normal lh-md seventh-font">She left the media industry to join Deepak in 2012 and dive into the ‘other side’ by developing marketing strategies & content for retail clients. Watching small and mid-sized companies grapple with an intentionally nebulous world of online advertising, she was convinced that businesses must have more ethical and transparent options to engage consumers online.</p>
                    <p className="text-black fw-normal lh-md seventh-font">Alongside Deepak and with this shared vision in mind, Uttarika has co-founded the online video reviews project Real Reviews, the hyperlocal marketplace app ShopLyne and now XIRCLS, which she believes is the perfect solution for commercial and human interests to co-exist.</p>
                    <p className="text-black fw-normal lh-md seventh-font">At XIRCLS, Uttarika supervises operations, human resources and communications.</p>
                    <p className="text-black fw-normal lh-md seventh-font">Uttarika is an English Literature graduate from St. Xavier’s College, Mumbai, with a Master’s Degree in Culture Studies. </p>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() => setModal3(!modal3)}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
            <Footer />
        </div>
    )
}

export default Team