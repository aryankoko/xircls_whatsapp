import moment from "moment/moment"
import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import { Card, CardBody, Input, Col, Row, Label } from "reactstrap"
import { getReq, putReq } from "../../assets/auth/jwtService"
import Flatpickr from 'react-flatpickr'
import Select from 'react-select'
import Spinner from "../Components/DataTable/Spinner"
import toast from "react-hot-toast"

const PreviewInnerXircl = () => {
    const { id } = useParams()
    const location = useLocation()
    const [allOffers, setAlloffers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState({
        name: "",
        Objective:  "loyalty",
        group_start_date:  moment(new Date()).format('YYYY-MM-DD'),
        group_end_date:  moment(new Date()).format('YYYY-MM-DD'),
        location_selected: 'global',
        selectedCurrency: "",
        selectedCountry: [],
        selectedState: [],
        selectCities: [],
        max_spend_val: '',
        min_spend_val: ''
    })

    console.log(location)

    const navigate = useNavigate()

    const getData = () => {
        getReq("innerXirclTwo", `?id=${id}`)
        .then((resp) => {
            console.log(resp)
            const updatedData = {
                name: resp?.data?.data?.inner_xircl_info?.name,
                Objective:  resp?.data?.data?.inner_xircl_info?.Objective,
                group_start_date:  moment(new Date(resp?.data?.data?.inner_xircl_info?.group_start_date)).format('YYYY-MM-DD'),
                group_end_date:  moment(new Date(resp?.data?.data?.inner_xircl_info?.group_end_date)).format('YYYY-MM-DD'),
                location_selected: 'global',
                selectedCurrency: "",
                selectedCountry: [],
                selectedState: [],
                selectCities: [],
                max_spend_val: resp?.data?.data?.inner_xircl_info?.max_spend_val,
                min_spend_val: resp?.data?.data?.inner_xircl_info?.min_spend_val
            }
            let selected_list
            if (resp?.data?.data?.selected_list) {
                selected_list = eval(resp?.data?.data?.selected_list)
            } else {
                selected_list = []
            }

            setAlloffers(selected_list)

            setData(updatedData)
            setIsLoading(false)
        })
        .catch((error) => {
            console.log(error)
            setIsLoading(false)
            // setData([])
        })
    }

    useEffect(() => {
        if (id) {
            getData()
        }
    }, [])

    const saveInnerXirclsDetails = () => {
        const form_data = new FormData()

        form_data.append('is_save', 1)
        form_data.append('id', id)
        putReq("saveInnerXirclsDetails", form_data)
        .then((resp) => {
            console.log(resp)
            toast.success('Updated Successfully')
            navigate("/merchant/view_inner_xircl/")
        })
        .catch((error) => {
            console.log(error)
            toast.error('Something went wrong')
        })

    }    

    return (
        <>
            <Row>
                <Col md="12">
                    <Card>
                        <CardBody>
                            <h4 className="mb-0">Preview Inner XIRCL - {data?.name}</h4>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody>
                            {
                                isLoading ? <div className="d-flex justify-content-center align-items-center"><Spinner /></div> : <>
                                    <div className="form">
                                        <Row>
                                            <Col md="6">
                                                <div className="name">
                                                    <label htmlFor="innerXirclsName">Name your INNER XIRCL</label>
                                                    <input className="form-control" type="text" placeholder="Name of your INNER XIRCL?" name="name" disabled value={data.name} onChange={(e) => updateData(e)} />
                                                </div>
                                            </Col>
                                            <Col md="3">
                                                <div className="name">
                                                    <label htmlFor="innerXirclsName">Minimum Spend</label>
                                                    <input className="form-control" type="number" placeholder="Minimum Spend" name="min_spend_val" disabled value={data.min_spend_val} onChange={(e) => {
                                                        if (!isNaN(e.target.value)) {
                                                            updateData(e)
                                                        }
                                                    }} />
                                                </div>
                                            </Col>
                                            <Col md="3">
                                                <div className="name">
                                                    <label htmlFor="innerXirclsName">Maximum value</label>
                                                    <input className="form-control" type="number" placeholder="Maximum value" name="max_spend_val" disabled value={data.max_spend_val} onChange={(e) => {
                                                        if (!isNaN(e.target.value)) {
                                                            updateData(e)
                                                        }
                                                    }} />
                                                </div>
                                            </Col>
                                            <Col md="4" className="d-none">
                                                <div className="objective custom-control custom-radio">
                                                    <label>Objective: </label>
                                                    <div style={{marginTop: '8px'}} className="parent d-flex justify-content-start align-items-center gap-2">
                                                        <div className='form-check'>
                                                            <Input type='radio' id='Targeting' name='ex1' defaultChecked={data.Objective === "targeting"} />
                                                            <Label className='form-check-label' for='Targeting' onClick={() => setData({...data, Objective: "targeting"})}>
                                                                Targeting 
                                                            </Label>
                                                        </div>
                                                        <div className='form-check'>
                                                            <Input type='radio' name='ex1' id='Loyalty' defaultChecked={data.Objective === "loyalty"} />
                                                            <Label className='form-check-label' for='Loyalty' onClick={() => setData({...data, Objective: "loyalty"})}>
                                                                Loyalty
                                                            </Label>
                                                        </div>

                                                    </div>
                                                </div>
                                            </Col>
                                            
                                        </Row>
                                        <Row className="mt-2">
                                            <Col md="6">
                                                <label htmlFor="">How long do you want this Inner XIRCL to stay active?</label>
                                                <Flatpickr options={{ minDate: "today", dateFormat: "Y-m-d" }} onChange={(e) => setData({...data, group_start_date: moment(e[0]).format('YYYY-MM-DD')})} className='form-control' id='default-picker' style={{background: '#efefef'}} disabled value={data.group_start_date} />
                                            </Col>
                                            <Col md="6">
                                                <label htmlFor=""></label>
                                                <Flatpickr options={{ minDate: "today",  dateFormat: "Y-m-d" }} onChange={(e) => setData({...data, group_end_date: moment(e[0]).format('YYYY-MM-DD')})} className='form-control' id='default-picker' style={{background: '#efefef'}} disabled value={data.group_end_date} />
                                            </Col>
                                        </Row>
                                        <h4 className="mt-2">{allOffers.length === 1 ? `Selected Offer` : `Selected Offers`}</h4>
                                        <Row className="mb-2 match-height">
                                            {
                                                allOffers.length > 0 ? allOffers.map((curElem, i) => {
                                                    return <>
                                                        <Col md="6" lg="4" className="mb-2" key={i}>
                                                        <Card>
                                                            <CardBody>
                                                            <div className="form-check">
                                                                <label htmlFor={`offer_${curElem?.id}`} style={{ cursor: 'pointer', width: '100%' }}>
                                                                <img style={{width: '100%', height: '280px'}} src={`https://www.xircls.com/static${curElem?.offer_image}`} alt="" />
                                                                {/* <img style={{width: '100%'}} src={`${xircls_url}${curElem.offer_image}`} alt="" /> */}
                                        
                                                                <div className='desc mt-2 p-1 border '>
                                                                    <p>
                                                                    {curElem?.short_description}
                                                                    </p>
                                                                </div>
                                                                </label>
                                                            </div>
                                                            
                                                            </CardBody>
                                                        </Card>
                                                        </Col>
                                                    </>
                                                    }) : <>
                                                    <Col md="12" className='text-center'>
                                                        <Card>
                                                        <CardBody>
                                                            <h4>Offer details not found!</h4>
                                                        </CardBody>
                                                        </Card>
                                        
                                                    </Col>
                                                </>
                                            }
                                        </Row>
                                    </div>
                                    <div className="action mt-3 d-flex justify-content-between align-items-center">
                                        <div>
                                            {
                                                location?.state?.from === 'preview' ? '' : <Link to={`/merchant/xircls/inner-xircl/inner_xircl_two/${id}`} className="back btn btn-primary">Back</Link>
                                            }

                                        </div>
                                        
                                        <a className="next btn btn-primary" onClick={() => saveInnerXirclsDetails()}>Save & Close</a>
                                    </div>
                                </>
                            }
                            
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PreviewInnerXircl