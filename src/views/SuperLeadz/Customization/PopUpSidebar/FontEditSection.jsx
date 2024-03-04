import React from "react"
import $ from "jquery"

const FontEditSection = (props) => {
  const {  changeValue, headerColor, setHeaderColor, bodyColor, setBodyColor } = props
  function update_color(from, to, all) {
    const header_val = $(`#${from}`).val()
    $(`#customization .${to}`).css("color", `${header_val}`)
    if (all === "all") {
      $("#customization .xircls_input").css(
        "background-color",
        `${header_val}`
      )
    }
  }
  return (
    <div className="row px-2 py-2">
      <div className="col-12 mb-3">
        <label for="xircls_header_color">Headline Color: </label>
        <input
          type="text"
          className="form-control"
          name="header_color"
          id="xircls_header_color"
          value={headerColor}
          onChange={(e) => {
            update_color("xircls_header_color", "header_style")
            setHeaderColor(e.target.value)
            changeValue(e, 'value')
          }}
        />
      </div>
      <div className="col-12 mb-3">
        <label htmlFor="xircls_body_color">Font Color:</label>
        <input
          type="text"
          value={bodyColor}
          className="form-control"
          name="body_color"
          id="xircls_body_color"
          onChange={(e) => {
            update_color("xircls_body_color", "xircls_preview_body", "all")
            setBodyColor(e.target.value)
            changeValue(e, 'value')
          }}
        />
      </div>
    </div>
  )
}

export default FontEditSection
