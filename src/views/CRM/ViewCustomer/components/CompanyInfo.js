import React from 'react'
import { Twitter, Facebook, Instagram, Edit } from 'react-feather'
import { Link } from 'react-router-dom'
import { Card, CardBody, Col, FormGroup, Input, InputGroup, InputGroupText, Label, Row } from 'reactstrap'

const CompanyInfo = ({ AllFormData }) => {

  const { handleInputChange, userData, postData } = AllFormData
  // const [editMode, setEditMode] = useState(false)
  const editMode = false
  // const handleEditClick = () => {
  //   setEditMode(!editMode)
  // }
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
                <Col md='12' className='d-flex justify-content-between align-items-center'>
                  <h4>Company Details</h4>
                  <Link to={`/merchant/customers/edit_customer/${userData?.id}?type=edit`}>
                    <Edit size='15px' cursor='pointer' />
                  </Link>
                </Col>
              </Row>
              {userData?.associated_accounts.map((company, index) => (
                <>
                  <Row className='mt-1'>
                    <Col md='12'>
                      <h4>{`Company ${index + 1}`}</h4>
                    </Col>
                  </Row>
                  <Row className='mt-1'>
                    <Col md='4'>
                      <FormGroup>
                        <Label for="name">
                          Name
                        </Label>
                        <Input
                          id="name"
                          name="company"
                          type="text"
                          value={company?.company_name}
                          disabled={!editMode}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>

                    <Col md='4'>
                      <FormGroup>
                        <Label for="industry">
                          Industry
                        </Label>
                        <Input
                          id="industry"
                          name="industry"
                          type="text"
                          value={userData?.associated_accounts[0]?.industry}
                          disabled={!editMode}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>

                    <Col md='4'>
                      <FormGroup>
                        <Label for="gst_number">
                          GST Number
                        </Label>
                        <Input
                          id="gst_number"
                          name="cust_gst_no"
                          type="text"
                          value={userData?.associated_accounts[0]?.company_gst}
                          disabled={!editMode}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md='4'>
                      <FormGroup>
                        <Label for="c_phone">
                          Company Phone
                        </Label>
                        <Input
                          id="c_phone"
                          name="company_phone"
                          type="number"
                          value={userData?.associated_accounts[0]?.company_phone}
                          disabled={!editMode}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>

                    <Col md='4'>
                      <FormGroup>
                        <Label for="c_email">
                          Company Email
                        </Label>
                        <Input
                          id="c_email"
                          name="company_email"
                          type="email"
                          value={userData?.associated_accounts[0]?.company_email}
                          disabled={!editMode}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>

                    <Col md='4'>
                      <FormGroup>
                        <Label for="c_website">
                          Company Website
                        </Label>
                        <Input
                          id="c_website"
                          name="company_website"
                          type="text"
                          value={userData?.associated_accounts[0]?.company_website}
                          disabled={!editMode}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>

                  </Row>

                  <Row>
                    <Col md='4'>
                      <FormGroup>
                        <Label for="c_pan">
                          Company PAN Card Number
                        </Label>
                        <Input
                          id="c_pan"
                          name="company_pancard"
                          type="text"
                          value={userData?.associated_accounts[0]?.company_pancard}
                          disabled={!editMode}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>

                    <Col md='4' className='d-none'>
                      <FormGroup>
                        <Label for="relation">
                          Relation
                        </Label>
                        <Input
                          id="relation"
                          name="relation"
                          type="text"
                          disabled={!editMode}
                          onChange={handleInputChange}
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
                          <Twitter size='15px' />
                        </InputGroupText>
                        <Input
                          type='text'
                          name='company_twitter'
                          value={userData?.company_twitter}
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
                          <Facebook size='15px' />
                        </InputGroupText>
                        <Input
                          type='text'
                          name='company_fb'
                          value={userData?.company_fb}
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
                          <Instagram size='15px' />
                        </InputGroupText>
                        <Input
                          type='text'
                          name='company_insta'
                          value={userData?.company_insta}
                          disabled={!editMode}
                          onChange={handleInputChange}
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md='12 d-flex justify-content-between mb-3'>
                      {editMode && (
                        <>
                          <button className='btn btn-primary mx-1'>Back</button>
                          <button className='btn btn-primary mx-1' onClick={postData}>Save</button>
                        </>
                      )}
                    </Col>
                  </Row>
                </>
              ))}
            </CardBody>
          </Card>
        </Col>

      </Row>
    </>
  )
}

export default CompanyInfo