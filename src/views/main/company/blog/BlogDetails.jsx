import React from 'react'
import { Link } from 'react-router-dom'
import { blogsData, bloggersData, blogPostData } from './BlogData'
import { Row, Col, Container } from 'reactstrap'
import { AiOutlineCalendar, AiOutlineMail, AiFillFacebook } from 'react-icons/ai'
import { FaWhatsapp, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { BiRightArrowAlt } from 'react-icons/bi'
import { stringSplit } from './Blog'
import Navbar from '@src/views/main/utilities/navbar/Navbar'
import Footer from '../../utilities/footer/Footer'

function replaceSpacesWithUnderscore(inputString) {
  return inputString.replace(/\s+/g, '_')
}

function removeSpecialChars(str) {
  // Use a regular expression to replace special characters with an empty string
  const upt = str.replace(/[^\w\s]/gi, '')
  return upt.replace(/\s+/g, '-')
}
const BlogList = ({ ele }) => (
  <Col xl='6' className='my-lg-4 my-2'>
    <Row className='justify-content-center '>
      <Col lg='5' xs='10' className='p-0 mt-4 mt-lg-0 justify-content-center d-flex'>
        <img src={(ele.imgSrc ? ele.imgSrc : "defaultImg")} className="card-img-top rounded-3" alt={` ${ele.title} img`}
          style={{
            height: '175px',
            objectFit: 'cover'
          }}
        />
      </Col>
      <Col lg='7' xs='11' className='p-0 m-0 h-100 ps-3 d-flex flex-column justify-content-between'>
        <h4 className="p-2 m-0 ">{stringSplit(ele.title, 6)}</h4>
        <h5 className="fs-5 p-2 m-0 text-secondary">{stringSplit(ele.preview, 20)}</h5>
        <Link to={`/blog/${removeSpecialChars(ele.title)}`} className='text-decoration-none text-black' >
          <h6 className="p-2 m-0 mb-2">Read More
            <BiRightArrowAlt className='ms-1 position-relative' style={{ top: '-1px' }} />
          </h6>
        </Link>
      </Col>
    </Row>
  </Col>
)

const BlogDetails = ({ blogTitle }) => {

  // const { blogTitle } = useParams()
  console.log('BlogTitle: ', blogTitle)

  const blog = blogsData.find((item) => item.slug.toLowerCase() === blogTitle?.toLowerCase())
  if (!blog) {
    return <div>Blog not found</div>
  }

  const blogPost = blogPostData.find((item) => item.blogId === blog.blogId)
  console.log(blog)
  // console.log(blogPost.data)
  document.title = blog.title

  if (!blogPost) {
    return <div>Blog not found</div>
  }


  const bloggersDetails = bloggersData.find((item) => item.author === (blog.author))
  if (!bloggersDetails) {
    return <div>Blogger not found</div>
  }

  const BlogPost = (data) => {
    return (
      <div className='blog-post'>
        {data.map((section, index) => {
          switch (section.type) {
            case 'heading':
              return <h1 key={index} >{section.content}</h1>
            case 'subheading':
              return <h2 key={index} className='fs-2 mt-2 mt-lg-5 mb-3 pt-5 text-black '>{section.content}</h2>
            case 'subsubheading':
              return <h3 key={index} className='fs-3 mb-3 mt-4 text-body-tertiary'>{section.content}</h3>
            case 'passage':
              return section.content.map(item => (
                <h6 key={index} className='fs-4 lh-lg fw-lig mt-4 text-dark-emphasis'>{item}</h6>
              ))
            case 'image':
              return (
                <div key={index} className='d-flex justify-content-center pt-5 mt-2 mt-lg-5'>
                  <img src={section.content} alt="Im" className=' mb-2' style={{ width: section.width ? section.width : '90%' }} />
                </div>)
            case 'small':
              return (
                <div key={index} className='d-flex justify-content-center fs-5 lh-sm pb-5 mb-2 mb-lg-5'>
                  <small className='text-center' key={index}>{section.content}</small>
                </div>)
            case 'special':
              return <h2 className='my-4 text-black-50'>{section.content}</h2>
            case 'ulist':
              return <ul key={index} className='fs-4 lh-lg text-dark' >{section.content.map((item) => <li>{item}</li>)}</ul>
            case 'olist':
              return <ol key={index} className='fs-4 lh-lg text-dark-emphasis' start={section.start}>{section.content.map((item) => <li className='mt-3'>{item}</li>)}</ol>
            default:
              return null
          }
        })}
      </div>
    )
  }

  const defaultProfileImg = 'https://w7.pngwing.com/pngs/981/645/png-transparent-default-profile-united-states-computer-icons-desktop-free-high-quality-person-icon-miscellaneous-silhouette-symbol-thumbnail.png'

  return (
  <div className='bg-white'>


    <Container fluid='sm'>
      <Row className="justify-content-center text-start align-items-center position-relative mt100" >
        <Col xs='12' lg='10' xxl='11' className='px-0 px-md-4 p-lg-0 mb-2'>
          <Row className='justify-content-center align-items-center text-center'>
            <Col xs='11' xxl='12' className='justify-content-between text-start my-5'>
              <Row className='justify-content-between'>
                <Col xs='12' lg='7'>
                  <h1 className='display-4 main-heading fw-bolder'>
                    <h5 className='text-body-secondary ms-2 mb-3'>
                      <AiOutlineCalendar className='position-relative me-1' style={{ top: '-2px' }} />{blog.date}</h5>
                    {blog.title}
                  </h1>
                </Col>
                <Col xs='12' lg='3' >
                  <div className=' text-center align-items-center justify-content-end flex-column d-flex'>
                    <img src={(bloggersDetails.authorImg) ? bloggersDetails.authorImg : defaultProfileImg} className="img-thumbnail rounded-circle object-fit-cover mt-4 mt-lg-3" alt={bloggersDetails.author }
                      style={{ width: '130px', height: '130px' }} />
                    <div className='d-inline-block justify-content-center text-center align-items-center'>
                      <Link to={`/blog/author/${replaceSpacesWithUnderscore(blog.author)}`} className='text-decoration-none link-dark ms-4'>
                        <h5 className='fs-3 m-0'>{blog.author}</h5>
                      </Link>
                      <h6 className='fs-5 m-0'>{bloggersDetails.authorPosition}, at XIRCLS</h6>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col xs='10' className='mt-2 mt-lg-5 pt-4 mx-0'>
              <img className='object-fit-cover' src={blog.imgSrc} alt={blog.title } style={{ width: '100%', maxHeight: '550px' }} />
            </Col>
            <Col xs='11' xxl='12' className='text-secondary text-start mt-lg-5 mt-2 lh-lg blog-content-container'>
              {BlogPost(blogPost.data)}
              <div className='t mt-5' >
                  <h3 className='fs-4 '>Share This Post:
                    <div className='d-inline-block' >
                      <a href="http://twitter.com/share?text=XIRCLS&url=www.xircls.com" target="_blank" style={{ color: 'inherit' }}>
                        <FaTwitter className='ms-3' />
                      </a>
                      <a href='https://www.linkedin.com/sharing/share-offsite/?url={www.xircls.com}' target='_blank' style={{ color: 'inherit' }} className='text-decoration-none' >
                        <FaLinkedin className='ms-4' />
                      </a>
                      <a href="whatsapp://send?text=www.xircls.com" target="_blank" className='text-decoration-none' style={{ color: 'inherit' }}>
                        <FaWhatsapp className='ms-4' />
                      </a>
                      <a href="mailto:?subject=I wanted you to see this blog page&ampbody=Check out this blog http://www.xircls.com"
                        title="Share by Email" target="_blank" className='text-decoration-none' style={{ color: 'inherit' }}>
                        <AiOutlineMail className='ms-4' />
                      </a>
                    </div>
                  </h3>
              
              </div>
            </Col>
          </Row>

        {/* Author's details */}
          <Row className='py-5 my-5'>
            <Col md='4' className=''>
              <div className='align-items-center d-flex justify-content-center'>
                <img src={(bloggersDetails.authorImg) ? bloggersDetails.authorImg : defaultProfileImg} className="rounded-circle object-fit-cover " alt={`${bloggersDetails.author}` }
                  style={{ width: '130px', height: '130px' }} />
              </div>
              <div className='py-2'>
                <h3 className='text-center fw-bold pb-2'> {bloggersDetails.author}</h3>
                <h3 className='text-center'>{bloggersDetails.authorPosition} at XIRCLS</h3>
              </div>
              <h4 className='w-100 d-flex justify-content-center py-2' >
                <FaLinkedin className='mx-2' />
                <AiFillFacebook className='mx-2' />
                <AiOutlineMail className='mx-2' />
              </h4>
            </Col>
            <Col md='8' className='mt-2'>
              <h3 className='mb-4'>
                {bloggersDetails.authorDetails[0]}
              </h3>
              <div className='justify-content-md-start justify-content-center '>
                <Link to={`/blog/author/${replaceSpacesWithUnderscore(blog.author)}`} className='btn btn-outline-dark text-decoration-none'>
                  LEARN MORE
                </Link>
              </div>
            </Col>
          </Row>

        {/* bloglist */}
          <Row className='justify-content-center mt-5'>
            <Col lg='12' xxl='12'>
              <Row className='justify-content-center mt-0 text-start align-items-center row-gap-lg-4'>
                {blogsData.map(item => {
                  if (item.title === blog.title) { return null }
                  return (<BlogList ele={item} />)
                })}
              </Row>
            </Col>
          </Row>
        </Col>

      </Row>
      <hr className='mt100' />
      <Footer/>
    </Container>
    </div>
  )
}

export default BlogDetails
export { BlogList }