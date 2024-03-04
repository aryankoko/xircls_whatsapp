import React from 'react'
import { Spinner } from 'reactstrap'
import MomentTime from '../../Components/Time-Moment/MomentTime'

const NewsFeed = ({ isLoading, graphData }) => {
  return (
    <>
        <ul className="py-1 m-0" style={{ listStyle: 'none' }}>
            {
                isLoading ? <div className='d-flex justify-content-center align-items-center'>
                    <Spinner size={'40px'} />
                </div> : graphData?.campaign_alerts?.length !== 0 ? graphData?.campaign_alerts?.map((ele, key) => {
                    let color
                    let heading
                    if (ele?.event_type === 'NEW_PART') {
                        color = 'info'
                        heading = 'New Partner Alert'
                    } else if (ele?.event_type === 'INV_REC') {
                        color = 'warning'
                        heading = 'Invite Recieved'
                    } else if (ele?.event_type === 'INV_SNT') {
                        color = 'success'
                        heading = 'Invite Sent'
                    }

                    return (
                        <li key={key} className="position-relative px-2 pb-2" style={{ borderLeft: '0.5px dotted black' }}>
                            <span className={`position-absolute rounded-pill bg-${color}`} style={{ width: 14, height: 14, top: 0, left: 0, transform: 'translate(-7px, 2.5px)' }}></span>
                            <h5 className="d-flex justify-content-between">{heading}<span className="fw-normal text-secondary" style={{ fontSize: '0.95rem' }}><MomentTime time={ele?.created_at} format={'YYYY/MM/DD, hh:mm'} /></span></h5>
                            <p>{ele?.log_text}</p>
                            <div className="d-flex align-items-center">
                                <a href={'#'}><img src={`${ele?.outlet_who_fired_event?.outlet_logo}`} className="rounded-pill" width={50} style={{ aspectRatio: '1' }} alt="logo" /></a>
                                <p className="mb-0 ms-2">{ele?.company?.company_name}</p>
                            </div>
                        </li>
                    )
                }) : <h5 className='mt-1'>No notification alerts to show</h5>
            }
        </ul>
    </>
  )
}

export default NewsFeed