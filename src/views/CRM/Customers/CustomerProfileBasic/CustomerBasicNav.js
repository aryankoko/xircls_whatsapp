import { Info, Share2, User } from "react-feather"
import { Row, Col } from "reactstrap"

const CustomerBasicNav = ({currentStep, NavCurrentStep}) => {
    return (
        <>
            <Row className="customer-basic-details  ">
                <Col xs={6} md={3} xl={2} className={`d-flex align-items-center m-auto justify-content-center border-0 rounded btn ${currentStep === 1 ? 'active btn-primary' : ''}`} onClick={() => NavCurrentStep(1)}><User size={18} style={{paddingRight:'5px'}}/>Basic</Col>
                <Col xs={6} md={3} xl={2} className={`d-flex align-items-center m-auto justify-content-center border-0 rounded btn ${currentStep === 2 ? 'active btn-primary' : ''}`} onClick={() => NavCurrentStep(2)}><User size={18} style={{paddingRight:'5px'}}/>Personal</Col>
                <Col xs={6} md={3} xl={2} className={`d-flex align-items-center m-auto justify-content-center border-0 rounded btn ${currentStep === 3 ? 'active btn-primary' : ''}`} onClick={() => NavCurrentStep(3)}><User size={18} style={{paddingRight:'5px'}}/>Identity Proof</Col>
                <Col xs={6} md={3} xl={2} className={`d-flex align-items-center m-auto justify-content-center border-0 rounded btn ${currentStep === 4 ? 'active btn-primary' : ''}`} onClick={() => NavCurrentStep(4)}><Share2 size={18} style={{paddingRight:'5px'}}/>Address</Col>
                <Col xs={6} md={3} xl={2} className={`d-flex align-items-center m-auto justify-content-center border-0 rounded btn ${currentStep === 5 ? 'active btn-primary' : ''}`} onClick={() => NavCurrentStep(5)}><Info size={18} style={{paddingRight:'5px'}}/>Company</Col>
                {/* <Col xs={6} md={3} xl={2} className={`d-flex align-items-center m-auto justify-content-center border-0 rounded btn ${currentStep === 6 ? 'active btn-primary' : ''}`} onClick={() => NavCurrentStep(6)}><User size={18} style={{paddingRight:'5px'}}/>Account</Col> */}
            </Row>
        </>
    )
}

export default CustomerBasicNav