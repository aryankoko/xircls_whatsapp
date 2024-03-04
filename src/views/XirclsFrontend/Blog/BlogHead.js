import { Row, Col } from 'reactstrap'
import { Calendar } from 'react-feather'
import { blogs } from '../../../Helper/data'
import { Link } from 'react-router-dom'

const BlogHead = ({ component }) => {
    return (
        <>
            {blogs.filter(blog => blog.component === component).map((blog, key) => {
                return (                    
                    <div className='pb-2' key={key}>
                        <Row className='mb-1 mt-2'>
                            <Col md={12} className='d-flex'>
                                <div className='eighth-font px-1 d-flex align-items-center border-start-dotted' style={{ gap: `5px` }}>
                                    <Calendar size={16} className='icon-gap-small' style={{ marginBottom: `2px` }} /> {blog.date}
                                </div>
                            </Col>
                        </Row>
                        <Row style={{ paddingRight: `var(--bs-gutter-x,.75rem)`, paddingLeft: `var(--bs-gutter-x,.75rem)` }}>
                            <Col md={7} className="p-0">
                                <h2 className='font-two fw-normal text-dark mb-1 second-font'>{blog.heading}</h2>
                            </Col>
                            <Col md={2}>
                            </Col>
                            <Col md={3} className='blog-img d-flex align-items-center justify-content-center'>
                                <Link to={blog.authorLink} className="text-center">
                                    <img width={120} height={120} className='rounded-circle mb-1' src={blog.authorImage} />
                                    <h5 className='fw-bolder text-dark fs-4 font-two'>{blog.author}</h5>
                                    <p className='font-two fs-4 text-dark'>{blog.authorRole}</p>
                                </Link>
                            </Col>
                        </Row>
                    </div>
                )
            })}
        </>
    )
}

export default BlogHead