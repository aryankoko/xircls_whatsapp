import React, { useContext } from 'react'
import { ThemesProvider } from '../../../../Helper/Context'

const CustomEditSection = ({ changeValue}) => {

    const {themes, setThemes, selectedThemeNo} = useContext(ThemesProvider)

    const loadType = themes?.[`themeData${selectedThemeNo}`]?.[`pop_up_load_type`]

    const updateThemes = (e) => {
        console.log("updateThemes")
        setThemes({...themes, [`themeData${selectedThemeNo}`] : {...themes[`themeData${selectedThemeNo}`], pop_up_load_type: e.target.name, pop_up_load_value: 0}})
    }

    return (
        <div className="row p-1">
            <div className="col-12 mb-2 d-none">
                <h5 className="border-bottom">Visitor Type</h5>
                <div className="visitor-settings-radio">
                    <div className='py-1'>
                        <input 
                        // checked={themes[`themeData${selectedThemeNo}`][`${isMobile ? 'mobile_' : ''}visitor_settings`] === "ALL"} onChange={e => {
                        //     changeValue(e, 'value')
                        // }} 
                        style={{ accentColor: 'rgb(0, 128, 96)' }} type="radio" id="ALL" name="visitor_settings" value="ALL" />
                        <label htmlFor="ALL" className="ms-2">All visitors</label>
                    </div>
                    <div className='py-1'>
                        <input 
                        // checked={themes[`themeData${selectedThemeNo}`][`${isMobile ? 'mobile_' : ''}visitor_settings`] === "FIRST_VISITORS"} onChange={e => {
                        //     changeValue(e, 'value')
                        // }} 
                        style={{ accentColor: 'rgb(0, 128, 96)' }} type="radio" id="FIRST_VISITORS" name="visitor_settings" value="FIRST_VISITORS" />
                        <label htmlFor="FIRST_VISITORS" className="ms-2">First Time Visitors</label>
                    </div>
                    <div className='py-1'>
                        <input 
                        // checked={themes[`themeData${selectedThemeNo}`][`${isMobile ? 'mobile_' : ''}visitor_settings`] === "REGISTERED_USERS"} onChange={e => {
                        //     changeValue(e, 'value')
                        // }} 
                        style={{ accentColor: 'rgb(0, 128, 96)' }} type="radio" id="REGISTERED_USERS" name="visitor_settings" value="REGISTERED_USERS" />
                        <label htmlFor="REGISTERED_USERS" className="ms-2">Registered User</label>
                    </div>
                    {/* <div className='py-1'>
                    <input checked={visitorType === "users"} onChange={e => {
                        setVisitorType(e.target.value)
                    }} style={{accentColor: 'rgb(0, 128, 96)'}} type="radio" id="users" name="visitor_type" value="users" />
                    <label htmlFor="users" className="ms-2">Customers</label>
                </div> */}
                </div>
            </div>
            <div className="col-12">
                <div className="visitor-settings-radio">
                    <div className=''>
                        {/* <input 
                        onChange={(e) => {
                            changeValue(e, 'value')
                        }} checked={themes?.[`themeData${selectedThemeNo}`]?.[`pop_up_load_type`] === "scroll"} 
                        style={{ accentColor: 'rgb(0, 128, 96)' }} type="radio" id="scroll" name="pop_up_load_type" value="scroll" /> */}
                        <button type='button' onClick={updateThemes} style={{border: 'none', outline: 'none', boxShadow: 'none', fontSize: '87.5%'}} name="scroll" className={`btn w-100 default-btn btn-active-${loadType === 'scroll' ? '0' : loadType === "delay" ? "1" : ""}`}>Scroll</button>
                    </div>
                    <div className=''>
                        {/* <input 
                        onChange={(e) => {
                            changeValue(e, 'value')
                        }} ked={themes?.[`themeData${selectedThemeNo}`]?.[`pop_up_load_type`] === "delay"} 
                        style={{ accentColor: 'rgb(0, 128, 96)' }} type="radio" id="delay" name="pop_up_load_type" value="delay" /> */}
                        <button type='button' onClick={updateThemes} style={{border: 'none', outline: 'none', boxShadow: 'none', fontSize: '87.5%'}} name="delay" className={`btn w-100`}>Delay</button>
                    </div>
                </div>
                {themes?.[`themeData${selectedThemeNo}`]?.[`pop_up_load_type`] !== '' && <div className="d-flex align-items-center gap-2 py-1">
                    <input 
                    className="w-100" 
                    step={themes?.[`themeData${selectedThemeNo}`]?.[`pop_up_load_type`] === "delay" ? 5 : 10} 
                    style={{ accentColor: '#fbcd0c', backgroundColor: 'white' }} 
                    type="range" 
                    value={themes?.[`themeData${selectedThemeNo}`]?.[`pop_up_load_value`]} 
                    onChange={(e) => {
                        changeValue(e, 'value')
                    }} 
                    max={themes?.[`themeData${selectedThemeNo}`]?.[`pop_up_load_type`] === "delay" ? "300" : "100"} 
                    min={"0"} name='pop_up_load_value' /> <span style={{fontSize: '85%'}}>{themes?.[`themeData${selectedThemeNo}`]?.[`pop_up_load_value`]}{themes?.[`themeData${selectedThemeNo}`]?.[`pop_up_load_type`] === "delay" ? 's' : '%'}</span>
                </div>}
            </div>
        </div>
    )
}

export default CustomEditSection