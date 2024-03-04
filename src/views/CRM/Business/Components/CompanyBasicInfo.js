import React from 'react'
import { Container, Row, Col, Card, CardBody, Label, Input, Button } from 'reactstrap'
import Select from "react-select"

/* eslint-disable */
const CompanyBasicInfo = ({ allData }) => {

  const { formData, handleNext, handleInputChange } = allData

  const relationOptions = [
    { value: 'Business', label: 'Client' },
    { value: 'Retail', label: 'Retail' },
    { value: 'Dealer', label: 'Dealer' },
    { value: 'Distributor', label: 'Distributor' },
    { value: 'Manufacturer', label: 'Manufacturer' },
    { value: 'Vendor', label: 'Vendor' }
  ]

  return (
    <Container fluid className="px-0 py-1">
      <Row className="mt-2">
        <Col md={12} className='d-flex justify-content-between'>
          <h4 className="mb-0">Subsidiary Company Details</h4>
          <div>
            <span className="form-check form-check-success">
              <input
                type="checkbox"
                id="mark-company"
                className="form-check-input"
                name="mark_parent"
                checked={formData?.mark_parent}
                onChange={handleInputChange}
              />
              <label htmlFor="mark-company">Mark as Parent Company</label>
            </span>
          </div>
        </Col>
        <Col md={6} lg={4} className="mt-1">
          <label htmlFor="company-name ">
            Company Name
          </label>
          <input placeholder="Company Name" type='text' id='company-name' name='company_name' className="form-control "
            value={formData?.company_name ?? ''}
            onChange={handleInputChange}
          />
          <p id="company_name_val" className="text-danger m-0 p-0 vaildMessage"></p>
        </Col>
        <Col md={6} lg={4} className="mt-1">
          <label htmlFor="industry">
            Industry
          </label>
          <input placeholder="Industry" type='text' id='industry' name='industry' className="form-control "
            value={formData?.industry ?? ''}
            onChange={handleInputChange}
          />
          <p id="industry_val" className="text-danger m-0 p-0 vaildMessage"></p>

        </Col>
        <Col md={6} lg={4} className="mt-1">
          <label htmlFor="GSTIN-Number">
            GSTIN Number
          </label>
          <input placeholder="GSTIN Number" type='text' id='GSTIN-Number' name='company_gst' className="form-control "
            value={formData?.company_gst ?? ''}
            onChange={handleInputChange}
          />
        </Col>
        <Col md={6} lg={4} className="mt-1">
          <label htmlFor="PAN-Card-Number">
            PAN Card Number
          </label>
          <input placeholder="PAN Card Number" type='text' id='PAN-Card-Number' name='company_pancard' className="form-control "
            value={formData?.company_pancard ?? ''}
            onChange={handleInputChange}
          />
        </Col>
        <Col md={6} lg={4} className="mt-1">
          <label htmlFor="Company-Phone">
            Company Phone
          </label>
          <input placeholder="Company Phone" type='tel' maxLength={10} id='Company-Phone' name='company_phone' className="form-control "
            value={formData?.company_phone ?? ''}
            // onChange={handleInputChange}
            onChange={(e) => {
              if (!isNaN(e.target.value)) {
                handleInputChange(e)
                console.log("this is a number")
              }
            }}
          />
          <p id="company_phone_val" className="text-danger m-0 p-0 vaildMessage"></p>

        </Col>
        <Col md={6} lg={4} className="mt-1">
          <label htmlFor="Company-Email">
            Company Email
          </label>
          <input placeholder="Company Email" type='text' id='Company-Email' name='company_email' className="form-control "
            value={formData?.company_email ?? ''}
            onChange={handleInputChange}
          />
          <p id="company_email_val" className="text-danger m-0 p-0 vaildMessage"></p>

        </Col>
        <Col md={6} lg={4} className="mt-1">
          <label htmlFor="Company-Website">
            Company Website
          </label>
          <input placeholder="Company Website" type='text' id='Company-Website' name='company_website' className="form-control "
            value={formData?.company_website ?? ''}
            onChange={handleInputChange}
          />
        </Col>
        <Col md={6} lg={4} className="mt-1">
          <label htmlFor="relation" style={{ margin: '0px' }}>
            Relation
          </label>
          <Select
            id="relation"
            options={relationOptions}
            closeMenuOnSelect={true}
            value={relationOptions.find(option => option.value === formData.type) ?? ''}
            onChange={(e) => handleInputChange(e, 'type')}
          />
        </Col>
      </Row>
      {!formData.mark_parent &&
        <Row className="mt-2">
          <Col md={12} >
            <h4 className="mb-0">Parent Company Details</h4>
          </Col>
          <Col md={6} lg={4} className="mt-1">
            <label htmlFor="company-name2">
              Name
            </label>
            <input placeholder="Company Name" type='text' id='company-name2' name='par_company_name' className="form-control "
              value={formData?.par_company_name ?? ''}
              onChange={handleInputChange}
            />
            <p id="par_company_name_val" className="text-danger m-0 p-0 vaildMessage"></p>
          </Col>
          <Col md={6} lg={4} className="mt-1">
            <label htmlFor="industry2">
              Industry
            </label>
            <input placeholder="Industry" type='text' id='industry2' name='par_industry' className="form-control "
              value={formData?.par_industry ?? ''}
              onChange={handleInputChange}
            />
            <p id="par_industry_val" className="text-danger m-0 p-0 vaildMessage"></p>

          </Col>
          <Col md={6} lg={4} className="mt-1">
            <label htmlFor="GST-Number">
              GST Number
            </label>
            <input placeholder="GST Number" type='text' id='GST-Number' name='par_company_gst' className="form-control "
              value={formData?.par_company_gst ?? ''}
              onChange={handleInputChange}
            />
          </Col>
          <Col md={6} lg={4} className="mt-1">
            <label htmlFor="Company-PAN-Card-Number">
              Company PAN Card Number
            </label>
            <input placeholder="PAN Card Number" type='text' id='Company-PAN-Card-Number' name='par_company_pancard_name' className="form-control "
              value={formData?.par_company_pancard_name ?? ''}
              onChange={handleInputChange}
            />
          </Col>
          <Col md={6} lg={4} className="mt-1">
            <label htmlFor="Company-Phone2">
              Company Phone
            </label>
            <input placeholder="Company Phone" type='tel' maxLength={10} id='Company-Phone2' name='par_company_phone' className="form-control "
              value={formData?.par_company_phone ?? ''}
              // onChange={handleInputChange}
              onChange={(e) => {
                if (!isNaN(e.target.value)) {
                  handleInputChange(e)
                  console.log("this is a number")
                }
              }}
            />
            <p id="par_company_phone_val" className="text-danger m-0 p-0 vaildMessage"></p>

          </Col>
          <Col md={6} lg={4} className="mt-1">
            <label htmlFor="Company-Email2">
              Company Email
            </label>
            <input placeholder="Company Email" type='text' id='Company-Email2' name='par_company_email' className="form-control "
              value={formData?.par_company_email ?? ''}
              onChange={handleInputChange}
            />
            <p id="par_company_email_val" className="text-danger m-0 p-0 vaildMessage"></p>

          </Col>
          <Col md={6} lg={4} className="mt-1">
            <label htmlFor="Company-Website2">
              Company Website
            </label>
            <input placeholder="Company Website" type='text' id='Company-Website2' name='par_company_website' className="form-control "
              value={formData?.par_company_website ?? ''}
              onChange={handleInputChange}
            />
          </Col>
        </Row>
      }
      <Row>
        <div className='d-flex justify-content-between mt-1'>
          <div>
            <button className="btn btn-primary" type="button">Cancel</button>
          </div>
          <div>
            {/* <button className="btn btn-primary" type="submit" onClick={handleSubmitSection1}>Save</button>
                                <button className="btn btn-primary ms-2" type="button">Save & Close</button> */}
            <button className="btn btn-primary ms-2" type="button" onClick={handleNext}>Next</button>
          </div>
        </div>
      </Row>
    </Container>
  )
}

export default CompanyBasicInfo