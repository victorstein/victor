import React, { useState, useEffect } from 'react'
import {
  FormGroup,
  Label,
  Input,
  Button,
  Row, Col, Card, CardBody, CardTitle, CardHeader, CardFooter, Alert
} from 'reactstrap'
import { ValidatorFormChange } from './validationLogin'
import { loginGql } from '../../utils/Graphql/Queries'
import { useLazyQuery } from '@apollo/react-hooks'
import { ClipLoader } from 'react-spinners'
import useAuth from '../../utils/Auth'
import ResetPassword from './ResetPassword'
import './styles.scss'

const LoginIndex = (props) => {
  const [emailInput, setemailInput] = useState({
    className: '',
    value: '',
    error: false,
    labelError: ''
  })

  const [passwordInput, setpasswordInput] = useState({
    className: '',
    value: '',
    error: false,
    labelError: ''
  })
  const [alertResetPassword, setAlertResetPassword] = useState(false)
  const [fetchLogin, { loading, error, data }] = useLazyQuery(loginGql('token refreshToken'))
  const { login } = useAuth()

  const submitFormLogin = (e) => {
    e.preventDefault()
    try {
      if (passwordInput.value === '' && emailInput.value === '') {
        return (
          setpasswordInput({
            ...passwordInput,
            labelError: 'Password email is required',
            error: true,
            className: 'has-danger'
          }),
          setemailInput({
            ...emailInput,
            labelError: 'Input email is required',
            error: true,
            className: 'has-danger'
          })
        )
      }

      if (passwordInput.value === '') {
        return setpasswordInput({
          ...passwordInput,
          labelError: 'Password email is required',
          error: true,
          className: 'has-danger'
        })
      }
      if (emailInput.value === '') {
        return setemailInput({
          ...emailInput,
          labelError: 'Input email is required',
          error: true,
          className: 'has-danger'
        })
      }
      if (!emailInput.error || !passwordInput.error) {
        return fetchLogin({ variables: { email: emailInput.value, password: passwordInput.value } })
      }
    } catch (e) {
      console.log(e)
      if (error) { console.log('graphQLErrors', error.graphQLErrors) }
    }
  }

  useEffect(() => {
    if (data && !error) {
      console.log(data)
      const reqLogin = data.login
      login(reqLogin.token, reqLogin.refreshToken, props.history)
    }
  }, [data])

  const resendEmailButton = () => {
    const message = error.graphQLErrors.map(({ message }) => message.split(':')[1])
    if (message[0].includes('verified')) {
      return (
        <Button
          size='sm'
          style={{ color: 'white', borderColor: 'white' }}
          className='btn-simple'
          color='primary'
        >Resend Email
        </Button>
      )
    }
  }

  return (
    <div className=''>
      {
        (alertResetPassword) &&
          <ResetPassword alertResetPassword={alertResetPassword} setAlertResetPassword={setAlertResetPassword} />
      }
      <Card>
        <CardHeader>
          <CardTitle tag='h4' className='text-center'>Login</CardTitle>
        </CardHeader>
        <CardBody>
          {
            (error) &&
              <Alert className='mt-2' color='danger'>
                <Row>
                  <Col className='col-1'>
                    <i class='tim-icons icon-alert-circle-exc' />
                  </Col>
                  <Col className='col-11 text-left'>
                    <h4 className='alert-heading'>Error!</h4>
                  </Col>
                  <Col className='col-12 text-sm-left'>
                    <p className='alertText'>{error.graphQLErrors.map(({ message }) => {
                      return message.split(':')[1]
                    })}
                    </p>
                    <div className='text-center'>
                      {resendEmailButton()}
                    </div>
                  </Col>
                </Row>
              </Alert>
          }
          <form onSubmit={submitFormLogin}>
            <FormGroup className={`has-label ${emailInput.className}`}>
              <Label for='exampleEmail'>Email address</Label>
              <Input
                type='email'
                name='email'
                id='exampleEmail'
                placeholder='Enter email'
                onChange={e => ValidatorFormChange(e, setemailInput, emailInput, 'email')}
              />
              {emailInput.error &&
                <label className='error'>
                  {emailInput.labelError}
                </label>}
            </FormGroup>
            <FormGroup className={`has-label ${passwordInput.className}`}>
              <Label for='examplePassword'>Password</Label>
              <Input
                type='password'
                name='password'
                id='examplePassword'
                placeholder='Password'
                autoComplete='off'
                onChange={e => ValidatorFormChange(e, setpasswordInput, passwordInput, 'password')}
              />
              {passwordInput.error &&
                <label className='error'>
                  {passwordInput.labelError}
                </label>}
            </FormGroup>
            <FormGroup check>
              <Row>
                <Col className='text-left'>
                  <Label check>
                    <Input type='checkbox' />{' '}
                    Check me out
                    <span className='form-check-sign'>
                      <span className='check' />
                    </span>
                  </Label>
                </Col>
                <Col className='text-right'>
                  <a
                    href='#'
                    onClick={() => {
                      setAlertResetPassword(true)
                    }}
                  >
                    <span>Reset Password...</span>
                  </a>
                </Col>
              </Row>
            </FormGroup>
            <CardFooter>

              <Button
                disabled={(emailInput.error || passwordInput.error) || loading ? true : null}
                className='w-100'
                color='primary'
                type='submit'
              >
                {(!loading) ? 'Login' : null}
                <ClipLoader
                  color='#FFF'
                  size={25}
                  loading={loading}
                />
              </Button>
            </CardFooter>
          </form>
        </CardBody>
      </Card>
    </div>

  )
}

export default LoginIndex
