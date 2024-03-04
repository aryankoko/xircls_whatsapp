import { Container, Row, Col } from "reactstrap"
import SignSection from "../../default_components/SignSection"
import Footer from "./base/Footer"
import { useState } from "react"
// import { postReq } from "../../assets/auth/jwtService"
import toast from "react-hot-toast"
import FrontBaseLoader from "../Components/Loader/Loader"
import axios from "axios"
import { baseURL } from "../../assets/auth/jwtService"

const ResetPassword = () => {

    const [email, setEmail] = useState('')
    const [apiLoader, setApiLoader] = useState(false)

    const loginButtonHandler = () => {
        
        console.log('btn')
        document.getElementById('email_val').innerHTML = ''
        if (email) {
            setApiLoader(true)
            const form_data = new FormData()
            form_data.append('email_id', email)
            axios.post(`${baseURL}/api/v1/send_forgot_password/`, form_data)
            .then((resp) => {
                console.log(resp)
                if (resp.data.NoUserExist === "0") {

                    const form_data = new FormData()
                    form_data.append('email', email)
                    form_data.append('passwordResetPage', "SEND EMAIL")
                    axios.post(`${baseURL}/api/v1/password_reset/`, form_data)
                    .then((resp) => {
                        console.log(resp)
                        toast.success('Please check your inbox.')
                        setApiLoader(false)

                    })
                    .catch((error) => {
                        console.log(error)
                        setApiLoader(false)

                    })
                } else {
                    setApiLoader(false)
                    toast.error("User not found")
                }
            })
            .catch((error) => {
                setApiLoader(false)
                console.log(error)
            })

        } else {
            document.getElementById('email_val').innerHTML = 'Please enter your registered email.'
        }
    }

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
                                <label className="font-three form-label" htmlFor="">Reset Password:</label>
                                <input type="text" className="w- form-control" name="email" id=""
                                onKeyDown={e => {
                                    if (e.key === "Enter") {
                                        loginButtonHandler()
                                    }
                                }} placeholder="Enter registered email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <p id="email_val" className="text-danger m-0 p-0 vaildMessage"></p>
                            </div>
                            <div>
                                <button type="button" className="btn bg-black text-white me-1 form-btn" onClick={() => loginButtonHandler()}>SEND EMAIL</button>
                            </div>
                            <div>
                                <h4 className="my-2">Reset your password</h4>
                                <p>Enter the email address you used to sign up to receive a password reset link in your inbox. Click on the link and follow instructions to reset your password in a flash!</p>
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

export default ResetPassword