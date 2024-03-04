import React from 'react'
import { Card, CardBody } from 'reactstrap'
// import superleadz_logo from "../../SuperLeadz/Intro/superleadz_logo.jpg"
// import superleadzBg from "../../SuperLeadz/Intro/superleadzBg.png"
// import superleadzBg2 from "../../SuperLeadz/Intro/superleadzBg2.png"

const IntroWrapper = ({ children }) => {
    // const currLocation = window.location.pathname
    return (
        <div className="first_flow h-100 popup-cust">
            <Card className="d-flex flex-row border-0" style={{ minHeight: 'calc((1.6rem + 4.45rem + 1.3rem) - 100vh)', margin: "0px", backgroundSize: "100%", backgroundPositionY: "center", backgroundPositionX: "start" }}>
                <CardBody className="p-0">
                    <div className="d-flex align-items-center justify-content-start" style={{ gap: '75px' }}>
                        {/* {currLocation.includes("intro") && <img src={superleadz_logo} style={{visibility: "hidden"}} width={"400px"} alt="" />} */}

                        <div className="d-flex justify-content-center align-items-start bg-white h-100" style={{ width: '100%', borderRadius: '1rem', position: 'relative' }}>
                            {/* <img className="position-absolute" style={{zIndex: '0', filter: 'drop-shadow(0px 10px 15px rgba(0,0,0,0.5))', rotate: '180deg'}} width={"145%"} src={cloudbg} alt="" /> */}
                            {children}
                        </div>

                    </div>
                </CardBody>
            </Card>

        </div>
    )
}

export default IntroWrapper