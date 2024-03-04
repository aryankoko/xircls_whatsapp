import { useState } from "react"
import { ArrowRight, Monitor, ShoppingCart } from "react-feather"
import { Container, Row, Col } from 'reactstrap'
import './css/merchoutlet.css'
import xirclsimage from '../images/XIRCLS.jpeg'
import axios from "axios"
import Cookies from 'universal-cookie'
import { useNavigate } from "react-router-dom"

const SelectOutlet = () => {
    const cookies = new Cookies()
    const [outlet, setOutlet] = useState(true)
    const Navigate = useNavigate()
    const submitOutlet = () => {
        console.log(cookies.get('token'), "data:", outlet ? 1 : 2)
        const data = {
            token_id: cookies.get('token'),
            selected_outlet_type: outlet ? 1 : 2
        }
        axios.post('http://192.168.1.132:8000/outlet/', data)
        .then(function (resp) {
            console.log(resp.data.selected_plan)
            if (resp.data.selected_plan === 0) {
                Navigate('/merchant/subscription/select_strategy/')
            } else {
                Navigate(`/merchant/subscription/plan_purchase/${resp.data.selected_plan}`)
            }
        })
        .catch(function (error) {
            console.log(error)
        })
    }


    return (
        <>
            <Container fluid className="merchant m-0 p-0 rounded-0" style={{ height: '100vh' }}>
                <Row className="h-100 w-100 m-0 p-0">
                    <Col md={3} className="h-100 p-3" style={{ backgroundColor: '#cb2100' }}>
                        <Row className='d-flex align-items-center' style={{ marginBottom: '8rem' }}>
                            <img src={xirclsimage} className='rounded-circle' style={{ width: '75px' }} />
                            <h5 className='mb-0 p-0 text-white fw-bold fs-3' style={{ width: '50%' }}>XIRCLS</h5>
                        </Row>
                        <Row>
                            <h4 className="mb-3 text-white mb-4" style={{ fontSize: '2rem', fontWeight: '600', letterSpacing: '1px' }}>A few clicks away from creating your company.</h4>
                        </Row>
                        <Row>
                            <p className='text-white mt-4 fs-5' style={{ fontWeight: '400' }}>Start your sales in minutes,<br />Save time and money.</p>
                        </Row>
                    </Col>
                    <Col md={9} className="h-100 px-5">
                        <Row className="py-2">
                            <p className="text-end fs-5">Having trouble? <a href="" className="fw-bold text-dark" style={{ textDecoration: 'none' }}> Get Help</a></p>
                        </Row>
                        <div className="px-3" style={{ width: '60%' }}>
                            <Row className="mb-3">
                                <h4 className="mb-1 text-black fs-1 fw-bold" >Choose the type of your company</h4>
                                <p className='fs-6'>Creating your sales in US is just a few steps away</p>
                            </Row>
                            <Row className="px-1">
                                <div onClick={() => setOutlet(true)} className={`p-2 d-flex align-items-center justify-content-between cursor-pointer border ${outlet && 'border-secondary bg-light-secondary'}`} style={{ borderRadius: '1.25rem' }}>
                                    <div className="d-flex align-items-center gap-2">
                                        <div className={`border border-1 border-secondary rounded-3 overflow-hidden bgdiv d-flex justify-content-center align-items-center ${outlet ? 'text-white' : 'text-secondary'}`} style={{ width: '3rem', height: '3rem', backgroundColor: outlet && 'gray' }}>
                                            <Monitor />
                                        </div>
                                        <div className='d-flex align-items-start flex-column' style={{ width: '75%' }}>
                                            <h6 style={{ fontWeight: '400' }} className="mb-0 fs-3">Online</h6>
                                            <p style={{ fontWeight: '300' }} className="mb-0">You sell products/services via your website, mobile app or both</p>
                                        </div>
                                    </div>
                                    <span className={` ${!outlet && 'd-none'}`}>
                                        <ArrowRight />
                                    </span>
                                </div>
                                <div onClick={() => setOutlet(false)} className={`p-2 mt-1 d-flex align-items-center justify-content-between cursor-pointer border ${!outlet && 'border-secondary bg-light-secondary'}`} style={{ borderRadius: '1.25rem' }}>
                                    <div className="d-flex align-items-center gap-2">
                                        <div className={`border border-1 border-secondary rounded-3 overflow-hidden bgdiv d-flex justify-content-center align-items-center ${!outlet ? 'text-white' : 'text-secondary'}`} style={{ width: '3rem', height: '3rem', backgroundColor: !outlet && 'gray' }}>
                                            <ShoppingCart />
                                        </div>
                                        <div className='d-flex align-items-start flex-column' style={{ width: '75%' }}>
                                            <h6 style={{ fontWeight: '400' }} className="mb-0 fs-3">Offline</h6>
                                            <p style={{ fontWeight: '300' }} className="mb-0">You sell products/services at a physical establishment e.g. store, restaurant</p>
                                        </div>
                                    </div>
                                    <span className={` ${outlet && 'd-none'}`}>
                                        <ArrowRight />
                                    </span>
                                </div>
                            </Row>
                            <Row>
                                <div className="text-end mt-5 pt-3">
                                    <button className="btn btn-outline-danger" onClick={() => submitOutlet()}>
                                        Proceed <ArrowRight size={15} />
                                    </button>
                                </div>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default SelectOutlet