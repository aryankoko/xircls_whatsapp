import { Col, Row, Card, CardBody, CardHeader, Button } from "reactstrap"
import { useState } from "react"
import AdvanceServerSide from "@src/views/Components/DataTable/AdvanceServerSide.js"
import { Edit3, Eye, Trash2 } from "react-feather"
import { LuTrendingUp } from "react-icons/lu"
import { LiaUserSlashSolid, LiaUserSolid } from "react-icons/lia"
import { PiMoneyThin } from "react-icons/pi"
import { Link } from "react-router-dom"
import { baseURL, crmURL, postReq } from "../../assets/auth/jwtService"
import moment from "moment"

/* eslint-disable */
const Customers = () => {
  const [tableData, setTableData] = useState([])
  const [custData, setCustData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [selected, setSelected] = useState([])
  const [id, setId] = useState()

  const getData = (currentPage = 0, currentEntry = 10, searchValue = "", advanceSearchValue = {}) => {
    setIsLoading(true)
    const form_data = new FormData()
    const url = new URL(`${baseURL}/customers/merchant/all_cust_dashboard/`)
    // form_data.append("draw", "1")
    // form_data.append("length", "10")
    // form_data.append("start", "1")
    Object.entries(advanceSearchValue).map(([key, value]) => value && form_data.append(key, value))
    form_data.append("slug", "customer_data")
    // form_data.append("table_name", "overAll_finance")
    form_data.append("page", currentPage + 1)
    form_data.append("size", currentEntry)
    form_data.append("searchValue", searchValue)


    // fetch(url, {
    //   method: "POST",
    //   body: form_data
    // })
      // .then((data) => data.json())
      postReq("crm_all_cust_dashboard", form_data, crmURL)
      .then((resp) => {
        console.log(resp, "crm_all_cust_dashboard")
        setCustData(resp?.data?.success)
        console.log("hh", resp?.data?.success)
        setTableData(resp?.data?.success)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
      })

    // console.log("Main TableData", tableData)
  }

  // useEffect(() => {
  //   getData()
  // }, [])

  const columns = [
    {
      name: "Created At",
      minWidth: "240px",
      selector: (row) => row?.customer_details_created_at ? moment(row?.customer_details_created_at).format("YYYY-MM-DD") : '',
      type: 'date'
    },
    {
      name: "Customer Name",
      minWidth: "200px",
      selector: (row) => (
        <Link to={`view_customer/${row?.customer_details_id}`}>{row?.customer_details_customer_name}</Link>
      )
      ,
      type: 'text',
      isEnable: true
    },
    {
      name: "Customer Group",
      minWidth: "100px",
      selector: (row) => row?.customer_details_phone_no ? '' : row.customer_details_phone_no,
      type: 'text',
      isEnable: true
    },
    {
      name: "Mobile Number",
      minWidth: "150px",
      selector: (row) => row?.customer_details_phone_no,
      type: 'text',
      isEnable: true
    },
    {
      name: "Email",
      minWidth: "200px",
      selector: (row) => row?.customer_details_email,
      type: 'text',
      isEnable: true
    },
    {
      name: "Created By",
      minWidth: "250px",
      selector: (row) => <div className="py-1">
        <h6>{row?.customer_details_created_by ? row?.customer_details_created_by : row?.super_user_name}</h6>
        <p className="m-0">{row?.customer_details_created_by_email ? row?.customer_details_created_by_email : row?.super_user_email}</p>
      </div>,
      type: 'text'
    },
    {
      name: "Action",
      minWidth: "50px",
      selector: (row) => (
        <div className="d-flex ms-1 justify-content-center align-items-center text-center gap-1">
          <Link to={`view_customer/${row?.customer_details_id}`}><Eye size={15} /></Link>
          <Link to={`/merchant/customers/edit_customer/${row?.customer_details_id}`}> <Edit3 size={15} /></Link>
          <Trash2 size={15} />
        </div>
      )
    }
  ]


  const customerStatisticsData = [
    {
      name: "Total Customers",
      data: custData?.customer_detailsrecordsTotal ?? '0',
      type: "number",
      icon: <LuTrendingUp size={30} className="text-dark" />,
      iconStyle: ""
    },
    {
      name: "Active Customers",
      data: custData?.customer_detailsrecordsFiltered ?? '0',
      type: "number",
      icon: <LiaUserSolid size={30} className="text-dark" />,
      iconStyle: ""
    },
    {
      name: "Inactive Customers",
      data: custData?.total_loan_amount ?? '0',
      type: "number",
      icon: <LiaUserSlashSolid size={30} className="text-dark" />,
      iconStyle: ""
    },
    {
      name: "Earnings Today",
      data: custData?.total_emi_amt ?? '0',
      type: "money",
      icon: <PiMoneyThin size={30} className="text-dark" />,
      iconStyle: ""
    }
  ]


  return (
    <>
      <Card>
        <CardHeader>
          <div className="d-flex justify-content-between align-items-center w-100">
            <h4 className="m-0">Customer Dashboard</h4>
            <div className="pe-2 d-flex">
              <Link to="/merchant/customer/add_type_of_customer/">
                <Button className="btn btn-outline-primary btn-block">Add Customer</Button>
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
          <div className="mx-2 d-flex justify-content-between ">
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
                tableName="Customers"
                tableCol={columns}
                data={tableData?.customer_details_obj}
                isLoading={isLoading}
                getData={getData}
                count={tableData?.customer_detailsrecordsTotal}
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
