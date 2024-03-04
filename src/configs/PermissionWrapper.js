import React, { useEffect, useState } from 'react'
import { PermissionProvider } from '../Helper/Context'
import { getToken } from '../assets/auth/auth'
import { useLocation } from 'react-router-dom'
// import { Routes } from '../router/routes'
// import toast from 'react-hot-toast'
// import { getReq } from '../assets/auth/jwtService'

const PermissionWrapper = ({children}) => {
    const defaultData = {
        appName: '',
        multipleDomain: [],
        apiKey: '',
        installedApps: [],
        campaign: [],
        isSupport: false,
        isAdmin: false,
        currencySymbol: "₹",
        multi_user_key: "",
        permissionList: [],
        super_user: "",
        is_super_user: true,
        logged_in_user: {}
    }
    const [userPermission, setUserPermission] = useState(localStorage.getItem('userPermission') ? JSON.parse(localStorage.getItem('userPermission')) : defaultData)
    const location = useLocation()
    // const navigate = useNavigate()

    // let callbackChild = children
    //  console.log(callbackChild)
    // useEffect(() => {
    //     console.log("calling")
    //     callbackChild = children
    // }, [userPermission.apiKey, reloader])

    useEffect(() => {
        // console.log(userPermission, "changed")
        if (getToken()) {
            localStorage.setItem('userPermission', JSON.stringify(userPermission))
        }

    }, [userPermission])

    // const checkUserPermission = async () => {
    //     const token = await getToken()
    //     if (token) {

    //         const currentRoute = Routes?.filter((curRoute) => {
    //             return curRoute?.path.toLowerCase().startsWith(location?.pathname.toLowerCase())
    //         })
    //         console.log(currentRoute[0], "isPermission")

    //         if (currentRoute[0]?.app) {
    //             if (userPermission?.installedApps?.includes(currentRoute[0]?.app)) {
    //                 // console.log("INSTALLED", "Route Permission")
    //                 setUserPermission({...userPermission, appName: currentRoute[0]?.app})

    //             } else {
    //                 // console.log("NOT INSTALLED", "Route Permission")
    //                 toast.error("You don't have access of that App")
    //                 navigate("/merchant/apps/")
    //             }

    //         }

    //         if (currentRoute[0]?.permission) {
    //             const permissionList = userPermission?.permissionList.filter((curElem) => curElem.permission__apps === currentRoute[0]?.app && curElem.permission__slug === currentRoute[0]?.permission.route_type)
    //             if (permissionList.length > 0) {
    //                 const isAccess = permissionList[0][currentRoute[0]?.permission?.action]
    //                 // console.log(permissionList[0][currentRoute[0]?.permission?.action], "isPermission")
    //                 if (!isAccess) {
    //                     navigate("/merchant/apps/")
    //                     toast.error("Permission denied")
    //                 }

    //             }
    //         }
    //     }
    // }

    useEffect(() => {
        // let isMounted = true
        
        // checkUserPermission()
        const params = new URLSearchParams(location.search)
        if (params.get('aft_no')) {
            localStorage.setItem('aft_no', params.get('aft_no'))
        }
    }, [location])

    return (
        <PermissionProvider.Provider value={{ userPermission, setUserPermission}}>
            {children}
        </PermissionProvider.Provider>
    )
}

export default PermissionWrapper