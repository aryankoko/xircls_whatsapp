import React, { useContext, useState } from "react"
// import ComTable from "../Components/DataTable/ComTable"
import { Button, Col, Input, Modal, ModalBody, ModalFooter, Row } from "reactstrap"
// import ServerSideTable from "../Components/DataTable/ServerSide"
import { SuperLeadzBaseURL } from "../../assets/auth/jwtService"
import { getCurrentOutlet } from "../Validator"
import { PermissionProvider } from "../../Helper/Context"
import moment from "moment/moment"
import { Share, Sliders, X } from "react-feather"
// import Flatpickr from 'react-flatpickr'
// import FrontBaseLoader from "../Components/Loader/Loader"
import AdvanceServerSide from "../Components/DataTable/AdvanceServerSide"

const Table = () => {
  const [tableData, setTableData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  // const [searchValue, setSearchValue] = useState("")
  // const [currentPage, setCurrentPage] = useState(0)
  // const [currentEntry, setCurrentEntry] = useState(10)
  // const [count, setCount] = useState(10)
  const [selected, setSelected] = useState([])
  const { userPermission } = useContext(PermissionProvider)
  const outletData = getCurrentOutlet()
  const [confirmationModal, setConfirmationModal] = useState(false)
  const [isModal, setIsModal] = useState(false)
  // const [isDownLoad, setIsDownLoad] = useState(false)
  // const [isadvance, setIsAdvance] = useState(false)


  const confirmationContent = <button onClick={() => {
    setConfirmationModal(!confirmationModal)
    setIsModal(!isModal)
  }} className="btn btn-success text-white" style={{ whiteSpace: "no-wrap" }}>Send Email</button> 

  const getData = (currentPage = 0, currentEntry = 10, searchValue = "", advanceSearchValue = {}) => {
    // console.log(advanceSearchValue)
    setIsLoading(true)
    const form_data = new FormData()
    const url = new URL(`${SuperLeadzBaseURL}/flash_accounts/all_customers/`)
    Object.entries(advanceSearchValue).map(([key, value]) => value && form_data.append(key, value))
    form_data.append("shop", outletData[0]?.web_url)
    form_data.append("app", userPermission?.appName)
    form_data.append("page", currentPage + 1)
    form_data.append("size", currentEntry)
    form_data.append("searchValue", searchValue)
    fetch(url, {
      method: "POST",
      body: form_data
    })
    .then((data) => data.json())
    .then((resp) => {
      console.log("hh", resp)
      setTableData(resp)
      // setCount(resp?.count)
      setIsLoading(false)
    })
    .catch((error) => {
      console.log(error)
      setIsLoading(false)
    })
  }

  const columns = [
    {
      name: 'First Name',
      minWidth: '190px',
      selector: row => `${row?.customer_first_name}`,
      type: 'text',
      isEnable: true
    },
    {
      name: 'Last Name',
      minWidth: '190px',
      selector: row => `${row?.customer_last_name}`,
      type: 'text',
      isEnable: true
    },
    {
      name: 'Email',
      minWidth: '300px',
      selector: row => row?.customer_email,
      type: 'text',
      isEnable: true
    },
    {
      name: 'Sign-up Date',
      minWidth: '150px',
      selector: row => moment(row?.customer_created_at).format("YYYY-MM-DD"),
      type: 'date',
      isEnable: true
    },
    {
      name: ('Purchase Count'),
      minWidth: '30px',
      selector: row => row?.purchase_count,
      type: 'text',
      isEnable: true
    },
    {
      name: 'Sign up Status',
      minWidth: '180px',
      cell: (row) => {
        return row?.is_guest === false ? (
          <span>Completed</span>
        ) : (
          <span>Not Completed</span>
        )
      },
      type: 'select',
      options: [
        {label: "Select", value: ""},
        {label: "Completed", value: 0},
        {label: "Not Completed", value: 1}
      ],
      isEnable: true
    },
    {
      name: 'Opt-In',
      minWidth: '100px',
      cell: (row) => {
        const list = []
        if (row?.is_email) {
          list.push("Email")
        }
        if (row?.is_sms) {
          list.push("SMS")
        }

        return row?.is_guest === false ? <>
          {
            list?.map((cur, key) => {
              return (key + 1) === list.length ? cur : `${cur}, `
            })
          }
        </> : "--"
      },
      type: 'select',
      options: [
        {label: "Select", value: ""},
        {label: "Email", value: "email"},
        {label: "SMS", value: "sms"},
        {label: "Both", value: "both"}
      ],
      isEnable: true
    },
    {
      name: 'Action',
      minWidth: '30px',
      selector: row => row?.purchase_count,
      type: 'text',
      isEnable: true
    }
  ]

  // const defferContent = <>
  //   <Col className='d-flex align-items-center justify-content-center' md='4' sm='12'>
  //     <h4 className='m-0'>All Customers</h4>
  //   </Col>
  //   <Col className='d-flex align-items-center justify-content-end gap-1' md='4' sm='12'>
  //     <Input
  //       className='dataTable-filter form-control ms-1'
  //       style={{ width: `180px`, height: `2.714rem` }}
  //       type='text'
  //       bsSize='sm'
  //       id='search-input-1'
  //       placeholder='Search...'
  //       value={searchValue}
  //       onChange={(e) => setSearchValue(e.target.value)}
  //     />
  //     <span className="cursor-pointer" onClick={() => setIsAdvance(!isadvance)}>
  //       <Sliders size={'20px'} />
  //     </span>
  //   </Col>
  // </>
  console.log(selected)

  // const setSelectedId = (state) => {
  //   console.log(state)
  //   setSelected(state.customer_id)
  // }

  return (
    <>
      <section>
        <div className="card">
          <div className="card-body">
            {/* <ComTable
              tableName="Registered Customers"
              tableCol={columns}
              data={filteredData.length ? filteredData : tableData}
              searchValue={searchValue}
              handleFilter={handleFilter}
              paginationPerPage={2}
              isLoading={isLoading}
            /> */}
            <AdvanceServerSide
              tableName="All Customers"
              tableCol={columns}
              data={tableData?.customers_obj}
              isLoading={isLoading}
              getData={getData}
              count={tableData?.recordsTotal}
              selectableRows={true}
              setSelectedRows={setSelected}
              selectedRows={selected}
              selectedContent={confirmationContent}
              isExport={true}
              exportUrl={`${SuperLeadzBaseURL}/flash_accounts/all_customers/`}
              advanceFilter={true}
            />
          </div>
        </div>
        <Modal className='modal-dialog-centered' isOpen={isModal}>
          <div class="modal-header d-flex justify-content-between align-items-center">
            <h5 class="modal-title m-0">Are you sure you want to send the mail?</h5>
            <a onClick={() => setIsModal(!isModal)}>
              <X size={'20px'} />
            </a>
          </div>
          <ModalBody>
          </ModalBody>
          <ModalFooter>
            <Button outline onClick={() => setIsModal(!isModal)}>
              Cancel
            </Button>
            <Button color='primary'>
              Send
            </Button>
          </ModalFooter>
        </Modal>
      </section>
    </>
  )
}

export default Table