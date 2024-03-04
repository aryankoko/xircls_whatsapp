import { Container, Row, Col } from "reactstrap"
import { AiFillCaretRight } from 'react-icons/ai'
import Footer from "./base/Footer"
import SignSection from "../../default_components/SignSection"

const Privacy = () => {
    return (
        <div className="products">
            <Container >
                <Row className="mt-5 mb-3">
                    <Col md={12}>
                        <h1 className="text-dark main-font mb-2">Privacy Policy</h1>
                        <h6 className="text-dark sixth-font">
                            XIRCLS is committed to protecting the privacy of visitors to this site. While it is necessary for us to collect certain personal information, we respect and protect your right to privacy as set forth in this Privacy Policy. This Privacy Policy applies to the Site. This Privacy Policy does not apply to other websites to which we link. You agree that your use of the Site signifies your assent to this Privacy Policy. If you do not agree with this Privacy Policy, please do not use the Site.
                        </h6>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col md={12}>
                        <h2 className="text-dark second-font mb-2">Information Collected</h2>
                        <h6 className="text-dark sixth-font">
                            To access this Site and its Services, you must first complete the registration process. During the registration process, we collect personal information such as your name, email address, phone number etc. Once you complete and submit your registration, you have opted in to receive email communication from us.
                        </h6>
                        <h6 className="text-dark sixth-font">
                            We also collect personal information when you choose to use certain other features of the Site, such as making purchases or electing to receive text messages about upcoming products or other information. When you choose to use these additional features, we require you to provide additional personal information such as your phone number, billing and shipping addresses and credit card information, and we may request additional personal information such as your preferences and demographics.
                        </h6>
                        <h6 className="text-dark sixth-font">
                            The Site also makes use of a technology designed to enhance your browsing experience and to provide aggregate non-personally identifiable information about the use of the Site to us. www.xircls.com and its Partners and Payment Gateway is backed by a safe and secure system and at no time stores or divulges to any other sources, any personal information relating to Credit cards / debit cards / bank details.
                        </h6>
                        <h6 className="text-dark sixth-font">
                            Whenever you change or access your account information, we offer the use of a secure server. Once your information is in our possession, we adhere to strict security guidelines, protecting it against unauthorized access.
                        </h6>
                        <h6 className="text-dark sixth-font">
                            Other than when required for payment through xircls.com, please do not disclose personal information such as Credit Card/Debit Card numbers, CVV numbers, bank details etc. to our employees or any other representatives. Maintaining your security and confidentiality is our priority.
                        </h6>
                        <h6><br /></h6>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={12}>
                        <h3 className="text-dark third-font">Use and Disclosure of Information</h3>
                        <h6 className="text-dark sixth-font">
                            We use the information we collect to process your purchase transactions, to send you marketing and promotional materials by email or SMS, and to help us improve our Site and online product assortments and services for you.
                        </h6>
                        <h6 className="sixth-font fw-bolder ">We will never provide information we collect to any third parties. </h6>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={12}>
                        <h3 className="text-dark third-font">How Can I Access, Correct and Update Personal Information?</h3>
                        <h6 className="text-dark sixth-font">
                            You can access, correct and update certain personal information that you have provided to us by clicking on <span style={{ color: 'blue' }}>"Edit "</span> within the <span style={{ color: 'blue' }}>"Account"</span> area of this Website.
                        </h6>
                    </Col>
                </Row>
                <Row className="mb-5">
                    <Col md={12}>
                        <h3 className="text-dark third-font">Privacy Policy Changes</h3>
                        <h6 className="text-dark sixth-font">
                            If we decide to change our Privacy Policy for the Site, we will post the revised Privacy Policy here so that you will always know what information we gather and how we might use that information. Your continued use of the Site indicates your assent to the Privacy Policy as posted.
                        </h6>
                        <h6><br /></h6>
                    </Col>
                </Row>
            </Container>
            <SignSection />
            <Footer />
        </div>
    )
}

export default Privacy