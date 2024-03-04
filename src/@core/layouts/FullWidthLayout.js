// ** React Imports
// import { Outlet } from 'react-router-dom'
import { Outlet, useLocation } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import "../assets/main.css"

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'

// ** Third Party Components
import classnames from 'classnames'
import NavbarUser from './components/navbar/NavbarUser'
import { PermissionProvider } from '../../Helper/Context'

const FullWidthLayout = () => {
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

  return (
    <div
      className={classnames('blank-page', {
        'dark-layout': skin === 'dark'
      })}
    >
      <div className={`app-content content app_${userPermission?.appName}`}>
        <div className='content-wrapper' style={{margin: "0px", maxWidth: "100%"}}>
          <div className="position-relative">
            <style>{`
              .container-xxl {
                margin: 0px !important;
                max-width: 100% !important;
              }
            `}</style>
            {/* <div className="position-absolute top-0 end-0 z-2">
              <NavbarUser disableName={true} />
            </div> */}
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FullWidthLayout
