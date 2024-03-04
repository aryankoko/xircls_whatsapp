import React, { useEffect, useState } from 'react'
// import Select from 'react-select/dist/declarations/src/Select'
import { Col, Container, Row } from 'reactstrap'
// import { $ } from 'jquery'
// import AsyncSelect from 'react-select/dist/declarations/src/Async'
// import AsyncSelect from 'react-select/dist/declarations/src/Async'
import AsyncSelect from 'react-select/async'
import Select from "react-select"
import { crmURL, getReq, postReq } from '../../../assets/auth/jwtService'
import { validForm } from '../../Validator'
// import toast from 'react-hot-toast'
// import { useParams } from 'react-router-dom'
import Flatpickr from 'react-flatpickr'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import Spinner from '../../Components/DataTable/Spinner'

const VehicleForm = ({ isView, apiCall, defaultData, setData, isCustomer }) => {
    // const { id } = useParams()
    const [brand, setBrand] = useState([])
    const navigate = useNavigate()
    console.log(defaultData)
    // const [defaultState, setDefaultState] = useState(edit ? defaultData : {
    //     // defaultData
    //     customer_name: "",
    //     registration_number: "",
    //     sales_person: "",
    //     vehicle_number: "",
    //     engine_no: "",
    //     vehicle_type: "",
    //     brand: "",
    //     car_model: "",
    //     variant: "",
    //     manufacture_year: "",
    //     delivery_date: "",
    //     registeration_date: ""
    // })

    const [productModelOption, setProductModelOption] = useState([])
    const [productVariantOption, setProductVariantOption] = useState([])
    const [customerList, setCustomerList] = useState([])
    console.log(setProductModelOption, setProductVariantOption)
    const [isLoading, setIsLoading] = useState(true)

    const checkMessage = [
        {
            name: 'xircls_customer_id',
            message: 'Enter Customer Name',
            type: 'string',
            id: 'xircls_customer_id'
        },
        {
            name: 'vehicle_type',
            message: 'Select Vehicle Type',
            type: 'string',
            id: 'vehicle_type'
        },
        {
            name: 'brand',
            message: 'Select Brand',
            type: 'string',
            id: 'brand'
        },
        {
            name: 'car_model',
            message: 'Select Car Model',
            type: 'string',
            id: 'car_model'
        },
        {
            name: 'variant',
            message: 'Select Variant',
            type: 'string',
            id: 'variant'
        },
        {
            name: 'manufacture_year',
            message: 'Select Manufacture Date',
            type: 'string',
            id: 'manufacture_year'
        }
    ]

    // const handleSubmitSection = async (e) => {
    //     e.preventDefault()
    //     const checkForm = validForm(checkMessage, defaultState) // Use mainFormvalueToCheck for validation
    //     console.log({ checkForm })
    // }

    const handleSubmitSection = (e, btn) => {
        e.preventDefault()

        const checkForm = validForm(checkMessage, defaultData)
        if (checkForm) {
            // const formValues = document.getElementById(formId)
            // const form_data = new FormData(formValues)
            apiCall(btn)
        }
    }


    const handleInputChange = (e) => {
        console.log(e)
        setData(prevData => ({ ...prevData, [e.target.name]: e.target.value }))
    }


    // const isView = false
    const startYear = 2000
    const endYear = 2050
    const years = Array.from({ length: endYear - startYear + 1 }, (_, index) => startYear + index)
    const vehicleTypeOptions = [
        { value: 'new', label: 'New Car' },
        { value: 'used', label: 'Used Car' },
        { value: 'renewal', label: 'Renewal' },
        { value: 'rollover', label: 'Rollover' },
        { value: 'data', label: 'Data' }
    ]

    console.log(defaultData?.vehicle_type, "defaultData?.vehicle_type")
    console.log(productModelOption, productVariantOption, "productModelOption")

    const getBrand = () => {
        // const getUrl = new URL(`${crmURL}/vehicle/fetch_car_details/`)
        // axios.get(getUrl.toString())
        getReq("fetch_car_details", "", crmURL)
            .then((response) => {
                const successData = response.data.car_brand
                const brandOptions = successData
                    .filter((item) => item[0] !== "")
                    .map((item) => ({
                        value: item[0],
                        label: item[0]
                    }))
                console.log(brandOptions, "brandOptions")
                setBrand(brandOptions)
            })
            .catch((error) => {
                console.error("Error fetching data:", error.message)
            })
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

    const fetchModel = () => {
        const form_data = new FormData()
        form_data.append("brand", defaultData.brand)

        postReq('fetch_car_details', form_data, crmURL)
            .then((resp) => {
                console.log(resp, "fetch_car_details")
                setProductModelOption(resp?.data?.car_model?.map((curElem) => {
                    return { label: curElem, value: curElem }
                }))
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const fetchVariant = () => {
        const form_data = new FormData()
        form_data.append("carmodel", defaultData.car_model)

        postReq('fetch_car_details', form_data, crmURL)
            .then((resp) => {
                console.log(resp, "fetch_car_details")
                setProductVariantOption(resp?.data?.car_variant?.map((curElem) => {
                    return { label: curElem, value: curElem }
                }))
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        if (defaultData.brand) {
            fetchModel()
        }
    }, [defaultData.brand])

    useEffect(() => {
        if (defaultData?.car_model) {
            fetchVariant()
        }
    }, [defaultData?.car_model])

    useEffect(() => {
        getBrand()
        getCustomer()
    }, [])

    const vehicleYearOption = years.map((year) => ({
        value: year.toString(),
        label: year.toString()
    }))

    return (
        <>
            {
                !isLoading ? (
                    <Container fluid className="px-0 pb-1">
                        <Row>
                            {/* <Col md={12} className="">
                        <h4 className="mb-0">Vehicle Details</h4>
                    </Col> */}
                            <Col md={6} className="mt-2">
                                <label htmlFor="customer-name">
                                    Customer Name
                                </label>
                                <Select
                                    placeholder='Customer Name'
                                    id="vehicle-type"
                                    options={customerList}
                                    closeMenuOnSelect={true}
                                    // isDisabled={isView}
                                    isDisabled={isCustomer}
                                    value={customerList?.filter((curElem) => Number(defaultData?.xircls_customer_id) === Number(curElem?.value))}
                                    onChange={selectedOption => {
                                        handleInputChange({
                                            target: { name: 'xircls_customer_id', value: selectedOption.value }
                                        })
                                    }}
                                />
                                {/* <input value={defaultData.customer_name} type='text' id='customer-name' name='customer_name' className="form-control" onChange={(e) => handleInputChange(e)} /> */}
                                <p id="xircls_customer_id_val" className="text-danger m-0 p-0 vaildMessage"></p>
                            </Col>
                            <Col md={6} className="mt-2">
                                <label htmlFor="registration-name">
                                    Registration Number
                                </label>
                                <input
                                    placeholder='Registration Number'
                                    type='text' id='registration-name' value={defaultData.registration_number} name='registration_number' className="form-control" onChange={(e) => handleInputChange(e)} />
                            </Col>
                            <Col md={6} className="mt-2">
                                <label htmlFor="sales-person">
                                    Sales Person
                                </label>
                                <input
                                    placeholder='Sales Person'
                                    type='text' id='sales-person' value={defaultData.sales_person} name='sales_person' className="form-control" onChange={(e) => handleInputChange(e)} />
                            </Col>
                            <Col md={6} className="mt-2">
                                <label htmlFor="vehicle-identification">
                                    Vehicle Identification Number (VIN) or Chassis Number
                                </label>
                                <input
                                    placeholder='Vehicle Identification Number'
                                    type='text' id='vehicle-identification' name='vehicle_number' value={defaultData.vehicle_number} className="form-control" onChange={(e) => handleInputChange(e)} />
                            </Col>
                            <Col md={6} className="mt-2">
                                <label htmlFor="engine-number">
                                    Engine Number
                                </label>
                                <input
                                    placeholder='Engine Number'
                                    type='text' id='engine-number' value={defaultData.engine_no} name='engine_no' className="form-control" onChange={(e) => handleInputChange(e)} />
                            </Col>

                            <Col md={6} className="mt-2">
                                <label htmlFor="vehicle-type" className="" style={{ margin: '0px' }}>
                                    Vehicle Type
                                </label>
                                <Select
                                    placeholder='Vehicle Type'
                                    id="vehicle-type"
                                    options={vehicleTypeOptions}
                                    closeMenuOnSelect={true}
                                    isDisabled={isView}
                                    value={vehicleTypeOptions?.filter((curElem) => defaultData?.vehicle_type === curElem?.value)}
                                    onChange={selectedOption => {
                                        handleInputChange({
                                            target: { name: 'vehicle_type', value: selectedOption.value }
                                        })
                                    }}
                                />

                                <input type='hidden' value={defaultData?.vehicle_type} id='vehicle_type' name='vehicle_type' />
                                <p id="vehicle_type_val" className="text-danger m-0 p-0 vaildMessage"></p>
                            </Col>
                            <Col md={6} className="mt-2">
                                <label htmlFor="brand-select" className="" style={{ margin: '0px' }}>
                                    Select Brand
                                </label>
                                <Select
                                    placeholder='Select Brand'
                                    defaultOptions
                                    cacheOptions
                                    id="brand-select"
                                    options={brand}
                                    value={brand?.filter((curElem) => defaultData?.brand === curElem?.value)}
                                    // loadOptions={loadBrandOptions}
                                    onChange={selectedOption => {
                                        // selectChange(selectedOption, 'brand')
                                        // document.getElementById('brand').value = selectedOption ? selectedOption.value : ''
                                        handleInputChange({
                                            target: { name: 'brand', value: selectedOption.value }
                                        })
                                    }}
                                    isDisabled={isView}
                                />
                                <input type='hidden' value={defaultData?.brand} id='brand' name='brand' />
                                <p id="brand_val" className="text-danger m-0 p-0 vaildMessage"></p>
                            </Col>
                            <Col md={6} className="mt-2">
                                <label htmlFor="model-select" className="" style={{ margin: '0px' }}>
                                    Select Model
                                </label>
                                <Select
                                    placeholder='Select Model'
                                    id="model-select"
                                    options={productModelOption}
                                    closeMenuOnSelect={true}
                                    isDisabled={isView}
                                    value={productModelOption?.filter((curElem) => defaultData?.car_model === curElem?.value)}
                                    onChange={selectedOption => {
                                        handleInputChange({
                                            target: { name: 'car_model', value: selectedOption.value }
                                        })
                                    }}
                                />
                                <input type='hidden' value={defaultData?.car_model} id='car_model' name='car_model' />
                                <p id="car_model_val" className="text-danger m-0 p-0 vaildMessage"></p>
                            </Col>
                            <Col md={6} className="mt-2">
                                <label htmlFor="variant-select" className="" style={{ margin: '0px' }}>
                                    Select Variant
                                </label>
                                <Select
                                    placeholder='Select Variant'
                                    id="variant-select"
                                    options={productVariantOption}
                                    closeMenuOnSelect={true}
                                    isDisabled={isView}
                                    value={productVariantOption?.filter((curElem) => defaultData?.variant === curElem?.value)}
                                    onChange={selectedOption => {
                                        // document.getElementById('variant').value = selectedOption ? selectedOption.value : ''
                                        handleInputChange({
                                            target: { name: 'variant', value: selectedOption.value }
                                        })
                                    }}
                                />
                                <input type='hidden' value={defaultData?.variant} id='variant' name='variant' />
                                <p id="variant_val" className="text-danger m-0 p-0 vaildMessage"></p>
                            </Col>
                            <Col md={6} className="mt-2">
                                <label htmlFor="manufacture-select" className="" style={{ margin: '0px' }}>
                                    Vehicle Manufacture Year
                                </label>
                                <Select
                                    placeholder='Vehicle Manufacture Year'
                                    id="manufacture-select"
                                    options={vehicleYearOption}
                                    closeMenuOnSelect={true}
                                    value={vehicleYearOption?.filter((curElem) => defaultData?.manufacture_year === curElem?.value)}
                                    isDisabled={isView}
                                    onChange={selectedOption => {
                                        // document.getElementById('manufacture_year').value = selectedOption ? selectedOption.value : ''
                                        handleInputChange({
                                            target: { name: 'manufacture_year', value: selectedOption.value }
                                        })
                                    }}
                                />
                                <input type='hidden' value={defaultData?.manufacture_year} id='manufacture_year' name='manufacture_year' />
                                <p id="manufacture_year_val" className="text-danger m-0 p-0 vaildMessage"></p>

                            </Col>
                            <Col md={6} className="mt-2">
                                <label htmlFor="vehicle-delivery-date">
                                    Vehicle Delivery Date
                                </label>
                                {/* <input value={defaultData?.delivery_date} placeholder="Vehicle Delivery Date" type='date' id='vehicle-delivery-date' name='delivery_date' className="form-control" /> */}
                                <Flatpickr
                                    name='delivery_date'
                                    className='form-control'
                                    value={defaultData?.delivery_date}
                                    onChange={(date) => {
                                        setData({ ...defaultData, delivery_date: moment(date[0]).format("YYYY-MM-DD") })
                                    }}
                                />
                            </Col>
                            <Col md={6} className="mt-2">
                                <label htmlFor="vehicle-registration-date">
                                    Vehicle Registration Date
                                </label>
                                {/* <input value={defaultData.registeration_date} placeholder="Vehicle Registration Date" type='date' id='vehicle-registration-date' name='registeration_date' className="form-control" /> */}
                                <Flatpickr
                                    name='registeration_date'
                                    className='form-control'
                                    value={defaultData.registeration_date}
                                    onChange={(date) => {
                                        setData({ ...defaultData, registeration_date: moment(date[0]).format("YYYY-MM-DD") })
                                    }}
                                />

                                {/* disabled={isView} */}
                            </Col>
                        </Row>
                        <div className='w-100 d-flex justify-content-between mt-2'>
                            <div>
                                <button className="btn btn-primary" type="button" onClick={() => navigate(-1)} >Back</button>
                            </div>
                            {!isView &&
                                <div>
                                    <button className="btn btn-primary ms-2" type="button" onClick={(e) => handleSubmitSection(e, "SAVE")} >Save</button>
                                    <button className="btn btn-primary ms-2" type="button" onClick={e => handleSubmitSection(e, 'SAVE&Close')} >Save & Close</button>
                                </div>
                            }
                        </div>
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

export default VehicleForm