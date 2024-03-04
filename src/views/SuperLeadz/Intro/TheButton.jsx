import React, { useRef, useState } from "react"
import Breadcrumb from "../../Components/BreadCrumbs/Breadcrumb"
import { ArrowLeft, ArrowRight, Edit3, Menu, PenTool, Square } from "react-feather"
import IntroWrapper from "../../Components/SuperLeadz/IntroWrapper"
import desktop from '../Customization/desktop.svg'
import mobile from '../Customization/mobile.svg'
import { ShoppingBag, Tag, Crown, Star, Gift } from "../Customization/Icons"
import { useNavigate } from "react-router-dom"
import { getCurrentOutlet } from "../../Validator"
import { SuperLeadzBaseURL } from "../../../assets/auth/jwtService"

function TheButton() {
  const navigate = useNavigate()
  // const [fontColor, setFontColor] = useState('#fff')
  // const [butttonColor, setButttonColor] = useState('#000')
  // const [textValue, setTextValue] = useState('Instant VIP Access')
  // const [buttonPosition, setButtonPosition] = useState('BL')
  // const [customText, setCustomText] = useState(false)
  // const [onLoad, setOnLoad] = useState(false)

  const [activeSect, setActiveSect] = useState("textcust")
  // const [isMobile, setIsMobile] = useState(false)

  const isMobile = false


  const mobileCondition = isMobile ? 'mobile_' : ''
  const [buttonSettings, setButtonSettings] = useState({
    buttonPosition: "BR",
    btn_backgroug_color: "#000",
    btn_font_color: "#ffffff",
    textValue: "Instant VIP Access",
    desktop_btn_view_id: 'text_&_icon',
    btn_icons: 'tag',
    mobile_desktop_btn_view_id: 'icon_only'
  })

  // const image_list = [
  //   {
  //     image: "button_middle_left.png",
  //     value: "ML"
  //   },
  //   {
  //     image: "button_bottom_left.png",
  //     value: "BL"
  //   },
  //   {
  //     image: "button_bottom_center.png",
  //     value: "BC"
  //   },
  //   {
  //     image: "button_bottom_right.png",
  //     value: "BR"
  //   },
  //   {
  //     image: "button_middle_right.png",
  //     value: "MR"
  //   }
  // ]

  // const icons = {
  //   shopping_bag: <ShoppingBag />,
  //   tag: <Tag />,
  //   crown: <Crown />,
  //   star: <Star />,
  //   gift: <Gift />
  // }

  const activeIcons = {
    shopping_bag: <ShoppingBag color={buttonSettings[`btn_font_color`]} />,
    tag: <Tag color={buttonSettings[`btn_font_color`]} />,
    crown: <Crown color={buttonSettings[`btn_font_color`]} />,
    star: <Star color={buttonSettings[`btn_font_color`]} />,
    gift: <Gift color={buttonSettings[`btn_font_color`]} />
  }


  // const selectButtonType = (e) => {
  //   setButtonType(e.target.value)
  //   setButtonSettings({ ...buttonSettings, [`${mobileCondition}${e.target.name}`]: e.target.value })
  // }

  const setMargin = (position) => {
    // `${(buttonSettings?.[`buttonPosition`]?.includes("L") && buttonSettings?.[`${mobileCondition}desktop_btn_view_id`] === "icon_only") ? buttonSettings?.[`${mobileCondition}btn_margin_left`] + "px" : "0px"}`
    if ((!buttonSettings?.[`buttonPosition`]?.includes("M")) || ((buttonSettings?.[`buttonPosition`]?.includes("M")) && (buttonSettings?.[`${mobileCondition}desktop_btn_view_id`] === "icon_only"))) {
      return `${buttonSettings?.[`${mobileCondition}btn_margin_${position}`]}px`
    } else {
      return "0px"
    }
  }

  const outletData = getCurrentOutlet()
  const btn_ref = useRef(null)

  const btn_height = btn_ref?.current?.offsetHeight


  const sendData = (e) => {
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
          navigate('/merchant/SuperLeadz/discount/')
        } else {
          alert("Button settings not saved, You can make new settings later")
          navigate('/merchant/SuperLeadz/discount/')
        }
      })
      .catch((error) => {
        console.log(error)
        alert("Button settings not saved, You can make new settings later")
        navigate('/merchant/SuperLeadz/discount/')
      })
  }

  return (

    <IntroWrapper>
      <style>
        {`.custom-height {
            overflow-y: scroll
            height: calc(45vh - ${btn_height}px)
        }`}
      </style>
      <div className="card-body w-100" style={{ position: 'relative', zIndex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'between', height: '85vh' }}>
        <div className="flex-grow-1">
          <Breadcrumb />
          <h3 style={{ marginTop: '1rem', color: "black" }}>The Button</h3>
          <p className="mb-2" style={{ color: "black" }}>
            Add a discrete button so visitors can access your promotion anytime.
            We call it the ‘Lead Hotspot’.
          </p>
          <p>*You can customize the button later</p>
          <hr />
          {/* <div className="row"> */}
          {/* <div className="col-5">
                <div className="question">
                  <div className="question-1">
                    <label style={{margin: '1rem 0px 10px 0px', fontSize: "16px"}}> <b>Button Position</b></label>
                    <div className="text-left">
                      {
                        image_list.map((curElem, i) => {
                          return (
                            <>
          
                              <input type="radio" className="offer_button_radio" checked={curElem.value === buttonPosition ? true : false } name="xircls_button_position" onChange={() => setButtonPosition(event.target.value)} id={`xircls_${curElem.value}`} defaultValue={curElem.value} />
                              <label className="xircls_offer_button_label"  htmlFor={`xircls_${curElem.value}`} id="xircls_offer_button_label_middle_left">
                                <img src={`https://api.xircls.com/static/plugin_other_images/icons/${curElem.image}`} />
                              </label>
                            </>
                          )
                        })
                      }
                    </div>
                  </div>
                  <div className="question-2">
                    <label style={{margin: '1rem 0px 10px 0px', fontSize: "16px"}}> <b>Which button suits your brand the best?</b></label>
                    <div className="options" style={{display: "flex", justifyContent: "center", alignItems: "flex-start", flexDirection: "column", gap: "6px"}}>
                      <RadioButton label="New here?" checked={textValue === 'New here?'} value="New here?" id="new_here" name="accounts" onChange={() => setTextValue(event.target.value)}/>
                      <RadioButton label="Check in!" checked={textValue === 'Check in!'} value="Check in!" id="check_in" name="accounts" onChange={() => setTextValue(event.target.value)} />
                      <RadioButton label="Reward XIRCL" checked={textValue === 'Reward XIRCL'} value="Reward XIRCL" id="reward_xircls" name="accounts" onChange={() => setTextValue(event.target.value)} />
                      <RadioButton label="Instant VIP Access" checked={textValue === 'Instant VIP Access'} value="Instant VIP Access" id="instant_vip" name="accounts" onChange={() => setTextValue(event.target.value)} />
                    </div>
                    <div className="custom_text mt-3 d-none">
                      <Checkbox
                        label="Customize Text (Maximum 18 character)"
                        checked={customText}
                        onChange={() => setCustomText(!customText)}
                      />
                      {
                        customText ? <input className="form-control" value={textValue} autoComplete="off" onChange={() => setTextValue(event.target.value)} maxLength={18} /> : ''
                      }
          
                    </div>
                  </div>
                  <div className="question-3 d-none">
                    <label style={{margin: '1rem 0px 10px 0px', fontSize: "16px"}}> <b>Choose button colour</b></label>
                    <div className="options" style={{display: "flex", justifyContent: "center", alignItems: "flex-start", flexDirection: "column", gap: "6px"}}>
                    <input
                      className="form-control"
                      value={butttonColor}
                      autoComplete="off"
                      onChange={() => setButttonColor(event.target.value)}
                    />
                    </div>
                  </div>
                  <div className="question-4 d-none">
                    <label style={{margin: '1rem 0px 10px 0px', fontSize: "16px"}}> <b>Select a colour for your icon and text</b></label>
                    <div className="options" style={{display: "flex", justifyContent: "center", alignItems: "flex-start", flexDirection: "column", gap: "6px"}}>
                    <input
                      className="form-control"
                      value={fontColor}
                      autoComplete="off"
                      onChange={() => setFontColor(event.target.value)}
                    />
                    </div>
                  </div>
          
                  <div className="my-4" style={{ background: "linear-gradient(160deg, #F1F4FF, #F9FAFF)", padding: 10, border: "2px solid #ccc" }} >
                    <label className="switch">
                      <input type="checkbox" name="display_popup_on_load" id="display_popup_on_load" checked={onLoad} onChange={() => setOnLoad(!onLoad)} value="checked" />
                      <div>
                        <span style={{ fontWeight: 400, color: "#6d6b6b" }}>
                          Display Popup On Website Load.
                        </span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              <div className='col-7'>
                <div style={{border: '1px solid #ccc', position: "relative", height: `80%`, borderRadius: `10px`, marginTop: '30px'}} >
                  <div className={`XIRCLS_${buttonPosition}`} style={{ fontFamily: "OpenSans-Bold", transition: "all 0.4s ease-in-out 0s", backgroundColor: `${butttonColor}`, display: "flex", justifyContent: "center", alignItems: "center", gap: 10, zIndex: 100001, marginBottom: 20, marginRight: 0, marginLeft: 20, borderRadius: 30, padding: 10, cursor: "pointer", border: 2 }}
                    id="xircls_display_popup"
                    onclick="Show_XIRCLS_POPUP('BL')">
                    <span id="id_xircls_btn_img" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <img id="xircls_btn_desktop_img" style={{ width: 30, verticalAlign: "inherit" }} src="https://api.xircls.com/static/images/sprite_icons/gift.svg" />
                    </span>
                    <span id="id_xircls_btn_txt" style={{ fontSize: 13, fontWeight: 400, color: `${fontColor}`, display: "flex", justifyContent: "center", alignItems: "center" }} >
                      {textValue}
                    </span>
                  </div>
                </div>
              </div> */}
          {/* <ButtonPosition isIntro={true} /> */}
          {/* </div> */}
          <div className="container-fluid">
            <div className="row match-height px-0">

              {/* Selection */}

              <div className="col-md-2 rounded-3 px-0">
                <ul className='p-0 m-0' style={{ listStyle: 'none' }}>
                  <li className={`d-flex align-items-center gap-1 visitor_select  active-${activeSect === "textcust" ? "1" : activeSect === "itcolor" ? "2" : activeSect === "position" ? "3" : "4"}`} onClick={() => setActiveSect("textcust")} style={{ cursor: "pointer", padding: "0.5rem 1rem", fontSize: "14px", color: "black", letterSpacing: "0.5px" }}><Menu size={16} /> Text Customization</li>

                  <li className={`d-flex align-items-center gap-1 visitor_select`} onClick={() => setActiveSect("itcolor")} style={{ cursor: "pointer", padding: "0.5rem 1rem", fontSize: "14px", color: "black", letterSpacing: "0.5px" }}><Edit3 size={16} /> Text/Icon Colour</li>

                  <li className="d-flex align-items-center gap-1 visitor_select" onClick={() => setActiveSect("position")} style={{ cursor: "pointer", padding: "0.5rem 1rem", fontSize: "14px", color: "black", letterSpacing: "0.5px" }}><Square size={16} /> Position</li>

                  <li className="d-flex align-items-center gap-1 visitor_select" onClick={() => setActiveSect("color")} style={{ cursor: "pointer", padding: "0.5rem 1rem", fontSize: "14px", color: "black", letterSpacing: "0.5px" }}><PenTool size={16} /> Colour</li>
                </ul>
              </div>

              {/* Customization */}
              <div className="col-md-3 custom-height scroll-custom">

                <ul className='p-0 m-0' style={{ listStyle: 'none' }}>
                  <li className="" style={{ maxHeight: activeSect === "textcust" ? "100vh" : "0vh", overflow: 'hidden', transition: '0.5s ease' }}>
                    <div style={{
                      transform: `translateX(${activeSect === 'textcust' ? '0%' : '-100%'})`,
                      opacity: `${activeSect === 'textcust' ? '1' : '0'}`,
                      transition: '0.5s ease',
                      fontSize: '85%'
                    }} className="custom_text">
                      {/* <div className="d-flex gap-2 justify-content-start align-items-center mb-2" style={{ cursor: 'pointer' }}>
                        <input type="checkbox"
                          checked={customText}
                          onChange={() => setCustomText(!customText)}
                          id="custom_text_check"
                          style={{ aspectRatio: '1', width: '15px' }} />
                        <label htmlFor="custom_text_check">Customize Text (Maximum 18 character)</label>
                      </div> */}
                      {/* {customText ? ( */}
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
                      {/* ) : (
                        ""
                      )} */}
                    </div>
                  </li>
                  <li className="" style={{ maxHeight: activeSect === "itcolor" ? "100vh" : "0vh", overflow: 'hidden', transition: '0.5s ease' }}>
                    <div style={{
                      transform: `translateX(${activeSect === 'itcolor' ? '0%' : '-100%'})`,
                      opacity: `${activeSect === 'itcolor' ? '1' : '0'}`,
                      transition: '0.5s ease'
                    }} className="d-flex align-items-center">
                      <span style={{ fontSize: '85%' }} className="w-50">Select Icon / Text Colour: </span>
                      <label title={`Icon / Text color: ${buttonSettings[`btn_font_color`]}`} htmlFor="t_i_selector" style={{ backgroundColor: buttonSettings[`btn_font_color`], cursor: 'pointer' }} className="w-50 p-1 border rounded">
                        <input value={buttonSettings[`btn_font_color`]}
                          autoComplete="off"
                          onChange={(event) => {
                            setButtonSettings({ ...buttonSettings, [`btn_font_color`]: event.target.value })
                          }} id="t_i_selector" type="color" className="d-none" />
                      </label>
                    </div>
                  </li>
                  <li className="" style={{ maxHeight: activeSect === "position" ? "100vh" : "0vh", overflow: 'hidden', transition: '0.5s ease' }}>
                    <div className="container" style={{ width: '120px', transform: `translateX(${activeSect === 'position' ? '0%' : '-100%'})`, opacity: `${activeSect === 'position' ? '1' : '0'}`, transition: '0.5s ease' }}>
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
                  </li>
                  <li className="" style={{ maxHeight: activeSect === "color" ? "100vh" : "0vh", overflow: 'hidden', transition: '0.5s ease' }}>
                    <div style={{
                      transform: `translateX(${activeSect === 'color' ? '0%' : '-100%'})`,
                      opacity: `${activeSect === 'color' ? '1' : '0'}`,
                      transition: '0.5s ease'
                    }} className="d-flex align-items-center">
                      <span style={{ fontSize: '85%' }} className="w-50">Button Colour: </span>
                      <label title={`Button color: ${buttonSettings[`btn_backgroug_color`]}`} htmlFor="button_selector" style={{ backgroundColor: buttonSettings[`btn_backgroug_color`], cursor: 'pointer' }} className="w-50 p-1 border rounded">
                        <input value={buttonSettings[`btn_backgroug_color`]}
                          autoComplete="off"
                          onChange={(event) => {
                            setButtonSettings({ ...buttonSettings, [`btn_backgroug_color`]: event.target.value })
                          }} id="button_selector" type="color" className="d-none" />
                      </label>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Preview */}

              <div className="col-md-7 rounded-3 p-1 d-flex justify-content-center align-items-center scroll-custom" style={{ maxHeight: '38.5vh', overflow: 'auto' }}>

                <div style={{ filter: "drop-shadow(0px 0px 10px rgba(0,0,0,0.15))" }} className="position-relative d-flex justify-content-center align-items-center overflow-hidden col-10 mx-auto">
                  {isMobile && <img width={'65%'} style={{ marginTop: '2.5rem', scale: '1.2' }} src={mobile} />}
                  {!isMobile && <img width={'100%'} src={desktop} />}
                  <div className="position-absolute" style={{
                    width: isMobile ? '27.5%' : `69%`,
                    aspectRatio: isMobile ? '490/1000' : '840/490'
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
                          gap: (buttonSettings[`${mobileCondition}desktop_btn_view_id`] !== 'text_&_icon' || buttonSettings[`textValue`].length === 0) ? 0 : 10,
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
                </div>
              </div>
            </div>
          </div>
        </div>

        <div ref={btn_ref} className="button_div" style={{ display: "flex", justifyContent: "space-between" }}>
          <button className="primary-btn-outline" onClick={() => navigate('/merchant/SuperLeadz/Editbutton/')}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
              <ArrowLeft size={'20px'} />
              Back
            </div>

          </button>
          <button className="primary-btn" onClick={sendData}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
              Next
              <ArrowRight size={'20px'} />
            </div>

          </button>

        </div>
      </div>
    </IntroWrapper>
  )
}

export default TheButton