import { useEffect, useState } from "react"
import { Card, CardBody, Col, Input, Row } from "reactstrap"
import ComTable from "../Components/DataTable/ComTable"
import SubscriptionNav from "./components/SubscriptionNav"

const MyWallet = () => {
    const [data, setdata] = useState([])
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        setdata([])
    }, [])

    const handleFilter = e => {
        const value = e.target.value
        let updatedData = []
        setSearchValue(value)
    
        if (value.length) {
          updatedData = data.filter(item => {
            const startsWith =
              item.customer_name.toLowerCase().startsWith(value.toLowerCase())
    
            const includes =
              item.customer_name.toLowerCase().includes(value.toLowerCase())
    
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
            name: 'Sr No.',
            cell: (row, index) => index + 1,
            width: '90px'
        },
        {
          name: 'Date',
          minWidth: '200px',
          selector: row => row.customer_name
        },
        {
          name: 'Time',
          minWidth: '200px',
          selector: row => row.group_name
        },
        {
          name: 'Plan Name',
          minWidth: '250px',
          selector: row => row.phone_no
        },
        {
          name: 'Remarks',
          minWidth: '250px',
          selector: row => row.email
        },
        {
          name: 'Debit',
          minWidth: '250px',
          selector: row => row.email
        },
        {
            name: 'Credit',
            minWidth: '250px',
            selector: row => row.email
        },
        {
            name: 'Balance Amount',
            minWidth: '250px',
            selector: row => row.email
        }
      ]

      const defferContent = <>
        <Col className='d-flex align-items-center justify-content-center' md='4' sm='12'>
            <h4 className='m-0'>Wallet</h4>
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
                    // tableName="Wallet"
                    tableCol={columns}
                    data={data}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
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
                              // tableName="Wallet"
                              tableCol={columns}
                              data={data}
                              searchValue={searchValue}
                              setSearchValue={setSearchValue}
                          />
                      </CardBody>
                  </Card>
              </Col>
          </Row> */}
        </>
    )
}

export default MyWallet