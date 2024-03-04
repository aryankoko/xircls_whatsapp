import React, { useContext, useEffect, useState } from "react"
import { Row, Col, Card, CardBody, Container, UncontrolledButtonDropdown, DropdownItem, DropdownToggle, DropdownMenu, UncontrolledDropdown } from "reactstrap"
import CustomColorModifier from "../FormBuilder/FormBuilder(components)/CustomColorModifier"
import FrontBaseLoader from "../Components/Loader/Loader"
import axios from "axios"
import { SuperLeadzBaseURL } from "../../assets/auth/jwtService"
import Select from 'react-select'
import { getCurrentOutlet } from "../Validator"
import { PermissionProvider } from "../../Helper/Context"
import { Pagination, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js'
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import 'swiper/modules/navigation/navigation.min.css'
import 'swiper/modules/autoplay/autoplay.min.css'
import toast from "react-hot-toast"
import "./Form.css"

const Form = () => {

  const outletData = getCurrentOutlet()

  const { userPermission } = useContext(PermissionProvider)

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
    { label: '25px', value: '25px' },
    { label: '26px', value: '26px' },
    { label: '27px', value: '27px' },
    { label: '28px', value: '28px' },
    { label: '29px', value: '29px' },
    { label: '30px', value: '30px' },
    { label: '31px', value: '31px' },
    { label: '32px', value: '32px' },
    { label: '33px', value: '33px' },
    { label: '34px', value: '34px' },
    { label: '35px', value: '35px' },
    { label: '36px', value: '36px' },
    { label: '37px', value: '37px' },
    { label: '38px', value: '38px' },
    { label: '39px', value: '39px' },
    { label: '40px', value: '40px' }
  ]

  const defaultData = {
    page_1: {
      heading: `Activate your FREE membership today!`,
      sub_heading: `Just submit a password to activate your account. There are NO monthly fees or ads EVER Your membership gives you access to additional new resources to help you succeed on your journey.`,
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
      nextPage: false
    },
    page_2: {
      heading: `Congratulations! Your account has been activated.`,
      sub_heading: `Remember to login to track your orders, request support, see updates and more...`,
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
    }
  }

  const [currPage, setCurrPage] = useState("page_1")

  const [prevData, setPrevData] = useState(defaultData)

  const [currObj, setCurrObj] = useState(defaultData?.[currPage])

  const [apiLoader, setApiLoader] = useState(false)

  console.log(prevData)

  const handleDataChange = (e) => {
    const obj = {...prevData}
    if (e.target.name?.includes("password") && e.target.name?.includes("opt_in") && e.target.name?.includes("label_text")) {
      obj.page_1[e.target.name] = e.target.value
      // if (e.target.name?.includes("opt_in") && obj?.page_1?.label_text === "") {
      //   obj.page_1.label_text = defaultLabelText[prevData?.page_1?.opt_in_type]
      // }
      setPrevData({ ...obj })
    } else {
      setPrevData({ ...prevData, [currPage]: { ...prevData?.[currPage], [e.target.name]: e.target.value } })
    }
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
        template_json: JSON.stringify(prevData)
      }
      Object.entries({ ...sendObj })?.map(([key, value]) => {
        form_data.append(key, value)
      })
      const url = new URL(`${SuperLeadzBaseURL}/flash_accounts/add_template_json/`)
      axios({
        method: "POST",
        data: form_data,
        url
      }).then((data) => {
        if (data?.data?.success === "successfully updated") {
          setApiLoader(false)
          toast.success('Saved Successfully')
        }
        console.log(data)
      }).catch((error) => {
        console.log({ error })
        toast.error("There was an error while saving your data")
        setApiLoader(false)
      })
    }, timeout)
  }

  const handleSlideChange = (swiper) => {
    let pageName
    Object.keys(defaultData).forEach((key, index) => {
      if (index === swiper?.activeIndex) {
        pageName = key
      }
    })
    setCurrPage(pageName)
    setCurrObj({ ...prevData[pageName] })
  }

  useEffect(() => {
    setPrevData({ ...prevData, [currPage]: { ...currObj } })
  }, [currObj])

  useEffect(() => {
    const url = new URL(`${SuperLeadzBaseURL}/flash_accounts/add_template_json/?shop=${outletData[0]?.web_url}&app=${userPermission?.appName}`)
    axios({
      method: "GET",
      url
    }).then((data) => {
      console.log(data)
      if (data?.data?.error) {
        setCurrObj(defaultData)
      } else {
        setPrevData({ ...data?.data?.success })
        console.log(data.data.success)
        setCurrObj({ ...data?.data?.success?.[currPage] })

      }
    }).catch((error) => {
      console.log({ error })
      setCurrObj(defaultData)
      toast.error("Could not fetch your data, try reloading the page")
    })
  }, [])

  return (
    <>
      <Container>
        {
          apiLoader ? <FrontBaseLoader /> : ''
        }
        <Row>
          <Col md="12" className="">
            <Row>
              <Col lg={7} className="d-none">
                <Card>
                  <CardBody>
                    <Row>
                      <Col md={12} className="mb-2">
                        <div className="d-flex justify-content-between align-items-center">
                          <h3>Customize your Message</h3>
                          <div className="form-check-success form-switch d-flex" style={{cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px'}}>
                            <label className="form-check-label cursor-pointer" htmlFor="flexSwitchCheckChecked" >Enable Account Success </label>
                            <input className="form-check-input m-0 cursor-pointer" type="checkbox" role="switch" id="flexSwitchCheckChecked" onChange={(e) => setPrevData({...prevData, page_1: {...prevData?.page_1, nextPage: e.target.checked}})} checked={prevData?.page_1?.nextPage} />
                          </div>
                        </div>
                      </Col>
                      <Col md={12} style={{marginBottom: "1.25rem" }}>
                        <label style={{ fontSize: "13px", marginBottom: '6px' }} htmlFor="heading" className="form-control-label">Heading</label>
                        <textarea onChange={handleDataChange} value={prevData?.[currPage]?.heading} name="heading" type="text" className="form-control" id="heading" placeholder="Heading" />
                      </Col>
                      <Col md={4} style={{marginBottom: "1.25rem" }}>
                        <label style={{ fontSize: "13px", marginBottom: '6px' }} htmlFor="primary_font" className="form-control-label">Primary Font</label>
                        <Select styles={{
                          option: (provided, state) => {
                            return ({ ...provided, fontFamily: fontStyles[fontStyles?.findIndex($ => $?.value === state.value)]?.value })
                          }
                        }} value={fontStyles?.filter($ => $.value === prevData?.[currPage]?.primary_font)} options={fontStyles} id="primary_font" onChange={(eventData) => {
                          const e = { target: { name: "primary_font", value: eventData.value } }
                          handleDataChange(e)
                        }} />
                      </Col>
                      <Col md={4} style={{marginBottom: "1.25rem" }}>
                        <label style={{ fontSize: "13px", marginBottom: '6px' }} htmlFor="heading_color" className="form-control-label">Heading Color</label>
                        <UncontrolledDropdown className="w-100 p-0" direction="start">
                          <DropdownToggle style={{ fontSize: "10px" }} className="rounded w-100 p-0">
                            <div style={{ backgroundColor: "#ffffff", padding: "0.525rem" }} className="rounded form-control d-flex align-items-center gap-1">
                              <span style={{ width: "15px", aspectRatio: "1", outline: "1px solid #ffffff", border: "1px solid black", backgroundColor: prevData?.[currPage]?.heading_color }}></span><span style={{ fontSize: "12px" }}>{prevData?.[currPage]?.heading_color}</span>
                            </div>
                          </DropdownToggle>
                          <DropdownMenu className="p-0 drop_menu_custom">
                            <DropdownItem className="p-0" style={{ width: "250px" }}>
                              {getColorPicker({ key: "heading_color" })}
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </Col>
                      <Col md={4} style={{marginBottom: "1.25rem" }}>
                        <label style={{ fontSize: "13px", marginBottom: '6px' }} htmlFor="heading_font_size" className="form-control-label">Font Size</label>
                        <Select styles={{
                          option: (provided, state) => {
                            return ({ ...provided, fontSize: FONT_SIZE_OPTIONS[FONT_SIZE_OPTIONS?.findIndex($ => $?.value === state.value)]?.value })
                          }
                        }} value={FONT_SIZE_OPTIONS?.filter($ => $.value === prevData?.[currPage]?.heading_font_size)} options={FONT_SIZE_OPTIONS} id="heading_font_size" onChange={(eventData) => {
                          const e = { target: { name: "heading_font_size", value: eventData.value } }
                          handleDataChange(e)
                        }} />
                      </Col>
                      <Col md={12} style={{marginBottom: "1.25rem" }}>
                        <label style={{ fontSize: "13px", marginBottom: '6px' }} htmlFor="sub_heading" className="form-control-label">Sub-heading</label>
                        <textarea onChange={handleDataChange} value={prevData?.[currPage]?.sub_heading} name="sub_heading" className="form-control" id="sub_heading" placeholder="Sub-heading" />
                      </Col>
                      <Col md={4} style={{marginBottom: "1.25rem" }}>
                        <label style={{ fontSize: "13px", marginBottom: '6px' }} htmlFor="secondary_font" className="form-control-label">Secondary Font</label>
                        <Select styles={{
                          option: (provided, state) => {
                            return ({ ...provided, fontFamily: fontStyles[fontStyles?.findIndex($ => $?.value === state.value)]?.value })
                          }
                        }} value={fontStyles?.filter($ => $.value === prevData?.[currPage]?.secondary_font)} options={fontStyles} id="secondary_font" onChange={(eventData) => {
                          const e = { target: { name: "secondary_font", value: eventData.value } }
                          handleDataChange(e)
                        }} />
                      </Col>
                      <Col md={4} style={{marginBottom: "1.25rem" }}>
                        <label style={{ fontSize: "13px", marginBottom: '6px' }} htmlFor="sub_heading_color" className="form-control-label">Sub-heading Color</label>
                        <UncontrolledDropdown className="w-100 p-0" direction="start">
                          <DropdownToggle style={{ fontSize: "10px" }} className="rounded w-100 p-0">
                            <div style={{ backgroundColor: "#ffffff", padding: "0.525rem" }} className="rounded form-control d-flex align-items-center gap-1">
                              <span style={{ width: "15px", aspectRatio: "1", outline: "1px solid #ffffff", border: "1px solid black", backgroundColor: prevData?.[currPage]?.sub_heading_color }}></span><span style={{ fontSize: "12px" }}>{prevData?.[currPage]?.sub_heading_color}</span>
                            </div>
                          </DropdownToggle>
                          <DropdownMenu className="p-0 drop_menu_custom">
                            <DropdownItem className="p-0" style={{ width: "250px" }}>
                              {getColorPicker({ key: "sub_heading_color" })}
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </Col>
                      <Col md={4} style={{marginBottom: "1.25rem" }}>
                        <label style={{ fontSize: "13px", marginBottom: '6px' }} htmlFor="sub_heading_font_size" className="form-control-label">Font Size</label>
                        <Select styles={{
                          option: (provided, state) => {
                            return ({ ...provided, fontSize: FONT_SIZE_OPTIONS[FONT_SIZE_OPTIONS?.findIndex($ => $?.value === state.value)]?.value })
                          }
                        }} value={FONT_SIZE_OPTIONS?.filter($ => $.value === prevData?.[currPage]?.sub_heading_font_size)} options={FONT_SIZE_OPTIONS} id="sub_heading_font_size" onChange={(eventData) => {
                          const e = { target: { name: "sub_heading_font_size", value: eventData.value } }
                          handleDataChange(e)
                        }} />
                      </Col>
                      <Col md={4} style={{marginBottom: "1.25rem" }}>
                        <label style={{ fontSize: "13px", marginBottom: '6px' }} htmlFor="button_text" className="form-control-label">Button Text</label>
                        <input onChange={handleDataChange} value={prevData?.[currPage]?.button_text} name="button_text" type="text" className="form-control" id="button_text" placeholder="Button Text" />
                      </Col>
                      <Col md={4} style={{marginBottom: "1.25rem" }}>
                        <label style={{ fontSize: "13px", marginBottom: '6px' }} htmlFor="button_color" className="form-control-label">Button Text Color</label>
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
                      </Col>
                      <Col md={4} style={{marginBottom: "1.25rem" }}>
                        <label style={{ fontSize: "13px", marginBottom: '6px' }} htmlFor="button_bg_color" className="form-control-label">Button Color</label>
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
                      </Col>
                      {currPage === "page_1" && <Col md={6} style={{marginBottom: "1.25rem" }}>
                        <label style={{ fontSize: "13px", marginBottom: '6px' }} htmlFor="password" className="form-control-label">Password</label>
                        <input onChange={handleDataChange} value={prevData?.["page_1"]?.password} name="password" type="text" className="form-control" id="password" placeholder="Password" />
                      </Col>}
                      {currPage === "page_1" && <Col md={6} style={{marginBottom: "1.25rem" }}>
                        <label style={{ fontSize: "13px", marginBottom: '6px' }} htmlFor="confirm_password" className="form-control-label">Confirm Password</label>
                        <input onChange={handleDataChange} value={prevData?.["page_1"]?.confirm_password} name="confirm_password" type="text" className="form-control" id="confirm_password" placeholder="Confirm Password" />
                      </Col>}
                      {currPage === "page_1" && <Col md={12} style={{marginBottom: "1.25rem" }}>
                        <label style={{ fontSize: "13px", marginBottom: '6px' }} htmlFor="opt_in" className="form-control-label">Opt-in</label>
                        <div className="d-flex gap-2">
                          <div className="form-check cursor-pointer">
                            <input type="checkbox" checked={prevData?.[`page_1`]?.opt_in_email === "email"} id="opt_in_email" onChange={(e) => {
                              const updatedData = {
                                opt_in_both:"",
                                opt_in_email: e.target.checked ? e.target.value : ""
                              }
                              setPrevData({...prevData, page_1: {...prevData.page_1, ...updatedData } })
                            }} name="opt_in_email" value={"email"} className="form-check-input" /><label htmlFor="opt_in_email" className="form-check-label">Email Opt-in</label>
                          </div>
                          <div className="form-check cursor-pointer">
                            <input type="checkbox" checked={prevData?.[`page_1`]?.opt_in_sms === "sms"} id="opt_in_sms" onChange={(e) => {
                              const updatedData = {
                                opt_in_both:"",
                                opt_in_sms: e.target.checked ? e.target.value : ""
                              }
                              setPrevData({...prevData, page_1: {...prevData.page_1, ...updatedData } })
                            }} name="opt_in_sms" value={"sms"} className="form-check-input" /><label htmlFor="opt_in_sms" className="form-check-label">SMS Opt-in</label>
                          </div>
                          <div className="form-check cursor-pointer">
                            <input type="checkbox" checked={prevData?.[`page_1`]?.opt_in_both === "both"} id="opt_in_both" onChange={(e) => {

                              const updatedData = {
                                opt_in_both: e.target.checked ? e.target.value : "",
                                opt_in_email: "",
                                opt_in_sms: ""
                              }
                              setPrevData({...prevData, page_1: {...prevData.page_1, ...updatedData } })
                            }} name="opt_in_both" value={"both"} className="form-check-input" />
                            <label htmlFor="opt_in_both" className="form-check-label">Opt-in for marketing communication</label>
                          </div>
                        </div>
                      </Col>}
                      {currPage === "page_1" && (
                        <>
                        {
                          prevData?.page_1?.opt_in_email === "email" && (
                            <>
                              <Col md={6} style={{marginBottom: "1.25rem"}}>
                                <div className="d-flex justify-content-start gap-1 align-items-center" style={{marginBottom: '6px'}}>
                                  <label style={{ fontSize: "13px" }} htmlFor="label_text">Email Text</label>
                                  <div className="d-flex align-items-center justify-content-between gap-1 form-check form-check-success m-0 p-0">
                                    {/* <label style={{ fontSize: "10px" }} className="form-check-label m-0 p-0">Toggle</label> */}
                                    <input checked={prevData?.page_1?.email_check} type='checkbox' className='form-check-input m-0 p-0' name="email_check" onChange={(e) => setPrevData({...prevData, page_1: {...prevData?.page_1, email_check: e.target.checked}})} />
                                  </div>
                                </div>
                                <input className="form-control" value={prevData?.page_1?.label_text_email} id="label_text_email" name="label_text_email" onChange={handleDataChange}/>
                              </Col>
                            
                            </>
                          )
                        }
                        {
                          prevData?.page_1?.opt_in_sms === "sms" && (
                            <>
                              <Col md={6} style={{marginBottom: "1.25rem"}}>
                                <div className="d-flex justify-content-start gap-1 align-items-center" style={{marginBottom: '6px'}}>
                                  <label style={{ fontSize: "13px" }} htmlFor="label_text">Sms Text</label>
                                  <div className="d-flex align-items-center justify-content-between gap-1 form-check form-check-success m-0 p-0">
                                    {/* <label style={{ fontSize: "10px" }} className="form-check-label m-0 p-0">Toggle</label> */}
                                    <input checked={prevData?.page_1?.sms_check} type='checkbox' className='form-check-input m-0 p-0' name="sms_check" onChange={(e) => setPrevData({...prevData, page_1: {...prevData?.page_1, sms_check: e.target.checked}})} />
                                  </div>
                                </div>
                                <input className="form-control" value={prevData?.page_1?.label_text_sms} id="label_text_sms" name="label_text_sms" onChange={handleDataChange}/>
                              </Col>
                            
                            </>
                          )
                        }

                        {
                          prevData?.page_1?.opt_in_both === "both" && (
                            <>
                              <Col md={6} style={{marginBottom: "1.25rem"}}>
                                <div className="d-flex justify-content-start gap-1 align-items-center" style={{marginBottom: '6px'}}>
                                  <label style={{ fontSize: "13px" }} htmlFor="label_text">Opt-in for marketing communication</label>
                                  <div className="d-flex align-items-center justify-content-between gap-1 form-check form-check-success m-0 p-0">
                                    {/* <label style={{ fontSize: "10px" }} className="form-check-label m-0 p-0">Toggle</label> */}
                                    <input checked={prevData?.page_1?.both_check} type='checkbox' className='form-check-input m-0 p-0' name="both_check" onChange={(e) => setPrevData({...prevData, page_1: {...prevData?.page_1, both_check: e.target.checked}})} />
                                  </div>
                                </div>
                                <input className="form-control" value={prevData?.page_1?.label_text_both} id="label_text_both" name="label_text_both" onChange={handleDataChange}/>
                              </Col>
                            
                            </>
                          )
                        }
                        </>
                      )}
                      {(!prevData?.page_1?.nextPage || currPage === "page_2") && <Col md={12} style={{marginBottom: "1.25rem"}}>
                        <label style={{ fontSize: "13px", marginBottom: '6px' }} htmlFor="redirect_url" className="form-control-label">Button Redirect URL</label>
                        <input onChange={handleDataChange} value={prevData?.[currPage]?.redirect_url} name="redirect_url" type="text" className="form-control" id="redirect_url" placeholder="Redirect URL" />
                      </Col>}
                    </Row>
                    <div className="d-flex justify-content-end align-items-center">
                      <button onClick={handleSaveData} className="btn text-white bg-black">Save</button>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col lg={5}>
                <div className="pages mt-4">
                  <Swiper
                    direction={"horizontal"}
                    breakpoints={{
                      0: {
                        slidesPerView: 1
                      },
                      980: {
                        slidesPerView: 1
                      },
                      1440: {
                        slidesPerView: 1
                      }
                    }}
                    spaceBetween={0}
                    navigation={true}
                    loop={false}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                    initialSlide={0}
                    onSlideChange={handleSlideChange}>
                    <SwiperSlide>
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
                            >
                              {prevData?.["page_1"]?.sub_heading}
                            </div>
                            <div style={{ marginTop: 30, padding: "0 40px 0 0" }}>
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
                                  placeholder={prevData?.["page_1"]?.password}
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
                                />
                              </div>
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
                                  placeholder={prevData?.["page_1"]?.confirm_password}
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
                                />
                              </div>
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
                                    }}>
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
                                    }}>
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
                                    }}>
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
                            >
                              {prevData?.["page_1"]?.button_text}
                            </div>
                          </div>
                        </div>
                        {/* <div style={{ padding: '40px', border: 'solid 1px rgb(239, 239, 239)', boxShadow: '1px 1px 13px 3px rgba(0,0,0,0.05)', background: 'white', borderRadius: '10px', width: '500px', fontFamily: 'sans-serif', margin: "auto" }}>
                        <div>
                          <div style={{ color: 'rgb(62, 62, 62)', marginTop: 0, fontSize: '24px', fontWeight: 600, lineHeight: '25px' }}>
                            Let us know you.</div>
                          <div style={{ fontSize: '14px', fontWeight: 400, marginTop: '10px', color: 'rgb(91, 91, 91)', lineHeight: '20px' }}>
                            Just submit a password to activate your account. There are NO monthly fees or ads EVER Your
                            membership gives you access to additional new resources to help you succeed on your journey.</div>
                          <div style={{ marginTop: '30px', padding: '0 40px 0 0' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                              <div htmlFor style={{ fontSize: '15px', color: 'rgb(91, 91, 91)' }}>Name</div>
                              <input type="password" placeholder="Lisa" style={{ width: '100%', border: 'solid 1px rgb(185, 185, 185)', borderRadius: '5px', fontSize: '14px', padding: '10px 20px', marginTop: '5px', outline: 'none', color: 'rgb(67, 67, 67)', letterSpacing: '1px' }} />
                            </div>
                          </div>
                          <div style={{ display: 'flex', gap: '15px', marginTop: '25px' }}>
                            <div style={{ display: 'grid', placeContent: 'center', padding: '10px 30px', border: 'solid 1px rgb(185, 185, 185)', backgroundColor: 'rgb(31, 31, 31)', color: 'white', fontSize: '15px', borderRadius: '5px', width: '70px' }}>
                              Submit
                            </div>
                            <div style={{ display: 'grid', placeContent: 'center', padding: '10px 30px', backgroundColor: 'rgb(255, 255, 255)', color: 'rgb(60, 60, 60)', fontSize: '15px', borderRadius: '5px', width: '70px' }}>
                              Skip
                            </div>
                          </div>
                        </div>
                      </div>
                      <div style={{ padding: '40px', border: 'solid 1px rgb(239, 239, 239)', boxShadow: '1px 1px 13px 3px rgba(0,0,0,0.05)', background: 'white', borderRadius: '10px', width: '500px', fontFamily: 'sans-serif', margin: "auto" }}>
                        <div>
                          <div style={{ color: 'rgb(62, 62, 62)', marginTop: 0, fontSize: '19px', fontWeight: 600, lineHeight: '25px' }}>
                            Congratulations! Your account has been activated.</div>
                          <div style={{ fontSize: '14px', fontWeight: 400, marginTop: '10px', color: 'rgb(91, 91, 91)', lineHeight: '20px' }}>
                            Remember to login to track your orders, request support, see updates and more...
                          </div>
                          <div style={{ display: 'grid', placeContent: 'center', padding: '10px 30px', border: 'solid 1px rgb(185, 185, 185)', backgroundColor: 'rgb(31, 31, 31)', color: 'white', fontSize: '15px', borderRadius: '5px', marginTop: '20px', width: '70px' }}>
                            Login
                          </div>
                          <div style={{ color: 'rgb(62, 62, 62)', marginTop: '25px', fontSize: '19px', fontWeight: 600, lineHeight: '25px' }}>
                            Your membership has been activated.</div>
                          <div style={{ fontSize: '14px', fontWeight: 400, marginTop: '10px', color: 'rgb(91, 91, 91)', lineHeight: '20px' }}>
                            Just submit a password to activate your account. There are NO monthly fees or ads EVER Your
                            membership gives you access to
                          </div>
                        </div>
                      </div> */}
                      </div>
                    </SwiperSlide>

                    {
                      prevData?.page_1?.nextPage ? (
                        <>
                          <SwiperSlide>
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
                          </SwiperSlide>
                        </>
                      ) : ''
                    }
                    
                  </Swiper>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Form