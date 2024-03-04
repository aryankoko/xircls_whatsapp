import React from "react"
import { Pagination, Navigation, Autoplay } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import shopifyLogo from "../assets/images/logo/shopify-logo.png"
import { ownUrl } from "@src/views/Validator/index"

// import $ from 'jquery'=
// import '../../node_modules/swiper/swiper.min.css'
// import '../../node_modules/swiper/modules/pagination/pagination.min.css'
// import '../../node_modules/swiper/modules/navigation/navigation.min.css'
// import '../../node_modules/swiper/modules/autoplay/autoplay.min.css'
// import { Card, CardBody } from 'reactstrap'
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'

const Swipe = ({ selectProduct, setSelectedProduct }) => {
  // console.log(selectProduct)
  // console.log(setSelectedProduct)

    // const cardsDetails = [
    //     {
    //         cardId: 'id1',
    //         image: 'https://api.xircls.com/static/dashmix/media/icons/Infiniti_strategy.png',
    //         feature: 'Infiniti',
    //         sub_header: <>Acquisition + Loyalty in 1 Single Campaign!</>,
    //         description: 'A cost-effective two-way cross-marketing campaign where you: Reward your customers with offers from non-competing partner businesses Precisely direct your offers at your target demographic when they buy from partner businesses.'
    //     },
    //     {
    //         cardId: 'id2',
    //         image: 'https://api.xircls.com/static/dashmix/media/icons/Sniper_strategy.png',
    //         feature: 'Sniper',
    //         sub_header: <>The Only Precision Marketing <br /> Tool You'll Ever Need.</>,
    //         description: 'A highly targeted marketing campaign where your offers are exclusively issued to customers when they buy from partner businesses. Discreetly send high-value offers to target customers via your partners.'
    //     },
    //     {
    //         cardId: 'id3',
    //         image: 'https://api.xircls.com/static/dashmix/media/icons/Semper%20Fi_strategy.png',
    //         feature: 'Semper Fi',
    //         sub_header: <>The Smartest Way to <br /> Win Loyalty</>,
    //         description: "Let other businesses reward your customers for shopping with you. It's a perpetual loyalty program where your customers receive offers from partner businesses every time they buy from you. Semper Fi is an abbreviated form of a Latin phrase which means Always Loyal. "

    //     }
    // ]


    // function shadowAdd(id, color) {
    //     console.log(id)
    //     $('.car-card').css('boxShadow', `0px 0px 0px ${color}`)
    //     $(`#${id}`).css('boxShadow', `0px 0px 20px ${color}`)
    // }

    // useEffect(() => {
    //     shadowAdd('id3', 'rgba(224, 79, 26, 0.25)')
    // }, [])

    // const cardSwipe = cardsDetails.map(function (cardsDetail, key) {

    //     return (
    //         <SwiperSlide key={key}>
    //             <div className="card" style={{width: `280px`, margin: '30px auto', height: `100%`}} >
    //               <div className="card-body text-center">
    //                 <div className="image">
    //                   <img width="80px" src={cardsDetail.image} alt="" />
    //                 </div>
    //                 <h4 className="mt-1">{cardsDetail.feature}</h4>
    //                 <h6>{cardsDetail.sub_header}</h6>
    //                 <hr />
    //                 <div className="parent-img d-flex justify-content-evenly align-items-center">
    //                   <a href="/">
    //                     <img width="35px" className="image_logo" src={shopifyLogo} alt="" />

    //                   </a>
    //                   <a href="/">
    //                     <img width="35px" className="image_logo" src="https://api.xircls.com/static/images/website-slide/WooCommerce_logo.svg.png" alt="" />

    //                   </a>
    //                 </div>
    //               </div>
    //             </div>
    //         </SwiperSlide >)
    // })

    return (
        <>
         <Swiper
                slidesPerView={2}
                spaceBetween={0}
                navigation={true}
                // autoplay={true}
                modules={[Pagination, Navigation, Autoplay]}
                className="mySwiper"
                initialSlide={0}
            >
              <SwiperSlide>
                  <div className={`card prod_card ${selectProduct === 1 ? "active_plan_card" : ''}`} onClick={() => setSelectedProduct(1)} style={{width: `280px`, margin: '30px auto', height: `100%`}} >
                    <div className="card-body text-center">
                      <div className="image">
                        <img width="80px" src={`${ownUrl}/dashmix/media/icons/Infiniti_strategy.png`} alt="" />
                      </div>
                      <h4 className="mt-1">Infiniti</h4>
                      <h6>Acquisition + Loyalty in 1 Single Campaign!</h6>
                      <hr />
                      <div className="parent-img d-flex justify-content-evenly align-items-center">
                        <a href="https://apps.shopify.com/XIRCLS">
                          <img width="35px" className="image_logo" src={shopifyLogo} alt="" />

                        </a>
                        <a href="/">
                          <img width="35px" className="image_logo" src={`${ownUrl}/images/website-slide/WooCommerce_logo.svg.png`} alt="" />

                        </a>
                      </div>
                    </div>
                  </div>
              </SwiperSlide >

              <SwiperSlide>
                  <div className={`card prod_card ${selectProduct === 2 ? "active_plan_card" : ''}`} onClick={() => setSelectedProduct(2)} style={{width: `280px`, margin: '30px auto', height: `100%`}} >
                    <div className="card-body text-center">
                      <div className="image">
                        <img width="80px" src={`${ownUrl}/dashmix/media/icons/Sniper_strategy.png`} alt="" />
                      </div>
                      <h4 className="mt-1">Sniper</h4>
                      <h6>The Only Precision Marketing <br /> Tool You'll Ever Need.</h6>
                      <hr />
                      <div className="parent-img d-flex justify-content-evenly align-items-center">
                        <a href="https://apps.shopify.com/XIRCLS">
                          <img width="35px" className="image_logo" src={shopifyLogo} alt="" />

                        </a>
                        <a href="/">
                          <img width="35px" className="image_logo" src={`${ownUrl}/images/website-slide/WooCommerce_logo.svg.png`} alt="" />

                        </a>
                      </div>
                    </div>
                  </div>
              </SwiperSlide >


              <SwiperSlide>
                  <div className={`card prod_card ${selectProduct === 3 ? "active_plan_card" : ''}`} onClick={() => setSelectedProduct(3)} style={{width: `280px`, margin: '30px auto', height: `100%`}} >
                    <div className="card-body text-center">
                      <div className="image">
                        <img width="80px" src={`${ownUrl}/dashmix/media/icons/Semper%20Fi_strategy.png`} alt="" />
                      </div>
                      <h4 className="mt-1">Semper Fi</h4>
                      <h6>The Smartest Way to <br /> Win Loyalty</h6>
                      <hr />
                      <div className="parent-img d-flex justify-content-evenly align-items-center">
                        <a href="https://apps.shopify.com/XIRCLS">
                          <img width="35px" className="image_logo" src={shopifyLogo} alt="" />

                        </a>
                        <a href="/">
                          <img width="35px" className="image_logo" src={`${ownUrl}/images/website-slide/WooCommerce_logo.svg.png`} alt="" />

                        </a>
                      </div>
                    </div>
                  </div>
              </SwiperSlide >
            </Swiper>
            
        </>
    )
}

export default Swipe