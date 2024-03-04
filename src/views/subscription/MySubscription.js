import { useEffect, useState } from "react"
import { X } from "react-feather"
import { Card, CardBody, Col, Input, Row } from "reactstrap"
import { getReq } from "../../assets/auth/jwtService"
import ComTable from "../Components/DataTable/ComTable"
import MomentTime from "../Components/Time-Moment/MomentTime"
import SubscriptionNav from "./components/SubscriptionNav"

const MySubcription = () => {
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
              item.plan_name.toLowerCase().startsWith(value.toLowerCase()) ||
              item.email.toLowerCase().startsWith(value.toLowerCase())
    
            const includes =
              item.plan_name.toLowerCase().includes(value.toLowerCase()) ||
              item.email.toLowerCase().includes(value.toLowerCase())
    
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
    
    useEffect(() => {

        getReq("getSubscriptionDetails", '?plan_name=Infinite')
        .then((resp) => {
            setdata(resp.data.data.subscription_detail)
            setIsLoading(false)
        })
        .catch((error) => {
            console.log(error)
            setIsLoading(false)
        })
        // console.log(rawData.data.subscription_detail)
        // setdata(rawData.data.subscription_detail)
    }, [])

    const columns = [
        {
            name: 'Sr No.',
            cell: (row, index) => index + 1,
            width: '90px'
        },
        {
            name: 'Start Date',
            minWidth: '200px',
            selector: row => <MomentTime time={row.start_date} format={'DD/MM/YYYY, hh:mm'} />
        },
        {
            name: 'End Date',
            minWidth: '200px',
            selector: row => <MomentTime time={row.end_date} format={'DD/MM/YYYY, hh:mm'} />
        },
        {
            name: 'Product',
            minWidth: '250px',
            selector: row => row.plan_name
        },
        {
            name: 'Plan',
            minWidth: '250px',
            cell: (row) => {
                return (
                  <div>{row.plan_name} ({row.count_outlet} Outlet)</div>
                )
            }
        },
        {
            name: 'Email',
            minWidth: '250px',
            selector: row => row.email
        },
        {
            name: 'Status',
            minWidth: '250px',
            cell: (row) => {
                return (
                  <div>
                    {
                        row.status === "AC" ? <div className="badge badge-light-success">Trial Period</div> : row.status === "CN" ? <div className="badge badge-light-success">Trial Period Expired</div> : row.status === "PD" ? <div className="badge badge-light-info">Pending</div> : row.status === "EX" ? <div className="badge badge-light-warning">Expired</div> : ""
                    }
                  </div>  
                )
            }
        },
        {
            name: 'Action',
            minWidth: '250px',
            cell: () => {
                return (
                    <div className='d-flex justify-content-center align-items-center gap-1'>
                        <X size={15} />
                    </div>
                )
            }
        }
      ]

      const defferContent = <>
        <Col className='d-flex align-items-center justify-content-center' md='4' sm='12'>
          <h4 className='m-0'>All Plans</h4>
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
            <Row className="match-height">
                <Col md="4">
                    <Card>
                        <CardBody>
                            <SubscriptionNav />
                        </CardBody>
                    </Card>
                </Col>
                <Col md="8">
                    <Card>
                        <CardBody>
                            <ComTable
                                content={defferContent}
                                // tableName="All Plans"
                                tableCol={columns}
                                data={data}
                                searchValue={searchValue}
                                // handleFilter={handleFilter}
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

export default MySubcription