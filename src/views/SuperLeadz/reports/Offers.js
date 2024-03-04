import React, { useContext, useEffect, useState } from 'react'
import { Row } from 'reactstrap'
import CardCom from '../../Components/SuperLeadz/CardCom'
import Spinner from '../../Components/DataTable/Spinner'
import { getCurrentOutlet } from '../../Validator'
import { baseURL } from '../../../assets/auth/jwtService'
import { PermissionProvider } from '../../../Helper/Context'

const Offers = () => {
    const { userPermission } = useContext(PermissionProvider)
    const [offerData, setOfferData] = useState({
        activeOffers: "",
        redemption: "",
        revenue: "",
        isOfferData: false
    })

    const outletData = getCurrentOutlet()

    const getData = () => {
        const form_data = new FormData()
        form_data.append("shop", outletData[0]?.web_url)
        form_data.append("app_name", "superleadz")

        fetch(`${baseURL}/api/v1/superleadz_performance/`, {
            method: "POST",
            body: form_data
        })
        .then((data) => data.json())
        .then((resp) => {
            console.log(resp, "pppp")
            const updateData = {
                activeOffers: resp?.active_offers,
                redemption: resp?.redemptions,
                revenue: resp?.revenue,
                isOfferData: true
            }

            setOfferData((preData) => ({
                ...preData,
                ...updateData
            }))
        })
        .catch((error) => {
            console.log(error)
            const updateData = {
                activeOffers: "",
                redemption: "",
                revenue: "",
                isOfferData: true
            }

            setOfferData((preData) => ({
                ...preData,
                ...updateData
            }))
        })

    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <Row>    
                <div className="col-4">
                    <CardCom
                        icon={<img src="https://cdn-icons-png.flaticon.com/512/1773/1773345.png" width="25px" />}
                        title="Total Revenue"
                        data={offerData?.isOfferData ? `${userPermission?.currencySymbol}${offerData?.revenue}` : <Spinner size={'25px'} />}
                        info={`Total earnings`}
                    />
                </div>
                <div className="col-4">
                    <CardCom
                        icon={<img src="https://cdn-icons-png.flaticon.com/512/2864/2864787.png" width="25px" />}
                        title="Total Redemption"
                        data={offerData?.isOfferData ? offerData?.redemption : <Spinner size={'25px'} />}
                        info={`Total leads who redeemed their discount`}
                    />
                </div>
                <div className="col-4">
                    <CardCom
                        icon={<img src="https://cdn-icons-png.flaticon.com/512/563/563491.png" width="25px" />}
                        title="Active Offers"
                        data={offerData?.isOfferData ? offerData?.activeOffers : <Spinner size={'25px'} />}
                        info={`All offers active on your dashboard`}
                    />
                </div>
            </Row>
        </>
    )
}

export default Offers