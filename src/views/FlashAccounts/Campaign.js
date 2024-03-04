import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { Card, CardBody, Col, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody, Row, UncontrolledButtonDropdown } from 'reactstrap'
import { getCurrentOutlet } from '../Validator'
import { PermissionProvider } from '../../Helper/Context'
import AdvanceServerSide from '../Components/DataTable/AdvanceServerSide'
import { SuperLeadzBaseURL } from '../../assets/auth/jwtService'
import { Copy, Edit2, Layout, MoreVertical, Trash, X } from 'react-feather'
import moment from 'moment/moment'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Campaign = () => {

    const [allCampaigns, setAllCampaigns] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [count, setCount] = useState(0)
    const [deleteModal, setDeleteModal] = useState(false)
    const [checkedThemes, setCheckedThemes] = useState([])
    const [deleteMode, setDeleteMode] = useState("single")
    // const [activeThemes, setActiveThemes] = useState([])
    const [currDetails, setCurrDetails] = useState({})
    const outletData = getCurrentOutlet()
    const { userPermission } = useContext(PermissionProvider)

    const navigate = useNavigate()

    const getAllThemes = (currentPage = 0, currentEntry = 10, searchValue = "", advanceSearchValue = {}) => {
        setIsLoading(true)

        const getUrl = new URL(`${SuperLeadzBaseURL}/api/v1/show_all_form_builder_theme/`)
        const form_data = new FormData()
        // const url = new URL(`${SuperLeadzBaseURL}/api/v1/get/offer/`)
        if (Object.entries(advanceSearchValue).length > 0) {
            Object.entries(advanceSearchValue).map(([key, value]) => value && form_data.append(key, value))
        }
        form_data.append("shop", outletData[0]?.web_url)
        form_data.append('app', userPermission?.appName)
        form_data.append("page", currentPage + 1)
        form_data.append("size", currentEntry)
        form_data.append("searchValue", searchValue)
        // form_data.append('showDraft', draft)
        fetch(getUrl, {
            method: "POST",
            body: form_data
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)

            setAllCampaigns(data?.grid_view_data)
            setIsLoading(false)
            setCount(data?.total_count)
            // const newArr = []
            // data.is_active.forEach(ele => {
            //     newArr.push(Number(ele))
            // })
            // setActiveThemes([...newArr])
        }).catch((err) => {
            console.log(err)
            toast.error("Data could not be loaded")
            setIsLoading(false)
        })
    }

    const deleteContent = <button onClick={() => {
        setDeleteMode("multiple")
        setDeleteModal(!deleteModal)
    }} className="btn btn-danger d-block">Deleting {checkedThemes.length} items</button>

    const deleteCampagin = () => {

        const form_data = new FormData()

        if (deleteMode === "single") {
        form_data.append("theme_id", currDetails.id)
        } else {
            checkedThemes?.map((curElem) => {
                console.log(curElem, "curElem")
                form_data.append("theme_id", curElem?.theme_name?.id)
            })
        }

        axios(`${SuperLeadzBaseURL}/api/v1/delete/theme/`, {
            method: "POST",
            data: form_data
        })
        .then((data) => {
            console.log({ data })
            toast.success(data.data.message)
            setCheckedThemes([])
            getAllThemes()
        })
        .catch((error) => {
            console.log("Error while deleting theme", error)
        })
    }

    const columns = [
        {
            name: 'Campaign',
            selector: row => {
                return (
                    <>{row?.theme_name?.campaign_name}</>
                )
            },
            type: "text",
            isEnable: true
        },
        {
            name: 'Status',
            selector: row => {
                // if (row.theme_name.is_draft === 0) {
                    return (
                        <div className="m-auto form-check form-switch form-check-success cursor-pointer p-0 m-0" style={{ filter: `drop-shadow(0px 0px 7.5px rgba(40, 199, 111, ${row.theme_name.is_active ? "0.5" : "0"}))` }}>
                            <input onChange={(e) => {
                                // setCurrDetails(row.theme_name)
                                const getUrl = new URL(`${SuperLeadzBaseURL}/api/v1/activate-theme/`)
                                const form_data = new FormData()
                                form_data.append("shop", outletData[0]?.web_url)
                                form_data.append("app", userPermission?.appName)
                                form_data.append('theme_id', row.theme_name.id)
                                form_data.append('is_active', e.target.checked ? "1" : "0")
                                axios({
                                    method: "POST",
                                    url: getUrl,
                                    data: form_data
                                }).then((data) => {
                                    console.log(data)
                                    toast.success("Campaign activated")
                                    getAllThemes()
                                }).catch((err) => {
                                    console.log({ err })
                                    toast.error("Something went wrong!")
                                    e.target.checked = !e.target.checked
                                })
                            }} type='checkbox' defaultChecked={row?.theme_name?.active_status === 1} className='form-check-input cursor-pointer m-0' />
                        </div>
                    )
                // } else {
                //     return (
                //         <div className='text-warning m-auto'>Draft</div>
                //     )
                // }
            },
            type: 'select',
            options: [
                { label: "Select", value: "" },
                { label: "Active", value: 1 },
                { label: "Inactive", value: 0 },
                { label: "Draft", value: "is_draft" }
            ],
            isEnable: true
            // new Date(row.theme_name.created_at).toUTCString().replace("GMT", "")
        },
        {
            name: 'Start Date',
            selector: row => <span className='cursor-pointer'>{row.theme_name.start_date ? moment(row.theme_name.start_date).format("DD-MM-YYYY") : ''}</span>,
            dataType: 'offer_code',
            type: 'date',
            isEnable: true
        },
        {
            name: 'End Date',
            selector: row => <span className='cursor-pointer'>{row.theme_name.end_date ? moment(row.theme_name.end_date).format("DD-MM-YYYY") : "perpetual"}</span>,
            type: 'date',
            isEnable: true
        },
        {
            name: 'Actions',
            cell: row => (
                <div className="d-flex justify-content-center align-items-center gap-2">
                    <UncontrolledButtonDropdown className='more-options-dropdown'>
                        <DropdownToggle className={`btn-icon cursor-pointer`} color='transparent' size='sm'>
                            <span className={`border-none`}>
                                <MoreVertical size={15} />
                            </span>
                        </DropdownToggle>
                        <DropdownMenu className='border dropdown-menu-custom'>
                            {!row?.theme_name?.active_status && <DropdownItem onClick={() => {
                                setDeleteMode("single")
                                setCurrDetails(row.theme_name)
                                setDeleteModal(!deleteModal)
                            }} className='w-100'>
                                <div className="d-flex align-items-center" style={{ gap: "0.5rem" }}>
                                    <Trash stroke='#ea5455' size={"15px"} className='cursor-pointer' /> <span className='fw-bold text-black' style={{ fontSize: "0.75rem" }}>Delete</span>
                                </div>
                            </DropdownItem>}
                            <DropdownItem onClick={() => {
                                // setSelectedThemeNo(row.theme_name.default_id)
                                // setEditTheme(row.theme_name)
                                // localStorage.setItem("is_draft", row.theme_name.is_draft)
                                navigate(`/merchant/Flash_Accounts/settings/${row.theme_name.id}`)
                            }} className='w-100'>
                                <div className="d-flex align-items-center" style={{ gap: "0.5rem" }}>
                                    <Edit2 stroke='#ff9f43' size={"15px"} className='cursor-pointer' /> <span className='fw-bold text-black' style={{ fontSize: "0.75rem" }}>Edit</span>
                                </div>
                            </DropdownItem>

                        </DropdownMenu>
                    </UncontrolledButtonDropdown>
                </div>
            ),
            width: "100px"
        }
    ]

    return (
        <Row>
            <style>
                {`
            
                    .dropdown-menu-custom.dropdown-menu[data-popper-placement]:not([data-popper-placement^="top-"]) {
                        top: -100px !important;
                        left: -100px !important;
                    }

                    .datatableView {
                        padding: 5px 13px;
                        cursor: pointer
                    }

                    .datatableView.active {
                        background: #464646;
                        color: #fff
                    }

                    .grid-card {
                        margin-bottom: 1.5rem;
                        box-shadow: 0 4px 15px -8px #464646;
                        border: 1px solid #efefef;
                        background-color: #ffffff;
                    }
                `}
            </style>
            <Col md="12">
                <Card>
                    <CardBody>
                        <AdvanceServerSide
                            tableName={"Campaign Details"}
                            tableCol={columns}
                            data={allCampaigns}
                            isLoading={isLoading}
                            count={count}
                            advanceFilter={true}
                            getData={getAllThemes}
                            create={true}
                            createLink={"/merchant/Flash_Accounts/settings/"}
                            createText={"Create Campaign"}
                            selectableRows={true}
                            selectedRows={checkedThemes}
                            setSelectedRows={setCheckedThemes}
                            deleteContent={deleteContent}
                        />
                    </CardBody>
                </Card>
            </Col>

            <Modal isOpen={deleteModal} onClick={() => setDeleteModal(!deleteModal)} toggle={() => setDeleteModal(!deleteModal)}>
                <ModalBody>
                    <span className="position-absolute top-0 end-0" style={{ cursor: 'pointer', padding: "0.25rem" }} onClick={() => setDeleteModal(!deleteModal)}>
                        <X size={17.5} />
                    </span>
                        Are you sure you want to delete this theme 
                    <div className="mt-2 d-flex gap-3 justify-content-end align-items-center">
                        <button className="btn btn-outline-primary" onClick={() => deleteCampagin()}>Delete</button>
                    </div>
                </ModalBody>
            </Modal>
        </Row>
    )
}

export default Campaign