import React, { useEffect, useState } from 'react'
import ProfileNav from './components/ProfileNav'
import { Button, Card, CardBody, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import { getReq, postReq } from '../../assets/auth/jwtService'
import { Edit, Edit2 } from 'react-feather'
import toast from "react-hot-toast"

const ProfilePage = () => {

  const [data, setData] = useState(null)
  const [editModal, setEditModal] = useState(false)
  const [changePasswordModal, setChangePasswordModal] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const getData = () => {
    getReq('merchantProfile')
    .then((resp) => {
      console.log(resp)
      setData(resp.data.data)
      setFirstName(resp.data.data.user_detail.first_name)
      setLastName(resp.data.data.user_detail.last_name)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    getData()
  }, [])

  const saveUserDetail = () => {
    const form_data = new FormData()
    form_data.append('first_name', firstName)
    form_data.append('last_name', lastName)
    postReq('merchantProfile', form_data)
    .then((resp) => {
      console.log(resp)
      setEditModal(false)
      toast.success("Details Updated Successfully")
      getData()
    })
    .catch((error) => {
      toast.error("Something went wrong")
      console.log(error)
    })
  }

  const changePassword = () => {
    const form_data = new FormData()
    form_data.append('password', document.getElementById('new_password').value)
    form_data.append('confirm_password', document.getElementById('confirm_password').value)
    postReq('changePassword', form_data)
    .then(() => {
      toast.success('Password changed successfully')
      setChangePasswordModal(!changePasswordModal)
    })
    .catch((error) => {
      toast.error('Something went wrong')
      setChangePasswordModal(!changePasswordModal)
      console.log(error)
    })
  }

  return (
    <Row className="match-height">
        <Col md="4">
            <Card>
                <CardBody>
                    <ProfileNav />
                </CardBody>
            </Card>
        </Col>
        <Col md="8">
          <Card>
              <CardBody>
                <div className="profile">
                  <div className="parent d-flex justify-content-start align-items-center gap-1">
                    <img className='rounded mr-50' src="https://api.xircls.com/static/app-assets/images/avatars/default_user.jpg" alt="" width='80px' height="80px" />
                    <div className="parent">
                      <div className="action d-flex justify-content-start align-items-center gap-1 mb-1">
                        <label htmlFor="upload">
                          <input type="file" className='d-none' id='upload' />
                          <a className='btn btn-sm btn-primary btn-outline-primary'>Upload</a>
                        </label>
                          <a className='btn btn-sm btn-outline-secondary'>Reset</a>
                      </div>
                      <p>Allowed JPG, GIF or PNG. Max size of 800kB</p>
                    </div>
                  </div>

                  <div className="input_tags my-1">
                    <div className="row mb-1">
                      <div className="col-6">
                        <label htmlFor="account_id">Account ID</label>
                        <input type="text" id='account_id' className='form-control' readOnly value='' />
                      </div>
                      <div className="col-6">
                        <label htmlFor="first_name">First Name</label>
                        <input type="text" id='first_name' className='form-control' readOnly value={data?.user_detail.first_name } />
                      </div>
                    </div>
                    <div className="row mb-1">
                      <div className="col-6">
                        <label htmlFor="last_name">Last Name</label>
                        <input type="text" id='last_name' className='form-control' readOnly value={data?.user_detail.last_name } />
                      </div>
                      <div className="col-6">
                        <label htmlFor="email">E-mail</label>
                        <input type="text" id='email' className='form-control' readOnly value={data?.user_detail.email } />
                      </div>
                    </div>
                    <div className="row mb-1">
                      <div className="col-6">
                        <label htmlFor="mobile_number">Mobile No</label>
                        <input type="text" id='mobile_number' className='form-control' readOnly value={data?.merchant_profile.phone_no } />
                      </div>
                    </div>
                  </div>

                  <div className="status my-1">
                    {
                      data?.user_detail.email ? <>
                        <div className="alert alert-success mb-50" role="alert">
                          <h4 className="alert-heading">Your email is confirmed</h4>
                        </div>
                      </> : data?.merchant_profile.is_email_verify === false ? <>
                        <div className="alert alert-warning mb-50" role="alert">
                          <h4 className="alert-heading">
                            Your email is not confirmed. Please check your inbox.
                          </h4>
                          <div className="alert-body">
                            <a onclick="check_profile_view('EMAIL VERIFY')" className="alert-link">
                              Verify Now
                            </a>
                          </div>
                        </div>
                      </> : <>
                        <div className="alert alert-success mb-50" role="alert">
                          <h4 className="alert-heading">Your email is confirmed</h4>
                        </div>
                      </>                      
                    }

                    {
                      data?.merchant_profile.is_phone_verify === false ? <>
                        <div className="alert alert-warning mb-50" role="alert">
                          <h4 className="alert-heading">
                            Your mobile no is not confirmed. Please check your sms.
                          </h4>
                          <div className="alert-body">
                            <a className="alert-link">
                              Verify Now
                            </a>
                          </div>
                        </div>
                      </> : <>
                        <div className="alert alert-success mb-50" role="alert">
                          <h4 className="alert-heading">Your mobile no is confirmed</h4>
                        </div>
                      </>
                    }

                  </div>

                  <div className="actions d-flex justify-content-end gap-1">
                    <a className="btn btn-primary" onClick={() => setChangePasswordModal(!changePasswordModal)}>Change Password</a>
                    <a className="btn btn-outline-secondary" onClick={() => setEditModal(!editModal)}><Edit2 size={16} /> Edit</a>
                  </div>

                </div>
              </CardBody>
            </Card>
        </Col>
        <Modal
          isOpen={editModal}
          toggle={() => setEditModal(!editModal)}
          className='modal-dialog-centered'
        >
          <ModalHeader toggle={() => setEditModal(!editModal)}>Edit</ModalHeader>
          <ModalBody>
           <div className="row">
            <div className="col-12 mb-1">
              <label htmlFor="first_name">First Name</label>
              <input type="text" id='first_name' className='form-control' value={firstName} onChange={(e) =>  setFirstName(e.target.value)} />
            </div>
            <div className="col-12 mb-1">
              <label htmlFor="last_name">Last Name</label>
              <input type="text" id='last_name' className='form-control' value={lastName} onChange={(e) =>  setLastName(e.target.value)} />
            </div>
           </div>
          </ModalBody>
          <ModalFooter>
            <Button outline onClick={() => setEditModal(!editModal)}>
              Cancel
            </Button>
            <Button color='primary' onClick={() => saveUserDetail()}>
              Save
            </Button>
          </ModalFooter>
        </Modal>

        <Modal
          isOpen={changePasswordModal}
          toggle={() => setChangePasswordModal(!changePasswordModal)}
          className='modal-dialog-centered'
        >
          <ModalHeader toggle={() => setChangePasswordModal(!changePasswordModal)}>Change Password</ModalHeader>
          <ModalBody>
           <div className="row">
            <div className="col-12 mb-1">
              <label htmlFor="new_password">New Password</label>
              <input type="text" id='new_password' className='form-control' />
            </div>
            <div className="col-12 mb-1">
              <label htmlFor="confirm_password">Confirm Password</label>
              <input type="text" id='confirm_password' className='form-control' />
            </div>
           </div>
          </ModalBody>
          <ModalFooter>
            <Button outline onClick={() => setChangePasswordModal(!changePasswordModal)}>
              Cancel
            </Button>
            <Button color='primary' onClick={() => changePassword()}>
              Save
            </Button>
          </ModalFooter>
        </Modal>
    </Row>
    
  )
}

export default ProfilePage