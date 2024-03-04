import { Circle, Home } from "react-feather"
import { DefaultNav } from "./DefualtNav"

export const referralNavigation = [
    ...DefaultNav,
    {
        header: 'Referral'
    },
    {
        id: 'home',
        title: 'Dashboard',
        icon: <Circle size={20} />,
        navLink: '/merchant/Referral/'
    },
    // {
    //     id: 'referralOffers',
    //     title: 'Offers',
    //     icon: <Circle size={20} />,
    //     navLink: '/merchant/Referral/create_offer/'
    // },
    {
        id: 'ReferralsTable',
        title: 'Offers',
        icon: <Circle size={20} />,
        navLink: '/merchant/Referral/offers/'
    },
    {
        id: 'ReferralsAnalysis',
        title: 'Referrals',
        icon: <Circle size={20} />,
        navLink: '/merchant/Referral/analysis/'
    },
    {
        id: 'ReferralsReports',
        title: 'Reports',
        icon: <Circle size={20} />,
        navLink: '/merchant/Referral/reports/'
    }
]