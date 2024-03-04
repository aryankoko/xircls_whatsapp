import React, { useContext, useEffect, useState } from 'react'
import { AccordionBody, AccordionHeader, AccordionItem, Card, CardBody, Input, Label, UncontrolledAccordion } from 'reactstrap'
import waterMark from "@src/assets/images/logo/xircls-waterMark.png"
import { Download, Image, Info, Paperclip, Trash } from 'react-feather'
import { imageValidation, ownUrl, validForm } from '../Validator'
import Select from 'react-select'
import { Kidoptions, Maleoptions, RatioList, callToAction } from '../../Helper/data'
import { SuperLeadzBaseURL, getReq, postReq, putReq } from '../../assets/auth/jwtService'
import "./NewFrontBase.css"
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Flatpickr from 'react-flatpickr'
import moment from 'moment/moment'
import toast from 'react-hot-toast'
import FrontBaseLoader from '../Components/Loader/Loader'
import { PermissionProvider } from '../../Helper/Context'
import downloadFile from "../../assets/files/offer_code.csv"

const Create_offers = () => {
    const { userPermission } = useContext(PermissionProvider)
    const { offerId } = useParams()
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const defaultData = {
        offer_type: params.get('purpose') ? params.get('purpose') : "ACQ",
        discount_code: "",
        discount_type: "code",
        method: "amount",
        offer_value_type: "percent",
        offer_value: "",
        cart_condition: "NO_REQ",
        customer_eligility: "ALL",
        cart_usage: "1",
        cart_value: "",
        total_limit: false,
        per_cust_limit: false,
        customer_buys: "ITEMS",
        customer_gets_value: "",
        start_date: moment(new Date()).format('YYYY-MM-DD'),
        start_time: "",
        is_end_data: false,
        end_date: "",
        end_time: "",
        customer_buys_list: [],
        customer_gets_list: [],
        BXBY_Type: "product",
        BXBY_Buy_Type: "product",
        customer_gets_collection_list: [],
        customer_buys_collection_list: [],
        customer_gets_discount_type: "FREE",
        customer_gets_discount_value: "",
        customer_collection_list: [],
        selected_audience: [],
        max_spend_val: "",
        min_spend_val: "",
        man: [],
        ratio_m: "",
        women: [],
        ratio_w: "",
        kid: [],
        ratio_k: "",
        main_categories: [],
        sub_categories: [],
        offer_title: "",
        offer_description: "",
        call_to_action: "",
        call_to_action_url: "",
        typeOffApply: "collections",
        tnc: ""
    }

    const campaignData = userPermission?.multipleDomain?.filter((cur) => cur.api_key === userPermission?.apiKey)

    const [curStep, setCurStep] = useState(offerId ? 4 : 1)
    const [offerData, setOfferData] = useState(defaultData)
    const [productList, setProductList] = useState([])
    const [catData, setCatData] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [imageUrl, setImageUrl] = useState(waterMark)
    const [imageObject, setimageObject] = useState({})
    const [productData, setProductData] = useState(null)
    const [collectionData, setCollectionData] = useState([])
    const [collectionList, setCollectionList] = useState([])
    const [apiLoader, setApiLoader] = useState(false)
    const navigate = useNavigate()
    const BXType = [
        { value: "collection", label: "Collections" },
        { value: "product", label: "Products" }
    ]

    const updateOfferData = (e) => {
        if (e.target.name === "discount_type") {
            const updatedData = {
                discount_type: e.target.value,
                discount_code: ""
            }
            setOfferData((pre) => ({
                ...pre,
                ...updatedData
            }))
        } else {
            setOfferData({ ...offerData, [e.target.name]: e.target.value })
        }
    }

    const handleChange = (options, actionMeta, check) => {
        if (check) {
            const option_list = options.map((cur) => {
                return cur.value
            })
            setOfferData({ ...offerData, [actionMeta.name]: option_list })
        } else {
            setOfferData({ ...offerData, [actionMeta.name]: options.value })
        }

    }

    const getCategory = () => {
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
    console.log(offerData, "offerData")
    const saveOfferData = (type) => {
        const form_data = new FormData()
        // Object.entries(offerData).map(([key, value]) => {
        //     form_data.append(key, value)
        // })
        setApiLoader(true)
        Object.entries(offerData)?.map(([key, value]) => {
            if (Array.isArray(value)) {
                value.map(ele => form_data.append(key, ele))
            } else if (typeof value === "object") {
                if (key === "discount_code") {
                    form_data.append('discount_code', offerData?.discount_code)
                } else {
                    Object.entries(value).map(([subKey, subValue]) => {
                        form_data.append(subKey, subValue)
                    })

                }
            } else {
                form_data.append(key, value)
            }
        })

        form_data.append('offer_json', JSON.stringify(offerData))
        form_data.append('offer_image', imageObject)
        form_data.append('all_categories', offerData?.main_categories.concat(offerData?.sub_categories))
        console.log(form_data)

        if (offerId) {
            form_data.append("offer_id", offerId)
            putReq('saveOffersInfiniti', form_data)
            .then((resp) => {
                console.log(resp)
                setApiLoader(false)
                toast.success('Offer created successfully')
                if (type === "save&close") {
                    navigate(-1)
                }


            })
            .catch((error) => {
                console.log(error)
                toast.error("Something went wrong")
                setApiLoader(false)
            })
        } else {
            postReq('saveOffersInfiniti', form_data)
            .then((resp) => {
                console.log(resp)
                setApiLoader(false)
                toast.success('Offer created successfully')
                if (type === "save&close") {
                    navigate(-1)
                }

            })
            .catch((error) => {
                console.log(error)
                toast.error("Something went wrong")
                setApiLoader(false)
            })
        }


    }

    const getProduct = () => {
        console.log(campaignData)
        const form_data = new FormData()
        form_data.append("shop", campaignData[0]?.web_url)
        form_data.append("app_name", userPermission?.appName)

        fetch(`${SuperLeadzBaseURL}/api/v1/get/get_shopify_products/`, {
            method: "POST",
            body: form_data
        })
        .then((response) => response.json())
        .then((data) => {
            // console.log(data.response.products)
            setProductData(data?.response?.products)
            setProductList(data?.response?.products.map((curElem) => {
                return { value: curElem.id, label: curElem.title }
            }))
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const getCollection = () => {
        const form_data = new FormData()
        form_data.append("shop", campaignData[0]?.web_url)
        form_data.append("app_name", userPermission?.appName)
        fetch(`${SuperLeadzBaseURL}/api/v1/get/get_shopify_collections/`, {
            method: "POST",
            body: form_data
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                setCollectionData(data?.response?.custom_collections)
                setCollectionList(data?.response?.custom_collections.map((curElem) => {
                    return { value: curElem.id, label: curElem.title }
                }))
            })
            .catch((error) => {
                console.log(error)
            })

    }

    function SelectedCard(e, id) {
        document.getElementById(`offer_parent_${id}`).classList.toggle('active_parent_card')

        if (document.getElementById(`offer_parent_${id}`).classList.contains('active_parent_card')) {
            console.log('true')
            setOfferData({ ...offerData, main_categories: [...offerData?.main_categories, Number(id)] })
        } else {
            console.log('false')
            // setOfferData({...offerData, main_categories: offerData?.main_categories.filter((curElem) => { return curElem !== Number(id) })})

            const newSelect = []
            subCategories.filter((subCat) => {
                if (Number(id) === subCat.parent_id) {
                    newSelect.push(subCat.id)
                }
            })
            const filteredNewSelect = offerData?.sub_categories.filter((item) => !newSelect.includes(item))
            console.log(filteredNewSelect)

            const updatedData = {
                main_categories: offerData?.main_categories.filter((curElem) => { return curElem !== Number(id) }),
                sub_categories: filteredNewSelect
            }

            setOfferData((preData) => ({
                ...preData,
                ...updatedData
            }))


        }

    }

    function SelectedSubCard(e, id) {

        document.getElementById(`offer_subParent_${id}`).classList.toggle('active_parent_card')

        if (document.getElementById(`offer_subParent_${id}`).classList.contains('active_parent_card')) {
            console.log('true')
            setOfferData({ ...offerData, sub_categories: [...offerData?.sub_categories, Number(id)] })
        } else {
            console.log('false')
            setOfferData({ ...offerData, sub_categories: offerData?.sub_categories.filter((curElem) => { return curElem !== Number(id) }) })
        }

    }

    const getData = () => {
        getReq('saveOffersInfiniti', `?offer_id=${offerId}`)
            .then((resp) => {
                console.log(JSON.parse(resp?.data?.data?.outlet_detail[0]?.offer_json), "new")
                setOfferData(JSON.parse(resp?.data?.data?.outlet_detail[0]?.offer_json))
                setImageUrl(`${ownUrl}${resp?.data?.data?.outlet_detail[0]?.offer_image}`)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getProduct()
        getCollection()
        getCategory()
        if (offerId) {
            getData()
        }
        // if (params.get('purpose')) {
        //     setOfferData({...offerData, offer_type})
        // }
    }, [])

    const setAudience = (e) => {

        if (offerData?.selected_audience?.includes(e.target.value)) {

            const updateData = offerData?.selected_audience.filter((cur) => {
                return cur !== e.target.value
            })
            setOfferData({ ...offerData, selected_audience: updateData })

            if (e.target.value === "male") {
                const updatedData = {
                    man: [],
                    ratio_m: ""
                }

                setOfferData((preData) => ({
                    ...preData,
                    ...updatedData
                }))
            }

            if (e.target.value === "female") {
                const updatedData = {
                    women: [],
                    ratio_w: ""
                }

                setOfferData((preData) => ({
                    ...preData,
                    ...updatedData
                }))
            }

            if (e.target.value === "kids") {
                const updatedData = {
                    kid: [],
                    ratio_k: ""
                }

                setOfferData((preData) => ({
                    ...preData,
                    ...updatedData
                }))
            }


        } else {
            setOfferData({ ...offerData, selected_audience: [...offerData?.selected_audience, e.target.value] })
        }


    }

    console.log(setCollectionData, setCollectionList, offerData?.sub_categories, "product")

    const imageActions = (e) => {
        const checkVaildImage = imageValidation(e)
        if (checkVaildImage) {
            setImageUrl(URL.createObjectURL(e.target.files[0]))
            setimageObject(e.target.files[0])
        } else {
            setImageUrl(waterMark)
            setimageObject({})
        }
    }

    const checkVaid = (type, count) => {

        let check = true
        if (curStep === 1) {
            const valueToCheck = [
                {
                    name: 'discount_code',
                    message: 'Please enter a discount code',
                    type: 'string',
                    id: 'discount_code'
                }
            ]

            if (offerData?.method === "amount") {
                valueToCheck.push({
                    name: 'offer_value',
                    message: 'Please enter a discount amount',
                    type: 'string',
                    id: 'offer_value'
                })
            }

            if (offerData?.method === "product") {
                valueToCheck.push(
                    {
                        name: 'offer_value',
                        message: 'Please enter a discount amount',
                        type: 'string',
                        id: 'offer_value'
                    },
                    {
                        name: offerData?.typeOffApply === "collections" ? 'customer_collection_list' : 'customer_buys_list',
                        message: `Please select ${offerData?.typeOffApply === "collections" ? "collection" : "product"}`,
                        type: 'string',
                        id: 'applyToList'
                    }
                )
            }

            if (offerData?.method === "BXBY") {
                valueToCheck.push(
                    {
                        name: 'customer_gets_value',
                        message: 'Please enter quantity',
                        type: 'string',
                        id: 'customer_gets_value'
                    },
                    {
                        name: offerData?.BXBY_Type === "collection" ? 'customer_gets_collection_list' : 'customer_gets_list',
                        message: `Please select ${offerData?.BXBY_Type === "collection" ? "collection" : "product"}`,
                        type: 'string',
                        id: 'customer_gets_list'
                    }
                )

                if (offerData?.customer_gets_discount_type === "PERCENT") {
                    valueToCheck.push(
                        {
                            name: 'customer_gets_discount_value',
                            message: 'Please enter percentage',
                            type: 'string',
                            id: 'customer_gets_discount_value'
                        }
                    )
                }
            }

            check = validForm(valueToCheck, offerData)
            console.log(check, "1")
        } else if (curStep === 2) {
            const valueToCheck = [
                {
                    name: offerData?.cart_condition === "NO_REQ" ? "cart_condition" : "cart_value",
                    message: offerData?.cart_condition === "AMT" ? "Please enter amount of items in the cart" : "Please enter numer of items in the cart",
                    type: 'string',
                    id: 'cart_value'
                }
            ]

            if (offerData?.method === "BXBY") {
                valueToCheck.push(
                    {
                        name: 'cart_value',
                        message: `Please enter ${offerData?.customer_buys === "ITEMS" ? "quantity" : "amount"}`,
                        type: 'string',
                        id: 'cart_value'
                    }
                )

                if (offerData.BXBY_Buy_Type === "product") {
                    valueToCheck.push(
                        {
                            name: 'customer_buys_list',
                            message: `Please select product`,
                            type: 'string',
                            id: 'bxgyList'
                        }
                    )
                } else {
                    valueToCheck.push(
                        {
                            name: 'customer_buys_collection_list',
                            message: `Please select collection`,
                            type: 'string',
                            id: 'bxgyList'
                        }
                    )
                }
            }

            check = validForm(valueToCheck, offerData)
            console.log(check, "2")
        } else if (curStep === 3) {
            // nothing for value offer
        } else if (curStep === 4) {
            if (offerData?.offer_type === "ACQ" && check) {

                const valueToCheck = [
                    {
                        name: "selected_audience",
                        message: "Please select audience",
                        type: 'string',
                        id: 'selected_audience'
                    }
                ]

                if (offerData?.selected_audience.includes('male')) {
                    valueToCheck.push(
                        {
                            name: "man",
                            message: "Please male adults age",
                            type: 'string',
                            id: 'man'
                        },
                        {
                            name: "ratio_m",
                            message: "Please select male ratio",
                            type: 'string',
                            id: 'ratio_m'
                        }
                    )
                }
                if (offerData?.selected_audience.includes('female')) {
                    valueToCheck.push(
                        {
                            name: "women",
                            message: "Please female adults age",
                            type: 'string',
                            id: 'women'
                        },
                        {
                            name: "ratio_w",
                            message: "Please select female ratio",
                            type: 'string',
                            id: 'ratio_w'
                        }
                    )
                }
                if (offerData?.selected_audience.includes('kids')) {
                    valueToCheck.push(
                        {
                            name: "kid",
                            message: "Please kid adults age",
                            type: 'string',
                            id: 'kid'
                        },
                        {
                            name: "ratio_k",
                            message: "Please select kid's ratio",
                            type: 'string',
                            id: 'ratio_k'
                        }
                    )
                }

                console.log(valueToCheck)

                check = validForm(valueToCheck, offerData)
                console.log(check, "4")

                if (check) {
                    const count = Number(offerData?.ratio_m) + Number(offerData?.ratio_w) + Number(offerData?.ratio_k)
                    console.log(count)
                    if (count === 100) {
                        check = true
                    } else {
                        toast.error("Ratio total should be 100 percent")
                        check = false
                    }
                }
                console.log("false", check)
                if (check) {
                    const valueToCheck = [
                        {
                            name: "main_categories",
                            message: "Please select a category",
                            type: 'string',
                            id: 'main_categories'
                        },
                        {
                            name: "sub_categories",
                            message: "Please select a sub category",
                            type: 'string',
                            id: 'sub_categories'
                        }
                    ]
                    check = validForm(valueToCheck, offerData)
                }
            } else {
                const valueToCheck = [
                    {
                        name: "min_spend_val",
                        message: "Please enter min spend val",
                        type: 'string',
                        id: 'min_spend_val'
                    },
                    {
                        name: "max_spend_val",
                        message: "Please enter max spend val",
                        type: 'string',
                        id: 'max_spend_val'
                    }
                ]
                check = validForm(valueToCheck, offerData)

            }
        } else if (curStep === 5) {
            const valueToCheck = [
                {
                    name: "offer_title",
                    message: "Please enter offer title",
                    type: 'string',
                    id: 'offer_title'
                },
                {
                    name: "offer_description",
                    message: "Please enter offer description",
                    type: 'string',
                    id: 'offer_description'
                },
                {
                    name: "tnc",
                    message: "Please enter terms and condition",
                    type: 'string',
                    id: 'tnc'
                },
                {
                    name: "call_to_action",
                    message: "Please select a call to action",
                    type: 'string',
                    id: 'call_to_action'
                },
                {
                    name: "call_to_action_url",
                    message: "Please select a call to action url",
                    type: 'string',
                    id: 'call_to_action_url'
                }
            ]
            check = validForm(valueToCheck, offerData)
            // if (check && type ) {
            //     saveOfferData(type)
            // }
        }

        if (check) {
            if (curStep === 5 && type) {
                saveOfferData(type)
                return
            }
            if (count) {
                setCurStep(count)
            }
        }

        // const main = false
        // if (main) {
        //     saveOfferData()
        // }
    }

    // console.log({ discount_code: offerData?.discount_code })

    return (
        <>
            {
                apiLoader ? <FrontBaseLoader /> : ''
            }
            <div className="container">
                {/* <Card>
                    <CardBody>
                        <h4>Create Campaign</h4>
                    </CardBody>
                </Card> */}
                <div className="row">
                    <div className="col-xl-2">
                        <Card>
                            <CardBody>

                                {
                                    offerId ? <>
                                        <div style={{ marginBottom: '25px' }}>
                                            <div className={`step d-flex justify-content-start align-items-center ${curStep === 4 && "tab_active"}`} style={{ gap: `10px`, cursor: "pointer" }} onClick={() => checkVaid("", 4)}>
                                                <div className="number_count">1</div>
                                                <h6 style={{ margin: "0px" }}>Recipients</h6>
                                            </div>
                                        </div>

                                        <div style={{ marginBottom: '25px' }}>
                                            <div className={`step d-flex justify-content-start align-items-center ${curStep === 5 && "tab_active"}`} style={{ gap: `10px`, cursor: "pointer" }} onClick={() => checkVaid("", 5)}>
                                                <div className="number_count">2</div>
                                                <h6 style={{ margin: "0px" }}>Offer Content</h6>
                                            </div>
                                        </div>
                                    </> : <>
                                        <div style={{ marginBottom: '25px' }}>
                                            <div className={`step d-flex justify-content-start align-items-center ${curStep === 1 && "tab_active"}`} style={{ gap: `10px`, cursor: "pointer" }} onClick={() => checkVaid("", 1)}>
                                                <div className="number_count">1</div>
                                                <h6 style={{ margin: "0px" }}>Create Offer</h6>
                                            </div>
                                        </div>
                                        <div style={{ marginBottom: '25px' }}>
                                            <div className={`step d-flex justify-content-start align-items-center ${curStep === 2 && "tab_active"}`} style={{ gap: `10px`, cursor: "pointer" }} onClick={() => checkVaid("", 2)}>
                                                <div className="number_count">2</div>
                                                <h6 style={{ margin: "0px" }}>Cart Conditions</h6>
                                            </div>
                                        </div>
                                        {/* <div style={{marginBottom: '25px'}}>
                                        <div className={`step d-flex justify-content-start align-items-center ${curStep === 3 && "tab_active"}`} style={{gap: `10px`, cursor: "pointer"}} onClick={() => setCurStep(3)}>
                                            <div className="number_count">3</div>
                                            <h6 style={{margin: "0px"}}>Set Condition</h6>
                                        </div>
                                    </div> */}
                                        <div style={{ marginBottom: '25px' }}>
                                            <div className={`step d-flex justify-content-start align-items-center ${curStep === 3 && "tab_active"}`} style={{ gap: `10px`, cursor: "pointer" }} onClick={() => checkVaid("", 3)}>
                                                <div className="number_count">3</div>
                                                <h6 style={{ margin: "0px" }}>Offer Duration</h6>
                                            </div>
                                        </div>

                                        <div style={{ marginBottom: '25px' }}>
                                            <div className={`step d-flex justify-content-start align-items-center ${curStep === 4 && "tab_active"}`} style={{ gap: `10px`, cursor: "pointer" }} onClick={() => checkVaid("", 4)}>
                                                <div className="number_count">4</div>
                                                <h6 style={{ margin: "0px" }}>Recipients</h6>
                                            </div>
                                        </div>

                                        <div style={{ marginBottom: '25px' }}>
                                            <div className={`step d-flex justify-content-start align-items-center ${curStep === 5 && "tab_active"}`} style={{ gap: `10px`, cursor: "pointer" }} onClick={() => checkVaid("", 5)}>
                                                <div className="number_count">5</div>
                                                <h6 style={{ margin: "0px" }}>Offer Content</h6>
                                            </div>
                                        </div>
                                    </>

                                }

                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-xl-6 mb-3">

                        {
                            curStep === 1 ? <>
                                <Card>
                                    <CardBody>
                                        <h4>Offer Purpose</h4>
                                        <div className="xircls_radio">
                                            <div className='mt-1'>
                                                <input
                                                    type='radio'
                                                    name="offer_type"
                                                    id="acquisition"
                                                    checked={offerData?.offer_type === "ACQ"}
                                                    value="ACQ"
                                                    onChange={(e) => updateOfferData(e)}
                                                />
                                                <label htmlFor='acquisition' className="d-flex justify-content-start align-items-start" style={{ gap: '3px' }}>Acquisition <span style={{ cursor: 'pointer', display: 'flex' }} title='Reward customers of other outlets. Get 100% genuine reach & engagement'><Info size={'10'} /></span></label>
                                                {/* <div>

                                                    <label htmlFor="acquisition">Acquisition</label>
                                                    <span
                                                        className=""
                                                        title={''}
                                                        
                                                    >
                                                        <Info size={} />
                                                    </span>
                                                </div> */}

                                            </div>
                                            <div className='mt-1'>
                                                <input
                                                    type='radio'
                                                    name="offer_type"
                                                    id="Retention"
                                                    checked={offerData?.offer_type === "RET"}
                                                    value="RET"
                                                    onChange={(e) => updateOfferData(e)}
                                                />
                                                <label htmlFor='Retention' className="d-flex justify-content-start align-items-start" style={{ gap: '3px' }}>Retention <span style={{ cursor: 'pointer', display: 'flex' }} title='Reward your own customers. Increase repeat purchases & cultivate loyalty'><Info size={'10'} /></span></label>

                                                {/* <label htmlFor="Retention">Retention</label> */}
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>

                                <Card>
                                    <CardBody>
                                        <div className="d-flex justify-content-between align-items-center mb-1">
                                            <h4>Discount Code</h4>
                                            {offerData?.discount_type === "file" && <a href={downloadFile} download={"sample"} className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1">Download Sample<Download size={12} /></a>}
                                        </div>
                                        <div className="d-flex align-items-center gap-2 xircls_radio">
                                            <div className="d-flex align-items-center gap-1">
                                                <input
                                                    type='radio'
                                                    name="discount_type"
                                                    id="enterCoupon"
                                                    value="code"
                                                    checked={offerData?.discount_type === "code"}
                                                    onChange={(e) => updateOfferData(e)} />
                                                <label htmlFor='enterCoupon' className="d-flex justify-content-start align-items-start" style={{ gap: '3px' }}>Enter a Coupon</label>
                                            </div>
                                            <div className="d-flex align-items-center gap-1">
                                                <input
                                                    type='radio'
                                                    name="discount_type"
                                                    id="uploadCoupon"
                                                    value="file"
                                                    checked={offerData?.discount_type === "file"}
                                                    onChange={(e) => updateOfferData(e)} />
                                                <label htmlFor='uploadCoupon' className="d-flex justify-content-start align-items-start" style={{ gap: '3px' }}>Upload your unique code <span style={{ cursor: 'pointer', display: 'flex' }} title='File must be in .csv format'><Info size={'10'} /></span></label>
                                            </div>
                                        </div>
                                        {offerData?.discount_type === "code" ? (
                                            <div className="input_div mt-1">
                                                <div className="row">
                                                    <div className="col-md-8">
                                                        <label htmlFor="">Code</label>
                                                        <input placeholder="Discount Code" type="text" className="w-100 from-control-offer" name='discount_code' onChange={(e) => updateOfferData(e)} value={offerData?.discount_code} />
                                                        <p id="discount_code_val" className="text-danger m-0 p-0 vaildMessage"></p>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <button style={{ marginTop: `20px` }} onClick={() => setOfferData({ ...offerData, discount_code: Math.random().toString(36).substring(2, 16).toUpperCase() })} className="btn btn-primary w-100">Generate Code</button>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="input_div mt-1">
                                                <div className="row">
                                                    <div className="col-md-12" >
                                                        <p id="discount_code_val" className="text-danger m-0 p-0 vaildMessage"></p>
                                                        <label htmlFor='unicodeUpload' className="btn btn-primary waves-effect waves-float waves-light cursor-pointer">Click to upload</label>
                                                        <input type="file" onChange={(e) => setOfferData({ ...offerData, discount_code: e.target.files[0] })} id='unicodeUpload' accept='.csv' hidden  />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </CardBody>
                                </Card>

                                <Card>
                                    <CardBody>
                                        <h4>Offer Type</h4>
                                        <div className="xircls_radio">
                                            <div className='mt-1'>
                                                <input
                                                    type='radio'
                                                    name="method"
                                                    id="orderOff"
                                                    checked={offerData?.method === "amount"}
                                                    value="amount"
                                                    onChange={(e) => updateOfferData(e)}
                                                />
                                                <label htmlFor="orderOff">Discount on Total Order Value</label>
                                            </div>

                                            <div className='mt-1'>
                                                <input
                                                    type='radio'
                                                    name="method"
                                                    id="productOff"
                                                    checked={offerData?.method === "product"}
                                                    value="product"
                                                    onChange={(e) => updateOfferData(e)}
                                                />
                                                <label htmlFor="productOff">Discount on Select Products</label>
                                            </div>

                                            <div className='mt-1'>
                                                <input
                                                    type='radio'
                                                    name="method"
                                                    id="xyOff"
                                                    checked={offerData?.method === "BXBY"}
                                                    value="BXBY"
                                                    onChange={(e) => updateOfferData(e)}
                                                />
                                                <label htmlFor="xyOff">Buy X, Get Y</label>
                                            </div>

                                        </div>
                                    </CardBody>
                                </Card>

                                {
                                    offerData?.method === "BXBY" ? '' : <>
                                        <Card>
                                            <CardBody>
                                                <h4>Discount Value Type</h4>
                                                <div className="xircls_radio">
                                                    <div className='mt-1'>
                                                        <input
                                                            type='radio'
                                                            name="offer_value_type"
                                                            id="percent"
                                                            checked={offerData?.offer_value_type === 'percent'}
                                                            value='percent'
                                                            onChange={(e) => updateOfferData(e)}
                                                        />
                                                        <label htmlFor="percent">Percentage Off</label>
                                                    </div>

                                                    <div className='mt-1'>
                                                        <input
                                                            type='radio'
                                                            name="offer_value_type"
                                                            id="flat"
                                                            checked={offerData?.offer_value_type === 'flat'}
                                                            value='flat'
                                                            onChange={(e) => updateOfferData(e)}
                                                        />
                                                        <label htmlFor="flat">Flat Amount Off</label>
                                                    </div>
                                                </div>
                                                <div className="input_div mt-1">
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <label htmlFor="">Discount amount</label> <br />
                                                            <div className="position-relative">
                                                                <input type="text" style={{ paddingLeft: offerData?.offer_value_type === 'flat' ? '2rem' : '0.55rem' }} className="w-50 from-control-offer" name='offer_value' onChange={(e) => {
                                                                    console.log(isNaN(e.target.value))
                                                                    if (!isNaN(e.target.value)) {
                                                                        offerData?.offer_value_type === 'flat' ? updateOfferData(e) : setOfferData({ ...offerData, offer_value: Number(e.target.value) > 99 ? "99" : e.target.value })
                                                                    } else {
                                                                        console.log("ppp")
                                                                    }
                                                                }} value={offerData?.offer_value} />

                                                                {offerData?.offer_value_type === 'flat' ? <span className='position-absolute top-50 start-0 translate-middle-y ms-1'>{userPermission?.currencySymbol}</span> : <span className='position-absolute top-50 end-50 translate-middle-y me-1'>%</span>}

                                                            </div>
                                                            <p id="offer_value_val" className="text-danger m-0 p-0 vaildMessage"></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </>
                                }

                                {
                                    offerData?.method === "product" ? <>
                                        <Card>
                                            <CardBody>
                                                <h4 className='subCardTitle'>Apply To</h4>
                                                <div className="xircls_radio mb-1">
                                                    <div>
                                                        <input
                                                            type='radio'
                                                            name="typeOffApply"
                                                            id="collections"
                                                            checked={offerData?.typeOffApply === 'collections'}
                                                            value='collections'
                                                            onChange={(e) => updateOfferData(e)}
                                                        />
                                                        <label for="collections">Collection/s</label>
                                                    </div>

                                                    <div className='mt-1'>
                                                        <input
                                                            type='radio'
                                                            name="typeOffApply"
                                                            id="products"
                                                            checked={offerData?.typeOffApply === 'products'}
                                                            value='products'
                                                            onChange={(e) => updateOfferData(e)}
                                                        />
                                                        <label for="products">Product/s</label>
                                                    </div>
                                                </div>

                                                <div>


                                                    {
                                                        offerData?.typeOffApply === 'collections' ? <Select
                                                            isMulti={true}
                                                            options={collectionList}
                                                            inputId="aria-example-input"
                                                            closeMenuOnSelect={true}
                                                            name="customer_collection_list"
                                                            placeholder="Add Collection/s"
                                                            value={collectionList.filter(option => offerData?.customer_collection_list?.includes(option.value))}
                                                            onChange={(value, actionMeta) => handleChange(value, actionMeta, true)}
                                                        /> : <Select
                                                            isMulti={true}
                                                            options={productList}
                                                            inputId="aria-example-input"
                                                            closeMenuOnSelect={true}
                                                            name="customer_buys_list"
                                                            placeholder="Add Product/s"
                                                            value={productList.filter(option => offerData?.customer_buys_list.includes(option.value))}
                                                            onChange={(value, actionMeta) => handleChange(value, actionMeta, true)}
                                                        />
                                                    }
                                                    <p id="applyToList_val" className="text-danger m-0 p-0 vaildMessage"></p>

                                                </div>

                                                {/* <SelectElement placeholder="Select" options={productList} setSelectedOptions={setcustomerGet} isMulti={false} /> */}
                                            </CardBody>
                                        </Card>

                                    </> : offerData?.method === "BXBY" ? <>
                                        <Card>
                                            <CardBody>
                                                <h4>Product & Discount Value Type</h4>
                                                <p>Specify cart conditions in the next section</p>
                                                <div className="row mt-1">
                                                    <div className="col-4">
                                                        <label>Quantity</label>
                                                        <input type="text" className="w-100 from-control-offer" name='customer_gets_value' onChange={(e) => updateOfferData(e)} value={offerData?.customer_gets_value} placeholder="" />
                                                        <p id="customer_gets_value_val" className="text-danger m-0 p-0 vaildMessage"></p>

                                                    </div>
                                                    <div className='col-8'>
                                                        <label htmlFor="custGets">Any item from</label>
                                                        <Select
                                                            isMulti={false}
                                                            options={BXType}
                                                            inputId="aria-example-input"
                                                            closeMenuOnSelect={true}
                                                            name="BXBY_Type"
                                                            value={BXType.filter(option => offerData?.BXBY_Type?.includes(option.value))}
                                                            onChange={(value, actionMeta) => handleChange(value, actionMeta, false)}
                                                        />
                                                    </div>
                                                    <div className="col-12 mt-2">
                                                        {
                                                            offerData?.BXBY_Type === "product" ? <>
                                                                <label htmlFor="custGets">Applies to</label>
                                                                <Select
                                                                    isMulti={true}
                                                                    options={productList}
                                                                    inputId="aria-example-input"
                                                                    closeMenuOnSelect={true}
                                                                    name="customer_gets_list"
                                                                    placeholder="Add Product/s"
                                                                    value={productList.filter(option => offerData?.customer_gets_list.includes(option.value))}
                                                                    onChange={(value, actionMeta) => handleChange(value, actionMeta, true)}
                                                                />
                                                            </> : <>
                                                                <label htmlFor="custGets">Applies to</label>
                                                                <Select
                                                                    isMulti={true}
                                                                    options={collectionList}
                                                                    inputId="aria-example-input"
                                                                    closeMenuOnSelect={true}
                                                                    name="customer_gets_collection_list"
                                                                    placeholder="Add Collection/s"
                                                                    value={collectionList.filter(option => offerData?.customer_gets_collection_list?.includes(option.value))}
                                                                    onChange={(value, actionMeta) => handleChange(value, actionMeta, true)}
                                                                />
                                                            </>
                                                        }
                                                        <p id="customer_gets_list_val" className="text-danger m-0 p-0 vaildMessage"></p>

                                                    </div>
                                                    <hr className='my-1' />
                                                    <div className="row">
                                                        <h6>Discount Amount</h6>
                                                        <div className="xircls_radio">
                                                            <div className='mt-1'>
                                                                <input
                                                                    type='radio'
                                                                    checked={offerData?.customer_gets_discount_type === "PERCENT"}
                                                                    id="percent"
                                                                    name="customer_gets_discount_type"
                                                                    value="PERCENT"
                                                                    onChange={(e) => updateOfferData(e)}
                                                                />
                                                                <label htmlFor="percent">Percentage</label>
                                                            </div>
                                                            <div className='mt-1'>
                                                                <input
                                                                    type='radio'
                                                                    checked={offerData?.customer_gets_discount_type === "FREE"}
                                                                    id="free"
                                                                    name="customer_gets_discount_type"
                                                                    value="FREE"
                                                                    onChange={(e) => updateOfferData(e)}
                                                                />
                                                                <label htmlFor="free">Free</label>
                                                            </div>
                                                        </div>

                                                        {
                                                            offerData?.customer_gets_discount_type === "PERCENT" ? <>
                                                                <div className="input_div mt-1">
                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <input placeholder="%" type="text" className="w-50 from-control-offer" name='customer_gets_discount_value' onChange={(e) => {
                                                                                if (!isNaN(e.target.value)) {
                                                                                    setOfferData({ ...offerData, customer_gets_discount_value: Number(e.target.value) > 99 ? "99" : e.target.value })
                                                                                    // updateOfferData(e)
                                                                                }
                                                                            }} value={offerData?.customer_gets_discount_value} />
                                                                            <p id="customer_gets_discount_value_val" className="text-danger m-0 p-0 vaildMessage"></p>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </> : ""
                                                        }
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </> : ''
                                }

                            </> : curStep === 2 ? <>
                                {
                                    offerData?.method === "BXBY" ? <>
                                        <Card>
                                            <CardBody>
                                                <h4>This offer applies when customer buys</h4>
                                                <div className="xircls_radio">
                                                    <div className='mt-1'>
                                                        <input
                                                            type='radio'
                                                            checked={offerData?.customer_buys === "ITEMS"}
                                                            id="minItems"
                                                            name="customer_buys"
                                                            value="ITEMS"
                                                            onChange={(e) => updateOfferData(e)}
                                                        />
                                                        <label htmlFor="minItems">Minimum quantity of items</label>
                                                    </div>
                                                    <div className='mt-1'>
                                                        <input
                                                            type='radio'
                                                            checked={offerData?.customer_buys === "AMT"}
                                                            id="minAmount"
                                                            name="customer_buys"
                                                            value="AMT"
                                                            onChange={(e) => updateOfferData(e)}
                                                        />
                                                        <label htmlFor="minAmount">Minimum purchase amount</label>
                                                    </div>
                                                </div>
                                                <div className="row mt-1">
                                                    <div className="col-4">
                                                        <label htmlFor="">{offerData?.customer_buys === "ITEMS" ? "Quantity" : "Amount"}</label>
                                                        <input type="text" className="w-100 from-control-offer" name='cart_value' onChange={(e) => updateOfferData(e)} value={offerData?.cart_value} placeholder={offerData?.customer_buys === "ITEMS" ? "0" : `${userPermission?.currencySymbol} 0.00`} />
                                                        <p id="cart_value_val" className="text-danger m-0 p-0 vaildMessage"></p>

                                                    </div>
                                                    <div className="col-8">
                                                        <label htmlFor="applysTO">Any items from</label>
                                                        <Select
                                                            isMulti={false}
                                                            options={BXType}
                                                            inputId="aria-example-input"
                                                            closeMenuOnSelect={true}
                                                            name="BXBY_Buy_Type"
                                                            value={BXType.filter(option => offerData.BXBY_Buy_Type?.includes(option.value))}
                                                            onChange={(value, actionMeta) => handleChange(value, actionMeta, false)}
                                                        />
                                                        {/* <label htmlFor="applysTO">Applies To Which Products</label>
                                                        <Select
                                                            isMulti={true}
                                                            options={productList}
                                                            inputId="aria-example-input"
                                                            closeMenuOnSelect={true}
                                                            name="customer_buys_list"
                                                            placeholder="Add Product"
                                                            value={productList.filter(option => offerData?.customer_buys_list.includes(option.value))}
                                                            onChange={(value, actionMeta) => handleChange(value, actionMeta, true)}
                                                        /> */}
                                                        {/* <SelectElement placeholder="Select" options={productList} setSelectedOptions={setCustomerBuy} isMulti={false} /> */}
                                                        

                                                    </div>
                                                    <div className="col-12 mt-3">
                                                        {
                                                            offerData.BXBY_Buy_Type === "product" ? <>
                                                                <label htmlFor="applysTO">Applies To Which Product/s</label>
                                                                <Select
                                                                    isMulti={true}
                                                                    options={productList}
                                                                    inputId="aria-example-input"
                                                                    closeMenuOnSelect={true}
                                                                    name="customer_buys_list"
                                                                    placeholder="Add Product/s"
                                                                    value={productList.filter(option => offerData.customer_buys_list.includes(option.value))}
                                                                    onChange={(value, actionMeta) => handleChange(value, actionMeta, true)}
                                                                />

                                                            </> : <>
                                                                <label htmlFor="custGets">Applies To Which Collection/s</label>
                                                                <Select
                                                                    isMulti={true}
                                                                    options={collectionList}
                                                                    inputId="aria-example-input"
                                                                    closeMenuOnSelect={true}
                                                                    name="customer_buys_collection_list"
                                                                    placeholder="Add Collection/s"
                                                                    value={collectionList.filter(option => offerData.customer_buys_collection_list?.includes(option.value))}
                                                                    onChange={(value, actionMeta) => handleChange(value, actionMeta, true)}
                                                                />

                                                            </>
                                                        }
                                                        <p id="bxgyList_val" className="text-danger m-0 p-0 vaildMessage"></p>
                                                        {/* <SelectElement placeholder="Select" options={productList} setSelectedOptions={setCustomerBuy} isMulti={false} /> */}
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Card>

                                    </> : <>
                                        <Card>
                                            <CardBody>
                                                <h4 className='subCardTitle'>Cart Conditions</h4>
                                                <div className="xircls_radio">
                                                    <div className='mt-1'>
                                                        <input
                                                            type='radio'
                                                            name="cart_condition"
                                                            id="noCondition"
                                                            checked={offerData?.cart_condition === "NO_REQ"}
                                                            value="NO_REQ"
                                                            onChange={(e) => updateOfferData(e)}
                                                        />
                                                        <label htmlFor="noCondition">No conditions</label>
                                                    </div>

                                                    <div className='mt-1'>
                                                        <input
                                                            type='radio'
                                                            name="cart_condition"
                                                            id="pCondition"
                                                            checked={offerData?.cart_condition === "AMT"}
                                                            value="AMT"
                                                            onChange={(e) => updateOfferData(e)}
                                                        />
                                                        <label htmlFor="pCondition">Purchase amount of items in the cart</label>
                                                        {
                                                            offerData?.cart_condition === "AMT" ? <>
                                                                <div className="input_div mt-1" style={{ marginLeft: '20px' }}>
                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <input type="text" placeholder={`${userPermission?.currencySymbol} 0.00`} className="w-50 from-control-offer" name='cart_value' onChange={(e) => {
                                                                                if (!isNaN(e.target.value)) {
                                                                                    updateOfferData(e)
                                                                                }
                                                                            }} value={offerData?.cart_value} />
                                                                            <p id="cart_value_val" className="text-danger m-0 p-0 vaildMessage"></p>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </> : ""
                                                        }

                                                    </div>

                                                    <div className='mt-1'>
                                                        <input
                                                            type='radio'
                                                            name="cart_condition"
                                                            id="ncCondition"
                                                            checked={offerData?.cart_condition === "ITEMS"}
                                                            value="ITEMS"
                                                            onChange={(e) => updateOfferData(e)}
                                                        />
                                                        <label htmlFor="ncCondition">Number of items in cart</label>
                                                        {
                                                            offerData?.cart_condition === "ITEMS" ? <>
                                                                <div className="input_div mt-1" style={{ marginLeft: '20px' }}>
                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <input type="text" placeholder='0' className="w-50 from-control-offer" name='cart_value' onChange={(e) => {
                                                                                if (!isNaN(e.target.value)) {
                                                                                    updateOfferData(e)

                                                                                }
                                                                            }} value={offerData?.cart_value} />
                                                                            <p id="cart_value_val" className="text-danger m-0 p-0 vaildMessage"></p>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </> : ""
                                                        }
                                                    </div>

                                                </div>
                                            </CardBody>
                                        </Card>
                                    </>
                                }

                            </> : curStep === 3 ? <>

                                <Card>
                                    <CardBody>
                                        <h4 >Set Offer Duration</h4>
                                        <div className="active_date row mb-1">

                                            <div className="active_date" style={{ display: `flex`, justifyContent: `space-between`, alignItems: "center" }}>
                                                <div className="form-group" style={{ flexBasis: "48%" }}>
                                                    <label htmlFor="start_date">Offer Active From:</label>
                                                    <div>
                                                        <Flatpickr options={{ minDate: "today", dateFormat: "Y-m-d" }} onChange={(e) => setOfferData({ ...offerData, start_date: moment(e[0]).format('YYYY-MM-DD') })} className='form-control' id='default-picker' value={offerData?.start_date} />
                                                        {/* <input type="date" id="start_date" value={offerData?.start_date} name="start_date" className="form-control" onChange={(e) => updateOfferData(e) } />  */}
                                                    </div>
                                                </div>

                                                {/* <div className="form-group" style={{flexBasis:"48%" }}>
                                                    <label htmlFor="start_time">Start Time:</label>
                                                    <div>
                                                        <Flatpickr options={{ noCalendar: true, enableTime: true, dateFormat: 'h:i K' }} onChange={(e) => setOfferData({...offerData, start_time: moment(e[0]).format('HH:mm')})} className='form-control' id='default-picker' value={offerData?.start_time} />
                                                        {/* <input type="time" id="start_time" name="start_time" value={offerData?.start_time} className="form-control" onChange={(e) => updateOfferData(e) } />  
                                                    </div>
                                                </div> */}

                                            </div>
                                        </div>
                                        <div>
                                            <div className='form-check form-check-primary my-2'>
                                                <Input type='checkbox' id='primary-checkbox' checked={offerData?.is_end_data} onChange={() => setOfferData({ ...offerData, is_end_data: !offerData?.is_end_data })} />
                                                <Label className='form-check-label' for='primary-checkbox'>
                                                    Set Offer Expiry Date
                                                </Label>
                                            </div>
                                            {/* <div className='form-check form-check-primary' style={{gap: '8px'}}>
                                                <input
                                                    type='checkbox'
                                                    id="setEndDate"
                                                    checked={offerData?.is_end_data}
                                                    onChange={() => setOfferData({...offerData, is_end_data : !offerData?.is_end_data})}
                                                />
                                                <label className='form-check-label' htmlFor="setEndDate">Set End Date ?</label>
                                            
                                            </div> */}
                                            {
                                                offerData?.is_end_data ? <>
                                                    <div className="active_date mt-1" style={{ display: `flex`, justifyContent: `space-between`, alignItems: "center" }}>
                                                        <div className="form-group" style={{ flexBasis: "48%" }}>
                                                            <label htmlFor="end_date">Offer Expiry Date:</label>
                                                            <div>
                                                                <Flatpickr options={{ minDate: "today", dateFormat: "Y-m-d" }} onChange={(e) => setOfferData({ ...offerData, end_date: moment(e[0]).format('YYYY-MM-DD') })} className='form-control' id='default-picker' value={offerData?.end_date} />

                                                                {/* <input type="date" id="end_date" name="end_date" className="form-control" value={offerData?.end_date} onChange={(e) => updateOfferData(e)} />  */}
                                                            </div>
                                                        </div>

                                                        {/* <div className="form-group" style={{flexBasis:"48%" }}>
                                                            <label htmlFor="end_time">End Time:</label>
                                                            <div>
                                                                <Flatpickr options={{ noCalendar: true, enableTime: true, dateFormat: 'h:i K' }} onChange={(e) => setOfferData({...offerData, end_time: moment(e[0]).format('HH:mm')})} className='form-control' id='default-picker' value={offerData?.end_time} />

                                                                {/* <input type="time" id="end_time" name="end_time" className="form-control" value={offerData?.end_time} onChange={(e) => updateOfferData(e)} /> 
                                                            </div>
                                                        </div> */}

                                                    </div>
                                                </> : ""
                                            }

                                        </div>
                                    </CardBody>
                                </Card>
                            </> : curStep === 4 ? <>
                                {
                                    offerData?.offer_type === "RET" ? '' : <>
                                        <Card>
                                            <CardBody>
                                                <h4 className='mb-1'>Select your Intended Audience</h4>
                                                <div className='location d-flex justify-content-start align-items-center gap-2'>
                                                    <div className='form-check form-check-primary mb-2'>
                                                        <Input
                                                            type='checkbox'
                                                            id='male'
                                                            name='selected_audience'
                                                            checked={offerData?.selected_audience?.includes('male')}
                                                            value={'male'}
                                                            onChange={(e) => setAudience(e)}
                                                        />
                                                        <Label className='form-check-label' for='male'>
                                                            Male Adults
                                                        </Label>
                                                    </div>

                                                    <div className='form-check form-check-primary mb-2'>
                                                        <Input
                                                            type='checkbox'
                                                            id='female'
                                                            name='selected_audience'
                                                            checked={offerData?.selected_audience?.includes('female')}
                                                            value={'female'}
                                                            onChange={(e) => setAudience(e)}
                                                        />
                                                        <Label className='form-check-label' for='female'>
                                                            Female Adults
                                                        </Label>
                                                    </div>

                                                    <div className='form-check form-check-primary mb-2'>
                                                        <Input
                                                            type='checkbox'
                                                            id='kids'
                                                            name='selected_audience'
                                                            checked={offerData?.selected_audience?.includes('kids')}
                                                            value={'kids'}
                                                            onChange={(e) => setAudience(e)}
                                                        />
                                                        <Label className='form-check-label' for='kids'>
                                                            Kids & Teens
                                                        </Label>
                                                    </div>

                                                </div>
                                                <p id="selected_audience_val" className="text-danger m-0 p-0 vaildMessage"></p>


                                                <UncontrolledAccordion defaultOpen={["1", "2", "3"]} className='border rounded' stayOpen>
                                                    {
                                                        offerData?.selected_audience?.includes("male") ? (
                                                            <AccordionItem className='bg-white'>
                                                                <AccordionHeader className='acc-header' targetId='1'>
                                                                    <p className='mb-0'>Male Adults</p>
                                                                </AccordionHeader>
                                                                <AccordionBody accordionId='1'>
                                                                    <div className="w-100 pb-1">
                                                                        <Select
                                                                            isMulti={true}
                                                                            options={Maleoptions}
                                                                            inputId="aria-example-input"
                                                                            closeMenuOnSelect={true}
                                                                            name="man"
                                                                            placeholder="Age"
                                                                            value={Maleoptions.filter(option => offerData?.man.includes(option.value))}
                                                                            onChange={(value, actionMeta) => handleChange(value, actionMeta, true)}
                                                                        />
                                                                        <p id="man_val" className="text-danger m-0 p-0 vaildMessage"></p>

                                                                    </div>
                                                                    <div className="w-100 pb-1">
                                                                        <Select
                                                                            isMulti={false}
                                                                            options={RatioList}
                                                                            inputId="aria-example-input"
                                                                            closeMenuOnSelect={true}
                                                                            name="ratio_m"
                                                                            placeholder="Ratio"
                                                                            value={RatioList.filter(option => offerData?.ratio_m === option.value)}
                                                                            onChange={(value, actionMeta) => handleChange(value, actionMeta, false)}
                                                                        />
                                                                        <p id="ratio_m_val" className="text-danger m-0 p-0 vaildMessage"></p>

                                                                    </div>
                                                                </AccordionBody>
                                                            </AccordionItem>
                                                        ) : ""
                                                    }

                                                    {
                                                        offerData?.selected_audience?.includes('female') ? (
                                                            <AccordionItem className='bg-white'>
                                                                <AccordionHeader className='acc-header' targetId='2'>
                                                                    <p className='mb-0'>Female Adults</p>
                                                                </AccordionHeader>
                                                                <AccordionBody accordionId='2'>
                                                                    <div className="w-100 pb-1">
                                                                        <Select
                                                                            isMulti={true}
                                                                            options={Maleoptions}
                                                                            inputId="aria-example-input"
                                                                            closeMenuOnSelect={true}
                                                                            name="women"
                                                                            placeholder="Age"
                                                                            value={Maleoptions.filter(option => offerData?.women.includes(option.value))}
                                                                            onChange={(value, actionMeta) => handleChange(value, actionMeta, true)}
                                                                        />
                                                                        <p id="women_val" className="text-danger m-0 p-0 vaildMessage"></p>

                                                                    </div>
                                                                    <div className="w-100 pb-1">
                                                                        <Select
                                                                            isMulti={false}
                                                                            options={RatioList}
                                                                            inputId="aria-example-input"
                                                                            closeMenuOnSelect={true}
                                                                            name="ratio_w"
                                                                            placeholder="Ratio"
                                                                            value={RatioList.filter(option => offerData?.ratio_w === option.value)}
                                                                            onChange={(value, actionMeta) => handleChange(value, actionMeta, false)}
                                                                        />
                                                                        <p id="ratio_w_val" className="text-danger m-0 p-0 vaildMessage"></p>

                                                                    </div>
                                                                </AccordionBody>
                                                            </AccordionItem>
                                                        ) : ""
                                                    }

                                                    {
                                                        offerData?.selected_audience?.includes('kids') ? (
                                                            <AccordionItem className='bg-white'>
                                                                <AccordionHeader className='acc-header' targetId='3'>
                                                                    <p className='mb-0'>Kids & Teens</p>
                                                                </AccordionHeader>
                                                                <AccordionBody accordionId='3'>
                                                                    <div className="w-100 pb-1">
                                                                        <Select
                                                                            isMulti={true}
                                                                            options={Kidoptions}
                                                                            inputId="aria-example-input"
                                                                            closeMenuOnSelect={true}
                                                                            name="kid"
                                                                            placeholder="Age"
                                                                            value={Kidoptions.filter(option => offerData?.kid.includes(option.value))}
                                                                            onChange={(value, actionMeta) => handleChange(value, actionMeta, true)}
                                                                        />
                                                                        <p id="kid_val" className="text-danger m-0 p-0 vaildMessage"></p>
                                                                    </div>
                                                                    <div className="w-100 pb-1">
                                                                        <Select
                                                                            isMulti={false}
                                                                            options={RatioList}
                                                                            inputId="aria-example-input"
                                                                            closeMenuOnSelect={true}
                                                                            name="ratio_k"
                                                                            placeholder="Ratio"
                                                                            value={RatioList.filter(option => offerData?.ratio_k === option.value)}
                                                                            onChange={(value, actionMeta) => handleChange(value, actionMeta, false)}
                                                                        />
                                                                        <p id="ratio_k_val" className="text-danger m-0 p-0 vaildMessage"></p>

                                                                    </div>
                                                                </AccordionBody>
                                                            </AccordionItem>
                                                        ) : ""
                                                    }

                                                </UncontrolledAccordion>

                                                <h6 className='mt-2'><b>Note</b>- This offer will be issued on priority, but not exclusively, to the audience you’ve defined above.</h6>
                                            </CardBody>
                                        </Card>
                                    </>
                                }


                                {
                                    offerData?.offer_type === "RET" ? <>
                                        <Card>
                                            <CardBody>
                                                <h4>Issuance Range</h4>
                                                <div className="row">
                                                    <div className="col-6">
                                                        <label htmlFor="min_value">Min Value</label> <br />
                                                        <input type="text" placeholder='0.00' className="from-control-offer" name='min_spend_val' onChange={(e) => {
                                                            if (!isNaN(e.target.value)) {
                                                                updateOfferData(e)
                                                            }
                                                        }} value={offerData?.min_spend_val} />
                                                        <p id="min_spend_val_val" className="text-danger m-0 p-0 vaildMessage"></p>

                                                    </div>
                                                    <div className="col-6">
                                                        <label htmlFor="max_value">Max Value</label> <br />
                                                        <input type="text" placeholder='0.00' className="from-control-offer" name='max_spend_val' onChange={(e) => {
                                                            if (!isNaN(e.target.value)) {
                                                                updateOfferData(e)
                                                            }
                                                        }} value={offerData?.max_spend_val} />
                                                        <p id="max_spend_val_val" className="text-danger m-0 p-0 vaildMessage"></p>

                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </> : ""
                                }

                                {
                                    offerData?.offer_type === "RET" ? '' : <>
                                        <Card>
                                            <CardBody>
                                                <h4>They commonly shop in these categories</h4>
                                                {/* <div className='d-flex justify-content-between align-items-center'>
                                                    <a className='btn-sm btn btn-outline-secondary'>Select all</a>
                                                </div> */}
                                                <div className='col-12 noscroller' style={{ height: `300px`, overflow: 'auto', padding: '10px 15px' }}>
                                                    <div className="d-flex just-content-start align-items-start flex-wrap gap-2">
                                                        {
                                                            catData.length > 0 ? catData.map((cur, i) => {
                                                                return <div className={`cursor-pointer ${offerData?.main_categories.includes(cur.id) ? "active_parent_card" : ""}`} key={i} style={{ padding: `15px 20px`, borderRadius: '5px', boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px` }} id={`offer_parent_${cur.id}`} onClick={(e) => SelectedCard(e, `${cur.id}`)}>
                                                                    <h6 className='m-0'>{cur.name}</h6>
                                                                </div>

                                                            }) : <>
                                                                <h5 className='text-center'>Categories not found</h5>
                                                            </>
                                                        }
                                                    </div>
                                                </div>
                                                <p id="main_categories_val" className="text-danger m-0 p-0 vaildMessage"></p>

                                            </CardBody>
                                        </Card>
                                    </>
                                }

                                {
                                    offerData?.offer_type !== "RET" && offerData?.main_categories.length > 0 ? <>
                                        <Card>
                                            <CardBody>
                                                <h4 className='mb-1'>Sub Categories</h4>

                                                <div className='col-12 noscroller' style={{ height: `300px`, overflow: 'auto', padding: '0px' }}>
                                                    <div>
                                                        {/* {
                                                            subCategories ? subCategories.filter((curElem) => {
                                                                return offerData?.main_categories.includes(curElem.parent_id)
                                                            }).map((cur, i) => {
                                                                return <div className='cursor-pointer' key={i} style={{padding: `15px 20px`, borderRadius: '5px', boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`}} id={`offer_subParent_${cur.id}`} onClick={(e) => SelectedSubCard(e, `${cur.id}`) }>
                                                                        <h6 className='m-0'>{cur.name}</h6>
                                                                    </div>
                                                                
                                                            }) : ""
                                                        } */}

                                                        {
                                                            subCategories ? offerData?.main_categories.map((curElem) => {
                                                                return catData?.map((cur) => {
                                                                    if (cur.id === curElem) {
                                                                        return <div className='mb-2'>
                                                                            <div style={{ position: 'sticky', top: '0px', left: '0px', background: '#fff', padding: '0px 10px 10px', borderBottom: '1px solid #ccc', marginBottom: '10px' }} className='d-flex justify-content-between align-items-center'>
                                                                                <h5 className='m-0'>{cur.name}</h5>
                                                                                <a className='btn-sm btn btn-outline-secondary' onClick={() => {
                                                                                    const newSelect = []
                                                                                    subCategories.filter((subCat) => {
                                                                                        if (curElem === subCat.parent_id) {
                                                                                            return subCat
                                                                                        }
                                                                                    }).filter((curElem) => {

                                                                                        if (offerData?.main_categories.includes(curElem.parent_id)) {
                                                                                            newSelect.push(curElem.id)
                                                                                        }
                                                                                    })
                                                                                    console.log(newSelect)
                                                                                    setOfferData({ ...offerData, sub_categories: [...offerData?.sub_categories, ...newSelect] })
                                                                                }}>
                                                                                    Select all
                                                                                </a>

                                                                            </div>
                                                                            {/* <hr /> */}
                                                                            <div className="d-flex just-content-start align-items-start flex-wrap gap-2">
                                                                                {
                                                                                    subCategories.map((subCat, i) => {
                                                                                        if (subCat.parent_id === curElem) {
                                                                                            return <div className={`cursor-pointer ${offerData?.sub_categories.includes(subCat.id) ? "active_parent_card" : ""}`} key={i} style={{ padding: `15px 20px`, borderRadius: '5px', boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px` }} id={`offer_subParent_${subCat.id}`} onClick={(e) => SelectedSubCard(e, `${subCat.id}`)}>
                                                                                                <h6 className='m-0'>{subCat.name}</h6>
                                                                                            </div>
                                                                                        }
                                                                                    })

                                                                                }

                                                                            </div>
                                                                        </div>

                                                                    }
                                                                })
                                                            }) : ""
                                                        }
                                                    </div>
                                                </div>
                                                <p id="sub_categories_val" className="text-danger m-0 p-0 vaildMessage"></p>

                                            </CardBody>
                                        </Card>
                                    </> : ""
                                }
                            </> : curStep === 5 ? <>
                                <Card>
                                    <CardBody>
                                        <h4 className='mb-0'>Offer Image</h4>
                                        <span style={{ fontSize: '12px' }} className='mb-1'>640px X 325px, PNG/JPEG/GIF;upto 100KB</span>
                                        <div className="d-flex gap-2 mb-2 align-items-center">
                                            <div className="w-75">
                                                <div className="main-wrapper d-flex justify-content-between align-items-center">
                                                    <div className="image-view">
                                                        <img className='image_viewer' width="200px" height="100px" src={imageUrl} alt="Your Logo" />
                                                    </div>
                                                    <div className="image-action d-flex justify-content-start align-items-center gap-1">
                                                        <input placeholder="Enter Your Outlet Name" type="file" className="w-100 d-none" name="offer_image" accept='image/jpeg, image/png, image/gif' id="offer_image" onChange={(e) => imageActions(e)} />
                                                        <label htmlFor="offer_image" className='btn btn-success'>
                                                            <Paperclip size={17} />
                                                        </label>
                                                        <label className='btn btn-danger' onClick={() => setImageUrl(waterMark)}>
                                                            <Trash size={17} />
                                                        </label>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>

                                <Card>
                                    <CardBody>
                                        <h4>Offer Details</h4>
                                        <div className="inputs mt-2">
                                            <label className="d-flex justify-content-start align-items-start" style={{ gap: '3px' }}>Offer Title <span style={{ cursor: 'pointer', display: 'flex' }} title='This is for your reference only. It will not be visible to end customers.'><Info size={'10'} /></span></label>
                                            <input name='offer_title' placeholder="25% off for Women 35+" type="text" className="w-100 from-control-offer" onChange={(e) => updateOfferData(e)} value={offerData?.offer_title} />
                                            <p id="offer_title_val" className="text-danger m-0 p-0 vaildMessage"></p>

                                        </div>
                                        <div className="inputs mt-2">
                                            <label htmlFor="">Offer Description</label>
                                            <textarea name='offer_description' placeholder='Enjoy 25% off on our entire collection of Shirts & Blazers!' type="text" className="w-100 from-control-offer" onChange={(e) => updateOfferData(e)} value={offerData?.offer_description} />
                                            <p id="offer_description_val" className="text-danger m-0 p-0 vaildMessage"></p>

                                        </div>
                                        <div className="inputs mt-2">
                                            <label htmlFor="">Terms & Conditions</label>
                                            <textarea name='tnc' type="text" className="w-100 from-control-offer" onChange={(e) => updateOfferData(e)} value={offerData?.tnc} />
                                            <p id="tnc_val" className="text-danger m-0 p-0 vaildMessage"></p>

                                        </div>
                                        <div className="inputs mt-2">
                                            <div className="row">
                                                <div className="col-6">
                                                    <label htmlFor="">Call to Action</label>
                                                    <Select
                                                        isMulti={false}
                                                        options={callToAction}
                                                        inputId="aria-example-input"
                                                        closeMenuOnSelect={true}
                                                        name="call_to_action"
                                                        value={callToAction.filter(option => offerData?.call_to_action === option.value)}
                                                        onChange={(value, actionMeta) => handleChange(value, actionMeta, false)}
                                                    />
                                                    <p id="call_to_action_val" className="text-danger m-0 p-0 vaildMessage"></p>

                                                </div>
                                                <div className="col-6">
                                                    <label htmlFor="">Call-to-Action URL</label>
                                                    <input name='call_to_action_url' type="text" className="w-100 from-control-offer" onChange={(e) => updateOfferData(e)} value={offerData?.call_to_action_url} />
                                                    <p id="call_to_action_url_val" className="text-danger m-0 p-0 vaildMessage"></p>

                                                </div>
                                            </div>
                                        </div>

                                    </CardBody>
                                </Card>
                            </> : ""
                        }

                        <div className="action_btn mt-2 d-flex justify-content-between align-items-center">
                            <a className='btn btn-outline-secondary' onClick={() => setCurStep(offerId ? curStep === 4 ? 4 : curStep - 1 : curStep === 1 ? 1 : curStep - 1)}>Back</a>
                            {/* <a className='btn btn-primary' onClick={curStep === 5 ? () => saveOfferData() : () => setCurStep(curStep + 1)}>{curStep === 5 ? "Save" : "Next" } </a> */}
                            <div className='d-flex justify-content-between align-items-center gap-1'>
                                <a className='btn btn-primary' onClick={() => checkVaid("save", curStep + 1)}>{curStep === 5 ? "Save" : "Next"} </a>

                                {
                                    curStep === 5 ? (
                                        <a className='btn btn-primary' onClick={() => checkVaid('save&close', curStep + 1)}>Save & Close</a>
                                    ) : ""
                                }

                            </div>


                        </div>
                    </div>
                    <div className="col-xl-4">
                        <Card>
                            <CardBody>
                                <h4>Summary</h4>
                                <hr />

                                <div className="summary">
                                    <h5 style={{ fontSize: '17px' }}>{offerData?.offer_type === "ACQ" ? "Acquisition" : offerData?.offer_type === "RET" ? "Retention" : "--"}</h5>
                                    <h5 style={{ fontSize: '17px' }}>
                                        {offerData?.discount_type === "file" ? offerData?.discount_code?.name : offerData?.discount_code ? offerData?.discount_code : "No discount code yet."}
                                    </h5>

                                    <div className="type mt-2">
                                        <h6 className='mb-1'>Type and method:</h6>
                                        <ul>
                                            <li style={{ fontSize: '16px', marginBottom: '8px' }}>{offerData?.method === "product" ? "Discount on Select Products" : offerData?.method === "amount" ? "Discount on Total Order Value" : "Buy X get Y"}</li>
                                            {
                                                offerData?.offer_value ? <li style={{ fontSize: '16px', marginBottom: '8px' }}>{offerData?.offer_value_type === "percent" ? `${offerData?.offer_value}% off` : `${userPermission?.currencySymbol}${offerData?.offer_value} off`}</li> : ""
                                            }

                                        </ul>

                                    </div>

                                    {
                                        offerData?.method === "product" ? <div className="type mt-2">
                                            <h6 className='mb-1'>Applies to {offerData?.typeOffApply}:</h6>
                                            {
                                                offerData?.customer_buys_list.length > 0 || offerData?.customer_collection_list.length > 0 ? (
                                                    <ul>
                                                        <li style={{ fontSize: '16px', marginBottom: '8px' }}>
                                                            {
                                                                offerData?.typeOffApply === "products" ? productData?.map((curElem, key) => {
                                                                    if (offerData?.customer_buys_list?.includes(curElem.id)) {
                                                                        return key + 1 === offerData?.customer_buys_list.length ? `${curElem.title}` : `${curElem.title}, `
                                                                    }
                                                                }) : collectionData.map((curElem, key) => {
                                                                    if (offerData?.customer_collection_list?.includes(curElem.id)) {
                                                                        return key + 1 === offerData?.customer_collection_list.length ? `${curElem.title}` : `${curElem.title}, `
                                                                    }
                                                                })
                                                            }

                                                        </li>

                                                    </ul>
                                                ) : ""
                                            }

                                        </div> : ""

                                    }

                                    {
                                        offerData?.method === "BXBY" ? <> <div className="type mt-2">
                                            <h6 className='mb-1'>Product/s & Discount Value Type:</h6>
                                            <ul>
                                                {
                                                    offerData?.customer_gets_value ? <li style={{ fontSize: '16px', marginBottom: '8px' }}>Quantity - {offerData?.customer_gets_value} </li> : ''
                                                }

                                                {
                                                    offerData?.customer_gets_list.length > 0 || offerData?.customer_gets_collection_list.length > 0 ? (
                                                        <li style={{ fontSize: '16px', marginBottom: '8px' }}>
                                                            {
                                                                offerData?.BXBY_Type === "product" ? productData?.map((curElem, key) => {
                                                                    if (offerData?.customer_gets_list?.includes(curElem.id)) {
                                                                        return key + 1 === offerData?.customer_gets_list.length ? `${curElem.title}` : `${curElem.title}, `
                                                                    }
                                                                }) : collectionData.map((curElem, key) => {
                                                                    if (offerData?.customer_gets_collection_list?.includes(curElem.id)) {
                                                                        return key + 1 === offerData?.customer_gets_collection_list.length ? `${curElem.title}` : `${curElem.title}, `
                                                                    }
                                                                })
                                                            }
                                                        </li>

                                                    ) : ''

                                                }
                                                {
                                                    offerData?.customer_gets_discount_type === "PERCENT" ? <li style={{ fontSize: '16px', marginBottom: '8px' }}>At a discounted value {offerData?.customer_gets_discount_value ? `of ${offerData?.customer_gets_discount_value}%` : 'percentage'}</li> : <>
                                                        <li style={{ fontSize: '16px', marginBottom: '8px' }}>For <span style={{ textTransform: "lowercase" }}>{offerData?.customer_gets_discount_type}</span> </li>
                                                    </>
                                                }

                                            </ul>

                                        </div>

                                            <div className="type mt-2">
                                                <h6 className='mb-1'>Applicable on Purchase:</h6>
                                                <ul>
                                                    {
                                                        <li style={{ fontSize: '16px', marginBottom: '8px' }}> {offerData?.customer_buys === "ITEMS" ? "Minimum quantity of items" : "Minimum purchase amount"} </li>
                                                    }

                                                    {
                                                        <li style={{ fontSize: '16px', marginBottom: '8px' }}>{offerData?.customer_buys === "ITEMS" ? `Items - ${offerData?.cart_value}` : `Amount - ${offerData?.cart_value}`}</li>
                                                    }

                                                    {
                                                        <li style={{ fontSize: '16px', marginBottom: '8px' }}>
                                                            {
                                                                offerData?.BXBY_Buy_Type === "product" ? productData?.map((curElem, key) => {
                                                                    if (offerData?.customer_buys_list?.includes(curElem.id)) {
                                                                        return key + 1 === offerData?.customer_buys_list.length ? `${curElem.title}` : `${curElem.title}, `
                                                                    }
                                                                }) : collectionData.map((curElem, key) => {
                                                                    if (offerData?.customer_buys_collection_list?.includes(curElem.id)) {
                                                                        return key + 1 === offerData?.customer_buys_collection_list.length ? `${curElem.title}` : `${curElem.title}, `
                                                                    }
                                                                })
                                                            }
                                                        </li>

                                                    }

                                                </ul>

                                            </div>

                                        </> : ""
                                    }

                                    <div className="type mt-2">
                                        <h6 className='mb-1'>Cart Conditions:</h6>
                                        <ul>

                                            {
                                                offerData?.total_limit ? <li style={{ fontSize: '16px', marginBottom: '8px' }}> This discount can be used {offerData?.cart_usage}</li> : ""
                                            }

                                            {
                                                offerData?.method === "BXBY" ? "" : <li style={{ fontSize: '16px', marginBottom: '8px' }}>{offerData?.cart_condition === "NO_REQ" ? "No conditions" : offerData?.cart_condition === "AMT" ? `Purchase ${userPermission?.currencySymbol}${offerData?.cart_value} of items in the cart` : `${offerData?.cart_value} items in cart `}</li>
                                            }
                                            {
                                                offerData?.per_cust_limit ? <li style={{ fontSize: '16px', marginBottom: '8px' }}> Limit to one use per customer</li> : ''
                                            }
                                        </ul>

                                    </div>

                                    <div className="type mt-2">
                                        <h6 className='mb-1'>Offer Duration:</h6>
                                        <ul>
                                            {
                                                offerData?.start_date ? <li style={{ fontSize: '16px', marginBottom: '8px' }}>Offer Active From - {offerData?.start_date}</li> : ""
                                            }
                                            {/* {
                                                offerData?.start_time ? <li style={{ fontSize: '16px', marginBottom: '8px' }}>Start Time - {offerData?.start_time}</li> : ""
                                            } */}


                                            {
                                                offerData?.is_end_data ? offerData?.end_date ? <li style={{ fontSize: '16px', marginBottom: '8px' }}>Offer Expiry Date - {offerData?.end_date}</li> : "" : ""
                                            }

                                            {/* {
                                                offerData?.is_end_data ? offerData?.end_time ? <li style={{ fontSize: '16px', marginBottom: '8px' }}>End Time - {offerData?.end_time}</li> : "" : ""
                                            } */}

                                        </ul>
                                    </div>
                                    <div className="type mt-2">
                                        <h6 className='mb-1'>Recipients:</h6>
                                        <ul>
                                            {
                                                offerData?.selected_audience?.includes("male") ? (
                                                    <>
                                                        {
                                                            offerData?.man.length > 0 ? <li style={{ fontSize: '16px', marginBottom: '8px' }}>Male Adults -
                                                                {
                                                                    offerData?.man?.map((cur, key) => {
                                                                        return key + 1 === offerData?.man.length ? `${cur}` : `${cur}, `
                                                                    })
                                                                }
                                                            </li> : ""
                                                        }
                                                        {
                                                            offerData?.ratio_m ? <li style={{ fontSize: '16px', marginBottom: '8px' }}>Male ratio - {offerData?.ratio_m} </li> : ""
                                                        }

                                                    </>
                                                ) : ""

                                            }

                                            {
                                                offerData?.selected_audience?.includes("female") ? (
                                                    <>
                                                        {
                                                            offerData?.women.length > 0 ? <li style={{ fontSize: '16px', marginBottom: '8px' }}>Female Adults -
                                                                {
                                                                    offerData?.women?.map((cur, key) => {
                                                                        return key + 1 === offerData?.women.length ? `${cur}` : `${cur}, `
                                                                    })
                                                                }
                                                            </li> : ""
                                                        }
                                                        {
                                                            offerData?.ratio_w ? <li style={{ fontSize: '16px', marginBottom: '8px' }}>Female ratio - {offerData?.ratio_w} </li> : ""
                                                        }

                                                    </>
                                                ) : ""

                                            }

                                            {
                                                offerData?.selected_audience?.includes("kids") ? (
                                                    <>
                                                        {
                                                            offerData?.kid.length > 0 ? <li style={{ fontSize: '16px', marginBottom: '8px' }}>Kids & Teens -
                                                                {
                                                                    offerData?.kid?.map((cur, key) => {
                                                                        return key + 1 === offerData?.kid.length ? `${cur}` : `${cur}, `
                                                                    })
                                                                }
                                                            </li> : ""
                                                        }
                                                        {
                                                            offerData?.ratio_k ? <li style={{ fontSize: '16px', marginBottom: '8px' }}>kid's ratio - {offerData?.ratio_k} </li> : ""
                                                        }

                                                    </>
                                                ) : ""

                                            }

                                            {
                                                offerData?.offer_type === "RET" ? (
                                                    <>
                                                        {
                                                            offerData?.min_spend_val ? <li style={{ fontSize: '16px', marginBottom: '8px' }}>Min Value - {offerData?.min_spend_val} </li> : ""
                                                        }

                                                        {
                                                            offerData?.max_spend_val ? <li style={{ fontSize: '16px', marginBottom: '8px' }}>Max Value - {offerData?.max_spend_val} </li> : ""
                                                        }
                                                    </>
                                                ) : ''
                                            }

                                            {
                                                offerData?.main_categories.length > 0 ? <li style={{ fontSize: '16px', marginBottom: '8px' }}>Categories - {
                                                    subCategories ? offerData?.main_categories.map((curElem) => {
                                                        return catData?.map((cur, key) => {
                                                            if (cur.id === curElem) {
                                                                return key + 1 === offerData?.main_categories.length ? `${cur.name}` : `${cur.name}, `
                                                            }
                                                        })

                                                    }) : ""
                                                } </li> : ""
                                            }

                                            {
                                                offerData?.sub_categories.length > 0 ? <li style={{ fontSize: '16px', marginBottom: '8px' }}>Sub Categories - {
                                                    subCategories ? offerData?.sub_categories.map((curElem) => {
                                                        return subCategories?.map((cur, key) => {
                                                            if (cur.id === curElem) {
                                                                return key + 1 === offerData?.sub_categories.length ? `${cur.name}` : `${cur.name}, `
                                                            }
                                                        })

                                                    }) : ""
                                                } </li> : ""
                                            }

                                        </ul>

                                    </div>

                                    <div className="type mt-2">
                                        <h6 className='mb-1'>Offer Content:</h6>
                                        <ul>
                                            {
                                                offerData?.offer_title ? <li style={{ fontSize: '16px', marginBottom: '8px' }}>Offer Title - {offerData?.offer_title} </li> : ""
                                            }

                                            {
                                                offerData?.offer_description ? <li style={{ fontSize: '16px', marginBottom: '8px' }}>Offer Description - {offerData?.offer_description} </li> : ""
                                            }

                                            {
                                                offerData?.tnc ? <li style={{ fontSize: '16px', marginBottom: '8px' }}>Terms and Condition - {offerData?.tnc} </li> : ""
                                            }

                                            {
                                                offerData?.call_to_action ? <li style={{ fontSize: '16px', marginBottom: '8px' }}>Call to Action - {offerData?.call_to_action} </li> : ""
                                            }

                                            {
                                                offerData?.call_to_action_url ? <li style={{ fontSize: '16px', marginBottom: '8px' }}>Call to Action URL - {offerData?.call_to_action_url} </li> : ""
                                            }

                                        </ul>
                                    </div>

                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Create_offers