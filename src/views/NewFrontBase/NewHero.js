import { User } from 'react-feather'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'
import XirclsLogo from './assets/logo/XIRCLS_LOgo.png'

import './NewFrontBase.css'

const NewHero = () => {
    return (
        <div className="new-hero">
            <section>
                <Container fluid>
                    <Row className='align-items-center'>
                        <Col xs={4}>
                            <Link to='/'>
                                <img src={XirclsLogo} height='85px' className='py-1 mx-5' alt="" />
                            </Link>
                        </Col>
                        <Col xs={4}>
                            <ul className="p-0 m-0 list-unstyled d-flex align-items-center justify-content-center gap-3 now-medium-font" style={{ fontSize: '14px' }}>
                                <li>
                                    <Link className='color-black cursor-pointer' to='/'>Home</Link>
                                </li>
                                <li>
                                    <span className='color-black cursor-pointer'>Products</span>
                                </li>
                                <li>
                                    <Link className='color-black cursor-pointer' to='/'>About</Link>
                                </li>
                                <li>
                                    <Link className='color-black cursor-pointer' to='/'>Blog</Link>
                                </li>
                            </ul>
                        </Col>
                        <Col xs={4}>
                            <ul className="p-0 mb-0 mx-5 list-unstyled d-flex align-items-center justify-content-end gap-2 now-medium-font" style={{ fontSize: '14px' }}>
                                <li>
                                    <Link className='color-black cursor-pointer' to='/'>Log in</Link>
                                </li>
                                <li>
                                    <Link className='new-frontend-button' to='/'><User style={{ marginRight: '0.25rem' }} size={20} /> Sign-Up</Link>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    )
}

export default NewHero