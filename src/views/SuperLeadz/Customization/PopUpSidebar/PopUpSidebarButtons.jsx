import React, { useContext } from "react"
import "./PopUpSidebar.css"

import { ChevronDown, X, Image, Percent, Square, Tablet, Type, Tool, MousePointer } from "react-feather"
import { ThemesProvider } from "../../../../Helper/Context"
import PopUpEditSection from "./PopUpEditSection"
import ImageEditSection from "./ImageEditSection"
import TextEditSection from "./TextEditSection"
import ButtonEditSection from "./ButtonEditSection"
const PopUpSidebarButtons = ({ isMobile, selectedThemeNo, backgroundColor, setBackgroundColor, setIsImage, bodyBackgroundColor, setBodyBackgroundColor, borderRadius, setBorderRadius, borderBodyRadius, setBorderBodyRadius, headerImage, setHeaderImage, headerImage4, setHeaderImage4, buttonBackground, setButtonBackground, buttonFont, setButtonFont, buttonRadius, setButtonRadius, openSection, setOpenSection, setIsMobile, toggleMobile }) => {

  const { themes, setThemes, matchSettings } = useContext(ThemesProvider)

  const changeValue = (e, type) => {
    const maxSize = 512
    // const customTheme = {...themes}
    if (type === 'files') {
      if (e.target.files[0].size > (maxSize * 1024)) {
        alert('Image size too large')
      } else {
        console.log("changeValue ifelse")
        setThemes({ ...themes, [`themeData${selectedThemeNo}`]: { ...themes[`themeData${selectedThemeNo}`], [`${isMobile ? 'mobile_' : ''}${e.target.name}`]: e.target.files[0] } })
      }
    } else {
      console.log("changeValue else")
      setThemes({ ...themes, [`themeData${selectedThemeNo}`]: { ...themes[`themeData${selectedThemeNo}`], [`${isMobile ? 'mobile_' : ''}${e.target.name}`]: e.target.value } })
    }
    // if (isMobile) {
    //   customTheme[`themeData${selectedThemeNo}`][`mobile_${e.target.name}`] = type === 'files' ? e.target.files[0] : e.target[type]
    // } else {
    //   customTheme[`themeData${selectedThemeNo}`][e.target.name] = type === 'files' ? e.target.files[0] : e.target[type]
    // }
    // setThemes(customTheme)
  }

  function changeThemes(e) {
    const maxSize = 512
    if (e.target.type === 'file') {
      if (e.target.files[0].size > (maxSize * 1024)) {
        alert(`Image size too large. The maximum size allowed is ${maxSize}kb`)
        handleErr()
      } else {
        if (matchSettings[`${openSection}_match`]) {
          console.log("changeThemes ifelseifif")
          setThemes({ ...themes, [`themeData${selectedThemeNo}`]: { ...themes[`themeData${selectedThemeNo}`], [e.target.name]: e.target.files[0], [`mobile_${e.target.name}`]: e.target.files[0] } })
        } else {
          console.log("changeThemes ifelseifelse")
          setThemes({ ...themes, [`themeData${selectedThemeNo}`]: { ...themes[`themeData${selectedThemeNo}`], [`${isMobile ? 'mobile_' : ''}${e.target.name}`]: e.target.files[0] } })
        }
      }
    } else {
      if (matchSettings[`${openSection}_match`]) {
        console.log("changeThemes elseelseif")
        setThemes({ ...themes, [`themeData${selectedThemeNo}`]: { ...themes[`themeData${selectedThemeNo}`], [e.target.name]: e.target.value, [`mobile_${e.target.name}`]: e.target.value } })
      } else {
        console.log("changeThemes elseelseelse")
        setThemes({ ...themes, [`themeData${selectedThemeNo}`]: { ...themes[`themeData${selectedThemeNo}`], [`${isMobile ? 'mobile_' : ''}${e.target.name}`]: e.target.value } })
      }
    }
  }

  return (
    <div className="">
      {/* <div className={`activePopEdit ${openSection === "form" && 'side-active'}`}>
        <div onClick={() => setOpenSection(openSection === "form" ? '' : 'form')}
          className={`p-1 px-2 border-bottom d-flex align-items-center justify-content-between`}
          style={{ cursor: "pointer" }}
        >
          <span className="d-flex align-items-center gap-2">
            <FileText size={16} /> Form
          </span> <span>
            <ChevronDown size={14} style={{rotate: openSection === "form" ? '180deg' : '0deg', transition: '0.5s'}} />
          </span>
        </div>
        <div className="border-bottom" style={{maxHeight: openSection === "form" ? '150vh' : '0vh', transition: '0.5s', overflow: 'hidden'}}>
          <div style={{ transform: `translateX(${openSection === 'form' ? '0%' : '-100%'})`, opacity: `${openSection === 'form' ? '1' : '0'}`, transition: '0.5s ease'}} >
            <FormEditSection />
          </div>
        </div>
      </div> */}
      <div className={`activePopEdit ${openSection === "background" && 'side-active'}`}>
        <div onClick={() => { setOpenSection(openSection === "background" ? '' : 'background') }}
          className={`p-1 px-2 border-top d-flex align-items-center justify-content-between`}
          style={{ cursor: "pointer" }}
        >
          <h6 style={{ fontSize: '90%', lineHeight: '1rem' }} className="d-flex align-items-center gap-2 m-0">
            <img src="https://cdn-icons-png.flaticon.com/512/4152/4152237.png" width={"16px"} /> Background
          </h6>
          <span style={{ rotate: openSection === "background" ? '180deg' : '0deg', transition: '0.5s' }}>
            <ChevronDown size={14} />
          </span>
        </div>
        <div className="border-bottom" style={{ maxHeight: openSection === "background" ? '150vh' : '0vh', transition: '0.5s', overflow: 'hidden' }}>
          <div style={{ transform: `translateX(${openSection === 'background' ? '0%' : '-100%'})`, opacity: `${openSection === 'background' ? '1' : '0'}`, transition: '0.5s ease' }} >
            <PopUpEditSection toggleMobile={toggleMobile} changeThemes={changeThemes} setIsMobile={setIsMobile} themes={themes} setThemes={setThemes} isMobile={isMobile} selectedThemeNo={selectedThemeNo} changeValue={changeValue} backgroundColor={backgroundColor} setBackgroundColor={setBackgroundColor} bodyBackgroundColor={bodyBackgroundColor} setBodyBackgroundColor={setBodyBackgroundColor} borderRadius={borderRadius} setBorderRadius={setBorderRadius} borderBodyRadius={borderBodyRadius} setBorderBodyRadius={setBorderBodyRadius} />
          </div>
        </div>
      </div>
      <div className={`activePopEdit ${openSection === "image" && 'side-active'}`}>
        <div onClick={() => setOpenSection(openSection === "image" ? '' : 'image')}
          className={`p-1 px-2 border-top d-flex align-items-center justify-content-between`}
          style={{ cursor: "pointer" }}
        >
          <h6 style={{ fontSize: '90%', lineHeight: '1rem' }} className="d-flex align-items-center gap-2 m-0">
            <img src="https://cdn-icons-png.flaticon.com/512/739/739249.png" width={"16px"} /> {selectedThemeNo === 3 ? "Logo" : "Image"}
          </h6>
          <span style={{ rotate: openSection === "image" ? '180deg' : '0deg', transition: '0.5s' }}>
            <ChevronDown size={14} />
          </span>
        </div>
        <div className="border-bottom" style={{ maxHeight: openSection === "image" ? '150vh' : '0vh', transition: '0.5s', overflow: 'hidden' }}>
          <div style={{ transform: `translateX(${openSection === 'image' ? '0%' : '-100%'})`, opacity: `${openSection === 'image' ? '1' : '0'}`, transition: '0.5s ease' }} >
            <ImageEditSection toggleMobile={toggleMobile} changeThemes={changeThemes} changeValue={changeValue} isMobile={isMobile} setIsMobile={setIsMobile} selectedThemeNo={selectedThemeNo} headerImage={headerImage} setHeaderImage={setHeaderImage} setIsImage={setIsImage} headerImage4={headerImage4} setHeaderImage4={setHeaderImage4} themes={themes} setThemes={setThemes} />
          </div>
        </div>
      </div>
      <div className={`activePopEdit ${openSection === "text" && 'side-active'}`}>
        <div onClick={() => setOpenSection(openSection === "text" ? '' : 'text')}
          className={`p-1 px-2 border-top d-flex align-items-center justify-content-between`}
          style={{ cursor: "pointer" }}
        >
          <h6 style={{ fontSize: '90%', lineHeight: '1rem' }} className="d-flex align-items-center gap-2 m-0">
            <img src="https://cdn-icons-png.flaticon.com/128/2087/2087807.png" width={"16px"} /> Text
          </h6>
          <span style={{ rotate: openSection === "text" ? '180deg' : '0deg', transition: '0.5s' }}>
            <ChevronDown size={14} />
          </span>
        </div>
        <div className="border-bottom" style={{ maxHeight: openSection === "text" ? '150vh' : '0vh', transition: '0.5s', overflow: 'hidden' }}>
          <div style={{ transform: `translateX(${openSection === 'text' ? '0%' : '-100%'})`, opacity: `${openSection === 'text' ? '1' : '0'}`, transition: '0.5s ease' }} >
            <TextEditSection toggleMobile={toggleMobile} changeThemes={changeThemes} changeValue={changeValue} isMobile={isMobile} setIsMobile={setIsMobile} selectedThemeNo={selectedThemeNo} headerImage={headerImage} setHeaderImage={setHeaderImage} setIsImage={setIsImage} headerImage4={headerImage4} setHeaderImage4={setHeaderImage4} themes={themes} setThemes={setThemes} />
          </div>
        </div>
      </div>
      {/* <div className={`activePopEdit ${openSection === "font" && 'side-active'}`}>
        <div onClick={() => setOpenSection(openSection === "font" ? '' : 'font')}
          className={`p-1 px-2 border-bottom d-flex align-items-center justify-content-between`}
          style={{ cursor: "pointer" }}
        >
          <span className="d-flex align-items-center gap-2">
            <Edit2 size={16} /> Font
          </span> <span>
            <ChevronDown size={14} style={{rotate: openSection === "font" ? '180deg' : '0deg', transition: '0.5s'}} />
          </span>
        </div>
        <div className="border-bottom" style={{maxHeight: openSection === "font" ? '150vh' : '0vh', transition: '0.5s', overflow: 'hidden'}}>
          <FontEditSection changeValue={changeValue} headerColor={headerColor} setHeaderColor={setHeaderColor} bodyColor={bodyColor} setBodyColor={setBodyColor} />
        </div>
      </div> */}
      <div className={`activePopEdit ${openSection === "button" && 'side-active'}`}>
        <div onClick={() => setOpenSection(openSection === "button" ? '' : 'button')}
          className={`p-1 px-2 d-flex align-items-center justify-content-between`}
          style={{ cursor: "pointer" }}
        >
          <h6 style={{ fontSize: '90%', lineHeight: '1rem' }} className="d-flex align-items-center gap-2 m-0">
          <img src="https://cdn-icons-png.flaticon.com/512/3303/3303079.png" width={"16px"} /> Button
          </h6>
          <span style={{ rotate: openSection === "button" ? '180deg' : '0deg', transition: '0.5s' }}>
            <ChevronDown size={14} />
          </span>
        </div>
        <div className="border-bottom" style={{ maxHeight: openSection === "button" ? '150vh' : '0vh', transition: '0.5s', overflow: 'hidden' }}>
          <div style={{ transform: `translateX(${openSection === 'button' ? '0%' : '-100%'})`, opacity: `${openSection === 'button' ? '1' : '0'}`, transition: '0.5s ease' }} >
            <ButtonEditSection toggleMobile={toggleMobile} changeThemes={changeThemes} themes={themes} setThemes={setThemes} isMobile={isMobile} setIsMobile={setIsMobile} selectedThemeNo={selectedThemeNo} changeValue={changeValue} buttonBackground={buttonBackground} setButtonBackground={setButtonBackground} buttonFont={buttonFont} setButtonFont={setButtonFont} buttonRadius={buttonRadius} setButtonRadius={setButtonRadius} />
          </div>
        </div>
      </div>
      {/* <div className={`activePopEdit ${openSection === "offer" && 'side-active'}`}>
        <div onClick={() => setOpenSection(openSection === "offer" ? '' : 'offer')}
          className={`p-1 px-2 border-bottom d-flex align-items-center justify-content-between`}
          style={{ cursor: "pointer" }}
        >
          <span className="d-flex align-items-center gap-2">
            <Percent size={16} /> Offer
          </span> <span>
            <ChevronDown size={14} style={{rotate: openSection === "offer" ? '180deg' : '0deg', transition: '0.5s'}} />
          </span>
        </div>
        <div className="border-bottom" style={{maxHeight: openSection === "offer" ? '150vh' : '0vh', transition: '0.5s', overflow: 'hidden'}}>
          <div style={{ transform: `translateX(${openSection === 'offer' ? '0%' : '-100%'})`, opacity: `${openSection === 'offer' ? '1' : '0'}`, transition: '0.5s ease'}} >
            <OfferEditSection changeValue={changeValue} offerBg={offerBg} setOfferBg={setOfferBg} offerText={offerText} setOfferText={setOfferText} offerButtonBg={offerButtonBg} setOfferButtonBg={setOfferButtonBg} offerButtonRadius={offerButtonRadius} setOfferButtonRadius={setOfferButtonRadius} offerButtonText={offerButtonText} setOfferButtonText={setOfferButtonText}/>
          </div>
        </div>
      </div>
      <div className={`activePopEdit ${openSection === "custom" && 'side-active'}`}>
        <div onClick={() => setOpenSection(openSection === "custom" ? '' : 'custom')}
          className={`p-1 px-2 border-bottom d-flex align-items-center justify-content-between`}
          style={{ cursor: "pointer" }}
        >
          <span className="d-flex align-items-center gap-2">
            <Tool size={16} /> Behaviour
          </span> <span>
            <ChevronDown size={14} style={{rotate: openSection === "custom" ? '180deg' : '0deg', transition: '0.5s'}} />
          </span>
        </div>
        <div className="border-bottom" style={{maxHeight: openSection === "custom" ? '150vh' : '0vh', transition: '0.5s', overflow: 'hidden'}}>
          <div style={{ transform: `translateX(${openSection === 'custom' ? '0%' : '-100%'})`, opacity: `${openSection === 'custom' ? '1' : '0'}`, transition: '0.5s ease'}} >
            <CustomEditSection themes={themes} isMobile={isMobile} changeValue={changeValue} visitorType={visitorType} setVisitorType={setVisitorType} popupStatus={popupStatus} setPopupStatus={setPopupStatus} popupStatusRange={popupStatusRange} setPopupStatusRange={setPopupStatusRange} selectedThemeNo={selectedThemeNo} />
          </div>
        </div>
      </div>
      <div className={`activePopEdit ${openSection === "page" && 'side-active'}`}>
        <div onClick={() => setOpenSection(openSection === "page" ? '' : 'page')}
          className={`p-1 px-2 border-bottom d-flex align-items-center justify-content-between`}
          style={{ cursor: "pointer" }}
        >
          <span className="d-flex align-items-center gap-2">
            <FileText size={16} /> Page
          </span> <span>
            <ChevronDown size={14} style={{rotate: openSection === "page" ? '180deg' : '0deg', transition: '0.5s'}} />
          </span>
        </div>
        <div className="border-bottom" style={{maxHeight: openSection === "page" ? '150vh' : '0vh', transition: '0.5s', overflow: 'hidden'}}>
          <div style={{ transform: `translateX(${openSection === 'page' ? '0%' : '-100%'})`, opacity: `${openSection === 'page' ? '1' : '0'}`, transition: '0.5s ease'}} >
            <PageEditSection isMobile={isMobile} selectedThemeNo={selectedThemeNo} themes={themes} setThemes={setThemes} changeValue={changeValue} pageLocation={pageLocation} setPageLocation={setPageLocation} customUrl={customUrl} setCustomUrl={setCustomUrl}/>
          </div>
        </div>
      </div> */}
      {/* <div className={`activePopEdit ${openSection === "trigger" && 'side-active'}`}>
        <div onClick={() => setOpenSection(openSection === "trigger" ? '' : 'trigger')}
          className={`p-1 px-2 border-bottom d-flex align-items-center justify-content-between`}
          style={{ cursor: "pointer" }}
        >
          <span className="d-flex align-items-center gap-2">
            <MousePointer size={16} /> Trigger
          </span> <span>
            <ChevronDown size={14} style={{rotate: openSection === "trigger" ? '180deg' : '0deg', transition: '0.5s'}} />
          </span>
        </div>
        <div className="border-bottom" style={{maxHeight: openSection === "trigger" ? '150vh' : '0vh', transition: '0.5s', overflow: 'hidden'}}>
          <div style={{ transform: `translateX(${openSection === 'trigger' ? '0%' : '-100%'})`, opacity: `${openSection === 'trigger' ? '1' : '0'}`, transition: '0.5s ease'}} >
            <TriggersEditSection/>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default PopUpSidebarButtons
