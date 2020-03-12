import React, { useEffect, useState, useRef } from 'react'
import {
  Button,
  Modal,
  ModalHeader
} from 'reactstrap'
import UseContex from './store'
import gql from 'graphql-tag'
import { useLazyQuery, useQuery } from '@apollo/react-hooks'
import FormModal from './FormModal'
import { BeatLoader } from 'react-spinners'
import Lottie from 'react-lottie'
import animationServerError from '../../../assets/lottie/serverError.json'
import AlertGlobal from '../../../components/AlertGlobal'

const roleByid = gql`
  query roleByid($id : String!){
  roleById(id : $id){
      id
      name
      permissions {
        id
        name
      }
  }
}
`

const permissions = gql`
  query permissions(
  $perPage : Float!
  $page : Float!
  $filters : IntOrStrOrBool!
){
  permissions(
     perPage: $perPage, 
    page : $page,
    filters : [
      {
        field : NAME
        value : $filters
      }
    ]
  ){
    docs{
      id
      name
    }
    total
    page
    perPage
    pages
  }
}
`

const ModalRole = (props) => {
  const myInputAlert = useRef()
  const STORE = React.useContext(UseContex.contextStore)
  const { idRole } = STORE.state
  const [variables, setVariables] = useState({
    perPage: 25,
    page: 1,
    filters: ''
  })

  const [queryRolebyid, reqQueryRolebyid] = useLazyQuery(roleByid, { fetchPolicy: 'no-cache' })

  const reqPermissions = useQuery(permissions, { variables: { ...variables }, fetchPolicy: 'no-cache' })

  const submitForm = () => {
    console.log('submitForm')
  }
  useEffect(() => {
    if (idRole !== null) {
      queryRolebyid({ variables: { id: idRole } })
    }
  }, [idRole])

  useEffect(() => {
    let messageError = ''
    if (reqPermissions.error) {
      if (Array.isArray(reqPermissions.error.graphQLErrors)) {
        messageError = reqPermissions.error.graphQLErrors[0].message[0]
      } else {
        messageError = reqPermissions.error.graphQLErrors
      }
      console.log('messageError', reqPermissions.error.graphQLErrors)
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

    if (reqQueryRolebyid.error) {
      if (Array.isArray(reqQueryRolebyid.error.graphQLErrors)) {
        messageError = reqQueryRolebyid.error.graphQLErrors[0].message[0]
      } else {
        messageError = reqQueryRolebyid.error.graphQLErrors
      }
      console.log('messageError', reqQueryRolebyid.error.graphQLErrors)
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
  }, [reqPermissions.error, reqQueryRolebyid.error])

  let defaultPermissions = null

  if (reqQueryRolebyid.data) {
    defaultPermissions = reqQueryRolebyid.data.roleById.permissions.map(u => ({
      value: u.id,
      label: u.name
    }))
  }

  const contedModal = () => {
    if (reqPermissions.error || reqQueryRolebyid.error) {
      const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationServerError,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      }
      return (
        <div className='d-flex justify-content-center'>
          <Lottie
            isClickToPauseDisabled
            options={defaultOptions}
            height='80%'
            width='80%'
          />
        </div>
      )
    }

    if (idRole === null) {
      return (
        <FormModal
          setVariables={setVariables}
          variables={variables}
          loadingPermissions={reqPermissions.loading}
          submitForm={submitForm}
          allPermissions={(reqPermissions.data) ? reqPermissions.data.permissions.docs : []}
          STORE={STORE}
          setOpenModal={props.setOpenModal}
          defaultValue={{
            name: '',
            permissions: defaultPermissions
          }}
        />
      )
    }

    if (reqPermissions.loading) {
      return (
        <div style={{ height: '255px' }} className='d-flex align-items-center w-100 justify-content-center'>
          <BeatLoader
            color='#4A90E2'
            size={20}
            loading
          />
        </div>
      )
    } else if (reqQueryRolebyid.data) {
      return (
        <FormModal
          loadingPermissions={reqPermissions.loading}
          setVariables={setVariables}
          variables={variables}
          submitForm={submitForm}
          allPermissions={reqPermissions.data.permissions.docs}
          STORE={STORE}
          setOpenModal={props.setOpenModal}
          defaultValue={{
            name: reqQueryRolebyid.data.roleById.name,
            permissions: defaultPermissions
          }}
        />
      )
    }
  }

  return (
    <Modal style={{ marginTop: '64px' }} isOpen={props.openModal} size='ms'>
      <AlertGlobal ref={myInputAlert} />
      <ModalHeader>
        <div className='modal-header '>
          <h3>
            {(idRole === null) ? 'Add Role' : 'Update'}
          </h3>
          <Button
            type='button'
            className='btn-round btn-simple'
            data-dismiss='modal'
            style={{ border: 'none' }}
            color='info'
            aria-label='Close'
            onClick={(e) => {
              props.setOpenModal(false)
              STORE.setState({
                idRole: null
              })
            }}
          >
            <i style={{ fontSize: '24px' }} className='tim-icons icon-simple-remove' />
          </Button>
        </div>
      </ModalHeader>
      {contedModal()}
    </Modal>
  )
}

export default ModalRole
