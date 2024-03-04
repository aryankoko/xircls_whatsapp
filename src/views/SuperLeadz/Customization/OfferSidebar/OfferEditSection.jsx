import React from "react"
const OfferEditSection = () => {

  // function update_background_color(from, to) {
  //   var background_val = $(`#${from}`).val()
  //   console.log(background_val)

  //   if (background_val.length >= 4) {
  //     $(`#customization .${to}`).css("background-color", `${background_val}px`)
  //   } else {
  //     console.log("from:", from, "id")
  //   }

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

  // function update_color(from, to, all) {
  //   var header_val = $(`#${from}`).val()
  //   $(`#customization .${to}`).css("color", `${header_val}`)
  //   $(`#customization .${to}`).attr("fill", `${header_val}`)
  //   if (all == "all") {
  //     $("#customization .xircls_input").css(
  //       "background-color",
  //       `${header_val}`
  //     )
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
    <div className="row px-2 p-1">
      <div className="col-12 mb-3">
        <label htmlFor="xircls_coupon_background_color">
          Coupon Background Colour:
        </label>
        <input
          type="text"
          className="form-control"
          // value={offerBg}
          name="xircls_coupon_background_color"
          id="xircls_coupon_background_color"
          // onInput={(e) => {
          //   setOfferBg(e.target.value)
          //   changeValue(e, 'value')
          // }}
        />
      </div>
      <div className="col-12 mb-3">
        <label htmlFor="xircls_coupon_font_color">Coupon Text Colour:</label>
        <input
          type="text"
          className="form-control"
          // value={offerText}
          name="xircls_coupon_font_color"
          id="xircls_coupon_font_color"
          // onInput={(e) => {
          //   setOfferText(e.target.value)
          //   changeValue(e, 'value')
          // }}
        />
      </div>
      {/* <div className="col-12 mb-3">
        <label htmlFor="xircls_coupon_button_color">Button Colour:</label>
        <input
          type="text"
          className="form-control"
          value={offerButtonBg}
          name="xircls_coupon_button_color"
          id="xircls_coupon_button_color"
          onInput={(e) => {
            setOfferButtonBg(e.target.value)
            changeValue(e, 'value')
          }}
        />
      </div>
      <div className="col-12 mb-3">
        <label htmlFor="xircls_coupon_buttonfont_color">
          Button Font Colour:
        </label>
        <input
          type="text"
          className="form-control"
          value={offerButtonText}
          name="xircls_coupon_buttonfont_color"
          id="xircls_coupon_buttonfont_color"
          onInput={(e) => {
            setOfferButtonText(e.target.value)
            changeValue(e, 'value')
          }}
        />
      </div>
      <div className="col-12 mb-3">
        <label htmlFor="coupon_button_border">Button Border:</label>
        <input
          type="range"
          className="w-100"
          min={0}
          max={25}
          style={{accentColor: '#008060'}}
        //   className="form-control"
          value={offerButtonRadius}
          name="coupon_button_border"
          id="coupon_button_border"
          onChange={(e) => {
            setOfferButtonRadius(e.target.value)
            changeValue(e, 'value')
          }}
        />
      </div> */}
    </div>
  )
}

export default OfferEditSection
