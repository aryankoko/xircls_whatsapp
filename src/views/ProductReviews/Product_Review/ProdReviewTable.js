import { React } from 'react'
import { BiUpvote, BiDownvote } from "react-icons/bi"
import DataTable from 'react-data-table-component'
// import { tableResponsive } from './../../tables/reactstrap/TableSourceCode'
import { Link } from 'react-router-dom'
import Avatar from '@components/avatar'
import { FaStar } from 'react-icons/fa'
// import { store } from '@store/store'
// import { getUser, deleteUser } from '../store'
import { MoreVertical, FileText, Trash2, ChevronDown } from 'react-feather'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
// import apiData from "@src/@core/auth/api/api.json"

const ProdReviewTable = (props) => {
    const { reviewsArray, authorized, setAuthorized, setSelectedRows } = props

    // const statusObj = {
    //     pending: 'light-warning',
    //     published: 'light-success'
    // }

    const apiData = {d_ngrok: ""}

    const renderClient = row => {
        if (row.avatar) {
            return <Avatar alt="Gisela Leppard" src="/static/images/avatar/1.jpg" width='32' height='32' />
        } else {
            return (
                <Avatar
                    initials
                    className='me-1'
                    color={row.avatarColor || 'light-primary'}
                    content={row.first_name || 'Gisela Leppard'}
                />
            )
        }
    }

    const handleAuthorizeReview = async (review_id, status) => {
        const form_data = new FormData()
        form_data.append("shopDomain", "quickstart-6d4c5332.myshopify.com")
        form_data.append("shop", "Quickstart (6d4c5332)")
        try {
            const response = await fetch(
                `${apiData.d_ngrok}/review/authorize/${review_id}/`,
                {
                    method: "POST",
                    headers: {
                        "Authorization-Action": status ? "unauthorize" : "authorize"
                    },
                    body: form_data
                }
            )
            // window.location.reload(true)
            if (!response.ok) {
                throw new Error(`Authorization failed due to:${response.status} `)
            }
            console.log("Authorization successful!")
            setAuthorized(!authorized)
        } catch (error) {
            console.error("Authorizing error: ", error)
        }
    }

    const handleDeleteReview = async (review_id) => {
        try {
            const response = await fetch(
                `${apiData.d_ngrok}/review/delete/${review_id}/`,
                {
                    method: "POST"
                }
            )
            if (!response.ok) {
                throw new Error(`Authorization failed due to:${response.status} `)
            }
            console.log("Delete successful!")
        } catch (error) {
            console.error("Authorizing error: ", error)
        }
    }

    const Column = [
        {
            name: <span className='fw-bold h5'>PRODUCT</span>,
            width: '18rem',
            sortable: true,
            sortField: 'product',
            selector: row => row.product,
            cell: row => (
                <div className=' my-1 d-flex align-items-center gap-1'>
                    <img src={row.productImg} alt="" style={{ width: '20%', height: "auto" }} />
                    <div  >
                        <span className='fw-medium' style={{ fontSize: '14px' }}>{row.product}</span>
                        <small className='text-muted mb-0 w-75'>{row.productDesc}</small>
                    </div>
                </div>
            )
        },
        {
            name: <span className='fw-bold h5'>REVIEWER</span>,
            sortable: true,
            width: "18rem",
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
                            <span className='fw-medium' style={{ fontSize: '14px', color: "#7367f0" }}>{row.first_name} {row.last_name}</span>
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
            width: '250px',
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
            selector: row => row.state,
            cell: row => (
                row.state ? (
                    <p className=" text-success" style={{ width: "9rem" }}>Approved</p>
                ) : (
                    <p className=" text-danger" style={{ width: "9rem" }}>Pending</p>
                )
            )
        },
        {
            name: <span className='fw-bold h5'>Votes</span>,
            sortable: true,
            sortField: 'votes',
            selector: row => row.votes,
            cell: row => (
                <div className=' d-flex justify-content-between align-items-center gap-1'>
                    {/* {row.likes.length + row.dislikes.length} */}
                    <BiUpvote size={20} color='green' />
                    {row.likes}
                    <BiDownvote size={20} color='red' />
                    {row.dislikes}
                </div>
            )
        },
        {
            name: <span className='fw-bold h5'>ACTION</span>,
            width: "7rem",
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
                                onClick={() => handleAuthorizeReview(row.id, row.state)}
                            >
                                <FileText size={14} className='me-50' />
                                <span className='align-middle'>{row.state ? "Unauthorise" : "Authorise"}</span>
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
                                    handleDeleteReview(row.id)
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

    // useEffect(() => {
    //     function formatDate(dateString) {
    //         const options = { year: "numeric", month: "short", day: "2-digit" }
    //         const formattedDate = new Date(dateString).toLocaleDateString(
    //             undefined,
    //             options
    //         )
    //         return formattedDate
    //     }
    //     fetch(`${apiData.d_ngrok}/router/reviews/`, {
    //         method: 'GET',
    //         headers: {
    //             'ngrok-skip-browser-warning': true,
    //         }
    //     })
    //         .then((resp) => {
    //             if (!resp.ok) {
    //                 throw new Error('Network response was not ok')
    //             }
    //             return resp.text()
    //         })
    //         .then(data => {
    //             // console.log("reviews", data)

    //             const jsonData = JSON.parse(data)
    //             const reviewList = jsonData?.reviews?.map(ele => {
    //                 return {
    //                     name: ele.customer.name,
    //                     product: ele.product_name,
    //                     productImg: ele.product_image_url,
    //                     productDesc: ele.product_description,
    //                     state: ele.published,
    //                     votes: ele?.votes,
    //                     id: ele.id,
    //                     email: ele.customer.email,
    //                     date: formatDate(ele.created_at),
    //                     rating: ele.rating,
    //                     review: ele.review,
    //                     reviewdesc: ele.review,
    //                     likes: ele.total_likes,
    //                     dislikes: ele.total_dislikes
    //                 }

    //             })
    //             setReviewsArray({ reviews: reviewList.reverse(), filerReviews: reviewList.reverse() })
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //         })
    // }, [authorized])

    // useEffect(() => {
    //     if (reviewType === "All reviews") {
    //         setReviewsArray({ ...reviewsArray, filerReviews: reviewsArray.reviews })
    //     } else if (reviewType === "Published") {
    //         const fList = reviewsArray.reviews?.filter(ele => {
    //             return ele.state === true
    //         })
    //         setReviewsArray({ ...reviewsArray, filerReviews: fList })
    //     } else {
    //         const fList = reviewsArray.reviews?.filter(ele => {
    //             return ele.state === false
    //         })
    //         setReviewsArray({ ...reviewsArray, filerReviews: fList })
    //     }
    // }, [reviewType])    

    return (
        <>
            <div className="dataTableContainer">
                <DataTable
                    width="100%"
                    data={reviewsArray.filerReviews.reverse()}
                    columns={Column}
                    // customStyles={customStyles}
                    className='react-dataTable'
                    sortIcon={<ChevronDown size={10} />}
                    selectableRows
                    onSelectedRowsChange={(selectedRows) => setSelectedRows(selectedRows)}
                    paginationRowsPerPageOptions={[10, 25, 50, 100]}
                    tableResponsive
                />
            </div>
        </>
    )
}

export default ProdReviewTable