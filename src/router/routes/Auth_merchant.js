import { lazy } from 'react'

const Cart = lazy(() => import('../../views/AuthMerchant/Js/Cart'))
const ProgressPage = lazy(() => import('../../views/AuthMerchant/Js/ProgressPage'))
const InfinitiProgress = lazy(() => import('../../views/AuthMerchant/Js/InfinitiProgress'))
const Network = lazy(() => import('../../views/AuthMerchant/Js/Network'))
const AddPartner = lazy(() => import('../../views/AuthMerchant/AddPartner'))
const ProfilePage = lazy(() => import('../../views/AuthMerchant/ProfilePage'))
const Notification = lazy(() => import('../../views/AuthMerchant/Notifications'))
const TwoStepNotification = lazy(() => import('../../views/AuthMerchant/TwoStepNotification'))
const VerifyDomin = lazy(() => import('../../views/AuthMerchant/VerifyDomin'))
const VerifyEmail = lazy(() => import('../../views/AuthMerchant/VerifyEmail'))
const Faqs = lazy(() => import('../../views/AuthMerchant/Faqs'))

const Auth_merhant_Routes = [
  {
    path: '/merchant/cart/',
    element: <Cart />
  },
  {
    path: '/merchant/progress_1',
    element: <ProgressPage />
  },
  {
    path: '/merchant/progress_2',
    element: <InfinitiProgress />
  },
  {
    path: '/merchant/network/',
    element: <Network />
  },
  {
    path: '/merchant/add_partner/',
    element: <AddPartner />
  },
  {
    path: '/merchant/profile/',
    element: <ProfilePage />
  },
  {
    path: '/merchant/xircls/network_settings/',
    element: <Notification />
  },
  {
    path: '/merchant/account_settings/',
    element: <TwoStepNotification />
  },
  {
    path: '/merchant/verify_your_domain/',
    element: <VerifyDomin />
  },
  {
    path: '/merchant/verify_your_email/',
    element: <VerifyEmail />
  },
  {
    path: '/merchant/faqs/',
    element: <Faqs />
  }
]

export default Auth_merhant_Routes 