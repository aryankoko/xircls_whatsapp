import React, { useContext, useEffect, useState } from "react"
import { SuperLeadzBaseURL, getReq } from "../../assets/auth/jwtService"
import { Tone, getCurrentOutlet, strategy } from "../Validator"
import { PermissionProvider } from "../../Helper/Context"
import toast from "react-hot-toast"
import axios from "axios"
import Form from "./Form"
import Select from 'react-select'
import { ArrowLeft, ChevronUp, Circle, Send, Settings, Type, X } from "react-feather"
import { Row, Col, Card, CardBody, Container, UncontrolledButtonDropdown, DropdownItem, DropdownToggle, DropdownMenu, UncontrolledDropdown, UncontrolledAccordion, AccordionItem, AccordionHeader, AccordionBody, Modal, ModalBody, ModalFooter, Button } from "reactstrap"
import CustomColorModifier from "../FormBuilder/FormBuilder(components)/CustomColorModifier"
import FrontBaseLoader from "../Components/Loader/Loader"
import { Pagination, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js'
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import 'swiper/modules/navigation/navigation.min.css'
import 'swiper/modules/autoplay/autoplay.min.css'
import "./Form.css"
import { MdAttachEmail, MdOutlineRadioButtonChecked } from "react-icons/md"
import { GoHeading } from "react-icons/go"
import BasicEditor from "../Components/Editor/BaseEditor"
import Editor from "../NewCustomizationFlow/Editor"
// import { useNavigate } from "react-router"
import { Link, useParams } from "react-router-dom"
// import Editor from "../NewCustomizationFlow/Editor"

const AdminSetting = () => {
  const [toggle, setToggle] = useState(true)
  const [sendTest, setSendTest] = useState(false)
  const [editorBar, setEditorBar] = useState(true)
  // const outletDetail = getCurrentOutlet()
  const [sideHeaderNav, setSideHeaderNav] = useState('form')
  const [sideNav, setSideNav] = useState('contentBF')
  const outletData = getCurrentOutlet()
  const [openPage, setOpenPage] = useState(true)
  const [outletSenderId, setOutletSenderId] = useState("")
  // const [tone, setTone] = useState("")

  // const navigate = useNavigate()
  console.log(setToggle)

  const fontStyles = [
    { label: "Abril Fatface", value: `Abril Fatface` },
    { label: "Acme", value: `Acme` },
    { label: "Caveat", value: `Caveat` },
    { label: "Dancing Script", value: `Dancing Script` },
    { label: "Kalam", value: `Kalam` },
    { label: "Lato", value: `Lato` },
    { label: "Lexend", value: `Lexend` },
    { label: "Lilita One", value: `Lilita One` },
    { label: "Montserrat", value: `Montserrat` },
    { label: "Noto Sans", value: `Noto Sans` },
    { label: "Open Sans", value: `Open Sans` },
    { label: "Oswald", value: `Oswald` },
    { label: "Pacifico", value: `Pacifico` },
    { label: "Play", value: `Play` },
    { label: "Roboto", value: `Roboto` },
    { label: "Satisfy", value: `Satisfy` },
    { label: "sans-serif", value: `sans-serif` },
    { label: "Ubuntu", value: `Ubuntu` }
  ]

  const FONT_SIZE_OPTIONS = [
    { label: '10px', value: '10px' },
    { label: '11px', value: '11px' },
    { label: '12px', value: '12px' },
    { label: '13px', value: '13px' },
    { label: '14px', value: '14px' },
    { label: '15px', value: '15px' },
    { label: '16px', value: '16px' },
    { label: '17px', value: '17px' },
    { label: '18px', value: '18px' },
    { label: '19px', value: '19px' },
    { label: '20px', value: '20px' },
    { label: '21px', value: '21px' },
    { label: '22px', value: '22px' },
    { label: '23px', value: '23px' },
    { label: '24px', value: '24px' },
    { label: '25px', value: '25px' }
  ]

  const defaultData = {
    // Direct: {
      page_1: {
        heading: `Create an account`,
        sub_heading: `Track your order, request support and get updates on current & upcoming promotions.`,
        heading_color: `#000000`,
        sub_heading_color: `#000000`,
        primary_font: "sans-serif",
        secondary_font: "sans-serif",
        button_text: "Submit",
        button_color: "#ffffff",
        button_bg_color: "#000000",
        password: "Password",
        confirm_password: "Confirm Password",
        heading_font_size: "24px",
        sub_heading_font_size: "14px",
        opt_in_email: "",
        opt_in_sms: "",
        opt_in_both: "",
        label_text_email: "Subscribe to email",
        label_text_sms: "Subscribe to sms",
        label_text_both: "Subscribe",
        email_check: true,
        sms_check: true,
        both_check: true,
        redirect_url: "",
        nextPage: false,
        email_from: "",
        subject: "Elevate Your Experience: Sign Up Now",
        contain: true,
        hidePassword: true,
        reEnter: true,
        strategy: "",
        tone: ""
      },
      page_2: {
        heading: `Congratulations! Your account has been activated.`,
        sub_heading: `Remember to login to track your orders, request support, see updates and more.`,
        heading_color: `#000000`,
        sub_heading_color: `#000000`,
        primary_font: "sans-serif",
        secondary_font: "sans-serif",
        button_text: "Login",
        button_color: "#ffffff",
        button_bg_color: "#000000",
        heading_font_size: "19px",
        sub_heading_font_size: "14px",
        redirect_url: ""
      },
      editorState: "{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"font-weight: 600;font-size: 17px;line-height: 2;\",\"text\":\"Hello,\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"center\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"font-weight: 600;font-size: 17px;line-height: 1;\",\"text\":\"Activate Your Account\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"center\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}",
      htmlContent: "<p class=\"editor-paragraph\" style=\"text-align: center;\" dir=\"ltr\"><b><strong class=\"editor-text-bold\" style=\"font-weight: 600; font-size: 17px; line-height: 2; white-space: pre-wrap;\">Hello,</strong></b></p><p class=\"editor-paragraph\" style=\"text-align: center;\" dir=\"ltr\"><b><strong class=\"editor-text-bold\" style=\"font-weight: 600; font-size: 17px; line-height: 1; white-space: pre-wrap;\">Activate Your Account</strong></b></p>"

    // }
  }

  const [currPage, setCurrPage] = useState("page_1")

  const [prevData, setPrevData] = useState(defaultData)

  const [currObj, setCurrObj] = useState(defaultData?.[currPage])

  const [apiLoader, setApiLoader] = useState(false)

  const { userPermission } = useContext(PermissionProvider)

  // const getData = () => {
  //   axios.get(`${SuperLeadzBaseURL}/api/v1/change-app-status/?shop=${outletDetail[0]?.web_url}&app=${userPermission?.appName}`)
  //     .then((resp) => {
  //       console.log(resp)
  //       setToggle(resp?.data?.status)
  //       //   const updatedData = {
  //       //     data: ""
  //       //   }

  //       //   setData((preData) => ({
  //       //     ...preData,
  //       //     ...updatedData
  //       //   }))
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // }

  // const changeStatus = (e) => {
  //   const form_data = new FormData()

  //   form_data.append("shop", outletDetail[0]?.web_url)
  //   form_data.append("app", userPermission?.appName)
  //   form_data.append("value", e.target.checked ? "1" : "0")
  //   axios.post(`${SuperLeadzBaseURL}/api/v1/change-app-status/`, form_data)
  //     .then((resp) => {
  //       console.log(resp)
  //       toast.success(!e.target.checked ? "Plugin Activated" : "Plugin Deactivated")
  //       setToggle(!e.target.checked)
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //       setToggle(e.target.checked)
  //       toast.error("Something went wrong")
  //     })
  // }

  useEffect(() => {
    // getData()
    // const url = new URL(`${SuperLeadzBaseURL}/flash_accounts/add_template_json/?shop=${outletData[0]?.web_url}&app=${userPermission?.appName}`)
    // axios({
    //   method: "GET",
    //   url
    // }).then((data) => {
    //   console.log(data)
    //   if (data?.data?.error) {
    //     setCurrObj(defaultData)
    //   } else {
    //     setPrevData({ ...data?.data?.success })
    //     console.log(data.data.success)
    //     setCurrObj({ ...data?.data?.success?.[currPage] })

    //   }
    // }).catch((error) => {
    //   console.log({ error })
    //   setCurrObj(defaultData)
    //   toast.error("Could not fetch your data, try reloading the page")
    // })

    getReq('outletsDetails', `?OUTLET_ID=${outletData[0]?.id}&OUTLET_TYPE=SINGLE`)
    .then((resp) => {
      console.log(resp)
      // setAboutUs(String(resp.data.data.outlet_detail?.outlet_description).split('.'))
      setOutletSenderId(resp?.data?.data?.outlet_detail[0]?.outlet_sender_id)
    })
    .catch((error) => {
        console.log(error)
    })
    
  }, [])
  
  // useEffect(() => {
  //   console.log(tone, "tone")
  //   setPrevData(defaultData[tone])
  // }, [tone])

  console.log(prevData, setOutletSenderId)

  const handleDataChange = (e) => {
    // const obj = { ...prevData }

    // setPrevData({ ...prevData, page_1: { ...prevData?.page_1, [e.target.name]: e.target.value } })
    setCurrObj({ ...currObj, [e.target.name]: e.target.value })
  }

  const handleDataChange2 = (e) => {
    // const obj = { ...prevData }
    setCurrObj({ ...currObj, [e.target.name]: e.target.value })
  }

  const getColorPicker = ({ key }) => {
    return <CustomColorModifier styles={currObj} setStyles={setCurrObj} isHex={false} colorType={key} />
  }

  let saveTimer

  const handleSaveData = (e) => {
    e.preventDefault()
    setApiLoader(true)
    const timeout = 300
    clearTimeout(saveTimer)
    saveTimer = setTimeout(() => {
      const form_data = new FormData()
      const sendObj = {
        shop: outletData[0]?.web_url,
        app: userPermission?.appName,
        default_theme: JSON.stringify(prevData)
      }
      Object.entries({ ...sendObj })?.map(([key, value]) => {
        form_data.append(key, value)
      })
      form_data.append('email_template', prevData?.htmlContent)
      const url = new URL(`${SuperLeadzBaseURL}/api/v1/add_default_theme/`)
      axios({
        method: "POST",
        data: form_data,
        url
      }).then((data) => {
        console.log(data)
        toast.success('Saved Successfully')
        setApiLoader(false)
        // if (data?.data?.success === "successfully updated") {
        // }
        // console.log(data)
      }).catch((error) => {
        console.log({ error })
        toast.error("There was an error while saving your data")
        setApiLoader(false)
      })
    }, timeout)
  }

  // const handleSlideChange = (swiper) => {
  //   let pageName
  //   Object.keys(defaultData).forEach((key, index) => {
  //     if (index === swiper?.activeIndex) {
  //       pageName = key
  //     }
  //   })
  //   setCurrPage(pageName)
  //   setCurrObj({ ...prevData[pageName] })
  // }

  useEffect(() => {
    setPrevData({ ...prevData, [currPage]: currObj})
  }, [currObj])

  console.log(sideNav, "sideNav")

  const sendTestMail = () => {
    const form_data = new FormData()
    form_data.append('email', prevData?.testMail)
    fetch(`${SuperLeadzBaseURL}/merchant/test_mail/`, {
      method: "POST",
      body: form_data
    })
    .then((resp) => {
      console.log(resp)
      setSendTest(false)
    })
    .catch((error) => {
      console.log(error)
    })
  }


  return (
    <>
      <Container fluid className='border-bottom px-0' style={{ height: "55px" }}>
        <style>
          {`
            .pages {
              background: #fff;
              color: #000
            }
            .pages.active {
              background: #000 !important;
              color: #fff !important;
            }

            // .sideNav-items {
            //   aspect-ratio: 0 !important;
            // }
          `}
        </style>

        <Row className='align-items-center px-0'>
          {
            toggle ? <div className='col-md-12 d-flex flex-row justify-content-end align-items-center' style={{ padding: "0.5rem", gap: "0.5rem" }}>
              <div className="d-flex justify-content-center align-items-center" style={{ gap: '15px', padding: '0px 10px' }}>
                {
                  sideNav === "Email" ? (
                    <>
                      <a className="btn btn-primary" onClick={() => setSendTest(!sendTest)}><Send size='15' /><span className="mx-1">Test Mail</span></a>
                    </>
                  ) : ''
                }

                <select className="form-control" onChange={(e) => setPrevData({...prevData, page_1: {...prevData?.page_1, strategy: e.target.value}})}>
                  <option value="" disabled selected>Strategy</option>
                  {
                    strategy?.map((curElem) => {
                      return <option value={curElem?.value}>{curElem?.label}</option>
                    })
                  }
                </select>
                <select className="form-control" onChange={(e) => setPrevData({...prevData, page_1: {...prevData?.page_1, tone: e.target.value}})}>
                  <option value="" disabled selected>Tone</option>
                  {
                    Tone?.map((curElem) => {
                      return <option value={curElem?.value}>{curElem?.label}</option>
                    })
                  }
                </select>
                <button onClick={(e) => handleSaveData(e, "Save")} id='saveBtn' className="btn btn-primary-main" style={{ whiteSpace: 'nowrap' }}>Save</button>
              </div>
            </div> : ''
          }
          

        </Row>
        
      </Container>
      {
        apiLoader ? <FrontBaseLoader /> : ''
      }

      {
        toggle ? (
          <>
            <div className="d-flex justify-content-center align-items-stretch border position-relative" style={{ height: "calc(100vh - 55px)" }}>

              <div className="nav-sidebar d-flex flex-column align-items-stretch justify-content-start border-end text-center h-100" style={{ padding: "0.5rem 18px", width: "100px", overflow: "auto", gap: '20px' }}>
                <div className={`sideNav-items d-flex flex-column align-items-center justify-content-center ${sideHeaderNav === "form" ? "text-black active-item" : ""}`} style={{ gap: "0.5rem", cursor: "pointer", padding: "0.75rem 0px" }} onClick={() => setSideHeaderNav("form")}>
                  <button className={`btn d-flex align-items-center justify-content-center`} style={{ aspectRatio: "1", padding: "0rem", border: "none", outline: "none", transition: "0.3s ease-in-out" }}>
                    <Type size={'15px'} />
                  </button>
                  <span style={{ fontSize: "8.5px", fontStyle: "normal", fontWeight: "500", lineHeight: "10px", transition: "0.3s ease-in-out" }} className={`text-uppercase`}>Form</span>
                </div>
                
                <div className={`sideNav-items d-flex flex-column align-items-center justify-content-center ${sideHeaderNav === "email" ? "text-black active-item" : ""}`} style={{ gap: "0.5rem", cursor: "pointer", padding: "0.75rem 0px" }} onClick={() => setSideHeaderNav("email")}>
                  <button className={`btn d-flex align-items-center justify-content-center`} style={{ aspectRatio: "1", padding: "0rem", border: "none", outline: "none", transition: "0.3s ease-in-out" }}>
                    <Mail size="15px" />
                  </button>
                  <span style={{ fontSize: "8.5px", fontStyle: "normal", fontWeight: "500", lineHeight: "10px", transition: "0.3s ease-in-out" }} className={`text-uppercase`}>Email</span>
                </div>

              </div>


              <div className="nav-sidebar d-flex flex-column align-items-stretch justify-content-start border-end text-center h-100" style={{ padding: "0.5rem 18px", width: "135px", overflow: "auto", gap: '20px' }}>

                {
                  sideHeaderNav === "form" && (
                    <>
                      {
                        currPage === "page_1" && (
                          <>
                            <div className={`sideNav-items d-flex flex-column align-items-center justify-content-center ${sideNav === "contentBF" ? "text-black active-item" : ""}`} style={{ gap: "0.5rem", cursor: "pointer", padding: "0.75rem 0px" }} onClick={() => setSideNav(sideNav === "contentBF" ? "" : "contentBF")}>
                              <button className={`btn d-flex align-items-center justify-content-center`} style={{ aspectRatio: "1", padding: "0rem", border: "none", outline: "none", transition: "0.3s ease-in-out" }}>
                                <Circle size={'15px'} />
                              </button>
                              <span style={{ fontSize: "8.5px", fontStyle: "normal", fontWeight: "500", lineHeight: "10px", transition: "0.3s ease-in-out" }} className={`text-uppercase`}>Content Before Form</span>
                            </div>
                            <div className={`sideNav-items d-flex flex-column align-items-center justify-content-center ${sideNav === "formFeilds" ? "text-black active-item" : ""}`} style={{ gap: "0.5rem", cursor: "pointer", padding: "0.75rem 0px" }} onClick={() => setSideNav(sideNav === "formFeilds" ? "" : "formFeilds")}>
                              <button className={`btn d-flex align-items-center justify-content-center`} style={{ aspectRatio: "1", padding: "0rem", border: "none", outline: "none", transition: "0.3s ease-in-out" }}>
                                <Circle size={'15px'} />
                              </button>
                              <span style={{ fontSize: "8.5px", fontStyle: "normal", fontWeight: "500", lineHeight: "10px", transition: "0.3s ease-in-out" }} className={`text-uppercase`}>Feilds</span>
                            </div>
                            <div className={`sideNav-items d-flex flex-column align-items-center justify-content-center ${sideNav === "contentAF" ? "text-black active-item" : ""}`} style={{ gap: "0.5rem", cursor: "pointer", padding: "0.75rem 0px" }} onClick={() => setSideNav(sideNav === "contentAF" ? "" : "contentAF")}>
                              <button className={`btn d-flex align-items-center justify-content-center`} style={{ aspectRatio: "1", padding: "0rem", border: "none", outline: "none", transition: "0.3s ease-in-out" }}>
                                <Circle size={'15px'} />
                              </button>
                              <span style={{ fontSize: "8.5px", fontStyle: "normal", fontWeight: "500", lineHeight: "10px", transition: "0.3s ease-in-out" }} className={`text-uppercase`}>Content After Form</span>
                            </div>

                            <div className={`sideNav-items d-flex flex-column align-items-center justify-content-center ${sideNav === "button" ? "text-black active-item" : ""}`} style={{ gap: "0.5rem", cursor: "pointer", padding: "0.75rem 0px" }} onClick={() => setSideNav(sideNav === "button" ? "" : "button")}>
                              <button className={`btn d-flex align-items-center justify-content-center`} style={{ aspectRatio: "1", padding: "0rem", border: "none", outline: "none", transition: "0.3s ease-in-out" }}>
                                <Circle size={'15px'} />
                              </button>
                              <span style={{ fontSize: "8.5px", fontStyle: "normal", fontWeight: "500", lineHeight: "10px", transition: "0.3s ease-in-out" }} className={`text-uppercase`}>Button</span>
                            </div>

                            <div className={`sideNav-items d-flex flex-column align-items-center justify-content-center ${sideNav === "securityOptions" ? "text-black active-item" : ""}`} style={{ gap: "0.5rem", cursor: "pointer", padding: "0.75rem 0px" }} onClick={() => setSideNav(sideNav === "securityOptions" ? "" : "securityOptions")}>
                              <button className={`btn d-flex align-items-center justify-content-center`} style={{ aspectRatio: "1", padding: "0rem", border: "none", outline: "none", transition: "0.3s ease-in-out" }}>
                                <Circle size={'15px'} />
                              </button>
                              <span style={{ fontSize: "8.5px", fontStyle: "normal", fontWeight: "500", lineHeight: "10px", transition: "0.3s ease-in-out" }} className={`text-uppercase`}>Security</span>
                            </div>
                          </>
                        )
                      }

                      {
                        currPage === "page_2" && (
                          <div className={`sideNav-items d-flex flex-column align-items-center justify-content-center ${sideNav === "successMessage" ? "text-black active-item" : ""}`} style={{ gap: "0.5rem", cursor: "pointer", padding: "0.75rem 0px" }} onClick={() => setSideNav(sideNav === "successMessage" ? "" : "successMessage")}>
                            <button className={`btn d-flex align-items-center justify-content-center`} style={{ aspectRatio: "1", padding: "0rem", border: "none", outline: "none", transition: "0.3s ease-in-out" }}>
                              <Circle size={'15px'} />
                            </button>
                            <span style={{ fontSize: "8.5px", fontStyle: "normal", fontWeight: "500", lineHeight: "10px", transition: "0.3s ease-in-out" }} className={`text-uppercase`}>Success Message</span>
                          </div>
                        )
                      }
                    </>
                  )
                }

                {
                  sideHeaderNav === "email" && (
                    <>
                      <div className={`sideNav-items d-flex flex-column align-items-center justify-content-center ${sideNav === "Email" ? "text-black active-item" : ""}`} style={{ gap: "0.5rem", cursor: "pointer", padding: "0.75rem 0px" }} onClick={() => setSideNav(sideNav === "Email" ? "" : "Email")}>
                        <button className={`btn d-flex align-items-center justify-content-center`} style={{ aspectRatio: "1", padding: "0rem", border: "none", outline: "none", transition: "0.3s ease-in-out" }}>
                          <Circle size={'15px'} />
                        </button>
                        <span style={{ fontSize: "8.5px", fontStyle: "normal", fontWeight: "500", lineHeight: "10px", transition: "0.3s ease-in-out" }} className={`text-uppercase`}>Setting</span>
                      </div>

                    </>
                  )
                }


              </div>


              <div className="d-flex align-items-stretch flex-grow-1 h-100">
                <div className=" border-end bg-white position-relative h-100" style={{ width: sideNav === "" ? "0px" : "450px", overflowX: "hidden", transition: "0.3s ease-in-out", opacity: "1", boxShadow: "10px 2px 5px rgba(0,0,0,0.125)", zIndex: "1" }}>
                  <div className='w-100' style={{ height: "100%", overflowY: "auto" }}>
              
                    {sideNav === "contentBF" && <div style={{ transition: "0.3s ease-in-out", overflow: "auto", width: "450px", transform: `translateX(${sideNav === "contentBF" ? "0px" : "-450px"})`, position: "absolute", inset: "0px" }}>
                      <UncontrolledAccordion stayOpen defaultOpen={["1"]}>
                        <AccordionItem>
                          <AccordionHeader className='acc-header border-top' targetId='1' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                            <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Header</label>
                          </AccordionHeader>
                          <AccordionBody accordionId='1'>
                            <div className="py-1">
                              <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Heading</label>
                              <textarea onChange={handleDataChange} value={prevData?.page_1?.heading} name="heading" type="text" className="form-control" id="heading" placeholder="Heading" />
                            </div>
                            <div className="py-1">
                              <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Heading Font</label>
                              <Select styles={{
                                option: (provided, state) => {
                                  return ({ ...provided, fontFamily: fontStyles[fontStyles?.findIndex($ => $?.value === state.value)]?.value })
                                }
                              }} value={fontStyles?.filter($ => $.value === prevData?.page_1?.primary_font)} options={fontStyles} id="primary_font" onChange={(eventData) => {
                                const e = { target: { name: "primary_font", value: eventData.value } }
                                handleDataChange(e)
                              }} />
                            </div>

                            <div className="py-1">
                              <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Heading Color</label>
                              <UncontrolledDropdown className="w-100 p-0" direction="start">
                                <DropdownToggle style={{ fontSize: "10px" }} className="rounded w-100 p-0">
                                  <div style={{ backgroundColor: "#ffffff", padding: "0.525rem" }} className="rounded form-control d-flex align-items-center gap-1">
                                    <span style={{ width: "15px", aspectRatio: "1", outline: "1px solid #ffffff", border: "1px solid black", backgroundColor: prevData?.page_1?.heading_color }}></span><span style={{ fontSize: "12px" }}>{prevData?.page_1?.heading_color}</span>
                                  </div>
                                </DropdownToggle>
                                <DropdownMenu className="p-0 drop_menu_custom">
                                  <DropdownItem className="p-0" style={{ width: "250px" }}>
                                    {getColorPicker({ key: "heading_color" })}
                                  </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </div>

                            <div className="py-1">
                              <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Font Size</label>
                              <Select styles={{
                                option: (provided, state) => {
                                  return ({ ...provided, fontSize: FONT_SIZE_OPTIONS[FONT_SIZE_OPTIONS?.findIndex($ => $?.value === state.value)]?.value })
                                }
                              }} value={FONT_SIZE_OPTIONS?.filter($ => $.value === prevData?.page_1?.heading_font_size)} options={FONT_SIZE_OPTIONS} id="heading_font_size" onChange={(eventData) => {
                                const e = { target: { name: "heading_font_size", value: eventData.value } }
                                handleDataChange(e)
                              }} />
                            </div>

                          </AccordionBody>
                        </AccordionItem>
                        <AccordionItem>
                          <AccordionHeader className='acc-header border-top' targetId='2' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                            <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Sub Header</label>
                          </AccordionHeader>
                          <AccordionBody accordionId='2'>
                            <div className="py-1">
                              <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Sub-heading</label>
                              <textarea onChange={handleDataChange} value={prevData?.page_1?.sub_heading} name="sub_heading" className="form-control" id="sub_heading" placeholder="Sub-heading" />
                            </div>
                            <div className="py-1">
                              <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Sub-heading Font</label>
                              <Select styles={{
                                option: (provided, state) => {
                                  return ({ ...provided, fontFamily: fontStyles[fontStyles?.findIndex($ => $?.value === state.value)]?.value })
                                }
                              }} value={fontStyles?.filter($ => $.value === prevData?.page_1?.secondary_font)} options={fontStyles} id="secondary_font" onChange={(eventData) => {
                                const e = { target: { name: "secondary_font", value: eventData.value } }
                                handleDataChange(e)
                              }} />
                            </div>

                            <div className="py-1">
                              <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Sub-heading Color</label>
                              <UncontrolledDropdown className="w-100 p-0" direction="start">
                                <DropdownToggle style={{ fontSize: "10px" }} className="rounded w-100 p-0">
                                  <div style={{ backgroundColor: "#ffffff", padding: "0.525rem" }} className="rounded form-control d-flex align-items-center gap-1">
                                    <span style={{ width: "15px", aspectRatio: "1", outline: "1px solid #ffffff", border: "1px solid black", backgroundColor: prevData?.page_1?.sub_heading_color }}></span><span style={{ fontSize: "12px" }}>{prevData?.page_1?.sub_heading_color}</span>
                                  </div>
                                </DropdownToggle>
                                <DropdownMenu className="p-0 drop_menu_custom">
                                  <DropdownItem className="p-0" style={{ width: "250px" }}>
                                    {getColorPicker({ key: "sub_heading_color" })}
                                  </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </div>

                            <div className="py-1">
                              <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Font Size</label>
                              <Select styles={{
                                option: (provided, state) => {
                                  return ({ ...provided, fontSize: FONT_SIZE_OPTIONS[FONT_SIZE_OPTIONS?.findIndex($ => $?.value === state.value)]?.value })
                                }
                              }} value={FONT_SIZE_OPTIONS?.filter($ => $.value === prevData?.page_1?.sub_heading_font_size)} options={FONT_SIZE_OPTIONS} id="sub_heading_font_size" onChange={(eventData) => {
                                const e = { target: { name: "sub_heading_font_size", value: eventData.value } }
                                handleDataChange(e)
                              }} />
                            </div>

                          </AccordionBody>
                        </AccordionItem>
                      </UncontrolledAccordion>
                    </div>}

                    {sideNav === "contentAF" && <div style={{ transition: "0.3s ease-in-out", overflow: "auto", width: "450px", transform: `translateX(${sideNav === "contentAF" ? "0px" : "-450px"})`, position: "absolute", inset: "0px" }}>
                      <UncontrolledAccordion stayOpen defaultOpen={["1"]}>
                        <AccordionItem>
                          <AccordionHeader className='acc-header border-top' targetId='1' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                            <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Header</label>
                          </AccordionHeader>
                          <AccordionBody accordionId='1'>
                            <div className="py-1">
                              <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Heading</label>
                              <textarea onChange={handleDataChange} value={prevData?.page_1?.headingAf} name="headingAf" type="text" className="form-control" id="headingAf" placeholder="Heading" />
                            </div>
                            <div className="py-1">
                              <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Heading Font</label>
                              <Select styles={{
                                option: (provided, state) => {
                                  return ({ ...provided, fontFamily: fontStyles[fontStyles?.findIndex($ => $?.value === state.value)]?.value })
                                }
                              }} value={fontStyles?.filter($ => $.value === prevData?.page_1?.primary_fontAf)} options={fontStyles} id="primary_fontAf" onChange={(eventData) => {
                                const e = { target: { name: "primary_fontAf", value: eventData.value } }
                                handleDataChange(e)
                              }} />
                            </div>

                            <div className="py-1">
                              <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Heading Color</label>
                              <UncontrolledDropdown className="w-100 p-0" direction="start">
                                <DropdownToggle style={{ fontSize: "10px" }} className="rounded w-100 p-0">
                                  <div style={{ backgroundColor: "#ffffff", padding: "0.525rem" }} className="rounded form-control d-flex align-items-center gap-1">
                                    <span style={{ width: "15px", aspectRatio: "1", outline: "1px solid #ffffff", border: "1px solid black", backgroundColor: prevData?.page_1?.heading_colorAf }}></span><span style={{ fontSize: "12px" }}>{prevData?.page_1?.heading_colorAf}</span>
                                  </div>
                                </DropdownToggle>
                                <DropdownMenu className="p-0 drop_menu_custom">
                                  <DropdownItem className="p-0" style={{ width: "250px" }}>
                                    {getColorPicker({ key: "heading_colorAf" })}
                                  </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </div>

                            <div className="py-1">
                              <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Font Size</label>
                              <Select styles={{
                                option: (provided, state) => {
                                  return ({ ...provided, fontSize: FONT_SIZE_OPTIONS[FONT_SIZE_OPTIONS?.findIndex($ => $?.value === state.value)]?.value })
                                }
                              }} value={FONT_SIZE_OPTIONS?.filter($ => $.value === prevData?.page_1?.heading_font_sizeAf)} options={FONT_SIZE_OPTIONS} id="heading_font_sizeAf" onChange={(eventData) => {
                                const e = { target: { name: "heading_font_sizeAf", value: eventData.value } }
                                handleDataChange(e)
                              }} />
                            </div>

                          </AccordionBody>
                        </AccordionItem>
                        <AccordionItem>
                          <AccordionHeader className='acc-header border-top' targetId='2' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                            <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Sub Header</label>
                          </AccordionHeader>
                          <AccordionBody accordionId='2'>
                            <div className="py-1">
                              <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Sub-heading</label>
                              <textarea onChange={handleDataChange} value={prevData?.page_1?.sub_headingAf} name="sub_headingAf" className="form-control" id="sub_headingAf" placeholder="Sub-heading" />
                            </div>
                            <div className="py-1">
                              <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Sub-heading Font</label>
                              <Select styles={{
                                option: (provided, state) => {
                                  return ({ ...provided, fontFamily: fontStyles[fontStyles?.findIndex($ => $?.value === state.value)]?.value })
                                }
                              }} value={fontStyles?.filter($ => $.value === prevData?.page_1?.secondary_fontAf)} options={fontStyles} id="secondary_fontAf" onChange={(eventData) => {
                                const e = { target: { name: "secondary_fontAf", value: eventData.value } }
                                handleDataChange(e)
                              }} />
                            </div>

                            <div className="py-1">
                              <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Sub-heading Color</label>
                              <UncontrolledDropdown className="w-100 p-0" direction="start">
                                <DropdownToggle style={{ fontSize: "10px" }} className="rounded w-100 p-0">
                                  <div style={{ backgroundColor: "#ffffff", padding: "0.525rem" }} className="rounded form-control d-flex align-items-center gap-1">
                                    <span style={{ width: "15px", aspectRatio: "1", outline: "1px solid #ffffff", border: "1px solid black", backgroundColor: prevData?.page_1?.sub_heading_colorAf }}></span><span style={{ fontSize: "12px" }}>{prevData?.page_1?.sub_heading_colorAf}</span>
                                  </div>
                                </DropdownToggle>
                                <DropdownMenu className="p-0 drop_menu_custom">
                                  <DropdownItem className="p-0" style={{ width: "250px" }}>
                                    {getColorPicker({ key: "sub_heading_colorAf" })}
                                  </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </div>

                            <div className="py-1">
                              <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Font Size</label>
                              <Select styles={{
                                option: (provided, state) => {
                                  return ({ ...provided, fontSize: FONT_SIZE_OPTIONS[FONT_SIZE_OPTIONS?.findIndex($ => $?.value === state.value)]?.value })
                                }
                              }} value={FONT_SIZE_OPTIONS?.filter($ => $.value === prevData?.page_1?.sub_heading_font_sizeAf)} options={FONT_SIZE_OPTIONS} id="sub_heading_font_sizeAf" onChange={(eventData) => {
                                const e = { target: { name: "sub_heading_font_sizeAf", value: eventData.value } }
                                handleDataChange(e)
                              }} />
                            </div>

                          </AccordionBody>
                        </AccordionItem>
                      </UncontrolledAccordion>
                    </div>}

                    {sideNav === "successMessage" && <div style={{ transition: "0.3s ease-in-out", overflow: "auto", width: "450px", transform: `translateX(${sideNav === "successMessage" ? "0px" : "-450px"})`, position: "absolute", inset: "0px" }}>
                      <UncontrolledAccordion stayOpen defaultOpen={["1"]}>
                        <AccordionItem>
                          <AccordionHeader className='acc-header border-top' targetId='1' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                            <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Header</label>
                          </AccordionHeader>
                          <AccordionBody accordionId='1'>
                            <div className="py-1">
                              <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Heading</label>
                              <textarea onChange={handleDataChange2} value={prevData?.page_2?.heading} name="heading" type="text" className="form-control" id="heading" placeholder="Heading" />
                            </div>
                            <div className="py-1">
                              <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Heading Font</label>
                              <Select styles={{
                                option: (provided, state) => {
                                  return ({ ...provided, fontFamily: fontStyles[fontStyles?.findIndex($ => $?.value === state.value)]?.value })
                                }
                              }} value={fontStyles?.filter($ => $.value === prevData?.page_2?.primary_font)} options={fontStyles} id="primary_font" onChange={(eventData) => {
                                const e = { target: { name: "primary_font", value: eventData.value } }
                                handleDataChange2(e)
                              }} />
                            </div>

                            <div className="py-1">
                              <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Heading Color</label>
                              <UncontrolledDropdown className="w-100 p-0" direction="start">
                                <DropdownToggle style={{ fontSize: "10px" }} className="rounded w-100 p-0">
                                  <div style={{ backgroundColor: "#ffffff", padding: "0.525rem" }} className="rounded form-control d-flex align-items-center gap-1">
                                    <span style={{ width: "15px", aspectRatio: "1", outline: "1px solid #ffffff", border: "1px solid black", backgroundColor: prevData?.page_2?.heading_color }}></span><span style={{ fontSize: "12px" }}>{prevData?.page_2?.heading_color}</span>
                                  </div>
                                </DropdownToggle>
                                <DropdownMenu className="p-0 drop_menu_custom">
                                  <DropdownItem className="p-0" style={{ width: "250px" }}>
                                    {getColorPicker({ key: "heading_color" })}
                                  </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </div>

                            <div className="py-1">
                              <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Font Size</label>
                              <Select styles={{
                                option: (provided, state) => {
                                  return ({ ...provided, fontSize: FONT_SIZE_OPTIONS[FONT_SIZE_OPTIONS?.findIndex($ => $?.value === state.value)]?.value })
                                }
                              }} value={FONT_SIZE_OPTIONS?.filter($ => $.value === prevData?.page_2?.heading_font_size)} options={FONT_SIZE_OPTIONS} id="heading_font_size" onChange={(eventData) => {
                                const e = { target: { name: "heading_font_size", value: eventData.value } }
                                handleDataChange2(e)
                              }} />
                            </div>

                          </AccordionBody>
                        </AccordionItem>
                        <AccordionItem>
                          <AccordionHeader className='acc-header border-top' targetId='2' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                            <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Sub Header</label>
                          </AccordionHeader>
                          <AccordionBody accordionId='2'>
                            <div className="py-1">
                              <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Sub-heading</label>
                              <textarea onChange={handleDataChange2} value={prevData?.page_2?.sub_heading} name="sub_heading" className="form-control" id="sub_heading" placeholder="Sub-heading" />
                            </div>
                            <div className="py-1">
                              <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Sub-heading Font</label>
                              <Select styles={{
                                option: (provided, state) => {
                                  return ({ ...provided, fontFamily: fontStyles[fontStyles?.findIndex($ => $?.value === state.value)]?.value })
                                }
                              }} value={fontStyles?.filter($ => $.value === prevData?.page_2?.secondary_font)} options={fontStyles} id="secondary_font" onChange={(eventData) => {
                                const e = { target: { name: "secondary_font", value: eventData.value } }
                                handleDataChange2(e)
                              }} />
                            </div>

                            <div className="py-1">
                              <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Sub-heading Color</label>
                              <UncontrolledDropdown className="w-100 p-0" direction="start">
                                <DropdownToggle style={{ fontSize: "10px" }} className="rounded w-100 p-0">
                                  <div style={{ backgroundColor: "#ffffff", padding: "0.525rem" }} className="rounded form-control d-flex align-items-center gap-1">
                                    <span style={{ width: "15px", aspectRatio: "1", outline: "1px solid #ffffff", border: "1px solid black", backgroundColor: prevData?.page_2?.sub_heading_color }}></span><span style={{ fontSize: "12px" }}>{prevData?.page_2?.sub_heading_color}</span>
                                  </div>
                                </DropdownToggle>
                                <DropdownMenu className="p-0 drop_menu_custom">
                                  <DropdownItem className="p-0" style={{ width: "250px" }}>
                                    {getColorPicker({ key: "sub_heading_color" })}
                                  </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </div>

                            <div className="py-1">
                              <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Font Size</label>
                              <Select styles={{
                                option: (provided, state) => {
                                  return ({ ...provided, fontSize: FONT_SIZE_OPTIONS[FONT_SIZE_OPTIONS?.findIndex($ => $?.value === state.value)]?.value })
                                }
                              }} value={FONT_SIZE_OPTIONS?.filter($ => $.value === prevData?.page_2?.sub_heading_font_size)} options={FONT_SIZE_OPTIONS} id="sub_heading_font_size" onChange={(eventData) => {
                                const e = { target: { name: "sub_heading_font_size", value: eventData.value } }
                                handleDataChange2(e)
                              }} />
                            </div>

                          </AccordionBody>
                        </AccordionItem>
                      </UncontrolledAccordion>
                    </div>}

                    {sideNav === "formFeilds" && <div style={{ transition: "0.3s ease-in-out", overflow: "auto", width: "450px", transform: `translateX(${sideNav === "formFeilds" ? "0px" : "-450px"})`, position: "absolute", inset: "0px" }}>
                      <UncontrolledAccordion stayOpen defaultOpen={["1"]}>
                        <AccordionItem>
                          <AccordionHeader className='acc-header border-top' targetId='1' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                            <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Email Marketing Settings</label>
                          </AccordionHeader>
                          <AccordionBody accordionId='1'>
                            
                              {currPage === "page_1" && <div className="py-1">
                                <Col md={12} style={{ marginBottom: "1.25rem" }}>
                                  <h5 style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0 mb-1">Opt-in</h5>
                                  <div className="d-flex gap-2 flex-column">

                                    <div className="d-flex justify-content-between align-items-center">
                                      <label htmlFor="opt_in_email" className="form-check-label">Email Opt-in</label>
                                      <div className="form-check-success form-switch cursor-pointer">
                                        <input className="form-check-input cursor-pointer" type="checkbox" checked={prevData?.[`page_1`]?.opt_in_email === "email"} id="opt_in_email" onChange={(e) => {
                                          const updatedData = {
                                            opt_in_both: "",
                                            opt_in_email: e.target.checked ? e.target.value : ""
                                          }
                                          // setPrevData({ ...prevData, page_1: { ...prevData.page_1, ...updatedData } })
                                          setCurrObj({ ...currObj, ...updatedData })
                                        }} name="opt_in_email" value={"email"} />
                                        
                                      </div>

                                    </div>


                                    <div className="d-flex justify-content-between align-items-center">
                                      <label htmlFor="opt_in_sms" className="form-check-label">SMS Opt-in</label>
                                      <div className="form-check-success form-switch cursor-pointer">
                                        <input className="form-check-input cursor-pointer" type="checkbox" checked={prevData?.[`page_1`]?.opt_in_sms === "sms"} id="opt_in_sms" onChange={(e) => {
                                          const updatedData = {
                                            opt_in_both: "",
                                            opt_in_sms: e.target.checked ? e.target.value : ""
                                          }
                                          // setPrevData({ ...prevData, page_1: { ...prevData.page_1, ...updatedData } })
                                          setCurrObj({ ...currObj, ...updatedData })
                                        }} name="opt_in_sms" value={"sms"}/>
                                        
                                      </div>

                                    </div>

                                    <div className="d-flex justify-content-between align-items-center">
                                      <label htmlFor="opt_in_both" className="form-check-label">Opt-in for marketing communication</label>
                                      <div className="form-check-success form-switch cursor-pointer">
                                        <input className="form-check-input cursor-pointer" type="checkbox" checked={prevData?.[`page_1`]?.opt_in_both === "both"} id="opt_in_both" onChange={(e) => {

                                          const updatedData = {
                                            opt_in_both: e.target.checked ? e.target.value : "",
                                            opt_in_email: "",
                                            opt_in_sms: ""
                                          }
                                          // setPrevData({ ...prevData, page_1: { ...prevData.page_1, ...updatedData } })
                                          setCurrObj({ ...currObj, ...updatedData })
                                          }} name="opt_in_both" value={"both"} />
                                        
                                      </div>

                                    </div>

                                  </div>
                                </Col>

                                {currPage === "page_1" && (
                                  <>
                                    {
                                      prevData?.page_1?.opt_in_email === "email" && (
                                        <>
                                          <Col md={12} style={{ marginBottom: "1.25rem" }}>
                                            <div className="d-flex justify-content-between align-items-center" style={{ marginBottom: '6px' }}>
                                              <label style={{ fontSize: "0.85rem" }} htmlFor="label_text">Email Text</label>
                                              <div className="d-flex align-items-center justify-content-between gap-1 form-check form-check-success m-0 p-0">
                                                <label style={{ fontSize: "0.85rem" }} htmlFor="keep_email_check">Keep Selected by Default</label>
                                                <input id="keep_email_check" checked={prevData?.page_1?.email_check} type='checkbox' className='form-check-input m-0 p-0' name="email_check" onChange={(e) => setCurrObj({ ...currObj, email_check: e.target.checked })} />
                                              </div>
                                            </div>
                                            <input className="form-control" value={prevData?.page_1?.label_text_email} id="label_text_email" name="label_text_email" onChange={handleDataChange} />
                                          </Col>

                                        </>
                                      )
                                    }
                                    {
                                      prevData?.page_1?.opt_in_sms === "sms" && (
                                        <>
                                          <Col md={12} style={{ marginBottom: "1.25rem" }}>
                                            <div className="d-flex justify-content-between align-items-center" style={{ marginBottom: '6px' }}>
                                              <label style={{ fontSize: "0.85rem" }} htmlFor="label_text">Sms Text</label>
                                              <div className="d-flex align-items-center justify-content-between gap-1 form-check form-check-success m-0 p-0">
                                                <label style={{ fontSize: "0.85rem" }} htmlFor="keep_sms_check">Keep Selected by Default</label>
                                                <input id="keep_sms_check" checked={prevData?.page_1?.sms_check} type='checkbox' className='form-check-input m-0 p-0' name="sms_check" onChange={(e) => setCurrObj({...currObj, sms_check: e.target.checked})} />
                                              </div>
                                            </div>
                                            <input className="form-control" value={prevData?.page_1?.label_text_sms} id="label_text_sms" name="label_text_sms" onChange={handleDataChange} />
                                          </Col>

                                        </>
                                      )
                                    }

                                    {
                                      prevData?.page_1?.opt_in_both === "both" && (
                                        <>
                                          <Col md={12} style={{ marginBottom: "1.25rem" }}>
                                            <div className="d-flex justify-content-between align-items-center" style={{ marginBottom: '6px' }}>
                                              <label style={{ fontSize: "0.85rem" }} htmlFor="label_text">Opt-in for marketing communication</label>
                                              <div className="d-flex align-items-center justify-content-between gap-1 form-check form-check-success m-0 p-0">
                                                <label style={{ fontSize: "0.85rem" }} htmlFor="keep_both_check">Keep Selected by Default</label>
                                                <input id="keep_both_check" checked={prevData?.page_1?.both_check} type='checkbox' className='form-check-input m-0 p-0' name="both_check" onChange={(e) => setCurrObj({ ...currObj, both_check: e.target.checked })} />
                                              </div>
                                            </div>
                                            <input className="form-control" value={prevData?.page_1?.label_text_both} id="label_text_both" name="label_text_both" onChange={handleDataChange} />
                                          </Col>

                                        </>
                                      )
                                    }
                                  </>
                                )}
                                

                              </div>}

                          </AccordionBody>
                        </AccordionItem>
                        <AccordionItem>
                          <AccordionHeader className='acc-header border-top' targetId='2' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                            <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Passwords</label>
                          </AccordionHeader>
                          <AccordionBody accordionId='2'>
                            <div className="py-1 pt-0">
                              <div className="row">
                                <h5 style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0 mb-1">Password</h5>
                                
                                <div className="col-md-6">
                                  <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Title</label>
                                  <input onChange={handleDataChange} value={prevData?.["page_1"]?.password} name="password" type="text" className="form-control" id="password" placeholder="Password" />
                                </div>
                                <div className="col-md-6">
                                  <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Placeholder</label>
                                  <input onChange={handleDataChange} value={prevData?.["page_1"]?.password_placeHolder} name="password_placeHolder" type="text" className="form-control" id="password_placeHolder" placeholder="Password" /></div>
                              </div>
                            </div>
                            <div className="py-1">
                              <div className="row">
                                <h5 style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Confirm Password</h5>
                                
                                <div className="col-md-6">
                                  <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Title</label>
                                  <input onChange={handleDataChange} value={prevData?.["page_1"]?.confirm_password} name="confirm_password" type="text" className="form-control" id="confirm_password" placeholder="Confirm Password" />
                                </div>
                                <div className="col-md-6">
                                  <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Placeholder</label>
                                  <input onChange={handleDataChange} value={prevData?.["page_1"]?.confirm_password_placeHolder} name="confirm_password_placeHolder" type="text" className="form-control" id="confirm_password_placeHolder" placeholder="Confirm Password" />
                                </div>
                              </div>
                            </div>

                            <div className="py-1">
                              <Col md={12} style={{ marginBottom: "1.25rem" }}>
                                <div className="form-check-success form-switch cursor-pointer">
                                  <input className="form-check-input cursor-pointer" type="checkbox" checked={prevData?.[`page_1`]?.hidePassword} id="hidePassword" onChange={(e) => {
                                    setPrevData({...prevData, page_1: {...prevData?.page_1, hidePassword: e.target.checked}})
                                  }} name="hidePassword" /><label htmlFor="hidePassword" className="form-check-label ms-1">Show and hide Password icon.</label>
                                </div>
                              </Col>
                            </div>

                            <div className="py-1">
                              <Col md={12} style={{ marginBottom: "1.25rem" }}>
                                <div className="form-check-success form-switch cursor-pointer">
                                  <input className="form-check-input cursor-pointer" type="checkbox" checked={prevData?.[`page_1`]?.reEnter} id="reEnter" onChange={(e) => {
                                    setPrevData({...prevData, page_1: {...prevData?.page_1, reEnter: e.target.checked}})
                                  }} name="reEnter" /><label htmlFor="reEnter" className="form-check-label ms-1">Enter Re-Type password functionality.</label>
                                </div>
                              </Col>  
                            </div>


                          </AccordionBody>
                        </AccordionItem>

                        <AccordionItem>
                          <AccordionHeader className='acc-header border-top' targetId='3' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                            <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Additional Field</label>
                          </AccordionHeader>
                          <AccordionBody accordionId='3'>
                            <div>
                              <div className="d-flex justify-content-between align-items-center py-1 pt-0">
                                <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Date Of Birth</label>
                                <div className="form-check-success form-switch cursor-pointer">
                                  <input className="form-check-input cursor-pointer" type="checkbox" checked={prevData?.[`page_1`]?.dobToggle} id="dobToggle" onChange={(e) => {
                                    const updatedData = {
                                      dobToggle: e.target.checked
                                    }
                                    // setPrevData({ ...prevData, page_1: { ...prevData.page_1, ...updatedData } })
                                    setCurrObj({ ...currObj, ...updatedData })
                                  }} name="dobToggle"/>
                                  
                                </div>
                              </div>
                              {
                                prevData?.[`page_1`]?.dobToggle ? <>
                                  <div className="py-1">
                                    <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Date Format</label>
                                    <select className="form-control">
                                      <option value="dd-mm-yyy">DD-MM-YYYY</option>
                                      <option value="yyy-mm-dd">YYYY-MM-DD</option>
                                    </select>
                                  </div>
                                
                                </> : ''
                              }

                              <div className="d-flex justify-content-between align-items-center py-1">
                                <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0" htmlFor="dobToggle" >Gender</label>
                                <div className="form-check-success form-switch cursor-pointer">
                                  <input className="form-check-input cursor-pointer" type="checkbox" checked={prevData?.[`page_1`]?.gender} id="gender" onChange={(e) => {
                                    const updatedData = {
                                      gender: e.target.checked
                                    }
                                    // setPrevData({ ...prevData, page_1: { ...prevData.page_1, ...updatedData} })
                                    setCurrObj({ ...currObj, ...updatedData })
                                  }} name="gender"/>
                                  
                                </div>

                              </div>

                              {
                                prevData?.[`page_1`]?.gender ? <>
                                
                                <div className="d-flex justify-content-between align-items-center py-1">
                                  <label htmlFor="dobToggle" className="form-check-label">Male</label>
                                  <div className="form-check-success form-switch cursor-pointer">
                                    <input className="form-check-input cursor-pointer" type="checkbox" checked={true} disabled id="genderList" onChange={(e) => {
                                      const updatedData = {
                                        genderList: [...prevData?.page_1?.genderList, e.target.checked]
                                      }
                                      // setPrevData({ ...prevData, page_1: { ...prevData.page_1, ...updatedData} })
                                      setCurrObj({ ...currObj, ...updatedData })
                                    }} name="genderList"/>
                                    
                                  </div>

                                </div>

                                <div className="d-flex justify-content-between align-items-center py-1">
                                  <label htmlFor="dobToggle" className="form-check-label">Female</label>
                                  <div className="form-check-success form-switch cursor-pointer">
                                    <input className="form-check-input cursor-pointer" type="checkbox" checked={true} disabled id="genderList" onChange={(e) => {
                                      const updatedData = {
                                        genderList: [...prevData?.page_1?.genderList, e.target.checked]
                                      }
                                      // setPrevData({ ...prevData, page_1: { ...prevData.page_1, ...updatedData} })
                                      setCurrObj({ ...currObj, ...updatedData })
                                    }} name="genderList"/>
                                    
                                  </div>

                                </div>

                                <div className="d-flex justify-content-between align-items-center py-1">
                                  <label htmlFor="dobToggle" className="form-check-label">Non - Binary</label>
                                  <div className="form-check-success form-switch cursor-pointer">
                                    <input className="form-check-input cursor-pointer" type="checkbox" checked={prevData?.[`page_1`]?.genderList} id="genderList" onChange={(e) => {
                                      const updatedData = {
                                        genderList: [...prevData?.page_1?.genderList, e.target.checked]
                                      }
                                      // setPrevData({ ...prevData, page_1: { ...prevData.page_1, ...updatedData} })
                                      setCurrObj({ ...currObj, ...updatedData })
                                    }} name="genderList"/>
                                    
                                  </div>

                                </div>

                                <div className="d-flex justify-content-between align-items-center py-1">
                                  <label htmlFor="dobToggle" className="form-check-label">Rather not say</label>
                                  <div className="form-check-success form-switch cursor-pointer">
                                    <input className="form-check-input cursor-pointer" type="checkbox" checked={prevData?.[`page_1`]?.genderList} id="genderList" onChange={(e) => {
                                      const updatedData = {
                                        genderList: [...prevData?.page_1?.genderList, e.target.checked]
                                      }
                                      // setPrevData({ ...prevData, page_1: { ...prevData.page_1, ...updatedData} })
                                      setCurrObj({ ...currObj, ...updatedData })
                                    }} name="genderList"/>
                                    
                                  </div>

                                </div>
                                
                                </> : ''
                              }

                            </div>
                          </AccordionBody>
                        </AccordionItem>
                      </UncontrolledAccordion>
                      
                    </div>}

                    {
                      sideNav === "securityOptions" && <div style={{ transition: "0.3s ease-in-out", overflow: "auto", width: "450px", transform: `translateX(${sideNav === "securityOptions" ? "0px" : "-450px"})`, position: "absolute", inset: "0px" }}>
                      <UncontrolledAccordion stayOpen defaultOpen={["1"]}>
                        <AccordionItem>
                          <AccordionHeader className='acc-header border-top' targetId='1' style={{borderBottom: '1px solid #EBE9F1', borderRadius: '0'}}>
                            <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Security Options</label>
                          </AccordionHeader>
                          <AccordionBody accordionId='1'>

                            <div className="py-1">
                              <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Set Password length</label>
                              <input onChange={(e) => {
                                if (!isNaN(e.target.value)) {
                                  handleDataChange(e)
                                }
                              }} value={prevData?.["page_1"]?.passwordLength} name="passwordLength" type="text" className="form-control" id="passwordLength" placeholder="Set Password length" />
                            </div>

                            <div className="py-1">
                              <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Default Form Validation Message. Note {'{{n}}'} is replaced by actual length</label>
                              <input onChange={handleDataChange} value={prevData?.["page_1"]?.validationMessage} name="validationMessage" type="text" className="form-control" id="validationMessage" placeholder="Default Form Validation Message" />
                            </div>
                            
                            <div className="py-1">
                              <Col md={12} style={{ marginBottom: "1.25rem" }}>
                                <div className="form-check-success form-switch cursor-pointer">
                                  <input className="form-check-input cursor-pointer" type="checkbox" checked={prevData?.[`page_1`]?.contain} id="contain" onChange={(e) => {
                                    setCurrObj({...currObj, contain: e.target.checked})
                                    // setPrevData({...prevData, page_1: {...prevData?.page_1, contain: e.target.checked}})
                                  }} name="contain" /><label htmlFor="contain" className="form-check-label ms-1">Must Contain both numeric and alphabetic characters.</label>
                                </div>
                              </Col>
                            </div>

                          </AccordionBody>
                        </AccordionItem>
                      </UncontrolledAccordion>
                    </div>
                    }

                    {sideNav === "button" && <div style={{ transition: "0.3s ease-in-out", overflow: "auto", width: "450px", transform: `translateX(${sideNav === "button" ? "0px" : "-450px"})`, position: "absolute", inset: "0px" }}>

                      <UncontrolledAccordion stayOpen defaultOpen={["1"]}>
                        <AccordionItem>
                          <AccordionHeader className='acc-header border-top' targetId='1' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                            <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Button</label>
                          </AccordionHeader>
                          <AccordionBody accordionId='1'>
                            <div className="py-1">
                              <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Button Text</label>
                              <input onChange={handleDataChange} value={prevData?.[currPage]?.button_text} name="button_text" type="text" className="form-control" id="button_text" placeholder="Button Text" />
                            </div>
                            <div className="py-1">
                              <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Button Text Color</label>
                              <UncontrolledDropdown className="w-100 p-0" direction="start">
                                <DropdownToggle style={{ fontSize: "10px" }} className="rounded w-100 p-0">
                                  <div style={{ backgroundColor: "#ffffff", padding: "0.525rem" }} className="rounded form-control d-flex align-items-center gap-1">
                                    <span style={{ width: "15px", aspectRatio: "1", outline: "1px solid #ffffff", border: "1px solid black", backgroundColor: prevData?.[currPage]?.button_color }}></span><span style={{ fontSize: "12px" }}>{prevData?.[currPage]?.button_color}</span>
                                  </div>
                                </DropdownToggle>
                                <DropdownMenu className="p-0 drop_menu_custom">
                                  <DropdownItem className="p-0" style={{ width: "250px" }}>
                                    {getColorPicker({ key: "button_color" })}
                                  </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </div>

                            <div className="py-1">
                              <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Button Color</label>
                              <UncontrolledDropdown className="w-100 p-0" direction="start">
                                <DropdownToggle style={{ fontSize: "10px" }} className="rounded w-100 p-0">
                                  <div style={{ backgroundColor: "#ffffff", padding: "0.525rem" }} className="rounded form-control d-flex align-items-center gap-1">
                                    <span style={{ width: "15px", aspectRatio: "1", outline: "1px solid #ffffff", border: "1px solid black", backgroundColor: prevData?.[currPage]?.button_bg_color }}></span><span style={{ fontSize: "12px" }}>{prevData?.[currPage]?.button_bg_color}</span>
                                  </div>
                                </DropdownToggle>
                                <DropdownMenu className="p-0 drop_menu_custom">
                                  <DropdownItem className="p-0" style={{ width: "250px" }}>
                                    {getColorPicker({ key: "button_bg_color" })}
                                  </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </div>

                            {(!prevData?.page_1?.nextPage || currPage === "page_2") && <Col md={12} style={{ marginBottom: "1.25rem" }}>
                              <label style={{ fontSize: "0.85rem", marginBottom: '6px' }} htmlFor="redirect_url" className="form-control-label">Button Redirect URL</label>
                              <input onChange={handleDataChange} value={prevData?.[currPage]?.redirect_url} name="redirect_url" type="text" className="form-control" id="redirect_url" placeholder="Redirect URL" />
                            </Col>}

                          </AccordionBody>
                        </AccordionItem>
                      </UncontrolledAccordion>
                    </div>}

                    {sideNav === "Email" && <div style={{ transition: "0.3s ease-in-out", overflow: "auto", width: "450px", transform: `translateX(${sideNav === "Email" ? "0px" : "-450px"})`, position: "absolute", inset: "0px" }}>
                      <UncontrolledAccordion stayOpen defaultOpen={["1"]}>
                        <AccordionItem>
                            <AccordionHeader className='acc-header border-top' targetId='1' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                              <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Email</label>
                            </AccordionHeader>
                            <AccordionBody accordionId='1' className="w-100">
                              <div className="py-1">
                                <label style={{ fontSize: "0.85rem", width: '100%' }} className="form-check-label m-0 p-0">Email From</label>
                                {
                                  outletSenderId ? <input onChange={handleDataChange} value={outletSenderId} name="email_from" type="text" className="form-control" id="email_from" placeholder="Email From" disabled /> : <Link className="btn btn-sm btn-primary" to={`/merchant/campaign/verify_your_email/${outletData[0]?.id}`}>Select Sender Email</Link>
                                }
                                
                              </div>

                              <div className="py-1">
                                <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Subject</label>
                                <input onChange={handleDataChange} value={prevData?.page_1?.subject} name="subject" type="text" className="form-control" id="subject" placeholder="Subject" />
                            </div>
                            </AccordionBody>
                        </AccordionItem>
                      </UncontrolledAccordion>
                    </div>}

                    </div>
                  </div>

                <div id='preview-section-only' className="d-flex flex-column flex-grow-1 align-items-center bg-light-secondary position-relative">
                  <Row className="w-100">
                    {
                      sideNav !== "Email" ? (
                        <>
                            <Col md="12">
                              <div className="d-flex justify-content-center align-items-center">
                                <div className="switch d-flex justify-content-center align-items-center m-2">
                                  <div className={`page_1 d-flex justify-content-center align-items-center pages ${currPage === "page_1" ? "active" : ''}`} onClick={() => setCurrPage('page_1')} style={{padding: '10px 15px', cursor: 'pointer'}}>
                                    <p className="p-0 m-0">Main Page</p>
                                  </div>
                                  <div className={`page_2 d-flex justify-content-center align-items-center pages ${currPage === "page_2" ? "active" : ''}`} onClick={() => {
                                    setCurrPage('page_2')
                                    setSideHeaderNav("form")
                                    setSideNav("successMessage")
                                  }} style={{padding: '10px 15px', cursor: 'pointer'}}>
                                    <p className="p-0 m-0">Account Success Page</p>
                                  </div>
                                </div>
                                {/* <div className="form-check-success form-switch">
                                  <input className="form-check-input m-0 cursor-pointer" type="checkbox" role="switch" id="flexSwitchCheckChecked" onChange={(e) => {
                                    setPrevData({ ...prevData, page_1: { ...prevData?.page_1, nextPage: e.target.checked } })
                                    e.target.checked ? setCurrPage(currPage) : setCurrPage("page_1")
                                  }} checked={prevData?.page_1?.nextPage} />
                                </div> */}

                              </div>
                            </Col>
                        </>
                      ) : ''
                    }

                    <div style={{ width: '630px', margin: '0 auto' }}>
                      <div className="mt-4" onClick={() => setEditorBar(!editorBar)} onBlur={() => setEditorBar(!editorBar)}>
                        {
                          sideNav === "Email" ? (
                            <>
                              <Card
                                style={{ border: "1px solid #eee", height: '600px', overflowY: "auto"}}
                              >
                                <CardBody>
                                  <div
                                    style={{ padding: "10px 20px", lineHeight: '25px', color: "#424242" }}
                                    colSpan={2}
                                    bgcolor="#fff"
                                    align="center"
                                  >
                                    <font size={3} face="sans-serif">
                                      <div id="emailTemplateId">
                                        <BasicEditor elementId={`emailTemplateId`}
                                          style={{ width: '100%' }} key={sideNav}
                                          hideToolbar={editorBar}
                                          editorState={prevData?.editorState}
                                          htmlContent={prevData?.htmlContent}
                                          onChange={(html, ediorState) => {
                                            console.log(html, ediorState)
                                            const updatedData = {
                                              editorState: ediorState,
                                              htmlContent: html
                                            }

                                            setCurrObj((pre) => ({
                                              ...pre,
                                              ...updatedData
                                            }))

                                          }}
                                        />
                                      </div>
                                    </font>
                                  </div>
                                </CardBody>
                              </Card>
                            </>
                          ) : (
                            <>
                              {currPage === "page_1" ? (
                                <div className="previewSection">
                                  <div
                                    style={{
                                      padding: "40px",
                                      border: "solid 1px rgb(239, 239, 239)",
                                      boxShadow: "1px 1px 13px 3px rgba(0,0,0,0.05)",
                                      background: "white",
                                      borderRadius: "10px",
                                      width: "500px",
                                      margin: "auto",
                                      wordBreak: "break-word"
                                    }}
                                  >
                                    <div>
                                      <div
                                        style={{
                                          color: prevData?.["page_1"]?.heading_color,
                                          marginTop: "0px",
                                          fontSize: prevData?.["page_1"]?.heading_font_size,
                                          fontWeight: "600",
                                          lineHeight: "auto",
                                          fontFamily: prevData?.["page_1"]?.primary_font
                                        }}
                                        className="cursor-pointer"
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          setSideHeaderNav("form")
                                          setSideNav("contentBF")
                                        }} 
                                      >
                                        {prevData?.["page_1"]?.heading}
                                      </div>
                                      <div
                                        style={{
                                          fontSize: prevData?.["page_1"]?.sub_heading_font_size,
                                          fontWeight: "300",
                                          marginTop: 10,
                                          color: prevData?.["page_1"]?.sub_heading_color,
                                          lineHeight: "auto",
                                          fontFamily: prevData?.["page_1"]?.secondary_font
                                        }}
                                        className="cursor-pointer"
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          setSideHeaderNav("form")
                                          setSideNav("contentBF")
                                        }}
                                      >
                                        {prevData?.["page_1"]?.sub_heading}
                                      </div>
                                      <div style={{ marginTop: 30, padding: "0 40px 0 0" }} 
                                        className="cursor-pointer"
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          setSideHeaderNav("form")
                                          setSideNav("formFeilds")
                                        }} >
                                        <div
                                          style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "start",
                                            fontFamily: prevData?.["page_1"]?.secondary_font
                                          }}
                                        >
                                          <div htmlFor="" style={{ fontSize: 15, color: "rgb(91, 91, 91)" }}>
                                            {prevData?.["page_1"]?.password}
                                          </div>
                                          <input
                                            type="password"
                                            placeholder={prevData?.["page_1"]?.password_placeHolder}
                                            style={{
                                              width: "100%",
                                              border: "solid 1px rgb(185, 185, 185)",
                                              borderRadius: 5,
                                              fontSize: 14,
                                              padding: "10px 20px",
                                              marginTop: 5,
                                              outline: "none",
                                              color: "rgb(67, 67, 67)",
                                              letterSpacing: 1
                                            }}
                                            disabled
                                          />
                                        </div>
                                        {
                                          prevData?.page_1?.reEnter ? <>
                                            <div
                                              style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "start",
                                                marginTop: 20,
                                                fontFamily: prevData?.["page_1"]?.secondary_font
                                              }}
                                            >
                                              <div htmlFor="" style={{ fontSize: 15, color: "rgb(91, 91, 91)" }}>
                                                {prevData?.["page_1"]?.confirm_password}
                                              </div>
                                              <input
                                                type="password"
                                                placeholder={prevData?.["page_1"]?.confirm_password_placeHolder}
                                                style={{
                                                  width: "100%",
                                                  border: "solid 1px rgb(185, 185, 185)",
                                                  borderRadius: 5,
                                                  fontSize: 14,
                                                  padding: "10px 20px",
                                                  marginTop: 5,
                                                  outline: "none",
                                                  color: "rgb(67, 67, 67)",
                                                  letterSpacing: 1
                                                }}
                                                disabled
                                              />
                                            </div>
                                          </> : ''
                                        }
                                        
                                      </div>

                                      {
                                        prevData?.page_1?.opt_in_email === "email" && (
                                          <>
                                            <div
                                              style={{
                                                fontFamily: prevData?.["page_1"]?.secondary_font,
                                                display: "flex",
                                                gap: "10px",
                                                alignItems: "center",
                                                justifyContent: "start",
                                                marginTop: "10px"
                                              }}
                                              className="cursor-pointer"
                                              onClick={(e) => {
                                                e.stopPropagation()
                                                setSideHeaderNav("form")
                                                setSideNav("formFeilds")
                                              }}
                                              >
                                              <input type="checkbox" id="preview_opt_in_checkbox" checked={prevData?.page_1?.email_check} />
                                              <label htmlFor="preview_opt_in_checkbox">{prevData?.page_1?.label_text_email}</label>
                                            </div>

                                          </>
                                        )
                                      }

                                      {
                                        prevData?.page_1?.opt_in_sms === "sms" && (
                                          <>
                                            <div
                                              style={{
                                                fontFamily: prevData?.["page_1"]?.secondary_font,
                                                display: "flex",
                                                gap: "10px",
                                                alignItems: "center",
                                                justifyContent: "start",
                                                marginTop: "10px"
                                              }}
                                              className="cursor-pointer"
                                              onClick={(e) => {
                                                e.stopPropagation()
                                                setSideHeaderNav("form")
                                                setSideNav("formFeilds")
                                              }}
                                              >
                                              <input type="checkbox" id="preview_opt_in_checkbox" checked={prevData?.page_1?.sms_check} />
                                              <label htmlFor="preview_opt_in_checkbox">{prevData?.page_1?.label_text_sms}</label>
                                            </div>
                                          </>
                                        )
                                      }

                                      {
                                        prevData?.page_1?.opt_in_both === "both" && (
                                          <>
                                            <div
                                              style={{
                                                fontFamily: prevData?.["page_1"]?.secondary_font,
                                                display: "flex",
                                                gap: "10px",
                                                alignItems: "center",
                                                justifyContent: "start",
                                                marginTop: "10px"
                                              }}
                                              className="cursor-pointer"
                                              onClick={(e) => {
                                                e.stopPropagation()
                                                setSideHeaderNav("form")
                                                setSideNav("formFeilds")
                                              }}
                                              >
                                              <input type="checkbox" id="preview_opt_in_checkbox" checked={prevData?.page_1?.both_check} />
                                              <label htmlFor="preview_opt_in_checkbox">{prevData?.page_1?.label_text_both}</label>
                                            </div>
                                          </>
                                        )
                                      }

                                      <div
                                        style={{
                                          display: "grid",
                                          placeContent: "center",
                                          padding: "10px 30px",
                                          border: `solid 1px ${prevData?.["page_1"]?.button_color}`,
                                          backgroundColor: prevData?.["page_1"]?.button_bg_color,
                                          color: prevData?.["page_1"]?.button_color,
                                          fontSize: "15px",
                                          borderRadius: "5px",
                                          margin: "auto",
                                          marginTop: "25px",
                                          cursor: "pointer",
                                          fontFamily: prevData?.["page_1"]?.secondary_font
                                        }}
                                        className="cursor-pointer"
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          setSideHeaderNav("form")
                                          setSideNav("button")
                                        }}
                                      >
                                        {prevData?.["page_1"]?.button_text}
                                      </div>
                                      <div
                                        style={{
                                          color: prevData?.["page_1"]?.heading_colorAf,
                                          marginTop: "0px",
                                          fontSize: prevData?.["page_1"]?.heading_font_sizeAf,
                                          fontWeight: "600",
                                          lineHeight: "auto",
                                          fontFamily: prevData?.["page_1"]?.primary_fontAf
                                        }}
                                      >
                                        {prevData?.["page_1"]?.headingAf}
                                      </div>
                                      <div
                                        style={{
                                          fontSize: prevData?.["page_1"]?.sub_heading_font_sizeAf,
                                          fontWeight: "300",
                                          marginTop: 10,
                                          color: prevData?.["page_1"]?.sub_heading_colorAf,
                                          lineHeight: "auto",
                                          fontFamily: prevData?.["page_1"]?.secondary_fontAf
                                        }}
                                      >
                                        {prevData?.["page_1"]?.sub_headingAf}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="previewSection">
                                  <div style={{ padding: '40px', border: 'solid 1px rgb(239, 239, 239)', boxShadow: '1px 1px 13px 3px rgba(0,0,0,0.05)', background: 'white', borderRadius: '10px', width: '500px', margin: "auto", wordBreak: "break-word" }}>
                                    <div>
                                      <div style={{ color: 'rgb(62, 62, 62)', marginTop: 0, fontSize: prevData?.["page_2"]?.heading_font_size, fontWeight: 600, lineHeight: 'auto', color: prevData?.["page_2"]?.heading_color, fontFamily: prevData?.page_2?.primary_font }}>
                                        {prevData?.["page_2"]?.heading}</div>
                                      <div style={{ fontSize: prevData?.["page_2"]?.sub_heading_font_size, fontWeight: 400, marginTop: '10px', color: 'rgb(91, 91, 91)', lineHeight: 'auto', color: prevData?.["page_2"]?.sub_heading_color, fontFamily: prevData?.page_2?.secondary_font }}>
                                        {prevData?.["page_2"]?.sub_heading}
                                      </div>
                                      <div style={{ display: 'grid', placeContent: 'center', padding: '10px 30px', border: `solid 1px ${prevData?.["page_2"]?.button_color}`, backgroundColor: prevData?.["page_2"]?.button_bg_color, color: prevData?.["page_2"]?.button_color, fontSize: '15px', borderRadius: '5px', marginTop: '20px', fontFamily: prevData?.page_2?.secondary_font }}>
                                        {prevData?.["page_2"]?.button_text}
                                      </div>
                                      {/* <div style={{ color: 'rgb(62, 62, 62)', marginTop: '25px', fontSize: '19px', fontWeight: 600, lineHeight: '25px' }}>
                                        Your membership has been activated.</div>
                                      <div style={{ fontSize: '14px', fontWeight: 400, marginTop: '10px', color: 'rgb(91, 91, 91)', lineHeight: '20px' }}>
                                        Just submit a password to activate your account. There are NO monthly fees or ads EVER Your
                                        membership gives you access to
                                      </div> */}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </>
                          )
                        }

                      </div>
                    </div>
                  </Row>
                </div>
              </div>
            </div>
          </>
        ) : ''
      }
      <Modal className='modal-dialog-centered' isOpen={sendTest} toggle={() => setSendTest(!sendTest)}>
        <div class="modal-header d-flex justify-content-between align-items-center">
            <h5 class="modal-title m-0">Send Test Mail</h5>
            <a onClick={() => setSendTest(!sendTest)}>
                <X size={'20px'} />
            </a>
        </div>
        <ModalBody>
            <form id='adddomian'>
                <div className="row">
                    <div className="col-12 mb-1">
                      <label htmlFor="number_of_rows">Email</label>
                      <input type="text" className="form-control" value={prevData?.testMail} onChange={(e) => setPrevData({...prevData, testMail: e.target.value})} />
                    </div>
                </div>

            </form>
        </ModalBody>
        <ModalFooter>
            <Button outline onClick={() => setSendTest(!sendTest)}>
                Cancel
            </Button>
            <Button color='primary' onClick={() => sendTestMail()}>
                Send
            </Button>
        </ModalFooter>
    </Modal>
    </>
  )
}

export default AdminSetting