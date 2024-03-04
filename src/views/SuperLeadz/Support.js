import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, CardBody, Col, DropdownMenu, DropdownToggle, Input, Modal, ModalBody, ModalFooter, ModalHeader, UncontrolledDropdown} from 'reactstrap'
import ComTable from '../Components/DataTable/ComTable'
import { Edit, MoreVertical } from 'react-feather'
import { Link, useNavigate } from 'react-router-dom'
import { getCurrentOutlet } from '../Validator'
import { getReq } from '../../assets/auth/jwtService'
import moment from 'moment/moment'
import { PermissionProvider } from '../../Helper/Context'

const SuperLeadzSupport = () => {

    const outletData = getCurrentOutlet()
    const [tableData, setTableData] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [filteredData, setFilteredData] = useState([])
    const { userPermission } = useContext(PermissionProvider)
    const [isLoading, setIsLoading] = useState(true)

    const getData = () => {
        const form_data = new FormData()
        form_data.append('shop_name', outletData[0]?.web_url)
        form_data.append('app_name', userPermission?.appName)

        // fetch(`${crmURL}/Support/shopifyAPI/ticketList/${outletData[0]?.web_url}/`, {
        //     method: "POST",
        //     body: form_data
        // })
        getReq('createSupportTicket')
        .then((data) => {
            // console.log(data, "data")
            setTableData(data.data)
            setIsLoading(false)
        })
        .catch((error) => {
            console.log(error)
            setIsLoading(false)
        })
    }

    useEffect(() => {
        getData()
    }, [])

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

    // const createDropdownMenu = () => {
    //     return (
    //         <>
    //             <div className=" d-flex justify-content-start align-items-center" style={{marginLeft:"12px"}}>
    //                 <UncontrolledDropdown className='more-options-dropdown'>
    //                     <DropdownToggle className='btn-icon cursor-pointer' color='transparent' size='sm'>
    //                         <MoreVertical size='18' />
    //                     </DropdownToggle>
    //                     <DropdownMenu end>
                        
    //                     </DropdownMenu>
    //                 </UncontrolledDropdown>

    //             </div>
    //     </>
    //     )
    // }

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
        },
        {
            name: 'Actions',
            selector: row => <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                {/* <Link to={`/merchant/SuperLeadz/ticket/${row?.id}/`} style={{ cursor: "pointer" }}>
                    <GrDocumentText size={17} className='ml-2' style={{ color: "purple" }} />
                </Link> */}
                <Link to={`/merchant/SuperLeadz/ticket/${row?.ticket_no}/`} style={{ cursor: "pointer", marginLeft: "15px" }}>
                    <Edit size={17} />
                </Link>
                {/* {createDropdownMenu(row)} Add the dropdown menu here */}
            </div>
        }
    ]

    const navigate = useNavigate()

    const defferContent = <>
        <Col className='d-flex align-items-center justify-content-center' md='4' sm='12'>
        <h4 className='m-0'>Support Tickets</h4>
        </Col>
        <Col className='d-flex align-items-center justify-content-end' md='4' sm='12'>
            <a className="btn btn-primary-main" onClick={() => navigate("/merchant/create_support/")}>Create Support Ticket</a>
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
            {/* <Card>
                <CardBody>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h4>Support</h4>
                        <a className="btn btn-primary" onClick={() => navigate("/merchant/create_support/")}>Create Support Ticket</a>
                        
                    </div>
                </CardBody>
            </Card> */}
            <Card>
                <CardBody>
                    <ComTable
                        content={defferContent}
                        // tableName="Details"
                        tableCol={columns}
                        data={tableData}
                        searchValue={searchValue}
                        // handleFilter={handleFilter}
                        filteredData={filteredData}
                        isLoading={isLoading}
                    />
                </CardBody>
            </Card>
        </>
    )
}

export default SuperLeadzSupport