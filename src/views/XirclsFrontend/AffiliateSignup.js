import React from "react"
import { Container, Row, Col } from "reactstrap"
import { selectPhoneList } from "../../Helper/data"
import Footer from "./base/Footer"
import SignSection from "../../default_components/SignSection"
import Select from "react-select"

const AffiliateSignup = () => {
        // const [phoneCode, setPhoneCode] = useState("🇮🇳 +91 (IN)")
        return (
        <div className="products bg-white">
            <Container className="mt-5 mb-5">
                <Row>
                    <Col md={6} className='mx-auto px-2'>
                        <div className="border p-3">
                            <div>
                                <h3 className="third-font text-center font-three mb-2">Affiliate Sign-up</h3>
                            </div>
                            <hr />
                            <div className="mb-2 mt-2 me-2">
                                <label className="font-three form-label label" htmlFor="">First Name: *</label>
                                <input type="text" className="w- form-input" name="" placeholder="First Name" id="" />
                            </div>
                            <div className="mb-2 mt-2 me-2">
                                <label className="font-three form-label label" htmlFor="">Last Name: *</label>
                                <input type="text" className="w- form-input" name="" placeholder="Last Name" id="" />
                            </div>
                            <div className="mb-2 mt-2 me-2">
                                <label className="font-three form-label label" htmlFor="">Email address: *</label>
                                <input type="text" className="w- form-input" name="" placeholder="Email address" id="" />
                            </div>
                            <div className="mb-2 mt-2 me-2">
                                <label className="font-three form-label label" htmlFor="">Mobile Number: *</label>
                                <div className="row">
                                    <div className="col-3">
                                        <Select
                                            isMulti = {false}
                                            options={selectPhoneList}
                                            inputId="aria-example-input"
                                            closeMenuOnSelect={true}
                                            name="phone_code"
                                            // onChange={(value, actionMeta) => handleChange(value, actionMeta, false)}
                                            // value={data?.phone_code ? selectPhoneList.filter(option => data?.phone_code.includes(option.value)) : ""}
                                            styles={{
                                                control: (baseStyles) => ({
                                                    ...baseStyles,
                                                    fontSize: '12px',
                                                    margin: 0,
                                                    height: '100%'
                                                })
                                            }}
                                        />
                                    </div>
                                    <div className="col-9">
                                        <div className="w-100">
                                            <input type="text" className="w-100 form-input" name="phone_no" placeholder="Mobile Number" onChange={(e) => inputChangeHandler(e)} />
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="mb-2 mt-2 me-2">
                                <label className="font-three form-label label" htmlFor="">Choose Password: *</label>
                                <input type="text" className="w- form-input" name="" placeholder="Choose Password" id="" />
                            </div>
                            <div className="mb-2 mt-2 me-2">
                                <label className="font-three form-label label" htmlFor="">Re-enter Password: *</label>
                                <input type="text" className="w- form-input" name="" placeholder="Re-enter Password" id="" />
                            </div>                            
                            <div className="mb-3">
                                <button type="button" className="btn bg-black text-white me-1 form-btn">SUBMIT</button>
                            </div>                           
                        </div>
                    </Col>
                </Row>
            </Container>
            <SignSection />
            <Footer />
        </div>
    )
}

export default AffiliateSignup