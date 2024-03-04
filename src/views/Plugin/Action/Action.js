import React, { useState, useContext, useEffect } from "react"
import { Container, Card, CardBody, Row, Col } from "reactstrap"
import Select from 'react-select'
import $ from 'jquery'
import { PluginHeader } from "../PluginContext"

const Action = () => {
    const { setHeader } = useContext(PluginHeader)

    useEffect(() => {
        setHeader('Settings - Offer Action')
    }, [])
    const [buttonvalue, setButtonvalue] = useState('Shop Now')
    const [inputLength1, setinputLength1] = useState(0)
    const [inputLength2, setinputLength2] = useState(0)
    const [inputLength3, setinputLength3] = useState(0)
    const [idArray, setIdArray] = useState([])
    const [idText, setidText] = useState([])

    function setOption(e, value) {
        setButtonvalue(value)
        if (value === 'Contact Us') {
            $(`#hide_div2`).removeClass('d-none')
            $(`.input_1`).addClass('d-none')
            $(`.input_2`).addClass('d-none')
        } else {
            $(`#hide_div2`).addClass('d-none')
            $(`.input_1`).removeClass('d-none')
            $(`.input_2`).removeClass('d-none')
        }
    }

    const showClass = (hide_class, inputid) => {
        $(`.${hide_class}`).hide()
        $(`#${inputid}`).removeClass('d-none')
    }

    // $(`#${checkId}`)[0].checked

    const selectCheckbox = (checkId, value) => {
        if ($(`#${checkId}`)[0].checked) {
            idArray.length === 0 ? setIdArray([checkId]) : setIdArray([...idArray, checkId])
            idText.length === 0 ? setidText([value]) : setidText([...idText, value])

        }
        if (!$(`#${checkId}`)[0].checked) {
            const removeArr = idArray.filter(item => item !== checkId)
            setIdArray(removeArr)
            const removeText = idText.filter(item => item === checkId)
            setidText(removeText)
        }
    }

    if (idArray.length >= 2) {
        $(`.disabled_input`).attr('disabled', true)
        idArray.map((ipid) => {
            $(`#${ipid}`).attr('disabled', false)
        }
        )
    } else {
        $(`.disabled_input`).attr('disabled', false)
    }
    console.log(idArray)
    console.log(idText)


    const backImg = {
        backgroundImage: 'url( "https://demo.xircls.in/static/offers/main/offer_image_1774.30" )',
        width: '100%',
        backgroundReapat: 'no-repeat',
        backgroundPosition: 'center',
        height: '250px',
        minWidth: '100%',
        maxHeight: '100%',
        marginBottom: '3px'
    }

    return (
        <>
            <Container fluid className="px-0 plugin">
                <Row>
                    <div className="d-flex justify-content-between py-2">
                        <div>
                            <h4>Optimize your offers to promote action. Boost your click-through rate.</h4>
                        </div>
                        <div>
                            <button className="btn btn-primary">Reminder</button>
                            <button className="btn btn-primary" style={{ marginLeft: '5px' }}>Preview</button>
                            <button className="btn btn-primary" style={{ marginLeft: '5px' }}>Test</button>
                        </div>
                    </div>
                </Row>
                <Row>
                    <Col md='7'>
                        <Row className="p-2 rounded border mb-2">
                            <div className="w-100 mb-1" >
                                <label htmlFor="">Order Now</label>
                                <Select onChange={event => setOption(event, event.value)} options={[
                                    { value: 'Buy Now', label: 'Buy Now' },
                                    { value: 'Shop Now', label: 'Shop Now' },
                                    { value: 'Order Now', label: 'Order Now' },
                                    { value: 'Book Now', label: 'Book Now' },
                                    { value: 'Visit Website', label: 'Visit Website' },
                                    { value: 'Contact Us', label: 'Contact Us' }
                                ]}
                                    closeMenuOnSelect={true}
                                    placeholder={'Shop Now'}
                                />
                            </div>
                            <div className="mb-1 input_1">
                                <label htmlFor="" >Acquisition Embed URL</label>
                                <input type="text" className="form-control" placeholder="Acquisition Embed URL" />
                            </div>
                            <div className="mb-1 input_2">
                                <label htmlFor="" >Retention Embed URL</label>
                                <input type="text" className="form-control" placeholder="Retention Embed URL" />
                            </div>
                            <div className="w-100 d-flex mb-1 d-none" id="hide_div2">
                                <div className="col-lg-3" style={{ marginRight: '40px' }}>
                                    <label htmlFor="" >Code</label>
                                    <input type="text" className="form-control" placeholder="Code" />
                                </div>
                                <div className="w-100">
                                    <label htmlFor="" >Number </label>
                                    <input type="text" className="form-control" placeholder="Number" />
                                </div>
                            </div>
                        </Row>
                        <Row className="p-2 rounded border mb-2">
                            <h4>Text Overlay</h4>
                            <div className="alert-success">
                                <p className="mb-0">Select maximum two </p>
                            </div>
                            <Container fluid className=" rounded-3 pt-1 px-1 custom-table">
                                <Row className="px-1">
                                    <hr />
                                    <Col md={12} className='d-flex pb-1 form-check'>
                                        <div className="d-flex align-items-center border-end border-start  fw-bold" style={{ width: '50%' }}>
                                            <input type='checkbox' className='disabled_input form-check-input cursor-pointer mx-1' value={'Free Shipping'} id="check_1" disabled={false} onChange={event => selectCheckbox('check_1', event.target.value)} />
                                            <label htmlFor='check_1' className='form-check-label'>Free Shipping</label>
                                        </div>
                                        <div className="d-flex align-items-center border-end  fw-bold" style={{ width: '50%' }}>
                                            <input type='checkbox' className='disabled_input form-check-input cursor-pointer mx-1' id="check_2" value={'Cash on Delivery'} disabled={false} onChange={event => selectCheckbox('check_2', event.target.value)} />
                                            <label htmlFor='check_2' className='form-check-label'>Cash on Delivery</label>
                                        </div>
                                    </Col>
                                    <hr />
                                </Row>
                                <Row className="px-1">
                                    <Col md={12} className='d-flex pb-1 form-check'>
                                        <div className="d-flex align-items-center border-end border-start  fw-bold" style={{ width: '50%' }}>
                                            <input type='checkbox' className='disabled_input form-check-input cursor-pointer mx-1' id="check_3" value={'24/7 Customer Service'} disabled={false} onChange={event => selectCheckbox('check_3', event.target.value)} />
                                            <label htmlFor='check_3' className='form-check-label'>24/7 Customer Service</label>
                                        </div>
                                        <div className="d-flex align-items-center border-end  fw-bold" style={{ width: '50%' }}>
                                            <input type='checkbox' className='disabled_input form-check-input cursor-pointer mx-1' id="check_4" value={'Bank Transfer Available'} disabled={false} onChange={event => selectCheckbox('check_4', event.target.value)} />
                                            <label htmlFor='check_4' className='form-check-label'>Bank Transfer Available</label>
                                        </div>
                                    </Col>
                                    <hr />
                                </Row>
                                <Row className="px-1">
                                    <Col md={12} className='d-flex pb-1 form-check'>
                                        <div className="d-flex align-items-center border-end border-start  fw-bold" style={{ width: '50%' }}>
                                            <input type='checkbox' className='disabled_input form-check-input cursor-pointer mx-1' id="check_5" value={'Hassle Free returns'} disabled={false} onChange={event => selectCheckbox('check_5', event.target.value)} />
                                            <label htmlFor='check_5' className='form-check-label'>Hassle Free returns</label>
                                        </div>
                                        <div className="d-flex align-items-center border-end  fw-bold" style={{ width: '50%' }}>
                                            <input type='checkbox' className='disabled_input form-check-input cursor-pointer mx-1' id="check_6" value={'Money Back Guarantee'} disabled={false} onChange={event => selectCheckbox('check_6', event.target.value)} />
                                            <label htmlFor='check_6' className='form-check-label'>Money Back Guarantee</label>
                                        </div>
                                    </Col>
                                    <hr />
                                </Row>
                                <Row className="px-1">
                                    <Col md={12} className='d-flex pb-1 form-check'>
                                        <div className="d-flex align-items-center border-end border-start  fw-bold" style={{ width: '50%' }}>
                                            <input type='checkbox' className='disabled_input form-check-input cursor-pointer mx-1' id="check_7" value={'Over 1 Million Customers'} disabled={false} onChange={event => selectCheckbox('check_7', event.target.value)} />
                                            <label htmlFor='check_7' className='form-check-label'>Over 1 Million Customers</label>
                                        </div>
                                        <div className="d-flex align-items-center border-end  fw-bold" style={{ width: '50%' }}>
                                            <input type='checkbox' className='disabled_input form-check-input cursor-pointer mx-1' id="check_8" value={'Pay at Outlet'} disabled={false} onChange={event => selectCheckbox('check_8', event.target.value)} />
                                            <label htmlFor='check_8' className='form-check-label'>Pay at Outlet</label>
                                        </div>
                                    </Col>
                                </Row>
                                <div>
                                    <p onClick={() => showClass('bluelink', 'showDiv')} className="bluelink link-fx text-info mb-0" style={{ cursor: 'pointer' }}>Add custom text overlay</p>
                                </div>
                            </Container>
                            <div className="d-none" id="showDiv">
                                <div>
                                    <h4 style={{ cursor: 'pointer' }}>Add custom text overlay</h4>
                                </div>
                                <br />
                                <div className="mb-1">
                                    <label htmlFor="" >Callout Text</label>
                                    <input type="text" onChange={event => setinputLength1(event.target.value.length)} className="form-control" placeholder="Callout Text" maxLength={25} />
                                    <span>{inputLength1}/25</span>
                                </div>
                            </div>
                        </Row>

                        <Row className="p-2 rounded border mb-2">
                            <div>
                                <div>
                                    <h4>Additional Website Links</h4>
                                </div>
                                <div className="alert-success">
                                    <p>Add maximum two</p>
                                </div>
                            </div>
                            <br />
                            <div>
                                <div className="mb-1">
                                    <h4 className="mb-0">Website Link #1 </h4>
                                </div>
                                <div className="mb-1">
                                    <label htmlFor="" >Headline</label>
                                    <input type="text" onChange={event => setinputLength2(event.target.value.length)} className="form-control" placeholder="Callout Text" maxLength={25} />
                                    <span>{inputLength2}/25</span>
                                </div>
                                <div className="mb-1">
                                    <label htmlFor="" >Description</label>
                                    <input type="text" onChange={event => setinputLength3(event.target.value.length)} className="form-control" placeholder="Callout Text" maxLength={25} />
                                    <span>{inputLength3}/25</span>
                                </div>
                            </div>
                        </Row>

                    </Col>
                    <Col md='5' style={{ paddingLeft: '1rem' }}>
                        <div style={{ paddingLeft: '20px' }}>
                            <div className="p-2 rounded border mb-2">
                                <div className="text-center">Acquisition</div>
                                <div style={backImg}>
                                    <img src="https://demo.xircls.in/static/outlets/outlet_logo/main/outlet_logo_581outlet_logo_581lamborghiniLogo.png"
                                        style={{ position: 'absolute', width: '100px', heigth: '100px', right: '250px' }} />
                                </div>
                                <h3 className="mb-1" style={{ textAlign: 'center', backgroundColor: 'black', color: 'white', padding: '15px 0 15px 0', fontWeight: 500 }}>NEW ACQ</h3>
                                <div>
                                    <h4 className="mb-3" style={{ paddingBottom: '0.5rem', fontSize: '1.25rem', fontweight: 400, lineHeight: '1.75', textAlign: 'center' }}>Get 55% OFF on spend between Rs.100 and Rs.5000</h4>
                                </div>
                                <div className="d-flex" style={{ justifyContent: 'right', width: '100%' }}>
                                    <div>
                                        <span className="">{idText[0]}</span>
                                    </div>
                                    <div><span>{idText[1]}</span></div>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button style={{ backgroundColor: '#28c76f', height: 50, color: 'white', width: '130px' }} className="btn">{buttonvalue}</button>
                                </div>
                            </div>
                            <div className="p-2 rounded border mb-2">
                                <div className="text-center">Retention</div>
                                <div style={backImg}>
                                    <img src="https://demo.xircls.in/static/outlets/outlet_logo/main/outlet_logo_581outlet_logo_581lamborghiniLogo.png"
                                        style={{ position: 'absolute', width: '100px', heigth: '100px', right: '250px' }} />
                                </div>
                                <h3 className="mb-1" style={{ textAlign: 'center', backgroundColor: 'black', color: 'white', padding: '15px 0 15px 0', fontWeight: 500 }}>NEW ACQ</h3>
                                <div>
                                    <h4 className="mb-3" style={{ paddingBottom: '0.5rem', fontSize: '1.25rem', fontweight: 400, lineHeight: '1.75', textAlign: 'center' }}>Get 55% OFF on spend between Rs.100 and Rs.5000</h4>
                                    <h4 className="mb-3" style={{ fontSize: '0.9rem', color: 'black', textAlign: 'center' }}>Get 65% Off on your repeat orders by using the following code NEWRET</h4>
                                </div>
                                <div className="d-flex" style={{ justifyContent: 'right', width: '100%' }}>
                                    <div>
                                        <span className="">{idText[0]}</span>
                                    </div>
                                    <div><span>{idText[1]}</span></div>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button style={{ backgroundColor: '#28c76f', height: 50, color: 'white', width: '130px' }} className="btn">{buttonvalue}</button>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row className="mt-2">
                    <div className="d-flex justify-content-between">
                        <div>
                            <button className="btn btn-primary mx-1">Back</button>
                        </div>
                        <div>
                            <button className="btn btn-primary">Save</button>
                            <button className="btn btn-primary" style={{ marginLeft: '5px' }}>Save & Close</button>
                            <button className="btn btn-primary" style={{ marginLeft: '5px' }}>Add</button>
                        </div>
                    </div>
                </Row>
            </Container>
        </>
    )
}

export default Action