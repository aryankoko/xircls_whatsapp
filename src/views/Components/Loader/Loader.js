import React from 'react'
import Spinner from '../DataTable/Spinner'

const FrontBaseLoader = () => {
  return (
    <div style={{position: 'fixed', top: '0px', left: '0px', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '1000000' }}>
        <Spinner size="45px" />
    </div>
  )
}

export default FrontBaseLoader