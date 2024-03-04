import React, { useState } from "react"
// import { Container, Row, Col, Button, Form, Card, FormGroup } from "reactstrap"
import './base/css/Signup.css'
import axios from 'axios'
import "./base/css/style.scss"
import { useNavigate, Link } from "react-router-dom"
import Footer from "./base/Footer"

const default_data = {
  first_name: '',
  last_name: '',
  username: '',
  password: '',
  password2: '',
  mobile: ''
}


const SignUp = () => {
  const [signdata, setsigndata] = useState(default_data)
  const [resData, setresData] = useState({})
  const Navigate = useNavigate()

  const signUpdata = () => {

    setsigndata({...signdata, [event.target.name]: event.target.value })
    console.log(signdata)
  }

  const sendData = () => {
    axios.post('http://192.168.1.132:8000/signup/register/', signdata)
    .then(function (resp) {
      setresData(resp)
      console.log(resData)
      Navigate('/merchant/login')
    })
    .catch(function(error) {
      console.log(error)
    })
    
  }

    return (
        <>
          <div className="xircls_front_base">
            <section id="page" className="py-6">
              <div className="container col-5" style={{ border: `1px solid #ddd`, padding: `30px 30px`, width: '666px', maxWidth: `95%` }}>
                <div className="container clearfix text-center">
                  <h3 style={{ textAlign: `left`, fontWeight: `500` }} className="mb-4">Signup for a New Merchant Account</h3>
                </div>

                <div>
                  <div className="container clearfix" style={{ padding: `0px` }}>

                    <div className="accordion accordion-lg divcenter nobottommargin clearfix" style={{ maxWidth: `550px` }} >

                      
                      <div className="acctitle"></div>

                      <div className="clearfix">
                        <form className="js-validation-signin" action="." method="POST" name="merchant_signup_form" id="merchant_signup_form">
                          <div>
                            <input type="hidden" name="is_email_present" id="is_email_present" defaultValue="" />
                          </div>
                          <div className="col_full">
                            <label htmlFor="register-form-name">First Name: *</label>
                            <input type="text" className="form-control empty" id="id_firstname" name="first_name" placeholder="First Name" onInput={() => signUpdata()} required />
                          </div>
                          <span id="firstname_val" className="validation_msg" style={{ color: `red` }}></span>

                          <div className="col_full">
                            <label htmlFor="register-form-email">Last Name: *</label>
                            <input type="text" className="form-control empty" id="id_lastname" name="last_name" placeholder="Last Name" onInput={() => signUpdata()} required />
                          </div>
                          <span id="lastname_val" className="validation_msg" style={{ color: `red` }}></span>

                          <div className="col_full">
                            <label htmlFor="register-form-username">Email address: *</label>
                            <input type="text" className="form-control empty" id="id_username" name="username" placeholder="Email address" onInput={() => signUpdata()} maxLength="60" required />
                          </div>
                          <span className="validation_msg" style={{ color: `red` }} id="username_val" ></span>

                          <label htmlFor="mobile">Mobile
                            Number: *</label>
                          <div className="row">
                            <div className="col-md-3 form-group">
                              <select id="phone_code" name="phone_code" className="sm-form-control empty" style={{ border: `1px solid #ccc` }}>
                              <option defaultValue="Select" disabled >Select</option>
                              

                              </select>
                            </div>
                            <div className="col-md-9 form-group">
                              <input type="text" id="mobile" name="mobile" defaultValue="" className="form-control empty"  placeholder="Mobile Number" onInput={() => signUpdata()} required />
                              </div>
                              <span className="validation_msg" style={{ color: `red` }} id="mobile_val"></span>
                          </div>

                          <div className="col_full">
                            <label htmlFor="register-form-password">Choose Password: *</label>
                            <input type="password" className="form-control empty" id="id_password1" name="password" placeholder="Password" onInput={() => signUpdata()} required />
                          </div>
                          <span className="validation_msg" style={{ color: `red` }} id="password1_val" ></span>

                          <div className="col_full">
                            <label htmlFor="register-form-repassword">Re-enter Password: *</label>
                            <input type="password" className="form-control empty" id="id_password2" name="password2" placeholder="Confirm Password" onInput={() => signUpdata()} required/>
                          </div>
                          <span className="validation_msg" style={{ color: `red` }} id="password2_val" ></span>
                          

                          <div className="custom-control custom-checkbox custom-control-primary mb-1">
                            <div className="parent d-flex justify-content-start align-items-center" style={{ gap: `0.4rem` }}>
                              <input type="checkbox" className="custom-control-input" id="example-checkbox-custom2" name="example-checkbox-custom2" defaultValue="off" required />
                              <label className="custom-control-label" htmlFor="example-checkbox-custom2"><b>By signing up, you agree to XIRCLS' <a style={{ cursor: `pointer`, color: `#2e82cb` }}>Terms of Use</a> and <br /> <a style={{ cursor: `pointer`, color: `#2e82cb` }}>Privacy Policy.</a> *</b></label>

                            </div>
                            <span className="validation_msg" style={{ color: `red` }} id="privacy_val" ></span>
                          </div>
                          <br />

                          <div className="col_full nobottommargin">
                            <input type="hidden" name="next" defaultValue="{{ next }}" />
                            <input type="hidden" id="g-recaptcha-response" name="g-recaptcha-response" /> 
                            
                            <button  type="button" className="button button-3d button-black nomargin" name="signup" onClick={() => sendData()} >Signup</button>

                          </div>
                          
                          <div className="col_full nobottommargin">
                            <h6 className="font-size-sm py-1" style={{ marginBottom: `-30px` }}>
                              Already a XIRCLS merchant? Login <Link to="/merchant/login" className="signupTxt2">here.</Link>
                            </h6>
                          </div>
                        </form>

                      </div>

                    </div>

                  </div>

                </div>

              </div>
            </section>
            <Footer />
          </div>
        </>
    )
}

export default SignUp