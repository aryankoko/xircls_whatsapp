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
import WorldMapLeadsDash from './Graphs/WorldMapLeadsDash'


const LeadsDash = () => {

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

      <Row className='p-2 match-height'>
        
        <Col md={3}>
          <Card className='shadow'>
            <CardBody>
              <h2 className='mb-3'>Active referees per months(2022)</h2>

                <div className='mb-2'>
                  <div className='d-flex align-items-center justify-content-between'><h6>Jan</h6><h6>2000</h6></div>
                  <Progress value={'95'}/>
                </div>

                <div className='mb-2'>
                  <div className='d-flex align-items-center justify-content-between'><h6>Feb</h6><h6>2000</h6></div>
                  <Progress value={'95'}/>
                </div>

                <div className='mb-2'>
                  <div className='d-flex align-items-center justify-content-between'><h6>Mar</h6><h6>2000</h6></div>
                  <Progress value={'95'}/>
                </div>

                <div className='mb-2'>
                  <div className='d-flex align-items-center justify-content-between'><h6>Apr</h6><h6>2000</h6></div>
                  <Progress value={'95'}/>
                </div>

                <div className='mb-2'>
                  <div className='d-flex align-items-center justify-content-between'><h6>May</h6><h6>2000</h6></div>
                  <Progress value={'95'}/>
                </div>

                <div className='mb-2'>
                  <div className='d-flex align-items-center justify-content-between'><h6>Jun</h6><h6>2000</h6></div>
                  <Progress value={'95'}/>
                </div>

                <div className='mb-2'>
                  <div className='d-flex align-items-center justify-content-between'><h6>July</h6><h6>2000</h6></div>
                  <Progress value={'95'}/>
                </div>

                <div className='mb-2'>
                  <div className='d-flex align-items-center justify-content-between'><h6>Aug</h6><h6>2000</h6></div>
                  <Progress value={'95'}/>
                </div>

                <div className='mb-2'>
                  <div className='d-flex align-items-center justify-content-between'><h6>Sept</h6><h6>2000</h6></div>
                  <Progress value={'95'}/>
                </div>

                <div className='mb-2'>
                  <div className='d-flex align-items-center justify-content-between'><h6>Oct</h6><h6>2000</h6></div>
                  <Progress value={'95'}/>
                </div>

                <div className='mb-2'>
                  <div className='d-flex align-items-center justify-content-between'><h6>Nov</h6><h6>2000</h6></div>
                  <Progress value={'95'}/>
                </div>

                <div className='mb-2'>
                  <div className='d-flex align-items-center justify-content-between'><h6>Dec</h6><h6>2000</h6></div>
                  <Progress value={'95'}/>
                </div>

            </CardBody>
          </Card>
        </Col>

        <Col md={9}>

          <Row className='match-height'>
            <Col md={8}>
              <Card className='shadow'>
                <CardBody>
                  <h2>Downloads over time</h2>
                  <ThreeLineGraph height={'300px'} />
                </CardBody>
              </Card>
            </Col>
            <Col md={4}>
              <Card className='shadow'>
                <CardBody>
                  <h3>Leads Breakdown(Today)</h3>
                  <ExpBarChart height={'300px'} />
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row className='match-height'>
            <Col md={9}>
              <Card className='shadow'>
                <CardBody>
                  <h3>Trial Leads By Region(Today)</h3>
                  <WorldMapLeadsDash />
                </CardBody>
              </Card>
            </Col>

            <Col md={3}>
              <Card className='shadow'>
                <CardBody>
                  <table className='w-100 text-center table'>
                    <thead>
                      <tr className='w-100 bg-primary text-white'>
                      <th scope='col' className='fs-5 w-50'>Region</th>
                      <th scope='col' className='fs-5 w-50'>Leads</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className='border-bottom'>
                        <td className='py-1'>Region 1</td>
                        <td className='py-1'>15</td>
                      </tr>
                      <tr className='border-bottom'>
                        <td className='py-1'>Region 2</td>
                        <td className='py-1'>16</td>
                      </tr>
                      <tr className='border-bottom'>
                        <td className='py-1'>Region 3</td>
                        <td className='py-1'>7</td>
                      </tr>
                      <tr className='border-bottom'>
                        <td className='py-1'>Region 4</td>
                        <td className='py-1'>8</td>
                      </tr>
                      <tr className='border-bottom'>
                        <td className='py-1'>Region 5</td>
                        <td className='py-1'>8</td>
                      </tr>
                      <tr className='border-bottom'>
                        <td className='py-1'>Region 6</td>
                        <td className='py-1'>8</td>
                      </tr>
                      <tr className='border-bottom'>
                        <td className='py-1'>Region 7</td>
                        <td className='py-1'>8</td>
                      </tr>
                    </tbody>
                  </table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>


    </div>
  )
}

export default LeadsDash