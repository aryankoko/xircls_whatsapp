import React from "react"
import logo1 from "@src/assets/images/website-slide/network-logos/xircls_upgrad_logo.png"
import logo2 from "@src/assets/images/website-slide/network-logos/xircls_bewakoof_logo.png"
import logo3 from "@src/assets/images/website-slide/network-logos/xircls_designers-class_logo.png"
import logo4 from "@src/assets/images/website-slide/network-logos/xircls_hammer_logo.png"
import logo5 from "@src/assets/images/website-slide/network-logos/xircls_kapiva_logo.png"
import logo6 from "@src/assets/images/website-slide/network-logos/xircls_leaf_logo.png"
import logo7 from "@src/assets/images/website-slide/network-logos/xircls_rebel_logo.png"
import logo8 from "@src/assets/images/website-slide/network-logos/xircls_snitch_logo.png"
import logo9 from "@src/assets/images/website-slide/network-logos/xircls_true-elements_logo.png"
import logo10 from "@src/assets/images/website-slide/network-logos/xircls_pvr-cinemas_logo.png"
import { Pagination, Navigation, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js'

export default function LogoSection() {

  const imageArray = [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8, logo9, logo10]
  return (
    <>
      <Swiper
        breakpoints={{
          0: {
            width: 0,
            slidesPerView: 1
          },
          768: {
            width: 768,
            slidesPerView: 4
          },
          1200: {
            width: 1200,
            slidesPerView: 6
          }
        }}
        spaceBetween={6}
        navigation={false}
        autoplay={{ delay: 1000 }}
        speed={500}
        loop={true}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
        initialSlide={0}>
        {
          imageArray.map((image, key) => {
            return (
              <SwiperSlide key={key}>
                <div id="parent_img_logo">
                  <img id="img_logo" width={140} src={image} alt='upgrad' />
                </div>
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </>

  )
}
