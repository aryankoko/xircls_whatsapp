import React, { useEffect } from "react"
import "./popup.css"

const Theme1 = ({ isMobile, themes, setOpenSection }) => {


  const settingImage = (image) => {
    let demo
    try {
      demo = URL.createObjectURL(image)
    } catch (error) {
      demo = image
    }
    return demo
  }
  const themeData = themes?.themeData3
  const imgUrl = settingImage(themeData?.[`${isMobile ? 'mobile_' : ""}image`])

  useEffect(() => {
    const header_p = document.querySelectorAll(`.theme_3 .header-text-sect-3 p`)
    const body_p = document.querySelectorAll(`.theme_3 .body-text-sect-3 p`)
    header_p.forEach((pTag) => {
      pTag.style.color = themes?.[`themeData3`]?.[`${isMobile ? "mobile_" : ""}header_color`]
    })
    body_p.forEach((pTag) => {
      pTag.style.color = themes?.[`themeData3`]?.[`${isMobile ? "mobile_" : ""}body_color`]
    })
  }, [])

  if (themes) {
    return (
      <>
        {/* original */}
        <div
          style={{
            // maxHeight: "calc(100% - 110px)",
            margin: "0px auto",
            position: "relative",
            maxWidth: "100%",
            zIndex: 100001,
            opacity: 1,
            display: "block",
            backgroundColor: 'rgba(0,0,0,0)',
            cursor: "pointer"
          }}
          className="theme_3 common_class_theme"
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
              color: themeData[`${isMobile ? 'mobile_' : ""}background_color`] === themeData[`${isMobile ? 'mobile_' : ""}body_background_color`] ? themes?.[`themeData3`]?.[`${isMobile ? "mobile_" : ""}header_color`] : themeData[`${isMobile ? 'mobile_' : ""}body_background_color`],
              background: "transparent"
            }}
            onclick="hideXirclspopup1('BR')"
            value=""
          >
            ✕
          </div>
          <div
            onClick={(event) => {
              event.stopPropagation()
              if (setOpenSection) {
                try {
                  setOpenSection("background")
                } catch (error) {
                }
              }
            }}
            className="popup-background-color xircls_border_radius_class"
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "center",
              alignItems: "center",
              gap: isMobile ? "20px" : "40px",
              borderRadius: themeData[`${isMobile ? 'mobile_' : ""}border_radius`].includes("px") ? themeData[`${isMobile ? 'mobile_' : ""}border_radius`] : `${themeData[`${isMobile ? 'mobile_' : ""}border_radius`]}px`,
              background: themeData[`${isMobile ? 'mobile_' : ""}background_color`],
              width: isMobile ? "100%" : "663px",
              height: isMobile ? "100%" : "394px",
              margin: "auto",
              padding: '20px 25px',
              boxShadow: '0px 0px 20px rgba(0,0,0,0.25)'
            }}
          >
            <div
              className="img sm_remove_image"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {themeData[`${isMobile ? 'mobile_' : ""}image`] !== '' && <img
                onClick={(event) => {
                  event.stopPropagation()
                  if (setOpenSection) {
                    try {
                      setOpenSection("image")
                    } catch (error) {
                    }
                  }
                }}
                width={isMobile ? "125px" : "144px"}
                src={imgUrl}
                alt=""
              />}
            </div>
            <div
              className="make_height_fix"
              style={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                padding: 10,
                borderRadius: themeData[`${isMobile ? 'mobile_' : ""}border_radius`].includes("px") ? themeData[`${isMobile ? 'mobile_' : ""}border_radius`] : `${themeData[`${isMobile ? 'mobile_' : ""}border_radius`]}px`,
                backgroundColor: themeData[`${isMobile ? 'mobile_' : ""}body_background_color`],
                width: isMobile ? "100%" : "388px",
                height: isMobile ? "100%" : "340px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                marginBottom: 20
              }}
            >
              <div className="make_content">
                {/* First div */}
                <div className="xircls_top_div" id="check_offer_btn">
                  <div
                    className="heading_here header_style"
                    style={{ marginBottom: 20, color: "#000" }}
                  >
                    <div
                      onClick={(event) => {
                        event.stopPropagation()
                        if (setOpenSection) {
                          try {
                            setOpenSection("text")
                          } catch (error) {
                          }
                        }
                      }}
                      className="x1_main"
                      style={{
                        fontSize: isMobile ? "18px" : "20px",
                        lineHeight: isMobile ? "28px" : "30px",
                        fontStyle: "normal",
                        fontWeight: 600,
                        // textTransform: "capitalize",
                        color: "#000"
                      }}
                    >
                      <div className="header-text-sect-3" dangerouslySetInnerHTML={{ __html: themeData[`${isMobile ? "mobile_" : ""}header_text`] }} />
                    </div>
                  </div>
                  <div
                    className="sub_content theme_block_one xircls_preview_body first_content_div"
                    style={{ textAlign: "center", marginBottom: 22, color: "#000" }}
                  >
                    {/*  <div className="xp_xircls" style="font-size: 14px line-height: 20px font-style: normal font-weight: 500 color: inherit margin-bottom: 10px text-transform: capitalize"> We have something special <br> waiting for you. </div>
                        <div className="xp_xircls" style="font-size: 14px line-height: 20px font-style: normal font-weight: 500 color: inherit text-transform: capitalize"> Instant VIPs get exclusive discounts <br> not available to others. </div> */}
                    <div
                      onClick={(event) => {
                        event.stopPropagation()
                        if (setOpenSection) {
                          try {
                            setOpenSection("text")
                          } catch (error) {
                          }
                        }
                      }}
                      className="xp_xircls"
                      style={{
                        fontSize: isMobile ? "13" : "14px",
                        lineHeight: isMobile ? "18px" : "20px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        color: "#000",
                        marginBottom: 10,
                        textTransform: "capitalize"
                      }}
                    >
                      <div className="body-text-sect-3" dangerouslySetInnerHTML={{ __html: themeData[`${isMobile ? "mobile_" : ""}body_text`] }} />
                    </div>
                  </div>
                  <div className="content_action">
                    <div
                    onClick={(event) => {
                      event.stopPropagation()
                      if (setOpenSection) {
                        try {
                          setOpenSection("button")
                        } catch (error) {
                        }
                      }
                    }}
                      className="unique_btn_color xircls_button_link_val xircls_button_border_val"
                      style={{
                        textTransform: "uppercase",
                        width: 167,
                        height: 44,
                        margin: "auto",
                        fontWeight: 600,
                        fontSize: isMobile ? "14px" : "18px",
                        lineHeight: "30px",
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        backgroundColor: themeData[`${isMobile ? 'mobile_' : ""}button_background_color`],
                        color: themeData[`${isMobile ? 'mobile_' : ""}button_color`],
                        borderRadius: themeData[`${isMobile ? 'mobile_' : ""}button_border_radius`].includes("px") ? themeData[`${isMobile ? 'mobile_' : ""}button_border_radius`] : `${themeData[`${isMobile ? 'mobile_' : ""}button_border_radius`]}px`
                      }}
                      onclick="change_input()"
                      id="pick_colors"
                    >
                      {themeData[`${isMobile ? 'mobile_' : ""}button_text`]}
                    </div>
                  </div>
                </div>
                {/* Phone */}
                <div
                  id="phone_number_div"
                  className="phone_number_div contact_input"
                  style={{
                    display: "none",
                    marginBottom: 10,
                    justifyContent: "center",
                    alignItmes: "center",
                    flexDirection: "colunm"
                  }}
                >
                  <div
                    className="heading_here header_style"
                    style={{ marginBottom: 20, color: "#000" }}
                  >
                    <div
                      className="x1_main"
                      style={{
                        fontSize: "20px",
                        lineHeight: "30px",
                        fontStyle: "normal",
                        fontWeight: 600,
                        textTransform: "capitalize"
                      }}
                    >
                      You’re Just A Step Away
                    </div>
                  </div>
                  <div
                    className="xp_xircls"
                    style={{
                      fontSize: "14px",
                      lineHeight: "20px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      color: "#000",
                      marginBottom: 10,
                      textTransform: "capitalize"
                    }}
                  >
                    {" "}
                    A one-time verification stands between you and a lifetime of
                    exclusive offers. <br /> <br /> Enter your email address or mobile
                    number.{" "}
                  </div>
                  <div style={{ width: 255, margin: "auto" }}>
                    <input
                      type="text"
                      id="input1"
                      placeholder="E-mail ID or Mobile no."
                      style={{
                        width: "100%",
                        height: 44,
                        border: "1.5px solid #979797",
                        borderRadius: 7,
                        fontStyle: "normal",
                        fontWeight: 600,
                        fontSize: "14px",
                        lineHeight: "30px",
                        color: "#000",
                        padding: "0px 10px"
                      }}
                    />
                    <span style={{ color: "red", fontSize: "11px" }} id="input1_val" />
                    <div className="phone_content_action" style={{ marginTop: 10 }}>
                      <div
                        id="XIRCLS_btn"
                        className="contact_input_btn"
                        style={{
                          textTransform: "uppercase",
                          height: 44,
                          margin: "auto",
                          fontWeight: 600,
                          fontSize: "18px",
                          lineHeight: "30px",
                          textAlign: "center",
                          backgroundColor: "#a97e7e",
                          color: "#100f0f",
                          borderRadius: 6,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer"
                        }}
                        onclick="get_opt()"
                      >
                        Send OTP
                      </div>
                    </div>
                  </div>
                </div>
                {/* Otp */}
                <div
                  id="otp_number_div"
                  className="otp_number_div otp_input"
                  style={{
                    display: "none",
                    justifyContent: "center",
                    alignItmes: "center",
                    flexDirection: "colunm",
                    marginBottom: 10
                  }}
                >
                  <div
                    className="heading_here header_style"
                    style={{ marginBottom: 20, color: "#000" }}
                  >
                    <div
                      className="x1_main"
                      style={{
                        fontSize: "20px",
                        lineHeight: "30px",
                        fontStyle: "normal",
                        fontWeight: 600,
                        textTransform: "capitalize"
                      }}
                    >
                      Check your inbox
                    </div>
                  </div>
                  <div
                    className="xp_xircls"
                    style={{
                      fontSize: "14px",
                      lineHeight: "20px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      color: "#000",
                      marginBottom: 15,
                      textTransform: "capitalize"
                    }}
                  >
                    You’ve received a one-time password. <br /> Please enter it below.
                  </div>
                  <div style={{ width: 255, margin: "auto" }}>
                    <input
                      type="text"
                      id="input2"
                      placeholder="Enter your OTP"
                      style={{
                        width: "100%",
                        height: 44,
                        border: "1.5px solid #979797",
                        borderRadius: 7,
                        fontStyle: "normal",
                        fontWeight: 600,
                        fontSize: "14px",
                        lineHeight: "30px",
                        color: "#000",
                        padding: "0px 10px"
                      }}
                    />
                    <div
                      id="xircls_otp_counter"
                      style={{
                        fontStyle: "normal",
                        fontWeight: 600,
                        fontSize: "10px",
                        lineHeight: "30px",
                        textAlign: "right",
                        color: "#000"
                      }}
                    />
                    <span style={{ color: "red", fontSize: "11px" }} id="input2_val" />
                    <div className="otp_content_action" style={{ marginTop: 10 }}>
                      <div
                        id="XIRCLS_btn1"
                        className="otp_input_btn"
                        style={{
                          textTransform: "uppercase",
                          width: "100%",
                          height: 44,
                          margin: "auto",
                          fontWeight: 600,
                          fontSize: "18px",
                          lineHeight: "30px",
                          textAlign: "center",
                          backgroundColor: "#a97e7e",
                          color: "#100f0f",
                          borderRadius: 6,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer"
                        }}
                        onclick="check_otp()"
                      >
                        Verify!
                      </div>
                      <div
                        style={{
                          fontStyle: "normal",
                          fontWeight: 400,
                          fontSize: "10px",
                          lineHeight: "20px",
                          textAlign: "center",
                          color: "#000",
                          marginTop: 8
                        }}
                      >
                        Check contact details.{" "}
                        <span
                          style={{ fontWeight: 600, fontSize: "12px", cursor: "pointer" }}
                          onclick="backtoCheck('theme3')"
                        >
                          Go Back
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="offer_section"
                style={{
                  position: "absolute",
                  bottom: "0%",
                  right: 0,
                  width: 0,
                  height: "100%",
                  transition: "0.3s",
                  backgroundColor: "#f6f7f5",
                  overflow: "auto",
                  zIndex: 10,
                  borderRadius: 12
                }}
              >
                <div
                  className="offers_div"
                  style={{
                    display: "none",
                    fontFamily: "sans-serif",
                    height: "100%",
                    padding: "40px 10px"
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      right: 10,
                      top: 10,
                      color: "#000",
                      cursor: "pointer",
                      zIndex: 11,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 10
                    }}
                  >
                    <img
                      id="maximize_icon"
                      onclick="maximize_offers_div()"
                      style={{ width: 16, height: 16, cursor: "pointer" }}
                      src="https://www.demo.xircls.in/static/images/website-slide/infiniti/maximize.svg"
                      alt=""
                    />
                    <img
                      id="minimize_icon"
                      onclick="minimize_offers_div()"
                      style={{
                        display: "none",
                        width: 16,
                        height: 16,
                        cursor: "pointer"
                      }}
                      src="https://www.demo.xircls.in/static/images/website-slide/infiniti/minimize.svg"
                      alt=""
                    />
                    <img
                      onclick="hide_offers_div('theme3')"
                      style={{ width: 20, height: 20, cursor: "pointer" }}
                      src="https://www.demo.xircls.in/static/images/sprite_icons/x.svg"
                      alt=""
                    />
                  </div>
                  <div
                    id="offer_header"
                    className="x1_main"
                    style={{
                      fontSize: "20px",
                      lineHeight: "30px",
                      fontStyle: "normal",
                      fontWeight: 600,
                      textTransform: "capitalize",
                      fontFamily: "Montserrat !important",
                      color: "#000"
                    }}
                  />
                  <div
                    className="dynamic_offers"
                    style={{
                      margin: "7px 10px",
                      padding: "20px 5px",
                      borderRadius: 10,
                      minHeight: "100%",
                      fontFamily: '"Montserrat"'
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <div
              id="powered_by"
              style={{
                fontSize: "11px",
                position: "absolute",
                color: "#000",
                right: isMobile ? "0px" : "15px",
                bottom: 6,
                letterSpacing: "0.5px",
                fontFamily: "Montserrat !important",
                width: isMobile ? "100%" : "auto",
                textAlign: 'center',
                margin: 'auto'
              }}
            >
              Powered by{" "}
              <a
                style={{ textDecoration: "none", cursor: "pointer", color: "inherit" }}
                href="https://www.xircls.com/"
                target="_blank"
              >
                XIRCLS
              </a>
            </div>
          </div>
        </div>

      </>
    )
  } else {
    return "loading"
  }
}

export default Theme1