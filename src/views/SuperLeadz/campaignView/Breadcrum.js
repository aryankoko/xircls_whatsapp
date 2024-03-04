import React, { useState } from 'react'
import { ChevronRight } from 'react-feather'
import { useNavigate, useParams } from 'react-router-dom'

const Breadcrumb = () => {
    const stage = window.location.href.includes("overview") ? 1 : window.location.href.includes("appearance") ? 2 : window.location.href.includes("rules") ? 3 : window.location.href.includes("duration") ? 4 : ""
    // console.log("stage", stage)
    const { id } = useParams()

    const navigate = useNavigate()

    const [outletData, setoutletData] = useState("")
    console.log(setoutletData, outletData)

    return (
        <div className='d-flex align-items-center gap-3'>
            <div className="heading">
                <h2 className='m-0' style={{ color: "black" }}> <b>View</b> </h2>
            </div>
            <nav className='bread_cumb_nav' aria-label="breadcrumb">
                <ol className="d-flex gap-2 align-items-center m-0 p-0" style={{ listStyle: "none" }}>
                    <li className={`breadcrumb-nav ${stage === 1 ? "breadcrumb-active" : ""}`} onClick={() => navigate(`/merchant/SuperLeadz/overview/${id}/`)} style={{ cursor: "pointer" }}>Overview</li>
                    <li><ChevronRight color={stage >= 1 ? "#000" : "#5e5873"} size={15} /></li>
                    <li className={`breadcrumb-nav ${stage === 2 ? "breadcrumb-active" : ""}`}><a onClick={() => navigate(`/merchant/SuperLeadz/appearance/${id}/`)} style={{ cursor: "pointer" }}>Appearance</a></li>
                    <li><ChevronRight color={stage >= 2 ? "#000" : "#5e5873"} size={15} /></li>
                    <li className={`breadcrumb-nav ${stage === 3 ? "breadcrumb-active" : ""}`}><a onClick={() => navigate(`/merchant/SuperLeadz/rules/${id}/`)} style={{ cursor: "pointer" }}>Rules</a></li>
                    <li><ChevronRight color={stage >= 3 ? "#000" : "#5e5873"} size={15} /></li>
                    <li className={`breadcrumb-nav ${stage === 4 ? "breadcrumb-active" : ""}`}><a onClick={() => navigate(`/merchant/SuperLeadz/duration/${id}/`)} style={{ cursor: "pointer" }}>Duration</a></li>
                </ol>
            </nav>

        </div>
    )
}

export default Breadcrumb