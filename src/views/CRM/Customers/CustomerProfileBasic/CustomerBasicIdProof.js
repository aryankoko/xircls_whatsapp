import React from "react"
import toast from "react-hot-toast"
import { Container, Card, CardBody, Row, Col, Label, FormGroup, Input } from "reactstrap"
// import "../CustomerProfile.css"

const CustomerBasicIdProof = ({ allData }) => {
  const {
    formData,
    handleInputChange
    // handleNext
    // handleSubmitSection3,
    // handleBack
  } = allData

  return (
    <>
      <Container fluid className="px-0 py-1">
        <Row>
          <Col md={12} className="mt-2">
            <h4 className="mb-0">Identity Proofs</h4>
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
              onChange={handleInputChange}
            />
          </Col>
          <Col md={6} className="mt-2">
            <label>Upload Aadhar Card Image</label>
            {/* <div className="gap-1 d-flex justify-content-start align-items-center w-100"> */}
            {/* <span className="mx-1">{formData?.aadhar_pdf_file?.name || formData?.aadhar_pdf_file || 'Aadhar Card'}</span> */}
            {/* <input
                name="aadhar_pdf_file"
                type="file"
                id="idproof-aadhar"
                className="d-none" */}
            {/* // value={formData?.aadhar_pdf_file}
                onChange={(e) => handleInputChange(e, 'file')}
              /> */}
            {/* <label
                className="btn btn-outline-primary w-25"
                htmlFor="idproof-aadhar"
              >
                Upload File
              </label>
            </div> */}

            <FormGroup>
              <Input
                id="idproof-aadhar"
                name="aadhar_pdf_file"
                type="file"
                className="w-50"
                // disabled={!editMode}
                onChange={(e) => {
                  handleInputChange(e, 'file')
                  const file = e.target.files[0]
                  if (file && file.type.startsWith('image/')) {
                    toast.success('Image Uploaded Successfully')
                  } else {
                    toast.error('Please select image format')
                  }
                }}

              />
            </FormGroup>


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
            {/* <div className="gap-1 d-flex d-flex justify-content-start align-items-center"> */}
            {/* <span className="mx-1">{formData?.pan_pdf_file?.name || formData?.pan_pdf_file || 'Pan Card'}</span> */}
            {/* <input
                name="pan_pdf_file"
                type="file"
                id="idproof-pan"
                className="d-none" */}
            {/* // value={formData?.pan_pdf_file}
                onChange={(e) => handleInputChange(e, 'file')}
              />
              <label
                htmlFor="idproof-pan"
                className="btn btn-outline-primary w-25"
              >
                Upload File
              </label>
            </div> */}

            <FormGroup>
              <Input
                id="idproof-pan"
                name="pan_pdf_file"
                type="file"
                className="w-50"
                // disabled={!editMode}
                onChange={(e) => {
                  handleInputChange(e, 'file')
                  const file = e.target.files[0]
                  if (file && file.type.startsWith('image/')) {
                    toast.success('Image Uploaded Successfully')
                  } else {
                    toast.error('Please select image format')
                  }
                }}

              />
            </FormGroup>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default CustomerBasicIdProof
