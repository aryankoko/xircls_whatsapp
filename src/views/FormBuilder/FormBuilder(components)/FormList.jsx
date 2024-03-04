import React from "react"
import { Card, CardBody, Row } from "reactstrap"
import { Edit, Trash, Copy } from "react-feather"

const FormList = ({ formName, description, creationDate }) => {
  return (
    <Row className="form-list" style={{transition: '0.2s ease', cursor: 'pointer'}}>
      <Card>
        <CardBody className="d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-start align-items-center gap-1">
                <div className="text-black fw-bolder fs-5" style={{width: '12rem'}}>{formName}</div>
                <div style={{width: '55rem'}}>{description.length > 100 ? description.slice(0, 100).concat("...") : description}</div>
                <div className="text-black">{creationDate}</div>
            </div>
            <div className="d-flex justify-content-between align-items-center gap-3">
                <button data-bs-toggle="tooltip" data-bs-placement="top" title="Edit" style={{border: 'none', outline: 'none', background: 'transparent'}}><Edit size={16} /></button>
                <button data-bs-toggle="tooltip" data-bs-placement="top" title="Delete" style={{border: 'none', outline: 'none', background: 'transparent'}}><Trash size={16} /></button>
                <button data-bs-toggle="tooltip" data-bs-placement="top" title="Duplicate" style={{border: 'none', outline: 'none', background: 'transparent'}}><Copy size={16} /></button>           
            </div>
        </CardBody> 
      </Card>
    </Row>
  )
}

export default FormList
