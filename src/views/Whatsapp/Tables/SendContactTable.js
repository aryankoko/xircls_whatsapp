/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Card, CardBody } from 'reactstrap'
import { postReq } from '../../../assets/auth/jwtService'
import AdvanceServerSide from '../../Components/DataTable/AdvanceServerSide'
export default function SendContactTable({ groupID }) {
  // const [useLoader, setLoader] = useState(false)
  const [tableData, settableData] = useState([])
  const [useSelectedRows, setSelectedRows] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [totalData, settotalData] = useState(0)
  const [useSelectedContacts, setSelectedContacts] = useState([])

  const getData = () => {
    const form_data = new FormData()
    form_data.append("group_contact", groupID)
    postReq(`get_group_contact`, form_data)
      .then(res => {
        console.log('res:', res.data)
        settableData(res.data.contact_grp)
        settotalData(res.data.group_count)
        setSelectedRows(() => res.data.contact_grp.map((elm) => elm.id))

      })
      .catch(error => {
        // Handle errors here
        console.error('Error:', error)
      })
  }

  const columns = [
    {
      name: 'First Name',
      minWidth: '200px',
      selector: row => row.first_name, // Assuming 'name' is the property in your data for the name
      dataType: 'email',
      type: 'text',
      isEnable: true
    },
    {
      name: 'Last Name',
      minWidth: '15%',
      selector: row => row.last_name, // Assuming 'category' is the property in your data for the category
      type: 'select',
      isEnable: true
    },
    {
      name: 'Contact',
      minWidth: '15%',
      selector: row => row.contact, // Assuming 'category' is the property in your data for the category
      type: 'select',
      isEnable: true
    }
  ]
  return (
    <Card className='mt-1 border-0 '>
      <CardBody>

        <AdvanceServerSide
          tableName={"Contacts List"}
          tableCol={columns}
          data={tableData}
          count={totalData}
          getData={getData}
          // selectableRows={true}
          // setSelectedRows={setSelectedRows}
          // selectedRows={useSelectedRows}
          isLoading={isLoading}
          advanceFilter={false}
        />
      </CardBody>
    </Card>

  )
}
