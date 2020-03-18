import React, { useState } from 'react'
import {
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  InputGroup,
  UncontrolledTooltip,
  InputGroupAddon,
  InputGroupText,
  Form,
  ModalFooter,
  Button
} from 'reactstrap'
import classnames from 'classnames'
// import UserContext, { UserConsumer } from '../ModalWizardProvider'
// import { passwordGenerator } from '../../../utils/PasswordGenerator'
// import { nameGenerator } from '../../../utils/nameGenerator'
import useForm from '../../../utils/useFormHooks/useForm'
import schema from './ValidationFormSchema'

const PageTwo = (props) => {
  const [activeInput, setActiveInput] = useState({
    userName: false,
    password: false
  })

  const defaultValueForm = {
    userName: '',
    password: '',
    confirmPassword: ''
  }

  const submitForm = () => {
    console.log('submit')
    props.nextStep()
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
  } = useForm(submitForm, defaultValueForm, schema.schemaPageTwo)

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className='col-12'>
          <UncontrolledTooltip className='Tooltip_wizard' placement='top' target='exclamationName' delay={0}>
            <div>
              <p className='pl-2'>Click to generate the username automatically.</p>
            </div>
          </UncontrolledTooltip>
          <Label for='userName'>User Name</Label>
          <div className='InputGroupVictor'>
            <InputGroup
              className={`
              text-left 
              has-label ${(classNames.userName) ? classNames.userName : (values.userName === '') ? '' : 'has-success'}
              ${classnames({ 'input-group-focus': activeInput.userName })}
              `}
            >
              <InputGroupAddon style={{ display: 'contents' }} addonType='prepend'>
                <InputGroupText id='exclamationName'>
                  <i
                    className='fas fa-exclamation-circle'
                    // onClick={async (e) => {
                    // const newName = await nameGenerator(PageOneData.data.domainURL)
                    // this.setState({
                    //   userNameInput: {
                    //     labelError: '',
                    //     error: false,
                    //     value: newName,
                    //     className: 'has-success'
                    //   }
                    // })
                    // console.log(newName)
                    // }}
                  />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                type='text'
                name='userName'
                id='userName'
                placeholder='User Name'
                onChange={handleChange}
                value={values.userName || ''}
                onFocus={(e) => {
                  setActiveInput({
                    ...activeInput,
                    userName: true
                  })
                }}
                onBlur={(e) => {
                  handleBlur(e)
                  setActiveInput({
                    ...activeInput,
                    userName: false
                  })
                }}
              />
              {
                errors.userName && (
                  <label className='col-12 error'>
                    {errors.userName}
                  </label>
                )
              }
            </InputGroup>
          </div>
        </Col>
      </Row>
      <Row>
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
          <Label for='password'>Password</Label>
          <div className='InputGroupVictor'>
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
                    onClick={async (e) => {
                      // const newPassword = await passwordGenerator()
                      // this.setState(
                      //   {
                      //     passwordInput: {
                      //       labelError: '',
                      //       error: false,
                      //       value: newPassword,
                      //       className: 'has-success'
                      //     },
                      //     confirmPasswordInput: {
                      //       labelError: '',
                      //       error: false,
                      //       value: newPassword,
                      //       className: 'has-success'
                      //     }
                      //   })
                    }}
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
          <FormGroup className='has-label '>
            <Label for='confirmPassword'>Confirm Passwor</Label>
            <Input
              // value={this.state.confirmPasswordInput.value}
              type='password'
              name='confirmPassword'
              id='confirmPassword'
              placeholder='Confirm Password'
              // onChange={e => ValidatorFormChange(e, 'confirmPassword')}
            />
            {
              // this.state.confirmPasswordInput.error &&
              // <label className='error'>
              //   {this.state.confirmPasswordInput.labelError}
              // </label>
            }
          </FormGroup>
        </Col>
      </Row>
      <ModalFooter>
        <Row className='w-100 d-flex justify-content-center'>
          {
            <Col className='col-6 pt-2'>
              <Button
                type='submit'
                className='w-100'
                color='success'
                onClick={(e) => {
                  e.preventDefault()
                  props.previousStep()
                }}
              >
                Back
              </Button>
            </Col>
          }

          <Col className='col-6 pt-2'>
            <Button
              type='submit'
              className='w-100'
              color='success'
            >
                Next
            </Button>
          </Col>
        </Row>
      </ModalFooter>
    </Form>
  )
}

export default PageTwo
