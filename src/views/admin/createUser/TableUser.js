import React, { useState } from 'react'
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Badge,
  Pagination, PaginationItem, PaginationLink, CardFooter
} from 'reactstrap'
import classnames from 'classnames'
import Select from 'react-select'
// import AlertGlobal from '../../../components/AlertGlobal'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { BeatLoader, ClipLoader } from 'react-spinners'
import ReactBSAlert from 'react-bootstrap-sweetalert'
import BSAlertAddPermissions from './BSAlertAddPermissions'
import { Link } from 'react-router-dom'

const allUsers = gql`
  query allUsers(
  $perPage : Float!
  $page : Float!
  $filters : IntOrStrOrBool!
){
  users(
    perPage: $perPage, 
    page : $page,
    filters : [
      {
        field : FIRSTNAME
        value : $filters
      }
    ]
  ){
    docs{
      id
      fullName
      email
      role{
        name
      }
      verified
    }
    total
    page
    perPage
    pages
  }
}
`
const deleteUserById = gql`
  mutation deleteUserById(
  $id: String!
){
  deleteUserById(id : $id)
}
`

const TableUser = (props) => {
  const [variables, setVariables] = useState({
    perPage: 5,
    page: 1,
    filters: ''
  })
  const [focusInput, setFocusInput] = useState({
    inputName: {
      focus: false
    }
  })
  const [singleSelect, setSingleSelect] = useState({
    label: '5',
    value: '5'
  })
  const [alertDelete, setAlertDelete] = useState({
    visible: false,
    user: null
  })

  const [addPermissions, setAddPermissions] = useState({
    visible: false,
    user: {}
  })

  const { loading, error, data } = useQuery(
    allUsers,
    { variables, fetchPolicy: 'no-cache' }
  )

  const [deleteUserMutation, reqDeleteUser] = useMutation(deleteUserById, {
    refetchQueries: ['allUsers']
  })

  const contendTable = () => {
    if (!loading && data) {
      if (error) {
        return (
          <tbody>
            <tr>
              <td colSpan={5}>
                <div className='d-flex justify-content-center p-2 m-2'>
                  No Data
                </div>
              </td>
            </tr>
          </tbody>
        )
      }

      if (data.users.docs.length === 0) {
        return (
          <tbody>
            <tr>
              <td colSpan={5}>
                <div className='d-flex justify-content-center p-2 m-2'>
                  No Data
                </div>
              </td>
            </tr>
          </tbody>
        )
      }
      return (
        data.users.docs.map((value, index) => (
          <tbody key={index}>
            <tr>
              <td className='text-left'>{value.fullName}</td>
              <td>{value.email}</td>
              <td className='text-center'>{value.role.name}</td>
              <td className='text-center'>
                <Badge
                  color={(value.verified) ? 'success' : 'danger'}
                >
                  {
                    (value.verified) ? 'True' : 'False'
                  }
                </Badge>
              </td>
              <td className='text-center'>
                <Link
                  // to='/admin/user/detailUser'
                  to={{
                    pathname: '/admin/user/detailUser',
                    state: {
                      idUser: value.id
                    }
                  }}
                >
                  <Button
                    className='btn-link btn-icon'
                    color='primary'
                    id={`ViewButton_${value.id}`}
                  >
                    <i className='fas fa-eye' />
                  </Button>
                </Link>
                <UncontrolledTooltip
                  delay={0}
                  target={`ViewButton_${value.id}`}
                >
                 View
                </UncontrolledTooltip>
                <Button
                  className='btn-link btn-icon'
                  color='warning'
                  id={`permissionsButton_${value.id}`}
                  onClick={(e) => setAddPermissions({
                    visible: true,
                    user: value
                  })}
                >
                  <i className='tim-icons icon-badge' />
                </Button>
                <UncontrolledTooltip
                  delay={0}
                  target={`permissionsButton_${value.id}`}
                >
                add permissions
                </UncontrolledTooltip>
                <Button
                  className='btn-link btn-icon'
                  color='danger'
                  id={`deleteButton_${value.id}`}
                  size='sm'
                  onClick={(e) => setAlertDelete({
                    visible: true,
                    user: value
                  })}
                >
                  <i className='tim-icons icon-simple-remove' />
                </Button>
                <UncontrolledTooltip
                  delay={0}
                  target={`deleteButton_${value.id}`}
                >
                  Delete
                </UncontrolledTooltip>
              </td>
            </tr>
          </tbody>
        )))
    } else {
      return (
        <tbody>
          <tr>
            <td colSpan={5}>
              <div className='d-flex justify-content-center p-2 m-2'>
                <BeatLoader
                  color='#4A90E2'
                  size={20}
                  loading={loading}
                />
              </div>
            </td>
          </tr>
        </tbody>
      )
    }
  }

  const deleteUser = async () => {
    await deleteUserMutation({ variables: { id: alertDelete.user.id } })
    setAlertDelete({
      visible: false,
      user: null
    })
    setVariables({
      ...variables,
      page: 1
    })
  }

  return (
    <div>
      {
        (alertDelete.visible) &&
          <ReactBSAlert
            warning
            showCancel
            title='Atention!'
            onConfirm={(e) => deleteUser()}
            customButtons={
              <>
                <Button
                  color='danger'
                  className='animation-on-hover'
                  disabled={reqDeleteUser.loading}
                  onClick={(e) => setAlertDelete({
                    visible: false,
                    user: null
                  })}
                >
                Cancel
                </Button>
                <Button
                  color='info'
                  className='animation-on-hover'
                  disabled={reqDeleteUser.loading}
                  onClick={(e) => deleteUser()}
                >
                  {
                    (reqDeleteUser.loading)
                      ? (
                        <ClipLoader
                          size={20}
                          color='#FFFFFF'
                          loading
                        />
                      )
                      : ' Yes, delete it!'
                  }
                </Button>
              </>
            }
            focusCancelBtn
          >
            <p style={{ color: 'black' }}>
              <span>Are you sure you want to delete the user :</span>
            </p>
            <strong> {alertDelete.user.fullName}</strong>
          </ReactBSAlert>
      }

      {
        (addPermissions.visible) &&
          <BSAlertAddPermissions
            User={addPermissions.user}
            setAddPermissions={setAddPermissions}
            addPermissions={addPermissions.visible}
          />
      }

      <Card>
        <CardHeader>
          <CardTitle tag='h4'>User list</CardTitle>
          <Button
            onClick={(e) => props.setOpenModal(true)}
            className='btn-simple'
            color='success'
          >
            <i className='fas fa-plus-circle mr-2' />
            Add User
          </Button>
        </CardHeader>
        <CardBody>
          <Table>
            <thead className='text-primary'>
              <tr>
                <th scope='col' style={{ maxWidth: '275px', width: '275px' }}>
                  <Row>
                    <Col style={{ paddingTop: '0.6rem' }} className='text-center col-4'>
                      Name
                    </Col>
                    <Col className='col-8'>
                      <InputGroup
                        size='sm'
                        className={`text-left ${classnames({ 'input-group-focus': focusInput.inputName.focus })}`}
                      >
                        <InputGroupAddon addonType='prepend'>
                          <InputGroupText><i className='fas fa-search' /></InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type='text'
                          placeholder='Filter by Name'
                          bsSize='sm'
                          disabled={error}
                          onChange={(e) => {
                            // console.log(e.target.value)
                            setVariables({
                              ...variables,
                              page: 1,
                              filters: e.target.value
                            })
                          }}
                          onFocus={(e) => setFocusInput({
                            ...focusInput,
                            inputName: {
                              focus: true
                            }
                          })}
                          onBlur={(e) => setFocusInput({
                            ...focusInput,
                            inputName: {
                              focus: false
                            }
                          })}
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                </th>
                <th scope='col'>Email</th>
                <th scope='col' className='text-center'>Role</th>
                <th scope='col' className='text-center'>verified</th>
                <th scope='col' className='text-center'>Actions</th>
              </tr>
            </thead>
            {contendTable()}
          </Table>
        </CardBody>
        <CardFooter>
          <Row>
            <Col className='col-4'>
              <FormGroup>
                {
                  data &&
                    <Row>
                      <Col className='col-4'>
                        <Label for='inputState'>Per Page</Label>
                      </Col>
                      <Col>
                        <Select
                          className='react-select primary'
                          classNamePrefix='react-select'
                          name='singleSelect'
                          isDisabled={(loading || data.users.docs.length === 0)}
                          value={singleSelect}
                          onChange={(value) => {
                            setSingleSelect(value)
                            setVariables({
                              ...variables,
                              page: 1,
                              perPage: parseInt(value.value)
                            })
                          }}
                          options={[
                            {
                              value: '',
                              label: 'Perpage',
                              isDisabled: true
                            },
                            { value: '5', label: '5' },
                            { value: '10', label: '10' },
                            { value: '15', label: '15' }
                          ]}
                          placeholder='Perpage'
                        />
                      </Col>
                    </Row>
                }
              </FormGroup>
            </Col>
            <Col className='col-8'>
              {
                (error) ? null
                  : (data && data.users.docs.length !== 0) &&
                    <div className='maxPaginatio'>
                      <Pagination>
                        <PaginationItem
                          disabled={!((loading || variables.page !== 1))}
                        >
                          <PaginationLink
                            onClick={(e) => {
                              setVariables({
                                ...variables,
                                page: variables.page + -1
                              })
                            }}
                          >
                          Previous
                          </PaginationLink>
                        </PaginationItem>
                        {
                          [...Array(data.users.pages)].map((pagina, index) => (
                            <PaginationItem
                              disabled={loading}
                              key={index}
                              active={variables.page === index + 1}
                            >
                              <PaginationLink
                                onClick={(e) => {
                                  setVariables({
                                    ...variables,
                                    page: index + 1
                                  })
                                }}
                              >
                                {index + 1}
                              </PaginationLink>
                            </PaginationItem>
                          ))
                        }
                        <PaginationItem
                          disabled={!((loading) || data.users.pages !== variables.page)}
                        >
                          <PaginationLink
                            onClick={(e) => {
                              setVariables({
                                ...variables,
                                page: variables.page + 1
                              })
                            }}
                          >
                          Next
                          </PaginationLink>
                        </PaginationItem>
                      </Pagination>
                    </div>
              }
            </Col>
          </Row>
        </CardFooter>
      </Card>
    </div>
  )
}

export default TableUser
