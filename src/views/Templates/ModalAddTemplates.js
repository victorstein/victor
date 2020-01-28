import React, { useState } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap'
import { ValidatorFormChange } from './ValidationTemplates'
import './stylesTemplates.scss'

const ModalAddTemplates = (props) => {
  const [nameInput, setNameInput] = useState({
    className: '',
    value: '',
    error: false,
    labelError: ''
  })

  const [descriptionInput, setDescriptionInput] = useState({
    className: '',
    value: '',
    error: false,
    labelError: ''
  })

  const [pageInput, setPageInput] = useState({
    className: '',
    value: '',
    error: false,
    labelError: ''
  })
  return (
    <div className='templateForm'>

      <Modal style={{ marginTop: '64px' }} isOpen={props.openModal}>
        <ModalHeader>
          <div className='modal-header'>
            <button
              type='button'
              className='close p-0'
              data-dismiss='modal'
              aria-label='Close'
              onClick={(e) => props.setOpenModal(false)}
            >
              <i className='tim-icons icon-simple-remove' />
            </button>
            <h3 className='modal-title'>Edit Templates</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <Form className='iccon'>
            <FormGroup className={`has-label ${nameInput.className}`}>
              <Label for='exampleEmail'>Name Template</Label>
              <Input
                type='email'
                name='email'
                id='exampleEmail'
                placeholder='Name Template'
                onChange={e => ValidatorFormChange(e.target.value, nameInput, setNameInput, 'nameTemplate')}
              />
              {nameInput.error &&
                <label className='error'>
                  {nameInput.labelError}
                </label>}
            </FormGroup>

            <FormGroup className={`has-label ${descriptionInput.className}`}>
              <Label for='exampleEmail'>Name Template</Label>
              <Input
                type='email'
                name='email'
                id='exampleEmail'
                placeholder='Name Template'
                onChange={e => ValidatorFormChange(e.target.value, descriptionInput, setDescriptionInput, 'descriptionTemplate')}
              />
              {descriptionInput.error &&
                <label className='error'>
                  {descriptionInput.labelError}
                </label>}
            </FormGroup>

          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color='secondary' onClick={(e) => props.setOpenModal(false)}>
          Close
          </Button>
          <Button color='primary'>
          Save changes
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default ModalAddTemplates
