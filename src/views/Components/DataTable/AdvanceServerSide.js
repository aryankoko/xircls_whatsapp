// ** React Imports
import { Fragment, useCallback, useContext, useEffect, useState } from 'react'
// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ArrowLeft, ChevronDown, File, FileText, Grid, Share, Sliders, Table, X } from 'react-feather'
import { useTranslation } from 'react-i18next'
import DataTable from 'react-data-table-component'

// ** Reactstrap Imports
import { Card, Input, Row, Col, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledButtonDropdown, Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap'
import Spinner from './Spinner'
import FrontBaseLoader from '../Loader/Loader'
import { getCurrentOutlet, pageNo } from '../../Validator'
import Flatpickr from 'react-flatpickr'
import { PermissionProvider } from '../../../Helper/Context'
import AdvanceOptions from '../../../Helper/AdvanceOptions'
import { Link } from 'react-router-dom'
// import { Link } from 'react-router-dom'
// import { pageNo } from '../../Validator'

const AdvanceServerSide = ({ tableName, tableCol, data, isLoading, count, isExpand, ExpandableTable, custom, isStyling, selectableRows = false, selectedRows, setSelectedRows, getData, exportUrl, viewAll, isExport, selectedContent, advanceFilter, viewType = "table", setViewType, viewContent, deleteContent, create, createLink, createText, customButtonLeft, customButtonRight }) => {
  // ** State
  const [currentPage, setCurrentPage] = useState(0)
  const [currentEntry, setCurrentEntry] = useState(custom ? 5 : 10)
  const [exportData, setExportData] = useState({
    fileType: "csv",
    range: "ALL",
    selectedData: []
  })
  const [searchValue, setSearchValue] = useState("")
  const [apiLoader, setApiLoader] = useState(false)
  const outletData = getCurrentOutlet()
  const { userPermission } = useContext(PermissionProvider)
  const [isadvance, setIsAdvance] = useState(false)
  const [advanceSearchValue, setAdvanceSearchValue] = useState({})
  // const [advanceValue, setAdvanceValue] = useState({})
  const [isDownLoad, setIsDownLoad] = useState(false)
  const [pageNumber, setPageNumber] = useState(currentPage + 1)
  // const [displayedPageNumber, setDisplayedPageNumber] = useState(pageNumber)

  const fileOptions = [
    {
      value: "csv",
      label: "CSV"
    },
    {
      value: "pdf",
      label: "PDF"
    },
    {
      value: "xlsx",
      label: "Excel"
    }
  ]
  // ** Hooks
  const { t } = useTranslation()

  // ** Function to handle pagination
  const handlePagination = page => {
    setCurrentPage(page.selected)
  }

  // ** Pagination Previous Component
  const Previous = () => {
    return (
      <Fragment>
        <span className='align-middle d-none d-md-inline-block'>{t('Prev')}</span>
      </Fragment>
    )
  }

  // ** Pagination Next Component
  const Next = () => {
    return (
      <Fragment>
        <span className='align-middle d-none d-md-inline-block'>{t('Next')}</span>
      </Fragment>
    )
  }

  useEffect(() => {
    if (searchValue) {
      const delay = 1000
      const request = setTimeout(() => {
        getData(currentPage, currentEntry, searchValue, advanceSearchValue)
      }, delay)

      return () => {
        clearTimeout(request)
      }
    }
  }, [searchValue])


  //------------------------
  useEffect(() => {
    getData(currentPage, currentEntry, searchValue, advanceSearchValue)
  }, [currentPage, currentEntry])

  // useEffect(() => {
  //   getData({currentPage, currentEntry, advanceSearchValue, searchValue})
  // }, [])

  const downloadCsv = () => {
    setApiLoader(true)
    setIsDownLoad(false)

    const form_data = new FormData()
    form_data.append('shop', outletData[0]?.web_url)
    form_data.append('app_name', userPermission?.appName)
    form_data.append('export', 1)
    form_data.append('file_type', exportData.fileType)
    form_data.append('page_size', exportData.range)
    form_data.append('table_data', JSON.stringify(data))
    if (exportData.selectedData[0] && exportData.selectedData[1]) {
      form_data.append('start_date', moment(exportData.selectedData[0]).format('YYYY-MM-DD'))
      form_data.append('end_date', moment(exportData.selectedData[1]).format('YYYY-MM-DD'))
    }

    fetch(exportUrl, {
      method: "POST",
      body: form_data
    })
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]))
        const a = document.createElement('a')
        a.href = url
        a.download = `export_file.${exportData.fileType}`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
        setApiLoader(false)
      })
      .catch((error) => {
        console.log(error)
        setApiLoader(false)
      })

  }

  // ** Custom Pagination Component
  const CustomPagination = () => {
    return (
      <div className="d-flex w-100 align-items-center justify-content-between">
        <span>Showing {currentPage + 1} to {currentEntry} of {count} entries</span>
        <div className="d-none gap-1 align-items-center">
            <input type="number" className='form-control' value={pageNumber}
              onChange={(e) => {
                setPageNumber(e.target.value)
                // setDisplayedPageNumber(inputValue)
              }}
            />
            <Button className='btn' onClick={() => setCurrentPage(pageNumber + 1)}>Go</Button>
            <ReactPaginate
              previousLabel={<Previous size={15} />}
              nextLabel={<Next size={15} />}
              forcePage={currentPage}
              onPageChange={page => handlePagination(page)}
              pageCount={Math.ceil(count / currentEntry) || 1}
              breakLabel={'...'}
              pageRangeDisplayed={2}
              marginPagesDisplayed={2}
              activeClassName={'active'}
              pageClassName={'page-item'}
              nextLinkClassName={'page-link'}
              nextClassName={'page-item next'}
              previousClassName={'page-item prev'}
              previousLinkClassName={'page-link'}
              pageLinkClassName={'page-link'}
              breakClassName='page-item'
              breakLinkClassName='page-link'
              containerClassName={'pagination react-paginate pagination-sm justify-content-end pe-1 mt-1'}
            />
        </div>
        <ReactPaginate
          previousLabel={<Previous size={15} />}
          nextLabel={<Next size={15} />}
          forcePage={currentPage}
          onPageChange={page => handlePagination(page)}
          pageCount={Math.ceil(count / currentEntry) || 1}
          breakLabel={'...'}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          activeClassName={'active'}
          pageClassName={'page-item'}
          nextLinkClassName={'page-link'}
          nextClassName={'page-item next'}
          previousClassName={'page-item prev'}
          previousLinkClassName={'page-link'}
          pageLinkClassName={'page-link'}
          breakClassName='page-item'
          breakLinkClassName='page-link'
          containerClassName={'pagination react-paginate pagination-sm justify-content-end pe-1 mt-1'}
        />
      </div>
    )
  }

  const customStyles = {
    headCells: {
      style: {
        color: "#6e6b7b",
        fontSize: "14px",
        fontWeight: "600",
        borderTop: `1px solid #ebe9f1`,
        borderRight: `1px solid #ebe9f1`,
        borderLeft: `1px solid #ebe9f1`
      }
    },
    cells: {
      style: {
        fontSize: "14px",
        border: `1px solid #ebe9f1`,
        color: "#464646",
        borderTop: `none`
      }
    }
  }

  const handleRowSelected = useCallback(state => {
    setSelectedRows(state.selectedRows.map((curElem) => curElem))
  }, [])

  const handleAdvanceSearch = (e) => {
    setAdvanceSearchValue({ ...advanceSearchValue, [e.target.name]: e.target.value })
    // setAdvanceValue({ ...advanceValue, [e.target.name]: e.target.value })

    // console.log("ff", advanceSearchValue)
  }

  // console.log(advanceSearchValue, "advanceSearchValue")
  return (
    <>
      {
        apiLoader ? <FrontBaseLoader /> : ''
      }
      <style>
        {`
          .datatableView {
            padding: 5px 13px;
            cursor: pointer
          }

          .datatableView.active {
            background: #464646;
            color: #fff
          }
        `}
      </style>
      <Row className='justify-content-end mx-0'>
        <Col className='d-flex align-items-center justify-content-start gap-1' md='4' sm='12'>
          <div className='d-flex justify-content-start align-items-center gap-2'>
            <label>
              Show
            </label>
            <select className='form-control' disabled={custom} value={currentEntry} onChange={(e) => {
              setCurrentEntry(Number(e.target.value))
            }} style={{ appearance: 'auto' }}>
              {
                custom ? <option value={5}>5</option> : pageNo.map(page => <option value={page.value}>{page.label}</option>)
              }
            </select>

          </div>

          {
            viewContent ? <>
              <div className="d-flex justify-content-end">
                <div className="d-flex align-items-center" style={{border: '1px solid #ccc'}}>
                    <div className={`datatableView ${viewType === "table" ? "active" : ""}`} onClick={() => setViewType("table")}>
                        <Table size={22} />
                    </div>
                    <div className={`datatableView ${viewType === "grid" ? "active" : ""}`} onClick={() => setViewType("grid")}>
                        <Grid size={22} />
                    </div>

                </div>
              </div>
            </> : ''
          }
          {
            deleteContent && selectedRows.length > 0 ? <>
                {deleteContent}
            </> : ''
          }
          {
            isExport && data?.length > 0 ? (
              <a onClick={() => setIsDownLoad(true)}>
                <Share size={'20px'} />
              </a>
            ) : ''
          }
          {
            viewAll ? <>
              <Link className='btn btn-primary-main' to={viewAll}>View All</Link>
            </> : ''
          }

          {
            selectedContent && selectedRows?.length > 0 ? <>
              {selectedContent}
            </> : ''
          }
 {
            customButtonLeft && <>
              {customButtonLeft()}
            </>
          }
        </Col>
        <Col className='d-flex align-items-center justify-content-center' md='4' sm='12'>
          <h4 className='m-0'>{tableName}</h4>
        </Col>
        <Col className='d-flex align-items-center justify-content-end' style={{gap: '15px'}} md='4' sm='12'>
          {
            create ? <>
              <Link className='btn btn-primary-main' to={createLink}>{createText}</Link>
            </> : ''
          }
          {
            customButtonRight && <>
              {customButtonRight()}
            </>
          }
          <Input
            className='dataTable-filter form-control'
            style={{ width: `180px`, height: `2.714rem` }}
            type='text'
            bsSize='sm'
            id='search-input-1'
            placeholder='Search...'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {
            advanceFilter ? (
              <>
                <span className="cursor-pointer" onClick={() => {
                  setIsAdvance(!isadvance)
                }}>
                  <Sliders size={'20px'} />
                </span>
              </>
            ) : ''
          }

        </Col>
      </Row>
      {
        isadvance ? (
          <>
            <Row className='mt-1'>
              <AdvanceOptions dataToSearch={tableCol.filter((curElem) => curElem?.isEnable)} advanceSearchValue={advanceSearchValue} updateData={handleAdvanceSearch} />
            </Row>
            <Row>
              <Col md="12">
                <div className='d-flex justify-content-end align-items-center'>
                  <a className='btn btn-primary-main me-1' onClick={() => {

                    const advanceObject = Object.fromEntries(
                      Object.entries(advanceSearchValue).map(([key]) => [key, ""])
                    )
                    setAdvanceSearchValue(advanceObject)
                    getData(currentPage, currentEntry, searchValue)
                  }}>
                    Clear Filter
                  </a>
                  <a className='btn btn-primary-main' onClick={() => getData(currentPage, currentEntry, searchValue, advanceSearchValue)}>
                    Search
                  </a>
                </div>
              </Col>
            </Row>
          </>
        ) : ''
      }

      <div className='react-dataTable' style={{ marginTop: '20px' }}>
        {viewType === "table" ? <DataTable
          key={currentEntry}
          pagination
          customStyles={!isStyling ? customStyles : {}}
          columns={tableCol}
          className='react-dataTable'
          paginationPerPage={currentEntry ? currentEntry : 7}
          sortIcon={<ChevronDown size={10} />}
          paginationDefaultPage={currentPage + 1}
          paginationComponent={CustomPagination}
          data={Array.isArray(data) ? data : []}
          progressPending={isLoading}
          progressComponent={<Spinner size="40px" />}
          selectableRows={selectableRows}
          onSelectedRowsChange={handleRowSelected}
          expandableRows={isExpand}
          expandOnRowClicked={isExpand}
          expandableRowsComponent={ExpandableTable}
        /> : <>
          {viewContent}
          {(Array.isArray(data) && data.length > 0) && <CustomPagination />}
        </>}

      </div>

      <Modal className='modal-dialog-centered' isOpen={isDownLoad} toggle={() => setIsDownLoad(!isDownLoad)}>
        <div class="modal-header d-flex justify-content-between align-items-center">
          <h5 class="modal-title m-0">Select Options</h5>
          <a onClick={() => setIsDownLoad(!isDownLoad)}>
            <X size={'20px'} />
          </a>
        </div>
        <ModalBody>
          <form id='adddomian'>
            <div className="row">
              <div className="col-12 mb-1">
                <label htmlFor="number_of_rows">File</label>
                <select name='number_of_rows' className='form-control' onChange={(e) => setExportData({ ...exportData, fileType: e.target.value })}>
                  {
                    fileOptions.map((curElem) => {
                      return <option value={curElem.value} selected={curElem.value === exportData.fileType}>{curElem.label}</option>
                    })
                  }
                </select>
              </div>
              <div className="col-12 mb-1">
                <label htmlFor="number_of_rows">Number of Rows</label>
                <select name='number_of_rows' className='form-control' onChange={(e) => setExportData({ ...exportData, range: e.target.value })}>
                  <option value="ALL">All</option>
                  {
                    pageNo.map(page => <option value={page.value} selected={Number(page.value) === Number(exportData.range)}>{page.label}</option>)
                  }
                </select>
              </div>
              <div className="col-12 mb-1">
                <label htmlFor="date">Date</label>
                <Flatpickr options={{ // Sets the minimum date as 14 days ago
                  maxDate: "today", // Sets the maximum date as today
                  mode: "range",
                  dateFormat: "Y-m-d"
                }} className='form-control' value={exportData?.selectedData} onChange={(date) => setExportData({ ...exportData, selectedData: date })} placeholder='Select date' />
              </div>
            </div>

          </form>
        </ModalBody>
        <ModalFooter>
          <Button outline onClick={() => setIsDownLoad(!isDownLoad)}>
            Cancel
          </Button>
          <Button color='primary' onClick={() => downloadCsv()}>
            Download
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default AdvanceServerSide
