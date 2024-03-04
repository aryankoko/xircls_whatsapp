import React, { useState } from "react"
import { Col, Card, CardBody } from "reactstrap"
import { MoreVertical, Edit, Trash, Copy } from "react-feather"

const FormCard = ({ id, formName, description, creationDate, coverImage }) => {
  const [showOptions, setShowOptions] = useState(false)
  return (
    <Col className="form-card" key={id} style={{ maxWidth: "20%", transition: '0.5s ease' }}>
      <Card className="card" style={{ overflow: "hidden", position: 'relative' }}>
        <img src={coverImage} style={{ aspectRatio: "14/15" }} />
        <CardBody
          className="d-flex flex-column justify-content-start align-items-start p-1"
          style={{ gap: "3px", minHeight: "11.5rem" }}
        >
          <div className="text-black" style={{ fontSize: "0.9rem" }}>
            {creationDate}
          </div>
          <div className="text-black fw-bold fs-4">{formName}</div>
          <div
            className="text-black fs-6"
            style={{ textAlign: "justify", textJustify: "inter-word" }}
          > 
            {description.length > 100 ? description.slice(0, 100).concat("...") : description}
          </div>                   
        </CardBody>
        <div className="form-option-container" style={{position: 'absolute', bottom: '8.5rem', right: '1rem', padding: '0.25rem', borderRadius: '50%'}} onClick={(e) => {
            e.stopPropagation()
            setShowOptions(!showOptions)            
        }}>
           <MoreVertical size={19} style={{}} />
           <ul className="m-0 p-0 rounded-3" style={showOptions ? {position: 'absolute', bottom: '2rem', right: '0', zIndex: '999', backgroundColor: '#ffffff', listStyle: 'none', overflow: 'hidden', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'} : { display: 'none' }}>
              <li><button className="btn w-100 px-1 text-black text-start rounded-0 d-flex align-items-center form-options"><Edit size={16} style={{marginRight: '0.5rem'}}/> Edit</button></li>
              <li><button className="btn w-100 px-1 text-black text-start rounded-0 d-flex align-items-center form-options"><Trash size={16} style={{marginRight: '0.5rem'}}/> Duplicate</button></li>
              <li><button className="btn w-100 px-1 text-black text-start rounded-0 d-flex align-items-center form-options"><Copy size={16} style={{marginRight: '0.5rem'}}/> Delete</button></li>
           </ul>       
        </div>        
      </Card>
    </Col>
  )
}

export default FormCard
