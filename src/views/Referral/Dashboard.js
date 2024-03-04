import {useEffect, useState} from 'react'
import { Col, Row, Card, CardBody, Badge } from 'reactstrap'
// import { Link } from 'react-router-dom'
import StatsCard from './components/StatsCard'
import instagram from '../../assets/images/referral/instagram.svg'
import facebook from '../../assets/images/referral/square-facebook.svg'
import X from '../../assets/images/referral/x-twitter.svg'
import { SuperLeadzBaseURL } from '../../assets/auth/jwtService'
import axios from 'axios'
import { getCurrentOutlet } from '../Validator'
import RefferedTable from './components/RefferedTable'
// import DataTableWithButtons from '../tables/data-tables/basic/TableMultilingual'
// import StatsCard from '../ui-element/Static'

const Dashboard = () => {
    const outletData = getCurrentOutlet()
    const [stats, SetStats] = useState()
    
    const getData = () => {
        
        axios.get(`${SuperLeadzBaseURL}/referral/dashboard/?shop=${outletData[0]?.web_url}`)
        .then((resp) => {
            console.log(resp)
            SetStats(resp.data)
        })
        .catch((error) => {
            console.log(error)
            // setIsLoading(false)
        })
    }
    useEffect(() => {
        getData()
        console.log('...', stats)
    }, [])

    return (
        <>
            <Card>
                <CardBody>
                    <Row className='mb-2'>
                        <Col><h4 className='fw-medium'>Referral Stats </h4></Col>
                    </Row>
                    <Row className='mb-1'>
                        <Col>
                            <Row><h6 className='fw-medium'>Total Views</h6></Row>
                            <Row><h2 className='fw-medium'>{stats?.total_views || 0}</h2></Row>
                        </Col>
                        <Col>
                            <Row><h6 className='fw-medium'>Advocate Signups</h6></Row>
                            <Row><h2 className='fw-medium'>{stats?.advocate_signups || 0}</h2></Row>
                        </Col>
                        <Col>
                            <Row><h6 className='fw-medium'>Total Referrals</h6></Row>
                            <Row><h2 className='fw-medium'>{stats?.total_referrals || 0}</h2></Row>
                        </Col>
                        <Col>
                            <Row><h6 className='fw-medium'>Total Redemptions</h6></Row>
                            <Row><h2 className='fw-medium'>{stats?.total_redemptions || 0}</h2></Row>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <Row className='mb-2'>
                        <Col><h4 className='fw-medium'>Revenue Stats </h4></Col>
                    </Row>
                    <Row className='mb-1'>
                        <Col>
                            <Row><h6 className='fw-medium'>Total Revenue</h6></Row>
                            <Row><h2 className='fw-medium'>{stats?.revenue || 0}</h2></Row>
                        </Col>
                        <Col>
                            <Row><h6 className='fw-medium'>Advocate Discounts Uses</h6></Row>
                            <Row><h2 className='fw-medium'>{stats?.advocate_discount_users || 0}</h2></Row>
                        </Col>
                        <Col>
                            <Row><h6 className='fw-medium'>Total Earnings</h6></Row>
                            <Row><h2 className='fw-medium'>{stats?.total_earnings || 0}</h2></Row>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <Row className='mb-2'>
                        <Col><h4 className='fw-medium'>Revenue Growth </h4></Col>
                    </Row>
                    <Row className='mb-1 ml-auto'>
                        90 days
                    </Row>
                    <Row className='mb-1'>
                        $12,000
                    </Row>
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <Row className='mb-2'>
                        <Col><h4 className='fw-medium'>Shares</h4></Col>
                    </Row>
                    <Row className='mb-2'><h2 className='fw-medium'>{stats?.total_clicks || 0} Total Clicks</h2></Row>
                    <Row>
                        <Col md={6}><div class="d-flex justify-content-between align-items-center border border-black mb-2" style={{padding: "0.5rem"}}><img src={instagram} alt='instagram' width={"25px"} /><div>{stats?.instagram_clicks || 0}</div></div></Col>
                        <Col md={6}><div class="d-flex justify-content-between align-items-center border border-black mb-2" style={{padding: "0.5rem"}}><img src={facebook} alt='facebook' width={"25px"} /><div>{stats?.facebook_clicks || 0}</div></div></Col>
                        <Col md={6}><div class="d-flex justify-content-between align-items-center border border-black mb-2" style={{padding: "0.5rem"}}><img src={X} alt='X' width={"25px"} /><div>{stats?.twitter_clicks || 0}</div></div></Col>
                    </Row>

                </CardBody>
            </Card>

            <Card>
                <CardBody>
                    <RefferedTable />
                </CardBody>
            </Card>
        </>
    )
}

export default Dashboard