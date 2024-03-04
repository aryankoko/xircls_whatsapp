import React, { useContext, useEffect, useState } from "react"
import { Container, Card, CardBody, Row, Col } from "reactstrap"
import Select from 'react-select'
import { PluginHeader } from "../PluginContext"
import { getReq, postReq } from "../../../assets/auth/jwtService"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

const Remarketing = () => {
    const [checked, setChecked] = useState(false)
    const { setHeader } = useContext(PluginHeader)

    const { register, handleSubmit, setValue } = useForm()

    const onSubmit = (data) => {
        console.log(data.remarketing)
        const formData = new FormData()
        Object.entries(data.remarketing).map(([key, value]) => formData.append(key, value))
        postReq("remarketing", formData)
        .then((resp) => {
            console.log(resp)
            toast.success('SuccessFully Saved')
        })
        .catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        setHeader('Settings - Get back All You Spend')
        getReq('remarketing').then(response => {
            const values = {}
            
            Object.entries(response.data.data?.remarketing_setting).map(([key, value]) => {
                if (key === 'email_reminders' || key === 'email_reminders_subject') {
                    Object.entries(value).map(([rem, remValue]) => {
                        values[rem] = remValue
                    })
                }
                if (key === 'is_remarketing') {
                    values[key] = value
                    setChecked(value)
                }
            })

            setChecked(response.data.data.remarketing_setting.email_remarketing_active)

            setValue('remarketing', values)
        }).catch(error => console.log(error))
    }, [])
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Container fluid className="plugin">
                <Row>
                    <div>
                        <h4>ReMarketing Setting.</h4>
                    </div>
                </Row>
                <br />
                <Row className="mb-3">
                    <div>
                        <div className="form-check-success form-switch">
                            <input {...register('remarketing.is_remarketing')} checked={checked} className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" onChange={(e) => setChecked(e.target.checked)} />
                            <label className="form-check-label" htmlFor="flexSwitchCheckChecked" style={{ marginLeft: '10px' }}>Email ReMarketing</label>
                        </div>
                    </div>
                </Row>
                {/* <Row className={`${checked ? 'd-flex' : 'd-none'}`}>
                    <div className="w-50" >
                        <label htmlFor="">Select Duration</label>
                        <Select options={[
                            { value: 'country 1', label: 'Once In A Day' },
                            { value: 'country 2', label: 'Once In 3 Days' },
                            { value: 'country 3', label: 'Once In 7 Days' },
                            { value: 'country 4', label: 'Once In 15 Days' },
                            { value: 'country 5', label: 'Once In A Month' }
                        ]}
                            closeMenuOnSelect={true}
                            placeholder={'Once In A Day'}
                        />
                    </div>
                </Row> */}
                <Row className={`${checked ? 'd-flex' : 'd-none'}`}>
                    <Col md='4'>
                        <Card>
                            <CardBody className="p-2 border rounded">
                                <div className="mb-3">
                                    <label htmlFor="" >Reminder 1</label>
                                    <input {...register(`remarketing.rem_1`)} type="text" className="form-control" placeholder="1" />
                                </div>
                                <div>
                                    <label htmlFor="">Subject for Reminder 1</label>
                                    <input {...register('remarketing.rem_sub_1')} type="text" className="form-control" placeholder=" Get the most out of your recent purchase from us! " />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md='4' className="">
                        <Card>
                            <CardBody className="p-2 border rounded">
                                <div className="mb-3">
                                    <label htmlFor="">Reminder 2</label>
                                    <input {...register('remarketing.rem_2')} type="text" className="form-control" placeholder="2" />
                                </div>
                                <div>
                                    <label htmlFor="">Subject for Reminder 2</label>
                                    <input {...register('remarketing.rem_sub_2')} type="text" className="form-control" placeholder=" Your gifts are waiting for you!" />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md='4' className="">
                        <Card>
                            <CardBody className="p-2 border rounded">
                                <div className="mb-3">
                                    <label htmlFor="">Reminder 3</label>
                                    <input {...register('remarketing.rem_3')} type="text" className="form-control" placeholder="3" />
                                </div>
                                <div>
                                    <label htmlFor="">Subject for Reminder 3</label>
                                    <input  {...register('remarketing.rem_sub_3')} type="text" className="form-control" placeholder=" We don't want you to miss out on your gifts!" />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row className="mt-2">
                    <div className="d-flex justify-content-between">
                        <div>
                            <button type="button" className="btn btn-primary mx-1">Back</button>
                        </div>
                        <div>
                            <button type="submit" className="btn btn-primary">Save</button>
                            <button type="submit" className="btn btn-primary" style={{ marginLeft: '5px' }}>Save & Close</button>
                        </div>
                    </div>
                </Row>
            </Container>
        </form>
    )
}

export default Remarketing