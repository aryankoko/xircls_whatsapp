import React, { useEffect, useState, useContext } from 'react'
import { Button, Card, CardBody, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import { getReq, putReq } from '../../assets/auth/jwtService'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { xircls_url } from '../Validator'
import Spinner from '../Components/DataTable/Spinner'
import LoyaltySelectOffers from './LoyaltySelectOffers'
import NotificationDropdown from '../../@core/layouts/components/navbar/NotificationDropdown'
import toast from 'react-hot-toast'
import { PermissionProvider } from '../../Helper/Context'

const InnerXirclTwo = () => {
    const [editModal, setEditModal] = useState(false)
    // const [showOffers, setShowOffers] = useState(false)
    const [allOffers, setAlloffers] = useState([])
    const [allDraft, setAllDraft] = useState([])
    const [options, setOptions] = useState([])
    const { userPermission } = useContext(PermissionProvider)
    const [data, setData] = useState({
        mainData: null,
        isLoading: true,
        selectedOffer: '',
        selectedDraftList: [],
        selectedOfferList: [],
        own_offer: '',
        isOwn: false,
        outlet_name: '',
        isChange: false
    })

    const navigate = useNavigate()

    const { id } = useParams()

    const getData = () => {
        const ownOutlet = userPermission?.multipleDomain.filter((cur) => cur.api_key === userPermission?.apiKey)

        getReq('LoyaltySelectOffers', `?id=${ownOutlet[0]?.id}`)
        .then((resp) => {
          console.log(resp, "ppp")
          setOptions(resp?.data?.data?.outlet_detail)
        })
        .catch((error) => {
          console.log(error)
        })
    }

    useEffect(() => {
        getReq("innerXirclTwo", `?id=${id}`)
        .then((resp) => {
            console.log(resp)
            let offerList = []
            let selected_list = []
            let isOwn = false
            if (resp?.data?.data?.inner_xircl_info?.selected_offer_list) {
                offerList = eval(resp?.data?.data?.inner_xircl_info?.selected_offer_list)
            } else {
                offerList = []
            }

            if (resp?.data?.data?.selected_list) {
                selected_list = eval(resp?.data?.data?.selected_list)
            } else {
                selected_list = []
            }

            if (resp?.data?.data?.inner_xircl_info.own_offer) {
                offerList.push(resp?.data?.data?.inner_xircl_info?.own_offer)
                isOwn = true
            }

            const updateData = {
                mainData: resp.data.data.outlet_partner,
                selectedOfferList: offerList,
                isLoading: false,
                own_offer: resp?.data?.data?.inner_xircl_info?.own_offer,
                isOwn
            }

            setData((preData) => ({
                ...preData,
                ...updateData
            }))

            setAlloffers(selected_list)
        })
        .catch((error) => {
            console.log(error)
            const updateData = {
                mainData: [],
                selectedOfferList: [],
                isLoading: false,
                own_offer: ""
            }
            setData((preData) => ({
                ...preData,
                ...updateData
            }))
            // setData([])
        })
        getData()
    }, [])

    console.log(data, "data")

    const saveSelectedOffer = () => {
        const form_data = new FormData()
        form_data.append('id', id)
        data.selectedOfferList.filter((cur) => String(cur) !== String(data.own_offer)).map((cur) => {
            form_data.append('selected_offer_list', cur)
        })
        form_data.append('own_offer', data.own_offer)
        putReq('saveInnerXirclsDetails', form_data)
        .then((resp) => {
            console.log(resp)
            toast.success('Successfully Saved')
            navigate(`/merchant/preview_inner_xircl/${id}/`)
        })
        .catch((error) => {
            console.log(error)
            toast.error('Something went wrong')
        })
    }

    const addToSelected = (e, curElem, id) => {
        console.log(e.target.checked)
        const check = document.querySelectorAll(`#show_offer_${id} input[type='checkbox']:checked`)
        console.log(check, "check")
        if (check.length > 1) {
            // toast.error('')
            e.target.checked = false
        } else {
            if (e.target.checked) {
                setData({...data, selectedDraftList: [...data.selectedDraftList, curElem?.id]})
                setAllDraft([...allDraft, curElem])
            } else {
                const updatedList = {
                    selectedOfferList : data.selectedOfferList.filter((cur) => Number(cur) !== Number(curElem?.id)),
                    selectedDraftList: data.selectedDraftList.filter((cur) => Number(cur.id) !== Number(curElem?.id))
                }
                setData((preData) => ({
                    ...preData,
                    ...updatedList
                }))
        
                setAlloffers(allOffers.filter((cur) => Number(cur.id) !== Number(curElem?.id)))
                setAllDraft(allDraft.filter((cur) => Number(cur.id) !== Number(curElem?.id)))
            }

        }
    }

    const removeSelected = (curElem) => {
        console.log(curElem.id)
        const updatedList = {
            selectedOfferList : data.selectedOfferList.filter((cur) => Number(cur) !== Number(curElem?.id)),
            selectedDraftList: data.selectedDraftList.filter((cur) => Number(cur.id) !== Number(curElem?.id))
        }
        setData((preData) => ({
            ...preData,
            ...updatedList
        }))

        setAlloffers(allOffers.filter((cur) => Number(cur.id) !== Number(curElem?.id)))
        setAllDraft(allDraft.filter((cur) => Number(cur.id) !== Number(curElem?.id)))
    }

    const addToMain = () => {
        setData({...data, selectedOfferList: [...data.selectedOfferList, ...data.selectedDraftList]})
        setAlloffers([...allOffers, ...allDraft])
    }

    useEffect(() => {
        setAllDraft([])
        setData({...data, selectedDraftList: []})
    }, [editModal])

    // console.log(allOffers,  "allOffers")
    // console.log(data, "allDraft")

  return (
    <>
        <Row>
            <Col md="12">
                <Card>
                    <CardBody>
                        <div className="parent d-flex justify-content-between align-items-center">
                            <div className="left form-check">
                                <input className='form-check-input cursor-pointer' type='checkbox' id="ownOffer" onChange={() => setData({...data, isOwn: !data?.isOwn})} checked={data?.isOwn} />
                                <label htmlFor="ownOffer" className='cursor-pointer'>Add own offers</label>
                            </div>
                            <div className="right d-flex justify-content-end align-items-center gap-2">
                                {
                                    data?.isOwn ? <>
                                        <select className="form-control" style={{width: '200px'}} onChange={(e) => {
                                            if (e.target.value !== "") {
                                                const ownOutlet = userPermission?.multipleDomain.filter((cur) => cur.api_key === userPermission?.apiKey)
                                                const updateData = {
                                                    own_offer: e.target.value,
                                                    outlet_name: ownOutlet[0].outlet_name,
                                                    isChange: true
                                                }
                                                setData((preData) => ({
                                                    ...preData,
                                                    ...updateData
                                                }))
                                                // setData({...data, own_offer: e.target.value})
                                                setEditModal(!editModal)

                                            }
                                        }}>
                                            <option selected value="">Select Own Offer</option>
                                            {
                                                options?.map((cur, key) => {
                                                    return <option value={cur.id} key={key} selected={data?.own_offer}>{cur.offer_name}</option>
                                                })
                                            }
                                            
                                        </select>
                                    </> : ''
                                }
                                <NotificationDropdown allOffers={allOffers} saveSelectedOffer={saveSelectedOffer} removeSelected={removeSelected} />

                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </Row>
        {/* <Row>
            <Col md='12' className='my-1 d-flex justify-content-end align-items-center'>
                <div style={{marginRight: '30px'}}>
                    

                </div>
            </Col>
        </Row> */}
        <Row>
            
            {
                !data.isLoading ? <>
                    {
                        data.mainData.map((curElem) => {
                            return <>
                            <Col xl='3' lg='4' md="6">
                                <Card>
                                    <CardBody className='text-center'>
                                        {/* <div className='d-flex justify-content-end align-items-center'>
                                            {
                                                data?.offerCount.map((cur) => {
                                                    return cur.outlet_id === curElem.in_circle_outlet.id ? `${cur.offer_count} offers` : '0 offers'
                                                })
                                            }
                                        </div> */}
                                        <img style={{maxWidth: '100%'}} width="200px" height="200px" src={`${xircls_url}${curElem.in_circle_outlet.outlet_logo}`} alt="" />
                                        <h4 className='my-2' title={curElem.in_circle_outlet.outlet_name} style={{textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>{curElem.in_circle_outlet.outlet_name}</h4>
                                        <div className="row action mb-2">
                                            <div className="col-md-6 mb-1">
                                                {/* <Link to={`/merchant/xircls/inner-xircl/task1/${curElem.in_circle_outlet.id}/`} className='btn btn-outline-secondary'>View Offers</Link> */}
                                                <a className='btn btn-outline-secondary' onClick={() => {
                                                    const updateData = {
                                                        selectedOffer: curElem.in_circle_outlet.id,
                                                        outlet_name: curElem?.in_circle_outlet?.outlet_name,
                                                        isChange: false
                                                    }
                                                    setData((preData) => ({
                                                        ...preData,
                                                        ...updateData
                                                    }))
                                                    setEditModal(!editModal)
                                                }}>See Offers</a>
                                            </div>
                                            <div className="col-md-6 mb-1">
                                                <a href={`/merchant/outlets/xircls-outlet-details/${curElem.in_circle_outlet.id}/`} target='_blank' className='btn btn-outline-secondary'>View Profile</a>

                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                            </>
                        })
                    }
                    
                </> : <>
                {
                    data.mainData?.length === 0 ? <h4 className='text-center'>Inner xircls info details is not found!</h4> : <div className='d-flex justify-content-center align-items-center my-3'><Spinner size={'45px'} /></div>
                }

                </>
            }
        </Row>
        <Modal
            isOpen={editModal}
            toggle={() => setEditModal(!editModal)}
            className='modal-dialog-centered'
            size='lg'
        >
            <ModalHeader toggle={() => setEditModal(!editModal)}>Add an Offer from {data?.outlet_name} </ModalHeader>
            <ModalBody>
                <LoyaltySelectOffers id={data?.selectedOffer} addToSelected={addToSelected} selectOffer={data?.selectedOfferList} offerId={data.own_offer} change={data.isChange} />
            </ModalBody>
            <ModalFooter>
                <Button color='primary' onClick={() => {
                    setEditModal(!editModal)
                    addToMain()
                }}>
                    Add
                </Button>
            </ModalFooter>
        </Modal>

        {/* <Modal
            isOpen={showOffers}
            toggle={() => setShowOffers(!showOffers)}
            className='modal-dialog-centered'
        >
            <ModalHeader toggle={() => setShowOffers(!showOffers)}>Select Offers</ModalHeader>
            <ModalBody>

            </ModalBody>
            <ModalFooter>
                <Button outline onClick={() => setShowOffers(!showOffers)}>
                    Cancel
                </Button>
                <Button color='primary'>
                    Save
                </Button>
            </ModalFooter>
        </Modal> */}
    </>
  )
}

export default InnerXirclTwo