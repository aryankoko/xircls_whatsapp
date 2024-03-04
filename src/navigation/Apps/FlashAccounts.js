import { Circle, Home } from "react-feather"
// import { ownUrl } from "../../views/Validator"
import { AiFillPhone, AiOutlineBars, AiOutlineHighlight } from "react-icons/ai"
import { BiDollar } from "react-icons/bi"
import { DefaultNav } from "./DefualtNav"

export const flashAccountsNavigation = [
    ...DefaultNav,
    {
        header: 'Flash Accounts'
    },
    {
        id: 'dashboard',
        title: 'Dashboard',
        icon: <Circle size={16} />,
        navLink: '/merchant/Flash_Accounts/'
    },
    {
        id: 'registered_customer',
        title: 'Customers',
        icon: <Circle size={16} />,
        navLink: '/merchant/Flash_Accounts/table/'
    },
    {
        id: 'templates',
        title: 'Templates',
        icon: <AiOutlineHighlight size={16} />,
        navLink: '/merchant/Flash_Accounts/Themes/'
    },
    {
        id: 'campaign',
        title: 'Campaigns',
        icon: <AiOutlineBars size={16} />,
        navLink: '/merchant/Flash_Accounts/all_campaigns/'
    },
    // {
    //     id: 'setup',
    //     title: 'Setup',
    //     icon: <Circle size={16} />,
    //     navLink: '/merchant/Flash_Accounts/form/'
    // },
    // {
    //     id: 'setting',
    //     title: 'Settings',
    //     icon: <Circle size={16} />,
    //     navLink: '/merchant/Flash_Accounts/settings/'
    // },
    {
        id: 'billing',
        title: 'Billing',
        icon: <BiDollar size={16} />,
        navLink: '/merchant/Flash_Accounts/billing/'
    },
    {
        id: 'support',
        title: 'Support',
        icon: <AiFillPhone size={16} />,
        navLink: '/merchant/support/'
    }
]