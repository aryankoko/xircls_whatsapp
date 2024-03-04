import React, { useContext, useEffect, useState } from 'react'
import { Card, CardBody, Col, Input, Row } from 'reactstrap'
import ComTable from '../Components/DataTable/ComTable'
import { Link } from 'react-router-dom'
import { getReq } from '../../assets/auth/jwtService'
import { PermissionProvider } from '../../Helper/Context'

const ProductView = () => {
    const [data, setdata] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [filteredData, setFilteredData] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    const { userPermission } = useContext(PermissionProvider)

    const handleFilter = e => {
        const value = e.target.value
        let updatedData = []
        setSearchValue(value)
    
        if (value.length) {
          updatedData = data.filter(item => {
            const startsWith =
              item.title.toLowerCase().startsWith(value.toLowerCase()) ||
              item.vendor.toLowerCase().startsWith(value.toLowerCase()) ||
              item.product_type.toLowerCase().startsWith(value.toLowerCase())
    
            const includes =
              item.title.toLowerCase().includes(value.toLowerCase()) ||
              item.vendor.toLowerCase().includes(value.toLowerCase()) ||
              item.product_type.toLowerCase().includes(value.toLowerCase())

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
            width: '90px',
            cell: (row, index) => index + 1
        },
        {
            name: 'Product Image',
            cell: (row) => {
                return (
                    <img src={row.image.src} width="40px" />
                )
            }
        },
        {
            name: 'Product Name',
            minWidth: '250px',
            selector: (row, index) => <Link to={`/products/view-products/${index}`}>{row.title}</Link>
        },
        {
            name: 'Status',
            cell: (row) => {
                return (
                    <>
                        {
                            row.status === "active" ? <span
                                style={{
                                backgroundColor: "RGBA(25,135,84,var(--bs-bg-opacity,1)) !important"
                                }}
                                className="badge badge-light-success"
                            >
                                Active
                            </span> : <span
                                style={{
                                backgroundColor: "RGBA(25,135,84,var(--bs-bg-opacity,1)) !important"
                                }}
                                className="badge badge-light-danger"
                            >
                                Inactive
                            </span>
                        }
                    
                    </>
                    
                )
            }
        },
        {
            name: 'Product Vendor',
            selector: (row) => row.vendor
        },
        {
            name: 'Product Type',
            cell: (row) => row.product_type
        }
    ]

    const getData = () => {
        getReq('productDetails', `/?app=${userPermission.appName}`)
        .then((resp) => {
            setdata(resp.data.data.product_details.Product_Details.products)
            setIsLoading(false)
        })
        .catch((error) => {
            console.log(error)
            setIsLoading(false)
        })
    }

    useEffect(() => {
        // setdata([{id: 1}])
        getData()
    }, [])

    const defferContent = <>
      <Col className='d-flex align-items-center justify-content-center' md='4' sm='12'>
        <h4 className='m-0'>Products</h4>
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
    <Row>
        <Col md='12'>
            <Card>
                <CardBody>
                    <h4>Products</h4>
                </CardBody>
            </Card>
        </Col>
        <Col md='12'>
            <Card>
                <CardBody>
                    <ComTable
                        content={defferContent}
                        // tableName="Products"
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
    </Row>
  )
}

export default ProductView