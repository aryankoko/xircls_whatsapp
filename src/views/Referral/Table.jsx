import React, { useEffect, useState } from 'react'
import { Card, CardBody, Col, Input, Modal, ModalBody } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'
import ComTableAdvance from '../Components/DataTable/ComTableAdvance'
// import ComTable from '../Components/DataTable/ComTable'
// import moment from 'moment/moment'
import { getCurrentOutlet } from '../Validator'
import { SuperLeadzBaseURL } from '../../assets/auth/jwtService'
import ComTable from '../Components/DataTable/ComTable'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Edit, Trash, X } from 'react-feather'

export default function Table() {

    const navigate = useNavigate()

    const [searchValue, setSearchValue] = useState('')
    const [filteredData, setFilteredData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [modals, setModals] = useState({
        delete: false
    })
    const [tableData, setTableData] = useState([])
    const outletData = getCurrentOutlet()
    const [currRow, setCurrRow] = useState()

    function getOffers() {

        const url = new URL(`${SuperLeadzBaseURL}/referral/get_offers/?shop=${outletData[0]?.web_url}`)

        axios({
            method: "GET",
            url
        })
            .then((data) => {
                console.log(data.data.data)
                if (Array.isArray(data.data.data)) {
                    setTableData(data.data.data)
                    setIsLoading(false)
                } else {
                    toast.error("There was an error fetching your data")
                }
            })
            .catch(err => console.log(err))
    }

    const deleteOffer = (id) => {
        const form_data = new FormData()

        form_data.append("shop", outletData[0]?.web_url)
        form_data.append("offer_id", id)
        form_data.append("action", "DELETE")

        const url = new URL(`${SuperLeadzBaseURL}/referral/referralpoints/`)

        axios({
            method: "POST",
            url,
            data: form_data
        }).then((data) => {
            console.log(data.data.message)
            if (data.data.message === "Offer deleted successfully") {
                toast.success(data.data.message)
            } else {
                toast.error("Could not delete the offer")
            }
            getOffers()
        }).catch((error) => {
            console.error(error)
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
            updatedData = tableData.filter(item => {
                const startsWith =
                    item.offer_code.toLowerCase().startsWith(value.toLowerCase())

                if (startsWith) {
                    return startsWith
                } else return null
            })

            setFilteredData(updatedData)
            setSearchValue(value)
        }
    }

    const columns = [
        {
            name: 'Sr No.',
            cell: (row, index) => index + 1,
            width: '10%'
        },
        {
            name: 'Referrer Value',
            selector: row => row.referrer_value
        },
        {
            name: 'Referrer Type',
            selector: row => row.referrer_type
        },
        {
            name: 'Referrer Minimum',
            selector: row => row.referree_minimum
        },
        {
            name: 'Referree Value',
            selector: row => row.referree_value
        },
        {
            name: 'Referree Type',
            selector: row => row.referree_type
        },
        {
            name: 'Referree Minimum',
            selector: row => row.referrer_minimum
        },
        {
            name: 'Status',
            selector: row => {
                return row.is_active ? <span className="text-success">Active</span> : <span className="text-danger">Inactive</span>
            }
        },
        {
            name: 'Actions',
            selector: (row) => {
                return (
                    <div className="d-flex gap-2 align-items-center justify-content-center">
                        <Edit onClick={() => {
                            navigate(`/merchant/Referral/create_offer/`, { state: row.id })
                        }} className='text-success cursor-pointer' size={14} /> <Trash onClick={() => {
                            setModals({ ...modals, delete: !modals.delete })
                            setCurrRow(row)
                        }} className='text-danger cursor-pointer' size={14} />
                    </div>
                )
            }
        }
    ]

    const defferContent = <>
        <Col className='d-flex align-items-center justify-content-center' md='4' sm='12'>
            <h4 className='m-0'>Offer Details</h4>
        </Col>
        <Col className='d-flex align-items-center justify-content-end' md='4' sm='12'>

            <Link to={"/merchant/Referral/create_offer/"} className={"btn btn-outline-primary"}>Create Offer</Link>

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
                        />
                    </div>
                </div>
            </section>
            <Modal isOpen={modals.delete} toggle={() => setModals({ ...modals, delete: !modals.delete })}>
                <ModalBody>
                    <span className="position-absolute top-0 end-0" style={{ cursor: 'pointer', padding: "0.25rem" }} onClick={() => setModals({ ...modals, delete: !modals.delete })}>
                        <X size={17.5} />
                    </span>
                    Are you sure you want to delete this offer?
                    <div className="mt-2 d-flex gap-3 justify-content-end align-items-center">
                        <button className="btn btn-outline-primary" onClick={() => {
                            deleteOffer(currRow.id)
                            setModals({ ...modals, delete: !modals.delete })
                        }}>Delete</button>
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}