import React, { useEffect, useState, useContext } from "react"
import { Row, Col, Card, CardBody } from "reactstrap"
import "./assets/checkout/checkout.css"
import { SuperLeadzBaseURL, getReq, postReq } from "../../assets/auth/jwtService"
import { CheckCircle, Circle, PlusCircle } from "react-feather"
// import axios from "axios"
import { PermissionProvider } from "../../Helper/Context"
import { xircls_url } from "../Validator"
import Spinner from "../Components/DataTable/Spinner"
import Select from 'react-select'
import useRazorpay from "react-razorpay"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const Plan_pricing = () => {
  const { userPermission } = useContext(PermissionProvider)
  const [Razorpay, isLoaded] = useRazorpay()
  const [planData, setPlanData] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [userData, setUserData] = useState(userPermission?.multipleDomain.filter((cur) => cur.api_key === userPermission?.apiKey))
  const [data, setData] = useState({
    duration: "QA",
    durationList: [
      {value: "QA", label: "Quarterly"},
      {value: "HF", label: "Half Yearly"},
      {value: "YR", label: "Yearly"}

    ]
  })

  const navigate = useNavigate()
  // const [planDuration, setPlanDuration] = useState("Quarterly")

  const callPlans = (id) => {
    // const url = new URL(`${baseURL}/subscriptions/api/v1/add_free_plan/`)
    // const shop = 
    console.log(setUserData)
    // console.log(shop, "ppp")
    const form = {
      app: userPermission?.appName,
      shop: userData[0]?.web_url,
      billing_plan_id: id
    }
    const formData = new FormData()
    Object.entries(form).map(([key, value]) => {
      formData.append(key, value)
    })
    // axios({
    //   method: "POST",
    //   data: formData,
    //   url
    // })
    postReq('addFreePlan', formData)
      .then((data) => {
        console.log(data)
        // if (data?.data?.response) {
        //   window.location.href = data.data.response.recurring_application_charge.confirmation_url
        // }
        toast.success('Plan purchased')
        navigate('/merchant/campaign/')
      })
      .catch((error) => console.log(error))
  }

  const handleChange = (options, actionMeta, check) => {
    if (check) { 
        const option_list = options.map((cur) => {
            return cur.value
        })
        setData({...data, [actionMeta.name]: option_list })
    } else {
        setData({...data, [actionMeta.name]: options.value })
    }

  }

  const getBilling = () => {
    if (userData[0]?.platforms === "shopify") {
      // fetch(`${SuperLeadzBaseURL})
      getReq('freePlan', `?app=${userPermission?.appName}&platform=${userData[0]?.platforms}`)
      .then((data) => {
        console.log(data)
        setPlanData(data?.data?.success)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
    } else {
      setLoading(true)
      getReq('getAllPlans', `?plan_period=${data.duration}&platform=${userData[0]?.platforms}&app=${userPermission?.appName}`)
      .then((data) => {
        console.log(data, "data")
        setPlanData(data?.data?.billing_card)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
    }
    

  }

  console.log(userData[0]?.platforms, "userData")

  useEffect(() => {
    getBilling()
  }, [])

  useEffect(() => {
    getBilling()
  }, [data.duration])

  // const handlePayment = useCallback(() => {
  //   // const order = await createOrder(params)

    
  // }, [Razorpay])

  console.log(isLoaded)

  //  useEffect(() => {
  //   if (isLoaded) {
  //     handlePayment()
  //   }
  // }, [isLoaded, handlePayment])

  const createPayment = (id) => {
    const form_data = new FormData()
    form_data.append('bill_id', id)
    postReq('createPayment', form_data)
    .then((resp) => {
      console.log(resp)
      const options: RazorpayOptions = {
        key: resp.data.razorpay_merchant_key,
        amount: resp.data.razorpay_amount,
        currency: resp.data.currency,
        order_id: resp.datarazorpay_order_id,
        handler: (res) => {
          console.log(res)
        },
        prefill: {
          name: "Test",
          email: "uday212727@gamil.com",
          contact: "9398930461"
        },
        notes: {
          address: "Address"
        },
        theme: {
          color: "#3399cc"
        }
      }
  
      const rzpay = new Razorpay(options)
      rzpay.open()
    })
    .catch((error) => {
      toast.error("Something went wrong")
      console.log(error)
    })
  }

  return (
    <div>
      <Row>
        <div className="parent d-flex justify-content-between align-items-center">
          <h4 className="mb-3">Choose a plan that works well for your business</h4>
          <div className="selection">
            {
              userData[0]?.platforms === "shopify" ? '' : <>
                <Select
                  isMulti = {false}
                  options={data.durationList}
                  inputId="aria-example-input"
                  closeMenuOnSelect={true}
                  name="duration"
                  placeholder="Ratio"
                  value={data.durationList.filter(option => data.duration === option.value)}
                  onChange={(value, actionMeta) => handleChange(value, actionMeta, false)}
                />
              </>
            }
            
          </div>
        </div>
        <Col className="col-lg-10 offset-lg-1">
          <Row>
            {
              isLoading ? <div className="d-flex justify-content-center align-items-center"><Spinner size={'45px'} /></div> : planData?.map((cur) => {
                return cur.membership_plan_name === 'Infiniti FREE PLAN' && userData[0]?.platforms === "shopify" ? <>
                  <Col lg={4}>
                    <Card className="border" style={{boxShadow: '5px 5px 15px rgba(0,0,0,0.25)', borderRadius: '10px'}}>
                      <CardBody>
                        <div className="d-flex justify-content-between">
                          <div className="plan-info">
                            <h2>Lite</h2>
                            <span>for small-scale businesses</span>
                          </div>
                          <div className="plan-type">
                            <h2>Free</h2>
                          </div>
                        </div>
                        <div className="d-flex justify-content-center align-items-center">
                          <img class="p-0" src={`${xircls_url}/images/website-slide/plan_purchase/assets/grow.png`} style={{height: "15rem", width: "15rem"}} alt="" />
                        </div>
                        <ul className="p-0 m-0" style={{listStyle: "none"}}>
                          <li className="d-flex gap-1 mb-1 align-items-center">
                            <span className="icon d-flex justify-content-center align-items-center" style={{width: "20px", aspectRatio: "1"}}><CheckCircle size={15} /></span>
                            <div className="feature">Upto <b>8 partners</b></div>
                          </li>
                          <li className="d-flex gap-1 mb-1 align-items-center">
                            <span className="icon d-flex justify-content-center align-items-center" style={{width: "20px", aspectRatio: "1"}}><CheckCircle size={15} /></span>
                            <div className="feature">{userPermission?.currencySymbol}0.33 per reach & {userPermission?.currencySymbol}2 per click</div>
                          </li>
                          <li className="d-flex gap-1 mb-1 align-items-center">
                            <span className="icon d-flex justify-content-center align-items-center" style={{width: "20px", aspectRatio: "1"}}><CheckCircle size={15} /></span>
                            <div className="feature">Upto 5,000 transaction limit</div>
                          </li>
                          <li className="d-flex gap-1 mb-1 align-items-center">
                            <span className="icon d-flex justify-content-center align-items-center" style={{width: "20px", aspectRatio: "1"}}><CheckCircle size={15} /></span>
                            <div className="feature">Get 2 Inner XIRCLS</div>
                          </li>
                          <li className="d-flex gap-1 mb-1 align-items-center">
                            <span className="icon d-flex justify-content-center align-items-center" style={{width: "20px", aspectRatio: "1"}}><CheckCircle size={15} /></span>
                            <div className="feature">Upto 1,000 on site lead generation</div>
                          </li>
                          <li className="d-flex gap-1 mb-1 align-items-center">
                            <span className="icon d-flex justify-content-center align-items-center" style={{width: "20px", aspectRatio: "1"}}><CheckCircle size={15} /></span>
                            <div className="feature">Thank you page rewards</div>
                          </li>
                          <li className="d-flex gap-1 mb-1 align-items-center">
                            <span className="icon d-flex justify-content-center align-items-center" style={{width: "20px", aspectRatio: "1"}}></span>
                            <div className="feature">Form builder</div>
                          </li>
                          <li className="d-flex gap-1 mb-1 align-items-center">
                            <span className="icon d-flex justify-content-center align-items-center" style={{width: "20px", aspectRatio: "1"}}></span>
                            <div className="feature">E-mail remarketing</div>
                          </li>
                          <li className="d-flex gap-1 mb-1 align-items-center">
                            <span className="icon d-flex justify-content-center align-items-center" style={{width: "20px", aspectRatio: "1"}}></span>
                            <div className="feature">Creative design assistance</div>
                          </li>
                          <li className="d-flex gap-1 mb-1 align-items-center">
                            <span className="icon d-flex justify-content-center align-items-center" style={{width: "20px", aspectRatio: "1"}}></span>
                            <div className="feature">Account and collaboration manager</div>
                          </li>
                        </ul>
                        <a className="btn bg-black w-100 text-white btn-block mt-2 cursor-pointer" style={{borderRadius: '10px'}} onClick={() => callPlans(cur.id, "free")}>Go Ahead</a>
                      </CardBody>
                    </Card>
                  </Col>
                </>  : <>
                  <Col lg={4}>
                    <Card className="border" style={{boxShadow: '5px 5px 15px rgba(0,0,0,0.25)', borderRadius: '10px'}}>
                      <CardBody>
                        <div className="d-flex justify-content-between">
                          <div className="plan-info">
                            <h2>{cur.membership_plan_name}</h2>
                            <span>for small-scale businesses</span>
                          </div>
                          <div className="plan-type">
                            <h2>{userPermission?.currencySymbol}{Number(cur.year_plan_price)}</h2>
                          </div>
                        </div>
                        <div className="d-flex justify-content-center align-items-center">
                          <img class="p-0" src={`${xircls_url}/images/website-slide/plan_purchase/assets/grow.png`} style={{height: "15rem", width: "15rem"}} alt="" />
                        </div>
                        <ul className="p-0 m-0" style={{listStyle: "none"}}>
                          <li className="d-flex gap-1 mb-1 align-items-center">
                            <span className="icon d-flex justify-content-center align-items-center" style={{width: "20px", aspectRatio: "1"}}><CheckCircle size={15} /></span>
                            <div className="feature">Upto <b>8 partners</b></div>
                          </li>
                          <li className="d-flex gap-1 mb-1 align-items-center">
                            <span className="icon d-flex justify-content-center align-items-center" style={{width: "20px", aspectRatio: "1"}}><CheckCircle size={15} /></span>
                            <div className="feature">{userPermission?.currencySymbol}0.33 per reach & {userPermission?.currencySymbol}2 per click</div>
                          </li>
                          <li className="d-flex gap-1 mb-1 align-items-center">
                            <span className="icon d-flex justify-content-center align-items-center" style={{width: "20px", aspectRatio: "1"}}><CheckCircle size={15} /></span>
                            <div className="feature">Upto 5,000 transaction limit</div>
                          </li>
                          <li className="d-flex gap-1 mb-1 align-items-center">
                            <span className="icon d-flex justify-content-center align-items-center" style={{width: "20px", aspectRatio: "1"}}><CheckCircle size={15} /></span>
                            <div className="feature">Get 2 Inner XIRCLS</div>
                          </li>
                          <li className="d-flex gap-1 mb-1 align-items-center">
                            <span className="icon d-flex justify-content-center align-items-center" style={{width: "20px", aspectRatio: "1"}}><CheckCircle size={15} /></span>
                            <div className="feature">Upto 1,000 on site lead generation</div>
                          </li>
                          <li className="d-flex gap-1 mb-1 align-items-center">
                            <span className="icon d-flex justify-content-center align-items-center" style={{width: "20px", aspectRatio: "1"}}><CheckCircle size={15} /></span>
                            <div className="feature">Thank you page rewards</div>
                          </li>
                          <li className="d-flex gap-1 mb-1 align-items-center">
                            <span className="icon d-flex justify-content-center align-items-center" style={{width: "20px", aspectRatio: "1"}}></span>
                            <div className="feature">Form builder</div>
                          </li>
                          <li className="d-flex gap-1 mb-1 align-items-center">
                            <span className="icon d-flex justify-content-center align-items-center" style={{width: "20px", aspectRatio: "1"}}></span>
                            <div className="feature">E-mail remarketing</div>
                          </li>
                          <li className="d-flex gap-1 mb-1 align-items-center">
                            <span className="icon d-flex justify-content-center align-items-center" style={{width: "20px", aspectRatio: "1"}}></span>
                            <div className="feature">Creative design assistance</div>
                          </li>
                          <li className="d-flex gap-1 mb-1 align-items-center">
                            <span className="icon d-flex justify-content-center align-items-center" style={{width: "20px", aspectRatio: "1"}}></span>
                            <div className="feature">Account and collaboration manager</div>
                          </li>
                        </ul>
                        <a className="btn bg-black w-100 text-white btn-block mt-2 cursor-pointer" style={{borderRadius: '10px'}} onClick={() => createPayment(cur.id)}>Buy Now</a>
                      </CardBody>
                    </Card>
                  </Col>
                </>
              })
            }
            {
              planData?.length === 0 ? <h5 className="text-center">Plan Not found</h5> : ""
            }
          </Row>
        </Col>

      </Row>
    </div>
  )
}

export default Plan_pricing
