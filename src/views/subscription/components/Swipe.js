import React, {useContext, useEffect} from "react"
import { Pagination, Navigation, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js'
import $ from 'jquery'
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import 'swiper/modules/navigation/navigation.min.css'
import 'swiper/modules/autoplay/autoplay.min.css'
import { Card, CardBody } from 'reactstrap'
import { PermissionProvider } from "../../../Helper/Context"

const Swipe = () => {

    const { userPermission } = useContext(PermissionProvider)

    const cardsDetails = [
        {
            cardId: 'id1',
            feature: 'Infiniti FREE PLAN',
            plancost: `${userPermission?.currencySymbol} 0.00`,
            partners: 'Unlimited',
            acqcost: `${userPermission?.currencySymbol} 0.00`,
            retcost: `${userPermission?.currencySymbol} 0.00`,
            cpclick: `${userPermission?.currencySymbol} 0.00`,
            innxls: '2',
            color: '#3c90df',
            color2: 'rgba(60, 144, 223, 0.25)',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore'
        },
        {
            cardId: 'id2',
            feature: 'Infiniti Lite',
            plancost: `${userPermission?.currencySymbol} 999.00`,
            partners: 'Unlimited',
            acqcost: `${userPermission?.currencySymbol} 0.66`,
            retcost: `${userPermission?.currencySymbol} 0.66`,
            cpclick: `${userPermission?.currencySymbol} 1.00`,
            innxls: '2',
            color: '#82b54b',
            color2: 'rgba(130, 181, 75, 0.25)',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore'
        },
        {
            cardId: 'id3',
            feature: 'Infiniti Grow',
            plancost: `${userPermission?.currencySymbol} 1,499.00`,
            partners: 'Unlimited',
            acqcost: `${userPermission?.currencySymbol} 0.66`,
            retcost: `${userPermission?.currencySymbol} 0.66`,
            cpclick: `${userPermission?.currencySymbol} 1.00`,
            innxls: '3',
            color: '#e04f1a',
            color2: 'rgba(224, 79, 26, 0.25)',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore'

        },
        {
            cardId: 'id4',
            feature: 'Infiniti Grow Plus',
            plancost: `${userPermission?.currencySymbol} 2,499.00`,
            partners: 'Unlimited',
            acqcost: `${userPermission?.currencySymbol} 0.66`,
            retcost: `${userPermission?.currencySymbol} 0.66`,
            cpclick: `${userPermission?.currencySymbol} 1.00`,
            innxls: '5',
            color: '#2345ed',
            color2: 'rgba(35, 69, 237, 0.25)',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore'
        },
        {
            cardId: 'id5',
            feature: 'Infiniti Pro',
            plancost: `${userPermission?.currencySymbol} 4,999.00`,
            partners: 'Unlimited',
            acqcost: `${userPermission?.currencySymbol} 0.66`,
            retcost: `${userPermission?.currencySymbol} 0.66`,
            cpclick: `${userPermission?.currencySymbol} 1.00`,
            innxls: '5',
            color: '#8f34eb',
            color2: 'rgba(143, 52, 235, 0.25)',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore'
        },
        {
            cardId: 'id6',
            feature: 'Infiniti Pro Plus',
            plancost: `${userPermission?.currencySymbol} 9,999.00`,
            partners: 'Unlimited',
            acqcost: `${userPermission?.currencySymbol} 0.63`,
            retcost: `${userPermission?.currencySymbol} 0.63`,
            cpclick: `${userPermission?.currencySymbol} 1.00`,
            innxls: '10',
            color: '#a832a6',
            color2: 'rgba(168, 50, 166, 0.25)',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore'
        },
        {
            cardId: 'id7',
            feature: 'Infiniti Premium',
            plancost: `${userPermission?.currencySymbol} 19,999.00`,
            partners: 'Unlimited',
            acqcost: `${userPermission?.currencySymbol} 0.59`,
            retcost: `${userPermission?.currencySymbol} 0.59`,
            cpclick: `${userPermission?.currencySymbol} 1.00`,
            innxls: '15',
            color: '#f9a825',
            color2: 'rgba(249, 168, 37, 0.25)',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore'
        },
        {
            cardId: 'id8',
            feature: 'Infiniti Premium Plus',
            plancost: `${userPermission?.currencySymbol} 29,999.00`,
            partners: 'Unlimited',
            acqcost: `${userPermission?.currencySymbol} 0.56`,
            retcost: `${userPermission?.currencySymbol} 0.56`,
            cpclick: `${userPermission?.currencySymbol} 1.00`,
            innxls: '20',
            color: '#e58b1d',
            color2: 'rgba(229, 139, 29, 0.25)',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore'
        },
        {
            cardId: 'id9',
            feature: 'Infiniti Enterprise',
            plancost: `${userPermission?.currencySymbol} 49,999.00`,
            partners: 'Unlimited',
            acqcost: `${userPermission?.currencySymbol} 0.53`,
            retcost: `${userPermission?.currencySymbol} 0.53`,
            cpclick: `${userPermission?.currencySymbol} 1.00`,
            innxls: '25',
            color: '#0d47a1',
            color2: 'rgba(13, 71, 161, 0.25)',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore'
        },
        {
            cardId: 'id10',
            feature: 'Infiniti Enterprise Plus',
            plancost: `${userPermission?.currencySymbol} 99,999.00`,
            partners: 'Unlimited',
            acqcost: `${userPermission?.currencySymbol} 0.50`,
            retcost: `${userPermission?.currencySymbol} 0.50`,
            cpclick: `${userPermission?.currencySymbol} 1.00`,
            innxls: '30',
            color: '#827717',
            color2: 'rgba(130, 119, 23, 0.25)',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore'
        }
    ]


    function shadowAdd(id, color) {
        console.log(id)
        $('.car-card').css('boxShadow', `0px 0px 0px ${color}`)
        $(`#${id}`).css('boxShadow', `0px 0px 20px ${color}`)
    }

    useEffect(() => {
        shadowAdd('id3', 'rgba(224, 79, 26, 0.25)')
    }, [])

    const cardSwipe = cardsDetails.map(function (cardsDetail, key) {

        return (

            <SwiperSlide key={key}>
                <Card id={cardsDetail.cardId}
                    className='car-card mt-2 mx-2 py-2 rounded-5 borderchange' style={{ cursor: 'pointer', boxShadow: `0px 0px 0px ${cardsDetail.color2}` }}

                    onClick={() => shadowAdd(cardsDetail.cardId, cardsDetail.color2)}
                >
                    <CardBody className='px-0'>
                        <div>
                            <h4 style={{
                                color: `${cardsDetail.color}`,
                                textShadow: `0px 0px 50px ${cardsDetail.color}`,
                                fontWeight: 800
                            }}
                                className="pb-4 fs-2 text-center">{cardsDetail.feature}</h4>
                        </div>
                        <div>
                            <p className='px-3 fs-6 text-center mb-5' style={{ fontWeight: '300' }}>{cardsDetail.description}</p>
                            <p className='px-3 mb-0'><span style={{ padding: '2rem 0rem 0.25rem 0rem', fontWeight: 800 }} className='rounded fs-3' >{cardsDetail.plancost}</span></p>
                            <p className='my-0 px-3' style={{ fontSize: '0.85rem' }}> upto {cardsDetail.partners} partners </p>
                            <p className='my-0 px-3' style={{ fontSize: '0.85rem' }}> {cardsDetail.acqcost} per offer sent </p>
                            <p className='my-0 px-3' style={{ fontSize: '0.85rem' }}> {cardsDetail.cpclick} per click </p>
                            <p className='my-0 px-3' style={{ fontSize: '0.85rem' }}> upto {cardsDetail.innxls} Inner XIRCL </p>
                        </div>
                        <div className="px-3 mt-3">
                            <button className="btn px-2 py-1 w-100 text-white" style={{
                                backgroundColor: `${cardsDetail.color}`,
                                fontWeight: 600,
                                boxShadow: `0px 0px 20px ${cardsDetail.color}`
                            }}
                            >Add to cart</button>
                        </div>
                    </CardBody>
                </Card>
            </SwiperSlide >)

    })

    return (
        <>
            <Swiper
                slidesPerView={3}
                spaceBetween={0}
                navigation={true}
                // autoplay={true}
                modules={[Pagination, Navigation, Autoplay]}
                className="mySwiper"
                initialSlide={1}
            >
                {cardSwipe}
            </Swiper>
        </>
    )
}

export default Swipe