import React, { useEffect, useState } from 'react'
import { ArrowLeft, Smartphone, Monitor, Moon, Sun, RotateCcw, RotateCw, Copy, Mail, Save, Tv, PlusCircle, Type, Image, Square, AlignCenter, Circle, CheckSquare, ChevronDown, Star, AlignJustify, Clock, Percent, Watch, Lock, Columns, X, Trash2, Download, Crosshair, Link2, Info, Edit2, Edit3, Edit } from 'react-feather'
import { Col, Container, Row, UncontrolledAccordion, AccordionItem, AccordionHeader, AccordionBody, Modal } from 'reactstrap'
import DroppableElements from './Droppable'
import './FormEditor.css'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.core.css'
import 'react-quill/dist/quill.bubble.css'
import ModificationSection from './ModificationSection'
import Select from 'react-select'
import PickerDefault from '../../Components/Date-picker/NormalDatePicker'
import { useNavigate } from 'react-router-dom'
import BgModifier from "./BgModifier"
import pixels from "../../../assets/images/superLeadz/pixels.png"
import axios from 'axios'
import toast from 'react-hot-toast'
import { SuperLeadzBaseURL } from '../../../assets/auth/jwtService'


const FormEditor = () => {
  const navigate = useNavigate()
  const [isMobile, setIsMobile] = useState(false)
  // const [colorMode, setColorMode] = useState('light')
  const [sideNav, setSideNav] = useState('display')
  // const [layout, setLayout] = useState([])
  const [colWise, setcolWise] = useState([])
  // const [stateHistory, setStateHistory] = useState([])
  // const [index, setIndex] = useState(-1)
  // const [imageDataURLs, setImageDataURLs] = useState([])
  // const [currPosition?.curData, setcurrPosition?.curData] = useState(null)
  const [campaignStart, setCampaignStart] = useState(new Date())
  const [isEndCampaign, setIsEndCampaign] = useState(false)
  const [campaignEnd, setCampaignEnd] = useState("forever")

  const [popPosition, setPopPosition] = useState("MC")
  const [currPosition, setCurrPosition] = useState({
    id: null,
    position: null,
    name: null
  })

  const [indexes, setIndexes] = useState({ cur: 0, curElem: 0, subElem: 0 })
  const [dragOverIndex, setDragOverIndex] = useState({ cur: 0, curElem: 0, subElem: 0 })

  const [activeRow, setActiveRow] = useState("none")

  const [bgsettings, setBgSettings] = useState({ backgroundColor: "rgba(0,0,0,0.5)" })

  const [bgModal, setBgModal] = useState(false)
  const [bgModal2, setBgModal2] = useState(false)

  const [bgStyles, setBgStyles] = useState({ backgroundColor: "rgba(255,255,255,1)" })

  const [suggestions, setSuggestions] = useState([])


  const getImage = (demoImg, src) => {
    if (demoImg) {
      let img
      try {
        if (src) {
          img = URL.createObjectURL(demoImg)
        } else {
          img = `url('${URL.createObjectURL(demoImg)}')`
        }
      } catch (error) {
        if (demoImg.includes("linear")) {
          img = demoImg
        } else {
          img = `url('${demoImg}')`
        }
      }
      return img
    }
  }

  // const [overlayColor, setOverlayColor] = useState("")

  // const undo = () => {
  //   if (index > 0) {
  //     setIndex((prevIndex) => prevIndex - 1)
  //     setcolWise(stateHistory[index - 1])
  //   }
  // }

  // const redo = () => {
  //   if (index < stateHistory.length - 1) {
  //     setIndex((prevIndex) => prevIndex + 1)
  //     setcolWise(stateHistory[index + 1])
  //   }
  // }

  // useEffect(() => {
  //   // Add current colWise to the history when colWise changes (excluding the forward history)
  //   if (index === stateHistory.length - 1) {
  //     setStateHistory((prevHistory) => [...prevHistory.slice(0, index + 1), colWise])
  //   }
  // }, [colWise, index, stateHistory])


  const elementStyles = {
    button: { fontSize: "12px", backgroundColor: "#7367f0", padding: "10px 16px", color: "#ffffff", borderRadius: "5px", width: "auto", height: "auto" },
    image: { width: "100%", maxWidth: "100%" },
    text: { width: '100%' },
    input: { width: "100%", padding: "0.5rem", borderRadius: "5px", boxShadow: "none" }
  }

  const commonObj = {
    label: "",
    class: "",
    option: [
      {
        value: "1", label: "Option 1"
      },
      {
        value: "2", label: "Option 2"
      }
    ],
    src: "",
    textValue: "<p>Enter Text</p>"
  }

  const settingImage = (image) => {
    let demo
    try {
      demo = URL.createObjectURL(image)
    } catch (error) {
      demo = image
    }
    return demo
  }

  const handleDragStart = (e, dataType, keyType) => {
    // console.log("Drag Started", dataType)
    e.dataTransfer.setData("type", dataType)
    e.dataTransfer.setData("key", keyType)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleLayoutDrop = (e) => {
    // console.log("Dropped", e)

    // setSideNav('add-elements')

    const transferedData = e.dataTransfer.getData("type")
    // console.log("transferedData", transferedData)
    // const transferedKey = e.dataTransfer.getData("key")
    // console.log(transferedData, transferedKey)

    if (transferedData === "col3") {
      // console.log("3")
      setcolWise([
        ...colWise, {
          id: colWise.length + 1,
          col: 3,
          elements: [
            {
              positionType: 'left',
              element: [{ ...commonObj, type: "", id: colWise.length }]
            },
            {
              positionType: 'center',
              element: [{ ...commonObj, type: "", id: colWise.length }]
            },
            {
              positionType: 'right',
              element: [{ ...commonObj, type: "", id: colWise.length }]
            }
          ]
        }
      ])
    } else if (transferedData === "col2") {
      // console.log("2")
      setcolWise([
        ...colWise, {
          id: colWise.length + 1,
          col: 2,
          elements: [
            {
              positionType: 'left',
              element: [{ ...commonObj, type: "", id: colWise.length }]
            },
            {
              positionType: 'right',
              element: [{ ...commonObj, type: "", id: colWise.length }]
            }
          ]
        }
      ])
    } else if (transferedData === "col1") {
      // console.log('1')
      setcolWise([
        ...colWise, {
          id: colWise.length + 1,
          col: 1,
          elements: [
            {
              positionType: 'left',
              element: [{ ...commonObj, type: "", id: colWise.length }]
            }
          ]
        }
      ])
    } else if (transferedData !== "" && !transferedData.includes("col")) {
      // console.log("else handleLayoutDrop", transferedData)
      setcolWise([
        ...colWise, {
          id: colWise.length + 1,
          col: 1,
          elements: [
            {
              positionType: 'left',
              element: [
                {
                  ...commonObj,
                  type: transferedData,
                  id: colWise.length,
                  style: elementStyles[transferedData]
                }
              ]
            }
          ]
        }
      ])
    }
  }

  const handleElementDrop = (e, position, id, index, curData, j) => {
    // console.log("dropped in col: ", id)
    // console.log("getting data from colWise", colWise[id])
    // console.log("position: ", position)
    // console.log("handleElementDrop")
    const transferedData = e.dataTransfer.getData("type")
    // const transferedKey = e.dataTransfer.getData("key")
    // console.log(transferedData, transferedKey)

    const updatedColWise = colWise.map((col, index) => {
      if (index === id) {
        const updatedElements = col.elements.map((ele) => {
          if (ele.positionType === position) {
            const dupArray = [...ele.element]
            dupArray[j] = { ...commonObj, ...ele.elements, type: transferedData, style: elementStyles[transferedData] }
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
    setcolWise(updatedColWise)
    // console.log("curData.element", curData.element)
    if (curData.element.type === "image") {
      const imageInput = document.getElementById(`imageInput-${id}-${index}`)
      // console.log("image entered")
      imageInput.click()
    }
  }

  const handleImage = (e) => {
    const { id } = currPosition
    // console.log(j)
    // const index = cur.elements.findIndex(elem => elem.positionType === position)
    // console.log("index", index)
    console.log("handleImage", dragOverIndex)
    const dupArray = [...colWise]
    const positionIndex = colWise[id].elements.findIndex($ => $.positionType === dragOverIndex.curElem)

    // console.log("handleImage", currPosition.id)
    // if (!dupArray[currPosition]) {
    //   dupArray[id] = { ...cur }
    // }
    dupArray[id].elements[positionIndex].element[dupArray[id].elements[positionIndex].element.length - 1] = { ...commonObj, ...dupArray[id].elements[positionIndex].element[dragOverIndex.subElem], type: "image", src: e.target.files[0], style: elementStyles.image }
    // console.log(dupArray, dupArray[id].elements[index].element[j])
    // console.log("handleImage", currPosition, dupArray)
    setcolWise([...dupArray])
  }

  // const handleImageChange = (e, id) => {
  //   const file = e.target.files[0]
  //   const reader = new FileReader()
  //   reader.onload = (event) => {
  //     const imageDataURL = event.target.result
  //     setImageDataURLs((prevImageDataUrls) => {
  //       const updatedImageDataUrls = [...prevImageDataUrls]
  //       updatedImageDataUrls[id] = imageDataURL
  //       return updatedImageDataUrls
  //     })
  //   }
  //   reader.readAsDataURL(file)
  // }

  const makActive = (e, cur, curData, position, id, j) => {
    setCurrPosition({ ...currPosition, position, id, name: e.target.name, curData, cur, j })
  }


  const updateValues = () => {
    // console.log("updateValues")
    // console.log("dropped in col: ", currPosition.id)
    // console.log("getting data from colWise", colWise[currPosition.id])
    // console.log("position: ", currPosition.position)

    // const dimensions = ["height", "width", "minHeight", "minWidth", "maxHeight", "maxWidth"]

    // console.log("updateValues value: ", e.target.value)
    // const updatedColWise = colWise.map((col, index) => {
    //   if (index === currPosition.id) {
    //     const updatedElements = col.elements.map((ele) => {
    //       if (ele.positionType === currPosition.position) {
    //         return {
    //           ...ele,
    //           element: [{ ...commonObj, ...ele.element, style: { ...ele.element.style, [e.target.name]: e.target.value } }]
    //         }
    //       }
    //       return ele
    //     })

    //     return {
    //       ...col,
    //       elements: updatedElements
    //     }
    //   }
    //   return col
    // })
    // setcolWise(updatedColWise)
    // console.log(e, currPosition)
  }

  const deleteRow = (key) => {
    // console.log("deleteRow")
    const dupArray = [...colWise]
    dupArray.splice(key, 1)
    setcolWise(dupArray)
    // setcolWise(colWise.filter(item => item.id !== (key + 1)))
  }

  const changeColumn = (col) => {
    // const positions = ["left", "center", "right"]
    // console.log(col, currPosition, positions)
    const dupArray = [...colWise]
    if (Number(col) !== currPosition?.cur?.elements?.length) {
      let elements
      // console.log("dupArray", dupArray[currPosition.id])
      if (col === "1") {
        elements = [
          {
            positionType: 'left',
            element: [{ ...commonObj, type: "", id: colWise.length }]
          }
        ]
      } else if (col === "2") {
        elements = [
          {
            positionType: 'left',
            element: [{ ...commonObj, type: "", id: colWise.length }]
          },
          {
            positionType: 'right',
            element: [{ ...commonObj, type: "", id: colWise.length }]
          }
        ]
      } else {
        elements = [
          {
            positionType: 'left',
            element: [{ ...commonObj, type: "", id: colWise.length }]
          },
          {
            positionType: 'center',
            element: [{ ...commonObj, type: "", id: colWise.length }]
          },
          {
            positionType: 'right',
            element: [{ ...commonObj, type: "", id: colWise.length }]
          }
        ]
      }
      dupArray[currPosition.id].elements = elements
      setcolWise([...colWise])
    }
  }

  const generateSuggestion = () => {
    const innertext = document.getElementById(`textField-${indexes.cur}-${indexes.curElem}-${indexes.subElem}`)
    console.log(innertext.innerText)
    const suggestionUrl = new URL(`${SuperLeadzBaseURL}/utils/api/v1/PromptSuggestion/`)
    const newArr = []

    const form_data = new FormData()

    form_data.append("type_of_content", "coupon text")
    form_data.append("content_text", innertext.innerText === "" ? "redeem and get 20% off" : innertext.innerText)

    for (let index = 0; index < 5; index++) {
      axios({
        method: "POST", 
        url: suggestionUrl,
        data: form_data
      }).then((response) => {
        newArr.push(response.data.generated_text)
        if (index === 4) {
          setSuggestions([...newArr])
        }
      }).catch((error) => {
        toast.error("error aaya")
        console.log(error)
      })
    }
  }

  const renderElems = () => {
    // console.log("renderElems", colWise[currPosition.id])
    const { selectedType } = currPosition
    if (colWise[currPosition.id]) {
      // const objLocation = colWise[currPosition.id]?.elements.filter(item => {
      //   return item.positionType === currPosition.position
      // })
      // console.log("location is the", objLocation[0])
      // console.log("locationType", objLocation[0], currPosition)
      let styles, general
      // console.log("renderRlements")

      if (selectedType === "button") {
        const arr = [...colWise]
        const positionIndex = colWise[indexes.cur].elements.findIndex($ => $.positionType === indexes.curElem)
        styles = (
          <>
            <UncontrolledAccordion defaultOpen={['1', '2', '3']} stayOpen>
              <AccordionItem style={{ backgroundColor: '#f8f8f8' }}>
                <AccordionHeader className='acc-header' targetId='1' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                  <label>Display</label>
                </AccordionHeader>
                <AccordionBody accordionId='1'>
                  <div className='p-0 mx-0 my-1'>
                    <div className='d-flex p-0 mb-1 justify-content-between align-items-center'>
                      <label className='w-50 m-0 text-start'>Width: </label>
                      <select className='w-50 form-select' name="" onChange={e => {
                        arr[indexes.cur].elements[positionIndex].element[indexes.subElem].style.width = e.target.value
                        setcolWise(arr)
                      }} id="">
                        <option className='text-capitalize' value="auto">Fluid</option>
                        {/* <option className='text-capitalize' value="manual">Manual</option> */}
                        <option className='text-capitalize' value="100%">100%</option>
                      </select>
                    </div>
                    <div className=''>
                      <label className='w-100 m-0 text-start'>Height: </label>
                      <div className="d-flex p-0 justify-content-between align-items-center gap-2">
                        <input type='range' className='w-100' onChange={e => {
                          arr[indexes.cur].elements[positionIndex].element[indexes.subElem].style.minHeight = `${e.target.value}px`
                          setcolWise(arr)
                        }} name="height" min="0" max="300" />
                        {/* <input type="number" name='height' onChange={e => {
                          updateValues(e)
                        }} min="0" max="300" className='w-50 form-control' /> */}
                      </div>
                    </div>
                  </div>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem style={{ backgroundColor: '#f8f8f8' }}>
                <AccordionHeader className='acc-header' targetId='2' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                  <label>Background Fill</label>
                </AccordionHeader>
                <AccordionBody accordionId='2'>
                  <div className='p-0 mx-0 my-1'>
                    <div className='d-flex p-0 mb-1 justify-content-between align-items-center'>
                      <label htmlFor="label" className="text-capitalize w-50">Solid Color</label>
                      <input
                        type="color"
                        className="w-50"
                        name="backgroundColor"
                        onChange={updateValues}
                      // defaultValue={activeData.label}
                      />
                    </div>
                    <div className=''>
                      <label htmlFor="label" className="text- w-50">Text Color</label>
                      <input
                        type="color"
                        className="w-50"
                        name="color"
                        onChange={updateValues}
                      // defaultValue={activeData.label}
                      />
                    </div>
                  </div>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem style={{ backgroundColor: '#f8f8f8' }}>
                <AccordionHeader className='acc-header' targetId='3' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                  <label>Border and Shadow</label>
                </AccordionHeader>
                <AccordionBody accordionId='3'>
                  <div className='p-0 mx-0 my-1'>
                    <div className='d-flex p-0 mb-1 justify-content-between align-items-center'>
                      <label className='w-50 m-0 text-start'>Border: </label>
                      <select className='w-50 form-select' name="" id="">
                        <option className='text-capitalize' value="none">None</option>
                        <option className='text-capitalize' value="full">Full</option>
                        <option className='text-capitalize' value="top">Top</option>
                        <option className='text-capitalize' value="bottom">Bottom</option>
                        <option className='text-capitalize' value="left">Left</option>
                        <option className='text-capitalize' value="right">Right</option>
                        <option className='text-capitalize' value="topbottom">Top bottom</option>
                      </select>
                    </div>
                    <div className='d-flex flex-column text-start '>
                      <label className='p-0 mb-1 text-start'>Corner radius: </label>
                      <div className='d-flex p-0 mb-1 justify-content-between align-items-center'>
                        <label className='w-75 m-0 text-start' style={{ fontSize: '0.8rem' }}>Use Custom theme rounding </label>
                        <div className="form-check form-switch m-0 p-0" style={{ transform: 'scale(0.8)' }}>
                          <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" />
                        </div>
                      </div>
                      <div className="d-flex align-items-center my-1">
                        <div className="row">
                          <div className="col mb-2">
                            <div className="corner-radius-input d-flex align-items-end">
                              <input type="number" min="0" step="1" className="form-control mr-2" />
                            </div>
                          </div>
                          <div className="col">
                            <div className="corner-radius-input d-flex align-items-start">
                              <input type="number" min="0" step="1" className="form-control mr-2" />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col">
                            <button
                              type="button"
                              className="corner-radius-chain btn btn-link btn-add-icon btn-icon-only design-system"
                            >
                              <span className="d-inline-flex justify-content-center align-items-center btn-icon-only-wrap">
                                <Link2 size={18} strokeWidth={2.5} style={{ transform: 'rotate(-45deg)' }} />
                              </span>
                            </button>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col mb-2">
                            <div className="corner-radius-input corner-radius-input-right d-flex align-items-end">
                              <input type="number" min="0" step="1" className="form-control" />
                            </div>
                          </div>
                          <div className="col">
                            <div className="corner-radius-input corner-radius-input-right d-flex align-items-start">
                              <input type="number" min="0" step="1" className="form-control" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='d-flex p-0 mb-1 justify-content-between align-items-center'>
                      <label className='w-50 m-0 text-start'>Shadow: </label>
                      <select className='w-50 form-select' name="" id="">
                        <option className='text-capitalize' value="none">None</option>
                        <option className='text-capitalize' value="normal">Normal</option>
                        <option className='text-capitalize' value="medium">Medium</option>
                        <option className='text-capitalize' value="large">Large</option>
                      </select>
                    </div>
                  </div>
                </AccordionBody>
              </AccordionItem>
            </UncontrolledAccordion>
          </>
        )
        general = (
          <>
            <div className='p-0 mx-0 my-1'>
              <div className='d-flex p-0 mb-1 justify-content-between align-items-center'>
                <label className='w-50 m-0 text-start' style={{ fontSize: '0.8rem' }}>On click: </label>
                <select className='w-50 form-select' name="" id="">
                  <option className='text-capitalize' value="nextPage">Next page </option>
                  <option className='text-capitalize' value="jumpTo">Jump to</option>
                  <option className='text-capitalize' value="redirect">Redirect</option>
                  <option className='text-capitalize' value="call">Call</option>
                  <option className='text-capitalize' value="close">Close</option>
                </select>
              </div>
              <div className='d-flex p-0 mb-1 justify-content-between align-items-center'>
                <label className='w-50 m-0 text-start' style={{ fontSize: '0.8rem' }}>Report as: </label>
                <select className='w-50 form-select' name="" id="">
                  <option className='text-capitalize' value="none">None</option>
                  <option className='text-capitalize' value="conversion">Conversion</option>
                  <option className='text-capitalize' value="closed">Closed</option>
                </select>
              </div>
              <div className='d-flex flex-column text-start '>
                <div className='d-flex p-0 mb-1 justify-content-between align-items-center'>
                  <label className='w-75 m-0 text-start' style={{ fontSize: '0.8rem' }}>Campaign goal reached </label>
                  <div className="form-check form-switch m-0 p-0" style={{ transform: 'scale(0.8)' }}>
                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" />
                  </div>
                </div>
              </div>
              <div className='d-flex p-0 mb-1 justify-content-between align-items-center'>
                <label className='w-50 m-0 text-start' style={{ fontSize: '0.8rem' }}>Sync to integration: </label>
                <select className='w-50 form-select' name="" id="">
                  <option className='text-capitalize' value="smartSync">Smart sync</option>
                  <option className='text-capitalize' value="rightNow">Right now</option>
                </select>
              </div>
            </div>
          </>
        )
      } else if (selectedType === "text") {
        const arr = [...colWise]
        const positionIndex = colWise[indexes.cur].elements.findIndex($ => $.positionType === indexes.curElem)
        styles = (
          <>
            <UncontrolledAccordion defaultOpen={['1', '2', '3']} stayOpen>
              <AccordionItem style={{ backgroundColor: '#f8f8f8' }}>
                <AccordionHeader className='acc-header' targetId='1' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                  <label>Display</label>
                </AccordionHeader>
                <AccordionBody accordionId='1'>
                  <div className='p-0 mx-0 my-1'>
                    <div className='d-flex p-0 mb-1 justify-content-between align-items-center'>
                      <label className='w-50 m-0 text-start'>Text Shadow: </label>
                      <select onChange={e => {
                        arr[indexes.cur].elements[positionIndex].element[indexes.subElem].style.textShadow = e.target.value
                        setcolWise(arr)
                      }} className='w-50 form-select' name="" id="">
                        <option className='text-capitalize' value="0px 0px 0px rgba(0,0,0,0)">None</option>
                        <option className='text-capitalize' value="0px 0px 5px rgba(0,0,0,0.25)">Small</option>
                        <option className='text-capitalize' value="0px 0px 10px rgba(0,0,0,0.5)">Medium</option>
                        <option className='text-capitalize' value="0px 0px 20px rgba(0,0,0,0.75)">Large</option>
                      </select>
                    </div>
                    <div className=''>
                      <label className='w-100 m-0 text-start'>Text Rotation: </label>
                      <div className="d-flex p-0 justify-content-between align-items-center gap-2">
                        <input type='range' className='w-100' onChange={e => {
                          if (!isNaN(e.target.value)) {
                            arr[indexes.cur].elements[positionIndex].element[indexes.subElem].style.rotate = `${e.target.value}deg`
                            setcolWise(arr)
                          }
                        }} name="height" min="0" max="360" />
                        <input type="number" name='height' onChange={e => {
                          // updateValues(e)
                          if (!isNaN(e.target.value)) {
                            arr[indexes.cur].elements[positionIndex].element[indexes.subElem].style.rotate = `${e.target.value}deg`
                            setcolWise(arr)
                          }
                        }} min="0" max="360" className='w-50 form-control' />
                      </div>
                    </div>
                  </div>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem style={{ backgroundColor: '#f8f8f8' }}>
                <AccordionHeader className='acc-header' targetId='2' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                  <label>Background Fill</label>
                </AccordionHeader>
                <AccordionBody accordionId='2'>
                  <div className='p-0 mx-0 my-1'>
                    <div className='d-flex p-0 mb-1 justify-content-between align-items-center'>
                      <label htmlFor="label" className="text-capitalize w-50">Solid Color</label>
                      <input
                        type="color"
                        className="w-50"
                        name="backgroundColor"
                        onChange={e => {
                          arr[indexes.cur].elements[positionIndex].element[indexes.subElem].style.backgroundColor = e.target.value
                          setcolWise(arr)
                        }}
                      // defaultValue={activeData.label}
                      />
                    </div>
                  </div>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem style={{ backgroundColor: '#f8f8f8' }}>
                <AccordionHeader className='acc-header' targetId='3' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                  <label>Border and Shadow</label>
                </AccordionHeader>
                <AccordionBody accordionId='3'>
                  <div className='p-0 mx-0 my-1'>
                    {/* <div className='d-flex p-0 mb-1 justify-content-between align-items-center'>
                      <label className='w-50 m-0 text-start'>Border: </label>
                      <select className='w-50 form-select' name="" id="">
                        <option className='text-capitalize' value="none">None</option>
                        <option className='text-capitalize' value="full">Full</option>
                        <option className='text-capitalize' value="top">Top</option>
                        <option className='text-capitalize' value="bottom">Bottom</option>
                        <option className='text-capitalize' value="left">Left</option>
                        <option className='text-capitalize' value="right">Right</option>
                        <option className='text-capitalize' value="topbottom">Top bottom</option>
                      </select>
                    </div> */}
                    <div className='d-flex p-0 mb-1 justify-content-between align-items-center'>
                      <label className='w-50 m-0 text-start'>Border Style: </label>
                      <select className='w-50 form-select' onChange={e => {
                        arr[indexes.cur].elements[positionIndex].element[indexes.subElem].style.borderStyle = e.target.value
                        setcolWise(arr)
                      }} name="" id="">
                        <option className='text-capitalize' value="solid">Solid</option>
                        <option className='text-capitalize' value="dashed">Dashed</option>
                        <option className='text-capitalize' value="dotted">Dotted</option>
                      </select>
                    </div>
                    <div className=''>
                      <label className='w-100 m-0 text-start'>Border Width: </label>
                      <div className="d-flex p-0 justify-content-between align-items-center gap-2">
                        <input type='range' className='w-100' onChange={e => {
                          if (!isNaN(e.target.value)) {
                            arr[indexes.cur].elements[positionIndex].element[indexes.subElem].style.borderWidth = `${e.target.value}px`
                            setcolWise(arr)
                          }
                        }} name="height" min="0" max="40" />
                        <input type="number" name='height' onChange={e => {
                          // updateValues(e)
                          if (!isNaN(e.target.value)) {
                            arr[indexes.cur].elements[positionIndex].element[indexes.subElem].style.borderWidth = `${e.target.value}px`
                            setcolWise(arr)
                          }
                        }} min="0" max="360" className='w-50 form-control' />
                      </div>
                    </div>
                    <div className='d-flex p-0 mb-1 my-1 justify-content-between align-items-center'>
                      <label htmlFor="label" className="text-capitalize w-50">Border Color</label>
                      <input
                        type="color"
                        className="w-50"
                        name="backgroundColor"
                        onChange={e => {
                          arr[indexes.cur].elements[positionIndex].element[indexes.subElem].style.borderColor = e.target.value
                          setcolWise(arr)
                        }}
                      // defaultValue={activeData.label}
                      />
                    </div>
                    <div className='d-flex flex-column text-start '>
                      <label className='p-0 mb-1 text-start'>Corner radius: </label>
                      <div className='d-flex p-0 mb-1 justify-content-between align-items-center'>
                        <label className='w-75 m-0 text-start' style={{ fontSize: '0.8rem' }}>Use Custom theme rounding </label>
                        <div className="form-check form-switch m-0 p-0" style={{ transform: 'scale(0.8)' }}>
                          <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" />
                        </div>
                      </div>
                      <div className="d-flex align-items-center my-1">
                        <div className="row">
                          <div className="col mb-2">
                            <div className="corner-radius-input d-flex align-items-end">
                              <input type="number" min="0" step="1" className="form-control mr-2" />
                            </div>
                          </div>
                          <div className="col">
                            <div className="corner-radius-input d-flex align-items-start">
                              <input type="number" min="0" step="1" className="form-control mr-2" />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col">
                            <button
                              type="button"
                              className="corner-radius-chain btn btn-link btn-add-icon btn-icon-only design-system"
                            >
                              <span className="d-inline-flex justify-content-center align-items-center btn-icon-only-wrap">
                                <Link2 size={18} strokeWidth={2.5} style={{ transform: 'rotate(-45deg)' }} />
                              </span>
                            </button>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col mb-2">
                            <div className="corner-radius-input corner-radius-input-right d-flex align-items-end">
                              <input type="number" min="0" step="1" className="form-control" />
                            </div>
                          </div>
                          <div className="col">
                            <div className="corner-radius-input corner-radius-input-right d-flex align-items-start">
                              <input type="number" min="0" step="1" className="form-control" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='d-flex p-0 mb-1 justify-content-between align-items-center'>
                      <label className='w-50 m-0 text-start'>Shadow: </label>
                      <select className='w-50 form-select' name="" id="">
                        <option className='text-capitalize' value="none">None</option>
                        <option className='text-capitalize' value="normal">Normal</option>
                        <option className='text-capitalize' value="medium">Medium</option>
                        <option className='text-capitalize' value="large">Large</option>
                      </select>
                    </div>
                  </div>
                </AccordionBody>
              </AccordionItem>
            </UncontrolledAccordion>
          </>
        )
        general = (
          <>
            <div className='p-0 mx-0 my-1'>
              <p className='mb-1 ' >Smart headline generator</p>
              <button onClick={generateSuggestion} type='button' className='btn btn-primary px-2 w-100 mb-1'>
                <Star size={15} />
                <Star size={8} />
                Generate Suggestions
              </button>

              {suggestions?.map((suggestion, index) => {
                return (
                  <div onClick={() => {
                    arr[indexes.cur].elements[positionIndex].element[indexes.subElem].textValue = `<p>${suggestion}</p>`
                    setcolWise(arr)
                  }} key={index} className="border p-1 mb-1 rounded cursor-pointer gen-text">
                    <p style={{fontSize: "12px"}}>{suggestion}</p>
                  </div>
                )
              })}
            </div>
          </>
        )
      } else if (selectedType === "image") {
        // console.log('objLocation[0]?.element', objLocation[0]?.element)
        const arr = [...colWise]
        const positionIndex = colWise[indexes.cur].elements.findIndex($ => $.positionType === indexes.curElem)
        styles = (
          <>
            <UncontrolledAccordion defaultOpen={['1', '2']} stayOpen>
              {/* <AccordionItem style={{ backgroundColor: '#f8f8f8' }}>
                <AccordionHeader className='acc-header' targetId='1' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                  <label>Background Fill</label>
                </AccordionHeader>
                <AccordionBody accordionId='1'>
                  <div className='p-0 mx-0 my-1'>
                    <div className='d-flex p-0 mb-1 justify-content-between align-items-center'>
                      <label htmlFor="label" className="text-capitalize w-50">Solid Color</label>
                      <input
                        type="color"
                        className="w-50"
                        name="backgroundColor"
                        onChange={updateValues}
                      // defaultValue={activeData.label}
                      />
                    </div>
                  </div>
                </AccordionBody>
              </AccordionItem> */}
              <AccordionItem style={{ backgroundColor: '#f8f8f8' }}>
                <AccordionHeader className='acc-header' targetId='2' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                  <label>Border and Shadow</label>
                </AccordionHeader>
                <AccordionBody accordionId='2'>
                  <div className='p-0 mx-0 my-1'>
                    <div className='d-flex p-0 mb-1 justify-content-between align-items-center'>
                      <label className='w-50 m-0 text-start'>Border: </label>
                      <select className='w-50 form-select' name="" id="">
                        <option className='text-capitalize' value="none">None</option>
                        <option className='text-capitalize' value="full">Full</option>
                        <option className='text-capitalize' value="top">Top</option>
                        <option className='text-capitalize' value="bottom">Bottom</option>
                        <option className='text-capitalize' value="left">Left</option>
                        <option className='text-capitalize' value="right">Right</option>
                        <option className='text-capitalize' value="topbottom">Top bottom</option>
                      </select>
                    </div>
                    <div className='d-flex flex-column text-start '>
                      <label className='p-0 mb-1 text-start'>Corner radius: </label>
                      <div className='d-flex p-0 mb-1 justify-content-between align-items-center'>
                        <label className='w-75 m-0 text-start' style={{ fontSize: '0.8rem' }}>Use Custom theme rounding </label>
                        <div className="form-check form-switch m-0 p-0" style={{ transform: 'scale(0.8)' }}>
                          <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" />
                        </div>
                      </div>
                      <div className="d-flex align-items-center my-1">
                        <div className="row">
                          <div className="col mb-2">
                            <div className="corner-radius-input d-flex align-items-end">
                              <input type="number" min="0" step="1" className="form-control mr-2" />
                            </div>
                          </div>
                          <div className="col">
                            <div className="corner-radius-input d-flex align-items-start">
                              <input type="number" min="0" step="1" className="form-control mr-2" />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col">
                            <button
                              type="button"
                              className="corner-radius-chain btn btn-link btn-add-icon btn-icon-only design-system"
                            >
                              <span className="d-inline-flex justify-content-center align-items-center btn-icon-only-wrap">
                                <Link2 size={18} strokeWidth={2.5} style={{ transform: 'rotate(-45deg)' }} />
                              </span>
                            </button>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col mb-2">
                            <div className="corner-radius-input corner-radius-input-right d-flex align-items-end">
                              <input type="number" min="0" step="1" className="form-control" />
                            </div>
                          </div>
                          <div className="col">
                            <div className="corner-radius-input corner-radius-input-right d-flex align-items-start">
                              <input type="number" min="0" step="1" className="form-control" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='d-flex p-0 mb-1 justify-content-between align-items-center'>
                      <label className='w-50 m-0 text-start'>Shadow: </label>
                      <select className='w-50 form-select' name="" id="">
                        <option className='text-capitalize' value="none">None</option>
                        <option className='text-capitalize' value="normal">Normal</option>
                        <option className='text-capitalize' value="medium">Medium</option>
                        <option className='text-capitalize' value="large">Large</option>
                      </select>
                    </div>
                  </div>
                </AccordionBody>
              </AccordionItem>
            </UncontrolledAccordion>
          </>
        )
        general = (
          <>
            <UncontrolledAccordion defaultOpen={['1']} stayOpen>
              <AccordionItem style={{ backgroundColor: '#f8f8f8' }}>
                <AccordionHeader className='acc-header' targetId='1' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                  <label>Image setting</label>
                </AccordionHeader>
                <AccordionBody accordionId='1'>
                  <div className='p-0 mx-0 my-1'>
                    <label
                      htmlFor="image-customer-preview"
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
                        {arr[indexes.cur].elements[positionIndex].element[indexes.subElem].src === "" ? <PlusCircle size={19} /> : <Edit size={19} />}
                      </div>
                      <input type="file" accept="image/*" onChange={e => {
                        arr[indexes.cur].elements[positionIndex].element[indexes.subElem].src = e.target.files[0]
                        setcolWise(arr)
                      }} className="d-none" name="image-customer-preview" id="image-customer-preview" />
                      <img className="h-100 w-100" src={settingImage(colWise[indexes.cur].elements[positionIndex].element[indexes.subElem].src)} alt="" />
                    </label>
                    <div className='mb-1'>
                      <label className='w-100 m-0 text-start'>Width: </label>
                      <div className="d-flex p-0 justify-content-between align-items-center gap-2">
                        <input onChange={(e) => {
                          if (e.target.value <= 1) {
                            arr[indexes.cur].elements[positionIndex].element[indexes.subElem].style.width = `20px`
                            e.target.value = "20"
                          } else {
                            arr[indexes.cur].elements[positionIndex].element[indexes.subElem].style.width = `${e.target.value}px`
                          }
                          setcolWise(arr)
                        }} type='range' className='w-100' name="height" min="0" max="1500" />
                        {/* <input onChange={(e) => {
                          arr[indexes.cur].elements[positionIndex].element[indexes.subElem].style.width = `${e.target.value}px`
                          setcolWise(arr)
                        }} type="number" name='height' min="0" max="1500" className='w-50 form-control' /> */}
                      </div>
                    </div>
                    <div className='d-flex p-0 mb-1 justify-content-between align-items-center'>
                      <label className='w-50 m-0 text-start'>Alignment: </label>
                      <select className='w-50 form-select' onChange={e => {
                        arr[indexes.cur].elements[positionIndex].element[indexes.subElem].style.margin = e.target.value
                        setcolWise(arr)
                      }} name="" id="">
                        <option className='text-capitalize' value="auto auto auto 0px">Left</option>
                        <option className='text-capitalize' value="auto">Center</option>
                        <option className='text-capitalize' value="auto 0px auto auto">Right</option>
                      </select>
                    </div>
                  </div>
                </AccordionBody>
              </AccordionItem>
            </UncontrolledAccordion>
          </>
        )
        // } else {
        //   general = <>
        //     <div className="d-flex justify-content-center align-items-center mt-2">
        //       <div className={'d-flex justify-content-center align-items-center cursor-pointer'}>
        //         <svg
        //           version="1.1"
        //           xmlns="http://www.w3.org/2000/svg"
        //           xmlnsXlink="http://www.w3.org/1999/xlink"
        //           viewBox="0 0 64 54"
        //           xmlSpace="preserve"
        //           className='w-50'
        //         >
        //           <g>
        //             <rect
        //               x={2}
        //               y={2}
        //               width={60}
        //               rx={5}
        //               height={50}
        //               fill="transparent"
        //               strokeWidth={3}
        //               stroke="#7367f0"
        //             />
        //           </g>
        //         </svg>
        //       </div>
        //       <div className={'d-flex justify-content-center align-items-center cursor-pointer'}>
        //         <svg
        //           version="1.1"
        //           xmlns="http://www.w3.org/2000/svg"
        //           xmlnsXlink="http://www.w3.org/1999/xlink"
        //           viewBox="0 0 64 54"
        //           xmlSpace="preserve"
        //           className='w-50'
        //         >
        //           <g>
        //             <rect
        //               x={2}
        //               y={2}
        //               width={60}
        //               rx={5}
        //               height={50}
        //               fill="transparent"
        //               strokeWidth={3}
        //               stroke="#7367f0"
        //             />
        //             <path d="M32 52 L 32 2" strokeWidth={3} stroke="#7367f0" />
        //           </g>
        //         </svg>
        //       </div>
        //       <div className={'d-flex justify-content-center align-items-center cursor-pointer'}>
        //         <svg
        //           version="1.1"
        //           xmlns="http://www.w3.org/2000/svg"
        //           xmlnsXlink="http://www.w3.org/1999/xlink"
        //           viewBox="0 0 64 54"
        //           xmlSpace="preserve"
        //           className='w-50'
        //         >
        //           <g>
        //             <rect
        //               x={2}
        //               y={2}
        //               width={60}
        //               rx={5}
        //               height={50}
        //               fill="transparent"
        //               strokeWidth={3}
        //               stroke="#7367f0"
        //             />
        //             <path d="M21 52 L 21 2" strokeWidth={3} stroke="#7367f0" />
        //             <path d="M42 52 L 42 2" strokeWidth={3} stroke="#7367f0" />
        //           </g>
        //         </svg>
        //       </div>
        //     </div>

        //   </>
      } else if (selectedType === "block") {
        styles = (
          <>
            <UncontrolledAccordion defaultOpen={['1', '2', '3']} stayOpen>
              <AccordionItem style={{ backgroundColor: '#f8f8f8' }}>
                <AccordionHeader className='acc-header' targetId='1' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                  <label>Background Fill</label>
                </AccordionHeader>
                <AccordionBody accordionId='1'>
                  <div className='p-0 mx-0 my-1'>
                    <div className='d-flex p-0 mb-1 justify-content-between align-items-center'>
                      <label htmlFor="label" className="text-capitalize w-50">Solid Color</label>
                      <input
                        type="color"
                        className="w-50"
                        name="backgroundColor"
                        onChange={updateValues}
                      />
                    </div>
                  </div>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem style={{ backgroundColor: '#f8f8f8' }}>
                <AccordionHeader className='acc-header' targetId='2' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                  <label>Border and Shadow</label>
                </AccordionHeader>
                <AccordionBody accordionId='2'>
                  <div className='p-0 mx-0 my-1'>
                    <div className='d-flex p-0 mb-1 justify-content-between align-items-center'>
                      <label className='w-50 m-0 text-start'>Border: </label>
                      <select className='w-50 form-select' name="" id="">
                        <option className='text-capitalize' value="none">None</option>
                        <option className='text-capitalize' value="full">Full</option>
                        <option className='text-capitalize' value="top">Top</option>
                        <option className='text-capitalize' value="bottom">Bottom</option>
                        <option className='text-capitalize' value="left">Left</option>
                        <option className='text-capitalize' value="right">Right</option>
                        <option className='text-capitalize' value="topbottom">Top bottom</option>
                      </select>
                    </div>
                    <div className='d-flex flex-column text-start '>
                      <label className='p-0 mb-1 text-start'>Corner radius: </label>
                      <div className='d-flex p-0 mb-1 justify-content-between align-items-center'>
                        <label className='w-75 m-0 text-start' style={{ fontSize: '0.8rem' }}>Use Custom theme rounding </label>
                        <div className="form-check form-switch m-0 p-0" style={{ transform: 'scale(0.8)' }}>
                          <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" />
                        </div>
                      </div>
                      <div className="d-flex align-items-center my-1">
                        <div className="row">
                          <div className="col mb-2">
                            <div className="corner-radius-input d-flex align-items-end">
                              <input type="number" min="0" step="1" className="form-control mr-2" />
                            </div>
                          </div>
                          <div className="col">
                            <div className="corner-radius-input d-flex align-items-start">
                              <input type="number" min="0" step="1" className="form-control mr-2" />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col">
                            <button
                              type="button"
                              className="corner-radius-chain btn btn-link btn-add-icon btn-icon-only design-system"
                            >
                              <span className="d-inline-flex justify-content-center align-items-center btn-icon-only-wrap">
                                <Link2 size={18} strokeWidth={2.5} style={{ transform: 'rotate(-45deg)' }} />
                              </span>
                            </button>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col mb-2">
                            <div className="corner-radius-input corner-radius-input-right d-flex align-items-end">
                              <input type="number" min="0" step="1" className="form-control" />
                            </div>
                          </div>
                          <div className="col">
                            <div className="corner-radius-input corner-radius-input-right d-flex align-items-start">
                              <input type="number" min="0" step="1" className="form-control" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='d-flex p-0 mb-1 justify-content-between align-items-center'>
                      <label className='w-50 m-0 text-start'>Shadow: </label>
                      <select className='w-50 form-select' name="" id="">
                        <option className='text-capitalize' value="none">None</option>
                        <option className='text-capitalize' value="normal">Normal</option>
                        <option className='text-capitalize' value="medium">Medium</option>
                        <option className='text-capitalize' value="large">Large</option>
                      </select>
                    </div>
                  </div>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem style={{ backgroundColor: '#f8f8f8' }}>
                <AccordionHeader className='acc-header' targetId='3' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                  <label>Size</label>
                </AccordionHeader>
                <AccordionBody accordionId='3'>
                  <div className='p-0 mx-0 my-1'>
                    <div className="d-flex p-0 justify-content-between align-items-center gap-2">
                      <label className='w-100 m-0 text-start'>Min-height: </label>
                      <input type="number" name='minHeight' min="0" max="300" className='w-50 form-control' />
                    </div>
                  </div>
                </AccordionBody>
              </AccordionItem>

            </UncontrolledAccordion>
          </>
        )
        general = (
          <div className='d-flex justify-content-between align-items-center'>
            <button className="btn p-0 d-flex justify-content-center align-items-center" onClick={() => changeColumn("1")} style={{ aspectRatio: "1", width: "50px" }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 54" className='w-75'>
                <rect
                  x={2}
                  y={2}
                  width={60}
                  rx={5}
                  height={50}
                  fill="transparent"
                  strokeWidth={3}
                  stroke="#7367f0"
                />
              </svg>
            </button>
            <button className="btn p-0 d-flex justify-content-center align-items-center" onClick={() => changeColumn("2")} style={{ aspectRatio: "1", width: "50px" }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 54" className='w-75'>
                <g strokeWidth={3} stroke="#7367f0">
                  <rect x={2} y={2} width={60} rx={5} height={50} fill="transparent" />
                  <path d="M32 52V2" />
                </g>
              </svg>
            </button>
            <button className="btn p-0 d-flex justify-content-center align-items-center" onClick={() => changeColumn("3")} style={{ aspectRatio: "1", width: "50px" }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 54" className='w-75'>
                <g strokeWidth={3} stroke="#7367f0">
                  <rect x={2} y={2} width={60} rx={5} height={50} fill="transparent" />
                  <path d="M21 52V2M42 52V2" />
                </g>
              </svg>
            </button>
          </div>
        )
      } else if (selectedType === "input") {
        styles = (<>
          <UncontrolledAccordion defaultOpen={['1', '2', '3']} stayOpen>
            <AccordionItem style={{ backgroundColor: '#f8f8f8' }}>
              <AccordionHeader className='acc-header' targetId='1' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                <label>Display</label>
              </AccordionHeader>
              <AccordionBody accordionId='1'>
                <div className='p-0 mx-0 my-1'>
                  <div className='d-flex p-0 mb-1 justify-content-between align-items-center'>
                    <label className='w-50 m-0 text-start'>Width: </label>
                    <select className='w-50 form-select' name="" id="">
                      <option className='text-capitalize' value="fluid">Fluid</option>
                      <option className='text-capitalize' value="manual">Manual</option>
                      <option className='text-capitalize' value="100%">100%</option>
                    </select>
                  </div>
                  <div className=''>
                    <label className='w-100 m-0 text-start'>Height: </label>
                    <div className="d-flex p-0 justify-content-between align-items-center gap-2">
                      <input type='range' className='w-100' name="height" min="0" max="300" />
                      <input type="number" name='height' min="0" max="300" className='w-50 form-control' />
                    </div>
                  </div>
                </div>
              </AccordionBody>
            </AccordionItem>
            <AccordionItem style={{ backgroundColor: '#f8f8f8' }}>
              <AccordionHeader className='acc-header' targetId='2' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                <label>Background Fill</label>
              </AccordionHeader>
              <AccordionBody accordionId='2'>
                <div className='p-0 mx-0 my-1'>
                  <div className='d-flex p-0 mb-1 justify-content-between align-items-center'>
                    <label htmlFor="label" className="text-capitalize w-50">Solid Color</label>
                    <input
                      type="color"
                      className="w-50"
                      name="backgroundColor"
                      onChange={updateValues}
                    // defaultValue={activeData.label}
                    />
                  </div>
                  <div className=''>
                    <label htmlFor="label" className="text- w-50">Text Color</label>
                    <input
                      type="color"
                      className="w-50"
                      name="color"
                      onChange={updateValues}
                    // defaultValue={activeData.label}
                    />
                  </div>
                </div>
              </AccordionBody>
            </AccordionItem>
            <AccordionItem style={{ backgroundColor: '#f8f8f8' }}>
              <AccordionHeader className='acc-header' targetId='3' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                <label>Border and Shadow</label>
              </AccordionHeader>
              <AccordionBody accordionId='3'>
                <div className='p-0 mx-0 my-1'>
                  <div className='d-flex p-0 mb-1 justify-content-between align-items-center'>
                    <label className='w-50 m-0 text-start'>Border: </label>
                    <select className='w-50 form-select' name="" id="">
                      <option className='text-capitalize' value="none">None</option>
                      <option className='text-capitalize' value="full">Full</option>
                      <option className='text-capitalize' value="top">Top</option>
                      <option className='text-capitalize' value="bottom">Bottom</option>
                      <option className='text-capitalize' value="left">Left</option>
                      <option className='text-capitalize' value="right">Right</option>
                      <option className='text-capitalize' value="topbottom">Top bottom</option>
                    </select>
                  </div>
                  <div className='d-flex flex-column text-start '>
                    <label className='p-0 mb-1 text-start'>Corner radius: </label>
                    <div className='d-flex p-0 mb-1 justify-content-between align-items-center'>
                      <label className='w-75 m-0 text-start' style={{ fontSize: '0.8rem' }}>Use Custom theme rounding </label>
                      <div className="form-check form-switch m-0 p-0" style={{ transform: 'scale(0.8)' }}>
                        <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" />
                      </div>
                    </div>
                    <div className="d-flex align-items-center my-1">
                      <div className="row">
                        <div className="col mb-2">
                          <div className="corner-radius-input d-flex align-items-end">
                            <input type="number" min="0" step="1" className="form-control mr-2" />
                          </div>
                        </div>
                        <div className="col">
                          <div className="corner-radius-input d-flex align-items-start">
                            <input type="number" min="0" step="1" className="form-control mr-2" />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <button
                            type="button"
                            className="corner-radius-chain btn btn-link btn-add-icon btn-icon-only design-system"
                          >
                            <span className="d-inline-flex justify-content-center align-items-center btn-icon-only-wrap">
                              <Link2 size={18} strokeWidth={2.5} style={{ transform: 'rotate(-45deg)' }} />
                            </span>
                          </button>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col mb-2">
                          <div className="corner-radius-input corner-radius-input-right d-flex align-items-end">
                            <input type="number" min="0" step="1" className="form-control" />
                          </div>
                        </div>
                        <div className="col">
                          <div className="corner-radius-input corner-radius-input-right d-flex align-items-start">
                            <input type="number" min="0" step="1" className="form-control" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='d-flex p-0 mb-1 justify-content-between align-items-center'>
                    <label className='w-50 m-0 text-start'>Shadow: </label>
                    <select className='w-50 form-select' name="" id="">
                      <option className='text-capitalize' value="none">None</option>
                      <option className='text-capitalize' value="normal">Normal</option>
                      <option className='text-capitalize' value="medium">Medium</option>
                      <option className='text-capitalize' value="large">Large</option>
                    </select>
                  </div>
                </div>
              </AccordionBody>
            </AccordionItem>
          </UncontrolledAccordion>
        </>)
        general = (
          <>
            <div className='p-0 mx-0 my-1'>
              <div className='mt-1'>
                <label className='w-100 m-0 mb-1 text-start'>Type: </label>
                <div className="d-flex p-0 justify-content-between align-items-center gap-2">
                  <select className='form-select' name="" id="">
                    <option className='text-capitalize' value="email">Email</option>
                    <option className='text-capitalize' value="firstName">First Name</option>
                    <option className='text-capitalize' value="lastName">Last Name</option>
                  </select>
                </div>
              </div>
              <div className='my-1'>
                <label className='w-100 m-0 mb-1 text-start'>Placeholder: </label>
                <div className="d-flex p-0 justify-content-between align-items-center gap-2">
                  <input type="text" placeholder='Email' name='title' min="0" max="300" className='form-control' />
                </div>
              </div>
              <div className='d-flex p-0 my-1 justify-content-between align-items-center'>
                <label className='w-75 m-0 text-start' style={{ fontSize: '0.8rem' }}>Required? </label>
                <div className="form-check form-switch m-0 p-0" style={{ transform: 'scale(0.8)' }}>
                  <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" />
                </div>
              </div>
              <div className='my-1'>
                <label className='w-100 m-0 mb-1 text-start'>Error message: </label>
                <div className="d-flex p-0 justify-content-between align-items-center gap-2">
                  <input type="text" name='title' min="0" max="300" className='form-control' />
                </div>
              </div>
            </div>
          </>
        )
      } else if (selectedType === "cross") {
        styles = (
          <>
            <div>
              <div className='p-0 mx-0 my-1'>
                <div className='d-flex p-0 mb-1 justify-content-between align-items-center'>
                  <label className='w-75 m-0 text-start' style={{ fontSize: '0.8rem' }}>Close when "Esc" is pressed </label>
                  <div className="form-check form-switch m-0 p-0" style={{ transform: 'scale(0.8)' }}>
                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" />
                  </div>
                </div>
                <div className='d-flex p-0 mb-1 justify-content-between align-items-center'>
                  <label className='w-75 m-0 text-start' style={{ fontSize: '0.8rem' }}>Close when overlay is clicked </label>
                  <div className="form-check form-switch m-0 p-0" style={{ transform: 'scale(0.8)' }}>
                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" />
                  </div>
                </div>
                <div className="sidebar-device-chooser">
                  <div className="row">
                    <div className="col">
                      <div data-toggle="buttons" className="btn-group brand-settings-group">
                        <label className='btn btn-outline-secondary btn-sm p-0 m-0' >
                          <input type="radio" className='d-none' name="device" value="desktop" />
                          <div className='mt-1' style={{ paddingLeft: '4px', paddingRight: '4px' }}>
                            <Monitor size={15} />
                            <span>Desktop</span>
                          </div>
                        </label>
                        <label className='btn btn-outline-secondary btn-sm p-0 m-0' style={{ marginLeft: '2px', marginRight: '2px' }}>
                          <input type="radio" className='d-none' name="device" value="mobile" />
                          <div className='mt-1' style={{ paddingLeft: '4px', paddingRight: '4px' }}>
                            <Smartphone size={15} />
                            <span>Mobile</span>
                          </div>
                        </label>
                        <label className='btn btn-outline-secondary btn-sm p-0 m-0' style={{ marginLeft: '2px', marginRight: '2px' }}>
                          <input type="radio" className='d-none' name="device" value="desktop_and_mobile" />
                          <div className='mt-1' style={{ paddingLeft: '4px', paddingRight: '4px' }}>
                            <Monitor size={15} />
                            <Smartphone size={15} />
                            <span>Both devices</span>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='d-flex p-0 my-1 justify-content-between align-items-center'>
                  <label htmlFor="label" className="text-capitalize w-50">Background Color</label>
                  <input
                    type="color"
                    className="w-50"
                    name="backgroundColor"
                    onChange={updateValues}
                  // defaultValue={activeData.label}
                  />
                </div>
                <div className='my-1'>
                  <label htmlFor="label" className="text- w-50">X Color</label>
                  <input
                    type="color"
                    className="w-50"
                    name="color"
                    onChange={updateValues}
                  // defaultValue={activeData.label}
                  />
                </div>
                <div className='my-1'>
                  <label className='w-100 m-0 text-start'>Size: </label>
                  <div className="d-flex p-0 justify-content-between align-items-center gap-2">
                    <input type='range' className='w-100' name="height" min="0" max="300" />
                    <input type="number" name='height' min="0" max="300" className='w-50 form-control' />
                  </div>
                </div>
                <div className="d-flex justify-content-between my-1" style={{ alignItems: "flex-end" }}>
                  <label className="switch-label">Style</label>
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
                <div className='my-1'>
                  <label className='w-100 m-0 text-start'>Corner radius: </label>
                  <div className="d-flex p-0 justify-content-between align-items-center gap-2">
                    <input type='range' className='w-100' name="height" min="0" max="300" />
                    <input type="number" name='height' min="0" max="300" className='w-50 form-control' />
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      } else if (selectedType === "main") {
        styles = (
          <>
            <UncontrolledAccordion defaultOpen={['1', '2', '3']} stayOpen>
              <AccordionItem style={{ backgroundColor: '#f8f8f8' }}>
                <AccordionHeader className='acc-header' targetId='1' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                  <label>Background Fill</label>
                </AccordionHeader>
                <AccordionBody accordionId='1'>
                  <div className='p-0 mx-0 my-1'>
                    <div className='d-flex p-0 justify-content-between align-items-center gap-1'>
                      <label>Background: </label>
                      <div className="w-50 rounded border cursor-pointer" style={{ backgroundImage: `url(${pixels})` }}>
                        <div onClick={() => setBgModal2(!bgModal2)} className="p-2 w-100 h-100" style={{ ...bgStyles, backgroundImage: getImage(bgStyles.backgroundImage, false) }}></div>
                      </div>
                    </div>
                  </div>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem style={{ backgroundColor: '#f8f8f8' }}>
                <AccordionHeader className='acc-header' targetId='2' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                  <label>Size</label>
                </AccordionHeader>
                <AccordionBody accordionId='2'>
                  <div className='p-0 mx-0 my-1'>
                    <div className=''>
                      <label className='w-100 m-0 text-start'>Width: </label>
                      <div className="d-flex p-0 justify-content-between align-items-center gap-2">
                        <input type='range' className='w-100' name="width" min="0" max="300" />
                        <input type="number" name='height' min="0" max="300" className='w-50 form-control' />
                      </div>
                    </div>
                    <div className=''>
                      <label className='w-100 m-0 text-start'>Min-height: </label>
                      <div className="d-flex p-0 justify-content-between align-items-center gap-2">
                        <input type='range' className='w-100' name="height" min="0" max="300" />
                        <input type="number" name='height' min="0" max="300" className='w-50 form-control' />
                      </div>
                    </div>
                  </div>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem style={{ backgroundColor: '#f8f8f8' }}>
                <AccordionHeader className='acc-header' targetId='3' style={{ borderBottom: '1px solid #EBE9F1', borderRadius: '0' }}>
                  <label>Border and Shadow</label>
                </AccordionHeader>
                <AccordionBody accordionId='3'>
                  <div className='p-0 mx-0 my-1'>
                    <div className='d-flex p-0 mb-1 justify-content-between align-items-center'>
                      <label className='w-50 m-0 text-start'>Border: </label>
                      <select className='w-50 form-select' name="" id="">
                        <option className='text-capitalize' value="none">None</option>
                        <option className='text-capitalize' value="full">Full</option>
                        <option className='text-capitalize' value="top">Top</option>
                        <option className='text-capitalize' value="bottom">Bottom</option>
                        <option className='text-capitalize' value="left">Left</option>
                        <option className='text-capitalize' value="right">Right</option>
                        <option className='text-capitalize' value="topbottom">Top bottom</option>
                      </select>
                    </div>
                    <div className='d-flex p-0 mb-1 justify-content-between align-items-center'>
                      <label className='w-50 m-0 text-start'>Type: </label>
                      <select className='w-50 form-select' name="" id="">
                        <option className='text-capitalize' value="solid">Solid</option>
                        <option className='text-capitalize' value="dashed">Dashed</option>
                        <option className='text-capitalize' value="dotted">Dotted</option>
                      </select>
                    </div>
                    <div className='mb-1 mt-2'>
                      <label className='w-100 m-0 text-start'>Width: </label>
                      <div className="d-flex p-0 justify-content-between align-items-center gap-2">
                        <input type='range' className='w-100' name="width" min="0" max="300" />
                        <input type="number" name='height' min="0" max="300" className='w-50 form-control' />
                      </div>
                    </div>
                    <div className='d-flex flex-column text-start '>
                      <label className='p-0 mb-1 text-start'>Corner radius: </label>
                      <div className='d-flex p-0 mb-1 justify-content-between align-items-center'>
                        <label className='w-75 m-0 text-start' style={{ fontSize: '0.8rem' }}>Use Custom theme rounding </label>
                        <div className="form-check form-switch m-0 p-0" style={{ transform: 'scale(0.8)' }}>
                          <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" />
                        </div>
                      </div>
                      <div className="d-flex align-items-center my-1">
                        <div className="row">
                          <div className="col mb-2">
                            <div className="corner-radius-input d-flex align-items-end">
                              <input type="number" min="0" step="1" className="form-control mr-2" />
                            </div>
                          </div>
                          <div className="col">
                            <div className="corner-radius-input d-flex align-items-start">
                              <input type="number" min="0" step="1" className="form-control mr-2" />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col">
                            <button
                              type="button"
                              className="corner-radius-chain btn btn-link btn-add-icon btn-icon-only design-system"
                            >
                              <span className="d-inline-flex justify-content-center align-items-center btn-icon-only-wrap">
                                <Link2 size={18} strokeWidth={2.5} style={{ transform: 'rotate(-45deg)' }} />
                              </span>
                            </button>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col mb-2">
                            <div className="corner-radius-input corner-radius-input-right d-flex align-items-end">
                              <input type="number" min="0" step="1" className="form-control" />
                            </div>
                          </div>
                          <div className="col">
                            <div className="corner-radius-input corner-radius-input-right d-flex align-items-start">
                              <input type="number" min="0" step="1" className="form-control" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='d-flex p-0 mb-1 justify-content-between align-items-center'>
                      <label className='w-50 m-0 text-start'>Shadow: </label>
                      <select className='w-50 form-select' name="" id="">
                        <option className='text-capitalize' value="none">None</option>
                        <option className='text-capitalize' value="normal">Normal</option>
                        <option className='text-capitalize' value="medium">Medium</option>
                        <option className='text-capitalize' value="large">Large</option>
                      </select>
                    </div>
                  </div>
                </AccordionBody>
              </AccordionItem>
            </UncontrolledAccordion>
          </>
        )
      }
      return <ModificationSection styles={styles} general={general} />
    }
  }

  // const renderSettings = () => {Nav

  //   return colWise.map((cur) => {
  //     cur.elements.map((renderCur) => {
  //         console.log("Cur: ", renderCur)
  //         if (renderCur.type === "text" || renderCur.type === "image" || renderCur.type === "button") {
  //           return (
  //             <>
  //               <div className='label mb-4'>
  //                 <label htmlFor="label" className="text-capitalize">Label</label>
  //                 <input
  //                   type="text"
  //                   className="form-control"
  //                   name="label"
  //                 // defaultValue={activeData.label}
  //                 />
  //               </div>
  //               <div className='class mb-4'>
  //                 <label htmlFor="class" className="text-capitalize">Class</label>
  //                 <input
  //                   type="text"
  //                   className="form-control"
  //                   name="class"
  //                 // defaultValue={activeData.class}
  //                 />
  //               </div>
  //             </>
  //           )
  //         }
  //       })

  //   })
  // }

  const handleColDrop = (e, key, i) => {
    e.stopPropagation()
    const transferedData = e.dataTransfer.getData("type")
    if ((transferedData !== "" && !transferedData.includes("col"))) {
      const dupArray = [...colWise]
      dupArray[key].elements[i].element.push({ ...commonObj, type: transferedData, style: elementStyles[transferedData] })
      setcolWise([...dupArray])
      // console.log(e, key, i)
    }
  }


  console.log("latest colWise", colWise)

  console.log("suggestions", suggestions)

  useEffect(() => {
    if (isMobile) {
      setPopPosition("MC")
    }
  }, [isMobile])

  return (
    <Container className='p-0 position-relative' style={{ height: "100vh" }} fluid onClick={() => setActiveRow("none")} >
      <input type="file" id='hidden-image-input' onChange={handleImage} accept="image/*" className="d-none" />
      <style>{`
        [dir] .ql-bubble .ql-tooltip {
          background-color: #1d1d1d;
          border-radius: 5px;
        }
        [dir] .css-1rhbuit-multiValue {
          background-color: #7367f0 !important;
        }
        [dir] .acc-header button {
          background-color: white !important;
        }
        .row > .px-0 {
          padding-left: 0px !important;
          padding-right: 0px !important;
        }
        .ql-toolbar {
          width: 504px !important;
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
      `}</style>
      {<Row className='border'>
        <Col md='4' className='d-flex justify-column-start align-items-center' style={{ padding: '0.25rem' }}>
          <div className='p-1' onClick={() => navigate(-1)} style={{ marginRight: '1.5rem' }}>
            <button data-bs-toggle="tooltip" data-bs-placement="bottom" title="Back" style={{ border: '0', outline: '0', background: 'transparent', cursor: 'pointer' }}>
              <ArrowLeft size={20} />
            </button>
          </div>
          {/* <div className='rounded d-flex justify-content-center align-items-center btn' style={{ backgroundColor: '#EDECF3', padding: '0.65rem', marginRight: '0.5rem' }}>
            <button data-bs-toggle="tooltip" data-bs-placement="bottom" title="Light Mode" onClick={() => setColorMode('light')} style={{ border: '0', outline: '0', background: 'transparent', cursor: 'pointer' }}>
              <Sun size={18} style={colorMode === 'light' ? { color: '#FA3280' } : {}} />
            </button>
            <button data-bs-toggle="tooltip" data-bs-placement="bottom" title="Dark Mode" onClick={() => setColorMode('dark')} style={{ border: '0', outline: '0', background: 'transparent', cursor: 'pointer' }}>
              <Moon size={18} style={colorMode === 'dark' ? { color: '#FA3280' } : {}} />
            </button>
          </div> */}
          <div className='rounded d-flex justify-content-center align-items-center btn' style={{ padding: '0.65rem' }}>
            <button data-bs-toggle="tooltip" data-bs-placement="bottom" title="Undo" style={{ border: '0', outline: '0', background: 'transparent', cursor: 'pointer' }}><RotateCcw size={18} /></button>
            <button data-bs-toggle="tooltip" data-bs-placement="bottom" title="Redo" style={{ border: '0', outline: '0', background: 'transparent', cursor: 'pointer' }}><RotateCw size={18} /></button>
          </div>
        </Col>
        <Col md='4'>
          <div className='rounded d-flex justify-content-center align-items-center h-100' style={{ marginRight: '0.5rem' }}>
            <button data-bs-toggle="tooltip" data-bs-placement="bottom" title="Desktop View" className='btn' onClick={() => setIsMobile(false)} style={{ border: '0', outline: '0', padding: "0.5rem" }}>
              <Monitor size={18} style={!isMobile ? { color: '#FA3280', filter: "drop-shadow(0px 0px 15px rgba(250, 50, 128, 0.5))" } : {}} />
            </button>
            <button data-bs-toggle="tooltip" data-bs-placement="bottom" title="Mobile View" className='btn' onClick={() => setIsMobile(true)} style={{ border: '0', outline: '0', padding: "0.5rem" }}>
              <Smartphone size={18} style={isMobile ? { color: '#FA3280', filter: "drop-shadow(0px 0px 15px rgba(250, 50, 128, 0.5))" } : {}} />
            </button>
          </div>
        </Col>
        <Col md='4' className='d-flex justify-content-end align-items-center' style={{ padding: '0.25rem' }}>
          <div className="" style={{ padding: '0.5rem' }}><input className='rounded' placeholder='Template 1' style={{ backgroundColor: '#EDECF3', border: '0', outline: '0', padding: '0.5rem', fontSize: '0.9rem' }} /></div>
          {/* <div className="" style={{ padding: '0.5rem' }}><button className='rounded d-flex' style={{ backgroundColor: '#EDECF3', border: '0', outline: '0', padding: '0.5rem 1rem', fontSize: '0.9rem', color: '#3F3E58', gap: '0.5rem' }}><Copy size={18} /> Switch Template</button></div>
          <div className="" style={{ padding: '0.5rem' }}><button className='rounded d-flex' style={{ backgroundColor: '#EDECF3', border: '0', outline: '0', padding: '0.5rem 1.25rem', fontSize: '0.9rem', color: '#3F3E58', gap: '0.5rem' }}><Mail size={18} /> Testing</button></div> */}
          <div className="" style={{ padding: '0.5rem' }}><button className='rounded d-flex fw-bolder' style={{ backgroundImage: 'linear-gradient(60deg, #f53a82, #9557ff)', border: '0', outline: '0', padding: '0.5rem 1.25rem', fontSize: '0.95rem', color: '#ffffff', gap: '0.5rem' }}><Save size={18} /> Save</button></div>
        </Col>
      </Row>}
      <Row className='match-height h-100'>
        <Col className='border px-0 py-2 d-flex flex-column justify-content-start align-items-center' style={{ gap: '1.25rem', maxWidth: "75px", height: "90%" }}>
          <div className='d-flex flex-column justify-content-center align-items-center' onClick={() => setSideNav(sideNav === 'display' ? "" : "display")} style={{ cursor: 'pointer', gap: '0rem' }}>
            <button className='d-flex justify-content-center align-items-center btn rounded-3' data-bs-toggle="tooltip" data-bs-placement="bottom" title="Display" style={sideNav === 'display' ? { border: '0', width: 'fit-content', backgroundColor: '#EDECF3', padding: '1rem' } : { border: '0', width: 'fit-content', backgroundColor: 'transparent', padding: '1rem' }}><Tv size={18} /></button>
            <label className='fw-bold' style={sideNav === 'display' ? { fontSize: '0.85rem', color: '#FA3280', cursor: 'pointer' } : { fontSize: '0.85rem', cursor: 'pointer' }}>Display</label>
          </div>
          {/* <div className='d-flex flex-column justify-content-center align-items-center' onClick={() => setSideNav('add-layout')} style={{ cursor: 'pointer', gap: '0rem' }}>
            <button className='d-flex justify-content-center align-items-center btn rounded-3' data-bs-toggle="tooltip" data-bs-placement="bottom" title="Add Layout" style={sideNav === 'add-layout' ? { border: '0', width: 'fit-content', backgroundColor: '#EDECF3', padding: '1rem' } : { border: '0', width: 'fit-content', backgroundColor: 'transparent', padding: '1rem' }}><Columns size={18} /></button>
            <label className='fw-bold text-center' style={sideNav === 'add-layout' ? { fontSize: '0.85rem', color: '#FA3280', cursor: 'pointer' } : { fontSize: '0.85rem', cursor: 'pointer' }}>Add Layout</label>
          </div> */}
          <div className='d-flex flex-column justify-content-center align-items-center' onClick={() => setSideNav(sideNav === 'add-elements' ? "" : 'add-elements')} style={{ cursor: 'pointer', gap: '0rem' }}>
            <button className='d-flex justify-content-center align-items-center btn rounded-3' data-bs-toggle="tooltip" data-bs-placement="bottom" title="Add Element" style={sideNav === 'add-elements' ? { border: '0', width: 'fit-content', backgroundColor: '#EDECF3', padding: '1rem' } : { border: '0', width: 'fit-content', backgroundColor: 'transparent', padding: '1rem' }}><PlusCircle size={18} /></button>
            <label className='fw-bold text-center' style={sideNav === 'add-elements' ? { fontSize: '0.85rem', color: '#FA3280', cursor: 'pointer' } : { fontSize: '0.85rem', cursor: 'pointer' }}>Element</label>
          </div>
          <div className='d-flex flex-column justify-content-center align-items-center' onClick={() => setSideNav(sideNav === 'criteria' ? "" : "criteria")} style={{ cursor: 'pointer', gap: '0rem' }}>
            <button className='d-flex justify-content-center align-items-center btn rounded-3' data-bs-toggle="tooltip" data-bs-placement="bottom" title="Criteria" style={sideNav === 'criteria' ? { border: '0', width: 'fit-content', backgroundColor: '#EDECF3', padding: '1rem' } : { border: '0', width: 'fit-content', backgroundColor: 'transparent', padding: '1rem' }}><Crosshair size={18} /></button>
            <label className='fw-bold text-center' style={sideNav === 'criteria' ? { fontSize: '0.85rem', color: '#FA3280', cursor: 'pointer' } : { fontSize: '0.85rem', cursor: 'pointer' }}>Criteria</label>
          </div>
        </Col>
        <Col className={`${sideNav === "" ? "px-0" : "border"} py-0`} style={{ maxWidth: sideNav === "" ? "0px" : '225px', overflowY: "auto", overflowX: "hidden", transition: "0.3s ease", height: "90%" }}>
          {sideNav === 'display' && (
            <UncontrolledAccordion defaultOpen={['1', '2', '3']} stayOpen>
              <AccordionItem style={{ backgroundColor: "white", borderBottom: "1px solid rgb(235, 233, 241)" }}>
                <AccordionHeader className='acc-header' targetId='1' style={{ borderRadius: '0', borderBottom: "1px solid rgb(235, 233, 241)" }}>
                  <label>Position</label>
                </AccordionHeader>
                <AccordionBody accordionId='1'>
                  <div className='p-0 mx-0 my-1 d-flex justify-content-center align-items-center'>
                    {!isMobile ? (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 513 367.2">
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
                        fill="#2d2d2d"
                      />
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
                          onClick={() => setPopPosition("TL")}
                          style={{ cursor: "pointer", transition: "0.3s ease" }}
                          fill={popPosition === "TL" ? "#7367f0" : "#ffffff"}
                          stroke="#231f20"
                          strokeMiterlimit={10}
                          className="mosaic"
                          d="M22.8 21.7H178.60000000000002V110.8H22.8z"
                        />
                        <path
                          onClick={() => setPopPosition("TC")}
                          style={{ cursor: "pointer", transition: "0.3s ease" }}
                          fill={popPosition === "TC" ? "#7367f0" : "#ffffff"}
                          stroke="#231f20"
                          strokeMiterlimit={10}
                          className="mosaic"
                          d="M178.6 21.7H334.4V110.8H178.6z"
                        />
                        <path
                          onClick={() => setPopPosition("TR")}
                          style={{ cursor: "pointer", transition: "0.3s ease" }}
                          fill={popPosition === "TR" ? "#7367f0" : "#ffffff"}
                          stroke="#231f20"
                          strokeMiterlimit={10}
                          className="mosaic"
                          d="M334.4 21.7H490.2V110.8H334.4z"
                        />
                        <path
                          onClick={() => setPopPosition("ML")}
                          style={{ cursor: "pointer", transition: "0.3s ease" }}
                          fill={popPosition === "ML" ? "#7367f0" : "#ffffff"}
                          stroke="#231f20"
                          strokeMiterlimit={10}
                          className="mosaic"
                          d="M22.8 110.8H178.60000000000002V199.89999999999998H22.8z"
                        />
                        <path
                          onClick={() => setPopPosition("MC")}
                          style={{ cursor: "pointer", transition: "0.3s ease" }}
                          fill={popPosition === "MC" ? "#7367f0" : "#ffffff"}
                          stroke="#231f20"
                          strokeMiterlimit={10}
                          className="mosaic selected"
                          d="M178.6 110.8H334.4V199.89999999999998H178.6z"
                        />
                        <path
                          onClick={() => setPopPosition("MR")}
                          style={{ cursor: "pointer", transition: "0.3s ease" }}
                          fill={popPosition === "MR" ? "#7367f0" : "#ffffff"}
                          stroke="#231f20"
                          strokeMiterlimit={10}
                          className="mosaic"
                          d="M334.4 110.8H490.2V199.89999999999998H334.4z"
                        />
                        <path
                          onClick={() => setPopPosition("BL")}
                          style={{ cursor: "pointer", transition: "0.3s ease" }}
                          fill={popPosition === "BL" ? "#7367f0" : "#ffffff"}
                          stroke="#231f20"
                          strokeMiterlimit={10}
                          className="mosaic"
                          d="M22.8 199.9H178.60000000000002V289H22.8z"
                        />
                        <path
                          onClick={() => setPopPosition("BC")}
                          style={{ cursor: "pointer", transition: "0.3s ease" }}
                          fill={popPosition === "BC" ? "#7367f0" : "#ffffff"}
                          stroke="#231f20"
                          strokeMiterlimit={10}
                          className="mosaic"
                          d="M178.6 199.9H334.4V289H178.6z"
                        />
                        <path
                          onClick={() => setPopPosition("BR")}
                          style={{ cursor: "pointer", transition: "0.3s ease" }}
                          fill={popPosition === "BR" ? "#7367f0" : "#ffffff"}
                          stroke="#231f20"
                          strokeMiterlimit={10}
                          className="mosaic"
                          d="M334.4 199.9H490.2V289H334.4z"
                        />
                      </g>
                    </svg>) : (<svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 184.45 367.2"
                      style={{ width: "55px" }}
                      property="globalStyle.overlay.mobilePosition"
                    >
                      <g id="mobile-position">
                        <rect x="11.76" y="239.71" width="162.2" height="116.24" onClick={() => setPopPosition("BC")} style={{ cursor: "pointer", transition: "0.3s ease" }} stroke="#231f20" fill={popPosition === "BC" ? "#7367f0" : "#ffffff"} />
                        <rect x="11.99" y="124.46" width="162.2" height="116.24" onClick={() => setPopPosition("MC")} style={{ cursor: "pointer", transition: "0.3s ease" }} stroke="#231f20" fill={popPosition === "MC" ? "#7367f0" : "#ffffff"} />
                        <rect x="11.61" y="9.2" width="162.2" height="116.24" onClick={() => setPopPosition("TC")} style={{ cursor: "pointer", transition: "0.3s ease" }} stroke="#231f20" fill={popPosition === "TC" ? "#7367f0" : "#ffffff"} />
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
                    </svg>)}
                  </div>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem style={{ backgroundColor: "white", borderBottom: "1px solid rgb(235, 233, 241)" }}>
                <AccordionHeader className='acc-header' targetId='2' style={{ borderRadius: '0', borderBottom: "1px solid rgb(235, 233, 241)" }}>
                  <label>Transition</label>
                </AccordionHeader>
                <AccordionBody accordionId='2'>
                  <div className='p-0 mx-0 my-1'>
                    <label className='mb-1' >Type: </label>
                    <Select options={[
                      { value: 'no-animation', label: 'None' },
                      { value: 'zoomIn', label: 'Zoom' },
                      { value: 'fadeIn', label: 'Fade' }
                    ]} />
                  </div>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem style={{ backgroundColor: "white", borderBottom: "1px solid rgb(235, 233, 241)" }}>
                <AccordionHeader className='acc-header' targetId='3' style={{ borderRadius: '0', borderBottom: "1px solid rgb(235, 233, 241)" }}>
                  <label>Website Overlay</label>
                </AccordionHeader>
                <AccordionBody accordionId='3'>
                  <div className='p-0 mx-0 my-1'>
                    <div className='d-flex p-0 justify-content-between align-items-center'>
                      <label>Background: </label>
                      <div className="w-50" style={{ backgroundImage: `url(${pixels})` }}>
                        <div onClick={() => setBgModal(!bgModal)} className="p-2 w-100 h-100" style={{ ...bgsettings, backgroundImage: getImage(bgsettings.backgroundImage, false) }}></div>
                      </div>
                    </div>
                    <div className='mt-2'>
                      <label className='mb-1'>Animations: </label>
                      <Select options={[
                        { value: 'no-animation', label: 'None' },
                        { value: 'zoomIn', label: 'Confetti' },
                        { value: 'fadeIn', label: 'Fireworks' }
                      ]} />
                    </div>
                    <div className='mt-2'>
                      <label className='mb-1'>Pages: </label>
                      <Select options={[
                        { value: 'main-page', label: 'Main Page' },
                        { value: 'all-page', label: 'All Page' }
                      ]} />
                    </div>
                  </div>
                </AccordionBody>
              </AccordionItem>
            </UncontrolledAccordion>
          )}
          {sideNav === 'add-layout' && (
            <Container className='p-1'>
              <Row className='mb-1'>
                <div className='fw-bold border-bottom' style={{ paddingBottom: '0.5rem' }}>Layouts</div>
                <div className='d-flex flex-column justify-content-start align-items-center py-1 flex-wrap' style={{ gap: '1rem' }}>
                  <div draggable onDragStart={(e) => handleDragStart(e, "col1")} className='d-flex justify-content-center align-items-center btn rounded w-100 gap-1 cursor-pointer' style={{ padding: '0.5rem 0.75rem', backgroundColor: '#EDECF3' }} >
                    <div className='p-1 w-100' style={{ backgroundColor: '#bfdbfe' }}></div>
                  </div>
                  <div draggable onDragStart={(e) => handleDragStart(e, "col2")} className='d-flex justify-content-center align-items-center btn rounded w-100 gap-1 cursor-pointer' style={{ padding: '0.5rem 0.75rem', backgroundColor: '#EDECF3' }} >
                    <div className='p-1 w-100' style={{ backgroundColor: '#bfdbfe' }}></div>
                    <div className='p-1 w-100' style={{ backgroundColor: '#bfdbfe' }}></div>
                  </div>
                  <div draggable onDragStart={(e) => handleDragStart(e, "col3")} className='d-flex justify-content-center align-items-center btn rounded w-100 gap-1 cursor-pointer' style={{ padding: '0.5rem 0.75rem', backgroundColor: '#EDECF3' }} >
                    <div className='p-1 w-100' style={{ backgroundColor: '#bfdbfe' }}></div>
                    <div className='p-1 w-100' style={{ backgroundColor: '#bfdbfe' }}></div>
                    <div className='p-1 w-100' style={{ backgroundColor: '#bfdbfe' }}></div>
                  </div>
                </div>
              </Row>
            </Container>
          )}
          {sideNav === 'add-elements' && (
            <Container className='p-1'>
              <Row className='mb-1'>
                <div className='fw-bold border-bottom' style={{ paddingBottom: '0.5rem' }}>Basic Elements</div>
                <div className='d-flex justify-content-start align-items-center py-1 flex-wrap' style={{ gap: '0.5rem' }}>
                  <div draggable name="type" onDragStart={(e) => handleDragStart(e, "text", "type")} className='d-flex flex-column justify-content-center align-items-center border border-3 rounded-3 cursor-pointer' style={{ gap: '0.35rem', backgroundColor: '#EDECF3', padding: '1rem', width: '4.9rem' }}>
                    <Type size={16} color={'#db2777'} />
                    <div style={{ fontSize: '0.9rem' }}>
                      Text
                    </div>
                  </div>
                  <div draggable name="type" onDragStart={(e) => handleDragStart(e, "image")} className='d-flex flex-column justify-content-center align-items-center border border-3 rounded-3 cursor-pointer' style={{ gap: '0.35rem', backgroundColor: '#EDECF3', padding: '1rem', width: '4.9rem' }}>
                    <Image size={16} color={'#2563eb'} />
                    <div style={{ fontSize: '0.9rem' }}>
                      Image
                    </div>
                  </div>
                  <div draggable name="type" onDragStart={(e) => handleDragStart(e, "button")} className='d-flex flex-column justify-content-center align-items-center border border-3 rounded-3 cursor-pointer' style={{ gap: '0.35rem', backgroundColor: '#EDECF3', padding: '1rem', width: '4.9rem' }}>
                    <Square size={16} color={'#16a34a'} />
                    <div style={{ fontSize: '0.9rem' }}>
                      Button
                    </div>
                  </div>
                </div>
              </Row>
              <Row className='mb-1'>
                <div className='fw-bold border-bottom' style={{ paddingBottom: '0.5rem' }}>Structured Elements</div>
                <div className='d-flex justify-content-start align-items-center py-1 flex-wrap' style={{ gap: '0.5rem' }}>
                  <div draggable onDragStart={(e) => handleDragStart(e, "col1")} className='d-flex flex-column justify-content-center align-items-center border border-3 rounded-3 cursor-pointer' style={{ gap: '0.35rem', backgroundColor: '#EDECF3', padding: '1rem', width: '4.9rem' }}>
                    <Square size={16} color={'#7c3aed'} />
                    <div style={{ fontSize: '0.9rem' }}>
                      Block
                    </div>
                  </div>
                </div>
              </Row>
              <Row className='mb-1'>
                <div className='fw-bold border-bottom' style={{ paddingBottom: '0.5rem' }}>Form Elements</div>
                <div className='d-flex justify-content-start align-items-center py-1 flex-wrap' style={{ gap: '0.5rem' }}>
                  <div draggable onDragStart={(e) => handleDragStart(e, "input")} className='d-flex flex-column justify-content-center align-items-center border border-3 rounded-3 cursor-pointer' style={{ gap: '0.35rem', backgroundColor: '#EDECF3', padding: '1rem', width: '4.9rem' }}>
                    <AlignCenter size={16} color={'#7c3aed'} />
                    <div style={{ fontSize: '0.9rem' }}>
                      Input
                    </div>
                  </div>
                  {/* <div draggable className='d-flex flex-column justify-content-center align-items-center border border-3 rounded-3 cursor-pointer' style={{ gap: '0.35rem', backgroundColor: '#EDECF3', padding: '1rem', width: '4.9rem' }}>
                    <Circle size={16} color={'#7c3aed'} />
                    <div style={{ fontSize: '0.9rem' }}>
                      Radio
                    </div>
                  </div>
                  <div draggable className='d-flex flex-column justify-content-center align-items-center border border-3 rounded-3 cursor-pointer' style={{ gap: '0.35rem', backgroundColor: '#EDECF3', padding: '1rem', width: '4.9rem' }}>
                    <CheckSquare size={16} color={'#7c3aed'} />
                    <div className='text-center' style={{ fontSize: '0.8rem' }}>
                      Checkboxh: 
                    </div>
                  </div>
                  <div draggable className='d-flex flex-column justify-content-center align-items-center border border-3 rounded-3 cursor-pointer' style={{ gap: '0.35rem', backgroundColor: '#EDECF3', padding: '1rem', width: '4.9rem' }}>
                    <ChevronDown size={16} color={'#7c3aed'} />
                    <div className='text-center' style={{ fontSize: '0.8rem' }}>
                      Dropdown
                    </div>
                  </div>
                  <div draggable className='d-flex flex-column justify-content-center align-items-center border border-3 rounded-3 cursor-pointer' style={{ gap: '0.35rem', backgroundColor: '#EDECF3', padding: '1rem', width: '4.9rem' }}>
                    <Star size={16} color={'#7c3aed'} />
                    <div className='text-center' style={{ fontSize: '0.8rem' }}>
                      Feedback
                    </div>
                  </div>
                  <div draggable className='d-flex flex-column justify-content-center align-items-center border border-3 rounded-3 cursor-pointer' style={{ gap: '0.35rem', backgroundColor: '#EDECF3', padding: '1rem', width: '4.9rem' }}>
                    <AlignJustify size={16} color={'#7c3aed'} />
                    <div className='text-center' style={{ fontSize: '0.8rem' }}>
                      TextArea
                    </div>
                  </div> */}
                </div>
              </Row>
              {/* <Row className='mb-1'>
                <div className='fw-bold border-bottom' style={{ paddingBottom: '0.5rem' }}>Product Offers</div>
                <div className='d-flex justify-content-start align-items-center py-1 flex-wrap' style={{ gap: '0.5rem' }}>
                  <div draggable className='d-flex flex-column justify-content-center align-items-center border border-3 rounded-3 cursor-pointer' style={{ gap: '0.35rem', backgroundColor: '#EDECF3', padding: '1rem', width: '4.9rem' }}><Clock size={16} color={'#059669'} /> <div className='text-center' style={{ fontSize: '0.8rem' }}>Count Down</div></div>
                  <div draggable className='d-flex flex-column justify-content-center align-items-center border border-3 rounded-3 cursor-pointer' style={{ gap: '0.35rem', backgroundColor: '#EDECF3', padding: '1rem', width: '4.9rem' }}><Percent size={16} color={'#059669'} /> <div className='text-center' style={{ fontSize: '0.8rem' }}>Discount Code</div></div>
                  <div draggable className='d-flex flex-column justify-content-center align-items-center border border-3 rounded-3 cursor-pointer' style={{ gap: '0.35rem', backgroundColor: '#EDECF3', padding: '1rem', width: '4.9rem' }}><Watch size={16} color={'#059669'} /> <div className='text-center' style={{ fontSize: '0.8rem' }}>Product Card</div></div>
                </div>
              </Row> */}
            </Container>
          )}
          {sideNav === "criteria" && <>
            <UncontrolledAccordion stayOpen>
              <AccordionItem style={{ backgroundColor: "white", borderBottom: "1px solid rgb(235, 233, 241)" }}>
                <AccordionHeader className='acc-header' targetId='0' style={{ borderRadius: '0', borderBottom: "1px solid rgb(235, 233, 241)" }}>
                  <label>Campaign</label>
                </AccordionHeader>
                <AccordionBody accordionId='0'>
                  <div className='p-0 mx-0 my-1'>
                    <PickerDefault picker={campaignStart} minDate={"today"} setPicker={setCampaignStart} />
                    <div className="form-check d-flex align-items-center gap-2 mx-0 p-0 my-2">
                      <label htmlFor="endDateCheck" className="form-check-label m-0 p-0">Set end date</label><input id='endDateCheck' checked={isEndCampaign} type="checkbox" onChange={e => setIsEndCampaign(e.target.checked)} className="form-check-input m-0" />
                    </div>
                    {isEndCampaign && (
                      <PickerDefault picker={campaignEnd} minDate={campaignStart} setPicker={setCampaignEnd} />
                    )}
                  </div>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem style={{ backgroundColor: "white", borderBottom: "1px solid rgb(235, 233, 241)" }}>
                <AccordionHeader className='acc-header' targetId='1' style={{ borderRadius: '0', borderBottom: "1px solid rgb(235, 233, 241)" }}>
                  <label>Show Pop-up To</label>
                </AccordionHeader>
                <AccordionBody accordionId='1'>
                  <div className='p-0 mx-0 my-1'>
                    {/* <select className="form-select">
                      <option>All Visitors</option>
                      <option>First Time Visitors</option>
                      <option>Returning Visitors</option>
                      <option>Registered Visitors</option>
                    </select> */}
                    <Select options={[
                      { value: 'chocolate', label: 'All Visitors' },
                      { value: 'strawberry', label: 'First Time Visitors' },
                      { value: 'vanilla', label: 'Returning Visitors' },
                      { value: 'blueberry', label: 'Registered Users' }
                    ]} />

                  </div>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem style={{ backgroundColor: "white", borderBottom: "1px solid rgb(235, 233, 241)" }}>
                <AccordionHeader className='acc-header' targetId='2' style={{ borderRadius: '0', borderBottom: "1px solid rgb(235, 233, 241)" }}>
                  <label>Pop-up Visible On</label>
                </AccordionHeader>
                <AccordionBody accordionId='2'>
                  <div className='p-0 mx-0 my-1'>
                    <Select options={[
                      { value: 'chocolate', label: 'Scroll' },
                      { value: 'strawberry', label: 'Delay' }
                    ]} />
                    <input type="range" style={{ accentColor: "#7367f0" }} className='w-100 mt-2' />
                  </div>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem style={{ backgroundColor: "white", borderBottom: "1px solid rgb(235, 233, 241)" }}>
                <AccordionHeader className='acc-header' targetId='3' style={{ borderRadius: '0', borderBottom: "1px solid rgb(235, 233, 241)" }}>
                  <label>Pop-up Active On</label>
                </AccordionHeader>
                <AccordionBody accordionId='3'>
                  <div className='p-0 mx-0 my-1'>
                    <Select isMulti closeMenuOnSelect={false} options={[
                      { value: 'all', label: 'All Pages' },
                      { value: 'home', label: 'Home Page' },
                      { value: 'product', label: 'Product Page' },
                      { value: 'product-list', label: 'Product List Page' },
                      { value: 'cart', label: 'Cart Page' },
                      { value: 'custom', label: 'Custom Pages' }
                    ]} />
                  </div>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem style={{ backgroundColor: "white", borderBottom: "1px solid rgb(235, 233, 241)" }}>
                <AccordionHeader className='acc-header' targetId='4' style={{ borderRadius: '0', borderBottom: "1px solid rgb(235, 233, 241)" }}>
                  <label>User Verification</label>
                </AccordionHeader>
                <AccordionBody accordionId='4'>
                  <div className='p-0 mx-0 my-1'>
                    <div className='d-flex p-0 justify-content-between align-items-center form-check form-switch'>
                      <label className='form-check-label'>Skip user verification? </label>
                      <input type='checkbox' className='form-check-input' style={{ cursor: 'pointer' }} />
                    </div>
                  </div>
                </AccordionBody>
              </AccordionItem>
            </UncontrolledAccordion>
          </>}
        </Col>
        <Col className='border flex-grow-1' style={{ padding: '0.5rem', height: "90%" }}>
          <div style={{ width: isMobile ? "300px" : '100%' }} className="h-100 border d-flex flex-column align-items-stretch justify-content-start m-auto">
            <div className='nav-bar d-flex justify-content-between align-items-center rounded-top gap-2' style={{ backgroundColor: '#D7DBDF', padding: '0.5rem' }}>
              <div className="d-flex justify-content-start align-items-center flex-grow-1">
                <div className='d-flex justify-content-start align-items-center bg-white rounded-pill w-100' style={{ marginLeft: '1.5rem', padding: '0.25rem 1.25rem', gap: '0.5rem', width: '30rem' }}><Lock size={12} /><span style={{ fontSize: '0.9rem' }}>xircls.com</span></div>
              </div>
              <div className='d-flex justify-content-end align-items-center' style={{ gap: '0.75rem', marginRight: '1.25rem' }}>
                <div className='rounded-circle' style={{ padding: '0.5rem', backgroundColor: '#22c55e' }}></div>
                <div className='rounded-circle' style={{ padding: '0.5rem', backgroundColor: '#f59e0b' }}></div>
                <div className='rounded-circle' style={{ padding: '0.5rem', backgroundColor: '#ef4444' }}></div>
              </div>
            </div>
            <div className="flex-grow-1" style={{ backgroundImage: 'url("https://miro.medium.com/v2/resize:fit:678/1*ZPvzUShTe448VPDukHiskw.png")', backgroundSize: 'contain', backgroundPosition: 'top center', overflowY: "auto", position: "relative" }}>
              {/* <div style={{inset: "0px", zIndex: "0", backgroundColor: "rgba(0,0,0,0.25)", position: "sticky", width: "100%", height: "100%"}}></div> */}
              <div style={{ width: "100%", height: "100%", position: "relative", overflowY: "auto", display: "flex", justifyContent: popPosition.includes("L") ? "start" : popPosition.includes("C") ? "center" : "end", alignItems: popPosition.includes("T") ? "start" : popPosition.includes("M") ? "center" : "end", ...bgsettings, backgroundImage: getImage(bgsettings.backgroundImage, false) }}>
                <div id="dropZoneParent" onClick={() => {
                  setCurrPosition({ ...currPosition, selectedType: "main" })
                }} onDragOver={(e) => {
                  handleDragOver(e)
                  setDragOverIndex({ cur: colWise.length, curElem: "left", subElem: 0 })
                }}
                  onDrop={(e) => {
                    handleLayoutDrop(e)
                    setIndexes({ cur: colWise.length, curElem: "left", subElem: 0 })
                    const transferType = e.dataTransfer.getData("type")
                    // console.log("transferType", transferType)
                    setCurrPosition({ ...currPosition, id: colWise.length, selectedType: transferType.includes("col") ? "block" : transferType })
                  }} className="pop-up" style={{ position: 'relative', zIndex: '300', width: isMobile ? "90%" : '550px', minHeight: '25rem', maxHeight: "100%", overflow: "scroll", backgroundColor: "white", padding: "20px 10px 10px", ...bgStyles, backgroundImage: getImage(bgStyles?.backgroundImage) }}>
                  <div style={{ position: "absolute", inset: "0px 0px auto auto", zIndex: "350" }}><X size={18} /></div>
                  <style>
                    {`
          .ql-editor {
            padding: 0px !important;
            text-align: center !important
          }
        `}
                  </style>
                  {/* Render Layout Here */}
                  {
                    colWise.map((cur, key) => {
                      // console.log("cur: ", cur)
                      return <div draggable className="bg-light-secondary" style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }} key={key} onClick={(e) => {
                        e.stopPropagation()
                        // console.log("keyisthe", key)
                        setActiveRow(key)
                        makActive(e, cur, "parent", "parent", key, "parent", "parent")
                        setCurrPosition({ ...currPosition, selectedType: "block" })
                        setIndexes({ cur: key, curElem: "parent", subElem: "grandparent" })
                      }}>
                        {activeRow === key && <div style={{ position: "absolute", outline: "2px solid #7367f0", inset: "0px", zIndex: "3", pointerEvents: "none" }}>
                          <div style={{ position: "relative", width: "100%", height: "100%" }}>
                            <span style={{ position: "absolute", inset: "-25px 0px auto auto", backgroundColor: "#7367f0", cursor: "pointer", aspectRatio: "1", width: "25px", display: "flex", borderRadius: "5px 5px 0px 0px", zIndex: "2", pointerEvents: "fill" }} onClick={(e) => {
                              e.stopPropagation()
                              setActiveRow("none")
                              deleteRow(key)
                            }}>
                              <Trash2 className='m-auto' color='#ffffff' size={12} />
                            </span>
                          </div>
                        </div>}
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative", width: "100%", zIndex: "1", padding: '1rem' }}
                        >
                          {
                            cur?.elements?.map((curElem, i, elements) => {
                              // console.log("curElem", curElem)
                              return (
                                <div style={{ width: `${100 / elements.length}%`, padding: "0.5rem" }} onClick={(e) => {
                                  e.stopPropagation()
                                  setActiveRow("none")
                                  makActive(e, cur, curElem, curElem.positionType, key, i, "parent")
                                  setCurrPosition({ ...currPosition, selectedType: "column" })
                                  setIndexes({ cur: key, curElem: curElem.positionType, subElem: "parent" })
                                }}
                                  onDrop={e => {
                                    e.stopPropagation()
                                    handleColDrop(e, key, i)
                                    const transferType = e.dataTransfer.getData("type")
                                    setCurrPosition({ ...currPosition, j: curElem.element.length, selectedType: transferType })
                                    setIndexes({ cur: key, curElem: curElem.positionType, subElem: curElem.element.length })
                                  }}>
                                  {curElem?.element?.map((subElem, j) => {
                                    // console.log("subElem", subElem)
                                    // console.log(j)
                                    switch (subElem?.type) {
                                      case 'text':
                                        // return <span contentEditable="true" className="text-secondary p-1 rounded-2 " style={{ fontSize: '14.4px', border: '1px solid black' }} onClick={(e) => makActive(e, cur)} >Text Element</span>
                                        return (
                                          <div style={{ ...subElem.style, width: "100%" }}
                                            onClick={e => {
                                              e.stopPropagation()
                                              makActive(e, cur, curElem, curElem.positionType, key, i, j)
                                              setCurrPosition({ ...currPosition, selectedType: "text" })
                                              setIndexes({ cur: key, curElem: curElem.positionType, subElem: j })
                                            }}
                                            onDrop={e => {
                                              e.stopPropagation()
                                              handleColDrop(e, key, i)
                                              const transferType = e.dataTransfer.getData("type")
                                              setCurrPosition({ ...currPosition, j: j + 1, selectedType: transferType })
                                              setIndexes({ cur: key, curElem: curElem.positionType, subElem: j + 1 })
                                            }}
                                            onDragOver={e => {
                                              e.preventDefault()
                                              e.stopPropagation()
                                              setDragOverIndex({ cur: key, curElem: curElem.positionType, subElem: j + 1 })
                                            }}>
                                            <ReactQuill
                                            id={`textField-${key}-${curElem.positionType}-${j}`}
                                              style={{ width: '100%', color: "black" }}
                                              theme='bubble'
                                              // defaultValue={"Enter Text"}
                                              value={subElem.textValue}
                                              onChange={e => {
                                                // console.log(e, key, i, j)
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
                                              ]} />
                                          </div>
                                        )
                                      case 'image':
                                        const imageSelector = document.getElementById("hidden-image-input")
                                        if (subElem.src !== "") {
                                          return (
                                            <div style={{ ...subElem.style }}
                                              onClick={e => {
                                                e.stopPropagation()
                                                makActive(e, cur, curElem, curElem.positionType, key, i, j)
                                                setCurrPosition({ ...currPosition, selectedType: "image" })
                                                setIndexes({ cur: key, curElem: curElem.positionType, subElem: j })
                                              }}
                                              onDrop={e => {
                                                e.stopPropagation()
                                                handleColDrop(e, key, i)
                                                const transferType = e.dataTransfer.getData("type")
                                                setCurrPosition({ ...currPosition, j: j + 1, selectedType: transferType })
                                                setIndexes({ cur: key, curElem: curElem.positionType, subElem: j + 1 })

                                              }}
                                              onDragOver={e => {
                                                e.preventDefault()

                                                e.stopPropagation()
                                                setDragOverIndex({ cur: key, curElem: curElem.positionType, subElem: j + 1 })
                                              }}
                                            >
                                              <img
                                                className="img-fluid"
                                                src={settingImage(subElem.src)}
                                                alt={`Selected Image ${i}`}
                                                style={{ width: "100%" }}
                                              />
                                            </div>
                                          )
                                        } else {
                                          setCurrPosition({ ...currPosition, j })
                                          imageSelector.click()
                                          const dupArray = [...colWise]
                                          dupArray[key].elements[i].element[j].type = ""
                                          setcolWise([...dupArray])
                                        }
                                      case 'button':
                                        return (
                                          <div style={{ width: "100%" }}
                                            onClick={e => {
                                              e.stopPropagation()
                                              makActive(e, cur, curElem, curElem.positionType, key, i, j)
                                              setCurrPosition({ ...currPosition, selectedType: "button" })
                                              setIndexes({ cur: key, curElem: curElem.positionType, subElem: j })
                                            }}
                                            onDrop={e => {
                                              e.stopPropagation()
                                              handleColDrop(e, key, i)
                                              const transferType = e.dataTransfer.getData("type")
                                              setCurrPosition({ ...currPosition, j: j + 1, selectedType: transferType })
                                              setIndexes({ cur: key, curElem: curElem.positionType, subElem: j + 1 })
                                            }}
                                            onDragOver={e => {
                                              e.preventDefault()
                                              e.stopPropagation()
                                              setDragOverIndex({ cur: key, curElem: curElem.positionType, subElem: j + 1 })
                                            }}>
                                            <div style={{ ...subElem?.style, height: Number(subElem.style.height) === 0 ? "auto" : `${subElem.style.height}px`, display: "flex", justifyContent: "center", alignItems: "center" }} ><ReactQuill
                                              theme='bubble'
                                              defaultValue={"Button Text"}
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
                                              ]} /></div>
                                          </div>
                                        )
                                      case 'input':
                                        return (
                                          <div style={{ width: "100%" }}
                                            onClick={e => {
                                              e.stopPropagation()
                                              makActive(e, cur, curElem, curElem.positionType, key, i, j)
                                              setCurrPosition({ ...currPosition, selectedType: "input" })
                                              setIndexes({ cur: key, curElem: curElem.positionType, subElem: j })
                                            }}
                                            onDrop={e => {
                                              e.stopPropagation()
                                              handleColDrop(e, key, i)
                                              const transferType = e.dataTransfer.getData("type")
                                              setCurrPosition({ ...currPosition, j: j + 1, selectedType: transferType })
                                              setIndexes({ cur: key, curElem: curElem.positionType, subElem: j + 1 })
                                            }}
                                            onDragOver={e => {
                                              e.preventDefault()
                                              e.stopPropagation()
                                              setDragOverIndex({ cur: key, curElem: curElem.positionType, subElem: j + 1 })
                                            }}>
                                            <input type="text" style={{ ...subElem.style }} />
                                          </div>
                                        )
                                      default:
                                        return <div key={i} className='' style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", padding: "1rem" }}
                                          // onClick={(e) => makActive(e, cur)}
                                          onDragOver={(e) => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                            // console.log("dragOver", key, i)
                                            makActive(e, cur, curElem, curElem.positionType, key, i, j)
                                            handleDragOver(e)
                                            setDragOverIndex({ cur: key, curElem: curElem.positionType, subElem: j })
                                          }}
                                          onClick={(e) => {
                                            makActive(e, cur, curElem, curElem.positionType, key, i, j)
                                          }}
                                          onDrop={(e) => {
                                            e.stopPropagation()
                                            // console.log("drop", key, i)
                                            makActive(e, cur, curElem, curElem.positionType, key, i, j)
                                            handleElementDrop(e, curElem.positionType, key, i, curElem, j)
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
              {/* <div className="w-100 h-100 position-relative" style={{ display: "flex", justifyContent: popPosition.includes("L") ? "start" : popPosition.includes("C") ? "center" : "end", alignItems: popPosition.includes("T") ? "start" : popPosition.includes("M") ? "center" : "end", zIndex: "1"}}>
                <div className={`position-relative ${isMobile ? "w-100 d-flex justify-content-center" : ""}`}>
                </div>
              </div> */}
            </div>
          </div>
        </Col>

        {/* Edit Components */}
        <Col className='border px-1 py-1' style={{ maxWidth: '350px', overflowY: "auto", overflowX: "hidden", transition: "0.3s ease", height: "90%" }}>
          {renderElems()}
        </Col>
      </Row>
      <Modal onClick={() => setBgModal(!bgModal)} toggle={() => setBgModal(!bgModal)} isOpen={bgModal} style={{ width: "300px", maxWidth: "90%" }}>
        <BgModifier styles={bgsettings} setStyles={setBgSettings} />
      </Modal>
      <Modal onClick={() => setBgModal2(!bgModal2)} toggle={() => setBgModal2(!bgModal2)} isOpen={bgModal2} style={{ width: "300px", maxWidth: "90%" }}>
        <BgModifier styles={bgStyles} setStyles={setBgStyles} />
      </Modal>
    </Container>
  )
}

export default FormEditor