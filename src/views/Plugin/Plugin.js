import { useEffect, useState } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { Card, CardBody, Container, Nav, NavItem, NavLink, TabContent } from "reactstrap"

import { PluginHeader } from "./PluginContext"

const Plugin = () => {

    const Navigate = useNavigate()
    const newLocation = useLocation()

    const [header, setHeader] = useState('')
    // const [location, setLocation] = useState('/merchant/plugin/website/')
    const path = newLocation.pathname.split('/')[3]
    useEffect(() => {
        Navigate((path === "" || path === undefined) ? '/merchant/plugin/website/' : newLocation.pathname)
    }, [])
    return (
        <Container fluid className="px-0 plugin">
            <Card>
                <CardBody>
                    <div>
                        <h4>{header}</h4>
                    </div>
                </CardBody>
            </Card>
            <Card>
                <CardBody className="px-3 py-2">
                    <Nav tabs style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <NavItem>
                            <NavLink
                                active={path === "website"}
                                onClick={() => {
                                    Navigate('/merchant/plugin/website/')
                                }}
                            >
                                Website Frontend
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                active={path === "email"}
                                onClick={() => {
                                    Navigate('/merchant/plugin/email/')
                                }}
                            >
                                Email
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                active={path === "remarketing"}
                                onClick={() => {
                                    Navigate('/merchant/plugin/remarketing/')
                                }}
                            >
                                Remarketing
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                active={path === "campaign"}
                                onClick={() => {
                                    Navigate('/merchant/plugin/campaign/')
                                }}
                            >
                                Campaign Settings
                            </NavLink>
                        </NavItem>
                        {/* <NavItem>
                            <NavLink
                                active={path === "action"}
                                onClick={() => {
                                    Navigate('/merchant/plugin/action/')
                                }}
                            >
                                Offer Action
                            </NavLink>
                        </NavItem> */}
                        {/* <NavItem>
                            <NavLink
                                active={path === "target"}
                                onClick={() => {
                                    Navigate('/merchant/plugin/target/')
                                }}
                            >
                                Target Profile
                            </NavLink>
                        </NavItem> */}
                        <NavItem>
                            <NavLink
                                active={path === "thankyou"}
                                onClick={() => {
                                    Navigate('/merchant/plugin/thankyou/')
                                }}
                            >
                                Thank You Page
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <PluginHeader.Provider value={{ setHeader }}>
                        <TabContent className="mt-4">
                            <Outlet />
                        </TabContent>
                    </PluginHeader.Provider>
                </CardBody>
            </Card>
        </Container>
    )
}

export default Plugin