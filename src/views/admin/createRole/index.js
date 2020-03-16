import React, { useState, useRef, useEffect } from 'react'
import { Button, InputGroup, InputGroupAddon, InputGroupText, Input, Label } from 'reactstrap'
import CardRole from './CardRole'
import Row from 'reactstrap/lib/Row'
import Col from 'reactstrap/lib/Col'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import classnames from 'classnames'
import { BeatLoader } from 'react-spinners'
import ModalRole from './ModalRole'
import UseContex from './store'
import './StylesRole.scss'
import AlertGlobal from '../../../components/AlertGlobal'
import Lottie from 'react-lottie'
import animationEmptyBox from '../../../assets/lottie/emptyBox.json'
import animationServerError from '../../../assets/lottie/serverError.json'

const roles = gql`
  query roles(
    $perPage : Float!
    $page : Float!
    $filters : [roleFilter!]
){
  roles(
    perPage : $perPage
    page :  $page
    filters : $filters
  ){
    docs{
      id
      name
      permissions{
        id
        name
      }
    }
    total
    page
    perPage
    pages
  }
}
`

const CreateRole = (props) => {
  const myInputAlert = useRef()
  const [focusInput, setFocusInput] = useState({
    inputRoleName: {
      focus: false
    }
  })
  const [variables, setVariables] = useState({
    perPage: 25,
    page: 1,
    filters: []
  })

  const [openModal, setOpenModal] = useState(false)

  const [store, setStore] = useState({
    idRole: null
  })
  const [filtersValue, setFiltersValue] = useState({
    NAME: ''
  })

  const { loading, error, data } = useQuery(roles, { variables, fetchPolicy: 'no-cache' })

  const Contend = () => {
    if (loading) {
      return (
        <div style={{ height: '255px' }} className='d-flex align-items-center w-100 justify-content-center'>
          <BeatLoader
            color='#4A90E2'
            size={50}
            loading
          />
        </div>
      )
    }

    if (error) {
      const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationServerError,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      }
      return (
        <div className='d-flex justify-content-center p-2 m-2'>
          <Lottie
            isClickToPauseDisabled
            options={defaultOptions}
            height='40%'
            width='40%'
          />
        </div>
      )
    }

    if (data) {
      if (data.roles.docs.length === 0) {
        const defaultOptions = {
          loop: true,
          autoplay: true,
          animationData: animationEmptyBox,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
          }
        }

        return (
          <div className='d-flex justify-content-center p-2 m-2'>
            <Lottie
              isClickToPauseDisabled
              options={defaultOptions}
              height='40%'
              width='40%'
            />
          </div>
        )
      }

      return (
        <Row>
          {
            data.roles.docs.map((value, index) => (
              <Col className='col-4' key={index}>
                <CardRole setOpenModal={setOpenModal} rolaData={value} />
              </Col>
            ))
          }
        </Row>
      )
    }
  }

  useEffect(() => {
    if (error) {
      let messageError = ''
      if (Array.isArray(error.graphQLErrors)) {
        messageError = error.graphQLErrors[0].message
      } else {
        messageError = error.graphQLErrors
      }
      console.log('messageError', error.graphQLErrors)
      const options = {
        message: (Array.isArray(messageError)) ? messageError[0] : messageError,
        options: {
          icon: 'icon-alert-circle-exc',
          type: 'danger',
          autoDismiss: 4,
          place: 'tr'
        }
      }
      myInputAlert.current.showAlert(options)
    }

    if (data) {
      if (data.roles.docs.length === 0) {
        const options = {
          message: 'No Data',
          options: {
            icon: 'icon-bulb-63',
            type: 'info',
            autoDismiss: 4,
            place: 'tr'
          }
        }
        myInputAlert.current.showAlert(options)
      }
    }
  }, [error, data])

  useEffect(() => {
    const newFilter = []
    if (filtersValue.NAME) {
      newFilter.push({
        field: 'NAME',
        value: filtersValue.NAME
      })
    }
    setVariables({
      ...variables,
      filters: newFilter
    })
  }, [filtersValue])

  const actionsAlertGloval = (options) => {
    myInputAlert.current.showAlert(options)
  }

  return (
    <UseContex.Provider value={{
      state: store,
      actions: {
        AlertGloval: actionsAlertGloval
      },
      setState: (params) => {
        setStore(params)
      }
    }}
    >
      <AlertGlobal ref={myInputAlert} />
      <div className='w-100'>
        {
          (openModal) && <ModalRole openModal={openModal} setOpenModal={setOpenModal} />
        }
        <h1 className='mb-0'>Create Role</h1>
        <div className='p-2 m-2 w-100'>
          <Row>
            <Col className='col-2 d-flex align-items-center'>
              <Button
                onClick={(e) => {
                  setOpenModal(true)
                }}
                className='btn-simple'
                color='success'
              >
                <i className='fas fa-plus-circle mr-2' />
              Add Role
              </Button>
            </Col>
            <Col className='col-8'>
              <Label>
              Filter by Role Name
              </Label>
              <InputGroup
                size='sm'
                className={`max-whit text-left ${classnames({
            'input-group-focus': focusInput.inputRoleName.focus
          })}`}
              >
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText><i className='fas fa-search' /></InputGroupText>
                </InputGroupAddon>
                <Input
                  style={{ maxWidth: '50%' }}
                  type='text'
                  placeholder='Role Name'
                  bsSize='sm'
                  disabled={(data) ? (data.roles.docs.length === 0) : false}
                  onChange={(e) => {
                    e.preventDefault()
                    setFiltersValue({
                      ...filtersValue,
                      NAME: e.target.value
                    })
                  // updateFilter(e.target.value, 'SITENAME')
                  }}
                  onFocus={(e) => setFocusInput({
                    ...focusInput,
                    inputRoleName: {
                      focus: true
                    }
                  })}
                  onBlur={(e) => setFocusInput({
                    ...focusInput,
                    inputRoleName: {
                      focus: false
                    }
                  })}
                />
              </InputGroup>
            </Col>
          </Row>

          <div className='w-100 pt-2 mt-2'>
            {Contend()}
          </div>
        </div>
      </div>
    </UseContex.Provider>
  )
}

export default CreateRole
