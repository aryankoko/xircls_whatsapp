import React, { useContext, useEffect } from 'react'
import logo from '@src/assets/images/logo/XIRCLS_LOGO.png'
import { setToken } from '../../assets/auth/auth'
import { useLocation, useNavigate } from 'react-router-dom'
import { PermissionProvider } from '../../Helper/Context'
import { baseURL } from '../../assets/auth/jwtService'
import toast from 'react-hot-toast'
import axios from 'axios'
import { dashboardURL } from '../Validator'
import countries from '../NewFrontBase/Country'

const Processing = () => {
    const { setUserPermission } = useContext(PermissionProvider)
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const navigate = useNavigate()
    // console.log(params.get('shop'))
    const loginUser = () => {
      // localStorage.setItem('app_name', params.get('app'))
      const form_data = new FormData()
      form_data.append('shop', params.get('shop'))
      form_data.append('email', params.get('email').replaceAll(" ", "+"))
      form_data.append('app', params.get('app'))
      form_data.append('platform', params.get('platform'))
      form_data.append('currency', params.get('currency'))
      form_data.append('shopify_xircls_app_id', params.get('shopify_xircls_app_id'))

      const time = new Date().getTime()
      axios.post(`${baseURL}/merchant/plugin/login/?time=${time}`, form_data)
      .then((res) => {
        console.log(res)
        const tokenValue = JSON.stringify(res?.data?.token)
        setToken(tokenValue)
        const merchantCurrency = countries.filter((curElem) => curElem?.currency?.code === res?.data?.outlet_list[0]?.outlet_currency)
        const updatedPermission = {
          appName: params.get('app'),
          multipleDomain: res?.data?.outlet_list,
          apiKey: res?.data?.outlet_list[0].api_key,
          installedApps: res.data.installed_apps,
          campagin: res?.data?.status,
          currencySymbol: merchantCurrency[0]?.currency?.symbol ? merchantCurrency[0]?.currency?.symbol : '₹',
          permissionList: res?.data?.permission_list,
          super_user: res?.data?.super_user,
          is_super_user: res?.data?.is_super_user,
          multi_user_key: res?.data?.multi_user_key,
          logged_in_user: res?.data?.logged_in_user
        }

        console.log(updatedPermission)

        setUserPermission((curData) => ({
          ...curData,
          ...updatedPermission
        }))
        
        if (res?.status === 200 && tokenValue) {
          toast.success('Logged In Successfully')
          if (params.get('app') === "infiniti") {
            navigate("/merchant/campaign/")
          } else {
            navigate(dashboardURL[params.get('app')])
          }

        }
      })
      .catch((error) => {
        console.log(error)
      })
    }

    useEffect(() => {
      loginUser()
    }, [])

  return (
    <div className='fallback-spinner app-loader'>
      <img className='fallback-logo' src={logo} alt='logo' />
      <div className='loading'>
        <div className='effect-1 effects'></div>
        <div className='effect-2 effects'></div>
        <div className='effect-3 effects'></div>
      </div>
    </div>
  )
}

export default Processing