// ** React Imports
import { Outlet } from 'react-router-dom'

// ** Core Layout Import
// !Do not remove the Layout import
import Layout from '@layouts/HorizontalLayout'
import { useContext } from 'react'
import { PermissionProvider } from '../Helper/Context'
import { DefaultNav } from '../navigation/Apps/DefualtNav'
import { flashAccountsNavigation } from '../navigation/Apps/FlashAccounts'
import { referralNavigation } from '../navigation/Apps/Referral'
import { ProductReviewNavigation } from '../navigation/Apps/ProductReview'
import { CRMNavigation } from '../navigation/Apps/CRM'
import { WhatsappNavigation } from '../navigation/Apps/Whatsapp'

// ** Menu Items Array
// import navigation from '@src/navigation/horizontal'

const HorizontalLayout = props => {
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

export default HorizontalLayout
