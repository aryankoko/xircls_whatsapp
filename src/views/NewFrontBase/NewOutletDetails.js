import { Container, Row, Col } from "reactstrap"
// import $ from 'jquery'
import './NewFrontBase.css'
import CompanyImg from '../../assets/images/vector/Company-bro.svg'
import Flip from "../Components/NewThemeComponents/Filp.jsx"
import { useEffect, useState } from "react"
import { getReq, postReq } from "../../assets/auth/jwtService"
import waterMark from "@src/assets/images/logo/xircls-waterMark.png"
import toast from 'react-hot-toast'
import { useNavigate } from "react-router-dom"
// import { postReq } from "../../../assets/auth/jwtService"

const default_data = {
    outlet_name: '',
    web_url: '',
    outlet_description: '',
    view_logo_url: waterMark,
    men: [],
    women: [],
    kid: [],
    main_categories: [],
    sub_categories: [],
    m_ratio: '',
    w_ratio: '',
    k_ratio: '',
    country: [],
    state: [],
    city: [],
    currency: ""
}

const NewOutletDetails = () => {
    const [currencyList, setCurrencyList] = useState([])
    const [country, setCountry] = useState([])
    // const [state, setState] = useState([])
    const [catData, setCatData] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [outletData, setOutletData] = useState(default_data)
    const [imageObject, setImageObject] = useState({})
    const navigate = useNavigate()

    const getCategory = () =>  {
        getReq('getCategory')
        .then((res) => {
            setCatData(res.data.data.categories.main_categories)
            setSubCategories(res.data.data.categories.sub_categories)
        })
        .catch((err) => {
            console.log(err)
            // setCatData(main_categories)
        })
    }

    const getCountries = () => {
        getReq('countries')
        .then((resp) => {
            console.log(resp)
            setCurrencyList(resp.data.data.countries.map((curElem) => {
                return {value: curElem.id, label: `${curElem.currency_symbol}`}
            }))
            setCountry(resp.data.data.countries.map((curElem) => {
                return {value: `${curElem.name}`, label: `${curElem.name}`}
            }))
        })
        .catch((error) => {
            console.log(error)
        })
    }

    // const getState = () => {
        // const form_data = new FormData()
        // form_data.append('country_id', '')
        // postReq('getState', form_data)
        // .then((resp) => {
        //     console.log(resp)
        //     setState(resp.data.data.states.map((curElem) => {
        //         return {value: `${curElem.id}`, label: `${curElem.name}`}
        //     }))
        // })
        // .catch((error) => {
        //     console.log(error)
        // })
    // }

    const getData = () => {
        getReq('saveOutletDetails')
        .then((resp) => {
            const drillData = resp.data.data.outlet_detail

            const updatedData = {
                outlet_name: drillData.outlet_name,
                web_url: drillData.web_url,
                outlet_description: drillData.outlet_description,
                outlet_logo: {},
                view_logo_url: drillData.outlet_logo,
                men: drillData.cater_to_gender.men,
                women: drillData.cater_to_gender.women,
                kid: drillData.cater_to_gender.kid,
                main_categories: drillData.outlet_categories_main,
                sub_categories: drillData.outlet_categories_filter,
                m_ratio: drillData.cater_to_gender.m_ratio,
                w_ratio: drillData.cater_to_gender.w_ratio,
                k_ratio: drillData.cater_to_gender.k_ratio,
                country: drillData.outlet_location[0].country,
                state: drillData.outlet_location[0].state,
                city: drillData.outlet_location[0].city,
                currency: []
            }

            setOutletData(updatedData)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getCategory()
        getCountries()
        // getState()
        getData()
    }, [])

    const submitOutletDetails = () => {
        
        const form_data = new FormData()
        Object.entries(outletData).map(([key, value]) => {
            form_data.append(key, value)
        })
        form_data.append('outlet_logo', Object.keys(imageObject).length === 0 ? "" : imageObject)
        console.log(form_data)
        postReq('saveOutletDetails', form_data)
        .then((resp) => {
            console.log(resp)
            toast.success(resp.data.message)
            navigate("/merchant/create_offers/")
        })
        .catch((error) => {
            console.log(error)
            toast.error(resp.data.message)
        })
    }


    return (
      
        <div>
            <Container fluid>
                <Row className="w-100 px-2">
                    <Col xs={2}>
                        <img className="py-2" width={'70%'} src="https://api.xircls.com/static/images/website-slide/logo-dark2.png" alt="Logo" />
                    </Col>
                </Row>
                <Row className="match-height px-2" style={{ transition: '0.3s ease' }}>
                    <Col lg={6} className='pb-2'>

                        <div className='d-flex gap-2 px-0 w-75'>
                            <div className="bg-dark w-100 rounded-pill" style={{ padding: '0.25rem' }}></div>
                            <div className="bg-dark w-100 rounded-pill" style={{ padding: '0.25rem' }}></div>
                            <div className="bg-dark w-100 rounded-pill" style={{ padding: '0.25rem' }}></div>
                            
                        </div>
                        <div className="text-black px-2 py-1">Step 03/ <span className="text-secondary">03</span></div>
                        <h1 className="text-black mb-2 main-headerText">Outlet Details</h1>
                        <div className="w-100" style={{ backgroundImage: `url(${CompanyImg})`, backgroundSize: 'contain', backgroundPosition: 'top', backgroundRepeat: 'no-repeat', height: '287px' }}>
                            
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="w-100 border p-2" style={{backgroundColor: '#f3f3f3', borderRadius: '1rem', position: 'relative', height: '480px'}}>
                            <Flip 
                                currency={currencyList} 
                                country={country} 
                                // state={state}
                                // setState={setState}
                                catData={catData} 
                                subCategories={subCategories}
                                outletData={outletData}
                                setOutletData={setOutletData}
                                submitOutletDetails={submitOutletDetails}
                                setImageObject={setImageObject}
                            />
                        </div>

                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default NewOutletDetails