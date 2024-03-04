import { useState } from 'react'
import Breadcrumb from './Breadcrum'

const Wrapper = () => {

    const [campaignWiseData, setCampaignWiseData] = useState("ppp")

    console.log(campaignWiseData, setCampaignWiseData, "campaignWiseData")

    return (
        <>
            <div className='popup-cust'>
                <div className='mt-1'>
                    <Breadcrumb />
                </div>
                {/* <div className="center_div d-flex justify-content-center align-items-start bg-white h-100" style={{ width: '100%', borderRadius: '1rem', position: 'relative' }}>
                    <img className="position-absolute" style={{zIndex: '0', filter: 'drop-shadow(0px 10px 15px rgba(0,0,0,0.5))', rotate: '180deg'}} width={"145%"} src={cloudbg} alt="" />
                    {children}
                </div> */}
            </div>
        </>
    )
}

export default Wrapper