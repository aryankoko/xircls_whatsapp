import React, { useEffect, useState } from 'react'
import { Card, CardBody, Input, Row } from 'reactstrap'
import Spinner from '../Components/DataTable/Spinner'
import Select from 'react-select'
import Flatpickr from 'react-flatpickr'
import { getReq, postReq } from '../../assets/auth/jwtService'
import toast from 'react-hot-toast'
import { validForm } from '../Validator'
import { useNavigate, useParams } from 'react-router-dom'
import FrontBaseLoader from '../Components/Loader/Loader'

const AddUser = () => {
    const [apiLoader, setApiLoader] = useState(false)
    const defaultData = {
        first_name: "",
        last_name: "",
        email_id: "",
        password: "",
        confirm_password: "",
        assign_department: "",
        commision: "",
        assign_role: "",
        selectedData: ""
    }

    const userDataCheck = [
        {
            name: 'first_name',
            message: 'Please Enter First Name',
            type: 'string',
            id: 'first_name'
        },
        {
            name: 'last_name',
            message: 'Please Enter Last Name',
            type: 'string',
            id: 'last_name'
        },
        {
            name: 'email_id',
            message: 'Please Enter Email ID',
            type: 'email',
            id: 'email_id'
        },
        {
            name: 'password',
            message: 'Please Enter Password',
            type: 'string',
            id: 'password'
        },
        {
            name: 'confirm_password',
            message: 'Please Enter Confirm Password',
            type: 'string',
            id: 'confirm_password'
        },
        {
            name: 'assign_department',
            message: 'Please Select Assign Department',
            type: 'string',
            id: 'assign_department'
        },
        {
            name: 'assign_role',
            message: 'Please Select Assign Role',
            type: 'string',
            id: 'assign_role'
        }
    ]

    const editUserDataCheck = [
        {
            name: 'first_name',
            message: 'Please Enter First Name',
            type: 'string',
            id: 'first_name'
        },
        {
            name: 'last_name',
            message: 'Please Enter Last Name',
            type: 'string',
            id: 'last_name'
        },
        {
            name: 'email_id',
            message: 'Please Enter Email ID',
            type: 'email',
            id: 'email_id'
        },
        {
            name: 'assign_department',
            message: 'Please Select Assign Department',
            type: 'string',
            id: 'assign_department'
        },
        {
            name: 'assign_role',
            message: 'Please Select Assign Role',
            type: 'string',
            id: 'assign_role'
        }
    ]

    const { id } = useParams()

    const [data, setData] = useState(defaultData)
    const [departmentList, setDepartmentList] = useState([])
    const [permisionList, setPermissionList] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const updateData = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const commissionOptions = [
        { value: "1", label: "Operations - Commission" },
        { value: "2", label: "silver" },
        { value: "3", label: "Test-Sales" },
        { value: "4", label: "15% for 6 transaction per client till 31st December 2022" },
        { value: "5", label: "30% for 1st year from the agreement" },
        { value: "6", label: "test comm" },
        { value: "7", label: "test1" },
        { value: "8", label: "Year wise commission" },
        { value: "9", label: "Digital Marketing - 5%" },
        { value: "10", label: "Sales - Period wise commission" },
        { value: "11", label: "Sales - Calendar wise commission" }
    ]

    const rolesOptions = [
        { value: "Admin", label: "Admin" },
        { value: "Manager", label: "Manager" },
        { value: "Executive", label: "Executive" }
    ]


    const handleChange = (options, actionMeta, check) => {
        if (check) {
            const option_list = options.map((cur) => {
                return cur.value
            })
            setData({ ...data, [actionMeta.name]: option_list })
        } else {
            setData({ ...data, [actionMeta.name]: options.value })
        }

    }

    const changeCheck = (e, id) => {
        // console.log(e, cur)
        const dupArry = permisionList
        const checkModule = dupArry?.findIndex((curElem) => Number(curElem?.id) === Number(id))
        console.log(checkModule, "checkModule")

        if (checkModule !== -1) {
            dupArry[checkModule][e.target.name] = e.target.checked
        }
        console.log(dupArry, "dupArry")
        setPermissionList([...dupArry])

    }

    const getDepartmentList = () => {
        getReq("addDepartment")
            .then((resp) => {
                console.log(resp)
                const dept_list = resp?.data?.map((curElem) => {
                    return { label: curElem?.department, value: curElem?.id }
                })

                setDepartmentList(dept_list)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const getPermissionList = (value) => {
        setIsLoading(true)
        getReq("checkDeptName", `?id=${value}`)
            .then((resp) => {
                console.log(resp, "checkDeptName")
                // const permission_list = resp?.data?.map((curElem) => {
                //     return {
                //         permission: curElem?.id,
                //         create: false,
                //         update: false,
                //         delete: false,
                //         read: false
                //     }
                // })

                // setData({...data, selectedModuleList: permission_list})

                setPermissionList(resp?.data)
                setIsLoading(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const saveData = (type) => {
        setApiLoader(true)
        console.log("api hit")
        let passCheck = true
        if (!id) {
            passCheck = data.password === data.confirm_password
        }

        console.log(passCheck, "passCheck")

        if (passCheck) {
            const checkForm = validForm(id ? editUserDataCheck : userDataCheck, data)
            if (checkForm) {
                console.log("form is valid")
                const form_data = new FormData()
                Object.entries(data).map(([key, value]) => form_data.append(key, value))

                if (id) {
                    form_data.append('unique_id', id)
                }

                permisionList?.map((curElem) => form_data.append("permission_list", JSON.stringify(curElem)))

                postReq("saveUser", form_data)
                .then((resp) => {
                    console.log(resp)
                    toast.success("User saved successfully")
                    setData(defaultData)
                    setPermissionList([])
                    if (type === "save&close") {
                        navigate("/merchant/customers/Manage-user/")
                    }
                })
                .catch((error) => {
                    console.log(error)
                    toast.error("Something went wrong")
                })
                .finally(() => {
                    setApiLoader(false)
                })
            } else {
                setApiLoader(false)
            }
        } else {
            toast.error('Password does not match')
            setApiLoader(false)
        }

        // return
    }

    const getData = () => {
        getReq("memebersDetails", `?id=${id}`)
        .then((res) => {
            console.log(res, "kk")
            const data = res?.data?.MemberProfile
            console.log(data)
            const updatedData = {
                first_name: data[0]?.member?.first_name,
                last_name: data[0]?.member?.last_name,
                email_id: data[0]?.member?.user?.email,
                password: "",
                confirm_password: "",
                assign_department: data[0]?.member?.department?.[0]?.id,
                commision: "",
                assign_role: data[0]?.member?.user_position,
                selectedData: ""
            }
            setData((preData) => ({
                ...preData,
                ...updatedData
            }))
            setPermissionList(data?.map((curElem) => {
                return {
                    id: curElem?.permission?.id,
                    apps: curElem?.permission?.apps,
                    permission: curElem?.permission?.permission,
                    slug: curElem?.permission?.slug,
                    permission_description: curElem?.permission?.permission_description,
                    create: curElem?.create,
                    update: curElem?.update,
                    read: curElem?.read,
                    delete: curElem?.delete,
                    is_active: curElem?.permission?.is_active
                }
            }))
        })
        .catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getDepartmentList()
        if (id) {
            getData()
        }
    }, [])

    // useEffect(() => {
    //     if (data?.assign_department) {
    //         getPermissionList(data?.assign_department)
    //     }
    // }, [data?.assign_department])

    console.log(setPermissionList)

    return (
        <>
            {
                apiLoader ? <FrontBaseLoader /> : ''
            }
            <Row>
                <Card>
                    <CardBody>
                        <div className="d-flex justify-content-between align-items-center">
                            <h4 className='m-0'>{id ? "Edit" : "Add"} User</h4>
                        </div>
                    </CardBody>
                </Card>
            </Row>

            <Row>
                <Card>
                    <CardBody>
                        <div className="row">
                            <div className="col-md-4 mb-1">
                                <div className="form-group">
                                    <label htmlFor="first_name">First Name</label>
                                    <input className='form-control' type="text" name="first_name" placeholder='First Name' value={data?.first_name} onChange={(e) => updateData(e)} />
                                    <p id="first_name_val" className="text-danger m-0 p-0 vaildMessage"></p>
                                </div>
                            </div>
                            <div className="col-md-4 mb-1">
                                <div className="form-group">
                                    <label htmlFor="last_name">Last Name</label>
                                    <input className='form-control' type="text" name="last_name" placeholder='Last Name' value={data?.last_name} onChange={(e) => updateData(e)} />
                                    <p id="last_name_val" className="text-danger m-0 p-0 vaildMessage"></p>
                                </div>
                            </div>
                            <div className="col-md-4 mb-1">
                                <div className="form-group">
                                    <label htmlFor="email_id">Email ID</label>
                                    <input disabled={id} className='form-control' type="text" name="email_id" placeholder='Email ID' value={data?.email_id} onChange={(e) => updateData(e)} />
                                    <p id="email_id_val" className="text-danger m-0 p-0 vaildMessage"></p>
                                </div>
                            </div>

                            <div className="col-md-4 mb-1">
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input disabled={id} className='form-control' type="text" name="password" placeholder='Password' value={data?.password} onChange={(e) => updateData(e)} />
                                    <p id="password_val" className="text-danger m-0 p-0 vaildMessage"></p>
                                </div>
                            </div>

                            <div className="col-md-4 mb-1">
                                <div className="form-group">
                                    <label htmlFor="confirm_password">Confirm Password</label>
                                    <input disabled={id} className='form-control' type="text" name="confirm_password" placeholder='Confirm Password' value={data?.confirm_password} onChange={(e) => updateData(e)} />
                                    <p id="confirm_password_val" className="text-danger m-0 p-0 vaildMessage"></p>
                                </div>
                            </div>

                            <div className="col-md-4 mb-1">
                                <div className="form-group">
                                    <label htmlFor="confirm_password">Assign Department</label>
                                    <Select
                                        isMulti={false}
                                        options={departmentList}
                                        inputId="aria-example-input"
                                        closeMenuOnSelect={true}
                                        name="assign_department"
                                        placeholder="Assign Department"
                                        value={departmentList?.filter(option => data?.assign_department === option.value)}
                                        onChange={(value, actionMeta) => {
                                            handleChange(value, actionMeta, false)
                                            getPermissionList(value?.value)
                                        }}
                                    />
                                    <p id="assign_department_val" className="text-danger m-0 p-0 vaildMessage"></p>
                                </div>
                            </div>

                            <div className="col-md-4 mb-1 d-none">
                                <div className="form-group">
                                    <label htmlFor="confirm_password">Commission</label>
                                    <Select
                                        isMulti={false}
                                        options={commissionOptions}
                                        inputId="aria-example-input"
                                        closeMenuOnSelect={true}
                                        name="commision"
                                        placeholder="Commission"
                                        value={commissionOptions?.filter(option => data?.commision === option.value)}
                                        onChange={(value, actionMeta) => handleChange(value, actionMeta, false)}
                                    />
                                </div>
                            </div>

                            <div className="col-md-4 mb-1">
                                <div className="form-group">
                                    <label htmlFor="confirm_password">Assign Role</label>
                                    <Select
                                        isMulti={false}
                                        options={rolesOptions}
                                        defaultInputValue=''
                                        inputId="aria-example-input"
                                        closeMenuOnSelect={true}
                                        name="assign_role"
                                        placeholder="Assign Role"
                                        value={rolesOptions?.filter(option => data?.assign_role === option.value)}
                                        onChange={(value, actionMeta) => handleChange(value, actionMeta, false)}
                                    />
                                    <p id="assign_role_val" className="text-danger m-0 p-0 vaildMessage"></p>
                                </div>
                            </div>

                            <div className="col-md-4 mb-1 d-none">
                                <div className="form-group">
                                    <label htmlFor="confirm_password">Start Date</label>
                                    <Flatpickr options={{ // Sets the minimum date as 14 days ago
                                        minDate: "today",
                                        dateFormat: "Y-m-d"
                                    }} className='form-control' value={data?.selectedData} onChange={(date) => setData({ ...data, selectedData: date })} placeholder='Start Date' />
                                </div>
                            </div>

                        </div>

                        <div className="row mt-2">
                            <div className="col-md-12">
                                <h4 className="text-center my-2">Permission according to roles</h4>
                                <table className="table table-hover overflow-x-auto">
                                    <thead>
                                        <tr>
                                            <th scope="col">Module</th>
                                            <th scope="col">Add</th>
                                            <th scope="col">Edit</th>
                                            <th scope="col">View</th>
                                            <th scope="col">Delete</th>
                                        </tr>
                                    </thead>

                                    {isLoading ? (
                                        <div className='w-100 d-flex justify-content-center align-items-center' style={{ marginRight: "90vw" }}><Spinner size={'35px'} /></div>
                                    ) : (
                                        <tbody>
                                            {
                                                permisionList?.map((cur, key) => (
                                                    <tr key={key}>
                                                        <td>{cur?.permission}</td>
                                                        <td>
                                                            <div className='form-check form-check-primary'>
                                                                <Input type='checkbox' value={cur?.id} checked={cur['create']} name="create" onChange={(e) => changeCheck(e, cur?.id)} />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className='form-check form-check-primary'>
                                                                <Input type='checkbox' value={cur?.id} checked={cur['update']} name="update" onChange={(e) => changeCheck(e, cur?.id)} />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className='form-check form-check-primary'>
                                                                <Input type='checkbox' value={cur?.id} checked={cur['read']} name="read" onChange={(e) => changeCheck(e, cur?.id)} />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className='form-check form-check-primary'>
                                                                <Input type='checkbox' value={cur?.id} checked={cur['delete']} name="delete" onChange={(e) => changeCheck(e, cur?.id)} />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    )
                                    }

                                </table>
                            </div>
                        </div>

                        <div className="row">
                            <div className="action-btn mt-2 d-flex justify-content-end align-items-center gap-2">
                                {/* <a className='btn btn-primary-main' onClick={() => saveData('save')}>Save</a> */}
                                <a className='btn btn-primary-main' onClick={() => saveData('save&close')}>Save</a>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Row>
        </>
    )
}

export default AddUser