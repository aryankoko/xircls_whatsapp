import React, { useContext, useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'react-feather'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { SuperLeadzLinkValidation, ThemesProvider } from "../../../Helper/Context"
import IntroWrapper from '../../Components/SuperLeadz/IntroWrapper'
import Breadcrumb from '../../Components/BreadCrumbs/Breadcrumb'

// import "../components/OfferSidebar/OfferSidebar.css"

const TheAudience = () => {

    const navigate = useNavigate()
    const notify = (msg) => toast.error(msg)

    const { oldThemes: allThemes, setOldThemes: setAllThemes } = useContext(ThemesProvider)
    const { validateLink, setValidateLink, visitorSettings, setVisitorSettings } = useContext(SuperLeadzLinkValidation)
    console.log(validateLink, "validateLink")

    // const [activeBtn, setActiveBtn] = useState("ALL_VISITORS")

    console.log(allThemes)

    const [count, setCount] = useState(0)
    console.log(count)

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

    useEffect(() => {
        setCount(count + 1)
        setValidateLink({...validateLink, audience: true})

    }, [visitorSettings])

    useEffect(() => {
        if (visitorSettings === "") {
            console.log("first")
            setValidateLink({...validateLink, audience: false})
        }
    }, [])


    return (

        <IntroWrapper>
            <div className="card-body w-100" style={{ position: 'relative', zIndex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'between', minHeight: '85vh' }}>
                {/* <h2><b>SuperLeadz</b></h2> */}
                <div className="flex-grow-1">
                    <Breadcrumb />
                    <h3 style={{ marginTop: '1rem', color: "black" }}>The Audience</h3>
                    <p style={{color: "black"}}>
                        Select a visitor segment. Trigger the urge to buy.
                    </p>
                    <hr />
                    <div className="d-flex gap-3 justify-content-between align-items-start">
                        <div className="flex-grow-1">
                            {/* <p><b>I want to activate</b></p> */}
                            <ul className="mx-0 px-0 my-2" style={{ listStyle: 'none', maxWidth: '250px' }}>
                                <li className={`rounded visitor_select cursor-pointer active-${visitorSettings === "ALL_VISITORS" ? "1" : visitorSettings === "FIRST_VISITORS" ? "2" : visitorSettings === "SECOND_VISITORS" ? "3" : "4"} ${visitorSettings === "ALL_VISITORS" ? "" : ""}`} name="ALL_VISITORS" onClick={() => {
                                    setAllThemes({ ...allThemes, themeData3: { ...allThemes.themeData3, visitor_settings: "ALL_VISITORS" }, themeData4: { ...allThemes.themeData4, visitor_settings: "ALL_VISITORS" } })
                                    setVisitorSettings("ALL_VISITORS")
                                }} style={{ fontSize: '14px', padding: "0.5rem 1rem", color: "black", letterSpacing: "1px" }}>All Visitors</li>
                                <li className={`rounded visitor_select cursor-pointer ${visitorSettings === "FIRST_VISITORS" ? "" : ""}`} name="FIRST_VISITORS" onClick={() => {
                                    setAllThemes({ ...allThemes, themeData3: { ...allThemes.themeData3, visitor_settings: "FIRST_VISITORS" }, themeData4: { ...allThemes.themeData4, visitor_settings: "FIRST_VISITORS" } })
                                    setVisitorSettings("FIRST_VISITORS")
                                }} style={{ fontSize: '14px', padding: "0.5rem 1rem", color: "black", letterSpacing: "1px" }}>First Time Visitors</li>
                                <li className={`rounded visitor_select cursor-pointer ${visitorSettings === "SECOND_VISITORS" ? "" : ""}`} name="SECOND_VISITORS" onClick={() => {
                                    setAllThemes({ ...allThemes, themeData3: { ...allThemes.themeData3, visitor_settings: "SECOND_VISITORS" }, themeData4: { ...allThemes.themeData4, visitor_settings: "SECOND_VISITORS" } })
                                    setVisitorSettings("SECOND_VISITORS")
                                }} style={{ fontSize: '14px', padding: "0.5rem 1rem", color: "black", letterSpacing: "1px" }}>Returning Visitors</li>
                                <li className={`rounded visitor_select cursor-pointer ${visitorSettings === "REGISTERED_USERS" ? "" : ""}`} name="REGISTERED_USERS" onClick={() => {
                                    setAllThemes({ ...allThemes, themeData3: { ...allThemes.themeData3, visitor_settings: "REGISTERED_USERS" }, themeData4: { ...allThemes.themeData4, visitor_settings: "REGISTERED_USERS" } })
                                    setVisitorSettings("REGISTERED_USERS")
                                }} style={{ fontSize: '14px', padding: "0.5rem 1rem", color: "black", letterSpacing: "1px" }}>Registered Users</li>
                            </ul>
                        </div>
                        {/* <img style={{mixBlendMode: 'multiply', width: '35%', aspectRatio: "1"}} src={all_visitors} alt="" /> */}
                    </div>
                    {count && <p style={{ fontSize: '0.75rem' }}>*You can create themes for other segments later</p>}
                </div>
                <div style={{position: 'absolute', bottom: '0px', left: '0px', width: '100%', padding: '0px 20px'}}>
                    <div className="button_div" style={{ marginTop: "3rem", display: "flex", justifyContent: "space-between" }}>
                        <button className='primary-btn-outline' onClick={() => navigate('/merchant/SuperLeadz/intro/')}>
                            <div>
                                <ArrowLeft size={'20px'} />
                                Back
                            </div>
                        </button>
                        <button className='primary-btn' onClick={() => handlePage1Leave("Templates")} >
                            <div>
                                Next
                                <ArrowRight size={'20px'} />
                            </div>
                        </button>
                    </div>

                </div>
            </div>
        </IntroWrapper>
    )
}

export default TheAudience