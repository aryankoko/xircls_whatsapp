import React from 'react'
import { Info } from 'react-feather'
import { Card, CardBody } from 'reactstrap'

const CardCom = ({ icon, title, data, info}) => {
    return (
        <Card>
            <CardBody>
                <div className='icon'>
                    {icon ? icon : ""}
                </div>
                <div className="d-flex justify-content-between align-items-baseline">
                    <p className="mb-0 h5 card-text position-relative cursor-default p-0">
                        {title ? title : ""}
                        {info && data ? <span className='position-absolute' title={info} style={{ top: '-10px', right: '-15px', cursor: 'pointer' }}><Info size={12} /></span> : ''}
                    </p>
                    <h3 title={data} className='m-0'>
                        {data ? data : "0"}
                    </h3>
                </div>
                
            </CardBody>
        </Card>
    )
}

export default CardCom