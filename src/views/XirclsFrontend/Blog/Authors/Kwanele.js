import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Calendar, Mail } from 'react-feather'
import { Link } from 'react-router-dom'
import { SiLinkedin, SiTwitter } from 'react-icons/si'
import { blogs } from '../../../../Helper/data'
import Footer from '../../base/Footer'

const Kwanele = () => {
    return (
        <div className='products'>
                
                <Container className='px-md-3'>
                    <Row className='my-2 my-md-5 py-md-4 font-two'>
                        <Col lg={3}>
                            <Link to='/'>
                                <img className='rounded-circle' src={'https://api.xircls.com/static/images/website-slide/blog/a5.jpeg'} width={250} height={250} />
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
                                Kwanele Ngobese
                            </h3>
                            <h6 className='fw-lighter text-dark lh-x-small mb-2'>
                                Marketing & Branding Intern at XIRCLS
                            </h6>
                            <p className='sixth-font-blog fw-lighter text-dark lh-md mb-1'>Kwanele Ngobese is a marketing & branding intern at XIRCLS. She comes from the tropical town of Tzaneen, Limpopo and lives in Johannesburg, South Africa. She is currently in her final year at the University of South Africa, pursuing a BA in Communication Science. </p>
                            <p className='sixth-font-blog fw-lighter text-dark lh-md mb-1'>Kwanele’s passion for digital marketing, specifically branding, was sparked when the COVID-19 pandemic drove thousands of companies to go digital. She began to notice that businesses often struggle to build themselves into strong, sustainable brands or underestimate the importance of branding itself. </p>
                            <p className='sixth-font-blog fw-lighter text-dark lh-md mb-1'>For Kwanele, XIRCLS is a step towards fulfilling her career goal of working in brand strategy. She enjoys the inclusive and collaborative environment at XIRCLS that enables employees to reach their full potential in the work that they do. </p>
                        </Col>
                    </Row>
                    <Row className="py-6 font-two">
                        <Col xs={12}>
                            <p className='fw-light lh-x-small font-25px-res text-dark mb-2'>Posts By Kwanele Ngobese:</p>
                        </Col>
                        {blogs.filter(blog => blog.author === 'Kwanele Ngobese').map((blog, key) => {
                        return (
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
                        )
                    })}
                    </Row>
                </Container>
                <Footer />
        </div>
    )
}
export default Kwanele