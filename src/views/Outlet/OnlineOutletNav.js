import React from "react"
import { NavLink } from "react-router-dom"
import { Row } from 'reactstrap'
import './css/OnlineOutlet.css'

const OnlineOutletNav = () => {

    return (
        <>
            <Row className='d-flex justify-content-between align-items-center mb-2 mt-0'>
                <NavLink activeClassName='active' style={{ paddingBottom: '0.5rem' }} className="mx-0 px-0 text-secondary cursor-pointer fw-bold text-center fs-6 mb-0 color-remover col" to="/merchant/outlets/create-online-outlet/">
                    <div className="w-100 underline-color">Basic info</div>
                </NavLink>
                <NavLink activeClassName='active' style={{ paddingBottom: '0.5rem' }} className="mx-0 px-0 text-secondary cursor-pointer fw-bold text-center fs-6 mb-0 color-remover col" to="/merchant/online_outlet_profile">
                    <div className="w-100 underline-color">Profile</div>
                </NavLink>
                <NavLink activeClassName='active' style={{ paddingBottom: '0.5rem' }} className="mx-0 px-0 text-secondary cursor-pointer fw-bold text-center fs-6 mb-0 color-remover col" to="/merchant/online_outlet_location">
                    <div className="w-100 underline-color">Location</div>
                </NavLink>
                <NavLink activeClassName='active' style={{ paddingBottom: '0.5rem' }} className="mx-0 px-0 text-secondary cursor-pointer fw-bold text-center fs-6 mb-0 color-remover col" to="/merchant/online_outlet_social">
                    <div className="w-100 underline-color">Social</div>
                </NavLink>
            </Row>
        </>
    )
}

export default OnlineOutletNav