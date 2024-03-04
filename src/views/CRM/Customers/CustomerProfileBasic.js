import React from "react"
import { Container, Card, CardBody, Row, Col } from 'reactstrap'
import './CustomerProfile.css'
import CustomerBasicNav from "./CustomerProfileBasic/CustomerBasicNav"
import CustomerProfileNav from "./CustomerProfileNav"

const CustomerProfileBasic = () => {

    return (
        <>
            <div className="customer-profile">
                <Card>
                    <CardBody>
                        <h3 className="mb-0">Customer Profile</h3>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <Container className="px-2">
                            <CustomerProfileNav />
                        </Container>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <CustomerBasicNav />
                        <Container fluid className="px-0 py-1">
                            <Row>
                                <Col md={12} className="mt-2">
                                    <h4 className="mb-0 ">Basic Details</h4>
                                </Col>
                                <Col md={4} className="mt-2">
                                    <label htmlFor="basicdetails-title">
                                        Title
                                    </label>
                                    <input readOnly placeholder="Title" type='text' id='basicdetails-title' name='basicdetails' className="form-control" />
                                </Col>
                                <Col md={4} className="mt-2">
                                    <label htmlFor="basicdetails-first-name">
                                        First Name
                                    </label>
                                    <input readOnly placeholder="First Name" type='text' id='basicdetails-first-name' name='basicdetails' className="form-control" />
                                </Col>
                                <Col md={4} className="mt-2">
                                    <label htmlFor="basicdetails-last-name">
                                        Last Name
                                    </label>
                                    <input readOnly placeholder="Last Name" type='text' id='basicdetails-last-name' name='basicdetails' className="form-control" />
                                </Col>
                                <Col md={4} className="mt-2">
                                    <label htmlFor="basicdetails-email">
                                        Email
                                    </label>
                                    <input readOnly placeholder="Email" type='text' id='basicdetails-email' name='basicdetails' className="form-control" />
                                </Col>
                                <Col md={4} className="mt-2">
                                    <label htmlFor="basicdetails-mobile">
                                        Mobile Number
                                    </label>
                                    <input readOnly placeholder="Mobile Number" type='text' id='basicdetails-mobile' name='basicdetails' className="form-control" />
                                </Col>
                                <Col md={4} className="mt-2">
                                    <label htmlFor="basicdetails-alt-mobile">
                                        Alternate Mobile Number
                                    </label>
                                    <input readOnly placeholder="Alternate Mobile Number" type='text' id='basicdetails-alt-mobile' name='basicdetails' className="form-control" />
                                </Col>
                                <Col md={4} className="mt-2">
                                    <label htmlFor="basicdetails-landline">
                                        Landline Number
                                    </label>
                                    <input readOnly placeholder="Landline Number" type='text' id='basicdetails-landline' name='basicdetails' className="form-control" />
                                </Col>
                                <Col md={4} className="mt-2">
                                    <label htmlFor="basicdetails-alt-landline">
                                        Alternate Landline Number
                                    </label>
                                    <input readOnly placeholder="Alternate Landline Number" type='text' id='basicdetails-alt-landline' name='basicdetails' className="form-control" />
                                </Col>
                            </Row>
                        </Container>
                    </CardBody>
                </Card>
            </div>
        </>
    )
}

export default CustomerProfileBasic