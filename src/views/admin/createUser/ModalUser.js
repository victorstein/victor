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

const ModalUser = (props) => {
  return (
    <div className='templateForm'>
      <Modal style={{ marginTop: '64px' }} isOpen={props.openModal} size='lg'>
        <ModalHeader>
          <div className='modal-header '>
            <h3>Create New User</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className='container'>
            <Form>
              <Row>
                <Col className='col-6'>
                  <FormGroup className='has-label'>
                    <Label for='name'>Name</Label>
                    <Input
                      type='text'
                      name='name'
                      id='name'
                      placeholder='Name'
                      // onChange={e => ValidatorFormChange(e, 'nameAccount')}
                    />
                    {
                    //     this.state.nameAccountInput.error &&
                    //   <label className='error'>
                    //     {this.state.nameAccountInput.labelError}
                    //   </label>
                    }
                  </FormGroup>
                </Col>
                <Col className='col-6'>
                  <FormGroup className='has-label'>
                    <Label for='lastname'>Last name</Label>
                    <Input
                      type='text'
                      name='lastname'
                      id='lastname'
                      placeholder='Last name'
                      // onChange={e => ValidatorFormChange(e, 'nameAccount')}
                    />
                  </FormGroup>
                </Col>
                <Col className='col-12'>
                  <FormGroup className='has-label'>
                    <Label for='email'>Email</Label>
                    <Input
                      type='email'
                      name='email'
                      id='email'
                      placeholder='Email'
                      // onChange={e => ValidatorFormChange(e, 'nameAccount')}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </div>
        </ModalBody>
        <ModalFooter>
          <Row className='w-100'>
            <Col className='col-6 pt-2'>
              <Button
                className='w-100'
                color='danger'
                onClick={(e) => props.setOpenModal(false)}
              >
                Cancel
              </Button>
            </Col>
            <Col className='col-6 pt-2'>
              <Button className='w-100' color='info'>
                Agregate
              </Button>
            </Col>
          </Row>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default ModalUser
