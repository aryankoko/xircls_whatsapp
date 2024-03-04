import React, { useState, useEffect } from 'react'
import { Card, CardBody } from "reactstrap"
import ApplicantForm from './ApplicantForm'
import AddFinanceNav from './AddFinanceNav'
import CoApplicantForm from './CoApplicantForm'
import EMIForm from './EMIForm'
import ReferralForm from './ReferralForm'
// import { baseURL } from '@src/assets/auth/jwtService.js'
import toast from "react-hot-toast"
// import financeData from './financeData'
import { useParams, useNavigate } from 'react-router-dom'
import { crmURL, getReq, postReq } from '../../../assets/auth/jwtService'
import { validForm } from '../../Validator'

const AddFinance = () => {

  const parmas = new URLSearchParams(location.search)
  const { id } = useParams()
  const isEdit = parmas.get("type") === "edit"
  const isCustomer = parmas.get("type") === "customer"
  // const [isLoading, setIsLoading] = useState(true)

  const mainFormvalueToCheck = [
    {
      name: 'xircls_customer_id',
      message: 'Select Customer Name',
      type: 'string',
      id: 'xircls_customer_id'
    },
    {
      name: 'client',
      message: 'Select Client Type',
      type: 'string',
      id: 'client'
    },
    {
      name: 'Bank_Name',
      message: 'Enter your bank name',
      type: 'string',
      id: 'Bank_Name'
    },
    {
      name: 'product_name_id',
      message: 'Select Product Name',
      type: 'string',
      id: 'product_name_id'
    },
    {
      name: 'Loan_Type',
      message: 'Select Loan Type',
      type: 'string',
      id: 'Loan_Type'
    }
  ]

  const EMIFormvalueToCheck = [
    {
      name: 'Emi_Amount',
      message: 'Enter EMI Amount',
      type: 'string',
      id: 'Emi_Amount'
    },
    {
      name: 'no_of_tenure',
      message: 'Enter Number of Tenure',
      type: 'string',
      id: 'no_of_tenure'
    },
    {
      name: 'no_of_installment',
      message: 'Enter Number of Installment',
      type: 'string',
      id: 'no_of_installment'
    }
  ]

  // const refferalFormvalueToCheck = [
  //   {
  //     name: 'Ref_title',
  //     message: 'Select Title',
  //     type: 'string',
  //     id: 'Ref_title'
  //   },
  //   {
  //     name: 'Ref_first_name',
  //     message: 'Enter First Name',
  //     type: 'string',
  //     id: 'Ref_first_name'
  //   },
  //   {
  //     name: 'Ref_last_name',
  //     message: 'Enter Last Name',
  //     type: 'string',
  //     id: 'Ref_last_name'
  //   },
  //   {
  //     name: 'Ref_phone_no',
  //     message: 'Enter Mobile Number',
  //     type: 'number',
  //     id: 'Ref_phone_no'
  //   }
  // ]


  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    SE_DSA_Name: "",
    xircls_customer_id: isCustomer ? id : "",
    customer_name: "",
    Bank_Name: "",
    client: '',
    product_name_id: "",
    Loan_Type: "",
    Rate_of_Interest: "",
    Loan_Number: "",
    Bank_Number: "",
    Loan_amount: "",
    Loan_Disbursement_Date: "",
    title: "",
    cust_first_name: "",
    cust_last_name: "",
    email: "",
    phone_no: "",
    cust_dob: "",
    phone_no2: "",
    address_line1: "",
    address_line2: "",
    area_building: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    pancard: "",
    Adharcard: "",
    gender: "",
    children: "", 
    NO_Of_Children: "", 
    marital_status: "",
    occupation: "",
    Emi_Amount: "",
    no_of_tenure: "",
    frequency: "",
    no_of_installment: "",
    Ex_Showroom_Amount: "",
    No_Advance_EMI: "",
    Dealer_Name: "",
    Account_Type: "",
    Emi_Start_Date: "",
    Emi_End_Date: "",
    Ref_title: "",
    Ref_first_name: "",
    Ref_last_name: "",
    Ref_phone_no: "",
    Ref_address1: "",
    Ref_address2: "",
    area_building_ref: "",
    landmark_ref: "",
    Ref_city: "",
    Ref_state: "",
    Ref_pincode: "",
    Ref_country: ''
  })
  // const [addWithCustId, setAddWithCustId] = useState(false)

  // console.log(formData, 'formData')
  const [country, setCountry] = useState([])

  const navigate = useNavigate()

  let PageTitle = 'Add Finance'

  // const formatDate = (inputDate) => {
  //   const parts = inputDate.split('-')
  //   if (parts.length === 3 && parts[0].length === 2 && parts[1].length === 2 && parts[2].length === 4) {
  //     const parsedDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`)
  //     const formattedDate = parsedDate.toISOString().split('T')[0]
  //     return formattedDate
  //   }
  //   return inputDate
  // }

  const handleChange = (options, actionMeta, check = false) => {
    if (check) {
      const option_list = options.map((cur) => {
        return cur.value
      })
      setFormData({ ...formData, [actionMeta.name]: option_list })
    } else {
      setFormData({ ...formData, [actionMeta.name]: options.value })
    }

  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    // if (type === undefined) {
    //   const { name, value } = e.target
    //   setFormData(prevData => ({
    //     ...prevData,
    //     [name]: value
    //   }))
    // } else if (type === "tel") {
    //   const { value } = e.target
    //   const { name } = e.target
    //   // value = value.replace(/[^0-9]/g, "")
    //   setFormData(prevFormData => ({
    //     ...prevFormData,
    //     [name]: value
    //   }))
    // } else if (type) {
    //   setFormData(prevFormData => ({
    //     ...prevFormData,
    //     [type]: e.value
    //   }))
    // }
  }

  // const fetchFinanceData = (id) => {
  //   const form_data = new FormData()
  //   form_data.append("id", id)
  //   form_data.append('edit_type', 'is_finance')

  //   postReq("get_view_customer", form_data, baseURL)
  //   .then((resp) => {
  //     // if (!addWithCustId) {
  //       const newObject = {}
  //       for (const key in resp.success[0]) {
  //         if (resp.success[0].hasOwnProperty(key) && resp.success[0][key] !== null) {
  //           newObject[key] = resp.success[0][key]
  //         }
  //       }
  //       setFormData(newObject)
  //       setFormData(prefData => ({
  //         ...prefData,
  //         Loan_Disbursement_Date: prefData?.Loan_Disbursement_Date ? formatDate(prefData?.Loan_Disbursement_Date.substring(0, 10)) : '',
  //         policy_expiry_date: prefData?.policy_expiry_date ? formatDate(prefData?.policy_expiry_date.substring(0, 10)) : ''
  //       }))
  //     // }
  //   })
  //   .catch((error) => {
  //     console.error("Error:", error)
  //     toast.error('Failed to fetch Servicing Detail')
  //   })
  // }

  const checkVaildation = () => {
    let checkForm = true
    if (currentStep === 1) {
      checkForm = validForm(mainFormvalueToCheck, formData)
    }

    // if (currentStep === 2) {
    //   checkForm = validForm(coApplicantvalueToCheck, formData)
    // }

    if (currentStep === 3) {
      checkForm = validForm(EMIFormvalueToCheck, formData)
    }

    // if (currentStep === 4) {
    //   checkForm = validForm(refferalFormvalueToCheck, formData)
    // }

    return checkForm
  }


  const postData = (btn) => {
    const check = checkVaildation()
    if (check) {
      const form_data = new FormData()
      Object.entries(formData).map(([key, value]) => {
        form_data.append(key, value)
      })
      form_data.append("press_btn", btn)
      if (isEdit) {
        form_data.append("finance_instance_id", id)
      }

      postReq("add_finance", form_data, crmURL)
        .then((resp) => {
          console.log("Response:", resp)
          toast.success('Finance saved successfully')
          resp.data?.is_edit_url ? navigate(`/merchant/customers/edit_finance/${resp.data?.finance_code}?type=edit`) : navigate(-1)
          // fetchFinanceData(resp.finance_code)
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
  }

  const getData = () => {
    const form_data = new FormData()
    if (parmas.get("type") === "edit") {
      form_data.append("id", id)
      form_data.append("edit_type", "is_finance")
    }
    postReq("get_customer_finance", form_data, crmURL)
      .then((resp) => {
        console.log(resp)
        const data = resp?.data?.success[0]
        console.log(data, "fdata")
        const updateData = {
          SE_DSA_Name: data?.SE_DSA_Name,
          xircls_customer_id: data?.xircls_customer,
          customer_name: data?.customer_name,
          Bank_Name: data?.Bank_Name,
          client: data?.client,
          product_name_id: data?.product_name_id,
          Loan_Type: data?.Loan_Type,
          Rate_of_Interest: data?.Rate_of_Interest,
          Loan_Number: data?.Loan_Number,
          Bank_Number: data?.Bank_Number,
          Loan_amount: data?.Loan_amount,
          Loan_Disbursement_Date: data?.Loan_Disbursement_Date || "",
          title: data?.title,
          cust_first_name: data?.cust_first_name,
          cust_last_name: data?.cust_last_name,
          email: data?.email,
          phone_no: data?.phone_no,
          cust_dob: data?.cust_dob || "",
          phone_no2: data?.phone_no2,
          address_line1: data?.address_line1,
          address_line2: data?.address_line2,
          area_building: data?.area_building,
          landmark: data?.landmark,
          city: data?.city,
          state: data?.state,
          pincode: data?.pincode,
          country: data?.country,
          pancard: data?.pancard,
          Adharcard: data?.Adharcard,
          gender: data?.gender,
          children: data?.children,
          NO_Of_Children: data?.NO_Of_Children,
          marital_status: data?.marital_status,
          occupation: data?.occupation,
          Emi_Amount: data?.Emi_Amount,
          no_of_tenure: data?.no_of_tenure,
          frequency: data?.frequency,
          no_of_installment: data?.no_of_installment,
          Ex_Showroom_Amount: data?.Ex_Showroom_Amount,
          No_Advance_EMI: data?.No_Advance_EMI,
          Dealer_Name: data?.Dealer_Name,
          Account_Type: data?.Account_Type,
          Emi_Start_Date: data?.Emi_Start_Date || "",
          Emi_End_Date: data?.Emi_End_Date || "",
          Ref_title: data?.Ref_title,
          Ref_first_name: data?.Ref_first_name,
          Ref_last_name: data?.Ref_last_name,
          Ref_phone_no: data?.Ref_phone_no,
          Ref_address1: data?.Ref_address1,
          Ref_address2: data?.Ref_address2,
          area_building_ref: data?.area_building_ref,
          landmark_ref: data?.landmark_ref,
          Ref_city: data?.Ref_city,
          Ref_state: data?.Ref_state,
          Ref_pincode: data?.Ref_pincode,
          Ref_country: data?.Ref_country
        }

        setFormData(updateData)
        // setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    // if (location.pathname.startsWith('/merchant/customers/add_finance/')) {
    //   console.log('This is the add vehicle page')
    //   fetchFinanceData(id)
    //   setAddWithCustId(true)
    // } else if (id) {
    //   PageTitle = 'Edit Page'
    //   fetchFinanceData(id)
    // }

    if (isEdit) {
      getData()
      PageTitle = 'Edit Page'
    }
  }, [])

  const handleNext = () => {
    const check = checkVaildation()

    if (check) {
      setCurrentStep(prevStep => prevStep + 1)
    }
  }

  const handleBack = () => {
    setCurrentStep(prevStep => prevStep - 1)
  }

  // const NavCurrentStep = (step) => {
  //   setCurrentStep(step)
  // }

  const NavCurrentStep = (step) => {
    const check = checkVaildation()

    if (check) {
      setCurrentStep(step)
    }
  }

  const handleSubmitSection = (btn) => {
    // event.preventDefault()
    postData(btn)
    // setErrors(previousErrors => {
    //   const newErrors = validateValues(formData)
    //   if (Object.keys(newErrors).length === 0) {
    //     postData()
    //   }
    //   return newErrors
    // })
  }

  const allData = {
    formData,
    currentStep,
    handleInputChange,
    handleNext,
    handleBack,
    handleSubmitSection,
    setFormData,
    handleChange,
    country,
    isEdit,
    isCustomer
  }


  const getCountries = () => {
    getReq("countries")
      .then((resp) => {
        console.log(resp)
        setCountry(
          resp.data.data.countries.map((curElem) => {
            return { value: curElem.name, label: `${curElem.name}` }
          })
        )
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getCountries()
  }, [])


  return (
    <>
      <div className="customer-profile">
        <Card>
          <CardBody>
            <h3 className="mb-0">{isEdit ? "Edit Finance" : "Add Finance"}</h3>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <AddFinanceNav currentStep={currentStep} NavCurrentStep={NavCurrentStep} />
            <form >
              {currentStep === 1 && (
                <ApplicantForm allData={allData} />
              )}
              {currentStep === 2 && (
                <CoApplicantForm allData={allData} />
              )}
              {currentStep === 3 && (
                <EMIForm allData={allData} />
              )}
              {currentStep === 4 && (
                <ReferralForm allData={allData} />
              )}

              {

                console.log(handleSubmitSection)
              }

            </form>
          </CardBody>
        </Card>
      </div>
    </>
  )
}

export default AddFinance