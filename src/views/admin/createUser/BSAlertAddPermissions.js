import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {
  Row, Col, Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert
} from 'reactstrap'
import { ClipLoader } from 'react-spinners'
import './stylesUser.scss'

// type State = {
//   value: [{ [string]: string }],
// };

const userByid = gql`
query userByid( $id : String!){
    userById(id :  $id ){
        id
        fullName
        email
        role{
            id
            name
            permissions{
              id
              name
            }
        }
        permissions{
            id
            name
    }
  }
}
`

const allpermissions = gql`
  query permissions(
  $perPage : Float!
  $page : Float!
  $filters : IntOrStr!
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

const allRoles = gql`
query roles(
  $perPage : Float!
  $page : Float!
){
  roles(
    perPage : $perPage ,
    page :  $page
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

const updateUser = gql`
mutation updateUser(
  $id : String!
  $role: String!
  $newPermissions: [String!]
){
  updateUser(
    id : $id
    role : $role
    newPermissions : $newPermissions
  ){
    id
    fullName
    role{
      id
      name
      permissions{
        id
        name
      }
    }
    permissions{
      id
      name
    }
  }
}
`

const rolesPagingParams = {
  perPage: 25,
  page: 1
}

const BSAlertAddPermissions = (props) => {
  // This handles the single select
  const [singleSelect, setSingleSelect] = useState(null)

  // This handles multi select
  const [multiSelectValue, setMultiSelectValue] = useState(null)

  const [stateReqpermissions, setStateReqpermissions] = useState({
    perPage: 25,
    page: 1,
    filters: ''
  })

  const { loading, error, data } = useQuery(userByid, { variables: { id: props.User.id }, fetchPolicy: 'no-cache' })

  const reqRoles = useQuery(allRoles, { variables: { ...rolesPagingParams }, fetchPolicy: 'no-cache' })

  const reqPermissions = useQuery(allpermissions, { variables: { ...stateReqpermissions }, fetchPolicy: 'no-cache' })

  const [updateUserMutation, reqUpdateUser] = useMutation(updateUser, {
    refetchQueries: ['allUsers']
  })

  useEffect(() => {
    if (data) {
      setSingleSelect({
        label: data.userById.role.name,
        value: data.userById.role.id
      })
      const permissions = data.userById.permissions.map((u) => ({
        label: u.name,
        value: u.id,
        isBase: data.userById.role.permissions.some(x => u.name === x.name)
      }))
      permissions.sort((a, d) => {
        return a.isBase ? -1 : 1
      })
      setMultiSelectValue(permissions)
    }
  }, [data])

  const conted = () => {
    if (loading || reqRoles.loading) {
      return (
        <div className='d-flex justify-content-center p-2 m-2'>
          <ClipLoader
            color='#4A90E2'
            size={120}
            loading
          />
        </div>
      )
    } else {
      if (error || reqRoles.error) {
        return (
          <div className='d-flex justify-content-center p-2 m-2'>
            <Alert color='danger'>Error connecting to server</Alert>
          </div>
        )
      }

      if (singleSelect && multiSelectValue && reqRoles.data) {
        const allRoles = reqRoles.data.roles.docs.map(u => ({
          value: u.id,
          label: u.name
        }))

        const allPermissions = reqPermissions.data.permissions.docs.map(u => ({
          value: u.id,
          label: u.name
        }))

        const styles = {
          multiValue: (base, state) => {
            return state.data.isBase ? { ...base, backgroundColor: 'gray !important', border: '1px solid beige !important' } : base
          },
          multiValueLabel: (base, state) => {
            return state.data.isBase
              ? { ...base, fontWeight: 'bold', color: 'beige !important', paddingRight: 6, cursor: 'not-allowed' }
              : base
          },
          multiValueRemove: (base, state) => {
            return state.data.isBase ? { ...base, display: 'none' } : base
          },
          input: (base, state) => {
            return { ...base, color: 'beige !important' }
          }
        }

        return (
          <div>
            <Row>
              <Col className='col-4'>
                <h4 className='text-left'>User Name :</h4>
              </Col>
              <Col className='col-8'>
                <p className='text-left' style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  {
                    data.userById.fullName
                  }
                </p>
              </Col>
              <Col className='col-4'>
                <h4 className='text-left'>Role :</h4>
              </Col>
              <Col className='col-8'>
                <p className='text-left' style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  {
                    data.userById.role.name
                  }
                </p>
              </Col>
              <Col className='col-12 text-center'>
                <h3>Add</h3>
              </Col>
              <Col className='col-12 text-left pb-2'>
                <label htmlFor='SelectRole'>Role</label>
                <Select
                  className='react-select primary selectWhite'
                  classNamePrefix='react-select'
                  name='singleSelect'
                  openOnFocus
                  autofocus
                  // menuIsOpen
                  value={singleSelect}
                  onChange={value => setSingleSelect(value)}
                  options={allRoles}
                  placeholder='Single Select'
                />
              </Col>
              <Col className='col-12 text-left pb-2 pt-2'>
                <label htmlFor='SelectRole'>Permissions</label>
                <Select
                  className='react-select info'
                  classNamePrefix='react-select'
                  placeholder='Choose City'
                  name='multipleSelect'
                  isClearable={false}
                  closeMenuOnSelect={false}
                  isMulti
                  // isDisabled={reqPermissions.loading}
                  // isLoading={reqPermissions.loading}
                  onInputChange={(e) => {
                    const inputValue = e.replace(/\W/g, '')
                    // console.log(inputValue)
                    setStateReqpermissions({
                      ...stateReqpermissions,
                      filters: inputValue
                    })
                  }}
                  styles={styles}
                  value={multiSelectValue}
                  onChange={(value, { action, removedValue }) => {
                    console.log(action)
                    if (action !== 'pop-value') {
                      if (action === 'select-option') {
                        setMultiSelectValue(value)
                      } else if (action === 'remove-value') {
                        if (!removedValue.isBase) {
                          setMultiSelectValue(value)
                        }
                      } else {
                        setMultiSelectValue(value)
                      }
                    }
                  }}
                  options={allPermissions}
                />
              </Col>
            </Row>
          </div>
        )
      }
    }
  }

  const submitInputUpdate = async () => {
    try {
      const newPermissions = multiSelectValue.filter(u => !u.isBase === true).map(u => (
        u.value
      ))
      const newRole = {
        id: singleSelect.value,
        name: singleSelect.label
      }
      const idUser = data.userById.id

      const newUser = {
        id: idUser,
        role: newRole.id,
        newPermissions: [...newPermissions]
      }

      await updateUserMutation({ variables: newUser })
      props.setAddPermissions({
        visible: false,
        user: {}
      })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      <Modal style={{ marginTop: '64px' }} isOpen={props.addPermissions} size='lg'>
        <ModalHeader>
          <div className='modal-header '>
            <h3>Permissions and Roles</h3>
          </div>
        </ModalHeader>
        <ModalBody>{conted()}</ModalBody>
        <ModalFooter>
          <Row className='w-100'>
            <Col className='col-6 pt-2'>
              <Button
                className='w-100'
                color='danger'
                disabled={reqUpdateUser.loading}
                onClick={(e) => props.setAddPermissions({
                  visible: false,
                  user: {}
                })}
              >
               Cancel
              </Button>
            </Col>
            <Col className='col-6 pt-2'>
              <Button
                className='w-100'
                color='info'
                type='submit'
                disabled={reqUpdateUser.loading || error}
                onClick={(e) => submitInputUpdate()}
              >
                {
                  (reqUpdateUser.loading)
                    ? (
                      <ClipLoader
                        color='#4A90E2'
                        size={20}
                        loading
                      />
                    )
                    : 'Update'
                }
              </Button>
            </Col>
          </Row>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default BSAlertAddPermissions
