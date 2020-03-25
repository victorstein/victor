import React, { useState } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Col,
  Row,
  UncontrolledTooltip
} from 'reactstrap'
import { BeatLoader } from 'react-spinners'
import UseContex from './ContexStore'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import moment from 'moment'

const projectByid = gql`
  query projectByid( $id : String!){
  projectById(id : $id){
    createdAt
    updatedAt
    lastUpdatedBy{
      id
      fullName
    }
    id
    siteName
    domain
    accountUsername
    accountPassword
    databaseName
    databaseUser
    databasePassword
    wordpressLanguage
    wordpressPassword
    wordpressUser
    developerName
  }
}
`

const ModalProject = (props) => {
  const [visblePass, setVisblePass] = useState({
    DataBasePassword: false,
    WordpressPassword: false,
    AccountPassword: false
  })
  const STORE = React.useContext(UseContex.contextStore)

  const { loading, error, data } = useQuery(projectByid, { variables: { id: STORE.state.idProject } })

  if (data) {
    console.log(data)
  }

  // console.log(STORE.state)
  return (
    <div className='templateForm'>
      <Modal style={{ marginTop: '64px' }} isOpen={STORE.state.modalVisible} size='lg'>
        <ModalHeader>
          <div className='modal-header'>
            <h3 className='display-block'>Detail Project</h3>
            <Button
              type='button'
              className='btn-round btn-simple'
              data-dismiss='modal'
              style={{ border: 'none' }}
              color='info'
              aria-label='Close'
              onClick={(e) => (
                STORE.setState({
                  ...STORE.state,
                  idProject: '',
                  modalVisible: false
                })
              )}
            >
              <i style={{ fontSize: '24px' }} className='tim-icons icon-simple-remove' />
            </Button>
          </div>
        </ModalHeader>
        <ModalBody>
          {
            (loading) ? (
              <div style={{ paddingTop: '15%', height: '310px', maxHeight: '310px' }} className='d-flex justify-content-center  m-2'>
                <BeatLoader
                  color='#4A90E2'
                  size={40}
                  loading
                />
              </div>
            )
              : (data && !error) &&
                <div>
                  <Row>
                    <Col className='col-12 ColInfoRight'>
                      <h4 className='text-center'><strong>Info.Project</strong></h4>
                      <div className='containdInfo'>
                        <Row>
                          <Col className='col-4'>
                            <p style={{ color: 'white' }}>Site Name</p>
                            <p style={{ color: '#e14eca' }}>{data.projectById.siteName}</p>
                          </Col>
                          <Col className='col-4'>
                            <p style={{ color: 'white' }}>Domain</p>
                            <p style={{ color: '#e14eca' }}>{data.projectById.domain}</p>
                          </Col>
                          <Col className='col-4'>
                            <p style={{ color: 'white' }}>Account User Name</p>
                            <p style={{ color: '#e14eca' }}>{data.projectById.accountUsername}</p>
                          </Col>
                          {
                          // databasePassword
                          }
                          <UncontrolledTooltip
                            className='Tooltip_wizard'
                            placement='top'
                            target='exclamationDatabasePassword'
                            delay={0}
                          >
                            <div>
                              <p className='pl-2'>View password.</p>
                            </div>
                          </UncontrolledTooltip>
                          <Col className='col-4'>
                            <p style={{ color: 'white' }}>Data Base Password</p>
                            <Row>
                              <Col>
                                <p style={{ color: '#e14eca' }}>
                                  {
                                    (visblePass.DataBasePassword) ? (data.projectById.databasePassword) : '••••••••'
                                  }
                                </p>
                              </Col>
                              <Col className='col-1 pl-1' id='exclamationDatabasePassword'>
                                <i
                                  onClick={(e) => {
                                    setVisblePass({
                                      ...visblePass,
                                      DataBasePassword: !visblePass.DataBasePassword
                                    })
                                  }}
                                  className='fas fa-exclamation-circle'
                                />
                              </Col>
                            </Row>
                          </Col>

                          <Col className='col-4'>
                            <p style={{ color: 'white' }}>Wordpress Language</p>
                            <p style={{ color: '#e14eca' }}>{data.projectById.wordpressLanguage}</p>
                          </Col>
                          {
                          // wordpressPassword
                          }
                          <UncontrolledTooltip
                            className='Tooltip_wizard'
                            placement='top'
                            target='exclamationWordpressPassword'
                            delay={0}
                          >
                            <div>
                              <p className='pl-2'>View password.</p>
                            </div>
                          </UncontrolledTooltip>
                          <Col className='col-4'>
                            <p style={{ color: 'white' }}>Wordpress Password</p>
                            <Row>
                              <Col>
                                <p style={{ color: '#e14eca' }}>
                                  {
                                    (visblePass.WordpressPassword)
                                      ? data.projectById.wordpressPassword
                                      : '••••••••'
                                  }
                                </p>
                              </Col>
                              <Col className='col-1 pl-1' id='exclamationWordpressPassword'>
                                <i
                                  className='fas fa-exclamation-circle'
                                  onClick={(e) => {
                                    setVisblePass({
                                      ...visblePass,
                                      WordpressPassword: !visblePass.WordpressPassword
                                    })
                                  }}
                                />
                              </Col>
                            </Row>
                          </Col>

                          {
                          // accountPassword
                          }
                          <UncontrolledTooltip
                            className='Tooltip_wizard'
                            placement='top'
                            target='exclamationAccountPassword'
                            delay={0}
                          >
                            <div>
                              <p className='pl-2'>View password.</p>
                            </div>
                          </UncontrolledTooltip>
                          <Col className='col-4'>
                            <p style={{ color: 'white' }}>Account Password</p>
                            <Row>
                              <Col>
                                <p style={{ color: '#e14eca' }}>
                                  {
                                    (visblePass.AccountPassword)
                                      ? data.projectById.accountPassword
                                      : '••••••••'
                                  }
                                </p>
                              </Col>
                              <Col className='col-1 pl-1' id='exclamationAccountPassword'>
                                <i
                                  className='fas fa-exclamation-circle'
                                  onClick={(e) => {
                                    setVisblePass({
                                      ...visblePass,
                                      AccountPassword: !visblePass.AccountPassword
                                    })
                                  }}
                                />
                              </Col>
                            </Row>
                          </Col>
                          <Col className='col-4'>
                            <p style={{ color: 'white' }}>Wordpress User</p>
                            <p style={{ color: '#e14eca' }}>{data.projectById.wordpressUser}</p>
                          </Col>
                          <Col className='col-4'>
                            <p style={{ color: 'white' }}>Updated At</p>
                            <p style={{ color: '#e14eca' }}>{moment(data.projectById.updatedAt).format('MMMM DD YYYY')}</p>
                          </Col>
                          <Col className='col-4'>
                            <p style={{ color: 'white' }}>LastUpdated By</p>
                            <p style={{ color: '#e14eca' }}>{data.projectById.lastUpdatedBy.fullName}</p>
                          </Col>
                          <Col className='col-4'>
                            <p style={{ color: 'white' }}>Database Name</p>
                            <p style={{ color: '#e14eca' }}>{data.projectById.databaseName}</p>
                          </Col>
                          <Col className='col-4'>
                            <p style={{ color: 'white' }}>Developer Name</p>
                            <p style={{ color: '#e14eca' }}>{data.projectById.developerName}</p>
                          </Col>
                          <Col className='col-4'>
                            <p style={{ color: 'white' }}>Database User</p>
                            <p style={{ color: '#e14eca' }}>{data.projectById.databaseUser}</p>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                </div>

          }
        </ModalBody>
      </Modal>
    </div>
  )
}

export default ModalProject
