import { useState } from 'react' 
import {Row, Col, Card, CardBody, Nav, NavItem} from 'reactstrap'
import { Bell, DollarSign, Link, Lock, Settings, UserCheck } from "react-feather"
import { NavLink, Outlet, useLocation} from "react-router-dom"  

import AdminProfileCard from './components/AdminProfileCard'
import AdminDetailsCard from './components/AdminDetailsCard'
import AdminPlan from './components/AdminPlan'

function AdminView() {

    const location = useLocation()
    const path = location.pathname.split('/')[3]
    console.log("path", path)

    const [activeTab, setActiveTab] = useState(path ? path : "account") 

    const handleTabClick = (tabName) => {
        setActiveTab(tabName) 
    } 
  return (
    <Row>
        <Col md="3">
            <AdminDetailsCard />
        </Col>
        <div className='col-9'>
            <Nav tabs>
                <NavItem>
                    <NavLink
                    className={` border-0 rounded btn ${!path ? "btn-primary" : ""}`}
                    to="/merchant/admin_view/"
                    onClick={() => handleTabClick("account")}
                    >
                        <div className={`d-flex justify-content-start align-items-center  ${activeTab === 'admin_view' ? 'text-white' : ''}`}>
                            <UserCheck size={18} />
                            <span className='font-weight-bold ms-1'>
                                Account
                            </span>
                        </div>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                    className={` border-0 rounded btn ${activeTab === "security" ? "btn-primary" : ""}`}
                    to="/merchant/admin_view/security/"
                    onClick={() => handleTabClick("security")}
                    >
                    <div className={`d-flex justify-content-start align-items-center ${activeTab === 'Security' ? 'text-white' : ''}`}>
                        <Lock size={18} />
                        <span className='font-weight-bold ms-1'>
                            Security
                        </span>
                    </div>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                    className={` border-0 rounded btn ${activeTab === "billing" ? "btn-primary" : ""}`}
                    to="/merchant/admin_view/billing/my-transactions/"
                    onClick={() => handleTabClick("billing")}
                    >
                    <div className={`d-flex justify-content-start align-items-center ${activeTab === 'billing' ? '' : ''}`}>
                        <DollarSign size={18} />
                            <span className='font-weight-bold ms-1'>
                                Billing
                            </span>
                    </div>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                    className={` border-0 rounded btn ${activeTab === "notification" ? "btn-primary" : ""}`}
                    to="/merchant/admin_view/notification/"
                    onClick={() => handleTabClick("notification")}
                    >
                    <div className={`d-flex justify-content-start align-items-center ${activeTab === 'Notification' ? 'text-white' : ''}`}>
                        <Bell size={18} />
                        <span className='font-weight-bold ms-1'>
                            Notification
                        </span>
                    </div>
                    </NavLink>
                </NavItem>
                {/* <NavItem>
                    <NavLink
                    className={`border-0 rounded btn ${activeTab === "connections" ? "btn-primary" : ""}`}
                    to="/merchant/admin_view/connections/"
                    onClick={() => handleTabClick("connections")}
                    >
                    <div className={`d-flex justify-content-start align-items-center  ${activeTab === 'Connections' ? 'text-white' : ''}`}>
                        <Link size={18} />
                        <span className='font-weight-bold ms-1'>
                            Connections
                        </span>
                    </div>
                    </NavLink>
                </NavItem> */}
                <NavItem>
                    <NavLink
                    className={`border-0 rounded btn ${activeTab === "general" ? "btn-primary" : ""}`}
                    to="/merchant/admin_view/general/"
                    onClick={() => handleTabClick("general")}
                    >
                    <div className={`d-flex justify-content-start align-items-center ${activeTab === 'General' ? 'text-white' : ''}`}>
                        <Settings size={18} />
                        <span className='font-weight-bold ms-1'>
                            General
                        </span>
                    </div>
                    </NavLink>
                </NavItem>
            </Nav>
            <Outlet />
        </div>

    </Row>
  )
}

export default AdminView