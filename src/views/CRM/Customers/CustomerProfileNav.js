import React from "react"
import { Link } from "react-router-dom"
import { Row } from 'reactstrap'
import './CustomerProfile.css'

const CustomerProfileNav = () => {

    return (
        <>
            <Row className='d-flex justify-content-between align-items-center'>
                <Link id='cpNav-1' className={`mx-0 px-0 text-secondary cursor-pointer fw-bold text-center fs-6 mb-0 color-remover col customer_nav`} to="/merchant/customers/customer_details">
                    <div className="w-100 underline-color">Customer Details</div>
                </Link>
                <Link id='cpNav-2' className={`mx-0 px-0 text-secondary cursor-pointer fw-bold text-center fs-6 mb-0 color-remover col customer_nav`} to="/merchant/customers/customer_basic/">
                    <div className="w-100 underline-color">Basic Details</div>
                </Link>
                <Link id='cpNav-3' className={`mx-0 px-0 text-secondary cursor-pointer fw-bold text-center fs-6 mb-0 color-remover col customer_nav`} to="/merchant/customers/customer_vehicle">
                    <div className="w-100 underline-color">Vehicle Details</div>
                </Link>
                <Link id='cpNav-4' className={`mx-0 px-0 text-secondary cursor-pointer fw-bold text-center fs-6 mb-0 color-remover col customer_nav`} to="/merchant/customers/customer_products">
                    <div className="w-100 underline-color">Product Details</div>
                </Link>
                <Link id='cpNav-5' className={`mx-0 px-0 text-secondary cursor-pointer fw-bold text-center fs-6 mb-0 color-remover col customer_nav`} to="/merchant/customers/customer_offer">
                    <div className="w-100 underline-color">Offer</div>
                </Link>
                <Link id='cpNav-6' className={`mx-0 px-0 text-secondary cursor-pointer fw-bold text-center fs-6 mb-0 color-remover col customer_nav`} to="/merchant/customers/customer_booking">
                    <div className="w-100 underline-color">Booking</div>
                </Link>
                <Link id='cpNav-7' className={`mx-0 px-0 text-secondary cursor-pointer fw-bold text-center fs-6 mb-0 color-remover col customer_nav`} to="/merchant/customers/customer_invoice">
                    <div className="w-100 underline-color">Invoices</div>
                </Link>
                <Link id='cpNav-8' className={`mx-0 px-0 text-secondary cursor-pointer fw-bold text-center fs-6 mb-0 color-remover col customer_nav`} to="/merchant/customers/customer_call">
                    <div className="w-100 underline-color">Call</div>
                </Link>
                <Link id='cpNav-9' className={`mx-0 px-0 text-secondary cursor-pointer fw-bold text-center fs-6 mb-0 color-remover col customer_nav`} to="/merchant/customers/customer_loyalty">
                    <div className="w-100 underline-color">Loyalty Points</div>
                </Link>
            </Row>
        </>
    )
}

export default CustomerProfileNav