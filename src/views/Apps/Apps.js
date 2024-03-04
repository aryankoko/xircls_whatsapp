import React, { useContext, useState, useEffect } from "react"
import { Container, Row, Col, ModalBody, ModalHeader, Modal } from "reactstrap"
import { useNavigate } from "react-router-dom"
import { PermissionProvider, ActiveAppsProvider } from "../../Helper/Context"
import { getReq, postReq } from "../../assets/auth/jwtService"
import shopifyLogo from '@src/assets/images/logo/shopify-logo.png'
import wooCommerceLogo from '@src/assets/images/logo/WooCommerce_logo.png'
import magentoLogo from '@src/assets/images/logo/magento-logo.png'
import oyeconLogo from '@src/assets/images/logo/oyecon.png'
import FrontBaseLoader from "../Components/Loader/Loader"
import AppCom from "./components/AppComp"
import Spinner from "../Components/DataTable/Spinner"
import { dashboardURL } from "../Validator"

const Apps = () => {

  const navigate = useNavigate()
  const [userApps, setUserApps] = useState([])
  const { setUserPermission, userPermission } = useContext(PermissionProvider)
  const { setActiveApps, activeApps } = useContext(ActiveAppsProvider)
  const [editModal, setEditModal] = useState(false)
  const [apiLoader, setApiLoader] = useState(false)
  // const [platforms, setPlatforms] = useState()
  const [pending, setPending] = useState(["shopify", "other"])

  const platforms = [
    {
      name: "shopify",
      title: "Shopify",
      image: shopifyLogo
    },
    {
      name: "woocommerce",
      title: "Woo Commerce",
      image: wooCommerceLogo
    },
    {
      name: "magento",
      title: "Magento",
      image: magentoLogo
    },
    {
      name: "other",
      title: "Other",
      image: oyeconLogo
    }
  ]

  const [data, setData] = useState({
    selectApp: "",
    isLoading: true
  })
  // const pending = ["woocommerce", "magento"]

  const openModal = () => {
    // const dupArry = platforms
    // console.log(data?.selectApp)

    // if (platformIndex !== -1) {
    if (data?.selectApp === "crm") {
      setPending(["other"])
    } else {
      setPending(["shopify", "other"])
    }
    // }
    // setPlatforms([...dupArry])
    setEditModal(!editModal)
  }

  useEffect(() => {
    if (data?.selectApp) {
      openModal()
    }
  }, [data?.selectApp])

  const getAppsData = () => {
    getReq('getAllApps')
      .then((res) => {
        console.log(res)
        setUserApps(res?.data)
        setActiveApps(res?.data)
        const updatedData = {
          isLoading: false
        }
        setData((preData) => ({
          ...preData,
          ...updatedData
        }))
      })
      .catch((error) => {
        console.log(error)
        const updatedData = {
          isLoading: false
        }
        setData((preData) => ({
          ...preData,
          ...updatedData
        }))
      })
  }

  const installApp = (name) => {

    setEditModal(false)
    setApiLoader(true)
    const form_data = new FormData()
    form_data.append('plugin_name', name)
    form_data.append('app', data?.selectApp)
    postReq('installPlugin', form_data)
      .then((resp) => {
        console.log(resp)
        // setApiLoader(false)
        if (name === "other") {
          navigate("/merchant/customers/")
          setUserPermission({ ...userPermission, appName: data?.selectApp, installedApps: [...resp?.data?.install_app] })
        } else {
          window.location.href = resp?.data?.data
        }

      })
      .catch((error) => {
        console.log(error)
        setApiLoader(false)

      })

  }

  useEffect(() => {
    getAppsData()
  }, [])

  console.log(activeApps, "activeApps")

  return (
    <Container>
      {
        apiLoader ? <FrontBaseLoader /> : ''
      }
      {
        <>

          <h4 className="my-2">
            Must-have apps for every step of the buyer journey
          </h4>

          <Row className="match-height">

            {
              !data?.isLoading ? userApps?.filter((curElem) => curElem.is_active).map((curElem) => {
                return <>
                  <Col md="4">
                    <AppCom
                      title={curElem?.name}
                      data={curElem?.description}
                      button={userPermission?.installedApps.includes(curElem?.slug?.toLowerCase()) ? (
                        <a onClick={() => {
                          setUserPermission({ ...userPermission, appName: curElem?.slug?.toLowerCase() })
                          navigate(dashboardURL[curElem?.slug?.toLowerCase()])
                        }}
                          className="btn btn-primary"
                        >
                          Dashboard
                        </a>
                      ) : (
                        <a onClick={() => {
                          setData({ ...data, selectApp: curElem?.slug?.toLowerCase() })
                          // openModal(curElem?.slug?.toLowerCase())
                          // setEditModal(!editModal)
                        }} className="btn btn-primary">
                          Install App
                        </a>
                      )
                      } />
                  </Col>
                </>

              }) : <div className="mt-2 d-flex justify-content-center align-items-center">
                <Spinner size={'40px'} />
              </div>
            }

          </Row>
        </>
      }

      <Modal
        isOpen={editModal}
        toggle={() => setEditModal(!editModal)}
        className='modal-dialog-centered'
        size='lg'
      >
        <ModalHeader toggle={() => setEditModal(!editModal)}>Select Platform</ModalHeader>
        <ModalBody>
          <div className="row">
            {
              platforms?.map((curElem) => {
                return pending?.includes(curElem?.name) ? <>
                  <div className="col-md-3" title={curElem?.title} onClick={() => installApp(curElem?.name)}>
                    <div className="d-flex justify-content-center align-items-center cursor-pointer" style={{ width: '110px', height: '110px' }}>
                      <img width={'100%'} className="p-2" src={curElem?.image} alt="" />
                    </div>
                  </div>
                </> : <>
                  <div className="col-md-3" title={curElem?.title}>
                    <div className="d-flex justify-content-center align-items-center cursor-pointer" style={{ width: '110px', height: '110px', filter: 'brightness(40%)' }}>
                      <img width={'100%'} className="p-2" src={curElem?.image} alt="" />
                    </div>
                    <h6>Coming Soon!</h6>
                  </div>
                </>
              })
            }

            {/* <div className="col-md-3" title="Woo Commerce" onClick={() => installApp('woocommerce')}>
              <div className="d-flex justify-content-center align-items-center cursor-pointer" style={{width: '110px', height: '110px', filter: 'brightness(40%)'}}>
                <img width={'100%'} className="p-2" src={wooCommerceLogo} alt="" />
              </div>
              <h6>Coming Soon!</h6>
            </div>
            <div className="col-md-3" title="Magento" onClick={() => installApp('magento')}>
              <div className="d-flex justify-content-center align-items-center cursor-pointer" style={{width: '110px', height: '110px', filter: 'brightness(40%)'}}>
                <img width={'100%'} className="p-2" src={magentoLogo} alt="" />
              </div>
              <h6>Coming Soon!</h6>
            </div>
            <div className="col-md-3" title="Others" onClick={() => installApp('other')}>
              <div className="d-flex justify-content-center align-items-center cursor-pointer" style={{width: '110px', height: '110px'}}>
                <img width={'100%'} className="p-2" src={oyeconLogo} alt="" />
              </div>
            </div> */}
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

    </Container>
  )
}

export default Apps