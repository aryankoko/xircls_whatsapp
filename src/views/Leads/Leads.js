
import { Col, Row, Card, CardBody } from 'reactstrap'
import DataTableWithButtons from '../tables/data-tables/basic/TableMultilingual'
import StatsCard from '../ui-element/Static'


const Leads = () => {
    
  return (
    <>
        {/* <Card>
            <CardBody>
                <h4>Leads</h4>
            </CardBody>
        </Card> */}
        <Row className='match-height'>
            <Col xl='12'>
                <StatsCard cols={{ xl: '3', sm: '6' }} />
            </Col>
        </Row>
        <Row>
            <Col>
                <Card>
                    <CardBody>
                        <DataTableWithButtons />
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </>
  )
}

export default Leads