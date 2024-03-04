import React from 'react'
import SubscriptionNav_billing from './components/SubscriptionNav_billing'
import { Card, CardBody } from 'reactstrap'
import MyWallet from '../../subscription/MyWallet'

const Wallet = () => {
  return (

    <>
        <div className="card">
            <div className="card-body">
                <SubscriptionNav_billing />
            </div>
        </div>

        <MyWallet />
    
    </>

  )
}

export default Wallet