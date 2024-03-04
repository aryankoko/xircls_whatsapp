import React, {useContext} from 'react'
import { ChevronRight } from 'react-feather'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { SuperLeadzLinkValidation } from '../../../Helper/Context'

const Breadcrumb = () => {

    const stage = window.location.href.includes("TheAudience") ? 1 : window.location.href.includes("Editbutton") ? 2 : window.location.href.includes("Thebutton") ? 3 : window.location.href.includes("discount") ? 4 : ""
    // console.log("stage", stage)

    const navigate = useNavigate()
    const notify = (msg) => toast.error(msg)

    const { validateLink } = useContext(SuperLeadzLinkValidation)
    console.log("linkValidatioin", validateLink)

    const handlePage1Leave = (page) => {
        if (page === 'Templates') {
            if (validateLink.audience) {
                navigate("/merchant/SuperLeadz/Editbutton/")
            } else {
                notify("Please select audience type")
                return <Toaster position="top-center" reverseOrder={false} />
            }
        } else if (page === 'EditTheme') {
            if (validateLink.templates) {
                navigate("/merchant/SuperLeadz/quick_setup/")
            } else {
                notify("Please select temeplate")
                return <Toaster position="top-center" reverseOrder={false} />
            }
        }
    }

    return (
        <div className='d-flex align-items-center gap-3'>
            <div className="heading">
                <h2 className='m-0' style={{color: "black"}}> <b>4 SUPER SIMPLE STEPS! </b> </h2>
            </div>
            <nav className='bread_cumb_nav' aria-label="breadcrumb">
                <ol className="d-flex gap-2 align-items-center m-0 p-0" style={{ listStyle: "none" }}>
                    <li className={`breadcrumb-nav ${stage === 1 ? "breadcrumb-active" : ""}`} onClick={() => navigate("/merchant/SuperLeadz/TheAudience/")} style={{ cursor: "pointer" }}>The Audience</li>
                    <li><ChevronRight color={stage >= 1 ? "#000" : "#5e5873"} size={15} /></li>
                    <li className={`breadcrumb-nav ${stage === 2 ? "breadcrumb-active" : ""}`}><a onClick={() => handlePage1Leave("Templates")} style={{ cursor: "pointer" }}>Templates</a></li>
                    <li><ChevronRight color={stage >= 2 ? "#000" : "#5e5873"} size={15} /></li>
                    <li className={`breadcrumb-nav ${stage === 3 ? "breadcrumb-active" : ""}`}><a onClick={() => handlePage1Leave("EditTheme")} style={{ cursor: "pointer" }}>Edit Template</a></li>
                    <li><ChevronRight color={stage >= 3 ?  "#000" : "#5e5873"} size={15} /></li>
                    <li className={`breadcrumb-nav ${stage === 4 ? "breadcrumb-active" : ""}`} onClick={() => navigate("")} style={{cursor: "pointer"}}>Set Rules</li>
                    <li><ChevronRight color={stage >= 3 ?  "#000" : "#5e5873"} size={15} /></li>
                    <li className={`breadcrumb-nav ${stage === 4 ? "breadcrumb-active" : ""}`} onClick={() => navigate("")} style={{cursor: "pointer"}}>Schedule Campaign</li>
                </ol>
            </nav>
        </div>
    )
}

export default Breadcrumb