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
import { Schemas } from './ValidationForm'
import Joi from 'joi-browser'

const ModalUser = (props) => {
  const [emailInput, setEmailInput] = useState({
    className: '',
    value: '',
    error: false,
    labelError: ''
  })
  const [nameInput, setNameInput] = useState({
    className: '',
    value: '',
    error: false,
    labelError: ''
  })
  const [lastNameInput, setLastNameInput] = useState({
    className: '',
    value: '',
    error: false,
    labelError: ''
  })

  const ValidatorFormChange = (valueInput, setState, nameInput) => {
    const result = Joi.validate({ ...valueInput }, Schemas(nameInput))
    if (result.error) {
      setState({
        className: 'has-danger',
        value: result.error.details[0].context.value,
        error: true,
        labelError: result.error.details[0].message
      })
    } else {
      const { value } = result
      setState({
        className: 'has-success',
        value: value[nameInput],
        error: false,
        labelError: ''
      })
    }
  }

  const submitForm = (event) => {
    event.preventDefault()
    if (
      emailInput.className === 'has-success' &&
      nameInput.className === 'has-success' &&
      lastNameInput.className === 'has-success'
    ) {
      console.log('emailInput', emailInput.value)
      console.log('nameInput', nameInput.value)
      console.log('lastNameInput', lastNameInput.value)
    } else {
      if (emailInput.className !== 'has-success') {
        setEmailInput({
          ...emailInput,
          className: 'has-danger',
          error: true,
          labelError: 'Email is required'
        })
      }
      if (nameInput.className !== 'has-success') {
        setNameInput({
          ...nameInput,
          className: 'has-danger',
          error: true,
          labelError: 'Name is required'
        })
      }
      if (nameInput.className !== 'has-success') {
        setLastNameInput({
          ...lastNameInput,
          className: 'has-danger',
          error: true,
          labelError: 'Last Name is required'
        })
      }
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
        <Form onSubmit={submitForm}>
          <ModalBody>
            <div className='container InputGroupVictor2'>
              <Row>
                <Col className='col-6'>
                  <FormGroup className={`has-label ${nameInput.className}`}>
                    <Label for='name'>Name</Label>
                    <Input
                      type='text'
                      name='name'
                      id='name'
                      placeholder='Name'
                      onChange={e => ValidatorFormChange({ name: e.target.value }, setNameInput, 'name')}
                    />
                    {
                      nameInput.error &&
                        <label className='error'>
                          {nameInput.labelError}
                        </label>
                    }
                  </FormGroup>
                </Col>
                <Col className='col-6'>
                  <FormGroup className={`has-label ${lastNameInput.className}`}>
                    <Label for='lastname'>Last name</Label>
                    <Input
                      type='text'
                      name='lastname'
                      id='lastname'
                      placeholder='Last name'
                      onChange={e => ValidatorFormChange({ lastname: e.target.value }, setLastNameInput, 'lastname')}
                    />
                    {
                      lastNameInput.error &&
                        <label className='error'>
                          {lastNameInput.labelError}
                        </label>
                    }
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
                      onChange={e => ValidatorFormChange({ email: e.target.value }, setEmailInput, 'email')}
                    />
                    {emailInput.error &&
                      <label className='error'>
                        {emailInput.labelError}
                      </label>}
                  </FormGroup>
                </Col>
              </Row>

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
                <Button
                  className='w-100'
                  color='info'
                  type='submit'
                  disabled={
                    emailInput.error ||
                    nameInput.error
                  }
                >
              Agregate
                </Button>
              </Col>
            </Row>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  )
}

export default ModalUser
