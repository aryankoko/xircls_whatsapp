import React, { useEffect, useState } from 'react'
import ProfileNav from './components/ProfileNav'
import { Card, CardBody, Col, Input, Row } from 'reactstrap'
import ComTable from "../Components/DataTable/ComTable"
import { getReq, postReq } from '../../assets/auth/jwtService'
import toast from 'react-hot-toast'


const VerifyEmail = () => {

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

  const defferContent = <>
    <Col className='d-flex align-items-center justify-content-center' md='4' sm='12'>
      <h4 className='m-0'>Verified Email</h4>
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

  const emailStatusChange = (e, email_id) => {

    const form_data = new FormData()
    form_data.append('email_to_verify', email_id)
    form_data.append('email_to_toggle', email_id)
    form_data.append('email_to_toggle', e.target.checked)
    console.log(e.target.checked)
    postReq('verifyEmail', form_data)
    .then((resp) => {
      toast.success(resp.data.message)
    })
  }

  useEffect(() => {
    getReq('verifyEmail')
    .then((resp) => {
      console.log(resp)
      setdata(resp.data.data.oulet_email)
      setIsLoading(false)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])

  const columns = [
    {
      name: 'Sr No.',
      cell: (row, index) => index + 1,
      width: '90px'
    },
    {
        name: 'Email Id',
        minWidth: '200px',
        selector: row => row.email_id
    },
    {
        name: 'Verfication Status',
        cell: (row) => {
          return (
              row.is_verified ? <>
                <span className="badge badge-light-primary">Verified</span>
              </> : <>
                <span className="badge badge-light-danger">Not Verified</span>
              </>
                
          )
          
        }
    },
    {
        name: 'Activate Sender ID',
        cell: (row) => {
          return (
            <>
              <div className='form-check form-switch form-check-primary mb-1'>
                <Input type='checkbox' id='verify' defaultChecked={row.is_verified} onChange={(e) => emailStatusChange(e, row.email_id)} />
              </div>
            </>
          )
        }
    }
  ]


  return (
    <Row className="match-height">
        <Col md="4">
            <Card>
                <CardBody>
                    <ProfileNav />
                </CardBody>
            </Card>
        </Col>
        <Col md="8">
          <Card>
            <CardBody>
              <Row>
                <Col sm='8'>
                  <input type='text' className='form-control' />
                </Col>
                <Col sm='4'>
                  <a className='btn btn-primary'> Click to Get Verification mail </a>
                </Col>
              </Row>
              <Row className='mt-2'>
                  <ComTable
                    // tableName="Verified Email"
                    content={defferContent}
                    tableCol={columns}
                    data={data}
                    searchValue={searchValue}
                    // handleFilter={handleFilter}
                    filteredData={filteredData}
                    isLoading={isLoading}
                  />
              </Row>
            </CardBody>
          </Card>
        </Col>
    </Row>
    
  )
}

export default VerifyEmail