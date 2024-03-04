import React from 'react'
import { Card, CardBody, Col, Row, Table } from 'reactstrap'

const AddCustomerGroups = () => {
  return (
    <>
        <Row>
            <Col sm='12'>
                <Card>
                    <CardBody>
                        <h4>Add Customer Group</h4>
                    </CardBody>
                </Card>
            </Col>
        </Row>
        <Row>
            <Col sm='12'>
                <Card>
                    <CardBody>
                        <Row>
                            <Col md='6'>
                                <div className="name mb-1">
                                    <label for="groupName">Group Name</label>
                                    <input type="text" className='form-control' />

                                </div>
                                <div className="remark mb-1">
                                    <label for="remark">Remarks</label>
                                    <textarea type="text" className='form-control' placeholder='Description - E.g. For Gold Customers who purchases above Rs 1,00,000' />
                                </div>
                            </Col>
                            <Col md='6'>
                               <a className='btn btn-primary'></a>
                            </Col>
                        </Row>
                        
                    </CardBody>
                </Card>

            </Col>
        </Row>
    </>
  )
}

export default AddCustomerGroups