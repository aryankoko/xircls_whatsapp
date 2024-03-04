/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardBody, Col, Container, Input, Label, Row, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from 'reactstrap'
import whatsapp from './imgs/whatsapp.png'
import toast from 'react-hot-toast'
import Select from 'react-select'
import { Download, FileText, Image } from 'react-feather'
import ResizableTextarea from "./components/ResizableTextarea"
import axios from 'axios'
import { filter, set } from 'lodash'

export default function OtpinManage() {

    const msgTypeData = [
        {
            value: "Text",
            label: "Text"
        },
        {
            value: "Image",
            label: "Image"
        },
        {
            value: "File",
            label: "File"
        },
        {
            value: "Video",
            label: "Video"
        },
        {
            value: "Audio",
            label: "Audio"
        }
    ]

    // opt out
    const [modal, setModal] = useState(false)
    const [optOutTemp_type, setoptOutTemp_type] = useState('Regular')
    const [optOutMsg_type, setoptOutMsg_type] = useState(msgTypeData[0])

    const [useOptOutRespConfig, setOptOutRespConfig] = useState({
        msgBody: 'You have been opted-out of your future communications'
    })

    // opt in
    const [modal_2, setModal_2] = useState(false)
    const [optInTemp_type, setoptInTemp_type] = useState('Regular')
    const [optInMsg_type, setoptInMsg_type] = useState(msgTypeData[0])

    const [useOptInRespConfig, setOptInRespConfig] = useState({
        msgBody: 'Thanks, You have been opted-in of your future communications'
    })
    const toggle = () => setModal(!modal)
    const toggle2 = () => setModal_2(!modal_2)

    const makeToast = (msg = "success") => {
        toast.success(msg)
    }
    const [optOutKeyWords, setOptOutKeyWords] = useState(['Stop'])
    const [optInKeyWords, setOptInKeyWords] = useState(['Allow'])

    const addInputField = (num) => {
        if (num === 2) {
            // console.log("len", optInKeyWords.length)
            if (optInKeyWords.length < 5) {
                setOptInKeyWords([...optInKeyWords, ''])
            }

        } else {
            if (optOutKeyWords.length < 5) {
                setOptOutKeyWords([...optOutKeyWords, ''])

            }
        }
    }

    const handleKeyWordChange = (index, value) => {
        const updatedInputs = [...optOutKeyWords]
        updatedInputs[index] = value
        setOptOutKeyWords(updatedInputs)
        // console.log(updatedInputs)   
    }


    const updateState = (key, value) => {
        setOptOutRespConfig(prevState => ({ ...prevState, [key]: value }))
    }
    const updateState2 = (key, value) => {
        setOptInRespConfig(prevState => ({ ...prevState, [key]: value }))
    }
    const boldWordsInString = (inputString) => {
        if (inputString) {

            const boldedString = inputString.replace(/\*(.*?)\*/g, (_, match) => `<span style="font-weight: bolder;">${match}</span>`)
            return <p dangerouslySetInnerHTML={{ __html: boldedString }} />
        } else return null
    }
    const RenderWhatsppUI = ({ UIdata, msgDataType }) => {
        return (
            <Card className='rounded-3 shadow-lg  position-relative ' style={{ width: "400px", whiteSpace: 'pre-wrap' }} >
                <img src={whatsapp} alt="" width={40} className=' position-absolute  ' style={{ marginTop: "-20px", marginLeft: "-20px", zIndex: '8' }} />
                {
                    msgDataType.value === "Text" &&
                    <CardBody  >
                        <h5>{boldWordsInString(UIdata?.msgBody)}</h5>
                    </CardBody>

                }
                {
                    msgDataType.value === "Image" &&
                    <CardBody className='p-0 ' >
                        <div style={{ height: "200px" }} >

                            {UIdata?.mediaUrl && <img className=' img-fluid border-0 rounded-top-2 w-100 object-fit-cover ' style={{ height: "200px" }} src={UIdata.mediaUrl} alt="" />}
                        </div>
                        <div className='p-1' >

                            <h5 >{boldWordsInString(UIdata?.caption)}</h5>
                        </div>
                    </CardBody>

                }
                {
                    msgDataType.value === "File" &&
                    <CardBody className='position-relative d-flex align-items-center '>
                        <FileText size={25} />
                        <h5 className='m-0 ms-1 '>{UIdata?.file_name ? UIdata.file_name : 'Untitled'}</h5>
                        <Download size={25} className=' position-absolute  end-0 me-2' />
                    </CardBody>

                }
                {
                    msgDataType.value === "Video" &&
                    <CardBody className='p-0 ' >
                        <div style={{ height: "200px" }} >

                            {UIdata?.mediaUrl &&
                                <video className=' object-fit-cover w-100' controls style={{ height: "200px" }}>
                                    <source
                                        src={UIdata?.mediaUrl}
                                        type="video/mp4"
                                    />
                                    Video not supported.
                                </video>
                            }
                        </div>
                        <div className='p-1'>
                            <h5>{boldWordsInString(UIdata?.caption)}</h5>
                        </div>
                    </CardBody>

                }
                {
                    msgDataType.value === "Audio" &&
                    <CardBody className=''>
                        <audio controls>
                            <source src={UIdata?.mediaUrl}
                                type="audio/mpeg" />
                        </audio>
                    </CardBody>

                }
            </Card>
        )
    }

    const submitForm = () => {
        const newformData = new FormData()
        console.log(optOutKeyWords)

        const optOutKeyValues = optOutKeyWords.filter(item => item !== "") // Filter out objects with empty values
    
        console.log(optOutKeyValues)

        // return null
        // const valuesOnlyaa = ['please', 'me', 'help']
        // JSON.stringify(valuesOnlyaa)
        newformData.append('optOutKeyValues', JSON.stringify(optOutKeyValues))


        axios.post("https://d794-2405-201-7-88e1-3322-4051-f3b4-58b6.ngrok-free.app/opt/", newformData).then((resp) => {
            console.log(resp)
        })
        .catch((error) => {
            console.log(error)
        })
        
    }
    return (
        <Container>
            <style>
                {`
                @media (min-width: 992px) {

                    .modal-dialog {
                        --bs-modal-width: 1000px;
                    }
                }
                `}
            </style>
            <Card>
                <CardBody>
                    <h4 className="">Opt-in Management</h4>
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <h4 className="">Quick Guide</h4>
                    <p className="fs-5">Setup keywords that user can type to Opt-in & Opt-out from messaging campaign</p>
                    <div>
                        <Link to="/merchant/whatsapp/">How to Create Opt-out/Opt-in User?</Link>
                    </div>
                </CardBody>
            </Card>
            <Card>
                <CardBody className='d-flex justify-content-between '>
                    <div >
                        <h4 className="">API Campaign Opt-out</h4>
                        <p className="fs-5">Enable this if you don't wish to send api campaign to opted-out contacts</p>
                    </div>
                    <div className='form-check form-switch form-check-success mb-1'>
                        <Input type='checkbox' id='inviteReceived' onChange={() => makeToast("Enable")} />
                    </div>
                </CardBody>
            </Card>

            <Card>
                <CardBody>
                    <Row>
                        <Col md="6" >
                            <div className="p-2">
                                <h4 className="">Opt-out Keywords</h4>
                                <p className="fs-5">The user will have to type exactly one of these messages
                                    on which they should be automatically opted-out
                                </p>
                                <Row className='d-flex flex-column  gap-1'>
                                    {optOutKeyWords.map((field, index) => (
                                        <Col key={index} md="6">
                                            <input
                                                type="text"
                                                className="form-control form-control-lg"
                                                name={`email_${index}`}
                                                defaultValue={field}
                                                placeholder='Enter Keywords'
                                               onChange={(e) => handleKeyWordChange(index, e.target.value)}
                                            />
                                        </Col>
                                    ))}
                                </Row>

                                <button className={`btn text-success mt-3  `} onClick={addInputField} >+ Add more</button>
                                {/* <button className='btn btn-success text-white mt-3 ms-1' onClick={() => makeToast("opt-out save")}>Save Setting</button> */}
                                <button className='btn btn-success text-white mt-3 ms-1' onClick={submitForm}>Save Setting</button>
                            </div>
                        </Col>
                        <Col md="6" >
                            <div className="p-2">
                                <div className='d-flex justify-content-between '>
                                    <div>
                                        <h4 className="">Opt-out Response</h4>
                                        <p className="fs-5">Setup a response message for opt-out user keywords </p>
                                    </div>
                                    <div className='d-flex justify-content-center align-items-center '>
                                        <div className='form-check form-switch form-check-success'>
                                            <Input type='checkbox' id='inviteReceived' onChange={() => makeToast("opt-out Enable")} />
                                        </div>
                                        <button className='btn btn-outline-primary ' onClick={toggle}>Configure</button>

                                    </div>
                                </div>
                                <div className='d-flex align-items-center  flex-column  mt-4 '>
                                    <RenderWhatsppUI UIdata={useOptOutRespConfig} msgDataType={optOutMsg_type} />
                                    <p >Auto response is disabled</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Card>

            <Card>
                <CardBody>
                    <Row>
                        <Col md="6" >
                            <div className="p-2">
                                <h4 className="">Opt-in Keywords</h4>
                                <p className="fs-5">The user will have to type exactly one of these messages on which they should be automatically opted-in</p>
                                <Row className='d-flex flex-column  gap-1'>
                                    {optInKeyWords.map((field) => (
                                        <Col key={field.id} md="6">
                                            <input
                                                type="text"
                                                className="form-control form-control-lg"
                                                name={`email_${field.id}`}
                                                defaultValue={field.value}
                                                placeholder='Enter Keywords'
                                            />
                                        </Col>
                                    ))}
                                </Row>

                                <button className='btn text-success mt-3' onClick={() => addInputField(2)}>+ Add more</button>
                                <button className='btn btn-success text-white mt-3 ms-1' onClick={() => makeToast("opt-out save")}>Save Setting</button>
                            </div>
                        </Col>
                        <Col md="6" >
                            <div className="p-2">
                                <div className='d-flex justify-content-between '>
                                    <div>
                                        <h4 className="">Opt-in Response</h4>
                                        <p className="fs-5">Setup a response message for Opt-in user keywords </p>
                                    </div>
                                    <div className='d-flex justify-content-center align-items-center '>
                                        <div className='form-check form-switch form-check-success'>
                                            <Input type='checkbox' id='inviteReceived' onChange={() => makeToast("opt-in Enable")} />
                                        </div>
                                        <button className='btn btn-outline-primary  ' onClick={toggle2}>Configure</button>

                                    </div>
                                </div>
                                <div className='d-flex align-items-center  flex-column  mt-4 '>
                                    <RenderWhatsppUI UIdata={useOptInRespConfig} msgDataType={optInMsg_type} />

                                    <p >Auto response is disabled</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Card>

            {/* modal 1 */}
            <Modal isOpen={modal} toggle={toggle} scrollable={true} size="lg"  >
                <ModalHeader toggle={toggle} className='mt-2 px-3'>
                    <h4 className="">Configure Message</h4>
                    <p className="fs-5 text-secondary">Send template message from one of your pre approved templates. You can also opt to send regular message to active users.</p>
                </ModalHeader>
                <ModalBody className='px-3 ' style={{ minHeight: "435px" }}>
                    <Row >
                        <Col lg="6" >
                            <div style={{ maxWidth: "380px" }}>

                                <div className='d-flex flex-column gap-1'>
                                    <div className='form-check p-0'>
                                        <Label className=' rounded form-check-label d-flex justify-content-start align-items-center gap-1' for='radio1' >
                                            <Input type='radio' id='radio1' style={{ marginLeft: '15px' }} name='radio1' value='Pre-approved' checked={optOutTemp_type === 'Pre-approved'} onChange={(e) => setoptOutTemp_type(e.target.value)} />
                                            <p className="m-0">Pre-approved template message</p>
                                        </Label>

                                    </div>
                                    <div className='form-check p-0'>
                                        <Label className=' rounded form-check-label d-flex justify-content-start align-items-center gap-1' for='radio2' >
                                            <Input type='radio' id='radio2' style={{ marginLeft: '15px' }} name='radio1' value='Regular' checked={optOutTemp_type === 'Regular'} onChange={(e) => setoptOutTemp_type(e.target.value)} />
                                            <p className="m-0">Regular Message</p>
                                        </Label>
                                    </div>
                                </div>


                                {/*  type of msg content */}
                                {
                                    // eslint-disable-next-line multiline-ternary
                                    optOutTemp_type === 'Regular' ?
                                        // eslint-disable-next-line multiline-ternary
                                        <div>
                                            <div className='mt-3' >
                                                <h4 className="m-0">Message Type {optOutMsg_type.value}</h4>
                                                <p className="fs-5 m-0 text-secondary">Select one of available message types</p>

                                                <Select
                                                    className='mt-1'
                                                    isMulti={false}
                                                    options={msgTypeData}
                                                    closeMenuOnSelect={true}
                                                    defaultValue={optOutMsg_type}
                                                    name="phone_code"
                                                    onChange={(e) => {
                                                        // Check if the selected value is different from the current value
                                                        if (e && e.value !== optOutMsg_type.value) {
                                                            setoptOutMsg_type(e)
                                                            setOptOutRespConfig(null)
                                                        } else {
                                                            // Handle the case when the selected value is the same
                                                            // You can choose to do something else or omit this block
                                                        }
                                                    }}
                                                    styles={{
                                                        control: (baseStyles) => ({
                                                            ...baseStyles,
                                                            fontSize: '12px'
                                                        })
                                                    }}
                                                />
                                            </div>
                                            <div className='mt-2'>
                                                {(() => {
                                                    switch (optOutMsg_type.value) {
                                                        case "Text":
                                                            return (
                                                                <div>
                                                                    <h4 className="m-0">Message</h4>
                                                                    <p className="fs-5 m-0 text-secondary">Your message can be up to 4096 characters long.</p>
                                                                    <ResizableTextarea maxLength={4096} initialContent={useOptOutRespConfig?.msgBody ?? ''} placeholder='Opt-out Message' onChange={(e) => updateState('msgBody', e.target.value)} />
                                                                </div>
                                                            )
                                                        case "Image":
                                                            return (
                                                                <div className='d-flex flex-column gap-2'>
                                                                    <div>
                                                                        <h4 className="m-0">Caption</h4>
                                                                        <p className="fs-5 m-0 text-secondary">Your message can be up to 4096 characters long.</p>
                                                                        <ResizableTextarea maxLength={4096} initialContent={useOptOutRespConfig?.caption ?? ''} placeholder='Your caption goes here' onChange={(e) => updateState('caption', e.target.value)} />
                                                                        {/* <input
                                                                            type="file"
                                                                            id="imageInput"
                                                                            accept="image/*"
                                                                            onChange={(e) => console.log(e.target)}
                                                                        /> */}
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="m-0">Media</h4>
                                                                        <p className="fs-5 m-0 text-secondary">Size &lt; 5MB, Accepted formats - .png or .jpeg</p>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control form-control-lg"
                                                                            placeholder='Opt-out Message'
                                                                            onChange={(e) => updateState('mediaUrl', e.target.value)}
                                                                            maxLength={4096}
                                                                            value={useOptOutRespConfig?.mediaUrl ?? ''}
                                                                        />
                                                                        <div className='d-flex align-items-center gap-1 mt-1'>
                                                                            <h5 className='m-0'>OR</h5>
                                                                            <div className='d-flex gap-1 btn btn-secondary rounded-2  justify-content-center  align-items-center  border' style={{ width: "300px", padding: "3px 0" }}><Image /> <p className="m-0">Upload from Media Library</p> </div>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="m-0">File Name</h4>
                                                                        <p className="fs-5 m-0 text-secondary">Display name of media file, visible on download.</p>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control form-control-lg"
                                                                            placeholder='Enter Here'
                                                                            value={useOptOutRespConfig?.file_name ?? ''}
                                                                            onChange={(e) => updateState('file_name', e.target.value)}
                                                                            maxLength={4096}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            )
                                                        case "File":
                                                            return (
                                                                <div className='d-flex flex-column gap-2'>
                                                                    <div>
                                                                        <h4 className="m-0">Media</h4>
                                                                        <p className="fs-5 m-0 text-secondary">Size &lt; 100MB, Accepted formats - .pdf, .DOCX & .XLSX</p>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control form-control-lg"
                                                                            placeholder='Opt-out Message'
                                                                            onChange={(e) => updateState('mediaUrl', e.target.value)}
                                                                            maxLength={4096}
                                                                            value={useOptOutRespConfig?.mediaUrl ?? ''}
                                                                        />
                                                                        <div className='d-flex align-items-center gap-1 mt-1'>
                                                                            <h5 className='m-0'>OR</h5>
                                                                            <div className='d-flex gap-1 btn btn-secondary rounded-2  justify-content-center  align-items-center  border' style={{ width: "300px", padding: "3px 0" }}><Image /> <p className="m-0">Upload from Media Library</p> </div>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="m-0">File Name</h4>
                                                                        <p className="fs-5 m-0 text-secondary">Display name of media file, visible on download.</p>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control form-control-lg"
                                                                            placeholder='Enter Here'
                                                                            onChange={(e) => updateState('file_name', e.target.value)}
                                                                            maxLength={4096}
                                                                            value={useOptOutRespConfig?.file_name ?? ''}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            )
                                                        case "Video":
                                                            return (
                                                                <div className='d-flex flex-column gap-2'>
                                                                    <div>
                                                                        <h4 className="m-0">Caption</h4>
                                                                        <p className="fs-5 m-0 text-secondary">Your message can be up to 4096 characters long.</p>
                                                                        <ResizableTextarea maxLength={4096} initialContent={useOptOutRespConfig?.caption ?? ''} placeholder='Your caption goes here' onChange={(e) => updateState('caption', e.target.value)} />
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="m-0">Media</h4>
                                                                        <p className="fs-5 m-0 text-secondary">Size &lt;16MB, Accepted formats - .mp4</p>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control form-control-lg"
                                                                            placeholder='Opt-out Message'
                                                                            onChange={(e) => updateState('mediaUrl', e.target.value)}
                                                                            maxLength={4096}
                                                                            value={useOptOutRespConfig?.mediaUrl ?? ''}
                                                                        />
                                                                        <div className='d-flex align-items-center gap-1 mt-1'>
                                                                            <h5 className='m-0'>OR</h5>
                                                                            <div className='d-flex gap-1 btn btn-secondary rounded-2  justify-content-center  align-items-center  border' style={{ width: "300px", padding: "3px 0" }}><Image /> <p className="m-0">Upload from Media Library</p> </div>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="m-0">File Name</h4>
                                                                        <p className="fs-5 m-0 text-secondary">Display name of media file, visible on download.</p>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control form-control-lg"
                                                                            placeholder='Enter Here'
                                                                            onChange={(e) => updateState('file_name', e.target.value)}
                                                                            value={useOptOutRespConfig?.file_name ?? ''}
                                                                            maxLength={4096}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            )
                                                        case "Audio":
                                                            return (
                                                                <div className='d-flex flex-column gap-2'>
                                                                    <div>
                                                                        <h4 className="m-0">Media</h4>
                                                                        <p className="fs-5 m-0 text-secondary">Size &lt;16MB, Accepted formats - .mp3</p>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control form-control-lg"
                                                                            placeholder='Opt-out Message'
                                                                            onChange={(e) => updateState('mediaUrl', e.target.value)}
                                                                            maxLength={4096}
                                                                        />
                                                                        <div className='d-flex align-items-center gap-1 mt-1'>
                                                                            <h5 className='m-0'>OR</h5>
                                                                            <div className='d-flex gap-1 btn btn-secondary rounded-2  justify-content-center  align-items-center  border' style={{ width: "300px", padding: "3px 0" }}><Image /> <p className="m-0">Upload from Media Library</p> </div>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="m-0">File Name</h4>
                                                                        <p className="fs-5 m-0 text-secondary">Display name of media file, visible on download.</p>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control form-control-lg"
                                                                            placeholder='Enter Here'
                                                                            onChange={(e) => updateState('file_name', e.target.value)}
                                                                            value={useOptOutRespConfig?.file_name ?? ''}
                                                                            maxLength={4096}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            )
                                                        default:
                                                            return null
                                                    }
                                                })()}
                                            </div>
                                        </div>

                                        : <div className='mt-3' >
                                            <h4 className="m-0">Template Name {optOutMsg_type.value}</h4>
                                            <p className="fs-5 m-0 text-secondary">Please choose a WhatsApp template message from your approved list</p>

                                            <Select
                                                className='mt-1'
                                                isMulti={false}
                                                options={msgTypeData}
                                                closeMenuOnSelect={true}
                                                defaultValue={msgTypeData[0]}
                                                onChange={(e) => { setoptOutMsg_type(e.value); setOptOutRespConfig(null) }}
                                                styles={{
                                                    control: (baseStyles) => ({
                                                        ...baseStyles,
                                                        fontSize: '12px'
                                                    })
                                                }}
                                            />
                                        </div>}


                            </div>
                        </Col>

                        {/* UI output */}
                        <Col lg="6" className='d-flex align-items-center  justify-content-center pt-5 pt-lg-1' >

                            <RenderWhatsppUI UIdata={useOptOutRespConfig} msgDataType={optOutMsg_type} />


                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter className=''>
                    <Button color="primary" onClick={toggle}>
                        Do Something
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>

            {/* modal 2 */}
            <Modal isOpen={modal_2} toggle2={toggle2} scrollable={true} size="lg"  >
                <ModalHeader toggle2={toggle2} className='mt-2 px-3'>
                    <h4 className="">Configure Message</h4>
                    <p className="fs-5 text-secondary">Send template message from one of your pre approved templates. You can also opt to send regular message to active users.</p>
                </ModalHeader>
                <ModalBody className='px-3 ' style={{ minHeight: "435px" }}>
                    <Row >
                        <Col lg="6" >
                            <div style={{ maxWidth: "380px" }}>

                                <div className='d-flex flex-column gap-1'>
                                    <div className='form-check p-0'>
                                        <Label className=' rounded form-check-label d-flex justify-content-start align-items-center gap-1' for='radio1' >
                                            <Input type='radio' id='radio1' style={{ marginLeft: '15px' }} name='radio1' value='Pre-approved' checked={optInTemp_type === 'Pre-approved'} onChange={(e) => setoptInTemp_type(e.target.value)} />
                                            <p className="m-0">Pre-approved template message</p>
                                        </Label>

                                    </div>
                                    <div className='form-check p-0'>
                                        <Label className=' rounded form-check-label d-flex justify-content-start align-items-center gap-1' for='radio2' >
                                            <Input type='radio' id='radio2' style={{ marginLeft: '15px' }} name='radio1' value='Regular' checked={optInTemp_type === 'Regular'} onChange={(e) => setoptInTemp_type(e.target.value)} />
                                            <p className="m-0">Regular Message</p>
                                        </Label>
                                    </div>
                                </div>


                                {/*  type of msg content */}
                                {
                                    // eslint-disable-next-line multiline-ternary
                                    optInTemp_type === 'Regular' ?
                                        // eslint-disable-next-line multiline-ternary
                                        <div>
                                            <div className='mt-3' >
                                                <h4 className="m-0">Message Type {optInMsg_type.value}</h4>
                                                <p className="fs-5 m-0 text-secondary">Select one of available message types</p>

                                                <Select
                                                    className='mt-1'
                                                    isMulti={false}
                                                    options={msgTypeData}
                                                    closeMenuOnSelect={true}
                                                    defaultValue={optInMsg_type}
                                                    name="phone_code"
                                                    onChange={(e) => {
                                                        // Check if the selected value is different from the current value
                                                        if (e && e.value !== optInMsg_type.value) {
                                                            setoptInMsg_type(e)
                                                            setOptInRespConfig(null)
                                                        } else {
                                                            // Handle the case when the selected value is the same
                                                            // You can choose to do something else or omit this block
                                                        }
                                                    }}
                                                    styles={{
                                                        control: (baseStyles) => ({
                                                            ...baseStyles,
                                                            fontSize: '12px'
                                                        })
                                                    }}
                                                />
                                            </div>
                                            <div className='mt-2'>
                                                {(() => {
                                                    switch (optInMsg_type.value) {
                                                        case "Text":
                                                            return (
                                                                <div>
                                                                    <h4 className="m-0">Message</h4>
                                                                    <p className="fs-5 m-0 text-secondary">Your message can be up to 4096 characters long.</p>
                                                                    <ResizableTextarea maxLength={4096} initialContent={useOptInRespConfig?.msgBody ?? ''} placeholder='Opt-out Message' onChange={(e) => updateState2('msgBody', e.target.value)} />
                                                                </div>
                                                            )
                                                        case "Image":
                                                            return (
                                                                <div className='d-flex flex-column gap-2'>
                                                                    <div>
                                                                        <h4 className="m-0">Caption</h4>
                                                                        <p className="fs-5 m-0 text-secondary">Your message can be up to 4096 characters long.</p>
                                                                        <ResizableTextarea maxLength={4096} initialContent={useOptInRespConfig?.caption ?? ''} placeholder='Your caption goes here' onChange={(e) => updateState2('caption', e.target.value)} />
                                                                        <input
                                                                            type="file"
                                                                            id="imageInput"
                                                                            accept="image/*"
                                                                            onChange={(e) => console.log(e.target)}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="m-0">Media</h4>
                                                                        <p className="fs-5 m-0 text-secondary">Size &lt; 5MB, Accepted formats - .png or .jpeg</p>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control form-control-lg"
                                                                            placeholder='Opt-out Message'
                                                                            onChange={(e) => updateState2('mediaUrl', e.target.value)}
                                                                            maxLength={4096}
                                                                            value={useOptInRespConfig?.mediaUrl ?? ''}
                                                                        />
                                                                        <div className='d-flex align-items-center gap-1 mt-1'>
                                                                            <h5 className='m-0'>OR</h5>
                                                                            <div className='d-flex gap-1 btn btn-secondary rounded-2  justify-content-center  align-items-center  border' style={{ width: "300px", padding: "3px 0" }}><Image /> <p className="m-0">Upload from Media Library</p> </div>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="m-0">File Name</h4>
                                                                        <p className="fs-5 m-0 text-secondary">Display name of media file, visible on download.</p>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control form-control-lg"
                                                                            placeholder='Enter Here'
                                                                            value={useOptInRespConfig?.file_name ?? ''}
                                                                            onChange={(e) => updateState2('file_name', e.target.value)}
                                                                            maxLength={4096}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            )
                                                        case "File":
                                                            return (
                                                                <div className='d-flex flex-column gap-2'>
                                                                    <div>
                                                                        <h4 className="m-0">Media</h4>
                                                                        <p className="fs-5 m-0 text-secondary">Size &lt; 100MB, Accepted formats - .pdf, .DOCX & .XLSX</p>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control form-control-lg"
                                                                            placeholder='Opt-out Message'
                                                                            onChange={(e) => updateState2('mediaUrl', e.target.value)}
                                                                            maxLength={4096}
                                                                            value={useOptInRespConfig?.mediaUrl ?? ''}
                                                                        />
                                                                        <div className='d-flex align-items-center gap-1 mt-1'>
                                                                            <h5 className='m-0'>OR</h5>
                                                                            <div className='d-flex gap-1 btn btn-secondary rounded-2  justify-content-center  align-items-center  border' style={{ width: "300px", padding: "3px 0" }}><Image /> <p className="m-0">Upload from Media Library</p> </div>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="m-0">File Name</h4>
                                                                        <p className="fs-5 m-0 text-secondary">Display name of media file, visible on download.</p>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control form-control-lg"
                                                                            placeholder='Enter Here'
                                                                            onChange={(e) => updateState2('file_name', e.target.value)}
                                                                            maxLength={4096}
                                                                            value={useOptInRespConfig?.file_name ?? ''}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            )
                                                        case "Video":
                                                            return (
                                                                <div className='d-flex flex-column gap-2'>
                                                                    <div>
                                                                        <h4 className="m-0">Caption</h4>
                                                                        <p className="fs-5 m-0 text-secondary">Your message can be up to 4096 characters long.</p>
                                                                        <ResizableTextarea maxLength={4096} initialContent={useOptInRespConfig?.caption ?? ''} placeholder='Your caption goes here' onChange={(e) => updateState2('caption', e.target.value)} />
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="m-0">Media</h4>
                                                                        <p className="fs-5 m-0 text-secondary">Size &lt;16MB, Accepted formats - .mp4</p>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control form-control-lg"
                                                                            placeholder='Opt-out Message'
                                                                            onChange={(e) => updateState2('mediaUrl', e.target.value)}
                                                                            maxLength={4096}
                                                                            value={useOptInRespConfig?.mediaUrl ?? ''}
                                                                        />
                                                                        <div className='d-flex align-items-center gap-1 mt-1'>
                                                                            <h5 className='m-0'>OR</h5>
                                                                            <div className='d-flex gap-1 btn btn-secondary rounded-2  justify-content-center  align-items-center  border' style={{ width: "300px", padding: "3px 0" }}><Image /> <p className="m-0">Upload from Media Library</p> </div>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="m-0">File Name</h4>
                                                                        <p className="fs-5 m-0 text-secondary">Display name of media file, visible on download.</p>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control form-control-lg"
                                                                            placeholder='Enter Here'
                                                                            onChange={(e) => updateState2('file_name', e.target.value)}
                                                                            value={useOptInRespConfig?.file_name ?? ''}
                                                                            maxLength={4096}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            )
                                                        case "Audio":
                                                            return (
                                                                <div className='d-flex flex-column gap-2'>
                                                                    <div>
                                                                        <h4 className="m-0">Media</h4>
                                                                        <p className="fs-5 m-0 text-secondary">Size &lt;16MB, Accepted formats - .mp3</p>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control form-control-lg"
                                                                            placeholder='Opt-out Message'
                                                                            onChange={(e) => updateState2('mediaUrl', e.target.value)}
                                                                            maxLength={4096}
                                                                        />
                                                                        <div className='d-flex align-items-center gap-1 mt-1'>
                                                                            <h5 className='m-0'>OR</h5>
                                                                            <div className='d-flex gap-1 btn btn-secondary rounded-2  justify-content-center  align-items-center  border' style={{ width: "300px", padding: "3px 0" }}><Image /> <p className="m-0">Upload from Media Library</p> </div>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="m-0">File Name</h4>
                                                                        <p className="fs-5 m-0 text-secondary">Display name of media file, visible on download.</p>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control form-control-lg"
                                                                            placeholder='Enter Here'
                                                                            onChange={(e) => updateState2('file_name', e.target.value)}
                                                                            value={useOptInRespConfig?.file_name ?? ''}
                                                                            maxLength={4096}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            )
                                                        default:
                                                            return null
                                                    }
                                                })()}
                                            </div>
                                        </div>

                                        : <div className='mt-3' >
                                            <h4 className="m-0">Template Name {optInMsg_type.value}</h4>
                                            <p className="fs-5 m-0 text-secondary">Please choose a WhatsApp template message from your approved list</p>

                                            <Select
                                                className='mt-1'
                                                isMulti={false}
                                                options={msgTypeData}
                                                closeMenuOnSelect={true}
                                                defaultValue={msgTypeData[0]}
                                                name="phone_code"
                                                onChange={(e) => { setoptInMsg_type(e.value); setOptInRespConfig(null) }}
                                                styles={{
                                                    control: (baseStyles) => ({
                                                        ...baseStyles,
                                                        fontSize: '12px'
                                                    })
                                                }}
                                            />
                                        </div>}


                            </div>
                        </Col>

                        {/* UI output */}
                        <Col lg="6" className='d-flex align-items-center  justify-content-center pt-5 pt-lg-1' >

                            <RenderWhatsppUI UIdata={useOptInRespConfig} msgDataType={optInMsg_type} />


                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter className=''>
                    <Button color="primary" onClick={toggle2}>
                        Do Something
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle2}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </Container>
    )
}
