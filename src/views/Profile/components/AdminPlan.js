import React, { useState } from 'react'
import { Circle, DollarSign } from 'react-feather'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'

const AdminPlan = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState('standard')
  
    // Function to toggle the modal
    const toggleModal = () => {
      setModalOpen(!modalOpen)
    }
  return (
        <>
              <div className="v-card-text d-flex">
                  <div class="alert alert-primary" role="alert" style={{ fontWeight: '500', fontSize: '0.9rem', padding: '5px 10px'}}>
                      Popular
                  </div>
                  <div  className="flex-grow-1" />
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
              </div>
              <div>
              <div class=" d-flex justify-content-start align-items-center pt-1">
                      <Circle size={10}  color='rgb(168, 170, 174)'/>
                      <label class="ms-1">
                          10 Users
                      </label>
                  </div>
                  <div class=" d-flex justify-content-start align-items-center pt-1">
                      <Circle size={10}  color='rgb(168, 170, 174)'/>
                      <label class="ms-1">
                          Up to 10GB storage
                      </label>
                  </div>
                  <div class=" d-flex justify-content-start align-items-center pt-1">
                      <Circle size={10}  color='rgb(168, 170, 174)'/>
                      <label class="ms-1">
                          Basic Support
                      </label>
                  </div>
              </div>
              <div className="">
                  <div className="d-flex mt-2">
                      <h6 className="text-base font-weight-medium mb-1"> Days </h6>
                      <div className="flex-grow-1" />
                      <h6 className="text-base font-weight-medium"> 26 of 30 Days </h6>
                  </div>
                  <div className="progress">
                      <div className="progress-bar bg-primary" role="progressbar" style={{ width: '86.67%' }} aria-valuenow="26" aria-valuemin="0" aria-valuemax="30" />
                  </div>
                  <p style={{ marginTop: '6px'}}> 4 days remaining </p>
                  <div className="d-flex gap-2 mt-2">
                      <button type="button" className="btn btn-primary" onClick={toggleModal}>Upgrade Plan</button>
                      <button type="button" className="btn" style={{backgroundColor: '#F0F0F1', color: '#B1B3B6'}}>Cancel</button>
                  </div>
              </div>
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
    </>
  )
}

export default AdminPlan