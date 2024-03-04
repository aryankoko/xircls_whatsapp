import React, { useState } from 'react'
import { Card, CardBody, Col, FormGroup, Input, InputGroup, InputGroupText, Label, Row } from 'reactstrap'
import { Edit } from 'react-feather'
import toast from 'react-hot-toast'
import { ownUrl } from '../../../Validator'
import { Link } from 'react-router-dom'

const IdentityProof = ({ AllFormData }) => {
  const { handleInputChange, userData, postData } = AllFormData
  // const [editMode, setEditMode] = useState(false)

  const adharImageUrlFromAPI = userData?.aadhar_pdf_file ? `${ownUrl}${userData.aadhar_pdf_file}` : null

  const panImageUrlFromAPI = userData?.pan_pdf_file ? `${ownUrl}${userData.pan_pdf_file}` : null

  const [adharImageUrl, setAdharImageUrl] = useState(adharImageUrlFromAPI)
  const [panImageUrl, setPanImageUrl] = useState(panImageUrlFromAPI)
  const editMode = false
  // const handleEditClick = () => {
  //   // setEditMode(!editMode)

  //   // setAdharImageUrl(adharImageUrlFromAPI)
  //   // setPanImageUrl(panImageUrlFromAPI)
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
                <Col md='12 d-flex justify-content-between align-items-center'>
                  <h4>Identity proofs</h4>
                  <Link to={`/merchant/customers/edit_customer/${userData?.id}?type=edit`}>
                    <Edit size='15px' cursor='pointer' />
                  </Link>
                </Col>
              </Row>

              <Row className='mt-1'>
                <Col md='4'>
                  <FormGroup>
                    <Label for="aadhar">
                      Aadhar Number
                    </Label>
                    <Input
                      id="aadhar"
                      name="Adharcard"
                      type="text"
                      placeholder="Aadhar Card Number"
                      value={userData?.Adharcard ?? ''}
                      disabled={!editMode}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                </Col>

                <Col md='4'>
                  <FormGroup>
                    <Label for="aadhar_img">
                      Upload Aadhar Card Image
                    </Label>
                    <Input
                      id="aadhar_img"
                      name="aadhar_pdf_file"
                      type="file"
                      disabled={!editMode}
                      onChange={(e) => {
                        handleInputChange(e, 'file')
                        const file = e.target.files[0]
                        if (file && file.type.startsWith('image/')) {
                          setAdharImageUrl(URL.createObjectURL(file))
                        } else {
                          toast.error('Please select image format')
                        }
                      }}

                    />
                  </FormGroup>
                </Col>

                {
                  adharImageUrl
                  && (
                    <Col md='4' className='d-flex justify-content-center align-items-center mb-1'>
                      <div>
                        <img className='image_viewer' width="210px" height="110px" src={adharImageUrl} alt="Aadhar" />
                      </div>
                    </Col>
                  )
                }

              </Row>

              <Row>
                <Col md='4'>
                  <FormGroup>
                    <Label for="pan">
                      PAN
                    </Label>
                    <Input
                      id="pan"
                      name="pancard"
                      type="text"
                      value={userData?.pancard ?? ''}
                      disabled={!editMode}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                </Col>

                <Col md='4'>
                  <FormGroup>
                    <Label for="pan_img">
                      Upload PAN Card Image
                    </Label>
                    <Input
                      id="pan_img"
                      name="pan_pdf_file"
                      type="file"
                      disabled={!editMode}
                      onChange={(e) => {
                        handleInputChange(e, 'file')
                        const file = e.target.files[0]
                        if (file && file.type.startsWith('image/')) {
                          setPanImageUrl(URL.createObjectURL(file))
                        } else {
                          toast.error('Please select image format')
                        }
                      }}
                    />
                  </FormGroup>
                </Col>

                {
                  panImageUrl
                  && (
                    <Col md='4' className='d-flex justify-content-center align-items-center mt-1 mb-1'>
                      <div>
                        <img className='image_viewer' width="210px" height="110px" src={panImageUrl} alt="Pan" />
                      </div>
                    </Col>
                  )
                }
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
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default IdentityProof