import React, { lazy } from 'react'
import ViewOffers from '../../views/CrossMarketing/ViewOffers'
import ViewInnerXircl from '../../views/CrossMarketing/ViewInnerXircl'
import PreviewInnerXircl from '../../views/CrossMarketing/PreviewInnerXircl'
const Website = lazy(() => import('../../views/Plugin/Website/Website'))
const Action = lazy(() => import('../../views/Plugin/Action/Action'))
const Campaign = lazy(() => import('../../views/Plugin/Campaign/Campaign'))
const Email = lazy(() => import('../../views/Plugin/Email/Email'))
const Remarketing = lazy(() => import('../../views/Plugin/Remarketing/Remarketing'))
const Target = lazy(() => import('../../views/Plugin/Target/Target'))
const ThankYou = lazy(() => import('../../views/Plugin/ThankYou/ThankYou'))
const Plugin = lazy(() => import('../../views/Plugin/Plugin'))
const InviteABusiness = lazy(() => import('../../views/CrossMarketing/InviteABusiness'))
const CustomerGroup = lazy(() => import('../../views/CrossMarketing/CustomerGroup'))
const SelectOfferTarget = lazy(() => import('../../views/CrossMarketing/SelectOfferTarget'))
const AddInnerXircl = lazy(() => import('../../views/CrossMarketing/AddInnerXircl'))
const InnerXirclTwo = lazy(() => import('../../views/CrossMarketing/InnerXirclTwo'))
const LoyaltySelectOffers = lazy(() => import('../../views/CrossMarketing/LoyaltySelectOffers'))
const TermsConditions = lazy(() => import('../../views/CrossMarketing/TermsConditions'))

const CrossMarketing_Routes = [
    {
      path: '/merchant/plugin/',
      element: <Plugin />,
      children: [
        {
          path: '/merchant/plugin/website/',
          element: <Website />
        },
        {
          path: '/merchant/plugin/action/',
          element: <Action />
        },
        {
          path: '/merchant/plugin/campaign/',
          element: <Campaign />
        },
        {
          path: '/merchant/plugin/email/',
          element: <Email />
        },
        {
          path: '/merchant/plugin/remarketing/',
          element: <Remarketing />
        },
        {
          path: '/merchant/plugin/target/',
          element: <Target />
        },
        {
          path: '/merchant/plugin/thankyou/',
          element: <ThankYou />
        }
        
      ]
    },
    {
      path: '/merchant/xircls/create-network/',
      element: <InviteABusiness />
    },
    {
      path: "/merchant/xircls/inner-xircl/inner_xircl_one/",
      element: <AddInnerXircl />
    },
    {
      path: "/merchant/xircls/inner-xircl/inner_xircl_one/:id/",
      element: <AddInnerXircl />
    },
    {
      path: "/merchant/xircls/inner-xircl/inner_xircl_targeting/:id",
      element: <SelectOfferTarget />
    },
    {
      path: "/merchant/customers/priv-groups/",
      element: <CustomerGroup />
    },
    {
      path: "/merchant/xircls/inner-xircl/inner_xircl_two/:id",
      element: <InnerXirclTwo />
    },
    {
      path: "/merchant/xircls/inner-xircl/task1/:id",
      element: <LoyaltySelectOffers />
    },
    {
      path: "/merchant/offers/",
      element: <ViewOffers />
    },
    {
      path: "/merchant/view_inner_xircl/",
      element: <ViewInnerXircl />
    },
    {
      path: "/merchant/preview_inner_xircl/:id/",
      element: <PreviewInnerXircl />
    },
    {
      path: "/merchant/outlets/tandc/:id/",
      meta: {
        layout: "custom"
      },
      element: <TermsConditions />
    }

]
export default CrossMarketing_Routes