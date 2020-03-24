import React, { useState } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap'

import StepWizard from 'react-step-wizard'
import Stepper from 'react-stepper-horizontal'

import PageOne from './Wizard_pages/pageOne'
import PageTwo from './Wizard_pages/pageTwo'
// import PageThree from './Wizard_pages/pageThree'

// isOpen={this.props.openModal}

const Nav = (props) => {
  // console.log('propsNav', props)
  return (
    <Stepper
      activeColor='#1d8cf8'
      defaultTitleColor='#FFFFFF'
      activeTitleColor='#FFFFFF'
      completeTitleColor='#FFFFF'
      completeColor='#1d8cf8'
      defaultColor='#525f7f'
      // circleFontColor='#1d8cf8'
      lineMarginOffset={6}
      steps={[
        {
          title: 'Create Account'
          // icon: (
          //   <i className='tim-icons icon-single-02' />
          // )
        },
        { title: 'WordPress installation' }
      ]}
      activeStep={props.currentStep - 1}
    />
  )
}

const ModalWizard = (props) => {
  const [dataForm, setDataForm] = useState({
    PageOne: {}
  })
  const [loading, setloading] = useState(false)
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
              disabled={loading}
              onClick={(e) => { props.setOpenModal(false) }}
            >
              <i style={{ fontSize: '24px' }} className='tim-icons icon-simple-remove' />
            </Button>
          </div>
        </ModalHeader>
        <ModalBody>
          <StepWizard
            nav={<Nav />}
            transitions={{
              enterRight: 'fadeIn',
              enterLeft: 'fadeIn',
              exitRight: 'fadeInDown',
              exitLeft: 'fadeInDown'
            }}
          >
            <PageOne actionsAlertGloval={props.actionsAlertGloval} dataForm={dataForm} setDataForm={setDataForm} hashKey='PageOne' />
            <PageTwo
              actionsAlertGloval={props.actionsAlertGloval}
              dataForm={dataForm}
              hashKey='PageTwo'
              setloading={setloading}
              setOpenModal={props.setOpenModal}
            />
            {
              // <PageThree dataForm={dataForm} setDataForm={setDataForm} hashKey='PageThree' />
            }

          </StepWizard>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default ModalWizard
