import { Bell, Globe, User } from "react-feather"
import { Link, NavLink, useLocation } from "react-router-dom"
import { Nav, NavItem } from "reactstrap"
import './css/subscripNavBilling.css'

function SubscriptionNav_billing() {

    const location = useLocation()
    const path = location.pathname.split('/')[3]
    console.log(path)

   return (
        <>
            <Nav>
                <NavItem className="w-100 d-flex flex-row justify-content-between align-items-center">
                    {/* <NavLink className={'SubscriptionNav d-flex justify-content-start align-items-center gap-2 w-100'} active={path === "my-subscriptions"} to="/merchant/admin_view/billing/">
                        <User size={18} />
                        <span className="font-weight-bold">Plans</span>
                    </NavLink> */}
                    <NavLink className={'SubscriptionNav d-flex justify-content-start align-items-center gap-2 w-100'} active={path === "my-transactions"} to="/merchant/admin_view/billing/my-transactions/">
                        <Bell size={18} />
                        <span className="font-weight-bold">All Transactions</span>
                    </NavLink>
                    <NavLink className={'SubscriptionNav d-flex justify-content-start align-items-center gap-2 w-100'} active={path === "invoice_list"} to="/merchant/admin_view/billing/invoice_list/">
                        <User size={18} />
                        <span className="font-weight-bold">Invoices</span>
                    </NavLink>
                    <NavLink className={'SubscriptionNav d-flex justify-content-start align-items-center gap-2 w-100'} active={path === "my_wallet"} to="/merchant/admin_view/billing/my_wallet/">
                        <Globe size={18} />
                        <span className="font-weight-bold">Wallet</span>
                    </NavLink>
                </NavItem>
            </Nav>
        </>
    )
}

export default SubscriptionNav_billing