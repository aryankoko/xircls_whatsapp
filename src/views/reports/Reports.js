import React, { useContext, useEffect, useState } from 'react'
import { Col, Row, Card, CardBody, Dropdown, DropdownToggle, DropdownMenu, Container } from 'reactstrap'
import { BsCashStack, BsFillCreditCard2BackFill } from "react-icons/bs"
import { TiTick } from "react-icons/ti"
import { getReq, postReq } from '../../assets/auth/jwtService'
import Spinner from '../Components/DataTable/Spinner'
import { Link } from 'react-router-dom'
import { PermissionProvider } from '../../Helper/Context'

const Reports = () => {
    const { userPermission } = useContext(PermissionProvider)
    const [totalCount, setTotalCount] = useState({})
    const [partnerCount, setPartnerCount] = useState({})
    const [ownCount, setOwnCount] = useState({})
    const [isTotalCount, setIsTotalCount] = useState(true)
    const [isownCount, setIsOwnCount] = useState(true)
    const [ispartnerCount, setIsPartnerCount] = useState(true)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [filterData, setFilterData] = useState([])
    const [selectedFilterList, setSelectedFilterList] = useState([])

    console.log({
        totalCount,
        ownCount,
        partnerCount
    })

    const getTotalCount = () => {
        setIsTotalCount(true)
        const form_data = new FormData()
        selectedFilterList.forEach((cur) => {
            form_data.append('offer_list', cur)
        })
        postReq('getTotalCount', form_data)
        .then((resp) => {
            console.log(resp)
            setTotalCount(resp?.data?.data)
            setIsTotalCount(false)
        })
        .catch((error) => {
            console.log(error)
            setIsTotalCount(false)
        })
    }

    const getPartnerCount = () => {
        setIsPartnerCount(true)
        const form_data = new FormData()
        selectedFilterList.forEach((cur) => {
            form_data.append('offer_list', cur)
        })
        postReq('getPartnerCount', form_data)
        .then((resp) => {
            console.log(resp)
            setPartnerCount(resp?.data?.data)
            setIsPartnerCount(false)
        })
        .catch((error) => {
            console.log(error)
            setIsPartnerCount(false)
        })
    }

    const getOwnCount = () => {
        setIsOwnCount(true)
        const form_data = new FormData()
        selectedFilterList.forEach((cur) => {
            form_data.append('offer_list', cur)
        })
        postReq('getOwnCount', form_data)
        .then((resp) => {
            console.log(resp)
            setOwnCount(resp?.data?.data)
            setIsOwnCount(false)
        })
        .catch((error) => {
            console.log(error)
            setIsOwnCount(false)
        })
    }

    const getFilterOptions = () => {
        getReq('getFilterOffer')
        .then((resp) => {
            console.log(resp, "resp")
            setFilterData(resp?.data?.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getTotalCount()
        getPartnerCount()
        getOwnCount()
        getFilterOptions()
    }, [])

    const applyOffer = () => {
        if (selectedFilterList.length > 0) {
            getTotalCount()
            getPartnerCount()
            getOwnCount()
            setDropdownOpen(false)
        }
    }

    const selectedCodeId = (e) => {
        if (selectedFilterList.includes(Number(e.target.value))) {
            setSelectedFilterList(selectedFilterList?.filter((curElem) => {
                return curElem !== Number(e.target.value)
            }))
        } else {
            setSelectedFilterList([...selectedFilterList, Number(e.target.value)])
        }
    }

    console.log(selectedFilterList)

    return (
        <>
            <style>
                {`
                    .logo {
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                    }
                    
                    .logoIssued {
                        background-color: rgba(232, 230, 252, 255);
                        color: rgba(116, 105, 239, 255);
                    }
                    
                    .logoReferrals {
                        background-color: rgba(220, 246, 232, 255);
                        color: rgba(44, 200, 113, 255);
                    }
                    
                    .logoRedeemed {
                        background-color: rgba(255, 239, 225, 255);
                        color: rgba(255, 182, 114, 255);
                    }
                `}
            </style>
            <Row className='match-height'>
                <Card>
                    <CardBody>
                        <div className="d-flex justify-content-between align-items-center">
                            <h4>Total</h4>
                            <Dropdown isOpen={dropdownOpen} toggle={() => setDropdownOpen((prevState) => !prevState)}>
                                <DropdownToggle className="btn btn-outline-primary position-relative">
                                    Filter
                                    {selectedFilterList.length > 0 ? (
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                            {selectedFilterList.length}
                                            <span className="visually-hidden">unread messages</span>
                                        </span>

                                    ) : ''}
                                </DropdownToggle>
                                <DropdownMenu style={{ maxWidth: '1080px', width: '70vw' }}>
                                    <Container className="p-2">
                                        <Row style={{ maxHeight: '45vh', overflowY: 'scroll' }}>
                                            {
                                                filterData?.map((curElem, i) => {
                                                    return <Col key={i} lg={4} sm={6}>
                                                        <div className={`rounded-3 px-1`}>
                                                            <div className="form-check">
                                                                <label style={{ padding: '0.75rem 0.25rem' }} htmlFor={`parent-${i}`} className="form-check-label text-dark w-100 d-flex justify-content-start align-items-center">
                                                                    <span>
                                                                        <input checked={selectedFilterList.includes(Number(curElem.id))} value={curElem.id} onChange={(e) => selectedCodeId(e)} id={`parent-${i}`} type="checkbox" className="form-check-input" />
                                                                    </span>
                                                                    {curElem?.offer_name}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                })
                                            }
                                        </Row>
                                        <Row>
                                            <div className="d-flex justify-content-end align-items-center">
                                                <a className='btn btn-primary' onClick={() => applyOffer()}>Apply</a>
                                            </div>
                                        </Row>
                                    </Container>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        
                    </CardBody>
                </Card>

                <Col xl='4' md='6' sm='12'>
                    <Card>
                        <CardBody className=' d-flex justify-content-between'>
                            <div>
                                <h5>Offers Issued</h5>
                                <h3 className=' fw-bolder'>
                                    {isTotalCount ? <><Spinner size={'25px'} /></> : <Link to="/merchant/reports/total_reach/">{totalCount?.totaloffersissued}</Link>}
                                </h3>
                            </div>
                                    
                            <div className=' logo logoRedeemed d-flex justify-content-center align-items-center fs-4 border rounded-5 '>
                                <BsFillCreditCard2BackFill />
                            </div>
                        </CardBody>
                    </Card>
                </Col>

                <Col xl='4' md='6' sm='12'>
                    <Card>
                        <CardBody className=' d-flex justify-content-between' style={{ height: `100px` }}>
                            <div>
                                <h5>Offers Viewed</h5>
                                <h3 className=' fw-bolder'>{isTotalCount ? <><Spinner size={'25px'} /></> : <Link to="/merchant/reports/incentive_viewed_total/">{totalCount?.totaloffersviewed}</Link>}</h3>
                            </div>
                            <div className='logo logoIssued d-flex justify-content-center align-items-center fs-4 border rounded-5 '>
                                <TiTick />
                            </div>
                        </CardBody>
                    </Card>
                </Col>

                <Col xl='4' md='6' sm='12'>
                    <Card>
                        <CardBody className=' d-flex justify-content-between' style={{ height: `100px` }}>
                            <div>
                                <h5>Offers Clicked</h5>
                                <h3 className=' fw-bolder '>{isTotalCount ? <><Spinner size={'25px'} /></> : <Link to="/merchant/reports/total_clicks/">{totalCount?.totaloffersclicked}</Link>}</h3>
                            </div>
                            {/* <div>
                                        <h5>Earnings</h5>
                                        <h3>0.00</h3>
                                    </div> */}
                            <div className='logo logoReferrals d-flex justify-content-center align-items-center fs-4 border rounded-5 '>
                                <BsCashStack />
                            </div>
                        </CardBody>
                    </Card>
                </Col>

                <Col xl='4' md='6' sm='12'>
                    <Card>
                        <CardBody className=' d-flex justify-content-between'>
                            <div>
                                <h5>Offers Redeemed</h5>
                                <h3 className=' fw-bolder'>{isTotalCount ? <><Spinner size={'25px'} /></> : <Link to="/merchant/reports/total_redemptions/">{totalCount?.totaloffersredeemed}</Link>}</h3>
                            </div>
                            {/* <div>
                                        <h5>CTR</h5>
                                        <h3>2.15%</h3>
                                    </div> */}
                            <div className=' logo logoRedeemed d-flex justify-content-center align-items-center fs-4 border rounded-5 '>
                                <BsFillCreditCard2BackFill />
                            </div>
                            {/* <RevenueReport primary={context.colors.primary.main} warning={context.colors.warning.main} /> */}
                        </CardBody>
                    </Card>
                </Col>

                <Col xl='4' md='6' sm='12'>
                    <Card>
                        <CardBody className=' d-flex justify-content-between' style={{ height: `100px` }}>
                            <div>
                                <h5>Revenue Earned</h5>
                                <h3 className=' fw-bolder'>{isTotalCount ? <><Spinner size={'25px'} /></> : <Link to="/merchant/reports/total_revenue/">{userPermission?.currencySymbol}{totalCount?.totalrevenueearned}</Link>}</h3>
                            </div>
                            <div className='logo logoIssued d-flex justify-content-center align-items-center fs-4 border rounded-5 '>
                                <TiTick />
                            </div>
                        </CardBody>
                    </Card>
                </Col>

                <Col xl='4' md='6' sm='12'>
                    <Card>
                        <CardBody className=' d-flex justify-content-between' style={{ height: `100px` }}>
                            <div>
                                <h5>Customers Gained</h5>
                                <h3 className=' fw-bolder '>0</h3>
                            </div>
                            <div className='logo logoReferrals d-flex justify-content-center align-items-center fs-4 border rounded-5 '>
                                <BsCashStack />
                            </div>
                        </CardBody>
                    </Card>
                </Col>

            <span className='h4 text-left mb-1'>Partner’s customers</span>
            <Col xl='4' md='6' sm='12'>
                    <Card>
                        <CardBody className=' d-flex justify-content-between'>
                            <div>
                                <h5>Offers Issued</h5>
                                <h3 className=' fw-bolder'>{ispartnerCount ? <><Spinner size={'25px'} /></> : <Link to="/merchant/reports/offers_issued_to_partner/">{partnerCount?.partneroffersissued}</Link>}</h3>
                            </div>
                            <div className=' logo logoRedeemed d-flex justify-content-center align-items-center fs-4 border rounded-5 '>
                                <BsFillCreditCard2BackFill />
                            </div>
                        </CardBody>
                    </Card>
                </Col>

                <Col xl='4' md='6' sm='12'>
                    <Card>
                        <CardBody className=' d-flex justify-content-between' style={{ height: `100px` }}>
                            <div>
                                <h5>Offers Viewed</h5>
                                <h3 className=' fw-bolder'>{ispartnerCount ? <><Spinner size={'25px'} /></> : <Link to="/merchant/reports/incentive_viewed_partners/">{partnerCount?.partneroffersviewed}</Link>}</h3>
                            </div>
                            <div className='logo logoIssued d-flex justify-content-center align-items-center fs-4 border rounded-5 '>
                                <TiTick />
                            </div>
                        </CardBody>
                    </Card>
                </Col>

                <Col xl='4' md='6' sm='12'>
                    <Card>
                        <CardBody className=' d-flex justify-content-between' style={{ height: `100px` }}>
                            <div>
                                <h5>Offers Clicked</h5>
                                <h3 className=' fw-bolder '>{ispartnerCount ? <><Spinner size={'25px'} /></> : <Link to="/merchant/reports/partner_clicks/">{partnerCount?.partneroffersclicked}</Link>}</h3>
                            </div>
                            <div className='logo logoReferrals d-flex justify-content-center align-items-center fs-4 border rounded-5 '>
                                <BsCashStack />
                            </div>
                        </CardBody>
                    </Card>
                </Col>

                <Col xl='4' md='6' sm='12'>
                    <Card>
                        <CardBody className=' d-flex justify-content-between'>
                            <div>
                                <h5>Offers Redeemed</h5>
                                <h3 className=' fw-bolder'>{ispartnerCount ? <><Spinner size={'25px'} /></> : <Link to="/merchant/reports/partner_redemptions/">{partnerCount?.partneroffersredeemed}</Link>}</h3>
                            </div>
                            <div className=' logo logoRedeemed d-flex justify-content-center align-items-center fs-4 border rounded-5 '>
                                <BsFillCreditCard2BackFill />
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xl='4' md='6' sm='12'>
                    <Card>
                        <CardBody className=' d-flex justify-content-between' style={{ height: `100px` }}>
                            <div>
                                <h5>Revenue Earned</h5>
                                <h3 className=' fw-bolder'>{ispartnerCount ? <><Spinner size={'25px'} /></> : <Link to="">{userPermission?.currencySymbol}{partnerCount?.partnerrevenueearned}</Link>}</h3>
                            </div>
                            <div className='logo logoIssued d-flex justify-content-center align-items-center fs-4 border rounded-5 '>
                                <TiTick />
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xl='4' md='6' sm='12'>
                    <Card>
                        <CardBody className=' d-flex justify-content-between' style={{ height: `100px` }}>
                            <div>
                                <h5>Customers Gained</h5>
                                <h3 className=' fw-bolder '>0</h3>
                            </div>
                            <div className='logo logoReferrals d-flex justify-content-center align-items-center fs-4 border rounded-5 '>
                                <BsCashStack />
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                    <span className='h4 text-left mb-1'>Own customers</span>
                    <Col xl='4' md='6' sm='12'>
                    <Card>
                        <CardBody className=' d-flex justify-content-between'>
                            <div>
                                <h5>Offers Issued</h5>
                                <h3 className=' fw-bolder'>{isownCount ? <><Spinner size={'25px'} /></> : <Link to="/merchant/reports/offers_issued_to_own/">{ownCount?.ownoffersissued}</Link>}</h3>
                            </div>
                            <div className=' logo logoRedeemed d-flex justify-content-center align-items-center fs-4 border rounded-5 '>
                                <BsFillCreditCard2BackFill />
                            </div>
                        </CardBody>
                    </Card>
                </Col>

                <Col xl='4' md='6' sm='12'>
                    <Card>
                        <CardBody className=' d-flex justify-content-between' style={{ height: `100px` }}>
                            <div>
                                <h5>Offers Viewed</h5>
                                <h3 className=' fw-bolder'>{isownCount ? <><Spinner size={'25px'} /></> : <Link to="/merchant/reports/incentive_viewed_own/">{ownCount?.ownoffersviewed}</Link>}</h3>
                            </div>
                            <div className='logo logoIssued d-flex justify-content-center align-items-center fs-4 border rounded-5 '>
                                <TiTick />
                            </div>
                        </CardBody>
                    </Card>
                </Col>

                <Col xl='4' md='6' sm='12'>
                    <Card>
                        <CardBody className=' d-flex justify-content-between' style={{ height: `100px` }}>
                            <div>
                                <h5>Offers Clicked</h5>
                                <h3 className=' fw-bolder '>{isownCount ? <><Spinner size={'25px'} /></> : <Link to="/merchant/reports/own_clicks/">{ownCount?.ownoffersclicked}</Link>}</h3>
                            </div>
                            <div className='logo logoReferrals d-flex justify-content-center align-items-center fs-4 border rounded-5 '>
                                <BsCashStack />
                            </div>
                        </CardBody>
                    </Card>
                </Col>

                <Col xl='4' md='6' sm='12'>
                    <Card>
                        <CardBody className=' d-flex justify-content-between'>
                            <div>
                                <h5>Offers Redeemed</h5>
                                <h3 className=' fw-bolder'>{isownCount ? <><Spinner size={'25px'} /></> : <Link to="/merchant/reports/partner_redemptions/">{ownCount?.ownoffersredeemed}</Link>}</h3>
                            </div>
                            <div className=' logo logoRedeemed d-flex justify-content-center align-items-center fs-4 border rounded-5 '>
                                <BsFillCreditCard2BackFill />
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xl='4' md='6' sm='12'>
                    <Card>
                        <CardBody className=' d-flex justify-content-between' style={{ height: `100px` }}>
                            <div>
                                <h5>Revenue Earned</h5>
                                <h3 className=' fw-bolder'>{isownCount ? <><Spinner size={'25px'} /></> : <Link to="">{userPermission?.currencySymbol}{ownCount?.ownrevenueearned}</Link>}</h3>
                            </div>
                            <div className='logo logoIssued d-flex justify-content-center align-items-center fs-4 border rounded-5 '>
                                <TiTick />
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xl='4' md='6' sm='12'>
                    <Card>
                        <CardBody className=' d-flex justify-content-between' style={{ height: `100px` }}>
                            <div>
                                <h5>Customers Gained</h5>
                                <h3 className=' fw-bolder '>0</h3>
                            </div>
                            <div className='logo logoReferrals d-flex justify-content-center align-items-center fs-4 border rounded-5 '>
                                <BsCashStack />
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <span className='h4 text-left mb-1'>Best Performing Partners based on</span>
                <Col xl='4' md='6' sm='12'>
                    <Card>
                        <CardBody className=' d-flex justify-content-between'>
                            <div>
                                <h5>Offers Issued</h5>
                                <h3 className=' fw-bolder'>0</h3>
                            </div>
                            <div className=' logo logoRedeemed d-flex justify-content-center align-items-center fs-4 border rounded-5 '>
                                <BsFillCreditCard2BackFill />
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xl='4' md='6' sm='12'>
                    <Card>
                        <CardBody className=' d-flex justify-content-between' style={{ height: `100px` }}>
                            <div>
                                <h5>Offers Viewed</h5>
                                <h3 className=' fw-bolder'>0</h3>
                            </div>
                            <div className='logo logoIssued d-flex justify-content-center align-items-center fs-4 border rounded-5 '>
                                <TiTick />
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xl='4' md='6' sm='12'>
                    <Card>
                        <CardBody className=' d-flex justify-content-between' style={{ height: `100px` }}>
                            <div>
                                <h5>Offers Clicked</h5>
                                <h3 className=' fw-bolder '>0</h3>
                            </div>
                            <div className='logo logoReferrals d-flex justify-content-center align-items-center fs-4 border rounded-5 '>
                                <BsCashStack />
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xl='4' md='6' sm='12'>
                    <Card>
                        <CardBody className=' d-flex justify-content-between'>
                            <div>
                                <h5>Offers Redeemed</h5>
                                <h3 className=' fw-bolder'>0</h3>
                            </div>
                            <div className=' logo logoRedeemed d-flex justify-content-center align-items-center fs-4 border rounded-5 '>
                                <BsFillCreditCard2BackFill />
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xl='4' md='6' sm='12'>
                    <Card>
                        <CardBody className=' d-flex justify-content-between' style={{ height: `100px` }}>
                            <div>
                                <h5>Revenue Earned</h5>
                                <h3 className=' fw-bolder'>{userPermission?.currencySymbol}0</h3>
                            </div>
                            <div className='logo logoIssued d-flex justify-content-center align-items-center fs-4 border rounded-5 '>
                                <TiTick />
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xl='4' md='6' sm='12'>
                    <Card>
                        <CardBody className=' d-flex justify-content-between' style={{ height: `100px` }}>
                            <div>
                                <h5>Customers Acquired</h5>
                                <h3 className=' fw-bolder '>0</h3>
                            </div>
                            <div className='logo logoReferrals d-flex justify-content-center align-items-center fs-4 border rounded-5 '>
                                <BsCashStack />
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xl='4' md='6' sm='12'>
                    <Card>
                        <CardBody className=' d-flex justify-content-between' style={{ height: `100px` }}>
                            <div>
                                <h5>Customers Retained</h5>
                                <h3 className=' fw-bolder '>0</h3>
                            </div>
                            <div className='logo logoReferrals d-flex justify-content-center align-items-center fs-4 border rounded-5 '>
                                <BsCashStack />
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xl='4' md='6' sm='12'>
                    <Card>
                        <CardBody className=' d-flex justify-content-between'>
                            <div>
                                <h5>Repurchases via Partners</h5>
                                <h3 className=' fw-bolder'>0</h3>
                            </div>
                            <div className=' logo logoRedeemed d-flex justify-content-center align-items-center fs-4 border rounded-5 '>
                                <BsFillCreditCard2BackFill />
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xl='4' md='6' sm='12'>
                    <Card>
                        <CardBody className=' d-flex justify-content-between' style={{ height: `100px` }}>
                            <div>
                                <h5>Value addition via partners</h5>
                                <h3 className=' fw-bolder'>0</h3>
                            </div>
                            <div className='logo logoIssued d-flex justify-content-center align-items-center fs-4 border rounded-5 '>
                                <TiTick />
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                
            </Row>


        </>
    )
}

export default Reports