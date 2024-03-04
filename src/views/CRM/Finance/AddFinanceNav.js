// import { NavLink } from "react-router-dom"
import { Info, Share2, User } from "react-feather"
import { Row, Col } from "reactstrap"

const AddFinanceNav = ({ currentStep, NavCurrentStep }) => {

    return (
        <>
            {/* <div className="customer-basic-details d-flex gap-2 justify-content-evenly ">
                <div className={`cursor-pointer rounded-2 d-flex justify-content-center align-items-center p-custom text-secondary ${currentStep === 1 ? 'active' : ''}`} onClick={() => NavCurrentStep(1)}><User size={20} />Applicant</div>
                <div className={`cursor-pointer rounded-2 d-flex justify-content-center align-items-center p-custom text-secondary ${currentStep === 2 ? 'active' : ''}`} onClick={() => NavCurrentStep(2)}><User size={20} />Co-Applicant</div>
                <div className={`cursor-pointer rounded-2 d-flex justify-content-center align-items-center p-custom text-secondary ${currentStep === 3 ? 'active' : ''}`} onClick={() => NavCurrentStep(3)}><User size={20} />EMI</div>
                <div className={`cursor-pointer rounded-2 d-flex justify-content-center align-items-center p-custom text-secondary ${currentStep === 4 ? 'active' : ''}`} onClick={() => NavCurrentStep(4)}><Share2 size={20} />Referral</div>
            </div> */}
            <Row className="customer-basic-details  ">
                <Col xs={6} md={3} lg={3} className={`border-0 rounded btn ${currentStep === 1 ? 'active btn-primary' : ''}`} onClick={() => NavCurrentStep(1)}><User size={18} style={{ paddingRight: '5px' }} />Applicant</Col>
                <Col xs={6} md={3} lg={3} className={`border-0 rounded btn ${currentStep === 2 ? 'active btn-primary' : ''}`} onClick={() => NavCurrentStep(2)}><User size={18} style={{ paddingRight: '5px' }} />Co-Applicant</Col>
                <Col xs={6} md={3} lg={3} className={`border-0 rounded btn ${currentStep === 3 ? 'active btn-primary' : ''}`} onClick={() => NavCurrentStep(3)}><User size={18} style={{ paddingRight: '5px' }} />EMI</Col>
                <Col xs={6} md={3} lg={3} className={`border-0 rounded btn ${currentStep === 4 ? 'active btn-primary' : ''}`} onClick={() => NavCurrentStep(4)}><Share2 size={18} style={{ paddingRight: '5px' }} />Referral</Col>
            </Row>
        </>
    )
}

export default AddFinanceNav