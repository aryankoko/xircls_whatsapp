// ** Custom Components
import Avatar from '@components/avatar'

import { MoreVertical, Edit, FileText, Archive, Trash } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
// ** Vars
const states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary']

const status = {
  1: { title: 'Current', color: 'light-primary' },
  2: { title: 'Paid', color: 'light-success' },
  3: { title: 'Not Paid', color: 'light-danger' },
  4: { title: 'Resigned', color: 'light-warning' },
  5: { title: 'Applied', color: 'light-info' }
}

// ** Get initial Data


export const data = [{name: 'uday', phone: '909090909', email: 'uday212727@gmail.com', id: "1"}]


// ** Table Zero Config Column
export const basicColumns = [
  {
    name: 'ID',
    sortable: true,
    maxWidth: '100px',
    selector: row => row.id
  },
  {
    name: 'Name',
    sortable: true,
    minWidth: '225px',
    selector: row => row.full_name
  },
  {
    name: 'Email',
    sortable: true,
    minWidth: '310px',
    selector: row => row.email
  },
  {
    name: 'Position',
    sortable: true,
    minWidth: '250px',
    selector: row => row.post
  },
  {
    name: 'Age',
    sortable: true,
    minWidth: '100px',
    selector: row => row.age
  },
  {
    name: 'Salary',
    sortable: true,
    minWidth: '175px',
    selector: row => row.salary
  }
]
// ** Table ReOrder Column
export const reOrderColumns = [
  // {
  //   name: 'ID',
  //   reorder: true,
  //   sortable: true,
  //   maxWidth: '100px',
  //   selector: row => row.id
  // },
  // {
  //   name: 'Name',
  //   reorder: true,
  //   sortable: true,
  //   minWidth: '225px',
  //   selector: row => row.full_name
  // },
  // {
  //   name: 'Email',
  //   reorder: true,
  //   sortable: true,
  //   minWidth: '310px',
  //   selector: row => row.email
  // },
  // {
  //   name: 'Position',
  //   reorder: true,
  //   sortable: true,
  //   minWidth: '250px',
  //   selector: row => row.post
  // },
  // {
  //   name: 'Age',
  //   reorder: true,
  //   sortable: true,
  //   minWidth: '100px',
  //   selector: row => row.age
  // },
  // {
  //   name: 'Salary',
  //   reorder: true,
  //   sortable: true,
  //   minWidth: '175px',
  //   selector: row => row.salary
  // }

  {
    name: 'Order Number',
    reorder: true,
    sortable: true,
    minWidth: '200px',
    selector: row => row.order
  },
  {
    name: 'Total',
    reorder: true,
    sortable: true,
    minWidth: '100px',
    selector: row => row.total
  },
  {
    name: 'Commission',
    reorder: true,
    sortable: true,
    minWidth: '100px',
    selector: row => row.commission
  },
  {
    name: 'Date of Purchase',
    reorder: true,
    sortable: true,
    minWidth: '100px',
    selector: row => row.date_of_purchase
  },
  {
    name: 'Payment Status',
    reorder: true,
    sortable: true,
    minWidth: '100px',
    selector: row => row.status,
    cell: row => {
      return (
        <Badge color={status[row.status].color} pill>
          {status[row.status].title}
        </Badge>
      )
    }
  }
]

// ** Expandable table component
const ExpandableTable = ({ data }) => {
  return (
    <div className='expandable-content p-2'>
      <p>
        <span className='fw-bold'>City:</span> {data[0]}
      </p>
      <p>
        <span className='fw-bold'>Experience:</span> {data[1]}
      </p>
      <p className='m-0'>
        <span className='fw-bold'>Post:</span> {data[2]}
      </p>
    </div>
  )
}

// ** Table Common Column
export const columns = [
  {
    name: 'Name',
    minWidth: '250px',
    sortable: row => row.full_name,
    cell: row => (
      <div className='d-flex align-items-center'>
        {row.avatar === '' ? (
          <Avatar color={`light-${states[row.status]}`} content={row.full_name} initials />
        ) : (
          <Avatar img={require(`@src/assets/images/portrait/small/avatar-s-${row.avatar}`).default} />
        )}
        <div className='user-info text-truncate ms-1'>
          <span className='d-block fw-bold text-truncate'>{row.full_name}</span>
          <small>{row.post}</small>
        </div>
      </div>
    )
  },
  {
    name: 'Email',
    sortable: true,
    minWidth: '250px',
    selector: row => row.email
  },
  {
    name: 'Date',
    sortable: true,
    minWidth: '150px',
    selector: row => row.start_date
  },

  {
    name: 'Salary',
    sortable: true,
    minWidth: '150px',
    selector: row => row.salary
  },
  {
    name: 'Age',
    sortable: true,
    minWidth: '100px',
    selector: row => row.age
  },
  {
    name: 'Status',
    minWidth: '150px',
    sortable: row => row.status.title,
    cell: row => {
      return (
        <Badge color={status[row.status].color} pill>
          {status[row.status].title}
        </Badge>
      )
    }
  },
  {
    name: 'Actions',
    allowOverflow: true,
    cell: () => {
      return (
        <div className='d-flex'>
          <UncontrolledDropdown>
            <DropdownToggle className='pe-1' tag='span'>
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
                <FileText size={15} />
                <span className='align-middle ms-50'>Details</span>
              </DropdownItem>
              <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
                <Archive size={15} />
                <span className='align-middle ms-50'>Archive</span>
              </DropdownItem>
              <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
                <Trash size={15} />
                <span className='align-middle ms-50'>Delete</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <Edit size={15} />
        </div>
      )
    }
  }
]

// ** Table Intl Column
export const multiLingColumns = [
  {
    name: 'Order Number',
    sortable: true,
    minWidth: '200px',
    selector: row => row.order
  },
  {
    name: 'Total',
    sortable: true,
    minWidth: '100px',
    selector: row => row.total
  },
  {
    name: 'Commission',
    sortable: true,
    minWidth: '100px',
    selector: row => row.commission
  },
  {
    name: 'Date of Purchase',
    sortable: true,
    minWidth: '100px',
    selector: row => row.date_of_purchase
  },
  {
    name: 'Payment Status',
    sortable: true,
    minWidth: '100px',
    selector: row => row.status,
    cell: row => {
      return (
        <Badge color={status[row.status].color} pill>
          {status[row.status].title}
        </Badge>
      )
    }
  }
]

// ** Table Server Side Column
export const serverSideColumns = [
  {
    sortable: true,
    name: 'Full Name',
    minWidth: '225px',
    selector: row => row.full_name
  },
  {
    sortable: true,
    name: 'Email',
    minWidth: '250px',
    selector: row => row.email
  },
  {
    sortable: true,
    name: 'Position',
    minWidth: '250px',
    selector: row => row.post
  },
  {
    sortable: true,
    name: 'Office',
    minWidth: '150px',
    selector: row => row.city
  },
  {
    sortable: true,
    name: 'Start Date',
    minWidth: '150px',
    selector: row => row.start_date
  },
  {
    sortable: true,
    name: 'Salary',
    minWidth: '150px',
    selector: row => row.salary
  }
]

// ** Table Adv Search Column
export const advSearchColumns = [
  {
    name: 'Name',
    sortable: true,
    minWidth: '200px',
    selector: row => row.full_name
  },
  {
    name: 'Email',
    sortable: true,
    minWidth: '250px',
    selector: row => row.email
  },
  {
    name: 'Post',
    sortable: true,
    minWidth: '250px',
    selector: row => row.post
  },
  {
    name: 'City',
    sortable: true,
    minWidth: '150px',
    selector: row => row.city
  },
  {
    name: 'Date',
    sortable: true,
    minWidth: '150px',
    selector: row => row.start_date
  },

  {
    name: 'Salary',
    sortable: true,
    minWidth: '100px',
    selector: row => row.salary
  }
]

export default ExpandableTable
