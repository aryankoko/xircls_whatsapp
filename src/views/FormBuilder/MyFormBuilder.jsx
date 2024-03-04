import React, { useState } from 'react'
import { Crosshair, Edit, Image, Monitor, PlusCircle, Smartphone, Square, Type } from 'react-feather'
import { AccordionBody, AccordionHeader, AccordionItem, Card, CardBody, Col, Container, Row, UncontrolledAccordion } from 'reactstrap'
import BgModifier from './FormBuilder(components)/BgModifier'
import superleadz_logo from "../SuperLeadz/Intro/superleadz_logo.jpg"
import { Link } from 'react-router-dom'
import pixels from "../../assets/images/superLeadz/pixels.png"
import PickerDefault from '../Components/Date-picker/NormalDatePicker'
import Select from 'react-select'

const MyFormBuilder = () => {
    const [isMobile, setIsMobile] = useState(false)

    const [sideNav, setSideNav] = useState('display')

    const [popPosition, setPopPosition] = useState("MC")
    const [campaignStart, setCampaignStart] = useState(new Date())
    const [isEndCampaign, setIsEndCampaign] = useState(false)
    const [campaignEnd, setCampaignEnd] = useState("forever")
    // const defaultBgStyles  = {}
    // const [bgStyles, setBgStyles] = useState(defaultBgStyles)
    return (
        <>
            <style>{`
                .active-on::before {
                    content: "";
                    position: absolute;
                    inset: 0px;
                    z-index: -1;
                    border-bottom: 5px solid #7367f0;
                }
                .sketch-picker {
                    width: auto !important;
                    padding: 0px !important;
                    box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px !important;
                }
            `}</style>
            <div className="d-flex justify-content-center align-items-stretch border popup-cust position-relative" style={{ height: "100vh" }}>
                {/* Component for changing background of the selected element */}
                {/* <BgModifier styles={bgStyles} setStyles={setBgStyles} /> */}
                {/* Component for changing background of the selected element */}

                {/* Sidebar */}
                <div className="nav-sidebar d-flex flex-column align-items-stretch justify-content-start border-end text-center gap-2" style={{ padding: "1rem 0.5rem", width: "85px" }}>
                    <div className="d-flex flex-column align-items-center justify-content-center" style={{ gap: "0.5rem", cursor: "pointer" }}>
                        <Link to={"/merchant/SuperLeadz/"} className="w-50"><img src={superleadz_logo} width={"100%"} style={{ aspectRatio: '1' }} alt="SuperLeadz" /></Link>
                    </div>
                    <div className="d-flex flex-column align-items-center justify-content-center" style={{ gap: "0.5rem", cursor: "pointer" }} onClick={() => setSideNav(sideNav === "display" ? "" : "display")}>
                        <button className={`btn bg-${sideNav === "display" ? "light-primary" : "white"} d-flex align-items-center justify-content-center`} style={{ aspectRatio: "1", padding: "0.95rem", border: "none", outline: "none", transition: "0.3s ease-in-out" }}>
                            <Monitor size={17.5} />
                        </button>
                        <span style={{ fontSize: "13.5px", transition: "0.3s ease-in-out" }} className={`text-${sideNav === "display" ? "primary" : "black"}`}>Display</span>
                    </div>
                    <div className="d-flex flex-column align-items-center justify-content-center" style={{ gap: "0.5rem", cursor: "pointer" }} onClick={() => setSideNav(sideNav === "add-elements" ? "" : "add-elements")}>
                        <button className={`btn bg-${sideNav === "add-elements" ? "light-primary" : "white"} d-flex align-items-center justify-content-center`} style={{ aspectRatio: "1", padding: "0.95rem", border: "none", outline: "none", transition: "0.3s ease-in-out" }}>
                            <PlusCircle size={17.5} />
                        </button>
                        <span style={{ fontSize: "13.5px", transition: "0.3s ease-in-out" }} className={`text-${sideNav === "add-elements" ? "primary" : "black"}`}>Elements</span>
                    </div>
                    <div className="d-flex flex-column align-items-center justify-content-center" style={{ gap: "0.5rem", cursor: "pointer" }} onClick={() => setSideNav(sideNav === "criteria" ? "" : "criteria")}>
                        <button className={`btn bg-${sideNav === "criteria" ? "light-primary" : "white"} d-flex align-items-center justify-content-center`} style={{ aspectRatio: "1", padding: "0.95rem", border: "none", outline: "none", transition: "0.3s ease-in-out" }}>
                            <Crosshair size={17.5} />
                        </button>
                        <span style={{ fontSize: "13.5px", transition: "0.3s ease-in-out" }} className={`text-${sideNav === "criteria" ? "primary" : "black"}`}>Criteria</span>
                    </div>
                </div>
                {/* Sidebar */}

                {/* Preview and Edit Section */}
                <div className="flex-grow-1">
                    <Container fluid className='border-bottom'>
                        <Row>
                            <div className='col-md-4 col-0'></div>
                            <div className="col-4 d-flex justify-content-center align-items-stretch">
                                <button className={`btn d-flex justify-content-center align-items-center position-relative rounded-0 ${!isMobile ? "bg-light-primary active-on" : ""}`} onClick={() => setIsMobile(false)} style={{ border: "none", outline: "none", padding: "0px", aspectRatio: "1" }}><Monitor size={17.5} /></button>
                                <button className={`btn d-flex justify-content-center align-items-center position-relative rounded-0 ${isMobile ? "bg-light-primary active-on" : ""}`} onClick={() => setIsMobile(true)} style={{ border: "none", outline: "none", padding: "0px", aspectRatio: "1" }}><Smartphone size={17.5} /></button>
                                {false && <button className="btn" style={{ border: "none", outline: "none" }}>Preview</button>}
                            </div>
                            <div className='col-4 d-flex flex-row justify-content-end align-items-center' style={{ padding: "0.5rem", gap: "0.5rem" }}>
                                <input type="text" readOnly value={"Template 1"} className="form-control w-50" /><button className="btn btn-primary">Save</button>
                            </div>
                        </Row>
                    </Container>
                    <div className="d-flex align-items-stretch h-100">
                        {/* Section Drawer */}
                        <div className=" border-end bg-white position-relative" style={{ width: sideNav === "" ? "0px" : "240px", overflowX: "hidden", transition: "0.3s ease-in-out", opacity: "1", boxShadow: "10px 2px 5px rgba(0,0,0,0.125)", zIndex: "1" }}>

                            {/* Display Section */}
                            <div className={`opacity-${sideNav === "display" ? "1" : "0"}`} style={{ transition: "0.3s ease-in-out", maxHeight: sideNav === "display" ? "100%" : "0%", overflow: "hidden", width: "240px", transform: `translateX(${sideNav === "display" ? "0px" : "-240px"})`, position: "absolute", inset: "0px" }}>
                                <UncontrolledAccordion>
                                    {/* Position */}
                                    <AccordionItem className='bg-white border-bottom'>
                                        <AccordionHeader className='acc-header border-bottom' targetId='1'>
                                            <p className='m-0 fw-bolder text-black' style={{ fontSize: "0.9rem", textDecoration: "underline", textDecorationStyle: "dotted" }}>Position</p>
                                        </AccordionHeader>
                                        <AccordionBody accordionId='1'>
                                            <div className='d-flex justify-content-center align-items-center'>
                                                {!isMobile ? (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 513 367.2" className='w-75'>
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
                                    {/* Position */}


                                </UncontrolledAccordion>
                            </div>
                            {/* Display Section */}

                            {/* Elements section */}
                            <div className={`opacity-${sideNav === "add-elements" ? "1" : "0"}`} style={{ transition: "0.3s ease-in-out", maxHeight: sideNav === "add-elements" ? "100%" : "0%", overflow: "hidden", width: "240px", transform: `translateX(${sideNav === "add-elements" ? "0px" : "-240px"})`, position: "absolute", inset: "0px" }}>
                                <p className='m-0 fw-bolder text-black' style={{ padding: "0.5rem 0.5rem 0px", fontSize: "0.9rem", textDecoration: "underline", textDecorationStyle: "dotted" }}>Basic Elements</p>
                                <div className="toggleSection border-end d-flex align-items-start justify-content-start mb-1">
                                    <div style={{ width: "80px", padding: "0.5rem" }}>
                                        <div draggable className="border rounded text-danger w-100 d-flex flex-column justify-content-between align-items-center p-1" style={{ aspectRatio: "1", cursor: "grab" }}>
                                            <Type size={17.5} />
                                            <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Text</span>
                                        </div>
                                    </div>
                                    <div style={{ width: "80px", padding: "0.5rem" }}>
                                        <div draggable className="border rounded text-info w-100 d-flex flex-column justify-content-between align-items-center p-1" style={{ aspectRatio: "1", cursor: "grab" }}>
                                            <Image size={17.5} />
                                            <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Image</span>
                                        </div>
                                    </div>
                                    <div style={{ width: "80px", padding: "0.5rem" }}>
                                        <div draggable className="border rounded text-success w-100 d-flex flex-column justify-content-between align-items-center p-1" style={{ aspectRatio: "1", cursor: "grab" }}>
                                            <Square size={17.5} />
                                            <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Button</span>
                                        </div>
                                    </div>
                                </div>
                                <p className='m-0 fw-bolder text-black' style={{ padding: "0.5rem 0.5rem 0px", fontSize: "0.9rem", textDecoration: "underline", textDecorationStyle: "dotted" }}>Form Elements</p>
                                <div className="toggleSection border-end d-flex align-items-start justify-content-start mb-1">
                                    <div style={{ width: "80px", padding: "0.5rem" }}>
                                        <div draggable className="border rounded text-primary w-100 d-flex flex-column justify-content-between align-items-center p-1" style={{ aspectRatio: "1", cursor: "grab" }}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 52 52"
                                                width={25}
                                            >
                                                <path
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M44 17H8a2 2 0 00-2 2v14a2 2 0 002 2h36a2 2 0 002-2V19a2 2 0 00-2-2zM8 15a4 4 0 00-4 4v14a4 4 0 004 4h36a4 4 0 004-4V19a4 4 0 00-4-4H8z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M10 20a1 1 0 011 1v10a1 1 0 11-2 0V21a1 1 0 011-1z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                            <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Input</span>
                                        </div>
                                    </div>
                                </div>
                                <p className='m-0 fw-bolder text-black' style={{ padding: "0.5rem 0.5rem 0px", fontSize: "0.9rem", textDecoration: "underline", textDecorationStyle: "dotted" }}>Structured Elements</p>
                                <div className="toggleSection border-end d-flex align-items-start justify-content-start mb-1">
                                    <div style={{ width: "80px", padding: "0.5rem" }}>
                                        <div draggable className="border rounded text-dark w-100 d-flex flex-column justify-content-between align-items-center p-1" style={{ aspectRatio: "1", cursor: "grab" }}>
                                            <Square size={17.5} />
                                            <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Block</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Elements section */}

                            {/* Criteria section */}
                            <div className={`opacity-${sideNav === "criteria" ? "1" : "0"}`} style={{ transition: "0.3s ease-in-out", maxHeight: sideNav === "criteria" ? "100%" : "0%", overflow: "hidden", width: "240px", transform: `translateX(${sideNav === "criteria" ? "0px" : "-240px"})`, position: "absolute", inset: "0px" }}>
                                <UncontrolledAccordion stayOpen>
                                    <AccordionItem className='bg-white border-bottom'>
                                        <AccordionHeader className='acc-header border-bottom' targetId='1'>
                                            <p className='m-0 fw-bolder text-black' style={{ fontSize: "0.9rem", textDecoration: "underline", textDecorationStyle: "dotted" }}>Campaign</p>
                                        </AccordionHeader>
                                        <AccordionBody accordionId='1'>
                                            <div className='p-0 mx-0 my-1'>
                                                <PickerDefault picker={campaignStart} minDate={"today"} setPicker={setCampaignStart} />
                                                <div className="form-check d-flex align-items-center gap-1 mx-0 p-0 my-2">
                                                    <label style={{fontSize: "0.85rem"}} htmlFor="endDateCheck" className="form-check-label m-0 p-0">Set end date</label><input id='endDateCheck' checked={isEndCampaign} type="checkbox" onChange={e => setIsEndCampaign(e.target.checked)} className="form-check-input m-0 cursor-pointer" />
                                                </div>
                                                {isEndCampaign && (
                                                    <PickerDefault picker={campaignEnd} minDate={campaignStart} setPicker={setCampaignEnd} />
                                                )}
                                            </div>
                                        </AccordionBody>
                                    </AccordionItem>
                                    <AccordionItem className='bg-white border-bottom'>
                                        <AccordionHeader className='acc-header border-bottom' targetId='2'>
                                            <p className='m-0 fw-bolder text-black' style={{ fontSize: "0.9rem", textDecoration: "underline", textDecorationStyle: "dotted" }}>Show Pop-up To</p>
                                        </AccordionHeader>
                                        <AccordionBody accordionId='2'>
                                            <div className='p-0 mx-0 my-1'>
                                                <Select options={[
                                                    { value: 'chocolate', label: 'All Visitors' },
                                                    { value: 'strawberry', label: 'First Time Visitors' },
                                                    { value: 'vanilla', label: 'Returning Visitors' },
                                                    { value: 'blueberry', label: 'Registered Users' }
                                                ]} />

                                            </div>
                                        </AccordionBody>
                                    </AccordionItem>
                                    <AccordionItem className='bg-white border-bottom'>
                                        <AccordionHeader className='acc-header border-bottom' targetId='3'>
                                            <p className='m-0 fw-bolder text-black' style={{ fontSize: "0.9rem", textDecoration: "underline", textDecorationStyle: "dotted" }}>Pop-up Visible On</p>
                                        </AccordionHeader>
                                        <AccordionBody accordionId='3'>
                                            <div className='p-0 mx-0 my-1'>
                                                <Select options={[
                                                    { value: 'chocolate', label: 'Scroll' },
                                                    { value: 'strawberry', label: 'Delay' }
                                                ]} />
                                                <input type="range" style={{ accentColor: "#7367f0" }} className='w-100 mt-2' />
                                            </div>
                                        </AccordionBody>
                                    </AccordionItem>
                                    <AccordionItem className='bg-white border-bottom'>
                                        <AccordionHeader className='acc-header border-bottom' targetId='4'>
                                            <p className='m-0 fw-bolder text-black' style={{ fontSize: "0.9rem", textDecoration: "underline", textDecorationStyle: "dotted" }}>User Verification</p>
                                        </AccordionHeader>
                                        <AccordionBody accordionId='4'>
                                            <div className='p-0 mx-0 my-1'>
                                                <div className='d-flex p-0 justify-content-between align-items-center form-check form-switch'>
                                                    <label style={{fontSize: "0.85rem"}} className='form-check-label'>Skip user verification? </label>
                                                    <input type='checkbox' className='form-check-input' style={{ cursor: 'pointer' }} />
                                                </div>
                                            </div>
                                        </AccordionBody>
                                    </AccordionItem>
                                </UncontrolledAccordion>
                            </div>
                            {/* Criteria section */}

                        </div>
                        {/* Section Drawer */}
                        {/* Theme Preview */}
                        <div className="flex-grow-1 preview-section border-end d-flex justify-content-center align-items-stretch" style={{ backgroundImage: `url(${pixels})` }}>
                        </div>
                        {/* Theme Preview */}
                        {/* Edit Section */}
                        <div className="edit-section" style={{ width: "200px", overflow: "hidden" }}>
                        </div>
                        {/* Edit Section */}
                    </div>
                </div>
                {/* Preview and Edit Section */}
            </div>
        </>
    )
}
export default MyFormBuilder