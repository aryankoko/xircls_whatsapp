// ** React Imports
import { Fragment, useState } from 'react'

// ** Reactstrap Imports
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, CardHeader, CardBody } from 'reactstrap'
import EmptyDataCard from '../EmptyDataCard'
import BasicTimeline from '../timeline/BasicTimeline'

const TabsBasic = ({ tab_list }) => {

  console.log(tab_list, "tab_list")
  // ** State
  const [active, setActive] = useState('1')

  const nav_link = [
      { 
        id: '1',
        title: "Network Alerts"
      },
      { 
        id: '2',
        title: "Partner Requests"
      },
      { 
        id: '3',
        title: "Manage Partners"
      },
      { 
        id: '4',
        title: "Invites Sent"
      },
      { 
        id: '5',
        title: "Blocked Outlets"
      }
  ]

  const toggle = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }
  return (
    <Fragment>
      <Nav tabs>
          {
              nav_link.map((curElem, i) => {
                  return <NavItem key={i}>
                    <NavLink
                        active={active === curElem.id}
                        onClick={() => {
                        toggle(curElem.id)
                        }}
                    >
                        <span className='align-middle'>{curElem.title}</span>
                    </NavLink>
                    </NavItem>
              })
          }
      </Nav>
      <TabContent className='py-50' activeTab={active}>
        <TabPane tabId='1'>
          <Row>
              <Col md={6}>
                  <CardHeader>
                    <h4>Campaign Alerts</h4>
                  </CardHeader>
                  <CardBody>
                    <p>No Campaign Alerts to show.</p> 
                  </CardBody>
              </Col>
              <Col md={6}>
                <BasicTimeline />
              </Col>
          </Row>
        </TabPane>
        <TabPane tabId='2'>
            <Row>
                <Col md={6}><BasicTimeline /></Col>
                <Col md={6}>
                    <CardHeader>
                        <h4>Requests Received</h4>
                    </CardHeader>
                    <CardBody>
                        <p>No Requests received yet.</p>
                    </CardBody>
                </Col>
            </Row>
            
        </TabPane>
        <TabPane tabId='3'>
            <Row>
                <Col md={4} className="d-flex justify-content-center align-items-center ">
                    <img className='rounded-circle' width="150px" height="150px" src="https://api.xircls.com/static/outlets/outlet_logo/main/outlet_logo_720bewakoof-logo-1.jpg" alt="" />
                </Col>
                <Col md={4} className="d-flex justify-content-center align-items-center ">
                    <div>Bewakoof</div> 
                </Col>
                <Col md={4} className="d-flex justify-content-center align-items-center ">
                    <a href="" className='font-size-sm font-w700 text-uppercase text-danger '>Cancel Request</a>
                </Col>
            </Row>
        </TabPane>
        <TabPane tabId='4'>
            <EmptyDataCard />
        </TabPane>
        <TabPane tabId='5'>
            <EmptyDataCard />
        </TabPane>
      </TabContent>
    </Fragment>
  )
}
export default TabsBasic
