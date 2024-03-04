import React from "react"
import { NavLink } from "react-router-dom"
import { Row } from 'reactstrap'

const Nav = () => {

    return (
        <>
            <Row className='d-flex justify-content-between align-items-center mb-3 mt-0'>
                <NavLink activeclassname='active' style={{ paddingBottom: '0.5rem' }} className="mx-0 px-0 text-secondary cursor-pointer fw-bold text-center fs-6 mb-0 color-remover col" to="/merchant/plugin/website/">
                    <div className="w-100 underline-color">Website frontend</div>
                </NavLink>
                <NavLink activeclassname='active' style={{ paddingBottom: '0.5rem' }} className="mx-0 px-0 text-secondary cursor-pointer fw-bold text-center fs-6 mb-0 color-remover col" to="/merchant/plugin/email/">
                    <div className="w-100 underline-color">Email</div>
                </NavLink>
                <NavLink activeclassname='active' style={{ paddingBottom: '0.5rem' }} className="mx-0 px-0 text-secondary cursor-pointer fw-bold text-center fs-6 mb-0 color-remover col" to="/merchant/plugin/remarketing/">
                    <div className="w-100 underline-color">ReMarketing</div>
                </NavLink>
                <NavLink activeclassname='active' style={{ paddingBottom: '0.5rem' }} className="mx-0 px-0 text-secondary cursor-pointer fw-bold text-center fs-6 mb-0 color-remover col" to="/merchant/plugin/campaign/">
                    <div className="w-100 underline-color">Campaign Settings</div>
                </NavLink>
                <NavLink activeclassname='active' style={{ paddingBottom: '0.5rem' }} className="mx-0 px-0 text-secondary cursor-pointer fw-bold text-center fs-6 mb-0 color-remover col" to="/merchant/plugin/action/">
                    <div className="w-100 underline-color">Offer Action</div>
                </NavLink>
                <NavLink activeclassname='active' style={{ paddingBottom: '0.5rem' }} className="mx-0 px-0 text-secondary cursor-pointer fw-bold text-center fs-6 mb-0 color-remover col" to="/merchant/plugin/target/">
                    <div className="w-100 underline-color">Target Profile</div>
                </NavLink>
                <NavLink activeclassname='active' style={{ paddingBottom: '0.5rem' }} className="mx-0 px-0 text-secondary cursor-pointer fw-bold text-center fs-6 mb-0 color-remover col" to="/merchant/plugin/thankyou/">
                    <div className="w-100 underline-color">Thank You Page</div>
                </NavLink>
            </Row>
        </>
    )
}

export default Nav