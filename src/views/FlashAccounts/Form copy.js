import React from "react"
import { Row, Col, Card, CardBody } from "reactstrap"

const Form = () => {
  return (
    <div className="section">
      {/* Login Form Settings */}
      <div>
        <Row>
          <Col md={4}>
            <h4>Login Form Settings</h4>
          </Col>
          <Col>
            <Card>
              <CardBody>
                <form>
                  <label for="exampleFormControlInput1">
                    Set Character long
                  </label>
                  <select
                    class="form-select"
                    aria-label="Default select example">
                    <option selected>6</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md={4}></Col>
          <Col>
            <Card>
              <CardBody>
                <form>
                  <label for="exampleFormControlInput1">
                    Default form validation
                  </label>
                    <input
                      type="password"
                      class="form-control"
                      id="inputPassword3"
                      placeholder="Password must be at least {{n}} characters"
                      
                    />
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md={4}></Col>
          <Col>
            <Row className='match-height'>
              <Col>
                <Card >
                  <CardBody>
                    <form>
                      <label for="inputPassword3">Password Input Title</label>
                     
                        <input
                          type="password"
                          class="form-control"
                          id="inputPassword3"
                          placeholder="Password"
                        />
                    </form>
                  </CardBody>
                </Card>
              </Col>
              <Col>
              <Card >
                  <CardBody>
                    <form>
                      <label for="inputPassword3">
                        Repeat Password Input Title
                      </label>
                     
                        <input
                          type="password"
                          class="form-control"
                          id="inputPassword3"
                          placeholder="Password"
                        />
                    </form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col md={4}></Col>
          <Col>
          <Row className='match-height'>
              <Col>
              <Card >
                  <CardBody>
                    <form>
                      <label for="validationCustom01">Input Placeholder</label>
                      <input
                        type="text"
                        class="form-control"
                        id="validationCustom01"
                        placeholder="First name"
                        value="Placeholder text"
                        required
                      />
                    </form>
                  </CardBody>
                </Card>
              </Col>
              <Col>
              <Card >
                  <CardBody>
                    <form>
                      <label for="validationCustom01">Button Label</label>
                      <input
                        type="text"
                        class="form-control"
                        id="validationCustom01"
                        placeholder="First name"
                        value="Create Account"
                        required
                      />
                    </form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>

      {/* Email Form Settings  */}
      <hr style={{ borderTop: "1px solid #ccc", margin: "20px 0" }} />
      <div>
        <Row>
          <Col md={4}>
            <h4>Email Form Settings</h4>
          </Col>
          <Col>
            <Card>
              <CardBody>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <span>Enable: Subscription Checkboxs </span>
                    <br />
                    <span>
                      Status:<span style={{ color: "#3ab09e" }}> Enabled </span>{" "}
                    </span>
                  </div>
                  <div>
                    <button type="button" className="btn btn-primary ">
                      Disable
                    </button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md={4}></Col>
          <Col>
          <Row className='match-height'>
              <Col>
                <Card >
                  <CardBody>
                    <form>
                      <label for="inputtext1">SMS CheckBox Text</label>
                        <input
                          type="text"
                          class="form-control"
                          id="inputtext1"
                          placeholder="Receive Sms Notifications "
                          value="Receive Sms Notifications "

                        />
                    </form>
                  </CardBody>
                </Card>
              </Col>
              <Col>
                <Card >
                  <CardBody>
                  <div >
                    <span> SMS CheckBox Default Value </span>
                    <br />
                    <span>
                      Status:<span style={{ color: "#3ab09e" }}> Enabled </span>{" "}
                    </span>
                  <div>
                    <button type="button" className="d-flex mt-2 btn btn-primary ">
                      Disable
                    </button>
                  </div>
                </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col md={4}></Col>
          <Col>
          <Row className='match-height'>
              <Col>
                <Card >
                  <CardBody>
                    <form>
                      <label for="validationCustom01">Email CheckBox Text</label>
                      <input
                        type="text"
                        class="form-control"
                        id="validationCustom01"
                        placeholder="First name"
                        value="Email Sms Notifications"
                        required
                      />
                    </form>
                  </CardBody>
                </Card>
              </Col>
              <Col>
                <Card >
                  <CardBody>
                  <div >
                    <span> Email CheckBox Default Value </span>
                    <br />
                    <span>
                      Status:<span style={{ color: "#3ab09e" }}> Enabled </span>{" "}
                    </span>
                  <div>
                    <button type="button" className="d-flex mt-2 btn btn-primary ">
                      Disable
                    </button>
                  </div>
                </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    
      {/* Success Form Settings  */}

      <hr style={{ borderTop: "1px solid #ccc", margin: "20px 0" }} />
      <div>
        <Row>
        <Col md={4}>
            <h4>Success Form Settings</h4>
          </Col>
          <Col>
            <Row className='match-height'>
              <Col>
                <Card >
                  <CardBody>
                    <form>
                      <label for="inputtext3">Call to Action Button Label</label>
                      <input
                        type="text"
                        class="form-control"
                        id="inputtext3"
                        value="Log in"
                        required
                      />
                    </form>
                  </CardBody>
                </Card>
              </Col>
              <Col>
                <Card >
                  <CardBody>
                    <form>
                      <label for="inputtext4">Relative url path Ex.:/account/login</label>
                        <input
                          type="text"
                          class="form-control"
                          id="inputtext4"
                          placeholder="/account/login"
                          value="/account/login"

                        />
                    </form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>

    
      </div>


      {/* Customize the security Options. */}
      <hr style={{ borderTop: "1px solid #ccc", margin: "20px 0" }} />
      <div>
        <Row>
          <Col md={4}>
            <h4>Customize the security Options.</h4>
          </Col>
          <Col>
            <Card>
              <CardBody>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <span>Must contain both numeric and alphabetic characters</span>
                    <br />
                    <span>
                      Status: Disabled 
                    </span>
                  </div>
                  <div>
                    <button type="button" className="btn btn-primary ">
                      Enable
                    </button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md={4}></Col>
          <Col>
            <Card>
              <CardBody>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <span>Show and hide password icon. This feature will be displaying a icon allowing users show or hide password while typing</span>
                    <br />
                    <span>
                      Status: Disabled 
                    </span>
                  </div>
                  <div>
                    <button type="button" className="btn btn-primary ">
                      Enable
                    </button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md={4}></Col>
          <Col>
            <Card>
              <CardBody>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <span>Enable Re-type password functionality</span>
                    <br />
                    <span>
                      Status: Disabled 
                    </span>
                  </div>
                  <div>
                    <button type="button" className="btn btn-primary ">
                      Enable
                    </button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Form