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
  ModalFooter
} from 'reactstrap'
import { ClipLoader } from 'react-spinners'
import UseContex from './ContexStore'

const ModalProject = (props) => {
  const STORE = React.useContext(UseContex.contextStore)
  console.log(STORE.state)
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
              <h4 className='text-center'><strong>Info.Project</strong> </h4>
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
