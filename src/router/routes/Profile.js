// import { lazy } from 'react'

import General from "../../views/Profile/AdminView/General"
import Connections from "../../views/Profile/AdminView/Connections"
import Account from "../../views/Profile/AdminView/Account"
import Security from "../../views/Profile/AdminView/Security"
import Billing from "../../views/Profile/AdminView/Billing"
import Notifications from "../../views/Profile/AdminView/Notifications"
import AdminView from "../../views/Profile/AdminView"
import Transactions from "../../views/Profile/AdminView/Transactions"
import Invoices from "../../views/Profile/AdminView/Invoices"
import Wallet from "../../views/Profile/AdminView/Wallet"


const Profile_Routes = [
    {
        path: '/merchant/admin_view/',
        element: <AdminView />,
        children: [
          {
            path: '/merchant/admin_view/',
            element: <Account />
          },
          {
            path: '/merchant/admin_view/security/',
            element: <Security />
          },
          {
            path: '/merchant/admin_view/billing/',
            element: <Billing />
          },
          {
            path: '/merchant/admin_view/billing/my-transactions/',
            element: <Transactions />
          },
          {
            path: '/merchant/admin_view/billing/invoice_list/',
            element: <Invoices />
          },
          {
            path: '/merchant/admin_view/billing/my_wallet/',
            element: <Wallet />
          },
          {
            path: '/merchant/admin_view/notification/',
            element: <Notifications />
          },
          {
            path: '/merchant/admin_view/connections/',
            element: <Connections />
          },
          {
            path: '/merchant/admin_view/general/',
            element: <General />
          }
        ]
      }
]

export default Profile_Routes