// ** React Imports
import { Fragment, useContext, useState } from 'react'

// ** Custom Components
import NavbarUser from './NavbarUser'
// import NavbarSearch from './NavbarSearch'
// ** Third Party Components
import { Sun, Moon, Menu } from 'react-feather'

// ** Reactstrap Imports
import { DropdownItem, DropdownMenu, DropdownToggle, NavItem, NavLink, UncontrolledDropdown } from 'reactstrap'
import { FaLayerGroup } from 'react-icons/fa'
// import { getReq } from '../../../../assets/auth/jwtService'
import { useNavigate } from 'react-router-dom'
import { dashboardURL } from '../../../../views/Validator'
import { PermissionProvider, ActiveAppsProvider } from '../../../../Helper/Context'

const ThemeNavbar = props => {
  // ** Props
  const [userApps, setUserApps] = useState([])
  const { skin, setSkin, setMenuVisibility } = props
  const { setUserPermission, userPermission } = useContext(PermissionProvider)
  const { setActiveApps, activeApps } = useContext(ActiveAppsProvider)
  // ** Function to toggle Theme (Light/Dark)
  const ThemeToggler = () => {
    if (skin === 'semi-dark') {
      return <div title='Light mode'><Sun className='ficon' onClick={() => setSkin('light')} /></div>
    } else {
      return <div title='Semi-dark mode'><Moon className='ficon' onClick={() => setSkin('semi-dark')} /></div>
    }
  }
  // const getData = () => {
  //   getReq('getAllApps')
  //     .then((res) => {
  //       console.log(res)
  //       setUserApps(res?.data)
  //       // const updatedData = {
  //       //   isLoading: false
  //       // }
  //       // setData((preData) => ({
  //       //   ...preData,
  //       //   ...updatedData
  //       // }))
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //       // const updatedData = {
  //       //   isLoading: false
  //       // }
  //       // setData((preData) => ({
  //       //   ...preData,
  //       //   ...updatedData
  //       // }))
  //     })

  // }

  const navigate = useNavigate()

  // useEffect(() => {
  //   getData()
  // }, [])

  console.log(userApps, setActiveApps, setUserApps)


  return (
    <Fragment>
      <style>
        {`
          .app_cards:nth-child(odd) {
            border-right: 1px solid #ccc
          }
          .dropdown-menu[data-popper-placement]:not([data-popper-placement^="top-"]) {
            top: 40px !important;
          }
        `}
      </style>
      <div className='bookmark-wrapper d-flex align-items-center'>
        <ul className='navbar-nav d-xl-none'>
          <NavItem className='mobile-menu me-auto'>
            <NavLink className='nav-menu-main menu-toggle hidden-xs is-active' onClick={() => setMenuVisibility(true)}>
              <Menu className='ficon' />
            </NavLink>
          </NavItem>
        </ul>
        {/* d-lg-block */}
        <NavItem className='d-none d-lg-block'>
          <NavLink className='nav-link-style'>
            <ThemeToggler />
          </NavLink>
        </NavItem>
      </div>
      {/* <NavbarSearch /> */}
      {/* <a className='cursor-pointer'>
        
      </a> */}
      <UncontrolledDropdown tag='li' className='dropdown-notification nav-item me-25' style={{ listStyle: 'none' }}>
        <DropdownToggle tag='a' className='nav-link' href='/' onClick={e => e.preventDefault()}>
          <div className='d-flex justify-content-end align-items-center gap-1'>
            <FaLayerGroup size={'20px'} />

          </div>
        </DropdownToggle>
        <DropdownMenu end tag='ul' className='dropdown-menu-media mt-0 apps_dropdown' style={{ width: '450px', zIndex: '1000' }}>
          <li className='dropdown-menu-header' style={{ listStyle: 'none' }}>
            <DropdownItem className='d-flex' tag='div' header>
              <h4 className='notification-title mb-0 me-auto'>Shortcuts</h4>
            </DropdownItem>
          </li>
          {
            <>
              <div className='px-1'>
                <div className="row">
                  {
                    activeApps?.filter((curElem) => curElem.is_active).map((curElem) => {
                      return (userPermission.installedApps.includes(curElem.name.toLowerCase())) ? (
                        <div className="col-md-6 app_cards">
                          <DropdownItem tag={'div'} className='text-center py-2' onClick={() => {
                            setUserPermission({ ...userPermission, appName: curElem.name.toLowerCase() })
                            navigate(dashboardURL[curElem.name.toLowerCase()])
                          }}>
                            <h5>
                              <a onClick={() => {
                                setUserPermission({ ...userPermission, appName: curElem.name.toLowerCase() })
                                navigate(dashboardURL[curElem.name.toLowerCase()])
                              }}>
                                {curElem.name}
                              </a>
                            </h5>
                          </DropdownItem>
                        </div>
                      ) : ''
                    })
                  }

                </div>
              </div>
            </>
          }

        </DropdownMenu>
      </UncontrolledDropdown>
      <NavbarUser skin={skin} setSkin={setSkin} />
    </Fragment>
  )
}

export default ThemeNavbar
