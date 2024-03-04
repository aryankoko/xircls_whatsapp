import React from 'react'
import { Card, CardBody } from 'reactstrap'
import { GoDotFill } from "react-icons/go"
import { Link } from 'react-router-dom'
import { FiArrowUpRight } from 'react-icons/fi'

export default function Price_Card({ data, isFeature }) {
    return (
        <Card className='shadow-none border'>
            <CardBody className='position-relative d-flex flex-column  justify-content-between ' >
                <div>
                    {
                        data.high ? <h3 className=' fw-lig px-2 fs-3 position-absolute end-0 me-2 rounded-2 ' style={{ padding: "2px 8px", border: "solid 1px black", color: "black" }}>{data.high}</h3> : ""
                    }
                    <h1 className='fs-1 main-heading mt-3 ms-1' >{data.head}</h1>
                    <div className='d-flex align-items-center ms-1 mt-2 '>
                        <div className='   position-relative '>
                            <span className='position-absolute top-0 fw-bolder'> &#36; </span>
                            <h1 className='ms-1  display-5 main-heading ' style={{ fontWeight: "700" }}>{data.value}</h1>
                        </div>
                        <h1 className=' mt-1 fs-3 main-heading' style={{ marginLeft: "3px" }}>/month</h1>
                    </div>
                    <h5 className='ms-2 text-black mb-2 d-none'>{data.subValue}</h5>

                    <hr />
                    <h5 className='ms-1 mt-2 text-black'>{data.listHead}</h5>
                    <div className='ms-1 d-flex flex-column mt-1 gap-1'>
                        {
                            isFeature && <a target='_blank' href='/products/superleadz/features/' className='d-flex align-items-center text-success' style={{ gap: "5px" }}><GoDotFill color="#afafaf" /> <h3 className='m-0 fs-4 text-'>All Features</h3><FiArrowUpRight color="#afafaf" size={17} style={{ marginLeft: "-3px" }} /></a>
                        }

                        {
                            data.items.map((list) => (
                                <div className='d-flex align-items-center' style={{ gap: "5px" }}><GoDotFill color="#afafaf" /> <h3 className='m-0 fs-4 text-black'>{list}</h3></div>
                            ))
                        }
                    </div>
                </div>

                <a className='mt-3 w-100  btn border-black fs-3  main-btn-dark fw-lig ' style={{ padding: "6px" }} target='_blank' href='https://apps.shopify.com/superleadz-by-xircls'>{data.button}</a>
            </CardBody>
        </Card>
    )
}