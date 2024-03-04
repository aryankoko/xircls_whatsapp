// ** React Imports
import { Fragment, useCallback } from 'react'
// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ArrowLeft, ChevronDown } from 'react-feather'
import { useTranslation } from 'react-i18next'
import DataTable from 'react-data-table-component'

// ** Reactstrap Imports
import { Card, Input, Row, Col } from 'reactstrap'
import Spinner from './Spinner'
// import { Link } from 'react-router-dom'
// import { pageNo } from '../../Validator'

const ServerSideTable = ({ tableCol, data, isLoading, content, currentPage, setCurrentPage, currentEntry, count, isStyling, selectableRows = false, setSelectedRows }) => {
  // ** State
  // const [currentPage, setCurrentPage] = useState(0)
  // const [currentEntry, setCurrentEntry] = useState(10)
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
      <span>Showing {currentPage + 1} to {currentEntry} of {count} entries</span>
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

    setSelectedRows(state.selectedRows.map((curElem) => curElem.id))
  }, [])

  console.log("currentEntry", currentEntry)
  return (
    <>
      {content}
      <div className='react-dataTable' style={{ marginTop: '20px' }}>
        {<DataTable
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
        />}

      </div>
    </>
  )
}

export default ServerSideTable
