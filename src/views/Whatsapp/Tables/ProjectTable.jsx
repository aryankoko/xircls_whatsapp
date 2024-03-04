/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Card, CardBody, Col, Input, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import { getReq, postReq } from '../../../assets/auth/jwtService'
import AdvanceServerSide from '../../Components/DataTable/AdvanceServerSide'
import FrontBaseLoader from '../../Components/Loader/Loader'

export default function ProjectTable() {
    const [useLoader, setLoader] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [tableData, settableData] = useState(null)
    const [total, settotal] = useState(0)
    const [modal, setModal] = useState(false)
    const toggle = () => {
        setModal(!modal)
    }
    const getData = () => {
        setIsLoading(true)
        getReq("project_get")
            .then(response => {
                // Handle the successful response here
                console.log('Response:', response.data.project_data)
                settableData(response.data.project_data)
                settotal(response.data.total)

            })
            .catch(error => {
                // Handle errors here
                console.error('Error:', error)

            }).finally(() => setIsLoading(false))
    }
    const checkStatus = (name) => {
        const newformData = new FormData()
        newformData.append("project_name", name)
        postReq('fbVerification', newformData)
            .then((res) => {
                console.log(res)
                if (res.data.fb_status) {
                    toast.success("Active")
                } else {
                    toast.error("Inactive")

                }
                getData()
            })
            .catch((err) => {
                toast.error("Something went wrong!")
                console.log(err)
            })
    }
    const columns = [
        {
            name: 'Name',
            minWidth: '200px',
            selector: row => row.project_name, // Assuming 'name' is the property in your data for the name
            dataType: 'email',
            type: 'text',
            isEnable: true
        },
        {
            name: 'Created at',
            minWidth: '15%',
            selector: row => row.created_at, // Assuming 'category' is the property in your data for the category
            type: 'select',
            isEnable: true
        },

        {
            name: (<div className='mt-1 '>
                <>Status  </>
            </div>),
            minWidth: '10%',
            cell: (row) => {
                return (
                    <div className='d-flex justify-content-start align-items-start flex-column'>
                        <span className='text-success'>{row.is_fb_verified && "Active"}</span>
                        <span className='text-danger'>{!(row.is_fb_verified) && "Inactive"}</span>
                    </div>
                )
            },
            isEnable: true
        },
        {
            name: 'Actions',
            minWidth: '10%',
            cell: (row) => {
                return (<div className='d-flex gap-2'>
                    <button className='btn btn-secondary' style={{padding:"5px 10px" }} onClick={(e) => checkStatus(row.project_name)}>sync</button>
                </div>
                )
            },
            isEnable: true
        }
    ]

    const handleCreateProject = (e) => {
        e.preventDefault()
       const value = e.target.project_name.value
        if (value === '') {
            toast.error("Enter Project Name")
            return false
        }
        const fromData = new FormData()
        fromData.append('projectName', value)
        setLoader(true)
        postReq('projectCreation', fromData)
            .then(res => {
                if (res.data.id) {
                    toast.success("Project has created")
                    setModal(false)
                    getData()
                } else {
                    toast.error("Project name exist. Try again")
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 500) {
                    toast.error('Internal Server Error')
                } else {
                    console.log(error)
                }
            }).finally(() => setLoader(false))

    }
    const customButton2 = () => {
        return <button className='btn btn-primary' onClick={toggle}>Create Project </button>
    }

    return (
        <>
       
            <Card>
                <CardBody>

                    <AdvanceServerSide
                        tableName="Projects"
                        tableCol={columns}
                        data={tableData}
                        count={total}
                        getData={getData}
                        isLoading={isLoading}
                        advanceFilter={false}
                        customButtonRight={customButton2}

                    />
                </CardBody>
            </Card>
            <Modal size='lg' isOpen={modal} toggle={toggle} >
                {
                    useLoader && <FrontBaseLoader />
                }
                <ModalHeader toggle={toggle}>Create WhatsApp Project</ModalHeader>
                <ModalBody className=''>
                <form onSubmit={handleCreateProject}>

                    <Row className=' py-3'>
                        <Col lg={8} className='ms-2'>
                            <h5>Project Name</h5>
                            <Input type="text" name="project_name"  placeholder='Young....'  ></Input>
                        </Col>
                    </Row>
                    <div className='d-flex justify-content-end mt-2 '>
                        <button className=' btn me-2' onClick={(e) => { e.preventDefault(); setModal(false) }}>Cancel</button>
                        <button className=' btn btn-primary' type='submit'>Create</button>
                    </div>
                </form>
                </ModalBody>
            </Modal>
        </>
    )
}
