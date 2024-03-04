import { CheckCircle, Circle, Target, User } from "react-feather"
import { NavLink, useLocation, useParams } from "react-router-dom"
import { Nav, NavItem } from "reactstrap"

function CampaignNav() {
    const location = useLocation()
    const { id } = useParams()
    const path = location.pathname.split('/')[3]
    console.log(path)
    return (
        <>
            <style>
                {`.profile_nav.active {
                    color: #fff !important;
                    background-color: #006aff;
                    box-shadow: 0 4px 18px -4px rgba(115, 103, 240, 0.65);
                }

                .profile_nav{
                    padding: 0.786rem 1.5rem;
                    border-radius: 0.358rem;
                    color: #625f6e;
                }`}
            </style>
            <Nav>
                <NavItem className="w-100">
                    <NavLink className={`profile_nav d-flex justify-content-start align-items-center gap-2 w-100 ${path === 'outlet_profiling' ? 'active' : ''}` } to={`/merchant/campaign/outlet_profiling/${id}/`}>
                        <div className="p-0 m-0  d-flex justify-content-start align-items-center gap-2 w-100" >
                            <User size={18} />
                            <span className="font-weight-bold">Outlet details</span>
                        </div>
                    </NavLink>
                </NavItem>
                <NavItem className="w-100">
                    <NavLink className={`profile_nav d-flex justify-content-start align-items-center gap-2 w-100 ${path === 'target_profiling' ? 'active' : ''}`} to={`/merchant/campaign/target_profiling/${id}/`}>
                        <div className="p-0 m-0  d-flex justify-content-start align-items-center gap-2 w-100" >
                            <Target size={18} />
                            <span className="font-weight-bold">Outlet Profiling</span>
                        </div>
                    </NavLink>
                </NavItem>
                {/* <NavItem className="w-100">
                    <NavLink className={'profile_nav d-flex justify-content-start align-items-center gap-2 w-100'} active={path === "offer_creation"} to="/merchant/campaign/offer_creation/">
                        <div className="p-0 m-0  d-flex justify-content-start align-items-center gap-2 w-100" >
                            <Circle size={18} />
                            <span className="font-weight-bold">Offer creation</span>
                        </div>
                    </NavLink>
                </NavItem> */}
                <NavItem className="w-100">
                    <NavLink className={`profile_nav d-flex justify-content-start align-items-center gap-2 w-100 ${path === 'verify_your_domain' ? 'active' : ''}`} to={`/merchant/campaign/verify_your_domain/${id}/`}>
                        <div className="p-0 m-0  d-flex justify-content-start align-items-center gap-2 w-100" >
                            <CheckCircle size={18} />
                            <span className="font-weight-bold">Verify your Domain</span>
                        </div>
                    </NavLink>
                </NavItem>
                <NavItem className="w-100">
                    <NavLink className={`profile_nav d-flex justify-content-start align-items-center gap-2 w-100 ${path === 'verify_your_email' ? 'active' : ''}`} to={`/merchant/campaign/verify_your_email/${id}/`}>
                        <div className="p-0 m-0  d-flex justify-content-start align-items-center gap-2 w-100" >
                            <CheckCircle size={18} />
                            <span className="font-weight-bold">Verify your Email</span>
                        </div>
                    </NavLink>
                </NavItem>
            </Nav>
        </>
    )
}

export default CampaignNav