import React, { useEffect, useState } from 'react'
import { Card, CardBody } from "reactstrap"
import { getReq, crmURL } from '@src/assets/auth/jwtService.js'
import { useParams, useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"
import AddBusinessNav from '@src/views/CRM/Business/Components/AddBusinessNav.js'
import CompanyAddInfo from '@src/views/CRM/Business/Components/CompanyAddInfo.js'
import CompanyBasicInfo from '@src/views/CRM/Business/Components/CompanyBasicInfo.js'
import ContactPersonInfo from '@src/views/CRM/Business/Components/ContactPersonInfo.js'
import ContactPersonAddInfo from '@src/views/CRM/Business/Components/ContactPersonAddInfo.js'
import { postReq } from '../../../assets/auth/jwtService'
import { validForm } from '../../Validator'

/* eslint-disable */
const AddBusiness = () => {
   const [formData, setFormData] = useState({
      mark_parent: false,
      country: "",
      company_name: "",
      industry: "",
      company_gst: "",
      company_pancard: "",
      company_phone: "",
      company_email: "",
      company_website: "",
      type: "",
      address_line1: "",
      address_line2: "",
      area_building: "",
      landmark: "",
      city: "",
      state: "",
      pincode: "",
      par_company_name: "",
      par_industry: "",
      par_company_gst: "",
      par_company_pancard_name: "",
      par_company_phone: "",
      par_company_email: "",
      par_company_website: "",
      company_twitter: "",
      company_fb: "",
      company_insta: "",
      par_address_com: "",
      par_street_com: "",
      par_area_building_com: "",
      par_landmark_com: "",
      par_city_com: "",
      par_state_com: "",
      par_pincode_com: "",
      par_country_selection_com: "",
      par_company_twitter_link: "",
      par_company_facebook_link: "",
      par_company_instagram_link: "",
      title: "",
      cust_first_name: "",
      cust_last_name: "",
      email: "",
      phone_no: "",
      phone_no2: "",
      landline1: "",
      landline2: "",
      dropdown: "",
      customerType: "",
      cust_source_dropdown: "",
      cust_dob: "",
      gender: "",
      marital_status: "",
      children: "",
      occupation: "",
      designation: "",
      Adharcard: "",
      pancard: ""
   })
   // const [formData, setFormData] = useState({
   //    mark_parent: false,
   //    country: 'India'
   // })
   const [currentStep, setCurrentStep] = useState(1)
   const [country, setCountry] = useState([])

   const navigate = useNavigate()

   const { id } = useParams()

   console.log(formData, 'formData')

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

   const fetchCustomerData = (id) => {
      const url = new URL(`${crmURL}/customers/merchant/get_view_customer/`)
      const form_data = new FormData()
      form_data.append('id', id)
      form_data.append('edit_type', 'is_customer_detail')
      fetch(url, {
         method: "POST",
         body: form_data
      })
         .then((response) => {
            if (!response.ok) {
               // toast.error(`HTTP error! Status: ${response.status}`)
               // throw new Error(`HTTP error! Status: ${response.status}`)
            }
            return response.json()
         })
         .then((resp) => {
            console.log("Response:", resp.success[0])
            const newObject = {};
            for (const key in resp.success[0]) {
               if (resp.success[0].hasOwnProperty(key) && resp.success[0][key] !== null) {
                  newObject[key] = resp.success[0][key];
               }
            }
            setFormData(newObject)
            const name = newObject.customer_name.split(' ')
            const datePart = newObject.cust_dob.substring(0, 10)
            setFormData(prefData => ({
               ...prefData,
               cust_first_name: name[0],
               cust_last_name: name[1],
               cust_dob: datePart
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

   const notParent = [
      {
         name: 'company_name',
         message: 'Please enter your company name',
         type: 'string',
         id: 'company_name'
      },
      {
         name: 'industry',
         message: 'Please enter your industry',
         type: 'string',
         id: 'industry'
      },
      {
         name: 'company_phone',
         message: 'Please enter your company phone',
         type: 'number',
         id: 'company_phone'
      },
      {
         name: 'company_email',
         message: 'Please enter your company email',
         type: 'email',
         id: 'company_email'
      }
   ]

   const parentForm = [
      {
         name: 'par_company_name',
         message: 'Please enter your name',
         type: 'string',
         id: 'par_company_name'
      },
      {
         name: 'par_industry',
         message: 'Please enter your industry',
         type: 'string',
         id: 'par_industry'
      },
      {
         name: 'par_company_phone',
         message: 'Please enter your company phone',
         type: 'number',
         id: 'par_company_phone'
      },
      {
         name: 'par_company_email',
         message: 'Please enter your company email',
         type: 'email',
         id: 'par_company_email'
      }
   ]

   const contactPerson = [
      {
         name: 'title',
         message: 'Please select your title',
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
         message: 'Please enter your email',
         type: 'email',
         id: 'email'
      },
      {
         name: 'phone_no',
         message: 'Please enter your phone no',
         type: 'number',
         id: 'phone_no'
      },
      {
         name: 'dropdown',
         message: 'Please select customer type',
         type: 'string',
         id: 'dropdown'
      }
   ]

   const checkVaildation = () => {
      let checkForm = true
      if (currentStep === 1) {
         checkForm = validForm(notParent, formData)

         if (checkForm && !formData.mark_parent) {
            checkForm = validForm(parentForm, formData)
         }

      }

      if (currentStep === 3) {
         checkForm = validForm(contactPerson, formData)
      }

      return checkForm
   }

   const postData = (btn) => {

      const check = checkVaildation()

      if (check) {

         const form_data = new FormData()
         Object.entries(formData).map(([key, value]) => {
            if (key === 'mark_parent') {
               value = value ? 'yes' : 'no'
            }
            form_data.append(key, value)
         })
         formData?.aadhar_pdf_file instanceof Object && form_data.append("is_aadhar_file", '1')
         formData?.pan_pdf_file instanceof Object && form_data.append("is_pan_file", '1')
         // formData?.user_profile_img instanceof Object && form_data.append("is_user_profile", '1')
         form_data.append("add_new_customers_b2b", '1')
         form_data.append("mark_parent", formData?.mark_parent ? 'yes' : 'no')
         form_data.append("pin", 'INsdfsdfsDV')
         form_data.append("entry_point", 'INDV')
         form_data.append("press_btn", btn)
         id && form_data.append("customer_id", id)

         for (var key of form_data.entries()) {
            console.log(key[0] + ', ' + key[1]);
         }

         console.log("slfnsdjklnsdklv")
         postReq('add_customer_individual', form_data)
            // fetch(url, {
            //   method: "POST",
            //   body: form_data
            // })
            //   .then((response) => {
            //    //  if (!response.ok) {
            //       if (response.status === 409) {
            //          throw new Error('Customer already exists')
            //       }
            //       //  }
            //       return response.json()
            //    })
            .then((resp) => {
               if (resp.status === 409) {
                  throw new Error('Customer already exists')
               }
               console.log("Response:", resp)
               toast.success('Customer saved successfully')
               if (resp.data.is_edit_url) {
                  navigate(`/merchant/customers/edit_customer/${resp.data.cust_id}`)
               }

               if (btn === "SAVE & CLOSE") {
                  navigate("/merchant/customers/")
               }
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

   useEffect(() => {
      getCountries()
   }, [])

   const handleSameAsSubsidiaryCompany = () => {
      if (formData.SameSubsidiaryCompany) {
         setFormData((prevData) => ({
            ...prevData,
            par_address_com: prevData.address_line1,
            par_street_com: prevData.address_line2,
            par_area_building_com: prevData.area_building,
            par_landmark_com: prevData.landmark,
            par_city_com: prevData.city,
            par_state_com: prevData.state,
            par_pincode_com: prevData.pincode,
            par_country_selection_com: prevData.country
         }))
      } else {
         // Clear subsidiary company details
         setFormData((prevData) => ({
            ...prevData,
            par_address_com: "",
            par_street_com: "",
            par_area_building_com: "",
            par_landmark_com: "",
            par_city_com: "",
            par_state_com: "",
            par_pincode_com: "",
            par_country_selection_com: ""
         }))
      }
   }


   const handleInputChange = (e, addressType) => {
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
            if (name === 'SameSubsidiaryCompany') {
               setFormData((prevData) => ({
                  ...prevData,
                  parentCountry: checked ? prevData?.country : ''
               }));

               // Call the function to fill in Parent Company Address Details
               handleSameAsSubsidiaryCompany();
            }
            else if (name === 'billingShippingAddressSame') {
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
      } else if (addressType === 'file') {
         setFormData(prevFormData => ({
            ...prevFormData,
            [e.target.name]: (e.target.files[0])
         }))
      } else if (addressType) {
         setFormData(prevFormData => ({
            ...prevFormData,
            [addressType]: e.value
         }))
      }
   }

   // const handleInputChange = (e, addressType) => {
   //    if (addressType === undefined) {
   //       let { name, value, type, checked } = e.target;

   //       // ... (your existing code)

   //       if (name === 'SameSubsidiaryCompany') {
   //          setFormData((prevData) => ({
   //             ...prevData,
   //             parentCountry: checked ? prevData?.country : ''
   //          }));

   //          // Call the function to fill in Parent Company Address Details
   //          handleSameAsSubsidiaryCompany();
   //       } else if (name === 'billingShippingAddressSame') {
   //          // ... (your existing code)
   //       }
   //    } else if (addressType === 'file') {
   //       // ... (your existing code)
   //    } else if (addressType) {
   //       // ... (your existing code)
   //    }
   // }

   // ... (rest of your component)

   const handleSubmitSection = (event, btn) => {
      event.preventDefault()
      console.log(btn)
      postData(btn)
   }

   const handleNext = () => {
      const check = checkVaildation()

      if (check) {
         setCurrentStep(prevStep => prevStep + 1)
      }
   }

   const handleBack = () => {
      setCurrentStep((prevStep) => prevStep - 1)
   }

   const NavCurrentStep = (step) => {
      const check = checkVaildation()
      if (check) {
         setCurrentStep(step)
      }

   }

   const allData = {
      formData,
      setFormData,
      currentStep,
      country,
      handleInputChange,
      handleNext,
      handleBack
   }

   return (
      <>
         <div className="customer-profile">
            <Card>
               <CardBody>
                  <h3 className="mb-0">Add Customer</h3>
               </CardBody>
            </Card>
            <Card>
               <CardBody>
                  <AddBusinessNav currentStep={currentStep} NavCurrentStep={NavCurrentStep} />
                  <form>
                     {currentStep === 1 && (
                        <CompanyBasicInfo allData={allData} />
                     )}
                     {currentStep === 2 && (
                        <CompanyAddInfo allData={allData} />
                     )}
                     {currentStep === 3 && (
                        <ContactPersonInfo allData={allData} />
                     )}
                     {currentStep === 4 && (
                        <ContactPersonAddInfo allData={allData} />
                     )}

                     {
                        currentStep === 4 && (
                           <div className="w-100 d-flex justify-content-between">
                              <div>
                                 <button className="btn btn-primary" type="button" onClick={handleBack}>Back</button>
                                 <button className="btn btn-primary ms-2" type="button">Cancel</button>
                              </div>
                              <div>
                                 <button className="btn btn-primary ms-2" type="button" onClick={e => handleSubmitSection(e, 'SAVE')}>Save</button>
                                 <button className="btn btn-primary ms-2" type="button" onClick={e => handleSubmitSection(e, 'SAVE & CLOSE')}>Save & Close</button>

                              </div>
                           </div>
                        )
                     }
                  </form>
               </CardBody>
            </Card>
         </div>
      </>
   )
}

export default AddBusiness