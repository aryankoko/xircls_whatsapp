import { useState } from "react"
import { ChevronUp } from "react-feather"
import { Container, Row, Col } from "reactstrap"
import countries from "./Country"
import $ from 'jquery'
import './NewFrontBase.css'
import { useNavigate } from "react-router-dom"

const NewSelectCountry = () => {
    const navigate = useNavigate()
    const [drop, setDrop] = useState(false)

    const [dropdownHead, setDropdownHead] = useState({
        flag: '--',
        name: 'Select Country',
        currency: '--'
    })

    const [searchField, setSearchField] = useState('')

    const changeHead = (flag, name, curr_code, curr_symbol) => {
        setDrop(false)

        const tempObj = {
            flag: <span className="fs-1">{flag}</span>,
            name,
            currency: `- ${curr_code} ${curr_symbol ? `(${curr_symbol})` : ''}`
        }

        setDropdownHead(tempObj)
    }

    return (
        <div>
            <Container fluid>
                <Row className="w-100 px-2">
                    <Col xs={2}>
                        <img className="py-2" width={'70%'} src="https://api.xircls.com/static/images/website-slide/logo-dark2.png" alt="Logo" />
                    </Col>
                    <div className="w-100"></div>
                    <Col xs={4} className='d-flex gap-2 px-2'>
                        <div className="bg-dark w-100 rounded-pill" style={{ padding: '0.25rem' }}></div>
                        <div className="bg-dark w-100 rounded-pill" style={{ padding: '0.25rem' }}></div>
                        <div className="bg-secondary bg-light-secondary w-100 rounded-pill" style={{ padding: '0.25rem' }}></div>
                        <div className="bg-light-secondary w-100 rounded-pill" style={{ padding: '0.25rem' }}></div>
                        <div className="bg-light-secondary w-100 rounded-pill" style={{ padding: '0.25rem' }}></div>
                        <div className="bg-light-secondary w-100 rounded-pill" style={{ padding: '0.25rem' }}></div>
                        <div className="bg-light-secondary w-100 rounded-pill" style={{ padding: '0.25rem' }}></div>
                    </Col>
                    <div className="w-100"></div>
                    <Col className="text-black px-2 py-1">Step 02/ <span className="text-secondary">07</span></Col>
                </Row>
                <Row className="match-height px-2" style={{ transition: '0.3s ease' }}>
                    <Col lg={6} style={{ height: 500 }} className='d-flex flex-column justify-content-between'>
                        <div>
                            <h1 className="text-black mb-2" style={{ fontSize: "3.25rem" }}>Select your Country and Currency</h1>
                            <div className="rounded-3 p-2" style={{ backgroundColor: '#f3f3f3' }}>
                                <div className="bg-white" style={{ boxShadow: '5px 5px 5px rgba(0,0,0,0.075)', borderRadius: '2rem' }}>
                                    <Container className="bg-white text-black position-relative cursor-pointer rounded-pill overflow-hidden" style={{ boxShadow: '5px 5px 5px rgba(0,0,0,0.075)', zIndex: 2 }}>
                                        <Row className="align-items-center match-height position-sticky bg-white" style={{ height: '7.5vh', padding: '0.25rem', top: '0px' }}>
                                            {!drop && <Col xs={8} onClick={() => setDrop(true)} className="d-flex flex-row align-items-center overflow-hidden p-0">{dropdownHead.flag} <span className="ms-3 w-100">{dropdownHead.name}</span></Col>}
                                            {!drop && <Col xs={3} onClick={() => setDrop(true)} className='overflow-hidden p-0'>{dropdownHead.currency}</Col>}
                                            {drop && <Col xs={11} onClick={() => setDrop(true)} className='d-flex flex-row align-items-center overflow-hidden p-0'>
                                                <input id="search_input" placeholder={dropdownHead.name === 'Select Country' ? 'Search Country/ Currency' : dropdownHead.name} value={searchField} onChange={e => setSearchField(e.target.value)} onFocus={() => {
                                                    $('#search_input').addClass('border-dark')
                                                }} type="text" className="form-control border shadow-none" style={{ padding: '0.5rem' }} />
                                            </Col>}
                                            <Col xs={1} onClick={() => {
                                                setDrop(!drop)
                                                console.log('2454', !drop)
                                            }}>
                                                <ChevronUp size={20} style={{ transition: '0.3s ease', transform: `rotate(${drop ? '0' : '180'}deg)` }} /></Col>
                                        </Row>
                                    </Container>
                                    <Container className="bg-white text-black position-relative cursor-pointer" style={{ maxHeight: drop ? 200 : 0, overflowY: 'scroll', transition: '0.3s ease' }}>
                                        {countries.filter(ele => ele.name.toLocaleLowerCase().includes(searchField.toLocaleLowerCase().trim()) || ele.currency?.name?.toLocaleLowerCase().includes(searchField.toLocaleLowerCase().trim()) || ele.currency?.code.toLocaleLowerCase().includes(searchField.toLocaleLowerCase().trim()) || ele.isoAlpha2?.toLocaleLowerCase().includes(searchField.toLocaleLowerCase().trim()) || ele.isoAlpha3?.toLocaleLowerCase().includes(searchField.toLocaleLowerCase().trim()) || ele.isoNumeric?.toString().includes(searchField.trim()) || ele.flag.includes(searchField.trim())
                                        ).map((ele, key) => {
                                            return (
                                                <Row onClick={() => {
                                                    changeHead(ele.flag, ele.name, ele.currency?.code, ele.currency?.symbol)
                                                }} key={key} className="align-items-center match-height py-1 border-bottom" style={{ height: 60, padding: '0.25rem', top: '0px' }}>
                                                    <Col className="d-flex flex-row align-items-center overflow-hidden p-0" xs={8}><span className="fs-1">{ele.flag}</span> <span className="ms-3 w-100">{ele.name}</span></Col>
                                                    <Col xs={3} className='overflow-hidden p-0'>- {(ele.currency.code !== '' || ele.currency.code !== undefined) && ele.currency?.code} {ele.currency?.symbol !== '' && ele.currency?.symbol !== false && `(${ele.currency?.symbol})`}</Col>
                                                </Row>
                                            )
                                        })}
                                    </Container>
                                </div>
                            </div>
                        </div>
                        <div className="text-end px-2">
                            <button onClick={() => {
                                navigate('/new_signup/new_mode/')
                            }} className="btn text-black">Back</button><button onClick={() => {
                                navigate('/new_create_company/')
                            }} style={{ backgroundColor: 'black' }} className="btn px-3 text-white rounded-pill waves-effect waves-float waves-light">Next</button>
                        </div>
                    </Col>
                    <Col lg={6} style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/020/598/535/large_2x/data-analytics-dashboard-and-business-finance-report-concept-with-people-character-outline-design-style-minimal-illustration-for-landing-page-web-banner-infographics-hero-images-vector.jpg')", backgroundSize: '100%', backgroundPosition: 'center' }}>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default NewSelectCountry