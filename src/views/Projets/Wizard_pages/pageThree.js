import React from 'react'
import {
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  UncontrolledTooltip,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  ModalFooter,
  Button,
  Form
} from 'reactstrap'
import Select from 'react-select'
import useForm from '../../../utils/useFormHooks/useForm'
import schema from './ValidationFormSchema'
import classnames from 'classnames'
// import { passwordGenerator } from '../../../utils/PasswordGenerator'

const PageThree = (props) => {
  const [activeInput, setActiveInput] = React.useState({
    passwordWordpress: false
  })
  const defaultValueForm = {
    userName: '',
    developerEmail: '',
    topic: '',
    passwordWordpress: '',
    confirmPassword: '',
    language: 'EN'
  }

  const submitForm = () => {
    console.log('submit Final')
  }

  const {
    values,
    handleChange,
    handleBlur,
    errors,
    handleSubmit,
    classNames
    // handleChangeReactSelect,
    // handleBlurReactSelect
  } = useForm(submitForm, defaultValueForm, schema.schemaPageThree)
  return (
    <div className='pt-4'>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col className='col-4'>
            <FormGroup className={` has-label  ${(classNames.userName) ? classNames.userName : (values.userName === '') ? '' : 'has-success'}`}>
              <Label for='userName'>Developer Email</Label>
              <Input
                type='text'
                className='iccon'
                name='userName'
                id='userName'
                // disabled
                placeholder='Developer Email'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.userName || ''}
              />
              {
                errors.userName && (
                  <label className='error'>
                    {errors.userName}
                  </label>
                )
              }
            </FormGroup>
          </Col>
          <Col className='col-4'>
            <FormGroup className={` has-label  ${(classNames.developerEmail) ? classNames.developerEmail : (values.developerEmail === '') ? '' : 'has-success'}`}>
              <Label for='developerEmail'>Developer Email</Label>
              <Input
                type='text'
                className='iccon'
                name='developerEmail'
                id='developerEmail'
                placeholder='Developer Email'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.developerEmail || ''}
              />
              {
                errors.developerEmail && (
                  <label className='error'>
                    {errors.developerEmail}
                  </label>
                )
              }
            </FormGroup>
          </Col>
          <Col className='col-4'>
            <FormGroup className={` has-label  ${(classNames.topic) ? classNames.topic : (values.topic === '') ? '' : 'has-success'}`}>
              <Label for='topic'>Developer Email</Label>
              <Input
                type='text'
                className='iccon'
                name='topic'
                id='topic'
                // disabled
                placeholder='Developer Email'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.topic || ''}
              />
              {
                errors.topic && (
                  <label className='error'>
                    {errors.topic}
                  </label>
                )
              }
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col className='col-4'>
            <UncontrolledTooltip className='Tooltip_wizard' placement='top' target='passwordWordpress' delay={0}>
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
            <UncontrolledTooltip className='Tooltip_wizard' placement='top' target='exclamationPageThree' delay={0}>
              <div>
                <p className='pl-2'>click to generate password automatically.</p>
              </div>
            </UncontrolledTooltip>
            <div className='InputGroupVictor'>
              <Label style={{ color: 'rgba(255, 255, 255, 0.6)' }} for='password'>Password</Label>
              <InputGroup
                className={`
          text-left 
          has-label ${(classNames.passwordWordpress) ? classNames.passwordWordpress : (values.passwordWordpress === '') ? '' : 'has-success'}
          ${classnames({ 'input-group-focus': activeInput.passwordWordpress })}
          `}
              >
                <InputGroupAddon style={{ display: 'contents' }} addonType='prepend'>
                  <InputGroupText id='exclamationPageThree'>
                    <i
                      // onClick={async (e) => {
                      //   const newPassword = await passwordGenerator()
                      //   this.setState(
                      //     {
                      //       passwordInput: {
                      //         labelError: '',
                      //         error: false,
                      //         value: newPassword,
                      //         className: 'has-success'
                      //       },
                      //       confirmPasswordInput: {
                      //         labelError: '',
                      //         error: false,
                      //         value: newPassword,
                      //         className: 'has-success'
                      //       }
                      //     })
                      // }}
                      className='fas fa-exclamation-circle'
                    />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  type='password'
                  name='passwordWordpress'
                  id='passwordWordpress'
                  placeholder='Password'
                  onChange={handleChange}
                  value={values.passwordWordpress || ''}
                  onFocus={(e) => {
                    setActiveInput({
                      ...activeInput,
                      passwordWordpress: true
                    })
                  }}
                  onBlur={(e) => {
                    handleBlur(e)
                    setActiveInput({
                      ...activeInput,
                      passwordWordpress: false
                    })
                  }}
                />
                {
                  errors.passwordWordpress && (
                    <label className='col-12 error'>
                      {errors.passwordWordpress}
                    </label>
                  )
                }
              </InputGroup>
            </div>
          </Col>
          <Col className='col-4'>
            <FormGroup>
              <Label for='confirmPasswor'>Confirm Passwor</Label>
              <Input
                type='password'
                name='confirmPasswor'
                id='confirmPasswor'
                placeholder='Confirm Password'
              />
            </FormGroup>
          </Col>
          <Col className='ccol-4'>
            <FormGroup>
              <Label for='language'>Language</Label>
              <Select
                className='react-select primary'
                classNamePrefix='react-select'
                name='singleSelect'
                // value={this.state.singleSelect}
                onChange={value =>
                  this.setState({ singleSelect: value })}
                options={[
                  { value: 'EN', label: 'English' },
                  { value: 'ES', label: 'Spanish' }
                ]}
                placeholder='Single Select'
              />
            </FormGroup>
          </Col>
        </Row>
        <ModalFooter>
          <div style={{ width: '33%' }} className='d-flex flex-row bd-highlight'>
            <Button
              className='w-100'
              color='primary'
              onClick={(e) => {
                e.preventDefault()
                props.previousStep()
              }}
            >
              Back
            </Button>
          </div>
          <div style={{ width: '33%' }} className='d-flex flex-row-reverse bd-highlight'>
            <Button
              type='submit'
              className='w-100'
              color='primary'
            >
              Finish
            </Button>
          </div>
        </ModalFooter>
      </Form>
    </div>
  )
}

export default PageThree
