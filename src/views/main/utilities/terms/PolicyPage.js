import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import Footer from '@src/views/main/utilities/footer/Footer'
import Navbar from '@src/views/main/utilities/navbar/Navbar'

export default function PolicyPage() {

  const policyData = [
    {
      title: "Information Collected",
      desc: [
        "To access this Site and its Services, you must first complete the registration process. During the registration process, we collect personal information such as your name, email address, phone number etc. Once you complete and submit your registration, you have opted in to receive email communication from us.",
        "We also collect personal information when you choose to use certain other features of the Site, such as making purchases or electing to receive text messages about upcoming products or other information. When you choose to use these additional features, we require you to provide additional personal information such as your phone number, billing and shipping addresses and credit card information, and we may request additional personal information such as your preferences and demographics.",
        "The Site also makes use of a technology designed to enhance your browsing experience and to provide aggregate non-personally identifiable information about the use of the Site to us. www.xircls.com and its Partners and Payment Gateway is backed by a safe and secure system and at no time stores or divulges to any other sources, any personal information relating to Credit cards / debit cards / bank details.",
        "Whenever you change or access your account information, we offer the use of a secure server. Once your information is in our possession, we adhere to strict security guidelines, protecting it against unauthorized access.",
        "Other than when required for payment through xircls.com, please do not disclose personal information such as Credit Card/Debit Card numbers, CVV numbers, bank details etc. to our employees or any other representatives. Maintaining your security and confidentiality is our priority."
      ]
    },
    {
      title: "Use and Disclosure of Information",
      desc: [
        "We use the information we collect to process your purchase transactions, to send you marketing and promotional materials by email or SMS, and to help us improve our Site and online product assortments and services for you.",
        (<div className='fw-lig'>We will never provide information we collect to any third parties.</div>)
      ]
    },
    {
      title: "How Can I Access, Correct and Update Personal Information?",
      desc: [(<>You can access, correct and update certain personal information that you have provided to us by clicking on <span className='fw-bolder main-heading'>"Edit"</span> within the <span className='fw-bolder main-heading'>"Account"</span> area of this Website.</>)]
    },
    {
      title: "Privacy Policy Changes",
      desc: ["If we decide to change our Privacy Policy for the Site, we will post the revised Privacy Policy here so that you will always know what information we gather and how we might use that information. Your continued use of the Site indicates your assent to the Privacy Policy as posted."]
    }
  ]

  return (
    <div style={{ background: "#fff" }} >

        {/* <Navbar /> */}

        {/* section 1 */}
        <Row className=' text-center  justify-content-center mt240'>
          <Col xs="11" lg="10" xl="10"  >
            <h1 className='display-1 text-center main-heading fw-bolder   lh-83 '>
              Privacy Policy
            </h1>
            <h1 className='text-black mt-2'>XIRCLS is committed to protecting the privacy of visitors to this site. While it is necessary for us to collect certain personal information, we respect and protect your right to privacy as set forth in this Privacy Policy. This Privacy Policy applies to the Site. This Privacy Policy does not apply to other websites to which we link. You agree that your use of the Site signifies your assent to this Privacy Policy.
              If you do not agree with this Privacy Policy, please do not use the Site.</h1>
          </Col>
        </Row >

        <Row className='mt160 justify-content-center '>
          <Col xs="10" md="10" xl="10"  >
            <div className='  px-0  d-flex flex-column  gap-5 '>
              {
                policyData.map((data, index) => (
                  <div className='justify-content-start mt-4' key={index}>
                   
                    <div  className=''>
                      <h1 className='main-heading display-6 fw-bolder  mb-0'>{data.title}</h1>
                      {
                        data.desc.map((list) => (
                          <h2 className='text-black lh-32 mt-1'>{list}</h2>
                        ))
                      }
                    </div>
                  </div>
                ))}
            </div>
          </Col >
        </Row >

     <hr  className='mt180'/>

        {/* footer */}
        < Footer />

    </div >
  )
}
