import React, { useState } from 'react'
import { Card, CardBody, Container, Row } from 'react-bootstrap'
import {
    Accordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem
} from 'reactstrap'

// imgs
import verify from './img/verify.png'

export default function WhatsApp() {
    const [open, setOpen] = useState('1')
    const toggle = (id) => {
        if (open === id) {
            setOpen()
        } else {
            setOpen(id)
        }
    }
    return (
        <Container>
            <style>
                {`
    .numDiv{
        width: 30px;
         height: 30px;
          background: #a5a5a5
    }
    `}
            </style>
            <Card>
                <CardBody>
                    <h3>Start Selling on WhatsApp</h3>
                </CardBody>
            </Card>

            <Card className='border-0'>
                <CardBody >
                    <Accordion open={open} toggle={toggle} className='d-flex flex-column  gap-2 '>
                        <AccordionItem className='border px-2 rounded-2 ' style={{ padding: "5px 0" }}>
                            <AccordionHeader targetId="1" className=''>  <div className='numDiv d-flex justify-content-center  align-items-center rounded-5 text-white me-1 fs-5' >1</div>  <div className="m-0 fs-4">Add products to your Whatsapp Store</div></AccordionHeader>
                            <AccordionBody accordionId="1" className='ms-2'>
                                <div className='d-flex '>
                                    <div>A.</div>
                                    <div className='d-flex justify-content-between w-100'>
                                        <div className='ms-1'>
                                            <h1 className='fs-5 m-0'>Provide Compliance Info</h1>
                                            <p className='fs-6 m-0'>This will appear in your WhatsApp Profile</p>
                                        </div>
                                        <div className='text-end'>
                                            <div className='d-flex '>
                                                <img src={verify} width={20} alt="" />
                                                <h6 className='fs-5 m-0 ms-1'>Submitted</h6>
                                            </div>
                                            <p className='fs-6 m-0'>update info</p>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className='d-flex '>
                                    <div>A.</div>
                                    <div className='d-flex justify-content-between w-100'>
                                        <div className='ms-1'>
                                            <h1 className='fs-5 m-0'>Create FB Catalog with Shopify Products</h1>
                                            <p className='fs-6 m-0'>Your Shopify products should be available to the Interakt Sales Channel</p>
                                        </div>
                                        <div className='text-end'>
                                            <div className='d-flex '>
                                                <img src={verify} width={20} alt="" />
                                                <h6 className='fs-5 m-0 ms-1'>whats  store ready</h6>
                                            </div>
                                            <p className='fs-6 m-0'>Cksconnect Cataco</p>
                                        </div>
                                    </div>
                                </div>
                            </AccordionBody>
                        </AccordionItem>


                    </Accordion>
                </CardBody>
            </Card>

        </Container>
    )
}
