import React, { useState } from "react"
import { Container, Row, Col, Card, CardBody } from "reactstrap"
import backImage from "./assets/bg_images/pexels-marc-mueller-380769.jpg"
import $ from "jquery"
import { Link, useLocation, useNavigate } from "react-router-dom"
import phonecodeList from "../NewFrontBase/NewCountry"
import { postReq } from "../../assets/auth/jwtService"
import toast from 'react-hot-toast'
import { setToken } from "../../assets/auth/auth"

const NewSignup = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const path = location.pathname
  const navElements = path.split("/")
  console.log(navElements[2])

  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    phone_code: "+91",
    phone_no: "",
    email: "",
    password: "",
    confirm_password: ""
  })
  const [checked, setChecked] = useState(false)
  const [showError, setShowError] = useState(false)

  const inputChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleCheckBox = (e) => {
    setChecked(e.target.checked)
  }
  console.log(data)

  const submitButtonHandler = () => {
    if (
      data.first_name === "" ||
      data.last_name === "" ||
      data.phone_no === "" ||
      data.email === "" ||
      data.password === "" ||
      data.confirm_password === "" ||
      checked === false
    ) {
      setShowError(true)
    } else {
      setShowError(false)
      const formData = new FormData()
      Object.entries(data).map(([key, value]) => formData.append(key, value))
      postReq("signup", formData)
        .then((res) => {
          console.log(res.data)
          const tokenValue = JSON.stringify(res.data)
          setToken(tokenValue)
          if (res.status === 201) {
            toast.success('Signed In')
            navigate("/new_login")
          }
        })
        .catch((err) => {
          console.log(err)
          toast.error('Email must be unique.')
        })
    }
  }

  return (
    <>
      <div
        className="position-relative"
        style={{
          backgroundImage: `url(${backImage})`,
          backgroundSize: "cover%",
          backgroundPosition: "center"
        }}
      >
        <div
          className="w-100 h-100 position-absolute"
          style={{ backgroundColor: "black", opacity: "0.85", zIndex: 1 }}
        ></div>
        <Container
          fluid
          className="position-relative m-auto px-2 px-md-5"
          style={{ zIndex: 2 }}
        >
          <Row style={{ minHeight: "100vh" }}>
            <Col lg={8}>
              <img
                src="https://api.xircls.com/static/images/website-slide/logo-dark2.png"
                width={175}
                alt=""
                className="py-3"
                style={{ filter: "invert(100%)" }}
              />
              <h1
                className="text-white"
                style={{ zIndex: 300, fontWeight: 800, fontSize: "2.5rem" }}
              >
                Join a Global Network of Companies
              </h1>
              <p className="text-white mb-5" style={{ fontSize: "1.35rem" }}>
                Partnerships Make Marketing Smarter, Cost Efficient &
                Personalised
              </p>
            </Col>
            <Col
              className="d-flex justify-content-center align-items-center"
              lg={4}
            >
              <Card
                className="rounded-3 w-100 mb-0"
                style={{ minHeight: "90%" }}
              >
                <CardBody className="d-flex flex-column justify-content-center align-items-start px-3">
                  {/* <p className="text-danger text-center w-100" style={{fontSize: '1rem'}}>This field must be unique.</p> */}
                  <h2 className="text-black" style={{ fontWeight: 800 }}>
                    Welcome to XIRCLS
                  </h2>
                  <p
                    className="text-black fw-bold mb-3"
                    style={{ fontSize: "0.95rem" }}
                  >
                    Get started, explore a world beyond Aggregators
                  </p>
                  <div className="row w-100">
                    <div className="col-6">
                      <input
                        type="text"
                        id="first-name-input"
                        name="first_name"
                        className="form-control m-0 shadow-none px-0 rounded-0 w-100"
                        style={{
                          border: "0px solid black",
                          outline: "0px solid rgba(0,0,0,0)",
                          borderBottom: "0.5px solid #dfdfdf"
                        }}
                        placeholder="First Name"
                        onFocus={() => {
                          $("#first-name-input").css("border-color", "black")
                        }}
                        onBlur={() => {
                          $("#first-name-input").css("border-color", "#dfdfdf")
                        }}
                        onChange={inputChangeHandler}
                      />
                      {showError && data.first_name === "" ? (
                        <p
                          className="text-danger m-0 p-0"
                          style={{ fontSize: "0.9rem" }}
                        >
                          * Please enter your first name
                        </p>
                      ) : (
                        <p
                          className="text-danger m-0 p-0"
                          style={{ fontSize: "0.9rem", visibility: "hidden" }}
                        >
                          * Please enter your first name
                        </p>
                      )}
                    </div>
                    <div className="col-6">
                      <input
                        type="text"
                        id="last-name-input"
                        name="last_name"
                        className="form-control m-0 shadow-none px-0 rounded-0 w-100"
                        style={{
                          border: "0px solid black",
                          outline: "0px solid rgba(0,0,0,0)",
                          borderBottom: "0.5px solid #dfdfdf"
                        }}
                        placeholder="Last Name"
                        onFocus={() => {
                          $("#last-name-input").css("border-color", "black")
                        }}
                        onBlur={() => {
                          $("#last-name-input").css("border-color", "#dfdfdf")
                        }}
                        onChange={inputChangeHandler}
                      />
                      {showError && data.last_name === "" ? (
                        <p
                          className="text-danger m-0 p-0"
                          style={{ fontSize: "0.9rem" }}
                        >
                          * Please enter your last name
                        </p>
                      ) : (
                        <p
                          className="text-danger m-0 p-0"
                          style={{ fontSize: "0.9rem", visibility: "hidden" }}
                        >
                          * Please enter your last name
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="d-flex flex-row gap-1 w-100">
                    <select
                      name="phone_code"
                      id="phone_code"
                      className="w-50"
                      style={{
                        border: "0 solid black",
                        outline: "0px solid rgba(0,0,0,0)",
                        borderBottom: "0.5px solid #dfdfdf",
                        backgroundColor: "transparent"
                      }}
                      onChange={inputChangeHandler}
                    >
                      {phonecodeList.map((item, index) => (
                        <option key={index} value={item.dial_code}>
                          {item.flag} {item.dial_code} ({item.code})
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      id="mobile-input"
                      name="phone_no"
                      className="form-control m-0 shadow-none px-0 rounded-0 w-100"
                      style={{
                        border: "0px solid black",
                        outline: "0px solid rgba(0,0,0,0)",
                        borderBottom: "0.5px solid #dfdfdf"
                      }}
                      placeholder="Mobile Number"
                      onFocus={() => {
                        $("#mobile-input").css("border-color", "black")
                        console.log("focus")
                      }}
                      onBlur={() => {
                        $("#mobile-input").css("border-color", "#dfdfdf")
                        console.log("unfocus")
                      }}
                      onChange={inputChangeHandler}
                    />
                  </div>
                  {showError && data.phone_no === "" ? (
                    <p
                      className="text-danger m-0 p-0"
                      style={{ fontSize: "0.9rem" }}
                    >
                      * Please enter your phone number
                    </p>
                  ) : (
                    <p
                      className="text-danger m-0 p-0"
                      style={{ fontSize: "0.9rem", visibility: "hidden" }}
                    >
                      * Please enter your phone number
                    </p>
                  )}
                  <input
                    type="text"
                    id="email-input"
                    name="email"
                    className="form-control m-0 shadow-none px-0 rounded-0"
                    style={{
                      border: "0px solid black",
                      outline: "0px solid rgba(0,0,0,0)",
                      borderBottom: "0.5px solid #dfdfdf"
                    }}
                    placeholder="Email Address"
                    onFocus={() => {
                      $("#email-input").css("border-color", "black")
                      console.log("focus")
                    }}
                    onBlur={() => {
                      $("#email-input").css("border-color", "#dfdfdf")
                      console.log("unfocus")
                    }}
                    onChange={inputChangeHandler}
                  />
                  {showError && data.email === "" ? (
                    <p
                      className="text-danger m-0 p-0"
                      style={{ fontSize: "0.9rem" }}
                    >
                      * Please enter your email ID
                    </p>
                  ) : (
                    <p
                      className="text-danger m-0 p-0"
                      style={{ fontSize: "0.9rem", visibility: "hidden" }}
                    >
                      * Please enter your email ID
                    </p>
                  )}
                  <input
                    type="password"
                    id="password-input"
                    name="password"
                    className="form-control m-0 shadow-none px-0 rounded-0"
                    style={{
                      border: "0px solid black",
                      outline: "0px solid rgba(0,0,0,0)",
                      borderBottom: "0.5px solid #dfdfdf"
                    }}
                    placeholder="Password"
                    onFocus={() => {
                      $("#password-input").css("border-color", "black")
                      console.log("focus")
                    }}
                    onBlur={() => {
                      $("#password-input").css("border-color", "#dfdfdf")
                      console.log("unfocus")
                    }}
                    onChange={inputChangeHandler}
                  />
                  {showError && data.password === "" ? (
                    <p
                      className="text-danger m-0 p-0"
                      style={{ fontSize: "0.9rem" }}
                    >
                      * Please enter your password
                    </p>
                  ) : (
                    <p
                      className="text-danger m-0 p-0"
                      style={{ fontSize: "0.9rem", visibility: "hidden" }}
                    >
                      * Please enter your password
                    </p>
                  )}
                  <input
                    type="password"
                    id="confirm-password-input"
                    name="confirm_password"
                    className="form-control m-0 shadow-none px-0 rounded-0"
                    style={{
                      border: "0px solid black",
                      outline: "0px solid rgba(0,0,0,0)",
                      borderBottom: "0.5px solid #dfdfdf"
                    }}
                    placeholder="Confirm Password"
                    onFocus={() => {
                      $("#confirm-password-input").css("border-color", "black")
                      console.log("focus")
                    }}
                    onBlur={() => {
                      $("#confirm-password-input").css(
                        "border-color",
                        "#dfdfdf"
                      )
                      console.log("unfocus")
                    }}
                    onChange={inputChangeHandler}
                  />
                  {showError && data.confirm_password === "" ? (
                    <p
                      className="text-danger m-0 p-0 mb-1"
                      style={{ fontSize: "0.9rem" }}
                    >
                      * Please confirm your password
                    </p>
                  ) : (
                    <p
                      className="text-danger m-0 p-0 mb-1"
                      style={{ fontSize: "0.9rem", visibility: "hidden" }}
                    >
                      * Please confirm your password
                    </p>
                  )}
                  <div className="form-check form-check-sm form-check-dark">
                    <input
                      type="checkbox"
                      onClick={handleCheckBox}
                      className="form-check-input rounded-0 border-black"
                      style={{
                        backgroundSize: "75%",
                        width: "15px",
                        height: "15px",
                        marginTop: "8px"
                      }}
                      id="tos-check"
                      onChange={(e) => {
                        // eslint-disable-next-line multiline-ternary
                        e.target.checked
                          // eslint-disable-next-line multiline-ternary
                          ? $("#tos-check").css("background-color", "black")
                          : $("#tos-check").css("background-color", "white")
                      }}
                    />
                    <label
                      className="form-check-label text-black"
                      style={{ fontSize: "0.9rem" }}
                      htmlFor="tos-check"
                    >
                      This information will be securely saves as per{" "}
                      <b>XIRCLS Terms of Services & Privacy Policy</b>
                    </label>
                  </div>
                  {showError && checked === false ? (
                    <p
                      className="text-danger m-0 p-0 mb-1"
                      style={{ fontSize: "0.9rem" }}
                    >
                      * Field is Empty
                    </p>
                  ) : (
                    <p
                      className="text-danger m-0 p-0 mb-1"
                      style={{ fontSize: "0.9rem", visibility: "hidden" }}
                    >
                      * Field is Empty
                    </p>
                  )}
                  <button
                    onClick={submitButtonHandler}
                    className="btn px-3 py-1 text-white rounded-pill mb-2"
                    style={{ backgroundColor: "black" }}
                  >
                    Sign Up
                  </button>
                  {/* <p className="text-danger text-center w-100 m-0 p-0" style={{fontSize: '1rem'}}>This field must be unique.</p> */}
                  <p className="text-black" style={{ fontSize: '0.9rem' }}>Already a XIRCLS Member? <Link to='/new_login/' style={{ color: '#265491', fontWeight: 600 }}>Login here</Link></p>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default NewSignup
