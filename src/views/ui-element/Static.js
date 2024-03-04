
// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Row, CardText } from 'reactstrap'
import Avatar from '@components/avatar'

const StatsCard = ({ data, header }) => {
  

  return (
    <Card className='card-statistics'>
      {
        header ? <CardHeader>
          <CardTitle tag='h4'>{header}</CardTitle>
        </CardHeader> : ''
      }
      
      <CardBody className='statistics-body'>
        <Row>
            {
                data?.map((currElem, i) => {
                    return (
                        <div key={i} className="col-xl-4 col-sm-6 col-12 mb-2 mb-sm-0">
                            <div className="media d-flex">
                                <Avatar color={currElem.color} icon={currElem.icon} className='me-2' />
                                <div className='my-auto'>
                                    <h4 className='fw-bolder mb-0'>{currElem.title}</h4>
                                    <CardText className='font-small-3 mb-0'>{currElem.subtitle}</CardText>
                                </div>  
                            </div>
                        </div>
                    )
                })  
            }
        </Row>
      </CardBody>
    </Card>
  )
}

export default StatsCard
