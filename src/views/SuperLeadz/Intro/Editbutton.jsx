import React, { useRef, useState } from "react"
import Breadcrumb from "../../Components/BreadCrumbs/Breadcrumb"
import { ArrowLeft, ArrowRight } from 'react-feather'
import CarouselCom from "./CarouselCom"
import IntroWrapper from "../../Components/SuperLeadz/IntroWrapper"
// import { ThemesProvider } from "../../../Helper/Context"
import { useNavigate } from "react-router-dom"
// import { getCurrentOutlet } from "../../Validator"
// import { SuperLeadzBaseURL } from "../../../assets/auth/jwtService"
import { allThemes } from "../../Components/SuperLeadz/allThemes"

function Editbutton() {
  const navigate = useNavigate()
  const [themeNumber, setThemeNumber] = useState(1)

  const [custModal, setCustModal] = useState(false)

  const toggleModal = () => setCustModal(!custModal)

  // const { selectedThemeNo, oldThemes: allThemes, setIntroThemeId } = useContext(ThemesProvider)
  // const { selectedThemeNo} = useContext(ThemesProvider)
  // const outletData = getCurrentOutlet()

  // const sendData = (e) => {
  //   e?.preventDefault()
  //   const formData = new FormData()
  //   formData.append("shop", outletData[0]?.web_url)
  //   formData.append("app", 'superleadz')
  //   formData.append("theme_number", `theme${selectedThemeNo}`)
  //   formData.append("theme_name", "IntroTheme")
  //   formData.append("saving_type", "theme")
  //   // if (isEdit) {
  //   //     formData.append("is_edit", 1)
  //   //     formData.append("theme_name", themeName)
  //   //     formData.append("theme_id", themeId)
  //   // } else {
  //   formData.append("is_edit", 0)
  //   // }
  //   Object.entries(allThemes[`themeData${selectedThemeNo}`])?.map(([key, value]) => {
  //     if (Array.isArray(value)) {
  //       value.map(ele => formData.append(key, ele))
  //     } else if (typeof value === 'string' || (!Array.isArray(value) && key.includes('image'))) {
  //       formData.append(key, value)
  //     } else {
  //       formData.append(key, JSON.stringify(value))
  //     }
  //   })

  //   fetch(`${SuperLeadzBaseURL}/api/v1/add_pop_theme/`, {
  //     method: "POST",
  //     body: formData
  //   })
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       if (data.response === 'Create Successfully') {
  //         setIntroThemeId(data.theme_id)
  //         navigate('/merchant/SuperLeadz/Thebutton/')
  //       } else {
  //         alert("There was an error saving your theme. You can create a new theme again later")
  //         navigate('/merchant/SuperLeadz/Thebutton/')
  //       }
  //     }).catch(() => {
  //       alert("There was an error saving your theme. You can create a new theme again later")
  //       navigate('/merchant/SuperLeadz/Thebutton/')
  //     })
  // }
  // useEffect(() => {
  //   fetch('https://api.xircls.com/api/v1/get/popup_data/', {
  //     method: "POST",
  //     body: JSON.stringify({ shop: localStorage.getItem("shop") })
  //   })
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       setActiveData(data.response[0])

  //     })
  // }, [])

  const button_div = useRef(null)

  const btn_height = button_div?.current?.offsetHeight


  return (

    <IntroWrapper>
      <div className="card-body w-100" style={{ position: 'relative', zIndex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'between', height: '85vh' }}>
        {/* <h2><b>SuperLeadz</b></h2> */}
        <div className="flex-grow-1">
          <Breadcrumb />
          <h3 style={{ marginTop: '1rem', color: "black" }}>Templates</h3>
          <p style={{color: "black"}}>
            Select a pop-up to display exclusively to your selected audience.
          </p>
          <hr />
          <CarouselCom custModal={custModal} toggleModal={toggleModal} btn_height={btn_height} allThemes={allThemes} themeNumber={themeNumber} setThemeNumber={setThemeNumber} text="Pick a template that suits your brand" />
          {/* <Customization text="Customization" theme={themeNumber} /> */}
          <div style={{position: 'absolute', bottom: '0px', left: '0px', width: '100%', padding: '0px 20px'}}>
            <div ref={button_div} className="button_div" style={{ marginTop: "3rem", display: "flex", justifyContent: "space-between" }}>
              <button className='primary-btn-outline' onClick={() => {
                custModal ? toggleModal() : navigate('/merchant/SuperLeadz/TheAudience/')
              }}>
                <div>
                  <ArrowLeft size={'20px'} />
                  Back
                </div>

              </button>
              <button className='primary-btn' onClick={() => navigate("/merchant/SuperLeadz/quick_setup/")}>
                <div>
                  Next
                  <ArrowRight size={'20px'} />
                </div>

              </button>

            </div>

          </div>
        </div>

      </div>
    </IntroWrapper>
  )
}

export default Editbutton
