import React, { useState, useEffect, useContext } from "react"
import { ArrowRight, Facebook, Globe, Instagram, Linkedin, Tag, Twitter, X } from 'react-feather'
import { Card, CardBody, Col, Container, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import './css/OnlineOutlet.css'
import { getReq, postReq } from "../../assets/auth/jwtService"
import man from './images/man.png'
import woman from './images/woman.png'
import kid from './images/kid.png'
import { useParams } from "react-router-dom"
import { ownUrl, xircls_url } from "../Validator"
import { PermissionProvider } from "../../Helper/Context"
import toast from "react-hot-toast"

const SingleOutletDetails = () => {

    // Modal parameters
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)
    const handleClose = () => setModal(false)
    const { userPermission } = useContext(PermissionProvider)
    const [data, setData] = useState(null)
    const { id } = useParams()
    console.log(location)
    const getData = () => {

        getReq('outletsDetails', `?OUTLET_ID=${id}&OUTLET_TYPE=SINGLE`)
        .then((resp) => {
            console.log(resp)
            // setAboutUs(String(resp.data.data.outlet_detail?.outlet_description).split('.'))
            setData(resp.data.data.outlet_detail[0])
        })
        .catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getData()
        
    }, [])

    const newtworkAlerts = (type, message) => {
        const form_data = new FormData()
        form_data.append('req_outlet_id', id)
        form_data.append('action', type)
        postReq('innerXirclsRequest', form_data)
        .then((resp) => {
            console.log(resp)
            getData()
            toast.success(message)
        })
        .catch((error) => {
            console.log(error)
            toast.error('Something went wrong')
        })
    }

    // const blockOutlet = () => {
    //     console.log("")
    //     const form_data = new FormData()
    //     form_data.append('other_outlet', id)
    //     postReq('blockInnerXircls', form_data)
    //     .then((resp) => {
    //         console.log(resp)
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //     })
    // }

    console.log(data)

    return (

        <div className="outlet_edit">
            <Row>
                <Col xl='12'>
                    <Card style={{
                        backgroundImage: `url('${ownUrl}${data?.outlet_cover_pic}')`,
                        position: 'relative',
                        height: '75vh',
                        width: '100%',
                        backgroundSize: 'contain',
                        overflow: 'hidden',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center center'
                    }}>
                        <CardBody>
                            <h1 style={{textTransform: 'capitalize', color: 'white', textShadow: '0px 0px 3px black'}}>{data?.outlet_name}</h1>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <Container fluid className='px-0'>
                <Row className="match-height">
                    <Col xl='4'>
                        <Card className="h-100">
                            <CardBody>
                                <div className="d-flex justify-content-center align-items-center" >
                                    <img src={`${xircls_url}${data?.outlet_logo}`} alt="Outlet Logo" style={{ width: '230px' }} />
                                </div>
                                {
                                    userPermission?.apiKey === data?.api_key && data?.api_key ? "" : <>
                                        <div className="action d-flex justify-content-center align-items-center gap-2 my-2">
                                            <a className="btn btn-primary" onClick={() => newtworkAlerts("ADD_PARTNER", "Outlet added")}>Add</a>
                                            <a className="btn btn-primary" onClick={() => newtworkAlerts("BLOCK_PARTNER", "Outlet blocked")}>Block</a>
                                        </div>
                                    </>
                                }
                                
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xl='4'>
                        <Card className="h-100 position-relative">
                            <CardBody>
                                <div>
                                    <h5>About us</h5>
                                    <p>{data?.outlet_description} <a style={{ color: '#5e50ee' }} onClick={toggle}> <span style={{whiteSpace: 'nowrap'}}>Read more</span></a></p>
                                </div>
                                <div className='mt-2'>
                                    <h5>Location:</h5>
                                    <input className='form-control' value={data?.company?.state && data?.company?.country ? `${data?.company?.state}, ${data?.company?.country}` : ''}  />
                                </div>
                                <div className='mt-2'>
                                    <h5>Email:</h5>
                                    {
                                        userPermission?.apiKey === data?.api_key ? <p>{data?.company?.outlet_email}</p> : <p style={{color: 'transparent', textShadow: '0px 0px 5px #000', userSelect: 'none'}}>XXXX</p>
                                    }
                                    
                                </div>
                                <div>
                                    <h5>Phone:</h5>
                                    {
                                        userPermission?.apiKey === data?.api_key ? <p>{data?.company?.mobile}</p> : <p style={{color: 'transparent', textShadow: '0px 0px 5px #000', userSelect: 'none'}}>XXXX</p>
                                    }
                                    
                                    
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xl='4'>
                        <Row className="px-1 pb-1">
                            <Card className="mb-1 ">
                                <CardBody>
                                    <h5> Social Links</h5>
                                    <div className="mt-5">
                                        <Row>
                                            <Col xl='6' className="mx-auto mb-2">
                                                <div>
                                                    <a href="" style={{ textDecoration: 'none', display: 'flex', justifyContent: 'start', alignItems: 'center', gap:'10px'}}>
                                                        <Twitter size={16} color="#464646"/> @twitter
                                                    </a>
                                                </div>
                                            </Col>
                                            <Col xl='6' className="mx-auto mb-2">
                                                <div><a href="" style={{ textDecoration: 'none', display: 'flex', justifyContent: 'start', alignItems: 'center', gap:'10px'}}><Facebook size={16} color="#464646"/> @facebook</a></div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xl='6' className="mx-auto mb-2">
                                                <div><a href="" style={{ textDecoration: 'none', display: 'flex', justifyContent: 'start', alignItems: 'center', gap:'10px'}}><Instagram size={16} color="#464646"  /> @instagram</a></div>
                                            </Col>
                                            <Col xl='6' className="mx-auto mb-2">
                                                <div><a href="" style={{ textDecoration: 'none', display: 'flex', justifyContent: 'start', alignItems: 'center', gap:'10px'}}><Linkedin size={16} color="#464646"/> @linkedin</a></div>
                                            </Col>
                                        </Row>
                                    </div>
                                </CardBody>
                            </Card>
                            <a href="" className="mx-auto card-button my-1">
                                <div className="d-flex justify-content-center">
                                    <a style={{fontSize: '1.07rem', color: '#fff'}} href={`https://www.${data?.web_url}`} target="_blank" className="my-2">
                                        Go to the Website 
                                        <ArrowRight id='arrowMove' />
                                    </a>
                                </div>
                            </a>
                        </Row>
                    </Col>
                </Row>
            </Container>

            <Row>
                <Col xl='6'>
                    <Card>
                        <CardBody className="position-relative">
                            <h5>Category </h5>
                            {
                                data?.outlet_categories_main ? <input className='form-control' value={data?.outlet_categories_main.map((curElem, i) => {
                                    return data.outlet_categories_main.length === i + 1 ? `${curElem.name}` : `${curElem.name}, `
                                })} /> : ''
                            }
                            

                        </CardBody>
                    </Card>
                </Col>
                <Col xl='6'>
                    <Card>
                        <CardBody className="position-relative">
                            <h5>Sub-category</h5>
                            {
                                data?.outlet_categories_filter ?  <input className='form-control' value={data?.outlet_categories_filter.map((curElem, i) => {
                                    return data.outlet_categories_filter.length === i + 1 ? `${curElem.name}` : `${curElem.name}, `
                                })} /> : ''
                            }
                           
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row className="match-height">
                <Col xl='6'>
                    <Card>
                        <CardBody className="position-relative">
                            <h5 className="mb-0">Customer Profile</h5>
                            <Row className="match-height">
                                <Col sm='12'>
                                    <div className="parent d-flex justify-content-start align-items-center gap-1 my-1">
                                        <img className="opacity-50" width='18px' src={man} />
                                        <h6 className="m-0">
                                            Male
                                        </h6>
                                    </div>

                                    <div className="selectMan d-flex justify-content-start align-items-center gap-1">
                                        {
                                            data?.we_cater_to?.men ? data?.we_cater_to?.men.map((curElem, i) => {
                                                return <div key={i}>
                                                    <p>{curElem}</p>
                                                </div>
                                            }) : ''
                                        }
                                    </div>
                                    
                                    
                                </Col>
                                <Col sm='12'>
                                    <div className="parent d-flex justify-content-start align-items-center gap-1 my-1">
                                        <img className="opacity-50" width='18px' src={woman} />
                                        <h6 className="m-0">
                                            Women
                                        </h6>
                                    </div>
                                    <div className="selectwomen d-flex justify-content-start align-items-center gap-1">
                                        {
                                            data?.we_cater_to?.women ? data?.we_cater_to?.women.map((curElem, i) => {
                                                return <div key={i}>
                                                    <p>{curElem}</p>
                                                </div>
                                            }) : ''
                                        }
                                    </div>
                                </Col>
                                <Col sm='12'>
                                    <div className="parent d-flex justify-content-start align-items-center gap-1 my-1">
                                        <img className="opacity-50" width='18px' src={kid} />
                                        <h6 className="m-0">
                                            Kid
                                        </h6>
                                    </div>
                                    <div className="selectkid d-flex justify-content-start align-items-center gap-1">
                                        {
                                            data?.we_cater_to?.kid ? data?.we_cater_to?.kid.map((curElem, i) => {
                                                return <div key={i}>
                                                    <p>{curElem}</p>
                                                </div>
                                            }) : ''
                                        }
                                    </div>
                                </Col>

                            </Row>
                        </CardBody>
                    </Card>
                </Col>
                <Col xl='6'>
                    <Card>
                        <CardBody className="position-relative">
                            <h5>Delivery Locations</h5>
                            <input className="form-control" value={
                                data?.operations_india ? <>
                                    Pan India
                                </> : data?.operations_international ? <>
                                    Global
                                </> : 'Pan India'
                            } />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row className="match-height">
                <Col>
                    <Card>
                        <CardBody className="position-relative">
                            <h5> Company Info </h5>
                            <p className='form-control'>Company: {data?.company?.company_name}</p>
                            <p className='form-control'>Type: Limited Liability Partnership</p>
                            <p className='form-control'>Website: <span><a href={`https://${data?.web_url}`} style={{ textDecoration: 'none', color: '#5e50ee' }} target="_blank">{`https://${data?.web_url}`} </a></span></p>

                        </CardBody>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <CardBody className="position-relative">
                            <h5>Address</h5>
                            <input className='form-control' value={`${data?.company?.street_address1} ${data?.company?.street_address2}, ${data?.company?.area}, ${data?.company?.landmark}, ${data?.company?.city}, ${data?.company?.state}, ${data?.company?.country}`} />
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <Modal isOpen={modal}
                toggle={toggle}
                modalTransition={{ timeout: 100 }}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                keyboard={false}
                show={modal}

            >
                <ModalHeader>
                    About us
                    <span style={{ float: 'right', position: 'relative', cursor: 'pointer', top: '-5px', right: '-375px' }} onClick={handleClose}><X /></span>
                </ModalHeader>
                <ModalBody>
                    <p>
                        {data?.outlet_description}                            
                    </p>
                </ModalBody>

            </Modal>


        </div>
    )
}

export default SingleOutletDetails
