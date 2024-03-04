/* eslint-disable no-unused-vars */
import moment from 'moment'
import React, {  useState } from 'react'
import { Copy, Edit3, Eye, Trash2 } from 'react-feather'
import { Card, CardBody } from 'reactstrap'
import AdvanceServerSide from '../../../../Components/DataTable/AdvanceServerSide'
import { postReq } from '../../../../../assets/auth/jwtService'

export default function AllTempTable() {
    const [isLoading, setIsLoading] = useState(true)
    const [tableData, settableData] = useState(null)
    const [total, settotal] = useState(0)
    function convertTimestampToDateString(timestamp) {
        // Multiply the timestamp by 1000 to convert it to milliseconds
        const milliseconds = timestamp * 1000

        // Use Moment.js to format the date
        const formattedDate = moment(milliseconds).format('MMMM D, YYYY')

        return formattedDate
    }


    const columns = [
        {
            name: 'Name',
            minWidth: '200px',
            selector: row => row.name, // Assuming 'name' is the property in your data for the name
            dataType: 'email',
            type: 'text',
            isEnable: true
        },
        {
            name: 'Category',
            minWidth: '15%',
            selector: row => row.category, // Assuming 'category' is the property in your data for the category
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
            name: 'Status',
            minWidth: '10%',
            cell: (row) => {
                return (
                    <div className='d-flex justify-content-start align-items-start flex-column'>
                        <span className='text-success'>{row.status === 'APPROVED' && "APPROVED"}</span>
                        <span className='text-danger'>{row.status === 'REJECTED' && "REJECTED"}</span>
                    </div>
                )
            },
            isEnable: true
        },
        {
            name: 'Type',
            minWidth: '200px',
            cell: (row) => {
                const letter = row?.is_new_letter
                return letter
            },
            type: 'select',
            isEnable: true
        },

        {
            name: 'Created At',
            minWidth: '200px',
            selector: row => convertTimestampToDateString(row?.quality_score.date),
            isEnable: true
        },
        {
            name: 'Action',
            minWidth: '100px',
            cell: () => (<div className='d-flex gap-1'>
                <Eye size={18} color='#9e9e9eff' />
                <Edit3 size={18} color='#006aff' />
                <Copy size={18} color='#006aff' />
                <Trash2 size={18} color='#9e9e9eff' />
            </div>),
            isEnable: true
        }
    ]


    const getData = (currentPage = 0, currentEntry = 10, searchValue = "", advanceSearchValue = {}) => {
        setIsLoading(true)

        // Create a new FormData object and append the searchValue
        const formData = new FormData()
 
        Object.entries(advanceSearchValue).map(([key, value]) => value && formData.append(key, value))
        formData.append("slug", "customer_data")
        formData.append("page", currentPage + 1)
        formData.append("size", currentEntry)
        formData.append("searchValue", searchValue)

        // fetch('https://349b-2402-e280-3d9c-20d-a5e9-6dbd-1388-ddc3.ngrok-free.app/getTemplates/', {
        //     method: 'POST',
        //     body: formData
        // })
        //     .then(response => {
        //         if (!response.ok) {
        //             throw new Error(`HTTP error! Status: ${response.status}`)
        //         }
        //         return response.json()
        //     })
        postReq("getTemplates", formData)
            .then(data => {
                // Handle the successful response here
                console.log('Response:', data)
                settableData(data.data)
                setIsLoading(false)
                settotal(data.total)
            })
            .catch(error => {
                // Handle errors here
                console.error('Error:', error)
                setIsLoading(false)
            })
    }


    return (
        <Card>
            <CardBody>

                <AdvanceServerSide
                    tableName="All Templates"
                    tableCol={columns}
                    data={tableData}
                    count={total}
                    getData={getData}
                    create={true}
                    createLink='/'
                    createText='Add Template'
                    isLoading={isLoading}
                    advanceFilter={true}

                />
            </CardBody>
        </Card>
    )
}
