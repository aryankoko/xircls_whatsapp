
import React from 'react'
import { Link } from 'react-router-dom'

import Footer from '@src/views/main/utilities/footer/Footer'
import Navbar from '@src/views/main/utilities/navbar/Navbar'
import SubNavbar from '@src/views/main/utilities/navbar/SubNavbar'
// bootstrap
import Button from 'react-bootstrap/Button'
import { Card, Col, Container, Row } from 'reactstrap'

// icons
import { BsEye, BsFileEarmarkBarGraph } from "react-icons/bs"
import { FiSettings } from "react-icons/fi"
import { MdDeveloperMode } from "react-icons/md"

// imgs
import s1 from "./s1.png"
import loginform from "./loginform.png"

export default function Developer() {
  const ourTech = [
    {
      title: "Easy to integrate",
      desc: "Deeply integrate our APIs into your applications with ease",
      icon: <FiSettings style={{ marginTop: "1.2vh" }} size={40} />
    },
    {
      title: "Data privacy first",
      desc: "Our in-built security protocols future-proof you against data theft & ad fraud.",
      icon: <BsFileEarmarkBarGraph style={{ marginTop: "1.2vh" }} size={40} />
    },
    {
      title: "Easy to integrate",
      desc: "Deeply integrate our APIs into your applications with ease.",
      icon: <BsEye style={{ marginTop: "1.2vh" }} size={40} />
    },
    {
      title: "Data privacy first",
      desc: "Our in-built security protocols future-proof you against data theft & ad fraud.",
      icon: <MdDeveloperMode style={{ marginTop: "1.2vh" }} size={40} />
    }
  ]
  const stepData = [
    {
      title: "Sign up",
      desc: "Register and agree to our legal terms & conditions"
    },
    {
      title: "Describe your use case and select APIs",
      desc: "Once submitted, we will review your request and reach out within 48 hours"
    },
    {
      title: "Start developing!",
      desc: "Once your request is approved, access our API documentation to begin your work"
    }
  ]
  return (
    <div className='developerPage  ' style={{ background: "white" }} >
    
      <Navbar position='fixed' />
      {/* <SubNavbar navTitle="Developer" /> */}

      {/* section 1 card */}
      <Container fluid='sm' >

        <Row className='justify-content-center  mt240'>
          <Col sm="11" >
            <Card className=' p-5 border shadow-none mt-2 ' style={{ background: "#e5e7eb" }}>
              <h1 className='mainHeader display-1 main-heading fw-bolder m-0 mt-2'>
                Become a Technology Partner
              </h1>
              <h1 className='text-black m-0 fs-1'>
                Help your clients automate and upgrade their marketing.<br /> Solve critical pain points and offer innovative solutions to expand your business
              </h1>
              <br />
              <div className='d-flex gap-2 flex-wrap '>
                <Link to="/merchant/signup" className="btn btn-success my-1 btn-lg fs-3 px-3 py-1 fw-bolder">Start Building</Link>
                <button className="btn main-btn-dark btn-lg fs-3 px-3 py-1  my-1">Explore APIs</button>
              </div>
            </Card>
          </Col>
        </Row>

        {/* section 2 */}
        <Row className=" justify-content-center mt170" >
          <Col lg="10" xs="10">

            <h1 className=' display-2 ms-0 fw-bolder main-heading'>Why Build <span className=' display-2 '>on</span> XIRCLS ?</h1>
            <Row className=" justify-content-start " >
              <Col lg="7" xs="10">
                <p className=' fs-1 lh-32 text-black text-start' >We empower you to leverage our 100+ brand network
                  and powerful functionalities to build industry-shaping apps
                  that will delight your clients and impress your peers.</p>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* section3 */}
        <Row className=" justify-content-center mt180" >
          <Col lg="10" xs="10">

            <h1 className=' display-2 main-heading fw-bolder text-black text-center ' >Our Tech, Your Growth</h1>
            <h1 className=' text-black   text-center '>Monetize the most cutting-edge APIs in marketing</h1>

            <Row className=' mt-md-2' >
              {
                ourTech.map((data, index) => (
                  <Col md={6} sm={12} className='mt-3' key={index}>
                    <div className='d-flex justify-content-start px-1'>
                      <div className='img'>
                        {data.icon}
                      </div>
                      <div className=' ms-2'>
                        <h1 className='fs-1 fw-bolder main-heading m-0' >{data.title}</h1>
                        <h3 className='fs-3 text-black' >{data.desc}</h3>
                      </div>
                    </div>
                  </Col>
                ))
              }
            </Row>
          </Col>
        </Row>


        {/* section 4 */}
        <Row className="justify-content-center mt180" >
          <Col className='' lg="10" xs="12">
            <Row className=" py-1 rounded-4" style={{ background: "#dedede" }}>
              <Col lg={8} sm={12} className='d-flex align-items-center px-5 '>
                <div>
                  <div className=''>
                    <h1 className='display-3  main-heading fw-bolder' >Stop Building From Scratch!</h1>
                  </div>
                    <h2 className='fs-3 mt-3 text-black lh-32' >
                      Our developer-friendly APIs are easy to understand, implement & iterate.
                      Build on top of core features such as forms, shopping cart, user profile, wishlist & more.
                    </h2>
                    <Link to="/merchant/signup" className='btn  btn-lg  fs-3 main-btn-dark px-3 py-1 mt-1 fw-lig '>Get Started</Link>
                </div>
              </Col>

              <Col lg={4} sm={12} className='text-center py-5 pe-5'>
                <div className='section4-img'>
                  <img src={s1} className="img-fluid" width={450} alt="s1" />
                </div>
              </Col>
            </Row>


            {/* secion 5 */}
            <Row className="justify-content-center mt180" >

              <Col xl={6} lg={6} md={6} sm={12} className='d-flex justify-content-center '>
                <div className=" d-flex flex-column  gap-4 ">
                  {
                    stepData.map((data, index) => (
                      <div className='d-flex gap-2' key={index}>
                        <div className=' rounded-circle ' style={{ minWidth: "30px", minHeight: "30px", maxWidth: "30px", maxHeight: "30px", background: "#cdcdcd" }}></div>
                        <div >
                          <h3 className='p-0 m-0 text-dark fw-bolder' >Step {index + 1}</h3>
                          <h1 className='fs-1 p-0 m-0 main-heading fw-bolder'>{data.title}</h1>
                          <h2 className='fs-3 p-0 m-0 text-black'>{data.desc}</h2>
                        </div>
                      </div>
                    ))
                  }

                </div>
              </Col>

              {/* Hide the login form image on medium and smaller devices */}
              <Col xl={6} lg={6} className='text-end '>
                <div className='d-none d-lg-block'>
                  <img src={loginform} className="img-fluid" alt="Login Form" />
                </div>
              </Col>
            </Row>

          </Col>
        </Row>

      </Container>


      {/* section6 */}
      <Row className=" justify-content-center mt180 py-2" style={{ background: "#000" }}>
        <Col lg="10" xs="10">
          <Container fluid='sm'>

            <Row>
              <Col className="mt-5 mb-5" >
                <di v className=" mt-4 mb-4">
                  <div className=''>
                    <h1 className='display-2 fw-bolder m-0  text-white '>Submit your app</h1>
                  </div>
                  <div className=' mt-1'>
                    <h1 className=' fw-bold mt-2 text-white '>Expand your app’s reach. <br />Add it to our marketplace
                      for the XIRCLS brand community to discover.</h1>
                  </div>
                  <div className=' mt-5 d-flex  justify-content-between  align-items-center '>
                    <div className='d-flex flex-wrap gap-2'>
                      <Link to='' className='btn main-btn-blue2 fs-4 fw-lig' >Submit an App</Link>
                      <Link to='' className='btn main-btn-light  fs-4 fw-lig' >Explore Marketplace</Link>
                    </div>
                    <div  className=' text-white fw-bold fs-3 m-0'><Link to="/merchant/signup" className=' text-decoration-underline text-white fw-bolder'>Sign up </Link> for early access to new Developer products.</div>
                  </div>
                </di>
              </Col>
            </Row>
          </Container>

        </Col>
      </Row>

      {/* section 7 */}
      <div className='mt180'>
        <div className='text-center '>
          <h1 className='display-2 fw-bolder m-0  main-heading'>Ready To Build The Future?</h1>
          <Link to="/merchant/signup" className='btn main-btn-blue2 fs-4 fw-lig mt-3' variant="primary">Get started</Link>
        </div>
      </div>

      <hr className='mt100' />
      <Footer />


  </div>
  )
}