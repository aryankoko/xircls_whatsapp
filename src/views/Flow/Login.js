import { Container, Row, Col } from "reactstrap"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { postReq } from "../../assets/auth/jwtService"
import { setToken } from "../../assets/auth/auth"
import toast from "react-hot-toast"
import { validateEmail } from "../Validator"

const FlowLogin = () => { 
    const [showError, setShowError] = useState(false)
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate() 

    const inputChangeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

  console.log(data)

  const loginButtonHandler = () => {
    if (data.email === "" || data.password === "") {
      setShowError(true)
    } else {
        const emailCheck = validateEmail(data.email)
        console.log("pp")
        if (!emailCheck) {
            toast.error("Invaild email ID")
        } else {
            setShowError(false)
            const formData = new FormData()
            Object.entries(data).map(([key, value]) => formData.append(key, value))
            postReq("login", formData)
            .then((res) => {
                console.log(res.data)
                const tokenValue = JSON.stringify(res.data.token)
                setToken(tokenValue)
                
                if (res.status === 200 && tokenValue) {
                    toast.success('Logned In Successfully')
                    const data = res.data.merchant_flow
                    if (!data.mode_type) {
                        navigate("/new_signup/new_mode/")
                    } else if (!data.product_selection) {
                        navigate('/select_product/')
                    } else if (!data.plan_pricing) {
                        navigate("/plan_pricing/1/")
                    } else if (!data.outlet_creation) {
                        navigate("/outlet_details/")
                    } else if (!data.offer_creation) {
                        navigate("/create_offer/")
                    } else {
                        navigate("/merchant/dashboard/")
                    }

                }
            })
            .catch((err) => {
                toast.error(err.message)
                console.log(err)
            })

        }
    }
  }

    return (
        <Row className="products" style={{height: '100vh'}}>
            <Col md={6} className='m-auto' style={{width: '665px', maxWidth: '90%'}}>
                <div className="border p-3">
                    <div>
                        <h3 id="check_login" className="third-font text-center font-three mb-2">Login</h3>
                    </div>
                    <hr />
                    <div className="mb-2 mt-2">
                        <label className="font-three form-label" htmlFor="">USERNAME:</label>
                        <input type="text" className="w- form-control" name="email" id="" onChange={(e) => inputChangeHandler(e)} />
                        {showError && data.email === "" ? (
                            <p
                            className="text-danger m-0 p-0"
                            style={{ fontSize: "0.9rem" }}
                            >
                            Enter your email address
                            </p>
                        ) : ""}
                    </div>
                    <div className="mb-3">
                        <label className="font-three form-label" htmlFor="">PASSWORD:</label>
                        <input type="password" className="w- form-control" name="password" id="" onChange={(e) => inputChangeHandler(e)} />
                        {showError && data.password === "" ? (
                            <p
                            className="text-danger m-0 p-0 mb-3"
                            style={{ fontSize: "0.9rem" }}
                            >
                            Enter your password
                            </p>
                        ) : ""}
                    </div>
                    <div>
                        <button type="button" className="btn bg-black text-white me-1 form-btn" onClick={() => loginButtonHandler()}>LOGIN</button>
                        {/* <a href="" className="text-blue" >Forgotten Password?</a> */}
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default FlowLogin