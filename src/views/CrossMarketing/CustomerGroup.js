
import { Col, Row, Card, CardBody, Input } from 'reactstrap'
import ComTable from '../Components/DataTable/ComTable'
import { useEffect, useState } from 'react'
import { getReq } from "../../assets/auth/jwtService"
import { Link } from 'react-router-dom'


const CustomerGroup = () => {
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
              item.group_name.toLowerCase().startsWith(value.toLowerCase()) ||
              item.group_description.toLowerCase().startsWith(value.toLowerCase())
    
            const includes =
              item.group_name.toLowerCase().includes(value.toLowerCase()) ||
              item.group_description.toLowerCase().includes(value.toLowerCase())
    
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

    const defferContent = <>
      <Col className='d-flex align-items-center justify-content-center' md='4' sm='12'>
        <h4 className='m-0'>Customer Groups</h4>
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

    const columns = [
        {
          name: 'Sr No.',
          cell: (row, index) => index + 1,
          width: '90px'
        },
        {
          name: 'Group Name',
          minWidth: '200px',
          selector: row => row.group_name
        },
        {
          name: 'Description',
          minWidth: '250px',
          selector: row => row.group_description
        },
        {
          name: 'No Of Customer',
          minWidth: '250px',
          selector: row => row.customer_count
        }
      ]

      useEffect(() => {

        getReq("customerGroup")
        .then((resp) => {
          setdata(resp.data.data)
          setIsLoading(false)
        })
        .catch((error) => {
          console.log(error)
          setIsLoading(false)
          
        })
      }, [])

    return (
        <>
            <Card>
                <CardBody>
                    <div className="d-flex justify-content-between align-items-center">
                      <h4>Customer Groups</h4>
                      <Link to='/merchant/customers/create-groups/' className='btn btn-primary'>Create Group</Link>
                    </div>
                </CardBody>
            </Card>
            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <ComTable
                              content={defferContent}
                              tableCol={columns}
                              data={data}
                              searchValue={searchValue}
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

export default CustomerGroup