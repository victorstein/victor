import React, { useState, useEffect } from 'react'
import { Card, Row, CardBody, CardTitle, Button, Col, Badge, UncontrolledTooltip } from 'reactstrap'
import UseContex from './store'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const deleteRoleByid = gql`
  mutation deleteRoleByid(
  $id : String!
  ){
  deleteRoleById(id : $id)
  }
`

const CardRole = (props) => {
  const STORE = React.useContext(UseContex.contextStore)

  const [sendMutation, setSendMutation] = useState(false)

  const [deleteRoleMutation, { loading, error }] = useMutation(deleteRoleByid, {
    refetchQueries: ['roles']
  })

  useEffect(() => {
    if (sendMutation) {
      if (!loading) {
        STORE.actions.AlertGloval({
          message: 'Prueba Alert',
          options: {
            icon: 'icon-bulb-63',
            type: 'info',
            autoDismiss: 4,
            place: 'tr'
          }
        })
      }
    }
  }, [sendMutation])

  const deleteRole = async (e) => {
    e.preventDefault()
    await deleteRoleMutation({
      variables: {
        id: props.rolaData.id
      }
    })
    setSendMutation(true)
    // console.log('idRole', props.rolaData.id)
  }

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
                onClick={(e) => {
                  STORE.setState({
                    idRole: props.rolaData.id
                  })
                  props.setOpenModal(true)
                }}
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
                onClick={(e) => deleteRole(e)}
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
              height: '180px',
              padding: '2px'
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
