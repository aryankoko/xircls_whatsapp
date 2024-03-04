import React, { useEffect, useState } from 'react'
import { ThemesProvider } from '../../../Helper/Context'
import { allThemes } from './allThemes'
// import theme3 from "../../SuperLeadz/Customization/theme3.png"
// import theme4 from "../../SuperLeadz/Customization/theme4.png"
// import moment from 'moment/moment'
// import axios from 'axios'
import { SuperLeadzBaseURL } from '../../../assets/auth/jwtService'
// import toast from 'react-hot-toast'

const CustomizationWrap = ({ children }) => {
    const [selectedThemeNo, setSelectedThemeNo] = useState(3)
    const [selectedThemeId, setSelectedThemeId] = useState(1)
    const [selectedCustThemeId, setSelectedCustThemeId] = useState(localStorage.getItem("selectedCustThemeId") ? Number(localStorage.getItem("selectedCustThemeId")) : '')

    const defaultThemeData = {
        themeData3: {
            background_color: '#ffffff',
            body_background_color: "#edb673",
            border_radius: '12',
            image: "https://superleads-widgets-images.s3.amazonaws.com/XIdS1AC0wE99.png",
            is_offer_image: 0,
            header_color: '#000',
            body_color: '#000',
            header_text: "<p><strong>Become an Instant VIP.</strong></p><p><strong>Unlock Exclusive Offers!</strong></p>",
            body_text: "<p>Our instant VIPs get discounts you won't find anywhere else! Check in to see what's waiting for you.</p>",
            button_background_color: '#464646',
            button_color: '#ffffff',
            button_border_radius: '7',
            button_text: 'CHECK IN!',
            visitor_settings: "ALL_VISITORS",
            pop_up_load_type: "scroll",
            pop_up_load_value: 0,
            PAGES: ['all_pages'],
            CUSTOM_PAGE_LINK: [""],
            mobile_background_color: '#ffffff',
            mobile_body_background_color: "#edb673",
            mobile_border_radius: '12',
            mobile_image: "https://superleads-widgets-images.s3.amazonaws.com/XIdS1AC0wE99.png",
            mobile_is_offer_image: 0,
            mobile_header_color: '#000',
            mobile_body_color: '#000',
            mobile_header_text: "<p><strong>Become an Instant VIP.</strong></p><p><strong>Unlock Exclusive Offers!</strong></p>",
            mobile_body_text: "<p>Our instant VIPs get discounts you won't find anywhere else! Check in to see what's waiting for you.</p>",
            mobile_button_background_color: '#464646',
            mobile_button_color: '#ffffff',
            mobile_button_border_radius: '7',
            mobile_button_text: 'CHECK IN!',
            mobile_visitor_settings: "ALL_VISITORS",
            offers: [],
            otp_settings: 1
        },
        themeData4: {
            background_color: '#ffffff',
            body_background_color: '#ffffff',
            border_radius: '0',
            is_offer_image: 0,
            header_color: '#000',
            body_color: '#000',
            header_text: "<p><strong>You're one click away from unlocking an exclusive offer!</strong></p>",
            body_text: "<Here>Looking for a reason to shop? Here's an offer you can't refuse.</p>",
            tnc_text: "<p>Agree to <a href='test.url.com' rel='noopener noreferrer' target='_blank'>terms and conditions</a></p>",
            background_image: `https://www.demo.xircls.in/static/images/shopify/def_background.jpg`,
            carousel_image: [`https://www.demo.xircls.in/static/images/shopify/def_carousel.jpg`],
            carousel_interval: 3,
            button_background_color: '#0c1326',
            button_color: '#ffffff',
            button_border_radius: '0',
            button_text: 'UNLOCK OFFER',
            visitor_settings: "ALL_VISITORS",
            pop_up_load_type: "scroll",
            pop_up_load_value: 0,
            PAGES: ['all_pages'],
            CUSTOM_PAGE_LINK: [""],
            mobile_background_color: '#ffffff',
            mobile_body_background_color: '#ffffff',
            mobile_border_radius: '0',
            mobile_is_offer_image: 0,
            mobile_header_color: '#000',
            mobile_body_color: '#000',
            mobile_header_text: "<p><strong>You're one click away from unlocking an exclusive offer!</strong></p>",
            mobile_body_text: "<Here>Looking for a reason to shop? Here's an offer you can't refuse.</p>",
            mobile_tnc_text: "<p>Agree to <a href='test.url.com' rel='noopener noreferrer' target='_blank'>terms and conditions</a></p>",
            mobile_background_image: `https://www.demo.xircls.in/static/images/shopify/def_background.jpg`,
            mobile_carousel_image: [`https://www.demo.xircls.in/static/images/shopify/def_carousel.jpg`],
            mobile_carousel_interval: 3,
            mobile_button_background_color: '#0c1326',
            mobile_button_color: '#ffffff',
            mobile_button_border_radius: '0',
            mobile_button_text: 'UNLOCK OFFER',
            offers: [],
            otp_settings: 1
        }
    }

    const [themes, setThemes] = useState(defaultThemeData)
    const [oldThemes, setOldThemes] = useState(defaultThemeData)
    const [introThemeId, setIntroThemeId] = useState(0)

    const [matchSettings, setMatchSettings] = useState({
        background_match: true,
        image_match: true,
        text_match: true,
        button_match: true
    })

    // const [allThemes, setAllThemes] = useState([])

    // console.log(setAllThemes)

    const [editTheme, setEditTheme] = useState({})

    useEffect(() => {
        setMatchSettings({
            background_match: true,
            image_match: selectedThemeNo !== 4,
            text_match: true,
            button_match: true
        })
    }, [selectedThemeNo])

    useEffect(() => {
        localStorage.setItem("selectedCustThemeId", selectedCustThemeId)
    }, [selectedCustThemeId])

    return (
        <ThemesProvider.Provider value={{ themes, setThemes, defaultThemeData, matchSettings, setMatchSettings, selectedThemeNo, setSelectedThemeNo, oldThemes, setOldThemes, introThemeId, setIntroThemeId, allThemes, selectedThemeId, setSelectedThemeId, editTheme, setEditTheme, selectedCustThemeId, setSelectedCustThemeId }}>
            {children}
        </ThemesProvider.Provider>
    )
}

export default CustomizationWrap