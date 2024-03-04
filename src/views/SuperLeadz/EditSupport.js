import React, { useContext, useEffect, useState } from 'react'
import { Card, CardBody, Col, Input, Row } from 'reactstrap'
import ComTable from '../Components/DataTable/ComTable'
import { useParams } from "react-router-dom"
import toast from 'react-hot-toast'
import { getReq, postReq } from '../../assets/auth/jwtService'
import FrontBaseLoader from '../Components/Loader/Loader'
import { getCurrentOutlet } from '../Validator'
import { PermissionProvider } from '../../Helper/Context'
import moment from 'moment/moment'
import Spinner from '../Components/DataTable/Spinner'

const EditSupport = () => {
    const [tableData, setTableData] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [filteredData, setFilteredData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isMessage, setIsMessage] = useState(true)
    const [message, setMessage] = useState([])
    const [text, setText] = useState("")
    const [apiLoader, setApiLoader] = useState(false)
    const { userPermission } = useContext(PermissionProvider)

    const { id } = useParams()

    const outletData = getCurrentOutlet()

    const getData = () => {
        getReq(`editSupportTicket`, `?ticket_id=${id}`)
        .then((data) => {
            setMessage(data?.data)
            setIsMessage(false)
            const element = document.getElementById("chat")
            element.scrollTop = element.scrollHeight
        })
        .catch((error) => {
            console.log(error)
            setIsMessage(false)
        })
    }

    const getCurrentTicket = () => {
        const form_data = new FormData()
        form_data.append('shop_name', outletData[0]?.web_url)
        form_data.append('app_name', userPermission?.appName)
        getReq('createSupportTicket')
        .then((data) => {
            // console.log(data, "data")
            setTableData(data?.data?.filter((curElem) => {
                return String(curElem.ticket_no) === String(id)
            }))
            setIsLoading(false)
        })
        .catch((error) => {
            console.log(error)
            setIsLoading(false)
        })
    }

    console.log(message)

    useEffect(() => {
        getData()
        getCurrentTicket()
    }, [])

    
    // ** Function to handle filter
    const handleFilter = e => {
        const value = e.target.value
        let updatedData = []
        setSearchValue(value)

        if (value.length) {
            updatedData = tableData.filter(item => {
              const startsWith =
                item?.app?.name?.toLowerCase().startsWith(value.toLowerCase()) ||
                item?.subject?.toLowerCase().startsWith(value.toLowerCase()) ||
                item?.priority?.toLowerCase().includes(value.toLowerCase())
      
              const includes =
                item?.app?.name?.toLowerCase().includes(value.toLowerCase()) ||
                item?.subject?.toLowerCase().includes(value.toLowerCase()) ||
                item?.priority?.toLowerCase().includes(value.toLowerCase())
      
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
            width: '7.5%',
            cell: (row, index) => index + 1
        },
        {
            name: 'Requested on',
            selector: row => moment(row?.created_at).format("YYYY-MM-DD, h:m a")
        },
        {
            name: 'App',
            selector: row => row?.app?.name
        },
        {
            name: 'Subject',
            selector: row => row?.subject
        },
        {
            name: 'Message',
            selector: row => row?.message
        },
        // {
        //     name: 'Issue',
        //     selector: row => row?.issue
        // },
        // {
        //     name: 'Sub Issue',
        //     selector: row => row?.sub_issue
        // },
        {
            name: 'Priority',
            selector: row => row?.priority
        }
    ]

    const sendMessage = () => {
        const form = new FormData()
        form.append("ticket_id", id)
        form.append("message", text)
        setApiLoader(true)
        postReq("editSupportTicket", form)
        .then((data) => {
            console.log(data)
            getData()
            setApiLoader(false)
            setText("")
            toast.success('Message send sucessfully')
        })
        .catch((error) => {
            console.log(error)
            setApiLoader(false)
            toast.error('Something went wrong')
        })
    }

    const defferContent = <>
        <Col className='d-flex align-items-center justify-content-center' md='4' sm='12'>
        <h4 className='m-0'>Ticket Data</h4>
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
            {
                apiLoader ? <FrontBaseLoader /> : ''
            }
            <Row>
                <Col sm='12'>
                    <Card>
                        <CardBody>
                            <ComTable
                                content={defferContent}
                                // tableName="Ticket Data"
                                tableCol={columns}
                                data={tableData}
                                searchValue={searchValue}
                                // handleFilter={handleFilter}
                                filteredData={filteredData}
                                isLoading={isLoading}
                                isBack={true}
                            />
                        </CardBody>
                    </Card>
                </Col>
                <Col sm='12' >
                    <Card>
                        <CardBody>
                            <div id='chat' style={{height: '300px', overflow: 'auto'}}>
                                {
                                    isMessage ? (
                                        <div className='d-flex justify-content-center align-items-center h-100'>
                                            <Spinner />
                                        </div>
                                    ) : message.length === 0 ? (
                                        <div className='d-flex justify-content-center align-items-center h-100'>
                                            <h5>No Messages</h5>
                                        </div>
                                    ) : message.map((curElem, i) => {
                                        let position
                                        if (!curElem.is_user) {
                                            position = "start"
                                            
                                        } else {
                                            position = "end"
                                        }
                                        return (
                                            <>
                                                <div className="col-12 my-2" style={{display: 'flex', justifyContent: position, alignItems: 'center'}} key={i}>
                                                    <div className="parent" style={{float: `${position}`, width: `45%`, position: `relative`}}>
                                                        <Card>
                                                            <CardBody style={{border: '1px solid #ccc', borderRadius: '10px'}}>
                                                                <div style={{paddingBottom: `10px`}}>
                                                                    {curElem.message}

                                                                </div>

                                                                <div style={{textAlign: 'right', fontSize: `11px`, fontFamily: 'sans-serif'}}>
                                                                    {new Date(curElem.created_on).toUTCString().replace("GMT", "")} 
                                                                </div>
                                                            </CardBody>
                                                        </Card>
                                                        
                                                    </div>
                                                </div>
                                            </>
                                            
                                        )

                                    })
                                }

                            </div>
                            <div className='message d-flex justify-content-between gap-2'>
                                <input type="text" className='form-control' value={text} onChange={(e) => setText(e.target.value)} />
                                <a className="btn btn-primary" style={{whiteSpace: 'nowrap'}} onClick={() => sendMessage()}>Send Message</a>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default EditSupport