import React from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  ModalFooter,
  UncontrolledTooltip
} from 'reactstrap'
import { ClipLoader } from 'react-spinners'
import UseContex from './ContexStore'

const ModalProject = (props) => {
  const STORE = React.useContext(UseContex.contextStore)
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
          <p style={{ color: 'white' }}>{JSON.stringify(STORE.state)}</p>
          <Row>
            <Col className='col-4 ColInfoRight'>
              <h4 className='text-center'><strong>Info.Project</strong></h4>
              <div className='containdInfo'>
                <Row>
                  <Col className='col-12'>
                    <p style={{ color: 'white' }}>Site Name</p>
                    <p style={{ color: '#e14eca' }}>test</p>
                  </Col>
                  <Col className='col-12'>
                    <p style={{ color: 'white' }}>Domain</p>
                    <p style={{ color: '#e14eca' }}>test</p>
                  </Col>
                  <Col className='col-12'>
                    <p style={{ color: 'white' }}>Account User Name</p>
                    <p style={{ color: '#e14eca' }}>test</p>
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
                  <Col className='col-12'>
                    <p style={{ color: 'white' }}>accountPassword</p>
                  </Col>
                  <Col className='col-10'>
                    <p style={{ color: '#e14eca' }}>*********</p>
                  </Col>
                  <Col className='col-2 pl-2' id='exclamationAccountPassword'>
                    <i className='fas fa-exclamation-circle' />
                  </Col>

                  <Col className='col-12'>
                    <p style={{ color: 'white' }}>Data Base Name</p>
                    <p style={{ color: '#e14eca' }}>test</p>
                  </Col>
                  <Col className='col-12'>
                    <p style={{ color: 'white' }}>Data Base User</p>
                    <p style={{ color: '#e14eca' }}>test</p>
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
                  <Col className='col-12'>
                    <p style={{ color: 'white' }}>Data Base Password</p>
                  </Col>
                  <Col className='col-10'>
                    <p style={{ color: '#e14eca' }}>*********</p>
                  </Col>
                  <Col className='col-2 pl-2' id='exclamationDatabasePassword'>
                    <i className='fas fa-exclamation-circle' />
                  </Col>
                </Row>
              </div>
            </Col>
            <Col className='col-8'>
              <h4 className='text-center'><strong>landing</strong> </h4>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default ModalProject
