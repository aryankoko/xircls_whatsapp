import React from 'react'
import { CardBody, Row, Col, Card } from 'reactstrap'

const EmptyDataCard = () => {
  return (
    <>
        <div className='text-center'>
            <h4>No Businesses Invited yet.</h4>
            <a className='btn btn-primary'>Invite a Business</a>
        </div>
    </>
  )
}

export default EmptyDataCard