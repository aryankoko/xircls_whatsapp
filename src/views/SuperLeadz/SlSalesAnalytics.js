import React from 'react'
import { Card, Col } from 'react-bootstrap'
import { CardBody, Row } from 'reactstrap'
import SlSalesAnalyticsPie1 from '../Components/Charts/SuperLeads/SlSalesAnalyticsPie1'
import SlSalesAnalyticsPie2 from '../Components/Charts/SuperLeads/SlSalesAnalyticsPie2'
import SlSalesAnalyticsBar1 from '../Components/Charts/SuperLeads/SlSalesAnalyticsBar1'
import SlSalesAnalyticsBar2 from '../Components/Charts/SuperLeads/SlSalesAnalyticsBar2'
import Flatpickr from 'react-flatpickr'

export default function SlSalesAnalytics() {
    return (
        <>
            <Card>
                <CardBody>
                    <h4>Sales</h4>
                </CardBody>
            </Card>
            <Row>
                <Col xs={6}>
                    <Card>
                        <CardBody>
                            <p>Organic v/s SuperLeadz Purchase</p>
                            <SlSalesAnalyticsPie1 />
                        </CardBody>
                    </Card>
                </Col>
                <Col xs={6}>
                    <Card>
                        <CardBody>
                            <p>Organic v/s SuperLeadz Revenue</p>
                            <SlSalesAnalyticsPie2 />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Card>
                    <CardBody>
                        <div className="d-flex justify-content-between align-items-center">
                            <p>Organic v/s SuperLeadz Revenue</p>
                            <div className='mb-2 d-flex align-items-center'>
                                <p className='me-2 mt-1'>Date: </p>
                                <Flatpickr options={{ minDate: "today", mode: "range" }} className='form-control' id='default-picker' />
                            </div>
                        </div>
                        <SlSalesAnalyticsBar1 />
                    </CardBody>
                </Card>
            </Row>
            <Row>
                <Card>
                    <CardBody>
                        <div className="d-flex justify-content-between align-items-center">
                            <p>Organic v/s SuperLeadz Purhcase Count</p>
                            <div className='mb-2 d-flex align-items-center'>
                                <p className='me-2 mt-1'>Date: </p>
                                <Flatpickr options={{ minDate: "today", mode: "range" }} className='form-control' id='default-picker' />
                            </div>
                        </div>
                        <SlSalesAnalyticsBar2 />
                    </CardBody>
                </Card>
            </Row>
        </>
    )
}
