// ** React Imports
// import { Outlet } from 'react-router-dom'
import { Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import "../assets/main.css"

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'

// ** Third Party Components
import classnames from 'classnames'
import Navbar_CodeSkin from '../../views/XirclsFrontend/test/Navbar_CodeSkin'
// import Navbar from '../../views/main/utilities/navbar/Navbar'
// import Navbar_CodeSkin from '../../views/test/Navbar_CodeSkin'
// const Header = lazy(() => import('../../views/XirclsFrontend/base/Header'))

const NewBlankLayout = () => {
  // ** States
  const [isMounted, setIsMounted] = useState(false)
  const [isDifferent, setisDifferent] = useState(false)
  const { pathname } = useLocation()
  // ** Hooks
  const { skin } = useSkin()

  // console.log(pathname)

  useEffect(() => {
    setIsMounted(true)
    const list = ['/new_signup/new_mode/', 'select-outlet', '/select_product/', '/outlet_details/', '/create_offers/', '/new_signup/', "/new_login/", "/plan_pricing/1/", "/merchant/SuperLeadz/intro/", "/merchant/SuperLeadz/TheAudience/", "/merchant/SuperLeadz/Editbutton/", '/merchant/SuperLeadz/Thebutton/', '/merchant/SuperLeadz/discount/', '/merchant/SuperLeadz/joinus/']
    if (list.includes(pathname)) {
      setisDifferent(true)
      // console.log(true)
    } else {
      setisDifferent(false)
      // console.log(false)
    }
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
      <div className='app-content content'>
        <div className={`content-wrapper ${!isDifferent ? 'xircls_frontend' : 'new_frontend'}`}>
          {/* xircls_frontend */}
          <div className='content-body m-auto px-2' style={{ maxWidth: "1440px" }}>
            <Navbar_CodeSkin />
            <div style={{marginTop:"120px"}}>

            <Outlet />
            </div>
          </div>
          {/* <Header />
              <Outlet /> 
            <Footer /> */}
          {/* <Outlet /> */}
        </div>
      </div>
    </div>
  )
}

export default NewBlankLayout
