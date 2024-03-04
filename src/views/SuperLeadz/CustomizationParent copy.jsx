import React, { Suspense, useContext, useEffect, useState } from 'react'
import { Crosshair, Edit, Image, Monitor, PlusCircle, Smartphone, Square, Tag, Target, Type, X, Trash2, XCircle, Columns, Disc, Trash, Percent, MoreVertical, ArrowLeft, Home, CheckSquare, Mail, RotateCcw, RotateCw, Check, ChevronRight, Settings, PauseCircle, Menu } from 'react-feather'
import { AccordionBody, AccordionHeader, AccordionItem, Card, Container, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody, Row, UncontrolledAccordion, UncontrolledDropdown, Col, ModalHeader, UncontrolledButtonDropdown, CardBody, Input } from 'reactstrap'
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
import { SuperLeadzBaseURL } from '../../assets/auth/jwtService'
import Spinner from '../Components/DataTable/Spinner'
import { generateRandomString, getCurrentOutlet, xircls_url } from '../Validator'
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import 'swiper/modules/navigation/navigation.min.css'
import 'swiper/modules/autoplay/autoplay.min.css'
import moment from 'moment/moment'
import ReturnOfferHtml, { defaultOfferStyles } from '../NewCustomizationFlow/ReturnOfferHtml'
import slPrevBg from "../../assets/images/vector/slPrevBg.png"
import radio1 from "../../assets/images/vector/1.svg"
import radio2 from "../../assets/images/vector/2.svg"
import radio3 from "../../assets/images/vector/3.svg"
import radio4 from "../../assets/images/vector/4.svg"
import radio5 from "../../assets/images/vector/5.svg"
import check1 from "../../assets/images/vector/checkbox1.svg"
import check2 from "../../assets/images/vector/checkbox2.svg"
import check3 from "../../assets/images/vector/checkbox3.svg"
import check4 from "../../assets/images/vector/checkbox4.svg"
import check5 from "../../assets/images/vector/checkbox5.svg"
import FrontBaseLoader from '../Components/Loader/Loader'
import RenderPreview from "./RenderPreview"
import "./Customization.css"
import { CheckBox, RadioInput, SelectInput } from './campaignView/components'
import RenderPreviewCopy from './RenderPreview copy'


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

const CustomizationParent = () => {
    const { userPermission } = useContext(PermissionProvider)

    // themeLoc variable has the transferred from the AllCampaigns page 
    const themeLoc = useLocation()

    const { EditThemeId } = useParams()

    const defaultIsMobile = new URLSearchParams(themeLoc.search)

    // const dateFormat = "%Y-%m-%d %H:%M:%S"

    // status variable shows whether the user has monile view or desktop view selected while visiting the page
    const status = (defaultIsMobile.get('isMobile') !== "false" && defaultIsMobile.get('isMobile') !== undefined && defaultIsMobile.get('isMobile') !== null && defaultIsMobile.get('isMobile') !== false)

    const [isMobile, setIsMobile] = useState(false)

    // const [isDragging, setIsDragging] = useState(false)

    // console.log({ isDragging, setIsDragging })

    // const [suggestions, setSuggestions] = useState([])

    // console.log({suggestions})

    const mobileCondition = isMobile ? "mobile_" : ""
    const mobileConditionRev = !isMobile ? "mobile_" : ""

    const { allThemes, selectedThemeId } = useContext(ThemesProvider)

    const allPreviews = [...allThemes]

    const navigate = useNavigate()
    const [mousePos, setMousePos] = useState({})
    const [finalObj, setFinalObj] = useState(themeLoc?.state?.custom_theme ? JSON.parse(themeLoc?.state?.custom_theme) : selectedThemeId !== "" ? { ...allPreviews[allPreviews?.findIndex($ => $?.theme_id === selectedThemeId)]?.object, campaignStartDate: moment(new Date()).format("YYYY-MM-DD HH:mm:ss") } : defaultObj)
    const [past, setPast] = useState([])
    const [future, setFuture] = useState([])
    const [themeName, setThemeName] = useState(themeLoc?.state?.custom_theme ? finalObj.theme_name : `Campaign-${generateRandomString()}`)
    const [defColors, setDefColors] = useState(finalObj.defaultThemeColors || {})

    const [currColor, setCurrColor] = useState("primary")
    const [nameEdit, setNameEdit] = useState(true)
    console.log(finalObj, "finalObj")
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
        { value: 'custom_page', label: 'Custom Pages' }
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
    const [customColorModal, setCustomColorModal] = useState(false)
    const [customColorModal2, setCustomColorModal2] = useState(false)

    // const [btnStyles, setBtnStyles] = useState({ backgroundColor: "rgba(255,255,255,1)", bgType: "solid", width: '300px', maxWidth: "100%", minHeight: '50px', paddingTop: "0px", paddingBottom: "0px", paddingRight: "0px", paddingLeft: "0px", marginTop: "0px", marginBottom: "0px", marginRight: "0px", marginLeft: "0px", borderWidth: "0px 0px 0px 0px", defBorderWidth: "0px", borderColor: "rgba(0,0,0,1)", borderStyle: "solid", borderType: "none", borderTopLeftRadius: "0px", borderTopRightRadius: "0px", borderBottomRightRadius: "0px", borderBottomLeftRadius: "0px", boxSizing: "border-box" })

    const [brandStyles, setBrandStyles] = useState({ backgroundColor: "rgba(255,255,255,0)", bgType: "solid", paddingTop: "0px", paddingBottom: "0px", paddingRight: "0px", paddingLeft: "0px", marginTop: "0px", marginBottom: "0px", marginRight: "auto", marginLeft: "auto", borderWidth: "0px 0px 0px 0px", defBorderWidth: "0px", borderColor: "rgba(0,0,0,1)", borderStyle: "solid", borderType: "none", borderTopLeftRadius: "0px", borderTopRightRadius: "0px", borderBottomRightRadius: "0px", borderBottomLeftRadius: "0px", maxWidth: "100%", maxHeight: "300px", overflow: "auto", boxSizing: "border-box", width: "auto" })

    const [values, setValues] = useState({})

    const [imgModal, setImgModal] = useState(false)

    const [isOfferDraggable, setIsOfferDraggable] = useState(true)
    const [phoneIsOfferDraggable, setPhoneIsOfferDraggable] = useState(true)

    const [cancelCust, setCancelCust] = useState(false)

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
    const [openToolbar, setOpenToolbar] = useState(false)
    const [openSidebar, setOpenSidebar] = useState(false)
    const [toggleView, setToggleView] = useState(1)

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

    const updatePresent = (newState) => {
        const data = JSON.stringify(finalObj)
        const newObj = { ...newState }
        // console.log(newState?.responsive, "responsice")
        if (Array.isArray(newState?.responsive)) {
            newState?.responsive?.forEach((responsive) => {
                if (Array.isArray(responsive?.position)) {
                    responsive?.position?.forEach((position) => {
                        if (Array.isArray(position?.style)) {
                            console.log(responsive, "positionposition")
                            position?.style?.forEach((style) => {
                                if (style?.isSame) {
                                    if (responsive?.pageName === "close") {
                                        const closeArr1 = newObj?.crossButtons[`${mobileConditionRev}main`]
                                        const closeArr2 = newObj?.crossButtons[`${mobileCondition}main`]

                                        if (closeArr1.length > 0 && closeArr2.length > 0) {
                                            closeArr1.style[style?.styleName] = closeArr2?.style[style?.styleName]
                                        }

                                        newObj.crossButtons[`${mobileConditionRev}main`] = closeArr1
                                        newObj.crossButtons[`${mobileConditionRev}main`] = closeArr2

                                    } else {
                                        const arr1 = currPage === "button" ? newObj[`${mobileConditionRev}button`] : newObj[`${mobileConditionRev}pages`][newObj[`${mobileConditionRev}pages`]?.findIndex($ => $?.id === currPage)]?.values || []
                                        const arr2 = currPage === "button" ? newObj[`${mobileCondition}button`] : newObj[`${mobileCondition}pages`][newObj[`${mobileCondition}pages`]?.findIndex($ => $?.id === currPage)]?.values || []
                                        console.log(arr1, arr2, "Changes")
                                        if (arr1.length > 0 && arr2.length > 0) {
                                            const positionIndex = arr1[position?.id?.cur]?.elements?.findIndex($ => $?.positionType === position?.id?.curElem)
                                            const updateCustom = (list, obj1, obj2) => {
                                                list.forEach(listName => {
                                                    obj1[listName] = obj2[listName]
                                                })
                                            }

                                            console.log(positionIndex, "positionIndex")
                                            if (position?.id?.subElem === "grandparent") {
                                                arr1[position?.id?.cur].style[style?.styleName] = arr2[position?.id?.cur].style[style?.styleName]
                                                if (style?.styleName === "bgType") {
                                                    updateCustom(["backgroundColor", "backgroundImage"], arr1[position?.id?.cur]?.style, arr2[position?.id?.cur]?.style)
                                                }
                                            } else if (position?.id?.subElem === "parent" && positionIndex !== -1) {
                                                arr1[position?.id?.cur].elements[positionIndex].style[style?.styleName] = arr2[position?.id?.cur].elements[positionIndex].style[style?.styleName]
                                                if (style?.styleName === "bgType") {
                                                    updateCustom(["backgroundColor", "backgroundImage"], arr1[position?.id?.cur].elements[positionIndex]?.style, arr2[position?.id?.cur].elements[positionIndex]?.style)
                                                }
                                            } else {
                                                if (positionIndex !== -1) {
                                                    arr1[position?.id?.cur].elements[positionIndex].element[position?.id?.subElem].style[style?.styleName] = arr2[position?.id?.cur].elements[positionIndex].element[position?.id?.subElem].style[style?.styleName]
                                                    if (style?.styleName === "bgType") {
                                                        updateCustom(["backgroundColor", "backgroundImage"], arr1[position?.id?.cur].elements[positionIndex].element[position?.id?.subElem].style, arr2[position?.id?.cur].elements[positionIndex].element[position?.id?.subElem].style)
                                                    }

                                                }
                                            }

                                            if (currPage === "button") {
                                                newObj[`${mobileConditionRev}button`] = arr1
                                                newObj[`${mobileCondition}button`] = arr2
                                            } else {
                                                const pageIndex = newObj[`${mobileConditionRev}pages`]?.findIndex($ => $.id === currPage)
                                                newObj[`${mobileConditionRev}pages`][pageIndex].values = arr1
                                                newObj[`${mobileCondition}pages`][pageIndex].values = arr2
                                            }

                                        }
                                    }


                                }
                            })
                        }
                    })
                }
            })
        }
        const clonedFinalObj = JSON.parse(data)
        setFinalObj({ ...newObj })
        const delay = 200
        const request = setTimeout(() => {
            if (data !== JSON.stringify(newState)) {
                setPast([...past, { ...clonedFinalObj }])
                setFuture([])
            } else {
                console.log("equal")
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
        setDraggedInputType(inputType ? inputType : "none")
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        const colWise = currPage === "button" ? [...finalObj?.[`${mobileCondition}button`]] : [...finalObj?.[`${mobileCondition}pages`][finalObj?.[`${mobileCondition}pages`]?.findIndex($ => $.id === currPage)].values]
        const transferType = e.dataTransfer.getData("type")
        setDragOverIndex(transferType?.includes("col") ? { cur: colWise?.length, curElem: "parent", subElem: "grandparent" } : { cur: colWise?.length, curElem: "left", subElem: 0 })
    }

    const handleLayoutDrop = (e) => {
        // setSideNav('add-elements')
        setGotDragOver({ cur: false, curElem: false, subElem: false })
        const dataTransfered = e.dataTransfer.getData("type")
        const transferedData = dataTransfered?.includes("rearrange") ? dataTransfered?.split("rearrange_") : dataTransfered
        const newObj = { ...finalObj }

        let updatedColWise = []
        let mobile_updatedColWise = []
        const pageIndex = newObj?.pages?.findIndex($ => $.id === currPage)
        const mobile_pageIndex = newObj?.mobile_pages?.findIndex($ => $.id === currPage)

        if (transferedData && transferedData !== "row") {
            if (transferedData === "col3") {
                updatedColWise = [
                    ...finalObj?.pages[pageIndex]?.values, {
                        id: finalObj?.pages[pageIndex]?.values?.length + 1,
                        col: 3,
                        style: elementStyles?.block,
                        elements: [
                            {
                                positionType: 'left',
                                style: elementStyles?.col,
                                element: [{ ...commonObj, type: "", id: finalObj?.pages[pageIndex]?.values?.length }]
                            },
                            {
                                positionType: 'center',
                                style: elementStyles?.col,
                                element: [{ ...commonObj, type: "", id: finalObj?.pages[pageIndex]?.values?.length }]
                            },
                            {
                                positionType: 'right',
                                style: elementStyles?.col,
                                element: [{ ...commonObj, type: "", id: finalObj?.pages[pageIndex]?.values?.length }]
                            }
                        ]
                    }
                ]
                mobile_updatedColWise = [
                    ...finalObj?.mobile_pages[mobile_pageIndex]?.values, {
                        id: finalObj?.mobile_pages[mobile_pageIndex]?.values?.length + 1,
                        col: 3,
                        style: elementStyles?.block,
                        elements: [
                            {
                                positionType: 'left',
                                style: elementStyles?.col,
                                element: [{ ...commonObj, type: "", id: finalObj?.mobile_pages[mobile_pageIndex]?.values?.length }]
                            },
                            {
                                positionType: 'center',
                                style: elementStyles?.col,
                                element: [{ ...commonObj, type: "", id: finalObj?.mobile_pages[mobile_pageIndex]?.values?.length }]
                            },
                            {
                                positionType: 'right',
                                style: elementStyles?.col,
                                element: [{ ...commonObj, type: "", id: finalObj?.mobile_pages[mobile_pageIndex]?.values?.length }]
                            }
                        ]
                    }
                ]
            } else if (transferedData === "col2") {
                updatedColWise = [
                    ...finalObj?.pages[pageIndex]?.values, {
                        id: finalObj?.pages[pageIndex]?.values?.length + 1,
                        col: 2,
                        style: elementStyles?.block,
                        elements: [
                            {
                                positionType: 'left',
                                style: elementStyles?.col,
                                element: [{ ...commonObj, type: "", id: finalObj?.pages[pageIndex]?.values?.length }]
                            },
                            {
                                positionType: 'right',
                                style: elementStyles?.col,
                                element: [{ ...commonObj, type: "", id: finalObj?.pages[pageIndex]?.values?.length }]
                            }
                        ]
                    }
                ]
                mobile_updatedColWise = [
                    ...finalObj?.mobile_pages[mobile_pageIndex]?.values, {
                        id: finalObj?.mobile_pages[mobile_pageIndex]?.values?.length + 1,
                        col: 2,
                        style: elementStyles?.block,
                        elements: [
                            {
                                positionType: 'left',
                                style: elementStyles?.col,
                                element: [{ ...commonObj, type: "", id: finalObj?.mobile_pages[mobile_pageIndex]?.values?.length }]
                            },
                            {
                                positionType: 'right',
                                style: elementStyles?.col,
                                element: [{ ...commonObj, type: "", id: finalObj?.mobile_pages[mobile_pageIndex]?.values?.length }]
                            }
                        ]
                    }
                ]
            } else if (transferedData === "col1") {
                updatedColWise = [
                    ...finalObj?.pages[pageIndex]?.values, {
                        id: finalObj?.pages[pageIndex]?.values?.length + 1,
                        col: 1,
                        style: elementStyles?.block,
                        elements: [
                            {
                                positionType: 'left',
                                style: elementStyles?.col,
                                element: [{ ...commonObj, type: "", id: finalObj?.pages[pageIndex]?.values?.length }]
                            }
                        ]
                    }
                ]
                mobile_updatedColWise = [
                    ...finalObj?.mobile_pages[mobile_pageIndex]?.values, {
                        id: finalObj?.mobile_pages[mobile_pageIndex]?.values?.length + 1,
                        col: 1,
                        style: elementStyles?.block,
                        elements: [
                            {
                                positionType: 'left',
                                style: elementStyles?.col,
                                element: [{ ...commonObj, type: "", id: finalObj?.mobile_pages[mobile_pageIndex]?.values?.length }]
                            }
                        ]
                    }
                ]
            } else if (transferedData !== "" && !transferedData?.includes("col")) {
                const inputTypeCondition = draggedInputType === "none" ? commonObj?.inputType : draggedInputType
                updatedColWise = [
                    ...finalObj?.pages[pageIndex]?.values, {
                        id: finalObj?.pages[pageIndex]?.values?.length + 1,
                        col: 1,
                        style: elementStyles?.block,
                        elements: [
                            {
                                positionType: 'left',
                                style: elementStyles?.col,
                                element: [dataTransfered?.includes("rearrange") ? { ...finalObj?.pages[pageIndex]?.values[dragStartIndex?.cur]?.elements[finalObj?.pages[pageIndex]?.values[dragStartIndex?.cur]?.elements?.findIndex($ => $?.positionType === dragStartIndex.curElem)]?.element[dragStartIndex?.subElem] } : { ...commonObj, type: transferedData, inputType: inputTypeCondition, placeholder: inputTypeList[inputTypeList?.findIndex($ => $.value === inputTypeCondition)]?.label, labelText: inputTypeList[inputTypeList?.findIndex($ => $.value === inputTypeCondition)]?.label, id: finalObj?.pages[pageIndex]?.values?.length, style: elementStyles?.[transferedData] }]
                            }
                        ]
                    }
                ]
                mobile_updatedColWise = [
                    ...finalObj?.mobile_pages[mobile_pageIndex]?.values, {
                        id: finalObj?.mobile_pages[mobile_pageIndex]?.values?.length + 1,
                        col: 1,
                        style: elementStyles?.block,
                        elements: [
                            {
                                positionType: 'left',
                                style: elementStyles?.col,
                                element: [dataTransfered?.includes("rearrange") ? { ...finalObj?.mobile_pages[mobile_pageIndex]?.values[dragStartIndex?.cur]?.elements[finalObj?.mobile_pages[mobile_pageIndex]?.values[dragStartIndex?.cur]?.elements?.findIndex($ => $?.positionType === dragStartIndex.curElem)]?.element[dragStartIndex?.subElem] } : { ...commonObj, type: transferedData, inputType: inputTypeCondition, placeholder: inputTypeList[inputTypeList?.findIndex($ => $.value === inputTypeCondition)]?.label, labelText: inputTypeList[inputTypeList?.findIndex($ => $.value === inputTypeCondition)]?.label, id: finalObj?.pages[pageIndex]?.values?.length, style: elementStyles?.[transferedData] }]
                            }
                        ]
                    }
                ]
            }
        }


        if (dataTransfered.includes("rearrange")) {
            updatedColWise[dragStartIndex.cur]?.elements[finalObj?.pages[pageIndex]?.values[dragStartIndex.cur]?.elements?.findIndex($ => $?.positionType === dragStartIndex.curElem)]?.element?.splice(dragStartIndex?.subElem, 1, { ...commonObj })
            mobile_updatedColWise[dragStartIndex.cur]?.elements[finalObj?.mobile_pages[mobile_pageIndex]?.values[dragStartIndex.cur]?.elements?.findIndex($ => $?.positionType === dragStartIndex.curElem)]?.element?.splice(dragStartIndex?.subElem, 1, { ...commonObj })
        }

        setcolWise(isMobile ? mobile_updatedColWise : updatedColWise)
    }

    const handleElementDrop = (e, position, id, index, curData, j) => {
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
            const updatedColWise = newObj?.pages[pageIndex]?.values?.map((col, index) => {
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
            const mobile_updatedColWise = newObj?.mobile_pages[mobile_pageIndex]?.values?.map((col, index) => {
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
            }
            setcolWise(isMobile ? mobile_updatedColWise : updatedColWise)

            newObj.pages[pageIndex].values = [...updatedColWise]
            newObj.mobile_pages[mobile_pageIndex].values = [...mobile_updatedColWise]
            updatePresent({ ...newObj })
        }
    }

    const makActive = (e, cur, curData, position, id, j) => {
        setCurrPosition({ ...currPosition, position, id, name: e.target.name, curData, cur, j })
    }

    const changeColumn = (col, width) => {
        const newObj = { ...finalObj }
        const dupArray = currPage === "button" ? [...newObj?.[`button`]] : [...newObj?.[`pages`][newObj?.[`pages`]?.findIndex($ => $.id === currPage)].values]
        const mobile_dupArray = currPage === "button" ? [...newObj?.[`mobile_button`]] : [...newObj?.[`mobile_pages`][newObj?.[`mobile_pages`]?.findIndex($ => $.id === currPage)].values]
        let elements, mobile_elements
        if (col === "1") {
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
        } else if (col === "2") {
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
            elements = [
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
    }

    const getMDToggle = ({ label, value }) => {
        console.log(currPosition, "currPosition")
        const newObj = { ...finalObj }
        const arr1 = Array.isArray(finalObj?.responsive) ? [...finalObj?.responsive] : []
        const index1 = arr1?.findIndex($ => {
            return currPosition?.selectedType === "close" ? $?.pageName === "close" : $?.pageName === currPage
        })
        const arr2 = Array.isArray(arr1[index1]?.position) ? [...arr1[index1]?.position] : []
        const index2 = arr2?.findIndex($ => isEqual($?.id, { ...indexes }))
        const arr3 = Array.isArray(arr2[index2]?.style) ? [...arr2[index2]?.style] : []
        const index3 = arr3?.findIndex($ => $?.styleName === value)

        const condition1 = arr1?.some($ => {
            return currPosition?.selectedType === "close" ? $?.pageName === "close" : $?.pageName === currPage
        })
        const condition2 = arr2?.some($ => isEqual($?.id, { ...indexes }))
        const condition3 = arr3?.some($ => $?.styleName === value)

        let icon
        if (condition1 && condition2 && condition3 && arr3[index3]?.isSame) {
            icon = <div className="d-flex align-items-center gap-2">
                <Monitor size={"12px"} /><Smartphone size={"12px"} />
            </div>
        } else {
            icon = isMobile ? <Smartphone size={"15px"} /> : <Monitor size={"15px"} />
        }

        const setCondition = (condition) => {
            if (condition1 && condition2 && condition3) {
                newObj.responsive[index1].position[index2].style[index3].isSame = condition
            } else {
                if (!condition1) {
                    newObj.responsive = [...arr1, { pageName: currPosition?.selectedType === "close" ? "close" : currPage, position: [{ id: { ...indexes }, style: [{ styleName: value, isSame: condition, view: isMobile ? "mobile" : "desktop" }] }] }]
                } else if (!condition2) {
                    if (newObj?.responsive[index1]) {
                        newObj.responsive[index1].position = [...arr2, { id: { ...indexes }, style: [{ styleName: value, isSame: condition, view: isMobile ? "mobile" : "desktop" }] }]
                    } else {
                        newObj?.responsive?.push({ pageName: currPosition?.selectedType === "close" ? "close" : currPage, position: [{ id: { ...indexes }, style: [{ styleName: value, isSame: condition, view: isMobile ? "mobile" : "desktop" }] }] })
                    }
                } else if (!condition3) {
                    if (newObj?.responsive[index1]?.position[index2]) {
                        newObj.responsive[index1].position[index2].style = [...arr3, { styleName: value, isSame: condition, view: isMobile ? "mobile" : "desktop" }]
                    } else {
                        newObj?.responsive[index1]?.position?.push({ id: { ...indexes }, style: [{ styleName: value, isSame: condition, view: isMobile ? "mobile" : "desktop" }] })
                    }
                }
            }
            updatePresent({ ...newObj })
        }

        return (
            <div className="d-flex justify-content-between align-items-center mb-2"><span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>{label}</span>
                <UncontrolledButtonDropdown>
                    <DropdownToggle color='dark' style={{ padding: "0.5rem" }} className='hide-after-dropdown rounded'>
                        {icon}
                    </DropdownToggle>
                    <DropdownMenu end>
                        <DropdownItem onClick={() => {
                            setCondition(false)
                            setIsMobile(false)
                        }} className={`w-100 ${(!condition1 && !condition2 && !condition3 && !isMobile && !arr3[index3]?.isSame) ? "btn-primary-main" : ""}`}>
                            Desktop View Only
                        </DropdownItem>
                        <DropdownItem onClick={() => {
                            setCondition(false)
                            setIsMobile(true)
                        }} className={`w-100 ${(!condition1 && !condition2 && !condition3 && isMobile && !arr3[index3]?.isSame) ? "btn-primary-main" : ""}`}>
                            Mobile View Only
                        </DropdownItem>
                        <DropdownItem onClick={() => setCondition(true)} className={`w-100 ${(condition1 && condition2 && condition3 && arr3[index3]?.isSame) ? "btn-primary-main" : ""}`}>
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

    const renderElems = () => {

        const colWise = currPage === "button" ? [...finalObj?.[`${mobileCondition}button`]] : [...finalObj?.[`${mobileCondition}pages`][finalObj?.[`${mobileCondition}pages`]?.findIndex($ => $.id === currPage)].values]
        const { selectedType } = currPosition
        let styles, general, spacing

        const draggedTypes = new Array()

        colWise?.forEach(cur => {
            cur?.elements?.forEach(curElem => {
                curElem.element?.forEach(subElem => {
                    if (subElem?.type === "input") {
                        draggedTypes?.push(subElem?.inputType)
                    }
                })
            })
        })

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
                                                setValues({ ...values, widthType: e.value, width: e.value, minHeight: "0px", padding: "10px" })
                                            } else if (e.value === "100%") {
                                                setValues({ ...values, widthType: e.value, width: e.value, minHeight: "0px", padding: "10px" })
                                            } else if (e.value === "custom") {
                                                setValues({ ...values, widthType: e.value, padding: "10px" })
                                            }
                                        }} id="" options={widthOptions} />
                                    </div>
                                    {values.widthType === "custom" && <div className='mb-2 pb-1 border-bottom'>
                                        {getMDToggle({ label: `Width: ${arr[indexes?.cur]?.elements[positionIndex]?.element[indexes?.subElem]?.style?.width || ""}`, value: "width" })}
                                        <div className="d-flex p-0 justify-content-between align-items-center gap-2">
                                            <input value={parseFloat(values?.width)} type='range' className='w-100' onChange={e => {
                                                setValues({ ...values, width: `${e.target.value}px` })
                                            }} name="height" min="20" max="600" />
                                        </div>
                                    </div>}
                                    {values.widthType !== "auto" && <div className='mb-2 pb-1 border-bottom'>
                                        {getMDToggle({ label: `Height: ${arr[indexes?.cur]?.elements[positionIndex]?.element[indexes?.subElem]?.style?.minHeight || ""}`, value: "minHeight" })}
                                        <div className="d-flex p-0 justify-content-between align-items-center gap-2">
                                            <input value={parseFloat(values?.minHeight)} type='range' className='w-100' onChange={e => {
                                                setValues({ ...values, minHeight: `${e.target.value}px` })
                                            }} name="height" min="0" max="600" />
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
                                        {getMDToggle({ label: `Background: `, value: "bgType" })}
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
                                <BorderChange getMDToggle={getMDToggle} setStyles={setValues} styles={values} />
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
        } else if (selectedType === "radio") {
            const images = [
                { value: radio1, alt: radio1 },
                { value: radio2, alt: radio2 },
                { value: radio3, alt: radio3 },
                { value: radio4, alt: radio4 },
                { value: radio5, alt: radio5 }
            ]
            general = (
                <>
                    <div className='px-1 mx-0 my-1'>
                        <div className='p-0 mb-1 me-1 justify-content-start align-items-center'>
                            <div>
                                <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Type:</span>
                                <Select>
                                    <option>Radio</option>
                                    <option>New Radio</option>
                                </Select>
                            </div>
                            <div className='mt-1'>
                                <div className='border w-100 d-flex gap-1 justify-content-center align-items-center' style={{padding: "7px", borderRadius: "5px"}}>
                                    <Settings/>
                                    <label className='fw-bold' >Manage Settings</label>
                                </div>
                            </div>
                            <div className='mt-1'>
                                <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Type:</span>
                                <Input type='text' value='My Option 1'/>
                            </div>
                            <div className='d-flex gap-1 mt-1'>
                                <PlusCircle color='#ed5a29' size='20px'/>
                                <label className='fw-bold' style={{color: "#ed5a29"}}>Add new option</label>
                            </div>
                            <div className='mt-2 d-flex justify-content-between align-items-center'>
                                <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Required</span>
                                <div className='form-check form-switch form-check-success'>
                                    <Input type='checkbox' />
                                </div>
                            </div>
                        </div>
                    </div>
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
                                        <div className='p-0 mx-0 my-1'>
                                            <div className='p-0 mb-1 justify-content-start align-items-center'>
                                                {getMDToggle({ label: `Color`, value: `bgType` })}
                                                <div style={{ backgroundImage: `url(${pixels})` }}>
                                                    <div className="p-1 border rounded" style={{ backgroundImage: values?.backgroundImage, backgroundColor: values?.backgroundColor }} onClick={() => setBgModal0(!bgModal0)}></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='p-0 mx-0 my-1'>
                                            <div className='p-0 mb-1 justify-content-start align-items-center'>
                                                {getMDToggle({ label: `Style`, value: `bgType` })}
                                            </div>
                                            <div className='d-flex flex-wrap gap-1'>
                                                {
                                                    images.map((ele, index) => (
                                                        <img key={index} src={ele.value} alt={ele.alt} />
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        <div className='p-0 mx-0 my-1'>
                                            <div className='p-0 mb-1 justify-content-start align-items-center'>
                                                {getMDToggle({ label: `Width`, value: `bgType` })}
                                            </div>
                                            <div className="d-flex p-0 justify-content-between align-items-center gap-2">
                                                <input value={parseFloat(values?.width)} type='range' className='w-100' onChange={e => {
                                                    setValues({ ...values, width: `${e.target.value}px` })
                                                }} name="height" min="20" max="600" />
                                            </div>
                                        </div>

                                        <div className='p-0 mx-0 my-1'>
                                            <div className='p-0 mb-1 justify-content-start align-items-center'>
                                                {getMDToggle({ label: `Height`, value: `bgType` })}
                                            </div>
                                            <div className="d-flex p-0 justify-content-between align-items-center gap-2">
                                                <input value={parseFloat(values?.minHeight)} type='range' className='w-100' onChange={e => {
                                                    setValues({ ...values, minHeight: `${e.target.value}px` })
                                                }} name="height" min="0" max="600" />
                                            </div>
                                        </div>

                                        <div className='p-0 mx-0 my-1'>
                                            <div className='p-0 mb-1 justify-content-start align-items-center'>
                                                {getMDToggle({ label: `Alignment`, value: `bgType` })}
                                            </div>
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
                                        </div>
                                    </div>
                                </div>
                            </AccordionBody>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionHeader className='acc-header' targetId='2' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                                <p className='m-0 fw-bolder text-black text-uppercase' style={{ padding: "0.5rem 0px", fontSize: "0.75rem" }}>Font</p>
                            </AccordionHeader>
                            <AccordionBody accordionId='2'>
                                <div className='p-0 mx-0 my-1'>
                                    <div className='p-0 mb-1 justify-content-start align-items-center'>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <label className='fw-bold'>Font family</label>
                                            <select className='form-control w-50'>
                                                {
                                                    fontStyles.map((ele) => (
                                                        <option value={ele.label}>{ele.label}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className='mt-2'>
                                            <div className='border w-100 d-flex gap-1 justify-content-center align-items-center' style={{padding: "7px", borderRadius: "5px"}}>
                                                <Menu/>
                                                <label className='fw-bold'>Manage Fonts</label>
                                            </div>
                                        </div>
                                        <div className='d-flex justify-content-between align-items-center mt-2'>
                                            <label className='fw-bold'>Color</label>
                                            <div style={{ backgroundImage: `url(${pixels})`, width: "110px" }}>
                                                <div className="p-1 border rounded" style={{ backgroundImage: values?.backgroundImage, backgroundColor: values?.backgroundColor }} onClick={() => setBgModal0(!bgModal0)}>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </AccordionBody>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionHeader className='acc-header' targetId='2' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                                <p className='m-0 fw-bolder text-black text-uppercase' style={{ padding: "0.5rem 0px", fontSize: "0.75rem" }}>Background fill</p>
                            </AccordionHeader>
                            <AccordionBody accordionId='2'>
                                <div className='p-0 mx-0 my-1'>
                                    <div className='p-0 mb-1 justify-content-start align-items-center'>
                                        {getMDToggle({ label: `Background`, value: `bgType` })}
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
                                <BorderChange getMDToggle={getMDToggle} styles={values} setStyles={setValues} />
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

        } else if (selectedType === "checkbox") {
            const images = [
                { value: check1, alt: check1 },
                { value: check2, alt: check2 },
                { value: check3, alt: check3 },
                { value: check4, alt: check4 },
                { value: check5, alt: check5 }
            ]

            general = (
                <>
                    <div className='px-1 mx-0 my-1'>
                        <div className='p-0 mb-1 me-1 justify-content-start align-items-center'>
                            <div>
                                <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Type:</span>
                                <Select>
                                    <option>Radio</option>
                                    <option>New Radio</option>
                                </Select>
                            </div>
                            <div className='mt-1'>
                                <div className='border w-100 d-flex gap-1 justify-content-center align-items-center' style={{padding: "7px", borderRadius: "5px"}}>
                                    <Settings/>
                                    <label className='fw-bold' >Manage Settings</label>
                                </div>
                            </div>
                            <div className='mt-1'>
                                <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Type:</span>
                                <Input type='text' value='My Option 1'/>
                            </div>
                            <div className='d-flex gap-1 mt-1'>
                                <PlusCircle color='#ed5a29' size='20px'/>
                                <label className='fw-bold' style={{color: "#ed5a29"}}>Add new option</label>
                            </div>
                            <div className='mt-2 d-flex justify-content-between align-items-center'>
                                <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Required</span>
                                <div className='form-check form-switch form-check-success'>
                                    <Input type='checkbox' />
                                </div>
                            </div>
                        </div>
                    </div>
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
                                        <div className='p-0 mx-0 my-1'>
                                            <div className='p-0 mb-1 justify-content-start align-items-center'>
                                                {getMDToggle({ label: `Color`, value: `bgType` })}
                                                <div style={{ backgroundImage: `url(${pixels})` }}>
                                                    <div className="p-1 border rounded" style={{ backgroundImage: values?.backgroundImage, backgroundColor: values?.backgroundColor }} onClick={() => setBgModal0(!bgModal0)}></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='p-0 mx-0 my-1'>
                                            <div className='p-0 mb-1 justify-content-start align-items-center'>
                                                {getMDToggle({ label: `Style`, value: `bgType` })}
                                            </div>
                                            <div className='d-flex flex-wrap gap-1'>
                                                {/* <div>                                            
                                                    <img src={radio1}/>
                                                </div>
                                                <div>
                                                    <img src={radio2}/>
                                                </div>
                                                <div>
                                                    <img src={radio3}/>
                                                </div>
                                                <div>
                                                    <img src={radio4}/>
                                                </div>
                                                <div>
                                                    <img src={radio5}/>
                                                </div> */}
                                                {
                                                    images.map((ele, index) => (
                                                        <img key={index} src={ele.value} alt={ele.alt} />
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        <div className='p-0 mx-0 my-1'>
                                            <div className='p-0 mb-1 justify-content-start align-items-center'>
                                                {getMDToggle({ label: `Width`, value: `bgType` })}
                                            </div>
                                            <div className="d-flex p-0 justify-content-between align-items-center gap-2">
                                                <input value={parseFloat(values?.width)} type='range' className='w-100' onChange={e => {
                                                    setValues({ ...values, width: `${e.target.value}px` })
                                                }} name="height" min="20" max="600" />
                                            </div>
                                        </div>

                                        <div className='p-0 mx-0 my-1'>
                                            <div className='p-0 mb-1 justify-content-start align-items-center'>
                                                {getMDToggle({ label: `Height`, value: `bgType` })}
                                            </div>
                                            <div className="d-flex p-0 justify-content-between align-items-center gap-2">
                                                <input value={parseFloat(values?.minHeight)} type='range' className='w-100' onChange={e => {
                                                    setValues({ ...values, minHeight: `${e.target.value}px` })
                                                }} name="height" min="0" max="600" />
                                            </div>
                                        </div>

                                        <div className='p-0 mx-0 my-1'>
                                            <div className='p-0 mb-1 justify-content-start align-items-center'>
                                                {getMDToggle({ label: `Alignment`, value: `bgType` })}
                                            </div>
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
                                        </div>
                                    </div>
                                </div>
                            </AccordionBody>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionHeader className='acc-header' targetId='2' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                                <p className='m-0 fw-bolder text-black text-uppercase' style={{ padding: "0.5rem 0px", fontSize: "0.75rem" }}>Font</p>
                            </AccordionHeader>
                            <AccordionBody accordionId='2'>
                                <div className='p-0 mx-0 my-1'>
                                    <div className='p-0 mb-1 justify-content-start align-items-center'>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <label className='fw-bold'>Font family</label>
                                            <select className='form-control w-50'>
                                                {
                                                    fontStyles.map((ele) => (
                                                        <option value={ele.label}>{ele.label}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className='mt-2'>
                                            <div className='border w-100 d-flex gap-1 justify-content-center align-items-center' style={{padding: "7px", borderRadius: "5px"}}>
                                                <Menu/>
                                                <label className='fw-bold'>Manage Fonts</label>
                                            </div>
                                        </div>
                                        <div className='d-flex justify-content-between align-items-center mt-2'>
                                            <label className='fw-bold'>Color</label>
                                            <div style={{ backgroundImage: `url(${pixels})`, width: "110px" }}>
                                                <div className="p-1 border rounded" style={{ backgroundImage: values?.backgroundImage, backgroundColor: values?.backgroundColor }} onClick={() => setBgModal0(!bgModal0)}>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </AccordionBody>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionHeader className='acc-header' targetId='2' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                                <p className='m-0 fw-bolder text-black text-uppercase' style={{ padding: "0.5rem 0px", fontSize: "0.75rem" }}>Background fill</p>
                            </AccordionHeader>
                            <AccordionBody accordionId='2'>
                                <div className='p-0 mx-0 my-1'>
                                    <div className='p-0 mb-1 justify-content-start align-items-center'>
                                        {getMDToggle({ label: `Background`, value: `bgType` })}
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
                                <BorderChange getMDToggle={getMDToggle} styles={values} setStyles={setValues} />
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

        } else if (selectedType === "dropdown") {

            general = (
                <>
                    <div className='px-1 mx-0 my-1'>
                        <div className='p-0 mb-1 me-1 justify-content-start align-items-center'>
                            <div>
                                <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Type:</span>
                                <Select>
                                    <option>Radio</option>
                                    <option>New Radio</option>
                                </Select>
                            </div>
                            <div className='mt-1'>
                                <div className='border w-100 d-flex gap-1 justify-content-center align-items-center' style={{padding: "7px", borderRadius: "5px"}}>
                                    <Settings/>
                                    <label className='fw-bold' >Manage Settings</label>
                                </div>
                            </div>
                            <div className='mt-1'>
                                <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Type:</span>
                                <Input type='text' value='My Option 1'/>
                            </div>
                            <div className='d-flex gap-1 mt-1'>
                                <PlusCircle color='#ed5a29' size='20px'/>
                                <label className='fw-bold' style={{color: "#ed5a29"}}>Add new option</label>
                            </div>
                            <div className='mt-2 d-flex justify-content-between align-items-center'>
                                <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Required</span>
                                <div className='form-check form-switch form-check-success'>
                                    <Input type='checkbox' />
                                </div>
                            </div>
                        </div>
                    </div>
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
                                        <div className='p-0 mx-0 my-1'>
                                            <div className='p-0 mb-1 justify-content-start align-items-center'>
                                                {getMDToggle({ label: `Width`, value: `bgType` })}
                                            </div>
                                            <div className="d-flex p-0 justify-content-between align-items-center gap-2">
                                                <input value={parseFloat(values?.width)} type='range' className='w-100' onChange={e => {
                                                    setValues({ ...values, width: `${e.target.value}px` })
                                                }} name="height" min="20" max="600" />
                                            </div>
                                        </div>

                                        <div className='p-0 mx-0 my-1'>
                                            <div className='p-0 mb-1 justify-content-start align-items-center'>
                                                {getMDToggle({ label: `Height`, value: `bgType` })}
                                            </div>
                                            <div className="d-flex p-0 justify-content-between align-items-center gap-2">
                                                <input value={parseFloat(values?.minHeight)} type='range' className='w-100' onChange={e => {
                                                    setValues({ ...values, minHeight: `${e.target.value}px` })
                                                }} name="height" min="0" max="600" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </AccordionBody>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionHeader className='acc-header' targetId='2' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                                <p className='m-0 fw-bolder text-black text-uppercase' style={{ padding: "0.5rem 0px", fontSize: "0.75rem" }}>Font</p>
                            </AccordionHeader>
                            <AccordionBody accordionId='2'>
                                <div className='p-0 mx-0 my-1'>
                                    <div className='p-0 mb-1 justify-content-start align-items-center'>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <label className='fw-bold'>Font family</label>
                                            <select className='form-control w-50'>
                                                {
                                                    fontStyles.map((ele) => (
                                                        <option value={ele.label}>{ele.label}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className='mt-2'>
                                            <div className='border w-100 d-flex gap-1 justify-content-center align-items-center' style={{padding: "7px", borderRadius: "5px"}}>
                                                <Menu/>
                                                <label className='fw-bold'>Manage Fonts</label>
                                            </div>
                                        </div>
                                        <div className='d-flex justify-content-between align-items-center mt-2'>
                                            <label className='fw-bold'>Color</label>
                                            <div style={{ backgroundImage: `url(${pixels})`, width: "110px" }}>
                                                <div className="p-1 border rounded" style={{ backgroundImage: values?.backgroundImage, backgroundColor: values?.backgroundColor }} onClick={() => setBgModal0(!bgModal0)}>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </AccordionBody>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionHeader className='acc-header' targetId='2' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                                <p className='m-0 fw-bolder text-black text-uppercase' style={{ padding: "0.5rem 0px", fontSize: "0.75rem" }}>Background fill</p>
                            </AccordionHeader>
                            <AccordionBody accordionId='2'>
                                <div className='p-0 mx-0 my-1'>
                                    <div className='p-0 mb-1 justify-content-start align-items-center'>
                                        {getMDToggle({ label: `Background`, value: `bgType` })}
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
                                <BorderChange getMDToggle={getMDToggle} styles={values} setStyles={setValues} />
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

        } else if (selectedType === "textarea") {

            general = (
                <>
                    <div className='px-1 mx-0 my-1'>
                        <div className='p-0 mb-1 me-1 justify-content-start align-items-center'>
                            <div>
                                <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Type:</span>
                                <Select>
                                    <option>Radio</option>
                                    <option>New Radio</option>
                                </Select>
                            </div>
                            <div className='mt-1'>
                                <div className='border w-100 d-flex gap-1 justify-content-center align-items-center' style={{padding: "7px", borderRadius: "5px"}}>
                                    <Settings/>
                                    <label className='fw-bold' >Manage Settings</label>
                                </div>
                            </div>
                            <div className='mt-1'>
                                <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Type:</span>
                                <Input type='text' value='My Option 1'/>
                            </div>
                            <div className='d-flex gap-1 mt-1'>
                                <PlusCircle color='#ed5a29' size='20px'/>
                                <label className='fw-bold' style={{color: "#ed5a29"}}>Add new option</label>
                            </div>
                            <div className='mt-2 d-flex justify-content-between align-items-center'>
                                <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Required</span>
                                <div className='form-check form-switch form-check-success'>
                                    <Input type='checkbox' />
                                </div>
                            </div>
                        </div>
                    </div>
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
                                        <div className='p-0 mx-0 my-1'>
                                            <div className='p-0 mb-1 justify-content-start align-items-center'>
                                                {getMDToggle({ label: `Width`, value: `bgType` })}
                                            </div>
                                            <div className="d-flex p-0 justify-content-between align-items-center gap-2">
                                                <input value={parseFloat(values?.width)} type='range' className='w-100' onChange={e => {
                                                    setValues({ ...values, width: `${e.target.value}px` })
                                                }} name="height" min="20" max="600" />
                                            </div>
                                        </div>

                                        <div className='p-0 mx-0 my-1'>
                                            <div className='p-0 mb-1 justify-content-start align-items-center'>
                                                {getMDToggle({ label: `Height`, value: `bgType` })}
                                            </div>
                                            <div className="d-flex p-0 justify-content-between align-items-center gap-2">
                                                <input value={parseFloat(values?.minHeight)} type='range' className='w-100' onChange={e => {
                                                    setValues({ ...values, minHeight: `${e.target.value}px` })
                                                }} name="height" min="0" max="600" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </AccordionBody>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionHeader className='acc-header' targetId='2' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                                <p className='m-0 fw-bolder text-black text-uppercase' style={{ padding: "0.5rem 0px", fontSize: "0.75rem" }}>Font</p>
                            </AccordionHeader>
                            <AccordionBody accordionId='2'>
                                <div className='p-0 mx-0 my-1'>
                                    <div className='p-0 mb-1 justify-content-start align-items-center'>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <label className='fw-bold'>Font family</label>
                                            <select className='form-control w-50'>
                                                {
                                                    fontStyles.map((ele) => (
                                                        <option value={ele.label}>{ele.label}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className='mt-2'>
                                            <div className='border w-100 d-flex gap-1 justify-content-center align-items-center' style={{padding: "7px", borderRadius: "5px"}}>
                                                <Menu/>
                                                <label className='fw-bold'>Manage Fonts</label>
                                            </div>
                                        </div>
                                        <div className='d-flex justify-content-between align-items-center mt-2'>
                                            <label className='fw-bold'>Color</label>
                                            <div style={{ backgroundImage: `url(${pixels})`, width: "110px"}}>
                                                <div className="p-1 border rounded" style={{ backgroundImage: values?.backgroundImage, backgroundColor: values?.backgroundColor }} onClick={() => setBgModal0(!bgModal0)}>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </AccordionBody>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionHeader className='acc-header' targetId='2' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                                <p className='m-0 fw-bolder text-black text-uppercase' style={{ padding: "0.5rem 0px", fontSize: "0.75rem" }}>Background fill</p>
                            </AccordionHeader>
                            <AccordionBody accordionId='2'>
                                <div className='p-0 mx-0 my-1'>
                                    <div className='p-0 mb-1 justify-content-start align-items-center'>
                                        {getMDToggle({ label: `Background`, value: `bgType` })}
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
                                <BorderChange getMDToggle={getMDToggle} styles={values} setStyles={setValues} />
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
                                        {getMDToggle({ label: `Text Rotation: ${parseFloat(values?.rotate)}°`, value: `rotate` })}
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
                                        {getMDToggle({ label: `Background`, value: `bgType` })}
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
                                <BorderChange getMDToggle={getMDToggle} styles={values} setStyles={setValues} />
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
                                <BorderChange getMDToggle={getMDToggle} styles={values} setStyles={setValues} />
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
                                                    console.log("getArray", arr)
                                                    setcolWise([...arr])
                                                }} size={19} /><Edit onClick={openImgModal} size={19} />
                                            </div> : colWise[indexes.cur]?.elements[positionIndex]?.element[indexes.subElem]?.src === "http://www.palmares.lemondeduchiffre.fr/images/joomlart/demo/default.jpg" ? <PlusCircle onClick={openImgModal} size={19} /> : <div className="d-flex align-items-center gap-1">
                                                <Trash onClick={() => {
                                                    arr[indexes?.cur].elements[positionIndex].element[indexes?.subElem].isBrandLogo = false
                                                    arr[indexes?.cur].elements[positionIndex].element[indexes?.subElem].src = "http://www.palmares.lemondeduchiffre.fr/images/joomlart/demo/default.jpg"
                                                    console.log("getArray", arr)
                                                    setcolWise([...arr])
                                                }} size={19} /><Edit onClick={openImgModal} size={19} />
                                            </div>}
                                        </div>
                                        <img style={{ maxWidth: "100%", maxHeight: "100%" }} src={colWise[indexes.cur]?.elements[positionIndex]?.element[indexes.subElem]?.isBrandLogo ? finalObj?.defaultThemeColors?.brandLogo : colWise[indexes.cur]?.elements[positionIndex]?.element[indexes.subElem]?.src} alt="" />
                                    </div>
                                    <div className='mb-1'>
                                        {getMDToggle({ label: `Width: ${imgWidth}`, value: `width` })}
                                        <div className="p-0 justify-content-start align-items-center gap-2">
                                            <input value={parseFloat(imgWidth)} onChange={(e) => {
                                                setValues({ ...values, width: `${e.target.value}px` })
                                            }} type='range' className='w-100' name="height" min="20" max="1500" />
                                        </div>
                                    </div>
                                    <div className='mb-1'>
                                        {getMDToggle({ label: `Height: ${imgHeight}`, value: `height` })}
                                        <div className="p-0 justify-content-start align-items-center gap-2">
                                            <input value={parseFloat(imgHeight)} onChange={(e) => {
                                                setValues({ ...values, height: `${e.target.value}px` })
                                            }} type='range' className='w-100' name="height" min="20" max="1500" />
                                        </div>
                                    </div>
                                    <div className='p-0 mb-1 align-items-center'>
                                        {getMDToggle({ label: `Alignment`, value: `margin` })}
                                        <Select value={alignOptions?.filter(item => item?.value === colWise[indexes?.cur]?.elements[positionIndex]?.element[indexes?.subElem]?.style?.margin)} onChange={e => {
                                            arr[indexes?.cur].elements[positionIndex].element[indexes?.subElem].style.margin = e.value
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
                                        {getMDToggle({ label: `Background`, value: `bgType` })}
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
                                <BorderChange getMDToggle={getMDToggle} styles={values} setStyles={setValues} />
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
                            <button className="btn p-0 d-flex justify-content-center align-items-center" onClick={() => changeColumn("1", { left: "100%", right: "0%" })} style={{ aspectRatio: "1", width: "50px" }}>
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
                            </button>
                            <button className="btn p-0 d-flex justify-content-center align-items-center" onClick={() => changeColumn("2", { left: "100%", right: "100%" })} style={{ aspectRatio: "1", width: "50px" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 54" className='w-75'>
                                    <g strokeWidth={3} stroke="#727272">
                                        <rect x={2} y={2} width={60} rx={5} height={50} fill="transparent" />
                                        <path d="M32 52V2" />
                                    </g>
                                </svg>
                            </button>
                            <button className="btn p-0 d-flex justify-content-center align-items-center" onClick={() => changeColumn("3", { left: "100%", center: "100%", right: "100%" })} style={{ aspectRatio: "1", width: "50px" }}>
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
                                    <button onClick={() => changeColumn("2", { left: "25%", right: "75%" })} className="btn p-0 d-flex justify-content-center align-items-center" style={{ aspectRatio: "1", width: "50px" }}>
                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 54" className='w-75'>
                                            <g strokeWidth="3" stroke="#727272">
                                                <rect x="2" y="2" width="60" rx="5" height="50" fill="transparent" ></rect>
                                                <path d="M16 52 L 16 2"></path>
                                            </g>
                                        </svg>
                                    </button>
                                    <button onClick={() => changeColumn("2", { left: `${100 / 3}%`, right: `${200 / 3}%` })} className="btn p-0 d-flex justify-content-center align-items-center" style={{ aspectRatio: "1", width: "50px" }}>
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
                                    <button onClick={() => changeColumn("2", { left: "50%", right: "50%" })} className="btn p-0 d-flex justify-content-center align-items-center" style={{ aspectRatio: "1", width: "50px" }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 54" className='w-75'>
                                            <g strokeWidth={3} stroke="#727272">
                                                <rect x={2} y={2} width={60} rx={5} height={50} fill="transparent" />
                                                <path d="M32 52V2" />
                                            </g>
                                        </svg>
                                    </button>
                                    <button onClick={() => changeColumn("2", { left: `${(350 * 100) / 600}%`, right: `${(250 * 100) / 600}%` })} className="btn p-0 d-flex justify-content-center align-items-center" style={{ aspectRatio: "1", width: "50px" }}>
                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 54" className='w-75'>
                                            <g strokeWidth="3" stroke="#727272">
                                                <rect x="2" y="2" width="60" rx="5" height="50" fill="transparent" ></rect>
                                                <path d="M37 52 L 37 2"></path>
                                            </g>
                                        </svg>
                                    </button>
                                    <button onClick={() => changeColumn("2", { left: `${200 / 3}%`, right: `${100 / 3}%` })} className="btn p-0 d-flex justify-content-center align-items-center" style={{ aspectRatio: "1", width: "50px" }}>
                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 54" className='w-75'>
                                            <g strokeWidth="3" stroke="#727272">
                                                <rect x="2" y="2" width="60" rx="5" height="50" fill="transparent" ></rect>
                                                <path d="M42 52 L 42 2" ></path>
                                            </g>
                                        </svg>
                                    </button>
                                </div>
                                <div className='d-flex justify-content-start align-items-center' style={{ marginLeft: "14.5px" }}>
                                    <button onClick={() => changeColumn("2", { left: "75%", right: "25%" })} className="btn p-0 d-flex justify-content-center align-items-center" style={{ aspectRatio: "1", width: "50px" }}>
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
                                    <button onClick={() => changeColumn("3", { left: `100%`, center: `100%`, right: `100%` })} className="btn p-0 d-flex justify-content-center align-items-center" style={{ aspectRatio: "1", width: "50px" }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 54" className='w-75'>
                                            <g strokeWidth={3} stroke="#727272">
                                                <rect x={2} y={2} width={60} rx={5} height={50} fill="transparent" />
                                                <path d="M21 52V2M42 52V2" />
                                            </g>
                                        </svg>
                                    </button>
                                    <button onClick={() => changeColumn("3", { left: `${100 / 2}%`, center: `${100 / 4}%`, right: `${100 / 4}%` })} className="btn p-0 d-flex justify-content-center align-items-center" style={{ aspectRatio: "1", width: "50px" }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 54" className='w-75'>
                                            <g strokeWidth={3} stroke="#727272">
                                                <rect x="2" y="2" width="60" rx="5" height="50" fill="transparent"></rect>
                                                <path d="M32 52 L 32 2"></path>
                                                <path d="M48 52 L 48 2"></path>
                                            </g>
                                        </svg>
                                    </button>
                                    <button onClick={() => changeColumn("3", { left: `${100 / 4}%`, center: `${100 / 2}%`, right: `${100 / 4}%` })} className="btn p-0 d-flex justify-content-center align-items-center" style={{ aspectRatio: "1", width: "50px" }}>
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
                                    <button onClick={() => changeColumn("3", { left: `${100 / 4}%`, center: `${100 / 4}%`, right: `${100 / 2}%` })} className="btn p-0 d-flex justify-content-center align-items-center" style={{ aspectRatio: "1", width: "50px" }}>
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
                    <UncontrolledAccordion defaultOpen={['1', '2', '3', '4']} stayOpen>
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
                                        }} id="" options={fontStyles} />
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
                            <AccordionHeader className='acc-header' targetId='3' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                                <p className='m-0 fw-bolder text-black text-uppercase' style={{ padding: "0.5rem 0px", fontSize: "0.75rem" }}>Background Fill</p>
                            </AccordionHeader>
                            <AccordionBody accordionId='3'>
                                <div className='p-0 mx-0 my-1'>
                                    <div className='p-0 mb-1 justify-content-start align-items-center'>
                                        {getMDToggle({ label: `Background:`, value: `bgType` })}
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
                                <BorderChange getMDToggle={getMDToggle} setStyles={setValues} styles={values} />
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
                                    }} options={inputTypeList?.filter(item => !draggedTypes?.includes(item?.value))} />
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
                                <input defaultValue={"Please fill this field"} type="text" name='title' min="0" max="300" className='form-control' />
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
            // console.log(mobileCondition, "mobileCondition")
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
                        {getMDToggle({ label: "Background Color", value: `backgroundColor` })}
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
                        <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>X Color</span>
                        <div className="rounded border" style={{ backgroundImage: `url(${pixels})` }}>
                            <div className="p-2" style={{ backgroundColor: finalObj?.crossButtons?.[`${mobileCondition}main`]?.color }} onClick={() => {
                                setColorType("color")
                                setCustomColorModal(!customColorModal)
                            }}></div>
                        </div>
                    </div>
                    <div className='my-1'>
                        <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Size: {finalObj?.crossButtons[`${pageCondition}`]?.width}</span>
                        <div className="p-0 justify-content-start align-items-center gap-2">
                            <input value={parseFloat(finalObj?.crossButtons[`${pageCondition}`]?.width)} type='range' className='w-100' name="height" min="5" max="300"
                                onChange={(e) => {
                                    updatePresent({ ...finalObj, crossButtons: { ...finalObj?.crossButtons, [`${pageCondition}`]: { ...finalObj?.crossButtons[`${pageCondition}`], width: `${e.target.value}px`, height: `${e.target.value}px`, maxWidth: `${e.target.value}px`, maxHeight: `${e.target.value}px` } } })
                                    // setCrossStyle({ ...crossStyle, width: `${e.target.value}px`, height: `${e.target.value}px`, maxWidth: `${e.target.value}px`, maxHeight: `${e.target.value}px` })
                                }} />
                        </div>
                    </div>
                    <div className='my-1'>
                        <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Corner radius: {finalObj?.crossButtons[`${pageCondition}`]?.borderRadius}</span>
                        <div className=" p-0 justify-content-start align-items-center gap-2">
                            <input value={parseFloat(finalObj?.crossButtons[`${pageCondition}`]?.borderRadius)} type='range' className='w-100' name="height" min="0" max="300"
                                onChange={(e) => {
                                    // const newSize = parseInt(e.target.value)
                                    updatePresent({ ...finalObj, crossButtons: { ...finalObj?.crossButtons, [`${pageCondition}`]: { ...finalObj?.crossButtons[`${pageCondition}`], borderRadius: `${e.target.value}px` } } })
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
                                    // console.log(e.target.value, "event")
                                    updatePresent({ ...finalObj, crossButtons: { ...finalObj?.crossButtons, [`${pageCondition}`]: { ...finalObj?.crossButtons[`${pageCondition}`], translateY: `${e.target.value}px` } } })

                                    // setCrossStyle({ ...crossStyle, translateY: `${e.target.value}px` })
                                }} type='range' className='w-100' name="height" min={currPage === "button" ? `-${(finalObj?.backgroundStyles[`${mobileCondition}button`][isMobile ? "maxWidth" : "width"]).replace("px", "")}` : `-${(finalObj?.backgroundStyles[`${mobileCondition}main`]?.[isMobile ? "maxWidth" : "width"]).replace("px", "")}`} max={currPage === "button" ? `${(finalObj?.backgroundStyles[`${mobileCondition}button`][isMobile ? "maxWidth" : "width"]).replace("px", "")}` : (finalObj?.backgroundStyles[`${mobileCondition}main`]?.[isMobile ? "maxWidth" : "width"]).replace("px", "")} />
                            </div>
                        </div>
                        <div className='my-1'>
                            <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Horizontal alignment: {finalObj?.crossButtons[`${pageCondition}`]?.translateX}</span>
                            <div className="p-0 justify-content-start align-items-center gap-2">
                                <input value={parseFloat(finalObj?.crossButtons[`${pageCondition}`]?.translateX)} onChange={e => {
                                    updatePresent({ ...finalObj, crossButtons: { ...finalObj?.crossButtons, [`${pageCondition}`]: { ...finalObj?.crossButtons[`${pageCondition}`], translateX: `${e.target.value}px` } } })

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
                                        {getMDToggle({ label: `Background:`, value: `bgType` })}
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
                                <BorderChange getMDToggle={getMDToggle} styles={values} setStyles={setValues} />
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
                                                <input value={finalObj?.selectedOffers[finalObj?.selectedOffers?.findIndex($ => isEqual($, selectedOffer))]?.url} placeHolder="Redeem URL" onChange={(e) => {
                                                    const newObj = { ...finalObj }
                                                    const offerIndex = newObj?.selectedOffers?.findIndex($ => isEqual($, selectedOffer))
                                                    newObj.selectedOffers[offerIndex].url = e.target.value
                                                    updatePresent({ ...newObj })
                                                }} className="form-control" id="redeemUrl" />

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
                                        <p className='fw-bolder text-black mb-1' style={{ fontSize: "0.75rem" }}>Max Height: {values?.maxHeight}</p>
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
                                                toast.error("You must have the Pro subscription to hide the branding")
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
                                        {getMDToggle({ label: `Background`, value: `bgType` })}
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
                                                const arr = [...colWise]
                                                arr.splice(key, 1)
                                                setcolWise([...arr])
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
                            {cur?.elements?.map((curElem, i) => (
                                <div onClick={(e) => {
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
                                    }} key={i}
                                    className='h-100 ms-2 position-relative tree-border'>
                                    <div className={`fw-bolder text-black ms-1 cursor-pointer d-flex align-items-center rounded ${isEqual({ cur: key, curElem: curElem.positionType, subElem: "parent" }, { ...indexes }) ? "bg-light-secondary" : ""}`} style={{ padding: "0.5rem", gap: "0.5rem" }}>
                                        <Columns color="#727272" size={15} />
                                        <p className='m-0 fw-bold text-capitalize w-100 text-black' style={{ fontSize: "0.85rem" }}>
                                            {`${cur?.elements?.length > 1 ? `${curElem?.positionType} ` : ""}`}column
                                        </p>
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
                                                    {subElem?.type === 'text' && <Type size={16} color='#727272' />}
                                                    {subElem?.type === 'button' && <Disc size={16} color='#727272' />}
                                                    {subElem?.type === 'input' && <img style={{ filter: "grayscale(100%)" }} src='https://cdn-app.optimonk.com/img/StructureInput.61ed2888.svg' alt='' />}
                                                    {subElem?.type === 'image' && (subElem.src === "" ? <Image width={16} color='#727272' /> : <div style={{ width: 16, aspectRatio: "1", backgroundImage: `url(${subElem.src})`, backgroundSize: "contain", backgroundPosition: "center center", backgroundRepeat: "no-repeat" }} />)}
                                                    {<span className={`${subElem.type !== "text" ? "text-capitalize" : ""}`} style={{ fontSize: "0.75rem" }}>{getSideText(subElem)}</span>}
                                                </div>
                                                {subElem?.type !== "" && <UncontrolledDropdown onClick={e => e.stopPropagation()} className='more-options-dropdown'>
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
                                                                const arr = [...colWise]
                                                                if (curElem?.element?.length <= 1 && cur?.elements?.length <= 1) {
                                                                    arr.splice(key, 1)
                                                                } else if (curElem?.element?.length <= 1 && cur?.elements?.length >= 1) {
                                                                    arr[key].elements[arr[key].elements.findIndex($ => $?.positionType === curElem.positionType)].element.splice(j, 1, { ...commonObj })
                                                                } else {
                                                                    arr[key].elements[arr[key].elements.findIndex($ => $?.positionType === curElem.positionType)].element.splice(j, 1)
                                                                }
                                                                setcolWise([...arr])
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


    const handleColDrop = (e, cur, curElem, subElem) => {
        e.stopPropagation()
        const transferedData = e.dataTransfer.getData("type")
        const inputTypeCondition = draggedInputType === "none" ? commonObj?.inputType : draggedInputType
        const dragOverData = document.getElementById(`${currPage}-${dragOverIndex.cur}-${dragOverIndex.curElem}-${dragOverIndex.subElem}`)?.getBoundingClientRect()
        const y = dragOverData?.y
        const height = dragOverData?.height
        if ((transferedData !== "" && !transferedData.includes("col"))) {
            let dupArray, mobile_dupArray

            if (currPage === "button") {
                dupArray = finalObj.button
                mobile_dupArray = finalObj.mobile_button
            } else {
                dupArray = finalObj.pages[finalObj.pages.findIndex($ => $?.id === currPage)].values
                mobile_dupArray = finalObj.mobile_pages[finalObj.pages.findIndex($ => $?.id === currPage)].values
            }

            if (mousePos.y - (y + (height / 2)) < 0) {
                dupArray[dragOverIndex?.cur]?.elements[dupArray[dragOverIndex.cur]?.elements?.findIndex($ => $?.positionType === dragOverIndex?.curElem)]?.element?.splice(dragOverIndex?.subElem, 0, { ...commonObj, type: transferedData, inputType: inputTypeCondition, placeholder: inputTypeList[inputTypeList?.findIndex($ => $.value === inputTypeCondition)]?.label, labelText: inputTypeList[inputTypeList?.findIndex($ => $.value === inputTypeCondition)]?.label, style: elementStyles[transferedData] })
                mobile_dupArray[dragOverIndex?.cur]?.elements[mobile_dupArray[dragOverIndex.cur]?.elements?.findIndex($ => $?.positionType === dragOverIndex?.curElem)]?.element?.splice(dragOverIndex?.subElem, 0, { ...commonObj, type: transferedData, style: elementStyles[transferedData] })
                setIndexes({ ...dragOverIndex })
            } else {
                dupArray[dragOverIndex.cur]?.elements[dupArray[dragOverIndex.cur]?.elements?.findIndex($ => $?.positionType === dragOverIndex?.curElem)]?.element?.splice(dragOverIndex?.subElem + 1, 0, { ...commonObj, type: transferedData, inputType: inputTypeCondition, placeholder: inputTypeList[inputTypeList?.findIndex($ => $.value === inputTypeCondition)]?.label, labelText: inputTypeList[inputTypeList?.findIndex($ => $.value === inputTypeCondition)]?.label, style: elementStyles[transferedData] })
                mobile_dupArray[dragOverIndex.cur]?.elements[mobile_dupArray[dragOverIndex?.cur]?.elements?.findIndex($ => $?.positionType === dragOverIndex?.curElem)]?.element?.splice(dragOverIndex?.subElem + 1, 0, { ...commonObj, type: transferedData, style: elementStyles[transferedData] })
                setIndexes({ cur, curElem, subElem })
            }
            setValues({ ...elementStyles[transferedData] })
            setcolWise(isMobile ? [...mobile_dupArray] : [...dupArray])
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

            form_data.append("campaign_name", themeName)
            form_data.append("start_date", finalObj.campaignStartDate)
            form_data.append("end_date", finalObj.campaignEndDate)
            form_data.append("default_id", selectedThemeId)
            form_data.append("is_edit", themeId === 0 ? 0 : 1)

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
        const theme_id = await themeId ? themeId : (themeId !== "undefined" || themeId !== "null") ? Number(themeId) : 0
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
        form_data.append("campaign_name", themeName)
        form_data.append("start_date", finalObj.campaignStartDate)
        form_data.append("end_date", finalObj.campaignEndDate)
        form_data.append("default_id", selectedThemeId)
        form_data.append("is_draft", 1)

        form_data.append("theme_id", theme_id)
        axios({
            method: "POST", url: `${SuperLeadzBaseURL}/api/v1/form_builder_template/`, data: form_data
        }).then((data) => {
            setThemeId(data?.data?.theme_id)
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

    useEffect(() => {
        const colWise = currPage === "button" ? [...finalObj?.[`${mobileCondition}button`]] : [...finalObj?.[`${mobileCondition}pages`][finalObj?.[`${mobileCondition}pages`]?.findIndex($ => $.id === currPage)].values]
        // console.log(currPage, "currPage")
        setBrandStyles({ ...finalObj?.[`${mobileCondition}brandStyles`] })
        // console.log(colWise, "herecolWise")
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
        const colWise = currPage === "button" ? [...finalObj?.[`${mobileCondition}button`]] : [...finalObj?.[`${mobileCondition}pages`][finalObj?.[`${mobileCondition}pages`]?.findIndex($ => $.id === currPage)].values]
        if (colWise.length > 0) {
            const arr = [...colWise]
            const positionIndex = colWise[indexes.cur]?.elements?.findIndex($ => $?.positionType === indexes?.curElem)
            if (indexes.subElem === "grandparent") {
                if (arr[indexes?.cur]?.style) {
                    arr[indexes.cur].style = { ...arr[indexes?.cur]?.style, ...values }
                }
            } else if (indexes.subElem === "parent") {
                if (arr[indexes?.cur]?.elements[positionIndex]?.style) {
                    arr[indexes.cur].elements[positionIndex].style = { ...arr[indexes.cur]?.elements[positionIndex]?.style, ...values }
                }
            } else {
                if (arr[indexes?.cur]?.elements[positionIndex]?.element[indexes?.subElem]?.style) {
                    arr[indexes.cur].elements[positionIndex].element[indexes.subElem].style = { ...arr[indexes.cur]?.elements[positionIndex]?.element[indexes?.subElem]?.style, ...values }
                }
            }
            setcolWise([...arr])
        }
    }, [values])

    const addEvents = () => {
        document.addEventListener("keydown", function (e) {

            if (e.ctrlKey && e.key === 'z') {
                // console.log("zzzz")
                document.getElementById('xircls_undo').click()
            }
            if (e.ctrlKey && e.key === 'y') {
                // console.log("yyyy")
                // redo()
                document.getElementById('xircls_redo').click()
            }
        })
    }

    useEffect(() => {

        addEvents()
        const colWise = currPage === "button" ? [...finalObj?.[`${mobileCondition}button`]] : [...finalObj?.[`${mobileCondition}pages`][finalObj?.[`${mobileCondition}pages`]?.findIndex($ => $.id === currPage)].values]
        const onLoadMobile = status ? "mobile_" : ""
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
        if (currPage === "button") {
            setcolWise(finalObj?.[`${onLoadMobile}button`])
            // setBtnStyles({ ...finalObj?.backgroundStyles?.[`${onLoadMobile}button`] })
        } else {
            const pageIndex = finalObj?.[`${onLoadMobile}pages`]?.findIndex($ => $?.id === currPage)
            setcolWise(finalObj?.[`${onLoadMobile}pages`][pageIndex]?.values)
            // setCrossStyle({ ...finalObj?.crossButtons?.[`${onLoadMobile}main`] })
        }

        setBrandStyles({ ...finalObj?.[`${onLoadMobile}brandStyles`] })

        const positionIndex = colWise[indexes.cur]?.elements?.findIndex($ => $?.positionType === indexes?.curElem)
        if (indexes.subElem === "grandparent") {
            setValues(currPage === "button" ? { ...finalObj?.[`${onLoadMobile}button`][indexes.cur]?.style } : { ...finalObj?.[`${onLoadMobile}pages`][finalObj?.[`${onLoadMobile}pages`]?.findIndex($ => $?.id === currPage)]?.values[indexes.cur]?.style })
        } else if (indexes.subElem === "parent") {
            setValues(currPage === "button" ? { ...finalObj?.[`${onLoadMobile}button`][indexes.cur]?.elements[positionIndex]?.style } : { ...finalObj?.[`${onLoadMobile}pages`][finalObj?.[`${onLoadMobile}pages`]?.findIndex($ => $?.id === currPage)]?.values[indexes.cur]?.elements[positionIndex]?.style })
        } else {
            setValues(currPage === "button" ? { ...finalObj?.[`${onLoadMobile}button`][indexes.cur]?.elements[positionIndex]?.element[indexes.subElem]?.style } : { ...finalObj?.[`${onLoadMobile}pages`][finalObj?.[`${onLoadMobile}pages`]?.findIndex($ => $?.id === currPage)]?.values[indexes.cur]?.elements[positionIndex]?.element[indexes.subElem]?.style })
        }

        if (status) {
            document.getElementById("phone").click()
        } else if (defaultIsMobile.get('isMobile') === 'false') {
            document.getElementById("desktop").click()
        }
        return () => {
            localStorage.removeItem("draftId")
        }

    }, [])

    useEffect(() => {
        const colWise = currPage === "button" ? [...finalObj?.[`${mobileCondition}button`]] : [...finalObj?.[`${mobileCondition}pages`][finalObj?.[`${mobileCondition}pages`]?.findIndex($ => $.id === currPage)].values]
        const newObj = { ...finalObj }
        const newBgStyles = { ...finalObj?.backgroundStyles?.[`main`] }
        const mobile_newBgStyles = { ...finalObj?.backgroundStyles?.[`mobile_main`] }
        const newBgStyles2 = { ...finalObj?.backgroundStyles?.[`button`] }
        const mobile_newBgStyles2 = { ...finalObj?.backgroundStyles?.[`mobile_button`] }
        function changeStyles(obj, k) {
            console.log({ obj, k })
            if (obj?.isInitialBgColor) {
                obj.backgroundColor = defColors[obj?.initialBgColor]
            }
            if (obj?.isInitialColor) {
                obj.color = defColors[obj?.initialColor]
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
                        changeStyles(subElem?.style)
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
                        changeStyles(subElem.style)
                    })
                })
            })
        })

        newObj?.button?.forEach((cur) => {
            changeStyles(cur?.style)
            cur?.elements?.forEach((curElem) => {
                changeStyles(curElem?.style)
                curElem?.element?.forEach((subElem) => {
                    changeStyles(subElem?.style)
                })
            })
        })

        newObj?.mobile_button?.forEach((cur) => {
            changeStyles(cur?.style)
            cur?.elements?.forEach((curElem) => {
                changeStyles(curElem?.style)
                curElem?.element?.forEach((subElem) => {
                    changeStyles(subElem?.style)
                })
            })
        })
        newObj.backgroundStyles.main = newBgStyles
        newObj.backgroundStyles.mobile_main = mobile_newBgStyles
        newObj.backgroundStyles.button = newBgStyles2
        newObj.backgroundStyles.mobile_button = mobile_newBgStyles2
        console.log({ newObj, defColors })
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

    const currPageIndex = finalObj?.pages?.findIndex($ => $?.id === currPage)

    const returnRender = (props) => {
        if (toggleView === 1) {
            return <RenderPreview {...props} />
        } else if (toggleView === 2) {
            return <RenderPreviewCopy {...props} />
        }
    }

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
                    {/* <BgModifier styles={bgStyles} setStyles={setBgStyles} /> */}
                    {/* Component for changing background of the selected element */}

                    {/* Sidebar */}
                    <div className="nav-sidebar d-flex flex-column align-items-stretch justify-content-start border-end text-center h-100" style={{ padding: "0.5rem", minWidth: "70px", overflow: "auto", gap: '20px' }}>
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
                            <span style={{ fontSize: "8.5px", fontStyle: "normal", fontWeight: "500", lineHeight: "10px", transition: "0.3s ease-in-out" }} className={`text-uppercase`}>Theme</span>
                        </div>
                        <div className={`sideNav-items d-flex flex-column align-items-center justify-content-center ${sideNav === "audience" ? "text-black active-item" : ""}`} style={{ gap: "0.5rem", cursor: "pointer", padding: "0.75rem 0px" }} onClick={() => setSideNav(sideNav === "audience" ? "" : "audience")}>
                            <button className={`btn d-flex align-items-center justify-content-center`} style={{ aspectRatio: "1", padding: "0rem", border: "none", outline: "none", transition: "0.3s ease-in-out" }}>
                                <Target size={15} />
                            </button>
                            <span style={{ fontSize: "8.5px", fontStyle: "normal", fontWeight: "500", lineHeight: "10px", transition: "0.3s ease-in-out" }} className={`text-uppercase`}>Audience</span>
                        </div>
                        <div className={`sideNav-items d-flex flex-column align-items-center justify-content-center ${sideNav === "display" ? "text-black active-item" : ""}`} style={{ gap: "0.5rem", cursor: "pointer", padding: "0.75rem 0px" }} onClick={() => setSideNav(sideNav === "display" ? "" : "display")}>
                            <button className={`btn d-flex align-items-center justify-content-center`} style={{ aspectRatio: "1", padding: "0rem", border: "none", outline: "none", transition: "0.3s ease-in-out" }}>
                                <Monitor size={15} />
                            </button>
                            <span style={{ fontSize: "8.5px", fontStyle: "normal", fontWeight: "500", lineHeight: "10px", transition: "0.3s ease-in-out" }} className={`text-uppercase`}>Display</span>
                        </div>
                        <div className={`sideNav-items d-none flex-column align-items-center justify-content-center ${sideNav === "trigger" ? "text-black active-item" : ""}`} style={{ gap: "0.5rem", cursor: "pointer", padding: "0.75rem 0px" }} onClick={() => setSideNav(sideNav === "trigger" ? "" : "trigger")}>
                            <button className={`btn d-flex align-items-center justify-content-center`} style={{ aspectRatio: "1", padding: "0rem", border: "none", outline: "none", transition: "0.3s ease-in-out" }}>
                                <Monitor size={15} />
                            </button>
                            <span style={{ fontSize: "8.5px", fontStyle: "normal", fontWeight: "500", lineHeight: "10px", transition: "0.3s ease-in-out" }} className={`text-uppercase`}>Triggers</span>
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
                            <span style={{ fontSize: "8.5px", fontStyle: "normal", fontWeight: "500", lineHeight: "10px", transition: "0.3s ease-in-out" }} className={`text-uppercase`}>Elements</span>
                        </div>
                        <div className={`sideNav-items d-flex flex-column align-items-center justify-content-center ${sideNav === "offers" ? "text-black active-item" : ""}`} style={{ gap: "0.5rem", cursor: "pointer", padding: "0.75rem 0px" }} onClick={() => {
                            setSideNav(sideNav === "offers" ? "" : "offers")
                            setCurrPage("offers")
                        }}>
                            <button className={`btn d-flex align-items-center justify-content-center`} style={{ aspectRatio: "1", padding: "0rem", border: "none", outline: "none", transition: "0.3s ease-in-out" }}>
                                <Tag size={15} />
                            </button>
                            <span style={{ fontSize: "8.5px", fontStyle: "normal", fontWeight: "500", lineHeight: "10px", transition: "0.3s ease-in-out" }} className={`text-uppercase`}>Offers</span>
                        </div>
                        <div className={`sideNav-items d-flex flex-column align-items-center justify-content-center ${sideNav === "criteria" ? "text-black active-item" : ""}`} style={{ gap: "0.5rem", cursor: "pointer", padding: "0.75rem 0px" }} onClick={() => setSideNav(sideNav === "criteria" ? "" : "criteria")}>
                            <button className={`btn d-flex align-items-center justify-content-center`} style={{ aspectRatio: "1", padding: "0rem", border: "none", outline: "none", transition: "0.3s ease-in-out" }}>
                                <Crosshair size={15} />
                            </button>
                            <span style={{ fontSize: "8.5px", fontStyle: "normal", fontWeight: "500", lineHeight: "10px", transition: "0.3s ease-in-out" }} className={`text-uppercase`}>Schedule</span>
                        </div>
                        <div className={`sideNav-items d-flex flex-column align-items-center justify-content-center ${sideNav === "rules" ? "text-black active-item" : ""}`} style={{ gap: "0.5rem", cursor: "pointer", padding: "0.75rem 0px" }} onClick={() => {
                            setSideNav(sideNav === "rules" ? "" : "rules")
                        }}>
                            <button className={`btn d-flex align-items-center justify-content-center`} style={{ aspectRatio: "1", padding: "0rem", border: "none", outline: "none", transition: "0.3s ease-in-out" }}>
                                <Mail size={15} />
                            </button>
                            <span style={{ fontSize: "8.5px", fontStyle: "normal", fontWeight: "500", lineHeight: "10px", transition: "0.3s ease-in-out" }} className={`text-uppercase`}>Rules</span>
                        </div>
                    </div>
                    {/* Sidebar */}

                    {/* Preview and Edit Section */}
                    <div className="d-flex align-items-stretch flex-grow-1 h-100">
                        {/* Section Drawer */}
                        <div className=" border-end bg-white position-relative h-100" style={{ width: ((sideNav === "" && sideNav === "rules") && !openSidebar) ? "0px" : "280px", overflowX: "hidden", transition: "0.3s ease-in-out", opacity: "1", boxShadow: "10px 2px 5px rgba(0,0,0,0.125)", zIndex: "1" }}>
                            <div className='w-100' style={{ height: "100%", overflowY: "auto" }}>
                                <span onClick={() => setOpenSidebar(!openSidebar)} className="position-absolute d-flex justify-content-center align-items-center cursor-pointer" style={{ top: "50%", right: "0px", transform: `translateX(100%) translateY(-50%)`, padding: "0.25rem", aspectRatio: "9/30", height: "50px", borderRadius: "0px 10px 10px 0px", backgroundColor: "#ffffff", zIndex: "11111111" }}>
                                    <ChevronRight style={{ rotate: openSidebar ? "-540deg" : "0deg", transition: "0.3s ease-in-out" }} size={12.5} color='#000000' />
                                </span>
                                {/* Theme Section */}
                                {sideNav === "theme" && <div style={{ transition: "0.3s ease-in-out", overflow: "auto", width: "280px", transform: `translateX(${sideNav === "theme" ? "0px" : "-280px"})`, position: "absolute", inset: "0px" }}>
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
                                                            console.log(e)
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
                                                            <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Brand Logo Width:</span>
                                                            <div className="p-0 justify-content-start align-items-center gap-2">
                                                                <input value={parseFloat(finalObj?.defaultThemeColors?.brandWidth)} onChange={e => {
                                                                    updatePresent({ ...finalObj, defaultThemeColors: { ...finalObj?.defaultThemeColors, brandWidth: `${e.target.value}px` } })
                                                                }} type='range' className='w-100' name="width" min="20" max="1500" />
                                                            </div>
                                                        </div>
                                                        <div className='mb-1'>
                                                            <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Brand Logo Height:</span>
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
                                                                }} name={currPage === "button" ? "width" : isMobile ? "maxWidth" : "width"} min="25" max={isMobile ? "100" : "800"} />
                                                        </div>
                                                    </div>
                                                    <div className=''>
                                                        <span className='fw-bolder text-black' style={{ fontSize: "0.7rem" }}>Min-Height: {finalObj?.backgroundStyles[`${mobileCondition}main`]?.minHeight}</span>
                                                        <div className="d-flex p-0 justify-content-between align-items-center gap-2">
                                                            <input type='range' value={parseFloat(currPage === "button" ? finalObj?.backgroundStyles[`${mobileCondition}button`]?.minHeight : finalObj?.backgroundStyles[`${mobileCondition}main`]?.minHeight)} onChange={e => {
                                                                currPage === "button" ? updatePresent({ ...finalObj, backgroundStyles: { ...finalObj?.backgroundStyles, [`${mobileCondition}button`]: { ...finalObj?.backgroundStyles[`${mobileCondition}button`], minHeight: `${e.target.value}px` } } }) : updatePresent({ ...finalObj, backgroundStyles: { ...finalObj.backgroundStyles, [`${mobileCondition}main`]: { ...finalObj?.backgroundStyles[`${mobileCondition}main`], minHeight: `${e.target.value}px` } } })
                                                            }} className='w-100' name="height" min="50" max="800" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className='m-0 fw-bolder text-black text-uppercase' style={{ padding: "0.5rem 0px", fontSize: "0.75rem" }}>Border and Shadow</p>
                                                {currPage === "button" ? < BorderChange type={`btnStyles`} mainStyle={finalObj} setMainStyle={updatePresent} mobileCondition={mobileCondition} /> : <BorderChange getMDToggle={getMDToggle} type={`bgStyles`} mainStyle={finalObj} setMainStyle={updatePresent} mobileCondition={mobileCondition} />}
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
                                {sideNav === "audience" && <div style={{ transition: "0.3s ease-in-out", overflow: "hidden", width: "280px", transform: `translateX(${sideNav === "audience" ? "0px" : "-280px"})`, position: "absolute", inset: "0px" }}>
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
                                {sideNav === "display" && <div style={{ transition: "0.3s ease-in-out", overflowY: "auto", width: "280px", transform: `translateX(${sideNav === "display" ? "0px" : "-280px"})`, position: "absolute", inset: "0px" }}>
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
                                                            style={{ width: "55px" }}
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
                                                        <svg
                                                            width={80}
                                                            height={162}
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <rect x={1.5} y={0.5} width={77} height={161} rx={11.5} fill="#252626" />
                                                            <g clipPath="url(#clip0_529_46870)">
                                                                <rect x={5} y={4} width={70} height={154} rx={8} fill="#fff" />
                                                                <path style={{ cursor: "pointer", transition: "0.3s ease" }} onClick={() => updatePresent({ ...finalObj, positions: { ...finalObj?.positions, [`${mobileCondition}${pageCondition}`]: "TC" } })}
                                                                    fill={finalObj?.positions?.[`${mobileCondition}${pageCondition}`] === "TC" ? "#464646" : "#ffffff"}
                                                                    className="mobile-position-area"
                                                                    d="M5.125 4.125H76.875V40.875H5.125z"
                                                                />
                                                                <path style={{ cursor: "pointer", transition: "0.3s ease" }} onClick={() => updatePresent({ ...finalObj, positions: { ...finalObj?.positions, [`${mobileCondition}${pageCondition}`]: "TC" } })}
                                                                    stroke="#313233"
                                                                    strokeWidth={0.25}
                                                                    d="M5.125 4.125H76.875V40.875H5.125z"
                                                                />
                                                                <path style={{ cursor: "pointer", transition: "0.3s ease" }} onClick={() => updatePresent({ ...finalObj, positions: { ...finalObj?.positions, [`${mobileCondition}${pageCondition}`]: "ML" } })}
                                                                    fill={finalObj?.positions?.[`${mobileCondition}${pageCondition}`] === "ML" ? "#464646" : "#ffffff"}
                                                                    className="mobile-position-area"
                                                                    d="M5.125 41.125H40.875V120.875H5.125z"
                                                                />
                                                                <path style={{ cursor: "pointer", transition: "0.3s ease" }} onClick={() => updatePresent({ ...finalObj, positions: { ...finalObj?.positions, [`${mobileCondition}${pageCondition}`]: "ML" } })}
                                                                    stroke="#313233"
                                                                    strokeWidth={0.25}
                                                                    d="M5.125 41.125H40.875V120.875H5.125z"
                                                                />
                                                                <path style={{ cursor: "pointer", transition: "0.3s ease" }} onClick={() => updatePresent({ ...finalObj, positions: { ...finalObj?.positions, [`${mobileCondition}${pageCondition}`]: "MR" } })}
                                                                    fill={finalObj?.positions?.[`${mobileCondition}${pageCondition}`] === "MR" ? "#464646" : "#ffffff"}
                                                                    className="mobile-position-area selected"
                                                                    d="M41.125 41.125H76.875V120.875H41.125z"
                                                                />
                                                                <path style={{ cursor: "pointer", transition: "0.3s ease" }} onClick={() => updatePresent({ ...finalObj, positions: { ...finalObj?.positions, [`${mobileCondition}${pageCondition}`]: "MR" } })}
                                                                    stroke="#313233"
                                                                    strokeWidth={0.25}
                                                                    d="M41.125 41.125H76.875V120.875H41.125z"
                                                                />
                                                                <path style={{ cursor: "pointer", transition: "0.3s ease" }} onClick={() => updatePresent({ ...finalObj, positions: { ...finalObj?.positions, [`${mobileCondition}${pageCondition}`]: "BC" } })}
                                                                    fill={finalObj?.positions?.[`${mobileCondition}${pageCondition}`] === "BC" ? "#464646" : "#ffffff"}
                                                                    className="mobile-position-area"
                                                                    d="M5.125 121.125H76.875V157.875H5.125z"
                                                                />
                                                                <path style={{ cursor: "pointer", transition: "0.3s ease" }} onClick={() => updatePresent({ ...finalObj, positions: { ...finalObj?.positions, [`${mobileCondition}${pageCondition}`]: "BC" } })}
                                                                    stroke="#313233"
                                                                    strokeWidth={0.25}
                                                                    d="M5.125 121.125H76.875V157.875H5.125z"
                                                                />
                                                            </g>
                                                            <rect
                                                                x={5.25}
                                                                y={4.25}
                                                                width={69.5}
                                                                height={153.5}
                                                                rx={7.75}
                                                                stroke="#313233"
                                                                strokeWidth={0.5}
                                                            />
                                                            <rect
                                                                x={1.5}
                                                                y={0.5}
                                                                width={77}
                                                                height={161}
                                                                rx={11.5}
                                                                stroke="#585A5B"
                                                            />
                                                            <path fill="#252626" d="M0 21H1V27H0z" />
                                                            <path fill="#252626" d="M0 39H1V50H0z" />
                                                            <path fill="#252626" d="M79 43H80V61H79z" />
                                                            <path
                                                                d="M20.753 4.612A3 3 0 0123.689 1h32.622a3 3 0 012.937 3.612l-.417 2A3 3 0 0155.894 9H24.106a3 3 0 01-2.937-2.388l-.416-2z"
                                                                fill="#252626"
                                                            />
                                                            <path fill="#252626" d="M0 52H1V63H0z" />
                                                            <rect
                                                                x={45}
                                                                y={4}
                                                                width={1}
                                                                height={10}
                                                                rx={0.5}
                                                                transform="rotate(90 45 4)"
                                                                fill="#000"
                                                            />
                                                            <rect
                                                                x={48}
                                                                y={4}
                                                                width={1}
                                                                height={2}
                                                                rx={0.5}
                                                                transform="rotate(90 48 4)"
                                                                fill="#000"
                                                            />
                                                            <defs>
                                                                <clipPath id="clip0_529_46870">
                                                                    <rect x={5} y={4} width={70} height={154} rx={8} fill="#fff" />
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
                                {sideNav === "trigger" && <div style={{ transition: "0.3s ease-in-out", overflow: "hidden", width: "280px", transform: `translateX(${sideNav === "trigger" ? "0px" : "-280px"})`, position: "absolute", inset: "0px" }}>
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
                                {sideNav === "add-elements" && <div style={{ transition: "0.3s ease-in-out", overflow: "auto", width: "280px", transform: `translateX(${sideNav === "add-elements" ? "0px" : "-280px"})`, position: "absolute", inset: "0px" }}>
                                    <p className='m-0 fw-bolder text-black text-uppercase' style={{ padding: "0.5rem 0.5rem 0px", fontSize: "0.75rem" }}>Basic Elements</p>
                                    <div className="toggleSection border-end d-flex align-items-stretch justify-content-start mb-1" style={{ flexWrap: "wrap" }}>
                                        {/* {getElementJsx({ draggable: true, dragStartFunc: (e) => handleDragStart(e, "text", "type"), icon: <Type size={17.5} />, label: "Text" })} */}
                                        <div style={{ width: `33.3333%`, padding: "0.35rem", height: "100%" }}>
                                            <div title='Drag to add to your pop-up' draggable onDragStart={(e) => handleDragStart(e, "text", "type")} className="border rounded w-100 d-flex flex-column justify-content-between align-items-center p-1 h-100" style={{ aspectRatio: "1", cursor: "grab", gap: "0.25rem" }}>
                                                <Type color="#727272" size={17.5} />
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
                                            <div title='Drag to add to your pop-up' draggable onDragStart={(e) => handleDragStart(e, "image")} className="border rounded w-100 d-flex flex-column justify-content-between align-items-center p-1 h-100" style={{ aspectRatio: "1", cursor: "grab", gap: "0.25rem" }}>
                                                <Image color="#727272" size={17.5} />
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
                                            <div title='Drag to add to your pop-up' draggable onDragStart={(e) => handleDragStart(e, "button")} className="border rounded w-100 d-flex flex-column justify-content-between align-items-center p-1 h-100" style={{ aspectRatio: "1", cursor: "grab", gap: "0.25rem" }}>
                                                <Square color="#727272" fill="#727272" size={17.5} style={{ scale: "225% 100%" }} />
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
                                    <div className="toggleSection border-end d-flex flex-wrap align-items-stretch justify-content-start mb-1">
                                        <div style={{ width: `33.3333%`, padding: "0.35rem", height: "100%" }}>
                                            <div title='Drag to add to your pop-up' draggable onDragStart={(e) => handleDragStart(e, "input", "firstName")} className="border rounded text-black w-100 d-flex flex-column justify-content-between align-items-center p-1" style={{ aspectRatio: "1", cursor: "grab", gap: "0.25rem" }}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 52 52"
                                                    width={25}
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
                                            <div title='Drag to add to your pop-up' draggable onDragStart={(e) => handleDragStart(e, "input", "lastName")} className="border rounded text-black w-100 d-flex flex-column justify-content-between align-items-center p-1" style={{ aspectRatio: "1", cursor: "grab", gap: "0.25rem" }}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 52 52"
                                                    width={25}
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
                                            <div title='Drag to add to your pop-up' draggable onDragStart={(e) => handleDragStart(e, "input", "email")} className="border rounded text-black w-100 d-flex flex-column justify-content-between align-items-center p-1" style={{ aspectRatio: "1", cursor: "grab", gap: "0.25rem" }}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 52 52"
                                                    width={25}
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
                                            <div title='Drag to add to your pop-up' draggable onDragStart={(e) => handleDragStart(e, "input", "number")} className="border rounded text-black w-100 d-flex flex-column justify-content-between align-items-center p-1" style={{ aspectRatio: "1", cursor: "grab", gap: "0.25rem" }}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 52 52"
                                                    width={25}
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
                                            <div title='Drag to add to your pop-up' draggable onDragStart={(e) => handleDragStart(e, "input", "enter_otp")} className="border rounded text-black w-100 d-flex flex-column justify-content-between align-items-center p-1" style={{ aspectRatio: "1", cursor: "grab", gap: "0.25rem" }}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 52 52"
                                                    width={25}
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
                                    <div className="toggleSection border-end d-flex flex-wrap align-items-stretch justify-content-start mb-1">
                                        <div style={{ width: `33.3333%`, padding: "0.35rem", height: "100%" }}>
                                            <div title='Drag to add to your pop-up' draggable onDragStart={(e) => handleDragStart(e, "tnc")} className="border rounded text-black w-100 d-flex flex-column justify-content-between align-items-center p-1" style={{ aspectRatio: "1", cursor: "grab", gap: "0.25rem" }}>
                                                <CheckSquare size={17.5} color={"#727272"} />
                                                <span className='text-black text-center' style={{ fontSize: "11px" }}>Newsletter</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* ---------------- */}
                                    <div className="toggleSection border-end d-flex flex-wrap align-items-stretch justify-content-start mb-1">
                                        <div style={{ width: `33.3333%`, padding: "0.35rem", height: "100%" }}>
                                            <div title='Drag to add to your pop-up' draggable onDragStart={(e) => handleDragStart(e, "radio")} className="border rounded text-black w-100 d-flex flex-column justify-content-between align-items-center p-1" style={{ aspectRatio: "1", cursor: "grab", gap: "0.25rem" }}>
                                                <svg fill="none" viewBox="0 0 52 52" height="100%" width="50%" xmlns="http://www.w3.org/2000/svg">
                                                    <path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M45 16C45 16.5523 44.5523 17 44 17L27 17C26.4477 17 26 16.5523 26 16C26 15.4477 26.4477 15 27 15L44 15C44.5523 15 45 15.4477 45 16Z" fill="currentColor"></path>
                                                    <path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M38 20C38 20.5523 37.5523 21 37 21H27C26.4477 21 26 20.5523 26 20C26 19.4477 26.4477 19 27 19H37C37.5523 19 38 19.4477 38 20Z" fill="currentColor"></path>
                                                    <path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M15.5 23C18.5376 23 21 20.5376 21 17.5C21 14.4624 18.5376 12 15.5 12C12.4624 12 10 14.4624 10 17.5C10 20.5376 12.4624 23 15.5 23ZM15.5 25C19.6421 25 23 21.6421 23 17.5C23 13.3579 19.6421 10 15.5 10C11.3579 10 8 13.3579 8 17.5C8 21.6421 11.3579 25 15.5 25Z" fill="currentColor"></path>
                                                    <path xmlns="http://www.w3.org/2000/svg" d="M19 17.5C19 19.433 17.433 21 15.5 21C13.567 21 12 19.433 12 17.5C12 15.567 13.567 14 15.5 14C17.433 14 19 15.567 19 17.5Z" fill="currentColor"></path>
                                                    <path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M15.5 19C16.3284 19 17 18.3284 17 17.5C17 16.6716 16.3284 16 15.5 16C14.6716 16 14 16.6716 14 17.5C14 18.3284 14.6716 19 15.5 19ZM15.5 21C17.433 21 19 19.433 19 17.5C19 15.567 17.433 14 15.5 14C13.567 14 12 15.567 12 17.5C12 19.433 13.567 21 15.5 21Z" fill="currentColor"></path>
                                                    <path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M45 34C45 34.5523 44.5523 35 44 35H27C26.4477 35 26 34.5523 26 34C26 33.4477 26.4477 33 27 33H44C44.5523 33 45 33.4477 45 34Z" fill="currentColor"></path>
                                                    <path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M38 38C38 38.5523 37.5523 39 37 39H27C26.4477 39 26 38.5523 26 38C26 37.4477 26.4477 37 27 37H37C37.5523 37 38 37.4477 38 38Z" fill="currentColor"></path>
                                                    <path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M15.5 41C18.5376 41 21 38.5376 21 35.5C21 32.4624 18.5376 30 15.5 30C12.4624 30 10 32.4624 10 35.5C10 38.5376 12.4624 41 15.5 41ZM15.5 43C19.6421 43 23 39.6421 23 35.5C23 31.3579 19.6421 28 15.5 28C11.3579 28 8 31.3579 8 35.5C8 39.6421 11.3579 43 15.5 43Z" fill="currentColor"></path>
                                                    <path xmlns="http://www.w3.org/2000/svg" d="M19 35.5C19 37.433 17.433 39 15.5 39C13.567 39 12 37.433 12 35.5C12 33.567 13.567 32 15.5 32C17.433 32 19 33.567 19 35.5Z" fill="currentColor"></path>
                                                    <path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M15.5 37C16.3284 37 17 36.3284 17 35.5C17 34.6716 16.3284 34 15.5 34C14.6716 34 14 34.6716 14 35.5C14 36.3284 14.6716 37 15.5 37ZM15.5 39C17.433 39 19 37.433 19 35.5C19 33.567 17.433 32 15.5 32C13.567 32 12 33.567 12 35.5C12 37.433 13.567 39 15.5 39Z" fill="currentColor"></path>
                                                </svg>
                                                <span className='text-black text-center' style={{ fontSize: "11px" }}>Radio</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="toggleSection border-end d-flex flex-wrap align-items-stretch justify-content-start mb-1">
                                        <div style={{ width: `33.3333%`, padding: "0.35rem", height: "100%" }}>
                                            <div title='Drag to add to your pop-up' draggable onDragStart={(e) => handleDragStart(e, "checkbox")} className="border rounded text-black w-100 d-flex flex-column justify-content-between align-items-center p-1" style={{ aspectRatio: "1", cursor: "grab", gap: "0.25rem" }}>
                                                <svg fill="none" viewBox="0 0 52 52" height="100%" width="50%" xmlns="http://www.w3.org/2000/svg">
                                                    <path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M45 16C45 16.5523 44.5523 17 44 17L27 17C26.4477 17 26 16.5523 26 16C26 15.4477 26.4477 15 27 15L44 15C44.5523 15 45 15.4477 45 16Z" fill="currentColor"></path>
                                                    <path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M38 20C38 20.5523 37.5523 21 37 21H27C26.4477 21 26 20.5523 26 20C26 19.4477 26.4477 19 27 19H37C37.5523 19 38 19.4477 38 20Z" fill="currentColor"></path>
                                                    <path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M45 34C45 34.5523 44.5523 35 44 35H27C26.4477 35 26 34.5523 26 34C26 33.4477 26.4477 33 27 33H44C44.5523 33 45 33.4477 45 34Z" fill="currentColor"></path>
                                                    <path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M38 38C38 38.5523 37.5523 39 37 39H27C26.4477 39 26 38.5523 26 38C26 37.4477 26.4477 37 27 37H37C37.5523 37 38 37.4477 38 38Z" fill="currentColor"></path>
                                                    <path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M20 12H11C10.4477 12 10 12.4477 10 13V22C10 22.5523 10.4477 23 11 23H20C20.5523 23 21 22.5523 21 22V13C21 12.4477 20.5523 12 20 12ZM11 10C9.34315 10 8 11.3431 8 13V22C8 23.6569 9.34315 25 11 25H20C21.6569 25 23 23.6569 23 22V13C23 11.3431 21.6569 10 20 10H11Z" fill="currentColor"></path>
                                                    <path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M20 30H11C10.4477 30 10 30.4477 10 31V40C10 40.5523 10.4477 41 11 41H20C20.5523 41 21 40.5523 21 40V31C21 30.4477 20.5523 30 20 30ZM11 28C9.34315 28 8 29.3431 8 31V40C8 41.6569 9.34315 43 11 43H20C21.6569 43 23 41.6569 23 40V31C23 29.3431 21.6569 28 20 28H11Z" fill="currentColor"></path>
                                                    <path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M19.7071 32.2929C20.0976 32.6834 20.0976 33.3166 19.7071 33.7071L14.7071 38.7071C14.3166 39.0976 13.6834 39.0976 13.2929 38.7071L11.2929 36.7071C10.9024 36.3166 10.9024 35.6834 11.2929 35.2929C11.6834 34.9024 12.3166 34.9024 12.7071 35.2929L14 36.5858L18.2929 32.2929C18.6834 31.9024 19.3166 31.9024 19.7071 32.2929Z" fill="currentColor"></path>
                                                </svg>
                                                <span className='text-black text-center' style={{ fontSize: "11px" }}>Checkbox</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="toggleSection border-end d-flex flex-wrap align-items-stretch justify-content-start mb-1">
                                        <div style={{ width: `33.3333%`, padding: "0.35rem", height: "100%" }}>
                                            <div title='Drag to add to your pop-up' draggable onDragStart={(e) => handleDragStart(e, "dropdown")} className="border rounded text-black w-100 d-flex flex-column justify-content-between align-items-center p-1" style={{ aspectRatio: "1", cursor: "grab", gap: "0.25rem" }}>
                                                <svg fill="none" viewBox="0 0 52 52" height="100%" width="50%" xmlns="http://www.w3.org/2000/svg">
                                                    <path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M44 12H8C6.89543 12 6 12.8954 6 14V28C6 29.1046 6.89543 30 8 30H44C45.1046 30 46 29.1046 46 28V14C46 12.8954 45.1046 12 44 12ZM8 10C5.79086 10 4 11.7909 4 14V28C4 30.2091 5.79086 32 8 32H44C46.2091 32 48 30.2091 48 28V14C48 11.7909 46.2091 10 44 10H8Z" fill="currentColor"></path>
                                                    <path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M35.2929 19.7929C35.6834 19.4024 36.3166 19.4024 36.7071 19.7929L38.5 21.5858L40.2929 19.7929C40.6834 19.4024 41.3166 19.4024 41.7071 19.7929C42.0976 20.1834 42.0976 20.8166 41.7071 21.2071L39.2071 23.7071C38.8166 24.0976 38.1834 24.0976 37.7929 23.7071L35.2929 21.2071C34.9024 20.8166 34.9024 20.1834 35.2929 19.7929Z" fill="currentColor"></path>
                                                    <path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M42 36C42 36.5523 41.5523 37 41 37H11C10.4477 37 10 36.5523 10 36C10 35.4477 10.4477 35 11 35H41C41.5523 35 42 35.4477 42 36Z" fill="currentColor"></path>
                                                    <path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M42 41C42 41.5523 41.5523 42 41 42H11C10.4477 42 10 41.5523 10 41C10 40.4477 10.4477 40 11 40H41C41.5523 40 42 40.4477 42 41Z" fill="currentColor"></path>
                                                    <path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M29 46C29 46.5523 28.5523 47 28 47H11C10.4477 47 10 46.5523 10 46C10 45.4477 10.4477 45 11 45H28C28.5523 45 29 45.4477 29 46Z" fill="currentColor"></path>
                                                </svg>
                                                <span className='text-black text-center' style={{ fontSize: "11px" }}>Dropdown</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="toggleSection border-end d-flex flex-wrap align-items-stretch justify-content-start mb-1">
                                        <div style={{ width: `33.3333%`, padding: "0.35rem", height: "100%" }}>
                                            <div title='Drag to add to your pop-up' draggable onDragStart={(e) => handleDragStart(e, "feedback")} className="border rounded text-black w-100 d-flex flex-column justify-content-between align-items-center p-1" style={{ aspectRatio: "1", cursor: "grab", gap: "0.25rem" }}>
                                                <svg fill="none" viewBox="0 0 52 52" height="100%" width="50%" xmlns="http://www.w3.org/2000/svg">
                                                    <path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M10 33C13.866 33 17 29.866 17 26C17 22.134 13.866 19 10 19C6.13401 19 3 22.134 3 26C3 29.866 6.13401 33 10 33ZM10 35C14.9706 35 19 30.9706 19 26C19 21.0294 14.9706 17 10 17C5.02944 17 1 21.0294 1 26C1 30.9706 5.02944 35 10 35Z" fill="currentColor"></path>
                                                    <path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M26 33C29.866 33 33 29.866 33 26C33 22.134 29.866 19 26 19C22.134 19 19 22.134 19 26C19 29.866 22.134 33 26 33ZM26 35C30.9706 35 35 30.9706 35 26C35 21.0294 30.9706 17 26 17C21.0294 17 17 21.0294 17 26C17 30.9706 21.0294 35 26 35Z" fill="currentColor"></path>
                                                    <path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M42 33C45.866 33 49 29.866 49 26C49 22.134 45.866 19 42 19C38.134 19 35 22.134 35 26C35 29.866 38.134 33 42 33ZM42 35C46.9706 35 51 30.9706 51 26C51 21.0294 46.9706 17 42 17C37.0294 17 33 21.0294 33 26C33 30.9706 37.0294 35 42 35Z" fill="currentColor"></path>
                                                    <circle xmlns="http://www.w3.org/2000/svg" cx="7" cy="24" r="1" fill="currentColor"></circle>
                                                    <circle xmlns="http://www.w3.org/2000/svg" cx="13" cy="24" r="1" fill="currentColor"></circle>
                                                    <circle xmlns="http://www.w3.org/2000/svg" cx="23" cy="24" r="1" fill="currentColor"></circle>
                                                    <circle xmlns="http://www.w3.org/2000/svg" cx="29" cy="24" r="1" fill="currentColor"></circle>
                                                    <circle xmlns="http://www.w3.org/2000/svg" cx="39" cy="24" r="1" fill="currentColor"></circle>
                                                    <circle xmlns="http://www.w3.org/2000/svg" cx="45" cy="24" r="1" fill="currentColor"></circle>
                                                    <path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M12.657 29.8891C11.2902 28.5223 9.07409 28.5223 7.70726 29.8891C7.31673 30.2796 6.68357 30.2796 6.29304 29.8891C5.90252 29.4986 5.90252 28.8654 6.29304 28.4749C8.44093 26.327 11.9233 26.327 14.0712 28.4749C14.4617 28.8654 14.4617 29.4986 14.0712 29.8891C13.6807 30.2796 13.0475 30.2796 12.657 29.8891Z" fill="currentColor"></path>
                                                    <path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M39.7073 27.4752C41.0741 28.842 43.2902 28.842 44.657 27.4752C45.0475 27.0846 45.6807 27.0846 46.0712 27.4752C46.4617 27.8657 46.4617 28.4989 46.0712 28.8894C43.9233 31.0373 40.4409 31.0373 38.293 28.8894C37.9025 28.4989 37.9025 27.8657 38.293 27.4752C38.6836 27.0846 39.3167 27.0846 39.7073 27.4752Z" fill="currentColor"></path>
                                                    <path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M22 28C22 27.4477 22.4477 27 23 27L29 27C29.5523 27 30 27.4477 30 28C30 28.5523 29.5523 29 29 29L23 29C22.4477 29 22 28.5523 22 28Z" fill="currentColor"></path>
                                                </svg>
                                                <span className='text-black text-center' style={{ fontSize: "11px" }}>Feedback</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="toggleSection border-end d-flex flex-wrap align-items-stretch justify-content-start mb-1">
                                        <div style={{ width: `33.3333%`, padding: "0.35rem", height: "100%" }}>
                                            <div title='Drag to add to your pop-up' draggable onDragStart={(e) => handleDragStart(e, "textarea")} className="border rounded text-black w-100 d-flex flex-column justify-content-between align-items-center p-1" style={{ aspectRatio: "1", cursor: "grab", gap: "0.25rem" }}>
                                                <svg fill="none" viewBox="0 0 52 52" height="100%" width="50%" xmlns="http://www.w3.org/2000/svg">
                                                    <path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M44 15H8C6.89543 15 6 15.8954 6 17V35C6 36.1046 6.89543 37 8 37H44C45.1046 37 46 36.1046 46 35V17C46 15.8954 45.1046 15 44 15ZM8 13C5.79086 13 4 14.7909 4 17V35C4 37.2091 5.79086 39 8 39H44C46.2091 39 48 37.2091 48 35V17C48 14.7909 46.2091 13 44 13H8Z" fill="currentColor"></path>
                                                    <path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M42 21C42 21.5523 41.5523 22 41 22L11 22C10.4477 22 10 21.5523 10 21C10 20.4477 10.4477 20 11 20L41 20C41.5523 20 42 20.4477 42 21Z" fill="currentColor"></path>
                                                    <path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M42 26C42 26.5523 41.5523 27 41 27L11 27C10.4477 27 10 26.5523 10 26C10 25.4477 10.4477 25 11 25L41 25C41.5523 25 42 25.4477 42 26Z" fill="currentColor"></path>
                                                    <path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M29 31C29 31.5523 28.5523 32 28 32H11C10.4477 32 10 31.5523 10 31C10 30.4477 10.4477 30 11 30H28C28.5523 30 29 30.4477 29 31Z" fill="currentColor"></path>
                                                </svg>
                                                <span className='text-black text-center' style={{ fontSize: "11px" }}>Textarea</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="toggleSection border-end d-flex flex-wrap align-items-stretch justify-content-start mb-1">
                                        <div style={{ width: `33.3333%`, padding: "0.35rem", height: "100%" }}>
                                            <div title='Drag to add to your pop-up' draggable onDragStart={(e) => handleDragStart(e, "tnc")} className="border rounded text-black w-100 d-flex flex-column justify-content-between align-items-center p-1" style={{ aspectRatio: "1", cursor: "grab", gap: "0.25rem" }}>
                                                <svg fill="none" viewBox="0 0 52 52" height="100%" width="50%" xmlns="http://www.w3.org/2000/svg">
                                                    <path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M44 10H8C6.89543 10 6 10.8954 6 12V14.5C6 15.6046 6.89543 16.5 8 16.5H44C45.1046 16.5 46 15.6046 46 14.5V12C46 10.8954 45.1046 10 44 10ZM8 8C5.79086 8 4 9.79086 4 12V14.5C4 16.7091 5.79086 18.5 8 18.5H44C46.2091 18.5 48 16.7091 48 14.5V12C48 9.79086 46.2091 8 44 8H8Z" fill="currentColor"></path>
                                                    <path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M44 23H8C6.89543 23 6 23.8954 6 25V27.5C6 28.6046 6.89543 29.5 8 29.5H44C45.1046 29.5 46 28.6046 46 27.5V25C46 23.8954 45.1046 23 44 23ZM8 21C5.79086 21 4 22.7909 4 25V27.5C4 29.7091 5.79086 31.5 8 31.5H44C46.2091 31.5 48 29.7091 48 27.5V25C48 22.7909 46.2091 21 44 21H8Z" fill="currentColor"></path>
                                                    <path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M44 36H8C6.89543 36 6 36.8954 6 38V40.5C6 41.6046 6.89543 42.5 8 42.5H44C45.1046 42.5 46 41.6046 46 40.5V38C46 36.8954 45.1046 36 44 36ZM8 34C5.79086 34 4 35.7909 4 38V40.5C4 42.7091 5.79086 44.5 8 44.5H44C46.2091 44.5 48 42.7091 48 40.5V38C48 35.7909 46.2091 34 44 34H8Z" fill="currentColor"></path>
                                                </svg>
                                                <span className='text-black text-center' style={{ fontSize: "11px" }}>Survey</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* ---------------- */}
                                    <p className='m-0 fw-bolder text-black text-uppercase' style={{ padding: "0.5rem 0.5rem 0px", fontSize: "0.75rem" }}>Layout Elements</p>
                                    <div className="toggleSection border-end d-flex align-items-stretch justify-content-start mb-1">
                                        <div style={{ width: `33.3333%`, padding: "0.35rem", height: "100%" }}>
                                            <div title='Drag to add to your pop-up' draggable onDragStart={(e) => handleDragStart(e, "col1")} className="border rounded text-dark w-100 d-flex flex-column justify-content-between align-items-center p-1" style={{ aspectRatio: "1", cursor: "grab", gap: "0.25rem" }}>
                                                <Square size={17.5} />
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
                                {sideNav === "button" && <div style={{ transition: "0.3s ease-in-out", overflow: "auto", width: "280px", transform: `translateX(${sideNav === "button" ? "0px" : "-280px"})`, position: "absolute", inset: "0px" }}>
                                    <div style={{ flexWrap: "wrap" }} className="toggleSection border-end d-flex align-items-stretch justify-content-start mb-1">
                                        <div style={{ width: `33.3333%`, padding: "0.35rem", height: "100%" }}>
                                            <div title='Drag to add to your pop-up' draggable onDragStart={(e) => handleDragStart(e, "text", "type")} className="border rounded w-100 d-flex flex-column justify-content-between align-items-center p-1 h-100" style={{ aspectRatio: "1", cursor: "grab", gap: "0.25rem" }}>
                                                <Type color="#727272" size={17.5} />
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
                                            <div title='Drag to add to your pop-up' draggable onDragStart={(e) => handleDragStart(e, "image")} className="border rounded w-100 d-flex flex-column justify-content-between align-items-center p-1 h-100" style={{ aspectRatio: "1", cursor: "grab", gap: "0.25rem" }}>
                                                <Image color="#727272" size={17.5} />
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
                                </div>}
                                {/* Button Section */}

                                {/* Offer Section */}
                                {sideNav === "offers" && (
                                    <div style={{ transition: "0.3s ease-in-out", overflow: "auto", width: "280px", transform: `translateX(${sideNav === "offers" ? "0px" : "-280px"})`, position: "absolute", inset: "0px", maxHeight: "100%", overflow: "auto" }}>
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
                                                                console.log("hi", finalObj?.selectedOffers)
                                                                if (finalObj?.selectedOffers?.some($ => $?.Code === ele.Code)) {
                                                                    const newArr = [...finalObj.selectedOffers]
                                                                    updatePresent({ ...finalObj, selectedOffers: [...newArr?.filter(item => item.Code !== ele.Code)] })
                                                                } else {
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
                                    </div>
                                )}
                                {/* Offer Section */}

                                {/* Criteria section */}
                                {sideNav === "criteria" && <div style={{ transition: "0.3s ease-in-out", overflow: "auto", width: "280px", transform: `translateX(${sideNav === "criteria" ? "0px" : "-280px"})`, position: "absolute", inset: "0px" }}>
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
                                {/* Criteria section */}
                            </div>

                        </div>
                        {/* Section Drawer */}
                        {/* Theme Preview */}
                        <div className="d-flex flex-column flex-grow-1 align-items-center bg-light-secondary">
                            {returnRender({ outletData, slPrevBg, bgsettings: finalObj?.overlayStyles, currPage, setCurrPage, currPosition, setCurrPosition, indexes, setIndexes, popPosition: finalObj?.positions?.[`${mobileCondition}${pageCondition}`], bgStyles: finalObj?.backgroundStyles?.[`${mobileCondition}main`], crossStyle: finalObj?.crossButtons[`${mobileCondition}${pageCondition}`], values, setValues, showBrand, handleColDrop, handleDragOver, handleElementDrop, handleLayoutDrop, handleRearrangeElement, mouseEnterIndex, setMouseEnterIndex, mousePos, setMousePos, isEqual, makActive, colWise: currPage === "button" ? [...finalObj?.[`${mobileCondition}button`]] : [...finalObj?.[`${mobileCondition}pages`][finalObj?.[`${mobileCondition}pages`]?.findIndex($ => $.id === currPage)].values], setcolWise, setDragStartIndex, dragOverIndex, setDragOverIndex, isMobile, finalObj, setFinalObj: updatePresent, mobileCondition, openPage, setOpenPage, brandStyles, gotOffers, setTransfered, sideNav, setSideNav, btnStyles: finalObj?.backgroundStyles[`${mobileCondition}button`], offerTheme: finalObj?.offerTheme, navigate, triggerImage, gotDragOver, setGotDragOver, indicatorPosition, setIndicatorPosition, selectedOffer, setSelectedOffer, renamePage, setRenamePage, pageName, setPageName, undo, updatePresent, openToolbar, setOpenToolbar })}
                        </div>
                        {/* Theme Preview */}
                        {/* Edit Section */}
                        <div className="edit-section h-100" style={{ width: currPosition?.selectedType !== "" ? "280px" : "0px", overflow: "auto", transition: "0.3s ease-in-out" }}>
                            {currPosition?.selectedType !== "" && renderElems()}
                        </div>
                        {/* Edit Section */}
                    </div>
                    {/* Preview and Edit Section */}

                    {/*Modals */}
                    <Modal onClick={() => setBgModal0(!bgModal0)} toggle={() => setBgModal0(!bgModal0)} className='hide-backdrop' isOpen={bgModal0} style={{ width: "300px", maxWidth: "90%", margin: "0px" }}>
                        <BgModifier closeState={bgModal0} setCloseState={setBgModal0} styles={values} setStyles={setValues} />
                    </Modal>
                    <Modal onClick={() => setBgModal(!bgModal)} toggle={() => setBgModal(!bgModal)} className='hide-backdrop' isOpen={bgModal} style={{ width: "300px", maxWidth: "90%", margin: "0px" }}>
                        <BgModifier type="btnSetting" setMainStyle={updatePresent} mainStyle={finalObj} closeState={bgModal} setCloseState={setBgModal} styles={finalObj?.overlayStyles} />
                    </Modal>
                    <Modal onClick={() => setBgModal2(!bgModal2)} toggle={() => setBgModal2(!bgModal2)} className='hide-backdrop' isOpen={bgModal2} style={{ width: "300px", maxWidth: "90%", margin: "0px" }}>
                        <BgModifier type="bgStyles" styles={finalObj?.backgroundStyles?.[`${mobileCondition}main`]} setMainStyle={updatePresent} mainStyle={finalObj} mobileCondition={mobileCondition} closeState={bgModal2} setCloseState={setBgModal2} />
                    </Modal>
                    <Modal onClick={() => setBgModal3(!bgModal3)} toggle={() => setBgModal3(!bgModal3)} className='hide-backdrop' isOpen={bgModal3} style={{ width: "300px", maxWidth: "90%", margin: "0px" }}>
                        <BgModifier type="btnStyles" styles={finalObj?.backgroundStyles?.[`${mobileCondition}button`]} setMainStyle={updatePresent} mainStyle={finalObj} mobileCondition={mobileCondition} colorType={colorType} closeState={bgModal3} setCloseState={setBgModal3} />
                    </Modal>
                    <Modal onClick={() => setBgModal4(!bgModal4)} toggle={() => setBgModal4(!bgModal4)} className='hide-backdrop' isOpen={bgModal4} style={{ width: "300px", maxWidth: "90%", margin: "0px" }}>
                        <CustomColorModifier type="offerColors" setMainStyle={updatePresent} mainStyle={finalObj} colorType={currOfferColor} />
                    </Modal>
                    <Modal onClick={() => setCustomColorModal(!customColorModal)} toggle={() => setCustomColorModal(!customColorModal)} className='hide-backdrop' isOpen={customColorModal} style={{ width: "300px", maxWidth: "90%", margin: "0px" }}>
                        <CustomColorModifier type="cross" setMainStyle={updatePresent} mainStyle={finalObj} pageCondition={`${mobileCondition}${pageCondition}`} colorType={colorType} />
                    </Modal>
                    <Modal onClick={() => setCustomColorModal2(!customColorModal2)} toggle={() => setCustomColorModal2(!customColorModal2)} className='hide-backdrop' isOpen={customColorModal2} style={{ width: "300px", maxWidth: "90%", margin: "0px" }}>
                        <CustomColorModifier styles={defColors} setStyles={setDefColors} colorType={currColor} />
                    </Modal>
                    <Modal style={{ filter: "drop-shadow(0px 0px 15px rgba(0,0,0,0.75))" }} isOpen={imgModal} toggle={() => setImgModal(!imgModal)} size='xl'>
                        <div className="w-100 p-1 d-flex justify-content-between align-items-center">
                            <h3 className='m-0'>Select Image</h3> <span className='cursor-pointer' onClick={() => setImgModal(!imgModal)}><X /></span>
                        </div>
                        <ModalBody className='position-relative' style={{ height: "75vh", overflowY: "scroll" }}>

                            {imgLoading && <div className="position-fixed d-flex justify-content-center align-items-center" style={{ inset: "0px", backgroundColor: "rgba(255,255,255,0.5)" }}>
                                <Spinner />
                            </div>}
                            <div className="p-1 pt-0 d-flex justify-content-center border-bottom">
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
                            </div>
                            <div className="p-1 row">
                                {allImages.length >= 0 ? allImages.map((ele, key) => {
                                    return (
                                        <div key={key} className="col-2 img-array-item" style={{ padding: "0.5rem" }}>
                                            <div style={{ aspectRatio: "1", backgroundImage: `url(${ele?.image})`, backgroundSize: "contain", boxShadow: "0px 5px 7.5px rgba(0,0,0,0.25)", backgroundRepeat: "no-repeat", backgroundPosition: "center" }} className="w-100 h-100 rounded-3 border overflow-hidden">
                                                <div className="revealSection w-100 h-100 d-flex flex-column gap-1 justify-content-between align-items-center p-2" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                                                    <div className="p-1 bg-white text-black rounded-3 w-100">{ele?.image?.split("/")?.at("-1")}</div>
                                                    <button className="btn btn-dark w-100" onClick={() => {
                                                        console.log(imageType, "imageType")
                                                        if (imageType === "SINGLE") {
                                                            const colWise = currPage === "button" ? [...finalObj?.[`${mobileCondition}button`]] : [...finalObj?.[`${mobileCondition}pages`][finalObj?.[`${mobileCondition}pages`]?.findIndex($ => $.id === currPage)].values]
                                                            const arr = [...colWise]
                                                            if (arr[indexes.cur].elements[colWise[indexes.cur].elements.findIndex($ => $?.positionType === indexes.curElem)].element[indexes.subElem].type) {
                                                                arr[indexes.cur].elements[colWise[indexes.cur].elements.findIndex($ => $?.positionType === indexes.curElem)].element[indexes.subElem].type = "image"
                                                            }
                                                            if (arr[indexes.cur].elements[colWise[indexes.cur].elements.findIndex($ => $?.positionType === indexes.curElem)].element[indexes.subElem].src) {
                                                                arr[indexes.cur].elements[colWise[indexes.cur].elements.findIndex($ => $?.positionType === indexes.curElem)].element[indexes.subElem].src = ele.image
                                                            }
                                                            if (arr[indexes.cur].elements[colWise[indexes.cur].elements.findIndex($ => $?.positionType === indexes.curElem)].element[indexes.subElem].isBrandLogo) {
                                                                arr[indexes.cur].elements[colWise[indexes.cur].elements.findIndex($ => $?.positionType === indexes.curElem)].element[indexes.subElem].isBrandLogo = false
                                                            }
                                                            const newFinalObj = finalObj
                                                            currPage === "button" ? newFinalObj[`${mobileCondition}button`] = arr : newFinalObj[`${mobileCondition}pages`][finalObj[`${mobileCondition}pages`].findIndex($ => $?.id === currPage)].values = arr
                                                            updatePresent(newFinalObj)
                                                            setcolWise(currPage === "button" ? newFinalObj?.[`${mobileCondition}button`] : newFinalObj?.[`${mobileCondition}pages`]?.[finalObj?.[`${mobileCondition}pages`]?.findIndex($ => $?.id === currPage)]?.values)
                                                            setImgModal(!imgModal)

                                                        } else {
                                                            const finalData = finalObj
                                                            const colWise = currPage === "button" ? [...finalObj?.[`${mobileCondition}button`]] : [...finalObj?.[`${mobileCondition}pages`][finalObj?.[`${mobileCondition}pages`]?.findIndex($ => $.id === currPage)].values]
                                                            const arr = [...colWise]

                                                            // const imageList = arr?.filter((curElem) => curElem?.elements).filter((subElem) => subElem?.element).filter((childElem) => childElem.type === "image" ? isBrandLogo)
                                                            console.log(arr, "imageList")

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
                                        <span>No images to show. Try uploading more images</span>
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