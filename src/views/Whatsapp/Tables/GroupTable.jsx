/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Row, Col, Label, Input, Form, Button, Card, CardBody, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { getReq, postReq } from '../../../assets/auth/jwtService'
import FrontBaseLoader from '../../Components/Loader/Loader'
import AdvanceServerSide from '../../Components/DataTable/AdvanceServerSide'
import toast from 'react-hot-toast'
import { Eye, Trash, X } from 'react-feather'
import { Link } from 'react-router-dom'

function GroupTable() {
  const [useLoader, setLoader] = useState(false)
  const [useisLoading, setisLoading] = useState(false)
  const [useTableData, setTableData] = useState([])
  const [totalData, settotalData] = useState(0)

  const [formData, setFormData] = useState({
    group_name: "",
    group_description: ""
  })
  const [modal, setModal] = useState(false)
  const toggle = () => {
    setModal(!modal)
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }))

  }

 
  const getData = (currentPage = 0, currentEntry = 10, searchValue = "", advanceSearchValue = {}) => {
    setisLoading(true)
    const form_data = new FormData()
    Object.entries(advanceSearchValue).map(([key, value]) => value && form_data.append(key, value))

    form_data.append("page", currentPage + 1)
    form_data.append("size", currentEntry)
    form_data.append("searchValue", searchValue)
    postReq("group_base_details", form_data)
    .then((resp) => {
      console.log("resp :", resp)
      setTableData(resp.data.group_details_obj)
      settotalData(resp.data.group_count)
    }).catch((err) => {
      console.log(err)
    }).finally(() => { setLoader(false); setisLoading(false) })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData_new = new FormData()
    if (formData.group_name === "" || formData.group_description === "") {
      toast.error("All fields required")
      return false
    }
    Object.entries(formData).map(([key, value]) => {
      formData_new.append(key, value)
    })

    setLoader(true)
    postReq("add_group", formData_new)

      .then((resp) => {
        console.log(resp)
        if (resp.data.success) {
          toast.success("Group has been Created")
          setModal(false)
          getData()
        } else {
          toast.error("Something went wrong!")

        }
      }).catch((err) => {
        console.log(err)
        toast.error("Something went wrong!")
      }).finally(() => setLoader(false))
  }

  // deleted group
  const handleDelete = (group_id) => {
    const formData = new FormData()
    formData.append("group_list", [group_id])
    postReq(`group_delete`, formData)
      .then(res => {
        // console.log('res:', res)
        if (res.data.success) {
          getData()
          toast.success("Group deleted")
        } else {
          toast.error("Something went wrong")

        }
      })
      .catch(error => {
        console.error('Error:', error)
        toast.error("Something went wrong")

      })
  }
  const columns = [
    {
      name: 'Group Name',
      minWidth: '200px',
      selector: row => row.group_name, // Assuming 'name' is the property in your data for the name
      dataType: 'email',
      type: 'text',
      isEnable: true
    },
    {
      name: 'Description',
      minWidth: '15%',
      selector: row => row.group_description, // Assuming 'category' is the property in your data for the category
      type: 'select',
      isEnable: true
    },
    {
      name: 'Totals Contacts',
      minWidth: '15%',
      selector: row => row.group_contact, // Assuming 'category' is the property in your data for the category
      type: 'select',
      isEnable: true
    },
    {
      name: 'Actions',
      minWidth: '10%',
      cell: (row) => {
          return (<div className='d-flex gap-2'>
              <button className='btn ' style={{padding:"5px 10px" }} onClick={() => handleDelete(row.group_id)} ><Trash size={18}/></button>
              <Link to={`/merchant/whatsapp/${row.group_name}/${row.group_id}`} className='btn ' style={{padding:"5px 10px" }}><Eye size={18}/></Link>
          </div>
          )
      },
      isEnable: true
  }
  ]


  const customButton2 = () => {
    return <button className='btn btn-primary' onClick={toggle}>Create Group </button>
  }

  return (
    <div>
      {
        useLoader && <FrontBaseLoader />
      }

      <Card>
        <CardBody>

          <AdvanceServerSide
            tableName="Groups"
            tableCol={columns}
            data={useTableData}
            count={totalData}
            getData={getData}
            isLoading={useisLoading}
            advanceFilter={false}
            customButtonRight={customButton2}
          />

        </CardBody>
      </Card>

      <Modal size='md' isOpen={modal} toggle={toggle} >
        {
          useLoader && <FrontBaseLoader />
        }
        <div className='px-2 py-1 border-bottom d-flex justify-content-between align-items-center  '>
          <h2 className='m-0'>Create WhatsApp Group </h2>
          <X size={18} className='cursor-pointer' onClick={toggle}/>
          </div>
        <ModalBody className='m'>
         
              <h5>Group Name</h5>
              <Input type="text" name="group_name" id="name" placeholder='Young....' value={formData.group_name} onChange={handleInputChange}></Input>
             
              <h5 className='mt-2'>Group Description</h5>
              <textarea className="form-control" id="group_description" placeholder="Group contains only people wh...." name='group_description' rows="4" onChange={handleInputChange} value={formData.group_description} style={{ resize: "none" }}></textarea>
         
          <div className='d-flex justify-content-end mt-2 '>
            <button className=' btn me-2' onClick={() => setModal(false)}>Cancel</button>
            <button className=' btn btn-primary' onClick={handleSubmit}>Save</button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default GroupTable