import React from "react"
import Footer from "./base/Footer"
import sl from "./base/assets/ProductSuperleads/Hero.png"
import card2 from "./base/assets/ProductSuperleads/Intro.png"
import card4 from './base/assets/ProductSuperleads/Campaign.png'
import card5 from './base/assets/ProductSuperleads/card5.png'
import card6 from './base/assets/ProductSuperleads/card6.png'
import card7 from './base/assets/ProductSuperleads/card7.png'

export default function ProductSuperleads() {
  const cardImageStyle = {
    width: '100%',
    height: 'auto',
    maxWidth: '100%',
    filter: "drop-shadow(0 0 10px rgba(0, 0, 0, 0.5))"
  }

  return (
    <>
      <div>
        <div className="row">
          <div className="col">
            <div className="card" style={{ position: 'relative' }}>
              <img src={sl} alt="abc" style={cardImageStyle} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="card" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img src={card4} style={{ width: '85%'}} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="card">
              <img src={card2} style={{ height: '480px', width: '100%', ...cardImageStyle }} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="card" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img src={card5} style={{width: '75%',  filter: "drop-shadow(0 0 10px rgba(0, 0, 0, 0.5))"  }} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="card" style={{ display: 'flex'}}>
              <img src={card6} style={{ height: '40rem', width: '80%', ...cardImageStyle }} />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
            <img src={card7} style={{ height: '450px', width: '100%' }} />
        </div>
      </div>
      <Footer />
    </>
  )
}
