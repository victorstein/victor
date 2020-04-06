import React, { useState } from 'react'
import {
  Form,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  ModalFooter,
  Button,
  UncontrolledTooltip,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from 'reactstrap'
import useForm from '../../../utils/useFormHooks/useForm'
import schema from './ValidationFormSchema'
import classnames from 'classnames'

const PageOne = (props) => {
  const [activeInput, setActiveInput] = useState({
    userName: false,
    password: false,
    domainURL: false
  })
  const defaultValueForm = {
    siteName: '',
    accountName: '',
    domainURL: '',
    clientName: '',
    developerName: '',
    password: '',
    confirmPassword: ''
  }

  const submitForm = () => {
    props.setDataForm({
      ...props.dataForm,
      PageOne: values
    })
    props.nextStep()
  }

  const {
    values,
    handleChange,
    handleBlur,
    errors,
    handleSubmit,
    classNames
  } = useForm(submitForm, defaultValueForm, schema.schemaPageOne)

  return (
    <div className='pt-4'>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col className='col-12'>
            <FormGroup className={` has-label  ${(classNames.siteName) ? classNames.siteName : (values.siteName === '') ? '' : 'has-success'}`}>
              <Label for='siteName'>Site Name</Label>
              <Input
                type='text'
                className='iccon'
                name='siteName'
                id='siteName'
                placeholder='Site Name'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.siteName || ''}
              />
              {
                errors.siteName && (
                  <label className='error'>
                    {errors.siteName}
                  </label>
                )
              }
            </FormGroup>
          </Col>
          <Col className='col-6'>
            <UncontrolledTooltip className='Tooltip_wizard' placement='top' target='accountName' delay={0}>
              <div>
                <p className='pl-2'>Password required at least:</p>
                <ul className='text-left pl-3 pt-0'>
                  <p>
                  The account name must contain 8 characters only.
                  Please avoid the use of special characters.
                  </p>
                </ul>
              </div>
            </UncontrolledTooltip>
            <FormGroup className={` has-label  ${(classNames.accountName) ? classNames.accountName : (values.accountName === '') ? '' : 'has-success'}`}>
              <Label for='accountName'>Account Name</Label>
              <Input
                type='text'
                className='iccon'
                name='accountName'
                id='accountName'
                placeholder='Account Name'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.accountName || ''}
              />
              {
                errors.accountName && (
                  <label className='error'>
                    {errors.accountName}
                  </label>
                )
              }
            </FormGroup>
          </Col>
          <Col className='col-6'>
            <Label for='domainURL'>Domain URL</Label>
            <div className='iconNone'>
              <InputGroup
                className={`
          inputGroupAppendRight
          has-label ${(classNames.domainURL) ? classNames.domainURL : (values.domainURL === '') ? '' : 'has-success'}
          ${classnames({ 'input-group-focus': activeInput.domainURL })}
          `}
              >
                <Input
                  className='form-input-append'
                  type='text'
                  name='domainURL'
                  id='domainURL'
                  placeholder='Domain url'
                  onChange={handleChange}
                  value={values.domainURL || ''}
                  onFocus={(e) => {
                    setActiveInput({
                      ...activeInput,
                      domainURL: true
                    })
                  }}
                  onBlur={(e) => {
                    handleBlur(e)
                    setActiveInput({
                      ...activeInput,
                      domainURL: false
                    })
                  }}
                />
                <InputGroupAddon addonType='append'>
                  <InputGroupText>bytfm.com</InputGroupText>
                </InputGroupAddon>
                {
                  errors.domainURL && (
                    <label className='col-12 error'>
                      {errors.domainURL}
                    </label>
                  )
                }
              </InputGroup>
            </div>
          </Col>
          <Col className='col-4' />
        </Row>
        <Row>
          <Col className='col-6'>
            <FormGroup className={`has-label  ${(classNames.clientName) ? classNames.clientName : (values.clientName === '') ? '' : 'has-success'}`}>
              <Label for='clientName'>Client Name</Label>
              <Input
                type='text'
                name='clientName'
                id='clientName'
                placeholder='Client Name'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.clientName || ''}
              />
              {
                errors.clientName && (
                  <label className='error'>
                    {errors.clientName}
                  </label>
                )
              }
            </FormGroup>
          </Col>
          <Col className='col-6'>
            <FormGroup className={`has-label  ${(classNames.developerName) ? classNames.developerName : (values.developerName === '') ? '' : 'has-success'}`}>
              <Label for='developerName'>Developer Name</Label>
              <Input
                type='text'
                name='developerName'
                id='developerName'
                placeholder='Developer Name'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.developerName || ''}
              />
              {
                errors.developerName && (
                  <label className='error'>
                    {errors.developerName}
                  </label>
                )
              }
            </FormGroup>
          </Col>
          <Col className='col-6'>
            <UncontrolledTooltip className='Tooltip_wizard' placement='top' target='password' delay={0}>
              <div>
                <p className='pl-2'>Password required at leat:</p>
                <ul className='text-left pl-3 pt-0'>
                  <li>One upper case letter</li>
                  <li>One lower case letter</li>
                  <li>Eight characters</li>
                  <li>One special characters</li>
                  <li>One Number</li>
                </ul>
              </div>
            </UncontrolledTooltip>
            <UncontrolledTooltip className='Tooltip_wizard' placement='top' target='exclamation-circle' delay={0}>
              <div>
                <p className='pl-2'>click to generate password automatically.</p>
              </div>
            </UncontrolledTooltip>
            <div className='InputGroupVictor'>
              <Label style={{ color: 'rgba(255, 255, 255, 0.6)' }} for='password'>Password</Label>
              <InputGroup
                className={`
          text-left 
          has-label ${(classNames.password) ? classNames.password : (values.password === '') ? '' : 'has-success'}
          ${classnames({ 'input-group-focus': activeInput.password })}
          `}
              >
                <InputGroupAddon style={{ display: 'contents' }} addonType='prepend'>
                  <InputGroupText id='exclamation-circle'>
                    <i
                      className='fas fa-exclamation-circle'
                    />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='Password'
                  onChange={handleChange}
                  value={values.password || ''}
                  onFocus={(e) => {
                    setActiveInput({
                      ...activeInput,
                      password: true
                    })
                  }}
                  onBlur={(e) => {
                    handleBlur(e)
                    setActiveInput({
                      ...activeInput,
                      password: false
                    })
                  }}
                />
                {
                  errors.password && (
                    <label className='col-12 error'>
                      {errors.password}
                    </label>
                  )
                }
              </InputGroup>
            </div>
          </Col>
          <Col className='col-6'>
            <FormGroup className={`has-label  ${(classNames.confirmPassword) ? classNames.confirmPassword : (values.confirmPassword === '') ? '' : 'has-success'}`}>
              <Label for='password'>Confirm Password</Label>
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
                errors.confirmPassword && (
                  <label className='col-12 error'>
                    {errors.confirmPassword}
                  </label>
                )
              }
            </FormGroup>
          </Col>
        </Row>
        <ModalFooter>
          <Row className='w-100 d-flex justify-content-center'>
            <Col className='col-4 pt-2'>
              <Button
                type='submit'
                className='w-100'
                color='primary'
              >
                Next
              </Button>
            </Col>
          </Row>
        </ModalFooter>
      </Form>
    </div>
  )
}

export default PageOne
