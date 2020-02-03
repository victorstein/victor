import React from 'react'
import {
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  UncontrolledTooltip
} from 'reactstrap'
import UserContext, { UserConsumer } from '../ModalWizardProvider'

class PageTwo extends React.Component {
  static contextType = UserContext
  constructor (props) {
    super(props)
    this.state = {
      userNameInput: {
        className: '',
        value: '',
        error: false,
        labelError: ''
      },
      passwordInput: {
        className: '',
        value: '',
        error: false,
        labelError: ''
      },
      confirmPasswordInput: {
        className: '',
        value: '',
        error: false,
        labelError: ''
      }
    }
  }

  isValidated () {
    const { userNameInput, passwordInput, confirmPasswordInput } = this.state
    if (
      userNameInput.className === 'has-success' &&
      passwordInput.className === 'has-success' &&
      confirmPasswordInput.className === 'has-success'
    ) {
      const { setState } = this.context
      const dataPage = {
        userName : this.state.userNameInput.value,
        password : this.state.passwordInput.value,
      }
      setState({
        PageTwoData :{
          data :  {...dataPage},
          complete : true
        }
      })
      return true
    } else {
      if (userNameInput.className !== 'has-success') {
        this.setState({
          userNameInput: {
            labelError: 'User Name is required',
            error: true,
            value: userNameInput.value,
            className: 'has-danger'
          }
        })
      }
      if (passwordInput.className !== 'has-success') {
        this.setState({
          passwordInput: {
            labelError: 'User Name is required',
            error: true,
            value: passwordInput.value,
            className: 'has-danger'
          }
        })
      }
      if (confirmPasswordInput.value !== 'has-sucess') {
        this.setState({
          confirmPasswordInput: {
            labelError: 'Confirm Password is required',
            error: true,
            value: confirmPasswordInput.value,
            className: 'has-danger'
          }
        })
      }
      return false
    }
  }

  render () {
    const ValidatorFormChange = (event, nameInput) => {
      const { value } = event.target
      switch (nameInput) {
        case 'userName' :
          if (!value) {
            if (value !== this.state.confirmPasswordInput.value) {
              this.setState({
                confirmPasswordInput: {
                  labelError: 'Passwords do not match',
                  error: true,
                  value: this.state.confirmPasswordInput.value,
                  className: 'has-danger'
                }
              })
            } else {
              this.setState({
                confirmPasswordInput: {
                  labelError: '',
                  error: false,
                  value: this.state.confirmPasswordInput.value,
                  className: 'has-success'
                }
              })
            }
            this.setState({
              userNameInput: {
                labelError: 'User Name is required',
                error: true,
                value: value,
                className: 'has-danger'
              }
            })
          } else {
            this.setState({
              userNameInput: {
                labelError: '',
                error: false,
                value: value,
                className: 'has-success'
              }
            })
          }
          break
        case 'password' :
          if (!value) {
            this.setState({
              passwordInput: {
                labelError: 'User Name is required',
                error: true,
                value: value,
                className: 'has-danger'
              }
            })
          } else {
            if (value !== this.state.confirmPasswordInput.value) {
              this.setState({
                confirmPasswordInput: {
                  labelError: 'Passwords do not match',
                  error: true,
                  value: this.state.confirmPasswordInput.value,
                  className: 'has-danger'
                }
              })
            } else {
              this.setState({
                confirmPasswordInput: {
                  labelError: '',
                  error: false,
                  value: this.state.confirmPasswordInput.value,
                  className: 'has-success'
                }
              })
            }
            const phoneRGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
            if (!phoneRGEX.test(value)) {
              this.setState({
                passwordInput: {
                  labelError: 'The password does not meet the minimum requirements',
                  error: true,
                  value: value,
                  className: 'has-danger'
                }
              })
            } else {
              this.setState({
                passwordInput: {
                  labelError: '',
                  error: false,
                  value: value,
                  className: 'has-success'
                }
              })
            }
          }
          break
        case 'confirmPasswor' :
          if (!value) {
            this.setState({
              confirmPasswordInput: {
                labelError: 'Confirm password is required',
                error: true,
                value: value,
                className: 'has-danger'
              }
            })
          } else {
            if (this.state.passwordInput.value !== value) {
              this.setState({
                confirmPasswordInput: {
                  labelError: 'Passwords do not match',
                  error: true,
                  value: value,
                  className: 'has-danger'
                }
              })
            } else {
              this.setState({
                confirmPasswordInput: {
                  labelError: '',
                  error: false,
                  value: value,
                  className: 'has-success'
                }
              })
            }
          }
          break
        default :break
      }
    }
    return (
      <UserConsumer>
        {
          (contextValue) => {
            // console.log(contextValue)
            return (
              <div className='container'>
                <form>
                  <Row>
                    <Col className='col-12'>
                      <FormGroup className={`has-label ${this.state.userNameInput.className}`}>
                        <Label for='userName'>User Name</Label>
                        <Input
                          type='text'
                          name='userName'
                          id='userName'
                          placeholder='User Name'
                          onChange={e => ValidatorFormChange(e, 'userName')}
                        />
                        {this.state.userNameInput.error &&
                          <label className='error'>
                            {this.state.userNameInput.labelError}
                          </label>}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className='col-6'>
                      <FormGroup className={`has-label ${this.state.passwordInput.className}`}>
                        <Label for='password'>Password</Label>
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
                        <Input
                          type='password'
                          name='password'
                          id='password'
                          placeholder='password'
                          onChange={e => ValidatorFormChange(e, 'password')}
                        />

                        {this.state.passwordInput.error &&
                          <label className='error'>
                            {this.state.passwordInput.labelError}
                          </label>}
                      </FormGroup>
                    </Col>
                    <Col className='col-6'>
                      <FormGroup className={`has-label ${this.state.confirmPasswordInput.className}`}>
                        <Label for='confirmPasswor'>Confirm Passwor</Label>
                        <Input
                          type='password'
                          name='confirmPasswor'
                          id='confirmPasswor'
                          placeholder='Confirm Password'
                          onChange={e => ValidatorFormChange(e, 'confirmPasswor')}
                        />
                        {this.state.confirmPasswordInput.error &&
                          <label className='error'>
                            {this.state.confirmPasswordInput.labelError}
                          </label>}
                      </FormGroup>
                    </Col>
                  </Row>
                </form>
              </div>
            )
          }
        }
      </UserConsumer>
    )
  }
}

export default PageTwo
