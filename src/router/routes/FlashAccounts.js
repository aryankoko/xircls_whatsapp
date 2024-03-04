import { lazy } from 'react'
import Setting from '../../views/FlashAccounts/Setting'
import JoinUs from '../../views/SuperLeadz/JoinUs'
import FlashAccountsBilling from '../../views/FlashAccounts/Billing'
import Themes from '../../views/FlashAccounts/Themes.js'
import AdminSetting from '../../views/FlashAccounts/AdminSetting.js'
import Campaign from '../../views/FlashAccounts/Campaign.js'
const Table = lazy(() => import('../../views/FlashAccounts/Table'))
const Dashboard = lazy(() => import('../../views/FlashAccounts/Dashboard'))
const Form = lazy(() => import('../../views/FlashAccounts/Form.jsx'))

const appName = "flash_accounts"
const FlashAccounts_Routes = [
  {
    path: '/merchant/Flash_Accounts/',
    app: appName,
    element: <Dashboard />
  },
  {
    path: '/merchant/Flash_Accounts/table/',
    app: appName,
    element: <Table />
  },
  {
    path: "/merchant/Flash_Accounts/form/",
    app: appName,
    element: <Form />
  },
  {
    path: "/merchant/Flash_Accounts/themes/",
    app: appName,
    element: <Themes />
  },
  {
    path: "/merchant/Flash_Accounts/settings/:id",
    app: appName,
    element: <Setting />,
    meta: {
      layout: "fullWidthLayout"
    }
  },
  {
    path: "/merchant/Flash_Accounts/settings/",
    app: appName,
    element: <Setting />,
    meta: {
      layout: "fullWidthLayout"
    }
  },
  {
    path: "/merchant/Flash_Accounts/admin/settings/",
    app: appName,
    element: <Setting isAdmin={true} />,
    meta: {
      layout: "fullWidthLayout"
    }
  },
  {
    path: "/merchant/Flash_Accounts/billing/",
    app: appName,
    element: <FlashAccountsBilling />
  },
  {
    path: "/merchant/Flash_Accounts/all_campaigns/",
    app: appName,
    element: <Campaign />
  }
]

export default FlashAccounts_Routes