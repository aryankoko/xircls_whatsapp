// ** React Imports
import { Fragment, useState } from "react"

//** React-Icons
import { AiOutlineSearch } from "react-icons/ai"

// ** Table Columns
import { multiLingColumns } from "./Affiliate_Table_Data"

// ** Third Party Components
import ReactPaginate from "react-paginate"
import { ChevronDown } from "react-feather"
import { useTranslation } from "react-i18next"
import DataTable from "react-data-table-component"

// ** Reactstrap Imports
import { Card, CardBody, Input, Row, Col } from "reactstrap"

export const data = [
  {
    order: "0000373739",
    total: "$12.34",
    commission: "$0.54",
    date_of_purchase: "03/10/2023",
    status: 2
  },
  {
    order: "0000897145",
    total: "$27.64",
    commission: "$8.47",
    date_of_purchase: "16/05/2023",
    status: 3
  },
  {
    order: "0000975048",
    total: "$49.20",
    commission: "$4.77",
    date_of_purchase: "13/03/2023",
    status: 2
  },
  {
    order: "0000317720",
    total: "$62.35",
    commission: "$5.05",
    date_of_purchase: "06/08/2023",
    status: 2
  },
  {
    order: "0000264791",
    total: "$98.28",
    commission: "$5.57",
    date_of_purchase: "25/10/2023",
    status: 2
  },
  {
    order: "0000131513",
    total: "$34.73",
    commission: "$2.78",
    date_of_purchase: "03/09/2023",
    status: 2
  },
  {
    order: "0000197036",
    total: "$73.73",
    commission: "$1.82",
    date_of_purchase: "21/07/2023",
    status: 2
  },
  {
    order: "0000726897",
    total: "$38.86",
    commission: "$8.19",
    date_of_purchase: "23/04/2023",
    status: 2
  },
  {
    order: "0000433310",
    total: "$95.02",
    commission: "$2.92",
    date_of_purchase: "25/04/2023",
    status: 2
  },
  {
    order: "0000713079",
    total: "$74.27",
    commission: "$5.14",
    date_of_purchase: "06/09/2023",
    status: 3
  },
  {
    order: "0000459199",
    total: "$87.92",
    commission: "$8.11",
    date_of_purchase: "07/07/2023",
    status: 3
  },
  {
    order: "0000754849",
    total: "$93.92",
    commission: "$2.14",
    date_of_purchase: "03/06/2023",
    status: 2
  }
]

const DataTableWithButtons = () => {
  // ** State
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState("")
  const [filteredData, setFilteredData] = useState([])

  // ** Hooks
  const { t } = useTranslation()

  // ** Function to handle pagination
  const handlePagination = (page) => {
    setCurrentPage(page.selected)
  }

  // ** Function to handle filter
  const handleFilter = (e) => {
    const value = e.target.value
    let updatedData = []
    setSearchValue(value)

    // const status = {
    //   1: { title: "Current", color: "light-primary" },
    //   2: { title: "Professional", color: "light-success" },
    //   3: { title: "Rejected", color: "light-danger" },
    //   4: { title: "Resigned", color: "light-warning" },
    //   5: { title: "Applied", color: "light-info" }
    // }

    if (value.length) {
      updatedData = data.filter((item) => {
        const startsWith =
          item.order.toLowerCase().startsWith(value.toLowerCase())

        const includes =
          item.order.toLowerCase().includes(value.toLowerCase())

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
        <span className="align-middle d-none d-md-inline-block">
          {t("Prev")}
        </span>
      </Fragment>
    )
  }

  // ** Pagination Next Component
  const Next = () => {
    return (
      <Fragment>
        <span className="align-middle d-none d-md-inline-block">
          {t("Next")}
        </span>
      </Fragment>
    )
  }

  // ** Custom Pagination Component
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel={<Previous size={15} />}
      nextLabel={<Next size={15} />}
      forcePage={currentPage}
      onPageChange={(page) => handlePagination(page)}
      pageCount={
        searchValue.length ? Math.ceil(filteredData.length / 7) : Math.ceil(data.length / 7) || 1
      }
      breakLabel={"..."}
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName={"active"}
      pageClassName={"page-item"}
      nextLinkClassName={"page-link"}
      nextClassName={"page-item next"}
      previousClassName={"page-item prev"}
      previousLinkClassName={"page-link"}
      pageLinkClassName={"page-link"}
      breakClassName="page-item"
      breakLinkClassName="page-link"
      containerClassName={
        "pagination react-paginate pagination-sm justify-content-center mt-1 mb-0"
      }
    />
  )

  return (
    <Card>
      <CardBody>
        <Row className="mx-0">
          <Col
            className="d-flex align-items-center justify-content-md-start my-1 justify-content-center"
            md="4"
            sm="12"
          >
            <h2 className="text-black">Affiliated orders </h2>
          </Col>
          <Col
            className="d-flex align-items-center justify-content-md-end my-1 justify-content-center"
            md="8"
            sm="12"
          >
            <Input
              className="dataTable-filter form-control ms-1"
              style={{ width: `185px`, height: `2.414rem` }}
              type="text"
              placeholder="search orders"
              bsSize="md"
              id="search-input-1"
              value={searchValue}
              onChange={handleFilter}
            />
            {/* <a>
              {t(<AiOutlineSearch size={22} style={{ marginLeft: "6px" }}}/>)}
            </a> */}
          </Col>
        </Row>
        <div className="react-dataTable">
          {data ? (
            <DataTable
              pagination
              selectableRowsNoSelectAll
              columns={multiLingColumns}
              className="react-dataTable table"
              paginationPerPage={8}
              sortIcon={<ChevronDown size={10} />}
              paginationDefaultPage={currentPage + 1}
              paginationComponent={CustomPagination}
              data={searchValue.length ? filteredData : data}
            />
          ) : (
            <div className="text-center">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  )
}

export default DataTableWithButtons
