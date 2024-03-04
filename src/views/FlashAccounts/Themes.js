import React, { useContext, useEffect, useState } from 'react'
import { Card, CardBody, Col, Container, Row } from 'reactstrap'
import skeletonBg from "../SuperLeadz/Customization/skeleton.svg"
import { Home } from 'react-feather'
import { SuperLeadzBaseURL } from '../../assets/auth/jwtService'
import { PermissionProvider } from '../../Helper/Context'
import DynamicForm from './components/DynamicForm'
import { Link } from 'react-router-dom'
import { Tone, getCurrentOutlet, purpose, strategy } from '../Validator'
import Spinner from '../Components/DataTable/Spinner'

const Themes = () => {

    // const [selectedFilter, setSelectedFilter] = useState([])
    const defaultType = {
        purpose: [],
        strategy: [],
        tone: []
    }
    const [isLoading, setIsloading] = useState(true)
    const [filterType, setFilterType] = useState(defaultType)

    const { userPermission } = useContext(PermissionProvider)

    const [allThemes, setAllThemes] = useState([])

    const outletDetail = getCurrentOutlet()

    const getData = () => {

        fetch(`${SuperLeadzBaseURL}/api/v1/add_default_theme/?app=${userPermission?.appName}&shop=${outletDetail[0]?.web_url}`)
        .then((data) => data.json())
        .then((resp) => {
            console.log(resp)
            setAllThemes(resp?.success)
            setIsloading(false)
            setFilterType({...filterType, purpose: purpose.map((curElem) => curElem?.id), strategy: strategy.map((curElem) => curElem?.id), tone: Tone.map((curElem) => curElem?.id)})
            // setSelectedFilter([...strategy?.map((cur) => cur?.value), ...Tone?.map((cur) => cur?.value)])
        })
        .catch((error) => {
            console.log(error)
            setIsloading(false)
        })
    }

    useEffect(() => {
        getData()
    }, [])

    console.log(strategy?.filter((curElem) => {
        curElem?.purpose_id.filter((pur_id) => {
            console.log(filterType.purpose.includes(pur_id))
            return filterType.purpose.includes(pur_id)
        })
    }))

    const filteredData = allThemes?.filter((curElem) => filterType?.purpose?.includes(JSON.parse(curElem?.default_theme)?.page_1?.purpose) || filterType?.strategy?.includes(JSON.parse(curElem?.default_theme)?.page_1?.strategy) || filterType?.strategy?.includes(JSON.parse(curElem?.default_theme)?.page_1?.tone))
    // const filteredData = []
    console.log(allThemes, "allThemes")

    const strategyFilter = strategy?.filter((curElem) => {
        return curElem?.purpose_id.some((pur_id) => {
            console.log(filterType.purpose.includes(pur_id))
            return filterType.purpose.includes(pur_id)
        })
    })

    const toneFilter = Tone?.filter((curElem) => {
        return curElem?.strategy_id.some((strat_id) => {
            console.log(filterType.strategy.includes(strat_id))
            return filterType.strategy.includes(strat_id)
        })
    })

    return (
        <Container fluid className='px-0'>

            <style>
                {`
                    .flash_themes.active {
                        border: 1px solid #ccc;
                        border-radius: 6px;
                    }
                `}
            </style>
            <div className="d-flex justtify-content-center align-items-start">
                <div className="navHere" style={{width: '350px', height: '100%', padding: '0px 20px 10px'}}>
                    <Card>
                        <CardBody>
                            
                            <div className={`mb-2 d-flex justify-content-start align-items-center gap-1 flash_themes cursor-pointer ${[...strategy, ...Tone, ...purpose].length === [...filterType?.purpose, ...filterType?.tone, ...filterType?.strategy].length ? 'active' : ''}`} onClick={() => {
                                if ([...strategy, ...Tone, ...purpose].length === [...filterType?.purpose, ...filterType?.tone, ...filterType?.strategy].length) {
                                    setFilterType(defaultType)
                                } else {
                                    setFilterType({...filterType, purpose: purpose.map((curElem) => curElem?.id), strategy: strategy.map((curElem) => curElem?.id), tone: Tone.map((curElem) => curElem?.id)})
                                }
                            }} style={{padding: '10px'}}>
                                <Home size={'20px'} />
                                <h4 className='m-0'>All Themes</h4>
                            </div>

                            {/* <div className={`mb-2 d-flex justify-content-start align-items-center gap-1 flash_themes cursor-pointer ${selectedFilter.includes("myThemes") ? 'active' : ''}`} style={{padding: '10px'}} onClick={() => {}}>
                                <Home size={'20px'} />
                                <h4 className='m-0'>My Themes</h4>
                            </div> */}

                            <div className={`mb-2`} style={{padding: '10px'}}>
                                <h4 className='m-0'>Purpose</h4>
                                <div className="checkboxs mt-1">
                                    {
                                        purpose?.map((curElem, key) => {
                                            return <div key={key} className="d-flex align-items-center justify-content-between gap-1 form-check form-check-success m-0" style={{padding: '0px', paddingBottom: '8px'}}>
                                                <label style={{ fontSize: "15px" }} htmlFor="keep_email_check">{curElem?.label}</label>
                                                <input value={curElem?.id} id="keep_email_check" checked={filterType.purpose.includes(curElem?.id)} type='checkbox' className='form-check-input m-0 p-0 cursor-pointer' name="email_check" onChange={(e) => {
                                                    e.target.checked ? setFilterType({...filterType, purpose: [...filterType.purpose, e.target.value]}) : setFilterType({...filterType, purpose: [...filterType?.purpose.filter((curElem) => curElem !== e.target.value)]})
                                                }} />
                                            </div>
                                        })
                                    }
                                    
                                </div>
                            </div>

                            <div className={`mb-2`} style={{padding: '10px'}}>
                                {
                                    strategyFilter.length > 0 ? <>
                                        <h4 className='m-0'>Strategy</h4>
                                        <div className="checkboxs mt-1">
                                            {
                                                strategyFilter.map((curElem, key) => {
                                                    return <div key={key} className="d-flex align-items-center justify-content-between gap-1 form-check form-check-success m-0" style={{padding: '0px', paddingBottom: '8px'}}>
                                                        <label style={{ fontSize: "15px" }} htmlFor="keep_email_check">{curElem?.label}</label>
                                                        <input value={curElem?.id} id="keep_email_check" checked={filterType.strategy.includes(curElem?.id)} type='checkbox' className='form-check-input m-0 p-0 cursor-pointer' name="email_check" onChange={(e) => {
                                                            e.target.checked ? setFilterType({...filterType, strategy: [...filterType.strategy, e.target.value]}) : setFilterType({...filterType, strategy: [...filterType?.strategy?.filter((curElem) => curElem !== e.target.value)]})
                                                        }} />
                                                    </div>
                                                })
                                            }
                                            
                                        </div>
                                    
                                    </> : ""
                                }
                            </div>

                            <div className={`mb-2`} style={{padding: '10px'}}>
                                {
                                    toneFilter.length > 0 ? <>
                                        <h4 className='m-0'>Tone</h4>
                                        <div className="checkboxs mt-1">
                                            {
                                                toneFilter.map((curElem, key) => {
                                                    return <div key={key} className="d-flex align-items-center justify-content-between gap-1 form-check form-check-success m-0" style={{padding: '0px', paddingBottom: '8px'}}>
                                                        <label style={{ fontSize: "15px" }} htmlFor="keep_email_check">{curElem?.label}</label>
                                                        <input value={curElem?.id} id="keep_email_check" checked={filterType.tone.includes(curElem?.id)} type='checkbox' className='form-check-input m-0 p-0 cursor-pointer' name="email_check" onChange={(e) => {
                                                            e.target.checked ? setFilterType({...filterType, tone: [...filterType.tone, e.target.value]}) : setFilterType({...filterType, tone: [...filterType?.tone?.filter((curElem) => curElem !== e.target.value)]})
                                                        }} />
                                                    </div>
                                                }) 
                                            }
                                            
                                        </div>
                                    </> : ''
                                }
                            </div>
                        </CardBody>
                    </Card>

                    {/* <div key={key} className={`d-flex justify-content-start align-items-center gap-1 mt-2 flash_themes ${selectedFilter === "strategies" ? 'active' : ''}`} style={{padding: '10px'}} onClick={() => setSelectedFilter("strategies")}>
                        <a>Strategies</a>
                    </div> */}
                    
                </div>
                <div className="content_here w-100">
                    <Row className='match-height '>
                        {   

                            !isLoading ? filteredData?.length > 0 ? filteredData?.map((theme, key) => {
                                return (
                                    <Col className='d-flex flex-column align-items-stretch' md={6} key={key}>
                                        <Card>
                                            <CardBody>
                                                <div>
                                                    <div className="d-flex justify-content-center align-items-center rounded position-relative m-auto" style={{height: '375px', width: '100%', backgroundSize: "100%", backgroundImage: `url(${skeletonBg})`, backgroundColor: "rgba(0,0,0,0.25)", backgroundBlendMode: "soft-light", overflow: 'hidden' }}>
                                                        <DynamicForm data={JSON.parse(theme?.default_theme)} />
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-end align-items-center gap-2 mt-2">

                                                    {/* <h3 className="mt-2 mb-0">{theme.theme_name}</h3> */}

                                                    <Link className="btn btn-primary" to={`/merchant/Flash_Accounts/settings/`} state={{data: JSON.parse(theme?.default_theme), id: theme?.id}}>Use Template</Link>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                )
                            }) : <>
                                <Card>
                                    <CardBody>
                                        <div className="text-center">
                                            <h4>Template not found</h4> 
                                        </div>
                                    </CardBody>
                                </Card>
                            </> : <Card>
                                <CardBody>
                                    <div className="text-center">
                                        <Spinner size={'25px'} />
                                    </div>
                                </CardBody>
                            </Card>
                        }
                    </Row>
                </div>
            </div>
        </Container>
    )
}

export default Themes