import { lazy } from 'react'
import TotalReachReports from '../../views/reports/TotalReachReports'
import TotalClicksReports from '../../views/reports/TotalClicksReports'
import TotalRedemptions from '../../views/reports/TotalRedemptions'
import TotalRevenue from '../../views/reports/TotalRevenue'
import IncentiveViewTotal from '../../views/reports/IncentiveViewTotal'
import IncentiveViewPartners from '../../views/reports/IncentiveViewPartners'
import IncentiveViewOwn from '../../views/reports/IncentiveViewOwn'
import AcquisitionReports from '../../views/reports/AcquisitionReports'
import RetentionReports from '../../views/reports/RetentionReports'
import OffersIssuedToPartner from '../../views/reports/OffersIssuedToPartner'
import OffersIssuedToOwn from '../../views/reports/OffersIssuedToOwn'
import PartnerClicksReports from '../../views/reports/PartnerClicksReports'
import OwnClicksReports from '../../views/reports/OwnClicksReports'
import PartnerRedemptions from '../../views/reports/PartnerRedemptions'
import OwnRedemptions from '../../views/reports/OwnRedemptions'
const Reports = lazy(() => import('../../views/reports/Reports'))
const ThankYouPage = lazy(() => import('../../views/reports/ThankYouPage'))
const PvaReports = lazy(() => import('../../views/reports/PvaReports'))
const LendGen = lazy(() => import('../../views/reports/LendGen'))


const Reports_Routes = [
  {
    path: '/merchant/reports/',
    element: <Reports />
  },
  {
    path: '/merchant/report/visual_reports/',
    element: <PvaReports />
  },
  {
    path: '/merchant/report/thankyou_reports/',
    element: <ThankYouPage />
  },
  {
    path: '/merchant/report/lead_gen/',
    element: <LendGen />
  },
  {
    path: "/merchant/reports/total_reach/",
    element: <TotalReachReports />
  },
  {
    path: "/merchant/reports/total_clicks/",
    element: <TotalClicksReports />
  },
  {
    path: "/merchant/reports/partner_clicks/",
    element: <PartnerClicksReports />
  },
  {
    path: "/merchant/reports/own_clicks/",
    element: <OwnClicksReports />
  },
  {
    path: "/merchant/reports/total_redemptions/",
    element: <TotalRedemptions />
  },
  {
    path: "/merchant/reports/partner_redemptions/",
    element: <PartnerRedemptions />
  },
  {
    path: "/merchant/reports/own_redemptions/",
    element: <OwnRedemptions />
  },
  {
    path: "/merchant/reports/total_revenue/",
    element: <TotalRevenue />
  },
  {
    path: "/merchant/reports/incentive_viewed_partners/",
    element: <IncentiveViewPartners />
  },
  {
    path: "/merchant/reports/incentive_viewed_total/",
    element: <IncentiveViewTotal />
  },
  {
    path: "/merchant/reports/incentive_viewed_own/",
    element: <IncentiveViewOwn />
  },
  {
    path: "/merchant/reports/acq_total/",
    element: <AcquisitionReports />
  },
  {
    path: "/merchant/reports/ret_total/",
    element: <RetentionReports />
  },
  {
    path: "/merchant/reports/offers_issued_to_partner/",
    element: <OffersIssuedToPartner />
  },
  {
    path: "/merchant/reports/offers_issued_to_own/",
    element: <OffersIssuedToOwn />
  }
]

export default Reports_Routes