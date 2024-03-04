import React, { useContext, useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Edit, ChevronUp, Edit2, PlusCircle, X, Trash2 } from 'react-feather'
import { useLocation, useNavigate } from 'react-router-dom'
import Select from 'react-select'
// import ReactQuill from 'react-quill'
import isEqual from "lodash.isequal"
import { AccordionBody, AccordionHeader, AccordionItem, Card, CardBody, Modal, ModalBody, UncontrolledAccordion } from 'reactstrap'
import CustomColorModifier from '../../FormBuilder/FormBuilder(components)/CustomColorModifier'
// import Theme1 from "../Customization/Theme1"
// import Theme4 from "../Customization/Theme4"
import { PermissionProvider, ThemesProvider } from '../../../Helper/Context'
import { Pagination, Navigation, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js'
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import 'swiper/modules/navigation/navigation.min.css'
import 'swiper/modules/autoplay/autoplay.min.css'
import { allThemes as newThemes } from '../../Components/SuperLeadz/allThemes'
// import JsonToJsx from '../../Components/SuperLeadz/JsonToJsx'
import { defaultObj } from '../../NewCustomizationFlow/defaultStyles'
import IntroWrapper from '../../Components/SuperLeadz/IntroWrapper'
import pixels from "@src/assets/images/superLeadz/pixels.png"
import Spinner from '../../Components/DataTable/Spinner'
import { SuperLeadzBaseURL } from '../../../assets/auth/jwtService'
import { getCurrentOutlet } from '../../Validator'
import SunEditor from 'suneditor-react'
import axios from 'axios'
import chevronDown from "../../../assets/images/superLeadz/chevron-down.svg"
import ColabReg from "../../../@core/assets/fonts/Colaborate/ColabReg.otf"
import Breadcrumb from '../../Components/BreadCrumbs/Breadcrumb'
import Editor from '../../NewCustomizationFlow/Editor'

const Customization = () => {
    const { userPermission } = useContext(PermissionProvider)
    const themeLoc = useLocation()
    const { selectedThemeNo, oldThemes: allThemes, setOldThemes: setAllThemes, selectedCustThemeId, selectedThemeId } = useContext(ThemesProvider)

    const allPreviews = [...newThemes]

    const [isMobile, setIsMobile] = useState(false)
    const mobileCondition = isMobile ? "mobile_" : ""
    const mobileConditionRev = !isMobile ? "mobile_" : ""

    const [finalObj, setFinalObj] = useState(themeLoc?.state?.custom_theme ? JSON.parse(themeLoc?.state?.custom_theme) : selectedCustThemeId !== "" ? { ...allPreviews[allPreviews?.findIndex($ => $?.theme_id === selectedCustThemeId)]?.object } : defaultObj)

    const [crossStyle, setCrossStyle] = useState({ ...finalObj?.crossButtons?.main })

    const [allOffers, setAllOffers] = useState([])

    const [currColor, setCurrColor] = useState("primary")

    const [currPage, setCurrPage] = useState("main")

    const [indexes, setIndexes] = useState({ cur: 0, curElem: "left", subElem: "grandparent" })

    const [values, setValues] = useState({})

    const [currPosition, setCurrPosition] = useState({
        id: null,
        position: null,
        name: null,
        selectedType: "navMenuStyles"
    })

    const [customColorModal2, setCustomColorModal2] = useState(false)
    const [mouseEnterIndex, setMouseEnterIndex] = useState({ cur: false, curElem: false, subElem: false })

    const [defColors, setDefColors] = useState(finalObj.defaultThemeColors || {})

    const outletData = getCurrentOutlet()

    const [openPage, setOpenPage] = useState(true)
    const [gotOffers, setGotOffers] = useState(false)
    const [bgStyles, setBgStyles] = useState(selectedThemeId === "" ? { backgroundColor: "rgba(255,255,255,1)", bgType: "solid", width: '550px', maxWidth: "90%", minHeight: '75px', paddingTop: "0px", paddingBottom: "0px", paddingRight: "0px", paddingLeft: "0px", marginTop: "0px", marginBottom: "0px", marginRight: "0px", marginLeft: "0px", borderWidth: "0px 0px 0px 0px", defBorderWidth: "0px", borderColor: "rgba(0,0,0,1)", borderStyle: "solid", borderType: "none", borderTopLeftRadius: "0px", borderTopRightRadius: "0px", borderBottomRightRadius: "0px", borderBottomLeftRadius: "0px", boxSizing: "border-box" } : finalObj.backgroundStyles[`${mobileCondition}main`])
    const [btnStyles, setBtnStyles] = useState({ backgroundColor: "rgba(255,255,255,1)", bgType: "solid", width: '300px', maxWidth: "100%", minHeight: '50px', paddingTop: "0px", paddingBottom: "0px", paddingRight: "0px", paddingLeft: "0px", marginTop: "0px", marginBottom: "0px", marginRight: "0px", marginLeft: "0px", borderWidth: "0px 0px 0px 0px", defBorderWidth: "0px", borderColor: "rgba(0,0,0,1)", borderStyle: "solid", borderType: "none", borderTopLeftRadius: "0px", borderTopRightRadius: "0px", borderBottomRightRadius: "0px", borderBottomLeftRadius: "0px", boxSizing: "border-box" })
    const [bgOffer, setBgOffer] = useState({ backgroundColor: "rgba(255,255,255,0)", bgType: "solid", paddingTop: "0px", paddingBottom: "0px", paddingRight: "0px", paddingLeft: "0px", marginTop: "0px", marginBottom: "0px", marginRight: "auto", marginLeft: "auto", borderWidth: "0px 0px 0px 0px", defBorderWidth: "0px", borderColor: "rgba(0,0,0,1)", borderStyle: "solid", borderType: "none", borderTopLeftRadius: "0px", borderTopRightRadius: "0px", borderBottomRightRadius: "0px", borderBottomLeftRadius: "0px", maxWidth: "100%", maxHeight: "300px", overflow: "auto", boxSizing: "border-box" })

    const [popPosition, setPopPosition] = useState("MC")
    const [sideNav, setSideNav] = useState('display')

    const themeData = allThemes[`themeData${selectedThemeNo}`]
    const [displayEditor, setDisplayEditor] = useState({ textEditor: false, imageEditor: false })
    const [imgModal, setImgModal] = useState(false)
    const [imgLoading, setImgLoading] = useState(false)
    const [allImages, setAllImages] = useState([])

    const [colWise, setcolWise] = useState(currPage === "button" ? finalObj?.button : finalObj?.[`${mobileCondition}pages`][finalObj?.[`${mobileCondition}pages`]?.findIndex($ => $?.id === currPage)]?.values)

    const [activeSect, setActiveSect] = useState("text")
    const navigate = useNavigate()
    const fontStyles = [
        { label: "Montserrat", value: `Montserrat` },
        { label: "Open Sans", value: `Open Sans` },
        { label: "Oswald", value: `Oswald` },
        { label: "Abril Fatface", value: `Abril Fatface` },
        { label: "Lato", value: `Lato` }
    ]

    const positionIndex = colWise[indexes.cur]?.elements?.findIndex($ => $?.positionType === indexes.curElem)

    // const pagesSelect = [
    //     { value: 'nextPage', label: 'Next page' },
    //     { value: 'jumpTo', label: 'Jump to' },
    //     { value: 'redirect', label: 'Redirect' },
    //     { value: 'call', label: 'Call' },
    //     { value: 'close', label: 'Close' },
    //     { value: 'sendOTP', label: 'Send OTP' }
    // ]

    const SunEditorConfig = {
        toolbarContainer: '#toolbar_container',
        mode: 'balloon-always',
        showPathLabel: false,
        charCounter: true,
        maxCharCount: 720,
        width: 'auto',
        minWidth: '10px',
        height: 'auto',
        minHeight: '0px',
        maxHeight: 'auto',
        buttonList: [
            // ['undo', 'redo'],
            ['formatBlock', 'bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'removeFormat'],
            ['fontColor', 'hiliteColor', 'outdent', 'indent', 'align', 'horizontalRule', 'list', 'lineHeight']
            // ['table', 'link', 'image', 'video', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save']
        ]
    }

    const SunEditorConfigBlock = {
        toolbarContainer: '#toolbar_container',
        mode: 'classic',
        showPathLabel: false,
        charCounter: false,
        charCounterLabel: null,
        maxCharCount: null,
        fullPage: false,
        resizingBar: false,
        width: '5px',
        // minWidth: '10px',
        height: 'auto',
        // minHeight: '0px',
        maxHeight: 'auto',
        buttonList: [
            ['font', 'formatBlock', 'bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'removeFormat'],
            ['fontColor', 'hiliteColor', 'outdent', 'indent', 'align', 'horizontalRule', 'list', 'lineHeight']
        ]
    }

    // const settingImage = (image) => {
    //     let demo
    //     try {
    //         demo = URL.createObjectURL(image)
    //     } catch (error) {
    //         demo = image
    //     }
    //     return demo
    // }

    const makActive = (e, cur, curData, position, id, j) => {
        setCurrPosition({ ...currPosition, position, id, name: e.target.name, curData, cur, j })
    }

    const arr = [...colWise]

    console.log(values, popPosition, setIsMobile, setBtnStyles, setOpenPage, setBgOffer, setGotOffers, setCrossStyle, setAllOffers)

    const getOffers = () => {
        setGotOffers(false)
        // const form_data = new FormData()
        // form_data.append('shop', outletData[0]?.web_url)
        // form_data.append('app', 'superleadz')

        // const offerUrl = new URL(`${SuperLeadzBaseURL}/api/v1/get/get_offers/`)

        // axios({ method: "POST", data: form_data, url: offerUrl })
        //     .then((data) => {
        //         setGotOffers(true)
        //         setAllOffers([...data.data.status])
        //         // setFinalObj({ ...finalObj, selectedOffers: [...data.data.status] })
        //     })
        //     .catch(err => console.log(err))

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

    function changeThemes(e) {
        const maxSize = 512
        if (e.target.type === 'file') {
            if (e.target.files[0].size > (maxSize * 1024)) {
                alert(`Image size too large. The maximum size allowed is ${maxSize}kb`)
            } else {
                setAllThemes({ ...allThemes, [`themeData${selectedThemeNo}`]: { ...allThemes[`themeData${selectedThemeNo}`], [e.target.name]: e.target.files[0], [`mobile_${e.target.name}`]: e.target.files[0] } })
            }
        } else {
            setAllThemes({ ...allThemes, [`themeData${selectedThemeNo}`]: { ...allThemes[`themeData${selectedThemeNo}`], [e.target.name]: e.target.value, [`mobile_${e.target.name}`]: e.target.value } })
        }
    }
    // const carouselImageAdd = (e) => {
    //     console.log(e)
    //     const maxSize = 512
    //     if (e.target.files[0].size > (maxSize * 1024)) {
    //         alert('Image size too large')
    //     } else {
    //         setAllThemes({ ...allThemes, themeData4: { ...allThemes.themeData4, [`carousel_image`]: [...carouselArray, e.target.files[0]] } })
    //     }
    // }

    // const editCarouselImage = (e, i) => {
    //     const maxSize = 512
    //     if (e.target.files[0].size > (maxSize * 1024)) {
    //         alert('Image size too large')
    //     } else {
    //         const editArray = [...carouselArray]
    //         editArray[i] = e.target.files[0]
    //         setAllThemes({ ...allThemes, themeData4: { ...allThemes.themeData4, [`carousel_image`]: editArray } })
    //     }
    // }

    // const removeCarouselImage = (i) => {
    //     const editArray = [...carouselArray]
    //     editArray.splice(i, 1)
    //     setAllThemes({ ...allThemes, themeData4: { ...allThemes.themeData4, [`carousel_image`]: editArray } })
    // }


    // function selectionDiv(id) {
    //     const para = document.querySelector(`${id} .ql-editor`)
    //     const selection = window.getSelection()
    //     const range = document.createRange()
    //     range.selectNodeContents(para)
    //     selection.removeAllRanges()
    //     selection.addRange(range)
    // }

    // useEffect(() => {
    //     setCustThemeStyle((prevThemeStyle) => ({
    //         ...prevThemeStyle,
    //         colorStyle: { ...defColors }
    //     }))
    // }, [defColors])

    useEffect(() => {
        const header_p = document.querySelectorAll(`#customization .header-text-sect-${selectedThemeNo} p`)
        const header_quill = document.querySelectorAll(`#headertext p`)
        const body_quill = document.querySelectorAll(`#bodytext p`)
        const body_p = document.querySelectorAll(`#customization .body-text-sect-${selectedThemeNo} p`)

        header_p.forEach((pTag) => {
            pTag.style.color = themeData?.[`header_color`]
        })
        body_p.forEach((pTag) => {
            pTag.style.color = themeData?.[`body_color`]
        })
        header_quill?.forEach((pTag) => {
            pTag.style.color = themeData?.[`header_color`]
        })
        body_quill?.forEach((pTag) => {
            pTag.style.color = themeData?.[`body_color`]
        })

    }, [allThemes])

    useEffect(() => {
        // console.table(defColors, currColor)
        // setFinalObj({ ...finalObj, defaultThemeColors: { ...finalObj.defaultThemeColors, [currColor]: defColors[currColor] } })
        const newObj = { ...finalObj }
        const newBgStyles = { ...bgStyles }
        function changeStyles(obj) {
            if (obj?.isInitialBgColor) {
                obj.backgroundColor = defColors[obj?.initialBgColor]
            } else if (obj?.isInitialColor) {
                obj.color = defColors[obj?.initialColor]
            } else if (obj?.isInitialBorderColor) {
                obj.borderColor = defColors[obj?.initialBorderColor]
            }
        }
        changeStyles(newBgStyles)
        newObj?.pages?.forEach((page) => {
            page?.values?.forEach((cur) => {
                changeStyles(cur.style)
                cur?.elements?.forEach((curElem) => {
                    changeStyles(curElem.style)
                    curElem?.element?.forEach((subElem) => {
                        changeStyles(subElem?.style)
                    })
                })
            })
        })
        newObj?.mobile_pages?.forEach((page) => {
            page?.values?.forEach((cur) => {
                changeStyles(cur.style)
                cur?.elements?.forEach((curElem) => {
                    changeStyles(curElem.style)
                    curElem?.element?.forEach((subElem) => {
                        changeStyles(subElem.style)
                    })
                })
            })
        })
        // colWise.forEach((cur, key) => {
        //     changeStyles(newCol[key].style)
        //     cur.elements.forEach((curElem, i) => {
        //         changeStyles(newCol[key].elements[i].style)
        //         curElem.element.forEach((subElem, j) => {
        //             changeStyles(newCol[key].elements[i].element[j].style)
        //         })
        //     })
        // })
        // setcolWise([...newCol])
        setBgStyles(newBgStyles)
        setcolWise(currPage === "button" ? newObj?.button : newObj?.pages[newObj?.pages?.findIndex($ => $?.id === currPage)]?.values)
        // setValues({...newCol})
        // const arr = [...colWise]
        const positionIndex = colWise[indexes.cur]?.elements?.findIndex($ => $?.positionType === indexes?.curElem)
        if (indexes.subElem === "grandparent") {
            // arr[indexes.cur].style = { ...arr[indexes.cur].style, ...values }
            setValues(currPage === "button" ? { ...newObj?.button[indexes.cur]?.style } : { ...newObj?.pages[newObj?.pages?.findIndex($ => $?.id === currPage)]?.values[indexes.cur]?.style })
            // setValues({...colWise[indexes.cur].style})
        } else if (indexes.subElem === "parent") {
            // const positionIndex = colWise[indexes.cur]?.elements?.findIndex($ => $?.positionType === indexes.curElem)
            // setValues({...colWise[indexes.cur].elements[positionIndex].style})
            setValues(currPage === "button" ? { ...newObj?.button[indexes.cur]?.elements[positionIndex]?.style } : { ...newObj?.pages[newObj.pages?.findIndex($ => $?.id === currPage)]?.values[indexes.cur]?.elements[positionIndex]?.style })
        } else {
            // const positionIndex = colWise[indexes.cur]?.elements?.findIndex($ => $?.positionType === indexes?.curElem)
            // setValues({...colWise[indexes.cur]?.elements[positionIndex]?.element[indexes.subElem]})
            setValues(currPage === "button" ? { ...newObj?.button[indexes.cur]?.elements[positionIndex]?.element[indexes.subElem]?.style } : { ...newObj?.pages[newObj?.pages?.findIndex($ => $?.id === currPage)]?.values[indexes.cur]?.elements[positionIndex]?.element[indexes.subElem]?.style })
        }
        // setcolWise([...newCol])
        setFinalObj({ ...newObj, defaultThemeColors: { ...finalObj.defaultThemeColors, [currColor]: defColors[currColor] } })

    }, [defColors, currColor])

    useEffect(() => {
        const obj = { ...finalObj }
        obj.backgroundStyles[`${mobileCondition}${currPage === "button" ? "button" : "main"}`] = currPage === "button" ? { ...btnStyles } : { ...bgStyles }
        const dupObj = { ...obj }
        dupObj?.responsive?.filter(item => item.position === "background")?.forEach(style => {
            style?.common?.forEach(value => {
                obj.backgroundStyles[`${mobileConditionRev}${currPage === "button" ? "button" : "main"}`][value] = obj?.backgroundStyles?.[`${mobileCondition}${currPage === "button" ? "button" : "main"}`]?.[value]
            })
        })
        setFinalObj({ ...obj })
    }, [btnStyles, bgStyles])

    const button_div = useRef(null)

    // const btn_height = button_div?.current?.offsetHeight

    useEffect(() => {
        getOffers()
    }, [])

    const currPageIndex = finalObj?.pages?.findIndex($ => $?.id === currPage)

    console.log(colWise, "colWise")

    return (

        <>
            <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            @import url('https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&family=Oswald:wght@200;300;400;500;600;700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

            @font-face {
                font-family: 'Colaborate';
                src: url(${ColabReg}) format('truetype');
                font-weight: normal;
                font-style: normal;
            }
            #preview_section {
                all: initial;
            }

            .text-field > * {
                line-height: initial !important;
            }

            .active-on::before {
            content: "";
            position: absolute;
            inset: 0px;
            z-index: -1;
            border-bottom: 5px solid #464646;
            }
            .sketch-picker {
            width: auto !important;
            padding: 0px !important;
            box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px !important;
            }
            [dir] .ql-bubble .ql-tooltip {
                background-color: #1d1d1d;
                border-radius: 5px;
            }
            [dir] .css-1rhbuit-multiValue {
            background-color: #464646 !important;
            }
            [dir] .acc-header button {
            background-color: white !important;
            }
            .row > .px-0 {
            padding-left: 0px !important;
            padding-right: 0px !important;
            }
            .se-toolbar-balloon {
            width: ${finalObj.backgroundStyles.main.width} !important;
            margin: auto !important;
            position: fixed !important;
            }
            .se-wrapper-inner.se-wrapper-wysiwyg.sun-editor-editable {
                padding: 0px !important;
            }
            #dropZoneParent::-webkit-scrollbar, #dropZoneParent *::-webkit-scrollbar {
            display: none;
            }
            .modal-backdrop.fade.show {
            opacity: 0 !important;
            }
            .gen-text {
            box-shadow: 0px 0px 0px rgba(0,0,0,0) !important;
            transition: 0.3s ease;
            }
            .gen-text:hover {
            box-shadow: 0px 0px 15px rgba(0,0,0,0.25) !important;
            }
            [dir] .accordion-button::after {
                background-image: url(${chevronDown}) !important;
            }
            .revealSection {
                opacity: 0;
                transition: 0.3s ease-in-out;
            }
            .img-array-item:hover .revealSection {
                opacity: 1;
            }
            input::-webkit-outer-spin-button, input::-webkit-inner-spin-button {
                -webkit-appearance: auto !important;
                opacity: 1 !important;
            }
            input[type=range] {
                accent-color: #464646 !important;
            }
            .tree-border::after {
                content: "";
                position: absolute;
                inset: 1.185rem auto auto auto;
                width: 1rem;
                border-top: 1px solid lightgray;    
            }
            .tree-border::before {
                content: "";
                position: absolute;
                top: 0.185rem;
                height: 100%;
                border-left: 1px solid lightgray;    
            }
            .tree-border:last-child::before {
                height: 1rem !important;   
            }
            #customization-container {
                font-family: "Montserrat";

            }
            .active-elem {
                position: relative;
                outline: 2px solid #727272;
            }
            .swiper-button-next::after, .swiper-rtl .swiper-button-prev::after, .swiper-button-prev::after, .swiper-rtl .swiper-button-next::after  {
                font-size: 13px;
                background-color: rgba(0,0,0,0.25);
                font-weight: bold;
                color: #464646;
                height: 25px;
                width: 25px;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 500px;
                padding: 0px;
                outline: 1px solid #464646
            }
            #page-selector {
                max-width: calc(100vw - 65px - 350px - 240px);
            }
            .custom-btn-outline {
                color: #82868b !important;
                border: 1px solid #82868b !important;
                background-color: rgba(59, 89, 152, 0) !important;
                transition: 0.2s ease;
            }
            .custom-btn-outline:hover {
                color: #000000 !important;
                border: 1px solid #000000 !important;
            }
            [dir] .form-check-dark .form-check-input:checked {
                border-color: #464646;
                background-color: #006aff;
            }
            .sideNav-items {
                gap: 0.5rem;
                cursor: pointer;
                padding: 0.75rem 0px;
                aspect-ratio: 1;
                transition: 0.3s ease-in-out;
                box-shadow: 0px 0px 0px rgba(0,0,0,0);
                border-radius: 10px;
            }
            .sideNav-items.active-item {
                box-shadow: 0px 0px 10px rgba(0,0,0,0.5);
            }

            @media only screen and (max-width: 1280px) {
                #page-selector {
                    max-width: 340px;
                }
            }
            .swiper-wrapper {
                gap: 45px;
            }
            .se-btn-select se-btn-tool-font{
                font-size: 14px;
                font-family: 'Montserrat';
                font-weight: 400;
            }
            .sun-editor .se-btn-module-border{
                border: none !important;
                margin-right: 0px !important;
                margin-left: 0px !important;
            }
            .sun-editor .se-toolbar{
                backgeoung-color: #fff !important;
            }
            .sun-editor .se-btn-select.se-btn-tool-font{
                width: 75px;
                font-size: 14px;
                font-weight: 400;
                font-family: Montserrat;
            }
            .sun-editor .se-btn-select.se-btn-tool-font svg, .sun-editor .se-btn-select.se-btn-tool-format svg {
                width: 8px !important;
            }
            .sun-editor .se-btn-select.se-btn-tool-format{
                width: 90px;
                font-size: 14px;
                font-weight: 400;
                font-family: Montserrat;
            }
            [dir=ltr] .sun-editor .se-btn {
                margin-right: 10px !important;
            }
            [dir=ltr] .sun-editor .se-btn svg{
                width: 15px;
            }
            [dir=ltr] .sun-editor .se-btn:nth-child(1){
                margin-right: 0px;
            }
            .breadcrumb-active {
                text-decoration: underline !important;
                text-decoration-thickness: 2px !important;
                text-decoration-color: #000 !important;
                text-underline-offset: 3px !important;
                // text-shadow: 0px 0px 45px #fbcd0c !important
            }
            `}</style>

           
            <IntroWrapper>

                <div className=" w-100" style={{ position: 'relative', zIndex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'between', height: '85vh' }}>
                    {/* <h2><b>SuperLeadz</b></h2> */}
                    <div className="flex-grow-1">
                        {/* <Breadcrumb /> */}
                        {/* <h3 style={{ marginTop: '1rem', color: "black" }}>The Pop-up</h3> */}
                        {/* <p style={{ color: "black" }}>
                            Edit a pop-up to display exclusively to your selected audience.
                        </p> */}
                        {/* <hr />s */}
                        <div className="container-fluid rounded-3"> 
                        <Card className='border-0'>
                            <CardBody>
                                <div className="row match-height px-0">

                                    <style>
                                        {`
                                            .ql-editor {
                                                overflow: visible
                                            }
                                        `}
                                    </style>

                                {/* Preview */}

                                    <div className="col-md-9 rounded-3">
                                        <div className="d-flex rounded-pill mb-2" style={{gap: "40px"}}>
                                            {finalObj?.[`${mobileCondition}pages`]?.map((ele, key) => {
                                                return (
                                                    <div key={key} className={`cursor-pointer btn rounded-pill ${currPage === ele.id ? "bg-white" : "text-black"} gap-1`} style={{ transition: "0.3s ease", padding: "0.5rem 4rem", fontSize: "12.5px", boxShadow: `${ currPage === ele.id ?  "0px 0px 10px rgba(0,0,0,0.5)" : ""}` }} onClick={() => {
                                                        if (finalObj?.verificationEnabled || ele?.id !== "user_verification") {
                                                            setCurrPage(ele?.id)
                                                            // setSideNav("add-elements")
                                                            const pageIndex = finalObj?.[`${mobileCondition}pages`]?.findIndex($ => $?.id === ele.id)
                                                            setcolWise([...finalObj?.[`${mobileCondition}pages`][pageIndex]?.values])
                                                            // setPopPosition(finalObj?.positions?.[`${mobileCondition}main`])
                                                            setIndexes(({ cur: 0, curElem: "left", subElem: "grandparent" }))
                                                            setCurrPosition({ ...currPosition, selectedType: "navMenuStyles" })
                                                            setFinalObj({ ...finalObj, backgroundStyles: { ...finalObj?.backgroundStyles, [`${mobileCondition}main`]: bgStyles } })
                                                            setActiveSect(ele.id === "offers" ? "image" : "text")
                                                        }
                                                    }}>{ele.pageName}</div>
                                                )
                                            })}
                                            <div className={`cursor-pointer btn rounded-pill ${currPage === "button" ? "bg-white" : "text-black"} gap-1`} style={{ transition: "0.3s ease", padding: "0.5rem 4rem", fontSize: "12.5px", boxShadow: `${ currPage === "button" ?  "0px 0px 10px rgba(0,0,0,0.5)" : ""}` }} onClick={() => {
                                                if (finalObj?.teaserEnabled) {
                                                    setCurrPage("button")
                                                    setSideNav(sideNav === "display" ? "display" : "button")
                                                    setcolWise([...finalObj?.button])
                                                    setPopPosition(finalObj?.positions?.button)
                                                    setCurrPosition({ ...currPosition, selectedType: "navMenuStyles" })
                                                    setActiveSect("text")
                                                }
                                            }}>Button</div>
                                        </div>
                                        <div id="customization" className='d-flex justify-content-center align-items-center position-relative mt-2'>
                                            {/* <div style={{ scale: '0.55', filter: 'drop-shadow(0px 0px 15px rgba(0,0,0,0.5))'}}> */}
                                            <div className="position-relative scroll-custom d-flex justify-content-center align-items-center" style={{ height: "45vh", maxHeight: '45vh', backgroundImage: `url("https://miro.medium.com/v2/resize:fit:678/1*ZPvzUShTe448VPDukHiskw.png")`, overflow: 'hidden' }}>
                                                <div style={{ scale: "0.6" }}>
                                                    {/* {
                                                selectedThemeNo === 3 ? <Theme1 themes={allThemes} setOpenSection={setActiveSect} /> : <Theme4 themes={allThemes} setOpenSection={setActiveSect} />
                                            } */}
                                                    <div style={{ position: "relative", width: bgStyles?.width, maxWidth: bgStyles?.maxWidth, maxHeight: "100%", minHeight: bgStyles?.minHeight, marginTop: bgStyles?.marginTop, marginRight: bgStyles?.marginRight, marginBottom: bgStyles?.marginBottom, marginLeft: bgStyles?.marginLeft }}>
                                                        <X size={crossStyle?.width} height={crossStyle?.height} color={crossStyle?.color} style={{ position: "absolute", inset: "0px 0px auto auto", zIndex: "350", backgroundColor: crossStyle?.backgroundColor, borderRadius: crossStyle?.borderRadius, padding: `3px`, marginBottom: crossStyle?.marginBottom, transform: `translateX(${crossStyle?.translateX}) translateY(${crossStyle?.translateY})` }} onClick={(e) => {
                                                            e.stopPropagation()
                                                            setCurrPosition({ ...currPosition, selectedType: "cross" })
                                                        }} />
                                                        <div id="dropZoneParent" onClick={(e) => {
                                                            e.stopPropagation()
                                                            setCurrPosition({ ...currPosition, selectedType: "main" })
                                                        }} onDragOver={(e) => {
                                                            handleDragOver(e)
                                                        }}
                                                            onDrop={(e) => {
                                                                const transferType = e.dataTransfer.getData("type")
                                                                if (transferType !== "") {
                                                                    handleLayoutDrop(e)
                                                                    setIndexes(transferType.includes("col") ? { cur: colWise.length, curElem: "parent", subElem: "grandparent" } : { cur: colWise.length, curElem: "left", subElem: 0 })
                                                                    setCurrPosition({ ...currPosition, id: colWise.length, selectedType: transferType.includes("col") ? "block" : transferType })
                                                                    setValues(elementStyles[transferType.includes("col") ? "block" : transferType])
                                                                }
                                                            }} className="pop-up" style={{ position: 'relative', zIndex: '300', overflow: "visible", ...bgStyles, backgroundColor: bgStyles?.backgroundColor, backgroundImage: bgStyles?.backgroundImage, width: "100%", maxWidth: "100%", marginTop: "0px", marginRight: "0px", marginBottom: "0px", marginLeft: "0px" }}>
                                                            <style>{`
                                                            .ql-editor {
                                                            padding: 0px !important;
                                                            text-align: center !important
                                                            }
                                                            #dropZoneParent::-webkit-scrollbar, .nav-sidebar::-webkit-scrollbar {
                                                                display: none;
                                                            }
                                                            #dropZoneParent p {
                                                                margin: 0px;
                                                            }
                                                        `}</style>

                                                            {
                                                                colWise?.map((cur, key) => {

                                                                    return <div style={{ ...cur?.style, display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }} key={key}
                                                                        onClick={(e) => {
                                                                            e.stopPropagation()
                                                                            makActive(e, cur, "parent", "parent", key, "parent", "parent")
                                                                            setCurrPosition({ ...currPosition, selectedType: "block" })
                                                                            setIndexes({ cur: key, curElem: "parent", subElem: "grandparent" })
                                                                            setValues(cur?.style)
                                                                            // setShowActive(!isEqual({ ...indexes }, { cur: key, curElem: "parent", subElem: "grandparent" }))
                                                                        }}
                                                                        onMouseEnter={(e) => {
                                                                            e.stopPropagation()
                                                                            setMouseEnterIndex({ cur: key, curElem: "parent", subElem: "grandparent" })
                                                                        }}
                                                                        onMouseLeave={(e) => {
                                                                            e.stopPropagation()
                                                                            setMouseEnterIndex({ cur: false, curElem: false, subElem: false })
                                                                        }}
                                                                        id={`${currPage}-${key}-parent-grandparent`}
                                                                        className={`${isEqual({ cur: key, curElem: "parent", subElem: "grandparent" }, { ...indexes }) ? "active-elem" : ""}`}
                                                                    >
                                                                        {isEqual({ ...mouseEnterIndex }, { cur: key, curElem: "parent", subElem: "grandparent" }) && <div className="position-absolute" style={{ inset: "0px", outline: "2px solid #727272", pointerEvents: "none", zIndex: "999999999999999999999999999", backgroundColor: "rgba(115,103,240,0.5)" }}></div>}
                                                                        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "center", alignItems: "stretch", position: "relative", width: "100%", zIndex: "1" }}
                                                                        >
                                                                            {
                                                                                cur?.elements?.map((curElem, i) => {
                                                                                    return (
                                                                                        <div style={{ ...curElem?.style, position: "relative", width: isMobile ? "100%" : curElem?.style?.width }} onClick={(e) => {
                                                                                            e.stopPropagation()
                                                                                            // setActiveRow("none")
                                                                                            makActive(e, cur, curElem, curElem?.positionType, key, i, "parent")
                                                                                            setCurrPosition({ ...currPosition, selectedType: "column" })
                                                                                            setIndexes({ cur: key, curElem: curElem?.positionType, subElem: "parent" })
                                                                                            setValues(curElem?.style)
                                                                                        }}
                                                                                            onMouseEnter={(e) => {
                                                                                                e.stopPropagation()
                                                                                                setMouseEnterIndex({ cur: key, curElem: curElem?.positionType, subElem: "parent" })
                                                                                            }}
                                                                                            onMouseLeave={(e) => {
                                                                                                e.stopPropagation()
                                                                                                setMouseEnterIndex({ cur: false, curElem: false, subElem: false })
                                                                                            }}
                                                                                            onDrop={e => {
                                                                                                e.stopPropagation()
                                                                                                handleColDrop(e, key, curElem?.positionType, curElem?.element?.length, i)
                                                                                                const transferType = e.dataTransfer.getData("type")
                                                                                                setCurrPosition({ ...currPosition, j: curElem?.element?.length, selectedType: transferType })
                                                                                            }}
                                                                                            id={`${currPage}-${key}-${curElem.positionType}-parent`}
                                                                                            className={`${isEqual({ cur: key, curElem: curElem.positionType, subElem: "parent" }, { ...indexes }) ? "active-elem" : ""}`}>
                                                                                            {isEqual({ ...mouseEnterIndex }, { cur: key, curElem: curElem?.positionType, subElem: "parent" }) && <div className="position-absolute" style={{ inset: "0px", outline: "2px solid #727272", pointerEvents: "none", zIndex: "999999999999999999999999999", backgroundColor: "rgba(115,103,240,0.5)" }}></div>}
                                                                                            {curElem?.element?.map((subElem, j) => {
                                                                                                switch (subElem?.type) {
                                                                                                    case 'text':
                                                                                                        // return <span contentEditable="true" className="text-secondary p-1 rounded-2 " style={{ fontSize: '14.4px', border: '1px solid black' }} onClick={(e) => makActive(e, cur)} >Text Element</span>
                                                                                                        return (
                                                                                                            <div id={`${currPage}-${key}-${curElem?.positionType}-${j}`} draggable={!isEqual({ cur: key, curElem: curElem?.positionType, subElem: j }, { ...indexes })} onDragStart={(e) => {
                                                                                                                e.stopPropagation()
                                                                                                                e.dataTransfer.setData("type", "rearrange_text")
                                                                                                                setTransfered("rearrange_text")
                                                                                                                setIndexes({ cur: key, curElem: curElem.positionType, subElem: j })
                                                                                                                setDragStartIndex({ cur: key, curElem: curElem.positionType, subElem: j })
                                                                                                            }} style={{ ...subElem?.style, width: "100%", position: "relative", display: "flex", justifyContent: "center", alignItems: "center", fontFamily: subElem?.isInitialFont ? finalObj?.fontFamilies?.[subElem.textType] : subElem?.style?.fontFamily, zIndex: isEqual({ ...indexes }, { cur: key, curElem: curElem.positionType, subElem: j }) ? "2" : "1" }}
                                                                                                                onClick={e => {
                                                                                                                    e.stopPropagation()
                                                                                                                    makActive(e, cur, curElem, curElem?.positionType, key, i, j)
                                                                                                                    setCurrPosition({ ...currPosition, selectedType: "text" })
                                                                                                                    setIndexes({ cur: key, curElem: curElem.positionType, subElem: j })
                                                                                                                    setValues(subElem?.style)
                                                                                                                    setDisplayEditor({ textEditor: true, imageEditor: false })
                                                                                                                    console.log("cur", cur, indexes)
                                                                                                                }}
                                                                                                                onDrop={e => {
                                                                                                                    e.stopPropagation()
                                                                                                                    const transferType = e.dataTransfer.getData("type")
                                                                                                                    if (!transferType.includes("rearrange")) {
                                                                                                                        handleColDrop(e, key, curElem.positionType, j + 1, i)
                                                                                                                        setCurrPosition({ ...currPosition, j: j + 1, selectedType: transferType })
                                                                                                                    } else {
                                                                                                                        handleRearrangeElement(e, { cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                    }
                                                                                                                }}
                                                                                                                onMouseEnter={(e) => {
                                                                                                                    e.stopPropagation()
                                                                                                                    setMouseEnterIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                }}
                                                                                                                onMouseLeave={(e) => {
                                                                                                                    e.stopPropagation()
                                                                                                                    setMouseEnterIndex({ cur: false, curElem: false, subElem: false })
                                                                                                                }}
                                                                                                                onDragOver={e => {
                                                                                                                    e.preventDefault()
                                                                                                                    e.stopPropagation()
                                                                                                                    setDragOverIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                    setMousePos({ ...mousePos, y: e.clientY, x: e.clientX })
                                                                                                                }}
                                                                                                                className={`${isEqual({ cur: key, curElem: curElem?.positionType, subElem: j }, { ...indexes }) ? "active-elem" : ""}`}>
                                                                                                                {isEqual({ ...mouseEnterIndex }, { cur: key, curElem: curElem?.positionType, subElem: j }) && <div className="position-absolute" style={{ inset: "0px", outline: "2px solid #727272", pointerEvents: "none", zIndex: "999999999999999999999999999", backgroundColor: "rgba(115,103,240,0.5)" }}></div>}
                                                                                                                {/* <div style={{ width: "100%" }} id={`textField-${key}-${curElem?.positionType}-${j}`} className="text-field" dangerouslySetInnerHTML={{ __html: subElem?.textValue }} /> */}
                                                                                                                <div style={{ width: "100%" }} id={`textField-${key}-${curElem?.positionType}-${j}`} className="text-field" >
                                                                                                                    <Editor style={{ ...subElem?.style, width: "100%", position: "relative", display: "flex", justifyContent: "center", alignItems: "center", fontFamily: subElem?.isInitialFont ? finalObj?.fontFamilies?.[subElem.textType] : subElem?.style?.fontFamily }} hideToolbar={!isEqual({ ...indexes }, { cur: key, curElem: curElem.positionType, subElem: j })} onChange={(content, editorState) => {
                                                                                                                        const dupText = [...colWise]
                                                                                                                        dupText[key].elements[colWise[key].elements.findIndex($ => $?.positionType === curElem.positionType)].element[j].textValue = content
                                                                                                                        dupText[key].elements[colWise[key].elements.findIndex($ => $?.positionType === curElem.positionType)].element[j].editorState = editorState
                                                                                                                        setcolWise(dupText)
                                                                                                                    }}
                                                                                                                        htmlContent={subElem?.textValue}
                                                                                                                        editorState={subElem?.editorState || `{"root":{"children":[{"children":[{"detail":0,"format":1,"mode":"normal","style":"font-family: Montserrat;font-weight: 100;font-size: 12px;","text":"Enter text","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`}
                                                                                                                    />
                                                                                                                </div>
                                                                                                                {/* <ReactQuill
                                                                                                                    id={`textField-${key}-${curElem.positionType}-${j}`}
                                                                                                                    style={{ width: '100%', color: "black", zIndex: "5" }}
                                                                                                                    theme='bubble'
                                                                                                                    // defaultValue={"Enter Text"}
                                                                                                                    value={subElem.textValue}
                                                                                                                    onChange={e => {
                                                                                                                        const dupText = [...colWise]
                                                                                                                        dupText[key].elements[i].element[j].textValue = e
                                                                                                                        setcolWise(dupText)
                                                                                                                    }}
                                                                                                                    modules={{
                                                                                                                        toolbar: [
                                                                                                                            [{ header: [1, 2, 3, 4, false] }],
                                                                                                                            ['bold', 'italic', 'underline'],
                                                                                                                            [{ size: [] }],
                                                                                                                            ['align', 'strike'],
                                                                                                                            [{ color: [] }],
                                                                                                                            [{ list: 'ordered' }, { list: 'bullet' }]
                                                                                                                        ]
                                                                                                                    }}
                                                                                                                    formats={[
                                                                                                                        'header',
                                                                                                                        'bold',
                                                                                                                        'italic',
                                                                                                                        'underline',
                                                                                                                        'size',
                                                                                                                        'align',
                                                                                                                        'strike',
                                                                                                                        'blockquote',
                                                                                                                        'color',
                                                                                                                        'list',
                                                                                                                        'bullet'
                                                                                                                    ]} /> */}
                                                                                                                {/* <SunEditor
                                                                                                                    setOptions={SunEditorConfig}
                                                                                                                    id={`textField-${key}-${curElem.positionType}-${j}`}
                                                                                                                    value={subElem.textValue || ''}
                                                                                                                    onChange={(content) => {
                                                                                                                        const dupText = [...colWise]
                                                                                                                        dupText[key].elements[i].element[j].textValue = content
                                                                                                                        setcolWise(dupText)
                                                                                                                    }}
                                                                                                                /> */}
                                                                                                            </div>
                                                                                                        )
                                                                                                    case 'image':
                                                                                                        // const imageSelector = document.getElementById("hidden-image-input")
                                                                                                        if (subElem.src !== "") {
                                                                                                            return (
                                                                                                                <div id={`${currPage}-${key}-${curElem?.positionType}-${j}`} draggable style={{ width: "100%", ...subElem?.style, position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}
                                                                                                                    onDragStart={e => {
                                                                                                                        e.stopPropagation()
                                                                                                                        e.dataTransfer.setData("type", "rearrange_image")
                                                                                                                        setTransfered("rearrange_image")
                                                                                                                        setIndexes({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                        setDragStartIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                    }}
                                                                                                                    onMouseEnter={(e) => {
                                                                                                                        e.stopPropagation()
                                                                                                                        setMouseEnterIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                    }}
                                                                                                                    onMouseLeave={(e) => {
                                                                                                                        e.stopPropagation()
                                                                                                                        setMouseEnterIndex({ cur: false, curElem: false, subElem: false })
                                                                                                                    }}
                                                                                                                    onClick={e => {
                                                                                                                        e.stopPropagation()
                                                                                                                        makActive(e, cur, curElem, curElem?.positionType, key, i, j)
                                                                                                                        setCurrPosition({ ...currPosition, selectedType: "image" })
                                                                                                                        setIndexes({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                        setValues(subElem?.style)
                                                                                                                        setDisplayEditor({ textEditor: false, imageEditor: true })
                                                                                                                    }}
                                                                                                                    onDrop={e => {
                                                                                                                        e.stopPropagation()
                                                                                                                        const transferType = e.dataTransfer.getData("type")
                                                                                                                        if (!transferType.includes("rearrange")) {
                                                                                                                            handleColDrop(e, key, curElem?.positionType, j + 1, i)
                                                                                                                            setCurrPosition({ ...currPosition, j: j + 1, selectedType: transferType })
                                                                                                                        } else {
                                                                                                                            handleRearrangeElement(e, { cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                        }
                                                                                                                    }}
                                                                                                                    onDragOver={e => {
                                                                                                                        e.preventDefault()
                                                                                                                        e.stopPropagation()
                                                                                                                        setDragOverIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                        setMousePos({ ...mousePos, y: e.clientY })
                                                                                                                    }}
                                                                                                                    className={`${isEqual({ cur: key, curElem: curElem?.positionType, subElem: j }, { ...indexes }) ? "active-elem" : ""}`}>
                                                                                                                    {isEqual({ ...mouseEnterIndex }, { cur: key, curElem: curElem?.positionType, subElem: j }) && <div className="position-absolute" style={{ inset: "0px", outline: "2px solid #727272", pointerEvents: "none", zIndex: "999999999999999999999999999", backgroundColor: "rgba(115,103,240,0.5)" }}></div>}
                                                                                                                    <img
                                                                                                                        className="img-fluid"
                                                                                                                        src={subElem.src}
                                                                                                                        alt={`Selected Image ${i}`}
                                                                                                                        style={{ width: "100%" }}
                                                                                                                    />
                                                                                                                </div>
                                                                                                            )
                                                                                                        } else {
                                                                                                            setCurrPosition({ ...currPosition, j })
                                                                                                            // imageSelector.click()
                                                                                                            triggerImage()
                                                                                                            const dupArray = [...colWise]
                                                                                                            dupArray[key].elements[i].element[j].src = "http://www.palmares.lemondeduchiffre.fr/images/joomlart/demo/default.jpg"
                                                                                                            setcolWise([...dupArray])
                                                                                                        }
                                                                                                    case 'button':
                                                                                                        return (
                                                                                                            <div id={`${currPage}-${key}-${curElem?.positionType}-${j}`} draggable style={{ width: "100%", display: "flex", justifyContent: subElem?.style?.alignType, position: "relative", display: "flex", alignItems: "center" }}
                                                                                                                onDragStart={e => {
                                                                                                                    e.stopPropagation()
                                                                                                                    e.dataTransfer.setData("type", "rearrange_button")
                                                                                                                    setTransfered("rearrange_button")
                                                                                                                    setIndexes({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                    setDragStartIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                }}
                                                                                                                onClick={e => {
                                                                                                                    e.stopPropagation()
                                                                                                                    makActive(e, cur, curElem, curElem?.positionType, key, i, j)
                                                                                                                    setCurrPosition({ ...currPosition, selectedType: "button" })
                                                                                                                    setIndexes({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                    setValues(subElem?.style)
                                                                                                                }}
                                                                                                                onDrop={e => {
                                                                                                                    e.stopPropagation()
                                                                                                                    const transferType = e.dataTransfer.getData("type")
                                                                                                                    if (!transferType.includes("rearrange")) {
                                                                                                                        handleColDrop(e, key, curElem?.positionType, j + 1, i)
                                                                                                                        setCurrPosition({ ...currPosition, j: j + 1, selectedType: transferType })
                                                                                                                    } else {
                                                                                                                        handleRearrangeElement(e, { cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                    }
                                                                                                                }}
                                                                                                                onMouseEnter={(e) => {
                                                                                                                    e.stopPropagation()
                                                                                                                    setMouseEnterIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                }}
                                                                                                                onMouseLeave={(e) => {
                                                                                                                    e.stopPropagation()
                                                                                                                    setMouseEnterIndex({ cur: false, curElem: false, subElem: false })
                                                                                                                }}
                                                                                                                onDragOver={e => {
                                                                                                                    e.preventDefault()
                                                                                                                    e.stopPropagation()
                                                                                                                    setDragOverIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                    setMousePos({ ...mousePos, y: e.clientY })
                                                                                                                }}
                                                                                                                className={`${isEqual({ cur: key, curElem: curElem?.positionType, subElem: j }, { ...indexes }) ? "active-elem" : ""}`}>
                                                                                                                {isEqual({ ...mouseEnterIndex }, { cur: key, curElem: curElem?.positionType, subElem: j }) && <div className="position-absolute" style={{ inset: "0px", outline: "2px solid #727272", pointerEvents: "none", zIndex: "999999999999999999999999999", backgroundColor: "rgba(115,103,240,0.5)" }}></div>}
                                                                                                                <div style={{ ...subElem?.style, height: Number(subElem?.style?.height) === 0 ? "auto" : `${subElem?.style?.height}px`, display: "inline-flex", justifyContent: "center", alignItems: "center", fontFamily: subElem?.isInitialFont ? finalObj?.fontFamilies?.[subElem.textType] : subElem?.style?.fontFamily }} >
                                                                                                                    <span onDragStart={e => e.stopPropagation()} id={`textField-${key}-${curElem?.positionType}-${j}`}>
                                                                                                                        {/* <ReactQuill
                                                                                                                    id={`textField-${key}-${curElem.positionType}-${j}`}
                                                                                                                    style={{ width: '100%', color: "black", zIndex: "5" }}
                                                                                                                    theme='bubble'
                                                                                                                    // defaultValue={"Enter Text"}
                                                                                                                    value={subElem.textValue}
                                                                                                                    onChange={e => {
                                                                                                                        const dupText = [...colWise]
                                                                                                                        dupText[key].elements[i].element[j].textValue = e
                                                                                                                        setcolWise(dupText)
                                                                                                                    }}
                                                                                                                    modules={{
                                                                                                                        toolbar: [
                                                                                                                            [{ header: [1, 2, 3, 4, false] }],
                                                                                                                            ['bold', 'italic', 'underline'],
                                                                                                                            [{ size: [] }],
                                                                                                                            ['align', 'strike'],
                                                                                                                            [{ color: [] }],
                                                                                                                            [{ list: 'ordered' }, { list: 'bullet' }]
                                                                                                                        ]
                                                                                                                    }}
                                                                                                                    formats={[
                                                                                                                        'header',
                                                                                                                        'bold',
                                                                                                                        'italic',
                                                                                                                        'underline',
                                                                                                                        'size',
                                                                                                                        'align',
                                                                                                                        'strike',
                                                                                                                        'blockquote',
                                                                                                                        'color',
                                                                                                                        'list',
                                                                                                                        'bullet'
                                                                                                                    ]} /> */}
                                                                                                                        {/* <SunEditor
                                                                                                                        setOptions={SunEditorConfig}
                                                                                                                        
                                                                                                                        value={subElem.textValue || ''}
                                                                                                                        onChange={(content) => {
                                                                                                                            const dupText = [...colWise]
                                                                                                                            dupText[key].elements[i].element[j].textValue = content
                                                                                                                            setcolWise(dupText)
                                                                                                                        }}
                                                                                                                    /> */}
                                                                                                                        <div className="text-field" dangerouslySetInnerHTML={{ __html: subElem?.textValue }} />
                                                                                                                    </span>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        )
                                                                                                    case 'input':
                                                                                                        return (
                                                                                                            <div id={`${currPage}-${key}-${curElem?.positionType}-${j}`} draggable style={{ width: "100%", display: "flex", justifyContent: subElem?.style?.alignType, position: "relative", alignItems: "center" }}
                                                                                                                onDragStart={e => {
                                                                                                                    e.stopPropagation()
                                                                                                                    e.dataTransfer.setData("type", "rearrange_input")
                                                                                                                    setTransfered("rearrange_input")
                                                                                                                    setIndexes({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                    setDragStartIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                }}
                                                                                                                onClick={e => {
                                                                                                                    e.stopPropagation()
                                                                                                                    makActive(e, cur, curElem, curElem?.positionType, key, i, j)
                                                                                                                    setCurrPosition({ ...currPosition, selectedType: "input" })
                                                                                                                    setIndexes({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                    setValues(subElem.style)
                                                                                                                    console.log("input clicked")
                                                                                                                }}
                                                                                                                onDrop={e => {
                                                                                                                    e.stopPropagation()
                                                                                                                    const transferType = e.dataTransfer.getData("type")
                                                                                                                    if (!transferType.includes("rearrange")) {
                                                                                                                        handleColDrop(e, key, curElem?.positionType, j + 1, i)
                                                                                                                        setCurrPosition({ ...currPosition, j: j + 1, selectedType: transferType })
                                                                                                                    } else {
                                                                                                                        handleRearrangeElement(e, { cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                    }
                                                                                                                }}
                                                                                                                onMouseEnter={(e) => {
                                                                                                                    e.stopPropagation()
                                                                                                                    setMouseEnterIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                }}
                                                                                                                onMouseLeave={(e) => {
                                                                                                                    e.stopPropagation()
                                                                                                                    setMouseEnterIndex({ cur: false, curElem: false, subElem: false })
                                                                                                                }}
                                                                                                                onDragOver={e => {
                                                                                                                    e.preventDefault()
                                                                                                                    e.stopPropagation()
                                                                                                                    setDragOverIndex({ cur: key, curElem: curElem?.positionType, subElem: j + 1 })
                                                                                                                    setMousePos({ ...mousePos, y: e.clientY })
                                                                                                                }}
                                                                                                                className={`${isEqual({ cur: key, curElem: curElem?.positionType, subElem: j }, { ...indexes }) ? "active-elem" : ""}`}>
                                                                                                                {isEqual({ ...mouseEnterIndex }, { cur: key, curElem: curElem?.positionType, subElem: j }) && <div className="position-absolute" style={{ inset: "0px", outline: "2px solid #727272", pointerEvents: "none", zIndex: "999999999999999999999999999", backgroundColor: "rgba(115,103,240,0.5)" }}></div>}
                                                                                                                <div style={{ width: subElem?.style?.width }}>
                                                                                                                    {subElem?.hasLabel && (<label style={{ color: subElem?.style?.color, fontFamily: subElem?.style?.fontFamily }}>{subElem?.labelText}</label>)}
                                                                                                                    <input placeholder={subElem?.placeholder} type="text" style={{ ...subElem?.style, width: "100%" }} readOnly />
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        )
                                                                                                    case 'offer':
                                                                                                        return (

                                                                                                            <div
                                                                                                                onDragStart={e => {
                                                                                                                    e.stopPropagation()
                                                                                                                    e.dataTransfer.setData("type", "rearrange_offer")
                                                                                                                    setTransfered("rearrange_offer")
                                                                                                                    setIndexes({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                    setDragStartIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                }}
                                                                                                                onMouseEnter={(e) => {
                                                                                                                    e.stopPropagation()
                                                                                                                    setMouseEnterIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                }}
                                                                                                                onMouseLeave={(e) => {
                                                                                                                    e.stopPropagation()
                                                                                                                    setMouseEnterIndex({ cur: false, curElem: false, subElem: false })
                                                                                                                }}
                                                                                                                onClick={e => {
                                                                                                                    e.stopPropagation()
                                                                                                                    makActive(e, cur, curElem, curElem?.positionType, key, i, j)
                                                                                                                    setCurrPosition({ ...currPosition, selectedType: "offer" })
                                                                                                                    setIndexes({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                    setValues(subElem?.style)
                                                                                                                }}
                                                                                                                onDrop={e => {
                                                                                                                    e.stopPropagation()
                                                                                                                    const transferType = e.dataTransfer.getData("type")
                                                                                                                    if (!transferType.includes("rearrange")) {
                                                                                                                        handleColDrop(e, key, curElem?.positionType, j + 1, i)
                                                                                                                        setCurrPosition({ ...currPosition, j: j + 1, selectedType: transferType })
                                                                                                                    } else {
                                                                                                                        handleRearrangeElement(e, { cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                    }
                                                                                                                }}
                                                                                                                onDragOver={e => {
                                                                                                                    e.preventDefault()
                                                                                                                    e.stopPropagation()
                                                                                                                    setDragOverIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                    setMousePos({ ...mousePos, y: e.clientY })
                                                                                                                }} style={{ ...subElem?.style, ...bgOffer, position: "relative", fontFamily: subElem?.isInitialFont ? finalObj?.fontFamilies?.[subElem.textType] : subElem?.style?.fontFamily }}
                                                                                                                id={`${currPage}-${key}-${curElem.positionType}-${j}`}
                                                                                                                className={`${isEqual({ cur: key, curElem: curElem.positionType, subElem: j }, { ...indexes }) ? "active-elem" : ""}`}>
                                                                                                                {isEqual({ ...mouseEnterIndex }, { cur: key, curElem: curElem?.positionType, subElem: j }) && <div className="position-absolute" style={{ inset: "0px", outline: "2px solid #727272", pointerEvents: "none", zIndex: "999999999999999999999999999", backgroundColor: "rgba(115,103,240,0.5)" }}></div>}
                                                                                                                {gotOffers ? finalObj?.selectedOffers?.map((ele) => {
                                                                                                                    return (
                                                                                                                        <div style={{ margin: "10px 0px 20px" }}>
                                                                                                                            <div style={{
                                                                                                                                flexDirection: 'column',
                                                                                                                                justifyContent: 'center',
                                                                                                                                alignItems: 'center',
                                                                                                                                position: "relative"
                                                                                                                            }}>
                                                                                                                                <div style={{
                                                                                                                                    width: '100%',
                                                                                                                                    minHeight: '100%',
                                                                                                                                    justifyContent: 'center',
                                                                                                                                    // boxShadow: 'rgba(0, 0, 0, 0.125) 10px 2px 5px',
                                                                                                                                    filter: 'drop-shadow(rgba(0, 0, 0, 0.2) 0px 0px 10px',
                                                                                                                                    borderRadius: '10px',
                                                                                                                                    display: 'flex',
                                                                                                                                    position: "relative",
                                                                                                                                    backgroundColor: finalObj?.offerProperties?.colors?.primaryBg
                                                                                                                                }}>
                                                                                                                                    <div className='flex-grow-1 d-flex flex-column justify-content-between' style={{ padding: '15px' }}>
                                                                                                                                        <div style={{ text: 'wrap' }}>
                                                                                                                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', textTransform: 'uppercase' }}>
                                                                                                                                                <h2 style={{ fontWeight: 'bolder', fontSize: '0.9rem', color: finalObj?.offerProperties?.colors?.code }}>
                                                                                                                                                    {ele?.Code}
                                                                                                                                                </h2>
                                                                                                                                                {finalObj?.offerProperties?.showSections?.includes("description") && <span style={{ textTransform: 'lowercase', fontSize: '0.75rem', color: finalObj?.offerProperties?.colors?.description }}>
                                                                                                                                                    {ele?.Summary}
                                                                                                                                                </span>}
                                                                                                                                            </div>
                                                                                                                                        </div>
                                                                                                                                        {finalObj?.offerProperties?.showSections?.includes("validity") && <div>
                                                                                                                                            <div style={{ paddingTop: '0.5rem' }}>
                                                                                                                                                <span style={{ color: finalObj?.offerProperties?.colors?.validity, textTransform: 'uppercase', fontWeight: '500', fontSize: '0.65rem' }}>
                                                                                                                                                    valid until: {ele?.ValidityPeriod?.end ? moment(ele?.ValidityPeriod?.end).format('L') : "Never ending"}
                                                                                                                                                </span>
                                                                                                                                            </div>
                                                                                                                                        </div>}
                                                                                                                                    </div>
                                                                                                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: "0.5rem", padding: "0px 15px 15px" }}>
                                                                                                                                        <div style={{
                                                                                                                                            position: 'relative',
                                                                                                                                            display: 'flex',
                                                                                                                                            flexDirection: 'column',
                                                                                                                                            justifyContent: 'space-between',
                                                                                                                                            alignItems: 'center',
                                                                                                                                            backgroundColor: finalObj?.offerProperties?.colors?.secondaryBg,
                                                                                                                                            // filter: `hue-rotate(${i * (i + 20)}deg)`,
                                                                                                                                            padding: "1rem 0.25rem",
                                                                                                                                            borderRadius: "0px 0px 5px 5px"
                                                                                                                                        }}>
                                                                                                                                            <h1 style={{
                                                                                                                                                fontSize: '1.829rem',
                                                                                                                                                fontWeight: '750',
                                                                                                                                                fontFamily: 'Montserrat',
                                                                                                                                                color: finalObj?.offerProperties?.colors?.value
                                                                                                                                            }}>
                                                                                                                                                {
                                                                                                                                                    ele?.Type === "PERCENTAGE" ? (
                                                                                                                                                        `${Number(ele?.Value).toFixed(0)}%`
                                                                                                                                                    ) : `${userPermission?.currencySymbol}${Number(ele?.Value).toFixed(0)}`
                                                                                                                                                }
                                                                                                                                            </h1>
                                                                                                                                        </div>
                                                                                                                                        <div style={{
                                                                                                                                            display: 'flex',
                                                                                                                                            flexDirection: 'column',
                                                                                                                                            justifyContent: 'flex-end',
                                                                                                                                            alignItems: 'center'
                                                                                                                                        }}>
                                                                                                                                            <button type="button" style={{
                                                                                                                                                color: finalObj?.offerProperties?.colors?.button,
                                                                                                                                                // filter: `hue-rotate(${i * (i + 20)}deg)`,
                                                                                                                                                fontSize: '0.65rem',
                                                                                                                                                fontWeight: '700',
                                                                                                                                                cursor: 'pointer',
                                                                                                                                                border: `0.75px solid ${finalObj?.offerProperties?.colors?.button}`,
                                                                                                                                                borderRadius: '15px',
                                                                                                                                                padding: '0.195rem',
                                                                                                                                                backgroundColor: 'transparent',
                                                                                                                                                textTransform: 'uppercase',
                                                                                                                                                cursor: 'pointer'
                                                                                                                                            }}>
                                                                                                                                                <span >
                                                                                                                                                    Redeem
                                                                                                                                                </span>
                                                                                                                                            </button>
                                                                                                                                        </div>
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                                {finalObj?.offerProperties?.showSections?.includes("usage") && <div style={{
                                                                                                                                    width: 'auto',
                                                                                                                                    // margin: '-0.5rem auto',
                                                                                                                                    position: 'absolute',
                                                                                                                                    bottom: "0px",
                                                                                                                                    backgroundColor: 'white',
                                                                                                                                    textAlign: 'center',
                                                                                                                                    padding: '0.25rem 0.5rem',
                                                                                                                                    borderRadius: '10px',
                                                                                                                                    boxShadow: '0 4px 24px 0 rgba(34, 41, 47, 0.15)',
                                                                                                                                    transform: "translate(-50%, 50%)",
                                                                                                                                    left: "50%"
                                                                                                                                }}>
                                                                                                                                    <span style={{ textTransform: 'lowercase', fontSize: '0.75rem', color: finalObj.offerProperties.colors.usage, backgroundColor: finalObj.offerProperties.colors.primaryBg, fontWeight: '300', whiteSpace: "nowrap" }}>
                                                                                                                                        Used xyz times
                                                                                                                                    </span>
                                                                                                                                </div>}
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    )
                                                                                                                }) : (
                                                                                                                    <div className="d-flex justify-content-center align-items-center" style={{ inset: "0px", backgroundColor: "rgba(255,255,255,0.5)" }}>
                                                                                                                        <Spinner />
                                                                                                                    </div>
                                                                                                                )}
                                                                                                            </div>
                                                                                                        )
                                                                                                    default:
                                                                                                        return <div key={i} className='' style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", padding: "1rem" }}
                                                                                                            // onClick={(e) => makActive(e, cur)}
                                                                                                            onDragOver={(e) => {
                                                                                                                e.preventDefault()
                                                                                                                e.stopPropagation()
                                                                                                                makActive(e, cur, curElem, curElem?.positionType, key, i, j)
                                                                                                                handleDragOver(e)
                                                                                                                setDragOverIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                setIndexes({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                            }}
                                                                                                            onClick={(e) => {
                                                                                                                makActive(e, cur, curElem, curElem?.positionType, key, i, j)
                                                                                                            }}
                                                                                                            onDrop={(e) => {
                                                                                                                e.stopPropagation()
                                                                                                                makActive(e, cur, curElem, curElem?.positionType, key, i, j)
                                                                                                                handleElementDrop(e, curElem?.positionType, key, i, curElem, j)
                                                                                                            }}>
                                                                                                            <Download size={10} style={{ color: 'grey' }} />
                                                                                                            <p style={{ margin: '0px', fontSize: '10px', color: 'grey' }}>Drop an element here</p>
                                                                                                        </div>
                                                                                                }
                                                                                            })}
                                                                                        </div>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* </div> */}
                                        </div>
                                        <div className='mt-2 d-flex justify-content-between align-items-center'>
                                            <button disabled={currPageIndex === 0} onClick={() => {
                                                setCurrPage(currPage === "button" ? finalObj.pages[finalObj.pages.length - 1].id : finalObj.pages[currPageIndex - 1].id)
                                            }} className="btn custom-btn-outline">Previous</button>
                                            <button disabled={currPage === "button"} onClick={() => {
                                                setCurrPage(currPage === finalObj.pages[finalObj.pages.length - 1].id ? "button" : finalObj.pages[currPageIndex + 1].id)
                                            }} className="btn custom-btn-outline">Next</button>
                                        </div>
                                        <div className="bg-white d-none" style={{ zIndex: "50000000", borderRadius: "10px 10px 0px 0px", transition: "0.3s ease-in-out", maxWidth: "100%" }}>
                                            <div className="position-relative" style={{ width: "auto" }}>
                                                <span onClick={() => setOpenPage(!openPage)} className="position-absolute bg-white d-flex justify-content-center align-items-center cursor-pointer" style={{ top: "0px", left: "50%", transform: `translateX(-50%) translateY(-100%)`, padding: "0.25rem", aspectRatio: "30/9", width: "50px", borderRadius: "10px 10px 0px 0px" }}>
                                                    <ChevronUp style={{ rotate: openPage ? "-540deg" : "0deg", transition: "0.3s ease-in-out" }} size={12.5} color='#000000' />
                                                </span>
                                                <div id='page-selector' style={{ overflowX: "auto" }}>
                                                    <Swiper
                                                        breakpoints={{
                                                            0: {
                                                                slidesPerView: 1
                                                            },
                                                            980: {
                                                                slidesPerView: 2
                                                            },
                                                            1440: {
                                                                slidesPerView: 5
                                                            }
                                                        }}
                                                        spaceBetween={0}
                                                        navigation={true}
                                                        loop={false}
                                                        modules={[Pagination, Navigation]}
                                                        className="mySwiper"
                                                        initialSlide={0}>
                                                        {finalObj?.[`${mobileCondition}pages`]?.map((ele, key) => {
                                                            const elem = <div key={key} className="cursor-pointer pt-1">
                                                                <div onClick={() => {
                                                                    if (finalObj?.verificationEnabled || ele?.id !== "user_verification") {
                                                                        setCurrPage(ele?.id)
                                                                        // setSideNav("add-elements")
                                                                        const pageIndex = finalObj?.[`${mobileCondition}pages`]?.findIndex($ => $?.id === ele.id)
                                                                        setcolWise([...finalObj?.[`${mobileCondition}pages`][pageIndex]?.values])
                                                                        // setPopPosition(finalObj?.positions?.[`${mobileCondition}main`])
                                                                        setIndexes(({ cur: 0, curElem: "left", subElem: "grandparent" }))
                                                                        setCurrPosition({ ...currPosition, selectedType: "navMenuStyles" })
                                                                        setFinalObj({ ...finalObj, backgroundStyles: { ...finalObj?.backgroundStyles, [`${mobileCondition}main`]: bgStyles } })
                                                                    }
                                                                }} className={`rounded overflow-hidden d-flex justify-content-center align-items-center position-relative bg-light-secondary ${currPage === ele.id && openPage ? "border-dark" : ""} ${ele.id === "user_verification" && !finalObj.verificationEnabled ? "opacity-50" : ""} m-auto`} style={{ width: '150px', height: openPage ? "84px" : "0px", transition: "0.3s ease-in-out" }}>
                                                                    <div className="position-absolute" style={{ scale: "0.215", marginLeft: "10%", pointerEvents: "none", width: isMobile ? "325px" : "auto" }}>
                                                                        <div style={{ position: "relative", width: bgStyles.width, maxWidth: bgStyles.maxWidth, maxHeight: "100%", minHeight: bgStyles.minHeight }}>
                                                                            <span style={{ position: "absolute", inset: "0px 0px auto auto", zIndex: "350" }}><X size={18} /></span>
                                                                            <div id="dropZoneParent" className="pop-up" style={{ position: 'relative', zIndex: '300', overflow: "auto", backgroundColor: "white", ...bgStyles, backgroundImage: bgStyles?.backgroundImage, width: "100%", maxWidth: "100%" }}>
                                                                                <style>
                                                                                    {`
                                                            .ql-editor {
                                                            padding: 0px !important;
                                                            text-align: center !important
                                                            }
                                                            #dropZoneParent::-webkit-scrollbar, .nav-sidebar::-webkit-scrollbar {
                                                                display: none;
                                                            }
                                                        `}
                                                                                </style>
                                                                                {/* Render Layout Here */}
                                                                                {
                                                                                    ele.values?.map((cur, key) => {
                                                                                        return <div style={{ ...cur?.style, display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }} key={key}
                                                                                            onClick={(e) => {
                                                                                                e.stopPropagation()
                                                                                                makActive(e, cur, "parent", "parent", key, "parent", "parent")
                                                                                                setCurrPosition({ ...currPosition, selectedType: "block" })
                                                                                                setIndexes({ cur: key, curElem: "parent", subElem: "grandparent" })
                                                                                                setValues(cur?.style)
                                                                                                // setShowActive(!isEqual({ ...indexes }, { cur: key, curElem: "parent", subElem: "grandparent" }))
                                                                                            }}
                                                                                            onMouseEnter={(e) => {
                                                                                                e.stopPropagation()
                                                                                                setMouseEnterIndex({ cur: key, curElem: "parent", subElem: "grandparent" })
                                                                                            }}
                                                                                            onMouseLeave={(e) => {
                                                                                                e.stopPropagation()
                                                                                                setMouseEnterIndex({ cur: false, curElem: false, subElem: false })
                                                                                            }}
                                                                                            id={`${currPage}-${key}-parent-grandparent`}
                                                                                            className={`${isEqual({ cur: key, curElem: "parent", subElem: "grandparent" }, { ...indexes }) ? "active-elem" : ""}`}
                                                                                        >
                                                                                            <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "center", alignItems: "stretch", position: "relative", width: "100%", zIndex: "1" }}
                                                                                            >
                                                                                                {
                                                                                                    cur?.elements?.map((curElem, i) => {
                                                                                                        return (
                                                                                                            <div style={{ ...curElem?.style, position: "relative", width: isMobile ? "100%" : curElem?.style?.width }} onClick={(e) => {
                                                                                                                e.stopPropagation()
                                                                                                                // setActiveRow("none")
                                                                                                                makActive(e, cur, curElem, curElem?.positionType, key, i, "parent")
                                                                                                                setCurrPosition({ ...currPosition, selectedType: "column" })
                                                                                                                setIndexes({ cur: key, curElem: curElem?.positionType, subElem: "parent" })
                                                                                                                setValues(curElem?.style)
                                                                                                            }}
                                                                                                                onMouseEnter={(e) => {
                                                                                                                    e.stopPropagation()
                                                                                                                    setMouseEnterIndex({ cur: key, curElem: curElem?.positionType, subElem: "parent" })
                                                                                                                }}
                                                                                                                onMouseLeave={(e) => {
                                                                                                                    e.stopPropagation()
                                                                                                                    setMouseEnterIndex({ cur: false, curElem: false, subElem: false })
                                                                                                                }}
                                                                                                                onDrop={e => {
                                                                                                                    e.stopPropagation()
                                                                                                                    handleColDrop(e, key, curElem?.positionType, curElem?.element?.length, i)
                                                                                                                    const transferType = e.dataTransfer.getData("type")
                                                                                                                    setCurrPosition({ ...currPosition, j: curElem?.element?.length, selectedType: transferType })
                                                                                                                }}
                                                                                                                id={`${currPage}-${key}-${curElem.positionType}-parent`}
                                                                                                                className={`${isEqual({ cur: key, curElem: curElem.positionType, subElem: "parent" }, { ...indexes }) ? "active-elem" : ""}`}>
                                                                                                                {curElem?.element?.map((subElem, j) => {
                                                                                                                    switch (subElem?.type) {
                                                                                                                        case 'text':
                                                                                                                            // return <span contentEditable="true" className="text-secondary p-1 rounded-2 " style={{ fontSize: '14.4px', border: '1px solid black' }} onClick={(e) => makActive(e, cur)} >Text Element</span>
                                                                                                                            return (
                                                                                                                                <div id={`${currPage}-${key}-${curElem?.positionType}-${j}`} draggable={!isEqual({ cur: key, curElem: curElem?.positionType, subElem: j }, { ...indexes })} onDragStart={(e) => {
                                                                                                                                    e.stopPropagation()
                                                                                                                                    e.dataTransfer.setData("type", "rearrange_text")
                                                                                                                                    setTransfered("rearrange_text")
                                                                                                                                    setIndexes({ cur: key, curElem: curElem.positionType, subElem: j })
                                                                                                                                    setDragStartIndex({ cur: key, curElem: curElem.positionType, subElem: j })
                                                                                                                                }} style={{ ...subElem?.style, width: "100%", position: "relative", display: "flex", justifyContent: "center", alignItems: "center", fontFamily: subElem?.isInitialFont ? finalObj?.fontFamilies?.[subElem.textType] : subElem?.style?.fontFamily, zIndex: isEqual({ ...indexes }, { cur: key, curElem: curElem.positionType, subElem: j }) ? "2" : "1" }}
                                                                                                                                    onClick={e => {
                                                                                                                                        e.stopPropagation()
                                                                                                                                        makActive(e, cur, curElem, curElem?.positionType, key, i, j)
                                                                                                                                        setCurrPosition({ ...currPosition, selectedType: "text" })
                                                                                                                                        setIndexes({ cur: key, curElem: curElem.positionType, subElem: j })
                                                                                                                                        setValues(subElem?.style)
                                                                                                                                        setDisplayEditor({ textEditor: true, imageEditor: false })
                                                                                                                                    }}
                                                                                                                                    onDrop={e => {
                                                                                                                                        e.stopPropagation()
                                                                                                                                        const transferType = e.dataTransfer.getData("type")
                                                                                                                                        if (!transferType.includes("rearrange")) {
                                                                                                                                            handleColDrop(e, key, curElem.positionType, j + 1, i)
                                                                                                                                            setCurrPosition({ ...currPosition, j: j + 1, selectedType: transferType })
                                                                                                                                        } else {
                                                                                                                                            handleRearrangeElement(e, { cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                                        }
                                                                                                                                    }}
                                                                                                                                    onMouseEnter={(e) => {
                                                                                                                                        e.stopPropagation()
                                                                                                                                        setMouseEnterIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                                    }}
                                                                                                                                    onMouseLeave={(e) => {
                                                                                                                                        e.stopPropagation()
                                                                                                                                        setMouseEnterIndex({ cur: false, curElem: false, subElem: false })
                                                                                                                                    }}
                                                                                                                                    onDragOver={e => {
                                                                                                                                        e.preventDefault()
                                                                                                                                        e.stopPropagation()
                                                                                                                                        setDragOverIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                                        setMousePos({ ...mousePos, y: e.clientY, x: e.clientX })
                                                                                                                                    }}
                                                                                                                                    className={`${isEqual({ cur: key, curElem: curElem?.positionType, subElem: j }, { ...indexes }) ? "active-elem" : ""}`}>
                                                                                                                                    <div style={{ width: "100%" }} id={`textField-${key}-${curElem?.positionType}-${j}`} className="text-field" dangerouslySetInnerHTML={{ __html: subElem?.textValue }} />
                                                                                                                                    {/* <ReactQuill
                                                                                                                    id={`textField-${key}-${curElem.positionType}-${j}`}
                                                                                                                    style={{ width: '100%', color: "black", zIndex: "5" }}
                                                                                                                    theme='bubble'
                                                                                                                    // defaultValue={"Enter Text"}
                                                                                                                    value={subElem.textValue}
                                                                                                                    onChange={e => {
                                                                                                                        const dupText = [...colWise]
                                                                                                                        dupText[key].elements[i].element[j].textValue = e
                                                                                                                        setcolWise(dupText)
                                                                                                                    }}
                                                                                                                    modules={{
                                                                                                                        toolbar: [
                                                                                                                            [{ header: [1, 2, 3, 4, false] }],
                                                                                                                            ['bold', 'italic', 'underline'],
                                                                                                                            [{ size: [] }],
                                                                                                                            ['align', 'strike'],
                                                                                                                            [{ color: [] }],
                                                                                                                            [{ list: 'ordered' }, { list: 'bullet' }]
                                                                                                                        ]
                                                                                                                    }}
                                                                                                                    formats={[
                                                                                                                        'header',
                                                                                                                        'bold',
                                                                                                                        'italic',
                                                                                                                        'underline',
                                                                                                                        'size',
                                                                                                                        'align',
                                                                                                                        'strike',
                                                                                                                        'blockquote',
                                                                                                                        'color',
                                                                                                                        'list',
                                                                                                                        'bullet'
                                                                                                                    ]} /> */}
                                                                                                                                    {/* <SunEditor
                                                                                                                    setOptions={SunEditorConfig}
                                                                                                                    id={`textField-${key}-${curElem.positionType}-${j}`}
                                                                                                                    value={subElem.textValue || ''}
                                                                                                                    onChange={(content) => {
                                                                                                                        const dupText = [...colWise]
                                                                                                                        dupText[key].elements[i].element[j].textValue = content
                                                                                                                        setcolWise(dupText)
                                                                                                                    }}
                                                                                                                /> */}
                                                                                                                                </div>
                                                                                                                            )
                                                                                                                        case 'image':
                                                                                                                            // const imageSelector = document.getElementById("hidden-image-input")
                                                                                                                            if (subElem.src !== "") {
                                                                                                                                return (
                                                                                                                                    <div id={`${currPage}-${key}-${curElem?.positionType}-${j}`} draggable style={{ width: "100%", ...subElem?.style, position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}
                                                                                                                                        onDragStart={e => {
                                                                                                                                            e.stopPropagation()
                                                                                                                                            e.dataTransfer.setData("type", "rearrange_image")
                                                                                                                                            setTransfered("rearrange_image")
                                                                                                                                            setIndexes({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                                            setDragStartIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                                        }}
                                                                                                                                        onMouseEnter={(e) => {
                                                                                                                                            e.stopPropagation()
                                                                                                                                            setMouseEnterIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                                        }}
                                                                                                                                        onMouseLeave={(e) => {
                                                                                                                                            e.stopPropagation()
                                                                                                                                            setMouseEnterIndex({ cur: false, curElem: false, subElem: false })
                                                                                                                                        }}
                                                                                                                                        onClick={e => {
                                                                                                                                            e.stopPropagation()
                                                                                                                                            makActive(e, cur, curElem, curElem?.positionType, key, i, j)
                                                                                                                                            setCurrPosition({ ...currPosition, selectedType: "image" })
                                                                                                                                            setIndexes({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                                            setValues(subElem?.style)
                                                                                                                                            setDisplayEditor({ textEditor: false, imageEditor: true })
                                                                                                                                        }}
                                                                                                                                        onDrop={e => {
                                                                                                                                            e.stopPropagation()
                                                                                                                                            const transferType = e.dataTransfer.getData("type")
                                                                                                                                            if (!transferType.includes("rearrange")) {
                                                                                                                                                handleColDrop(e, key, curElem?.positionType, j + 1, i)
                                                                                                                                                setCurrPosition({ ...currPosition, j: j + 1, selectedType: transferType })
                                                                                                                                            } else {
                                                                                                                                                handleRearrangeElement(e, { cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                                            }
                                                                                                                                        }}
                                                                                                                                        onDragOver={e => {
                                                                                                                                            e.preventDefault()
                                                                                                                                            e.stopPropagation()
                                                                                                                                            setDragOverIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                                            setMousePos({ ...mousePos, y: e.clientY })
                                                                                                                                        }}
                                                                                                                                        className={`${isEqual({ cur: key, curElem: curElem?.positionType, subElem: j }, { ...indexes }) ? "active-elem" : ""}`}>
                                                                                                                                        <img
                                                                                                                                            className="img-fluid"
                                                                                                                                            src={subElem.src}
                                                                                                                                            alt={`Selected Image ${i}`}
                                                                                                                                            style={{ width: "100%" }}
                                                                                                                                        />
                                                                                                                                    </div>
                                                                                                                                )
                                                                                                                            } else {
                                                                                                                                setCurrPosition({ ...currPosition, j })
                                                                                                                                // imageSelector.click()
                                                                                                                                triggerImage()
                                                                                                                                const dupArray = [...colWise]
                                                                                                                                dupArray[key].elements[i].element[j].src = "http://www.palmares.lemondeduchiffre.fr/images/joomlart/demo/default.jpg"
                                                                                                                                setcolWise([...dupArray])
                                                                                                                            }
                                                                                                                        case 'button':
                                                                                                                            return (
                                                                                                                                <div id={`${currPage}-${key}-${curElem?.positionType}-${j}`} draggable style={{ width: "100%", display: "flex", justifyContent: subElem?.style?.alignType, position: "relative", display: "flex", alignItems: "center" }}
                                                                                                                                    onDragStart={e => {
                                                                                                                                        e.stopPropagation()
                                                                                                                                        e.dataTransfer.setData("type", "rearrange_button")
                                                                                                                                        setTransfered("rearrange_button")
                                                                                                                                        setIndexes({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                                        setDragStartIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                                    }}
                                                                                                                                    onClick={e => {
                                                                                                                                        e.stopPropagation()
                                                                                                                                        makActive(e, cur, curElem, curElem?.positionType, key, i, j)
                                                                                                                                        setCurrPosition({ ...currPosition, selectedType: "button" })
                                                                                                                                        setIndexes({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                                        setValues(subElem.style)
                                                                                                                                    }}
                                                                                                                                    onDrop={e => {
                                                                                                                                        e.stopPropagation()
                                                                                                                                        const transferType = e.dataTransfer.getData("type")
                                                                                                                                        if (!transferType.includes("rearrange")) {
                                                                                                                                            handleColDrop(e, key, curElem?.positionType, j + 1, i)
                                                                                                                                            setCurrPosition({ ...currPosition, j: j + 1, selectedType: transferType })
                                                                                                                                        } else {
                                                                                                                                            handleRearrangeElement(e, { cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                                        }
                                                                                                                                    }}
                                                                                                                                    onMouseEnter={(e) => {
                                                                                                                                        e.stopPropagation()
                                                                                                                                        setMouseEnterIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                                    }}
                                                                                                                                    onMouseLeave={(e) => {
                                                                                                                                        e.stopPropagation()
                                                                                                                                        setMouseEnterIndex({ cur: false, curElem: false, subElem: false })
                                                                                                                                    }}
                                                                                                                                    onDragOver={e => {
                                                                                                                                        e.preventDefault()
                                                                                                                                        e.stopPropagation()
                                                                                                                                        setDragOverIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                                        setMousePos({ ...mousePos, y: e.clientY })
                                                                                                                                    }}
                                                                                                                                    className={`${isEqual({ cur: key, curElem: curElem?.positionType, subElem: j }, { ...indexes }) ? "active-elem" : ""}`}>
                                                                                                                                    <div style={{ ...subElem?.style, height: Number(subElem?.style?.height) === 0 ? "auto" : `${subElem?.style?.height}px`, display: "inline-flex", justifyContent: "center", alignItems: "center", fontFamily: subElem?.isInitialFont ? finalObj?.fontFamilies?.[subElem.textType] : subElem?.style?.fontFamily }} >
                                                                                                                                        <span onDragStart={e => e.stopPropagation()} id={`textField-${key}-${curElem?.positionType}-${j}`}>
                                                                                                                                            {/* <ReactQuill
                                                                                                                    id={`textField-${key}-${curElem.positionType}-${j}`}
                                                                                                                    style={{ width: '100%', color: "black", zIndex: "5" }}
                                                                                                                    theme='bubble'
                                                                                                                    // defaultValue={"Enter Text"}
                                                                                                                    value={subElem.textValue}
                                                                                                                    onChange={e => {
                                                                                                                        const dupText = [...colWise]
                                                                                                                        dupText[key].elements[i].element[j].textValue = e
                                                                                                                        setcolWise(dupText)
                                                                                                                    }}
                                                                                                                    modules={{
                                                                                                                        toolbar: [
                                                                                                                            [{ header: [1, 2, 3, 4, false] }],
                                                                                                                            ['bold', 'italic', 'underline'],
                                                                                                                            [{ size: [] }],
                                                                                                                            ['align', 'strike'],
                                                                                                                            [{ color: [] }],
                                                                                                                            [{ list: 'ordered' }, { list: 'bullet' }]
                                                                                                                        ]
                                                                                                                    }}
                                                                                                                    formats={[
                                                                                                                        'header',
                                                                                                                        'bold',
                                                                                                                        'italic',
                                                                                                                        'underline',
                                                                                                                        'size',
                                                                                                                        'align',
                                                                                                                        'strike',
                                                                                                                        'blockquote',
                                                                                                                        'color',
                                                                                                                        'list',
                                                                                                                        'bullet'
                                                                                                                    ]} /> */}
                                                                                                                                            {/* <SunEditor
                                                                                                                        setOptions={SunEditorConfig}
                                                                                                                        
                                                                                                                        value={subElem.textValue || ''}
                                                                                                                        onChange={(content) => {
                                                                                                                            const dupText = [...colWise]
                                                                                                                            dupText[key].elements[i].element[j].textValue = content
                                                                                                                            setcolWise(dupText)
                                                                                                                        }}
                                                                                                                    /> */}
                                                                                                                                            <div className="text-field" dangerouslySetInnerHTML={{ __html: subElem?.textValue }} />
                                                                                                                                        </span>
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                            )
                                                                                                                        case 'input':
                                                                                                                            return (
                                                                                                                                <div id={`${currPage}-${key}-${curElem?.positionType}-${j}`} draggable style={{ width: "100%", display: "flex", justifyContent: subElem?.style?.alignType, position: "relative", alignItems: "center" }}
                                                                                                                                    onDragStart={e => {
                                                                                                                                        e.stopPropagation()
                                                                                                                                        e.dataTransfer.setData("type", "rearrange_input")
                                                                                                                                        setTransfered("rearrange_input")
                                                                                                                                        setIndexes({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                                        setDragStartIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                                    }}
                                                                                                                                    onClick={e => {
                                                                                                                                        e.stopPropagation()
                                                                                                                                        makActive(e, cur, curElem, curElem?.positionType, key, i, j)
                                                                                                                                        setCurrPosition({ ...currPosition, selectedType: "input" })
                                                                                                                                        setIndexes({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                                        setValues(subElem.style)
                                                                                                                                    }}
                                                                                                                                    onDrop={e => {
                                                                                                                                        e.stopPropagation()
                                                                                                                                        const transferType = e.dataTransfer.getData("type")
                                                                                                                                        if (!transferType.includes("rearrange")) {
                                                                                                                                            handleColDrop(e, key, curElem?.positionType, j + 1, i)
                                                                                                                                            setCurrPosition({ ...currPosition, j: j + 1, selectedType: transferType })
                                                                                                                                        } else {
                                                                                                                                            handleRearrangeElement(e, { cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                                        }
                                                                                                                                    }}
                                                                                                                                    onMouseEnter={(e) => {
                                                                                                                                        e.stopPropagation()
                                                                                                                                        setMouseEnterIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                                    }}
                                                                                                                                    onMouseLeave={(e) => {
                                                                                                                                        e.stopPropagation()
                                                                                                                                        setMouseEnterIndex({ cur: false, curElem: false, subElem: false })
                                                                                                                                    }}
                                                                                                                                    onDragOver={e => {
                                                                                                                                        e.preventDefault()
                                                                                                                                        e.stopPropagation()
                                                                                                                                        setDragOverIndex({ cur: key, curElem: curElem?.positionType, subElem: j + 1 })
                                                                                                                                        setMousePos({ ...mousePos, y: e.clientY })
                                                                                                                                    }}
                                                                                                                                    className={`${isEqual({ cur: key, curElem: curElem?.positionType, subElem: j }, { ...indexes }) ? "active-elem" : ""}`}>
                                                                                                                                    <div style={{ width: subElem?.style?.width }}>
                                                                                                                                        {subElem?.hasLabel && (<label style={{ color: subElem?.style?.color, fontFamily: subElem?.style?.fontFamily }}>{subElem?.labelText}</label>)}
                                                                                                                                        <input placeholder={subElem?.placeholder} type="text" style={{ ...subElem?.style, width: "100%" }} disabled />
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                            )
                                                                                                                        case 'offer':
                                                                                                                            return (

                                                                                                                                <div
                                                                                                                                    onDragStart={e => {
                                                                                                                                        e.stopPropagation()
                                                                                                                                        e.dataTransfer.setData("type", "rearrange_offer")
                                                                                                                                        setTransfered("rearrange_offer")
                                                                                                                                        setIndexes({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                                        setDragStartIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                                    }}
                                                                                                                                    onMouseEnter={(e) => {
                                                                                                                                        e.stopPropagation()
                                                                                                                                        setMouseEnterIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                                    }}
                                                                                                                                    onMouseLeave={(e) => {
                                                                                                                                        e.stopPropagation()
                                                                                                                                        setMouseEnterIndex({ cur: false, curElem: false, subElem: false })
                                                                                                                                    }}
                                                                                                                                    onClick={e => {
                                                                                                                                        e.stopPropagation()
                                                                                                                                        makActive(e, cur, curElem, curElem?.positionType, key, i, j)
                                                                                                                                        setCurrPosition({ ...currPosition, selectedType: "offer" })
                                                                                                                                        setIndexes({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                                        setValues(subElem?.style)
                                                                                                                                    }}
                                                                                                                                    onDrop={e => {
                                                                                                                                        e.stopPropagation()
                                                                                                                                        const transferType = e.dataTransfer.getData("type")
                                                                                                                                        if (!transferType.includes("rearrange")) {
                                                                                                                                            handleColDrop(e, key, curElem?.positionType, j + 1, i)
                                                                                                                                            setCurrPosition({ ...currPosition, j: j + 1, selectedType: transferType })
                                                                                                                                        } else {
                                                                                                                                            handleRearrangeElement(e, { cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                                        }
                                                                                                                                    }}
                                                                                                                                    onDragOver={e => {
                                                                                                                                        e.preventDefault()
                                                                                                                                        e.stopPropagation()
                                                                                                                                        setDragOverIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                                        setMousePos({ ...mousePos, y: e.clientY })
                                                                                                                                    }} style={{ ...subElem?.style, ...bgOffer, position: "relative", fontFamily: subElem?.isInitialFont ? finalObj?.fontFamilies?.[subElem.textType] : subElem?.style?.fontFamily }}
                                                                                                                                    id={`${currPage}-${key}-${curElem.positionType}-${j}`}
                                                                                                                                    className={`${isEqual({ cur: key, curElem: curElem.positionType, subElem: j }, { ...indexes }) ? "active-elem" : ""}`}>
                                                                                                                                    {gotOffers ? finalObj?.selectedOffers?.map((ele) => {
                                                                                                                                        return (
                                                                                                                                            <div style={{ margin: "10px 0px 20px" }}>
                                                                                                                                                <div style={{
                                                                                                                                                    flexDirection: 'column',
                                                                                                                                                    justifyContent: 'center',
                                                                                                                                                    alignItems: 'center',
                                                                                                                                                    position: "relative"
                                                                                                                                                }}>
                                                                                                                                                    <div style={{
                                                                                                                                                        width: '100%',
                                                                                                                                                        minHeight: '100%',
                                                                                                                                                        justifyContent: 'center',
                                                                                                                                                        // boxShadow: 'rgba(0, 0, 0, 0.125) 10px 2px 5px',
                                                                                                                                                        filter: 'drop-shadow(rgba(0, 0, 0, 0.2) 0px 0px 10px',
                                                                                                                                                        borderRadius: '10px',
                                                                                                                                                        display: 'flex',
                                                                                                                                                        position: "relative",
                                                                                                                                                        backgroundColor: finalObj?.offerProperties?.colors?.primaryBg
                                                                                                                                                    }}>
                                                                                                                                                        <div className='flex-grow-1 d-flex flex-column justify-content-between' style={{ padding: '15px' }}>
                                                                                                                                                            <div style={{ text: 'wrap' }}>
                                                                                                                                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', textTransform: 'uppercase' }}>
                                                                                                                                                                    <h2 style={{ fontWeight: 'bolder', fontSize: '0.9rem', color: finalObj?.offerProperties?.colors?.code }}>
                                                                                                                                                                        {ele?.Code}
                                                                                                                                                                    </h2>
                                                                                                                                                                    {finalObj?.offerProperties?.showSections?.includes("description") && <span style={{ textTransform: 'lowercase', fontSize: '0.75rem', color: finalObj?.offerProperties?.colors?.description }}>
                                                                                                                                                                        {ele?.Summary}
                                                                                                                                                                    </span>}
                                                                                                                                                                </div>
                                                                                                                                                            </div>
                                                                                                                                                            {finalObj?.offerProperties?.showSections?.includes("validity") && <div>
                                                                                                                                                                <div style={{ paddingTop: '0.5rem' }}>
                                                                                                                                                                    <span style={{ color: finalObj?.offerProperties?.colors?.validity, textTransform: 'uppercase', fontWeight: '500', fontSize: '0.65rem' }}>
                                                                                                                                                                        valid until: {ele?.ValidityPeriod?.end ? moment(ele?.ValidityPeriod?.end).format('L') : "Never ending"}
                                                                                                                                                                    </span>
                                                                                                                                                                </div>
                                                                                                                                                            </div>}
                                                                                                                                                        </div>
                                                                                                                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: "0.5rem", padding: "0px 15px 15px" }}>
                                                                                                                                                            <div style={{
                                                                                                                                                                position: 'relative',
                                                                                                                                                                display: 'flex',
                                                                                                                                                                flexDirection: 'column',
                                                                                                                                                                justifyContent: 'space-between',
                                                                                                                                                                alignItems: 'center',
                                                                                                                                                                backgroundColor: finalObj?.offerProperties?.colors?.secondaryBg,
                                                                                                                                                                // filter: `hue-rotate(${i * (i + 20)}deg)`,
                                                                                                                                                                padding: "1rem 0.25rem",
                                                                                                                                                                borderRadius: "0px 0px 5px 5px"
                                                                                                                                                            }}>
                                                                                                                                                                <h1 style={{
                                                                                                                                                                    fontSize: '1.829rem',
                                                                                                                                                                    fontWeight: '750',
                                                                                                                                                                    fontFamily: 'Montserrat',
                                                                                                                                                                    color: finalObj?.offerProperties?.colors?.value
                                                                                                                                                                }}>
                                                                                                                                                                    {
                                                                                                                                                                        ele?.Type === "PERCENTAGE" ? (
                                                                                                                                                                            `${Number(ele?.Value).toFixed(0)}%`
                                                                                                                                                                        ) : `${userPermission?.currencySymbol}${Number(ele?.Value).toFixed(0)}`
                                                                                                                                                                    }
                                                                                                                                                                </h1>
                                                                                                                                                            </div>
                                                                                                                                                            <div style={{
                                                                                                                                                                display: 'flex',
                                                                                                                                                                flexDirection: 'column',
                                                                                                                                                                justifyContent: 'flex-end',
                                                                                                                                                                alignItems: 'center'
                                                                                                                                                            }}>
                                                                                                                                                                <button type="button" style={{
                                                                                                                                                                    color: finalObj?.offerProperties?.colors?.button,
                                                                                                                                                                    // filter: `hue-rotate(${i * (i + 20)}deg)`,
                                                                                                                                                                    fontSize: '0.65rem',
                                                                                                                                                                    fontWeight: '700',
                                                                                                                                                                    cursor: 'pointer',
                                                                                                                                                                    border: `0.75px solid ${finalObj?.offerProperties?.colors?.button}`,
                                                                                                                                                                    borderRadius: '15px',
                                                                                                                                                                    padding: '0.195rem',
                                                                                                                                                                    backgroundColor: 'transparent',
                                                                                                                                                                    textTransform: 'uppercase',
                                                                                                                                                                    cursor: 'pointer'
                                                                                                                                                                }}>
                                                                                                                                                                    <span >
                                                                                                                                                                        Redeem
                                                                                                                                                                    </span>
                                                                                                                                                                </button>
                                                                                                                                                            </div>
                                                                                                                                                        </div>
                                                                                                                                                    </div>
                                                                                                                                                    {finalObj?.offerProperties?.showSections?.includes("usage") && <div style={{
                                                                                                                                                        width: 'auto',
                                                                                                                                                        // margin: '-0.5rem auto',
                                                                                                                                                        position: 'absolute',
                                                                                                                                                        bottom: "0px",
                                                                                                                                                        backgroundColor: 'white',
                                                                                                                                                        textAlign: 'center',
                                                                                                                                                        padding: '0.25rem 0.5rem',
                                                                                                                                                        borderRadius: '10px',
                                                                                                                                                        boxShadow: '0 4px 24px 0 rgba(34, 41, 47, 0.15)',
                                                                                                                                                        transform: "translate(-50%, 50%)",
                                                                                                                                                        left: "50%"
                                                                                                                                                    }}>
                                                                                                                                                        <span style={{ textTransform: 'lowercase', fontSize: '0.75rem', color: finalObj.offerProperties.colors.usage, backgroundColor: finalObj.offerProperties.colors.primaryBg, fontWeight: '300', whiteSpace: "nowrap" }}>
                                                                                                                                                            Used xyz times
                                                                                                                                                        </span>
                                                                                                                                                    </div>}
                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                        )
                                                                                                                                    }) : (
                                                                                                                                        <div className="d-flex justify-content-center align-items-center" style={{ inset: "0px", backgroundColor: "rgba(255,255,255,0.5)" }}>
                                                                                                                                            <Spinner />
                                                                                                                                        </div>
                                                                                                                                    )}
                                                                                                                                </div>
                                                                                                                            )
                                                                                                                        default:
                                                                                                                            return <div key={i} className='' style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", padding: "1rem" }}
                                                                                                                                // onClick={(e) => makActive(e, cur)}
                                                                                                                                onDragOver={(e) => {
                                                                                                                                    e.preventDefault()
                                                                                                                                    e.stopPropagation()
                                                                                                                                    makActive(e, cur, curElem, curElem?.positionType, key, i, j)
                                                                                                                                    handleDragOver(e)
                                                                                                                                    setDragOverIndex({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                                    setIndexes({ cur: key, curElem: curElem?.positionType, subElem: j })
                                                                                                                                }}
                                                                                                                                onClick={(e) => {
                                                                                                                                    makActive(e, cur, curElem, curElem?.positionType, key, i, j)
                                                                                                                                }}
                                                                                                                                onDrop={(e) => {
                                                                                                                                    e.stopPropagation()
                                                                                                                                    makActive(e, cur, curElem, curElem?.positionType, key, i, j)
                                                                                                                                    handleElementDrop(e, curElem?.positionType, key, i, curElem, j)
                                                                                                                                }}>
                                                                                                                                <Download size={10} style={{ color: 'grey' }} />
                                                                                                                                <p style={{ margin: '0px', fontSize: '10px', color: 'grey' }}>Drop an element here</p>
                                                                                                                            </div>
                                                                                                                    }
                                                                                                                })}
                                                                                                            </div>
                                                                                                        )
                                                                                                    })
                                                                                                }
                                                                                            </div>
                                                                                        </div>
                                                                                    })
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex justify-content-center align-items-center form-check form-switch form-check-dark p-0" style={{ gap: "0.0125rem" }}>
                                                                    <p onClick={() => {
                                                                        if (finalObj?.verificationEnabled || ele.id !== "user_verification") {
                                                                            setCurrPage(ele.id)
                                                                            // setSideNav("add-elements")
                                                                            const pageIndex = finalObj?.[`${mobileCondition}pages`]?.findIndex($ => $?.id === ele.id)
                                                                            setcolWise([...finalObj?.[`${mobileCondition}pages`][pageIndex]?.values])
                                                                            // setPopPosition(finalObj.positions[`${mobileCondition}main`])
                                                                            setIndexes(({ cur: 0, curElem: "left", subElem: "grandparent" }))
                                                                            setCurrPosition({ ...currPosition, selectedType: "navMenuStyles" })
                                                                            setFinalObj({ ...finalObj, backgroundStyles: { ...finalObj?.backgroundStyles, [`${mobileCondition}main`]: bgStyles } })
                                                                        }
                                                                    }} className={`text-center m-0 fw-bold ${currPage === ele?.id ? "text-black" : "dark"} ${ele?.id === "user_verification" && !finalObj?.verificationEnabled ? "opacity-50" : ""}`} style={{ fontSize: "12px", padding: "0.5rem" }}>{ele?.pageName}</p>
                                                                    {(ele.id === "user_verification") && <input checked={finalObj?.verificationEnabled} onChange={e => {
                                                                        if (!e.target.checked && (currPage === "user_verification")) {
                                                                            setCurrPage(finalObj?.[`${mobileCondition}pages`][0]?.id)
                                                                            setcolWise(finalObj?.[`${mobileCondition}pages`][0]?.values)
                                                                            // setPopPosition(finalObj?.positions?.[`${mobileCondition}main`])
                                                                            setCurrPosition({ ...currPosition, selectedType: "navMenuStyles" })
                                                                        }
                                                                        setFinalObj({ ...finalObj, verificationEnabled: e.target.checked })
                                                                    }} style={{ width: "30px", height: "15px" }} type="checkbox" className="form-check-input m-0 cursor-pointer" />}
                                                                </div>
                                                            </div>
                                                            return (
                                                                <SwiperSlide>{elem}</SwiperSlide>
                                                            )
                                                        })}
                                                        <SwiperSlide>
                                                            <div className='cursor-pointer pt-1'>
                                                                <div onClick={() => {
                                                                    if (finalObj?.teaserEnabled) {
                                                                        setCurrPage("button")
                                                                        setSideNav(sideNav === "display" ? "display" : "button")
                                                                        setcolWise([...finalObj?.button])
                                                                        setPopPosition(finalObj?.positions?.button)
                                                                        setCurrPosition({ ...currPosition, selectedType: "navMenuStyles" })
                                                                    }
                                                                }} className={`m-auto rounded overflow-hidden d-flex justify-content-center align-items-center ${finalObj?.teaserEnabled ? "" : "opacity-50"}`} style={{ width: '150px', height: openPage ? "84px" : "0px", transition: "0.3s ease-in-out", filter: `drop-shadow(0px 0px 3px ${currPage === "button" && openPage ? "#727272" : "rgba(0,0,0,1))"}` }}>
                                                                    <div className="position-absolute" style={{ scale: "0.5", pointerEvents: "none" }}>
                                                                        <div style={{ position: "relative", width: finalObj?.backgroundStyles?.[`${mobileCondition}button`]?.width, maxWidth: finalObj?.backgroundStyles?.[`${mobileCondition}button`]?.maxWidth, maxHeight: "100%", minHeight: finalObj?.backgroundStyles?.[`${mobileCondition}button`]?.minHeight }}>
                                                                            <span style={{ position: "absolute", inset: "0px 0px auto auto", zIndex: "350" }}><X size={18} /></span>
                                                                            <div id="dropZoneParent" className="pop-up" style={{ position: 'relative', zIndex: '300', overflow: "auto", backgroundColor: "white", ...finalObj?.backgroundStyles[`${mobileCondition}button`], backgroundImage: finalObj?.backgroundStyles[`${mobileCondition}button`]?.backgroundImage, width: "100%", maxWidth: "100%" }}>
                                                                                <style>
                                                                                    {`
                                                                        .ql-editor {
                                                                        padding: 0px !important;
                                                                        text-align: center !important
                                                                        }
                                                                        #dropZoneParent::-webkit-scrollbar, .nav-sidebar::-webkit-scrollbar {
                                                                            display: none;
                                                                        }
                                                                    `}
                                                                                </style>
                                                                                {/* Render Layout Here */}
                                                                                {
                                                                                    finalObj[`${mobileCondition}button`].map((cur, key2) => {
                                                                                        return <div style={{ ...cur?.style, backgroundImage: cur?.style?.backgroundImage, display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }} key={key2}>
                                                                                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative", width: "100%", zIndex: "1" }}
                                                                                            >
                                                                                                {
                                                                                                    cur?.elements?.map((curElem, i) => {
                                                                                                        return (
                                                                                                            <div style={{ ...curElem?.style, backgroundImage: curElem?.style?.backgroundImage, padding: "0.5rem" }}>
                                                                                                                {curElem?.element?.map((subElem, j) => {
                                                                                                                    switch (subElem?.type) {
                                                                                                                        case 'text':
                                                                                                                            // return <span contentEditable="true" className="text-secondary p-1 rounded-2 " style={{ fontSize: '14.4px', border: '1px solid black' }} onClick={(e) => makActive(e, cur)} >Text Element</span>
                                                                                                                            return (
                                                                                                                                <div style={{ ...subElem?.style, backgroundImage: subElem?.style?.backgroundImage, width: "100%" }}
                                                                                                                                >
                                                                                                                                    <span onDragStart={e => e.stopPropagation()}>
                                                                                                                                        {/* <SunEditor
                                                                                                                                        setOptions={SunEditorConfig}
                                                                                                                                        id={`textField-${key2}-${curElem?.positionType}-${j}`}
                                                                                                                                        defaultValue={subElem?.textValue || ''}
                                                                                                                                        onChange={(content) => {
                                                                                                                                            const dupText = [...colWise]
                                                                                                                                            dupText[key2].elements[i].element[j].textValue = content
                                                                                                                                            setcolWise(dupText)
                                                                                                                                        }}
                                                                                                                                    /> */}
                                                                                                                                        <SunEditor
                                                                                                                                            setOptions={{ ...SunEditorConfigBlock, value: colWise[indexes?.cur]?.elements[positionIndex]?.element[indexes?.subElem]?.textValue ? arr[indexes?.cur]?.elements[positionIndex]?.element[indexes?.subElem]?.textValue : "Enter Text" }}
                                                                                                                                            onChange={(content) => {
                                                                                                                                                arr[indexes.cur].elements[positionIndex].element[indexes?.subElem].textValue = content
                                                                                                                                                setcolWise([...arr])
                                                                                                                                            }}
                                                                                                                                        />
                                                                                                                                    </span>
                                                                                                                                </div>
                                                                                                                            )
                                                                                                                        case 'image':
                                                                                                                            if (subElem?.src !== "") {
                                                                                                                                return (
                                                                                                                                    <div style={{ width: "100%", ...subElem?.style, backgroundImage: subElem?.style?.backgroundImage }}
                                                                                                                                    >
                                                                                                                                        <img
                                                                                                                                            className="img-fluid"
                                                                                                                                            src={subElem?.src}
                                                                                                                                            alt={`Selected Image ${i}`}
                                                                                                                                            style={{ width: "100%" }}
                                                                                                                                        />
                                                                                                                                    </div>
                                                                                                                                )
                                                                                                                            }
                                                                                                                        case 'button':
                                                                                                                            return (
                                                                                                                                <div style={{ width: "100%", display: "flex", justifyContent: subElem?.style?.alignType }}
                                                                                                                                >
                                                                                                                                    <div style={{ ...subElem?.style, backgroundImage: subElem?.style?.backgroundImage, height: Number(subElem?.style?.height) === 0 ? "auto" : `${subElem?.style?.height}px`, display: "inline-flex", justifyContent: "center", alignItems: "center" }} ><span onDragStart={e => e.stopPropagation()}>
                                                                                                                                        {/* <ReactQuill
                                                                                                                        id={`textField-${key}-${curElem.positionType}-${j}`}
                                                                                                                        style={{ width: '100%', color: "black", zIndex: "5" }}
                                                                                                                        theme='bubble'
                                                                                                                        // defaultValue={"Enter Text"}
                                                                                                                        value={subElem.textValue}
                                                                                                                        onChange={e => {
                                                                                                                            const dupText = [...colWise]
                                                                                                                            dupText[key].elements[i].element[j].textValue = e
                                                                                                                            setcolWise(dupText)
                                                                                                                        }}
                                                                                                                        modules={{
                                                                                                                            toolbar: [
                                                                                                                                [{ header: [1, 2, 3, 4, false] }],
                                                                                                                                ['bold', 'italic', 'underline'],
                                                                                                                                [{ size: [] }],
                                                                                                                                ['align', 'strike'],
                                                                                                                                [{ color: [] }],
                                                                                                                                [{ list: 'ordered' }, { list: 'bullet' }]
                                                                                                                            ]
                                                                                                                        }}
                                                                                                                        formats={[
                                                                                                                            'header',
                                                                                                                            'bold',
                                                                                                                            'italic',
                                                                                                                            'underline',
                                                                                                                            'size',
                                                                                                                            'align',
                                                                                                                            'strike',
                                                                                                                            'blockquote',
                                                                                                                            'color',
                                                                                                                            'list',
                                                                                                                            'bullet'
                                                                                                                        ]} /> */}
                                                                                                                                        <SunEditor
                                                                                                                                            setOptions={SunEditorConfig}
                                                                                                                                            id={`textField-${key2}-${curElem?.positionType}-${j}`}
                                                                                                                                            defaultValue={subElem?.textValue || ''}
                                                                                                                                            onChange={(content) => {
                                                                                                                                                const dupText = [...colWise]
                                                                                                                                                dupText[key2].elements[i].element[j].textValue = content
                                                                                                                                                setcolWise(dupText)
                                                                                                                                            }}
                                                                                                                                        />
                                                                                                                                    </span></div>
                                                                                                                                </div>
                                                                                                                            )
                                                                                                                        case 'input':
                                                                                                                            return (
                                                                                                                                <div style={{ width: "100%", display: "flex", justifyContent: subElem?.style?.alignType }}
                                                                                                                                >
                                                                                                                                    <div style={{ width: subElem?.style?.width }}>
                                                                                                                                        {subElem?.hasLabel && (<label>{subElem?.labelText}</label>)}
                                                                                                                                        <input placeholder={subElem?.placeholder} type="text" style={{ ...subElem?.style, backgroundImage: subElem?.style?.backgroundImage, width: "100%" }} />
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                            )
                                                                                                                    }
                                                                                                                })}
                                                                                                            </div>
                                                                                                        )
                                                                                                    })
                                                                                                }
                                                                                            </div>
                                                                                        </div>
                                                                                    })
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex justify-content-center align-items-center form-check form-switch form-check-dark p-0" style={{ gap: "0.0125rem" }}>
                                                                    <p onClick={() => {
                                                                        if (finalObj?.teaserEnabled) {
                                                                            setCurrPage("button")
                                                                            setSideNav(sideNav === "display" ? "display" : "button")
                                                                            setcolWise([...finalObj?.button])
                                                                            setPopPosition(finalObj?.positions?.button)
                                                                            setCurrPosition({ ...currPosition, selectedType: "navMenuStyles" })
                                                                        }
                                                                    }} className={`form-check-label m-0 fw-bold ${currPage === "button" ? "text-black" : "dark"} ${finalObj?.teaserEnabled ? "" : "opacity-50"}`} style={{ fontSize: "12px", padding: "0.5rem" }}>Button</p> <input checked={finalObj?.teaserEnabled} onChange={e => {
                                                                        if (!e.target.checked && currPage === "button") {
                                                                            setCurrPage(finalObj?.[`${mobileCondition}pages`][0]?.id)
                                                                            setcolWise(finalObj?.[`${mobileCondition}pages`][0]?.values)
                                                                            setPopPosition(finalObj?.positions?.[`${mobileCondition}main`])
                                                                            setCurrPosition({ ...currPosition, selectedType: "navMenuStyles" })
                                                                        }
                                                                        setFinalObj({ ...finalObj, teaserEnabled: e.target.checked })
                                                                    }} style={{ width: "30px", height: "15px" }} type="checkbox" className="form-check-input m-0 cursor-pointer" />
                                                                </div>
                                                            </div>
                                                        </SwiperSlide>
                                                        <SwiperSlide>

                                                        </SwiperSlide>
                                                    </Swiper>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-3 ">
                                        <Modal onClick={() => setCustomColorModal2(!customColorModal2)} toggle={() => setCustomColorModal2(!customColorModal2)} className='hide-backdrop' isOpen={customColorModal2} style={{ width: "300px", maxWidth: "90%", margin: "0px" }}>
                                            <CustomColorModifier styles={defColors} setStyles={setDefColors} colorType={currColor} />
                                        </Modal>

                                        <Modal style={{ filter: "drop-shadow(0px 0px 15px rgba(0,0,0,0.75))" }} isOpen={imgModal} toggle={() => setImgModal(!imgModal)} size='xl'>
                                            <div className="w-100 p-1 d-flex justify-content-between align-items-center">
                                                <h3 className='m-0'>Select Image</h3>
                                                <span className='cursor-pointer' onClick={() => setImgModal(!imgModal)}><X onClick={() => setImgModal(!imgModal)} /></span>
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
                                                                            const arr = [...colWise]
                                                                            if (arr[indexes.cur].elements[colWise[indexes.cur].elements.findIndex($ => $?.positionType === indexes.curElem)].element[indexes.subElem].type) {
                                                                                arr[indexes.cur].elements[colWise[indexes.cur].elements.findIndex($ => $?.positionType === indexes.curElem)].element[indexes.subElem].type = "image"
                                                                            }
                                                                            if (arr[indexes.cur].elements[colWise[indexes.cur].elements.findIndex($ => $?.positionType === indexes.curElem)].element[indexes.subElem].src) {
                                                                                arr[indexes.cur].elements[colWise[indexes.cur].elements.findIndex($ => $?.positionType === indexes.curElem)].element[indexes.subElem].src = ele.image
                                                                            }
                                                                            const newFinalObj = finalObj
                                                                            currPage === "button" ? newFinalObj[`${mobileCondition}button`] = arr : newFinalObj[`${mobileCondition}pages`][finalObj[`${mobileCondition}pages`].findIndex($ => $?.id === currPage)].values = arr
                                                                            setFinalObj(newFinalObj)
                                                                            setcolWise(currPage === "button" ? newFinalObj?.[`${mobileCondition}button`] : newFinalObj?.[`${mobileCondition}pages`]?.[finalObj?.[`${mobileCondition}pages`]?.findIndex($ => $?.id === currPage)]?.values)
                                                                            setImgModal(!imgModal)
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
                                            {/* <div className="p-1 d-flex justify-content-end align-items-center gap-1">
                            <button className="btn" onClick={e => {
                            }}>Cancel</button>
                        </div> */}
                                        </Modal>

                                        <ul className='p-0 m-0' style={{ listStyle: 'none', maxHeight: "40vh" }}>

                                            {/* Text Customization */}
                                            <li className="" style={{ maxHeight: activeSect === "text" ? "55vh" : "0vh", overflowY: 'scroll', overflowX: 'hidden', transition: '0.5s ease' }}>
                                                <div style={{ padding: "0.5rem", transform: `translateX(${activeSect === 'text' ? '0%' : '-100%'})`, opacity: `${activeSect === 'text' ? '1' : '0'}`, transition: '0.5s ease' }}>
                                                    <div className='row text-section'>
                                                        <div className="col-12 mb-1">
                                                            <label style={{ fontSize: '87.5%' }} htmlFor="xircls_header_color">Main Font:</label>
                                                            <Select value={fontStyles[fontStyles?.findIndex($ => $?.value === finalObj?.fontFamilies?.primary)]} id='font-select-primary' styles={{
                                                                option: (provided, state) => {
                                                                    return ({ ...provided, fontFamily: fontStyles[fontStyles?.findIndex($ => $?.value === state.value)]?.value })
                                                                }
                                                            }} options={fontStyles}
                                                                onChange={e => {
                                                                    setFinalObj({ ...finalObj, fontFamilies: { ...finalObj.fontFamilies, primary: e.value } })
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="col-12 mb-1">
                                                            <label style={{ fontSize: '87.5%' }} htmlFor="xircls_header_color">Secondary Font:</label>
                                                            <Select value={fontStyles[fontStyles.findIndex($ => $?.value === finalObj?.fontFamilies?.secondary)]} id='font-select-secondary' styles={{
                                                                option: (provided, state) => {
                                                                    return ({ ...provided, fontFamily: fontStyles[fontStyles?.findIndex($ => $?.value === state.value)]?.value })
                                                                }
                                                            }} options={fontStyles}
                                                                onChange={e => {
                                                                    setFinalObj({ ...finalObj, fontFamilies: { ...finalObj.fontFamilies, secondary: e.value } })
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="col-12 mb-1">
                                                            <label style={{ fontSize: '87.5%' }} htmlFor="xircls_header_color">Main Colour:</label>
                                                            <div className='cursor-pointer' style={{ backgroundImage: `url(${pixels})` }}>
                                                                <div className="p-1 rounded border" style={{ backgroundColor: finalObj?.defaultThemeColors?.primary }} onClick={() => {
                                                                    setCurrColor("primary")
                                                                    setCustomColorModal2(!customColorModal2)
                                                                }}></div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 mb-1">
                                                            <label style={{ fontSize: '87.5%' }} htmlFor="xircls_header_color">Secondary Colour:</label>
                                                            <div className="d-flex align-items-center gap-1">
                                                                <div className='cursor-pointer flex-grow-1' style={{ backgroundImage: `url(${pixels})` }}>
                                                                    <div className="p-1 rounded border" style={{ backgroundColor: finalObj?.defaultThemeColors?.secondary1 }} onClick={() => {
                                                                        setCurrColor("secondary1")
                                                                        setCustomColorModal2(!customColorModal2)
                                                                    }}></div>

                                                                </div>
                                                                <div className='cursor-pointer flex-grow-1' style={{ backgroundImage: `url(${pixels})` }}>
                                                                    <div className="p-1 rounded border" style={{ backgroundColor: finalObj?.defaultThemeColors?.secondary2 }} onClick={() => {
                                                                        setCurrColor("secondary2")
                                                                        setCustomColorModal2(!customColorModal2)
                                                                    }}></div>

                                                                </div>
                                                                <div className='cursor-pointer flex-grow-1' style={{ backgroundImage: `url(${pixels})` }}>
                                                                    <div className="p-1 rounded border" style={{ backgroundColor: finalObj?.defaultThemeColors?.secondary3 }} onClick={() => {
                                                                        setCurrColor("secondary3")
                                                                        setCustomColorModal2(!customColorModal2)
                                                                    }}></div>

                                                                </div>
                                                                <div className='cursor-pointer flex-grow-1' style={{ backgroundImage: `url(${pixels})` }}>
                                                                    <div className="p-1 rounded border" style={{ backgroundColor: finalObj?.defaultThemeColors?.secondary4 }} onClick={() => {
                                                                        setCurrColor("secondary4")
                                                                        setCustomColorModal2(!customColorModal2)
                                                                    }}></div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className={`p-0 mb-1 ${displayEditor.textEditor ? "" : " d-none"}`}>
                                                                <span className='fw-bolder text-black' style={{ fontSize: "0.9rem" }}>Text:</span>
                                                                <SunEditor
                                                                    setOptions={{ ...SunEditorConfigBlock, value: colWise[indexes?.cur]?.elements[positionIndex]?.element[indexes?.subElem]?.textValue ? arr[indexes?.cur]?.elements[positionIndex]?.element[indexes?.subElem]?.textValue : "Enter Text" }}
                                                                    onChange={(content) => {
                                                                        arr[indexes.cur].elements[positionIndex].element[indexes?.subElem].textValue = content
                                                                        setcolWise([...arr])
                                                                    }}
                                                                />
                                                                {/* <input
                                                                className="form-control"
                                                                type="text"
                                                            /> */}
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <div className={`p-0 mb-1 ${displayEditor.imageEditor ? "" : " d-none"}`}>
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
                                                                                    onClick={() => {
                                                                                        setImgModal(!imgModal)
                                                                                        triggerImage()
                                                                                    }}
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
                                                                                        {colWise[indexes.cur]?.elements[positionIndex]?.element[indexes.subElem]?.src === "" ? <PlusCircle size={19} /> : <Edit size={19} />}
                                                                                    </div>
                                                                                    <img style={{ maxWidth: "100%", maxHeight: "100%" }} src={colWise[indexes.cur]?.elements[positionIndex]?.element[indexes.subElem]?.src} alt="" />
                                                                                </div>


                                                                            </div>
                                                                        </AccordionBody>
                                                                    </AccordionItem>
                                                                </UncontrolledAccordion>
                                                            </div>
                                                        </div>
                                                        {/* <div className="col-12 mb-3">
                                                    <label style={{ fontSize: '87.5%' }} htmlFor="xircls_header_color">Headline Text: </label>
                                                    <ReactQuill
                                                        style={{ fontSize: '87.5%' }}
                                                        theme='bubble'
                                                        id='headertext'
                                                        className='bg-white border rounded'
                                                        placeholder='Type here'
                                                        value={allThemes?.[`themeData${selectedThemeNo}`]?.[`header_text`]}
                                                        onFocus={() => {
                                                            selectionDiv("#headertext")
                                                        }}
                                                        onChange={(content) => {

                                                            if (content !== allThemes[`themeData${selectedThemeNo}`].header_text) {
                                                                setAllThemes({ ...allThemes, [`themeData${selectedThemeNo}`]: { ...allThemes[`themeData${selectedThemeNo}`], header_text: content, mobile_header_text: content } })
                                                            }
                                                        }}
                                                        modules={{
                                                            toolbar: [
                                                                ['bold', 'italic', 'underline'],
                                                                ['link']
                                                            ]
                                                        }}
                                                        formats={['bold', 'italic', 'underline', 'link']}
                                                    />
                                                </div> */}
                                                        {/* <div className="col-12 mb-3 d-flex align-items-center gap-1">
                                                    <label htmlFor="" className="w-50" style={{ fontSize: '87.5%' }}>Header Text Colour: </label>
                                                    <label title={themeData?.[`header_color`]} htmlFor="header_color" className="d-flex justify-content-center align-items-center rounded btn w-50 border p-2" style={{ cursor: 'pointer', backgroundColor: themeData?.[`header_color`] }}>
                                                    </label>
                                                    <input
                                                        type="color"
                                                        className="d-none"
                                                        name="header_color"
                                                        id="header_color"
                                                        value={themeData?.[`header_color`]}
                                                        onChange={(e) => {
                                                            changeThemes(e)
                                                        }}
                                                    />
                                                </div> */}
                                                        {/* <div className="col-12 mb-3">
                                                    <label style={{ fontSize: '87.5%' }} htmlFor="xircls_header_color">Body Text: </label>
                                                    <ReactQuill
                                                        style={{ fontSize: '87.5%', color: allThemes?.[`themeData${selectedThemeNo}`]?.[`body_color`] }}
                                                        theme='bubble'
                                                        className='border rounded bg-white'
                                                        id='bodytext'
                                                        placeholder='Type here'
                                                        value={allThemes?.[`themeData${selectedThemeNo}`]?.[`body_text`]}
                                                        onFocus={() => {
                                                            selectionDiv("#bodytext")
                                                        }}
                                                        onChange={(content) => {

                                                            if (content !== allThemes[`themeData${selectedThemeNo}`].body_text) {
                                                                setAllThemes({ ...allThemes, [`themeData${selectedThemeNo}`]: { ...allThemes[`themeData${selectedThemeNo}`], body_text: content, mobile_body_text: content } })
                                                            }
                                                        }}
                                                        modules={{
                                                            toolbar: [
                                                                ['bold', 'italic', 'underline'],
                                                                ['link']
                                                            ]
                                                        }}
                                                        formats={['bold', 'italic', 'underline', 'link']}
                                                    />
                                                </div> */}
                                                        {/* <div className="col-12 mb-3 d-flex align-items-center gap-1">
                                                    <label htmlFor="" className="w-50" style={{ fontSize: '87.5%' }}>Body Text Colour:</label>
                                                    <label title={themeData?.[`body_color`]} htmlFor="body_color" className="d-flex justify-content-center align-items-center rounded btn w-50 border p-2" style={{ cursor: 'pointer', backgroundColor: themeData?.[`body_color`] }}>
                                                    </label>
                                                    <input
                                                        type="color"
                                                        className="d-none"
                                                        name="body_color"
                                                        id="body_color"
                                                        value={themeData?.[`body_color`]}
                                                        onChange={(e) => {
                                                            changeThemes(e)
                                                        }}
                                                    />
                                                </div> */}
                                                        {/* {
                                                    selectedThemeNo === 4 && <div className="col-12 mb-5">
                                                        <label style={{ fontSize: '87.5%' }} htmlFor="xircls_header_color">T&C Text: </label>
                                                        <ReactQuill
                                                            className='border bg-white rounded'
                                                            style={{ fontSize: '87.5%', overflow: 'visible', zIndex: '99999999999999999999999999' }}
                                                            theme='bubble'
                                                            id='message'
                                                            placeholder='Type here'
                                                            value={allThemes?.[`themeData${selectedThemeNo}`]?.[`tnc_text`]}
                                                            onFocus={() => {
                                                                selectionDiv("#message")
                                                            }}
                                                            onChange={(content) => {

                                                                if (content !== allThemes[`themeData${selectedThemeNo}`].tnc_text) {
                                                                    setAllThemes({ ...allThemes, [`themeData${selectedThemeNo}`]: { ...allThemes[`themeData${selectedThemeNo}`], tnc_text: content, mobile_tnc_text: content } })
                                                                }
                                                            }}
                                                            modules={{
                                                                toolbar: [
                                                                    [{ color: [] }],
                                                                    ['link']
                                                                ]
                                                            }}
                                                            formats={['color', 'link']}
                                                        />
                                                    </div>
                                                } */}
                                                    </div>
                                                </div>
                                            </li>

                                            {/* Image Customization */}
                                            <li className={``} style={{ maxHeight: activeSect === "image" ? "60vh" : "0vh", overflowY: 'scroll', overflowX: 'hidden', transition: '0.5s ease' }}>
                                                <div style={{ padding: "0.5rem", transform: `translateX(${activeSect === 'image' ? '0%' : '-100%'})`, opacity: `${activeSect === 'image' ? '1' : '0'}`, transition: '0.5s ease' }}>
                                                    {/* <span style={{ fontSize: '0.65rem' }}>{selectedThemeNo === 3 ? "Logo" : "Image"}: (the aspect ratio of your image must be {selectedThemeNo === 3 ? "1:1" : "3:4"})</span> */}
                                                    <div className="row p-1">
                                                        {/* {Number(selectedThemeNo) !== 4 && <div className="col-9 mb-3">
                                                        <label htmlFor="theme3Img" style={{ backgroundColor: '#ccc', border: '2px dashed gray', cursor: 'pointer', display: 'block', aspectRatio: '1', margin: 'auto' }} className="p-1 w-50">
                                                            <img src={settingImage(themeData?.image)} alt="" style={{ aspectRatio: '1', objectFit: 'cover' }} className="w-100 d-block m-auto" />
                                                        </label>
                                                        <div className="d-flex gap-1 align-items-center">
                                                            <input
                                                                onChange={e => changeThemes(e)}
                                                                type="file"
                                                                accept="image/png, image/jpeg, image/svg, image/jpg"
                                                                className="d-none"
                                                                name="image"
                                                                id="theme3Img"
                                                            />
                                                        </div>
                                                    </div>}
                                                    {Number(selectedThemeNo) === 4 &&  
                                                        <div className="col-12 mb-3">
                                                            <div className="mb-4">
                                                                <label style={{ fontSize: '87.5%' }}>Background Image: </label>
                                                                <div className="d-flex gap-1 align-items-center row px-1">
                                                                    <label style={{ border: '2px dashed gray', opacity: '0.75', cursor: 'pointer', aspectRatio: '3/4' }} className={`col-4 px-0 position-relative overflow-hidden image-label`} htmlFor={`image-input-bg`}>
                                                                        <input
                                                                            onChange={e => changeThemes(e)}
                                                                            name={`background_image`} type="file"
                                                                            accept="image/png, image/jpeg, image/svg, image/jpg" id={`image-input-bg`} className="d-none" />
                                                                        <img className="w-100 h-100" src={settingImage(themeData?.background_image)} style={{ objectFit: 'cover' }} alt="" />
                                                                        <div className="position-absolute w-100 h-100 top-0 left-0 d-flex justify-content-center align-items-center hidden-edit" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                                                                            <Edit2 size={20} color="white" />
                                                                        </div>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <hr />
                                                            <div>
                                                                <label className="my-2" style={{ fontSize: '87.5%' }}>Carousel Image(s): </label>
                                                                <div className="row w-100 mx-0 px-0">
                                                                    {carouselArray?.map((image, index) => {
                                                                        return (
                                                                            <div className={`col-4 mb-2 position-relative`}>
                                                                                <span className="delete-image p-0 btn btn-danger d-flex justify-content-center align-items-center" style={{ width: '20px', aspectRatio: '1', position: 'absolute', top: '-10px', right: '5px', borderRadius: '50px', zIndex: '9999' }} onClick={() => removeCarouselImage(index)}><X color="white" size={10} /></span>
                                                                                <label style={{ border: '2px dashed gray', opacity: '0.75', cursor: 'pointer', aspectRatio: '3/4' }} className="w-100 position-relative overflow-hidden image-label">
                                                                                    <input
                                                                                        onChange={(e) => editCarouselImage(e, index)}
                                                                                        type="file"
                                                                                        accept="image/png, image/jpeg, image/svg, image/jpg" className="d-none" />
                                                                                    <img className="w-100 h-100" alt="" src={settingImage(image)} />
                                                                                    <div className="position-absolute w-100 h-100 top-0 left-0 d-flex justify-content-center align-items-center hidden-edit" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                                                                                        <Edit2 size={20} color="white" />
                                                                                    </div>
                                                                                </label>
                                                                            </div>
                                                                        )
                                                                    })}
                                                                    {carouselArray?.length < 6 && (
                                                                        <div className={`col-4 mb-2 position-relative`}>
                                                                            <label style={{ border: '2px dashed gray', cursor: 'pointer', aspectRatio: "3/4" }} className="w-100 d-flex justify-content-center align-items-center" htmlFor={`add-image-input`}>
                                                                                <input onChange={carouselImageAdd} type="file"
                                                                                    accept="image/png, image/jpeg, image/svg, image/jpg" id={`add-image-input`} className="d-none" />
                                                                                <PlusCircle color="gray" />
                                                                            </label>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <label className="my-2" style={{ fontSize: '87.5%' }}>Image changes after:</label>
                                                                <div className="d-flex alignitems-center gap-1">
                                                                    <input
                                                                        onChange={e => changeThemes(e)} min={1} max={10} className="w-75" type="range" style={{ accentColor: '#fbcd0c' }} name="carousel_interval" /><span className="w-25 text-end">{themeData?.carousel_interval}s</span>
                                                                </div>
                                                            </div>
                                                        </div>} */}
                                                        <UncontrolledAccordion defaultOpen={['1']} stayOpen>
                                                            <AccordionItem className='bg-white border-bottom'>
                                                                <AccordionHeader className='acc-header border-bottom' targetId='1'>
                                                                    <p className='m-0 fw-bolder text-black text-uppercase' style={{ fontSize: "0.75rem" }}>Select Offers</p>
                                                                </AccordionHeader>
                                                                <AccordionBody accordionId='1'>
                                                                    {(gotOffers && Array.isArray(allOffers)) ? allOffers?.map((ele) => {
                                                                        // const { offer_json } = ele
                                                                        // const replacedJson = offer_json.replaceAll(`'`, '"').replaceAll(`None`, `"none"`).replaceAll("False", false)
                                                                        return (
                                                                            <div className='p-0 mx-0 mt-1 mb-3'>
                                                                                <div style={{
                                                                                    flexDirection: 'column',
                                                                                    justifyContent: 'center',
                                                                                    alignItems: 'center',
                                                                                    position: "relative"
                                                                                }} onClick={() => {
                                                                                    if (finalObj?.selectedOffers?.some($ => $?.Code === ele.Code)) {
                                                                                        const newArr = [...finalObj.selectedOffers]
                                                                                        setFinalObj({ ...finalObj, selectedOffers: [...newArr?.filter(item => item.Code !== ele.Code)] })
                                                                                    } else {
                                                                                        setFinalObj({ ...finalObj, selectedOffers: [...finalObj?.selectedOffers, ele] })
                                                                                    }
                                                                                }}>
                                                                                    <div style={{
                                                                                        width: '100%',
                                                                                        minHeight: '100%',
                                                                                        justifyContent: 'center',
                                                                                        // boxShadow: 'rgba(0, 0, 0, 0.125) 10px 2px 5px',
                                                                                        filter: 'drop-shadow(rgba(0, 0, 0, 0.2) 0px 0px 10px',
                                                                                        borderRadius: '10px',
                                                                                        display: 'flex',
                                                                                        position: "relative",
                                                                                        backgroundColor: 'white',
                                                                                        cursor: "pointer",
                                                                                        outline: `2px solid ${finalObj?.selectedOffers?.some($ => $?.Code === ele.Code) ? "#FF671C" : "rgba(0,0,0,0)"}`
                                                                                    }}>
                                                                                        {finalObj?.selectedOffers?.some($ => $?.Code === ele?.Code) && <span style={{ position: "absolute", inset: "0px 0px auto auto", transform: `translateX(35%) translateY(-35%)`, width: "25px", aspectRatio: "1", display: "flex", justifyContent: "center", alignItems: "center", color: "#FF671C", backgroundColor: "white", borderRadius: "100px", zIndex: "99999999999", border: "2px solid #FF671C" }}>{(finalObj?.selectedOffers?.findIndex($ => $?.Code === ele.Code)) + 1}</span>}
                                                                                        <div className='flex-grow-1 d-flex flex-column justify-content-between' style={{ padding: '0.5rem' }}>
                                                                                            <div style={{ text: 'wrap' }}>
                                                                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', textTransform: 'uppercase' }}>
                                                                                                    <h2 style={{ fontWeight: 'bolder', fontSize: '0.9rem', color: '#FF671C' }}>
                                                                                                        {ele?.Code}
                                                                                                    </h2>
                                                                                                    <span style={{ textTransform: 'lowercase', fontSize: '0.75rem', color: 'black' }}>
                                                                                                        {ele?.Summary}
                                                                                                    </span>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div>
                                                                                                <div style={{ paddingTop: '0.5rem' }}>
                                                                                                    <span style={{ color: 'black', textTransform: 'uppercase', fontWeight: '500', fontSize: '0.65rem' }}>
                                                                                                        valid until: {ele?.ValidityPeriod?.end ? moment(ele?.ValidityPeriod?.end).format('L') : "Never ending"}
                                                                                                    </span>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: "0.5rem", padding: "0px 0.5rem 0.5rem" }}>
                                                                                            <div style={{
                                                                                                position: 'relative',
                                                                                                display: 'flex',
                                                                                                flexDirection: 'column',
                                                                                                justifyContent: 'space-between',
                                                                                                alignItems: 'center',
                                                                                                backgroundColor: '#FF671C',
                                                                                                // filter: `hue-rotate(${i * (i + 20)}deg)`,
                                                                                                padding: "1rem 0.25rem"
                                                                                            }}>
                                                                                                <h1 style={{
                                                                                                    fontSize: '1.829rem',
                                                                                                    fontWeight: '750',
                                                                                                    fontFamily: 'Montserrat',
                                                                                                    color: 'white'
                                                                                                }}>

                                                                                                    {
                                                                                                        ele?.Type === "PERCENTAGE" ? (
                                                                                                            `${Number(ele?.Value)?.toFixed(0)}%`
                                                                                                        ) : `${userPermission?.currencySymbol}${Number(ele?.Value)?.toFixed(0)}`
                                                                                                    }
                                                                                                </h1>
                                                                                            </div>
                                                                                            <div style={{
                                                                                                display: 'flex',
                                                                                                flexDirection: 'column',
                                                                                                justifyContent: 'flex-end',
                                                                                                alignItems: 'center'
                                                                                            }}>
                                                                                                <button type="button" style={{
                                                                                                    color: '#FF671C',
                                                                                                    // filter: `hue-rotate(${i * (i + 20)}deg)`,
                                                                                                    fontSize: '0.65rem',
                                                                                                    fontWeight: '700',
                                                                                                    cursor: 'pointer',
                                                                                                    border: '0.75px solid #FF671C',
                                                                                                    borderRadius: '15px',
                                                                                                    padding: '0.195rem',
                                                                                                    backgroundColor: 'transparent',
                                                                                                    textTransform: 'uppercase',
                                                                                                    cursor: 'pointer'
                                                                                                }}>
                                                                                                    <span >
                                                                                                        Redeem
                                                                                                    </span>
                                                                                                </button>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    {/* <div style={{
                                                                        width: '80%',
                                                                        // margin: '-0.5rem auto',
                                                                        position: 'absolute',
                                                                        bottom: "0px",
                                                                        backgroundColor: 'white',
                                                                        textAlign: 'center',
                                                                        padding: '0.1rem 0.1rem',
                                                                        borderRadius: '10px',
                                                                        boxShadow: '0 4px 24px 0 rgba(34, 41, 47, 0.15)',
                                                                        transform: "translate(-50%, 50%)",
                                                                        left: "50%"
                                                                    }}>
                                                                        <span style={{ textTransform: 'lowercase', fontSize: '0.75rem', color: 'black', fontWeight: '300' }}>
                                                                            Used xyz times
                                                                        </span>
                                                                    </div> */}
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }) : (
                                                                        <div className="d-flex justify-content-center align-items-center" style={{ inset: "0px", backgroundColor: "rgba(255,255,255,0.5)" }}>
                                                                            <Spinner />
                                                                        </div>
                                                                    )}
                                                                    <div><button onClick={() => navigate("/merchant/SuperLeadz/create_offers/")} className="btn btn-dark w-100">Add{allOffers?.length >= 1 ? " more" : ""} offers</button></div>
                                                                </AccordionBody>
                                                            </AccordionItem>
                                                        </UncontrolledAccordion>
                                                    </div>
                                                </div>
                                            </li>


                                            {/* Button Customization */}
                                            <li className="" style={{ maxHeight: activeSect === "button" ? "60vh" : "0vh", overflowY: 'scroll', overflowX: 'hidden', transition: '0.5s ease' }}>
                                                <div style={{ padding: "0.5rem", transform: `translateX(${activeSect === 'button' ? '0%' : '-100%'})`, opacity: `${activeSect === 'button' ? '1' : '0'}`, transition: '0.5s ease' }}>
                                                    <div className="row">
                                                        <div className="col-12 mb-3 d-flex align-items-center gap-1">
                                                            <label htmlFor="" className="w-50" style={{ fontSize: '87.5%' }}>Colour:</label>
                                                            <label title={themeData?.[`button_background_color`]} htmlFor="xircls_popup_button_color" className="d-flex justify-content-center align-items-center rounded btn w-50 border p-2" style={{ cursor: 'pointer', backgroundColor: themeData?.[`button_background_color`] }}>
                                                                {/* <span className="xircls_ts_black" style={{color: 'black'}}></span> */}

                                                                <input
                                                                    type="color"
                                                                    value={themeData?.[`button_background_color`]}
                                                                    className="d-none"
                                                                    name="button_background_color"
                                                                    id="xircls_popup_button_color"
                                                                    onChange={(e) => {
                                                                        changeThemes(e)
                                                                    }}
                                                                />
                                                            </label>
                                                        </div>
                                                        <div className="col-12 mb-3">
                                                            <label htmlFor="button_text" style={{ fontSize: '87.5%' }}>Text:</label>
                                                            <div className="d-flex align-items-center gap-1">
                                                                <input
                                                                    type="text"
                                                                    style={{ fontSize: '85%' }}
                                                                    className="form-control"
                                                                    name="button_text"
                                                                    id="button_text"
                                                                    value={themeData?.[`button_text`]}
                                                                    max={25}
                                                                    onChange={(e) => {
                                                                        changeThemes(e)
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-12 mb-3 d-flex align-items-center gap-1">
                                                            <label htmlFor="" className="w-50" style={{ fontSize: '87.5%' }}>Text Colour:</label>
                                                            <label title={themeData?.[`button_color`]} htmlFor="xircls_popup_buttonfont_color" className="d-flex justify-content-center align-items-center rounded btn w-50 border p-2" style={{ cursor: 'pointer', backgroundColor: themeData?.[`button_color`] }}>
                                                                {/* <span className="xircls_ts_black" style={{color: 'black'}}></span> */}
                                                            </label>
                                                            <input
                                                                type="color"
                                                                className="d-none"
                                                                name="button_color"
                                                                id="xircls_popup_buttonfont_color"
                                                                value={themeData?.[`button_color`]}
                                                                onChange={(e) => {
                                                                    changeThemes(e)
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="col-12 mb-3">
                                                            <label htmlFor="button_border" style={{ fontSize: '87.5%' }}>Border Radius:</label>
                                                            <div className="d-flex align-items-center gap-1">
                                                                <input
                                                                    type="range"
                                                                    className="w-100"
                                                                    style={{ accentColor: '#fbcd0c' }}
                                                                    name="button_border_radius"
                                                                    id="button_border"
                                                                    value={themeData?.[`button_border_radius`]}
                                                                    max={25}
                                                                    onChange={(e) => {
                                                                        changeThemes(e)
                                                                    }}
                                                                /><span style={{ fontSize: '87.5%' }}>{themeData?.[`button_border_radius`]}px</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    
                                </div>
                            </CardBody>
                        </Card>
                        </div>
                        {/* <Customization text="Customization" theme={themeNumber} /> */}
                    </div>
                    <div style={{position: 'absolute', bottom: '0px', left: '0px', width: '100%', padding: '0px 20px'}}>
                        <div ref={button_div} className="button_div" style={{ marginTop: "1rem", display: "flex", justifyContent: "space-between" }}>
                            <button className='btn btn-primary ' onClick={() => navigate(-1)}>
                                <div>
                                    <ArrowLeft size={'20px'} />
                                    Back
                                </div>

                            </button>
                            <button className='btn btn-primary-main' onClick={() => sendData()}>
                                <div>
                                    Save & Proceed
                                    <ArrowRight size={'20px'} />
                                </div>

                            </button>

                        </div>
                    </div>

                </div>
            </IntroWrapper>
        </>


    )
}

export default Customization