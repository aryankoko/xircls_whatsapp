import { lazy } from 'react'

// const ContactUs = lazy(() => import('@src/views/main/forms/contactUs/ContactUs'))
// const Superleadz_Pricing = lazy(() => import('@src/views/main/products/superLeadz/SuperLeadz/Superleadz_Pricing'))
// const SuperLeadzFaq = lazy(() => import('@src/views/main/products/superLeadz/SuperLeadz/SuperLeadzFaq'))
// const Sniper = lazy(() => import('@src/views/main/products/sniper/Sniper'))
// const FaqPartner = lazy(() => import('@src/views/main/partner/FaqPartner'))
// const Infiniti = lazy(() => import('@src/views/main/products/infiniti/Infiniti'))
// const Semper = lazy(() => import('@src/views/main/products/semper/Semper'))

// const PolicyPage = lazy(() => import('@src/views/main/utilities/terms/PolicyPage'))

// const WhyXircls = lazy(() => import('@src/views/main/company/whyXircls/WhyXircls'))
// const TermsPage = lazy(() => import('@src/views/main/utilities/terms/TermsPage'))
// const Collab = lazy(() => import('@src/views/main/company/collab/Collab'))
// const Blog = lazy(() => import('@src/views/main/company/blog/Blog'))
// const BlogDetails = lazy(() => import('@src/views/main/company/blog/BlogDetails'))
// const Blogger = lazy(() => import('@src/views/main/company/blog/Blogger'))

// const AffiliateLoginPage = lazy(() => import('../../views/main/forms/affiliateLogin/AffiliateLoginPage'))
// const AffiliateSignupPage = lazy(() => import('../../views/main/forms/affiliateLogin/AffiliateSignupPage'))
// const LoginPage = lazy(() => import('@src/views/main/forms/Login/LoginPage'))
// const ForgetPassword = lazy(() => import('@src/views/main/forms/Login/ForgetPassword'))
// const SignupPage = lazy(() => import('@src/views/main/forms/Signup/SignupPage'))

// const Developer = lazy(() => import('@src/views/main/developer/Developer'))
// const SuperLeadz = lazy(() => import('@src/views/main/products/superLeadz/SuperLeadz/SuperLeadz'))
// const Vision = lazy(() => import('@src/views/main/company/vision/Vision'))
// const Features = lazy(() => import('@src/views/main/products/superLeadz/features/Features'))
// const Team = lazy(() => import('@src/views/main/company/team/Team'))
// const Partner = lazy(() => import('@src/views/main/partner/Partner'))
const Home = lazy(() => import('@src/views/main/home/Home'))

const Apps = lazy(() => import('../../views/Apps/Apps'))
// const Error = lazy(() => import('../../views/Error'))
const Processing = lazy(() => import('../../views/Flow/Processing'))
const MerchantHome = lazy(() => import('../../views/Apps/Home'))
const FlowLogin = lazy(() => import("../../views/Flow/Login"))
const FlowSignUp = lazy(() => import("../../views/Flow/SignUp"))
import VerfiyYourEmail from '../../views/XirclsFrontend/VerfiyYourAccount'
import InstallFailed from '../../views/XirclsFrontend/InstallFailed'
// import Skin_type_form from '../../views/XirclsFrontend/test/Skin_type_form'
// import FlashAccount from '../../views/main/products/flash/FlashAccount'
// import FaqFlash from '../../views/main/products/flash/FaqFlash'
// import Flash_Pricing from '../../views/main/products/flash/Flash_Pricing'

const Homes_Routes = [

  {
    path: '/',
    element: <Home />,
    meta: {
      layout: "custom",
      publicRoute: true
    },
    title: "An end-to-end martech stack for every step of the buyer journey."
  },
  // {
  //   path: '/partners',
  //   element: <Partner />,
  //   meta: {
  //     layout: "homeLayout",
  //     publicRoute: true
  //   },
  //   title: "Partners - Grow your business"
  // },
  // {
  //   path: '/partners/faq',
  //   element: <FaqPartner />,
  //   meta: {
  //     layout: "homeLayout",
  //     publicRoute: true
  //   },
  //   title: "Partners FAQ: Grow your business"
  // },

  // {
  //   path: '/products/superleadz/',
  //   element: <SuperLeadz />,
  //   meta: {
  //     layout: "homeLayout",
  //     publicRoute: true
  //   },
  //   title: "SuperLeadz - Lead generation, nurturing and conversion"
  // },

  // {
  //   path: '/products/superleadz/features/',
  //   element: <Features />,
  //   meta: {
  //     layout: "homeLayout",
  //     publicRoute: true
  //   },
  //   title: "Features - Lead generation, nurturing and conversion"
  // },
  // {
  //   path: '/products/superleadz/pricing/',
  //   element: <Superleadz_Pricing />,
  //   meta: {
  //     layout: "homeLayout",
  //     publicRoute: true
  //   },
  //   title: "Pricing - Lead generation, nurturing and conversion"
  // },
  // {
  //   path: '/products/superleadz/faq',
  //   element: <SuperLeadzFaq />,
  //   meta: {
  //     layout: "homeLayout",
  //     publicRoute: true
  //   },
  //   title: "FAQ - Lead generation, nurturing and conversion"
  // },
  // {
  //   path: '/products/sniper/',
  //   element: <Sniper />,
  //   meta: {
  //     layout: "homeLayout",
  //     publicRoute: true
  //   },
  //   title: " Sniper - Customer acquisition"
  // },
  // {
  //   path: '/products/infiniti/',
  //   element: <Infiniti />,
  //   meta: {
  //     layout: "homeLayout",
  //     publicRoute: true
  //   },
  //   title: "Infiniti - Customer acquisition and loyalty"

  // },
  // {
  //   path: '/products/semperfi/',
  //   element: <Semper />,
  //   meta: {
  //     layout: "homeLayout",
  //     publicRoute: true
  //   },
  //   title: "Semper Fi - Customer loyalty"
  // },
  // {
  //   path: '/products/flash-accounts/',
  //   element: <FlashAccount />,
  //   meta: {
  //     layout: "homeLayout",
  //     publicRoute: true
  //   },
  //   title: "Semper Fi - Customer loyalty"
  // },
  // {
  //   path: '/products/flash-accounts/faq',
  //   element: <FaqFlash />,
  //   meta: {
  //     layout: "homeLayout",
  //     publicRoute: true
  //   },
  //   title: "Semper Fi - Customer loyalty"
  // },
  // {
  //   path: '/products/flash-accounts/pricing',
  //   element: <Flash_Pricing />,
  //   meta: {
  //     layout: "homeLayout",
  //     publicRoute: true
  //   },
  //   title: "Semper Fi - Customer loyalty"
  // },
  // {
  //   path: '/contact-us/:type',
  //   element: <ContactUs />,
  //   meta: {
  //     layout: "homeLayout",
  //     publicRoute: true
  //   }
  // },
  // {
  //   path: '/contact-us',
  //   element: <ContactUs />,
  //   meta: {
  //     layout: "homeLayout",
  //     publicRoute: true
  //   },
  //   title: "Contact us"
  // },
  // {
  //   path: '/about-us/why-XIRCLS',
  //   element: <WhyXircls />,
  //   meta: {
  //     layout: "homeLayout",
  //     publicRoute: true
  //   },
  //   title: "Why XIRCLS - Democratizing Martech for Sustainable Growth."
  // },
  // {
  //   path: '/about-us/why-collaborative-marketing/',
  //   element: <Collab />,
  //   meta: {
  //     layout: "homeLayout",
  //     publicRoute: true
  //   },
  //   title: "Why Collaborative Marketing - Because Life is Collaboration, Not Competition."
  // },
  // {
  //   path: '/about-us/vision-&-mission-statement/',
  //   element: <Vision />,
  //   meta: {
  //     layout: "homeLayout",
  //     publicRoute: true
  //   },
  //   title: "Vision & Mission - To Empower Businesses, Globally"
  // },
  // {
  //   path: '/blog',
  //   element: <Blog />,
  //   meta: {
  //     layout: "homeLayout",
  //     publicRoute: true
  //   },
  //   title: "Blog: News, opinions and perspectives"
  // },
  // {
  //   path: '/blog/Conflict-Torture-or-Tool/',
  //   element: <BlogDetails blogTitle={"Conflict-Torture-or-Tool"} />,
  //   meta: {
  //     layout: "homeLayout",
  //     publicRoute: true
  //   }
  // },
  // {
  //   path: '/blog/Collaborative-Marketing-and-the-Future-of-ZeroParty-Data/',
  //   element: <BlogDetails blogTitle={"Collaborative-Marketing-and-the-Future-of-ZeroParty-Data"} />,
  //   meta: {
  //     layout: "homeLayout",
  //     publicRoute: true
  //   }
  // },
  // {
  //   path: '/blog/Why-Companies-Need-to-Move-From-Diversity-To-Inclusion/',
  //   element: <BlogDetails blogTitle={"Why-Companies-Need-to-Move-From-Diversity-To-Inclusion"} />,
  //   meta: {
  //     layout: "homeLayout",
  //     publicRoute: true
  //   }
  // },
  // {
  //   path: '/blog/Target-Audience-Are-Companies-At-War-With-Their-Customers/',
  //   element: <BlogDetails blogTitle={"Target-Audience-Are-Companies-At-War-With-Their-Customers"} />,
  //   meta: {
  //     layout: "homeLayout",
  //     publicRoute: true
  //   }
  // },
  // {
  //   path: '/blog/Current-Online-Marketing-Practices-Are-Making-You-Pay-More/',
  //   element: <BlogDetails blogTitle={"Current-Online-Marketing-Practices-Are-Making-You-Pay-More"} />,
  //   meta: {
  //     layout: "homeLayout",
  //     publicRoute: true
  //   }
  // },
  // {
  //   path: '/blog/Are-Bargain-Hunters-Killing-Your-Business/',
  //   element: <BlogDetails blogTitle={"Are-Bargain-Hunters-Killing-Your-Business"} />,
  //   meta: {
  //     layout: "homeLayout",
  //     publicRoute: true
  //   }
  // },
  // {
  //   path: '/blog/Mind-Games-Why-We-Buy-What-We-Buy/',
  //   element: <BlogDetails blogTitle={"Mind-Games-Why-We-Buy-What-We-Buy"} />,
  //   meta: {
  //     layout: "homeLayout",
  //     publicRoute: true
  //   }
  // },
  // {
  //   path: '/blog/Are-Influencers-Worth-The-Price-Tag/',
  //   element: <BlogDetails blogTitle={"Are-Influencers-Worth-The-Price-Tag"} />,
  //   meta: {
  //     layout: "homeLayout",
  //     publicRoute: true
  //   }
  // },
  // {
  //   path: '/blog/The-Harsh-Truth-About-Customer-Loyalty-Programs/',
  //   element: <BlogDetails blogTitle={"The-Harsh-Truth-About-Customer-Loyalty-Programs"} />,
  //   meta: {
  //     layout: "homeLayout",
  //     publicRoute: true
  //   }
  // },
  // {
  //   path: '/blog/Playing-With-Power-The-Danger-Of-Monopolies/',
  //   element: <BlogDetails blogTitle={"Playing-With-Power-The-Danger-Of-Monopolies"} />,
  //   meta: {
  //     layout: "homeLayout",
  //     publicRoute: true
  //   }
  // },
  // {
  //   path: '/blog/The-Devils-Currency-Our-Lives-For-Auction/',
  //   element: <BlogDetails blogTitle={"The-Devils-Currency-Our-Lives-For-Auction"} />,
  //   meta: {
  //     layout: "homeLayout",
  //     publicRoute: true
  //   }
  // },
  // {
  //   path: '/blog/author/Darina_Litvina/',
  //   element: <Blogger blogger={"Darina_Litvina"} />,
  //   meta: {
  //     layout: "homeLayout",
  //     publicRoute: true
  //   }
  // },
  // {
  //   path: '/blog/author/Ian_White/',
  //   element: <Blogger blogger={"Ian_White"} />,
  //   meta: {
  //     layout: "homeLayout",
  //     publicRoute: true
  //   }
  // },
  // {
  //   path: '/blog/author/Shakercha_Bradshaw/',
  //   element: <Blogger blogger={"Shakercha_Bradshaw"} />,
  //   meta: {
  //     layout: "homeLayout",
  //     publicRoute: true
  //   }
  // },
  // {
  //   path: '/blog/author/Adriana_Marcela_Torrenegra/',
  //   element: <Blogger blogger={"Adriana_Marcela_Torrenegra"} />,
  //   meta: {
  //     layout: "homeLayout",
  //     publicRoute: true
  //   }
  // },
  // {
  //   path: '/blog/author/Lauren_Deah/',
  //   element: <Blogger blogger={"Lauren_Deah"} />,
  //   meta: {
  //     layout: "homeLayout",
  //     publicRoute: true
  //   }
  // },
  // {
  //   path: '/blog/author/Kwanele_Ngobese/',
  //   element: <Blogger blogger={"Kwanele_Ngobese"} />,
  //   meta: {
  //     layout: "homeLayout",
  //     publicRoute: true
  //   }
  // },
  // {
  //   path: '/blog/author/Allie_Hinds/',
  //   element: <Blogger blogger={"Allie_Hinds"} />,
  //   meta: {
  //     layout: "homeLayout",
  //     publicRoute: true
  //   }
  // },
  // {
  //   path: '/blog/author/Peyton-Sweeney/',
  //   element: <Blogger blogger={"Peyton-Sweeney"} />,
  //   meta: {
  //     layout: "homeLayout",
  //     publicRoute: true
  //   }
  // },
  // {
  //   path: '/blog/author/Dineo-Magakwa/',
  //   element: <Blogger blogger={"Dineo-Magakwa"} />,
  //   meta: {
  //     layout: "homeLayout",
  //     publicRoute: true
  //   }
  // },
  // {
  //   path: '/blog/author/Lauren_Deah/',
  //   element: <Blogger blogger={"Lauren_Deah"} />,
  //   meta: {
  //     layout: "homeLayout",
  //     publicRoute: true
  //   }
  // },
  // {
  //   path: '/blog/author/Allie_Hinds/',
  //   element: <Blogger blogger={"Allie_Hinds"} />,
  //   meta: {
  //     layout: "homeLayout",
  //     publicRoute: true
  //   }
  // },
  // {
  //   path: '/merchant/login',
  //   element: <LoginPage />,
  //   meta: {
  //     layout: "homeLayout",
  //     publicRoute: true
  //   },
  //   title: "Merchant Login"
  // },
  // {
  //   path: '/merchant/password_reset',
  //   element: <ForgetPassword />,
  //   meta: {
  //     layout: "homeLayout",
  //     publicRoute: true
  //   },
  //   title: "Password reset"
  // },
  // {
  //   path: '/merchant/signup',
  //   element: <SignupPage />,
  //   meta: {
  //     layout: "homeLayout",
  //     publicRoute: true
  //   },
  //   title: "Merchant Signup"
  // },
  // {
  //   path: '/affiliate/login',
  //   element: <AffiliateLoginPage />,
  //   meta: {
  //     layout: "homeLayout",
  //     publicRoute: true
  //   },
  //   title: "Affiliate Login"
  // },
  // {
  //   path: '/affiliate/signup',
  //   element: <AffiliateSignupPage />,
  //   meta: {
  //     layout: "homeLayout",
  //     publicRoute: true
  //   },
  //   title: "Affiliate Signup"
  // },
  // {
  //   path: '/terms-of-use/',
  //   element: <TermsPage />,
  //   meta: {
  //     layout: "homeLayout",
  //     publicRoute: true
  //   },
  //   title: "Terms of Use"
  // },
  // {
  //   path: '/privacy-policy/',
  //   element: <PolicyPage />,
  //   meta: {
  //     layout: "homeLayout",
  //     publicRoute: true
  //   },
  //   title: "Privacy Policy"
  // },
  {
    path: '/merchant/home/',
    element: <MerchantHome />
  },
  {
    path: '/merchant/apps/',
    element: <Apps />
  },
  {
    path: '*',
    element: <Home />,
    meta: {
      layout: "custom",
      publicRoute: true
    },
    title: "An end-to-end martech stack for every step of the buyer journey."
  },
  {
    path: '/processing/',
    element: <Processing />,
    meta: {
      layout: "custom",
      publicRoute: true
    }
  },
  {
    path: '/:flow/signup/',
    element: <FlowSignUp />,
    meta: {
      layout: "custom",
      publicRoute: true
    }
  },
  {
    path: '/flow/login/',
    element: <FlowLogin />,
    meta: {
      layout: "custom",
      publicRoute: true
    }
  },
  {
    path: '/merchant/verify-your-email/:slug/',
    element: <VerfiyYourEmail />,
    meta: {
      layout: 'custom',
      publicRoute: true
    }
  },
  {
    path: '/install_flow_failed/',
    element: <InstallFailed />,
    meta: {
      layout: 'custom',
      publicRoute: true
    }
  }
  // {
  //   path: '/codeskin/skin-type-test',
  //   element: <Skin_type_form />,
  //   meta: {
  //     layout: "NewBlank",
  //     publicRoute: true
  //   }
  // }
]

export default Homes_Routes
