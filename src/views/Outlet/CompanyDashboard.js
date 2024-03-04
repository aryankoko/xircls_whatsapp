import React, { useEffect, useState } from 'react'
import { Card, CardBody, Col, Input, Row } from 'reactstrap'
import ComTable from '../Components/DataTable/ComTable'
import { getReq } from '../../assets/auth/jwtService'
import { Edit } from 'react-feather'
import { Link } from 'react-router-dom'

const CompanyDashboard = () => {
    const [data, setData] = useState([])
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
            name: 'Company Name',
            minWidth: '200px',
            selector: row => row.company_profile.company_name
        },
        {
            name: 'Pincode',
            minWidth: '200px',
            selector: row => row.company_profile.pincode
        },
        {
            name: 'Landline/Mobile No.',
            selector: row => `${row.company_profile.mobile}`
        },
        {
            name: 'Status',
            cell: (row) => {
                return (
                    <>
                        {
                            row.company_profile.is_active ? <div className="badge badge-light-success">Active</div> : <span className="badge badge-light-success">Deactivated</span>
                        }
                    </>
                )
            }
        },
        {
            name: 'Action',
            cell: (row) => {
                return (
                    <>
                        <Link to="/merchant/company/profile/" state={row} className='edit cursor-pointer'>
                            <Edit size={15} color='#00a680' />
                        </Link>
                    </>
                )
            }
        }
    ]

    const getData = () => {
        getReq('addCompany')
        .then((resp) => {
            console.log(resp)
            setData([resp.data.data])
            setIsLoading(false)
        })
        .catch((error) => {
            setIsLoading(false)
            console.log(error)
        })
    }

    useEffect(() => {
        getData()
    }, [])

    const defferContent = <>
      <Col className='d-flex align-items-center justify-content-center' md='4' sm='12'>
        <h4 className='m-0'>Companies</h4>
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
                        <ComTable
                            content={defferContent}
                            tableName="Companies"
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
        </Row>
    </>
  )
}

export default CompanyDashboard