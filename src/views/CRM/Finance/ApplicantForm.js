/* eslint-disable */
import React, { useCallback, useEffect, useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import Select from "react-select"
import { createPortal } from 'react-dom'
import axios from "axios"
import toast from "react-hot-toast"
import { crmURL } from '@src/assets/auth/jwtService.js'
import AsyncSelect from 'react-select/async'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { baseURL, getReq, postReq } from '../../../assets/auth/jwtService'
import { validForm } from '../../Validator'
import Flatpickr from 'react-flatpickr'
import moment from 'moment'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../../Components/DataTable/Spinner'
// import toast from "react-hot-toast"

const ApplicantForm = ({ allData }) => {
    // const { id } = useParams()
    // const parmas = new URLSearchParams(location.search)
    const { id } = useParams()
    // const isEdit = parmas.get("type") === "edit"
    // const isCustomer = parmas.get("type") === "customer"

    const navigate = useNavigate()
    const { formData, handleNext, handleInputChange, setFormData, handleChange, country, isCustomer } = allData
    const [productModelOption, setProductModelOption] = useState([])
    const [productVariantOption, setProductVariantOption] = useState([])
    // const [allOptions, setAllOptions] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [customerList, setCustomerList] = useState([])
    // const [isLoading, setIsLoading] = useState(true)


    // const mainFormvalueToCheck = [
    //     {
    //         name: 'customer_name',
    //         message: 'Select Customer Name',
    //         type: 'string',
    //         id: 'customer_name'
    //     },
    //     {
    //         name: 'client',
    //         message: 'Select Client Type',
    //         type: 'string',
    //         id: 'client'
    //     },
    //     {
    //         name: 'product_name_id',
    //         message: 'Select Product Name',
    //         type: 'string',
    //         id: 'product_name_id'
    //     },
    //     {
    //         name: 'Loan_Type',
    //         message: 'Select Loan Type',
    //         type: 'string',
    //         id: 'Loan_Type'
    //     }
    // ]

    const addFormvalueToCheck = [
        {
            name: 'title',
            message: 'Select Title',
            type: 'string',
            id: 'title'
        },
        {
            name: 'cust_first_name',
            message: 'Enter customer name',
            type: 'string',
            id: 'cust_first_name'
        },
        {
            name: 'cust_last_name',
            message: 'Enter Last Name',
            type: 'string',
            id: 'cust_last_name'
        },
        {
            name: 'email',
            message: 'Enter Email',
            type: 'email',
            id: 'email'
        },
        {
            name: 'phone_no',
            message: 'Enter Phone No',
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
        },
        {
            name: 'car_model',
            message: 'Please select a Model',
            type: 'string',
            id: 'car_model'
        },
        {
            name: "variant",
            message: 'Please select a variant',
            type: 'string',
            id: 'variant'
        }
    ]

    const [check, setCheck] = useState({
        addForm: {
            title: '',
            cust_first_name: '',
            cust_last_name: "",
            email: "",
            phone_no: ""
        },
        productForm: {
            xircls_customer_id: isCustomer ? id : '',
            engine_number: '',
            // brand: '',
            model: ''
        }
    })

    const postNewCustomerData = () => {
        console.log(check.addForm)
        const form_data = new FormData()
        Object.entries(check.addForm).map(([key, value]) => {
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
                const addForm = { ...check.addForm }
                Object.keys(check.addForm).forEach((key) => {
                    addForm[key] = ""
                })
                setCheck(prev => {
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
                handleClose("customer")
            })
    }


    const handleAddInputChange = (e, keyType) => {
        console.log(e)
        setCheck(prevData => ({ ...prevData, [keyType]: { ...prevData[keyType], [e.target.name]: e.target.value } }))
    }

    // const inputChangeHandler = (e) => {
    //     setCheck({ ...check, mainForm: { ...check.mainForm, [e.target.name]: e.target.value } })
    // }

    // const addInputChangeHandler = (e) => {
    //     setCheck({ ...check, addForm: { ...check.addForm, [e.target.name]: e.target.value } })
    // }

    // const handleSubmitSection = (e, action) => {
    //     e.preventDefault();

    //     const checkForm = validForm(mainFormvalueToCheck, check.mainForm)  // Use mainFormvalueToCheck for validation
    //     console.log(checkForm);

    //     if (checkForm.isValid) {
    //         console.log('Form is valid');

    //         if (action === 'SAVE') {
    //             // Save
    //         } else if (action === 'SAVE & CLOSE') {
    //             // Save and close
    //         }
    //     }
    // }

    const handleAddSubmitSection = (e, action) => {
        e.preventDefault();

        const checkForm = validForm(addFormvalueToCheck, check.addForm)  // Use addFormvalueToCheck for validation
        console.log(checkForm, "dd");
        if (checkForm) {
            postNewCustomerData()
        }

        // if (checkForm) {
        //     console.log('Form is valid')

        // }
    }

    const vehicleTypeOptions = [
        { value: 'new', label: 'New Car' },
        { value: 'used', label: 'Used Car' }
        // { value: 'renewal', label: 'Renewal' },
        // { value: 'rollover', label: 'Rollover' },
        // { value: 'data', label: 'Data' },
    ]

    const insuranceOptions = [
        { label: 'Select Insurance', value: '' },
        { label: 'Health', value: 'Health' },
        { label: 'Motor', value: 'Motor' },
        { label: 'Travel', value: 'Travels' },
        { label: 'Life', value: 'Life' },
        { label: 'Personal Accident', value: 'Personal Accident' },
        { label: 'Fire Burglary', value: 'Fire Burglary' },
        { label: 'Lease Car', value: 'Lease Car' }
    ]

    console.log(check)

    // const handleProductSubmitSection = (e, action) => {
    //     e.preventDefault();

    //     const checkForm = validForm(productFormvalueToCheck, check.productForm)  // Use productFormvalueToCheck for validation
    //     console.log(checkForm);

    //     if (checkForm) {
    //         const form_data = new FormData()
    //         Object.entries(check?.productForm).map(([key, value]) => {
    //             form_data.append(key, value)
    //         })
    //         form_data.append("press_btn", 'SAVE')
    //         form_data.append("xircls_customer_id", formData?.xircls_customer_id)

    //         postReq('add_vehicle', form_data, crmURL)
    //         .then((resp) => {
    //             console.log("Response:", resp)
    //             toast.success('Vehicle saved successfully')
    //             handleClose('product')
    //         })
    //         .catch((error) => {
    //             console.error("Error:", error)
    //             toast.error('Failed to save Vehicle')
    //         })

    //     }
    // }

    const selectCustomer = () => {
        // handleInputChange(e, 'xircls_customer_id')
        // setIsLoading(true)
        console.log(formData?.xircls_customer_id)
        const form_data = new FormData()
        const url = new URL(`${crmURL}/vehicle/fetch_vehicle_details/`)
        form_data.append("id", formData?.xircls_customer_id)
        // "SHIVAM KALE"
        getReq(`fetch_vehicle_details`, `?id=${formData?.xircls_customer_id}`, crmURL)
            .then((resp) => {
                console.log("Response:", resp)
                if (resp?.data?.car_variant) {
                    changeProductName(resp)
                }
            })
            .catch((error) => {
                console.error("Error:", error)
                toast.error('Something went wrong')

            })
    }

    const postVehicleDetails = () => {
        const form_data = new FormData()
        Object.entries(check?.productForm).map(([key, value]) => {
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
                toast.error('Something went wrong')
            })
    }

    const handleProductSubmit = () => {
        const checkForm = validForm(addProductFormToCheck, check?.productForm)
        console.log({ checkForm }, addProductFormToCheck, check?.productForm)
        if (checkForm) {
            postVehicleDetails()
        }
    }

    // const handleChange = (options, actionMeta, check, type = "formData") => {
    //     if (check) {
    //         const option_list = options.map((cur) => {
    //             return cur.value
    //         })
    //         if (type === "formData") {
    //             setFormData(prev => ({ ...prev, [actionMeta.name]: option_list }))

    //         } else {
    //             setCustomerFormData(prev => ({ ...prev, [actionMeta.name]: option_list }))
    //         }
    //     } else {
    //         if (type === "product") {
    //             setCheck(prevData => ({ ...prevData, productForm: { ...prevData?.productForm, [actionMeta.name]: options.value } }))
    //         }

    //     }

    // }

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

    const selectChange = (value, actionMeta) => {
        console.log('checkForm 1212', { value, actionMeta })
        const form_data = new FormData()
        if (actionMeta.name === 'brand') {
            form_data.append("brand", value.value)
            // handleChange(value, actionMeta, false, "product")
            handleAddInputChange({ target: { name: actionMeta.name, value: value.value } }, "productForm")
            setProductModelOption([])
            setProductVariantOption([])
        } else if (actionMeta.name === 'carmodel') {
            form_data.append("carmodel", value.value)
            actionMeta.name = 'car_model'
            handleAddInputChange({ target: { name: "car_model", value: value.value } }, "productForm")
            // handleChange(value, actionMeta, false, "product")
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

    //---------------------------------

    const [isHidden, setIsHidden] = useState(false)
    const [isAddProductHidden, setIsAddProductHidden] = useState(false)
    const [customerDetails, setCustomerDetails] = useState([])
    const [customerOptions, setCustomerOptions] = useState([])
    const [productOptions, setProductOptions] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    // console.log('customerDetails')
    // console.log(customerDetails)
    // console.log('customerOptions')
    // console.log(customerOptions)
    // console.log('productOptions')
    // console.log(productOptions)

    // const { handleNext, formData, handleInputChange } = formHandler

    // const fetchCustomerData = async () => {
    //     try {
    //         const getUrl = new URL(`${crmURL}/customers/merchant/get_customer_details/`);
    //         const response = await axios.get(getUrl);

    //         // Assuming res.data.success is an array
    //         return response.data.success;
    //     } catch (error) {
    //         console.error('Error fetching customer data:', error);
    //         throw error; // Re-throw the error to be caught by the calling function
    //     }
    // };

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
        if (formData.xircls_customer_id) {
            selectCustomer()
        }
    }, [formData.xircls_customer_id])

    // const loadOptions = (inputValue, callback) => {
    //     const getUrl = new URL(`${baseURL}/customers/merchant/get_customer_details/`);
    //     // getUrl.searchParams.set("q", inputValue)
    //     axios.get(getUrl.toString())
    //         .then((response) => {
    //             const successData = response.data.success;
    //             if (successData && Array.isArray(successData)) {
    //                 const customerOptions = successData
    //                     .filter((item) => item.customer_name !== "")
    //                     .map((customer) => ({
    //                         value: customer.id,
    //                         label: customer.customer_name,
    //                     }));
    //                 callback(customerOptions);
    //             } else {
    //                 console.error("Invalid or missing data in the API response");
    //                 callback([]);
    //             }
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching data:", error.message);
    //             callback([]);
    //         });
    // };
    // const fetchData = async () => {
    //     try {
    //     const getUrl = new URL(`${crmURL}/customers/merchant/get_customer_details/`);
    //         const response = await axios.get(getUrl.toString());
    //         const successData = response.data.success;
    //         const customerOptionss = successData
    //             .filter((item) => item.customer_name !== "")
    //             .map((customer) => ({
    //                 value: customer.id,
    //                 label: customer.customer_name,
    //             }));
    //             // console.log(customerOptions);
    //         setCustomerOptions(customerOptionss);
    //         // setCustomerOptions(filteredData);
    //     } catch (error) {
    //         console.error("Error fetching data:", error.message);
    //         setCustomerOptions([]);
    //     }
    // };

    // useEffect(() => {
    //     fetchData()
    // }, [])
    // console.log(customerOptions);

    // const loadOptions = (inputValue = '', callback) => {
    //     console.log('inputValue')
    //     console.log(inputValue)
    //     if (!inputValue) {
    //         // If no input, return all options
    //         callback(customerOptions);
    //       } else {
    //         // If input provided, filter options based on input
    //         const filteredOptions = customerOptions.filter((option) =>
    //           option.label.toLowerCase().includes(inputValue.toLowerCase())
    //         );
    //         callback(filteredOptions);
    //       }
    //   };

    const changeProductName = (data) => {
        const productOptions = data?.data?.car_variant.map(item => {
            let value = item[0]
            let label = item.slice(1).filter(Boolean).join(' -- ')
            return {
                value: value,
                label: label
            }
        })
        // setIsLoading(false)
        setProductOptions(productOptions)
    }

    const handleClose = (type) => (type === 'customer') ? setIsHidden(false) : setIsAddProductHidden(false)
    const handleShow = (type) => (type === 'customer') ? setIsHidden(true) : setIsAddProductHidden(true)

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
                <a
                    onClick={() => handleShow("product")}
                    className="link-success link-underline-opacity-0 "
                >
                    Add New Product
                </a>
            </p>
            {children}
        </div>
    )

    const clientTypeOptions = [
        { value: 'jmd', label: 'JMD' },
        { value: 'nonjmd', label: 'Non-JMD' }
    ]

    const loanTypeOptions = [
        { value: 'New Car', label: 'New Car' },
        { value: 'Old Car', label: 'Old Car' },
        { value: 'Topup', label: 'Topup' }
    ]

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

    useEffect(() => {
        // fetchCustomerData(currentPage, null, () => { })
        getCustomer()
    }, [])

    const InnerStyles = (
        <style>
            {`
            .hiddenRight{
                right: 0 !important
            }
            .hiddenEle{
                overflow: auto;
                width: 30%;
                height: 100vh; 
                z-index: 1000;
                top: 0; 
                right: -100vh; 
                transform: translateX(0);  
                transition: right 0.8s ease-in-out;
            }
            #customer-name > div {
                z-index: 9;
            }
            `}
        </style>
    )

    const AddCustomerForm = (
        <form>
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
                        options={[
                            { value: 'mr', label: 'Mr.' },
                            { value: 'ms', label: 'Ms.' },
                            { value: 'mrs', label: 'Mrs.' }
                        ]}
                        closeMenuOnSelect={true}
                        onChange={(event) => {
                            const e = { target: { name: "title", value: event.value } };
                            handleAddInputChange(e, "addForm")
                        }}
                    />
                    <p id="title_val" className="text-danger m-0 p-0 vaildMessage"></p>
                </Col>
                <Col md={12} className="mt-2">
                    <label htmlFor="cust_first_name">
                        First Name
                    </label>
                    <input placeholder="First Name" type='text' id='cust_first_name' name='cust_first_name' className="form-control"
                        // value={formData?.basicDetail?.cust_first_name} 
                        // onChange={handleInputChange} 
                        // onChange={}
                        onChange={(e) => {
                            handleAddInputChange(e, "addForm")
                            // addInputChangeHandler(e)
                        }}

                    />
                    <p id="cust_first_name_val" className="text-danger m-0 p-0 vaildMessage"></p>
                </Col>
                <Col md={12} className="mt-2">
                    <label htmlFor="cust_last_name">
                        Last Name
                    </label>
                    <input placeholder="Last Name" type='text' id='cust_last_name' name='cust_last_name' className="form-control"
                        // value={formData?.basicDetail?.cust_last_name} 
                        // onChange={handleInputChange} 
                        onChange={(e) => {
                            handleAddInputChange(e, "addForm")
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
                        //  value={formData?.basicDetail?.email} 
                        //  onChange={handleInputChange}
                        onChange={(e) => {
                            handleAddInputChange(e, "addForm")
                            // addInputChangeHandler(e)
                        }}
                    />
                    <p id="email_val" className="text-danger m-0 p-0 vaildMessage"></p>

                </Col>
                <Col md={12} className="mt-2">
                    <label htmlFor="basicDetails-mobile">
                        Mobile Number
                    </label>
                    <input placeholder="Mobile Number" type='tel' id='basicDetails-mobile' name='phone_no' className="form-control"
                        // value={formData?.basicDetail?.phone_no}
                        //  onChange={handleInputChange} 
                        // onChange={(e) => {
                        //     handleAddInputChange(e, "addForm")
                        //     // addInputChangeHandler(e)
                        // }}
                        onChange={(e) => {
                            if (!isNaN(e.target.value)) {
                                handleAddInputChange(e, "addForm")
                                console.log("this is a number")
                            }
                        }}
                    />
                    <p id="phone_no_val" className="text-danger m-0 p-0 vaildMessage"></p>

                </Col>
                <Col md={12} className="mt-2">
                    <label htmlFor="address-1-country">Country</label>
                    <Select
                        id="address-1-country"
                        placeholder="Country"
                        options={country}
                        value={country?.find(option => option.value === check?.addForm?.country)}
                        onChange={(value) => {
                            handleAddInputChange({ target: { value: value?.value, name: "country" } }, "addForm")
                        }}
                        closeMenuOnSelect={true}
                    />
                </Col>
                <Col md={12} className="mt-2">
                    <label htmlFor="address-1-city">City</label>
                    <input
                        placeholder="City"
                        type="text"
                        id="address-1-city"
                        name="billingAddress.city"
                        className="form-control"
                        onChange={(e) => {
                            handleAddInputChange(e, "addForm")
                            // addInputChangeHandler(e)
                        }}
                    // value={formData.billingAddress.city}
                    // onChange={handleInputChange}
                    />
                </Col>
                <Col md={12} className="mt-2">
                    <label htmlFor="address-1-state">State</label>
                    <input
                        placeholder="State"
                        type="text"
                        id="address-1-state"
                        name="billingAddress.state"
                        className="form-control"
                        onChange={(e) => {
                            handleAddInputChange(e, "addForm")
                            // addInputChangeHandler(e)
                        }}
                    // value={formData.billingAddress.state}
                    // onChange={handleInputChange}
                    />
                </Col>
                <Col md={12} className="mt-2">
                    <label htmlFor="address-1-pincode">Pincode</label>
                    <input
                        placeholder="Pincode"
                        type="text"
                        id="address-1-pincode"
                        name="billingAddress.pincode"
                        className="form-control"
                        // onChange={(e) => {
                        //     handleAddInputChange(e, "addForm")
                        //     // addInputChangeHandler(e)
                        // }}
                        onChange={(e) => {
                            if (!isNaN(e.target.value)) {
                                handleAddInputChange(e, "addForm")
                                console.log("this is a number")
                            }
                        }}
                    // value={formData.billingAddress.pincode}
                    // onChange={handleInputChange}
                    />
                </Col>

                <div className='d-flex justify-content-between mt-2'>
                    <div>
                        <button className="btn btn-primary" type="button" onClick={((e) => {
                            handleAddSubmitSection(e)
                        })}>Add</button>
                        <button onClick={() => handleClose("customer")} className="btn btn-primary ms-2" type="button">Cancel</button>
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
                    <Select
                        placeholder='Customer Name'
                        id="insurance-type"
                        options={customerList}
                        closeMenuOnSelect={true}
                        name='customer_name'
                        // onMenuScrollToBottom={() => fetchCustomerData(currentPage, null, () => { })}
                        value={customerList?.filter((curElem) => Number(curElem?.value) === Number(formData.xircls_customer_id))}
                        isDisabled={true}
                    />
                </Col>
                <Col md={12} className="mt-2">
                    <label htmlFor="registration-name">
                        Registration Name
                    </label>
                    <input
                        placeholder='Registration Number'
                        type='text' id='registration-name' name='registration_number' className="form-control"
                        value={check?.productForm.registration_number}
                        onChange={e => handleAddInputChange(e, 'productForm')}
                    />
                </Col>
                <Col md={12} className="mt-2">
                    <label htmlFor="sales-person">
                        Sales Person
                    </label>
                    <input
                        placeholder='Sales Person'
                        type='text' id='sales-person' name='sales_executive' className="form-control"
                        value={check?.productForm?.sales_executive}
                        onChange={e => handleAddInputChange(e, 'productForm')}
                    />
                </Col>
                <Col md={12} className="mt-2">
                    <label htmlFor="vehicle-identification">
                        Vehicle Identification Number (VIN) or Chassis Number
                    </label>
                    <input
                        placeholder='Vehicle Identification Number'
                        type='text' id='vehicle-identification' name='vehicle_number' className="form-control"
                        value={check?.productForm?.vehicle_number}
                        onChange={e => handleAddInputChange(e, 'productForm')}
                    />
                </Col>
                <Col md={12} className="mt-2">
                    <label htmlFor="engine-number">
                        Engine Number
                    </label>
                    <input
                        placeholder='Engine Number'
                        type='text' id='engine-number' name='engine_number' className="form-control"
                        value={check?.productForm?.engine_no}
                        onChange={e => handleAddInputChange(e, 'productForm')}
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
                        value={insuranceOptions?.find(option => option.value === check?.productForm?.vehicle_type)}
                        onChange={(e) => {
                            handleAddInputChange({ target: { name: "vehicle_type", value: e.value } }, "productForm")
                        }}
                    // onChange={(value, actionMeta) => handleChange(value, actionMeta, false, "customerData")}
                    // onChange={e => e => handleInputChange(e, 'product')}
                    // onChange={(value) => {
                    //     const e = {target: {name: "vehicle_type", value: value?.value}}
                    //     handleAddInputChange(e, "productForm")
                    //     handleChange(value, actionMeta, false, "product")
                    // }}
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
                        onChange={(value, actionMeta) => selectChange(value, actionMeta)}
                    // isLoading={loading}
                    />
                    <p id="car_model_val" className="text-danger m-0 p-0 vaildMessage"></p>
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
                        onChange={e => {
                            handleAddInputChange({ target: { name: "variant", value: e.value } }, "productForm")
                        }}

                    />
                    <p id="variant_val" className="text-danger m-0 p-0 vaildMessage"></p>
                </Col>
                <Col md={12} className="mt-2">
                    <label htmlFor="vehicle-delivery-date">
                        Vehicle Delivery Date
                    </label>
                    <input placeholder="Vehicle Delivery Date" type='date' id='vehicle-delivery-date' name='delivery_date' className="form-control"
                        value={check?.productForm.delivery_date}
                        onChange={e => handleInputChange(e, 'product')}
                    />
                </Col>
                <Col md={12} className="mt-2">
                    <label htmlFor="vehicle-registration-date">
                        Vehicle Registration Date
                    </label>
                    <input placeholder="Vehicle Registration Date" type='date' id='vehicle-registration-date' name='registeration_date' className="form-control"
                        value={check?.productForm?.registeration_date}
                        onChange={e => handleInputChange(e, 'product')}
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

    return (
        <>
            {InnerStyles}
            <>
                <Offcanvas show={isHidden} onHide={() => handleClose('customer')} placement="end">
                    <Offcanvas.Header closeButton>
                        {/* <Offcanvas.Title>Offcanvas</Offcanvas.Title> */}
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        {AddCustomerForm}
                    </Offcanvas.Body>
                </Offcanvas>
                <Offcanvas show={isAddProductHidden} onHide={() => handleClose('product')} placement="end">
                    <Offcanvas.Header closeButton>
                        {/* <Offcanvas.Title>Offcanvas</Offcanvas.Title> */}
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        {AddNewProductSideForm}
                    </Offcanvas.Body>
                </Offcanvas>
            </>
            {
                !isLoading ? (
                    <Container fluid className="px-0 py-1">
                        {/* <form onSubmit={handleSubmit}> */}
                        <Row>
                            <Col md={12} className="mt-2">
                                <h4 className="mb-0">Applicant Details</h4>
                            </Col>
                            <Col md={6} className="mt-2" style={{ zIndex: '9' }}>
                                <label htmlFor="customer-name" className="form-label" style={{ margin: '0px' }}>
                                    Customer Name
                                </label>
                                <Select
                                    placeholder='Customer Name'
                                    isDisabled={isCustomer}
                                    id="insurance-type"
                                    options={customerList}
                                    closeMenuOnSelect={true}
                                    name='customer_name'
                                    // onMenuScrollToBottom={() => fetchCustomerData(currentPage, null, () => { })}
                                    components={{ Menu: CustomSelectComponent }}
                                    onChange={(e) => {
                                        console.log(e)
                                        // selectCustomer(e);
                                        // handleInputChange(e, 'xircls_customer_id')
                                        const updatedData = {
                                            customer_name: e.label,
                                            xircls_customer_id: e.value
                                        }

                                        setFormData((preData) => ({
                                            ...preData,
                                            ...updatedData
                                        }))

                                        handleAddInputChange({ target: { value: e.value, name: "xircls_customer_id" } }, 'productForm')
                                    }}
                                    value={customerList?.filter((curElem) => Number(curElem?.value) === Number(formData.xircls_customer_id))}
                                />
                                <p id="xircls_customer_id_val" className="text-danger m-0 p-0 vaildMessage"></p>
                            </Col>
                            <Col md={6} className="mt-2">
                                <label htmlFor="basicDetails-client-type" className="form-label" style={{ margin: '0px' }}>
                                    Client
                                </label>
                                <Select
                                    placeholder='Client Type'
                                    id="basicDetails-client-type"
                                    name="client"
                                    options={clientTypeOptions}
                                    value={clientTypeOptions?.find(option => option.value === formData?.client)}
                                    onChange={(value, actionMeta) => handleChange(value, actionMeta)}
                                    closeMenuOnSelect={true}
                                // name='client'
                                />
                                <p id="client_val" className="text-danger m-0 p-0 vaildMessage"></p>
                            </Col>
                            <Col md={6} className="mt-2">
                                <label htmlFor="basicDetails-se_dsa-name">
                                    SE/DSA Name
                                </label>
                                <input placeholder="SE/DSA Name" type='text' id='basicDetails-se_dsa-name' name='SE_DSA_Name' className="form-control"
                                    value={formData?.SE_DSA_Name}
                                    onChange={handleInputChange}
                                />
                                <p id="SE_DSA_Name_val" className="text-danger m-0 p-0 vaildMessage"></p>
                            </Col>
                            <Col md={6} className="mt-2">
                                <label htmlFor="basicDetails-Bank-name">
                                    Bank Name
                                </label>
                                <input placeholder="Bank Name" type='text' id='basicDetails-Bank-name' name='Bank_Name' className="form-control"
                                    value={formData?.Bank_Name}
                                    onChange={handleInputChange}
                                />
                                <p id="Bank_Name_val" className="text-danger m-0 p-0 vaildMessage"></p>
                            </Col>
                            <Col md={6} className="mt-2">
                                <label htmlFor="product-name" className="form-label" style={{ margin: '0px' }}>
                                    Product Name
                                </label>
                                <Select
                                    placeholder='Select Product Name'
                                    id="product-name"
                                    options={productOptions}
                                    name="product_name_id"
                                    components={{ Menu: CustomProductSelectComponent }}
                                    onChange={(value, actionMeta) => handleChange(value, actionMeta)}
                                    value={productOptions?.filter((curElem) => curElem?.value === formData?.product_name_id)}
                                    // onChange={((event) => {
                                    //     selectCustomer(event)
                                    //     const e = { target: { name: 'product_name_id', value: e?.value } }
                                    //     handleAddInputChange(e, "mainForm")
                                    // })}
                                    // onChange={(e) => {
                                    //     selectCustomer(e);
                                    //     handleInputChange(e, 'product_name_id')
                                    // }}
                                    closeMenuOnSelect={true}
                                />
                                <p id="product_name_id_val" className="text-danger m-0 p-0 vaildMessage"></p>
                            </Col>
                            <Col md={6} className="mt-2">
                                <label htmlFor="basicDetails-loan-type" className="form-label" style={{ margin: '0px' }}>
                                    Loan Type
                                </label>
                                <Select
                                    placeholder='Loan Type'
                                    id="basicDetails-loan-type"
                                    options={loanTypeOptions}
                                    name="Loan_Type"
                                    value={loanTypeOptions?.find(option => option.value === formData?.Loan_Type)}
                                    onChange={(value, actionMeta) => handleChange(value, actionMeta)}
                                    // onChange={((event) => {
                                    //     selectCustomer(event)
                                    //     const e = { target: { name: 'Loan_Type', value: e?.value } }
                                    //     handleInputChange(e, "mainForm")
                                    // })}
                                    // onChange={(e) => {
                                    //     // selectCustomer(e);
                                    //     handleInputChange(e, 'Loan_Type')
                                    // }}
                                    closeMenuOnSelect={true}
                                />
                                <p id="Loan_Type_val" className="text-danger m-0 p-0 vaildMessage"></p>
                            </Col>
                            <Col md={6} className="mt-2">
                                <label htmlFor="basicDetails-rot">
                                    Rate of Interest - %
                                </label>
                                <input placeholder="Rate of Interest" type='tel' id='basicDetails-rot' name='Rate_of_Interest' className="form-control"
                                    value={formData?.Rate_of_Interest}
                                    onChange={e => handleInputChange(e, 'tel')}
                                />
                            </Col>
                            <Col md={6} className="mt-2">
                                <label htmlFor="basicDetails-loan-acc-number">
                                    Loan Account Number
                                </label>
                                <input placeholder="Loan Account Number" type='tel' id='basicDetails-loan-acc-number' name='Loan_Number' className="form-control"
                                    value={formData?.Loan_Number}
                                    onChange={e => handleInputChange(e)}
                                />
                            </Col>
                            <Col md={6} className="mt-2">
                                <label htmlFor="basicDetails-bank-acc-number">
                                    Bank Account Number
                                </label>
                                <input placeholder="Bank Account Number" type='tel' id='basicDetails-bank-acc-number' name='Bank_Number' className="form-control"
                                    value={formData?.Bank_Number}
                                    onChange={handleInputChange}
                                />
                            </Col>
                            <Col md={6} className="mt-2">
                                <label htmlFor="basicDetails-loan-amount">
                                    Loan Amount - ₹
                                </label>
                                <input placeholder="Loan Amount" type='tel' id='basicDetails-loan-amount' name='Loan_amount' className="form-control"
                                    value={formData?.Loan_amount}
                                    // onChange={e => (handleInputChange(e, 'tel'))}
                                    onChange={(e) => {
                                        if (!isNaN(e.target.value)) {
                                            (handleInputChange(e, 'tel'))
                                            console.log("this is a number")
                                        }
                                    }}
                                />
                            </Col>
                            <Col md={6} className="mt-2">
                                <label htmlFor="loan-disbursement">Loan Disbursement Date</label>
                                <Flatpickr options={{ // Sets the minimum date as 14 days ago
                                    dateFormat: "Y-m-d"
                                }}
                                    className='form-control'
                                    value={formData?.Loan_Disbursement_Date} onChange={(date) => {
                                        setFormData({ ...formData, Loan_Disbursement_Date: moment(date[0]).format("YYYY-MM-DD") })
                                    }}
                                    placeholder='Select date'
                                />
                                {/* <input

                            placeholder="Loan Disbursement Date"
                            type="date"
                            id="personalDetails-dob"
                            name="Loan_Disbursement_Date"
                            className="form-control"
                            value={formData?.Loan_Disbursement_Date}
                            onChange={handleInputChange}
                        /> */}
                            </Col>
                            <Col xs={12} className='mt-2'>
                                <div className='d-flex justify-content-between mt-2'>
                                    <div>
                                        <button className="btn btn-primary" onClick={() => {
                                            navigate(-1)
                                        }} type="button">Cancel</button>
                                    </div>
                                    <div>
                                        <button className="btn btn-primary ms-2" type="button" onClick={handleNext}>Next</button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        {/* </form> */}
                    </Container>
                ) : (
                    <Container>
                        <div className='d-flex justify-content-center align-items-center w-100'>
                            <Spinner size={'40px'} />
                        </div>
                    </Container>

                )
            }

        </>
    )
}

export default ApplicantForm