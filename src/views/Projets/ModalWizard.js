import React from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Col
} from 'reactstrap'
import ReactWizard from 'react-bootstrap-wizard'

import PageOne from './Wizard_pages/pageOne'
import PageTwo from './Wizard_pages/pageTwo'
import PageThree from './Wizard_pages/pageThree'

var steps = [
  {
    stepName: 'Create Account',
    stepIcon: 'tim-icons icon-single-02',
    component: PageOne
  },
  {
    stepName: 'Development Environment',
    stepIcon: 'tim-icons icon-badge',
    component: PageTwo
  },
  {
    stepName: 'WordPress installation',
    stepIcon: 'fab fa-wordpress',
    component: PageThree
  }
]
// btn-round btn-simple  onClick={(e) => this.props.setOpenModal(false)}

class ModalWizard extends React.Component {
  render () {
    return (
      <div className='templateForm'>
        <Modal style={{ marginTop: '64px' }} isOpen={this.props.openModal} size='lg'>
          <ModalHeader>
            <div className='modal-header '>
              <Button
                type='button'
                className='btn-round btn-simple'
                data-dismiss='modal'
                color='info'
                aria-label='Close'
                onClick={(e) => this.props.setOpenModal(false)}
              >
                <i className='tim-icons icon-simple-remove' />
              </Button>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className='content wizardProyect'>
              <Col className='mr-auto ml-auto' md='10'>
                <ReactWizard
                  steps={steps}
                  title='Create Proyect'
                  validate
                  description='lorem ipsum'
                  headerTextCenter
                  finishButtonClasses='btn-wd btn-info'
                  nextButtonClasses='btn-wd btn-info'
                  previousButtonClasses='btn-wd'
                  progressbar
                  color='blue'
                />
              </Col>
            </div>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default ModalWizard
