import React, { useState } from 'react'
import {
  FormGroup,
  Label,
  Input,
  Button,
  Row, Col, Card, CardBody, CardTitle, CardHeader, CardFooter
} from 'reactstrap'
import { ValidatorFormChange } from './validationLogin'

const LoginIndex = () => {
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

  const submitFormLogin = (e) => {
    e.preventDefault()
    if (!emailInput.error || !passwordInput.error) {
      if (emailInput.value === '' || passwordInput.value === '') {
        setemailInput({
          ...emailInput,
          labelError: 'Input email is required',
          error: true,
          className: 'has-danger'
        })
        setpasswordInput({
          ...passwordInput,
          labelError: 'Password email is required',
          error: true,
          className: 'has-danger'
        })
      } else {
        const formInput = {
          email: emailInput.value,
          password: passwordInput.value
        }
        console.log(formInput)
      }
    }
  }

  return (
    <div style={{ margin: '0 auto', float: 'none', marginTop: '30%' }}>
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
                  <a href='#'><span>Reset Password...</span></a>
                </Col>
              </Row>
            </FormGroup>
            <CardFooter>
              <Row className='pt-2'>
                <Col>
                  <Button
                    disabled={(emailInput.error || passwordInput.error) ? true : null}
                    className='w-100'
                    color='primary'
                    type='submit'
                  >
                    Login
                  </Button>
                </Col>
              </Row>
            </CardFooter>
          </form>
        </CardBody>
      </Card>
    </div>

  )
}

export default LoginIndex
