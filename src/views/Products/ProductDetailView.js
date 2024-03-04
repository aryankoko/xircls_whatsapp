import React, { useEffect, useState } from 'react'
import { Card, CardBody, Col, Row } from 'reactstrap'
import { getReq } from '../../assets/auth/jwtService'
import { useParams } from 'react-router-dom'
import MomentTime from '../Components/Time-Moment/MomentTime'
import Spinner from '../Components/DataTable/Spinner'

const ProductDetailView = () => {

    const { id } = useParams()
    const [data, setdata] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const getData = () => {
        getReq("singleProductData", `?counter=${id}`)
        .then((resp) => {
            setdata(resp.data.data.products)
            setIsLoading(false)
        })
        .catch((error) => {
            console.log(error)
            setIsLoading(false)
        })
    }

    useEffect(() => {
        getData()
    }, [])

  return (
   <>
    <Row>
        <Col sm='12'>
            <Card>
                <CardBody>
                    <h4>Product View</h4>
                </CardBody>
            </Card>
        </Col>
        
    </Row>
    <Row className='match-height'>
        <Col md="4">
            <Card>
                <CardBody className='text-center position-relative'>
                    {
                        isLoading ? <>
                            <div className='text-center'>
                                <Spinner size="40px" />
                            </div>
                        </> : <>
                            <span
                                style={{
                                position: "absolute",
                                top: 15,
                                right: 15,
                                backgroundColor: "RGBA(25,135,84,var(--bs-bg-opacity,1)) !important"
                                }}
                                className="badge badge-light-success"
                            >
                                Active
                            </span>
                            <img className="card-img-top rounded" style={{width: '200px', marginTop: '25px'}} src={data?.image.src} />
                            <h2 className='mt-2'>{data?.title}</h2>
                        </>
                    }
                </CardBody>
            </Card>
        </Col>
        <Col md="8">
            <Card>
                <CardBody className='position-relative'>
                    <div className="desc">
                        {
                            isLoading ? <>
                                <div className='text-center'>
                                    <Spinner size="40px" />
                                </div>
                            </> : <div dangerouslySetInnerHTML={{__html: data?.body_html}} />
                        }
                    </div>

                    <div className="mt-2">
                        <h5>Product type: {data?.product_type}</h5>
                    </div>

                    <div className="mt-2">
                        <h5>Product vendor: {data?.vendor}</h5>

                    </div>

                    <div className="mt-2" style={{
                        position: "absolute",
                        top: 0,
                        right: '30px'
                        }}>
                        <h5>Published at:  <MomentTime time={data?.created_at} format={'YYYY-MM-DD, hh:mm'} /></h5>
                    </div>
                
                </CardBody>
            </Card>
        </Col>
    </Row>
    <Row>
        <Col md='12'>
            <Card>
                <CardBody>
                    <h4>Variants</h4>
                    <hr />
                    <Row>
                        {
                            isLoading ? <>
                                <div className='text-center'>
                                    <Spinner size="40px" />
                                </div>
                            </> : data?.variants.map((curElem) => {
                                return <>
                                <Col md='4'>
                                    <Card className='border rounded'>
                                        <CardBody>
                                            <h5 className='mb-1'><b>Name</b>: {curElem.title}</h5>
                                            <h5 className='mb-1'><b>Price</b>: {curElem.price}</h5>
                                            <h5 className='mb-1'><b>Sku</b>: {curElem.sku}</h5>
                                            <h5 className='mb-1'><b>Inventory Quantity</b>: {curElem.inventory_quantity}</h5>
                                        </CardBody>
                                    </Card>
                                </Col>
                                </>
                            })
                        }
                    </Row>
                </CardBody>
            </Card>
            
        </Col>
    </Row>
   </>
  )
}

export default ProductDetailView