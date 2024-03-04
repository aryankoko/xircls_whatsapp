import React, { useState, useContext, useEffect } from "react"
import { Container, Row, Col } from "reactstrap"
import Select from 'react-select'
import '../plugin.css'
import { PluginHeader } from "../PluginContext"
import { Copy } from "react-feather"
import toast from "react-hot-toast"
import { getReq, postReq } from "../../../assets/auth/jwtService"
import { PermissionProvider } from "../../../Helper/Context"
import { getCurrentOutlet } from "../../Validator"
import Spinner from "../../Components/DataTable/Spinner"

const ThankYou = () => {
    const { setHeader } = useContext(PluginHeader)
    const { userPermission } = useContext(PermissionProvider)
    const [toggle, setToggle] = useState(false)
    const [input, setInput] = useState(null)
    const [buttonInput, setbuttonInput] = useState('Submit')
    const [buttonBack, setbuttonBack] = useState('#2e82cb')
    const [buttonColor, setbuttonColor] = useState('white')
    const [buttonPosition, setbuttonPosition] = useState('Left')
    const [status, setstatus] = useState(true)
    const [isloading, setIsLoading] = useState(true)

    const outletDetails = getCurrentOutlet()

    const getData = () => {
        getReq('thankYouSetting', `?app=${userPermission?.appName}&shop=${outletDetails[0]?.web_url}`)
        .then((resp) => {
            console.log(resp)
            setIsLoading(false)
            setstatus(resp?.data?.status)
        })
        .catch((error) => {
            console.log(error)
            setIsLoading(false)
        })
    }

    const changeStatus = (e) => {
        const form_data = new FormData()
        form_data.append("app", userPermission?.appName)
        form_data.append("shop", outletDetails[0]?.web_url)
        form_data.append("status", e.target.checked ? 1 : 0)

        postReq('thankYouSetting', form_data)
        .then((resp) => {
            console.log(resp)
            getData()
        })
        .catch((error) => {
            console.log(error)
            setstatus(e.target.checked)
        })
    }

    useEffect(() => {
        setHeader('Settings - Thank you Page')
        getData()
    }, [])

    const copyCode = (id) => {
        document.getElementById(id).select()
        document.execCommand('copy')
        console.log('True')
        toast.success('Copied!')  
    }

    return (
        <Container fluid className="plugin">
            {
                isloading ? <div className="d-flex justify-content-center">
                    <Spinner size={'35px'} />
                </div> : <>
                    <Container className="border d-none" style={{ padding: '2rem 2rem 0 2rem' }}>
                        <Row className="mb-2">
                            <div>
                                <div className="form-check-success form-switch">
                                    <input className="form-check-input" type="checkbox" role="switch" id="form-switch" onClick={() => setToggle(!toggle)} checked={toggle} />
                                    <label className="form-check-label" htmlFor="form-switch" style={{ paddingLeft: '10px' }}>Form</label>
                                </div>
                            </div>
                        </Row>
                        <Row className={toggle ? '' : 'd-none'} id="form_container">
                            <Col md='6' style={{ padding: '30px 20px' }}>
                                <Row>
                                    <h4>Edit</h4>
                                </Row>
                                <hr />
                                <div style={{ padding: '0px 10px' }}>
                                    <div className="mb-2">
                                        <label htmlFor="">Forms</label>
                                        <Select options={[
                                            { value: 'country 1', label: 'New Json Check' },
                                            { value: 'country 2', label: 'Option 1' },
                                            { value: 'country 3', label: 'Option 2' }
                                        ]}
                                            closeMenuOnSelect={true}
                                            placeholder={'New Json Check'}
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="">Description for Form</label>
                                        <input type="text" name="" id="" className="form-control" onChange={event => setInput(event.target.value)} />
                                    </div>
                                    <Row>
                                        <Col md='6'>
                                            <div className="mb-2">
                                                <label htmlFor="">Button Background Color</label>
                                                <input type="text" name="" id="" className="form-control" onChange={event => setbuttonBack(event.target.value)} />
                                            </div>
                                        </Col>
                                        <Col md='6'>
                                            <div className="mb-2">
                                                <label htmlFor="">Button Font Color</label>
                                                <input type="text" name="" id="" className="form-control" onChange={event => setbuttonColor(event.target.value)} />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="mb-1">
                                        <Col md='6'>
                                            <div className="mb-2">
                                                <label htmlFor="">Button Alignment</label>
                                                <Select id="option_list" onChange={event => setbuttonPosition(event.value)} options={[
                                                    { value: 'Right', label: 'Rigth' },
                                                    { value: 'Center', label: 'Center' },
                                                    { value: 'Left', label: 'Left' }
                                                ]}
                                                    closeMenuOnSelect={true}
                                                    placeholder={buttonPosition}

                                                />

                                            </div>
                                        </Col>
                                        <Col md='6'>
                                            <div className="mb-2">
                                                <label htmlFor="">Button Text</label>
                                                <input type="text" name="" id="" className="form-control" onChange={event => setbuttonInput(event.target.value)} />
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col md='6' style={{ padding: '30px 20px' }}>
                                <Row>
                                    <Col md={12}>
                                        <h4>Preview</h4>
                                    </Col>
                                    <Col md={12}>
                                        <hr />
                                        <div className="p-2 border rounded">
                                            <h4 style={{ marginBottom: '10px' }}>{input}</h4>
                                            <div className="d-flex" style={{ justifyContent: buttonPosition }}>
                                                <a id="buttons" style={{ padding: '10px 25px', border: 'none', borderRadius: '5px', backgroundColor: buttonBack, color: buttonColor, cursor: 'pointer' }}
                                                >
                                                    {buttonInput}
                                                </a>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                    <Container className="border mt-2" style={{ padding: '0 2rem 2rem 2rem' }}>
                        <Row className="my-2">
                            <div className="d-flex align-items-center ">
                                <div>
                                    <label className="form-check-label" htmlFor="flexSwitchCheckChecked" style={{ marginRight: '50px' }} >Thank You Page</label>
                                </div>
                                <div className="form-check-success form-switch d-flex" style={{cursor: 'pointer'}}>
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" onChange={(e) => changeStatus(e)} checked={status} style={{ marginRight: '50px' }} />
                                </div>
                                <div>
                                    <h4 style={{ margin: 0, marginRight: '50px' }}>Status</h4>
                                </div>
                                <div>
                                    {status ? <span style={{ color: 'white', backgroundColor: 'green', padding: '0.3rem 0.5rem', borderRadius: '0.358rem' }}>Active</span> : <span style={{ color: 'white', backgroundColor: 'red', padding: '0.3rem 0.5rem', borderRadius: '0.358rem' }}>Inactive</span>}
                                    <br />
                                </div>

                                
                            </div>

                            {
                                status ? <Col md="6" className="mt-2">
                                    <div
                                        className="d-flex justify-content-between align-items-center bg-light p-1"
                                        style={{ borderBottom: "1px solid #ccc" }}
                                    >
                                        <h5 style={{ margin: "0%" }}>Script</h5>
                                        <a onClick={() => copyCode('code1')}>
                                            <Copy size={'18px'} />
                                        </a>
                                    </div>
                                    <div className="bg-light p-1">
                                        <textarea
                                        id="code1"
                                        style={{
                                            width: "100%",
                                            border: "none",
                                            background: "transparent",
                                            height: 100
                                        }}
                                        defaultValue={`<script src="https://api.xircls.com/static/js/thank_you_page.js"></script>\n<link rel="stylesheet" type="text/css" href="https://api.xircls.com/static/css/thank_you_page.css">`}
                                        />
                                    </div>
                                </Col> : ""
                            }
                        </Row>
                        <Row>
                            <div className="d-flex justify-content-between">
                                <div>
                                    <button className="btn btn-primary">Back</button>
                                </div>
                                <div>
                                    <button className="btn btn-primary">Save & Close</button>

                                </div>
                            </div>
                        </Row>
                    </Container>
                </>
            }
        </Container>
    )
}

export default ThankYou