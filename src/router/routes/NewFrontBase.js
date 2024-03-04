import { lazy } from 'react'
const NewNetworkDashboard = lazy(() => import('../../views/NewFrontBase/NewNetworkDashboard'))
const SelectProduct = lazy(() => import('../../views/NewFrontBase/SelectProduct'))
const Plan_pricing = lazy(() => import('../../views/NewFrontBase/Plan_pricing'))
const CreateOffers = lazy(() => import('../../views/NewFrontBase/Create_offers'))
const NewSelectCountry = lazy(() => import('../../views/NewFrontBase/NewSelectCountry'))
const NewSignup = lazy(() => import('../../views/NewFrontBase/NewSignup'))
const NewSelectMode = lazy(() => import('../../views/NewFrontBase/NewSelectMode'))
const NewCreateCompany = lazy(() => import('../../views/NewFrontBase/NewCreateCompany'))
const NewLogin = lazy(() => import('../../views/NewFrontBase/NewLogin'))
const NewOutletDetails = lazy(() => import('../../views/NewFrontBase/NewOutletDetails'))

const NewFrontBase_Routes = [
  {
    path: '/selectmode',
    element: <NewSelectMode />,
    meta: {
      layout: 'blank'
    }
  },
  {
    path: '/new_login/',
    element: <NewLogin />,
    meta: {
      layout: 'blank'
    }
  },
  {
    path: '/new_signup/',
    element: <NewSignup />,
    meta: {
      layout: 'blank'
    }
  },
  {
    path: '/new_signup/new_country/',
    element: <NewSelectCountry />,
    meta: {
      layout: 'blank'
    }
  },
  {
    path: '/new_signup/new_mode/',
    element: <NewSelectMode />,
    meta: {
      layout: 'blank'
    }
  },
  {
    path: '/select_product/',
    element: <SelectProduct />,
    meta: {
      layout: 'blank'
    }
  },
  {
    path: '/plan_pricing/:id',
    element: <Plan_pricing />
  },
  {
    path: '/new_create_company/',
    element: <NewCreateCompany />,
    meta: {
      layout: 'blank'
    }
  },
  {
    path: '/outlet_details/',
    element: <NewOutletDetails />,
    meta: {
      layout: 'blank'
    }
  },
  {
    path: '/new_network_dashboard/',
    element: <NewNetworkDashboard />
  },
  {
    path: '/merchant/create_offers/',
    element: <CreateOffers />
  },
  {
    path: '/merchant/create_offers/:offerId/',
    element: <CreateOffers />
  }
]

export default NewFrontBase_Routes