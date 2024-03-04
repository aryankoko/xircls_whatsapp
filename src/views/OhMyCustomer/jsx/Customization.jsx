import React, { useState } from 'react'
import { ArrowLeft, Circle } from 'react-feather'
import { useNavigate } from 'react-router-dom'
import "../css/Customization.css"

const Customization = () => {
    const navigate = useNavigate()
    const [currSideActive, setCurrSideActive] = useState("header_card")
    return (
        // Container
        <div style={{ width: "100%", height: "100vh", display: "flex", flexDirection: "column" }}>
            {/* top bar */}
            <div className="d-flex justify-content-between align-items-center px-1" style={{ height: "55px", boxShadow: "0px 5px 10px rgba(0,0,0,0.25)" }}>
                <ArrowLeft className='cursor-pointer' size={"25px"} onClick={() => navigate(-1)} /><button className="btn btn-primary-main">Save</button>
            </div>
            {/* top bar */}

            {/* Customization section */}
            <div className="flex-grow-1 d-flex">
                {/* sidebar */}
                <div className="h-100 overflow-y-auto py-1" style={{ width: "100px", boxShadow: "5px 0px 10px rgba(0,0,0,0.25)" }}>
                    <div className="d-flex flex-column align-items-center gap-2">
                        <div className="d-flex flex-column align-items-center cursor-pointer" onClick={() => setCurrSideActive(currSideActive === "header_card" ? "" : "header_card")} style={{ gap: "7.5px" }}>
                            <div className="rounded d-flex justify-content-center align-items-center" style={{ width: "60px", aspectRatio: "1", boxShadow: `0px 0px 10px rgba(0,0,0,${currSideActive === "header_card" ? "0" : "0.45"})`, transition: "0.3s ease" }}>
                                <Circle size={"27.5px"} />
                            </div>
                            <span style={{ fontSize: "12px" }}>Header Card</span>
                        </div>
                    </div>
                </div>
                {/* sidebar */}

                {/* edit section */}
                <div className="h-100 overflow-y-auto" style={{ width: "250px", boxShadow: "5px 0px 10px rgba(0,0,0,0.25)" }}>

                </div>
                {/* edit section */}

                {/* preview section */}
                <div className="h-100 flex-grow-1 bg-light-secondary">
                    <div className="previewSection">
                        <div className="yellow_back" style={{ backgroundColor: "#FFE453", margin: '10px', borderRadius: '10px', display: 'flex', backgroundRepeat: 'no-repeat', backgroundPosition: 'right' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '40px' }}>
                                <div>
                                    <div className="banner_font1">Good Morning, Daisy</div>
                                    <div className="banner_font2">Lorem ipsum dolor sit amet, consectetur adipiscing.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* preview section */}
            </div>
            {/* Customization section */}
        </div>
        // Container
    )
}

export default Customization