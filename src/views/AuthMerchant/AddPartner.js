import { useEffect, useState } from "react"
import { Plus, UserMinus, UserPlus, UserX } from "react-feather"
import { Link } from "react-router-dom"
import { Card, CardBody, Col, Container, Dropdown, DropdownMenu, DropdownToggle, Row, Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { getReq, postReq } from "../../assets/auth/jwtService"
import toast from "react-hot-toast"
import { xircls_url } from "../Validator"
import Spinner from "../Components/DataTable/Spinner"
import FrontBaseLoader from "../Components/Loader/Loader"

const AddPartner = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const [data, setData] = useState({})
    const [isLoading, setisLoading] = useState(true)
    const [parentArray, setParentArray] = useState([])
    const [childArray, setChildArray] = useState([])
    // const [addModal, setAddModal] = useState(false)
    const [currentData, setCurrentData] = useState(null)
    const [apiLoader, setApiLoader] = useState(false)

    const [modals, setModals] = useState({
        addPartner: false,
        removePartner: false
    })

    const filterArray = (e, type, obj) => {
        if (e.target.checked) {
            if (type === 'parent') {
                setParentArray([...parentArray, obj])
                const newChild = data.categories.sub_categories.filter(item => Number(item.parent_id) === Number(obj.id))
                setChildArray([...childArray, ...newChild])
            } else {
                setChildArray([...childArray, obj])
            }
        } else {
            if (type === 'parent') {
                const filteredParent = parentArray.filter(item => Number(item.id) !== Number(obj.id))
                const filteredChild = childArray.filter(item => Number(item.parent_id) !== Number(obj.id))
                setParentArray(filteredParent)
                setChildArray(filteredChild)
            } else {
                const filteredChild = childArray.filter(item => Number(item.id) !== Number(obj.id))
                const newParent = filteredChild.filter(item => item.parent_id === obj.parent_id).map(ele => { return ele.parent_id })
                const newParent2 = filteredChild.filter(item => item.parent_id !== obj.parent_id).map(ele => { return ele.parent_id })
                setChildArray(filteredChild)
                setParentArray([...parentArray.filter(item => newParent.includes(item.id)), ...parentArray.filter(item => newParent2.includes(item.id))])
            }
        }
    }

    const apiCall = () => {
        const new_form = {}
        const form_data = new FormData()
        parentArray.map(ele => { form_data.append('main_categories', ele.id) })
        childArray.map(ele => { form_data.append('sub_categories', ele.id) })
        parentArray.map(parent => {
            new_form[parent.id] = []
            childArray.filter(child => parent.id === child.parent_id).map(child => {
                new_form[parent.id].push(child.id)
            })
        })
        console.log(new_form)
    }

    const getData = () => {
        setisLoading(true)
        getReq("addPlanDetails")
        .then((resp) => {
            setData(resp.data.message.data)
            setisLoading(false)
            
        })
        .catch((error) => {
            console.log(error)
            toast.error('Something went wrong!')
            setisLoading(false)
        })
    }

    useEffect(() => {
        getData()

    }, [])
    // console.log(addModal)
    const addPartner = () => {
        setApiLoader(true)
        setModals({...modals, addPartner: false})
        // setAddModal(false)
        const form_data = new FormData()
        form_data.append('req_outlet_id', currentData?.id)
        form_data.append('action', "ADD_PARTNER")
        postReq('innerXirclsRequest', form_data)
        .then((resp) => {
            console.log(resp)
            getData()
            toast.success("Request Sent")
            setApiLoader(false)
        })
        .catch((error) => {
            console.log(error)
            setApiLoader(false)
            toast.error('Something went wrong')
        })
    }

    const removePartner = () => {
        setApiLoader(true)
        setModals({...modals, removePartner: false})
        // setAddModal(false)
        const form_data = new FormData()
        form_data.append('req_outlet_id', currentData?.id)
        form_data.append('action', "REMOVE_PARTNER")
        postReq('innerXirclsRequest', form_data)
        .then((resp) => {
            console.log(resp)
            getData()
            toast.success("Outlet removed")
            setApiLoader(false)
        })
        .catch((error) => {
            console.log(error)
            setApiLoader(false)
            toast.error('Something went wrong')
        })
    }

    return (
        <>
            {
                apiLoader ? <FrontBaseLoader /> : ''
            }
            <Row>
                <Col xs={12}>
                    <Card>
                        <CardBody className="d-flex justify-content-between align-items-center">
                            <h4 className="mb-0">Add Partner</h4>
                            <div className="d-flex gap-1 align-items-center justify-content-end">
                                <Link to={'/merchant/network/'} className="btn btn-primary">Network Dashboard</Link>
                                <Dropdown className="d-none" isOpen={dropdownOpen} toggle={() => setDropdownOpen((prevState) => !prevState)}>
                                    <DropdownToggle color="primary" caret>Filter by Category</DropdownToggle>
                                    <DropdownMenu style={{ maxWidth: '1080px', width: '70vw' }}>
                                        <Container className="py-2">
                                            <Row style={{ maxHeight: '45vh', overflowY: 'scroll' }}>
                                                {data.categories?.main_categories?.map((parent, i) => {
                                                    return (
                                                        <Col key={i} lg={4} sm={6}>
                                                            <div className={`rounded-3 px-1 ${parentArray.some(ele => ele.id === parent.id) && 'bg-light-primary'}`}>
                                                                <div className="form-check">
                                                                    <label style={{ padding: '0.75rem 0.25rem' }} htmlFor={`parent-${i}`} className="form-check-label text-dark w-100 d-flex justify-content-between align-items-center"><span><input checked={parentArray.some(ele => ele.id === parent.id)} value={parent.id} onChange={e => filterArray(e, 'parent', parent)} id={`parent-${i}`} type="checkbox" className="form-check-input" />{parent.name}</span><Plus size={15} /></label>
                                                                </div>
                                                                <ul>
                                                                    {data.categories?.sub_categories?.filter(child => child.parent_id === parent.id && parentArray.some(ele => ele.id === child.parent_id)).map((child, j) => {
                                                                        return (<li key={j} className="form-check">
                                                                            <label style={{ padding: '0.75rem 0px' }} htmlFor={`child-${i}-${j}`} className="form-check-label text-dark w-100">
                                                                                <input checked={childArray.some(ele => ele.id === child.id)} value={child.id} onChange={e => filterArray(e, 'child', child)} id={`child-${i}-${j}`} type="checkbox" className="form-check-input" />{child.name}</label>
                                                                        </li>
                                                                        )
                                                                    })}
                                                                </ul>
                                                            </div>
                                                        </Col>
                                                    )
                                                })}
                                            </Row>
                                            <Row>
                                                {parentArray.length >= 1 && <Col xs={12} className='text-center mt-1'>
                                                    <button onClick={apiCall} className="btn btn-success btn-sm">Apply</button></Col>}
                                            </Row>
                                        </Container>
                                    </DropdownMenu>
                                </Dropdown>
                                <input placeholder="Search" type="search" className="form-control w-25" onChange={(e) => {
                                    const cardList = document.querySelectorAll('.outlet_name_sreach')
                                    cardList.forEach((curElem) => {
                                        // console.log(curElem.textContent.toLowerCase(), e.target.value)
                                        // console.log(curElem.textContent.toLowerCase() === e.target.value)
                                        if (e.target.value !== "") {
                                            if (curElem.textContent.toLowerCase().includes(e.target.value)) {
                                                curElem.parentElement.parentElement.parentElement.parentElement.classList.remove("d-none")
                                                // console.log(, "pppp")
                                            } else {
                                                curElem.parentElement.parentElement.parentElement.parentElement.classList.add("d-none")
                                            }
                                        } else {
                                            curElem.parentElement.parentElement.parentElement.parentElement.classList.remove("d-none")
                                        }
                                    })
                                    // console.log(e)
                                }} />
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xs={12}>
                    {/*<Card>
                        <CardBody>
                            <Container fluid> */}
                    <Row className="match-height">

                        {
                            isLoading ? <>
                                <Col>
                                    <Card>
                                        <CardBody className="text-center">
                                            <Spinner size='40px' />
                                        </CardBody>
                                    </Card>
                                </Col>
                            </> : data.all_outlet?.map((ele, key) => {
                                const check = data?.partners.filter((cur) => cur?.in_circle_outlet?.id === ele.id)
                                // console.log(check)
                            return (
                                <Col key={key} lg={3} md={4} sm={6} className={`to_hide`}>
                                    <Card>
                                        <CardBody>
                                            <Link className="position-relative d-flex flex-column align-items-center p-1" to={`/merchant/outlets/xircls-outlet-details/${ele.id}/`}>
                                                <img width={'50%'} className='rounded-pill mb-2' style={{ aspectRatio: '1' }} src={`${xircls_url}${ele.outlet_logo}`} />
                                                <h5 className="fw-bolder text-center outlet_name_sreach">{ele.outlet_name}</h5>
                                            </Link>
                                            <span className="btn p-1 position-absolute" style={{ top: '0px', right: '0px' }}>
                                                {check[0]?.status === 0 ? (
                                                    <a onClick={() => {
                                                        setModals({...modals, removePartner: true})
                                                        setCurrentData(ele)
                                                    }}>
                                                        <UserX className="text-danger" size={17.5} />
                                                    </a>
                                                ) : check[0]?.status === 1 ? (
                                                    <a onClick={() => {
                                                        setModals({...modals, removePartner: true})
                                                        setCurrentData(ele)
                                                    }}>
                                                        <UserMinus className="text-danger" size={17.5} />
                                                    </a>
                                                ) : (
                                                    <a onClick={() => {
                                                        setModals({...modals, addPartner: true})
                                                        setCurrentData(ele)
                                                    }}>
                                                        <UserPlus className="text-success" size={17.5} />
                                                    </a>
                                                )}
                                            </span>
                                        
                                        </CardBody>
                                    </Card>
                                </Col>
                            )
                        })}
                    </Row>
                   
                </Col>
            </Row>

            <Modal
                isOpen={modals.addPartner}
                toggle={() => setModals({...modals, addPartner: !modals.addPartner})}
                className='modal-dialog-centered'
                >
                <ModalHeader toggle={() => setModals({...modals, addPartner: !modals.addPartner})}>ADD {currentData?.outlet_name} AS A PREFERRED PARTNER?</ModalHeader>
                <ModalBody>
                    <div className="row">
                        <p>When this Outlet accepts your request, you understand that:</p>
                        <p>1. Your Offers will be issued on priority basis to this Outlet's customers in your campaign</p>
                        <p>2. This Outlet's rewards will be issued on priority basis to your customers in your campaign</p>

                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button outline onClick={() => setModals({...modals, addPartner: !modals.addPartner})}>
                        No
                    </Button>
                    <Button color='primary' onClick={() => addPartner()}>
                        Yes
                    </Button>
                </ModalFooter>
            </Modal>

            <Modal
                isOpen={modals.removePartner}
                toggle={() => setModals({...modals, removePartner: !modals.removePartner})}
                className='modal-dialog-centered'
                >
                <ModalHeader toggle={() => setModals({...modals, removePartner: !modals.removePartner})}>ARE YOU SURE YOU WANT TO REMOVE {currentData?.outlet_name}</ModalHeader>
                <ModalBody>
                    <div className="row">
                        <p>By removing this Outlet as a Preferred Partner, you understand that:</p>
                        <p>1. Your Offers will NOT be issued on priority basis to this Outlet's customers in your campaign</p>
                        <p>2. This Outlet's rewards will NOT be issued on priority basis to your customers in your campaign</p>
                        <p className="mt-1">Note: Offers from you and rewards from this Outlet may still be issued to each other's customers in your campaign.</p>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button outline onClick={() => setModals({...modals, removePartner: !modals.removePartner})}>
                        No
                    </Button>
                    <Button color='primary' onClick={() => removePartner()}>
                        Yes
                    </Button>
                </ModalFooter>
            </Modal>
        
        </>
    )
}

export default AddPartner