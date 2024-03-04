import React, { useState, useContext, useCallback } from "react"
import Breadcrumb from "../../Components/BreadCrumbs/Breadcrumb"
import { ArrowLeft, ArrowRight, Info, Percent, PlusCircle, X } from "react-feather"
import OfferSection from "./OfferSection"
import IntroWrapper from "../../Components/SuperLeadz/IntroWrapper"
import { PermissionProvider, ThemesProvider } from "../../../Helper/Context"
import { useNavigate } from "react-router-dom"
import { Card, CardBody, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import axios from "axios"
import { getCurrentOutlet } from "../../Validator"
import { SuperLeadzBaseURL } from "../../../assets/auth/jwtService"


function Discount() {
  const { userPermission } = useContext(PermissionProvider)
  const navigate = useNavigate()
  const [modal, showModal] = useState(false)
  const handleModal = useCallback(() => showModal(!modal), [modal])
  const { introThemeId } = useContext(ThemesProvider)
  // const [formData, setFormData] = useState({ OfferName: '', OfferCode: '', url: '' , MinimumValue: '', option1: '', option2: '', option3: ''})

  const [allOffers, setAllOffers] = useState([])
  const outletData = getCurrentOutlet()
  const [activeId, setActiveId] = useState(null)

  const defaultTemp = {
    offer_value_type: "percentage",
    value: "",
    code: "",
    description: "",
    call_to_action_url: ""
  }

  const [tempOffer, setTempOffer] = useState(defaultTemp)

  // const [modalType, setModalType] = useState("Create")

  const [isEdit, setIsEdit] = useState(false)

  const updateTemp = (e) => {
    // if (e.target.name === "offer_value_type") {
    //   setTempOffer({ ...tempOffer, value: "" })
    // }

    setTempOffer({
      ...tempOffer,
      [e.target.name]: e.target.value,
      value: e.target.name === "offer_value_type" ? "" : e.target.name === "value" ? e.target.value : tempOffer.value
    })
  }

  const deleteOffer = (offer) => {
    setAllOffers(allOffers.filter((item) => {
      return item.code !== offer.code
    }))
  }

  console.log("introThemeId =============>", introThemeId)

  const addOffer = () => {
    if (tempOffer.value === "" || tempOffer.code === "" || tempOffer.description === "" || tempOffer.call_to_action_url === "") {
      alert("Please fill all the fields")
    } else {
      if (isEdit) {
        const arr = [...allOffers]
        arr[activeId] = tempOffer
        setAllOffers([...arr])
      } else {
        setAllOffers([...allOffers, { ...tempOffer }])
      }
      setTempOffer({ ...defaultTemp })
      handleModal()
    }
  }

  const sendOffers = () => {

    if (allOffers.length > 0) {
      const allData = {
        shop: outletData[0]?.web_url,
        app: "superleadz",
        codes: [...allOffers]
      }
  
      const formData = new FormData()
      allOffers.map((ele) => {
        formData.append("offers", JSON.stringify(ele))
      })
  
      formData.append("shop", outletData[0]?.web_url)
      formData.append("app", "superleadz")
  
      const saveUrl = new URL(`${SuperLeadzBaseURL}/api/v1/quick_offer_sync/`)
  
      axios({
        method: "POST",
        url: saveUrl,
        data: JSON.stringify(allData)
      })
      .then((data) => console.log("daved data", data))
      .catch((error) => console.log(error))

    }

    navigate("/merchant/SuperLeadz/")

  }


  return (
    <IntroWrapper>
      <div className="card-body w-100" style={{ position: 'relative', zIndex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'between', height: '85vh' }}>
        <div className="flex-grow-1">
          <Breadcrumb />
          <h3 style={{ marginTop: '1rem', color: "black" }}>The Discount</h3>
          <p style={{ color: "black" }}>
            Incentivise purchase with a truly exclusive offer.
          </p>
          <p style={{ fontSize: '12px' }}>Note: Only your selected visitor segment will see this offer</p>
          <p style={{ fontSize: '12px' }}>*You can customize this offer or add more offers later</p>
          <hr />
          <div className="row match-height">
            {/* Created offers loop */}
            {allOffers.map((offer, key) => {
              console.log(offer)
              return (
                <div key={key} className="col-lg-4 col-md-6">
                  <div
                    title="Click on the offer to edit"
                    className="offer_box flex-grow-1 offer-hover"
                    // onClick={() => updateActive(value_type)}
                    style={{
                      backgroundColor: "#efefef",
                      borderRadius: 8,
                      display: "flex",
                      justifyContent: 'center',
                      alignItems: "center",
                      marginBottom: 20,
                      position: "relative",
                      cursor: "pointer",
                      outline: "none"
                    }}
                  >
                    <span onClick={(e) => {
                      e.stopPropagation()
                      deleteOffer(offer)
                    }} title="Delete offer" className="d-flex justify-content-center align-items-center rounded-circle hidden-delete" style={{ position: "absolute", right: '-7.5px', top: "-7.5px", backgroundColor: "#e31e25", width: '20px', aspectRatio: "1", zIndex: "99" }}><X color="white" size={10} /></span>
                    <div
                      onClick={() => {
                        setIsEdit(true)
                        setTempOffer({ ...offer })
                        setActiveId(key)
                        handleModal()
                      }} style={{
                        padding: `35px 15px 25px`
                      }} className="position-relative w-100 d-flex justify-content-center align-items-center">
                      {/* <div style={{position: "absolute", top: "5px", right: "5px", cursor: "pointer", zIndex: `111`}} onClick={handleModal}>
                                      <Edit2 size={17} />
                          </div> */}
                      <div className="d-flex flex-grow-1" style={{
                        justifyContent: "space-between",
                        alignItems: "flex-start"
                      }}>
                        <div
                          style={{
                            fontStyle: "normal",
                            fontWeight: 600,
                            fontSize: 14,
                            lineHeight: `20px`,
                            color: "#000",
                            textAlign: "left"
                          }}
                        >
                          {offer.description}
                        </div>
                        <div
                          className="remove_col"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "flex-end",
                            flexDirection: "column",
                            gap: `25px`
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              gap: `15px`
                            }}
                          >
                            <svg
                              width={16}
                              height={16}
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M15.0575 7.685L8.3075 0.935C8.0375 0.665 7.6625 0.5 7.25 0.5H2C1.175 0.5 0.5 1.175 0.5 2V7.25C0.5 7.6625 0.665 8.0375 0.9425 8.315L7.6925 15.065C7.9625 15.335 8.3375 15.5 8.75 15.5C9.1625 15.5 9.5375 15.335 9.8075 15.0575L15.0575 9.8075C15.335 9.5375 15.5 9.1625 15.5 8.75C15.5 8.3375 15.3275 7.955 15.0575 7.685ZM3.125 4.25C2.5025 4.25 2 3.7475 2 3.125C2 2.5025 2.5025 2 3.125 2C3.7475 2 4.25 2.5025 4.25 3.125C4.25 3.7475 3.7475 4.25 3.125 4.25Z"
                                fill="#000"
                              />
                            </svg>
                            <div
                              style={{
                                fontStyle: "normal",
                                fontWeight: 600,
                                fontSize: 16,
                                lineHeight: `30px`,
                                color: "#000"
                              }}
                            >
                              {offer.code}
                            </div>
                          </div>
                          <a
                            style={{
                              textTransform: "uppercase",
                              height: 32,
                              fontWeight: 600,
                              fontSize: 13,
                              lineHeight: `30`,
                              textAlign: "center",
                              backgroundColor: "#1d1d1d",
                              color: "rgb(255, 255, 255)",
                              borderRadius: 7,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              cursor: "pointer",
                              padding: "0 15px",
                              textDecoration: "none",
                              whiteSpace: "nowrap"
                            }}
                          >
                            Redeem
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>)
            })}

            {/* "Add offer" box */}
            <div className="col-lg-4 col-md-6">
              <div
                className="offer_box flex-grow-1"
                // onClick={() => updateActive(value_type)}
                style={{
                  backgroundColor: "white",
                  padding: "35px 15px",
                  borderRadius: 8,
                  display: "flex",
                  justifyContent: 'center',
                  alignItems: "center",
                  marginBottom: 20,
                  position: "relative",
                  cursor: "pointer",
                  outline: "1px dashed black"
                }}
                onClick={() => {
                  setIsEdit(false)
                  handleModal()
                }}
              >
                <PlusCircle className="position-absolute" />
              </div>
            </div>
          </div>
        </div>
        <div className="button_div" style={{ display: "flex", justifyContent: "space-between" }}>
          <button className='primary-btn-outline' onClick={() => navigate('/merchant/SuperLeadz/Thebutton/')}>
            <div>
              <ArrowLeft size={'20px'} />
              Back
            </div>
          </button>
          {/* <a href={`https://${shopName.domain}/`} onClick={() => SaveDiscount() } target="_blank" rel="noopener noreferrer" data-polaris-unstyled="true" className="Polaris-Navigation__SecondaryAction_1dl4i" tabIndex="0" aria-disabled="false" aria-label="View your online store" aria-describedby="PolarisTooltipContent1" data-polaris-tooltip-activator="true"> */}
          <div className="d-flex align-items-center gap-3">
            <a onClick={() => navigate('/merchant/SuperLeadz/')} target="_blank" rel="noopener noreferrer" data-polaris-unstyled="true" className="Polaris-Navigation__SecondaryAction_1dl4i d-none" tabIndex="0" aria-disabled="false" aria-label="View your online store" aria-describedby="PolarisTooltipContent1" data-polaris-tooltip-activator="true">
              <button className='primary-btn' >
                <div>
                  Preview
                </div>
              </button>
            </a>
            <a onClick={() => {
              // navigate('/merchant/SuperLeadz/')
              sendOffers()
            }} target="_blank" rel="noopener noreferrer" data-polaris-unstyled="true" className="Polaris-Navigation__SecondaryAction_1dl4i" tabIndex="0" aria-disabled="false" aria-label="View your online store" aria-describedby="PolarisTooltipContent1" data-polaris-tooltip-activator="true">
              <button className='primary-btn' >
                <div>
                  Go to Dashboard
                  <ArrowRight size={'20px'} />
                </div>
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* Modal for creating an Offer*/}
      <Modal className='popup-cust' isOpen={modal} centered size='lg'>
        <style>{`
          .modal-title {
            width: 100%
          }
        `}</style>
        <ModalHeader>
          <h1 style={{ fontSize: '1.25rem' }} className='d-flex flex-row justify-content-between align-items-start m-0'>{isEdit ? "Edit" : "Create"} Offer <span onClick={() => {
            setTempOffer({ ...defaultTemp })
            handleModal()
          }} style={{ cursor: "pointer" }}><X size={17.5} /></span></h1>
        </ModalHeader>
        <ModalBody>
          <div className="row">
            <div className="col-12 mb-2">
              <div className="form-group">
                <label>Offer Type</label>
                <div className="xircls_radio d-flex gap-3">
                  <div className='mt-1'>
                    <input
                      type='radio'
                      name="offer_value_type"
                      id="percentage"
                      value='percentage'
                      checked={tempOffer.offer_value_type === "percentage"}
                      onChange={(e) => {
                        updateTemp(e)
                      }}
                    />
                    <label for="percentage">Percentage</label>
                  </div>
                  <div className='mt-1'>
                    <input
                      type='radio'
                      name="offer_value_type"
                      id="fixed_amount"
                      value='fixed_amount'
                      checked={tempOffer.offer_value_type === "fixed_amount"}
                      onChange={(e) => {
                        updateTemp(e)
                      }}
                    />
                    <label for="fixed_amount">Flat</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 mb-2">
              <div className="form-group">
                <label htmlFor="value">{tempOffer.offer_value_type === "fixed_amount" ? "Flat off" : "Percentage off"} <span title="Number only field"><Info size={"10px"} /></span></label>
                <div className="position-relative form-control d-flex align-items-center">
                  {tempOffer.offer_value_type === "fixed_amount" && <span style={{ fontSize: "14px" }}>{userPermission?.currencySymbol}</span>}
                  <input type={"text"} name="value" value={tempOffer.value} className='flex-grow-1 from-control-offer' style={{ outline: "none", border: 'none', boxShadow: "none", padding: '0px' }} onChange={(event) => {
                    const numberRegex = /^\d+$/
                    if (numberRegex.test(event.target.value) || event.target.value === "") {
                      if ((tempOffer.offer_value_type === "percentage" && Number(event.target.value) <= 100) || tempOffer.offer_value_type === "fixed_amount") {
                        updateTemp(event)
                        // } else if (tempOffer.offer_value_type === "percentage" && Number(event.target.value) >= 100) {
                        //   setTempOffer({...tempOffer, value: "100"})
                      }
                    }
                  }} />
                  {tempOffer.offer_value_type === "percentage" && <Percent size={15} />}
                </div>
              </div>
            </div>
            <div className="col-12 mb-2">
              <div className="form-group">
                <label htmlFor="Code">Code</label>
                <div className="position-relative"><input placeholder='Discount Code' type="text" className='w-100 from-control-offer' name="code" value={tempOffer.code} onChange={(event) => {
                  updateTemp(event)
                }} />
                  <button style={{ position: 'absolute', inset: '0px 0px 0px auto', borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }} onClick={() => {
                    setTempOffer({ ...tempOffer, code: Math.random().toString(36).substring(2, 16).toUpperCase() })
                  }} className="primary-btn waves-effect waves-float waves-light">Generate Code</button>
                </div>
              </div>
            </div>
            <div className="col-12 mb-2">
              <div className="form-group">
                <label htmlFor="disc_desc">Description</label>
                <input type="text" id='disc_desc' value={tempOffer.description} placeholder='Offer Description' name="description" className="w-100 from-control-offer" onChange={event => updateTemp(event)} maxLength={50} />
              </div>
            </div>
            <div className="inputs mt-2">
              <div className="row">
                {/* <div className="col-6">
                                    <label htmlFor="">Call to Action</label>
                                    <Select
                                        isMulti={false}
                                        options={callToAction}
                                        inputId="aria-example-input"
                                        closeMenuOnSelect={true}
                                        name="call_to_action"
                                        value={callToAction.filter(option => cTABtn?.includes(option.value))}
                                        onChange={(value, actionMeta) => handleChange(value, actionMeta, false)}
                                    />
                                </div> */}
                <div className="col-12">
                  <label htmlFor="">Call to Action URL</label>
                  <input value={tempOffer.call_to_action_url} name='call_to_action_url' type="url" className="w-100 from-control-offer"
                    onChange={(e) => updateTemp(e)}
                    placeholder='Call to Action URL'
                  />
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="primary-btn-outline" onClick={() => handleModal()}>Cancel</button>
          <button className="primary-btn" onClick={() => addOffer()}>Save Discount</button>
        </ModalFooter>
      </Modal>
    </IntroWrapper>
  )
}

export default Discount