import { lazy } from 'react'
const Analysis = lazy(() => import('../../views/Referral/Analysis'))
const Dashboard = lazy(() => import('../../views/Referral/Dashboard'))
const ReferralOffers = lazy(() => import('../../views/Referral/Offers'))
const Reports = lazy(() => import('../../views/Referral/Reports'))
const Table = lazy(() => import('../../views/Referral/Table'))

const appName = "referral"

const Referral_Routes = [
  {
    path: '/merchant/Referral/',
    app: appName,
    element: <Dashboard />
  },
  {
    path: '/merchant/Referral/create_offer/',
    app: appName,
    element: <ReferralOffers />
  },
  {
    path: "/merchant/Referral/reports/",
    app: appName,
    element: <Reports />
  },
  {
    path: "/merchant/Referral/offers/",
    app: appName,
    element: <Table />
  },
  {
    path: "/merchant/Referral/analysis/",
    app: appName,
    element: <Analysis />
  }
]

export default Referral_Routes