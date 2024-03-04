import React, { useContext, useState } from 'react'
import { Edit2, Percent, PlusCircle, X } from 'react-feather'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { PermissionProvider } from '../../../Helper/Context'

const OfferSection = ({ value_type, handleModal, modal, cTAURL, setCTAURL }) => {
    const { userPermission } = useContext(PermissionProvider)
    const [modalValue, setModalValue] = useState("")

    const [modalCode, setModalCode] = useState("")
    const [modalDesc, setModalDesc] = useState(``)
    const [showOffer, setShowOffer] = useState(false)

    const [tempValue, setTempValue] = useState("")
    const [tempCode, setTempCode] = useState("")
    const [tempDesc, setTempDesc] = useState("")
    const [tempCta, setTempCta] = useState("")

    const saveGenerate = () => {
        if (tempValue === "" || tempCode === "" || tempDesc === "" || tempCta === "") {
            alert("Please fill all the fields")
        } else {
            setModalValue(tempValue)
            setModalCode(tempCode)
            setModalDesc(tempDesc)
            setCTAURL(tempCta)
            setShowOffer(true)
            handleModal()
        }
    }


    const substituteValue = () => {
        handleModal()
        setTempValue(tempValue === "" ? modalValue : tempValue)
        setTempCode(tempCode === "" ? modalCode : tempCode)
        setTempDesc(tempDesc === "" ? modalDesc : tempDesc)
        setTempCta(tempCta === "" ? cTAURL : tempCta)
    }

    return (

        <div>
            <style>
                {`
                    .modal-title {
                        width: 100%
                    }
                `}
            </style>
            <Modal className='popup-cust' isOpen={modal} centered size='lg'>
                <ModalHeader>
                    <h1 style={{ fontSize: '1.25rem' }} className='d-flex flex-row justify-content-between align-items-start m-0'>Create Offer <span onClick={handleModal} style={{cursor: "pointer"}}><X size={17.5} /></span></h1>
                </ModalHeader>
                <ModalBody>
                    <div className="row my-2">
                        <div className="col-12 mb-2">
                            <div className="form-group">
                                <label htmlFor="value">{value_type === "fixed_amount" ? "Flat OFF" : "Percentage OFF"}</label>
                                <div className="position-relative form-control d-flex align-items-center">
                                    {value_type === "fixed_amount" && <span style={{ fontSize: "15px" }}>{userPermission?.currencySymbol}</span>}<input type="text" className='flex-grow-1 from-control-offer' style={{ outline: "none", border: 'none', boxShadow: "none", padding: '0px' }} value={tempValue} onChange={(event) => {
                                        if (!isNaN(event.target.value)) {
                                            setTempValue(event.target.value)
                                        }
                                    }} />{value_type === "percentage" && <Percent size={15} />}
                                </div>
                            </div>
                        </div>
                        <div className="col-12 mb-2">
                            <div className="form-group">
                                <label htmlFor="Code">Code</label>
                                <div className="position-relative"><input placeholder='Discount Code' type="text" className='w-100 from-control-offer' value={tempCode} onChange={(event) => setTempCode(event.target.value)} />
                                    <button style={{ position: 'absolute', inset: '0px 0px 0px auto', borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }} onClick={() => setTempCode(Math.random().toString(36).substring(2, 16).toUpperCase())} className="primary-btn waves-effect waves-float waves-light">Generate Code</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 mb-2">
                            <div className="form-group">
                                <label htmlFor="disc_desc">Description</label>
                                <input type="text" id='disc_desc' placeholder='Offer Description' className="w-100 from-control-offer" value={tempDesc} onChange={event => setTempDesc(event.target.value)} maxLength={50} />
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
                                    <input name='call_to_action_url' type="url" className="w-100 from-control-offer"
                                        onChange={(e) => setTempCta(e.target.value)}
                                        value={tempCta}
                                        placeholder='Call to Action URL'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="primary-btn-outline" onClick={() => handleModal()}>Close</button>
                    <button className="primary-btn" onClick={() => saveGenerate()} >Save Discount</button>
                </ModalFooter>
            </Modal>

            <div className="d-flex justify-content-start align-items-start gap-3">
                <div
                    className="offer_box flex-grow-1"
                    id={`id${value_type}`}
                    onClick={substituteValue}
                    // onClick={() => updateActive(value_type)}
                    style={{
                        backgroundColor: showOffer ? "#efefef" : "white",
                        padding: showOffer ? `35px 15px 25px` : "35px 15px",
                        borderRadius: 8,
                        display: "flex",
                        justifyContent: 'center',
                        alignItems: "center",
                        marginBottom: 20,
                        position: "relative",
                        cursor: "pointer",
                        outline: showOffer ? "none" : "1px dashed black"
                    }}
                >
                    <input id='discount_code' type="hidden" value={modalCode} />
                    <input id='discount_value' type="hidden" value={modalValue} />
                    <input id='discount_type' type="hidden" value={value_type} />
                    <input id='discount_description' value={modalDesc} type="hidden" />
                    {/* <div style={{position: "absolute", top: "5px", right: "5px", cursor: "pointer", zIndex: `111`}} onClick={handleModal}>
                <Edit2 size={17} />
                        </div> */}
                    {!showOffer && <PlusCircle />}
                    {showOffer && <div className="d-flex flex-grow-1" style={{
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
                            {modalDesc}
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
                                    {modalCode}
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
                    </div>}
                </div>
                {showOffer && <div style={{ cursor: "pointer", zIndex: `111` }} onClick={substituteValue}>
                    <Edit2 color='#fbcd0c' size={17} />
                </div>}
            </div>


        </div>
    )
}

export default OfferSection