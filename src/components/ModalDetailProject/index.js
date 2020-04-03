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
import moment from 'moment'
import Lottie from 'react-lottie'
import animationEmptyBox from '../../assets/lottie/emptyBox.json'
import animationServerError from '../../assets/lottie/serverError.json'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const ModalDetailProject = (props) => {
  const [visblePass, setVisblePass] = useState({
    DataBasePassword: false,
    WordpressPassword: false,
    AccountPassword: false
  })

  const contendModal = () => {
    if (!props.loading && props.data) {
      if (props.error) {
        const defaultOptions = {
          loop: true,
          autoplay: true,
          animationData: animationServerError,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
          }
        }
        return (
          <ModalBody>
            <div className='d-flex justify-content-center p-2 m-2'>
              <Lottie
                isClickToPauseDisabled
                options={defaultOptions}
                height='40%'
                width='40%'
              />
            </div>
          </ModalBody>
        )
      }

      if (Object.keys(props.data).length === 0) {
        const defaultOptions = {
          loop: true,
          autoplay: true,
          animationData: animationEmptyBox,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
          }
        }
        return (
          <ModalBody>
            <div className='d-flex justify-content-center p-2 m-2'>
              <Lottie
                isClickToPauseDisabled
                options={defaultOptions}
                height='40%'
                width='40%'
              />
            </div>
          </ModalBody>
        )
      }

      return (
        <ModalBody>
          <div>
            <Row>
              <Col className='col-12 ColInfoRight'>
                <h4 className='text-center'><strong>Info.Project</strong></h4>
                <div className='containdInfo'>
                  <Row>
                    <Col className='col-4'>
                      <p style={{ color: 'white' }}>Site Name</p>
                      <p style={{ color: '#e14eca' }}>{props.data.projectById.siteName}</p>
                    </Col>
                    <Col className='col-4'>
                      <p style={{ color: 'white' }}>Domain</p>
                      <p style={{ color: '#e14eca' }}>{props.data.projectById.domain}</p>
                    </Col>
                    <Col className='col-4'>
                      <p style={{ color: 'white' }}>Account User Name</p>
                      <p style={{ color: '#e14eca' }}>{props.data.projectById.accountUsername}</p>
                    </Col>
                    <Col className='col-4'>
                      <p style={{ color: 'white' }}>Developer Name</p>
                      <p style={{ color: '#e14eca' }}>{props.data.projectById.developerName}</p>
                    </Col>
                    <Col className='col-4'>
                      <p style={{ color: 'white' }}>Wordpress Language</p>
                      <p style={{ color: '#e14eca' }}>{props.data.projectById.wordpressLanguage}</p>
                    </Col>
                    <Col className='col-4'>
                      <p style={{ color: 'white' }}>Updated At</p>
                      <p style={{ color: '#e14eca' }}>{moment(props.data.projectById.updatedAt).format('MMMM DD YYYY')}</p>
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
                          {
                            (visblePass.AccountPassword)
                              ? (
                                <Row className='d-flex align-items-center'>
                                  <Col className='pl-3 col-8'>
                                    <p style={{ color: '#e14eca' }}>{props.data.projectById.accountPassword}</p>
                                  </Col>
                                  <Col className='col-2'>
                                    <CopyToClipboard
                                      onCopy={() => props.swoAlertGlobal({
                                        message: 'Copy To Clipboard',
                                        options: {
                                          icon: 'icon-alert-circle-exc',
                                          type: 'success',
                                          autoDismiss: 4,
                                          place: 'tr'
                                        }
                                      })}
                                      text={props.data.projectById.accountPassword}
                                    >
                                      <Button size='sm' className='btn-link btn-icon' color='success'>
                                        <i className='tim-icons icon-notes' />
                                      </Button>
                                    </CopyToClipboard>
                                  </Col>
                                </Row>
                              )
                              : <p className='p-0' style={{ color: '#e14eca' }}>••••••••</p>
                          }
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
                      <p style={{ color: '#e14eca' }}>{props.data.projectById.wordpressUser}</p>
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
                          {
                            (visblePass.WordpressPassword)
                              ? (
                                <Row className='d-flex align-items-center'>
                                  <Col className='pl-3 col-8'>
                                    <p style={{ color: '#e14eca' }}>{props.data.projectById.wordpressPassword}</p>
                                  </Col>
                                  <Col className='col-2'>
                                    <CopyToClipboard
                                      onCopy={() => props.swoAlertGlobal({
                                        message: 'Copy To Clipboard',
                                        options: {
                                          icon: 'icon-alert-circle-exc',
                                          type: 'success',
                                          autoDismiss: 4,
                                          place: 'tr'
                                        }
                                      })}
                                      text={props.data.projectById.wordpressPassword}
                                    >
                                      <Button size='sm' className='btn-link btn-icon' color='success'>
                                        <i className='tim-icons icon-notes' />
                                      </Button>
                                    </CopyToClipboard>
                                  </Col>
                                </Row>
                              )
                              : <p className='p-0' style={{ color: '#e14eca' }}>••••••••</p>
                          }
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
                    <Col className='col-4'>
                      <p style={{ color: 'white' }}>Database User</p>
                      <p style={{ color: '#e14eca' }}>{props.data.projectById.databaseUser}</p>
                    </Col>
                    <Col className='col-4'>
                      <p style={{ color: 'white' }}>Database Name</p>
                      <p style={{ color: '#e14eca' }}>{props.data.projectById.databaseName}</p>
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
                          <Col className='col-8 p-0'>
                            {
                              (visblePass.DataBasePassword)
                                ? (
                                  <Row className='d-flex align-items-center'>
                                    <Col className='pl-3 col-8'>
                                      <p style={{ color: '#e14eca' }}>{props.data.projectById.databasePassword}</p>
                                    </Col>
                                    <Col className='col-2'>
                                      <CopyToClipboard
                                        onCopy={() => props.swoAlertGlobal({
                                          message: 'Copy To Clipboard',
                                          options: {
                                            icon: 'icon-alert-circle-exc',
                                            type: 'success',
                                            autoDismiss: 4,
                                            place: 'tr'
                                          }
                                        })}
                                        text={props.data.projectById.databasePassword}
                                      >
                                        <Button size='sm' className='btn-link btn-icon' color='success'>
                                          <i className='tim-icons icon-notes' />
                                        </Button>
                                      </CopyToClipboard>
                                    </Col>
                                  </Row>
                                )
                                : <p className='p-0' style={{ color: '#e14eca' }}>••••••••</p>
                            }
                          </Col>
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
                      <p style={{ color: 'white' }}>LastUpdated By</p>
                      <p style={{ color: '#e14eca' }}>{props.data.projectById.lastUpdatedBy.fullName}</p>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        </ModalBody>
      )
    } else {
      return (
        <div style={{ paddingTop: '15%', height: '310px', maxHeight: '310px' }} className='d-flex justify-content-center  m-2'>
          <BeatLoader
            color='#4A90E2'
            size={40}
            loading
          />
        </div>
      )
    }
  }

  return (
    <div className='templateForm'>
      <Modal style={{ marginTop: '64px' }} isOpen={props.modalVisible} size='lg'>
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
              onClick={(e) => props.ButtonClouse()}
            >
              <i style={{ fontSize: '24px' }} className='tim-icons icon-simple-remove' />
            </Button>
          </div>
        </ModalHeader>
        {
          contendModal()
        }
      </Modal>
    </div>
  )
}

export default ModalDetailProject
