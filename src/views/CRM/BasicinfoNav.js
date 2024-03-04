import { User, Share2, Info } from 'react-feather'
import { Container, Row, Col, Card, CardBody, Label, Input, Button, CardHeader } from 'reactstrap'

const BasicinfoNav = ({ NavCurrentStep, currentStep }) => {
    // const stepNames = [
    //     'Basic Information', 'Personal Information', 'Identity Proof Information', 'Address',
    //     'Company Information', 'Account'
    // ]

    const stepNames = [
        {
            name: "Basic Information",
            icon: <User size='15px' />
        },
        {
            name: "Personal Information",
            icon: <User size='15px' />
        },
        {
            name: "Identity Proof Information",
            icon: <User size='15px' />
        },
        {
            name: "Address",
            icon: <Share2 size='15px' />
        },
        {
            name: "Company Information",
            icon: <Info size='15px' />
        }
    ]
    return (
        <>
            <style>
                {`
                `}
            </style>
            <div className="customer-basic-details">
                <Row className=''>
                    <Col className='d-flex justify-content-start gap-3 flex-wrap ' md='12'>
                        {stepNames.map((step, index) => (
                            <div className='d-flex justify-content-between' key={index}>
                                <div
                                    className={`cursor-pointer d-flex justify-content-center align-items-center gap-1 p-custom ${currentStep === index + 1 ? 'border-0 rounded btn btn-primary active' : 'rounded-2 text-secondary'}`}
                                    onClick={() => NavCurrentStep(index + 1)}
                                    style={{ width: "fit-content" }}
                                >
                                    <span>{step.icon}</span>
                                    <span style={{ fontWeight: "450" }}>{step.name}</span>
                                </div>
                            </div>
                        ))}
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default BasicinfoNav