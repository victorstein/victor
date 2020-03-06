import React from 'react'
import { Card, Row, CardBody, CardTitle, Button, Col, Badge, UncontrolledTooltip } from 'reactstrap'

const CardRole = (props) => {
  return (
    <Card className='card-stats'>
      <CardBody>
        <Row>
          <Col>
            <div className='d-flex justify-content-start'>
              <div className='numbers'>
                <p className='card-category'>Name Role</p>
                <CardTitle tag='h3'>{props.rolaData.name}</CardTitle>
              </div>
            </div>
          </Col>
          <Col>
            <div className='d-flex justify-content-end'>
              <UncontrolledTooltip
                delay={0}
                target={`editButton_${props.rolaData.id}`}
              >
                    Edit Role
              </UncontrolledTooltip>
              <Button
                size='ms'
                className='btn-simple btn-link'
                color='warning'
                id={`editButton_${props.rolaData.id}`}
              >
                <i style={{ marginTop: '-6px' }} className='tim-icons icon-pencil' />
              </Button>
              <UncontrolledTooltip
                delay={0}
                target={`deleteButton_${props.rolaData.id}`}
              >
                    Delete Role
              </UncontrolledTooltip>
              <Button
                size='ms'
                className='btn-simple btn-link'
                color='danger'
                id={`deleteButton_${props.rolaData.id}`}
                // onClick={(e) => setAlertDelete({
                //   visible: true,
                //   user: value
                // })}
              >
                <i style={{ marginTop: '-6px' }} className='tim-icons icon-simple-remove' />
              </Button>
            </div>
          </Col>
        </Row>

        <div className='container'>
          <h4 className='text-center'>Permissions</h4>
          <div
            style={{
              overflowX: 'hidden',
              maxHeight: '180px',
              height: '180px'
            }}
          >
            <Row>
              {
                props.rolaData.permissions.map((value, index) => (
                  <Col
                    key={index}
                    className='pr-0 flex-grow-0'
                  >
                    <Badge color='info'>{value.name}</Badge>
                  </Col>
                ))
              }
            </Row>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default CardRole
