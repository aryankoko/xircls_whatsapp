import React, { useState } from 'react'


import Footer from '@src/views/main/utilities/footer/Footer'
import Navbar from '@src/views/main/utilities/navbar/Navbar'
import SubNavbar from '@src/views/main/utilities/navbar/SubNavbar'

// bootstrap
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'

// ICON
import { BsArrowRight } from "react-icons/bs"
import { IoMdArrowRoundForward } from "react-icons/io"
import { IoCheckmarkSharp } from "react-icons/io5"

// img
import demo_01_01 from "./img/demo_01_01-min.jpg"
import demo_01_02 from "./img/demo_01_02-min.jpg"
import demo_01_03 from "./img/demo_01_03-min.jpg"

import engagament from "./img/engagament-min-min-min.jpg"
import segment from "./img/segment-min-min-min.jpg"
import sorce from "./img/sorce-min-min-min.jpg"
import target from "./img/target-min-min-min.jpg"


import Curation from "./img/Curation-min.png"
import Zero from "./img/Zero-min.png"
import need from "./img/need-min.png"
import wastage from "./img/wastage-min.jpeg"


import design from "./img/design-min.png"
import dev from "./img/dev-min.png"
import market from "./img/market-min.png"


// import gif1 from "./img/Verticall.gif"
import featureVideo from "./img/featureVideo.gif"

const dragData = [
  {
    title: "Build like a developer.",
    desc: [
      "Create pop-ups from scratch with layout container elements",
      "Build mobile-responsive pop-ups",
      "Create full-screen overlays",
      "Embed into your website effortlessly"
    ],
    img: dev
  },
  {
    title: "Create like a designer.",
    desc: [
      "Customize colour, background, font, spacing, borders & more!",
      "See a live preview of pop-ups on your website"
    ],
    img: design
  },
  {
    title: "Sell like a marketer.",
    desc: [
      "Choose from conversion-optimized pop-up templates",
      "Segment pop-ups for different lead types, visit frequency etc",
      "Add multiple incentives within a single pop-up"
    ],
    img: market
  }
]

const nextgenData = [
  {
    title: "Source Detection",
    desc: "Visitor source tracking. Real-time micro-data analysis to test the authenticity & effectiveness of your ad campaigns. Contextually personalized buyer journeys.",
    listTitle: "Features include: ",
    list: ["Platform detection (Google, Facebook, Instagram, Twitter)", "Traffic source reports"],
    img: sorce
  },
  {
    title: "Engagement Tracking",
    desc: "Map every lead’s journey through your store - in real time. Study multiple session journeys to gauge intent and interest.",
    listTitle: "Tracking metrics include:",
    list: ["Pop-up views", "OTP verification opt-in", "Redeem button engagement", "Purchase status", "Session-wise mapping"],
    img: engagament
  },
  {
    title: "Segmentation",
    desc: "Hyper-segment leads based on their actions. Incentivize and lead them down your sales pipeline effortlessly.",
    listTitle: "Lead segments include:",
    list: ["Hot, warm, cold leads", "Sales-qualified, marketing-qualified", "Visitor type (first-time, returning shopper, registered user)", "Verified & unverified"],
    img: segment

  },
  {
    title: "Targeting",
    desc: "Sales-ready leads, prioritized individually and led down curated pop-up journeys.",
    listTitle: "Targeting rules apply at:",
    list: ["Page-level targeting", "Device-based targeting", "Traffic source targeting", "Trigger controls (timed pop-up, scroll depth, visit frequency)"],
    img: target
  }
]
const toolData = [
  {
    title: "Strategic Campaign Approach",
    point: [
      'Smart Campaign Scheduling',
      'Multi-Offer Pop-ups',
      'Campaigns Tailored by Visitor Type',
      'Parallel Campaigns for Different Visitor Types',
      'Marketing & Sales-Qualified Lead Segregation'
    ]
  },
  {
    title: "Enhanced Verification & List Building",
    point: [
      'Zero-Party Verification for Reliable Lists',
      'Targeted List Generation by Campaign',
      'Incentive-driven Visitor Verification',
      'Streamlined 2-Step Opt-In',
      'Customized OTP Verification Emails'
    ]
  },
  {
    title: "Refined Targeting Capabilities",
    point: [
      'Page-Level Precision Targeting',
      'Time & Scroll Depth Triggered Pop-ups',
      'Pop-up Frequency Control',
      'Lead Segmentation by Engagement Levels (Hot, Warm, Cold)',
      'Verified & Unverified Lead Tagging',
      'First-time vs. Returning Visitor Personalization',
      'Desktop and Mobile-Specific Targeting',
      'Personalization by Visitor Source'
    ]
  },
  {
    title: "Comprehensive Analytics Insights",
    point: [
      'Individual Level Pop-up Interaction Tracking',
      'Visitor Interaction Timeline Mapping',
      'Offer Reports',
      'Campaign Performance Metrics',
      'In-depth Campaign Analysis',
      'Accurate Revenue Measurement',
      'Visitor-Specific Campaign Effectiveness'
    ]
  },
  {
    title: "Versatile Pop - Up Templates",
    point: [
      'Ready-Made Pop-Up Designs',
      'Purpose-Based Templates',
      'Personality-Based Templates',
      'Responsive Pop-Ups',
      'Mobile-Optimized Pop-Ups',
      'Multi-Device Compatibility',
      'Element Customization for Mobile Display'
    ]

  },
  {
    title: "Comprehensive Pop - Up Builder",
    point: [
      'Drag & Drop Element Placement',
      'No-Code Customization',
      'Pop-up Modifications (size, layout, elements)',
      'Element Grouping in Containers',
      'Diverse Pop-up Types (slide-in, screen overlay, etc.)',
      'Background Image Addition',
      'Theme Kits (color schemes & fonts)',
      'Easy Duplication for Repetitive Elements',
      'Custom Input Fields',
      'Call-to-Action Buttons',
      'Real-Time Pop-up Previews',
      'Background Overlay Pop-ups',
      'Custom Pop-Up Launcher',
      'Multi-Step Engagement Flows',
      'Page-Based Triggers for Targeted Display',
      'Instant Email Validation',
      'Campaign Duplication'
    ]
  },
  {
    title: "Advanced Offer Customization",
    point: [
      'Simplified Discount Code Management',
      'Discount Code Auto-Generation',
      'Diverse Offer Types: Percentage, Flat Amount, Buy X Get Y',
      'Controlled Discount Management',
      'Cart-Specific Discount Conditions',
      'Discount Eligibility by Customer',
      'Discount Maximum Limit Setting'
    ]
  }
]

export default function Features() {
  const [ActiveNextgen, setActiveNextgen] = useState(0)

  return (
    <div style={{ background: "#fff" }} className='superLeadz_features' >

      {/* <Navbar position={'notFixed'} /> */}
      {/* <SubNavbar navTitle={'superLeadz'} /> */}

      <Row className=' justify-content-center mt160 match-height'>
        <Col xs="10" xl="10" className='  px-0 rounded-2'>
          <Row className='justify-content-center  match-height  h-100'>
            <Col md="6" className=' '>
              <h1 className='display-1 main-heading fw-bolder lh-83'>
                SuperLeadz
                Features
              </h1>
              <h1 className='text-black fw-bold mt-1'>A revenue-first lead generation tool built to engage, verify and convert high-value shoppers.</h1>
              <div className='d-block mt-2' >
                <Link to='/merchant/signup' className=' btn  main-btn-blue fs-4 fw-bolder  '>Get Started</Link>
              </div>
              <Row className='justify-content-start mt-2'>
                <Col md="6" className='  '>
                  <h4 className='fw-bolder mb-0 text-black '>Want a walkthrough?</h4>
                  <h1 className='fs-4 text-black fw-bold mt-0'>  Connect with one
                    of our sales specialists.</h1>
                </Col>
                <Col md="6" className=' mt-2 '>
                  <Link to='/contact-us' className='m-0  fs-4   fw-bolder p-0  '>
                    Schedule a demo
                    <IoMdArrowRoundForward />  </Link>
                </Col>
              </Row>

            </Col>
            <Col md="6" className='overflow-hidden  p-0 m-0  d-flex justify-content-center align-items-center '>

              <img className=' rounded-2 border' src={featureVideo} alt="" style={{ width: "440px" }} />
            </Col>

          </Row>
        </Col>
      </Row>

      <Row className=" justify-content-center mt180 px-2">
        <Col lg="12" xl="10">
          <h1 className="text-start display-4 fw-bolder main-heading mb-2">
            A no-code, drag & drop builder for <br /> high-converting pop-ups.</h1>
          {dragData.map((item, index) => (
            <Row key={index} className="mt-5 ">
              <Col md={4} className=' d-flex justify-content-start justify-content-md-center   align-items-center '>
                <img
                  src={item.img}
                  alt={`img ${item.img}`}
                  style={{ width: "120px" }}
                />
              </Col>
              <Col md={8} className=" ps-4 ">
                <div className="" key={index}>
                  <h1 className="fs-1  main-heading fw-bolder d-flex mt-0 pb-1">
                    {item.title}
                  </h1>
                  {item.desc.map((desc, descIndex) => (
                    <h2 className="d-flex text-black  text-start fs-3 m-0 mb-1"

                      key={descIndex}
                    >
                      <IoCheckmarkSharp
                        className="me-1 text-black"
                        style={{ minWidth: "32px" }}
                      />
                      {desc}
                    </h2>
                  ))}
                </div>
              </Col>
            </Row>
          ))}
        </Col>
      </Row>


      <Row className=' mt180 justify-content-center '>
        <Col xs="10" xl="10" className='  px-0 rounded-2'>
          <Row className='justify-content-center match-height flex-row-reverse'>
            <Col md="6" className=' p-0  rounded-2  d-flex justify-content-center  align-items-end align-items-md-center  '>
              <img className=' ' src={need} alt="" style={{ width: "120px" }} />
            </Col>
            <Col md="6" className='text-end'>
              <div>
                <h1 className='display-6 main-heading fw-bolder '>We have what you need.</h1>
                <h3 className='fs-3 fw-bold text-black '>Transparent terminology, a simplified
                  dashboard, actionable insights & more - our
                  tools are made keeping you, the marketer, in
                  mind.</h3>
                <h3 className='fs-3 fw-bold text-black '>And if you can’t find a feature you need, tell us
                  and we’ll create it just for you.</h3>
              </div>
            </Col>
          </Row>
          <Row className='justify-content-center mt-5 pt-5 match-height '>
            <Col md="6" className=' p-0 rounded-2  d-flex justify-content-center  align-items-start align-items-md-center  '>
              <img className=' ' src={wastage} alt="" style={{ width: "120px" }} />
            </Col>
            <Col md="6" className='d-flex flex-column  gap-3 ps-2  '>
              <div>
                <h1 className='display-6 main-heading fw-bolder'>No more wastage.</h1>
                <h3 className='fs-3 fw-bold text-black '>Your marketing budget is reserved for <span className='fw-bolder'>SuperLeadz</span> most likely to convert. Not anonymous visitors with unverifiable intent.</h3>

              </div>

            </Col>
          </Row>
        </Col>
      </Row>


      <Row className=' mt180 justify-content-center '>
        <Col xs="11" xl="10" className='  px-0 rounded-2 '>
          <h1 className='text-center display-2 main-heading fw-bolder '>NextGen LeadGen </h1>
          <h1 className='text-center text-black fw-bold '>Optimize your sales funnel with advanced lead management.</h1>

          <div className='d-flex gap-1 gap-lg-2 gap-lg-5 flex-wrap  justify-content-center mt-2 mt-md-5 '>
            {
              nextgenData.map((data, index) => (

                <h1 key={index} onMouseEnter={() => { setActiveNextgen(index) }} className={`fw-bolder  cursor-pointer ${ActiveNextgen === index ? 'main-heading' : 'text-secondary'}`} >{data.title}</h1>
              ))
            }

          </div>
          <div className='px-2'>

            {
              nextgenData.map((data, index) => {
                if (ActiveNextgen === index) {
                  return (
                    <>
                      <Row className='justify-content-center  match-height mt-2 border-bottom border-top ' key={index}>
                        <Col lg="5" className='d-flex flex-column  gap-2 py-3'>
                          <h1 className='fs-1 main-heading fw-bolder '>{data.title}</h1>
                          <h3 className='fs-3  text-black '>{data.desc}</h3>
                          <div>
                            <h1 className='fs-2 mb-2 main-heading fw-bolder mt-2 mt-md-4'>{data.listTitle}</h1>
                            {
                              data.list.map((listData, index2) => <h3 className='fs-3  text-black ' key={index2}>{listData}</h3>
                              )
                            }
                          </div>
                        </Col>
                        <Col lg="7" className=' p-0 border-start p-2 popupTran'>
                          <img className='w-100 rounded-4 h-100 test-fade-in-image ' style={{ filter: "grayscale(100%)" }} src={data.img} alt="" />
                        </Col>
                      </Row>
                    </>
                  )
                }

                return null
              }
              )}
          </div>

        </Col>
      </Row>

      {/* og of upper code */}
      <Row className=' mt170 justify-content-center '>
        <Col xs="10" xl="8" className='  px-0 rounded-2'>
          <Row className='justify-content-center mt-5 match-height '>
            <Col md="6" className='   rounded-2 d-flex justify-content-center align-items-start align-items-md-center   '>
              <img className='' style={{ width: "120px" }} src={Curation} alt="" />
            </Col>
            <Col md="6" className='d-flex flex-column justify-content-center ps-4  gap-2'>
              <div>
                <h3 className='fs-3 fw-bolder text-secondary '>Curation & insights</h3>
                <h1 className='fs-1 main-heading fw-bolder'>Distinct user journey design & conversion tracking.</h1>
              </div>
              <div>
                <h3 className='fs-3 fw-bolder text-secondary '>Lead tracking</h3>
                <h1 className='fs-1 main-heading fw-bolder'>Real-time lead journey mapping.</h1>
              </div>

            </Col>
          </Row>

          <Row className='justify-content-center mt-5 pt-5 match-height flex-row-reverse'>
            <Col md="6" className='   rounded-2 d-flex justify-content-center align-items-end align-items-md-center  '>
              <img className='' style={{ width: "120px" }} src={Zero} alt="" />
            </Col>
            <Col md="6" className='d-flex flex-column justify-content-center text-end pe-4 gap-2'>
              <div>
                <h3 className='fs-3 fw-bolder text-secondary '>Zero-Party Data</h3>
                <h1 className='fs-1 main-heading fw-bolder'>Lead self-verification via OTP.</h1>
              </div>
              <div>
                <h3 className='fs-3 fw-bolder text-secondary '>List-building</h3>
                <h1 className='fs-1 main-heading fw-bolder'>High-intent lead database.</h1>
              </div>

            </Col>
          </Row>
        </Col>
      </Row>

      <div>
        <style>
          {`
                 .SlideDropDown1{
                     max-height: 0;
                     overflow: hidden !important;
                     transition: max-height .6s ease-in-out;
                 }
                 .SlideDropDown2{
                     max-height: 0;
                     overflow: hidden !important;
                     transition: max-height .6s ease-in-out;
                 }
                 .SlideDropDown3{
                   max-height: 0;
                   overflow: hidden !important;
                   transition: max-height .6s ease-in-out;
               }
                  `}
        </style>
        <Row className=' justify-content-center mt180 match-height'>
          <Col xs="10" lg="10"    >
            <Row className='pt-2 pb-2  border-bottom'>
              <Col lg="6" className=''>
                <h1 className='display-4 main-heading fw-bolder '>One Tool. <br />
                  Unlimited Potential.
                </h1>
              </Col>
              <Col lg="6" className='mt-2'>
                <h1 className='text-black'>Features that combine to create unlimited lead generation strategies.</h1>
              </Col>
            </Row>

            {/* default */}
            <div>
              {
                toolData.map((data, index) => {
                  return (
                    <Row className='mt-3 mt-md-5  border-bottom pb-3 pb-md-5  ' key={index}>
                      <h1 className='display-6 main-heading text-center  fw-bolde fw-lig   ' style={{ paddingBottom: "8px" }}>
                        {data.title} </h1>

                      {
                        data.point.map((point, index2) => (
                          <Col lg="6" className='mt-1 mt-md-2  ' key={index2} >
                            <h1 className='fs-2 text-black  ' >
                              {point} </h1>
                          </Col>

                        ))
                      }
                    </Row>
                  )
                })
              }
            </div>


          </Col>

        </Row>
      </div>

      <style>
        {
          `
                .imgRes{
                  width:100%
                }
                @media only screen and (max-width: 600px) {
                  .imgRes{
                    width:80%;
                    margin:auto;

                  }
                }
                `
        }
      </style>
      <div className=" mt170 " style={{ background: "#000" }}>
        <Row className=" justify-content-center p-md-2 py-2 ">
          <Col lg="12" xl="10">
            <Row className="">
              <Col md={6} className="p-0">
                <Row className=' '>
                  <Col md={5} >
                    <img
                      src={demo_01_01}
                      alt="3ImageDemo1"
                      style={{ width: "100%", marginTop: "30%" }}
                      className="d-none d-md-block rounded-3 "
                    />
                  </Col>
                  <Col md={7} className=" ms-3 ms-md-0">
                    <img
                      src={demo_01_02}
                      alt="3ImageDemo2"
                      className='rounded-3 imgRes '
                    />
                    <img
                      src={demo_01_03}
                      alt="3ImageDemo3"
                      style={{ width: "50%", marginTop: "10px" }}
                      className="d-none d-md-block rounded-3"
                    />
                  </Col>
                </Row>
              </Col>
              <Col md={6} className=' d-flex  justify-content-center  align-items-start '>
                <div className='ms-2 ms-md-3 '>
                  <h1 className="display-3 fw-bolder m-0 text-white pe-4 pe-md-0 mt-2" >
                    Get started with SuperLeadz.
                  </h1>
                  <Link to="/merchant/signup" className="btn btn-lg fs-3 main-btn-blue fw-lig"  >
                    Start Free
                  </Link>
                  <div className=" mt-2">
                    <p className="fs-2 text-white"   >
                      For help getting started,
                      <Link to="/contact-us" className="fs-2 text-primary " style={{ marginLeft: "2px" }}>
                        contact us
                        <BsArrowRight size={16} style={{ marginLeft: "6px" }} />
                      </Link>
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>


      <hr className='mt100' />
      <Footer />

    </div >
  )
}
