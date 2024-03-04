import React, { Suspense, useContext, useEffect, useState } from 'react'
import { Crosshair, Edit, Image, Monitor, PlusCircle, Smartphone, Square, Tag, Target, Type, X, Trash2, XCircle, Columns, Disc, Trash, Percent, MoreVertical, ArrowLeft, Home, CheckSquare, Mail, RotateCcw, RotateCw, Check, ChevronRight, Plus } from 'react-feather'
import { AccordionBody, AccordionHeader, AccordionItem, Card, Container, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody, Row, UncontrolledAccordion, UncontrolledDropdown, Col, ModalHeader, UncontrolledButtonDropdown, CardBody, ModalFooter, Button, Input } from 'reactstrap'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import pixels from "../../assets/images/superLeadz/pixels.png"
import PickerDefault from '../Components/Date-picker/NormalDatePicker'
import Select from 'react-select'
import BgModifier from "../FormBuilder/FormBuilder(components)/BgModifier"
import ModificationSection from '../FormBuilder/FormBuilder(components)/ModificationSection'
import axios from 'axios'
import InputChange from '../NewCustomizationFlow/InputChange'
import BorderChange from '../NewCustomizationFlow/BorderChanges'
import { elementStyles, commonObj, defaultObj } from '../NewCustomizationFlow/defaultStyles'
import toast from 'react-hot-toast'
import CustomColorModifier from '../FormBuilder/FormBuilder(components)/CustomColorModifier'
import countries from '../NewFrontBase/Country'
import isEqual from "lodash.isequal"
// import UndoRedo from '../../data/hooks/UndoRedo'
import { PermissionProvider, ThemesProvider } from '../../Helper/Context'
import { SuperLeadzBaseURL, getReq, postReq } from '../../assets/auth/jwtService'
import Spinner from '../Components/DataTable/Spinner'
import { generateRandomString, getCurrentOutlet, xircls_url } from '../Validator'
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import 'swiper/modules/navigation/navigation.min.css'
import 'swiper/modules/autoplay/autoplay.min.css'
import moment from 'moment/moment'
import ReturnOfferHtml, { defaultOfferStyles } from '../NewCustomizationFlow/ReturnOfferHtml'
import slPrevBg from "../../assets/images/vector/slPrevBg.png"
import FrontBaseLoader from '../Components/Loader/Loader'
import RenderPreview from "./RenderPreview"
import "./Customization.css"
import { CheckBox, RadioInput, SelectInput } from './campaignView/components'
import RenderPreviewCopy from './RenderPreview copy'
import VerifyYourEmailQuick from '../Outlet/VerifyYourEmailQuick'
import VerifyYourEmail from '../Outlet/VerifyYourEmail'
import ComTable from '../Components/DataTable/ComTable'
import { TbReplace } from "react-icons/tb"


export const fontStyles = [
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

const sourceList = [
    { label: "Facebook", value: `facebook` },
    { label: "Instagram", value: `instagram.com` },
    { label: "Twitter", value: `twitter` },
    { label: "LinkedIn", value: `linkedIn` },
    { label: "Google", value: `google` },
    { label: "Linktree", value: `linktree` },
    { label: "Pinterest", value: `pinterest` },
    { label: "Bing", value: `bing` },
    { label: "MailChimp", value: `mailChimp` },
    { label: "Yelp", value: `yelp` }
]

const inputTypeList = [
    { value: 'email', label: 'Email' },
    { value: 'number', label: 'Phone Number' },
    { value: 'firstName', label: 'First Name' },
    { value: 'lastName', label: 'Last Name' },
    { value: "enter_otp", label: "Enter OTP" }
]

const convertToSeconds = ({ time, type }) => {
    if (type === "hours") {
        return time * 3600
    } else if (type === "minutes") {
        return time * 60
    } else {
        return time
    }
}

const sectionWidths = {
    sidebar: "70",
    drawerWidth: "300",
    editSection: "280"

}

const CustomizationParent = () => {
    const { userPermission } = useContext(PermissionProvider)

    // themeLoc variable has the transferred from the AllCampaigns page 
    const themeLoc = useLocation()

    const { EditThemeId } = useParams()

    const defaultIsMobile = new URLSearchParams(themeLoc.search)

    // const dateFormat = "%Y-%m-%d %H:%M:%S"

    // status variable shows whether the user has monile view or desktop view selected while visiting the page
    // const status = (defaultIsMobile.get('isMobile') !== "false" && defaultIsMobile.get('isMobile') !== undefined && defaultIsMobile.get('isMobile') !== null && defaultIsMobile.get('isMobile') !== false)

    const [isMobile, setIsMobile] = useState(defaultIsMobile.get('isMobile') !== "false" && defaultIsMobile.get('isMobile') !== undefined && defaultIsMobile.get('isMobile') !== null && defaultIsMobile.get('isMobile') !== false)

    // const [isDragging, setIsDragging] = useState(false)

    // const [suggestions, setSuggestions] = useState([])

    const mobileCondition = isMobile ? "mobile_" : ""
    const mobileConditionRev = !isMobile ? "mobile_" : ""

    const { allThemes, selectedThemeId } = useContext(ThemesProvider)

    const allPreviews = [...allThemes]

    console.log("finalObj: ", localStorage.getItem("defaultThemeId"))

    const navigate = useNavigate()
    const [mousePos, setMousePos] = useState({})
    const [finalObj, setFinalObj] = useState(themeLoc?.state?.custom_theme ? JSON.parse(themeLoc?.state?.custom_theme) : Boolean(localStorage.getItem("defaultTheme")) ? JSON.parse(localStorage.getItem("defaultTheme")) : Boolean(localStorage.getItem("defaultThemeId")) ? allPreviews[allPreviews.findIndex($ => $?.theme_id === parseFloat(localStorage.getItem("defaultThemeId")))]?.object : selectedThemeId !== "" ? { ...allPreviews[allPreviews?.findIndex($ => $?.theme_id === selectedThemeId)]?.object, campaignStartDate: moment(new Date()).format("YYYY-MM-DD HH:mm:ss") } : defaultObj)
    const [past, setPast] = useState([])
    const [future, setFuture] = useState([])
    const [themeName, setThemeName] = useState(themeLoc?.state?.custom_theme ? finalObj?.theme_name : `Campaign-${generateRandomString()}`)
    const [defColors, setDefColors] = useState(finalObj.defaultThemeColors || {})
    const [textValue, setTextValue] = useState("")
    const [senderName, setSenderName] = useState("")
    const [currColor, setCurrColor] = useState("primary")
    const [nameEdit, setNameEdit] = useState(true)
    const [currPage, setCurrPage] = useState(finalObj?.[`${mobileCondition}pages`][0]?.id)
    const [draggedInputType, setDraggedInputType] = useState("none")

    const pageCondition = currPage === "button" ? "button" : "main"

    const outletData = getCurrentOutlet()
    const visibleOnOptions = [
        { value: 'scroll', label: 'Scroll' },
        { value: 'delay', label: 'Delay' },
        { value: 'button_click', label: 'Button Click' }
    ]

    const pagesSelection = [
        { value: 'all_pages', label: 'All Pages' },
        { value: 'home_page', label: 'Home Page' },
        { value: 'product_page', label: 'Product Page' },
        { value: 'product_list_page', label: 'Product List Page' },
        { value: 'cart_page', label: 'Cart Page' },
        { value: 'custom_page', label: 'Custom Pages' },
        { value: 'custom_source', label: 'Source' }
    ]

    const alignOptions = [
        { value: 'auto auto auto 0px', label: 'Left' },
        { value: 'auto', label: 'Center' },
        { value: 'auto 0px auto auto', label: 'Right' }
    ]

    const [transfered, setTransfered] = useState("")

    // const [crossStyle, setCrossStyle] = useState({ ...finalObj?.crossButtons?.main })
    const [colorType, setColorType] = useState("")

    const [sideNav, setSideNav] = useState('theme')
    const [imageType, setImageType] = useState('SINGLE')

    // const [campaignStart, setCampaignStart] = useState(finalObj?.campaignStartDate === "" ? [new Date()] : [finalObj?.campaignStartDate])

    const [allOffers, setAllOffers] = useState([])
    const [allImages, setAllImages] = useState([])
    const [prodImages, setProdImages] = useState([])
    const [emailTemplate, setEmailTemplate] = useState([])
    const [gotOffers, setGotOffers] = useState(false)
    const [currPosition, setCurrPosition] = useState({
        id: null,
        position: null,
        name: null,
        selectedType: "navMenuStyles"
    })

    const [openPage, setOpenPage] = useState(true)

    const [gotDragOver, setGotDragOver] = useState({ cur: false, curElem: false, subElem: false })

    const [indicatorPosition, setIndicatorPosition] = useState("")

    const [indexes, setIndexes] = useState({ cur: 0, curElem: "left", subElem: "grandparent" })
    const [dragStartIndex, setDragStartIndex] = useState({ cur: 0, curElem: "left", subElem: "grandparent" })
    const [dragOverIndex, setDragOverIndex] = useState({ cur: 0, curElem: "left", subElem: "grandparent" })
    const [mouseEnterIndex, setMouseEnterIndex] = useState({ cur: false, curElem: false, subElem: false })

    // const [bgsettings, setBgSettings] = useState({ ...finalObj?.overlayStyles })

    const [bgModal0, setBgModal0] = useState(false)
    const [bgModal, setBgModal] = useState(false)
    const [bgModal2, setBgModal2] = useState(false)
    const [bgModal3, setBgModal3] = useState(false)
    const [bgModal4, setBgModal4] = useState(false)
    const [bgModal5, setBgModal5] = useState(false)
    const [customColorModal, setCustomColorModal] = useState(false)
    const [customColorModal2, setCustomColorModal2] = useState(false)

    const [outletSenderId, setOutletSenderId] = useState("")
    const [placeholder, setPlaceholder] = useState([])

    // const [btnStyles, setBtnStyles] = useState({ backgroundColor: "rgba(255,255,255,1)", bgType: "solid", width: '300px', maxWidth: "100%", minHeight: '50px', paddingTop: "0px", paddingBottom: "0px", paddingRight: "0px", paddingLeft: "0px", marginTop: "0px", marginBottom: "0px", marginRight: "0px", marginLeft: "0px", borderWidth: "0px 0px 0px 0px", defBorderWidth: "0px", borderColor: "rgba(0,0,0,1)", borderStyle: "solid", borderType: "none", borderTopLeftRadius: "0px", borderTopRightRadius: "0px", borderBottomRightRadius: "0px", borderBottomLeftRadius: "0px", boxSizing: "border-box" })

    const [brandStyles, setBrandStyles] = useState({ backgroundColor: "rgba(255,255,255,0)", bgType: "solid", paddingTop: "0px", paddingBottom: "0px", paddingRight: "0px", paddingLeft: "0px", marginTop: "0px", marginBottom: "0px", marginRight: "auto", marginLeft: "auto", borderWidth: "0px 0px 0px 0px", defBorderWidth: "0px", borderColor: "rgba(0,0,0,1)", borderStyle: "solid", borderType: "none", borderTopLeftRadius: "0px", borderTopRightRadius: "0px", borderBottomRightRadius: "0px", borderBottomLeftRadius: "0px", maxWidth: "100%", maxHeight: "300px", overflow: "auto", boxSizing: "border-box", width: "auto" })

    const [values, setValues] = useState({})

    const [imgModal, setImgModal] = useState(false)

    const [isOfferDraggable, setIsOfferDraggable] = useState(true)
    const [phoneIsOfferDraggable, setPhoneIsOfferDraggable] = useState(true)

    const [cancelCust, setCancelCust] = useState(false)
    const [verifyYourEmail, setVerifyYourEmail] = useState(false)
    const [changeSenderEmail, setChangeSenderEmail] = useState(false)

    // const [offerColors, setOfferColors] = useState({ ...finalObj?.offerProperties?.colors })

    const [currOfferColor, setCurrOfferColor] = useState("")

    const [themeId, setThemeId] = useState(EditThemeId ? EditThemeId : localStorage.getItem("draftId") ? localStorage.getItem("draftId") : 0)

    const [imgLoading, setImgLoading] = useState(false)

    const [isPro, setIsPro] = useState(false)
    const [showBrand, setShowBrand] = useState(true)
    // const [offerTheme, setOfferTheme] = useState(finalObj?.offerTheme)
    const [offersModal, setOffersModal] = useState(false)
    const [emailPreviewModal, setEmailPreviewModal] = useState(false)
    const [apiLoader, setApiLoader] = useState(false)
    const [selectedOffer, setSelectedOffer] = useState({})
    const [renamePage, setRenamePage] = useState("")
    const [pageName, setPageName] = useState("")
    const [openToolbar, setOpenToolbar] = useState(true)
    const [toggleView, setToggleView] = useState(1)
    const [prevOpen, setPrevOpen] = useState(1)

    const [data, setdata] = useState([])
    const [emailList, setEmailList] = useState("")
    const [searchValue, setSearchValue] = useState('')
    const [filteredData, setFilteredData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [disableIpDrag, setDisableIpDrag] = useState([])
    const [imageTab, setImageTab] = useState("default")
    const [dropImage, setDropImage] = useState(false)
    const [rearr, setRearr] = useState(0)
    const [isColDragging, setIsColDragging] = useState(false)
    const [deleteCols, setDeleteCols] = useState(["center", "right"])

    console.log({ dropImage, imageType, finalObj })
    // const [textValue, setTextValue] = useState("")
    // const [senderName, setSenderName] = useState("")
    // const [apiLoader, setApiLoader] = useState(false)

    const refreshOfferDraggable = () => {
        const arr = []
        const phoneArr = []
        finalObj?.pages?.forEach(page => {
            page?.values?.forEach(cur => {
                cur?.elements?.forEach(curElem => {
                    curElem?.element?.forEach(subElem => {
                        arr?.push(subElem?.type === "offer")
                    })
                })
            })
        })
        finalObj?.mobile_pages?.forEach(page => {
            page?.values?.forEach(cur => {
                cur?.elements?.forEach(curElem => {
                    curElem?.element?.forEach(subElem => {
                        phoneArr?.push(subElem?.type === "offer")
                    })
                })
            })
        })
        setIsOfferDraggable(!arr.includes(true))
        setPhoneIsOfferDraggable(!phoneArr.includes(true))
    }

    const handleFilter = e => {
        const { value } = e.target
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

    const updatePresent = (newState) => {
        const data = JSON.stringify(finalObj)
        const newObj = { ...newState }
        const clonedFinalObj = JSON.parse(data)
        setFinalObj({ ...newObj })
        const delay = 200
        const request = setTimeout(() => {
            if (data !== JSON.stringify(newState)) {
                setPast([...past, { ...clonedFinalObj }])
                setFuture([])
            }
        }, delay)

        refreshOfferDraggable()

        return () => {
            clearTimeout(request)
        }
    }

    const undo = () => {
        if (past.length === 0) return

        const newPast = [...past]
        const newPresent = newPast.pop()
        setPast(newPast)
        setFuture([finalObj, ...future])
        setFinalObj(newPresent)
        const arr = currPage === "button" ? newPresent?.[`${mobileCondition}button`] : newPresent?.[`${mobileCondition}pages`][newPresent?.[`${mobileCondition}pages`]?.findIndex($ => $?.id === currPage)].values
        const positionIndex = arr[indexes?.cur]?.elements?.findIndex($ => $?.positionType === indexes?.curElem)
        if (indexes.subElem === "grandparent") {
            if (arr[indexes?.cur]?.style) {
                setValues({ ...arr[indexes?.cur]?.style })
            }
        } else if (indexes.subElem === "parent") {
            if (arr[indexes?.cur]?.elements[positionIndex]?.style) {
                setValues({ ...arr[indexes.cur]?.elements[positionIndex]?.style })
            }
        } else {
            if (arr[indexes?.cur]?.elements[positionIndex]?.element[indexes?.subElem]?.style) {
                setValues({ ...arr[indexes.cur]?.elements[positionIndex]?.element[indexes?.subElem]?.style })
            }
        }
    }

    const redo = () => {
        if (future.length === 0) return

        const newFuture = [...future]
        const newPresent = newFuture.shift()

        setPast([...past, finalObj])
        setFuture(newFuture)
        setFinalObj(newPresent)
        const arr = currPage === "button" ? newPresent?.[`${mobileCondition}button`] : newPresent?.[`${mobileCondition}pages`][newPresent?.[`${mobileCondition}pages`]?.findIndex($ => $?.id === currPage)].values
        const positionIndex = arr[indexes?.cur]?.elements?.findIndex($ => $?.positionType === indexes?.curElem)
        if (indexes.subElem === "grandparent") {
            if (arr[indexes?.cur]?.style) {
                setValues({ ...arr[indexes?.cur]?.style })
            }
        } else if (indexes.subElem === "parent") {
            if (arr[indexes?.cur]?.elements[positionIndex]?.style) {
                setValues({ ...arr[indexes.cur]?.elements[positionIndex]?.style })
            }
        } else {
            if (arr[indexes?.cur]?.elements[positionIndex]?.element[indexes?.subElem]?.style) {
                setValues({ ...arr[indexes.cur]?.elements[positionIndex]?.element[indexes?.subElem]?.style })
            }
        }
    }

    const setcolWise = (arr) => {
        if (currPage === "button") {
            updatePresent({ ...finalObj, [`${mobileCondition}button`]: [...arr] })
        } else {
            const getIndex = finalObj?.[`${mobileCondition}pages`]?.findIndex($ => $.id === currPage)
            const newObj = { ...finalObj }
            newObj[`${mobileCondition}pages`][getIndex].values = [...arr]
            updatePresent({ ...newObj })
        }
    }

    const addPage = (e) => {
        const newObj = { ...finalObj }
        if (e.target.checked) {
            if (!finalObj?.behaviour?.PAGES?.includes("all_pages") && e.target.value !== "all_pages") {
                newObj.behaviour.PAGES = [...finalObj?.behaviour?.PAGES, e.target.value]
            } else if (finalObj?.behaviour?.PAGES?.includes("all_pages") && e.target.value !== "all_pages") {
                newObj.behaviour.PAGES = [...finalObj?.behaviour?.PAGES?.filter(item => item !== "all_pages"), e.target.value]
            } else if (e.target.value === "all_pages") {
                newObj.behaviour.PAGES = ["all_pages"]
            }
        } else if (!e.target.checked && (finalObj?.behaviour?.PAGES?.length !== 1)) {
            newObj.behaviour.PAGES = [...finalObj?.behaviour?.PAGES?.filter(item => item !== e.target.value)]
            // } else if (!e.target.checked && (finalObj?.behaviour?.PAGES.length === 1)) {
            //     toast.error("Select atleast one page")
        }

        updatePresent(newObj)
    }

    const cancelAction = () => {
        const form_data = new FormData()
        if (themeLoc?.state?.custom_theme) {
            const is_draft = localStorage.getItem("is_draft")
            const newObj = JSON.parse(themeLoc?.state?.custom_theme)
            form_data.append('shop', outletData[0]?.web_url)
            form_data.append('app', 'superleadz')
            Object.entries(newObj?.behaviour).map(([key, value]) => {
                if (Array.isArray(value)) {
                    value.map(ele => form_data.append(key, ele))
                } else {
                    form_data.append(key, value)
                }
            })
            form_data.append("json_list", JSON.stringify(newObj))
            form_data.append("selected_offer_list", JSON.stringify(finalObj.selectedOffers))
            form_data.append("campaign_name", newObj?.theme_name)
            form_data.append("start_date", newObj?.campaignStartDate)
            form_data.append("end_date", newObj?.campaignEndDate)
            form_data.append("default_id", selectedThemeId)
            form_data.append("is_edit", 1)

            form_data.append("theme_id", themeId)
            // if (!themeLoc?.state?.custom_theme) {
            form_data.append("is_draft", (is_draft === "undefined" || is_draft === "null") ? 1 : Number(is_draft))
            // }

            axios({
                method: "POST", url: `${SuperLeadzBaseURL}/api/v1/form_builder_template/`, data: form_data
            }).catch((error) => {
                console.log({ error })
            })
        } else {
            const obj = {
                theme_id: [themeId]
            }

            Object.entries(obj).map(([key, value]) => {
                if (Array.isArray(value)) {
                    value.map(ele => {
                        form_data.append(key, ele)
                    })
                } else (
                    form_data.append(key, value)
                )
            })

            axios(`${SuperLeadzBaseURL}/api/v1/delete/theme/`, {
                method: "POST",
                data: form_data
            })
                .catch(() => {
                    return false
                })
        }
    }

    const handleDragStart = (e, dataType, inputType) => {
        e.dataTransfer.setData("type", dataType)
        setIsColDragging(dataType.includes("col1"))
        setDraggedInputType(inputType ? inputType : "none")
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        const colWise = currPage === "button" ? [...finalObj?.[`${mobileCondition}button`]] : [...finalObj?.[`${mobileCondition}pages`][finalObj?.[`${mobileCondition}pages`]?.findIndex($ => $.id === currPage)].values]
        const transferType = e.dataTransfer.getData("type")
        setDragOverIndex(transferType?.includes("col") ? { cur: colWise?.length, curElem: "parent", subElem: "grandparent" } : { cur: colWise?.length, curElem: "left", subElem: 0 })
    }

    const handleLayoutDrop = (e, cur) => {
        // setSideNav('add-elements')
        setIsColDragging(false)
        setGotDragOver({ cur: false, curElem: false, subElem: false })
        const dataTransfered = e.dataTransfer.getData("type")
        const transferedData = dataTransfered?.includes("rearrange") ? dataTransfered?.split("rearrange_") : dataTransfered
        const newObj = { ...finalObj }

        let updatedColWise = currPage === "button" ? finalObj?.button : finalObj?.pages[newObj?.pages?.findIndex($ => $.id === currPage)].values
        let mobile_updatedColWise = currPage === "button" ? finalObj?.mobile_button : finalObj?.mobile_pages[newObj?.mobile_pages?.findIndex($ => $.id === currPage)].values
        // const pageIndex = newObj?.pages?.findIndex($ => $.id === currPage)
        // const mobile_pageIndex = newObj?.mobile_pages?.findIndex($ => $.id === currPage)

        if (transferedData && transferedData !== "row") {
            if (transferedData === "col1") {
                const getId = `${currPage}-${gotDragOver?.cur}-parent-grandparent`
                setMousePos({ ...mousePos, y: e.clientY, x: e.clientX })
                const elem = document.getElementById(getId)
                const { y, height } = elem?.getBoundingClientRect()

                if (mousePos.y - (y + (height / 2)) < 0) {
                    updatedColWise.splice(gotDragOver?.cur, 0, {
                        id: updatedColWise?.length + 1,
                        col: 1,
                        style: elementStyles?.block,
                        elements: [
                            {
                                positionType: 'left',
                                style: elementStyles?.col,
                                element: [{ ...commonObj, type: "", id: updatedColWise?.length }]
                            }
                        ]
                    })

                    mobile_updatedColWise.splice(gotDragOver?.cur, 0, {
                        id: mobile_updatedColWise?.length + 1,
                        col: 1,
                        style: elementStyles?.block,
                        elements: [
                            {
                                positionType: 'left',
                                style: elementStyles?.col,
                                element: [{ ...commonObj, type: "", id: mobile_updatedColWise?.length }]
                            }
                        ]
                    })
                    setIndexes({ ...gotDragOver, curElem: "parent", subElem: "grandparent" })
                } else {
                    updatedColWise?.splice(gotDragOver?.cur + 1, 0, {
                        id: updatedColWise?.length + 1,
                        col: 1,
                        style: elementStyles?.block,
                        elements: [
                            {
                                positionType: 'left',
                                style: elementStyles?.col,
                                element: [{ ...commonObj, type: "", id: updatedColWise?.length }]
                            }
                        ]
                    })

                    mobile_updatedColWise?.splice(gotDragOver?.subElem + 1, 0, {
                        id: mobile_updatedColWise?.length + 1,
                        col: 1,
                        style: elementStyles?.block,
                        elements: [
                            {
                                positionType: 'left',
                                style: elementStyles?.col,
                                element: [{ ...commonObj, type: "", id: mobile_updatedColWise?.length }]
                            }
                        ]
                    })
                    setIndexes({ cur, curElem: "parent", subElem: "grandparent" })
                }
            } else if (transferedData !== "" && !transferedData?.includes("col")) {
                const inputTypeCondition = draggedInputType === "none" ? commonObj?.inputType : draggedInputType
                updatedColWise = [
                    ...updatedColWise, {
                        id: updatedColWise?.length + 1,
                        col: 1,
                        style: elementStyles?.block,
                        elements: [
                            {
                                positionType: 'left',
                                style: elementStyles?.col,
                                element: [dataTransfered?.includes("rearrange") ? { ...updatedColWise[dragStartIndex?.cur]?.elements[updatedColWise[dragStartIndex?.cur]?.elements?.findIndex($ => $?.positionType === dragStartIndex.curElem)]?.element[dragStartIndex?.subElem] } : { ...commonObj, type: transferedData, inputType: inputTypeCondition, placeholder: inputTypeList[inputTypeList?.findIndex($ => $.value === inputTypeCondition)]?.label, labelText: inputTypeList[inputTypeList?.findIndex($ => $.value === inputTypeCondition)]?.label, id: updatedColWise?.length, style: elementStyles?.[transferedData] }]
                            }
                        ]
                    }
                ]
                mobile_updatedColWise = [
                    ...mobile_updatedColWise, {
                        id: mobile_updatedColWise?.length + 1,
                        col: 1,
                        style: elementStyles?.block,
                        elements: [
                            {
                                positionType: 'left',
                                style: elementStyles?.col,
                                element: [dataTransfered?.includes("rearrange") ? { ...mobile_updatedColWise[dragStartIndex?.cur]?.elements[mobile_updatedColWise[dragStartIndex?.cur]?.elements?.findIndex($ => $?.positionType === dragStartIndex.curElem)]?.element[dragStartIndex?.subElem] } : { ...commonObj, type: transferedData, inputType: inputTypeCondition, placeholder: inputTypeList[inputTypeList?.findIndex($ => $.value === inputTypeCondition)]?.label, labelText: inputTypeList[inputTypeList?.findIndex($ => $.value === inputTypeCondition)]?.label, id: updatedColWise?.length, style: elementStyles?.[transferedData] }]
                            }
                        ]
                    }
                ]
            }
        }


        if (dataTransfered.includes("rearrange")) {
            updatedColWise[dragStartIndex.cur]?.elements[updatedColWise[dragStartIndex.cur]?.elements?.findIndex($ => $?.positionType === dragStartIndex.curElem)]?.element?.splice(dragStartIndex?.subElem, 1, { ...commonObj })
            mobile_updatedColWise[dragStartIndex.cur]?.elements[mobile_updatedColWise[dragStartIndex.cur]?.elements?.findIndex($ => $?.positionType === dragStartIndex.curElem)]?.element?.splice(dragStartIndex?.subElem, 1, { ...commonObj })
        }

        // setcolWise(isMobile ? mobile_updatedColWise : updatedColWise)
        if (currPage === "button") {
            updatePresent({ ...finalObj, button: updatedColWise, mobile_button: mobile_updatedColWise })
        } else {
            newObj.pages[newObj?.pages?.findIndex($ => $.id === currPage)].values = updatedColWise
            newObj.mobile_pages[newObj?.mobile_pages?.findIndex($ => $.id === currPage)].values = mobile_updatedColWise
            updatePresent({ ...newObj })
        }
    }

    const handleNewDrop = (e, position, id, index, curData, j) => {
        setIsColDragging(false)
        setGotDragOver({ cur: false, curElem: false, subElem: false })
        const colWise = currPage === "button" ? [...finalObj?.[`${mobileCondition}button`]] : [...finalObj?.[`${mobileCondition}pages`][finalObj?.[`${mobileCondition}pages`]?.findIndex($ => $.id === currPage)].values]
        const dataTransfered = e.dataTransfer.getData("type")
        setValues({ ...elementStyles?.[dataTransfered] })
        const transferedData = dataTransfered?.includes("rearrange") ? dataTransfered?.split("rearrange_") : dataTransfered

        const inputTypeCondition = draggedInputType === "none" ? commonObj?.inputType : draggedInputType

        if (transferedData !== "row") {
            const newObj = { ...finalObj }
            const pageIndex = newObj?.pages?.findIndex($ => $.id === currPage)
            const mobile_pageIndex = newObj?.mobile_pages?.findIndex($ => $.id === currPage)
            const updatedColWise = currPage === "button" ? newObj?.button?.map((col, index) => {
                if (index === id) {
                    const updatedElements = col?.elements?.map((ele) => {
                        if (ele?.positionType === position) {
                            const dupArray = [...ele?.element]
                            dupArray[j] = dataTransfered?.includes("rearrange") ? { ...colWise[dragStartIndex?.cur]?.elements[colWise[dragStartIndex?.cur]?.elements?.findIndex($ => $?.positionType === dragStartIndex?.curElem)]?.element[dragStartIndex?.subElem] } : { ...commonObj, ...ele?.elements, type: transferedData, inputType: inputTypeCondition, placeholder: inputTypeList[inputTypeList?.findIndex($ => $.value === inputTypeCondition)]?.label, labelText: inputTypeList[inputTypeList?.findIndex($ => $.value === inputTypeCondition)]?.label, style: elementStyles?.[transferedData] }
                            return {
                                ...ele,
                                element: [...dupArray]
                            }
                        }
                        return ele
                    })

                    return {
                        ...col,
                        elements: updatedElements
                    }
                }
                return col
            }) : newObj?.pages[pageIndex]?.values?.map((col, index) => {
                if (index === id) {
                    const updatedElements = col?.elements?.map((ele) => {
                        if (ele?.positionType === position) {
                            const dupArray = [...ele?.element]
                            dupArray[j] = dataTransfered?.includes("rearrange") ? { ...colWise[dragStartIndex?.cur]?.elements[colWise[dragStartIndex?.cur]?.elements?.findIndex($ => $?.positionType === dragStartIndex?.curElem)]?.element[dragStartIndex?.subElem] } : { ...commonObj, ...ele?.elements, type: transferedData, inputType: inputTypeCondition, placeholder: inputTypeList[inputTypeList?.findIndex($ => $.value === inputTypeCondition)]?.label, labelText: inputTypeList[inputTypeList?.findIndex($ => $.value === inputTypeCondition)]?.label, style: elementStyles?.[transferedData] }
                            return {
                                ...ele,
                                element: [...dupArray]
                            }
                        }
                        return ele
                    })

                    return {
                        ...col,
                        elements: updatedElements
                    }
                }
                return col
            })
            const mobile_updatedColWise = currPage === "button" ? newObj?.mobile_button?.map((col, index) => {
                if (index === id) {
                    const updatedElements = col?.elements?.map((ele) => {
                        if (ele?.positionType === position) {
                            const dupArray = [...ele?.element]
                            dupArray[j] = dataTransfered?.includes("rearrange") ? { ...colWise[dragStartIndex?.cur]?.elements[colWise[dragStartIndex?.cur]?.elements?.findIndex($ => $?.positionType === dragStartIndex?.curElem)]?.element[dragStartIndex?.subElem] } : { ...commonObj, ...ele?.elements, type: transferedData, inputType: inputTypeCondition, placeholder: inputTypeList[inputTypeList?.findIndex($ => $.value === inputTypeCondition)]?.label, labelText: inputTypeList[inputTypeList?.findIndex($ => $.value === inputTypeCondition)]?.label, style: elementStyles?.[transferedData] }
                            return {
                                ...ele,
                                element: [...dupArray]
                            }
                        }
                        return ele
                    })

                    return {
                        ...col,
                        elements: updatedElements
                    }
                }
                return col
            }) : newObj?.mobile_pages[mobile_pageIndex]?.values?.map((col, index) => {
                if (index === id) {
                    const updatedElements = col?.elements?.map((ele) => {
                        if (ele?.positionType === position) {
                            const dupArray = [...ele?.element]
                            dupArray[j] = dataTransfered?.includes("rearrange") ? { ...colWise[dragStartIndex?.cur]?.elements[colWise[dragStartIndex?.cur]?.elements?.findIndex($ => $?.positionType === dragStartIndex?.curElem)]?.element[dragStartIndex?.subElem] } : { ...commonObj, ...ele?.elements, type: transferedData, inputType: inputTypeCondition, placeholder: inputTypeList[inputTypeList?.findIndex($ => $.value === inputTypeCondition)]?.label, labelText: inputTypeList[inputTypeList?.findIndex($ => $.value === inputTypeCondition)]?.label, style: elementStyles?.[transferedData] }
                            return {
                                ...ele,
                                element: [...dupArray]
                            }
                        }
                        return ele
                    })

                    return {
                        ...col,
                        elements: updatedElements
                    }
                }
                return col
            })
            if (dataTransfered?.includes("rearrange")) {
                if (isMobile ? mobile_updatedColWise[dragStartIndex.cur]?.elements[colWise[dragStartIndex?.cur]?.elements?.findIndex($ => $?.positionType === dragStartIndex?.curElem)]?.element?.length < 2 : updatedColWise[dragStartIndex.cur]?.elements[colWise[dragStartIndex?.cur]?.elements?.findIndex($ => $?.positionType === dragStartIndex?.curElem)]?.element?.length < 2) {
                    updatedColWise[dragStartIndex.cur]?.elements[colWise[dragStartIndex.cur]?.elements?.findIndex($ => $?.positionType === dragStartIndex?.curElem)]?.element?.splice(dragStartIndex?.subElem, 1, { ...commonObj })
                    mobile_updatedColWise[dragStartIndex.cur]?.elements[colWise[dragStartIndex.cur]?.elements?.findIndex($ => $?.positionType === dragStartIndex?.curElem)]?.element?.splice(dragStartIndex?.subElem, 1, { ...commonObj })
                } else {
                    updatedColWise[dragStartIndex.cur]?.elements[colWise[dragStartIndex?.cur]?.elements?.findIndex($ => $?.positionType === dragStartIndex?.curElem)].element?.splice(dragStartIndex?.subElem, 1)
                    mobile_updatedColWise[dragStartIndex.cur]?.elements[colWise[dragStartIndex?.cur]?.elements?.findIndex($ => $?.positionType === dragStartIndex?.curElem)].element?.splice(dragStartIndex?.subElem, 1)
                }
            } else if (dataTransfered?.includes("image")) {
                setDropImage(true)
            }
            setcolWise(isMobile ? mobile_updatedColWise : updatedColWise)

            // newObj.pages[pageIndex].values = [...updatedColWise]
            // newObj.mobile_pages[mobile_pageIndex].values = [...mobile_updatedColWise]
            // updatePresent({ ...newObj })
        }
    }

    const makActive = (e, cur, curData, position, id, j) => {
        setCurrPosition({ ...currPosition, position, id, name: e.target.name, curData, cur, j })
    }

    const changeColumn = (col, width, isDelete) => {
        const newObj = { ...finalObj }
        const dupArray = currPage === "button" ? [...newObj?.[`button`]] : [...newObj?.[`pages`][newObj?.[`pages`]?.findIndex($ => $.id === currPage)].values]
        const mobile_dupArray = currPage === "button" ? [...newObj?.[`mobile_button`]] : [...newObj?.[`mobile_pages`][newObj?.[`mobile_pages`]?.findIndex($ => $.id === currPage)].values]
        let elements, mobile_elements
        // const refer = ["left", "center", "right"]
        if (col === "1") {
            if (isDelete) {
                const newRow = dupArray[indexes?.cur]?.elements?.filter($ => !deleteCols.includes($.positionType))
                const mobile_newRow = mobile_dupArray[indexes?.cur]?.elements?.filter($ => !deleteCols.includes($.positionType))
                elements = [
                    {
                        positionType: 'left',
                        style: { ...newRow[0]?.style, width: `${width?.left}` },
                        element: [...newRow[0]?.element]
                    }
                ]
                mobile_elements = [
                    {
                        positionType: 'left',
                        style: { ...mobile_newRow[0]?.style, width: `${width?.left}` },
                        element: [...mobile_newRow[0]?.element]
                    }
                ]
            } else {
                elements = [
                    {
                        positionType: 'left',
                        style: { ...dupArray[indexes.cur]?.elements[0]?.style, width: `${width?.left}` },
                        element: [...dupArray[indexes.cur]?.elements[0]?.element]
                    }
                ]
                mobile_elements = [
                    {
                        positionType: 'left',
                        style: { ...mobile_dupArray[indexes.cur]?.elements[0]?.style, width: `${width?.left}` },
                        element: [...mobile_dupArray[indexes.cur]?.elements[0]?.element]
                    }
                ]
            }
        } else if (col === "2") {
            if (isDelete) {
                const newRow = dupArray[indexes?.cur]?.elements?.filter($ => !deleteCols.includes($.positionType))
                const mobile_newRow = mobile_dupArray[indexes?.cur]?.elements?.filter($ => !deleteCols.includes($.positionType))
                elements = [
                    {
                        positionType: 'left',
                        style: { ...newRow[0]?.style },
                        element: [...newRow[0]?.element]
                    },
                    {
                        positionType: 'right',
                        style: { ...newRow[1]?.style },
                        element: [...newRow[1]?.element]
                    }
                ]
                mobile_elements = [
                    {
                        positionType: 'left',
                        style: { ...mobile_newRow[0]?.style },
                        element: [...mobile_newRow[0]?.element]
                    },
                    {
                        positionType: 'right',
                        style: { ...mobile_newRow[1]?.style },
                        element: [...mobile_newRow[1]?.element]
                    }
                ]
            } else {
                elements = [
                    {
                        positionType: 'left',
                        style: { ...dupArray[indexes.cur]?.elements[0]?.style, width: `${width?.left}` },
                        element: [...dupArray[indexes.cur]?.elements[0]?.element]
                    },
                    {
                        positionType: 'right',
                        style: dupArray[indexes?.cur].elements?.length !== 1 ? { ...dupArray[indexes?.cur]?.elements[1]?.style, width: `${width?.right}` } : { ...elementStyles?.col, width: `${width?.right}` },
                        element: dupArray[indexes?.cur]?.elements?.length !== 1 ? [...dupArray[indexes?.cur]?.elements[1]?.element] : [{ ...commonObj, type: "", id: dupArray?.length }]
                    }
                ]
                mobile_elements = [
                    {
                        positionType: 'left',
                        style: { ...mobile_dupArray[indexes.cur]?.elements[0]?.style, width: `${width?.left}` },
                        element: [...mobile_dupArray[indexes.cur]?.elements[0]?.element]
                    },
                    {
                        positionType: 'right',
                        style: mobile_dupArray[indexes?.cur].elements?.length !== 1 ? { ...mobile_dupArray[indexes?.cur]?.elements[1]?.style, width: `${width?.right}` } : { ...elementStyles?.col, width: `${width?.right}` },
                        element: mobile_dupArray[indexes?.cur]?.elements?.length !== 1 ? [...mobile_dupArray[indexes?.cur]?.elements[1]?.element] : [{ ...commonObj, type: "", id: dupArray?.length }]
                    }
                ]
            }
        } else {
            elements = [
                {
                    positionType: 'left',
                    style: { ...dupArray[indexes.cur]?.elements[0]?.style, width: `${width?.left}` },
                    element: [...dupArray[indexes.cur]?.elements[0]?.element]
                },
                {
                    positionType: 'center',
                    style: dupArray[indexes.cur]?.elements?.length > 1 ? { ...dupArray[indexes.cur]?.elements[1]?.style, width: `${width?.center}` } : { ...elementStyles?.col, width: `${width?.center}` },
                    element: dupArray[indexes.cur]?.elements?.length > 1 ? [...dupArray[indexes.cur]?.elements[1]?.element] : [{ ...commonObj, type: "", id: dupArray?.length }]
                },
                {
                    positionType: 'right',
                    style: dupArray[indexes.cur].elements?.length === 3 ? { ...dupArray[indexes.cur]?.elements[2]?.style, width: `${width?.right}` } : { ...elementStyles?.col, width: `${width?.right}` },
                    element: dupArray[indexes.cur]?.elements?.length === 3 ? [...dupArray[indexes.cur]?.elements[2]?.element] : [{ ...commonObj, type: "", id: dupArray?.length }]
                }
            ]
            mobile_elements = [
                {
                    positionType: 'left',
                    style: { ...mobile_dupArray[indexes.cur]?.elements[0]?.style, width: `${width?.left}` },
                    element: [...mobile_dupArray[indexes.cur]?.elements[0]?.element]
                },
                {
                    positionType: 'center',
                    style: mobile_dupArray[indexes.cur]?.elements?.length > 1 ? { ...mobile_dupArray[indexes.cur]?.elements[1]?.style, width: `${width?.center}` } : { ...elementStyles?.col, width: `${width?.center}` },
                    element: mobile_dupArray[indexes.cur]?.elements?.length > 1 ? [...mobile_dupArray[indexes.cur]?.elements[1]?.element] : [{ ...commonObj, type: "", id: mobile_dupArray?.length }]
                },
                {
                    positionType: 'right',
                    style: mobile_dupArray[indexes.cur].elements?.length === 3 ? { ...mobile_dupArray[indexes.cur]?.elements[2]?.style, width: `${width?.right}` } : { ...elementStyles?.col, width: `${width?.right}` },
                    element: mobile_dupArray[indexes.cur]?.elements?.length === 3 ? [...mobile_dupArray[indexes.cur]?.elements[2]?.element] : [{ ...commonObj, type: "", id: mobile_dupArray?.length }]
                }
            ]
        }
        dupArray[indexes.cur].elements = elements
        mobile_dupArray[indexes.cur].elements = mobile_elements
        if (currPage === "button") {
            newObj.button = dupArray
            newObj.mobile_button = mobile_dupArray
        } else {
            newObj.pages[newObj?.pages?.findIndex($ => $?.id === currPage)].values = dupArray
            newObj.mobile_pages[newObj?.mobile_pages?.findIndex($ => $?.id === currPage)].values = mobile_dupArray
        }
        updatePresent({ ...newObj })
        setDeleteCols(["center", "right"])
        // setcolWise([...colWise])
    }

    const triggerImage = () => {
        setImgModal(true)
        setImgLoading(true)
        const imgUrl = new URL(`${SuperLeadzBaseURL}/api/v1/bucket_images/?shop=${outletData[0]?.web_url}&app=superleadz`)
        axios({
            method: "GET",
            url: imgUrl
        })
            .then((data) => {
                if (data.status === 200) {
                    setAllImages(data.data.images)
                    setImgLoading(false)
                } else {
                    toast.error("request image failed")
                }
            })
            .catch(err => console.log(err))


        getReq('productDetails', `/?app=${userPermission.appName}`)
            .then((res) => {
                const imgArray = new Array()
                res?.data?.data?.product_details?.Product_Details?.products.forEach(prod => {
                    prod.images.forEach(img => {
                        imgArray.push({ image: img.src })
                    })
                })
                setProdImages(imgArray)
            })
            .catch(err => console.log(err))
    }

    const getMDToggle = ({ label, value }, isMainBg) => {
        const newObj = { ...finalObj }

        let icon

        let setBoolean = false

        if (isMainBg) {
            setBoolean = Array.isArray(value) ? value.every($ => finalObj?.responsiveStyles?.[`${pageCondition}`].includes($)) : finalObj?.responsiveStyles?.[`${pageCondition}`].includes(value)
        } else if (currPosition?.selectedType === "close") {
            setBoolean = Array.isArray(value) ? value.every($ => finalObj?.responsiveStyles?.[`close`].includes($)) : finalObj?.responsiveStyles?.[`close`].includes(value)
        } else {
            let responsiveStyles
            const arr = currPage === "button" ? finalObj?.button : finalObj?.pages[finalObj?.pages?.findIndex($ => $?.id === currPage)]?.values
            if (indexes?.subElem === "grandparent") {
                responsiveStyles = arr[indexes?.cur]?.responsiveStyles
            } else if (indexes?.subElem === "parent") {
                const positionIndex = arr[indexes.cur]?.elements?.findIndex($ => $?.positionType === indexes.curElem)
                responsiveStyles = arr[indexes?.cur]?.elements[positionIndex]?.responsiveStyles
            } else {
                const positionIndex = arr[indexes.cur]?.elements?.findIndex($ => $?.positionType === indexes.curElem)
                responsiveStyles = arr[indexes?.cur]?.elements[positionIndex]?.element[indexes?.subElem]?.responsiveStyles
            }

            if (Array.isArray(responsiveStyles)) {
                setBoolean = Array.isArray(value) ? value.every($ => responsiveStyles.includes($)) : responsiveStyles.includes(value)
            }
        }

        if (setBoolean) {
            icon = <><Monitor size={"12px"} /><Smartphone size={"12px"} /></>
        } else {
            icon = isMobile ? <Smartphone size={"15px"} /> : <Monitor size={"15px"} />
        }

        const setCondition = (condition) => {
            const arr = currPage === "button" ? finalObj?.button : finalObj?.pages[finalObj?.pages?.findIndex($ => $?.id === currPage)]?.values
            const mobile_arr = currPage === "button" ? finalObj?.mobile_button : finalObj?.mobile_pages[finalObj?.mobile_pages?.findIndex($ => $?.id === currPage)]?.values

            const setArr = (arr1, arr2) => {
                if (arr1 && Array.isArray(arr1)) {
                    if (condition) {
                        Array.isArray(value) ? value.forEach($ => arr1.push($)) : arr1?.push(value)
                    } else {
                        arr1 = Array.isArray(value) ? arr1?.filter($ => !value.includes($)) : arr1?.filter($ => $ !== value)
                    }
                    arr2 = arr1
                } else if (condition) {
                    let newArr = []
                    Array.isArray(value) ? value.map($ => newArr.push($)) : newArr = [value]
                    arr1 = [...newArr]
                    arr2 = [...newArr]
                }
                return { arr1, arr2 }
            }

            if (isMainBg) {
                const trObj = setArr(newObj?.responsiveStyles?.[`${isMainBg}`], [])
                const { arr1 } = trObj
                newObj.responsiveStyles[`${isMainBg}`] = arr1
            } else if (currPosition?.selectedType === "close") {
                const trObj = setArr(newObj?.responsiveStyles?.[`close`], [])
                const { arr1 } = trObj
                newObj.responsiveStyles[`close`] = arr1
            } else {
                if (indexes?.subElem === "grandparent") {
                    const trObj = setArr(arr[indexes?.cur]?.responsiveStyles, mobile_arr[indexes?.cur]?.responsiveStyles)
                    const { arr1, arr2 } = trObj
                    arr[indexes?.cur].responsiveStyles = arr1
                    mobile_arr[indexes?.cur].responsiveStyles = arr2
                } else if (indexes?.subElem === "parent") {
                    const positionIndex = arr[indexes.cur]?.elements?.findIndex($ => $?.positionType === indexes.curElem)
                    const trObj = setArr(arr[indexes?.cur]?.elements[positionIndex]?.responsiveStyles, mobile_arr[indexes?.cur]?.elements[positionIndex]?.responsiveStyles)
                    const { arr1, arr2 } = trObj
                    arr[indexes?.cur].elements[positionIndex].responsiveStyles = arr1
                    mobile_arr[indexes?.cur].elements[positionIndex].responsiveStyles = arr2
                } else {
                    const positionIndex = arr[indexes.cur]?.elements?.findIndex($ => $?.positionType === indexes.curElem)
                    const trObj = setArr(arr[indexes?.cur]?.elements[positionIndex]?.element[indexes?.subElem]?.responsiveStyles, mobile_arr[indexes?.cur]?.elements[positionIndex]?.element[indexes?.subElem]?.responsiveStyles)
                    const { arr1, arr2 } = trObj
                    arr[indexes?.cur].elements[positionIndex].element[indexes?.subElem].responsiveStyles = arr1
                    mobile_arr[indexes?.cur].elements[positionIndex].element[indexes?.subElem].responsiveStyles = arr2
                }
                if (currPage === "button") {
                    newObj.button = arr
                    newObj.mobile_button = mobile_arr
                } else {
                    newObj.pages[newObj?.pages?.findIndex($ => $?.id === currPage)].values = arr
                    newObj.mobile_pages[newObj?.mobile_pages?.findIndex($ => $?.id === currPage)].values = mobile_arr
                }
            }
            updatePresent({ ...newObj })
        }

        return (
            <div className="d-flex justify-content-between align-items-center mb-2">
                <span className='fw-bolder text-black d-flex align-items-center gap-1' style={{ fontSize: "0.75rem" }}>{label}</span>
                <UncontrolledButtonDropdown>
                    <DropdownToggle color='dark' style={{ padding: "0.5rem" }} className='hide-after-dropdown rounded'>
                        {icon}
                    </DropdownToggle>
                    <DropdownMenu end>
                        <DropdownItem onClick={() => {
                            setCondition(false)
                            setIsMobile(false)
                        }} className={`w-100`}>
                            Desktop View Only
                        </DropdownItem>
                        <DropdownItem onClick={() => {
                            setCondition(false)
                            setIsMobile(true)
                        }} className={`w-100`}>
                            Mobile View Only
                        </DropdownItem>
                        <DropdownItem onClick={() => {
                            setCondition(true)
                        }} className={`w-100`}>
                            Desktop and Mobile View
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledButtonDropdown>
            </div>
        )
    }

    const openImgModal = () => {
        setImgModal(!imgModal)
        triggerImage()
        setImageType("SINGLE")
    }

    const replaceColumns = (e, { cur, mainCol, repCol }) => {
        e.stopPropagation()
        console.log({ cur, mainCol, repCol })
        const newObj = { ...finalObj }
        const dupArray = currPage === "button" ? newObj?.button : newObj?.pages[newObj?.pages?.findIndex($ => $?.id === currPage)].values
        const mobile_dupArray = currPage === "button" ? newObj?.mobile_button : newObj?.mobile_pages[newObj?.mobile_pages?.findIndex($ => $?.id === currPage)].values
        const mainIndex = dupArray[cur]?.elements?.findIndex($ => $?.positionType === mainCol)
        const repIndex = dupArray[cur]?.elements?.findIndex($ => $?.positionType === repCol)
        const mobile_mainIndex = mobile_dupArray[cur]?.elements?.findIndex($ => $?.positionType === mainCol)
        const mobile_repIndex = mobile_dupArray[cur]?.elements?.findIndex($ => $?.positionType === repCol)
        let mainObj, repObj, mobile_mainObj, mobile_repObj
        if (currPage === "button") {
            mainObj = { ...finalObj.button[cur].elements[mainIndex], positionType: repCol }
            repObj = { ...finalObj.button[cur].elements[repIndex], positionType: mainCol }
            mobile_mainObj = { ...finalObj.mobile_button[cur].elements[mobile_mainIndex], positionType: repCol }
            mobile_repObj = { ...finalObj.mobile_button[cur].elements[mobile_repIndex], positionType: mainCol }
            dupArray[cur].elements[mainIndex] = repObj
            dupArray[cur].elements[repIndex] = mainObj
            mobile_dupArray[cur].elements[mobile_mainIndex] = mobile_repObj
            mobile_dupArray[cur].elements[mobile_repIndex] = mobile_mainObj
            newObj.button = dupArray
            newObj.mobile_button = mobile_dupArray
        } else {
            const pageIndex = newObj?.pages?.findIndex($ => $?.id === currPage)
            const mobile_pageIndex = newObj?.mobile_pages?.findIndex($ => $?.id === currPage)
            mainObj = { ...finalObj.pages[pageIndex].values[cur].elements[mainIndex], positionType: repCol }
            repObj = { ...finalObj.pages[pageIndex].values[cur].elements[repIndex], positionType: mainCol }
            mobile_mainObj = { ...finalObj.mobile_pages[mobile_pageIndex].values[cur].elements[mobile_mainIndex], positionType: repCol }
            mobile_repObj = { ...finalObj.mobile_pages[mobile_pageIndex].values[cur].elements[mobile_repIndex], positionType: mainCol }
            dupArray[cur].elements[mainIndex] = repObj
            dupArray[cur].elements[repIndex] = mainObj
            mobile_dupArray[cur].elements[mobile_mainIndex] = mobile_repObj
            mobile_dupArray[cur].elements[mobile_repIndex] = mobile_mainObj
            newObj.pages[pageIndex].values = dupArray
            newObj.mobile_pages[mobile_pageIndex].values = mobile_dupArray
        }
        updatePresent({ ...newObj })
    }

    const renderElems = () => {

        const colWise = currPage === "button" ? [...finalObj?.[`${mobileCondition}button`]] : [...finalObj?.[`${mobileCondition}pages`][finalObj?.[`${mobileCondition}pages`]?.findIndex($ => $.id === currPage)].values]
        const { selectedType } = currPosition
        let styles, general, spacing

        const timeSelectOptions = [
            { value: "seconds", label: "Seconds" },
            { value: "minutes", label: "Minutes" },
            { value: "hours", label: "Hours" }
        ]

        const updateRules = (e) => {
            if (e?.target?.type && e?.target?.type === "checkbox") {
                updatePresent({ ...finalObj, rules: { ...finalObj?.rules, [e?.target?.name]: e?.target?.checked } })
            } else {
                updatePresent({ ...finalObj, rules: { ...finalObj?.rules, [e?.target?.name]: e?.target?.value } })
            }
        }

        if (selectedType === "button") {
            const arr = [...colWise]
            const positionIndex = colWise[indexes.cur]?.elements?.findIndex($ => $?.positionType === indexes.curElem)
            const pagesSelect = [
                { value: 'nextPage', label: 'Next page' },
                { value: 'jumpTo', label: 'Jump to' },
                { value: 'redirect', label: 'Redirect' },
                { value: 'call', label: 'Call' },
                { value: 'close', label: 'Close' },
                { value: 'sendOTP', label: 'Send OTP' },
                { value: 'verify', label: 'Verify OTP' }
            ]
            const pageRedirect = finalObj?.[`pages`]?.filter(item => item.id !== "user_verification")?.map((ele) => {
                return { label: ele.pageName, value: ele.id }
            })
            const widthOptions = [
                { value: 'auto', label: 'Fluid' },
                { value: '100%', label: '100%' },
                { value: 'custom', label: 'Custom' }
            ]
            styles = (
                <>
                    <UncontrolledAccordion defaultOpen={['1', '2', '3']} stayOpen>
                        <AccordionItem>
                            <AccordionHeader className='acc-header' targetId='1' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                                <p className='m-0 fw-bolder text-black text-uppercase' style={{ padding: "0.5rem 0px", fontSize: "0.75rem" }}>Display</p>
                            </AccordionHeader>
                            <AccordionBody accordionId='1'>
                                <div className='p-0 mx-0 my-1'>
                                    <div className='p-0 mb-2 justify-content-start align-items-center pb-1 border-bottom'>
                                        {getMDToggle({ label: "Width Type:", value: "widthType" })}
                                        <Select value={widthOptions.filter($ => $.value === values?.widthType)} className='w-100' name="" onChange={e => {
                                            if (e.value === "auto") {
                                                setValues({ ...values, widthType: e.value, width: e.value, height: "auto", padding: "10px" })
                                            } else if (e.value === "100%") {
                                                setValues({ ...values, widthType: e.value, width: e.value, height: "auto", padding: "10px" })
                                            } else if (e.value === "custom") {
                                                setValues({ ...values, widthType: e.value, padding: "10px" })
                                            }
                                        }} id="" options={widthOptions} />
                                    </div>
                                    {values.widthType === "custom" && <div className='mb-2 pb-1 border-bottom'>
                                        {getMDToggle({
                                            label: <>Width: <input value={parseFloat(values?.width)} type='number' className='form-control' style={{ width: "8ch" }} onChange={e => {
                                                setValues({ ...values, width: `${parseFloat(e.target.value)}px` })
                                            }} />px</>,
                                            value: "width"
                                        })}
                                        <div className="d-flex p-0 justify-content-center align-items-center gap-2">
                                            <input value={parseFloat(values?.width)} type='range' className='w-100' onChange={e => {
                                                setValues({ ...values, width: `${e.target.value}px` })
                                            }} />
                                        </div>
                                    </div>}
                                    {values.widthType !== "auto" && <div className='mb-2 pb-1 border-bottom'>
                                        {getMDToggle({
                                            label: <>Height: <input value={parseFloat(values?.height)} type='number' className='form-control' style={{ width: "8ch" }} onChange={e => {
                                                setValues({ ...values, height: `${parseFloat(e.target.value)}px`, maxHeight: `${parseFloat(e.target.value)}px` })
                                            }} />px</>,
                                            value: ["height", "maxHeight"]
                                        })}
                                        <div className="d-flex p-0 justify-content-between align-items-center gap-2">
                                            <input value={parseFloat(values?.height)} type='range' className='w-100' onChange={e => {
                                                setValues({ ...values, height: `${e.target.value}px`, maxHeight: `${e.target.value}px` })
                                            }} />
                                        </div>
                                    </div>}
                                    {values?.widthType !== "100%" && (<div className='mb-2  pb-1 border-bottom'>
                                        {getMDToggle({ label: `Alignment: `, value: "alignType" })}
                                        <div className="blocks d-flex gap-1 mb-1">
                                            <div onClick={() => setValues({ ...values, alignType: "start" })} className={`cursor-pointer rounded w-100 text-center border-${values?.alignType === "left" ? "black" : "dark"}`} style={{ padding: "0.5rem", aspectRatio: "1" }}>
                                                <div>
                                                    <svg
                                                        width="1.25rem"
                                                        height="1.25rem"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill={values?.alignType === "start" ? "black" : "#464646"}
                                                    >
                                                        <path d="M21,10H16V7a1,1,0,0,0-1-1H4V3A1,1,0,0,0,2,3V21a1,1,0,0,0,2,0V18H21a1,1,0,0,0,1-1V11A1,1,0,0,0,21,10ZM4,8H14v2H4Zm16,8H4V12H20Z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <span className={`text-${values?.alignType === "start" ? "black" : "dark"}`}>Left</span>
                                                </div>
                                            </div>
                                            <div onClick={() => setValues({ ...values, alignType: "center" })} className={`cursor-pointer rounded w-100 text-center border-${values?.alignType === "center" ? "black" : "dark"}`} style={{ padding: "0.5rem", aspectRatio: "1" }}>
                                                <div>
                                                    <svg
                                                        width="1.25rem"
                                                        height="1.25rem"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill={values?.alignType === "center" ? "black" : "#464646"}
                                                    >
                                                        <path d="M21,10H19V7a1,1,0,0,0-1-1H13V3a1,1,0,0,0-2,0V6H6A1,1,0,0,0,5,7v3H3a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1h8v3a1,1,0,0,0,2,0V18h8a1,1,0,0,0,1-1V11A1,1,0,0,0,21,10ZM7,8H17v2H7Zm13,8H4V12H20Z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <span className={`text-${values?.alignType === "center" ? "black" : "dark"}`}>Center</span>
                                                </div>
                                            </div>
                                            <div onClick={() => setValues({ ...values, alignType: "end" })} className={`cursor-pointer rounded w-100 text-center border-${values?.alignType === "end" ? "black" : "dark"}`} style={{ padding: "0.5rem", aspectRatio: "1" }}>
                                                <div>
                                                    <svg
                                                        width="1.25rem"
                                                        height="1.25rem"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill={values?.alignType === "end" ? "black" : "#464646"}
                                                    >
                                                        <path d="M21,2a1,1,0,0,0-1,1V6H9A1,1,0,0,0,8,7v3H3a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1H20v3a1,1,0,0,0,2,0V3A1,1,0,0,0,21,2ZM20,16H4V12H20Zm0-6H10V8H20Z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <span className={`text-${values?.alignType === "end" ? "black" : "dark"}`}>Right</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>)}
                                </div>
                            </AccordionBody>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionHeader className='acc-header' targetId='2' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                                <p className='m-0 fw-bolder text-black text-uppercase' style={{ padding: "0.5rem 0px", fontSize: "0.75rem" }}>Background Fill</p>
                            </AccordionHeader>
                            <AccordionBody accordionId='2'>
                                <div className='p-0 mx-0 my-1'>
                                    <div className='p-0 mb-1 justify-content-start align-items-center'>
                                        {getMDToggle({ label: `Background: `, value: ["bgType", "backgroundColor", "backgroundImage"] })}
                                        <div className="border p-1 rounded mb-2" style={{ backgroundColor: values?.backgroundColor, backgroundImage: values?.backgroundImage }} onClick={() => setBgModal0(!bgModal0)}></div>
                                        {/* <UncontrolledButtonDropdown>
                                            <DropdownToggle color='dark' style={{ padding: "0.5rem" }} className='hide-after-dropdown rounded'>
                                                Apply background to
                                            </DropdownToggle>
                                            <DropdownMenu end>
                                                <DropdownItem className={`w-100`}>
                                                    This Element Only
                                                </DropdownItem>
                                                <DropdownItem className={`w-100`}>
                                                    All Elements
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledButtonDropdown> */}
                                    </div>
                                </div>
                            </AccordionBody>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionHeader className='acc-header' targetId='3' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                                <p className='m-0 fw-bolder text-black text-uppercase' style={{ padding: "0.5rem 0px", fontSize: "0.75rem" }}>Border and Shadow</p>
                            </AccordionHeader>
                            <AccordionBody accordionId='3'>
                                <BorderChange pageCondition={pageCondition} getMDToggle={getMDToggle} setStyles={setValues} styles={values} />
                            </AccordionBody>
                        </AccordionItem>
                    </UncontrolledAccordion>
                </>
            )
            general = (
                <>
                    <div className='px-1 mx-0 my-1'>
                        <div className='p-0 mb-1 me-1 justify-content-start align-items-center'>
                            <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>On click:</span>
                            <Select value={pagesSelect?.filter(item => item?.value === colWise[indexes?.cur]?.elements[positionIndex]?.element[indexes?.subElem]?.redirectType)} onChange={e => {
                                arr[indexes?.cur].elements[positionIndex].element[indexes?.subElem].redirectType = e.value
                                arr[indexes?.cur].elements[positionIndex].element[indexes?.subElem].redirectTo = ""
                                setcolWise([...colWise])
                            }} options={pagesSelect} />
                        </div>
                        {colWise[indexes?.cur]?.elements[positionIndex]?.element[indexes?.subElem]?.redirectType === "jumpTo" && <div className='p-0 mb-1 me-1 justify-content-start align-items-center'>
                            <span className='fw-bolder text-black mb-2' style={{ fontSize: "0.75rem" }}>Chosen Page:</span>
                            <Select value={pageRedirect?.filter(item => item?.value === colWise[indexes?.cur]?.elements[positionIndex]?.element[indexes?.subElem]?.redirectTo)} onChange={e => {
                                arr[indexes?.cur].elements[positionIndex].element[indexes?.subElem].redirectTo = e.value
                                setcolWise([...arr])
                            }} options={pageRedirect} />
                        </div>}
                        {colWise[indexes?.cur]?.elements[positionIndex]?.element[indexes?.subElem]?.redirectType === "redirect" && <div className='p-0 mb-1 me-1 justify-content-start align-items-center'>
                            <span className='fw-bolder text-black mb-2' style={{ fontSize: "0.75rem" }}>URL:</span>
                            <input type="text" className='form-control' placeholder='https://example.url.com' value={colWise[indexes?.cur]?.elements[positionIndex]?.element[indexes?.subElem]?.redirectTo ? colWise[indexes?.cur]?.elements[positionIndex]?.element[indexes?.subElem]?.redirectTo : "https://"} onChange={e => {
                                const prefix = "https://"
                                if (!e.target.value.startsWith(prefix)) {
                                    e.target.value = prefix // If not, add the prefix
                                    arr[indexes?.cur].elements[positionIndex].element[indexes?.subElem].redirectTo = prefix
                                    setcolWise([...arr])
                                } else {
                                    arr[indexes?.cur].elements[positionIndex].element[indexes?.subElem].redirectTo = e.target.value
                                    setcolWise([...arr])
                                }

                            }} />
                        </div>}
                        {colWise[indexes?.cur]?.elements[positionIndex]?.element[indexes?.subElem]?.redirectType === "call" && <div className='p-0 mb-1 me-1 justify-content-start align-items-center'>
                            <span className='fw-bolder text-black mb-2' style={{ fontSize: "0.75rem" }}>Phone Number:</span>
                            <div className="d-flex align-items-center gap-1">
                                <select name="" id="" className="form-select w-50">
                                    {
                                        countries?.map((ele, key) => {
                                            return (
                                                <option key={key} value={ele?.isoNumeric}>{ele?.flag}</option>
                                            )
                                        })
                                    }
                                </select>
                                <input type="text" className='form-control w-100' placeholder='Phone Number' value={colWise[indexes?.cur]?.elements[positionIndex]?.element[indexes?.subElem]?.redirectTo} onChange={e => {
                                    arr[indexes?.cur].elements[positionIndex].element[indexes?.subElem].redirectTo = e.target.value
                                    setcolWise([...arr])
                                }} />
                            </div>
                        </div>}
                        {colWise[indexes?.cur]?.elements[positionIndex]?.element[indexes?.subElem]?.redirectType === "sendOTP" && <div className='p-0 mb-1 me-1 justify-content-start align-items-center'>
                            <span className='fw-bolder text-black mb-2' style={{ fontSize: "0.75rem" }}>Send OTP:</span>
                            <div className="">
                                {colWise?.map((cur, key) => {
                                    return cur?.elements?.map((curElem, i) => {
                                        return curElem?.element?.map((subElem, j) => {
                                            if (subElem?.type === "input") {
                                                return (
                                                    <div className="form-check">
                                                        <input checked={arr[indexes?.cur]?.elements[positionIndex]?.element[indexes?.subElem]?.sendOTPto?.includes(subElem?.inputType)} id={`renderElems-${key}-${i}-${j}`} onChange={() => {
                                                            arr[indexes?.cur].elements[positionIndex].element[indexes?.subElem].sendOTPto = []
                                                            arr[indexes?.cur]?.elements[positionIndex]?.element[indexes?.subElem]?.sendOTPto?.push(subElem?.inputType)
                                                        }} type="checkbox" className="form-check-input" /><label htmlFor={`renderElems-${key}-${i}-${j}`} className="form-check-label">{inputTypeList?.filter($ => $?.value === subElem?.inputType)[0]?.label || ""}</label>
                                                    </div>
                                                )
                                            }
                                        })
                                    })
                                })}
                            </div>
                        </div>}
                    </div>
                </>
            )
            spacing = (
                <>
                    <UncontrolledAccordion defaultOpen={['1', '2', '3']} stayOpen>
                        <AccordionItem>
                            <AccordionHeader className='acc-header' targetId='1' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                                <p className='m-0 fw-bolder text-black text-uppercase' style={{ padding: "0.5rem 0px", fontSize: "0.75rem" }}>Spacing</p>
                            </AccordionHeader>
                            <AccordionBody accordionId='1'>
                                <div className='p-0 mx-0 my-1'>
                                    <InputChange
                                        getMDToggle={getMDToggle}
                                        allValues={values}
                                        setAllValues={setValues}
                                        type="margin"
                                    />
                                </div>
                            </AccordionBody>
                        </AccordionItem>
                    </UncontrolledAccordion>
                </>
            )
        } else if (selectedType === "text") {
            const textShadowOpts = [
                { value: '0px 0px 0px rgba(0,0,0,0)', label: 'None' },
                { value: '0px 0px 5px rgba(0,0,0,0.5)', label: 'Small' },
                { value: '0px 0px 15px rgba(0,0,0,0.75)', label: 'Medium' },
                { value: '0px 0px 25px rgba(0,0,0,1.0)', label: 'Large' }
            ]
            styles = (
                <>
                    <UncontrolledAccordion defaultOpen={['1', '2', '3']} stayOpen>
                        <AccordionItem>
                            <AccordionHeader className='acc-header' targetId='1' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                                <p className='m-0 fw-bolder text-black text-uppercase' style={{ padding: "0.5rem 0px", fontSize: "0.75rem" }}>Display</p>
                            </AccordionHeader>
                            <AccordionBody accordionId='1'>
                                <div className='p-0 mx-0 my-1'>
                                    <div className='p-0 mb-2 justify-content-start align-items-center'>
                                        {getMDToggle({ label: "Text Shadow", value: `textShadow` })}
                                        <Select className='mb-1' value={textShadowOpts?.filter(item => item.value === values?.textShadow)} onChange={e => {
                                            setValues({ ...values, textShadow: e.value })
                                        }} options={textShadowOpts} />
                                    </div>
                                    <div className='mb-2'>
                                        {getMDToggle({
                                            label: <>Text Rotation: <input value={parseFloat(values?.rotate)} type='number' className='form-control' style={{ width: "8ch" }} onChange={e => {
                                                setValues({ ...values, rotate: `${parseFloat(e.target.value)}°` })
                                            }} />°</>,
                                            value: `rotate`
                                        })}
                                        <div className="p-0 justify-content-start align-items-center gap-2">
                                            <input type='range' value={parseFloat(values?.rotate)} className='w-100' onChange={e => {
                                                if (!isNaN(e.target.value)) {
                                                    setValues({ ...values, rotate: `${e.target.value}deg` })
                                                }
                                            }} name="height" min="-180" max="180" />
                                        </div>
                                    </div>
                                </div>
                            </AccordionBody>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionHeader className='acc-header' targetId='2' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                                <p className='m-0 fw-bolder text-black text-uppercase' style={{ padding: "0.5rem 0px", fontSize: "0.75rem" }}>Background Fill</p>
                            </AccordionHeader>
                            <AccordionBody accordionId='2'>
                                <div className='p-0 mx-0 my-1'>
                                    <div className='p-0 mb-1 justify-content-start align-items-center'>
                                        {getMDToggle({ label: `Background`, value: ["bgType", "backgroundColor", "backgroundImage"] })}
                                        <div style={{ backgroundImage: `url(${pixels})` }}>
                                            <div className="p-1 border rounded" style={{ backgroundImage: values?.backgroundImage, backgroundColor: values?.backgroundColor }} onClick={() => setBgModal0(!bgModal0)}></div>
                                        </div>
                                    </div>
                                </div>
                            </AccordionBody>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionHeader className='acc-header' targetId='3' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                                <p className='m-0 fw-bolder text-black text-uppercase' style={{ padding: "0.5rem 0px", fontSize: "0.75rem" }}>Border and Shadow</p>
                            </AccordionHeader>
                            <AccordionBody accordionId='3'>
                                <BorderChange pageCondition={pageCondition} getMDToggle={getMDToggle} styles={values} setStyles={setValues} />
                            </AccordionBody>
                        </AccordionItem>
                    </UncontrolledAccordion>
                </>
            )
            spacing = (
                <>
                    <UncontrolledAccordion defaultOpen={['1', '2', '3']} stayOpen>
                        <AccordionItem>
                            <AccordionHeader className='acc-header' targetId='1' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                                <p className='m-0 fw-bolder text-black text-uppercase' style={{ padding: "0.5rem 0px", fontSize: "0.75rem" }}>Spacing</p>
                            </AccordionHeader>
                            <AccordionBody accordionId='1'>
                                <div className='p-0 mx-0 my-1'>
                                    <InputChange
                                        getMDToggle={getMDToggle}
                                        allValues={values}
                                        setAllValues={setValues}
                                        type="padding"
                                    />
                                    <InputChange
                                        getMDToggle={getMDToggle}
                                        allValues={values}
                                        setAllValues={setValues}
                                        type="margin"
                                    />
                                </div>
                            </AccordionBody>
                        </AccordionItem>
                    </UncontrolledAccordion>
                </>
            )
        } else if (selectedType === "image") {
            const arr = [...colWise]
            const positionIndex = colWise[indexes?.cur]?.elements?.findIndex($ => $?.positionType === indexes?.curElem)
            const imgWidth = colWise[indexes?.cur]?.elements[positionIndex]?.element[indexes?.subElem]?.style?.width
            const imgHeight = colWise[indexes?.cur]?.elements[positionIndex]?.element[indexes?.subElem]?.style?.height
            styles = (
                <>
                    <UncontrolledAccordion defaultOpen={['1']} stayOpen>
                        <AccordionItem>
                            <AccordionHeader className='acc-header' targetId='1' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                                <p className='m-0 fw-bolder text-black text-uppercase' style={{ padding: "0.5rem 0px", fontSize: "0.75rem" }}>Border and Shadow</p>
                            </AccordionHeader>
                            <AccordionBody accordionId='1'>
                                <BorderChange pageCondition={pageCondition} getMDToggle={getMDToggle} styles={values} setStyles={setValues} />
                            </AccordionBody>
                        </AccordionItem>
                    </UncontrolledAccordion>
                </>
            )
            general = (
                <>
                    <UncontrolledAccordion defaultOpen={['1']} stayOpen>
                        <AccordionItem>
                            <AccordionHeader className='acc-header' targetId='1' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                                <p className='m-0 fw-bolder text-black text-uppercase' style={{ padding: "0.5rem 0px", fontSize: "0.75rem" }}>Image setting</p>
                            </AccordionHeader>
                            <AccordionBody accordionId='1'>
                                <div className='p-0 mx-0 my-1'>
                                    <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Select/Upload Image:</span>
                                    {arr[indexes.cur]?.elements[positionIndex]?.element[indexes.subElem]?.showRecommended ? <div style={{ fontSize: "10px" }}>Recommended image size: {arr[indexes.cur]?.elements[positionIndex]?.element[indexes.subElem]?.recommendedWidth}</div> : <></>}
                                    <div
                                        className="d-flex justify-content-center align-items-center mb-1 position-relative"
                                        style={{ width: '100%', aspectRatio: '16/9' }}
                                    >
                                        <div
                                            className="overlay"
                                            style={{
                                                display: 'none',
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                background: 'rgba(0, 0, 0, 0.5)',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                color: '#fff',
                                                fontSize: '18px',
                                                cursor: 'pointer',
                                                zIndex: 1
                                            }}
                                        >
                                            {arr[indexes.cur]?.elements[positionIndex]?.element[indexes.subElem]?.isBrandLogo ? finalObj?.defaultThemeColors?.brandLogo === "http://www.palmares.lemondeduchiffre.fr/images/joomlart/demo/default.jpg" ? <PlusCircle onClick={openImgModal} size={19} /> : <div className="d-flex align-items-center gap-1">
                                                <Trash onClick={() => {
                                                    arr[indexes?.cur].elements[positionIndex].element[indexes?.subElem].isBrandLogo = false
                                                    arr[indexes?.cur].elements[positionIndex].element[indexes?.subElem].src = "http://www.palmares.lemondeduchiffre.fr/images/joomlart/demo/default.jpg"
                                                    setcolWise([...arr])
                                                }} size={19} /><Edit onClick={openImgModal} size={19} />
                                            </div> : colWise[indexes.cur]?.elements[positionIndex]?.element[indexes.subElem]?.src === "http://www.palmares.lemondeduchiffre.fr/images/joomlart/demo/default.jpg" ? <PlusCircle onClick={openImgModal} size={19} /> : <div className="d-flex align-items-center gap-1">
                                                <Trash onClick={() => {
                                                    arr[indexes?.cur].elements[positionIndex].element[indexes?.subElem].isBrandLogo = false
                                                    arr[indexes?.cur].elements[positionIndex].element[indexes?.subElem].src = "http://www.palmares.lemondeduchiffre.fr/images/joomlart/demo/default.jpg"
                                                    setcolWise([...arr])
                                                }} size={19} /><Edit onClick={openImgModal} size={19} />
                                            </div>}
                                        </div>
                                        <img style={{ maxWidth: "100%", maxHeight: "100%" }} src={colWise[indexes.cur]?.elements[positionIndex]?.element[indexes.subElem]?.isBrandLogo ? finalObj?.defaultThemeColors?.brandLogo : colWise[indexes.cur]?.elements[positionIndex]?.element[indexes.subElem]?.src} alt="" />
                                    </div>
                                    <div className='mb-1'>
                                        {getMDToggle({
                                            label: <>Width: <input value={parseFloat(imgWidth)} type='number' className='form-control' style={{ width: "8ch" }} onChange={e => {
                                                arr[indexes?.cur].elements[positionIndex].element[indexes?.subElem].isBrandWidth = false
                                                setcolWise([...arr])
                                                setValues({ ...values, width: `${parseFloat(e.target.value)}px` })
                                            }} />px</>,
                                            value: `width`
                                        })}
                                        <div className="p-0 justify-content-start align-items-center gap-2">
                                            <input value={parseFloat(imgWidth)} onChange={(e) => {
                                                arr[indexes?.cur].elements[positionIndex].element[indexes?.subElem].isBrandWidth = false
                                                setcolWise([...arr])
                                                setValues({ ...values, width: `${e.target.value}px` })
                                            }} type='range' className='w-100' name="height" min="20" max="1500" />
                                        </div>
                                    </div>
                                    <div className='mb-1'>
                                        {getMDToggle({
                                            label: <>Height: <input value={parseFloat(imgHeight)} type='number' className='form-control' style={{ width: "8ch" }} onChange={e => {
                                                arr[indexes?.cur].elements[positionIndex].element[indexes?.subElem].isBrandHeight = false
                                                setcolWise([...arr])
                                                setValues({ ...values, height: `${parseFloat(e.target.value)}px` })
                                            }} />px</>,
                                            value: `height`
                                        })}
                                        <div className="p-0 justify-content-start align-items-center gap-2">
                                            <input value={parseFloat(imgHeight)} onChange={(e) => {
                                                arr[indexes?.cur].elements[positionIndex].element[indexes?.subElem].isBrandHeight = false
                                                setcolWise([...arr])
                                                setValues({ ...values, height: `${e.target.value}px` })
                                            }} type='range' className='w-100' name="height" min="20" max="1500" />
                                        </div>
                                    </div>
                                    <div className='p-0 mb-1 align-items-center'>
                                        {getMDToggle({ label: `Alignment`, value: `margin` })}
                                        <Select value={alignOptions?.filter(item => item?.value === colWise[indexes?.cur]?.elements[positionIndex]?.element[indexes?.subElem]?.style?.margin)} onChange={e => {
                                            arr[indexes?.cur].elements[positionIndex].element[indexes?.subElem].style.margin = e.value
                                            arr[indexes?.cur].elements[positionIndex].element[indexes?.subElem].isBrandAlignment = false
                                            setcolWise([...arr])
                                        }} options={alignOptions} />
                                    </div>
                                </div>
                            </AccordionBody>
                        </AccordionItem>
                    </UncontrolledAccordion>
                </>
            )
            spacing = (
                <>
                    <UncontrolledAccordion defaultOpen={['1', '2', '3']} stayOpen>
                        <AccordionItem>
                            <AccordionHeader className='acc-header' targetId='1' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                                <p className='m-0 fw-bolder text-black text-uppercase' style={{ padding: "0.5rem 0px", fontSize: "0.75rem" }}>Spacing</p>
                            </AccordionHeader>
                            <AccordionBody accordionId='1'>
                                <div className='p-0 mx-0 my-1'>
                                    <InputChange
                                        getMDToggle={getMDToggle}
                                        allValues={values}
                                        setAllValues={setValues}
                                        type="padding"
                                    />
                                </div>
                            </AccordionBody>
                        </AccordionItem>
                    </UncontrolledAccordion>
                </>
            )
        } else if (selectedType === "block") {
            const colWise = currPage === "button" ? finalObj?.[`${mobileCondition}button`] : finalObj?.[`${mobileCondition}pages`][finalObj?.[`${mobileCondition}pages`]?.findIndex($ => $?.id === currPage)]?.values
            styles = (
                <>
                    <UncontrolledAccordion defaultOpen={['1', '2', '3']} stayOpen>
                        <AccordionItem>
                            <AccordionHeader className='acc-header' targetId='1' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                                <p className='m-0 fw-bolder text-black text-uppercase' style={{ padding: "0.5rem 0px", fontSize: "0.75rem" }}>Background Fill</p>
                            </AccordionHeader>
                            <AccordionBody accordionId='1'>
                                <div className='p-0 mx-0 my-1'>
                                    <div className='p-0 mb-1 justify-content-start align-items-center'>
                                        {getMDToggle({ label: `Background`, value: ["bgType", "backgroundColor", "backgroundImage"] })}
                                        <div className="p-2 border rounded" onClick={() => setBgModal0(!bgModal0)} style={{ backgroundColor: values?.backgroundColor, backgroundImage: values?.backgroundImage }}></div>
                                    </div>
                                </div>
                            </AccordionBody>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionHeader className='acc-header' targetId='2' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                                <p className='m-0 fw-bolder text-black text-uppercase' style={{ padding: "0.5rem 0px", fontSize: "0.75rem" }}>Border and Shadow</p>
                            </AccordionHeader>
                            <AccordionBody accordionId='2'>
                                <BorderChange pageCondition={pageCondition} getMDToggle={getMDToggle} styles={values} setStyles={setValues} />
                            </AccordionBody>
                        </AccordionItem>
                        {/* <AccordionItem>
                            <AccordionHeader className='acc-header' targetId='3' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                                <p className='m-0 fw-bolder text-black text-uppercase' style={{ padding: "0.5rem 0px", fontSize: "0.75rem" }}>Size</p>
                            </AccordionHeader>
                            <AccordionBody accordionId='3'>
                                <div className='p-0 mx-0 my-1'>
                                    <div className="p-0 justify-content-start align-items-center gap-2">
                                        <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Min-height:</span>
                                        <input onChange type="number" name='minHeight' min="0" max="300" className='w-100 form-control' />
                                    </div>
                                </div>
                            </AccordionBody>
                        </AccordionItem> */}

                    </UncontrolledAccordion>
                </>
            )
            general = (
                <div className={`h-100 d-flex flex-column justify-content-between`}>
                    <div>
                        {/* Column Count Starts */}
                        <h6 style={{ marginLeft: "7px", marginTop: "10px" }}>Column Count</h6>
                        <div className='d-flex justify-content-around align-items-center'>
                            {colWise[indexes?.cur].elements.length === 1 ? <button className="btn p-0 d-flex justify-content-center align-items-center" onClick={() => changeColumn("1", { left: "100%", right: "0%" }, false)} style={{ aspectRatio: "1", width: "50px" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 54" className='w-75'>
                                    <rect
                                        x={2}
                                        y={2}
                                        width={60}
                                        rx={5}
                                        height={50}
                                        fill="transparent"
                                        strokeWidth={3}
                                        stroke="#727272"
                                    />
                                </svg>
                            </button> : (
                                <UncontrolledDropdown className='more-options-dropdown'>
                                    <DropdownToggle className="btn p-0 d-flex justify-content-center align-items-center" style={{ aspectRatio: "1", width: "50px" }} color='transparent'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 54" className='w-75'>
                                            <rect
                                                x={2}
                                                y={2}
                                                width={60}
                                                rx={5}
                                                height={50}
                                                fill="transparent"
                                                strokeWidth={3}
                                                stroke="#727272"
                                            />
                                        </svg>
                                    </DropdownToggle>
                                    <DropdownMenu style={{ width: "280px" }} end>
                                        <div className="p-1 d-flex gap-1">
                                            {colWise[indexes?.cur].elements.map((element, index) => {
                                                return (
                                                    <div key={index} className="form-check m-0 p-0 flex-grow-1 d-flex align-items-center" style={{ gap: "0.5rem" }}>
                                                        <input checked={deleteCols.includes(element.positionType)} name={`deleteCol`} id={`deleteCol-${index}`} type={colWise[indexes?.cur].elements.length === 2 ? "radio" : "checkbox"} onChange={(e) => {
                                                            if (colWise[indexes?.cur].elements.length === 2) {
                                                                setDeleteCols([element?.positionType])
                                                            } else {
                                                                e.target.checked ? setDeleteCols((deleteCols.length < colWise[indexes?.cur].elements.length - 1) ? [...deleteCols, element?.positionType] : deleteCols) : setDeleteCols(deleteCols.filter($ => $ !== element.positionType))
                                                            }
                                                        }} className="form-check-input m-0 p-0" />
                                                        <label htmlFor={`deleteCol-${index}`} className="form-check-label m-0 p-0 text-capitalize">{element?.positionType}</label>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <DropdownItem onClick={() => {
                                                if (deleteCols.length < colWise[indexes.cur].elements.length - 1) {
                                                    toast.error(`Select at least ${colWise[indexes.cur].elements.length - 1} columns`)
                                                } else {
                                                    changeColumn("1", { left: "100%" }, true)
                                                }
                                            }} className='flex-grow-1 text-center'>
                                                Remove Columns
                                            </DropdownItem>
                                            <DropdownItem className='flex-grow-1 text-center'>
                                                Cancel
                                            </DropdownItem>
                                        </div>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            )}
                            {colWise[indexes?.cur].elements.length <= 2 ? <button className="btn p-0 d-flex justify-content-center align-items-center" onClick={() => changeColumn("2", { left: "100%", right: "100%" }, false)} style={{ aspectRatio: "1", width: "50px" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 54" className='w-75'>
                                    <g strokeWidth={3} stroke="#727272">
                                        <rect x={2} y={2} width={60} rx={5} height={50} fill="transparent" />
                                        <path d="M32 52V2" />
                                    </g>
                                </svg>
                            </button> : (
                                <UncontrolledDropdown className='more-options-dropdown'>
                                    <DropdownToggle className="btn p-0 d-flex justify-content-center align-items-center" style={{ aspectRatio: "1", width: "50px" }} color='transparent'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 54" className='w-75'>
                                            <g strokeWidth={3} stroke="#727272">
                                                <rect x={2} y={2} width={60} rx={5} height={50} fill="transparent" />
                                                <path d="M32 52V2" />
                                            </g>
                                        </svg>
                                    </DropdownToggle>
                                    <DropdownMenu style={{ width: "280px" }} end>
                                        <div className="p-1 d-flex gap-1">
                                            {colWise[indexes?.cur].elements.map((element, index) => {
                                                return (
                                                    <div key={index} className="form-check m-0 p-0 flex-grow-1 d-flex align-items-center" style={{ gap: "0.5rem" }}>
                                                        <input checked={deleteCols.includes(element.positionType)} name={`deleteCol`} id={`deleteCol-${index}`} type={"radio"} onChange={() => {
                                                            setDeleteCols([element?.positionType])
                                                        }} className="form-check-input m-0 p-0" />
                                                        <label htmlFor={`deleteCol-${index}`} className="form-check-label m-0 p-0 text-capitalize">{element?.positionType}</label>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <DropdownItem onClick={() => {
                                                if (deleteCols.length < colWise[indexes.cur].elements.length - 2) {
                                                    toast.error(`Select at least ${colWise[indexes.cur].elements.length - 2} columns`)
                                                } else {
                                                    changeColumn("2", { left: "100%", right: "100%" }, true)
                                                }
                                            }} className='flex-grow-1 text-center'>
                                                Remove Columns
                                            </DropdownItem>
                                            <DropdownItem className='flex-grow-1 text-center'>
                                                Cancel
                                            </DropdownItem>
                                        </div>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            )}
                            <button className="btn p-0 d-flex justify-content-center align-items-center" onClick={() => changeColumn("3", { left: "100%", center: "100%", right: "100%" }, false)} style={{ aspectRatio: "1", width: "50px" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 54" className='w-75'>
                                    <g strokeWidth={3} stroke="#727272">
                                        <rect x={2} y={2} width={60} rx={5} height={50} fill="transparent" />
                                        <path d="M21 52V2M42 52V2" />
                                    </g>
                                </svg>
                            </button>
                        </div>
                        {/* Column Count Ends*/}
                        {/* Column Split Starts*/}
                        {/* Column Split For 2 Columns Starts*/}
                        {colWise[indexes.cur]?.elements?.length === 2 && (
                            <div>
                                <h6 style={{ marginLeft: "7px", marginTop: "20px" }}>Column Split</h6>
                                <div className='d-flex justify-content-around align-items-center'>
                                    <button onClick={() => changeColumn("2", { left: "25%", right: "75%" }, false)} className="btn p-0 d-flex justify-content-center align-items-center" style={{ aspectRatio: "1", width: "50px" }}>
                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 54" className='w-75'>
                                            <g strokeWidth="3" stroke="#727272">
                                                <rect x="2" y="2" width="60" rx="5" height="50" fill="transparent" ></rect>
                                                <path d="M16 52 L 16 2"></path>
                                            </g>
                                        </svg>
                                    </button>
                                    <button onClick={() => changeColumn("2", { left: `${100 / 3}%`, right: `${200 / 3}%` }, false)} className="btn p-0 d-flex justify-content-center align-items-center" style={{ aspectRatio: "1", width: "50px" }}>
                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 54" className='w-75'>
                                            <g strokeWidth="3" stroke="#727272">
                                                <rect x="2" y="2" width="60" rx="5" height="50" fill="transparent" ></rect>
                                                <path d="M21 52 L 21 2"></path>
                                            </g>
                                        </svg>
                                    </button>
                                    <button onClick={() => changeColumn("2", { left: `${(250 * 100) / 600}%`, right: `${(350 * 100) / 600}%` })} className="btn p-0 d-flex justify-content-center align-items-center" style={{ aspectRatio: "1", width: "50px" }}>
                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 54" className='w-75'>
                                            <g strokeWidth="3" stroke="#727272">
                                                <rect x="2" y="2" width="60" rx="5" height="50" fill="transparent" ></rect>
                                                <path d="M26 52 L 26 2" ></path>
                                            </g>
                                        </svg>
                                    </button>
                                </div>
                                <div className='d-flex justify-content-around align-items-center'>
                                    <button onClick={() => changeColumn("2", { left: "50%", right: "50%" }, false)} className="btn p-0 d-flex justify-content-center align-items-center" style={{ aspectRatio: "1", width: "50px" }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 54" className='w-75'>
                                            <g strokeWidth={3} stroke="#727272">
                                                <rect x={2} y={2} width={60} rx={5} height={50} fill="transparent" />
                                                <path d="M32 52V2" />
                                            </g>
                                        </svg>
                                    </button>
                                    <button onClick={() => changeColumn("2", { left: `${(350 * 100) / 600}%`, right: `${(250 * 100) / 600}%` }, false)} className="btn p-0 d-flex justify-content-center align-items-center" style={{ aspectRatio: "1", width: "50px" }}>
                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 54" className='w-75'>
                                            <g strokeWidth="3" stroke="#727272">
                                                <rect x="2" y="2" width="60" rx="5" height="50" fill="transparent" ></rect>
                                                <path d="M37 52 L 37 2"></path>
                                            </g>
                                        </svg>
                                    </button>
                                    <button onClick={() => changeColumn("2", { left: `${200 / 3}%`, right: `${100 / 3}%` }, false)} className="btn p-0 d-flex justify-content-center align-items-center" style={{ aspectRatio: "1", width: "50px" }}>
                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 54" className='w-75'>
                                            <g strokeWidth="3" stroke="#727272">
                                                <rect x="2" y="2" width="60" rx="5" height="50" fill="transparent" ></rect>
                                                <path d="M42 52 L 42 2" ></path>
                                            </g>
                                        </svg>
                                    </button>
                                </div>
                                <div className='d-flex justify-content-start align-items-center' style={{ marginLeft: "14.5px" }}>
                                    <button onClick={() => changeColumn("2", { left: "75%", right: "25%" }, false)} className="btn p-0 d-flex justify-content-center align-items-center" style={{ aspectRatio: "1", width: "50px" }}>
                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 54" className='w-75'>
                                            <g strokeWidth="3" stroke="#727272">
                                                <rect x="2" y="2" width="60" rx="5" height="50" fill="transparent" ></rect>
                                                <path d="M48 52 L 48 2"></path>
                                            </g>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}
                        {/* Column Split for 2 Columns Ends */}
                        {/* Column Split for 3 Columns Starts */}
                        {colWise[indexes?.cur]?.elements?.length === 3 && (
                            <div>
                                <h6 style={{ marginLeft: "7px", marginTop: "20px" }}>Column Split</h6>
                                <div className='d-flex justify-content-around align-items-center'>
                                    <button onClick={() => changeColumn("3", { left: `100%`, center: `100%`, right: `100%` }, false)} className="btn p-0 d-flex justify-content-center align-items-center" style={{ aspectRatio: "1", width: "50px" }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 54" className='w-75'>
                                            <g strokeWidth={3} stroke="#727272">
                                                <rect x={2} y={2} width={60} rx={5} height={50} fill="transparent" />
                                                <path d="M21 52V2M42 52V2" />
                                            </g>
                                        </svg>
                                    </button>
                                    <button onClick={() => changeColumn("3", { left: `${100 / 2}%`, center: `${100 / 4}%`, right: `${100 / 4}%` }, false)} className="btn p-0 d-flex justify-content-center align-items-center" style={{ aspectRatio: "1", width: "50px" }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 54" className='w-75'>
                                            <g strokeWidth={3} stroke="#727272">
                                                <rect x="2" y="2" width="60" rx="5" height="50" fill="transparent"></rect>
                                                <path d="M32 52 L 32 2"></path>
                                                <path d="M48 52 L 48 2"></path>
                                            </g>
                                        </svg>
                                    </button>
                                    <button onClick={() => changeColumn("3", { left: `${100 / 4}%`, center: `${100 / 2}%`, right: `${100 / 4}%` }, false)} className="btn p-0 d-flex justify-content-center align-items-center" style={{ aspectRatio: "1", width: "50px" }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 54" className='w-75'>
                                            <g strokeWidth={3} stroke="#727272">
                                                <rect x="2" y="2" width="60" rx="5" height="50" fill="transparent" ></rect>
                                                <path d="M16 52 L 16 2" ></path>
                                                <path d="M48 52 L 48 2" ></path>
                                            </g>
                                        </svg>
                                    </button>
                                </div>
                                <div className='d-flex justify-content-start align-items-center' style={{ marginLeft: "14.5px" }}>
                                    <button onClick={() => changeColumn("3", { left: `${100 / 4}%`, center: `${100 / 4}%`, right: `${100 / 2}%` }, false)} className="btn p-0 d-flex justify-content-center align-items-center" style={{ aspectRatio: "1", width: "50px" }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 54" className='w-75'>
                                            <g strokeWidth={3} stroke="#727272">
                                                <rect x="2" y="2" width="60" rx="5" height="50" fill="transparent" ></rect>
                                                <path d="M16 52 L 16 2" ></path>
                                                <path d="M32 52 L 32 2" ></path>
                                            </g>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}
                        {/* Column Split for 3 Columns Ends */}
                        {/* Column Split Ends */}
                    </div>
                    <div className="p-1">
                        {colWise?.[indexes?.cur]?.elements?.map((curElem) => {
                            return (
                                <button onClick={() => {
                                    setValues({ ...colWise[indexes?.cur]?.elements[colWise[indexes?.cur]?.elements?.findIndex($ => $?.positionType === curElem?.positionType)]?.style })
                                    setIndexes({ cur: indexes?.cur, curElem: curElem?.positionType, subElem: "parent" })
                                    setCurrPosition({ ...currPosition, selectedType: "column" })
                                }} className="btn btn-outline-dark w-100 text-capitalize mb-1 text-start">
                                    {colWise[indexes?.cur].elements?.length > 1 ? curElem?.positionType : ""} column
                                </button>
                            )
                        })}
                    </div>
                </div>
            )
            spacing = (
                <>
                    <UncontrolledAccordion defaultOpen={['1', '2', '3']} stayOpen>
                        <AccordionItem>
                            <AccordionHeader className='acc-header' targetId='1' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                                <p className='m-0 fw-bolder text-black text-uppercase' style={{ padding: "0.5rem 0px", fontSize: "0.75rem" }}>Spacing</p>
                            </AccordionHeader>
                            <AccordionBody accordionId='1'>
                                <div className='p-0 mx-0 my-1'>
                                    <InputChange
                                        getMDToggle={getMDToggle}
                                        allValues={values}
                                        setAllValues={setValues}
                                        type="padding"
                                    />
                                    <InputChange
                                        getMDToggle={getMDToggle}
                                        allValues={values}
                                        setAllValues={setValues}
                                        type="margin"
                                    />
                                </div>
                            </AccordionBody>
                        </AccordionItem>
                    </UncontrolledAccordion>
                </>
            )
        } else if (selectedType === "input") {
            const arr = [...colWise]
            const positionIndex = colWise[indexes?.cur]?.elements?.findIndex($ => $?.positionType === indexes?.curElem)
            styles = (
                <>
                    <UncontrolledAccordion defaultOpen={['11']} stayOpen>
                        <AccordionItem>
                            <AccordionHeader className="acc-header" targetId="10" style={{ borderBottom: "1px solid #EBE9F1", borderRadius: "0" }}>
                                <p className="m-0 fw-bolder text-black text-uppercase" style={{ padding: "0.5rem 0px", fontSize: "0.75rem" }}> Text Alignment </p>
                            </AccordionHeader>
                            <AccordionBody accordionId="10">
                                <div className="p-0 mx-0 my-1">
                                    {values && (
                                        <>
                                            {getMDToggle({ label: `textalign:`, value: `textAlign` })}
                                            <div className="blocks d-flex gap-1">
                                                {/* Left Alignment */}
                                                <div onClick={() => setValues({ ...values, textAlign: "left" })} className={`cursor-pointer rounded w-100 text-center border-${values?.textAlign === "left" ? "black" : "dark"}`} style={{ padding: "0.5rem", aspectRatio: "1" }}>
                                                    <div>
                                                        <svg
                                                            width="1.25rem"
                                                            height="1.25rem"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 24 24"
                                                            fill={values?.textAlign === "left" ? "black" : "#464646"}
                                                        >
                                                            <path d="M21,10H16V7a1,1,0,0,0-1-1H4V3A1,1,0,0,0,2,3V21a1,1,0,0,0,2,0V18H21a1,1,0,0,0,1-1V11A1,1,0,0,0,21,10ZM4,8H14v2H4Zm16,8H4V12H20Z" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <span className={`text-${values?.textAlign === "left" ? "black" : "dark"}`}> Left </span>
                                                    </div>
                                                </div>

                                                {/* Center Alignment */}
                                                <div onClick={() => setValues({ ...values, textAlign: "center" })} className={`cursor-pointer rounded w-100 text-center border-${values?.textAlign === "center" ? "black" : "dark"}`} style={{ padding: "0.5rem", aspectRatio: "1" }}>
                                                    <div>
                                                        <svg
                                                            width="1.25rem"
                                                            height="1.25rem"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 24 24"
                                                            fill={values?.textAlign === "center" ? "black" : "#464646"}
                                                        >
                                                            <path d="M21,10H19V7a1,1,0,0,0-1-1H13V3a1,1,0,0,0-2,0V6H6A1,1,0,0,0,5,7v3H3a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1h8v3a1,1,0,0,0,2,0V18h8a1,1,0,0,0,1-1V11A1,1,0,0,0,21,10ZM7,8H17v2H7Zm13,8H4V12H20Z" />
                                                        </svg>
                                                    </div>

                                                    <div>
                                                        <span className={`text-${values?.textAlign === "center" ? "black" : "dark"}`}> Center </span>
                                                    </div>
                                                </div>

                                                {/* Right Alignment */}
                                                <div onClick={() => setValues({ ...values, textAlign: "right" })} className={`cursor-pointer rounded w-100 text-center border-${values?.textAlign === "right" ? "black" : "dark"}`} style={{ padding: "0.5rem", aspectRatio: "1" }}>
                                                    <div>
                                                        <svg
                                                            width="1.25rem"
                                                            height="1.25rem"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 24 24"
                                                            fill={values.textAlign === "right" ? "black" : "#464646"}
                                                        >
                                                            <path d="M21,2a1,1,0,0,0-1,1V6H9A1,1,0,0,0,8,7v3H3a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1H20v3a1,1,0,0,0,2,0V3A1,1,0,0,0,21,2ZM20,16H4V12H20Zm0-6H10V8H20Z" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <span className={`text-${values?.textAlign === "right" ? "black" : "dark"}`}> Right </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {colWise[indexes?.cur].elements[positionIndex]?.element[indexes?.subElem]?.hasLabel && <div className='mb-2'>
                                        {getMDToggle({ label: `Label and Input gap: ${values?.elemGap ? values?.elemGap : "0px"}`, value: `width` })}
                                        <div className="d-flex p-0 justify-content-between align-items-center gap-2">
                                            <input value={parseFloat(values?.elemGap ? values?.elemGap : "0px")} type='range' className='w-100' onChange={e => {
                                                setValues({ ...values, elemGap: `${e.target.value}px` })
                                            }} name="height" min="0" max="600" />
                                        </div>
                                    </div>}
                                </div>
                            </AccordionBody>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionHeader className='acc-header' targetId='11' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                                <p className='m-0 fw-bolder text-black text-uppercase' style={{ padding: "0.5rem 0px", fontSize: "0.75rem" }}>Text Color</p>
                            </AccordionHeader>
                            <AccordionBody accordionId='11'>
                                <div className='p-0 mx-0 my-1'>
                                    <div className='p-0 mb-1 justify-content-start align-items-center'>
                                        {getMDToggle({ label: `Text Color:`, value: [`color`, "WebkitTextFillColor"] })}
                                        <div className="border rounded" style={{ backgroundImage: `url(${pixels})` }}>
                                            <div className="p-1" style={{ backgroundColor: values.WebkitTextFillColor ? values.WebkitTextFillColor : "#000000" }} onClick={() => { setBgModal5(!bgModal5) }}></div>

                                        </div>
                                    </div>
                                </div>
                            </AccordionBody>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionHeader className='acc-header' targetId='1' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                                <p className='m-0 fw-bolder text-black text-uppercase' style={{ padding: "0.5rem 0px", fontSize: "0.75rem" }}>Font</p>
                            </AccordionHeader>
                            <AccordionBody accordionId='1'>
                                <div className='p-0 mx-0 my-1'>
                                    <div className='p-0 mb-2 justify-content-start align-items-center'>
                                        {getMDToggle({ label: `Select Font: `, value: `fontFamily` })}
                                        <Select className='w-100' name="" onChange={e => {
                                            setValues({ ...values, fontFamily: e.value })
                                        }} id="" options={fontStyles} styles={{
                                            option: (provided, state) => {
                                                return ({ ...provided, fontFamily: fontStyles[fontStyles?.findIndex($ => $?.value === state.value)]?.value })
                                            }
                                        }} />
                                    </div>
                                </div>
                            </AccordionBody>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionHeader className='acc-header' targetId='2' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                                <p className='m-0 fw-bolder text-black text-uppercase' style={{ padding: "0.5rem 0px", fontSize: "0.75rem" }}>Display</p>
                            </AccordionHeader>
                            <AccordionBody accordionId='2'>
                                <div className='p-0 mx-0 my-1'>
                                    <div className='p-0 mb-2 justify-content-start align-items-center'>
                                        {getMDToggle({ label: `Width Type: `, value: `widthType` })}
                                        <Select className='w-100' name="" onChange={e => {
                                            if (e.value === "100%") {
                                                setValues({ ...values, widthType: e.value, width: e.value, minHeight: "0px", padding: "10px" })
                                            } else if (e.value === "custom") {
                                                setValues({ ...values, widthType: e.value, padding: "10px" })
                                            }
                                        }} id="" options={[
                                            { value: '100%', label: '100%' },
                                            { value: 'custom', label: 'Custom' }
                                        ]} />
                                    </div>
                                    {values?.widthType === "custom" && <div className='mb-2'>
                                        {getMDToggle({ label: `Width: ${values?.width}`, value: `width` })}
                                        <div className="d-flex p-0 justify-content-between align-items-center gap-2">
                                            <input value={parseFloat(values?.width)} type='range' className='w-100' onChange={e => {
                                                setValues({ ...values, width: `${e.target.value}px` })
                                            }} name="height" min="20" max="600" />
                                        </div>
                                    </div>}
                                    {values?.widthType === "custom" && <div className='mb-2'>
                                        {getMDToggle({ label: `Height: ${values?.minHeight}`, value: `minHeight` })}
                                        <div className="d-flex p-0 justify-content-between align-items-center gap-2">
                                            <input value={parseFloat(values?.minHeight)} type='range' className='w-100' onChange={e => {
                                                setValues({ ...values, minHeight: `${e.target.value}px` })
                                            }} name="height" min="0" max="600" />
                                        </div>
                                    </div>}

                                    {values.widthType !== "100%" && (<>
                                        {getMDToggle({ label: `Alignment:`, value: `alignType` })}
                                        <div className="blocks d-flex gap-1">
                                            <div onClick={() => setValues({ ...values, alignType: "left" })} className={`cursor-pointer rounded w-100 text-center border-${values?.alignType === "left" ? "black" : "dark"}`} style={{ padding: "0.5rem", aspectRatio: "1" }}>
                                                <div>
                                                    <svg
                                                        width="1.25rem"
                                                        height="1.25rem"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill={values?.alignType === "left" ? "black" : "#464646"}
                                                    >
                                                        <path d="M21,10H16V7a1,1,0,0,0-1-1H4V3A1,1,0,0,0,2,3V21a1,1,0,0,0,2,0V18H21a1,1,0,0,0,1-1V11A1,1,0,0,0,21,10ZM4,8H14v2H4Zm16,8H4V12H20Z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <span className={`text-${values?.alignType === "left" ? "black" : "dark"}`}>Left</span>
                                                </div>
                                            </div>
                                            <div onClick={() => setValues({ ...values, alignType: "center" })} className={`cursor-pointer rounded w-100 text-center border-${values?.alignType === "center" ? "black" : "dark"}`} style={{ padding: "0.5rem", aspectRatio: "1" }}>
                                                <div>
                                                    <svg
                                                        width="1.25rem"
                                                        height="1.25rem"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill={values?.alignType === "center" ? "black" : "#464646"}
                                                    >
                                                        <path d="M21,10H19V7a1,1,0,0,0-1-1H13V3a1,1,0,0,0-2,0V6H6A1,1,0,0,0,5,7v3H3a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1h8v3a1,1,0,0,0,2,0V18h8a1,1,0,0,0,1-1V11A1,1,0,0,0,21,10ZM7,8H17v2H7Zm13,8H4V12H20Z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <span className={`text-${values?.alignType === "center" ? "black" : "dark"}`}>Center</span>
                                                </div>
                                            </div>
                                            <div onClick={() => setValues({ ...values, alignType: "right" })} className={`cursor-pointer rounded w-100 text-center border-${values?.alignType === "right" ? "black" : "dark"}`} style={{ padding: "0.5rem", aspectRatio: "1" }}>
                                                <div>
                                                    <svg
                                                        width="1.25rem"
                                                        height="1.25rem"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill={values.alignType === "right" ? "black" : "#464646"}
                                                    >
                                                        <path d="M21,2a1,1,0,0,0-1,1V6H9A1,1,0,0,0,8,7v3H3a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1H20v3a1,1,0,0,0,2,0V3A1,1,0,0,0,21,2ZM20,16H4V12H20Zm0-6H10V8H20Z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <span className={`text-${values?.alignType === "right" ? "black" : "dark"}`}>Right</span>
                                                </div>
                                            </div>
                                        </div>
                                    </>)}
                                    {colWise[indexes?.cur].elements[positionIndex]?.element[indexes?.subElem]?.hasLabel && <div className='mb-2'>
                                        {getMDToggle({ label: `Label and Input gap: ${values?.elemGap ? values?.elemGap : "0px"}`, value: `elemGap` })}
                                        <div className="d-flex p-0 justify-content-between align-items-center gap-2">
                                            <input value={parseFloat(values?.elemGap ? values?.elemGap : "0px")} type='range' className='w-100' onChange={e => {
                                                setValues({ ...values, elemGap: `${e.target.value}px` })
                                            }} name="height" min="0" max="600" />
                                        </div>
                                    </div>}
                                </div>
                            </AccordionBody>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionHeader className='acc-header' targetId='3' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                                <p className='m-0 fw-bolder text-black text-uppercase' style={{ padding: "0.5rem 0px", fontSize: "0.75rem" }}>Background Fill</p>
                            </AccordionHeader>
                            <AccordionBody accordionId='3'>
                                <div className='p-0 mx-0 my-1'>
                                    <div className='p-0 mb-1 justify-content-start align-items-center'>
                                        {getMDToggle({ label: `Background:`, value: ["bgType", "backgroundColor", "backgroundImage"] })}
                                        <div className="border rounded" style={{ backgroundImage: `url(${pixels})` }}>
                                            <div className="p-1" style={{ backgroundColor: values?.backgroundColor, backgroundImage: values?.backgroundImage, backgroundRepeat: values?.backgroundRepeat, backgroundSize: values?.backgroundSize }} onClick={() => setBgModal0(!bgModal0)}></div>
                                        </div>
                                    </div>
                                </div>
                            </AccordionBody>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionHeader className='acc-header' targetId='4' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                                <p className='m-0 fw-bolder text-black text-uppercase' style={{ padding: "0.5rem 0px", fontSize: "0.75rem" }}>Border and Shadow</p>
                            </AccordionHeader>
                            <AccordionBody accordionId='4'>
                                <BorderChange pageCondition={pageCondition} getMDToggle={getMDToggle} setStyles={setValues} styles={values} />
                            </AccordionBody>
                        </AccordionItem>
                    </UncontrolledAccordion>
                </>
            )
            general = (
                <>
                    <div className='p-1 mx-0 my-0'>
                        <div className='mt-0'>
                            <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Type:</span>
                            <div className="d-flex p-0 justify-content-between align-items-center gap-2">
                                <Select value={inputTypeList?.filter(item => item?.value === arr[indexes?.cur]?.elements[positionIndex]?.element[indexes?.subElem]?.inputType)} className='w-100' name="" id=""
                                    onChange={e => {
                                        arr[indexes?.cur].elements[positionIndex].element[indexes?.subElem].inputType = e.value
                                        arr[indexes?.cur].elements[positionIndex].element[indexes?.subElem].placeholder = e.label
                                        arr[indexes?.cur].elements[positionIndex].element[indexes?.subElem].labelText = e.label
                                        setcolWise([...arr])
                                    }} options={inputTypeList?.filter(item => !disableIpDrag?.includes(item?.value))} />
                            </div>
                        </div>
                        <div className='my-2'>
                            <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Placeholder:</span>
                            <div className="d-flex p-0 justify-content-between align-items-center gap-2">
                                <input value={colWise[indexes?.cur]?.elements[positionIndex]?.element[indexes?.subElem]?.placeholder} onChange={e => {
                                    arr[indexes?.cur].elements[positionIndex].element[indexes?.subElem].placeholder = e.target.value
                                    setcolWise([...arr])
                                }} type="text" name='title' min="0" max="300" className='form-control' />
                            </div>
                        </div>
                        <div className='my-2'>
                            <div className="d-flex p-0 justify-content-between align-items-center gap-3 form-check">
                                <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Show Label:</span>
                                <input checked={colWise[indexes?.cur]?.elements[positionIndex]?.element[indexes?.subElem]?.hasLabel} onChange={e => {
                                    arr[indexes?.cur].elements[positionIndex].element[indexes?.subElem].hasLabel = e.target.checked
                                    setcolWise([...arr])
                                }} type="checkbox" name='title' min="0" max="300" className='form-check-input' />
                            </div>
                        </div>
                        <div className='d-flex p-0 my-1 justify-content-between gap-3 align-items-center'>
                            <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Required?</span>
                            <div className="form-check m-0 p-0">
                                <input checked={colWise[indexes?.cur]?.elements[positionIndex]?.element[indexes?.subElem]?.isRequired} onChange={e => {
                                    arr[indexes?.cur].elements[positionIndex].element[indexes?.subElem].isRequired = e.target.checked
                                    setcolWise([...arr])
                                }} className="form-check-input m-0" type="checkbox" id="flexSwitchCheckChecked" />
                            </div>
                        </div>
                        {colWise[indexes?.cur]?.elements[positionIndex]?.element[indexes?.subElem]?.isRequired && <div className='my-1'>
                            <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Error message:</span>
                            <div className="d-flex p-0 justify-content-between align-items-center gap-2">
                                <input checked={colWise[indexes?.cur]?.elements[positionIndex]?.element[indexes?.subElem]?.isRequiredText} onChange={e => {
                                    arr[indexes?.cur].elements[positionIndex].element[indexes?.subElem].isRequiredText = e.target.value
                                    setcolWise([...arr])
                                }} defaultValue={"Please fill this field"} type="text" name='title' min="0" max="300" className='form-control' />
                            </div>
                        </div>}

                        <div className="mt-2">
                            <a className="btn btn-primary" onClick={() => setEmailPreviewModal(!emailPreviewModal)}>Show Email Preview</a>
                        </div>
                    </div>
                </>
            )
            spacing = (
                <>
                    <UncontrolledAccordion defaultOpen={['1', '2', '3']} stayOpen>
                        <AccordionItem>
                            <AccordionHeader className='acc-header' targetId='1' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                                <p className='m-0 fw-bolder text-black text-uppercase' style={{ padding: "0.5rem 0px", fontSize: "0.75rem" }}>Spacing</p>
                            </AccordionHeader>
                            <AccordionBody accordionId='1'>
                                <div className='p-0 mx-0 my-1'>
                                    <InputChange
                                        getMDToggle={getMDToggle}
                                        allValues={values}
                                        setAllValues={setValues}
                                        type="margin"
                                    />
                                </div>
                            </AccordionBody>
                        </AccordionItem>
                    </UncontrolledAccordion>
                </>
            )
        } else if (selectedType === "close") {
            styles = (
                <div className='mx-0 my-1 px-1'>
                    <div className='d-flex p-0 mb-1 justify-content-between align-items-center '>
                        <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Close when "Esc" is pressed</span>
                        <div className="form-check form-switch form-check-dark m-0 p-0" style={{ transform: 'scale(0.8)' }}>
                            <input className="form-check-input cursor-pointer" checked={finalObj?.closePopUpOn?.escape} onChange={e => {
                                updatePresent({ ...finalObj, closePopUpOn: { ...finalObj?.closePopUpOn, escape: e.target.checked } })
                            }} type="checkbox" id="flexSwitchCheckChecked" />
                        </div>
                    </div>
                    <div className='d-flex p-0 mb-1 justify-content-between align-items-center '>
                        <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Close when overlay is clicked</span>
                        <div className="form-check form-switch form-check-dark m-0 p-0" style={{ transform: 'scale(0.8)' }}>
                            <input className="form-check-input cursor-pointer" checked={finalObj?.closePopUpOn?.overlay} onChange={e => {
                                updatePresent({ ...finalObj, closePopUpOn: { ...finalObj?.closePopUpOn, overlay: e.target.checked } })
                            }} type="checkbox" id="flexSwitchCheckChecked" />
                        </div>
                    </div>
                    <div className='p-0 my-1'>
                        {getMDToggle({ label: "Background Color", value: ["bgType", "backgroundColor", "backgroundImage"] })}
                        {/* <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Background Color</span> */}
                        <div className="rounded border" style={{ backgroundImage: `url(${pixels})` }}>
                            <div className="p-2 12" style={{ backgroundColor: finalObj?.crossButtons?.[`${mobileCondition}main`]?.backgroundColor, backgroundImage: finalObj?.crossButtons?.[`${mobileCondition}main`]?.backgroundImage }} onClick={() => {
                                setColorType("backgroundColor")
                                setCustomColorModal(!customColorModal)
                            }}></div>
                        </div>

                        {/* <div className="d-flex align-items-center justify-content-between gap-1 form-check form-check-success m-0 p-0">
                            <label style={{ fontSize: "10px" }} className="form-check-label m-0 p-0">Keep same background colour for {isMobile ? "desktop theme" : "mobile theme"}</label>
                            <input
                                checked={finalObj?.responsive[finalObj?.responsive?.findIndex($ => isEqual($?.position, "close"))]?.common?.includes("backgroundColor")}
                                type='checkbox' className='form-check-input m-0 p-0' onChange={(e) => {
                                    const newObj = { ...finalObj }
                                    if (e.target.checked) {
                                        if (finalObj?.responsive?.some($ => isEqual($?.position, "close"))) {
                                            const responiveIndex = finalObj?.responsive?.findIndex($ => isEqual($?.position, "close"))
                                            newObj.responsive[responiveIndex]?.common?.push("backgroundColor")
                                        } else {
                                            newObj?.responsive?.push({ position: "close", common: ["backgroundColor"], page: currPage })
                                        }
                                    } else {
                                        const responiveIndex = finalObj?.responsive?.findIndex($ => isEqual($?.position, "close"))
                                        newObj.responsive[responiveIndex].common = newObj?.responsive[responiveIndex]?.common?.filter(item => item !== "backgroundColor")
                                    }
                                    updatePresent({ ...newObj })
                                }} />
                        </div> */}
                    </div>
                    <div className='p-0 my-1'>
                        {getMDToggle({ label: "X Color", value: `color` })}
                        <div className="rounded border" style={{ backgroundImage: `url(${pixels})` }}>
                            <div className="p-2" style={{ backgroundColor: finalObj?.crossButtons?.[`${mobileCondition}main`]?.color }} onClick={() => {
                                setColorType("color")
                                setCustomColorModal(!customColorModal)
                            }}></div>
                        </div>
                    </div>
                    <div className='my-1'>
                        {getMDToggle({
                            label: <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Size: {finalObj?.crossButtons[`${pageCondition}`]?.width}</span>,
                            value: [`width`, 'height', 'maxWidth', 'maxHeight']
                        })}
                        <div className="p-0 justify-content-start align-items-center gap-2">
                            <input value={parseFloat(finalObj?.crossButtons[`${pageCondition}`]?.width)} type='range' className='w-100' name="height" min="5" max="300"
                                onChange={(e) => {
                                    updatePresent({
                                        ...finalObj,
                                        crossButtons:
                                        {
                                            ...finalObj?.crossButtons,
                                            [`${mobileCondition}${pageCondition}`]:
                                            {
                                                ...finalObj?.crossButtons[`${mobileCondition}${pageCondition}`],
                                                width: `${e.target.value}px`,
                                                height: `${e.target.value}px`,
                                                maxWidth: `${e.target.value}px`,
                                                maxHeight: `${e.target.value}px`
                                            },
                                            [`${mobileConditionRev}${pageCondition}`]:
                                            {
                                                ...finalObj?.crossButtons[`${mobileConditionRev}${pageCondition}`],
                                                width: finalObj?.responsiveStyles?.close.includes("width") ? `${e.target.value}px` : finalObj?.crossButtons[`${mobileConditionRev}${pageCondition}`]?.width,
                                                height: finalObj?.responsiveStyles?.close.includes("height") ? `${e.target.value}px` : finalObj?.crossButtons[`${mobileConditionRev}${pageCondition}`]?.height,
                                                maxWidth: finalObj?.responsiveStyles?.close.includes("maxWidth") ? `${e.target.value}px` : finalObj?.crossButtons[`${mobileConditionRev}${pageCondition}`]?.maxWidth,
                                                maxHeight: finalObj?.responsiveStyles?.close.includes("maxHeight") ? `${e.target.value}px` : finalObj?.crossButtons[`${mobileConditionRev}${pageCondition}`]?.maxHeight
                                            }
                                        }
                                    })
                                    // setCrossStyle({ ...crossStyle, width: `${e.target.value}px`, height: `${e.target.value}px`, maxWidth: `${e.target.value}px`, maxHeight: `${e.target.value}px` })
                                }} />
                        </div>
                    </div>
                    <div className='my-1'>
                        {getMDToggle({
                            label: <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Corner radius {finalObj?.crossButtons[`${pageCondition}`]?.width}</span>,
                            value: `borderRadius`
                        })}
                        <div className=" p-0 justify-content-start align-items-center gap-2">
                            <input value={parseFloat(finalObj?.crossButtons[`${pageCondition}`]?.borderRadius)} type='range' className='w-100' name="height" min="0" max="300"
                                onChange={(e) => {
                                    // const newSize = parseInt(e.target.value)
                                    updatePresent({
                                        ...finalObj,
                                        crossButtons: {
                                            ...finalObj?.crossButtons,
                                            [`${mobileCondition}${pageCondition}`]:
                                            {
                                                ...finalObj?.crossButtons[`${mobileCondition}${pageCondition}`],
                                                borderRadius: `${e.target.value}px`
                                            },
                                            [`${mobileConditionRev}${pageCondition}`]:
                                            {
                                                ...finalObj?.crossButtons[`${mobileConditionRev}${pageCondition}`],
                                                borderRadius: finalObj?.responsiveStyles?.close.includes("borderRadius") ? `${e.target.value}px` : finalObj?.crossButtons[`${mobileConditionRev}${pageCondition}`]?.borderRadius
                                            }
                                        }
                                    })
                                    // updatePresent({...finalObj, crossButtons: {...finalObj?.crossButtons, borderRadius: `${e.target.value}px`}})
                                    // setCrossStyle({ ...crossStyle, borderRadius: `${e.target.value}px` })
                                }} />
                        </div>
                    </div>
                </div>
            )
            spacing = (
                <>
                    <div className='mx-0 my-1 px-1'>
                        <div className=''>
                            <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Vertical alignment: {finalObj?.crossButtons[`${pageCondition}`]?.translateY}</span>
                            <div className=" p-0 justify-content-start align-items-center gap-2">
                                <input value={parseFloat(finalObj?.crossButtons[`${pageCondition}`]?.translateY)} onChange={e => {
                                    updatePresent({ ...finalObj, crossButtons: { ...finalObj?.crossButtons, [`${mobileCondition}${pageCondition}`]: { ...finalObj?.crossButtons[`${mobileCondition}${pageCondition}`], translateY: `${e.target.value}px`, transform: `translateX(${finalObj?.crossButtons[`${mobileCondition}${pageCondition}`]?.translateX}) translateY(${e.target.value}px)` } } })

                                    // setCrossStyle({ ...crossStyle, translateY: `${e.target.value}px` })
                                }} type='range' className='w-100' name="height" min={currPage === "button" ? `-${(finalObj?.backgroundStyles[`${mobileCondition}button`][isMobile ? "maxWidth" : "width"]).replace("px", "")}` : `-${(finalObj?.backgroundStyles[`${mobileCondition}main`]?.[isMobile ? "maxWidth" : "width"]).replace("px", "")}`} max={currPage === "button" ? `${(finalObj?.backgroundStyles[`${mobileCondition}button`][isMobile ? "maxWidth" : "width"]).replace("px", "")}` : (finalObj?.backgroundStyles[`${mobileCondition}main`]?.[isMobile ? "maxWidth" : "width"]).replace("px", "")} />
                            </div>
                        </div>
                        <div className='my-1'>
                            <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Horizontal alignment: {finalObj?.crossButtons[`${pageCondition}`]?.translateX}</span>
                            <div className="p-0 justify-content-start align-items-center gap-2">
                                <input value={parseFloat(finalObj?.crossButtons[`${pageCondition}`]?.translateX)} onChange={e => {
                                    updatePresent({ ...finalObj, crossButtons: { ...finalObj?.crossButtons, [`${mobileCondition}${pageCondition}`]: { ...finalObj?.crossButtons[`${mobileCondition}${pageCondition}`], translateX: `${e.target.value}px`, transform: `translateX(${e.target.value}px) translateY(${finalObj?.crossButtons[`${mobileCondition}${pageCondition}`]?.translateY})` } } })

                                    // setCrossStyle({ ...crossStyle, translateX: `${e.target.value}px` })
                                }} type='range' className='w-100' name="height" min={`-${finalObj?.backgroundStyles[`${mobileCondition}main`]?.minHeight.replace("px", "")}`} max={`${finalObj?.backgroundStyles[`${mobileCondition}main`]?.minHeight.replace("px", "")}`} />
                            </div>
                        </div>
                    </div>
                </>
            )
        } else if (selectedType === "column") {
            const arr = [...colWise]
            const positionIndex = colWise[indexes.cur]?.elements?.findIndex($ => $?.positionType === indexes.curElem)
            const alignOptions = [{ value: "start", label: "Top" }, { value: "center", label: "Middle" }, { value: "end", label: "Bottom" }]
            styles = (
                <>
                    <UncontrolledAccordion defaultOpen={['1', '2', '3']} stayOpen>
                        <AccordionItem>
                            <AccordionHeader className='acc-header' targetId='1' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                                <p className='m-0 fw-bolder text-black text-uppercase' style={{ padding: "0.5rem 0px", fontSize: "0.75rem" }}>Background Fill</p>
                            </AccordionHeader>
                            <AccordionBody accordionId='1'>
                                <div className='p-0 mx-0 my-1'>
                                    <div className=' p-0 justify-content- align-items-center gap-1'>
                                        {getMDToggle({ label: `Background:`, value: ["bgType", "backgroundColor", "backgroundImage"] })}
                                        <div className=" rounded border cursor-pointer" style={{ backgroundImage: `url(${pixels})` }}>
                                            <div onClick={() => setBgModal0(!bgModal0)} className="p-2 w-100" style={{ backgroundColor: values?.backgroundColor, backgroundImage: values?.backgroundImage }}></div>
                                        </div>
                                    </div>
                                </div>
                            </AccordionBody>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionHeader className='acc-header' targetId='2' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                                <p className='m-0 fw-bolder text-black text-uppercase' style={{ padding: "0.5rem 0px", fontSize: "0.75rem" }}>Border and Shadow</p>
                            </AccordionHeader>
                            <AccordionBody accordionId='2'>
                                <BorderChange pageCondition={pageCondition} getMDToggle={getMDToggle} styles={values} setStyles={setValues} />
                            </AccordionBody>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionHeader className='acc-header' targetId='3' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                                <p className='m-0 fw-bolder text-black text-uppercase' style={{ padding: "0.5rem 0px", fontSize: "0.75rem" }}>Content</p>
                            </AccordionHeader>
                            <AccordionBody accordionId='3'>
                                <div className='p-0 mx-0 my-1'>
                                    <div className=' p-0 justify-content- align-items-center gap-1'>
                                        <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Vertical Alignment:</span>
                                        <Select value={alignOptions?.filter(item => item.value === colWise[indexes.cur]?.elements[positionIndex]?.style?.justifyContent)} onChange={e => {
                                            // if (arr[indexes.cur].elements[positionIndex].style.justifyContent) {
                                            arr[indexes.cur].elements[positionIndex].style.justifyContent = e.value
                                            // }
                                            setcolWise([...arr])
                                        }} options={alignOptions} />
                                    </div>
                                </div>
                            </AccordionBody>
                        </AccordionItem>
                    </UncontrolledAccordion>
                </>
            )
            spacing = (
                <>
                    <UncontrolledAccordion defaultOpen={['1', '2', '3']} stayOpen>
                        <AccordionItem>
                            <AccordionHeader className='acc-header' targetId='1' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                                <p className='m-0 fw-bolder text-black text-uppercase' style={{ padding: "0.5rem 0px", fontSize: "0.75rem" }}>Spacing</p>
                            </AccordionHeader>
                            <AccordionBody accordionId='1'>
                                <div className='p-0 mx-0 my-1'>
                                    <InputChange
                                        getMDToggle={getMDToggle}
                                        allValues={values}
                                        setAllValues={setValues}
                                        type="padding"
                                    />
                                    <InputChange
                                        getMDToggle={getMDToggle}
                                        allValues={values}
                                        setAllValues={setValues}
                                        type="margin"
                                    />
                                </div>
                            </AccordionBody>
                        </AccordionItem>
                    </UncontrolledAccordion>
                </>
            )
        } else if (selectedType === "offer") {
            general = (
                <>
                    <UncontrolledAccordion stayOpen defaultOpen={['1', '2', '3', '4']}>
                        <AccordionItem>
                            <AccordionHeader className='acc-header' targetId='1' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                                <p className='m-0 fw-bolder text-black text-uppercase' style={{ padding: "0.5rem 0px", fontSize: "0.75rem" }}>Offer Settings</p>
                            </AccordionHeader>
                            <AccordionBody accordionId='1'>
                                <div className='p-0 mx-0 my-1'>
                                    <button className="btn btn-primary w-100" onClick={() => setOffersModal(!offersModal)}>Change offer design</button>
                                </div>
                                <div className='p-0 mx-0 my-1'>
                                    {!isEqual(selectedOffer, {}) ? (
                                        <div>
                                            <label htmlFor="redeemUrl" className="form-control-label">Offer Code: {selectedOffer?.Code} </label>
                                            <div className="redeem mt-2">
                                                <span className='d-block'>Offer Redeem URL:</span>
                                                <div class="input-group mb-3 d-none">
                                                    {/* <span class="input-group-text" id="basic-addon3">https://{outletData[0]?.web_url}</span> */}
                                                    <input type="text" class="form-control" id="basic-url" onChange={e => {
                                                        const newObj = { ...finalObj }
                                                        const offerIndex = newObj?.selectedOffers?.findIndex($ => isEqual($, selectedOffer))
                                                        newObj.selectedOffers[offerIndex].url = e.target.value
                                                    }} aria-describedby="basic-addon3" />
                                                </div>

                                                <input type="text" className='form-control' placeholder='https://example.url.com' value={finalObj?.selectedOffers[finalObj?.selectedOffers?.findIndex($ => isEqual($, selectedOffer))]?.url ? `https://${outletData[0]?.web_url}${finalObj?.selectedOffers[finalObj?.selectedOffers?.findIndex($ => isEqual($, selectedOffer))]?.url}` : `https://${outletData[0]?.web_url}`} onChange={e => {
                                                    const prefix = `https://${outletData[0]?.web_url}`
                                                    const newObj = { ...finalObj }
                                                    const offerIndex = newObj?.selectedOffers?.findIndex($ => isEqual($, selectedOffer))
                                                    newObj.selectedOffers[offerIndex].url = e.target.value.split(prefix)[1]
                                                    updatePresent({ ...newObj })

                                                }} />

                                            </div>

                                            <div className="redeem mt-2">
                                                <span className='d-block'>Offer Description:</span>
                                                <textarea value={finalObj?.selectedOffers[finalObj?.selectedOffers?.findIndex($ => isEqual($, selectedOffer))]?.Summary ? finalObj?.selectedOffers[finalObj?.selectedOffers?.findIndex($ => isEqual($, selectedOffer))]?.Summary : selectedOffer?.Summary} placeHolder="Redeem Summary" onChange={(e) => {
                                                    const newObj = { ...finalObj }
                                                    const offerIndex = newObj?.selectedOffers?.findIndex($ => isEqual($, selectedOffer))
                                                    newObj.selectedOffers[offerIndex].Summary = e.target.value
                                                    updatePresent({ ...newObj })
                                                }} className="form-control" id="redeemSummary" />

                                            </div>
                                        </div>
                                    ) : (
                                        <span style={{ fontSize: "10px" }}>Please click on a selected offer on the previe to edit its URL</span>
                                    )}

                                </div>
                            </AccordionBody>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionHeader className='acc-header' targetId='2' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                                <p className='m-0 fw-bolder text-black text-uppercase' style={{ padding: "0.5rem 0px", fontSize: "0.75rem" }}>Toggle Sections</p>
                            </AccordionHeader>
                            <AccordionBody accordionId='2'>
                                <div className='p-0 mx-0 my-1'>
                                    <div className="form-check form-check-success">
                                        {/* <div className="d-flex align-items-center gap-1 mb-1">
                                            <input onChange={() => {
                                                if (finalObj?.offerProperties?.showSections?.includes("usage")) {
                                                    updatePresent({ ...finalObj, offerProperties: { ...finalObj?.offerProperties, showSections: [...finalObj?.offerProperties?.showSections]?.filter($ => $ !== "usage") } })
                                                } else {
                                                    updatePresent({ ...finalObj, offerProperties: { ...finalObj?.offerProperties, showSections: [...finalObj?.offerProperties?.showSections, "usage"] } })

                                                }
                                            }} checked={finalObj?.offerProperties?.showSections?.includes("usage")} id='visible-offer-usage' type="checkbox" className="form-check-input" />
                                            <label htmlFor="visible-offer-usage" className="form-check-label">Usage</label>
                                        </div> */}
                                        <div className="d-flex align-items-center gap-1 mb-1">
                                            <input onChange={() => {
                                                if (finalObj?.offerProperties?.showSections?.includes("validity")) {
                                                    updatePresent({ ...finalObj, offerProperties: { ...finalObj?.offerProperties, showSections: [...finalObj?.offerProperties?.showSections]?.filter($ => $ !== "validity") } })
                                                } else {
                                                    updatePresent({ ...finalObj, offerProperties: { ...finalObj?.offerProperties, showSections: [...finalObj?.offerProperties?.showSections, "validity"] } })

                                                }
                                            }} checked={finalObj?.offerProperties?.showSections?.includes("validity")} id='visible-offer-validity' type="checkbox" className="form-check-input" />
                                            <label htmlFor="visible-offer-validity" className="form-check-label">Validity</label>
                                        </div>
                                        <div className="d-flex align-items-center gap-1 mb-1">
                                            <input onChange={() => {
                                                if (finalObj?.offerProperties?.showSections?.includes("description")) {
                                                    updatePresent({ ...finalObj, offerProperties: { ...finalObj?.offerProperties, showSections: [...finalObj?.offerProperties?.showSections]?.filter($ => $ !== "description") } })
                                                } else {
                                                    updatePresent({ ...finalObj, offerProperties: { ...finalObj?.offerProperties, showSections: [...finalObj?.offerProperties?.showSections, "description"] } })

                                                }
                                            }} checked={finalObj?.offerProperties?.showSections?.includes("description")} id='visible-offer-description' type="checkbox" className="form-check-input" />
                                            <label htmlFor="visible-offer-description" className="form-check-label">Description</label>
                                        </div>
                                    </div>
                                </div>
                            </AccordionBody>
                        </AccordionItem>
                    </UncontrolledAccordion>
                </>
            )
            styles = (
                <>
                    <UncontrolledAccordion defaultOpen={['1', '2', '3']} stayOpen>
                        <AccordionItem>
                            <AccordionHeader className='acc-header' targetId='1' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                                <p className='m-0 fw-bolder text-black text-uppercase' style={{ padding: "0.5rem 0px", fontSize: "0.75rem" }}>Display</p>
                            </AccordionHeader>
                            <AccordionBody accordionId='1'>
                                <div className='p-0 mx-0 my-1'>
                                    <div className='mb-2'>
                                        {getMDToggle({ label: `Width: ${values?.width}:`, value: `width` })}
                                        <div className="d-flex p-0 justify-content-between align-items-center gap-2">
                                            <input value={parseFloat(values?.width)} type='range' className='w-100' onChange={e => {
                                                setValues({ ...values, width: `${e.target.value}px` })
                                            }} name="height" min="300" max="600" />
                                        </div>
                                    </div>
                                    <div className='mb-2'>
                                        {getMDToggle({ label: `Max Height: ${values?.maxHeight}`, value: `maxHeight` })}
                                        {/* <p className='fw-bolder text-black mb-1' style={{ fontSize: "0.75rem" }}>Max Height: {values?.maxHeight}</p> */}
                                        <div className="d-flex p-0 justify-content-between align-items-center gap-2">
                                            <input value={parseFloat(values?.maxHeight)} type='range' className='w-100' onChange={e => {
                                                setValues({ ...values, maxHeight: `${e.target.value}px` })
                                            }} name="height" min="0" max="600" />
                                        </div>
                                    </div>
                                </div>
                            </AccordionBody>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionHeader className='acc-header' targetId='2' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                                <p className='m-0 fw-bolder text-black text-uppercase' style={{ padding: "0.5rem 0px", fontSize: "0.75rem" }}>Colors</p>
                            </AccordionHeader>
                            <AccordionBody accordionId='2'>
                                <div className='p-0 mx-0 my-1'>
                                    <div className='p-0 mb-1 justify-content-start align-items-center'>
                                        {getMDToggle({ label: `Background`, value: `bgType` })}
                                        <div style={{ backgroundImage: `url(${pixels})` }}>
                                            <div className="border p-1 rounded" style={{ backgroundColor: values?.backgroundColor, backgroundImage: values?.backgroundImage }} onClick={() => setBgModal0(!bgModal0)}></div>
                                        </div>
                                    </div>
                                    {Object.entries(finalObj?.offerProperties?.colors)?.map(([key, value], index) => {
                                        return (
                                            <div key={index} className='p-0 mb-1 justify-content-start align-items-center'>
                                                <span className='fw-bolder text-black text-capitalize' style={{ fontSize: "0.75rem" }}>{key.split("_")[0]} {key.split("_")[1]}:</span>
                                                <div style={{ backgroundImage: `url(${pixels})` }}>
                                                    <div className="border p-1 rounded" style={{ backgroundColor: value }} onClick={() => {
                                                        setCurrOfferColor(key)
                                                        setBgModal4(!bgModal4)
                                                    }}></div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </AccordionBody>
                        </AccordionItem>
                    </UncontrolledAccordion>
                </>
            )
            spacing = (
                <UncontrolledAccordion defaultOpen={["1"]}>
                    <AccordionItem>
                        <AccordionHeader className='acc-header' targetId='1' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                            <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Spacing</span>
                        </AccordionHeader>
                        <AccordionBody accordionId='1'>
                            <div className='p-0 mx-0 my-1'>
                                <InputChange
                                    getMDToggle={getMDToggle} allValues={values} setAllValues={setValues} type='padding' />
                            </div>
                        </AccordionBody>
                    </AccordionItem>
                </UncontrolledAccordion>
            )
        } else if (selectedType === "brand") {
            // styles = (
            //     <>This is Brand Style</>
            // )
            general = (
                <>
                    <UncontrolledAccordion defaultOpen={['1', '2', '3']} stayOpen>
                        <AccordionItem className='bg-white border-bottom'>
                            <AccordionHeader className='acc-header border-bottom' targetId='1'>
                                <p className='m-0 fw-bolder text-black text-uppercase' style={{ fontSize: "0.75rem" }}>Brand settings</p>
                            </AccordionHeader>
                            <AccordionBody accordionId='1'>
                                <div className='p-0 mx-0 my-2'>
                                    <div className="form-check form-check-success d-flex align-items-center gap-2 m-0 p-0">
                                        <label htmlFor="brandingCheck" className="form-check-label m-0">Show branding</label> <input id="brandingCheck" onChange={e => {
                                            if (isPro) {
                                                setShowBrand(e.target.checked)
                                            } else {
                                                toast.error("Upgrade to Pro to remove XIRCLS branding")
                                            }
                                        }} checked={showBrand} type="checkbox" className="m-0 p-0 form-check-input" />
                                    </div>
                                    {/* <Select isMulti closeMenuOnSelect={false} options={pagesSelection} /> */}
                                </div>
                            </AccordionBody>
                        </AccordionItem>
                    </UncontrolledAccordion>
                </>
            )
        } else if (selectedType === "tnc") {
            const arr = [...colWise]
            const positionIndex = colWise[indexes?.cur]?.elements?.findIndex($ => $?.positionType === indexes?.curElem)
            const alignOptions = [
                { value: 'auto auto auto 0px', label: 'Left' },
                { value: 'auto', label: 'Center' },
                { value: 'auto 0px auto auto', label: 'Right' }
            ]
            const tncOptions = [
                { value: "terms", label: "Terms and Conditions" },
                { value: "is_new_letter", label: "Newsletter" }
            ]
            general = (
                <div className="py-1 px-2">
                    <label>Select type</label>
                    <Select value={tncOptions.filter($ => $.value === arr[indexes?.cur]?.elements[positionIndex]?.element[indexes?.subElem]?.checkboxType)} onChange={e => {
                        arr[indexes?.cur].elements[positionIndex].element[indexes?.subElem].checkboxType = e.value
                        setcolWise([...arr])
                    }} options={tncOptions} />
                </div>
            )
            styles = (
                <>
                    <UncontrolledAccordion defaultOpen={['1', '2', '3']} stayOpen>
                        <AccordionItem>
                            <AccordionHeader className='acc-header' targetId='1' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                                <p className='m-0 fw-bolder text-black text-uppercase' style={{ padding: "0.5rem 0px", fontSize: "0.75rem" }}>Display</p>
                            </AccordionHeader>
                            <AccordionBody accordionId='1'>
                                <div className='p-0 mx-0 my-1'>
                                    <div className='mb-2'>
                                        {getMDToggle({ label: `Width: ${values?.width}`, value: `width` })}
                                        <div className="d-flex p-0 justify-content-between align-items-center gap-2">
                                            <input value={parseFloat(values?.width)} type='range' className='w-100' onChange={e => {
                                                setValues({ ...values, width: `${e.target.value}px` })
                                            }} name="height" min="50" max="600" />
                                        </div>
                                    </div>
                                </div>
                            </AccordionBody>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionHeader className='acc-header' targetId='2' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                                <p className='m-0 fw-bolder text-black text-uppercase' style={{ padding: "0.5rem 0px", fontSize: "0.75rem" }}>Background Fill</p>
                            </AccordionHeader>
                            <AccordionBody accordionId='2'>
                                <div className='p-0 mx-0 my-1'>
                                    <div className='p-0 mb-1 justify-content-start align-items-center'>
                                        {getMDToggle({ label: `Background`, value: ["bgType", "backgroundColor", "backgroundImage"] })}
                                        <div className="border rounded" style={{ backgroundImage: `url(${pixels})` }}>
                                            <div className="p-1" style={{ backgroundColor: values?.backgroundColor, backgroundImage: values?.backgroundImage, backgroundRepeat: values?.backgroundRepeat, backgroundSize: values?.backgroundSize }} onClick={() => setBgModal0(!bgModal0)}></div>
                                        </div>
                                    </div>
                                </div>
                            </AccordionBody>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionHeader className='acc-header' targetId='2' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                                {getMDToggle({ label: `Alignment: `, value: `margin` })}
                            </AccordionHeader>
                            <AccordionBody accordionId='2'>
                                <div className='p-0 mb-1 align-items-center'>
                                    <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Alignment:</span>
                                    <Select value={alignOptions?.filter(item => item?.value === colWise[indexes?.cur]?.elements[positionIndex]?.element[indexes?.subElem]?.style?.margin)} onChange={e => {
                                        arr[indexes?.cur].elements[positionIndex].element[indexes?.subElem].style.margin = e.value
                                        setcolWise([...arr])
                                    }} options={alignOptions} />
                                </div>
                            </AccordionBody>
                        </AccordionItem>
                    </UncontrolledAccordion>
                </>
            )

            spacing = (
                <UncontrolledAccordion defaultOpen={["1", "2"]}>
                    <AccordionItem>
                        <AccordionHeader className='acc-header' targetId='1' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                            <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Spacing</span>
                        </AccordionHeader>
                        <AccordionBody accordionId='1'>
                            <div className='p-0 mx-0 my-1'>
                                <InputChange
                                    getMDToggle={getMDToggle} allValues={values} setAllValues={setValues} type='padding' />
                            </div>
                        </AccordionBody>
                    </AccordionItem>
                </UncontrolledAccordion>
            )
        } else if (selectedType === "display_frequency") {
            return (
                <div className="py-1 px-2 mt-1">
                    <h4 className='mb-2'>Display Frequency</h4>
                    <div className="form-check mb-1">
                        <input checked={finalObj?.rules?.display_frequency === "no_limit"} onChange={updateRules} type="radio" name='display_frequency' id='no_limit' value={"no_limit"} className="form-check-input cursor-pointer" /><label className="cursor-pointer" style={{ fontSize: "13px" }} htmlFor="no_limit">Do not limit</label>
                    </div>
                    <div className="form-check mb-1">
                        <input checked={finalObj?.rules?.display_frequency === "only_once"} onChange={updateRules} type="radio" name='display_frequency' id='only_once' value={"only_once"} className="form-check-input cursor-pointer" /><label htmlFor="only_once" className="cursor-pointer" style={{ fontSize: "13px" }}>Only once</label>
                    </div>
                    <div className="form-check mb-1">
                        <input checked={finalObj?.rules?.display_frequency === "once_session"} onChange={updateRules} type="radio" name='display_frequency' id='once_session' value={"once_session"} className="form-check-input cursor-pointer" /><label htmlFor="once_session" className="cursor-pointer" style={{ fontSize: "13px" }}>Once per session</label>
                    </div>
                    <div className="form-check mb-1 d-none">
                        <input checked={finalObj?.rules?.display_frequency === "one_time_per"} onChange={updateRules} type="radio" name='display_frequency' id='one_time_per' value={"one_time_per"} className="form-check-input cursor-pointer" /><label htmlFor="one_time_per" className="cursor-pointer" style={{ fontSize: "13px" }}>One time per</label>
                    </div>
                    {finalObj?.rules?.display_frequency === "one_time_per" && (  //condition here
                        <div className="d-flex gap-1 mb-1">
                            <div >
                                <input value={finalObj?.rules?.display_frequency_value} onChange={updateRules} className='form-control' type="text" name="display_frequency_value" id="display_frequency_value" style={{ width: '100px' }} />
                            </div>
                            <div>
                                <Select value={timeSelectOptions.filter($ => $?.value === finalObj?.rules?.display_frequency_time)} onChange={(e) => {
                                    updateRules({ target: { name: "display_frequency_time", value: e?.value } })
                                }} options={timeSelectOptions} />
                            </div>
                        </div>
                    )}
                </div>
            )
        } else if (selectedType === "display_when") {
            return (
                <div className='py-1 px-2 mt-1'>
                    <h4 className='mb-2'>When to display</h4>
                    <div className="form-check mb-2">
                        <input checked={finalObj?.rules?.display_when === "immediately"} onChange={updateRules} type="radio" name='display_when' id='immediately' value={"immediately"} className="form-check-input cursor-pointer" /><label className="cursor-pointer" style={{ fontSize: "13px" }} htmlFor="immediately">Immediately</label>
                    </div>
                    <div className="form-check mb-2 d-none">
                        <input checked={finalObj?.rules?.display_when === "all_condition_met"} onChange={updateRules} type="radio" name='display_when' id='all_condition_met' value={"all_condition_met"} className="form-check-input cursor-pointer" /><label htmlFor="all_condition_met" className="cursor-pointer" style={{ fontSize: "13px" }}>When All Conditions are met</label>
                    </div>
                    <div className="form-check mb-2">
                        <input checked={finalObj?.rules?.display_when === "button_click"} onChange={updateRules} type="radio" name='display_when' id='button_click' value={"button_click"} className="form-check-input cursor-pointer" /><label htmlFor="button_click" className="cursor-pointer" style={{ fontSize: "13px" }}>On Button Click</label>
                    </div>
                    <div className="form-check mb-2">
                        <input checked={finalObj?.rules?.display_when === "any_condition_met"} onChange={updateRules} type="radio" name='display_when' id='any_condition_met' value={"any_condition_met"} className="form-check-input cursor-pointer" /><label htmlFor="any_condition_met" className="cursor-pointer" style={{ fontSize: "13px" }}>When any Condition is met</label>
                    </div>

                    {
                        finalObj?.rules?.display_when === "any_condition_met" ? <>
                            <div className="form-check form-switch mb-1">
                                <input onChange={updateRules} checked={finalObj?.rules?.spent_on_page} type="checkbox" role='switch' id='spent_on_page' name={"spent_on_page"} className="form-check-input cursor-pointer" /><label htmlFor="spent_on_page" className="cursor-pointer" style={{ fontSize: "13px" }}>Spend on the Page</label>
                            </div>
                            {finalObj?.rules?.spent_on_page && (  //condition here
                                <div className="d-flex gap-1 mb-2">
                                    <div>
                                        <input value={finalObj?.rules?.spent_on_page_value} onChange={(e) => {
                                            if (!isNaN(parseFloat(e.target.value)) && Number(e.target.value) >= 0) {
                                                updateRules(e)
                                            }
                                        }} className='form-control' type="number" name="spent_on_page_value" id="spent_on_page_value" style={{ width: '100px' }} />
                                    </div>
                                    <div>
                                        <Select value={timeSelectOptions.filter($ => $?.value === finalObj?.rules?.spent_on_page_time)} onChange={(e) => {
                                            updateRules({ target: { name: "spent_on_page_time", value: e?.value } })
                                        }} options={timeSelectOptions} />
                                    </div>
                                </div>
                            )}
                            <div className="form-check form-switch mb-1">
                                <input checked={finalObj?.rules?.spent_on_website} onChange={updateRules} type="checkbox" role='switch' id='spent_on_website' name={"spent_on_website"} className="form-check-input cursor-pointer" />
                                <label htmlFor="spent_on_website" className="cursor-pointer" style={{ fontSize: "13px" }}>Spend on the Website</label>
                            </div>
                            {finalObj?.rules?.spent_on_website && (  //condition here  
                                <div className="d-flex gap-1 mb-2">
                                    <div>
                                        <input value={finalObj?.rules?.spent_on_website_value} onChange={(e) => {
                                            if (!isNaN(parseFloat(e.target.value)) && Number(e.target.value) >= 0) {
                                                updateRules(e)
                                            }
                                        }} className='form-control' type="number" name="spent_on_website_value" id="spent_on_website_value" style={{ width: '100px' }} />
                                    </div>
                                    <div>
                                        <Select value={timeSelectOptions.filter($ => $?.value === finalObj?.rules?.spent_on_website_time)} onChange={(e) => {
                                            updateRules({ target: { name: "spent_on_website_time", value: e?.value } })
                                        }} options={timeSelectOptions} />
                                    </div>
                                </div>
                            )}
                            <div className="form-check form-switch mb-1">
                                <input checked={finalObj?.rules?.read_page_by} onChange={updateRules} type="checkbox" role='switch' id='read_page_by' name={"read_page_by"} className="form-check-input cursor-pointer" />
                                <label htmlFor="read_page_by" className="cursor-pointer" style={{ fontSize: "13px" }}>Read the page by</label>
                            </div>
                            {finalObj?.rules?.read_page_by && (  //condition here
                                <div className="d-flex gap-1 mb-2 justify-content-start align-items-center">
                                    <input value={finalObj?.rules?.read_page_by_value} onChange={(e) => {
                                        if (!isNaN(parseFloat(e.target.value)) && Number(e.target.value) >= 0 && Number(e.target.value) <= 100) {
                                            updateRules(e)
                                        }
                                    }} className='form-control' type="number" name="read_page_by_value" id="read_page_by_value" style={{ width: '100px' }} />%
                                </div>
                            )}
                            <div className="form-check form-switch mb-1">
                                <input checked={finalObj?.rules?.visited} onChange={updateRules} type="checkbox" role='switch' id='visited' name={"visited"} className="form-check-input cursor-pointer" />
                                <label htmlFor="visited" className="cursor-pointer" style={{ fontSize: "13px" }}>Visited</label>
                            </div>
                            {finalObj?.rules?.visited && (  //condition here
                                <div className="d-flex gap-1 mb-2 justify-content-start align-items-center">
                                    <input value={finalObj?.rules?.visted_value} onChange={updateRules} className='form-control' type="text" name="visted_value" id="visted_value" style={{ width: '100px' }} /> Pages
                                </div>
                            )}
                            <div className="form-check form-switch mb-1">
                                <input checked={finalObj?.rules?.not_active_page} onChange={updateRules} type="checkbox" role='switch' id='not_active_page' name={"not_active_page"} className="form-check-input cursor-pointer" />
                                <label htmlFor="not_active_page" className="cursor-pointer" style={{ fontSize: "13px" }}>Not active on the page</label>
                            </div>
                            {finalObj?.rules?.not_active_page && (  //condition here
                                <div className="d-flex gap-1 mb-2">
                                    <div>
                                        <input value={finalObj?.rules?.not_active_page_value} onChange={(e) => {
                                            if (!isNaN(parseFloat(e.target.value)) && Number(e.target.value) >= 0) {
                                                updateRules(e)
                                            }
                                        }} className='form-control' type="number" name="not_active_page_value" id="not_active_page_value" style={{ width: '100px' }} />
                                    </div>
                                    <div>
                                        <Select value={timeSelectOptions.filter($ => $?.value === finalObj?.rules?.not_active_page_time)} onChange={(e) => {
                                            updateRules({ target: { name: "not_active_page_time", value: e?.value } })
                                        }} options={timeSelectOptions} />
                                    </div>
                                </div>
                            )}
                            <div className="form-check form-switch mb-2 d-none">
                                <input checked={finalObj?.rules?.exit_intent} onChange={updateRules} type="checkbox" role='switch' id='exit_intent' name={"exit_intent"} className="form-check-input cursor-pointer" />
                                <label htmlFor="exit_intent" className="cursor-pointer" style={{ fontSize: "13px" }}>Exit intent</label>
                            </div>
                        </> : ''
                    }
                </div>
            )
        } else if (selectedType === "stop_display_when") {
            return (
                <div className='py-1 px-2 mt-1'>
                    <h4 className='mb-2'>When to Stop displaying</h4>

                    <div className="form-check form-switch mb-1">
                        <input checked={finalObj?.rules?.stop_display_pages} onChange={updateRules} type="checkbox" role='switch' id='stop_display_pages' name={"stop_display_pages"} className="form-check-input cursor-pointer" /><label htmlFor="stop_display_pages" className="cursor-pointer" style={{ fontSize: "13px" }}>After visiting {finalObj?.rules?.stop_display_pages_value} page(s)</label>
                    </div>
                    {finalObj?.rules?.stop_display_pages && (  //condition here
                        <div className="d-flex gap-1 mb-1">
                            <input value={finalObj?.rules?.stop_display_pages_value} onChange={(e) => {
                                if (!isNaN(parseFloat(e.target.value)) && Number(e.target.value) >= 0) {
                                    updateRules(e)
                                }
                            }} className='form-control' type="number" name="stop_display_pages_value" id="stop_display_pages_value" style={{ width: '100px' }} />
                        </div>
                    )}
                    <div className="form-check form-switch mb-1">
                        <input checked={finalObj?.rules?.stop_display_after_closing} onChange={updateRules} type="checkbox" role='switch' id='stop_display_after_closing' name={"stop_display_after_closing"} className="form-check-input cursor-pointer" /><label htmlFor="stop_display_after_closing" className="cursor-pointer" style={{ fontSize: "13px" }}>After closing {finalObj?.rules?.stop_display_after_closing_value} time(s)</label>
                    </div>
                    {finalObj?.rules?.stop_display_after_closing && (  //condition here
                        <div className="d-flex gap-1 justify-content-start align-items-center mb-1">
                            <input value={finalObj?.rules?.stop_display_after_closing_value} onChange={(e) => {
                                if (!isNaN(parseFloat(e.target.value)) && Number(e.target.value) >= 0) {
                                    updateRules(e)
                                }
                            }} className='form-control' type="number" name="stop_display_after_closing_value" id="stop_display_after_closing_value" style={{ width: '100px' }} />
                        </div>
                    )}

                </div>
            )
        } else if (selectedType === "on_pages") {
            return (
                <div className='py-1 px-2 mt-1'>
                    <h4 className='mb-2'>Visible on</h4>
                    <div className="row">
                        {pagesSelection?.map((ele, key) => {
                            return (
                                <div key={key} className="col-md-4 d-flex gap-2 align-items-start">
                                    <input
                                        checked={finalObj?.behaviour?.PAGES?.includes(ele?.value)}
                                        className="d-none" value={ele?.value} onChange={addPage} type='checkbox' id={`page-${key}`} />
                                    <label style={{ cursor: 'pointer' }} htmlFor={`page-${key}`} className="mb-2 text-capitalize d-flex flex-column align-items-center w-100 position-relative">
                                        <div className="position-relative w-50 d-flex justify-content-center align-items-center">
                                            <div className="position-absolute w-100" style={{ inset: "0px", outline: finalObj?.behaviour?.PAGES?.includes(ele.value) ? `1.5px solid rgba(0,0,0,1)` : `0px solid rgba(0,0,0,0)`, aspectRatio: "1", scale: finalObj?.behaviour?.PAGES?.includes(ele.value) ? "1.15" : "1.25", zIndex: "99999999", backgroundColor: `rgba(255,255,255,${finalObj?.behaviour?.PAGES?.includes(ele.value) ? "0" : "0.5"})`, transition: "0.3s ease-in-out" }}></div>
                                            <img width="100%" style={{ transition: '0.25s ease' }}
                                                className={`mb-2`} src={`${xircls_url}/plugin_other_images/icons/${ele.value === "custom_page" || ele.value === "custom_source" ? "all_pages" : ele.value}.png`}
                                                alt='no img' />
                                        </div>
                                        <span className={`${finalObj?.behaviour?.PAGES?.includes(ele.value) ? "text-black" : ""} fw-bolder`} style={{ fontSize: '75%', textAlign: "center" }}>{ele?.label}</span>
                                    </label>
                                </div>
                            )
                        })}
                    </div>

                    {finalObj?.behaviour?.PAGES?.includes("custom_page") && <div className="row mt-2">
                        <label htmlFor="" className='mb-1' style={{ fontSize: "12px" }}>Custom URLs:</label>
                        {finalObj?.behaviour?.CUSTOM_PAGE_LINK?.map((ele, key) => {
                            return (
                                <div className="col-12" key={key}>
                                    <div className="p-0 position-relative d-flex align-items-center mb-1">
                                        <input style={{ fontSize: "12px" }} onChange={e => {
                                            const newObj = { ...finalObj }
                                            newObj.behaviour.CUSTOM_PAGE_LINK[key] = e.target.value
                                            updatePresent(newObj)
                                        }} value={ele} className='form-control' type="text" placeholder={`www.url-example${key + 1}.com`} />{finalObj.behaviour.CUSTOM_PAGE_LINK.length > 1 && <span onClick={() => {
                                            const newObj = { ...finalObj }
                                            newObj?.behaviour?.CUSTOM_PAGE_LINK?.splice(key, 1)
                                            updatePresent(newObj)
                                        }} className="d-flex justify-content-center alignn-items-center position-absolute end-0 p-1 cursor-pointer"><Trash stroke='red' size={12.5} /></span>}
                                    </div>
                                </div>
                            )
                        })}
                        {finalObj.behaviour.CUSTOM_PAGE_LINK.length < 6 && <div className="col-12">
                            <button onClick={() => {
                                const newObj = { ...finalObj }
                                newObj.behaviour.CUSTOM_PAGE_LINK = [...finalObj.behaviour.CUSTOM_PAGE_LINK, ""]
                                updatePresent(newObj)
                            }} style={{ padding: "5px" }} className="btn btn-dark w-100"><PlusCircle color='white' size={17.5} /></button>
                        </div>}
                    </div>}

                    {finalObj?.behaviour?.PAGES?.includes("custom_source") && (
                        <div className="row mt-2">
                            <label htmlFor="" className='mb-1' style={{ fontSize: "12px" }}>Source:</label>
                            <Select
                                isMulti={true}
                                options={sourceList}
                                inputId="aria-example-input"
                                closeMenuOnSelect={false}
                                name="source"
                                placeholder="Add Source"
                                value={sourceList?.filter(option => finalObj?.behaviour?.SOURCE_PAGE_LINK?.includes(option.value))}
                                onChange={(options) => {
                                    const option_list = options.map((cur) => {
                                        return cur.value
                                    })
                                    updatePresent({ ...finalObj, behaviour: { ...finalObj?.behaviour, SOURCE_PAGE_LINK: option_list } })

                                    // const newObj = { ...finalObj }
                                    // newObj.behaviour.SOURCE_PAGE_LINK = [...finalObj.behaviour.CUSTOM_PAGE_LINK, ""]
                                    // updatePresent(newObj)
                                }}
                            />
                        </div>
                    )
                    }
                </div>
            )
        } else {
            function getSideText(subElem) {
                if (!subElem?.type && subElem?.type === "") {
                    return "No Element Here"
                } else if (subElem.type === "text") {
                    const newElem = document.createElement("div")
                    newElem.innerHTML = subElem?.textValue
                    const elemText = newElem.innerText
                    return elemText.length > 12 ? `${elemText.slice(0, 12)}...` : elemText
                } else {
                    return subElem.type
                }
            }
            return (
                <div>
                    <div className='d-flex flex-column h-100'>
                        <h5 className={`px-2 py-1 m-0 text-capitalize`}>{currPage === "button" ? "Button" : finalObj?.[`${mobileCondition}pages`][finalObj[`${mobileCondition}pages`]?.findIndex($ => $?.id === currPage)]?.pageName}</h5>
                        <div className='d-flex justify-content-start align-items-center w-100 mt-0 cursor-pointer' onClick={() => setCurrPosition({ ...currPosition, selectedType: "close" })}>
                            <button
                                type="button"
                                className="btn btn-link m-0 p-0 ps-1"
                            >
                                <XCircle color="#727272" size={15} />
                            </button>
                            <p className='m-0 fw-bold text-black text-capitalize' style={{ padding: "0.25rem 0.5rem 0px", fontSize: "0.85rem" }}>Close button</p>
                        </div>
                    </div>
                    {colWise?.map((cur, key) => (
                        <div key={key}
                            className='h-100'>
                            <div className={`mt-1 fw-bolder text-black w-100 cursor-pointer d-flex align-items-center justify-content-between rounded ${isEqual({ cur: key, curElem: "parent", subElem: "grandparent" }, { ...indexes }) ? "bg-light-secondary" : ""}`} style={{ padding: "0px 1rem" }}>
                                <div className="d-flex align-items-center"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        // setActiveRow(key)
                                        makActive(e, cur, "parent", "parent", key, "parent", "parent")
                                        setCurrPosition({ ...currPosition, selectedType: "block" })
                                        setIndexes({ cur: key, curElem: "parent", subElem: "grandparent" })
                                        setValues(cur?.style)
                                        setMouseEnterIndex({ cur: false, curElem: false, subElem: false })
                                    }}
                                    onMouseOver={(e) => {
                                        e.stopPropagation()
                                        setMouseEnterIndex({ cur: key, curElem: "parent", subElem: "grandparent" })
                                    }}
                                    onMouseLeave={(e) => {
                                        e.stopPropagation()
                                        setMouseEnterIndex({ cur: false, curElem: false, subElem: false })
                                    }}
                                    style={{ gap: "0.5rem" }}>
                                    <Columns size={15} />
                                    <p className='m-0 fw-bold text-capitalize text-black' style={{ fontSize: "0.85rem" }}>
                                        Block with {cur?.elements?.length} column{cur?.elements?.length > 1 ? 's' : ''}
                                    </p>
                                </div>
                                <UncontrolledDropdown className='more-options-dropdown'>
                                    <DropdownToggle className={`btn-icon cursor-pointer`} color='transparent' size='sm'>
                                        <span className={`${isEqual({ cur: key, curElem: "parent", subElem: "grandparent" }, { ...indexes }) ? "text-black" : ""}`}>
                                            <MoreVertical size='18' />
                                        </span>
                                    </DropdownToggle>
                                    <DropdownMenu end>
                                        <DropdownItem
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                if (colWise.length <= 1) {
                                                    setIndexes({ cur: 0, curElem: "left", subElem: "grandparent" })
                                                } else {
                                                    setIndexes({ cur: key - 1, curElem: "left", subElem: "grandparent" })
                                                }
                                                const arr = currPage === "button" ? [...finalObj?.[`button`]] : [...finalObj?.[`pages`][finalObj?.[`pages`]?.findIndex($ => $.id === currPage)].values]
                                                const arrRev = currPage === "button" ? [...finalObj?.[`mobile_button`]] : [...finalObj?.[`mobile_pages`][finalObj?.[`mobile_pages`]?.findIndex($ => $.id === currPage)].values]
                                                arr.splice(key, 1)
                                                arrRev.splice(key, 1)
                                                // setcolWise([...arr])
                                                const newObj = { ...finalObj }
                                                if (currPage === "button") {
                                                    newObj.button = arr
                                                    newObj.mobile_button = arrRev
                                                } else {
                                                    const pageIndex = newObj?.pages?.findIndex($ => $?.id === currPage)
                                                    const mobile_pageIndex = newObj?.mobile_pages?.findIndex($ => $?.id === currPage)
                                                    newObj.pages[pageIndex].values = arr
                                                    newObj.mobile_pages[mobile_pageIndex].values = arrRev
                                                }
                                                updatePresent({ ...newObj })
                                                setMouseEnterIndex({ cur: false, curElem: false, subElem: false })
                                            }} className='w-100'>
                                            <div className="d-flex align-items-center" style={{ gap: "0.5rem" }}>
                                                <Trash stroke='red' size={"15px"} className='cursor-pointer' /> <span className='fw-bold text-black' style={{ fontSize: "0.75rem" }}>Delete</span>
                                            </div>
                                        </DropdownItem>
                                        {/* <DropdownItem
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setCurrPosition({ ...currPosition, selectedType: "block" })
                                                setIndexes({ cur: key + 1, curElem: "left", subElem: "grandparent" })
                                                const arr = [...colWise]
                                                arr.splice(key, 0, cur)
                                                setcolWise([...arr])
                                                setMouseEnterIndex({ cur: false, curElem: false, subElem: false })
                                            }} className='w-100'>
                                            <div className="d-flex align-items-center" style={{ gap: "0.5rem" }}>
                                                <Copy stroke='#727272' size={"15px"} className='cursor-pointer' /> <span className='fw-bold text-black' style={{ fontSize: "0.75rem" }}>Duplicate</span>
                                            </div>
                                        </DropdownItem> */}
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </div>
                            {cur?.elements?.map((curElem, i, curElemArr) => (
                                <div key={i}
                                    className='h-100 ms-2 position-relative tree-border'>
                                    <div className="d-flex align-items-center pe-1">
                                        <div
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                // setActiveRow("none")
                                                makActive(e, cur, curElem, curElem.positionType, key, i, "parent")
                                                setCurrPosition({ ...currPosition, selectedType: "column" })
                                                setIndexes({ cur: key, curElem: curElem.positionType, subElem: "parent" })
                                                setValues(curElem.style)
                                                setMouseEnterIndex({ cur: false, curElem: false, subElem: false })
                                            }}
                                            onMouseOver={(e) => {
                                                e.stopPropagation()
                                                setMouseEnterIndex({ cur: key, curElem: curElem.positionType, subElem: "parent" })
                                            }}
                                            onMouseLeave={(e) => {
                                                e.stopPropagation()
                                                setMouseEnterIndex({ cur: false, curElem: false, subElem: false })
                                            }} className={`flex-grow-1 fw-bolder text-black ms-1 cursor-pointer d-flex align-items-center rounded ${isEqual({ cur: key, curElem: curElem.positionType, subElem: "parent" }, { ...indexes }) ? "bg-light-secondary" : ""}`} style={{ padding: "0.5rem", gap: "0.5rem" }}>
                                            <Columns color="#727272" size={15} />
                                            <p className='m-0 fw-bold text-capitalize w-100 text-black' style={{ fontSize: "0.85rem" }}>
                                                {`${cur?.elements?.length > 1 ? `${curElem?.positionType} ` : ""}`}column
                                            </p>
                                        </div>
                                        {curElemArr.length > 1 && <div>
                                            <UncontrolledDropdown className='more-options-dropdown'>
                                                <DropdownToggle className={`btn-icon cursor-pointer`} color='transparent' size='md'>
                                                    <span className={`${isEqual({ cur: key, curElem: curElem?.positionType, subElem: "grandparent" }, { ...indexes }) ? "text-black" : ""}`}>
                                                        <MoreVertical size='18' />
                                                    </span>
                                                </DropdownToggle>
                                                <DropdownMenu end>
                                                    {curElemArr.map(($, curElemIndex) => {
                                                        if (curElem?.positionType !== $?.positionType) {
                                                            return (
                                                                <DropdownItem onClick={e => replaceColumns(e, { mainCol: curElem?.positionType, repCol: $?.positionType, cur: key })} key={curElemIndex} className='w-100'>
                                                                    <div className="d-flex align-items-center" style={{ gap: "0.5rem" }}>
                                                                        <TbReplace size={"15px"} className='cursor-pointer' /> <span className='fw-bold text-black text-capitalize' style={{ fontSize: "0.75rem" }}>Replace with {$?.positionType} column</span>
                                                                    </div>
                                                                </DropdownItem>
                                                            )
                                                        }
                                                    })}
                                                    {/* <DropdownItem className='w-100'>
                                                        <div className="d-flex align-items-center" style={{ gap: "0.5rem" }}>
                                                            <Trash stroke='red' size={"15px"} className='cursor-pointer' /> <span className='fw-bold text-black text-capitalize' style={{ fontSize: "0.75rem" }}>Delete</span>
                                                        </div>
                                                    </DropdownItem> */}
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </div>}
                                    </div>
                                    {curElem.element.every($ => $?.type !== "") && <ul className='ms-2 mb-0 p-0' style={{ listStyle: 'none' }}>
                                        {curElem.element.map((subElem, j) => (
                                            <li className={`text-black cursor-pointer d-flex justify-content-between align-items-center rounded ${isEqual({ cur: key, curElem: curElem.positionType, subElem: j }, { ...indexes }) ? "bg-light-secondary" : ""}`} style={{ padding: "0px 1rem 0px 1.5rem", fontSize: "0.75rem" }} key={j}>
                                                <div
                                                    type="button"
                                                    className="text-start m-0 p-0 d-flex align-items-center"
                                                    style={{ gap: "0.5rem" }}
                                                    onClick={e => {
                                                        e.stopPropagation()
                                                        makActive(e, cur, curElem, curElem.positionType, key, i, j)
                                                        setCurrPosition({ ...currPosition, selectedType: subElem.type })
                                                        setIndexes({ cur: key, curElem: curElem.positionType, subElem: j })
                                                        setValues(subElem.style)
                                                        setMouseEnterIndex({ cur: false, curElem: false, subElem: false })
                                                    }}
                                                    onMouseOver={(e) => {
                                                        e.stopPropagation()
                                                        setMouseEnterIndex({ cur: key, curElem: curElem.positionType, subElem: j })
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.stopPropagation()
                                                        setMouseEnterIndex({ cur: false, curElem: false, subElem: false })
                                                    }}
                                                >
                                                    {(!subElem?.type || subElem?.type === "") && <span>No element</span>}
                                                    {subElem?.type === 'text' && <Type size={16} color='#727272' />}
                                                    {subElem?.type === 'button' && <Disc size={16} color='#727272' />}
                                                    {subElem?.type === 'input' && <img style={{ filter: "grayscale(100%)" }} src='https://cdn-app.optimonk.com/img/StructureInput.61ed2888.svg' alt='' />}
                                                    {subElem?.type === 'image' && (subElem.src === "" ? <Image width={16} color='#727272' /> : <div style={{ width: 16, aspectRatio: "1", backgroundImage: `url(${subElem.src})`, backgroundSize: "contain", backgroundPosition: "center center", backgroundRepeat: "no-repeat" }} />)}
                                                    {<span className={`${subElem.type !== "text" ? "text-capitalize" : ""}`} style={{ fontSize: "0.75rem" }}>{getSideText(subElem)}</span>}
                                                </div>
                                                {subElem?.type && subElem?.type !== "" && <UncontrolledDropdown onClick={e => e.stopPropagation()} className='more-options-dropdown'>
                                                    <DropdownToggle className='btn-icon cursor-pointer' color='transparent' size='sm'>
                                                        <span className={`${isEqual({ cur: key, curElem: curElem.positionType, subElem: j }, { ...indexes }) ? "text-black" : ""}`}>
                                                            <MoreVertical size='18' />
                                                        </span>
                                                    </DropdownToggle>
                                                    <DropdownMenu end>
                                                        <DropdownItem
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                if (colWise.length <= 1) {
                                                                    setCurrPosition({ ...currPosition, selectedType: "main" })
                                                                    setIndexes({ cur: 0, curElem: "left", subElem: "grandparent" })
                                                                } else {
                                                                    setCurrPosition({ ...currPosition, selectedType: "block" })
                                                                    setIndexes({ cur: key - 1, curElem: "left", subElem: "grandparent" })
                                                                }
                                                                const arr = currPage === "button" ? [...finalObj?.[`button`]] : [...finalObj?.[`pages`][finalObj?.[`pages`]?.findIndex($ => $.id === currPage)].values]
                                                                const arrRev = currPage === "button" ? [...finalObj?.[`mobile_button`]] : [...finalObj?.[`mobile_pages`][finalObj?.[`mobile_pages`]?.findIndex($ => $.id === currPage)].values]
                                                                if (curElem?.element?.length <= 1 && cur?.elements?.length <= 1) {
                                                                    arr.splice(key, 1)
                                                                    arrRev.splice(key, 1)
                                                                } else if (curElem?.element?.length <= 1 && cur?.elements?.length >= 1) {
                                                                    arr[key].elements[arr[key].elements.findIndex($ => $?.positionType === curElem.positionType)].element.splice(j, 1, { ...commonObj })
                                                                    arrRev[key].elements[arrRev[key].elements.findIndex($ => $?.positionType === curElem.positionType)].element.splice(j, 1, { ...commonObj })
                                                                } else {
                                                                    arr[key].elements[arr[key].elements.findIndex($ => $?.positionType === curElem.positionType)].element.splice(j, 1)
                                                                    arrRev[key].elements[arrRev[key].elements.findIndex($ => $?.positionType === curElem.positionType)].element.splice(j, 1)
                                                                }
                                                                const newObj = { ...finalObj }
                                                                if (currPage === "button") {
                                                                    newObj[`${mobileCondition}button`] = arr
                                                                    newObj[`${mobileConditionRev}button`] = arrRev
                                                                } else {
                                                                    const pageIndex = newObj?.[`${mobileCondition}pages`]?.findIndex($ => $?.id === currPage)
                                                                    const mobile_pageIndex = newObj?.[`${mobileConditionRev}pages`]?.findIndex($ => $?.id === currPage)
                                                                    newObj[`${mobileCondition}pages`][pageIndex].values = arr
                                                                    newObj[`${mobileConditionRev}pages`][mobile_pageIndex].values = arrRev
                                                                }
                                                                updatePresent({ ...newObj })
                                                                // setcolWise([...arr])
                                                            }} className='w-100'>
                                                            <div className="d-flex align-items-center" style={{ gap: "0.5rem" }}>
                                                                <Trash stroke='red' size={"15px"} className='cursor-pointer' /> <span className='fw-bold text-black' style={{ fontSize: "0.75rem" }}>Delete</span>
                                                            </div>
                                                        </DropdownItem>
                                                        {/* <DropdownItem
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                setCurrPosition({ ...currPosition, selectedType: "block" })
                                                                setIndexes({ cur: key, curElem: curElem.positionType, subElem: j + 1 })
                                                                const arr = [...colWise]
                                                                arr[key].elements[arr[key].elements.findIndex($ => $?.positionType === curElem.positionType)].element.splice(j, 0, subElem)
                                                                setValues(subElem?.style)
                                                                setcolWise([...arr])
                                                            }} className='w-100'>
                                                            <div className="d-flex align-items-center" style={{ gap: "0.5rem" }}>
                                                                <Copy stroke='#727272' size={"15px"} className='cursor-pointer' /> <span className='fw-bold text-black' style={{ fontSize: "0.75rem" }}>Duplicate</span>
                                                            </div>
                                                        </DropdownItem> */}
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>}
                                            </li>
                                        ))}
                                    </ul>}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )
        }
        return <ModificationSection key={`${currPage}-${currPosition.selectedType}-${indexes.cur}-${indexes.curElem}-${indexes.subElem}`} currPosition={currPosition} setCurrPosition={setCurrPosition} styles={styles} general={general} spacing={spacing} />
    }

    const handleColDrop = (e, cur, curElem) => {
        e.stopPropagation()
        const transferedData = e.dataTransfer.getData("type")
        const dupArray = currPage === "button" ? finalObj.button : finalObj?.pages[finalObj?.pages?.findIndex($ => $?.id === currPage)]?.values
        const mobile_dupArray = currPage === "button" ? finalObj?.mobile_button : finalObj?.mobile_pages[finalObj?.pages?.findIndex($ => $?.id === currPage)]?.values
        const inputTypeCondition = draggedInputType === "none" ? commonObj?.inputType : draggedInputType
        const dragOverData = document.getElementById(`${currPage}-${cur}-${curElem}-parent`)?.getBoundingClientRect()
        const y = dragOverData?.y
        const height = dragOverData?.height

        console.log("newObj ColDrop", transferedData)
        if ((transferedData !== "" && !transferedData.includes("col"))) {
            const arrCheck = dupArray[cur]?.elements[dupArray[cur]?.elements?.findIndex($ => $?.positionType === curElem)]?.element
            if (arrCheck.length <= 1 && (!arrCheck[0]?.type || arrCheck[0]?.type === "")) {
                console.log({ arrCheck: "1" })
                dupArray[cur].elements[dupArray[cur].elements.findIndex($ => $?.positionType === curElem)].element = [{ ...commonObj, type: transferedData, inputType: inputTypeCondition, placeholder: inputTypeList[inputTypeList?.findIndex($ => $.value === inputTypeCondition)]?.label, labelText: inputTypeList[inputTypeList?.findIndex($ => $.value === inputTypeCondition)]?.label, style: elementStyles[transferedData] }]
                mobile_dupArray[cur].elements[mobile_dupArray[cur].elements.findIndex($ => $?.positionType === curElem)].element = [{ ...commonObj, type: transferedData, inputType: inputTypeCondition, placeholder: inputTypeList[inputTypeList?.findIndex($ => $.value === inputTypeCondition)]?.label, labelText: inputTypeList[inputTypeList?.findIndex($ => $.value === inputTypeCondition)]?.label, style: elementStyles[transferedData] }]
            } else if ((mousePos.y - (y + (height / 2)) > 0)) {
                console.log({ arrCheck: "2" })
                dupArray[cur]?.elements[dupArray[cur]?.elements?.findIndex($ => $?.positionType === curElem)]?.element?.push({ ...commonObj, type: transferedData, inputType: inputTypeCondition, placeholder: inputTypeList[inputTypeList?.findIndex($ => $.value === inputTypeCondition)]?.label, labelText: inputTypeList[inputTypeList?.findIndex($ => $.value === inputTypeCondition)]?.label, style: elementStyles[transferedData] })
                mobile_dupArray[cur]?.elements[mobile_dupArray[cur]?.elements?.findIndex($ => $?.positionType === curElem)]?.element?.push({ ...commonObj, type: transferedData, inputType: inputTypeCondition, placeholder: inputTypeList[inputTypeList?.findIndex($ => $.value === inputTypeCondition)]?.label, labelText: inputTypeList[inputTypeList?.findIndex($ => $.value === inputTypeCondition)]?.label, style: elementStyles[transferedData] })
            } else {
                console.log({ arrCheck: "3" })
                dupArray[cur].elements[dupArray[cur].elements?.findIndex($ => $?.positionType === curElem)].element = [{ ...commonObj, type: transferedData, inputType: inputTypeCondition, placeholder: inputTypeList[inputTypeList?.findIndex($ => $.value === inputTypeCondition)]?.label, labelText: inputTypeList[inputTypeList?.findIndex($ => $.value === inputTypeCondition)]?.label, style: elementStyles[transferedData] }, ...dupArray[cur]?.elements[dupArray[cur]?.elements?.findIndex($ => $?.positionType === curElem)]?.element]
                mobile_dupArray[cur].elements[mobile_dupArray[cur].elements?.findIndex($ => $?.positionType === curElem)].element = [{ ...commonObj, type: transferedData, inputType: inputTypeCondition, placeholder: inputTypeList[inputTypeList?.findIndex($ => $.value === inputTypeCondition)]?.label, labelText: inputTypeList[inputTypeList?.findIndex($ => $.value === inputTypeCondition)]?.label, style: elementStyles[transferedData] }, ...dupArray[cur]?.elements[dupArray[cur]?.elements?.findIndex($ => $?.positionType === curElem)]?.element]
            }
            setIndexes({ cur, curElem, subElem: dupArray[cur]?.elements[dupArray[cur]?.elements?.findIndex($ => $?.positionType === curElem)]?.element?.length - 1 })

            if (transferedData?.includes("image")) {
                setDropImage(true)
            }

            const newObj = { ...finalObj }
            if (currPage === "button") {
                newObj.button = dupArray
                newObj.mobile_button = mobile_dupArray
            } else {
                newObj.pages[newObj.pages.findIndex($ => $?.id === currPage)].values = dupArray
                newObj.mobile_pages[newObj.mobile_pages.findIndex($ => $?.id === currPage)].values = mobile_dupArray
            }
            updatePresent({ ...newObj })
        }
        if (transferedData.includes("col")) {
            handleLayoutDrop(e, cur)
        }

        console.log({ cur, curElem, dupArray, mobile_dupArray, inputTypeCondition, y, height })
    }

    const handleElementDrop = (e, cur, curElem, subElem) => {
        e.stopPropagation()
        setIsColDragging(false)
        setGotDragOver({ cur: false, curElem: false, subElem: false })
        const transferedData = e.dataTransfer.getData("type")
        const inputTypeCondition = draggedInputType === "none" ? commonObj?.inputType : draggedInputType
        const dragOverData = document.getElementById(`${currPage}-${dragOverIndex.cur}-${dragOverIndex.curElem}-${dragOverIndex.subElem}`)?.getBoundingClientRect()
        const y = dragOverData?.y
        const height = dragOverData?.height
        console.log("newObj ElementDrop", { transferedData })
        if ((transferedData !== "" && !transferedData.includes("col"))) {
            let dupArray
            let mobile_dupArray

            if (currPage === "button") {
                dupArray = finalObj.button
                mobile_dupArray = finalObj.mobile_button
            } else {
                dupArray = finalObj.pages[finalObj.pages.findIndex($ => $?.id === currPage)].values
                mobile_dupArray = finalObj.mobile_pages[finalObj.pages.findIndex($ => $?.id === currPage)].values
            }

            if (mousePos.y - (y + (height / 2)) < 0) {
                dupArray[dragOverIndex?.cur]?.elements[dupArray[dragOverIndex.cur]?.elements?.findIndex($ => $?.positionType === dragOverIndex?.curElem)]?.element?.splice(dragOverIndex?.subElem, 0, { ...commonObj, type: transferedData, inputType: inputTypeCondition, placeholder: inputTypeList[inputTypeList?.findIndex($ => $.value === inputTypeCondition)]?.label, labelText: inputTypeList[inputTypeList?.findIndex($ => $.value === inputTypeCondition)]?.label, style: elementStyles[transferedData] })

                mobile_dupArray[dragOverIndex?.cur]?.elements[mobile_dupArray[dragOverIndex.cur]?.elements?.findIndex($ => $?.positionType === dragOverIndex?.curElem)]?.element?.splice(dragOverIndex?.subElem, 0, { ...commonObj, type: transferedData, inputType: inputTypeCondition, placeholder: inputTypeList[inputTypeList?.findIndex($ => $.value === inputTypeCondition)]?.label, labelText: inputTypeList[inputTypeList?.findIndex($ => $.value === inputTypeCondition)]?.label, style: elementStyles[transferedData] })
                setIndexes({ ...dragOverIndex })
            } else {
                dupArray[dragOverIndex.cur]?.elements[dupArray[dragOverIndex.cur]?.elements?.findIndex($ => $?.positionType === dragOverIndex?.curElem)]?.element?.splice(dragOverIndex?.subElem + 1, 0, { ...commonObj, type: transferedData, inputType: inputTypeCondition, placeholder: inputTypeList[inputTypeList?.findIndex($ => $.value === inputTypeCondition)]?.label, labelText: inputTypeList[inputTypeList?.findIndex($ => $.value === inputTypeCondition)]?.label, style: elementStyles[transferedData] })

                mobile_dupArray[dragOverIndex.cur]?.elements[mobile_dupArray[dragOverIndex?.cur]?.elements?.findIndex($ => $?.positionType === dragOverIndex?.curElem)]?.element?.splice(dragOverIndex?.subElem + 1, 0, { ...commonObj, type: transferedData, inputType: inputTypeCondition, placeholder: inputTypeList[inputTypeList?.findIndex($ => $.value === inputTypeCondition)]?.label, labelText: inputTypeList[inputTypeList?.findIndex($ => $.value === inputTypeCondition)]?.label, style: elementStyles[transferedData] })
                setIndexes({ cur, curElem, subElem })
            }

            if (transferedData?.includes("image")) {
                setDropImage(true)
            }

            setValues({ ...elementStyles[transferedData] })
            // setcolWise(isMobile ? [...mobile_dupArray] : [...dupArray])
            const newObj = { ...finalObj }

            if (currPage === "button") {
                newObj.button = dupArray
                newObj.mobile_button = mobile_dupArray
            } else {
                newObj.pages[finalObj.pages.findIndex($ => $?.id === currPage)].values = dupArray
                newObj.mobile_pages[finalObj.pages.findIndex($ => $?.id === currPage)].values = mobile_dupArray
            }

            updatePresent({ ...newObj })
        }
        if (transferedData.includes("col")) {
            handleLayoutDrop(e, cur)
        }
    }

    const getOffers = () => {
        setGotOffers(false)

        fetch(`${SuperLeadzBaseURL}/utils/api/v1/superoffer/`, {
            method: "POST",
            body: JSON.stringify({
                shop: outletData[0]?.web_url,
                app: "superleadz"
            })
        })
            .then((resp) => resp.json())
            .then((data) => {
                setGotOffers(true)
                setAllOffers(data)
            })
            .catch((error) => {
                setGotOffers(true)
                console.log(error)
            })
    }

    const handleRearrangeElement = (e) => {
        const colWise = currPage === "button" ? [...finalObj?.[`${mobileCondition}button`]] : [...finalObj?.[`${mobileCondition}pages`][finalObj?.[`${mobileCondition}pages`]?.findIndex($ => $.id === currPage)].values]
        e.stopPropagation()
        const elementId = document.getElementById(`${currPage}-${dragOverIndex.cur}-${dragOverIndex.curElem}-${dragOverIndex.subElem}`)
        const isSameIndexes = `${currPage}-${dragOverIndex.cur}-${dragOverIndex.curElem}-${dragOverIndex.subElem}` === `${currPage}-${dragStartIndex.cur}-${dragStartIndex.curElem}-${dragStartIndex.subElem}`
        if (isSameIndexes || !transfered.includes("rearrange") || !elementId) {
            return
        }
        const dupArray = [...colWise]
        const mobile_dupArray = [...finalObj.mobile_pages[finalObj.mobile_pages.findIndex($ => $?.id === currPage)].values]

        const elementDetails = elementId?.getBoundingClientRect()
        const { y, height } = elementDetails

        const removedElem = dupArray[dragStartIndex.cur].elements[dupArray[dragStartIndex.cur].elements.findIndex($ => $?.positionType === dragStartIndex.curElem)].element.splice(dragStartIndex.subElem, 1)[0]
        const mobile_removedElem = mobile_dupArray[dragStartIndex?.cur]?.elements[mobile_dupArray[dragStartIndex.cur]?.elements?.findIndex($ => $?.positionType === dragStartIndex?.curElem)]?.element?.splice(dragStartIndex?.subElem, 1)[0]
        if (dupArray[dragStartIndex.cur].elements[dupArray[dragStartIndex.cur].elements.findIndex($ => $?.positionType === dragStartIndex.curElem)].element.length === 0) {
            dupArray[dragStartIndex.cur].elements[dupArray[dragStartIndex.cur].elements.findIndex($ => $?.positionType === dragStartIndex.curElem)].element.push({ ...commonObj })
            mobile_dupArray[dragStartIndex?.cur].elements[mobile_dupArray[dragStartIndex?.cur]?.elements.findIndex($ => $?.positionType === dragStartIndex.curElem)]?.element?.push({ ...commonObj })
        }

        if ((mousePos.y - (y + (height / 2)) < 0) || (dragStartIndex.subElem === dragOverIndex.subElem + 1)) {
            dupArray[dragOverIndex.cur].elements[dupArray[dragOverIndex.cur].elements.findIndex($ => $?.positionType === dragOverIndex.curElem)].element.splice(dragOverIndex.subElem, 0, removedElem)
            mobile_dupArray[dragOverIndex.cur].elements[mobile_dupArray[dragOverIndex.cur].elements.findIndex($ => $?.positionType === dragOverIndex.curElem)].element.splice(dragOverIndex.subElem, 0, mobile_removedElem)
        } else if ((mousePos.y - (y + (height / 2)) > 0) || (dragStartIndex.subElem === dragOverIndex.subElem - 1)) {
            dupArray[dragOverIndex.cur].elements[dupArray[dragOverIndex.cur].elements.findIndex($ => $?.positionType === dragOverIndex.curElem)].element.splice(dragOverIndex.subElem + 1, 0, removedElem)
            mobile_dupArray[dragOverIndex.cur].elements[mobile_dupArray[dragOverIndex.cur].elements.findIndex($ => $?.positionType === dragOverIndex.curElem)].element.splice(dragOverIndex.subElem + 1, 0, mobile_removedElem)
        }
        setcolWise([...dupArray])
        const newObj = { ...finalObj }
        newObj.mobile_pages[newObj.mobile_pages.findIndex($ => $?.id === currPage)].values = mobile_dupArray
        setDragStartIndex({ cur: 0, curElem: "left", subElem: "grandparent" })
        setValues({ ...dupArray[dragOverIndex.cur].elements[dupArray[dragOverIndex.cur].elements.findIndex($ => $?.positionType === dragOverIndex.curElem)].element[dragOverIndex.subElem].style })
        setIndexes({ ...dragOverIndex })
        updatePresent({ ...newObj })
        setRearr(rearr + 1)
        // }
    }

    const sendData = (e, actionType) => {
        e.preventDefault()
        setApiLoader(true)
        const includesInput = []
        finalObj?.pages?.forEach((ele) => {
            ele?.values?.forEach((cur) => {
                cur?.elements?.forEach((curElem) => {
                    curElem?.element?.forEach((subElem) => {
                        if (subElem?.type === "input" && subElem?.inputType === "") {
                            includesInput?.push({ page: ele?.pageName, screen: "desktop" })
                        }
                    })
                })
            })
        })
        finalObj?.mobile_pages?.forEach((ele) => {
            ele?.values?.forEach((cur) => {
                cur?.elements?.forEach((curElem) => {
                    curElem?.element?.forEach((subElem) => {
                        if (subElem?.type === "input" && subElem?.inputType === "") {
                            includesInput?.push({ page: ele?.pageName, screen: "phone" })
                        }
                    })
                })
            })
        })
        if (themeName === "") {
            toast.error("Enter a theme name")
            setApiLoader(false)
        } else if (isOfferDraggable && phoneIsOfferDraggable && finalObj.selectedOffers.length === 0) {
            toast.error("Add some offers to your Theme!")
        } else if (includesInput?.length > 0) {
            setApiLoader(false)
            toast.error(<span> You have not selected input type {includesInput.map((ip, i) => {
                return <span>in {ip?.screen} view on {<span className='text-capitalize'>{ip?.page}</span>}{ip?.page?.toLowerCase()?.includes("page") ? "" : "page"}{includesInput.length - 1 === i ? "." : ", "}</span>
            })}
            </span>)
        } else {
            const form_data = new FormData()
            form_data.append('shop', outletData[0]?.web_url)
            form_data.append('app', 'superleadz')
            Object.entries(finalObj.behaviour).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    value.forEach(ele => form_data.append(key, ele))
                } else {
                    form_data.append(key, value)
                }
            })
            // finalObj.selectedOffers.forEach((offer) => {
            form_data.append("selected_offer_list", JSON.stringify(finalObj.selectedOffers))
            // })
            const dupFinalObj = { ...finalObj }
            dupFinalObj.rules.display_frequency_value_converted = convertToSeconds({ time: finalObj?.rules?.display_frequency_value, type: finalObj?.rules?.display_frequency_time })
            dupFinalObj.rules.spent_on_page_value_converted = convertToSeconds({ time: finalObj?.rules?.spent_on_page_value, type: finalObj?.rules?.spent_on_page_time })
            dupFinalObj.rules.spent_on_website_value_converted = convertToSeconds({ time: finalObj?.rules?.spent_on_website_value, type: finalObj?.rules?.spent_on_website_time })
            dupFinalObj.rules.not_active_page_value_converted = convertToSeconds({ time: finalObj?.rules?.not_active_page_value, type: finalObj?.rules?.not_active_page_time })
            form_data.append("json_list", JSON.stringify(dupFinalObj))
            form_data.append("email_template_json", JSON.stringify(finalObj?.email_settings))
            form_data.append("campaign_name", themeName)
            form_data.append("start_date", finalObj.campaignStartDate)
            form_data.append("end_date", finalObj.campaignEndDate)
            form_data.append("default_id", selectedThemeId)
            form_data.append("is_edit", themeId === 0 ? 0 : 1)
            // form_data.append("source", )
            finalObj?.behaviour?.SOURCE_PAGE_LINK?.map((curElem) => form_data.append("source", `${curElem}_page`))

            form_data.append("theme_id", themeId)
            form_data.append("is_draft", 0)

            axios({
                method: "POST", url: `${SuperLeadzBaseURL}/api/v1/form_builder_template/`, data: form_data
            }).then((data) => {
                setApiLoader(false)
                if (data?.data?.exist) {
                    toast.error("Campaign name already exist")
                } else {
                    localStorage.removeItem("draftId")
                    setThemeId(data?.data.theme_id)
                    toast.success("Successfully saved")
                    if (actionType === "Save & Close") {
                        navigate('/merchant/SuperLeadz/all_campaigns/')
                    } else if (actionType === "Save & Preview") {
                        navigate(`/merchant/SuperLeadz/preview/${data?.data.theme_id}/`, { state: { custom_theme: JSON.stringify(finalObj) } })
                    }
                }
            }).catch((error) => {
                setApiLoader(false)
                console.log({ error })
            })
        }
    }

    const saveDraft = async () => {
        const form_data = new FormData()
        form_data.append('shop', outletData[0]?.web_url)
        form_data.append('app', 'superleadz')
        const theme_id_get = themeId ? themeId : (themeId !== "undefined" || themeId !== "null") ? Number(themeId) : 0
        Object.entries(finalObj.behaviour).map(([key, value]) => {
            if (Array.isArray(value)) {
                value.map(ele => form_data.append(key, ele))
            } else {
                form_data.append(key, value)
            }
        })
        const dupFinalObj = { ...finalObj }
        dupFinalObj.rules.display_frequency_value_converted = convertToSeconds({ time: finalObj?.rules?.display_frequency_value, type: finalObj?.rules?.display_frequency_time })
        dupFinalObj.rules.spent_on_page_value_converted = convertToSeconds({ time: finalObj?.rules?.spent_on_page_value, type: finalObj?.rules?.spent_on_page_time })
        dupFinalObj.rules.spent_on_website_value_converted = convertToSeconds({ time: finalObj?.rules?.spent_on_website_value, type: finalObj?.rules?.spent_on_website_time })
        dupFinalObj.rules.not_active_page_value_converted = convertToSeconds({ time: finalObj?.rules?.not_active_page_value, type: finalObj?.rules?.not_active_page_time })

        form_data.append("json_list", JSON.stringify(dupFinalObj))

        form_data.append("selected_offer_list", JSON.stringify(finalObj.selectedOffers))
        form_data.append("email_template_json", JSON.stringify(finalObj?.email_settings))

        form_data.append("campaign_name", themeName)
        form_data.append("start_date", finalObj.campaignStartDate)
        form_data.append("end_date", finalObj.campaignEndDate)
        form_data.append("default_id", selectedThemeId)
        form_data.append("is_draft", 1)
        finalObj?.behaviour?.SOURCE_PAGE_LINK?.map((curElem) => form_data.append("source", `${curElem}_page`))
        form_data.append("theme_id", theme_id_get)
        axios({
            method: "POST", url: `${SuperLeadzBaseURL}/api/v1/form_builder_template/`, data: form_data
        }).then((resp) => {
            setThemeId(resp?.data?.theme_id)
        }).catch((error) => {
            console.log({ error })
        })
    }

    const getPlan = () => {
        const form_data = new FormData()
        form_data.append('shop', outletData[0]?.web_url)
        form_data.append('app', 'superleadz')
        form_data.append('type', 'ACTIVE')
        const url = new URL(`${SuperLeadzBaseURL}/api/v1/get_active_shop_billing/`)

        axios({
            method: "POST",
            url,
            data: form_data
        })
            .then((data) => {
                setIsPro(data?.data?.data[0]?.plan_id?.toLowerCase()?.includes("pro"))
            })
            .catch((error) => {
                console.log({ error })
            })
    }

    // const generateSuggestion = () => {
    //     const suggestionUrl = new URL(`https://4cb3-2405-201-7-8937-c498-f76d-56b0-2ba1.ngrok-free.app/suggest/`)
    //     // const newArr = []

    //     const form_data = new FormData()

    //     // form_data.append("type_of_content", "coupon text")
    //     form_data.append("prompt", "redeem OFFER_CODE and get 20% off")

    //     // for (let index = 0; index < 5; index++) {
    //     axios({
    //         method: "POST",
    //         url: suggestionUrl,
    //         data: form_data
    //     }).then((response) => {
    //         console.log("response", response?.data?.suggestions)
    //     }).catch((error) => {
    //         console.log(error, "error")
    //     })
    //     // }
    // }

    const updateTextRes = ({ e, arrCondition, mobCondition, key, i, j }) => {
        e.stopPropagation()
        const newObj = { ...finalObj }

        if (currPage === "button") {
            newObj.button[key].elements[i].element[j].isSameText = arrCondition
            newObj.mobile_button[key].elements[i].element[j].isSameText = arrCondition
        } else {
            newObj.pages[newObj?.pages?.findIndex($ => $?.id === currPage)].values[key].elements[i].element[j].isSameText = arrCondition
            newObj.mobile_pages[newObj?.mobile_pages?.findIndex($ => $?.id === currPage)].values[key].elements[i].element[j].isSameText = arrCondition
        }
        // const newObj = { ...finalObj }
        // const arr = currPage === "button" ? [...newObj?.button] : newObj?.pages[newObj?.pages?.findIndex($ => $?.id === currPage)]?.values
        // const mobile_arr = currPage === "button" ? [...newObj?.mobile_button] : newObj?.mobile_pages[newObj?.mobile_pages?.findIndex($ => $?.id === currPage)]?.values
        // arr[key].elements[i].element[j].isSameText = arrCondition
        // mobile_arr[key].elements[i].element[j].isSameText = arrCondition
        // if (currPage === "button") {
        //     newObj.button = arr
        //     newObj.mobile_button = mobile_arr
        // } else {
        //     newObj.pages[newObj?.pages?.findIndex($ => $?.id === currPage)] = arr
        //     newObj.mobile_pages[newObj?.mobile_pages?.findIndex($ => $?.id === currPage)] = mobile_arr
        // }
        updatePresent({ ...newObj })
        setIsMobile(mobCondition)
    }

    useEffect(() => {
        const colWise = currPage === "button" ? [...finalObj?.[`${mobileCondition}button`]] : [...finalObj?.[`${mobileCondition}pages`][finalObj?.[`${mobileCondition}pages`]?.findIndex($ => $.id === currPage)].values]
        setBrandStyles({ ...finalObj?.[`${mobileCondition}brandStyles`] })
        const positionIndex = colWise[indexes.cur]?.elements?.findIndex($ => $?.positionType === indexes?.curElem)
        if (indexes.subElem === "grandparent") {
            setValues(currPage === "button" ? { ...finalObj?.[`${mobileCondition}button`][indexes.cur]?.style } : { ...finalObj?.[`${mobileCondition}pages`][finalObj?.[`${mobileCondition}pages`]?.findIndex($ => $?.id === currPage)]?.values[indexes.cur]?.style })
        } else if (indexes.subElem === "parent") {
            setValues(currPage === "button" ? { ...finalObj?.[`${mobileCondition}button`][indexes.cur]?.elements[positionIndex]?.style } : { ...finalObj?.[`${mobileCondition}pages`][finalObj?.[`${mobileCondition}pages`]?.findIndex($ => $?.id === currPage)]?.values[indexes.cur]?.elements[positionIndex]?.style })
        } else {
            setValues(currPage === "button" ? { ...finalObj?.[`${mobileCondition}button`][indexes.cur]?.elements[positionIndex]?.element[indexes.subElem]?.style } : { ...finalObj?.[`${mobileCondition}pages`][finalObj?.[`${mobileCondition}pages`]?.findIndex($ => $?.id === currPage)]?.values[indexes.cur]?.elements[positionIndex]?.element[indexes.subElem]?.style })
        }

    }, [isMobile, currPage])

    useEffect(() => {
        const newObj = { ...finalObj }
        const arr = currPage === "button" ? [...newObj?.[`${mobileCondition}button`]] : [...newObj?.[`${mobileCondition}pages`][newObj?.[`${mobileCondition}pages`]?.findIndex($ => $.id === currPage)].values]
        const rev_arr = currPage === "button" ? [...newObj?.[`${mobileConditionRev}button`]] : [...newObj?.[`${mobileConditionRev}pages`][newObj?.[`${mobileConditionRev}pages`]?.findIndex($ => $.id === currPage)].values]
        if (arr.length > 0) {
            const positionIndex = arr[indexes.cur]?.elements?.findIndex($ => $?.positionType === indexes?.curElem)
            if (indexes.subElem === "grandparent") {
                if (arr[indexes?.cur]?.style) {
                    arr[indexes.cur].style = { ...arr[indexes?.cur]?.style, ...values }
                    if (arr[indexes?.cur]?.responsiveStyles && Array.isArray(arr[indexes?.cur]?.responsiveStyles)) {
                        arr[indexes?.cur]?.responsiveStyles?.forEach($ => {
                            rev_arr[indexes?.cur].style[$] = arr[indexes?.cur].style[$]
                        })
                    }
                }
            } else if (indexes.subElem === "parent") {
                if (arr[indexes?.cur]?.elements[positionIndex]?.style) {
                    arr[indexes.cur].elements[positionIndex].style = { ...arr[indexes.cur]?.elements[positionIndex]?.style, ...values }
                    if (arr[indexes.cur].elements[positionIndex]?.responsiveStyles && Array.isArray(arr[indexes.cur].elements[positionIndex]?.responsiveStyles)) {
                        arr[indexes.cur].elements[positionIndex]?.responsiveStyles?.forEach($ => {
                            rev_arr[indexes.cur].elements[positionIndex].style[$] = arr[indexes.cur].elements[positionIndex].style[$]
                        })
                    }
                }
            } else {
                if (arr[indexes?.cur]?.elements[positionIndex]?.element[indexes?.subElem]?.style) {
                    arr[indexes.cur].elements[positionIndex].element[indexes.subElem].style = { ...arr[indexes.cur]?.elements[positionIndex]?.element[indexes?.subElem]?.style, ...values }
                    if (arr[indexes.cur].elements[positionIndex].element[indexes.subElem]?.responsiveStyles && Array.isArray(arr[indexes.cur].elements[positionIndex].element[indexes.subElem]?.responsiveStyles)) {
                        arr[indexes.cur].elements[positionIndex].element[indexes.subElem]?.responsiveStyles?.forEach($ => {
                            rev_arr[indexes.cur].elements[positionIndex].element[indexes.subElem].style[$] = arr[indexes.cur].elements[positionIndex].element[indexes.subElem].style[$]
                        })
                    }
                }
            }
            // setcolWise([...arr])
            if (currPage === "button") {
                newObj[`${mobileCondition}button`] = arr
                newObj[`${mobileConditionRev}button`] = rev_arr
            } else {
                const pageIndex = newObj?.[`${mobileConditionRev}pages`]?.findIndex($ => $.id === currPage)
                newObj[`${mobileCondition}pages`][pageIndex].values = arr
                newObj[`${mobileConditionRev}pages`][pageIndex].values = rev_arr
            }
            updatePresent({ ...newObj })
        }
    }, [values])

    const addEvents = () => {
        document.addEventListener("keydown", function (e) {

            if (e.ctrlKey && e.key === 'z') {
                document.getElementById('xircls_undo').click()
            }
            if (e.ctrlKey && e.key === 'y') {
                // redo()
                document.getElementById('xircls_redo').click()
            }
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
        const colWise = currPage === "button" ? [...finalObj?.[`${mobileCondition}button`]] : [...finalObj?.[`${mobileCondition}pages`][finalObj?.[`${mobileCondition}pages`]?.findIndex($ => $.id === currPage)].values]
        const newObj = { ...finalObj }
        const newBgStyles = { ...finalObj?.backgroundStyles?.[`main`] }
        const mobile_newBgStyles = { ...finalObj?.backgroundStyles?.[`mobile_main`] }
        const newBgStyles2 = { ...finalObj?.backgroundStyles?.[`button`] }
        const mobile_newBgStyles2 = { ...finalObj?.backgroundStyles?.[`mobile_button`] }
        function changeStyles(obj, isInput) {
            if (obj?.isInitialBgColor) {
                obj.backgroundColor = defColors[obj?.initialBgColor]
            }
            if (obj?.isInitialColor) {
                obj.color = defColors[obj?.initialColor]
                if (isInput) {
                    obj.WebkitTextFillColor = defColors[obj?.initialColor]
                }
            }
            if (obj?.isInitialBorderColor) {
                obj.borderColor = defColors[obj?.initialBorderColor]
            }
        }
        changeStyles(newBgStyles)
        changeStyles(mobile_newBgStyles, "checking123")
        changeStyles(newBgStyles2)
        changeStyles(mobile_newBgStyles2)
        newObj?.pages?.forEach((page) => {
            page?.values?.forEach((cur) => {
                changeStyles(cur?.style)
                cur?.elements?.forEach((curElem) => {
                    changeStyles(curElem?.style)
                    curElem?.element?.forEach((subElem) => {
                        changeStyles(subElem?.style, subElem.type && subElem.type === "input")
                    })
                })
            })
        })
        newObj?.mobile_pages?.forEach((page) => {
            page?.values?.forEach((cur) => {
                changeStyles(cur?.style)
                cur?.elements?.forEach((curElem) => {
                    changeStyles(curElem?.style)
                    curElem?.element?.forEach((subElem) => {
                        changeStyles(subElem.style, subElem.type && subElem.type === "input")
                    })
                })
            })
        })

        newObj?.button?.forEach((cur) => {
            changeStyles(cur?.style)
            cur?.elements?.forEach((curElem) => {
                changeStyles(curElem?.style)
                curElem?.element?.forEach((subElem) => {
                    changeStyles(subElem?.style, subElem.type && subElem.type === "input")
                })
            })
        })

        newObj?.mobile_button?.forEach((cur) => {
            changeStyles(cur?.style)
            cur?.elements?.forEach((curElem) => {
                changeStyles(curElem?.style)
                curElem?.element?.forEach((subElem) => {
                    changeStyles(subElem?.style, subElem.type && subElem.type === "input")
                })
            })
        })
        newObj.backgroundStyles.main = newBgStyles
        newObj.backgroundStyles.mobile_main = mobile_newBgStyles
        newObj.backgroundStyles.button = newBgStyles2
        newObj.backgroundStyles.mobile_button = mobile_newBgStyles2
        // updatePresent({ ...finalObj, backgroundStyles: { ...finalObj?.backgroundStyles, [`${mobileCondition}main`]: { ...newBgStyles } } })
        // setcolWise(currPage === "button" ? newObj?.button : newObj?.pages[newObj?.pages?.findIndex($ => $?.id === currPage)]?.values)
        const positionIndex = colWise[indexes.cur]?.elements?.findIndex($ => $?.positionType === indexes?.curElem)
        if (indexes.subElem === "grandparent") {
            setValues(currPage === "button" ? { ...newObj?.button[indexes.cur]?.style } : { ...newObj?.pages[newObj?.pages?.findIndex($ => $?.id === currPage)]?.values[indexes.cur]?.style })
        } else if (indexes.subElem === "parent") {
            setValues(currPage === "button" ? { ...newObj?.button[indexes.cur]?.elements[positionIndex]?.style } : { ...newObj?.pages[newObj.pages?.findIndex($ => $?.id === currPage)]?.values[indexes.cur]?.elements[positionIndex]?.style })
        } else {
            setValues(currPage === "button" ? { ...newObj?.button[indexes.cur]?.elements[positionIndex]?.element[indexes.subElem]?.style } : { ...newObj?.pages[newObj?.pages?.findIndex($ => $?.id === currPage)]?.values[indexes.cur]?.elements[positionIndex]?.element[indexes.subElem]?.style })
        }
        updatePresent({ ...newObj, defaultThemeColors: { ...finalObj.defaultThemeColors, [currColor]: defColors[currColor] } })
    }, [defColors, currColor])

    useEffect(() => {
        localStorage.setItem("draftId", themeId)
    }, [themeId])

    // useEffect(() => {
    //     updatePresent({ ...finalObj, offerTheme })
    // }, [offerTheme])

    useEffect(() => {
        const draggedTypes = new Array()
        const colWise = currPage === "button" ? [...finalObj?.[`${mobileCondition}button`]] : [...finalObj?.[`${mobileCondition}pages`][finalObj?.[`${mobileCondition}pages`]?.findIndex($ => $.id === currPage)].values]
        colWise?.forEach(cur => {
            cur?.elements?.forEach(curElem => {
                curElem.element?.forEach(subElem => {
                    if (subElem?.type === "input") {
                        draggedTypes?.push(subElem?.inputType)
                    }
                })
            })
        })

        setDisableIpDrag([...draggedTypes])
        localStorage.setItem("defaultTheme", JSON.stringify(finalObj))
        const draftIntervalTimer = 30000
        const draftInterval = setInterval(() => {
            if (themeLoc?.pathname?.includes("/merchant/SuperLeadz/new_customization/")) {
                saveDraft()
            }
        }, draftIntervalTimer)

        return () => clearInterval(draftInterval)
    }, [finalObj])

    useEffect(() => {
        setCurrPosition({ ...currPosition, selectedType: sideNav === "rules" ? "display_frequency" : "navMenuStyles" })
    }, [sideNav])

    useEffect(() => {
        updatePresent({ ...finalObj, theme_name: themeName })
    }, [themeName])

    useEffect(() => {
        if (sideNav !== "" && sideNav !== "rules") {
            setPrevOpen(sideNav)
        }
    }, [sideNav])

    // useEffect(() => {
    //     setSelectedOffer({})
    // }, [currPosition, indexes])

    const currPageIndex = finalObj?.pages?.findIndex($ => $?.id === currPage)

    const returnRender = (props) => {
        if (toggleView === 1) {
            return <RenderPreview {...props} />
        } else if (toggleView === 2) {
            return <RenderPreviewCopy {...props} />
        }
    }

    useEffect(() => {
        getEmailSettings()
        addEvents()
        getData()
        const colWise = currPage === "button" ? [...finalObj?.[`${mobileCondition}button`]] : [...finalObj?.[`${mobileCondition}pages`][finalObj?.[`${mobileCondition}pages`]?.findIndex($ => $.id === currPage)].values]
        // const onLoadMobile = status ? "mobile_" : ""
        getOffers()
        refreshOfferDraggable()
        getPlan()
        // generateSuggestion()
        const campaignStartDate = finalObj?.campaignStartDate === "" ? moment(new Date()).format("YYYY-MM-DD HH:mm:ss") : Array.isArray(finalObj?.campaignStartDate) ? moment(finalObj?.campaignStartDate[0]).format("YYYY-MM-DD HH:mm:ss") : finalObj?.campaignStartDate
        const campaignEndDate = !finalObj?.campaignHasEndDate ? "" : finalObj?.campaignEndDate === "" ? moment(new Date()).format("YYYY-MM-DD HH:mm:ss") : Array.isArray(finalObj?.campaignEndDate) ? moment(finalObj?.campaignEndDate[0]).format("YYYY-MM-DD HH:mm:ss") : finalObj?.campaignEndDate

        updatePresent({ ...finalObj, campaignStartDate, campaignEndDate })
        if (themeLoc?.pathname?.includes("/merchant/SuperLeadz/new_customization/")) {
            saveDraft()
        }
        // if (currPage === "button") {
        //     setcolWise(finalObj?.[`${onLoadMobile}button`])
        //     // setBtnStyles({ ...finalObj?.backgroundStyles?.[`${onLoadMobile}button`] })
        // } else {
        //     const pageIndex = finalObj?.[`${onLoadMobile}pages`]?.findIndex($ => $?.id === currPage)
        //     setcolWise(finalObj?.[`${onLoadMobile}pages`][pageIndex]?.values)
        //     // setCrossStyle({ ...finalObj?.crossButtons?.[`${onLoadMobile}main`] })
        // }

        setBrandStyles({ ...finalObj?.[`${mobileCondition}brandStyles`] })

        const positionIndex = colWise[indexes.cur]?.elements?.findIndex($ => $?.positionType === indexes?.curElem)
        if (indexes.subElem === "grandparent") {
            setValues(currPage === "button" ? { ...finalObj?.[`${mobileCondition}button`][indexes.cur]?.style } : { ...finalObj?.[`${mobileCondition}pages`][finalObj?.[`${mobileCondition}pages`]?.findIndex($ => $?.id === currPage)]?.values[indexes.cur]?.style })
        } else if (indexes.subElem === "parent") {
            setValues(currPage === "button" ? { ...finalObj?.[`${mobileCondition}button`][indexes.cur]?.elements[positionIndex]?.style } : { ...finalObj?.[`${mobileCondition}pages`][finalObj?.[`${mobileCondition}pages`]?.findIndex($ => $?.id === currPage)]?.values[indexes.cur]?.elements[positionIndex]?.style })
        } else {
            setValues(currPage === "button" ? { ...finalObj?.[`${mobileCondition}button`][indexes.cur]?.elements[positionIndex]?.element[indexes.subElem]?.style } : { ...finalObj?.[`${mobileCondition}pages`][finalObj?.[`${mobileCondition}pages`]?.findIndex($ => $?.id === currPage)]?.values[indexes.cur]?.elements[positionIndex]?.element[indexes.subElem]?.style })
        }

        // if (status) {
        //     document.getElementById("phone").click()
        // } else if (defaultIsMobile.get('isMobile') === 'false') {
        //     document.getElementById("desktop").click()
        // }
        return () => {
            localStorage.removeItem("draftId")
            localStorage.removeItem("defaultThemeId")
            localStorage.removeItem("defaultTheme")
        }

    }, [])

    return (
        <Suspense fallback={null}>
            <div className='position-relative' id='customization-container'>
                {
                    apiLoader ? <FrontBaseLoader /> : ''
                }
                <Container fluid className='border-bottom px-0' style={{ height: "55px" }}>
                    <Row className='align-items-center px-0'>
                        <div className='col-md-2 d-flex justify-content-start align-items-center gap-1'>
                            <button onClick={() => {
                                navigate(-1)
                            }} className="btn" style={{ border: "none", outline: "none" }}><ArrowLeft /></button>
                            <div className="d-flex flex-column align-items-center justify-content-center" style={{ gap: "0.5rem", cursor: "pointer", height: "55px" }}>
                                <Link to={"/merchant/SuperLeadz/"} className='text-secondary'><Home size={"20px"} /></Link>
                            </div>
                        </div>
                        <div className='col-md-10 d-flex flex-row justify-content-end align-items-center' style={{ padding: "0.5rem", gap: "0.5rem" }}>
                            <button className="btn custom-btn-outline d-none" onClick={() => setToggleView(1)}>
                                {toggleView}
                            </button>
                            <div className='d-flex justify-content-center align-items-stretch align-self-stretch' style={{ width: '120px' }}>
                                <button className={`btn d-flex justify-content-center align-items-center position-relative rounded-0 ${!isMobile ? "bg-light-secondary active-on" : ""}`} id="desktop" onClick={() => setIsMobile(false)} style={{ border: "none", outline: "none", padding: "0px", aspectRatio: "1" }}><Monitor size={17.5} /></button>
                                <button className={`btn d-flex justify-content-center align-items-center position-relative rounded-0 ${isMobile ? "bg-light-secondary active-on" : ""}`} id="phone" onClick={() => setIsMobile(true)} style={{ border: "none", outline: "none", padding: "0px", aspectRatio: "1" }}><Smartphone size={17.5} /></button>
                                {false && <button className="btn" style={{ border: "none", outline: "none" }}>Preview</button>}
                            </div>
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
                            <div style={{ gap: "0.5rem" }} className="d-flex align-items-center">
                                <button title="Undo" id="xircls_undo" className="btn border btn-dark" style={{ padding: "0.75rem" }} onClick={() => undo()}><RotateCcw size={15} /></button>
                                <button title="Redo" id="xircls_redo" className="btn border btn-dark" style={{ padding: "0.75rem" }} onClick={() => redo()}><RotateCw size={15} /></button>
                            </div>
                            <button className="btn custom-btn-outline" onClick={() => setCancelCust(!cancelCust)}>Cancel</button>
                            {/* <button onClick={() => undo()}>Undo</button>
                            <button onClick={() => redo()}>Redo</button> */}
                            <button disabled={currPageIndex === 0} onClick={() => {
                                setCurrPage(currPage === "button" ? finalObj.pages[finalObj.pages.length - 1].id : finalObj.pages[currPageIndex - 1].id)
                            }} className="btn custom-btn-outline">Previous</button>
                            <button disabled={currPage === "button"} onClick={() => {
                                setCurrPage(currPage === finalObj.pages[finalObj.pages.length - 1].id ? "button" : finalObj.pages[currPageIndex + 1].id)
                            }} className="btn custom-btn-outline">Next</button>
                            <button onClick={(e) => sendData(e, "Save & Preview")} id='saveBtn' className="btn custom-btn-outline" style={{ whiteSpace: 'nowrap' }}>Preview</button>
                            <button onClick={(e) => sendData(e, "Save")} id='saveBtn' className="btn custom-btn-outline" style={{ whiteSpace: 'nowrap' }}>Save</button>
                            <button onClick={(e) => sendData(e, "Save & Close")} id='saveBtn' className="btn btn-primary-main" style={{ whiteSpace: 'nowrap' }}>Save & Close</button>
                        </div>
                    </Row>
                </Container>
                <div className="d-flex justify-content-center align-items-stretch border position-relative" style={{ height: "calc(100vh - 55px)" }}>
                    {/* Component for changing background of the selected element */}
                    {/* <BgModifier pageCondition={pageCondition} mobileCondition={mobileCondition} mobileConditionRev={mobileConditionRev} styles={bgStyles} setStyles={setBgStyles} /> */}
                    {/* Component for changing background of the selected element */}

                    {/* Sidebar */}
                    <div className="nav-sidebar d-flex flex-column align-items-stretch justify-content-start border-end text-center h-100" style={{ padding: "0.5rem", minWidth: `${sectionWidths.sidebar}px`, overflow: "auto", gap: '20px' }}>
                        <div className={`sideNav-items d-flex flex-column align-items-center justify-content-center ${sideNav === "theme" ? "text-black active-item" : ""}`} style={{ gap: "0.5rem", cursor: "pointer", padding: "0.75rem 0px" }} onClick={() => setSideNav(sideNav === "theme" ? "" : "theme")}>
                            <button className={`btn d-flex align-items-center justify-content-center`} style={{ aspectRatio: "1", padding: "0rem", border: "none", outline: "none", transition: "0.3s ease-in-out" }}>
                                <svg
                                    width="15px"
                                    id="Layer_1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                    xmlSpace="preserve"
                                    fill={sideNav === "theme" ? "#000" : "#85898e"}
                                    style={{ transition: "0.3s ease-in-out" }}
                                >
                                    <path d="M475.691.021c-14.656 0-27.776 8.725-33.451 22.251l-32.64 77.973c-9.728-9.152-22.421-14.933-36.267-14.933h-320C23.936 85.312 0 109.248 0 138.645v320c0 29.397 23.936 53.333 53.333 53.333h320c29.397 0 53.333-23.936 53.333-53.333V225.152l81.92-172.821c2.24-4.757 3.413-10.048 3.413-16.043C512 16.299 495.701.021 475.691.021zm-70.358 458.624c0 17.643-14.357 32-32 32h-320c-17.643 0-32-14.357-32-32v-320c0-17.643 14.357-32 32-32h320c11.243 0 21.312 6.101 27.072 15.573l-37.739 90.197v-52.437c0-5.888-4.779-10.667-10.667-10.667H74.667c-5.888 0-10.667 4.779-10.667 10.667v85.333c0 5.888 4.779 10.667 10.667 10.667h269.76l-8.939 21.333h-90.155c-5.888 0-10.667 4.779-10.667 10.667v128c0 .277.128.512.149.789-8.768 7.787-14.144 10.389-14.528 10.539a10.68 10.68 0 00-6.699 7.616 10.706 10.706 0 002.859 9.941c15.445 15.445 36.757 21.333 57.6 21.333 26.645 0 52.48-9.643 64.128-21.333 16.768-16.768 29.056-50.005 19.776-74.773l47.381-99.925v188.48zm-134.698-61.12c2.944-9.685 5.739-18.859 14.229-27.349 15.083-15.083 33.835-15.083 48.917 0 13.504 13.504 3.2 45.717-10.667 59.584-11.563 11.541-52.672 22.677-80.256 8.256 3.669-2.859 7.893-6.549 12.672-11.328 8.918-8.939 12.075-19.221 15.105-29.163zM256 375.339v-76.672h70.571l-16.363 39.083c-14.251-.256-28.565 5.483-40.448 17.387-6.635 6.634-10.752 13.524-13.76 20.202zm75.264-32.598l28.715-68.629 16.128 7.915-32.555 68.651c-3.947-3.201-8.021-5.931-12.288-7.937zm10.069-172.096v64h-256v-64h256zM489.28 43.243l-104.064 219.52-17.003-8.341 54.08-129.237 39.616-94.677c2.325-5.568 7.744-9.152 13.803-9.152 8.235 0 14.933 6.699 14.933 15.659 0 2.132-.469 4.329-1.365 6.228z" />
                                    <path d="M181.333 277.312H74.667c-5.888 0-10.667 4.779-10.667 10.667v149.333c0 5.888 4.779 10.667 10.667 10.667h106.667c5.888 0 10.667-4.779 10.667-10.667V287.979c-.001-5.888-4.78-10.667-10.668-10.667zm-10.666 149.333H85.333v-128h85.333v128z" />
                                </svg>
                            </button>
                            <span style={{ fontSize: "8.5px", fontStyle: "normal", fontWeight: "500", lineHeight: "10px", transition: "0.3s ease-in-out" }} className={`text-uppercase transformSideBar`}>Theme</span>
                        </div>
                        <div className={`sideNav-items d-flex flex-column align-items-center justify-content-center ${sideNav === "audience" ? "text-black active-item" : ""}`} style={{ gap: "0.5rem", cursor: "pointer", padding: "0.75rem 0px" }} onClick={() => setSideNav(sideNav === "audience" ? "" : "audience")}>
                            <button className={`btn d-flex align-items-center justify-content-center`} style={{ aspectRatio: "1", padding: "0rem", border: "none", outline: "none", transition: "0.3s ease-in-out" }}>
                                <Target size={15} />
                            </button>
                            <span style={{ fontSize: "8.5px", fontStyle: "normal", fontWeight: "500", lineHeight: "10px", transition: "0.3s ease-in-out" }} className={`text-uppercase transformSideBar`}>Audience</span>
                        </div>
                        <div className={`sideNav-items d-flex flex-column align-items-center justify-content-center ${sideNav === "display" ? "text-black active-item" : ""}`} style={{ gap: "0.5rem", cursor: "pointer", padding: "0.75rem 0px" }} onClick={() => setSideNav(sideNav === "display" ? "" : "display")}>
                            <button className={`btn d-flex align-items-center justify-content-center`} style={{ aspectRatio: "1", padding: "0rem", border: "none", outline: "none", transition: "0.3s ease-in-out" }}>
                                <Monitor size={15} />
                            </button>
                            <span style={{ fontSize: "8.5px", fontStyle: "normal", fontWeight: "500", lineHeight: "10px", transition: "0.3s ease-in-out" }} className={`text-uppercase transformSideBar`}>Display</span>
                        </div>
                        <div className={`sideNav-items d-none flex-column align-items-center justify-content-center ${sideNav === "trigger" ? "text-black active-item" : ""}`} style={{ gap: "0.5rem", cursor: "pointer", padding: "0.75rem 0px" }} onClick={() => setSideNav(sideNav === "trigger" ? "" : "trigger")}>
                            <button className={`btn d-flex align-items-center justify-content-center`} style={{ aspectRatio: "1", padding: "0rem", border: "none", outline: "none", transition: "0.3s ease-in-out" }}>
                                <Monitor size={15} />
                            </button>
                            <span style={{ fontSize: "8.5px", fontStyle: "normal", fontWeight: "500", lineHeight: "10px", transition: "0.3s ease-in-out" }} className={`text-uppercase transformSideBar`}>Triggers</span>
                        </div>
                        <div className={`sideNav-items d-flex flex-column align-items-center justify-content-center ${(sideNav === "add-elements" || sideNav === "button") ? "text-black active-item" : ""}`} style={{ gap: "0.5rem", cursor: "pointer", padding: "0.75rem 0px" }} onClick={() => {
                            if (currPage === "button") {
                                setSideNav(sideNav === "button" ? "" : "button")
                            } else {
                                setSideNav(sideNav === "add-elements" ? "" : "add-elements")
                            }
                        }}>
                            <button className={`btn d-flex align-items-center justify-content-center`} style={{ aspectRatio: "1", padding: "0rem", border: "none", outline: "none", transition: "0.3s ease-in-out" }}>
                                <PlusCircle size={15} />
                            </button>
                            <span style={{ fontSize: "8.5px", fontStyle: "normal", fontWeight: "500", lineHeight: "10px", transition: "0.3s ease-in-out" }} className={`text-uppercase transformSideBar`}>Elements</span>
                        </div>
                        <div className={`sideNav-items d-flex flex-column align-items-center justify-content-center ${sideNav === "offers" ? "text-black active-item" : ""}`} style={{ gap: "0.5rem", cursor: "pointer", padding: "0.75rem 0px" }} onClick={() => {
                            setSideNav(sideNav === "offers" ? "" : "offers")
                            setCurrPage("offers")
                        }}>
                            <button className={`btn d-flex align-items-center justify-content-center`} style={{ aspectRatio: "1", padding: "0rem", border: "none", outline: "none", transition: "0.3s ease-in-out" }}>
                                <Tag size={15} />
                            </button>
                            <span style={{ fontSize: "8.5px", fontStyle: "normal", fontWeight: "500", lineHeight: "10px", transition: "0.3s ease-in-out" }} className={`text-uppercase transformSideBar`}>Offers</span>
                        </div>
                        <div className={`sideNav-items d-flex flex-column align-items-center justify-content-center ${sideNav === "criteria" ? "text-black active-item" : ""}`} style={{ gap: "0.5rem", cursor: "pointer", padding: "0.75rem 0px" }} onClick={() => setSideNav(sideNav === "criteria" ? "" : "criteria")}>
                            <button className={`btn d-flex align-items-center justify-content-center`} style={{ aspectRatio: "1", padding: "0rem", border: "none", outline: "none", transition: "0.3s ease-in-out" }}>
                                <Crosshair size={15} />
                            </button>
                            <span style={{ fontSize: "8.5px", fontStyle: "normal", fontWeight: "500", lineHeight: "10px", transition: "0.3s ease-in-out" }} className={`text-uppercase transformSideBar`}>Schedule</span>
                        </div>
                        <div className={`sideNav-items d-flex flex-column align-items-center justify-content-center ${sideNav === "rules" ? "text-black active-item" : ""}`} style={{ gap: "0.5rem", cursor: "pointer", padding: "0.75rem 0px" }} onClick={() => {
                            setSideNav(sideNav === "rules" ? "" : "rules")
                        }}>
                            <button className={`btn d-flex align-items-center justify-content-center`} style={{ aspectRatio: "1", padding: "0rem", border: "none", outline: "none", transition: "0.3s ease-in-out" }}>
                                <Mail size={15} />
                            </button>
                            <span style={{ fontSize: "8.5px", fontStyle: "normal", fontWeight: "500", lineHeight: "10px", transition: "0.3s ease-in-out" }} className={`text-uppercase transformSideBar`}>Rules</span>
                        </div>
                        <div className={`sideNav-items d-flex flex-column align-items-center justify-content-center ${sideNav === "email" ? "text-black active-item" : ""}`} style={{ gap: "0.5rem", cursor: "pointer", padding: "0.75rem 0px" }} onClick={() => {
                            setSideNav("email")
                        }}>
                            <button className={`btn d-flex align-items-center justify-content-center`} style={{ aspectRatio: "1", padding: "0rem", border: "none", outline: "none", transition: "0.3s ease-in-out" }}>
                                <Mail size={15} />
                            </button>
                            <span style={{ fontSize: "8.5px", fontStyle: "normal", fontWeight: "500", lineHeight: "10px", transition: "0.3s ease-in-out" }} className={`text-uppercase transformSideBar`}>Email</span>
                        </div>
                    </div>
                    {/* Sidebar */}

                    {/* Preview and Edit Section */}
                    <div className="d-flex align-items-stretch flex-grow-1 h-100">
                        {/* Section Drawer */}
                        <div className=" border-end bg-white position-relative h-100" style={{ width: (sideNav !== "" && sideNav !== "rules") ? `${sectionWidths.drawerWidth}px` : "0px", transition: "0.3s ease-in-out", opacity: "1", boxShadow: "10px 2px 5px rgba(0,0,0,0.125)", zIndex: "1" }}>
                            <span onClick={() => setSideNav(sideNav === "" ? prevOpen : "")} className="position-absolute d-flex justify-content-center align-items-center cursor-pointer" style={{ top: "50%", right: "0px", transform: `translateX(100%) translateY(-50%)`, padding: "0.25rem", aspectRatio: "9/30", height: "50px", borderRadius: "0px 10px 10px 0px", backgroundColor: "#ffffff", zIndex: "11111111" }}>
                                <ChevronRight style={{ rotate: sideNav === "" ? "0deg" : "-540deg", transition: "0.3s ease-in-out" }} size={12.5} color='#000000' />
                            </span>
                            <div className="overflow-x-hidden h-100 position-relative hideScroll">
                                <div className='w-100' style={{ height: "100%", overflowY: "auto" }}>
                                    <div style={{ width: `${sectionWidths.drawerWidth}px`, transform: `translateX(${(sideNav !== "" && sideNav !== "rules") ? "0px" : `-${sectionWidths.drawerWidth}px`})`, transition: "0.3s ease-in-out", position: "absolute", inset: "0px 0px 0px auto" }}>
                                        {/* Theme Section */}
                                        {sideNav === "theme" && <div style={{ transition: "0.3s ease-in-out", overflow: "auto", width: "100%" }}>
                                            <UncontrolledAccordion stayOpen defaultOpen={["1"]}>
                                                <AccordionItem>
                                                    <AccordionHeader className='acc-header border-top' targetId='1' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                                                        <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Quick Setup</label>
                                                    </AccordionHeader>
                                                    <AccordionBody accordionId='1'>
                                                        <div className="py-1">
                                                            <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Primary Font</label>
                                                            <Select value={fontStyles[fontStyles?.findIndex($ => $?.value === finalObj?.fontFamilies?.primary)]} id='font-select-primary' styles={{
                                                                option: (provided, state) => {
                                                                    return ({ ...provided, fontFamily: fontStyles[fontStyles?.findIndex($ => $?.value === state.value)]?.value })
                                                                }
                                                            }} options={fontStyles}
                                                                onChange={e => {
                                                                    updatePresent({ ...finalObj, fontFamilies: { ...finalObj.fontFamilies, primary: e.value } })
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="py-1">
                                                            <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Secondary Font</label>
                                                            <Select value={fontStyles[fontStyles.findIndex($ => $?.value === finalObj?.fontFamilies?.secondary)]} id='font-select-secondary' styles={{
                                                                option: (provided, state) => {
                                                                    return ({ ...provided, fontFamily: fontStyles[fontStyles?.findIndex($ => $?.value === state.value)]?.value })
                                                                }
                                                            }} options={fontStyles}
                                                                onChange={e => {
                                                                    updatePresent({ ...finalObj, fontFamilies: { ...finalObj.fontFamilies, secondary: e.value } })
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="py-1">
                                                            <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Background</label>
                                                            {/* <div className="d-flex align-items-center justify-content-between gap-1 form-check form-check-success p-0" style={{ marginBottom: '5px' }}>
                                                                <label style={{ fontSize: "10px" }} className="form-check-label m-0 p-0">Set default</label>
                                                                <input type='checkbox' className='form-check-input m-0 p-0' onChange={(e) => {
                                                                }} />
                                                            </div> */}
                                                            <div className=" rounded border cursor-pointer" style={{ backgroundImage: `url(${pixels})` }}>
                                                                <div onClick={() => {
                                                                    currPage === "button" ? setBgModal3(!bgModal3) : setBgModal2(!bgModal2)
                                                                }} className="p-2 w-100" style={{ backgroundColor: currPage === "button" ? finalObj?.backgroundStyles[`${mobileCondition}button`]?.backgroundColor : finalObj?.backgroundStyles?.[`${mobileCondition}main`]?.backgroundColor, backgroundImage: currPage === "button" ? finalObj?.backgroundStyles[`${mobileCondition}button`]?.backgroundImage : finalObj?.backgroundStyles[`${mobileCondition}main`].backgroundImage }}></div>
                                                            </div>
                                                        </div>
                                                        <div className="py-1">
                                                            <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Text Colour</label>
                                                            <div className='cursor-pointer flex-grow-1 mb-2' style={{ backgroundImage: `url(${pixels})` }}>
                                                                <div className="p-1 rounded border" style={{ backgroundColor: finalObj?.defaultThemeColors?.secondary1 }} onClick={() => {
                                                                    setCurrColor("secondary1")
                                                                    setCustomColorModal2(!customColorModal2)
                                                                }}></div>
                                                            </div>
                                                            <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Button Colour</label>
                                                            <div className='cursor-pointer flex-grow-1 mb-2' style={{ backgroundImage: `url(${pixels})` }}>
                                                                <div className="p-1 rounded border" style={{ backgroundColor: finalObj?.defaultThemeColors?.secondary2 }} onClick={() => {
                                                                    setCurrColor("secondary2")
                                                                    setCustomColorModal2(!customColorModal2)
                                                                }}></div>
                                                            </div>
                                                            <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Input Field Colour</label>
                                                            <div className='cursor-pointer flex-grow-1 mb-2' style={{ backgroundImage: `url(${pixels})` }}>
                                                                <div className="p-1 rounded border" style={{ backgroundColor: finalObj?.defaultThemeColors?.secondary3 }} onClick={() => {
                                                                    setCurrColor("secondary3")
                                                                    setCustomColorModal2(!customColorModal2)
                                                                }}></div>
                                                            </div>
                                                            <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Other Colour</label>
                                                            <div className='cursor-pointer flex-grow-1' style={{ backgroundImage: `url(${pixels})` }}>
                                                                <div className="p-1 rounded border" style={{ backgroundColor: finalObj?.defaultThemeColors?.secondary4 }} onClick={() => {
                                                                    setCurrColor("secondary4")
                                                                    setCustomColorModal2(!customColorModal2)
                                                                }}></div>
                                                            </div>
                                                        </div>
                                                        <div className="py-1">
                                                            {/* <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Brand Logo</label>
                                                            <input type='file' className='form-control'  onClick={() => {
                                                                setImgModal(!imgModal)
                                                                triggerImage()
                                                                setImageType("All")
                                                            }} /> */}
                                                            <div className='p-0 mx-0 my-1'>
                                                                <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Brand Logo:</span>
                                                                <div style={{ fontSize: "10px" }}>Recommended image size: {finalObj?.defaultThemeColors?.recommendedWidth}</div>
                                                                <div
                                                                    className="d-flex justify-content-center align-items-center mb-1 position-relative"
                                                                    style={{ width: '100%', aspectRatio: '16/9' }}
                                                                >
                                                                    <div
                                                                        className="overlay"
                                                                        style={{
                                                                            display: 'none',
                                                                            position: 'absolute',
                                                                            top: 0,
                                                                            left: 0,
                                                                            width: '100%',
                                                                            height: '100%',
                                                                            background: 'rgba(0, 0, 0, 0.5)',
                                                                            display: 'flex',
                                                                            justifyContent: 'center',
                                                                            alignItems: 'center',
                                                                            color: '#fff',
                                                                            fontSize: '18px',
                                                                            cursor: 'pointer',
                                                                            zIndex: 1
                                                                        }}
                                                                    >
                                                                        {finalObj?.defaultThemeColors?.brandLogo === "http://www.palmares.lemondeduchiffre.fr/images/joomlart/demo/default.jpg" ? <PlusCircle size={19} onClick={() => {
                                                                            setImgModal(!imgModal)
                                                                            triggerImage()
                                                                            setImageType("All")
                                                                        }} /> : <>
                                                                            <div className='d-flex justify-content-center align-items-center gap-1'>
                                                                                <div className='d-flex justify-content-center align-items-center' onClick={() => {
                                                                                    updatePresent({ ...finalObj, defaultThemeColors: { ...finalObj?.defaultThemeColors, brandLogo: 'http://www.palmares.lemondeduchiffre.fr/images/joomlart/demo/default.jpg' } })
                                                                                }}>
                                                                                    <Trash size={19} />
                                                                                </div>
                                                                                <div className='d-flex justify-content-center align-items-center' onClick={() => {
                                                                                    setImgModal(!imgModal)
                                                                                    triggerImage()
                                                                                    setImageType("All")
                                                                                }}>
                                                                                    <Edit size={19} />
                                                                                </div>
                                                                            </div>
                                                                        </>}
                                                                    </div>
                                                                    <img style={{ maxWidth: "100%", maxHeight: "100%" }} src={finalObj?.defaultThemeColors?.brandLogo} alt="" />
                                                                </div>
                                                                <div className='mb-1'>
                                                                    <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Brand Logo Width: {finalObj?.defaultThemeColors?.brandWidth}</span>
                                                                    <div className="p-0 justify-content-start align-items-center gap-2">
                                                                        <input value={parseFloat(finalObj?.defaultThemeColors?.brandWidth)} onChange={e => {
                                                                            updatePresent({ ...finalObj, defaultThemeColors: { ...finalObj?.defaultThemeColors, brandWidth: `${e.target.value}px` } })
                                                                        }} type='range' className='w-100' name="width" min="20" max="1500" />
                                                                    </div>
                                                                </div>
                                                                <div className='mb-1'>
                                                                    <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Brand Logo Height: {finalObj?.defaultThemeColors?.brandHeight}</span>
                                                                    <div className="p-0 justify-content-start align-items-center gap-2">
                                                                        <input value={parseFloat(finalObj?.defaultThemeColors?.brandHeight)} onChange={e => {
                                                                            updatePresent({ ...finalObj, defaultThemeColors: { ...finalObj?.defaultThemeColors, brandHeight: `${e.target.value}px` } })
                                                                        }} type='range' className='w-100' name="height" min="20" max="1500" />
                                                                    </div>
                                                                </div>
                                                                <div className='p-0 mb-1 align-items-center'>
                                                                    <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Brand Logo ALignment:</span>
                                                                    <Select value={alignOptions?.filter($ => $.value === finalObj?.defaultThemeColors?.brandAlignment)} onChange={e => {
                                                                        updatePresent({ ...finalObj, defaultThemeColors: { ...finalObj?.defaultThemeColors, brandAlignment: e.value } })
                                                                    }} options={alignOptions} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </AccordionBody>
                                                </AccordionItem>
                                            </UncontrolledAccordion>
                                            <UncontrolledAccordion stayOpen defaultOpen={["1", "2"]}>
                                                <AccordionItem>
                                                    <AccordionHeader className='acc-header border-top' targetId='1' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                                                        <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Style</label>
                                                    </AccordionHeader>
                                                    <AccordionBody accordionId='1'>
                                                        <p className='m-0 fw-bolder text-black text-uppercase' style={{ padding: "0.5rem 0px", fontSize: "0.75rem" }}>Background Fill</p>
                                                        <div className='p-0 mx-0 my-1'>
                                                            <div className=' p-0 justify-content- align-items-center gap-1'>
                                                                <span className='fw-bolder text-black' style={{ fontSize: "0.7rem" }}>Background:</span>
                                                                <div className=" rounded border cursor-pointer" style={{ backgroundImage: `url(${pixels})` }}>
                                                                    <div onClick={() => {
                                                                        currPage === "button" ? setBgModal3(!bgModal3) : setBgModal2(!bgModal2)
                                                                    }} className="p-2 w-100" style={{ backgroundColor: currPage === "button" ? finalObj?.backgroundStyles[`${mobileCondition}button`]?.backgroundColor : finalObj?.backgroundStyles[`${mobileCondition}main`]?.backgroundColor, backgroundImage: currPage === "button" ? finalObj?.backgroundStyles[`${mobileCondition}button`]?.backgroundImage : finalObj?.backgroundStyles[`${mobileCondition}main`]?.backgroundImage }}></div>
                                                                </div>
                                                                {/* <div className="d-flex align-items-center justify-content-between gap-1 form-check form-check-success m-0 p-0">
                                                                    <label style={{ fontSize: "10px" }} className="form-check-label m-0 p-0">Keep same background for {isMobile ? "desktop theme" : "mobile theme"}</label>
                                                                    <input
                                                                        // checked={bgCheckedCondition}
                                                                        type='checkbox' className='form-check-input m-0 p-0' onChange={(e) => {
                                                                            const newObj = { ...finalObj }
                                                                            if (e.target.checked) {
                                                                                if (finalObj?.responsive?.some($ => isEqual($?.position, "background"))) {
                                                                                    const responiveIndex = finalObj?.responsive?.findIndex($ => isEqual($?.position, "background"))
                                                                                    newObj?.responsive[responiveIndex]?.common?.push("backgroundColor")
                                                                                    newObj.responsive[responiveIndex].common = [...newObj?.responsive[responiveIndex]?.common, "backgroundColor", "backgroundImage"]
                                                                                } else {
                                                                                    newObj.responsive.push({ position: "background", common: ["backgroundColor", "backgroundImage"], page: currPage })
                                                                                }
                                                                            } else {
                                                                                const responiveIndex = finalObj?.responsive?.findIndex($ => isEqual($?.position, "background"))
                                                                                newObj.responsive[responiveIndex].common = newObj?.responsive[responiveIndex]?.common?.filter(item => (item !== "backgroundColor") && (item !== "backgroundImage"))
                                                                            }
                                                                            updatePresent({ ...newObj })
                                                                        }} />
                                                                </div> */}
                                                            </div>
                                                        </div>
                                                        <p className='m-0 fw-bolder text-black text-uppercase' style={{ padding: "0.5rem 0px", fontSize: "0.75rem" }}>Size</p>
                                                        <div className='p-0 mx-0 my-1'>
                                                            <div className='mb-1'>
                                                                <span className='fw-bolder text-black text-capitalize' style={{ fontSize: "0.7rem" }}>{isMobile ? "Max Width" : "Width"}: {currPage === "button" ? finalObj?.backgroundStyles[`${mobileCondition}button`][isMobile ? "maxWidth" : "width"] : finalObj?.backgroundStyles[`${mobileCondition}main`]?.[isMobile ? "maxWidth" : "width"]}</span>
                                                                <div className="d-flex p-0 justify-content-between align-items-center gap-2">
                                                                    <input type='range'
                                                                        value={parseFloat(currPage === "button" ? finalObj?.backgroundStyles[`${mobileCondition}button`]["width"] : finalObj?.backgroundStyles[`${mobileCondition}main`]?.[isMobile ? "maxWidth" : "width"])}
                                                                        className='w-100' onChange={e => {
                                                                            currPage === "button" ? updatePresent({ ...finalObj, backgroundStyles: { ...finalObj?.backgroundStyles, [`${mobileCondition}button`]: { ...finalObj?.backgroundStyles[`${mobileCondition}button`], [e.target.name]: `${e.target.value}${isMobile ? "%" : "px"}` } } }) : updatePresent({ ...finalObj, backgroundStyles: { ...finalObj?.backgroundStyles, [`${mobileCondition}main`]: { ...finalObj?.backgroundStyles[`${mobileCondition}main`], [e.target.name]: `${e.target.value}${isMobile ? "%" : "px"}` } } })
                                                                        }} name={currPage === "button" ? "width" : isMobile ? "maxWidth" : "width"} min="0" max={isMobile ? "100" : "800"} />
                                                                </div>
                                                            </div>
                                                            <div className=''>
                                                                <span className='fw-bolder text-black' style={{ fontSize: "0.7rem" }}>Min-Height: {finalObj?.backgroundStyles[`${mobileCondition}main`]?.minHeight}</span>
                                                                <div className="d-flex p-0 justify-content-between align-items-center gap-2">
                                                                    <input type='range' value={parseFloat(currPage === "button" ? finalObj?.backgroundStyles[`${mobileCondition}button`]?.minHeight : finalObj?.backgroundStyles[`${mobileCondition}main`]?.minHeight)} onChange={e => {
                                                                        currPage === "button" ? updatePresent({ ...finalObj, backgroundStyles: { ...finalObj?.backgroundStyles, [`${mobileCondition}button`]: { ...finalObj?.backgroundStyles[`${mobileCondition}button`], minHeight: `${e.target.value}px` } } }) : updatePresent({ ...finalObj, backgroundStyles: { ...finalObj.backgroundStyles, [`${mobileCondition}main`]: { ...finalObj?.backgroundStyles[`${mobileCondition}main`], minHeight: `${e.target.value}px` } } })
                                                                    }} className='w-100' name="height" min="0" max="800" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <p className='m-0 fw-bolder text-black text-uppercase' style={{ padding: "0.5rem 0px", fontSize: "0.75rem" }}>Border and Shadow</p>
                                                        {currPage === "button" ? <BorderChange pageCondition={pageCondition} type={`btnStyles`} mainStyle={finalObj} setMainStyle={updatePresent} mobileCondition={mobileCondition} /> : <BorderChange pageCondition={pageCondition} type={`bgStyles`} mainStyle={finalObj} setMainStyle={updatePresent} mobileCondition={mobileCondition} />}
                                                    </AccordionBody>
                                                </AccordionItem>
                                                <AccordionItem>
                                                    <AccordionHeader className='acc-header' targetId='2' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                                                        <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Spacing</label>
                                                    </AccordionHeader>
                                                    <AccordionBody accordionId='2'>
                                                        <p className='m-0 fw-bolder text-black text-uppercase' style={{ padding: "0.5rem 0px", fontSize: "0.75rem" }}>Spacing</p>
                                                        <div className='p-0 mx-0 my-1'>
                                                            <InputChange
                                                                getMDToggle={getMDToggle} parentType={currPage === "button" ? "btnStyles" : "bgStyles"} setMainStyle={updatePresent} mainStyle={finalObj} mobileCondition={mobileCondition} allValues={currPage === "button" ? finalObj?.backgroundStyles?.[`${mobileCondition}button`] : finalObj?.backgroundStyles?.[`${mobileCondition}main`]} type='padding' />
                                                        </div>
                                                        <div className='p-0 mx-0 my-1'>
                                                            <InputChange
                                                                getMDToggle={getMDToggle} parentType={currPage === "button" ? "btnStyles" : "bgStyles"} setMainStyle={updatePresent} mainStyle={finalObj} mobileCondition={mobileCondition} allValues={currPage === "button" ? finalObj?.backgroundStyles?.[`${mobileCondition}button`] : finalObj?.backgroundStyles?.[`${mobileCondition}main`]} type='margin' />
                                                        </div>
                                                    </AccordionBody>
                                                </AccordionItem>
                                            </UncontrolledAccordion>
                                        </div>}
                                        {/* Theme Section */}
                                        {/* Audience Section */}
                                        {sideNav === "audience" && <div style={{ transition: "0.3s ease-in-out", overflow: "hidden", width: "100%" }}>
                                            <UncontrolledAccordion defaultOpen={["1"]} stayOpen>
                                                <AccordionItem className='bg-white border-bottom'>
                                                    <AccordionHeader className='acc-header border-bottom' targetId='1'>
                                                        <p className='m-0 fw-bolder text-black text-uppercase' style={{ fontSize: "0.75rem" }}>Show Pop-up To</p>
                                                    </AccordionHeader>
                                                    <AccordionBody accordionId='1'>
                                                        <div className='p-0 mx-0 my-1'>
                                                            <div className="form-check mb-1">
                                                                <input type="radio" name='visitor_settings' checked={finalObj?.behaviour?.visitor_settings === "ALL_VISITORS"} onChange={e => {
                                                                    updatePresent({ ...finalObj, behaviour: { ...finalObj?.behaviour, visitor_settings: e.target.value } })
                                                                }} id='all' value={"ALL_VISITORS"} className="form-check-input cursor-pointer" /><label className="cursor-pointer" style={{ fontSize: "13px" }} htmlFor="all">All Visitors</label>
                                                            </div>
                                                            <div className="form-check mb-1">
                                                                <input type="radio" name='visitor_settings' checked={finalObj?.behaviour?.visitor_settings === "FIRST_VISITORS"} onChange={e => {
                                                                    updatePresent({ ...finalObj, behaviour: { ...finalObj?.behaviour, visitor_settings: e.target.value } })
                                                                }} id='first' value={"FIRST_VISITORS"} className="form-check-input cursor-pointer" /><label htmlFor="first" className="cursor-pointer" style={{ fontSize: "13px" }}>First-Time Visitors</label>
                                                            </div>
                                                            <div className="form-check mb-1">
                                                                <input type="radio" name='visitor_settings' checked={finalObj?.behaviour?.visitor_settings === "RETURNING_VISITORS"} onChange={e => {
                                                                    updatePresent({ ...finalObj, behaviour: { ...finalObj?.behaviour, visitor_settings: e.target.value } })
                                                                }} id='return' value={"RETURNING_VISITORS"} className="form-check-input cursor-pointer" /><label htmlFor="return" className="cursor-pointer" style={{ fontSize: "13px" }}>Returning Shoppers</label>
                                                            </div>
                                                            <div className="form-check mb-1">
                                                                <input type="radio" name='visitor_settings' checked={finalObj?.behaviour?.visitor_settings === "REGISTERED_USERS"} onChange={e => {
                                                                    updatePresent({ ...finalObj, behaviour: { ...finalObj?.behaviour, visitor_settings: e.target.value } })
                                                                }} id='registered' value={"REGISTERED_USERS"} className="form-check-input cursor-pointer" /><label htmlFor="registered" className="cursor-pointer" style={{ fontSize: "13px" }}>Registered Users</label>
                                                            </div>
                                                        </div>
                                                    </AccordionBody>
                                                </AccordionItem>
                                            </UncontrolledAccordion>
                                        </div>}
                                        {/* Audience Section */}
                                        {/* Display Section */}
                                        {sideNav === "display" && <div style={{ transition: "0.3s ease-in-out", overflowY: "auto", width: "100%" }}>
                                            <UncontrolledAccordion stayOpen>
                                                {/* Position */}
                                                <AccordionItem className='bg-white border-bottom'>
                                                    <AccordionHeader className='acc-header border-bottom' targetId='1'>
                                                        <p className='m-0 fw-bolder text-black text-uppercase' style={{ fontSize: "0.75rem" }}>Position</p>
                                                    </AccordionHeader>
                                                    <AccordionBody accordionId='1'>
                                                        <div className='d-flex flex-column justify-content-center align-items-center mt-1 mb-2'>
                                                            <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0 align-self-start mb-1">{currPage === "button" ? "Button" : "Pop-up"} position</label>
                                                            {!isMobile ? (
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 513 367.2" className='w-75'>
                                                                    <path fill="#b5b9ba" d="M210.8 312.3H302.20000000000005V362.36H210.8z" />
                                                                    <path fill="#8a9093" d="M154.2 362.3H358.79999999999995V367.2H154.2z" />
                                                                    <path fill="#929699" d="M210.8 312.3H302.20000000000005V330.8H210.8z" />
                                                                    <rect
                                                                        x={0.5}
                                                                        y={0.5}
                                                                        width={512}
                                                                        height={311.77}
                                                                        rx={22.5}
                                                                        ry={22.5}
                                                                        fill="#323233"
                                                                        stroke="#231f20"
                                                                        strokeMiterlimit={10}
                                                                    />
                                                                    <path
                                                                        d="M512 366a22.5 22.5 0 01-22.5 22.5h-467c-12.4 0 467-311.8 467-311.8A22.5 22.5 0 01512 99.2z"
                                                                        transform="translate(.5 -76.2)"
                                                                        fill="#2d2d2d" />
                                                                    <path fill="#fff" d="M22.2 21.1H490.8V289.43H22.2z" />
                                                                    <path
                                                                        d="M489.8 97.9v267.3H22.2V97.9h467.6m1-1H21.2v269.3h469.6V96.9z"
                                                                        transform="translate(.5 -76.2)"
                                                                        fill="#231f20"
                                                                    />
                                                                    <path
                                                                        d="M260.9 87.6a4.9 4.9 0 11-4.9-4.9 4.9 4.9 0 014.9 4.9z"
                                                                        transform="translate(.5 -76.2)"
                                                                        fill="#323031"
                                                                    />
                                                                    <path
                                                                        d="M258.2 87.6a2.2 2.2 0 01-4.4 0 2.2 2.2 0 014.4 0z"
                                                                        transform="translate(.5 -76.2)"
                                                                        fill="#231f20"
                                                                    />
                                                                    <g>
                                                                        <path
                                                                            onClick={() => updatePresent({ ...finalObj, positions: { ...finalObj?.positions, [pageCondition]: "TL" } })}
                                                                            style={{ cursor: "pointer", transition: "0.3s ease" }}
                                                                            fill={finalObj?.positions?.[`${mobileCondition}${pageCondition}`] === "TL" ? "#464646" : "#ffffff"}
                                                                            stroke="#231f20"
                                                                            strokeMiterlimit={10}
                                                                            className="mosaic"
                                                                            d="M22.8 21.7H178.60000000000002V110.8H22.8z"
                                                                        />
                                                                        <path
                                                                            onClick={() => updatePresent({ ...finalObj, positions: { ...finalObj?.positions, [pageCondition]: "TC" } })}
                                                                            style={{ cursor: "pointer", transition: "0.3s ease" }}
                                                                            fill={finalObj?.positions?.[`${mobileCondition}${pageCondition}`] === "TC" ? "#464646" : "#ffffff"}
                                                                            stroke="#231f20"
                                                                            strokeMiterlimit={10}
                                                                            className="mosaic"
                                                                            d="M178.6 21.7H334.4V110.8H178.6z"
                                                                        />
                                                                        <path
                                                                            onClick={() => updatePresent({ ...finalObj, positions: { ...finalObj?.positions, [pageCondition]: "TR" } })}
                                                                            style={{ cursor: "pointer", transition: "0.3s ease" }}
                                                                            fill={finalObj?.positions?.[`${mobileCondition}${pageCondition}`] === "TR" ? "#464646" : "#ffffff"}
                                                                            stroke="#231f20"
                                                                            strokeMiterlimit={10}
                                                                            className="mosaic"
                                                                            d="M334.4 21.7H490.2V110.8H334.4z"
                                                                        />
                                                                        <path
                                                                            onClick={() => updatePresent({ ...finalObj, positions: { ...finalObj?.positions, [pageCondition]: "ML" } })}
                                                                            style={{ cursor: "pointer", transition: "0.3s ease" }}
                                                                            fill={finalObj?.positions?.[`${mobileCondition}${pageCondition}`] === "ML" ? "#464646" : "#ffffff"}
                                                                            stroke="#231f20"
                                                                            strokeMiterlimit={10}
                                                                            className="mosaic"
                                                                            d="M22.8 110.8H178.60000000000002V199.89999999999998H22.8z"
                                                                        />
                                                                        <path
                                                                            onClick={() => updatePresent({ ...finalObj, positions: { ...finalObj?.positions, [pageCondition]: currPage !== "button" ? "MC" : finalObj?.positions?.[pageCondition] } })}
                                                                            style={{ cursor: "pointer", transition: "0.3s ease" }}
                                                                            fill={currPage === "button" ? "#cccccc" : finalObj?.positions?.[pageCondition] === "MC" ? "#464646" : "#ffffff"}
                                                                            stroke="#231f20"
                                                                            strokeMiterlimit={10}
                                                                            className="mosaic selected"
                                                                            d="M178.6 110.8H334.4V199.89999999999998H178.6z"
                                                                        />
                                                                        <path
                                                                            onClick={() => updatePresent({ ...finalObj, positions: { ...finalObj?.positions, [pageCondition]: "MR" } })}
                                                                            style={{ cursor: "pointer", transition: "0.3s ease" }}
                                                                            fill={finalObj?.positions?.[`${mobileCondition}${pageCondition}`] === "MR" ? "#464646" : "#ffffff"}
                                                                            stroke="#231f20"
                                                                            strokeMiterlimit={10}
                                                                            className="mosaic"
                                                                            d="M334.4 110.8H490.2V199.89999999999998H334.4z"
                                                                        />
                                                                        <path
                                                                            onClick={() => updatePresent({ ...finalObj, positions: { ...finalObj?.positions, [pageCondition]: "BL" } })}
                                                                            style={{ cursor: "pointer", transition: "0.3s ease" }}
                                                                            fill={finalObj?.positions?.[`${mobileCondition}${pageCondition}`] === "BL" ? "#464646" : "#ffffff"}
                                                                            stroke="#231f20"
                                                                            strokeMiterlimit={10}
                                                                            className="mosaic"
                                                                            d="M22.8 199.9H178.60000000000002V289H22.8z"
                                                                        />
                                                                        <path
                                                                            onClick={() => updatePresent({ ...finalObj, positions: { ...finalObj?.positions, [pageCondition]: "BC" } })}
                                                                            style={{ cursor: "pointer", transition: "0.3s ease" }}
                                                                            fill={finalObj?.positions?.[`${mobileCondition}${pageCondition}`] === "BC" ? "#464646" : "#ffffff"}
                                                                            stroke="#231f20"
                                                                            strokeMiterlimit={10}
                                                                            className="mosaic"
                                                                            d="M178.6 199.9H334.4V289H178.6z"
                                                                        />
                                                                        <path
                                                                            onClick={() => updatePresent({ ...finalObj, positions: { ...finalObj?.positions, [pageCondition]: "BR" } })}
                                                                            style={{ cursor: "pointer", transition: "0.3s ease" }}
                                                                            fill={finalObj?.positions?.[`${mobileCondition}${pageCondition}`] === "BR" ? "#464646" : "#ffffff"}
                                                                            stroke="#231f20"
                                                                            strokeMiterlimit={10}
                                                                            className="mosaic"
                                                                            d="M334.4 199.9H490.2V289H334.4z"
                                                                        />
                                                                    </g>
                                                                </svg>
                                                            ) : currPage !== "button" ? (
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 184.45 367.2"
                                                                    style={{ width: "75px" }}
                                                                    property="globalStyle.overlay.mobilePosition"
                                                                >
                                                                    <g id="mobile-position">
                                                                        <rect x="11.76" y="239.71" width="162.2" height="116.24" onClick={() => updatePresent({ ...finalObj, positions: { ...finalObj?.positions, [`${mobileCondition}${pageCondition}`]: "BC" } })} style={{ cursor: "pointer", transition: "0.3s ease" }} stroke="#231f20" fill={finalObj?.positions?.[`${mobileCondition}${pageCondition}`] === "BC" ? "#464646" : "#ffffff"} />
                                                                        <rect x="11.99" y="124.46" width="162.2" height="116.24" onClick={() => updatePresent({ ...finalObj, positions: { ...finalObj?.positions, [`${mobileCondition}${pageCondition}`]: "MC" } })} style={{ cursor: "pointer", transition: "0.3s ease" }} stroke="#231f20" fill={finalObj?.positions?.[`${mobileCondition}${pageCondition}`] === "MC" ? "#464646" : "#ffffff"} />
                                                                        <rect x="11.61" y="9.2" width="162.2" height="116.24" onClick={() => updatePresent({ ...finalObj, positions: { ...finalObj?.positions, [`${mobileCondition}${pageCondition}`]: "TC" } })} style={{ cursor: "pointer", transition: "0.3s ease" }} stroke="#231f20" fill={finalObj?.positions?.[`${mobileCondition}${pageCondition}`] === "TC" ? "#464646" : "#ffffff"} />
                                                                    </g>
                                                                    <path
                                                                        fill="#58595b"
                                                                        d="M182.49,26.65A26.65,26.65,0,0,0,155.84,0H28.61A26.65,26.65,0,0,0,2,26.65v313.9A26.65,26.65,0,0,0,28.61,367.2H155.84a26.65,26.65,0,0,0,26.65-26.65ZM178.4,340.29a22.82,22.82,0,0,1-22.82,22.82H28.36A22.82,22.82,0,0,1,5.54,340.29V26.4A22.82,22.82,0,0,1,28.36,3.58H155.58A22.82,22.82,0,0,1,178.4,26.4Z"
                                                                    />
                                                                    <path
                                                                        d="M2,48.47H1.72A1.72,1.72,0,0,0,0,50.19V60.65a1.71,1.71,0,0,0,1.72,1.71H2"
                                                                    />
                                                                    <path
                                                                        d="M182.49,126.27h0a2,2,0,0,0,2-2V85.48a2,2,0,0,0-2-2h0"
                                                                    />
                                                                    <path
                                                                        d="M2,75.21H2a2,2,0,0,0-2,2V99.25a2,2,0,0,0,2,2H2"
                                                                    />
                                                                    <path
                                                                        d="M2,108.58H2a2,2,0,0,0-2,2v22.08a2,2,0,0,0,2,2H2"
                                                                    />
                                                                    <path
                                                                        fill="#231f20"
                                                                        d="M178.4,26.4A22.82,22.82,0,0,0,155.58,3.58H28.36A22.82,22.82,0,0,0,5.54,26.4V340.29a22.82,22.82,0,0,0,22.82,22.82H155.58a22.82,22.82,0,0,0,22.82-22.82ZM113.31,12.54a2.24,2.24,0,1,1-2.24-2.23A2.24,2.24,0,0,1,113.31,12.54ZM82.88,11.25h19.94a1.4,1.4,0,0,1,1.54,1.28,1.4,1.4,0,0,1-1.54,1.28H82.88a1.4,1.4,0,0,1-1.54-1.28A1.4,1.4,0,0,1,82.88,11.25Zm89.89,328.42c0,8.93-7.48,15.77-16.41,15.77H29a15.53,15.53,0,0,1-15.81-15.77V26A16,16,0,0,1,29,9.72H43.74c3.11,0,4.26,0,4.45,4,.2,4.1,3,6.33,6.82,7.53a14,14,0,0,0,4.1.27H126.4a14.07,14.07,0,0,0,4.11-.17c3.81-1.2,6.62-3.63,6.82-7.72s1.33-3.87,4.45-3.87h14.58A16.5,16.5,0,0,1,172.77,26Z"
                                                                    />
                                                                    <circle cx="111.07" cy="12.54" r="2.24" />
                                                                    <path d="M82.88,13.81h19.94a1.4,1.4,0,0,0,1.54-1.28,1.4,1.4,0,0,0-1.54-1.28H82.88a1.4,1.4,0,0,0-1.54,1.28A1.4,1.4,0,0,0,82.88,13.81Z" />
                                                                </svg>
                                                            ) : (
                                                                <svg style={{ width: "75px" }} viewBox="0 0 185 368" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <g clip-path="url(#clip0_0_1)">
                                                                        <path d="M174 258H120V356H174V258Z" stroke="#231F20" fill={finalObj?.positions?.[`${mobileCondition}${pageCondition}`] === "BR" ? "#464646" : "white"} style={{ cursor: "pointer", transition: "0.3s ease" }} onClick={() => updatePresent({ ...finalObj, positions: { ...finalObj?.positions, [`${mobileCondition}${pageCondition}`]: "BR" } })} />
                                                                        <path d="M120 258H66V356H120V258Z" stroke="#231F20" fill={finalObj?.positions?.[`${mobileCondition}${pageCondition}`] === "BC" ? "#464646" : "white"} style={{ cursor: "pointer", transition: "0.3s ease" }} onClick={() => updatePresent({ ...finalObj, positions: { ...finalObj?.positions, [`${mobileCondition}${pageCondition}`]: "BC" } })} />
                                                                        <path d="M66 258H12V356H66V258Z" stroke="#231F20" fill={finalObj?.positions?.[`${mobileCondition}${pageCondition}`] === "BL" ? "#464646" : "white"} style={{ cursor: "pointer", transition: "0.3s ease" }} onClick={() => updatePresent({ ...finalObj, positions: { ...finalObj?.positions, [`${mobileCondition}${pageCondition}`]: "BL" } })} />
                                                                        <path d="M174 108H120V258H174V108Z" stroke="#231F20" fill={finalObj?.positions?.[`${mobileCondition}${pageCondition}`] === "MR" ? "#464646" : "white"} style={{ cursor: "pointer", transition: "0.3s ease" }} onClick={() => updatePresent({ ...finalObj, positions: { ...finalObj?.positions, [`${mobileCondition}${pageCondition}`]: "MR" } })} />
                                                                        <path d="M120 108H66V258H120V108Z" stroke="#231F20" fill={"#cccccc"} style={{ cursor: "pointer", transition: "0.3s ease" }} />
                                                                        <path d="M66 108H12V258H66V108Z" fill={finalObj?.positions?.[`${mobileCondition}${pageCondition}`] === "ML" ? "#464646" : "white"} style={{ cursor: "pointer", transition: "0.3s ease" }} stroke="#231F20" onClick={() => updatePresent({ ...finalObj, positions: { ...finalObj?.positions, [`${mobileCondition}${pageCondition}`]: "ML" } })} />
                                                                        <path d="M174 9H120V108H174V9Z" fill={finalObj?.positions?.[`${mobileCondition}${pageCondition}`] === "TR" ? "#464646" : "white"} style={{ cursor: "pointer", transition: "0.3s ease" }} stroke="#231F20" onClick={() => updatePresent({ ...finalObj, positions: { ...finalObj?.positions, [`${mobileCondition}${pageCondition}`]: "TR" } })} />
                                                                        <path d="M120 9H66V108H120V9Z" fill={finalObj?.positions?.[`${mobileCondition}${pageCondition}`] === "TC" ? "#464646" : "white"} style={{ cursor: "pointer", transition: "0.3s ease" }} stroke="#231F20" onClick={() => updatePresent({ ...finalObj, positions: { ...finalObj?.positions, [`${mobileCondition}${pageCondition}`]: "TC" } })} />
                                                                        <path d="M66 9H12V108H66V9Z" fill={finalObj?.positions?.[`${mobileCondition}${pageCondition}`] === "TL" ? "#464646" : "white"} style={{ cursor: "pointer", transition: "0.3s ease" }} stroke="#231F20" onClick={() => updatePresent({ ...finalObj, positions: { ...finalObj?.positions, [`${mobileCondition}${pageCondition}`]: "TL" } })} />
                                                                        <path fill="#58595B" d="M182.49 26.65C182.49 19.582 179.682 12.8034 174.684 7.8056C169.687 2.80776 162.908 0 155.84 0L28.61 0C21.5489 0.0105983 14.7807 2.82304 9.79146 7.81973C4.80226 12.8164 1.99999 19.5889 2 26.65V340.55C1.99999 347.611 4.80226 354.384 9.79146 359.38C14.7807 364.377 21.5489 367.189 28.61 367.2H155.84C162.908 367.2 169.687 364.392 174.684 359.394C179.682 354.397 182.49 347.618 182.49 340.55V26.65ZM178.4 340.29C178.4 346.342 175.996 352.147 171.716 356.426C167.437 360.706 161.632 363.11 155.58 363.11H28.36C22.3078 363.11 16.5034 360.706 12.2238 356.426C7.94424 352.147 5.54 346.342 5.54 340.29V26.4C5.54 20.3478 7.94424 14.5434 12.2238 10.2638C16.5034 5.98424 22.3078 3.58 28.36 3.58H155.58C161.632 3.58 167.437 5.98424 171.716 10.2638C175.996 14.5434 178.4 20.3478 178.4 26.4V340.29Z" />
                                                                        <path d="M2 48.47H1.72C1.26383 48.47 0.826339 48.6512 0.503776 48.9737C0.181214 49.2963 2.50017e-10 49.7338 2.50017e-10 50.19L2.50017e-10 60.65C-3.85403e-06 60.8754 0.0445558 61.0986 0.131116 61.3067C0.217676 61.5148 0.344529 61.7038 0.504378 61.8627C0.664227 62.0216 0.853918 62.1473 1.06254 62.2327C1.27116 62.318 1.4946 62.3613 1.72 62.36H2" fill="black" />
                                                                        <path d="M182.49 126.27C183.02 126.27 183.529 126.059 183.904 125.684C184.279 125.309 184.49 124.8 184.49 124.27V85.48C184.49 84.9495 184.279 84.4408 183.904 84.0658C183.529 83.6907 183.02 83.48 182.49 83.48" fill="black" />
                                                                        <path d="M2 75.21C1.46957 75.21 0.960859 75.4207 0.585786 75.7958C0.210714 76.1709 0 76.6796 0 77.21L0 99.25C0 99.7805 0.210714 100.289 0.585786 100.664C0.960859 101.039 1.46957 101.25 2 101.25" fill="black" />
                                                                        <path d="M2 108.58C1.46957 108.58 0.960859 108.791 0.585786 109.166C0.210714 109.541 0 110.05 0 110.58L0 132.66C0 133.19 0.210714 133.699 0.585786 134.074C0.960859 134.449 1.46957 134.66 2 134.66" fill="black" />
                                                                        <path d="M178.4 26.4C178.4 20.3478 175.996 14.5434 171.716 10.2638C167.437 5.98426 161.632 3.58002 155.58 3.58002H28.36C22.3077 3.58002 16.5034 5.98426 12.2238 10.2638C7.94422 14.5434 5.53998 20.3478 5.53998 26.4V340.29C5.53998 346.342 7.94422 352.147 12.2238 356.426C16.5034 360.706 22.3077 363.11 28.36 363.11H155.58C161.632 363.11 167.437 360.706 171.716 356.426C175.996 352.147 178.4 346.342 178.4 340.29V26.4ZM113.31 12.54C113.312 12.9835 113.182 13.4175 112.937 13.7872C112.692 14.1569 112.343 14.4455 111.934 14.6166C111.525 14.7877 111.074 14.8335 110.639 14.7482C110.204 14.6629 109.804 14.4503 109.49 14.1375C109.175 13.8246 108.961 13.4255 108.874 12.9907C108.787 12.5559 108.83 12.105 109 11.6951C109.169 11.2852 109.456 10.9348 109.824 10.6882C110.193 10.4417 110.627 10.31 111.07 10.31C111.662 10.31 112.231 10.5446 112.65 10.9626C113.07 11.3805 113.307 11.9477 113.31 12.54ZM82.88 11.25H102.82C103.006 11.2308 103.193 11.2488 103.372 11.303C103.55 11.3573 103.716 11.4466 103.859 11.5659C104.003 11.6851 104.121 11.8318 104.207 11.9974C104.293 12.163 104.345 12.3441 104.36 12.53C104.345 12.716 104.293 12.897 104.207 13.0626C104.121 13.2282 104.003 13.3749 103.859 13.4942C103.716 13.6134 103.55 13.7028 103.372 13.757C103.193 13.8113 103.006 13.8293 102.82 13.81H82.88C82.6944 13.8293 82.5069 13.8113 82.3284 13.757C82.1499 13.7028 81.984 13.6134 81.8406 13.4942C81.6971 13.3749 81.5789 13.2282 81.4929 13.0626C81.407 12.897 81.355 12.716 81.34 12.53C81.355 12.3441 81.407 12.163 81.4929 11.9974C81.5789 11.8318 81.6971 11.6851 81.8406 11.5659C81.984 11.4466 82.1499 11.3573 82.3284 11.303C82.5069 11.2488 82.6944 11.2308 82.88 11.25ZM172.77 339.67C172.77 348.6 165.29 355.44 156.36 355.44H29C26.9168 355.478 24.8472 355.096 22.9146 354.317C20.982 353.539 19.2258 352.379 17.7506 350.908C16.2755 349.436 15.1115 347.683 14.328 345.753C13.5444 343.822 13.1574 341.753 13.19 339.67V26C13.1529 23.8913 13.5331 21.7961 14.3087 19.8349C15.0843 17.8736 16.24 16.0851 17.7093 14.5721C19.1786 13.0591 20.9326 11.8516 22.8702 11.0188C24.8079 10.1861 26.8911 9.74474 29 9.72002H43.74C46.85 9.72002 48 9.72002 48.19 13.72C48.39 17.82 51.19 20.05 55.01 21.25C56.3559 21.5412 57.7375 21.6322 59.11 21.52H126.4C127.771 21.665 129.156 21.6077 130.51 21.35C134.32 20.15 137.13 17.72 137.33 13.63C137.53 9.54002 138.66 9.76002 141.78 9.76002H156.36C160.676 9.78302 164.811 11.4961 167.878 14.5319C170.946 17.5678 172.702 21.6847 172.77 26V339.67Z" fill="#231F20" />
                                                                        <path d="M111.07 14.78C112.307 14.78 113.31 13.7771 113.31 12.54C113.31 11.3029 112.307 10.3 111.07 10.3C109.833 10.3 108.83 11.3029 108.83 12.54C108.83 13.7771 109.833 14.78 111.07 14.78Z" fill="black" />
                                                                        <path d="M82.88 13.81H102.82C103.006 13.8292 103.193 13.8112 103.372 13.757C103.55 13.7027 103.716 13.6134 103.859 13.4941C104.003 13.3749 104.121 13.2281 104.207 13.0626C104.293 12.897 104.345 12.7159 104.36 12.53C104.345 12.344 104.293 12.1629 104.207 11.9974C104.121 11.8318 104.003 11.6851 103.859 11.5658C103.716 11.4466 103.55 11.3572 103.372 11.303C103.193 11.2487 103.006 11.2307 102.82 11.25H82.88C82.6944 11.2307 82.5069 11.2487 82.3284 11.303C82.1499 11.3572 81.9841 11.4466 81.8406 11.5658C81.6971 11.6851 81.5789 11.8318 81.493 11.9974C81.407 12.1629 81.355 12.344 81.34 12.53C81.355 12.7159 81.407 12.897 81.493 13.0626C81.5789 13.2281 81.6971 13.3749 81.8406 13.4941C81.9841 13.6134 82.1499 13.7027 82.3284 13.757C82.5069 13.8112 82.6944 13.8292 82.88 13.81Z" fill="black" />
                                                                    </g>
                                                                    <defs>
                                                                        <clipPath id="clip0_0_1">
                                                                            <rect width="184.45" height="367.2" fill="white" />
                                                                        </clipPath>
                                                                    </defs>
                                                                </svg>
                                                            )
                                                            }
                                                        </div>
                                                        {currPage === "button" && <div className='p-0 mx-0 mt-1 mb-2'>
                                                            <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Edge spacing</label>
                                                            <InputChange
                                                                getMDToggle={getMDToggle} parentType="btnStyles" setMainStyle={updatePresent} mainStyle={finalObj} mobileCondition={mobileCondition} hideLabel allValues={finalObj?.backgroundStyles[`${mobileCondition}button`]} type='margin' />
                                                        </div>}
                                                    </AccordionBody>
                                                </AccordionItem>
                                                {/* Position */}
                                                {/* Website Overlay */}
                                                <AccordionItem className='bg-white border-bottom'>
                                                    <AccordionHeader className='acc-header border-bottom' targetId='2'>
                                                        <p className='m-0 fw-bolder text-black text-uppercase' style={{ fontSize: "0.75rem" }}>Overlay</p>
                                                    </AccordionHeader>
                                                    <AccordionBody accordionId='2'>
                                                        <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Background</label>
                                                        <div className='cursor-pointer' style={{ backgroundImage: `url(${pixels})` }}>
                                                            <div className="p-1 rounded border" style={{ ...finalObj?.overlayStyles, backgroundImage: finalObj?.overlayStyles?.backgroundImage }} onClick={() => setBgModal(!bgModal)}></div>
                                                        </div>
                                                    </AccordionBody>
                                                </AccordionItem>
                                                {/* Website Overlay */}
                                                {/* Popup Visibility */}
                                                <AccordionItem className='bg-white border-bottom d-none'>
                                                    <AccordionHeader className='acc-header border-bottom' targetId='3'>
                                                        <p className='m-0 fw-bolder text-black text-uppercase' style={{ fontSize: "0.75rem" }}>Pop-up behaviour</p>
                                                    </AccordionHeader>
                                                    <AccordionBody accordionId='3'>
                                                        <div className='p-0 mx-0 my-2'>
                                                            <Select value={visibleOnOptions?.filter(item => finalObj?.behaviour?.pop_up_load_type === item?.value)} onChange={e => {
                                                                updatePresent({ ...finalObj, behaviour: { ...finalObj.behaviour, pop_up_load_type: e.value, pop_up_load_value: "0" } })
                                                            }} options={visibleOnOptions} />
                                                        </div>
                                                        {finalObj.behaviour.pop_up_load_type === "scroll" && (
                                                            <div className="my-2">
                                                                <label style={{ fontSize: "12px" }} htmlFor="">Your pop up will be visible after scrolling {finalObj?.behaviour?.pop_up_load_value}% of the page</label>
                                                                <input type="range" step={10} min={0} max={100} value={finalObj.behaviour.pop_up_load_value} onChange={e => {
                                                                    updatePresent({ ...finalObj, behaviour: { ...finalObj.behaviour, pop_up_load_value: e.target.value } })
                                                                }} style={{ accentColor: "#727272" }} className='w-100 mt-1' />
                                                            </div>
                                                        )}
                                                        {finalObj.behaviour.pop_up_load_type === "delay" && (
                                                            <div className="my-2">
                                                                <label style={{ fontSize: "12px" }} htmlFor="">Your pop up will be visible {finalObj?.behaviour?.pop_up_load_value} seconds of loading</label>
                                                                <input type="range" min={0} max={120} value={finalObj?.behaviour?.pop_up_load_value} onChange={e => {
                                                                    updatePresent({ ...finalObj, behaviour: { ...finalObj?.behaviour, pop_up_load_value: e.target.value } })
                                                                }} style={{ accentColor: "#727272" }} className='w-100 mt-1' />
                                                            </div>
                                                        )}
                                                        {(finalObj?.behaviour?.pop_up_load_type === "scroll" || finalObj?.behaviour?.pop_up_load_type === "delay") && (
                                                            <div className='p-0 mx-0 my-1'>
                                                                <label htmlFor="" className='form-control-label' style={{ fontSize: "0.85rem" }} >Pop-up frequency: (appears {finalObj?.behaviour?.frequency ? finalObj?.behaviour?.frequency : "1"} time(s))</label>
                                                                <input value={finalObj?.behaviour?.frequency || 1} min={1} max={10} type="range" className='w-100' onChange={e => {
                                                                    updatePresent({ ...finalObj, behaviour: { ...finalObj?.behaviour, frequency: e.target.value } })
                                                                }} />
                                                            </div>
                                                        )}
                                                    </AccordionBody>
                                                </AccordionItem>
                                                {/* Popup Visibility */}
                                                {/* Pop up Active status */}
                                                <AccordionItem className='bg-white border-bottom d-none'>
                                                    <AccordionHeader className='acc-header border-bottom' targetId='4'>
                                                        <p className='m-0 fw-bolder text-black text-uppercase' style={{ fontSize: "0.75rem" }}>Visible on</p>
                                                    </AccordionHeader>
                                                    <AccordionBody accordionId='4'>
                                                        <div className='p-0 mx-0 my-2'>
                                                            <div className="row">
                                                                {pagesSelection?.map((ele, key) => {
                                                                    return (
                                                                        <div key={key} className="col-md-6 d-flex gap-2 align-items-start">
                                                                            <input
                                                                                checked={finalObj?.behaviour?.PAGES?.includes(ele?.value)}
                                                                                className="d-none" value={ele?.value} onChange={addPage} type='checkbox' id={`page-${key}`} />
                                                                            <label style={{ cursor: 'pointer' }} htmlFor={`page-${key}`} className="mb-2 text-capitalize d-flex flex-column align-items-center w-100 position-relative">
                                                                                <div className="position-relative w-50 d-flex justify-content-center align-items-center">
                                                                                    <div className="position-absolute w-100" style={{ inset: "0px", outline: finalObj?.behaviour?.PAGES?.includes(ele.value) ? `1.5px solid rgba(0,0,0,1)` : `0px solid rgba(0,0,0,0)`, aspectRatio: "1", scale: finalObj?.behaviour?.PAGES?.includes(ele.value) ? "1.15" : "1.25", zIndex: "99999999", backgroundColor: `rgba(255,255,255,${finalObj?.behaviour?.PAGES?.includes(ele.value) ? "0" : "0.5"})`, transition: "0.3s ease-in-out" }}></div>
                                                                                    <img width="100%" style={{ transition: '0.25s ease' }}
                                                                                        className={`mb-2`} src={`${xircls_url}/plugin_other_images/icons/${ele.value === "custom_page" ? "all_pages" : ele.value}.png`}
                                                                                        alt='no img' />
                                                                                </div>
                                                                                <span className={`${finalObj?.behaviour?.PAGES?.includes(ele.value) ? "text-black" : ""} fw-bolder`} style={{ fontSize: '75%', textAlign: "center" }}>{ele?.label}</span>
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                            {finalObj?.behaviour?.PAGES?.includes("custom_page") && <div className="row mt-2">
                                                                <label htmlFor="" className='mb-1' style={{ fontSize: "12px" }}>Custom URLs:</label>
                                                                {finalObj?.behaviour?.CUSTOM_PAGE_LINK?.map((ele, key) => {
                                                                    return (
                                                                        <div className="col-12" key={key}>
                                                                            <div className="p-0 position-relative d-flex align-items-center mb-1">
                                                                                <input style={{ fontSize: "12px" }} onChange={e => {
                                                                                    const newObj = { ...finalObj }
                                                                                    newObj.behaviour.CUSTOM_PAGE_LINK[key] = e.target.value
                                                                                    updatePresent(newObj)
                                                                                }} value={ele} className='form-control' type="text" placeholder={`www.url-example${key + 1}.com`} />{finalObj.behaviour.CUSTOM_PAGE_LINK.length > 1 && <span onClick={() => {
                                                                                    const newObj = { ...finalObj }
                                                                                    newObj?.behaviour?.CUSTOM_PAGE_LINK?.splice(key, 1)
                                                                                    updatePresent(newObj)
                                                                                }} className="d-flex justify-content-center alignn-items-center position-absolute end-0 p-1 cursor-pointer"><Trash stroke='red' size={12.5} /></span>}
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })}
                                                                {finalObj.behaviour.CUSTOM_PAGE_LINK.length < 6 && <div className="col-12">
                                                                    <button onClick={() => {
                                                                        const newObj = { ...finalObj }
                                                                        newObj.behaviour.CUSTOM_PAGE_LINK = [...finalObj.behaviour.CUSTOM_PAGE_LINK, ""]
                                                                        updatePresent(newObj)
                                                                    }} style={{ padding: "5px" }} className="btn btn-dark w-100"><PlusCircle color='white' size={17.5} /></button>
                                                                </div>}
                                                            </div>}
                                                        </div>
                                                    </AccordionBody>
                                                </AccordionItem>
                                                {/* Pop up Active status */}
                                            </UncontrolledAccordion>
                                        </div>}
                                        {/* Display Section */}
                                        {/* Trigger section */}
                                        {sideNav === "trigger" && <div style={{ transition: "0.3s ease-in-out", overflow: "hidden", width: "100%" }}>
                                            <div className="px-1">
                                                <div className='p-0 mx-0 my-2'>
                                                    <Select value={visibleOnOptions?.filter(item => finalObj?.behaviour?.pop_up_load_type === item?.value)} onChange={e => {
                                                        updatePresent({ ...finalObj, behaviour: { ...finalObj.behaviour, pop_up_load_type: e.value, pop_up_load_value: "0" } })
                                                    }} options={visibleOnOptions} />
                                                </div>
                                                {finalObj.behaviour.pop_up_load_type === "scroll" && (
                                                    <div className="my-2">
                                                        <label style={{ fontSize: "12px" }} htmlFor="">Your pop up will be visible after scrolling {finalObj?.behaviour?.pop_up_load_value}% of the page</label>
                                                        <input type="range" step={10} min={0} max={100} value={finalObj.behaviour.pop_up_load_value} onChange={e => {
                                                            updatePresent({ ...finalObj, behaviour: { ...finalObj.behaviour, pop_up_load_value: e.target.value } })
                                                        }} style={{ accentColor: "#727272" }} className='w-100 mt-1' />
                                                    </div>
                                                )}
                                                {finalObj.behaviour.pop_up_load_type === "delay" && (
                                                    <div className="my-2">
                                                        <label style={{ fontSize: "12px" }} htmlFor="">Your pop up will be visible {finalObj?.behaviour?.pop_up_load_value} seconds of loading</label>
                                                        <input type="range" min={0} max={120} value={finalObj?.behaviour?.pop_up_load_value} onChange={e => {
                                                            updatePresent({ ...finalObj, behaviour: { ...finalObj?.behaviour, pop_up_load_value: e.target.value } })
                                                        }} style={{ accentColor: "#727272" }} className='w-100 mt-1' />
                                                    </div>
                                                )}
                                                {(finalObj?.behaviour?.pop_up_load_type === "scroll" || finalObj?.behaviour?.pop_up_load_type === "delay") && (
                                                    <div className='p-0 mx-0 my-1'>
                                                        <label htmlFor="" className='form-control-label' style={{ fontSize: "0.85rem" }} >Pop-up frequency: (appears {finalObj?.behaviour?.frequency ? finalObj?.behaviour?.frequency : "1"} time(s))</label>
                                                        <input value={finalObj?.behaviour?.frequency || 1} min={1} max={10} type="range" className='w-100' onChange={e => {
                                                            updatePresent({ ...finalObj, behaviour: { ...finalObj?.behaviour, frequency: e.target.value } })
                                                        }} />
                                                    </div>
                                                )}
                                            </div>
                                        </div>}
                                        {/* Trigger section */}
                                        {/* Elements section */}
                                        {sideNav === "add-elements" && <div className={`px-1`} style={{ transition: "0.3s ease-in-out", overflow: "auto", width: "100%" }}>
                                            <p className='m-0 fw-bolder text-black text-uppercase' style={{ padding: "0.5rem 0.5rem 0px", fontSize: "0.75rem" }}>Basic Elements</p>
                                            <div className="toggleSection d-flex align-items-stretch justify-content-start mb-1" style={{ flexWrap: "wrap" }}>
                                                {/* {getElementJsx({ draggable: true, dragStartFunc: (e) => handleDragStart(e, "text", "type"), icon: <Type size={17.5} />, label: "Text" })} */}
                                                <div style={{ width: `33.3333%`, padding: "0.35rem", height: "100%" }}>
                                                    <div title='Drag to add to your pop-up' draggable onDragStart={(e) => handleDragStart(e, "text", "type")} className="border rounded w-100 d-flex flex-column justify-content-between align-items-center p-1 h-100" style={{ aspectRatio: "1", cursor: "grab", gap: "1rem" }}>
                                                        <span className="bg-light-secondary d-flex justify-content-center align-items-center rounded" style={{ padding: "0.75rem", aspectRatio: "1" }}>
                                                            <Type color="#727272" size={12.5} />
                                                        </span>
                                                        <span className='text-black text-center' style={{ fontSize: "11px" }}>Text</span>
                                                        {/* <svg
                                                            width={"35%"}
                                                            viewBox="0 0 67 28"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <circle cx={5} cy={5} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={24} cy={5} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={43} cy={5} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={62} cy={5} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={5} cy={23} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={24} cy={23} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={43} cy={23} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={62} cy={23} r={3.5} stroke="#727272" strokeWidth={3} />
                                                        </svg> */}
                                                    </div>
                                                </div>
                                                <div style={{ width: `33.3333%`, padding: "0.35rem", height: "100%" }}>
                                                    <div title='Drag to add to your pop-up' draggable onDragStart={(e) => handleDragStart(e, "image")} className="border rounded w-100 d-flex flex-column justify-content-between align-items-center p-1 h-100" style={{ aspectRatio: "1", cursor: "grab", gap: "1rem" }}>
                                                        <span className="bg-light-secondary d-flex justify-content-center align-items-center rounded" style={{ padding: "0.75rem", aspectRatio: "1" }}>
                                                            <Image color="#727272" size={12.5} />
                                                        </span>
                                                        <span className='text-black text-center' style={{ fontSize: "11px" }}>Image</span>
                                                        {/* <svg
                                                            width={"35%"}
                                                            viewBox="0 0 67 28"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <circle cx={5} cy={5} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={24} cy={5} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={43} cy={5} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={62} cy={5} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={5} cy={23} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={24} cy={23} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={43} cy={23} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={62} cy={23} r={3.5} stroke="#727272" strokeWidth={3} />
                                                        </svg> */}
                                                    </div>
                                                </div>
                                                <div style={{ width: `33.3333%`, padding: "0.35rem", height: "100%" }}>
                                                    <div title='Drag to add to your pop-up' draggable onDragStart={(e) => handleDragStart(e, "button")} className="border rounded w-100 d-flex flex-column justify-content-between align-items-center p-1 h-100" style={{ aspectRatio: "1", cursor: "grab", gap: "1rem" }}>
                                                        <span className="bg-light-secondary d-flex justify-content-center align-items-center rounded" style={{ padding: "0.75rem", aspectRatio: "1" }}>
                                                            <Square color="#727272" fill={`#727272`} style={{ transform: `scaleX(2)` }} size={12.5} />
                                                        </span>
                                                        <span className='text-black text-center' style={{ fontSize: "11px" }}>Button</span>
                                                        {/* <svg
                                                            width={"35%"}
                                                            viewBox="0 0 67 28"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <circle cx={5} cy={5} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={24} cy={5} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={43} cy={5} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={62} cy={5} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={5} cy={23} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={24} cy={23} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={43} cy={23} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={62} cy={23} r={3.5} stroke="#727272" strokeWidth={3} />
                                                        </svg> */}
                                                    </div>
                                                </div>
                                            </div>
                                            <p className='m-0 fw-bolder text-black text-uppercase' style={{ padding: "0.5rem 0.5rem 0px", fontSize: "0.75rem" }}>Input Elements</p>
                                            <div className="toggleSection d-flex flex-wrap align-items-stretch justify-content-start mb-1">
                                                <div style={{ width: `33.3333%`, padding: "0.35rem", height: "100%" }}>
                                                    <div title={!disableIpDrag.includes("firstName") ? 'Drag to add to your pop-up' : 'Cannot drag this element if this already exists on page'} draggable={!disableIpDrag.includes("firstName")} onDragStart={(e) => handleDragStart(e, "input", "firstName")} className={`border rounded text-black w-100 d-flex flex-column justify-content-between align-items-center p-1`} style={{ aspectRatio: "1", cursor: !disableIpDrag.includes("firstName") ? "grab" : "default", gap: "1rem" }}>
                                                        <span className="bg-light-secondary d-flex justify-content-center align-items-center rounded" style={{ padding: "0.75rem", aspectRatio: "1" }}>
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 52 52"
                                                                width={15}
                                                            >
                                                                <path
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M44 17H8a2 2 0 00-2 2v14a2 2 0 002 2h36a2 2 0 002-2V19a2 2 0 00-2-2zM8 15a4 4 0 00-4 4v14a4 4 0 004 4h36a4 4 0 004-4V19a4 4 0 00-4-4H8z"
                                                                    fill="#727272"
                                                                />
                                                                <path
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M10 20a1 1 0 011 1v10a1 1 0 11-2 0V21a1 1 0 011-1z"
                                                                    fill="#727272"
                                                                />
                                                            </svg>
                                                        </span>
                                                        <span className='text-black text-center' style={{ fontSize: "11px" }}>First name</span>
                                                        {/* <svg
                                                            width={"35%"}
                                                            viewBox="0 0 67 28"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <circle cx={5} cy={5} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={24} cy={5} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={43} cy={5} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={62} cy={5} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={5} cy={23} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={24} cy={23} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={43} cy={23} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={62} cy={23} r={3.5} stroke="#727272" strokeWidth={3} />
                                                        </svg> */}
                                                    </div>
                                                </div>
                                                <div style={{ width: `33.3333%`, padding: "0.35rem", height: "100%" }}>
                                                    <div title={!disableIpDrag.includes("lastName") ? 'Drag to add to your pop-up' : 'Cannot drag this element if this already exists on page'} draggable={!disableIpDrag.includes("lastName")} onDragStart={(e) => handleDragStart(e, "input", "lastName")} className={`border rounded text-black w-100 d-flex flex-column justify-content-between align-items-center p-1`} style={{ aspectRatio: "1", cursor: !disableIpDrag.includes("lastName") ? "grab" : "default", gap: "1rem" }}>
                                                        <span className="bg-light-secondary d-flex justify-content-center align-items-center rounded" style={{ padding: "0.75rem", aspectRatio: "1" }}>
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 52 52"
                                                                width={15}
                                                            >
                                                                <path
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M44 17H8a2 2 0 00-2 2v14a2 2 0 002 2h36a2 2 0 002-2V19a2 2 0 00-2-2zM8 15a4 4 0 00-4 4v14a4 4 0 004 4h36a4 4 0 004-4V19a4 4 0 00-4-4H8z"
                                                                    fill="#727272"
                                                                />
                                                                <path
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M10 20a1 1 0 011 1v10a1 1 0 11-2 0V21a1 1 0 011-1z"
                                                                    fill="#727272"
                                                                />
                                                            </svg>
                                                        </span>
                                                        <span className='text-black text-center' style={{ fontSize: "11px" }}>Last name</span>
                                                        {/* <svg
                                                            width={"35%"}
                                                            viewBox="0 0 67 28"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <circle cx={5} cy={5} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={24} cy={5} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={43} cy={5} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={62} cy={5} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={5} cy={23} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={24} cy={23} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={43} cy={23} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={62} cy={23} r={3.5} stroke="#727272" strokeWidth={3} />
                                                        </svg> */}
                                                    </div>
                                                </div>
                                                <div style={{ width: `33.3333%`, padding: "0.35rem", height: "100%" }}>
                                                    <div title={!disableIpDrag.includes("email") ? 'Drag to add to your pop-up' : 'Cannot drag this element if this already exists on page'} draggable={!disableIpDrag.includes("email")} onDragStart={(e) => handleDragStart(e, "input", "email")} className={`border rounded text-black w-100 d-flex flex-column justify-content-between align-items-center p-1`} style={{ aspectRatio: "1", cursor: !disableIpDrag.includes("email") ? "grab" : "default", gap: "1rem" }}>
                                                        <span className="bg-light-secondary d-flex justify-content-center align-items-center rounded" style={{ padding: "0.75rem", aspectRatio: "1" }}>
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 52 52"
                                                                width={15}
                                                            >
                                                                <path
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M44 17H8a2 2 0 00-2 2v14a2 2 0 002 2h36a2 2 0 002-2V19a2 2 0 00-2-2zM8 15a4 4 0 00-4 4v14a4 4 0 004 4h36a4 4 0 004-4V19a4 4 0 00-4-4H8z"
                                                                    fill="#727272"
                                                                />
                                                                <path
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M10 20a1 1 0 011 1v10a1 1 0 11-2 0V21a1 1 0 011-1z"
                                                                    fill="#727272"
                                                                />
                                                            </svg>
                                                        </span>
                                                        <span className='text-black text-center' style={{ fontSize: "11px" }}>Email</span>
                                                        {/* <svg
                                                            width={"35%"}
                                                            viewBox="0 0 67 28"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <circle cx={5} cy={5} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={24} cy={5} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={43} cy={5} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={62} cy={5} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={5} cy={23} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={24} cy={23} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={43} cy={23} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={62} cy={23} r={3.5} stroke="#727272" strokeWidth={3} />
                                                        </svg> */}
                                                    </div>
                                                </div>
                                                <div style={{ width: `33.3333%`, padding: "0.35rem", height: "100%" }}>
                                                    <div title={!disableIpDrag.includes("number") ? 'Drag to add to your pop-up' : 'Cannot drag this element if this already exists on page'} draggable={!disableIpDrag.includes("number")} onDragStart={(e) => handleDragStart(e, "input", "number")} className={`border rounded text-black w-100 d-flex flex-column justify-content-between align-items-center p-1`} style={{ aspectRatio: "1", cursor: !disableIpDrag.includes("number") ? "grab" : "default", gap: "1rem" }}>
                                                        <span className="bg-light-secondary d-flex justify-content-center align-items-center rounded" style={{ padding: "0.75rem", aspectRatio: "1" }}>
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 52 52"
                                                                width={15}
                                                            >
                                                                <path
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M44 17H8a2 2 0 00-2 2v14a2 2 0 002 2h36a2 2 0 002-2V19a2 2 0 00-2-2zM8 15a4 4 0 00-4 4v14a4 4 0 004 4h36a4 4 0 004-4V19a4 4 0 00-4-4H8z"
                                                                    fill="#727272"
                                                                />
                                                                <path
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M10 20a1 1 0 011 1v10a1 1 0 11-2 0V21a1 1 0 011-1z"
                                                                    fill="#727272"
                                                                />
                                                            </svg>
                                                        </span>
                                                        <span className='text-black text-center' style={{ fontSize: "11px" }}>Mobile</span>
                                                        {/* <svg
                                                            width={"35%"}
                                                            viewBox="0 0 67 28"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <circle cx={5} cy={5} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={24} cy={5} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={43} cy={5} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={62} cy={5} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={5} cy={23} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={24} cy={23} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={43} cy={23} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={62} cy={23} r={3.5} stroke="#727272" strokeWidth={3} />
                                                        </svg> */}
                                                    </div>
                                                </div>
                                                <div style={{ width: `33.3333%`, padding: "0.35rem", height: "100%" }}>
                                                    <div title={!disableIpDrag.includes("enter_otp") ? 'Drag to add to your pop-up' : 'Cannot drag this element if this already exists on page'} draggable={!disableIpDrag.includes("enter_otp")} onDragStart={(e) => handleDragStart(e, "input", "enter_otp")} className={`border rounded text-black w-100 d-flex flex-column justify-content-between align-items-center p-1`} style={{ aspectRatio: "1", cursor: !disableIpDrag.includes("enter_otp") ? "grab" : "default", gap: "1rem" }}>
                                                        <span className="bg-light-secondary d-flex justify-content-center align-items-center rounded" style={{ padding: "0.75rem", aspectRatio: "1" }}>
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 52 52"
                                                                width={15}
                                                            >
                                                                <path
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M44 17H8a2 2 0 00-2 2v14a2 2 0 002 2h36a2 2 0 002-2V19a2 2 0 00-2-2zM8 15a4 4 0 00-4 4v14a4 4 0 004 4h36a4 4 0 004-4V19a4 4 0 00-4-4H8z"
                                                                    fill="#727272"
                                                                />
                                                                <path
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M10 20a1 1 0 011 1v10a1 1 0 11-2 0V21a1 1 0 011-1z"
                                                                    fill="#727272"
                                                                />
                                                            </svg>
                                                        </span>
                                                        <span className='text-black text-center' style={{ fontSize: "11px" }}>OTP</span>
                                                        {/* <svg
                                                            width={"35%"}
                                                            viewBox="0 0 67 28"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <circle cx={5} cy={5} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={24} cy={5} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={43} cy={5} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={62} cy={5} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={5} cy={23} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={24} cy={23} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={43} cy={23} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={62} cy={23} r={3.5} stroke="#727272" strokeWidth={3} />
                                                        </svg> */}
                                                    </div>
                                                </div>
                                            </div>
                                            <p className='m-0 fw-bolder text-black text-uppercase' style={{ padding: "0.5rem 0.5rem 0px", fontSize: "0.75rem" }}>Form Elements</p>
                                            <div className="toggleSection d-flex flex-wrap align-items-stretch justify-content-start mb-1">
                                                <div style={{ width: `33.3333%`, padding: "0.35rem", height: "100%" }}>
                                                    <div title='Drag to add to your pop-up' draggable onDragStart={(e) => handleDragStart(e, "tnc")} className="border rounded text-black w-100 d-flex flex-column justify-content-between align-items-center p-1" style={{ aspectRatio: "1", cursor: "grab", gap: "0.25rem" }}>
                                                        <span className="bg-light-secondary d-flex justify-content-center align-items-center rounded" style={{ padding: "0.75rem", aspectRatio: "1" }}>
                                                            <CheckSquare color="#727272" size={12.5} />
                                                        </span>
                                                        <span className='text-black text-center' style={{ fontSize: "11px" }}>Newsletter</span>
                                                        {/* <svg
                                                            width={"35%"}
                                                            viewBox="0 0 67 28"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <circle cx={5} cy={5} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={24} cy={5} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={43} cy={5} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={62} cy={5} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={5} cy={23} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={24} cy={23} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={43} cy={23} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={62} cy={23} r={3.5} stroke="#727272" strokeWidth={3} />
                                                        </svg> */}
                                                    </div>
                                                </div>
                                            </div>
                                            <p className='m-0 fw-bolder text-black text-uppercase' style={{ padding: "0.5rem 0.5rem 0px", fontSize: "0.75rem" }}>Layout Elements</p>
                                            <div className="toggleSection d-flex align-items-stretch justify-content-start mb-1">
                                                <div style={{ width: `33.3333%`, padding: "0.35rem", height: "100%" }}>
                                                    <div title='Drag to add to your pop-up' draggable onDragStart={(e) => handleDragStart(e, "col1")} className="border rounded text-dark w-100 d-flex flex-column justify-content-between align-items-center p-1" style={{ aspectRatio: "1", cursor: "grab", gap: "0.25rem" }}>
                                                        <span className="bg-light-secondary d-flex justify-content-center align-items-center rounded" style={{ padding: "0.75rem", aspectRatio: "1" }}>
                                                            <Square color="#727272" size={12.5} />
                                                        </span>
                                                        <span className='text-black text-center' style={{ fontSize: "11px" }}>Block</span>
                                                        {/* <svg
                                                            width={"35%"}
                                                            viewBox="0 0 67 28"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <circle cx={5} cy={5} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={24} cy={5} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={43} cy={5} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={62} cy={5} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={5} cy={23} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={24} cy={23} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={43} cy={23} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={62} cy={23} r={3.5} stroke="#727272" strokeWidth={3} />
                                                        </svg> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>}
                                        {/* Elements section */}
                                        {/* Button Section */}
                                        {sideNav === "button" && <div className={`px-1`} style={{ transition: "0.3s ease-in-out", overflow: "auto", width: "100%" }}>
                                            <p className='m-0 fw-bolder text-black text-uppercase' style={{ padding: "0.5rem 0.5rem 0px", fontSize: "0.75rem" }}>Basic Elements</p>
                                            <div className="toggleSection d-flex align-items-stretch justify-content-start mb-1" style={{ flexWrap: "wrap" }}>
                                                {/* {getElementJsx({ draggable: true, dragStartFunc: (e) => handleDragStart(e, "text", "type"), icon: <Type size={17.5} />, label: "Text" })} */}
                                                <div style={{ width: `33.3333%`, padding: "0.35rem", height: "100%" }}>
                                                    <div title='Drag to add to your pop-up' draggable onDragStart={(e) => handleDragStart(e, "text", "type")} className="border rounded w-100 d-flex flex-column justify-content-between align-items-center p-1 h-100" style={{ aspectRatio: "1", cursor: "grab", gap: "1rem" }}>
                                                        <span className="bg-light-secondary d-flex justify-content-center align-items-center rounded" style={{ padding: "0.75rem", aspectRatio: "1" }}>
                                                            <Type color="#727272" size={12.5} />
                                                        </span>
                                                        <span className='text-black text-center' style={{ fontSize: "11px" }}>Text</span>
                                                        {/* <svg
                                                            width={"35%"}
                                                            viewBox="0 0 67 28"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <circle cx={5} cy={5} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={24} cy={5} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={43} cy={5} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={62} cy={5} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={5} cy={23} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={24} cy={23} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={43} cy={23} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={62} cy={23} r={3.5} stroke="#727272" strokeWidth={3} />
                                                        </svg> */}
                                                    </div>
                                                </div>
                                                <div style={{ width: `33.3333%`, padding: "0.35rem", height: "100%" }}>
                                                    <div title='Drag to add to your pop-up' draggable onDragStart={(e) => handleDragStart(e, "image")} className="border rounded w-100 d-flex flex-column justify-content-between align-items-center p-1 h-100" style={{ aspectRatio: "1", cursor: "grab", gap: "1rem" }}>
                                                        <span className="bg-light-secondary d-flex justify-content-center align-items-center rounded" style={{ padding: "0.75rem", aspectRatio: "1" }}>
                                                            <Image color="#727272" size={12.5} />
                                                        </span>
                                                        <span className='text-black text-center' style={{ fontSize: "11px" }}>Image</span>
                                                        {/* <svg
                                                            width={"35%"}
                                                            viewBox="0 0 67 28"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <circle cx={5} cy={5} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={24} cy={5} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={43} cy={5} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={62} cy={5} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={5} cy={23} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={24} cy={23} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={43} cy={23} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={62} cy={23} r={3.5} stroke="#727272" strokeWidth={3} />
                                                        </svg> */}
                                                    </div>
                                                </div>
                                            </div>
                                            <p className='m-0 fw-bolder text-black text-uppercase' style={{ padding: "0.5rem 0.5rem 0px", fontSize: "0.75rem" }}>Layout Elements</p>
                                            <div className="toggleSection d-flex align-items-stretch justify-content-start mb-1">
                                                <div style={{ width: `33.3333%`, padding: "0.35rem", height: "100%" }}>
                                                    <div title='Drag to add to your pop-up' draggable onDragStart={(e) => handleDragStart(e, "col1")} className="border rounded text-dark w-100 d-flex flex-column justify-content-between align-items-center p-1" style={{ aspectRatio: "1", cursor: "grab", gap: "0.25rem" }}>
                                                        <span className="bg-light-secondary d-flex justify-content-center align-items-center rounded" style={{ padding: "0.75rem", aspectRatio: "1" }}>
                                                            <Square color="#727272" size={12.5} />
                                                        </span>
                                                        <span className='text-black text-center' style={{ fontSize: "11px" }}>Block</span>
                                                        {/* <svg
                                                            width={"35%"}
                                                            viewBox="0 0 67 28"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <circle cx={5} cy={5} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={24} cy={5} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={43} cy={5} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={62} cy={5} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={5} cy={23} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={24} cy={23} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={43} cy={23} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={62} cy={23} r={3.5} stroke="#727272" strokeWidth={3} />
                                                        </svg> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>}
                                        {/* Button Section */}
                                        {/* Offer Section */}
                                        {sideNav === "offers" && <div style={{ transition: "0.3s ease-in-out", overflow: "auto", width: "100%", maxHeight: "100%", overflow: "auto" }}>
                                            <div className="toggleSection border-end d-flex align-items-stretch justify-content-start mb-1">
                                                <div style={{ width: `33.3333%`, padding: "0.35rem", height: "100%" }}>
                                                    <div draggable={isMobile ? phoneIsOfferDraggable : isOfferDraggable} onDragStart={(e) => {
                                                        if (isMobile ? phoneIsOfferDraggable : isOfferDraggable) {
                                                            handleDragStart(e, "offer", "type")
                                                        }
                                                    }} className="border rounded w-100 d-flex flex-column justify-content-between align-items-center p-1 h-100" style={{ aspectRatio: "1", cursor: "grab", gap: "0.5rem", boxShadow: "1px 1px 5px rgba(0,0,0,0.125)", cursor: isOfferDraggable ? "grab" : "default", opacity: isOfferDraggable ? "1" : "0.5" }}>
                                                        <Percent color='rgb(255, 103, 28)' size={17.5} />
                                                        <span className='text-black text-center' style={{ fontSize: "11px" }}>Offer</span>
                                                        <svg
                                                            width={"35%"}
                                                            viewBox="0 0 67 28"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <circle cx={5} cy={5} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={24} cy={5} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={43} cy={5} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={62} cy={5} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={5} cy={23} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={24} cy={23} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={43} cy={23} r={3.5} stroke="#727272" strokeWidth={3} />
                                                            <circle cx={62} cy={23} r={3.5} stroke="#727272" strokeWidth={3} />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <UncontrolledAccordion defaultOpen={['1']} stayOpen>
                                                <AccordionItem className='bg-white border-bottom'>
                                                    <AccordionHeader className='acc-header border-bottom' targetId='1'>
                                                        <p className='m-0 fw-bolder text-black text-uppercase' style={{ fontSize: "0.75rem" }}>Add Offers</p>
                                                    </AccordionHeader>
                                                    <AccordionBody accordionId='1'>
                                                        {(gotOffers && Array.isArray(allOffers)) ? allOffers?.map((ele, key) => {
                                                            return (
                                                                <span className="position-relative" style={{ cursor: "pointer", outline: `2px solid ${finalObj?.selectedOffers?.some($ => $?.Code === ele.Code) ? "#FF671C" : "rgba(0,0,0,0)"}` }} onClick={() => {
                                                                    if (finalObj?.selectedOffers?.some($ => $?.Code === ele.Code)) {
                                                                        const newArr = [...finalObj.selectedOffers]
                                                                        const filteredArr = [...newArr?.filter(item => item.Code !== ele.Code)]
                                                                        // setSelectedOffer(filteredArr[filteredArr.length - 1])
                                                                        updatePresent({ ...finalObj, selectedOffers: filteredArr })
                                                                    } else {
                                                                        // setSelectedOffer(ele)
                                                                        updatePresent({ ...finalObj, selectedOffers: [...finalObj?.selectedOffers, ele] })
                                                                    }
                                                                }}>
                                                                    {/* {finalObj?.selectedOffers?.some($ => $?.Code === ele?.Code) && <span style={{ position: "absolute", inset: "0px 0px auto auto", transform: `translateX(35%) translateY(-35%)`, width: "25px", aspectRatio: "1", display: "flex", justifyContent: "center", alignItems: "center", color: "#FF671C", backgroundColor: "white", borderRadius: "100px", zIndex: "99999999999", border: "2px solid #FF671C" }}>{(finalObj?.selectedOffers?.findIndex($ => $?.Code === ele.Code)) + 1}</span>} */}
                                                                    <div>
                                                                        {/* <ReturnOfferHtml details={ele} key={key} theme={finalObj?.offerTheme} colors={finalObj?.offerProperties?.colors} /> */}
                                                                        <Card key={key} style={{ filter: "drop-shadow(rgba(0, 0, 0, 0.2) 0px 0px 10px)" }}>
                                                                            <CardBody style={{ padding: "10px" }}>
                                                                                <div>
                                                                                    <div>
                                                                                        <span style={{ fontSize: "13px" }}>Code: <span className=' text-black '>{ele?.Code}</span></span>
                                                                                    </div>
                                                                                    <div className='mt-1'>
                                                                                        <span style={{ fontSize: "13px" }}>Offer: <span className=' text-black'>{ele?.Type === "PERCENTAGE" ? `${Math.ceil(ele?.Value)}%` : `${userPermission?.currencySymbol}${Math.ceil(ele?.Value)}`}</span></span>
                                                                                    </div>
                                                                                    <div className='mt-1'>
                                                                                        <span style={{ fontSize: "13px" }}>Summary: <br /> <span className=' text-black'> {ele?.Summary} </span></span>
                                                                                    </div>
                                                                                    <div>
                                                                                        <p style={{ fontSize: "13px" }} className='mt-1'>Validity: <br /><span className=' text-black'>{ele?.ValidityPeriod?.end ? moment(ele?.ValidityPeriod?.end).format("YYYY-MM-DD HH:mm:ss") : "Never ending"}</span></p>
                                                                                    </div>
                                                                                </div>
                                                                            </CardBody>
                                                                        </Card>
                                                                    </div>
                                                                </span>
                                                            )
                                                        }) : (
                                                            <div className="d-flex justify-content-center align-items-center" style={{ inset: "0px", backgroundColor: "rgba(255,255,255,0.5)" }}>
                                                                <Spinner />
                                                            </div>
                                                        )}
                                                        <div><button onClick={() => navigate("/merchant/SuperLeadz/create_offers/")} className="btn btn-dark w-100">Create new offer</button></div>
                                                    </AccordionBody>
                                                </AccordionItem>
                                            </UncontrolledAccordion>
                                        </div>}
                                        {/* Offer Section */}
                                        {/* Criteria section */}
                                        {sideNav === "criteria" && <div style={{ transition: "0.3s ease-in-out", overflow: "auto", width: "100%" }}>
                                            <UncontrolledAccordion defaultOpen={['1', '2']} stayOpen>
                                                <AccordionItem className='bg-white border-bottom'>
                                                    <AccordionHeader className='acc-header border-bottom' targetId='1'>
                                                        <p className='m-0 fw-bolder text-black text-uppercase' style={{ fontSize: "0.75rem" }}>Schedule Campaign</p>
                                                    </AccordionHeader>
                                                    <AccordionBody accordionId='1'>
                                                        <div className='p-0 mx-0 my-1'>
                                                            <label htmlFor="" className='form-control-label' style={{ fontSize: "0.85rem" }} >Start Date</label>
                                                            <PickerDefault picker={finalObj?.campaignStartDate} minDate={"today"} maxDate={finalObj?.campaignEndDate} dateFormat={"Y-m-d h:i K"} enableTime={true} type={"start"} setMainStyle={updatePresent} mainStyle={finalObj} />
                                                            <div className="form-check d-flex align-items-center gap-1 mx-0 p-0 my-2">
                                                                <label style={{ fontSize: "0.85rem" }} htmlFor="endDateCheck" className="form-check-label m-0 p-0">Set end date</label><input id='endDateCheck' checked={finalObj.campaignHasEndDate} type="checkbox" onChange={e => updatePresent({ ...finalObj, campaignHasEndDate: e.target.checked })} className="form-check-input m-0 cursor-pointer" />
                                                            </div>
                                                            {finalObj.campaignHasEndDate && (
                                                                <>
                                                                    <label htmlFor="" className='form-control-label' style={{ fontSize: "0.85rem" }} >End Date</label>
                                                                    <PickerDefault picker={finalObj?.campaignEndDate} minDate={finalObj?.campaignStartDate} dateFormat={"Y-m-d h:i K"} enableTime={true} type="end" mainStyle={finalObj} setMainStyle={updatePresent} />
                                                                </>
                                                            )}
                                                        </div>
                                                    </AccordionBody>
                                                </AccordionItem>
                                            </UncontrolledAccordion>
                                        </div>}

                                        {sideNav === "email" && <div style={{ transition: "0.3s ease-in-out", overflow: "auto", width: "100%" }}>
                                            <UncontrolledAccordion stayOpen defaultOpen={["1"]}>
                                                <AccordionItem>
                                                    <AccordionHeader className='acc-header border-top' targetId='1' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                                                        <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Email</label>
                                                    </AccordionHeader>
                                                    <AccordionBody accordionId='1'>
                                                        <div className="py-1">
                                                            <label style={{ fontSize: "0.85rem", width: '100%' }} className="form-check-label m-0 p-0">Email From</label>
                                                            <div className="d-flex justify-content-center align-items-center" style={{ border: '1px solid #d8d6de', borderRadius: '0.357rem', gap: '5px' }}>
                                                                {/* <label style={{ fontSize: "0.85rem", width: '100%' }} className="form-check-label m-0 p-0">Email Template</label> */}
                                                                <input type="text" value={outletSenderId ? outletSenderId : "no_reply@xircls.com"} className="form-control" style={{ width: '250px', border: 'none' }} disabled />
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
                                                                            setFinalObj({ ...finalObj, email_settings: { ...resp.data } })

                                                                        }
                                                                    })
                                                                    .catch((error) => {
                                                                        console.log(error)
                                                                    })
                                                            }} options={emailTemplate} />
                                                        </div>

                                                        <div className="py-1">
                                                            <label style={{ fontSize: "0.85rem" }} className="form-check-label m-0 p-0">Subject</label>
                                                            <input value={finalObj?.email_settings?.subject} onChange={(e) => setFinalObj({ ...finalObj, email_settings: { ...finalObj.email_settings, subject: e.target.value } })} name="subject" type="text" className="form-control" id="subject" placeholder="Subject" />
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

                                                                            {/* <div className='mb-1'>
                                                                                <a key={i}><span onClick={() => {
                                                                                    navigator.clipboard.writeText(curElem.placeholders)
                                                                                }}></span> {curElem.placeholders}</a>

                                                                            </div> */}
                                                                        </>
                                                                    })
                                                                }

                                                            </div>
                                                        </div>
                                                    </AccordionBody>
                                                </AccordionItem>
                                            </UncontrolledAccordion>
                                        </div>}
                                        {/* Criteria section */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Section Drawer */}
                        {/* Theme Preview */}
                        <div className="d-flex flex-column align-items-center bg-light-secondary flex-grow-1" style={{ width: sideNav === "rules" ? "auto" : `calc(100vw - ${sideNav !== "" ? sectionWidths.editSection : "0"}px - ${sectionWidths.drawerWidth}px - ${sectionWidths.sidebar}px)`, transition: "0.3s ease-in-out" }}>
                            {returnRender({ outletData, slPrevBg, bgsettings: finalObj?.overlayStyles, currPage, setCurrPage, currPosition, setCurrPosition, indexes, setIndexes, popPosition: finalObj?.positions?.[`${mobileCondition}${pageCondition}`], bgStyles: finalObj?.backgroundStyles?.[`${mobileCondition}main`], crossStyle: finalObj?.crossButtons[`${mobileCondition}${pageCondition}`], values, setValues, showBrand, handleElementDrop, handleColDrop, handleDragOver, handleNewDrop, handleLayoutDrop, handleRearrangeElement, mouseEnterIndex, setMouseEnterIndex, mousePos, setMousePos, isEqual, makActive, colWise: currPage === "button" ? [...finalObj?.[`${mobileCondition}button`]] : [...finalObj?.[`${mobileCondition}pages`][finalObj?.[`${mobileCondition}pages`]?.findIndex($ => $.id === currPage)].values], setcolWise, dragStartIndex, setDragStartIndex, dragOverIndex, setDragOverIndex, isMobile, setIsMobile, finalObj, setFinalObj: updatePresent, mobileCondition, mobileConditionRev, openPage, setOpenPage, brandStyles, gotOffers, setTransfered, sideNav, setSideNav, btnStyles: finalObj?.backgroundStyles[`${mobileCondition}button`], offerTheme: finalObj?.offerTheme, navigate, triggerImage, gotDragOver, setGotDragOver, indicatorPosition, setIndicatorPosition, selectedOffer, setSelectedOffer, renamePage, setRenamePage, pageName, setPageName, undo, updatePresent, openToolbar, setOpenToolbar, updateTextRes, rearr, setRearr, isColDragging, setIsColDragging })}
                        </div>
                        {/* Theme Preview */}
                        {/* Edit Section */}
                        <div className="edit-section h-100" style={{ width: currPosition?.selectedType !== "" ? `${sectionWidths.editSection}px` : "0px", overflow: "auto", transition: "0.3s ease-in-out" }}>
                            {currPosition?.selectedType !== "" && renderElems()}
                        </div>
                        {/* Edit Section */}
                    </div>
                    {/* Preview and Edit Section */}

                    {/*Modals */}
                    <Modal onClick={() => setBgModal0(!bgModal0)} toggle={() => setBgModal0(!bgModal0)} className='hide-backdrop' isOpen={bgModal0} style={{ width: "300px", maxWidth: "90%", margin: "0px" }}>
                        <BgModifier pageCondition={pageCondition} mobileCondition={mobileCondition} mobileConditionRev={mobileConditionRev} closeState={bgModal0} setCloseState={setBgModal0} styles={values} setStyles={setValues} mainStyle={finalObj} setMainStyle={setFinalObj} />
                    </Modal>
                    <Modal onClick={() => setBgModal(!bgModal)} toggle={() => setBgModal(!bgModal)} className='hide-backdrop' isOpen={bgModal} style={{ width: "300px", maxWidth: "90%", margin: "0px" }}>
                        <BgModifier pageCondition={pageCondition} mobileCondition={mobileCondition} mobileConditionRev={mobileConditionRev} type="btnSetting" setMainStyle={updatePresent} mainStyle={finalObj} closeState={bgModal} setCloseState={setBgModal} styles={finalObj?.overlayStyles} />
                    </Modal>
                    <Modal onClick={() => setBgModal2(!bgModal2)} toggle={() => setBgModal2(!bgModal2)} className='hide-backdrop' isOpen={bgModal2} style={{ width: "300px", maxWidth: "90%", margin: "0px" }}>
                        <BgModifier pageCondition={pageCondition} mobileCondition={mobileCondition} mobileConditionRev={mobileConditionRev} type="bgStyles" styles={finalObj?.backgroundStyles?.[`${mobileCondition}main`]} setMainStyle={updatePresent} mainStyle={finalObj} closeState={bgModal2} setCloseState={setBgModal2} />
                    </Modal>
                    <Modal onClick={() => setBgModal3(!bgModal3)} toggle={() => setBgModal3(!bgModal3)} className='hide-backdrop' isOpen={bgModal3} style={{ width: "300px", maxWidth: "90%", margin: "0px" }}>
                        <BgModifier pageCondition={pageCondition} mobileCondition={mobileCondition} mobileConditionRev={mobileConditionRev} type="btnStyles" styles={finalObj?.backgroundStyles?.[`${mobileCondition}button`]} setMainStyle={updatePresent} mainStyle={finalObj} colorType={colorType} closeState={bgModal3} setCloseState={setBgModal3} />
                    </Modal>
                    <Modal onClick={() => setBgModal4(!bgModal4)} toggle={() => setBgModal4(!bgModal4)} className='hide-backdrop' isOpen={bgModal4} style={{ width: "300px", maxWidth: "90%", margin: "0px" }}>
                        <CustomColorModifier mobileCondition={mobileCondition} mobileConditionRev={mobileConditionRev} type="offerColors" setMainStyle={updatePresent} mainStyle={finalObj} colorType={currOfferColor} />
                    </Modal>
                    <Modal onClick={() => setBgModal5(!bgModal5)} toggle={() => setBgModal5(!bgModal5)} className='hide-backdrop' isOpen={bgModal5} style={{ width: "300px", maxWidth: "90%", margin: "0px" }}>
                        <CustomColorModifier mobileCondition={mobileCondition} mobileConditionRev={mobileConditionRev} styles={values} setStyles={setValues} colorType={"WebkitTextFillColor"} />
                    </Modal>
                    <Modal onClick={() => setCustomColorModal(!customColorModal)} toggle={() => setCustomColorModal(!customColorModal)} className='hide-backdrop' isOpen={customColorModal} style={{ width: "300px", maxWidth: "90%", margin: "0px" }}>
                        <CustomColorModifier mobileCondition={mobileCondition} mobileConditionRev={mobileConditionRev} type="cross" setMainStyle={updatePresent} mainStyle={finalObj} pageCondition={`${pageCondition}`} colorType={colorType} />
                    </Modal>
                    <Modal onClick={() => setCustomColorModal2(!customColorModal2)} toggle={() => setCustomColorModal2(!customColorModal2)} className='hide-backdrop' isOpen={customColorModal2} style={{ width: "300px", maxWidth: "90%", margin: "0px" }}>
                        <CustomColorModifier mobileCondition={mobileCondition} mobileConditionRev={mobileConditionRev} styles={defColors} setStyles={setDefColors} colorType={currColor} />
                    </Modal>
                    <Modal style={{ filter: "drop-shadow(0px 0px 15px rgba(0,0,0,0.75))" }} isOpen={imgModal} toggle={() => setImgModal(!imgModal)} size='xl'>
                        <div className="w-100 p-1 d-flex justify-content-between align-items-center">
                            <h3 className='m-0'>Select Image</h3> <span className='cursor-pointer' onClick={() => setImgModal(!imgModal)}><X /></span>
                        </div>
                        <ModalBody className='position-relative' style={{ height: "75vh", overflowY: "scroll" }}>

                            {imgLoading && <div className="position-fixed d-flex justify-content-center align-items-center" style={{ inset: "0px", backgroundColor: "rgba(255,255,255,0.5)" }}>
                                <Spinner />
                            </div>}
                            <div className="p-1 d-flex gap-1">
                                <button onClick={() => setImageTab("default")} className={`${imageTab === "default" ? "btn-primary-main" : ""} btn w-50`}>
                                    Your Images
                                </button>
                                <button onClick={() => setImageTab("product")} className={`${imageTab === "product" ? "btn-primary-main" : ""} btn w-50`}>
                                    Product Images
                                </button>
                            </div>
                            {imageTab !== "product" && <div className="p-1 pt-0 d-flex justify-content-center border-bottom">
                                <label htmlFor='uploadImg' className="btn btn-dark">Upload an Image <input onChange={e => {
                                    setImgLoading(true)
                                    const form_data = new FormData()
                                    form_data.append("shop", outletData[0]?.web_url)
                                    form_data.append("app", "superleadz")
                                    form_data.append("images", e.target.files[0])
                                    const imgUrl = new URL(`${SuperLeadzBaseURL}/api/v1/bucket_images/`)
                                    axios({
                                        method: "POST",
                                        url: imgUrl,
                                        data: form_data
                                    })
                                        .then((data) => {
                                            if (data.status === 200) {
                                                triggerImage()
                                                toast.success("Image uploaded successfully!")
                                            } else {
                                                setImgLoading(false)
                                                toast.error("The image could not be uploaded. Try again later.")
                                            }
                                        })
                                }} type="file" className="d-none" id='uploadImg' accept='image/*' /></label>
                            </div>}
                            <div className="p-1 row">
                                {imageTab === "default" && allImages.length >= 0 ? allImages.map((ele, key) => {
                                    return (
                                        <div key={key} className="col-2 img-array-item" style={{ padding: "0.5rem" }}>
                                            <div style={{ aspectRatio: "1", backgroundImage: `url(${ele?.image})`, backgroundSize: "contain", boxShadow: "0px 5px 7.5px rgba(0,0,0,0.25)", backgroundRepeat: "no-repeat", backgroundPosition: "center" }} className="w-100 h-100 rounded-3 border overflow-hidden">
                                                <div className="revealSection w-100 h-100 d-flex flex-column gap-1 justify-content-between align-items-center p-2" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                                                    <div className="p-1 bg-white text-black rounded-3 w-100">{ele?.image?.split("/")?.at("-1")}</div>
                                                    <button className="btn btn-dark w-100" onClick={() => {
                                                        if (imageType === "SINGLE") {
                                                            // const colWise = 
                                                            const newFinalObj = finalObj
                                                            const arr = currPage === "button" ? [...finalObj?.[`${mobileCondition}button`]] : [...finalObj?.[`${mobileCondition}pages`][finalObj?.[`${mobileCondition}pages`]?.findIndex($ => $.id === currPage)].values]
                                                            const arrRev = currPage === "button" ? [...finalObj?.[`${mobileConditionRev}button`]] : [...finalObj?.[`${mobileConditionRev}pages`][finalObj?.[`${mobileConditionRev}pages`]?.findIndex($ => $.id === currPage)].values]
                                                            if (arr[indexes.cur].elements[arr[indexes.cur].elements.findIndex($ => $?.positionType === indexes.curElem)].element[indexes.subElem].type) {
                                                                arr[indexes.cur].elements[arr[indexes.cur].elements.findIndex($ => $?.positionType === indexes.curElem)].element[indexes.subElem].type = "image"
                                                            }
                                                            if (arr[indexes.cur].elements[arr[indexes.cur].elements.findIndex($ => $?.positionType === indexes.curElem)].element[indexes.subElem].src) {
                                                                arr[indexes.cur].elements[arr[indexes.cur].elements.findIndex($ => $?.positionType === indexes.curElem)].element[indexes.subElem].src = ele.image
                                                            }
                                                            if (arr[indexes.cur].elements[arr[indexes.cur].elements.findIndex($ => $?.positionType === indexes.curElem)].element[indexes.subElem].isBrandLogo) {
                                                                arr[indexes.cur].elements[arr[indexes.cur].elements.findIndex($ => $?.positionType === indexes.curElem)].element[indexes.subElem].isBrandLogo = false
                                                            }
                                                            currPage === "button" ? newFinalObj[`${mobileCondition}button`] = arr : newFinalObj[`${mobileCondition}pages`][finalObj[`${mobileCondition}pages`].findIndex($ => $?.id === currPage)].values = arr

                                                            if (dropImage) {
                                                                // if (arrRev[indexes.cur].elements[arrRev[indexes.cur].elements.findIndex($ => $?.positionType === indexes.curElem)].element[indexes.subElem].type) {
                                                                arrRev[indexes.cur].elements[arrRev[indexes.cur].elements.findIndex($ => $?.positionType === indexes.curElem)].element[indexes.subElem].type = "image"
                                                                // }
                                                                // if (arrRev[indexes.cur].elements[arrRev[indexes.cur].elements.findIndex($ => $?.positionType === indexes.curElem)].element[indexes.subElem].src) {
                                                                arrRev[indexes.cur].elements[arrRev[indexes.cur].elements.findIndex($ => $?.positionType === indexes.curElem)].element[indexes.subElem].src = ele.image
                                                                // }
                                                                // if (arrRev[indexes.cur].elements[arrRev[indexes.cur].elements.findIndex($ => $?.positionType === indexes.curElem)].element[indexes.subElem].isBrandLogo) {
                                                                arrRev[indexes.cur].elements[arrRev[indexes.cur].elements.findIndex($ => $?.positionType === indexes.curElem)].element[indexes.subElem].isBrandLogo = false
                                                                // }
                                                                currPage === "button" ? newFinalObj[`${mobileConditionRev}button`] = arrRev : newFinalObj[`${mobileConditionRev}pages`][finalObj[`${mobileConditionRev}pages`].findIndex($ => $?.id === currPage)].values = arrRev
                                                            }
                                                            updatePresent(newFinalObj)
                                                            // setcolWise(currPage === "button" ? newFinalObj?.[`${mobileCondition}button`] : newFinalObj?.[`${mobileCondition}pages`]?.[finalObj?.[`${mobileCondition}pages`]?.findIndex($ => $?.id === currPage)]?.values)
                                                            setImgModal(!imgModal)
                                                            setDropImage(false)

                                                        } else {
                                                            const finalData = finalObj

                                                            // const imageList = arr?.filter((curElem) => curElem?.elements).filter((subElem) => subElem?.element).filter((childElem) => childElem.type === "image" ? isBrandLogo)
                                                            updatePresent({ ...finalData, defaultThemeColors: { ...finalData.defaultThemeColors, brandLogo: ele.image } })
                                                            setImgModal(!imgModal)
                                                        }
                                                    }}>Use Image</button>
                                                    <Trash2 className='cursor-pointer' fill='#fff' stroke='#000' strokeWidth={"1px"} size={35} onClick={() => {
                                                        setImgLoading(true)
                                                        const form_data = new FormData()
                                                        form_data.append("shop", outletData[0]?.web_url)
                                                        form_data.append("app", "superleadz")
                                                        const imgUrl = new URL(`${SuperLeadzBaseURL}/api/v1/delete_bucket_image/?shop=${outletData[0]?.web_url}&app=superleadz&image_id=${ele.id}`)
                                                        axios({
                                                            method: "DELETE",
                                                            url: imgUrl,
                                                            data: form_data
                                                        })
                                                            .then((data) => {
                                                                if (data.status === 200) {
                                                                    triggerImage()
                                                                }
                                                            })
                                                    }} color='white' />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }) : (
                                    <div className="d-flex justify-content-center align-items-center">
                                        {/* <span>No images to show. Try uploading more images</span> */}
                                    </div>
                                )}
                                {imageTab === "product" && prodImages.length >= 0 ? prodImages.map((ele, key) => {
                                    return (
                                        <div key={key} className="col-2 img-array-item" style={{ padding: "0.5rem" }}>
                                            <div style={{ aspectRatio: "1", backgroundImage: `url(${ele?.image})`, backgroundSize: "contain", boxShadow: "0px 5px 7.5px rgba(0,0,0,0.25)", backgroundRepeat: "no-repeat", backgroundPosition: "center" }} className="w-100 h-100 rounded-3 border overflow-hidden">
                                                <div className="revealSection w-100 h-100 d-flex flex-column gap-1 justify-content-between align-items-center p-2" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                                                    <div className="p-1 bg-white text-black rounded-3 w-100">{ele?.image?.split("/")?.at("-1")}</div>
                                                    <button className="btn btn-dark w-100" onClick={() => {
                                                        if (imageType === "SINGLE") {
                                                            // const colWise = 
                                                            const newFinalObj = finalObj
                                                            const arr = currPage === "button" ? [...finalObj?.[`${mobileCondition}button`]] : [...finalObj?.[`${mobileCondition}pages`][finalObj?.[`${mobileCondition}pages`]?.findIndex($ => $.id === currPage)].values]
                                                            const arrRev = currPage === "button" ? [...finalObj?.[`${mobileConditionRev}button`]] : [...finalObj?.[`${mobileConditionRev}pages`][finalObj?.[`${mobileConditionRev}pages`]?.findIndex($ => $.id === currPage)].values]
                                                            if (arr[indexes.cur].elements[arr[indexes.cur].elements.findIndex($ => $?.positionType === indexes.curElem)].element[indexes.subElem].type) {
                                                                arr[indexes.cur].elements[arr[indexes.cur].elements.findIndex($ => $?.positionType === indexes.curElem)].element[indexes.subElem].type = "image"
                                                            }
                                                            if (arr[indexes.cur].elements[arr[indexes.cur].elements.findIndex($ => $?.positionType === indexes.curElem)].element[indexes.subElem].src) {
                                                                arr[indexes.cur].elements[arr[indexes.cur].elements.findIndex($ => $?.positionType === indexes.curElem)].element[indexes.subElem].src = ele.image
                                                            }
                                                            if (arr[indexes.cur].elements[arr[indexes.cur].elements.findIndex($ => $?.positionType === indexes.curElem)].element[indexes.subElem].isBrandLogo) {
                                                                arr[indexes.cur].elements[arr[indexes.cur].elements.findIndex($ => $?.positionType === indexes.curElem)].element[indexes.subElem].isBrandLogo = false
                                                            }
                                                            currPage === "button" ? newFinalObj[`${mobileCondition}button`] = arr : newFinalObj[`${mobileCondition}pages`][finalObj[`${mobileCondition}pages`].findIndex($ => $?.id === currPage)].values = arr

                                                            if (dropImage) {
                                                                // if (arrRev[indexes.cur].elements[arrRev[indexes.cur].elements.findIndex($ => $?.positionType === indexes.curElem)].element[indexes.subElem].type) {
                                                                arrRev[indexes.cur].elements[arrRev[indexes.cur].elements.findIndex($ => $?.positionType === indexes.curElem)].element[indexes.subElem].type = "image"
                                                                // }
                                                                // if (arrRev[indexes.cur].elements[arrRev[indexes.cur].elements.findIndex($ => $?.positionType === indexes.curElem)].element[indexes.subElem].src) {
                                                                arrRev[indexes.cur].elements[arrRev[indexes.cur].elements.findIndex($ => $?.positionType === indexes.curElem)].element[indexes.subElem].src = ele.image
                                                                // }
                                                                // if (arrRev[indexes.cur].elements[arrRev[indexes.cur].elements.findIndex($ => $?.positionType === indexes.curElem)].element[indexes.subElem].isBrandLogo) {
                                                                arrRev[indexes.cur].elements[arrRev[indexes.cur].elements.findIndex($ => $?.positionType === indexes.curElem)].element[indexes.subElem].isBrandLogo = false
                                                                // }
                                                                currPage === "button" ? newFinalObj[`${mobileConditionRev}button`] = arrRev : newFinalObj[`${mobileConditionRev}pages`][finalObj[`${mobileConditionRev}pages`].findIndex($ => $?.id === currPage)].values = arrRev
                                                            }
                                                            updatePresent(newFinalObj)
                                                            // setcolWise(currPage === "button" ? newFinalObj?.[`${mobileCondition}button`] : newFinalObj?.[`${mobileCondition}pages`]?.[finalObj?.[`${mobileCondition}pages`]?.findIndex($ => $?.id === currPage)]?.values)
                                                            setImgModal(!imgModal)
                                                            setDropImage(false)

                                                        } else {
                                                            const finalData = finalObj

                                                            // const imageList = arr?.filter((curElem) => curElem?.elements).filter((subElem) => subElem?.element).filter((childElem) => childElem.type === "image" ? isBrandLogo)
                                                            updatePresent({ ...finalData, defaultThemeColors: { ...finalData.defaultThemeColors, brandLogo: ele.image } })
                                                            setImgModal(!imgModal)
                                                        }
                                                    }}>Use Image</button>
                                                    <Trash2 className='cursor-pointer' fill='#fff' stroke='#000' strokeWidth={"1px"} size={35} onClick={() => {
                                                        setImgLoading(true)
                                                        const form_data = new FormData()
                                                        form_data.append("shop", outletData[0]?.web_url)
                                                        form_data.append("app", "superleadz")
                                                        const imgUrl = new URL(`${SuperLeadzBaseURL}/api/v1/delete_bucket_image/?shop=${outletData[0]?.web_url}&app=superleadz&image_id=${ele.id}`)
                                                        axios({
                                                            method: "DELETE",
                                                            url: imgUrl,
                                                            data: form_data
                                                        })
                                                            .then((data) => {
                                                                if (data.status === 200) {
                                                                    triggerImage()
                                                                }
                                                            })
                                                    }} color='white' />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }) : (
                                    <div className="d-flex justify-content-center align-items-center">
                                        {/* <span>No images to show. Try uploading more images</span> */}
                                    </div>
                                )}
                            </div>
                        </ModalBody>
                    </Modal>

                    <Modal toggle={() => setCancelCust(!cancelCust)} isOpen={cancelCust} size='md'>
                        <Card className='m-0'>
                            <h5 className="d-flex justify-content-between align-items-center p-1">
                                Confirm cancellation of the process <X onClick={() => setCancelCust(!cancelCust)} size={15} className='cursor-pointer' />
                            </h5>
                            <p className='px-1'>Do you want to cancel? All of your progress will be deleted</p>
                            <div className="p-1 d-flex justify-content-end align-items-center gap-1">
                                <button onClick={() => setCancelCust(!cancelCust)} className="btn btn-outline-dark">No</button><button onClick={() => {
                                    cancelAction()
                                    navigate("/merchant/SuperLeadz/all_campaigns/")
                                }} className="btn btn-dark">Yes</button>
                            </div>
                        </Card>
                    </Modal>

                    {/* VerifyYourEmail */}
                    {/* <Modal toggle={() => setVerifyYourEmail(!verifyYourEmail)} isOpen={verifyYourEmail} size='md'>
                        <Card className='m-0'>
                            <VerifyYourEmail isQuick={true} />
                            <div className="p-1 d-flex justify-content-end align-items-center gap-1">
                                <button onClick={() => setVerifyYourEmail(!verifyYourEmail)} className="btn btn-outline-dark">No</button>
                                
                            </div>
                        </Card>
                    </Modal> */}

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


                    <Modal toggle={() => setOffersModal(!offersModal)} isOpen={offersModal} size='lg'>
                        <ModalBody className='m-0'>
                            <h5 className="d-flex justify-content-between align-items-center p-1">
                                Select Offer Design <X onClick={() => setOffersModal(!offersModal)} size={15} className='cursor-pointer' />
                            </h5>

                            <Container>
                                <Row className="match-height">
                                    {defaultOfferStyles?.map((ele, key) => {
                                        return (
                                            <Col key={key} md={6}>
                                                <div onClick={() => {
                                                    updatePresent({ ...finalObj, offerTheme: ele?.id })
                                                    // setOfferTheme(ele?.id)
                                                    setOffersModal(!offersModal)
                                                }} className={`p-2 h-100 d-flex justify-content-center align-items-center rounded cursor-pointer`} style={{ outline: `${Number(finalObj?.offerTheme) === Number(ele.id) ? "1px" : "0px"} solid black` }}>
                                                    <div className="flex-grow-1" dangerouslySetInnerHTML={{ __html: ele?.html }} />
                                                </div>
                                            </Col>
                                        )
                                    })}
                                </Row>
                            </Container>
                        </ModalBody>
                    </Modal>

                    <Modal className='modal-dialog-centered' isOpen={emailPreviewModal}>

                        <div className='d-flex justify-content-between align-items-center p-1'>
                            <h4 className='m-0'>Email Preview</h4>
                            <a onClick={() => setEmailPreviewModal(!emailPreviewModal)} style={{ cursor: 'pointer' }}><X size={"18px"} /></a>
                        </div>
                        <ModalBody>
                            <div className="row">
                                <div className='text-center'>

                                    <b>Hi </b>
                                    <br /><br />
                                    <div>
                                        {'{{OTP}}'} is your one-time password to check if you have any offers from us!
                                    </div>
                                    <br /><br />


                                </div>
                            </div>
                        </ModalBody>
                    </Modal>
                    {/*Modals */}
                </div>
            </div>

        </Suspense>
    )
}
export default CustomizationParent