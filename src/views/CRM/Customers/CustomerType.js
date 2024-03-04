import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap"
// import personal from "../../../assets/images/vector/personal.png"
// import business from "../../../assets/images/vector/business.png"

const CustomerType = () => {

    const navigate = useNavigate()

    return (
        <>
        <style>
            {`
                .hoverCard{
                    transition: 0.3s ease !important;
                }
                .hoverCard:hover{
                    // background-color: rgba(0, 106, 255, 0.25) !important;
                    box-shadow: 0px 0px 10px rgba(0, 106, 255, 0.25) !important;
                }
            `}
        </style>
            <Card>
                <CardHeader>
                    <h4>Customer Type</h4>
                </CardHeader>
            </Card>
            <Row>
                <Col md='6'>
                    <Card onClick={() => navigate('/merchant/customers/add_customer')} className='cursor-pointer hoverCard'>
                        <CardBody className='text-center'>
                                <span class="fw-bolder fs-5 text-black">Add an Individual</span>
                        </CardBody>

                    </Card>
                </Col>
                <Col md='6'>
                    <Card onClick={() => navigate('/merchant/customers/add_business')} className='cursor-pointer hoverCard'>
                        <CardBody className='text-center'>
                                <span class="fw-bolder fs-5 text-black">Add a Business</span>
                        </CardBody>

                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default CustomerType