import React from 'react'
import Today from './today_service'
import Overall from './Overall_service'
import { Card, CardHeader, Button } from "reactstrap"
// import "./Leads.css"
import { Link } from "react-router-dom"

export default function Finance() {

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="d-flex justify-content-between w-100">
            <h4 className="">Servicing Dashboard</h4>
            <div className="pe-2 d-flex">
              <Link to="/merchant/customers/add-servicing/">
                <Button className="btn btn-outline-primary btn-block">Add Servicing</Button>
              </Link>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Today />
      <Overall />
    </div>)
}
