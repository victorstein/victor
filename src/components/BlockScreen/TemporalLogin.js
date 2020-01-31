import React, { useEffect, useRef, useState } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import {
    loginGql as LOGIN, meGQL as ME
} from '../../utils/Graphql/Queries'
import {
  FormGroup,
  Label,
  Input,
  Button,
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  CardFooter,
  Alert
} from 'reactstrap'
import useAuth from '../../utils/Auth/index'
import { ClipLoader } from 'react-spinners'

import './styles.css'

const useInput = (initialValue, nameInput) => {
    const [value, setValue] = useState(initialValue)
    const [className, setClassName] = useState('')
    const [error, setError] = useState(false)
    const [firstOnBlur, setFirstOnBlur] = useState(false)
   

    const getClassName = (value, forceOnBlur = false) => {
        switch (nameInput) {
            case 'email':
                return emailValidation(value, forceOnBlur)
            case 'password':
                return passwordValidation(value, forceOnBlur)
        }
        setClassName('')
    }

    const emailValidation = (value, forceOnBlur = false) => {
        if(!value) {
            if(firstOnBlur || forceOnBlur) {
                setError('Input email is required')
                setClassName('has-danger')
            }     
        } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
            setError(null)
            setClassName('has-success')
        } else {
            if(firstOnBlur || forceOnBlur) { 
                setError('Your email address is invalid')
                setClassName('has-danger')
            }
        }
    }

    const passwordValidation = (value) => {
        if(!value) {
            setError('Input password is required')
            setClassName('has-danger')
        } else {
            setError(null)
            setClassName('has-success')
        }
    }

    const onBlurInput = (e) => {
        setFirstOnBlur(true)
        const forceOnBlur = true
        getClassName(value, forceOnBlur)
    }

    return {
      value,
      setValue,
      reset: () => setValue(""),
      error: error,
      bind: {
        onBlur: e => onBlurInput(e),
        value,
        className: className,
        onChange: event => {
          getClassName(event.target.value)
          setValue(event.target.value)
        }
      }
    };
};

const TemporalLogin = () => {

  const [failedCount, setFailedCount] = useState(0)
  const { value: valueEmail, bind: bindEmail, error: errorEmail } = useInput('', 'email')
  const { value: valuePassword, bind: bindPassword, error: errorPassword } = useInput('', 'password')
  const [fetchLogin, loginQuery] = useLazyQuery(
    LOGIN('token refreshToken'),
    {
      onCompleted({ login }) {
          console.log('login ', login)
          localStorage.setItem('refreshToken', '---?'+login.refreshToken)
          localStorage.setItem('token', '---->'+login.token+'--->>>')
          setTimeout(() => {
            fetchMe()
          }, 300)
      }
    }
  )
  const [fetchMe, meQuery] = useLazyQuery(
    ME('fullName verified firstName permissions { name } role { name }'),
    { fetchPolicy: 'no-cache' }
  )

  useEffect(() => {
    if(loginQuery.error && !loginQuery.loading) {
      setFailedCount(failedCount+1)
    }
  },[loginQuery])

  useEffect(() => {
    console.log(' meQuery.error ' , meQuery)  
    if(meQuery.error && !meQuery.loading && loginQuery.data) {
      setFailedCount(20000)
    }
  },[meQuery])

  const submitFormLogin = e => {
    e.preventDefault()
    if (!errorEmail && !errorPassword) {
        fetchLogin({
            variables: { email: valueEmail, password: valuePassword }
        }, )
    }
  }

  return (
    <div class='wTemporalLogin bg-white mx-auto'>
      <div className='loginForm'>
        <Card>
          <CardHeader>
            <CardTitle tag='h4' className='text-center'>
              Your session has expired
            </CardTitle>
          </CardHeader>
          <CardBody>
            <Alert color="danger">{failedCount}</Alert>
            <form onSubmit={submitFormLogin}>
              <FormGroup className={`has-label ${bindEmail.className}`}>
                <Label for='exampleEmail'>Email address</Label>
                <Input
                  type='email'
                  name='email'
                  id='exampleEmail'
                  placeholder='Enter email'
                  style={{ color: 'black !important' }}
                  {...bindEmail}
                />
                {errorEmail && (
                    <label className='error'>{errorEmail}</label>
                  )}
              </FormGroup>
              <FormGroup className={`has-label ${bindPassword.className}`}>
                <Label for='examplePassword'>Password</Label>
                <Input
                  type='password'
                  name='password'
                  id='examplePassword'
                  placeholder='Password'
                  autoComplete='off'
                  {...bindPassword}
                />
                {errorPassword && (
                    <label className='error'>{errorPassword}</label>
                  )}
              </FormGroup>
              <CardFooter>
                <Button
                  disabled={
                    errorEmail || !valueEmail || errorPassword || !valuePassword || loginQuery.loading
                  }
                  className='w-100'
                  color='success'
                  type='submit'
                > {
                    (loginQuery.loading) ? <ClipLoader color='#FFF' size={25} loading />
                    : 'Login'
                }    
                </Button>
              </CardFooter>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default TemporalLogin

