import React, { useState } from 'react'
import { Container, Row, Col } from "reactstrap"
import { baseURL } from '../../../assets/auth/jwtService'
import toast from 'react-hot-toast'
// import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import FrontBaseLoader from '../../Components/Loader/Loader'

const SupportAdmin = () => {

  const [data, setData] = useState({})
  // const navigate = useNavigate()
  const [apiLoader, setApiLoader] = useState(false)

  const updateData = (e) => {
    setData({...data, [e.target.name]: e.target.value})
  }

  const proceed = () => {
    setApiLoader(true)
    const form_data = new FormData()
    Object.entries(data).map(([key, value]) => {
      form_data.append(key, value)
    })

    fetch(`${baseURL}/support-system/login/`, {
      method: 'POST',
      body: form_data
    })
    .then((data) => data.json())
    .then((resp) => {
      console.log(resp)
      if (resp.status !== 400 && resp.isSupportPerson) {
        Cookies.set('supportPerson', resp.isSupportPerson, { expires: 1, path: '/' })
        // navigate('/admin/home/')
      } else {
        toast.error("Invalid user")
        setApiLoader(false)
      }
    })
    .catch((error) => {
      setApiLoader(false)
      console.log(error)
    })

  }

  return (
    <div>
      {
        apiLoader ? <FrontBaseLoader /> : ''
      }
      <Row className="products " style={{height: '100vh'}}>
        <Col md={3} className='m-auto ' style={{width: '500px', maxWidth: '90%'}}>
            <div className="border shadow rounded">
                <div style={{backgroundColor:"#417690"}}>
                    <h3 id="check_login" className="p-2 font-weight-light" style={{color:"yellow", fontWeight:"100"}}>Support Login</h3>
                </div>
                <div className="p-2">
                    <label htmlFor="username">USERNAME:</label>
                    <input type="text" className="form-control" name="email"
                       onKeyDown={e => {
                        if (e.key === "Enter") {
                          const password = document.getElementById("password")
                          password.focus()
                        }
                      }}
                      onChange={(e) => updateData(e)} id="username"  />

                </div>
                <div className=" p-2">
                    <label htmlFor="password">PASSWORD:</label>
                    <input type="password" className="form-control" name="password"
                      onKeyDown={e => {
                        if (e.key === "Enter") {
                          proceed()
                        }
                      }}
                      onChange={(e) => updateData(e)} id="password"  />

                </div>
                <div className='d-flex align-items-center justify-content-center p-1'>
                    <button type="button" className="btn border" style={{backgroundColor:"#79AEC8", color:"white"}} onClick={() => proceed()} >LOGIN</button>
                    {/* <a href="" className="text-blue" >Forgotten Password?</a> */}
                </div>
            </div>
        </Col>
      </Row>

    </div>
  )
}

export default SupportAdmin