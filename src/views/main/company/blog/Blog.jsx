import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Container } from 'reactstrap'
import { blogsData } from './BlogData'
import { CgProfile } from 'react-icons/cg'
import { AiOutlineCalendar } from 'react-icons/ai'
import { BiRightArrowAlt } from 'react-icons/bi'
import Navbar from '@src/views/main/utilities/navbar/Navbar'
import Footer from '../../utilities/footer/Footer'

const stringSplit = (sentence, maxWords) => {
  const words = sentence.split(' ')
  const firstWords = words.slice(0, maxWords).join(' ')
  if (words.length > maxWords) {
    return `${firstWords}...`
  }
  return firstWords
}
function replaceSpacesWithUnderscore(inputString) {
  return inputString.replace(/\s+/g, '_')
}
function removeSpecialChars(str) {
  // Use a regular expression to replace special characters with an empty string
  const upt = str.replace(/[^\w\s]/gi, '')
  return upt.replace(/\s+/g, '-')
}
const Blog = () => {

  const defaultImg = 'https://api.xircls.com/static/images/website-slide/blog/blog-10-main.jpeg'

  return (
    <div className='bg-white'>

        {/* <Navbar /> */}
        <Container fluid='sm' className=' '>
          <Row className="justify-content-center text-center align-items-center mt240"   >
            <Col xs='12' lg='10' md='10' xxl='12' className=' rounded-3'>
              <h1 className='display-1 text-center main-heading fw-bolder  lh-83'>The XIRCLS Blog</h1>
              <h1 className='text-black'>News, opinions and perspectives on a more collaborative world.</h1>
            </Col>
          </Row>

          {/* Blogs */}
          <Row className="justify-content-center mt100  text-start align-items-center blogs-list text-black " >
            <Col xs='11' lg='12' md='12' xl='10' className='pb-5'>

              <Row className='justify-content-center mt-0 text-start row-gap-5' style={{ gap: '5rem' }}>
                {blogsData.map(item => (
                  <>
                    <Col lg='12' xxl='12' className='blog-container px-0 m-0 py-lg-5'>
                      <Row className='justify-content-center '>
                        <Col xs='11' lg='5' xl='5' className='d-flex justify-content-center mb-2 mb-md-0 px-0'>
                          <img src={(item.imgSrc ? item.imgSrc : defaultImg)} loading="lazy" className=" card-img-top rounded-3 d-block" alt={`${item.title} img`}
                            style={{
                              height: '300px',
                              objectFit: 'cover'
                            }}
                          />
                        </Col>
                        <Col xs='11' lg='7' xl='6' className='px-0  pt-lg-0 pt-md-3 pt-2  d-flex flex-column justify-content-between m-0 '>
                          <h1 className="px-1 px-lg-2 pb-0 mb-0 fs-1 mt-1 mt-lg-0">
                            <Link to={`/blog/${removeSpecialChars(item.title)}`} className='text-decoration-none main-heading fw-bolder text-capitalize ' >
                              {item.title}
                            </Link>
                            <h5 className='p-2 pt-1 ps-0 mt-0 mb-2 mb-lg-0 text-body-secondary'>
                              <span>
                                <AiOutlineCalendar className='position-relative me-1' style={{ top: '-2px' }} />
                                {item.date}
                              </span>
                              <span className='ms-lg-3'>
                                <Link to={`/blog/author/${replaceSpacesWithUnderscore(item.author)}`} className='text-decoration-none text-body-secondary  link-dark ms-4'>
                                  <CgProfile className='position-relative me-1' style={{ top: '-2px' }} />
                                  {item.author}
                                </Link>
                              </span>
                            </h5>
                          </h1>
                          <div>
                            <h3 className="px-1 py-0 pt-2 p-lg-2 text-secondary">{stringSplit(item.preview, 30)}</h3>
                          </div>
                          <div>
                            <Link to={`/blog/${removeSpecialChars(item.title)}`} className='text-decoration-none text-black' >
                              <h5 className="p-1 p-lg-2 pb-0 m-0">Read More
                                <BiRightArrowAlt className='ms-1 position-relative' style={{ top: '-1px' }} />
                              </h5>
                            </Link>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <hr className='m-0 border  ' />
                  </>
                ))}
              </Row>
            </Col>
          </Row>
          <hr className='mt100' />
      <Footer/>
        </Container>
    </div>
  )
}
export default Blog
export { stringSplit }