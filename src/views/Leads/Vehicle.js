/* eslint-disable */
import { Col, Row, Card, CardBody, CardHeader, Button } from "reactstrap"
import { useState } from "react"
import AdvanceServerSide from "@src/views/Components/DataTable/AdvanceServerSide.js"
import { Edit3, Eye, Trash2 } from "react-feather"
import { LuTrendingUp } from "react-icons/lu"
import { LiaUserSlashSolid, LiaUserSolid } from "react-icons/lia"
import { LuBox } from "react-icons/lu";
import { Link } from "react-router-dom"
import { baseURL, crmURL, postReq } from "../../assets/auth/jwtService"
import moment from "moment"

const Vehicle = () => {
    const [tableData, setTableData] = useState([])
    // const [custData, setCustData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    // const [selected, setSelected] = useState([])

    const getData = (currentPage = 0, currentEntry = 10, searchValue = "", advanceSearchValue = {}) => {
        setIsLoading(true)
        const form_data = new FormData()
        // form_data.append("draw", "1")
        // form_data.append("length", "10")
        // form_data.append("start", "1")
        Object.entries(advanceSearchValue).map(([key, value]) => value && form_data.append(key, value))
        // form_data.append("slug", "customer_data")
        // form_data.append("table_name", "overAll_finance")
        form_data.append("page", currentPage + 1)
        form_data.append("size", currentEntry)
        form_data.append("searchValue", searchValue)

        postReq('get_vehicle', form_data, crmURL)
        .then((resp) => {
            console.log("vehicle", resp.data.customers_obj)
            setTableData(resp.data)
            setIsLoading(false)
        })
        .catch((error) => {
            console.log(error)
            setIsLoading(false)
        })
    }

    const columns = [
        {
            name: "Created At",
            minWidth: "240px",
            selector: (row) => row?.vehicle_created_at ? moment(row?.vehicle_created_at).format("YYYY-MM-DD") : '',
            type: 'date'
        },
        {
            name: "Customer Name",
            minWidth: "200px",
            selector: (row) => (
                <Link to={`/merchant/customers/view_customer/${row?.xircls_customer_id}`}>{row?.vehicle_customer_name ?? '-'}</Link>
            ),
            type: 'text',
            isEnable: true
        },
        {
            name: "Vehicle Number",
            minWidth: "100px",
            selector: (row) => row?.vehicle_vehicle_number ?? '-',
            type: 'text',
            isEnable: true
        },
        {
            name: "Brand",
            minWidth: "100px",
            selector: (row) => row?.vehicle_brand ?? '-',
            type: 'text',
            isEnable: true
        },
        {
            name: "Model",
            minWidth: "100px",
            selector: (row) => row?.vehicle_model ?? '-',
            type: 'text',
            isEnable: true
        },
        {
            name: "Variant",
            minWidth: "100px",
            selector: (row) => row?.vehicle_vareint ?? '-',
            type: 'text',
            isEnable: true
        },
        {
            name: "Registration Date",
            minWidth: "200px",
            selector: (row) => row?.vehicle_registeration_date ? moment(row?.vehicle_registeration_date).format('YYYY-MM-DD') : "-",
            type: 'date',
            isEnable: true
        },
        {
            name: "Created By",
            minWidth: "250px",
            selector: (row) => <div className="py-1">
              <h6>{row?.vehicle_created_by ? row?.vehicle_created_by : row?.super_user_name}</h6>
              <p className="m-0">{row?.vehicle_created_by_email ? row?.vehicle_created_by_email : row?.super_user_email}</p>
            </div>,
            type: 'text'
        },
        {
            name: "Action",
            minWidth: "80px",
            selector: (row) => (
                <div className="d-flex ms-1 justify-content-center align-items-center text-center gap-1">
                    {/* <Link to={`/merchant/customers/view_customer/${row?.xircls_customer_id}`}><Eye size={15} /></Link> */}
                    <Link to={`/merchant/customers/edit-vehicle/${row?.vehicle_id}?type=edit`}> <Edit3 size={15} /></Link>
                </div>
            )
        }
    ]

    const customerStatisticsData = [
        {
            name: "All Vehicles",
            data: tableData?.all_vehicle_count ?? '0',
            type: "number",
            icon: <LuTrendingUp size={30} className="text-dark" />,
            iconStyle: ""
        },
        {
            name: "Today's Vehicle",
            data: tableData?.today_vehicle ?? '0',
            type: "number",
            icon: <LiaUserSolid size={30} className="text-dark" />,
            iconStyle: ""
        },
        {
            name: "Delivery To Be Made Today",
            data: tableData?.delivery_to_be_made_today ?? '0',
            type: "number",
            icon: <LuBox Solid size={30} className="text-dark" />,
            iconStyle: ""
        }
    ]

    return (
        <>
            <Card>
                <CardHeader>
                    <div className="d-flex justify-content-between align-items-center w-100">
                        <h4 className="m-0">Vehicle Dashboard</h4>
                        <div className="pe-2 d-flex">
                            <Link to="/merchant/customers/add-vehicle/">
                                <Button className="btn btn-outline-primary btn-block">Add Vehicle</Button>
                            </Link>
                        </div>
                    </div>
                </CardHeader>
            </Card>
            <Card>
                <CardHeader>
                    <Row className="mb-2">
                        <h4 className="">Statistics</h4>
                    </Row>
                </CardHeader>
                <CardBody>
                    <div className="mx-2 d-flex justify-content-around ">
                        {customerStatisticsData.map((ele) => (
                            <Row className="align-items-center">
                                <Col
                                    xs="2"
                                    className={`d-flex justify-content-start align-items-center d-black ${ele.iconStyle && ele.iconStyle
                                        }`}
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "50%"
                                    }}
                                >
                                    {ele.icon}
                                </Col>
                                <Col className="ms-1">
                                    <p className=" fw-bolder" style={{ fontSize: "15px", margin: "0px" }}>
                                        {ele.type === "money" ? `₹${ele.data}` : ele.data}
                                    </p>
                                    <h4 className="fs-6 fw-light" style={{ margin: "0px" }}>{ele.name}</h4>
                                </Col>
                            </Row>
                        ))}
                    </div>
                </CardBody>
            </Card>
            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <AdvanceServerSide
                                tableName="Vehicles"
                                tableCol={columns}
                                data={tableData?.customers_obj}
                                isLoading={isLoading}
                                getData={getData}
                                count={tableData?.recordsTotal}
                                // selectableRows={true}
                                // setSelectedRows={setSelected}
                                // selectedRows={selected}
                                advanceFilter={true}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Vehicle