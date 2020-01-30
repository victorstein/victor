import React, { useContext, useEffect } from 'react'
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
      /*dispatch({

      })*/
      
      dispatch({
        type: SET_BLOCK_SCREEN, payload: { active: true, type: 'login' }
      })
      
      console.log(data)
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

const TemporalLogin = () => {

  const submitFormLogin = e => {
    e.preventDefault()
  }

  return (
    <div class='wTemporalLogin bg-white mx-auto'>
      <div className='loginForm'>
        <Card>
          <CardHeader>
            <CardTitle tag='h4' className='text-center'>
              Login
            </CardTitle>
          </CardHeader>
          <CardBody>
            <form onSubmit={submitFormLogin}>
              <FormGroup className={'has-label'}>
                <Label for='exampleEmail'>Email address</Label>
                <Input
                  type='email'
                  name='email'
                  id='exampleEmail'
                  placeholder='Enter email'
                />
              </FormGroup>
              <FormGroup className={'has-label'}>
                <Label for='examplePassword'>Password</Label>
                <Input
                  type='password'
                  name='password'
                  id='examplePassword'
                  placeholder='Password'
                  autoComplete='off'
                />
              </FormGroup>
              <CardFooter>
                <Button
                  className='w-100'
                  color='success'
                  type='submit'
                >
                    Login 
                </Button>
              </CardFooter>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default BlockScreen
