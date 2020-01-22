import React, { useState, useEffect } from 'react'
import {
  FormGroup,
  Label,
  Input,
  Button,
  Row, Col, Card, CardBody, CardTitle, CardHeader, CardFooter, Alert
} from 'reactstrap'
import { ValidatorFormChange } from './validationLogin'
import { loginGql, requestPasswordResetGql } from '../../utils/Graphql/Queries'
import { useLazyQuery } from '@apollo/react-hooks'
import { ClipLoader } from 'react-spinners'
import useAuth from '../../utils/Auth'
import ReactBSAlert from 'react-bootstrap-sweetalert'

const LoginIndex = (props) => {
  const [emailInput, setemailInput] = useState({
    className: '',
    value: '',
    error: false,
    labelError: ''
  })
  const [resetPasswordInput, setResetPasswordInput] = useState({
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
  const [fetchResetPassword, reqfetchResetPassword] = useLazyQuery(requestPasswordResetGql(), { fetchPolicy: 'no-cache' })
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

  const submitResetPassword = (e) => {
    e.preventDefault()
    try {
      if (resetPasswordInput.value === '') {
        return setResetPasswordInput({
          ...setResetPasswordInput,
          labelError: 'Input email is required',
          error: true,
          className: 'has-danger'
        })
      } else {
        console.log(resetPasswordInput.value)
        fetchResetPassword({ variables: { email: resetPasswordInput.value } })

        if (!reqfetchResetPassword.loading) {
          setAlertResetPassword(false)
          setResetPasswordInput({
            className: '',
            value: '',
            error: false,
            labelError: ''
          })
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (data && !error) {
      console.log(data)
      const reqLogin = data.login
      login(reqLogin.token, reqLogin.refreshToken, props.history)
    }
  }, [data])

  return (
    <div style={{ margin: '0 auto', float: 'none', marginTop: '30%' }}>
      {
        (alertResetPassword) &&
          <ReactBSAlert
            style={{ display: 'block', marginTop: '-100px' }}
            title='Reset Password'
            onConfirm={() => setAlertResetPassword(false)}
            showConfirm={false}
            btnSize=''
          >
            <Row>

              <Col className='col-12'>
                <form>
                  <FormGroup className={`has-label ${resetPasswordInput.className}`}>
                    <label htmlFor='emailResetPassword'>Enter the email linked to the account</label>
                    <Input
                      type='email'
                      name='emailResetPassword'
                      placeholder='Enter email'
                      onChange={e => ValidatorFormChange(e, setResetPasswordInput, resetPasswordInput, 'email')}
                    />
                    {resetPasswordInput.error &&
                      <label className='error'>
                        {resetPasswordInput.labelError}
                      </label>}
                  </FormGroup>
                </form>
              </Col>
              <Col className='pt-2'>
                <Button
                  disabled={(reqfetchResetPassword.loading) ? true : null}
                  className='w-100'
                  color='danger'
                  onClick={() => setAlertResetPassword(false)}
                >
                   Cancel
                </Button>
              </Col>
              <Col className='pt-2'>
                <Button
                  disabled={(resetPasswordInput.error || reqfetchResetPassword.loading) ? true : null}
                  className='w-100'
                  color='success'
                  onClick={(e) => submitResetPassword(e)}
                >
                  {(!reqfetchResetPassword.loading) ? 'Send' : null}
                  <ClipLoader
                    color='#FFF'
                    size={20}
                    loading={reqfetchResetPassword.loading}
                  />
                </Button>
              </Col>

            </Row>
          </ReactBSAlert>
      }
      <Card>
        <CardHeader>
          <CardTitle tag='h4' className='text-center'>Login</CardTitle>
        </CardHeader>
        <CardBody>
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
                      setResetPasswordInput({
                        className: '',
                        value: '',
                        error: false,
                        labelError: ''
                      })
                    }}
                  >
                    <span>Reset Password...</span>
                  </a>
                </Col>
              </Row>
            </FormGroup>
            <CardFooter>
              {
                (error) &&
                  <Alert className='mt-2' color='danger'>
                    <Row>
                      <Col className='col-1'>
                        <i class='tim-icons icon-alert-circle-exc' />
                      </Col>
                      <Col className='col-11'>
                        <p>{error.graphQLErrors.map(({ message }) => {
                          return message
                        })}
                        </p>
                      </Col>
                    </Row>
                  </Alert>
              }
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
