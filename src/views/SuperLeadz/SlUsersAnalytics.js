import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { CardBody } from 'reactstrap'
// import SlUsersAnalyticsLine from '../Components/Charts/SuperLeads/SlUsersAnalyticsLine'
// import PickerDefault from '../Components/Date-picker/NormalDatePicker'
import moment from 'moment/moment'

export default function SlUsersAnalytics({cardDataObj}) {
    return (
        <>
            {/* <Card>
                <CardBody>
                    <h4>Visitors</h4>
                </CardBody>
            </Card> */}
            <Row className='cursor-default'>
                <Col xs={12} md={3}>
                    <Card>
                        <CardBody >
                            <h4>Daily</h4>
                            <div className="d-flex justify-content-between align-items-center mt-1">
                                <div>
                                    <p style={{ fontSize: '16px' }}>Yesterday <br /><span style={{ fontSize: '12px' }}>{moment(new Date()).subtract(1, 'd').format("MMM DD, YYYY")}</span></p>
                                </div>
                                <div>
                                    <p style={{ fontSize: '24px' }}>{cardDataObj.yesterday}</p>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <p style={{ fontSize: '16px' }}>Today <br /><span style={{ fontSize: '12px' }}>{moment(new Date()).format("MMM DD, YYYY")}</span></p>
                                </div>
                                <div>
                                    <p style={{ fontSize: '24px' }}>{cardDataObj.today}</p>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xs={12} md={3}>
                    <Card>
                        <CardBody>
                            <h4>Weekly</h4>
                            <div className="d-flex justify-content-between align-items-center mt-1">
                                <div>
                                    <p style={{ fontSize: '16px' }}>Last Week <br /><span style={{ fontSize: '12px' }}>{moment(new Date()).subtract(7, 'd').format("MMM DD, YYYY")}</span></p>
                                </div>
                                <div>
                                    <p style={{ fontSize: '24px' }}>{cardDataObj.last_week_data}</p>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <p style={{ fontSize: '16px' }}>This Week <br /><span style={{ fontSize: '12px' }}>{moment(new Date()).format("MMM DD, YYYY")}</span></p>
                                </div>
                                <div>
                                    <p style={{ fontSize: '24px' }}>{cardDataObj.this_week}</p>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xs={12} md={3}>
                    <Card>
                        <CardBody>
                            <h4>Monthly</h4>
                            <div className="d-flex justify-content-between align-items-center mt-1">
                                <div>
                                    <p style={{ fontSize: '16px' }}>Last Month <br /><span style={{ fontSize: '12px' }}>{moment(new Date()).subtract(30, 'd').format("MMM DD, YYYY")}</span></p>
                                </div>
                                <div>
                                    <p style={{ fontSize: '24px' }}>{cardDataObj.last_month_data}</p>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <p style={{ fontSize: '16px' }}>This Month <br /><span style={{ fontSize: '12px' }}>{moment(new Date()).format("MMM DD, YYYY")}</span></p>
                                </div>
                                <div>
                                    <p style={{ fontSize: '24px' }}>{cardDataObj.this_month_data}</p>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xs={12} md={3}>
                    <Card>
                        <CardBody>
                            <h4>All-Time</h4>
                            <div className="d-flex justify-content-between align-items-center mt-1 pd-5" >
                                <div>
                                    <p style={{ fontSize: '16px' }}>Last 365 Days <br /><span style={{ fontSize: '12px' }}>{moment(new Date()).subtract(365, 'd').format("MMM DD, YYYY")}</span></p>
                                </div>
                                <div>
                                    <p style={{ fontSize: '24px' }}>{cardDataObj.last_30days}</p>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <p style={{ fontSize: '16px' }}>Total <br /><span style={{ fontSize: '12px' }}>{moment(new Date()).format("MMM DD, YYYY")}</span></p>
                                </div>
                                <div>
                                    <p style={{ fontSize: '24px' }}>{cardDataObj.total_visitors}</p>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            {/* <Row className='px-1'>
                <Card className='p-0'>
                    <CardBody>
                        <div className="d-flex justify-content-between align-items-center">
                            <h4>Visitors</h4>
                            <div className='mb-2 d-flex align-items-center'>
                                <p className='me-2 mt-1'>Date: </p>
                                <PickerDefault setPicker={setDateRange} picker={dateRange} mode={"range"} dateFormat={"Y-m-d"} maxDate={"today"} />
                            </div>
                        </div>
                        <SlUsersAnalyticsLine graphData={graphData} />
                    </CardBody>
                </Card>
            </Row> */}
        </>
    )
}
