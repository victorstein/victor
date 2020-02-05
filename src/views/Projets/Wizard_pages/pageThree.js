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
  InputGroupText
} from 'reactstrap'
import { ValidatorFormChange } from './ValidationForm'
import classnames from 'classnames'
import UserContext, { UserConsumer } from '../ModalWizardProvider'
import { passwordGenerator } from '../../../utils/PasswordGenerator'

class PageThree extends React.Component {
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
      developerEmailInput: {
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
      languageInput: {
        className: '',
        value: '',
        error: false,
        labelError: ''
      },
      topicInput: {
        className: '',
        value: '',
        error: false,
        labelError: ''
      }
    }
  }

  isValidated () {
    const {
      userNameInput,
      passwordInput,
      confirmPasswordInput,
      developerEmailInput,
      languageInput,
      topicInput
    } = this.state
    if (
      passwordInput.className === 'has-success' &&
      confirmPasswordInput.className === 'has-success' &&
      developerEmailInput.className === 'has-success' &&
      languageInput.className === 'has-success' &&
      topicInput.className === 'has-success'
    ) {
      const { setState, state } = this.context
      const dataPage = {
        userName: this.state.userNameInput.value,
        developerEmail: this.state.developerEmailInput.value,
        password: this.state.passwordInput.value,
        language: this.state.languageInput.value,
        topic: this.state.topicInput.value
      }
      setState({
        PageThereeData: {
          data: { ...dataPage },
          complete: true
        }
      })
      console.log({ ...state, dataPage })
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
            labelError: 'Confirm password is required',
            error: true,
            value: confirmPasswordInput.value,
            className: 'has-danger'
          }
        })
      }
      if (developerEmailInput.className !== 'has-success') {
        this.setState({
          developerEmailInput: {
            labelError: 'Developer email is required',
            error: true,
            value: developerEmailInput.value,
            className: 'has-danger'
          }
        })
      }
      if (languageInput.className !== 'has-success') {
        this.setState({
          languageInput: {
            labelError: 'Language is required',
            error: true,
            value: languageInput.value,
            className: 'has-danger'
          }
        })
      }
      if (topicInput.className !== 'has-success') {
        this.setState({
          topicInput: {
            labelError: 'Topic is required',
            error: true,
            value: topicInput.value,
            className: 'has-danger'
          }
        })
      }
      return false
    }
  }

  render () {
    return (
      <UserConsumer>
        {
          (contextValue) => {
            return (
              <div className='container'>
                <form>
                  <Row>
                    <Col className='col-4'>
                      <FormGroup className={`has-label  ${(!contextValue.state.PageTwoData.data.userName) ? 'has-danger' : 'has-success'}`}>
                        <Label for='userName'>User Name</Label>
                        <Input
                          value={(!contextValue.state.PageTwoData.data.userName) ? '' : contextValue.state.PageTwoData.data.userName + 'Wp'}
                          type='text'
                          name='userName'
                          id='userName'
                          placeholder='User Name'
                          disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col className='col-4'>
                      <FormGroup className={`has-label ${this.state.developerEmailInput.className}`}>
                        <Label for='developerEmail'>Developer Email</Label>
                        <Input
                          type='email'
                          name='developerEmail'
                          id='developerEmail'
                          placeholder='User Name'
                          onChange={(e) => this.setState(ValidatorFormChange(e, 'developerEmail'))}
                        />
                        {this.state.developerEmailInput.error &&
                          <label className='error'>
                            {this.state.developerEmailInput.labelError}
                          </label>}
                      </FormGroup>
                    </Col>
                    <Col className='col-4'>
                      <FormGroup className={`has-label ${this.state.topicInput.className}`}>
                        <Label for='topic'>Topic</Label>
                        <Input
                          type='text'
                          name='topic'
                          id='topic'
                          placeholder='topic'
                          onChange={(e) => this.setState(ValidatorFormChange(e, 'topic'))}
                        />
                        {this.state.topicInput.error &&
                          <label className='error'>
                            {this.state.topicInput.labelError}
                          </label>}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className='col-4'>
                      <UncontrolledTooltip className='Tooltip_wizard' placement='top' target='passwordPageThree' delay={0}>
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
                      <UncontrolledTooltip className='Tooltip_wizard' placement='top' target='exclamation' delay={0}>
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
                            <InputGroupText id='exclamation'>
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
                            id='passwordPageThree'
                            placeholder='password'
                            onChange={e => this.setState(ValidatorFormChange(e, 'password', this.state.confirmPasswordInput.value))}

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
                    <Col className='col-4'>
                      <FormGroup className={`has-label ${this.state.confirmPasswordInput.className}`}>
                        <Label for='confirmPasswor'>Confirm Passwor</Label>
                        <Input
                          value={this.state.confirmPasswordInput.value}
                          type='password'
                          name='confirmPasswor'
                          id='confirmPasswor'
                          placeholder='Confirm Password'
                          onChange={e => this.setState(ValidatorFormChange(e, 'confirmPasswor', this.state.passwordInput.value))}
                        />
                        {this.state.confirmPasswordInput.error &&
                          <label className='error'>
                            {this.state.confirmPasswordInput.labelError}
                          </label>}
                      </FormGroup>
                    </Col>
                    <Col className='ccol-4'>
                      <FormGroup className={`has-label ${this.state.languageInput.className}`}>
                        <Label for='language'>Language</Label>
                        <Input
                          type='text'
                          name='language'
                          id='language'
                          placeholder='Language'
                          onChange={(e) => this.setState(ValidatorFormChange(e, 'language'))}
                        />
                        {this.state.languageInput.error &&
                          <label className='error'>
                            {this.state.languageInput.labelError}
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

export default PageThree
