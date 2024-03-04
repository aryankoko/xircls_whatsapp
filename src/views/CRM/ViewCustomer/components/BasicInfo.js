import React from 'react'
import { Card, CardBody, Col, FormGroup, Input, Label, Row } from 'reactstrap'
import { Edit } from 'react-feather'
import Select from 'react-select'
import { Link } from 'react-router-dom'

const BasicInfo = ({ AllFormData }) => {

    const { userData, handleInputChange, postData } = AllFormData

    const titleOptions = [
        { value: "mr", label: "Mr." },
        { value: "ms", label: "Ms." },
        { value: "mrs", label: "Mrs." },
        { value: "dr", label: "Dr." },
        { value: "prof", label: "Prof." }
    ]

    const dropdownOptions = [
        { value: 'regular', label: 'Regular Customer' },
        { value: 'privi_group', label: 'Privileged Customer' }
    ]

    const customerTypeOptions = [{ value: 'customerGroup', label: 'Select Privileged Customer Group' }]

    // const [editMode, setEditMode] = useState(false)
    const editMode = false
    // const handleEditClick = () => {
        // setEditMode(!editMode)
    // }

    console.log(userData, "kk")
    return (
        <>
            <style>
                {`
                    input::-webkit-outer-spin-button,
                    input::-webkit-inner-spin-button {
                      -webkit-appearance: none !important;
                      margin: 0;
                    }
                    
                    /* Firefox */
                    input[type=number] {
                      -moz-appearance: textfield;
                    }
                    
                `}
            </style>

            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <Row>
                                <Col md='12 d-flex justify-content-between align-items-center'>
                                    <h4>Basic Details</h4>
                                    <Link to={`/merchant/customers/edit_customer/${userData?.id}?type=edit`}>
                                        <Edit size='15px' cursor='pointer' />
                                    </Link>
                                </Col>
                            </Row>

                            <Row className='mt-1'>
                                <Col md='4'>
                                    <FormGroup>
                                        <Label for="title">
                                            Title
                                        </Label>
                                        <Select
                                            isDisabled={!editMode}
                                            options={titleOptions}
                                            value={titleOptions.find(option => option.value === userData.title)}
                                            onChange={e => handleInputChange(e, 'title')}
                                        />
                                    </FormGroup>
                                </Col>

                                <Col md='4'>
                                    <FormGroup>
                                        <Label for="first_name">
                                            First Name
                                        </Label>
                                        <Input
                                            id="first_name"
                                            name="cust_first_name"
                                            type="text"
                                            disabled={!editMode}
                                            value={userData.cust_first_name}
                                            onChange={handleInputChange}
                                        />
                                    </FormGroup>
                                </Col>

                                <Col md='4'>
                                    <FormGroup>
                                        <Label for="last_name">
                                            Last Name
                                        </Label>
                                        <Input
                                            id="last_name"
                                            name="cust_last_name"
                                            type="text"
                                            disabled={!editMode}
                                            value={userData.cust_last_name}
                                            onChange={handleInputChange}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md='4'>
                                    <FormGroup>
                                        <Label for="email">
                                            E-mail
                                        </Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            disabled
                                            value={userData.email}
                                            onChange={handleInputChange}
                                        />
                                    </FormGroup>
                                </Col>

                                <Col md='4'>
                                    <FormGroup>
                                        <Label for="number">
                                            Mobile Number
                                        </Label>
                                        <Input
                                            id="number"
                                            name="phone_no"
                                            type="number"
                                            disabled
                                            value={userData.phone_no}
                                            onChange={handleInputChange}
                                        />
                                    </FormGroup>
                                </Col>

                                <Col md='4'>
                                    <FormGroup>
                                        <Label for="alt_number">
                                            Alternate Mobile Number
                                        </Label>
                                        <Input
                                            id="alt_number"
                                            name="phone_no2"
                                            type="number"
                                            disabled={!editMode}
                                            value={userData.phone_no2}
                                            onChange={handleInputChange}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md='4'>
                                    <FormGroup>
                                        <Label for="land_number">
                                            Landline Number
                                        </Label>
                                        <Input
                                            id="land_number"
                                            name="landline1"
                                            type="number"
                                            disabled={!editMode}
                                            value={userData.landline1}
                                            onChange={handleInputChange}
                                        />
                                    </FormGroup>
                                </Col>

                                <Col md='4'>
                                    <FormGroup>
                                        <Label for="alt_land_number">
                                            Alternate Landline Number
                                        </Label>
                                        <Input
                                            id="alt_land_number"
                                            name="landline2"
                                            type="number"
                                            disabled={!editMode}
                                            value={userData.landline2}
                                            onChange={handleInputChange}
                                        />
                                    </FormGroup>
                                </Col>

                                <Col md={4}>
                                    <label htmlFor="basicDetails-customerType" style={{ margin: '0px' }}>
                                        Customer Type
                                    </label>
                                    <Select
                                        id="basicDetails-customerType"
                                        options={dropdownOptions}
                                        value={dropdownOptions.find(option => option.value === userData.dropdown) ?? ''}
                                        // value={dropdownOptions[0]} // Set the default value to 'regular'   -- dropdownOptions.find(option => option.value === formData.dropdown) || --
                                        onChange={(e) => handleInputChange(e, 'dropdown')}
                                        closeMenuOnSelect={true}
                                        isDisabled={!editMode}
                                    />
                                    <p id="basicDetails-customerType_val" className="text-danger m-0 p-0 vaildMessage"></p>
                                </Col>
                            </Row>
                            <Row>
                                {userData?.dropdown === 'privi_group' && <Col md={4} className="mt-1">
                                    <label htmlFor="basicDetails-privilegedCustomerGroup" style={{ margin: '0px' }}>
                                        Customer Group
                                    </label>
                                    <Select
                                        id="basicDetails-privilegedCustomerGroup"
                                        options={customerTypeOptions}
                                        value={customerTypeOptions.find(option => option.value === userData.cust_status_dropdown)}
                                        onChange={(e) => handleInputChange(e, 'customerType')}
                                        closeMenuOnSelect={true}
                                        disabled={!editMode}
                                    />
                                </Col>}
                            </Row>
                            <Row>
                                <Col md='12 d-flex justify-content-between mb-3'>
                                    {editMode && (
                                        <>
                                            <button className='btn btn-primary mx-1' >Back</button>
                                            <button className='btn btn-primary mx-1' type='button' onClick={postData}>Save</button>
                                        </>
                                    )}
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

        </>
    )
}

export default BasicInfo