import React from 'react'
import codeSkin from "@src/assets/images/website-slide/codeSkin.jpg"

const ThankYouPage = () => {
  return (
    <div className='w-100 d-flex justify-content-center mt-3 align-items-center' style={{flexDirection: 'column'}}>
      <img className='mb-2' src={codeSkin} width={'250px'} alt="" />
      <h1>Thank you for your details</h1>
    </div>
  )
}

export default ThankYouPage