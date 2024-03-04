import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Calendar, Mail } from 'react-feather'
import { Link } from 'react-router-dom'
import { SiLinkedin, SiTwitter } from 'react-icons/si'
import Footer from '../../base/Footer'
import { blogs } from '../../../../Helper/data'

const Adriana = () => {

    return (
        <div className='products'>
            
            <Container className='px-md-3'>
                <Row className='my-2 my-md-5 py-md-4 font-two'>
                    <Col lg={3}>
                        <Link to='/'>
                            <img className='rounded-circle' src={'https://api.xircls.com/static/images/website-slide/blog/a6.jpg'} width={250} height={250} />
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
                            Adriana Marcela Torrenegra
                        </h3>
                        <h6 className='fw-lighter text-dark lh-x-small mb-2'>
                            Copywriter & Content Writer at XIRCLS
                        </h6>
                        <p className='sixth-font-blog fw-lighter text-dark lh-md mb-1'>Adriana is a copywriter, content writer, and blogger at XIRCLS. She is also a Human Resources intern at the company.</p>
                        <p className='sixth-font-blog fw-lighter text-dark lh-md mb-1'>Adriana is currently pursuing a B.Sc in Integrated Social and Cognitive Psychology from Jacobs University Bremen.</p>
                        <p className='sixth-font-blog fw-lighter text-dark lh-md mb-1'>Adriana was born in the Caribbean coast of Colombia, in a charming and colourful city called Barranquilla. From an Italian descent, she has travelled to more than 15 countries throughout her lifetime. After delving in diverse cultures, she decided she wanted to reside in a culture exceptionally different from her own. Adriana is presently living and studying in Bremen, Germany. </p>
                        <p className='sixth-font-blog fw-lighter text-dark lh-md mb-1'>Adriana describes herself as a poet, a storyteller, and a writer. A self-confessed bibliophile she finds pleasure in using words to give an idea or an emotion a life of its own. </p>
                        <p className='sixth-font-blog fw-lighter text-dark lh-md mb-1'>Adriana is amused every day by creativity, profoundness and inspiration. At XIRCLS, Adriana enjoys working in an environment where superficiality is discouraged, and meaningful connections, relationships and ideas are celebrated. </p>
                        <p className='sixth-font-blog fw-lighter text-dark lh-md mb-1'>Reach out to Adriana on <Link to='/' className="text-blue hover-black">Twitter</Link>, <Link to='/' className="text-blue hover-black">LinkedIn</Link> or <Link to='/' className="text-blue hover-black">Email</Link> her. </p>
                    </Col>
                </Row>
                <Row className="py-6 font-two">
                    <Col xs={12}>
                        <p className='fw-light lh-x-small font-25px-res text-dark mb-2'>Posts By Adriana Marcela Torrenegra:</p>
                    </Col>
                    {blogs.filter(blog => blog.author === 'Adriana Marcela Torrenegra').map((blog, key) => {
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
export default Adriana