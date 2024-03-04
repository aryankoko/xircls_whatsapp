import SubscriptionNav_billing from './components/SubscriptionNav_billing'
import { useEffect, useState } from 'react'
import { Modal } from 'reactstrap'
import { DollarSign } from 'react-feather'
import { getReq } from '../../../assets/auth/jwtService'

// const Payment_card = ({img_logo}) => { 

//   return (
//     <div className="card border">
//       <div className="card-body">
//           <div className="d-flex justify-content-between align-items-start">
//             <div className="d-flex justify-content-center align-items-center flex-column">
//               <img src={img_logo} alt="logo" style={{height: '25px', width: '60px', objectFit: 'contain'}}/>
//               <p>Mildred Wagner</p>
//               <p>**** **** **** 5678</p>
//             </div>
//             <div className='d-flex flex-column gap-2'>
//               <div className="d-flex justify-content-center align-items-center flex-row gap-1">
//                 <button type="button" className="btn"style={{backgroundColor: '#E8E6FC', color: '#8C82F2'}}>Edit</button>
//                 <button type="button" className="btn" style={{backgroundColor: '#F0F0F1', color: '#B1B3B6'}}>Delete</button>
//               </div>
//               <p>Card expires at 12/24</p>
//             </div>
//           </div>
//       </div>
//     </div>
//   )
// }

const Billing = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [cancelModalOpen, setCancelModalOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState('standard')

  // Function to toggle the modal
  const toggleModal = () => {
    setModalOpen(!modalOpen)
  }

  const toggleCancelModal = () => {
    setCancelModalOpen(!cancelModalOpen)
  }

  const [data, setData] = useState({
    planDetails: {}
  })

  const getData = () => {
      getReq('planDetails')
      .then((res) => {
          console.log('res ===>', res)
          setData({...data, planDetails: res?.data?.data?.merchant_profile})
      })
      .catch((err) => {
          console.log(err)
      })
  }

  useEffect(() => {
      getData()
  }, [])

  return (
   <>
    <div className="card">
      <div className="card-body">
        <SubscriptionNav_billing />
      </div>
    </div>

    {/* Current Plan */}
    <div className="card">
      <div className="card-body">
        <div className="row">
          <p style={{fontSize: '1.125', fontWeight: '500'}}>Current Plan</p>
          <div className="col-6">            
              <div className="d-flex flex-column justify-content-between align-items-start">
                <div className="v-card-item mb-1">
                  <div className="v-card-item__content">
                    <div className="v-card-title" style={{fontWeight: '400'}}>
                      Your Current Plan is {data.planDetails?.status === 'AC' ? 'Active' : 'Inactive'} </div>
                    <div className="v-card-subtitle">
                      <small className="text-base" style={{fontWeight: '300'}}>
                      A simple start for everyone
                      </small>
                    </div>
                  </div>
                </div>
                
                <div className="v-card-item mb-1">
                  <div className="v-card-item__content">
                    <div className="v-card-title" style={{fontWeight: '400'}}>
                      Active until {data.planDetails?.end_date}
                    </div>
                    <div className="v-card-subtitle">
                      <small className="text-base" style={{fontWeight: '300'}}>
                      We will send you a notification upon Subscription expiration  
                      </small>
                    </div>
                  </div>
                </div>

                <div className="v-card-item mb-1">
                  <div className="v-card-item__content">
                    <div className="v-card-title" style={{fontWeight: '400'}}>$199 Per Month <span style={{backgroundColor:'#E8E6FC', color:'#7366EF', padding: '5px', boxSizing:'border-box', fontSize: '10px'}}>popular</span></div>
                    <div className="v-card-subtitle">
                      <small className="text-base" style={{fontWeight: '300'}}>
                      Standard plan for small to medium businesses
                      </small>
                    </div>
                  </div>
                </div>
 
                <div className="d-flex justify-content-start align-items-center gap-2 mt-2">
                  <button type="button" className="btn btn-primary"  onClick={toggleModal}>Upgrade Plan</button>
                  <button type="button" className="btn alert-danger">Cancel Subscription</button>
                </div>
              </div>
          </div>
            {/* col 2 */}
          <div className="col-6">

            <div className="card-body" style={{backgroundColor: '#FFEFE1', color:'#FFA34D', padding:'0.7rem'}}>
                <div className="v-card-item mb-1">
                  <div className="v-card-item__content">
                    <div className="v-card-title" style={{fontWeight: '500'}}>We need your attention!</div>
                    <div className="v-card-subtitle">
                      <small className="text-base" style={{fontWeight: '400'}}>
                      Your plan requires update
                      </small>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-1">
                <div className="d-flex justify-content-between align-items-center">
                  <p>Days</p>
                  <p>26 of 30 Days</p>
                </div>
                <div className="progress">
                  <div className="progress-bar" role="progressbar" style={{width: "75%"}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p className="mt-1">6 days remaining until your plan requires update</p>
              </div>
              
          </div>
        </div> 
      </div>
    </div>

    {/* Payment Methods */}
    {/* <div className="card">
      <div className="card-body">
        <div className="row mx-1">

          {/* heading 
          <div className="d-flex justify-content-between align-items-center mb-1">
            <h4 className='mb-0' style={{fontWeight: '400'}}>Payment Methods</h4>
            <button type="button" className="btn btn-primary" onClick={toggleCancelModal}>+ Add Card</button>
          </div>

          <Payment_card img_logo={TMB_logo}/>
          <Payment_card img_logo={visa_logo}/>
          <Payment_card img_logo={aex}/>
        </div>
      </div>
    </div>

    {/* Billing Address */}
    {/* <div className="card">
      <div className="card-body">
        <div className="row">
        <p style={{fontSize: '1.125', fontWeight: '500'}}>Billing Address</p>

          <div className="col">

            <p><span style={{fontWeight: '400'}}>Company Name: </span><span style={{fontWeight: '200'}}>Pixinvent</span></p>
            <p><span style={{fontWeight: '400'}}>Billing Email:</span><span style={{fontWeight: '200'}}>gertrude@gmail.com</span></p>
            <p><span style={{fontWeight: '400'}}>Tax ID: </span><span style={{fontWeight: '200'}}>TAX-875623</span></p>
            <p><span style={{fontWeight: '400'}}>VAT Number: </span><span style={{fontWeight: '200'}}>SDF754K77</span></p>
            <p><span style={{fontWeight: '400'}}>Billing Address: </span><span style={{fontWeight: '200'}}>100 Water Plant Avenue, Building 1303 Wake Island</span></p>

          </div>

          <div className="col">
            
            <p><span style={{fontWeight: '400'}}>Contact:</span><span style={{fontWeight: '200'}}>+1(609) 933-44-22</span></p>
            <p><span style={{fontWeight: '400'}}>Country:</span><span style={{fontWeight: '200'}}>USA</span></p>
            <p><span style={{fontWeight: '400'}}>State:</span><span style={{fontWeight: '200'}}>Queensland</span></p>
            <p><span style={{fontWeight: '400'}}>Zip Code:</span><span style={{fontWeight: '200'}}>403114</span></p>

          </div>
        </div>
      </div>
    </div>  */}

      {/* Upgrade Plan */}
    <Modal className="modal-dialog modal-dialog-centered" isOpen={modalOpen} toggle={toggleModal}>
              <div className='m-1 my-3'>
                  {/* Upgrade Plan */}
                  <div className="text-center" >
                      <div className="h4 " style={{ marginBottom: "10px" }}>Upgrade Plan</div>
                      <small className='font-weight-regular'>Choose the best plan for the user.</small>
                  </div> 

                  {/* Plan Options */}
                  <div className="row my-1 justify-content-center gap-1">
                      <div className={` col-5 form-check d-flex justify-content-start align-items-center py-2 my-1 ${selectedOption === 'standard' ? 'border border-primary' : 'border'}`} style={{ borderRadius: '15px'}}>
                          <label className="form-check-label ms-2" htmlFor="radio-standard" onClick={() => setSelectedOption('standard')}>
                              <input
                              type="radio"
                              className="form-check-input "
                              name="radio-group-288"
                              value="standard"
                              id="radio-standard"
                              checked={selectedOption === 'standard'}
                              required
                              />
                              <div className='ms-1'>
                                  <h6 className="text-base">Standard</h6>
                                  <p className="text-sm mb-0">Standard - $99/month</p>
                              </div>
                          </label>
                      </div>
                      <div className={` col-5 form-check d-flex justify-content-start align-items-center py-2 my-1 ${selectedOption === 'basic' ? 'border border-primary' : 'border'}`} style={{ borderRadius: '15px'}}>
                          <label className="form-check-label ms-2" htmlFor="radio-basic" onClick={() => setSelectedOption('basic')}>
                              <input
                              type="radio"
                              className="form-check-input "
                              name="radio-group-288"
                              value="basic"
                              id="radio-basic"
                              checked={selectedOption === 'basic'}
                              required
                              />
                              <div className='ms-1'>
                                  <h6 className="text-base">Basic</h6>
                                  <p className="text-sm mb-0">Basic - $0/month</p>
                              </div>
                          </label>
                      </div>
                      <div className={`col-5 form-check d-flex justify-content-start align-items-center py-2 my-1 ${selectedOption === 'enterprise' ? 'border border-primary' : 'border'}`} style={{ borderRadius: '15px'}}>
                          <label className="form-check-label ms-2" htmlFor="radio-enterprise" onClick={() => setSelectedOption('enterprise')}>
                              <input
                              type="radio"
                              className="form-check-input "
                              name="radio-group-288"
                              value="enterprise"
                              id="radio-enterprise"
                              checked={selectedOption === 'enterprise'}
                              required
                              />
                              <div className='ms-1'>
                                  <h6 className="text-base">Enterprise</h6>
                                  <p className="text-sm mb-0">Enterprise - $499/month</p>
                              </div>
                          </label>
                      </div>
                      <div className={`col-5 form-check d-flex justify-content-start align-items-center py-2 my-1 ${selectedOption === 'company' ? 'border border-primary' : 'border'}`} style={{ borderRadius: '15px'}}>
                          <label className="form-check-label ms-2" htmlFor="radio-company" onClick={() => setSelectedOption('company')}>
                              <input
                              type="radio"
                              className="form-check-input "
                              name="radio-group-288"
                              value="company"
                              id="radio-company"
                              checked={selectedOption === 'company'}
                              required
                              />
                              <div className='ms-1'>
                                  <h6 className="text-base">Company</h6>
                                  <p className="text-sm mb-0">Company - $999/month</p>
                              </div>
                          </label>
                      </div>
                  </div> 

                  {/* Upgrade Button */}
                  <div className='text-center'>
                      <button className="btn btn-primary" onClick={toggleModal}>Upgrade</button>
                  </div> 

                  {/* Current Plan */}
                  <hr className="my-2" aria-orientation="horizontal" role="separator" />
                  <div className="mx-3">
                      <p className="font-weight-medium mb-1">User current plan is standard plan</p>
                      <div className="d-flex justify-content-between flex-wrap">
                      <div  className="d-flex align-items-center">
                          <sup className="text-primary text-sm font-weight-regular" style={{ marginBottom: '6px'}}>
                              <DollarSign size={13}/>
                          </sup>
                              <h3 className="text-h3 text-primary">
                                  99
                              </h3>
                          <sub className="mt-1">
                              <small className="text-sm font-weight-regular text-disabled">
                                  / month
                              </small>
                          </sub>
                      </div>
                      <button className="btn alert-danger" onClick={toggleModal}>Cancel Subscription</button>
                      </div>
                  </div>
                </div>
      </Modal>
      {/* + Add Card */}
      <Modal className="modal-dialog modal-dialog-centered" isOpen={cancelModalOpen} toggle={toggleCancelModal}>
      <div className='p-3'>
                  <div className="text-left">
                      <div className="text-center mb-3">
                      <h4 style={{ fontWeight: '400'}}>Add New Card</h4>
                      <p>Add your saved card details</p>
                      </div>
                      <form>
                      <div className="row">
                          <div className="col-12 mb-3">
                          <label htmlFor="cardNumber">Card Number</label>
                          <input
                              type="number"
                              id="cardNumber"
                              className="form-control"
                              placeholder="Enter card number"
                          />
                          </div>
                          <div className="col-md-6 col-12 mb-3">
                          <label htmlFor="name">Name</label>
                          <input
                              type="text"
                              id="name"
                              className="form-control"
                              placeholder="Enter your name"
                          />
                          </div>
                          <div className="col-md-3 col-6 mb-3">
                          <label htmlFor="expiry">Expiry</label>
                          <input
                              type="text"
                              id="expiry"
                              className="form-control"
                              placeholder="MM/YY"
                          />
                          </div>
                          <div className="col-md-3 col-6 mb-3">
                          <label htmlFor="cvv">CVV</label>
                          <input
                              type="number"
                              id="cvv"
                              className="form-control"
                              placeholder="CVV"
                          />
                          </div>
                      </div>
                      <div className="row">
                          <div className="col-12 mb-2 ">
                          <div className="form-check form-switch d-flex align-items-center gap-1" style={{transform: 'scale(0.8)'}}>
                              <input
                              className="form-check-input"
                              type="checkbox"
                              id="setAsPrimaryCard"
                              />
                              <label
                              className="form-check-label"
                              htmlFor="setAsPrimaryCard"
                              >
                              Set as primary card
                              </label>
                          </div>
                          </div>
                      </div>
                      <div className="row">
                          <div className="col-12 text-center">
                          <button  onClick={toggleCancelModal} type="submit" className="btn btn-primary me-1">
                              Submit
                          </button>
                          <button  onClick={toggleCancelModal}type="button" className="btn" style={{backgroundColor: '#F0F0F1', color: '#B1B3B6'}}>
                            Cancel
                          </button>
                          </div>
                      </div>
                      </form>
                  </div>
                  </div>
      </Modal>
   </>
  )
}

export default Billing