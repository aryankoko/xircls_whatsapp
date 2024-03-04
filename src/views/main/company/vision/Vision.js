import Footer from '@src/views/main/utilities/footer/Footer'
import Navbar from '@src/views/main/utilities/navbar/Navbar'
import React from "react"
import { Col, Container, Row } from "reactstrap"
import { WWBelieveData, missionData, valuesData, visionData } from "./data"

import CardLeft from '@src/views/main/components/CardLeft'
import { Link } from 'react-router-dom'

// icons
const VisionPage = () => {

  return (
    <div style={{ background: "#fff" }}>

      {/* <Navbar /> */}
      {/* Our Vision & Mission */}
      <Row className="justify-content-center mt240 ">
        <Col xs='10' lg='10' md='10'>
          <div className='  px-0'>
            <h1 className='text-center display-1 main-heading fw-bolder mb-0'>Our Vision</h1>
            <Row className=' match-height'>
              {/* <Col md="5" className=' d-flex justify-content-center  align-items-center'>
                    <img className=' ' src={demoImg} width={350}  alt="" />
                </Col> */}
              <Col md="12">
                <div className='d-flex flex-column text-center gap-1 mt-1 '>
                  {
                    visionData.map((list) => (
                      <h3 className='fs-1 text-black'>{list}</h3>
                    ))
                  }
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <Row className="justify-content-center mt240 ">
        <Col xs='10' lg='10' md='10'>
          <div className='  px-0'>
            <h1 className='text-center display-1 main-heading fw-bolder mb-0'>Our Mission</h1>
            <Row className=' flex-row-reverse '>
              {/* <Col md="5" className=' d-flex justify-content-center  align-items-center'>
                    <img className=' ' src={demoImg} width={350}  alt="" />
                </Col> */}
              <Col md="12">
                <div className='d-flex flex-column  gap-1 text-center mt-1'>
                  {
                    missionData.map((list) => (
                      <h3 className='fs-1 text-black'>{list}</h3>
                    ))
                  }
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      {/* <Row className="justify-content-center mt240 ">
          <Col xs='10' lg='10' md='10'>
            <div className="  ">
              <h1 className="display-1 text-center main-heading fw-bolder  lh-83">Our Mission</h1>
              <div className='d-flex flex-column  gap-2 mt-4 '>
              <h1 className="text-black  py-0 ">We are committed to building a solid framework upon which innovative campaigns, seamless customer interactions, and sustainable business growth strategies can flourish.</h1>
              <h1 className="text-black  py-0 ">We will prioritize trust, transparency, and customer consent in every digital interaction.</h1>
              <h1 className="text-black  py-0 ">Through a human-first approach to martech, we aim to deliver personalized experiences that add genuine value to our customers' lives.</h1>
              <h1 className="text-black  py-0 ">With an all-in-one precision martech solution, we will activate critical touch points across the buyer journey, ensuring a seamless and enriched shopping experience.</h1>
              </div>
            </div>
            <div className=" d-flex  justify-content-center align-items-center gap-1 px-1 mt-5">
              <h2 style={{ maxWidth: '70%' }} className="btn main-btn-blue  fs-3 py-1 px-4 m-0 vision-download-btn">Download Our Vision And Mission Document</h2>
            </div>
          </Col>
        </Row> */}


      {/* What We Believe */}
      <div >
        <Row className="justify-content-center mt180 ">
          <Col xs='10' lg='10' md='10'>
            <h1 className=" text-center display-2 main-heading fw-bolder  ">What We Believe</h1>
            <Row className="gy-3  mt-1">
              {
                WWBelieveData.map((item, index1) => (
                  <Col sm='12' xs='12' key={index1} className="text-start mt-3 d-flex justify-content-center align-items-center" >
                    <div className="container">
                      <Row className=" gy-2">
                        <Col sm='2' xs='12' className="d-flex text-center justify-content-center align-items-center">
                          <img style={{ width: '90px' }} className=" mt-3" src={item.imgSrc} alt="" />
                        </Col>
                        <Col sm='10' xs='12'>
                          <h1 className="display-6 main-heading fw-bolder ">{item.title}</h1>
                          {item.desc.map((item2, index2) => (
                            <h2 key={index2} className=" fs-3  text-black lh-32 " >{item2}</h2>
                          ))}
                        </Col>
                      </Row>
                    </div>
                  </Col>
                ))}

            </Row>
          </Col>
        </Row>
      </div>

      {/* Our Culture */}
      <Row className="justify-content-center mt170 py-5" style={{ background: "#000" }}>

        <Col lg='10' xs='10'>
          <div>
            <Row className=" align-items-center   text-start ">
              <Col lg='6' >
                <h1 className="display-1 fw-bolder text-white ms-2">Our Culture</h1>
              </Col>
              <Col lg='6' className="px-2" >
                <h1 className="display-6 pb-0 mt-3 text-white fw-bolder">Attract, Never Promote.</h1>
                <h3 className=" lh-32 text-white">XIRCLS shifts from the traditional mindset of persuasion and aggression in business - an outward flow of energy and therefore wasteful - to create a culture of value creation that is sustainable and benefits everyone involved.</h3>
              </Col>
              <Col lg='6' className="px-3" >
                <h1 className="display-6  pb-0 mt-3 text-white fw-bolder">Inspire Trust.</h1>
                <h3 className="lh-32 text-white">Through the principle of service, XIRCLS aims to forge a global community of individuals who consistently work to become pillars of support. We prioritize your best interests, ensuring that reaching out to us results in receiving what truly benefits you.</h3>
              </Col>
              <Col lg='6' className="px-2" >
                <h1 className="display-6  pb-0 mt-5 text-white fw-bolder">Always Be of Service.</h1>
                <h3 className="lh-32 text-white">At XIRCLS, we embody a state of constant value delivery, guided by the question: "How can I be of service today?" Service is not merely a concept; it's our overarching aim, shaping interactions with everyone around us - from clients, coworkers, friends & family, to a stranger on the street.</h3>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      {/* video container */}

      <Row className="justify-content-center mt170 align-items-center py-5 " style={{ backgroundColor: '#e5e7eb' }}>
        <Col lg='10' xs='10'>
          <div className='p-0'>
            <h1 className="display-2 main-heading text-center fw-bolder mb-5">
              Why Culture Matters to Us
            </h1>
            <Row className=" gx-2 py-2 h-100 align-items-center justify-content-center">
              <Col xl='6' md='12' lg='10'  className="d-flex align-items-start justify-content-center ">
                <video className='w-100' controls src="https://api.xircls.com/static/images/website-slide/videos/xircls_in_three_words7.mp4" autoPlay muted loop />

              </Col>
              <Col xl='6' md='12' lg='10'  className="mt-1 h-100 ">
                <div className="  text-start h-100">
                  <ol className=" ">
                    <li className="text-black fs-2 fw-lig mt-1">
                      We see our defined values as the compass guiding our collective journey, uniting us in a purpose greater than ourselves and aligning us with our mission for long-term success.
                    </li>
                    <li className="text-black fs-2 fw-lig mt-1">
                      We challenge a self-celebratory culture that idolizes the grifter hero pursuing personal gain without regard for side-effects.
                    </li>
                    <li className="text-black fs-2 fw-lig mt-1">
                      Our goal is to assemble a global team of individuals-employees, interns, and partners-who are aligned with our values & goals.
                    </li>
                  </ol>
                </div>
              </Col>
            </Row>
          </div>
        </Col>

      </Row>
      {/* Our Core Values */}
      <div>

        <Row className="justify-content-center mt170 ">
          <Col xl='10' lg='10' xs='10' className="p-0" >
            <h1 className=" text-center display-2 main-heading fw-bolder  ">Our Core Values</h1>
            <Row className=" justify-content-between  text-start">

              {valuesData.map((data, index) => (
                <Col lg="4" md="6" className="mt-2" key={index}>
                  <CardLeft imgSrc={data.imgSrc} title={data.title} desc={data.subTitle} key={index} />
                </Col>

              ))}

            </Row>
          </Col>
        </Row>
      </div>

      <hr className='mt100' />
      <Footer />


    </div>
  )
}


export default VisionPage
