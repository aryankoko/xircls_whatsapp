import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardBody, Col, Input, Row } from 'reactstrap'
import ComTable from '../Components/DataTable/ComTable'
import { Edit, Eye } from 'react-feather'
import { getReq } from '../../assets/auth/jwtService'
import moment from 'moment'

const User = () => {

    const [tableData, setTableData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [filteredData, setFilteredData] = useState([])
    const [searchValue, setSearchValue] = useState('')
    // console.log(setTableData, setIsLoading)

    const getData = () => {
        setIsLoading(true)
        // const form_data = new FormData()
        // const url = new URL(`${crmURL}/customers/merchant/get_view_customer/`)
        // form_data.append("customer_id", id)
        // form_data.append("tab_type", "servicing")
        
        // fetch(url, {
        //     method: "POST",
        //     body: form_data
        // })
        getReq("memebersDetails")
        .then((res) => {
            console.log(res, "kk")
            setTableData(res?.data?.MemberProfile)
        })
        .catch((error) => {
            console.log(error)
        })
        .finally(() => {
            setIsLoading(false)
        })
    }

    const handleFilter = e => {
        const { value } = e.target
        let updatedData = []
        setSearchValue(value)

        if (value.length) {
            updatedData = tableData.filter(row => {
                const startsWith =
                    row?.user?.first_name.toLowerCase().startsWith(value.toLowerCase()) ||
                    row?.department[0]?.department.toLowerCase().startsWith(value.toLowerCase()) ||
                    row?.user_position.toLowerCase().startsWith(value.toLowerCase()) ||
                    row?.user?.username.toLowerCase().startsWith(value.toLowerCase())

                const includes =
                    row?.user?.first_name.toLowerCase().includes(value.toLowerCase()) ||
                    row?.department[0]?.department.toLowerCase().includes(value.toLowerCase()) ||
                    row?.user_position.toLowerCase().includes(value.toLowerCase()) ||
                    row?.user?.username.toLowerCase().includes(value.toLowerCase())

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

    const defferContent = <>
        <Col className='d-flex align-items-center justify-content-center' md='4' sm='12'>
            <h4 className='m-0'>Manage Users</h4>
        </Col>
        <Col className='d-flex align-items-center justify-content-end' md='4' sm='12'>
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

    useEffect(() => {
        getData()
    }, [])

    const columns = [
        {
            name: "Created at",
            minWidth: "240px",
            selector: (row) => moment(row?.created_at).format("YYYY-MM-DD, h:mm:ss"),
            type: 'text'
        },
        {
            name: "Name",
            minWidth: "100px",
            selector: (row) => `${row?.first_name} ${row?.last_name}`,
            type: 'text'
        },
        {
            name: "Email",
            minWidth: "100px",
            selector: (row) => row?.user?.username,
            type: 'text'
        },
        {
            name: "Status",
            minWidth: "100px",
            cell: (row) => {
                return (
                    <>
                        {
                            row?.is_active ? <div className="badge badge-light-success">Active</div> : <div className="badge badge-light-warning">Deactive</div>
                        }
                    </>
                )
            }
        },
        {
            name: "Department",
            minWidth: "100px",
            selector: (row) => (
                row?.department[0]?.department
            ),
            type: 'text'
        },
        {
            name: "Role",
            minWidth: "120px",
            selector: (row) => (
                row?.user_position
            ),
            type: 'text'
        },
        {
            name: "Action",
            minWidth: "50px",
            selector: (row) => (
                <>
                    <div className='d-flex justify-content-center align-items-center gap-2'>
                        {/* <Eye size='17px' style={{ cursor: "pointer" }} /> */}
                        <Link to={`/merchant/customers/edit-user/${row?.unique_id}`}>
                            <Edit size='17px' style={{ cursor: "pointer" }} />

                        </Link>
                    </div>
                </>
            )
        }

    ]

    return (
        <>
            <Row>
                <Card>
                    <CardBody>
                        <div className="d-flex justify-content-between align-items-center">
                            <h4 className='m-0'>Users Dashboard</h4>
                            <Link className='btn btn-primary-main' to="/merchant/customers/add-user/">Add User</Link>
                        </div>
                    </CardBody>
                </Card>
            </Row>

            <Row>
                <Card>
                    <CardBody>
                        <ComTable
                            content={defferContent}
                            tableCol={columns}
                            data={tableData}
                            searchValue={searchValue}
                            filteredData={filteredData}
                            isLoading={isLoading}
                        />
                    </CardBody>
                </Card>
            </Row>
        </>
    )
}

export default User