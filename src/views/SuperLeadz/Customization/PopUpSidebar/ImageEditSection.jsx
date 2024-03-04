import React, { useContext } from "react"
import { Edit2, Edit3, PlusCircle, Trash, X } from "react-feather"
import { ThemesProvider } from "../../../../Helper/Context"

const ImageEditSection = ({ changeThemes, setHeaderImage, setIsImage, selectedThemeNo, isMobile, setIsMobile, toggleMobile }) => {

  const settingImage = (image) => {
    let demo
    try {
      demo = URL.createObjectURL(image)
    } catch (error) {
      demo = image
    }
    return demo
  }

  const { themes, setThemes, matchSettings, setMatchSettings } = useContext(ThemesProvider)

  const aspectRatio = isMobile ? "16/9" : '9/16'

  const bgImage4 = themes?.themeData4?.[`${isMobile ? 'mobile_' : ''}background_image`]

  const carouselArray = themes?.themeData4?.[`${isMobile ? 'mobile_' : ''}carousel_image`]


  const carouselImageAdd = (e) => {
    console.log(e)
    const maxSize = 512
    if (e.target.files[0].size > (maxSize * 1024)) {
      alert('Image size too large')
    } else {
      console.log("carouselImageAdd")
      setThemes({ ...themes, themeData4: { ...themes.themeData4, [`${isMobile ? 'mobile_' : ''}carousel_image`]: [...carouselArray, e.target.files[0]] } })
    }
  }

  const editCarouselImage = (e, i) => {
    const maxSize = 512
    if (e.target.files[0].size > (maxSize * 1024)) {
      alert('Image size too large')
    } else {
      const editArray = [...carouselArray]
      editArray[i] = e.target.files[0]
      console.log("editCarouselImage")
      setThemes({ ...themes, themeData4: { ...themes.themeData4, [`${isMobile ? 'mobile_' : ''}carousel_image`]: editArray } })
    }
  }

  const removeCarouselImage = (i) => {
    const editArray = [...carouselArray]
    editArray.splice(i, 1)
    console.log("removeCarouselImage")
    setThemes({ ...themes, themeData4: { ...themes.themeData4, [`${isMobile ? 'mobile_' : ''}carousel_image`]: editArray } })
  }

  return (
    <div className="row px-2 py-2">
      {Number(selectedThemeNo) !== 4 && <div className="col-9 mb-2">
        <label className="mb-2" style={{ fontSize: '87.5%' }}>Logo: <small>(make sure the aspect ratio of your logo is 1:1)</small></label>
        <label htmlFor="theme3Img" style={{ backgroundColor: '#ccc', border: '2px dashed gray', cursor: 'pointer', display: 'block', aspectRatio: '1', margin: 'auto' }} className="w-50">
          <img src={settingImage(themes?.themeData3?.[`${isMobile ? 'mobile_' : ''}image`])} alt="" style={{ aspectRatio: '1', objectFit: 'cover' }} className="w-100 d-block m-auto" />
        </label>
        <div className="d-flex gap-2 align-items-center">
          <input
            type="file"
            accept="image/png, image/jpeg, image/svg, image/jpg"
            className="d-none"
            name="image"
            id="theme3Img"
            onChange={(e) => {
              console.log(e.target.files[0])
              setHeaderImage(e.target.files[0])
              changeThemes(e)
              setIsImage(1)
            }}
          />
        </div>
      </div>}
      {Number(selectedThemeNo) === 4 &&
        <div className="col-12 mb-2">
          <div className="mb-2">
            <label style={{ fontSize: '87.5%' }}>Background Image: </label>
            <p className="text-secondary" style={{ fontSize: "75%" }}>
              (the aspect ratio of your image must be {isMobile ? "4:3" : '3:4'})
            </p>
            <div className="d-flex gap-2 align-items-center row px-1">
              <div className={`col-md-${isMobile ? "12" : "6"} px-1 mb-2 position-relative`}>
              {/* {themes.themeData4[`${isMobile ? "mobile_" : ""}background_image`] !== "" && } */}
                {themes.themeData4[`${isMobile ? "mobile_" : ""}background_image`] !== "" ? <label style={{ opacity: '0.75', cursor: 'pointer', aspectRatio, border: '2px dashed gray' }} className={`w-100 position-relative image-label`} htmlFor={`image-input-bg`}><span className="delete-image p-0 btn btn-danger d-flex justify-content-center align-items-center" style={{ width: '20px', aspectRatio: '1', position: 'absolute', top: '-10px', right: '-10px', borderRadius: '50px', zIndex: '9999' }} onClick={() => {
                  setThemes({ ...themes, themeData4: { ...themes.themeData4, [`${isMobile ? "mobile_" : ""}background_image`]: "" } })
                }}><X color="white" size={10} /></span>
                  <input onChange={(e) => {
                    changeThemes(e)
                  }}
                    name={`background_image`} type="file"
                    accept="image/png, image/jpeg, image/svg, image/jpg" id={`image-input-bg`} className="d-none" />
                  <img src={settingImage(bgImage4)} className="w-100 h-100" alt="" />
                  <div className="position-absolute w-100 h-100 top-0 left-0 d-flex justify-content-center align-items-center hidden-edit" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <Edit2 size={20} color="white" />
                  </div>
                </label> : <label style={{ cursor: 'pointer', aspectRatio, border: '2px dashed gray' }} className="w-100 d-flex justify-content-center align-items-center" htmlFor={`image-input-bg`}>
                  <input onChange={(e) => {
                    changeThemes(e)
                  }}
                    name={`background_image`} type="file"
                    accept="image/png, image/jpeg, image/svg, image/jpg" id={`image-input-bg`} className="d-none" />
                  {/* <img src={settingImage(bgImage4)} className="w-100 h-100" alt="" /> */}
                  <PlusCircle color="gray" />
                </label>}
              </div>
            </div>
          </div>
          <hr />
          <div>
            <label className="mt-1" style={{ fontSize: '87.5%' }}>Carousel Image(s): </label>
            <p className="text-secondary" style={{ fontSize: "75%" }}>
              (the aspect ratio of your image must be {isMobile ? "4:3" : '3:4'})
            </p>
            <div className="row w-100 mx-0 px-0">
              {carouselArray?.map((image, index) => {
                return (
                  <div key={index} className={`col-md-${isMobile ? "12" : "6"} px-1 mb-2 position-relative`}>
                    <span className="delete-image p-0 btn btn-danger d-flex justify-content-center align-items-center" style={{ width: '20px', aspectRatio: '1', position: 'absolute', top: '-10px', right: '5px', borderRadius: '50px', zIndex: '9999' }} onClick={() => removeCarouselImage(index)}><X color="white" size={10} /></span>
                    <label style={{ border: '2px dashed gray', opacity: '0.75', cursor: 'pointer', aspectRatio }} className="w-100 position-relative overflow-hidden image-label" htmlFor={`image-input-${index}`}>
                      <input onChange={(e) => editCarouselImage(e, index)} type="file"
                        accept="image/png, image/jpeg, image/svg, image/jpg" id={`image-input-${index}`} className="d-none" />
                      <img src={settingImage(image)} className="w-100 h-100" alt="" />
                      <div className="position-absolute w-100 h-100 top-0 left-0 d-flex justify-content-center align-items-center hidden-edit" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <Edit2 size={20} color="white" />
                      </div>
                    </label>
                  </div>
                )
              })}
              {carouselArray?.length < 6 && <div className={`col-md-${isMobile ? "12" : "6"} mb-2 position-relative`}>
                <label style={{ border: '2px dashed gray', cursor: 'pointer', aspectRatio }} className="w-100 d-flex justify-content-center align-items-center" htmlFor={`add-image-input`}>
                  <input onChange={carouselImageAdd} type="file"
                    accept="image/png, image/jpeg, image/svg, image/jpg" id={`add-image-input`} className="d-none" />
                  <PlusCircle color="gray" />
                </label>
              </div>}
            </div>
          </div>
          <div>
            <label className="my-1" style={{ fontSize: '87.5%' }}>Image changes after:</label>
            <div className="d-flex alignitems-center gap-2">
              <input min={1} max={10} className="w-75" type="range" style={{ accentColor: '#fbcd0c' }} name="carousel_interval" value={themes.themeData4?.[`${isMobile ? 'mobile_' : ''}carousel_interval`]} onChange={e => {
                changeThemes(e, 'value')
              }} /><span className="w-25 text-end">{themes.themeData4?.[`${isMobile ? 'mobile_' : ''}carousel_interval`]} s</span>
            </div>
          </div>
        </div>}
      {selectedThemeNo !== 4 && <><label style={{ cursor: 'pointer', fontSize: '87.5%' }} className="w-100 d-flex justify-content-between align-items-center gap-2">
        Keep same settings for {isMobile ? "desktop theme" : "mobile theme"}
      </label>
        <span className="d-flex align-items-center gap-2">
          <span className="d-flex align-items-center gap-1"><input checked={matchSettings?.image_match} style={{ msAccelerator: '#fbcd0c', backgroundColor: '#fbcd0c' }} onChange={e => {
            setMatchSettings({ ...matchSettings, [e.target.name]: true })
          }} className="form-check-input m-0" type="radio" name="image_match" id="image_match_yes" />
            <label className="form-check-label m-0" htmlFor="image_match_yes">Yes</label></span>
          <span className="d-flex align-items-center gap-1"><input checked={!matchSettings?.image_match} style={{ msAccelerator: '#fbcd0c', backgroundColor: '#fbcd0c' }} onChange={e => {
            setMatchSettings({ ...matchSettings, [e.target.name]: false })
          }} className="form-check-input m-0" type="radio" name="image_match" id="image_match_no" />
            <label className="form-check-label m-0" htmlFor="image_match_no">No</label></span>
        </span>
        {!matchSettings?.image_match && <div>
          <button className="primary-btn mt-1" style={{ fontSize: "57.5%" }} onClick={() => {
            setIsMobile(!isMobile)
          }}>Change settings for {isMobile ? "Desktop" : "Mobile"}</button>
        </div>}
      </>
      }
      {selectedThemeNo === 4 &&
        <div className="d-flex justify-content-start">
          <button className="primary-btn mt-1" style={{ fontSize: "57.5%" }} onClick={toggleMobile}>
            Change Images for {isMobile ? "Desktop" : "Mobile"}
          </button>
        </div>
      }
    </div>
  )
}

export default ImageEditSection