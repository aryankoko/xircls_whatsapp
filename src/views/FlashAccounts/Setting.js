import React, { useContext, useEffect, useState } from "react"
import { SuperLeadzBaseURL, getReq } from "../../assets/auth/jwtService"
import { Tone, generateRandomString, getCurrentOutlet, purpose, strategy } from "../Validator"
import { PermissionProvider } from "../../Helper/Context"
import toast from "react-hot-toast"
import axios from "axios"
// import Flatpickr from "react-flatpickr"
import Select from 'react-select'
import { ArrowLeft, Check, ChevronUp, Circle, Crosshair, Edit, Mail, Plus, Send, Settings, Type, X } from "react-feather"
import { Row, Col, Card, CardBody, Container, UncontrolledButtonDropdown, DropdownItem, DropdownToggle, DropdownMenu, UncontrolledDropdown, UncontrolledAccordion, AccordionItem, AccordionHeader, AccordionBody, Modal, ModalBody, ModalFooter, Button, ModalHeader, Input } from "reactstrap"
import CustomColorModifier from "../FormBuilder/FormBuilder(components)/CustomColorModifier"
import FrontBaseLoader from "../Components/Loader/Loader"
import { Pagination, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js'
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import 'swiper/modules/navigation/navigation.min.css'
import 'swiper/modules/autoplay/autoplay.min.css'
import "./Form.css"
import BasicEditor from "../Components/Editor/BaseEditor"
import { useNavigate } from "react-router"
import { Link, useParams, useLocation } from "react-router-dom"
import PickerDefault from "../Components/Date-picker/NormalDatePicker"
import ComTable from "../Components/DataTable/ComTable"

const Setting = ({ isAdmin = false }) => {

  const [sendTest, setSendTest] = useState(false)
  const [editorBar, setEditorBar] = useState(true)
  const [sideHeaderNav, setSideHeaderNav] = useState('form')
  const [sideNav, setSideNav] = useState('contentBF')
  const outletData = getCurrentOutlet()
  const [outletSenderId, setOutletSenderId] = useState("")
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [themeName, setThemeName] = useState("")
  const [nameEdit, setNameEdit] = useState(true)

  // Email 

  const [emailTemplate, setEmailTemplate] = useState([])
  const [placeholder, setPlaceholder] = useState([])
  const [verifyYourEmail, setVerifyYourEmail] = useState(false)
  const [changeSenderEmail, setChangeSenderEmail] = useState(false)
  const [textValue, setTextValue] = useState("")
  const [senderName, setSenderName] = useState("")
  const [data, setdata] = useState([])
  const [emailList, setEmailList] = useState("")
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const defaultTheme = {
    page_1: {
      heading: "Template DOB Increase",
      sub_heading: "Track your order, request support and get updates on current & upcoming promotions.",
      heading_color: "#000000",
      sub_heading_color: "#000000",
      primary_font: "sans-serif",
      secondary_font: "sans-serif",
      button_text: "Submit",
      button_color: "#ffffff",
      button_bg_color: "#000000",
      password: "Password",
      confirm_password: "Confirm Password",
      heading_font_size: "24px",
      sub_heading_font_size: "14px",
      opt_in_email: "email",
      opt_in_sms: "sms",
      opt_in_both: "",
      label_text_email: "Subscribe to email",
      label_text_sms: "Subscribe to sms",
      label_text_both: "Subscribe",
      email_check: true,
      sms_check: true,
      both_check: true,
      redirect_url: "/products",
      nextPage: false,
      email_from: "",
      subject: "Elevate Your Experience: Sign Up Now",
      contain: true,
      hidePassword: true,
      reEnter: true,
      strategy: "2",
      tone: "7",
      headingAf: "",
      primary_fontAf: "sans-serif",
      heading_colorAf: "rgba(74,144,226,1)",
      heading_font_sizeAf: "24px",
      passwordLength: "6",
      validationMessage: "Password should be {{n}} digits",
      editorState: "{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"font-weight: 600;font-size: 17px;line-height: 2;\",\"text\":\"Hello,\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"center\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"font-weight: 600;font-size: 17px;line-height: 1;\",\"text\":\"Activate Your Account\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"center\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}",
      htmlContent: "<p class=\"editor-paragraph\" style=\"text-align: center;\" dir=\"ltr\"><b><strong class=\"editor-text-bold\" style=\"font-weight: 600; font-size: 17px; line-height: 2; white-space: pre-wrap;\">Hello,</strong></b></p><p class=\"editor-paragraph\" style=\"text-align: center;\" dir=\"ltr\"><b><strong class=\"editor-text-bold\" style=\"font-weight: 600; font-size: 17px; line-height: 1; white-space: pre-wrap;\">Activate Your Account</strong></b></p>",
      purpose: "2"
    }
  }

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

  const [currPage, setCurrPage] = useState("page_1")
  console.log(setCurrPage)
  const [prevData, setPrevData] = useState({})

  const [currObj, setCurrObj] = useState({})

  const [apiLoader, setApiLoader] = useState(false)

  const { userPermission } = useContext(PermissionProvider)

  const getTemplate = () => {

    const url = new URL(`${SuperLeadzBaseURL}/api/v2/form_builder_template/?shop=${outletData[0]?.web_url}&app=${userPermission?.appName}&theme_id=${id}`)
    axios({
      method: "GET",
      url
    }).then((data) => {
      console.log(data, "dpfjsdopf")
      const jsonData = JSON.parse(data?.data?.data[0]?.custom_theme)
      console.log(jsonData, jsonData[currPage], "jsonData")
      setPrevData(jsonData)
      console.log(data.data.success, "success")
      setCurrObj(jsonData[currPage])
      setThemeName(data?.data?.data[0]?.campaign_name)

    })
      .catch((error) => {
        console.log({ error })
        setCurrObj({})
        setPrevData([])
        toast.error("Could not fetch your data, try reloading the page")
      })
  }

  const getEmailSettings = () => {
    getReq('outletsDetails', `?OUTLET_ID=${outletData[0]?.id}&OUTLET_TYPE=SINGLE`)
      .then((resp) => {
        // setAboutUs(String(resp.data.data.outlet_detail?.outlet_description).split('.'))
        setOutletSenderId(resp?.data?.data?.outlet_detail[0]?.outlet_sender_id)
      })
      .catch((error) => {
        console.log(error)
      })

    fetch(`${SuperLeadzBaseURL}/talks/api/template-placeholders/?app=${userPermission?.appName}`)
      .then((data) => data.json())
      .then((resp) => {
        console.log(resp, "pfjpsaofjopa")
        setPlaceholder(resp)
      })
      .catch((error) => {
        console.log(error)
        setPlaceholder([])
      })

    fetch(`${SuperLeadzBaseURL}/api/v1/get_campaign_details/?shop=${outletData[0]?.web_url}&app=${userPermission?.appName}`)
      .then((data) => data.json())
      .then((resp) => {
        const templateData = resp?.data?.map((curElem) => {
          return { label: curElem[1], value: curElem[0] }
        })
        // setEmailTemplate([])
        setEmailTemplate(templateData)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleFilter = e => {
    const value = e.target.value
    let updatedData = []
    setSearchValue(value)

    if (value.length) {
      updatedData = data.filter(item => {
        const startsWith =
            item.email_id.toLowerCase().startsWith(value.toLowerCase())

        const includes =
            item.email_id.toLowerCase().includes(value.toLowerCase())

        if (startsWith) {
            return startsWith
        } else if (!startsWith && includes) {
            return includes
        } else return null
      })
      setFilteredData(updatedData)
      setSearchValue(value)
    }
  }


  const defferContent = <>
    <Col className='d-flex align-items-center justify-content-center' md='4' sm='12'>
      <h4 className='m-0'>Verified Email</h4>
    </Col>
    <Col className='d-flex align-items-center justify-content-end' md='4' sm='12'>
      <a className="btn btn-primary d-flex justify-content-center align-items-center" style={{ gap: '5px' }} onClick={() => {
        setChangeSenderEmail(false)
        setVerifyYourEmail(true)
      }}>
        <Plus size={17} /> Email
      </a>
      <Input
        className='dataTable-filter form-control ms-1'
        style={{ width: `130px`, height: `2.714rem` }}
        type='text'
        bsSize='sm'
        id='search-input-1'
        placeholder='Search...'
        value={searchValue}
        onChange={handleFilter}
      />
    </Col>
  </>

  const getData = () => {
    setIsLoading(true)
    getReq('verifyEmail')
      .then((resp) => {
        setdata(resp?.data?.data?.oulet_email)
        setEmailList(resp?.data?.data?.sender)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
      })
  }

  const emailStatusChange = (e, row) => {
    if (row.is_verified) {
      setApiLoader(true)
      const form_data = new FormData()
      // form_data.append('email_to_verify', email_id)
      form_data.append('email_to_toggle', row?.email_id)
      form_data.append('activate_status', e.target.checked ? "1" : "0")
      form_data.append('sender_name', row?.sender_name)
      postReq('verifyEmail', form_data)
        .then((resp) => {
          toast.success(resp.data.message)
          getData()
          setApiLoader(false)
        })
        .catch((error) => {
          console.log(error)
          setApiLoader(false)
          toast.error("Something went wrong!")
        })
    } else {
      e.target.checked = !e.target.checked
      toast.error("Please verify your email!")
    }
  }

  const verifyEmail = () => {
    setApiLoader(true)
    if (senderName === "") {
      setApiLoader(false)
      toast.error("Please enter sender name")
      return
    }

    if (textValue === "") {
      setApiLoader(false)
      toast.error("Please enter your email")
      return
    }

    setVerifyYourEmail(false)
    // if (textValue) {

    const form_data = new FormData()
    form_data.append("email_to_verify", textValue)
    form_data.append("sender_name", senderName)
    postReq('verifyEmail', form_data)
      .then(() => {
        getData()
        getEmailSettings()
        setApiLoader(false)
        setChangeSenderEmail(true)
        toast.success(`Verification email has been sent to ${textValue}`)
        setTextValue("")
        setSenderName("")
      })
      .catch((error) => {
        console.log(error)
        setApiLoader(false)

        toast.success("Something went wrong!")
      })
  }

  const columns = [
    {
      name: 'Sr No.',
      cell: (row, index) => index + 1,
      width: '90px'
    },
    {
      name: 'Sender Name',
      minWidth: '200px',
      selector: row => row.sender_name
    },
    {
      name: 'Email Id',
      minWidth: '200px',
      selector: row => row.email_id
    },
    {
      name: 'Verfication Status',
      cell: (row) => {
        return (
          row.is_verified ? <>
            <span className="badge badge-light-primary">Verified</span>
          </> : <>
            <span className="badge badge-light-danger">Not Verified</span>
          </>

        )

      }
    },
    {
      name: 'Activate Sender ID',
      cell: (row) => {
        return (
          <>
            <div className='form-check form-switch form-check-primary mb-1'>
              <Input type='checkbox' id='verify' defaultChecked={emailList === row.email_id} className='cursor-pointer' onChange={(e) => emailStatusChange(e, row)} />
            </div>
          </>
        )
      }
    }
  ]

  useEffect(() => {
    // getData()
    getEmailSettings()
    if (id) {
      getTemplate()
    } else {
      const jsonData = location.state?.data
      if (jsonData) {
        setPrevData(jsonData)
        setCurrObj(jsonData[currPage])
      } else {
        setPrevData(defaultTheme)
        setCurrObj(defaultTheme[currPage])

      }
      setThemeName(`Campaign-${generateRandomString()}`)

    }

    console.log(currObj, "currObj")

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

  console.log(prevData, setOutletSenderId)

  const handleDataChange = (e) => {
    setCurrObj({ ...currObj, [e.target.name]: e.target.value })
  }

  const getColorPicker = ({ key }) => {
    return <CustomColorModifier styles={currObj} setStyles={setCurrObj} isHex={false} colorType={key} />
  }

  let saveTimer

  const handleSaveDataAdmin = (e, type) => {
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
        if (type === "Save & Close") {
          navigate(-1)
        }
      }).catch((error) => {
        console.log({ error })
        toast.error("There was an error while saving your data")
        setApiLoader(false)
      })
    }, timeout)
  }

  const handleSaveData = (e, type) => {
    e.preventDefault()
    setApiLoader(true)
    const timeout = 300
    clearTimeout(saveTimer)
    saveTimer = setTimeout(() => {
      const form_data = new FormData()

      const email_settings = {
        editorState: prevData?.page_1?.email_settings?.editorState,
        htmlContent: prevData?.page_1?.email_settings?.htmlContent,
        subject: prevData?.page_1?.email_settings?.subject
      }

      form_data.append("shop", outletData[0]?.web_url)
      form_data.append("app", userPermission?.appName)
      form_data.append("json_list", JSON.stringify(prevData))
      form_data.append("email_template_json", JSON.stringify(email_settings))
      form_data.append("campaign_name", themeName)
      if (prevData?.page_1?.campaignStartDate) {
        form_data.append("start_date", prevData?.page_1?.campaignStartDate)
      }
      if (prevData?.page_1?.campaignEndDate) {
        form_data.append("end_date", prevData?.page_1?.campaignEndDate)
      }

      if (id) {
        form_data.append("theme_id", id)
      }

      const url = new URL(`${SuperLeadzBaseURL}/api/v2/form_builder_template/`)
      axios({
        method: "POST",
        data: form_data,
        url
      }).then((data) => {

        setApiLoader(false)
        toast.success('Saved Successfully')
        if (type === "Save & Close") {
          navigate(-1)
        }
        console.log(data)
      }).catch((error) => {
        console.log({ error })
        toast.error("There was an error while saving your data")
        setApiLoader(false)
      })
    }, timeout)
  }

  useEffect(() => {
    setPrevData({ ...prevData, [currPage]: currObj })
  }, [currObj])

  console.log(sideNav, "sideNav")

  const sendTestMail = () => {
    const form_data = new FormData()
    form_data.append('email', prevData?.page_1?.testMail)
    form_data.append('html_content', prevData?.page_1?.email_settings?.htmlContent)
    form_data.append('subject', prevData?.page_1?.email_settings?.subject)

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

  const strategyFilter = strategy?.filter((curElem) => {
    return curElem?.purpose_id.some((pur_id) => {

      return prevData?.page_1?.purpose?.includes(pur_id)
    })
  })

  const toneFilter = Tone?.filter((curElem) => {
    return curElem?.strategy_id?.some((strat_id) => {

      return prevData?.page_1?.strategy?.includes(strat_id)
    })
  })

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

          `}
        </style>
        <Row className='align-items-center px-0'>
          <div className='col-md-6 d-flex justify-content-start align-items-cente'>
            <div className="card-body d-flex justify-content-start align-items-center gap-1 px-1">
              <ArrowLeft className="cursor-pointer" size={20} onClick={() => navigate(-1)} />
              <h4 className="m-0">
                {/* {
                  toggle ? 'Deactivate Flash Accounts' : 'Activate Flash Accounts'
                } */}
                Account Success Page
              </h4>
              <div className="form-check-success form-switch cursor-pointer">
                <input className="form-check-input cursor-pointer" type="checkbox" role="switch" id="form-switch" onClick={(e) => {
                  setSideHeaderNav("form")
                  setSideNav("contentBF")
                  setCurrObj({ ...currObj, nextPage: e.target.checked })
                }} checked={prevData?.page_1?.nextPage} />
                {/* <label className="form-check-label" htmlFor="form-switch" style={{ paddingLeft: '10px', whiteSpace: 'nowrap' }}>Plugin Setting</label> */}
              </div>
            </div>
          </div>

          <div className='col-md-6 d-flex flex-row justify-content-end align-items-center' style={{ padding: "0.5rem", gap: "0.5rem" }}>
            <div className="d-flex justify-content-center align-items-center" style={{ gap: '15px', padding: '0px 10px' }}>
              {
                isAdmin ? <>

                  <select className="form-control" onChange={(e) => setCurrObj({ ...currObj, purpose: e.target.value })}>
                    <option value="" disabled selected>Purpose</option>
                    {
                      purpose?.map((curElem) => {
                        return <option value={curElem?.id}>{curElem?.label}</option>
                      })
                    }
                  </select>

                  <select className="form-control" onChange={(e) => setCurrObj({ ...currObj, strategy: e.target.value })}>
                    <option value="" disabled selected>Strategy</option>
                    {
                      strategyFilter?.map((curElem) => {
                        return <option value={curElem?.id}>{curElem?.label}</option>
                      })
                    }
                  </select>
                  <select className="form-control" onChange={(e) => setCurrObj({ ...currObj, tone: e.target.value })}>
                    <option value="" disabled selected>Tone</option>
                    {
                      toneFilter?.map((curElem) => {
                        return <option value={curElem?.id}>{curElem?.label}</option>
                      })
                    }
                  </select>

                </> : ''
              }
              <div className="d-flex justify-content-center align-items-center" style={{ border: '1px solid #d8d6de', borderRadius: '0.357rem', gap: '5px' }}>
                <input id='campaignNameInput' type="text" placeholder='Enter theme name' value={themeName} onKeyDown={e => e.key === "Enter" && setNameEdit(!nameEdit)} onChange={e => {
                  setThemeName(e.target.value)
                }} disabled={nameEdit} className="form-control" style={{ width: '250px', border: 'none' }} />
                <a style={{ marginRight: '5px' }} onClick={() => setNameEdit(!nameEdit)}>
                  {
                    nameEdit ? <Edit size={'18px'} /> : <Check size={'18px'} />
                  }
                </a>
              </div>
              {
                sideNav === "Email" ? (
                  <>
                    <a className="btn btn-primary" onClick={() => setSendTest(!sendTest)}><Send size='15' /><span className="mx-1">Test Mail</span></a>
                  </>
                ) : ''
              }
              <button className="btn custom-btn-outline">Cancel</button>
              <button onClick={isAdmin ? (e) => handleSaveDataAdmin(e, "Save") : (e) => handleSaveData(e, "Save")} id='saveBtn' className="btn btn-primary-main" style={{ whiteSpace: 'nowrap' }}>Save</button>
              <button onClick={isAdmin ? (e) => handleSaveDataAdmin(e, "Save & Close") : (e) => handleSaveData(e, "Save & Close")} id='saveBtn' className="btn btn-primary-main" style={{ whiteSpace: 'nowrap' }}>Save & Close</button>
            </div>
          </div>


        </Row>
      </Container>
      {
        apiLoader ? <FrontBaseLoader /> : ''
      }


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
                        <span style={{ fontSize: "8.5px", fontStyle: "normal", fontWeight: "500", lineHeight: "10px", transition: "0.3s ease-in-out" }} className={`text-uppercase`}>Fields</span>
                      </div>
                      <div className={`sideNav-items d-flex flex-column align-items-center justify-content-center ${sideNav === "contentAF" ? "text-black active-item" : ""}`} style={{ gap: "0.5rem", cursor: "pointer", padding: "0.75rem 0px" }} onClick={() => setSideNav(sideNav === "contentAF" ? "" : "contentAF")}>
                        <button className={`btn d-flex align-items-center justify-content-center`} style={{ aspectRatio: "1", padding: "0rem", border: "none", outline: "none", transition: "0.3s ease-in-out" }}>
                          <Circle size={'15px'} />
                        </button>
                        <span style={{ fontSize: "8.5px", fontStyle: "normal", fontWeight: "500", lineHeight: "10px", transition: "0.3s ease-in-out" }} className={`text-uppercase`}>Content After Form</span>
                      </div>
                      {
                        prevData?.page_1?.nextPage ? <>
                          <div className={`sideNav-items d-flex flex-column align-items-center justify-content-center ${sideNav === "successMessage" ? "text-black active-item" : ""}`} style={{ gap: "0.5rem", cursor: "pointer", padding: "0.75rem 0px" }} onClick={() => setSideNav(sideNav === "successMessage" ? "" : "successMessage")}>
                            <button className={`btn d-flex align-items-center justify-content-center`} style={{ aspectRatio: "1", padding: "0rem", border: "none", outline: "none", transition: "0.3s ease-in-out" }}>
                              <Circle size={'15px'} />
                            </button>
                            <span style={{ fontSize: "8.5px", fontStyle: "normal", fontWeight: "500", lineHeight: "10px", transition: "0.3s ease-in-out" }} className={`text-uppercase`}>Success Message</span>
                          </div>
                        </> : ''
                      }

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

                      <div className={`sideNav-items d-flex flex-column align-items-center justify-content-center ${sideNav === "schedule" ? "text-black active-item" : ""}`} style={{ gap: "0.5rem", cursor: "pointer", padding: "0.75rem 0px" }} onClick={() => setSideNav(sideNav === "schedule" ? "" : "schedule")}>
                        <button className={`btn d-flex align-items-center justify-content-center`} style={{ aspectRatio: "1", padding: "0rem", border: "none", outline: "none", transition: "0.3s ease-in-out" }}>
                          <Crosshair size={'15px'} />
                        </button>
                        <span style={{ fontSize: "8.5px", fontStyle: "normal", fontWeight: "500", lineHeight: "10px", transition: "0.3s ease-in-out" }} className={`text-uppercase`}>Schedule</span>
                      </div>
                    </>
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
                        <textarea onChange={handleDataChange} value={prevData?.page_1?.successheading} name="successheading" type="text" className="form-control" id="heading" placeholder="Heading" />
                      </div>
                      <div className="py-1">
                        <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Heading Font</label>
                        <Select styles={{
                          option: (provided, state) => {
                            return ({ ...provided, fontFamily: fontStyles[fontStyles?.findIndex($ => $?.value === state.value)]?.value })
                          }
                        }} value={fontStyles?.filter($ => $.value === prevData?.page_1?.successprimary_font)} options={fontStyles} id="successprimary_font" onChange={(eventData) => {
                          const e = { target: { name: "successprimary_font", value: eventData.value } }
                          handleDataChange(e)
                        }} />
                      </div>

                      <div className="py-1">
                        <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Heading Color</label>
                        <UncontrolledDropdown className="w-100 p-0" direction="start">
                          <DropdownToggle style={{ fontSize: "10px" }} className="rounded w-100 p-0">
                            <div style={{ backgroundColor: "#ffffff", padding: "0.525rem" }} className="rounded form-control d-flex align-items-center gap-1">
                              <span style={{ width: "15px", aspectRatio: "1", outline: "1px solid #ffffff", border: "1px solid black", backgroundColor: prevData?.page_1?.successheading_color }}></span><span style={{ fontSize: "12px" }}>{prevData?.page_1?.successheading_color}</span>
                            </div>
                          </DropdownToggle>
                          <DropdownMenu className="p-0 drop_menu_custom">
                            <DropdownItem className="p-0" style={{ width: "250px" }}>
                              {getColorPicker({ key: "successheading_color" })}
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
                        }} value={FONT_SIZE_OPTIONS?.filter($ => $.value === prevData?.page_1?.successheading_font_size)} options={FONT_SIZE_OPTIONS} id="successheading_font_size" onChange={(eventData) => {
                          const e = { target: { name: "successheading_font_size", value: eventData.value } }
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
                        <textarea onChange={handleDataChange} value={prevData?.page_1?.successsub_heading} name="successsub_heading" className="form-control" id="successsub_heading" placeholder="Sub-heading" />
                      </div>
                      <div className="py-1">
                        <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Sub-heading Font</label>
                        <Select styles={{
                          option: (provided, state) => {
                            return ({ ...provided, fontFamily: fontStyles[fontStyles?.findIndex($ => $?.value === state.value)]?.value })
                          }
                        }} value={fontStyles?.filter($ => $.value === prevData?.page_1?.successsecondary_font)} options={fontStyles} id="successsecondary_font" onChange={(eventData) => {
                          const e = { target: { name: "successsecondary_font", value: eventData.value } }
                          handleDataChange(e)
                        }} />
                      </div>

                      <div className="py-1">
                        <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Sub-heading Color</label>
                        <UncontrolledDropdown className="w-100 p-0" direction="start">
                          <DropdownToggle style={{ fontSize: "10px" }} className="rounded w-100 p-0">
                            <div style={{ backgroundColor: "#ffffff", padding: "0.525rem" }} className="rounded form-control d-flex align-items-center gap-1">
                              <span style={{ width: "15px", aspectRatio: "1", outline: "1px solid #ffffff", border: "1px solid black", backgroundColor: prevData?.page_1?.successsub_heading_color }}></span><span style={{ fontSize: "12px" }}>{prevData?.page_1?.successsub_heading_color}</span>
                            </div>
                          </DropdownToggle>
                          <DropdownMenu className="p-0 drop_menu_custom">
                            <DropdownItem className="p-0" style={{ width: "250px" }}>
                              {getColorPicker({ key: "successsub_heading_color" })}
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
                        }} value={FONT_SIZE_OPTIONS?.filter($ => $.value === prevData?.page_1?.successsub_heading_font_size)} options={FONT_SIZE_OPTIONS} id="successsub_heading_font_size" onChange={(eventData) => {
                          const e = { target: { name: "successsub_heading_font_size", value: eventData.value } }
                          handleDataChange(e)
                        }} />
                      </div>

                    </AccordionBody>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionHeader className='acc-header border-top' targetId='3' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                      <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Button</label>
                    </AccordionHeader>
                    <AccordionBody accordionId='3'>
                      <div className="py-1">
                        <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Button Text</label>
                        <input onChange={handleDataChange} value={prevData?.[currPage]?.successbutton_text} name="successbutton_text" type="text" className="form-control" id="successbutton_text" placeholder="Button Text" />
                      </div>
                      <div className="py-1">
                        <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Button Text Color</label>
                        <UncontrolledDropdown className="w-100 p-0" direction="start">
                          <DropdownToggle style={{ fontSize: "10px" }} className="rounded w-100 p-0">
                            <div style={{ backgroundColor: "#ffffff", padding: "0.525rem" }} className="rounded form-control d-flex align-items-center gap-1">
                              <span style={{ width: "15px", aspectRatio: "1", outline: "1px solid #ffffff", border: "1px solid black", backgroundColor: prevData?.[currPage]?.successbutton_color }}></span><span style={{ fontSize: "12px" }}>{prevData?.[currPage]?.successbutton_color}</span>
                            </div>
                          </DropdownToggle>
                          <DropdownMenu className="p-0 drop_menu_custom">
                            <DropdownItem className="p-0" style={{ width: "250px" }}>
                              {getColorPicker({ key: "successbutton_color" })}
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>

                      <div className="py-1">
                        <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Button Color</label>
                        <UncontrolledDropdown className="w-100 p-0" direction="start">
                          <DropdownToggle style={{ fontSize: "10px" }} className="rounded w-100 p-0">
                            <div style={{ backgroundColor: "#ffffff", padding: "0.525rem" }} className="rounded form-control d-flex align-items-center gap-1">
                              <span style={{ width: "15px", aspectRatio: "1", outline: "1px solid #ffffff", border: "1px solid black", backgroundColor: prevData?.[currPage]?.successbutton_bg_color }}></span><span style={{ fontSize: "12px" }}>{prevData?.[currPage]?.successbutton_bg_color}</span>
                            </div>
                          </DropdownToggle>
                          <DropdownMenu className="p-0 drop_menu_custom">
                            <DropdownItem className="p-0" style={{ width: "250px" }}>
                              {getColorPicker({ key: "successbutton_bg_color" })}
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>

                      {(!prevData?.page_1?.nextPage || currPage === "page_2") && <Col md={12} style={{ marginBottom: "1.25rem" }}>
                        <label style={{ fontSize: "0.85rem", marginBottom: '6px' }} htmlFor="successredirect_url" className="form-control-label">Button Redirect URL</label>
                        <input onChange={handleDataChange} value={prevData?.[currPage]?.successredirect_url} name="successredirect_url" type="text" className="form-control" id="successredirect_url" placeholder="Redirect URL" />
                      </Col>}

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
                                }} name="opt_in_sms" value={"sms"} />

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
                                        <input id="keep_sms_check" checked={prevData?.page_1?.sms_check} type='checkbox' className='form-check-input m-0 p-0' name="sms_check" onChange={(e) => setCurrObj({ ...currObj, sms_check: e.target.checked })} />
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

                      {
                        prevData?.page_1?.reEnter ? (
                          <>
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
                          </>
                        ) : ''
                      }


                      <div className="py-1">
                        <Col md={12} style={{ marginBottom: "1.25rem" }}>
                          <div className="form-check-success form-switch cursor-pointer">
                            <input className="form-check-input cursor-pointer" type="checkbox" checked={prevData?.[`page_1`]?.hidePassword} id="hidePassword" onChange={(e) => {
                              // setPrevData({...prevData, page_1: {...prevData?.page_1, hidePassword: e.target.checked}})
                              setCurrObj({ ...currObj, hidePassword: e.target.checked })
                            }} name="hidePassword" /><label htmlFor="hidePassword" className="form-check-label ms-1">Show and hide Password icon.</label>
                          </div>
                        </Col>
                      </div>

                      <div className="py-1">
                        <Col md={12} style={{ marginBottom: "1.25rem" }}>
                          <div className="form-check-success form-switch cursor-pointer">
                            <input className="form-check-input cursor-pointer" type="checkbox" checked={prevData?.[`page_1`]?.reEnter} id="reEnter" onChange={(e) => {
                              // setPrevData({...prevData, page_1: {...prevData?.page_1, reEnter: e.target.checked}})
                              setCurrObj({ ...currObj, reEnter: e.target.checked })
                            }} name="reEnter" /><label htmlFor="reEnter" className="form-check-label ms-1">Enter Re-Type password functionality.</label>
                          </div>
                        </Col>
                      </div>


                    </AccordionBody>
                  </AccordionItem>

                  <AccordionItem className="d-none">
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
                            }} name="dobToggle" />

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
                            }} name="gender" />

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
                                }} name="genderList" />

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
                                }} name="genderList" />

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
                                }} name="genderList" />

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
                                }} name="genderList" />

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
                      <AccordionHeader className='acc-header border-top' targetId='1' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
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
                                setCurrObj({ ...currObj, contain: e.target.checked })
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

              {
                sideNav === "schedule" && <div style={{ transition: "0.3s ease-in-out", overflow: "auto", width: "450px", transform: `translateX(${sideNav === "schedule" ? "0px" : "-450px"})`, position: "absolute", inset: "0px" }}>
                  <UncontrolledAccordion defaultOpen={['1', '2']} stayOpen>
                    <AccordionItem className='bg-white border-bottom'>
                      <AccordionHeader className='acc-header border-bottom' targetId='1'>
                        <p className='m-0 fw-bolder text-black text-uppercase' style={{ fontSize: "0.75rem" }}>Schedule Campaign</p>
                      </AccordionHeader>
                      <AccordionBody accordionId='1'>
                        <div className='p-0 mx-0 my-1'>
                          <label htmlFor="" className='form-control-label' style={{ fontSize: "0.85rem" }}>Start Date</label>
                          <PickerDefault picker={prevData?.page_1?.campaignStartDate} minDate={"today"} maxDate={prevData?.page_1?.campaignEndDate} dateFormat={"Y-m-d h:i K"} enableTime={true} type={"start"} setMainStyle={setCurrObj} mainStyle={prevData?.page_1} />

                          <div className="form-check d-flex align-items-center gap-1 mx-0 p-0 my-2">
                            <label style={{ fontSize: "0.85rem" }} htmlFor="endDateCheck" className="form-check-label m-0 p-0">Set end date</label>
                            <input id='endDateCheck' checked={prevData?.page_1?.campaignHasEndDate} type="checkbox" onChange={e => setCurrObj({ ...currObj, campaignHasEndDate: e.target.checked })} className="form-check-input m-0 cursor-pointer" />
                          </div>
                          {prevData?.page_1?.campaignHasEndDate && (
                            <>
                              <label htmlFor="" className='form-control-label' style={{ fontSize: "0.85rem" }} >End Date</label>
                              <PickerDefault picker={prevData?.page_1?.campaignEndDate} minDate={prevData?.page_1?.campaignStartDate} dateFormat={"Y-m-d h:i K"} enableTime={true} type="end" mainStyle={prevData?.page_1} setMainStyle={setCurrObj} />

                            </>
                          )}
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
                    <AccordionBody accordionId='1'>
                      <div className="py-1">
                        <label style={{ fontSize: "0.85rem", width: '100%' }} className="form-check-label m-0 p-0">Email From</label>
                        <div className="d-flex justify-content-center align-items-center" style={{ border: '1px solid #d8d6de', borderRadius: '0.357rem', gap: '5px' }}>
                          <input type="text" value={outletSenderId ? outletSenderId : "no_reply@xircls.com"} className="form-control" style={{ width: '100%', border: 'none' }} disabled />
                          <a style={{ marginRight: '5px' }} onClick={() => setChangeSenderEmail(!changeSenderEmail)}>
                            <Edit size={'18px'} />
                          </a>
                        </div>

                      </div>

                      <div className='py-1'>
                        <label style={{ fontSize: "0.85rem", width: '100%' }} className="form-check-label m-0 p-0">Email Template</label>

                        <Select onChange={(e) => {
                          const form_data = new FormData()
                          form_data.append("id", e.value)
                          fetch(`${SuperLeadzBaseURL}/api/v1/get_single_camp_details/`, {
                            method: "POST",
                            body: form_data
                          })
                            .then((data) => data.json())
                            .then((resp) => {
                              if (resp.data) {
                                setCurrObj({ ...currObj, email_settings: { ...resp.data } })

                              }
                            })
                            .catch((error) => {
                              console.log(error)
                            })
                        }} options={emailTemplate} />
                      </div>

                      <div className="py-1">
                        <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Subject</label>
                        <input value={currObj?.email_settings?.subject} onChange={(e) => setCurrObj({ ...currObj, email_settings: { ...currObj.email_settings, subject: e.target.value } })} name="subject" type="text" className="form-control" id="subject" placeholder="Subject" />
                      </div>

                      <div className="py-1">
                        <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Placeholders</label>
                        <div className='border p-1 rounded' style={{ height: '250px', overflowY: 'auto' }}>
                          {
                            placeholder?.map((curElem) => {
                              return <>
                                <div className="toggleSection d-flex flex-column align-items-start justify-content-start mb-1">
                                  <div style={{ width: "100%", padding: "0.5rem" }}>
                                    <div
                                      className=" shadow-sm border rounded text-dark w-100 d-flex flex-column justify-content-between align-items-center p-1"
                                      onClick={() => {
                                        // Create a temporary input element to copy the value to the clipboard
                                        const tempInput = document.createElement('input')
                                        tempInput.value = curElem.placeholders
                                        document.body.appendChild(tempInput)

                                        // Select the value in the input field
                                        tempInput.select()
                                        tempInput.setSelectionRange(0, 99999) // For mobile devices

                                        // Copy the selected text to the clipboard
                                        document.execCommand('copy')

                                        // Remove the temporary input element
                                        document.body.removeChild(tempInput)
                                        toast.success("Value Copied Successfully")
                                        // You can also provide some feedback to the user to indicate that the value has been copied
                                        // alert('Value copied to clipboard: ' + customer.value)
                                      }}
                                      style={{ cursor: "pointer" }} // Changed cursor style to "pointer" for better UX
                                    >
                                      <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>{curElem.variable}</span>
                                    </div>
                                  </div>
                                </div>
                              </>
                            })
                          }

                        </div>
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
                        {
                          prevData?.page_1?.nextPage ? <>
                            <div className="switch d-flex justify-content-center align-items-center m-2">
                              <div className={`page_1 d-flex justify-content-center align-items-center pages ${sideNav !== "successMessage" ? "active" : ''}`} onClick={() => {
                                setSideHeaderNav("form")
                                setSideNav('contentBF')
                              }} style={{ padding: '10px 15px', cursor: 'pointer' }}>
                                <p className="p-0 m-0">Main Page</p>
                              </div>
                              <div className={`page_2 d-flex justify-content-center align-items-center pages ${sideNav === "successMessage" ? "active" : ''}`} onClick={() => {
                                // setCurrPage('page_2')
                                setSideHeaderNav("form")
                                setSideNav("successMessage")
                              }} style={{ padding: '10px 15px', cursor: 'pointer' }}>
                                <p className="p-0 m-0">Account Success Page</p>
                              </div>
                            </div>
                          </> : ''
                        }
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
                    sideHeaderNav === "email" ? (
                      <>
                        <Card
                          style={{ border: "1px solid #eee", height: '600px', overflowY: "auto" }}
                        >
                          <CardBody>
                            <div
                              style={{ padding: "10px 20px", lineHeight: '25px', color: "#424242" }}
                              colSpan={2}
                              bgcolor="#fff"
                              align="center"
                            >
                              <font size={3} face="sans-serif">
                                <div >
                                  <div id="emailTemplateId"></div>
                                  <BasicEditor elementId={`emailTemplateId`}
                                    style={{ width: '100%' }} key={prevData?.page_1?.email_settings?.editorState}
                                    hideToolbar={editorBar}
                                    editorState={prevData?.page_1?.email_settings?.editorState}
                                    htmlContent={prevData?.page_1?.email_settings?.htmlContent}
                                    onChange={(html, ediorState) => {
                                      console.log(html, ediorState)
                                      const updatedData = {
                                        editorState: ediorState,
                                        htmlContent: html
                                      }
                                      setCurrObj({ ...currObj, email_settings: updatedData})

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
                        {sideNav !== "successMessage" ? (
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
                                <div style={{ marginTop: 30, padding: "0 0px 0 0" }}
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
                                        letterSpacing: 1,
                                        cursor: "pointer"
                                      }}
                                      readOnly
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
                                            letterSpacing: 1,
                                            cursor: "pointer"
                                          }}
                                          readOnly
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
                                    fontFamily: prevData?.["page_1"]?.primary_fontAf,
                                    marginTop: '20px'
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
                              <div onClick={(e) => {
                                e.stopPropagation()
                                setSideHeaderNav("form")
                                setSideNav("successMessage")
                              }}>
                                <div>
                                  <div style={{ color: 'rgb(62, 62, 62)', marginTop: 0, fontSize: prevData?.["page_1"]?.successheading_font_size, fontWeight: 600, lineHeight: 'auto', color: prevData?.["page_1"]?.successheading_color, fontFamily: prevData?.page_1?.successprimary_font }}>
                                    {prevData?.["page_1"]?.successheading}</div>
                                  <div style={{ fontSize: prevData?.["page_1"]?.successsub_heading_font_size, fontWeight: 400, marginTop: '10px', color: 'rgb(91, 91, 91)', lineHeight: 'auto', color: prevData?.["page_1"]?.successsub_heading_color, fontFamily: prevData?.page_1?.successsecondary_font }}>
                                    {prevData?.["page_1"]?.successsub_heading}
                                  </div>

                                </div>
                                <div style={{ display: 'grid', placeContent: 'center', padding: '10px 30px', border: `solid 1px ${prevData?.["page_1"]?.successbutton_color}`, backgroundColor: prevData?.["page_1"]?.successbutton_bg_color, color: prevData?.["page_1"]?.successbutton_color, fontSize: '15px', borderRadius: '5px', marginTop: '20px', fontFamily: prevData?.page_1?.successsecondary_font }}>
                                  {prevData?.["page_1"]?.successbutton_text}
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

      <Modal
        isOpen={verifyYourEmail}
        toggle={() => setVerifyYourEmail(!verifyYourEmail)}
        className='modal-dialog-centered'
        size='lg'
      >
        <ModalHeader toggle={() => setVerifyYourEmail(!verifyYourEmail)}>Sender Email</ModalHeader>
        <ModalBody>
          {/* <VerifyYourEmailQuick /> */}
          <div className='d-flex justify-content-center align-items-end gap-2'>
            <div className='w-50'>
              <label>Sender Name</label>
              <input type='text' className='form-control' value={senderName} onChange={(e) => setSenderName(e.target.value)} />
              <p id="sender_name_val" className="text-danger m-0 p-0 vaildMessage"></p>
            </div>
            <div className='w-50'>
              <label>Email</label>
              <input type='text' className='form-control' value={textValue} onChange={(e) => setTextValue(e.target.value)} />
              <p id="textValue_val" className="text-danger m-0 p-0 vaildMessage"></p>
            </div>
            {/* <input type='text' className='form-control' value={textValue} onChange={(e) => setTextValue(e.target.value)} /> */}
            {/* <a style={{whiteSpace: 'nowrap'}} className='btn btn-primary'> Click to Get Verification mail </a> */}
          </div>
          {/* <VerifyYourEmail isQuick={true} /> */}
        </ModalBody>
        <ModalFooter>
          <Button outline onClick={() => setVerifyYourEmail(!verifyYourEmail)}>
            Cancel
          </Button>
          <Button outline onClick={() => {
            verifyEmail()
            // setVerifyYourEmail(!verifyYourEmail)
            // getEmailSettings()
            // getData()
          }}>
            Verify
          </Button>
        </ModalFooter>
      </Modal>


      <Modal
        isOpen={changeSenderEmail}
        toggle={() => setChangeSenderEmail(!changeSenderEmail)}
        className='modal-dialog-centered'
        size='lg'
      >
        <ModalHeader toggle={() => setChangeSenderEmail(!changeSenderEmail)}>Change Sender Email</ModalHeader>
        <ModalBody>
          {
            <Row className='mt-2'>
              <ComTable
                // tableName="Verified Email"
                content={defferContent}
                tableCol={columns}
                data={data}
                searchValue={searchValue}
                // handleFilter={handleFilter}
                filteredData={filteredData}
                isLoading={isLoading}
              />
            </Row>
          }
        </ModalBody>
        <ModalFooter>
          <Button outline onClick={() => setChangeSenderEmail(!changeSenderEmail)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

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
                <input type="text" className="form-control" value={prevData?.page_1?.testMail} onChange={(e) => setCurrObj({ ...currObj, testMail: e.target.value })} />
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

export default Setting