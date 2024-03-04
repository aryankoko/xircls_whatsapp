import React, { useContext, useEffect, useState } from "react"
import { BarChart2, RefreshCcw, Settings, User,  } from "react-feather"
import { SuperLeadzBaseURL } from "../../assets/auth/jwtService"
import { formatNumberWithCommas, getCurrentOutlet } from "../Validator"
import { PermissionProvider } from "../../Helper/Context"
import axios from "axios"
import toast from "react-hot-toast"


const Dashboard = () => {
  
  const [toggle, setToggle] = useState(false)
  const [data, setData] = useState({
    total_cust: "",
    total_revenue: 23482
  })

  // const [billing, setBilling] = useState({
  //   usage_count: 0,
  //   usage_charge: 0,
  //   mainLoadeder: true,
  //   daysLeft: 0,
  //   trial_days: 0,
  //   mainData: [],
  //   price: ""
  // })
  const params = new URLSearchParams(location.search)
  const outletData = getCurrentOutlet()

  // console.log(billing)

  // const campaignData = userPermission?.campaign ? userPermission?.campaign?.filter((cur) => {
  //   return userPermission?.appName === cur.app
  // }) : []

  const outletDetail = getCurrentOutlet()
  const { userPermission } = useContext(PermissionProvider)
  // console.log(setToggle)
  const getData = () => {
    axios.get(`${SuperLeadzBaseURL}/api/v1/change-app-status/?shop=${outletDetail[0]?.web_url}&app=${userPermission?.appName}`)
      .then((resp) => {
        console.log(resp)
        setToggle(resp?.data?.status)
        const updatedData = {
          data: ""
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

  const getDataMain = () => {
    axios.get(`${SuperLeadzBaseURL}/flash_accounts/flash_dash/?shop=${outletDetail[0]?.web_url}&app=${userPermission?.appName}`)
      .then((resp) => {
        console.log(resp)
        // setToggle(resp?.data?.status)
        const updatedData = {
          total_cust: resp?.data?.total_cust,
          total_non_guests: resp?.data?.total_non_guests,
          total_revenue: resp?.data?.total_revenue,
          conversion_rate: resp?.data?.conversion_rate
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

  const changeStatus = (e) => {
    const form_data = new FormData()

    form_data.append("shop", outletDetail[0]?.web_url)
    form_data.append("app", userPermission?.appName)
    form_data.append("value", e.target.checked ? "1" : "0")

    axios.post(`${SuperLeadzBaseURL}/api/v1/change-app-status/`, form_data)
      .then((resp) => {
        console.log(resp)
        toast.success(!e.target.checked ? "Plugin Activated " : "Plugin Deactivated ")
        setToggle(!e.target.checked)
      })
      .catch((error) => {
        console.log(error)
        setToggle(e.target.checked)
        toast.error("Something went wrong")
      })
  }


  const chargeApi = () => {
    const form_data = new FormData()
    form_data.append('charge_id', params.get('charge_id'))
    form_data.append('app', userPermission?.appName)
    form_data.append('shop', outletData[0]?.web_url)
    axios({
      method: "POST",
      data: form_data,
      url: `${SuperLeadzBaseURL}/api/v1/add/billing/`
    })
      .then((data) => {
        console.log(data)
        if (data?.data?.response === "billing created successfully") {
          navigate('/merchant/SuperLeadz/')
          planData()
          cancelApi()

        } else {
          planData()
        }
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    getData()
    getDataMain()
    if (params.get('charge_id')) {
      chargeApi()
    }
  }, [])

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body d-flex justify-content-between">
              <h4 className="m-0">Dashboard</h4>
              <div className="form-check-success form-switch cusor-pointer">
                <input className="form-check-input" type="checkbox" role="switch" id="form-switch" onClick={(e) => changeStatus(e)} checked={toggle} />
                <label className="form-check-label" htmlFor="form-switch" style={{ paddingLeft: '10px', whiteSpace: 'nowrap' }}>{toggle ? 'Deactivate Flash Accounts' : 'Activate Flash Accounts'}</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row match-height">
        <div className="col-4">
          <div className="card">
            <div className="card-body">
              <User size="27px" />
              <div className="d-flex mt-1 justify-content-between">
                <p className="me-5 h5 card-text">Total Flash Accounts Created</p>
                <h3>
                  {data.total_non_guests ? formatNumberWithCommas(data.total_non_guests) : 0}
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card">
            <div className="card-body ">
              <RefreshCcw size="27px" />
              <div className="d-flex mt-1 justify-content-between">
                <div>
                  <p className="me-5 mb-0 h5 card-text">Guest Conversion Rate</p>
                  <p className="font-small-3 text-secondary mt-0 me-5 h5 card-text"> (all guest checkouts vs. those who convert at Thank You page)</p>
       
                </div>
                <h3 className="d-flex ">
                  {data.conversion_rate ? `${Number(data.conversion_rate).toFixed(2)}%` : 0}
                  <span className="" style={{marginTop:"-10px"}} data-bs-toggle="tooltip" data-bs-placement="top" title="% of guest checkouts converted at Thank You page">
                  <Info size={15} />
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card">
            <div className="card-body">
              <RefreshCcw size="27px" />
              <div className="d-flex mt-1 justify-content-between">
                <p className="me-0 h5 card-text">Revenue Generated from<br />Flash Accounts Registered Customers</p>
                <h3>
                  {data.total_revenue ? formatNumberWithCommas(data.total_revenue) : 0}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
