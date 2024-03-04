import React, { useContext } from "react"
import { Edit2 } from "react-feather"
import { ThemesProvider } from "../../../../Helper/Context"

const ButtonEditSection = ({isMobile, setIsMobile, selectedThemeNo, changeThemes}) => {


  const {themes, matchSettings, setMatchSettings} = useContext(ThemesProvider)
  return (
    <div className="row px-2 py-2">
      <div className="col-12 mb-3 d-flex flex-column align-items-center gap-1">
        <label htmlFor="" className="w-100" style={{fontSize: '87.5%'}}>Colour:</label>
        <label title={themes?.[`themeData${selectedThemeNo}`]?.[`${isMobile ? 'mobile_' : ''}button_background_color`]} htmlFor="xircls_popup_button_color" className="d-flex justify-content-center align-items-center rounded btn w-100 border p-1" style={{cursor: 'pointer', backgroundColor: themes?.[`themeData${selectedThemeNo}`]?.[`${isMobile ? 'mobile_' : ''}button_background_color`]}}>
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
        <label htmlFor="button_text"  style={{fontSize: '87.5%'}}>Text:</label>
        <div className="d-flex align-items-center gap-2">
          <input
            type="text"
            style={{fontSize: '85%'}}
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
        <label htmlFor="" className="w-100" style={{fontSize: '87.5%'}}>Text Colour:</label>
        <label title={themes?.[`themeData${selectedThemeNo}`]?.[`${isMobile ? 'mobile_' : ''}button_color`]} htmlFor="xircls_popup_buttonfont_color" className="d-flex justify-content-center align-items-center rounded btn w-100 border p-1" style={{cursor: 'pointer', backgroundColor: themes?.[`themeData${selectedThemeNo}`]?.[`${isMobile ? 'mobile_' : ''}button_color`]}}>
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
        <label htmlFor="button_border"  style={{fontSize: '87.5%'}}>Border Radius:</label>
        <div className="d-flex align-items-center gap-2">
          <input
            type="range"
            className="w-100"
            style={{accentColor: '#fbcd0c'}}
            name="button_border_radius"
            id="button_border"
            value={themes?.[`themeData${selectedThemeNo}`]?.[`${isMobile ? 'mobile_' : ''}button_border_radius`]}
            max={25}
            onChange={(e) => {
              changeThemes(e)
            }}
          /><span style={{fontSize: '87.5%'}}>{themes?.[`themeData${selectedThemeNo}`]?.[`${isMobile ? 'mobile_' : ''}button_border_radius`]}px</span>
        </div>
      </div>
      <><label style={{ cursor: 'pointer', fontSize: '87.5%' }} className="w-100 d-flex justify-content-between align-items-center gap-2">
        Keep same settings for {isMobile ? "desktop theme" : "mobile theme"}
      </label>
      <span className="d-flex align-items-center gap-2">
        <span className="d-flex align-items-center gap-1"><input checked={matchSettings?.button_match} style={{ msAccelerator: '#fbcd0c', backgroundColor: '#fbcd0c' }} onChange={e => {
          setMatchSettings({ ...matchSettings, [e.target.name]: true })
        }} className="form-check-input m-0" type="radio" name="button_match" id="button_match_yes" />
          <label className="form-check-label m-0" htmlFor="button_match_yes">Yes</label></span>
        <span className="d-flex align-items-center gap-1"><input checked={!matchSettings?.button_match} style={{ msAccelerator: '#fbcd0c', backgroundColor: '#fbcd0c' }} onChange={e => {
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
  )
}

export default ButtonEditSection
