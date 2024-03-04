import React from 'react'
import { Carousel } from 'react-bootstrap'
import { Col, Row } from 'reactstrap'
import "./section5.scss"
import beyour from './img/b.jpeg'

const Testimonial = () => {
    const companyDetails = [
        {
            name: "BADMAASH",
            personName: "Nikhil Jain",
            role: "Co-founder & CEO",
            desc: "A very good app in terms of collaborative marketing. Something new and unique and helps us reduce spend. The team is very good in terms of support and follow-up. Harshitha from the team is like fire - always in touch and encouraging us to implement some marketing strategy or the other. Overall a great platform. Cheers to this great work guys!",
            logo: "https://www.badmaash.com/cdn/shop/files/Badmaash_Logo_Details-1_1_1_1_d41e0537-7483-47a5-bd4b-0ef75dba30af_1024x.png?v=1670569637"

        },
        {
            name: "BeYours",
            personName: "Nilesh Karnani & Ashish Baheti",
            role: "Co-founders",
            desc: "XIRCLS is disrupting the marketing industry through collaborative marketing, while helping all brands to increase their reach & sales.",
            logo: beyour
        }
    ]

    return (
        <div className='mt150 testo'>
            <Carousel className=' pt-0 m-0'>
                {
                    companyDetails.map((ele, index) => (
                        <Carousel.Item key={index}>
                            <Row className='justify-content-center ' style={{ background: "#F5F7F8.33%", minHeight: "400px" }}>
                                <Col md="5" className=" d-flex  justify-content-center  align-items-center " >
                                    <div className=' text-center' >

                                        <div className='d-flex justify-content-center align-items-center ' style={{ width: "350px", height: "200px" }} >
                                            {
                                                index === 0 &&
                                                <img src={ele.logo} alt="profile" className=' ' style={{ maxWidth: "100%", maxHeight: "200px" }} />
                                            }
                                            {
                                                index === 1 &&
                                                <img src={ele.logo} alt="profile" className=' ' style={{ maxWidth: "100%", maxHeight: "200px" }} />
                                            }
                                        </div>
                                        <h4 className=' fw-bolder text-black fs-2  mt-1'>{ele.name}</h4>
                                    </div>

                                </Col>

                                <Col md="5" sm=""  className=' py-3 px-1 d-flex flex-column justify-content-center  align-items-start ' >
                                    <h1 className='fs-1 fw-bold mb-2 px-2 main-heading testimonialDesc lh-32' >
                                        {ele.desc}
                                    </h1>
                                    <p className='text-black fs-2 mt-2 px-1'><span className="fw-bolder">{ele.personName},</span> {ele.role}</p>
                                </Col>

                            </Row>
                        </Carousel.Item>
                    ))
                }

            </Carousel>

        </div>
    )


    // orignal code ------------------------------------------------------------------------------------------------------
    // return (
    //     <div className='mt150 testo'>
    //         <Carousel className=' pt-0 m-0'>
    //             {
    //                 companyDetails.map((ele, index) => (
    //                     <Carousel.Item key={index}>
    //                         <div className=' position-relative main-cont' >
    //                             <div className=' py-3 section5Content' style={{ background: "#F5F7F8.33%", height: "400px" }}>
    //                                 <h4 className='  fw-bolder text-secondary'>TESTIMONIAL</h4>
    //                                 <h1 className='fs-1 fw-bold mb-2 main-heading testimonialDesc lh-32' >
    //                                     {ele.desc}
    //                                 </h1>
    //                                 <div className=' d-flex align-items-center mb-2 gap-1' style={{ width: "250px" }}>
    //                                     <div className=' rounded-circle d-flex justify-content-center  align-items-center ' style={{ width: "50px", height: "50px", backgroundColor: "#fff" }}>
    //                                         <img src={ele.logo} alt="" srcSet="" />
    //                                     </div>
    //                                     <h4 className=' fw-bolder text-black fs-2'>{ele.name}</h4>
    //                                 </div>
    //                                 <p className='text-black fs-3'><span className="fw-bolder">{ele.personName},</span> {ele.role}</p>
    //                             </div>
    //                             <div className="profileImg" >
    //                                 <img src={ele.img} alt="profile-image" className='rounded-5' />
    //                             </div>
    //                         </div>
    //                     </Carousel.Item>
    //                 ))
    //             }

    //         </Carousel>
    //     </div>
    // )
}


export default Testimonial