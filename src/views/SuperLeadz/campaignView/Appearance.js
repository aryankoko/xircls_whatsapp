import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Wrapper from './Wrapper'
// import isEqual from "lodash.isequal"
// import { allThemes as newThemes } from '../../Components/SuperLeadz/allThemes'
// import { Download, X } from 'react-feather'
// import Spinner from '../../Components/DataTable/Spinner'
// import { ThemesProvider } from '../../../Helper/Context'
import { SuperLeadzBaseURL } from '../../../assets/auth/jwtService'
import { getCurrentOutlet } from '../../Validator'
import JsonToJsx from '../../Components/SuperLeadz/JsonToJsx'
import Spinner from '../../Components/DataTable/Spinner'
// import ReturnOfferHtml from '../../NewCustomizationFlow/ReturnOfferHtml'

const Appearance = () => {
    const { id } = useParams()

    const [title, setTitle] = useState([])
    const [index, setIndex] = useState(0)
    const [currPage, setCurrPage] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    // const { selectedCustThemeId } = useContext(ThemesProvider)
    // const allPreviews = [...newThemes]
    // const [indexes, setIndexes] = useState({ cur: 0, curElem: "left", subElem: "grandparent" })
    // const [mouseEnterIndex, setMouseEnterIndex] = useState({ cur: false, curElem: false, subElem: false })
    // const [isMobile, setIsMobile] = useState(false)
    // const themeLoc = useLocation()
    // const mobileCondition = isMobile ? "mobile_" : ""
    // const [bgOffer, setBgOffer] = useState({ backgroundColor: "rgba(255,255,255,0)", bgType: "solid", paddingTop: "0px", paddingBottom: "0px", paddingRight: "0px", paddingLeft: "0px", marginTop: "0px", marginBottom: "0px", marginRight: "auto", marginLeft: "auto", borderWidth: "0px 0px 0px 0px", defBorderWidth: "0px", borderColor: "rgba(0,0,0,1)", borderStyle: "solid", borderType: "none", borderTopLeftRadius: "0px", borderTopRightRadius: "0px", borderBottomRightRadius: "0px", borderBottomLeftRadius: "0px", maxWidth: "100%", maxHeight: "300px", overflow: "auto", boxSizing: "border-box" })
    const outletData = getCurrentOutlet()
    const [finalObj, setFinalObj] = useState(null)
    // const [crossStyle, setCrossStyle] = useState({ ...finalObj?.crossButtons?.main })
    const [gotOffers, setGotOffers] = useState(false)
    const [allOffers, setAllOffers] = useState([])
    // const [bgStyles, setBgStyles] = useState(selectedCustThemeId === "" ? { backgroundColor: "rgba(255,255,255,1)", bgType: "solid", width: '550px', maxWidth: "90%", minHeight: '75px', paddingTop: "0px", paddingBottom: "0px", paddingRight: "0px", paddingLeft: "0px", marginTop: "0px", marginBottom: "0px", marginRight: "0px", marginLeft: "0px", borderWidth: "0px 0px 0px 0px", defBorderWidth: "0px", borderColor: "rgba(0,0,0,1)", borderStyle: "solid", borderType: "none", borderTopLeftRadius: "0px", borderTopRightRadius: "0px", borderBottomRightRadius: "0px", borderBottomLeftRadius: "0px", boxSizing: "border-box" } : finalObj.backgroundStyles[`${mobileCondition}main`])
    console.log(gotOffers, setFinalObj, allOffers)
    // console.log(colWise, "colwise")
    const getOffers = () => {
        setGotOffers(false)

        fetch(`${SuperLeadzBaseURL}/utils/api/v1/superoffer/`, {
            method: "POST",
            body: JSON.stringify({
                shop: outletData[0]?.web_url,
                app: "superleadz"
            })
        })
            .then((resp) => resp.json())
            .then((data) => {
                setGotOffers(true)
                setAllOffers(data)
            })
            .catch((error) => {
                setGotOffers(true)
                console.log(error)
            })
    }

    useEffect(() => {
        const url = new URL(`${SuperLeadzBaseURL}/api/v1/pop_up_analytics/?shop=${outletData[0]?.web_url}&app=superleadz&theme_id=${id}`)

        axios({
            method: "GET",
            url
        })
        .then((response) => {
            const theme = response.data.theme_json
            // console.log("res", response)
            // console.log("res theme:", theme[0])
            const custom_theme = JSON.parse(theme[0].custom_theme)
            console.log("cust theme:", custom_theme)
            setFinalObj(custom_theme)
            setTitle(custom_theme.pages)
            setCurrPage(custom_theme.pages[0].pageName)
            setIsLoading(false)

        })
        .catch((err) => {
            console.log(err)
        })
        getOffers()
    }, [])

    // const [activeItem, setActiveItem] = useState('page1')

    const handleItemClick = (itemPageName) => {
        setCurrPage(itemPageName)
        const themeIndex = title.findIndex(ele => ele.pageName === itemPageName)
        setIndex(themeIndex)
    }

    console.log(finalObj, "finalObj")

    return (
        <>
            <style>
                {`
                .navbar-item.active {
                    background-color: #fff;
                    border-radius: 999px;
                    box-shadow: 0px 0px 10px rgba(0,0,0,0.5);
                }
                `}
            </style>

            <Wrapper />

            <div className='d-flex align-items-center flex-column mt-1'>
                {
                    isLoading ? <Spinner size={'35px'} /> : (
                        <>
                            <div style={{ padding: "0.5rem", backgroundColor: "", color: "#000" }} className="w-100 d-flex justify-content-between rounded-pill mb-2 p-1">
                                <div className='d-flex justify-content-evenly w-100'>
                                    {finalObj && finalObj?.pages?.map((item) => (
                                        <div
                                            key={item.pageName}
                                            style={{ padding: "1vh" }}
                                            className={`navbar-item cursor-pointer text-black px-5 ${currPage === item.pageName ? 'active' : ''}`}
                                            onClick={() => handleItemClick(item.pageName)}
                                        >
                                            {item.pageName}
                                        </div>
                                    ))}
                                </div>
                            </div>


                            <div className="flex-grow-1 position-relative w-75 " style={{ backgroundImage: 'url("https://miro.medium.com/v2/resize:fit:678/1*ZPvzUShTe448VPDukHiskw.png")', height: "60vh" }}>
                                <div className='d-flex justify-content-center  align-items-center h-100'>
                                    <div id="customization" className='d-flex justify-content-center align-items-center position-relative mt-2'>
                                        {/* <div style={{ scale: '0.55', filter: 'drop-shadow(0px 0px 15px rgba(0,0,0,0.5))'}}> */}
                                        <div className="position-relative scroll-custom d-flex justify-content-center align-items-center" style={{ height: "45vh", maxHeight: '45vh', backgroundImage: `url("https://miro.medium.com/v2/resize:fit:678/1*ZPvzUShTe448VPDukHiskw.png")`, overflow: 'hidden', cursor: "default"  }}>
                                            {
                                                finalObj ? <JsonToJsx isMobile={false} renderObj={finalObj} index={index} /> : ''
                                            }
                                        </div>
                                        {/* </div> */}
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }

            </div>
        </>
    )
}

export default Appearance