import React, { useState, useContext } from 'react'
import theme3 from './theme3.png'
import theme4 from './theme4.png'
import { ChevronUp, ChevronDown, X } from 'react-feather'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { ThemesProvider } from '../../../Helper/Context'

const ThemeSelection = ({ setActiveListBtn, themeName, setThemeName, setIsEdit, setIsMobile, openNameModal, nameModal }) => {
    const imageArray = [{ image: theme3, themeNumber: 3 }, { image: theme4, themeNumber: 4 }]

    const { setThemes, defaultThemeData, setSelectedThemeNo, selectedThemeNo } = useContext(ThemesProvider)

    const [error, setError] = useState(false)

    // useEffect(() => {
    //     setSelectedThemeNo(scroll + 3)
    // }, [scroll])
    return (
        <>
            {/* <div className="p-5"></div> */}
            <div className="d-flex flex-column justify-content-between align-items-center h-100">
                <div className='d-flex align-items-start justify-content-center flex-grow-1' style={{ position: 'relative', aspectRatio: "1193/520" }}>
                    {/* <div className="position-absolute rounded-3" style={{zIndex: '-1', width: '75%', aspectRatio: '16/9', boxShadow: '0px 0px 17.5px #fbcd0c'}}>
                    </div> */}
                    {/* <div style={{ height: '61vh', zIndex: '2' }} className=" overflow-hidden flex-grow-1 position-relative">
                        <div style={{ transform: `translateY(-${scroll * 61}vh)`, transition: '0.5s ease' }}> */}
                    <div className="container-fluid">
                        <div className="row align-items-center">
                            {imageArray.map((img, key) => {
                                return (
                                    <div className="col-6">
                                        <div key={key} className="d-flex justify-content-center align-items-center py-1">
                                            <img
                                                onDoubleClick={() => {
                                                    setSelectedThemeNo(img.themeNumber)
                                                    setActiveListBtn("edit")
                                                }}
                                                onClick={() => {
                                                    setSelectedThemeNo(img.themeNumber)
                                                }} src={img.image} style={{ filter: `drop-shadow(0px 5px 5px ${selectedThemeNo === img.themeNumber ? "rgba(0, 0, 0, 1)" : "rgba(0, 0, 0, 0.175)"})`, cursor: 'pointer', opacity: selectedThemeNo === img.themeNumber ? "1" : "0.175", transition: '0.25s ease' }} width="75%" />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    {/* </div>
                    </div> */}
                    {/* <span className="d-flex flex-column gap-5 px-2" style={{ position: 'absolute', right: '0px', zIndex: '3' }}>
                        <span style={{ cursor: 'pointer', opacity: scroll === 0 ? 0.5 : 1 }} onClick={() => {
                            // setScroll(scroll === 0 ? 0 : scroll - 1)
                            setSelectedThemeNo(selectedThemeNo === 3 ? 3 : selectedThemeNo - 1)
                        }}><ChevronUp size={35} /></span>
                        <span style={{ cursor: 'pointer', opacity: scroll > (imageArray.length - 2) ? 0.5 : 1 }} onClick={() => {
                            // setScroll(scroll >= (imageArray.length - 1) ? imageArray.length - 1 : scroll + 1)
                            setSelectedThemeNo((selectedThemeNo - 3) >= (imageArray.length - 1) ? (selectedThemeNo - imageArray.length - 1) : selectedThemeNo + 1)
                        }}><ChevronDown size={35} /></span>
                    </span> */}
                </div>
                {/* <div className="text-end p-4"> */}
                <div className='d-flex align-items-center justify-content-end w-100 p-1'>
                    <button onClick={() => {
                        setActiveListBtn("edit")
                    }} type="button" className="primary-btn">Edit Theme</button>
                </div>
            </div>
            {/* </div> */}
            <Modal isOpen={nameModal} toggle={openNameModal} className='popup-cust'>
                <ModalBody className='position-relative'>
                    <span className='p-2 position-absolute' onClick={openNameModal} style={{ top: '0px', right: '0px', cursor: 'pointer' }}><X size={15} /></span>
                    <label htmlFor="theme-name" className='mb-3'>Give your Pop-up a unique name!</label><input value={themeName} onChange={e => {
                        setThemeName(e.target.value)
                        setError(false)
                    }} onKeyDown={e => {
                        if (e.key === "Enter") {
                            if (themeName === '') {
                                setError(true)
                            } else {
                                setIsEdit(false)
                                console.log("onKeyDown nameModal")
                                setThemes({ ...defaultThemeData })
                                setIsMobile(false)
                            }
                        }
                    }} className='w-100 form-control mb-3' type="text" id="theme-name" />
                    {error && <div className="text-danger mb-3">*this field cannot be empty</div>}
                    <div className='d-flex gap-2 align-items-center justify-content-end'>
                        <button className='btn text-white' style={{ backgroundColor: '#fbcd0c' }} onClick={() => {
                            if (themeName === '') {
                                setError(true)
                            } else {
                                setIsEdit(false)
                                console.log("onClick nameModal")
                                setThemes({ ...defaultThemeData })
                                setIsMobile(false)
                            }
                        }}>
                            Save
                        </button>
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}

export default ThemeSelection