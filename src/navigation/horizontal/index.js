import {  BookOpen, Circle, Home, User } from 'react-feather'

export default [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: <Home size={20} />,
    navLink: '/merchant/dashboard'
  },
  {
    header: 'Apps & Pages'
  },
  {
    id: 'newtwork',
    title: 'Network',
    icon: <img style={{marginRight: '18px'}} src='https://api.xircls.com/static/images/website-slide/navbar/network.png' width='16px' />,
    navLink: '/merchant/add_partner/'
  },
  {
    id: 'inviteBusiness',
    title: 'Invite a Business',
    icon: <img style={{marginRight: '18px'}} src='https://api.xircls.com/static/images/website-slide/navbar/invite.png' width='16px' />,
    navLink: '/merchant/xircls/create-network/'
  },
  {
    id: 'crm',
    title: 'CRM',
    icon: <img style={{marginRight: '18px'}} src='https://api.xircls.com/static/images/website-slide/navbar/crm.png' width='16px' />,
    children: [
      {
        id: 'customers',
        title: 'Customers',
        icon: <img style={{marginRight: '18px'}} src='https://api.xircls.com/static/images/website-slide/navbar/customers.png' width='16px' />,
        navLink: '/merchant/customers/'
      },
      {
        id: 'customer_groups',
        title: 'Customer Groups',
        icon: <img style={{marginRight: '18px'}} src='https://api.xircls.com/static/images/website-slide/navbar/customer_group.png' width='16px' />,
        navLink: '/merchant/customers/priv-groups/'
      }
    ]
  },
  {
    id: 'campaign',
    title: 'Campaign',
    icon: <img style={{marginRight: '18px'}} src='https://api.xircls.com/static/images/website-slide/navbar/campaign.png' width='16px' />,
    children: [
      {
        id: 'infiniti',
        title: 'Infiniti',
        icon: <img style={{marginRight: '18px'}} src='https://api.xircls.com/static/images/website-slide/navbar/infiniti.png' width='16px' />,
        children: [
          {
            id: 'campaign_settings',
            title: 'Settings',
            icon: <img style={{marginRight: '18px'}} src='https://api.xircls.com/static/images/website-slide/navbar/settings.png' width='16px' />,
            navLink: '/merchant/plugin/website/'
          },
          {
            id: 'inner_xircl',
            title: 'Inner XIRCL',
            icon: <img style={{marginRight: '18px'}} src='https://api.xircls.com/static/images/website-slide/navbar/inner_xircl.png' width='16px' />,
            navLink: '/merchant/xircls/inner-xircl/inner_xircl_one/'
            
          },
          {
            id: 'product_view',
            title: 'Product View',
            icon: <img style={{marginRight: '18px'}} src='https://api.xircls.com/static/images/website-slide/navbar/category.png' width='16px' />,
            navLink: '/products/get-products-details/'

          }
        ]
      }
    ]
  },
  {
    id: 'reports',
    title: 'Reports',
    icon: <img style={{marginRight: '18px'}} src='https://api.xircls.com/static/images/website-slide/navbar/reports.png' width='16px' />,
    children: [
      {
        id: 'email',
        title: 'Email',
        icon: <Circle size={16} />,
        navLink: '/merchant/reports/'
      },
      {
        id: 'pva_partner',
        title: 'PVA Partner',
        icon: <Circle size={16} />,
        navLink: '/merchant/report/visual_reports/'
      },
      {
        id: 'thank_you_page',
        title: 'Thank You Page',
        icon: <Circle size={16} />,
        navLink: '/merchant/report/thankyou_reports/'
      },
      {
        id: 'superleadz',
        title: 'superleadz',
        icon: <Circle size={16} />,
        navLink: '/merchant/report/lead_gen/'
      }
    ]
  }
  
]
