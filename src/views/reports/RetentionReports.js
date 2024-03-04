import React, { useEffect, useState } from 'react'
import { Col, Row, Input, CardBody, Card } from 'reactstrap'
import ServerSideTable from '../Components/DataTable/ServerSide'
import { getReq } from '../../assets/auth/jwtService'
import moment from 'moment/moment'
import { pageNo } from '../Validator'

const RetentionReports = () => {

    const [data, setData] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(0)
    const [currentEntry, setCurrentEntry] = useState(10)
    const [count, setCount] = useState(10)
    const [usageData, setUsageData] = useState({
        customer_list: []
    })

    const defferContent = <>
        <Row className='justify-content-end mx-0'>
            <Col className='d-flex align-items-center justify-content-start' md='4' sm='12'>
            <div className='d-flex justify-content-start align-items-center gap-2'>
                <label>
                Show
                </label>
                <select className='form-control' value={currentEntry}  onChange={(e) => {
                setCurrentEntry(Number(e.target.value))
                }} style={{ appearance: 'auto' }}>
                {pageNo.map(page => <option value={page.value}>{page.label}</option>)}
                </select>

            </div>
            </Col>
            <Col className='d-flex align-items-center justify-content-center' md='4' sm='12'>
                <h4 className='m-0'>Retention Reports</h4>
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
                onChange={(e) => setSearchValue(e.target.value)}
                />
            </Col>
        </Row>
    </>

    const columns = [
        {
            name: 'Sr. No.',
            cell: (row, index) => index + 1,
            width: '90px'
        },
        {
            name: 'Date',
            selector: row => moment(row.created_at).format("YYYY-MM-DD"),
            width: '150px'
        },
        {
            name: 'Time',
            selector: row => moment(row.created_at).format("HH:mm"),
            width: '100px'
        },
        {
            name: 'Issued By',
            selector: row => row.issued_by
        },
        {
            name: 'Customer Name',
            cell: (row) => {
                return usageData.customer_list.includes(Number(row.user_id)) ? `${row.first_name} ${row.last_name}` : "xxxx"
            }
        },
        {
            name: 'Customer Email',
            cell: (row) => {
                return usageData.customer_list.includes(Number(row.user_id)) ? row.email : "xxxx"
            }
        }
    ]

    const getData = () => {
        setIsLoading(true)
        getReq('RetentionReports', `?page=${currentPage + 1}&size=${currentEntry}&searchValue=${searchValue}`)
        .then((resp) => {
            console.log(resp)
            setData(resp?.data?.data)
            setCount(resp?.data?.count)
            setUsageData({...usageData, customer_list: resp?.data?.customers_list})
            setIsLoading(false)
        })
        .catch((error) => {
            console.log(error)
            setIsLoading(false)
        })
    }

    useEffect(() => {
        if (searchValue) {
            const delay = 1000
            const request = setTimeout(() => {
                getData()
            }, delay)
    
            return () => {
                clearTimeout(request)
            }
        }
    }, [searchValue])

    useEffect(() => {
        getData()
    }, [currentPage, currentEntry])

    return (
        <>
            <Row>
                <Col md="12">
                    <Card>
                        <CardBody>
                            <ServerSideTable
                                content={defferContent}
                                tableCol={columns}
                                data={data}
                                isLoading={isLoading}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                currentEntry={currentEntry}
                                count={count}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default RetentionReports