import React from 'react'
import SubscriptionNav_billing from './components/SubscriptionNav_billing'
import { Card, CardBody } from 'reactstrap'
import InvoiceList from '../../subscription/InvoiceList'

const Invoices = () => {
  return (

    <>
        <div className="card">
            <div className="card-body">
                <SubscriptionNav_billing />
            </div>
        </div>

        <InvoiceList />
    
    </>

  )
}

export default Invoices