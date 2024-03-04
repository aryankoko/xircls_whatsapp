import React, { useState } from 'react'
import { Crosshair, Edit, Image, Monitor, PlusCircle, Smartphone, Square, Tag, Target, Type, X } from 'react-feather'
import { AccordionBody, AccordionHeader, AccordionItem, Card, CardBody, Col, Container, Row, UncontrolledAccordion } from 'reactstrap'
import superleadz_logo from "../SuperLeadz/Intro/superleadz_logo.jpg"
import { Link } from 'react-router-dom'
import pixels from "../../assets/images/superLeadz/pixels.png"
import PickerDefault from '../Components/Date-picker/NormalDatePicker'
import Select from 'react-select'
import BgModifier from '../FormBuilder/FormBuilder(components)/BgModifier'
import { templates } from '../FormBuilder/FormBuilder(components)/util'

const CustomizationParent = () => {
    const [isMobile, setIsMobile] = useState(false)

    const [sideNav, setSideNav] = useState('theme')

    const [popPosition, setPopPosition] = useState("MC")
    const [campaignStart, setCampaignStart] = useState(new Date())
    const [isEndCampaign, setIsEndCampaign] = useState(false)
    const [campaignEnd, setCampaignEnd] = useState("forever")

    const [defTheme, setDefTheme] = useState(0)

    const defaultBgStyles = {}
    const bgStyles = defaultBgStyles

    const bgsettings = { backgroundColor: "rgba(0,0,0,0.5)" }

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
            <div className="d-flex justify-content-center align-items-stretch border popup-cust position-relative" style={{ height: "75vh" }}>
                {/* Component for changing background of the selected element */}
                {/* <BgModifier styles={bgStyles} setStyles={setBgStyles} /> */}
                {/* Component for changing background of the selected element */}

                {/* Sidebar */}
                <div className="nav-sidebar d-flex flex-column align-items-stretch justify-content-start border-end text-center gap-2" style={{ padding: "1rem 0.5rem", width: "85px" }}>
                    <div className="d-flex flex-column align-items-center justify-content-center" style={{ gap: "0.5rem", cursor: "pointer" }}>
                        <Link to={"/merchant/SuperLeadz/"} className="w-50"><img src={superleadz_logo} width={"100%"} style={{ aspectRatio: '1' }} alt="SuperLeadz" /></Link>
                    </div>
                    <div className="d-flex flex-column align-items-center justify-content-center" style={{ gap: "0.5rem", cursor: "pointer" }} onClick={() => setSideNav(sideNav === "theme" ? "" : "theme")}>
                        <button className={`btn bg-${sideNav === "theme" ? "light-primary" : "white"} d-flex align-items-center justify-content-center`} style={{ aspectRatio: "1", padding: "0.95rem", border: "none", outline: "none", transition: "0.3s ease-in-out" }}>
                            <svg
                                height="800px"
                                width="17.5px"
                                id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                xmlSpace="preserve"
                                fill={sideNav === "theme" ? "#7367f0" : "#000"}
                                style={{ transition: "0.3s ease-in-out" }}
                            >
                                <path d="M475.691.021c-14.656 0-27.776 8.725-33.451 22.251l-32.64 77.973c-9.728-9.152-22.421-14.933-36.267-14.933h-320C23.936 85.312 0 109.248 0 138.645v320c0 29.397 23.936 53.333 53.333 53.333h320c29.397 0 53.333-23.936 53.333-53.333V225.152l81.92-172.821c2.24-4.757 3.413-10.048 3.413-16.043C512 16.299 495.701.021 475.691.021zm-70.358 458.624c0 17.643-14.357 32-32 32h-320c-17.643 0-32-14.357-32-32v-320c0-17.643 14.357-32 32-32h320c11.243 0 21.312 6.101 27.072 15.573l-37.739 90.197v-52.437c0-5.888-4.779-10.667-10.667-10.667H74.667c-5.888 0-10.667 4.779-10.667 10.667v85.333c0 5.888 4.779 10.667 10.667 10.667h269.76l-8.939 21.333h-90.155c-5.888 0-10.667 4.779-10.667 10.667v128c0 .277.128.512.149.789-8.768 7.787-14.144 10.389-14.528 10.539a10.68 10.68 0 00-6.699 7.616 10.706 10.706 0 002.859 9.941c15.445 15.445 36.757 21.333 57.6 21.333 26.645 0 52.48-9.643 64.128-21.333 16.768-16.768 29.056-50.005 19.776-74.773l47.381-99.925v188.48zm-134.698-61.12c2.944-9.685 5.739-18.859 14.229-27.349 15.083-15.083 33.835-15.083 48.917 0 13.504 13.504 3.2 45.717-10.667 59.584-11.563 11.541-52.672 22.677-80.256 8.256 3.669-2.859 7.893-6.549 12.672-11.328 8.918-8.939 12.075-19.221 15.105-29.163zM256 375.339v-76.672h70.571l-16.363 39.083c-14.251-.256-28.565 5.483-40.448 17.387-6.635 6.634-10.752 13.524-13.76 20.202zm75.264-32.598l28.715-68.629 16.128 7.915-32.555 68.651c-3.947-3.201-8.021-5.931-12.288-7.937zm10.069-172.096v64h-256v-64h256zM489.28 43.243l-104.064 219.52-17.003-8.341 54.08-129.237 39.616-94.677c2.325-5.568 7.744-9.152 13.803-9.152 8.235 0 14.933 6.699 14.933 15.659 0 2.132-.469 4.329-1.365 6.228z" />
                                <path d="M181.333 277.312H74.667c-5.888 0-10.667 4.779-10.667 10.667v149.333c0 5.888 4.779 10.667 10.667 10.667h106.667c5.888 0 10.667-4.779 10.667-10.667V287.979c-.001-5.888-4.78-10.667-10.668-10.667zm-10.666 149.333H85.333v-128h85.333v128z" />
                            </svg>
                        </button>
                        <span style={{ fontSize: "13.5px", transition: "0.3s ease-in-out" }} className={`text-${sideNav === "theme" ? "primary" : "black"}`}>Theme</span>
                    </div>
                    <div className="d-flex flex-column align-items-center justify-content-center" style={{ gap: "0.5rem", cursor: "pointer" }} onClick={() => setSideNav(sideNav === "audience" ? "" : "audience")}>
                        <button className={`btn bg-${sideNav === "audience" ? "light-primary" : "white"} d-flex align-items-center justify-content-center`} style={{ aspectRatio: "1", padding: "0.95rem", border: "none", outline: "none", transition: "0.3s ease-in-out" }}>
                            <Target size={17.5} />
                        </button>
                        <span style={{ fontSize: "13.5px", transition: "0.3s ease-in-out" }} className={`text-${sideNav === "audience" ? "primary" : "black"}`}>Audience</span>
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
                    <div className="d-flex flex-column align-items-center justify-content-center" style={{ gap: "0.5rem", cursor: "pointer" }} onClick={() => setSideNav(sideNav === "button" ? "" : "button")}>
                        <button className={`btn bg-${sideNav === "button" ? "light-primary" : "white"} d-flex align-items-center justify-content-center`} style={{ aspectRatio: "1", padding: "0.95rem", border: "none", outline: "none", transition: "0.3s ease-in-out" }}>
                            <svg width="17.5px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                fill={sideNav === "button" ? "#7367f0" : "#000"}
                                style={{ transition: "0.3s ease-in-out" }}>
                                <path d="M20.5 17h-17A2.502 2.502 0 0 1 1 14.5v-4A2.502 2.502 0 0 1 3.5 8h17a2.502 2.502 0 0 1 2.5 2.5v4a2.502 2.502 0 0 1-2.5 2.5zm-17-8A1.502 1.502 0 0 0 2 10.5v4A1.502 1.502 0 0 0 3.5 16h17a1.502 1.502 0 0 0 1.5-1.5v-4A1.502 1.502 0 0 0 20.5 9zM17 12H7v1h10z" /><path fill="none" d="M0 0h24v24H0z" />
                            </svg>
                        </button>
                        <span style={{ fontSize: "13.5px", transition: "0.3s ease-in-out" }} className={`text-${sideNav === "button" ? "primary" : "black"}`}>Button</span>
                    </div>
                    <div className="d-flex flex-column align-items-center justify-content-center" style={{ gap: "0.5rem", cursor: "pointer" }} onClick={() => setSideNav(sideNav === "offers" ? "" : "offers")}>
                        <button className={`btn bg-${sideNav === "offers" ? "light-primary" : "white"} d-flex align-items-center justify-content-center`} style={{ aspectRatio: "1", padding: "0.95rem", border: "none", outline: "none", transition: "0.3s ease-in-out" }}>
                            <Tag size={17.5} />
                        </button>
                        <span style={{ fontSize: "13.5px", transition: "0.3s ease-in-out" }} className={`text-${sideNav === "offers" ? "primary" : "black"}`}>Offers</span>
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
                        <Row className='align-items-center'>
                            <div className='col-md-4 d-flex justify-content-center align-items-center'>
                                {sideNav === "theme" && <input placeholder={"Search Themes"} className={"form-control"} />}
                            </div>
                            <div className="col-4 d-flex justify-content-center align-items-stretch align-self-stretch">
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
                        <div className=" border-end bg-white position-relative h-100" style={{ width: sideNav === "" ? "0px" : sideNav === "theme" ? "350px" : "240px", overflowX: "hidden", transition: "0.3s ease-in-out", opacity: "1", boxShadow: "10px 2px 5px rgba(0,0,0,0.125)", zIndex: "1" }}>
                            <div style={{ height: "100%", overflowY: "auto" }}>

                                {/* Theme Section */}
                                {sideNav === "theme" && <div style={{ transition: "0.3s ease-in-out", overflow: "auto", width: "350px", transform: `translateX(${sideNav === "theme" ? "0px" : "-240px"})`, position: "absolute", inset: "0px" }}>
                                    <div className="container-fluid p-0 m-0">
                                        <div className="row p-1 m-0">
                                            {templates.map((ele, key) => {
                                                return (
                                                    <div className="col-6" key={key}>
                                                        <div onClick={() => setDefTheme(key)} className="d-flex justify-content-center align-items-center mb-1 position-relative cursor-pointer" style={{ padding: "0.5rem", aspectRatio: "1", outline: `1px solid ${defTheme === key ? "#7367f0" : "lightgray"}`, transition: "0.3s ease-in-out" }}>
                                                            <img src={ele.coverImage} width={"100%"} height={"100%"} alt="" />
                                                            <div className="position-absolute" style={{ inset: "0px", backgroundColor: `rgba(0,0,0,0.25})` }}></div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>}
                                {/* Theme Section */}

                                {/* Audience Section */}
                                {sideNav === "audience" && <div style={{ transition: "0.3s ease-in-out", overflow: "hidden", width: "240px", transform: `translateX(${sideNav === "audience" ? "0px" : "-240px"})`, position: "absolute", inset: "0px" }}>
                                    <UncontrolledAccordion>
                                        <AccordionItem className='bg-white border-bottom'>
                                            <AccordionHeader className='acc-header border-bottom' targetId='1'>
                                                <p className='m-0 fw-bolder text-black' style={{ fontSize: "0.9rem", textDecoration: "underline", textDecorationStyle: "dotted" }}>Show Pop-up To</p>
                                            </AccordionHeader>
                                            <AccordionBody accordionId='1'>
                                                <div className='p-0 mx-0 my-1'>
                                                    {/* <Select options={[
                                                        { value: 'chocolate', label: 'All Visitors' },
                                                        { value: 'strawberry', label: 'First Time Visitors' },
                                                        { value: 'vanilla', label: 'Returning Visitors' },
                                                        { value: 'blueberry', label: 'Registered Users' }
                                                    ]} /> */}
                                                    <div className="form-check form-check-success mb-1">
                                                        <input type="radio" name='show-popup-to' id='all' value={"all"} className="form-check-input" /><label className="form-check-label" htmlFor="all">All Visitors</label>
                                                    </div>
                                                    <div className="form-check form-check-success mb-1">
                                                        <input type="radio" name='show-popup-to' id='first' value={"first"} className="form-check-input" /><label htmlFor="first" className="form-check-label">First Time Visitors</label>
                                                    </div>
                                                    <div className="form-check form-check-success mb-1">
                                                        <input type="radio" name='show-popup-to' id='return' value={"return"} className="form-check-input" /><label htmlFor="return" className="form-check-label">Returning Visitors</label>
                                                    </div>
                                                    <div className="form-check form-check-success mb-1">
                                                        <input type="radio" name='show-popup-to' id='registered' value={"registered"} className="form-check-input" /><label htmlFor="registered" className="form-check-label">Registered Users</label>
                                                    </div>
                                                </div>
                                            </AccordionBody>
                                        </AccordionItem>
                                    </UncontrolledAccordion>
                                </div>}
                                {/* Audience Section */}

                                {/* Display Section */}
                                {sideNav === "display" && <div style={{ transition: "0.3s ease-in-out", overflow: "hidden", width: "240px", transform: `translateX(${sideNav === "display" ? "0px" : "-240px"})`, position: "absolute", inset: "0px" }}>
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
                                </div>}
                                {/* Display Section */}

                                {/* Elements section */}
                                {sideNav === "add-elements" && <div style={{ transition: "0.3s ease-in-out", overflow: "hidden", width: "240px", transform: `translateX(${sideNav === "add-elements" ? "0px" : "-240px"})`, position: "absolute", inset: "0px" }}>
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
                                </div>}
                                {/* Elements section */}

                                {/* Button Section */}
                                {sideNav === "button" && <div style={{ transition: "0.3s ease-in-out", overflow: "hidden", width: "240px", transform: `translateX(${sideNav === "button" ? "0px" : "-240px"})`, position: "absolute", inset: "0px" }}>
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
                                        <div className="toggleSection border-end d-flex align-items-start justify-content-start mb-1">
                                            <div style={{ width: "80px", padding: "0.5rem" }}>
                                                <div draggable className="border rounded text-dark w-100 d-flex flex-column justify-content-between align-items-center p-1" style={{ aspectRatio: "1", cursor: "grab" }}>
                                                    <Square size={17.5} />
                                                    <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Block</span>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div style={{ width: "80px", padding: "0.5rem" }}>
                                            <div draggable className="border rounded text-success w-100 d-flex flex-column justify-content-between align-items-center p-1" style={{ aspectRatio: "1", cursor: "grab" }}>
                                                <Square size={17.5} />
                                                <span className='fw-bolder text-black' style={{ fontSize: "0.75rem" }}>Button</span>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>}
                                {/* Button Section */}

                                {/* Criteria section */}
                                {sideNav === "criteria" && <div style={{ transition: "0.3s ease-in-out", overflow: "hidden", width: "240px", transform: `translateX(${sideNav === "criteria" ? "0px" : "-240px"})`, position: "absolute", inset: "0px" }}>
                                    <UncontrolledAccordion stayOpen>
                                        <AccordionItem className='bg-white border-bottom'>
                                            <AccordionHeader className='acc-header border-bottom' targetId='1'>
                                                <p className='m-0 fw-bolder text-black' style={{ fontSize: "0.9rem", textDecoration: "underline", textDecorationStyle: "dotted" }}>Campaign</p>
                                            </AccordionHeader>
                                            <AccordionBody accordionId='1'>
                                                <div className='p-0 mx-0 my-1'>
                                                    <PickerDefault picker={campaignStart} minDate={"today"} setPicker={setCampaignStart} />
                                                    <div className="form-check d-flex align-items-center gap-1 mx-0 p-0 my-2">
                                                        <label style={{ fontSize: "0.85rem" }} htmlFor="endDateCheck" className="form-check-label m-0 p-0">Set end date</label><input id='endDateCheck' checked={isEndCampaign} type="checkbox" onChange={e => setIsEndCampaign(e.target.checked)} className="form-check-input m-0 cursor-pointer" />
                                                    </div>
                                                    {isEndCampaign && (
                                                        <PickerDefault picker={campaignEnd} minDate={campaignStart} setPicker={setCampaignEnd} />
                                                    )}
                                                </div>
                                            </AccordionBody>
                                        </AccordionItem>
                                        {/* <AccordionItem className='bg-white border-bottom'>
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
                                        </AccordionItem> */}
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
                                                        <label style={{ fontSize: "0.85rem" }} className='form-check-label'>Skip user verification? </label>
                                                        <input type='checkbox' className='form-check-input' style={{ cursor: 'pointer' }} />
                                                    </div>
                                                </div>
                                            </AccordionBody>
                                        </AccordionItem>
                                    </UncontrolledAccordion>
                                </div>}
                                {/* Criteria section */}
                            </div>

                        </div>
                        {/* Section Drawer */}
                        {/* Theme Preview */}
                        <div className="flex-grow-1 preview-section border-end d-flex justify-content-center align-items-stretch" style={{ backgroundImage: `url(${pixels})` }}>
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
                        </div>
                        {/* Theme Preview */}
                        {/* Edit Section */}
                        <div className="edit-section" style={{ width: "00px", overflow: "hidden" }}>
                        </div>
                        {/* Edit Section */}
                    </div>
                </div>
                {/* Preview and Edit Section */}
            </div >
        </>
    )
}
export default CustomizationParent