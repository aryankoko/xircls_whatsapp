import { Row, Col } from 'reactstrap'
import { User, Calendar } from 'react-feather'
import { blogs } from '../../../Helper/data'
import { Link } from 'react-router-dom'

const BlogFoot = ({ component }) => {
    return (
        <>
            {blogs.filter(blog => blog.component !== component).map((blog, key) => {
                return (                    
                    <Col key={key} md={6} className='mb-4'>
                        <Row>
                            <Col sm={4} className='mb-1 mb-sm-0'><img className='w-100 h-100 rounded' src={blog.blogImage} /></Col>
                            <Col sm={8} className='d-flex flex-column justify-content-between'>
                                <Link to={blog.link} className='seventh-font-static font-two fw-light text-uppercase text-black hover-blue '>
                                    {blog.heading}
                                </Link>
                                <div className='d-flex justify-content-start align-items-center mt-1'>
                                    <span className='pe-1 d-flex justify-content-center align-items-center text-secondary font-two'><Calendar size={20} className='icon-gap-small' /> {blog.date} </span>
                                    <Link to={blog.authorLink} className='font-two border-start-dotted px-1 d-flex justify-content-center align-items-center text-secondary hover-black '><User size={20} className='icon-gap-small' /> {blog.authorShort ? blog.authorShort : blog.author} </Link>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                )
            })}
        </>
    )
}

export default BlogFoot