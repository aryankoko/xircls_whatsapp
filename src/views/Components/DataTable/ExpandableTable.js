// ** React Imports
import { Fragment, useState } from 'react'
// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ArrowLeft, ChevronDown } from 'react-feather'
import { useTranslation } from 'react-i18next'
import DataTable from 'react-data-table-component'

// ** Reactstrap Imports
import { Card, Input, Row, Col } from 'reactstrap'
import Spinner from './Spinner'
import { Link } from 'react-router-dom'
import { pageNo } from '../../Validator'

const ExpandCom = ({ tableCol, data, searchValue, filteredData, isLoading, isDeffer, ExpandableTable, content }) => {
  // ** State
  const [currentPage, setCurrentPage] = useState(0)
  const [currentEntry, setCurrentEntry] = useState(10)
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
        pageCount={searchValue.length ? Math.ceil(filteredData.length / 7) : Math.ceil(data.length / 7) || 1}
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
        borderTop: `1px solid #ebe9f1`,
        borderBottom: 'none'
      }
    }
  }

  console.log("currentEntry", currentEntry)
  return (
    <>
        {
          isDeffer ? '' : <>
          
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
              {content}
            </Row>
          </>
        }
      

      <div className='react-dataTable' style={{ marginTop: '20px' }}>
        {<DataTable
            key={currentEntry}
            pagination
            customStyles={customStyles}
            selectableRowsNoSelectAll
            columns={tableCol}
            className='react-dataTable'
            paginationPerPage={currentEntry ? currentEntry : 7}
            sortIcon={<ChevronDown size={10} />}
            paginationDefaultPage={currentPage + 1}
            paginationComponent={CustomPagination}
            data={searchValue.length ? filteredData : data}
            progressPending={isLoading}
            expandableRows
            expandOnRowClicked
            expandableRowsComponent={ExpandableTable}
            progressComponent={<Spinner size="40px" />
        }
        />}

      </div>
    </>
  )
}

export default ExpandCom
