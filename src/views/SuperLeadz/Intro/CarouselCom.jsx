import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Edit2 } from 'react-feather'
import ModalCustomization from './ModalCustomization'
import { SuperLeadzLinkValidation, ThemesProvider } from '../../../Helper/Context'
// import theme3 from "../Customization/theme3.png"
// import theme4 from "../Customization/theme4.png"
import JsonToJsx from '../../Components/SuperLeadz/JsonToJsx'

const CarouselCom = ({ setThemeNumber, btn_height, custModal, allThemes }) => {
    const navigate = useNavigate()

    const {validateLink, selectedCustThemeId, setSelectedCustThemeId } = useContext(ThemesProvider)
    const {setValidateLink} = useContext(SuperLeadzLinkValidation)
    return (
        <>
            <style>
                {`
                    .custom-height {
                        overflow-y: scroll;
                        height: calc(55vh - ${btn_height}px)
                    }

                    .active_theme {
                        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
                    }
                `}
            </style>
            {!custModal && <div className="row scroll-custom" style={{ overflowY: 'scroll' }}>
                {/* <div className="parent d-flex align-items-center justify-content-between">
                    <div>
                        <label style={{ margin: '1rem 0px 10px 0px', fontSize: "16px" }}> <b>{text}</b></label>
                        <p>*You can customize your theme later</p>
                    </div>
                    <button onClick={toggleModal} className="primary-btn">Customize</button>
                </div> */}
                <div className='xircls_carousel' style={{ height: "60vh" }}>
                    <div id="carouselExample" className="carousel slide">
                        <div className="carousel-inner py-3 overflow-hidden" >
                            <div className="carousel-item active">
                                <div className="row " style={{ height: "70x0px", overflowY: "scroll" }}>
                                    {/* <div className="col-6 position-relative">
                                        {selectedThemeNo === 3 && <span className='px-5' style={{ position: 'absolute', top: "0px", right: "0px", zIndex: '999', cursor: "pointer" }} onClick={() => {
                                            toggleModal()
                                        }}><Edit2 color='#fbcd0c' size={15} /></span>}
                                        <div className="theme_box" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} >
                                            <input type="radio" className="xircls_theme_radio unique_theme1" name="xircls_themes" id="xircls_theme_three" defaultValue="theme3" checked={selectedThemeNo === 3} onChange={() => {
                                                setSelectedThemeNo(3)
                                                setThemeNumber('theme3')
                                            }} />
                                            <label className="d-flex justify-content-center align-items-center theme_box xircls_theme_label position-relative" htmlFor="xircls_theme_three">
                                                <img onDoubleClick={() => {
                                                    setSelectedThemeNo(3)
                                                    toggleModal()
                                                }} src={theme3} alt="theme1" width="55%" style={{ scale: "1.25", filter: `drop-shadow(0px 0px 20px ${selectedThemeNo === 3 ? "rgba(0, 0, 0, 1))" : "rgba(0, 0, 0, 0.175)"}`, transition: '0.25s ease' }} />
                                            </label>

                                        </div>
                                    </div> */}

                                    {/* <div className="col-6 position-relative">
                                        {selectedThemeNo === 4 && <span className='px-5' style={{ position: 'absolute', top: "0px", right: "0px", zIndex: '999', cursor: "pointer" }} onClick={() => {
                                            toggleModal()
                                        }}><Edit2 color='#fbcd0c' size={15} /></span>}
                                        <div className="theme_box" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} >
                                            <input type="radio" className="xircls_theme_radio unique_theme1" name="xircls_themes" id="xircls_theme_four" defaultValue="theme4" checked={selectedThemeNo === 4} onChange={(e) => {
                                                console.log(e.target.checked)
                                                setSelectedThemeNo(4)
                                                setThemeNumber('theme4')
                                            }} />
                                            <label className="d-flex justify-content-center align-items-center position-relative" htmlFor="xircls_theme_four" style={{ height: `100%` }}>
                                                <img onDoubleClick={() => {
                                                    setSelectedThemeNo(4)
                                                    toggleModal()
                                                }} src={theme4} alt="theme1" width="55%" style={{ scale: "1.25", transition: '0.25s ease' }} />
                                            </label>

                                        </div>
                                    </div> */}

                                    {
                                        allThemes.map((theme) => (
                                            <div key={theme.theme_id} className={`col-md-6 col-12 position-relative px-1 py-1`} >
                                                <div className={`rounded-3 ${selectedCustThemeId === theme.theme_id ? 'border border-black border-1' : ''}`} onClick={() => {
                                                    setSelectedCustThemeId(theme.theme_id)
                                                    setValidateLink({...validateLink, editTheme: true})
                                                    setThemeNumber(theme.theme_name)
                                                }}>

                                                    <div className='d-flex justify-content-center align-items-center mx-1 mt-1 ' style={{ background: "#f2f2f2", height: "400px" }}>
                                                        <JsonToJsx renderObj={theme.object} isMobile={false} scale={0.8} />
                                                    </div>

                                                    <div className='d-flex justify-content-between align-items-center py-1 px-2 '>
                                                        <div className=' d-flex justify-content-center gap-1 '>
                                                            <h3>{theme.theme_name}</h3>

                                                            <button onClick={() => {
                                                                // setSelectedThemeNo(theme.theme_id)
                                                                setSelectedCustThemeId(theme.theme_id)
                                                                setValidateLink({...validateLink, editTheme: true})
                                                                setThemeNumber(theme.theme_name)
                                                                // toggleModal()
                                                                navigate("/merchant/SuperLeadz/quick_setup/")
                                                            }} className='btn align-self-start p-0'>
                                                                <Edit2 color='#000' size={15} />
                                                            </button>
                                                        </div>

                                                        <button onClick={() => {
                                                            // setSelectedThemeNo(theme.theme_id)
                                                            setSelectedCustThemeId(theme.theme_id)
                                                            setValidateLink({...validateLink, editTheme: true})
                                                            setThemeNumber(theme.theme_name)
                                                            // toggleModal()
                                                            navigate("/merchant/SuperLeadz/quick_setup/")
                                                        }} className='btn btn-outline-secondary'>
                                                            Use Template
                                                        </button>

                                                    </div>

                                                </div>

                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        {/* <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <ChevronLeft size={30} />
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <ChevronRight size={30} />
                    <span className="visually-hidden">Next</span>
                </button> */}
                    </div>
                </div>
            </div>}

            {custModal && <ModalCustomization />}
            {/* <Modal style={{minWidth: '95vw'}} isOpen={custModal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>
                    <h2 style={{fontSize: '1.25rem'}}>Customization</h2>
                </ModalHeader>
                <ModalBody>
                    <ModalCustomization />
                </ModalBody>
                <ModalFooter className='d-flex justify-content-end align-items-center gap-3'>
                    <button onClick={toggleModal} className='primary-btn-outline'>Cancel</button>
                    <button className='primary-btn'>Save</button>
                </ModalFooter>
            </Modal> */}
        </>
    )
}

export default CarouselCom