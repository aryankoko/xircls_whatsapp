import ReactCardFlip from 'react-card-flip'
import React, { useEffect, useState } from 'react'
import { Paperclip, Trash } from 'react-feather'
import waterMark from "@src/assets/images/logo/xircls-waterMark.png"
import { useNavigate } from 'react-router-dom'
import { imageValidation } from '../../Validator'

import {Maleoptions, Kidoptions, RatioList} from "../../../Helper/data"
import Select from 'react-select'
import { postReq } from '../../../assets/auth/jwtService'

const Flip = ({ currency, country, catData, subCategories, outletData, setOutletData, submitOutletDetails, setImageObject }) => {
    const [isFlipped, setIsFlipped] = useState(false)
    const [selectLocation, setSelectLocation] = useState("Global")
    const [state, setState] = useState([])
    const [cities, setCities] = useState([])
    
    const navigate = useNavigate()
    
    const showCat = () => {
        document.querySelector(".category_div").classList.remove('d-none')
        document.querySelector(".cat_div").style.width = '100%'
    }

    const showAudience = () => {
        document.querySelector(".audience_div").classList.remove('d-none')
        document.querySelector(".aud_div").style.width = '100%'
    }

    const closeAudi = () => {
        document.querySelector(".audience_div").classList.add('d-none')
        document.querySelector(".aud_div").style.width = '0%'
    }

    const closeCat = () => {
        document.querySelector(".cat_div").style.width = '0%'
        document.querySelector(".category_div").classList.add('d-none')
    }

    function showSubCatagory() {
        document.querySelector(".sub_category_div").classList.remove('d-none')
        document.querySelector(".sub_cat_div").style.width = '100%'
    }

    function closeSubCat() {
        document.querySelector(".sub_cat_div").style.width = '0%'
        document.querySelector(".sub_category_div").classList.add('d-none')
    }

    function SelectedCard (e, id) {
        document.getElementById(`parent_${id}`).classList.toggle('active_parent_card')

        if (document.getElementById(`parent_${id}`).classList.contains('active_parent_card')) {
            console.log('true')
            setOutletData({...outletData, main_categories: [...outletData?.main_categories, Number(id)]})
        } else {
            console.log('false')
            setOutletData({...outletData, main_categories: outletData?.main_categories.filter((curElem) => { return curElem !== Number(id) })})
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

    const imageActions = (e) => {
        const checkVaildImage = imageValidation(e)
        if (checkVaildImage) {
            setOutletData({...outletData, view_logo_url: URL.createObjectURL(e.target.files[0]) })
            setImageObject(e.target.files[0])
        } else {
            setOutletData({...outletData, view_logo_url: waterMark })
            setImageObject({})
        }
    }

    const updataDefaultData = (e) => {
        setOutletData({...outletData, [e.target.name]: e.target.value })
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

    useEffect(() => {
        const form_data = new FormData()
        form_data.append('country_id', outletData.country)
        postReq('getState', form_data)
        .then((resp) => {
            console.log(resp)
            setState(resp.data.data.states.map((curElem) => {
                return {value: curElem.id, label: `${curElem.name}`}
            }))
        })
        .catch((error) => {
            console.log(error)
            setState([])
        })
    }, [outletData.country])

    console.log(outletData)

    useEffect(() => {
        const form_data = new FormData()
        form_data.append('state_id', outletData.state)
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
            setCities([])
        })
    }, [outletData.state])


    return (
        <>
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                <div>
                    <div className="parent-first">
                        <div className="d-flex gap-2 mb-2 align-items-center">
                            <div className="text-end w-25 fw-bolder text-black">Outlet logo</div>
                            
                            <div className="w-75">
                                <div className="main-wrapper d-flex justify-content-between align-items-center">
                                    <div className="image-view">
                                        <img className='image_viewer' width="200px" height="100px" src={outletData?.view_logo_url} alt="Your Logo" />
                                    </div>
                                    <div className="image-action d-flex justify-content-start align-items-center gap-1">
                                        <input placeholder="Enter Your Outlet Name" type="file" className="w-100 d-none" name="outlet_logo" id="outlet_logo" onChange={(e) => imageActions(e)} />
                                        <label htmlFor="outlet_logo" style={{background: '#000', padding: '8px 10px', borderRadius: '7px', color: '#fff', cursor: 'pointer'}}>
                                            <Paperclip size={17} />
                                        </label>
                                        <label style={{background: 'red', padding: '8px 10px', borderRadius: '7px', color: '#fff', cursor: 'pointer'}} onClick={() => setOutletData({...outletData, view_logo_url: waterMark })}>
                                            <Trash size={17} />
                                        </label>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex gap-2 mb-2 align-items-center">
                            <div className="text-end w-25 fw-bolder text-black">Web URL</div>
                            <div className="text-end w-75">
                                <input placeholder="What Is Your Web URL" type="text" className="w-100 from-control-x" value={outletData?.web_url} name='web_url' onChange={(e) => updataDefaultData(e)} />
                            </div>
                        </div>

                        <div className="d-flex gap-2 mb-2 align-items-center">
                            <div className="text-end w-25 fw-bolder text-black">Outlet Name</div>
                            <div className="text-end w-75">
                                <input placeholder="Enter Your Outlet Name" type="text" className="w-100 from-control-x" value={outletData?.outlet_name} name='outlet_name' onChange={(e) => updataDefaultData(e)} />
                            </div>
                        </div>
                        

                        <div className="d-flex gap-2 mb-2 align-items-start">
                            <div className="text-end w-25 fw-bolder text-black mt-1">Outlet Description</div>
                            <div className="text-end w-75">
                                <textarea placeholder="Tell Us About Your Outlet" rows="4" className="w-100 from-control-x" value={outletData?.outlet_description} name='outlet_description' onChange={(e) => updataDefaultData(e)} />
                            </div>
                        </div>

                        
                    </div>
                    <div className="text-end py-1">
                        <button onClick={() => navigate("/plan_pricing/1/")} className="btn text-black">Back</button>
                        <button onClick={() => setIsFlipped(!isFlipped)} style={{ backgroundColor: 'black' }} className="btn px-3 text-white rounded-pill waves-effect    waves-float waves-light">Next</button>
                    </div>
                      
                </div>
        
                <div>
                    
                    <div className="row">

                        <h4>Location</h4>
                        <div className="row mt-2">
                            <div className="col-3">
                                <div className={`${selectLocation === 'Global' ? 'new_active' : ''} cursor-pointer fw-bold`} onClick={() => setSelectLocation('Global')} style={{padding: `15px 20px`, borderRadius: '5px', boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`}}>
                                    Global
                                </div>
                            </div>
                            <div className="col-3">
                                <div className={`${selectLocation === 'Country' ? 'new_active' : ''} cursor-pointer fw-bold`} onClick={() => setSelectLocation('Country')} style={{padding: `15px 20px`, borderRadius: '5px', boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`}}>
                                    Country
                                </div>
                            </div>
                            <div className="col-3">
                                <div className={`${selectLocation === 'State' ? 'new_active' : ''} cursor-pointer fw-bold`} onClick={() => setSelectLocation('State')} style={{padding: `15px 20px`, borderRadius: '5px', boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`}}>
                                    State
                                </div>
                            </div>
                            <div className="col-3">
                                <div className={`${selectLocation === 'City' ? 'new_active' : ''} cursor-pointer fw-bold`} onClick={() => setSelectLocation('City')} style={{padding: `15px 20px`, borderRadius: '5px', boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`}}>
                                    City
                                </div>
                            </div>
                        </div>

                        <div className="row mt-2">

                            {
                                selectLocation === "Country" || selectLocation === "State" || selectLocation === "City" ? <>
                                    <div className="form-group mb-1">
                                        <Select
                                            isMulti = {true}
                                            options={country}
                                            inputId="aria-example-input"
                                            closeMenuOnSelect={true}
                                            name="country"
                                            placeholder="Select Country"
                                            value={outletData.country.length > 0 ? country.filter(option => outletData.country.includes(option.value)) : ""}
                                            onChange={(value, actionMeta) => handleChange(value, actionMeta, true)}
                                        />
                                    </div>
                                </> : ''
                            }

                            {
                                selectLocation === "State" || selectLocation === "City" ? <>
                                    <div className="form-group mb-1">
                                        <Select
                                            isMulti = {true}
                                            options={state}
                                            inputId="aria-example-input"
                                            closeMenuOnSelect={true}
                                            noOptionsMessage={() => "Please a country"}
                                            name="state"
                                            placeholder="Select State"
                                            value={outletData.country.length > 0 && state ? state.filter(option => outletData.state.includes(option.value)) : ""}
                                            onChange={(value, actionMeta) => handleChange(value, actionMeta, true)}
                                        />
                                    </div>
                                </> : ''
                            }

                            {
                                selectLocation === "City" ? <>
                                    <div className="form-group mb-1">
                                        <Select
                                            isMulti = {true}
                                            options={cities}
                                            inputId="aria-example-input"
                                            closeMenuOnSelect={true}
                                            name="city"
                                            noOptionsMessage={() => "Please a state"}
                                            placeholder="Select City"
                                            value={outletData.city.length > 0 && cities ? cities.filter(option => outletData.city.includes(option.value)) : ""}
                                            onChange={(value, actionMeta) => handleChange(value, actionMeta, true)}
                                        />
                                    </div>
                                </> : ""
                            }

                            <div className="form-group mb-1">
                                <Select
                                    isMulti = {false}
                                    options={currency}
                                    inputId="aria-example-input"
                                    closeMenuOnSelect={true}
                                    name="currency"
                                    placeholder="Select Currency"
                                    value={currency.filter(option => String(outletData.currency).includes(`${option.value}`))}
                                    onChange={(value, actionMeta) => handleChange(value, actionMeta, false)}
                                />
                            </div>
                        </div>
                        
                    </div>
                    <div className="text-end py-1">
                        <button onClick={() => setIsFlipped(!isFlipped)} className="btn text-black">Back</button>
                        <button  style={{ backgroundColor: 'black' }} onClick={() => showAudience()} className="btn px-3 text-white rounded-pill waves-effect waves-float waves-light">Next</button>
                    </div>
                </div>
            </ReactCardFlip>

            <div className="row match-height aud_div" style={{position: 'absolute', top: 0, left: 0, width: `0%`, height: `100%`, transition: `.4s`, background: '#f3f3f3', zIndex: 1}}>
                <div className="audience_div d-none p-2">
                    <div className='row'>
                        <h4 className='mb-2'>Select your audience</h4>
                        <div className="accordion" id="accordionExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingOne">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Male
                                </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <div className="w-100 pb-1">
                                            <Select
                                                isMulti = {true}
                                                options={Maleoptions}
                                                inputId="aria-example-input"
                                                closeMenuOnSelect={true}
                                                name="men"
                                                placeholder="Age"
                                                value={outletData.men.length > 0 ? Maleoptions.filter(option => outletData.men.includes(option.value)) : ""}
                                                onChange={(value, actionMeta) => handleChange(value, actionMeta, true)}
                                            />
                                        </div>
                                        <div className="w-100 pb-1">
                                            <Select
                                                isMulti = {false}
                                                options={RatioList}
                                                inputId="aria-example-input"
                                                closeMenuOnSelect={true}
                                                name="m_ratio"
                                                placeholder="Ratio"
                                                value={RatioList.filter(option => outletData.m_ratio.includes(option.value))}
                                                onChange={(value, actionMeta) => handleChange(value, actionMeta, false)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingTwo">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    Female
                                </button>
                                </h2>
                                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                            
                                        <div className="w-100 pb-1">
                                            <Select
                                                isMulti = {true}
                                                options={Maleoptions}
                                                inputId="aria-example-input"
                                                closeMenuOnSelect={true}
                                                name="women"
                                                placeholder="Age"
                                                value={outletData.women.length > 0 ? Maleoptions.filter(option => outletData.women.includes(option.value)) : ""}
                                                onChange={(value, actionMeta) => handleChange(value, actionMeta, true)}
                                            />
                                            
                                        </div>
                                        <div className="w-100 pb-1">
                                            <Select
                                                isMulti = {false}
                                                options={RatioList}
                                                inputId="aria-example-input"
                                                closeMenuOnSelect={true}
                                                name="w_ratio"
                                                placeholder="Ratio"
                                                value={outletData.w_ratio.length > 0 ? RatioList.filter(option => outletData.w_ratio.includes(option.value)) : ""}
                                                onChange={(value, actionMeta) => handleChange(value, actionMeta, false)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingThree">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    Kids
                                </button>
                                </h2>
                                <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <div className="w-100 pb-1">
                                            <Select
                                                isMulti = {true}
                                                options={Kidoptions}
                                                inputId="aria-example-input"
                                                closeMenuOnSelect={true}
                                                name="kid"
                                                placeholder="Age"
                                                value={outletData.kid.length > 0 ? Kidoptions.filter(option => outletData.kid.includes(option.value)) : ""}
                                                onChange={(value, actionMeta) => handleChange(value, actionMeta, true)}
                                            />
                                        </div>
                                        <div className="w-100 pb-1">
                                            <Select
                                                isMulti = {false}
                                                options={RatioList}
                                                inputId="aria-example-input"
                                                closeMenuOnSelect={true}
                                                name="k_ratio"
                                                placeholder="Ratio"
                                                value={outletData.k_ratio.length > 0 ? RatioList.filter(option => outletData.k_ratio.includes(option.value)) : ""}
                                                onChange={(value, actionMeta) => handleChange(value, actionMeta, false)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-end py-1">
                        <button onClick={() => closeAudi()} className="btn text-black">Back</button>
                        <button  style={{ backgroundColor: 'black' }} onClick={() => showCat()} className="btn px-3 text-white rounded-pill waves-effect waves-float waves-light">Save & Next</button>
                    </div>
                </div> 

            </div>

            <div className="row match-height cat_div" style={{position: 'absolute', top: 0, left: 0, width: `0%`, height: `100%`, transition: `.4s`, background: '#f3f3f3', zIndex: 1}}>
                <div className="category_div d-none p-2">
                    <h4 className='mb-1'>Choose your categories</h4>
                    <div className='col-12 noscroller' style={{height: `300px`, overflow: 'auto', padding: '10px 15px'}}>
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

                    <div className="text-end py-1">
                        <button onClick={() => closeCat()} className="btn text-black">Back</button>
                        <button  style={{ backgroundColor: 'black' }} onClick={() => showSubCatagory()} className="btn px-3 text-white rounded-pill waves-effect waves-float waves-light">Next</button>
                    </div>
                    
                </div>

            </div>

            <div className="row match-height sub_cat_div" style={{position: 'absolute', top: 0, left: 0, width: `0%`, height: `100%`, transition: `.4s`, background: '#f3f3f3', zIndex: 1}}>
                <div className="sub_category_div d-none p-2">
                    <div className="row">
                        <h4 className='mb-1'>Select Sub Categories</h4>
                        <div className='col-12 noscroller' style={{height: `300px`, overflow: 'auto', padding: '10px 15px'}}>
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
                        </div>
                    </div>
                    <div className="text-end py-1">
                        <button onClick={() => closeSubCat()} className="btn text-black">Back</button>
                        <button  style={{ backgroundColor: 'black' }} onClick={() => submitOutletDetails()} className="btn px-3 text-white rounded-pill waves-effect waves-float waves-light">Save & Next</button>
                    </div>
                </div> 

            </div>
            
        </>
        
    )
}

export default Flip
