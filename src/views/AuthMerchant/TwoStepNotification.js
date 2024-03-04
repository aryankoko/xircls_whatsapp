import React from 'react'
import ProfileNav from './components/ProfileNav'
import { Card, CardBody, Col, Row } from 'reactstrap'

const TwoStepNotification = () => {


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
              <h2>2-Step Verification</h2>
              <h3 className='mb-1 mt-2'>Protect your account with 2-Step verification</h3>
              <div className="sub_points">
                <ul>
                  <li>
                    <p> Add an extra layer of security to your account. </p>
                  </li>
                  <li>
                    <p> Each time you sign in, you’ll need your password and a verification code sent to your mobile phone. </p>
                  </li>
                  <li>
                    <p> Even if someone has your password, this will prevent them from getting into your account. </p>
                  </li>
                  <li>
                    <p>
                      Note: You can opt to stay signed in for 30 days on your device. Anyone who tries to access your account from another device, must enter your password and the verification code sent to your mobile phone.
                    </p>
                  </li>
                </ul>
              </div>
              <div className="action text-end mt-3">
                <a className="btn btn-primary">Get Started</a>
              </div>
            </CardBody>
          </Card>
        </Col>
    </Row>
    
  )
}

export default TwoStepNotification