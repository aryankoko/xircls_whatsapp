import React from 'react'
import NavbarAdmin from './NavbarAdmin'
import { Link, useLocation } from 'react-router-dom'

const ReportsNav = () => {
  const {pathname} = useLocation()
  // const [activeLink, setActiveLink] = useState(pathname) // Initialize with the default active link
  // const handleLinkClick = (pathname) => {
  //   setActiveLink(pathname)
  //   console.log(pathname)
  // }
  // console.log(pathname)

  return (
    <div>
      {/* Navbar Starts */}
      <div className='d-flex align-items-center justify-content-between p-2 text-center' style={{ width: '100%', backgroundColor: '#7367F0' }}>
        <h1 style={{ color: 'white', textAlign: 'center', marginLeft: '30px' }} className='d-flex align-items-center '>
          Reports
        </h1>
        <NavbarAdmin /> 
      </div>
      <div className='d-flex align-items-center justify-content-center p-1 text-center gap-5' style={{ width: '100%', backgroundColor: '#9990f5' }}>
        <Link to="/admin/reports">
          <h4
            className={pathname === '/admin/reports' ? 'text-warning' : 'text-white'}
            // onClick={() => handleLinkClick('/admin/reports')}
          >
            Main
          </h4>
        </Link>
        <Link to="/admin/reports/users">
          <h4
            className={pathname === '/admin/reports/users' ? 'text-warning' : 'text-white'}
            // onClick={() => handleLinkClick('users')}
          > 
            Users
          </h4>
        </Link>
        <Link to="/admin/reports/leadsrep">
          <h4
            className={pathname === '/admin/reports/leadsrep' ? 'text-warning' : 'text-white'}
            // onClick={() => handleLinkClick('leadsrep')}
          >
            Leads
          </h4>
        </Link>
        <Link to="/admin/reports/detailrep">
          <h4
            className={pathname === '/admin/reports/detailrep' ? 'text-warning' : 'text-white'}
            // onClick={() => handleLinkClick('detailrep')}
          >
            Detailed
          </h4>
        </Link>
        <Link to="/admin/reports/outlets/">
          <h4
            className={pathname === '/admin/reports/outlets/' ? 'text-warning' : 'text-white'}
            // onClick={() => handleLinkClick('detailrep')}
          >
            Outlets
          </h4>
        </Link>
      </div>
      {/* Navbar Ends */}
    </div>
  )
}

export default ReportsNav
