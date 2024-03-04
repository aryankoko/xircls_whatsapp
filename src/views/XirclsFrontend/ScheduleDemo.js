import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Footer from './base/Footer'
import { BiMap } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { validForm } from '../Validator'

const ScheduleDemo = () => {

    const valueToCheck = [
        {
            name: 'email',
            message: 'Enter your email address',
            type: 'string',
            id: 'email'
        },
        {
            name: 'password',
            message: 'Enter your password',
            type: 'string',
            id: 'password'
        }
    ]
    
    const [data, setData] = useState({})

//     class Contact_us(models.Model):
//     name = models.CharField(max_length=255)
//     phone_no = models.CharField(max_length=50)
//     phone_code = models.CharField(max_length=10,blank=True,null=True)
//     email = models.CharField(max_length=255)        
//     subject = models.CharField(max_length=255)
//     message = models.CharField(max_length=255) 
//     schedule_date = models.CharField(max_length=255,null=True) 
//     time_zone = models.CharField(max_length=255,null=True) 
//     country = models.CharField(max_length=255,null=True )
//     time = models.CharField(max_length=255,null=True)

//     class Meta:
//         db_table = "xl925_Contact_us"

// class Contact_us_merchant(models.Model):
//     name = models.CharField(max_length=255)
//     country_code = models.CharField(max_length=20,blank=True,null=True)
//     phone_no = models.CharField(max_length=50)
//     email = models.CharField(max_length=255)        
//     subject = models.CharField(max_length=255)
//     message = models.CharField(max_length=500) 
//     priority = models.CharField(max_length=250,blank=True, null=True)
//     issue = models.CharField(max_length=500,blank=True, null=True)
//     merchant_id=models.CharField(max_length=100,null=True)

//     class Meta:
//         db_table = "xl925_Contact_us_merchant"


    const sendMessage = () => {
        // valueToCheck = []
        const check = validForm()
        console.log(check)
    }


    return (
        <>
            <div className='products'>
                <div className='font-three'>

                    <Container>
                        <Row className='text-center'>
                            <h1 className='my-2 main-font text-blue text-center'>Contact Us</h1>
                            <h4 className='third_h4'>Understand how XIRCLS can help your business.</h4>
                        </Row>
                        
                        <Row className='my-3 schedule_form'>
                            <Row className='breaker'>
                                <h3 className='third_h3 mb-1'>Please leave your details for us to reach out!</h3>
                                <Col md={6}>
                                    <label className='label'>Name *</label>
                                    <input className='third-form-control' type="text" placeholder='Name' onChange={(e) => updateData(e)} />

                                </Col>
                                <Col md={6}>
                                    <label className='label'>Phone *</label>
                                    <Row>
                                        <Col md={3}>
                                            <select className='third-form-control'>
                                                <option value="+91">+91</option>
                                            </select>
                                        </Col>
                                        <Col md={9}>
                                            <input className='third-form-control' type="text" placeholder='Phone' onChange={(e) => updateData(e)} />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row className='breaker'>
                                <Col md={12} className="breaker">
                                    <label className='label'>Email *</label>
                                    <input className='third-form-control' type="text" placeholder='Email' onChange={(e) => updateData(e)} />
                                </Col>
                                <Col md={12} className="breaker">
                                    <label className='label'>Subject *</label>
                                    <input className='third-form-control' type="text" placeholder='Subject' onChange={(e) => updateData(e)} />
                                </Col>
                                <Col md={12} className="breaker">
                                    <label className='label'>Message *</label>
                                    <textarea rows="6" cols="30" className='third-form-control' placeholder='Message' onChange={(e) => updateData(e)}>

                                    </textarea>
                                </Col>
                            </Row>

                            <Col md={12}>
                                <button className='third-button' onClick={() => sendMessage()}>Send Message</button>
                            </Col>
                        </Row>
                    </Container>
                    <Container fluid className='third_schedule_section'>
                        <Container id='page-title' className='text-center text-white'>
                            <span style={{ fontSize: `18px`, fontWeight: `lighter` }}>info@xircls.com</span>
                            <h2 className='py-1' style={{ fontSize: `54px`, color: `white` }}>+91 9969-333-666</h2>
                            <BiMap size={48} />
                            <div>
                                <Link className='text-white text-decoration-underline text' to=''>map</Link>
                            </div>
                            <div>
                                <span style={{ fontWeight: `400 !important`, lineHeight:` 1.5`, color: `white` }}>
                                    G-08, The Summit Business Bay by Omkar <br />
                                    Andheri Kurla Road, Andheri (East) <br />
                                    Mumbai - 400086, India <br />
                                </span>
                            </div>
                        </Container>
                    </Container>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ScheduleDemo