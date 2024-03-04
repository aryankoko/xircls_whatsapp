// ** React Imports
import { Fragment, useCallback, useContext, useState } from 'react'
// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ArrowLeft, ChevronDown, File, FileText, Grid, Share, X } from 'react-feather'
import { useTranslation } from 'react-i18next'
import DataTable from 'react-data-table-component'
import Flatpickr from 'react-flatpickr'

// ** Reactstrap Imports
import { Card, Input, Row, Col, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledButtonDropdown, Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap'
import Spinner from './Spinner'
import { Link } from 'react-router-dom'
import { getCurrentOutlet, pageNo } from '../../Validator'
import { PermissionProvider } from '../../../Helper/Context'
import moment from 'moment/moment'
import FrontBaseLoader from '../Loader/Loader'
// import moment from 'moment/moment'

const ComTable = ({ tableCol, data, searchValue, filteredData, isLoading, isDeffer, content, isExpand, ExpandableTable, custom, viewAll, isExport = false, exportUrl, selectableRows = false, selectedRows, setSelectedRows, deleteContent }) => {
  // ** State
    const [currentPage, setCurrentPage] = useState(0)
    const [currentEntry, setCurrentEntry] = useState(custom ? 5 : 10)
    const [isDownLoad, setIsDownLoad] = useState(false)
    const [apiLoader, setApiLoader] = useState(false)
    const [exportData, setExportData] = useState({
        fileType: "csv",
        range: "ALL",
        selectedData: []
    })

    // console.log(tableCol, "tableCol")
    // console.log(data, "tableCol")

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
      

    const outletData = getCurrentOutlet()
    const { userPermission } = useContext(PermissionProvider)
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
    // ** Custom Pagination Component
    const CustomPagination = () => (
        <div className="d-flex w-100 align-items-center justify-content-between">
        <span>Showing {currentPage + 1} to {currentEntry} of {data.length} entries</span>
        <ReactPaginate
            previousLabel={<Previous size={15} />}
            nextLabel={<Next size={15} />}
            forcePage={currentPage}
            onPageChange={page => handlePagination(page)}
            pageCount={searchValue.length ? Math.ceil(filteredData.length / currentEntry) : Math.ceil(data.length / currentEntry) || 1}
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
              borderTop: `none`,
              borderBottom: '1px solid #ebe9f1'
            }
        }
    }

    console.log({customStyles})

    const downloadCsv = () => {
        setApiLoader(true)
        setIsDownLoad(false)
        // if (exportData.selectedData[0] && exportData.selectedData[1]) {
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

    const handleRowSelected = useCallback(state => {

        setSelectedRows(state.selectedRows.map((curElem) => curElem.id))
    }, [])

    // const openDownLoadModal = () => {
    //     // setExportData({...exportData, fileType: type})
    //     setIsDownLoad(true)
    // }

    return (
        <>
            {
                apiLoader ? <FrontBaseLoader /> : ''
            }
            <style>
                {`
                    .table-menu {
                        transform: translate(0px, 10px) !important 
                    }
                `}
            </style>
            {
                isDeffer ? '' : <>
                
                    <Row className='justify-content-end mx-0'>
                        <Col className='d-flex align-items-center justify-content-start gap-1' md='4' sm='12'>
                            <div className='d-flex justify-content-start align-items-center gap-2'>
                                <label>
                                    Show
                                </label>
                                <select className='form-control' disabled={custom} value={currentEntry}  onChange={(e) => {
                                    setCurrentEntry(Number(e.target.value))
                                }} style={{ appearance: 'auto' }}>
                                    {
                                    custom ? <option value={5}>5</option> : pageNo.map(page => <option value={page.value}>{page.label}</option>)
                                    }
                                </select>

                            </div>
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
                                deleteContent && selectedRows.length > 0 ? <>
                                    {deleteContent}
                                </> : ''
                            }
                            
                        </Col>
                        {content}
                    </Row>
                </>
            }
        

            <div className='react-dataTable' style={{ marginTop: '20px' }}>
                {<DataTable
                key={currentEntry}
                pagination
                customStyles={customStyles}
                selectableRows={selectableRows}
                onSelectedRowsChange={handleRowSelected}
                columns={tableCol}
                className='react-dataTable'
                paginationPerPage={currentEntry ? currentEntry : 7}
                sortIcon={<ChevronDown size={10} />}
                paginationDefaultPage={currentPage + 1}
                paginationComponent={CustomPagination}
                data={searchValue.length ? filteredData : data}
                progressPending={isLoading}
                progressComponent={<Spinner size="40px" />}
                expandableRows={isExpand}
                expandOnRowClicked={isExpand}
                expandableRowsComponent={ExpandableTable}
                />}

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
                                <select name='number_of_rows' className='form-control' onChange={(e) => setExportData({...exportData, fileType: e.target.value})}>
                                    {
                                        fileOptions.map((curElem) => {
                                            return <option value={curElem.value} selected={curElem.value === exportData.fileType}>{curElem.label}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-12 mb-1">
                                <label htmlFor="number_of_rows">Number of Rows</label>
                                <select name='number_of_rows' className='form-control' onChange={(e) => setExportData({...exportData, range: e.target.value})}>
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
                                }} className='form-control' value={exportData?.selectedData} onChange={(date) => setExportData({...exportData, selectedData: date})} placeholder='Select date' />
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

export default ComTable

// // Assuming you have a button with id="exportButton"
// document.getElementById('exportButton').addEventListener('click', function () {
//     fetch('/export-csv/')
//         .then(response => response.blob())
//         .then(blob => {
//             const url = window.URL.createObjectURL(new Blob([blob]))
//             const a = document.createElement('a')
//             a.href = url
//             a.download = 'customers.csv'
//             document.body.appendChild(a)
//             a.click()
//             document.body.removeChild(a)
//             window.URL.revokeObjectURL(url)
//         })
// })


// import React from 'react'

// class ExportCSVButton extends React.Component {
//   handleExportCSV = () => {
//     fetch('/export-csv/')
//       .then(response => response.blob())
//       .then(blob => {
//         // Create a link element to trigger the download
//         const url = window.URL.createObjectURL(new Blob([blob]))
//         const a = document.createElement('a')
//         a.href = url
//         a.download = 'customers.csv'
//         document.body.appendChild(a)
//         a.click()
//         document.body.removeChild(a)
//         window.URL.revokeObjectURL(url)
//       })
//       .catch(error => {
//         console.error('Error exporting CSV:', error)
//       })
//   }

//   render() {
//     return (
//       <button onClick={this.handleExportCSV}>
//         Export CSV
//       </button>
//     )
//   }
// }

// export default ExportCSVButton

