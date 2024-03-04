import React from 'react'
import { AlignCenter, AlignLeft, AlignRight } from 'react-feather'

const FontChange = () => {
    // const [linked, setLinked] = useState(false)
    // const [lastValue, setLastValue] = useState("")
  
    // console.log(allValues)
  
    // const handleInputChange = (event) => {
  
    //   // const numberRegex = /^-?\d+\.?\d*$/
    //   setLastValue(`${event.target.value}px`)
    //   if (linked) {
    //     setAllValues({ ...allValues, [`${type}Top`]: `${event.target.value}px`, [`${type}Left`]: `${event.target.value}px`, [`${type}Bottom`]: `${event.target.value}px`, [`${type}Right`]: `${event.target.value}px` })
    //   } else {
    //     setAllValues({ ...allValues, [`${type}${event.target.name}`]: `${event.target.value}px` })
    //   }
    // }
  
    // useEffect(() => {
    //   if (linked) {
    //     setAllValues({ ...allValues, [`${type}Top`]: lastValue, [`${type}Left`]: lastValue, [`${type}Bottom`]: lastValue, [`${type}Right`]: lastValue })
    //   }
    // }, [linked])

  return (
    <div>
        <div className='p-0 mx-0 my-1'>
            <div className='my-1'>
                <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Color</span>
                <input
                    type="color"
                    className="w-50"
                    name="color"
                />
            </div>
            <div className='my-1'>
                <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Font Size:</span>
                <div className="p-0 justify-content-start align-items-center gap-2">
                    <input type='range' className='w-100' name="height" min="0" max="300" />
                </div>
            </div>
            <div className="d-flex justify-content-between my-1" style={{ alignItems: "flex-end" }}>
                <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Style:</span>
                <div className="d-flex flex-row flex-0">
                    <button data-v-6f3bf591="" type="button" aria-hidden="true" className="me-1 btn btn-link design-system" style={{ minWidth: "0rem", padding: "unset" }}>
                        <span data-v-6f3bf591="" className="d-inline-flex justify-content-center align-items-center">
                            <Bold size={18} />
                        </span>
                    </button>
                    <button data-v-6f3bf591="" type="button" aria-hidden="true" className="me-1 btn btn-link design-system" style={{ minWidth: "0rem", padding: "unset" }}>
                        <span data-v-6f3bf591="" className="d-inline-flex justify-content-center align-items-center">
                            <Italic size={18} />
                        </span>
                    </button>
                    <button data-v-6f3bf591="" type="button" aria-hidden="true" className=" btn btn-link design-system selected" style={{ minWidth: "0rem", padding: "unset" }}>
                        <span data-v-6f3bf591="" className="d-inline-flex justify-content-center align-items-center">
                            <Underline size={18} />
                        </span>
                    </button>
                </div>
            </div>
            <div className="d-flex justify-content-start my-1" style={{ alignItems: "flex-end" }}>
                <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Style:</span>
                <div className="d-flex flex-row flex-0">
                    <button data-v-6f3bf591="" type="button" aria-hidden="true" className="me-1 btn btn-link design-system" style={{ minWidth: "0rem", padding: "unset" }}>
                        <span data-v-6f3bf591="" className="d-inline-flex justify-content-center align-items-center">
                            <AlignLeft size={18} />
                        </span>
                    </button>
                    <button data-v-6f3bf591="" type="button" aria-hidden="true" className="me-1 btn btn-link design-system" style={{ minWidth: "0rem", padding: "unset" }}>
                        <span data-v-6f3bf591="" className="d-inline-flex justify-content-center align-items-center">
                            <AlignCenter size={18} />
                        </span>
                    </button>
                    <button data-v-6f3bf591="" type="button" aria-hidden="true" className=" btn btn-link design-system selected" style={{ minWidth: "0rem", padding: "unset" }}>
                        <span data-v-6f3bf591="" className="d-inline-flex justify-content-center align-items-center">
                            <AlignRight size={18} />
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FontChange