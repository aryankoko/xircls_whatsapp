import React from 'react'
import { Col, FormGroup, Input, Label, Row } from 'reactstrap'
import User from '../../assets/user_profile.jpg'
import { Image } from 'react-bootstrap'

const Account = ({ userData }) => {
  return (
    <>
      <Row>
        <Col md='12'>
          <h4>Account Details</h4>
        </Col>
      </Row>
      <Row className='mt-1'>
        <Col md='2'>
          <Image src={User} className="img-thumbnail" style={{ height: '104px' }} />
        </Col>
        <Col md='2'>
          <h4>{userData.title} {userData.customer_name}</h4>
          <button type="button" class="btn btn-primary">Edit Image</button>
        </Col>
      </Row>

      <Row>
        <Col md='4'>
          <FormGroup>
            <Label for="username">
              Username
            </Label>
            <Input
              id="username"
              name="username"
              type="text"
              value={userData.user}
            />
          </FormGroup>
        </Col>

        <Col md='4'>
          <FormGroup>
            <Label for="email">
              E-mail
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={userData.email}
            />
          </FormGroup>
        </Col>

        <Col md='4'>
          <FormGroup>
            <Label for="password">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={userData.user_password}
            />
          </FormGroup>
        </Col>
      </Row>
    </>
  )
}

export default Account