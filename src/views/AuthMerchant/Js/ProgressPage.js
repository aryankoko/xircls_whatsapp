import React, { useState } from "react"
import { Check, PlusCircle } from "react-feather"
import { Container, Card, CardBody, Row, Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap'
import '../Css/ProgressPage.css'

const ProgressPage = () => {

    const [open, setOpen] = useState('')
    const [open2, setOpen2] = useState('')
    const [open3, setOpen3] = useState('')
    const [open4, setOpen4] = useState('')

    const toggle = (id) => {
        if (open === id) {
            setOpen()
        } else {
            setOpen(id)
        }
    }

    const toggle2 = (id) => {
        if (open2 === id) {
            setOpen2()
        } else {
            setOpen2(id)
        }
    }

    const toggle3 = (id) => {
        if (open3 === id) {
            setOpen3()
        } else {
            setOpen3(id)
        }
    }
    const toggle4 = (id) => {
        if (open4 === id) {
            setOpen4()
        } else {
            setOpen4(id)
        }
    }

    return (
        <>
            <Container fluid className="progress-page px-0">
                <Card>
                    <CardBody>
                        <button className="btn btn-outline-primary mb-1">Do This Later</button>
                        <p className="mb-0">You're <span className="text-info cursor-pointer">only a few minutes away</span> from going live</p>
                        <p className="mb-0">Complete your Outlet Profile and begin building your network</p>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <Container fluid>
                            <Row className="mb-1">
                                <Accordion open={open} toggle={toggle}>
                                    <AccordionItem>
                                        <AccordionHeader className="border rounded-top mt-2 px-1 cursor-pointer" targetId="1">
                                            <div className="d-flex justify-content-between w-100">
                                                <div className="d-flex align-items-center gap-2">
                                                    <PlusCircle color={'#7367f0'} size={20} />
                                                    <h5 className="d-flex align-items-center mb-0 text-primary"> 1) Add Company</h5>
                                                </div>
                                                <div className="mb-0 fs-6">
                                                    <span className="text-success" style={{ textShadow: '0px 0px 20px var(--bs-green)' }}>Done</span>
                                                </div>
                                            </div>
                                        </AccordionHeader>
                                        <AccordionBody className="border rounded-bottom" accordionId="1">
                                            <div className="d-flex justify-content-between w-100 p-1">
                                                <p className="mb-0 text-primary">Company Profile</p>
                                                <div style={{ width: '20px', height: '20px' }} className="me-2 d-flex justify-content-center align-items-center rounded-circle bg-success text-white fw-bold">
                                                    <Check size={12} />
                                                </div>
                                            </div>
                                        </AccordionBody>
                                    </AccordionItem>
                                </Accordion>
                            </Row>
                            <Row className="mb-2">
                                <Accordion open={open2} toggle={toggle2}>
                                    <AccordionItem>
                                        <AccordionHeader className="border rounded-top mt-2 px-1 cursor-pointer" targetId="2">
                                            <div className="d-flex justify-content-between w-100">
                                                <div className="d-flex align-items-center gap-2">
                                                    <PlusCircle color={'#7367f0'} size={20} />
                                                    <h5 className="d-flex align-items-center mb-0 text-primary"> 2) Outlet Profile</h5>
                                                </div>
                                                <div className="mb-0 fs-6">
                                                    <span className="text-success" style={{ textShadow: '0px 0px 20px var(--bs-green)' }}>Done</span>
                                                </div>
                                            </div>
                                        </AccordionHeader>
                                        <AccordionBody className="border rounded-bottom" accordionId="2">
                                            <div className="d-flex justify-content-between w-100 p-1">
                                                <p className="mb-0 text-primary">Basic Info</p>
                                                <div style={{ width: '20px', height: '20px' }} className="me-2 d-flex justify-content-center align-items-center rounded-circle bg-success text-white fw-bold">
                                                    <Check size={12} />
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-between w-100 p-1 border-top">
                                                <p className="mb-0 text-primary">Outlet Type</p>
                                                <div style={{ width: '20px', height: '20px' }} className="me-2 d-flex justify-content-center align-items-center rounded-circle bg-success text-white fw-bold">
                                                    <Check size={12} />
                                                </div>
                                            </div>
                                        </AccordionBody>
                                    </AccordionItem>
                                </Accordion>
                            </Row>
                            <Row className="mb-2">
                                <Accordion open={open3} toggle={toggle3}>
                                    <AccordionItem>
                                        <AccordionHeader className="border rounded-top mt-2 px-1 cursor-pointer" targetId="3">
                                            <div className="d-flex justify-content-between w-100">
                                                <div className="d-flex align-items-center gap-2">
                                                    <PlusCircle color={'#7367f0'} size={20} />
                                                    <h5 className="d-flex align-items-center mb-0 text-primary"> 3) Create your network</h5>
                                                </div>
                                                <div className="mb-0 fs-6">
                                                    <span className="text-success" style={{ textShadow: '0px 0px 20px var(--bs-green)' }}>Done</span>
                                                </div>
                                            </div>
                                        </AccordionHeader>
                                        <AccordionBody className="border rounded-bottom" accordionId="3">
                                            <div className="p-2">
                                                <p>Invite merchants you know. Add partners through network.</p>
                                                <div className="d-flex gap-1">
                                                    <button className="btn btn-primary">Create your network</button>
                                                    <button className="btn btn-primary">Skip</button>
                                                </div>
                                            </div>
                                        </AccordionBody>
                                    </AccordionItem>
                                </Accordion>
                            </Row>
                            <Row className="mb-2">
                                <Accordion open={open4} toggle={toggle4}>
                                    <AccordionItem>
                                        <AccordionHeader className="border rounded-top mt-2 px-1 cursor-pointer" targetId="4">
                                            <div className="d-flex justify-content-between w-100">
                                                <div className="d-flex align-items-center gap-2">
                                                    <PlusCircle color={'#7367f0'} size={20} />
                                                    <h5 className="d-flex align-items-center mb-0 text-primary"> 4) Start Campaign</h5>
                                                </div>
                                                <div className="mb-0 fs-6">
                                                    <span className="text-success" style={{ textShadow: '0px 0px 20px var(--bs-green)' }}>Done</span>
                                                </div>
                                            </div>
                                        </AccordionHeader>
                                        <AccordionBody className="border rounded-bottom" accordionId="4">
                                            <div className="px-1 py-2">
                                                <p className="mb-0 text-primary">Lets get Started</p>
                                            </div>
                                        </AccordionBody>
                                    </AccordionItem>
                                </Accordion>
                            </Row>
                        </Container>
                    </CardBody>
                </Card>
            </Container>
        </>
    )
}

export default ProgressPage