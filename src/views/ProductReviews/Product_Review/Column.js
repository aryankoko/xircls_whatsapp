// ** React Imports
import { Link } from 'react-router-dom'
// import DataTable from 'react-data-table-component'
// import ProdReviewTable from './ProdReviewTable'

// ** Custom Components
import Avatar from '@components/avatar'
// import AvatarImg from './12-small.png'
import img from './product-9.png'

import { FaStar } from 'react-icons/fa'

// ** Store & Actions
// import { store } from '@store/store'
// import { getUser, deleteUser } from '../store'

// ** Icons Imports
import { MoreVertical, FileText, Trash2, Archive } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

import apiData from "@src/@core/auth/api/api.json"

const statusObj = {
    pending: 'light-warning',
    published: 'light-success'
}

const handleAuthorizeReview = async (review_id) => {
    console.log("review_id", review_id)
    try {
        const response = await fetch(
            `${apiData.d_ngrok}/review/authorize/${review_id}/`,
            {
                method: "POST",
            }
        );
        // window.location.reload(true)
        if (!response.ok) {
            throw new Error(`Authorization failed due to:${response.status} `);
        }
        console.log("Authorization successful!");
    } catch (error) {
        console.error("Authorizing error: ", error);
    }
}

const renderClient = row => {
    if (row.avatar) {
        return <Avatar alt="Gisela Leppard" src="/static/images/avatar/1.jpg" width='32' height='32' />
        // return <img src={AvatarImg} className='me-1' width='32' height='32'/>
    } else {
        return (
            <Avatar
                initials
                className='me-1'
                color={row.avatarColor || 'light-primary'}
                content={row.fullName || 'Gisela Leppard'}
            />
        )
    }
}

export const Column = [
    {
        name: <span className='fw-bold h5'>PRODUCT</span>,
        width: '20rem',
        sortable: true,
        sortField: 'product',
        selector: row => row.product,
        cell: row => (
            <div className=' my-1'>
                <img src={row.productImg} alt="" style={{ width: '20%', height: "auto" }} />
                <div  >
                    <Link
                        to={`/apps/user/view/${row.id}`}
                        className='user_name text-truncate text-body'
                    // onClick={() => store.dispatch(getUser(row.id))}
                    >
                        <span className='fw-medium' style={{ fontSize: '14px' }}>{row.product}</span>
                    </Link>
                    <small className='text-muted mb-0 w-75'>{row.productDesc}</small>
                </div>
            </div>
        )
    },
    {
        name: <span className='fw-bold h5'>REVIEWER</span>,
        sortable: true,
        width: "16rem",
        sortField: 'reviewer',
        selector: row => row.reviewer,
        cell: row => (
            <div className='d-flex justify-content-left align-items-center'>
                {renderClient(row)}
                <div className='d-flex flex-column'>
                    <Link
                        to={`/apps/user/view/${row.id}`}
                        className='user_name text-truncate text-body'
                    // onClick={() => store.dispatch(getUser(row.id))}
                    >
                        <span className='fw-medium' style={{ fontSize: '14px', color: "#7367f0" }}>{row.name}</span>
                    </Link>
                    <small className='text-truncate text-muted mb-0'>{row.email}</small>
                </div>
            </div>

        )
    },
    {
        name: <span className='fw-bold h5'>REVIEW</span>,
        sortable: true,
        sortField: 'rating',
        // width: '10rem',
        selector: row => row.review,
        cell: row => (
            <div className='d-flex flex-column mt-1'>
                <div style={{ marginBottom: '5px' }}>
                    {Array.from({ length: row.rating }).map((_, index) => (
                        <FaStar key={index} size={21} color='#ff9f43' />
                    ))}
                    {Array.from({ length: 5 - row.rating }).map((_, index) => (
                        <FaStar key={index} size={21} color='#4b465c33' />
                    ))}
                </div>
                <p className="h6" style={{ marginBottom: '5px', fontSize: "14px" }}>{row.review}</p>

            </div>
        )

    },
    {
        name: <span className='fw-bold h5'>DATE</span>,
        sortable: true,
        // width: "15rem",
        selector: row => row.date,
        sortField: 'dater',
        cell: row => (
            <span className='h5'>{row.date}</span>
        )
    },
    {
        name: <span className='fw-bold h5'>STATUS</span>,
        sortable: true,
        sortField: 'status',
        selector: row => row.status,
        cell: row => (
            row.status ? (
                <p className=" text-success" style={{ width: "9rem" }}>Approved</p>
            ) : (
                <p className=" text-danger" style={{ width: "9rem" }}>Pending</p>
            )
        )
    },
    {
        name: <span className='fw-bold h5'>ACTION</span>,
        width: '7rem',
        height: '7rem',
        cell: row => (
            <div className='column-action'>
                <UncontrolledDropdown>
                    <DropdownToggle tag='div' className='btn btn-sm'>
                        <MoreVertical size={14} className='cursor-pointer' />
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem
                            tag={Link}
                            className='w-100'
                            to={`/merchant/product-review`}
                            onClick={() => handleAuthorizeReview(row.id)}
                        >
                            <FileText size={14} className='me-50' />
                            <span className='align-middle'>Authorised</span>
                        </DropdownItem>
                        {/* <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
                            <Archive size={14} className='me-50' />
                            <span className='align-middle'>Edit</span>
                        </DropdownItem> */}
                        <DropdownItem
                            tag='a'
                            href='/'
                            className='w-100'
                            onClick={e => {
                                e.preventDefault()
                                // store.dispatch(deleteUser(row.id))
                            }}
                        >
                            <Trash2 size={14} className='me-50' />
                            <span className='align-middle'>Delete</span>
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </div>
        )
    }
]