/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { Container, Card, CardBody, Row, Col } from "reactstrap"
import Select from "react-select"
import { Link } from 'react-router-dom'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { crmURL, getReq } from '@src/assets/auth/jwtService'
import { useParams, useNavigate } from 'react-router-dom'
import axios from "axios"
import toast from "react-hot-toast"
import { validForm, validateEmail } from '../../Validator'
import { postReq } from '../../../assets/auth/jwtService'
import { main } from '@popperjs/core'
import Flatpickr from 'react-flatpickr'
import moment from 'moment'
import Spinner from '../../Components/DataTable/Spinner'

const AddServicing = () => {

    const { id } = useParams()
    // let servicingId
    const urlParams = new URLSearchParams(location.search)
    const isEdit = urlParams.get("type") === "edit"
    const isCustomer = urlParams.get("type") === "customer"
    const [customerList, setCustomerList] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    // if (isEdit) {
    //     id = getid.split("-")[0]
    //     servicingId = getid.split("-")[1]
    // } else {
    //     id = getid
    // }

    const getCustomer = () => {
        getReq("getAllCustomer", "", crmURL)
            .then((resp) => {
                console.log(resp)
                setCustomerList(resp?.data?.success?.map((curElem) => {
                    return { label: curElem?.customer_name ? curElem?.customer_name : '-', value: curElem?.xircls_customer_id }
                }))
                setIsLoading(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    console.log(id, "idIsThe", { isEdit }, { isCustomer })

    const mainFormvalueToCheck = [
        {
            name: 'xircls_customer_id',
            message: 'Enter Customer Name',
            type: 'string',
            id: 'xircls_customer_id'
        },
        {
            name: 'vehicle',
            message: 'Enter Vehicle Name',
            type: 'string',
            id: 'vehicle'
        },
        {
            name: 'service_advisor',
            message: 'Enter Service advisor Name',
            type: 'string',
            id: 'service_advisor'
        },
        {
            name: 'job_card_date',
            message: 'Enter Job card date',
            type: 'string',
            id: 'job_card_date'
        },
        {
            name: 'service_invoice_date',
            message: 'Enter Service invoice date',
            type: 'string',
            id: 'service_invoice_date'
        },
        {
            name: 'service_expiry_date',
            message: 'Enter Next service date',
            type: 'string',
            id: 'service_expiry_date'
        },
        {
            name: 'service_invoice_amount',
            message: 'Enter Service invoice amount',
            type: 'string',
            id: 'service_invoice_amount'
        }
    ]

    const addFormvalueToCheck = [
        {
            name: 'title',
            message: 'Enter title',
            type: 'string',
            id: 'title'
        },
        {
            name: 'cust_first_name',
            message: 'Enter customer first Name',
            type: 'string',
            id: 'cust_first_name'
        },
        {
            name: 'cust_last_name',
            message: 'Enter customer last Name',
            type: 'string',
            id: 'cust_last_name'
        },
        {
            name: 'email',
            message: 'Enter email',
            type: 'email',
            id: 'email'
        },
        {
            name: 'phone_no',
            message: 'Enter Phone no',
            type: 'number',
            id: 'phone_no'
        },
        {
            name: 'country',
            message: 'Enter Country',
            type: 'string',
            id: 'country'
        },
        {
            name: 'city',
            message: 'Enter City',
            type: 'string',
            id: 'city'
        },
        {
            name: 'state',
            message: 'Enter State',
            type: 'string',
            id: 'state'
        },
        {
            name: 'pincode',
            message: 'Enter Pincode',
            type: 'string',
            id: 'pincode'
        }
    ]

    const [formData, setFormData] = useState({
        mainForm: {
            xircls_customer_id: isCustomer ? id : "",
            vehicle: '',
            service_advisor: '',
            job_card_date: '',
            service_invoice_date: '',
            next_service_date: '',
            service_invoice_amount: ''
        },
        addForm: {
            title: '',
            cust_first_name: '',
            cust_last_name: '',
            email: '',
            phone_no: '',
            country: 1,
            city: '',
            state: '',
            pincode: ''
        },
    })


    // })
    const [country, setCountry] = useState([])
    const [isHidden, setIsHidden] = useState(false)
    const [allOptions, setAllOptions] = useState([])
    const [vehicleOptions, setVehicleOptions] = useState([])
    const [currentPage, setCurrentPage] = useState(1)

    const navigate = useNavigate()

    const fetchServiceData = (func_id) => {
        // const url = new URL(`${crmURL}/customers/merchant/get_view_customer/`)
        const form_data = new FormData()
        form_data.append('edit_type', isEdit ? 'is_servicing' : 'is_customer_detail')
        if (isEdit) {
            form_data.append("id", id)
            postReq("get_customer_servicing", form_data, crmURL)
                .then((resp) => {
                    // const newArr = resp?.data?.success?.map(ele => {
                    //     return { value: ele.id, label: ele.customer_name }
                    // })
                    console.log(resp?.data, "resp")
                    console.log("ResponseId:", resp?.data?.data[0])
                    setFormData((prev) => {
                        return {
                            ...prev, mainForm: {
                                ...prev.mainForm,
                                xircls_customer_id: resp?.data?.data[0]?.xircls_customer,
                                vehicle: resp?.data?.data[0]?.vehicle?.id,
                                service_advisor: resp?.data?.data[0]?.service_advisor,
                                job_card_date: resp?.data?.data[0]?.job_card_date,
                                service_invoice_date: resp?.data?.data[0]?.service_invoice_date,
                                next_service_date: resp?.data?.data[0]?.service_expiry_date,
                                service_invoice_amount: resp?.data?.data[0]?.service_invoice_amount

                            }
                        }
                    })
                })
                .catch((error) => {
                    console.error("Error:", error)
                    toast.error('Failed to fetch Servicing Detail')
                })
            // const dupObj = { ...formData.mainForm }
            // Object.keys(formData.mainForm).map(key => {
            //     dupObj[key] = resp.data.success[0][key]
            // })
            // console.log({ dupObj })
            // setFormData(prev => {
            //     return {
            //         ...prev, main: dupObj
            //     }
            // })
            // setAllOptions([...newArr])
            // if (isEdit) {

            // }
            // console.log("ResponseId:", resp.success[0])
            // if (resp.success.length === 0) {
            //     // navigate(`/merchant/customer/all_cust_dashboard/add_servicing/`)
            //     toast.error('Autofill is not available')
            //     return
            // }
            // const newObject = {};
            // for (const key in resp.success[0]) {
            //     if (resp.success[0].hasOwnProperty(key) && resp.success[0][key] !== null) {
            //         newObject[key] = resp.success[0][key];
            //     }
            // }
            // // console.log('AfterRemovingNullId', newObject);
            // setFormData(prefData => ({
            //     ...prefData,
            //     mainForm: {
            //         ...prefData.mainForm,
            //         // ...newObject,
            //         // job_card_date: prefData?.job_card_date?.substring(0, 10),
            //         // service_expiry_date: prefData?.service_expiry_date?.substring(0, 10),
            //         // service_invoice_date: prefData?.service_invoice_date?.substring(0, 10),
            //         // updated_at: prefData?.updated_at?.substring(0, 10)
            //     }
            // }))
        }
        // if (isEdit) {

        // }
        // // form_data.append("xircls_customer_id", func_id)
        // form_data.append('tab_type', 'servicing')
        // // form_data.append('edit_type', !isEdit ? "is_customer_detail" : 'is_servicing')
        // fetch(url, {
        //     method: "POST",
        //     body: form_data
        // })

    }

    const postData = (btn) => {
        // const url = new URL(`${crmURL}/customers/merchant/jmd-servicing-customers/`)
        const form_data = new FormData()
        Object.entries(formData.mainForm).map(([key, value]) => {
            form_data.append(key, value)
        })
        form_data.append("press_btn", "SAVE")
        if (isEdit) {
            form_data.append("servicing_id", id)
        }

        // fetch(url, {
        //     method: "POST",
        //     body: form_data
        // })
        // .then((response) => {
        //     return response.json()
        // })
        postReq("crm_servicing_customers", form_data, crmURL)
            .then((resp) => {
                console.log("Response:", resp)
                toast.success('Customer Service saved successfully')
                if (btn === "SAVE&CLOSE") {
                    navigate(-1)
                } else {
                    resp.data.is_edit_url ? navigate(`/merchant/customers/edit_service/${resp.data.servicing_code}?type=edit`) : navigate(`/merchant/customer/all_cust_dashboard/add_servicing/`)

                }
                fetchServiceData(resp.servicing_code)
            })
            .catch((error) => {
                console.error("Error:", error)
                if (error.message === 'Customer Service already exists') {
                    toast.error('Customer Service already exists')
                } else {
                    toast.error('Failed to save customer')
                }
            })
    }

    const getCountries = () => {
        getReq("countries")
            .then((resp) => {
                console.log(resp)
                setCountry(
                    resp.data.data.countries.map((curElem) => {
                        return { value: `${curElem.name}`, label: `${curElem.name}` }
                    })
                )
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const selectCustomer = () => {
        // if () {
        setFormData(prev => ({ ...prev, mainForm: { ...prev.mainForm, customer: (id && isCustomer) ? id : formData?.mainForm?.xircls_customer_id } }))
        const form_data = new FormData()
        form_data.append("id", (id && isCustomer) ? id : formData?.mainForm?.xircls_customer_id)
        // "SHIVAM KALE"
        getReq(`fetch_vehicle_number`, `/?id=${(id && isCustomer) ? id : formData?.mainForm?.xircls_customer_id}`, crmURL)
            .then((resp) => {
                console.log("Response: selectCustomer", resp)
                const vehicleOptions = resp.data.car_variant
                    .map((vehicle) => ({
                        value: vehicle.id,
                        label: vehicle.registration_number
                    }))
                setVehicleOptions(vehicleOptions)
            })
            .catch((error) => {
                console.error("Error:", error)
                    (error.message) ? toast.error(error.message) : toast.error(error)
            })
        // }
    }

    useEffect(() => {
        if (formData?.mainForm?.xircls_customer_id) {
            console.log("pppp")
            selectCustomer()
        }
    }, [formData?.mainForm?.xircls_customer_id])

    const postNewCustomerData = () => {
        // console.log(customerFormData)
        const url = new URL(`${crmURL}/customers/merchant/add_customer/`)
        const form_data = new FormData()
        Object.entries(formData.addForm).map(([key, value]) => {
            console.log(key, ": ", value)
            form_data.append(key, value)
        })
        form_data.append("dropdown", 'regular')
        form_data.append("pin", 'INsdfsdfsDV')
        form_data.append("entry_point", 'INDV')
        form_data.append("press_btn", 'SAVE & CLOSE')

        fetch(url, {
            method: "POST",
            body: form_data
        })
            .then((response) => {
                if (!response.ok) {
                    if (response.status === 409) {
                        throw new Error('Customer already exists')
                    }
                    else {
                        toast.error(`HTTP error! Status: ${response.status}`)
                        throw new Error(`HTTP error! Status: ${response.status}`)
                    }
                }
                return response.json()
            })
            .then((resp) => {
                console.log("Response:", resp)
                toast.success('Customer saved successfully')
                handleClose('customer')
                // fetchCustomerData(currentPage, null, () => { })

            })
            .catch((error) => {
                console.error("Error:", error)
                if (error.message === 'Customer already exists') {
                    toast.error('Customer already exists')
                } else {
                    toast.error('Failed to save customer')
                }
            })
    }

    useEffect(() => {

        // fetchCustomerData(currentPage, null, () => { })
        getCustomer()
        getCountries()
        if (id) {
            setFormData({ ...formData, main: { ...formData.main, xircls_customer_id: id } })
            fetchServiceData(id)
            // selectCustomer()
        }
    }, [])

    const handleInputChange = (e, keyType) => {
        console.log(e)
        setFormData(prevData => ({ ...prevData, [keyType]: { ...prevData[keyType], [e.target.name]: e.target.value } }))
    }

    // const handleAddInputChange = (e, keyType) => {
    //     console.log(e)
    //     setFormData(prevData => ({ ...prevData, [keyType]: { ...prevData[keyType], [e.target.name]: e.target.value } }))
    // }

    const handleClose = (type) => (type === 'customer') && (setIsHidden(false))
    const handleShow = (type) => (type === 'customer') && setIsHidden(true)

    // const handleSubmitSection = (event) => {
    //     event.preventDefault()
    //     // postData()
    // }

    const handleCustomerSubmitSection = (event) => {
        event.preventDefault()
        postNewCustomerData()
    }
    const handleSubmit = (event, btn) => {
        event.preventDefault()
        postData(btn)
    }

    const titleOptions = [
        { value: 'mr', label: 'Mr.' },
        { value: 'ms', label: 'Ms.' },
        { value: 'mrs', label: 'Mrs.' }
    ]

    const CustomSelectComponent = ({ innerProps, children }) => (
        <div {...innerProps} className="position-absolute w-100 bg-white border">
            <p className="m-1">
                <a
                    onClick={() => handleShow("customer")}
                    className="link-success link-underline-opacity-0 "
                >
                    Add New Customer
                </a>
            </p>
            {children}
        </div>
    )

    // const handleCustomerSubmit = (event) => {
    //     event.preventDefault()

    //     const checkForm = validForm(mainFormvalueToCheck, formData.addForm); // Use mainFormvalueToCheck for validation
    //     console.log(checkForm)

    //     if (checkForm.isValid) {
    //         console.log('Form is valid')
    //         postNewCustomerData()
    //     }
    // }

    const handleSubmitSection = async (e, action) => {
        e.preventDefault();
        const checkForm = validForm(mainFormvalueToCheck, formData.mainForm); // Use mainFormvalueToCheck for validation
        console.log({ checkForm });

        if (checkForm) {
            postData(action)
        }
    }


    const postAddNewCustomerData = () => {
        console.log(formData.addForm)
        const form_data = new FormData()
        Object.entries(formData.addForm).map(([key, value]) => {
            form_data.append(key, value)
        })
        form_data.append("dropdown", 'regular')
        form_data.append("pin", 'INsdfsdfsDV')
        form_data.append("entry_point", 'INDV')
        form_data.append("press_btn", 'SAVE & CLOSE')
        postReq('add_customer', form_data)
            .then((resp) => {
                console.log("Response:", resp)
                toast.success('Customer saved successfully')
                const addForm = { ...formData.addForm }
                Object.keys(formData.addForm).forEach((key) => {
                    addForm[key] = ""
                })
                setFormData(prev => {
                    return { ...prev, addForm }
                })
                handleClose("customer")
                getCustomer()

            })
            .catch((error) => {
                console.error("Error:", error)
                if (error.message === 'Customer already exists') {
                    toast.error('Customer already exists')
                } else {
                    toast.error('Failed to save customer')
                }
            })
    }


    const handleAddSubmitSection = (e, action) => {
        e.preventDefault();

        const checkForm = validForm(addFormvalueToCheck, formData.addForm); // Use mainFormvalueToCheck for validation
        console.log(checkForm);

        if (checkForm) {
            const emailCheck = validateEmail(formData.addForm.email)
            if (!emailCheck) {
                // document.getElementById('email_val').innerHTML = 'Invaild email ID'
                toast.error("Invaild email ID")
            } else {
                postAddNewCustomerData()
            }
            // const url = new URL(`${crmURL}/customers/merchant/add_company_details/`)
            // const form_data = new FormData()
            // Object.entries(newCompany).map(([key, value]) => {
            //     form_data.append(key, value)
            //     form_data.append('add_company_from_add', 'yes')
            //     // form_data.append("press_btn", 'SAVE')
            // })

            // postReq("add_company_details", form_data)
            //     .then((resp) => {
            //         console.log({ resp })
            //         if (resp.status === 409) {
            //             throw new Error('Customer already exists')
            //         } else {
            //             throw new Error(`HTTP error! Status: ${resp.status}`)
            //         }
            //     })
            //     .catch((error) => {
            //         console.error("Error:", error)

            //         // Display toast for 409 status code
            //         if (error.message === 'Customer already exists') {
            //             toast.error('Customer already exists')
            //         }
            //     })
        }
    }


    const AddCustomerForm = (
        <form onSubmit={handleCustomerSubmitSection}>
            <Row>
                <Col md={12} className="mt-2">
                    <h4 className="mb-0">Add Customer</h4>
                </Col>
                <Col md={12} className="mt-2">
                    <label htmlFor="basicDetails-title" className="form-label" style={{ margin: '0px' }}>
                        Title
                    </label>
                    <Select
                        id="basicDetails-title"
                        options={titleOptions}
                        closeMenuOnSelect={true}
                        value={titleOptions.find(option => option.value === formData.addForm?.title) ?? ''}
                        onChange={(event) => {
                            const e = { target: { name: "title", value: event.value } };
                            handleInputChange(e, "addForm")
                            // addInputChangeHandler({ target: { name: 'title', value: e?.value } });
                        }}
                    />

                    <p id="title_val" className="text-danger m-0 p-0 vaildMessage"></p>
                </Col>
                <Col md={12} className="mt-2">
                    <label htmlFor="basicDetails-first-name">
                        First Name
                    </label>
                    <input placeholder="First Name" type='text' id='basicDetails-first-name' name='cust_first_name' className="form-control"
                        value={formData.addForm?.cust_first_name}
                        onChange={(e) => {
                            handleInputChange(e, "addForm")
                            // addInputChangeHandler(e)
                        }}
                    />
                    <p id="cust_first_name_val" className="text-danger m-0 p-0 vaildMessage"></p>
                </Col>
                <Col md={12} className="mt-2">
                    <label htmlFor="basicDetails-last-name">
                        Last Name
                    </label>
                    <input placeholder="Last Name" type='text' id='basicDetails-last-name' name='cust_last_name' className="form-control"
                        value={formData.addForm?.cust_last_name}
                        onChange={(e) => {
                            handleInputChange(e, "addForm")
                            // addInputChangeHandler(e)
                        }}

                    />
                    <p id="cust_last_name_val" className="text-danger m-0 p-0 vaildMessage"></p>
                </Col>
                <Col md={12} className="mt-2">
                    <label htmlFor="basicDetails-email">
                        Email
                    </label>
                    <input placeholder="Email" type='text' id='basicDetails-email' name='email' className="form-control"
                        value={formData.addForm?.email}
                        onChange={(e) => {
                            handleInputChange(e, "addForm")
                            // addInputChangeHandler(e)
                        }}
                    />
                    <p id="email_val" className="text-danger m-0 p-0 vaildMessage"></p>
                </Col>
                <Col md={12} className="mt-2">
                    <label htmlFor="basicDetails-mobile">
                        Mobile Number
                    </label>
                    <input placeholder="Mobile Number" type='tel' maxLength={10} id='basicDetails-mobile' name='phone_no' className="form-control"
                        value={formData.addForm?.phone_no}
                        // onChange={(e) => {
                        //     handleInputChange(e, "addForm")
                        //     // addInputChangeHandler(e)
                        // }}
                        onChange={(e) => {
                            if (!isNaN(e.target.value)) {
                                handleInputChange(e, "addForm")
                                console.log("this is a number")
                            }
                        }}
                    />
                    <p id="phone_no_val" className="text-danger m-0 p-0 vaildMessage"></p>

                </Col>
                <Col md={12} className="mt-2">
                    <label htmlFor="address-1-country">Country</label>
                    <Select
                        options={country}
                        inputId="aria-example-input"
                        closeMenuOnSelect={true}
                        name="country"
                        value={country?.filter($ => $.value === formData?.addForm?.country)}
                        placeholder="Select Country"
                        // onChange={(e) => setCustomerFormData(prevData => ({ ...prevData, country: e.label }))}
                        onChange={(event) => {
                            const e = { target: { name: "country", value: event.value } }
                            handleInputChange(e, "addForm")
                            // inputChangeHandler({ target: { name: 'country', value: e?.value } })
                        }}
                    />
                    <p id="country_val" className="text-danger m-0 p-0 vaildMessage"></p>

                </Col>
                <Col md={12} className="mt-2">
                    <label htmlFor="address-1-city">City</label>
                    <input
                        placeholder="City"
                        type="text"
                        id="address-1-city"
                        name="city"
                        className="form-control"
                        value={formData.addForm.city}
                        onChange={(e) => {
                            handleInputChange(e, "addForm")
                            // addInputChangeHandler(e)
                        }}
                    />
                    <p id="city_val" className="text-danger m-0 p-0 vaildMessage"></p>
                </Col>
                <Col md={12} className="mt-2">
                    <label htmlFor="address-1-state">State</label>
                    <input
                        placeholder="State"
                        type="text"
                        id="address-1-state"
                        name="state"
                        className="form-control"
                        value={formData.addForm.state}
                        onChange={(e) => {
                            handleInputChange(e, "addForm")
                            // addInputChangeHandler(e)
                        }}
                    />
                    <p id="state_val" className="text-danger m-0 p-0 vaildMessage"></p>

                </Col>
                <Col md={12} className="mt-2">
                    <label htmlFor="address-1-pincode">Pincode</label>
                    <input
                        placeholder="Pincode"
                        type="text"
                        id="address-1-pincode"
                        name="pincode"
                        className="form-control"
                        value={formData.addForm.pincode}
                        // onChange={(e) => {
                        //     handleInputChange(e, "addForm")
                        // }}
                        onChange={(e) => {
                            if (!isNaN(e.target.value)) {
                                handleInputChange(e, "addForm")
                                console.log("this is a number")
                            }
                        }}
                    />
                    <p id="pincode_val" className="text-danger m-0 p-0 vaildMessage"></p>

                </Col>

                <div className='d-flex justify-content-between mt-2'>
                    <div>
                        <button className="btn btn-primary" type="submit" onClick={(e) => handleAddSubmitSection(e)}>Add</button>
                        <button className="btn btn-primary ms-2" type="button">Cancel</button>
                    </div>
                    <div>
                        {/* <button className="btn btn-primary" type="submit" onClick={handleSubmitSection1}>Save</button>
                                <button className="btn btn-primary ms-2" type="button">Save & Close</button> */}
                        {/* <button className="btn btn-primary ms-2" type="button" onClick={handleNext}>Next</button> */}
                    </div>
                </div>
            </Row>
        </form>
    )

    const handleChange = (e, formType) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [formType]: {
                ...prevData[formType],
                [name]: value
            }
        }))
    }
    return (
        <div >
            <Offcanvas show={isHidden} onHide={() => handleClose('customer')} placement="end">
                <Offcanvas.Header closeButton>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {AddCustomerForm}
                </Offcanvas.Body>
            </Offcanvas>
            {
                !isLoading ? (
                    <form>
                        <Row>
                            <Col md={12} className="mt-2">
                                <h4 className="mb-0">{(id && isEdit) ? 'Edit Servicing' : 'Add Servicing'}</h4>
                            </Col>
                            <Col md={6} className="mt-2">
                                <label
                                    htmlFor="company-name"
                                    className="form-label"
                                    style={{ margin: "0px" }}
                                >
                                    Customer Name
                                </label>
                                <Select
                                    placeholder='Select Customer'
                                    id='company-name'
                                    options={customerList}
                                    closeMenuOnSelect={true}
                                    // onMenuScrollToBottom={() => fetchCustomerData(currentPage, null, () => { })}
                                    components={{ Menu: CustomSelectComponent }}
                                    onChange={(event) => {
                                        // selectCustomer()
                                        const e = { target: { name: 'xircls_customer_id', value: event?.value } }
                                        handleInputChange(e, "mainForm")
                                    }}
                                    value={customerList?.filter($ => Number($.value) === Number(formData?.mainForm?.xircls_customer_id))}
                                    isDisabled={isCustomer}
                                />
                                <p id="xircls_customer_id_val" className="text-danger m-0 p-0 vaildMessage"></p>
                            </Col>
                            <Col md={6} className="mt-2">
                                <label
                                    htmlFor="vehicle-name"
                                    className="form-label"
                                    style={{ margin: "0px" }}
                                >
                                    Vehicle Number
                                </label>
                                <Select
                                    placeholder='Vehicle Number'
                                    id="vehicle-name"
                                    options={vehicleOptions}
                                    // defaultValue={vehicleOptions[0]}
                                    value={vehicleOptions.filter((option) => String(option.value) === String(formData.mainForm?.vehicle))}
                                    // isDisabled={formData.mainForm?.vehicle}
                                    closeMenuOnSelect={true}
                                    // onChange={e => setFormData(prev => ({ ...prev, vehicle: e.value }))}
                                    onChange={(event) => {
                                        const e = { target: { name: "vehicle", value: event.value } }
                                        handleInputChange(e, "mainForm")
                                    }}
                                />
                                <p id="vehicle_val" className="text-danger m-0 p-0 vaildMessage"></p>
                            </Col>
                            <Col md={6} className="mt-2">
                                <label htmlFor="advisor-name">Service Advisor</label>
                                <input
                                    placeholder="Service Advisor"
                                    type="text"
                                    id="advisor-name"
                                    name="service_advisor"
                                    className="form-control"
                                    value={formData.mainForm.service_advisor ?? ""}
                                    onChange={(e) => {
                                        handleInputChange(e, "mainForm")
                                    }}
                                />
                                <p id="service_advisor_val" className="text-danger m-0 p-0 vaildMessage"></p>
                            </Col>
                            <Col md={6} className="mt-2">
                                <label htmlFor="job-card-date">Job Card Date</label>
                                {/* <input
                            placeholder="Job Card Date"
                            type="date"
                            id="job-card-date"
                            name="job_card_date"
                            className="form-control"
                            value={formData.mainForm.job_card_date ?? ""}
                            onChange={(e) => {
                                handleInputChange(e, "mainForm")
                            }}
                        /> */}

                                <Flatpickr
                                    name="job_card_date"
                                    className='form-control'
                                    value={formData.mainForm.job_card_date ?? ""}
                                    onChange={(date) => {
                                        setFormData({ ...formData, mainForm: { ...formData.mainForm, job_card_date: moment(date[0]).format("YYYY-MM-DD") } })
                                    }}
                                />
                                <p id="job_card_date_val" className="text-danger m-0 p-0 vaildMessage"></p>

                            </Col>
                            <Col md={6} className="mt-2">
                                <label htmlFor="service-invoice-date">Service Invoice Date</label>
                                {/* <input
                            placeholder="Service Invoice Date"
                            type="date"
                            id="service-invoice-date"
                            name="service_invoice_date"
                            className="form-control"
                            value={formData.mainForm.service_invoice_date ?? ""}
                            onChange={(e) => {
                                handleInputChange(e, "mainForm")
                            }}
                        /> */}

                                <Flatpickr
                                    name="job_card_date"
                                    className='form-control'
                                    value={formData.mainForm.service_invoice_date}
                                    onChange={(date) => {
                                        setFormData({ ...formData, mainForm: { ...formData.mainForm, service_invoice_date: moment(date[0]).format("YYYY-MM-DD") } })
                                    }}
                                />
                                <p id="service_invoice_date_val" className="text-danger m-0 p-0 vaildMessage"></p>

                            </Col>
                            <Col md={6} className="mt-2">
                                <label htmlFor="next-service-date">Next Service Date</label>
                                {/* <input
                            placeholder="Next Service Date"
                            type="date"
                            id="next-service-date"
                            name="service_expiry_date"
                            className="form-control"
                            value={formData.mainForm.service_expiry_date ?? ""}
                            onChange={(e) => {
                                handleInputChange(e, "mainForm")
                            }}
                        /> */}

                                <Flatpickr
                                    name="job_card_date"
                                    className='form-control'
                                    value={formData.mainForm.next_service_date ?? ""}
                                    onChange={(date) => {
                                        setFormData({ ...formData, mainForm: { ...formData.mainForm, service_expiry_date: moment(date[0]).format("YYYY-MM-DD") } })
                                    }}
                                />
                                <p id="service_expiry_date_val" className="text-danger m-0 p-0 vaildMessage"></p>

                            </Col>
                            <Col md={6} className="mt-2">
                                <label htmlFor="service-invoice-amount">Service Invoice Amount - ₹</label>
                                <input
                                    placeholder="Service Invoice Amount"
                                    type="text"
                                    id="service-invoice-amount"
                                    name="service_invoice_amount"
                                    className="form-control"
                                    value={formData.mainForm.service_invoice_amount ?? ""}
                                    // onChange={(e) => {
                                    //     handleInputChange(e, "mainForm")
                                    // }}
                                    onChange={(e) => {
                                        if (!isNaN(e.target.value)) {
                                            handleInputChange(e, "mainForm")
                                            console.log("this is a number")
                                        }
                                    }}
                                />
                                <p id="service_invoice_amount_val" className="text-danger m-0 p-0 vaildMessage"></p>

                            </Col>
                            <Col xs='12'>
                                <div className='d-flex justify-content-between mt-2'>
                                    <div>
                                        <button className="btn btn-primary" type="button" onClick={() => history.back()}>
                                            Back
                                        </button>
                                        {/* <button className="btn btn-primary ms-2" type="button">Cancel</button> */}
                                    </div>
                                    <div>
                                        <button className="btn btn-primary" type="button" onClick={(e) => handleSubmitSection(e, 'SAVE')} >Save</button>
                                        <button className="btn btn-primary ms-2" type="button" onClick={(e) => handleSubmitSection(e, 'SAVE&CLOSE')}>Save & Close</button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </form>
                ) : (
                    <Container>
                        <div className='d-flex justify-content-center align-items-center w-100'>
                            <Spinner size={'40px'} />
                        </div>
                    </Container>

                )
            }

        </div>
    )
}

export default AddServicing