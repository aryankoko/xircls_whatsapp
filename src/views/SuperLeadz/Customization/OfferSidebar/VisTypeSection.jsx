import React, { useContext } from 'react'
import { ThemesProvider } from '../../../../Helper/Context'

const VisTypeSection = () => {

    const {themes, setThemes, selectedThemeNo} = useContext(ThemesProvider)

    const typeSelected = themes?.[`themeData${selectedThemeNo}`]?.[`visitor_settings`]

    const updateThemes = (e) => {

        console.log("updateThemes")
        setThemes({...themes, [`themeData${selectedThemeNo}`]: {...themes[`themeData${selectedThemeNo}`], visitor_settings: e.target.name}})
    }

    return (
        <div className="row p-1">
            <div className="col-12 mb-2">
                <div className="visitor-settings-radio">
                    <div className='d-flex justify-content-center align-items-center'>
                        {/* <input 
                        checked={themes?.[`themeData${selectedThemeNo}`]?.[`visitor_settings`] === "ALL"} onChange={e => {
                            changeValue(e, 'value')
                        }} 
                        style={{ accentColor: 'rgb(0, 128, 96)' }} type="radio" id="ALL" name="visitor_settings" value="ALL" /> */}
                        <button type='button' name="ALL" className={`btn w-100 default-btn btn-active-${typeSelected === "ALL" ? '0' : typeSelected === "FIRST_VISITORS" ? "1" :  typeSelected === "SECOND_VISITORS" ? "2" : "3"}`} onClick={updateThemes} style={{fontSize: '85%', border: 'none', outline: 'none', boxShadow: 'none' }}>All visitors</button>
                    </div>
                    <div className='d-flex justify-content-center align-items-center'>
                        {/* <input 
                        checked={themes?.[`themeData${selectedThemeNo}`]?.[`visitor_settings`] === "FIRST_VISITORS"} onChange={e => {
                            changeValue(e, 'value')
                        }} 
                        style={{ accentColor: 'rgb(0, 128, 96)' }} type="radio" id="FIRST_VISITORS" name="visitor_settings" value="FIRST_VISITORS" /> */}
                        <button type='button' name="FIRST_VISITORS" className={`btn w-100`} onClick={updateThemes} style={{fontSize: '87.5%', border: 'none', outline: 'none', boxShadow: 'none' }}>First Time Visitors</button>
                    </div>
                    <div className='d-flex justify-content-center align-items-center'>
                        {/* <input 
                        checked={themes?.[`themeData${selectedThemeNo}`]?.[`visitor_settings`] === "SECOND_VISITORS"} onChange={e => {
                            changeValue(e, 'value')
                        }} 
                        style={{ accentColor: 'rgb(0, 128, 96)' }} type="radio" id="SECOND_VISITORS" name="visitor_settings" value="SECOND_VISITORS" /> */}
                        <button type='button' name="SECOND_VISITORS" className={`btn w-100`} onClick={updateThemes} style={{fontSize: '87.5%', border: 'none', outline: 'none', boxShadow: 'none' }}>Returning Visitors</button>
                    </div>
                    <div className='d-flex justify-content-center align-items-center'>
                        {/* <input 
                        checked={themes?.[`themeData${selectedThemeNo}`]?.[`visitor_settings`] === "REGISTERED_USERS"} onChange={e => {
                            changeValue(e, 'value')
                        }} 
                        style={{ accentColor: 'rgb(0, 128, 96)' }} type="radio" id="REGISTERED_USERS" name="visitor_settings" value="REGISTERED_USERS" /> */}
                        <button type='button' name="REGISTERED_USERS" className={`btn w-100`} onClick={updateThemes} style={{fontSize: '87.5%', border: 'none', outline: 'none', boxShadow: 'none' }}>Registered Users</button>
                    </div>
                    {/* <div className='py-1'>
                    <input checked={visitorType === "users"} onChange={e => {
                        setVisitorType(e.target.value)
                    }} style={{accentColor: 'rgb(0, 128, 96)'}} type="radio" id="users" name="visitor_type" value="users" />
                    <label htmlFor="users" className="ms-2">Customers</label>
                </div> */}
                </div>
            </div>
        </div>
    )
}

export default VisTypeSection