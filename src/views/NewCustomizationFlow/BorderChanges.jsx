import React, { useEffect, useState } from 'react'
import { Link2 } from 'react-feather'
import Select from 'react-select'
import { Modal } from 'reactstrap'
import CustomColorModifier from '../FormBuilder/FormBuilder(components)/CustomColorModifier'

const splitColor = (color, type) => {
    if (color.includes("rgb")) {
        return color.slice(type === "color" ? color.indexOf("rgb") : 0, type === "color" ? color.length : color.indexOf("rgb"))
    } else if (color.includes("hsl")) {
        return color.slice(type === "color" ? color.indexOf("hsl") : 0, type === "color" ? color.length : color.indexOf("hsl"))
    } else {
        return color.slice(type === "color" ? color.indexOf("#") : 0, type === "color" ? color.length : color.indexOf("#"))
    }
}

const getLinked = (obj) => {
    // let isLink = false
    try {
        return (parseFloat(obj?.borderTopLeftRadius) === parseFloat(obj?.borderTopRightRadius)) && (parseFloat(obj?.borderTopRightRadius) === parseFloat(obj?.borderBottomRightRadius)) && (parseFloat(obj?.borderBottomRightRadius) === parseFloat(obj?.borderBottomLeftRadius)) && (parseFloat(obj?.borderBottomLeftRadius) === parseFloat(obj?.borderTopLeftRadius))
    } catch (_) {
        return false
    }
}

const BorderChange = ({ styles, setStyles, type, mainStyle, setMainStyle, mobileCondition, getMDToggle, pageCondition }) => {
    let conditionVariable

    if (type === "bgStyles") {
        conditionVariable = { ...mainStyle?.backgroundStyles?.[`${mobileCondition}main`] }
    } else if (type === "btnStyles") {
        conditionVariable = { ...mainStyle?.backgroundStyles?.[`${mobileCondition}button`] }
    } else {
        conditionVariable = styles
    }
    const [linked, setLinked] = useState(getLinked(conditionVariable))
    const [customColorModal, setCustomColorModal] = useState(false)
    const initialSize = splitColor((conditionVariable?.boxShadow && conditionVariable?.boxShadow !== "none") ? conditionVariable?.boxShadow : "0px 0px 0px 0px rgba(0,0,0,1)", "size")
    const [shadowSize, setShadowSize] = useState(initialSize?.includes("inset") ? initialSize?.split("inset")[1] : initialSize)
    const [shadowColor, setShadowColor] = useState({ color: splitColor((conditionVariable?.boxShadow && conditionVariable?.boxShadow !== "none") ? conditionVariable?.boxShadow : "0px 0px 0px 0px rgba(0,0,0,1)", "color"), borderColor: conditionVariable?.borderColor || "#000000" })
    const [colorType, setColorType] = useState("")
    const [shInset, setShInset] = useState(conditionVariable?.boxShadow?.includes("inset"))
    // console.log("BorderChange", conditionVariable)

    const borderTypes = [
        { value: 'none', label: 'None' },
        { value: 'full', label: 'Full' },
        { value: 'top', label: 'Top' },
        { value: 'right', label: 'Right' },
        { value: 'bottom', label: 'Bottom' },
        { value: 'left', label: 'Left' },
        { value: 'topbottom', label: 'Top Bottom' },
        { value: 'leftright', label: 'Left Right' }
    ]

    const borderStyles = [
        { value: 'solid', label: 'Solid' },
        { value: 'dashed', label: 'Dashed' },
        { value: 'dotted', label: 'Dotted' }
    ]

    const boxShadowOptions = [
        { value: '0px 0px 0px 0px', label: 'None' },
        { value: '0px 0px 10px 2.5px', label: 'Normal' },
        { value: '0px 0px 20px 5px', label: 'Medium' },
        { value: '0px 0px 30px 7.5px', label: 'Large' }
    ]

    // const [borderWidth, setBorderWidth] = useState(conditionVariable?.borderWidth)
    // const [borderColor, setBorderColor] = useState(conditionVariable?.borderColor)
    // const [borderStyle, setBorderStyle] = useState(conditionVariable?.borderStyle)

    // const [borderObj, setBorderObj] = useState({})
    const [lastValue, setLastValue] = useState(conditionVariable?.borderTopLeftRadius || "0px")

    // console.log(conditionVariable)

    const handleInputChange = (event) => {
        // if (numberRegex.test(parseFloat(event.target.value)) || parseFloat(event.target.value) === "") {
        setLastValue(`${parseFloat(event.target.value)}px`)
        if (linked) {
            if (type === "bgStyles") {
                setMainStyle({ ...mainStyle, backgroundStyles: { ...mainStyle?.backgroundStyles, [`${mobileCondition}main`]: { ...mainStyle?.backgroundStyles?.[`${mobileCondition}main`], borderTopLeftRadius: `${parseFloat(event.target.value)}px`, borderTopRightRadius: `${parseFloat(event.target.value)}px`, borderBottomRightRadius: `${parseFloat(event.target.value)}px`, borderBottomLeftRadius: `${parseFloat(event.target.value)}px` } } })
            } else if (type === "btnStyles") {
                setMainStyle({ ...mainStyle, backgroundStyles: { ...mainStyle?.backgroundStyles, [`${mobileCondition}button`]: { ...mainStyle?.backgroundStyles?.[`${mobileCondition}button`], borderTopLeftRadius: `${parseFloat(event.target.value)}px`, borderTopRightRadius: `${parseFloat(event.target.value)}px`, borderBottomRightRadius: `${parseFloat(event.target.value)}px`, borderBottomLeftRadius: `${parseFloat(event.target.value)}px` } } })
            } else {
                setStyles({ ...conditionVariable, borderTopLeftRadius: `${parseFloat(event.target.value)}px`, borderTopRightRadius: `${parseFloat(event.target.value)}px`, borderBottomRightRadius: `${parseFloat(event.target.value)}px`, borderBottomLeftRadius: `${parseFloat(event.target.value)}px` })
            }
        } else {
            if (type === "bgStyles") {
                setMainStyle({ ...mainStyle, backgroundStyles: { ...mainStyle?.backgroundStyles, [`${mobileCondition}main`]: { ...mainStyle?.backgroundStyles?.[`${mobileCondition}main`], [event.target.name]: `${parseFloat(event.target.value)}px` } } })
            } else if (type === "btnStyles") {
                setMainStyle({ ...mainStyle, backgroundStyles: { ...mainStyle?.backgroundStyles, [`${mobileCondition}button`]: { ...mainStyle?.backgroundStyles?.[`${mobileCondition}button`], [event.target.name]: `${parseFloat(event.target.value)}px` } } })
            } else {
                setStyles({ ...conditionVariable, [event.target.name]: `${parseFloat(event.target.value)}px` })
            }
        }
        // }
    }

    useEffect(() => {
        if (linked) {
            if (type === "bgStyles") {
                setMainStyle({ ...mainStyle, backgroundStyles: { ...mainStyle?.backgroundStyles, [`${mobileCondition}main`]: { ...mainStyle?.backgroundStyles?.[`${mobileCondition}main`], borderTopLeftRadius: lastValue, borderTopRightRadius: lastValue, borderBottomRightRadius: lastValue, borderBottomLeftRadius: lastValue } } })
            } else if (type === "btnStyles") {
                setMainStyle({ ...mainStyle, backgroundStyles: { ...mainStyle?.backgroundStyles, [`${mobileCondition}button`]: { ...mainStyle?.backgroundStyles?.[`${mobileCondition}button`], borderTopLeftRadius: lastValue, borderTopRightRadius: lastValue, borderBottomRightRadius: lastValue, borderBottomLeftRadius: lastValue } } })
            } else {
                setStyles({ ...conditionVariable, borderTopLeftRadius: lastValue, borderTopRightRadius: lastValue, borderBottomRightRadius: lastValue, borderBottomLeftRadius: lastValue })
            }
        }
    }, [linked])
    useEffect(() => {
        let borderWidth = conditionVariable?.defBorderWidth
        if (conditionVariable?.borderType === "none") {
            borderWidth = "0px"
        } else if (conditionVariable?.borderType === "full") {
            borderWidth = `${conditionVariable?.defBorderWidth} ${conditionVariable?.defBorderWidth} ${conditionVariable?.defBorderWidth} ${conditionVariable?.defBorderWidth}`
        } else if (conditionVariable?.borderType === "top") {
            borderWidth = `${conditionVariable?.defBorderWidth} 0px 0px 0px`
        } else if (conditionVariable?.borderType === "right") {
            borderWidth = `0px ${conditionVariable?.defBorderWidth} 0px 0px`
        } else if (conditionVariable?.borderType === "bottom") {
            borderWidth = `0px 0px ${conditionVariable?.defBorderWidth} 0px`
        } else if (conditionVariable?.borderType === "left") {
            borderWidth = `0px 0px 0px ${conditionVariable?.defBorderWidth}`
        } else if (conditionVariable?.borderType === "topbottom") {
            borderWidth = `${conditionVariable?.defBorderWidth} 0px ${conditionVariable?.defBorderWidth} 0px`
        } else if (conditionVariable?.borderType === "leftright") {
            borderWidth = `0px ${conditionVariable?.defBorderWidth}  0px ${conditionVariable?.defBorderWidth}`
        }

        if (type === "bgStyles") {
            setMainStyle({ ...mainStyle, backgroundStyles: { ...mainStyle?.backgroundStyles, [`${mobileCondition}main`]: { ...mainStyle?.backgroundStyles?.[`${mobileCondition}main`], borderWidth } } })
        } else if (type === "btnStyles") {
            setMainStyle({ ...mainStyle, backgroundStyles: { ...mainStyle?.backgroundStyles, [`${mobileCondition}button`]: { ...mainStyle?.backgroundStyles?.[`${mobileCondition}button`], borderWidth } } })
        } else {
            setStyles({ ...conditionVariable, borderWidth })
        }
    }, [conditionVariable?.defBorderWidth])

    useEffect(() => {
        if (type === "bgStyles") {
            setMainStyle({ ...mainStyle, backgroundStyles: { ...mainStyle?.backgroundStyles, [`${mobileCondition}main`]: { ...mainStyle?.backgroundStyles?.[`${mobileCondition}main`], boxShadow: `${shInset ? "inset" : ""} ${shadowSize} ${shadowColor.color}`, borderColor: shadowColor.borderColor } } })
        } else if (type === "btnStyles") {
            setMainStyle({ ...mainStyle, backgroundStyles: { ...mainStyle?.backgroundStyles, [`${mobileCondition}button`]: { ...mainStyle?.backgroundStyles?.[`${mobileCondition}button`], boxShadow: `${shInset ? "inset" : ""} ${shadowSize} ${shadowColor.color}`, borderColor: shadowColor.borderColor } } })
        } else {
            setStyles({ ...conditionVariable, boxShadow: `${shInset ? "inset" : ""} ${shadowSize} ${shadowColor.color}`, borderColor: shadowColor.borderColor })
        }
    }, [shadowSize, shadowColor.color, shadowColor.borderColor, shInset])

    return (
        <div>
            <div className='p-0 mx-0 my-1'>
                <div className='p-0 mb-2 justify-content-start align-items-center'>
                    {getMDToggle ? getMDToggle({ label: "Border Type: ", value: "borderType"}, type === "bgStyles" || type === "btnStyles" ? pageCondition : false) : <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Border:</span>}
                    <Select value={borderTypes[borderTypes.findIndex($ => $.value === conditionVariable?.borderType)]} onChange={e => {
                        const newDefBorderWidth = conditionVariable?.defBorderWidth === "0px" ? "10px" : conditionVariable?.defBorderWidth
                        let borderWidth
                        if (e.value === "none") {
                            borderWidth = "0px"
                        } else if (e.value === "full") {
                            borderWidth = `${newDefBorderWidth} ${newDefBorderWidth} ${newDefBorderWidth} ${newDefBorderWidth}`
                        } else if (e.value === "top") {
                            borderWidth = `${newDefBorderWidth} 0px 0px 0px`
                        } else if (e.value === "right") {
                            borderWidth = `0px ${newDefBorderWidth} 0px 0px`
                        } else if (e.value === "bottom") {
                            borderWidth = `0px 0px ${newDefBorderWidth} 0px`
                        } else if (e.value === "left") {
                            borderWidth = `0px 0px 0px ${newDefBorderWidth}`
                        } else if (e.value === "topbottom") {
                            borderWidth = `${newDefBorderWidth} 0px ${newDefBorderWidth} 0px`
                        } else if (e.value === "leftright") {
                            borderWidth = ` 0px ${newDefBorderWidth} 0px ${newDefBorderWidth}`
                        }

                        if (type === "bgStyles") {
                            setMainStyle({ ...mainStyle, backgroundStyles: { ...mainStyle?.backgroundStyles, [`${mobileCondition}main`]: { ...mainStyle?.backgroundStyles?.[`${mobileCondition}main`], borderType: e.value, borderWidth, defBorderWidth: newDefBorderWidth } } })
                        } else if (type === "btnStyles") {
                            setMainStyle({ ...mainStyle, backgroundStyles: { ...mainStyle?.backgroundStyles, [`${mobileCondition}button`]: { ...mainStyle?.backgroundStyles?.[`${mobileCondition}button`], borderType: e.value, borderWidth, defBorderWidth: newDefBorderWidth } } })
                        } else {
                            setStyles({ ...conditionVariable, borderType: e.value, borderWidth, defBorderWidth: newDefBorderWidth })
                        }
                    }} options={borderTypes} />
                </div>
                {conditionVariable?.borderType !== "none" && <div className='p-0 mb-2 justify-content-start align-items-center'>
                    {getMDToggle ? getMDToggle({ label: "Border Style: ", value: "borderStyle" }, type === "bgStyles" || type === "btnStyles" ? pageCondition : false) : <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Border Style:</span>}
                    <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Border Style:</span>
                    <Select value={borderStyles[borderStyles?.findIndex($ => $.value === conditionVariable?.borderStyle)]} onChange={e => {
                        if (type === "bgStyles") {
                            setMainStyle({ ...mainStyle, backgroundStyles: { ...mainStyle?.backgroundStyles, [`${mobileCondition}main`]: { ...mainStyle?.backgroundStyles?.[`${mobileCondition}main`], borderStyle: e.value } } })
                        } else if (type === "btnStyles") {
                            setMainStyle({ ...mainStyle, backgroundStyles: { ...mainStyle?.backgroundStyles, [`${mobileCondition}button`]: { ...mainStyle?.backgroundStyles?.[`${mobileCondition}button`], borderStyle: e.value } } })
                        } else {
                            setStyles({ ...conditionVariable, borderStyle: e.value })
                        }
                    }} options={borderStyles} />
                </div>}
                {conditionVariable?.borderType !== "none" && <div className='p-0 mb-2 justify-content-start align-items-center'>
                    {getMDToggle ? getMDToggle({ label: "Border Color: ", value: "borderColor" }, type === "bgStyles" || type === "btnStyles" ? pageCondition : false) : <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Border Color:</span>}
                    <div className="p-1 w-100 border cursor-pointer rounded" style={{ backgroundColor: shadowColor?.borderColor }} onClick={() => {
                        setColorType("borderColor")
                        setCustomColorModal(!customColorModal)
                    }}></div>
                </div>}
                {conditionVariable?.borderType !== "none" && <div className='mb-2'>
                    {getMDToggle ? getMDToggle({ label: "Border Width: ", value: ["borderWidth", "defBorderWidth"] }, type === "bgStyles" || type === "btnStyles" ? pageCondition : false) : <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Border Width:</span>}
                    <div className="p-0 justify-content-start align-items-center gap-2">
                        <input type='range' value={parseFloat(conditionVariable?.defBorderWidth)} className='w-100' onChange={e => {
                            if (type === "bgStyles") {
                                setMainStyle({ ...mainStyle, backgroundStyles: { ...mainStyle?.backgroundStyles, [`${mobileCondition}main`]: { ...mainStyle?.backgroundStyles?.[`${mobileCondition}main`], defBorderWidth: `${e.target.value}px` } } })
                            } else if (type === "btnStyles") {
                                setMainStyle({ ...mainStyle, backgroundStyles: { ...mainStyle?.backgroundStyles, [`${mobileCondition}button`]: { ...mainStyle?.backgroundStyles?.[`${mobileCondition}button`], defBorderWidth: `${e.target.value}px` } } })
                            } else {
                                setStyles({ ...conditionVariable, defBorderWidth: `${e.target.value}px` })
                            }
                        }} name="height" min="0" max="40" />
                    </div>
                </div>}
                <div className='d-flex flex-column text-start mb-2'>
                    {getMDToggle ? getMDToggle({ label: "Corner radius: ", value: ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"] }, type === "bgStyles" || type === "btnStyles" ? pageCondition : false) : <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Corner radius:</span>}
                    <div className='match-height m-auto' style={{ aspectRatio: '1', gridTemplateColumns: '1fr 1fr 1fr', display: 'grid', width: '100%' }}>
                        <div style={{ aspectRatio: "1" }} className="p-0 m-0 d-flex justify-content-center align-items-center">
                            <input onChange={handleInputChange} value={parseFloat(conditionVariable?.borderTopLeftRadius)} name='borderTopLeftRadius' type="number" min="0" step="1" placeholder="0" className="form-control w-100" />
                        </div>
                        <div style={{ aspectRatio: "1" }}></div>
                        <div style={{ aspectRatio: "1" }} className="flex-grow-1 d-flex justify-content-center align-items-center">
                            <input onChange={handleInputChange} value={parseFloat(conditionVariable?.borderTopRightRadius)} name='borderTopRightRadius' type="number" min="0" step="1" placeholder="0" className="form-control" />
                        </div>
                        <div style={{ aspectRatio: "1" }}></div>
                        <div onClick={() => setLinked(!linked)} className={`d-flex justify-content-center align-items-center cursor-pointer p-1`}>
                            <span className={`text-center  ${linked ? 'bg-dark text-white' : 'text-dark bg-white'} p-1 rounded`} style={{ fontSize: "12px" }}>Appl{linked ? "ied" : "y"} to all sides</span>
                            {/* <Link2 size={18} strokeWidth={2.5} style={{ transform: 'rotate(-45deg)', color: linked ? '#7367f0' : '' }} /> */}
                        </div>
                        <div style={{ aspectRatio: "1" }}></div>
                        <div style={{ aspectRatio: "1" }} className="flex-grow-1 d-flex justify-content-center align-items-center">
                            <input onChange={handleInputChange} value={parseFloat(conditionVariable?.borderBottomLeftRadius)} name='borderBottomLeftRadius' type="number" min="0" step="1" placeholder="0" className="form-control" />
                        </div>
                        <div style={{ aspectRatio: "1" }}></div>
                        <div style={{ aspectRatio: "1" }} className="flex-grow-1 d-flex justify-content-center align-items-center">
                            <input onChange={handleInputChange} value={parseFloat(conditionVariable?.borderBottomRightRadius)} name='borderBottomRightRadius' type="number" min="0" step="1" placeholder="0" className="form-control" />
                        </div>
                    </div>
                </div>
                <div className='p-0 mb-2 justify-content-start align-items-center'>
                    {getMDToggle ? getMDToggle({ label: "Shadow: ", value: "boxShadow" }, type === "bgStyles" || type === "btnStyles" ? pageCondition : false) : <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Shadow:</span>}
                    <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Size:</span>
                    <Select value={styles?.boxShadow === "none" ? boxShadowOptions[boxShadowOptions?.findIndex($ => $.value === "0px 0px 0px 0px")] : boxShadowOptions[boxShadowOptions.findIndex($ => $.value === shadowSize.trim())]} onChange={e => {
                        setShadowSize(e.value)
                    }} options={boxShadowOptions} />
                </div>
                {shadowSize.trim() !== "0px 0px 0px 0px" && <div className='p-0 mb-2 justify-content-start align-items-center'>
                    <span className='fw-bolder text-black mb-1' style={{ fontSize: "0.75rem" }}>Color:</span>
                    <div className="p-1 w-100 border cursor-pointer rounded" style={{ backgroundColor: shadowColor.color }} onClick={() => {
                        setColorType("color")
                        setCustomColorModal(!customColorModal)
                    }}></div>
                </div>}
                {shadowSize.trim() !== "0px 0px 0px 0px" && <div className="form-check form-check-success mb-2 mx-0 p-0 d-flex align-items-center justify-content-between">
                    <label className='fw-bolder text-black form-check-label m-0 p-0' style={{ fontSize: "0.75rem" }}>Inset</label><input checked={shInset} onChange={(e) => {
                        setShInset(e.target.checked)
                    }} type="checkbox" className="form-check-input m-0" /></div>}
            </div>
            <Modal onClick={() => setCustomColorModal(!customColorModal)} toggle={() => setCustomColorModal(!customColorModal)} className='hide-backdrop' isOpen={customColorModal} style={{ width: "300px", maxWidth: "90%", margin: "0px" }}>
                <CustomColorModifier styles={shadowColor} setStyles={setShadowColor} colorType={colorType} />
            </Modal>
        </div>
    )
}

export default BorderChange

// borderTopLeftRadius: "0px", borderTopRightRadius: "0px", borderBottomRightRadius: "0px", borderBottomLeftRadius