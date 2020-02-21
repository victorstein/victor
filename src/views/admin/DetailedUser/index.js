import React from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardText,
  Row,
  Col
} from 'reactstrap'
import DetailData from './DetailData'

const DetailIndex = () => {
  return (
    <div>
      <Row>
        <Col md='3'>
          <Card className='card-user'>
            <CardBody>
              <CardText />
              <div className='author'>
                <div className='block block-one' />
                <div className='block block-two' />
                <div className='block block-three' />
                <div className='block block-four' />
                <a href='#pablo' onClick={e => e.preventDefault()}>
                  <img
                    alt='...'
                    className='avatar'
                    src={require('assets/img/emilyz.jpg')}
                  />
                  <h5 className='title'>Mike Andrew</h5>
                </a>
                <p className='description'>website developer</p>
              </div>
              <div className='card-description'>
                <h5>Description</h5>
                Do not be scared of the truth because we need to restart the
                human foundation in truth And I love you like Kanye loves
                Kanye I love Rick Owens’ bed design but the back is...
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md='9'>
          <Card className='h-100'>
            <CardHeader>
              <h3 className='title'>User Information</h3>
            </CardHeader>
            <CardBody>
              <DetailData />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default DetailIndex
