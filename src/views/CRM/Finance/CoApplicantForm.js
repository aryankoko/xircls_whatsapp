import React, { useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import Select from "react-select"
// import { validForm } from '../../Validator'
import Flatpickr from 'react-flatpickr'
import moment from 'moment'

/* eslint-disable */
const CoApplicantForm = ({ allData }) => {
    const [children, setChildren] = useState(false)
    const { formData, handleNext, handleBack, handleInputChange, country } = allData

    const titleOptions = [
        { value: 'mr', label: 'Mr.' },
        { value: 'ms', label: 'Ms.' },
        { value: 'mrs', label: 'Mrs.' }
    ]
    const countryOptions = [
        { value: 'India', label: 'India' }
    ]

    const genderOptions = [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' }
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
        { value: 'employed', label: 'Employed' },
        { value: 'businessOwner', label: 'Business Owner' },
        { value: 'retiredProfessional', label: 'Retired Professional' },
        { value: 'student', label: 'Student' },
        { value: 'homemaker', label: 'Homemaker' }
    ]

    return (
        <>
            <Container fluid className="px-0 py-1">
                {/* <form onSubmit={handleSubmit}> */}
                <Row>
                    <Col md={12} className="mt-2">
                        <h4 className="mb-0">Co-Applicant Details</h4>
                    </Col>
                    <Col md={6} className="mt-2">
                        <label htmlFor="basicDetails-title" className="form-label" style={{ margin: '0px' }}>
                            Title
                        </label>
                        <Select
                            id="basicDetails-title"
                            options={titleOptions}
                            value={titleOptions?.find(option => option.value === formData?.title)}
                            // onChange={e => (handleInputChange(e, 'title'))}
                            onChange={(value, actionMeta) => {
                                handleInputChange({target: {name: "title", value: value?.value}})
                            }}
                            closeMenuOnSelect={true}
                        />
                        <p id="title_val" className="text-danger m-0 p-0 vaildMessage"></p>
                    </Col>
                    <Col md={6} className="mt-2">
                        <label htmlFor="basicDetails-first-name">
                            First Name
                        </label>
                        <input placeholder="First Name" type='text' id='basicDetails-first-name' name='cust_first_name' className="form-control"
                            value={formData?.cust_first_name}
                            // onChange={handleInputChange}
                            // onChange={(event) => {
                            //     (handleInputChange(e))
                            //     const e = { target: { name: "cust_first_name", value: event.value } };
                            //     handleAddInputChange(e, "mainForm")
                            // }}
                            onChange={(e) => {
                                handleInputChange(e)
                            }}
                            required
                        />
                        <p id="cust_first_name_val" className="text-danger m-0 p-0 vaildMessage"></p>
                    </Col>
                    <Col md={6} className="mt-2">
                        <label htmlFor="basicDetails-last-name">
                            Last Name
                        </label>
                        <input required placeholder="Last Name" type='text' id='basicDetails-last-name' name='cust_last_name' className="form-control"
                            value={formData?.cust_last_name}
                            // onChange={handleInputChange}
                            onChange={(e) => {
                                handleInputChange(e)
                            }}
                        />
                        <p id="cust_last_name_val" className="text-danger m-0 p-0 vaildMessage"></p>
                    </Col>
                    <Col md={6} className="mt-2">
                        <label htmlFor="basicDetails-email">
                            Email Address
                        </label>
                        <input required placeholder="Email Address" type='text' id='basicDetails-email' name='email' className="form-control"
                            value={formData?.email}
                            // onChange={handleInputChange}
                            onChange={(e) => {
                                handleInputChange(e)
                            }}
                        />
                        <p id="email_val" className="text-danger m-0 p-0 vaildMessage"></p>
                    </Col>
                    <Col md={6} className="mt-2">
                        <label htmlFor="basicDetails-mobile">
                            Mobile Number
                        </label>
                        <input required placeholder="10-digit Mobile Number" type='tel' pattern="[789][0-9]{9}" id='basicDetails-mobile' name='phone_no' className="form-control"
                            value={formData?.phone_no}
                            // onChange={(e) => {
                            //     handleInputChange(e)
                            // }}
                            onChange={(e) => {
                                if (!isNaN(e.target.value)) {
                                  handleInputChange(e)
                                  console.log("this is a number")
                                }
                              }}
                        />
                        <p id="phone_no_val" className="text-danger m-0 p-0 vaildMessage"></p>
                    </Col>
                    <Col md={6} className="mt-2">
                        <label htmlFor="personalDetails-dob">Date Of Birth</label>
                        <Flatpickr
                            name='cust_dob'
                            className='form-control'
                            value={formData?.cust_dob}
                            onChange={(date) => {
                                handleInputChange({target: {name: "cust_dob", value: moment(date[0]).format("YYYY-MM-DD")}})
                                // setData({...defaultData, cust_dob: moment(date[0]).format("YYYY-MM-DD")})
                            }}
                        />
                        {/* <input

                            placeholder="Date Of Birth"
                            type="date"
                            id="personalDetails-dob"
                            name="cust_dob"
                            className="form-control"
                            value={formData?.cust_dob}
                            onChange={handleInputChange}
                        /> */}
                    </Col>
                    <Col md={6} className="mt-2">
                        <label htmlFor="basicDetails-alt-landline">
                            Alternate Mobile Number
                        </label>
                        <input required placeholder="Alternate Mobile Number" type='tel' pattern="[789][0-9]{9}" id='basicDetails-alt-landline' name='phone_no2' className="form-control"
                            value={formData?.phone_no2}
                            // onChange={e => (handleInputChange(e))}
                            onChange={(e) => {
                                if (!isNaN(e.target.value)) {
                                  handleInputChange(e)
                                  console.log("this is a number")
                                }
                              }}
                        />
                    </Col>

                </Row>
                <Row className='mt-1'>
                    <Col md={12} className="mt-2">
                        <h4 className="mb-0">Address</h4>
                    </Col>
                    <Col md={6} className="mt-2">
                        <label htmlFor="address-1-house-details">
                            Flat and / or Building / House Details
                        </label>
                        <input
                            placeholder="Flat and / or Building / House Details"
                            type="text"
                            id="address-1-house-details"
                            name="address_line1"
                            className="form-control"
                            value={formData.address_line1}
                            onChange={handleInputChange}
                        />
                    </Col>
                    <Col md={6} className="mt-2">
                        <label htmlFor="address-1-lane">Street Lane or Road</label>
                        <input
                            placeholder="Street Lane or Road"
                            type="text"
                            id="address-1-lane"
                            name="address_line2"
                            className="form-control"
                            value={formData.address_line2}
                            onChange={handleInputChange}
                        />
                    </Col>
                    <Col md={6} className="mt-2">
                        <label htmlFor="address-1-locality">
                            Enter Area, Locality or Suburb e.g. Bandra
                        </label>
                        <input
                            placeholder="Enter Area, Locality or Suburb e.g. Bandra"
                            type="text"
                            id="address-1-locality"
                            name="area_building"
                            className="form-control"
                            value={formData.area_building}
                            onChange={handleInputChange}
                        />
                    </Col>
                    <Col md={6} className="mt-2">
                        <label htmlFor="address-1-landmark">Landmark</label>
                        <input
                            placeholder="Landmark"
                            type="text"
                            id="address-1-landmark"
                            name="landmark"
                            className="form-control"
                            value={formData.landmark}
                            onChange={handleInputChange}
                        />
                    </Col>
                    <Col md={6} className="mt-2">
                        <label htmlFor="address-1-city">City</label>
                        <input
                            placeholder="City"
                            type="text"
                            id="address-1-city"
                            name="city"
                            className="form-control"
                            value={formData.city}
                            onChange={handleInputChange}
                        />
                    </Col>
                    <Col md={6} className="mt-2">
                        <label htmlFor="address-1-state">State</label>
                        <input
                            placeholder="State"
                            type="text"
                            id="address-1-state"
                            name="state"
                            className="form-control"
                            value={formData.state}
                            onChange={handleInputChange}
                        />
                    </Col>
                    <Col md={6} className="mt-2">
                        <label htmlFor="address-1-pincode">Pincode</label>
                        <input
                            placeholder="Pincode"
                            type="text"
                            id="address-1-pincode"
                            name="pincode"
                            className="form-control"
                            value={formData.pincode}
                            // onChange={e => (handleInputChange(e))}
                            onChange={(e) => {
                                if (!isNaN(e.target.value)) {
                                  handleInputChange(e)
                                  console.log("this is a number")
                                }
                              }}
                        />
                    </Col>
                    <Col md={6} className="mt-2">
                        <label htmlFor="address-1-country">Country</label>
                        {/* <Select
                            id="address-1-country"
                            placeholder="Country"
                            options={countryOptions}
                            value={countryOptions?.find(option => option.value === formData?.country)}
                            onChange={e => (handleInputChange(e, 'country'))}
                            closeMenuOnSelect={true}
                        /> */}
                        <Select
                            id="country"
                            placeholder="Country"
                            options={country}
                            value={country?.find(option => option.value === formData?.country)}
                            onChange={(value) => {
                                handleInputChange({target: {value: value?.value, name: "country"}})
                            }}
                            closeMenuOnSelect={true}
                        />
                    </Col>
                </Row>
                <Row className='mt-1'>
                    <Col md={12} className="mt-2">
                        <h4 className="mb-0">Personal Details</h4>
                    </Col>
                    <Col md={6} className="mt-2">
                        <label htmlFor="basicDetails-pan">
                            PAN Card Number
                        </label>
                        <input required placeholder="PAN Card Number" type='text' id='basicDetails-pan' name='pancard' className="form-control"
                            value={formData?.pancard}
                            onChange={e => (handleInputChange(e))}
                        />
                    </Col>
                    <Col md={6} className="mt-2">
                        <label htmlFor="basicDetails-aadhar">
                            Aadhar Card Number
                        </label>
                        <input required placeholder="10-digit Aadhar Card Number" type='tel' pattern="[0-9]{12}" id='basicDetails-aadhar' name='Adharcard' className="form-control"
                            value={formData?.Adharcard}
                            // onChange={e => (handleInputChange(e))}
                            onChange={(e) => {
                                if (!isNaN(e.target.value)) {
                                  handleInputChange(e)
                                  console.log("this is a number")
                                }
                              }}
                        />
                    </Col>
                    <Col md={6} className="mt-2">
                        <label
                            htmlFor="personalDetails-gender"
                            className="form-label"
                            style={{ margin: "0px" }}
                        >
                            Gender
                        </label>
                        <Select
                            id="personalDetails-gender"
                            options={genderOptions}
                            closeMenuOnSelect={true}
                            onChange={(value) => {
                                handleInputChange({target: {name: "gender", value: value?.value}})
                            }}
                            value={genderOptions?.find(option => option.value === formData?.gender)}
                        />
                    </Col>

                    <Col md={6} className="mt-2">
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
                            onChange={(value) => {
                                handleInputChange({target: {name: "children", value: value?.value}})
                            }}
                            // onChange={(e) => handleInputChange(e, 'children')}
                            options={childrenOptions}
                            closeMenuOnSelect={true}
                        />
                    </Col>
                    {formData?.children === 'yes' && (
                        <Col md={6} className="mt-2">
                            <label htmlFor="personalDetails-noChildren">
                                No. of Children
                            </label>
                            <input
                                placeholder="Number of Children"
                                type="number"
                                id="personalDetails-noChildren"
                                name="NO_Of_Children"
                                className="form-control"
                                min="0"
                                value={formData?.NO_Of_Children ?? ''}
                                // onChange={handleInputChange}
                                onChange={(e) => {
                                    if (!isNaN(e.target.value)) {
                                      handleInputChange(e)
                                      console.log("this is a number")
                                    }
                                  }}
                            />
                        </Col>
                    )}
                    <Col md={6} className="mt-2">
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
                            // onChange={(e) => handleInputChange(e, 'marital_status')}
                            onChange={(value) => {
                                handleInputChange({target: {name: "marital_status", value: value?.value}})
                            }}
                            closeMenuOnSelect={true}
                        />
                    </Col>
                    {formData?.marital_status === 'married' && <Col md={6} className="mt-2">
                        <label htmlFor="Marriage Anniversary">Marriage Anniversary</label>
                        {/* <input

                            placeholder="Marriage Anniversary"
                            type="date"
                            id="Marriage Anniversary"
                            name="marriage_anniversery"
                            className="form-control"
                            value={formData?.marriage_anniversery}
                            onChange={handleInputChange}
                        /> */}
                        <Flatpickr
                            name='marriage_anniversery'
                            className='form-control'
                            value={formData?.marriage_anniversery}
                            onChange={(date) => {
                                handleInputChange({target: {name: "marriage_anniversery", value: moment(date[0]).format("YYYY-MM-DD")}})
                                // setData({...defaultData, cust_dob: moment(date[0]).format("YYYY-MM-DD")})
                            }}
                        />
                    </Col>}
                    <Col md={6} className="mt-2">
                        <label
                            htmlFor="personalDetails-occupation"
                            className="form-label"
                            style={{ margin: "0px" }}
                        >
                            Occupation
                        </label>
                        <Select
                            id="personalDetails-occupation"
                            options={occupationOptions}
                            placeholder='Select Occupation'
                            value={occupationOptions.find(option => option.value === formData?.occupation) ?? ''}
                            // onChange={(e) => handleInputChange(e, 'occupation')}
                            onChange={(value) => {
                                handleInputChange({target: {name: "occupation", value: value?.value}})
                            }}
                            closeMenuOnSelect={true}
                        />
                    </Col>
                    <Col xs='12' className='mt-2'>
                        <div className='d-flex justify-content-between mt-2'>
                            <div>
                                <button className="btn btn-primary" type="button" onClick={handleBack}>Back</button>
                                <button className="btn btn-primary ms-2" type="button">Cancel</button>
                            </div>
                            <div>
                                <button className="btn btn-primary ms-2" type="button" onClick={handleNext}>Next</button>
                                {/* <button className="btn btn-primary" type="submit" >Save</button> */}
                            </div>
                        </div>
                    </Col>
                </Row>
                {/* </form> */}
            </Container>
        </>
    )
}

export default CoApplicantForm