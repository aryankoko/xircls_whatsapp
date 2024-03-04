import React, { useContext, useEffect, useState } from "react"
import { Container, Card, CardBody, Row, Col, Accordion, AccordionBody, AccordionHeader, AccordionItem } from "reactstrap"
import './Website.css'
import Select from 'react-select'
import ReactQuill from "react-quill"
import "react-quill/dist/quill.core.css"
import "react-quill/dist/quill.snow.css"
import "react-quill/dist/quill.bubble.css"
import { PluginHeader } from "../PluginContext"
import { getReq, postReq } from "../../../assets/auth/jwtService"
import toast from 'react-hot-toast'
// import $ from "jquery"
const defaultData = {
    theme_number: 'theme1',
    theme_background_color: '#fff',
    theme_border_radius: '0px',
    theme_pop_up_onload: false,
    header_font_val: '',
    header_color: '#424242',
    header_font_name: '',
    sub_header_font_val: '',
    sub_header_color: '',
    sub_header_font_name: '',
    body_font_val : '',
    body_color : '#464646',
    body_text : '',
    body_font_name : '',
    body_text_style : '',
    body_background_color : '',
    sub_body_font_val : '',
    sub_body_color : '',
    sub_body_text : '',
    sub_body_font_name : '',
    sub_body_text_style : '',
    sub_body_background_color : '',
    button_background_color : 'rgb(238, 49, 45)',
    button_color : '#fff',
    button_link : '',
    button_border_radius : '0px',
    button_font_val : '',
    button_font_name : '',
    all_pages : false,
    home_page : false,
    product_page : false,
    product_list_page : false,
    cart_page : false,
    btn_position : 'BL',
    full_btn_html : '',
    btn_background_color : '#34aedd',
    btn_font_color : 'white',
    btn_p_right : '',
    btn_p_bottom : '',
    button_text : '',
    button_display_type : '',
    margin_left : '',
    is_lead: 0,
    is_collaborate: 0,
    is_offer_image: 0
}

const WebsiteFront = () => {
    const { setHeader } = useContext(PluginHeader)
    const [movebutton, setmovebutton] = useState('d-flex justify-content-start align-items-center')

    const [selectTemplate, setselectemplate] = useState(true)
    const [open, setOpen] = useState('')

    const [popUpData, setPopUpData] = useState(defaultData)

    const toggle = (id) => {
        if (open === id) {
            setOpen()
        } else {
            setOpen(id)
        }
    }

    console.log(popUpData)

    const getDate = () => {
        getReq('website')
        .then(response => {
            const getData = response.data.data.themes[0].custom_theme
            console.log(getData, "getData")

            setPopUpData({
                theme_number: getData.XIRCLS_THEME.THEME_NAME,
                theme_background_color: getData.XIRCLS_THEME.BACKGROUND_COLOR,
                theme_border_radius: getData.XIRCLS_THEME.BORDER_RADIUS,
                theme_pop_up_onload: (/true/).test(getData.XIRCLS_THEME.ONLOAD),
                header_font_val: '',
                header_color: getData.XIRCLS_HEADER.HEADER_COLOR,
                header_font_name: '',
                sub_header_font_val: '',
                sub_header_color: '',
                sub_header_font_name: '',
                body_font_val : '',
                body_color : getData.XIRCLS_BODY.BODY_COLOR,
                body_text : '',
                body_font_name : '',
                body_text_style : '',
                body_background_color : '',
                sub_body_font_val : '',
                sub_body_color : '',
                sub_body_text : '',
                sub_body_font_name : '',
                sub_body_text_style : '',
                sub_body_background_color : '',
                button_background_color : getData.XIRCLS_BUTTON.BUTTON_BACKGROUND_COLOR,
                button_color : getData.XIRCLS_BUTTON.BUTTON_COLOR,
                button_link : '',
                button_border_radius : getData.XIRCLS_BUTTON.BUTTON_BORDER_RADIUS,
                button_font_val : '',
                button_font_name : '',
                all_pages : (/true/).test(getData.XIRCLS_PAGE_SELECTED.ALL_PAGE),
                home_page : (/true/).test(getData.XIRCLS_PAGE_SELECTED.HOME_PAGE),
                product_page : (/true/).test(getData.XIRCLS_PAGE_SELECTED.PRODUCT_PAGE),
                product_list_page : (/true/).test(getData.XIRCLS_PAGE_SELECTED.PRODUCT_LIST_PAGE),
                cart_page : (/true/).test(getData.XIRCLS_PAGE_SELECTED.CART),
                btn_position : getData.XIRCLS_BUTTON_SETTING.BTN_POSITION,
                full_btn_html : '',
                btn_background_color : getData.XIRCLS_BUTTON_SETTING.BTN_BG,
                btn_font_color : getData.XIRCLS_BUTTON_SETTING.BTN_FONT_COLOR,
                btn_p_right : getData.XIRCLS_BUTTON_SETTING.BTN_P_RIGHT,
                btn_p_bottom : getData.XIRCLS_BUTTON_SETTING.BTN_P_BOTTOM,
                button_text : '',
                button_display_type : '',
                margin_left : '',
                is_lead: 0,
                is_collaborate: 0,
                is_offer_image: 0
            }
            )
            
        })
        .catch(error => console.log(error))
    }

    const savePopUpdata = () => {
        const formData = new FormData()
        Object.entries(popUpData).map(([key, value]) => formData.append(key, value))
        postReq('saveWebsiteFrontend', formData)
        .then(() => {
            toast.success('SuccessFully Saved')
            getDate()
        })
        .catch((error) => {
            console.log(error)
        })
    }


    useEffect(() => {
        setHeader('Settings - Get Back All You Spend')
        getDate()
    }, [])

    return (
        <Container fluid className="px-0 plugin" >
            <Row>
                <h4>Select Pages To Display Offer Button</h4>
            </Row>
            <hr />
            <Row className="d-flex justify-content-evenly text-center">
                <Col className="form-check">
                    <input type='checkbox' id="all_page" checked={popUpData.all_pages} onClick={() => { setPopUpData({...popUpData, all_pages: !popUpData.all_pages}) } } className='form-check-input cursor-pointer' style={{ position: 'absolute', float: 'right' }} />
                    <label htmlFor="all_page" style={{ cursor: 'pointer' }}> <img src='https://demo.xircls.in/static/plugin_other_images/icons/all_pages.png' alt="" />
                        <br /> All Pages
                    </label>
                </Col>
                <Col className="form-check">
                    <input type='checkbox' id="home" checked={popUpData.home_page} onClick={() => { setPopUpData({...popUpData, home_page: !popUpData.home_page}) } } className='form-check-input cursor-pointer' style={{ position: 'absolute', float: 'right' }} />
                    <label htmlFor="home" style={{ cursor: 'pointer' }}> <img src='https://demo.xircls.in/static/plugin_other_images/icons/home_page.png' alt="" /> <br /> Home Page </label>
                </Col>
                <Col className="form-check">
                    <input type='checkbox' id="productPage" checked={popUpData.product_page} onClick={() => { setPopUpData({...popUpData, product_page: !popUpData.product_page}) } } className='form-check-input cursor-pointer' style={{ position: 'absolute', float: 'right' }} />
                    <label htmlFor="productPage" style={{ cursor: 'pointer' }} > <img src='https://demo.xircls.in/static/plugin_other_images/icons/product_page.png' alt="" /> <br /> Product Page </label>
                </Col>
                <Col className="form-check">
                    <input type='checkbox' id="product_list" checked={popUpData.product_list_page} onClick={() => { setPopUpData({...popUpData, product_list_page: !popUpData.product_list_page}) } } className='form-check-input cursor-pointer' style={{ position: 'absolute', float: 'right' }} />
                    <label htmlFor="product_list" style={{ cursor: 'pointer' }}> <img src='https://demo.xircls.in/static/plugin_other_images/icons/product_page.png' alt="" /> <br /> Products List Page </label >
                </Col>
                <Col className="form-check">
                    <input type='checkbox' id="chart_page" checked={popUpData.cart_page} className='form-check-input cursor-pointer' style={{ position: 'absolute', float: 'right' }} onClick={() => { setPopUpData({...popUpData, cart_page: !popUpData.cart_page}) } } />
                    <label htmlFor="chart_page" style={{ cursor: 'pointer' }} > <img src='https://demo.xircls.in/static/plugin_other_images/icons/all_pages.png' alt="" /> <br />Cart Page </label>
                </Col>
            </Row>
            <div className="mt-4">
                <h4>Select Offer Button Style & Position</h4>
                <hr />
            </div>
            <Row className="justify-content-between d-flex p-2 mb-4" style={{ border: '1px solid lightgrey', borderRadius: '0.3rem' }}>
                <Col>
                    <p>Button Position</p>
                </Col>
                <Col className="d-flex justify-content-end">
                    <div>
                        <input className="d-none layout-selector" checked={popUpData.btn_position === 'ML'} onChange={() => { setPopUpData({...popUpData, btn_position: 'ML'}) } } type="radio" name="layout" id="layout-1" />
                        <label className="cursor-pointer layout" htmlFor="layout-1" style={{ marginRight: '20px', marginBottom: '10px' }}>
                            <img onClick={() => setmovebutton('d-flex justify-content-start align-items-center')} src='https://demo.xircls.in/static/plugin_other_images/icons/button_middle_left.png' alt="" />
                        </label>
                    </div>
                    <div>
                        <input className="d-none layout-selector" checked={popUpData.btn_position === 'BL'} onChange={() => { setPopUpData({...popUpData, btn_position: 'BL'}) } } type="radio" name="layout" id="layout-2" />
                        <label className="cursor-pointer layout" htmlFor="layout-2" style={{ marginRight: '20px', marginBottom: '10px' }}>
                            <img onClick={() => setmovebutton('d-flex justify-content-start align-items-end')} src='https://demo.xircls.in/static/plugin_other_images/icons/button_bottom_left.png' alt="" />
                        </label>
                    </div>
                    <div>
                        <input className="d-none layout-selector" checked={popUpData.btn_position === 'BC'} onChange={() => { setPopUpData({...popUpData, btn_position: 'BC'}) } } type="radio" name="layout" id="layout-3" />
                        <label className="cursor-pointer layout" htmlFor="layout-3" style={{ marginRight: '20px', marginBottom: '10px' }}>
                            <img onClick={() => setmovebutton('d-flex justify-content-center align-items-end')} src='https://demo.xircls.in/static/plugin_other_images/icons/button_bottom_center.png' alt="" />
                        </label>
                    </div>
                    <div>
                        <input className="d-none layout-selector" checked={popUpData.btn_position === 'BR'} onChange={() => { setPopUpData({...popUpData, btn_position: 'BR'}) } } type="radio" name="layout" id="layout-4" />
                        <label className="cursor-pointer layout" htmlFor="layout-4" style={{ marginRight: '20px', marginBottom: '10px' }}>
                            <img onClick={() => setmovebutton('d-flex justify-content-end align-items-end')} src='https://demo.xircls.in/static/plugin_other_images/icons/button_bottom_right.png' alt="" />
                        </label>
                    </div>
                    <div>
                        <input className="d-none layout-selector" checked={popUpData.btn_position === 'MR'} onChange={() => { setPopUpData({...popUpData, btn_position: 'MR'}) } } type="radio" name="layout" id="layout-5" />
                        <label className="cursor-pointer layout" htmlFor="layout-5" style={{ marginRight: '20px', marginBottom: '10px' }}>
                            <img onClick={() => setmovebutton('d-flex justify-content-end align-items-center')} src='https://demo.xircls.in/static/plugin_other_images/icons/button_middle_right.png' alt="" />
                        </label>
                    </div>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col md={6} className="border p-3">
                    <div className="mb-2">
                        <label htmlFor="">Background Color</label>
                        <input type="color" name="" id="" className="form-control" onChange={e => setPopUpData({...popUpData, btn_background_color: e.target.value}) } value={popUpData.btn_background_color} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Font Color</label>
                        <input type="color" name="" id="" className="form-control" onChange={e => setPopUpData({...popUpData, btn_font_color: e.target.value}) } value={popUpData.btn_font_color} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Margin Left</label>
                        <input type="number" name="" id="left-1" className="form-control" onChange={e => setPopUpData({...popUpData, margin_left: e.target.value}) } value={popUpData.margin_left} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Margin Right</label>
                        <input type="number" name="" id="right-1" className="form-control" onChange={e => setPopUpData({...popUpData, btn_p_right: e.target.value}) } value={popUpData.btn_p_right} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Margin Bottom</label>
                        <input type="number" name="" id="bottom-1" className="form-control" onChange={e => setPopUpData({...popUpData, btn_p_bottom: e.target.value}) } value={popUpData.btn_p_bottom} />
                    </div>
                </Col>
                <Col md={6}>
                    <div className={movebutton} style={{ border: '1px solid lightgrey', height: '100%' }}>
                        <div id="" className="button-move" style={{ backgroundColor: popUpData.btn_background_color, marginLeft: popUpData.margin_left, marginRight: popUpData.btn_p_right, marginBottom: popUpData.btn_p_bottom }}>
                            <span><img src="https://api.xircls.com/static/images/sprite_icons/loop_white.png" alt="" /></span>
                            <span style={{ fontSize: '16px', marginTop: '1px', fontWeight: 400, color: popUpData.btn_font_color }}>Get Back All You Spend! </span>
                        </div>
                    </div>
                </Col>
            </Row>
            <div className="mt-4">
                <h4>Select Offer Button Style & Position</h4>
                <hr />
                <br />
            </div>
            <Row className="mb-4 border py-4" >

                <Col className="d-flex justify-content-center" md={6}>
                    <div>
                        <input className="d-none layout-selector unique_theme1" type="radio" id="xircls_theme_one" name="layout-image" onChange={() => setselectemplate(false)} checked={selectTemplate} onClick={() => { setPopUpData({...popUpData, theme_number: 'theme1'}) } } />
                        <label className="d-flex justify-content-center layout" htmlFor="xircls_theme_one"><img style={{ border: '1px solid black', width: '70%', cursor: 'pointer' }} src="https://demo.xircls.in/static/plugin_other_images/themes/xircls_theme1.jpg" alt="" /></label>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <div>
                        <h4>Customise Theme</h4>
                        <hr />
                        <br />
                    </div>
                    <div className="border">
                        <Accordion open={open} toggle={toggle}>
                            <AccordionItem>
                                <AccordionHeader targetId="1">Basic</AccordionHeader>
                                <AccordionBody accordionId="1">
                                    <Row className="d-flex">
                                        <Col>
                                            <label htmlFor="">Background Color: </label>
                                            <input type="color" value={popUpData.theme_background_color} onChange={(e) => { setPopUpData({...popUpData, theme_background_color: e.target.value}) }} className="form-control" />
                                        </Col>
                                        <Col>
                                            <label htmlFor="" >Border Radius</label>
                                            <input type="text" value={popUpData.theme_border_radius} onChange={(e) => { setPopUpData({...popUpData, theme_border_radius: e.target.value}) }} className="form-control" />
                                        </Col>
                                    </Row>
                                </AccordionBody>
                            </AccordionItem>
                            <AccordionItem>
                                <AccordionHeader targetId="2">Header</AccordionHeader>
                                <AccordionBody accordionId="2">
                                    <Row>
                                        <Col md='6'>
                                            <label htmlFor="" > Headline Color: </label>
                                            <input type="color" value={popUpData.header_color} onChange={(e) => { setPopUpData({...popUpData, header_color: e.target.value}) }} className="form-control" />
                                        </Col>
                                    </Row>
                                </AccordionBody>
                            </AccordionItem>
                            <AccordionItem>
                                <AccordionHeader targetId="3">Body</AccordionHeader>
                                <AccordionBody accordionId="3">
                                    <Row>
                                        <Col col='6'>
                                            <label htmlFor="" >Body Color: </label>
                                            <input type="color" value={popUpData.body_color} onChange={(e) => { setPopUpData({...popUpData, body_color: e.target.value}) }} className="form-control" />
                                        </Col>
                                    </Row>
                                </AccordionBody>
                            </AccordionItem>
                            <AccordionItem>
                                <AccordionHeader targetId="4">Button</AccordionHeader>
                                <AccordionBody accordionId="4">
                                    <Row className="d-flex">
                                        <Row className="mb-1">
                                            <Col>
                                                <label htmlFor="" >Button Color: </label>
                                                <input type="color" value={popUpData.button_background_color} onChange={(e) => { setPopUpData({...popUpData, button_background_color: e.target.value}) }} className="form-control" />
                                            </Col>
                                            <Col>
                                                <label htmlFor="">Button Font Color:</label>
                                                <input type="color" value={popUpData.button_color} onChange={(e) => { setPopUpData({...popUpData, button_color: e.target.value}) }} className="form-control" />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                <label htmlFor="">Border Button</label>
                                                <input type="text" value={popUpData.button_border_radius} onChange={(e) => { setPopUpData({...popUpData, button_border_radius: e.target.value}) }} className="form-control" />
                                            </Col>
                                            <Col>
                                                <label htmlFor="" >Button Link:</label>
                                                <input type="text" value={popUpData.button_link} onChange={(e) => { setPopUpData({...popUpData, button_link: e.target.value}) }} className="form-control" />
                                            </Col>
                                        </Row>
                                    </Row>
                                </AccordionBody>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </Col>
                <Col md={6}>
                    <div>
                        <h4>Preview</h4>
                        <hr />
                    </div>
                    <div id="customization">
                        {
                            popUpData.theme_number === "theme1" ? <>
                                <div
                                    className="xircls_txt_popup_window popup-background-color xircls_border_radius_class"
                                    id="xircls_preview_one"
                                    style={{
                                    maxWidth: 500,
                                    border: "1px solid rgb(39, 39, 39)",
                                    margin: "auto",
                                    backgroundColor: "rgb(255, 255, 55)2",
                                    padding: "25px 30px 50px",
                                    background: popUpData.theme_background_color,
                                    borderRadius: popUpData.theme_border_radius
                                    }}
                                >
                                    <div
                                    className="xircls_preview_header header_style"
                                    id="xircls_preview_header"
                                    style={{
                                        fontFamily: "SystemFontLibrecaslontextRegular",
                                        color: popUpData.theme_border_radius,
                                        fontSize: 50,
                                        textAlign: "center",
                                        fontWeight: "bold"
                                    }}
                                    >
                                    Get back
                                    </div>
                                    <div
                                    className="xircls_preview_subheader xircls_preview_body"
                                    id="xircls_preview_subheader"
                                    style={{
                                        fontFamily: "SystemFontLibrecaslontextRegular",
                                        color: popUpData.body_color,
                                        fontSize: 27,
                                        margin: "20px 0px 5px 0px",
                                        textAlign: "center"
                                    }}
                                    >
                                    ALL YOU SPEND!
                                    </div>
                                    <div
                                    className="xircls_preview_imgtheme_body_content"
                                    id="xircls_preview_body"
                                    >
                                    <div
                                        className="xircls_preview_body"
                                        style={{
                                        fontFamily: "SystemFontUbuntuRegular",
                                        color: popUpData.body_color,
                                        textAlign: "center"
                                        }}
                                    >
                                        Yup! Buy from us and get back <br />
                                        your entire spend value instantly <br />
                                        in offers from other cool businesses.
                                    </div>
                                    </div>
                                    <div
                                    className="applicable_on_spend xircls_preview_body"
                                    style={{
                                        padding: "6px 8px 6px",
                                        fontSize: 12,
                                        color: "#838287",
                                        textAlign: "center",
                                        fontFamily: "Montserrat"
                                    }}
                                    >
                                    *APPLICABLE ON ALL PURCHASES.
                                    </div>
                                    <div
                                    className="xircls_theme_btn d-flex"
                                    id="xircls_theme_btn"
                                    style={{ marginTop: 31, justifyContent: "center", display: "flex" }}
                                    >
                                    <a
                                        className="xircls_button_link_val xircls_theme_btn"
                                        href=""
                                        style={{
                                        fontFamily: "inherit",
                                        padding: "12px 35px",
                                        textTransform: "uppercase",
                                        fontSize: 12,
                                        fontWeight: "bold",
                                        backgroundColor: popUpData.button_background_color,
                                        color: popUpData.button_color,
                                        borderRadius: popUpData.button_border_radius
                                        }}
                                    >
                                        Start Shopping
                                    </a>
                                    </div>
                                </div>
                            </> : ""
                        }
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <div className="my-4" style={{ padding: '1rem', border: '1px solid' }}>
                        <div className="form-check form-switch">
                            <input className="form-check-input" checked={popUpData.theme_pop_up_onload} type="checkbox" role="switch" id="flexSwitchCheckDefault" style={{ cursor: 'pointer' }} onClick={() => { setPopUpData({...popUpData, theme_pop_up_onload: !popUpData.theme_pop_up_onload}) } } />
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Display Popup On Website Load</label>
                        </div>

                    </div>
                </Col>
            </Row>
            <Row>
                <div className="d-flex justify-content-between mt-2">
                    <div>
                        <button className="btn btn-primary">Back</button>
                    </div>
                    <div>
                        <button className="btn btn-primary" onClick={() => savePopUpdata()}>Save</button>

                    </div>
                </div>
            </Row>

        </Container >
    )
}

export default WebsiteFront