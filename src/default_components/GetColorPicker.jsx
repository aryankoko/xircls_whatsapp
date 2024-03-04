import React, { useState } from 'react'
import { SketchPicker } from "react-color"

const GetColorPicker = () => {
    const [colorValue, setColorValue] = useState('')
    console.log(colorValue)
    return (
        <SketchPicker color={colorValue.rgb} onChange={$ => setColorValue($)} />
    )
}
export default GetColorPicker