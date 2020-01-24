import React from 'react'
import { Row, Col } from 'reactstrap'
import TableTemplates from './TableTemplates'

const TemplatesIndex = () => {
  return (
    <div className='content'>
      <Row>
        <Col xs='12'>
          <h1 className='mb-0'>Templates</h1>
        </Col>
      </Row>
      <div className='container p-2 m-2'>
        <TableTemplates />
      </div>
    </div>
  )
}

export default TemplatesIndex
