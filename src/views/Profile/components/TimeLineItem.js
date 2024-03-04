import React from 'react' 
import moment from 'moment' 

const TimelineItem = ({ heading, timestamp, text, logoSrc, name, timelineTitle, timelineMeta, timelineText }) => {
  return (
    <>
      <div className="col-1">
        <li className="position-relative px-3 pb-3" style={{ borderLeft: '0.5px dotted black' }}>
          <span className={`position-absolute rounded-pill bg-success`} style={{ width: 14, height: 14, top: 0, left: 0, transform: 'translate(-7px, 2.5px)' }}></span>
          <h5 className="d-flex justify-content-between">
            {heading}<span className="fw-normal text-secondary" style={{ fontSize: '0.95rem' }}>{timestamp}</span>
          </h5>
          <p>{text}</p>
          <div className="d-flex align-items-center">
            <a href={'#'}><img src={logoSrc} className="rounded-pill" width={50} style={{ aspectRatio: '1' }} alt="logo" /></a>
            <p className="mb-0 ms-2">{name}</p>
          </div>
        </li>
      </div>
      <div className='col-11'>
        <div className="">
          <div className="d-flex justify-content-between align-center flex-wrap gap-2 mb-1">
            <span className=" h5 app-timeline-title">{timelineTitle}</span>
            <small className="app-timeline-meta">{timelineMeta}</small>
          </div>
          <p className="app-timeline-text mb-2">{timelineText}</p>
        </div>
      </div>
    </>
  ) 
} 