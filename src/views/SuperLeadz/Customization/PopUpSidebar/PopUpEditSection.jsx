import React, { useContext } from "react"
import "./PopUpSidebar.css"
import { ThemesProvider } from "../../../../Helper/Context"


const PopUpEditSection = ({isMobile, selectedThemeNo, setIsMobile, changeThemes }) => {

  const { themes, setThemes, matchSettings, setMatchSettings } = useContext(ThemesProvider)

  // function all_border_radius(from, to) {
  //   var border_input = $(`#${from}`).val()

  //   $(`#customization .${to}`).css("border-radius", `${border_input}`)
  //   $(`#customization .show_info, #customization .xircls_categories`).css({
  //     "border-bottom-left-radius": `${border_input}`,
  //   })
  //   $(`#customization .show_info, #customization .xircls_categories`).css({
  //     "border-bottom-right-radius": `${border_input}`,
  //   })
  //   $("#customization .offer_section").css({
  //     "border-radius": `${border_input}`,
  //   })
  // }

  // function uploadImage() {
  //   var current_img = URL.createObjectURL(event.target.files[0])
  //   console.log(current_img)
  //   $(".img img").attr("src", `${current_img}`)
  // }

  // function update_color(from, to, all) {
  //   var header_val = $(`#${from}`).val()
  //   $(`#customization .${to}`).css("color", `${header_val}`)
  //   if (all == "all") {
  //     $("#customization .xircls_input").css(
  //       "background-color",
  //       `${header_val}`
  //     )
  //   }
  // }

  // function update_background_color(from, to) {
  //   var background_val = $(`#${from}`).val()
  //   console.log(background_val)

  //   if (background_val.length >= 4) {
  //     $(`#customization .${to}`).css("background-color", `${background_val}px`)
  //   } else {
  //     console.log("from:", from, "id")
  //   }
  // fff
  //   if (background_val.includes("#")) {
  //     if (background_val.length >= 4) {
  //       $(`#customization .${to}`).css("background-color", `${background_val}`)
  //     }
  //   } else {
  //     if (background_val.length >= 3) {
  //       $(`#customization .${to}`).css(
  //         "background-color",
  //         `${background_val}px`
  //       )
  //     }
  //   }
  // }

  // function update_border(from, to) {
  //   var border_input = $(`#${from}`).val()

  //   if (border_input >= 4) {
  //     $(`#customization .${to}`).css("border-radius", `${border_input}px`)
  //   } else {
  //     console.log("TO:", to, "From", from)
  //   }

  //   if (border_input.includes("px")) {
  //     $(`#customization .${to}`).css("border-radius", `${border_input}`)
  //   } else {
  //     $(`#customization .${to}`).css("border-radius", `${border_input}px`)
  //   }
  // }

  return (
    <div className="row px-2 py-2">
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
            style={{ accentColor: '#fbcd0c' }}
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
        <span className="d-flex align-items-center gap-1"><input checked={matchSettings?.background_match} style={{ msAccelerator: '#fbcd0c', backgroundColor: '#fbcd0c' }} onChange={e => {
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
        <span className="d-flex align-items-center gap-1"><input checked={!matchSettings?.background_match} style={{ msAccelerator: '#fbcd0c', backgroundColor: '#fbcd0c' }} onChange={e => {
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
          setIsMobile(!isMobile)
        }}>Change settings for {isMobile ? "Desktop" : "Mobile"}</button>
      </div>}
    </div>
  )
}

export default PopUpEditSection
