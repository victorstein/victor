import React, { useState } from 'react'
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
import { Schema } from './ValidationForm'
import Joi from 'joi-browser'

const ModalUser = (props) => {
  const [emailInput, setEmailInput] = useState({
    className: '',
    value: '',
    error: false,
    labelError: ''
  })

  const ValidatorFormChange = (value, typeInput) => {
    const result = Joi.validate({ email: value }, Schema)
    if (result.error) {
      setEmailInput({
        className: 'has-danger',
        value: result.error.details[0].context.value,
        error: true,
        labelError: result.error.details[0].message
      })
      // console.log(result.error.details[0].message)
    } else {
      setEmailInput({
        className: 'has-success',
        value: result.email,
        error: false,
        labelError: ''
      })
    }
  }

  return (
    <div className='templateForm'>
      <Modal style={{ marginTop: '64px' }} isOpen={props.openModal} size='lg'>
        <ModalHeader>
          <div className='modal-header '>
            <h3>Create New User</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className='container InputGroupVictor'>
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
                  <FormGroup className={`has-label ${emailInput.className}`}>
                    <Label for='email'>Email</Label>
                    <Input
                      type='email'
                      name='email'
                      id='email'
                      placeholder='Email'
                      onChange={e => ValidatorFormChange(e.target.value, 'email')}
                    />
                    {emailInput.error &&
                      <label className='error'>
                        {emailInput.labelError}
                      </label>}
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
