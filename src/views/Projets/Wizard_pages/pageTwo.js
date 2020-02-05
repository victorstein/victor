import React from 'react'
import {
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  InputGroup,
  UncontrolledTooltip,
  InputGroupAddon,
  InputGroupText
} from 'reactstrap'
import classnames from 'classnames'
import UserContext, { UserConsumer } from '../ModalWizardProvider'
import { passwordGenerator } from '../../../utils/PasswordGenerator'
import { nameGenerator } from '../../../utils/nameGenerator'

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
      },
      passwordInputFocus: false,
      userNameInputFocus: false
    }
  }

  isValidated () {
    const { userNameInput, passwordInput, confirmPasswordInput } = this.state
    // console.log('userNameInput', userNameInput.className === 'has-success' )
    // console.log('passwordInput', passwordInput.className === 'has-success' )
    // console.log('confirmPasswordInput', confirmPasswordInput.className === 'has-success' )
    if (
      userNameInput.className === 'has-success' &&
      passwordInput.className === 'has-success' &&
      confirmPasswordInput.className === 'has-success'
    ) {
      const { setState } = this.context
      const dataPage = {
        userName: this.state.userNameInput.value,
        password: this.state.passwordInput.value
      }
      setState({
        PageTwoData: {
          data: { ...dataPage },
          complete: true
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
      if (confirmPasswordInput.className !== 'has-success') {
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
        case 'userName':
          if (!value) {
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
        case 'password':
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
        case 'confirmPassword':
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
        default: break
      }
    }
    return (
      <UserConsumer>
        {
          (contextValue) => {
            //console.log(contextValue.state)
            return (
              <div className='container'>
                <form>
                  <Row>
                    <Col className='col-12'>
                      <UncontrolledTooltip className='Tooltip_wizard' placement='top' target='exclamationName' delay={0}>
                        <div>
                          <p className='pl-2'>Click to generate the username automatically.</p>
                        </div>
                      </UncontrolledTooltip>
                      <Label for='userName'>User Name</Label>
                      <div className='InputGroupVictor'>
                        <InputGroup className={`has-label ${this.state.userNameInput.className} ${classnames({
                          'input-group-focus': this.state.userNameInputFocus
                        })}`}
                        >
                          <InputGroupAddon style={{ display: 'contents' }} addonType='prepend'>
                            <InputGroupText id='exclamationName'>
                              <i
                                onClick={async (e) => {
                                  const { PageOneData } = this.context.state
                                  const newName = await nameGenerator(PageOneData.data.domainURL)
                                  this.setState({
                                    userNameInput: {
                                      labelError: '',
                                      error: false,
                                      value: newName,
                                      className: 'has-success'
                                    }
                                  })
                                  // console.log(newName)
                                }}
                                className='fas fa-exclamation-circle'
                              />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            value={this.state.userNameInput.value}
                            type='text'
                            name='userName'
                            id='userName'
                            placeholder='User Name'
                            onChange={e => ValidatorFormChange(e, 'userName')}
                            onFocus={(e) =>
                              this.setState({
                                userNameInputFocus: true
                              })}
                            onBlur={(e) =>
                              this.setState({
                                userNameInputFocus: false
                              })}
                          />
                          {this.state.userNameInput.error &&
                            <label className='error'>
                              {this.state.userNameInput.labelError}
                            </label>}
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
                          className={`has-label ${this.state.passwordInput.className} ${classnames({
                            'input-group-focus': this.state.passwordInputFocus
                          })}`}
                        >
                          <InputGroupAddon style={{ display: 'contents' }} addonType='prepend'>
                            <InputGroupText id='exclamation-circle'>
                              <i
                                onClick={async (e) => {
                                  const newPassword = await passwordGenerator()
                                  this.setState(
                                    {
                                      passwordInput: {
                                        labelError: '',
                                        error: false,
                                        value: newPassword,
                                        className: 'has-success'
                                      },
                                      confirmPasswordInput: {
                                        labelError: '',
                                        error: false,
                                        value: newPassword,
                                        className: 'has-success'
                                      }
                                    })
                                }}
                                className='fas fa-exclamation-circle'
                              />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            value={this.state.passwordInput.value}
                            type='password'
                            name='password'
                            id='password'
                            placeholder='password'
                            onChange={e => ValidatorFormChange(e, 'password')}
                            onFocus={(e) =>
                              this.setState({
                                passwordInputFocus: true
                              })}
                            onBlur={(e) =>
                              this.setState({
                                passwordInputFocus: false
                              })}
                          />
                          {this.state.passwordInput.error &&
                            <label className='error'>
                              {this.state.passwordInput.labelError}
                            </label>}
                        </InputGroup>
                      </div>
                    </Col>
                    <Col className='col-6'>
                      <FormGroup className={`has-label ${this.state.confirmPasswordInput.className}`}>
                        <Label for='confirmPassword'>Confirm Passwor</Label>
                        <Input
                          value={this.state.confirmPasswordInput.value}
                          type='password'
                          name='confirmPassword'
                          id='confirmPassword'
                          placeholder='Confirm Password'
                          onChange={e => ValidatorFormChange(e, 'confirmPassword')}
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
