import { Container, Row, Col } from "reactstrap"
import SignSection from "../../default_components/SignSection"
import Footer from "./base/Footer"
import { useEffect, useState } from "react"
import { baseURL } from "../../assets/auth/jwtService"
import { useNavigate, useParams } from "react-router-dom"
import { validForm } from "../Validator"
import FrontBaseLoader from "../Components/Loader/Loader"
import toast from "react-hot-toast"
import axios from "axios"

const NewPassword = () => {
    const { slug } = useParams()
    const [data, setData] = useState({
        newPassword: "",
        confirm_password: "",
        checkPassword: true
    })
    const navigate = useNavigate()
    const [apiLoader, setApiLoader] = useState(false)

    const inputChangeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const loginButtonHandler = () => {
        console.log('btn')
        const toCheckValue = [
            {
                name: 'newPassword',
                message: 'Please enter your new password',
                type: 'string',
                id: 'newPassword'
            },
            {
                name: 'confirm_password',
                message: 'Please enter your confirm password',
                type: 'string',
                id: 'confirm_password'
            }
        ]

        // resetPasswordMail: "/api/v1/send_forgot_password/",
                // password_reset_confirm: "/api/v1/password_reset/",
                // confirm_repassword: "/api/v1/password_reset_confirm/",
                // contactUs: "merchant/api/contact_us/"
        const check = validForm(toCheckValue, data)
        if (data.checkPassword && check) {
            setApiLoader(true)
            const form_data = new FormData()
            form_data.append('uid', slug.split("-")[0])
            form_data.append('token', `${slug.split("-")[1]}-${slug.split("-")[2]}`)
            form_data.append('new_password1', data.newPassword)
            form_data.append('new_password2', data.confirm_password)
            form_data.append('change_password', "CHANGE PASSWORD")
            // postReq('confirm_repassword', form_data)
            axios.post(`${baseURL}/api/v1/password_reset_confirm/`, form_data)
            .then((resp) => {
                console.log(resp)
                setApiLoader(false)
                toast.success('Password change successful')
                navigate('/merchant/login/')
            })
            .catch((error) => {
                console.log(error)
                setApiLoader(false)
            })
        }
    }

    useEffect(() => {
        if (data.newPassword !== "" || data.confirm_password !== "") {
            if (data.confirm_password === "") {
    
            } else {
                if (data.newPassword !== data.confirm_password) {
                    // checkPassword = false
                    setData({...data, checkPassword: false})
                    document.getElementById('confirm_password_val').innerHTML = "Passwords don't match"
                    // setShowError(true)
                } else {
                    document.getElementById('confirm_password_val').innerHTML = ""
                    // checkPassword = true
                    setData({...data, checkPassword: true})

                }
            }
        }
    }, [data.newPassword, data.confirm_password])

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
                                <h3 id="check_login" className="third-font text-center font-three mb-2">RESET PASSWORD</h3>
                            </div>
                            <hr />
                            <div className="mb-2 mt-2">
                                <label className="font-three form-label" htmlFor="">New Password:</label>
                                <input type="text" className="w- form-control" name="newPassword" id="" placeholder="New Password" value={data.newPassword} onChange={(e) => inputChangeHandler(e)} />
                                <p id="newPassword_val" className="text-danger m-0 p-0 vaildMessage"></p>
                            </div>
                            <div className="mb-2 mt-2">
                                <label className="font-three form-label" htmlFor="">Confirm Password:</label>
                                <input type="text" className="w- form-control" name="confirm_password" id="" placeholder="New Password" value={data.confirm_password} onChange={(e) => inputChangeHandler(e)} />
                                <p id="confirm_password_val" className="text-danger m-0 p-0 vaildMessage"></p>
                            </div>
                            <div>
                                <button type="button" className="btn bg-black text-white me-1 form-btn" onClick={() => loginButtonHandler()}>CHANGE PASSWORD</button>
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

export default NewPassword