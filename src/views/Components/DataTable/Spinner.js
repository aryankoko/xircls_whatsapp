import React from 'react'

const Spinner = ({ size }) => {
  return (
    <img style={{width: size, height: size}} className='xircls_loader' src="https://api.xircls.com/static/images/website-slide/merchant_site/spinner.png" />
  )
}

export default Spinner