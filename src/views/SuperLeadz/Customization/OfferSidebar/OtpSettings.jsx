import React, { useContext } from 'react'
import { ThemesProvider } from '../../../../Helper/Context'

const OtpSettings = ({ selectedThemeNo }) => {
    const { themes, setThemes } = useContext(ThemesProvider)
    return (
        <div className="row p-1">
            <div className="col-12">
                <div className="form-check form-switch p-0 m-0 d-flex justify-content-start align-items-center gap-1">
                    <label htmlFor="otp_verify" className='form-check-label m-0 p-0' style={{ cursor: 'pointer', fontSize: "85%" }}>Skip user Verification?</label>
                    <input className='form-check-input m-0 p-0' id="otp_verify" type="checkbox" name='otp_settings' onChange={e => {
                        console.log("onChange otp")
                        setThemes({ ...themes, [`themeData${selectedThemeNo}`]: { ...themes?.[`themeData${selectedThemeNo}`], otp_settings: e.target.checked ? 1 : 0 } })
                    }} style={{ border: 'none', outline: 'none', boxShadow: 'none', height: '1.125rem', width: '2rem', cursor: 'pointer' }} />
                </div>
            </div>
        </div>
    )
}

export default OtpSettings