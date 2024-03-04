import React, { useState } from 'react'
import { User, BarChart2, CheckCircle, Link } from 'react-feather'
import CardCom from '../Components/SuperLeadz/CardCom'
import { Card, CardBody, Col, Input } from 'reactstrap'
// import ComTableAdvance from '../Components/DataTable/ComTableAdvance'
import { getCurrentOutlet } from '../Validator'
import { SuperLeadzBaseURL } from '../../assets/auth/jwtService'
import moment from 'moment/moment'
import ComTable from '../Components/DataTable/ComTable'
import Spinner from '../Components/DataTable/Spinner'
import AdvanceServerSide from '../Components/DataTable/AdvanceServerSide'

export default function SuperLeadzLeads() {

    const [tableData, setTableData] = useState([])
    const [custVisit, setCustVisit] = useState(0)
    const [verified, setVerified] = useState(0)
    const [count, setCount] = useState(0)
    // const [searchValue, setSearchValue] = useState('')
    // const [filteredData, setFilteredData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const outletData = getCurrentOutlet()

    const getAdvanceData = (currentPage = 0, currentEntry = 10, searchValue = "", advanceSearchValue = {}) => {
        setIsLoading(true)
        const form_data = new FormData()
        const url = new URL(`${SuperLeadzBaseURL}/api/v1/get/offer/`)
        Object.entries(advanceSearchValue).map(([key, value]) => value && form_data.append(key, value))
        form_data.append("shop", outletData[0]?.web_url)
        form_data.append('app_name', "superleadz")
        form_data.append("page", currentPage + 1)
        form_data.append("size", currentEntry)
        form_data.append("searchValue", searchValue)
        fetch(url, {
            method: "POST",
            body: form_data
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data?.data?.lead_list)
            setTableData(data?.data?.lead_list)
            setCount(data?.data?.lead_list_total_count)
            setCustVisit(data?.data?.cust_visit)
            setVerified(data?.data?.verified)
            setIsLoading(false)
        })
        .catch((error) => {
            console.log(error)
            setIsLoading(false)
        })
    }

    const columns = [
        {
            name: 'Date',
            minWidth: '150px',
            selector: row => moment(row.created_at).format('MMM D, YYYY'),
            type: 'date',
            isEnable: true
        },
        {
            name: 'Time',
            minWidth: '100px',
            selector: row => moment(row.created_at).format('h:mm:ss a')
        },
        {
            name: 'Email',
            minWidth: '200px',
            selector: row => row.email,
            dataType: 'email',
            type: 'text',
            isEnable: true
        },
        {
            name: 'Visitor Type',
            minWidth: '15%',
            selector: row => row.visitor_type,
            type: 'select',
            options: [
                { label: "Select", value: "" },
                { label: "First-Time Visitor", value: "First Visitor" },
                { label: "Returning Visitor", value: "Returning Visitor" },
                { label: "Registered Users", value: "Register User" }
            ],
            isEnable: true
        },
        {
            name: 'Lead Type',
            minWidth: '200px',
            cell: (row) => {
                const letter = row?.is_new_letter ? "MQL" : "SQL"
                return letter
            },
            type: 'select',
            options: [
                { label: "Select", value: "" },
                { label: "MQL", value: 1 },
                { label: "SQL", value: 0 }
            ],
            isEnable: true
        },
        {
            name: 'Rating',
            minWidth: '200px',
            selector: row => <span style={{ marginTop: '3px' }}>{row.status === "HOT" ? "Hot" : row.status === "WARM" ? "Warm" : row.status === "COLD" ? "Cold" : ""}</span>,
            type: 'select',
            options: [
                { label: "Select", value: "" },
                { label: "Warm", value: "WARM" },
                { label: "Cold", value: "COLD" },
                { label: "Hot", value: "HOT" }
            ],
            isEnable: true
        },
        {
            name: 'Status',
            minWidth: '10%',
            cell: (row) => {
                return (
                    <div className='d-flex justify-content-start align-items-start flex-column'>
                        <span>{row.is_offer ? "Verified" : "Not Verified"}</span>
                    </div>
                )
            },
            type: 'select',
            options: [
                { label: "Select", value: "" },
                { label: "Verified", value: 1 },
                { label: "Not Verified", value: 0 }
            ],
            isEnable: true
        }
    ]


    const ExpandedData = (data) => {
        console.log(data)
        return (
            <Card>
                <CardBody>
                    {
                        data?.data?.first_name ? <h5 className='mb-1'>First Name: {data?.data?.first_name}</h5> : ''
                    }

                    {
                        data?.data?.last_name ? <h5 className='mb-1'>Last Name: {data?.data?.last_name}</h5> : ''
                    }

                    {
                        data?.data?.email ? <h5 className='mb-1'>Email: {data?.data?.email}</h5> : ''
                    }

                    {
                        data?.data?.mobile ? <h5 className='mb-1'>Phone Number: {data?.data?.mobile}</h5> : ''
                    }

                </CardBody>
            </Card>
        )

    }

    return (
        <>
            <section>
                <div className="row">
                    <div className="col-4">
                        <CardCom icon={<User size='25px' />} title="Total Visitors" data={isLoading ? <Spinner size={'25px'} /> : custVisit} />
                    </div>
                    <div className="col-4">
                        <CardCom icon={<BarChart2 size='25px' />} title="Total Leads" data={isLoading ? <Spinner size={'25px'} /> : tableData?.length} />
                    </div>
                    <div className="col-4">
                        <CardCom icon={<CheckCircle size='25px' />} title="Verified Leads" data={isLoading ? <Spinner size={'25px'} /> : verified} />
                    </div>
                </div>
            </section>
            <section>
                <div className="card">
                    <div className="card-body">

                        <AdvanceServerSide
                            tableName="Leads"
                            tableCol={columns}
                            data={tableData}
                            isLoading={isLoading}
                            count={count}
                            exportUrl={`${SuperLeadzBaseURL}/api/v1/get/offer/`}
                            advanceFilter={true}
                            isExpand={true}
                            isExport={true}
                            ExpandableTable={ExpandedData}
                            getData={getAdvanceData}
                        />
                    </div>
                </div>
            </section>
        </>
    )
}
