import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Calendar, Mail } from 'react-feather'
import { Link } from 'react-router-dom'
import { SiLinkedin, SiTwitter } from 'react-icons/si'
import { blogs } from '../../../../Helper/data'
import Footer from '../../base/Footer'
const Peyton = () => {
    return (
        <div className='products'>
           
            <Container className='px-md-3'>
                <Row className='my-2 my-md-5 py-md-4 font-two'>
                    <Col lg={3}>
                        <Link to='/'>
                            <img className='rounded-circle' src={'https://api.xircls.com/static/images/website-slide/blog/a4.jpg'} width={250} height={250} />
                        </Link>
                        <div className='d-flex align-items-center justify-content-start mt-2'>
                            <span className='sixth-font-blog fw-light icon-gap-small'>Follow on: </span>
                            <Link to='/'>
                                <div className='icon-gap-small display-icon overflow-hidden twitter rounded'>
                                    <div className="icon-container d-flex flex-column justify-content-between align-items-center">
                                        <span className='icon-social text-dark d-flex justify-content-center align-items-center'>
                                            <SiTwitter size={17.5} />
                                        </span>
                                        <span className='icon-social text-light d-flex justify-content-center align-items-center'>
                                            <SiTwitter size={17.5} />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                            <Link to='/'>
                                <div className='icon-gap-small display-icon overflow-hidden linkedin rounded'>
                                    <div className="icon-container d-flex flex-column justify-content-between align-items-center">
                                        <span className='icon-social text-dark d-flex justify-content-center align-items-center'>
                                            <SiLinkedin size={17.5} />
                                        </span>
                                        <span className='icon-social text-light d-flex justify-content-center align-items-center'>
                                            <SiLinkedin size={17.5} />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                            <Link to='/'>
                                <div className='icon-gap-small display-icon overflow-hidden mail rounded'>
                                    <div className="icon-container d-flex flex-column justify-content-between align-items-center">
                                        <span className='icon-social text-dark d-flex justify-content-center align-items-center'>
                                            <Mail size={17.5} />
                                        </span>
                                        <span className='icon-social text-light d-flex justify-content-center align-items-center'>
                                            <Mail size={17.5} />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </Col>
                    <Col lg={9} className='ps-md-4'>
                        <h3 className='fw-lighter text-dark lh-x-small mb-2'>
                            Peyton Sweeney
                        </h3>
                        <h6 className='fw-lighter text-dark lh-x-small mb-2'>
                            Content Writer, XIRCLS
                        </h6>
                        <p className='sixth-font-blog fw-lighter text-dark lh-md mb-1'>Peyton is based in the United States and is from Saint Louis, Missouri. She attended Lindenwood University and graduated with a B.A. in International Relations. After college, Peyton accepted a position as a reporter for two newspapers in the Saint Louis area. </p>
                        <p className='sixth-font-blog fw-lighter text-dark lh-md mb-1'>Through her academic and professional experience, Peyton has developed a passion for telling peoples’ stories and ensuring that people are both accurately informed and heard. </p>
                        <p className='sixth-font-blog fw-lighter text-dark lh-md mb-1'>As a reporter, Peyton’s job included acting as a watchdog, and ensuring that government entities were conducting themselves legally and ethically. Peyton believes that the same scrutiny must also be applied to businesses. She is passionate about international cooperation, sustainability, and human rights. </p>
                        <p className='sixth-font-blog fw-lighter text-dark lh-md mb-1'>At XIRCLS, Peyton strives to deliver thought-provoking pieces on the evolving internationalbusiness and marketing sector. You can reach out to Peyton on LinkedIn. </p>
                        <p className='sixth-font-blog fw-lighter text-dark lh-md mb-1'>Reach out to Peyton Sweeney on <Link to='/' className="text-blue hover-black">Twitter</Link>, <Link to='/' className="text-blue hover-black">LinkedIn</Link> or <Link to='/' className="text-blue hover-black">Email</Link> her. </p>
                    </Col>
                </Row>
                <Row className="py-6 font-two">
                    <Col xs={12}>
                        <p className='fw-light lh-x-small font-25px-res text-dark mb-2'>Posts By Peyton Sweeney:</p>
                    </Col>
                    {blogs.filter(blog => blog.author === 'Peyton Sweeney').map((blog, key) => {
                        return (
                            <>
                                <Col id={`blogCard-${key}`} key={key} sm={4} className='mb-3'>
                                    <div className='border rounded overflow-hidden'>
                                        <img src={blog.blogImage} className='w-100' />
                                        <div className='p-2'>

                                            <div className='font-12px-st text-light-gray'>
                                                <Calendar size={12} /> {blog.date}
                                            </div>
                                            <Link to={blog.link} className='fw-light font-16px-res text-black hover-blue text-uppercase'>{blog.heading}</Link>
                                        </div>

                                    </div>
                                </Col>
                            </>
                        )
                    })}
                </Row>
            </Container>
            <Footer />
        </div>
    )
}
export default Peyton