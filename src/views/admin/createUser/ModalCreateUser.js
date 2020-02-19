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
import useForm from './UseInputUser'
import validationForm from './JoiValidate'
import './stylesUser.scss'

const DEFAULT_VALUES = {
  name: '',
  lastname: '',
  password: '',
  confirmPassword: '',
  email: ''
}

const ModalCreateUser = (props) => {
  const submitForm = () => {
    console.log(values)
  }

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    onBlurState
  } = useForm(submitForm, DEFAULT_VALUES, validationForm)

  const validateClassname = (error, onBlur, value) => {
    const isDanger = (error && onBlur)
    if (isDanger) {
      return 'has-danger'
    } else if (value) {
      return 'has-success'
    } else {
      return ''
    }
  }

  return (
    <div className='templateForm'>
      <Modal style={{ marginTop: '64px' }} isOpen={props.openModal} size='lg'>
        <ModalHeader>
          <div className='modal-header '>
            <h3 className='display-block'>Create New User</h3>
          </div>
        </ModalHeader>
        <Form onSubmit={handleSubmit} noValidate>
          <ModalBody>
            <div className='container InputFormVictor'>
              <Row>
                <Col className='col-6'>
                  <FormGroup className={`input ${validateClassname(errors.name, onBlurState.name, values.name)}`}>
                    <Label for='name'>Name</Label>
                    <Input
                      type='text'
                      name='name'
                      id='name'
                      placeholder='Name'
                      onChange={handleChange}
                      value={values.name || ''}
                      required
                      onBlur={handleBlur}
                    />
                    {
                      (errors.name && onBlurState.name) &&
                      (
                        <label className='error'>
                          {errors.name}
                        </label>
                      )
                    }
                  </FormGroup>
                </Col>
                <Col className='col-6'>
                  <FormGroup className={`input ${validateClassname(errors.lastname, onBlurState.lastname, values.lastname)}`}>
                    <Label for='lastname'>Last name</Label>
                    <Input
                      type='text'
                      name='lastname'
                      id='lastname'
                      placeholder='Last name'
                      onChange={handleChange}
                      value={values.lastname || ''}
                      onBlur={handleBlur}
                    />
                    {
                      (errors.lastname && onBlurState.lastname) &&
                      (
                        <label className='error'>
                          {errors.lastname}
                        </label>
                      )
                    }
                  </FormGroup>
                </Col>
                <Col className='col-6'>
                  <FormGroup className={`input ${validateClassname(errors.password, onBlurState.password, values.password)}`}>
                    <Label for='password'>Password</Label>
                    <Input
                      type='password'
                      name='password'
                      id='password'
                      placeholder='Password'
                      onChange={handleChange}
                      value={values.password || ''}
                      onBlur={handleBlur}
                    />
                    {
                      (errors.password && onBlurState.password) &&
                      (
                        <label className='error'>
                          {errors.password}
                        </label>
                      )
                    }
                  </FormGroup>
                </Col>

                <Col className='col-6'>
                  <FormGroup className={`input ${validateClassname(errors.confirmPassword, onBlurState.confirmPassword, values.confirmPassword)}`}>
                    <Label for='confirmPassword'>Confirm Password</Label>
                    <Input
                      type='password'
                      name='confirmPassword'
                      id='confirmPassword'
                      placeholder='Confirm Password'
                      onChange={handleChange}
                      value={values.confirmPassword || ''}
                      onBlur={handleBlur}
                    />
                    {
                      (errors.confirmPassword && onBlurState.confirmPassword) &&
                        (
                          <label className='error'>
                            {errors.confirmPassword}
                          </label>
                        )
                    }
                  </FormGroup>
                </Col>
                <Col className='col-12'>
                  <FormGroup className={`input ${validateClassname(errors.email, onBlurState.email, values.email)}`}>
                    <Label for='email'>Email</Label>
                    <Input
                      type='email'
                      name='email'
                      id='email'
                      placeholder='Email'
                      onChange={handleChange}
                      value={values.email || ''}
                      onBlur={handleBlur}
                    />
                    {
                      (errors.email && onBlurState.email) &&
                        (
                          <label className='error'>
                            {errors.email}
                          </label>
                        )
                    }
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

export default ModalCreateUser
