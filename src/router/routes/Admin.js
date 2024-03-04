import { lazy } from 'react'
import Outlet from '../../views/Admin/Outlet'
//main login
const Admin = lazy(() => import('../../views/Admin/Admin'))
//logins
const AdminHome = lazy(() => import('../../views/Admin/AdminHome'))
//cps pages
const CPS = lazy(() => import('../../views/Admin/CPS'))
//reports pages
const MainDash = lazy(() => import('../../views/Admin/MainDash'))
const UserDash = lazy(() => import('../../views/Admin/UserDash'))
const DetailReport = lazy(() => import('../../views/Admin/DetailReport'))
const LeadsDash = lazy(() => import('../../views/Admin/LeadsDash'))

const Admin_Routes = [
  {
    path: '/admin/',
    element: <Admin />,
    meta: {
      layout: 'custom',
      publicRoute: true
    }
  },
  {
    path: '/admin/home',
    element: <AdminHome />,
    meta: {
      layout: 'custom',
      publicRoute: true
    }
  },
  {
    path: '/admin/cps',
    element: <CPS />,
    meta: {
      layout: 'custom',
      isAdmin: true
    }
  },
  {
    path: '/admin/reports',
    element: <MainDash />,
    meta: {
      layout: 'custom',
      isAdmin: true
    }
  },
  {
    path: '/admin/reports/users',
    element: <UserDash />,
    meta: {
      layout: 'custom',
      isAdmin: true
    }
  },
  {
    path: '/admin/reports/detailrep',
    element: <DetailReport />,
    meta: {
      layout: 'custom',
      isAdmin: true
    }
  },
  {
    path: '/admin/reports/leadsrep',
    element: <LeadsDash />,
    meta: {
      layout: 'custom',
      isAdmin: true
    }
  },
  {
    path: '/admin/reports/outlets/',
    element: <Outlet />,
    meta: {
      layout: 'custom',
      isAdmin: true
    }
  }
]

export default Admin_Routes