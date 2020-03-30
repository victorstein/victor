import React, { useState } from 'react'
import ReactBSAlert from 'react-bootstrap-sweetalert'
import { FormGroup, Input, Button, Row, Col, Alert } from 'reactstrap'
import { ValidatorFormChange } from './validationLogin'
import { useLazyQuery } from '@apollo/react-hooks'
import { requestPasswordResetGql } from '../../utils/Graphql/Queries'
import { ClipLoader } from 'react-spinners'
import './styles.scss'

const ResetPassword = (props) => {
  const [resetPasswordInput, setResetPasswordInput] = useState({
    className: '',
    value: '',
    error: false,
    labelError: ''
  })
  const [fetchResetPassword, reqfetchResetPassword] = useLazyQuery(requestPasswordResetGql(), { fetchPolicy: 'no-cache', onCompleted: () => cleanModal() })

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
        fetchResetPassword({ variables: { email: resetPasswordInput.value } })
      }
    } catch (e) {
      console.log(e)
    }
  }

  const cleanModal = () => {
    setResetPasswordInput({
      className: '',
      value: '',
      error: false,
      labelError: ''
    })
  }

  return (
    <ReactBSAlert
      style={{ display: 'block', marginTop: '100px' }}
      title='Reset Password'
      onConfirm={() => props.setAlertResetPassword(false)}
      showConfirm={false}
      btnSize=''
    >
      <Row className='resetPasswordForm'>
        <Col className='col-12'>
          {
            (reqfetchResetPassword.error) &&
              <Alert className='mt-2' color='danger'>
                <Row>
                  <Col className='col-1'>
                    <i className='tim-icons icon-alert-circle-exc' />
                  </Col>
                  <Col className='col-11 text-left'>
                    <h4 className='alert-heading'>Error!</h4>
                  </Col>
                  <Col className='col-12 text-sm-left'>
                    <p>{reqfetchResetPassword.graphQLErrors.map(({ message }) => {
                      return message.split(':')[1]
                    })}
                    </p>
                  </Col>
                </Row>
              </Alert>
          }
          {
            (reqfetchResetPassword.data) &&
              <Alert className='mt-2' color='success'>
                <Row>
                  <Col className='col-1'>
                    <i className='tim-icons icon-alert-circle-exc' />
                  </Col>
                  <Col className='col-11 text-left'>
                    <h4 className='alert-heading'>Well done!</h4>
                  </Col>
                  <Col className='col-12 text-sm-left'>
                    <p className='alertText'> If your email is registered within our platform, you will receive an email with the instructions to reset your password</p>
                  </Col>
                </Row>
              </Alert>
          }
        </Col>
        <Col className='col-12'>
          <FormGroup className={`has-label ${resetPasswordInput.className} `}>
            <label htmlFor='emailResetPassword'>Enter the email linked to the account</label>
            <Input
              type='email'
              name='emailResetPassword'
              placeholder='Enter email'
              onChange={e => ValidatorFormChange(e, setResetPasswordInput, resetPasswordInput, 'email')}
            />
            {
              resetPasswordInput.error &&
                <div className='text-left'>
                  <label className='error'>
                    {resetPasswordInput.labelError}
                  </label>
                </div>
            }
          </FormGroup>
        </Col>
        <Col className='pt-2'>
          <Button
            disabled={(reqfetchResetPassword.loading) ? true : null}
            className='w-100'
            color='danger'
            onClick={() => props.setAlertResetPassword(false)}
          >
           Cancel
          </Button>
        </Col>
        <Col className='pt-2'>
          <Button
            disabled={(resetPasswordInput.error || reqfetchResetPassword.loading) || reqfetchResetPassword.data ? true : null}
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
  )
}

export default ResetPassword
