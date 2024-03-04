// ** React Imports
import { Outlet } from 'react-router-dom'
// ** Core Layout Import
// !Do not remove the Layout import
import Layout from '@layouts/VerticalLayout'
import { PermissionProvider } from '../Helper/Context'
import { useContext } from 'react'
// import { CRMNavigation } from '../navigation/Apps/CRM'
// import { DefaultNav } from '../navigation/Apps/DefualtNav'
import { SuperLeadzNavigation } from '../navigation/Apps/SuperLeadz'
import { InfinitiNavigation } from '../navigation/Apps/Infiniti'
import { referralNavigation } from '../navigation/Apps/Referral'
import { flashAccountsNavigation } from '../navigation/Apps/FlashAccounts'
// import { useContext } from 'react'
// import { PermissionProvider } from '../Helper/Context'
import { DefaultNav } from '../navigation/Apps/DefualtNav'
import { ProductReviewNavigation } from '../navigation/Apps/ProductReview'
import { OhMyCustomerNavigation } from '../navigation/Apps/OhMyCustomer'
import { CRMNavigation } from '../navigation/Apps/CRM'
import { WhatsappNavigation } from '../navigation/Apps/Whatsapp'
// import { getNavbar } from '../views/Validator'

// ** Menu Items Array
// import navigation from '@src/navigation/vertical'

const VerticalLayout = props => {

  const { userPermission } = useContext(PermissionProvider)

  let navigation = []

  if (userPermission?.appName === "superleadz") {
    navigation = SuperLeadzNavigation
  } else if (userPermission?.appName === "infiniti") {
    navigation = InfinitiNavigation
  } else if (userPermission?.appName === "referral") {
    navigation = referralNavigation
  } else if (userPermission?.appName === "flash_accounts") {
    navigation = flashAccountsNavigation
  } else if (userPermission?.appName === "product_review") {
    navigation = ProductReviewNavigation
  } else if (userPermission?.appName === "crm") {
    navigation = CRMNavigation
  } else if (userPermission?.appName === "whatsapp") {
    navigation = WhatsappNavigation
  } else {
    navigation = DefaultNav
  }

  return (
    <Layout menuData={navigation} {...props}>
      <Outlet />
    </Layout>
  )
}

export default VerticalLayout
