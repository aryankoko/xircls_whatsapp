import React, { useContext, useEffect, useState } from 'react'
import JsonToJsx from '../Components/SuperLeadz/JsonToJsx'
import { useLocation } from 'react-router-dom'
import { SuperLeadzBaseURL } from '../../assets/auth/jwtService'
import { PermissionProvider } from '../../Helper/Context'
import { getCurrentOutlet } from '../Validator'

const Preview = () => {
  const location = useLocation()
  console.log(location.state)
  const { userPermission } = useContext(PermissionProvider)
  const [image, setImage] = useState("")

  const outletData = getCurrentOutlet()

  const getData = () => {
    const form_data = new FormData()
    form_data.append('shop', outletData[0]?.web_url)
    form_data.append('app', userPermission?.appName)
    fetch(`${SuperLeadzBaseURL}/utility/api/v1/get_shop_snap/`, {
      method: "POST",
      body: form_data
    })
    .then((result) => result.json())
    .then((resp) => {
      console.log(resp)
      setImage(resp.get_shop_snap)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    getData()
  }, [])

  return (

    <div className="flex-grow-1 position-relative" style={{ backgroundImage: `url('${image}')`, height: "100vh", backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundSize: 'cover' }}>
      <div className='d-flex align-items-center h-100'>
        {
          location?.state?.custom_theme ? <JsonToJsx isMobile={false} renderObj={JSON.parse(location?.state?.custom_theme)} scale={1} /> : ''
        }

      </div>
    </div>
  )
}

export default Preview