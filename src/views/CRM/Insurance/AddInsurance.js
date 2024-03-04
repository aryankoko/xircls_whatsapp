/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Card, CardBody, Container, Row, Col } from "reactstrap"
import AsyncSelect from 'react-select/async'
import { crmURL, getReq } from '@src/assets/auth/jwtService'
import axios from "axios"
import Select from "react-select"
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { useParams, useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"
import { baseURL, postReq } from '../../../assets/auth/jwtService'
import { validForm } from '../../Validator'
import Flatpickr from 'react-flatpickr'
import moment from 'moment'
import Spinner from '../../Components/DataTable/Spinner'

const AddInsurance = () => {
    const { id } = useParams()

    const urlParams = new URLSearchParams(location.search)
    const isEdit = urlParams.get("type") === "edit"
    const isCustomer = urlParams.get("type") === "customer"

    // const [type, setType] = useState("")

    const [formData, setFormData] = useState({
        xircls_customer_id: isCustomer ? id : "",
        policy_number: "",
        insurance_type: "Motor",
        insurance_company: "",
        policy_purchase_date: "",
        policy_expiry_date: "",
        executive_name: "",
        amount: "",
        add_on_plan: "",
        insured_declared_value: "",
        own_damage: "",
        ncb_no_claim_bonus: "",
        pm_payment_mode: "",
        ncb_declaration: "",
        third_party_date: "",
        inbuilt_discount: "",
        net_premimum: "",
        health_insurance: "",
        insurance_product_name: ""
    })
    const [customerFormData, setCustomerFormData] = useState({
        title: "",
        cust_first_name: "",
        cust_last_name: "",
        email: "",
        phone_no: "",
        country: "",
        city: "",
        state: "",
        pincode: ""
    })

    console.log({ formData, customerFormData }, "formData")

    const [productFormData, setProductFormData] = useState({})
    const [isAddProductHidden, setIsAddProductHidden] = useState(false)
    const [isHidden, setIsHidden] = useState(false)
    const [productOptions, setProductOptions] = useState([])
    const [usedProductOptions, setUsedProductOptions] = useState([])
    const [vehicleOptions, setVehicleOptions] = useState([])
    const [country, setCountry] = useState("")
    const [productModelOption, setProductModelOption] = useState([])
    const [productVariantOption, setProductVariantOption] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    // const [allOptions, setAllOptions] = useState([])
    const [customerList, setCustomerList] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate()

    const insuranceFormToCheck = [
        {
            name: 'xircls_customer_id',
            message: 'Please select a Customer',
            type: 'string',
            id: 'xircls_customer_id'
        },
        {
            name: 'insurance_type',
            message: 'Please select an Insurance Type',
            type: 'string',
            id: 'insurance_type'
        },
        // {
        //    name: 'insurance_product_name',
        //    message: 'Please select a Product Name',
        //    type: 'string',
        //    id: 'insurance_product_name'
        // },
        // {
        //    name: 'vehicle',
        //    message: 'Please select a Vehicle Type',
        //    type: 'string',
        //    id: 'vehicle'
        // },
        {
            name: 'policy_number',
            message: 'Please enter your Policy Number',
            type: 'string',
            id: 'policy_number'
        },
        {
            name: 'insurance_company',
            message: 'Please enter you Insurance Company Name',
            type: 'string',
            id: 'insurance_company'
        },
        {
            name: 'policy_purchase_date',
            message: 'Please enter you Insurance Company Name',
            type: 'string',
            id: 'policy_purchase_date'
        }
    ]

    const addCustomerFormToCheck = [
        {
            name: 'title',
            message: 'Please select a Title',
            type: 'string',
            id: 'title'
        },
        {
            name: 'cust_first_name',
            message: 'Please enter your First Name',
            type: 'string',
            id: 'cust_first_name'
        },
        {
            name: 'cust_last_name',
            message: 'Please enter your Last Name',
            type: 'string',
            id: 'cust_last_name'
        },
        {
            name: 'email',
            message: 'Please enter your email',
            type: 'email',
            id: 'email'
        },
        {
            name: 'phone_no',
            message: 'Please enter your Phone Number',
            type: 'number',
            id: 'phone_no'
        }
    ]

    const addProductFormToCheck = [
        {
            name: 'brand',
            message: 'Please select a Brand',
            type: 'string',
            id: 'brand'
        }
        // {
        //     name: 'carmodel',
        //     message: 'Please select a Model',
        //     type: 'string',
        //     id: 'carmodel'
        // }
    ]

    const handleInputChange = (e, type = "formData") => {
        if (type === "formData") {
            setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
        } else if (type === "product") {
            setProductFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
        } else {
            setCustomerFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
        }
    }

    // const handleInputChangeCustomerFrom = (e) => {
    //     setCustomerFormData({...customerFormData, [e.target.name]: e.target.value})
    // }

    const handleChange = (options, actionMeta, check, type = "formData") => {
        if (check) {
            const option_list = options.map((cur) => {
                return cur.value
            })
            if (type === "formData") {
                setFormData(prev => ({ ...prev, [actionMeta.name]: option_list }))

            } else {
                setCustomerFormData(prev => ({ ...prev, [actionMeta.name]: option_list }))
            }
        } else {
            if (type === "formData") {
                setFormData(prev => ({ ...prev, [actionMeta.name]: options.value }))
            } else if (type === "product") {
                setProductFormData(prev => ({ ...prev, [actionMeta.name]: options.value }))
            } else {
                setCustomerFormData(prev => ({ ...prev, [actionMeta.name]: options.value }))
            }

        }

    }

    const handleClose = (type) => {
        (type === 'customer') ? (setIsHidden(false)) : setIsAddProductHidden(false)
        setProductModelOption([])
        setProductVariantOption([])
    }
    const handleShow = (type) => ((type === 'customer') ? setIsHidden(true) : setIsAddProductHidden(true))

    // const handleChangeCustomerForm = (options, actionMeta, check) => {
    //     if (check) {
    //         const option_list = options.map((cur) => {
    //             return cur.value
    //         })
    //         setCustomerFormData({ ...customerFormData, [actionMeta.name]: option_list })
    //     } else {
    //         setCustomerFormData({ ...formData, [actionMeta.name]: options.value })
    //     }

    // }

    const fetchInsuranceData = (id) => {
        // const url = new URL(`${crmURL}/customers/merchant/get_view_customer/`)
        const form_data = new FormData()
        if (isEdit) {
            form_data.append("id", id)
            form_data.append('edit_type', 'is_insurance')

            postReq('get_customer_insurance', form_data, crmURL)
                .then((resp) => {
                    console.log("ResponseId:", resp.data.success[0])
                    const data = resp.data.success[0]
                    const updatedData = {
                        xircls_customer_id: data?.xircls_customer,
                        insurance_type: "Motor",
                        policy_number: data?.policy_number,
                        insurance_product_name: data?.insurance_product_name,
                        // insurance_type: data?.insurance_type,
                        insurance_company: data?.insurance_company,
                        policy_purchase_date: data?.policy_purchase_date,
                        policy_expiry_date: data?.policy_expiry_date,
                        executive_name: data?.executive_name,
                        amount: data?.amount,
                        add_on_plan: data?.add_on_plan,
                        insured_declared_value: data?.insured_declared_value,
                        own_damage: data?.own_damage,
                        ncb_no_claim_bonus: data?.ncb_no_claim_bonus,
                        pm_payment_mode: data?.pm_payment_mode,
                        ncb_declaration: data?.ncb_declaration,
                        third_party_date: data?.third_party_date,
                        inbuilt_discount: data?.inbuilt_discount,
                        net_premimum: data?.net_premimum,
                        health_insurance: data?.health_insurance
                    }
                    setFormData(updatedData)
                })
                .catch((error) => {
                    console.error("Error:", error)
                    toast.error('Failed to fetch Servicing Detail')
                })
        }
    }

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

    const postData = (btn) => {
        const form_data = new FormData()
        Object.entries(formData).map(([key, value]) => {
            form_data.append(key, value)
        })
        form_data.append("press_btn", btn)
        if (isEdit) {
            form_data.append("insurance_id", id)
        }
        postReq('add_insurance', form_data, crmURL)
            .then((resp) => {
                console.log("Response:", resp)
                toast.success('Insurance saved successfully')
                resp.data.is_edit_url ? navigate(`/merchant/customers/insurance/edit_insurance/${resp.data.insurance_code}?type=edit`) : navigate(`/merchant/customers/insurance/`)
                fetchInsuranceData(resp.data.insurance_code)
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

    const postNewCustomerData = () => {
        console.log(customerFormData)
        const form_data = new FormData()
        Object.entries(customerFormData).map(([key, value]) => {
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

    const changeProductName = (data) => {
        console.log(data)
        const productOptions = data.car_variant.map(item => {
            const value = item[0]
            const slug = item[4]
            const label = item.slice(1).filter(Boolean).join(' -- ')
            return {
                value,
                label,
                slug
            }
        })
        setProductOptions(productOptions)

        setUsedProductOptions(data.car_variant.map(item => {
            const value = item[0]
            const label = <div style={{ textTransform: "capitalize" }}>{item[4]}</div>
            return {
                value,
                label
            }
        }))
        // const V_type = data.car_variant.map((ele) => {
        //     return { value: ele[4], label: ele[4], slug: ele[0] }
        // })
        // setType(V_type)
    }

    const changeVehicleOptions = (data) => {
        const vehicleOptionss = data.car_variant.map(item => {
            return {
                value: item[4],
                label: item[4] === null ? 'null' : item[4]
            }
        })
        setVehicleOptions(vehicleOptionss)
    }

    const selectCustomer = (value, actionMeta, check) => {
        setProductFormData(prev => ({ ...prev, insurance_product_name: '' }))
        setProductOptions([])
        // handleChange(value, { name: "xircls_customer_id" }, check)
        setProductFormData(prev => ({ ...prev, xircls_customer_id: formData?.xircls_customer_id }))
        // setFormData(prevData => ({ ...prevData, customer_name: value.label, xircls_customer_id: formData?.xircls_customer_id }))
        const form_data = new FormData()
        form_data.append("id", formData?.xircls_customer_id)
        // "SHIVAM KALE"
        getReq(`fetch_vehicle_details`, `?id=${formData?.xircls_customer_id}`, crmURL)
            .then((resp) => {
                console.log("Response:", resp)
                // setType(resp.data.car_variant.map((ele) => ele[4]))
                if (resp.data.car_variant) {
                    changeProductName(resp.data)
                    changeVehicleOptions(resp.data)

                }
            })
            .catch((error) => {
                console.error("Error:", error)
                toast.error('Something went wrong')
                error.message ? toast.error(error.message) : toast.error(error)
            })
    }

    const postVehicleDetails = () => {
        const form_data = new FormData()
        Object.entries(productFormData).map(([key, value]) => {
            form_data.append(key, value)
        })
        form_data.append("press_btn", 'SAVE')

        postReq('add_vehicle', form_data, crmURL)
            .then((resp) => {
                console.log("Response:", resp)
                toast.success('Vehicle saved successfully')
                handleClose('product')
                selectCustomer()
            })
            .catch((error) => {
                console.error("Error:", error)
                toast.error('Failed to save Vehicle')
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

    // const fetchCustomerData = async (page, inputValue, callback) => {
    //     // console.log(callback, 'callback2')
    //     try {
    //         const response = await axios.get(
    //             `${baseURL}/customers/merchant/get_customer_details/?page=${page}`
    //         )
    //         const successData = response.data.success
    //         if (successData && Array.isArray(successData)) {
    //             const customerOptions = successData
    //                 .filter((item) => item.customer_name !== "")
    //                 .map((customer) => ({
    //                     value: customer.id,
    //                     label: customer.customer_name
    //                 }))
    //             const option = [...allOptions, ...customerOptions]
    //             console.log(option, "option")
    //             setAllOptions(option)
    //             callback(option)
    //             // setCurrentPage((prevPage) => prevPage + 1)
    //             setCurrentPage((prevPage) => {
    //                 const nextPage = Math.min(prevPage + 1, (response.data.total_count / 100))
    //                 return nextPage
    //             })
    //         } else {
    //             console.error("Invalid or missing data in the API response")
    //             callback([])
    //         }
    //     } catch (error) {
    //         console.error("Error fetching data:", error.message)
    //     }
    // }

    useEffect(() => {
        getCountries()
        // fetchCustomerData(currentPage, null, () => { })
        if (id) {
            fetchInsuranceData(id)
        }

        getCustomer()
    }, [])

    const selectChange = (value, actionMeta) => {
        console.log('getProductOptions runned')
        const form_data = new FormData()
        if (actionMeta.name === 'brand') {
            form_data.append("brand", value.value)
            handleChange(value, actionMeta, false, "product")
            setProductModelOption([])
            setProductVariantOption([])
        } else if (actionMeta.name === 'carmodel') {
            form_data.append("carmodel", value.value)
            actionMeta.name = 'car_model'
            handleChange(value, actionMeta, false, "product")
            setProductVariantOption([])
        }
        postReq('fetch_car_details', form_data, crmURL)
            .then((resp) => {
                console.log("Response ooption:", resp)
                if (resp.data.car_model) {
                    const productModelOptions = []
                    resp.data.car_model.forEach((item) => {
                        if (item === "") {
                            return
                        }
                        productModelOptions.push({
                            value: item,
                            label: item
                        })
                    })
                    setProductModelOption(productModelOptions)
                }
                if (resp.data.car_variant) {
                    const variantOptions = []
                    resp.data.car_variant.map((item) => {
                        if (item === "") {
                            return
                        }
                        variantOptions.push({
                            value: item,
                            label: item
                        })
                    })
                    setProductVariantOption(variantOptions)
                }
            })
            .catch((error) => {
                console.log(error)
                toast.error('Something went wrong!')
            })
    }

    const loadBrandOptions = (inputValue, callback) => {
        // const getUrl = new URL(`${crmURL}/vehicle/fetch_car_details/`)
        getReq('fetch_car_details', ``, crmURL)
            .then((response) => {
                const successData = response.data.car_brand
                const brandOptions = successData
                    .filter((item) => item[0] !== "")
                    .map((item) => ({
                        value: item[0],
                        label: item[0]
                    }))
                console.log(brandOptions)
                callback(brandOptions)
            })
            .catch((error) => {
                console.error("Error fetching data:", error.message)
                callback([])
            })
    }

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

    const CustomProductSelectComponent = ({ innerProps, children }) => (
        <div {...innerProps} className="position-absolute w-100 bg-white border">
            <p className="m-1">
                {formData.xircls_customer_id &&
                    <a
                        onClick={() => handleShow("product")}
                        className="link-success link-underline-opacity-0"
                    >
                        Add New Product
                    </a>}
            </p>
            {children}
        </div>
    )

    const handleSubmitSection = (event, btn) => {
        event.preventDefault()
        const checkForm = validForm(insuranceFormToCheck, formData)
        if (checkForm) {
            // console.log('Validated Insurance Form')
            postData(btn)
        }
    }

    const handleCustomerSubmitSection = (event) => {
        event.preventDefault()
        const checkForm = validForm(addCustomerFormToCheck, customerFormData)
        if (checkForm) {
            // console.log('Validated Customer Form')
            postNewCustomerData()
        }
    }

    const handleProductSubmit = () => {
        const checkForm = validForm(addProductFormToCheck, productFormData)
        if (checkForm) {
            // console.log('Validated Product Form')
            postVehicleDetails()
        }
    }

    const insuranceOptions = [
        // { label: 'Select Insurance', value: '' },
        // { label: 'Health', value: 'Health' },
        { label: 'Motor', value: 'Motor' }
        // { label: 'Travel', value: 'Travels' },
        // { label: 'Life', value: 'Life' },
        // { label: 'Personal Accident', value: 'Personal Accident' },
        // { label: 'Fire Burglary', value: 'Fire Burglary' },
        // { label: 'Lease Car', value: 'Lease Car' }
    ]

    const titleOptions = [
        { value: 'mr', label: 'Mr.' },
        { value: 'ms', label: 'Ms.' },
        { value: 'mrs', label: 'Mrs.' }
    ]

    const vehicleTypeOptions = [
        { value: 'new', label: 'New Car' },
        { value: 'used', label: 'Used Car' }
        // { value: 'renewal', label: 'Renewal' },
        // { value: 'rollover', label: 'Rollover' },
        // { value: 'data', label: 'Data' },
    ]

    const InnerStyles = (
        <style>
            {`
                .customer-profile > div {
                    z-index: 9
                }
                .offcanvas{
                    --bs-offcanvas-width: 400px
                    --bs-offcanvas-width: 400px
                }
            `}
        </style>
    )

    const AddCustomerForm = (
        <form onSubmit={handleCustomerSubmitSection}>
            <Row>
                <Col md={12} className="mt-2">
                    <h4 className="mb-0">Add Customer</h4>
                </Col>
                <Col md={12} className="mt-2">
                    <label htmlFor="basicDetails-title" className="" style={{ margin: '0px' }}>
                        Title
                    </label>
                    <Select
                        id="basicDetails-title"
                        name="title"
                        options={titleOptions}
                        closeMenuOnSelect={true}
                        value={titleOptions.find(option => option.value === customerFormData.title) ?? ''}
                        onChange={(value, actionMeta) => handleChange(value, actionMeta, false, "customerData")}
                    />
                    <p id="title_val" className="text-danger m-0 p-0 vaildMessage"></p>
                </Col>
                <Col md={12} className="mt-2">
                    <label htmlFor="basicDetails-first-name">
                        First Name
                    </label>
                    <input placeholder="First Name" type='text' id='basicDetails-first-name' name='cust_first_name' className="form-control"
                        value={customerFormData?.cust_first_name}
                        // onChange={handleInputChangeCustomerFrom}
                        onChange={(e) => handleInputChange(e, "customerData")}
                    />
                    <p id="cust_first_name_val" className="text-danger m-0 p-0 vaildMessage"></p>
                </Col>
                <Col md={12} className="mt-2">
                    <label htmlFor="basicDetails-last-name">
                        Last Name
                    </label>
                    <input placeholder="Last Name" type='text' id='basicDetails-last-name' name='cust_last_name' className="form-control"
                        value={customerFormData?.cust_last_name}
                        // onChange={handleInputChangeCustomerFrom}
                        onChange={(e) => handleInputChange(e, "customerData")}
                        isDisabled={id}
                    />
                    <p id="cust_last_name_val" className="text-danger m-0 p-0 vaildMessage"></p>
                </Col>
                <Col md={12} className="mt-2">
                    <label htmlFor="basicDetails-email">
                        Email
                    </label>
                    <input placeholder="Email" type='text' id='basicDetails-email' name='email' className="form-control"
                        value={customerFormData?.email}
                        // onChange={handleInputChangeCustomerFrom}
                        onChange={(e) => handleInputChange(e, "customerData")}
                    />
                    <p id="email_val" className="text-danger m-0 p-0 vaildMessage"></p>
                </Col>
                <Col md={12} className="mt-2">
                    <label htmlFor="basicDetails-mobile">
                        Mobile Number
                    </label>
                    <input placeholder="Mobile Number" type='tel' maxLength={10} id='basicDetails-mobile' name='phone_no' className="form-control"
                        value={customerFormData?.phone_no}
                        // onChange={handleInputChangeCustomerFrom}
                        // onChange={(e) => handleInputChange(e, "customerData")}
                        onChange={(e) => {
                            if (!isNaN(e.target.value)) {
                                handleInputChange(e, "customerData")
                                console.log("this is a number")
                            }
                        }}
                        isDisabled={id}
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
                        placeholder="Select Country"
                        // onChange={(e) => setCustomerFormData(prevData => ({ ...prevData, country: e.label }))}
                        onChange={(value, actionMeta) => handleChange(value, actionMeta, false, "customerData")}
                    />
                </Col>
                <Col md={12} className="mt-2">
                    <label htmlFor="address-1-state">State</label>
                    <input
                        placeholder="State"
                        type="text"
                        id="address-1-state"
                        name="state"
                        className="form-control"
                        value={customerFormData.state}
                        // onChange={handleInputChangeCustomerFrom}
                        onChange={(e) => handleInputChange(e, "customerData")}
                    />
                </Col>
                <Col md={12} className="mt-2">
                    <label htmlFor="address-1-city">City</label>
                    <input
                        placeholder="City"
                        type="text"
                        id="address-1-city"
                        name="city"
                        className="form-control"
                        value={customerFormData.city}
                        // onChange={handleInputChangeCustomerFrom}
                        onChange={(e) => handleInputChange(e, "customerData")}
                    />
                </Col>
                <Col md={12} className="mt-2">
                    <label htmlFor="address-1-pincode">Pincode</label>
                    <input
                        placeholder="Pincode"
                        type="text"
                        id="address-1-pincode"
                        name="pincode"
                        className="form-control"
                        value={customerFormData.pincode}
                        // onChange={handleInputChangeCustomerFrom}
                        // onChange={(e) => handleInputChange(e, "customerData")}
                        onChange={(e) => {
                            if (!isNaN(e.target.value)) {
                                handleInputChange(e, "customerData")
                                console.log("this is a number")
                            }
                        }}
                    />
                </Col>

                <div className='d-flex justify-content-between mt-2'>
                    <div>
                        <button className="btn btn-primary" type="submit">Add</button>
                        <button className="btn btn-primary ms-2" type="button">Cancel</button>
                    </div>
                </div>
            </Row>
        </form>
    )

    const AddNewProductSideForm = (
        <form>
            <Row>
                <Col md={12} className="mt-2">
                    <h4 className="mb-0">Add Product</h4>
                </Col>
                <Col md={12} className="mt-2">
                    <label htmlFor="customer-name">
                        Customer Name
                    </label>
                    {/* <input type='text' id='customer-name' name='customer_name' className="form-control"
                        value={formData?.customer_name}
                        // onChange={handleInputChange} 
                        disabled
                    /> */}

                    {/* <Select
                        id='customer-name'
                        placeholder='Customer Name'
                        // value={{ value: formData?.xircls_customer_id, label: formData?.xircls_customer_id }}
                        value={customerList?.find($ => Number($.value) === Number(formData?.xircls_customer_id))}
                        isDisabled={true}
                    /> */}
                    <Select
                        placeholder='Customer Name'
                        id="insurance-type"
                        options={customerList}
                        closeMenuOnSelect={true}
                        name='xircls_customer_id'
                        value={customerList?.find($ => Number($.value) === Number(formData?.xircls_customer_id))}
                        // onMenuScrollToBottom={() => getCustomer(currentPage, null, () => { })}
                        components={{ Menu: CustomSelectComponent }}
                        onChange={(value, actionMeta) => {
                            // selectCustomer(value, actionMeta, false)
                            setFormData(prevData => ({ ...prevData, xircls_customer_id: value.value }))
                        }}
                        isDisabled={true}
                    // onChange={(value, actionMeta) => handleChange(value, actionMeta, false)}
                    />

                </Col>
                <Col md={12} className="mt-2">
                    <label htmlFor="registration-name">
                        Registration Name
                    </label>
                    <input
                        placeholder='Registration Number'
                        type='text' id='registration-name' name='registration_number' className="form-control"
                        value={productFormData.registration_number}
                        onChange={e => handleInputChange(e, 'product')}
                    />
                </Col>
                <Col md={12} className="mt-2">
                    <label htmlFor="sales-person">
                        Sales Person
                    </label>
                    <input
                        placeholder='Sales Person'
                        type='text' id='sales-person' name='sales_executive' className="form-control"
                        value={productFormData?.sales_executive}
                        onChange={e => handleInputChange(e, 'product')}
                    />
                </Col>
                <Col md={12} className="mt-2">
                    <label htmlFor="vehicle-identification">
                        Vehicle Identification Number (VIN) or Chassis Number
                    </label>
                    <input
                        placeholder='Vehicle Identification Number'
                        type='text' id='vehicle-identification' name='vehicle_number' className="form-control"
                        value={productFormData?.vehicle_number}
                        onChange={e => handleInputChange(e, 'product')}
                    />
                </Col>
                <Col md={12} className="mt-2">
                    <label htmlFor="engine-number">
                        Engine Number
                    </label>
                    <input
                        placeholder='Engine Number'
                        type='text' id='engine-number' name='engine_no' className="form-control"
                        value={productFormData?.engine_no}
                        onChange={e => handleInputChange(e, 'product')}
                    />
                </Col>

                <Col md={12} className="mt-2">
                    <label htmlFor="vehicle-type" className="" style={{ margin: '0px' }}>
                        Vehicle Type
                    </label>
                    <Select
                        placeholder='Vehicle Type'
                        id="vehicle-type"
                        name="vehicle_type"
                        options={vehicleTypeOptions}
                        closeMenuOnSelect={true}
                        value={insuranceOptions?.find(option => option.value === productFormData?.vehicle_type)}
                        // onChange={(value, actionMeta) => handleChange(value, actionMeta, false, "customerData")}
                        // onChange={e => e => handleInputChange(e, 'product')}
                        onChange={(value, actionMeta) => handleChange(value, actionMeta, false, "product")}
                    />
                </Col>
                <Col md={12} className="mt-2">
                    <label htmlFor="brand-select" className="" style={{ margin: '0px' }}>
                        Select Brand
                    </label>
                    <AsyncSelect
                        placeholder='Select Brand'
                        defaultOptions
                        cacheOptions
                        id="brand-select"
                        loadOptions={loadBrandOptions}
                        name='brand'
                        onChange={(value, actionMeta) => selectChange(value, actionMeta)}
                    // onChange={(e) => selectChange(e, 'brand')}
                    //   value={selectedOption}
                    />
                    <p id="brand_val" className="text-danger m-0 p-0 vaildMessage"></p>
                </Col>

                <Col md={12} className="mt-2">
                    <label htmlFor="model-select" className="" style={{ margin: '0px' }}>
                        Select Model
                    </label>
                    <Select
                        placeholder='Select Model'
                        id="model-select"
                        options={productModelOption}
                        closeMenuOnSelect={true}
                        name='carmodel'
                        value={productModelOption?.filter((option) => option.value === productFormData?.car_model)}
                        onChange={(value, actionMeta) => selectChange(value, actionMeta)}
                    // isLoading={loading}
                    />
                    {/* <p id="carmodel_val" className="text-danger m-0 p-0 vaildMessage"></p> */}
                </Col>
                <Col md={12} className="mt-2">
                    <label htmlFor="variant-select" className="" style={{ margin: '0px' }}>
                        Select Variant
                    </label>
                    <Select
                        placeholder='Select Variant'
                        id="variant-select"
                        name="variant"
                        options={productVariantOption}
                        closeMenuOnSelect={true}
                        // onChange={e => e => handleInputChange(e, 'product')}
                        onChange={(value, actionMeta) => handleChange(value, actionMeta, false, "product")}

                    />
                </Col>
                <Col md={12} className="mt-2">
                    <label htmlFor="vehicle-delivery-date">
                        Vehicle Delivery Date
                    </label>
                    {/* <input placeholder="Vehicle Delivery Date" type='date' id='vehicle-delivery-date' name='delivery_date' className="form-control"
                        value={productFormData.delivery_date}
                        onChange={e => handleInputChange(e, 'product')}
                    /> */}
                    <Flatpickr
                        placeholder="Vehicle Delivery Date"
                        id='vehicle-delivery-date'
                        name='delivery_date'
                        className="form-control"
                        value={productFormData.delivery_date}
                        // onChange={(e) => handleInputChange(e)}
                        onChange={(date) => {
                            // setFormData({ ...formData, policy_purchase_date: moment(date[0]).format("YYYY-MM-DD") })
                            setProductFormData({ ...productFormData, delivery_date: moment(date[0]).format("YYYY-MM-DD") })
                        }}
                    />
                </Col>
                <Col md={12} className="mt-2">
                    <label htmlFor="vehicle-registration-date">
                        Vehicle Registration Date
                    </label>
                    <Flatpickr
                        placeholder="Vehicle Registration Date"
                        id='vehicle-registration-date'
                        name='registeration_date'
                        className="form-control"
                        value={productFormData?.registeration_date}
                        onChange={(date) => {
                            setProductFormData({ ...productFormData, registeration_date: moment(date[0]).format("YYYY-MM-DD") })
                        }}
                    />
                </Col>
                <div className='d-flex justify-content-end mt-2'>
                    <div>
                        <button className="btn btn-primary ms-2" type="button" onClick={handleProductSubmit}>Add Product</button>
                    </div>
                </div>
            </Row>
        </form>
    )

    useEffect(() => {
        if (formData?.xircls_customer_id) {
            selectCustomer()
        }
    }, [formData?.xircls_customer_id])

    return (
        <>
            {InnerStyles}
            <>
                <Offcanvas show={isHidden} onHide={() => handleClose('customer')} placement="end" className='w-25'>
                    <Offcanvas.Header closeButton>
                        {/* <Offcanvas.Title>Offcanvas</Offcanvas.Title> */}
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        {AddCustomerForm}
                    </Offcanvas.Body>
                </Offcanvas>
                <Offcanvas show={isAddProductHidden} onHide={() => handleClose('product')} placement="end" className='w-25'>
                    <Offcanvas.Header closeButton>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        {AddNewProductSideForm}
                    </Offcanvas.Body>
                </Offcanvas>
            </>
            <div className="customer-profile">
                <Card>
                    <CardBody>
                        <h3 className="mb-0">{isEdit ? 'Edit Insurance' : 'Add Insurance'}</h3>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        {
                            !isLoading ? (
                                <form >
                                    <Container fluid className="px-0 pb-1">
                                        <Row>
                                            <Col md={12} className="">
                                                <h4 className="mb-0">Applicant Details</h4>
                                            </Col>
                                            <Col md={6} className="mt-2" style={{ zIndex: '9' }}>
                                                <label htmlFor="customer-name" className="" style={{ margin: '0px' }}>
                                                    Customer Name
                                                </label>
                                                <Select
                                                    placeholder='Customer Name'
                                                    id="insurance-type"
                                                    options={customerList}
                                                    closeMenuOnSelect={true}
                                                    name='xircls_customer_id'
                                                    value={customerList?.find($ => Number($.value) === Number(formData?.xircls_customer_id))}
                                                    // onMenuScrollToBottom={() => getCustomer(currentPage, null, () => { })}
                                                    components={{ Menu: CustomSelectComponent }}
                                                    onChange={(value, actionMeta) => {
                                                        // selectCustomer(value, actionMeta, false)
                                                        setFormData(prevData => ({ ...prevData, xircls_customer_id: value.value }))
                                                    }}
                                                    isDisabled={isCustomer}
                                                // onChange={(value, actionMeta) => handleChange(value, actionMeta, false)}
                                                />
                                                <p id="xircls_customer_id_val" className="text-danger m-0 p-0 vaildMessage"></p>
                                            </Col>
                                            <Col md={6} className="mt-2 d-none">
                                                <label htmlFor="insurance-type" className="" style={{ margin: '0px' }}>
                                                    Insurance Type
                                                </label>
                                                <Select
                                                    placeholder='Select Insurance'
                                                    id="insurance-type"
                                                    name="insurance_type"
                                                    options={insuranceOptions}
                                                    value={insuranceOptions?.find(option => option.value === formData?.insurance_type)}
                                                    // onChange={e => handleInputChange(e, 'insurance_type')}
                                                    onChange={(value, actionMeta) => handleChange(value, actionMeta, false)}
                                                    closeMenuOnSelect={true}
                                                />
                                                <p id="insurance_type_val" className="text-danger m-0 p-0 vaildMessage"></p>
                                            </Col>
                                            {(formData?.insurance_type === 'Motor' || formData?.insurance_type === 'Lease Car') && <>
                                                <Col md={6} className="mt-2">
                                                    <label htmlFor="product-name" className="" style={{ margin: '0px' }}>
                                                        Product Name
                                                    </label>
                                                    <Select
                                                        placeholder='Select Product Name'
                                                        id="product-name"
                                                        options={productOptions}
                                                        name="insurance_product_name"
                                                        components={{ Menu: CustomProductSelectComponent }}
                                                        value={productOptions?.filter(option => Number(option.value) === Number(formData?.insurance_product_name))}
                                                        onChange={(value, actionMeta) => {
                                                            console.log(value, "afaf")
                                                            handleChange(value, actionMeta, false)
                                                            console.log(value, "value")
                                                        }}
                                                        // onChange={e => handleInputChange(e, 'insurance_product_name')}
                                                        closeMenuOnSelect={true}
                                                    />
                                                    <p id="insurance_product_name_val" className="text-danger m-0 p-0 vaildMessage"></p>
                                                </Col>
                                                <Col md={6} className="mt-2">
                                                    <label htmlFor="Vehicle-type" className="" style={{ margin: '0px' }}>
                                                        Vehicle Type
                                                    </label>
                                                    <Select
                                                        placeholder='Select Vehicle Type'
                                                        id="product-name"
                                                        options={usedProductOptions?.filter(option => Number(option.value) === Number(formData?.insurance_product_name))}
                                                        name="insurance_product_name"
                                                        value={usedProductOptions?.filter(option => Number(option.value) === Number(formData?.insurance_product_name))}
                                                        isDisabled
                                                        // onChange={e => handleInputChange(e, 'insurance_product_name')}
                                                        closeMenuOnSelect={true}
                                                    />
                                                    {/* <input className='form-control' value={type} id="Vehicle-type" name="vehicle" placeholder='Vehicle Type' /> */}
                                                    <p id="vehicle_val" className="text-danger m-0 p-0 vaildMessage"></p>
                                                </Col>
                                            </>}
                                            <Col md={6} className="mt-2">
                                                <label htmlFor="policy-number">
                                                    Policy Number
                                                </label>
                                                <input placeholder="Policy Number" type='text' id='policy-number' name='policy_number' className="form-control"
                                                    value={formData?.policy_number}
                                                    onChange={handleInputChange}
                                                />
                                                <p id="policy_number_val" className="text-danger m-0 p-0 vaildMessage"></p>
                                            </Col>
                                            <Col md={6} className="mt-2">
                                                <label htmlFor="Insurance-company">
                                                    Insurance Company
                                                </label>
                                                <input placeholder="Insurance Company" type='text' id='Insurance-company' name='insurance_company' className="form-control"
                                                    value={formData?.insurance_company}
                                                    onChange={handleInputChange}
                                                />
                                                <p id="insurance_company_val" className="text-danger m-0 p-0 vaildMessage"></p>
                                            </Col>
                                            <Col md={6} className="mt-2">
                                                <label htmlFor="Policy-purchase-date">
                                                    Policy Purchase Date
                                                </label>
                                                {/* <input
                                                placeholder="Policy Purchase Date"
                                                type="date"
                                                id="Policy-purchase-date"
                                                name="policy_purchase_date"
                                                className="form-control"
                                                value={formData?.policy_purchase_date}
                                                onChange={handleInputChange}
                                            /> */}

                                                <Flatpickr
                                                    placeholder="Policy Purchase Date"
                                                    id="Policy-purchase-date"
                                                    name="policy_purchase_date"
                                                    className="form-control"
                                                    value={formData?.policy_purchase_date}
                                                    // onChange={(e) => handleInputChange(e)}
                                                    onChange={(date) => {
                                                        setFormData({ ...formData, policy_purchase_date: moment(date[0]).format("YYYY-MM-DD") })
                                                    }}
                                                />
                                                <p id="policy_purchase_date_val" className="text-danger m-0 p-0 vaildMessage"></p>
                                            </Col>
                                            <Col md={6} className="mt-2">
                                                <label htmlFor="Policy-expiry-date">
                                                    Policy Expiry Date
                                                </label>
                                                {/* <input
                                                placeholder="Policy Purchase Date"
                                                type="date"
                                                id="Policy-expiry-date"
                                                name="policy_expiry_date"
                                                className="form-control"
                                                value={formData?.policy_expiry_date}
                                                onChange={handleInputChange}
                                            /> */}

                                                <Flatpickr
                                                    placeholder="Policy Expiry Date"
                                                    id="Policy-expiry-date"
                                                    name="policy_expiry_date"
                                                    className="form-control"
                                                    value={formData?.policy_expiry_date}
                                                    // onChange={handleInputChange}
                                                    onChange={(date) => {
                                                        setFormData({ ...formData, policy_expiry_date: moment(date[0]).format("YYYY-MM-DD") })
                                                    }}
                                                />
                                            </Col>
                                            <Col md={6} className="mt-2">
                                                <label htmlFor="Insurance-sales-executive">
                                                    Insurance Sales Executive
                                                </label>
                                                <input placeholder="Insurance Sales Executive" type='text' id='Insurance-sales-executive' name='executive_name' className="form-control"
                                                    value={formData?.executive_name}
                                                    onChange={handleInputChange}
                                                />
                                            </Col>
                                            <Col md={6} className="mt-2">
                                                <label htmlFor="amount-r">
                                                    Amount - ₹
                                                </label>
                                                <input placeholder="Amount" type='tel' id='amount-r' name='amount' className="form-control"
                                                    value={formData?.amount}
                                                    // onChange={e => handleInputChange(e)}
                                                    onChange={(e) => {
                                                        if (!isNaN(e.target.value)) {
                                                            handleInputChange(e)
                                                            console.log("this is a number")
                                                        }
                                                    }}
                                                />
                                            </Col>
                                            {(formData?.insurance_type === 'Motor' || formData?.insurance_type === 'Lease Car') && <>
                                                <Col md={6} className="mt-2">
                                                    <label htmlFor="add-on-plan">
                                                        Add on Plan
                                                    </label>
                                                    <input placeholder="Add on Plan" type='text' id='add-on-plan' name='add_on_plan' className="form-control"
                                                        value={formData?.add_on_plan}
                                                        onChange={handleInputChange}
                                                    />
                                                </Col>
                                                <Col md={6} className="mt-2">
                                                    <label htmlFor="add-on-plan">
                                                        IDV – Insured Declared Value
                                                    </label>
                                                    <input placeholder="Insured Declared Value" type='tel' maxLength={10} id='add-on-plan' name='insured_declared_value' className="form-control"
                                                        value={formData?.insured_declared_value}
                                                        onChange={e => handleInputChange(e)}
                                                    />
                                                </Col>
                                                <Col md={6} className="mt-2">
                                                    <label htmlFor="owndamage">
                                                        OD – Own Damage
                                                    </label>
                                                    <input placeholder="Own Damage" type='tel' maxLength={10} id='owndamage' name='own_damage' className="form-control"
                                                        value={formData?.own_damage}
                                                        onChange={e => handleInputChange(e)}
                                                    />
                                                </Col>
                                                <Col md={6} className="mt-2">
                                                    <label htmlFor="NoClaimBonus">
                                                        NCB – No Claim Bonus
                                                    </label>
                                                    <input placeholder="No Claim Bonus" type='tel' maxLength={10} id='NoClaimBonus' name='ncb_no_claim_bonus' className="form-control"
                                                        value={formData?.ncb_no_claim_bonus}
                                                        onChange={e => handleInputChange(e)}
                                                    />
                                                </Col>
                                                <Col md={6} className="mt-2">
                                                    <label htmlFor="PaymentMode">
                                                        PM – Payment Mode
                                                    </label>
                                                    <input placeholder="Payment Mode" type='text' id='PaymentMode' name='pm_payment_mode' className="form-control"
                                                        value={formData?.pm_payment_mode}
                                                        onChange={handleInputChange}
                                                    />
                                                </Col>
                                                <Col md={6} className="mt-2">
                                                    <label htmlFor="Declaration">
                                                        NCB – Declaration
                                                    </label>
                                                    <input placeholder="Declaration" type='text' id='Declaration' name='ncb_declaration' className="form-control"
                                                        value={formData?.ncb_declaration}
                                                        onChange={handleInputChange}
                                                    />
                                                </Col>
                                                <Col md={6} className="mt-2">
                                                    <label htmlFor="ThirdPartyDate">TPD – Third Party Date</label>
                                                    {/* <input
                                                    placeholder="Third Party Date"
                                                    type="date"
                                                    id="ThirdPartyDate"
                                                    name="third_party_date"
                                                    className="form-control"
                                                    value={formData?.third_party_date}
                                                    onChange={handleInputChange}
                                                /> */}

                                                    <Flatpickr
                                                        placeholder="Third Party Date"
                                                        id="ThirdPartyDate"
                                                        name='third_party_date'
                                                        className="form-control"
                                                        value={formData?.third_party_date}
                                                        // onChange={handleInputChange}
                                                        onChange={(date) => {
                                                            setFormData({ ...formData, third_party_date: moment(date[0]).format("YYYY-MM-DD") })
                                                        }}
                                                    />
                                                </Col>
                                                <Col md={6} className="mt-2">
                                                    <label htmlFor="InbuiltDiscount">
                                                        ID – Inbuilt Discount
                                                    </label>
                                                    <input placeholder="Inbuilt Discount" type='tel' maxLength={10} id='InbuiltDiscount' name='inbuilt_discount' className="form-control"
                                                        value={formData?.inbuilt_discount}
                                                        onChange={e => handleInputChange(e)}
                                                    />
                                                </Col>
                                                <Col md={6} className="mt-2">
                                                    <label htmlFor="NetPremium">
                                                        NP – Net Premium.
                                                    </label>
                                                    <input placeholder="Net Premium" type='tel' maxLength={10} id='NetPremium' name='net_premimum' className="form-control"
                                                        value={formData?.net_premimum}
                                                        onChange={e => handleInputChange(e)}
                                                    />
                                                </Col>
                                            </>}
                                            <Col md={6} className="mt-2">
                                                <label htmlFor="health_insurance">Do they have health insurance?</label>
                                                <div className='d-flex justify-content-between w-50' style={{ padding: '0.571rem 1rem' }}>
                                                    <div className="form-check">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="health_insurance"
                                                            checked={formData.health_insurance === "Data not available"}
                                                            id="flexRadioDefault1"
                                                            value="Data not available"
                                                            onChange={(e) => handleInputChange(e)}
                                                        />
                                                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                            Data not available
                                                        </label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="health_insurance"
                                                            checked={formData.health_insurance === "No"}
                                                            id="flexRadioDefault2"
                                                            value="No"
                                                            onChange={(e) => handleInputChange(e)}
                                                        />
                                                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                            No
                                                        </label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="health_insurance"
                                                            checked={formData.health_insurance === "Yes"}
                                                            id="flexRadioDefault3"
                                                            value="Yes"
                                                            onChange={(e) => handleInputChange(e)}
                                                        />
                                                        <label className="form-check-label" htmlFor="flexRadioDefault3">
                                                            Yes
                                                        </label>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                        <div className='w-100 d-flex justify-content-between mt-2'>
                                            <button className="btn btn-primary" type="button" onClick={e => navigate(-1)} >Cancel</button>

                                            <div className='d-flex gap-1'>
                                                <button className="btn btn-primary" type="button" onClick={e => handleSubmitSection(e, 'SAVE')} >Save</button>
                                                <button className="btn btn-primary" type="button" onClick={e => handleSubmitSection(e, 'SAVE & CLOSE')} >Save & Close</button>
                                            </div>
                                        </div>
                                    </Container>
                                </form>
                            ) : (
                                <Container>
                                    <div className='d-flex justify-content-center align-items-center w-100'>
                                        <Spinner size={'40px'} />
                                    </div>
                                </Container>

                            )
                        }

                    </CardBody>
                </Card>
            </div>
        </>
    )
}

export default AddInsurance