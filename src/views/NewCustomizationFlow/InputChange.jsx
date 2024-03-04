import React, { useEffect, useState } from 'react'
import { Link2 } from 'react-feather'

const InputChange = ({ parentType, setMainStyle, mainStyle, mobileCondition, allValues, setAllValues, type, hideLabel }) => {
  const [linked, setLinked] = useState(false)
  const [lastValue, setLastValue] = useState("")

  const handleInputChange = (event) => {

    // const numberRegex = /^-?\d+\.?\d*$/
    setLastValue(`${event.target.value}px`)
    if (parentType === "btnStyles") {
      if (linked) {
        setMainStyle({ ...mainStyle, backgroundStyles: { ...mainStyle?.backgroundStyles, [`${mobileCondition}button`]: { ...mainStyle?.backgroundStyles[`${mobileCondition}button`], [`${type}Top`]: `${event.target.value}px`, [`${type}Left`]: `${event.target.value}px`, [`${type}Bottom`]: `${event.target.value}px`, [`${type}Right`]: `${event.target.value}px` } } })
      } else {
        setMainStyle({ ...mainStyle, backgroundStyles: { ...mainStyle?.backgroundStyles, [`${mobileCondition}button`]: { ...mainStyle?.backgroundStyles[`${mobileCondition}button`], [`${type}${event.target.name}`]: `${event.target.value}px` } } })
      }
    } else if (parentType === "bgStyles") {
      if (linked) {
        setMainStyle({ ...mainStyle, backgroundStyles: { ...mainStyle?.backgroundStyles, [`${mobileCondition}main`]: { ...mainStyle?.backgroundStyles[`${mobileCondition}main`], [`${type}Top`]: `${event.target.value}px`, [`${type}Left`]: `${event.target.value}px`, [`${type}Bottom`]: `${event.target.value}px`, [`${type}Right`]: `${event.target.value}px` } } })
      } else {
        setMainStyle({ ...mainStyle, backgroundStyles: { ...mainStyle?.backgroundStyles, [`${mobileCondition}main`]: { ...mainStyle?.backgroundStyles[`${mobileCondition}main`], [`${type}${event.target.name}`]: `${event.target.value}px` } } })
      }
    } else {
      if (linked) {
        setAllValues({ ...allValues, [`${type}Top`]: `${event.target.value}px`, [`${type}Left`]: `${event.target.value}px`, [`${type}Bottom`]: `${event.target.value}px`, [`${type}Right`]: `${event.target.value}px` })
      } else {
        setAllValues({ ...allValues, [`${type}${event.target.name}`]: `${event.target.value}px` })
      }

    }
  }

  useEffect(() => {
    if (linked) {
      if (parentType === "btnStyles") {
        setMainStyle({ ...mainStyle, backgroundStyles: { ...mainStyle?.backgroundStyles, [`${mobileCondition}button`]: { ...mainStyle?.backgroundStyles[`${mobileCondition}button`], [`${type}Top`]: lastValue, [`${type}Left`]: lastValue, [`${type}Bottom`]: lastValue, [`${type}Right`]: lastValue } } })
      } else if (parentType === "bgStyles") {
        setMainStyle({ ...mainStyle, backgroundStyles: { ...mainStyle?.backgroundStyles, [`${mobileCondition}main`]: { ...mainStyle?.backgroundStyles[`${mobileCondition}main`], [`${type}Top`]: lastValue, [`${type}Left`]: lastValue, [`${type}Bottom`]: lastValue, [`${type}Right`]: lastValue } } })
      } else {
        setAllValues({ ...allValues, [`${type}Top`]: lastValue, [`${type}Left`]: lastValue, [`${type}Bottom`]: lastValue, [`${type}Right`]: lastValue })
      }
    }
  }, [linked])

  return (
    <div>
      <div className='my-1'>
        {!hideLabel && <label className='text-capitalize' style={{ marginBottom: '0.3rem' }}>{type}</label>}
        <div style={{ aspectRatio: '1', gridTemplateColumns: '1fr 1fr 1fr', display: 'grid' }}>
          <div></div>
          <div className="d-flex justify-content-center align-items-center">
            <input
              type="number"
              name={"Top"}
              min="0"
              step="1"
              placeholder="0"
              className="form-control w-100"

              onChange={(e) => {
                if (!isNaN(Number(e.target.value))) {
                  handleInputChange(e)
                }
              }}
              value={allValues[`${type}Top`] ? allValues[`${type}Top`].split("px")[0] : "0px"}
            />
            {/* {getMDToggle({label: "Top", value: `${type}Top`})} */}
          </div>
          <div></div>
          <div className="d-flex justify-content-center align-items-center">
            <input
              type="number"
              name={"Left"}
              min="0"
              step="1"
              placeholder="0"
              className="form-control"
              value={allValues[`${type}Left`] ? allValues[`${type}Left`].split("px")[0] : "0px"}
              onChange={(e) => {
                if (!isNaN(Number(e.target.value))) {
                  handleInputChange(e)
                }
              }}
            />
            {/* {getMDToggle({label: "Left", value: `${type}Left`})} */}
          </div>
          <div onClick={() => setLinked(!linked)} className={`d-flex justify-content-center align-items-center cursor-pointer p-1`}>
            <span className={`text-center  ${linked ? 'bg-dark text-white' : 'text-dark bg-white'} p-1 rounded`} style={{fontSize: "12px"}}>Appl{linked ? "ied" : "y"} to all sides</span>
            {/* <Link2 size={18} strokeWidth={2.5} style={{ transform: 'rotate(-45deg)', color: linked ? '#7367f0' : '' }} /> */}
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <input
              type="number"
              name={"Right"}
              min="0"
              step="1"
              placeholder="0"
              className="form-control"
              value={allValues[`${type}Right`] ? allValues[`${type}Right`].split("px")[0] : "0px"}
              onChange={(e) => {
                if (!isNaN(Number(e.target.value))) {
                  handleInputChange(e)
                }
              }}
            />
            {/* {getMDToggle({label: "Right", value: `${type}Right`})} */}
          </div>
          <div></div>
          <div className="d-flex justify-content-center align-items-center">
            <input
              type="number"
              name={"Bottom"}
              min="0"
              step="1"
              placeholder="0"
              className="form-control"
              value={allValues[`${type}Bottom`] ? allValues[`${type}Bottom`].split("px")[0] : "0px"}
              onChange={(e) => {
                if (!isNaN(Number(e.target.value))) {
                  handleInputChange(e)
                }
              }}
            />
            {/* {getMDToggle({label: "Bottom", value: `${type}Bottom`})} */}
          </div>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default InputChange