import React from 'react'
import {
  Row, Col, Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert
} from 'reactstrap'

const ModalRole = (props) => {
  return (
    <Modal style={{ marginTop: '64px' }} isOpen={props.openModal} size='ms'>
      <ModalHeader>
        <div className='modal-header '>
          <h3>
            {(props.idRole === null) ? 'Add Role' : 'Edit Role'}
          </h3>
          <Button
            type='button'
            className='btn-round btn-simple'
            data-dismiss='modal'
            style={{ border: 'none' }}
            color='info'
            aria-label='Close'
            onClick={(e) => (
              props.setOpenModal(false)
            )}
          >
            <i style={{ fontSize: '24px' }} className='tim-icons icon-simple-remove' />
          </Button>
        </div>
      </ModalHeader>
      <ModalBody>
        safasgfasf
      </ModalBody>
      <ModalFooter>
        <Row className='w-100'>
          <Col className='col-6 pt-2'>
            <Button
              className='w-100'
              color='danger'
              // disabled={reqUpdateUser.loading}
            //   onClick={(e) => props.setAddPermissions({
            //     visible: false,
            //     user: {}
            //   })}
            >
             Cancel
            </Button>
          </Col>
          <Col className='col-6 pt-2'>
            <Button
              className='w-100'
              color='info'
              // disabled={reqUpdateUser.loading || error}
              // onClick={(e) => submitInputUpdate()}
            >
              {
                // (reqUpdateUser.loading)
                //   ? (
                //     <ClipLoader
                //       color='#4A90E2'
                //       size={20}
                //       loading
                //     />
                //   )
                //   : 'Update'
              }
              {(props.idRole === null) ? 'Agregate' : 'Update'}
            </Button>
          </Col>
        </Row>
      </ModalFooter>
    </Modal>
  )
}

export default ModalRole
