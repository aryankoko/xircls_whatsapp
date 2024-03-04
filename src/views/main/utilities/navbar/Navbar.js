import { useEffect, useState } from 'react'
import { AiOutlineMenu } from "react-icons/ai"
import { BsCodeSquare, BsReverseLayoutTextSidebarReverse } from "react-icons/bs"
import { IoIosArrowDown } from "react-icons/io"
import { PiCodeBlockLight } from "react-icons/pi"
import { TfiTarget } from "react-icons/tfi"
import { TiFlashOutline } from "react-icons/ti"
import { VscTarget } from "react-icons/vsc"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import "../../mainCustome.scss"
import logo from "../logo.png"
import "./navbar.scss"
import SuperLeadzLogo from "@src/assets/images/website-slide/FrontBase/user.png"
import infiniti from "@src/assets/images/website-slide/FrontBase/infinity.png"
import gift from "@src/assets/images/website-slide/FrontBase/gift.png"
import workgroup from "@src/assets/images/website-slide/FrontBase/workgroup.png"
import { getToken } from '../../../../assets/auth/auth'


export const productList = [
  {
    title: "SuperLeadz",
    desc: "Lead Generation  ",
    logo: <img src={SuperLeadzLogo} alt='SuperLeadz_logo' />,
    link: "/products/superleadz/"
  },
  {
    title: "Infiniti",
    desc: "Customer Acquisition & Loyalty",
    logo: <img src={infiniti} alt='infiniti_logo' />,
    link: "/products/infiniti/"
  },
  {
    title: "Semper fi",
    desc: "Customer Loyalty",
    logo: <img src={gift} alt='gift_logo' />,
    link: "/products/semperfi/"
  },
  {
    title: "Sniper",
    desc: "Customer Acquisition",
    logo: <TfiTarget size={20} color='' className='text-dark' />,
    link: "/products/sniper/"
  }

]

export const aboutList = [
  {
    title: "Why XIRCLS?",
    desc: "Democratizing Martech for Sustainable Growth.",
    logo: <VscTarget size={25} color='' className='text-dark' />,
    link: "/about-us/why-XIRCLS"
  },
  {
    title: "Why Collaborative Marketing?",
    desc: "Because Life is Collaboration, Not Competition.",
    logo: <img src={workgroup} alt='why_collaborative_marketing_logo' />,
    link: "/about-us/why-collaborative-marketing/"

  },
  {
    title: "Vision & Mission",
    desc: "To Empower Businesses, Globally",
    logo: <TiFlashOutline size={23} color='' className='text-dark' />,
    link: "/about-us/vision-&-mission-statement/"

  }

]

const Navbar = ({ position }) => {
  const { pathname } = useLocation()
  const [ShowProducts, setShowProducts] = useState(false)
  const [ShowCompany, setShowCompany] = useState(false)

  const [toggleMenu, setToggleMenu] = useState(true)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      const Yscroll = window.scrollY
      const first_navbar = document.getElementById("first_navbar")
      if (first_navbar) {
        if (Yscroll > 50) {
          first_navbar.style.boxShadow = " 0 0px 8px rgba(0,0,0,0.16)"
        } else {
          first_navbar.style.boxShadow = " none"

        }
      }
    })
  }, [])

  useEffect(() => {
    setToggleMenu(true)
  }, [pathname])


  const width = window.innerWidth
  const positionCal = () => {
    if (width > 1000) {
      return position
    }
    if (width < 1000) {
      return 'notFixed'
    }
  }
  const isFixed = positionCal()
  // console.log(isFixed)


  function mouseEnter(name) {
    if (width > 1000) {
      if (name === "products") {
        setShowProducts(true)
      }
      if (name === "company") {
        setShowCompany(true)
      }
    }
  }

  function mouseLeave(name) {
    if (width > 1000) {
      if (name === "products") {
        setShowProducts(false)
      }
      if (name === "company") {
        setShowCompany(false)
      }
    }
  }
  function mouseClick(name) {
    if (name === "products") {
      setShowProducts(!ShowProducts)
      setShowCompany(false)

    }
    if (name === "company") {
      setShowCompany(!ShowCompany)
      setShowProducts(false)

    }
  }

  const navigate = useNavigate()

  const checkLogin = async () => {
    const token = await getToken() ? JSON.parse(getToken()) : null
    if (token) {
      navigate("/merchant/apps/")
    } else {
      navigate("/merchant/login/")
    }
  }

  return (
    <div className={`Container-subNav border-bottom py-1 py-md-0 bg-white  position-${isFixed === "notFixed" ? "relative" : "fixed"}  `} id="first_navbar" style={{ zIndex: "999", marginTop: '-5px', paddingBottom: "11px" }}>
      <div className=' justify-content-center bg-white m-0 p-0'>
        <nav className={`homeNav  `}>
          <Link to="/">
            <img src={logo} alt="logo" className='mx-2 nav_logo_img' />
          </Link>

          <div className={`toggleMenu py-2 ${toggleMenu ? "toggleMenuUp" : "toggleMenuDown"}`} >
            <ul className=' list-unstyled d-inline-flex gap-5 pt-1'>

              <li className='productLi ItemsList' onClick={() => mouseClick("products")} onMouseEnter={() => mouseEnter("products")} onMouseLeave={() => mouseLeave("products")}>
                <h4 className='navTitle fs-4 text-dark'  >Products <IoIosArrowDown color="#9e9e9eff" className={ShowProducts ? "rotate-180" : ""} /></h4>
                <div className={`subMenu ${ShowProducts ? "productSubMenuDown" : "productSubMenuUp"} p-1 ps-3 pt-0 border border-1 rounded-3 px-md-3`}>
                  <ul className=' list-unstyled '>
                    {
                      productList.map((ele, index) => (
                        <li key={index} className='mt-1 hoverItems' style={{ padding: "5px 5px" }} >
                          <Link to={ele.link}>
                            <div className=' d-flex   align-items-center gap-2' style={{ marginBottom: "5px" }}>
                              <div className='nav-list-logo d-flex align-items-center justify-content-center  rounded-circle' >
                                {ele.logo}
                              </div>
                              <div className='d-flex flex-column justify-content-center accordion text-start w-100 '>
                                <h4 className='subtitle text-capitalize text-black fw-bolder  ' >{ele.title}</h4>
                                <p className='subdesc text-dark fw-bold fs-6 ' > {ele.desc}</p>
                              </div>
                            </div>
                          </Link>
                        </li>
                      ))
                    }
                  </ul>
                </div>
              </li>
              <Link to='/partners' className='navTitle fs-4 text-dark text-center' > <li ><p>Partners</p></li></Link>
              {/* <Link to='/developers' className='fs-4 text-dark text-center'> <li ><p>Developers</p></li></Link> */}
              <Link to='/blog' className='navTitle fs-4 text-dark text-center' > <li ><p>Blog</p></li></Link>

              <li className='aboutLi ItemsList' onClick={() => mouseClick("company")} onMouseEnter={() => mouseEnter("company")} onMouseLeave={() => mouseLeave("company")}>
                <p className='navTitle text-dark fs-4 '>Company <IoIosArrowDown color="#9e9e9eff" className={ShowCompany ? "rotate-180" : ""} /></p>
                <div className={`subMenu  ${ShowCompany ? "aboutSubMenuDown" : "aboutSubMenuUp"} p-1 ps-3 pt-0 border border-1 rounded-3 px-md-3`}>
                  <ul className=' list-unstyled'>
                    {
                      aboutList.map((ele, index) => (
                        <li key={index} className='mt-1 hoverItems' style={{ padding: "5px 5px" }} >
                          <Link to={ele.link}>
                            <div className=' d-flex   align-items-center gap-2' style={{ marginBottom: "5px" }}>
                              <div className='nav-list-logo d-flex align-items-center justify-content-center  rounded-circle' >
                                {ele.logo}
                              </div>
                              <div className='d-flex flex-column justify-content-center accordion text-start w-100 '>
                                <h4 className='subtitle text-capitalize text-black fw-bolder  ' >{ele.title}</h4>
                                <p className='subdesc text-dark fw-bold fs-6 ' > {ele.desc}</p>
                              </div>
                            </div>
                          </Link>
                        </li>
                      ))
                    }
                  </ul>
                </div>
              </li>

            </ul>
            <div className='navBtn gap-1'>
              <Link  to='/merchant/signup' className=' btn  btn-lg main-btn-blue-gra  fs-3 fw-lig cust-font'>Signup Free</Link>

              <a onClick={() => checkLogin()} className=' btn btn-lg main-btn-dark fs-3 fw-lig cust-font'>Login</a>
            </div>
          </div>
          <div className='menuBtn' onClick={() => { setToggleMenu(!toggleMenu); setShowProducts(false); setShowCompany(false) }}>
            <AiOutlineMenu size={25} />
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Navbar