import React, { useContext } from 'react'
import './css/SelectPlan.css'
import { Container, Col, Row, Card, CardBody, Modal } from 'reactstrap'
import Swipe from "./components/Swipe"
import { Check, X } from 'react-feather'
import $ from 'jquery'
import { phonecode_list } from '../../default_components/MainData'
import { PermissionProvider } from '../../Helper/Context'

const Pricing = () => {
    const { userPermission } = useContext(PermissionProvider)
    const [modal, setModal] = React.useState(false)
    const toggle = () => setModal(!modal)
    const handleClose = () => setModal(false)

    const dataValues = [
        {
            name: "XIRCLS NETWORK",
            comp1: "FREE",
            comp2: "LITE",
            offers: [["View other Outlets", true, true], ["View Outlet Offers", true, true], ["Add & Manage Preferred Partners", true, true], ["Invite Businesses you know", true, true]]
        },
        {
            name: "CUSTOMERS",
            comp1: "FREE",
            comp2: "LITE",
            offers: [["Add Customers", true, true], ["Import Customers", true, true]]
        },
        {
            name: "OFFER CREATION",
            comp1: "FREE",
            comp2: "LITE",
            offers: [["Default Offer Set", true, true]]
        },
        {
            name: "SPECIAL OFFER CREATION",
            comp1: "FREE",
            comp2: "LITE",
            offers: [["Percentage Discount Offer", true, true], ["Flat Discount Offer", true, true], ["Free Products/ Services/ Vouchers", true, true], ["Email Customization", false, false]]
        },
        {
            name: "INTEGRATION",
            comp1: "FREE",
            comp2: "LITE",
            offers: [["Plugin Integration", true, true], ["Rest API Integration", true, true], ["Spend-Offer-March", true, true], ["Customizable Button & Pop-up", true, true], ["Redeemable Offer Display", true, true], ["One-Click Redemption", true, true], ["Multiple Email Templates", true, true]]
        },
        {
            name: "USER ACCESS",
            comp1: "FREE",
            comp2: "LITE",
            offers: [["Multiple Users", true, true], ["User Levels", false, true]]
        },
        {
            name: "DATA SECURITY",
            comp1: "FREE",
            comp2: "LITE",
            offers: [["100% Data Encryption", true, true]]
        },
        {
            name: "REPORTS & ANALYTICS",
            comp1: "FREE",
            comp2: "LITE",
            offers: [["Live Performance Reports", true, true]]
        },
        {
            name: "SUPPORT",
            comp1: "FREE",
            comp2: "LITE",
            offers: [["Email Support", true, true], ["Phone Support", true, true], ["Personal Alliances Manager", false, false]]
        },
        {
            name: "AUTOMATIC FEATURE UPGRADE",
            comp1: "FREE",
            comp2: "LITE",
            offers: [["Automatic Feature Upgrade", true, true]]
        }
    ]


    const tableData = dataValues.map(function (dataValue, index) {

        const offerValue = dataValue.offers.map(function (offer, i) {
            return <p key={i} className="pt-1">{offer[0]}</p>
        })
        const offerValidity1 = dataValue.offers.map(function (offer, i) {
            return <p key={i} className="pt-1">{offer[1] ? <Check color='green' /> : <X color='red' />}</p>
        })
        const offerValidity2 = dataValue.offers.map(function (offer, i) {
            return <p key={i} className="pt-1">{offer[2] ? <Check color='green' /> : <X color='red' />}</p>
        })
        return (
            <Col md={12} key={index}>
                <Card className="border-1">
                    <CardBody>
                        <Row>
                            <Col md={4}>
                                <h4 className="py-1 mb-0">{dataValue.name}</h4>
                                {offerValue}
                            </Col>
                            <Col md={4} className='text-center'>
                                <h4 className="py-1 mb-0">{dataValue.comp1}</h4>
                                {offerValidity1}
                            </Col>
                            <Col md={4} className='text-center'>
                                <h4 className="py-1 mb-0">{dataValue.comp2}</h4>
                                {offerValidity2}
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        )
    })

    function navChange(id) {
        $('.classrm').removeClass('activeNav')
        $(`#${id}`).addClass('activeNav')
    }

    return (
        <>

            <div className="w-100 pricing">
                <Card>
                    <CardBody>
                        <div className="px-2 d-flex justify-content-between align-items-center" style={{ zIndex: '2' }}>
                            <div>
                                <h3 className="mb-0" style={{ fontSize: '1.5rem', fontWeight: '800' }}>Infiniti Plans</h3>
                                <p className="fs-5 text-secondary">Home-Pricing</p>
                            </div>
                            <div>
                                <select className='form-control'>
                                    {
                                        phonecode_list.map((curElem, i) => {
                                            return <option key={i} value={curElem.name}>{curElem.name}</option>
                                        })
                                    }
                                </select>
                                
                            </div>
                        </div>
                    </CardBody>
                </Card>
                <Swipe />

                <Row className="px-1 position-relative" style={{ backgroundColor: 'rgba(0,0,0,0)', boxShadow: '0px 0px 0px rgba(0,0,0,0)' }}>
                    <Col xs={4}></Col>
                    <Col xs={4} className='text-center'><button onClick={toggle} className="btn btn-secondary text-white mx-auto px-3 py-1 w-75">Compare</button></Col>
                    <Col xs={4} className='text-end'><button className="btn text-white px-3 py-1 text-right" style={{ backgroundColor: '#19d895' }}>Proceed</button></Col>
                </Row>
                <Modal isOpen={modal}
                    toggle={toggle}
                    modalTransition={{ timeout: 500 }}
                    size="xl"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    // backdrop="static"
                    keyboard={false}
                    style={{ width: '70%' }}
                    className='mx-auto'
                >
                    <Container fluid className="pricing px-0">
                        <Card className="mx-auto mb-0"  >
                            <CardBody>
                                <span style={{ float: 'right', cursor: 'pointer' }} onClick={handleClose}>
                                    <X />
                                </span>
                                <Row className="mb-2">
                                    <Col xs={12}>
                                        <span id='navBasic' onClick={() => navChange('navBasic')} className="classrm waves waves-effect waves-dark activeNav mx-1 px-2 cursor-pointer fs-5">Basic</span>
                                        <span id='navGrow' onClick={() => navChange('navGrow')} className="classrm waves waves-effect waves-dark mx-1 px-2 cursor-pointer fs-5">Grow</span>
                                        <span id='navPro' onClick={() => navChange('navPro')} className="classrm waves waves-effect waves-dark mx-1 px-2 cursor-pointer fs-5">Pro</span>
                                        <span id='navPrem' onClick={() => navChange('navPrem')} className="classrm waves waves-effect waves-dark mx-1 px-2 cursor-pointer fs-5">Premium</span>
                                        <span id='navEnter' onClick={() => navChange('navEnter')} className="classrm waves waves-effect waves-dark mx-1 px-2 cursor-pointer fs-5">Enterprise</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <Card className="border-1">
                                            <CardBody>
                                                <h4 className="py-1 mb-0">Infiniti Pricing Plans</h4>
                                                <p className="pt-1">Plan Cost</p>
                                                <p className="pb-1">(taxes applicable)</p>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col md={4}>
                                        <Card className="border-1">
                                            <CardBody className="text-center">
                                                <h4 className="py-1 mb-0">Infiniti Free Plan</h4>
                                                <p className="pt-1">{userPermission?.currencySymbol} 0.00</p>
                                                <p className="py-1 text-white bg-dark w-50 rounded-3 mx-auto mb-0 cursor-pointer">Buy Now</p>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col md={4}>
                                        <Card className="border-1">
                                            <CardBody className="text-center">
                                                <h4 className="py-1 mb-0">Infiniti Lite</h4>
                                                <p className="pt-1">{userPermission?.currencySymbol} 999.00</p>
                                                <p className="py-1 text-white bg-dark w-50 rounded-3 mx-auto mb-0 cursor-pointer" >Buy Now</p>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                                <Row>

                                    {tableData}
                                </Row>
                            </CardBody>
                        </Card>
                    </Container>
                </Modal>
            </div>
        </>
    )
}

export default Pricing