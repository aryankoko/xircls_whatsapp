import React, { useEffect, useState } from 'react'
import { Card, CardBody, Col, Input, Label, Row } from 'reactstrap'
import { getReq } from '../../../assets/auth/jwtService'
const Notifications = () => {


  const defaultNoftification = {
    All_Notifications: false,
    Invite_Received: false,
    Invite_Sent: false,
    Invite_Accepted: false,
    New_Outlets_on_Network: false,
    Campaign_Live: false,
    Campaign_Stopped: false,
    Campaign_Resumed: false,
    Customer_Retained: false,
    Customer_Acquired: false,
    Offer_Expiry_Alerts: false,
    Inner_XIRCL_Alerts: false
  }

  const [data, setData] = useState(defaultNoftification)

  const getData = () => {
    getReq('notificationData')
    .then((resp) => {
      console.log(resp)
      setData(resp.data.data.notification_settings)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    getData()
  }, [])
  
  return (
    <>
    <Col md="8">
          <Card>
              <CardBody>
                <div className='form-check form-switch form-check-primary'>
                  <Input type='checkbox' id='all_notification' checked={data?.All_Notifications} onChange={() => changeCheck()} />
                  <Label className='form-check-label' for='all_notification'>
                    All Notification 
                  </Label>
                </div>
                <h6 className='section-label mx-1 my-2'>NETWORK</h6>
                <div className="network_checkBoxes">
                  <div className='form-check form-switch form-check-primary mb-1'>
                    <Input type='checkbox' id='inviteReceived' checked={data?.Invite_Received} readOnly />
                    <Label className='form-check-label text-secondary' for='inviteReceived'>
                      Invite Received 
                    </Label>
                  </div>
                  <div className='form-check form-switch form-check-primary mb-1'>
                    <Input type='checkbox' id='Invite_sent' checked={data?.Invite_Sent} readOnly />
                    <Label className='form-check-label text-secondary' for='Invite_sent'>
                      Invite Sent 
                    </Label>
                  </div>
                  <div className='form-check form-switch form-check-primary mb-1'>
                    <Input type='checkbox' id='invite_accepted' checked={data?.Invite_Accepted} readOnly />
                    <Label className='form-check-label text-secondary' for='invite_accepted'>
                      Invite Accepted
                    </Label>
                  </div>
                  <div className='form-check form-switch form-check-primary mb-1'>
                    <Input type='checkbox' id='new_outlet_on_network' checked={data?.New_Outlets_on_Network} readOnly />
                    <Label className='form-check-label text-secondary' for='new_outlet_on_network'>
                      New Outlets on Network
                    </Label>
                  </div>
                </div>
                <h6 className='section-label mx-1 my-2'>Campaign</h6>
                <div className="campaign">
                  <div className='form-check form-switch form-check-primary mb-1'>
                    <Input type='checkbox' id='campagin_live' checked={data?.Campaign_Live} onChange={() => setData({...data, Campaign_Live: !data.Campaign_Live})} />
                    <Label className='form-check-label' for='campagin_live'>
                      Campaign Live
                    </Label>
                  </div>
                  <div className='form-check form-switch form-check-primary mb-1'>
                    <Input type='checkbox' id='campaign_stopped' checked={data?.Campaign_Stopped} onChange={() => setData({...data, Campaign_Stopped: !data.Campaign_Stopped})} />
                    <Label className='form-check-label' for='campaign_stopped'>
                      Campaign Stopped
                    </Label>
                  </div>
                  <div className='form-check form-switch form-check-primary mb-1'>
                    <Input type='checkbox' id='campaign_resumed' checked={data?.Campaign_Resumed} onChange={() => setData({...data, Campaign_Resumed: !data.Campaign_Resumed})} />
                    <Label className='form-check-label' for='campaign_resumed'>
                      Campaign Resumed
                    </Label>
                  </div>
                  <div className='form-check form-switch form-check-primary mb-1'>
                    <Input type='checkbox' id='customer_retained' checked={data?.Customer_Retained} onChange={() => setData({...data, Customer_Retained: !data.Customer_Retained})} />
                    <Label className='form-check-label' for='customer_retained'>
                      Customer Retained
                    </Label>
                  </div>
                  <div className='form-check form-switch form-check-primary mb-1'>
                    <Input type='checkbox' id='customer_acuquired' checked={data?.Customer_Acquired} onChange={() => setData({...data, Customer_Acquired: !data.Customer_Acquired})} />
                    <Label className='form-check-label' for='customer_acuquired'>
                      Customer Acquired
                    </Label>
                  </div>
                  <div className='form-check form-switch form-check-primary mb-1'>
                    <Input type='checkbox' id='offer_expiry_alert' checked={data?.Offer_Expiry_Alerts} onChange={() => setData({...data, Offer_Expiry_Alerts: !data.Offer_Expiry_Alerts})} />
                    <Label className='form-check-label' for='offer_expiry_alert'>
                      Offer Expiry Alerts
                    </Label>
                  </div>
                  <div className='form-check form-switch form-check-primary mb-1'>
                    <Input type='checkbox' id='inner_xircl_alert' checked={data?.Inner_XIRCL_Alerts} onChange={() => setData({...data, Inner_XIRCL_Alerts: !data.Inner_XIRCL_Alerts})} />
                    <Label className='form-check-label' for='inner_xircl_alert'>
                      Inner XIRCL Alerts
                    </Label>
                  </div>
                </div>
              </CardBody>
            </Card>
        </Col>
    </>
  )
}

export default Notifications