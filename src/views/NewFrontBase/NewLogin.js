import React, { useState } from "react"
import { Container, Row, Col, Card, CardBody } from "reactstrap"
import backImage from "./assets/bg_images/pexels-marc-mueller-380769.jpg"
import $ from "jquery"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { postReq } from "../../assets/auth/jwtService"
import toast, { Toaster } from 'react-hot-toast'
import { setToken } from "../../assets/auth/auth"

const NewLogin = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const path = location.pathname
  const navElements = path.split("/")
  console.log(navElements[2])

  const [data, setData] = useState({
    email: "",
    password: ""
  })

  const [showError, setShowError] = useState(false)
  const [error, setError] = useState()

  const inputChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  console.log(data)

  const loginButtonHandler = () => {
    setError('')
    if (data.email === "" || data.password === "") {
      setShowError(true)
    } else {
      setShowError(false)
      const formData = new FormData()
      Object.entries(data).map(([key, value]) => formData.append(key, value))
      postReq("login", formData)
        .then((res) => {
          console.log(res.data)
          const tokenValue = JSON.stringify(res.data)
          setToken(tokenValue)
          if (res.status === 200 && tokenValue) {
            toast.success('Logned In Successfully')
            navigate("/new_signup/new_mode/")
          }
        })
        .catch((err) => {
          toast.error('Something went wrong!')
          navigate("/new_signup/new_mode/")
          console.log(err)
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
                  <h2 className="text-black" style={{ fontWeight: 800 }}>
                    Welcome to XIRCLS
                  </h2>
                  <p
                    className="text-black fw-bold mb-3"
                    style={{ fontSize: "0.95rem" }}
                  >
                    Get started, explore a world beyond Aggregators
                  </p>
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
                      * Field is Empty
                    </p>
                  ) : (
                    <p
                      className="text-danger m-0 p-0"
                      style={{ fontSize: "0.9rem", visibility: "hidden" }}
                    >
                      * Field is Empty
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
                      className="text-danger m-0 p-0 mb-3"
                      style={{ fontSize: "0.9rem" }}
                    >
                      * Field is Empty
                    </p>
                  ) : (
                    <p
                      className="text-danger m-0 p-0 mb-3"
                      style={{ fontSize: "0.9rem", visibility: "hidden" }}
                    >
                      * Field is Empty
                    </p>
                  )}

                  <button
                    onClick={loginButtonHandler}
                    className="btn px-3 py-1 text-white rounded-pill mb-2"
                    style={{ backgroundColor: "black" }}
                  >
                    Log In
                  </button>
                  <p className="text-danger text-center w-100" style={{fontSize: '1rem'}}>{error}</p>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default NewLogin
