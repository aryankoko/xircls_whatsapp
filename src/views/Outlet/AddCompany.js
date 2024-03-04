import React, { useState, useEffect } from 'react'
import { Info, Paperclip, Trash } from 'react-feather'
import { Card, CardBody, Row, Col, UncontrolledTooltip, Input, Label } from 'reactstrap'
import { imageValidation, ownUrl, validForm } from '../Validator'
import waterMark from "@src/assets/images/logo/xircls-waterMark.png"
import { getReq, postReq } from '../../assets/auth/jwtService'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { selectPhoneList } from '../../Helper/data'
import Select from 'react-select'

const default_data = {
    company_name: "",
    company_type: "",
    company_website: "",
    outlet_email: "",
    landline_1: "",
    mobile: "",
    street_address1: "",
    street_address2: "",
    area: "",
    landmark: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    cin_no: "",
    gst_no: "",
    phone_code: "",
    outlet_categories: []
}

const valueToCheck = [
    {
        name: 'company_name',
        message: 'Please enter company name',
        type: 'string',
        id: 'company_name'
    },
    {
        name: 'company_type',
        message: 'Please enter company type',
        type: 'string',
        id: 'company_type'
    },
    {
        name: 'company_website',
        message: 'Please enter company website',
        type: 'string',
        id: 'company_website'
    },
    {
        name: 'outlet_email',
        message: 'Please enter company email',
        type: 'string',
        id: 'outlet_email'
    },
    // {
    //     name: 'phone_code',
    //     message: 'Please enter phone code',
    //     type: 'string',
    //     id: 'mobile'
    // },
    {
        name: 'mobile',
        message: 'Please enter mobile number',
        type: 'string',
        id: 'mobile'
    },
    {
        name: 'street_address1',
        message: 'Please enter flat and/or building/house details',
        type: 'string',
        id: 'street_address1'
    },
    {
        name: 'street_address2',
        message: 'Please enter street, lane or road',
        type: 'string',
        id: 'street_address2'
    },
    {
        name: 'area',
        message: 'Please enter area',
        type: 'string',
        id: 'area'
    },
    {
        name: 'landmark',
        message: 'Please enter landmark',
        type: 'string',
        id: 'landmark'
    },
    {
        name: 'country',
        message: 'Please enter country',
        type: 'string',
        id: 'country'
    },
    {
        name: 'state',
        message: 'Please enter state',
        type: 'string',
        id: 'state'
    },
    {
        name: 'city',
        message: 'Please enter city',
        type: 'string',
        id: 'city'
    },
    {
        name: 'pincode',
        message: 'Please enter pincode',
        type: 'string',
        id: 'pincode'
    },
    {
        name: 'cin_no',
        message: 'Please enter company information number',
        type: 'string',
        id: 'cin_no'
    },
    {
        name: 'gst_no',
        message: 'Please enter tax registration/VAT/GSTIN',
        type: 'string',
        id: 'gst_no'
    }
]

const AddCompany = () => {
    // const location = useLocation()
    const [imageUrl, setImageUrl] = useState(waterMark)
    const [imageObject, setimageObject] = useState({})
    const [data, setData] = useState(default_data)
    const [categories, setCategories] = useState([])
    const [country, setCountry] = useState([])
    const [state, setState] = useState([])
    const [cities, setCities] = useState([])
    const history = useNavigate()
    // console.log(location)

    const get_image = (e) => {
        const checkVaildImage = imageValidation(e)

        if (checkVaildImage) {
            setImageUrl(URL.createObjectURL(e.target.files[0]))
            setimageObject(e.target.files[0])
        } else {
            setImageUrl(waterMark)
            setimageObject({})
        }
    }

    const deleteImage = () => {
        setImageUrl(waterMark)
        setimageObject({})
    }

    const addData = (e) => {
        setData({...data, [e.target.name]: e.target.value })
    }

    
    const changeCategories = (e, id) => {
        if (e.target.checked) {
            // data.outlet_categories.push(id)
            setData({...data, outlet_categories: [...data.outlet_categories, id]})
        } else {
            setData({...data, outlet_categories: data.outlet_categories.filter((curElem) => { return curElem !== id })})
        }

        console.log(data.outlet_categories)
        
    }
    // console.log(data)

    const getData = () => {
        getReq('addCompany')
        .then((resp) => {
            console.log(resp)
            const drillVariable = resp?.data?.data?.company_profile
            // const merchant_profile = resp?.data?.data?.merchant_profile
            setCategories(resp?.data?.data?.categories)
            const updatedData = {
                company_name: drillVariable?.company_name,
                company_type: drillVariable?.company_type,
                company_website: drillVariable?.company_website,
                outlet_email: drillVariable?.outlet_email,
                landline_1: drillVariable?.landline_1,
                mobile: drillVariable?.mobile,
                street_address1: drillVariable?.street_address1,
                street_address2: drillVariable?.street_address2,
                area: drillVariable?.area,
                landmark: drillVariable?.landmark,
                country: drillVariable?.country,
                state: drillVariable?.state,
                city: drillVariable?.city,
                pincode: drillVariable.pincode,
                cin_no: drillVariable?.cin_no,
                gst_no: drillVariable?.gst_no,
                outlet_categories: [],
                phone_code: ""
            }

            setImageUrl(drillVariable.company_logo)
            setData(updatedData)
            // setIsLoading(false)
        })
        .catch((error) => {
            // setIsLoading(false)
            console.log(error)
        })
    }

    const saveData = (type) => {

        const check = validForm(valueToCheck, data)
        console.log(check)
        if (check) {
            const form_data = new FormData()
            Object.entries(data).map(([key, value]) => {
                form_data.append(key, value)
            })
            form_data.append('company_logo', imageObject)
    
            postReq('addCompany', form_data)
            .then((resp) => {
                console.log(resp)
                getData()
                toast.success(resp.data.message)
                if (type === "save&pro") {
                    history(-1)
                }
            })
            .catch((error) => {
                console.log(error)
            })

        }
    }


    const handleChange = (options, actionMeta, check) => {
        if (check) { 
            const option_list = options.map((cur) => {
                return cur.value
            })
            setData({...data, [actionMeta.name]: option_list })
        } else {
            setData({...data, [actionMeta.name]: options.value })
        }
    
    }

    const getCountries = () => {
        getReq('countries')
        .then((resp) => {
            console.log(resp)

            setCountry(resp.data.data.countries.map((curElem) => {
                return {value: `${curElem.name}`, label: `${curElem.name}`}
            }))
        })
        .catch((error) => {
            console.log(error)
        })
    }
    
    useEffect(() => {

        getData()
        getCountries()
        
    }, [])

    useEffect(() => {
        if (data.country !== "") {

            const form_data = new FormData()
            form_data.append('country_id', data.country)
            postReq('getState', form_data)
            .then((resp) => {
                console.log(resp)
                setState(resp.data.data.states.map((curElem) => {
                    return {value: curElem.id, label: `${curElem.name}`}
                }))
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }, [data.country])

    // console.log(data)

    useEffect(() => {
        if (data.state !== "") {

            const form_data = new FormData()
            form_data.append('state_id', data.state)
            console.log(form_data)
            postReq('getCities', form_data)
            .then((resp) => {
                console.log(resp)
                setCities(resp.data.data.cities.map((curElem) => {
                    return {value: curElem.id, label: `${curElem.name}`}
                }))
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }, [data.state])

    return (
        <>
            {/* <Card>
                <CardBody>
                    <h4>Add Company</h4>
                </CardBody>
            </Card> */}

            <Card>
                <CardBody>
                    <h4>Basic Details</h4>
                    <Row>
                        <Col md={4} className="mb-1" >
                            <div className="form-group">
                                <label htmlFor="company_name">Company Name</label>
                                <input type="text" id='company_name' name='company_name' className='form-control' value={data?.company_name.substr(0, 1).toUpperCase() + data?.company_name.substr(1)} onChange={(e) => addData(e)} />
                                <p id="company_name_val" className="text-danger m-0 p-0 vaildMessage"></p>

                            </div>
                        </Col>
                        <Col md={4} className="mb-1" >
                            <div className="form-group">
                                <label htmlFor="company_type">Company type</label>
                                <select id='company_type' name='company_type' className='form-control' value={data?.company_type} onChange={(e) => addData(e)}>
                                    <option value="" disabled="" selected="">Select Type</option>
                                    <option value="LTD">Limited Company</option>
                                    <option value="PVTLTD" selected="selected">Private Limited Company</option>
                                    <option value="LLP">Limited Liability Partnership</option>
                                    <option value="PS">Partnership Firm</option>
                                    <option value="SPP">Sole Proprietorship</option>
                                    <option value="OTHER">Other</option>
                                </select>
                                <p id="company_type_val" className="text-danger m-0 p-0 vaildMessage"></p>

                                {/* <input type="text" id='company_type' name='company_type' className='form-control' value={data?.company_type} onChange={(e) => addData(e)} /> */}
                            </div>
                        </Col>
                        <Col md={4} className="mb-1" >
                            <div className="form-group">
                                <label htmlFor="company_website">Company Website</label>
                                <input type="text" id='company_website' name='company_website' className='form-control' value={data?.company_website} onChange={(e) => addData(e)} />
                                <p id="company_website_val" className="text-danger m-0 p-0 vaildMessage"></p>

                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4} className="mb-1" >
                            <div className="form-group">
                                <label htmlFor="outlet_email">Company Email</label>
                                <input type="text" id='outlet_email' name='outlet_email' className='form-control' value={data?.outlet_email} onChange={(e) => addData(e)} />
                                <p id="outlet_email_val" className="text-danger m-0 p-0 vaildMessage"></p>

                            </div>
                        </Col>
                        <Col md={4} className="mb-1" >
                            <div className="form-group">
                                <label htmlFor="landline_1">Landline Number (Optional)</label>
                                <input type="text" id='landline_1' name='landline_1' className='form-control' value={data?.landline_1} onChange={(e) => {
                                    if (!isNaN(e.target.value)) {
                                        addData(e)
                                    }
                                }} />
                                <p id="landline_1_val" className="text-danger m-0 p-0 vaildMessage"></p>

                            </div>
                        </Col>

                        <Col md={4} className="mb-1" >
                            <div className="row">
                                <label htmlFor="mobile">Mobile Number</label>
                                <div className="col-lg-3 mb-1">
                                    <Select
                                        isMulti = {false}
                                        options={selectPhoneList}
                                        inputId="aria-example-input"
                                        closeMenuOnSelect={true}
                                        name="phone_code"
                                        onChange={(value, actionMeta) => handleChange(value, actionMeta, false)}
                                        value={selectPhoneList.filter(option => data?.phone_code === option.value)}
                                        styles={{
                                            control: (baseStyles) => ({
                                                ...baseStyles,
                                                fontSize: '12px',
                                                margin: 0,
                                                height: '100%'
                                            })
                                        }}
                                    />
                                </div>
                                <div className="col-lg-9 mb-1">
                                    <div className="form-group">
                                        <input type="text" id='mobile' name='mobile' className='form-control w-100' value={data?.mobile} onChange={(e) => {
                                            if (!isNaN(e.target.value)) {
                                                addData(e)
                                            }
                                        }} />
                                    </div>
                                </div>
                                <p id="mobile_val" className="text-danger m-0 p-0 vaildMessage"></p>

                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <h4>Address</h4>
                    <Row>
                        <Col md={4} className="mb-1" >
                            <div className="form-group">
                                <label htmlFor="street_address1">Flat and/or Building/House Details *</label>
                                <input type="text" id='street_address1' name='street_address1' className='form-control' value={data?.street_address1} onChange={(e) => addData(e)} />
                                <p id="street_address1_val" className="text-danger m-0 p-0 vaildMessage"></p>
                                        
                            </div>
                        </Col>
                        <Col md={4} className="mb-1" >
                            <div className="form-group">
                                <label htmlFor="street_address2">Street, Lane or Road *</label>
                                <input type="text" id='street_address2' name='street_address2' className='form-control' value={data?.street_address2} onChange={(e) => addData(e)} />
                                <p id="street_address2_val" className="text-danger m-0 p-0 vaildMessage"></p>
                                        
                            </div>
                        </Col>
                        <Col md={4} className="mb-1" >
                            <div className="form-group">
                                <label htmlFor="area">Enter Area, Locality or Suburb e.g. Bandra *</label>
                                <input type="text" id='area' name='area' className='form-control' value={data?.area} onChange={(e) => addData(e)} />
                                <p id="area_val" className="text-danger m-0 p-0 vaildMessage"></p>
                                        
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4} className="mb-1" >
                            <div className="form-group">
                                <label htmlFor="landmark">Landmark</label>
                                <input type="text" id='landmark' name='landmark' className='form-control' value={data?.landmark} onChange={(e) => addData(e)} />
                                <p id="landmark_val" className="text-danger m-0 p-0 vaildMessage"></p>
                                        
                            </div>
                        </Col>
                        <Col md={4} className="mb-1" >
                            <div className="form-group">
                                <label htmlFor="country">Country *</label>
                                <Select
                                    isMulti = {false}
                                    options={country}
                                    inputId="aria-example-input"
                                    closeMenuOnSelect={true}
                                    name="country"
                                    placeholder="Select Country"
                                    value={country.filter(option => String(data?.country) === String(option.value))}
                                    onChange={(value, actionMeta) => handleChange(value, actionMeta, false)}
                                />
                                <p id="country_val" className="text-danger m-0 p-0 vaildMessage"></p>

                                {/* <input type="text" id='country' name='country' className='form-control' value={data?.country} onChange={(e) => addData(e)} /> */}
                            </div>
                        </Col>
                        <Col md={4} className="mb-1" >
                            <div className="form-group">
                                <label htmlFor="state">State *</label>
                                {
                                    state.length === 0 ? (
                                        <input className='form-control' name="state" placeholder="Select state" onChange={(e) => addData(e)} value={data?.state} />
                                    ) : <Select
                                        isMulti = {false}
                                        options={state}
                                        inputId="aria-example-input"
                                        closeMenuOnSelect={true}
                                        noOptionsMessage={() => "Please select a state"}
                                        name="state"
                                        placeholder="Select state"
                                        value={state.filter(option => String(data?.state) === String(option.value))}
                                        onChange={(value, actionMeta) => handleChange(value, actionMeta, false)}
                                    />
                                }
                                
                                <p id="state_val" className="text-danger m-0 p-0 vaildMessage"></p>
                                
                            </div>
                        </Col>
                        <Col md={4} className="mb-1" >
                            <div className="form-group">
                                <label htmlFor="city">City *</label>
                                {
                                    cities.length === 0 ? (
                                        <input className='form-control' name="city" placeholder="Select city" onChange={(e) => addData(e)} value={data?.city} />
                                    ) : <Select
                                        isMulti = {false}
                                        options={cities}
                                        inputId="aria-example-input"
                                        closeMenuOnSelect={true}
                                        name="city"
                                        noOptionsMessage={() => "Please select a city"}
                                        placeholder="Select city"
                                        value={cities.filter(option => String(data?.city) === String(option.value))}
                                        onChange={(value, actionMeta) => handleChange(value, actionMeta, false)}
                                    />
                                }
                                
                                <p id="city_val" className="text-danger m-0 p-0 vaildMessage"></p>

                                {/* <input type="text" id='city' name='city' className='form-control' value={data?.city} onChange={(e) => addData(e)} /> */}
                            </div>
                        </Col>
                        <Col md={4} className="mb-1" >
                            <div className="form-group">
                                <label htmlFor="pincode">Pincode </label>
                                <input type="text" id='pincode' name='pincode' className='form-control' value={data?.pincode} onChange={(e) => {
                                    if (!isNaN(e.target.value)) {
                                        addData(e)
                                    }
                                }} />
                                <p id="pincode_val" className="text-danger m-0 p-0 vaildMessage"></p>
                                        
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <h4>Personal</h4>
                    <Row>
                        <Col md={4} className="mb-1" >
                            <div className="form-group">
                                <label htmlFor="cin_no">Company Information Number</label>
                                <input type="text" id='cin_no' name='cin_no' className='form-control' value={data?.cin_no} onChange={(e) => addData(e)} />
                                <p id="cin_no_val" className="text-danger m-0 p-0 vaildMessage"></p>
                                        
                            </div>
                        </Col>
                        <Col md={4} className="mb-1" >
                            <div className="form-group">
                                <label htmlFor="gst_no">Tax Registration/VAT/GSTIN</label>
                                <input type="text" id='gst_no' name='gst_no' className='form-control' value={data?.gst_no} onChange={(e) => addData(e)} />
                                <p id="gst_no_val" className="text-danger m-0 p-0 vaildMessage"></p>
                                        
                            </div>
                        </Col>

                    </Row>
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <h4 className='mb-2'>Company Logo</h4>
                    <label className='mb-2'>400px X 400px,PNG/JPEG/GIF format</label>
                    <div className="d-flex justify-content-start align-items-center gap-3">
                        <div className="image">
                            <img id="show_image" width="180px" src={`${ownUrl}${imageUrl}`} alt="company_logo" />
                        </div>
                        <div className="action d-flex justify-content-center align-items-center gap-2">
                            <div className="upload">
                                <label htmlFor="image_file" className='btn btn-sm btn-success'> <Paperclip size={16} /> </label>
                                <input type="file" name='image_file' id='image_file' onChange={(e) => get_image(e)} className='d-none' />
                            </div>
                            <div className="delete">
                                <label htmlFor="delete" className='btn btn-sm btn-danger' onClick={() => deleteImage()}> <Trash size={16} /> </label>
                            </div>

                        </div>
                    </div>
                    <Row className="mt-2">
                        <Col md={12}>
                            <div className="button-div  d-flex justify-content-between align-items-center">
                                <div className="back">
                                    <a className='btn btn-primary' onClick={() => history(-1)}>Back</a>
                                </div>
                                <div className="next d-flex justify-content-center align-items-center gap-1">
                                    <a className='btn btn-primary' onClick={() => saveData("save")}>Save</a>
                                    <a className='btn btn-primary' onClick={() => saveData("save&pro")}>Save & Close</a>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            <Card className="d-none">
                <CardBody>
                    <UncontrolledTooltip placement='top' target='UnControlledExample'>
                        <h6 className='text-white'>You can change this later or add more categories.</h6> 
                    </UncontrolledTooltip>
                    <div className="categories d-flex align-items-start gap-1 mb-2">
                        <h4>Select categories your company operates in: * </h4>
                        <div id='UnControlledExample' style={{ cursor: `pointer` }}>
                            <Info size={16}/>
                        </div>
                        
                    </div>
                    <Row className='mb-4'>
                        {
                            categories && data?.outlet_categories ? categories.map((curElem, i) => {
                                // console.log(curElem.id)
                                return <Col md={3} className="m-1" key={i}>
                                <div className='form-check form-check-success'>
                                    <Input type='checkbox' id={i} defaultChecked={data?.outlet_categories.includes(Number(curElem.id))}  name="selected_cat" onChange={(e) => changeCategories(e, curElem.id)} />
                                    <Label className='form-check-label' for={i}>
                                        {curElem.name}
                                    </Label>
                                </div>
                            </Col>
                            }) : null
                        }
                        
                    </Row>
                    
                    
                </CardBody>
            </Card>
            
        </>
    )
}

export default AddCompany