import React, { useState, useContext } from 'react'
import {GlobalContext} from '../../index'
import {SET_BLOCK_SCREEN} from '../../store/actions'
// reactstrap components
import {
  Card,
  CardBody,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap'
import gql from 'graphql-tag'
import { useLazyQuery } from '@apollo/react-hooks'
import CodeEditor from '../../components/CodeEditor'
import EasyBlock from '../../components/BlockScreen/EasyBlock'

const GET_DOG_PHOTO = gql`
  query permissions{
    permissions{
      total
    }
  }
`

const GET_DOG_PHOTO2 = gql`
query roles {
  roles {
    total
  }
}`

const Test1 = () => {
  const {state,dispatch} = useContext(GlobalContext)
  const [getDog, { loading, data }] = useLazyQuery(GET_DOG_PHOTO, { fetchPolicy: 'no-cache' })
  const [getDog2, dataGetDog2] = useLazyQuery(GET_DOG_PHOTO2, { fetchPolicy: 'no-cache' })
  const [typeEditor, setTypeEditor] = useState('raw')
  const [valueCode, setValueCode] = useState('')
  const [isBlock, setIsBlock] = useState(false)
  const [count, setCount] = useState(0)
  const changeTypeRadio = value => {
    setTypeEditor(value)

    console.log('changeTypeRadio')
    
    /*if(count==1) {
      localStorage.clear()
      dispatch({
        type: SET_BLOCK_SCREEN,
        payload: { active: true, type: 'login' }
      })
    } else {
      getDog()
    }*/
    getDog()
    setCount(count+1)
    //getDog()
    /*setIsBlock(true)
    setTimeout( () => {
      setIsBlock(false)
    }, 7000)*/  

  }

  const setNewValue = value => {
    setValueCode(value)
  }

  const clickButton = () => {
    getDog2()
  }

  return (
    <Card className='card-stats'>
     <EasyBlock isBlock={isBlock} />
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
        <Row>
              <Col>
                <Button onClick={ () => clickButton() }> OTHER </Button>
              </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default Test1
