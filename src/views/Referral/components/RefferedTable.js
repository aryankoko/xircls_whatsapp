import React, { useEffect, useState } from 'react'
// import ComTable from '../../Components/DataTable/ComTable'
import { getCurrentOutlet } from '../../Validator'
import { SuperLeadzBaseURL } from '../../../assets/auth/jwtService'
import { Col, Input, Row } from 'reactstrap'
// import { Link } from 'react-feather'
// import moment from 'moment/moment'
// import { PermissionProvider } from '../../../Helper/Context'
// import Table from '../Table'

const RefferedTable = () => {

    // const [searchValue, setSearchValue] = useState('')
    // const [filteredData, setFilteredData] = useState([])
    // const [isLoading, setIsLoading] = useState(true)
    const [tableData, setTableData] = useState([])
    const outletData = getCurrentOutlet()

    function getOffers() {
        // const form_data = new FormData()
        // form_data.append('shop', outletData[0]?.web_url)
        // form_data.append('app', "superleadz")

        fetch(`${SuperLeadzBaseURL}/referral/top_5_referrers/?shop=${outletData[0]?.web_url}`, {
            method: "GET"
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                // data?.status?.map(ele => {
                //     console.log(ele)
                //     // console.log(JSON.parse(ele.offer_json))
                // })
                // setTableData(data)

                setTableData(data)
                // setIsLoading(false)
                // console.log("ele", data.status)
            })
            .catch((error) => {
                console.log(error)
                // setIsLoading(false)
            })
    }

    useEffect(() => {
        getOffers()
    }, [])

    // ** Function to handle filter
    // const handleFilter = e => {
    //     const value = e.target.value
    //     let updatedData = []
    //     setSearchValue(value)

    //     if (value.length) {
    //         updatedData = tableData?.top_5_referrers?.filter(item => {
    //             const startsWith =
    //                 item.offer_code.toLowerCase().startsWith(value.toLowerCase())

    //             if (startsWith) {
    //                 return startsWith
    //             } else return null
    //         })

    //         setFilteredData(updatedData)
    //         setSearchValue(value)
    //     }
    // }

    // function makeActive(id, e) {

    //     const form_data = new FormData()
    //     form_data.append('id', id)
    //     form_data.append('shop', outletData[0]?.web_url)
    //     form_data.append('app_name', "superleadz")
    //     form_data.append('status', e.target.checked)

    //     fetch(`${SuperLeadzBaseURL}/api/v1/add/offer_status/`, {
    //         method: "POST",
    //         body: form_data
    //     })
    //     .then((resp) => resp.json())
    //     .then((data) => {
    //         console.log(data)
    //         getOffers()
    //     })
    // }

    const columns = [
        {
            name: 'Sr No.',
            cell: (row, index) => index + 1,
            width: '10%'
        },
        // {
        //     name: 'Date',
        //     selector: row => moment(row.created_at).format('ddd, D MMM YYYY')
        //     // new Date(row.created_at).toUTCString().replace("GMT", "")
        // },
        {
            name: 'Email',
            cell: row => row?.customer_email
        },
        {
            name: 'Referrals',
            selector: (row, index) => {
                return tableData?.top_5_referrers_counts[index]
            }
        }

        // {
        //     name: 'Action',
        //     cell:() => { 
        //         return (
        //             <>
        //                 <div className='d-flex flex-row gap-1'>
        //                     <button type="button" class="btn btn-success btn-sm">View</button>
        //                     <button type="button" class="btn btn-primary btn-sm">Edit</button>
        //                 </div>
        //             </>
        //         )
        //     }
        // }
        // {
        //     name: 'Activate',
        //     cell: row => (
        //         <>
        //             <div className="form-check form-switch xircls_check">
        //                 <input className="form-check-input" defaultChecked={row.is_active} type="checkbox" role="switch" id={`active_offer_${row.id}`} style={{ cursor: "pointer" }} onChange={(e) => makeActive(row.id, e)} />
        //                 <label className="form-check-label" htmlFor="active_offer_"></label>
        //             </div>
        //         </>
        //     )
        // }
    ]

    // const defferContent = <>

    // </>

    return (
        <>
            {/* <Row className='justify-content-end mx-0'>
        <Col className='d-flex align-items-center justify-content-center' md='4' sm='12'>
            <h4 className='m-0'>Count</h4>
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
    </Row> */}
            <Row>
                <Col md="12">
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                {
                                    columns.map((curElem) => {
                                        return <th>{curElem.name}</th>
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>

                            {
                                tableData?.top_5_referrers?.map((curElem, index) => {
                                    return (
                                        <>
                                            <tr>
                                                <td> {index + 1}</td>
                                                <td> {curElem.customer_email}</td>
                                                <td> {tableData?.top_5_referrers_counts[index]}</td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </Col>
            </Row>
            {/*         
        <ComTable
            tableName=""
            content={defferContent}
            tableCol={columns}
            data={tableData?.top_5_referrers}
            searchValue={searchValue}
            filteredData={filteredData}
            isLoading={isLoading}
        /> */}
        </>
    )
}

export default RefferedTable