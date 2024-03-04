// 
import React from 'react'
import { Container, Row, Col, Card, CardBody, Label, Input, Button } from 'reactstrap'
import Select from "react-select"

const CustomersAddCustomer = ({ allData }) => {

    const { 
        id,
        formData,
        handleInputChange,
        handleNext,
        errors
    } = allData

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     console.log('Form Data:', formData)
    // }

    const sourceInputData = ['Networking', 'Cold Call', 'web-search', 'webinar', 'Phone enquiry', 'Employee referral', 'Client referral']

    const options = []
    sourceInputData.forEach((item) => {
        if (item === "") {
            return
        }
        options.push({
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
                {/* <form onSubmit={handleSubmit}> */}
                <Row>
                    <Col md={12} className="mt-1">
                        <h4 className="mb-0">Basic Details</h4>
                    </Col>
                    <Col md={6} lg={4} className="mt-1">
                        <label htmlFor="basicDetails-title " className="form-label" style={{ margin: '0px' }}>
                            Title
                        </label>
                        <Select
                            id="basicDetails-title"
                            options={titleOptions}
                            closeMenuOnSelect={true}
                            value={titleOptions.find(option => option.value === formData.title) ?? ''}
                            onChange={(e) => handleInputChange(e, 'title')}
                        />
                    </Col>
                    <Col md={6} lg={4} className="mt-1">
                        <label htmlFor="basicDetails-first-name ">
                            First Name
                        </label>
                        <input placeholder="First Name" type='text' id='basicDetails-first-name' name='cust_first_name' className="form-control " value={formData?.cust_first_name ?? ''} onChange={handleInputChange} required />
                    </Col>
                    <Col md={6} lg={4} className="mt-1">
                        <label htmlFor="basicDetails-last-name">
                            Last Name
                        </label>
                        <div className=''>
                            <input required placeholder="Last Name" type='text' id='basicDetails-last-name' name='cust_last_name' className="form-control" value={formData?.cust_last_name ?? ''} onChange={handleInputChange} />
                        </div>
                    </Col>
                    <Col md={6} lg={4} className="mt-1">
                        <label htmlFor="basicDetails-email">
                            Email
                        </label>
                        <div >
                            <input required placeholder="Email" type='text' id='basicDetails-email' name='email' className="form-control" value={formData?.email ?? ''} onChange={handleInputChange} disabled={id}/>
                            <p className={`text-danger text-left m-0 font-small-1 ${errors.email ? 'visible' : 'invisible'}`}>
                                Email should be at least 15 characters long
                            </p>
                        </div>
                        {/* <div className='hover-text'>
                            {errors.email ? (
                                <p className="error tooltip-text">
                                    Email should be at least 15 characters long
                                </p>
                            ) : null}
                            <input required placeholder="Email" type='text' id='basicDetails-email' name='email' className="form-control" value={formData?.email ?? ''} onChange={handleInputChange} />
                        </div> */}
                    </Col>
                    <Col md={6} lg={4} className="mt-1">
                        <label htmlFor="basicDetails-mobile">
                            Mobile Number
                        </label>
                        <div>
                        <input required placeholder="Mobile Number" type='tel' maxLength={10} id='basicDetails-mobile' name='phone_no' className="form-control" value={formData?.phone_no ?? ''} onChange={handleInputChange} disabled={id}/>
                        <p className={`text-danger text-left m-0 font-small-1 ${ errors.phone_no ? 'visible' : 'invisible'}`}>
                                {errors.phone_no}
                            </p>
                        </div>
                    </Col>
                    <Col md={6} lg={4} className="mt-1">
                        <label htmlFor="basicDetails-alt-mobile">
                            Alternate Mobile Number
                        </label>
                        <div>
                        <input placeholder="Alternate Mobile Number" type='tel' maxLength={10} id='basicDetails-alt-mobile' name='phone_no2' className="form-control" value={formData?.phone_no2 ?? ''} onChange={handleInputChange} />
                        <p className={`text-danger text-left m-0 font-small-1 ${ errors.phone_no2 ? 'visible' : 'invisible'}`}>
                                {errors.phone_no2}
                            </p>
                        </div>
                    </Col>
                    <Col md={6} lg={4} className="mt-1">
                        <label htmlFor="basicDetails-landline">
                            Landline Number
                        </label>
                        <div>
                        <input placeholder="Landline Number" type='tel' maxLength={10} id='basicDetails-landline' name='landline1' className="form-control" value={formData?.landline1 ?? ''} onChange={handleInputChange} />
                        <p className={`text-danger text-left m-0 font-small-1 ${ errors.landline1 ? 'visible' : 'invisible'}`}>
                                {errors.landline1}
                            </p>
                        </div>
                    </Col>
                    <Col md={6} lg={4} className="mt-1">
                        <label htmlFor="basicDetails-alt-landline">
                            Alternate Landline Number
                        </label>
                        <div>
                        <input required placeholder="Alternate Landline Number" type='tel' maxLength={10} pattern="[789][0-9]{9}" id='basicDetails-alt-landline' name='landline2' className="form-control" value={formData?.landline2 ?? ''} onChange={handleInputChange} />
                        <p className={`text-danger text-left m-0 font-small-1 ${ errors.landline2 ? 'visible' : 'invisible'}`}>
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
                            onChange={(e) => handleInputChange(e, 'dropdown')}
                            closeMenuOnSelect={true}
                        />
                    </Col>
                    {formData?.dropdown === 'privi_group' && <Col md={6} lg={4} className="mt-1">
                        <label htmlFor="basicDetails-privilegedCustomerGroup" style={{ margin: '0px' }}>
                            Customer Group
                        </label>
                        <Select
                            id="basicDetails-privilegedCustomerGroup"
                            options={customerTypeOptions}
                            // value={customerTypeOptions.find(option => option.value === formData.)}
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
                            options={options}
                            value={options.find(option => option.value === formData.cust_source_dropdown) ?? ''}
                            onChange={(e) => handleInputChange(e, 'cust_source_dropdown')}
                            closeMenuOnSelect={true}
                        />
                    </Col>
                    <div className='d-flex justify-content-between mt-1'>
                        <div>
                            <button className="btn btn-primary" type="button">Back</button>
                            <button className="btn btn-primary ms-2" type="button">Cancel</button>
                        </div>
                        <div>
                            {/* <button className="btn btn-primary" type="submit" onClick={handleSubmitSection1}>Save</button>
                                <button className="btn btn-primary ms-2" type="button">Save & Close</button> */}
                            <button className="btn btn-primary ms-2" type="button" onClick={handleNext}>Next</button>
                        </div>
                    </div>
                </Row>
                {/* </form> */}
            </Container>
        </>
    )
}

export default CustomersAddCustomer