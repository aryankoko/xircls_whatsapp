import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
import { Card, CardBody, Col, Row } from 'reactstrap'
import { getReq } from '../../assets/auth/jwtService'
import Spinner from '../Components/DataTable/Spinner'
import { xircls_url } from '../Validator'

const LoyaltySelectOffers = ({ id, addToSelected, selectOffer, offerId, change }) => {
  // const location = useLocation()
  // const { id } = useParams()
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  // const [selectedOffer, setSelectedOffer] = useState([])

  const getData = () => {
    if (!change) {
      getReq('LoyaltySelectOffers', `?id=${id}`)
      .then((resp) => {
        console.log(resp, "ppp")
        setData(resp?.data?.data?.outlet_detail)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
      })

    } else {
      getReq('saveOffersInfiniti', `?offer_id=${offerId}`)
      .then((resp) => {
        console.log(resp, "ppp")
        setData(resp?.data?.data?.outlet_detail)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
      })
    }
  }

  // const saveSelectedOffer = () => {
  //   const form_data = new FormData()
  //   form_data.append('offer_id', selectedOffer)
  //   postReq('custom', form_data)
  //   .then((resp) => {
  //     console.log(resp)
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //   })
  // }
  
  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      {/* <Row>
        <Col md='12'>
          <Card>
              <CardBody>
                  <h4>Select Offer for targeting</h4>
              </CardBody>
          </Card>
        </Col>
      </Row> */}
      <Row className='match-height' id={`show_offer_${id}`}>
          {
            !isLoading ? data.length > 0 ? data.map((curElem, i) => {
              return <>
                <Col className='offset-lg-1' lg="10 mb-2" key={i}>
                  <Card>
                    <CardBody>
                      <div className="form-check">
                        <input type='checkbox' id={`offer_${curElem?.id}`} defaultChecked={selectOffer?.includes(curElem.id) || selectOffer?.includes(String(curElem.id))} className='form-check-input cursor-pointer' style={{ position: 'absolute', float: 'right' }} onClick={(e) => addToSelected(e, curElem, id)} />
                        
                        <label htmlFor={`offer_${curElem?.id}`} style={{ cursor: 'pointer', width: '100%' }}>
                          <img style={{width: '100%', height: '280px'}} src={`${xircls_url}${curElem?.offer_image}`} alt="" />
                          {/* <img style={{width: '100%'}} src={`${xircls_url}${curElem.offer_image}`} alt="" /> */}

                          <div className='desc mt-2 p-1 border '>
                            <p>
                              {curElem?.short_description}
                            </p>
                          </div>
                        </label>
                      </div>
                      
                    </CardBody>
                  </Card>
                </Col>
              </>
            }) : <>
              <Col md="12" className='text-center'>
                <Card>
                  <CardBody>
                      <h4>Offer details not found!</h4>
                  </CardBody>
                </Card>

              </Col>
            </> : <div className='d-flex justify-content-center align-items-center my-3'>
              <Spinner size={'45px'} />
            </div>
          }
      </Row>
      {/* {
        data.length > 0 ? <Row className='mb-4'>
          <Col className='text-end'>
            <a className='btn btn-primary' onClick={() => saveSelectedOffer()}>Save These Offer</a>
          </Col>
        </Row> : ''
      } */}
      
    </>
  )
}

export default LoyaltySelectOffers