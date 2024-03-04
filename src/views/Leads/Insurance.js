import React from 'react'
import { Card, CardHeader, Button } from 'reactstrap'
import { Link } from "react-router-dom"
import Today from './today_insurance'
import Overall from './OverAll_insurance'

export default function Finance() {

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="d-flex justify-content-between w-100">
            <h4 className="">Insurance Dashboard</h4>
            <div className="pe-2 d-flex">
              <Link to="/merchant/customers/add-insurance/">
                <Button className="btn btn-outline-primary btn-block">Add Insurance</Button>
              </Link>
            </div>
          </div>
        </CardHeader>
      </Card>
      <Today />
      <Overall />
    </div>)
}
