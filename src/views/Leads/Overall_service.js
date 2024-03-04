import { Col, Row, Card, CardBody, CardHeader, Button } from "reactstrap"
import { useState } from "react"
import AdvanceServerSide from "@src/views/Components/DataTable/AdvanceServerSide.js"
// import { crmURL } from "@src/assets/auth/jwtService.js"
import { Edit3, Eye, Trash2 } from "react-feather"
import { LuTrendingUp } from "react-icons/lu"
import { LiaUserSlashSolid, LiaUserSolid } from "react-icons/lia"
import { PiMoneyThin } from "react-icons/pi"
import { Link } from "react-router-dom"
import moment from "moment/moment"
import { crmURL, postReq } from "../../assets/auth/jwtService"

/* eslint-disable */
const Customers = () => {
  const [tableData, setTableData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  // const [selected, setSelected] = useState([])

  const getData = (currentPage = 0, currentEntry = 10, searchValue = "", advanceSearchValue = {}) => {
    setIsLoading(true)
    const form_data = new FormData()
    // const url = new URL(`${crmURL}/customers/merchant/all_cust_dashboard/`)
    // form_data.append("draw", "1")
    // form_data.append("length", "10")
    // form_data.append("start", "1")
    Object.entries(advanceSearchValue).map(([key, value]) => value && form_data.append(key, value))
    form_data.append("slug", "add_servicing")
    form_data.append("table_name", "overAll_servicing")
    form_data.append("page", currentPage + 1)
    form_data.append("size", currentEntry)
    form_data.append("searchValue", searchValue)

    // fetch(url, {
    //   method: "POST",
    //   body: form_data
    // })
    postReq("servicing_dashboard", form_data, crmURL)
      .then((resp) => {
        console.log("hh", resp)
        setTableData(resp?.data)
        setIsLoading(false)
      })
      .catch((error) => {
        // console.log(error)
        setIsLoading(false)
      })

  }

  //   useEffect(() => {
  //     getData()
  //   }, [])

  const columns = [
    {
      name: "Created At",
      minWidth: "240px",
      selector: (row) => row?.servicing_created_at ? moment(row?.servicing_created_at).format("YYYY-MM-DD") : '',
      type: 'date'
    },
    {
      name: "Customer Name",
      minWidth: "150px",
      selector: (row) => (
        <Link to={`/merchant/customers/view_customer/${row?.xircls_customer_id}`}>{row?.servicing_customer_name ? row.servicing_customer_name : "-"}</Link>
      ),
      type: 'text',
      isEnable: true
    },
    {
      name: "Brand",
      minWidth: "150px",
      selector: (row) => row?.servicing_brand ? row.servicing_brand : "-",
      type: 'text',
      isEnable: true
    },
    {
      name: "Model",
      minWidth: "200px",
      selector: (row) => row?.servicing_model ? row.servicing_model : "-",
      type: 'text',
      isEnable: true
    },
    {
      name: "Variant",
      minWidth: "200px",
      selector: (row) => row?.servicing_variant ? row.servicing_variant : "-",
      type: 'text',
      isEnable: true
    },
    {
      name: "Service Location",
      minWidth: "200px",
      selector: (row) => row?.servicing_service_location ? row.servicing_service_location : "-",
      type: 'text',
      isEnable: true
    },
    {
      name: "Job Card Date",
      minWidth: "200px",
      selector: (row) => row?.servicing_job_card_date ? moment(row.servicing_job_card_date).format("YYYY-MM-DD") : "-",
      type: 'date',
      isEnable: true
    },
    {
      name: "Service Invoice Date",
      minWidth: "200px",
      selector: (row) => row?.servicing_service_invoice_date ? moment(row.servicing_service_invoice_date).format("YYYY-MM-DD") : '-',
      type: 'date',
      isEnable: true
    },
    {
      name: "Service Expiry Date",
      minWidth: "200px",
      selector: (row) => row?.servicing_service_expiry_date ? moment(row.servicing_service_expiry_date).format("YYYY-MM-DD") : "-",
      type: 'date',
      isEnable: true
    },
    {
      name: "Service Invoice Amount",
      minWidth: "200px",
      selector: (row) => row?.servicing_service_invoice_amount ? row.servicing_service_invoice_amount : "-",
      type: 'text',
      isEnable: true
    },
    {
      name: "Created By",
      minWidth: "250px",
      selector: (row) => <div className="py-1">
        <h6>{row?.servicing_created_by ? row?.servicing_created_by : row?.super_user_name}</h6>
        <p className="m-0">{row?.servicing_created_by_email ? row?.servicing_created_by_email : row?.super_user_email}</p>
      </div>,
      type: 'text'
    },
    {
      name: "Action",
      width: "130px",
      selector: (row) => (
        <div className="d-flex ms-1 justify-content-center align-items-center text-center gap-1">
          {/* <Link to={`/merchant/customers/view_customer/${row?.xircls_customer_id}`}><Eye size={15} /></Link> */}
          <Link to={`/merchant/customers/add-servicing/${row?.servicing_id}?type=edit`}> <Edit3 size={15} /></Link>
        </div>
      )
    }
  ]

  return (
    <>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <AdvanceServerSide
                tableName="All Servicing"
                tableCol={columns}
                data={tableData?.data}
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

export default Customers
