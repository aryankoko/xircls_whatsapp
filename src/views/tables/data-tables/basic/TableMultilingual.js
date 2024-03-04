// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import { useTranslation } from 'react-i18next'
import DataTable from 'react-data-table-component'

// ** Reactstrap Imports
import { Card, Input, Row, Col } from 'reactstrap'
import { getReq } from '../../../../assets/auth/jwtService'

const DataTableWithButtons = () => {
  // ** State
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [data, setdata] = useState(null)


  useEffect(() => {

    getReq("getCustomersDetails")
    .then((resp) => {
      setdata(resp.data.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])

  console.log(data)


  // ** Hooks
  const { t } = useTranslation()

  // ** Function to handle pagination
  const handlePagination = page => {
    setCurrentPage(page.selected)
  }

  // ** Function to handle filter
  const handleFilter = e => {
    const value = e.target.value
    let updatedData = []
    setSearchValue(value)

    if (value.length) {
      updatedData = data.filter(item => {
        const startsWith =
          item.name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.email.toLowerCase().startsWith(value.toLowerCase()) ||
          item.id.toLowerCase().startsWith(value.toLowerCase()) ||
          item.phone.toLowerCase().startsWith(value.toLowerCase())

        const includes =
          item.name.toLowerCase().includes(value.toLowerCase()) ||
          item.email.toLowerCase().includes(value.toLowerCase()) ||
          item.id.toLowerCase().includes(value.toLowerCase()) ||
          item.phone.toLowerCase().includes(value.toLowerCase())

        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })
      setFilteredData(updatedData)
      setSearchValue(value)
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

  const multiLingColumns = [
    {
      name: 'Customer Name',
      minWidth: '200px',
      selector: row => row.customer_name
    },
    {
      name: 'Customer Group',
      minWidth: '200px',
      selector: row => row.group_name
    },
    {
      name: 'Mobile No',
      minWidth: '250px',
      selector: row => row.phone_no
    },
    {
      name: 'Email',
      minWidth: '250px',
      selector: row => row.email
    },
    {
      name: 'Action',
      minWidth: '250px',
      selector: row => row.email
    }
  ]

  // ** Custom Pagination Component
  const CustomPagination = () => (
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
              color: "#5e5873",
              borderTop: `none`
          }
      }
  }

  return (
    <Card>
      <Row className='justify-content-end mx-0'>
        <Col className='d-flex align-items-center justify-content-center mt-1' md='4' sm='12'>
          <h4>Customers</h4>
        </Col>
        <Col className='d-flex align-items-center justify-content-end mt-1' md='4' sm='12'>
          <a className='btn btn-primary'>
            {t('Search')}
          </a>
          <Input
            className='dataTable-filter form-control ms-1'
            style={{ width: `180px`, height: `2.714rem` }}
            type='text'
            bsSize='sm'
            id='search-input-1'
            value={searchValue}
            onChange={handleFilter}
          />
        </Col>
      </Row>
      <div className='react-dataTable'>
        { data ? <DataTable
          pagination
          customStyles={customStyles}
          selectableRowsNoSelectAll
          columns={multiLingColumns}
          className='react-dataTable table table-bordered dataTable no-footer'
          paginationPerPage={7}
          sortIcon={<ChevronDown size={10} />}
          paginationDefaultPage={currentPage + 1}
          paginationComponent={CustomPagination}
          data={searchValue.length ? filteredData : data}
        /> : <div className="text-center"> <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div></div>  }
        
      </div>
    </Card>
  )
}

export default DataTableWithButtons
