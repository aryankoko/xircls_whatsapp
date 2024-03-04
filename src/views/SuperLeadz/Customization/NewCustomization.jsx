import React, { useContext, useEffect, useState } from 'react'
import { Crosshair, Edit, Square, Smartphone, Monitor, Loader, X, Edit2, Check, Minus, MoreVertical, ArrowLeft, ChevronDown, Edit3, Menu, MousePointer, PenTool, Tablet, Type } from 'react-feather'
import { ThemesProvider } from '../../../Helper/Context'
import ReactQuill from 'react-quill'
import skeleton from "./skeleton.svg"
import Theme1 from "./Theme1"
import Theme4 from "./Theme4"
import { ShoppingBag, Tag, Crown, Star, Gift } from "./Icons"
import "./PopUpSidebar/PopUpSidebar.css"
// import { getCurrentOutlet } from '../../Validator'

const NewCustomization = () => {

    const { themes, setThemes, matchSettings, selectedThemeNo, setMatchSettings } = useContext(ThemesProvider)

    console.log(themes, setThemes, matchSettings)

    const [activeListBtn, setActiveListBtn] = useState("edit")

    const [openSection, setOpenSection] = useState("background")

    const [buttonSection, setButtonSection] = useState('position')
    // const outletData = getCurrentOutlet()
    const [isMobile, setIsMobile] = useState(false)

    const toggleMobile = () => {
        setIsMobile(!isMobile)
        // setNotification(true)
    }

    const toggleMainActive = ($) => {
        setActiveListBtn(activeListBtn === $ ? "" : $)
    }

    function changeThemes(e) {
        const maxSize = 512
        if (e.target.type === 'file') {
            if (e.target.files[0].size > (maxSize * 1024)) {
                alert(`Image size too large. The maximum size allowed is ${maxSize}kb`)
            } else {
                if (matchSettings[`${openSection}_match`]) {
                    console.log("changeThemes ifelseifif")
                    setThemes({ ...themes, [`themeData${selectedThemeNo}`]: { ...themes[`themeData${selectedThemeNo}`], [e.target.name]: e.target.files[0], [`mobile_${e.target.name}`]: e.target.files[0] } })
                } else {
                    console.log("changeThemes ifelseifelse")
                    setThemes({ ...themes, [`themeData${selectedThemeNo}`]: { ...themes[`themeData${selectedThemeNo}`], [`${isMobile ? 'mobile_' : ''}${e.target.name}`]: e.target.files[0] } })
                }
            }
        } else {
            if (matchSettings[`${openSection}_match`]) {
                console.log("changeThemes elseelseif")
                setThemes({ ...themes, [`themeData${selectedThemeNo}`]: { ...themes[`themeData${selectedThemeNo}`], [e.target.name]: e.target.value, [`mobile_${e.target.name}`]: e.target.value } })
            } else {
                console.log("changeThemes elseelseelse")
                setThemes({ ...themes, [`themeData${selectedThemeNo}`]: { ...themes[`themeData${selectedThemeNo}`], [`${isMobile ? 'mobile_' : ''}${e.target.name}`]: e.target.value } })
            }
        }
    }


    const settingImage = (image) => {
        let demo
        try {
            demo = URL.createObjectURL(image)
        } catch (error) {
            demo = image
        }
        return demo
    }

    const aspectRatio = isMobile ? "16/9" : '9/16'

    const bgImage4 = themes?.themeData4?.[`${isMobile ? 'mobile_' : ''}background_image`]

    const carouselArray = themes?.themeData4?.[`${isMobile ? 'mobile_' : ''}carousel_image`]


    const carouselImageAdd = (e) => {
        console.log(e)
        const maxSize = 512
        if (e.target.files[0].size > (maxSize * 1024)) {
            alert('Image size too large')
        } else {
            console.log("carouselImageAdd")
            setThemes({ ...themes, themeData4: { ...themes.themeData4, [`${isMobile ? 'mobile_' : ''}carousel_image`]: [...carouselArray, e.target.files[0]] } })
        }
    }

    const editCarouselImage = (e, i) => {
        const maxSize = 512
        if (e.target.files[0].size > (maxSize * 1024)) {
            alert('Image size too large')
        } else {
            const editArray = [...carouselArray]
            editArray[i] = e.target.files[0]
            console.log("editCarouselImage")
            setThemes({ ...themes, themeData4: { ...themes.themeData4, [`${isMobile ? 'mobile_' : ''}carousel_image`]: editArray } })
        }
    }

    const removeCarouselImage = (i) => {
        const editArray = [...carouselArray]
        editArray.splice(i, 1)
        console.log("removeCarouselImage")
        setThemes({ ...themes, themeData4: { ...themes.themeData4, [`${isMobile ? 'mobile_' : ''}carousel_image`]: editArray } })
    }


    function selectionDiv(id) {
        const para = document.querySelector(`${id} .ql-editor`)
        const selection = window.getSelection()
        const range = document.createRange()
        range.selectNodeContents(para)
        selection.removeAllRanges()
        selection.addRange(range)
    }

    useEffect(() => {
        const header_p = document.querySelectorAll(`#customization .header-text-sect-${selectedThemeNo} p`)
        const header_quill = document.querySelectorAll(`#headertext .header-text-sect-${selectedThemeNo} p`)
        const body_quill = document.querySelectorAll(`#bodytext .body-text-sect-${selectedThemeNo} p`)
        const body_p = document.querySelectorAll(`#customization .body-text-sect-${selectedThemeNo} p`)

        header_p.forEach((pTag) => {
            pTag.style.color = themes?.[`themeData${selectedThemeNo}`]?.[`${isMobile ? "mobile_" : ""}header_color`]
        })
        body_p.forEach((pTag) => {
            pTag.style.color = themes?.[`themeData${selectedThemeNo}`]?.[`${isMobile ? "mobile_" : ""}body_color`]
        })
        header_quill?.forEach((pTag) => {
            pTag.style.color = themes?.[`themeData${selectedThemeNo}`]?.[`${isMobile ? "mobile_" : ""}header_color`]
        })
        body_quill?.forEach((pTag) => {
            pTag.style.color = themes?.[`themeData${selectedThemeNo}`]?.[`${isMobile ? "mobile_" : ""}body_color`]
        })

    }, [themes])

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

    const mobileCondition = isMobile ? 'mobile_' : ''

    const setMargin = (position) => {
        // `${buttonSettings?.[`buttonPosition`]?.includes("L") && buttonSettings?.[`${mobileCondition}desktop_btn_view_id`] === "icon_only" ? `${buttonSettings?.[`${mobileCondition}btn_margin_left`]}px` : "0px"}`
        if ((!buttonSettings?.[`buttonPosition`]?.includes("M")) || ((buttonSettings?.[`buttonPosition`]?.includes("M")) && (buttonSettings?.[`${mobileCondition}desktop_btn_view_id`] === "icon_only"))) {
            return `${buttonSettings?.[`${mobileCondition}btn_margin_${position}`]}px`
        } else {
            return "0px"
        }
    }
    return (
        <div className="d-flex justify-content-center align-items-stretch border popup-cust" style={{ height: "calc(75vh - 2rem + 4.45rem + 1.3rem)" }}>
            {/* Sidebar */}
            <div className="nav-sidebar d-flex flex-column align-items-stretch justify-content-start border-end text-center gap-2" style={{ padding: "1rem 0.5rem", width: "65px" }}>
                <div className="d-flex flex-column align-items-center justify-content-center" style={{ gap: "0.5rem", cursor: "pointer" }} onClick={() => toggleMainActive("edit")}>
                    <button className={`btn ${activeListBtn === "edit" ? "bg-light-primary" : ""} d-flex align-items-center justify-content-center`} style={{ aspectRatio: "1", padding: "0.75rem", border: "none", outline: "none" }}>
                        <Edit size={15} />
                    </button>
                    <span style={{ fontSize: "12.5px" }} className={`${activeListBtn === "edit" ? "text-primary" : ""}`}>Theme</span>
                </div>
                <div className="d-flex flex-column align-items-center justify-content-center" style={{ gap: "0.5rem", cursor: "pointer" }} onClick={() => toggleMainActive("offer")}>
                    <button className={`btn ${activeListBtn === "offer" ? "bg-light-primary" : ""} d-flex align-items-center justify-content-center`} style={{ aspectRatio: "1", padding: "0.75rem", border: "none", outline: "none" }}>
                        <Crosshair size={15} />
                    </button>
                    <span style={{ fontSize: "12.5px" }} className={`${activeListBtn === "offer" ? "text-primary" : ""}`}>Criteria</span>
                </div>
                <div className="d-flex flex-column align-items-center justify-content-center" style={{ gap: "0.5rem", cursor: "pointer" }} onClick={() => toggleMainActive("button")}>
                    <button className={`btn ${activeListBtn === "button" ? "bg-light-primary" : ""} d-flex align-items-center justify-content-center`} style={{ aspectRatio: "1", padding: "0.75rem", border: "none", outline: "none" }}>
                        <Square size={15} />
                    </button>
                    <span style={{ fontSize: "12.5px" }} className={`${activeListBtn === "button" ? "text-primary" : ""}`}>Teaser</span>
                </div>
            </div>
            {/* Sidebar */}

            {/* Preview and Edit Section */}
            <div className="flex-grow-1 d-flex align-items-stretch">
                {/* Section Drawer */}
                <div className="toggleSection border-end d-flex flex-column align-items-stretch justify-content-start border-end" style={{ width: activeListBtn === "" ? "0px" : "200px", overflow: "hidden", transition: "0.25s ease-in-out", padding: activeListBtn === "" ? "1rem 0rem" : "1rem", opacity: activeListBtn === "" ? "0" : "1" }}>
                    {activeListBtn === "edit" && <>
                        <button className={`btn ${openSection === "background" ? "bg-light-primary" : ""}`} style={{ border: "none", outline: "none" }} onClick={() => setOpenSection("background")}>Background</button>
                        <button className={`btn ${openSection === "image" ? "bg-light-primary" : ""}`} style={{ border: "none", outline: "none" }} onClick={() => setOpenSection("image")}>Logo</button>
                        <button className={`btn ${openSection === "text" ? "bg-light-primary" : ""}`} style={{ border: "none", outline: "none" }} onClick={() => setOpenSection("text")}>Text</button>
                        <button className={`btn ${openSection === "button" ? "bg-light-primary" : ""}`} style={{ border: "none", outline: "none" }} onClick={() => setOpenSection("button")}>Button</button>
                    </>}
                    {activeListBtn === "button" && <>
                        <button className={`btn ${buttonSection === "position" ? "bg-light-primary" : ""}`} style={{ border: "none", outline: "none" }} onClick={() => setButtonSection("position")}>Position</button>
                        <button className={`btn ${buttonSection === "color" ? "bg-light-primary" : ""}`} style={{ border: "none", outline: "none" }} onClick={() => setButtonSection("color")}>Colour</button>
                        <button className={`btn ${buttonSection === "type" ? "bg-light-primary" : ""}`} style={{ border: "none", outline: "none" }} onClick={() => setButtonSection("type")}>Type</button>
                        <button className={`btn ${buttonSection === "spacing" ? "bg-light-primary" : ""}`} style={{ border: "none", outline: "none" }} onClick={() => setButtonSection("spacing")}>Spacing</button>
                        <button className={`btn ${buttonSection === "icon" ? "bg-light-primary" : ""}`} style={{ border: "none", outline: "none" }} onClick={() => setButtonSection("icon")}>Icon</button>
                        <button className={`btn ${buttonSection === "textcust" ? "bg-light-primary" : ""}`} style={{ border: "none", outline: "none" }} onClick={() => setButtonSection("textcust")}>Text Customization</button>
                        <button className={`btn ${buttonSection === "itcolor" ? "bg-light-primary" : ""}`} style={{ border: "none", outline: "none" }} onClick={() => setButtonSection("itcolor")}>Icon / Text Color</button>
                    </>}
                </div>
                {/* Section Drawer */}

                {/* Theme Preview */}
                <div className="flex-grow-1 preview-section border-end d-flex justify-content-center align-items-stretch">
                    {/* customization preview  */}
                    <div id="customization" className="w-100 d-flex justify-content-center align-items-center">
                        <div style={{ width: isMobile ? '318px' : '100%', height: isMobile ? "auto" : "100%", borderRadius: isMobile ? '1.25rem' : '0rem', overflow: 'hidden', aspectRatio: isMobile ? '9/16' : 'auto' }} className={`border mx-auto mt-${isMobile ? "2" : "0"}`}>
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
                                {activeListBtn !== "button" && <div className="w-100 h-100 d-flex justify-content-center align-items-center scroll-custom" style={{ backgroundColor: 'rgba(0,0,0,0.25)', backdropFilter: 'blur(5px)', overflow: 'hidden' }}>
                                    <div style={{ scale: isMobile ? "0.65" : "0.9" }}>
                                        {selectedThemeNo === 3 ? (<Theme1 setOpenSection={setOpenSection} isMobile={isMobile} themes={themes} showOffer={openSection === "offer"} />) : selectedThemeNo === 4 ? <Theme4 setOpenSection={setOpenSection} isMobile={isMobile} themes={themes} /> : ''
                                        }
                                    </div>
                                </div>}
                                {activeListBtn === "button" &&
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
                                    </div>}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Theme Preview */}

                {/* Edit Section */}
                <div className="edit-section" style={{ width: "200px", overflow: "hidden" }}>
                    {activeListBtn === "edit" && <>
                        <div style={{ transform: `translateX(${openSection === 'background' ? '0%' : '-100%'})`, opacity: `${openSection === 'background' ? '1' : '0'}`, transition: '0.5s ease' }} >
                            {openSection === "background" && <div className="row px-2 py-2">
                                {Number(selectedThemeNo) !== 4 &&
                                    <div className="col-12 mb-3 d-flex flex-column align-items-center gap-1">
                                        <label style={{ fontSize: '87.5%' }} htmlFor="" className="w-100">Background Colour:</label>
                                        <label title={`Background Colour: ${themes?.[`themeData${selectedThemeNo}`]?.[`${isMobile ? 'mobile_' : ''}background_color`]}`} htmlFor="xircls_popup_background_color" className="d-flex justify-content-center align-items-center rounded btn w-100 border p-1" style={{ cursor: 'pointer', backgroundColor: themes?.[`themeData${selectedThemeNo}`]?.[`${isMobile ? 'mobile_' : ''}background_color`] }}>
                                            {/* <span className="xircls_ts_black" style={{color: 'black', fontWeight: '800'}}></span> */}
                                        </label>

                                        <input
                                            type="color"
                                            value={themes?.[`themeData${selectedThemeNo}`]?.[`${isMobile ? 'mobile_' : ''}background_color`]}
                                            className="d-none"
                                            name="background_color"
                                            id="xircls_popup_background_color"
                                            onChange={(e) => {
                                                changeThemes(e)
                                            }}
                                        />
                                    </div>}
                                <div className="col-12 mb-3 d-flex flex-column align-items-center gap-1">
                                    <label style={{ fontSize: '87.5%' }} htmlFor="" className="w-100">Body Background Colour:</label>
                                    <label
                                        title={`Body Background Colour: ${themes?.[`themeData${selectedThemeNo}`]?.[`${isMobile ? 'mobile_' : ''}body_background_color`]}`} htmlFor="xircls_popup_body_background_color" className="d-flex justify-content-center align-items-center rounded btn w-100 border p-1" style={{ cursor: 'pointer', backgroundColor: themes?.[`themeData${selectedThemeNo}`]?.[`${isMobile ? 'mobile_' : ''}body_background_color`] }}>
                                        {/* <span className="xircls_ts_black" style={{color: 'black', fontWeight: '800'}}></span> */}
                                    </label>

                                    <input
                                        type="color"
                                        value={themes?.[`themeData${selectedThemeNo}`]?.[`${isMobile ? 'mobile_' : ''}body_background_color`]}
                                        className="d-none"
                                        name="body_background_color"
                                        id="xircls_popup_body_background_color"
                                        onChange={(e) => {
                                            changeThemes(e)
                                        }}
                                    />
                                </div>
                                <div className="col-12 mb-3">
                                    <label style={{ fontSize: '87.5%' }} htmlFor="xircls_border_radius">Border Radius</label>
                                    <div className="d-flex align-items-center gap-2">
                                        <input
                                            type="range"
                                            value={themes?.[`themeData${selectedThemeNo}`]?.[`${isMobile ? 'mobile_' : ''}border_radius`]}
                                            className="w-100"
                                            style={{ accentColor: '#7367f0' }}
                                            name="border_radius"
                                            id="xircls_border_radius"
                                            max={30}
                                            onChange={(e) => {
                                                // setThemes({ ...themes, [`themeData${selectedThemeNo}`]: { ...themes[`themeData${selectedThemeNo}`], [`${isMobile ? 'mobile_' : ''}border_radius`]: `${e.target.value}px` } })
                                                changeThemes(e)
                                            }
                                            }
                                        /><span style={{ fontSize: '87.5%' }}>{themes?.[`themeData${selectedThemeNo}`]?.[`${isMobile ? 'mobile_' : ''}border_radius`]}px</span>
                                    </div>
                                </div>
                                <label style={{ cursor: 'pointer', fontSize: '87.5%' }} className="w-100 d-flex justify-content-between align-items-center gap-2" htmlFor="keep_same_bg">
                                    Keep same settings for {isMobile ? "desktop theme" : "mobile theme"}
                                </label>
                                <span className="d-flex align-items-center gap-2">
                                    <span className="d-flex align-items-center gap-1"><input checked={matchSettings?.background_match} style={{ msAccelerator: '#7367f0', backgroundColor: '#7367f0' }} onChange={e => {
                                        setMatchSettings({ ...matchSettings, [e.target.name]: true })
                                        if (e.target.checked) {
                                            const newObj = { ...themes?.[`themeData${selectedThemeNo}`] }
                                            if (isMobile) {
                                                console.log("onChange PopUpEditSection if")
                                                setThemes({ ...themes, [`themeData${selectedThemeNo}`]: { ...themes[`themeData${selectedThemeNo}`], background_color: newObj.mobile_background_color, body_background_color: newObj.mobile_body_background_color, border_radius: newObj.mobile_border_radius } })
                                            } else {
                                                console.log("onChange PopUpEditSection else")
                                                setThemes({ ...themes, [`themeData${selectedThemeNo}`]: { ...themes[`themeData${selectedThemeNo}`], mobile_background_color: newObj.background_color, mobile_body_background_color: newObj.body_background_color, mobile_border_radius: newObj.border_radius } })
                                            }
                                        }
                                    }} className="form-check-input m-0" type="radio" name="background_match" id="background_match_yes" />
                                        <label className="form-check-label m-0" htmlFor="background_match_yes">Yes</label></span>
                                    <span className="d-flex align-items-center gap-1"><input checked={!matchSettings?.background_match} style={{ msAccelerator: '#7367f0', backgroundColor: '#7367f0' }} onChange={e => {
                                        setMatchSettings({ ...matchSettings, [e.target.name]: false })
                                    }} className="form-check-input m-0" type="radio" name="background_match" id="background_match_no" />
                                        <label className="form-check-label m-0" htmlFor="background_match_no">No</label></span>
                                </span>
                                {/* <div className="col-12 mb-3">
        <label htmlFor="xircls_body_border_radius">Body Border Radius</label>
        <input
          type="text"
          value={borderBodyRadius}
          className="form-control"
          name="xircls_body_border_radius"
          id="xircls_body_border_radius"
          // defaultValue={customData?.XIRCLS_THEME.BORDER_RADIUS}
          onChange={(e) => {
            all_border_radius("xircls_body_border_radius", "body_border")
            setBorderBodyRadius(e.target.value)
          }}
        />
      </div> */}
                                {!matchSettings?.background_match && <div>
                                    <button className="primary-btn mt-1" style={{ fontSize: "57.5%" }} onClick={() => {
                                        toggleMobile()
                                    }}>Change settings for {isMobile ? "Desktop" : "Mobile"}</button>
                                </div>}
                            </div>}
                        </div>
                        <div style={{ transform: `translateX(${openSection === 'image' ? '0%' : '-100%'})`, opacity: `${openSection === 'image' ? '1' : '0'}`, transition: '0.5s ease' }} >
                            {openSection === "image" && <div className="row px-2 py-2">
                                {Number(selectedThemeNo) !== 4 && <div className="col-9 mb-2">
                                    <label className="mb-2" style={{ fontSize: '87.5%' }}>Logo: <small>(make sure the aspect ratio of your logo is 1:1)</small></label>
                                    <label htmlFor="theme3Img" style={{ backgroundColor: '#ccc', border: '2px dashed gray', cursor: 'pointer', display: 'block', aspectRatio: '1', margin: 'auto' }} className="w-50">
                                        <img src={settingImage(themes?.themeData3?.[`${isMobile ? 'mobile_' : ''}image`])} alt="" style={{ aspectRatio: '1', objectFit: 'cover' }} className="w-100 d-block m-auto" />
                                    </label>
                                    <div className="d-flex gap-2 align-items-center">
                                        <input
                                            type="file"
                                            accept="image/png, image/jpeg, image/svg, image/jpg"
                                            className="d-none"
                                            name="image"
                                            id="theme3Img"
                                            onChange={(e) => {
                                                console.log(e.target.files[0])
                                                setHeaderImage(e.target.files[0])
                                                changeThemes(e)
                                                setIsImage(1)
                                            }}
                                        />
                                    </div>
                                </div>}
                                {Number(selectedThemeNo) === 4 &&
                                    <div className="col-12 mb-2">
                                        <div className="mb-2">
                                            <label style={{ fontSize: '87.5%' }}>Background Image: </label>
                                            <p className="text-secondary" style={{ fontSize: "75%" }}>
                                                (the aspect ratio of your image must be {isMobile ? "4:3" : '3:4'})
                                            </p>
                                            <div className="d-flex gap-2 align-items-center row px-1">
                                                <div className={`col-md-${isMobile ? "12" : "6"} px-1 mb-2 position-relative`}>
                                                    {/* {themes.themeData4[`${isMobile ? "mobile_" : ""}background_image`] !== "" && } */}
                                                    {themes.themeData4[`${isMobile ? "mobile_" : ""}background_image`] !== "" ? <label style={{ opacity: '0.75', cursor: 'pointer', aspectRatio, border: '2px dashed gray' }} className={`w-100 position-relative image-label`} htmlFor={`image-input-bg`}><span className="delete-image p-0 btn btn-danger d-flex justify-content-center align-items-center" style={{ width: '20px', aspectRatio: '1', position: 'absolute', top: '-10px', right: '-10px', borderRadius: '50px', zIndex: '9999' }} onClick={() => {
                                                        setThemes({ ...themes, themeData4: { ...themes.themeData4, [`${isMobile ? "mobile_" : ""}background_image`]: "" } })
                                                    }}><X color="white" size={10} /></span>
                                                        <input onChange={(e) => {
                                                            changeThemes(e)
                                                        }}
                                                            name={`background_image`} type="file"
                                                            accept="image/png, image/jpeg, image/svg, image/jpg" id={`image-input-bg`} className="d-none" />
                                                        <img src={settingImage(bgImage4)} className="w-100 h-100" alt="" />
                                                        <div className="position-absolute w-100 h-100 top-0 left-0 d-flex justify-content-center align-items-center hidden-edit" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                                                            <Edit2 size={20} color="white" />
                                                        </div>
                                                    </label> : <label style={{ cursor: 'pointer', aspectRatio, border: '2px dashed gray' }} className="w-100 d-flex justify-content-center align-items-center" htmlFor={`image-input-bg`}>
                                                        <input onChange={(e) => {
                                                            changeThemes(e)
                                                        }}
                                                            name={`background_image`} type="file"
                                                            accept="image/png, image/jpeg, image/svg, image/jpg" id={`image-input-bg`} className="d-none" />
                                                        {/* <img src={settingImage(bgImage4)} className="w-100 h-100" alt="" /> */}
                                                        <PlusCircle color="gray" />
                                                    </label>}
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div>
                                            <label className="mt-1" style={{ fontSize: '87.5%' }}>Carousel Image(s): </label>
                                            <p className="text-secondary" style={{ fontSize: "75%" }}>
                                                (the aspect ratio of your image must be {isMobile ? "4:3" : '3:4'})
                                            </p>
                                            <div className="row w-100 mx-0 px-0">
                                                {carouselArray?.map((image, index) => {
                                                    return (
                                                        <div key={index} className={`col-md-${isMobile ? "12" : "6"} px-1 mb-2 position-relative`}>
                                                            <span className="delete-image p-0 btn btn-danger d-flex justify-content-center align-items-center" style={{ width: '20px', aspectRatio: '1', position: 'absolute', top: '-10px', right: '5px', borderRadius: '50px', zIndex: '9999' }} onClick={() => removeCarouselImage(index)}><X color="white" size={10} /></span>
                                                            <label style={{ border: '2px dashed gray', opacity: '0.75', cursor: 'pointer', aspectRatio }} className="w-100 position-relative overflow-hidden image-label" htmlFor={`image-input-${index}`}>
                                                                <input onChange={(e) => editCarouselImage(e, index)} type="file"
                                                                    accept="image/png, image/jpeg, image/svg, image/jpg" id={`image-input-${index}`} className="d-none" />
                                                                <img src={settingImage(image)} className="w-100 h-100" alt="" />
                                                                <div className="position-absolute w-100 h-100 top-0 left-0 d-flex justify-content-center align-items-center hidden-edit" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                                                                    <Edit2 size={20} color="white" />
                                                                </div>
                                                            </label>
                                                        </div>
                                                    )
                                                })}
                                                {carouselArray?.length < 6 && <div className={`col-md-${isMobile ? "12" : "6"} mb-2 position-relative`}>
                                                    <label style={{ border: '2px dashed gray', cursor: 'pointer', aspectRatio }} className="w-100 d-flex justify-content-center align-items-center" htmlFor={`add-image-input`}>
                                                        <input onChange={carouselImageAdd} type="file"
                                                            accept="image/png, image/jpeg, image/svg, image/jpg" id={`add-image-input`} className="d-none" />
                                                        <PlusCircle color="gray" />
                                                    </label>
                                                </div>}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="my-1" style={{ fontSize: '87.5%' }}>Image changes after:</label>
                                            <div className="d-flex alignitems-center gap-2">
                                                <input min={1} max={10} className="w-75" type="range" style={{ accentColor: '#7367f0' }} name="carousel_interval" value={themes.themeData4?.[`${isMobile ? 'mobile_' : ''}carousel_interval`]} onChange={e => {
                                                    changeThemes(e, 'value')
                                                }} /><span className="w-25 text-end">{themes.themeData4?.[`${isMobile ? 'mobile_' : ''}carousel_interval`]} s</span>
                                            </div>
                                        </div>
                                    </div>}
                                {selectedThemeNo !== 4 && <><label style={{ cursor: 'pointer', fontSize: '87.5%' }} className="w-100 d-flex justify-content-between align-items-center gap-2">
                                    Keep same settings for {isMobile ? "desktop theme" : "mobile theme"}
                                </label>
                                    <span className="d-flex align-items-center gap-2">
                                        <span className="d-flex align-items-center gap-1"><input checked={matchSettings?.image_match} style={{ msAccelerator: '#7367f0', backgroundColor: '#7367f0' }} onChange={e => {
                                            setMatchSettings({ ...matchSettings, [e.target.name]: true })
                                        }} className="form-check-input m-0" type="radio" name="image_match" id="image_match_yes" />
                                            <label className="form-check-label m-0" htmlFor="image_match_yes">Yes</label></span>
                                        <span className="d-flex align-items-center gap-1"><input checked={!matchSettings?.image_match} style={{ msAccelerator: '#7367f0', backgroundColor: '#7367f0' }} onChange={e => {
                                            setMatchSettings({ ...matchSettings, [e.target.name]: false })
                                        }} className="form-check-input m-0" type="radio" name="image_match" id="image_match_no" />
                                            <label className="form-check-label m-0" htmlFor="image_match_no">No</label></span>
                                    </span>
                                    {!matchSettings?.image_match && <div>
                                        <button className="primary-btn mt-1" style={{ fontSize: "57.5%" }} onClick={() => {
                                            setIsMobile(!isMobile)
                                        }}>Change settings for {isMobile ? "Desktop" : "Mobile"}</button>
                                    </div>}
                                </>
                                }
                                {selectedThemeNo === 4 &&
                                    <div className="d-flex justify-content-start">
                                        <button className="primary-btn mt-1" style={{ fontSize: "57.5%" }} onClick={toggleMobile}>
                                            Change Images for {isMobile ? "Desktop" : "Mobile"}
                                        </button>
                                    </div>
                                }
                            </div>}
                        </div>
                        <div style={{ transform: `translateX(${openSection === 'text' ? '0%' : '-100%'})`, opacity: `${openSection === 'text' ? '1' : '0'}`, transition: '0.5s ease' }} >
                            {openSection === "text" && <div className='row px-2 py-2 text-section'>
                                <div className="col-12 mb-3">
                                    <label style={{ fontSize: '87.5%' }} htmlFor="xircls_header_color">Header Text: </label>
                                    <ReactQuill
                                        style={{ fontSize: '87.5%' }}
                                        theme='bubble'
                                        id='headertext'
                                        className='bg-white border rounded'
                                        placeholder='Type here'
                                        value={themes?.[`themeData${selectedThemeNo}`]?.[`${isMobile ? 'mobile_' : ''}header_text`]}
                                        onFocus={() => {
                                            selectionDiv("#headertext")
                                        }}
                                        onChange={(content) => {

                                            if (content !== themes[`themeData${selectedThemeNo}`][`${isMobile ? "mobile_" : ""}header_text`]) {
                                                if (matchSettings.text_match) {
                                                    console.log("quill header if")
                                                    setThemes({ ...themes, [`themeData${selectedThemeNo}`]: { ...themes[`themeData${selectedThemeNo}`], header_text: content, mobile_header_text: content } })
                                                } else {
                                                    console.log("quill header else")
                                                    setThemes({ ...themes, [`themeData${selectedThemeNo}`]: { ...themes[`themeData${selectedThemeNo}`], [`${isMobile ? 'mobile_' : ''}header_text`]: content } })
                                                }
                                            }
                                        }}
                                        modules={{
                                            toolbar: [
                                                ['bold', 'italic', 'underline'],
                                                ['link']
                                            ]
                                        }}
                                        formats={['bold', 'italic', 'underline', 'link']}
                                    />
                                </div>
                                <div className="col-12 mb-3 d-flex flex-column align-items-center gap-1">
                                    <label htmlFor="" className="w-100" style={{ fontSize: '87.5%' }}>Header Text Colour:</label>
                                    <label title={themes?.[`themeData${selectedThemeNo}`]?.[`${isMobile ? 'mobile_' : ''}header_color`]} htmlFor="header_color" className="d-flex justify-content-center align-items-center rounded btn w-100 border p-1" style={{ cursor: 'pointer', backgroundColor: themes?.[`themeData${selectedThemeNo}`]?.[`${isMobile ? 'mobile_' : ''}header_color`] }}>
                                    </label>
                                    <input
                                        type="color"
                                        className="d-none"
                                        name="header_color"
                                        id="header_color"
                                        value={themes?.[`themeData${selectedThemeNo}`]?.[`${isMobile ? 'mobile_' : ''}header_color`]}
                                        onChange={(e) => {
                                            changeThemes(e)
                                            const text = document.querySelectorAll("#headertext > .ql-container > .ql-editor > p")
                                            text.forEach((ele) => {
                                                ele.style.color = e.target.value
                                            })
                                        }}
                                    />
                                </div>
                                <div className="col-12 mb-3">
                                    <label style={{ fontSize: '87.5%' }} htmlFor="xircls_header_color">Body Text: </label>
                                    <ReactQuill
                                        style={{ fontSize: '87.5%', color: themes?.[`themeData${selectedThemeNo}`]?.[`${isMobile ? 'mobile_' : ''}body_color`] }}
                                        theme='bubble'
                                        className='border rounded bg-white'
                                        id='bodytext'
                                        placeholder='Type here'
                                        value={themes?.[`themeData${selectedThemeNo}`]?.[`${isMobile ? 'mobile_' : ''}body_text`]}
                                        onFocus={() => {
                                            selectionDiv("#bodytext")
                                        }}
                                        onChange={(content) => {

                                            if (content !== themes[`themeData${selectedThemeNo}`].body_text) {
                                                if (matchSettings.text_match) {
                                                    console.log("quill header if")
                                                    setThemes({ ...themes, [`themeData${selectedThemeNo}`]: { ...themes[`themeData${selectedThemeNo}`], body_text: content, mobile_body_text: content } })
                                                } else {
                                                    console.log("quill header else")
                                                    setThemes({ ...themes, [`themeData${selectedThemeNo}`]: { ...themes[`themeData${selectedThemeNo}`], [`${isMobile ? 'mobile_' : ''}body_text`]: content } })
                                                }
                                            }
                                        }}
                                        modules={{
                                            toolbar: [
                                                ['bold', 'italic', 'underline'],
                                                ['link']
                                            ]
                                        }}
                                        formats={['bold', 'italic', 'underline', 'link']}
                                    />
                                </div>
                                <div className="col-12 mb-3 d-flex flex-column align-items-center gap-1">
                                    <label htmlFor="" className="w-100" style={{ fontSize: '87.5%' }}>Body Text Colour:</label>
                                    <label title={themes?.[`themeData${selectedThemeNo}`]?.[`${isMobile ? 'mobile_' : ''}body_color`]} htmlFor="body_color" className="d-flex justify-content-center align-items-center rounded btn w-100 border p-1" style={{ cursor: 'pointer', backgroundColor: themes?.[`themeData${selectedThemeNo}`]?.[`${isMobile ? 'mobile_' : ''}body_color`] }}>
                                    </label>
                                    <input
                                        type="color"
                                        className="d-none"
                                        name="body_color"
                                        id="body_color"
                                        value={themes?.[`themeData${selectedThemeNo}`]?.[`${isMobile ? 'mobile_' : ''}body_color`]}
                                        onChange={(e) => {
                                            changeThemes(e)
                                            const text = document.querySelectorAll("#bodytext > .ql-container > .ql-editor > p")
                                            text.forEach((ele) => {
                                                ele.style.color = e.target.value
                                            })
                                        }}
                                    />
                                </div>
                                {selectedThemeNo === 4 && <div className="col-12 mb-5">
                                    <label style={{ fontSize: '87.5%' }} htmlFor="xircls_header_color">T&C Text: </label>
                                    <ReactQuill
                                        className='border bg-white rounded'
                                        style={{ fontSize: '87.5%', overflow: 'visible', zIndex: '99999999999999999999999999' }}
                                        theme='bubble'
                                        id='message'
                                        placeholder='Type here'
                                        value={themes?.[`themeData${selectedThemeNo}`]?.[`${isMobile ? 'mobile_' : ''}tnc_text`]}
                                        onFocus={() => {
                                            selectionDiv("#message")
                                        }}
                                        onChange={(content) => {

                                            if (content !== themes[`themeData${selectedThemeNo}`].tnc_text) {
                                                if (matchSettings.text_match) {
                                                    console.log("quill header if")
                                                    setThemes({ ...themes, [`themeData${selectedThemeNo}`]: { ...themes[`themeData${selectedThemeNo}`], tnc_text: content, mobile_tnc_text: content } })
                                                } else {
                                                    console.log("quill header else")
                                                    setThemes({ ...themes, [`themeData${selectedThemeNo}`]: { ...themes[`themeData${selectedThemeNo}`], [`${isMobile ? 'mobile_' : ''}tnc_text`]: content } })
                                                }
                                            }
                                        }}
                                        modules={{
                                            toolbar: [
                                                [{ color: [] }],
                                                ['link']
                                            ]
                                        }}
                                        formats={['color', 'link']}
                                    />
                                </div>}

                                <label style={{ cursor: 'pointer', fontSize: '87.5%' }} className="w-100 d-flex justify-content-between align-items-center gap-2">
                                    Keep same settings for {isMobile ? "desktop theme" : "mobile theme"}
                                </label>
                                <span className="d-flex align-items-center gap-2">
                                    <span className="d-flex align-items-center gap-1"><input checked={matchSettings?.text_match} style={{ msAccelerator: '#7367f0', backgroundColor: '#7367f0' }} onChange={e => {
                                        setMatchSettings({ ...matchSettings, [e.target.name]: true })
                                    }} className="form-check-input m-0" type="radio" name="text_match" id="text_match_yes" />
                                        <label className="form-check-label m-0" htmlFor="text_match_yes">Yes</label></span>
                                    <span className="d-flex align-items-center gap-1"><input checked={!matchSettings?.text_match} style={{ msAccelerator: '#7367f0', backgroundColor: '#7367f0' }} onChange={e => {
                                        setMatchSettings({ ...matchSettings, [e.target.name]: false })
                                    }} className="form-check-input m-0" type="radio" name="text_match" id="text_match_no" />
                                        <label className="form-check-label m-0" htmlFor="text_match_no">No</label></span>
                                </span>
                                {!matchSettings?.text_match && <div>
                                    <button className="primary-btn mt-1" style={{ fontSize: "57.5%" }} onClick={() => {
                                        setIsMobile(!isMobile)
                                    }}>Change settings for {isMobile ? "Desktop" : "Mobile"}</button>
                                </div>}
                            </div>}
                        </div>
                        <div style={{ transform: `translateX(${openSection === 'button' ? '0%' : '-100%'})`, opacity: `${openSection === 'button' ? '1' : '0'}`, transition: '0.5s ease' }} >
                            <div className="row px-2 py-2">
                                <div className="col-12 mb-3 d-flex flex-column align-items-center gap-1">
                                    <label htmlFor="" className="w-100" style={{ fontSize: '87.5%' }}>Colour:</label>
                                    <label title={themes?.[`themeData${selectedThemeNo}`]?.[`${isMobile ? 'mobile_' : ''}button_background_color`]} htmlFor="xircls_popup_button_color" className="d-flex justify-content-center align-items-center rounded btn w-100 border p-1" style={{ cursor: 'pointer', backgroundColor: themes?.[`themeData${selectedThemeNo}`]?.[`${isMobile ? 'mobile_' : ''}button_background_color`] }}>
                                        {/* <span className="xircls_ts_black" style={{color: 'black'}}></span> */}
                                    </label>

                                    <input
                                        type="color"
                                        value={themes?.[`themeData${selectedThemeNo}`]?.[`${isMobile ? 'mobile_' : ''}button_background_color`]}
                                        className="d-none"
                                        name="button_background_color"
                                        id="xircls_popup_button_color"
                                        onChange={(e) => {
                                            changeThemes(e)
                                        }}
                                    />
                                </div>
                                <div className="col-12 mb-3">
                                    <label htmlFor="button_text" style={{ fontSize: '87.5%' }}>Text:</label>
                                    <div className="d-flex align-items-center gap-2">
                                        <input
                                            type="text"
                                            style={{ fontSize: '85%' }}
                                            className="form-control"
                                            name="button_text"
                                            id="button_text"
                                            value={themes?.[`themeData${selectedThemeNo}`]?.[`${isMobile ? 'mobile_' : ''}button_text`]}
                                            max={25}
                                            onChange={(e) => {
                                                changeThemes(e)
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="col-12 mb-3 d-flex flex-column align-items-center gap-1">
                                    <label htmlFor="" className="w-100" style={{ fontSize: '87.5%' }}>Text Colour:</label>
                                    <label title={themes?.[`themeData${selectedThemeNo}`]?.[`${isMobile ? 'mobile_' : ''}button_color`]} htmlFor="xircls_popup_buttonfont_color" className="d-flex justify-content-center align-items-center rounded btn w-100 border p-1" style={{ cursor: 'pointer', backgroundColor: themes?.[`themeData${selectedThemeNo}`]?.[`${isMobile ? 'mobile_' : ''}button_color`] }}>
                                        {/* <span className="xircls_ts_black" style={{color: 'black'}}></span> */}
                                    </label>
                                    <input
                                        type="color"
                                        className="d-none"
                                        name="button_color"
                                        id="xircls_popup_buttonfont_color"
                                        value={themes?.[`themeData${selectedThemeNo}`]?.[`${isMobile ? 'mobile_' : ''}button_color`]}
                                        onChange={(e) => {
                                            changeThemes(e)
                                        }}
                                    />
                                </div>
                                <div className="col-12 mb-3">
                                    <label htmlFor="button_border" style={{ fontSize: '87.5%' }}>Border Radius:</label>
                                    <div className="d-flex align-items-center gap-2">
                                        <input
                                            type="range"
                                            className="w-100"
                                            style={{ accentColor: '#7367f0' }}
                                            name="button_border_radius"
                                            id="button_border"
                                            value={themes?.[`themeData${selectedThemeNo}`]?.[`${isMobile ? 'mobile_' : ''}button_border_radius`]}
                                            max={25}
                                            onChange={(e) => {
                                                changeThemes(e)
                                            }}
                                        /><span style={{ fontSize: '87.5%' }}>{themes?.[`themeData${selectedThemeNo}`]?.[`${isMobile ? 'mobile_' : ''}button_border_radius`]}px</span>
                                    </div>
                                </div>
                                <><label style={{ cursor: 'pointer', fontSize: '87.5%' }} className="w-100 d-flex justify-content-between align-items-center gap-2">
                                    Keep same settings for {isMobile ? "desktop theme" : "mobile theme"}
                                </label>
                                    <span className="d-flex align-items-center gap-2">
                                        <span className="d-flex align-items-center gap-1"><input checked={matchSettings?.button_match} style={{ msAccelerator: '#7367f0', backgroundColor: '#7367f0' }} onChange={e => {
                                            setMatchSettings({ ...matchSettings, [e.target.name]: true })
                                        }} className="form-check-input m-0" type="radio" name="button_match" id="button_match_yes" />
                                            <label className="form-check-label m-0" htmlFor="button_match_yes">Yes</label></span>
                                        <span className="d-flex align-items-center gap-1"><input checked={!matchSettings?.button_match} style={{ msAccelerator: '#7367f0', backgroundColor: '#7367f0' }} onChange={e => {
                                            setMatchSettings({ ...matchSettings, [e.target.name]: false })
                                        }} className="form-check-input m-0" type="radio" name="button_match" id="button_match_no" />
                                            <label className="form-check-label m-0" htmlFor="button_match_no">No</label></span>
                                    </span></>
                                {!matchSettings?.button_match && <div>
                                    <button className="primary-btn mt-1" style={{ fontSize: "57.5%" }} onClick={() => {
                                        setIsMobile(!isMobile)
                                    }}>Change settings for {isMobile ? "Desktop" : "Mobile"}</button>
                                </div>}
                            </div>
                        </div>
                    </>}
                    {activeListBtn === "button" && <div className="questions">
                        {/* button position */}

                        {buttonSection === "position" && <div style={{ transition: '0.5s', overflow: 'hidden' }}>
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
                        </div>}

                        {/* button background color */}

                        {buttonSection === "color" && <div style={{ transition: '0.5s', overflow: 'hidden' }}>
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
                        </div>}

                        {/* button type */}

                        {buttonSection === "type" && <div style={{ transition: '0.5s', overflow: 'hidden' }}>
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
                        </div>}

                        {/* button spacing */}

                        {buttonSection === "spacing" && <div style={{ transition: '0.5s', overflow: 'hidden' }}>

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
                                            style={{ accentColor: '#7367f0' }}
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
                                        }} id="mr-input" className="w-100" style={{ accentColor: '#7367f0' }} min={0} max={100} type="range" name="btn_margin_right" /> <p className="m-0" style={{ fontSize: '87.5%' }}>{buttonSettings?.[`${mobileCondition}btn_margin_right`]}px</p>
                                    </div>
                                </div>}
                                {buttonSettings?.[`buttonPosition`]?.includes('B') && <div className="col-12 mb-3">
                                    <label style={{ fontSize: '87.5%' }} htmlFor="ml-input">Margin Bottom</label>
                                    <div className="d-flex align-items-center gap-1">
                                        <input value={buttonSettings?.[`${isMobile ? "mobile_" : ""}btn_margin_bottom`]} onChange={e => {
                                            setButtonSettings({ ...buttonSettings, [`${mobileCondition}btn_margin_bottom`]: e.target.value })
                                        }} id="mb-input" className="w-100" style={{ accentColor: '#7367f0' }} min={0} max={100} type="range" name="btn_margin_bottom" /> <p className="m-0" style={{ fontSize: '87.5%' }}>{buttonSettings?.[`${mobileCondition}btn_margin_bottom`]}px</p>
                                    </div>
                                </div>}
                            </div>
                        </div>}

                        {buttonSection === "icon" && <div style={{ transition: '0.5s', overflow: 'hidden' }}>
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
                                            }} className="d-flex justify-content-center align-items-center rounded" style={{ padding: "0.25rem", backgroundColor: `rgba(255, 239, 106, ${buttonSettings[`btn_icons`] === key ? '0.125' : '0'})`, outline: `3px solid ${buttonSettings[`btn_icons`] === key ? '#7367f0' : 'gray'}`, aspectRatio: '1', transition: '0.3s ease', cursor: 'pointer', scale: buttonSettings[`btn_icons`] === key ? '1' : '0.85', width: '100%', maxWidth: '35px' }}>
                                                {value}
                                            </span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>}

                        {buttonSection === "textcust" && <div style={{ transition: '0.5s', overflow: 'hidden' }}>
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
                        </div>}

                        {buttonSection === "itcolor" && <div style={{ transition: '0.5s', overflow: 'hidden' }}>
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
                        </div>}
                    </div>}
                </div>
                {/* Edit Section */}
            </div>
            {/* Preview and Edit Section */}
        </div>
    )
}

export default NewCustomization