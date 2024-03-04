import React, { useState, useEffect } from "react"
import "./popup.css"

const Theme4 = ({ isMobile, themes, setOpenSection }) => {

  // const {themes} = useContext(ThemesProvider)

  const themeData = themes?.themeData4

  const [secondsTh4, setSecondsTh4] = useState(0)

  console.log(secondsTh4, themes?.themeData4?.[`${isMobile ? 'mobile_' : ''}carousel_image`]?.length, (secondsTh4 >= themes?.themeData4?.[`${isMobile ? 'mobile_' : ''}carousel_image`]?.length - 1))

  useEffect(() => {

    const interval = setInterval(() => {
      setSecondsTh4(secondsTh4 >= themes?.themeData4?.[`${isMobile ? 'mobile_' : ''}carousel_image`]?.length - 1 ? 0 : secondsTh4 + 1)
    }, themes?.themeData4?.[`${isMobile ? 'mobile_' : ''}carousel_interval`] * 1000)

    return () => clearInterval(interval)
  }, [themes, isMobile, secondsTh4])

  useEffect(() => {
    const header_p = document.querySelectorAll(`.theme_4 .header-text-sect-4 p`)
    const body_p = document.querySelectorAll(`.theme_4 .body-text-sect-4 p`)
    header_p.forEach((pTag) => {
      pTag.style.color = themes?.[`themeData4`]?.[`${isMobile ? "mobile_" : ""}header_color`]
    })
    body_p.forEach((pTag) => {
      pTag.style.color = themes?.[`themeData4`]?.[`${isMobile ? "mobile_" : ""}body_color`]
    })
  }, [])

  if (themes) {
    return (
      <>
        <style>{`
        .tnc-text-sect-4 p {
          margin: 0px
        }
      `}</style>

        {/* original */}
        <div
          className="xircls_container theme4 xircls_border_radius_class popup-background-color theme-4-custom theme4-font theme_4 common_class_theme"
          style={{
            width: isMobile ? "100%" : "800px",
            height: isMobile ? "auto" : "520px",
            position: "relative",
            zIndex: 100001,
            overflow: "hidden",
            boxShadow: '0px 0px 20px rgba(0,0,0,0.25)',
            borderRadius: themeData[`${isMobile ? 'mobile_' : ""}border_radius`].includes("px") ? themeData[`${isMobile ? 'mobile_' : ""}border_radius`] : `${themeData[`${isMobile ? 'mobile_' : ""}border_radius`]}px`
          }}
        >
          <div
            className="xircls_parent"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "stretch",
              flexDirection: isMobile ? "column" : "row",
              height: "100%",
              cursor: "pointer"
            }}
          >
            <div
              id="cancel_button"
              className="xircls_cancel_btn"
              style={{
                zIndex: 10,
                position: "absolute",
                right: 12,
                top: 12,
                border: "none !important",
                cursor: "pointer",
                fontSize: "18px !important",
                color: "#000",
                background: "transparent",
                backgroundColor: "lightgray",
                width: 25,
                borderRadius: 30,
                height: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
              onclick="hideXirclspopup1('BR')"
            >
              ✕
            </div>
            <div
              className="image_div image-section"
              style={{
                width: isMobile ? "100%" : "45%",
                aspectRatio: isMobile ? "4/3" : "auto",
                // backgroundImage:
                //   `url(${typeof themeData[`${isMobile ? 'mobile_' : ''}background_image`] === "string" ? themeData[`${isMobile ? 'mobile_' : ''}background_image`] : URL.createObjectURL(themeData[`${isMobile ? 'mobile_' : ''}background_image`])})`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
                backgroundSize: "cover",
                position: 'relative',
                backgroundColor: "lightgray"
              }}
              onClick={(event) => {
                event.stopPropagation()
                if (setOpenSection) {
                  try {
                    setOpenSection("image")
                  } catch (error) {
                  }
                }
              }}
            >
              <img src={typeof themeData[`${isMobile ? 'mobile_' : ''}background_image`] === "string" ? themeData[`${isMobile ? 'mobile_' : ''}background_image`] : URL.createObjectURL(themeData[`${isMobile ? 'mobile_' : ''}background_image`])} alt="" width="100%" height="100%" />
              {Array.isArray(themes?.themeData4[`${isMobile ? 'mobile_' : ''}carousel_image`]) && themes?.themeData4[`${isMobile ? 'mobile_' : ''}carousel_image`]?.length > 0 && themes.themeData4[`${isMobile ? 'mobile_' : ''}carousel_image`].map((ele, key) => {
                // console.log(typeof ele, "string")
                // console.log(ele, "ele")
                let displayImg
                try {
                  displayImg = URL.createObjectURL(ele)
                } catch (error) {
                  displayImg = ele
                }
                // const displayImg = typeof ele === 'object' ? URL.createObjectURL(ele) : ele
                return (
                  <img key={key} src={displayImg} className={`position-absolute`}
                    id="xircls_carousel"
                    style={{ aspectRatio: isMobile ? "4/3" : "2/3", width: "80%", zIndex: key === secondsTh4 ? '2' : '0' }}
                    alt="" />
                )
              })}
            </div>
            <div
              className="xircls_content"
              style={{ width: isMobile ? "100%" : "55%", backgroundColor: "#ffffff", margin: '0px' }}
              onClick={(event) => {
                event.stopPropagation()
                if (setOpenSection) {
                  try {
                    setOpenSection("background")
                  } catch (error) {
                  }
                }
              }}
            >
              <div
                className="xircls_content_box"
                style={{
                  position: "relative",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: themeData[`${isMobile ? 'mobile_' : ''}body_background_color`]
                }}
              >
                <div
                  className="xircls_content_here"
                  style={{ textAlign: "left", paddingTop: 50, padding: isMobile ? "20px" : "50px" }}
                >
                  <div id="phone_number_div">
                    <div
                      className="theme4_main_font"
                      style={{ fontSize: isMobile ? "20px" : "26px", lineHeight: "28px", fontWeight: 600 }}
                    >

                      <div onClick={(event) => {
                        event.stopPropagation()
                        if (setOpenSection) {
                          try {
                            setOpenSection("text")
                          } catch (error) {
                          }
                        }
                      }} className="header-text-sect-4" dangerouslySetInnerHTML={{ __html: themeData[`${isMobile ? "mobile_" : ""}header_text`] }} />
                    </div>
                    <div
                      className="theme4_sub_font"
                      style={{
                        fontSize: isMobile ? "13px" : "14px",
                        lineHeight: isMobile ? "19px" : "22px",
                        fontWeight: 500,
                        marginTop: 20
                      }}
                    >
                      <div onClick={(event) => {
                        event.stopPropagation()
                        if (setOpenSection) {
                          try {
                            setOpenSection("text")
                          } catch (error) {
                          }
                        }
                      }} className="body-text-sect-4" dangerouslySetInnerHTML={{ __html: themeData[`${isMobile ? "mobile_" : ""}body_text`] }} />
                    </div>
                    <div className="action_inputs" style={{ marginTop: 20 }}>
                      <div className="xircls_form-group" style={{ marginBottom: 20 }}>
                        <input
                          type="text"
                          style={{
                            width: "100%",
                            height: 40,
                            padding: "0px 10px",
                            backgroundColor: "#f3f3f3",
                            outline: "none",
                            border: "1px solid #ccc"
                          }}
                          placeholder="Name"
                        />
                      </div>
                      <div className="xircls_form-group" style={{ marginBottom: 20 }}>
                        <input
                          id="input1"
                          type="text"
                          style={{
                            width: "100%",
                            height: 40,
                            padding: "0px 10px",
                            backgroundColor: "#f3f3f3",
                            outline: "none",
                            border: "1px solid #ccc"
                          }}
                          placeholder="Mobile no."
                        />
                        <span style={{ color: "red", fontSize: "11px" }} id="input1_val" />
                      </div>
                      <div
                        className="xircls_check-group"
                        style={{
                          marginBottom: 20,
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          gap: 10
                        }}
                      >
                        <input
                          id="xircls_term_and_codition"
                          type="checkbox"
                          style={{
                            height: 20,
                            padding: "0px 10px",
                            accentColor: "rgb(63, 135, 222)",
                            aspectRatio: 1
                          }}
                        />
                        <label
                          htmlFor="xircls_term_and_codition"
                          style={{
                            cursor: "pointer",
                            color: "#999999",
                            fontSize: "10px",
                            lineHeight: "20px"
                          }}
                        >

                          <div
                            className="tnc-text-sect-4"
                            onClick={(event) => {
                              event.stopPropagation()
                              if (setOpenSection) {
                                try {
                                  setOpenSection("text")
                                } catch (error) {
                                }
                              }
                            }} dangerouslySetInnerHTML={{ __html: themeData?.[`${isMobile ? 'mobile_' : ''}tnc_text`] }} />
                        </label>
                      </div>
                      <div className="action_btn" style={{ marginTop: 25 }}>
                        <div
                          id="XIRCLS_btn"
                          style={{
                            cursor: "pointer",
                            width: "100%",
                            height: 40,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontWeight: 600,
                            backgroundColor: themeData[`${isMobile ? 'mobile_' : ''}button_background_color`],
                            color: themeData[`${isMobile ? 'mobile_' : ''}button_color`],
                            borderRadius: themeData[`${isMobile ? 'mobile_' : ""}button_border_radius`].includes("px") ? themeData[`${isMobile ? 'mobile_' : ""}button_border_radius`] : `${themeData[`${isMobile ? 'mobile_' : ""}button_border_radius`]}px`
                          }}
                          onClick={(event) => {
                            event.stopPropagation()
                            if (setOpenSection) {
                              try {
                                setOpenSection("button")
                              } catch (error) {
                              }
                            }
                          }}
                        >
                          {themeData[`${isMobile ? 'mobile_' : ""}button_text`]}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </>
    )
  } else {
    return "loading"
  }
}

export default Theme4