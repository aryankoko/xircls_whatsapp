import axios from 'axios'
import { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import { Card, CardBody, Col, Row } from 'reactstrap'
import { SuperLeadzBaseURL } from '../../assets/auth/jwtService'
import { getCurrentOutlet } from '../Validator'
import { useLocation } from 'react-router-dom'
// import offers from "./data.json"

// import apiData from "@src/@core/auth/api/api.json"

const ReferralOffers = () => {
  //   const navigate = useNavigate()
  const outletData = getCurrentOutlet()
  const [errorMsg1, setErrorMsg1] = useState("")
  const [errorMsg2, setErrorMsg2] = useState("")

  const [offerFields, setOfferFields] = useState({
    referrer_value: 1,
    referrer_type: "PERCENTAGE",
    referrer_minimum: 1,
    referree_value: 1,
    referree_type: "PERCENTAGE",
    referree_minimum: 1,
    status: false
  })

  // const [status, setStatus] = useState('active')
  const offerLoc = useLocation()

  console.log({ offerLoc })

  const handleSubmit = () => {

    setErrorMsg1("")
    setErrorMsg2("")
    if (offerFields.referrer_minimum === 0 || offerFields.referrer_value === 0) {
      setErrorMsg1("Input values should be greater 1")
    } else if (offerFields.referree_minimum === 0 || offerFields.referree_value === 0) {
      setErrorMsg2("Input values should be greater 1")
    } else {
      const form_data = new FormData()

      Object.entries(offerFields).map(([key, value]) => {
        form_data.append(key, value)
      })
      // form_data.append('referrer_type', offerFields.referrer_type)
      // form_data.append('referrer_minimum', offerFields.referrer_minimum)

      // form_data.append('referree_value', offerFields.referree_value)
      // form_data.append('referree_type', offerFields.referree_type)
      // form_data.append('referree_minimum', offerFields.referree_minimum)

      // const statusActive = document.getElementById('statusactive').checked
      // form_data.append('status', statusActive)

      form_data.append('action', offerLoc.state ? "EDIT" : "CREATE")

      form_data.append("shop", outletData[0]?.web_url)
      
      if (offerLoc.state) {
        form_data.append("offer_id", offerLoc.state)        
      }

      const url = new URL(`${SuperLeadzBaseURL}/referral/referralpoints/`)

      axios({
        method: "POST",
        url,
        data: form_data
      }).then((data) => {
        console.log(data)
      }).catch((error) => {
        console.error(error)
      })

      //   fetch(apiData.api_link, {
      //     method: "POST",
      //     headers: {
      //       Authorization: apiData.auth_key,
      //       "Api-key": apiData.api_key
      //     },
      //     body: form_data
      //   })
      //     .then((resp) => {
      //       if (!resp.ok) {
      //         throw new Error('Network response was not ok')
      //       }
      //       return resp.json()
      //     })
      //     .then((data) => {
      //       console.log(data)
      //       navigate("/merchant/offers-log")
      //     })
      //     .catch((error) => {
      //       console.log(error)
      //     })
    }
  }

  useEffect(() => {
    if (offerLoc.state) {
      console.log("entered func")
      const url = new URL(`${SuperLeadzBaseURL}/referral/get_offers/?shop=${outletData[0]?.web_url}`)

      axios({
        method: "GET",
        url
      })
        .then((data) => {
          if (Array.isArray(data.data.data)) {
            console.log(data.data.data)
            const filtered = data.data.data.filter(item => item.id === offerLoc.state)
            console.log({filtered})
            const { referrer_value, referrer_type, referrer_minimum, referree_value, referree_type, referree_minimum, is_active } = filtered[0]
            setOfferFields({ referrer_value, referrer_type: referrer_type === "PE" ? "PERCENTAGE" : "VALUE", referrer_minimum, referree_value, referree_type: referree_type === "PE" ? "PERCENTAGE" : "VALUE", referree_minimum, status: is_active })
          } else {
            toast.error("There was an error fetching your data")
          }
        })
        .catch(err => console.log(err))
    }
  }, [])

  return (
    <>
      <Card>
        <CardBody>
          <h4 className=' fw-bolder'>Points {">"} {offerLoc.state ? "Edit" : "Create"}</h4>
        </CardBody>
      </Card>

      <Row>

        <Col md={6} className='p-0'>
          <Card style={{ overflow: 'hidden' }} className='mb-3 ms-2'>
            <CardBody>
              <div className='d-flex flex-column justify-items-center align-items-baseline'>
                <h3 className='ms-1'>Referrer Offer</h3>
                <p>{errorMsg1}</p>
              </div>
              <form className="d-flex flex-wrap row mx-1">
                <div className="col-lg-4 col-md-6 col-sm-12 mb-2">
                  <h5 >Value</h5>
                  <input type="number" className="form-control" min={1} value={offerFields.referrer_value} onChange={(e) => setOfferFields({ ...offerFields, referrer_value: e.target.value })} />
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 mb-2">
                  <h5>Offer Type</h5>
                  <div className="d-flex align-items-center">
                    <select value={offerFields.referrer_type} className="form-select m-0" onChange={(e) => setOfferFields({ ...offerFields, referrer_type: e.target.value })}>
                      <option value='PERCENTAGE'>Percentage</option>
                      <option value='VALUE'>Value</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 mb-2">
                  <h5 >Minimum</h5>
                  <input type="number" className="form-control" min={1} value={offerFields.referrer_minimum} onChange={(e) => setOfferFields({ ...offerFields, referrer_minimum: e.target.value })} />
                </div>
              </form>
            </CardBody>
          </Card>
        </Col>

        <Col md={6} className='p-0'>
          <Card style={{ overflow: 'hidden' }} className='mb-3 ms-2'>
            <CardBody>
              <div className='d-flex flex-column justify-items-center align-items-baseline'>
                <h3 className='ms-1'>Referree Offer</h3>
                <p>{errorMsg2}</p>
              </div>
              <form className="d-flex flex-wrap row mx-1">
                <div className="col-lg-4 col-md-6 col-sm-12 mb-2">
                  <h5 >Value</h5>
                  <input type="number" className="form-control" min={1} value={offerFields.referree_value} onChange={(e) => setOfferFields({ ...offerFields, referree_value: e.target.value })} />
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 mb-2">
                  <h5>Offer Type</h5>
                  <div className="d-flex align-items-center">
                    <select value={offerFields.referree_type} className="form-select m-0" onChange={(e) => setOfferFields({ ...offerFields, referree_type: e.target.value })}>
                      <option value='PERCENTAGE'>Percentage</option>
                      <option value='VALUE'>Value</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 mb-2">
                  <h5 >Minimum</h5>
                  <input type="number" className="form-control" min={1} value={offerFields.referree_minimum} onChange={(e) => setOfferFields({ ...offerFields, referree_minimum: e.target.value })} />
                </div>
              </form>
            </CardBody>
          </Card>

        </Col>
      </Row>

      <Card style={{ maxWidth: "300px" }}>
        <CardBody>
          <h3 className='mb-1'>Status</h3>
          <div className=' d-flex gap-2'>
            <div className="form-check pb-1">
              <input className="form-check-input" type="radio" name="status" id='statusActive' checked={offerFields.status} onChange={(e) => setOfferFields({ ...offerFields, status: e.target.checked })} />
              <label htmlFor='statusActive' className='form-check-label'>Active</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="status" id='statusInactive' checked={!offerFields.status} onChange={(e) => setOfferFields({ ...offerFields, status: !e.target.checked })} />
              <label htmlFor='statusInactive' className='form-check-label'>Inactive</label>
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="mb-2">
        <div className="d-flex justify-content-end">
          <button className='btn btn-primary' style={{ width: '200px' }} onClick={handleSubmit} >Save</button>
        </div>
      </div>
    </>
  )
}

export default ReferralOffers

// https://api.xircles.in/referral/referralpoints/