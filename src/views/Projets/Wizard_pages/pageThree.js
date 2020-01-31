import React from 'react'
import {
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  UncontrolledTooltip
} from 'reactstrap'
import { ValidatorFormChange } from './ValidationForm'

class PageThree extends React.Component {
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
    return true
  }

  render () {
    return (
      <div className='container'>
        <form>
          <Row>
            <Col className='col-4'>
              <FormGroup className={`has-label ${this.state.userNameInput.className}`}>
                <Label for='userName'>User Name</Label>
                <Input
                  type='text'
                  name='userName'
                  id='userName'
                  placeholder='User Name'
                  onChange={(e) => this.setState(ValidatorFormChange(e, 'userName'))}
                />
                {this.state.userNameInput.error &&
                  <label className='error'>
                    {this.state.userNameInput.labelError}
                  </label>}
              </FormGroup>
            </Col>
            <Col className='col-4'>
               1.2
            </Col>
            <Col className='ccol-4'>
               1.3
            </Col>
          </Row>
          <Row>
            <Col className='col-4'>
          2
            </Col>
            <Col className='col-4'>
          2.2
            </Col>
            <Col className='ccol-4'>
          2.3
            </Col>
          </Row>
        </form>
      </div>
    )
  }
}

export default PageThree
