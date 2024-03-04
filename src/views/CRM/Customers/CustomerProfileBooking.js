import React from "react"
import { Container, Card, CardBody, Row, Col} from 'reactstrap'
import './CustomerProfile.css'
import CustomerProfileNav from "./CustomerProfileNav"
import DataTable from 'react-data-table-component'
import { ChevronDown } from "react-feather"

const CustomerProfileBooking = () => {

    return (
        <>
           <Container fluid className="customer-profile px-0">
                <Card>
                    <CardBody>
                        <h3 className="mb-0">Customer Profile</h3>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <Container className="px-2">
                            <CustomerProfileNav />
                        </Container>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <Container fluid className="p-2">
                            <DataTable
                                pagination
                                selectableRowsNoSelectAll
                                className='react-dataTable table'
                                paginationPerPage={7}
                                sortIcon={<ChevronDown size={10} />}
                            />
                        </Container>
                    </CardBody>
                </Card>
            </Container>
        </>
    )
}

export default CustomerProfileBooking