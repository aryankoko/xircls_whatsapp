import { lazy } from 'react'
import CustomizationParent from '../../views/SuperLeadz/CustomizationParent'
import AllCampaigns from '../../views/NewCustomizationFlow/AllCampaigns'
import CreateSupportTicket from '../../views/SuperLeadz/CreateSupportTicket'
import QuillTest from '../../views/NewCustomizationFlow/QuillTest'
import Customization from '../../views/SuperLeadz/Intro/Customization'
import Preview from '../../views/SuperLeadz/Preview'
import Overview from '../../views/SuperLeadz/campaignView/Overview'
import Appearance from '../../views/SuperLeadz/campaignView/Appearance'
import Rules from '../../views/SuperLeadz/campaignView/Rules'
import Duration from '../../views/SuperLeadz/campaignView/Duration'
import Campaign from '../../views/SuperLeadz/reports/Campaign'
import Offers from '../../views/SuperLeadz/reports/Offers'
const CreateOffers = lazy(() => import('../../views/SuperLeadz/CreateOffers'))
const EditSupport = lazy(() => import('../../views/SuperLeadz/EditSupport'))
const LiveUpdates = lazy(() => import('../../views/SuperLeadz/Live'))
const CustomTemplate = lazy(() => import('../../views/SuperLeadz/Customization/CustomTemplate'))
const ButtonPosition = lazy(() => import('../../views/SuperLeadz/Customization/ButtonPosition'))
const Intro = lazy(() => import('../../views/SuperLeadz/Intro/Intro'))
const TheAudience = lazy(() => import('../../views/SuperLeadz/Intro/TheAudience'))
const Editbutton = lazy(() => import('../../views/SuperLeadz/Intro/Editbutton')) 
const TheButton = lazy(() => import('../../views/SuperLeadz/Intro/TheButton')) 
const Discount = lazy(() => import('../../views/SuperLeadz/Intro/Discount'))
const JoinUs = lazy(() => import('../../views/SuperLeadz/JoinUs')) 
const FormEditor = lazy(() => import('../../views/FormBuilder/FormBuilder(components)/FormEditor')) 
const MyFormBuilder = lazy(() => import('../../views/FormBuilder/MyFormBuilder')) 
const NewCustomization = lazy(() => import('../../views/SuperLeadz/Customization/NewCustomization')) 
const SuperLeadzDashboard = lazy(() => import('../../views/SuperLeadz/Dashboard'))
const SuperLeadzLeads = lazy(() => import('../../views/SuperLeadz/Leads'))
const SuperLeadzPerformance = lazy(() => import('../../views/SuperLeadz/Performance'))
const SuperLeadzOffers = lazy(() => import('../../views/SuperLeadz/Offers'))
const SuperLeadzBilling = lazy(() => import('../../views/SuperLeadz/Billing'))
const SuperLeadzFAQ = lazy(() => import('../../views/SuperLeadz/FAQ'))
const SuperLeadzSupport = lazy(() => import('../../views/SuperLeadz/Support'))
const Themes = lazy(() => import('../../views/SuperLeadz/Customization/Themes'))
const SemperFi = lazy(() => import('../../views/SuperLeadz/SemperFi'))
const Editor = lazy(() => import('../../views/NewCustomizationFlow/Editor'))

const appName = "superleadz"

const SuperLeads_Routes = [
  {
    path: '/merchant/:appName/joinus/',
    app: appName,
    element: <JoinUs />
  },
  {
    path: '/merchant/SuperLeadz/',
    app: appName,
    element: <SuperLeadzDashboard />
  },
  {
    path: '/merchant/SuperLeadz/intro/',
    app: appName,
    element: <Intro />,
    meta: {
      layout: "blank"
    }
  },
  {
    path: '/merchant/SuperLeadz/TheAudience/',
    app: appName,
    element: <TheAudience />
  },
  {
    path: '/merchant/SuperLeadz/Editbutton/',
    app: appName,
    element: <Editbutton />
  },
  {
    path: '/merchant/SuperLeadz/Thebutton/',
    app: appName,
    element: <TheButton />,
    meta: {
      layout: "blank"
    }
  },
  {
    path: '/merchant/SuperLeadz/discount/',
    app: appName,
    element: <Discount />,
    meta: {
      layout: "blank"
    }
  },
  {
    path: '/merchant/SuperLeadz/leads/',
    app: appName,
    element: <SuperLeadzLeads />
  },
  // {
  //   path: '/merchant/SuperLeadz/performance/',
  // app: appName,
  //   element: <SuperLeadzPerformance />
  // },
  {
    path: '/merchant/SuperLeadz/offers/',
    app: appName,
    element: <SuperLeadzOffers />
  },
  {
    path: '/merchant/SuperLeadz/billing/',
    app: appName,
    element: <SuperLeadzBilling />
  },
  {
    path: '/merchant/SuperLeadz/FAQ/',
    app: appName,
    element: <SuperLeadzFAQ />
  },
  {
    path: '/merchant/support/',
    app: appName,
    element: <SuperLeadzSupport />
  },
  {
    path: '/merchant/SuperLeadz/create_offers/',
    app: appName,
    element: <CreateOffers />
  },
  {
    path: '/merchant/SuperLeadz/ticket/:id/',
    app: appName,
    element: <EditSupport />
  },
  {
    path: '/merchant/SuperLeadz/live/',
    app: appName,
    element: <LiveUpdates />
  }, 
  {
    path: '/merchant/SuperLeadz/CustomTemplate/',
    app: appName,
    element: <CustomTemplate />
  }, 
  {
    path: '/merchant/SuperLeadz/ButtonPosition/',
    app: appName,
    element: <ButtonPosition />
  }, 
  {
    path: '/merchant/SuperLeadz/MyFormBuilder/',
    app: appName,
    element: <FormEditor />,
    meta: {
      layout: 'fullWidthLayout'
    }
  }, 
  {
    path: '/merchant/SuperLeadz/quilltest/',
    app: appName,
    element: <QuillTest />,
    meta: {
      layout: 'fullWidthLayout'
    }
  }, 
  {
    path: '/merchant/SuperLeadz/Themes/',
    app: appName,
    element: <Themes />
  },
  {
    path: '/merchant/SuperLeadz/testfmb/',
    app: appName,
    element: <MyFormBuilder />,
    meta: {
      layout: 'fullWidthLayout'
    }
  },
  // {
  //   path: '/merchant/SuperLeadz/new_customization/',
  // app: appName,
  //   element: <NewCustomization />
  // },
  {
    path: '/merchant/SuperLeadz/new_customization/',
    app: appName,
    element: <CustomizationParent />,
    meta: {
      layout: 'fullWidthLayout'
    }
  },
  {
    path: '/merchant/SuperLeadz/new_customization/:EditThemeId/',
    app: appName,
    element: <CustomizationParent />,
    meta: {
      layout: 'fullWidthLayout'
    }
  },
  {
    path: '/merchant/SuperLeadz/all_campaigns/',
    app: appName,
    element: <AllCampaigns />
  },
  {
    path: '/merchant/SuperLeadz/semperfi/',
    app: appName,
    element: <SemperFi />
  },
  {
    path: '/merchant/create_support/',
    app: appName,
    element: <CreateSupportTicket />
  },
  {
    path: '/merchant/SuperLeadz/quick_setup/',
    app: appName,
    element: <Customization />
  },
  {
    path: '/merchant/SuperLeadz/preview/:id/',
    app: appName,
    element: <Preview />,
    meta: {
      layout: 'fullWidthLayout'
    }
  },
  {
    path: '/merchant/SuperLeadz/overview/:id/',
    app: appName,
    element: <Overview />
  },
  {
    path: '/merchant/SuperLeadz/appearance/:id/',
    app: appName,
    element: <Appearance />
  },
  {
    path: '/merchant/SuperLeadz/rules/:id/',
    app: appName,
    element: <Rules />
  },
  {
    path: '/merchant/SuperLeadz/duration/:id/',
    app: appName,
    element: <Duration />
  },
  {
    path: '/merchant/SuperLeadz/reports/campaign/',
    app: appName,
    element: <Campaign />
  },
  {
    path: '/merchant/SuperLeadz/reports/offers/',
    app: appName,
    element: <SuperLeadzPerformance />
  }
]

export default SuperLeads_Routes