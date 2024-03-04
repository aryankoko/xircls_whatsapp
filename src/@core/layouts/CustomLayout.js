// ** React Imports
// import { Outlet } from 'react-router-dom'
import { Outlet, useLocation } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import "../assets/main.css"

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'

// ** Third Party Components
import classnames from 'classnames'
import { PermissionProvider } from '../../Helper/Context'

const CustomLayout = () => {
  // ** States
  const [isMounted, setIsMounted] = useState(false)
  // const [isDifferent, setisDifferent] = useState(false)
  const { pathname } = useLocation()
  const { userPermission } = useContext(PermissionProvider)
  // ** Hooks
  const { skin } = useSkin()

  console.log(pathname)

  useEffect(() => {
    setIsMounted(true)
    // const list = ['/new_signup/new_mode/', 'select-outlet', '/select_product/', '/outlet_details/', '/create_offers/', '/new_signup/', "/new_login/", "/plan_pricing/1/", "/merchant/SuperLeadz/intro/", "/merchant/SuperLeadz/TheAudience/", "/merchant/SuperLeadz/Editbutton/", '/merchant/SuperLeadz/Thebutton/', '/merchant/SuperLeadz/discount/', '/merchant/SuperLeadz/joinus/']
    // if (list.includes(pathname)) {
    //   setisDifferent(true)
    //   console.log(true)
    // } else {
    //   setisDifferent(false)
    //   console.log(false)
    // }
    return () => setIsMounted(false)
  }, [pathname])

  if (!isMounted) {
    return null
  }
  console.log(userPermission?.appName)
  return (
    <div
      className={classnames('blank-page', {
        'dark-layout': skin === 'dark'
      })}
    >
      <div className={`app-content content app_${userPermission?.appName}`}>
        <div className='content-wrapper'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default CustomLayout
