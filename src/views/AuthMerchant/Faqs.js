import React, { useState } from "react"
import {
  Row,
  Col,
  UncontrolledAccordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody
} from "reactstrap"
import BannerImg from "../../assets/images/auth-merchant/banner.png"
import { faqs } from "../../Helper/data"

const Faqs = () => {
  const [navLink, setNavLink] = useState("Introduction to XIRCL")
  return (
    <>
      <section
        className="card w-100"
        style={{
          backgroundImage: `url(${BannerImg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundColor: "rgba(115, 103, 240, 0.12)",
          padding: "6.5rem"
        }}
      >
        <div className="card-body text-center">
          <h2 className="text-primary">Let's answer some questions</h2>
          <p className="card-text mb-2">
            or choose a category to quickly find the help you need
          </p>
          <form
            className="faq-search-input"
            style={{ margin: "0 auto", width: "40rem" }}
          >
            <div className="input-group input-group-merge">
              <div className="input-group-text">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-search"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Search faq..."
              />              
            </div>
          </form>
        </div>
      </section>
      <section>
        <Row>
          <Col sm={12} md={4} lg={3}>
            <div className="faq-navigation d-flex justify-content-between flex-column mb-2 mb-md-0">
              <ul className="nav nav-pill nav-left flex-column" role="tablist">
                <li
                  className={`nav-item px-2 py-1 ${
                    navLink === "Introduction to XIRCL" &&
                    "bg-primary text-white shadow-lg rounded"
                  }`}
                  style={{ cursor: "pointer" }}
                  onClick={() => setNavLink("Introduction to XIRCL")}
                >
                  <div
                    className="d-flex justify-content-start align-items-center"
                    style={{ gap: "0.5rem" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-message-circle font-medium-3 mr-1"
                    >
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                    <span className="fw-bold">Introduction to XIRCL</span>
                  </div>
                </li>
                <li
                  className={`nav-item px-2 py-1 ${
                    navLink === "Eligibility" &&
                    "bg-primary text-white shadow-lg rounded"
                  }`}
                  style={{ cursor: "pointer" }}
                  onClick={() => setNavLink("Eligibility")}
                >
                  <div
                    className="d-flex justify-content-start align-items-center"
                    style={{ gap: "0.5rem" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-file-text font-medium-3 mr-1"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    <span className="fw-bold">Eligibility</span>
                  </div>
                </li>
                <li
                  className={`nav-item px-2 py-1 ${
                    navLink === "Add Company" &&
                    "bg-primary text-white shadow-lg rounded"
                  }`}
                  style={{ cursor: "pointer" }}
                  onClick={() => setNavLink("Add Company")}
                >
                  <div
                    className="d-flex justify-content-start align-items-center"
                    style={{ gap: "0.5rem" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-plus-circle font-medium-3 mr-1"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="16"></line>
                      <line x1="8" y1="12" x2="16" y2="12"></line>
                    </svg>
                    <span className="fw-bold">Add Company</span>
                  </div>
                </li>
                <li
                  className={`nav-item px-2 py-1 ${
                    navLink === "Create Outlet Profile" &&
                    "bg-primary text-white shadow-lg rounded"
                  }`}
                  style={{ cursor: "pointer" }}
                  onClick={() => setNavLink("Create Outlet Profile")}
                >
                  <div
                    className="d-flex justify-content-start align-items-center"
                    style={{ gap: "0.5rem" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-shopping-cart font-medium-3 mr-1"
                    >
                      <circle cx="9" cy="21" r="1"></circle>
                      <circle cx="20" cy="21" r="1"></circle>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    <span className="fw-bold">Create Outlet Profile</span>
                  </div>
                </li>
                <li
                  className={`nav-item px-2 py-1 ${
                    navLink === "Network" &&
                    "bg-primary text-white shadow-lg rounded"
                  }`}
                  style={{ cursor: "pointer" }}
                  onClick={() => setNavLink("Network")}
                >
                  <div
                    className="d-flex justify-content-start align-items-center"
                    style={{ gap: "0.5rem" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-share-2 font-medium-3 mr-1"
                    >
                      <circle cx="18" cy="5" r="3"></circle>
                      <circle cx="6" cy="12" r="3"></circle>
                      <circle cx="18" cy="19" r="3"></circle>
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                    </svg>
                    <span className="fw-bold">Network</span>
                  </div>
                </li>
                <li
                  className={`nav-item px-2 py-1 ${
                    navLink === "My Customers" &&
                    "bg-primary text-white shadow-lg rounded"
                  }`}
                  style={{ cursor: "pointer" }}
                  onClick={() => setNavLink("My Customers")}
                >
                  <div
                    className="d-flex justify-content-start align-items-center"
                    style={{ gap: "0.5rem" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-user font-medium-3 mr-1"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span className="fw-bold">My Customers</span>
                  </div>
                </li>
                <li
                  className={`nav-item px-2 py-1 ${
                    navLink === "Choose A Strategy" &&
                    "bg-primary text-white shadow-lg rounded"
                  }`}
                  style={{ cursor: "pointer" }}
                  onClick={() => setNavLink("Choose A Strategy")}
                >
                  <div
                    className="d-flex justify-content-start align-items-center"
                    style={{ gap: "0.5rem" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-check-circle font-medium-3 mr-1"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span className="fw-bold">Choose A Strategy</span>
                  </div>
                </li>
                <li
                  className={`nav-item px-2 py-1 ${
                    navLink === "Get Back All You Spend" &&
                    "bg-primary text-white shadow-lg rounded"
                  }`}
                  style={{ cursor: "pointer" }}
                  onClick={() => setNavLink("Get Back All You Spend")}
                >
                  <div
                    className="d-flex justify-content-start align-items-center"
                    style={{ gap: "0.5rem" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-circle font-medium-3 mr-1"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                    </svg>
                    <span className="fw-bold">Get Back All You Spend</span>
                  </div>
                </li>
                <li
                  className={`nav-item px-2 py-1 ${
                    navLink === "Semper Fi" &&
                    "bg-primary text-white shadow-lg rounded"
                  }`}
                  style={{ cursor: "pointer" }}
                  onClick={() => setNavLink("Semper Fi")}
                >
                  <div
                    className="d-flex justify-content-start align-items-center"
                    style={{ gap: "0.5rem" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-gift font-medium-3 mr-1"
                    >
                      <polyline points="20 12 20 22 4 22 4 12"></polyline>
                      <rect x="2" y="7" width="20" height="5"></rect>
                      <line x1="12" y1="22" x2="12" y2="7"></line>
                      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
                      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
                    </svg>
                    <span className="fw-bold">Semper Fi</span>
                  </div>
                </li>
                <li
                  className={`nav-item px-2 py-1 ${
                    navLink === "Campaign Creation" &&
                    "bg-primary text-white shadow-lg rounded"
                  }`}
                  style={{ cursor: "pointer" }}
                  onClick={() => setNavLink("Campaign Creation")}
                >
                  <div
                    className="d-flex justify-content-start align-items-center"
                    style={{ gap: "0.5rem" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-file-text font-medium-3 mr-1"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    <span className="fw-bold">Campaign Creation</span>
                  </div>
                </li>
                <li
                  className={`nav-item px-2 py-1 ${
                    navLink === "Integration" &&
                    "bg-primary text-white shadow-lg rounded"
                  }`}
                  style={{ cursor: "pointer" }}
                  onClick={() => setNavLink("Integration")}
                >
                  <div
                    className="d-flex justify-content-start align-items-center"
                    style={{ gap: "0.5rem" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-settings font-medium-3 mr-1"
                    >
                      <circle cx="12" cy="12" r="3"></circle>
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                    </svg>
                    <span className="fw-bold">Integration</span>
                  </div>
                </li>
                <li
                  className={`nav-item px-2 py-1 ${
                    navLink === "Pricing, Billing & Payments" &&
                    "bg-primary text-white shadow-lg rounded"
                  }`}
                  style={{ cursor: "pointer" }}
                  onClick={() => setNavLink("Pricing, Billing & Payments")}
                >
                  <div
                    className="d-flex justify-content-start align-items-center"
                    style={{ gap: "0.5rem" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-credit-card font-medium-3 mr-1"
                    >
                      <rect
                        x="1"
                        y="4"
                        width="22"
                        height="16"
                        rx="2"
                        ry="2"
                      ></rect>
                      <line x1="1" y1="10" x2="23" y2="10"></line>
                    </svg>
                    <span className="fw-bold">Pricing, Billing & Payments</span>
                  </div>
                </li>
              </ul>
              <img
                className="img-fluid d-none d-lg-block mt-1"
                src="https://api.xircls.com/static/app-assets/images/illustration/faq-illustrations.svg"
              />
            </div>
          </Col>
          <Col sm={12} md={8} lg={9}>
            <div className="tab-content">
              <div
                className={`tab-pane ${
                  navLink === "Introduction to XIRCL" && "active"
                }`}
              >
                <div className="d-flex align-items-center justify-content-start gap-1">
                  <div className="avatar avatar-tag bg-light-primary mr-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-message-circle font-medium-4"
                    >
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="mb-0">Introduction to XIRCL </h4>
                    <span>
                      New to XIRCLS? Check out our answers to questions that
                      most likely to come up first when you hear about us.
                    </span>
                  </div>
                </div>
                <div
                  className="collapse-margin collapse-icon mt-2"
                  id="faq-introduction-qna"
                >
                  <UncontrolledAccordion className="d-flex flex-column gap-1" stayOpen>
                    {faqs.Introduction_to_XIRCL.map(
                      ({ question, answer }, index) => (
                        <AccordionItem className="card shadow-sm" key={index}>
                          <AccordionHeader targetId={index.toString()}>
                            {question}
                          </AccordionHeader>
                          <AccordionBody accordionId={index.toString()}>
                            {answer}
                          </AccordionBody>
                        </AccordionItem>
                      )
                    )}
                  </UncontrolledAccordion>
                </div>
              </div>
              <div
                className={`tab-pane ${navLink === "Eligibility" && "active"}`}
              >
                <div className="d-flex align-items-center justify-content-start gap-1">
                  <div className="avatar avatar-tag bg-light-primary mr-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-file-text font-medium-4"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h4 className="mb-0">Eligibility </h4>
                    <span>
                      Find out if your business can use XIRCLS for collaborative
                      marketing.
                    </span>
                  </div>
                </div>
                <div
                  className="collapse-margin collapse-icon mt-2"
                  id="faq-introduction-qna"
                >
                  <UncontrolledAccordion className="d-flex flex-column gap-1" stayOpen>
                    {faqs.Eligibility.map(({ question, answer }, index) => (
                      <AccordionItem className="card shadow-sm" key={index}>
                        <AccordionHeader targetId={index.toString()}>
                          {question}
                        </AccordionHeader>
                        <AccordionBody accordionId={index.toString()}>
                          {answer}
                        </AccordionBody>
                      </AccordionItem>
                    ))}
                  </UncontrolledAccordion>
                </div>
              </div>
              <div
                className={`tab-pane ${navLink === "Add Company" && "active"}`}
              >
                <div className="d-flex align-items-center justify-content-start gap-1">
                  <div className="avatar avatar-tag bg-light-primary mr-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-plus-circle font-medium-3 mr-1"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="16"></line>
                      <line x1="8" y1="12" x2="16" y2="12"></line>
                    </svg>
                  </div>
                  <div>
                    <h4 className="mb-0">Add Company </h4>
                    <span>
                      Read this if you run multiple businesses or have more than
                      one company you want to add to XIRCLS.
                    </span>
                  </div>
                </div>
                <div
                  className="collapse-margin collapse-icon mt-2"
                  id="faq-introduction-qna"
                >
                  <UncontrolledAccordion className="d-flex flex-column gap-1" stayOpen>
                    {faqs.Add_Company.map(({ question, answer }, index) => (
                      <AccordionItem className="card shadow-sm" key={index}>
                        <AccordionHeader targetId={index.toString()}>
                          {question}
                        </AccordionHeader>
                        <AccordionBody accordionId={index.toString()}>
                          {answer}
                        </AccordionBody>
                      </AccordionItem>
                    ))}
                  </UncontrolledAccordion>
                </div>
              </div>
              <div
                className={`tab-pane ${
                  navLink === "Create Outlet Profile" && "active"
                }`}
              >
                <div className="d-flex align-items-center justify-content-start gap-1">
                  <div className="avatar avatar-tag bg-light-primary mr-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-shopping-cart font-medium-4"
                    >
                      <circle cx="9" cy="21" r="1"></circle>
                      <circle cx="20" cy="21" r="1"></circle>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="mb-0">Create Outlet Profile </h4>
                    <span>
                      Your Outlet Profile is your calling card on the XIRCLS
                      network. Here’s how you ensure you make a good impression.
                    </span>
                  </div>
                </div>
                <div
                  className="collapse-margin collapse-icon mt-2"
                  id="faq-introduction-qna"
                >
                  <UncontrolledAccordion className="d-flex flex-column gap-1" stayOpen>
                    {faqs.Create_Outlet_Profile.map(
                      ({ question, answer }, index) => (
                        <AccordionItem className="card shadow-sm" key={index}>
                          <AccordionHeader targetId={index.toString()}>
                            {question}
                          </AccordionHeader>
                          <AccordionBody accordionId={index.toString()}>
                            {answer}
                          </AccordionBody>
                        </AccordionItem>
                      )
                    )}
                  </UncontrolledAccordion>
                </div>
              </div>
              <div className={`tab-pane ${navLink === "Network" && "active"}`}>
                <div className="d-flex align-items-center justify-content-start gap-1">
                  <div className="avatar avatar-tag bg-light-primary mr-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-share-2 font-medium-4"
                    >
                      <circle cx="18" cy="5" r="3"></circle>
                      <circle cx="6" cy="12" r="3"></circle>
                      <circle cx="18" cy="19" r="3"></circle>
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                    </svg>
                  </div>
                  <div>
                    <h4 className="mb-0">Network </h4>
                    <span>
                      Find out all you need to know about adding Preferred
                      Partners and blocking outlets.
                    </span>
                  </div>
                </div>
                <div
                  className="collapse-margin collapse-icon mt-2"
                  id="faq-introduction-qna"
                >
                  <UncontrolledAccordion className="d-flex flex-column gap-1" stayOpen>
                    {faqs.Network.map(({ question, answer }, index) => (
                      <AccordionItem className="card shadow-sm" key={index}>
                        <AccordionHeader targetId={index.toString()}>
                          {question}
                        </AccordionHeader>
                        <AccordionBody accordionId={index.toString()}>
                          {answer}
                        </AccordionBody>
                      </AccordionItem>
                    ))}
                  </UncontrolledAccordion>
                </div>
              </div>
              <div
                className={`tab-pane ${navLink === "My Customers" && "active"}`}
              >
                <div className="d-flex align-items-center justify-content-start gap-1">
                  <div className="avatar avatar-tag bg-light-primary mr-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-user font-medium-4"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div>
                    <h4 className="mb-0">My Customers </h4>
                    <span>
                      Add or import your customers to your XIRCLS dashboard.
                    </span>
                  </div>
                </div>
                <div
                  className="collapse-margin collapse-icon mt-2"
                  id="faq-introduction-qna"
                >
                  <UncontrolledAccordion className="d-flex flex-column gap-1" stayOpen>
                    {faqs.My_Customers.map(({ question, answer }, index) => (
                      <AccordionItem className="card shadow-sm" key={index}>
                        <AccordionHeader targetId={index.toString()}>
                          {question}
                        </AccordionHeader>
                        <AccordionBody accordionId={index.toString()}>
                          {answer}
                        </AccordionBody>
                      </AccordionItem>
                    ))}
                  </UncontrolledAccordion>
                </div>
              </div>
              <div
                className={`tab-pane ${
                  navLink === "Choose A Strategy" && "active"
                }`}
              >
                <div className="d-flex align-items-center justify-content-start gap-1">
                  <div className="avatar avatar-tag bg-light-primary mr-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-check-circle font-medium-4"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h4 className="mb-0">Choose A Strategy </h4>
                    <span>
                      Decide your marketing goal and pick how you want to
                      collaborate with other outlets on XIRCLS.
                    </span>
                  </div>
                </div>
                <div
                  className="collapse-margin collapse-icon mt-2"
                  id="faq-introduction-qna"
                >
                  <UncontrolledAccordion className="d-flex flex-column gap-1" stayOpen>
                    {faqs.Choose_A_Strategy.map(
                      ({ question, answer }, index) => (
                        <AccordionItem className="card shadow-sm" key={index}>
                          <AccordionHeader targetId={index.toString()}>
                            {question}
                          </AccordionHeader>
                          <AccordionBody accordionId={index.toString()}>
                            {answer}
                          </AccordionBody>
                        </AccordionItem>
                      )
                    )}
                  </UncontrolledAccordion>
                </div>
              </div>
              <div
                className={`tab-pane ${
                  navLink === "Get Back All You Spend" && "active"
                }`}
              >
                <div className="d-flex align-items-center justify-content-start gap-1">
                  <div className="avatar avatar-tag bg-light-primary mr-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-circle font-medium-4"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                    </svg>
                  </div>
                  <div>
                    <h4 className="mb-0">Get Back All You Spend </h4>
                    <span>
                      Get Back All You Spend helps you cultivate loyalty and
                      market to potential customers at the same time. Learn how.
                    </span>
                  </div>
                </div>
                <div
                  className="collapse-margin collapse-icon mt-2"
                  id="faq-introduction-qna"
                >
                  <UncontrolledAccordion className="d-flex flex-column gap-1" stayOpen>
                    {faqs.Get_Back_All_You_Spend.map(
                      ({ question, answer }, index) => (
                        <AccordionItem className="card shadow-sm" key={index}>
                          <AccordionHeader targetId={index.toString()}>
                            {question}
                          </AccordionHeader>
                          <AccordionBody accordionId={index.toString()}>
                            {answer}
                          </AccordionBody>
                        </AccordionItem>
                      )
                    )}
                  </UncontrolledAccordion>
                </div>
              </div>
              <div
                className={`tab-pane ${navLink === "Semper Fi" && "active"}`}
              >
                <div className="d-flex align-items-center justify-content-start gap-1">
                  <div className="avatar avatar-tag bg-light-primary mr-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-gift font-medium-4"
                    >
                      <polyline points="20 12 20 22 4 22 4 12"></polyline>
                      <rect x="2" y="7" width="20" height="5"></rect>
                      <line x1="12" y1="22" x2="12" y2="7"></line>
                      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
                      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="mb-0">Semper Fi</h4>
                    <span>
                      Semper Fi is a loyalty program that’s the first of its
                      kind. So here’s everything you need to know before you get
                      started.
                    </span>
                  </div>
                </div>
                <div
                  className="collapse-margin collapse-icon mt-2"
                  id="faq-introduction-qna"
                >
                  <UncontrolledAccordion className="d-flex flex-column gap-1" stayOpen>
                    {faqs.Semper_Fi.map(({ question, answer }, index) => (
                      <AccordionItem className="card shadow-sm" key={index}>
                        <AccordionHeader targetId={index.toString()}>
                          {question}
                        </AccordionHeader>
                        <AccordionBody accordionId={index.toString()}>
                          {answer}
                        </AccordionBody>
                      </AccordionItem>
                    ))}
                  </UncontrolledAccordion>
                </div>
              </div>
              <div
                className={`tab-pane ${
                  navLink === "Campaign Creation" && "active"
                }`}
              >
                <div className="d-flex align-items-center justify-content-start gap-1">
                  <div className="avatar avatar-tag bg-light-primary mr-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-file-text font-medium-4"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h4 className="mb-0">Campaign Creation</h4>
                    <span>
                      Answers to all possible questions you may have while
                      creating a Semper Fi campaign.
                    </span>
                  </div>
                </div>
                <div
                  className="collapse-margin collapse-icon mt-2"
                  id="faq-introduction-qna"
                >
                  <UncontrolledAccordion className="d-flex flex-column gap-1" stayOpen>
                    {faqs.Campaign_Creation.map(
                      ({ question, answer }, index) => (
                        <AccordionItem className="card shadow-sm" key={index}>
                          <AccordionHeader targetId={index.toString()}>
                            {question}
                          </AccordionHeader>
                          <AccordionBody accordionId={index.toString()}>
                            {answer}
                          </AccordionBody>
                        </AccordionItem>
                      )
                    )}
                  </UncontrolledAccordion>
                </div>
              </div>
              <div
                className={`tab-pane ${navLink === "Integration" && "active"}`}
              >
                <div className="d-flex align-items-center justify-content-start gap-1">
                  <div className="avatar avatar-tag bg-light-primary mr-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-settings font-medium-4"
                    >
                      <circle cx="12" cy="12" r="3"></circle>
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="mb-0">Integration</h4>
                    <span>
                      Learn how to integrate Semper Fi with your point-of-sale
                      (POS) console or website.
                    </span>
                  </div>
                </div>
                <div
                  className="collapse-margin collapse-icon mt-2"
                  id="faq-introduction-qna"
                >
                  <UncontrolledAccordion className="d-flex flex-column gap-1" stayOpen>
                    {faqs.Integration.map(({ question, answer }, index) => (
                      <AccordionItem className="card shadow-sm" key={index}>
                        <AccordionHeader targetId={index.toString()}>
                          {question}
                        </AccordionHeader>
                        <AccordionBody accordionId={index.toString()}>
                          {answer}
                        </AccordionBody>
                      </AccordionItem>
                    ))}
                  </UncontrolledAccordion>
                </div>
              </div>
              <div
                className={`tab-pane ${
                  navLink === "Pricing, Billing & Payments" && "active"
                }`}
              >
                <div className="d-flex align-items-center justify-content-start gap-1">
                  <div className="avatar avatar-tag bg-light-primary mr-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-credit-card font-medium-4"
                    >
                      <rect
                        x="1"
                        y="4"
                        width="22"
                        height="16"
                        rx="2"
                        ry="2"
                      ></rect>
                      <line x1="1" y1="10" x2="23" y2="10"></line>
                    </svg>
                  </div>
                  <div>
                    <h4 className="mb-0">Pricing,Billing & Payments</h4>
                    <span>
                      Understand the Get Back All You Spend pricing plans and
                      get answers to all your questions about billing &
                      payments.
                    </span>
                  </div>
                </div>
                <div
                  className="collapse-margin collapse-icon mt-2"
                  id="faq-introduction-qna"
                >
                  <UncontrolledAccordion className="d-flex flex-column gap-1" stayOpen>
                    {faqs.Pricing_Billing_Payments.map(
                      ({ question, answer }, index) => (
                        <AccordionItem className="card shadow-sm" key={index}>
                          <AccordionHeader targetId={index.toString()}>
                            {question}
                          </AccordionHeader>
                          <AccordionBody accordionId={index.toString()}>
                            {answer}
                          </AccordionBody>
                        </AccordionItem>
                      )
                    )}
                  </UncontrolledAccordion>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </section>
      <section className="faq-contact">
        <Row className="mt-5 pt-75">
          <Col className="col-12 text-center mb-2">
            <h2>You still have a question?</h2>
            <p className="mb-2">
              If you cannot find a question in our FAQ, you can always contact
              us.
              <br /> We will answer to you shortly!
            </p>
          </Col>
          <Col className="col-sm-6">
            <div
              className="card text-center faq-contact-card shadow-none py-2"
              style={{ backgroundColor: "rgba(186, 191, 199, 0.12)" }}
            >
              <div className="card-body">
                <div className="avatar avatar-tag bg-light-primary mb-2 mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-phone-call font-medium-3"
                  >
                    <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <h4>9969 333 666</h4>
                <span className="text-body">We are always happy to help!</span>
              </div>
            </div>
          </Col>
          <Col className="col-sm-6">
            <div
              className="card text-center faq-contact-card shadow-none py-2"
              style={{ backgroundColor: "rgba(186, 191, 199, 0.12)" }}
            >
              <div className="card-body">
                <div className="avatar avatar-tag bg-light-primary mb-2 mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-mail font-medium-3"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <h4>support@xircls.com</h4>
                <span className="text-body">
                  Best way to get answer faster!
                </span>
              </div>
            </div>
          </Col>
        </Row>
      </section>
    </>
  )
}

export default Faqs
