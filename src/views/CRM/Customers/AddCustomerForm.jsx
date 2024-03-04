import axios from 'axios'
import React, { useState } from 'react'
import { Col, Row } from 'reactstrap'
import { crmURL } from '../../../assets/auth/jwtService'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import FrontBaseLoader from '../../Components/Loader/Loader'
import codeSkin from "@src/assets/images/website-slide/codeSkin.jpg"

const AddCustomerForm = () => {
    const [details, setDetails] = useState({
        first_name: "",
        last_name: "",
        email: "",
        mobile: ""
    })

    const navigate = useNavigate()
    const [apiLoader, setApiLoader] = useState(false)

    // const [formID, setFormID] = useState("")
    const urlParams = new URLSearchParams(location.search)

    const handleInputChange = (e) => {
        setDetails({...details, [e.target.name]: e.target.value})
    }

    const submitForm = (e) => {
        e.preventDefault()
        setApiLoader(true)
        const arr = new Array()
        const form_data = new FormData()
        const url = new URL(`${crmURL}/Customers/quick-add-customer/`)
        Object.entries(details)?.map(([key, value]) => {
            if (value === "") {
                arr.push(key)
            }
            form_data.append(key, value)
        })

        form_data.append("formID", urlParams.get("formID"))
        console.log(arr)
        if (arr.length <= 0) {
            axios({
                method: "POST",
                data: form_data,
                url
            })
            .then((resp) => {
                console.log(resp)
                setApiLoader(false)
                navigate("/merchant/thank_you_page/")
                // toast.success("Thank you for submitting the form")
            })
            .catch((error) => {
                setApiLoader(false)
                toast.error("Something went wrong!")
                console.log(error)
            })
        } else {
            setApiLoader(false)
            toast.error("Please fill all the fields")
        }
    }

    // useEffect(() => {
        
    //     const params = urlParams.get("formID")
    //     setFormID(params)
    // }, [])

    return (
        <div>
            <style>
                {`
                    input::-webkit-outer-spin-button,
                    input::-webkit-inner-spin-button {
                        -webkit-appearance: none;
                        margin: 0;
                    }
                   input[type=number]{
                    -moz-appearance: textfield;
                }
                `}
            </style>
            {
                apiLoader ? <FrontBaseLoader /> : ''
            }
            <Row className="products" style={{height: '100vh', overflow: 'auto'}}>
                <Col md={6} className='m-auto' style={{ width: '665px', maxWidth: '90%' }}>
                    <div className="border p-2">
                        <div>
                            <div className="img mb-2" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <img src={codeSkin} width={'250px'} alt="" />
                            </div>
                            <h3 id="check_login" className="third-font text-center font-three mb-2">Customer Details</h3>
                        </div>
                        <hr />
                        <div className="my-1">
                            <label className="font-three form-label" htmlFor="first_name">First Name:</label>
                            <input onChange={handleInputChange} value={details?.first_name} type="text" className="w- form-control" name="first_name" id="first_name" />
                        </div>
                        <div className="mb-1">
                            <label className="font-three form-label" htmlFor="last_name">Last Name:</label>
                            <input onChange={handleInputChange} value={details?.last_name} type="text" className="w- form-control" name="last_name" id="last_name" />
                        </div>
                        <div className="mb-1">
                            <label className="font-three form-label" htmlFor="email">Email:</label>
                            <input onChange={handleInputChange} value={details?.email} type="text" className="w- form-control" name="email" id="email" />
                        </div>
                        <div className="mb-1">
                            <label className="font-three form-label" htmlFor="mobile">Mobile Number:</label>
                            <input onChange={(e) => {
                                console.log(isNaN(e.target.value))
                                if (!isNaN(e.target.value)) {
                                    handleInputChange(e)
                                } else {
                                    console.log("ppp")
                                }
                            }} value={details?.mobile} type="text" className="w- form-control" name="mobile" id="mobile" />
                        </div>
                        <div>
                            <button onClick={submitForm} type="button" className="btn bg-black text-white me-1 form-btn">Submit</button>
                            {/* <a href="" className="text-blue" >Forgotten Password?</a> */}
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default AddCustomerForm