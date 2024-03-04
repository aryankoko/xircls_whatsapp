import React, { useEffect, useState } from 'react'
import { getReq } from '../../../assets/auth/jwtService'
import { FaDotCircle } from "react-icons/fa"
import Spinner from '../../Components/DataTable/Spinner'

const ReportsFeed = () => {

    const [reportData, setReportData] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const getData = () => {
        getReq('reportFeed1')
        .then((resp) => {
            console.log(resp)
            setReportData(resp.data.data)
            setIsLoading(false)
        })
        .catch((error) => {
            console.log(error)
            setIsLoading(false)
        })
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <div className='abc py-1'>
                {
                    isLoading ? <div className='d-flex justify-content-center align-items-center'>
                        <Spinner size='40px' />
                    </div> : <>

                        {
                            reportData?.newsfeed1?.is_data === 0 ? '' : <>
                                <h5 className='mx-1 cursor-pointer entered'><FaDotCircle size={11}/>  Your collaborations are helping you precisely reach your ideal audience.</h5>
                                <p className='mx-1'>{reportData?.newsfeed1?.delivered_count ? reportData?.newsfeed1?.delivered_count : 0} customers of partner merchants received your marketing offer/s. {reportData?.newsfeed1?.clicked_count ? reportData?.newsfeed1?.clicked_count : 0} of them interacted with you.</p>
                                <hr className='mx-1'/>
                            </>
                        }

                        {
                            reportData?.newsfeed2?.is_data === 0 ? '' : <>
                                <h5 className='mx-1 cursor-pointer entered'><FaDotCircle size={11}/> Your customers love being rewarded!</h5>
                                <p className='mx-1'>You rewarded {reportData?.newsfeed2?.delivered_count ? reportData?.newsfeed2?.delivered_count : 0} customers for buying from you today. {reportData?.newsfeed2?.clicked_count ? reportData?.newsfeed2?.clicked_count : 0} of them engaged with the reward email they received.</p>
                                <hr className='mx-1'/>
                            </>
                        }

                        {
                            reportData?.newsfeed4?.is_data === 0 ? '' : <>
                                <h5 className='mx-1 cursor-pointer entered'><FaDotCircle size={11}/> Ka-ching!</h5>
                                <p className='mx-1'>You earned {reportData?.newsfeed4?.todayrevenueearned ? reportData?.newsfeed4?.todayrevenueearned : 0} today through XIRCLS. Boost your revenue with more XIRCLS products. Explore now!</p>
                                <hr className='mx-1'/>
                            </> 
                        }
                        
                        {
                            reportData?.newsfeed5?.is_data === 0 ? '' : <>
                                <h5 className='mx-1 cursor-pointer entered'><FaDotCircle size={11}/> {reportData?.newsfeed5?.top_outlet ? reportData?.newsfeed5?.top_outlet : '--'} customers seem to be into you!</h5>
                                <p className='mx-1'>{reportData?.newsfeed5?.click_count ? reportData?.newsfeed5?.click_count : 0} {reportData?.newsfeed5?.top_outlet ? reportData?.newsfeed5?.top_outlet : '--'} customers clicked on your offer today / became your customers today. </p>
                                <hr className='mx-1'/>
                            </> 
                        }
                        
                        {/* // <h5 className='mx-1 cursor-pointer entered'><FaDotCircle size={11}/> Your partnership with The Pink Box looks promising.</h5>
                        // <p className='mx-1'>You acquired 10 brand-new customers today and 2 of them are customers of The Pink Box.</p>
                        // <hr className='mx-1'/> */}
                        
                        {
                            reportData?.newsfeed6?.is_data === 0 ? '' : <>
                                <h5 className='mx-1 cursor-pointer entered'><FaDotCircle size={11}/> {reportData?.newsfeed6?.last_outlet ? reportData?.newsfeed6?.last_outlet : '--'} customers aren't responding to your offer.</h5>
                                <p className='mx-1'>Even though {reportData?.newsfeed6?.click_count ? reportData?.newsfeed6?.click_count : 0} of them clicked on your offer, 0 ended up redeeming it. </p>
                                <hr className='mx-1'/>
                            </> 
                        }

                        {
                            reportData?.newsfeed7?.is_data === 0 ? '' : <>
                                <h5 className='mx-1 cursor-pointer entered'><FaDotCircle size={11}/> Your customers love {reportData?.newsfeed7?.outlet_name ? reportData?.newsfeed7?.outlet_name : '--'}!</h5>
                                <p className='mx-1'>{reportData?.newsfeed7?.percentage ? reportData?.newsfeed7?.percentage : 0}% of your customers have shown interest in {reportData?.newsfeed7?.outlet_name ? reportData?.newsfeed7?.outlet_name : '--'} offers and {reportData?.newsfeed7?.redeemed} of them have redeemed it. We recommend these XIRCLS products to deepen your partnership with this brand. </p>
                                <hr className='mx-1'/>
                            </> 
                        }
                        
                        {/* <h5 className='mx-1 cursor-pointer entered'><FaDotCircle size={11}/> You're popular with customers of "category" products!</h5>
                        <p className='mx-1'>29% of customers in this category have shown interest in you, and 10% of them have become your customers. Explore more partnerships in this category. </p>
                        <hr className='mx-1'/> */}
                        
                        {
                            reportData?.newsfeed8?.message !== "false" ? <>
                                <h5 className='mx-1 cursor-pointer entered'><FaDotCircle size={11}/> Wallet balance is low!</h5>
                                <p className='mx-1'>Renew/upgrade your plan before your campaign stops. </p> 
                            </> : ''
                        }
                    </>
                }
                
                
            </div>
        </>
    )
}

export default ReportsFeed