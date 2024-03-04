import { useEffect, useState } from "react"
import { Card, CardBody, Col, Input, Row } from "reactstrap"
import ComTable from "../Components/DataTable/ComTable"
import SubscriptionNav from "./components/SubscriptionNav"
import { getReq } from "../../assets/auth/jwtService"
import { FileText } from "react-feather"
import MomentTime from "../Components/Time-Moment/MomentTime"

const MyTransactions = () => {
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
              item.transaction_no.toLowerCase().startsWith(value.toLowerCase())
    
            const includes =
              item.transaction_no.toLowerCase().includes(value.toLowerCase())
    
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

    const viewInvoice = () => {
      getReq()
    }

    useEffect(() => {

        getReq("myTransactions")
        .then((resp) => {
          setdata(resp.data.data)
          console.log({resp})
          setIsLoading(false)
        })
        .catch((error) => {
          console.log(error)
          setIsLoading(false)
        })
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
        selector: row => <MomentTime time={row.payment_date} format={'DD/MM/YYYY, hh:mm'} /> 
      },
      {
        name: 'Txn No.',
        minWidth: '200px',
        selector: row => row.transaction_no
      },
      {
        name: 'Plan Name',
        minWidth: '250px',
        selector: row => row.plan_name[0].membership_plan_name
      },
      {
        name: 'Remarks',
        minWidth: '250px',
        selector: row => row.remarks
      },
      {
        name: 'Debit',
        minWidth: '250px',
        selector: row => row.debit_amount
      },
      {
        name: 'Credit',
        minWidth: '250px',
        selector: row => row.credit_amount
      },
      {
        name: 'Balance Amount',
        minWidth: '250px',
        selector: row => row.balance_amount
      },
      {
          name: 'Action',
          minWidth: '250px',
          cell: () => {
              return (
                  <div className='d-flex justify-content-center align-items-center gap-1' onClick={() => viewInvoice()}>
                      <FileText size={15} />
                  </div>
              )
          }
      }
    ]

      const defferContent = <>
        <Col className='d-flex align-items-center justify-content-center' md='4' sm='12'>
          <h4 className='m-0'>All Transactions</h4>
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
          <Card>
            <CardBody>
              <ComTable
                content={defferContent}
                // tableName="All Transactions"
                tableCol={columns}
                data={data}
                searchValue={searchValue}
                // handleFilter={handleFilter}
                filteredData={filteredData}
                isLoading={isLoading}
              />
            </CardBody>
        </Card>
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
                              // tableName="All Transactions"
                              tableCol={columns}
                              data={data}
                              searchValue={searchValue}
                              // handleFilter={handleFilter}
                              filteredData={filteredData}
                              isLoading={isLoading}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row> */}
        </>
    )
}

export default MyTransactions