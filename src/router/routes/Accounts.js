import { lazy } from 'react'
import AddUser from '../../views/Accounts/AddUser'
import User from '../../views/Accounts/User'
const AddDepartment = lazy(() => import('../../views/Accounts/AddDepartment'))


const Accounts_Routes = [
  {
    path: '/merchant/customers/add-dept/',
    element: <AddDepartment />
  },
  {
    path: '/merchant/customers/Manage-user/',
    element: <User />
  },
  {
    path: '/merchant/customers/add-user/',
    element: <AddUser />
  },
  {
    path: "/merchant/customers/edit-user/:id",
    element: <AddUser />
  }
]

export default Accounts_Routes