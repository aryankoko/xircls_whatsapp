import React, { useContext, useEffect, useState } from 'react'
import { BarChart2, RefreshCw, Users, Activity, MapPin } from 'react-feather'
import { Card, CardBody, Container, Row, Col, ModalBody, ModalHeader, Modal } from 'reactstrap'
import CardCom from '../Components/SuperLeadz/CardCom'
import CardHover from './components/CardHover'
import BlogComponent from './components/BlogCom'
import second from "@src/assets/images/website-slide/home/second.jpg"
import third from "@src/assets/images/website-slide/home/third.jpg"
import { useNavigate } from "react-router-dom"
import { PermissionProvider } from "../../Helper/Context"
import { getReq, postReq } from "../../assets/auth/jwtService"
import shopifyLogo from '@src/assets/images/logo/shopify-logo.png'
import wooCommerceLogo from '@src/assets/images/logo/WooCommerce_logo.png'
import magentoLogo from '@src/assets/images/logo/magento-logo.png'
import oyeconLogo from '@src/assets/images/logo/oyecon.png'
import FrontBaseLoader from "../Components/Loader/Loader"
import AppCom from "./components/AppComp"

function Home() {
  const navigate = useNavigate()
  const [userApps, setUserApps] = useState([])
  const { setUserPermission, userPermission } = useContext(PermissionProvider)
  const [editModal, setEditModal] = useState(false)
  const [apiLoader, setApiLoader] = useState(false)
  console.log(apiLoader)

  const getAppsData = () => {
    getReq('getAllApps')
    .then((res) => {
      console.log(res)
      setUserApps(res?.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const installApp = (id) => {
    setEditModal(false)
    setApiLoader(true)
    const form_data = new FormData()
    form_data.append('plugin_id', id)
    postReq('installPlugin', form_data)
    .then((resp) => {
      console.log(resp)
      setApiLoader(false)
      window.open(resp?.data?.data, "_blank").focus()
      // window.location.href = resp?.data?.data
    })
    .catch((error) => {
      console.log(error)
      setApiLoader(false)

    })
  }

  useEffect(() => {
    getAppsData()
  }, [])
  return (
    <div>
      <style>
        {`
          .hover-card-active, .hidden-section {
              transition: 0.25s ease;
          }
          
          .hidden-section {
              max-height: 0px;
              overflow: hidden;
          }
          
          .hover-button {
              opacity: 0;
              visibility: hidden;
              transition: 0.25s ease;
          }
          
          .hover-card-active:hover .hidden-section {
              max-height: 100px;
          }
          
          .hover-card-active:hover .hover-button {
              opacity: 1;
              visibility: visible;
          }
        `}
      </style>
      {/* <p className='h5 '>Your Store Insights</p> */}
      <Row>
        <div className='col-4'>
          <CardCom icon={<Users size='27px' />} title={'Visitors'} data={'0'} />
        </div>
        <div className='col-4'>
          <CardCom icon={<BarChart2 size='27px' />} title={'Customers'} data={'0'} />
        </div>
        <div className='col-4'>
          <CardCom icon={<RefreshCw size='27px' />} title={'Revenue'} data={'0'} />
        </div>
      </Row>
      {/* <p className='h5 '>SuperLeadz</p> */}
      <Row>
      {
              userApps?.map((curElem, key) => {
                return curElem.name.toLowerCase() === "infiniti" ? (
                <div key={key} className='col-4'>
                  <CardHover icon={
                    <img
                      src={"https://cdn.dribbble.com/users/1979827/screenshots/6748175/dribbble_shot_hd__3__4x.png?compress=1&resize=400x300&vertical=center"}
                      style={{ height: "120px", width: "150px", objectFit: 'cover' }}
                      alt="img"
                    />
                  } title={'Infiniti'} buttonText={userPermission?.installedApps.includes(curElem.name.toLowerCase()) ? 'Dashboard' : "Install App"} titleContent="Put your analytics tool to the test - you may be in for a surprise." customCondition={true} customFunc={() => {
                    if (userPermission?.installedApps.includes(curElem.name.toLowerCase())) {
                      setUserPermission({...userPermission, appName: 'infiniti'})
                      navigate("/merchant/dashboard/")
                    } else {
                      setEditModal(!editModal)
                    }
                  }} />
                </div>) : ''

              })
            }
        <div className='col-4'>
          <CardHover icon={
            <img
              src={second}
              style={{ height: "120px", width: "150px", objectFit: 'cover' }}
              alt="img"
            />
          } title={"We're here for you!"} buttonText={'CONTACT US'} redirect={"/contactus/"} titleContent="Reach out for questions, suggestions or get a walk-through of our solutions most relevant for you." newPage={true} />
        </div>
        <div className='col-4'>
          <CardHover icon={
            <img
              src={third}
              style={{ height: "120px", width: "150px", objectFit: 'cover' }}
              alt="img"
            />
          } title={'Know our mission'} buttonText={'READ MORE'} redirect={"/about-us/vision-&-mission-statement/"} titleContent="To empower businesses globally to instantly connect & fulfill their marketing goals on their own terms." newPage={true} />
        </div>
      </Row>
      {/* <p className='h5 '>Infiniti</p> */}

      {/* <p className='h5 '>Blog</p> */}
      <Row className='d-flex'>
        <div>
          <BlogComponent />
        </div>
      </Row>
      <Modal
        isOpen={editModal}
        toggle={() => setEditModal(!editModal)}
        className='modal-dialog-centered'
        size='lg'
      >
        <ModalHeader toggle={() => setEditModal(!editModal)}>Select Platform</ModalHeader>
        <ModalBody>
          <div className="row">
            <div className="col-md-3 d-flex justify-content-center align-items-center cursor-pointer" title="Shopify" onClick={() => installApp('1')}>
              <img width={'60%'} className="p-2" src={shopifyLogo} alt="" />
            </div>
            <div className="col-md-3 d-flex justify-content-center align-items-center cursor-pointer" title="Woo Commerce" onClick={() => installApp('5')}>
              <img width={'60%'} className="p-2" src={wooCommerceLogo} alt="" />
            </div>
            <div className="col-md-3 d-flex justify-content-center align-items-center cursor-pointer" title="Magento" onClick={() => installApp('2')}>
              <img width={'60%'} className="p-2" src={magentoLogo} alt="" />
            </div>
            <div className="col-md-3 d-flex justify-content-center align-items-center cursor-pointer" title="Others" onClick={() => installApp('other')}>
              <img width={'60%'} className="p-2" src={oyeconLogo} alt="" />
            </div>
          </div>
        </ModalBody>
        {/* <ModalFooter>
          <Button outline onClick={() => setEditModal(!editModal)}>
            Cancel
          </Button>
          <Button color='primary'>
            Continue
          </Button>
        </ModalFooter> */}
      </Modal>
    </div>
  )
}

export default Home