import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import { baseURL } from '../../assets/auth/jwtService'
import { ownUrl } from '../Validator'

const TermsConditions = () => {

  const { id } = useParams()

  const [data, setData] = useState({
    image: "",
    termsAndCondition: "",
    is_web: ""
  })

  console.log(setData, data)

  const getData = () => {
    axios.get(`${baseURL}/api/v1/get-offer-details/?offer_id=${id}`)
    .then((data) => {
      console.log(data)
      const updatedData = {
        image: data?.data?.data?.outlet_detail[0]?.offer_image,
        termsAndCondition: data?.data?.data?.outlet_detail[0]?.T_and_C1,
        is_web: data?.data?.data?.outlet_detail[0]?.is_web
      }

      setData((preData) => ({
        ...preData,
        ...updatedData
      }))
    })
    .catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div style={{fontFamily: "Lato"}}>
      <div className='d-flex justify-content-center align-items-center' style={{ backgroundColor: "#eeeeee" }}>
        <img src={`${ownUrl}${data.image}`} style={{ width: "50%" }} alt="" />
      </div>
      <div style={{margin: "auto", width: "59.25%", padding: "80px 0px 40px"}}>
        <h4 style={{fontSize: "36px", lineHeight: "44px"}} className="fw-light mb-1">TERMS AND CONDITIONS</h4>
        <ol className="ps-2 tnc_list" style={{fontSize: "15px"}}>
          {

            data?.is_web === true || data?.is_web === "True" ? (
              <>
                <li>
                  <p className='m-0' style={{lineHeight: "25px"}}>To redeem this offer, login to the website/mobile app of the business with the same mobile number & email address on which this offer was received.</p>
                </li>
                <li>
                  <p className='m-0' style={{lineHeight: "25px"}}>This offer cannot be combined with any other offer on the website/mobile app.</p>
                </li>
                <li>
                  <p className='m-0' style={{lineHeight: "25px"}}>This offer can be applied only on a single purchase.</p>
                </li>
                <li>
                  <p className='m-0' style={{lineHeight: "25px"}}>Appointment/reservation is subject to availability.</p>
                </li>
              </>
            ) : (
              <>
                <li>
                  <p className='m-0' style={{lineHeight: "25px"}}>Visit or call the outlet to redeem this offer. Please provide the same mobile number & email address on which this offer was received.</p>
                </li>
                <li>
                  <p className='m-0' style={{lineHeight: "25px"}}>This offer cannot be combined with any other offer at this business.</p>
                </li>
                <li>
                  <p className='m-0' style={{lineHeight: "25px"}}>This offer can be applied only on a single purchase.</p>
                </li>
                <li>
                  <p className='m-0' style={{lineHeight: "25px"}}>Appointment/reservation is subject to availability.</p>
                </li>
              
              </>
            )
          }
        </ol>
      </div>
    </div>
  )
}

export default TermsConditions