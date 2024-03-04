import React, { useContext, useEffect, useState } from 'react'
import { Edit2, PlusCircle, X } from 'react-feather'
import { useLocation } from 'react-router-dom'
import Select from 'react-select'
import ReactQuill from 'react-quill'
import { Modal } from 'reactstrap'
import CustomColorModifier from '../../FormBuilder/FormBuilder(components)/CustomColorModifier'
import Theme1 from "../Customization/Theme1"
import Theme4 from "../Customization/Theme4"
import { ThemesProvider } from '../../../Helper/Context'
import { allThemes as newThemes } from '../../Components/SuperLeadz/allThemes'
import JsonToJsx from '../../Components/SuperLeadz/JsonToJsx'
import { defaultObj } from '../../NewCustomizationFlow/defaultStyles'

const ModalCustomization = () => {
    const themeLoc = useLocation()
    const { selectedThemeNo, oldThemes: allThemes, setOldThemes: setAllThemes, selectedCustThemeId, selectedThemeId } = useContext(ThemesProvider)

    const allPreviews = [...newThemes]

    // const [isMobile, setIsMobile] = useState(false)
    const isMobile = false

    const mobileCondition = isMobile ? "mobile_" : ""

    const [finalObj, setFinalObj] = useState(themeLoc?.state?.custom_theme ? JSON.parse(themeLoc?.state?.custom_theme) : selectedCustThemeId !== "" ? { ...allPreviews[allPreviews?.findIndex($ => $?.theme_id === selectedCustThemeId)]?.object } : defaultObj)
    console.log(finalObj)

    const [currColor, setCurrColor] = useState("primary")

    // const [currPage, setCurrPage] = useState("main")
    const currPage = "main"

    // const [indexes, setIndexes] = useState({ cur: 0, curElem: "left", subElem: "grandparent" })
    const indexes  = { cur: 0, curElem: "left", subElem: "grandparent" }

    const [values, setValues] = useState({})
    console.log(values)

    const [customColorModal2, setCustomColorModal2] = useState(false)

    const [defColors, setDefColors] = useState(finalObj.defaultThemeColors || {})

    const [custThemeStyle, setCustThemeStyle] = useState({ mainFontStyle: { label: "Montserrat", value: `Montserrat` }, secondaryFontStyle: { label: "Montserrat", value: `Montserrat` }, colorStyle: { primary: "white", secondary1: "black", secondary2: "red", secondary3: "yellow", secondary4: "blue" } })

    const [bgStyles, setBgStyles] = useState(selectedThemeId === "" ? { backgroundColor: "rgba(255,255,255,1)", bgType: "solid", width: '550px', maxWidth: "90%", minHeight: '75px', paddingTop: "0px", paddingBottom: "0px", paddingRight: "0px", paddingLeft: "0px", marginTop: "0px", marginBottom: "0px", marginRight: "0px", marginLeft: "0px", borderWidth: "0px 0px 0px 0px", defBorderWidth: "0px", borderColor: "rgba(0,0,0,1)", borderStyle: "solid", borderType: "none", borderTopLeftRadius: "0px", borderTopRightRadius: "0px", borderBottomRightRadius: "0px", borderBottomLeftRadius: "0px", boxSizing: "border-box" } : finalObj.backgroundStyles[`${mobileCondition}main`])
    
    const themeData = allThemes[`themeData${selectedThemeNo}`]

    const [colWise, setcolWise] = useState(currPage === "button" ? finalObj?.button : finalObj?.[`${mobileCondition}pages`][finalObj?.[`${mobileCondition}pages`]?.findIndex($ => $?.id === currPage)]?.values)

    const carouselArray = allThemes?.themeData4?.[`carousel_image`]

    const [activeSect, setActiveSect] = useState("text")

    const fontStyles = [
        { label: "Montserrat", value: `Montserrat` },
        { label: "Open Sans", value: `Open Sans` },
        { label: "Oswald", value: `Oswald` },
        { label: "Abril Fatface", value: `Abril Fatface` },
        { label: "Lato", value: `Lato` }
    ]

    const settingImage = (image) => {
        let demo
        try {
            demo = URL.createObjectURL(image)
        } catch (error) {
            demo = image
        }
        return demo
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
    const carouselImageAdd = (e) => {
        console.log(e)
        const maxSize = 512
        if (e.target.files[0].size > (maxSize * 1024)) {
            alert('Image size too large')
        } else {
            setAllThemes({ ...allThemes, themeData4: { ...allThemes.themeData4, [`carousel_image`]: [...carouselArray, e.target.files[0]] } })
        }
    }

    const editCarouselImage = (e, i) => {
        const maxSize = 512
        if (e.target.files[0].size > (maxSize * 1024)) {
            alert('Image size too large')
        } else {
            const editArray = [...carouselArray]
            editArray[i] = e.target.files[0]
            setAllThemes({ ...allThemes, themeData4: { ...allThemes.themeData4, [`carousel_image`]: editArray } })
        }
    }

    const removeCarouselImage = (i) => {
        const editArray = [...carouselArray]
        editArray.splice(i, 1)
        setAllThemes({ ...allThemes, themeData4: { ...allThemes.themeData4, [`carousel_image`]: editArray } })
    }


    // function selectionDiv(id) {
    //     const para = document.querySelector(`${id} .ql-editor`)
    //     const selection = window.getSelection()
    //     const range = document.createRange()
    //     range.selectNodeContents(para)
    //     selection.removeAllRanges()
    //     selection.addRange(range)
    // }

    useEffect(() => {
        setCustThemeStyle((prevThemeStyle) => ({
            ...prevThemeStyle,
            colorStyle: { ...defColors }
        }))
    }, [defColors])

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
        console.table(defColors, currColor)
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

    return (
        <div className="container-fluid">
            <div className="row match-height px-0">

                <style>{`
                    .ql-editor {
                        overflow: visible
                    }
                `}</style>
                {/* Customization */}

                <div className="col-md-2 rounded-3 px-0">
                    <ul className='p-0 m-0' style={{ listStyle: 'none' }}>
                        <li className={`d-flex align-items-center gap-1 visitor_select  active-${activeSect === "text" ? "1" : activeSect === "image" ? "2" : "3"}`} onClick={() => setActiveSect("text")} style={{ cursor: "pointer", padding: "0.5rem 1rem", fontSize: "14px", color: "black", letterSpacing: "0.5px" }}><img src="https://cdn-icons-png.flaticon.com/128/2087/2087807.png" width={"16px"} />General</li>

                        <li className={`d-flex align-items-center gap-1 visitor_select`} onClick={() => setActiveSect("image")} style={{ cursor: "pointer", padding: "0.5rem 1rem", fontSize: "14px", color: "black", letterSpacing: "0.5px" }}><img src="https://cdn-icons-png.flaticon.com/512/739/739249.png" width={"16px"} /> Offers</li>

                        <li className="d-flex align-items-center gap-1 visitor_select" onClick={() => setActiveSect("button")} style={{ cursor: "pointer", padding: "0.5rem 1rem", fontSize: "14px", color: "black", letterSpacing: "0.5px" }}><img src="https://cdn-icons-png.flaticon.com/512/3303/3303079.png" width={"16px"} /> Button</li>
                        {/* <li className="d-flex align-items-center gap-1 visitor_select" onClick={() => setAllThemes({...defaultThemeData})} style={{ cursor: "pointer", padding: "0.5rem 1rem" }}><img src="https://cdn-icons-png.flaticon.com/512/3303/3303079.png" width={"16px"} /> Reset</li> */}
                    </ul>
                </div>
                <div className="col-md-3 custom-height scroll-custom">
                    <Modal onClick={() => setCustomColorModal2(!customColorModal2)} toggle={() => setCustomColorModal2(!customColorModal2)} className='hide-backdrop' isOpen={customColorModal2} style={{ width: "300px", maxWidth: "90%", margin: "0px" }}>
                        <CustomColorModifier styles={defColors} setStyles={setDefColors} colorType={currColor} />
                    </Modal>

                    <ul className='p-0 m-0' style={{ listStyle: 'none' }}>

                        {/* Text Customization */}
                        <li className="" style={{ maxHeight: activeSect === "text" ? "100vh" : "0vh", overflow: 'hidden', transition: '0.5s ease' }}>
                            <div style={{ padding: "0.5rem", transform: `translateX(${activeSect === 'text' ? '0%' : '-100%'})`, opacity: `${activeSect === 'text' ? '1' : '0'}`, transition: '0.5s ease' }}>
                                <div className='row p-1 text-section'>
                                    <div className="col-12 mb-3">
                                        <label style={{ fontSize: '87.5%' }} htmlFor="xircls_header_color">Main Font:</label>
                                        <Select
                                            className='w-75'
                                            value={custThemeStyle.mainFontStyle}
                                            options={fontStyles}
                                            onChange={(selectedOption) => {
                                                setCustThemeStyle({ ...custThemeStyle, mainFontStyle: selectedOption })
                                            }}
                                        />
                                    </div>
                                    <div className="col-12 mb-3">
                                        <label style={{ fontSize: '87.5%' }} htmlFor="xircls_header_color">Secondary Font:</label>
                                        <Select
                                            className='w-75'
                                            value={custThemeStyle.secondaryFontStyle}
                                            options={fontStyles}
                                            onChange={(selectedOption) => {
                                                setCustThemeStyle({ ...custThemeStyle, secondaryFontStyle: selectedOption })
                                            }}
                                        />
                                    </div>
                                    <div className="col-12 mb-3">
                                        <label style={{ fontSize: '87.5%' }} htmlFor="xircls_header_color">Main Colour:</label>
                                        <div className='cursor-pointer' >
                                            <div className="p-1 rounded border" style={{ backgroundColor: custThemeStyle.colorStyle.primary }} onClick={() => {
                                                setCurrColor("primary")
                                                setCustomColorModal2(!customColorModal2)
                                            }}></div>
                                        </div>
                                    </div>
                                    <div className="col-12 mb-3">
                                        <label style={{ fontSize: '87.5%' }} htmlFor="xircls_header_color">Secondary Colour:</label>
                                        <div className="d-flex align-items-center gap-1">
                                            <div className='cursor-pointer flex-grow-1' >
                                                <div className="p-1 rounded border" style={{ backgroundColor: custThemeStyle.colorStyle.secondary1 }} onClick={() => {
                                                    setCurrColor("secondary1")
                                                    setCustomColorModal2(!customColorModal2)
                                                }}></div>

                                            </div>
                                            <div className='cursor-pointer flex-grow-1' >
                                                <div className="p-1 rounded border" style={{ backgroundColor: custThemeStyle.colorStyle.secondary2 }} onClick={() => {
                                                    setCurrColor("secondary2")
                                                    setCustomColorModal2(!customColorModal2)
                                                }}></div>

                                            </div>
                                            <div className='cursor-pointer flex-grow-1' >
                                                <div className="p-1 rounded border" style={{ backgroundColor: custThemeStyle.colorStyle.secondary3 }} onClick={() => {
                                                    setCurrColor("secondary3")
                                                    setCustomColorModal2(!customColorModal2)
                                                }}></div>

                                            </div>
                                            <div className='cursor-pointer flex-grow-1' >
                                                <div className="p-1 rounded border" style={{ backgroundColor: custThemeStyle.colorStyle.secondary4 }} onClick={() => {
                                                    setCurrColor("secondary4")
                                                    setCustomColorModal2(!customColorModal2)
                                                }}></div>

                                            </div>
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
                        <li className={``} style={{ maxHeight: activeSect === "image" ? "100vh" : "0vh", overflow: 'hidden', transition: '0.5s ease' }}>
                            <div style={{ padding: "0.5rem", transform: `translateX(${activeSect === 'image' ? '0%' : '-100%'})`, opacity: `${activeSect === 'image' ? '1' : '0'}`, transition: '0.5s ease' }}>
                                <span style={{ fontSize: '0.65rem' }}>{selectedThemeNo === 3 ? "Logo" : "Image"}: (the aspect ratio of your image must be {selectedThemeNo === 3 ? "1:1" : "3:4"})</span>
                                <div className="row p-1">
                                    {Number(selectedThemeNo) !== 4 && <div className="col-9 mb-3">
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
                                        </div>}
                                </div>
                            </div>
                        </li>


                        {/* Button Customization */}
                        <li className="" style={{ maxHeight: activeSect === "button" ? "100vh" : "0vh", overflow: 'hidden', transition: '0.5s ease' }}>
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

                {/* Preview */}

                <div className="col-md-7 rounded-3 p-2">
                    <div id="customization" className='d-flex justify-content-center align-items-center position-relative'>
                        {/* <div style={{ scale: '0.55', filter: 'drop-shadow(0px 0px 15px rgba(0,0,0,0.5))'}}> */}
                        <div className="position-relative scroll-custom d-flex justify-content-center align-items-center" style={{ maxHeight: '45vh', overflow: 'hidden' }}>
                            <div style={{ scale: "0.6" }}>
                                {/* {
                                    selectedThemeNo === 3 ? <Theme1 themes={allThemes} setOpenSection={setActiveSect} /> : <Theme4 themes={allThemes} setOpenSection={setActiveSect} />
                                } */}
                                {/* <JsonToJsx isMobile={false} renderObj={newThemes[selectedCustThemeId - 1]?.object} scale={1} /> */}
                                <JsonToJsx isMobile={false} renderObj={finalObj} scale={1} />
                            </div>
                        </div>
                        {/* </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalCustomization