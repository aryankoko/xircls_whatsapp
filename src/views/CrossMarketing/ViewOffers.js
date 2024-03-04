import React, { useEffect, useState } from 'react'
import { Card, CardBody, Row, Col, Input } from 'reactstrap'
import ComTable from '../Components/DataTable/ComTable'
import { Link, useNavigate } from 'react-router-dom'
import MomentTime from '../Components/Time-Moment/MomentTime'
import { Edit, FileText } from 'react-feather'
import { getReq, postReq } from '../../assets/auth/jwtService'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'

const ViewOffers = () => {

    const [data, setdata] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [filteredData, setFilteredData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
    // console.log(setdata, setIsLoading)

    const handleFilter = e => {
        const value = e.target.value
        let updatedData = []
        setSearchValue(value)
    
        if (value.length) {
          updatedData = data.filter(item => {
            const startsWith =
                item.offer_name.toLowerCase().startsWith(value.toLowerCase()) ||
                item.seller_ref_code.toLowerCase().startsWith(value.toLowerCase())
    
            const includes =
                item.offer_name.toLowerCase().includes(value.toLowerCase()) ||
                item.seller_ref_code.toLowerCase().includes(value.toLowerCase())
    
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

    const getViewOffer = () => {
        getReq('saveOffersInfiniti')
        .then((resp) => {
            console.log(resp)
            setdata(resp?.data?.data?.outlet_detail)
            setIsLoading(false)
        })
        .catch((error) => {
            console.log(error)
            setIsLoading(false)
        })
    }

    const makeVerify = (e, id) => {
        const is_active = document.getElementById(`active_${id}`).checked
        console.log(is_active)
        if (is_active) {
            console.log("Good")
            toast.error('Please deactivate your offer')
            document.getElementById(`verify_${id}`).checked = true
        } else {
            const form_data = new FormData()

            form_data.append('offer_id', id)
            form_data.append('status', e.target.checked)
            form_data.append('action', 'verify')

            postReq('makeVerify', form_data)
            .then((resp) => {
                console.log(resp)
                if (e.target.checked) {
                    toast.success('Offer Verified')
                } else {
                    toast.success('Offer Unverified')
                }
                getViewOffer()
            })
            .catch((error) => {
                console.log(error)
                document.getElementById(`verify_${id}`).checked = false
                toast.error('Something went wrong')
            })
        }
    }

    const makeActive = (e, id) => {
        const form_data = new FormData()

        form_data.append('offer_id', id)
        form_data.append('status', e.target.checked)
        form_data.append('action', 'active')

        postReq('makeVerify', form_data)
        .then((resp) => {
            console.log(resp)
            if (e.target.checked) {
                toast.success('Offer Activated')
            } else {
                toast.success('Offer deactivated')
            }
            getViewOffer()
        })
        .catch((error) => {
            console.log(error)
            document.getElementById(`active_${id}`).checked = false
            toast.error('Something went wrong')
        })
    }

    const syncOffer = (row) => {
        const is_active = document.getElementById(`active_${row.id}`).checked

        if (is_active) {
            const form_data = new FormData()
            form_data.append('IS_SYNC', '1')
            form_data.append('offer_id', row.id)
            postReq('saveOffersInfiniti', form_data)
            .then((resp) => {
                console.log(resp)
                toast.success('Offer syned')
                getViewOffer()
            })
            .catch((error) => {
                console.log(error)
                toast.error('Something went wrong')
            })
        } else {
            toast.error('Please active your offer')
        }
    }

    const confirmation = (e, id) => {

        const is_verify = document.getElementById(`verify_${id}`).checked

        console.log(is_verify)
        if (is_verify) {
            console.log("Good")
            if (e.target.checked) {
                makeActive(e, id)
            } else {
                // document.getElementById(`active_${id}`).checked = false
                Swal.fire({
                    title: '<h4>Are you sure you want deactivate this offer</h4>',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#7367f0',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes'
                    }).then((result) => {
                    if (result.isConfirmed) {
                        makeActive(e, id)
                    } else {
                        document.getElementById(`active_${id}`).checked = true
                    }
                })
            }
            
        } else {
            document.getElementById(`active_${id}`).checked = false
            toast.error('Please verify your offer')
        }
    }

    const columns = [
        {
            name: 'Sr. No.',
            cell: (row, index) => index + 1,
            width: '90px'
        },
        {
            name: 'Created On',
            selector: row => <MomentTime time={row.created_at} format={'DD/MM/YYYY, hh:mm'} /> 
        },
        {
          name: 'Offer Title ',
          minWidth: '200px',
          selector: row => row.offer_name
        },
        {
          name: 'Merchant Ref Code',
          minWidth: '200px',
          selector: row => row.seller_ref_code
        },
        {
          name: 'Verified',
          minWidth: '100px',
          cell: (row) => {
            return (
                <>
                {
                    row.is_verified ? <>
                        <span>
                            <input className="form-check-input cursor-pointer d-none" id={`verify_${row.id}`} type="checkbox" defaultChecked={row.is_verified} onClick={(e) => makeVerify(e, row.id)} role="switch" />
                            <div className="circle" style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#388E3C", marginRight: '4px', display: "inline-block" }}></div>
                            Verified
                        </span>
                    </> : <div className="form-check-success form-switch">
                        <input className="form-check-input cursor-pointer" id={`verify_${row.id}`} type="checkbox" defaultChecked={row.is_verified} onClick={(e) => makeVerify(e, row.id)} role="switch" />
                    </div>
                }
                    
                </>
            )
          }
        },
        {
          name: 'Active',
          minWidth: '100px',
          cell: (row) => {
            return (
                <>
                    <div className="form-check-success form-switch">
                        <input className="form-check-input cursor-pointer" id={`active_${row.id}`} type="checkbox" defaultChecked={row.is_active} onClick={(e) => confirmation(e, row.id)} role="switch" />
                    </div>
                </>
            )
          }
        },
        {
          name: 'Sync',
          minWidth: '100px',
          cell: (row) => {
            let button
            if (row.is_sync) {
                button = <span style={{backgroundColor: "RGBA(25,135,84,var(--bs-bg-opacity,1)) !important"}} className="badge badge-light-success" > Synced </span>
            } else {
                button = <a className='btn btn-sm btn-primary' onClick={() => syncOffer(row)}>Sync</a>
            }
            return button
          }
        },
        {
            name: 'Action',
            minWidth: '100px',
            cell: (row) => {
                return (
                    <div className='d-flex justify-content-center align-items-center gap-1'>
                        <a onClick={() => navigate(`/merchant/create_offers/${row.id}/`)} title={row.id}>
                            <Edit size={15} color='#28c76f' />
                        </a>
                    </div>
                )
            }
        }
    ]


    useEffect(() => {
        getViewOffer()
    }, [])

    const defferContent = <>
        <Col className='d-flex align-items-center justify-content-center' md='4' sm='12'>
            <h4 className='m-0'>Offers</h4>
        </Col>
        <Col className='d-flex align-items-center justify-content-end' md='4' sm='12'>
            <Link to="/merchant/create_offers/" className='btn btn-primary'>Create Offer</Link>
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
            <Col md="12">
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

export default ViewOffers

