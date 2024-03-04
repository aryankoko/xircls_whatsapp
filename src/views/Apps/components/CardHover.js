import React from 'react' 
import { Activity, Info, MapPin } from 'react-feather' 
import { Link } from 'react-router-dom'
import { Card, CardBody } from 'reactstrap'

const CardHover = ({ icon, title, data, info, buttonText, titleContent, redirect, newPage, customCondition, customFunc }) => {

  return (
    <Card className='hover-card-active'>
        <style>
            {`
                .hover-card-active, .hidden-section {
                    transition: 0.25s ease;
                    }
                    
                    .hidden-section {
                    max-height: 0px;
                    overflow: hidden;
                    }
                    
                    .hover-button {
                    opacity: 0;
                    visibility: hidden;
                    transition: 0.25s ease;
                    }
                    
                    .hover-card-active:hover .hidden-section {
                    max-height: 100px;
                    }
                    
                    .hover-card-active:hover .hover-button {
                    opacity: 1;
                    visibility: visible;
                    }
            `}
        </style>
      <CardBody className=''>
            <h4 className='mb-0' style={{ fontSize: '3rem' }}>
                    {data}
            </h4>
            <div className="d-flex justify-content-between align-items-center ">
                <span className=" cursor-pointer h5">
                    {title}
                    {info && (
                    <span
                        className=""
                        title={info}
                        style={{ top: '-5px', right: '-10px' }}
                    >
                        <Info size={7.5} />
                    </span>
                    )}
                    {titleContent && <p className="mt-1 me-1" style={{ fontWeight: '100' }}>{titleContent}</p>}
                </span>
                <div className='icon mb-1'>
                    {icon}
                </div>
            </div>
        <div className="hidden-section">
            {/* <p className='mb-0' style={{ fontSize: '0.9rem'}}>
                <Activity size={15}/>
                &nbsp;Moderate | 4 mins to go
            </p>
            <p style={{ fontSize: '0.9rem'}}>
                <MapPin size={15}/>
                &nbsp;Home Page
            </p> */}
            <div
            className="hover-card d-flex justify-content-end mt-2"
            style={{
                cursor: 'pointer',
                position: 'absolute',
                transform: `translate(200%, -50%)`,
                transition: 'box-shadow 0.3s ease'
                }}
                >
            {newPage ? <a target='_blank' href={redirect ? redirect : ""} className="btn btn-primary hover-button">{buttonText}</a> : customCondition ? <button onClick={customFunc} target='_blank' href={redirect ? redirect : ""} className="btn btn-primary hover-button">{buttonText}</button> : <Link to={redirect ? redirect : ""} className="btn btn-primary hover-button">{buttonText}</Link>}
          </div>
        </div>
      </CardBody>
    </Card>
  ) 
} 

export default CardHover 
