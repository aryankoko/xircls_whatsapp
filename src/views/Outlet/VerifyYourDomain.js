import React, { useEffect, useState } from 'react'
import { Card, CardBody, Col, Input, Row } from 'reactstrap'
import { getReq, postReq } from '../../assets/auth/jwtService'
import CampaignNav from './components/CampaignNav'
import { useParams } from 'react-router-dom'
import Spinner from '../Components/DataTable/Spinner'
import toast from 'react-hot-toast'
import FrontBaseLoader from '../Components/Loader/Loader'


const VerifyYourDomain = () => {

  const [data, setData] = useState({
    domainName: "",
    status: 0,
    isLoading: true,
    DKIM: [],
    TXT: [],
    domainStatus: ""
  })
  const [apiLoader, setApiLoader] = useState(false)
  const { id } = useParams()

  const getData = () => {
    getReq('verifyDomain', `?OUTLET_ID=${id}`)
    .then((resp) => {
      console.log(resp)
      const updateData = {
        domainName: resp?.data?.success?.data?.TXT?.Domain_Name,
        status: resp?.data?.success?.status,
        DKIM: resp?.data?.success?.data?.DKIM,
        TXT: resp?.data?.success?.data?.TXT,
        domainStatus: resp?.data?.success?.data?.status,
        isLoading: false
      }
      setData((preData) => ({
        ...preData,
        ...updateData
      }))
    })
    .catch((error) => {
      console.log(error)
      const updateData = {
        domainName: "",
        status: 0,
        isLoading: false,
        DKIM: [],
        TXT: [],
        domainStatus: ""
      }
      setData((preData) => ({
        ...preData,
        ...updateData
      }))
    })
  }

  useEffect(() => {
    getData()
  }, [])

  const generateToken = () => {
    console.log(data.domainName)
    setApiLoader(true)
    if (data.domainName) {
      const form_data = new FormData()
      form_data.append("OUTLET_ID", id)
      form_data.append("domain_name", data?.domainName)
      postReq('verifyDomain', form_data)
      .then((resp) => {
        console.log(resp)
        setApiLoader(false)
        document.getElementById('value_val').innerHTML = ""
        toast.success("Token generated")
        getData()
      })
      .catch((error) => {
        console.log(error)
        setApiLoader(false)
        toast.error("Something went wrong!")
      })
    } else {
      document.getElementById('value_val').innerHTML = "Please enter a domain name"
      setApiLoader(false)

    }
  }

  return (
    <Row className="match-height">
        {
          apiLoader ? <FrontBaseLoader /> : ''
        }
        <Col md="3">
            <Card>
                <CardBody>
                    <CampaignNav />
                </CardBody>
            </Card>
        </Col>
        <Col md="9">
          <Card>
            <CardBody>
              {
                data?.isLoading ? <div className='d-flex justify-content-center align-items-center py-2'>
                  <Spinner size='40px' />
                </div> : (
                  <>
                    
                    <Row>
                      <Col md="12">
                        <div className="d-flex justify-content-center align-items-center gap-1">
                          {
                            data?.status === 1 ? (
                              <input className='form-control' value={data?.domainName} disabled />
                            ) : (
                              <>
                                <input className='form-control' placeholder='Please enter your domain name' value={data?.domainName} onChange={(e) => setData({...data, domainName: e.target.value})} />
                                
                              </>
                            )
                          }

                          {
                            data?.status === 1 ? <input className='form-control' disabled value={'DNS Records Successfully Generated'} /> : <a className='btn btn-primary' style={{whiteSpace: "nowrap"}} onClick={() => generateToken()}>Generate Verification Token</a>
                          }
                        </div>
                        <p id="value_val" className="text-danger m-0 p-0 vaildMessage"></p>
                      </Col>
                    </Row>

                    {
                      data?.status === 1 ? <>
                      
                        <Row className='mt-2'>
                          <h4 className="text-center">DNS Records</h4>
                          <table className="table table-bordered table-striped mx-1 table-vcenter">
                            <thead>
                                <tr>
                                    <th colSpan="2" width="25%">Record Type - CNAME</th>
                                    <th className="font-w700"></th>
                                    <th className="font-w700 text-center" width="90px" align="center">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                              {
                                data?.DKIM?.map((curElem, key) => {
                                  return (
                                    <>
                                      <tr>
                                          <td align="center" rowSpan="2" width="50px" style={{borderTopColor: "#fff"}}>{key + 1}</td>
                                          <td>Record Name </td>
                                          <td><span className="badge badge-light-success">{curElem?.Record_Name}</span><br /></td>
                                          <td className="d-none d-sm-table-cell" align="center" rowSpan="2" style={{borderTopColor: "#fff", borderBottomColor: "#fff"}}>
                                              <span className="badge badge-light-primary">{data?.domainStatus}</span>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td>Record Value </td>
                                          <td><span className="badge badge-light-success">{curElem?.Record_Value}</span><br /></td>
                                      </tr>
                                    </>
                                  )
                                })
                              }
                            </tbody>

                          </table>
                        </Row>

                        <Row className='mt-2'>
                          <table className="table table-bordered table-striped mx-1 table-vcenter">
                            <thead>
                                <tr>
                                  <th colSpan="2" width="25%">Record Type - TXT</th>
                                  <th className="font-w700"></th>
                                  <th className="font-w700 text-center" width="90px" align="center">Status</th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td align="center" rowSpan="2" width="50px" style={{borderTopColor: "#fff"}}>1</td>
                                    <td>Record Name </td>
                                    <td><span className="badge badge-light-success">{data?.TXT?.TXT_Name}</span><br /></td>
                                    <td className="d-none d-sm-table-cell" align="center" rowSpan="2" style={{borderTopColor: "#fff", borderBottomColor: "#fff"}}>
                                        <span className="badge badge-light-primary">{data?.domainStatus}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Record Value </td>
                                    <td><span className="badge badge-light-success">{data?.TXT?.TXT_token}</span><br /></td>
                                </tr>
                            </tbody>

                          </table>
                        </Row>
                      
                      </> : ""
                    }

                      
                  </>
                )
              }
            </CardBody>
          </Card>
        </Col>
    </Row>
    
  )
}

export default VerifyYourDomain