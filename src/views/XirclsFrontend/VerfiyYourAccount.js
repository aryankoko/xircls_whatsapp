import React, { useEffect, useState } from 'react'
import { Card, CardBody, Col, Row } from 'reactstrap'
import xircls_logo from "@src/assets/images/website-slide/xircls_logo.jpg"
import toast from 'react-hot-toast'
import { Link, useParams } from 'react-router-dom'
import { baseURL } from '../../assets/auth/jwtService'
import Spinner from '../Components/DataTable/Spinner'
import axios from 'axios'

const VerfiyYourEmail = () => {
    const { slug } = useParams()
    const [data, setData] = useState({
        data: false,
        isLoading: true
    })
    const verifyEmail = () => {
        const form_data = new FormData()
        form_data.append('activationkey', slug)
        form_data.append('action', "VERIFY")
        const time = new Date().getTime()
// postReq('verifyUserEmail', form_data)
        axios.post(`${baseURL}/merchant/verify-your-email/?time=${time}`, form_data)
        .then((resp) => {
            console.log(resp)
            if (!resp?.data?.data) {
                toast.error(resp?.data?.message)
            } else {
                toast.success(resp?.data?.message)
            }
            const updatedData = {
                data: resp?.data?.data,
                isLoading: false
            }
            setData((preData) => ({
                ...preData,
                ...updatedData
            }))
        })
        .catch((error) => {
            console.log(error)
            setData({...data, isLoading: false})
            toast.error('Link expired')
        })
    }

    const reSent = () => {
        const form_data = new FormData()
        form_data.append('activationkey', slug)
        form_data.append('action', "RESEND")
        const time = new Date().getTime()
        axios.post(`${baseURL}/merchant/verify-your-email/?time=${time}`, form_data)
        // postReq('verifyUserEmail', form_data)
        .then((resp) => {
            console.log(resp)
            toast.success("Please check your inbox for a verification email.")
            // setData(resp?.data?.data)
        })
        .catch((error) => {
            console.log(error)
            toast.error('Account not Found')
        })
    }

    useEffect(() => {
        verifyEmail()
    }, [])

    return (
        <>
            <Row>
                <Col md='12'>
                    <Card>
                        <CardBody>
                            <div className="parent text-center">
                                {

                                    data.isLoading ? (
                                        <div className=''>
                                            <Spinner size={'45px'} />
                                        </div>
                                    ) : (
                                        !data.data ? (
                                            <>
                                                <div>
                                                    <img className='my-2' src={xircls_logo} width={'160px'} alt="logo" />
                                                </div>
                                                <a onClick={() => reSent()} className="btn btn-primary my-2">Resend Link</a>
                                            </>
                                        ) : (
                                            <>
                                                <img className='my-2' src={xircls_logo} width={'160px'} alt="logo" />
                                                <h4>Thank you</h4>
                                                <p>Your email address has been verified.</p>
                                                <Link to="/merchant/login/" className="btn btn-primary my-2">Proceed</Link>
                                            </>
                                        )

                                    )
                                    
                                }
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default VerfiyYourEmail