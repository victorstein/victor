import React, { useEffect } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Row,
  Col,
  FormGroup,
  Label,
  Input
} from 'reactstrap'
import useForm from '../../utils/useFormHooks/useForm'
import schema from './ValidationSchema'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { ClipLoader } from 'react-spinners'

const updateUser = gql`
  mutation updateUser(
    $firstName: String
    $lastName: String
    $password: String
    $confirmPassword: String
){
  updateUser(
    firstName: $firstName
    lastName: $lastName
    password: $password
    confirmPassword: $confirmPassword
  ){
    id
    fullName
  }
}
`

const ModalEdit = (props) => {
  const defaultValueForm = {
    firstName: props.defaultData.firstName,
    lastName: props.defaultData.lastName,
    password: '',
    confirmPassword: ''
  }

  const [updateUserMutations, { error, loading }] = useMutation(updateUser, {
    refetchQueries: ['me'], awaitRefetchQueries: true
  })

  const submitForm = async () => {
    console.log('lolis')
    const finalInput = {}
    for (const [key, value] of Object.entries(values)) {
      if (value) {
        finalInput[key] = value
      }
    }
    await updateUserMutations({ variables: { ...finalInput } })
    props.setOpenModal(false)
    props.actionsAlertGloval({
      message: 'Edit Profile Successfully',
      options: {
        icon: 'icon-bulb-63',
        type: 'info',
        autoDismiss: 4,
        place: 'tr'
      }
    })
    /* const finalDataForm = {
      firstName,
      lastName,
      (password) ?
    }
     */
  }

  const {
    values,
    handleChange,
    handleBlur,
    errors,
    handleSubmit,
    classNames
  } = useForm(submitForm, defaultValueForm, schema.schemaProfile)

  useEffect(() => {
    let messageError = ''
    if (error) {
      if (Array.isArray(error.graphQLErrors)) {
        messageError = error.graphQLErrors[0].message
      } else {
        messageError = error.graphQLErrors
      }
      console.log('messageError', error.graphQLErrors)
      const options = {
        message: (Array.isArray(messageError)) ? messageError[0] : messageError,
        options: {
          icon: 'icon-alert-circle-exc',
          type: 'danger',
          autoDismiss: 4,
          place: 'tr'
        }
      }
      props.actionsAlertGloval(options)
    }
  }, [error])

  return (
    <Modal style={{ marginTop: '64px' }} isOpen={props.openModal}>
      <ModalHeader>
        <div className='modal-header '>
          <h3>
              Edit Profile
          </h3>
          <Button
            type='button'
            className='btn-round btn-simple'
            data-dismiss='modal'
            style={{ border: 'none' }}
            color='info'
            aria-label='Close'
            disabled={loading}
            onClick={(e) => { props.setOpenModal(false) }}
          >
            <i style={{ fontSize: '24px' }} className='tim-icons icon-simple-remove' />
          </Button>
        </div>
      </ModalHeader>
      <Form onSubmit={handleSubmit}>
        <ModalBody>
          <Row>
            <Col className='col-6'>
              <FormGroup
                className={` has-label  ${(classNames.firstName) ? classNames.firstName : (values.firstName === '') ? '' : 'has-success'}`}
              >
                <Label for='firstName'>First Name</Label>
                <Input
                  type='text'
                  className='iccon'
                  name='firstName'
                  id='firstName'
                  placeholder='First Name'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName || ''}
                />
                {
                  errors.firstName && (
                    <label className='error'>
                      {errors.firstName}
                    </label>
                  )
                }
              </FormGroup>
            </Col>
            <Col className='col-6'>
              <FormGroup
                className={` has-label  ${(classNames.lastName) ? classNames.lastName : (values.lastName === '') ? '' : 'has-success'}`}
              >
                <Label for='lastName'>Last Name</Label>
                <Input
                  type='text'
                  className='iccon'
                  name='lastName'
                  id='lastName'
                  placeholder='Last Name'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName || ''}
                />
                {
                  errors.lastName && (
                    <label className='error'>
                      {errors.lastName}
                    </label>
                  )
                }
              </FormGroup>
            </Col>
            <Col className='col-6'>
              <FormGroup
                className={` has-label  ${(classNames.password) ? classNames.password : (values.password === '') ? '' : 'has-success'}`}
              >
                <Label for='password'>Password</Label>
                <Input
                  type='password'
                  className='iccon'
                  name='password'
                  id='password'
                  placeholder='Password'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password || ''}
                />
                {
                  errors.password && (
                    <label className='error'>
                      {errors.password}
                    </label>
                  )
                }
              </FormGroup>
            </Col>
            <Col className='col-6'>
              <FormGroup
                className={` has-label  ${(classNames.confirmPassword) ? classNames.confirmPassword : (values.confirmPassword === '') ? '' : 'has-success'}`}
              >
                <Label for='confirmPassword'>Confirm Password</Label>
                <Input
                  type='password'
                  className='iccon'
                  name='confirmPassword'
                  id='confirmPassword'
                  placeholder='Confirm Password'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword || ''}
                />
                {
                  errors.confirmPassword && (
                    <label className='error'>
                      {errors.confirmPassword}
                    </label>
                  )
                }
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Row className='w-100'>
            <Col className='col-6 pt-2'>
              <Button
                className='w-100'
                color='danger'
                disabled={loading}
                onClick={(e) => { props.setOpenModal(false) }}
              >
                  Cancel
              </Button>
            </Col>
            <Col className='col-6 pt-2'>
              <Button
                className='w-100'
                color='info'
                type='submit'
                disabled={loading}
              >
                {
                  (loading)
                    ? (
                      <ClipLoader
                        size={20}
                        color='#FFFFFF'
                        loading
                      />)
                    : 'Edit'
                }
              </Button>
            </Col>
          </Row>
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default ModalEdit
