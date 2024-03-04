import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Card, CardBody, Col, Input, Row } from 'reactstrap'
import { postReq } from '../../../../assets/auth/jwtService'
import ComTable from '../../../Components/DataTable/ComTable'
import moment from 'moment/moment'
import { Edit, Eye } from 'react-feather'

const Call = ({ userData }) => {
    // const navigate = useNavigate()
    const [tableData, setTableData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    // const [selected, setSelected] = useState([])

    console.log(userData)
    //   const [data, setdata] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [filteredData, setFilteredData] = useState([])

    const { id } = useParams()

    const callPurposeOptions = {
        prospecting: "Prospecting",
        sale_call: "Sale Call",
        negotiation: "Negotiation",
        close_Sale: "Close Sale"
    }

    const handleFilter = e => {
        const { value } = e.target
        let updatedData = []
        setSearchValue(value)

        if (value.length) {
            updatedData = data.filter(item => {
                const startsWith =
                    item.registration_number.toLowerCase().startsWith(value.toLowerCase())

                const includes =
                    item.registration_number.toLowerCase().includes(value.toLowerCase())

                if (startsWith) {
                    return startsWith
                } else if (!startsWith && includes) {
                    return includes
                } else return null
            })
            setFilteredData(updatedData)
            setSearchValue(value)
        }
    }

    // <th>Call Purpose</th>
    // <th>Call Status</th>
    // <th>Intrested</th>
    // <th>Product</th>
    // <th>Lead Status</th>
    // <th>Follow Up Date</th>
    // <th>Action</th>

    const columns = [
        {
            name: "Created At",
            minWidth: "120px",
            selector: (row) => (
                row?.created_at ? moment(row?.created_at).format("YYYY-MM-DD") : ''
            ),
            type: 'date'
        },
        {
            name: "Call Purpose",
            minWidth: "200px",
            selector: (row) => (
                callPurposeOptions[row?.Call_Purpose]
            ),
            type: 'text'
        },
        {
            name: "Call Status",
            minWidth: "200px",
            selector: (row) => (
                row?.Call_Status
            ),
            type: 'text'
        },
        {
            name: "Intrested",
            minWidth: "200px",
            selector: (row) => (
                row?.Interested
            ),
            type: 'text'
        },
        {
            name: "Product",
            minWidth: "200px",
            selector: (row) => (
                row?.Products ? row?.Products : '--'
            ),
            type: 'text'
        },
        {
            name: "Lead Status",
            minWidth: "200px",
            selector: (row) => row?.Lead_Status,
            type: 'date'
        },
        {
            name: "Follow Up Date",
            minWidth: "200px",
            selector: (row) => (
                row.schedule_Next_Call_date ? moment(row.schedule_Next_Call_date).format("YYYY-MM-DD") : "--"
            ),
            type: 'date'
        },
        {
            name: "Created By",
            minWidth: "250px",
            selector: (row) => <div className="py-1">
              <h6>{row?.member?.first_name ? `${row?.member?.first_name} ${row?.member.last_name}` : row?.super_user_name}</h6>
              <p className="m-0">{row?.member?.email ? row?.member?.email : row?.super_user_email}</p>
            </div>,
            type: 'text'
        },
        {
            name: "Action",
            minWidth: "100px",
            selector: (row) => (
                <>
                    <div className='d-flex justify-content-center align-items-center gap-2'>
                        <Eye size='17px' style={{ cursor: "pointer" }} />
                        <Link to={`/merchant/customers/add_call/${row.id}?type=edit`}>
                            <Edit size='17px' style={{ cursor: "pointer" }} />

                        </Link>
                    </div>
                </>
            )
        }
    ]

    const defferContent = <>
        <Col className='d-flex align-items-center justify-content-center' md='4' sm='12'>
            <h4 className='m-0'>Call Details</h4>
        </Col>
        <Col className='d-flex align-items-center justify-content-end' md='4' sm='12'>
            <Link className='btn btn-primary-main' to={`/merchant/customers/add_call/${id}?type=customer`}>Add Call</Link>
            <Input
                className='dataTable-filter form-control ms-1'
                style={{ width: `180px`, height: `2.714rem` }}
                type='text'
                bsSize='sm'
                id='search-input-1'
                placeholder='Search...'
                value={searchValue}
                onChange={handleFilter}
            />
        </Col>
    </>


    const getData = () => {
        setIsLoading(true)
        const form_data = new FormData()
        // const url = new URL(`${crmURL}/customers/merchant/get_view_customer/`)
        form_data.append("xircls_customer_id", id)
        form_data.append("tab_type", "add_call")
        postReq('get_view_customer', form_data)
        .then((res) => {
            console.log(res.data.success, "kk")
            setTableData([...res.data.success])

            setIsLoading(false)
        })
        .catch((error) => {
            console.log(error)
            setIsLoading(false)
        })
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <Row>
                <Col md='12'>
                    <Card>
                        <CardBody>
                            <ComTable
                                // tableName="Verified Email"
                                content={defferContent}
                                tableCol={columns}
                                data={tableData}
                                searchValue={searchValue}
                                // handleFilter={handleFilter}
                                filteredData={filteredData}
                                isLoading={isLoading}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Call