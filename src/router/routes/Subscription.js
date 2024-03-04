import { lazy } from 'react'
const InvoiceList = lazy(() => import('../../views/subscription/InvoiceList'))
const MyTransactions = lazy(() => import('../../views/subscription/MyTransactions'))
const MyWallet = lazy(() => import('../../views/subscription/MyWallet'))
const Pricing = lazy(() => import('../../views/subscription/Plan_pricing'))
const SelectPlan = lazy(() => import('../../views/subscription/SelectPlan'))
const MySubscription = lazy(() => import('../../views/subscription/MySubscription'))


const Subcription_Routes = [
  {
    path: '/merchant/subscription/select_strategy/',
    element: <SelectPlan />
  },
  {
    path: '/merchant/subscription/select_strategy/:id',
    element: <SelectPlan />
  },
  {
    path: '/merchant/subscription/plan_purchase/:plan',
    element: <Pricing />
  },
  {
    path: '/merchant/subcriptions/my-subscriptions/',
    element: <MySubscription />
  },
  {
    path: '/merchant/subcriptions/my-transactions/',
    element: <MyTransactions />
  },
  {
    path: '/merchant/subcriptions/invoice_list/',
    element: <InvoiceList />
  },
  {
    path: '/merchant/subcriptions/my_wallet/',
    element: <MyWallet />
  }
]

export default Subcription_Routes