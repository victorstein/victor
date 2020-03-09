import React, { useEffect } from 'react'
import {
  Button,
  Modal,
  ModalHeader
} from 'reactstrap'
import UseContex from './store'
import gql from 'graphql-tag'
import { useLazyQuery } from '@apollo/react-hooks'
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

const ModalRole = (props) => {
  const STORE = React.useContext(UseContex.contextStore)
  const { idRole } = STORE.state

  const [queryRolebyid, reqQueryRolebyid] = useLazyQuery(roleByid, { fetchPolicy: 'no-cache' })

  const submitForm = () => {
    console.log('submitForm')
  }
  useEffect(() => {
    if (idRole !== null) {
      queryRolebyid({ variables: { id: idRole } })
    }
  }, [idRole])

  if (reqQueryRolebyid.data) {
    console.log('reqQueryRolebyid', reqQueryRolebyid.data)
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
        // (loading) ? <Loading></Loading>
        // :
        // <Form defaultValue={(si es nuevo en nulo, si es editar, resultado de la query)} >
        // </Form>
      }
      {
        (idRole === null) ? (
          <FormModal
            submitForm={submitForm}
            STORE={STORE}
            setOpenModal={props.setOpenModal}
            defaultValue={{
              selectRole: null,
              name: ''
            }}
          />
        ) : (reqQueryRolebyid.loading) ? 'loading' : (reqQueryRolebyid.data) && (
          <FormModal
            submitForm={submitForm}
            STORE={STORE}
            setOpenModal={props.setOpenModal}
            defaultValue={reqQueryRolebyid.data.roleById}
          />
        )
      }

    </Modal>
  )
}

export default ModalRole
