import { useLayoutEffect, useRef, useState } from "react"
import { ArrowLeft, ChevronLeft, ChevronRight, Home, MoreHorizontal, Search, Trash } from "react-feather"
import { Link } from "react-router-dom"
import { Container, Row, Col, Card, CardBody } from "reactstrap"
import { NavTitleContext } from "../../Helper/Context"
import ExploreAll from "./ExploreAll"

const NewNetworkDashboard = () => {
    // const { setNavHeader } = useContext(NavTitleContext)
    const ref = useRef(0)
    const widthRef = useRef(0)
    const [heightCard, setHeightCard] = useState(0)
    const [widthCard, setWidthCard] = useState(0)

    const [showAll, setShowAll] = useState(false)

    const loop = [
        {
            image: "https://pbs.twimg.com/profile_images/1087257195782246400/iMmsIvvQ_400x400.jpg"
        },
        {
            image: "https://zeevector.com/wp-content/uploads/LOGO/PVR-Cinemas-Logo-PNG-HD-768x768.jpg"
        },
        {
            image: "https://entrackr.com/storage/2022/04/Bombay-shaving-company.jpg"
        },
        {
            image: "https://www.visa.com/images/merchantoffers/2021-09/1632294759697.Kapiva.png"
        },
        {
            image: "https://scontent.fbom26-2.fna.fbcdn.net/v/t1.6435-1/90626152_2495103007404627_1371845307762999296_n.jpg?stp=dst-jpg_p148x148&_nc_cat=111&ccb=1-7&_nc_sid=1eb0c7&_nc_ohc=yj8nVB_g4zoAX_qQlkG&_nc_ht=scontent.fbom26-2.fna&oh=00_AfAveBHOo0qo8q3AppS76SwXVa6ZsWKb7nkJUfV7uOgGJw&oe=645203D0"
        },
        {
            image: "https://scontent.fbom26-2.fna.fbcdn.net/v/t1.6435-1/90626152_2495103007404627_1371845307762999296_n.jpg?stp=dst-jpg_p148x148&_nc_cat=111&ccb=1-7&_nc_sid=1eb0c7&_nc_ohc=yj8nVB_g4zoAX_qQlkG&_nc_ht=scontent.fbom26-2.fna&oh=00_AfAveBHOo0qo8q3AppS76SwXVa6ZsWKb7nkJUfV7uOgGJw&oe=645203D0"
        },
        {
            image: "https://www.visa.com/images/merchantoffers/2021-09/1632294759697.Kapiva.png"
        },
        {
            image: "https://pbs.twimg.com/profile_images/1087257195782246400/iMmsIvvQ_400x400.jpg"
        },
        {
            image: ""
        },
        {
            image: "https://zeevector.com/wp-content/uploads/LOGO/PVR-Cinemas-Logo-PNG-HD-768x768.jpg"
        },
        {
            image: "https://entrackr.com/storage/2022/04/Bombay-shaving-company.jpg"
        },
        {
            image: ""
        },
        {
            image: "https://zeevector.com/wp-content/uploads/LOGO/PVR-Cinemas-Logo-PNG-HD-768x768.jpg"
        },
        {
            image: "https://www.visa.com/images/merchantoffers/2021-09/1632294759697.Kapiva.png"
        },
        {
            image: "https://pbs.twimg.com/profile_images/1087257195782246400/iMmsIvvQ_400x400.jpg"
        }
    ]

    useLayoutEffect(() => {
        setHeightCard(ref.current.offsetHeight)
        setWidthCard(widthRef.current.offsetWidth / 5)

        // const header =
        //     <div className="d-flex align-items-center gap-2">
        //         <Link to='/merchant/dashboard'><ArrowLeft color="black" size={25} /></Link><h1 style={{ margin: '0px', fontSize: '2.5rem', color: 'black' }}>Dashboard</h1>
        //     </div>
        // setNavHeader(header)
    }, [])

    return (
        <>
            <Container fluid className="new-network-dashboard">
                {!showAll && <Row>
                    <Col lg={12}>

                        <div className="d-flex justify-content-between align-items-center py-1">
                            <div>
                                <h2 style={{ color: 'black', fontWeight: 1000, margin: '0px' }}>Expand Your Network</h2>
                                <p>Discover your partner among some inspiring companies</p>
                            </div>
                            <div className="d-flex align-items-center justify-content-end gap-1">
                                <button style={{ color: '#000000', fontWeight: "bolder" }} onClick={() => setShowAll(true)} className="btn w-25 p-0">Explore all</button><input placeholder="Search" style={{ padding: '0.65rem 1rem', cursor: 'text' }} className="btn form-control rounded-pill border-dark w-50" />
                            </div>
                        </div>
                        <div ref={widthRef} className="carousel-container row row-cols-5 p-0">
                            {
                                loop.map((ele, i) => {
                                    if (i < 5) {
                                        return (
                                            <div key={i} className={`carousel-card col mb-3`} style={{ maxWidth: `${widthCard}px` }}>
                                                <div className="d-flex flex-column align-items-center position-relative">
                                                    <div className="d-flex justify-content-center align-items-center position-relative w-100">
                                                        <img width={'75%'} src={ele.image ? ele.image : 'https://media.cheggcdn.com/media/012/01218fc2-837d-497c-8f06-012e5d922ab9/phpwQqFlz'} alt="" className="mb-2" style={{ aspectRatio: '11/8', borderRadius: '1.25rem' }} />
                                                        {/* <img width={'80%'} src={ele.image} alt="" className="mb-2" style={{ aspectRatio: '11/8', borderRadius: '1.25rem', position: 'absolute', zIndex: '-1', opacity: '0.85', filter: 'blur(7.5px)' }} /> */}
                                                    </div>
                                                    <h5 className="text-center" style={{ color: 'black' }}>Lorem, ipsum dolor.</h5>
                                                    <p className="text-center" style={{ color: 'black', fontWeight: 'lighter' }}>Lorem, ipsum.</p>
                                                    <div className="position-absolute h-100 w-100" style={{ backgroundImage: `url(${ele.image ? ele.image : 'https://media.cheggcdn.com/media/012/01218fc2-837d-497c-8f06-012e5d922ab9/phpwQqFlz'})`, backgroundSize: 'cover', zIndex: '-1', opacity: '0.55', filter: 'blur(55px)', scale: '0.55' }}></div>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    </Col>
                    <Col lg={7}>
                        <div className="d-flex justify-content-between align-items-center py-1">
                            <h2 style={{ color: 'black', fontWeight: 1000, margin: '0px' }}>My Network <span style={{ verticalAlign: 'middle', fontSize: '0.85rem', color: '#376198' }}>(42 connections)</span></h2>
                            <div className="d-flex align-items-center justify-content-end px-3">
                                <button style={{ color: '#000000', fontWeight: "bolder" }} className="btn w-25 p-0">See all</button>
                                <input placeholder="Search" style={{ padding: '0.65rem 1rem', cursor: 'text' }} className="btn form-control rounded-pill border-dark w-50" />
                            </div>
                        </div>
                        <Container fluid className="ps-1 pe-0" style={{ height: `${3 * heightCard}px`, overflowY: 'scroll', overflowX: 'auto' }}>
                            <div ref={ref} className="row w-100 align-items-center" style={{ padding: '0.75rem 0px' }}>
                                <Col xs={8} className='d-flex align-items-center gap-2'>
                                    <img width={'30%'} src="https://m.media-amazon.com/images/S/abs-image-upload-na/6/AmazonStores/A21TJRUUN4KGV/8e2d63147b1fabc8b28e9429865fc222.w2389.h1676._CR357%2C0%2C1676%2C1676_SX200_.png" alt="" style={{ aspectRatio: '4/3', borderRadius: '1rem', boxShadow: '2.5px 2.5px 12.5px rgba(0,0,0,0.175)' }} />
                                    <div className="w-100">
                                        <h5 style={{ color: 'black' }}>Javinishka</h5>
                                        <p className="m-0" style={{ color: 'black', fontWeight: 'lighter' }}>Fashion Clothing Online Store</p>
                                    </div>
                                </Col>
                                <Col xs={4} className='d-flex justify-content-end gap-2' style={{ color: '#4a4a4a' }}>
                                    <button className="btn px-0" style={{ fontSize: '0.95rem' }}><Trash color="danger" fill="#ea5455" stroke="#ea5455" size={17.5} /></button>
                                    <button className="btn"><MoreHorizontal color="black" size={17.5} /></button>
                                </Col>
                            </div>
                            <div ref={ref} className="row w-100 align-items-center" style={{ padding: '0.75rem 0px' }}>
                                <Col xs={8} className='d-flex align-items-center gap-2'>
                                    <img width={'30%'} src="https://m.media-amazon.com/images/S/abs-image-upload-na/6/AmazonStores/A21TJRUUN4KGV/8e2d63147b1fabc8b28e9429865fc222.w2389.h1676._CR357%2C0%2C1676%2C1676_SX200_.png" alt="" style={{ aspectRatio: '4/3', borderRadius: '1rem', boxShadow: '2.5px 2.5px 12.5px rgba(0,0,0,0.175)' }} />
                                    <div className="w-100">
                                        <h5 style={{ color: 'black' }}>Javinishka</h5>
                                        <p className="m-0" style={{ color: 'black', fontWeight: 'lighter' }}>Fashion Clothing Online Store</p>
                                    </div>
                                </Col>
                                <Col xs={4} className='d-flex justify-content-end gap-2' style={{ color: '#4a4a4a' }}>
                                    <button className="btn px-0" style={{ fontSize: '0.95rem' }}><Trash color="danger" fill="#ea5455" stroke="#ea5455" size={17.5} /></button>
                                    <button className="btn"><MoreHorizontal color="black" size={17.5} /></button>
                                </Col>
                            </div>
                            <div ref={ref} className="row w-100 align-items-center" style={{ padding: '0.75rem 0px' }}>
                                <Col xs={8} className='d-flex align-items-center gap-2'>
                                    <img width={'30%'} src="https://m.media-amazon.com/images/S/abs-image-upload-na/6/AmazonStores/A21TJRUUN4KGV/8e2d63147b1fabc8b28e9429865fc222.w2389.h1676._CR357%2C0%2C1676%2C1676_SX200_.png" alt="" style={{ aspectRatio: '4/3', borderRadius: '1rem', boxShadow: '2.5px 2.5px 12.5px rgba(0,0,0,0.175)' }} />
                                    <div className="w-100">
                                        <h5 style={{ color: 'black' }}>Javinishka</h5>
                                        <p className="m-0" style={{ color: 'black', fontWeight: 'lighter' }}>Fashion Clothing Online Store</p>
                                    </div>
                                </Col>
                                <Col xs={4} className='d-flex justify-content-end gap-2' style={{ color: '#4a4a4a' }}>
                                    <button className="btn px-0" style={{ fontSize: '0.95rem' }}><Trash color="danger" fill="#ea5455" stroke="#ea5455" size={17.5} /></button>
                                    <button className="btn"><MoreHorizontal color="black" size={17.5} /></button>
                                </Col>
                            </div>
                            <div ref={ref} className="row w-100 align-items-center" style={{ padding: '0.75rem 0px' }}>
                                <Col xs={8} className='d-flex align-items-center gap-2'>
                                    <img width={'30%'} src="https://m.media-amazon.com/images/S/abs-image-upload-na/6/AmazonStores/A21TJRUUN4KGV/8e2d63147b1fabc8b28e9429865fc222.w2389.h1676._CR357%2C0%2C1676%2C1676_SX200_.png" alt="" style={{ aspectRatio: '4/3', borderRadius: '1rem', boxShadow: '2.5px 2.5px 12.5px rgba(0,0,0,0.175)' }} />
                                    <div className="w-100">
                                        <h5 style={{ color: 'black' }}>Javinishka</h5>
                                        <p className="m-0" style={{ color: 'black', fontWeight: 'lighter' }}>Fashion Clothing Online Store</p>
                                    </div>
                                </Col>
                                <Col xs={4} className='d-flex justify-content-end gap-2' style={{ color: '#4a4a4a' }}>
                                    <button className="btn px-0" style={{ fontSize: '0.95rem' }}><Trash color="danger" fill="#ea5455" stroke="#ea5455" size={17.5} /></button>
                                    <button className="btn"><MoreHorizontal color="black" size={17.5} /></button>
                                </Col>
                            </div>
                            <div ref={ref} className="row w-100 align-items-center" style={{ padding: '0.75rem 0px' }}>
                                <Col xs={8} className='d-flex align-items-center gap-2'>
                                    <img width={'30%'} src="https://m.media-amazon.com/images/S/abs-image-upload-na/6/AmazonStores/A21TJRUUN4KGV/8e2d63147b1fabc8b28e9429865fc222.w2389.h1676._CR357%2C0%2C1676%2C1676_SX200_.png" alt="" style={{ aspectRatio: '4/3', borderRadius: '1rem', boxShadow: '2.5px 2.5px 12.5px rgba(0,0,0,0.175)' }} />
                                    <div className="w-100">
                                        <h5 style={{ color: 'black' }}>Javinishka</h5>
                                        <p className="m-0" style={{ color: 'black', fontWeight: 'lighter' }}>Fashion Clothing Online Store</p>
                                    </div>
                                </Col>
                                <Col xs={4} className='d-flex justify-content-end gap-2' style={{ color: '#4a4a4a' }}>
                                    <button className="btn px-0" style={{ fontSize: '0.95rem' }}><Trash color="danger" fill="#ea5455" stroke="#ea5455" size={17.5} /></button>
                                    <button className="btn"><MoreHorizontal color="black" size={17.5} /></button>
                                </Col>
                            </div>
                            <div ref={ref} className="row w-100 align-items-center" style={{ padding: '0.75rem 0px' }}>
                                <Col xs={8} className='d-flex align-items-center gap-2'>
                                    <img width={'30%'} src="https://m.media-amazon.com/images/S/abs-image-upload-na/6/AmazonStores/A21TJRUUN4KGV/8e2d63147b1fabc8b28e9429865fc222.w2389.h1676._CR357%2C0%2C1676%2C1676_SX200_.png" alt="" style={{ aspectRatio: '4/3', borderRadius: '1rem', boxShadow: '2.5px 2.5px 12.5px rgba(0,0,0,0.175)' }} />
                                    <div className="w-100">
                                        <h5 style={{ color: 'black' }}>Javinishka</h5>
                                        <p className="m-0" style={{ color: 'black', fontWeight: 'lighter' }}>Fashion Clothing Online Store</p>
                                    </div>
                                </Col>
                                <Col xs={4} className='d-flex justify-content-end gap-2' style={{ color: '#4a4a4a' }}>
                                    <button className="btn px-0" style={{ fontSize: '0.95rem' }}><Trash color="danger" fill="#ea5455" stroke="#ea5455" size={17.5} /></button>
                                    <button className="btn"><MoreHorizontal color="black" size={17.5} /></button>
                                </Col>
                            </div>
                        </Container>
                        <div className="d-flex justify-content-end align-items-center gap-2 pe-3" style={{ color: 'black' }}>
                            <span><ChevronLeft /></span>
                            <span>1</span>
                            <span>2</span>
                            <span>3</span>
                            <span>4</span>
                            <span>5</span>
                            <span>6</span>
                            <span><ChevronRight /></span>
                        </div>
                    </Col>
                    <Col lg={5}>
                        <Card className="border" style={{ boxShadow: '0px 0px 0px rgba(0,0,0,0)', backgroundColor: '#f0f0f0' }}>
                            <CardBody>
                                <div className="d-flex justify-content-between align-items-center pb-1">
                                    <h2 style={{ color: 'black', fontWeight: 1000, margin: '0px' }} className='w-100'>Suggested Partners</h2><button style={{ color: '#000000', fontWeight: "bolder" }} className="btn w-25 p-0">See more</button>
                                </div>
                                <Container fluid className="pe-0 ps-1" style={{ height: `${3 * heightCard}px`, overflowY: 'scroll', overflowX: 'visible' }}>
                                    <div className="row w-100 align-items-center" style={{ padding: '0.85rem 0px', height: heightCard }}>
                                        <Col xs={9} className='d-flex align-items-center gap-2 h-100'>
                                            <img height={'100%'} src="https://m.media-amazon.com/images/S/abs-image-upload-na/6/AmazonStores/A21TJRUUN4KGV/8e2d63147b1fabc8b28e9429865fc222.w2389.h1676._CR357%2C0%2C1676%2C1676_SX200_.png" alt="" style={{ aspectRatio: '4/3', borderRadius: '1rem', boxShadow: '2.5px 2.5px 12.5px rgba(0,0,0,0.175)' }} />
                                            <div className="w-100">
                                                <h5 style={{ color: 'black' }}>Javinishka</h5>
                                                <p className="m-0" style={{ color: 'black', fontWeight: 'lighter' }}>Fashion Clothing Online Store</p>
                                            </div>
                                        </Col>
                                        <Col xs={3} className='d-flex justify-content-end gap-2 text-end pe-0' style={{ color: '#4a4a4a' }}>
                                            <button className="btn btn-sm rounded-pill text-white" style={{ backgroundColor: '#265490' }}>Connect</button>
                                        </Col>
                                    </div>
                                    <div className="row w-100 align-items-center" style={{ padding: '0.85rem 0px', height: heightCard }}>
                                        <Col xs={9} className='d-flex align-items-center gap-2 h-100'>
                                            <img height={'100%'} src="https://m.media-amazon.com/images/S/abs-image-upload-na/6/AmazonStores/A21TJRUUN4KGV/8e2d63147b1fabc8b28e9429865fc222.w2389.h1676._CR357%2C0%2C1676%2C1676_SX200_.png" alt="" style={{ aspectRatio: '4/3', borderRadius: '1rem', boxShadow: '2.5px 2.5px 12.5px rgba(0,0,0,0.175)' }} />
                                            <div className="w-100">
                                                <h5 style={{ color: 'black' }}>Javinishka</h5>
                                                <p className="m-0" style={{ color: 'black', fontWeight: 'lighter' }}>Fashion Clothing Online Store</p>
                                            </div>
                                        </Col>
                                        <Col xs={3} className='d-flex justify-content-end gap-2 text-end pe-0' style={{ color: '#4a4a4a' }}>
                                            <button className="btn btn-sm rounded-pill text-white" style={{ backgroundColor: '#265490' }}>Connect</button>
                                        </Col>
                                    </div>
                                    <div className="row w-100 align-items-center" style={{ padding: '0.85rem 0px', height: heightCard }}>
                                        <Col xs={9} className='d-flex align-items-center gap-2 h-100'>
                                            <img height={'100%'} src="https://m.media-amazon.com/images/S/abs-image-upload-na/6/AmazonStores/A21TJRUUN4KGV/8e2d63147b1fabc8b28e9429865fc222.w2389.h1676._CR357%2C0%2C1676%2C1676_SX200_.png" alt="" style={{ aspectRatio: '4/3', borderRadius: '1rem', boxShadow: '2.5px 2.5px 12.5px rgba(0,0,0,0.175)' }} />
                                            <div className="w-100">
                                                <h5 style={{ color: 'black' }}>Javinishka</h5>
                                                <p className="m-0" style={{ color: 'black', fontWeight: 'lighter' }}>Fashion Clothing Online Store</p>
                                            </div>
                                        </Col>
                                        <Col xs={3} className='d-flex justify-content-end gap-2 text-end pe-0' style={{ color: '#4a4a4a' }}>
                                            <button className="btn btn-sm rounded-pill text-white" style={{ backgroundColor: '#265490' }}>Connect</button>
                                        </Col>
                                    </div>
                                    <div className="row w-100 align-items-center" style={{ padding: '0.85rem 0px', height: heightCard }}>
                                        <Col xs={9} className='d-flex align-items-center gap-2 h-100'>
                                            <img height={'100%'} src="https://m.media-amazon.com/images/S/abs-image-upload-na/6/AmazonStores/A21TJRUUN4KGV/8e2d63147b1fabc8b28e9429865fc222.w2389.h1676._CR357%2C0%2C1676%2C1676_SX200_.png" alt="" style={{ aspectRatio: '4/3', borderRadius: '1rem', boxShadow: '2.5px 2.5px 12.5px rgba(0,0,0,0.175)' }} />
                                            <div className="w-100">
                                                <h5 style={{ color: 'black' }}>Javinishka</h5>
                                                <p className="m-0" style={{ color: 'black', fontWeight: 'lighter' }}>Fashion Clothing Online Store</p>
                                            </div>
                                        </Col>
                                        <Col xs={3} className='d-flex justify-content-end gap-2 text-end pe-0' style={{ color: '#4a4a4a' }}>
                                            <button className="btn btn-sm rounded-pill text-white" style={{ backgroundColor: '#265490' }}>Connect</button>
                                        </Col>
                                    </div>
                                </Container>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>}
                {showAll && <ExploreAll loop={loop} showAll={showAll} setShowAll={setShowAll} />}
            </Container>
        </>
    )
}

export default NewNetworkDashboard