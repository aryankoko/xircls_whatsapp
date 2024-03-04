// ** React Imports
import { Suspense } from 'react'
import { Navigate } from 'react-router-dom'

// ** Utils
import { getUserPermission } from '../../../assets/auth/auth'

const AdminRoute = ({ children, route }) => {
  if (route) {
    const user = getUserPermission() ? JSON.parse(getUserPermission()) : {}
    console.log(user, "user")
    // const restrictedRoute = route.meta && route.meta.restricted

    if (!user?.isAdmin) {
      return <Navigate to={"/admin/"} />
    }
  }

  return <Suspense fallback={null}>{children}</Suspense>
}

export default AdminRoute
