import { Container, Row, Col, Card, CardBody, Label, Input, Button, CardHeader } from 'reactstrap'

const ViewCustomerNav = ({ NavCurrentStep, currentStep }) => {
    const stepNames = [
        'Customer Details', 'Basic Details', 'Vehicle Details',
        'Finance Details', 'Insurance Details', 'Servicing Details', 'Call'
    ]
    return (
        <>
            <style>
                {`
                .active-unique {
                    border-bottom: 2px solid blue;
                    border-radius: 0px !important;
                    border-image: linear-gradient(to right, #464646, #464646);
                    border-image-slice: 1;
                    background-image: linear-gradient(to right, #464646, #a4a4ff);
                    background-clip: text;
                    -webkit-background-clip: text;
                    color: #464646;
                }
                `}
            </style>
            <div className="customer-basic-details">
                <Row className=''>
                    <Col className='d-flex justify-content-start gap-3 flex-wrap ' md='12'>
                        {stepNames.map((step, index) => (
                            <div className='d-flex justify-content-between'>
                                <div
                                    key={index}
                                    className={`cursor-pointer d-flex justify-content-center align-items-center p-custom ${currentStep === index + 1 ? 'active-unique' : 'rounded-2 text-secondary'}`}
                                    onClick={() => NavCurrentStep(index + 1)}
                                    style={{ width: "fit-content" }}
                                >
                                    <span style={{ fontWeight: "450" }}>{step}</span>
                                </div>
                            </div>
                        ))}
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default ViewCustomerNav