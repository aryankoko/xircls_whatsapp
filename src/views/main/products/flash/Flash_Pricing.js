import React from 'react'
import { Col, Row, Container } from 'reactstrap'
import Footer from '@src/views/main/utilities/footer/Footer'
import Price_Card from '../../components/Price_Card'

export default function Flash_Pricing() {
  const pricingData = [
    {
      head: "Free",
      value: "0",
      subValue: "$00.00/year",
      button: "Get Started",
      items: ["Upto 10 accounts & emails per month"]
    },
    {
      head: "Grow",
      value: "10",
      subValue: "$80.99/year (save 10%)",
      button: "Buy Now",
      items: ["Unlimited accounts & emails"]
    }

  ]

  return (
    <div style={{ background: "#fff" }} className=' p-0 px-3 px-md-0 '>
        {/* <Navbar position={'notFixed'} /> */}
        {/* <SubNavbar navTitle={'superLeadz'} /> */}

        <Row className=' justify-content-center '>
          <Col md="11" lg="11" xl="9">
            <h1 className='display-1 text-center main-heading fw-bolder mt-0'>Thoughtfully priced to help you  thrive and expand.</h1>
          </Col>
        </Row>


        <Row className=' justify-content-center mt-5  '>
          <Col md='11' lg="11" className='' >
            <Row className=' justify-content-center  match-height'>
              {
                pricingData.map((data) => (
                  <Col md="5" lg="3" className='  '>
                    <Price_Card data={data}  />
                  </Col>
                ))
              }
            </Row>
          </Col>
        </Row>
      

        <hr className='mt-5' />
        <Footer />

    </div>
  )
}