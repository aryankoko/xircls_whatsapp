// ** React Imports
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Suspense, useContext, useEffect } from 'react'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'
import { getToken } from '../../../assets/auth/auth'
import { PermissionProvider } from '../../../Helper/Context'
// import toast from 'react-hot-toast'

const PrivateRoute = ({ children, route }) => {

  const navigate = useNavigate()
  const { setUserPermission, userPermission } = useContext(PermissionProvider)
  const location = useLocation()

  const checkUserToken = async () => {
    const token = await getToken() ? JSON.parse(getToken()) : null
    // console.log(token, "useruser")
    if (!token) {
      toast.error("Session expired. Please login")
      navigate('/merchant/login/')
    }

  }

  const checkPermission = async () => {
    const token = await getToken() ? JSON.parse(getToken()) : null

    if (token) {
      console.log(route, "routerouterouteroute")
      if (route?.app) {
        if (userPermission?.installedApps?.includes(route?.app)) {
          // console.log("INSTALLED", "Route Permission")
          if (route?.app !== userPermission?.appName) {
            setUserPermission({ ...userPermission, appName: route?.app })
          }

        } else {
          // console.log("NOT INSTALLED", "Route Permission")
          toast.error("You don't have access of that App")
          navigate("/merchant/apps/")
        }

      }
      
      if (!userPermission?.is_super_user && route?.permission) {
        // if (route?.permission) {
          const permissionList = userPermission?.permissionList?.filter((curElem) => curElem.permission__apps === route?.app && curElem.permission__slug === route?.permission.route_type)
          if (permissionList?.length > 0) {
            const isAccess = permissionList[0][route?.permission?.action]
            // console.log(permissionList[0][currentRoute[0]?.permission?.action], "isPermission")
            if (!isAccess) {
              navigate("/merchant/apps/", { replace: true })
              toast.error("Permission denied")
            }
    
          } else {
            navigate("/merchant/apps/", { replace: true })
            toast.error("Permission denied")
          }
        //}
      }

    }
  }

  useEffect(() => {
    checkPermission()
  }, [location.pathname])


  // console.log(route, "routerouteroute")
  // useEffect(() => {
  if (route) {
    checkUserToken()
  }
  return <Suspense fallback={null}>{children}</Suspense>
}

export default PrivateRoute
