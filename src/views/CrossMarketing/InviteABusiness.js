import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardBody, Row } from 'reactstrap'
import { postReq } from '../../assets/auth/jwtService'
import toast from 'react-hot-toast'

const InviteABusiness = () => {

    const [inputValue, setInputValue] = useState("")

    const navigate = useNavigate()

    const sendMail = () => {
        postReq("sendNetworkMail", {email: inputValue})
        .then((resp) => {
            console.log(resp)
            toast.success(resp.data.message)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <>
            {/* <Card>
                <CardBody>
                    <h4>Invite a Business</h4>
                </CardBody>
            </Card> */}

            <Card>
                <CardBody className='text-center'>
                    <h4>Invite Merchants You Know </h4>
                    <p>Add your associates as Preferred Partners in your cross-marketing campaigns </p>

                    <Row>
                        <div className='col-4 offset-4 d-flex justify-content-center align-items-center gap-2 mb-1'>
                            <input type="text" className='form-control' onChange={(e) => setInputValue(e.target.value)} value={inputValue}/>
                            <a className='btn btn-primary' onClick={() => sendMail()}>Send</a>
                        </div>
                        <p className='text-primary cursor-pointer' onClick={() => navigate("/merchant/dashboard/") }>Do this later</p>
                    </Row>
                </CardBody>
            </Card>
        
        </>
    )
}

export default InviteABusiness