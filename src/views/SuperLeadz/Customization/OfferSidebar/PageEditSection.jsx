import React, { useContext } from 'react'

import { PlusCircle, MinusCircle, Trash } from "react-feather"
import { ThemesProvider } from '../../../../Helper/Context'

const PageEditSection = () => {

  const {selectedThemeNo, themes, setThemes} = useContext(ThemesProvider)

  const pages = ['all_pages', 'home_page', 'product_page', 'product_list_page', 'cart_page', 'custom_page']

  const addPage = (e) => {
    const customTheme = { ...themes }
    if (e.target.checked) {
      if (!themes[`themeData${selectedThemeNo}`].PAGES.includes('all_pages')) {
        customTheme[`themeData${selectedThemeNo}`][`PAGES`] = [...customTheme[`themeData${selectedThemeNo}`][`PAGES`], e.target.value]
      }
      if (themes[`themeData${selectedThemeNo}`].PAGES.includes('all_pages')) {
        customTheme[`themeData${selectedThemeNo}`][`PAGES`] = [...customTheme[`themeData${selectedThemeNo}`][`PAGES`].filter(item => item !== 'all_pages'), e.target.value]
      }
      if (e.target.value === "all_pages") {
        customTheme[`themeData${selectedThemeNo}`][`PAGES`] = [...customTheme[`themeData${selectedThemeNo}`][`PAGES`].filter(item => item === e.target.value), e.target.value]
      }
    } else {
        customTheme[`themeData${selectedThemeNo}`][`PAGES`] = customTheme[`themeData${selectedThemeNo}`][`PAGES`].filter(item => item !== e.target.value)
    }
    console.log("addPage")
    setThemes(customTheme)

    console.log(customTheme[`themeData${selectedThemeNo}`][`PAGES`])
  }

  const inputAdd = () => {
    const customTheme = { ...themes }
    customTheme[`themeData${selectedThemeNo}`][`CUSTOM_PAGE_LINK`] = [...customTheme[`themeData${selectedThemeNo}`][`CUSTOM_PAGE_LINK`], ""]
    console.log("inpuAdd")
    setThemes(customTheme)
  }

  const inputChange = (e, i) => {
    const customTheme = { ...themes }
    customTheme[`themeData${selectedThemeNo}`][`CUSTOM_PAGE_LINK`][i] = e.target.value
    console.log("inputChange")
    setThemes(customTheme)
  }

  const inputRemove = (i) => {
    const customTheme = { ...themes }
    customTheme[`themeData${selectedThemeNo}`][`CUSTOM_PAGE_LINK`].splice(i, 1)
    console.log("inputRemove")
    setThemes(customTheme)
  }

  // console.log("pageLocation" , pageLocation)

  return (
    <div className="row p-1 justify-content-center">
      {pages.map((ele, key) => {
        return (
          <div key={key} className="col-md-6 d-flex gap-2 align-items-start">
            <input
              checked={themes?.[`themeData${selectedThemeNo}`]?.PAGES?.includes(ele)}
              className="d-none" value={ele} onChange={addPage} type='checkbox' id={`page-${key}`} name={ele} />
            <label style={{ cursor: 'pointer' }} htmlFor={`page-${key}`} className="mb-2 text-capitalize d-flex flex-column align-items-center w-100 position-relative">
              {/* <div className='p-1 mb-2 rounded-2' style={themes[`themeData${selectedThemeNo}`].PAGES.includes(ele) ? { outline: '2px solid rgb(0, 128, 96)' } : {}}> */}
              <div className="position-relative w-50">
                <img width="100%" style={{ transition: '0.25s ease' }}
                  className={`mb-2 opacity-${themes?.[`themeData${selectedThemeNo}`]?.PAGES?.includes(ele) ? "100" : '25'}`} src={`https://www.demo.xircls.in/static/plugin_other_images/icons/${ele === "custom_page" ? "all_pages" : ele}.png`}
                  alt='no img' />
                <img src="https://cdn-icons-png.flaticon.com/512/8373/8373208.png" className={`position-absolute opacity-${themes?.[`themeData${selectedThemeNo}`]?.PAGES?.includes(ele) ? "100" : '0'}`} style={{top: '-7.5px', right: '-7.5px', transition: '0.25s ease'}} width={'20px'} height={'20px'} alt="" />
              </div>
              <span style={{fontSize: '75%', textAlign: "center"}}>{ele.split("_").map(name => { return `${name} ` })}</span>
            </label>
          </div>
        )
      })}
      <div className="col-12">
        {themes?.[`themeData${selectedThemeNo}`]?.PAGES?.includes('custom_page') && (
          <div className="border p-1 rounded-3">
            <h5 style={{fontSize: '95%'}} className="border-bottom">Your Custom Page URLs</h5>
            {themes?.[`themeData${selectedThemeNo}`]?.CUSTOM_PAGE_LINK?.map((url, key) => {
              return (
                <div className="mb-2 d-flex justify-content between align-items-center w-100 gap-5">
                  <div className="flex-grow-1">
                    <label style={{fontSize: '85%'}} htmlFor="">URL {key + 1}</label>
                    <div className="form-control position-relative overflow-hidden">
                      <input value={url} onChange={e => inputChange(e, key)} type="text" className="w-100" style={{ border: 'none', outline: 'none', boxShadow: 'none', fontSize: '85%' }} />
                      {themes?.[`themeData${selectedThemeNo}`]?.CUSTOM_PAGE_LINK?.length > 1 && (<button className="btn rounded-0" style={{ position: 'absolute', right: '0px', top: '0px', height: '100%' }} onClick={() => inputRemove(key)}>
                        <Trash size={12.5} color='red' />
                      </button>)}
                    </div>
                  </div>
                </div>
              )
            })}
            {themes?.[`themeData${selectedThemeNo}`]?.CUSTOM_PAGE_LINK?.length < 6 && <div className="text-end py-2">
              <button onClick={inputAdd} className='btn btn-success btn-sm'  style={{fontSize: '87.5%'}}>Add URL</button>
            </div>}
          </div>
        )}
      </div>
    </div>
  )
}

export default PageEditSection
