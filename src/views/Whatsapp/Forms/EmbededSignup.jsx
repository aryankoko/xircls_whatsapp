/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Card, CardBody, Col, Row } from 'reactstrap'
import { selectPhoneList } from '../../../Helper/data'
import Select from 'react-select'
import axios from 'axios'
import toast from 'react-hot-toast'
import { postReq } from '../../../assets/auth/jwtService'
import FrontBaseLoader from '../../Components/Loader/Loader'


export default function EmbededSignup() {
  const [useLoader, setLoader] = useState(false)

  const [Country, setCountry] = useState([])
  const [state, setState] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    code: '',
    phone: '',
    website: '',
    streetAddress1: '',
    city: '',
    state: '',
    zipPostal: '',
    country: '',
    displayName: '',
    category: '',
    description: ''
  })

  useEffect(() => {
    axios.post("https://api.demo.xircls.in/country-details/").then((resp) => {
      console.log(resp)
      setCountry(resp.data.data.countries.map((curElem) => {
        return { value: curElem.id, label: `${curElem.name}` }
      }))
    })
  }, [])

  useEffect(() => {
    console.log(formData.country)
    const form_data = new FormData()
    form_data.append('country_id', formData.country.value)
    axios.post("https://api.demo.xircls.in/state-details/", form_data)
      .then((resp) => {
        console.log(resp)
        setState(resp.data.data.states.map((curElem) => {
          return { value: curElem.id, label: `${curElem.name}` }
        }))
      })
      .catch((error) => {
        console.log(error)
      })
  }, [formData.country])


  const updateformData = (key, value) => {
    setFormData(prevData => ({ ...prevData, [key]: value }))
  }

  const handleFormSubmit = () => {
    const newformData = new FormData()
    console.log("sddfasdasd")
    Object.entries(formData).map(([key, value]) => {
      if (key === 'country' || key === 'state') {
        console.log("sfsdfsdf")
        newformData.append(key, value.label)
      } else {
        newformData.append(key, value)
      }
    })
    
    // fetch('https://daf4-2402-e280-3d9c-20d-a5e9-6dbd-1388-ddc3.ngrok-free.app/fbSignUp/', {
    //   method: 'POST',
    //   body: newformData
    // })
    setLoader(true)
    postReq("embeddedSignup", newformData)
      .then((res) => {
        if (res.status === 200) {
          window.location.replace(res.data.embeddedSignupURL)
          
        } else {
          toast.alert("Something went wrong!")
        }
        console.log(res)
      })
      .catch((err) => {
          console.log(err)
      })
      .finally(() => {
        setLoader(false)
      })

    console.log(newformData)
  }
  
  return (
    <div>
      {
        useLoader && <FrontBaseLoader/>
      }
      <style>{`
      .css-13cymwt-control, .css-1hb7zxy-IndicatorsContainer, .css-t3ipsp-control, .css-3iigni-container, .css-16xfy0z-control, .social_input, .input-group-text{
        height: 33.44px;
        min-height: 33.44px;
      }
      .css-1jqq78o-placeholder {
        font-size: small
      }
      .css-1nmdiq5-menu {
        margin-top: 4px !important
      }
      .css-16xfy0z-control {
        border-color: rgb(216, 214, 222)
      }
      `}</style>
      <Card>
        <CardBody>
          <h4 className="m-0">Embeded Signup</h4>
        </CardBody>
      </Card>

      <Card className='mb-5'>
        <CardBody className='mb-5'>
          <form>
            <Row>
              <Col md="4">
                <div className="mb-1">
                  <label htmlFor="name" className="form-label">
                    Business Name
                  </label>
                  <input onChange={(e) => updateformData('name', e.target.value)} type="text" className="form-control" id="name" placeholder="Enter business name" />
                </div>
              </Col>
              <Col md="4">
                <div className="mb-1">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input onChange={(e) => updateformData('email', e.target.value)} type="email" className="form-control" id="email" placeholder="Enter email" />
                </div>
              </Col>
              <Col md="4">
                <div className="mb-1">

                  <label htmlFor="phone" className="form-label  ">
                    Phone Number
                  </label>
                  <Row>
                    <Col md="4">
                      <Select
                        options={selectPhoneList}
                        closeMenuOnSelect={true}
                        name="phone_code"
                        id="phone_code"
                        onChange={(e) => updateformData('code', e.value)}
                      />
                    </Col>
                    <Col md="8">

                      <input type="tel" onChange={(e) => updateformData('phone', e.target.value)} className="form-control" id="phone_number" placeholder="Enter phone number" />
                    </Col>
                  </Row>
                </div>
              </Col>


              <Col md="4">
                <div className="mb-1">
                  <label htmlFor="website" className="form-label">
                    Website
                  </label>
                  <input type="url" onChange={(e) => updateformData('website', e.target.value)} className="form-control" id="website" placeholder="Enter website URL" />
                </div>
              </Col>
              <Col md="4">
                <div className="mb-1">
                  <label htmlFor="streetAddress1" className="form-label">
                    Street Address
                  </label>
                  <input type="text" onChange={(e) => updateformData('streetAddress1', e.target.value)} className="form-control" id="streetAddress1" placeholder="Enter street address" />
                </div>
              </Col>
              <Col md="4">
                <div className="mb-1">
                  <label htmlFor="city" className="form-label">
                    City
                  </label>
                  <input type="text" onChange={(e) => updateformData('city', e.target.value)} className="form-control" id="city" placeholder="Enter city" />
                </div>
              </Col>
              <Col md="4">
                <div className="mb-1">
                  <label htmlFor="country" className="form-label">
                    Country
                  </label>
                  <Select
                    options={Country}
                    closeMenuOnSelect={true}
                    name="country"
                    id="country"
                    onChange={(e) => updateformData('country', e)}
                    placeholder="Enter country"

                  />
                </div>
              </Col>
              <Col md="4">
                <div className="mb-1">
                  <label htmlFor="state" className="form-label">
                    State
                  </label>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    // isSearchable={isSearchable}
                    name="state"
                    options={state}
                    placeholder="Enter state"
                    onChange={(e) => updateformData('state', e)}
                  />
                </div>
              </Col>
              <Col md="4">
                <div className="mb-1">
                  <label htmlFor="zipPostal" className="form-label">
                    ZIP/Postal Code
                  </label>
                  <input type="text" onChange={(e) => updateformData('zipPostal', e.target.value)} className="form-control" id="zipPostal" placeholder="Enter ZIP/Postal code" />
                </div>
              </Col>


              <Col md="4">
                <div className="mb-1">
                  <label htmlFor="displayName" className="form-label">
                    Display Name
                  </label>
                  <input type="text" onChange={(e) => updateformData('displayName', e.target.value)} className="form-control" id="displayName" placeholder="Enter display name" />
                </div>
              </Col>
              <Col md="4">
                <div className="mb-1">
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <input type="text" onChange={(e) => updateformData('category', e.target.value)} className="form-control" id="category" placeholder="Enter category" />
                </div>
              </Col>
              <Col md="4">
                <div className="mb-1">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input type="text" onChange={(e) => updateformData('description', e.target.value)} className="form-control" id="description" rows="3" placeholder="Enter description"></input>
                </div>
              </Col>
            </Row>
          </form>

          <div className='text-end mt-3' >
            <div className="btn btn-primary" onClick={handleFormSubmit}>Submit</div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
