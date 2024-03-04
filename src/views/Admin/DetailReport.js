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
import PieChart from './Graphs/PieChart'
import ReactSpeedometer from 'react-d3-speedometer'


const DetailReport = () => {
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
        <Col md={4}>
          <Card className='shadow'>
            <CardBody>
              <ExpBarChart height={'250px'} />

              <div className='d-flex flex-column align-items-center justify-content-center'>
                <h3>Total Cost</h3>
                <h1>$1.3k</h1>
                <div className='d-flex align-items-center justify-content-start '>
                  <BiSolidUpArrow style={{marginRight:"5px", color:"green"}}/>
                  <h5 style={{marginRight:"5px", color:"green"}} className='d-flex align-items-center font-xl'><span style={{fontSize:"20px"}} className='d-flex align-items-end'>297</span>%</h5>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={4}>
          <Card className='shadow'>
            <CardBody>
            <ExpBarChart height={'250px'} />

            <div className='d-flex flex-column align-items-center justify-content-center'>
              <h3>All Conv. Value</h3>
              <h1>$231.1</h1>
              <div className='d-flex align-items-center justify-content-start '>
                <BiSolidUpArrow style={{marginRight:"5px", color:"green"}}/>
                <h5 style={{marginRight:"5px", color:"green"}} className='d-flex align-items-center font-xl'><span style={{fontSize:"20px"}} className='d-flex align-items-end'>297</span>%</h5>
              </div>
            </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={4}>
          <Card className='shadow'>
            <CardBody>
            <ExpBarChart height={'250px'} />

            <div className='d-flex flex-column align-items-center justify-content-center'>
              <h3>Curr. ROAS</h3>
              <h1>0.18</h1>
              <div className='d-flex align-items-center justify-content-start '>
                <BiSolidUpArrow style={{marginRight:"5px", color:"green"}}/>
                <h5 style={{marginRight:"5px", color:"green"}} className='d-flex align-items-center font-xl'><span style={{fontSize:"20px"}} className='d-flex align-items-end'>297</span>%</h5>
              </div>
            </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row className='match-height p-2'>
        <Col md={4}>
          <Card className='shadow'>
            <CardBody>
              <ExpBarChart height={'250px'} />

              <div className='d-flex flex-column align-items-center justify-content-center'>
                <h3>CPSU</h3>
                <h1>$0.9</h1>
                <div className='d-flex align-items-center justify-content-start '>
                  <BiSolidUpArrow style={{marginRight:"5px", color:"green"}}/>
                  <h5 style={{marginRight:"5px", color:"green"}} className='d-flex align-items-center font-xl'><span style={{fontSize:"20px"}} className='d-flex align-items-end'>297</span>%</h5>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={4}>
          <Card className='shadow'>
            <CardBody>
            <ExpBarChart height={'250px'} />

            <div className='d-flex flex-column align-items-center justify-content-center'>
              <h3>Impressions</h3>
              <h1>533.1K</h1>
              <div className='d-flex align-items-center justify-content-start '>
                <BiSolidUpArrow style={{marginRight:"5px", color:"green"}}/>
                <h5 style={{marginRight:"5px", color:"green"}} className='d-flex align-items-center font-xl'><span style={{fontSize:"20px"}} className='d-flex align-items-end'>297</span>%</h5>
              </div>
            </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={4}>
          <Card className='shadow'>
            <CardBody>
            <ExpBarChart height={'250px'} />

            <div className='d-flex flex-column align-items-center justify-content-center'>
              <h3>Paid SUTR</h3>
              <h1>0.18</h1>
              <div className='d-flex align-items-center justify-content-start '>
                <BiSolidUpArrow style={{marginRight:"5px", color:"green"}}/>
                <h5 style={{marginRight:"5px", color:"green"}} className='d-flex align-items-center font-xl'><span style={{fontSize:"20px"}} className='d-flex align-items-end'>297</span>%</h5>
              </div>
            </div>
            </CardBody>
          </Card>
        </Col>
      </Row>


      <Row className='match-height p-2'>
        <Col md={3}>
          <Card className='shadow'>
            <CardBody>
              <ExpBarChart height={'200px'} />

              <div className='d-flex flex-column align-items-center justify-content-center'>
                <h3>Swipe Ups</h3>
                <h1>1.4K</h1>
                <div className='d-flex align-items-center justify-content-start '>
                  <BiSolidUpArrow style={{marginRight:"5px", color:"green"}}/>
                  <h5 style={{marginRight:"5px", color:"green"}} className='d-flex align-items-center font-xl'><span style={{fontSize:"20px"}} className='d-flex align-items-end'>297</span>%</h5>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={3}>
          <Card className='shadow'>
            <CardBody>
            <ExpBarChart height={'200px'} />

            <div className='d-flex flex-column align-items-center justify-content-center'>
              <h3>Purchase Rate</h3>
              <h1>0.3%</h1>
              <div className='d-flex align-items-center justify-content-start '>
                <BiSolidUpArrow style={{marginRight:"5px", color:"green"}}/>
                <h5 style={{marginRight:"5px", color:"green"}} className='d-flex align-items-center font-xl'><span style={{fontSize:"20px"}} className='d-flex align-items-end'>297</span>%</h5>
              </div>
            </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={3}>
          <Card className='shadow'>
            <CardBody>
            <ExpBarChart height={'200px'} />

            <div className='d-flex flex-column align-items-center justify-content-center'>
              <h3>Purchase</h3>
              <h1>3</h1>
              <div className='d-flex align-items-center justify-content-start '>
                <BiSolidUpArrow style={{marginRight:"5px", color:"green"}}/>
                <h5 style={{marginRight:"5px", color:"green"}} className='d-flex align-items-center font-xl'><span style={{fontSize:"20px"}} className='d-flex align-items-end'>297</span>%</h5>
              </div>
            </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={3}>
          <Card className='shadow'>
            <CardBody>
            <ExpBarChart height={'200px'} />

            <div className='d-flex flex-column align-items-center justify-content-center'>
              <h3>Cost / Purchase</h3>
              <h1>$427.7</h1>
              <div className='d-flex align-items-center justify-content-start '>
                <BiSolidUpArrow style={{marginRight:"5px", color:"green"}}/>
                <h5 style={{marginRight:"5px", color:"green"}} className='d-flex align-items-center font-xl'><span style={{fontSize:"20px"}} className='d-flex align-items-end'>297</span>%</h5>
              </div>
            </div>
            </CardBody>
          </Card>
        </Col>
      </Row>


      <Row className='match-height p-2'>
        <Col>
          <Card className='shadow'>
            <CardBody>

              <table className='table text-center'>
                <thead>
                  <tr>
                  <th className='p-1'>Date</th>
                  <th className='p-1'>TOtal Cost</th>
                  <th className='p-1'>Imp.</th>
                  <th className='p-1'>Paid SUTR</th>
                  <th className='p-1'>CPSU</th>
                  <th className='p-1'>Swipe Ups</th>
                  <th className='p-1'>Purchase %</th>
                  <th className='p-1'>Purchases</th>
                  <th className='p-1'>Cost / Purchase</th>
                  <th className='p-1'>Conv. Revenue</th>
                  <th className='p-1'>Curr. ROAS</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>  
                    <td>Mar 31, 2021</td>
                    <td>158.4</td>
                    <td>45k</td>
                    <td>0.3%</td>
                    <td>$0.85</td>
                    <td>186</td>
                    <td>0.5%</td>
                    <td>1</td>
                    <td>158.4</td>
                    <td>$116</td>
                    <td>0.73</td>
                  </tr>
                </tbody>
              </table>

            </CardBody>
          </Card>
        </Col>
      </Row>


    </div>
  )
}

export default DetailReport