import React, { useState, useEffect } from 'react'
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
import Select from 'react-select'
import { passwordGenerator } from '../../../utils/PasswordGenerator'
// import { nameGenerator } from '../../../utils/nameGenerator'
import useForm from '../../../utils/useFormHooks/useForm'
import schema from './ValidationFormSchema'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { ClipLoader } from 'react-spinners'

const createProject = gql`
  mutation createProject(
 $siteName: String!
 $domain: String!
 $accountUsername: String!
 $developerName: String!
 $theme: String!
 $accountPassword: String!
 $wordpressLanguage: wordpressLanguage!
 $wordpressPassword: String!
){
  createProject(
   siteName: $siteName
   domain: $domain
   accountUsername: $accountUsername
   developerName: $developerName
   theme: $theme
   accountPassword: $accountPassword
   wordpressLanguage: $wordpressLanguage
   wordpressPassword: $wordpressPassword
  ){
    id
    domain
  }
}
`

const PageTwo = (props) => {
  const [activeInput, setActiveInput] = useState({
    passwordWordpress: false
  })

  const defaultValueForm = {
    passwordWordpress: '',
    confirmPasswordWordpress: '',
    language: 'EN',
    theme: 'Total'
  }

  const [createProjectMutations, { error, loading }] = useMutation(createProject, {
    refetchQueries: ['projects'], awaitRefetchQueries: true
  })

  const submitForm = async () => {
    const { PageOne } = props.dataForm
    try {
      const FinalData = {
        siteName: PageOne.siteName,
        domain: PageOne.domainURL + '.bytfm.com',
        accountUsername: PageOne.accountName.toLowerCase(),
        developerName: PageOne.developerName,
        theme: values.theme,
        accountPassword: PageOne.password,
        wordpressLanguage: values.language,
        wordpressPassword: values.passwordWordpress
      }
      await createProjectMutations({ variables: { ...FinalData } })
      props.setOpenModal(false)
      props.actionsAlertGloval({
        message: 'Create New Project Successfully',
        options: {
          icon: 'icon-bulb-63',
          type: 'info',
          autoDismiss: 4,
          place: 'tr'
        }
      })
      return null
    } catch (e) {
      console.log(e)
    }
    // console.log('FinalData', { FinalData: { PageOne: { ...PageOne, accountName: PageOne.accountName.toLowerCase() }, PageTwo: values } })
  }

  useEffect(() => {
    let messageError = ''
    if (error) {
      if (Array.isArray(error.graphQLErrors)) {
        messageError = error.graphQLErrors[0].message
      } else {
        messageError = error.graphQLErrors
      }
      console.log('messageError', error.graphQLErrors)
      const options = {
        message: (Array.isArray(messageError)) ? messageError[0] : messageError,
        options: {
          icon: 'icon-alert-circle-exc',
          type: 'danger',
          autoDismiss: 4,
          place: 'tr'
        }
      }
      props.actionsAlertGloval(options)
    }
    if (loading) {
      props.setloading(loading)
    }
  }, [error, loading])

  const {
    values,
    handleChange,
    handleBlur,
    errors,
    handleSubmit,
    classNames,
    handleChangeReactSelect,
    handleBlurReactSelect,
    setEspecificValue
  } = useForm(submitForm, defaultValueForm, schema.schemaPageTwo)

  // console.log(props.dataForm)

  return (
    <div className='pt-4'>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col className='col-6'>
            <div className='selectPermissions'>
              <FormGroup className={` has-label  ${(classNames.theme) ? classNames.theme : (values.theme === '') ? '' : 'has-success'}`}>
                <Label for='language'>Theme</Label>
                <Select
                  className={`react-select ${(classNames.theme) ? 'danger' : (values.theme === []) ? 'info' : 'success'}`}
                  classNamePrefix='react-select'
                  name='theme'
                  id='theme'
                  defaultValue={{ value: 'Total', label: 'Total' }}
                  onChange={handleChangeReactSelect}
                  onBlur={handleBlurReactSelect}
                  options={[
                    { value: 'Total', label: 'Total' }
                  ]}
                  placeholder='Theme'
                />
                {
                  errors.theme && (
                    <label className='error'>
                      {errors.theme}
                    </label>
                  )
                }
              </FormGroup>
            </div>
          </Col>
          <Col className='col-6'>
            <div className='selectPermissions'>
              <FormGroup className={` has-label  ${(classNames.language) ? classNames.language : (values.language === '') ? '' : 'has-success'}`}>
                <Label for='language'>Language</Label>
                <Select
                  className={`react-select ${(classNames.language) ? 'danger' : (values.language === []) ? 'info' : 'success'}`}
                  classNamePrefix='react-select'
                  name='language'
                  id='language'
                  defaultValue={{ value: 'EN', label: 'English' }}
                  onChange={handleChangeReactSelect}
                  onBlur={handleBlurReactSelect}
                  options={[
                    { value: 'EN', label: 'English' },
                    { value: 'ES', label: 'Spanish' }
                  ]}
                  placeholder='Language'
                />
                {
                  errors.language && (
                    <label className='error'>
                      {errors.language}
                    </label>
                  )
                }
              </FormGroup>
            </div>
          </Col>
          <Col className='col-6'>
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
            <UncontrolledTooltip className='Tooltip_wizard' placement='top' target='exclamation-circle' delay={0}>
              <div>
                <p className='pl-2'>click to generate password automatically.</p>
              </div>
            </UncontrolledTooltip>
            <div className='InputGroupVictor'>
              <Label style={{ color: 'rgba(255, 255, 255, 0.6)' }} for='passwordWordpress'>Password</Label>
              <InputGroup
                className={`
            text-left 
            has-label ${(classNames.passwordWordpress) ? classNames.passwordWordpress : (values.passwordWordpress === '') ? '' : 'has-success'}
            ${classnames({ 'input-group-focus': activeInput.passwordWordpress })}
            `}
              >
                <InputGroupAddon style={{ display: 'contents' }} addonType='prepend'>
                  <InputGroupText id='exclamation-circle'>
                    <i
                      onClick={async (e) => {
                        const newPassword = await passwordGenerator()
                        setEspecificValue(newPassword, 'passwordWordpress')
                        setEspecificValue(newPassword, 'confirmPasswordWordpress')
                      }}
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
          <Col className='col-6'>
            <FormGroup className={`has-label  ${(classNames.confirmPasswordWordpress) ? classNames.confirmPasswordWordpress : (values.confirmPasswordWordpress === '') ? '' : 'has-success'}`}>
              <Label for='confirmPasswordWordpress'>Confirm Password</Label>
              <Input
                type='password'
                name='confirmPasswordWordpress'
                id='confirmPasswordWordpress'
                placeholder='Confirm Password'
                onChange={handleChange}
                value={values.confirmPasswordWordpress || ''}
                onBlur={handleBlur}
              />
              {
                errors.confirmPasswordWordpress && (
                  <label className='col-12 error'>
                    {errors.confirmPasswordWordpress}
                  </label>
                )
              }
            </FormGroup>
          </Col>
        </Row>
        <ModalFooter>
          <div style={{ width: '33%' }} className='d-flex flex-row bd-highlight'>
            <Button
              className='w-100'
              color='primary'
              disabled={loading}
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
              disabled={loading}
            >
              {
                (loading) ? (
                  <ClipLoader
                    color='#FFFFFF'
                    size={20}
                    loading
                  />
                ) : 'Finish'
              }
            </Button>
          </div>
        </ModalFooter>
      </Form>
    </div>
  )
}

export default PageTwo
