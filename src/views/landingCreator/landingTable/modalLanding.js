import React, { useState, useContext } from 'react'
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input
} from 'reactstrap'
import { LandingContext } from '../index'
import { randomId } from '../utils'

import './styles.css'

const useInput = initialValue => {
  const [value, setValue] = useState(initialValue)
  const [className, setClassName] = useState('')
  const [error, setError] = useState(false)
  const [firstOnBlur, setFirstOnBlur] = useState(false)

  const getClassName = (value, forceOnBlur = false) => {
    return inputValidation(value, forceOnBlur)
  }

  const inputValidation = value => {
    if (!value) {
      setError('Input name is required')
      setClassName('has-danger')
    } else {
      setError(null)
      setClassName('has-success')
    }
  }

  const onBlurInput = e => {
    setFirstOnBlur(true)
    const forceOnBlur = true
    getClassName(value, forceOnBlur)
  }

  return {
    value,
    setValue,
    reset: () => setValue(''),
    error: error,
    bind: {
      onBlur: e => onBlurInput(e),
      value,
      className: className,
      onChange: event => {
        getClassName(event.target.value)
        setValue(event.target.value)
      }
    }
  }
}

const ModalLanding = ({ closeModal, isNewLanding, landingEditing = null }) => {

  const {
    addNewLanding,
    editLanding
  } = useContext(LandingContext)

  const modalTitle = isNewLanding ? 'Add new landing' : 'Edit Landing'
  const modalIcon = isNewLanding
    ? 'tim-icons icon-simple-add'
    : 'tim-icons icon-pencil'
  const name = (isNewLanding || landingEditing === null) ? '' : landingEditing.title

  const {
    value: valueLanding,
    bind: bindLanding,
    error: errorLanding
  } = useInput(name)

  const submitForm = (e) => {
    e.preventDefault()
    if(isNewLanding) {  
        addNewLanding({
          id: randomId(),
          title: valueLanding,
          composer: []
        })
    } else {
        editLanding(landingEditing.id, {
          id: landingEditing.id,
          title: valueLanding,
          composer: (landingEditing.composer) ? landingEditing.composer : []
        })
    }
    closeModal()
  }

  return (
    <Modal isOpen toggle={closeModal} backdrop={false} zIndex={9999} centered>
      <div className='modal-header'>
        <button
          type='button'
          className='close'
          data-dismiss='modal'
          aria-label='Close'
          onClick={closeModal}
        >
          <i className='tim-icons icon-simple-remove'></i>
        </button>
        <h5 className='modal-title'>
          <i className={modalIcon + ' mr-2 '}></i>
          {modalTitle}
        </h5>
      </div>
      <form onSubmit={submitForm}>
        <ModalBody>
          <FormGroup className={`inputNameLanding has-label ${bindLanding.className}`}>
            <Label for='exampleEmail' className='text-white'>Landing Name</Label>
            <Input
              type='text'
              name='landingName'
              id='landingName'
              placeholder='Enter landing name'
              style={{ color: 'black !important' }}
              {...bindLanding}
            />
            {errorLanding && <label className='error'>{errorLanding}</label>}
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color='secondary' onClick={closeModal}>
            Close
          </Button>
          <Button color='primary' type='submit'
            disabled={!valueLanding || errorLanding}
          >Guardar</Button>
        </ModalFooter>
      </form>
    </Modal>
  )
}


export default ModalLanding
