import React, { useContext, useEffect, useState } from 'react'
import { Info, Percent } from 'react-feather'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import { Card, CardBody } from 'reactstrap'
import { getCurrentOutlet } from '../Validator'
import { SuperLeadzBaseURL } from '../../assets/auth/jwtService'
import "../NewFrontBase/NewFrontBase.css"
import { PermissionProvider } from '../../Helper/Context'

const SuperLeadzCreateOffers = () => {
    const { userPermission } = useContext(PermissionProvider)
    const [curStep, setCurStep] = useState(1)
    const [offerData, setOfferData] = useState({
        discount_code: "",
        method: "amount",
        offer_value_type: "percent",
        offer_value: "",
        cart_condition: "NO_REQ",
        customer_eligility: "ALL",
        cart_usage: "0",
        cart_value: "",
        total_limit: false,
        per_cust_limit: false,
        customer_buys: "ITEMS",
        customer_gets_value: "",
        start_date: "",
        start_time: "",
        is_end_data: false,
        end_date: "",
        end_time: "",
        customer_buys_list: [],
        customer_collection_list: [],
        customer_gets_list: [],
        BXBY_Type: "product",
        BXBY_Buy_Type: "product",
        customer_gets_collection_list: [],
        customer_buys_collection_list: [],
        customer_segmentation_list: [],
        customer_gets_discount_type: "FREE",
        customer_gets_discount_value: "",
        offer_title: "",
        offer_description: "Here's an offer we're sure you'll love!",
        call_to_action: "Redeem",
        call_to_action_url: "",
        perOrder: false,
        typeOffApply: "collections"
    })
    const [showError, setShowError] = useState({
        first: false,
        second: false,
        third: false,
        fouth: false,
        fifth: false
    })
    const [productList, setProductList] = useState([])
    const [productData, setProductData] = useState([])
    const [collectionList, setCollectionList] = useState([])
    const [collectionData, setCollectionData] = useState([])
    const [custSegment, setCustSegment] = useState([])
    // const [imageUrl, setImageUrl] = useState(waterMark)
    // const [imageObject, setimageObject] = useState({})
    console.log(custSegment)
    const outletData = getCurrentOutlet()
    const navigate = useNavigate()

    const callToAction = [
        { value: 'Shop Now', label: 'Shop Now' },
        { value: 'Buy Now', label: 'Buy Now' },
        { value: 'Redeem', label: 'Redeem' },
        { value: 'Apply', label: 'Apply' }
    ]

    const BXType = [
        { value: "collection", label: "Collections" },
        { value: "product", label: "Products" }
    ]

    const saveOfferData = () => {

        const form_data = new FormData()


        Object.entries(offerData).map(([key, value]) => {
            if (Array.isArray(value)) {
                value.map(ele => {
                    form_data.append(key, ele)
                })
            } else {
                form_data.append(key, value)
            }
        })


        form_data.append("shop", outletData[0]?.web_url)
        form_data.append("app", "superleadz")

        fetch(`${SuperLeadzBaseURL}/api/v1/add/create_offers/`, {
            method: "POST",
            body: form_data
        })
            .then((data) => data.json())
            .then((resp) => {
                console.log(resp)
                navigate("/merchant/SuperLeadz/offers/")

            })
            .catch((error) => {
                console.log(error)
            })
    }

    const nextPage = (count) => {
        if (curStep === 1) {

            if (offerData.discount_code === "" || offerData.method === "") {
                setShowError({ ...showError, first: true })
            } else {
                if (offerData.method === "product") {
                    if (offerData.customer_buys_list.length === 0 && offerData.customer_collection_list.length === 0) {
                        setShowError({ ...showError, first: true })
                    } else {
                        setShowError({ ...showError, first: false })
                        setCurStep(count ? count : curStep + 1)
                    }

                } else if (offerData.method === "BXBY") {
                    console.log("BXGY")
                    if ((offerData.customer_gets_value === "") || (offerData.customer_gets_list.length === 0 && offerData.customer_gets_collection_list.length === 0)) {
                        setShowError({ ...showError, first: true })
                        console.log("if")
                    } else if (offerData.customer_gets_discount_type === "PERCENT") {
                        console.log("elseif")
                        if (offerData.customer_gets_discount_value === "") {
                            setShowError({ ...showError, first: true })
                        } else {
                            setShowError({ ...showError, first: false })
                            setCurStep(count ? count : curStep + 1)
                        }
                    } else {
                        console.log("else")
                        setShowError({ ...showError, first: false })
                        setCurStep(count ? count : curStep + 1)
                    }
                } else if (offerData.method === "amount") {
                    if (offerData.offer_value === "") {
                        setShowError({ ...showError, first: true })
                    } else {
                        setShowError({ ...showError, first: false })
                        setCurStep(count ? count : curStep + 1)
                    }

                } else {
                    setShowError({ ...showError, first: false })
                    setCurStep(count ? count : curStep + 1)

                }
            }

        } else if (curStep === 2) {
            if (offerData.method === "BXBY") {
                if ((offerData.cart_value === "") || (offerData.customer_buys_list.length === 0 && offerData.customer_buys_collection_list.length === 0)) {
                    setShowError({ ...showError, second: true })
                } else {
                    setShowError({ ...showError, second: false })
                    setCurStep(count ? count : curStep + 1)
                }
            } else {
                setShowError({ ...showError, second: false })
                setCurStep(count ? count : curStep + 1)
            }
        } else if (curStep === 3) {
            if (offerData.offer_title === "" || offerData.offer_description === "" || offerData.call_to_action === "" || offerData.call_to_action_url === "") {
                setShowError({ ...showError, fifth: true })
            } else {
                count ? setCurStep(count) : saveOfferData()

            }
        }

    }

    console.log(showError)

    const getProduct = () => {
        const form_data = new FormData()
        form_data.append("shop", outletData[0]?.web_url)
        form_data.append("app_name", "superleadz")

        fetch(`${SuperLeadzBaseURL}/api/v1/get/get_shopify_products/`, {
            method: "POST",
            body: form_data
        })
            .then((response) => response.json())
            .then((data) => {
                setProductData(data?.response?.products ? data?.response?.products : [])
                setProductList(data.response.products.map((curElem) => {
                    return { value: curElem.id, label: curElem.title }
                }))
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const getCollection = () => {
        const form_data = new FormData()
        form_data.append("shop", outletData[0]?.web_url)
        form_data.append("app_name", "superleadz")
        fetch(`${SuperLeadzBaseURL}/api/v1/get/get_shopify_collections/`, {
            method: "POST",
            body: form_data
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                setCollectionData(data?.response?.custom_collections ? data.response.custom_collections : [])
                setCollectionList(data.response.custom_collections.map((curElem) => {
                    return { value: curElem.id, label: curElem.title }
                }))
            })
            .catch((error) => {
                console.log(error)
            })

    }

    const getSegment = () => {
        const form_data = new FormData()
        form_data.append("shop", outletData[0]?.web_url)
        form_data.append("app_name", "superleadz")

        fetch(`${SuperLeadzBaseURL}/api/get/getseg/`, {
            method: "POST",
            body: form_data
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setCustSegment(data.data.segments.edges.map((curElem) => {
                    const id = curElem.node.id.split("/")
                    console.log("lassan", id)
                    return { value: id.at(-1), label: curElem.node.name }
                }))
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const updateOfferData = (e) => {
        setOfferData({ ...offerData, [e.target.name]: e.target.value })
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

    useEffect(() => {
        getProduct()
        getSegment()
        getCollection()
    }, [])
    console.log("method changed")

    useEffect(() => {
        console.log("method changed")

        const updateData = {
            discount_code: offerData.discount_code,
            method: offerData.method,
            offer_value_type: "percent",
            offer_value: "",
            cart_condition: "NO_REQ",
            customer_eligility: "ALL",
            cart_usage: "0",
            cart_value: "",
            total_limit: false,
            per_cust_limit: false,
            customer_buys: "ITEMS",
            customer_gets_value: "",
            start_date: "",
            start_time: "",
            is_end_data: false,
            end_date: "",
            end_time: "",
            customer_buys_list: [],
            customer_collection_list: [],
            customer_gets_list: [],
            BXBY_Type: "product",
            BXBY_Buy_Type: "product",
            customer_gets_collection_list: [],
            customer_buys_collection_list: [],
            customer_segmentation_list: [],
            customer_gets_discount_type: "FREE",
            customer_gets_discount_value: "",
            offer_title: "",
            offer_description: "Here's an offer we're sure you'll love!",
            call_to_action: "Redeem",
            call_to_action_url: "",
            perOrder: false,
            typeOffApply: "collections"
        }

        setOfferData(updateData)
    }, [offerData.method])

    useEffect(() => {
        setOfferData({ ...offerData, offer_value: "" })
    }, [offerData.offer_value_type])

    console.log(offerData)

    console.log(collectionData, "collect")
    console.log(productData, "product")

    return (
        <>
            <div className="main_content popup-cust">
                <div className="offer_section">
                    <div className="container">
                        <div className="row mb-3 d-none">
                            <div className="col-7 d-flex align-items-center justify-content-between flex-row">
                                <div className={`step d-flex justify-content-start align-items-center`} style={{ gap: `10px`, cursor: "pointer" }} onClick={() => nextPage(1)}>
                                    <div className={`${curStep === 1 ? "primary-btn" : "number_count"}`}>1</div>
                                    <h6 style={{ margin: "0px" }}>Create Offer</h6>
                                </div>
                                <div className={`step d-flex justify-content-start align-items-center`} style={{ gap: `10px`, cursor: "pointer" }} onClick={() => nextPage(2)}>
                                    <div className={`${curStep === 2 ? "primary-btn" : "number_count"}`}>2</div>
                                    <h6 style={{ margin: "0px" }}>Cart & Usage Conditions</h6>
                                </div>
                                <div className={`step d-flex justify-content-start align-items-center`} style={{ gap: `10px`, cursor: "pointer" }} onClick={() => nextPage(3)}>
                                    <div className={`${curStep === 3 ? "primary-btn" : "number_count"}`}>3</div>
                                    <h6 style={{ margin: "0px" }}>Preview</h6>
                                </div>
                            </div>
                        </div>
                        {/* <div className="row"> */}
                        {/* <div className="col-12"> */}
                        <div className="row match-height">
                            <div className='col-xl-3'>

                                <Card>
                                    <CardBody>
                                        <div className="row mb-3">
                                            <div className={`step d-flex justify-content-start align-items-center ${curStep === 1 ? "tab_active" : ""}`} style={{ gap: `10px`, cursor: "pointer" }} onClick={() => nextPage(1)}>
                                                <div className={`number_count`}>1</div>
                                                <h6 style={{ margin: "0px" }}>Create Offer</h6>
                                            </div>
                                            <div className={`step d-flex justify-content-start align-items-center ${curStep === 2 ? "tab_active" : ""}`} style={{ gap: `10px`, cursor: "pointer" }} onClick={() => nextPage(2)}>
                                                <div className={`number_count`}>2</div>
                                                <h6 style={{ margin: "0px" }}>Cart & Usage Conditions</h6>
                                            </div>
                                            <div className={`step d-flex justify-content-start align-items-center ${curStep === 3 ? "tab_active" : ""}`} style={{ gap: `10px`, cursor: "pointer" }} onClick={() => nextPage(3)}>
                                                <div className={`number_count`}>3</div>
                                                <h6 style={{ margin: "0px" }}>Preview</h6>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>


                            </div>
                            <div className="col-xl-5 mb-3">

                                {
                                    curStep === 1 ? <>

                                        <Card>
                                            <CardBody>
                                                <h4 className='mb-1'>Discount Code</h4>
                                                <div className="input_div mt-1">
                                                    <label htmlFor="">Code</label>
                                                    <div className='d-flex align-items-stretch gap-3'>
                                                        <input placeholder="Enter a code" type="text" className="flex-grow-1 from-control-offer" name='discount_code' onChange={(e) => updateOfferData(e)} value={offerData.discount_code} />
                                                        <button onClick={() => setOfferData({ ...offerData, discount_code: Math.random().toString(36).substring(2, 16).toUpperCase() })} className="btn btn-primary">Generate Code</button>
                                                    </div>
                                                    {showError.first && (offerData.discount_code === "") ? (
                                                        <p
                                                            className="text-danger"
                                                            style={{ fontSize: "0.9rem" }}
                                                        >
                                                            Enter discount code
                                                        </p>
                                                    ) : ''}
                                                </div>
                                            </CardBody>

                                        </Card>

                                        <Card>
                                            <CardBody>
                                                <h4 className='mb-1'>Offer Type</h4>
                                                <div className="xircls_radio">

                                                    <div className='mt-1'>
                                                        <input
                                                            type='radio'
                                                            name="method"
                                                            id="orderOff"
                                                            checked={offerData.method === "amount"}
                                                            value="amount"
                                                            onChange={(e) => updateOfferData(e)}
                                                        />
                                                        <label for="orderOff">Discount on Total Order Value</label>
                                                    </div>
                                                    <div className='mt-1'>
                                                        <input
                                                            type='radio'
                                                            name="method"
                                                            id="productOff"
                                                            checked={offerData.method === "product"}
                                                            value="product"
                                                            onChange={(e) => updateOfferData(e)}
                                                        />
                                                        <label for="productOff">Discount on Select Products</label>
                                                    </div>

                                                    <div className='mt-1'>
                                                        <input
                                                            type='radio'
                                                            name="method"
                                                            id="xyOff"
                                                            checked={offerData.method === "BXBY"}
                                                            value="BXBY"
                                                            onChange={(e) => updateOfferData(e)}
                                                        />
                                                        <label for="xyOff">Buy X, Get Y</label>
                                                    </div>
                                                    {showError.first && offerData.method === "" ? (
                                                        <p
                                                            className="text-danger"
                                                            style={{ fontSize: "0.9rem" }}
                                                        >
                                                            Choose a method
                                                        </p>
                                                    ) : ''}
                                                </div>

                                            </CardBody>
                                        </Card>

                                        {
                                            offerData.method === "BXBY" ? '' : <>
                                                <Card>
                                                    <CardBody>
                                                        <h4 className='mb-1'>Discount Value Type</h4>
                                                        <p className='mb-1' style={{ fontSize: '12px' }}>Specify cart conditions in the next section.</p>
                                                        <div className="xircls_radio">
                                                            <div className='mt-1'>
                                                                <input
                                                                    type='radio'
                                                                    name="offer_value_type"
                                                                    id="percent"
                                                                    checked={offerData.offer_value_type === 'percent'}
                                                                    value='percent'
                                                                    onChange={(e) => updateOfferData(e)}
                                                                />
                                                                <label for="percent">Percentage Off</label>
                                                            </div>

                                                            <div className='mt-1'>
                                                                <input
                                                                    type='radio'
                                                                    name="offer_value_type"
                                                                    id="flat"
                                                                    checked={offerData.offer_value_type === 'flat'}
                                                                    value='flat'
                                                                    onChange={(e) => updateOfferData(e)}
                                                                />
                                                                <label for="flat">Flat Amount Off</label>
                                                            </div>
                                                        </div>
                                                        <div className="input_div mt-1">
                                                            <div className="row">
                                                                <div className="col-md-12">
                                                                    <label htmlFor="">Discount amount</label> <br />
                                                                    <div className="position-relative w-50 from-control-offer d-flex align-items-center">
                                                                        {offerData.offer_value_type === "flat" && <span style={{ fontSize: "15px" }}>{userPermission?.currencySymbol}</span>}<input type="text" name='offer_value' style={{ border: 'none', outline: 'none', width: '100%' }} onChange={(e) => {
                                                                            console.log(isNaN(e.target.value))
                                                                            if (!isNaN(e.target.value)) {
                                                                                offerData.offer_value_type === 'flat' ? updateOfferData(e) : setOfferData({ ...offerData, offer_value: Number(e.target.value) > 100 ? "100" : e.target.value })
                                                                            } else {
                                                                                console.log("ppp")
                                                                            }
                                                                        }} value={offerData.offer_value} />{offerData.offer_value_type === "percent" && <Percent size={15} />}
                                                                    </div>


                                                                    {showError.first && offerData.offer_value === "" ? (
                                                                        <p
                                                                            className="text-danger"
                                                                            style={{ fontSize: "0.9rem" }}
                                                                        >
                                                                            Enter discount amount
                                                                        </p>
                                                                    ) : ''}

                                                                </div>
                                                            </div>
                                                        </div>

                                                    </CardBody>
                                                </Card>
                                            </>
                                        }

                                        {
                                            offerData.method === "product" ? <>
                                                <Card>
                                                    <CardBody>
                                                        <h4 className='subCardTitle'>Applies to</h4>
                                                        <div className="xircls_radio">
                                                            <div className='mt-1'>
                                                                <input
                                                                    type='radio'
                                                                    name="typeOffApply"
                                                                    id="collections"
                                                                    checked={offerData.typeOffApply === 'collections'}
                                                                    value='collections'
                                                                    onChange={(e) => updateOfferData(e)}
                                                                />
                                                                <label for="collections">Collections</label>
                                                            </div>

                                                            <div className='mt-1'>
                                                                <input
                                                                    type='radio'
                                                                    name="typeOffApply"
                                                                    id="products"
                                                                    checked={offerData.typeOffApply === 'products'}
                                                                    value='products'
                                                                    onChange={(e) => updateOfferData(e)}
                                                                />
                                                                <label for="products">Products</label>
                                                            </div>
                                                        </div>

                                                        {
                                                            offerData.typeOffApply === 'collections' ? <Select
                                                                isMulti={true}
                                                                options={collectionList}
                                                                inputId="aria-example-input"
                                                                closeMenuOnSelect={true}
                                                                name="customer_collection_list"
                                                                placeholder="Add Collection/s"
                                                                value={collectionList.filter(option => offerData.customer_collection_list?.includes(option.value))}
                                                                onChange={(value, actionMeta) => handleChange(value, actionMeta, true)}
                                                            /> : <Select
                                                                isMulti={true}
                                                                options={productList}
                                                                inputId="aria-example-input"
                                                                closeMenuOnSelect={true}
                                                                name="customer_buys_list"
                                                                placeholder="Add Product/s"
                                                                value={productList.filter(option => offerData.customer_buys_list?.includes(option.value))}
                                                                onChange={(value, actionMeta) => handleChange(value, actionMeta, true)}
                                                            />
                                                        }

                                                        {showError.first && offerData.customer_buys_list.length === 0 && offerData.customer_collection_list.length === 0 ? (
                                                            <p
                                                                className="text-danger"
                                                                style={{ fontSize: "0.9rem" }}
                                                            >
                                                                Select {offerData.typeOffApply === 'collections' ? "collection/s" : "product/s"}
                                                            </p>
                                                        ) : ''}
                                                        <div className="mt-3">
                                                            {
                                                                offerData.offer_value_type === "flat" ? <>
                                                                    <div className='d-flex justify-content-start align-items-center' style={{ gap: '8px' }}>
                                                                        <input
                                                                            type='checkbox'
                                                                            id="limit_once"
                                                                            name="perOrder"
                                                                            checked={offerData.perOrder}
                                                                            style={{ accentColor: '#fbcd0c' }}
                                                                            onChange={() => setOfferData({ ...offerData, perOrder: !offerData.perOrder })}
                                                                        />
                                                                        <label htmlFor="limit_once">Only apply discount once per order</label>
                                                                    </div>
                                                                    {
                                                                        offerData.perOrder ? <>
                                                                            <p className='mt-2'>If not selected, the amount will be taken off each eligible item in an order.</p>
                                                                        </> : ""
                                                                    }
                                                                </> : ""
                                                            }
                                                        </div>
                                                    </CardBody>
                                                </Card>

                                            </> : offerData.method === "BXBY" ? <>
                                                <Card>
                                                    <CardBody>
                                                        <h4 className='mb-1'>Product/s & Discount Value Type</h4>
                                                        <p>Select the product/s and discount type. Specify cart conditions in the next sections</p>
                                                        <div className="row mt-1">
                                                            <div className="col-4">
                                                                <label>Quantity</label>
                                                                <input type="text" className="w-100 from-control-offer" name='customer_gets_value' onChange={(e) => {
                                                                    if (!isNaN(e.target.value)) {
                                                                        updateOfferData(e)
                                                                    } else {
                                                                        console.log("pp")
                                                                    }

                                                                }} value={offerData.customer_gets_value} placeholder="" />
                                                                {showError.first && offerData.customer_gets_value === "" ? (
                                                                    <p
                                                                        className="text-danger"
                                                                        style={{ fontSize: "0.9rem" }}
                                                                    >
                                                                        Enter quantity
                                                                    </p>
                                                                ) : ''}
                                                            </div>
                                                            <div className="col-8">
                                                                <label htmlFor="items_form">Any items from</label>
                                                                <Select
                                                                    isMulti={false}
                                                                    options={BXType}
                                                                    inputId="aria-example-input"
                                                                    closeMenuOnSelect={true}
                                                                    name="BXBY_Type"
                                                                    value={BXType.filter(option => offerData.BXBY_Type?.includes(option.value))}
                                                                    onChange={(value, actionMeta) => handleChange(value, actionMeta, false)}
                                                                />
                                                            </div>
                                                            <div className="col-12 mt-3">
                                                                {
                                                                    offerData.BXBY_Type === "product" ? <>
                                                                        <label htmlFor="custGets">Applies To Which Product/s</label>
                                                                        <Select
                                                                            isMulti={true}
                                                                            options={productList}
                                                                            inputId="aria-example-input"
                                                                            closeMenuOnSelect={true}
                                                                            name="customer_gets_list"
                                                                            placeholder="Add Product/s"
                                                                            value={productList.filter(option => offerData.customer_gets_list.includes(option.value))}
                                                                            onChange={(value, actionMeta) => handleChange(value, actionMeta, true)}
                                                                        />
                                                                    </> : <>
                                                                        <label htmlFor="custGets">Applies To Which Collection/s</label>
                                                                        <Select
                                                                            isMulti={true}
                                                                            options={collectionList}
                                                                            inputId="aria-example-input"
                                                                            closeMenuOnSelect={true}
                                                                            name="customer_gets_collection_list"
                                                                            placeholder="Add Collection/s"
                                                                            value={collectionList.filter(option => offerData.customer_gets_collection_list?.includes(option.value))}
                                                                            onChange={(value, actionMeta) => handleChange(value, actionMeta, true)}
                                                                        />
                                                                    </>
                                                                }
                                                                {showError.first && offerData.customer_gets_list.length === 0 && offerData.customer_gets_collection_list.length === 0 ? (
                                                                    <p
                                                                        className="text-danger"
                                                                        style={{ fontSize: "0.9rem" }}
                                                                    >
                                                                        Select {offerData.BXBY_Type === "product" ? " product/s" : "collection/s"}
                                                                    </p>
                                                                ) : ''}
                                                                {/* <SelectElement placeholder="Select" options={productList} setSelectedOptions={setcustomerGet} isMulti={false} /> */}
                                                            </div>
                                                            <div className="row mt-3">
                                                                <h6>Discount Amount</h6>
                                                                <div className="xircls_radio">
                                                                    <div className='mt-1'>
                                                                        <input
                                                                            type='radio'
                                                                            checked={offerData.customer_gets_discount_type === "PERCENT"}
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
                                                                            checked={offerData.customer_gets_discount_type === "FREE"}
                                                                            id="free"
                                                                            name="customer_gets_discount_type"
                                                                            value="FREE"
                                                                            onChange={(e) => updateOfferData(e)}
                                                                        />
                                                                        <label htmlFor="free">Free</label>
                                                                    </div>
                                                                </div>

                                                                {
                                                                    offerData.customer_gets_discount_type === "PERCENT" ? <>
                                                                        <div className="input_div mt-1">
                                                                            <div className="row">
                                                                                <div className="col-md-12">
                                                                                    <input placeholder="%" type="text" className="w-50 from-control-offer" name='customer_gets_discount_value' onChange={(e) => updateOfferData(e)} value={offerData.customer_gets_discount_value} />
                                                                                </div>
                                                                                {showError.first && offerData.customer_gets_discount_value === "" ? (
                                                                                    <p
                                                                                        className="text-danger"
                                                                                        style={{ fontSize: "0.9rem" }}
                                                                                    >
                                                                                        Enter discount amount
                                                                                    </p>
                                                                                ) : ''}
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
                                            offerData.method === "BXBY" ? <>
                                                <Card>
                                                    <CardBody>
                                                        <h4 className='mb-1'>Applicable on Purchase</h4>
                                                        <div className="xircls_radio">
                                                            <div className='mt-1'>
                                                                <input
                                                                    type='radio'
                                                                    checked={offerData.customer_buys === "ITEMS"}
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
                                                                    checked={offerData.customer_buys === "AMT"}
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
                                                                <label htmlFor="">{offerData.customer_buys === "ITEMS" ? "Quantity" : "Amount"}</label>
                                                                <div className="position-relative from-control-offer d-flex align-items-center" style={{ height: '38px' }}>
                                                                    {offerData.customer_buys === "AMT" && <span style={{ fontSize: "15px" }}>{userPermission?.currencySymbol}</span>}<input type="text" name='cart_value' style={{ border: 'none', outline: 'none', width: '100%' }} onChange={(e) => {
                                                                        if (!isNaN(e.target.value)) {
                                                                            updateOfferData(e)
                                                                        } else {
                                                                            console.log("pp")
                                                                        }
                                                                    }} value={offerData.cart_value} />
                                                                </div>


                                                                {showError.second && offerData.cart_value === "" ? (
                                                                    <p
                                                                        className="text-danger"
                                                                        style={{ fontSize: "0.9rem" }}
                                                                    >
                                                                        Enter {offerData.customer_buys === "ITEMS" ? "quantity" : "amount"}
                                                                    </p>
                                                                ) : ''}
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
                                                                {showError.second && offerData.customer_buys_list.length === 0 && offerData.customer_buys_collection_list.length === 0 ? (
                                                                    <p
                                                                        className="text-danger"
                                                                        style={{ fontSize: "0.9rem" }}
                                                                    >
                                                                        Select {offerData.BXBY_Buy_Type === "product" ? "product/s" : "collection/s"}
                                                                    </p>
                                                                ) : ''}
                                                                {/* <SelectElement placeholder="Select" options={productList} setSelectedOptions={setCustomerBuy} isMulti={false} /> */}
                                                            </div>
                                                        </div>`

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
                                                                    checked={offerData.cart_condition === "NO_REQ"}
                                                                    value="NO_REQ"
                                                                    onChange={(e) => updateOfferData(e)}
                                                                />
                                                                <label for="noCondition">No conditions</label>
                                                            </div>

                                                            <div className='mt-1'>
                                                                <input
                                                                    type='radio'
                                                                    name="cart_condition"
                                                                    id="pCondition"
                                                                    checked={offerData.cart_condition === "AMT"}
                                                                    value="AMT"
                                                                    onChange={(e) => updateOfferData(e)}
                                                                />
                                                                <label for="pCondition">Purchase amount of items in cart</label>
                                                                {
                                                                    offerData.cart_condition === "AMT" ? <>
                                                                        <div className="input_div mt-1" style={{ marginLeft: '20px' }}>
                                                                            <div className="row">
                                                                                <div className="col-md-12">
                                                                                    <div className="position-relative w-50 from-control-offer d-flex align-items-center">
                                                                                        <span style={{ fontSize: "15px" }}>{userPermission?.currencySymbol}</span>
                                                                                        <input type="text" style={{ border: 'none', outline: 'none', width: '100%' }} name='cart_value' onChange={(e) => {
                                                                                            if (!isNaN(e.target.value)) {
                                                                                                updateOfferData(e)
                                                                                            }
                                                                                        }} value={offerData.cart_value} />
                                                                                    </div>

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
                                                                    checked={offerData.cart_condition === "ITEMS"}
                                                                    value="ITEMS"
                                                                    onChange={(e) => updateOfferData(e)}
                                                                />
                                                                <label for="ncCondition">Number of items in cart</label>
                                                                {
                                                                    offerData.cart_condition === "ITEMS" ? <>
                                                                        <div className="input_div mt-1" style={{ marginLeft: '20px' }}>
                                                                            <div className="row">
                                                                                <div className="col-md-12">
                                                                                    <input type="text" placeholder='0' className="w-50 from-control-offer" name='cart_value' onChange={(e) => {
                                                                                        if (!isNaN(e.target.value)) {
                                                                                            updateOfferData(e)

                                                                                        }
                                                                                    }} value={offerData.cart_value} />
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

                                        <Card>
                                            <CardBody>
                                                <h4 className='mb-1'>Maximum Use Count</h4>
                                                <div className="maximum_discount row mb-3">
                                                    <div className='d-flex justify-content-start align-items-center mb-1' style={{ gap: '8px' }}>
                                                        <input
                                                            type='checkbox'
                                                            id="limit_times"
                                                            name='total_limit'
                                                            checked={offerData.total_limit}
                                                            style={{ accentColor: '#006aff' }}
                                                            onChange={() => setOfferData({ ...offerData, total_limit: !offerData.total_limit })}
                                                        />
                                                        <label htmlFor="limit_times">Limit total number of times this discount can be used</label>

                                                    </div>
                                                    {
                                                        offerData.total_limit ? <div className='mb-1'>
                                                            <input placeholder="Discount Code" type="text" className="w-100 from-control-offer" name='cart_usage' onChange={(e) => {
                                                                if (!isNaN(e.target.value)) {
                                                                    updateOfferData(e)

                                                                }
                                                            }} value={offerData.cart_usage} />
                                                        </div> : ''
                                                    }
                                                    <div className='d-flex justify-content-start align-items-center' style={{ gap: '8px' }}>
                                                        <input
                                                            type='checkbox'
                                                            id="limit_once"
                                                            name="per_cust_limit"
                                                            style={{ accentColor: '#006aff' }}
                                                            checked={offerData.per_cust_limit}
                                                            onChange={() => setOfferData({ ...offerData, per_cust_limit: !offerData.per_cust_limit })}
                                                        />
                                                        <label htmlFor="limit_once">Limit to one use per customer</label>
                                                    </div>
                                                </div>
                                                
                                            </CardBody>
                                        </Card>

                                    </> : curStep === 3 ? <>
                                        <Card>
                                            <CardBody>
                                                <h4 className='mb-1'>Offer Preview</h4>
                                                <div
                                                    className="offer_box"
                                                    style={{
                                                        backgroundColor: "#efefef",
                                                        padding: 15,
                                                        borderRadius: 8,
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        alignItems: "flex-start",
                                                        width: `338px`,
                                                        display: `flex`,
                                                        gap: `20px`
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            fontStyle: "normal",
                                                            fontWeight: 600,
                                                            fontSize: 14,
                                                            lineHeight: `20px`,
                                                            color: "#000",
                                                            textAlign: "left"
                                                        }}
                                                    >
                                                        {offerData.offer_description}
                                                    </div>
                                                    <div
                                                        className="remove_col"
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            alignItems: "flex-end",
                                                            flexDirection: "column",
                                                            gap: 15
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                gap: 10
                                                            }}
                                                        >
                                                            <svg
                                                                width={16}
                                                                height={16}
                                                                viewBox="0 0 16 16"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    d="M15.0575 7.685L8.3075 0.935C8.0375 0.665 7.6625 0.5 7.25 0.5H2C1.175 0.5 0.5 1.175 0.5 2V7.25C0.5 7.6625 0.665 8.0375 0.9425 8.315L7.6925 15.065C7.9625 15.335 8.3375 15.5 8.75 15.5C9.1625 15.5 9.5375 15.335 9.8075 15.0575L15.0575 9.8075C15.335 9.5375 15.5 9.1625 15.5 8.75C15.5 8.3375 15.3275 7.955 15.0575 7.685ZM3.125 4.25C2.5025 4.25 2 3.7475 2 3.125C2 2.5025 2.5025 2 3.125 2C3.7475 2 4.25 2.5025 4.25 3.125C4.25 3.7475 3.7475 4.25 3.125 4.25Z"
                                                                    fill="#000"
                                                                />
                                                            </svg>
                                                            <div
                                                                style={{
                                                                    fontStyle: "normal",
                                                                    fontWeight: 600,
                                                                    fontSize: 16,
                                                                    lineHeight: `30px`,
                                                                    color: "#000"
                                                                }}
                                                            >
                                                                {offerData.discount_code ? offerData.discount_code : "--"}
                                                            </div>
                                                        </div>
                                                        <a

                                                            style={{
                                                                textTransform: "uppercase",
                                                                height: 32,
                                                                fontWeight: 600,
                                                                fontSize: 13,
                                                                lineHeight: `30px`,
                                                                textAlign: "center",
                                                                backgroundColor: "#000",
                                                                color: "rgb(255, 255, 255)",
                                                                borderRadius: 7,
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                cursor: "pointer",
                                                                padding: "0 15px",
                                                                textDecoration: "none",
                                                                whiteSpace: "nowrap"
                                                            }}
                                                        >
                                                            {offerData.call_to_action}
                                                        </a>
                                                    </div>
                                                </div>

                                            </CardBody>
                                        </Card>

                                        <Card>
                                            <CardBody>
                                                <h4>Offer Details</h4>
                                                <div className="inputs mt-2">
                                                    <label htmlFor="" className='pb-2 d-flex justify-content-start align-items-start' style={{ gap: '3px' }}>Offer Title <span style={{ cursor: 'pointer', display: 'flex' }} title='For your reference only'><Info size={'10'} /></span> </label>
                                                    <input name='offer_title' type="text" className="w-100 from-control-offer" onChange={(e) => updateOfferData(e)} value={offerData.offer_title} />
                                                    {showError.fifth && offerData.offer_title === "" ? (
                                                        <p
                                                            className="text-danger"
                                                            style={{ fontSize: "0.9rem" }}
                                                        >
                                                            Enter offer title
                                                        </p>
                                                    ) : ''}
                                                </div>
                                                <div className="inputs mt-2">
                                                    <label htmlFor="">Offer Description</label>
                                                    <textarea name='offer_description' type="text" className="w-100 from-control-offer" onChange={(e) => updateOfferData(e)} value={offerData.offer_description} />
                                                    {showError.fifth && offerData.offer_description === "" ? (
                                                        <p
                                                            className="text-danger"
                                                            style={{ fontSize: "0.9rem" }}
                                                        >
                                                            Enter offer description
                                                        </p>
                                                    ) : ''}


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
                                                                value={callToAction.filter(option => offerData.call_to_action?.includes(option.value))}
                                                                onChange={(value, actionMeta) => handleChange(value, actionMeta, false)}
                                                            />
                                                            {showError.fifth && offerData.call_to_action === "" ? (
                                                                <p
                                                                    className="text-danger"
                                                                    style={{ fontSize: "0.9rem" }}
                                                                >
                                                                    Select a call to action
                                                                </p>
                                                            ) : ''}
                                                        </div>
                                                        <div className="col-6">
                                                            <label htmlFor="">Call to Action URL</label>
                                                            <input name='call_to_action_url' type="text" className="w-100 from-control-offer" onChange={(e) => updateOfferData(e)} value={offerData.call_to_action_url} />
                                                            {showError.fifth && offerData.call_to_action_url === "" ? (
                                                                <p
                                                                    className="text-danger"
                                                                    style={{ fontSize: "0.9rem" }}
                                                                >
                                                                    Enter a call-to-action URL
                                                                </p>
                                                            ) : ''}
                                                        </div>
                                                    </div>
                                                </div>

                                            </CardBody>
                                        </Card>

                                    </> : curStep === 4 ? <>

                                        <Card>
                                            <CardBody>
                                                <h4 >Active dates</h4>
                                                <div className="active_date row mb-1">

                                                    <div className="active_date" style={{ display: `flex`, justifyContent: `space-between`, alignItems: "center" }}>
                                                        <div className="form-group" style={{ flexBasis: "48%" }}>
                                                            <label htmlFor="start_date">Start Date:</label>
                                                            <div>
                                                                <input type="date" id="start_date" value={offerData.start_date} name="start_date" className="from-control-offer" onChange={(e) => updateOfferData(e)} />
                                                            </div>
                                                            {showError.fouth && offerData.start_date === "" ? (
                                                                <p
                                                                    className="text-danger"
                                                                    style={{ fontSize: "0.9rem" }}
                                                                >
                                                                    Select start date
                                                                </p>
                                                            ) : ''}
                                                        </div>

                                                        <div className="form-group" style={{ flexBasis: "48%" }}>
                                                            <label htmlFor="start_time">Start Time:</label>
                                                            <div>
                                                                <input type="time" id="start_time" name="start_time" value={offerData.start_time} className="from-control-offer" onChange={(e) => updateOfferData(e)} />
                                                            </div>
                                                            {showError.fouth && offerData.start_time === "" ? (
                                                                <p
                                                                    className="text-danger"
                                                                    style={{ fontSize: "0.9rem" }}
                                                                >
                                                                    Select start time
                                                                </p>
                                                            ) : ''}
                                                        </div>

                                                    </div>
                                                </div>
                                                <div>
                                                    <div className='d-flex justify-content-start align-items-center' style={{ gap: '8px' }}>
                                                        <input
                                                            type='checkbox'
                                                            id="setEndDate"
                                                            checked={offerData.is_end_data}
                                                            style={{ accentColor: '#fbcd0c' }}
                                                            onChange={() => setOfferData({ ...offerData, is_end_data: !offerData.is_end_data })}
                                                        />
                                                        <label htmlFor="setEndDate">Set End Date</label>

                                                    </div>
                                                    {
                                                        offerData.is_end_data ? <>
                                                            <div className="active_date mt-1" style={{ display: `flex`, justifyContent: `space-between`, alignItems: "center" }}>
                                                                <div className="form-group" style={{ flexBasis: "48%" }}>
                                                                    <label htmlFor="end_date">End Date:</label>
                                                                    <div>
                                                                        <input type="date" id="end_date" name="end_date" className="from-control-offer" value={offerData.end_date} onChange={(e) => updateOfferData(e)} />
                                                                    </div>
                                                                    {showError.fouth && offerData.end_date === "" ? (
                                                                        <p
                                                                            className="text-danger"
                                                                            style={{ fontSize: "0.9rem" }}
                                                                        >
                                                                            Select end date
                                                                        </p>
                                                                    ) : ''}
                                                                </div>

                                                                <div className="form-group" style={{ flexBasis: "48%" }}>
                                                                    <label htmlFor="end_time">End Time:</label>
                                                                    <div>
                                                                        <input type="time" id="end_time" name="end_time" className="from-control-offer" value={offerData.end_time} onChange={(e) => updateOfferData(e)} />
                                                                    </div>
                                                                    {showError.fouth && offerData.end_time === "" ? (
                                                                        <p
                                                                            className="text-danger"
                                                                            style={{ fontSize: "0.9rem" }}
                                                                        >
                                                                            Select end time
                                                                        </p>
                                                                    ) : ''}
                                                                </div>

                                                            </div>
                                                        </> : ""
                                                    }

                                                </div>

                                            </CardBody>
                                        </Card>

                                    </> : curStep === 5 ? <>
                                        <Card>
                                            <CardBody>
                                                <h4 className='mb-1'>Preview</h4>
                                                <div
                                                    className="offer_box"
                                                    style={{
                                                        backgroundColor: "#efefef",
                                                        padding: 15,
                                                        borderRadius: 8,
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        alignItems: "flex-start",
                                                        width: `338px`,
                                                        display: `flex`,
                                                        gap: `20px`
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            fontStyle: "normal",
                                                            fontWeight: 600,
                                                            fontSize: 14,
                                                            lineHeight: `20px`,
                                                            color: "#000",
                                                            textAlign: "left"
                                                        }}
                                                    >
                                                        {offerData.offer_description}
                                                    </div>
                                                    <div
                                                        className="remove_col"
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            alignItems: "flex-end",
                                                            flexDirection: "column",
                                                            gap: 15
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                gap: 10
                                                            }}
                                                        >
                                                            <svg
                                                                width={16}
                                                                height={16}
                                                                viewBox="0 0 16 16"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    d="M15.0575 7.685L8.3075 0.935C8.0375 0.665 7.6625 0.5 7.25 0.5H2C1.175 0.5 0.5 1.175 0.5 2V7.25C0.5 7.6625 0.665 8.0375 0.9425 8.315L7.6925 15.065C7.9625 15.335 8.3375 15.5 8.75 15.5C9.1625 15.5 9.5375 15.335 9.8075 15.0575L15.0575 9.8075C15.335 9.5375 15.5 9.1625 15.5 8.75C15.5 8.3375 15.3275 7.955 15.0575 7.685ZM3.125 4.25C2.5025 4.25 2 3.7475 2 3.125C2 2.5025 2.5025 2 3.125 2C3.7475 2 4.25 2.5025 4.25 3.125C4.25 3.7475 3.7475 4.25 3.125 4.25Z"
                                                                    fill="#000"
                                                                />
                                                            </svg>
                                                            <div
                                                                style={{
                                                                    fontStyle: "normal",
                                                                    fontWeight: 600,
                                                                    fontSize: 16,
                                                                    lineHeight: `30px`,
                                                                    color: "#000"
                                                                }}
                                                            >
                                                                {offerData.discount_code ? offerData.discount_code : "--"}
                                                            </div>
                                                        </div>
                                                        <a

                                                            style={{
                                                                textTransform: "uppercase",
                                                                height: 32,
                                                                fontWeight: 600,
                                                                fontSize: 13,
                                                                lineHeight: `30px`,
                                                                textAlign: "center",
                                                                backgroundColor: "#000",
                                                                color: "rgb(255, 255, 255)",
                                                                borderRadius: 7,
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                cursor: "pointer",
                                                                padding: "0 15px",
                                                                textDecoration: "none",
                                                                whiteSpace: "nowrap"
                                                            }}
                                                        >
                                                            {offerData.call_to_action}
                                                        </a>
                                                    </div>
                                                </div>

                                            </CardBody>
                                        </Card>

                                        <Card>
                                            <CardBody>
                                                <h4>Offer Details</h4>
                                                <div className="inputs mt-2">
                                                    <label htmlFor="" className='pb-2 d-flex justify-content-start align-items-center gap-2'>Offer Title <span style={{ cursor: 'pointer' }} title='For your reference'><Info size={'17'} /></span> </label>
                                                    <input name='offer_title' type="text" className="w-100 from-control-offer" onChange={(e) => updateOfferData(e)} value={offerData.offer_title} />
                                                    {showError.fifth && offerData.offer_title === "" ? (
                                                        <p
                                                            className="text-danger"
                                                            style={{ fontSize: "0.9rem" }}
                                                        >
                                                            Enter offer title
                                                        </p>
                                                    ) : ''}
                                                </div>
                                                <div className="inputs mt-2">
                                                    <label htmlFor="">Offer Description</label>
                                                    <textarea name='offer_description' type="text" className="w-100 from-control-offer" onChange={(e) => updateOfferData(e)} value={offerData.offer_description} />
                                                    {showError.fifth && offerData.offer_description === "" ? (
                                                        <p
                                                            className="text-danger"
                                                            style={{ fontSize: "0.9rem" }}
                                                        >
                                                            Enter offer description
                                                        </p>
                                                    ) : ''}


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
                                                                value={callToAction.filter(option => offerData.call_to_action?.includes(option.value))}
                                                                onChange={(value, actionMeta) => handleChange(value, actionMeta, false)}
                                                            />
                                                            {showError.fifth && offerData.call_to_action === "" ? (
                                                                <p
                                                                    className="text-danger"
                                                                    style={{ fontSize: "0.9rem" }}
                                                                >
                                                                    Select a call to action
                                                                </p>
                                                            ) : ''}
                                                        </div>
                                                        <div className="col-6">
                                                            <label htmlFor="">Call to Action URL</label>
                                                            <input name='call_to_action_url' type="text" className="w-100 from-control-offer" onChange={(e) => updateOfferData(e)} value={offerData.call_to_action_url} />
                                                            {showError.fifth && offerData.call_to_action_url === "" ? (
                                                                <p
                                                                    className="text-danger"
                                                                    style={{ fontSize: "0.9rem" }}
                                                                >
                                                                    Select a call to action url
                                                                </p>
                                                            ) : ''}
                                                        </div>
                                                    </div>
                                                </div>

                                            </CardBody>
                                        </Card>

                                    </> : ""
                                }

                                <div className="action_btn mt-3 d-flex justify-content-between align-items-center">
                                    <a className='btn btn-outline-secondary' onClick={() => setCurStep(curStep === 1 ? navigate('/merchant/SuperLeadz/offers/') : curStep - 1)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>{curStep === 1 ? "View all offers" : "Back"}</a>
                                    <a className='btn btn-primary-main' onClick={() => nextPage(null)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>{curStep === 3 ? "Save" : "Next"} </a>
                                </div>
                            </div>
                            <div className="col-xl-4">
                                <Card>
                                    <CardBody>
                                        <h5>Offer Summary</h5>
                                        <hr />

                                        <div className="summary">

                                            <h5 style={{ fontSize: '17px' }}>{offerData.discount_code ? offerData.discount_code : "No discount code yet."}</h5>

                                            <div className="type mt-2">
                                                <h6 className='mb-1'>Offer Type</h6>
                                                <ul>
                                                    <li style={{ fontSize: '16px', marginBottom: '8px' }}>{offerData.method === "product" ? "Discount on Select Products" : offerData.method === "amount" ? "Discount on Total Order Value" : "Buy X get Y"}</li>
                                                    {
                                                        offerData.offer_value ? <li style={{ fontSize: '16px', marginBottom: '8px' }}>{offerData.offer_value_type === "percent" ? `${offerData.offer_value}% off` : `${userPermission?.currencySymbol}${offerData.offer_value} off`}</li> : ""
                                                    }

                                                </ul>

                                            </div>

                                            {
                                                offerData.method === "product" ? <div className="type mt-2">
                                                    <h6 className='mb-1'>Applies to {offerData.typeOffApply}</h6>
                                                    <ul>
                                                        {
                                                            offerData.typeOffApply === "products" ? productData.map((curElem) => {
                                                                if (offerData.customer_buys_list?.includes(curElem.id)) {
                                                                    return <li style={{ fontSize: '16px', marginBottom: '8px' }}>{curElem.title}</li>
                                                                }
                                                            }) : collectionData.map((curElem) => {
                                                                if (offerData.customer_collection_list?.includes(curElem.id)) {
                                                                    return <li style={{ fontSize: '16px', marginBottom: '8px' }}>{curElem.title}</li>
                                                                }
                                                            })
                                                        }

                                                    </ul>

                                                </div> : ""

                                            }

                                            {
                                                offerData.method === "BXBY" ? <> <div className="type mt-2">
                                                    <h6 className='mb-1'>Product/s & Discount Value Type</h6>
                                                    <ul>
                                                        {
                                                            offerData.customer_gets_value ? <li style={{ fontSize: '16px', marginBottom: '8px' }}>Quantity - {offerData.customer_gets_value} </li> : ''
                                                        }

                                                        {
                                                            offerData.BXBY_Type === "product" ? productData.map((curElem) => {
                                                                if (offerData.customer_gets_list?.includes(curElem.id)) {
                                                                    return <li style={{ fontSize: '16px', marginBottom: '8px' }}>{curElem.title}</li>
                                                                }
                                                            }) : collectionData.map((curElem) => {
                                                                if (offerData.customer_gets_collection_list?.includes(curElem.id)) {
                                                                    return <li style={{ fontSize: '16px', marginBottom: '8px' }}>{curElem.title}</li>
                                                                }
                                                            })
                                                        }
                                                        {
                                                            offerData.customer_gets_discount_type === "PERCENT" ? <li style={{ fontSize: '16px', marginBottom: '8px' }}>At a discounted value {offerData.customer_gets_discount_value ? `of ${offerData.customer_gets_discount_value}%` : 'percentage'}</li> : <>
                                                                <li style={{ fontSize: '16px', marginBottom: '8px' }}>For <span style={{ textTransform: "lowercase" }}>{offerData.customer_gets_discount_type}</span> </li>
                                                            </>
                                                        }

                                                    </ul>

                                                </div>

                                                    <div className="type mt-2">
                                                        <h6 className='mb-1'>Applicable on Purchase</h6>
                                                        <ul>
                                                            {
                                                                <li style={{ fontSize: '16px', marginBottom: '8px' }}> {offerData.customer_buys === "ITEMS" ? "Minimum quantity of items" : "Minimum purchase amount"} </li>
                                                            }

                                                            {
                                                                <li style={{ fontSize: '16px', marginBottom: '8px' }}>{offerData.customer_buys === "ITEMS" ? `Items - ${offerData.cart_value}` : `Amount - ${offerData.cart_value}`}</li>
                                                            }

                                                            {
                                                                offerData.BXBY_Buy_Type === "product" ? productData.map((curElem) => {
                                                                    if (offerData.customer_buys_list?.includes(curElem.id)) {
                                                                        return <li style={{ fontSize: '16px', marginBottom: '8px' }}>{curElem.title}</li>
                                                                    }
                                                                }) : collectionData.map((curElem) => {
                                                                    if (offerData.customer_buys_collection_list?.includes(curElem.id)) {
                                                                        return <li style={{ fontSize: '16px', marginBottom: '8px' }}>{curElem.title}</li>
                                                                    }
                                                                })
                                                            }

                                                        </ul>

                                                    </div>

                                                </> : ""
                                            }
                                            
                                            {
                                                curStep === 2 ? (
                                                    <div className="type mt-2">
                                                        <h6 className='mb-1'>Cart & Usage Conditions</h6>
                                                        <ul>

                                                            {
                                                                offerData.total_limit ? <li style={{ fontSize: '16px', marginBottom: '8px' }}> This discount can be used {offerData.cart_usage}</li> : ""
                                                            }

                                                            {
                                                                offerData.method === "BXBY" ? "" : <li style={{ fontSize: '16px', marginBottom: '8px' }}>{offerData.cart_condition === "NO_REQ" ? "No conditions" : offerData.cart_condition === "AMT" ? `Purchase ${userPermission?.currencySymbol}${offerData.cart_value} of items in the cart` : `${offerData.cart_value} items in cart `}</li>
                                                            }
                                                            {
                                                                offerData.per_cust_limit ? <li style={{ fontSize: '16px', marginBottom: '8px' }}> Limit to one use per customer</li> : ''
                                                            }


                                                        </ul>

                                                    </div>
                                                ) : ''
                                            }
                                        </div>

                                    </CardBody>
                                </Card>
                            </div>
                        </div>

                        {/* </div> */}

                        {/* </div> */}
                    </div>
                </div>
            </div>

        </>
    )
}

export default SuperLeadzCreateOffers