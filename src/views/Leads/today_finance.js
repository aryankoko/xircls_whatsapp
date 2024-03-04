import {  Col, Row, Card, CardBody, CardHeader, Button} from "reactstrap"
import {useState } from "react"
import AdvanceServerSide from "@src/views/Components/DataTable/AdvanceServerSide.js"
// import { crmURL } from "@src/assets/auth/jwtService.js"
import { Edit3, Eye, Trash2 } from "react-feather"
import { LuTrendingUp } from "react-icons/lu"
import { LiaUserSlashSolid, LiaUserSolid } from "react-icons/lia"
import { PiMoneyThin } from "react-icons/pi"
import { Link } from "react-router-dom"
import { crmURL, postReq } from "../../assets/auth/jwtService"
import moment from "moment"

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
    form_data.append("slug", "add_finance")
    form_data.append("table_name", "today_finance")
    form_data.append("page", currentPage + 1)
    form_data.append("size", currentEntry)
    form_data.append("searchValue", searchValue)

    postReq("finance_dashboard", form_data, crmURL)
    // fetch(url, {
    //   method: "POST",
    //   body: form_data
    // })
      .then((resp) => {
        console.log("fsfsffsdf", resp)
        setTableData(resp?.data)
        setIsLoading(false)
      })
      .catch((error) => {
        // console.log(error)
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
      selector: (row) => row?.finance_created_at ? moment(row?.finance_created_at).format("YYYY-MM-DD") : '',
      type: 'date'
    },
    {
      name: "Customer Name",
      minWidth: "200px",
      selector: (row) => (
        <Link to={`/merchant/customers/view_customer/${row?.xircls_customer_id}`}>{row?.finance_customer_name ? row.finance_customer_name : "-"}</Link>
      )
      ,
      type: 'text',
      isEnable: true
    },
    {
      name: "Vehicle Name",
      minWidth: "200px",
      selector: (row) => row?.finance_car_name ? row.finance_car_name : "-",
      type: 'text',
      isEnable: true
    },
    {
      name: "Bank Name",
      minWidth: "200px",
      selector: (row) => row?.finance_bank_name ? row.finance_bank_name : "-",
      type: 'text',
      isEnable: true
    },
    {
      name: "Registration Number",
      minWidth: "200px",
      selector: (row) => row?.finance_registration_number ? row.finance_registration_number : "-",
      type: 'text',
      isEnable: true
    },
    {
      name: "Loan Number",
      minWidth: "200px",
      selector: (row) => row?.finance_loan_number ? row.finance_loan_number : "-",
      type: 'text',
      isEnable: true
    },
    {
      name: "Loan Type",
      minWidth: "200px",
      selector: (row) => row?.finance_loan_type ? row.finance_loan_type : "-",
      type: 'text',
      isEnable: true
    },
    {
      name: "Disburse Date",
      minWidth: "200px",
      selector: (row) => row?.finance_loan_disbursement_date ? row?.finance_loan_disbursement_date : "-",
      type: 'text',
      isEnable: true
    },
    {
      name: "Rate Of Interest",
      minWidth: "200px",
      selector: (row) => row?.finance_rate_of_interest ? row.finance_rate_of_interest : "-",
      type: 'text',
      isEnable: true
    },
    {
      name: "Loan Amount",
      minWidth: "200px",
      selector: (row) => row?.finance_loan_amount ? row.finance_loan_amount : "-",
      type: 'text',
      isEnable: true
    },
    {
      name: "EMI Amount",
      minWidth: "200px",
      selector: (row) => row?.finance_emi_amount ? row.finance_emi_amount : "-",
      type: 'text',
      isEnable: true
    },
    {
      name: "EMI Start Date",
      minWidth: "200px",
      selector: (row) => row?.finance_emi_start_date ? moment(row.finance_emi_start_date).format("YYYY-MM-DD") : "-",
      type: 'date',
      isEnable: true
    },
    {
      name: "EMI End Date",
      minWidth: "200px",
      selector: (row) => row?.finance_emi_end_date ? moment(row.finance_emi_end_date).format("YYYY-MM-DD") : "-",
      type: 'date',
      isEnable: true
    },
    {
      name: "Created By",
      minWidth: "250px",
      selector: (row) => <div className="py-1">
        <h6>{row?.finance_created_by ? row?.finance_created_by : row?.super_user_name}</h6>
        <p className="m-0">{row?.finance_created_by_email ? row?.finance_created_by_email : row?.super_user_email}</p>
      </div>,
      type: 'text'
    },
    {
      name: "Action",
      width: "130px",
      selector: (row) => (
        <div className="d-flex ms-1 justify-content-center align-items-center text-center gap-1">
          {/* <Link to={`/merchant/customers/view_customer/${row?.xircls_customer_id}`}><Eye size={15} /></Link> */}
          <Link to={`/merchant/customers/edit_finance/${row?.finance_customer_id}?type=edit`}> <Edit3 size={15} /></Link>
        </div>
      )
    }
  ]
  

  const customerStatisticsData = [
    {
      name: "All Loan",
      data: tableData.total_loan_amount ?? "0",
      type: "number",
      icon: <LuTrendingUp size={30} className="text-dark" />,
      iconStyle: ""
    },
    {
      name: "Today's Loan",
      data: tableData.today_loan ?? "0",
      type: "number",
      icon: <LiaUserSolid size={30} className="text-dark" />,
      iconStyle: ""
    },
    {
      name: "Total Loan Amount",
      data: tableData.total_loan_amount ?? "0",
      type: "money",
      icon: <LiaUserSlashSolid size={30} className="text-dark" />,
      iconStyle: ""
    },
    {
      name: "Total EMI Amount Paid",
      data: tableData.total_emi_amt ?? "0",
      type: "money",
      icon: <PiMoneyThin size={30} className="text-dark" />,
      iconStyle: ""
    },
    {
      name: "Total EMI Amount Due",
      data: tableData.total_loan_amount_remain ?? "0",
      type: "money",
      icon: <PiMoneyThin size={30} className="text-dark" />,
      iconStyle: ""
    }
  ]


  return (
    <>
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
                tableName="Today's Finance Disbursement"
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

export default Customers
