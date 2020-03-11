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

    if (data.roles.docs.length === 0) {
      return (
        <div className='d-flex justify-content-center p-2 m-2'>
            No Data
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
          )
          )
        }
      </Row>
    )
  }
  const Alert = () => {
    const options = {
      message: 'Trolazoooo',
      options: {
        icon: 'icon-bell-55',
        type: 'dark',
        autoDismiss: 4,
        place: 'bl'
      }
    }
    myInputAlert.current.showAlert(options)
  }

  useEffect(() => {
    if (!error) {
      const options = {
        message: 'Trolazoooo',
        options: {
          icon: 'icon-bell-55',
          type: 'dark',
          autoDismiss: 4,
          place: 'bl'
        }
      }
      myInputAlert.current.showAlert(options)
    }
  }, [error])

  return (
    <UseContex.Provider value={{
      state: store,
      setState: (params) => {
        setStore(params)
      }
    }}
    >
      <AlertGlobal ref={myInputAlert} />
      <div className='content'>
        {
          (openModal) && <ModalRole openModal={openModal} setOpenModal={setOpenModal} />
        }
        <h1 className='mb-0'>Create Role</h1>
        <div className='container p-2 m-2'>
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
                  // onChange={(e) => {
                  //   e.preventDefault()
                  //   setFiltersValue({
                  //     ...filtersValue,
                  //     SITENAME: e.target.value
                  //   })
                  // // updateFilter(e.target.value, 'SITENAME')
                  // }}
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

          <div className='content pt-2 mt-2'>
            {Contend()}
          </div>
        </div>
      </div>
    </UseContex.Provider>
  )
}

export default CreateRole
