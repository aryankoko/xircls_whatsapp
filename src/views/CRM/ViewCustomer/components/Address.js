import React, { useState } from 'react'
import { Card, CardBody, Col, FormGroup, Input, InputGroup, InputGroupText, Label, Row } from 'reactstrap'
import { Edit } from 'react-feather'
import Select from 'react-select'
import { Link } from 'react-router-dom'

const Address = ({ AllFormData }) => {
  const { handleInputChange, userData, postData } = AllFormData
  // const [editMode, setEditMode] = useState(false)
  const [sameBillingAddress, setSameBillingAddress] = useState(false)
  const editMode = false
  // const handleEditClick = () => {
  //   setEditMode(!editMode)
  // }

  const handleSameBillingAddressChange = () => {
    setSameBillingAddress(!sameBillingAddress)

    // If checked, copy Billing Address to Shipping Address
    if (!sameBillingAddress) {
      handleInputChange({ target: { name: 'shipping_address1', value: userData.address_line1 } })
      handleInputChange({ target: { name: 'shipping_address2', value: userData.address_line2 } })
      handleInputChange({ target: { name: 'shipping_area_building', value: userData.area_building } })
      handleInputChange({ target: { name: 'shipping_landmark', value: userData.landmark } })
      handleInputChange({ target: { name: 'shipping_city', value: userData.city } })
      handleInputChange({ target: { name: 'shipping_state', value: userData.state } })
      handleInputChange({ target: { name: 'shipping_pincode', value: userData.pincode } })
      handleInputChange({ target: { name: 'shipping_country', value: userData.country } })
    } else {

      // If unchecked, clear Shipping Address fields
      handleInputChange({ target: { name: 'shipping_address1', value: '' } })
      handleInputChange({ target: { name: 'shipping_address2', value: '' } })
      handleInputChange({ target: { name: 'shipping_area_building', value: '' } })
      handleInputChange({ target: { name: 'shipping_landmark', value: '' } })
      handleInputChange({ target: { name: 'shipping_city', value: '' } })
      handleInputChange({ target: { name: 'shipping_state', value: '' } })
      handleInputChange({ target: { name: 'shipping_pincode', value: '' } })
      handleInputChange({ target: { name: 'shipping_country', value: null } })
    }
  }

  const country = [
    { value: 'India', label: 'India' },
    { value: 'USA', label: 'USA' }
  ]
  return (
    <>
      <style>
        {`
                input::-webkit-outer-spin-button,
                input::-webkit-inner-spin-button {
                  -webkit-appearance: none !important
                  margin: 0
                }
                
                /* Firefox */
                input[type=number] {
                  -moz-appearance: textfield
                }
                
            `}
      </style>

      <Row>
        <Col>
          <Card>
            <CardBody>
              <Row>
                <Col md='12' className='d-flex justify-content-between align-items-center'>
                  <h4>Billing Address</h4>
                  <Link to={`/merchant/customers/edit_customer/${userData?.id}?type=edit`}>
                    <Edit size='15px' cursor='pointer' />
                  </Link>
                </Col>
              </Row>

              <Row className='mt-1'>
                <Col md='4'>
                  <FormGroup>
                    <Label for="building">
                      Flat and/or Building/House Details
                    </Label>
                    <Input
                      id="building"
                      name="address_line1"
                      type="text"
                      value={userData.address_line1}
                      disabled={!editMode}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                </Col>

                <Col md='4'>
                  <FormGroup>
                    <Label for="street">
                      Street, Lane or Road
                    </Label>
                    <Input
                      id="street"
                      name="address_line2"
                      type="text"
                      value={userData.address_line2}
                      disabled={!editMode}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                </Col>

                <Col md='4'>
                  <FormGroup>
                    <Label for="area">
                      Enter Area, Locality or Suburb e.g. Bandra
                    </Label>
                    <Input
                      id="area"
                      name="area_building"
                      type="text"
                      value={userData.area_building}
                      disabled={!editMode}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md='4'>
                  <FormGroup>
                    <Label for="landmark">
                      Landmark
                    </Label>
                    <Input
                      id="landmark"
                      name="landmark"
                      type="text"
                      value={userData.landmark}
                      disabled={!editMode}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                </Col>

                <Col md='4'>
                  <FormGroup>
                    <Label for="city">
                      City
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      type="text"
                      value={userData.city}
                      disabled={!editMode}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                </Col>

                <Col md='4'>
                  <FormGroup>
                    <Label for="state">
                      State
                    </Label>
                    <Input
                      id="state"
                      name="state"
                      type="text"
                      value={userData.state}
                      disabled={!editMode}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                </Col>

              </Row>

              <Row>
                <Col md='4'>
                  <FormGroup>
                    <Label for="pincode">
                      Pincode
                    </Label>
                    <Input
                      id="pincode"
                      name="pincode"
                      type="text"
                      value={userData.pincode}
                      disabled={!editMode}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                </Col>

                <Col md='4'>
                  <FormGroup>
                    <Label for="country">
                      Country
                    </Label>
                    <Select
                      isDisabled={!editMode}
                      onChange={e => handleInputChange(e, 'country')}
                      value={country.find(option => option.value === userData.country)}
                      options={country}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md='12' className='d-flex justify-content-end align-items-center'>
                  <FormGroup className='d-flex justify-content-center align-items-start gap-1'>
                    <Label for='sameBillingAddress' className='fs-6'>
                      Same as Billing Address
                    </Label>
                    <Input
                      className='form-control'
                      id='sameBillingAddress'
                      type='checkbox'
                      checked={sameBillingAddress}
                      onChange={handleSameBillingAddressChange}
                      disabled={!editMode}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md='12'>
                  <h4>Shipping Address</h4>
                </Col>
              </Row>

              <Row>
                <Col md='4'>
                  <FormGroup>
                    <Label for="building">
                      Flat and/or Building/House Details
                    </Label>
                    <Input
                      id="building"
                      name="shipping_address1"
                      type="text"
                      value={userData.shipping_address1}
                      disabled={!editMode}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                </Col>

                <Col md='4'>
                  <FormGroup>
                    <Label for="street">
                      Street, Lane or Road
                    </Label>
                    <Input
                      id="street"
                      name="shipping_address2"
                      type="text"
                      value={userData.shipping_address2}
                      disabled={!editMode}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                </Col>

                <Col md='4'>
                  <FormGroup>
                    <Label for="area">
                      Enter Area, Locality or Suburb e.g. Bandra
                    </Label>
                    <Input
                      id="area"
                      name="shipping_area_building"
                      type="text"
                      value={userData.shipping_area_building}
                      disabled={!editMode}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md='4'>
                  <FormGroup>
                    <Label for="landmark">
                      Landmark
                    </Label>
                    <Input
                      id="landmark"
                      name="shipping_landmark"
                      type="text"
                      value={userData.shipping_landmark}
                      disabled={!editMode}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                </Col>

                <Col md='4'>
                  <FormGroup>
                    <Label for="city">
                      City
                    </Label>
                    <Input
                      id="city"
                      name="shipping_city"
                      type="text"
                      value={userData.shipping_city}
                      disabled={!editMode}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                </Col>

                <Col md='4'>
                  <FormGroup>
                    <Label for="state">
                      State
                    </Label>
                    <Input
                      id="state"
                      name="shipping_state"
                      type="text"
                      value={userData.shipping_state}
                      disabled={!editMode}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                </Col>

              </Row>

              <Row>
                <Col md='4'>
                  <FormGroup>
                    <Label for="pincode">
                      Pincode
                    </Label>
                    <Input
                      id="pincode"
                      name="shipping_pincode"
                      type="text"
                      value={userData.shipping_pincode}
                      disabled={!editMode}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                </Col>

                <Col md='4'>
                  <FormGroup>
                    <Label for="pincode">
                      Country
                    </Label>
                    <Select
                      isDisabled={!editMode}
                      options={country}
                      value={country.find(option => option.value === userData.country)}
                      onChange={e => handleInputChange(e, 'country')}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md='12 d-flex justify-content-between mb-3'>
                  {editMode && (
                    <>
                      <button className='btn btn-primary mx-1'>Back</button>
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

export default Address