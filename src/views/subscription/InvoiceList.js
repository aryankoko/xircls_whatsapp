import { useEffect, useState } from "react"
import { Archive, Download, Edit, FileText, MoreVertical, Trash } from "react-feather"
import { Card, CardBody, Col, DropdownItem, DropdownMenu, DropdownToggle, Input, Row, UncontrolledDropdown } from "reactstrap"
import { getReq } from "../../assets/auth/jwtService"
import ComTable from "../Components/DataTable/ComTable"
import SubscriptionNav from "./components/SubscriptionNav"
import MomentTime from "../Components/Time-Moment/MomentTime"

const InvoiceList = () => {
    const [data, setdata] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [filteredData, setFilteredData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const handleFilter = e => {
        const value = e.target.value
        let updatedData = []
        setSearchValue(value)
    
        if (value.length) {
          updatedData = data.filter(item => {
            const startsWith =
              item.transaction_no.toLowerCase().startsWith(value.toLowerCase()) ||
              item.username.toLowerCase().startsWith(value.toLowerCase())
    
            const includes =
              item.transaction_no.toLowerCase().includes(value.toLowerCase()) ||
              item.username.toLowerCase().includes(value.toLowerCase())

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
    
    useEffect(() => {

        getReq("getInvoiceList")
        .then((resp) => {
            setdata(resp.data.data.payment_transaction)
            setIsLoading(false)
        })
        .catch((error) => {
            console.log(error)
            setIsLoading(false)
        })
        // console.log(rawData.data.payment_transaction)
        
    }, [])

    const columns = [
        {
            name: 'Sr No.',
            cell: (row, index) => index + 1,
            width: '90px'
        },
        {
          name: 'Date',
          minWidth: '200px',
          selector: row => <MomentTime time={row.payment_date} format={' DD/MM/YYYY, hh:mm'} /> 
        },
        {
          name: 'Txn No.',
          minWidth: '200px',
          selector: row => row.transaction_no
        },
        {
          name: 'Plan',
          minWidth: '250px',
          selector: row => row.plan_details
        },
        {
          name: 'Name',
          minWidth: '250px',
          selector: row => row.username
        },
        {
          name: 'Status',
          cell: (row) => {
            return (
                row.payment_status === "PI" ? <div className="badge badge-light-success">Paid</div> : ""
            )
        }
        },
        {
            name: 'Actions',
            allowOverflow: true,
            cell: () => {
                return (
                    <div className='d-flex justify-content-center align-items-center gap-1'>
                        <FileText size={15} />
                        <Download size={15} />
                    </div>
                )
            }
        }
      ]

      const defferContent = <>
        <Col className='d-flex align-items-center justify-content-center' md='4' sm='12'>
          <h4 className='m-0'>Invoices</h4>
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

    return (
      <>
        {/* <Row className="match-height">
            <Col md="4">
                <Card>
                    <CardBody>
                        <SubscriptionNav />
                    </CardBody>
                </Card>
            </Col>
            <Col md="8">
                <Card>
                    <CardBody>
                        <ComTable
                            content={defferContent}
                            // tableName="Invoices"
                            tableCol={columns}
                            data={data}
                            searchValue={searchValue}
                            handleFilter={handleFilter}
                            filteredData={filteredData}
                            isLoading={isLoading}
                        />
                    </CardBody>
                </Card>
            </Col>
        </Row> */}

        <Card>
          <CardBody>
            <ComTable
              content={defferContent}
              // tableName="Invoices"
              tableCol={columns}
              data={data}
              searchValue={searchValue}
              handleFilter={handleFilter}
              filteredData={filteredData}
              isLoading={isLoading}
            />
          </CardBody>
        </Card>
      </>
    )
}

export default InvoiceList