import { Share2, MessageSquare, PhoneCall, PenTool, User, FileText, MapPin, ShoppingBag, Server } from 'react-feather'
import Avatar from '@components/avatar'
import AvatarGroup from '@components/avatar-group'
import { Fragment } from 'react'
import { Badge, Button } from 'reactstrap'

export const basicData = [
  {
    title: 'Invoice Sent',
    content: "You've sent a Preferred Partner request to Bewakoof. You will be notified when your request is accepted",
    meta: '12 min ago',
    customContent: (
      <div className='d-flex align-items-center'>
        <span>Test account</span>
      </div>
    )
  }
]

export const iconsData = [
  {
    title: '12 Invoices have been paid',
    content: 'Invoices have been paid to the company.',
    icon: <PenTool size={14} />,
    meta: '12 min ago',
    customContent: (
      <div className='d-flex align-items-center'>
        <span>invoice.pdf</span>
      </div>
    )
  },
  {
    title: 'Client Meeting',
    content: 'Project meeting with john @10:15am.',
    meta: '45 min ago',
    icon: <User size={14} />,
    color: 'secondary',
    customContent: (
      <div className='d-flex align-items-center'>
        <div className='ms-50'>
          <h6 className='mb-0'>John Doe (Client)</h6>
          <span>CEO of Infibeam</span>
        </div>
      </div>
    )
  },
  {
    title: 'Interview Schedule',
    content: 'Have to interview Katy Turner for the developer job.',
    meta: '03:00 PM',
    icon: <MapPin size={14} />,
    color: 'warning',
    customContent: (
      <Fragment>
        <hr />
        <div className='d-flex justify-content-between flex-wrap'>
          <div className='d-flex align-items-center'>
            <div>
              <h6 className='mb-0'>Katy Turner</h6>
              <span className='text-muted'>Javascript Developer</span>
            </div>
          </div>
          <div className='d-flex flex-wrap align-items-center cursor-pointer mt-sm-0 mt-50'>
            <MessageSquare className='me-50' size={14} />
            <PhoneCall size={14} />
          </div>
        </div>
      </Fragment>
    )
  },
  {
    title: 'Online Store',
    content:
      'Develop an online store of electronic devices for the provided layout, as well as develop a mobile version of it. The must be compatible with any CMS.Develop an online store of electronic devices for the provided layout, as well as develop a mobile version of it. The must be compatible with any CMS.',
    meta: '03:00PM',
    icon: <ShoppingBag size={14} />,
    color: 'danger',
    customContent: (
      <div className='d-flex justify-content-between flex-wrap flex-sm-row flex-column'>
        <div>
          <p className='text-muted mb-50'>Developers</p>
          <div className='d-flex align-items-center'>
            <Avatar color='light-primary' className='me-50' content='A' size='sm' />
            <Avatar color='light-success' className='me-50' content='B' size='sm' />
            <Avatar color='light-danger' content='C' size='sm' />
          </div>
        </div>
        <div className='mt-sm-0 mt-1'>
          <p className='text-muted mb-50'>Deadline</p>
          <p className='mb-0'>20 Dec 2077</p>
        </div>
        <div className='mt-sm-0 mt-1'>
          <p className='text-muted mb-50'>Budget</p>
          <p className='mb-0'>$50000</p>
        </div>
      </div>
    )
  },
  {
    title: 'Designing UI',
    icon: <Server size={14} />,
    content:
      'Our main goal is to design a new mobile application for our client. The customer wants a clean & flat design.',
    meta: (
      <Badge color='light-primary' pill>
        Design
      </Badge>
    ),
    color: 'info',
    customContent: (
      <div>
        <span className='text-muted'>Participants</span>
      </div>
    )
  }
]