import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Col, Row } from 'reactstrap'

const ApiDocumentation = () => {
    const location = useLocation()
    const [show, setShow] = useState(false)
  return (
    <Row>
        <Col md='12'>
            <div className="text-center">
                <a className="btn btn-primary" onClick={() => setShow(!show)}>API KEY</a>
                {
                    show ? <div className='my-2'>{location.state} <a className="btn-sm btn btn-primary">Copy</a></div> : ""
                }
            </div>
        </Col>
    </Row>
  )
}

export default ApiDocumentation