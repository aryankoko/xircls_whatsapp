import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import Navbar from '@src/views/main/utilities/navbar/Navbar'
import CardLeft from '@src/views/main/components/CardLeft'
import Footer from '@src/views/main/utilities/footer/Footer'
// icons
import { AiOutlineAppstoreAdd, AiOutlineLink } from 'react-icons/ai'
import { BsBullseye, BsShieldCheck } from 'react-icons/bs'
import { MdOutlineLoyalty, MdOutlineAccessTime } from 'react-icons/md'
import { TbMoneybag } from 'react-icons/tb'
import { IoFastFoodOutline } from "react-icons/io5"

// imgs
import food from './imgs/food.png'
import fashion from './imgs/fashion.png'
import jewellery from './imgs/jewelry.png'
import health from './imgs/health.png'
import makeup from './imgs/makeup.png'
import kids from './imgs/kids.png'
import { Link } from 'react-router-dom'

export default function Infiniti() {
  // data
  const techSellsData = [
    {
      title: "Instant Partnerships",
      desc: "Build & leverage your business relationships. Collaborate towards mutually profitable and precisely measurable goals.",
      icon: <MdOutlineAccessTime />
    },
    {
      title: "Instant Delivery",
      desc: "Your marketing message is email-delivered by partner companies to their customers.",
      icon: <BsShieldCheck />
    },
    {
      title: "Real-Time Engagement",
      desc: "Reward potential customers making purchases in partner categories.",
      icon: <MdOutlineAccessTime />
    },
    {
      title: "No-Cost Loyalty",
      desc: "Reward your customers with partner offers every single time they buy from you.",
      icon: <AiOutlineAppstoreAdd />
    },
    {
      title: "Instant Goodwill",
      desc: "Partner company recommendations create the perfect first impression for potential customers.",
      icon: <MdOutlineLoyalty />
    },
    {
      title: "Precision Marketing",
      desc: "Stop wasting your money on assumption-based advertising. Instantly zero in on your ideal customer base.",
      icon: <TbMoneybag />
    }
  ]

  const PartnersData = [
    {
      title: 'Food & Beverages',
      img:food
    },
    {
      title: 'Fashion & Accessories',
      img:fashion
    },
    {
      title: 'Jewellery',
      img:jewellery
    },
    {
      title: 'Health & Wellness',
      img:health
    },
    {
      title: 'Makeup & Beauty',
      img:makeup
    },
    {
      title: 'Kids',
      img:kids
    }
  ]

  // data 
  const campaignsData = [
    'Easy to track',
    'ROI-focused',
    'Low risk',
    'Cross-Channel',
    'Quick to launch',
    'Fraud-Proof',
    'Optimization-friendly',
    'Budget-friendly'
  ]
  // decon
  const marketingData = [
    {
      title: 'Peer-to-Peer',
      desc: 'Companies come together to achieve mutually beneficial marketing goals with no intermediaries.',
      icon: <BsBullseye />
    },
    {
      title: '100% Trustless',
      desc: 'Every customer marketed to is verified in real-time by companies themselves, eliminating the compulsion to trust a third party with possibly vested interests.',
      icon: <BsShieldCheck />
    },
    {
      title: 'Public, Yet Private',
      desc: 'No customer data is ever shared between companies while verifying and marketing to each other’s customers.',
      icon: <AiOutlineLink />
    }
  ]
  return (
    <div style={{ background: "#fff" }} >

        {/* <Navbar /> */}

        {/* section 1 */}
        <h1 className='display-1 text-center main-heading fw-bolder mt240 lh-83 '>
          From First Purchase<br /> To Forever Loyal.
        </h1>

        <Row className='mt160 justify-content-center '>
          <Col xs="11"  lg="11" xl="10"  >
            <Row className=' justify-content- '>
              <Col md="6" className='text-end pe-2'>
                <img src="https://www.xircls.com/static/media/acquisitionimg.489b16be.jpg" alt="" width={80} style={{ filter: "grayscale(100%)" }} />
                <div className=' '>
                  <h1 className='display-4 main-heading fw-bolder '>Customer Acquisition</h1>
                  <h3 className='text-black'>Engage Customers of Partner Businesses<br />
                    Acquire Valuable Leads<br />
                    Raise Customer Lifetime Value</h3>
                </div>
              </Col>

              <Col md="6" className='text-start ps-2'>
                <img src="https://www.xircls.com/static/media/retentionimg.87bcf3f8.jpg" alt="" width={80} style={{ filter: "grayscale(100%)" }} />
                <div className=' '>
                  <h1 className='display-4 main-heading fw-bolder '>Customer Retention</h1>
                  <h3 className='text-black'>Other businesses reward your customers<br />
                    for shopping with you. Instantly!<br />
                    No points to collect. No waiting for redemption.</h3>
                </div>
              </Col>
              <div className='text-center'>
              <a target='_blank' href='https://apps.shopify.com/xircls?guided_search_enabled=false&st_source=autocomplete' className=' btn  main-btn-blue fs-3 mt-3 fw-lig'>Start a Infiniti Campaign</a>
              </div>

            </Row>
          </Col>
        </Row>


        <div>
          <Row className='section8 justify-content-center mt180 '>
            <Col xs="11" lg="12" xl="10"  >
              <h1 className=' text-center display-2 fw-bolder main-heading  ' >Why Infiniti is Marketing 2.0</h1>
              <Row className='  m-auto justify-content-between  mt-2 '>
                {
                  techSellsData.map((data, index) => {
                    return (
                      <Col lg="4" md="6" className='' key={index}>
                        <CardLeft icon={data.icon} title={data.title} desc={data.desc} key={index} />
                      </Col>
                    )
                  })
                }
              </Row>
            </Col>
          </Row>
        </div>

        <div className=' p-5  mt180' style={{ background: "#e5e7eb" }}>
          <div>

            <Row className='justify-content-center  text-center gy-1 '>
              <Col md="3" className='text-center'>
                <h1 className='main-heading fw-bolder '>140000+</h1>
                <h3 className='fs-3 text-black'> Real-Time Marketing <br/>Collaborations Enabled.</h3>
              </Col>
              <Col md="3" className='text-center'>
                <h1 className='main-heading fw-bolder '>97000+</h1>
                <h3 className='fs-3 text-black'>Transactions rewarded.</h3>
              </Col>
              <Col md="3" className='text-center'>
                <h1 className='main-heading fw-bolder '>1250000+</h1>
                <h3 className='fs-3 text-black'>Value of offers rewarded by partners.</h3>
              </Col>

              <Col md="3" className='text-center'>
                <h1 className='main-heading fw-bolder '>800+</h1>
                <h3 className='fs-3 text-black'>Customers successfully retained.</h3>
              </Col>
            </Row>
          </div>

        </div>


        <div>

          <Row className='section8 justify-content-center mt180 '>
            <Col xs="11" xl="10"  >
              <h1 className=' text-center display-2 fw-bolder main-heading  ' >Your Affinity Partners Are Waiting!</h1>
              <h1 className='text-center text-black'>Join the XIRCLS network and instantly partner with companies in these categories.</h1>
              <Row className='   justify-content-between  mt-1 '>
                {
                  PartnersData.map((data, index) => (
                    <Col  md="4" xs="6" className='text-center mt-3' key={index}>
                      <img className='mb-2' src={data.img} alt="" width={50} />
                      {/* <h3 className='fs-1 text-black'>{data.icon}</h3> */}
                      <h1 className='main-heading fw-bolder '>{data.title}</h1>
                    </Col>
                  ))
                }

              </Row>
            </Col>
          </Row>


          <Row className='section8 justify-content-center mt180 '>
            <Col lg="12" xl="10"  >
              <h1 className=' text-center display-2 fw-bolder main-heading ' >Decentralized Marketing</h1>
              <h1 className='text-center text-black'>Revolutionary technology makes XIRCLS a truly democratic & decentralised marketing network run by businesses for businesses.</h1>

              <Row className='  justify-content-center  mt-2 px-3 px-md-1  '>
                {
                  marketingData.map((data, index) => {
                    return (
                      <Col lg="4" md="5" className='' key={index}>
                        <CardLeft icon={data.icon} title={data.title} desc={data.desc} key={index} />
                      </Col>
                    )
                  })
                }
              </Row>
            </Col>
          </Row>
        </div>


        <div className='section8Test d-flex flex-column justify-content-center align-items-center mt190 p-0 p-sm-5' style={{ background: "#000" }}>
          <div>
            <Row className='justify-content-center '>
              <Col xs="11" md="12" xl="11">
                <Row className='match-height mt-2 '>
                  <Col lg="6" md="6" className=''>
                    <h1 className='display-1 fw-bolder  text-white text-start lh-sm ' >XIRCLS Campaigns Are:</h1>
                    <div className='ms-auto arrow' >
                      <img className='d-none d-lg-block ' src="https://uploads-ssl.webflow.com/5fac11c3554384e2baf6481c/61fa78aa61452b33bdbd7c9c_Arrow_01.svg" alt="" width={220} style={{ position: "relative", top: "40px" }} />
                    </div>
                  </Col>
                  <Col lg="6" md="6" >
                    <div className='   d-flex flex-column p-1 justify-content-end align-items-center mt-2' style={{ background: "#000", border: 'none' }}>
                      <ul className='d-flex flex-column gap-2'>
                        {
                          campaignsData.map((data, index) => (
                            <li className='d-flex align-items-center gap-3' key={index} ><img src="https://uploads-ssl.webflow.com/5fac11c3554384e2baf6481c/61fa78aa67d329961f45979f_check-icon.svg" alt="" srcSet="" width={30} /><h4 className='fs-1 text-white fw-lig m-0'>{data}</h4></li>
                          ))
                        }
                      </ul>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </div>
        <Footer />

    </div>
  )
}
