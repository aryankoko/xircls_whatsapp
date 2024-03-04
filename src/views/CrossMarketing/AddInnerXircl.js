import { Card, CardBody, Col, Input, Label, Row } from "reactstrap"
import PickerDefault from "../Components/Date-picker/NormalDatePicker"
import { useEffect, useState } from "react"
import { getReq, postReq, putReq } from "../../assets/auth/jwtService"
import { Link, useNavigate, useParams } from "react-router-dom"
import Flatpickr from 'react-flatpickr'
import moment from "moment/moment"
import Select from 'react-select'
import toast from "react-hot-toast"
import { validForm } from "../Validator"
// import { formatDate } from "../Validator"

const AddInnerXircl = () => {
    // const [startDate, setStartDate] = useState([new Date()])
    // const [endDate, setEndDate] = useState([new Date()])
    // const [innerXirclName, setInnerXirclName] = useState("")
    // const [objective, setObjective] = useState("")
    const valueToCheck = [
        {
            name: 'name',
            message: 'Please enter your Inner XIRCL name',
            type: 'string',
            id: 'name'
        },
        {
            name: 'min_spend_val',
            message: 'Please enter minimum spend',
            type: 'string',
            id: 'min_spend_val'
        },
        {
            name: 'max_spend_val',
            message: 'Please enter maximum spend',
            type: 'string',
            id: 'max_spend_val'
        },
        {
            name: 'group_start_date',
            message: 'Please select start date',
            type: 'string',
            id: 'group_start_date'
        },
        {
            name: 'group_end_date',
            message: 'Please select end date',
            type: 'string',
            id: 'group_end_date'
        }
    ]
    const [data, setData] = useState({
        name: "",
        Objective:  "loyalty",
        group_start_date: '',
        group_end_date:  '',
        location_selected: 'global',
        selectedCurrency: "",
        selectedCountry: [],
        selectedState: [],
        selectCities: [],
        max_spend_val: '',
        min_spend_val: ''
    })

    const [currencyList, setCurrencyList] = useState([])
    const [country, setCountry] = useState([])
    const [state, setState] = useState([])
    const [cities, setCities] = useState([])
    const { id } = useParams()

    const navigate = useNavigate()

    const getCountries = () => {
        getReq('countries')
        .then((resp) => {
            console.log(resp)

            setCurrencyList(resp.data.data.countries.map((curElem) => {
                return {value: curElem.id, label: `${curElem.iso3} - ${curElem.currency_symbol} `}
            }))

            setCountry(resp.data.data.countries.map((curElem) => {
                return {value: `${curElem.name}`, label: `${curElem.name}`}
            }))

            // const updatedData = {
            //     currencyList: ,
            //     country: 
            // }

            // setData((predata) => ({
            //     ...predata,
            //     ...updatedData
            // }))
        })
        .catch((error) => {
            console.log(error)
        })
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

    const success = (resp) => {
        console.log(resp)
        if (id) {
            toast.success('Inner Xircl updated')

        } else {
            toast.success('Inner Xircl created')
        }
        if (data.Objective === "targeting") {
            navigate(`/merchant/xircls/inner-xircl/inner_xircl_targeting/${resp.data.id}/`)
        } else {
            navigate(`/merchant/xircls/inner-xircl/inner_xircl_two/${resp.data.id}/`)
        }  
    }

    console.log(data)

    const updateData = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }

    const getData = () => {
        getReq("innerXirclTwo", `?id=${id}`)
        .then((resp) => {
            console.log(resp)
            const updatedData = {
                name: resp?.data?.data?.inner_xircl_info?.name,
                Objective:  resp?.data?.data?.inner_xircl_info?.Objective,
                group_start_date:  moment(new Date(resp?.data?.data?.inner_xircl_info?.group_start_date)).format('YYYY-MM-DD'),
                group_end_date:  moment(new Date(resp?.data?.data?.inner_xircl_info?.group_end_date)).format('YYYY-MM-DD'),
                location_selected: 'global',
                selectedCurrency: "",
                selectedCountry: [],
                selectedState: [],
                selectCities: [],
                max_spend_val: resp?.data?.data?.inner_xircl_info?.max_spend_val,
                min_spend_val: resp?.data?.data?.inner_xircl_info?.min_spend_val
            }

            setData(updatedData)
        })
        .catch((error) => {
            console.log(error)
            // setData([])
        })
    }

    useEffect(() => {
        getCountries()
        if (id) {
            getData()
        }
    }, [])

    useEffect(() => {
        if (data.selectedCountry.length > 0) {
            const form_data = new FormData()
            form_data.append('country_id', data.selectedCountry)
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
    }, [data.selectedCountry])

    useEffect(() => {
        if (data.selectedState.length > 0) {
            const form_data = new FormData()
            form_data.append('state_id', data.selectedState)
            console.log(form_data)
            postReq('getCities', form_data)
            .then((data) => data.json())
            .then((resp) => {
                console.log(resp)
                setCities(resp.data.data.states.map((curElem) => {
                    return {value: curElem.id, label: `${curElem.name}`}
                }))
            })
            .catch((error) => {
                console.log(error)
            })

        }
    }, [data.selectedState])

    
    const saveInnerXirclsDetails = () => {

        const check = validForm(valueToCheck, data)
        console.log(check)

        if (check) {
            const form_data = new FormData()
    
            Object.entries(data).map(([key, value]) => {
                form_data.append(key, value)
            })
    
            if (id) {
                form_data.append('is_edit', 1)
                form_data.append('id', id)
                putReq("saveInnerXirclsDetails", form_data)
                .then((resp) => {
                    success(resp)
                })
                .catch((error) => {
                    console.log(error)
                    toast.error('Something went wrong')
                })
            } else {
                form_data.append('is_edit', 0)
                postReq("saveInnerXirclsDetails", form_data)
                .then((resp) => {
                    success(resp)
                })
                .catch((error) => {
                    console.log(error)
                    toast.error('Something went wrong')
                })
            }

        }

    }

    return (
        <>
            <Card>
                <CardBody>
                    <h4 className="m-0">
                        {
                            id ? 'Edit Inner XIRCL' : 'Create Inner XIRCL'
                        }
                    </h4>
                    
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <div className="form">
                        <Row>
                            <Col md="6">
                                <div className="name">
                                    <label htmlFor="innerXirclsName">Name your Inner XIRCL</label>
                                    <input className="form-control" type="text" placeholder="High spenders in Mumbai" name="name" value={data.name} onChange={(e) => updateData(e)} />
                                    <p id="name_val" className="text-danger m-0 p-0 vaildMessage"></p>
                                </div>
                            </Col>
                            <Col md="3">
                                <div className="name">
                                    <label htmlFor="innerXirclsName">Minimum Spend</label>
                                    <input className="form-control" type="text" placeholder="Minimum Spend" name="min_spend_val" value={data.min_spend_val} onChange={(e) => {
                                        console.log(isNaN(e.target.value))
                                        if (!isNaN(e.target.value)) {
                                            updateData(e)
                                        }
                                    }} />
                                    <p id="min_spend_val_val" className="text-danger m-0 p-0 vaildMessage"></p>
                                </div>
                            </Col>
                            <Col md="3">
                                <div className="name">
                                    <label htmlFor="innerXirclsName">Maximum Spend</label>
                                    <input className="form-control" type="text" placeholder="Maximum Spend" name="max_spend_val" value={data.max_spend_val} onChange={(e) => {
                                        
                                        if (!isNaN(e.target.value)) {
                                            updateData(e)
                                        }
                                    }} />
                                    <p id="max_spend_val_val" className="text-danger m-0 p-0 vaildMessage"></p>
                                </div>
                            </Col>
                            <Col md="4" className="d-none">
                                <div className="objective custom-control custom-radio">
                                    <label>Objective: </label>
                                    <div style={{marginTop: '8px'}} className="parent d-flex justify-content-start align-items-center gap-2">
                                        <div className='form-check'>
                                            <Input type='radio' id='Targeting' name='ex1' defaultChecked={data.Objective === "targeting"} />
                                            <Label className='form-check-label' for='Targeting' onClick={() => setData({...data, Objective: "targeting"})}>
                                                Targeting 
                                            </Label>
                                        </div>
                                        <div className='form-check'>
                                            <Input type='radio' name='ex1' id='Loyalty' defaultChecked={data.Objective === "loyalty"} />
                                            <Label className='form-check-label' for='Loyalty' onClick={() => setData({...data, Objective: "loyalty"})}>
                                                Loyalty
                                            </Label>
                                        </div>

                                    </div>
                                </div>
                            </Col>
                            
                        </Row>
                        <Row className="mt-2">
                            <Col md="6">
                                <label htmlFor="">How long do you want this Inner XIRCL to stay active?</label>
                                <Flatpickr options={{ minDate: "today", dateFormat: "Y-m-d" }} onChange={(e) => setData({...data, group_start_date: moment(e[0]).format('YYYY-MM-DD')})} className='form-control' id='default-picker' placeholder="Start Date" value={data.group_start_date} />
                                <p id="group_start_date_val" className="text-danger m-0 p-0 vaildMessage"></p>
                            </Col>
                            <Col md="6">
                                <label htmlFor=""></label>
                                <Flatpickr options={{ minDate: "today",  dateFormat: "Y-m-d" }} onChange={(e) => setData({...data, group_end_date: moment(e[0]).format('YYYY-MM-DD')})} className='form-control' id='default-picker' placeholder="End Date" value={data.group_end_date} />
                                <p id="group_end_date_val" className="text-danger m-0 p-0 vaildMessage"></p>
                            </Col>
                        </Row>
                        <Row className="mt-2 d-none">
                            <div className="location">
                                <h6 className='mb-1'>Location</h6>
                                <div className="row match-height">
                                    <div className="col-md-12">
                                        <div className='location d-flex justify-content-start align-items-center gap-2'>
                                            <div className='form-check form-check-primary mb-2'>
                                                <Input
                                                    type='checkbox' 
                                                    id='global'
                                                    name='location_selected'
                                                    checked={data.location_selected === 'global'}
                                                    value={'global'}
                                                    onChange={(e) => updateData(e)}
                                                    />
                                                <Label className='form-check-label' for='global'>
                                                    Global
                                                </Label>
                                            </div>

                                            <div className='form-check form-check-primary mb-2'>
                                                <Input
                                                    type='checkbox' 
                                                    id='country'
                                                    name='location_selected'
                                                    checked={data.location_selected === 'country'}
                                                    value={'country'}
                                                    onChange={(e) => updateData(e)}
                                                    />
                                                <Label className='form-check-label' for='country'>
                                                    Country
                                                </Label>
                                            </div>

                                            <div className='form-check form-check-primary mb-2'>
                                                <Input
                                                    type='checkbox' 
                                                    id='state'
                                                    name='location_selected'
                                                    checked={data.location_selected === 'state'}
                                                    value={'state'}
                                                    onChange={(e) => updateData(e)}
                                                    />
                                                <Label className='form-check-label' for='state'>
                                                    State
                                                </Label>
                                            </div>

                                            <div className='form-check form-check-primary mb-2'>
                                                <Input
                                                    type='checkbox' 
                                                    id='city'
                                                    name='location_selected'
                                                    checked={data.location_selected === 'city'}
                                                    value={'city'}
                                                    onChange={(e) => updateData(e)}
                                                    />
                                                <Label className='form-check-label' for='city'>
                                                    City
                                                </Label>
                                            </div>

                                        </div>


                                        {/* <div className="form-group">
                                            <label htmlFor="location">Location</label>
                                            <input type="text" id='location' className='form-control' name='location' onChange={(e) => updateData(e)} value={data.outlet_name} />
                                        </div> */}
                                    </div>
                                </div>
                                <div className='row'>
                                    
                                    <div className="col-md-6">
                                        <Select
                                            isMulti = {false}
                                            options={currencyList}
                                            inputId="aria-example-input"
                                            closeMenuOnSelect={true}
                                            name="selectedCurrency"
                                            placeholder="Select Currency"
                                            value={currencyList?.filter(option => data.selectedCurrency === option.value)}
                                            onChange={(value, actionMeta) => handleChange(value, actionMeta, false)}
                                        />
                                    </div>

                                    {
                                        data.location_selected === "country" || data.location_selected === "state" || data.location_selected === "city" ? <>
                                            <div className="col-md-6">
                                                <div className="form-group mb-1">
                                                    <Select
                                                        isMulti = {true}
                                                        options={country}
                                                        inputId="aria-example-input"
                                                        closeMenuOnSelect={true}
                                                        name="selectedCountry"
                                                        placeholder="Select Country"
                                                        value={country.filter(option => data.selectedCountry.includes(option.value))}
                                                        onChange={(value, actionMeta) => handleChange(value, actionMeta, true)}
                                                    />
                                                </div>

                                            </div>
                                        </> : ''
                                    }

                                    {
                                        data.location_selected === "state" || data.location_selected === "city" ? <>
                                            <div className="col-md-6">
                                                <div className="form-group mb-1">
                                                    <Select
                                                        isMulti = {true}
                                                        options={state}
                                                        inputId="aria-example-input"
                                                        closeMenuOnSelect={true}
                                                        noOptionsMessage={() => "Please select a state"}
                                                        name="selectedState"
                                                        placeholder="Select State"
                                                        value={state.filter(option => data.selectedState.includes(option.value))}
                                                        onChange={(value, actionMeta) => handleChange(value, actionMeta, true)}
                                                    />
                                                </div>
                                                
                                            </div>
                                        </> : ''
                                    }

                                    {
                                        data.location_selected === "city" ? <>
                                            <div className="col-md-6">
                                                <div className="form-group mb-1">
                                                    <Select
                                                        isMulti = {true}
                                                        options={cities}
                                                        inputId="aria-example-input"
                                                        closeMenuOnSelect={true}
                                                        name="selectCities"
                                                        noOptionsMessage={() => "Please select a city"}
                                                        placeholder="Select City"
                                                        value={cities.filter(option => data.selectCities.includes(option.value))}
                                                        onChange={(value, actionMeta) => handleChange(value, actionMeta, true)}
                                                    />
                                                </div>

                                            </div>
                                        </> : ""
                                    }

                                </div>

                            </div>
                        </Row>
                        
                    </div>
                    <div className="action mt-3 d-flex justify-content-between align-items-center">
                        <Link to={'/merchant/view_inner_xircl/'} className="back btn btn-primary">Back</Link>
                        <a className="next btn btn-primary" onClick={() => saveInnerXirclsDetails()}>Next</a>
                    </div>
                </CardBody>
            </Card>
        </>
    )
}

export default AddInnerXircl