import React, { useEffect } from 'react'
import { Row, Col } from 'reactstrap'
import imageSort from '../../utils/imageSort'

export default function SorterOptimizer (props) {
  useEffect(() => {
    if (props.files !== null) {
      imageSort(props.files, props.finalPath)
    }
  }, [props.files])

  return (
    <div>
      <Row>
        <Col xs='12'>
          <h3 className='mb-0'>Image sorting and optimization</h3>
        </Col>
      </Row>
    </div>
  )
}
