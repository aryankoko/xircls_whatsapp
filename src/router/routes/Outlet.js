import { lazy } from 'react'
import VerifyYourEmail from '../../views/Outlet/VerifyYourEmail'
import Campaign from '../../views/Apps/CampaignPage'
import VerifyYourDomain from '../../views/Outlet/VerifyYourDomain'
const OutletProfiling = lazy(() => import('../../views/Outlet/OutletProfiling'))
const TargetProfiling = lazy(() => import('../../views/Outlet/TargetProfiling'))
const AddCompany = lazy(() => import('../../views/Outlet/AddCompany'))
const CompanyDashboard = lazy(() => import('../../views/Outlet/CompanyDashboard'))
const SelectOutlet = lazy(() => import('../../views/Outlet/SelectOutlet'))
const OnlineOutletBasic = lazy(() => import('../../views/Outlet/OutletBasic'))
const OutletDetails = lazy(() => import('../../views/Outlet/OutletDetails'))
const SingleOutletDetails = lazy(() => import('../../views/Outlet/SingleOutletDetails'))
const ApiDocumentation = lazy(() => import('../../views/Outlet/ApiDocumentation'))

const appName = "infiniti"
const Outlet_Routes = [
  {
    path: '/merchant/select-outlet/',
    element: <SelectOutlet />,
    layout: 'BlankLayout',
    meta: {
      layout: 'blank'
    }
  },
  {
    path: '/merchant/outlets/create-online-outlet/',
    element: <OnlineOutletBasic />
  },
  {
    path: '/merchant/outlets/xircls-outlet-details/:id/',
    element: <SingleOutletDetails />
  },
  {
    path: '/merchant/outlets/',
    element: <OutletDetails />
  },
  {
    path: '/merchant/xircls-api-documentation/:slug',
    element: <ApiDocumentation />
  },
  {
    path: '/merchant/company/',
    element: <CompanyDashboard />
  },
  {
    path: '/merchant/company/profile/',
    element: <AddCompany />
  },
  {
    path: "/merchant/campaign/outlet_profiling/:id/",
    element: <OutletProfiling /> 
  },
  {
    path: "/merchant/campaign/target_profiling/:id/",
    element: <TargetProfiling /> 
  },
  {
    path: "/merchant/campaign/",
    app: appName,
    element: <Campaign /> 
  },
  {
    path: "/merchant/campaign/verify_your_domain/:id/",
    element: <VerifyYourDomain />
  },
  {
    path: "/merchant/campaign/verify_your_email/:id/",
    element: <VerifyYourEmail /> 
  }
]

export default Outlet_Routes