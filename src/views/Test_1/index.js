import React, { useState } from 'react'
// reactstrap components
import {
  Card,
  CardBody,
  Row,
  Col,
  FormGroup,
  Label,
  Input
} from 'reactstrap'

import CodeEditor from '../../components/CodeEditor'

const Test1 = () => {
  const [typeEditor, setTypeEditor] = useState('raw')
  const [valueCode, setValueCode] = useState('')
  const changeTypeRadio = value => {
    setTypeEditor(value)
  }
  const setNewValue = value => {
    setValueCode(value)
  }
  return (
    <Card className='card-stats'>
      <CardBody>
        <Row>
          <Col xs='12'>
            <FormGroup check inline className='form-check-radio mb-3'>
              <Label className='form-check-label'>
                <Input
                  type='radio'
                  name='exampleRadios1'
                  id='exampleRadios11'
                  value='raw'
                  onClick={() => changeTypeRadio('raw')}
                  defaultChecked
                />
                Raw
                <span className='form-check-sign'></span>
              </Label>
            </FormGroup>
            <FormGroup check inline className='form-check-radio'>
              <Label className='form-check-label'>
                <Input
                  type='radio'
                  name='exampleRadios1'
                  id='exampleRadios12'
                  value='editor'
                  onClick={() => changeTypeRadio('editor')}
                />
                Code Editor
                <span className='form-check-sign'></span>
              </Label>
            </FormGroup>
            {typeEditor === 'raw' ? (
              <Input
                type='textarea'
                rows='30'
                name='exampleRadios122'
                value={valueCode}
                onChange={e => setValueCode(e.target.value)}
                id='exampleRadios1222'
              />
            ) : (
              <CodeEditor code={valueCode} lenguaje='xml' setChange={setNewValue} />
            )}
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default Test1
