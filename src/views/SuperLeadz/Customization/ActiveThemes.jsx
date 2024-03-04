import React, { useContext, useEffect, useState } from 'react'
// import Navbar from "../components/NavBar"
import Theme1 from './Theme1'
import Theme4 from './Theme4'

import { useNavigate } from 'react-router-dom'
import { Smartphone, Monitor, Edit2, MoreVertical, X, ChevronDown, Tag, AlertCircle, CheckCircle, Edit3, Trash2, Info, Phone } from "react-feather"
import './PopUpSidebar/PopUpSidebar.css'
import { Modal, ModalBody } from 'reactstrap'
import { ThemesProvider } from '../../../Helper/Context'
import axios from 'axios'
import toast from 'react-hot-toast'
import { getCurrentOutlet } from '../../Validator'
import { SuperLeadzBaseURL } from '../../../assets/auth/jwtService'

const ActiveThemes = ({ setThemeName, setThemes, setActiveListBtn, setSelectedThemeNo, setIsSaving, setThemeId, setIsEdit, setValueData }) => {

    const navigate = useNavigate()

    const { defaultThemeData } = useContext(ThemesProvider)

    // const pages = { ALL: 'all_pages', HOME: 'home_page', PRODUCT: 'product_page', PRODUCT_LIST: 'product_list_page', CART: 'cart_page', CUSToM: 'custom_page' }

    const [resData, setResData] = useState([])

    const [isMobile, setIsMobile] = useState([])

    const [showInfo, setShowInfo] = useState([])

    const [conflictThemes, setConflictThemes] = useState([])

    console.log(conflictThemes)

    const [modal1, setModal1] = useState(false)
    const [modal2, setModal2] = useState(false)
    const [modal3, setModal3] = useState(false)
    const [modal4, setModal4] = useState(false)
    const outletData = getCurrentOutlet()
    const [allOffers, setAllOffers] = useState([])

    const [offersList, setOffersList] = useState([])

    const [currDetails, setCurrDetails] = useState({
        theme_id: null,
        theme_name: ''
    })


    const visitorsObj = {
        ALL: 'All visitors',
        FIRST_VISITORS: 'First Time Visitors',
        SECOND_VISITORS: 'Second Time and above Visitors',
        REGISTERED_USERS: 'Registered Users'
    }

    const getAllPreviews = () => {
        const arrayShow = []
        const form_data = new FormData()
        form_data.append("shop", outletData[0]?.web_url)
        form_data.append("app", "superleadz")

        fetch(`${SuperLeadzBaseURL}/api/v1/get/show_all_themes/`, {
            method: "POST",
            body: form_data
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                data.response?.map((ele, i) => {
                    arrayShow[i] = false

                })
                setResData(data)
                setShowInfo([...arrayShow])
                setIsMobile([...arrayShow])
                setIsSaving(false)
            })
    }

    const getAllOffers = () => {
        axios({
            method: "POST",
            data: JSON.stringify({ shop: outletData[0]?.web_url, app: "superleadz" }),
            url: `${SuperLeadzBaseURL}/utils/api/v1/superoffer/`
        })
            .then((data) => {
                console.log("new offer data", JSON.parse(data.data))
                setAllOffers([...JSON.parse(data.data)])
                // setOffersList([...data.data])
                // openModal3()
            })
            .catch((error) => console.log(error))
    }


    const saveRedirect = (number, value, id, theme_name) => {
        setSelectedThemeNo(number)
        // setValueData({ ...defaultThemeData, [`themeData${number}`]: value })
        console.log("saveRedirect")
        setThemes({ ...defaultThemeData, [`themeData${number}`]: value })
        setValueData({ ...defaultThemeData, [`themeData${number}`]: value })
        setThemeId(id)
        setIsEdit(true)
        setThemeName(theme_name)
        setActiveListBtn('edit')
    }

    const openModal1 = () => {
        setModal1(!modal1)
    }

    const openModal2 = () => {
        setModal2(!modal2)
    }

    const openModal3 = () => {
        setModal3(!modal3)
    }

    const openModal4 = () => {
        setModal4(!modal4)
    }

    const sendActiveId = (id, theme_name) => {
        setCurrDetails({ theme_id: `${id}`, theme_name })
        const form_data = new FormData()
        form_data.append("shop", outletData[0]?.web_url)
        form_data.append("app", "superleadz")
        form_data.append('theme_id', id)
        form_data.append('theme_name', theme_name)
        fetch(`${SuperLeadzBaseURL}/api/v1/get/active-template/`, {
            method: 'POST',
            body: form_data
        })
            .then((resp) => resp.json())
            .then((data) => {
                // console.log("data is the______________", data)
                if ((data.response.length === 0) || (data.response.length > 0 && resData.active.includes(`${id}`))) {
                    openModal1()
                } else {
                    setConflictThemes([...data.response])
                    openModal2()
                }
            })
            .catch(() => {
                toast.error("Error while saving data")
            })
    }

    const sendConfirmation = () => {
        const form_data = new FormData()
        form_data.append("shop", outletData[0]?.web_url)
        form_data.append("app", "superleadz")
        form_data.append('theme_id', currDetails.theme_id)
        form_data.append('theme_name', currDetails.theme_name)
        form_data.append('is_active', !resData?.active?.includes(`${currDetails.theme_id}`) ? 1 : 0)
        fetch(`${SuperLeadzBaseURL}/api/v1/get/change-theme-status/`, {
            method: 'POST',
            body: form_data
        })
            .then((resp) => resp.json())
            .then((data) => {
                setResData({ ...resData, active: [...data.active_response] })
                getAllPreviews()
            })
            .catch(err => {
                alert(err)
            })
    }

    const overlapConfirmation = () => {
        const form_data = new FormData()
        form_data.append("shop", outletData[0]?.web_url)
        form_data.append("app", "superleadz")
        form_data.append('theme_id', currDetails.theme_id)
        form_data.append('theme_name', currDetails.theme_name)
        conflictThemes.map(ele => {
            form_data.append('overlap_theme_id', ele.theme)
        })
        fetch(`${SuperLeadzBaseURL}/api/v1/get/change-theme-status-overlap/`, {
            method: 'POST',
            body: form_data
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log("overlapConfirmation", data)
                // const newArray = resData.active.filter(item => conflictThemes.some(ele => `${ele.theme}` !== `${item}`))
                // setResData({ ...resData, active: [...data.active_response] })
                getAllPreviews()
                openModal2()
            })
    }

    const getActiveOffers = (id) => {

        const obj = {
            theme_id: id
        }

        const form_data = new FormData()
        Object.entries(obj).map(([key, value]) => {
            if (Array.isArray(value)) {
                value.map(ele => {
                    form_data.append(key, ele)
                })
            } else (
                form_data.append(key, value)
            )
        })
        // const form_data = new FormData()
        // form_data.append("shop", outletData[0]?.web_url)
        // form_data.append("app", "superleadz")
        axios({
            method: "POST",
            data: JSON.stringify({ ...obj, shop: outletData[0]?.web_url, app: "superleadz" }),
            url: `${SuperLeadzBaseURL}/utils/api/v1/get_activeoffer/`
        })
            .then((data) => {
                console.log("new active offer data", data.data.data)
                const newArr = data?.data?.data?.map(ele => {
                    return {Code: ele.discount_code, Summary: ele.summary, id: ele.discount_id, Status: "ACTIVE"}
                })

                console.log("newArr", newArr)
                setOffersList([...newArr])
                // setAllOffers([...JSON.parse(data.data)])
                // setOffersList([...data.data])
                openModal3()
            })
            .catch((error) => console.log(error))
        // fetch("https://api.xircls.com/utils/api/v1/superoffer/", {
        //     method: "POST",
        //     body: JSON.stringify({ shop: outletData[0]?.web_url, app: "superleadz" })
        // })
        //     .then((resp) => resp.json())
        //     .then((data) => {
        //         console.log("new_offer_data", data)
        //         // setOffersList([...data.offer_list[0]])
        //         // openModal3()
        //     })
        //     .catch((error) => {
        //         alert(error)
        //     })
    }

    const submitOffers = (e) => {
        e.preventDefault()
        const obj = {
            theme_id: currDetails.theme_id,
            theme_name: currDetails.theme_name,
            offer_list: offersList
        }
        // const form_data = new FormData()
        // Object.entries(obj).map(([key, value]) => {
        //     if (Array.isArray(value)) {
        //         value.map(ele => {
        //             form_data.append(key, JSON.stringify(ele))
        //         })
        //     } else (
        //         form_data.append(key, value)
        //     )
        // })

        fetch(`${SuperLeadzBaseURL}/utils/api/v1/save_activeoffer/`, {
            method: "POST",
            body: JSON.stringify({ ...obj, shop: outletData[0]?.web_url, app: "superleadz" })
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log("submitOffers", data)
                getAllPreviews()
            })
            .catch((error) => {
                alert(error)
            })
    }

    const deleteTheme = () => {
        const obj = {
            theme_id: currDetails.theme_id
        }

        const form_data = new FormData()
        Object.entries(obj).map(([key, value]) => {
            if (Array.isArray(value)) {
                value.map(ele => {
                    form_data.append(key, ele)
                })
            } else (
                form_data.append(key, value)
            )
        })

        fetch(`${SuperLeadzBaseURL}/api/v1/delete/theme/`, {
            method: "POST",
            body: form_data
        })
            .then((resp) => resp.json())
            .then((data) => {
                if (data.message === "Theme deleted Successfully") {
                    // setResData({ resData, response: [...resData.response].filter(item => { return Number(item.id) !== Number(currDetails.theme_id) }) })
                    getAllPreviews()
                    openModal4()
                } else {
                    alert("There was an error deleting the theme, please try again later")
                }
            })
            .catch((error) => {
                alert("Error while deleting theme", error)
            })

    }

    console.log(offersList)

    useEffect(() => {
        setIsSaving(true)
        getAllPreviews()
        getAllOffers()
    }, [])
    // document.addEventListener('click', () => {
    //     if (showMenu.length > 0) {
    //         setShowMenu(showMenu.map(() => {return false}))
    //     }
    // })

    console.log("allOffers", allOffers)


    return (
        <>

            <div className="row p-2 w-100">
                <div className="col-12 d-flex justify-content-end align-items-center">
                    <button className='primary-btn' style={{ marginRight: '25px' }} onClick={() => {
                        window.open(`http://${outletData[0]?.web_url}`)
                    }}>Preview</button>
                </div>
            </div>
            <div className="row w-100 p-2 overflow-y-scroll scroll-custom match-height" style={{ maxHeight: '65vh' }}>
                {resData?.response?.map((element, i) => {
                    const ele = JSON.parse(element.custom_theme.replaceAll("\n", "\\n"))
                    const themeNo = Number(element.theme_number.split('theme')[1])
                    // console.log(ele, element, element.theme_id)
                    let themesData
                    if (themeNo === 3) {
                        themesData = {
                            themeData3: {
                                background_color: ele.XIRCLS_THEME.BACKGROUND_COLOR,
                                body_background_color: ele.XIRCLS_BODY.BODY_BACKGROUND_COLOR,
                                border_radius: ele.XIRCLS_THEME.BORDER_RADIUS,
                                image: ele.IMAGE,
                                is_offer_image: 0,
                                header_color: ele.XIRCLS_HEADER.HEADER_COLOR,
                                body_color: ele.XIRCLS_BODY.BODY_COLOR,
                                header_text: element.header_text,
                                body_text: element.body_text,
                                button_background_color: ele.XIRCLS_BUTTON.BUTTON_BACKGOUND_COLOR,
                                button_color: ele.XIRCLS_BUTTON.BUTTON_COLOR,
                                button_border_radius: ele.XIRCLS_BUTTON.BUTTON_BORDER_RADIUS,
                                button_text: ele.XIRCLS_BUTTON.BUTTON_TEXT,
                                visitor_settings: ele.POP_UP_BEHAVIOUR.VISITOR_SETTINGS,
                                pop_up_load_type: Number(ele.POP_UP_BEHAVIOUR.IS_DELAY) === 1 ? "delay" : "scroll",
                                pop_up_load_value: ele.POP_UP_BEHAVIOUR.LOAD_VALUE,
                                PAGES: [...ele?.PAGES],
                                CUSTOM_PAGE_LINK: [...ele?.CUSTOM_PAGE_LINK],
                                mobile_background_color: ele.MOBILE_XIRCLS_THEME.BACKGROUND_COLOR,
                                mobile_body_background_color: ele.MOBILE_XIRCLS_BODY.BODY_BACKGROUND_COLOR,
                                mobile_border_radius: ele.MOBILE_XIRCLS_THEME.BORDER_RADIUS,
                                mobile_button_text: ele.MOBILE_XIRCLS_BUTTON.BUTTON_TEXT,
                                mobile_image: ele.MOBILE_IMAGE,
                                mobile_is_offer_image: 0,
                                mobile_header_color: ele.MOBILE_XIRCLS_HEADER.HEADER_COLOR,
                                mobile_body_color: ele.MOBILE_XIRCLS_BODY.BODY_COLOR,
                                mobile_header_text: element.header_text,
                                mobile_body_text: element.body_text,
                                mobile_button_background_color: ele.MOBILE_XIRCLS_BUTTON.BUTTON_BACKGOUND_COLOR,
                                mobile_button_color: ele.MOBILE_XIRCLS_BUTTON.BUTTON_COLOR,
                                mobile_button_border_radius: ele.MOBILE_XIRCLS_BUTTON.BUTTON_BORDER_RADIUS,
                                offers: [],
                                otp_settings: 1
                            }
                        }
                    } else if (themeNo === 4) {
                        themesData = {
                            themeData4: {
                                background_color: '#ffffff',
                                body_background_color: ele.XIRCLS_BODY.BODY_BACKGROUND_COLOR,
                                border_radius: ele.XIRCLS_THEME.BORDER_RADIUS,
                                is_offer_image: 0,
                                header_color: ele.XIRCLS_HEADER.HEADER_COLOR,
                                body_color: ele.XIRCLS_BODY.BODY_COLOR,
                                header_text: element.header_text,
                                body_text: element.body_text,
                                tnc_text: element.tnc_txt,
                                background_image: ele.BACKGROUND_IMAGE,
                                carousel_image: ele.CAROUSEL_IMAGE,
                                carousel_interval: ele.POP_UP_BEHAVIOUR.CAROUSEL_INTERVAL,
                                button_background_color: ele.XIRCLS_BUTTON.BUTTON_BACKGOUND_COLOR,
                                button_color: ele.XIRCLS_BUTTON.BUTTON_COLOR,
                                button_border_radius: ele.XIRCLS_BUTTON.BUTTON_BORDER_RADIUS,
                                button_text: ele.XIRCLS_BUTTON.BUTTON_TEXT,
                                visitor_settings: ele.POP_UP_BEHAVIOUR.VISITOR_SETTINGS,
                                pop_up_load_type: Number(ele.POP_UP_BEHAVIOUR.IS_DELAY) === 1 ? "delay" : "scroll",
                                pop_up_load_value: ele.POP_UP_BEHAVIOUR.LOAD_VALUE,
                                PAGES: [...ele?.PAGES],
                                CUSTOM_PAGE_LINK: [...ele?.CUSTOM_PAGE_LINK],
                                mobile_background_color: ele.MOBILE_XIRCLS_THEME.BACKGROUND_COLOR,
                                mobile_body_background_color: ele.MOBILE_XIRCLS_BODY.BODY_BACKGROUND_COLOR,
                                mobile_border_radius: ele.MOBILE_XIRCLS_THEME.BORDER_RADIUS,
                                mobile_is_offer_image: 0,
                                mobile_header_color: ele.MOBILE_XIRCLS_HEADER.HEADER_COLOR,
                                mobile_body_color: ele.MOBILE_XIRCLS_BODY.BODY_COLOR,
                                mobile_header_text: element.header_text,
                                mobile_body_text: element.body_text,
                                mobile_tnc_text: element.mobile_tnc_txt,
                                mobile_background_image: ele.BACKGROUND_IMAGE,
                                mobile_carousel_image: ele.CAROUSEL_IMAGE,
                                mobile_carousel_interval: 3,
                                mobile_button_background_color: ele.MOBILE_XIRCLS_BUTTON.BUTTON_BACKGOUND_COLOR,
                                mobile_button_color: ele.MOBILE_XIRCLS_BUTTON.BUTTON_COLOR,
                                mobile_button_border_radius: ele.MOBILE_XIRCLS_BUTTON.BUTTON_BORDER_RADIUS,
                                mobile_button_text: ele.MOBILE_XIRCLS_BUTTON.BUTTON_TEXT,
                                offers: [],
                                otp_settings: 1
                            }
                        }
                    }
                    return (
                        <div key={i} className="col-xl-6">
                            <div
                                // onMouseLeave={() => {
                                //     const arr = [...showInfo]
                                //     arr[i] = false
                                //     setShowInfo([...arr])
                                // }} 
                                className="card mb-4 active-themes-cards position-relative border" style={{ borderRadius: '12px', boxShadow: `0px 5px 15px ${resData?.active?.includes(`${element.id}`) ? "rgba(31, 135, 84, 0.75)" : "rgba(0,0,0,0.25)"}` }}>
                                <div className='d-flex align-items-center justify-content-between w-100 gap-3' style={{ position: 'absolute', top: '0px', right: '0px', padding: '0.75rem', zIndex: '50' }}>
                                    <div>
                                        <span className='mobile-theme-button' onClick={() => {
                                            const mobile = [...isMobile]
                                            mobile[i] = !isMobile[i]
                                            setIsMobile([...mobile])
                                        }}>
                                            {isMobile[i] ? <Smartphone size={20} /> : <Monitor size={20} />}
                                        </span>
                                    </div>
                                    <div className='d-flex gap-2 align-items-center'>
                                        <span className='info-theme-button' onClick={() => {
                                            const arr = [...showInfo]
                                            arr[i] = !showInfo[i]
                                            setShowInfo([...arr])
                                        }}><Info size={20} /></span>
                                        <span className='edit-theme-button' onClick={() => saveRedirect(themeNo, themesData[`themeData${themeNo}`], element.id, element.theme_name)}
                                        ><Edit2 size={20} /></span>
                                        <span className='delete-theme-button' onClick={() => {
                                            setCurrDetails({ theme_id: `${element.id}`, theme_name: element.theme_name })
                                            openModal4()
                                        }}
                                        ><Trash2 size={20} /></span>
                                    </div>
                                </div>
                                <div className="position-absolute" style={{ top: '0px', right: '0px', width: '100%', height: '100%', backdropFilter: `blur(${showInfo[i] ? '10px' : '0px'})`, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: '20', borderRadius: '12px', visibility: showInfo[i] ? 'visible' : 'hidden', opacity: showInfo[i] ? '1' : '0', transition: '0.5s ease' }}>
                                    <p className="text-white mt-5 px-2" style={{ transform: `translateY(${showInfo[i] ? '0px' : '15px'})`, opacity: showInfo[i] ? '1' : '0', transition: '0.5s ease' }}>Visible after {ele?.POP_UP_BEHAVIOUR?.IS_DELAY === 1 ? "a delay of" : "scrolling"} {ele?.POP_UP_BEHAVIOUR?.LOAD_VALUE}{ele?.POP_UP_BEHAVIOUR?.IS_DELAY === 1 ? "s" : "% of website"} for {visitorsObj[ele?.POP_UP_BEHAVIOUR?.VISITOR_SETTINGS]}</p>
                                </div>
                                <div className="d-flex justify-content-center align-items-center position-relative hover-dark overflow-hidden" style={{ minHeight: '225px', borderRadius: '12px 12px 0px 0px' }}>
                                    <div id={`theme-contain-${element.id}`} className="theme-holder position-absolute d-flex justify-content-center align-items-center" style={{ scale: '0.25', zIndex: '0', transition: '0.25s ease-in-out' }}>
                                        {themeNo === 3 ? <Theme1 isMobile={isMobile[i]} themes={themesData} showOffer={false} offerBg={'offerBg'} offerText={'offerText'} /> : themeNo === 4 ? <Theme4 isMobile={isMobile[i]} themes={themesData} /> : ''}
                                    </div>
                                </div>
                                <div style={{ zIndex: '100', borderRadius: '12px' }} className="card-body bg-white px-2 p-2">
                                    <div className="row w-100 mx-0 mb-2">
                                        <div className="col-sm-6 text-start">
                                            <span className='me-2'>{element.theme_name === '' ? 'No Name' : element.theme_name}</span>
                                            {element.id}
                                        </div>
                                    </div>
                                    <div className="row w-100 m-0">
                                        <div className="col-sm-6 d-flex justify-content-between align-items-center">
                                            <button className="primary-btn" style={{ outline: 'none' }} onClick={() => {
                                                setCurrDetails({ theme_id: `${element.id}`, theme_name: element.theme_name })
                                                getActiveOffers(element.id)
                                            }}>Assign Offers</button>
                                        </div>

                                        <div className="col-sm-6 d-flex flex-row justify-content-end align-items-center">

                                            <span className='form-check form-switch form-check-sm form-switch-sm w-100 d-flex align-items-center p-0 m-0 me-auto justify-content-end gap-2'>
                                                <label className={`form-check-label text-capitalize`} style={{ cursor: 'pointer' }} htmlFor={`theme-activate-${element.id}`}>
                                                    {resData?.active?.includes(`${element.id}`) ? 'Active' : 'Inactive'}
                                                </label>
                                                <input type='checkbox' checked={resData?.active?.includes(`${element.id}`)} onChange={() => {
                                                    sendActiveId(element.id, element.theme_name)
                                                }} id={`theme-activate-${element.id}`} className={`form-check-input m-0`} style={{ cursor: 'pointer', backgroundColor: resData?.active?.includes(`${element.id}`) ? "#1f8754" : "lightgray" }} />
                                            </span>
                                        </div>
                                    </div>
                                    {/* <div className="w-100 text-end">
                                        <button className="btn btn-sm btn-primary" onClick={() => createPreview(element.id)}>Preview</button>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    )
                })}
                <Modal isOpen={modal1} toggle={openModal1} className='position-relative popup-cust' >
                    <ModalBody>
                        <span className="position-absolute top-0 end-0" style={{ cursor: 'pointer', padding: "0.25rem" }} onClick={openModal1}>
                            <X size={17.5} />
                        </span>
                        Do you want to {resData?.active?.includes(`${currDetails.theme_id}`) && 'de'}activate this theme?
                        <div className="text-end"><button onClick={() => {
                            openModal1()
                            sendConfirmation()
                            if (!resData?.active?.includes(`${currDetails.theme_id}`)) {
                                setResData({ ...resData, active: [...resData.active, `${currDetails.theme_id}`] })
                            } else {
                                setResData({ ...resData, active: [...resData.active].filter(item => item !== `${currDetails.theme_id}`) })
                            }
                        }} className={`btn btn-sm btn-${resData?.active?.includes(`${currDetails.theme_id}`) ? 'danger' : 'success'} text-capitalize`}>{resData?.active?.includes(`${currDetails.theme_id}`) && 'de'}activate</button></div>
                    </ModalBody>
                </Modal>
                <Modal isOpen={modal2} toggle={openModal2} className='position-relative popup-cust' >
                    <ModalBody>
                        <span className="position-absolute top-0 end-0" style={{ cursor: 'pointer', padding: "0.25rem" }} onClick={openModal2}>
                            <X size={17.5} />
                        </span>
                        This theme's settings conflict with theme{conflictThemes.length > 1 && 's'} {conflictThemes?.map((ele, index, array) => {
                            return <span className='fw-bold text-black' key={index}>{ele.theme}{index < array.length - 1 && ','} </span>
                        })}.<br />Activating this theme will deactivate the above theme/s.
                        <div className="mt-2 d-flex gap-3 justify-content-end align-items-center"><button className="primary-btn" onClick={overlapConfirmation}>Activate</button> <button onClick={openModal2} className='primary-btn-outline'>Cancel</button></div>
                    </ModalBody>
                </Modal>
                <Modal size='lg' centered={true} isOpen={modal3} toggle={openModal3} className='position-relative popup-cust' style={{ borderRadius: '1.25rem' }}>
                    <style>
                        {`
                            .modal-content {
                                border-radius: 0.85rem;
                            }
                        `}
                    </style>

                    <ModalBody>
                        <div className="container-fluid px-0">
                            <div className="row px-0">
                                <div className="col-12 d-flex justify-content-between align-items-start">
                                    <h2 style={{ fontSize: '1.25rem' }}>Assign Offers</h2>
                                    <span style={{ cursor: 'pointer', zIndex: '22' }} onClick={openModal3}>
                                        <X size={17.5} />
                                    </span>
                                </div>
                            </div>
                            <div className="row offers-scroll px-0 pt-3 pb-0" style={{ maxHeight: '25rem', overflowY: 'auto', padding: '0px' }}>
                                {allOffers?.length > 0 ? allOffers?.map((ele, key) => {
                                    // console.log("offer =========>", ele.id)
                                    return (
                                        // <div className="col-lg-6 mb-4">
                                        <div key={key} onClick={() => {
                                            if (offersList.some($ => $.id === ele.id)) {
                                                setOffersList([...offersList].filter(item => { return item.id !== ele.id }))
                                            } else {
                                                setOffersList([...offersList, ele])
                                            }
                                        }} className="offer_box col-lg-6 mb-2">
                                            <div
                                                style={{
                                                    backgroundColor: "#efefef",
                                                    padding: 15,
                                                    borderRadius: 8,
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "flex-start",
                                                    display: `flex`,
                                                    gap: `20px`,
                                                    cursor: 'pointer',
                                                    // transition: '0.3s ease',
                                                    position: 'relative',
                                                    outline: `${offersList.some($ => $.id === ele.id) ? "2" : '0'}px solid #1f8754`
                                                }}>
                                                {/* <img src="https://cdn-icons-png.flaticon.com/512/8373/8373208.png" className={`position-absolute opacity-${offersList.includes(`${ele.id}`) ? "100" : '0'}`} style={{ top: '-15px', right: '-15px', transition: '0.25s ease' }} width={'35px'} height={'35px'} alt="" /> */}
                                                <div
                                                    style={{
                                                        fontStyle: "normal",
                                                        fontWeight: 600,
                                                        fontSize: "13.5px",
                                                        lineHeight: `20px`,
                                                        color: "#000",
                                                        textAlign: "left"
                                                    }}
                                                >
                                                    {ele.Summary}
                                                </div>
                                                <div
                                                    className="remove_col"
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "flex-end",
                                                        flexDirection: "column",
                                                        gap: 15
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            gap: 10
                                                        }}
                                                    >
                                                        <Tag size={13.5} fill='#000000' />
                                                        <div
                                                            style={{
                                                                fontStyle: "normal",
                                                                fontWeight: 600,
                                                                fontSize: "17.5",
                                                                lineHeight: `30px`,
                                                                color: "#000"
                                                            }}
                                                        >
                                                            {ele.Code}
                                                        </div>
                                                    </div>
                                                    <a
                                                        style={{
                                                            textTransform: "uppercase",
                                                            height: 32,
                                                            fontWeight: 600,
                                                            fontSize: 13,
                                                            lineHeight: `30px`,
                                                            textAlign: "center",
                                                            backgroundColor: "#000",
                                                            color: "rgb(255, 255, 255)",
                                                            borderRadius: 7,
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            cursor: "pointer",
                                                            padding: "0 15px",
                                                            textDecoration: "none",
                                                            whiteSpace: "nowrap"
                                                        }}
                                                    >
                                                        Redeem
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }) : (
                                    <div className="">
                                        <p>No active offers found. <span className='text-primary fw-bolder' onClick={() => {
                                            navigate("/offers")
                                        }} style={{ cursor: "pointer" }}>Activate</span> your existing offers or <span className='text-primary fw-bolder' onClick={() => {
                                            navigate("/create_offers")
                                        }} style={{ cursor: "pointer" }}>Create</span> new offers to continue.</p>
                                    </div>
                                )}
                            </div>
                            <div className="row pt-1">
                                <div className="col-12 d-flex align-items-center justify-content-end gap-2">
                                    <button className="primary-btn" onClick={(e) => {
                                        if (allOffers?.length > 0) {
                                            if (offersList.length === 0) {
                                                alert('select some offers first')
                                                // showToastr("error", "whatsup")
                                                // toastr.error("select some offers first")
                                            } else {
                                                submitOffers(e)
                                                openModal3()
                                            }
                                        } else {
                                            navigate("/offers")
                                        }
                                    }}>{allOffers?.length > 0 ? "Assign Offers" : "Create Offers"}</button>
                                    {/* <button className="btn btn-sm" onClick={openModal3}>Close</button> */}
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                </Modal>
                <Modal isOpen={modal4} toggle={openModal4} className='position-relative popup-cust' >
                    <ModalBody>
                        <span className="position-absolute top-0 end-0" style={{ cursor: 'pointer', padding: "0.25rem" }} onClick={openModal4}>
                            <X size={17.5} />
                        </span>
                        Are you sure you want to delete this theme?
                        <div className="mt-2 d-flex gap-3 justify-content-end align-items-center">
                            <button className="primary-btn-outline" onClick={deleteTheme}>Delete</button>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
            {/* </div>
        </div> */}
        </>
    )
}

export default ActiveThemes