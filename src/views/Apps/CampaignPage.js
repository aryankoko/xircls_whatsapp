import React, { useContext, useEffect, useState } from 'react'
import { getReq, postReq } from '../../assets/auth/jwtService'
// import Timeline from '@components/timeline'
// import MomentTime from '../Components/Time-Moment/MomentTime'
import { Card, CardBody, Col, Row } from 'reactstrap'
import { PermissionProvider } from '../../Helper/Context'
import Spinner from '../Components/DataTable/Spinner'
import { Link, useNavigate } from 'react-router-dom'
import { getCurrentOutlet, timelineName } from '../Validator'
import toast from 'react-hot-toast'

const Campaign = () => {

    const { userPermission, setUserPermission } = useContext(PermissionProvider)
    const [data, setData] = useState({
        timeLine: [],
        isLoading: true
    })
    const [isCampagin, setIsCampagin] = useState(0)
    const navigate = useNavigate()
    const outletDetails = getCurrentOutlet()
    console.log(userPermission)

    useEffect(() => {
        getReq('campaignData', `?app=${userPermission?.appName}`)
        .then((resp) => {
            console.log(resp)

            const timeLine = resp?.data?.data?.timeline

            const showingTimeLine = timeLine?.filter((curElem) => curElem?.isShow === 1)
            const completedTimeLine = timeLine?.filter((curElem) => curElem?.isShow === 1 && curElem?.isComplete === 1)

            if (showingTimeLine.length === completedTimeLine.length) {

                const campaignCreated = timeLine?.filter((curElem) => curElem?.key === "is_campaign_started")
                if (campaignCreated[0]?.isComplete === 1) {
                    setIsCampagin(0)
                } else {
                    setIsCampagin(1)
                }

            } else {
                setIsCampagin(0)
            }

            const updatedData = {
                timeLine: resp?.data?.data?.timeline,
                isLoading: false
            }
            setData((preData) => ({
                ...preData,
                ...updatedData
            }))
            
        })
        .catch((error) => {
            console.log(error)
        })
    }, [])
    
    const startCampagin = () => {
        const form_data = new FormData()
        form_data.append('app', userPermission?.appName)
        postReq('startCampagin', form_data)
        .then((resp) => {
            console.log(resp)
            const updatedPermission = {
                campaign: resp?.data?.status
            }
            setUserPermission((curElem) => ({
                ...curElem,
                ...updatedPermission
            }))
            toast.success('Campaign Started')
            navigate("/merchant/dashboard/")
        })
        .catch((error) => {
            console.log(error)
            toast.error('Something went wrong!')
        })
    }

    return (
        <>
            <Row>
                <Col sm='12'>
                    <Card>
                        <CardBody>
                            <div className="parent">
                                <h4 className='m-0'>Campaign Status</h4>
                            </div>
                                <hr />
                            <ul className="p-0 px-2 m-0" style={{ listStyle: 'none', maxHeight: '80vh', overflowY: "scroll", overflowX: 'visible' }}>
                                {
                                    data.isLoading ? <Spinner size={'30px'} /> : data?.timeLine.filter((cur) => cur.isShow).map((curElem, key) => {
                                        let color
                                        if (curElem.isComplete) {
                                            color = 'success'
                                        } else {
                                            color = 'danger'
                                        }

                                        let url = ""
                                        let showView = false
                                        if (curElem.key === "is_outlet_created") {
                                            url = `${outletDetails[0]?.id}/`
                                        } else {
                                            url = ''
                                        }
                                        
                                        const noView = ["is_plugin_installed", "is_plan_purchased", "is_ret_offer_created", "is_acq_offer_created"]
                                        
                                        if (noView.includes(curElem.key)) {
                                            showView = false
                                        } else {
                                            showView = true
                                        }

                                        return (
                                            <li key={key} className="position-relative px-2 pb-2" style={{ borderLeft: '0.5px dotted black' }}>
                                                <span className={`position-absolute rounded-pill bg-${color}`} style={{ width: 14, height: 14, top: 0, left: 0, transform: 'translate(-7px, 2.5px)' }}></span>
                                                <div>
                                                    
                                                    <h5>{curElem.name}</h5>
                                                    {
                                                        curElem.isComplete === 1 ? showView ? <Link className='isComplete' to={`${timelineName[userPermission?.appName] ? timelineName[userPermission?.appName][curElem.key] : '/merchant/campaign/'}${url}`}>Preview </Link> : "" : <Link className='isComplete' to={`${timelineName[userPermission?.appName] ? timelineName[userPermission?.appName][curElem.key] : '/merchant/campaign/'}${url}`}>Complete Now</Link>
                                                    }
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                                
                            </ul>
                            <div className='d-flex justify-content-end align-items-center mt-2 gap-1'>
                                {
                                    isCampagin === 1 ? <a className='btn btn-primary' onClick={() => startCampagin()}>Start Campagin</a> : ''
                                }

                                <Link to={`${timelineName[userPermission?.appName] ? timelineName[userPermission?.appName]['dashboard'] : '/merchant/campaign/'}`} className='btn btn-primary'>Proceed</Link>
                            </div>
                            
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Campaign