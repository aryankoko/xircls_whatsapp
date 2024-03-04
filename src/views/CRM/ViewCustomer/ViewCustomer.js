import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Row, Col, Card, CardBody, Label, Input, Button, CardHeader } from 'reactstrap'
import ViewCustomerNav from './ViewCustomerNav'
import CustomerDetails from './components/CustomerDetails'
import BasicsDetails from './components/BasicsDetails'
import VehicleDetails from './components/VehicleDetails'
import FinanceDetails from './components/FinanceDetails'
import { postReq } from '../../../assets/auth/jwtService'
import InsuranceDetails from './components/InsuranceDetails'
import ServicingDetails from './ServicingDetails'
import Call from './components/Call'

/* eslint-disable */
const ViewCustomer = () => {
    const { id } = useParams()
    const [currentStep, setCurrentStep] = useState(1)
    const [vehicalData, setVehicalData] = useState([])
    const [userData, setUserData] = useState({})

    const NavCurrentStep = (step) => {
        setCurrentStep(step)
    }

    const getUser = () => {
        const form_data = new FormData()
        form_data.append("id", id)
        form_data.append("edit_type", "is_customer_detail")
        // axios.post(`${crmURL}/customers/merchant/get_view_customer/`, form_data)
        postReq('get_view_customer', form_data)
        .then((res) => {
            console.log(res, "ppppp")
            console.log("123", res.data.success[0])
            setUserData(res.data.success[0])
            console.log("vehicle_data", res.data.vehicle_data)
            setVehicalData(res.data.vehicle_data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <>
            <Card>
                <CardBody>
                    <h4>Customer profile</h4>
                </CardBody>
            </Card>

            <Card>
                <CardBody>
                    <ViewCustomerNav currentStep={currentStep} NavCurrentStep={NavCurrentStep} />
                </CardBody>
            </Card>

            <div>
                {currentStep === 1 && <CustomerDetails userData={userData} />}
                {currentStep === 2 && <BasicsDetails getUser={getUser} />}
                {currentStep === 3 && <VehicleDetails />}
                {currentStep === 4 && <FinanceDetails />}
                {currentStep === 5 && <InsuranceDetails />}
                {currentStep === 6 && <ServicingDetails />}
                {currentStep === 7 && <Call userData={userData} />}
            </div>
        </>
    )
}

export default ViewCustomer