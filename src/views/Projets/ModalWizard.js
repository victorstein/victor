import React from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap'
import StepWizard from 'react-step-wizard'

import PageOne from './Wizard_pages/pageOne'
import PageTwo from './Wizard_pages/pageTwo'

// isOpen={this.props.openModal}

const ModalWizard = (props) => {
  return (
    <div className='templateForm'>
      <Modal style={{ marginTop: '64px' }} isOpen={props.openModal} size='lg'>
        <ModalHeader>
          <div className='modal-header '>
            <h3>
              Create Project
            </h3>
            <Button
              type='button'
              className='btn-round btn-simple'
              data-dismiss='modal'
              style={{ border: 'none' }}
              color='info'
              aria-label='Close'
              onClick={(e) => { props.setOpenModal(false) }}
            >
              <i style={{ fontSize: '24px' }} className='tim-icons icon-simple-remove' />
            </Button>
          </div>
        </ModalHeader>
        <ModalBody>
          <StepWizard
            transitions={{
              enterRight: 'fadeIn',
              enterLeft: 'fadeIn',
              exitRight: 'fadeInDown',
              exitLeft: 'fadeInDown'
            }}
          >
            <PageOne hashKey='PageOne' />
            <PageTwo hashKey='PageTwo' />
          </StepWizard>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default ModalWizard
