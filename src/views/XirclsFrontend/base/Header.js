import React, { useEffect, useState } from "react"
import { Menu, X } from "react-feather"
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io"
import { Link, useLocation } from "react-router-dom"
import $ from 'jquery'
import logo from "./assets/logo-dark2.png"
import logo2 from "./assets/logo12.jpg"
import logo3 from "./assets/Sniper-logo.jpg"
import logo4 from "./assets/mission_statement_logo.jpg"
import logo5 from "./assets/Infiniti-logo.jpg"
import logo6 from "./assets/Semper Fi heart-logo.jpg"
import why_collaborative_marketing_logo from "./assets/why_collaborative_marketing_logo.png"
// import { Link } from "react-router-dom"
// import "./scss/App.scss"
// import "./css/style.scss"
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Dropdown, DropdownMenu, Container, Row, Col } from 'reactstrap'
import { xircls_url } from "../../Validator"

export default function Header() {
  const [dropDown, setDropDown] = useState({
    aboutUs: false,
    product: false,
    signUp: false,
    login: false
  })
  // const [dropdownOpen, setDropdownOpen] = useState(false)
  // const [dropdownOpen2, setDropdownOpen2] = useState(false)
  const [menu, setMenu] = useState('')
  const [open, setOpen] = useState('')
  const [navVis, setNavVis] = useState(false)
  const [scroll, setScroll] = useState(0)
  const location = useLocation()

  function getWindowSize() {
    const { innerWidth, innerHeight } = window
    return { innerWidth, innerHeight }
  }
  const [windowSize, setWindowSize] = useState(getWindowSize())
  // console.log(location)

  const scrollChange = () => {
    setScroll(window.scrollY)
  }

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize())
    }

    window.addEventListener('resize', handleWindowResize)
    window.addEventListener('scroll', scrollChange)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  useEffect(() => {
    setNavVis(false)
    setMenu(false)
  }, [location.pathname])

  const handleEnter = (type) => {
    if (type === 1) {
      setDropDown({...dropDown, aboutUs: true})
      $('#about').addClass('show').removeClass('hide')
    }
    if (type === 2) {
      setDropDown({...dropDown, product: true})
      $('#products').addClass('show').removeClass('hide')
    }
    if (type === 3) {
      setDropDown({...dropDown, signUp: true})
      $('#signUp').addClass('show').removeClass('hide')
    }

    if (type === 4) {
      setDropDown({...dropDown, login: true})
      $('#login').addClass('show').removeClass('hide')
    }
  }

  const handleLeave = (type) => {
    if (type === 1) {
      setDropDown({...dropDown, aboutUs: false})
      $('#about').addClass('hide').removeClass('show')
    }
    if (type === 2) {
      setDropDown({...dropDown, product: false})
      $('#products').addClass('hide').removeClass('show')
    }
    if (type === 3) {
      setDropDown({...dropDown, signUp: false})
      $('#signUp').addClass('hide').removeClass('show')
    }
    if (type === 4) {
      setDropDown({...dropDown, login: false})
      $('#login').addClass('hide').removeClass('show')
    }
  }

  const toggleMainMenu = (id) => {
    if (menu === id) {
      setMenu()
    } else {
      setMenu(id)
    }
  }

  const mainMenu = () => {
    setNavVis(!navVis)
    setMenu(!menu)
    toggleMainMenu('1')
  }

  const toggle = (id) => {
    if (open === id) {
      setOpen()
    } else {
      setOpen(id)
    }
  }

  return (
    

    <>
      {windowSize.innerWidth >= 992 &&
        <>
          <div className="top-block" style={{ height: 100 }}>
          </div>
          <Container fluid className='position-fixed top-0 bg-white' style={{ zIndex: 99, height: 100, boxShadow: scroll <= 1 ? '0px 0px 0px rgba(0,0,0,0)' : '0px 0px 10px rgba(0,0,0,0.1)' }}>
            <Container className="position-relative h-100">
              <Row className="bg-white h-100">
                <Col xs={6} className='d-flex align-items-center'>
                  <Link to='/'><img src={logo} alt="" height={scroll > 300 ? 60 : 100} style={{ transition: '0.35s ease-in-out' }} /></Link>
                </Col>
                
                <Col xs={6} className={`xircls-navlinks d-flex px-0`}>
                  <Link to='/' className="flex-grow-1 px-0 menu-items d-flex bg-white align-items-center font-13px-st letter-spacing-1">Home</Link>
                  <div onMouseEnter={() => handleEnter(1)} onMouseLeave={() => handleLeave(1)} className="flex-grow-1 px-0 about-hover font-13px-st letter-spacing-1 menu-items cursor-pointer d-flex bg-white align-items-center" style={{gap: `5px`}}>
                    <span className="icon-gap-small">
                      About Us
                    </span> <IoIosArrowDown />
                  </div>
                  <div onMouseEnter={() => handleEnter(2)} onMouseLeave={() => handleLeave(2)} className="flex-grow-1 px-0 about-hover font-13px-st letter-spacing-1 menu-items cursor-pointer d-flex bg-white align-items-center" style={{gap: `5px`}}>
                    <span className="icon-gap-small">
                      Products
                    </span> <IoIosArrowDown />
                  </div>
                  <Link to='/blog/' className="flex-grow-1 px-0 menu-items d-flex bg-white align-items-center font-13px-st letter-spacing-1">Blog</Link>
                  <Link to='/team/' className="flex-grow-1 px-0 menu-items d-flex bg-white align-items-center font-13px-st letter-spacing-1">Team</Link>

                  {/* <div onMouseEnter={() => handleEnter(3)} onMouseLeave={() => handleLeave(3)} className="flex-grow-1 px-0 about-hover font-13px-st letter-spacing-1 menu-items cursor-pointer d-flex bg-white align-items-center" style={{gap: `5px`}}>
                    <span className="icon-gap-small">
                      Sign up
                    </span> <IoIosArrowDown />
                  </div>
                  <div onMouseEnter={() => handleEnter(4)} onMouseLeave={() => handleLeave(4)} className="flex-grow-1 px-0 about-hover font-13px-st letter-spacing-1 menu-items cursor-pointer d-flex bg-white align-items-center" style={{gap: `5px`}}>
                    <span className="icon-gap-small">
                      Login
                    </span> <IoIosArrowDown />
                  </div> */}
                  <Link to='/merchant/signup/' className="flex-grow-1 px-0 menu-items d-flex bg-white align-items-center font-13px-st letter-spacing-1">Sign-up</Link>
                  <Link to='/merchant/login/' className="flex-grow-1 px-0 menu-items d-flex bg-white align-items-center font-13px-st letter-spacing-1">Login</Link>


                </Col>
              </Row>
              <div id="about" className="d-flex justify-content-center hide align-items-center mx-auto nav-dropdown">
                <Dropdown toggle={() => setDropDown({...dropDown, aboutUs: true})} className="w-90 mx-auto" onClick={() => setDropDown({...dropDown, aboutUs: true})} onMouseEnter={() => handleEnter(1)} onMouseLeave={() => handleLeave(1)} isOpen={dropDown.aboutUs}>
                  <DropdownMenu className="w-100">
                    <Container>
                      <Row>
                        <Col sm={4} className='d-flex flex-column justify-content-start py-2 border-end align-items-center'>
                          <img className="mb-2" width={64} height={64} src={logo2} />
                          <Link style={{fontSize: '18px'}} to='/about-us/why-XIRCLS/' className="text-uppercase font-18px-st text-blue hover-black">Why XIRCLS</Link>
                          <p className="text font-15px-st text-center text-dark mb-2">To Decentralize Online Marketing Practices.</p>
                          <Link to='/about-us/why-XIRCLS/' className="text-blue hover-blue">Learn More <IoIosArrowForward /></Link>
                        </Col>
                        <Col sm={4} className='d-flex flex-column justify-content-start py-2 border-end align-items-center'>
                          <img className="mb-2" width={64} height={64} src={why_collaborative_marketing_logo} />
                          <Link style={{fontSize: '18px'}} to='/about-us/why-collaborative-marketing/' className="text-uppercase font-18px-st text-blue hover-black">WHY COLLABORATIVE MARKETING?</Link>
                          <p className="text font-15px-st text-center text-dark mb-2">Because Life is Collaboration, Not Competition.</p>
                          <Link to='/about-us/why-collaborative-marketing/' className="text-blue hover-blue">Learn More <IoIosArrowForward /></Link>
                        </Col>
                        <Col sm={4} className='d-flex flex-column justify-content-start py-2 align-items-center'>
                          <img className="mb-2" width={64} height={64} src={logo4} />
                          <Link style={{fontSize: '18px'}} to='/about-us/vision-&-mission-statement/' className="text-uppercase font-18px-st text-blue hover-black">VISION & MISSION </Link>
                          <p className="text font-15px-st text-center text-dark mb-2">To Empower Businesses, Globally.</p>
                          <Link to='/about-us/vision-&-mission-statement/' className="text-blue hover-blue">Learn More <IoIosArrowForward /></Link>
                        </Col>
                      </Row>
                    </Container>
                  </DropdownMenu>
                </Dropdown>
              </div>
              <div id="products" className="d-flex justify-content-center hide align-items-center mx-auto nav-dropdown">
                <Dropdown toggle={() => setDropDown({...dropDown, product: true})}  className="w-90 mx-auto" onClick={() => setDropDown({...dropDown, product: true})} onMouseEnter={() => handleEnter(2)} onMouseLeave={() => handleLeave(2)} isOpen={dropDown.product}>
                  <DropdownMenu className="w-100">
                    <Container>
                      <Row>
                        <Col sm={4} className='d-flex flex-column justify-content-start py-2 border-end align-items-center'>
                          <img className="mb-2" width={64} height={64} src={logo5} />
                          <Link style={{fontSize: '18px'}} to='/products/infiniti/' className="text-uppercase font-18px-st text-blue hover-black">Infiniti</Link>
                          <p className="text font-15px-st text-center text-dark mb-2">Customer Acquisition and Loyalty</p>
                          <Link to='/products/infiniti/' className="text-blue hover-blue">Learn More <IoIosArrowForward /></Link>
                        </Col>
                        <Col sm={4} className='d-flex flex-column justify-content-start py-2 border-end align-items-center'>
                          <img className="mb-2" width={64} height={64} src={logo6} />
                          <Link style={{fontSize: '18px'}} to='/products/semperfi/' className="text-uppercase font-18px-st text-blue hover-black">Semper Fi</Link>
                          <p className="text font-15px-st text-center text-dark mb-2">Customer Loyalty</p>
                          <Link to='/products/semperfi/' className="text-blue hover-blue">Learn More <IoIosArrowForward /></Link>
                        </Col>
                        <Col sm={4} className='d-flex flex-column justify-content-start py-2 align-items-center'>
                          <img className="mb-2" width={64} height={64} src={logo3} />
                          <Link style={{fontSize: '18px'}} to='/products/sniper/' className="text-uppercase font-18px-st text-blue hover-black">Sniper</Link>
                          <p className="text font-15px-st text-center text-dark mb-2">Customer Acquisition</p>
                          <Link to='/products/sniper/' className="text-blue hover-blue">Learn More <IoIosArrowForward /></Link>
                        </Col>
                      </Row>
                    </Container>
                  </DropdownMenu>
                </Dropdown>
              </div>
              {/* <div id="signUp" className="d-flex justify-content-center hide align-items-center mx-auto nav-dropdown">
                <Dropdown toggle={() => setDropDown({...dropDown, signUp: true})} className="w-90 mx-auto" onClick={() => setDropDown({...dropDown, signUp: true})} onMouseEnter={() => handleEnter(3)} onMouseLeave={() => handleLeave(3)} isOpen={dropDown.signUp}>
                  <DropdownMenu className="w-100">
                    <Container>
                      <Row>
                        <Col sm={6} className='d-flex flex-column justify-content-start py-2 border-end align-items-center'>
                          <img className="mb-2" width={64} height={64} src={`${xircls_url}images/website-slide/merchant_login.png`} />
                          <Link style={{fontSize: '18px'}} to='/merchant/signup/' className="text-uppercase font-18px-st text-blue hover-black">Merchant</Link>
                          <p className="text-uppercase font-15px-st text-center text-dark mb-2">Business Registration</p>
                          <Link to='/merchant/signup/' className="text-blue hover-blue">Sign-up<IoIosArrowForward /></Link>
                        </Col>
                        <Col sm={6} className='d-flex flex-column justify-content-start py-2 border-end align-items-center'>
                          <img className="mb-2" width={64} height={64} src={`${xircls_url}images/website-slide/affiliate.png`} />
                          <Link style={{fontSize: '18px'}} to='/influencer/waitlist/' className="text-uppercase font-18px-st text-blue hover-black">Influencer</Link>
                          <p className="text-uppercase font-15px-st text-center text-dark mb-2">Profit Portal</p>
                          <Link to='/influencer/waitlist/' className="text-blue hover-blue">Waitlist <IoIosArrowForward /></Link>
                        </Col>
                        
                      </Row>
                    </Container>
                  </DropdownMenu>
                </Dropdown>
              </div>
              <div id="login" className="d-flex justify-content-center hide align-items-center mx-auto nav-dropdown">
                <Dropdown toggle={() => setDropDown({...dropDown, login: true})} className="w-90 mx-auto" onClick={() => setDropDown({...dropDown, login: true})} onMouseEnter={() => handleEnter(4)} onMouseLeave={() => handleLeave(4)} isOpen={dropDown.login}>
                  <DropdownMenu className="w-100">
                    <Container>
                      <Row>
                        <Col sm={6} className='d-flex flex-column justify-content-start py-2 border-end align-items-center'>
                          <img className="mb-2" width={64} height={64} src={`${xircls_url}images/website-slide/merchant_login.png`} />
                          <Link style={{fontSize: '18px'}} to='/merchant/login/' className="text-uppercase font-18px-st text-blue hover-black">Merchant</Link>
                          <p className="text-uppercase font-15px-st text-center text-dark mb-2">Merchant Portal</p>
                          <Link to='/merchant/login/' className="text-blue hover-blue">Login<IoIosArrowForward /></Link>
                        </Col>
                        <Col sm={6} className='d-flex flex-column justify-content-start py-2 border-end align-items-center'>
                          <img className="mb-2" width={64} height={64} src={`${xircls_url}images/website-slide/employe_login.png`} />
                          <Link style={{fontSize: '18px'}} to='/employee-login/' className="text-uppercase font-18px-st text-blue hover-black">Employee</Link>
                          <p className="text-uppercase font-15px-st text-center text-dark mb-2">Staff Access</p>
                          <Link to='/employee-login/' className="text-blue hover-blue">Login <IoIosArrowForward /></Link>
                        </Col>
                        
                      </Row>
                    </Container>
                  </DropdownMenu>
                </Dropdown>
              </div> */}
            </Container>
          </Container>
        </>}
      {windowSize.innerWidth < 992 &&
        <>
          <Container>
            <Row>
              <Col xs={12} className='border-bottom'>
                <div className='d-flex align-items-center justify-content-between px-2'>
                  <Link className="text-center flex-fill" to='/'><img src={logo} alt="" height={100} /></Link>
                  <span targetId='1' onClick={mainMenu} style={{ rotate: navVis && '180deg', transition: '0.25s ease-in-out' }} className=" cursor-pointer">{navVis ? <X /> : <Menu />}</span>
                </div>
                <Accordion flush open={menu} toggle={toggleMainMenu} className="py-0">
                  <AccordionItem className="py-0">
                    <AccordionBody accordionId="1" className="py-0">
                      <div className="d-flex flex-column">
                        <Link className='border-bottom py-3 px-1 w-100 text-dark font-13px-st letter-spacing-1' to='/'>Home</Link>
                        <div className="menu-subitems border-bottom">
                          <Accordion flush open={open} toggle={toggle}>
                            <AccordionItem>
                              <AccordionHeader targetId="1"><div className='py-3 text-dark font-13px-st letter-spacing-1'>About Us</div></AccordionHeader>
                              <AccordionBody accordionId="1">
                                <Container>
                                  <Row>
                                    <Col sm={12} className='d-flex flex-column justify-content-start py-1 border-top align-items-center'>
                                      <img className="mb-2" width={64} height={64} src={logo2} />
                                      <Link to='/about-us/why-XIRCLS/' className="text-uppercase font-22px-res text-center text-blue hover-black">Why XIRCLS</Link>
                                      <Link to='/about-us/why-XIRCLS/' className="text-blue hover-blue">Learn More <IoIosArrowForward /></Link>
                                    </Col>
                                    <Col sm={12} className='d-flex flex-column justify-content-start py-1 border-top align-items-center'>
                                      <img className="mb-2" width={64} height={64} src={why_collaborative_marketing_logo} />
                                      <Link to='/about-us/why-collaborative-marketing/' className="text-uppercase font-22px-res text-center text-blue hover-black">WHY COLLABORATIVE MARKETING?</Link>
                                      <Link to='/about-us/why-collaborative-marketing/' className="text-blue hover-blue">Learn More <IoIosArrowForward /></Link>
                                    </Col>
                                    <Col sm={12} className='d-flex flex-column justify-content-start py-1 border-top align-items-center'>
                                      <img className="mb-2" width={64} height={64} src={logo4} />
                                      <Link to='/about-us/vision-&-mission-statement/' className="text-uppercase font-22px-res text-center text-blue hover-black">VISION & MISSION </Link>
                                      <Link to='/about-us/vision-&-mission-statement/' className="text-blue hover-blue">Learn More <IoIosArrowForward /></Link>
                                    </Col>
                                  </Row>
                                </Container>
                              </AccordionBody>
                            </AccordionItem>
                            <AccordionItem>
                              <AccordionHeader targetId="2"><div className='py-3 text-dark font-13px-st letter-spacing-1'>Products</div></AccordionHeader>
                              <AccordionBody accordionId="2">
                                <Container>
                                  <Row>
                                    <Col sm={12} className='d-flex flex-column justify-content-start py-1 bordert-top align-items-center'>
                                      <img className="mb-2" width={64} height={64} src={logo2} />
                                      <Link to='/products/infiniti/' className="text-uppercase font-22px-res text-center text-blue hover-black">INFINITI</Link>
                                      <Link to='/products/infiniti/' className="text-blue hover-blue">Learn More <IoIosArrowForward /></Link>
                                    </Col>
                                    <Col sm={12} className='d-flex flex-column justify-content-start py-1 bordert-top align-items-center'>
                                      <img className="mb-2" width={64} height={64} src={`${xircls_url}images/website-slide/why-collaborative-marketing/why_collaborative_marketing_logo.png`} />
                                      <Link to='/products/semperfi/' className="text-uppercase font-22px-res text-center text-blue hover-black">SEMPER FI</Link>
                                      <Link to='/products/semperfi/' className="text-blue hover-blue">Learn More <IoIosArrowForward /></Link>
                                    </Col>
                                    <Col sm={12} className='d-flex flex-column justify-content-start py-1 bordert-top align-items-center'>
                                      <img className="mb-2" width={64} height={64} src={logo4} />
                                      <Link to='/products/sniper/' className="text-uppercase font-22px-res text-center text-blue hover-black">SNIPER</Link>
                                      <Link to='/products/sniper/' className="text-blue hover-blue">Learn More <IoIosArrowForward /></Link>
                                    </Col>
                                  </Row>
                                </Container>
                              </AccordionBody>
                            </AccordionItem>
                          </Accordion>
                        </div>
                        <Link className='border-bottom py-3 px-1 w-100 text-dark font-13px-st letter-spacing-1' to='/blog/'>Blog</Link>
                        <Link className='border-bottom py-3 px-1 w-100 text-dark font-13px-st letter-spacing-1' to='/team/'>Team</Link>
                        
                        {/* <Accordion flush open={open} toggle={toggle}>
                          <AccordionItem>
                            <AccordionHeader targetId="1"><div className='py-3 text-dark font-13px-st letter-spacing-1'>Sign-up</div></AccordionHeader>
                            <AccordionBody accordionId="1">
                              <Container>
                                <Row>
                                  <Col sm={12} className='d-flex flex-column justify-content-start py-1 border-top align-items-center'>
                                    <img className="mb-2" width={64} height={64} src={logo2} />
                                    <Link to='/merchant/signup/' className="text-uppercase font-22px-res text-center text-blue hover-black">Merchant</Link>
                                    <Link to='/merchant/signup/' className="text-blue hover-blue">Sign-up <IoIosArrowForward /></Link>
                                  </Col>
                                  <Col sm={12} className='d-flex flex-column justify-content-start py-1 border-top align-items-center'>
                                    <img className="mb-2" width={64} height={64} src={`${xircls_url}images/website-slide/why-collaborative-marketing/why_collaborative_marketing_logo.png`} />
                                    <Link to='/influencer/waitlist/' className="text-uppercase font-22px-res text-center text-blue hover-black">Influencer</Link>
                                    <Link to='/influencer/waitlist/' className="text-blue hover-blue">Waitlist <IoIosArrowForward /></Link>
                                  </Col>
                                </Row>
                              </Container>
                            </AccordionBody>
                          </AccordionItem>
                          <AccordionItem>
                            <AccordionHeader targetId="2"><div className='py-3 text-dark font-13px-st letter-spacing-1'>Login</div></AccordionHeader>
                            <AccordionBody accordionId="2">
                              <Container>
                                <Row>
                                  <Col sm={12} className='d-flex flex-column justify-content-start py-1 bordert-top align-items-center'>
                                    <img className="mb-2" width={64} height={64} src={logo2} />
                                    <Link to='/merchant/login/' className="text-uppercase font-22px-res text-center text-blue hover-black">Merchant</Link>
                                    <Link to='/merchant/login/' className="text-blue hover-blue">Login <IoIosArrowForward /></Link>
                                  </Col>
                                  <Col sm={12} className='d-flex flex-column justify-content-start py-1 bordert-top align-items-center'>
                                    <img className="mb-2" width={64} height={64} src={`${xircls_url}images/website-slide/why-collaborative-marketing/why_collaborative_marketing_logo.png`} />
                                    <Link to='/employee-login/' className="text-uppercase font-22px-res text-center text-blue hover-black">Employee</Link>
                                    <Link to='/employee-login/' className="text-blue hover-blue">Login <IoIosArrowForward /></Link>
                                  </Col>
                                </Row>
                              </Container>
                            </AccordionBody>
                          </AccordionItem>
                        </Accordion> */}

                        <Link className='border-bottom py-3 px-1 w-100 text-dark font-13px-st letter-spacing-1' to='/merchant/signup/'>Sign-up</Link>
                        <Link className='py-3 px-1 w-100 text-dark font-13px-st letter-spacing-1' to='/merchant/login/'>Login</Link>
                      </div>
                    </AccordionBody>
                  </AccordionItem>
                </Accordion>
              </Col>
            </Row>
          </Container>
        </>
      }

    </>
  )
}

