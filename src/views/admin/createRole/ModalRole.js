import React, { useEffect, useState } from 'react'
import {
  Button,
  Modal,
  ModalHeader
} from 'reactstrap'
import UseContex from './store'
import gql from 'graphql-tag'
import { useLazyQuery, useQuery } from '@apollo/react-hooks'
import FormModal from './FormModal'

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
  const STORE = React.useContext(UseContex.contextStore)
  const { idRole } = STORE.state
  const [variables, setVariables] = useState({
    perPage: 20,
    page: 1,
    filters: ''
  })

  const [queryRolebyid, reqQueryRolebyid] = useLazyQuery(roleByid, { fetchPolicy: 'no-cache' })

  const reqPermissions = useQuery(permissions, { variables: { ...variables } })

  const submitForm = () => {
    console.log('submitForm')
  }
  useEffect(() => {
    if (idRole !== null) {
      queryRolebyid({ variables: { id: idRole } })
    }
  }, [idRole])

  let defaultPermissions = null

  if (reqQueryRolebyid.data) {
    defaultPermissions = reqQueryRolebyid.data.roleById.permissions.map(u => ({
      value: u.id,
      label: u.name
    }))
  }

  return (
    <Modal style={{ marginTop: '64px' }} isOpen={props.openModal} size='ms'>
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

      {
        (idRole === null) ? (
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
        ) : (reqQueryRolebyid.loading) ? 'loading' : (reqQueryRolebyid.data) && (
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
    </Modal>
  )
}

export default ModalRole
