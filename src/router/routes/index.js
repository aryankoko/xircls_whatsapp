// ** React Imports
import { Fragment } from 'react'
// ** Layouts
import BlankLayout from '@layouts/BlankLayout'
import VerticalLayout from '@src/layouts/VerticalLayout'
import HorizontalLayout from '@src/layouts/HorizontalLayout'
import LayoutWrapper from '@src/@core/layouts/components/layout-wrapper'

// ** Route Components
import PublicRoute from '@components/routes/PublicRoute'
import PrivateRoute from '@components/routes/PrivateRoute'
import AdminRoute from '@components/routes/AdminRoute'
// ** Utils
import { isObjEmpty } from '@utils'

import Dashboard_Routes from './Dashboard'
import Customers_Routes from './Customer'
// import Xircls_Frontend_Routes from './Xircls_Frontend'
import Reports_Routes from './Reports'
import Auth_merhant_Routes from './Auth_merchant'
import Outlet_Routes from './Outlet'
import Subcription_Routes from './Subscription'
import NewFrontBase_Routes from './NewFrontBase'
import CrossMarketing_Routes from './CrossMarketing'
import Product_Routes from './Products'
import SuperLeads_Routes from './SuperLeadz'
import CustomLayout from '../../@core/layouts/CustomLayout'
import FullWidthLayout from '../../@core/layouts/FullWidthLayout'
import Admin_Routes from './Admin'
import Profile_Routes from './Profile'
import Referral_Routes from './Referral'
import FlashAccounts_Routes from './FlashAccounts'
import { ProductReview_Routes } from './ProductReviews'
import { OhMyCustomer_Routes } from './OhMyCustomer'
import Homes_Routes from './Home'
import HomeLayout from '../../@core/layouts/HomeLayout'
import Accounts_Routes from './Accounts'
import NewBlankLayout from '../../@core/layouts/NewBlankLayout'
import { WhatsAppRoutes } from './WhatsAppRoutes'


const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />,
  custom: <CustomLayout />,
  fullWidthLayout: <FullWidthLayout />,
  homeLayout: <HomeLayout />,
  NewBlank: <NewBlankLayout />
}

// const { appName } = useContext(PermissionProvider)
// conosle.log(appName)
// ** Document title

const TemplateTitle = '%s - XIRCLS React Admin Template'

// ** Default Route
const DefaultRoute = '/'

// ** Merge Routes
// const Routess = {
//   infiniti: [
//     ...Dashboard_Routes,
//     ...Customers_Routes,
//     ...Reports_Routes,
//     ...Auth_merhant_Routes,
//     ...Outlet_Routes,
//     ...Subcription_Routes,
//     ...NewFrontBase_Routes,
//     ...CrossMarketing_Routes,
//     ...Product_Routes
//   ],
//   superleadz: [...SuperLeads_Routes]
// }

// const app_name = localStorage.getItem('app_name')

const Routes = [
  ...Admin_Routes,
  ...Dashboard_Routes,
  ...Customers_Routes,
  ...Reports_Routes,
  ...Auth_merhant_Routes,
  ...Outlet_Routes,
  ...Subcription_Routes,
  ...NewFrontBase_Routes,
  ...CrossMarketing_Routes,
  ...Product_Routes,
  ...SuperLeads_Routes,
  ...Referral_Routes,
  ...FlashAccounts_Routes,
  // ...Xircls_Frontend_Routes,
  ...Homes_Routes,
  ...Profile_Routes,
  ...ProductReview_Routes,
  ...OhMyCustomer_Routes,
  ...Accounts_Routes,
  ...WhatsAppRoutes
]
// if (app_name && Routess[app_name]) {
//   Routes = [
//     ...Routess[app_name],
//     ...Xircls_Frontend_Routes
//   ]
// } else {
//   Routes = [...Xircls_Frontend_Routes]
// }

// console.log(Routes)

const getRouteMeta = route => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta }
    } else {
      return {}
    }
  }
}

// ** Return Filtered Array of Routes & case
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = []

  if (Routes) {
    Routes.filter(route => {
      // console.log(route?.meta?.publicRoute, "route")
      let isBlank = false
      // let isCustom = false
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) && defaultLayout === layout)
      ) {
        
        const RouteTag = route?.meta?.publicRoute ? PublicRoute : route?.meta?.isAdmin ? AdminRoute : PrivateRoute
        // const RouteTag = PublicRoute

        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === 'blank' ? (isBlank = true) : (isBlank = false)
          // route.meta.layout === 'custom' ? (isCustom = true) : (isCustom = false)
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
                LayoutWrapper
              : Fragment

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>
                  {route.element}
              </RouteTag>
            </Wrapper>
          )
        }

        // if (route?.permissions) {
        //   
        // }
        LayoutRoutes.push(route)
        // Push route to LayoutRoutes
        
      }
      return LayoutRoutes
    })
  }
  return LayoutRoutes
}

const getRoutes = layout => {
  const defaultLayout = layout || 'vertical'
  const layouts = ['vertical', 'horizontal', 'blank', 'custom', 'fullWidthLayout', 'homeLayout', 'NewBlank']

  const AllRoutes = []

  layouts.forEach(layoutItem => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout)

    AllRoutes.push({
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes
    })
  })
  return AllRoutes
}

export { DefaultRoute, TemplateTitle, Routes, getRoutes }
