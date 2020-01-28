import React, { useState } from 'react'
import { Row, Col } from 'reactstrap'
import TableTemplates from './TableTemplates'
import ModalAddTemplates from './ModalAddTemplates'

const TemplatesIndex = (props) => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <div className='content'>
      <ModalAddTemplates openModal={openModal} setOpenModal={setOpenModal} />
      <Row>
        <Col xs='12'>
          <h1 className='mb-0'>Templates</h1>
        </Col>
      </Row>
      <div className='container p-2 m-2'>
        <TableTemplates setOpenModal={setOpenModal} />
      </div>
    </div>
  )
}

export default TemplatesIndex
