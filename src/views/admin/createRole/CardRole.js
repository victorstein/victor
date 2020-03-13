import React, { useState, useEffect } from 'react'
import { Card, Row, CardBody, CardTitle, Button, Col, Badge, UncontrolledTooltip } from 'reactstrap'
import UseContex from './store'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import SweetAlert from 'react-bootstrap-sweetalert'
import { ClipLoader } from 'react-spinners'
import Lottie from 'react-lottie'
import animationEmptyBox from '../../../assets/lottie/emptyBox.json'

const deleteRoleByid = gql`
  mutation deleteRoleByid(
  $id : String!
  ){
  deleteRoleById(id : $id)
  }
`

const CardRole = (props) => {
  const STORE = React.useContext(UseContex.contextStore)

  // const [sendMutation, setSendMutation] = useState(false)
  const [visibleDeleteModal, setVisibleDeleteMOdal] = useState(false)

  const [deleteRoleMutation, { loading, error }] = useMutation(deleteRoleByid, {
    refetchQueries: ['roles'], awaitRefetchQueries: true
  })

  useEffect(() => {
    let messageError = ''
    if (error) {
      if (Array.isArray(error.graphQLErrors)) {
        messageError = error.graphQLErrors[0].message
      } else {
        messageError = error.graphQLErrors
      }
      console.log(messageError)
      console.log('messageError', error.graphQLErrors)
      STORE.actions.AlertGloval({
        message: messageError,
        options: {
          icon: 'icon-alert-circle-exc',
          type: 'danger',
          autoDismiss: 4,
          place: 'tr'
        }
      })
      setVisibleDeleteMOdal(false)
    }
  }, [error])

  const deleteRole = async () => {
    try {
      await deleteRoleMutation({
        variables: {
          id: props.rolaData.id
        }
      })
      if (!error) {
        STORE.actions.AlertGloval({
          message: 'Delete Role Successfully',
          options: {
            icon: 'icon-bulb-63',
            type: 'info',
            autoDismiss: 4,
            place: 'tr'
          }
        })
      }
    } catch (e) {
      console.log(e)
    }
    // console.log('idRole', props.rolaData.id)
  }

  return (
    <Card className='card-stats'>
      {
        (visibleDeleteModal) &&
          <SweetAlert
            warning
            showCancel
            onConfirm={(e) => deleteRole()}
            title='Atention!'
            customButtons={
              <>
                <Button
                  color='danger'
                  className='animation-on-hover'
                  onClick={(e) => setVisibleDeleteMOdal(false)}
                  disabled={loading}
                >Cancel
                </Button>
                <Button
                  color='info'
                  className='animation-on-hover'
                  onClick={(e) => deleteRole()}
                  disabled={loading}
                >
                  {
                    (loading)
                      ? (
                        <ClipLoader
                          size={20}
                          color='#FFFFFF'
                          loading
                        />
                      )
                      : ' Yes, delete it!'
                  }
                </Button>
              </>
            }
            focusCancelBtn
          >
            <p style={{ color: 'black' }}>
              <span>Are you sure you want to delete the role :</span>
            </p>
            <strong> {props.rolaData.name}</strong>
          </SweetAlert>
      }
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
                onClick={(e) => setVisibleDeleteMOdal(true)}
              >
                <i style={{ marginTop: '-6px' }} className='tim-icons icon-simple-remove' />
              </Button>
            </div>
          </Col>
        </Row>

        <div className='container'>
          <h4 className='text-center'>Permissions</h4>

          {
            (props.rolaData.permissions.length !== 0) ? (
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
            ) : (
              <Col className='col-12'>
                <div style={{ overflow: 'auto' }}>
                  <Lottie
                    isClickToPauseDisabled
                    options={{
                      loop: true,
                      autoplay: true,
                      animationData: animationEmptyBox,
                      rendererSettings: {
                        preserveAspectRatio: 'xMidYMid slice'
                      }
                    }}
                    height='79%'
                    width='76%'
                  />
                </div>
              </Col>
            )
          }
        </div>
      </CardBody>
    </Card>
  )
}

export default CardRole
