import React, { useEffect, useState } from "react"
import { Card, CardBody, Col, Modal, ModalBody, Row } from "reactstrap"
import { IoMdInformationCircleOutline, IoIosPeople } from "react-icons/io"
import { FaPeopleArrows } from "react-icons/fa"
import { RiMoneyDollarBoxFill } from "react-icons/ri"
import {
  BsFillSquareFill,
  BsClipboard,
  BsTwitter,
  BsFacebook,
  BsLinkedin
} from "react-icons/bs"
import { RxCross2 } from "react-icons/rx"
import { BiCopy } from "react-icons/bi"
import DataTableWithButtons from "./Affiliate_Table"
import "../Affiliate/affiliate.css"
import toast from "react-hot-toast"
// import axios from "axios"
import { getReq } from "../../assets/auth/jwtService"

const Affiliate = () => {
  const [affiliateLink, setAffiliateLink] = useState(
    "https://www.xircls.com/signup/referral/147576"
  )
  const [cardPop, setCardPop] = useState(false)

  const tooltip = {
    data_toggle: "tooltip",
    data_placement: "top",
    title: "More info"
  }

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(affiliateLink)
      .then(() => toast.success("Copied to clipboard!"))
      .catch(() => toast.error("Copy failed. Please try again."))
  }

  useEffect(() => {
    // axios({
    //   method: "GET",
    //   url: `${baseURL}/affiliate/wallet_transaction/`
    // })
    getReq("affiliate_dashboard")
      .then((data) => {
        console.log({ data }, "wassup")
      })
      .catch((error) => {
        console.log({ error }, "error wassup")
      })
  }, [])

  return (
    <>
      <div className={`position-relative`}>
        {/* <Card
          className={`position-absolute blur-background p-2 ${cardPop ? "cardPopDown" : "cardPopUp"
            }`}
          style={{ width: "550px", zIndex: "5" }}
        >
          <div className="d-flex justify-content-between flex-row-reverse align-items-center mb-2">
            <RxCross2 size={20} onClick={() => setCardPop(false)} style={{ cursor: "pointer" }} />
          </div>
          <div className=" d-flex flex-wrap justify-content-between align-items-center ">
            <div>
              <h5>Product specific:</h5>
              <select
                className="form-select dropsdown-width ms-0"
                aria-label="Default select example"
                style={{ width: "200px" }}
              >
                <option className="" value="Product 1">
                  Product 1
                </option>
                <option className="" value="Product 1">
                  Product 2
                </option>
                <option className="" value="Product 1">
                  Product 3
                </option>
              </select>
            </div>
            <div>
              <h5>Page specific :</h5>
              <select
                className="form-select dropsdown-width ms-0"
                aria-label="Default select example"
                style={{ width: "200px" }}
              >
                <option value="Product 1">Page 1</option>
                <option value="Product 1">Page 2</option>
                <option value="Product 1">Page 3</option>
              </select>
            </div>
          </div>

          <div class="input-group mt-1 mb-3">
            <input
              type="text"
              class="form-control"
              style={{ pointerEvents: "none" }}
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={affiliateLink}
              onChange={(e) => setAffiliateLink(e.target.value)}
            />
            <div class="input-group-append">
              <button
                class="btn btn-primary"
                type="button"
                onClick={copyToClipboard}
              >
                <BiCopy />
              </button>
            </div>
          </div>
        </Card> */}
        <Row className="match-height">
          <Col md={4}>
            <Card>
              <CardBody>
                <div className="d-flex justify-content-between ">
                  <h1
                    style={{
                      fontSize: "36px",
                      fontWeight: "bolder",
                      paddingBottom: "8px"
                    }}
                  >
                    $5123.26
                  </h1>
                  <IoMdInformationCircleOutline
                    size={22}
                    className="infoIcon"
                    {...tooltip}
                  />
                </div>
                <h4 style={{ fontSize: "16px", fontWeight: "bolder" }}>
                  Total Revenue
                </h4>
                <p>Total revenue earned by referring other user to your shop</p>
              </CardBody>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <CardBody>
                <div className="d-flex justify-content-between ">
                  <h1
                    style={{
                      fontSize: "36px",
                      fontWeight: "bolder",
                      paddingBottom: "8px"
                    }}
                  >
                    $125.12
                  </h1>
                  <IoMdInformationCircleOutline
                    size={22}
                    className="infoIcon"
                    {...tooltip}
                  />
                </div>
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: "bolder",
                    paddingRight: "40px"
                  }}
                >
                  Shops Referrals
                </h3>
                <p>
                  Total earned by referring other user to your shop{" "}
                  <span
                    className="fs-5 fw-bold"
                    style={{ color: "rgb(94,88,115)" }}
                  >
                    $0.00
                  </span>{" "}
                  of which outstanding is{" "}
                  <span
                    className="fs-5 fw-bold"
                    style={{ color: "rgb(94,88,115)" }}
                  >
                    $55
                  </span>{" "}
                  in total revenue
                </p>
              </CardBody>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <CardBody>
                <div>
                  <h3 className="text-black">Your Affiliate Link</h3>
                  <h6 className="text-success">
                    Copy your link and share it anywhere
                  </h6>
                </div>
                <div style={{ marginTop: "4px" }} className="position-relative">
                  <input
                    className="rounded"
                    placeholder="https://www.xircls.com/signup/referral/147576"
                    value={affiliateLink}
                    id="affiliatelink"
                    style={{
                      width: "100%",
                      appearance: "none",
                      outline: "none",
                      border: "dashed 1px #c7c8c9",
                      height: "35px",
                      padding: "5px 8px",
                      pointerEvents: "none"
                    }}
                  />
                  <button
                    className="btn btn-success btn-sm z-1 position-absolute "
                    //   style={{ top: "77px", right: "40px" }}
                    style={{ top: "3.5px", right: "4px" }}
                    onClick={copyToClipboard}
                  >
                    Copy
                  </button>
                </div>
                {/* <div className="mt-2">
                  </div> */}
                <div className="mt-2">
                  <button
                    className="btn btn-primary"
                    onClick={() => setCardPop(!cardPop)}
                  >
                    Generate Specific Link
                  </button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="match-height">
          <Col md={8}>
            <DataTableWithButtons />
          </Col>
          <Col md={4}>
            <Card>
              <CardBody>
                <div className="d-flex justify-content-between ">
                  <h1
                    style={{
                      fontSize: "36px",
                      fontWeight: "bolder",
                      paddingBottom: "8px"
                    }}
                  >
                    $51.32{" "}
                  </h1>
                  <IoMdInformationCircleOutline
                    size={22}
                    className="infoIcon"
                    {...tooltip}
                  />
                </div>
                <h4 style={{ fontSize: "16px", fontWeight: "bolder" }}>
                  Community Sharing
                </h4>
                <p>Total earned by referring other user to this community</p>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <div className="d-flex justify-content-between">
                  <h1
                    style={{
                      fontSize: "36px",
                      fontWeight: "bolder",
                      paddingBottom: "8px"
                    }}
                  >
                    $125.32
                  </h1>
                  <IoMdInformationCircleOutline
                    size={22}
                    className="infoIcon"
                    {...tooltip}
                  />
                </div>
                <h4
                  style={{
                    fontSize: "16px",
                    fontWeight: "bolder",
                    paddingBottom: "10px"
                  }}
                >
                  Money Owned
                </h4>
                <div className="d-flex justify-content-between ">
                  <div>
                    <p className="mb-0">Stripe status:</p>
                    <h5>
                      <BsFillSquareFill
                        size={10}
                        className="text-success"
                        style={{ marginBottom: "2px", marginRight: "4px" }}
                      />
                      Connected
                    </h5>
                  </div>
                  <button className="btn btn-sm btn-danger">PAY NOW</button>
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <div className="d-flex justify-content-between">
                  <h1
                    style={{
                      fontSize: "36px",
                      fontWeight: "bolder",
                      marginBottom: "0px"
                    }}
                  >
                    14
                  </h1>
                  <IoMdInformationCircleOutline
                    size={22}
                    className="infoIcon"
                    {...tooltip}
                  />
                </div>
                <h4 style={{ fontSize: "16px", fontWeight: "bolder" }}>
                  Referred shop sales
                </h4>
                <div className="d-flex justify-content-between">
                  <h1
                    style={{
                      fontSize: "36px",
                      fontWeight: "bolder",
                      marginBottom: "0px"
                    }}
                  >
                    51
                  </h1>
                  <IoMdInformationCircleOutline
                    size={22}
                    className="infoIcon"
                    {...tooltip}
                  />
                </div>
                <h4 style={{ fontSize: "16px", fontWeight: "bolder" }}>
                  Referred users
                </h4>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal isOpen={cardPop} size="sm" toggle={() => setCardPop(false)}>
          <ModalBody className="position-relative">
            <div className="p-1 position-absolute top-0 end-0">
              <RxCross2 size={20} onClick={() => setCardPop(false)} style={{ cursor: "pointer" }} />
            </div>
            <div className=" d-flex flex-wrap justify-content-between align-items-center ">
              <div>
                <h5>Product specific:</h5>
                <select
                  className="form-select dropsdown-width ms-0"
                  aria-label="Default select example"
                  style={{ width: "200px" }}
                >
                  <option className="" value="Product 1">
                    Product 1
                  </option>
                  <option className="" value="Product 1">
                    Product 2
                  </option>
                  <option className="" value="Product 1">
                    Product 3
                  </option>
                </select>
              </div>
              <div>
                <h5>Page specific :</h5>
                <select
                  className="form-select dropsdown-width ms-0"
                  aria-label="Default select example"
                  style={{ width: "200px" }}
                >
                  <option value="Product 1">Page 1</option>
                  <option value="Product 1">Page 2</option>
                  <option value="Product 1">Page 3</option>
                </select>
              </div>
            </div>
            <div class="input-group mt-1 mb-3">
              <input
                type="text"
                class="form-control"
                style={{ pointerEvents: "none" }}
                placeholder="Recipient's username"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                value={affiliateLink}
                onChange={(e) => setAffiliateLink(e.target.value)}
              />
              <div class="input-group-append">
                <button
                  class="btn btn-primary"
                  type="button"
                  onClick={copyToClipboard}
                >
                  <BiCopy />
                </button>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    </>
  )
}

export default Affiliate
