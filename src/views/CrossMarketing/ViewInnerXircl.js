import React, { useEffect, useState } from 'react'
import { Card, CardBody, Col, Input, Row } from 'reactstrap'
import ComTable from '../Components/DataTable/ComTable'
import { Link } from 'react-router-dom'
import { deleteReq, getReq, putReq } from '../../assets/auth/jwtService'
import { Edit, Trash } from 'react-feather'
import moment from 'moment/moment'
import toast from "react-hot-toast"
import Swal from 'sweetalert2'

const ViewInnerXircl = () => {
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
                item.name.toLowerCase().startsWith(value.toLowerCase())
    
            const includes =
                item.name.toLowerCase().includes(value.toLowerCase())
    
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

    const getData = () => {
        getReq('saveInnerXirclsDetails')
        .then((resp) => {
            console.log(resp)
            setdata(resp?.data?.data?.reverse())
            setIsLoading(false)
        })
        .then((error) => {
            console.log(error)
            setIsLoading(false)
        })
    }

    const checkState = (e, slug) => {
        const form_data = new FormData()

        form_data.append('is_active', e.target.checked)
        form_data.append('id', slug)
        putReq("saveInnerXirclsDetails", form_data)
        .then((resp) => {
            console.log(resp, "ppp")
            e.target.checked ? toast.success('Inner XIRCL Activated ') : toast.success('Inner XIRCL Deactivated ')
            getData()
        })
        .catch((error) => {
            console.log(error)
            toast.error('Something went wrong')
        })
    }

    const confirmStatus = (e, slug) => {
        console.log(e)
        let text = ""
        if (e.target.checked) {
            text = "<h4>Are you sure you want activate this Inner XIRCL</h4>"
        } else {
            text = "<h4>Are you sure you want deactivate this Inner XIRCL</h4>"
        }
        Swal.fire({
            title: text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#7367f0',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
            }).then((result) => {
            if (result.isConfirmed) {
                checkState(e, slug)
            } else {
                e.target.checked = !e.target.checked
            }
        })

    }

    const deleteInnerXircl = (slug) => {
        // const form_data = new FormData()

        // form_data.append('id', slug)
        deleteReq("saveInnerXirclsDetails", `?id=${slug}`)
        .then((resp) => {
            console.log(resp)
            toast.success('Inner XIRCL deleted')
            getData()
        })
        .catch((error) => {
            console.log(error)
            toast.error('Something went wrong')
        })
    }

    const confirmation = (slug) => {
        Swal.fire({
            title: '<h4>Are you sure you want to delete this Inner XIRCL</h4>',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#7367f0',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
            }).then((result) => {
            if (result.isConfirmed) {
                deleteInnerXircl(slug)
            }
        })
        
    }


    const columns = [
        {
            name: 'Sr. No.',
            cell: (row, index) => index + 1,
            width: '90px'
        },
        {
            name: 'Inner XIRCL Name',
            cell: (row) => {
                return <>
                    <Link to={`/merchant/preview_inner_xircl/${row.slug}`} state={{ from: "preview" }}>{row.name}</Link>
                </>
            }
        },
        {
            name: 'Start Date',
            selector: row => moment(row.group_start_date).format('YYYY-MM-DD')
        },
        {
            name: 'End Date',
            selector: row => moment(row.group_end_date).format('YYYY-MM-DD')
        },
        {
            name: 'Partner Outlets',
            cell: (row) => {
                const count = row.selected_outlet ? eval(row.selected_outlet) : []
                return count?.length
            }
        },
        {
            name: 'Offers',
            cell: (row) => {
                const count = row.selected_offer_list ? eval(row.selected_offer_list) : []
                return count?.length
            }
        },
        {
            name: 'Status',
            cell: (row) => {
               return row.is_draft ? <div className="badge badge-light-warning">Draft</div> : <>
                    <div className='form-check form-switch form-check-success cursor-pointer'>
                        <Input type='checkbox' id='verify' defaultChecked={row.is_active} onChange={(e) => confirmStatus(e, row.slug)} />
                    </div>
                </>
            }
        },
        {
            name: 'Action',
            cell: (row) => {
                return (
                    <div className='d-flex justify-content-center align-items-center gap-1'>
                        <Link to={`/merchant/xircls/inner-xircl/inner_xircl_one/${row.slug}`} style={{cursor: 'pointer'}}>
                            <Edit size={15} color='#28c76f' />
                        </Link>
                        <a onClick={() => confirmation(row.slug) } style={{cursor: 'pointer'}}>
                            <Trash size={15} color='#dc3545' />
                        </a>
                        
                    </div>
                )
            }
        }
    ]

    useEffect(() => {
        getData()
    }, [])
    
    const defferContent = <>
      <Col className='d-flex align-items-center justify-content-center' md='4' sm='12'>
        <h4 className='m-0'>My Inner XIRCLS</h4>
      </Col>
      <Col className='d-flex align-items-center justify-content-end' md='4' sm='12'>
        <Link className='btn btn-primary' to={'/merchant/xircls/inner-xircl/inner_xircl_one/'}>Create Inner XIRCL</Link>
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

export default ViewInnerXircl