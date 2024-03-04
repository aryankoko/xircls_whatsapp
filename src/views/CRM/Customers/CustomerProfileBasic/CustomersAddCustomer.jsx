import React from 'react'
import { Container, Row, Col, Card, CardBody, Label, Input, Button } from 'reactstrap'
import Select from "react-select"

const CustomersAddCustomer = ({ allData }) => {

   const {
      id,
      formData,
      handleInputChange,
      // handleNext,
      errors
   } = allData

   const sourceInputData = [
      'Networking', 'Phone Enquiry', 'Cold Call', 'Cold Email', 'Trade Show',
      'Employee Referral', 'Client Referral', 'External Referral', 'SEO / SEM Campaign',
      'Email Marketing Campaign', 'Web - Contact Form', 'Web - Enquiry Form',
      'Web - Search', 'Webinar', 'Other'
   ]
   const sourceOptions = []
   sourceInputData.forEach((item) => {
      if (item === "") {
         return
      }
      sourceOptions.push({
         value: item,
         label: item
      })
   })

   const dropdownOptions = [
      { value: 'regular', label: 'Regular Customer' },
      { value: 'privi_group', label: 'Privileged Customer' }
   ]

   const customerTypeOptions = [{ value: 'customerGroup', label: 'Select Privileged Customer Group' }]

   const titleOptions = [
      { value: 'mr', label: 'Mr.' },
      { value: 'ms', label: 'Ms.' },
      { value: 'mrs', label: 'Mrs.' }
   ]

   const capitalizeFirstLetter = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1)
   }

   const handleNameInputChange = (e, fieldName) => {
      const { value } = e.target
      const capitalizedValue = capitalizeFirstLetter(value)

      handleInputChange({ target: { name: fieldName, value: capitalizedValue } })
   }

   return (
      <>
         <style>{`
        .hover-text {
            position: relative;
            font-family: Arial;
            text-align: center;
          }

        .tooltip-text {
            visibility: visible;
            position: absolute;
            z-index: 2;
            width: 100%;
            color: red;
            font-size: 12px;
            background-color: rgba(225,225,225,01);
            border-radius: 10px;
            padding: 10px 15px 10px 15px;
            top: -60px;
            // left: -50%;
          }
          
          .tooltip-text::before {
            content: "";
            position: absolute;
            transform: rotate(45deg);
            background-color: rgba(225,225,225,01);
            padding: 5px;
            z-index: 1;
            top: 85%;
            left: 45%;
          }
        `}</style>
         <Container fluid className="px-0 py-1">
            <Row>
               <Col md={12} className="mt-1">
                  <h4 className="mb-0">Basic Details</h4>
               </Col>
               <Col md={6} lg={4} className="mt-1">
                  <label htmlFor="basicDetails-title " className="" style={{ margin: '0px' }}>
                     Title
                  </label>
                  <Select
                     id="basicDetails-title"
                     options={titleOptions}
                     closeMenuOnSelect={true}
                     value={titleOptions.find(option => option.value === formData.title) ?? ''}
                     onChange={(e) => handleInputChange(e, 'title')}
                  />
                  <p id="title_val" className="text-danger m-0 p-0 vaildMessage"></p>
               </Col>
               <Col md={6} lg={4} className="mt-1">
                  <label htmlFor="basicDetails-first-name ">
                     First Name
                  </label>
                  <input placeholder="First Name" type='text' id='basicDetails-first-name' name='cust_first_name' className="form-control " value={formData?.cust_first_name ?? ''} onChange={(e) => handleNameInputChange(e, 'cust_first_name')} />
                  <p id="cust_first_name_val" className="text-danger m-0 p-0 vaildMessage"></p>
               </Col>
               <Col md={6} lg={4} className="mt-1">
                  <label htmlFor="basicDetails-last-name">
                     Last Name
                  </label>
                  <input placeholder="Last Name" type='text' id='basicDetails-last-name' name='cust_last_name' className="form-control" value={formData?.cust_last_name ?? ''} onChange={(e) => handleNameInputChange(e, 'cust_last_name')} />
                  <p id="cust_last_name_val" className="text-danger m-0 p-0 vaildMessage"></p>
               </Col>
               <Col md={6} lg={4} className="mt-1">
                  <label htmlFor="basicDetails-email">
                     Email
                  </label>
                  <input placeholder="Email" type='email' id='basicDetails-email' name='email' className="form-control" value={formData?.email ?? ''} onChange={handleInputChange} disabled={id} />
                  <p id="email_val" className="text-danger m-0 p-0 vaildMessage"></p>
                  <p id="email_val1" className="text-danger m-0 p-0 vaildMessage"></p>
               </Col>
               <Col md={6} lg={4} className="mt-1">
                  <label htmlFor="basicDetails-mobile">
                     Mobile Number
                  </label>
                  <input placeholder="Mobile Number" type='tel' maxLength={10} id='basicDetails-mobile' name='phone_no' className="form-control" value={formData?.phone_no ?? ''}
                     // onChange={handleInputChange}
                     onChange={(e) => {
                        if (!isNaN(e.target.value)) {
                           handleInputChange(e)
                        }
                     }}
                     disabled={id}
                  />
                  <p id="phone_no_val" className="text-danger m-0 p-0 vaildMessage"></p>
               </Col>
               <Col md={6} lg={4} className="mt-1">
                  <label htmlFor="basicDetails-alt-mobile">
                     Alternate Mobile Number
                  </label>
                  <div>
                     <input placeholder="Alternate Mobile Number" type='tel' maxLength={10} id='basicDetails-alt-mobile' name='phone_no2' className="form-control" value={formData?.phone_no2 ?? ''}
                        // onChange={handleInputChange} 
                        onChange={(e) => {
                           if (!isNaN(e.target.value)) {
                              handleInputChange(e)
                           }
                        }}
                     />
                     <p className={`text-danger text-left m-0 font-small-1 ${errors.phone_no2 ? '' : 'd-none'}`}>
                        {errors.phone_no2}
                     </p>
                  </div>
               </Col>
               <Col md={6} lg={4} className="mt-1">
                  <label htmlFor="basicDetails-landline">
                     Landline Number
                  </label>
                  <div>
                     <input placeholder="Landline Number" type='tel' maxLength={10} id='basicDetails-landline' name='landline1' className="form-control" value={formData?.landline1 ?? ''}
                        // onChange={handleInputChange} 
                        onChange={(e) => {
                           if (!isNaN(e.target.value)) {
                              handleInputChange(e)
                           }
                        }}
                     />
                     <p className={`text-danger text-left m-0 font-small-1 ${errors.landline1 ? '' : 'd-none'}`}>
                        {errors.landline1}
                     </p>
                  </div>
               </Col>
               <Col md={6} lg={4} className="mt-1">
                  <label htmlFor="basicDetails-alt-landline">
                     Alternate Landline Number
                  </label>
                  <div>
                     <input placeholder="Alternate Landline Number" type='tel' maxLength={10} pattern="[789][0-9]{9}" id='basicDetails-alt-landline' name='landline2' className="form-control" value={formData?.landline2 ?? ''}
                        // onChange={handleInputChange}
                        onChange={(e) => {
                           if (!isNaN(e.target.value)) {
                              handleInputChange(e)
                           }
                        }}
                     />
                     <p className={`text-danger text-left m-0 font-small-1 ${errors.landline2 ? '' : 'd-none'}`}>
                        {errors.landline2}
                     </p>
                  </div>
               </Col>
               <Col md={6} lg={4} className="mt-1">
                  <label htmlFor="basicDetails-customerType" style={{ margin: '0px' }}>
                     Customer Type
                  </label>
                  <Select
                     id="basicDetails-customerType"
                     options={dropdownOptions}
                     value={dropdownOptions.find(option => option.value === formData.dropdown) ?? ''}
                     // value={dropdownOptions[0]} // Set the default value to 'regular'   -- dropdownOptions.find(option => option.value === formData.dropdown) || --
                     onChange={(e) => handleInputChange(e, 'dropdown')}
                     closeMenuOnSelect={true}
                  />
                  <p id="basicDetails-customerType_val" className="text-danger m-0 p-0 vaildMessage"></p>
               </Col>
               {formData?.dropdown === 'privi_group' && <Col md={6} lg={4} className="mt-1">
                  <label htmlFor="basicDetails-privilegedCustomerGroup" style={{ margin: '0px' }}>
                     Customer Group
                  </label>
                  <Select
                     id="basicDetails-privilegedCustomerGroup"
                     options={customerTypeOptions}
                     value={customerTypeOptions.find(option => option.value === formData.customerType)}
                     onChange={(e) => handleInputChange(e, 'customerType')}
                     closeMenuOnSelect={true}
                  />
               </Col>}
               <Col md={6} lg={4} className="mt-1">
                  <Label htmlFor="basicDetails-source" style={{ margin: '0px' }}>
                     Source
                  </Label>
                  <Select
                     id="basicDetails-source"
                     options={sourceOptions}
                     value={sourceOptions.find(option => option.value === formData.cust_source_dropdown) ?? ''}
                     onChange={(e) => handleInputChange(e, 'cust_source_dropdown')}
                     closeMenuOnSelect={true}
                  />
               </Col>
            </Row>
         </Container>
      </>
   )
}

export default CustomersAddCustomer