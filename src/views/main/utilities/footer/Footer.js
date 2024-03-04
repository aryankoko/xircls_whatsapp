import logo from "../logo.png"
import React from 'react'
import { GoLinkExternal } from 'react-icons/go'
import { Col, Container, Row } from 'reactstrap'
import mail from './img/gmail.png'
import india from './img/india.png'
import meg from './img/magento.png'
import shopy from './img/shopify.png'
import usa from './img/usa.png'
import { Link } from "react-router-dom"
import toast from "react-hot-toast"
import { aboutList, productList } from "../navbar/Navbar"

const Footer = () => {

    const copyText = (num) => {
        const demo = document.getElementById(num).innerText
        navigator.clipboard.writeText(demo)
        toast.success(() => <h4 className="fw-bolder m-0 ">Copied !</h4>, {
            position: "top-center"
        })
    }
    return (
        <div className="px-2">
            <Row className='justify-content-center py-5 homeFooter mt-2 '>
                <Col md="10" xs="10" lg="11" xl="11">
                    <div className=' d-flex flex-wrap justify-content-between'  >
                        <div  >
                            <img className='mb-1' src={logo} alt="logo" width={200} style={{ marginTop: "-30px" }} />
                            <h5>The World's First Decentralized Collaborative <br /> Marketing Network.</h5>


                            <div className='d-flex justify-content-start align-items-center mt-2 '>
                                <a href="/" className=''>
                                    <img src={shopy} alt="" width={30} />
                                </a>
                                <a href="/" className=' ms-1'>
                                    <img src={meg} alt="" width={30} />
                                </a>
                                <a href="/" className=' ms-1'>
                                    <img src="//upload.wikimedia.org/wikipedia/commons/thumb/2/2a/WooCommerce_logo.svg/250px-WooCommerce_logo.svg.png" alt="" width={35} />
                                </a>

                            </div>

                        </div>

                        <div className="p-0 mt-3 mt-lg-0" >
                            <h5 className='text-black fw-bolder mb- ' style={{fontSize:"17px"}}>Products</h5>
                            <ul className=' list-unstyled'>
                                {
                                    productList.map((data, index) => (
                                        <li className=' ' style={{ marginTop: "7px" }} key={index}><Link to={data.link} > {data.title} </Link></li>
                                    ))
                                }

                            </ul>
                        </div>

                        <div className="p-0 mt-3 mt-lg-0" >
                            <h5 className='text-black fw-bolder mb-'style={{fontSize:"17px"}} >Company</h5>
                            <ul className=' list-unstyled'>
                                {
                                    aboutList.map((data, index) => (
                                        <li className=' ' style={{ marginTop: "7px" }} key={index}><Link to={data.link} > {data.title} </Link></li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="p-0 mt-3 mt-lg-0" >
                            <h5 className='text-black fw-bolder mb-' style={{fontSize:"17px"}}><Link to='/partners' >Partners </Link></h5>
                            <div className="d-none">
                                <ul className=' list-unstyled'>
                                    <li className=' ' style={{ marginTop: "7px" }} ><Link to="/affiliate/login" >  Login </Link></li>
                                    <li className=' ' style={{ marginTop: "7px" }} ><Link to="/affiliate/signup" >  Signup </Link></li>
                                </ul>

                            </div>

                            <h5 className='text-black fw-bolder mb-1' style={{fontSize:"17px"}}><Link to='/blog' >Blog </Link></h5>
                            <h5 className='text-black fw-bolder mb-1' style={{fontSize:"17px"}}><a target="_blank" href='https://hr.xircls.com/careers/' >Careers </a></h5>
                        </div>
                        <div className="p-0 mt-3 mt-lg-0" >
                            <h5 className='text-black fw-bolder mb-'style={{fontSize:"17px"}} >Contact Us</h5>
                            <ul className=' list-unstyled'>
                                <li className='mb-1 '><Link to='/contact-us' > Leave us a message <GoLinkExternal style={{ marginLeft: "5px" }} /> </Link></li>
                                <li className='mb-1 cursor-pointer user-select-none' onClick={() => copyText("num1")} ><img className='me-1' src={india} alt="" width={20} /> <span id="num1"> +91 9969 333 666 </span></li>
                                 {/* <a href="https://wa.me/message/LGXSSWWGV7UGP1" >contact to sahil</a> */}
                                <li className='mb-1 cursor-pointer user-select-none' onClick={() => copyText("num2")}> <img className='me-1' src={usa} alt="" width={20} /> <span id="num2">+1 (936) 333 6363 </span></li>
                                <li className='mb-1'><img className='me-1' src={mail} alt="" width={20} />
                                    <a href="mailto:info@xircls.com?subject = Feedback&body = Message">info@xircls.com</a></li>

                            </ul>

                        </div>

                    </div>
                    <div className='mt-3  text-center'>
                        <ul className=' d-inline-flex flex-wrap gap-3 list-unstyled'>
                            <li className='text-black '> <Link to="/terms-of-use/" >Terms of Use </Link></li>
                            <li className='text-black '> <Link to="/privacy-policy/" > Privacy policy </Link></li>
                        </ul>
                        <h6 className='text-secondary'>Copyright © 2022 All Rights Reserved. AltissAdvance Tech Private Limited</h6>
                    </div>
                </Col>


            </Row>
        </div>
    )
}

export default Footer