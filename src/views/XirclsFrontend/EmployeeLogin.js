import { Container, Row, Col } from "reactstrap"
import SignSection from "../../default_components/SignSection"
import Footer from "./base/Footer"
import { useContext, useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import $ from "jquery"
import { postReq } from "../../assets/auth/jwtService"
import { setToken } from "../../assets/auth/auth"
import toast from "react-hot-toast"
import { affiliateTracking, validForm, validateEmail } from "../Validator"
import { PermissionProvider } from "../../Helper/Context"
import FrontBaseLoader from "../Components/Loader/Loader"
import countries from "../NewFrontBase/Country"

const Emplogin = () => {
    // const [showError, setShowError] = useState(false)
    const valueToCheck = [
        {
            name: 'email',
            message: 'Enter your email address',
            type: 'string',
            id: 'email'
        },
        {
            name: 'password',
            message: 'Enter your password',
            type: 'string',
            id: 'password'
        }
    ]
    const [apiLoader, setApiLoader] = useState(false)
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const { setUserPermission } = useContext(PermissionProvider)

    useEffect(() => {
        if (pathname === "/merchant/login/") {
            $("#check_login").html(`Login to your Account`)
        } else {
            $("#check_login").html(`Employee Login`)
        }
    }, [pathname])

    const inputChangeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const loginButtonHandler = () => {
        
        const checkForm = validForm(valueToCheck, data)
        console.log(checkForm)

        if (checkForm) {
            const emailCheck = validateEmail(data.email)
            if (!emailCheck) {
                toast.error("Invaild email ID")
            } else {
                setApiLoader(true)
                const formData = new FormData()
                Object.entries(data).map(([key, value]) => formData.append(key, value))
                postReq("login", formData)
                .then((res) => {
                    console.log(res)
                    setApiLoader(false)
                    if (res?.data?.errors === "Email not verified yet") {
                        toast.error("Email not verified yet. Please check your inbox")
                    } else {
                        
                        const tokenValue = JSON.stringify(res?.data?.token)
                        const merchantCurrency = countries.filter((curElem) => curElem?.currency?.code === res?.data?.outlet_list[0]?.outlet_currency)
                        setToken(tokenValue)
                        const updatedPermission = {
                            appName: "",
                            multipleDomain: res?.data?.outlet_list ? res?.data?.outlet_list : [],
                            apiKey: res?.data?.outlet_list ? res?.data?.outlet_list[0].api_key : "",
                            installedApps: res?.data?.installed_apps,
                            campagin: res?.data?.status,
                            currencySymbol: merchantCurrency[0]?.currency?.symbol ? merchantCurrency[0]?.currency?.symbol : '₹',
                            permissionList: res?.data?.permission_list,
                            super_user: res?.data?.super_user,
                            is_super_user: res?.data?.is_super_user,
                            multi_user_key: res?.data?.multi_user_key
                        }
                        setUserPermission((curData) => ({
                            ...curData,
                            ...updatedPermission
                        }))
                        
                        toast.success('Logged In Successfully')
                        navigate("/merchant/apps/")
                        
                    }
                })
                .catch((err) => {
                    toast.error('Invaild email or password')
                    setApiLoader(false)
                    console.log(err)
                })
            }
        }
    }

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        if (params.get('aft_no') || localStorage.getItem('aft_no')) {
            affiliateTracking(params.get('aft_no') ? params.get('aft_no') : localStorage.getItem('aft_no'))
        }
    }, [])

    return (
        <div className="products">
            {
                apiLoader ? <FrontBaseLoader /> : ''
            }
            <Container className="mt-5 mb-5">
                <Row>
                    <Col md={6} className='mx-auto px-2'>
                        <div className="border p-3">
                            <div>
                                <h3 id="check_login" className="third-font text-center font-three mb-2"></h3>
                            </div>
                            <hr />
                            <div className="mb-2 mt-2">
                                <label className="font-three form-label" htmlFor="">USERNAME:</label>
                                <input type="text" className="w- form-control" name="email" id=""
                                    onKeyDown={e => {
                                        if (e.key === "Enter") {
                                            const password = document.getElementById("password")
                                            password.focus()
                                        }
                                    }}
                                    onChange={(e) => {
                                        inputChangeHandler(e)
                                    }} />
                                    <p id="email_val" className="text-danger m-0 p-0 vaildMessage"></p>
                                {/* {showError && data.email === "" ? (
                                    <p
                                        className="text-danger m-0 p-0"
                                        style={{ fontSize: "0.9rem" }}
                                    >
                                        Enter your email address
                                    </p>
                                ) : ""} */}
                            </div>
                            <div className="mb-3">
                                <label className="font-three form-label" htmlFor="">PASSWORD:</label>
                                <input type="password" className="w- form-control" name="password" id="password"
                                    onKeyDown={e => {
                                        if (e.key === "Enter") {
                                            loginButtonHandler()
                                        }
                                    }}
                                    onChange={(e) => inputChangeHandler(e)} />
                                    <p id="password_val" className="text-danger m-0 p-0 vaildMessage"></p>
                                {/* {showError && data.password === "" ? (
                                    <p
                                        className="text-danger m-0 p-0 mb-3"
                                        style={{ fontSize: "0.9rem" }}
                                    >
                                        Enter your password
                                    </p>
                                ) : ""} */}
                            </div>
                            <div>
                                <button type="button" className="btn bg-black text-white me-1 form-btn" onClick={() => loginButtonHandler()}>LOGIN</button>
                                <Link to="/password_reset/" className="text-blue">Forgotten Password?</Link>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <SignSection />
            <Footer />
        </div>
    )
}

export default Emplogin