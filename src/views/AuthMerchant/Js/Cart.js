import React, { useState } from "react"
import { Container, Card, Col, Row, CardBody, Input, Label } from "reactstrap"
import {Link} from 'react-router-dom'
import '../Css/Cart.css'
import Flatpickr from 'react-flatpickr'
// import { ownUrl } from "../../Validator"
import { X } from "react-feather"
import visa from "../../../assets/images/logo/visa-light.png"
import paypal from "../../../assets/images/logo/paypal-light.png"

const Cart = () => {
    const [method, setMethod] = useState("credit")

    return (
        <>
            <Row>
                <Card>
                    <CardBody>
                        <div className="cart_header">
                            <div className="row">
                                <div className="col-md-6" style={{borderRight: '1px solid #ccc', paddingRight: '20px !important'}}>
                                    <div className="px-2">
                                        <h4>Checkout</h4>
                                        <p>All plans include 40+ advanced tools and features to boost your product. <br />
                                            Choose the best plan to fit your needs.
                                        </p>


                                        <div className="cart_method row mt-2">
                                            <div className="col-md-6">
                                                <div className='form-check p-0'>
                                                    <Label className='border rounded p-1 form-check-label d-flex justify-content-start align-items-center gap-1' for='ex1-active' onClick={() => {
                                                        setMethod("credit")
                                                    }}>
                                                        <Input type='radio' id='ex1-active' style={{marginLeft: '15px'}} name='ex1' checked={method === "credit"} />
                                                        <img src={visa} alt="" width={'58px'} />
                                                        <a className="m-0">Credit Card</a>
                                                    </Label>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className='form-check p-0'>
                                                    <Label className='border rounded p-1 form-check-label d-flex justify-content-start align-items-center gap-1' for='ex2-active' onClick={() => {
                                                        setMethod("visa")
                                                    }}>
                                                        <Input type='radio' id='ex2-active' style={{marginLeft: '15px'}} name='ex2' checked={method === "visa"} />
                                                        <img src={paypal} alt="" width={'58px'} />
                                                        <a className="m-0">Paypal</a>
                                                    </Label>
                                                </div>
                                            </div>
                                            
                                        </div>

                                        <div className="row mt-3">
                                            <div className="detaiHeader my-1">
                                                <h4>Billing Details</h4>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 mb-1">
                                                    <div className="from-group">
                                                        <label htmlFor="email">Email</label>
                                                        <input type="text" className="form-control" placeholder="Email" />
                                                    </div>

                                                </div>
                                                <div className="col-md-6 mb-1">
                                                    <div className="from-group">
                                                        <label htmlFor="password">Password</label>
                                                        <input type="text" className="form-control" placeholder="Password" />
                                                    </div>

                                                </div>
                                                <div className="col-md-6 mb-1">
                                                    <div className="from-group">
                                                        <label htmlFor="country">Country</label>
                                                        <select name="country" id="country" className="form-control">
                                                            <option value="india">India</option>
                                                        </select>
                                                    </div>

                                                </div>
                                                <div className="col-md-6 mb-1">
                                                    <div className="from-group">
                                                        <label htmlFor="country">Billing Zip / Postal Code</label>
                                                        <input type="text" className="form-control" placeholder="Zip / Postal Code" />
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        {
                                            method === "credit" ? (
                                                <div className="row ">
                                                    <div className="detaiHeader my-1">
                                                        <h4>Credit Card Info</h4>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12 mb-1">
                                                            <div className="from-group">
                                                                <label htmlFor="card_number">Card number</label>
                                                                <input type="text" className="form-control" placeholder="Card number" />
                                                            </div>

                                                        </div>
                                                        <div className="col-md-6 mb-1">
                                                            <div className="from-group">
                                                                <label htmlFor="name">Name</label>
                                                                <input type="text" className="form-control" placeholder="name" />
                                                            </div>

                                                        </div>
                                                        <div className="col-md-3 mb-1">
                                                            <div className="from-group">
                                                                <label htmlFor="exp_date">EXP. Date</label>
                                                                <Flatpickr className='form-control' options={{ minDate: "today", dateFormat: "Y-m-d" }} placeholder="MM/YY" />
                                                            </div>

                                                        </div>
                                                        <div className="col-md-3 mb-1">
                                                            <div className="from-group">
                                                                <label htmlFor="CVV">CVV</label>
                                                                <input type="text" className="form-control" placeholder="CVV" />
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            ) : ''
                                        }
                                    </div>

                                </div>

                                <div className="col-md-6">
                                    <div className="card_parent px-2" style={{paddingLeft: '20px !important'}}>
                                        <h4>Order Summary</h4>
                                        <p>It can help you manage and service orders before, <br />
                                            during and after fulfilment.
                                        </p>

                                        <div className="change_plan mt-2 p-2 rounded" style={{background: '#f9f9fa'}}>
                                            <span>A simple start for everyone</span>
                                            <div class="d-flex align-items-center">
                                                <h1 class="text-heading display-5 mb-1">$59.99</h1>
                                                <sub>/month</sub>
                                            </div>
                                            <a className="btn btn-light-primary-main w-100">Change Plan</a>
                                        </div>

                                        <div className="details my-2">
                                            <div className="subDetail d-flex justify-content-between align-items mb-1">
                                                <span>Subtotal</span>
                                                <span><b>$85.99</b></span>
                                            </div>
                                            <div className="subDetail d-flex justify-content-between align-items mb-1">
                                                <span>Tax</span>
                                                <span><b>$85.99</b></span>
                                            </div>
                                            <hr />
                                            <div className="subDetail d-flex justify-content-between align-items mb-1">
                                                <span>Total</span>
                                                <span><b>$90.98</b></span>
                                            </div>
                                        </div>
                                        <a className="btn btn-primary-main w-100">
                                            Proceed with Payment
                                        </a>
                                        <p className="mt-2">By continuing, you accept to our Terms of Services and Privacy Policy. Please note that payments are non-refundable.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Row>
        </>
    )   
}

export default Cart