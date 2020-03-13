import React, { useState, useEffect } from 'react'
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
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { ClipLoader } from 'react-spinners'
import Lottie from 'react-lottie'

const DEFAULT_VALUES = {
  name: '',
  lastname: '',
  password: '',
  confirmPassword: '',
  email: ''
}

const createUser = gql`
  mutation createUser(
  $email: String!
  $password: String!
  $confirmPassword: String!
  $firstName: String!
  $lastName: String!
){
  createUser(
    email : $email
    password : $password
    confirmPassword : $confirmPassword
    firstName : $firstName
    lastName : $lastName
  ){
    id
    email
    fullName
    role{
      id
      name
    }
   permissions{
    id
    name
    }
  }
}
`

const ModalCreateUser = (props) => {
  const [createUserMutation, { data, error, loading }] = useMutation(createUser, {
    refetchQueries: ['allUsers']
  })
  const [isSubmit, setIsSubmit] = useState(false)

  const submitForm = async () => {
    if (isSubmit) {
      const { email, password, confirmPassword } = values
      try {
        const newUser = {
          email,
          password,
          confirmPassword,
          firstName: values.name,
          lastName: values.lastname
        }
        await createUserMutation({ variables: newUser })
        props.setOpenModal(false)
      } catch (e) {
        props.setOpenModal(false)
        console.log(e)
      }
    }
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

  useEffect(() => {
    if (error) {
      props.actionsAlertGloval({
        message: 'Error creating a new user',
        options: {
          icon: 'icon-alert-circle-exc',
          type: 'danger',
          autoDismiss: 4,
          place: 'tr'
        }
      })
    }

    if (data) {
      props.actionsAlertGloval({
        message: 'Created User Successfully',
        options: {
          icon: 'icon-bulb-63',
          type: 'info',
          autoDismiss: 4,
          place: 'tr'
        }
      })
    }
  }, [error, data])

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
                            pasword not mach
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
                  disabled={loading}
                >
                  Cancel
                </Button>
              </Col>
              <Col className='col-6 pt-2'>
                <Button
                  className='w-100'
                  color='info'
                  type='submit'
                  onClick={(e) => setIsSubmit(true)}
                  disabled={!!(loading || (error))}
                >
                  {
                    (loading)
                      ? (
                        <ClipLoader
                          size={20}
                          color='#FFFFFF'
                          loading
                        />)
                      : 'Agregate'
                  }
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
