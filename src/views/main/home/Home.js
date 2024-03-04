import React from 'react'
import { ownUrl } from '../../Validator'

const Home = () => {
  return (
    <>
      <div className='d-flex justify-content-center align-items-center' style={{ height: "100vh", flexDirection: 'column', gap: '15px' }}>
        <div>
          <img src={`${ownUrl}/images/xircls_logo_1.png`} />
        </div>
        <h5>Looks like you want to get to <a href="https://xircls.com">xircls.com</a></h5>
      </div>
    </>
  )
}

export default Home