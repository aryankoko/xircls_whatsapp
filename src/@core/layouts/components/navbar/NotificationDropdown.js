// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Bell, X, Check, AlertTriangle, ShoppingCart, Trash } from 'react-feather'

// ** Reactstrap Imports
import { Button, Badge, Input, DropdownMenu, DropdownItem, DropdownToggle, UncontrolledDropdown } from 'reactstrap'
import { xircls_url } from '../../../../views/Validator'
import { MoreVertical } from 'react-feather/dist'

const NotificationDropdown = ({ allOffers, saveSelectedOffer, removeSelected }) => {
  
  const renderNotificationItems = () => {
    return (
      <PerfectScrollbar
        component='li'
        className='media-list scrollable-container'
        style={{padding: '20px', paddingTop: '0px'}}
        options={{
          wheelPropagation: false
        }}
      >
        {allOffers.map((item, index) => {
          return (
              <div key={index} className={classnames('list-item mb-2')} >
                <div className="row">
                  <div className="col-4">
                    <img width={'100px'} src={`${xircls_url}${item?.offer_image}`} />
                  </div>
                  <div className="col-md-8">
                    <div className='d-flex justify-content-between align-items-center'>
                      <h5 className='mb-0' style={{fontWeight: '600'}}>{item.outlet_name}</h5>
                      <a onClick={() => removeSelected(item)}>
                        <Trash color='#dc3545' size={16} />
                      </a>
                    </div>
                    <p style={{marginBottom: '5px'}}>{item.offer_name}</p>
                  </div>
                </div>
              </div>
          )
        })}
      </PerfectScrollbar>
    )
  }
  /*eslint-enable */

  return (
    <>
    <style>
    {`
      li{
        list-style: none !important;
      }
    `}
    </style>
    <div className='d-flex justify-content-center align-items-center gap-1'>
      <UncontrolledDropdown tag='li' className='dropdown-notification nav-item me-25'>
        <DropdownToggle tag='a' className='nav-link' href='/' onClick={e => e.preventDefault()}>
          <div className='d-flex justify-content-end align-items-center gap-1'>
            <p className='m-0'>{allOffers.length === 1 ? `${allOffers.length} Offer selected` : `${allOffers.length} Offers selected`} </p>
            <MoreVertical size={18} />

          </div>
          {/* <ShoppingCart size={21} /> */}
          {/* <Badge pill color='danger' className='badge-up'>
            {allOffers.length}
          </Badge> */}
        </DropdownToggle>
        <DropdownMenu end tag='ul' className='dropdown-menu-media mt-0' style={{width: '450px', zIndex: '1000'}}>
          <li className='dropdown-menu-header'>
            <DropdownItem className='d-flex' tag='div' header>
              <h5 className='notification-title mb-0 me-auto'>Selected Offers</h5>
            </DropdownItem>
          </li>
          <hr />
          {
            allOffers.length === 0 ? <>
              <p className='text-center'>Select a Offer</p> 
            </> : <>
              {
                renderNotificationItems()
              }
              <li className='dropdown-menu-footer px-1'>
                <Button color='primary' block onClick={() => saveSelectedOffer()}>
                  Proceed 
                </Button>
              </li>
            </> 
          }
          
        </DropdownMenu>
      </UncontrolledDropdown>
      {
        allOffers.length === 0 ? '' : <a className='btn btn-primary ml-1' onClick={() => saveSelectedOffer()}>Proceed</a>
      }
    </div>
    </>
  )
}

export default NotificationDropdown
