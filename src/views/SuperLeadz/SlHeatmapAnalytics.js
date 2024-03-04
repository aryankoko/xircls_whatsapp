import React from 'react'
import { Card, Row } from 'react-bootstrap'
import { CardBody } from 'reactstrap'
import SlHeatmapAnalyticsChart from '../Components/Charts/SuperLeads/SlHeatmapAnalyticsChart'

export default function SlHeatmapAnalytics() {
    return (
        <>
            <Card>
                <CardBody>
                    <h4>Heatmap</h4>
                </CardBody>
            </Card>
            <Row>
                <Card>
                    <CardBody>
                        <SlHeatmapAnalyticsChart />
                    </CardBody>
                </Card>
            </Row>
        </>
    )
}
