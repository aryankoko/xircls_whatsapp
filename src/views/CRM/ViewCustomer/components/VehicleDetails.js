import React, { useEffect, useState } from 'react'
import { Card, CardBody, Col, Input, Row } from 'reactstrap'
import AdvanceServerSide from "@src/views/Components/DataTable/AdvanceServerSide.js"
// import axios from 'axios'
import { postReq, crmURL } from '../../../../assets/auth/jwtService'
import { Link, useParams } from 'react-router-dom'
import { Edit, Eye } from 'react-feather'
import ComTable from '../../../Components/DataTable/ComTable'
import moment from 'moment'

const VehicleDetails = () => {

    const { id } = useParams()
    const [tableData, setTableData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    // const [selected, setSelected] = useState([])


    //   const [data, setdata] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [filteredData, setFilteredData] = useState([])
    //   const [isLoading, setIsLoading] = useState(true)


    const getData = () => {
        setIsLoading(true)
        const form_data = new FormData()
        // const url = new URL(`${crmURL}/customers/merchant/get_view_customer/`)
        form_data.append("customer_id", id)
        form_data.append("tab_type", "vehicle_data")
        postReq('get_customer_vehicle', form_data, crmURL)
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


    const columns = [
        {
            name: "Created At",
            minWidth: "240px",
            selector: (row) => (
                row?.created_at ? moment(row?.created_at).format("YYYY-MM-DD") : ''
            ),
            type: 'date'
        },
        {
            name: "REGISTRATION NUMBER",
            minWidth: "320px",
            selector: (row) => (
                row?.registration_number !== undefined && row?.registration_number !== null ? row.registration_number : ""
            ),
            type: 'text'
        },
        {
            name: "BRAND",
            minWidth: "320px",
            selector: (row) => (
                row?.brand !== undefined && row?.brand !== null ? row.brand : ""
            ),
            type: 'text'
        },
        {
            name: "ENGINE NO",
            minWidth: "320px",
            selector: (row) => (
                row?.engine_no !== undefined && row?.engine_no !== null ? row.engine_no : ""
            ),
            type: 'text'
        },
        {
            name: "VARIANT",
            minWidth: "320px",
            selector: (row) => (
                row?.variant !== undefined && row?.variant !== null ? row.variant : ""
            ),
            type: 'text'
        },
        {
            name: "Created By",
            minWidth: "250px",
            selector: (row) => <div className="py-1">
              <h6>{row?.member?.member_name ? row?.member?.member_name : row?.super_user_name}</h6>
              <p className="m-0">{row?.member?.email ? row?.member?.email : row?.super_user_email}</p>
            </div>,
            type: 'text'
        },
        {
            name: "ACTION",
            minWidth: "50px",
            selector: (row) => (
                <>
                    <div className='d-flex justify-content-center align-items-center gap-2'>
                        <Eye size='17px' style={{ cursor: "pointer" }} />
                        <Link to={`/merchant/customers/edit-vehicle/${row?.id}?type=edit`}>
                            <Edit size='17px' style={{ cursor: "pointer" }} />
                        </Link>
                    </div>
                </>
            ),
            type: 'date'
        }
    ]

    const defferContent = <>
        <Col className='d-flex align-items-center justify-content-center' md='4' sm='12'>
            <h4 className='m-0'>Vehicle Details</h4>
        </Col>
        <Col className='d-flex align-items-center justify-content-end' md='4' sm='12'>
            <Link className='btn btn-primary-main' to={`/merchant/customers/add-vehicle/${id}?type=customer`}>Add Vehicle</Link>
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


    // console.log("vehicalData", vehicalData[0])
    // console.log(tableData, "pp")
    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            {/* <AdvanceServerSide
                                tableName="Vehicle Details"
                                tableCol={columns}
                                data={tableData}
                                isLoading={isLoading}
                                getData={getData}
                                count={tableData?.recordsTotal}
                                selectableRows={true}
                                setSelectedRows={setSelected}
                                selectedRows={selected}
                                advanceFilter={false}
                                create={true}
                                createLink={`/merchant/customers/add-vehicle/${id}`}
                                createText={"Add Vehicle"}
                            /> */}
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

export default VehicleDetails