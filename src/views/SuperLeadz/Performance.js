import React, { useContext, useEffect, useState } from "react"
import ComTable from "../Components/DataTable/ComTable"
import CardCom from "../Components/SuperLeadz/CardCom"
import { Col, Input } from "reactstrap"
import moment from "moment/moment"
import { getCurrentOutlet } from "../Validator"
import { SuperLeadzBaseURL, baseURL } from "../../assets/auth/jwtService"
import Spinner from "../Components/DataTable/Spinner"
import { PermissionProvider } from "../../Helper/Context"

export default function SuperLeadzPerformance() {
    const { userPermission } = useContext(PermissionProvider)
    // const moment = require("moment")
    const [tableData, setTableData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchValue, setSearchValue] = useState("")
    const [filteredData, setFilteredData] = useState([])
    // const [redemption, setRedemption] = useState(0)
    // const [revenue, setRevenue] = useState(0)

    const [offerData, setOfferData] = useState({
        activeOffers: "",
        redemption: "",
        revenue: "",
        isOfferData: false
    })
    const [heatMapData, setHeatMapData] = useState([])
    const [startDate, setStartDate] = useState([moment(new Date()).subtract(7, 'd').format('YYYY-MM-DD'), moment(new Date()).format('YYYY-MM-DD')])
    // const [barGraph, setBarGraph] = useState(false)
    const outletData = getCurrentOutlet()
    console.log(setHeatMapData, heatMapData)
    // const [endDate, setEndDate] = useState("")
    console.log(setStartDate)

    console.log("adas:", startDate, moment(startDate[0]).subtract(7, 'd').format("YYYY-MM-DD"))

    const getHeatMapData = () => {
        const form_data = new FormData()
        form_data.append("app", "superleadz")
        form_data.append("shop", outletData[0]?.web_url)
        form_data.append("start_date", moment(startDate[0]).format("YYYY-MM-DD"))
        form_data.append("end_date", moment(startDate[1]).format("YYYY-MM-DD"))

        fetch(`${SuperLeadzBaseURL}/api/v1/customer_visitor_data/`, {
            method: "POST",
            body: form_data
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            const subArray = new Array()
            const refArray = new Array()
            data?.cust_hour_wise_visit?.map(ele => {
                if (!refArray.includes(ele.visit_date)) {
                    subArray.push({ date: ele.visit_date, data: [{ x: ele.hour, y: ele.cust_visit }] })
                    refArray.push(ele.visit_date)
                } else {
                    subArray[refArray.indexOf(ele.visit_date)].data.push({ x: ele.hour, y: ele.cust_visit })
                }
            })
            // setHeatMapData(subArray)
            console.log("arrays", subArray, refArray)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getHeatMapData()
    }, [startDate])

    const getTableData = () => {
        const form_data = new FormData()
        form_data.append("shop", outletData[0]?.web_url)
        form_data.append("app_name", "superleadz")

        fetch(`${SuperLeadzBaseURL}/api/get/getdisc/`, {
            method: "POST",
            body: form_data
        })
        .then((resp) => resp.json())
        .then((data) => {
            const useableData = data.data.codeDiscountNodes.nodes
            console.log(data)
            setTableData(useableData)
            setIsLoading(false)

            // let calcRed = 0
            // let calcRev = 0
            // useableData.map((ele) => {
            //     calcRed = calcRed + (ele?.codeDiscount?.asyncUsageCount ? Number(ele?.codeDiscount?.asyncUsageCount) : 0)
            //     calcRev = calcRev + (ele?.codeDiscount?.totalSales?.amount ? Number(ele?.codeDiscount?.totalSales?.amount) : 0)
            // })
            // setRedemption(calcRed)
            // setRevenue(calcRev)
        })
        .catch((error) => {
            console.log(error)
            setIsLoading(false)
        })
    }

    const getData = () => {
        const form_data = new FormData()
        form_data.append("shop", outletData[0]?.web_url)
        form_data.append("app_name", "superleadz")

        fetch(`${baseURL}/api/v1/superleadz_performance/`, {
            method: "POST",
            body: form_data
        })
        .then((data) => data.json())
        .then((resp) => {
            console.log(resp, "pppp")
            const updateData = {
                activeOffers: resp?.active_offers,
                redemption: resp?.redemptions,
                revenue: resp?.revenue,
                isOfferData: true
            }

            setOfferData((preData) => ({
                ...preData,
                ...updateData
            }))
        })
        .catch((error) => {
            console.log(error)
            const updateData = {
                activeOffers: "",
                redemption: "",
                revenue: "",
                isOfferData: true
            }

            setOfferData((preData) => ({
                ...preData,
                ...updateData
            }))
        })

    }

    useEffect(() => {
        getData()
        getTableData()
        getHeatMapData()
    }, [])

    // ** Function to handle filter
    const handleFilter = (e) => {
        const value = e.target.value
        let updatedData = []
        setSearchValue(value)

        if (value.length) {
            updatedData = tableData.filter((item) => {
                const startsWith =
                item?.codeDiscount?.title?.toString().toLowerCase().startsWith(value.toLowerCase()) ||
                item?.codeDiscount?.asyncUsageCount?.toString().toLowerCase().startsWith(value.toLowerCase())
      
                const includes =
                    item?.codeDiscount?.title?.toString().toLowerCase().includes(value.toLowerCase()) ||
                    item?.codeDiscount?.asyncUsageCount?.toString().toLowerCase().includes(value.toLowerCase())

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
    const defferContent = <>
        <Col className='d-flex align-items-center justify-content-center' md='4' sm='12'>
        <h4 className='m-0'>Offer Performance</h4>
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
    const columns = [
        {
            name: "Date",
            width: "25%",
            selector: (row) => moment(row.codeDiscount.createdAt).format('ddd, D MMM YYYY h:mm:ss')
            // new Date(row.codeDiscount.createdAt).toUTCString().replace("GMT", "")
        },
        {
            name: "Offer Code",
            width: "20%",
            selector: (row) => row.codeDiscount.title
        },
        {
            name: "Redemption",
            selector: (row) => row.codeDiscount.asyncUsageCount
        },
        // {
        //     name: "Revenue",
        //     selector: (row) => {
        //         const rev = row.codeDiscount.totalSales ? row.codeDiscount.totalSales.amount : "-"
        //         return rev !== "-" ? `Rs. ${rev}` : "-"
        //     }
        // },
        {
            name: "Status",
            selector: (row) => {
                return (
                    <>
                        {row.codeDiscount.status ? (
                            <span>
                                <div
                                    className="circle"
                                    style={{
                                        width: "12px",
                                        height: "12px",
                                        borderRadius: "50%",
                                        backgroundColor: "#388E3C",
                                        marginRight: "4px",
                                        display: "inline-block"
                                    }}></div>
                                Active
                            </span>
                        ) : (
                            <span>
                                <div
                                    className="circle"
                                    style={{
                                        width: "12px",
                                        height: "12px",
                                        borderRadius: "50%",
                                        backgroundColor: "#ea5455",
                                        marginRight: "4px",
                                        display: "inline-block"
                                    }}></div>
                                Inactive
                            </span>
                        )}
                    </>
                )
            }
        }
    ]

    return (
        <>
            <div className="row match-height">
                <div className="col-4">
                    <CardCom
                        icon={<img src="https://cdn-icons-png.flaticon.com/512/1773/1773345.png" width="25px" />}
                        title="Total Revenue"
                        data={offerData?.isOfferData ? `${userPermission?.currencySymbol}${Number(offerData?.revenue).toFixed(2)}` : <Spinner size={'25px'} />}
                        info={`Total earnings`}
                    />
                </div>
                <div className="col-4">
                    <CardCom
                        icon={<img src="https://cdn-icons-png.flaticon.com/512/2864/2864787.png" width="25px" />}
                        title="Total Redemption"
                        data={offerData?.isOfferData ? offerData?.redemption : <Spinner size={'25px'} />}
                        info={`Total leads who redeemed their discount`}
                    />
                </div>
                <div className="col-4">
                    <CardCom
                        icon={<img src="https://cdn-icons-png.flaticon.com/512/563/563491.png" width="25px" />}
                        title="Active Offers"
                        data={offerData?.isOfferData ? offerData?.activeOffers : <Spinner size={'25px'} />}
                        info={`All offers active on your dashboard`}
                    />
                </div>

                <div className="col-4 d-none">
                    <CardCom
                        icon={<img src="https://cdn-icons-png.flaticon.com/512/1773/1773345.png" width="25px" />}
                        title="Impressions"
                        data={offerData?.Impressions ? `${offerData?.Impressions}` : "0"}
                    />
                </div>
                <div className="col-4 d-none">
                    <CardCom
                        icon={<img src="https://cdn-icons-png.flaticon.com/512/2864/2864787.png" width="25px" />}
                        title="Conversions"
                        data={offerData?.Impressions ? offerData?.Impressions : "0"}
                    />
                </div>
                <div className="col-4 d-none">
                    <CardCom
                        icon={<img src="https://cdn-icons-png.flaticon.com/512/2864/2864787.png" width="25px" />}
                        title="Conversion rate"
                        data={offerData?.Impressions ? offerData?.Impressions : "0"}
                    />
                </div>

                <div className="col-4 d-none">
                    <CardCom
                        icon={<img src="https://cdn-icons-png.flaticon.com/512/1773/1773345.png" width="25px" />}
                        title="Engaged"
                        data={offerData?.Impressions ? `${offerData?.Impressions}` : "0"}
                    />
                </div>
                <div className="col-4 d-none">
                    <CardCom
                        icon={<img src="https://cdn-icons-png.flaticon.com/512/2864/2864787.png" width="25px" />}
                        title="CTR"
                        data={offerData?.Impressions ? offerData?.Impressions : "0"}
                    />
                </div>
                <div className="col-4 d-none">
                    <CardCom
                        icon={<img src="https://cdn-icons-png.flaticon.com/512/2864/2864787.png" width="25px" />}
                        title="Revenue"
                        data={offerData?.Impressions ? offerData?.Impressions : "0"}
                    />
                </div>
            </div>

            <section>
                <div className="card">
                    <div className="card-body">
                        <ComTable
                            content={defferContent}
                            tableCol={columns}
                            data={tableData}
                            searchValue={searchValue}
                            filteredData={filteredData}
                            isLoading={isLoading}
                            paginationPerPage={7}
                            isExport={true}
                            exportUrl={`${SuperLeadzBaseURL}/api/get/getdisc/`}
                        />
                    </div>
                </div>
            </section>
        </>
    )
}
