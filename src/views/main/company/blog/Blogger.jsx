import React from 'react'
import { Link } from 'react-router-dom'
import { bloggersData, blogsData } from './BlogData'
import { Col, Container, Row } from 'reactstrap'
import { stringSplit } from './Blog'
import { BiRightArrowAlt } from 'react-icons/bi'
import Navbar from '@src/views/main/utilities/navbar/Navbar'
import Footer from '../../utilities/footer/Footer'
// function replaceUnderscoreWithSpaces(inputString) {
//   // Using the replace method with a hyphen to replace with white space
//   return inputString.replace(/_/g, ' ')
// }
const Blogger = ({blogger}) => {

  // const { blogger } = useParams()
  // console.log('blogger: ' + blogger)
  // const newBlogger = replaceUnderscoreWithSpaces(blogger)
  const bloggerName = blogsData.find((item) => item.auth_slug.toLowerCase() === blogger.toLowerCase())
  document.title = `Author: ${bloggerName.author}`

  console.log(bloggerName.author)

  const authorsBlog = blogsData.filter((blogs) => blogs.auth_slug.toLowerCase() === blogger.toLowerCase())

  const authorsData = bloggersData.find((item) => item.auth_slug.toLowerCase() === blogger.toLowerCase())
  // console.log('Bloggers name found on bloggersData' + authorsData)
  // console.log(authorsData)

  if (!bloggerName) {
    return <div>Blogger not found</div>
  } else if (!authorsBlog) {
    return <div>Author haven't posted any blogs yet</div>
  }

  const getFirstName = (name) => {
    const nameParts = name.split(' ')
    if (nameParts.length > 0) {
      return nameParts[0]
    }
    return ''
  }


  const defaultProfileImg = 'https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png'

  return (
    <div className='bg-white px-2'>

      {/* <Navbar /> */}

      <Container fluid='sm'>
        <Row className="justify-content-center mt100 ">
          <Col xs='11' lg='12'>
            <Row className='justify-content-md-between justify-content-center text-start '>
              <Col xs='12' lg='4' className='d-flex flex-column align-items-center '>
                <div className='d-flex justify-content-center '>
                  <img src={(authorsData.authorImg) ? authorsData.authorImg : defaultProfileImg} className="img-thumbnail rounded-circle" alt={authorsData.author}
                    style={{
                      maxHeight: '300px',
                      maxWidth: '300px'
                    }}
                  />
                </div>
                <div className='d-flex justify-content-evenly mt-3' style={{ width: '45%' }}>
                  <a href={authorsData.authorSocials.linkedIn} target="_blank">
                    <svg width="25" height="25" viewBox="0 0 0.5 0.5" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M.094.031a.063.063 0 0 0-.063.063v.313A.063.063 0 0 0 .094.47h.313A.063.063 0 0 0 .47.407V.094A.063.063 0 0 0 .407.031H.094zm.034.134a.037.037 0 1 0 0-.075.037.037 0 0 0 0 .075zM.159.4V.195H.096v.206h.063zM.201.195h.063v.028A.076.076 0 0 1 .331.189C.376.189.4.219.4.275V.4H.337V.29C.337.275.334.245.3.245.266.245.263.282.263.307V.4H.2V.195z" /></svg></a>
                  <a href={authorsData.authorSocials.twitter} target="_blank">
                    <svg width="25" height="25" viewBox="0 0 0.75 0.75" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="M.688.181a.265.265 0 0 1-.074.02A.129.129 0 0 0 .671.13a.257.257 0 0 1-.082.031.128.128 0 0 0-.219.117.364.364 0 0 1-.264-.134.13.13 0 0 0-.017.065.128.128 0 0 0 .057.107A.127.127 0 0 1 .088.3v.002a.128.128 0 0 0 .103.125.123.123 0 0 1-.034.005A.153.153 0 0 1 .133.43a.128.128 0 0 0 .12.089.257.257 0 0 1-.159.054.248.248 0 0 1-.031-.002.362.362 0 0 0 .197.058.362.362 0 0 0 .365-.365V.247A.263.263 0 0 0 .688.181Z" /></svg>
                  </a>
                  <a href={authorsData.authorSocials.facebook} target="_blank">
                    <svg width="25" height="25" viewBox="0 0 0.75 0.75" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="M.653.063H.097a.034.034 0 0 0-.034.034v.556a.034.034 0 0 0 .034.035h.299V.446H.315V.352h.081V.281A.114.114 0 0 1 .517.156.633.633 0 0 1 .59.16v.084H.541C.502.244.494.263.494.29v.06h.094L.576.444H.494v.244h.159A.034.034 0 0 0 .687.654V.097A.034.034 0 0 0 .653.063Z" /></svg>
                  </a>
                </div>
              </Col>
              <Col xs='12' lg='8' className='ps-lg-0 pt-5 pt-md-0 pe-0'>
                <h1 className='display-3 fw-bolder main-heading m-0'>
                  {authorsData.author}
                </h1>
                <h1 className='fs-2 mt-2 mb-5 mt-lg-0 mb-lg-0'>{authorsData.authorPosition}, XIRCLS</h1>
                <div>
                  {authorsData.authorDetails.map((item) => (
                    <h2 className='fs-4 mt-4 lh-base'>{item}</h2>
                  ))}
                  <h2 className='fs-4 mt-3'>React out to {getFirstName(authorsData.author)} on
                    <a className='text-decoration-none' target='_blank' href='https://www.xircls.com/'> LinkedIn</a>, or via <a className='text-decoration-none' target='_blank' href='https://www.xircls.com/'>Email</a>.</h2>
                </div>
              </Col>

            </Row>

          </Col>

          <Col xs='10' lg='12' xxl='12' className='mt-5 pt-5 '>
            <Row className='justify-content-center'>
              <Col lg='11' xxl='12'>
                <Row className='justify-content-between mt-0 text-start align-items-center '>
                  <Col xl='12'>
                    <h4 className='text-body-secondary m-0 mt-lg-5'>Posts by {authorsData.author}</h4>
                  </Col>
                  {blogsData.map(item => {
                    if (item.author !== authorsData.author) { return null }
                    return (
                      <Col xl='6' className='my-4'>
                        <Row className='justify-content-center '>
                          <Col lg='5' className='p-0 d-flex justify-content-center align-items-center'>
                            <img src={(item.imgSrc ? item.imgSrc : "defaultImg")} className="card-img-top rounded-3" alt={item.title}
                              style={{
                                height: '170px',
                                objectFit: 'cover'
                              }}
                            />
                          </Col>
                          <Col lg='7' className='p-0 m-0 h-100 ps-lg-3'>
                            <div className="d-flex flex-column  justify-content-between align-items-start text-start h-100">
                              <h4 className="p-2 m-0 ">{stringSplit(item.title, 6)}</h4>
                              <h5 className="fs-5 p-2 m-0 text-secondary">{stringSplit(item.preview, 20)}</h5>
                              <Link to={`/blog/${item.slug}`} className='text-decoration-none text-black' >
                                <h6 className="p-2 m-0 mb-2">Read More
                                  <BiRightArrowAlt className='ms-1 position-relative' style={{ top: '-1px' }} />
                                </h6>
                              </Link>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    )
                  })}
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <hr className='mt100' />
        <Footer />
      </Container>
    </div>
  )
}

export default Blogger