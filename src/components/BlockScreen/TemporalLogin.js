import React, { useEffect, useState, useContext } from 'react'
import { GlobalContext } from '../../index'
import { SET_INITIAL_STATE, SET_BLOCK_SCREEN, SET_USER } from '../../store/actions'
import logout from '../../utils/Auth/logout'
import { useLazyQuery } from '@apollo/react-hooks'
import { withRouter } from 'react-router'
import { loginGql as LOGIN, meGQL as ME } from '../../utils/Graphql/Queries'
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
  Alert,
} from 'reactstrap'
import useAuth from '../../utils/Auth/index'
import { ClipLoader } from 'react-spinners'
import gql from 'graphql-tag'

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
    if (!value) {
      if (firstOnBlur || forceOnBlur) {
        setError('Input email is required')
        setClassName('has-danger')
      }
    } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
      setError(null)
      setClassName('has-success')
    } else {
      if (firstOnBlur || forceOnBlur) {
        setError('Your email address is invalid')
        setClassName('has-danger')
      }
    }
  }

  const passwordValidation = value => {
    if (!value) {
      setError('Input password is required')
      setClassName('has-danger')
    } else {
      setError(null)
      setClassName('has-success')
    }
  }

  const onBlurInput = e => {
    setFirstOnBlur(true)
    const forceOnBlur = true
    getClassName(value, forceOnBlur)
  }

  return {
    value,
    setValue,
    reset: () => setValue(''),
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
  }
}

const TemporalLogin = props => {
  const { state, dispatch } = useContext(GlobalContext)
  const [failedCount, setFailedCount] = useState(0)
  const {
    value: valueEmail,
    bind: bindEmail,
    error: errorEmail,
    reset: resetEmail
  } = useInput('', 'email')
  const {
    value: valuePassword,
    bind: bindPassword,
    error: errorPassword,
    reset: resetPassword
  } = useInput('', 'password')
  const [fetchLogin2, loginQuery] = useLazyQuery(LOGIN('token refreshToken'), {
    fetchPolicy: 'no-cache',
    // al completar con existo el login, guardar en el localstorage
    // lanzar query de ME
    // onCompleted funciona solo cuando la query es exitosa
    onCompleted ({ login }) {
      localStorage.setItem('refreshToken', login.refreshToken)
      localStorage.setItem('token', login.token)
      setTimeout(() => {
        fetchMe()
      }, 300)
    }
  })
  const [fetchMe, meQuery] = useLazyQuery(
    ME('fullName verified firstName email permissions { name } role { name }'),
    {
      fetchPolicy: 'no-cache',
      // si la query de ME es existosa, verificar el usuario
      // lanzar query de ME
      // onCompleted funciona solo cuando la query es exitosa
      onCompleted ({ me }) {

        // Limpiar y Desbloquear la Pantalla
        resetAll()
        const { user } = state
        if (user) {
          // Si el usuario de la query ME es diferente al que previamente estaba logueado
          // Limpiar todo y redireccionar a la vista por default
          if (user.email !== me.email) {
            dispatch({
              type: SET_INITIAL_STATE
            })
            dispatch({
              type: SET_USER,
              payload: me
            })
            props.history.push('/admin/dashboard')
          }
        }

      }
    }
  )

  // Si el login falla, aumentar el contador de fallo y resetar la password
  // si el contador de fallo llega a 3 o mayor forzar al login principal
  useEffect(() => {
    if (loginQuery.error && !loginQuery.loading) {
      resetPassword()
      setFailedCount(failedCount + 1)
    }
  }, [loginQuery])

  // si el contador de fallo llega a 3 o mayor forzar al login principal
  // reset del componente, localstorage y tienda (context state)
  useEffect(() => {
    if (failedCount > 2) {
      resetAll()
      dispatch({
        type: SET_INITIAL_STATE
      })
      logout(props.history)
    }
  }, [failedCount])

  // si la query de ME falla, forzar a que el contador desloguee totalmente al usuario
  useEffect(() => {
    if (meQuery.error && !meQuery.loading && loginQuery.data) {
      setFailedCount(20000)
    }
  }, [meQuery])

  const resetAll = () => {
    setFailedCount(0)
    resetEmail()
    resetPassword()
    dispatch({
      type: SET_BLOCK_SCREEN,
      payload: {
        active: false,
        type: null
      }
    })
  }

  const submitFormLogin = e => {
    e.preventDefault()
    if (!errorEmail && !errorPassword) {
      const { user } = state
      if (user) {
        fetchLogin2({
          variables: { email: valueEmail, password: valuePassword }
        })
      } else {
        resetAll()
        dispatch({
          type: SET_INITIAL_STATE
        })
        logout(props.history)
      }
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
            {(loginQuery.error || meQuery.error) && (
              <Alert color='danger'>
                The provided email or password is invalid
              </Alert>
            )}
            <form onSubmit={submitFormLogin}>
              <FormGroup
                className={`inputTemporalLogin has-label ${bindEmail.className}`}
              >
                <Label for='exampleEmail'>Email address</Label>
                <Input
                  type='email'
                  name='email'
                  id='exampleEmail'
                  placeholder='Enter email'
                  style={{ color: 'black !important' }}
                  {...bindEmail}
                />
                {errorEmail && <label className='error'>{errorEmail}</label>}
              </FormGroup>
              <FormGroup
                className={`inputTemporalLogin has-label ${bindPassword.className}`}
              >
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
                    errorEmail ||
                    !valueEmail ||
                    errorPassword ||
                    !valuePassword ||
                    loginQuery.loading ||
                    meQuery.loading
                  }
                  className='w-100'
                  color='success'
                  type='submit'
                >
                  {' '}
                  {loginQuery.loading ? (
                    <ClipLoader color='#FFF' size={25} loading />
                  ) : (
                    'Login'
                  )}
                </Button>
              </CardFooter>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

const ComponetWithRouter = withRouter(TemporalLogin)
export default ComponetWithRouter
