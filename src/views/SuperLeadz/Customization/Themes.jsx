import React, { useContext, useEffect, useState } from 'react'
import { Card, CardBody, Col, Container, Modal, ModalBody, Row } from 'reactstrap'
import { ThemesProvider } from '../../../Helper/Context'
import skeletonBg from "./skeleton.svg"
import { X } from 'react-feather'
import { Link, useNavigate } from 'react-router-dom'
import JsonToJsx from '../../Components/SuperLeadz/JsonToJsx'
import { SuperLeadzBaseURL } from '../../../assets/auth/jwtService'
import { getCurrentOutlet } from '../../Validator'
import axios from 'axios'
import { AiOutlineDesktop, AiOutlineMobile } from 'react-icons/ai'

const Themes = () => {
    const navigate = useNavigate()
    const { setSelectedThemeId, allThemes } = useContext(ThemesProvider)
    const outletData = getCurrentOutlet()
    const [themeLength, setThemeLength] = useState(0)
    const allPreviews = [...allThemes]
    const [contWidth, setContWidth] = useState(600)
    const [phoneView, setPhoneView] = useState(allPreviews.map(() => {
        return false
    }))
    // const allPreviews = [
    //     {
    //         image: theme3,
    //         theme_number: 3,
    //         theme: <Theme1 isMobile={isMobile} themes={defaultThemeData} />
    //     },
    //     {
    //         image: theme4,
    //         theme_number: 4,
    //         theme: <Theme4 isMobile={isMobile} themes={defaultThemeData} />
    //     }
    // ]

    // const [currObj, setCurrObj] = useState(allPreviews[allPreviews.findIndex($ => $.theme_number === selectedThemeNo)])

    // console.log(allPreviews[allPreviews.findIndex($ => $.theme_id === selectedThemeId)].theme_name)

    useEffect(() => {
        const getUrl = new URL(`${SuperLeadzBaseURL}/api/v1/form_builder_template/?shop=${outletData[0]?.web_url}&app=superleadz`)
        axios({
            method: "GET",
            url: getUrl
        }).then((data) => {
            console.log(data)
            setThemeLength(data?.data?.success?.length)
            // setIsLoading(false)
        }).catch((err) => {
            console.log(err)
            // toast.error("Data could not be loaded")
            // setIsLoading(false)
        })

        const innerCard = document.getElementById("themeContainer-0")

        if (Boolean(innerCard)) {
            const resizeObserver = new ResizeObserver(entries => {
                let contentWidth
                for (const entry of entries) {
                    contentWidth = entry.contentRect.width
                }
                setContWidth(contentWidth)
            })
            resizeObserver.observe(innerCard)

            return () => resizeObserver.unobserve(innerCard)
        }
    }, [])

    return (
        <>
            <Container fluid className='px-0'>
                <Row className='match-height'>
                    {allPreviews.map((theme, key) => {
                        return (
                            <Col className='d-flex flex-column align-items-stretch' md={6} key={key}>
                                <Card>
                                    <CardBody>
                                        <div id={`themeContainer-${key}`} style={{ aspectRatio: "16/9" }}>
                                            <div className="d-flex justify-content-center align-items-center rounded position-relative m-auto innerRect" style={{ aspectRatio: phoneView[key] ? '3/4' : '16/9', height: '100%', backgroundSize: "100%", backgroundImage: `url(${skeletonBg})`, backgroundColor: "rgba(0,0,0,0.25)", backgroundBlendMode: "soft-light" }}>
                                                <div className='position-absolute w-100' style={{ scale: `${(((contWidth - 200) * 100) / contWidth) / 100}` }}>
                                                    <JsonToJsx key={key} isMobile={phoneView[key]} renderObj={theme.object} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center gap-2 mt-2">

                                            <h3 className="mt-2 mb-0">{theme.theme_name}</h3>

                                            <button onClick={() => {
                                                setSelectedThemeId(theme.theme_id)
                                                navigate(`/merchant/SuperLeadz/new_customization/?isMobile=${phoneView[key]}`)
                                                localStorage.setItem("defaultThemeId", theme.theme_id)
                                                localStorage.removeItem("defaultTheme")
                                            }} state={{ len: themeLength }} className="btn btn-primary">Use Template</button>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center gap-2 mt-2">
                                            <div className="d-flex">
                                                <button style={{ padding: "0px", width: "30px", aspectRatio: "1" }} onClick={() => {
                                                    const newArr = [...phoneView]
                                                    newArr[key] = false
                                                    setPhoneView(newArr)
                                                }} className={`btn ${phoneView[key] ? "text-dark" : "btn-outline-dark"}`}>
                                                    <AiOutlineDesktop size={"15px"} />
                                                </button>
                                                <button style={{ padding: "0px", width: "30px", aspectRatio: "1" }} onClick={() => {
                                                    const newArr = [...phoneView]
                                                    newArr[key] = true
                                                    setPhoneView(newArr)
                                                }} className={`btn ${!phoneView[key] ? "text-dark" : "btn-outline-dark"}`}>
                                                    <AiOutlineMobile size={"15px"} />
                                                </button>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
            {/* <Modal isOpen={modal} toggle={toggleModal} size='xl'>
                <ModalBody className='position-relative'>
                    <span onClick={toggleModal} style={{ position: "absolute", inset: "0px 0px auto auto", zIndex: "3", padding: "7.5px", cursor: "pointer" }}>
                        <X size={15} />
                    </span>
                    <div className="d-flex align-items-stretch gap-2">
                        <div className="flex-grow-1 d-flex justify-content-center align-items-center p-1 border rounded-3" >
                            <div className='d-flex justify-content-center align-items-center p-1' style={{ aspectRatio: isMobile ? '9/16' : '1193/520', width: isMobile ? '25%' : '100%', backgroundImage: `url(${skeletonBg})`, backgroundSize: "100%", backgroundColor: "rgba(0,0,0,0.25)", backgroundBlendMode: "soft-light" }}>
                                {selectedThemeId !== "" && <JsonToJsx isMobile={isMobile} renderObj={showTheme} />}
                            </div>
                        </div>
                        <div className="d-flex flex-column align-items-stretch justify-content-between">
                            <div>
                                <h4 className="m-0 text-center">
                                    {selectedThemeId === "" ? "No Name" : allPreviews[allPreviews.findIndex($ => $.theme_id === selectedThemeId)].theme_name}
                                </h4>
                                <div className="d-flex mt-2">
                                    <button onClick={() => setIsMobile(false)} className={`btn ${isMobile ? "text-primary" : "btn-primary"}`}>Desktop</button>
                                    <button onClick={() => setIsMobile(true)} className={`btn ${!isMobile ? "text-primary" : "btn-primary"}`}>Mobile</button>
                                </div>
                                <div className="mt-2">
                                    <Link to={"/merchant/SuperLeadz/new_customization/"} state={{ len: themeLength }} className="btn btn-primary w-100">Use Template</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
            </Modal> */}
        </>
    )
}

export default Themes