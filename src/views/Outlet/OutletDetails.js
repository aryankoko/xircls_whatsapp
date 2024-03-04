import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, CardBody, Col, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import { getReq, postReq } from '../../assets/auth/jwtService'
import { Check, Edit } from 'react-feather'
import { Link } from 'react-router-dom'
import { timelineName } from '../Validator'
import toast from 'react-hot-toast'
import { PermissionProvider } from '../../Helper/Context'
import ComTable from '../Components/DataTable/ComTable'

const OutletDetails = () => {
    const [data, setData] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [filteredData, setFilteredData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    // const [currentEntry, setCurrentEntry] = useState(10)
    const [addDomain, setAddDomain] = useState(false)
    const { setUserPermission, userPermission } = useContext(PermissionProvider)
    
    const handleFilter = e => {
        const value = e.target.value
        let updatedData = []
        setSearchValue(value)
    
        if (value.length) {
          updatedData = data.filter(item => {
            const startsWith =
              item.outlet_name.toLowerCase().startsWith(value.toLowerCase())
    
            const includes =
              item.outlet_name.toLowerCase().includes(value.toLowerCase())
    
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
        getReq('outletsDetails')
        .then((resp) => {
            console.log(resp)
            setData(resp.data.data.outlet_detail)
            setUserPermission({...userPermission, multipleDomain: resp.data.data.outlet_detail})
            setIsLoading(false)
        })
        .catch((error) => {
            setIsLoading(false)
            console.log(error)
        })
    }

    const addDomainFunc = () => {
        const form = document.getElementById('adddomian')
        const form_data = new FormData(form)
        postReq('addDomain', form_data)
        .then((resp) => {
            console.log(resp)
            toast.success(resp.data.message)
            getData()
            setAddDomain(!addDomain)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getData()
    }, [])

    const emailStatusChange = (id, e) => {
        console.log(e)
        const form_data = new FormData()
        form_data.append('OUTLET_ID', id)
        form_data.append('status', e.target.checked)
        form_data.append('action', "publish")
        postReq('changeOutletStatus', form_data)
        .then((resp) => {
            console.log(resp)
            if (e.target.checked) {
                toast.success('Oulet published')
            } else {
                toast.success('Oulet unpublished')
            }
            getData()
        })
        .catch((error) => {
            console.log(error)
            toast.error('Something went wrong')
        })
    }

    const deactivate = (id, status) => {
        console.log(id)
        const form_data = new FormData()
        form_data.append('OUTLET_ID', id)
        form_data.append('status', status)
        form_data.append('action', "active")
        postReq('changeOutletStatus', form_data)
        .then((resp) => {
            console.log(resp)
            if (status) {
                toast.success('Oulet activated')
            } else {
                toast.success('Oulet deactivated')
            }
            getData()
        })
        .catch((error) => {
            console.log(error)
            toast.error('Something went wrong')
        })
    }

    const columns = [
        {
            name: 'Sr No.',
            cell: (row, index) => {
                return (
                    <>
                        <div className='d-flex justify-content-center align-items-center gap-1'>
                            <span>{index + 1}</span>
                            {
                                row.api_key === userPermission?.apiKey ? <Check color='#28c76f' size={17} /> : ''
                            }
                        </div>
                    </>
                )
            },
            // cell: (row, index) => index + 1,
            width: '90px'
        },
        {
            name: 'Outlet Name',
            minWidth: '200px',
            selector: row => <Link to={`/merchant/outlets/xircls-outlet-details/${row.id}/`}>{row.outlet_name}</Link>
        },
        {
            name: 'API',
            minWidth: '200px',
            selector: row => <Link to={`/merchant/xircls-api-documentation/${row.slug}/`} state={`${row.api_key}`}>Generate API Key</Link>
        },
        {
            name: 'Status',
            cell: (row) => {
                return (
                    <>
                        {
                            row.is_active ? <div className="badge badge-light-success">Active (Verified)</div> : row.is_trash ? <div className="badge badge-light-warning">Pending Deletion ({row.is_active ? 'Verified' : 'Unverified'})</div> : <>
                                <div className="badge badge-light-warning">Incomplete</div>
                            </>
                        }
                    </>
                )
            }
        },
        {
            name: 'Publish',
            cell: (row) => {
                return (
                    <div className='form-check form-switch form-check-success'>
                        <Input type='checkbox' id='verify' defaultChecked={row.publish_on_network} onChange={(e) => emailStatusChange(row.id, e)} />
                    </div>
                )
                
            }
        },
        {
            name: 'Action',
            cell: (row) => {
              return (
                <div className='d-flex justify-content-start align-items-center gap-1'>
                    <Link to={`/merchant/campaign/outlet_profiling/${row.id}/`}>
                        <Edit size={16} color='#00a680' />
                    </Link>
                    {
                        row.is_active ? <a className='btn btn-sm btn-danger text-white' onClick={() => deactivate(row.id, false)} style={{whiteSpace: 'nowrap'}}>Deactivate</a> : <a className='btn btn-sm btn-success' onClick={() => deactivate(row.id, true)} style={{whiteSpace: 'nowrap'}}>Activate</a>
                    }
                    
                </div>
              )
              
            }
        }
    ]

    const defferContent = <>
        <Col className='d-flex align-items-center justify-content-center' md='4' sm='12'>
            <h4 className='m-0'>All Domains</h4>
        </Col>
        <Col className='d-flex align-items-center justify-content-end' md='4' sm='12'>
            
            <a className="btn btn-primary" onClick={() => setAddDomain(!addDomain)}>Add Domain</a>
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

    const ExpandedData = (data) => {
        console.log(data)
        const appList = data?.data?.apps
        return (
            <Card>
              <CardBody>
                    
                    {
                        Object.keys(appList).map((cur) => {
                            console.log(appList[cur])
                            return <div className='mb-2'>
                                <h5><span style={{textTransform: 'uppercase'}}>{cur}</span> - Campaign Status</h5>
                                <ul className="p-0 py-1 m-0 timeline-steps" style={{ listStyle: 'none', display: 'flex', justifyContent: 'space-around', alignItems: 'start', gap: '25px' }}>
                                    {
                                        appList[cur]?.filter((cur) => cur.isShow).map((curElem, key) => {
                                            let color
                                            if (curElem.isComplete) {
                                                color = 'success'
                                            } else {
                                                color = 'danger'
                                            }
                                            let url = ""
                                            if (curElem.key === "is_outlet_created") {
                                                url = `${data?.data?.id}/`
                                            } else {
                                                url = ''
                                            }

                                            return (
                                                <li key={key} className="position-relative timeline-step">
                                                    <span className={`position-absolute rounded-pill bg-${color}`} style={{ width: 14, height: 14, top: 0, left: '50%', transform: 'translateX(-50%)' }}></span>
                                                    <div style={{marginTop: '30px', textAlign: 'center'}}>
                                                        
                                                        <h6>{curElem.name}</h6>
                                                        {
                                                            curElem.isComplete ? '' : <Link to={`${timelineName[cur][curElem.key]}${url}`}>Complete Now</Link>
                                                        }
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }

                                </ul>
                                <hr />
                            </div> 
                            
                            
                        })
                    }
                      
                  {/* </ul> */}
  
              </CardBody>
            </Card>
        )
        
    }

    return (
        <Row>
            <Col>
                <Card>
                    <CardBody>
                        <ComTable
                            tableCol={columns}
                            data={data}
                            searchValue={searchValue}
                            handleFilter={handleFilter}
                            filteredData={filteredData}
                            isLoading={isLoading}
                            content={defferContent}
                            isExpand={true}
                            ExpandableTable={ExpandedData}
                        />
                    </CardBody>
                </Card>
                <Modal
                isOpen={addDomain}
                toggle={() => setAddDomain(!addDomain)}
                className='modal-dialog-centered'
                >
                <ModalHeader toggle={() => setAddDomain(!addDomain)}>Add Domain</ModalHeader>
                <ModalBody>
                    <form id='adddomian'>
                        <div className="row">
                            <div className="col-12 mb-1">
                                <label htmlFor="outlet_name">Outlet Name</label>
                                <input type="text" id='outlet_name' name='outlet_name' className='form-control' />
                            </div>
                            <div className="col-12 mb-1">
                                <label htmlFor="web_url">Web URL</label>
                                <input type="text" id='web_url' name='domain' className='form-control' />
                            </div>
                        </div>

                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button outline onClick={() => setAddDomain(!addDomain)}>
                    Cancel
                    </Button>
                    <Button color='primary' onClick={() => addDomainFunc()}>
                    Save
                    </Button>
                </ModalFooter>
            </Modal>
            </Col>
        </Row>
    )
}

export default OutletDetails