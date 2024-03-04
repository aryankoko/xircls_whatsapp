import React from 'react'
import { Container, Card, CardBody, Row, Col } from "reactstrap"
import { Facebook, Instagram, Twitter } from "react-feather"
import Select from "react-select"

const ContactPersonInfo = ({ allData }) => {

  const {
    formData,
    country,
    handleInputChange,
    handleNext,
    handleBack
  } = allData

  const titleOptions = [
    { value: 'mr', label: 'Mr.' },
    { value: 'ms', label: 'Ms.' },
    { value: 'mrs', label: 'Mrs.' }
  ]

  const dropdownOptions = [
    { value: 'regular', label: 'Regular Customer' },
    { value: 'privi_group', label: 'Privileged Customer' }
  ]

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

  const customerTypeOptions = [{ value: 'customerGroup', label: 'Select Privileged Customer Group' }]

  const genderOptions = [
    {
      value: "male",
      label: "Male"
    },
    {
      value: "female",
      label: "Female"
    }
  ]

  const maritalStatusOptions = [
    {
      value: "single",
      label: "Single"
    },
    {
      value: "inRelationship",
      label: "In relationship"
    },
    {
      value: "married",
      label: "Married"
    },
    {
      value: "divorced",
      label: "Divorced"
    },
    {
      value: "widowed",
      label: "Widowed"
    }
  ]

  const childrenOptions = [
    {
      value: "no",
      label: "No"
    },
    {
      value: "yes",
      label: "Yes"
    }
  ]

  const occupationOptions = [
    { value: 'Employed', label: 'Employed' },
    { value: 'Business_Owner', label: 'Business Owner' },
    { value: 'Retired Professional', label: 'Retired Professional' },
    { value: 'Student', label: 'Student' },
    { value: 'Homemaker', label: 'Homemaker' }
  ]


  return (
    <>
      <Container fluid className="px-0 py-1">
        <Row>
          <Col md={12} className="mt-2">
            <h4 className="mb-0">Contact Person's Basic Details</h4>
            <div className='mt-1'>
              <span className="form-check form-check-success">
                <input
                  type="checkbox"
                  id="primary-contact"
                  className="form-check-input"
                  name="primaryContact"
                  checked={formData?.primaryContact}
                  onChange={handleInputChange}
                />
                <label htmlFor="primary-contact">Mark as Primary Contact Person</label>
              </span>
            </div>
          </Col>
          <Col md={6} lg={4} className="mt-1">
            <label htmlFor="title" className="form-label" style={{ margin: '0px' }}>
              Title
            </label>
            <Select
              id="title"
              options={titleOptions}
              closeMenuOnSelect={true}
              value={titleOptions.find(option => option.value === formData.title) ?? ''}
              onChange={(e) => handleInputChange(e, 'title')}
            />
            <p id="title_val" className="text-danger m-0 p-0 vaildMessage"></p>

          </Col>
          <Col md={6} lg={4} className="mt-1">
            <label htmlFor="first-name ">
              First Name
            </label>
            <input placeholder="First Name" type='text' id='first-name' name='cust_first_name' className="form-control "
              value={formData?.cust_first_name ?? ''}
              onChange={handleInputChange}
            />
            <p id="cust_first_name_val" className="text-danger m-0 p-0 vaildMessage"></p>

          </Col>
          <Col md={6} lg={4} className="mt-1">
            <label htmlFor="last-name">
              Last Name
            </label>
            <input placeholder="Last Name" type='text' id='last-name' name='cust_last_name' className="form-control"
              value={formData?.cust_last_name ?? ''}
              onChange={handleInputChange}
            />
            <p id="cust_last_name_val" className="text-danger m-0 p-0 vaildMessage"></p>

          </Col>
          <Col md={6} lg={4} className="mt-1">
            <label htmlFor="email">
              Email
            </label>
            <input placeholder="Email" type='text' id='email' name='email' className="form-control"
              value={formData?.email ?? ''}
              onChange={handleInputChange}
            />
            <p id="email_val" className="text-danger m-0 p-0 vaildMessage"></p>

          </Col>
          <Col md={6} lg={4} className="mt-1">
            <label htmlFor="country2">Country</label>
            <Select
              options={country}
              inputId="country2"
              closeMenuOnSelect={true}
              placeholder="Select Country"
              value={country.find(option => option.value === formData?.country) ?? ''}
              // defaultValue={country.find(option => option.value === 'India')}
              onChange={(e) => handleInputChange(e, 'country')}
            />
          </Col>
          <Col md={6} lg={4} className="mt-1">
            <label htmlFor="basicDetails-mobile">
              Mobile Number
            </label>
            <input placeholder="Mobile Number" type='tel' maxLength={10} id='basicDetails-mobile' name='phone_no' className="form-control"
              value={formData?.phone_no ?? ''}
              // onChange={handleInputChange}
              onChange={(e) => {
                if (!isNaN(e.target.value)) {
                  handleInputChange(e)
                  console.log("this is a number")
                }
              }}
            // disabled={id} 
            />
            <p id="phone_no_val" className="text-danger m-0 p-0 vaildMessage"></p>

          </Col>
          <Col md={6} lg={4} className="mt-1">
            <label htmlFor="basicDetails-alt-mobile">
              Alternate Mobile Number
            </label>
            <input placeholder="Alternate Mobile Number" type='tel' maxLength={10} id='basicDetails-alt-mobile' name='phone_no2' className="form-control"
              value={formData?.phone_no2 ?? ''}
              // onChange={handleInputChange}
              onChange={(e) => {
                if (!isNaN(e.target.value)) {
                  handleInputChange(e)
                  console.log("this is a number")
                }
              }}
            />
          </Col>
          <Col md={6} lg={4} className="mt-1">
            <label htmlFor="basicDetails-landline">
              Landline Number
            </label>
            <input placeholder="Landline Number" type='tel' maxLength={10} id='basicDetails-landline' name='landline1' className="form-control"
              value={formData?.landline1 ?? ''}
              // onChange={handleInputChange}
              onChange={(e) => {
                if (!isNaN(e.target.value)) {
                  handleInputChange(e)
                  console.log("this is a number")
                }
              }}
            />
          </Col>
          <Col md={6} lg={4} className="mt-1">
            <label htmlFor="basicDetails-alt-landline">
              Alternate Landline Number
            </label>
            <input placeholder="Alternate Landline Number" type='tel' maxLength={10} pattern="[789][0-9]{9}" id='basicDetails-alt-landline' name='landline2' className="form-control"
              value={formData?.landline2 ?? ''}
              // onChange={handleInputChange}
              onChange={(e) => {
                if (!isNaN(e.target.value)) {
                  handleInputChange(e)
                  console.log("this is a number")
                }
              }}
            />
          </Col>
          <Col md={6} lg={4} className="mt-1">
            <label htmlFor="basicDetails-customerType" style={{ margin: '0px' }}>
              Customer Type
            </label>
            <Select
              id="basicDetails-customerType"
              options={dropdownOptions}
              value={dropdownOptions.find(option => option.value === formData.dropdown) ?? ''}
              onChange={(e) => handleInputChange(e, 'dropdown')}
              closeMenuOnSelect={true}
            />
            <p id="dropdown_val" className="text-danger m-0 p-0 vaildMessage"></p>

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
            <label htmlFor="basicDetails-source" style={{ margin: '0px' }}>
              Source
            </label>
            <Select
              id="basicDetails-source"
              options={sourceOptions}
              value={sourceOptions.find(option => option.value === formData.cust_source_dropdown) ?? ''}
              onChange={(e) => handleInputChange(e, 'cust_source_dropdown')}
              closeMenuOnSelect={true}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12} className="mt-2">
            <h4 className="mb-0">Personal Details</h4>
          </Col>
          <Col md={6} lg={4} className="mt-2">
            <label htmlFor="dob">Date Of Birth</label>
            <input

              placeholder="Date Of Birth"
              type="date"
              id="dob"
              name="cust_dob"
              className="form-control"
              value={formData?.cust_dob ?? ''}
              onChange={handleInputChange}
            />
          </Col>
          <Col md={6} lg={4} className="mt-2">
            <label
              htmlFor="personalDetails-gender"
              className="form-label"
              style={{ margin: "0px" }}
            >
              Gender
            </label>
            <Select
              id="personalDetails-gender"
              placeholder='Select Your Gender'
              options={genderOptions}
              value={genderOptions.find(option => option.value === formData?.gender) ?? ''}
              onChange={(e) => handleInputChange(e, 'gender')}
              closeMenuOnSelect={true}
            />
          </Col>
          <Col md={6} lg={4} className="mt-2">
            <label
              htmlFor="personalDetails-marital-status"
              className="form-label"
              style={{ margin: "0px" }}
            >
              Marital Status
            </label>
            <Select
              id="personalDetails-marital-status"
              options={maritalStatusOptions}
              placeholder='Select Your Martial Status'
              value={maritalStatusOptions.find(option => option.value === formData?.marital_status) ?? ''}
              onChange={(e) => handleInputChange(e, 'marital_status')}
              closeMenuOnSelect={true}
            />
          </Col>
          <Col md={6} lg={4} className="mt-2">
            <label
              htmlFor="personalDetails-children"
              className="form-label"
              style={{ margin: "0px" }}
            >
              Children
            </label>
            <Select
              id="personalDetails-children"
              placeholder='Children'
              value={childrenOptions.find(option => option.value === formData?.children) ?? ''}
              onChange={(e) => handleInputChange(e, 'children')}
              options={childrenOptions}
              closeMenuOnSelect={true}
            />
          </Col>
          {/* {formData?.children === 'yes' && (
            <Col md={6} lg={4} className="mt-2">
              <label htmlFor="personalDetails-noChildren">
                No. of Children
              </label>
              <input
                placeholder="Occupation"
                type="number"
                id="personalDetails-noChildren"
                name="NO_Of_Children"
                className="form-control"
                min="0"
                value={formData?.NO_Of_Children ?? ''}
                onChange={handleInputChange}
              />
            </Col>
          )} */}
          <Col md={6} lg={4} className="mt-2">
            <label
              htmlFor="personalDetails-occupation"
              className="form-label"
              style={{ margin: "0px" }}
            >
              Occupation
            </label>
            <Select
              id="personalDetails-children"
              options={occupationOptions}
              placeholder='Select Occupation?'
              value={occupationOptions.find(option => option.value === formData?.occupation) ?? ''}
              onChange={(e) => handleInputChange(e, 'occupation')}
              closeMenuOnSelect={true}
            />
          </Col>
          {/* {(formData?.occupation === 'employed' || formData?.occupation === 'businessOwner') && <Col md={6} lg={4} className="mt-2">
            <label htmlFor="personalDetails-sector">Sector</label>
            <input
              placeholder="Sector"
              type="text"
              id="personalDetails-sector"
              name="category"
              className="form-control"
              value={formData?.category ?? ''}
              onChange={handleInputChange}
            />
          </Col> } */}
          <Col md={6} lg={4} className="mt-2">
            <label htmlFor="personalDetails-designation">Designation</label>
            <input
              placeholder="Designation"
              type="text"
              id="personalDetails-designation"
              name="designation"
              className="form-control"
              value={formData?.designation ?? ''}
              onChange={handleInputChange}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12} className="mt-2">
            <h4 className="mb-0">Identity Proof</h4>
          </Col>
          <Col md={6} className="mt-2">
            <label htmlFor="idproof-aadhar-no">Aadhar Number</label>
            <input
              placeholder="AadharNumber"
              type="text"
              id="idproof-aadhar-no"
              name="Adharcard"
              className="form-control"
              value={formData?.Adharcard ?? ''}
              // onChange={handleInputChange}
              onChange={(e) => {
                if (!isNaN(e.target.value)) {
                  handleInputChange(e)
                  console.log("this is a number")
                }
              }}
            />
          </Col>
          <Col md={6} className="mt-2">
            <label>Upload Aadhar Card Image</label>
            <div className="d-flex gap-1 p-0 justify-content-start align-items-center">
              {/* <span className="mx-1">{formData?.aadhar_pdf_file?.name || formData?.aadhar_pdf_file || 'Aadhar Card'}</span> */}
              <input
                name="aadhar_pdf_file"
                type="file"
                id="idproof-aadhar"
                className="d-none"
                // value={formData?.aadhar_pdf_file}
                onChange={(e) => handleInputChange(e, 'file')}
              />
              <label
                className="btn btn-outline-primary w-25"
                htmlFor="idproof-aadhar"
              >
                Upload File
              </label>
            </div>
          </Col>
          <Col md={6} className="mt-2">
            <label htmlFor="idproof-pan-no">Pan Card Number</label>
            <input
              placeholder="Pan Number"
              type="text"
              id="idproof-pan-no"
              name="pancard"
              className="form-control"
              value={formData?.pancard ?? ''}
              onChange={handleInputChange}
            />
          </Col>
          <Col md={6} className="mt-2">
            <label>Upload Pan Card Image</label>
            <div className="d-flex gap-1 p-0 justify-content-start align-items-center">
              {/* <span className="mx-1">{formData?.pan_pdf_file?.name || formData?.pan_pdf_file || 'Pan Card'}</span> */}
              <input
                name="pan_pdf_file"
                type="file"
                id="idproof-pan"
                className="d-none"
                // value={formData?.pan_pdf_file}
                onChange={(e) => handleInputChange(e, 'file')}
              />
              <label
                htmlFor="idproof-pan"
                className="btn btn-outline-primary w-25"
              >
                Upload File
              </label>
            </div>
          </Col>
        </Row>
        <Row >
          <Col md={12} className="mt-2">
            <h4 className="mb-0">Social Presence</h4>
          </Col>
          <Col md={6} lg={4} className="mt-2">
            <label htmlFor="personalDetails-twitter2">Twitter</label>
            <div className="input-group mb-3">
              <span className="input-group-text">
                <Twitter size={24} />
              </span>
              <input
                type="text"
                id="personalDetails-twitter2"
                className="form-control"
                aria-label=""
                name="social_twitter"
                value={formData?.social_twitter ?? ''}
                onChange={handleInputChange}
              />
            </div>
          </Col>
          <Col md={6} lg={4} className="mt-2">
            <label htmlFor="personalDetails-facebook2">Facebook</label>
            <div className="input-group mb-3">
              <span className="input-group-text">
                <Facebook size={24} />
              </span>
              <input
                type="text"
                id="personalDetails-facebook2"
                className="form-control"
                aria-label=""
                name="social_fb"
                value={formData?.social_fb ?? ''}
                onChange={handleInputChange}
              />
            </div>
          </Col>
          <Col md={6} lg={4} className="mt-2">
            <label htmlFor="personalDetails-instagram2">Instagram</label>
            <div className="input-group mb-3">
              <span className="input-group-text">
                <Instagram size={24} />
              </span>
              <input
                type="text"
                id="personalDetails-instagram2"
                className="form-control"
                aria-label=""
                name="social_insta"
                value={formData?.social_insta ?? ''}
                onChange={handleInputChange}
              />
            </div>
          </Col>
        </Row>
        <div className='d-flex justify-content-between mt-1'>
          <div>
            <button className="btn btn-primary" type="button" onClick={handleBack}>Back</button>
            <button className="btn btn-primary ms-2" type="button">Cancel</button>
          </div>
          <div>
            {/* <button className="btn btn-primary" type="submit" onClick={handleSubmitSection1}>Save</button>
                                <button className="btn btn-primary ms-2" type="button">Save & Close</button> */}
            <button className="btn btn-primary ms-2" type="button" onClick={handleNext}>Next</button>
          </div>
        </div>
      </Container>
    </>
  )
}

export default ContactPersonInfo