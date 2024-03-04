import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Calendar, Mail, User } from 'react-feather'
import { Link } from 'react-router-dom'
import { SiLinkedin, SiTwitter } from 'react-icons/si'
import { blogs } from '../../../../Helper/data'
import Footer from '../../base/Footer'

const Allie = () => {
    return (
        <div className='products'>
           
            <Container className='px-md-3'>
                <Row className='my-2 my-md-5 py-md-4 font-two'>
                    <Col lg={3}>
                        <Link to='/'>
                            <img className='rounded-circle' src={'https://api.xircls.com/static/images/website-slide/blog/a1.jpg'} width={250} height={250} />
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
                            Allie Hinds
                        </h3>
                        <h6 className='fw-lighter text-dark lh-x-small mb-2'>
                            Head of Content, XIRCLS
                        </h6>
                        <p className='sixth-font-blog fw-lighter text-dark lh-md mb-1'>As Head of Content at XIRCLS, Allie Hinds examines the current technological space and its tremendous impact on human behavior. She observes the correlation between the degradation of mental health and the circulation of images popular Tech companies use to influence their “ideals” on mainstream culture. With the help of the XIRCLS team, she strives to bring an awareness to the public about the manipulative tactics used by AdTech and MarTech giants, and how they have shifted the priorities of the masses from those of value to a distorted and diluted version of a Hollywood movie. </p>
                        <p className='sixth-font-blog fw-lighter text-dark lh-md mb-1'>Allie was born in Douglas, Georgia in the United States of America. She spent her childhood in Tampa, Florida and her adolescence in Northeast Tennessee. Even at a young age, Allie had quite an affinity for writing, winning her first scholarship in a state-wide contest in the fifth grade by the age of 12. Between the ages of thirteen and eighteen, she took several honors classes in Creative Writing and English, allowing her to develop and perfect her writing style. Throughout this time, she received several awards and accolades for her writing accomplishments, and decided to pursue Mass Communications in College, minoring in Broadcast Journalism at East Tennessee State University. After her freshman year, she took time off to pursue sales and had hopes to soon relocate. </p>
                        <p className='sixth-font-blog fw-lighter text-dark lh-md mb-1'>She eventually moved from Johnson City, Tennessee Charlotte, North Carolina where she transferred her credits to University of North Carolina Charlotte. Using her electives to explore Religion and Sexuality, Anthropology, Sociology and Epidemiology classes, she realized her writing interests were better suited toward the study of human behaviour. She changed her major to Psychology with a concentration in Media and Technology, in which she thrives at the University of Phoenix. </p>
                        <p className='sixth-font-blog fw-lighter text-dark lh-md mb-1'>Allie is a member of the National Society of Leadership and Success as well as The Golden Key International Honour Society where she currently attends courses to enhance her leadership skills as well as network with likeminded peers. </p>
                        <p className='sixth-font-blog fw-lighter text-dark lh-md mb-1'>Allie looks forward to collaborating with content writers all over the world who want to ask questions, challenge the status quo, provoke independent thought and encourage people to reflect on their own use of technology and its impact on the human mind. To join Allie's team, reach out to her via <Link to='/' className="text-blue hover-black">Twitter</Link>, <Link to='/' className="text-blue hover-black">LinkedIn</Link> or <Link to='/' className="text-blue hover-black">Email</Link> her. </p>
                    </Col>
                </Row>
                <Row className="py-6 font-two">
                    <Col xs={12}>
                        <p className='fw-light lh-x-small font-25px-res text-dark mb-2'>Posts By Allie Hinds:</p>
                    </Col>
                    {blogs.filter(blog => blog.author === 'Allie Hinds').map((blog, key) => {
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
export default Allie