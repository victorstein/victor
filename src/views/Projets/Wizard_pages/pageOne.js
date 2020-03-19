import React from 'react'
import { Form, Row, Col, FormGroup, Label, Input, ModalFooter, Button } from 'reactstrap'
import useForm from '../../../utils/useFormHooks/useForm'
import schema from './ValidationFormSchema'

const PageOne = (props) => {
  const defaultValueForm = {
    nameAccount: '',
    domainURL: '',
    projectsName: '',
    projectOwner: '',
    seller: '',
    developerName: ''
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
    // handleChangeReactSelect,
    // handleBlurReactSelect
  } = useForm(submitForm, defaultValueForm, schema.schemaPageOne)
  return (
    <div className='pt-4'>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col className='col-4'>
            <FormGroup className={` has-label  ${(classNames.nameAccount) ? classNames.nameAccount : (values.nameAccount === '') ? '' : 'has-success'}`}>
              <Label for='nameAccount'>Name Account</Label>
              <Input
                type='text'
                className='iccon'
                name='nameAccount'
                id='nameAccount'
                placeholder='Name Account'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.nameAccount || ''}
              />
              {
                errors.nameAccount && (
                  <label className='error'>
                    {errors.nameAccount}
                  </label>
                )
              }
            </FormGroup>
          </Col>
          <Col className='col-4'>
            <FormGroup className={`has-label  ${(classNames.domainURL) ? classNames.domainURL : (values.domainURL === '') ? '' : 'has-success'}`}>
              <Label for='domainURL'>Domain url</Label>
              <Input
                type='text'
                name='domainURL'
                id='domainURL'
                placeholder='Domain url'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.domainURL || ''}
              />
              {
                errors.domainURL && (
                  <label className='error'>
                    {errors.domainURL}
                  </label>
                )
              }
            </FormGroup>
          </Col>
          <Col className='col-4'>
            <FormGroup className={`has-label  ${(classNames.projectsName) ? classNames.projectsName : (values.projectsName === '') ? '' : 'has-success'}`}>
              <Label for='projectsName'>Project's Name</Label>
              <Input
                type='text'
                name='projectsName'
                id='projectsName'
                placeholder={'Projec\'ts Name'}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.projectsName || ''}
              />
              {
                errors.projectsName && (
                  <label className='error'>
                    {errors.projectsName}
                  </label>
                )
              }
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col className='col-4'>
            <FormGroup className={`has-label  ${(classNames.projectOwner) ? classNames.projectOwner : (values.projectOwner === '') ? '' : 'has-success'}`}>
              <Label for='projectOwner'>Project Owner</Label>
              <Input
                type='text'
                name='projectOwner'
                id='projectOwner'
                placeholder='Project Owner'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.projectOwner || ''}
              />
              {
                errors.projectOwner && (
                  <label className='error'>
                    {errors.projectOwner}
                  </label>
                )
              }
            </FormGroup>
          </Col>
          <Col className='col-4'>
            <FormGroup className={`has-label  ${(classNames.seller) ? classNames.seller : (values.seller === '') ? '' : 'has-success'}`}>
              <Label for='projectOwner'>Seller</Label>
              <Input
                type='text'
                name='seller'
                id='seller'
                placeholder='Seller'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.seller || ''}
              />
              {
                errors.seller && (
                  <label className='error'>
                    {errors.seller}
                  </label>
                )
              }
            </FormGroup>
          </Col>
          <Col className='col-4'>
            <FormGroup className={`has-label  ${(classNames.developerName) ? classNames.developerName : (values.developerName === '') ? '' : 'has-success'}`}>
              <Label for='developerName'>Dveloper Name</Label>
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
        </Row>
        <ModalFooter>
          <Row className='w-100 d-flex justify-content-center'>
            {
            //  <Col className='col-6 pt-2'>
            //   <Button
            //     type='submit'
            //     className='w-100'
            //     color='success'
            //     onClick={(e) => {
            //       e.preventDefault()
            //       props.previousStep()
            //     }}
            //   >
            //     Back
            //   </Button>
            // </Col>
            }

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
