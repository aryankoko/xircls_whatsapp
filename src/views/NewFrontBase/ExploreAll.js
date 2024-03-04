import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { Minus, MinusCircle, Plus, PlusCircle } from "react-feather"
import { Tooltip } from "reactstrap"
import './NewFrontBase.css'

const ExploreAll = (props) => {
    const widthRef = useRef(0)

    const [tooltipOpen, setTooltipOpen] = useState([])
    const toggle = (i, type, enter) => {
        const newArr = [...tooltipOpen]
        newArr[i] = { add: false, sub: false }
        newArr[i][type] = enter
        setTooltipOpen(newArr)
    }

    const [widthCard, setWidthCard] = useState(0)

    const { loop, setShowAll } = props

    useLayoutEffect(() => {
        setWidthCard(widthRef.current.offsetWidth / 5)
    }, [])

    useEffect(() => {
        const newArr = [...tooltipOpen, { add: false, sub: false }]
        setTooltipOpen(newArr)
    }, [])
    return (
        <>
            <div ref={widthRef} className="carousel-container row row-cols-5 p-0 justify-content-between">
                {
                    loop.map((ele, i) => {

                        return (
                            <div key={i} className={`carousel-card col mb-3`} style={{ maxWidth: `${widthCard}px` }}>
                                <div className="d-flex flex-column align-items-center position-relative comp-details">
                                    <div onClick={() => setShowAll(false)} className="cursor-pointer d-flex justify-content-center align-items-center position-relative w-100">
                                        <img width={'75%'} src={ele.image ? ele.image : 'https://media.cheggcdn.com/media/012/01218fc2-837d-497c-8f06-012e5d922ab9/phpwQqFlz'} alt="" style={{ aspectRatio: '11/8', borderRadius: '1.25rem' }} />
                                        {/* <img width={'80%'} src={ele.image} alt="" className="mb-2" style={{ aspectRatio: '11/8', borderRadius: '1.25rem', position: 'absolute', zIndex: '-1', opacity: '0.85', filter: 'blur(7.5px)' }} /> */}
                                    </div>
                                    <div className="d-flex justify-content-center gap-2 comp-buttons">
                                        <button onMouseEnter={() => toggle(i, 'sub', true)} onMouseLeave={() => toggle(i, 'sub', false)} id={`sub-${i}`} className="btn text-white" style={{ padding: '0.25rem' }}><Minus strokeWidth={2} stroke={'black'} size={20} /></button>
                                        <button onMouseEnter={() => toggle(i, 'add', true)} onMouseLeave={() => toggle(i, 'add', false)} id={`add-${i}`} className="btn text-white" style={{ padding: '0.25rem' }}><Plus strokeWidth={2} stroke={'black'} size={20} /></button>
                                        <Tooltip
                                            isOpen={tooltipOpen[i]?.sub}
                                            target={`sub-${i}`}
                                        >
                                            Remove Company
                                        </Tooltip>
                                        <Tooltip
                                            isOpen={tooltipOpen[i]?.add}
                                            target={`add-${i}`}
                                        >
                                            Add Company
                                        </Tooltip>
                                    </div>
                                    <h5 className="text-center" style={{ color: 'black' }}>Lorem, ipsum dolor.</h5>
                                    <p className="text-center" style={{ color: 'black', fontWeight: 'lighter' }}>Lorem, ipsum.</p>
                                    <div className="position-absolute h-100 w-100" style={{ backgroundImage: `url(${ele.image ? ele.image : 'https://media.cheggcdn.com/media/012/01218fc2-837d-497c-8f06-012e5d922ab9/phpwQqFlz'})`, backgroundSize: 'cover', zIndex: '-1', opacity: '0.55', filter: 'blur(55px)', scale: '0.55' }}></div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default ExploreAll