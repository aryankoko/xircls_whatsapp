import { Container, Row, Col, Card, CardBody } from "reactstrap"
// import $ from 'jquery'
import './NewFrontBase.css'
import CompanyImg from '../../assets/images/vector/Company-bro.svg'
// import studyPng from './assets/ICONS/studying-cuate.png'
// import gMap from './assets/bg_images/Google-Maps.png'

const NewCreateCompany = () => {
    return (
        // <Container className="new-hero pt-3">
        //     <Row className="match-height justify-content-center">
        //         <Col xs={4}>
        //             <Card className="shadow-none company-cards">
        //                 <CardBody className="d-flex flex-column justify-content-between align-items-center">
        //                     <label htmlFor="company-image" style={{ height: 80, width: 80 }} className="p-1 border active-company-image rounded-circle my-2 d-flex justify-content-center align-items-center cursor-pointer position-relative"><img src="https://www.pinclipart.com/picdir/big/126-1266771_post-page-to-add-pictures-comments-add-post.png" width={'85%'} alt="" />
        //                         <input type="file" style={{ opacity: 0 }} className='border-0 position-absolute w-100 h-100 cursor-pointer' id="company-image" />
        //                     </label>
        //                     <h4 className="text-center text-secondary mb-2">Tell us something about your company</h4>
        //                     <input
        //                         id="company-name" type="text" className="form-control active-company-input position-relative" placeholder="Company Name" />
        //                 </CardBody>
        //             </Card>
        //         </Col>
        //         <Col xs={4}>
        //             <Card className="shadow-none company-cards">
        //                 <CardBody className="d-flex justify-content-center align-items-center position-relative">
        //                     <div className="position-absolute w-100 h-100 p-2"><img src={gMap} width={'100%'} height={'100%'} alt="" /></div>
        //                     <input id="company-address" type="text" className="form-control active-company-input position-relative align-self-end" placeholder="Company Address" />
        //                 </CardBody>
        //             </Card>
        //         </Col>
        //         <Col xs={4}>
        //             <Card className="shadow-none company-cards">
        //                 <CardBody className="d-flex flex-column justify-content-between align-items-center">
        //                     <div style={{ height: 80, width: 80 }} className="p-1 border rounded-circle my-2 d-flex justify-content-center align-items-center active-company-image">
        //                         <img src="https://www.nicepng.com/png/full/170-1702469_download-open-box-icon.png" width={'85%'} alt="" />
        //                     </div>
        //                     <h4 className="text-center text-secondary mb-2">Select your business <br />Category</h4>
        //                     <select id="company-category" type="text" className="form-control active-company-input position-relative" >
        //                         <option selected>Category</option>
        //                         <option value="1">One</option>
        //                         <option value="2">Two</option>
        //                         <option value="3">Three</option>
        //                     </select>
        //                 </CardBody>
        //             </Card>
        //         </Col>
        //         <Col xs={12}>
        //             <Card className="shadow-none company-cards" style={{ backgroundImage: `url(${studyPng})`, backgroundSize: '25%', backgroundPosition: 'bottom center', backgroundRepeat: 'no-repeat' }}>
        //                 <CardBody className="d-flex justify-content-between align-items-start p-3">
        //                     <Row className="w-100">
        //                         <Col lg={3}>
        //                             <section>
        //                                 <h4 className="text-secondary">Who do you want to reach out to?</h4>
        //                                 <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis ratione.</p>
        //                             </section>
        //                         </Col>
        //                         <Col lg={5}></Col>
        //                         <Col lg={4}>
        //                             <Row>
        //                                 <Col xs={6}><input id="company-company-type" placeholder="Company Type" type="text" className="form-control active-company-input mb-2" /></Col>
        //                                 <Col xs={6}><input id="company-website" placeholder="Website" type="text" className="form-control active-company-input mb-2" /></Col>
        //                                 <Col xs={6}><input id="company-email" placeholder="Email" type="text" className="form-control active-company-input mb-2" /></Col>
        //                                 <Col xs={6}>
        //                                     <select id="company-ph-code" type="text" className="form-control active-company-input position-relative" >
        //                                         <option selected>+91</option>
        //                                         <option value="1">One</option>
        //                                         <option value="2">Two</option>
        //                                         <option value="3">Three</option>
        //                                     </select>
        //                                 </Col>
        //                                 <Col xs={12}><input id="company-comp-reg" placeholder="Company Registration" type="text" className="form-control active-company-input mb-2" /></Col>
        //                                 <Col xs={12}><input id="company-tax-reg" placeholder="Tax Registration" type="text" className="form-control active-company-input mb-2" /></Col>
        //                             </Row>
        //                         </Col>
        //                     </Row>
        //                 </CardBody>
        //             </Card>
        //         </Col>
        //         <Col xs={12} className='flex-row justify-content-end'>
        //             <button className="btn d-inline">Back</button><button className="btn px-3 back-black d-inline">Next</button>
        //         </Col>
        //     </Row>
        // </Container>
        <div>
            <Container fluid>
                <Row className="w-100 px-2">
                    <Col xs={2}>
                        <img className="py-2" width={'70%'} src="https://api.xircls.com/static/images/website-slide/logo-dark2.png" alt="Logo" />
                    </Col>
                </Row>
                <Row className="match-height px-2" style={{ transition: '0.3s ease' }}>
                    <Col lg={6} className='pb-2'>

                        <div className='d-flex gap-2 px-0 w-75'>
                            <div className="bg-dark w-100 rounded-pill" style={{ padding: '0.25rem' }}></div>
                            <div className="bg-dark w-100 rounded-pill" style={{ padding: '0.25rem' }}></div>
                            <div className="bg-secondary w-100 rounded-pill" style={{ padding: '0.25rem' }}></div>
                            <div className="bg-light-secondary w-100 rounded-pill" style={{ padding: '0.25rem' }}></div>
                            <div className="bg-light-secondary w-100 rounded-pill" style={{ padding: '0.25rem' }}></div>
                            <div className="bg-light-secondary w-100 rounded-pill" style={{ padding: '0.25rem' }}></div>
                            <div className="bg-light-secondary w-100 rounded-pill" style={{ padding: '0.25rem' }}></div>
                        </div>
                        <div className="text-black px-2 py-1">Step 03/ <span className="text-secondary">07</span></div>
                        <h1 className="text-black mb-2" style={{ fontSize: "3.25rem" }}>Tell Us About Your Company</h1>
                        <div className="h-100 w-100" style={{ backgroundImage: `url(${CompanyImg})`, backgroundSize: 'contain', backgroundPosition: 'top', backgroundRepeat: 'no-repeat' }}>
                            {/* <img src={CompanyImg} alt="" width={'100%'} height={'100%'} /> */}
                            {/* <div className="rounded-3 p-2" style={{ backgroundColor: '#f3f3f3' }}>
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
                                </div> */}
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="h-100 w-100 border p-2" style={{backgroundColor: '#f3f3f3', borderRadius: '1rem'}}>
                            <div className="d-flex gap-2 mb-2 align-items-center">
                                <div className="text-end w-25 fw-bolder text-black">Company Name</div>
                                <div className="text-end w-75">
                                    <input placeholder="Enter Your Company Name" type="text" className="w-100" style={{border: 'none', outline: 'none', boxShadow: 'rgba(0, 0, 0, 0.125) 0px 5px 10px', padding: '0.75rem', borderRadius: '0.25rem'}} />
                                </div>
                            </div>
                            <div className="d-flex gap-2 mb-2 align-items-center">
                                <div className="text-end w-25 fw-bolder text-black">Outlet</div>
                                <div className="text-end w-75">
                                    <input placeholder="What Is Your Outlet" type="text" className="w-100" style={{border: 'none', outline: 'none', boxShadow: 'rgba(0, 0, 0, 0.125) 0px 5px 10px', padding: '0.75rem', borderRadius: '0.25rem'}} />
                                </div>
                            </div>
                            <div className="d-flex gap-2 mb-2 align-items-center">
                                <div className="text-end w-25 fw-bolder text-black">Category</div>
                                <div className="text-end w-75">
                                    <input placeholder="Select Your Category" type="text" className="w-100" style={{border: 'none', outline: 'none', boxShadow: 'rgba(0, 0, 0, 0.125) 0px 5px 10px', padding: '0.75rem', borderRadius: '0.25rem'}} />
                                </div>
                            </div>
                            <div className="d-flex gap-2 mb-2 align-items-center">
                                <div className="text-end w-25 fw-bolder text-black">Sub-Category</div>
                                <div className="text-end w-75">
                                    <input placeholder="Select Your Sub-Category" type="text" className="w-100" style={{border: 'none', outline: 'none', boxShadow: 'rgba(0, 0, 0, 0.125) 0px 5px 10px', padding: '0.75rem', borderRadius: '0.25rem'}} />
                                </div>
                            </div>
                            <div className="d-flex gap-2 mb-2 align-items-center">
                                <div className="text-end w-25 fw-bolder text-black">Audience</div>
                                <div className="text-end w-75">
                                    <input placeholder="Who Do You Want To Reach Out To" type="text" className="w-100" style={{border: 'none', outline: 'none', boxShadow: 'rgba(0, 0, 0, 0.125) 0px 5px 10px', padding: '0.75rem', borderRadius: '0.25rem'}} />
                                </div>
                            </div>
                            <div className="d-flex gap-2 mb-2 align-items-center">
                                <div className="text-end w-25 fw-bolder text-black">Age Group</div>
                                <div className="text-end w-75">
                                    <input placeholder="Target Age Group" type="text" className="w-100" style={{border: 'none', outline: 'none', boxShadow: 'rgba(0, 0, 0, 0.125) 0px 5px 10px', padding: '0.75rem', borderRadius: '0.25rem'}} />
                                </div>
                            </div>
                            <div className="d-flex gap-2 mb-2 align-items-center">
                                <div className="text-end w-25 fw-bolder text-black">Gender</div>
                                <div className="text-end w-75">
                                    <input placeholder="Target Age Group" type="text" className="w-100" style={{border: 'none', outline: 'none', boxShadow: 'rgba(0, 0, 0, 0.125) 0px 5px 10px', padding: '0.75rem', borderRadius: '0.25rem'}} />
                                </div>
                            </div>

                            <div className="text-end py-1">
                                <button onClick={() => {
                                    navigate('/new_signup/new_mode/')
                                }} className="btn text-black">Back</button><button onClick={() => {
                                    navigate('/new_create_company/')
                                }} style={{ backgroundColor: 'black' }} className="btn px-3 text-white rounded-pill waves-effect    waves-float waves-light">Next</button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default NewCreateCompany