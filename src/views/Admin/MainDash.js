import React from 'react'
import ReportsNav from './ReportsNav'
import { Card, CardBody, Col, Container, Row, Progress } from 'reactstrap'
import { BiSolidUpArrow } from 'react-icons/bi'
import { GrCircleInformation } from 'react-icons/gr'
import { GoDotFill } from 'react-icons/go'
import TwoLineGraph from './Graphs/TwoLineGraph'
import ThreeLineGraph from './Graphs/ThreeLineGraph'
import LineGraph from './Graphs/LineGraph'
import ExpBarChart from './Graphs/ExpBarChart'
import ReactSpeedometer from 'react-d3-speedometer'
// import { Link } from 'react-router-dom'


const MainDash = () => {
  return (
    <div>
      <ReportsNav />

      {/* filter starts */}
      <div className='d-flex align-items-center justify-content-start gap-3 p-2'>

        <div>
          <label htmlFor='product'>Product</label>
          <select className='form-control' name='product' style={{padding:"5px"}}>
            <option>Product 1</option>
            <option>Product 2</option>
          </select>
        </div>

        <div>
          <label htmlFor='company'>Company</label>
          <select className='form-control' name='company' style={{padding:"5px"}}>
            <option>Company 1</option>
            <option>Company 2</option>
          </select>
        </div>

        <div>
          <label htmlFor='time-period'>Time Period</label>
          <select className='form-control' name='time-period' style={{padding:"5px"}}>
            <option>Current Quarter</option>
            <option>Last Quarter</option>
          </select>
        </div>

      </div>
      {/* filter ends */}

      <Row className='match-height p-2'>
        <Col md={2}>

          <Card className='shadow'>
            <CardBody>
              <h3 className='mb-3'>Sales</h3>

              <div >
                <div className='mb-3'>
                  <h1 className='d-flex align-items-center font-xl'>$<span style={{fontSize:"60px", marginRight:"10px"}} className='d-flex align-items-end'>297</span>k</h1>
                  <h4>this month</h4>

                  <div className='d-flex align-items-center justify-content-center '>
                    <BiSolidUpArrow style={{marginRight:"5px", color:"green"}}/>
                    <h5 style={{marginRight:"5px", color:"green"}} className='d-flex align-items-center font-xl'>$<span style={{fontSize:"25px"}} className='d-flex align-items-end'>297</span>k</h5>

                    <h5>vs last month</h5>
                  </div>
                </div>

                <div className=''>
                  <h1 className='d-flex align-items-center font-xl'>$<span style={{fontSize:"60px", marginRight:"10px"}} className='d-flex align-items-end'>9.6</span>k</h1>
                  <h4>today</h4>
                </div>

                <div className=''>
                  <h1 className='d-flex align-items-center font-xl'>$<span style={{fontSize:"60px", marginRight:"10px"}} className='d-flex align-items-end'>20.6</span>k</h1>
                  <h4>yesterday </h4>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col md={4}>

          <Card className='shadow'>
            <CardBody>
              <h3 className='mb-1'>Customer Support</h3>

              <div className='mt-2'>
                <h4>CSAT</h4>
                <div className='d-flex align-items-center justify-content-center p-2'>
                  <ReactSpeedometer 
                  maxValue={500}
                  value={473}
                  needleColor="red"
                  startColor="green"
                  segments={4}
                  endColor="blue"
                  height={180}
                  textColor={'black'}
                  />
                </div>

                <div className='mb-2'>
                  <h1 className='d-flex align-items-center font-xl'><span style={{fontSize:"60px", marginRight:"10px"}} className='d-flex align-items-end'>198</span>min</h1>
                  <h4>First Reply Time</h4>

                  <div className='d-flex align-items-center justify-content-start '>
                    <BiSolidUpArrow style={{marginRight:"5px", color:"red"}}/>
                    <h5 style={{marginRight:"5px", color:"red"}} className='d-flex align-items-center font-xl'><span style={{fontSize:"25px"}} className='d-flex align-items-end'>16</span>%</h5>
                  </div>
                </div>

              </div>

            </CardBody>
          </Card>
        </Col>


        <Col md={4}>

          <Card className='shadow'>
            <CardBody>
              <h3 className='mb-2'>Biggest Deals This Month</h3>

              <table className="table" >
                    <tbody>
                        <tr style={{borderBottom:"1px solid whitesmoke"}}>
                            <td scope="row" className='text-start'>Alice</td>
                            <td className='text-end'>$8600</td>
                        </tr>
                    </tbody>
                </table>

            </CardBody>
          </Card>
        </Col>


        <Col md={2}>

          <Card className='shadow'>
            <CardBody>
              <div className=''>
                <h4 className='d-flex align-items-center font-xl'>$<span style={{fontSize:"30px", marginRight:"10px"}} className='d-flex align-items-end'>984.6</span>k</h4>
                <h6>Total MRR</h6>
              </div>

              <div className=''>
                <h4 className='d-flex align-items-center font-xl'><span style={{fontSize:"30px", marginRight:"10px"}} className='d-flex align-items-end'>9875</span></h4>
                <h6>Paying Customers</h6>
              </div>

              <div className=''>
                <h4 className='d-flex align-items-center font-xl'><span style={{fontSize:"30px", marginRight:"10px"}} className='d-flex align-items-end'>23.5</span>k</h4>
                <h6>Free Plan Customers</h6>
              </div>

              <div className=''>
                <h4 className='d-flex align-items-center font-xl'><span style={{fontSize:"30px", marginRight:"10px"}} className='d-flex align-items-end'>5145</span></h4>
                <h6>Signups This Month</h6>
              </div>

              <div className=''>
                <h4 className='d-flex align-items-center font-xl'><span style={{fontSize:"30px", marginRight:"10px"}} className='d-flex align-items-end'>4581</span></h4>
                <h6>Daily Active Users</h6>
              </div>

              <div className=''>
                <h4 className='d-flex align-items-center font-xl'><span style={{fontSize:"30px", marginRight:"10px"}} className='d-flex align-items-end'>8959</span></h4>
                <h6>Monthly Active Users</h6>
              </div>

              <div className=''>
                <h4 className='d-flex align-items-center font-xl'><span style={{fontSize:"30px", marginRight:"10px"}} className='d-flex align-items-end'>51.1</span>%</h4>
                <h6>DAU / MAU</h6>
              </div>
              
            </CardBody>
          </Card>
        </Col>

      </Row>

      <Row className='match-height p-2 '>
        <Col md={6}>
          <Card className='shadow bg-white'>
            <CardBody>
              <h1>Forecast</h1>

              <TwoLineGraph height="480"/>

            </CardBody>
          </Card>
        </Col>

        <Col>
          <Row className='match-height'>
            <Col md={8}>
              <Card className='shadow'>
                <CardBody>
                  <h4>On-boarding funnel</h4>

                  <ExpBarChart height={'350'} />

                </CardBody>
              </Card>
            </Col>

            <Col md={4}>
              <Card className='shadow'>
                <CardBody>
                  <h4>Customer Value</h4>

                  <div className=''>
                    <h4 className='d-flex align-items-center font-xl'>$<span style={{fontSize:"40px", marginRight:"10px"}} className='d-flex align-items-end'>781</span></h4>
                    <h6>LTV</h6>
                  </div>

                  <div className=''>
                    <h4 className='d-flex align-items-center font-xl'>$<span style={{fontSize:"40px", marginRight:"10px"}} className='d-flex align-items-end'>343</span></h4>
                    <h6>CAC</h6>
                  </div>

                  <div className=''>
                    <h4 className='d-flex align-items-center font-xl'><span style={{fontSize:"40px", marginRight:"5px"}} className='d-flex align-items-end'>17</span>mth</h4>
                    <h6>Avg. lifetime</h6>
                  </div>

                  <div className=''>
                    <h4 className='d-flex align-items-center font-xl'>x<span style={{fontSize:"40px", marginRight:"10px"}} className='d-flex align-items-end'>2.28</span></h4>
                    <h6>LTV:CAC ratio</h6>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          
          <Row className='match-height'>
            <Col md={8}>
              <Card className='shadow'>
                <CardBody>
                  <h4>Website(past 7 days)</h4>

                  <div className='d-flex align-items-center justify-content-around'>
                    <div className=''>
                      <h4 className='d-flex align-items-center font-xl'><span style={{fontSize:"40px", marginRight:"10px"}} className='d-flex align-items-end'>27.2</span>k</h4>
                      <h6>Users</h6>
                      <div className='d-flex align-items-center justify-content-center '>
                        <BiSolidUpArrow style={{marginRight:"5px", color:"green"}}/>
                        <h5 style={{marginRight:"5px", color:"green"}} className='d-flex align-items-center font-xl'>$<span style={{fontSize:"20px"}} className='d-flex align-items-end'>297</span>k</h5>

                        <h5>vs last week</h5>
                      </div>
                    </div>

                    <div className=''>
                      <h4 className='d-flex align-items-center font-xl'><span style={{fontSize:"40px", marginRight:"10px"}} className='d-flex align-items-end'>126</span></h4>
                      <h6>Enquiries</h6>
                      <div className='d-flex align-items-center justify-content-center '>
                        <BiSolidUpArrow style={{marginRight:"5px", color:"green"}}/>
                        <h5 style={{marginRight:"5px", color:"green"}} className='d-flex align-items-center font-xl'>$<span style={{fontSize:"20px"}} className='d-flex align-items-end'>297</span>k</h5>

                        <h5>vs last week</h5>
                      </div>
                    </div>

                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col md={4}>
              <Card className='shadow'>
                <CardBody>
                <h3>Social Media</h3>
                <div className='d-flex flex-column align-items-center justify-content-center'>
                  <h4 className='d-flex align-items-center font-xl'><span style={{fontSize:"40px", marginRight:"10px"}} className='d-flex align-items-end'>8178</span></h4>
                  <h6>Brand mentions(social)</h6>
                  <div className='d-flex align-items-center justify-content-start '>
                    <BiSolidUpArrow style={{marginRight:"5px", color:"green"}}/>
                    <h5 style={{marginRight:"5px", color:"green"}} className='d-flex align-items-center font-xl'>$<span style={{fontSize:"20px"}} className='d-flex align-items-end'>297</span>k</h5>

                    <h5>vs last month</h5>
                  </div>
                </div>
                  
                </CardBody>
              </Card>
            </Col>
          </Row>

        </Col>

      </Row>

      <Row className='p-2'>
        <Col md={12}>
          <Card className='shadow'>
            <CardBody>
              <h1>Sessions<GrCircleInformation style={{marginLeft:"5px"}} size={20}/></h1>

              {/* graph with markers */}
              <TwoLineGraph height="400" />
            
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row className='p-2 match-height'>
        <Col md={5}>
          <Card className='shadow'>
            <CardBody>
              <h3 className='mb-2'>Forecast by state</h3>
              <div>
                <table className="w-100 text-center" md={5}>
                  <thead>
                      <tr>
                          <th></th>
                          <th className='fs-6'>Forecast</th>
                          <th className='fs-6'>Q3 Adjusted</th>
                          <th className='fs-6'>Actual</th>
                          <th className='fs-6'>Risk</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td className='fs-6'>AL</td>
                          <td className='fs-6'>$250</td>
                          <td className='fs-6'>-$5</td>
                          <td className='fs-6'>$200</td>
                          <td className='fs-6' style={{color:"red"}}><GoDotFill size={30} /></td>
                      </tr>
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col md={4}>
          <Card className='shadow'>
            <CardBody>
              <h3>Retention</h3>

             <LineGraph height="350"/>

            </CardBody>
          </Card>
        </Col>

        <Col md={3}>
          <Card className='shadow'>
            <CardBody>
              <h3 className='mb-3'>MRR</h3>

              <div className=''>
                <h1 className='d-flex align-items-center font-xl'>$<span style={{fontSize:"60px", marginRight:"10px"}} className='d-flex align-items-end'>823.8</span>k</h1>
                <h4>Current MRR</h4>
                <div className='d-flex align-items-start justify-content-start '>
                  <BiSolidUpArrow style={{marginRight:"5px", color:"green"}}/>
                  <h5 style={{marginRight:"5px", color:"green"}} className='d-flex align-items-center font-xl'>$<span style={{fontSize:"20px"}} className='d-flex align-items-end'>297</span>k</h5>

                  <h5>vs last week</h5>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row className='match-height p-2'>
        <Col md={6}>
          <Card className='shadow'>
            <CardBody>
              <h1>Widgets added</h1>

              <ThreeLineGraph height="350" />

            </CardBody>
          </Card>
        </Col>

        <Col md={4}>
          <Card className='shadow'>
            <CardBody>
              <h1 className='mb-3'>Demographic Breakdown</h1>
              <div>
                
                <div className='mb-3'>
                  <div className='d-flex align-items-center justify-content-between'><h6>United States</h6><h6>6589</h6></div>
                  <Progress value={'95'}/>
                </div>

                <div className='mb-3'>
                  <div className='d-flex align-items-center justify-content-between'><h6>Germany</h6><h6>1456</h6></div>
                  <Progress value={'28'}/>
                </div>

                <div className='mb-3'>
                  <div className='d-flex align-items-center justify-content-between'><h6>UK</h6><h6>1345</h6></div>
                  <Progress value={'25'}/>
                </div>

                <div className='mb-3'>
                  <div className='d-flex align-items-center justify-content-between'><h6>Canada</h6><h6>451</h6></div>
                  <Progress value={'15'}/>
                </div>
              
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col md={2}>
          <Card className='shadow'>
            <CardBody>
              <h3 className='mb-3'>Web conv. rate</h3>
              <h4 className='d-flex align-items-center font-xl'><span style={{fontSize:"40px", marginRight:"10px"}} className='d-flex align-items-end'>823.8</span>%</h4>
              <h6>Current MRR</h6>

              <LineGraph height="200" />

            </CardBody>
          </Card>
        </Col>
      </Row>


    </div>
  )
}

export default MainDash