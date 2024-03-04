import React, { useState } from "react"
import { ArrowLeft, ChevronDown, Edit3, Menu, Monitor, MousePointer, PenTool, Smartphone, Square, Tablet, Type, X } from "react-feather"
import { ShoppingBag, Tag, Crown, Star, Gift } from "./Icons"
// import '../../../extensions/superleadz/assets/app.css'

import desktop from './desktop.svg'
import mobile from './mobile.svg'

import { useNavigate } from 'react-router-dom'
import { Modal, ModalBody } from "reactstrap"
import { getCurrentOutlet } from "../../Validator"
import { SuperLeadzBaseURL } from "../../../assets/auth/jwtService"

const ButtonPosition = () => {
  // const { state } = useLocation()

  const navigate = useNavigate()


  const [isMobile, setIsMobile] = useState(false)

  // const [buttonType, setButtonType] = useState('text_&_icon')

  const mobileCondition = isMobile ? 'mobile_' : ''
  const outletData = getCurrentOutlet()

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

  const selectButtonType = (e) => {
    setButtonSettings({ ...buttonSettings, [`${mobileCondition}${e.target.name}`]: e.target.value })
  }

  const setMargin = (position) => {
    // `${buttonSettings?.[`buttonPosition`]?.includes("L") && buttonSettings?.[`${mobileCondition}desktop_btn_view_id`] === "icon_only" ? `${buttonSettings?.[`${mobileCondition}btn_margin_left`]}px` : "0px"}`
    if ((!buttonSettings?.[`buttonPosition`]?.includes("M")) || ((buttonSettings?.[`buttonPosition`]?.includes("M")) && (buttonSettings?.[`${mobileCondition}desktop_btn_view_id`] === "icon_only"))) {
      return `${buttonSettings?.[`${mobileCondition}btn_margin_${position}`]}px`
    } else {
      return "0px"
    }
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

  const [openSection, setButtonSection] = useState('position')

  return (

    <div className="bg-white rounded-3" style={{ boxShadow: '0 4px 24px 0 rgba(34, 41, 47, 0.1)' }}>
      <div className="p-1">
        <div className="popup-cust">
          <div className="container-fluid border px-0 rounded-3">
            {/* <div className="row align-items-center border-bottom">
              <div className="col-md-3 border-end py-2 position-relative">
                <h5 className="text-center fw-bolder m-0 text-capitalize">
                  Button Settings
                </h5>
              </div>
              <div className="col-md-9 text-end">
              </div>
            </div> */}
            <div className="row match-height px-1">
              <div className="col-md-2 px-0 border-end position-relative scroll-custom" style={{ maxHeight: '95vh', overflowY: 'scroll' }}>
                <div className="d-flex border-bottom bg-white" style={{ position: 'sticky', top: '0px', zIndex: "99999" }}>
                  <div onClick={() => setIsMobile(false)} className={`w-50 ${!isMobile && "mobile-toggle-hover"}`} ><button style={{ border: 'none', outline: 'none', boxShadow: 'none' }} className="btn border-none w-100 py-1 border-0"><Monitor size={25} /></button></div>
                  <div onClick={() => {
                    setIsMobile(true)
                    // // setButtonType(buttonType === 'text_&_icon' ? 'text_only' : buttonType)
                    setButtonSettings({ ...buttonSettings, desktop_btn_view_id: buttonSettings?.[`${mobileCondition}desktop_btn_view_id`] === 'text_&_icon' ? 'text_only' : buttonSettings?.[`${mobileCondition}desktop_btn_view_id`] })
                  }} className={`w-50 ${isMobile && "mobile-toggle-hover"} border-end`} ><button style={{ border: 'none', outline: 'none', boxShadow: 'none' }} className="btn border-none w-100 py-1 border-0"><Smartphone size={25} /></button></div>
                </div>
                <div className="questions">
                  {/* button position */}
                  <div className={`activePopEdit ${openSection === "position" && 'side-active'}`}>
                    <div onClick={() => setButtonSection(openSection === "position" ? '' : 'position')}
                      className={`p-1 border-bottom d-flex align-items-center justify-content-between`}
                      style={{ cursor: "pointer" }}>
                      <span className="d-flex align-items-center gap-2" style={{ fontSize: '90%' }}>
                        <Square size={16} /> Button Position
                      </span> <ChevronDown size={14} style={{ rotate: openSection === "position" ? '180deg' : '0deg', transition: '0.5s' }} />
                    </div>
                    <div className="border-bottom container" style={{ maxHeight: openSection === "position" ? '25vh' : '0vh', transition: '0.5s', overflow: 'hidden' }}>
                      <div style={{ transform: `translateX(${openSection === 'position' ? '0%' : '-100%'})`, opacity: `${openSection === 'position' ? '1' : '0'}`, transition: '0.5s ease' }}>
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
                  <div className={`activePopEdit ${openSection === "color" && 'side-active'}`}>
                    <div onClick={() => setButtonSection(openSection === "color" ? '' : 'color')}
                      className={`p-1 border-bottom d-flex align-items-center justify-content-between`}
                      style={{ cursor: "pointer" }}>
                      <span className="d-flex align-items-center gap-2" style={{ fontSize: '90%' }}>
                        <PenTool size={16} /> Button Color
                      </span> <ChevronDown size={14} style={{ rotate: openSection === "color" ? '180deg' : '0deg', transition: '0.5s' }} />
                    </div>
                    <div className="border-bottom" style={{ maxHeight: openSection === "color" ? '25vh' : '0vh', transition: '0.5s', overflow: 'hidden' }}>
                      <div style={{
                        transform: `translateX(${openSection === 'color' ? '0%' : '-100%'})`,
                        opacity: `${openSection === 'color' ? '1' : '0'}`,
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
                  <div className={`activePopEdit ${openSection === "type" && 'side-active'}`}>
                    <div onClick={() => setButtonSection(openSection === "type" ? '' : 'type')}
                      className={`p-1 border-bottom d-flex align-items-center justify-content-between`}
                      style={{ cursor: "pointer" }}>
                      <span className="d-flex align-items-center gap-2" style={{ fontSize: '90%' }}>
                        <Type size={16} /> Button Type
                      </span> <ChevronDown size={14} style={{ rotate: openSection === "type" ? '180deg' : '0deg', transition: '0.5s' }} />
                    </div>
                    <div className="border-bottom" style={{ maxHeight: openSection === "type" ? '25vh' : '0vh', transition: '0.5s', overflow: 'hidden' }}>
                      <div className="p-1 d-flex flex-column" style={{ transform: `translateX(${openSection === 'type' ? '0%' : '-100%'})`, opacity: `${openSection === 'type' ? '1' : '0'}`, transition: '0.5s ease' }}>
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
                  <div className={`activePopEdit ${openSection === "spacing" && 'side-active'} ${(buttonSettings?.[`buttonPosition`]?.includes("M") && buttonSettings?.[`${mobileCondition}desktop_btn_view_id`] !== 'icon_only') ? "d-none" : ""}`}>
                    <div onClick={() => setButtonSection(openSection === "spacing" ? '' : 'spacing')}
                      className={`p-1 border-bottom d-flex align-items-center justify-content-between`}
                      style={{ cursor: "pointer" }}>
                      <span className="d-flex align-items-center gap-2" style={{ fontSize: '90%' }}>
                        <ArrowLeft size={16} /> Button spacing
                      </span> <ChevronDown size={14} style={{ rotate: openSection === "spacing" ? '180deg' : '0deg', transition: '0.5s' }} />
                    </div>
                    <div className="border-bottom" style={{ maxHeight: openSection === "spacing" ? '25vh' : '0vh', transition: '0.5s', overflow: 'hidden' }}>

                      <div className="p-1 row" style={{ transform: `translateX(${openSection === 'spacing' ? '0%' : '-100%'})`, opacity: `${openSection === 'spacing' ? '1' : '0'}`, transition: '0.5s ease' }}>
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
                  <div className={`activePopEdit ${openSection === "icon" && 'side-active'} ${buttonSettings[`${isMobile ? 'mobile_' : ''}desktop_btn_view_id`] === 'text_only' ? 'd-none' : ''}`}>
                    <div onClick={() => setButtonSection(openSection === "icon" ? '' : 'icon')}
                      className={`p-1 border-bottom d-flex align-items-center justify-content-between`}
                      style={{ cursor: "pointer" }}>
                      <span className="d-flex align-items-center gap-2" style={{ fontSize: '90%' }}>
                        <MousePointer size={16} /> Select Icon
                      </span> <ChevronDown size={14} style={{ rotate: openSection === "icon" ? '180deg' : '0deg', transition: '0.5s' }} />
                    </div>
                    <div className="border-bottom" style={{ maxHeight: openSection === "icon" ? '25vh' : '0vh', transition: '0.5s', overflow: 'hidden' }}>
                      <div style={{
                        transform: `translateX(${openSection === 'icon' ? '0%' : '-100%'})`,
                        opacity: `${openSection === 'icon' ? '1' : '0'}`,
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
                  <div className={`activePopEdit ${openSection === "textcust" && 'side-active'} ${buttonSettings[`${isMobile ? 'mobile_' : ''}desktop_btn_view_id`] === 'icon_only' ? 'd-none' : ''}`}>
                    <div onClick={() => setButtonSection(openSection === "textcust" ? '' : 'textcust')}
                      className={`p-1 border-bottom d-flex align-items-center justify-content-between`}
                      style={{ cursor: "pointer" }}>
                      <span className="d-flex align-items-center gap-2" style={{ fontSize: '90%' }}>
                        <Menu size={16} /> Text Customization
                      </span> <ChevronDown size={14} style={{ rotate: openSection === "textcust" ? '180deg' : '0deg', transition: '0.5s' }} />
                    </div>
                    <div className="border-bottom" style={{ maxHeight: openSection === "textcust" ? '25vh' : '0vh', transition: '0.5s', overflow: 'hidden' }}>
                      <div style={{
                        transform: `translateX(${openSection === 'textcust' ? '0%' : '-100%'})`,
                        opacity: `${openSection === 'textcust' ? '1' : '0'}`,
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
                  <div className={`activePopEdit ${openSection === "itcolor" && 'side-active'}`}>
                    <div onClick={() => setButtonSection(openSection === "itcolor" ? '' : 'itcolor')}
                      className={`p-1 border-bottom d-flex align-items-center justify-content-between`}
                      style={{ cursor: "pointer" }}>
                      <span className="d-flex align-items-center gap-2" style={{ fontSize: '90%' }}>
                        <Edit3 size={16} /> Icon / Text Color
                      </span> <ChevronDown size={14} style={{ rotate: openSection === "itcolor" ? '180deg' : '0deg', transition: '0.5s' }} />
                    </div>
                    <div className="border-bottom" style={{ maxHeight: openSection === "itcolor" ? '25vh' : '0vh', transition: '0.5s', overflow: 'hidden' }}>
                      <div style={{
                        transform: `translateX(${openSection === 'itcolor' ? '0%' : '-100%'})`,
                        opacity: `${openSection === 'itcolor' ? '1' : '0'}`,
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
                {false && <div className="question p-1">
                  <div className="question-1 mb-3">
                    <label
                      style={{ marginBottom: "0.5rem", fontSize: "18px" }}
                    >
                      {" "}
                      Button Position
                    </label>
                    <div className="d-flex justify-content-center align-items-center">

                    </div>
                    {/* <div className="d-flex justify-content-evenly">
                      {image_list.map((curElem, i) => {
                        return (
                          <span key={i}>
                            <input
                              type="radio"
                              className="offer_button_radio"
                              checked={
                                curElem.value === buttonPosition ? true : false
                              }
                              name="xircls_button_position"
                              onChange={(event) =>
                                setButtonPosition(event.target.value)
                              }
                              id={`xircls_${curElem.value}`}
                              defaultValue={curElem.value}
                            />
                            <label
                              className="xircls_offer_button_label me-0"
                              htmlFor={`xircls_${curElem.value}`}
                              id="xircls_offer_button_label_middle_left"
                            >
                              <img
                                src={`https://api.xircls.com/static/plugin_other_images/icons/${curElem.image}`}
                              />
                            </label>
                          </span>
                        )
                      })}
                    </div> */}
                  </div>

                  <div className="question-2 mb-3">
                    <hr />
                    <label
                      style={{ marginBottom: "0.5rem", fontSize: "18px" }}
                    >
                      {" "}
                      Button type
                    </label>
                    {!isMobile && <div className="d-flex justify-content-start align-items-center"><input style={{ accentColor: '#fbcd0c' }} id="t&i_button" name="desktop_btn_view_id" checked={buttonSettings[`${mobileCondition}desktop_btn_view_id`] === 'text_&_icon'} value={'text_&_icon'} onChange={e => selectButtonType(e)} className="me-2" type="radio" /><label htmlFor="t&i_button">Text and Icon</label></div>}
                    <div className="d-flex justify-content-start align-items-center"><input style={{ accentColor: '#fbcd0c' }} id="ot_button" name="desktop_btn_view_id" checked={buttonSettings[`${mobileCondition}desktop_btn_view_id`] === 'text_only'} value={'text_only'} onChange={e => {
                      selectButtonType(e)
                    }} className="me-2" type="radio" /><label htmlFor="ot_button">Text Only</label></div>
                    <div className="d-flex justify-content-start align-items-center"><input style={{ accentColor: '#fbcd0c' }} id="oi_button" name="desktop_btn_view_id" checked={buttonSettings[`${mobileCondition}desktop_btn_view_id`] === 'icon_only'} value={'icon_only'} onChange={e => {
                      selectButtonType(e)
                    }} className="me-2" type="radio" /><label htmlFor="oi_button">Icon Only</label></div>
                  </div>

                  {buttonSettings[`${mobileCondition}desktop_btn_view_id`].includes('icon') && <div className="question-3 mb-3">
                    <hr />
                    <label
                      style={{ marginBottom: "0.5rem", fontSize: "18px" }}
                    >
                      {" "}
                      Icon
                    </label>
                    <div className="row row-cols-5 w-100 m-0 p-0">
                      {/* {icons.map((ele, i) => {
                        return (
                          <div key={i} className="col" style={{padding: '0.5rem'}} >
                            <span onClick={() => {
                              setButtonSettings({...buttonSettings, [`btn_icons`] : icons_svg[`icon${i + 1}`]})
                              setActiveIcon(`icon${i + 1}`)
                              }} className="d-flex justify-content-center align-items-center p-1" style={{backgroundColor: `rgba(44, 127, 157, ${activeIcon === `icon${i + 1}` ? '0.125' : '0'})`, outline: `3px solid ${activeIcon === `icon${i + 1}` ? '#fbcd0c' : 'gray'}`,   aspectRatio: '1', transition: '0.3s ease', cursor: 'pointer', scale: activeIcon === `icon${i + 1}` ? '1' : '0.85' }}>
                              {ele}
                            </span>
                          </div>
                        )
                      })} */}

                      {Object.entries(icons).map(([key, value], index) => {
                        return (
                          <div key={index} className="col" style={{ padding: '0.5rem' }} >
                            <span onClick={() => {
                              setButtonSettings({ ...buttonSettings, [`btn_icons`]: key })
                            }} className="d-flex justify-content-center align-items-center p-1 rounded" style={{ backgroundColor: `rgba(44, 127, 157, ${buttonSettings[`btn_icons`] === key ? '0.125' : '0'})`, outline: `3px solid ${buttonSettings[`btn_icons`] === key ? '#fbcd0c' : 'gray'}`, aspectRatio: '1', transition: '0.3s ease', cursor: 'pointer', scale: buttonSettings[`btn_icons`] === key ? '1' : '0.85' }}>
                              {value}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>}

                  <div className="question-4 mb-3">
                    <hr />
                    <label
                      style={{ marginBottom: "0.5rem", fontSize: "18px" }}
                    >
                      {" "}
                      Icon / Text color
                    </label>
                    <div
                      className="options"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        flexDirection: "column",
                        gap: "6px"
                      }}
                    >
                      <input
                        type="color"
                        className="w-100"
                        value={buttonSettings[`btn_font_color`]}
                        autoComplete="off"
                        onChange={(event) => {
                          setButtonSettings({ ...buttonSettings, [`btn_font_color`]: event.target.value })
                        }}
                      />
                    </div>
                  </div>

                  {buttonSettings[`${mobileCondition}desktop_btn_view_id`].includes('text') && <div className="question-5 mb-3">
                    <hr />
                    <label
                      style={{ marginBottom: "0.5rem", fontSize: "18px" }}
                    >
                      {" "}
                      Text
                    </label>
                    <div className="custom_text">
                      <input
                        className="form-control"
                        value={buttonSettings[`textValue`]}
                        name="textValue"
                        autoComplete="off"
                        onChange={(event) => {
                          setButtonSettings({ ...buttonSettings, [`textValue`]: event.target.value })
                        }}
                        maxLength={18}
                      />
                    </div>
                  </div>}

                  <div className="question-6 mb-3">
                    <hr />
                    <label
                      style={{ marginBottom: "0.5rem", fontSize: "18px" }}
                    >
                      {" "}
                      Button Color
                    </label>
                    <div
                      className="options"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        flexDirection: "column",
                        gap: "6px"
                      }}
                    >
                      <input
                        type="color"
                        className="w-100"
                        value={buttonSettings[`btn_backgroug_color`]}
                        autoComplete="off"
                        onChange={(event) => {
                          setButtonSettings({ ...buttonSettings, [`btn_backgroug_color`]: event.target.value })
                          setButttonColor(event.target.value)
                        }}
                      />
                    </div>
                  </div>
                </div>}
              </div>
              <div className="col-md-10 position-relative d-flex justify-content-center align-items-center overflow-hidden">
                {isMobile && <img width={'65%'} style={{ marginTop: '2.5rem', scale: '1.2', filter: "drop-shadow(0px 0px 15px rgba(0,0,0,0.25))" }} src={mobile} />}
                {!isMobile && <img width={'100%'} src={desktop} style={{ filter: "drop-shadow(0px 0px 15px rgba(0,0,0,0.25))" }} />}
                <div className="position-absolute" style={{
                  width: isMobile ? '27.5%' : `69%`,
                  aspectRatio: isMobile ? '490/1000' : '840/490',
                  top: isMobile ? '40px' : "auto"
                }}>
                  <div
                    style={{
                      position: "relative",
                      borderRadius: `10px`,
                      marginBottom: isMobile ? '27.5%' : '0px'
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
                        marginBottom: `${buttonSettings?.[`buttonPosition`]?.includes("B") ? `${buttonSettings?.[`${mobileCondition}btn_margin_bottom`]}px` : "0px"}`
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
                <div className="position-absolute d-flex justify-content-between align-items-center" style={{ width: '100%', bottom: '0px' }}>
                  {openSection !== "position" && <button onClick={(e) => {
                    openSection === "position" ? setButtonSection("color") : openSection === "color" ? setButtonSection("type") : openSection === "type" ? setButtonSection("spacing") : openSection === "spacing" ? setButtonSection("icon") : openSection === "icon" ? setButtonSection("textcust") : openSection === "textcust" ? setButtonSection("itcolor") : sendBtnData(e)
                    openSection === "itcolor" ? setButtonSection("textcust") : openSection === "textcust" ? setButtonSection("icon") : openSection === "icon" ? setButtonSection("spacing") : openSection === "spacing" ? setButtonSection("type") : openSection === "type" ? setButtonSection("color") : setButtonSection("position")
                  }} className="primary-btn-outline m-3">Back</button>}
                  <button onClick={(e) => {
                    openSection === "position" ? setButtonSection("color") : openSection === "color" ? setButtonSection("type") : openSection === "type" ? setButtonSection("spacing") : openSection === "spacing" ? setButtonSection("icon") : openSection === "icon" ? setButtonSection("textcust") : openSection === "textcust" ? setButtonSection("itcolor") : sendBtnData(e)
                  }} className="primary-btn m-3 ms-auto">{openSection === "itcolor" ? "Save settings" : "Next"}</button>
                </div>
              </div>
            </div>
          </div>
          <Modal isOpen={successModal} toggle={openSuccessModal} className='position-relative popup-cust' >
            <ModalBody>
              <span className="position-absolute p-1 top-0 end-0" style={{ cursor: 'pointer' }} onClick={openSuccessModal}>
                <X size={17.5} />
              </span>
              <p className="py-2">Settings saved succesfully! Do you want to go to Dashboard?</p>
              <div className="w-100 d-flex justify-content-end align-items-center gap-1">
                <button className="primary-btn" onClick={openSuccessModal}>Continue editing</button>
                <button className="primary-btn" onClick={() => navigate('/merchant/SuperLeadz/')}>Yes</button>
              </div>
            </ModalBody>
          </Modal>
        </div>
      </div>
    </div>
  )
}

export default ButtonPosition


// button_json = {
//   "XIRCLS_BUTTON_SETTING": {
// "BTN_POSITION": request.POST.get('buttonPosition'),
// "FULL_BTN_HTML": request.POST.get('full_btn'),
// "BTN_BG": request.POST.get('btn_backgroug_color'),
// "BTN_FONT_COLOR": request.POST.get('btn_font_color'),
// "BTN_P_RIGHT": request.POST.get('btn_p_right'),
// "BTN_P_BOTTOM": request.POST.get('btn_p_bottom'),
// "BTN_TEXT": request.POST.get('textValue'),
// },
//   "MOBILE_XIRCLS_BUTTON_SETTING": {
// "BTN_POSITION": request.POST.get('mobile_buttonPosition'),
// "FULL_BTN_HTML": request.POST.get('mobile_full_btn'),
// "BTN_BG": request.POST.get('mobile_btn_backgroug_color'),
// "BTN_FONT_COLOR": request.POST.get('mobile_btn_font_color'),
// "BTN_P_RIGHT": request.POST.get('mobile_btn_p_right'),
// "BTN_P_BOTTOM": request.POST.get('mobile_btn_p_bottom'),
// "BTN_TEXT": request.POST.get('mobile_textValue'),
// }
// }