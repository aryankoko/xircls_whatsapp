import React from 'react'
import { Container, Row, Col, Card, CardBody } from 'reactstrap'
import { Calendar, Mail, User } from 'react-feather'
import { Link } from 'react-router-dom'
import { SiFacebook, SiWhatsapp, SiLinkedin, SiTwitter } from 'react-icons/si'
import { blogs } from '../../../../Helper/data'
import Footer from '../../base/Footer'
const Lauren = () => {
    return (
        <div className='products'>
            
            <Container className='px-md-3'>
                <Row className='my-2 my-md-5 py-md-4 font-two'>
                    <Col lg={3}>
                        <Link to='/'>
                            <img className='rounded-circle' src={'https://api.xircls.com/static/images/website-slide/blog/a2.jpeg'} width={250} height={250} />
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
                            Lauren Deah
                        </h3>
                        <h6 className='fw-lighter text-dark lh-x-small mb-2'>
                            Content Writer, XIRCLS
                        </h6>
                        <p className='sixth-font-blog fw-lighter text-dark lh-md mb-1'>Lauren Deah is a copywriter, content writer and blogger at XIRCLS. </p>
                        <p className='sixth-font-blog fw-lighter text-dark lh-md mb-1'>Lauren has a B.A. in Creative Writing and English from The University of Southern New Hampshire, and she is a member of the Sigma Tau Delta English Honors Society. </p>
                        <p className='sixth-font-blog fw-lighter text-dark lh-md mb-1'>Lauren grew up on the East Coast of the United States and traveled around the world after high school. She has come full circle and is once again living in Maryland. </p>
                        <p className='sixth-font-blog fw-lighter text-dark lh-md mb-1'>She enjoys using her talents as a writer to work for causes she believes in, including: Human Rights, Voters’ Rights, Healthcare Rights, Environmental Rights, Workers’ Rights, Consumers’ Rights, Ethics in Business, and the Right to Privacy. </p>
                        <p className='sixth-font-blog fw-lighter text-dark lh-md mb-1'>At XIRCLS, Lauren is happy to be working with a progressive, forward-thinking, globally ethical company that makes it possible to measure and value results, without going through a third party. </p>
                        <p className='sixth-font-blog fw-lighter text-dark lh-md mb-1'>Reach out to Shakercha on <Link to='/' className="text-blue hover-black">Twitter</Link>, <Link to='/' className="text-blue hover-black">LinkedIn</Link> or <Link to='/' className="text-blue hover-black">Email</Link> her. </p>
                    </Col>
                </Row>
                <Row className="py-6 font-two">
                    <Col xs={12}>
                        <p className='fw-light lh-x-small font-25px-res text-dark mb-2'>Posts By Lauren Deah:</p>
                    </Col>
                    {blogs.filter(blog => blog.author === 'Lauren Deah').map((blog, key) => {
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
export default Lauren