import React from 'react'
import { Lock } from 'react-feather'

const AppCom = ({ title, data, button }) => {

  return (
    <>
        <div className='card hover-card-active'  >
            <div className='card-body'>
                <div className="d-flex justify-content-between align-items-center">
                    <div className='d-flex'>
                        <h4 className='mb-0 fw-bolder' style={{textTransform: "capitalize"}}>{title}</h4>
                    </div>
                    <div className='align-self-end'>
                        <Lock color='black' strokeWidth={1} size={16}/>
                    </div>
                </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                        <h5 style={{ text: 'wrap' }}>{data}</h5>
                    {/* <div className='d-flex justify-content-end'>
                        {icon}
                    </div> */}
                </div>
                <div className="d-flex justify-content-end" style={{cursor: 'pointer', marginTop: '1rem' }}>
                    {button}
                </div>
            </div>
        </div>
    </>
  )
}

export default AppCom