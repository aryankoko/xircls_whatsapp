import { Bell, Globe, User } from "react-feather"
import { Link, NavLink, useLocation } from "react-router-dom"
import { Nav, NavItem } from "reactstrap"
import "../css/Subscription.css"

const SubscriptionNav = () => {
    const location = useLocation()
    const path = location.pathname.split('/')[3]
    console.log(path)
    return (
        <>
            <Nav>
                <NavItem className="w-100">
                    <NavLink className={'subscription_nav d-flex justify-content-start align-items-center gap-2 w-100'} active={path === "my-subscriptions"} to="/merchant/subcriptions/my-subscriptions/">
                        <User size={18} />
                        <span className="font-weight-bold">Plans</span>
                    </NavLink>
                    <NavLink className={'subscription_nav d-flex justify-content-start align-items-center gap-2 w-100'} active={path === "my-transactions"} to="/merchant/subcriptions/my-transactions/">
                        <Bell size={18} />
                        <span className="font-weight-bold">All Transactions</span>
                    </NavLink>
                    <NavLink className={'subscription_nav d-flex justify-content-start align-items-center gap-2 w-100'} active={path === "invoice_list"} to="/merchant/subcriptions/invoice_list/">
                        <User size={18} />
                        <span className="font-weight-bold">Invoices</span>
                    </NavLink>
                    <NavLink className={'subscription_nav d-flex justify-content-start align-items-center gap-2 w-100'} active={path === "my_wallet"} to="/merchant/subcriptions/my_wallet/">
                        <Globe size={18} />
                        <span className="font-weight-bold">Wallet</span>
                    </NavLink>
                </NavItem>
            </Nav>
        </>
    )
}

export default SubscriptionNav