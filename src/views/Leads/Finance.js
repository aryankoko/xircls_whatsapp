import React from 'react'
import Today from './today_finance'
import Overall from './OverAll_finance'
import { Card, CardHeader, Button } from "reactstrap"
import { Link } from "react-router-dom"

export default function Finance() {

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="d-flex justify-content-between w-100">
            <h4 className="">Finance Dashboard</h4>
            <div className="pe-2 d-flex">
              <Link to="/merchant/customers/add_finance/">
                <Button className="btn btn-outline-primary btn-block">Add Finance</Button>
              </Link>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Today />
      <Overall />
    </div>)
}
