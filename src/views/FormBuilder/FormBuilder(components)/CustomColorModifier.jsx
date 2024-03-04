import React from 'react'
import { SketchPicker } from 'react-color'
import { Card, CardBody } from 'reactstrap'

const CustomColorModifier = ({ type, setMainStyle, mainStyle, pageCondition, styles, setStyles, colorType, isHex, mobileCondition, mobileConditionRev }) => {
    console.log("mobileConditionRev", `${mobileCondition}${pageCondition}`, `${mobileConditionRev}${pageCondition}`)
    const getBgColor = (colorArg) => {
        if (colorArg) {
            // console.log(colorArg)
            // console.log(colorArg.includes("rgb"))
            // console.log(colorArg.includes("hsl"))
            if (colorArg.includes("rgb")) {
                try {
                    const arr = colorArg.split("rgba")[1].slice(1, -1).split(",")
                    return { r: arr[0], g: arr[1], b: arr[2], a: arr[3] }
                } catch (_) {
                    const arr = colorArg.split("rgb")[1].slice(1, -1).split(",")
                    return { r: arr[0], g: arr[1], b: arr[2], a: "1" }
                }
            } else if (colorArg.includes("hsl")) {
                const arr = colorArg.split("hsl")[1].slice(1, -1).split(",")
                return { h: arr[0], s: arr[1], l: arr[2] }
            } else {
                // console.log(colorArg, "colorArg")
                return colorArg
            }
        }
    }

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
                {
                    styles?.backgroundImage ? (
                        <div className="position-absolute w-100 h-100" style={{ zIndex: "-1", scale: "0.8", filter: "blur(40px)", ...styles, backgroundImage: styles?.backgroundImage }}></div>
                    ) : ''
                }
                <Card className='m-0'>
                    <CardBody className='p-0'>
                        <div style={{ padding: "0.75rem" }}>
                            {
                                colorType ? (
                                    type === "cross" ? (
                                        <SketchPicker color={getBgColor(mainStyle?.crossButtons?.[`${mobileCondition}${pageCondition}`]?.[`${colorType}`])} onChange={(e) => {
                                            const { r, g, b, a } = e.rgb
                                            setMainStyle({
                                                ...mainStyle,
                                                crossButtons: {
                                                    ...mainStyle?.crossButtons,
                                                    [`${mobileCondition}${pageCondition}`]: {
                                                        ...mainStyle?.crossButtons[`${mobileCondition}${pageCondition}`],
                                                        [colorType]: `rgba(${r},${g},${b},${a})`
                                                    },
                                                    [`${mobileConditionRev}${pageCondition}`]: {
                                                        ...mainStyle?.crossButtons[`${mobileConditionRev}${pageCondition}`],
                                                        [colorType]: mainStyle?.responsiveStyles.close.includes(colorType) ? `rgba(${r},${g},${b},${a})` : mainStyle?.crossButtons[`${mobileConditionRev}${pageCondition}`]?.[colorType]
                                                    }
                                                }
                                            })
                                        }} />

                                    ) : type === "offerColors" ? (
                                        <SketchPicker color={getBgColor(mainStyle?.offerProperties?.colors[`${colorType}`])} onChange={(e) => {
                                            const { r, g, b, a } = e.rgb
                                            setMainStyle({ ...mainStyle, offerProperties: { ...mainStyle?.offerProperties, colors: { ...mainStyle?.offerProperties?.colors, [colorType]: `rgba(${r},${g},${b},${a})` } } })
                                        }} />

                                    ) : (
                                        <SketchPicker color={getBgColor(styles[colorType])} onChange={(e) => {
                                            // console.log({styles, setStyles, colorType}, "colorType")
                                            if (isHex) {
                                                setStyles({ ...styles, [colorType]: e?.hex })
                                            } else {
                                                const { r, g, b, a } = e.rgb
                                                setStyles({ ...styles, [colorType]: `rgba(${r},${g},${b},${a})` })
                                            }
                                        }} />
                                    )

                                ) : (
                                    type === "cross" ? (
                                        <SketchPicker color={getBgColor(mainStyle?.crossButtons?.[`${mobileCondition}${pageCondition}`]?.[`${colorType}`])} onChange={(e) => {
                                            const { r, g, b, a } = e.rgb
                                            setMainStyle({
                                                ...mainStyle,
                                                crossButtons: {
                                                    ...mainStyle?.crossButtons,
                                                    [`${mobileCondition}${pageCondition}`]: {
                                                        ...mainStyle?.crossButtons[`${mobileCondition}${pageCondition}`],
                                                        [colorType]: `rgba(${r},${g},${b},${a})`
                                                    },
                                                    [`${mobileConditionRev}${pageCondition}`]: {
                                                        ...mainStyle?.crossButtons[`${mobileConditionRev}${pageCondition}`],
                                                        [colorType]: mainStyle?.responsiveStyles.close.includes(colorType) ? `rgba(${r},${g},${b},${a})` : mainStyle?.crossButtons[`${mobileConditionRev}${pageCondition}`]?.[colorType]
                                                    }
                                                }
                                            })
                                        }} />

                                    ) : type === "offerColors" ? (
                                        <SketchPicker color={getBgColor(mainStyle?.offerProperties?.colors[`${colorType}`])} onChange={(e) => {
                                            const { r, g, b, a } = e.rgb
                                            setMainStyle({ ...mainStyle, offerProperties: { ...mainStyle?.offerProperties, colors: { ...mainStyle?.offerProperties?.colors, [colorType]: `rgba(${r},${g},${b},${a})` } } })
                                        }} />

                                    ) : (
                                        <SketchPicker color={getBgColor(styles[colorType])} onChange={(e) => {
                                            // console.log({styles, setStyles, colorType}, "colorType")
                                            if (isHex) {
                                                setStyles({ ...styles, [colorType]: e?.hex })
                                            } else {
                                                const { r, g, b, a } = e.rgb
                                                setStyles({ ...styles, [colorType]: `rgba(${r},${g},${b},${a})` })
                                            }
                                        }} />
                                    )
                                )
                            }
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default CustomColorModifier