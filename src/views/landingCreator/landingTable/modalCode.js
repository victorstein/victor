import React, { useState, useContext } from 'react'
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Nav,
  TabContent, 
  TabPane
} from 'reactstrap'
import CodeEditor from '../../../components/CodeEditor'
import { LandingContext } from '../index'

import './styles.css'

const ModalLanding = ({ closeModal }) => {
    const {
        dragListObject,
        listFinalLandingCreator
      } = useContext(LandingContext)
      const [activeTab, setActiveTab] = useState('1')

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab)
  }
  return (
    <Modal size='lg' isOpen toggle={closeModal} backdrop={false} zIndex={9999} centered style={{ width: '80%', height: '800px' }}>
        <Button className='ml-5 mr-5 d-block' onClick={()=>toggle('1')}>dragListObject</Button>
        <Button className='ml-5 mr-5 d-block' color='warning' onClick={()=>toggle('2')}>listFinalLandingCreator</Button>
        {
            (activeTab === '1') ?
            <CodeEditor  height='600' showFormat={false} code={JSON.stringify(dragListObject)} lenguaje='json' />
            :
            <CodeEditor  height='600' showFormat={false} code={JSON.stringify(listFinalLandingCreator)} lenguaje='json' />
        }
    </Modal>
  )
}


export default ModalLanding
