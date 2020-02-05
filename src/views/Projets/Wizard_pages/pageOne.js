import React, { Component } from 'react'
import {
  FormGroup,
  Label,
  Input,
  Row,
  Col
} from 'reactstrap'
import UserContext, { UserConsumer } from '../ModalWizardProvider'

class PageOne extends Component {
  static contextType = UserContext
  constructor(props) {
    super(props)
    this.state = {
      nameAccountInput: {
        className: '',
        value: '',
        error: false,
        labelError: ''
      },
      domainURLInput: {
        className: '',
        value: '',
        error: false,
        labelError: ''
      },
      projectsNameInput: {
        className: '',
        value: '',
        error: false,
        labelError: ''
      },
      projectOwnerInput: {
        className: '',
        value: '',
        error: false,
        labelError: ''
      },
      sellerInput: {
        className: '',
        value: '',
        error: false,
        labelError: ''
      },
      developerNameInput: {
        className: '',
        value: '',
        error: false,
        labelError: ''
      }
    }
  }

  isValidated() {
    const {
      nameAccountInput,
      domainURLInput,
      projectsNameInput,
      projectOwnerInput,
      sellerInput,
      developerNameInput
    } = this.state
    if (
      nameAccountInput.className === 'has-success' &&
      domainURLInput.className === 'has-success' &&
      projectsNameInput.className === 'has-success' &&
      projectOwnerInput.className === 'has-success' &&
      sellerInput.className === 'has-success' &&
      developerNameInput.className === 'has-success'
    ) {
      const { setState } = this.context
      const dataPage = {
        nameAccount: this.state.nameAccountInput.value,
        domainURL: this.state.domainURLInput.value,
        projectsName: this.state.projectsNameInput.value,
        projectOwner: this.state.projectOwnerInput.value,
        seller: this.state.sellerInput.value,
        developerName: this.state.developerNameInput.value
      }
      setState({
        PageOneData: {
          data: { ...dataPage },
          complete: true
        }
      })
      return true
    } else {
      if (nameAccountInput.className !== 'has-success') {
        this.setState({
          nameAccountInput: {
            labelError: 'Name is required',
            error: true,
            value: nameAccountInput.value,
            className: 'has-danger'
          }
        })
      }
      if (domainURLInput.className !== 'has-success') {
        this.setState({
          domainURLInput: {
            labelError: 'Domain is required',
            error: true,
            value: domainURLInput.value,
            className: 'has-danger'
          }
        })
      }
      if (projectsNameInput.className !== 'has-success') {
        this.setState({
          projectsNameInput: {
            labelError: 'project name is required',
            error: true,
            value: projectsNameInput.value,
            className: 'has-danger'
          }
        })
      }
      if (projectOwnerInput.className !== 'has-success') {
        this.setState({
          projectOwnerInput: {
            labelError: 'project Owner is required',
            error: true,
            value: projectOwnerInput.value,
            className: 'has-danger'
          }
        })
      }
      if (sellerInput.className !== 'has-success') {
        this.setState({
          sellerInput: {
            labelError: 'Seller Name is required',
            error: true,
            value: sellerInput.value,
            className: 'has-danger'
          }
        })
      }
      if (developerNameInput.className !== 'has-success') {
        this.setState({
          developerNameInput: {
            labelError: 'Developer Name is required',
            error: true,
            value: developerNameInput.value,
            className: 'has-danger'
          }
        })
      }
      return false
    }
  }

  render() {
    const ValidatorFormChange = (event, nameInput) => {
      const { value } = event.target
      switch (nameInput) {
        case 'developerName':
          if (!value) {
            this.setState({
              developerNameInput: {
                labelError: 'Developer Name is required',
                error: true,
                value: value,
                className: 'has-danger'
              }
            })
          } else {
            this.setState({
              developerNameInput: {
                labelError: '',
                error: false,
                value: value,
                className: 'has-success'
              }
            })
          }
          break
        case 'nameAccount':
          if (!value) {
            this.setState({
              nameAccountInput: {
                labelError: 'Name is required',
                error: true,
                value: value,
                className: 'has-danger'
              }
            })
          } else {
            this.setState({
              nameAccountInput: {
                labelError: '',
                error: false,
                value: value,
                className: 'has-success'
              }
            })
          }
          break
        case 'domainURL':
          if (!value) {
            this.setState({
              domainURLInput: {
                labelError: 'Domin is required',
                error: true,
                value: value,
                className: 'has-danger'
              }
            })
          } else {
            if (value.includes(' ')) {
              this.setState({
                domainURLInput: {
                  labelError: 'Domain Url cannot contain space',
                  error: true,
                  value: value,
                  className: 'has-danger'
                }
              })
            } else {
              this.setState({
                domainURLInput: {
                  labelError: '',
                  error: false,
                  value: value,
                  className: 'has-success'
                }
              })
            }

          }
          break
        case 'projectsName':
          if (!value) {
            this.setState({
              projectsNameInput: {
                labelError: 'project name is required',
                error: true,
                value: value,
                className: 'has-danger'
              }
            })
          } else {
            this.setState({
              projectsNameInput: {
                labelError: '',
                error: false,
                value: value,
                className: 'has-success'
              }
            })
          }
          break
        case 'projectOwner':
          if (!value) {
            this.setState({
              projectOwnerInput: {
                labelError: 'project Owner is required',
                error: true,
                value: value,
                className: 'has-danger'
              }
            })
          } else {
            this.setState({
              projectOwnerInput: {
                labelError: '',
                error: false,
                value: value,
                className: 'has-success'
              }
            })
          }
          break
        case 'seller':
          if (!value) {
            this.setState({
              sellerInput: {
                labelError: 'Seller Name is required',
                error: true,
                value: value,
                className: 'has-danger'
              }
            })
          } else {
            this.setState({
              sellerInput: {
                labelError: '',
                error: false,
                value: value,
                className: 'has-success'
              }
            })
          }
          break
        default: break
      }
    }

    return (
      <UserConsumer>
        {
          (contextValue) => {
            return (
              <div className='container'>
                <form>
                  <Row>
                    <Col className='col-4'>
                      <FormGroup className={`has-label ${this.state.nameAccountInput.className}`}>
                        <Label for='nameAccount'>Name Account</Label>
                        <Input
                          type='text'
                          name='nameAccount'
                          id='nameAccount'
                          placeholder='Name Account'
                          onChange={e => ValidatorFormChange(e, 'nameAccount')}
                        />
                        {this.state.nameAccountInput.error &&
                          <label className='error'>
                            {this.state.nameAccountInput.labelError}
                          </label>}
                      </FormGroup>
                    </Col>
                    <Col className='col-4'>
                      <FormGroup className={`has-label ${this.state.domainURLInput.className}`}>
                        <Label for='domainURL'>Domain url</Label>
                        <Input
                          type='text'
                          name='domainURL'
                          id='domainURL'
                          placeholder='Domain url'
                          onChange={e => {
                            //console.log(e.target.value.includes(' '))
                            ValidatorFormChange(e, 'domainURL')
                          }}
                        />
                        {this.state.domainURLInput.error &&
                          <label className='error'>
                            {this.state.domainURLInput.labelError}
                          </label>}
                      </FormGroup>
                    </Col>
                    <Col className='col-4'>
                      <FormGroup className={`has-label ${this.state.projectsNameInput.className}`}>
                        <Label for='projectsName'>Project's Name</Label>
                        <Input
                          type='text'
                          name='projectsName'
                          id='projectsName'
                          placeholder={'Projec\'ts Name'}
                          onChange={e => ValidatorFormChange(e, 'projectsName')}
                        />
                        {this.state.projectsNameInput.error &&
                          <label className='error'>
                            {this.state.projectsNameInput.labelError}
                          </label>}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className='col-4'>
                      <FormGroup className={`has-label ${this.state.projectOwnerInput.className}`}>
                        <Label for='projectOwner'>Project Owner</Label>
                        <Input
                          type='text'
                          name='projectOwner'
                          id='projectOwner'
                          placeholder='Project Owner'
                          onChange={e => ValidatorFormChange(e, 'projectOwner')}
                        />
                        {this.state.projectOwnerInput.error &&
                          <label className='error'>
                            {this.state.projectOwnerInput.labelError}
                          </label>}
                      </FormGroup>
                    </Col>
                    <Col className='col-4'>
                      <FormGroup className={`has-label ${this.state.sellerInput.className}`}>
                        <Label for='projectOwner'>Seller</Label>
                        <Input
                          type='text'
                          name='seller'
                          id='seller'
                          placeholder='Seller'
                          onChange={e => ValidatorFormChange(e, 'seller')}
                        />
                        {this.state.sellerInput.error &&
                          <label className='error'>
                            {this.state.sellerInput.labelError}
                          </label>}
                      </FormGroup>
                    </Col>
                    <Col className='col-4'>
                      <FormGroup className={`has-label ${this.state.developerNameInput.className}`}>
                        <Label for='developerName'>Dveloper Name</Label>
                        <Input
                          type='text'
                          name='developerName'
                          id='developerName'
                          placeholder='Developer Name'
                          onChange={e => ValidatorFormChange(e, 'developerName')}
                        />
                        {this.state.developerNameInput.error &&
                          <label className='error'>
                            {this.state.developerNameInput.labelError}
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

export default PageOne
