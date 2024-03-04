import React, { useContext, useEffect, useState } from 'react'
import NavbarAdmin from './NavbarAdmin'
import { baseURL } from '../../assets/auth/jwtService'
import toast from 'react-hot-toast'
import { setToken } from '../../assets/auth/auth'
import { PermissionProvider } from '../../Helper/Context'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
import Spinner from '../Components/DataTable/Spinner'
import FrontBaseLoader from '../Components/Loader/Loader'
import countries from '../NewFrontBase/Country'

const AdminHome = () => {
    const [emails, setEmails] = useState([])
    const [searchFilter, setSearchFilter] = useState("")
    // const [selectedEmail, setSelectedEmail] = useState('')
    const { setUserPermission } = useContext(PermissionProvider)
    const [isLoading, setIsloading] = useState(true)
    const navigate = useNavigate()
    const [apiLoader, setApiLoader] = useState(false)

    const getEmails = async () => {
        const isSuperUser = await Cookies.get('superUser')
        console.log(isSuperUser)
        if (isSuperUser === 'true') {
            fetch(`${baseURL}/merchant/admin_merchant_list/`)
            .then((data) => data.json())
            .then((resp) => {
                console.log(resp)
                setEmails(resp.data.company_profile)
                setIsloading(false)
            })
            .catch((error) => {
                console.log(error)
                setIsloading(false)
            })
        } else {
            navigate('/admin/')
        }
    }
    // console.log(selectedEmail)

    const submitForm = (email) => {
        // e.preventDefault()

        console.log(email)

        if (email === "") {
            toast.error('Please select any one')
        } else {
            setApiLoader(true)
            const form_data = new FormData()
            form_data.append('email', email)
            const time = new Date().getTime()
            axios.post(`${baseURL}/merchant/plugin/login/?time=${time}`, form_data)
                .then((res) => {
                    const tokenValue = JSON.stringify(res?.data?.token)
                    const merchantCurrency = countries.filter((curElem) => curElem?.currency?.code === res?.data?.outlet_list[0]?.outlet_currency)
                    setToken(tokenValue)

                    const updatedPermission = {
                        appName: "",
                        multipleDomain: res?.data?.outlet_list,
                        apiKey: res?.data?.outlet_list[0].api_key,
                        installedApps: res.data.installed_apps,
                        campaign: res?.data?.status,
                        currencySymbol: merchantCurrency[0]?.currency?.symbol ? merchantCurrency[0]?.currency?.symbol : "₹",
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
                        navigate("/merchant/apps/")

                    }
                })
                .catch((error) => {
                    console.log(error)
                    setApiLoader(false)
                    toast.error('Something went wrong')
                })
        }
    }

    const filteredArray = emails?.filter(cur => (cur.user_email?.toLowerCase()?.includes(searchFilter.toLowerCase())) || (cur.phonecode?.toLowerCase()?.includes(searchFilter.toLowerCase())) || (cur.phone_no?.toLowerCase()?.includes(searchFilter.toLowerCase())))

    useEffect(() => {
        getEmails()
    }, [])

    return (

        <div>
            <style>
                {`label {
                cursor: pointer;
            }`}
            </style>
            {
                apiLoader ? <FrontBaseLoader /> : ''
            }

            <div className='d-flex align-items-center justify-content-between p-2 text-center' style={{ height: "vh", width: "100%", backgroundColor: "#7367F0" }}>
                <h1 style={{ color: "white", textAlign: "center", marginLeft: "30px" }} className='d-flex align-items-center '>Home</h1>
                <NavbarAdmin state={searchFilter} setState={setSearchFilter} />
            </div>

            <form method='POST' action='.' onSubmit={(e) => submitForm(e)}>
                {/* 
            <div className='p-2 d-flex aling-items-center justify-content-end'>
                <input type="submit" className="btn btn-primary" value="Login" />
            </div> */}


                <div className='row p-2' >
                    <div className='col-12'>
                        {
                            isLoading ? <div className='d-flex justify-content-center align-items-center my-4'><Spinner size={'45px'} /></div> : <>
                                <div className="table-responsive">
                                    {[...filteredArray].length !== 0 ? (
                                        <table className="table table-hover overflow-x-auto">
                                            <thead>
                                                <tr>
                                                    <th scope="col">User name</th>
                                                    <th scope="col">Country Code</th>
                                                    <th scope="col">Phone</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredArray.map((cur, key) => (
                                                    <tr key={key}>
                                                        <td>{cur.user_email}</td>
                                                        <td>{cur.phonecode}</td>
                                                        <td>{cur.phone_no}</td>
                                                        <td>{cur.user_email}</td>
                                                        <td className="gap-2 link-primary">
                                                            <div className='d-flex justify-content-start align-items-center gap-1'>
                                                                <a className="cursor-pointer">View</a>
                                                                <a className="cursor-pointer" onClick={() => submitForm(cur.user_email)} >
                                                                    Login
                                                                </a>
                                                                <a className="cursor-pointer">Reports</a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <h3 className='text-center'>Data not Found</h3>
                                    )}
                                </div>
                            </>
                        }

                    </div>
                </div>
            </form>

        </div>
    )
}

export default AdminHome    