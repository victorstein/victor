import React, { useState } from 'react'
import { Row, Col } from 'reactstrap'
import TableProjects from './TableProjects'
import Modal from './ModalWizard'
import './stylesTemplates.scss'

const TemplatesIndex = (props) => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <div className='content'>
      <Modal openModal={openModal} setOpenModal={setOpenModal} />
      <Row>
        <Col xs='12'>
          <h1 className='mb-0'>Projects</h1>
        </Col>
        <Col className='col-12'>
          <div className='p-2 m-2 w-100'>
            <TableProjects setOpenModal={setOpenModal} />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default TemplatesIndex
