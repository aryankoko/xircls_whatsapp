import React from 'react'
import { Col } from 'reactstrap'

const IconCard = ({ col, image, title, para, paraClass, imageClass, width }) => {
  return (
    <Col md={col} className="py-2 text-center">
        <img src={image} width={width ? width : 64} alt="" className={imageClass ? imageClass : 'img-fluid'} />
        <h4 className="text-blue mt-2 mb-1 fourth-font"> {title} </h4>
        {
          para ? <h5 className={paraClass ? paraClass : "seventh-font"}> {para} </h5> : ''
        }
        
    </Col>
  )
}

export default IconCard