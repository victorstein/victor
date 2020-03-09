import React, { useState } from 'react'
import {
  Row, Col, Button,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Form
} from 'reactstrap'
import Select from 'react-select'
import useForm from './useForm'
import schema from './schemaForm'

const FormModal = (props) => {
  const [selectRole, setSelectRole] = useState(null)

  const {
    values,
    handleChange,
    handleBlur,
    errors,
    handleSubmit,
    classNames
  } = useForm(props.submitForm, props.defaultValue, schema)

  console.log('props.defaultValue', props.defaultValue)

  return (
    <div>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup className={`has-label ${(classNames.name) ? classNames.name : (values.name === '') ? '' : 'has-success'}`}>
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
          <FormGroup className='has-label'>
            <Label for='selectRole'>Select Role</Label>
            <Select
              className='react-select info'
              classNamePrefix='react-select'
              placeholder='Choose City'
              name='multipleSelect'
              closeMenuOnSelect={false}
              isMulti
              value={selectRole}
              onChange={value => setSelectRole(value)}
              options={[
                { value: '2', label: 'Paris ' },
                { value: '3', label: 'Bucharest' },
                { value: '4', label: 'Rome' },
                { value: '5', label: 'New York' }
              ]}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
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
              className='w-100'
              color={(props.STORE.state.idRole === null) ? 'info' : 'success'}
            >
              {
                // (reqUpdateUser.loading)
                //   ? (
                //     <ClipLoader
                //       color='#4A90E2'
                //       size={20}
                //       loading
                //     />
                //   )
                //   : 'Update'
                (props.STORE.state.idRole === null) ? 'Agregate' : 'Update'
              }
            </Button>
          </Col>
        </Row>
      </ModalFooter>
    </div>
  )
}

export default FormModal
