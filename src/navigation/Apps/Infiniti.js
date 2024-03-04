import { Circle, Home, Percent } from "react-feather"
import { ownUrl } from "../../views/Validator"
import { AiFillPhone, AiOutlineSmile } from "react-icons/ai"
import { DefaultNav } from "./DefualtNav"

export const InfinitiNavigation = [
  ...DefaultNav,
  {
    header: 'Infiniti'
  },
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: <Home size={20} />,
    navLink: '/merchant/dashboard/'
  },
  {
    id: 'newtwork',
    title: 'Network',
    icon: <img style={{ marginRight: '18px' }} src={`${ownUrl}/images/website-slide/navbar/network.png`} width='16px' />,
    navLink: '/merchant/add_partner/'
  },
  {
    id: 'inviteBusiness',
    title: 'Invite a Business',
    icon: <img style={{ marginRight: '18px' }} src={`${ownUrl}/images/website-slide/navbar/invite.png`} width='16px' />,
    navLink: '/merchant/xircls/create-network/'
  },
  {
    id: 'crm',
    title: 'CRM',
    icon: <img style={{ marginRight: '18px' }} src={`${ownUrl}/images/website-slide/navbar/crm.png`} width='16px' />,
    children: [
      {
        id: 'customers',
        title: 'Customers',
        icon: <img style={{ marginRight: '18px' }} src={`${ownUrl}/images/website-slide/navbar/customers.png`} width='16px' />,
        navLink: '/merchant/customers/'
      }
    ]
  },
  {
    id: 'campaign_settings',
    title: 'Settings',
    icon: <img style={{ marginRight: '18px' }} src={`${ownUrl}/images/website-slide/navbar/settings.png`} width='16px' />,
    navLink: '/merchant/plugin/website/'
  },
  {
    id: 'offers',
    title: 'Offers',
    icon: <Percent size={'16px'} />,
    navLink: '/merchant/offers/'
  },
  {
    id: 'inner_xircl',
    title: 'Inner XIRCL',
    icon: <img style={{ marginRight: '18px' }} src={`${ownUrl}/images/website-slide/navbar/inner_xircl.png`} width='16px' />,
    navLink: '/merchant/view_inner_xircl/'

  },
  {
    id: 'product_view',
    title: 'Product View',
    icon: <img style={{ marginRight: '18px' }} src={`${ownUrl}/images/website-slide/navbar/category.png`} width='16px' />,
    navLink: '/products/get-products-details/'

  },
  {
    id: 'reports',
    title: 'Reports',
    icon: <img style={{ marginRight: '18px' }} src={`${ownUrl}/images/website-slide/navbar/reports.png`} width='16px' />,
    children: [
      {
        id: 'total',
        title: 'Total',
        icon: <Circle size={16} />,
        navLink: '/merchant/reports/'
        // },
        // {
        //   id: 'partners',
        //   title: 'Partners',
        //   icon: <Circle size={16} />,
        //   navLink: '/merchant/report/reports/'
        // },
        // {
        //   id: 'pva_partner',
        //   title: 'PVA Partner',
        //   icon: <Circle size={16} />,
        //   navLink: '/merchant/report/visual_reports/'
      }
    ]
  },
  {
    id: 'support',
    title: 'Support',
    icon: <AiFillPhone size={16} />,
    navLink: '/merchant/support/'
  }

]