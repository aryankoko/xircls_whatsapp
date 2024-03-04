import {Row, Col, Card, CardBody, Input, Label, UncontrolledAccordion, AccordionItem, AccordionHeader, AccordionBody} from 'reactstrap'
import CampaignNav from './components/CampaignNav'
import { useEffect, useState } from 'react'
import { getReq, postReq } from '../../assets/auth/jwtService'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Select from 'react-select'
import { Kidoptions, Maleoptions, RatioList } from '../../Helper/data'
import toast from 'react-hot-toast'
import { validForm } from '../Validator'

const defaultData = {
    location_selected: 'global',
    selectedCurrency: "",
    selectedCountry: [],
    selectedState: [],
    selectCities: [],
    selected_audience: [],
    men: [],
    women: [],
    kid: [],
    m_ratio: '',
    w_ratio: '',
    k_ratio: '',
    main_categories: [],
    sub_categories: []
}

const TargetProfiling = () => {

    const [outletData, setOutletData] = useState(defaultData)
    const [catData, setCatData] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [currencyList, setCurrencyList] = useState([])
    const [country, setCountry] = useState([])
    const [state, setState] = useState([])
    const [cities, setCities] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()

    const updateData = (e) => {
        setOutletData({...outletData, [e.target.name]: e.target.value})
    }

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

            // setOutletData((predata) => ({
            //     ...predata,
            //     ...updatedData
            // }))
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const getCategory = () =>  {
        getReq('getCategory')
        .then((res) => {
            setCatData(res.data.data.categories.main_categories)
            setSubCategories(res.data.data.categories.sub_categories)
        })
        .catch((err) => {
            console.log(err)
            // setCatData(main_categories)
        })
    }

    const handleChange = (options, actionMeta, check) => {
        if (check) { 
            const option_list = options.map((cur) => {
                return cur.value
            })
            setOutletData({...outletData, [actionMeta.name]: option_list })
        } else {
            setOutletData({...outletData, [actionMeta.name]: options.value })
        }
    
    }

    console.log(outletData, "outletData")

    const getOutletData = () => {
        getReq('editSingleOutlet', `?OUTLET_ID=${id}`)
        .then((resp) => {
            console.log(resp?.data?.data?.outlet_detail?.outlet_location, "getData")
            const updatedData = {
                location_selected: resp?.data?.data?.outlet_detail?.location_selected ? resp?.data?.data?.outlet_detail?.location_selected : 'global',
                selectedCurrency: "",
                selectedCountry: resp?.data?.data?.outlet_detail?.outlet_location[0]?.country ? resp?.data?.data?.outlet_detail?.outlet_location[0]?.country : [],
                selectedState: resp?.data?.data?.outlet_detail?.outlet_location[0]?.state ? resp?.data?.data?.outlet_detail?.outlet_location[0]?.state : [],
                selectCities: resp?.data?.data?.outlet_detail?.outlet_location[0]?.city ? resp?.data?.data?.outlet_detail?.outlet_location[0]?.city : [],
                selected_audience: resp?.data?.data?.outlet_detail?.selected_audience ? resp?.data?.data?.outlet_detail?.selected_audience.split(',') : [],
                men: resp?.data?.data?.outlet_detail?.cater_to_gender?.men ? resp?.data?.data?.outlet_detail?.cater_to_gender?.men : [],
                women: resp?.data?.data?.outlet_detail?.cater_to_gender?.women ? resp?.data?.data?.outlet_detail?.cater_to_gender?.women : [],
                kid: resp?.data?.data?.outlet_detail?.cater_to_gender?.kid ? resp?.data?.data?.outlet_detail?.cater_to_gender?.kid : [],
                m_ratio: resp?.data?.data?.outlet_detail?.cater_to_gender?.m_ratio ? resp?.data?.data?.outlet_detail?.cater_to_gender?.m_ratio : "",
                w_ratio: resp?.data?.data?.outlet_detail?.cater_to_gender?.w_ratio ? resp?.data?.data?.outlet_detail?.cater_to_gender?.w_ratio : "",
                k_ratio: resp?.data?.data?.outlet_detail?.cater_to_gender?.k_ratio ? resp?.data?.data?.outlet_detail?.cater_to_gender?.k_ratio : "",
                main_categories: resp?.data?.data?.outlet_detail?.outlet_categories_main ? resp?.data?.data?.outlet_detail?.outlet_categories_main : [],
                sub_categories: resp?.data?.data?.outlet_detail?.outlet_categories_filter ? resp?.data?.data?.outlet_detail?.outlet_categories_filter : []
            }
            setOutletData((preData) => ({
                ...preData,
                ...updatedData
            }))
            // setData(resp.data.data.outlet_detail[0])
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const setAudience = (e) => {

        if (outletData.selected_audience.includes(e.target.value)) {

            const updateData = outletData.selected_audience.filter((cur) => {
                return cur !== e.target.value
            })
            setOutletData({...outletData, selected_audience: updateData})

            if (e.target.value === "male") {
                const updatedData = {
                    men: [],
                    m_ratio: ""
                }

                setOutletData((preData) => ({
                    ...preData,
                    ...updatedData
                }))
            }

            if (e.target.value === "female") {
                const updatedData = {
                    women: [],
                    w_ratio: ""
                }

                setOutletData((preData) => ({
                    ...preData,
                    ...updatedData
                }))
            }

            if (e.target.value === "kids") {
                const updatedData = {
                    kid: [],
                    k_ratio: ""
                }

                setOutletData((preData) => ({
                    ...preData,
                    ...updatedData
                }))
            }

        } else {
            setOutletData({...outletData, selected_audience: [...outletData.selected_audience, e.target.value]})
        }

        
    }

    function SelectedCard (e, id) {
        document.getElementById(`parent_${id}`).classList.toggle('active_parent_card')

        if (document.getElementById(`parent_${id}`).classList.contains('active_parent_card')) {
            console.log('true')
            setOutletData({...outletData, main_categories: [...outletData?.main_categories, Number(id)]})
        } else {
            console.log('false')
            // setOutletData({...outletData, main_categories: outletData?.main_categories.filter((curElem) => { return curElem !== Number(id) })})

            const newSelect = []
            subCategories.filter((subCat) => {
                if (Number(id) === subCat.parent_id) {
                    newSelect.push(subCat.id)
                }
            })
            const filteredNewSelect = outletData?.sub_categories.filter((item) => !newSelect.includes(item))
            console.log(filteredNewSelect)

            const updatedData = {
                main_categories: outletData?.main_categories.filter((curElem) => { return curElem !== Number(id) }),
                sub_categories: filteredNewSelect
            }

            setOutletData((preData) => ({
                ...preData,
                ...updatedData
            }))

        }

    }

    function SelectedSubCard (e, id) {

        // console.log(e.target.classList.toggle('active_parent_card'))
        document.getElementById(`subParent_${id}`).classList.toggle('active_parent_card')

        if (document.getElementById(`subParent_${id}`).classList.contains('active_parent_card')) {
            console.log('true')
            setOutletData({...outletData, sub_categories: [...outletData?.sub_categories, Number(id)]})
        } else {
            console.log('false')
            setOutletData({...outletData, sub_categories: outletData.sub_categories.filter((curElem) => { return curElem !== Number(id) })})
        }

    }

    const editOutletData = (type) => {
        let check
        const dataToCheck = [
            {
                name: 'location_selected',
                message: 'Please select location',
                type: 'string',
                id: 'location_selected'
            }
        ]

        if (outletData.location_selected === 'country') {
            dataToCheck.push({
                name: 'selectedCountry',
                message: 'Please select country',
                type: 'string',
                id: 'selectedCountry'
            })
        }

        if (outletData.location_selected === 'state') {
            dataToCheck.push({
                name: 'selectedState',
                message: 'Please select state',
                type: 'string',
                id: 'selectedState'
            })
        }

        if (outletData.location_selected === 'city') {
            dataToCheck.push({
                name: 'selectCities',
                message: 'Please select city',
                type: 'string',
                id: 'selectCities'
            })
        }

        check = validForm(dataToCheck, outletData)
        if (check) {
            const dataToCheck = [
                // {
                //     name: 'selectedCurrency',
                //     message: 'Please select currency',
                //     type: 'string',
                //     id: 'selectedCurrency'
                // },
                {
                    name: 'selected_audience',
                    message: 'Please select your audience',
                    type: 'string',
                    id: 'selected_audience'
                }
            ]

            check = validForm(dataToCheck, outletData)
            if (check) {
                if (outletData.selected_audience.includes('male')) {
                    dataToCheck.push(
                        {
                            name: 'men',
                            message: 'Please select male age',
                            type: 'string',
                            id: 'men'
                        },
                        {
                            name: 'm_ratio',
                            message: 'Please select male ratio',
                            type: 'string',
                            id: 'm_ratio'
                        }
                    )
                }
    
                if (outletData.selected_audience.includes('female')) {
                    dataToCheck.push(
                        {
                            name: 'women',
                            message: 'Please select female age',
                            type: 'string',
                            id: 'women'
                        },
                        {
                            name: 'w_ratio',
                            message: 'Please select female ratio',
                            type: 'string',
                            id: 'w_ratio'
                        }
                    )
                }
    
                if (outletData.selected_audience.includes('kids')) {
                    dataToCheck.push(
                        {
                            name: 'kid',
                            message: 'Please select kid age',
                            type: 'string',
                            id: 'kid'
                        },
                        {
                            name: 'k_ratio',
                            message: 'Please select kid ratio',
                            type: 'string',
                            id: 'k_ratio'
                        }
                    )
                }
                check = validForm(dataToCheck, outletData)

                if (check) {
                    const count = Number(outletData?.m_ratio) + Number(outletData?.w_ratio) + Number(outletData?.k_ratio)
                    console.log(count)
                    if (count === 100) {
                        check = true
                    } else {
                        toast.error("Ratio total should be 100 percent")
                        check = false
                    }
                }

                if (check) {
                    const dataToCheck = [
                        {
                            name: 'main_categories',
                            message: 'Please select categories',
                            type: 'string',
                            id: 'main_categories'
                        },
                        {
                            name: 'sub_categories',
                            message: 'Please select sub categories',
                            type: 'string',
                            id: 'sub_categories'
                        }
                    ]
                    check = validForm(dataToCheck, outletData)
                }
            }
        }
        console.log(check)
        
        if (check) {
            const form_data = new FormData()
    
            Object.entries(outletData).map(([key, value]) => form_data.append(key, value))
            form_data.append('SECTION', 'SECOND')
            form_data.append('OUTLET_ID', id)
    
            postReq('editSingleOutlet', form_data)
            .then((data) => {
                console.log(data)
                getOutletData()
                if (type === "save&pre") {
                    navigate(`/merchant/outlets/xircls-outlet-details/${id}/`)
                } else if (type === "save&pro") {
                    navigate(`/merchant/campaign/verify_your_domain/${id}/`)
                }
                toast.success('Targeting saved')
            })
            .catch((error) => {
                console.log(error)
                toast.error('Something went wrong!')
            })

        }
    }

    useEffect(() => {
        getOutletData()
        getCountries()
        getCategory()
    }, [])

    useEffect(() => {
        if (outletData.selectedCountry.length > 0) {

            const form_data = new FormData()
            form_data.append('country_id', outletData.selectedCountry)
            postReq('getState', form_data)
            .then((resp) => {
                console.log(resp)
                setState(resp.data.data.states.map((curElem) => {
                    return {value: curElem.id, label: `${curElem.name}`}
                }))
                // const updatedData = {
                //     state: 
                // }
    
                // setOutletData((predata) => ({
                //     ...predata,
                //     ...updatedData
                // }))
    
                // setState(resp.data.data.states.map((curElem) => {
                //     return {value: curElem.id, label: `${curElem.name}`}
                // }))
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }, [outletData.selectedCountry])

    console.log(outletData)

    useEffect(() => {
        if (outletData.selectedState.length > 0) {

            const form_data = new FormData()
            form_data.append('state_id', outletData.selectedState)
            console.log(form_data)
            postReq('getCities', form_data)
            .then((data) => data.json())
            .then((resp) => {
                console.log(resp)
                setCities(resp.data.data.states.map((curElem) => {
                    return {value: curElem.id, label: `${curElem.name}`}
                }))
                // const updatedData = {
                //     cities: r
                // }
    
                // setOutletData((predata) => ({
                //     ...predata,
                //     ...updatedData
                // }))
    
                // setCities({...outletData, state: resp.data.data.states.map((curElem) => {
                //     return {value: curElem.id, label: `${curElem.name}`}
                // }) })
                // setCities(resp.data.data.cities.map((curElem) => {
                //     return {value: curElem.id, label: `${curElem.name}`}
                // }))
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }, [outletData.selectedState])

    // console.log(outlet_logo)

    return (
        <Row className='match-height'>
            <style>
                {`
                    .active_parent_card, .active_parent_card h6, .new_active {
                        background-color: #000;
                        color: #fff;
                    }
                `}
            </style>
            <Col md="3">
                <Card>
                    <CardBody>
                        <CampaignNav />
                    </CardBody>
                </Card>
            </Col>

            <Col md="9">
                <Card>
                    <CardBody>
                        <div className="outlet_profile">
                            <h4>Target Profiling</h4>
                            <hr />
                            <div className="location my-2">
                                <h6 className='mb-2'>Location</h6>
                                <div className="row match-height">
                                    <div className="col-md-12">
                                        <div className='location d-flex justify-content-start align-items-center gap-2'>
                                            <div className='form-check form-check-primary mb-2'>
                                                <Input
                                                    type='checkbox' 
                                                    id='global'
                                                    name='location_selected'
                                                    checked={outletData.location_selected === 'global'}
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
                                                    checked={outletData.location_selected === 'country'}
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
                                                    checked={outletData.location_selected === 'state'}
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
                                                    checked={outletData.location_selected === 'city'}
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
                                            <input type="text" id='location' className='form-control' name='location' onChange={(e) => updateData(e)} value={outletData.outlet_name} />
                                        </div> */}
                                        <p id="location_selected_val" className="text-danger m-0 p-0 vaildMessage"></p>

                                    </div>
                                </div>
                                <div className='row'>

                                    {
                                        outletData.location_selected === "country" || outletData.location_selected === "state" || outletData.location_selected === "city" ? <>
                                            <div className="col-md-6">
                                                <div className="form-group mb-1">
                                                    <Select
                                                        isMulti = {true}
                                                        options={country}
                                                        inputId="aria-example-input"
                                                        closeMenuOnSelect={true}
                                                        name="selectedCountry"
                                                        placeholder="Select Country"
                                                        value={country.filter(option => outletData.selectedCountry.includes(option.value))}
                                                        onChange={(value, actionMeta) => handleChange(value, actionMeta, true)}
                                                    />
                                                    <p id="selectedCountry_val" className="text-danger m-0 p-0 vaildMessage"></p>

                                                </div>

                                            </div>
                                        </> : ''
                                    }

                                    {
                                        outletData.location_selected === "state" || outletData.location_selected === "city" ? <>
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
                                                        value={state.filter(option => outletData.selectedState.includes(option.value))}
                                                        onChange={(value, actionMeta) => handleChange(value, actionMeta, true)}
                                                    />
                                                    <p id="selectedState_val" className="text-danger m-0 p-0 vaildMessage"></p>

                                                </div>
                                                
                                            </div>
                                        </> : ''
                                    }

                                    {
                                        outletData.location_selected === "city" ? <>
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
                                                        value={cities.filter(option => outletData.selectCities.includes(option.value))}
                                                        onChange={(value, actionMeta) => handleChange(value, actionMeta, true)}
                                                    />
                                                    <p id="selectCities_val" className="text-danger m-0 p-0 vaildMessage"></p>

                                                </div>

                                            </div>
                                        </> : ""
                                    }

                                    <div className="col-md-6">
                                        <Select
                                            isMulti = {false}
                                            options={currencyList}
                                            inputId="aria-example-input"
                                            closeMenuOnSelect={true}
                                            name="selectedCurrency"
                                            placeholder="Select Currency"
                                            value={currencyList?.filter(option => outletData.selectedCurrency === option.value)}
                                            onChange={(value, actionMeta) => handleChange(value, actionMeta, false)}
                                        />
                                        <p id="selectedCurrency_val" className="text-danger m-0 p-0 vaildMessage"></p>

                                    </div>

                                </div>

                            </div>
                                    <hr />
                            {/* Audiuence */}
                            <div className="Audiuence my-2">
                                <h6 className='mb-2'>Select your audience</h6>
                                <div className="row match-height ">
                                    <div className="col-md-12">
                                        <div className='location d-flex justify-content-start align-items-center gap-2'>
                                            <div className='form-check form-check-primary mb-2'>
                                                <Input
                                                    type='checkbox' 
                                                    id='male'
                                                    name='selected_audience'
                                                    checked={outletData.selected_audience.includes('male')}
                                                    value={'male'}
                                                    onChange={(e) => setAudience(e)}
                                                    />
                                                <Label className='form-check-label' for='male'>
                                                    Male
                                                </Label>
                                            </div>

                                            <div className='form-check form-check-primary mb-2'>
                                                <Input
                                                    type='checkbox' 
                                                    id='female'
                                                    name='selected_audience'
                                                    checked={outletData.selected_audience.includes('female')}
                                                    value={'female'}
                                                    onChange={(e) => setAudience(e)}
                                                    />
                                                <Label className='form-check-label' for='female'>
                                                    Female
                                                </Label>
                                            </div>

                                            <div className='form-check form-check-primary mb-2'>
                                                <Input
                                                    type='checkbox' 
                                                    id='kids'
                                                    name='selected_audience'
                                                    checked={outletData.selected_audience.includes('kids')}
                                                    value={'kids'}
                                                    onChange={(e) => setAudience(e)}
                                                    />
                                                <Label className='form-check-label' for='kids'>
                                                    kids
                                                </Label>
                                            </div>

                                        </div>
                                        <p id="selected_audience_val" className="text-danger m-0 p-0 vaildMessage"></p>


                                        {/* <div className="form-group">
                                            <label htmlFor="location">Location</label>
                                            <input type="text" id='location' className='form-control' name='location' onChange={(e) => updateData(e)} value={outletData.outlet_name} />
                                        </div> */}
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12">

                                    <UncontrolledAccordion defaultOpen={["1", "2", "3"]} className='border rounded' stayOpen>
                                            {
                                                outletData.selected_audience.includes("male") ? (
                                                    <AccordionItem className='bg-white'>
                                                        <AccordionHeader className='acc-header' targetId='1'>
                                                            <p className='mb-0'>Male Adults</p>
                                                        </AccordionHeader>
                                                        <AccordionBody accordionId='1'>
                                                            <div className="w-100 pb-1">
                                                                <Select
                                                                    isMulti = {true}
                                                                    options={Maleoptions}
                                                                    inputId="aria-example-input"
                                                                    closeMenuOnSelect={true}
                                                                    name="men"
                                                                    placeholder="Age"
                                                                    value={Maleoptions.filter(option => outletData.men.includes(option.value))}
                                                                    onChange={(value, actionMeta) => handleChange(value, actionMeta, true)}
                                                                />
                                                                <p id="men_val" className="text-danger m-0 p-0 vaildMessage"></p>

                                                            </div>
                                                            <div className="w-100 pb-1">
                                                                <Select
                                                                    isMulti = {false}
                                                                    options={RatioList}
                                                                    inputId="aria-example-input"
                                                                    closeMenuOnSelect={true}
                                                                    name="m_ratio"
                                                                    placeholder="Ratio"
                                                                    value={RatioList.filter(option => outletData.m_ratio === option.value)}
                                                                    onChange={(value, actionMeta) => handleChange(value, actionMeta, false)}
                                                                />
                                                                <p id="m_ratio_val" className="text-danger m-0 p-0 vaildMessage"></p>

                                                            </div>
                                                        </AccordionBody>
                                                    </AccordionItem>
                                                ) : ""
                                            }

                                            {
                                                outletData.selected_audience.includes('female') ? (
                                                    <AccordionItem className='bg-white'>
                                                        <AccordionHeader className='acc-header' targetId='2'>
                                                            <p className='mb-0'>Female Adults</p>
                                                        </AccordionHeader>
                                                        <AccordionBody accordionId='2'>
                                                            <div className="w-100 pb-1">
                                                                <Select
                                                                    isMulti = {true}
                                                                    options={Maleoptions}
                                                                    inputId="aria-example-input"
                                                                    closeMenuOnSelect={true}
                                                                    name="women"
                                                                    placeholder="Age"
                                                                    value={Maleoptions.filter(option => outletData.women.includes(option.value))}
                                                                    onChange={(value, actionMeta) => handleChange(value, actionMeta, true)}
                                                                />
                                                                <p id="women_val" className="text-danger m-0 p-0 vaildMessage"></p>

                                                            </div>
                                                            <div className="w-100 pb-1">
                                                                <Select
                                                                    isMulti = {false}
                                                                    options={RatioList}
                                                                    inputId="aria-example-input"
                                                                    closeMenuOnSelect={true}
                                                                    name="w_ratio"
                                                                    placeholder="Ratio"
                                                                    value={RatioList.filter(option => outletData.w_ratio === option.value)}
                                                                    onChange={(value, actionMeta) => handleChange(value, actionMeta, false)}
                                                                />
                                                                <p id="w_ratio_val" className="text-danger m-0 p-0 vaildMessage"></p>

                                                            </div>
                                                        </AccordionBody>
                                                    </AccordionItem>
                                                ) : ""
                                            }

                                            {
                                                outletData.selected_audience.includes('kids') ? (
                                                    <AccordionItem className='bg-white'>
                                                        <AccordionHeader className='acc-header' targetId='3'>
                                                            <p className='mb-0'>Kids & Teens</p>
                                                        </AccordionHeader>
                                                        <AccordionBody accordionId='3'>
                                                            <div className="w-100 pb-1">
                                                                <Select
                                                                    isMulti = {true}
                                                                    options={Kidoptions}
                                                                    inputId="aria-example-input"
                                                                    closeMenuOnSelect={true}
                                                                    name="kid"
                                                                    placeholder="Age"
                                                                    value={Kidoptions.filter(option => outletData.kid.includes(option.value))}
                                                                    onChange={(value, actionMeta) => handleChange(value, actionMeta, true)}
                                                                />
                                                                <p id="kid_val" className="text-danger m-0 p-0 vaildMessage"></p>
                                                            </div>
                                                            <div className="w-100 pb-1">
                                                                <Select
                                                                    isMulti = {false}
                                                                    options={RatioList}
                                                                    inputId="aria-example-input"
                                                                    closeMenuOnSelect={true}
                                                                    name="k_ratio"
                                                                    placeholder="Ratio"
                                                                    value={RatioList.filter(option => outletData.k_ratio === option.value)}
                                                                    onChange={(value, actionMeta) => handleChange(value, actionMeta, false)}
                                                                />
                                                                <p id="k_ratio_val" className="text-danger m-0 p-0 vaildMessage"></p>

                                                            </div>
                                                        </AccordionBody>
                                                    </AccordionItem>
                                                ) : ""
                                            }
                                            
                                        </UncontrolledAccordion>
                                        
                                    </div>
                                    
                                </div>

                            </div>

                            {/* Categories */}

                            <hr />

                            <div className="categories my-2">
                                <h6 className='mb-2'>Choose your categories</h6>
                                <div className="row match-height ">
                                    <div className="col-md-12" style={{height: '200px', overflow: 'auto'}}>
                                        <div className="d-flex just-content-start align-items-start flex-wrap gap-2">
                                            {
                                                catData ? catData.map((cur, i) => {
                                                    return <div className={`cursor-pointer ${outletData.main_categories.includes(cur.id) ? "active_parent_card" : ""}`} key={i} style={{padding: `15px 20px`, borderRadius: '5px', boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`}} id={`parent_${cur.id}`} onClick={(e) => SelectedCard(e, `${cur.id}`) }>
                                                            <h6 className='m-0'>{cur.name}</h6>
                                                        </div>
                                                    
                                                }) : <>

                                                </>
                                            }
                                        </div>
                                        

                                    </div>
                                    <p id="main_categories_val" className="text-danger m-0 p-0 vaildMessage"></p>
                                </div>
                            </div>

                            <hr />

                            <div className="categories my-2">
                                <h6 className='mb-2'>Select Sub Categories</h6>
                                <div className="row match-height ">
                                    <div className="col-md-12" style={{height: '200px', overflow: 'auto'}}>
                                        {
                                            subCategories ? outletData?.main_categories.map((curElem) => {
                                                return catData?.map((cur) => {
                                                    if (cur.id === curElem) {
                                                        return <div className='mb-2'>
                                                            <div style={{position: 'sticky', top: '0px', left: '0px', background: '#fff', padding: '0px 10px 10px', borderBottom: '1px solid #ccc', marginBottom: '10px'}} className='d-flex justify-content-between align-items-center'>
                                                                <h5 className='m-0'>{cur.name}</h5>
                                                                <a className='btn-sm btn btn-outline-secondary' onClick={() => {
                                                                    const newSelect = []
                                                                    subCategories.filter((subCat) => {
                                                                        if (curElem === subCat.parent_id) {
                                                                            return subCat
                                                                        }
                                                                    }).filter((curElem) => {
                                                                        
                                                                        if (outletData?.main_categories.includes(curElem.parent_id)) {
                                                                            newSelect.push(curElem.id)
                                                                        }
                                                                    })
                                                                    console.log(newSelect)
                                                                    setOutletData({...outletData, sub_categories: [...outletData.sub_categories, ...newSelect]})
                                                                    }}>
                                                                        Select all
                                                                    </a>

                                                            </div>
                                                                {/* <hr /> */}
                                                                <div className="d-flex just-content-start align-items-start flex-wrap gap-2">
                                                                    {
                                                                        subCategories.map((subCat, i) => {
                                                                            if (subCat.parent_id === curElem) {
                                                                                return <div className={`cursor-pointer ${outletData.sub_categories.includes(subCat.id) ? "active_parent_card" : ""}`} key={i} style={{padding: `15px 20px`, borderRadius: '5px', boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`}} id={`subParent_${subCat.id}`} onClick={(e) => SelectedSubCard(e, `${subCat.id}`) }>
                                                                                    <h6 className='m-0'>{subCat.name}</h6>
                                                                                </div>
                                                                            }
                                                                        })

                                                                    }

                                                                </div>
                                                        </div>

                                                    }
                                                })
                                            }) : ""
                                        }
                                    </div>
                                </div>
                            </div>
                            

                            {/* {
                                outletData.main_categories.length > 0 ? <div className="categories my-2">
                                    <h6 className='mb-2'>Select Sub Categories</h6>
                                    <div className="row match-height ">
                                        <div className="col-md-12" style={{height: '200px', overflow: 'auto'}}>
                                            <div className="d-flex just-content-start align-items-start flex-wrap gap-2">
                                                {
                                                    subCategories && outletData.main_categories ? subCategories.filter((curElem) => {
                                                        return outletData.main_categories.includes(curElem.parent_id) ?  curElem : ''
                                                    }).map((cur, i) => {
                                                        return <div className={`cursor-pointer ${outletData.sub_categories.includes(cur.id) ? "active_parent_card" : ""}`} key={i} style={{padding: `15px 20px`, borderRadius: '5px', boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`}} id={`subParent_${cur.id}`} onClick={(e) => SelectedSubCard(e, `${cur.id}`) }>
                                                                <h6 className='m-0'>{cur.name}</h6>
                                                            </div>
                                                        
                                                    }) : <>
                                                        <h4 className='text-center'>Please select a Category</h4>
                                                    </>
                                                }
                                            </div>
                                            <p id="sub_categories_val" className="text-danger m-0 p-0 vaildMessage"></p>

                                        </div>
                                    </div>
                                </div> : ''
                            }
                             */}

                            <div className="col-12 mt-3">
                                <div className='d-flex justify-content-end gap-1'>
                                    {/* <Link className="btn btn-outline-primary me-2" to={`/merchant/outlets/xircls-outlet-details/${id}/`}>Show Preview</Link>
                                    <a className="btn btn-primary" onClick={() => editOutletData()}>Save</a> */}
                                    <a className="btn btn-primary" onClick={() => editOutletData('save')}>Save</a>
                                    <a className="btn btn-primary" onClick={() => editOutletData('save&pre')}>Save and Preview</a>
                                    <a className="btn btn-primary" onClick={() => editOutletData('save&pro')}>Save and Proceed</a>
                                </div>
                            </div>

                        </div>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}

export default TargetProfiling