import { Bell, Globe, Mail, User } from "react-feather"
import { NavLink, useLocation } from "react-router-dom"
import { Nav, NavItem } from "reactstrap"
import "../Css/AuthMerchant.css"

const ProfileNav = () => {
    const location = useLocation()
    const path = location.pathname.split('/')[3]
    console.log(path)
    return (
        <>
            <Nav>
                <NavItem className="w-100">
                    <NavLink className={'profile_nav d-flex justify-content-start align-items-center gap-2 w-100'} active={path === "profile"} to="/merchant/profile/">
                        <User size={18} />
                        <span className="font-weight-bold">Profile</span>
                    </NavLink>
                    <NavLink className={'profile_nav d-flex justify-content-start align-items-center gap-2 w-100'} active={path === "network_settings"} to="/merchant/xircls/network_settings/">
                        <Bell size={18} />
                        <span className="font-weight-bold">Notification</span>
                    </NavLink>
                    <NavLink className={'profile_nav d-flex justify-content-start align-items-center gap-2 w-100'} active={path === "account_settings"} to="/merchant/account_settings/">
                        <User size={18} />
                        <span className="font-weight-bold">2-Step Verification</span>
                    </NavLink>
                    {/* <NavLink className={'profile_nav d-flex justify-content-start align-items-center gap-2 w-100'} active={path === "verify_your_domain"} to="/merchant/verify_your_domain/">
                        <Globe size={18} />
                        <span className="font-weight-bold">Verify your Domain</span>
                    </NavLink>
                    <NavLink className={'profile_nav d-flex justify-content-start align-items-center gap-2 w-100'} active={path === "verify_your_email"} to="/merchant/verify_your_email/">
                        <Mail size={18} />
                        <span className="font-weight-bold">Verify Your Email</span>
                    </NavLink> */}
                </NavItem>
            </Nav>
        </>
    )
}

export default ProfileNav