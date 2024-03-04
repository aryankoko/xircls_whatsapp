import { lazy } from 'react'
const Dashboard = lazy(() => import('../../views/dashboard/Dashboard'))
import Affiliate from '../../views/Affiliate/Affiliate'

const appName = "infiniti"
const Dashboard_Routes = [
  {
    path: '/merchant/dashboard/',
    element: <Dashboard />,
    app: appName,
    permissions: ['Infiniti']
  },
  {
    path: '/merchant/dashboard/affiliate/',
    element: <Affiliate />
  }
]

export default Dashboard_Routes