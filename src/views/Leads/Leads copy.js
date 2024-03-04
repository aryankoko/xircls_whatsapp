
import { Col, Row, Card, CardBody, Table } from 'reactstrap'
import StatsCard from '../ui-element/Static'
import axios from 'axios'
import { useEffect, useState, React } from 'react'


const Leads = () => {
    const [data, setData] = useState(null)
    useEffect(() => {
        axios.get('https://www.xircls.com/api/v1/customer_details/').then(res => setData(res.data.response))
        return () => setData(null)
      }, [])
    //   console.log(data)
  return (
    <>
        <Card>
            <CardBody>
                <h4>Leads</h4>
            </CardBody>
        </Card>
        <Row className='match-height'>
            <Col xl='12'>
                <StatsCard cols={{ xl: '3', sm: '6' }} />
            </Col>
        </Row>
        <Row>
            <Col>
            <Card>
                <CardBody>
                    <Table id='myTable' striped bordered hover>
                        <thead>
                            <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data ? data.map((curElem, i) => {
                                    return <tr key={i}><td>{curElem[0]}</td></tr>
                                }) : <td>NO DATA</td>
                            }
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
            </Col>
            
        </Row>
    </>
  )
}

export default Leads 