import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Calendar, Mail } from 'react-feather'
import { Link } from 'react-router-dom'
import { SiFacebook, SiLinkedin } from 'react-icons/si'
import Footer from '../../base/Footer'
import { blogs } from '../../../../Helper/data'

const Shakercha = () => {
    return (
        <div className='products'>            
            <Container className='px-md-3'>
                <Row className='my-2 my-md-5 py-md-4 font-two'>
                    <Col lg={3}>
                        <Link to='/'>
                            <img className='rounded-circle' src={'https://api.xircls.com/static/images/website-slide/blog/a7.jpeg'} width={250} height={250} />
                        </Link>
                        <div className='d-flex align-items-center justify-content-start mt-2'>
                            <span className='sixth-font-blog fw-light icon-gap-small'>Follow on: </span>
                            <Link to='/'>
                                <div className='icon-gap-small display-icon overflow-hidden facebook rounded'>
                                    <div className="icon-container d-flex flex-column justify-content-between align-items-center">
                                        <span className='icon-social text-dark d-flex justify-content-center align-items-center'>
                                            <SiFacebook size={17.5} />
                                        </span>
                                        <span className='icon-social text-light d-flex justify-content-center align-items-center'>
                                            <SiFacebook size={17.5} />
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
                            Shakercha Bradshaw
                        </h3>
                        <h6 className='fw-lighter text-dark lh-x-small mb-2'>
                            Content Writer at XIRCLS.
                        </h6>
                        <p className='sixth-font-blog fw-lighter text-dark lh-md mb-1'>Shakercha has a B.A. in English from Florida International University and she is currently obtaining her M.Sc. degree in Curriculum Instruction and Design. </p>
                        <p className='sixth-font-blog fw-lighter text-dark lh-md mb-1'>Shakercha grew up in Miami, Florida, for the majority of her life. However, she currently lives in Northern California. Before joining XIRCLS, she served in the United States Air Force for 4 years as a Paralegal. </p>
                        <p className='sixth-font-blog fw-lighter text-dark lh-md mb-1'>She is passionate about writing, researching, and working with others. Shakercha is happy to be working with different content writers from all over the world and writing thought-provoking pieces. </p>
                        <p className='sixth-font-blog fw-lighter text-dark lh-md mb-1'>Reach out to Shakercha on <Link to='/' className="text-blue hover-black">Facebook</Link>, <Link to='/' className="text-blue hover-black">LinkedIn</Link> or <Link to='/' className="text-blue hover-black">Email</Link> her. </p>
                    </Col>
                </Row>
                <Row className="py-6 font-two">
                    <Col xs={12}>
                        <p className='fw-light lh-x-small font-25px-res text-dark mb-2'>Posts By Shakercha Bradshaw:</p>
                    </Col>
                    {blogs.filter(blog => blog.author === 'Shakercha Bradshaw').map((blog, key) => {
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
export default Shakercha