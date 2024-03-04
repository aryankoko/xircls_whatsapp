import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, CardBody } from 'reactstrap'
import SelectElement from '../Components/NewThemeComponents/SelectElement'
// import { main_categories, sub_categories } from '../../Helper/data'
import Select from 'react-select'
import { Info, Paperclip, Trash } from 'react-feather'
import { SuperLeadzBaseURL, getReq } from '../../assets/auth/jwtService'
import waterMark from "@src/assets/images/logo/xircls-waterMark.png"
import { getCurrentOutlet, imageValidation } from '../Validator'
import { Kidoptions, Maleoptions, RatioList, callToAction } from '../../Helper/data'
import { PermissionProvider } from '../../Helper/Context'

const defaultData = {
    offer_type: "Acquisition",
    discount_code: "",
    discount_level: "NBXGY",
    discount_type: "percentage",
    discount_value: "",
    discount_quantity: "",
    product_get: [],
    discount_applied: "Value",
    cart_condition: "All",
    min_order_value: "",
    customer_buys: "",
    product_buys: [],
    customer_eligibility: "All",
    lifetime_order_count: "",
    start_date: "",
    start_time: "",
    isEndData: false,
    end_date: "",
    end_time: "",
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
    customer_buys_list: [],
    customer_gets_list: []
}

const Create_offerss = () => {
    const { userPermission } = useContext(PermissionProvider)
    const [curStep, setCurStep] = useState(1)
    const [offerData, setOfferData] = useState(defaultData)
    // const [endDateVal, setEndDateVal] = useState("")
    const [productList, setProductList] = useState([])
    const [productData, setProductData] = useState([])
    const [catData, setCatData] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [imageUrl, setImageUrl] = useState(waterMark)
    const [imageObject, setimageObject] = useState({})
    const outletData = getCurrentOutlet()

    function SelectedCard (e, id) {
        document.getElementById(`offer_parent_${id}`).classList.toggle('active_parent_card')

        if (document.getElementById(`offer_parent_${id}`).classList.contains('active_parent_card')) {
            console.log('true')
            setOfferData({...offerData, main_categories: [...offerData?.main_categories, Number(id)]})
        } else {
            console.log('false')
            setOfferData({...offerData, main_categories: offerData?.main_categories.filter((curElem) => { return curElem !== Number(id) })})
        }

    }

    function SelectedSubCard (e, id) {

        // console.log(e.target.classList.toggle('active_parent_card'))
        document.getElementById(`offer_subParent_${id}`).classList.toggle('active_parent_card')

        if (document.getElementById(`offer_subParent_${id}`).classList.contains('active_parent_card')) {
            console.log('true')
            setOfferData({...offerData, sub_categories: [...offerData?.sub_categories, Number(id)]})
        } else {
            console.log('false')
            setOfferData({...offerData, sub_categories: offerData.sub_categories.filter((curElem) => { return curElem !== Number(id) })})
        }

    }

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

    const saveOfferData = () => {

        const form_data = new FormData()

        // const data = {
        //     offer_type: offerData.offer_type,
        //     discount_code: offerData.discount_code,
        //     discount_level: offerData.discount_level,
        //     discount_type: offerData.discount_type,
        //     discount_value: offerData.discount_value,
        //     discount_quantity: offerData.discount_quantity,
        //     product_get: offerData.product_get,
        //     discount_applied: offerData.discount_applied,
        //     cart_condition: offerData.cart_condition,
        //     min_order_value: offerData.min_order_value,
        //     customer_buys: offerData.customer_buys,
        //     product_buys: offerData.product_buys,
        //     customer_eligibility: offerData.customer_eligibility,
        //     lifetime_order_count: offerData.lifetime_order_count,
        //     start_date: offerData.start_date,
        //     start_time: offerData.start_time,
        //     isEndData: offerData.isEndData,
        //     end_date: offerData.isEndData,
        //     end_time: offerData.end_time,
        //     man: offerData.man,
        //     ratio_m: offerData.ratio_m,
        //     women: offerData.women,
        //     ratio_w: offerData.ratio_w,
        //     kid: offerData.kid,
        //     ratio_k: offerData.ratio_k,
        //     main_categories: offerData.main_categories,
        //     sub_categories: offerData.sub_categories

        // }

        Object.entries(offerData).map(([key, value]) => {
            form_data.append(key, value)
        })

        form_data.append('offer_image', Object.keys(imageObject).length === 0 ? "" : imageObject)
        form_data.append('all_categories', offerData.main_categories.concat(offerData.sub_categories))

        console.log(form_data)
    }

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
            // console.log(data.response.products)
            setProductData(data.response.products)
            setProductList(data.response.products.map((curElem) => {
                return {value: curElem.id, label: curElem.title}
            }))
        })
    }

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

    const updateOfferData = (e) => {
        setOfferData({...offerData, [e.target.name]: e.target.value })
    }

    const handleChange = (options, actionMeta, check) => {
        if (check) { 
            const option_list = options.map((cur) => {
                return cur.value
            })
            setOfferData({...offerData, [actionMeta.name]: option_list })
        } else {
            setOfferData({...offerData, [actionMeta.name]: options.value })
        }
    
    }


    useEffect(() => {
        getCategory()
        getProduct()
    }, [])

    console.log(offerData)


    return (
        <>
        <div className="container">
            <div className="row">
                <div className="col-2">
                    <img className="py-2" src="https://api.xircls.com/static/images/website-slide/logo-dark2.png" alt="Logo" width="70%" / >
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-md-2 col-sm-4">
                    <div className={`step d-flex justify-content-start align-items-center ${curStep === 1 && "tab_active"}`} style={{gap: `10px`, cursor: "pointer"}} onClick={() => setCurStep(1)}>
                        <div className="number_count">1</div>
                        <h6 style={{margin: "0px"}}>Create Offers</h6>
                    </div>
                </div>
                <div className="col-md-2 col-sm-4">
                    <div className={`step d-flex justify-content-start align-items-center ${curStep === 2 && "tab_active"}`} style={{gap: `10px`, cursor: "pointer"}} onClick={() => setCurStep(2)}>
                        <div className="number_count">2</div>
                        <h6 style={{margin: "0px"}}>Cart Condition</h6>
                    </div>
                </div>
                <div className="col-md-2 col-sm-4">
                    <div className={`step d-flex justify-content-start align-items-center ${curStep === 3 && "tab_active"}`} style={{gap: `10px`, cursor: "pointer"}} onClick={() => setCurStep(3)}>
                        <div className="number_count">3</div>
                        <h6 style={{margin: "0px"}}>Customer eligibility</h6>
                    </div>
                </div>
                <div className="col-md-2 col-sm-4">
                    <div className={`step d-flex justify-content-start align-items-center ${curStep === 4 && "tab_active"}`} style={{gap: `10px`, cursor: "pointer"}} onClick={() => setCurStep(4)}>
                        <div className="number_count">4</div>
                        <h6 style={{margin: "0px"}}>Usage limits</h6>
                    </div>
                </div>

                <div className="col-md-2 col-sm-4">
                    <div className={`step d-flex justify-content-start align-items-center ${curStep === 5 && "tab_active"}`} style={{gap: `10px`, cursor: "pointer"}} onClick={() => setCurStep(5)}>
                        <div className="number_count">5</div>
                        <h6 style={{margin: "0px"}}>Targeting</h6>
                    </div>
                </div>

                <div className="col-md-2 col-sm-4">
                    <div className={`step d-flex justify-content-start align-items-center ${curStep === 6 && "tab_active"}`} style={{gap: `10px`, cursor: "pointer"}} onClick={() => setCurStep(6)}>
                        <div className="number_count">6</div>
                        <h6 style={{margin: "0px"}}>Action</h6>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="row match-height">
                        <div className="col-xl-7 mb-3">
                            
                            {
                                curStep === 1 ? <>

                                    <Card>
                                        <CardBody>
                                            <h4>Offer Type</h4>
                                            <div className="xircls_radio">
                                                <div className='mt-1'>
                                                    <input
                                                        type='radio'
                                                        name="offer_type"
                                                        id="acquisition"
                                                        checked={offerData.offer_type === "Acquisition"}
                                                        value="Acquisition"
                                                        onChange={(e) => updateOfferData(e)}
                                                    />
                                                    <label for="acquisition">Acquisition</label>
                                                </div>
                                                <div className='mt-1'>
                                                    <input
                                                        type='radio'
                                                        name="offer_type"
                                                        id="Retention"
                                                        checked={offerData.offer_type === "Retention"}
                                                        value="Retention"
                                                        onChange={(e) => updateOfferData(e)}
                                                    />
                                                    <label for="Retention">Retention</label>
                                                </div>
                                                
                                            </div>
                                        </CardBody>
                                    </Card>

                                    <Card>
                                        <CardBody>
                                            <h4>Method of application</h4>
                                            
                                            <div className="input_div mt-1">
                                                <div className="row">
                                                    <div className="col-md-8">
                                                        <label htmlFor="">Code</label>
                                                        <input placeholder="Discount Code" name='discount_code' type="text" className="w-100 from-control-offer" onChange={(e) => updateOfferData(e)} value={offerData.discount_code} />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <button  style={{ backgroundColor: 'black', marginTop: `20px`}} onClick={() =>  setOfferData({...offerData, discount_code: Math.random().toString(36).substring(2, 16).toUpperCase() })} className="btn px-3 text-white waves-effect waves-float waves-light">Generate Coupon</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>

                                    <Card>
                                        <CardBody>
                                            <h4>What should this discount do?</h4>
                                            <div className="xircls_radio">

                                                <div className='mt-1'>
                                                    <input
                                                        type='radio'
                                                        name="discount_level"
                                                        id="orderOff"
                                                        checked={offerData.discount_level === "NBXGY"}
                                                        value="NBXGY"
                                                        onChange={(e) => updateOfferData(e)}
                                                    />
                                                    <label for="orderOff">Give a discount on cart value</label>
                                                </div>

                                                <div className='mt-1'>
                                                    <input
                                                        type='radio'
                                                        name="discount_level"
                                                        id="xyOff"
                                                        checked={offerData.discount_level === "BXGY"}
                                                        value="BXGY"
                                                        onChange={(e) => updateOfferData(e)}
                                                    />
                                                    <label for="xyOff">Add free or discounted products to cart</label>
                                                </div>

                                                {/* <div className='mt-1'>
                                                    <input
                                                        type='radio'
                                                        name="method"
                                                        id="productOff"
                                                        checked={offerData.discount_level === "bundle"}
                                                        value="bundle"
                                                        onChange={() => setDiscountType(event.target.value)}
                                                    />
                                                    <label for="productOff">Create a bundle</label>
                                                </div> */}

                                            </div>
                                        </CardBody>
                                    </Card>

                                    {
                                        offerData.discount_level === "NBXGY" ? <>
                                            <Card>
                                                <CardBody>
                                                    <h4>What should this discount be applied on?</h4>
                                                    <div className="xircls_radio">

                                                        <div className='mt-1'>
                                                            <input
                                                                type='radio'
                                                                name="discount_applied"
                                                                id="totalOrderValue"
                                                                checked={offerData.discount_applied === "Value"}
                                                                value="Value"
                                                                onChange={(e) => updateOfferData(e)}
                                                            />
                                                            <label for="totalOrderValue">On total order value</label>
                                                        </div>

                                                        <div className='mt-1'>
                                                            <input
                                                                type='radio'
                                                                name="discount_applied"
                                                                id="sepcificProduct"
                                                                checked={offerData.discount_applied === "Product"}
                                                                value="Product"
                                                                onChange={(e) => updateOfferData(e)}
                                                            />
                                                            <label for="sepcificProduct">On specific products</label>
                                                        </div>

                                                        <div className='mt-1'>
                                                            <input
                                                                type='radio'
                                                                name="discount_applied"
                                                                id="specificCollection"
                                                                checked={offerData.discount_applied === "Collection"}
                                                                value="Collection"
                                                                onChange={(e) => updateOfferData(e)}
                                                            />
                                                            <label for="specificCollection">On specific collections</label>
                                                        </div>

                                                        {
                                                            offerData.discount_applied === "Product" ? <div>
                                                                <Select
                                                                    isMulti = {false}
                                                                    options={productList}
                                                                    inputId="aria-example-input"
                                                                    closeMenuOnSelect={true}
                                                                    name="product_get"
                                                                    placeholder="Add Product"
                                                                    onChange={(value, actionMeta) => handleChange(value, actionMeta, false)}
                                                                />
                                                                {/* <SelectElement placeholder="Add Product" options={productList} setSelectedOptions={setCustomerGet} isMulti={false} /> */}
                                                            </div> : offerData.discount_applied === "Collection" ? <div>
                                                                <Select
                                                                    isMulti = {false}
                                                                    options={productList}
                                                                    inputId="aria-example-input"
                                                                    closeMenuOnSelect={true}
                                                                    name="product_get"
                                                                    placeholder="Add collections"
                                                                    onChange={(value, actionMeta) => handleChange(value, actionMeta, false)}
                                                                />
                                                                {/* <SelectElement placeholder="Add collections" options={productList} setSelectedOptions={setCustomerGet} isMulti={false} /> */}
                                                            </div> : ""
                                                        }

                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </> : ''
                                    }

                                    <Card>
                                        <CardBody>
                                            <h4>Set discount value</h4>
                                            <div className="xircls_radio">
                                                <div className='mt-1'>
                                                    <input
                                                        type='radio'
                                                        name="discount_type"
                                                        id="percent"
                                                        value='percentage'
                                                        checked={offerData.discount_type === 'percentage'}
                                                        onChange={(e) => updateOfferData(e)}
                                                    />
                                                    <label for="percent">Percentage off</label>
                                                </div>

                                                <div className='mt-1'>
                                                    <input
                                                        type='radio'
                                                        name="discount_type"
                                                        id="flat"
                                                        value='flat'
                                                        checked={offerData.discount_type === 'flat'}
                                                        onChange={(e) => updateOfferData(e)}
                                                    />
                                                    <label for="flat">Fixed amount</label>
                                                </div>
                                            </div>
                                            <div className="input_div mt-1">
                                                <div className="row">
                                                    <div className="col-4">
                                                        <label htmlFor="">{offerData.discount_type === 'percentage' ? "Percentage off" : "Discount value"}</label>
                                                        <input placeholder={offerData.discount_type === 'percentage' ? "%" : `${userPermission?.currencySymbol}`} name='discount_value' type="text" className="w-100 from-control-offer" onChange={(e) => updateOfferData(e)} value={offerData.discount_value} />
                                                    </div>
                                                    {
                                                        offerData.discount_level === "BXGY" ? <div className='col-4'>
                                                            <label htmlFor="">Quantity of products</label>
                                                            <input type="text" className="w-100 from-control-offer" name='discount_quantity' onChange={(e) => updateOfferData(e)} value={offerData.discount_quantity} />
                                                        </div> : ""
                                                    }
                                                    
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>

                                    {
                                        offerData.discount_level === "BXGY" ? <>
                                            <Card>
                                                <CardBody>
                                                    <h4>Products to be added</h4>
                                                    <SelectElement placeholder="Select" options={productList} setSelectedOptions={setCustomerGet} isMulti={true} />
                                                </CardBody>
                                            </Card>
                                        </> : ""
                                    }

                                </> : curStep === 2 ? <>
                                    {
                                        offerData.discount_applied === "Value" ? "" : <Card>
                                            <CardBody>
                                                <div className="parent d-flex justify-content-start align-items-center gap-1 mb-1">
                                                    <h4 className='m-0'>Items on which discounts will be applied</h4>
                                                    <div className='cursor-pointer' title='These items will need to be present in the cart for the discount to be applied'>
                                                        <Info size={18} />
                                                    </div>
                                                </div>
                                                {
                                                    productData ? productData.map((curElem, i) => {
                                                        return curElem.id === offerData.product_buys ? <div key={i}>
                                                            <div className="parent d-flex justify-content-start align-items-center gap-1">
                                                                <img width="100px" src={curElem.image?.src} alt="Image" />
                                                                <h5>{curElem?.title}</h5>
                                                            </div>
                                                        </div> : " "
                                                    }) : ""
                                                }

                                            </CardBody>
                                        </Card>
                                    }

                                    <Card>
                                        <CardBody>
                                            <h4 className='subCardTitle'>Cart Conditions</h4>
                                            <div className="xircls_radio">
                                                <div className='mt-1'>
                                                    <input
                                                        type='radio'
                                                        name="cart_condition"
                                                        id="noCondition"
                                                        checked={offerData.cart_condition === "All"}
                                                        value="All"
                                                        onChange={(e) => updateOfferData(e)}
                                                    />
                                                    <label for="noCondition">No conditions</label>
                                                </div>

                                                <div className='mt-1'>
                                                    <input
                                                        type='radio'
                                                        name="cart_condition"
                                                        id="pCondition"
                                                        checked={offerData.cart_condition === "Amount"}
                                                        value="Amount"
                                                        onChange={(e) => updateOfferData(e)}
                                                    />
                                                    <label for="pCondition">Purchase amount of items in the cart</label>
                                                </div>

                                                <div className='mt-1'>
                                                    <input
                                                        type='radio'
                                                        name="cart_condition"
                                                        id="ncCondition"
                                                        checked={offerData.cart_condition === "Items"}
                                                        value="Items"
                                                        onChange={(e) => updateOfferData(e)}
                                                    />
                                                    <label for="ncCondition">Number of items in cart</label>
                                                </div>

                                            </div>
                                        </CardBody>
                                    </Card>

                                    {
                                        offerData.cart_condition === "Amount" || offerData.cart_condition === "Items" ? <>
                                            <Card>
                                                <CardBody>
                                                    <h4>Customer buys</h4>
                                                    
                                                    <div>
                                                        <label htmlFor="">{ offerData.cart_condition === "Amount" ? "Amount" : offerData.cart_condition === "Items" ? "Minimum quantity" : ""}</label> <br />
                                                        <input type="text" className="w-40 from-control-offer" placeholder={ offerData.cart_condition === "Amount" ? `${userPermission?.currencySymbol} 0.00` : offerData.cart_condition === "Items" ? "0" : ""} name="min_order_value" onChange={(e) => updateOfferData(e)} value={offerData.min_order_value} />
                                                    </div>

                                                    <div className="xircls_radio mb-1">
                                                        <div className='mt-1'>
                                                            <input
                                                                type='radio'
                                                                name="customer_buys"
                                                                id="no_condition"
                                                                checked={offerData.customer_buys === "All"}
                                                                value="All"
                                                                onChange={(e) => updateOfferData(e)}
                                                            />
                                                            <label for="no_condition">For the entire cart</label>
                                                        </div>
 
                                                        <div className='mt-1'>
                                                            <input
                                                                type='radio'
                                                                name="customer_buys"
                                                                id="amountp"
                                                                checked={offerData.customer_buys === "Product"}
                                                                value="Product"
                                                                onChange={(e) => updateOfferData(e)}
                                                            />
                                                            <label for="amountp">For specific products in cart</label>
                                                        </div>

                                                        <div className='mt-1'>
                                                            <input
                                                                type='radio'
                                                                name="customer_buys"
                                                                id="itemsC"
                                                                checked={offerData.customer_buys === "Collections"}
                                                                value="Collections"
                                                                onChange={(e) => updateOfferData(e)}
                                                            />
                                                            <label for="itemsC">For products in specific collections in cart</label>
                                                        </div>

                                                    </div>

                                                    {
                                                        offerData.customer_buys === "Product" ? <div>
                                                            <Select
                                                                isMulti = {true}
                                                                options={productList}
                                                                inputId="aria-example-input"
                                                                closeMenuOnSelect={true}
                                                                name="product_buys"
                                                                placeholder="Add Product"
                                                                onChange={(value, actionMeta) => handleChange(value, actionMeta, true)}
                                                            />
                                                            {/* <SelectElement placeholder="Add Product" options={productList} setSelectedOptions={setCustomerBuy} isMulti={false} /> */}
                                                        </div> : offerData.customer_buys === "Collections" ? <div>
                                                            <Select
                                                                isMulti = {true}
                                                                options={productList}
                                                                inputId="aria-example-input"
                                                                closeMenuOnSelect={true}
                                                                name="product_buys"
                                                                placeholder="Add collections"
                                                                onChange={(value, actionMeta) => handleChange(value, actionMeta, true)}
                                                            />
                                                            {/* <SelectElement placeholder="Add collections" options={productList} setSelectedOptions={setCustomerBuy} isMulti={false} /> */}
                                                        </div> : ""
                                                    }
                                                </CardBody>
                                            </Card>
                                        </> : ""
                                    }

                                </> : curStep === 3 ? <>

                                    <Card>
                                        <CardBody>
                                            <h4 className='subCardTitle'>Customer eligibility</h4>
                                            <div className="xircls_radio">
                                                <div className='mt-1'>
                                                    <input
                                                        type='radio'
                                                        name="customer_eligibility"
                                                        id="allCust"
                                                        checked={offerData.customer_eligibility === "All"}
                                                        value="All"
                                                        onChange={(e) => updateOfferData(e)}
                                                    />
                                                    <label for="allCust">All customers</label>
                                                </div>

                                                <div className='mt-1'>
                                                    <input
                                                        type='radio'
                                                        name="customer_eligibility"
                                                        id="firsttimeCustomer"
                                                        checked={offerData.customer_eligibility === "First-time"}
                                                        value="First-time"
                                                        onChange={(e) => updateOfferData(e)}
                                                    />
                                                    <label for="firsttimeCustomer">First-time customers</label>
                                                </div>

                                                <div className='mt-1 mb-1'>
                                                    <input
                                                        type='radio'
                                                        name="customer_eligibility"
                                                        id="lifetime_order_count"
                                                        checked={offerData.customer_eligibility === "Lifetime"}
                                                        value="Lifetime"
                                                        onChange={(e) => updateOfferData(e)}
                                                    />
                                                    <label for="lifetime_order_count">Lifetime order count</label>
                                                </div>

                                                {
                                                    offerData.customer_eligibility === "Lifetime" ? <>
                                                        <div>
                                                            <label htmlFor="min_order">Minimum</label>
                                                            <input id='min_order' type="text" className="w-40 from-control-offer" name='lifetime_order_count' onChange={(e) => updateOfferData(e)} value={offerData.lifetime_order_count} placeholder="0" />
                                                        </div>
                                                            
                                                    </> : ""
                                                }

                                            </div>
                                        </CardBody>
                                    </Card>

                                    
                                </> : curStep === 4 ? <>

                                    {/* <Card>
                                        <CardBody>
                                            <h4>Maximum discount uses</h4>
                                            <div className="maximum_discount row mb-3">
                                                <div className='d-flex justify-content-start align-items-center mb-1' style={{gap: '8px'}}>
                                                    <input
                                                        type='checkbox'
                                                        id="limit_times"
                                                        checked={limitNumber}
                                                        onChange={() => setLimitNumber(!limitNumber)}
                                                    />
                                                    <label htmlFor="limit_times">Limit number of times this discount can be used in total</label>
                                                
                                                </div>
                                                {
                                                    limitNumber ? <div className='mb-1'>
                                                            <input placeholder="Discount Code" type="text" className="w-100 from-control-offer" onChange={() => setLimitTimes(event.target.value)} value={limitTimes} />
                                                        </div> : ''
                                                }
                                                <div className='d-flex justify-content-start align-items-center' style={{gap: '8px'}}> 
                                                    <input
                                                        type='checkbox'
                                                        id="limit_once"
                                                        checked={limitOnce}
                                                        onChange={() => setLimitOnce(!limitOnce)}
                                                    />
                                                    <label htmlFor="limit_once">Limit to one use per customer</label>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                    
                                    <Card>
                                        <CardBody>
                                            <h4>Combinations</h4>
                                            <p><b>{code}</b> can be combined with:</p>
                                            <div className="parent mb-1">
                                                <div className='d-flex justify-content-start align-items-center' style={{gap: '8px'}}>
                                                    <input
                                                        type='checkbox'
                                                        id="all_custom"
                                                        checked={comProduct}
                                                        onChange={() => setComProduct(!comProduct)}
                                                    />
                                                    <label htmlFor="all_custom">All</label>
                                                
                                                </div>
                                                {
                                                    comProduct ? <p style={{marginTop: '5px', fontSize: '13px', color: "#1d1d1d"}}>No product discounts are currently set to combine. To let customers use more than one discount, set up at least one product discount that combines with product discounts.</p> : ""
                                                }
                                            </div>

                                            {
                                                offerData.discount_level === "Amount Off Order" ? "" : <>
                                                <div className="parent">
                                                    <div className='d-flex justify-content-start align-items-center' style={{gap: '8px'}}>
                                                        <input
                                                            type='checkbox'
                                                            id="sec_custom"
                                                            checked={comDiscount}
                                                            onChange={() => setComDiscount(!comDiscount)}
                                                        />
                                                        <label htmlFor="sec_custom">Specific customer segments</label>
                                                    
                                                    </div>
                                                    {
                                                        comDiscount ? <p style={{marginTop: '5px', fontSize: '13px', color: "#1d1d1d"}}>No shipping discounts are currently set to combine. To let customers use more than one discount, set up at least one shipping discount that combines with product discounts.</p> : ""
                                                    }

                                                </div>
                                                </>
                                            }
                                        </CardBody>
                                    </Card> */}

                                    <Card>
                                        <CardBody>
                                            <h4 >Active dates</h4>
                                            <div className="active_date row mb-1">

                                                <div className="active_date" style={{display: `flex`, justifyContent: `space-between`, alignItems: "center"}}>
                                                    <div className="form-group" style={{flexBasis:"48%" }}>
                                                        <label htmlFor="start_date">Start Date:</label>
                                                        <div>
                                                            <input type="date" id="start_date" name="start_date" className="w-100 from-control-offer" onChange={(e) => updateOfferData(e) } value={offerData.start_date} /> 
                                                        </div>
                                                    </div>

                                                    <div className="form-group" style={{flexBasis:"48%" }}>
                                                        <label htmlFor="start_time">Start Time:</label>
                                                        <div>
                                                            <input type="time" id="start_time" name="start_time" className="w-100 from-control-offer" onChange={(e) => updateOfferData(e) } value={offerData.start_time}  /> 
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            <div>
                                                <div className='d-flex justify-content-start align-items-center' style={{gap: '8px'}}>
                                                    <input
                                                        type='checkbox'
                                                        id="setEndDate"
                                                        checked={offerData.isEndData}
                                                        onChange={() => setOfferData({...offerData, isEndData: !offerData.isEndData})}
                                                    />
                                                    <label htmlFor="setEndDate">Set End Date ?</label>
                                                
                                                </div>
                                                {
                                                    offerData.isEndData ? <>
                                                        <div className="active_date mt-1" style={{display: `flex`, justifyContent: `space-between`, alignItems: "center"}}>
                                                            <div className="form-group" style={{flexBasis:"48%" }}>
                                                                <label htmlFor="end_date">End Date:</label>
                                                                <div>
                                                                    <input type="date" id="end_date" name="end_date" className="w-100 from-control-offer" value={offerData.end_date} onChange={(e) => updateOfferData(e)} /> 
                                                                </div>
                                                            </div>

                                                            <div className="form-group" style={{flexBasis:"48%" }}>
                                                                <label htmlFor="end_time">End Time:</label>
                                                                <div>
                                                                    <input type="time" id="end_time" name="end_time" className="w-100 from-control-offer" value={offerData.end_time} onChange={(e) => updateOfferData(e)} /> 
                                                                </div>
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
                                            <h4 className='mb-1'>Select your audience</h4>
                                            <div className="accordion" id="accordionExample">
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id="headingOne">
                                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                        Male
                                                    </button>
                                                    </h2>
                                                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                        <div className="accordion-body">
                                                            <div className="w-100 pb-1">
                                                                <Select
                                                                    isMulti = {true}
                                                                    options={Maleoptions}
                                                                    inputId="aria-example-input"
                                                                    closeMenuOnSelect={true}
                                                                    name="man"
                                                                    placeholder="Age"
                                                                    onChange={(value, actionMeta) => handleChange(value, actionMeta, true)}
                                                                />
                                                                {/* <SelectElement options={Maleoptions} setSelectedOptions={setSelectedMale} isMulti={true} placeholder="Age" /> */}
                                                            </div>
                                                            <div className="w-100 pb-1">
                                                                <Select
                                                                    isMulti = {false}
                                                                    options={RatioList}
                                                                    inputId="aria-example-input"
                                                                    closeMenuOnSelect={true}
                                                                    name="ratio_m"
                                                                    placeholder="Ratio"
                                                                    onChange={(value, actionMeta) => handleChange(value, actionMeta, false)}
                                                                />
                                                                {/* <SelectElement options={RatioList} setSelectedOptions={setMaleratio} isMulti={false} placeholder="Ratio" /> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id="headingTwo">
                                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                        Female
                                                    </button>
                                                    </h2>
                                                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                                        <div className="accordion-body">
                                                            <div className="w-100 pb-1">
                                                                <Select
                                                                    isMulti = {true}
                                                                    options={Maleoptions}
                                                                    inputId="aria-example-input"
                                                                    closeMenuOnSelect={true}
                                                                    name="women"
                                                                    placeholder="Age"
                                                                    onChange={(value, actionMeta) => handleChange(value, actionMeta, true)}
                                                                />
                                                                {/* <SelectElement options={Maleoptions} setSelectedOptions={setSelectedFemale} isMulti={true} placeholder="Age" />  */}

                                                            </div>
                                                            <div className="w-100 pb-1">
                                                                <Select
                                                                    isMulti = {false}
                                                                    options={RatioList}
                                                                    inputId="aria-example-input"
                                                                    closeMenuOnSelect={true}
                                                                    name="ratio_w"
                                                                    placeholder="Ratio"
                                                                    onChange={(value, actionMeta) => handleChange(value, actionMeta, false)}
                                                                />
                                                                {/* <SelectElement options={RatioList} setSelectedOptions={setFemaleRatio} isMulti={false} placeholder="Ratio" />  */}
                                                                {/* <Select placeholder="Ratio" options={RatioList} /> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id="headingThree">
                                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                        Kids
                                                    </button>
                                                    </h2>
                                                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                                        <div className="accordion-body">
                                                            <div className="w-100 pb-1">
                                                                <Select
                                                                    isMulti = {true}
                                                                    options={Kidoptions}
                                                                    inputId="aria-example-input"
                                                                    closeMenuOnSelect={true}
                                                                    name="kid"
                                                                    placeholder="Age"
                                                                    onChange={(value, actionMeta) => handleChange(value, actionMeta, true)}
                                                                />
                                                                {/* <SelectElement options={Kidoptions} setSelectedOptions={setSelectedKid} isMulti={true} placeholder="Age" />  */}
                                                            </div>
                                                            <div className="w-100 pb-1">
                                                                <Select
                                                                    isMulti = {false}
                                                                    options={RatioList}
                                                                    inputId="aria-example-input"
                                                                    closeMenuOnSelect={true}
                                                                    name="ratio_k"
                                                                    placeholder="Ratio"
                                                                    onChange={(value, actionMeta) => handleChange(value, actionMeta, false)}
                                                                />
                                                                {/* <SelectElement options={RatioList} setSelectedOptions={setKidsRatio} isMulti={false} placeholder="Ratio" /> */}
                                                                    
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>


                                    <Card>
                                        <CardBody>
                                            <h4>Category</h4>
                                            <div className='col-12 noscroller' style={{height: `300px`, overflow: 'auto', padding: '10px 15px'}}>
                                                <div className="d-flex just-content-start align-items-start flex-wrap gap-2">
                                                    {
                                                        catData ? catData.map((cur, i) => {
                                                            return <div className='cursor-pointer' key={i} style={{padding: `15px 20px`, borderRadius: '5px', boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`}} id={`offer_parent_${cur.id}`} onClick={(e) => SelectedCard(e, `${cur.id}`) }>
                                                                    <h6 className='m-0'>{cur.name}</h6>
                                                                </div>
                                                            
                                                        }) : <>

                                                        </>
                                                    }
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                    {
                                        offerData.main_categories.length > 0 ? <>
                                            <Card>
                                                <CardBody>
                                                <h4 className='mb-1'>Sub Categories</h4>
                                                <div className='col-12 noscroller' style={{height: `300px`, overflow: 'auto', padding: '10px 15px'}}>
                                                    <div className="d-flex just-content-start align-items-start flex-wrap gap-2">
                                                        {
                                                            subCategories ? subCategories.filter((curElem) => {
                                                                return offerData.main_categories.includes(curElem.parent_id)
                                                            }).map((cur, i) => {
                                                                return <div className='cursor-pointer' key={i} style={{padding: `15px 20px`, borderRadius: '5px', boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`}} id={`offer_subParent_${cur.id}`} onClick={(e) => SelectedSubCard(e, `${cur.id}`) }>
                                                                        <h6 className='m-0'>{cur.name}</h6>
                                                                    </div>
                                                                
                                                            }) : ""
                                                        }
                                                    </div>
                                                </div>
                                                </CardBody>
                                            </Card>
                                        </> : ""
                                    }

                                    
                                </> : curStep === 6 ? <>
                                    {/* <Card>
                                        <CardBody>
                                            <h4>Preview</h4>
                                            <div
                                                className="offer_box"
                                                style={{
                                                backgroundColor: "#efefef",
                                                padding: 15,
                                                borderRadius: 8,
                                                display: "flex",
                                                justifyContent: "center",
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
                                                Get a FLAT Rs. 250 OFF on Knit Shirts!
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
                                                    {offerData.discount_code}
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
                                                    Redeem
                                                </a>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card> */}

                                    <Card>
                                        <CardBody>
                                            <h4>Offer Image</h4>
                                            <div className="d-flex gap-2 mb-2 align-items-center mt-1">
                                                <div className="w-75">
                                                    <div className="main-wrapper d-flex justify-content-between align-items-center">
                                                        <div className="image-view">
                                                            <img className='image_viewer' width="200px" height="100px" src={imageUrl} alt="Your Logo" />
                                                        </div>
                                                        <div className="image-action d-flex justify-content-start align-items-center gap-1">
                                                            <input placeholder="Enter Your Outlet Name" type="file" className="w-100 d-none" name="offer_image" id="offer_image" onChange={(e) => imageActions(e)} />
                                                            <label htmlFor="offer_image" style={{background: '#000', padding: '8px 10px', borderRadius: '7px', color: '#fff', cursor: 'pointer'}}>
                                                                <Paperclip size={17} />
                                                            </label>
                                                            <label style={{background: 'red', padding: '8px 10px', borderRadius: '7px', color: '#fff', cursor: 'pointer'}} onClick={() => setImageUrl(waterMark)}>
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
                                                <label htmlFor="">Offer Title</label>
                                                <input name='offer_title' type="text" className="w-100 from-control-offer" onChange={(e) => updateOfferData(e)} value={offerData.offer_title} />
                                            
                                            </div>
                                            <div className="inputs mt-2">
                                                <label htmlFor="">Offer Descr                                                                                                                                        iption</label>
                                                <textarea name='offer_description' type="text" className="w-100 from-control-offer" onChange={(e) => updateOfferData(e)} value={offerData.offer_description} />
                                            
                                            </div>
                                            <div className="inputs mt-2">
                                                <div className="row">
                                                    <div className="col-6">
                                                        <label htmlFor="">Call to Action</label>
                                                        <Select
                                                            isMulti = {false}
                                                            options={callToAction}
                                                            inputId="aria-example-input"
                                                            closeMenuOnSelect={true}
                                                            name="call_to_action"
                                                            onChange={(value, actionMeta) => handleChange(value, actionMeta, false)}
                                                        />
                                                    </div>
                                                    <div className="col-6">
                                                        <label htmlFor="">Call to Action URL</label>
                                                        <input name='call_to_action_url' type="text" className="w-100 from-control-offer" onChange={(e) => updateOfferData(e)} value={offerData.call_to_action_url} />
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </CardBody>
                                    </Card>
                                </> : ""
                            }

                            <div className="action_btn mt-3 d-flex justify-content-between align-items-center">
                                <a onClick={() => setCurStep(curStep === 1 ? 1 : curStep - 1) } style={{ width: `130px`, padding: `8px 25px`, textDecoration: `none`, color: `#464646`, fontSize: `18px`, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>Back</a>
                                <a onClick={curStep === 6 ? () => saveOfferData() : () => setCurStep(curStep + 1)} style={{ width: `130px`, padding: `8px 25px`, textDecoration: `none`, color: `#fff`, fontSize: `18px`, background: `#000`, borderRadius: `10px`, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>{curStep === 5 ? "Save" : "Next" } </a>
                            </div>
                        </div>
                        <div className="col-xl-5">
                            <Card>
                                <CardBody>
                                    <h5>Summary</h5>
                                    <hr />
                                    <h5><b>Code</b> - {offerData.discount_code} </h5>
                                    <h5><b>Offer Type</b> - {offerData.discount_level} </h5>
                                    <div className="method mt-1">
                                        <h6><b>Type and method</b></h6>
                                        <ul>
                                            <li>{offerData.discount_level}</li>
                                            <li className='text-capitalize'>{offerData.discount_type}</li>
                                        </ul>
                                    </div>
                                    
                                    <div className="method mt-1">
                                        <h6><b>Cart Condition</b></h6>
                                        <ul>
                                            <li>{offerData.cart_condition}</li>
                                        </ul>
                                    </div>
                                    <div className="method mt-1">
                                        <h6><b>Customer eligibility</b></h6>
                                        <ul>
                                            <li>{offerData.customer_eligibility}</li>
                                        </ul>
                                    </div>

                                </CardBody>
                            </Card>
                        </div>
                    </div>
                        
                </div>

            </div>
        </div>

        </>
    )
}

export default Create_offers