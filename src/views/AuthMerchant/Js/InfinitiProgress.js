import React from "react"
import { X } from "react-feather"
import { Container, Card, CardBody, Row, Col } from 'reactstrap'
import '../Css/InfinitiProgress.css'

const InfinitiProgress = () => {

    return (
        <>
            <Container fluid className="infiniti-progress px-0">
                <Card>
                    <CardBody>
                        <h3 className="mb-0">Infiniti Progress</h3>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <Container fluid>
                            <div className="px-1 mt-2">
                                <h4>Infiniti</h4>
                                <p className="mb-0">Match customer spend at your Outlet with partner rewards. Partner outlets deliver your Acquisition Offers to their customers.</p>
                                <p>Retain your customers with Retention Offers when they shop with you or partner outlets.</p>
                                <p>Complete the steps below to begin this campaign!</p>
                            </div>
                            <Row className="px-2">
                                <Col md={12} className='p-2 border rounded'>
                                    <Container fluid className='border rounded-3'>
                                        <Row>
                                            <Col md={12} className='py-1'>
                                                <h5 className="mb-0 text-primary">Add Default Offer Set</h5>
                                            </Col>
                                            <Col md={12} className='py-1 border-top'>
                                                <p className="mb-0">Create Acquisition Offers to attract new customers and Retention Offers to retain customers who've already shopped at your Outlet.</p>
                                                <p><span className="fw-bold text-black">Note:</span> You can replace this Default Offer Set at any time.</p>
                                                <button className="btn btn-primary my-1">Add Default Offer Set</button>
                                            </Col>
                                        </Row>
                                    </Container>
                                    <Container fluid className='border rounded-3 mt-2'>
                                        <Row>
                                            <Col md={12} className='py-1 d-flex justify-content-between align-items-center'>
                                                <h5 className="mb-0 text-primary">Target Customer Profiling</h5>
                                                <span className="text-secondary">Incomplete <X size={15} /></span>
                                            </Col>
                                            <Col md={12} className='py-1 border-top'>
                                                <p>Target your offers at your ideal customer base for increased offer engagement & conversations.</p>
                                                <button className="btn btn-primary my-1">Target profiling</button>
                                            </Col>
                                        </Row>
                                    </Container>
                                    <Container fluid className='border rounded-3 mt-2'>
                                        <Row>
                                            <Col md={12} className='py-1 d-flex justify-content-between align-items-center'>
                                                <h5 className="mb-0 text-primary">Integration</h5>
                                                <span className="text-secondary">Incomplete <X size={15} /></span>
                                            </Col>
                                            <Col md={12} className='py-1 border-top'>
                                                <p>Install the Get Back All You Spend plugin for your website platform or download our SDK for manual integration.</p>
                                            </Col>
                                        </Row>
                                    </Container>
                                    <Container fluid className='border rounded-3 mt-2'>
                                        <Row>
                                            <Col md={12} className='py-1'>
                                                <h5 className="mb-0 text-primary">Start Campaign</h5>
                                            </Col>
                                            <Col md={12} className='py-1 border-top'>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Col>
                                <Col md={12} className='px-0 d-flex justify-content-between mt-2'>
                                    <button className="btn btn-primary">Back</button>
                                    <button className="btn btn-secondary">Start My Campaign</button>
                                </Col>
                            </Row>
                        </Container>
                    </CardBody>
                </Card>
            </Container>
        </>
    )
}

export default InfinitiProgress