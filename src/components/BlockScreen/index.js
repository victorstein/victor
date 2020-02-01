import React, { useContext, useEffect, useRef } from 'react'
import { GlobalContext } from '../../index'
import {SET_BLOCK_SCREEN} from '../../store/actions'
import mrEmitter from '../../utils/Emitter'
import {
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  CardFooter,
  Alert
} from 'reactstrap'
import BlockUi from 'react-block-ui'
import TemporalLogin from './TemporalLogin'
import 'react-block-ui/style.css'
import './styles.css'

// remove this subscription afterwards when there is no use for it
let Subscription = null

const BlockScreen = props => {

  const { state, dispatch } = useContext(GlobalContext)

  useEffect(() => {
    listenerBlock()
    return () => {
      Subscription.remove()
    }
  }, [])

  const listenerBlock = () => {
    Subscription = mrEmitter.addListener('refreshTokenExpired', (data) => {
      localStorage.clear()
      console.log('Subscription ')
      dispatch({
        type: SET_BLOCK_SCREEN, payload: { active: true, type: 'login' }
      })
    })
  }

  return (
    <div>
      <BlockUi tag='div' className={state.blockScreen.type === 'login' ? 'block-ui-container-login' : ''} blocking={state.blockScreen.active} loader={
        state.blockScreen.type === 'login' ? <TemporalLogin /> : <p>Loading...</p>
      }>
        {props.children}
      </BlockUi>
    </div>
  )
}

export default BlockScreen
