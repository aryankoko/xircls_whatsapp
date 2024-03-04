import React from 'react'
import ProfileNav from './components/ProfileNav'
import { Card, CardBody, Col, Row } from 'reactstrap'

const VerifyDomin = () => {


  return (
    <Row className="match-height">
        <Col md="4">
            <Card>
                <CardBody>
                    <ProfileNav />
                </CardBody>
            </Card>
        </Col>
        <Col md="8">
          <Card>
            <CardBody>
              <Row>
                <Col sm='8'>
                  <input type='text' className='form-control' />
                </Col>
                <Col sm='4'>
                  <a className='btn btn-primary'>Generate Verification Token</a>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
    </Row>
    
  )
}

export default VerifyDomin