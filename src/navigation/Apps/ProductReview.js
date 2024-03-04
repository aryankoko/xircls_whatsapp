import { Circle, Home } from "react-feather"
import { AiFillPhone } from "react-icons/ai"
import { BiDollar } from "react-icons/bi"
import { DefaultNav } from "./DefualtNav"

export const ProductReviewNavigation = [
    ...DefaultNav,
    {
        header: 'Product Review'
    },
    {
        id: 'product-review',
        title: 'Home',
        icon: <Circle size={20} />,
        navLink: '/merchant/product-review'
    },
    {
        id: 'analytics',
        title: 'Analytics',
        icon: <Circle size={20} />,
        navLink: '/merchant/analytics'
    },
    {
        id: 'reviews',
        title: 'Manage Reviews',
        icon: <Circle size={20} />,
        navLink: '/merchant/reviews'
    }
]