import { useState, useEffect } from "react"
import { Card, CardBody, CardHeader, CardTitle, Col, Row, AccordionBody, AccordionHeader, AccordionItem, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledAccordion, UncontrolledDropdown, Spinner } from "reactstrap"
import { TfiEmail } from "react-icons/tfi"
import { BiCommentDetail } from "react-icons/bi"
import { AiOutlineClockCircle, AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai"
import { FiSettings, FiEdit } from "react-icons/fi"
import { IoIosArrowDown } from "react-icons/io"
import { VscVerifiedFilled } from "react-icons/vsc"
import { CgProfile } from "react-icons/cg"
// import ColorsInput from "../components/ColorsInput"
// import NumberInput from "../components/NumberInput"
import { FcApproval } from "react-icons/fc"
// import reviewPic from "./components/chad.png"
import { FaStar, FaRegStar } from "react-icons/fa"
// import { Star } from 'react-feather'

// import blueTick from "@src/views/Assets/blue-tick.svg"
// import arrowUp from "@src/views/Assets/arrow-up.svg"
// import arrowDown from "@src/views/Assets/arrow-down.svg"
// /home/sys7/Desktop/Front-Main/DEMO/FRONTEND/src/assets/images/product-review
import Star from "@src/assets/images/product-review/Assets/default-star.svg"
import Heart from "@src/assets/images/product-review/Assets/default-heart.svg"
import Smiley from "@src/assets/images/product-review/Assets/default-smiley.svg"
import Fire from "@src/assets/images/product-review/Assets/default-fire.svg"
import Hundred from "@src/assets/images/product-review/Assets/default-hundred.svg"
import blankStar from "@src/assets/images/product-review/Assets/blank-star.svg"
import blankHeart from "@src/assets/images/product-review/Assets/blank-heart.svg"
import blankSmiley from "@src/assets/images/product-review/Assets/blank-smiley.svg"
import blankFire from "@src/assets/images/product-review/Assets/blank-fire.svg"
import BlankHundred from "@src/assets/images/product-review/Assets/blank-hundred.svg"
// import apiData from "@src/@core/auth/jwt/api/api.json"
import "./style/ReviewStyle.css"
// import { SuperLeadzBaseURL } from "../../assets/auth/jwtService"


import { Settings, Type } from 'react-feather'
import { GoHeading } from 'react-icons/go'
import { MdAttachEmail, MdOutlineRadioButtonChecked } from 'react-icons/md'
import { Select } from 'tabler-icons-react'
import CustomColorModifier from "../../FormBuilder/FormBuilder(components)/CustomColorModifier.jsx"
// import { PermissionProvider } from '../../Helper/Context'
// import axios from 'axios'

const Reviews = () => {

  //-------------

  const [sideNav, setSideNav] = useState('Basic')

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

  const Border_Options = [
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

  const Border_Size = [
    { label: '1px', value: '1px' },
    { label: '2px', value: '2px' },
    { label: '3px', value: '3px' },
    { label: '4px', value: '4px' },
    { label: '5px', value: '5px' }
  ]

  const defaultData = {
    page_1: {
      name_color: "#3523d9",
      heading_color: "#000000",
      profile_color: "#c67cac",
      background_color: "#c9c9c9",
      border_color: "#050505"
    },
    editorState: "{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"font-weight: 600;font-size: 17px;line-height: 2;\",\"text\":\"Hello,\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"center\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"font-weight: 600;font-size: 17px;line-height: 1;\",\"text\":\"Activate Your Account\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"center\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}",
    htmlContent: "<p class=\"editor-paragraph\" style=\"text-align: center;\" dir=\"ltr\"><b><strong class=\"editor-text-bold\" style=\"font-weight: 600; font-size: 17px; line-height: 2; white-space: pre-wrap;\">Hello,</strong></b></p><p class=\"editor-paragraph\" style=\"text-align: center;\" dir=\"ltr\"><b><strong class=\"editor-text-bold\" style=\"font-weight: 600; font-size: 17px; line-height: 1; white-space: pre-wrap;\">Activate Your Account</strong></b></p>"
  }

  const [style, setStyle] = useState({
    font_size: "15px",
    font_family: "Acme",
    border_radius: "10px",
    border_size: "1px"
  })

  const [currPage, setCurrPage] = useState("page_1")

  const [prevData, setPrevData] = useState(defaultData)

  const [currObj, setCurrObj] = useState(defaultData?.[currPage])
  const [isLoading, setIsLoading] = useState(true)

  console.log(prevData, style)

  // const handleDataChange = (e) => {
  //   const obj = { ...prevData }
  //   if (e.target.name?.includes("password") && e.target.name?.includes("opt_in") && e.target.name?.includes("label_text")) {
  //     obj.page_1[e.target.name] = e.target.value
  //     // if (e.target.name?.includes("opt_in") && obj?.page_1?.label_text === "") {
  //     //   obj.page_1.label_text = defaultLabelText[prevData?.page_1?.opt_in_type]
  //     // }
  //     setPrevData({ ...obj })
  //   } else {
  //     setPrevData({ ...prevData, [currPage]: { ...prevData?.[currPage], [e.target.name]: e.target.value } })
  //   }
  // }

  const getColorPicker = ({ key }) => {
    return <CustomColorModifier styles={currObj} setStyles={setCurrObj} isHex={false} colorType={key} />
  }


  useEffect(() => {
    setPrevData({ ...prevData, [currPage]: { ...currObj } })
  }, [currObj])

  console.log(sideNav, setCurrPage, "sideNav")


  //--------------


  const initialState = { widgetTab: false, permissionTab: false, emailTab: false, emailReminderTab: false, customTab: false }
  const [openTab, setOpenTab] = useState({ ...initialState, widgetTab: true })

  const [reviewInfo, setReviewInfo] = useState({})

  const [customStyle, setCustomStyle] = useState({ primaryColor: "#000", secondaryColor: "#fd7e97", backgroundColor: "#f3ecec", fontSize: "15px", fontColor: "#000", borderColor: "#000", borderSize: 0, borderRadius: 10, style: "star", defaultRating: Star, blankRating: blankStar })

  const [styleDropDown, setStyleDropDown] = useState({ basic: true, font: true, border: true, rating: true })

  const [permissionData, setPermissionData] = useState({ autoApproved: false, autoPublished: 0, anonymousLikes: false, verifiedTag: false, anonymousReviews: false, enableDislikes: false })

  const [rating, setRating] = useState({ likes: 3, dislikes: 2 })

  const apiData = { d_ngrok: "" }

  function getDateDifference(givenDate) {
    const givenDateTime = new Date(givenDate)
    const currentDateTime = new Date()
    const timeDifference = currentDateTime - givenDateTime

    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

    const givenMonth = givenDateTime.getMonth() + 1 // Months are 0-based
    const currentMonth = currentDateTime.getMonth() + 1 // Months are 0-based
    const monthsDifference = (currentDateTime.getFullYear() - givenDateTime.getFullYear()) * (12 + (currentMonth - givenMonth))

    const yearsDifference = currentDateTime.getFullYear() - givenDateTime.getFullYear()

    if (yearsDifference > 0) {
      return `${yearsDifference} years`
    } else if (monthsDifference > 0) {
      return `${monthsDifference} months`
    } else if (daysDifference > 1) {
      return `${daysDifference} days`
    } else if (daysDifference === 1) {
      return "yesterday"
    } else {
      return "today"
    }

  }

  const form_data = new FormData()
  form_data.append("shop", "quickstart-6d4c5332.myshopify.com")

  const handleAutoApproved = async () => {
    try {
      const response = await fetch(
        `${apiData.d_ngrok}/toggle-status/`,
        {
          method: 'POST',
          headers: {
            'ngrok-skip-browser-warning': true
          },
          body: form_data
        }
      )

      if (!response.ok) {
        throw new Error(`Authorization failed due to:${response.status} `)
      }
      setPermissionData({ ...permissionData, autoApproved: !permissionData.autoApproved })
    } catch (error) {
      console.error("Authorizing error: ", error)
    }

  }

  const handleAnonymousReviews = async () => {
    try {
      const response = await fetch(
        `${apiData.d_ngrok}/enable-anonymous-reviews/`,
        {
          method: 'POST',
          headers: {
            'ngrok-skip-browser-warning': true
          },
          body: form_data
        }
      )

      if (!response.ok) {
        throw new Error(`Authorization failed due to:${response.status} `)
      }
      setPermissionData({ ...permissionData, anonymousReviews: !permissionData.anonymousReviews })
    } catch (error) {
      console.error("Authorizing error: ", error)
    }

  }

  const handleAnonymousLikes = async () => {
    try {
      const response = await fetch(
        `${apiData.d_ngrok}/toggle-like-config/`,
        {
          method: 'POST',
          headers: {
            'ngrok-skip-browser-warning': true
          },
          body: form_data
        }
      )

      if (!response.ok) {
        throw new Error(`Authorization failed due to:${response.status} `)
      }
      setPermissionData({ ...permissionData, anonymousLikes: !permissionData.anonymousLikes })
    } catch (error) {
      console.error("Authorizing error: ", error)
    }
  }

  const handleVerifiedTag = async () => {
    try {
      const response = await fetch(
        `${apiData.d_ngrok}/enable-verified-tag/`,
        {
          method: 'POST',
          headers: {
            'ngrok-skip-browser-warning': true
          },
          body: form_data
        }
      )

      if (!response.ok) {
        throw new Error(`Authorization failed due to:${response.status} `)
      }
      setPermissionData({ ...permissionData, verifiedTag: !permissionData.verifiedTag })
    } catch (error) {
      console.error("Authorizing error: ", error)
    }
  }

  const handleDislike = async () => {
    try {

      const response = await fetch(
        `${apiData.d_ngrok}/change-dislike-status/`,
        {
          method: 'POST',
          headers: {
            'ngrok-skip-browser-warning': true
          },
          body: form_data
        }
      )

      if (!response.ok) {
        throw new Error(`Authorization failed due to:${response.status} `)
      }
      setPermissionData({ ...permissionData, enableDislikes: !permissionData.enableDislikes })
    } catch (error) {
      console.error("Authorizing error: ", error)
    }
  }

  const handleSubmit = async () => {
    const form_data = new FormData()
    form_data.append('minimum_rating', permissionData.autoPublished)
    form_data.append("shop", "quickstart-6d4c5332.myshopify.com")
    try {
      const response = await fetch(
        `${apiData.d_ngrok}/update-rating/`,
        {
          method: "POST",
          body: form_data
        }
      )

      if (!response.ok) {
        throw new Error(`Authorization failed due to:${response.status} `)
      }
      console.log("Authorization successful!")
    } catch (error) {
      console.error("Authorizing error: ", error)
    }
  }

  // const handleStyling = (e, value) => {
  //   setCustomStyle({ ...customStyle, [e.target.name]: e.target.value })
  //   console.lof(e)
  //   if (value > 20) {
  //     console.log(value)
  //   }
  // }

  const handleRatingStyle = (e) => {
    const selectedValue = e.target.value
    let defaultRating, blankRating, style
    if (selectedValue === 'star') {
      style = 'star'
      defaultRating = Star
      blankRating = blankStar
    } else if (selectedValue === 'heart') {
      style = 'heart'
      defaultRating = Heart
      blankRating = blankHeart
    } else if (selectedValue === 'smiley') {
      style = 'smiley'
      defaultRating = Smiley
      blankRating = blankSmiley
    } else if (selectedValue === 'fire') {
      style = 'fire'
      defaultRating = Fire
      blankRating = blankFire
    } else if (selectedValue === 'hundred') {
      style = 'hundred'
      defaultRating = Hundred
      blankRating = BlankHundred
    }
    setCustomStyle({ ...customStyle, style, defaultRating, blankRating })
  }

  const submitCustomStyle = () => {
    const form_data = new FormData()
    // form_data.append("uid", "bb8f4c53cb0b5e19")
    form_data.append("shop", "quickstart-6d4c5332.myshopify.com")
    for (const item in customStyle) {
      form_data.append(item, customStyle[item])
    }
    try {
      fetch(`${apiData.d_ngrok}/store-styles/`,
        {
          method: "POST",
          body: form_data
        })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Authorization failed due to:${response.status} `)
          }
          console.log("Send Successful")
        })
    } catch (error) {
      console.error("Authorizing error: ", error)
    }
  }

  useEffect(() => {
    async function fetchData() {
      const url1 = `${apiData.d_ngrok}/review-permissions/`
      const url2 = `${apiData.d_ngrok}/styles/`
      const url3 = `${apiData.d_ngrok}/reviews/`

      fetch(`${apiData.d_ngrok}/reviews/?shop=quickstart-6d4c5332.myshopify.com`, {
        method: 'GET'
      })
        .then((resp) => {
          if (!resp.ok) {
            throw new Error('Network response was not ok')
          }
          return resp.text()
        })
        .then(data => {
          console.log(data)
          // const jsonData = JSON.parse(data)
          // setReviewInfo({ ...jsonData })
          // console.log("reviewInfo", reviewInfo)
          setIsLoading(false)
        })
        .catch((error) => {
          console.log(error)
        })

      const responses = await Promise.all([
        fetch(`${url1}?shop=quickstart-6d4c5332.myshopify.com`,
          {
            method: "GET",
            headers: {
              'ngrok-skip-browser-warning': true
            }
          }),
        fetch(`${url2}?shop=quickstart-6d4c5332.myshopify.com`,
          {
            method: "GET",
            headers: {
              'ngrok-skip-browser-warning': true
            }
          }),
        fetch(`${url3}?shop=quickstart-6d4c5332.myshopify.com`,
          {
            method: "GET",
            headers: {
              'ngrok-skip-browser-warning': true
            }
          })
      ])

      const respPermissionData = await responses[0].json()
      setPermissionData({ autoApproved: respPermissionData[0].auto_approve_reviews, autoPublished: respPermissionData[0].minimum_rating, anonymousLikes: respPermissionData[0].anonymous_likes, verifiedTag: respPermissionData[0].show_verified_tag, anonymousReviews: respPermissionData[0].allow_anonymous_reviews, enableDislikes: respPermissionData[0].enable_dislikes })

      const customStyleData = await responses[1].json()
      let defaultRating, blankRating
      if (customStyleData?.card_styles[0]?.style === 'star') {
        defaultRating = Star
        blankRating = blankStar
      } else if (customStyleData?.card_styles[0]?.style === 'heart') {
        defaultRating = Heart
        blankRating = blankHeart
      } else if (customStyleData?.card_styles[0]?.style === 'smiley') {
        defaultRating = Smiley
        blankRating = blankSmiley
      } else if (customStyleData?.card_styles[0]?.style === 'fire') {
        defaultRating = Fire
        blankRating = blankFire
      } else if (customStyleData?.card_styles[0]?.style === 'hundred') {
        defaultRating = Hundred
        blankRating = BlankHundred
      }

      setCustomStyle({
        primaryColor: customStyleData.card_styles[0].primary_color,
        secondaryColor: customStyleData.card_styles[0].secondary_color,
        backgroundColor: customStyleData.card_styles[0].background_color,
        fontSize: customStyleData.card_styles[0].font_size,
        fontColor: customStyleData.card_styles[0].font_color,
        borderColor: customStyleData.card_styles[0].border_color,
        borderSize: customStyleData.card_styles[0].border_size,
        borderRadius: customStyleData.card_styles[0].border_radius,
        style: customStyleData.card_styles[0].style,
        defaultRating,
        blankRating
      })

      const reviewData = await responses[2].json()
      setReviewInfo({ ...reviewData })
    }
    fetchData()
  }, [])

  console.log(setStyleDropDown)

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Manage Settings</CardTitle>
        </CardHeader>
      </Card>
      <div className="row d-flex justify-content-evenly ">
        <div className="col-md-12">
          <ul className="nav nav-pills flex-column flex-sm-row" role="tablist">
            <li className={`nav-item nav-link pe-auto ${openTab.widgetTab ? 'active' : ''}`} onClick={() => {
              setOpenTab({ ...initialState, widgetTab: true })
            }} role="presentation" style={{cursor: "pointer"}}>

              <BiCommentDetail style={{ fontSize: "16px" }} />Widgets

            </li>
            <li className={`nav-item nav-link pointer-event ${openTab.permissionTab ? 'active' : ''}`} onClick={() => {
              setOpenTab({ ...initialState, permissionTab: true })
            }} role="presentation" style={{cursor: "pointer"}}>
              <FiSettings style={{ fontSize: "16px" }} />Permissions
            </li>
            <li className={`nav-item nav-link pointer-event ${openTab.emailTab ? 'active' : ''}`} onClick={() => {
              setOpenTab({ ...initialState, emailTab: true })
            }} role="presentation" style={{cursor: "pointer"}}>

              <TfiEmail style={{ fontSize: "16px" }} />Emails
            </li>
            <li className={`nav-item nav-link pointer-event ${openTab.emailReminderTab ? 'active' : ''}`} onClick={() => {
              setOpenTab({ ...initialState, emailReminderTab: true })
            }} role="presentation" style={{cursor: "pointer"}}>

              <AiOutlineClockCircle style={{ fontSize: "16px" }} />Integrations

            </li>
            <li className={`nav-item nav-link pointer-event ${openTab.customTab ? 'active' : ''}`} onClick={() => {
              setOpenTab({ ...initialState, customTab: true })
            }} role="presentation" style={{cursor: "pointer"}}>
              <FiEdit style={{ fontSize: "16px" }} />Custom
            </li>
          </ul>
        </div>
      </div>

      {/* widget tab */}
      {openTab.widgetTab && (
        <>
          <Card>
            <CardBody className="text-center">
              <h5 className="row fs-4 d-flex justify-content-center fw-bolder"
                style={{ paddingBottom: "6px" }}
              >
                Customer Reviews
              </h5>
              {!isLoading ? (
                <>
                  <div className="star-rating">

                    <span style={{ fontSize: "12px", marginLeft: "6px", fontWeight: "500" }}>
                      {reviewInfo?.average_rating?.toFixed(1) || 0} out of 5
                    </span>
                  </div>
                  <div
                    className="pb-1"
                    style={{ fontSize: "12px", fontWeight: "bold", paddingTop: "4px" }}
                  >
                    Based on {reviewInfo?.total_reviews || 0} Reviews
                  </div>
                </>
              ) : <div className='d-flex justify-content-center align-items-center'><Spinner size="40px" /></div>}

              {/* <div
                className="HeadReview text-nowrap"
                style={{
                  paddingTop: "5.5px",
                  paddingBottom: "1px",
                  marginLeft: "50px",
                  marginRight: "50px",
                  marginBottom: "0px"
                }}
              >
                <h4
                  style={{ color: "white", fontSize: "13px" }}
                >
                  <span className="NoSelect">Write a review</span>
                </h4>
              </div> */}
            </CardBody>
          </Card>

              <div className="row d-grid-col justify-content-start" style={{ overflow: "hidden", overflowY: "auto" }}>
                {/* {renderReviews()} */}
                {
                  reviewInfo?.reviews?.reverse().map((review, index) => {
                    const starImages = Array(5).fill(blankStar)

                    for (let i = 0; i < review?.rating; i++) {
                      starImages[i] = Star
                    }
                    return (
                      <div key={index} className="col-lg-4">
                        <Card className="CardHeight">
                          <CardBody>
                            <div className="row">
                              <div className="col-md-8 col-4 text-nowrap">
                                <CgProfile
                                  style={{
                                    fontSize: "28px",
                                    marginRight: "4px",
                                    marginBottom: "5px"
                                  }}
                                />
                                <span className="fw-bold">{review?.customer.first_name}</span>
                                <VscVerifiedFilled
                                  style={{
                                    color: "#4FB6EC",
                                    fontSize: "16px",
                                    marginBottom: "4px",
                                    marginLeft: "2px"
                                  }}
                                />
                              </div>
                              <div className="col-md-4 col-8 text-end text-nowrap">
                                <span className="ReviewPeriod">{getDateDifference(review?.created_at)}</span>
                              </div>
                            </div>
                            <div className="row pt-2">
                              <div className="col-lg-6 fw-bold">{review?.review}</div>
                              <div className="col-lg-6 ">
                                {starImages.map((src) => <img src={src} alt="star" />)}
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </div>
                    )
                  })
                }
              </div>

        </>
      )}

      {/* permission */}
      {openTab.permissionTab && (
        <Card className="permission-tab-popup p-0 mx-auto" style={{ maxWidth: "400px" }}>
          <CardBody className="text-start">
            <div className="row d-flex text-warp text-md-nowarp ">
              <div className="col-sm-8 col-8 d-flex justify-content-start ">
                <h4 className="PermissionFont py-1">
                  Auto-approve review submissions
                </h4>
              </div>
              <div className="col-sm-4 col-4  form-check form-switch my-1 d-flex justify-content-end">
                <input
                  className="tgglSize form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  onChange={() => {
                    console.log("to")
                    handleAutoApproved()
                  }}
                  checked={permissionData.autoApproved}
                />
              </div>
            </div>
            <div className="row d-flex text-warp text-md-nowarp ">
              <div className="col-sm-8 col-8 d-flex justify-content-start ">
                <h4 className="PermissionFont py-1">Allow anonymous reviews</h4>
              </div>
              <div className="col-sm-4 col-4  form-check form-switch my-1 d-flex justify-content-end">
                <input
                  className="tgglSize form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  onChange={() => {
                    handleAnonymousReviews()
                  }}
                  checked={permissionData.anonymousReviews}
                />
              </div>
            </div>
            <div className="row d-flex text-warp text-md-nowarp ">
              <div className="col-sm-8 col-8 d-flex justify-content-start ">
                <h4 className="PermissionFont py-1">
                  Allow anonymous Likes
                </h4>
              </div>
              <div className="col-sm-4 col-4  form-check form-switch my-1 d-flex justify-content-end">
                <input
                  className="tgglSize form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  onChange={handleAnonymousLikes}
                  checked={permissionData.anonymousLikes}
                />
              </div>
            </div>
            <div className="row d-flex text-warp text-md-nowarp ">
              <div className="col-sm-8 col-8 d-flex justify-content-start ">
                <h4 className="PermissionFont py-1 ">Display ‘Verified’ tag</h4>
              </div>
              <div className="col-sm-4 col-4  form-check form-switch my-1 d-flex justify-content-end">
                <input
                  className="tgglSize form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  onChange={() => (
                    handleVerifiedTag()
                  )}
                  checked={permissionData.verifiedTag}
                />
              </div>
            </div>
            <div className="row d-flex text-warp text-md-nowarp ">
              <div className="col-sm-8 col-8 d-flex justify-content-start ">
                <h4 className="PermissionFont py-1 ">Enable dislikes</h4>
              </div>
              <div className="col-sm-4 col-4  form-check form-switch my-1 d-flex justify-content-end">
                <input
                  className="tgglSize form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  onChange={() => (
                    handleDislike()
                  )}
                  checked={permissionData.enableDislikes}
                />
              </div>
            </div>
            <div className={`row d-flex ${permissionData.autoApproved ? "nonClickableDiv" : ""}`}>
              <div className="col d-flex justify-content-start ">
                <h4 className="PermissionFont py-1">
                  Auto-publish reviews that are {permissionData.autoPublished} stars & above
                </h4>
              </div>
              <div className="col d-flex justify-content-end p-0">
                <select
                  className="my-1 me-1 ps-1 form-control"
                  style={{ width: "50px", height: "30px" }}
                  onChange={(e) => setPermissionData({ ...permissionData, autoPublished: e.target.value })}
                  value={permissionData.autoPublished}
                >
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
            </div>
            <div className=" d-flex justify-content-end">
              <button className={`btn btn-primary ${permissionData.autoApproved ? "nonClickableDiv" : ""}`} onClick={() => handleSubmit()}>Save</button>
            </div>
          </CardBody>
        </Card>
      )}

      {/* email tab */}
      {openTab.emailTab && (
        <Card className="email-tab-popup p-0">
          <CardBody>
            <h2 className="text-center">Email Tab</h2>
          </CardBody>
        </Card>
      )}

      {/* Email Reminder Tab */}
      {openTab.emailReminderTab && (
        <div className="row emailReminder-tab-popup p-0">
          {/* customer */}
          <div className="col-md">
            <Card className="customer-tab-popup p-0">
              <CardBody>
                <h5 className="fw-bolder">Send XX email reminders</h5>
                <p style={{ fontSize: "12px", fontWeight: "500" }}>
                  1st reminder XX days after product delivery
                </p>
                <p style={{ fontSize: "12px", fontWeight: "500" }}>
                  2nd reminder XX days after product delivery
                </p>
                <p style={{ fontSize: "12px", fontWeight: "500" }}>
                  3rd reminder XX days after product delivery
                </p>
              </CardBody>
            </Card>
          </div>
          {/* Admin */}
          <div className="col-md">
            <Card className="Equal-Card admin-tab-popup p-0">
              <CardBody>
                <div className="pb-2">
                  <div>
                    <h4 className="fs-5 text-nowarp fw-bolder">
                      New review notification
                    </h4>
                  </div>
                  <div className="col form-check form-switch my-1 ">
                    <input
                      className="tgglSize form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckDefault"
                    />
                  </div>
                  <div>
                    <h6 style={{ fontSize: "11px", color: "grey", opacity: "0.8" }}>
                      Get email notice when product gets a new review
                    </h6>
                  </div>
                </div>

              </CardBody>
            </Card>
          </div>
        </div>
      )}

      {/* Custom Tab */}
      {openTab.customTab && (
        <>
          <Row className="" >
            <div className="d-flex" style={{ height: "66vh" }}>

              <div className='d-flex h-100'>
                <div className="nav-sidebar d-flex flex-column align-items-stretch justify-content-start border-end text-center h-100" style={{ padding: "0.5rem 18px", width: "100px", overflow: "auto", gap: '20px' }}>
                  <div className={`sideNav-items d-flex flex-column align-items-center justify-content-center ${sideNav === "Header" ? "text-black active-item" : ""}`} style={{ gap: "0.5rem", cursor: "pointer", padding: "0.75rem 0px" }} onClick={() => setSideNav(sideNav === "Basic" ? "" : "Basic")}>
                    <button className={`btn d-flex align-items-center justify-content-center`} style={{ aspectRatio: "1", padding: "0rem", border: "none", outline: "none", transition: "0.3s ease-in-out" }}>
                      <GoHeading size={'15px'} />
                    </button>
                    <span style={{ fontSize: "8.5px", fontStyle: "normal", fontWeight: "500", lineHeight: "10px", transition: "0.3s ease-in-out" }} className={`text-uppercase`}>Basic</span>
                  </div>
                  <div className={`sideNav-items d-flex flex-column align-items-center justify-content-center ${sideNav === "Sub_Header" ? "text-black active-item" : ""}`} style={{ gap: "0.5rem", cursor: "pointer", padding: "0.75rem 0px" }} onClick={() => setSideNav(sideNav === "Font" ? "" : "Font")}>
                    <button className={`btn d-flex align-items-center justify-content-center`} style={{ aspectRatio: "1", padding: "0rem", border: "none", outline: "none", transition: "0.3s ease-in-out" }}>
                      <Type size={'15px'} />
                    </button>
                    <span style={{ fontSize: "8.5px", fontStyle: "normal", fontWeight: "500", lineHeight: "10px", transition: "0.3s ease-in-out" }} className={`text-uppercase`}>Font</span>
                  </div>
                  <div className={`sideNav-items d-flex flex-column align-items-center justify-content-center ${sideNav === "button" ? "text-black active-item" : ""}`} style={{ gap: "0.5rem", cursor: "pointer", padding: "0.75rem 0px" }} onClick={() => setSideNav(sideNav === "Border" ? "" : "Border")}>
                    <button className={`btn d-flex align-items-center justify-content-center`} style={{ aspectRatio: "1", padding: "0rem", border: "none", outline: "none", transition: "0.3s ease-in-out" }}>
                      <MdOutlineRadioButtonChecked size={'15px'} />
                    </button>
                    <span style={{ fontSize: "8.5px", fontStyle: "normal", fontWeight: "500", lineHeight: "10px", transition: "0.3s ease-in-out" }} className={`text-uppercase`}>Border</span>
                  </div>
                  <div className={`sideNav-items d-flex flex-column align-items-center justify-content-center ${sideNav === "setting" ? "text-black active-item" : ""}`} style={{ gap: "0.5rem", cursor: "pointer", padding: "0.75rem 0px" }} onClick={() => setSideNav(sideNav === "Rating" ? "" : "Rating")}>
                    <button className={`btn d-flex align-items-center justify-content-center`} style={{ aspectRatio: "1", padding: "0rem", border: "none", outline: "none", transition: "0.3s ease-in-out" }}>
                      <Settings size="15px" />
                    </button>
                    <span style={{ fontSize: "8.5px", fontStyle: "normal", fontWeight: "500", lineHeight: "10px", transition: "0.3s ease-in-out" }} className={`text-uppercase`}>Rating</span>
                  </div>
                </div>

                <div className="d-flex align-items-stretch flex-grow-1">
                  <div className=" border-end bg-white position-relative h-100" style={{ width: sideNav === "" ? "0px" : "400px", overflowX: "hidden", transition: "0.3s ease-in-out", opacity: "1", boxShadow: "10px 2px 5px rgba(0,0,0,0.125)", zIndex: "1" }}>
                    <div className='w-100' style={{ height: "100%", overflowY: "auto" }}>
                      {sideNav === "Basic" && <div>
                        <UncontrolledAccordion stayOpen defaultOpen={["1"]}>
                          <AccordionItem>
                            <AccordionHeader className='acc-header border-top' targetId='1' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                              <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Basic</label>
                            </AccordionHeader>
                            <AccordionBody accordionId='1'>

                              <div className="py-1">
                                <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Primary Color</label>
                                <UncontrolledDropdown className="w-100 p-0" direction="start">
                                  <DropdownToggle style={{ fontSize: "10px" }} className="rounded w-100 p-0">
                                    <div style={{ backgroundColor: "#ffffff", padding: "0.525rem" }} className="rounded form-control d-flex align-items-center gap-1">
                                      <span style={{ width: "15px", aspectRatio: "1", outline: "1px solid #ffffff", border: "1px solid black", backgroundColor: `${currObj.name_color}` }}></span><span style={{ fontSize: "12px" }}>{currObj.name_color}</span>
                                    </div>
                                  </DropdownToggle>
                                  <DropdownMenu className="p-0 drop_menu_custom">
                                    <DropdownItem className="p-0" style={{ width: "250px" }}>
                                      {getColorPicker({ key: "name_color" })}
                                    </DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                              </div>

                              <div className="py-1">
                                <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Secondary Color</label>
                                <UncontrolledDropdown className="w-100 p-0" direction="start">
                                  <DropdownToggle style={{ fontSize: "10px" }} className="rounded w-100 p-0">
                                    <div style={{ backgroundColor: "#ffffff", padding: "0.525rem" }} className="rounded form-control d-flex align-items-center gap-1">
                                      <span style={{ width: "15px", aspectRatio: "1", outline: "1px solid #ffffff", border: "1px solid black", backgroundColor: `${currObj.profile_color}` }}></span><span style={{ fontSize: "12px" }}>{currObj.profile_color}</span>
                                    </div>
                                  </DropdownToggle>
                                  <DropdownMenu className="p-0 drop_menu_custom">
                                    <DropdownItem className="p-0" style={{ width: "250px" }}>
                                      {getColorPicker({ key: "profile_color" })}
                                    </DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                              </div>

                              <div className="py-1">
                                <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Background Color</label>
                                <UncontrolledDropdown className="w-100 p-0" direction="start">
                                  <DropdownToggle style={{ fontSize: "10px" }} className="rounded w-100 p-0">
                                    <div style={{ backgroundColor: "#ffffff", padding: "0.525rem" }} className="rounded form-control d-flex align-items-center gap-1">
                                      <span style={{ width: "15px", aspectRatio: "1", outline: "1px solid #ffffff", border: "1px solid black", backgroundColor: `${currObj.background_color}` }}></span><span style={{ fontSize: "12px" }}>{currObj.background_color}</span>
                                    </div>
                                  </DropdownToggle>
                                  <DropdownMenu className="p-0 drop_menu_custom">
                                    <DropdownItem className="p-0" style={{ width: "250px" }}>
                                      {getColorPicker({ key: "background_color" })}
                                    </DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                              </div>
                            </AccordionBody>
                          </AccordionItem>
                        </UncontrolledAccordion>
                      </div>}

                      {sideNav === "Font" && <div>
                        <UncontrolledAccordion stayOpen defaultOpen={["1"]}>
                          <AccordionItem>
                            <AccordionHeader className='acc-header border-top' targetId='1' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                              <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Font</label>
                            </AccordionHeader>
                            <AccordionBody accordionId='1'>
                              <div className="py-1">
                                <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Font Size</label>
                                <select className="form-control" onChange={(e) => { setStyle({ ...style, font_size: e.target.value }); console.log(e.target.value) }}>
                                  {
                                    FONT_SIZE_OPTIONS.map((ele) => (
                                      <option>{ele.value}</option>
                                    ))
                                  }
                                </select>
                              </div>

                              <div className="py-1">
                                <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Font Color</label>
                                <UncontrolledDropdown className="w-100 p-0" direction="start">
                                  <DropdownToggle style={{ fontSize: "10px" }} className="rounded w-100 p-0">
                                    <div style={{ backgroundColor: "#ffffff", padding: "0.525rem" }} className="rounded form-control d-flex align-items-center gap-1">
                                      <span style={{ width: "15px", aspectRatio: "1", outline: "1px solid #ffffff", border: "1px solid black", backgroundColor: `${currObj.heading_color}` }}></span><span style={{ fontSize: "12px" }}>{currObj.heading_color}</span>
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
                                <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Font Family</label>
                                <select className="form-control" onChange={(e) => { setStyle({ ...style, font_family: e.target.value }); console.log(e.target.value) }}>
                                  {
                                    fontStyles.map((ele) => (
                                      <option>{ele.value}</option>
                                    ))
                                  }
                                </select>
                              </div>
                            </AccordionBody>
                          </AccordionItem>
                        </UncontrolledAccordion>
                      </div>}

                      {sideNav === "Border" && <div>
                        <UncontrolledAccordion stayOpen defaultOpen={["1"]}>
                          <AccordionItem>
                            <AccordionHeader className='acc-header border-top' targetId='1' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                              <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Border</label>
                            </AccordionHeader>
                            <AccordionBody accordionId='1'>
                              <div className="py-1">
                                <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Border Size</label>
                                <select className="form-control" onChange={(e) => { setStyle({ ...style, border_size: e.target.value }); console.log(e.target.value) }}>
                                  {
                                    Border_Size.map((ele) => (
                                      <option>{ele.value}</option>
                                    ))
                                  }
                                </select>
                              </div>

                              <div className="py-1">
                                <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Border Color</label>
                                <UncontrolledDropdown className="w-100 p-0" direction="start">
                                  <DropdownToggle style={{ fontSize: "10px" }} className="rounded w-100 p-0">
                                    <div style={{ backgroundColor: "#ffffff", padding: "0.525rem" }} className="rounded form-control d-flex align-items-center gap-1">
                                      <span style={{ width: "15px", aspectRatio: "1", outline: "1px solid #ffffff", border: "1px solid black", backgroundColor: `${currObj.border_color}` }}></span><span style={{ fontSize: "12px" }}>{currObj.border_color}</span>
                                    </div>
                                  </DropdownToggle>
                                  <DropdownMenu className="p-0 drop_menu_custom">
                                    <DropdownItem className="p-0" style={{ width: "250px" }}>
                                      {getColorPicker({ key: "border_color" })}
                                    </DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                              </div>

                              <div className="py-1">
                                <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Border radius</label>
                                <select className="form-control" onChange={(e) => { setStyle({ ...style, border_radius: e.target.value }); console.log(e.target.value) }}>
                                  {
                                    Border_Options.map((ele) => (
                                      <option>{ele.value}</option>
                                    ))
                                  }
                                </select>
                              </div>
                            </AccordionBody>
                          </AccordionItem>
                        </UncontrolledAccordion>
                      </div>}

                      {sideNav === "Rating" && <div>
                        <UncontrolledAccordion stayOpen defaultOpen={["1"]}>
                          <AccordionItem>
                            <AccordionHeader className='acc-header border-top' targetId='1' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                              <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Rating</label>
                            </AccordionHeader>
                            <AccordionBody accordionId='1'>
                              <div className="py-1">
                                <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Rating</label>
                                <div className={`styleDrop ${styleDropDown.rating ? " styleDropDown mb-4" : " styleDropUp mb-1"}`}>
                                  <select className="form-control mb-1 mx-0 w-75" value={customStyle.style} onChange={(e) => handleRatingStyle(e)}>
                                    <option className="p-1" value="star">Star</option>
                                    <option className="p-1" value="heart">Heart</option>
                                    <option className="p-1" value="smiley">Smiley</option>
                                    <option className="p-1" value="fire">Fire</option>
                                    <option className="p-1" value="hundred">Hundred</option>
                                  </select>
                                </div>
                              </div>
                            </AccordionBody>
                          </AccordionItem>
                        </UncontrolledAccordion>
                      </div>}
                      <div className=" bg-white d-flex justify-content-end align-items-center pt-1 position-sticky me-1">
                        <button className=" btn btn-primary" onClick={submitCustomStyle}>Save</button>
                      </div>
                    </div>

                  </div>
                </div>
              </div>


              <Col md="8">
                <div className="" style={{ width: "95%", margin: "20px", padding: "20px", color: `${currObj.heading_color}`, backgroundColor: `${currObj.background_color}`, border: `${style.border_size} solid ${currObj.border_color}`, borderRadius: `${style.border_radius}` }}>
                  <div className="d-flex justify-content-center">

                    <div style={{ width: "25%" }}>
                      <div className="d-flex align-items-center" style={{ gap: "5px" }}>
                        <div className=" d-flex justify-content-center align-items-center" style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: `${currObj.profile_color}`, color: "#FFF" }}>
                          <span>JD</span>
                        </div>
                        <div>
                          <h6 className=" m-0" style={{ fontWeight: "900", color: `${currObj.name_color}` }}>Rajeev Tikekar</h6>
                          <span className="flex-between verified" style={{ gap: "5px", fontSize: "12px" }}>
                            <VscVerifiedFilled
                              style={{
                                color: "#4FB6EC",
                                fontSize: "16px",
                                marginBottom: "4px",
                                marginLeft: "2px"
                              }} />
                            Verified Buyer
                          </span>
                        </div>
                      </div>
                    </div>


                    <div style={{ width: "70%" }}>
                      <div className="d-flex justify-content-between align-items-center" style={{ marginBottom: "10px" }}>
                        <div className="d-flex justify-content-start align-items-center gap-1">
                          <img src={customStyle.defaultRating} alt="default-star" style={{ width: "20px" }} />
                          <img src={customStyle.defaultRating} alt="default-star" style={{ width: "20px" }} />
                          <img src={customStyle.defaultRating} alt="default-star" style={{ width: "20px" }} />
                          <img src={customStyle.blankRating} alt="blank-star" style={{ width: "20px" }} />
                          <img src={customStyle.blankRating} alt="blank-star" style={{ width: "20px" }} />
                        </div>
                        <p style={{ color: `${customStyle.fontColor}` }}>21/08/2023</p>
                      </div>

                      <p style={{ fontSize: `${style.font_size}`, fontFamily: `${style.font_family}`, color: `${currObj.heading_color}`, marginBottom: "10px" }}>
                        Best Service I've ever got... keep it up Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. Dignissimos, minus iusto! Veniam atque
                        porro ipsa nobis adipisci vel facilis, laborum quidem amet eveniet
                        vero maiores aliquid minus ut natus? Tempore.
                      </p>

                      <div className="d-flex justify-content-between">
                        <img src={''} alt="review" width="80" height="80" />

                        <div className="d-flex justify-content-start align-items-center align-self-end">

                          <button className="d-flex justify-content-start align-items-center border-0 bg-transparent px-1" onClick={() => setRating({ ...rating, likes: rating.likes + 1 })}>
                            <AiOutlineCaretUp color="green" size={'25px'} />
                          </button>

                          <p className="p-0 m-0" style={{ color: `${customStyle.fontColor}` }}>{rating.likes}</p>

                          <button className="d-flex justify-content-start align-items-center border-0 bg-transparent px-1" onClick={() => setRating({ ...rating, dislikes: rating.dislikes + 1 })}>
                            <AiOutlineCaretDown color="red" size={'25px'} />
                          </button>

                          <p className="p-0 m-0" style={{ color: `${customStyle.fontColor}` }}>{rating.dislikes}</p>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              </Col>

              {/* <Col md="4">
              <Card style={{ height: "60vh", overflowY: "scroll" }}>
                <CardBody className=" position-relative pt-0">
                  <div className=" bg-white d-flex justify-content-between align-items-center pt-1 mb-2 position-sticky top-0 z-1">
                    <h3>Custom Form</h3>
                    <button className=" btn btn-primary" onClick={submitCustomStyle}>Save</button>
                  </div>

                  <Row>
                    <Col md="12">
                      <div className=" d-flex justify-content-between align-items-center gap-1 mb-1" onClick={() => setStyleDropDown({ ...styleDropDown, basic: !styleDropDown.basic })}>
                        <h4 className="m-0" style={{ cursor: "pointer" }}>Basic</h4>
                        <IoIosArrowDown size={20} />
                      </div>
                      <div className={`styleDrop ${styleDropDown.basic ? " styleDropDown mb-4" : " styleDropUp mb-1"}`}>
                        <ColorsInput title="Primary Color" name='primaryColor' value={customStyle.primaryColor} handleStyling={handleStyling} />
                        <ColorsInput title="Secondary Color" name='secondaryColor' value={customStyle.secondaryColor} handleStyling={handleStyling} />
                        <ColorsInput title="Background Color" name='backgroundColor' value={customStyle.backgroundColor} handleStyling={handleStyling} />
                      </div>
                    </Col>

                    <Col md="12">
                      <div className=" d-flex justify-content-between align-items-center gap-1 mb-1" onClick={() => setStyleDropDown({ ...styleDropDown, font: !styleDropDown.font })}>
                        <h4 className="m-0" style={{ cursor: "pointer" }}>Font</h4>
                        <IoIosArrowDown size={20} />
                      </div>
                      <div className={`styleDrop ${styleDropDown.font ? " styleDropDown mb-4" : " styleDropUp mb-1"}`}>
                        <NumberInput title="Font Size" name='fontSize' value={customStyle.fontSize} handleStyling={handleStyling} min={10} max={20} />
                        <ColorsInput title="Font Color" name='fontColor' value={customStyle.fontColor} handleStyling={handleStyling} />
                      </div>
                    </Col>

                    <Col md="12">
                      <div className=" d-flex justify-content-between align-items-center gap-1 mb-1" onClick={() => setStyleDropDown({ ...styleDropDown, border: !styleDropDown.border })}>
                        <h4 className="m-0" style={{ cursor: "pointer" }}>Border</h4>
                        <IoIosArrowDown size={20} />
                      </div>
                      <div className={`styleDrop ${styleDropDown.border ? " styleDropDown mb-4" : " styleDropUp mb-1"}`}>
                        <ColorsInput title="Border Color" name='borderColor' value={customStyle.borderColor} handleStyling={handleStyling} />
                        <NumberInput title="Border Size" name='borderSize' value={customStyle.borderSize} handleStyling={handleStyling} min={0} max={10} />
                        <NumberInput title="Border radius" name='borderRadius' value={customStyle.borderRadius} handleStyling={handleStyling} min={0} max={30} />
                      </div>
                    </Col>

                    <Col md="12">
                      <div className=" d-flex justify-content-between align-items-center gap-1 mb-1" onClick={() => setStyleDropDown({ ...styleDropDown, rating: !styleDropDown.rating })}>
                        <h4 className="m-0" style={{ cursor: "pointer" }}>Rating</h4>
                        <IoIosArrowDown size={20} />
                      </div>
                      <div className={`styleDrop ${styleDropDown.rating ? " styleDropDown mb-4" : " styleDropUp mb-1"}`}>
                        <select className="form-control mb-1 mx-0 w-75" value={customStyle.style} onChange={(e) => handleRatingStyle(e)}>
                          <option className="p-1" value="star">Star</option>
                          <option className="p-1" value="heart">Heart</option>
                          <option className="p-1" value="smiley">Smiley</option>
                        </select>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>

            </Col> */}

              {/* //--------- */}
            </div>
          </Row>
        </>
      )}
    </>
  )
}

export default Reviews