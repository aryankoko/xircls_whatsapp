import React, { useState } from 'react'
import { Card, CardBody, Col, FormGroup, Input, InputGroup, InputGroupText, Label, Row } from 'reactstrap'
import { Twitter, Facebook, Instagram, Edit } from 'react-feather'
import Select from 'react-select'
import moment from 'moment'
import { Link } from 'react-router-dom'

const PersonalInfo = ({ AllFormData }) => {

  const { handleInputChange, userData, postData } = AllFormData

  const [personalInfo, setPersonalInfo] = useState({
    children: "No"
  })

  // const handleChildrenChange = (e) => {
  //   setPersonalInfo({
  //     ...personalInfo,
  //     children: e.target.value
  //   })
  // }

  const marital_status = [
    { value: "married", label: "Married" },
    { value: "single", label: "Single" },
    { value: "inRelationship", label: "In Relationship" },
    { value: "divorced", label: "Divorced" },
    { value: "widowed", label: "Widowed" }
  ]

  const occupation = [
    { value: "Employed", label: "Employed" },
    { value: "Business_Owner", label: "Business Owner" },
    { value: "retired professional", label: "Retired Professional" },
    { value: "student", label: "Student" },
    { value: "homemaker", label: "Homemaker" }
  ]

  const gender = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" }
  ]

  const children = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" }
  ]

  // const [editMode, setEditMode] = useState(false)
  const editMode = false
  // const handleEditClick = () => {
  //   setEditMode(!editMode)
  // }
  console.log(setPersonalInfo)

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
                  <h4>Personal Details</h4>
                  <Link to={`/merchant/customers/edit_customer/${userData?.id}?type=edit`}>
                    <Edit size='15px' cursor='pointer' />
                  </Link>
                </Col>
              </Row>

              <Row className='mt-1'>
                <Col md='4'>
                  <FormGroup>
                    <Label for="dob">
                      Date Of Birth
                    </Label>
                    <Input
                      id="dob"
                      name="dob"
                      type="date"
                      disabled={!editMode}
                      value={moment(userData.cust_dob).format("YYYY-MM-DD")}
                    />
                  </FormGroup>
                </Col>

                <Col md='4'>
                  <FormGroup>
                    <Label for="gender">
                      Gender
                    </Label>
                    <Select
                      isDisabled={!editMode}
                      options={gender}
                      value={gender.find(option => option.value === userData.gender)}
                      onChange={e => handleInputChange(e, 'gender')}
                    />
                  </FormGroup>
                </Col>

                <Col md='4'>
                  <FormGroup>
                    <Label for="last_name">
                      Marital Status
                    </Label>
                    <Select
                      options={marital_status}
                      value={marital_status?.filter((curElem) => userData?.marital_status === curElem?.value)}
                      isDisabled={!editMode}
                      onChange={e => handleInputChange(e, 'marital_status')}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md='4'>
                  <FormGroup>
                    <Label for="children">Children</Label>
                    <Select
                      options={children}
                      value={children.find(option => option.value === userData.children)}
                      onChange={e => handleInputChange(e, 'children')}
                      isDisabled={!editMode}
                    />
                  </FormGroup>
                </Col>

                {personalInfo.children !== "no" && (
                  <Col md='4'>
                    <FormGroup>
                      <Label for="count">Count</Label>
                      <Input
                        id="count"
                        type="number"
                        name='NO_Of_Children'
                        value={userData.NO_Of_Children}
                        onChange={handleInputChange}
                        disabled={!editMode}
                      />

                    </FormGroup>
                  </Col>
                )}

                <Col md='4'>
                  <FormGroup>
                    <Label for="occupation">
                      Occupation
                    </Label>
                    <Select
                      isDisabled={!editMode}
                      options={occupation}
                      value={occupation.find(option => option.value === userData.occupation)}
                      onChange={e => handleInputChange(e, 'occupation')}
                    />
                  </FormGroup>
                </Col>

                <Col md='4'>
                  <FormGroup>
                    <Label for="designation">
                      Designation
                    </Label>
                    <Input
                      id="designation"
                      name="designation"
                      type="text"
                      value={userData.designation}
                      disabled={!editMode}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md='12'>
                  <h4>Social Presence</h4>
                </Col>
              </Row>

              <Row>
                <Col md='4'>
                  <Label for="twitter">
                  </Label>
                  <InputGroup>
                    <InputGroupText>
                      <Twitter size='18px' />
                    </InputGroupText>
                    <Input
                      type='text'
                      value={userData.social_twitter}
                      name="social_twitter"
                      disabled={!editMode}
                      onChange={handleInputChange}
                    />
                  </InputGroup>
                </Col>

                <Col md='4'>
                  <Label for="facebook">
                    Facebook
                  </Label>
                  <InputGroup>
                    <InputGroupText>
                      <Facebook size='18px' />
                    </InputGroupText>
                    <Input
                      type='text'
                      name='social_fb'
                      value={userData.social_fb}
                      disabled={!editMode}
                      onChange={handleInputChange}
                    />
                  </InputGroup>
                </Col>

                <Col md='4'>
                  <Label for="instagram">
                    Instagram
                  </Label>
                  <InputGroup>
                    <InputGroupText>
                      <Instagram size='18px' />
                    </InputGroupText>
                    <Input
                      type='text'
                      name='social_insta'
                      value={userData.social_insta}
                      disabled={!editMode}
                      onChange={handleInputChange}
                    />
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col md='12 d-flex justify-content-between mt-3'>
                  {editMode && (
                    <>
                      <button className='btn btn-primary mx-1'>Back</button>
                      <button className='btn btn-primary mx-1' onClick={postData}>Save</button>
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

export default PersonalInfo

