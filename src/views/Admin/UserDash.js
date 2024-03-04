import React from 'react'
import ReportsNav from './ReportsNav'
import { Card, CardBody, Col, Container, Row, Progress } from 'reactstrap'
import { BiSolidUpArrow } from 'react-icons/bi'
import { GrCircleInformation } from 'react-icons/gr'
import { GoDotFill } from 'react-icons/go'
import TwoLineGraph from './Graphs/TwoLineGraph'
import ThreeLineGraph from './Graphs/ThreeLineGraph'
import LineGraph from './Graphs/LineGraph'
import ExpBarChart from './Graphs/ExpBarChart'
import PieChart from './Graphs/PieChart'
import ReactSpeedometer from 'react-d3-speedometer'

const UserDash = () => {
  return (
    <div>
      <ReportsNav />

      {/* filter starts */}
      <div className='d-flex align-items-center justify-content-start gap-3 p-2'>

        <div>
          <label htmlFor='product'>Product</label>
          <select className='form-control' name='product' style={{padding:"5px"}}>
            <option>Product 1</option>
            <option>Product 2</option>
          </select>
        </div>

        <div>
          <label htmlFor='company'>Company</label>
          <select className='form-control' name='company' style={{padding:"5px"}}>
            <option>Company 1</option>
            <option>Company 2</option>
          </select>
        </div>

        <div>
          <label htmlFor='time-period'>Time Period</label>
          <select className='form-control' name='time-period' style={{padding:"5px"}}>
            <option>Current Quarter</option>
            <option>Last Quarter</option>
          </select>
        </div>

      </div>
      {/* filter ends */}

      <Row className='match-height p-2'>
        <Col md={6}>
          <Card className='shadow'>
            <CardBody>
                <h1>New daily users</h1>
                <LineGraph height={'400px'} />
            </CardBody>
          </Card>
        </Col>

        <Col md={6}>
          <Card className='shadow'>
            <CardBody>
                <h1>Users by country</h1>
                <div className='d-flex align-items-center justify-content-center p-2'>
                  <PieChart />
                </div>
            </CardBody>
          </Card>
        </Col>

        <Col md={6}>
          <Card className='shadow'>
            <CardBody>
                <h1>On-boarding funnel</h1>
                <ExpBarChart height={'400px'} />
            </CardBody>
          </Card>
        </Col>

        <Col md={6}>
          <Card className='shadow'>
            <CardBody>
                <h1>Day 30 Retention</h1>
                <ExpBarChart height={'400px'} />
            </CardBody>
          </Card>
        </Col>

      </Row>

    </div>
  )
}

export default UserDash