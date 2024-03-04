import React, {useState} from 'react'
import { Card, CardBody, Col, Input, Row, Label, Button, Form, FormGroup } from "reactstrap"
import { MdLocalOffer, MdCreditCard } from 'react-icons/md'
import { GiCash } from 'react-icons/gi'
import { AiOutlineRight, AiOutlineLeft, AiFillDelete } from 'react-icons/ai'
import StepProgressBar from './StepProgressBarSemperFi'


const SemperFi = () => {
    const [currentStep, setCurrentStep] = useState(1)
    const [completedStep, setCompletedStep] = useState(0)
    // const [selectedCard, setSelectedCard] = useState(null)
    const [acquire, setAcquire] = useState()
    const [retain, setRetain] = useState()
    
    const steps = [
      { id: 'step01', label: 'Get Started' },
      { id: 'step02', label: 'Acquire' },
      { id: 'step03', label: 'Retain' }
    ]

    console.log(acquire)
    const acquireSelect = (value) => {
        setAcquire(value)
    }

    console.log(retain)
    const retainSelect = (value) => {
        setRetain(value)
    }

    const handleStepClicked = (value) => {
        setCurrentStep(value)
        if (value > completedStep) {
        setCompletedStep(value - 1)
        }
    }
    const handleNextClick = () => {
        if (currentStep < steps.length) {
          setCurrentStep(currentStep + 1)
          setCompletedStep(currentStep)
        }
      }
    
    const handlePreviousClick = () => {
    if (currentStep > 1) {
        setCurrentStep(currentStep - 1)
        setCompletedStep(currentStep - 2)
    }
    }
    
    // const handleCardClick = (cardId) => {
    //     setSelectedCard(cardId)
    // }
    // console.log(selectedCard)

    // const renderCard = (cardId, icon, title, description) => (
    //     <Col md={4}>
    //       <Card
    //         className={`shadow d-flex flex-column align-items-center justify-content-center cursor-pointer text-center p-2 ${
    //           selectedCard === cardId ? 'selected-card' : ''
    //         }`}
    //         onClick={() => handleCardClick(cardId)}
    //       >
    //         <CardBody>
    //           {icon}
    //           <h3 className='mt-2'>{title}</h3>
    //           <h6 className='mt-2'>{description}</h6>
    //           <input
    //             type='radio'
    //             className='form-check-input mt-2'
    //             style={{ marginRight: '15px', padding: '10px' }}
    //             id={`radio_${cardId}`}
    //             name='optradio'
    //             value={cardId}
    //           />
    //         </CardBody>
    //       </Card>
    //     </Col>
    //   )

  return (
    <div className='d-flex flex-column align-items-center justify-content-center' >
        
        {/* progress bar here */}
        <div className='w-100 my-3'>
            <StepProgressBar
                steps={steps}
                currentStep={currentStep}
                completedStep={completedStep}
                disableNavigation={false}
                handleStepClicked={handleStepClicked}
            />
        </div>

        {/* Page 1 starts*/}
        {currentStep === 1 && (
            <Row className='w-100 match-height d-flex justify-content-around'>

            <h1 className='mb-3 text-center'>In the next 3 minutes, we’ll help you set up your loyalty program to:</h1>

            <Col md={4}>
                <Card className='shadow'>
                    <CardBody>
                    <h2 className='my-2'>Acquire New Customers</h2>
                    <h4>How would you like to acquire new customers?</h4>

                    <div className='mt-2' style={{marginLeft:"25px"}}>

                        <div className="form-check" style={{padding:"10px"}}>
                            <input type="checkbox" className="form-check-input" style={{marginRight:"15px"}} id="radio1" name="acquire" value="gift-cards" onClick={() => acquireSelect('gift-cards')}/>
                                <h4 className='pl-2'>Gift Cards</h4>
                        </div>

                        <div className="form-check" style={{padding:"10px"}}>
                            <input type="checkbox" className="form-check-input" style={{marginRight:"15px"}} id="radio1" name="acquire" value="referrals" onClick={() => acquireSelect('referrals')}/>
                                <h4 className='pl-2'>Referrals</h4>
                        </div>

                        <div className="form-check" style={{padding:"10px"}}>
                            <input type="checkbox" className="form-check-input" style={{marginRight:"15px"}} id="radio1" name="acquire" value="samples" onClick={() => acquireSelect('samples')}/>
                                <h4 className='pl-2'>Samples</h4>
                        </div>  

                        <div className="form-check" style={{padding:"10px"}}>
                            <input type="checkbox" className="form-check-input" style={{marginRight:"15px"}} id="radio1" name="acquire" value="offers" onClick={() => acquireSelect('offers')}/>
                                <h4 className='pl-2'>Offers</h4>
                        </div>

                    </div>
                    </CardBody>
                </Card>
            </Col>

            <Col md={4}>
                <Card className='shadow'>
                    <CardBody>
                    <h2 className='my-2'>Retain Existing Customers</h2>
                    <h4>How would you like to encourage repurchases?</h4>

                    <div className='mt-2' style={{marginLeft:"25px"}}>

                        <div className="form-check" style={{padding:"10px"}}>
                            <input type="checkbox" className="form-check-input" style={{marginRight:"15px"}} id="radio2" name="retain" value="store-credit" onClick={() => retainSelect('store-credit')}/>
                                <h4 className='pl-2'>Store Credit</h4>
                        </div>

                        <div className="form-check" style={{padding:"10px"}}>
                            <input type="checkbox" className="form-check-input" style={{marginRight:"15px"}} id="radio2" name="retain" value="samples-r" onClick={() => retainSelect('samples-r')}/>
                                <h4 className='pl-2'>Samples</h4>
                        </div>

                        <div className="form-check" style={{padding:"10px"}}>
                            <input type="checkbox" className="form-check-input" style={{marginRight:"15px"}} id="radio2" name="retain" value="offers-r" onClick={() => retainSelect('offers-r')}/>
                                <h4 className='pl-2'>Offers</h4>
                        </div>  

                    </div>
                    </CardBody>
                </Card>
            </Col>

        </Row>
        
        )}
        {/* Page 1 ends */}
        
        {/* Page 2 starts*/}
        {currentStep === 2 && acquire === 'referrals' && (
            <Row id='page1' className='match-height w-100 d-flex align-items-center justify-content-around gap-3'>
                <Col md={5}>
                    <Form className='mb-2'>
                        <FormGroup switch className='d-flex align-items-center justify-content-start gap-2'>
                            <Input type="switch" role="switch" style={{height:"2.5rem", width:"4rem", padding:"0.25rem"}}/>
                            <Label check className='fs-2'>Set up Referral rewards</Label>
                        </FormGroup>
                    </Form>

                    <Label for="exampleEmail" className='fs-6'>Amount issued to the referrer</Label>
                    <Input type="number" name="referrer" id="referrerAmount" placeholder="Enter Amount  " />

                    <Label for="exampleEmail" className='fs-6 mt-2'>Amount issued to the referred</Label>
                    <Input type="number" name="referrer" id="referrerAmount" placeholder="Enter Amount  " />

                    <h6 className='text-muted mt-1'>The discount will automatically be inserted to the checkout</h6>

                </Col>
                <Col md={4}>
                    <Card className='shadow p-0'>
                        <CardBody className='p-0 rounded-top'>
                            <div className='text-center bg-primary p-2 m-0 rounded-top'> 
                                <h1 className='text-white'>YOUR LOGO</h1>
                                <h5 className='text-white mt-1'>PLACEHOLDER</h5>
                            </div>  
                        </CardBody>
                        <CardBody className='p-2'>
                            <h4>Here is your credit reward</h4>
                            <h1>...</h1>
                            <h1>...</h1>
                            <div className='mt-2 text-center p-2 bg-light rounded'>
                                <h4>Your code is: <span className='text-primary'>0754213689GDHD</span></h4>
                            </div>
                            <div className='d-flex align-items-center justify-content-center mt-2 '>
                                <Button color='primary'>SHOP NOW</Button>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        )}
        {currentStep === 2 && acquire === 'gift-cards' && (
            <div className='w-100'>
                <h1 className='text-center mb-3'>Set up Gift Card</h1>
                <Row id='page1' className='match-height w-100 d-flex align-items-center justify-content-around'>
                    <Col md={5} className='match-height bg-light rounded' >
                        <div className=' py-5 my-5'>
                            <CardBody className='d-flex flex-column align-items-center justify-content-center'>
                                <Card className='shadow-lg w-75 '>
                                    <CardBody className='p-5 d-flex flex-column align-items-center justify-content-center'>
                                            <h1>Gift Card</h1>
                                    </CardBody>
                                </Card>
                                <h5>Powered BY XIRCLS</h5>
                            </CardBody>
                        </div>
                    </Col>
                    <Col md={5}>
                        <Label for="exampleEmail" className='fs-6 mt-2'>Amount issued to the referred</Label>
                        <Input type="number" name="referrer" id="referrerAmount" placeholder="Enter Amount  " />

                        <Label for="exampleText" className='fs-6 mt-2'>Text Area</Label>
                        <Input type="textarea" name="text" id="exampleText" />

                        <Label check className='mt-2'>
                            <div>
                                <Input type="radio" name="radio1"/>{' '}
                                Gift Card never expires
                            </div>
                            <br />
                            <div>
                                <Input type="radio" name="radio1"/>{' '}
                                Gift Card expires
                            </div>
                        </Label>

                        <div className='mt-2'>
                            <input type='number' className=''/>{' '}Months
                        </div>
                        <div className='mt-2'>
                            <Input type="checkbox" name="radio1"/>{' '}
                            Enable Discounted Gift Cards
                            </div>
                    </Col>
                </Row>

                <Row className='w-100 px-4 py-3'>
                    <Col>
                        <Card className='shadow'>
                            <CardBody className='p-2'>
                                <table className='w-100'>
                                    <thead style={{borderBottom:"1px solid #c0c0c0"}}>
                                        <tr>
                                            <th className='p-1'>Variant Name</th>
                                            <th className='p-1'>Gift Card Price</th>
                                            <th className='p-1'></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className='p-1'><input type='number' className='form-control'/></td>
                                            <td className='p-1'><input type='number' className='form-control'/></td>
                                            <td className='p-1'><AiFillDelete size={25}/></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <h5 style={{color:"#3192D6"}} className='p-1'>+ Add Different Variant</h5>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )}
        {/* Page 2 ends */}
        {/* https://demos.pixinvent.com/vuexy-vuejs-admin-template/demo-1/assets/sitting-girl-with-laptop-7faa3bb5.png */}


        {/* Page 3 starts */}
        {currentStep === 3 && retain === 'store-credit' && (
        <div className='w-100'> 
            <h1 className='text-center mb-3'>Set Up Store Credit</h1>
            <Row className='w-100 match-height d-flex align-items-center justify-content-around'>
                <Col md={12}>
                    <Card className='shadow p-2'>
                        <CardBody className='d-flex align-items-start justify-content-between gap-5'>
                            <div className="col-5 ">
                                <label  htmlFor="name" className='fs-2 mb-1'>Credit Value</label>
                                <div className='d-flex align-items-center justify-content-start gap-1 mb-1'>
                                    <input style={{marginTop:"8px"}} type="number" id='name' className='form-control w-75'  />
                                    {' '} % of transaction value
                                </div>
                                <p className='text-secondary ' style={{fontSize:"12px"}}>Enter the discount percentage. 10 = 10%</p>
                            </div>
                            <div className="col-5 ">
                                <label  htmlFor="name" className='fs-2 mb-1'>Max use per redemption</label><br/>
                                <div className='d-flex align-items-center justify-content-start gap-1 mb-1'>
                                    <input style={{marginTop:"8px"}} type="number" id='name' className='form-control w-75'  />
                                    {' '} % of store credit
                                </div>  
                                <h6 className='text-center'>OR</h6>
                                <div className='d-flex align-items-center justify-content-start gap-1 mb-1'>
                                    Upto Rs. {' '}
                                    <input style={{marginTop:"8px"}} type="number" id='name' className='form-control w-75'  />
                                </div>  
                            </div>                 
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
        )}
        {currentStep === 3 && retain === 'samples-r' && (
            <Row id='page1' className='match-height w-100 d-flex align-items-center justify-content-around gap-3'>
                <h1 className='text-center'>Set Up Sample</h1>
                <Col md={6}>
                    <Card className='shadow'>
                        <CardBody className='my-3'>
                            <div className='d-flex align-items-center justify-content-start gap-1'>
                                <h4 className='w-50'>Select Sample Product: </h4>
                                <select className='form-control w-50' style={{marginTop:"-8px"}}>
                                    <option>Product1</option>
                                    <option>Product2</option>
                                    <option>Product3</option>
                                </select>
                            </div>
                            <div className='d-flex align-items-center justify-content-start gap-1 my-1'>
                                <h4 className='my-1 d-flex align-items-center gap-1 w-50'>Limit:</h4>
                                <input type='text' className='form-control w-50 '/>
                            </div>
                            <h4 className='font-weight-bold'>Set Rules:</h4>
                            <div className=" ">
                                <div className='d-flex align-items-center justify-content-start gap-1 mb-1'>
                                    For purchases above Rs.
                                    <input style={{marginTop:"8px"}} type="number" id='name' className='form-control w-50'  />
                                </div>  
                                <h6 className='text-center'>OR</h6>
                                <div className='d-flex align-items-center justify-content-start gap-1 mb-1'>
                                    For <input type='text' className='w-50 form-control' /> Total Purchases
                                </div>  
                                <div className='d-flex align-items-center justify-content-start gap-1 '>
                                    <input type='checkbox' className=' form-check' />of minimum value of Rs. {' '}
                                    <input type='text' className='w-50 form-control' />
                                </div> 

                            </div> 
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className='shadow p-0'>
                        <CardBody className='p-0 rounded-top'>
                            <div className='text-center bg-primary p-2 m-0 rounded-top'> 
                                <h1 className='text-white'>YOUR LOGO</h1>
                                <h5 className='text-white mt-1'>PLACEHOLDER</h5>
                            </div>  
                        </CardBody>
                        <CardBody className='p-2'>
                            <h4>Here is your credit reward</h4>
                            <h1>...</h1>
                            <h1>...</h1>
                            <div className='mt-2 text-center p-2 bg-light rounded'>
                                <h4>Your code is: <span className='text-primary'>0754213689GDHD</span></h4>
                            </div>
                            <div className='d-flex align-items-center justify-content-center mt-2 '>
                                <Button color='primary'>SHOP NOW</Button>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        )}
        {currentStep === 3 && retain === 'offers-r' && (
            <Row id='page1' className='match-height w-100 d-flex align-items-center justify-content-around gap-3'>
                <h1 className='text-center'>Set Up Offer</h1>
                <Col md={6}>
                    <Card className='shadow'>
                        <CardBody className='my-3'>
                            offer content here
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className='shadow p-0'>
                        <CardBody className='p-0 rounded-top'>
                            <div className='text-center bg-primary p-2 m-0 rounded-top'> 
                                <h1 className='text-white'>YOUR LOGO</h1>
                                <h5 className='text-white mt-1'>PLACEHOLDER</h5>
                            </div>  
                        </CardBody>
                        <CardBody className='p-2'>
                            <h4>Here is your credit reward</h4>
                            <h1>...</h1>
                            <h1>...</h1>
                            <div className='mt-2 text-center p-2 bg-light rounded'>
                                <h4>Your code is: <span className='text-primary'>0754213689GDHD</span></h4>
                            </div>
                            <div className='d-flex align-items-center justify-content-center mt-2 '>
                                <Button color='primary'>SHOP NOW</Button>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        )}
        {/* Page 3 ends */}

        <Row className='w-100 mt-3'>
            <Col md={12} className='d-flex align-items-center justify-content-center'>
                <Card className='d-flex align-items-center justify-content-between w-75'>
                    <CardBody className='w-100 d-flex align-items-center justify-content-between '>
                        <Button color='secondary' onClick={handlePreviousClick}><AiOutlineLeft />Previous</Button>
                        <Button color='primary' onClick={handleNextClick}>
                            {currentStep === 1 && (
                                <div>
                                    Let's Begin !
                                </div>
                            )}
                            {currentStep === 2 && (
                                <div>
                                    Next <AiOutlineRight />
                                </div>
                            )}
                            {currentStep === 3 && (
                                <div>
                                    Finish
                                </div>
                            )}
                        </Button>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </div>
  )
}

export default SemperFi

/* <Col md={4}>
    <Card className='shadow'>
        <CardBody>
        <h1>Activate</h1>

        <div className='mt-3' style={{marginLeft:"25px"}}>

            <div className="form-check" style={{padding:"10px"}}>
                <input type="radio" className="form-check-input" style={{marginRight:"15px"}} id="radio1" name="optradio" value="option1" />
                    <h4 className='pl-2'>Loyalty Points</h4>
            </div>

            <div className="form-check" style={{padding:"10px"}}>
                <input type="radio" className="form-check-input" style={{marginRight:"15px"}} id="radio1" name="optradio" value="option1" />
                    <h4 className='pl-2'>Referrals</h4>
            </div>

            <div className="form-check" style={{padding:"10px"}}>
                <input type="radio" className="form-check-input" style={{marginRight:"15px"}} id="radio1" name="optradio" value="option1" />
                    <h4 className='pl-2'>VIP Tiers</h4>
            </div>  

        </div>
        </CardBody>
    </Card>
</Col> */