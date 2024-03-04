import React from 'react'
import { ArrowRight, Heart, Send } from "react-feather"
import { useNavigate } from 'react-router-dom'
import cloud from "./cloud.png"
import { Card, CardBody } from "reactstrap"
import IntroWrapper from  "../../Components/SuperLeadz/IntroWrapper"


export default function Intro() {
    const navigate = useNavigate()


    // const fetch = useAuthenticatedFetch()


    // useEffect(() => {
    //     fetch(`/api/shop/data`)
    //         .then((resp) => resp.json())
    //         .then((data) => {
    //              console.log(data.data[0].domain)
    //              localStorage.setItem("shop", data.data[0].domain)
    //              console.log(data[0])
    //         })
    //     const charge_id = new URLSearchParams(location.search).get("charge_id")
    //     fetch("/api/billing/confirm", {
    //         method: "POST",
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ "charge_id": charge_id })
    //     })
    //         .then((response) => response.json())
    //         .then((data) => console.log(data))
    //     setExtraParams(window.location.search)
    //     window.sessionStorage.setItem("charge_id", charge_id)

    // }, [])

    return (
        <IntroWrapper>
            <div className="card-body my-0" style={{ position: 'relative', zIndex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'between', minHeight: '85vh' }}>
                <div className="flex-grow-1">
                    <div className="heading ms-3" style={{ marginBottom: "1.75rem" }}>
                        <h2 className="text-start" style={{ fontSize: '2rem', color: "black" }}> <b>Make lead conversion your superpower!</b> </h2>
                        <h3 style={{ fontSize: '1.5rem',  color: "black" }}>Incentivize purchases without disrupting the buying experience.</h3>
                    </div>
                    <div className="step">
                        <div className="icon_here"><img src={cloud} width={'50px'} style={{ filter: 'drop-shadow(0px 0px 5px rgba(0,0,0,0.5))' }} /></div>
                        <h5 style={{ fontSize: '17.5px', color: 'black' }} className="">Capture lead data within seconds, reduce drop-offs.</h5>
                    </div>
                    <div className="step">
                        <div className="icon_here"><img src={cloud} width={'50px'} style={{ filter: 'drop-shadow(0px 0px 5px rgba(0,0,0,0.5))' }} /></div>
                        <h5 style={{ fontSize: '17.5px', color: 'black' }} className="">Build a verified email database of sales-qualified leads.</h5>
                    </div>
                    <div className="step">
                        <div className="icon_here"><img src={cloud} width={'50px'} style={{ filter: 'drop-shadow(0px 0px 5px rgba(0,0,0,0.5))' }} /></div>
                        <h5 style={{ fontSize: '17.5px', color: 'black' }} className="">Personalize pop-ups for first time & returning shoppers.</h5>
                    </div>
                    <div className="step">
                        <div className="icon_here"><img src={cloud} width={'50px'} style={{ filter: 'drop-shadow(0px 0px 5px rgba(0,0,0,0.5))' }} /></div>
                        <h5 style={{ fontSize: '17.5px', color: 'black' }} className="">Enable one-click offer redemptions. No codes to copy-paste!</h5>
                    </div>
                </div>
                <div className="button_div" style={{ marginTop: "3rem", display: "flex", justifyContent: "end" }}>
                    <button className='primary-btn' onClick={() => navigate("/merchant/SuperLeadz/TheAudience/")}>
                        <div>
                            Get Started  {window.shop}
                            <ArrowRight size={'20px'} />
                        </div>
                    </button>
                </div>
            </div>
        </IntroWrapper>
    )
}