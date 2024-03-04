import React, {  useEffect, useContext } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.core.css'
import 'react-quill/dist/quill.snow.css'
import 'react-quill/dist/quill.bubble.css'
import { ThemesProvider } from '../../../../Helper/Context'

const TextEditSection = ({ isMobile, selectedThemeNo, changeThemes, setIsMobile }) => {

  const { themes, setThemes, matchSettings, setMatchSettings } = useContext(ThemesProvider)

  console.log("selectedThemeNo", selectedThemeNo, themes?.[`themeData${selectedThemeNo}`]?.[`${isMobile ? 'mobile_' : ''}header_text`])

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

  return (
    <div className='row px-2 py-2 text-section'>
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
        <label htmlFor="" className="w-100" style={{fontSize: '87.5%'}}>Header Text Colour:</label>
        <label title={themes?.[`themeData${selectedThemeNo}`]?.[`${isMobile ? 'mobile_' : ''}header_color`]} htmlFor="header_color" className="d-flex justify-content-center align-items-center rounded btn w-100 border p-1" style={{cursor: 'pointer', backgroundColor: themes?.[`themeData${selectedThemeNo}`]?.[`${isMobile ? 'mobile_' : ''}header_color`]}}>
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
        <label htmlFor="" className="w-100" style={{fontSize: '87.5%'}}>Body Text Colour:</label>
        <label title={themes?.[`themeData${selectedThemeNo}`]?.[`${isMobile ? 'mobile_' : ''}body_color`]} htmlFor="body_color" className="d-flex justify-content-center align-items-center rounded btn w-100 border p-1" style={{cursor: 'pointer', backgroundColor: themes?.[`themeData${selectedThemeNo}`]?.[`${isMobile ? 'mobile_' : ''}body_color`]}}>
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
        <span className="d-flex align-items-center gap-1"><input checked={matchSettings?.text_match} style={{ msAccelerator: '#fbcd0c', backgroundColor: '#fbcd0c' }} onChange={e => {
          setMatchSettings({ ...matchSettings, [e.target.name]: true })
        }} className="form-check-input m-0" type="radio" name="text_match" id="text_match_yes" />
          <label className="form-check-label m-0" htmlFor="text_match_yes">Yes</label></span>
        <span className="d-flex align-items-center gap-1"><input checked={!matchSettings?.text_match} style={{ msAccelerator: '#fbcd0c', backgroundColor: '#fbcd0c' }} onChange={e => {
          setMatchSettings({ ...matchSettings, [e.target.name]: false })
        }} className="form-check-input m-0" type="radio" name="text_match" id="text_match_no" />
          <label className="form-check-label m-0" htmlFor="text_match_no">No</label></span>
      </span>
      {!matchSettings?.text_match && <div>
        <button className="primary-btn mt-1" style={{ fontSize: "57.5%" }}onClick={() => {
            setIsMobile(!isMobile)
          }}>Change settings for {isMobile ? "Desktop" : "Mobile"}</button>
      </div>}
    </div>
  )
}

export default TextEditSection