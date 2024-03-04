import React, { useEffect, useState } from 'react'
import { Card, CardBody, Col, Input, Row } from 'reactstrap'
import ComTable from '../Components/DataTable/ComTable'

const LendGen = () => {
    const [data, setdata] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [filteredData, setFilteredData] = useState([])

    const handleFilter = e => {
        const value = e.target.value
        let updatedData = []
        setSearchValue(value)
    
        if (value.length) {
            updatedData = data.filter(item => {
            const startsWith =
                item.email_id.toLowerCase().startsWith(value.toLowerCase())
    
            const includes =
                item.email_id.toLowerCase().includes(value.toLowerCase())
    
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
            name: 'Created at',
            minWidth: '200px',
            selector: row => row.email_id
        },
        {
            name: 'Discount Code',
            minWidth: '200px',
            selector: row => row.email_id
        },
        {
            name: 'Redeem Status',
            minWidth: '200px',
            selector: row => row.email_id
        },
        {
            name: 'Bill Amount',
            minWidth: '200px',
            selector: row => row.email_id
        },
        {
            name: 'Order Amount',
            minWidth: '200px',
            selector: row => row.email_id
        }
    ]

    useEffect(() => {
        setdata([])
    }, [])

    const defferContent = <>
      <Col className='d-flex align-items-center justify-content-center' md='4' sm='12'>
        <h4 className='m-0'>superleadz</h4>
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
            <Row>
                <Col md='12'>
                    <Card>
                        <CardBody>
                            <h4>superleadz Reports</h4>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md='12'>
                    <Card>
                        <CardBody>
                            <ComTable
                            content={defferContent}
                            // tableName="superleadz"
                            tableCol={columns}
                            data={data}
                            searchValue={searchValue}
                            // handleFilter={handleFilter}
                            filteredData={filteredData}
                            />
                        </CardBody>
                    </Card>
                    
                </Col>
            </Row>
        </>
    )
}

export default LendGen