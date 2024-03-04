import React from 'react'
import { Circle } from 'react-feather'

const PricingCard = ({ data, id, title, price, planTitle, selectedPlan, setSelectedPlan, btnCondition, callPlans, popular, features }) => {
    return (
        <div className="col-lg-3 col-md-6">
            <div className={`card position-relative cursor-pointer ${selectedPlan === planTitle ? 'border-primary' : ''}`} onClick={() => setSelectedPlan(planTitle)} style={{ border: '1px solid #dddde0', backgroundColor:"#fff" }}>
                {popular ? (<span className="badge" style={{ position: 'absolute', top: '15px', right: '15px', backgroundColor: 'transparent', border: '1px solid #464646', color: "#464646" }}>Popular</span>) : ""}

                <div className="card-body pt-2 pb-2">
                    <div className="image" style={{ padding: '24px' }}>
                        {/* <img width="140px" style={{ marginBottom: '20px' }} height="140px" src={imgSrc} alt="" /> */}
                        <h4>{title}</h4>
                        {/* <p className="m-0" style={{ fontSize: '15px' }}>Great for starting out</p> */}
                    </div>

                    <div className="pricing" style={{ padding: '0px 24px 24px' }}>
                        <h4 style={{ fontSize: '3rem', lineHeight: '1' }} className="position-relative d-inline">
                            <sup className="text-dark" style={{ position: 'absolute', top: '8px', left: '-10px', fontSize: '.8125rem' }}>$</sup>
                            {price}
                        </h4>
                        <sup className="text-dark mb-0" style={{ fontSize: '.8125rem', marginLeft: '5px' }}>/month</sup>
                    </div>

                    <hr />

                    <div className="points" style={{ padding: '0px 24px 24px' }}>
                        {
                            features?.map((ele, index) => (
                                <div key={index} className="point d-flex justify-content-start align-items-center" style={{ gap: "8px", marginBottom: '12px' }}>
                                    <Circle size={8} fill="#464646" stroke="#464646" />
                                    <p className="m-0" style={{ fontSize: '', textAlign: "left" }}>{ele}</p>
                                </div>
                            ))
                        }

                    </div>
                    <div className="action">
                        {
                            btnCondition ? (
                                <a className={`btn ${selectedPlan === planTitle ? 'bg-primary text-white' : 'btn btn-outline-primary'} w-100 btn-block`} onClick={() => callPlans(id, data)}>Buy Now</a>
                            ) : (
                                <a className="btn bg-light-secondary w-100 text-primary btn-block">Buy Now</a>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PricingCard