import React, { useEffect, useState } from "react"
import { Container, Card, CardBody, Row, Col } from "reactstrap"
// import "../CustomerProfile.css"
import Select from "react-select"
import { getReq } from '@src/assets/auth/jwtService.js'

const CustomerBasicAddress = ({ allData }) => {
  const [country, setCountry] = useState([])

  const {
    formData,
    handleInputChange
    // handleNext,
    // handleBack
  } = allData

  const getCountries = () => {
    getReq("countries")
      .then((resp) => {
        console.log(resp)
        setCountry(
          resp.data.data.countries.map((curElem) => {
            return { value: curElem.name, label: `${curElem.name}` }
          })
        )
      })
      .catch((error) => {
        console.log(error)
      })
  }


  useEffect(() => {
    getCountries()
  }, [])

  return (
    <>
      <Container fluid className="px-0 py-1">
        <Row>
          <Col md={12} className="mt-2">
            <h4 className="mb-0">Personal Billing Address</h4>
          </Col>
          <Col md={6} lg={4} className="mt-2">
            <label htmlFor="address-1-house-details">
              Flat and / or Building / House Details
            </label>
            <input
              placeholder="Flat and / or Building / House Details"
              type="text"
              id="address-1-house-details"
              name="address_line1"
              className="form-control"
              value={formData?.address_line1 ?? ''}
              onChange={handleInputChange}
            />
          </Col>
          <Col md={6} lg={4} className="mt-2">
            <label htmlFor="address-1-lane">Street Lane or Road</label>
            <input
              placeholder="Street Lane or Road"
              type="text"
              id="address-1-lane"
              name="address_line2"
              className="form-control"
              value={formData?.address_line2 ?? ''}
              onChange={handleInputChange}
            />
          </Col>
          <Col md={6} lg={4} className="mt-2">
            <label htmlFor="address-1-locality">
              Enter Area, Locality or Suburb e.g. Bandra
            </label>
            <input
              placeholder="Enter Area, Locality or Suburb e.g. Bandra"
              type="text"
              id="address-1-locality"
              name="area_building"
              className="form-control"
              value={formData?.area_building ?? ''}
              onChange={handleInputChange}
            />
          </Col>
          <Col md={6} lg={4} className="mt-2">
            <label htmlFor="address-1-landmark">Landmark</label>
            <input
              placeholder="Landmark"
              type="text"
              id="address-1-landmark"
              name="landmark"
              className="form-control"
              value={formData?.landmark ?? ''}
              onChange={handleInputChange}
            />
          </Col>
          <Col md={6} lg={4} className="mt-2">
            <label htmlFor="address-1-city">City</label>
            <input
              placeholder="City"
              type="text"
              id="address-1-city"
              name="city"
              className="form-control"
              value={formData?.city ?? ''}
              onChange={handleInputChange}
            />
          </Col>
          <Col md={6} lg={4} className="mt-2">
            <label htmlFor="address-1-state">State</label>
            <input
              placeholder="State"
              type="text"
              id="address-1-state"
              name="state"
              className="form-control"
              value={formData?.state ?? ''}
              onChange={handleInputChange}
            />
          </Col>
          <Col md={6} lg={4} className="mt-2">
            <label htmlFor="address-1-pincode">Pincode</label>
            <input
              placeholder="Pincode"
              type="text"
              id="address-1-pincode"
              name="pincode"
              className="form-control"
              value={formData?.pincode ?? ''}
              // onChange={handleInputChange}
              onChange={(e) => {
                if (!isNaN(e.target.value)) {
                  handleInputChange(e)
                  console.log("this is a number")
                }
              }}
            />
          </Col>
          {/* <Col md={6} lg={4} className="mt-2">
            <label htmlFor="address-1-country">Country</label>
            <Select
              placeholder="Country"
              id="address-1-country"
              options={countryOptions}
              closeMenuOnSelect={true}
              value={countryOptions.find(option => option.value === formData?.country) ?? ''}
              defaultValue={countryOptions.find(option => option.value === 'india')}
              onChange={(e) => handleInputChange(e, 'country')}
            />
          </Col> */}
          <Col md={6} lg={4} className="mt-2">
            <label htmlFor="address-1-country">Country</label>
            <Select
              options={country}
              inputId="aria-example-input"
              closeMenuOnSelect={true}
              name="country"
              placeholder="Select Country"
              value={country.find(option => option.value === formData?.country) ?? ''}
              // defaultValue={country.find(option => option.value === 'India')}
              onChange={(e) => handleInputChange(e, 'country')}
            />
          </Col>
        </Row>
        <Row>
          <Col
            md={12}
            className="mt-3 d-flex align-items-center justify-content-between"
          >
            <h4 className="mb-0">Personal Shipping Address</h4>
            <span className="form-check form-check-success">
              <input
                type="checkbox"
                id="billing-same"
                className="form-check-input"
                name="billingShippingAddressSame"
                checked={formData.billingShippingAddressSame}
                onChange={(e) => {
                  handleInputChange(e)
                }}
              />
              <label htmlFor="billing-same">Same as Billing Address</label>
            </span>
          </Col>
          {/* {!formData.billingShippingAddressSame && ( */}
          <>
            <Col md={6} lg={4} className="mt-2">
              <label htmlFor="address-2-house-details">
                Flat and / or Building / House Details
              </label>
              <input
                placeholder="Flat and / or Building / House Details"
                type="text"
                id="address-2-house-details"
                name="shipping_address1"
                className="form-control"
                value={formData?.shipping_address1 ?? ''}
                onChange={handleInputChange}
              />
            </Col>
            <Col md={6} lg={4} className="mt-2">
              <label htmlFor="address-2-lane">Street Lane or Road</label>
              <input
                placeholder="Street Lane or Road"
                type="text"
                id="address-2-lane"
                name="shipping_address2"
                className="form-control"
                value={formData?.shipping_address2 ?? ''}
                onChange={handleInputChange}
              />
            </Col>
            <Col md={6} lg={4} className="mt-2">
              <label htmlFor="address-2-locality">
                Enter Area, Locality or Suburb e.g. Bandra
              </label>
              <input
                placeholder="Enter Area, Locality or Suburb e.g. Bandra"
                type="text"
                id="address-2-locality"
                name="shipping_area_building"
                className="form-control"
                value={formData?.shipping_area_building ?? ''}
                onChange={handleInputChange}
              />
            </Col>
            <Col md={6} lg={4} className="mt-2">
              <label htmlFor="address-2-landmark">Landmark</label>
              <input
                placeholder="Landmark"
                type="text"
                id="address-2-landmark"
                name="shipping_landmark"
                className="form-control"
                value={formData?.shipping_landmark ?? ''}
                onChange={handleInputChange}
              />
            </Col>
            <Col md={6} lg={4} className="mt-2">
              <label htmlFor="address-2-city">City</label>
              <input
                placeholder="City"
                type="text"
                id="address-2-city"
                name="shipping_city"
                className="form-control"
                value={formData?.shipping_city ?? ''}
                onChange={handleInputChange}
              />
            </Col>
            <Col md={6} lg={4} className="mt-2">
              <label htmlFor="address-2-state">State</label>
              <input
                placeholder="State"
                type="text"
                id="address-2-state"
                name="shipping_state"
                className="form-control"
                value={formData?.shipping_state ?? ''}
                onChange={handleInputChange}
              />
            </Col>
            <Col md={6} lg={4} className="mt-2">
              <label htmlFor="address-2-pincode">Pincode</label>
              <input
                placeholder="Pincode"
                type="text"
                id="address-2-pincode"
                name="shipping_pincode"
                className="form-control"
                value={formData?.shipping_pincode ?? ''}
                // onChange={handleInputChange}
                onChange={(e) => {
                  if (!isNaN(e.target.value)) {
                    handleInputChange(e)
                    console.log("this is a number")
                  }
                }}
              />
            </Col>
            <Col md={6} lg={4} className="mt-2">
              <label htmlFor="address-2-country">Country</label>
              {/* <select
                  placeholder="Country"
                  type="select"
                  id="address-2-country"
                  name="shipping_country"
                  className="form-select"
                  value={formData.shipping_country}
                  onChange={handleInputChange}
                >
                  <option value="india" selected>
                    India
                  </option>
                </select> */}
              <Select
                placeholder="Country"
                id="address-2-country"
                options={country}
                closeMenuOnSelect={true}
                value={country.find(option => option.value === formData?.shipping_country) ?? ''}
                defaultValue={country.find(option => option.value === 'india')}
                onChange={(e) => handleInputChange(e, 'shipping_country')}
              />
            </Col>
          </>
          {/* )} */}
          {/* <div className="d-flex justify-content-between mt-2">
            <div>
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleBack}
              >
                Back
              </button>
              <button className="btn btn-primary ms-2" type="button">
                Cancel
              </button>
            </div>
            <div>
              <button
                className="btn btn-primary ms-2"
                type="button"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </div> */}
        </Row>
      </Container>
    </>
  )
}

export default CustomerBasicAddress
