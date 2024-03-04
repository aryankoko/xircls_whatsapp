import React, { useEffect, useState } from 'react'
import { SketchPicker } from 'react-color'
import pixels from "../../../assets/images/superLeadz/pixels.png"
import { Card, CardBody, Modal, ModalBody } from 'reactstrap'
import { PlusCircle, Trash2, X } from 'react-feather'
import axios from 'axios'
import Select from 'react-select'
import toast from 'react-hot-toast'
import { SuperLeadzBaseURL } from '../../../assets/auth/jwtService'
import { getCurrentOutlet } from '../../Validator'
import Spinner from '../../Components/DataTable/Spinner'

const BgModifier = ({ type, setMainStyle, mainStyle, mobileCondition, styles, setStyles, closeState, setCloseState }) => {
    const outletData = getCurrentOutlet()

    // const [conditionVariable?.bgType, setActiveBg] = useState("solid")
    const [allImages, setAllImages] = useState([])
    const [imgModal, setImgModal] = useState(false)
    const [imgLoading, setImgLoading] = useState(false)
    let conditionVariable
    if (type === "btnStyles") {
        conditionVariable = mainStyle?.backgroundStyles[`${mobileCondition}button`]
    } else if (type === "bgStyles") {
        conditionVariable = mainStyle?.backgroundStyles[`${mobileCondition}main`]
    } else if (type === "btnSetting") {
        conditionVariable = mainStyle?.overlayStyles
    } else {
        conditionVariable = styles
    }
    const [backgroundSize, setBackgroundSize] = useState(conditionVariable?.backgroundSize ? conditionVariable?.backgroundSize : "auto")
    const [backgroundRepeat, setBackgroundRepeat] = useState(conditionVariable?.backgroundRepeat ? conditionVariable?.backgroundRepeat : "repeat")
    const [backgroundPositionX, setBackgroundPositionX] = useState(conditionVariable?.backgroundPositionX ? conditionVariable?.backgroundPositionX : "center")
    const [backgroundPositionY, setBackgroundPositionY] = useState(conditionVariable?.backgroundPositionY ? conditionVariable?.backgroundPositionY : "center")

    const getBgColor = (colorIsThe) => {
        if (colorIsThe) {
            if (colorIsThe.includes("rgb")) {
                const arr = colorIsThe.split("rgba")[1].slice(1, -1).split(",")
                return { r: arr[0], g: arr[1], b: arr[2], a: arr[3] }
            } else if (colorIsThe.includes("hsl")) {
                const arr = colorIsThe.split("hsl")[1].slice(1, -1).split(",")
                return { h: arr[0], s: arr[1], l: arr[2] }
            } else {
                return colorIsThe
            }
        }
    }
    const [solidBg, setSolidBg] = useState(conditionVariable?.backgroundColor ? conditionVariable?.backgroundColor : "rgba(255,255,255,1)")
    const [gradientBg, setGradientBg] = useState(() => {
        try {
            const gradient = conditionVariable?.backgroundImage?.split("linear-gradient")[1].slice(1, -1).split(", ")
            return { activeGrad: "from", angle: parseFloat(gradient[0]), from: gradient[1], to: gradient[2] }
        } catch (error) {
            return { activeGrad: "from", angle: "90", from: "rgba(115,103,240,1)", to: "rgba(255,255,255,1)" }
        }
    })
    const [bgImage, setBgImage] = useState(conditionVariable?.backgroundImage)

    // const getImage = (demoImg, src) => {
    //     if (demoImg) {
    //         let img
    //         try {
    //             if (src) {
    //                 img = URL.createObjectURL(demoImg)
    //             } else {
    //                 img = `url('${URL.createObjectURL(demoImg)}')`
    //             }
    //         } catch (error) {
    //             if (demoImg.includes("linear")) {
    //                 img = demoImg
    //             } else {
    //                 img = `url('${demoImg}')`
    //             }
    //         }
    //         return img
    //     }
    // }

    const backgroundValues = {
        size: [{ label: "Original", value: "auto" }, { label: "Contain", value: "contain" }, { label: "Cover", value: "cover" }, { label: "Stretch", value: "100% 100%" }],
        repeat: [{ label: "No repeat", value: "no-repeat" }, { label: "Repeat", value: "repeat" }, { label: "Repeat Horizontally", value: "repeat-x" }, { label: "Repeat Vertically", value: "repeat-y" }]
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

    useEffect(() => {
        let bgStylesObj = {}
        if (conditionVariable?.bgType === "none") {
            bgStylesObj = { backgroundColor: "rgba(0,0,0,0)", backgroundImage: "none" }
        } else if (conditionVariable?.bgType === "solid") {
            bgStylesObj = { backgroundColor: (solidBg && solidBg !== "") ? solidBg : "rgba(255,255,255,1)", backgroundImage: "none", isInitialBgColor: false }
        } else if (conditionVariable?.bgType === "gradient") {
            bgStylesObj = { backgroundColor: "rgba(0,0,0,0)", backgroundImage: `linear-gradient(${gradientBg.angle === "" ? "0" : gradientBg.angle}deg, ${gradientBg.from}, ${gradientBg.to})` }
        } else {
            bgStylesObj = { backgroundColor: "rgba(0,0,0,0)", backgroundImage: `url(${bgImage})`, backgroundSize, backgroundRepeat, backgroundPositionX, backgroundPositionY }
        }
        if (type === "btnStyles") {
            setMainStyle((preData) => ({...preData, backgroundStyles: { ...preData?.backgroundStyles, [`button`]: { ...preData?.backgroundStyles[`button`], ...bgStylesObj } } }))
            setMainStyle((preData) => ({...preData, backgroundStyles: { ...preData?.backgroundStyles, [`mobile_button`]: { ...preData?.backgroundStyles[`mobile_button`], ...bgStylesObj } } }))
        } else if (type === "bgStyles") {
            setMainStyle({ ...mainStyle, backgroundStyles: { ...mainStyle?.backgroundStyles, [`${mobileCondition}main`]: { ...mainStyle?.backgroundStyles[`${mobileCondition}main`], ...bgStylesObj } } })
        } else if (type === "btnSetting") {
            setMainStyle({ ...mainStyle, overlayStyles: { ...mainStyle?.overlayStyles, ...bgStylesObj } })
        } else {
            setStyles({ ...styles, ...bgStylesObj })
        }
    }, [solidBg, gradientBg, bgImage, conditionVariable?.bgType, backgroundSize, backgroundRepeat, backgroundPositionX, backgroundPositionY])


    // console.log(outletData[0]?.web_url, "CurrentOutlet")

    return (
        <div className="position-relative" style={{ maxWidth: "100%", zIndex: "999999999999999999999999999999999999999999999999999" }} onClick={e => e.stopPropagation()}>
            <style>{`
                .active-on::before {
                    content: "";
                    position: absolute;
                    inset: 0px;
                    z-index: -1;
                    border-bottom: 5px solid #7367f0;
                }
                .sketch-picker {
                    width: auto !important;
                    padding: 0px !important;
                    box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px !important;
                }
            `}</style>
            <div className="position-relative d-flex justify-content-center align-items-center">
                <div className="position-absolute w-100 h-100" style={{ zIndex: "-1", scale: "0.8", filter: "blur(40px)", ...styles, backgroundImage: conditionVariable?.backgroundImage }}></div>
                <Card className='m-0'>
                    <CardBody className='p-0'>
                        <div className="d-flex justify-content-center align-items-center" style={{ padding: "0.75rem" }}>
                            {
                                type === "btnStyles" ? (
                                    <>
                                        <div className={`${conditionVariable?.bgType === "none" ? "bg-light-primary active-on" : ""} cursor-pointer rounded`} onClick={() => {
                                            setMainStyle((preData) => ({...preData, backgroundStyles: { ...preData?.backgroundStyles, [`button`]: { ...preData?.backgroundStyles[`button`], bgType: "none" } }}))
                                            setMainStyle((preData) => ({...preData, backgroundStyles: { ...preData?.backgroundStyles, [`mobile_button`]: { ...preData?.backgroundStyles[`mobile_button`], bgType: "none" } }}))
                                            // setMainStyle({ ...mainStyle, backgroundStyles: { ...mainStyle?.backgroundStyles, [`${mobileCondition}button`]: { ...mainStyle?.backgroundStyles[`${mobileCondition}button`], bgType: "none" } } })
                                            // setMainStyle({ ...mainStyle, backgroundStyles: { ...mainStyle?.backgroundStyles, [`${mobileCondition}button`]: { ...mainStyle?.backgroundStyles[`${mobileCondition}button`], bgType: "none" } } })
                                        }} style={{ padding: "0.25rem 1rem", transition: "0.25s ease" }}>None</div>
                                        <div className={`${conditionVariable?.bgType === "solid" ? "bg-light-primary active-on" : ""} cursor-pointer rounded`} onClick={() => {

                                            setMainStyle((preData) => ({...preData, backgroundStyles: { ...preData?.backgroundStyles, [`button`]: { ...preData?.backgroundStyles[`button`], bgType: "solid" } }}))
                                            setMainStyle((preData) => ({...preData, backgroundStyles: { ...preData?.backgroundStyles, [`mobile_button`]: { ...preData?.backgroundStyles[`mobile_button`], bgType: "solid" } }}))

                                            // setMainStyle({ ...mainStyle, backgroundStyles: { ...mainStyle?.backgroundStyles, [`${mobileCondition}button`]: { ...mainStyle?.backgroundStyles[`${mobileCondition}button`], bgType: "solid" } } })
                                            // setMainStyle({ ...mainStyle, backgroundStyles: { ...mainStyle?.backgroundStyles, [`${mobileCondition}button`]: { ...mainStyle?.backgroundStyles[`${mobileCondition}button`], bgType: "solid" } } })
                                        }} style={{ padding: "0.25rem 1rem", transition: "0.25s ease" }}>Solid</div>
                                        <div className={`${conditionVariable?.bgType === "gradient" ? "bg-light-primary active-on" : ""} cursor-pointer rounded`} onClick={() => {
                                            setMainStyle((preData) => ({...preData, backgroundStyles: { ...preData?.backgroundStyles, [`button`]: { ...preData?.backgroundStyles[`button`], bgType: "gradient" } }}))
                                            setMainStyle((preData) => ({...preData, backgroundStyles: { ...preData?.backgroundStyles, [`mobile_button`]: { ...preData?.backgroundStyles[`mobile_button`], bgType: "gradient" } }}))
                                            
                                            // setMainStyle({ ...mainStyle, backgroundStyles: { ...mainStyle?.backgroundStyles, [`${mobileCondition}button`]: { ...mainStyle?.backgroundStyles[`${mobileCondition}button`], bgType: "gradient" } } })
                                            // setMainStyle({ ...mainStyle, backgroundStyles: { ...mainStyle?.backgroundStyles, [`${mobileCondition}button`]: { ...mainStyle?.backgroundStyles[`${mobileCondition}button`], bgType: "gradient" } } })
                                        }} style={{ padding: "0.25rem 1rem", transition: "0.25s ease" }}>Gradient</div>
                                        <div className={`${conditionVariable?.bgType === "image" ? "bg-light-primary active-on" : ""} cursor-pointer rounded`} onClick={() => {

                                            setMainStyle((preData) => ({...preData, backgroundStyles: { ...preData?.backgroundStyles, [`button`]: { ...preData?.backgroundStyles[`button`], bgType: "image" } }}))
                                            setMainStyle((preData) => ({...preData, backgroundStyles: { ...preData?.backgroundStyles, [`mobile_button`]: { ...preData?.backgroundStyles[`mobile_button`], bgType: "image" } }}))


                                            // setMainStyle({ ...mainStyle, backgroundStyles: { ...mainStyle?.backgroundStyles, [`${mobileCondition}button`]: { ...mainStyle?.backgroundStyles[`${mobileCondition}button`], bgType: "image" } } })
                                            // setMainStyle({ ...mainStyle, backgroundStyles: { ...mainStyle?.backgroundStyles, [`${mobileCondition}button`]: { ...mainStyle?.backgroundStyles[`${mobileCondition}button`], bgType: "image" } } })
                                        }} style={{ padding: "0.25rem 1rem", transition: "0.25s ease" }}>Image</div>
                                    </>
                                ) : type === "bgStyles" ? (
                                    <>
                                        <div className={`${conditionVariable?.bgType === "none" ? "bg-light-primary active-on" : ""} cursor-pointer rounded`} onClick={() => setMainStyle({ ...mainStyle, backgroundStyles: { ...mainStyle?.backgroundStyles, [`${mobileCondition}main`]: { ...mainStyle?.backgroundStyles[`${mobileCondition}main`], bgType: "none" } } })} style={{ padding: "0.25rem 1rem", transition: "0.25s ease" }}>None</div>
                                        <div className={`${conditionVariable?.bgType === "solid" ? "bg-light-primary active-on" : ""} cursor-pointer rounded`} onClick={() => setMainStyle({ ...mainStyle, backgroundStyles: { ...mainStyle?.backgroundStyles, [`${mobileCondition}main`]: { ...mainStyle?.backgroundStyles[`${mobileCondition}main`], bgType: "solid" } } })} style={{ padding: "0.25rem 1rem", transition: "0.25s ease" }}>Solid</div>
                                        <div className={`${conditionVariable?.bgType === "gradient" ? "bg-light-primary active-on" : ""} cursor-pointer rounded`} onClick={() => setMainStyle({ ...mainStyle, backgroundStyles: { ...mainStyle?.backgroundStyles, [`${mobileCondition}main`]: { ...mainStyle?.backgroundStyles[`${mobileCondition}main`], bgType: "gradient" } } })} style={{ padding: "0.25rem 1rem", transition: "0.25s ease" }}>Gradient</div>
                                        <div className={`${conditionVariable?.bgType === "image" ? "bg-light-primary active-on" : ""} cursor-pointer rounded`} onClick={() => setMainStyle({ ...mainStyle, backgroundStyles: { ...mainStyle?.backgroundStyles, [`${mobileCondition}main`]: { ...mainStyle?.backgroundStyles[`${mobileCondition}main`], bgType: "image" } } })} style={{ padding: "0.25rem 1rem", transition: "0.25s ease" }}>Image</div>
                                    </>
                                ) : type === "btnSetting" ? (
                                    <>
                                        <div className={`${conditionVariable?.bgType === "none" ? "bg-light-primary active-on" : ""} cursor-pointer rounded`} onClick={() => setMainStyle({ ...mainStyle, overlayStyles: { ...mainStyle?.overlayStyles, bgType: "none" } })} style={{ padding: "0.25rem 1rem", transition: "0.25s ease" }}>None</div>
                                        <div className={`${conditionVariable?.bgType === "solid" ? "bg-light-primary active-on" : ""} cursor-pointer rounded`} onClick={() => setMainStyle({ ...mainStyle, overlayStyles: { ...mainStyle?.overlayStyles, bgType: "solid" } })} style={{ padding: "0.25rem 1rem", transition: "0.25s ease" }}>Solid</div>
                                        <div className={`${conditionVariable?.bgType === "gradient" ? "bg-light-primary active-on" : ""} cursor-pointer rounded`} onClick={() => setMainStyle({ ...mainStyle, overlayStyles: { ...mainStyle?.overlayStyles, bgType: "gradient" } })} style={{ padding: "0.25rem 1rem", transition: "0.25s ease" }}>Gradient</div>
                                        <div className={`${conditionVariable?.bgType === "image" ? "bg-light-primary active-on" : ""} cursor-pointer rounded`} onClick={() => setMainStyle({ ...mainStyle, overlayStyles: { ...mainStyle?.overlayStyles, bgType: "image" } })} style={{ padding: "0.25rem 1rem", transition: "0.25s ease" }}>Image</div>
                                    </>
                                ) : (
                                    <>
                                        <div className={`${conditionVariable?.bgType === "none" ? "bg-light-primary active-on" : ""} cursor-pointer rounded`} onClick={() => setStyles({ ...styles, bgType: "none" })} style={{ padding: "0.25rem 1rem", transition: "0.25s ease" }}>None</div>
                                        <div className={`${conditionVariable?.bgType === "solid" ? "bg-light-primary active-on" : ""} cursor-pointer rounded`} onClick={() => setStyles({ ...styles, bgType: "solid" })} style={{ padding: "0.25rem 1rem", transition: "0.25s ease" }}>Solid</div>
                                        <div className={`${conditionVariable?.bgType === "gradient" ? "bg-light-primary active-on" : ""} cursor-pointer rounded`} onClick={() => setStyles({ ...styles, bgType: "gradient" })} style={{ padding: "0.25rem 1rem", transition: "0.25s ease" }}>Gradient</div>
                                        <div className={`${conditionVariable?.bgType === "image" ? "bg-light-primary active-on" : ""} cursor-pointer rounded`} onClick={() => setStyles({ ...styles, bgType: "image" })} style={{ padding: "0.25rem 1rem", transition: "0.25s ease" }}>Image</div>

                                    </>
                                )
                            }

                        </div>
                        <div style={{ padding: "0px 0.75rem 0.75rem" }}>
                            {conditionVariable?.bgType === "none" && <section style={{ backgroundImage: `url('${pixels}')`, aspectRatio: "4/3" }}></section>}

                            {conditionVariable?.bgType === "solid" && <SketchPicker color={getBgColor(solidBg)} onChange={(e) => {
                                const { r, g, b, a } = e.rgb
                                setSolidBg(`rgba(${r},${g},${b},${a})`)
                            }} />}

                            {conditionVariable?.bgType === "gradient" && <section>
                                <div className="d-flex flex-column align-items-stretch justify-content-between gap-2 mb-1">
                                    <div className="d-flex align-items-stretch border" style={{ backgroundImage: `url('${pixels}')` }}>
                                        <div onClick={() => setGradientBg({ ...gradientBg, activeGrad: "from" })} style={{ backgroundColor: gradientBg.from, position: "relative", zIndex: gradientBg.activeGrad === "from" ? "1" : "0", transition: "0.35s ease", outline: gradientBg.activeGrad === "from" ? "1px solid #7367f0" : "0px solid rgba(0,0,0,0)", aspectRatio: "40/9" }} className="flex-grow-1 cursor-pointer gradient-active p-0">
                                        </div>
                                        <div style={{ width: "0px", borderRight: "1px solid #d8d6de" }}></div>
                                        <div onClick={() => setGradientBg({ ...gradientBg, activeGrad: "to" })} style={{ backgroundColor: gradientBg.to, position: "relative", zIndex: gradientBg.activeGrad === "to" ? "1" : "0", transition: "0.35s ease", outline: gradientBg.activeGrad === "to" ? "1px solid #7367f0" : "0px solid rgba(0,0,0,0)", aspectRatio: "40/9" }} className="flex-grow-1 cursor-pointer gradient-active p-0">
                                        </div>
                                    </div>
                                    <input type="range" min={0} max={360} className="w-100" value={`${gradientBg.angle}`} onChange={(e) => setGradientBg({ ...gradientBg, angle: e.target.value })} style={{ backgroundColor: conditionVariable?.backgroundColor, backgroundImage: conditionVariable?.backgroundImage }} />
                                </div>
                                <SketchPicker color={getBgColor(gradientBg[gradientBg.activeGrad])} onChange={(e) => {
                                    const { r, g, b, a } = e.rgb
                                    setGradientBg({ ...gradientBg, [gradientBg.activeGrad]: `rgba(${r},${g},${b},${a})` })
                                }} />
                            </section>}

                            {conditionVariable?.bgType === "image" && <section>
                                <div onClick={triggerImage} className='w-100 border d-flex justify-content-center align-items-center position-relative cursor-pointer mb-1' style={{ aspectRatio: "16/9", backgroundImage: conditionVariable?.backgroundImage, backgroundSize: conditionVariable?.backgroundSize, backgroundRepeat: conditionVariable?.backgroundRepeat }}>
                                    {/* <input type="file" id='bg-mod-image' accept='image/*' onChange={(e) => {
                                        setBgImage(e.target.files[0])
                                    }} className="d-none" /> */}
                                    {/* <img src={conditionVariable?.backgroundImage?.split("url")[1]?.slice(1, -1)} className='w-100 h-100' alt="" /> */}
                                    <div className="bg-black position-absolute" style={{ zIndex: "1", inset: "0px", opacity: "0.5" }}></div>
                                    <span className="position-absolute" style={{ filter: "drop-shadow(0px 0px 5px rgb(0,0,0))", zIndex: "2" }}>
                                        <PlusCircle color='white' />
                                    </span>
                                </div>
                                <label className="fw-bold form-control-label">
                                    Image
                                </label>
                                <div className="mb-1">
                                    <label htmlFor="select-size" className="w-25 form-control-label">Size</label>
                                    <Select value={backgroundValues.size[backgroundValues.size.findIndex($ => $.value === backgroundSize)]} onChange={(e) => setBackgroundSize(e.value)} options={backgroundValues.size.map((ele) => {
                                        return { value: ele.value, label: ele.label }
                                    })} />
                                </div>
                                <div className="mb-1">
                                    <label htmlFor="select-repeat" className="w-25 form-control-label">Repeat</label>
                                    <Select id='select-repeat' value={backgroundValues.repeat[backgroundValues.repeat.findIndex($ => $.value === backgroundRepeat)]} onChange={(e) => setBackgroundRepeat(e.value)} options={backgroundValues.repeat.map((ele) => {
                                        return { value: ele.value, label: ele.label }
                                    })} />
                                </div>
                                <div className='mb-2'>
                                    <label htmlFor="" className="form-control-label mb-1">Vertical Alignment</label>
                                    <div className="w-100 d-flex gap-2">
                                        <button className={`btn btn-${backgroundPositionY === "top" ? "primary" : "outline-primary"}`} onClick={() => {
                                            setBackgroundPositionY("top")
                                        }} style={{ aspectRatio: "1", padding: "0.5rem" }}>
                                            <svg
                                                fill={backgroundPositionY === "top" ? 'white' : "#7367f0"}
                                                width="1.715em"
                                                height="1.715em"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M21,2H3A1,1,0,0,0,3,4H6V21a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V16h3a1,1,0,0,0,1-1V4h3a1,1,0,0,0,0-2ZM12,20H8V4h4Zm4-6H14V4h2Z" />
                                            </svg>
                                        </button>
                                        <button className={`btn btn-${backgroundPositionY === "center" ? "primary" : "outline-primary"}`} onClick={() => {
                                            setBackgroundPositionY("center")
                                        }} style={{ aspectRatio: "1", padding: "0.5rem" }}>
                                            <svg
                                                fill={backgroundPositionY === "center" ? 'white' : "#7367f0"}
                                                width="1.715em"
                                                height="1.715em"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M21,11H18V6a1,1,0,0,0-1-1H14V3a1,1,0,0,0-1-1H7A1,1,0,0,0,6,3v8H3a1,1,0,0,0,0,2H6v8a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V19h3a1,1,0,0,0,1-1V13h3a1,1,0,0,0,0-2Zm-9,9H8V4h4Zm4-3H14V7h2Z" />
                                            </svg>
                                        </button>
                                        <button className={`btn btn-${backgroundPositionY === "bottom" ? "primary" : "outline-primary"}`} onClick={() => {
                                            setBackgroundPositionY("bottom")
                                        }} style={{ aspectRatio: "1", padding: "0.5rem" }}>
                                            <svg
                                                fill={backgroundPositionY === "bottom" ? 'white' : "#7367f0"}
                                                width="1.715em"
                                                height="1.715em"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M21,20H18V9a1,1,0,0,0-1-1H14V3a1,1,0,0,0-1-1H7A1,1,0,0,0,6,3V20H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Zm-9,0H8V4h4Zm4,0H14V10h2Z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className='mb-2'>
                                    <label htmlFor="" className="form-control-label mb-1">Horizontal Alignment</label>
                                    <div className="w-100 d-flex gap-2">
                                        <button className={`btn btn-${backgroundPositionX === "left" ? "primary" : "outline-primary"}`} onClick={() => {
                                            setBackgroundPositionX("left")
                                        }} style={{ aspectRatio: "1", padding: "0.5rem" }}>
                                            <svg
                                                fill={backgroundPositionX === "left" ? "white" : "#7367f0"}
                                                width="1.715em"
                                                height="1.715em"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M21 10h-5V7a1 1 0 00-1-1H4V3a1 1 0 00-2 0v18a1 1 0 002 0v-3h17a1 1 0 001-1v-6a1 1 0 00-1-1zM4 8h10v2H4zm16 8H4v-4h16z" />
                                            </svg>
                                        </button>
                                        <button className={`btn btn-${backgroundPositionX === "center" ? "primary" : "outline-primary"}`} onClick={() => {
                                            setBackgroundPositionX("center")
                                        }} style={{ aspectRatio: "1", padding: "0.5rem" }}>
                                            <svg
                                                fill={backgroundPositionX === "center" ? "white" : "#7367f0"}
                                                width="1.715em"
                                                height="1.715em"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M21 10h-2V7a1 1 0 00-1-1h-5V3a1 1 0 00-2 0v3H6a1 1 0 00-1 1v3H3a1 1 0 00-1 1v6a1 1 0 001 1h8v3a1 1 0 002 0v-3h8a1 1 0 001-1v-6a1 1 0 00-1-1zM7 8h10v2H7zm13 8H4v-4h16z" />
                                            </svg>
                                        </button>
                                        <button className={`btn btn-${backgroundPositionX === "right" ? "primary" : "outline-primary"}`} onClick={() => {
                                            setBackgroundPositionX("right")
                                        }} style={{ aspectRatio: "1", padding: "0.5rem" }}>
                                            <svg
                                                fill={backgroundPositionX === "right" ? "white" : "#7367f0"}
                                                width="1.715em"
                                                height="1.715em"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M21 2a1 1 0 00-1 1v3H9a1 1 0 00-1 1v3H3a1 1 0 00-1 1v6a1 1 0 001 1h17v3a1 1 0 002 0V3a1 1 0 00-1-1zm-1 14H4v-4h16zm0-6H10V8h10z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </section>}
                        </div>
                        <div style={{ padding: "0px 0.75rem 0.75rem" }}><button onClick={() => setCloseState(!closeState)} className="btn btn-danger w-100">Close</button></div>
                    </CardBody>
                </Card>
            </div>

            <Modal style={{ filter: "drop-shadow(0px 0px 15px rgba(0,0,0,0.75))" }} isOpen={imgModal} toggle={() => setImgModal(!imgModal)} size='xl'>
                {/* <div className="w-100 p-1 d-flex justify-content-between align-items-center">
                    <h3 className='m-0'>Select Image</h3> <span className='cursor-pointer' onClick={() => setImgModal(!imgModal)}><X /></span>
                </div>
                <ModalBody className='position-relative' style={{ height: "85vh", overflowY: "scroll" }}>

                    {imgLoading && <div className="position-absolute d-flex justify-content-center align-items-center" style={{ inset: "0px", backgroundColor: "rgba(255,255,255,0.5)" }}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            viewBox="0 0 100 100"
                            xmlSpace="preserve"
                            style={{ width: "12.5%" }}
                        >
                            <path
                                fill="#7367f0"
                                d="M73 50c0-12.7-10.3-23-23-23S27 37.3 27 50m3.9 0c0-10.5 8.5-19.1 19.1-19.1S69.1 39.5 69.1 50"
                            >
                                <animateTransform
                                    attributeName="transform"
                                    attributeType="XML"
                                    type="rotate"
                                    dur="1s"
                                    from="0 50 50"
                                    to="360 50 50"
                                    repeatCount="indefinite"
                                />
                            </path>
                        </svg>
                    </div>}
                    <div className="p-1 pt-0 d-flex justify-content-center border-bottom">
                        <label htmlFor='uploadImg' className="btn btn-primary">Upload an Image <input onChange={e => {
                            setImgLoading(true)
                            const form_data = new FormData()
                            form_data.append("shop", outletData[0]?.web_url)
                            form_data.append("app", "superleadz")
                            form_data.append("images", e.target.files[0])
                            const imgUrl = new URL(`https://api.xircls.com/api/v1/bucket_images/`)
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
                                            <div className="p-1 bg-white text-black rounded-3 w-100">{ele?.image.split("/").at("-1")}</div>
                                            <button className="btn btn-primary w-100" onClick={() => {
                                                setBgImage(ele.image)
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
                </ModalBody> */}
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
                                                setBgImage(ele.image)
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
        </div>
    )
}

export default BgModifier