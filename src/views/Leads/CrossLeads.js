/* eslint-disable */
import { Col, Row, Card, CardBody, CardHeader, Button } from "reactstrap"
import { useState } from "react"
import AdvanceServerSide from "@src/views/Components/DataTable/AdvanceServerSide.js"
import { Edit3, Eye, Trash2 } from "react-feather"
import { LuTrendingUp } from "react-icons/lu"
import { LiaUserSlashSolid, LiaUserSolid } from "react-icons/lia"
import { LuBox } from "react-icons/lu";
import { Link } from "react-router-dom"
import { baseURL, crmURL, getReq, postReq, putReq } from "../../assets/auth/jwtService"
import moment from "moment"

const CrossLeads = () => {
    const [tableData, setTableData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    // const [selected, setSelected] = useState([])

    const getData = (currentPage = 0, currentEntry = 10, searchValue = "", advanceSearchValue = {}) => {
        setIsLoading(true)
        const form_data = new FormData()
        Object.entries(advanceSearchValue).map(([key, value]) => value && form_data.append(key, value))
        form_data.append("page", currentPage + 1)
        form_data.append("size", currentEntry)
        form_data.append("searchValue", searchValue)

        // fetch(`${crmURL}/customers/cross_leads/`, {
        //     method: 'POST',
        //     body: form_data,
        //     headers: {
        //         "outlet": "879",
        //     }
        // })
        postReq('cross_leads', form_data, crmURL)
        .then((resp) => {
            console.log("hh", resp)
            setIsLoading(false)
            setTableData(resp?.data)
        })
        .catch((error) => {
            console.log(error)
            setIsLoading(false)
        })
    }

    const columns = [
        {
            name: "Created At",
            minWidth: "200px",
            selector: (row) => row?.created_at ? moment(row.created_at).format("YYYY-MM-DD") : "-",
            type: 'date',
            isEnable: true
        },
        {
            name: "Customer Name",
            minWidth: "180px",
            selector: (row) => (
                <Link to={`/merchant/customers/view_customer/${row?.xircls_customer_id}`}>{row?.customer_name}</Link>
            ),
            type: 'text',
            isEnable: false
        },
        // {
        //     name: "Customer Group",
        //     maxWidth: "180px",
        //     type: 'select',
        //     options: [
        //         { label: "Select Customer Group", value: '' },
        //     ],
        //     isEnable: true
        // },
        {
            name: "Mobile No",
            maxWidth: "180px",
            selector: (row) => row?.phone_no ?? '-',
            type: 'text',
        },
        {
            name: "Email",
            maxWidth: "300px",
            selector: (row) => row?.email ?? '-',
            type: 'email',
        },
        {
            name: "Location",
            maxWidth: "180px",
            selector: (row) => row?.location ?? '-',
            type: 'text',
            isEnable: true
        },
        {
            name: "Is Finanace",
            maxWidth: "120px",
            selector: (row) => (
                row?.is_finance === true ? (
                    <div>True</div>
                ) : <div>False</div>
            ),
            type: 'select',
            options: [
                { label: "No Filter", value: '' },
                { label: "True", value: 'true' },
                { label: "False", value: 'false' }
            ],
            isEnable: true
        },
        {
            name: "Is Insurance",
            maxWidth: "120px",
            selector: (row) => (
                row?.is_insurance === true ? (
                    <div>True</div>
                ) : <div>False</div>
            ),
            type: 'select',
            options: [
                { label: "No Filter", value: '' },
                { label: "True", value: 'true' },
                { label: "False", value: 'false' }
            ],
            isEnable: true
        },
        {
            name: "Is Servicing",
            maxWidth: "120px",
            selector: (row) => (
                row?.is_servicing === true ? (
                    <div>True</div>
                ) : <div>False</div>
            ),
            type: 'select',
            options: [
                { label: "No Filter", value: '' },
                { label: "True", value: 'true' },
                { label: "False", value: 'false' }
            ],
            isEnable: true
        },
        {
            name: "Created By",
            minWidth: "250px",
            selector: (row) => <div className="py-1">
              <h6>{row?.member__member_name ? row?.member__member_name : row?.super_user_name}</h6>
              <p className="m-0">{row?.member__email ? row?.member__email : row?.super_user_email}</p>
            </div>,
            type: 'text'
        },
        {
            name: "Action",
            maxWidth: "150px",
            selector: (row) => (
                <div className="d-flex ms-1 justify-content-center align-items-center text-center gap-1">
                    <Link to={`/merchant/customers/view_customer/${row?.xircls_customer_id}`}><Eye size={15} /></Link>
                    <Link to={`/merchant/customers/edit_customer/${row?.id}?type=edit`}> <Edit3 size={15} /></Link>
                </div>
            )
        }
    ]

    return (
        <>
            <Card>
                <CardHeader>
                    <div className="d-flex justify-content-between align-items-center w-100">
                        <h4 className="m-0">Cross Leads</h4>
                    </div>
                </CardHeader>
            </Card>
            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <AdvanceServerSide
                                tableName="Cross Leads"
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

export default CrossLeads