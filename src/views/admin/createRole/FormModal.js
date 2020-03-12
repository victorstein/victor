import React from 'react'
import {
  Row, Col, Button,
  ModalBody,
  FormGroup,
  Label,
  Input,
  Form
} from 'reactstrap'
import Select from 'react-select'
import useForm from './useForm'
import schema from './schemaForm'
import { ClipLoader } from 'react-spinners'

const FormModal = (props) => {
  const { name, permissions, arrayPermissions } = props.defaultValue
  const {
    values,
    handleChange,
    handleBlur,
    errors,
    handleSubmit,
    classNames,
    handleChangeReactSelect,
    handleBlurReactSelect
  } = useForm(props.submitForm, { name: name, permissions: arrayPermissions }, schema)

  // console.log('props.defaultValue', props.defaultValue)
  // console.log(props.allPermissions)

  const allPermissions = props.allPermissions.map(u => ({
    value: u.id,
    label: u.name
  }))

  const styles = {
    input: (base, state) => {
      return { ...base, color: 'white !important' }
    }
  }

  return (
    <div>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <div className='inputRole'>
            <FormGroup className={`has-label  ${(classNames.name) ? classNames.name : (values.name === '') ? '' : 'has-success'}`}>
              <Label for='roleName'>Name Role</Label>
              <Input
                type='text'
                name='name'
                id='name'
                placeholder='Name Role'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name || ''}
              />
              {
                errors.name && (
                  <label className='error'>
                    {errors.name}
                  </label>
                )
              }
            </FormGroup>
          </div>
          <div className='selectPermissions'>
            <FormGroup className={`has-label  ${(classNames.permissions) ? classNames.permissions : (values.permissions === '') ? '' : 'has-success'}`}>
              <Label for='selectRole'>Select Role</Label>
              <Select
                className={`react-select ${(classNames.permissions) ? 'danger' : (values.permissions === []) ? 'info' : 'success'}`}
                classNamePrefix='react-select'
                placeholder='Permissions'
                name='permissions'
                id='permissions'
                autoFocus={(classNames.permissions === 'has-danger')}
                closeMenuOnSelect={false}
                isMulti
                isDisabled={props.loadingPermissions && values}
                isLoading={props.loadingPermissions}
                styles={styles}
                defaultValue={permissions || null}
                onChange={(value) => {
                  const newArrayString = {
                    value: value.map((index) => (
                      index.value
                    ))
                  }
                  handleChangeReactSelect(newArrayString, 'permissions')
                }}
                onBlur={(target) => handleBlurReactSelect(target, 'permissions')}
                options={allPermissions}
                onInputChange={(e) => {
                  const inputValue = e.replace(/\W/g, '')
                  props.setVariables({
                    ...props.variables,
                    filters: inputValue
                  })
                }}
              />
              {
                errors.permissions && (
                  <label className='error'>
                    {errors.permissions}
                  </label>
                )
              }
            </FormGroup>
          </div>
          <div>
            <Row className='w-100'>
              <Col className='col-6 pt-2'>
                <Button
                  className='w-100'
                  color='danger'
                  // disabled={reqUpdateUser.loading}
                  onClick={(e) => {
                    props.setOpenModal(false)
                    props.STORE.setState({
                      idRole: null
                    })
                  }}
                >
                  Cancel
                </Button>
              </Col>
              <Col className='col-6 pt-2'>
                <Button
                  type='submit'
                  className='w-100'
                  color={(props.STORE.state.idRole === null) ? 'info' : 'success'}
                  disabled={props.loadingReqMutations.reqCreateRoleMutations}
                >
                  {
                    (props.loadingReqMutations.reqCreateRoleMutations)
                      ? (
                        <ClipLoader
                          color='#FFFFFF'
                          size={20}
                          loading
                        />
                      )
                      : (props.STORE.state.idRole === null) ? 'Agregate' : 'Update'
                  }
                </Button>
              </Col>
            </Row>
          </div>
        </Form>
      </ModalBody>
    </div>
  )
}

export default FormModal
