import React, { useContext, useEffect, useState } from "react"
import { ArrowLeft, ArrowRight, Check, Edit, Monitor, MoreVertical, Send, Smartphone } from "react-feather"
import { Card, CardBody, Container, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import '../plugin.css'


import ReactQuill from "react-quill"
import "react-quill/dist/quill.core.css"
import "react-quill/dist/quill.snow.css"
import "react-quill/dist/quill.bubble.css"
import { PluginHeader } from "../PluginContext"
import { deleteReq, getReq, postReq } from "../../../assets/auth/jwtService"
import toast from "react-hot-toast"


const Email = () => {

    const [resData, setResData] = useState(null)

    const { setHeader } = useContext(PluginHeader)
    const [rowWidth, setRowWidth] = useState(true)
    const [showWidth, setShowWidth] = useState(2)
    const [title, setTitle] = useState('')
    const [subject, setSubject] = useState('')
    const [tempView, setTempView] = useState(true)
    const [err, setErr] = useState(false)
    const [showData, setShowData] = useState({})
    const [file, setFile] = useState()
    const [fileObject, setFileObject] = useState(null)
    const [confirmModal, setConfirmModal] = useState(false)
    const [deleteId, setDeleteId] = useState('')

    const titleChange = (event, type) => {
        if (type === 1) {
            setTitle(event.target.value)
        }
        if (type === 2) {
            setSubject(event.target.value)
        }
    }

    const [text, setText] = useState('')

    const onChange = text => {
        setText(text)
    }

    const setDefault = (curElem) => {
        const form_data = new FormData()
        form_data.append('id', curElem.id)
        form_data.append('type', "INFINITI")
        form_data.append('action_type', curElem.action_type)
        form_data.append('sub_type', curElem.sub_type)

        postReq('setActiveTemplate', form_data)
        .then((resp) => {
            console.log(resp)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    
    function imageAdd(e) {
        console.log(e.target.files)

        const maxSizeKB = 100    //Size in KB
        const maxSize = maxSizeKB * 1024    //File size is returned in Bytes
        if (e.target.files[0].size < maxSize) {
            setFileObject(e.target.files[0])
            setFile(URL.createObjectURL(e.target.files[0]))
            setErr(false)
        } else {
            setFile(null)
            setErr(true)
        }

    }

    const getData = () => {
        getReq('email_template_builder')
        .then(response => { 
            setResData(response.data.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        setHeader('INFINITI')
        getData()
        
    }, [])

    const createTemplate = () => {
        const form_data = new FormData()
        form_data.append('title', title)
        form_data.append('subject', subject)
        form_data.append('image', fileObject)
        form_data.append('body_content', text)
        form_data.append('template_type', "INFINITI")
        form_data.append('template_created_by', "USER")

        const main_data = `
            <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title></title>
                </head>
                <body>
                    <div>
                        ${text}
                    </div>
                </body>
            </html>
        `

        form_data.append('template_data', main_data)
        form_data.append('sub_type', document.getElementById('infiniti-type').value)

        postReq('infinitiEmailBuilder', form_data)
        .then((resp) => {
            console.log(resp)
            toast.success('Template Saved SuccessFully')
        })
    }

    const deleteTemplate = () => {
        deleteReq('deleteTemplate', `?id=${deleteId}`)
        .then((resp) => {
            console.log(resp)
            getData()
            setConfirmModal(!confirmModal)
            toast.success('Template deleted SuccessFully')
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const makeConfirm = (id) => {
        setDeleteId(id)
        setConfirmModal(!confirmModal)
    }

    return (
        <>
            <div className="plugin">
                {tempView &&
                    <Container fluid>
                        <Row className="match-height transitionRow">
                            <Col md={rowWidth ? 4 : 1}>
                                <Card className="border">
                                    <CardBody>
                                        <Container className="px-0" fluid>
                                            <Row>
                                                <div className="w-100 d-flex justify-content-end position-absolute " style={{ zIndex: 3, right: rowWidth ? '2.5%' : '10%' }}>
                                                    <div className="d-flex justify-content-center align-items-center text-white rounded-2 btn-dark cursor-pointer" onClick={() => setRowWidth(!rowWidth)} style={{ width: '25px', height: '25px' }}>{rowWidth ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}</div>
                                                </div>
                                                <h4 className={`mb-0 ${rowWidth ? '' : 'd-none'}`}>Templates</h4>
                                            </Row>
                                            <Row className={`mb-0 ${rowWidth ? '' : 'd-none'}`}>
                                                <div className='my-2 d-none'>
                                                    <label htmlFor="template-type">
                                                        Type:
                                                    </label>
                                                    <select defaultValue={0} id='template-type' className="form-select" aria-label="Default select example">
                                                        <option value={0}>Type 1</option>
                                                        <option value="1">Type 2</option>
                                                        <option value="2">Type 3</option>
                                                        <option value="3">Type 4</option>
                                                    </select>
                                                </div>
                                                <div className='my-2'>
                                                    <label htmlFor="search-template">
                                                        Search
                                                    </label>
                                                    <input placeholder="Search your Template" type='text' id='search-template' name='search-template' className="form-control" />
                                                </div>
                                                <div className='mb-2 overflow-auto' style={{height: '300px'}}>
                                                    {
                                                        resData?.all_templates.length > 0 ?  (
                                                            <table className="table table-bordered table-striped">
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col">Id</th>
                                                                        <th scope="col">Template</th>
                                                                        <th scope="col">Type</th>
                                                                        <th scope="col">Action</th>
                                                                    </tr>   
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        resData?.all_templates.map((curElem, i) => {
                                                                            return <>
                                                                                <tr key={i}>
                                                                                    <td scope="row"> 
                                                                                    {resData?.active_template?.template === curElem.id ? (
                                                                                        <div className="d-flex justify-content-start align-items-center gap-1">
                                                                                            {i + 1}
                                                                                            <Check color='#28c76f' size={17} />
                                                                                        </div>
                                                                                    ) : i + 1
                                                                                    }
                                                                                    </td>
                                                                                    <td className="ellipsis cursor-pointer" onClick={() => setShowData(curElem)}><span title={curElem.title}>{curElem.title}</span></td>
                                                                                    <td className="ellipsis"><span title={curElem.title}>{curElem.sub_type}</span></td>
                                                                                    <td className="d-flex justify-content-start align-items-center h-100">
                                                                                        <div className="btn p-0 m-0 d-flex justify-content-start align-items-center gap-1">

                                                                                            <UncontrolledDropdown className='more-options-dropdown'>
                                                                                                <DropdownToggle className='btn-icon cursor-pointer' color='transparent' size='sm'>
                                                                                                    <MoreVertical size='18' />
                                                                                                </DropdownToggle>
                                                                                                <DropdownMenu end>
                                                                                                    <DropdownItem onClick={() => setDefault(curElem)}>
                                                                                                        Set Default
                                                                                                    </DropdownItem>
                                                                                                    {
                                                                                                        curElem.template_created_by === "USER" ? <DropdownItem onClick={() => makeConfirm(`${curElem.id}`)}>
                                                                                                            Delete
                                                                                                        </DropdownItem> : ""
                                                                                                    }
                                                                                                    
                                                                                                </DropdownMenu>
                                                                                            </UncontrolledDropdown>
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                            </>
                                                                        }) 
                                                                    }
                                                                    
                                                                </tbody>
                                                            </table>
                                                        ) : (
                                                            <>
                                                                <hr />
                                                                <h5>Template Not Found</h5>
                                                            </>
                                                        ) 
                                                    }
                                                </div>
                                            </Row>
                                        </Container>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col md={rowWidth ? 8 : 11}>
                                <Card className="border">
                                    <CardBody>
                                        <Container className="px-0" fluid>
                                            <Row>
                                                <h4>Templates View</h4>
                                            </Row>
                                            <Row className="my-2">
                                                <Col xs={4} className='d-flex justify-content-start'>
                                                    <button onClick={() => setTempView(!tempView)} className="btn btn-primary w-65" style={{ padding: '0.5rem' }}>Add new Template</button>
                                                </Col>
                                                <Col xs={4} className='d-flex justify-content-center'>
                                                    <button onClick={() => setShowWidth(1)} style={{ padding: '0.5rem', backgroundColor: showWidth === 1 && 'rgba(130, 134, 139, 0.25)' }} className="btn btn-outline-secondary mx-1"><Smartphone size={25} /></button>
                                                    <button onClick={() => setShowWidth(2)} style={{ padding: '0.5rem', backgroundColor: showWidth === 2 && 'rgba(130, 134, 139, 0.25)' }} className="btn btn-outline-secondary mx-1"><Monitor size={25} /></button>
                                                </Col>
                                                <Col xs={4} className='d-flex justify-content-end'>
                                                    <button className="btn btn-primary" style={{ padding: '0.75rem' }}><Send size='15' /><span className="mx-1">Test Mail</span></button>
                                                </Col>
                                            </Row>
                                            <Row className="mt-3 px-1 d-flex justify-content-center" style={{width: showWidth === 1 ? '425px' : '100%'}}>
                                                <div className='bg-secondary rounded fs-4 text-white text-center' style={{ padding: '0.5rem', margin: 'auto' }}>
                                                    Subject: {showData?.subject}
                                                </div>

                                                <div className="quill_view_view" style={{marginTop: '40px'}}>
                                                    <div dangerouslySetInnerHTML={{__html: showData?.body_content}} />
                                                </div>
                                            </Row>
                                        </Container>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>

                        <Row className="px-1 my-2">
                            <Col sm={6}><button className="btn btn-primary rounded-2">Back</button></Col>
                            <Col sm={6} className='text-end'><button className="btn btn-primary rounded-2">Save & Proceed</button></Col>
                        </Row>
                    </Container>}
                {!tempView &&
                    <Container fluid>
                        <Row className="match-height transitionRow">
                            <Col md={5}>
                                <Card className="border rounded">
                                    <CardBody className="p-1">
                                        <h4>Title/ Header: {title}</h4>
                                        <Card className="border rounded">
                                            <CardBody className="px-1 py-2 mb-0">
                                                <div className='mb-2'>
                                                    <label htmlFor="infiniti-type">
                                                        Infiniti Type:
                                                    </label>
                                                    <select defaultValue={0} id='infiniti-type' className="form-select" aria-label="infiniti-type">
                                                        <option value={0} disabled>Please select Infiniti type</option>
                                                        {
                                                            resData?.template_types.map((curElem, i) => {
                                                                return  <option key={i} value={curElem.sub_type}>{curElem.show_name}</option>
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                                <div className='mb-2'>
                                                    <label htmlFor="title-header">
                                                        Title/ Header:
                                                    </label>
                                                    <input placeholder="Title/ Header" onChange={event => titleChange(event, 1)} type='text' id='title-header' name='title-header' className="form-control" />
                                                </div>
                                                <div className='mb-2'>
                                                    <label htmlFor="subject-temp">
                                                        Subject:
                                                    </label>
                                                    <input placeholder="Subject" onChange={event => titleChange(event, 2)} type='text' id='subject-temp' name='subject-temp' className="form-control" />
                                                </div>
                                                <div className="mb-2">
                                                    <label htmlFor="img-temp">
                                                        Images:
                                                    </label>
                                                    <label htmlFor="template-file-img" id='img-temp' className="w-100">
                                                        <div className="form-control w-100"> Browse Files...</div>
                                                    </label>
                                                    <input className="form-control d-none" type="file" onChange={imageAdd} id="template-file-img" style={{ width: '100%' }} />
                                                    {err && <span className="text-danger" style={{ fontSize: '12px' }}>Please select image size less than 100kb</span>}
                                                </div>
                                                <div className="mb-2 text-wrap">
                                                    <label htmlFor="img-temp">
                                                        Message:
                                                    </label>
                                                    <ReactQuill
                                                        theme="snow"
                                                        placeholder="Type here"
                                                        value={text}
                                                        onChange={onChange}
                                                        modules={{
                                                            toolbar: [
                                                                [{ header: [] }, { font: [] }],
                                                                [{ size: [] }],
                                                                ['bold', 'italic', 'underline'],
                                                                [
                                                                    { list: 'ordered' },
                                                                    { list: 'bullet' }
                                                                ],
                                                                ['link'],
                                                                [{ color: [] }, { background: [] }],
                                                                [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }]
                                                            ]
                                                        }}
                                                        formats={[
                                                            'header', 'font', 'size', 'color', 'background',
                                                            'bold', 'italic', 'underline',
                                                            'list', 'bullet',
                                                            'link',
                                                            'align'
                                                        ]}
                                                    />

                                                </div>
                                            </CardBody>
                                        </Card>
                                        <h4>Placeholders</h4>
                                        <Card className="border rounded">
                                            <CardBody style={{ height: '15rem' }} className="px-1 py-2 mb-0 overflow-scroll">
                                                <ul style={{ listStyle: 'none' }} className='placeholder-list position-relative'>
                                                    {
                                                        resData?.template_placeholder.map((curElem, i) => {
                                                            return <>
                                                                <li key={i}>{curElem.description} {curElem.placeholders}</li>
                                                            </>
                                                        })
                                                    }
                                                </ul>
                                            </CardBody>
                                        </Card>

                                    </CardBody>
                                </Card>
                            </Col>
                            <Col md={7}>
                                <Card className="border">
                                    <CardBody>
                                        <Container className="px-0" fluid>
                                            <Row className="my-0">
                                                <Col xs={12} className='d-flex justify-content-end'>
                                                    <button className="btn btn-primary w-25" style={{ padding: '0.75rem' }}><Send size='15' /><span className="mx-1">Test Mail</span></button>
                                                </Col>
                                            </Row>
                                            <Row className="my-1">
                                                <Col xs={5} className='d-flex justify-content-start'>

                                                </Col>
                                                <Col xs={2} className='d-flex justify-content-center'>
                                                    <button onClick={() => setShowWidth(1)} style={{ padding: '0.5rem', backgroundColor: showWidth === 1 && 'rgba(130, 134, 139, 0.25)' }} className="btn btn-outline-secondary mx-1"><Smartphone size={15} /></button>
                                                    <button onClick={() => setShowWidth(2)} style={{ padding: '0.5rem', backgroundColor: showWidth === 2 && 'rgba(130, 134, 139, 0.25)' }} className="btn btn-outline-secondary mx-1"><Monitor size={15} /></button>
                                                </Col>
                                                <Col xs={5} className='d-flex justify-content-end'>
                                                </Col>
                                            </Row>
                                            <Row className="mt-1 px-1 d-flex justify-content-center">
                                                <div className='bg-secondary rounded fs-4 text-white text-center' style={{ padding: '0.5rem', width: showWidth === 1 ? '325px' : '100%' }}>
                                                    Subject: {subject}
                                                </div>
                                            </Row>
                                            <Row className="mt-3 px-1 d-flex justify-content-center">
                                                <div className='rounded text-center' style={{ width: '100%' }}>
                                                    <img style={{ width: '100%' }} src={file} alt="" />

                                                </div>
                                            </Row>
                                            <Row className="mt-3 px-1 d-flex justify-content-center">
                                                <div dangerouslySetInnerHTML={{ __html: text }} className='default-dis'></div>
                                            </Row>
                                        </Container>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <Row className="px-1 my-2">
                            <Col s={6}><button onClick={() => setTempView(!tempView)} className="btn btn-primary rounded-2">Back</button></Col>
                            <Col s={6} className='text-end'><button onClick={() => createTemplate()} className="btn btn-primary rounded-2">Save</button></Col>
                        </Row>
                    </Container>}
            </div>
            <Modal
            isOpen={confirmModal}
            toggle={() => setConfirmModal(!confirmModal)}
            className='modal-dialog-centered'
            >
                <ModalHeader toggle={() => setConfirmModal(!confirmModal)}>Are you sure you want to delete this template?</ModalHeader>
                <ModalBody>
                    <div className="row">
                       
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button outline onClick={() => setConfirmModal(!confirmModal)}>
                        No
                    </Button>
                    <Button color='primary' onClick={() => deleteTemplate()}>
                        Yes
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default Email