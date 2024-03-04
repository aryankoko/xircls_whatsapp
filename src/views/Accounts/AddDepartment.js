import React, { useContext, useEffect, useState } from 'react'
import { Card, CardBody, Input, Row } from 'reactstrap'
import { PermissionProvider } from '../../Helper/Context'
import { postReq, getReq } from '../../assets/auth/jwtService'
import Select from 'react-select'
import toast from 'react-hot-toast'

const AddDepartment = () => {

    const defaultData = {
        apps: [],
        department: "",
        description: "",
        permission: []  
    }

    const [product, setProduct] = useState([])
    const [permisionList, setPermissionList] = useState([])
    const [valid, setValid] = useState(false)
    const {userPermission} = useContext(PermissionProvider)
    const [data, setData] = useState(defaultData)

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

    const updateData = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }

    const getApps = () => {
        getReq('getAllApps')
        .then((res) => {
          console.log(res)
          setProduct(res?.data.map((curElem) => {
            // if (userPermission?.installedApps.includes(curElem.name.toLowerCase())) {
                return {value: curElem.id, label: `${curElem.name}`, slug: curElem.slug.toLowerCase()}
            // }
          }))
        })
        .catch((error) => {
          console.log(error)
        })
    }

    const getPermissionList = () => {
        const form_data = new FormData()
        data?.apps.map((curElem) => form_data.append('app_list', curElem))
        postReq("getPermissionList", form_data)
        .then((resp) => {
            console.log(resp)
            setPermissionList(resp?.data?.message?.apps_permission)
        })
        .catch((error) => {
            console.log(error)
            toast.error("Something went wrong")
        })
    }

    const checkDeptName = (e) => {
        console.log(e)

        getReq("checkDeptName", `?name=${e.target.value}`)
        .then((resp) => {
            console.log(resp)
            if (resp?.data?.message !== "Department name is available") {
                setValid(true)
            } else {
                setValid(false)
            }
        })
        .catch((error) => {
            console.log(error)
            setValid(true)
        })
    }

    const changeCheck = (id) => {
        console.log(id)

        if (data?.permission.includes(id)) {
            setData({...data, permission: data?.permission.filter((curElem) => Number(curElem) !== Number(id))})
        } else {
            setData({...data, permission: [...data?.permission, id]})
        }
    }

    console.log(data)

    const addDepartment = () => {
        if (!valid) {
            const form_data = new FormData()
            Object.entries(data).map(([key, value]) => {
                if (Array.isArray(value)) {
                    value.map(ele => form_data.append(key, ele))
                } else {
                    form_data.append(key, value)
                }
            })

            postReq("addDepartment", form_data)
            .then((resp) => {
                console.log(resp)
                toast.success("Department added successfully")
                setData(defaultData)
                setPermissionList([])
            })
            .catch((error) => {
                console.log(error)
                toast.error("Something went wrong")
            })
        }
    }

    useEffect(() => {
        getApps()
    }, [])

    useEffect(() => {
        if (data?.apps.length > 0) {
            getPermissionList()
        }
    }, [data?.apps])

    return (
        <>
            <Row>
                <Card>
                    <CardBody>
                        <h4 className='m-0'>Add Department</h4>
                    </CardBody>
                </Card>
            </Row>

            <Row>
                <Card>
                    <CardBody>
                        <div className="departmentForm">
                            <div className="row mb-2">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label htmlFor="department">Department Name</label>
                                        <input className='form-control' type="text" name="department" onBlur={(e) => checkDeptName(e)} value={data?.department} onChange={(e) => updateData(e)} />
                                        {
                                            valid ? <>
                                                <p className="text-danger m-0 p-0 vaildMessage">Department name all ready exists</p>
                                            </> : ''
                                        }
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label htmlFor="department">Description</label>
                                        <input type="text" className='form-control' name="description" onChange={(e) => updateData(e)} value={data?.description} />
                                        {/* <textarea id="" cols="10" rows="1" className='form-control' name="description" onChange={(e) => updateData(e)} value={data?.description} /> */}
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label htmlFor="department">Apps</label>
                                        <Select
                                            isMulti = {true}
                                            options={product.filter((curElem) => userPermission?.installedApps.includes(curElem.slug))}
                                            inputId="aria-example-input"
                                            closeMenuOnSelect={true}
                                            name="apps"
                                            placeholder="Select app"
                                            value={product?.filter(option => data.apps.includes(option.value))}
                                            onChange={(value, actionMeta) => handleChange(value, actionMeta, true)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <h4 className="text-center my-2">Permission according to apps</h4>
                                    <table className="table table-hover overflow-x-auto">
                                        <thead>
                                            <tr>
                                                <th scope="col">Module</th>
                                                <th scope="col">Add</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {permisionList?.map((cur, key) => (
                                                <tr key={key}>
                                                    <td>{cur?.permission}</td>
                                                    <td>
                                                        <div className='form-check form-switch form-check-primary'>
                                                            <Input type='checkbox' onChange={() => changeCheck(cur?.id)} />
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="d-flex justify-content-between align-items-center">
                                    <a className='btn btn-primary-main'>Cancel</a>
                                    <a className='btn btn-primary-main' onClick={() => addDepartment()}>Save</a>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Row>
        </>
    )
}

export default AddDepartment