import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import MediaEmbed from '@src/views/main/components/MediaEmbed'
import CardLeft from '@src/views/main/components/CardLeft'
import Footer from '@src/views/main/utilities/footer/Footer'
import Navbar from '@src/views/main/utilities/navbar/Navbar'
// icons
import { BsShieldCheck } from 'react-icons/bs'
import { MdDone } from 'react-icons/md'
import { RxCross2 } from 'react-icons/rx'
import { Link } from 'react-router-dom'

import { BiConversation } from "react-icons/bi"
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6"
import { GiLifeBar } from "react-icons/gi"
import { TbPigMoney } from "react-icons/tb"

export default function Semper() {
  // data
  const virtuousData = [
    {
      title: 'Start building Loyalty Today!',
      desc: (<>
        <h3 className='fs-3 text-black'>Semper Fi eliminates the need to</h3>
        <ul>
          <li className='fs-3 text-black'>Stay limited to one’s own marketing budget to reward customers</li>
          <li className='fs-3 text-black'>Create complex, time-consuming loyalty programs/rewards systems</li>
          <li className='fs-3 text-black'>Pursue time-consuming cross-marketing partnerships with other brands</li>
        </ul>
      </>),
      img: "https://api.xircls.com/static/images/website-slide/sf011.jpg"
    },
    {
      title: 'Trigger real-time intelligence to reward contextually.',
      desc: 'XIRCLS matchmaking algorithms measure previous & current customer engagement to gain real-time behavioral insights and auto-curate more relevant reward experiences.',
      img: "https://api.xircls.com/static/images/website-slide/sf2.jpg"
    },
    {
      title: 'Choose exactly how you want to reward your customers.',
      desc: <>
        <h3 className='fs-3 text-black'>An ‘Inner XIRCL’ gives you 100% control over the customer reward experience.</h3>
        <ul>
          <li className='fs-3 text-black'>Create a private network of ideal partner companies</li>
          <li className='fs-3 text-black'>Direct offers from select partners to different sections of your customer base</li>
          <li className='fs-3 text-black'>Hyper-curate your customers’ rewards experience with handpicked offers</li>
        </ul>
      </>,
      img: "https://api.xircls.com/static/images/website-slide/sf3.jpg"
    },
    {
      title: "Make them feel they've 'earned' your offers.",
      desc: (<>Since customers receive your offers as a reward for their purchase, they instantly attach a personal value to your offers.<br />
        This motivates them to redeem the offers to get their money’s worth.</>),
      img: "https://api.xircls.com/static/images/website-slide/sf4.jpg"

    },
    {
      title: 'Don’t Bear the Burden of Rewarding your Customers Alone.',
      desc: (<>Customer retention has never been easier on your bottom line.<br />
        Reward your customers with diverse offers from non-competing merchants for every purchase they make.</>),
      img: "https://api.xircls.com/static/images/website-slide/sf5.jpg"
    },
    {
      title: 'Tap Into Collaboration’s Most Powerful Aspect – Trust',
      desc: 'Introduce your customers to new brands, and in turn they will introduce you to their customers, leveraging the trust-invoking power of the personal recommendations.',
      img: "https://api.xircls.com/static/images/website-slide/sf6.jpg"

    },
    {
      title: 'Win Customers for Life.',
      desc: (<>Prove to your customers that their money is always well spent at your business.<br />
        Show them that every visit with you is a reason to celebrate!</>),
      img: "https://api.xircls.com/static/images/website-slide/sf7.jpg"
    }
  ]
  // data 
  const diffData = {
    wrong: [
      'Reward points take too long to collect',
      'Collected points stay unredeemed',
      'Doesn’t address a customer’s immediate needs; instant gratification is missing',
      'Your rewarding capacity is limited to your own marketing budget / product or service range',
      'Most importantly, all customer retention costs come from your own pocket!'
    ],
    right: [
      'Reward instantly',
      'No reward points to collect',
      'Instant customer gratification',
      'Cross-brand relationship marketing',
      'Reward every engagement & purchase',
      'Run a rewards program that works across borders!',
      'Ensure your customers receive the star treatment everywhere they go',
      'Reward across categories & experiences',
      'Cultivate loyalty without fear of marketing expense!'
    ]
  }
  // decon
  const simperData = [
    {
      title: 'Start a conversation.',
      desc: 'Meaningfully engage with your prospects and customers in ways that make a real difference to them. Give them a reason to engage back with you.',
      icon: <BiConversation />
    },
    {
      title: 'Become part of their daily lives.',
      desc: 'Stay at the top of their minds. Deliver value that goes beyond their direct relationship with your brand. Become synonymous with value.',
      icon: <BsShieldCheck />
    },
    {
      title: 'Enhance your brand value.',
      desc: 'Through partner recommendations delivered straight to their inbox (including regular email reminders), be relevant without diluting your brand.',
      icon: <FaArrowTrendUp />
    }
  ]

  const retentionData = [
    {
      icon: <FaArrowTrendDown />,
      title: 'Lower Spending',
      desc: 'Acquiring a new customer is 5 times more expensive than retaining an existing customer.'
    },
    {
      icon: <FaArrowTrendUp />,
      title: 'Higher Conversion',
      desc: 'The probability of selling to an existing customer is 60-70%. The probability of selling to a new prospect is as little as 5-20%.'
    },
    {
      icon: <TbPigMoney />,
      title: 'Greater Profits',
      desc: 'Increasing customer retention rates by 5% increases profits by 25-95%.'
    },
    {
      icon: <GiLifeBar />,
      title: 'Improved CLV',
      desc: 'Lower your customer churn rates and increase your Customer Lifetime Value (CLV), both important indicators of your business health.'
    }
  ]
  return (
    <div style={{ background: "#fff" }} >

      {/* <Navbar /> */}

      {/* section 1 */}

      <Row className=' text-center  justify-content-center mt240'>
        <Col xs="11" lg="8" xl="8"  >
          <h1 className='display-1 text-center main-heading fw-bolder   lh-83 '>
            Retain Customers with<br /> Rewards You Don’t Pay For.
          </h1>
          <h1 className='text-black'>Semper-Fi is the only customer loyalty program in the world where other businesses pay to help YOU retain YOUR customers!</h1>
          <p className='fw-lig'>*Semper Fi comes from Semper Fidelis - a Latin phrase that means 'Always Loyal’.</p>
          <a target='_blank' href='https://apps.shopify.com/xircls?guided_search_enabled=false&st_source=autocomplete' className='btn  btn-lg main-btn-blue-gra  fs-3 mt-2 ' style={{ fontWeight: "900" }}>Start A Semper-fi Campaign</a>
        </Col>
      </Row >


      <Row className=' justify-content-center mt100 '>
        <Col lg="12" xl="10"  >
          <Container fluid='sm'>

            <Row className='  m-auto justify-content-between px-2  '>
              {
                simperData.map((data, index) => {
                  return (
                    <Col lg="4" md="6" className='' key={index}>
                      <CardLeft icon={data.icon} title={data.title} desc={data.desc} key={index} />
                    </Col>
                  )
                })
              }
            </Row>
            <h1 className='mt180 text-center display-2 fw-bolder main-heading  ' >How Semper-Fi is Different</h1>
            <Row className=' justify-content-around   mt-1 '>

              <Col lg="5" className='text-start mt-3 ' >

                <h1 className='fs-1 main-heading fw-bolder'>Typical Loyalty Programs</h1>
                <div className='d-flex flex-column  gap-1 mt-2'>
                  {
                    diffData.wrong.map((data) => (
                      <div className='d-flex  align-items-start '>
                        <h3 className=' fs-6 text-secondary ' style={{ minWidth: "20px", marginTop: "4px" }}><RxCross2 /></h3>
                        <h3 className=' fs-3 text-black '>{data}</h3>
                      </div>
                    ))
                  }
                </div>
              </Col>

              <Col lg="5" className='text-start mt-3' >
                <h1 className='fs-1 main-heading fw-bolder'>Semper Fi</h1>
                <div className='d-flex flex-column  gap-1 mt-2'>
                  {
                    diffData.right.map((data) => (
                      <div className='d-flex  align-items-start '>
                        <h3 className=' fs-6 text-secondary ' style={{ minWidth: "20px", marginTop: "4px" }}><MdDone /></h3>
                        <h3 className=' fs-3 text-black '>{data}</h3>
                      </div>

                    ))
                  }
                </div>
              </Col>

            </Row>
          </Container>
        </Col>
      </Row>


      {/* --------------------------------------------- */}

      <Row className='mt180 justify-content-center '>
        <Col xs="11" md="10" xl="10"  >
          <h1 className='display-2  main-heading fw-bolder text-center'>Create a virtuous cycle of goodwill.</h1>
          <h3 className='  text-center text-black   '>Equate your brand with unlimited value in the minds of your customers.<br />
            Make their purchases with you a source of perpetual delight!</h3>
          <div className=' mt100 px-0  d-flex flex-column  gap-5 '>
            {
              virtuousData.map((data, index) => {
                if (index % 2 === 0) {
                  return (
                    <Row className='justify-content-start my-1 my-md-3 '>
                      <Col md="2" className=' text-start text-md-end'>
                        <img src={data.img} alt="" width={100} />
                      </Col>
                      <Col md="10" className=''>
                        <h1 className='main-heading fw-bolder  mb-0 display-6 '>{data.title}</h1>
                        <h3 className='text-black lh-32 mt-1 ms-1'>{data.desc}</h3>
                      </Col>
                    </Row>
                  )
                } else {
                  return (
                    <Row className='justify-content-start my-1 my-md-3  flex-row-reverse'>
                      <Col md="2" className=' text-end text-md-start'>
                        <img src={data.img} alt="" width={100} />
                      </Col>
                      <Col md="10" className='text-end'>
                        <h1 className='main-heading fw-bolder  mb-0 display-6 '>{data.title}</h1>
                        <h3 className='text-black lh-32 mt-1 ms-1'>{data.desc}</h3>
                      </Col>
                    </Row>
                  )
                }
              })
            }

          </div>
        </Col>
      </Row>

      <div className=' p-1 py-3 p-md-5  mt100 text-center' style={{ background: "#e5e7eb" }}>
        <Container fluid='sm'>
          <h1 className='display-3  main-heading fw-bolder '>
            Instant Gratification Never Felt So Good.
          </h1>
          <h3 className='text-black m-0 fs-3 '>Generously reward your customers on every single purchase without feeling the pinch.<br />
            Reserve your marketing budget for other activities  <br />
            while actively cultivating loyalty for your brand every single day.</h3>

        </Container>
      </div>

      <Row className=" justify-content-center mt180 ">
        <Col lg="10" xs="10">
          <Container fluid='sm'>

            <h1 className='display-2 fw-bolder text-center  main-heading'>Why Customer Retention Makes Sense.</h1>
            <Row className='  justify-content-center '>
              {
                retentionData.map((data, index) => (
                  <Col lg="5" md="6" >
                    <CardLeft icon={data.icon} title={data.title} desc={data.desc} key={index} />

                  </Col>
                ))
              }

            </Row>
          </Container>

        </Col>
      </Row>

      <Row className=" justify-content-center text-center mt180 py-5" style={{ background: "#e5e7eb" }}>
        <Col lg="10" xs="12">

          <Container fluid='sm'>
            <h1 className='display-3  main-heading fw-bolder '>
              Give Value To Become Truly Invaluable.
            </h1>
            <h3 className=' m-0 fs-2 mt-1 text-black'> <span className=' text-black '> ‘You must give to receive.’</span> We help you put this principle to practice.</h3>
            <h3 className=' m-0 fs-2 mt-1 text-black'>Instead of leaving it to your customers to reap the benefits of their loyalty to you,<br /> we ask you to take the first step and reward them from their very first purchase – and forever after that.</h3>
            <h3 className=' m-0 fs-2 mt-1 text-black'>Consistently give them value.</h3>
          </Container>
        </Col>
      </Row>


      <div className=' p-1 py-3 p-md-5 mt180 ' style={{ background: "#000" }}>
        <Container fluid='sm'>

          <Row className=" justify-content-center d-flex flex-column-reverse flex-lg-row " >
            <Col lg="6">
              <h1 className='display-3  text-white fw-bolder '>
                Launch a Perpetual Rewards Loop
              </h1>
              <h3 className='text-white  fs-2 '>Gift your customers with partner offers every single time they buy from you to keep them coming back for more.</h3>

              <Link to='/merchant/signup' className=' btn btn-lg  main-btn-blue2 fw-lig fs-3 mt-2'>Get started for free</Link>
            </Col>
            <Col lg="6">
             
              <video className='w-100' controls src="https://api.xircls.com/static/images/website-slide/videos/XIRCLS%20E-Commerce%20Demo.mp4" width="400" height="300" autoPlay muted loop />

            </Col>

          </Row>
        </Container>
      </div>

      <Footer />


    </div>
  )
}
