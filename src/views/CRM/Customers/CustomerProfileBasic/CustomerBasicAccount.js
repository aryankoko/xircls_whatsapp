import React from "react"
import { Container, Card, CardBody, Row, Col} from "reactstrap"
import { crmURL } from "@src/assets/auth/jwtService"
import userprofile from '../../assets/user_profile.jpg'

const CustomerBasicAccount = ({ allData }) => {
  const {
    formData,
    handleInputChange
    // handleNext,
    // handleSubmitSection3,
    // handleBack
  } = allData

  return (
    <>
      <Container fluid className="px-0 py-1">
        <Row>
          <Col md={12} className="mt-2">
            <h4 className="mb-0">Account Details</h4>
          </Col>
          <Col md={12} className="mt-2">
            <div className="d-flex gap-1">
              <div style={{ width: "100px", height: "100px" }}>
                <img className="img-thumbnail" style={{height:'100px'}}
                  src={(formData?.view_logo_url) ? formData?.view_logo_url : formData?.user_profile_img ? `${crmURL}/static${formData?.user_profile_img}` : userprofile }
                  alt="User Image"
                  loading="lazy"
                />
              </div>
              <div>
                <h4 className="mb-0">{formData.cust_first_name} {formData.cust_last_name}</h4>
                <div className="mt-1"> 
                  <input
                    type="file"
                    id="upload"
                    name="user_profile_img"
                    onChange={(e) => handleInputChange(e, 'file')}
                    hidden />
                  <label htmlFor="upload" className="btn btn-primary">Edit Image</label>
                </div>
              </div>
            </div>
          </Col>
          <Col md={4} lg={4} className="mt-2">
            <label htmlFor="account-username">Username</label>
            <input
              placeholder="Username"
              type="text"
              id="account-username"
              name="edit_name"
              className="form-control"
              value={formData.edit_name}
              onChange={handleInputChange}
            />
          </Col>
          <Col md={4} lg={4} className="mt-2">
            <label htmlFor="account-email">Email</label>
            <input
              placeholder="Email"
              type="text"
              id="account-email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleInputChange}
            />
          </Col>
          <Col md={4} lg={4} className="mt-2">
            <label htmlFor="account-password">Password</label>
            <input
              placeholder="Password"
              type="password"
              id="account-password"
              name="user_password"
              className="form-control"
              value={formData.user_password}
              onChange={handleInputChange}
            />
          </Col>
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

export default CustomerBasicAccount
