import React from 'react'
import { Row, Col } from 'reactstrap'
import { AiFillCaretRight } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const SignSection = () => {
  return (
    <Row style={{ backgroundColor: "#2e82cb" }}>
        <Col className="signUpSection text-dark text-center text-md-right sign_up d-flex justify-content-center align-items-center nobottommargin-lg">
            Join the XIRCLS network! <Link to="/merchant/signup/" className=" container-clearfix ms-1 text-white" style={{ color: 'white', fontWeight: 'lighter', borderBottom: '2px solid #eee', lineHeight: '1' }}> Sign up here.</Link>
            <AiFillCaretRight size={30} />
        </Col>
    </Row>
  )
}

export default SignSection