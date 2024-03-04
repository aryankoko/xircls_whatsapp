import React from 'react'
import SubscriptionNav_billing from './components/SubscriptionNav_billing'
import { Card, CardBody } from 'reactstrap'
import MyTransactions from '../../subscription/MyTransactions'

const Transactions = () => {
  return (

    <>
        <div className="card">
            <div className="card-body">
                <SubscriptionNav_billing />
            </div>
        </div>

        <MyTransactions />
    
    </>

  )
}

export default Transactions