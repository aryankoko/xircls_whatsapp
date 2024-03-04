import React, { useContext } from 'react'
import './OfferSidebar.css'
import { ChevronDown, ChevronRight, FileText, Percent, Tablet, Tool, X } from 'react-feather'
import CustomEditSection from './CustomEditSection'
import PageEditSection from './PageEditSection'
import VisTypeSection from './VisTypeSection'
import OtpSettings from './OtpSettings'
import { ThemesProvider } from '../../../../Helper/Context'

const OfferSidebarSection = ({ offerOpen, setOfferOpen, selectedThemeNo }) => {

    const {themes, setThemes} = useContext(ThemesProvider)
    const changeValue = (e, type) => {
        const maxSize = 250
        // const customTheme = {...themes}
        if (type === 'files') {
            if (e.target.files[0].size > (maxSize * 1024)) {
                alert('Image size too large')
            } else {
                console.log("changevalue ifelse")
                setThemes({ ...themes, [`themeData${selectedThemeNo}`]: { ...themes[`themeData${selectedThemeNo}`], [e.target.name]: e.target.files[0] } })
            }
        } else {
            console.log("changevalue else")
            setThemes({ ...themes, [`themeData${selectedThemeNo}`]: { ...themes[`themeData${selectedThemeNo}`], [e.target.name]: e.target.value } })
        }
        // if (isMobile) {
        //   customTheme[`themeData${selectedThemeNo}`][`mobile_${e.target.name}`] = type === 'files' ? e.target.files[0] : e.target[type]
        // } else {
        //   customTheme[`themeData${selectedThemeNo}`][e.target.name] = type === 'files' ? e.target.files[0] : e.target[type]
        // }
        // setThemes(customTheme)
    }

    return (
        <div>
            {/* <div className={`offer-buttons ${offerOpen === "offer" && 'offer-nav-active'}`}>
                <div onClick={() => setOfferOpen(offerOpen === "offer" ? '' : 'offer')}
                    className={`p-1 border-bottom d-flex align-items-center justify-content-between`}
                    style={{ cursor: "pointer" }}>
                    <span style={{fontSize: '90%'}} className="d-flex align-items-center gap-2">
                    <img src="https://cdn-icons-png.flaticon.com/512/879/879859.png" width="16" height="16" alt="" title="" /> Select Offer
                    </span> {offerOpen === "offer" && <ChevronRight size={14} />}
                </div>
            </div>
            <div className={`offer-buttons ${offerOpen === "behaviour" && 'offer-nav-active'}`}>
                <div onClick={() => setOfferOpen(offerOpen === "behaviour" ? '' : 'behaviour')}
                    className={`p-1 border-bottom d-flex align-items-center justify-content-between`}
                    style={{ cursor: "pointer" }}>
                    <span style={{fontSize: '90%'}} className="d-flex align-items-center gap-2">
                    <img src="https://cdn-icons-png.flaticon.com/512/2040/2040504.png" width="16" height="16" alt="" title="" /> Change Pop up Behaviour
                    </span> {offerOpen === "behaviour" && <ChevronRight size={14} />}
                </div>
            </div> */}
            {/* <div className={`activePopEdit ${offerOpen === 'offer' && 'side-active'}`} >
        <div onClick={() => {
            setOfferOpen(offerOpen === 'offer' ? '' : 'offer')
        }}  className={`p-1 border-bottom d-flex align-items-center justify-content-between`}>

        </div>
      </div> */}
            {/* <div className={`activePopEdit ${offerOpen === "offer" && 'side-active'}`}>
                <div onClick={() => setOfferOpen(offerOpen === "offer" ? '' : 'offer')}
                    className={`p-1 border-bottom d-flex align-items-center justify-content-between`}
                    style={{ cursor: "pointer" }}
                >
                    <span style={{fontSize: '90%'}} className="d-flex align-items-center gap-2">
                        <Percent size={16} /> Offer
                    </span> <ChevronDown size={14} style={{ rotate: offerOpen === "offer" ? '180deg' : '0deg', transition: '0.5s' }} />
                </div>
                <div className="border-bottom" style={{ maxHeight: offerOpen === "offer" ? '150vh' : '0vh', transition: '0.5s', overflow: 'hidden' }}>
                    <div style={{ transform: `translateX(${offerOpen === 'offer' ? '0%' : '-100%'})`, opacity: `${offerOpen === 'offer' ? '1' : '0'}`, transition: '0.5s ease' }} >
                        <OfferEditSection />
                    </div>
                </div>
            </div> */}
            <div className={`activePopEdit ${offerOpen === "vis_type" && 'side-active'}`}>
                <div onClick={() => setOfferOpen(offerOpen === "vis_type" ? '' : 'vis_type')}
                    className={`p-1 border-bottom d-flex align-items-center justify-content-between`}
                    style={{ cursor: "pointer" }}
                >
                    <span style={{ fontSize: '90%' }} className="d-flex align-items-center gap-2">
                        <img src="https://cdn-icons-png.flaticon.com/512/247/247304.png" width="16" height="16" alt="" title="" className="img-small" />Show Pop-up to
                    </span>
                    <span style={{ rotate: offerOpen === "vis_type" ? '180deg' : '0deg', transition: '0.5s' }}>
                        <ChevronDown size={14} />
                    </span>
                </div>
                <div className="border-bottom" style={{ maxHeight: offerOpen === "vis_type" ? '150vh' : '0vh', transition: '0.5s', overflow: 'hidden' }}>
                    <div style={{ transform: `translateX(${offerOpen === 'vis_type' ? '0%' : '-100%'})`, opacity: `${offerOpen === 'vis_type' ? '1' : '0'}`, transition: '0.5s ease' }} >
                        <VisTypeSection changeValue={changeValue} selectedThemeNo={selectedThemeNo} themes={themes} setThemes={setThemes} />
                    </div>
                </div>
            </div>
            <div className={`activePopEdit ${offerOpen === "vis_set" && 'side-active'}`}>
                <div onClick={() => setOfferOpen(offerOpen === "vis_set" ? '' : 'vis_set')}
                    className={`p-1 border-bottom d-flex align-items-center justify-content-between`}
                    style={{ cursor: "pointer" }}
                >
                    <span style={{ fontSize: '90%' }} className="d-flex align-items-center gap-2">
                        <img src="https://cdn-icons-png.flaticon.com/512/2366/2366158.png" width="16" height="16" alt="" title="" className="img-small" />Pop-up visible on
                    </span>
                    <span style={{ rotate: offerOpen === "vis_set" ? '180deg' : '0deg', transition: '0.5s' }}>
                        <ChevronDown size={14} />
                    </span>
                </div>
                <div className="border-bottom" style={{ maxHeight: offerOpen === "vis_set" ? '150vh' : '0vh', transition: '0.5s', overflow: 'hidden' }}>
                    <div style={{ transform: `translateX(${offerOpen === 'vis_set' ? '0%' : '-100%'})`, opacity: `${offerOpen === 'vis_set' ? '1' : '0'}`, transition: '0.5s ease' }} >
                        <CustomEditSection changeValue={changeValue} selectedThemeNo={selectedThemeNo} themes={themes} setThemes={setThemes} />
                    </div>
                </div>
            </div>
            <div className={`activePopEdit ${offerOpen === "page" && 'side-active'}`}>
                <div onClick={() => setOfferOpen(offerOpen === "page" ? '' : 'page')}
                    className={`p-1 border-bottom d-flex align-items-center justify-content-between`}
                    style={{ cursor: "pointer" }}
                >
                    <span style={{ fontSize: '90%' }} className="d-flex align-items-center gap-2">
                        <FileText size={16} /> Pop-up active on
                    </span>
                    <span style={{ rotate: offerOpen === "page" ? '180deg' : '0deg', transition: '0.5s' }}>
                        <ChevronDown size={14} />
                    </span>
                </div>
                <div className="border-bottom" style={{ maxHeight: offerOpen === "page" ? '150vh' : '0vh', transition: '0.5s', overflow: 'hidden' }}>
                    <div style={{ transform: `translateX(${offerOpen === 'page' ? '0%' : '-100%'})`, opacity: `${offerOpen === 'page' ? '1' : '0'}`, transition: '0.5s ease' }} >
                        <PageEditSection changeValue={changeValue} selectedThemeNo={selectedThemeNo} themes={themes} setThemes={setThemes} />
                    </div>
                </div>
            </div>
            <div className={`activePopEdit ${offerOpen === "verify" && 'side-active'}`}>
                <div onClick={() => setOfferOpen(offerOpen === "verify" ? '' : 'verify')}
                    className={`p-1 border-bottom d-flex align-items-center justify-content-between`}
                    style={{ cursor: "pointer" }}
                >
                    <span style={{ fontSize: '90%' }} className="d-flex align-items-center gap-2">
                        <img src="https://cdn-icons-png.flaticon.com/512/2366/2366158.png" width="16" height="16" alt="" title="" className="img-small" />User Verification
                    </span>
                    <span style={{ rotate: offerOpen === "verify" ? '180deg' : '0deg', transition: '0.5s' }}>
                        <ChevronDown size={14} />
                    </span>
                </div>
                <div className="border-bottom" style={{ maxHeight: offerOpen === "verify" ? '150vh' : '0vh', transition: '0.5s', overflow: 'hidden' }}>
                    <div style={{ transform: `translateX(${offerOpen === 'verify' ? '0%' : '-100%'})`, opacity: `${offerOpen === 'verify' ? '1' : '0'}`, transition: '0.5s ease' }} >
                        <OtpSettings selectedThemeNo={selectedThemeNo} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OfferSidebarSection