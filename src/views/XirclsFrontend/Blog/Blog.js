import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Calendar, User } from 'react-feather'
import { Link } from 'react-router-dom'
import Footer from '../base/Footer'
import { blogs } from '../../../Helper/data'

const Blog = () => {
    return (
        <div className="products">
            <Container fluid className='back-beige py-2'>
                <Container>
                    <Row>
                        <Col md={12} className='py-4'>
                            <h3 className='font-two fw-light blog-text-black pre-fourth-font letter-spacing-1 mb-1'>THE XIRCLS BLOG</h3>
                            <p className='fifth-font text-dark'>News, opinions and perspectives on a more collaborative world.</p>
                        </Col>
                    </Row>
                </Container>
            </Container>
            {
                blogs.map((blog, key) => (
                    <Container fluid className='py-2' id={`blog-${key + 1}`}>
                        <Container>
                            <Row className='py-5'>
                                <Col md={12}>
                                    <Link to={blog.link} >
                                        <h3 className='font-two fw-light blog-text-black pre-fourth-font letter-spacing-1 mb-1 text-uppercase'>{blog.heading}</h3>
                                    </Link>
                                </Col>
                                <Col md={12}>
                                    <Row className='mb-1'>
                                        <Col md={12} className='d-flex font-two'>
                                            <div className='sixth-font-blog pe-2 d-flex gap-1 align-items-center'>
                                                <Calendar /> {blog.date}
                                            </div>
                                            <Link to={blog.authorLink} style={{color: '#6D6B7A', textDecoration: 'none'}}>
                                                <div className='sixth-font-blog px-2 d-flex gap-1 align-items-center border-start-dotted hover-black'>
                                                    <User /> <span className="cursor-pointer">{blog.author}</span>
                                                </div>
                                            </Link>
                                        </Col>
                                    </Row>
                                    <Row className='mb-3'>
                                        <Col md={12}>
                                            <Link to={blog.link}><img src={blog.blogImage} className='w-100' /></Link>
                                        </Col>
                                    </Row>
                                    <Row className='mb-1'>
                                        <Col md={12}>
                                            <p className='font-two fw-light blog-text-black lh-lg-md sixth-font-blog text-justify'>{blog.description}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <Link to={blog.link} className='fst-italic sixth-font-blog text-blue hover-black underline-4'>Read More</Link>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    </Container>
                ))
            }
            
            <Footer />
        </div>
    )
}

export default Blog