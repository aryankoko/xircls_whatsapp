import React, { useEffect, useState } from 'react'
import { Card, CardBody, Col, Input } from 'reactstrap'
import { Link } from 'react-router-dom'
import ComTableAdvance from '../Components/DataTable/ComTableAdvance'
import ComTable from '../Components/DataTable/ComTable'
import { getCurrentOutlet } from '../Validator'
import { SuperLeadzBaseURL } from '../../assets/auth/jwtService'
import moment from 'moment/moment'

export default function SuperLeadzOffers() {

    const [searchValue, setSearchValue] = useState('')
    const [filteredData, setFilteredData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [tableData, setTableData] = useState([])
    const outletData = getCurrentOutlet()
    
    function getOffers() {
        // const form_data = new FormData()
        // form_data.append('shop', outletData[0]?.web_url)
        // form_data.append('app', "superleadz")

        fetch(`${SuperLeadzBaseURL}/utils/api/v1/superoffer/`, {
            method: "POST",
            body: JSON.stringify({
                shop: outletData[0]?.web_url,
                app: "superleadz"
            })
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
            setIsLoading(false)
            // console.log("ele", data.status)
        })
        .catch((error) => {
            console.log(error)
            setIsLoading(false)
        })
    }

    useEffect(() => {
        getOffers()
    }, [])

    // ** Function to handle filter
    const handleFilter = e => {
        const value = e.target.value
        let updatedData = []
        setSearchValue(value)

        if (value.length) {
            updatedData = tableData.filter((item) => {
                const startsWith =
                item?.Summary.toLowerCase().toString().startsWith(value.toLowerCase()) ||
                item?.Code.toLowerCase().toString().startsWith(value.toLowerCase())
      
                const includes =
                    item?.Summary.toLowerCase().toString().includes(value.toLowerCase()) ||
                    item?.Code.toLowerCase().toString().includes(value.toLowerCase())

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
            name: 'Offer',
            selector: row => row.Summary
        },
        {
            name: 'Date',
            selector: row => moment(row.created_at).format('ddd, D MMM YYYY')
            // new Date(row.created_at).toUTCString().replace("GMT", "")
        },
        {
            name: 'Offer Code',
            selector: row => row.Code,
            dataType: 'offer_code'
        },
        {
            name: 'Status',
            cell: row => {
                // const status = row.is_active ? 'Active' : 'Inactive'
                // const statusBgColor = row.is_active ? '#dcf6e8' : '#fbe3e4'
                // const statusFontColor = row.is_active ? '#34ca77' : '#ea5455'
                return (
                    <>
                        {
                            // row.is_active ? 
                            <span>
                                <div className="circle" style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#388E3C", marginRight: '4px', display: "inline-block" }}></div>
                                {row.Status === "ACTIVE" ? "Active" : "Inactive"}
                            </span>
                        }

                    </>
                )
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

    const defferContent = <>
        <Col className='d-flex align-items-center justify-content-center' md='4' sm='12'>
        <h4 className='m-0'>SuperLeadz Offers</h4>
        </Col>
        <Col className='d-flex align-items-center justify-content-end' md='4' sm='12'>

        <Link to={"/merchant/SuperLeadz/create_offers/"} className={"btn btn-primary-main"}>Create Offer</Link>

            <Input
                className='dataTable-filter form-control ms-1'
                style={{ width: `180px`, height: `2.714rem` }}
                type='text'
                bsSize='sm'
                id='search-input-1'
                placeholder='Search by offer code'
                value={searchValue}
                onChange={handleFilter}
            />
        </Col>
    </>

    return (
        <>
            {/* <Card>
                <CardBody>
                    <div className="d-flex justify-content-between align-items-center">
                        <h4>Offers</h4>
                        <Link to='/merchant/SuperLeadz/create_offers/' className='btn btn-primary'>Create Offer</Link>
                    </div>
                </CardBody>
            </Card> */}
            <section>
                <div className="card">
                    <div className="card-body">
                        <ComTable
                            tableName=""
                            content={defferContent}
                            tableCol={columns}
                            data={tableData}
                            searchValue={searchValue}
                            filteredData={filteredData}
                            isLoading={isLoading}
                            isExport={true}
                            exportUrl={`${SuperLeadzBaseURL}/utils/api/v1/superoffer/`}
                        />
                    </div>
                </div>
            </section>
        </>
    )
}