import {Row, Col, Card, CardBody} from 'reactstrap'
import CampaignNav from './components/CampaignNav'
import { Edit2, Paperclip, Trash } from 'react-feather'
import { useEffect, useState } from 'react'
import { imageValidation, validForm } from '../Validator'
import { baseURL, getReq, postReq } from '../../assets/auth/jwtService'
import { Link, useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'

const defaultData = {
    imageURL: '',
    bannerURL: '',
    outlet_logo: {},
    outlet_cover_pic: {},
    web_url: '',
    outlet_name: '',
    outlet_description: ''
}

const dataToCheck = [
    {
        name: 'outlet_name',
        message: 'Enter your outlet name',
        type: 'string',
        id: 'outlet_name'
    },
    {
        name: 'web_url',
        message: 'Enter your web URL',
        type: 'string',
        id: 'web_url'
    },
    {
        name: 'imageURL',
        message: 'Please select your outlet logo',
        type: 'string',
        id: 'imageURL'
    },
    {
        name: 'bannerURL',
        message: 'Please select your outlet banner',
        type: 'string',
        id: 'bannerURL'
    },
    {
        name: 'outlet_description',
        message: 'Enter your outlet description',
        type: 'string',
        id: 'outlet_description'
    }
]

const OutletProfiling = () => {

    const [outletData, setOutletData] = useState(defaultData)
    const { id } = useParams()
    const navigate = useNavigate()
    const updateData = (e) => {
        setOutletData({...outletData, [e.target.name]: e.target.value})
    }
    console.log(outletData)
    const getOutletData = () => {
        getReq('outletsDetails', `?OUTLET_ID=${id}&OUTLET_TYPE=SINGLE`)
        .then((resp) => {
            console.log(resp)
            const updatedData = {
                imageURL: resp?.data?.data?.outlet_detail[0]?.outlet_logo ? `${baseURL}/static${resp?.data?.data?.outlet_detail[0]?.outlet_logo}` : '',
                outlet_logo: {},
                web_url: resp?.data?.data?.outlet_detail[0]?.web_url,
                outlet_name: resp?.data?.data.outlet_detail[0]?.outlet_name,
                outlet_description: resp?.data?.data.outlet_detail[0]?.outlet_description,
                bannerURL: resp?.data?.data?.outlet_detail[0]?.outlet_cover_pic ? `${baseURL}/static${resp?.data?.data?.outlet_detail[0]?.outlet_cover_pic}` : '',
                outlet_cover_pic: {}
            }
            setOutletData((preData) => ({
                ...preData,
                ...updatedData
            }))
            // setData(resp.data.data.outlet_detail[0])
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const editOutletData = (type) => {

        const check = validForm(dataToCheck, outletData)

        console.log(check)

        if (check) {
            const form_data = new FormData()
    
            Object.entries(outletData).map(([key, value]) => {
                form_data.append(key, value)
            })

            // form_data.append('outlet_logo', outletData.outlet_logo?.name ? outletData.outlet_logo : outletData.imageURL)
            // form_data.append('outlet_cover_pic', outletData.outlet_cover_pic?.name ? outletData.outlet_cover_pic : outletData.bannerURL)
            // form_data.append('web_url', outletData.web_url)
            // form_data.append('outlet_name', outletData.outlet_name)
            // form_data.append('outlet_description', outletData.outlet_description)

            form_data.append('SECTION', 'FIRST')
            form_data.append('OUTLET_ID', id)
    
            postReq('editSingleOutlet', form_data)
            .then((data) => {
                console.log(data)
                if (type === "save&pre") {
                    navigate(`/merchant/outlets/xircls-outlet-details/${id}/`)
                } else if (type === "save&pro") {
                    navigate(`/merchant/campaign/target_profiling/${id}/`)
                }
                toast.success('Outlet details saved')
            })
            .catch((error) => {
                console.log(error)
                toast.error('Something went wrong!')
            })
        }

    }

    useEffect(() => {
        getOutletData()
    }, [])

    // console.log(outlet_logo)

    return (
        <Row className='match-height'>
            <Col md="3">
                <Card>
                    <CardBody>
                        <CampaignNav />
                    </CardBody>
                </Card>
            </Col>

            <Col md="9">
                <Card>
                    <CardBody>
                        <div className="outlet_profile">
                            <h4>Outlet Details</h4>
                            <hr />
                            <div className="row match-height mt-2">
                                <div className="col-md-6 mb-3">
                                    <div className="form-group">
                                        <label htmlFor="outlet_name">Outlet name</label>
                                        <input type="text" id='outlet_name' className='form-control' name='outlet_name' onChange={(e) => updateData(e)} value={outletData.outlet_name} />
                                        <p id="outlet_name_val" className="text-danger m-0 p-0 vaildMessage"></p>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="form-group">
                                        <label htmlFor="web_url">Web URL</label>
                                        <input type="text" id='web_url' className='form-control' name='web_url' onChange={(e) => updateData(e)} value={outletData.web_url} disabled />
                                        <p id="web_url_val" className="text-danger m-0 p-0 vaildMessage"></p>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="web_url">Outlet logo</label>
                                    <div className="main-wrapper d-flex justify-content-between align-items-center">
                                    <div className="image-view">
                                        <img className='image_viewer' width="100px" src={outletData.imageURL} alt="Your Logo" />  
                                    </div>
                                        <div className="image-action d-flex justify-content-start align-items-center gap-1">
                                            <input placeholder="Enter Your Outlet Name" type="file" className="w-100 d-none" name="offer_image" id="offer_image" accept="image/jpeg, image/png" onChange={(e) => {
                                                const checkVaildImage = imageValidation(e)
                                                let updatedData
                                                if (checkVaildImage) {
                                                    updatedData = {
                                                        imageURL: URL.createObjectURL(e.target.files[0]),
                                                        outlet_logo: e.target.files[0]
                                                    }
                                                } else {
                                                    updatedData = {
                                                        imageURL:  '',
                                                        outlet_logo: {}
                                                    }
                                                }
                                        
                                                setOutletData((preData) => ({
                                                    ...preData,
                                                    ...updatedData
                                                }))
                                            }} />
                                            <label htmlFor="offer_image" className='btn btn-success'>
                                                <Paperclip size={15} />
                                            </label>
                                            <label className='btn btn-danger' onClick={() => {
                                                const updatedData = {
                                                    imageURL:  '',
                                                    outlet_logo: {}
                                                }
                                                setOutletData((preData) => ({
                                                    ...preData,
                                                    ...updatedData
                                                }))
                                            }}>
                                                <Trash size={15} />
                                            </label>

                                        </div>
                                    </div>
                                    <p id="imageURL_val" className="text-danger m-0 p-0 vaildMessage"></p>

                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="web_url">Outlet Banner</label>
                                    <div className="main-wrapper d-flex justify-content-between align-items-center">
                                        <div className="image-view">
                                            <img className='image_viewer' width="100px" height="100px" src={outletData.bannerURL} alt="banner" />  
                                        </div>
                                        <div className="image-action d-flex justify-content-start align-items-center gap-1">
                                            <input placeholder="Enter Your Outlet Name" type="file" className="w-100 d-none" name="offer_image" id="outlet_cover_pic" accept="image/jpeg, image/png" onChange={(e) => {
                                                const checkVaildImage = imageValidation(e)
                                                let updatedData
                                                if (checkVaildImage) {
                                                    updatedData = {
                                                        bannerURL: URL.createObjectURL(e.target.files[0]),
                                                        outlet_cover_pic: e.target.files[0]
                                                    }
                                                } else {
                                                    updatedData = {
                                                        bannerURL:  '',
                                                        outlet_cover_pic: {}
                                                    }
                                                }
                                        
                                                setOutletData((preData) => ({
                                                    ...preData,
                                                    ...updatedData
                                                }))
                                            }} />
                                            <label htmlFor="outlet_cover_pic" className='btn btn-success'>
                                                <Paperclip size={15} />
                                            </label>
                                            <label className='btn btn-danger' onClick={() => {
                                                const updatedData = {
                                                    bannerURL:  '',
                                                    outlet_cover_pic: {}
                                                }
                                                setOutletData((preData) => ({
                                                    ...preData,
                                                    ...updatedData
                                                }))
                                            }}>
                                                <Trash size={15} />
                                            </label>

                                        </div>
                                    </div>
                                    <p id="bannerURL_val" className="text-danger m-0 p-0 vaildMessage"></p>

                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="form-group">
                                        <label htmlFor="outlet_description">Outlet Description</label>
                                        <textarea id='outlet_description' className='form-control' name='outlet_description' value={outletData.outlet_description} onChange={(e) => updateData(e)} />
                                        <p id="outlet_description_val" className="text-danger m-0 p-0 vaildMessage"></p>
                                    
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className='d-flex justify-content-end gap-1'>
                                        {/* <Link className="btn btn-outline-primary me-2" to={`/merchant/outlets/xircls-outlet-details/${id}/`}>Show Preview</Link> */}
                                        <a className="btn btn-primary" onClick={() => editOutletData('save')}>Save</a>
                                        <a className="btn btn-primary" onClick={() => editOutletData('save&pre')}>Save and Preview</a>
                                        <a className="btn btn-primary" onClick={() => editOutletData('save&pro')}>Save and Proceed</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}

export default OutletProfiling