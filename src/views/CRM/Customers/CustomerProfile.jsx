import { useEffect, useState } from "react"
import { Card, CardBody } from "reactstrap"
import { useParams, useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"

// import customerData from './CustomerData'

import CustomersAddCustomer from "./CustomerProfileBasic/CustomersAddCustomer.jsx"
import PersonalInfo from './CustomerProfileBasic/CustomerBasicPersonal.js'
import CustomerBasicIdProof from "./CustomerProfileBasic/CustomerBasicIdProof.js"
import CustomerBasicAddress from "./CustomerProfileBasic/CustomerBasicAddress.js"
import CustomerBasicCompanyInfo from "./CustomerProfileBasic/CustomerBasicCompanyInfo.js"
import CustomerBasicAccount from "./CustomerProfileBasic/CustomerBasicAccount.js"
import CustomerBasicNav from "./CustomerProfileBasic/CustomerBasicNav.js"
import { validForm, validateEmail } from "../../Validator/index.js"
import { postReq } from "../../../assets/auth/jwtService.js"


/* eslint-disable */
export default function CustomerProfile() {
  const [formData, setFormData] = useState({
    dropdown:'regular',
    associate_clients: []
  })
  const [filteredData, setFilteredData] = useState([{ formId: 1 }])
  const [errors, setErrors] = useState({})
  const [currentStep, setCurrentStep] = useState(1)
  const navigate = useNavigate()

  const { id } = useParams()

  const fetchCustomerData = (id) => {
    // const url = new URL(`${crmURL}/customers/merchant/get_view_customer/`)
    const form_data = new FormData()
    form_data.append('id', id)
    form_data.append('edit_type', 'is_customer_detail')
    postReq('get_view_customer', form_data)
      .then((resp) => {
        console.log("Response:", resp.data.success[0])
        const newObject = {};
        for (const key in resp.data.success[0]) {
          if (resp.data.success[0].hasOwnProperty(key) && resp.data.success[0][key] !== null) {
            newObject[key] = resp.data.success[0][key];
          }
        }
        // console.log('AfterRemovingNull', newObject);
        setFormData(newObject)
        const name = newObject?.customer_name?.split(' ')
        const datePart = newObject?.cust_dob?.substring(0, 10)
        setFilteredData(resp.data.success[0]?.associated_accounts)
        setFormData(prefData => ({
          ...prefData,
          cust_first_name: name[0],
          cust_last_name: name[1],
          cust_dob: datePart ? datePart : ""
        }))
      })
      .catch((error) => {
        console.error("Error:", error)
        if (error.message === 'Customer already exists') {
          toast.error('Customer already exists')
        } else {
          toast.error('Failed to save customer')
        }
      })
  }

  useEffect(() => {
    if (id) {
      fetchCustomerData(id)
    }
  }, [])

  // default addressType is for React-Select onChange
  const handleInputChange = (e, addressType, count) => {
    // console.log(e)
    if (addressType === undefined) {
      let { name, value, type, checked } = e.target
      if (name.includes('.')) {
        const [parent, child] = name.split('.')
        setFormData(prevFormData => ({
          ...prevFormData,
          [parent]: {
            ...prevFormData[parent],
            [child]: value
          }
        }))
      } else {
        if (type === "tel") {
          value = value.replace(/[^0-9]/g, "")
        }
        setFormData(prevFormData => ({
          ...prevFormData,
          [name]: type === 'checkbox' ? checked : value
        }))
        if (name === 'billingShippingAddressSame') {
          setFormData((prevData) => ({
            ...prevData,
            shipping_address1: checked ? prevData?.address_line1 : '',
            shipping_address2: checked ? prevData?.address_line2 : '',
            shipping_area_building: checked ? prevData?.area_building : '',
            shipping_landmark: checked ? prevData?.landmark : '',
            shipping_city: checked ? prevData?.city : '',
            shipping_state: checked ? prevData?.state : '',
            shipping_pincode: checked ? prevData?.pincode : '',
            shipping_country: checked ? prevData?.country : ''
          }))
        }
      }
    } else if (addressType === 'company') {
      setFormData(prevFormData => ({
        ...prevFormData,
        [`associate_clients_${count}`]: e.id
      }))
    } else if (addressType === 'file') {
      setFormData(prevFormData => ({
        ...prevFormData,
        view_logo_url: URL.createObjectURL(e.target.files[0]),
        [e.target.name]: (e.target.files[0])
      }))

      //   else if (AddressType === 'file') {
      //     setUserData(prevFormData => ({
      //         ...prevFormData,
      //         [e.target.name]: (e.target.files[0])
      //     }))
      // }

    } else if (addressType) {
      setFormData(prevFormData => ({
        ...prevFormData,
        [addressType]: e.value
      }))
    }
  }

  // console.log(formData)

  // {"is_edit_url": "/customer/merchant/is_edit/", "cust_id": 57103}   SAVE

  const postData = (btn) => {
    // console.log(formData)
    // const url = new URL(`${crmURL}/customers/merchant/add_customer/`)
    const form_data = new FormData()
    Object.entries(formData).map(([key, value]) => {
      if (value !== "") {
        form_data.append(key, value)
      }
    })
    // formData?.aadhar_pdf_file instanceof Object && console.log('object')
    formData?.aadhar_pdf_file instanceof Object && form_data.append("is_aadhar_file", '1')
    formData?.pan_pdf_file instanceof Object && form_data.append("is_pan_file", '1')
    formData?.user_profile_img instanceof Object && form_data.append("is_user_profile", '1')
    form_data.append("pin", 'INsdfsdfsDV')
    form_data.append("entry_point", 'INDV')
    form_data.append("press_btn", btn)
    if (id) {
      form_data.append("customer_id", id)
      form_data.append("is_edit", "1")
    }

    form_data.append("associate_clients_count", filteredData.length)


    filteredData?.map((curElem, i) => {
      form_data.append(`associate_clients_${i}`, curElem?.id) 
    })
    
    for (var key of form_data.entries()) {
      console.log(key[0] + ', ' + key[1]);
    }

    postReq('add_customer_individual', form_data)
      // fetch(url, {
      //   method: "POST",
      //   body: form_data,
      //   headers: {
      //     "Api-key": "wDgmH6BS0B5s/tcOmfAqtWeBmI1t8qbiAnr5KN/oLis="
      //   }
      // })
      .then((resp) => {
        if (resp.status === 409) {
          throw new Error('Customer already exists')
        }
        console.log("Response:", resp)
        toast.success('Customer saved successfully')
        if (resp.data.is_edit_url) {
          navigate(`/merchant/customers/edit_customer/${resp.data.cust_id}?type=edit`)
        } else {
          navigate(`/merchant/customers`)
        }
      })
      .catch((error) => {
        console.error("Error:", error)
        toast.error('Failed to save customer')
      })
  }

  const valueToCheck = [
    {
      name: 'title',
      message: 'Please enter your Title',
      type: 'string',
      id: 'title'
    },
    {
      name: 'cust_first_name',
      message: 'Please enter your first name',
      type: 'string',
      id: 'cust_first_name'
    },
    {
      name: 'cust_last_name',
      message: 'Please enter your last name',
      type: 'string',
      id: 'cust_last_name'
    },
    {
      name: 'email',
      message: 'Please enter your email ID',
      type: 'email',
      id: 'email'
    },
    {
      name: 'phone_no',
      message: 'Please enter your phone number',
      type: 'number',
      id: 'phone_no'
    },
    {
      name: 'dropdown',
      message: 'Please select a Customer Type',
      type: 'string',
      id: 'basicDetails-customerType'
    }
  ]

  const handleSubmitSection = (event, btn) => {
    event.preventDefault()
    if (currentStep === 1) {
      checkForm = validForm(valueToCheck, formData)
    } else if (currentStep === 5) {
      checkForm = validForm([...valueToCheck], formData)
    }
    if (checkForm) {
      // const emailCheck = validateEmail(formData.email)
      // if (!emailCheck) {
        // document.getElementById('email_val').innerHTML = 'Invaild email ID'
        // toast.error("Invaild email ID")
      // } else {
      postData(btn)
      // }
    }
  }

  let checkForm = true
  const handleNext = async () => {
    checkForm = validForm(valueToCheck, formData)
    if (checkForm) {
      // const emailCheck = validateEmail(formData.email)
      // if (!emailCheck) {
        // document.getElementById('email_val').innerHTML = 'Invaild email ID'
        // toast.error("Invaild email ID")
      // } else {
        setCurrentStep(prevStep => prevStep + 1)
      // }
    }
  }

  const handleEmailBlur = () => {
    const emailCheck = validateEmail(formData.email)
    if (!emailCheck) {
      // document.getElementById('email_val').innerHTML = 'Invaild email ID'
      toast.error("Invaild email ID")
    }
  }

  const handleBack = () => {
    setCurrentStep((prevStep) => prevStep - 1)
  }

  const NavCurrentStep = (step) => {
    checkForm = validForm(valueToCheck, formData)
    if (checkForm) {
      // const emailCheck = validateEmail(formData.email)
      // if (!emailCheck) {
        // document.getElementById('email_val').innerHTML = 'Invaild email ID'
        // toast.error("Invaild email ID")
      // } else {
        setCurrentStep(step)
      // }
    }
  }

  const allData = {
    formData,
    currentStep,
    errors,
    id,
    handleEmailBlur,
    handleInputChange,
    handleNext,
    handleBack,
    setFormData
  }

  return (
    <>
      <div className="customer-profile">
        <Card>
          <CardBody>
            <h3 className="mb-0">{id ? 'Edit Customer' : 'Add Customer'}</h3>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <CustomerBasicNav currentStep={currentStep} NavCurrentStep={NavCurrentStep} />
            <form>
              {currentStep === 1 && (
                <CustomersAddCustomer allData={allData} />
              )}
              {currentStep === 2 && (
                <PersonalInfo allData={allData} />
              )}
              {currentStep === 3 && (
                <CustomerBasicIdProof allData={allData} />
              )}
              {currentStep === 4 && (
                <CustomerBasicAddress allData={allData} />
              )}
              {currentStep === 5 && (
                <CustomerBasicCompanyInfo filteredData={filteredData} setFilteredData={setFilteredData} allData={allData} />
              )}
              {currentStep === 6 && (
                <CustomerBasicAccount allData={allData} />
              )}
              <div className="w-100 d-flex justify-content-between mt-2">
                <div>
                  {!(currentStep === 1) && <button
                    className="btn btn-primary me-2"
                    type="button"
                    onClick={handleBack}
                  >
                    Back
                  </button>}
                  <button className="btn btn-primary " type="button">
                    Cancel
                  </button>
                </div>
                <div>
                  {(currentStep < 5) ? <button
                    className="btn btn-primary ms-2"
                    type="button"
                    onClick={handleNext}
                  >
                    Next
                  </button> : (
                    <>
                      <button className="btn btn-primary ms-2" type="button" onClick={e => handleSubmitSection(e, 'SAVE & CLOSE')}>Save & Close</button>
                      <button className="btn btn-primary ms-2" type="button" onClick={e => handleSubmitSection(e, 'SAVE')}>Save</button>
                    </>
                  )}
                </div>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </>
  )
}
