// ** React Imports
import { Fragment, useState } from 'react'
// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ArrowLeft, ChevronDown, Sliders } from 'react-feather'
import { useTranslation } from 'react-i18next'
import DataTable from 'react-data-table-component'

// ** Reactstrap Imports
import { Card, Input, Row, Col } from 'reactstrap'
import Spinner from './Spinner'
import { Link } from 'react-router-dom'

const ComTableAdvance = ({ tableName, tableCol, data, searchValue, handleFilter, filteredData, isLoading, isBack, adv, setFilteredData, currentPage, currentEntry, setCurrentPage, setCurrentEntry }) => {
  // ** State
  // const [currentPage, setCurrentPage] = useState(0)
  // const [currentEntry, setCurrentEntry] = useState(10)

  const pageNo = [{ label: 7, value: 7 }, { label: 10, value: 10 }, { label: 25, value: 25 }]

  const [isAdvanceFieldsOpen, setIsAdvanceFieldsOpen] = useState(false)
  const [isAdvanceSearch, setIsAdvanceSearch] = useState(false)


  const handleSliderClick = () => {
    setIsAdvanceFieldsOpen(!isAdvanceFieldsOpen)
  }

  // ** Hooks
  const { t } = useTranslation()

  // ** Function to handle pagination
  const handlePagination = page => {
    setCurrentPage(page.selected)
  }

  const advanceHandleFilter = (e) => {
    const value = e.target.value
    const name = e.target.name
    let updatedData = []
    let startsWith
    let includes
    console.log(name)
    if (value.length) {
      updatedData = data.filter(item => {
        if (item[name]) {
          startsWith =
            item[name].toLowerCase().startsWith(value.toLowerCase())

          includes =
            item[name].toLowerCase().includes(value.toLowerCase())
        }

        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })

      setFilteredData(updatedData)
      setIsAdvanceSearch(true)
    } else {
      setIsAdvanceSearch(false)
    }
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
      <span>Showing page {currentPage + 1} of {Math.ceil(data.length / 7)} for {data.length} entries</span>
      {/* {currentEntry} */}  
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
        borderTop: `none`
      }
    }
  }

  console.log(currentEntry)
  return (
    <>
      <Row className='justify-content-end mx-0'>
        {
          isBack ? <Col className='d-flex align-items-center justify-content-start' md='4' sm='12'>
            <Link to={"/merchant/support/"} className="btn-sm btn-outline-secondary">
              <ArrowLeft size="18px" />
            </Link>
          </Col> : ''
        }
        <Col className='d-flex align-items-center justify-content-start' md='4' sm='12'>
          <div className='d-flex justify-content-start align-items-center gap-2'>
            <label>
              Show
            </label>
            <select className='form-control' value={currentEntry} onChange={(e) => {
              setCurrentEntry(Number(e.target.value))
            }} style={{ appearance: 'auto' }}>
              {pageNo.map(page => <option value={page.value}>{page.label}</option>)}
            </select>

          </div>
        </Col>
        <Col className='d-flex align-items-center justify-content-center' md='4' sm='12'>
          <h4 className='m-0'>{tableName}</h4>
        </Col>
        <Col className='d-flex align-items-center justify-content-end gap-1' md='4' sm='12'>
          <Input
            className='dataTable-filter form-control ms-1'
            style={{ width: `180px`, height: `2.714rem` }}
            type='text'
            bsSize='sm'
            id='search-input-1'
            placeholder='Search...'
            value={searchValue}
            onChange={(e) => handleFilter(e, 'all')}
          />
          <span onClick={() => handleSliderClick()} className="center toolbar" style={{ padding: 5, fontSize: 18, marginLeft: 5, cursor: 'pointer' }} data-toggle="tooltip" data-placement="bottom" title="Advance Filtering">
            <Sliders size={20} strokeWidth={2.5} style={{ transform: 'rotate(-90deg)', fontWeight: 'bold' }} />
          </span>
        </Col>
      </Row>

      {isAdvanceFieldsOpen && (
        <div className="row py-2 advance_filter_row">
          {
            tableCol.map((curElem) => {
              return adv.includes(curElem?.dataType) ? <div className="col-6 mb-1">
                <label style={{ color: '#5e5873', fontSize: '0.857rem' }}>{curElem?.name}:</label>
                <input
                  type="text"
                  className="form-control filter-input dt-full-name"
                  id="customer_name"
                  name={curElem?.dataType}
                  onChange={(e) => advanceHandleFilter(e)}
                  data-column-index={0}
                />
                {console.log(curElem?.dataType)}
              </div> : ""

            })
          }

        </div>
      )}

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
          data={searchValue.length || isAdvanceSearch ? filteredData : data}
          progressPending={isLoading}
          progressComponent={<Spinner size="40px" />}
        />}

      </div>
    </>
  )
}

export default ComTableAdvance
