import { useEffect, useState } from 'react'
import ComTable from '../../Components/DataTable/ComTable'
import { Eye, EyeOff } from 'react-feather'
import { Col, Input } from 'reactstrap'
import { getReq, postReq } from '../../../assets/auth/jwtService'
import toast from 'react-hot-toast'
import FrontBaseLoader from '../../Components/Loader/Loader'


const Security = () => {
  const [data, setdata] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [apiLoader, setApiLoader] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  console.log(togglePasswordVisibility)
  // const ConfirmPasswordVisibility = () => {
  //   setShowRePassword(!showRePassword)
  // }
  const handleFilter = e => {
    const value = e.target.value
    let updatedData = []
    setSearchValue(value)

    if (value.length) {
      updatedData = data.filter(item => {
        const startsWith =
          item.email_id.toLowerCase().startsWith(value.toLowerCase())

        const includes =
          item.email_id.toLowerCase().includes(value.toLowerCase())

        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })
      setFilteredData(updatedData)
      setSearchValue(value)
    }
  }

  const changePassword = () => {
    
    if (document.getElementById('confirm_password').value !== "" && document.getElementById('new_password').value !== "") {

      if (document.getElementById('confirm_password').value === document.getElementById('new_password').value) {
        setApiLoader(true)
        const form_data = new FormData()
        form_data.append('password', document.getElementById('new_password').value)
        form_data.append('confirm_password', document.getElementById('confirm_password').value)
        postReq('changePassword', form_data)
        .then(() => {
          toast.success('Password changed successfully')
          document.getElementById('new_password').value = ""
          document.getElementById('confirm_password').value = ""
          setApiLoader(false)
        })
        .catch((error) => {
          setApiLoader(false)
          toast.error('Something went wrong')
          console.log(error)
        })
      } else {
        toast.error("Password don't match")
      }

    } else {
      toast.error("Please enter a value")
    }
  }


  const columns = [
    {
      name: 'Sr. No.',
      cell: (row, index) => index + 1,
      width: '100px'
    },
    {
      name: 'Browser',
      selector: row => row.browser_name
    },  
    {
      name: 'Device',
      selector: row => row.os_name
    },
    {
      name: 'Action',
      selector: row => row.action
    },
    {
      name: 'Recent Activity',
      selector: row => row.login_time
    }
  ]

  const getLoggedData = () => {
    getReq('logDetails')
    .then((data) => {
      console.log(data)
      setdata(data?.data?.log_entries)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    getLoggedData()
  }, [])

  const verifyEmail = () => {
    setApiLoader(true)
    const formData = new FormData()
    formData.append('email', email)
    postReq('emailSend', formData)
    .then((response) => {
      setApiLoader(false)
      if (response.status === 200) {
        console.log('Successfully sent POST request') 
        setIsEmailSent(true)
        toast.success('Email submitted Successfully')
      } else {
        console.log('Failed to send POST request') 
      }
    })
    .catch((error) => {
      setApiLoader(false)
      console.log('Error:', error) 
    })
  }

  const verifyOtp = () => {
    setApiLoader(true)
    const formData = new FormData()
    formData.append('otp', otp)
    postReq('otpSend', formData)
    .then((res) => {
      console.log(res)
      setApiLoader(false)
    })
    .catch((err) => {
      console.log(err)
      toast.error("Invaild OTP")
      setApiLoader(false)
    })
  }

  const handleEmailVerification = () => {
    email === "" ? toast.error("Enter an email first") : verifyEmail()
  }

  const handleOtpVerification = () => {
    otp === "" ? toast.error("Enter an OTP") : verifyOtp()
  }


  const defferContent = <>
    <Col className='d-flex align-items-center justify-content-center' md='4' sm='12'>
      <h4 className='m-0'>Details</h4>
    </Col>
    <Col className='d-flex align-items-center justify-content-end' md='4' sm='12'>
      <Input
        className='dataTable-filter form-control ms-1'
        style={{ width: `180px`, height: `2.714rem` }}
        type='text'
        bsSize='sm'
        id='search-input-1'
        placeholder='Search...'
        value={searchValue}
        onChange={handleFilter}
      />
    </Col>
  </>

  return (
    <>
      {
        apiLoader ? <FrontBaseLoader /> : ''
      }
      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-body'>
              <div className="d-flex justify-content-start align-items-center py-1">
                <div style={{ fontSize: '1.125rem', fontWeight: '400' }}>Change Password</div>
              </div>
              {/* <div className="alert alert-warning h5 p-2 gap-1" role="alert">
                Ensure that these requirements are met<br />
                Minimum 8 characters long uppercase& symbol
              </div> */}
              <div className="row">
                <div className="col-12 mb-1">
                  <label htmlFor="new_password">New Password</label>
                  <input type="text" id='new_password' className='form-control' />
                </div>
                <div className="col-12 mb-1">
                  <label htmlFor="confirm_password">Confirm Password</label>
                  <input type="text" id='confirm_password' className='form-control' />
                </div>
              </div>
              <button type="submit" className='col-3 btn btn-primary' onClick={() => changePassword()}>
                Change Password
              </button>
            </div>
          </div>
          <div className='card'>
            <div className='card-body'>
              <div>
                <div className="v-card-item">
                  <div className="v-card-item__content">
                    <div className="v-card-title h5">Two-step verification</div>
                    <div className="v-card-subtitle">
                      <small className="text-base ">
                        Keep your account secure with authentication step.
                      </small>
                    </div>
                  </div>
                </div>
                <div className='my-2'>
                  <div className="col-12 ">
                    <label htmlFor="">Email</label>
                    <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    className="form-control mb-1" />
                  </div>
                  <button type="button" className="btn btn-primary" onClick={() => handleEmailVerification()}>
                    Verify Email
                  </button>
                  {isEmailSent && (
                    <div className="col-12 mt-1">
                      <label htmlFor="">OTP</label>
                      <input
                        type="text"
                        className="form-control mb-1"
                        id="otp"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                      <button type="button" className="btn btn-primary" onClick={() => handleOtpVerification()}>
                        Submit
                      </button>
                    </div>
                  )}
                  <div className='mt-1'>
                    <small className="text-base ">
                      Two-factor authentication adds an additional layer of security to your account by reqiuiring more than just a password to log in.
                      <div className='text-primary'>Learn more.</div>
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='card'>
            <div className='my-2'>
              <ComTable
                tableCol={columns}
                data={data}
                searchValue={searchValue}
                handleFilter={handleFilter}
                filteredData={filteredData}
                content={defferContent}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Security