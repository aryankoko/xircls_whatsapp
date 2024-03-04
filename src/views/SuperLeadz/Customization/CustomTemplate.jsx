import React, { useContext, useEffect, useState } from "react"
// import '../components/PopUpSidebar/PopUpSidebar.css'
// import ActiveThemes from '../components/ActiveThemes'
// import skeleton from "../assets/Skeleton/skeleton.svg"
import { useNavigate } from 'react-router-dom'
// import AssignOffer from '../components/AssignOffer'
import { Card, CardBody, Modal, ModalBody } from "reactstrap"
import { ThemesProvider } from "../../../Helper/Context"
import ThemeSelection from "./ThemeSelection"
import PopUpSidebarButtons from "./PopUpSidebar/PopUpSidebarButtons"
import OfferSidebarSection from "./OfferSidebar/OfferSidebarSection"
import Theme1 from "./Theme1"
import Theme4 from "./Theme4"
import "./PopUpSidebar/PopUpSidebar.css"
import { Smartphone, Monitor, Loader, X, Edit2, Check, Minus, Square, MoreVertical, ArrowLeft, ChevronDown, Edit3, Menu, MousePointer, PenTool, Tablet, Type } from "react-feather"
import ActiveThemes from "./ActiveThemes"
import skeleton from "./skeleton.svg"
import { ShoppingBag, Tag, Crown, Star, Gift } from "./Icons"
import { getCurrentOutlet } from "../../Validator"
import { SuperLeadzBaseURL } from "../../../assets/auth/jwtService"

const CustomTemplate = () => {

    const navigate = useNavigate()

    const { themes, setThemes, defaultThemeData, selectedThemeNo, setSelectedThemeNo } = useContext(ThemesProvider)

    const [activeListBtn, setActiveListBtn] = useState("edit")

    // const defaultThemes = {
    //     theme3: EmptyTheme1,
    //     theme4: EmptyTheme4
    // }

    const [isMobile, setIsMobile] = useState(false)
    // const [selectedThemeNo, setSelectedThemeNo] = useState(3)
    const [isEdit, setIsEdit] = useState(false)
    const [themeId, setThemeId] = useState(null)
    const [themeName, setThemeName] = useState('Untitled')

    // const [navigateEdit, setNavigateEdit] = useState(0)
    // const [navigateBehaviour, setNavigateBehaviour] = useState(0)

    const [openSection, setOpenSection] = useState("background")

    const [offerOpen, setOfferOpen] = useState("vis_type")

    const [buttonSection, setButtonSection] = useState('position')

    const [valueData, setValueData] = useState(null)

    // const [draftData, setDraftData] = useState(null)

    const [draftModal, setDraftModal] = useState(false)
    const [reloadConfirm, setReloadConfirm] = useState(false)

    // const [theme1Data, setTheme1Data] = useState(defaultThemes[`theme${selectedThemeNo}`])
    // const [navActive, setNavActive] = useState("theme settings")
    // const [backgroundColor, setBackgroundColor] = useState(theme1Data?.XIRCLS_THEME.BACKGROUND_COLOR)
    const [isImage, setIsImage] = useState(0)
    // const [bodyBackgroundColor, setBodyBackgroundColor] = useState(theme1Data?.XIRCLS_BODY.BODY_BACKGROUND_COLOR)
    // const [borderRadius, setBorderRadius] = useState(theme1Data?.XIRCLS_THEME.BORDER_RADIUS)
    // const [borderBodyRadius, setBorderBodyRadius] = useState(theme1Data?.XIRCLS_THEME.BORDER_RADIUS)
    const [headerImage, setHeaderImage] = useState("https://www.demo.xircls.in/static/images/xircls_logo_round_white.svg")
    const [headerImage4, setHeaderImage4] = useState({
        background_image: 'https://images.pexels.com/photos/23795/rocket-launch-space-discovery.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        carousel_image: ['https://images.pexels.com/photos/1103093/pexels-photo-1103093.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1']
    })
    // const [intervalTime, setIntervalTime] = useState(3)
    // const [headerColor, setHeaderColor] = useState(theme1Data?.XIRCLS_HEADER.HEADER_COLOR)
    // const [bodyColor, setBodyColor] = useState(theme1Data?.XIRCLS_BODY.BODY_COLOR)
    // const [buttonBackground, setButtonBackground] = useState(theme1Data?.XIRCLS_BUTTON.BUTTON_BACKGOUND_COLOR)
    // const [buttonFont, setButtonFont] = useState(theme1Data?.XIRCLS_BUTTON.BUTTON_COLOR)
    // const [buttonRadius, setButtonRadius] = useState(theme1Data?.XIRCLS_BUTTON.BUTTON_BORDER_RADIUS)
    const [pageLocation, setPageLocation] = useState([])
    const [customUrl, setCustomUrl] = useState([""])
    const [visitorType, setVisitorType] = useState("")
    const [popupStatus, setPopupStatus] = useState("")
    const [popupStatusRange, setPopupStatusRange] = useState(0)

    const [offerBg, setOfferBg] = useState("#efefef")
    const [offerText, setOfferText] = useState("#000")
    const [offerButtonBg, setOfferButtonBg] = useState("#000")
    const [offerButtonRadius, setOfferButtonRadius] = useState(12)
    const [offerButtonText, setOfferButtonText] = useState("#fff")

    const [isSaving, setIsSaving] = useState(false)
    const [nameModal, setNameModal] = useState(false)

    // const [toastSuccess, setToastSuccess] = useState(false)
    // const [notification, setNotification] = useState(false)

    const mobileCondition = isMobile ? 'mobile_' : ''

    console.log(setIsSaving)

    const [buttonSettings, setButtonSettings] = useState({
        buttonPosition: "BR",
        btn_backgroug_color: "#000",
        btn_font_color: "#ffffff",
        textValue: "Instant VIP Access",
        desktop_btn_view_id: 'text_&_icon',
        btn_icons: 'tag',
        mobile_desktop_btn_view_id: 'icon_only',
        btn_margin_left: "20",
        btn_margin_right: "20",
        btn_margin_bottom: "20"
    })

    const [successModal, setSuccessModal] = useState(false)

    const openSuccessModal = () => setSuccessModal(!successModal)

    const icons = {
        shopping_bag: <ShoppingBag />,
        tag: <Tag />,
        crown: <Crown />,
        star: <Star />,
        gift: <Gift />
    }

    const activeIcons = {
        shopping_bag: <ShoppingBag color={buttonSettings[`btn_font_color`]} />,
        tag: <Tag color={buttonSettings[`btn_font_color`]} />,
        crown: <Crown color={buttonSettings[`btn_font_color`]} />,
        star: <Star color={buttonSettings[`btn_font_color`]} />,
        gift: <Gift color={buttonSettings[`btn_font_color`]} />
    }

    // const selectButtonType = (e) => {
    //     setButtonSettings({ ...buttonSettings, [`${mobileCondition}${e.target.name}`]: e.target.value })
    // }

    const setMargin = (position) => {
        // `${buttonSettings?.[`buttonPosition`]?.includes("L") && buttonSettings?.[`${mobileCondition}desktop_btn_view_id`] === "icon_only" ? `${buttonSettings?.[`${mobileCondition}btn_margin_left`]}px` : "0px"}`
        if ((!buttonSettings?.[`buttonPosition`]?.includes("M")) || ((buttonSettings?.[`buttonPosition`]?.includes("M")) && (buttonSettings?.[`${mobileCondition}desktop_btn_view_id`] === "icon_only"))) {
            return `${buttonSettings?.[`${mobileCondition}btn_margin_${position}`]}px`
        } else {
            return "0px"
        }
    }


    const toggleMobile = () => {
        setIsMobile(!isMobile)
        // setNotification(true)
    }

    const openNameModal = () => setNameModal(!nameModal)
    const [transfer, setTransfer] = useState("")

    const [editName, setEditName] = useState(false)
    const outletData = getCurrentOutlet()
    const activateListBtn = (item) => {
        return `${activeListBtn === item ? 'list-active' : ''}`
    }

    const sendData = (e, redirection) => {
        e?.preventDefault()
        // if (redirection === "redirect") {
        //     setIsSaving(true)
        // }
        const formData = new FormData()
        formData.append("shop", outletData[0]?.web_url)
        formData.append("app", 'superleadz')
        formData.append("theme_number", `theme${selectedThemeNo}`)
        formData.append("theme_name", themeName)
        formData.append("saving_type", "theme")
        if (isEdit) {
            formData.append("is_edit", 1)
            formData.append("theme_name", themeName)
            formData.append("theme_id", themeId)
        } else {
            formData.append("is_edit", 0)
        }
        Object.entries(themes[`themeData${selectedThemeNo}`])?.map(([key, value]) => {
            if (Array.isArray(value)) {
                value.map(ele => formData.append(key, ele))
            } else if (typeof value === 'string' || (!Array.isArray(value) && key.includes('image'))) {
                formData.append(key, value)
            } else {
                formData.append(key, JSON.stringify(value))
            }
        })

        fetch(`${SuperLeadzBaseURL}/api/v1/add_pop_theme/`, {
            method: "POST",
            body: formData
        })
        .then((resp) => resp.json())
        .then((data) => {
            if (data.response === 'Create Successfully') {
                setIsEdit(true)
                setThemeId(data.theme_id)
                if (redirection === "redirect") {
                    // setToastSuccess(true)
                    // setIsSaving(false)
                    setActiveListBtn("button")
                    // } else { 
                } else if (redirection === "reload") {
                    setActiveListBtn("select")
                    if (JSON.stringify(themes) !== JSON.stringify(defaultThemeData)) {
                        window.location.reload(true)
                    }
                }
                // navigate('/WidgetTheme')
            }
        }).catch(error => {
            alert(error)
            window.location.reload(true)
        })
    }

    const sendBtnData = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("shop", outletData[0]?.web_url)
        formData.append("saving_type", "button")
        Object.entries(buttonSettings)?.map(([key, value]) => {
            if (Array.isArray(value)) {
                value.map(ele => formData.append(key, ele))
            } else if (typeof value === "object") {
                Object.entries(value).map(([subKey, subValue]) => {
                    formData.append(subKey, subValue)
                })
            } else {
                formData.append(key, value)
            }
        })

        // for (const pair of formData.entries()) {
        //   console.log(`${pair[0]}:`, pair[1])
        // }
        fetch(`${SuperLeadzBaseURL}/api/v1/add_pop_button/`, {
            method: "POST",
            body: formData
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data.response)
                if (data.response === "Button Updated Successfully") {
                    openSuccessModal()
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    // const [openSection, setOpenSection] = useState('position')

    useEffect(() => {
        if (valueData) {
            console.log("useEffect valueData")
            setThemes({ ...valueData })
        }
    }, [valueData])

    useEffect(() => {
        const header_p = document.querySelectorAll(`#customization .header-text-sect-${selectedThemeNo} p`)
        const body_p = document.querySelectorAll(`#customization .body-text-sect-${selectedThemeNo} p`)
        header_p.forEach((pTag) => {
            pTag.style.color = themes?.[`themeData${selectedThemeNo}`]?.[`${isMobile ? "mobile_" : ""}header_color`]
        })
        body_p.forEach((pTag) => {
            pTag.style.color = themes?.[`themeData${selectedThemeNo}`]?.[`${isMobile ? "mobile_" : ""}body_color`]
        })
    }, [themes, activeListBtn, offerOpen, openSection])

    return (
        <div className="bg-white rounded-3" style={{ boxShadow: '0 4px 24px 0 rgba(34, 41, 47, 0.1)' }}>
            {isSaving && <div className="loader-custom d-flex justify-content-center align-items-center position-fixed" style={{ width: '100vw', height: '100vh', zIndex: '122', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <span className='loader'>
                    <Loader size={50} color='#fbcd0c' />
                </span>
            </div>}
            <div className="p-1">
                <div className="popup-cust">
                    {/* {toastMarkup} */}
                    {/* {notification && <Toast content={`Currently editing for ${isMobile ? "mobile" : "desktop"}`} onDismiss={() => setNotification(!notification)} />} */}
                    <div className="">
                        <div className="m-0 p-0" style={{ minWidth: '100%' }}>
                            {/* <div className="row border match-height p-0 m-0">
                        <div className="col-3 p-0 border-end">
                        </div>
                        <div className="col-9 p-0">
                        </div>
                    </div> */}
                            <div className="row border match-height p-0 m-0">
                                <div className="col-md-2 p-0 border-end">
                                    {false && <div className={`p-1 border-bottom activePopEdit ${activateListBtn("select")}`} onClick={() => {
                                        if (activeListBtn !== "active") {
                                            if (themes !== defaultThemeData) {
                                                setReloadConfirm(!reloadConfirm)
                                            } else {
                                                setValueData(null)
                                                setValueData({ ...themes, [`themeData${selectedThemeNo}`]: defaultThemeData[`themeData${selectedThemeNo}`] })
                                            }
                                        } else {
                                            window.location.reload(true)
                                        }
                                    }} style={{ cursor: 'pointer' }}>
                                        <div className="d-flex gap-2 align-items-center"><img src="https://cdn-icons-png.flaticon.com/512/1812/1812482.png" width={20} height={20} /><span style={{ fontSize: '90%' }} className='m-0'>Select Pop-up</span></div>
                                    </div>}
                                    <div className={`p-1 border-bottom activePopEdit ${activateListBtn("edit")}`} onClick={() => {
                                        // setActiveListBtn("edit")
                                        setActiveListBtn("edit")
                                    }} style={{ cursor: 'pointer' }}>
                                        <div className="d-flex gap-2 align-items-center"><img src="https://cdn-icons-png.flaticon.com/512/1827/1827933.png" width={20} height={20} /><span style={{ fontSize: '90%' }} className='m-0'>Edit Pop-up</span></div>
                                    </div>
                                    <div className={`border-bottom scroll-custom w-100 sub-items section-open-before`} style={{ height: activeListBtn === "edit" ? 'auto' : '0vh', maxHeight: '55vh', overflow: 'scroll', transition: '0.25s ease', position: 'relative' }}>
                                        {/* <div className="d-flex border-bottom bg-white" style={{ position: 'sticky', top: '0px', zIndex: "99999" }}>
                                            <div onClick={() => setIsMobile(false)} className={`w-50 ${!isMobile && "mobile-toggle-hover"}`} ><button style={{ border: 'none', outline: 'none', boxShadow: 'none' }} className="btn w-100 py-2 border-0"><Monitor size={25} /></button></div>
                                            <div onClick={() => setIsMobile(true)} className={`w-50 ${isMobile && "mobile-toggle-hover"} border-end`} ><button style={{ border: 'none', outline: 'none', boxShadow: 'none' }} className="btn w-100 py-2 border-0"><Smartphone size={25} /></button></div>
                                        </div> */}
                                        <PopUpSidebarButtons toggleMobile={toggleMobile} setIsMobile={setIsMobile} openSection={openSection} setOpenSection={setOpenSection} isMobile={isMobile} selectedThemeNo={selectedThemeNo} isImage={isImage} setIsImage={setIsImage} headerImage={headerImage} setHeaderImage={setHeaderImage} headerImage4={headerImage4} setHeaderImage4={setHeaderImage4} pageLocation={pageLocation} setPageLocation={setPageLocation} customUrl={customUrl} setCustomUrl={setCustomUrl} visitorType={visitorType} setVisitorType={setVisitorType} popupStatus={popupStatus} setPopupStatus={setPopupStatus} popupStatusRange={popupStatusRange} setPopupStatusRange={setPopupStatusRange} offerBg={offerBg} setOfferBg={setOfferBg} offerText={offerText} setOfferText={setOfferText} offerButtonBg={offerButtonBg} setOfferButtonBg={setOfferButtonBg} offerButtonRadius={offerButtonRadius} setOfferButtonRadius={setOfferButtonRadius} offerButtonText={offerButtonText} setOfferButtonText={setOfferButtonText} themes={themes} setThemes={setThemes} />
                                    </div>
                                    <div className={`p-1 border-bottom activePopEdit ${activateListBtn("offer")}`}
                                        onClick={() => {
                                            setActiveListBtn("offer")
                                        }}
                                        style={{ cursor: 'pointer' }}>
                                        <div className="d-flex gap-2 align-items-center"><img src="https://cdn-icons-png.flaticon.com/128/3860/3860206.png" data-src="https://cdn-icons-png.flaticon.com/128/3860/3860206.png" alt="Pop up " title="Pop up " width="20" height="20" srcset="https://cdn-icons-png.flaticon.com/128/3860/3860206.png 4x" /><span style={{ fontSize: '90%' }} className='m-0'>Pop-up Behaviour</span></div>
                                    </div>
                                    <div className={`border-bottom scroll-custom w-100 sub-items section-open-before`} style={{ height: activeListBtn === "offer" ? 'auto' : '0vh', maxHeight: '55vh', overflow: 'scroll', transition: '0.25s ease', position: 'relative' }}>
                                        <OfferSidebarSection selectedThemeNo={selectedThemeNo} themes={themes} setThemes={setThemes} offerOpen={offerOpen} setOfferOpen={setOfferOpen} />
                                    </div>
                                    <div className={`p-1 border-bottom activePopEdit ${activateListBtn("button")}`} onClick={() => {
                                        // setActiveListBtn("button")
                                        setActiveListBtn("button")
                                    }} style={{ cursor: 'pointer' }}>
                                        <div className="d-flex gap-2 align-items-center"><img src="https://cdn-icons-png.flaticon.com/512/106/106755.png " width={20} height={20} /><span style={{ fontSize: '90%' }} className='m-0'>Button Settings</span></div>
                                    </div>
                                    <div className={`border-bottom scroll-custom w-100 sub-items section-open-before`} style={{ height: activeListBtn === "button" ? 'auto' : '0vh', maxHeight: '55vh', overflow: 'scroll', transition: '0.25s ease', position: 'relative' }}>
                                        {/* <div className="d-flex border-bottom bg-white" style={{ position: 'sticky', top: '0px', zIndex: "99999" }}>
                                            <div onClick={() => setIsMobile(false)} className={`w-50 ${!isMobile && "mobile-toggle-hover"}`} ><button style={{ border: 'none', outline: 'none', boxShadow: 'none' }} className="btn w-100 py-2 border-0"><Monitor size={25} /></button></div>
                                            <div onClick={() => setIsMobile(true)} className={`w-50 ${isMobile && "mobile-toggle-hover"} border-end`} ><button style={{ border: 'none', outline: 'none', boxShadow: 'none' }} className="btn w-100 py-2 border-0"><Smartphone size={25} /></button></div>
                                        </div> */}
                                        <div className="questions">
                                            {/* button position */}
                                            <div className={`activePopEdit ${buttonSection === "position" && 'side-active'}`}>
                                                <div onClick={() => setButtonSection(buttonSection === "position" ? '' : 'position')}
                                                    className={`p-1 border-bottom d-flex align-items-center justify-content-between`}
                                                    style={{ cursor: "pointer" }}>
                                                    <span className="d-flex align-items-center gap-2" style={{ fontSize: '90%' }}>
                                                        <Square size={16} /> Button Position
                                                    </span> <ChevronDown size={14} style={{ rotate: buttonSection === "position" ? '180deg' : '0deg', transition: '0.5s' }} />
                                                </div>
                                                <div className="border-bottom container" style={{ maxHeight: buttonSection === "position" ? '25vh' : '0vh', transition: '0.5s', overflow: 'hidden' }}>
                                                    <div style={{ transform: `translateX(${buttonSection === 'position' ? '0%' : '-100%'})`, opacity: `${buttonSection === 'position' ? '1' : '0'}`, transition: '0.5s ease' }}>
                                                        <div className="d-flex gap-1 flex-column justify-content-center align-items-center py-1" >
                                                            <div className="d-flex gap-1">
                                                                <div className="border-black rounded" style={{ backgroundColor: 'lightgray', width: '20px', aspectRatio: "1", cursor: "not-allowed" }}></div>
                                                                <div className="border-black rounded" style={{ backgroundColor: 'lightgray', width: '20px', aspectRatio: "1", cursor: "not-allowed" }}></div>
                                                                <div className="border-black rounded" style={{ backgroundColor: 'lightgray', width: '20px', aspectRatio: "1", cursor: "not-allowed" }}></div>
                                                            </div>
                                                            <div className="d-flex gap-1">
                                                                <div className="border-black rounded" style={{ backgroundColor: buttonSettings[`buttonPosition`] === 'ML' ? "#e31e25" : "white", width: '20px', aspectRatio: "1", cursor: "pointer" }}
                                                                    onClick={() => {
                                                                        setButtonSettings({ ...buttonSettings, [`buttonPosition`]: 'ML' })
                                                                    }}></div>
                                                                <div className="border-black rounded" style={{ backgroundColor: 'lightgray', width: '20px', aspectRatio: "1", cursor: "not-allowed" }}></div>
                                                                <div className="border-black rounded" style={{ backgroundColor: buttonSettings[`buttonPosition`] === 'MR' ? "#e31e25" : "white", width: '20px', aspectRatio: "1", cursor: "pointer" }} onClick={() => {
                                                                    setButtonSettings({ ...buttonSettings, [`buttonPosition`]: 'MR' })
                                                                }}></div>
                                                            </div>
                                                            <div className="d-flex gap-1">
                                                                <div className="border-black rounded" style={{ backgroundColor: buttonSettings[`buttonPosition`] === 'BL' ? "#e31e25" : "white", width: '20px', aspectRatio: "1", cursor: "pointer" }} onClick={() => {
                                                                    setButtonSettings({ ...buttonSettings, [`buttonPosition`]: 'BL' })
                                                                }}></div>
                                                                <div className="border-black rounded" style={{ backgroundColor: buttonSettings[`buttonPosition`] === 'BC' ? "#e31e25" : "white", width: '20px', aspectRatio: "1", cursor: "pointer" }} onClick={() => {
                                                                    setButtonSettings({ ...buttonSettings, [`buttonPosition`]: 'BC' })
                                                                }}></div>
                                                                <div className="border-black rounded" style={{ backgroundColor: buttonSettings[`buttonPosition`] === 'BR' ? "#e31e25" : "white", width: '20px', aspectRatio: "1", cursor: "pointer" }} onClick={() => {
                                                                    setButtonSettings({ ...buttonSettings, [`buttonPosition`]: 'BR' })
                                                                }}></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* button background color */}
                                            <div className={`activePopEdit ${buttonSection === "color" && 'side-active'}`}>
                                                <div onClick={() => setButtonSection(buttonSection === "color" ? '' : 'color')}
                                                    className={`p-1 border-bottom d-flex align-items-center justify-content-between`}
                                                    style={{ cursor: "pointer" }}>
                                                    <span className="d-flex align-items-center gap-2" style={{ fontSize: '90%' }}>
                                                        <PenTool size={16} /> Button Color
                                                    </span> <ChevronDown size={14} style={{ rotate: buttonSection === "color" ? '180deg' : '0deg', transition: '0.5s' }} />
                                                </div>
                                                <div className="border-bottom" style={{ maxHeight: buttonSection === "color" ? '25vh' : '0vh', transition: '0.5s', overflow: 'hidden' }}>
                                                    <div style={{
                                                        transform: `translateX(${buttonSection === 'color' ? '0%' : '-100%'})`,
                                                        opacity: `${buttonSection === 'color' ? '1' : '0'}`,
                                                        transition: '0.5s ease'
                                                    }} className="d-flex flex-column gap-1 p-1">
                                                        <span style={{ fontSize: '85%' }} className="w-100">Button Color: </span>
                                                        <label title={`Button color: ${buttonSettings[`btn_backgroug_color`]}`} htmlFor="button_selector" style={{ backgroundColor: buttonSettings[`btn_backgroug_color`], cursor: 'pointer' }} className="w-100 p-1 border rounded">
                                                            <input value={buttonSettings[`btn_backgroug_color`]}
                                                                autoComplete="off"
                                                                onChange={(event) => {
                                                                    setButtonSettings({ ...buttonSettings, [`btn_backgroug_color`]: event.target.value })
                                                                }} id="button_selector" type="color" className="d-none" />
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* button type */}
                                            <div className={`activePopEdit ${buttonSection === "type" && 'side-active'}`}>
                                                <div onClick={() => setButtonSection(buttonSection === "type" ? '' : 'type')}
                                                    className={`p-1 border-bottom d-flex align-items-center justify-content-between`}
                                                    style={{ cursor: "pointer" }}>
                                                    <span className="d-flex align-items-center gap-2" style={{ fontSize: '90%' }}>
                                                        <Type size={16} /> Button Type
                                                    </span> <ChevronDown size={14} style={{ rotate: buttonSection === "type" ? '180deg' : '0deg', transition: '0.5s' }} />
                                                </div>
                                                <div className="border-bottom" style={{ maxHeight: buttonSection === "type" ? '25vh' : '0vh', transition: '0.5s', overflow: 'hidden' }}>
                                                    <div className="p-1 d-flex flex-column" style={{ transform: `translateX(${buttonSection === 'type' ? '0%' : '-100%'})`, opacity: `${buttonSection === 'type' ? '1' : '0'}`, transition: '0.5s ease' }}>
                                                        {!isMobile && <button onClick={() => {
                                                            setButtonSettings({ ...buttonSettings, [`${mobileCondition}desktop_btn_view_id`]: 'text_&_icon' })
                                                        }} className="btn w-100 border-none" style={{ boxShadow: 'none', border: 'none', outline: 'none', fontSize: '85%', color: buttonSettings[`${mobileCondition}desktop_btn_view_id`] === 'text_&_icon' ? '' : '' }}>Text & Icon</button>}
                                                        <button onClick={() => {
                                                            setButtonSettings({ ...buttonSettings, [`${mobileCondition}desktop_btn_view_id`]: 'text_only' })
                                                        }} className={`btn w-100 border-none custom-slide-radio radio-slide-${buttonSettings[`${mobileCondition}desktop_btn_view_id`] === 'text_&_icon' ? '1' : buttonSettings[`${mobileCondition}desktop_btn_view_id`] === 'text_only' ? '2' : '3'}`} style={{ boxShadow: 'none', border: 'none', outline: 'none', fontSize: '85%', color: buttonSettings[`${mobileCondition}desktop_btn_view_id`] === 'text_only' ? '' : '' }}>Text Only</button>
                                                        <button onClick={() => {
                                                            setButtonSettings({ ...buttonSettings, [`${mobileCondition}desktop_btn_view_id`]: 'icon_only' })
                                                        }} className="btn w-100 border-none" style={{ boxShadow: 'none', border: 'none', outline: 'none', fontSize: '85%', color: buttonSettings[`${mobileCondition}desktop_btn_view_id`] === 'icon_only' ? '' : '' }}>Icon Only</button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* button spacing */}
                                            <div className={`activePopEdit ${buttonSection === "spacing" && 'side-active'} ${(buttonSettings?.[`buttonPosition`]?.includes("M") && buttonSettings?.[`${mobileCondition}desktop_btn_view_id`] !== 'icon_only') ? "d-none" : ""}`}>
                                                <div onClick={() => setButtonSection(buttonSection === "spacing" ? '' : 'spacing')}
                                                    className={`p-1 border-bottom d-flex align-items-center justify-content-between`}
                                                    style={{ cursor: "pointer" }}>
                                                    <span className="d-flex align-items-center gap-2" style={{ fontSize: '90%' }}>
                                                        <ArrowLeft size={16} /> Button spacing
                                                    </span> <ChevronDown size={14} style={{ rotate: buttonSection === "spacing" ? '180deg' : '0deg', transition: '0.5s' }} />
                                                </div>
                                                <div className="border-bottom" style={{ maxHeight: buttonSection === "spacing" ? '25vh' : '0vh', transition: '0.5s', overflow: 'hidden' }}>

                                                    <div className="p-1 row" style={{ transform: `translateX(${buttonSection === 'spacing' ? '0%' : '-100%'})`, opacity: `${buttonSection === 'spacing' ? '1' : '0'}`, transition: '0.5s ease' }}>
                                                        {buttonSettings?.[`buttonPosition`]?.includes('L') && <div className="col-12 mb-3">
                                                            <label style={{ fontSize: '87.5%' }} htmlFor="ml-input">Margin Left</label>
                                                            <div className="d-flex align-items-center gap-1">
                                                                <input
                                                                    value={buttonSettings?.[`${isMobile ? "mobile_" : ""}btn_margin_left`]}
                                                                    onChange={e => {
                                                                        setButtonSettings({ ...buttonSettings, [`${mobileCondition}btn_margin_left`]: e.target.value })
                                                                    }}
                                                                    id="ml-input"
                                                                    className="w-100"
                                                                    style={{ accentColor: '#fbcd0c' }}
                                                                    min={0} max={100}
                                                                    type="range"
                                                                    name="btn_margin_left" /> <p className="m-0" style={{ fontSize: '87.5%' }}>{buttonSettings?.[`${mobileCondition}btn_margin_left`]}px</p>
                                                            </div>
                                                        </div>}

                                                        {buttonSettings?.[`buttonPosition`]?.includes('R') && <div className="col-12 mb-3">
                                                            <label style={{ fontSize: '87.5%' }} htmlFor="ml-input">Margin Right</label>
                                                            <div className="d-flex align-items-center gap-1">
                                                                <input value={buttonSettings?.[`${isMobile ? "mobile_" : ""}btn_margin_right`]} onChange={e => {
                                                                    setButtonSettings({ ...buttonSettings, [`${mobileCondition}btn_margin_right`]: e.target.value })
                                                                }} id="mr-input" className="w-100" style={{ accentColor: '#fbcd0c' }} min={0} max={100} type="range" name="btn_margin_right" /> <p className="m-0" style={{ fontSize: '87.5%' }}>{buttonSettings?.[`${mobileCondition}btn_margin_right`]}px</p>
                                                            </div>
                                                        </div>}
                                                        {buttonSettings?.[`buttonPosition`]?.includes('B') && <div className="col-12 mb-3">
                                                            <label style={{ fontSize: '87.5%' }} htmlFor="ml-input">Margin Bottom</label>
                                                            <div className="d-flex align-items-center gap-1">
                                                                <input value={buttonSettings?.[`${isMobile ? "mobile_" : ""}btn_margin_bottom`]} onChange={e => {
                                                                    setButtonSettings({ ...buttonSettings, [`${mobileCondition}btn_margin_bottom`]: e.target.value })
                                                                }} id="mb-input" className="w-100" style={{ accentColor: '#fbcd0c' }} min={0} max={100} type="range" name="btn_margin_bottom" /> <p className="m-0" style={{ fontSize: '87.5%' }}>{buttonSettings?.[`${mobileCondition}btn_margin_bottom`]}px</p>
                                                            </div>
                                                        </div>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={`activePopEdit ${buttonSection === "icon" && 'side-active'} ${buttonSettings[`${isMobile ? 'mobile_' : ''}desktop_btn_view_id`] === 'text_only' ? 'd-none' : ''}`}>
                                                <div onClick={() => setButtonSection(buttonSection === "icon" ? '' : 'icon')}
                                                    className={`p-1 border-bottom d-flex align-items-center justify-content-between`}
                                                    style={{ cursor: "pointer" }}>
                                                    <span className="d-flex align-items-center gap-2" style={{ fontSize: '90%' }}>
                                                        <MousePointer size={16} /> Select Icon
                                                    </span> <ChevronDown size={14} style={{ rotate: buttonSection === "icon" ? '180deg' : '0deg', transition: '0.5s' }} />
                                                </div>
                                                <div className="border-bottom" style={{ maxHeight: buttonSection === "icon" ? '25vh' : '0vh', transition: '0.5s', overflow: 'hidden' }}>
                                                    <div style={{
                                                        transform: `translateX(${buttonSection === 'icon' ? '0%' : '-100%'})`,
                                                        opacity: `${buttonSection === 'icon' ? '1' : '0'}`,
                                                        transition: '0.5s ease'
                                                    }} className="row row-cols-3 justify-content-center w-100 m-0 py-2">
                                                        {Object.entries(icons).map(([key, value], index) => {
                                                            return (
                                                                <div key={index} className="col mb-2" >
                                                                    <span onClick={() => {

                                                                        setButtonSettings({ ...buttonSettings, [`btn_icons`]: key })
                                                                    }} className="d-flex justify-content-center align-items-center rounded" style={{ padding: "0.25rem", backgroundColor: `rgba(255, 239, 106, ${buttonSettings[`btn_icons`] === key ? '0.125' : '0'})`, outline: `3px solid ${buttonSettings[`btn_icons`] === key ? '#fbcd0c' : 'gray'}`, aspectRatio: '1', transition: '0.3s ease', cursor: 'pointer', scale: buttonSettings[`btn_icons`] === key ? '1' : '0.85', width: '100%', maxWidth: '35px' }}>
                                                                        {value}
                                                                    </span>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={`activePopEdit ${buttonSection === "textcust" && 'side-active'} ${buttonSettings[`${isMobile ? 'mobile_' : ''}desktop_btn_view_id`] === 'icon_only' ? 'd-none' : ''}`}>
                                                <div onClick={() => setButtonSection(buttonSection === "textcust" ? '' : 'textcust')}
                                                    className={`p-1 border-bottom d-flex align-items-center justify-content-between`}
                                                    style={{ cursor: "pointer" }}>
                                                    <span className="d-flex align-items-center gap-2" style={{ fontSize: '90%' }}>
                                                        <Menu size={16} /> Text Customization
                                                    </span> <ChevronDown size={14} style={{ rotate: buttonSection === "textcust" ? '180deg' : '0deg', transition: '0.5s' }} />
                                                </div>
                                                <div className="border-bottom" style={{ maxHeight: buttonSection === "textcust" ? '25vh' : '0vh', transition: '0.5s', overflow: 'hidden' }}>
                                                    <div style={{
                                                        transform: `translateX(${buttonSection === 'textcust' ? '0%' : '-100%'})`,
                                                        opacity: `${buttonSection === 'textcust' ? '1' : '0'}`,
                                                        transition: '0.5s ease',
                                                        fontSize: '85%'
                                                    }} className="custom_text p-1">
                                                        <input
                                                            className="form-control"
                                                            value={buttonSettings[`textValue`]}
                                                            name="textValue"
                                                            autoComplete="off"
                                                            onChange={(event) => {
                                                                setButtonSettings({ ...buttonSettings, [`textValue`]: event.target.value })
                                                            }}
                                                            maxLength={18}
                                                            style={{ fontSize: '90%' }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={`activePopEdit ${buttonSection === "itcolor" && 'side-active'}`}>
                                                <div onClick={() => setButtonSection(buttonSection === "itcolor" ? '' : 'itcolor')}
                                                    className={`p-1 border-bottom d-flex align-items-center justify-content-between`}
                                                    style={{ cursor: "pointer" }}>
                                                    <span className="d-flex align-items-center gap-2" style={{ fontSize: '90%' }}>
                                                        <Edit3 size={16} /> Icon / Text Color
                                                    </span> <ChevronDown size={14} style={{ rotate: buttonSection === "itcolor" ? '180deg' : '0deg', transition: '0.5s' }} />
                                                </div>
                                                <div className="border-bottom" style={{ maxHeight: buttonSection === "itcolor" ? '25vh' : '0vh', transition: '0.5s', overflow: 'hidden' }}>
                                                    <div style={{
                                                        transform: `translateX(${buttonSection === 'itcolor' ? '0%' : '-100%'})`,
                                                        opacity: `${buttonSection === 'itcolor' ? '1' : '0'}`,
                                                        transition: '0.5s ease'
                                                    }} className="d-flex flex-column gap-1 p-1">
                                                        <span style={{ fontSize: '85%' }} className="w-100">Select Icon / Text Color: </span>
                                                        <label title={`Icon / Text color: ${buttonSettings[`btn_font_color`]}`} htmlFor="t_i_selector" style={{ backgroundColor: buttonSettings[`btn_font_color`], cursor: 'pointer' }} className="w-100 p-1 border rounded">
                                                            <input value={buttonSettings[`btn_font_color`]}
                                                                autoComplete="off"
                                                                onChange={(event) => {
                                                                    setButtonSettings({ ...buttonSettings, [`btn_font_color`]: event.target.value })
                                                                }} id="t_i_selector" type="color" className="d-none" />
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className={`p-1 border-bottom activePopEdit ${activateListBtn("assignOffer")}`} onClick={() => {
                                        // setActiveListBtn("assignOffer")
                                    }} style={{ cursor: 'pointer' }}>
                                        <div className="d-flex gap-2 align-items-center"><img src="https://cdn-icons-png.flaticon.com/512/9406/9406095.png" width={20} height={20} /><span style={{fontSize: '95%'}} className='m-0'>Assign Offers</span></div>
                                    </div> */}
                                </div>
                                <div style={{ overflow: 'scroll' }} className={`scroll-custom col-md-${(activeListBtn === 'edit' || activeListBtn === 'offer') ? '10' : '10'} p-0`}>
                                    {activeListBtn === "select" && <ThemeSelection transfer={transfer} setTransfer={setTransfer} nameModal={nameModal} setNameModal={setNameModal} openNameModal={openNameModal} setIsMobile={setIsMobile} isEdit={isEdit} setIsEdit={setIsEdit} themeName={themeName} setThemeName={setThemeName} setActiveListBtn={setActiveListBtn} selectedThemeNo={selectedThemeNo} setSelectedThemeNo={setSelectedThemeNo} themes={themes} setThemes={setThemes} />}
                                    {activeListBtn === "edit" && (
                                        <div className='h-100 w-100'>
                                            {/* customization preview  */}
                                            <div id="customization" className="w-100">
                                                <div className="w-100">
                                                    <div style={{ width: isMobile ? '318px' : '100%', borderRadius: isMobile ? '1.25rem' : '0rem', overflow: 'hidden', aspectRatio: isMobile ? '9/16' : '1193/520' }} className={`border mx-auto mt-${isMobile ? "2" : "0"}`}>
                                                        {/* <div className="w-100 border-bottom p-1">
                                                            <div className="d-flex gap-2 align-items-center">
                                                                <input className='flex-grow-1 px-2' value={`${outletData[0]?.web_url}`} style={{ borderRadius: '500px', border: 'none', boxShadow: 'none', outline: '1.5px solid #464646' }} />
                                                                {isMobile ? (<MoreVertical />) : (<div className="d-flex align-items-center gap-2">
                                                                    <Minus className='align-self-end' size="15" />
                                                                    <Square size="12.5" />
                                                                    <X size="17.5" />
                                                                </div>)}
                                                            </div>
                                                        </div> */}
                                                        <div className="position-relative w-100 bg-secondary-light d-flex justify-content-center align-items-center" style={{ backgroundImage: `url(${skeleton})`, backgroundSize: isMobile ? "contain" : 'cover', backgroundPosition: 'center', height: '100%' }}>
                                                            <div className="w-100 h-100 d-flex justify-content-center align-items-center scroll-custom" style={{ backgroundColor: 'rgba(0,0,0,0.25)', backdropFilter: 'blur(5px)', overflow: 'hidden' }}>
                                                                <div style={{ scale: isMobile ? "0.65" : "0.9" }}>
                                                                    {selectedThemeNo === 3 ? (<Theme1 setOpenSection={setOpenSection} isMobile={isMobile} themes={themes} showOffer={openSection === "offer"} offerBg={offerBg} offerText={offerText} offerButtonBg={offerButtonBg} offerButtonRadius={offerButtonRadius} offerButtonText={offerButtonText} />) : selectedThemeNo === 4 ? <Theme4 setOpenSection={setOpenSection} isMobile={isMobile} themes={themes} /> : ''
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex justify-content-between align-items-center gap-2 w-100" style={{ padding: '1rem 2rem', zIndex: '999999999' }}>
                                                        <button className='primary-btn-outline' onClick={e => {
                                                            sendData(e)
                                                            setNameModal(false)
                                                            openSection === "button" ? setOpenSection("text") : openSection === "text" ? setOpenSection("image") : openSection === "image" ? setOpenSection("background") : navigate("/merchant/SuperLeadz/Themes/")
                                                        }}>Back</button>
                                                        <div className='d-flex align-items-center justify-content-start gap-2 border p-1 rounded'>
                                                            <label htmlFor="prev-name">Theme Name: </label>
                                                            {editName ? <input id='prev-name' style={{ border: 'none', outline: 'none', boxShadow: 'none' }} value={themeName} onKeyDown={e => {
                                                                if (e.key === "Enter") {
                                                                    setEditName(false)
                                                                }
                                                            }} onChange={e => setThemeName(e.target.value)} type="text" /> : <span style={{ wordBreak: 'break-word' }}>{themeName}</span>}
                                                            <span className='ms-auto' style={{ cursor: 'pointer' }} onClick={() => setEditName(!editName)} >{!editName ? <Edit2 size={12.5} /> : <Check size={15} color='green' />}</span>
                                                        </div>
                                                        <div className='d-flex align-items-center justify-content-center gap-2 pe-4'>
                                                            <span>Editing this Pop-up for </span>
                                                            <div onClick={toggleMobile} className='position-relative d-flex justify-content-center align-items-center rounded' style={{ width: '2rem', height: '2rem', cursor: 'pointer' }}>
                                                                <span className="position-absolute rounded-3" style={{ width: "2rem", height: "2rem", backgroundColor: '#fbcd0c', inset: '0px auto auto 0px', transform: `translateX(${!isMobile ? "0%" : "100%"})`, transition: '0.3s ease' }}></span>
                                                                <span style={{ transform: `translateX(0%)`, zIndex: "1", transition: '0.3s ease' }} className='w-100 h-100 d-flex justify-content-center align-items-center'>
                                                                    <Monitor style={{ transition: '0.3s ease' }} size={16} />
                                                                </span>
                                                                <span style={{ transform: `translateX(100%)`, zIndex: "1", transition: '0.3s ease' }} className='w-100 h-100 d-flex justify-content-center align-items-center position-absolute'>
                                                                    <Smartphone style={{ transition: '0.3s ease' }} size={16} />
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <button className='primary-btn' onClick={e => {
                                                            sendData(e)
                                                            openSection === "background" ? setOpenSection("image") : openSection === "image" ? setOpenSection("text") : openSection === "text" ? setOpenSection("button") : setActiveListBtn('offer')
                                                        }}>Next</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {activeListBtn === "offer" && (
                                        <div className='h-100 w-100'>
                                            <div id="customization" className="w-100">
                                                <div className="w-100">
                                                    <div style={{ width: isMobile ? '318px' : '100%', borderRadius: isMobile ? '1.25rem' : '0rem', overflow: 'hidden', aspectRatio: isMobile ? '9/16' : '1193/520' }} className={`border mx-auto mt-${isMobile ? "2" : "0"}`}>
                                                        {/* <div className="w-100 border-bottom p-1">
                                                            <div className="d-flex gap-2 align-items-center">
                                                                <input className='flex-grow-1 px-2' value={`${outletData[0]?.web_url}`} style={{ borderRadius: '500px', border: 'none', boxShadow: 'none', outline: '1.5px solid #464646' }} />
                                                                {isMobile ? (<MoreVertical />) : (<div className="d-flex align-items-center gap-2">
                                                                    <Minus className='align-self-end' size="15" />
                                                                    <Square size="12.5" />
                                                                    <X size="17.5" />
                                                                </div>)}
                                                            </div>
                                                        </div> */}
                                                        <div className="position-relative w-100 bg-secondary-light d-flex justify-content-center align-items-center" style={{ backgroundImage: `url(${skeleton})`, backgroundSize: isMobile ? "contain" : 'cover', backgroundPosition: 'center', height: '100%' }}>
                                                            <div className="w-100 h-100 d-flex justify-content-center align-items-center scroll-custom" style={{ backgroundColor: 'rgba(0,0,0,0.25)', backdropFilter: 'blur(5px)', overflow: 'hidden' }}>
                                                                <div style={{ scale: isMobile ? "0.65" : "0.9" }}>
                                                                    {selectedThemeNo === 3 ? (<Theme1 setOpenSection={setOpenSection} isMobile={isMobile} themes={themes} showOffer={openSection === "offer"} offerBg={offerBg} offerText={offerText} offerButtonBg={offerButtonBg} offerButtonRadius={offerButtonRadius} offerButtonText={offerButtonText} />) : selectedThemeNo === 4 ? <Theme4 setOpenSection={setOpenSection} isMobile={isMobile} themes={themes} /> : ''
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex justify-content-between align-items-center gap-2 w-100" style={{ padding: '1rem 2rem', zIndex: '999999999' }}>
                                                        <button className='primary-btn-outline' onClick={e => {
                                                            sendData(e)
                                                            offerOpen === "verify" ? setOfferOpen("page") : offerOpen === "page" ? setOfferOpen("vis_set") : offerOpen === "vis_set" ? setOfferOpen("vis_type") : setActiveListBtn("edit")
                                                        }}>Back</button>
                                                        <div className='d-flex align-items-center justify-content-start gap-2 border p-1 rounded'>
                                                            <label htmlFor="prev-name">Theme Name: </label>
                                                            {editName ? <input id='prev-name' style={{ border: 'none', outline: 'none', boxShadow: 'none' }} value={themeName} onKeyDown={e => {
                                                                if (e.key === "Enter") {
                                                                    setEditName(false)
                                                                }
                                                            }} onChange={e => setThemeName(e.target.value)} type="text" /> : <span style={{ wordBreak: 'break-word' }}>{themeName}</span>}
                                                            <span className='ms-auto' style={{ cursor: 'pointer' }} onClick={() => setEditName(!editName)} >{!editName ? <Edit2 size={12.5} /> : <Check size={15} color='green' />}</span>
                                                        </div>
                                                        <div className='d-flex align-items-center justify-content-center gap-2 pe-4'>
                                                            <span>Editing this Pop-up for </span>
                                                            <div onClick={toggleMobile} className='position-relative d-flex justify-content-center align-items-center rounded' style={{ width: '2rem', height: '2rem', cursor: 'pointer' }}>
                                                                <span className="position-absolute rounded-3" style={{ width: "2rem", height: "2rem", backgroundColor: '#fbcd0c', inset: '0px auto auto 0px', transform: `translateX(${!isMobile ? "0%" : "100%"})`, transition: '0.3s ease' }}></span>
                                                                <span style={{ transform: `translateX(0%)`, zIndex: "1", transition: '0.3s ease' }} className='w-100 h-100 d-flex justify-content-center align-items-center'>
                                                                    <Monitor style={{ transition: '0.3s ease' }} size={16} />
                                                                </span>
                                                                <span style={{ transform: `translateX(100%)`, zIndex: "1", transition: '0.3s ease' }} className='w-100 h-100 d-flex justify-content-center align-items-center position-absolute'>
                                                                    <Smartphone style={{ transition: '0.3s ease' }} size={16} />
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <button className='primary-btn' onClick={e => {
                                                            if (offerOpen === "vis_type") {
                                                                sendData(e)
                                                                setOfferOpen("vis_set")
                                                            } else if (offerOpen === "vis_set") {
                                                                sendData(e)
                                                                setOfferOpen("page")
                                                            } else if (offerOpen === "page") {
                                                                sendData(e)
                                                                setOfferOpen("verify")
                                                            } else if (offerOpen) {
                                                                sendData(e, "redirect")
                                                            }
                                                        }}>Next</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {activeListBtn === "button" && <div className='h-100 w-100'>
                                        <div id="customization" className="w-100">
                                            <div className="w-100">
                                                <div style={{ width: isMobile ? '318px' : '100%', borderRadius: isMobile ? '1.25rem' : '0rem', overflow: 'hidden', aspectRatio: isMobile ? '9/16' : '1193/520' }} className={`border mx-auto mt-${isMobile ? "2" : "0"}`}>
                                                    {/* <div className="w-100 border-bottom p-1">
                                                            <div className="d-flex gap-2 align-items-center">
                                                                <input className='flex-grow-1 px-2' value={`${outletData[0]?.web_url}`} style={{ borderRadius: '500px', border: 'none', boxShadow: 'none', outline: '1.5px solid #464646' }} />
                                                                {isMobile ? (<MoreVertical />) : (<div className="d-flex align-items-center gap-2">
                                                                    <Minus className='align-self-end' size="15" />
                                                                    <Square size="12.5" />
                                                                    <X size="17.5" />
                                                                </div>)}
                                                            </div>
                                                        </div> */}
                                                    <div className="position-relative w-100 bg-secondary-light d-flex justify-content-center align-items-center" style={{ backgroundImage: `url(${skeleton})`, backgroundSize: isMobile ? "contain" : 'cover', backgroundPosition: 'center', height: '100%' }}>
                                                        <div className="w-100 h-100 d-flex justify-content-center align-items-center scroll-custom" style={{ backgroundColor: 'rgba(0,0,0,0)', backdropFilter: 'blur(5px)', overflow: 'hidden' }}>
                                                            <div
                                                                style={{
                                                                    position: "relative"
                                                                    // borderRadius: `10px`,
                                                                    // marginBottom: isMobile ? '27.5%' : '0px'
                                                                    // display: 'flex',
                                                                    // justifyContent: buttonSettings[`buttonPosition`] === 'BC' ? 'center' : (buttonSettings[`buttonPosition`] === 'ML' || buttonSettings[`buttonPosition`] === 'BL') ? 'start' : 'end',
                                                                    // alignItems: (buttonSettings[`buttonPosition`] === 'ML' || buttonSettings[`buttonPosition`] === 'MR') ? 'center' : 'end'
                                                                }}

                                                                className={`w-100 h-100`}
                                                            >
                                                                <button
                                                                    className={`XIRCLS_${buttonSettings[`buttonPosition`]} ${buttonSettings[`${mobileCondition}desktop_btn_view_id`] === 'text_only' ? 'text-btn' : buttonSettings[`${mobileCondition}desktop_btn_view_id`] === 'icon_only' ? 'icon-btn' : 'text-icon-btn'}`}
                                                                    style={{
                                                                        fontFamily: "OpenSans-Bold",
                                                                        backgroundColor: `${buttonSettings[`btn_backgroug_color`]}`,
                                                                        display: "flex",
                                                                        zIndex: "10",
                                                                        justifyContent: "center",
                                                                        gap: buttonSettings[`${mobileCondition}desktop_btn_view_id`] === 'text_&_icon' ? 10 : 0,
                                                                        alignItems: "center",
                                                                        padding: 10,
                                                                        cursor: "pointer",
                                                                        border: 2,
                                                                        marginLeft: setMargin("left"),
                                                                        marginRight: setMargin("right"),
                                                                        marginBottom: `${buttonSettings?.[`buttonPosition`]?.includes("B") ? `${buttonSettings?.[`${mobileCondition}btn_margin_bottom`]}px` : "0px"}`,
                                                                        filter: "drop-shadow(0px 0px 15px rgba(0,0,0,0.5))"
                                                                    }}
                                                                >
                                                                    {/* <img id="xircls_btn_desktop_img" style={{width: `30px`, verticalAlign: 'inherit'}} src="https://api.xircls.com/static/images/sprite_icons/gift.svg" /> */}
                                                                    {buttonSettings[`${mobileCondition}desktop_btn_view_id`].includes('icon') && <span style={{ width: '1.275rem', aspectRatio: '1', rotate: (buttonSettings[`${mobileCondition}desktop_btn_view_id`] === 'icon_only' && buttonSettings[`buttonPosition`] === "MR") ? '-90deg' : (buttonSettings[`${mobileCondition}desktop_btn_view_id`] === 'icon_only' && buttonSettings[`buttonPosition`] === "ML") ? '90deg' : '0deg' }}>
                                                                        {activeIcons[buttonSettings[`btn_icons`]]}
                                                                    </span>}
                                                                    {buttonSettings[`${mobileCondition}desktop_btn_view_id`].includes('text') && <span
                                                                        style={{
                                                                            fontSize: "75%",
                                                                            fontWeight: 400,
                                                                            color: `${buttonSettings[`btn_font_color`]}`
                                                                        }}
                                                                        className="text-center flex-grow-1"
                                                                    >
                                                                        {buttonSettings[`textValue`]}
                                                                    </span>}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center gap-2 w-100" style={{ padding: '1rem 2rem', zIndex: '999999999' }}>
                                                    <button className='primary-btn-outline' onClick={() => {
                                                        buttonSection === "itcolor" ? setButtonSection("textcust") : buttonSection === "textcust" ? setButtonSection("icon") : buttonSection === "icon" ? setButtonSection("spacing") : buttonSection === "spacing" ? setButtonSection("type") : buttonSection === "type" ? setButtonSection("color") : buttonSection === "color" ? setButtonSection("position") : setActiveListBtn("offer")
                                                    }}>Back</button>
                                                    <div className='d-flex align-items-center justify-content-start gap-2 border p-1 rounded'>
                                                        <label htmlFor="prev-name">Theme Name: </label>
                                                        {editName ? <input id='prev-name' style={{ border: 'none', outline: 'none', boxShadow: 'none' }} value={themeName} onKeyDown={e => {
                                                            if (e.key === "Enter") {
                                                                setEditName(false)
                                                            }
                                                        }} onChange={e => setThemeName(e.target.value)} type="text" /> : <span style={{ wordBreak: 'break-word' }}>{themeName}</span>}
                                                        <span className='ms-auto' style={{ cursor: 'pointer' }} onClick={() => setEditName(!editName)} >{!editName ? <Edit2 size={12.5} /> : <Check size={15} color='green' />}</span>
                                                    </div>
                                                    <div className='d-flex align-items-center justify-content-center gap-2 pe-4'>
                                                        <span>Editing this Button for </span>
                                                        <div onClick={toggleMobile} className='position-relative d-flex justify-content-center align-items-center rounded' style={{ width: '2rem', height: '2rem', cursor: 'pointer' }}>
                                                            <span className="position-absolute rounded-3" style={{ width: "2rem", height: "2rem", backgroundColor: '#fbcd0c', inset: '0px auto auto 0px', transform: `translateX(${!isMobile ? "0%" : "100%"})`, transition: '0.3s ease' }}></span>
                                                            <span style={{ transform: `translateX(0%)`, zIndex: "1", transition: '0.3s ease' }} className='w-100 h-100 d-flex justify-content-center align-items-center'>
                                                                <Monitor style={{ transition: '0.3s ease' }} size={16} />
                                                            </span>
                                                            <span style={{ transform: `translateX(100%)`, zIndex: "1", transition: '0.3s ease' }} className='w-100 h-100 d-flex justify-content-center align-items-center position-absolute'>
                                                                <Smartphone style={{ transition: '0.3s ease' }} size={16} />
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <button className='primary-btn' onClick={(e) => {
                                                        buttonSection === "" ? setButtonSection("position") : buttonSection === "position" ? setButtonSection("color") : buttonSection === "color" ? setButtonSection("type") : buttonSection === "type" ? setButtonSection("spacing") : buttonSection === "spacing" ? setButtonSection("icon") : buttonSection === "icon" ? setButtonSection("textcust") : buttonSection === "textcust" ? setButtonSection("itcolor") : sendBtnData(e)
                                                    }}>Next</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Modal centered isOpen={draftModal} toggle={() => setDraftModal(!draftModal)} className='position-relative popup-cust' >
                        <ModalBody>
                            <span className="position-absolute top-0 end-0 p-1" style={{ cursor: 'pointer', padding: "0.25rem" }} onClick={() => setDraftModal(!draftModal)}>
                                <X size={13.5} />
                            </span>
                            Continue with your last progress?
                            <div className='text-end'>
                                <button className="btn btn-sm btn-success"
                                    onClick={() => {
                                        setActiveListBtn("edit")
                                        setIsEdit(true)
                                        // setValueData(JSON.parse(localStorage.getItem("themes")))
                                        setIsMobile(false)
                                        setDraftModal(false)
                                    }}
                                >Yes</button>
                            </div>
                        </ModalBody>
                    </Modal>
                    <Modal centered isOpen={reloadConfirm} toggle={() => setReloadConfirm(!reloadConfirm)} className='position-relative popup-cust' >
                        <ModalBody>
                            <span className="position-absolute top-0 end-0" style={{ cursor: 'pointer', padding: "0.25rem" }} onClick={() => setReloadConfirm(!reloadConfirm)}>
                                <X size={13.5} />
                            </span>
                            <p className="mb-2">Are you sure you want to exit customization?</p>
                            <div className='d-flex justify-content-end align-items-center gap-2'>
                                <button className="primary-btn-outline"
                                    onClick={() => {
                                        const form_data = new FormData()
                                        form_data.append("theme_id", themeId)
                                        fetch(`${SuperLeadzBaseURL}/api/v1/delete/theme/`, {
                                            method: "POST",
                                            body: form_data
                                        })
                                            .then((resp) => resp.json())
                                            .then((data) => {
                                                console.log(data)
                                                window.location.reload(true)
                                            })
                                            .catch((error) => {
                                                alert("Error while deleting theme", error)
                                                window.location.reload(true)
                                            })
                                    }}
                                >Exit</button>
                                {/* <button className="primary-btn"
                                    onClick={() => {
                                        setReloadConfirm(false)
                                        sendData(e)
                                    }}
                                >Save</button> */}
                                <button className="primary-btn"
                                    onClick={(e) => {
                                        setReloadConfirm(false)
                                        sendData(e, "reload")
                                    }}
                                >Save and Exit</button>
                            </div>
                        </ModalBody>
                    </Modal>
                </div>
            </div>
        </div>

    )
}

export default CustomTemplate