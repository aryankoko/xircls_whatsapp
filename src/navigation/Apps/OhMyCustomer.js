import { Circle, Home } from "react-feather"
import { DefaultNav } from "./DefualtNav"

export const OhMyCustomerNavigation = [
    ...DefaultNav,
    {
        header: 'Oh My Customer'
    },
    {
        id: 'dashboard',
        title: 'Dashboard',
        icon: <Circle size={20} />,
        navLink: '/merchant/oh-my-customer/'
    },
    {
        id: 'customization',
        title: 'Customization',
        icon: <Circle size={20} />,
        navLink: '/merchant/oh-my-customer/customization/'
    }
]