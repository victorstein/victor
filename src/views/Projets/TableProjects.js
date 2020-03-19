import React, { useState, useEffect } from 'react'
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
  Pagination, PaginationItem, PaginationLink, CardFooter
} from 'reactstrap'
import classnames from 'classnames'
import Select from 'react-select'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { BeatLoader } from 'react-spinners'
import moment from 'moment'
import { GlobalContext } from '../../index'

const Allprojects = gql` 
query projects(
  $perPage : Float!
  $page : Float!
  $filters : [projectFilter!]
){
  projects(
    perPage : $perPage
    page :  $page
    filters : $filters
  ){
    docs{
      id
      domain
      siteName
      accountUsername
      createdAt
      createdBy{
        id
        fullName
      }
    }
    total
    page
    perPage
    pages
  }
}
`
const allUsers = gql`
  query users(
  $perPage : Float!
  $page : Float!
  $filters : IntOrStrOrBool!
){
  users(
    perPage : $perPage
    page: $page
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
    }
    total
    page
    perPage
    pages
  }
}
`

const TableProyects = (props) => {
  const [focusInput, setFocusInput] = useState({
    inputSiteName: {
      focus: false
    },
    inputDomain: {
      focus: false
    }
  })
  const [singleSelect, setSingleSelect] = useState({
    label: '10',
    value: '10'
  })
  const [userSelect, setUserSelect] = useState({ value: '0', label: 'User Name' })
  const [variables, setVariables] = useState({
    perPage: 10,
    page: 1,
    filters: []
  })

  const [filtersValue, setFiltersValue] = useState({
    SITENAME: '',
    CREATEBY: '',
    DOMAIN: '',
    Id: ''
  })

  const [inputFilterSelect, setInputFilterSelect] = useState(null)

  const stylesSelect = {
    input: (base, state) => {
      return { ...base, color: '#00f2c3 !important' }
    },
    placeholder: (base, state) => {
      return { ...base, color: '#00f2c3 !important' }
    }
  }

  const STORE = React.useContext(GlobalContext)

  const reqPermissions = ['read_all_users', 'read_all_projects']

  const ShowUserFilter = reqPermissions.every((value) => STORE.state.user.permissions.some((e) => e.name === value))

  const { loading, error, data } = useQuery(Allprojects, { variables, fetchPolicy: 'no-cache' })

  const reqUser = useQuery(allUsers, {
    variables: {
      perPage: 25,
      page: 1,
      filters: (inputFilterSelect === null) ? '' : inputFilterSelect
    },
    fetchPolicy: 'no-cache'
  })

  // console.log(userSelect)
  // console.log({ filters: (userSelect.label === 'User Name') ? '' : userSelect.label })

  useEffect(() => {
    const newFilter = []
    if (filtersValue.SITENAME) {
      newFilter.push({
        field: 'SITENAME',
        value: filtersValue.SITENAME
      })
    }
    if (filtersValue.DOMAIN) {
      newFilter.push({
        field: 'DOMAIN',
        value: filtersValue.DOMAIN
      })
    }
    if (filtersValue.CREATEDBY) {
      newFilter.push({
        field: 'CREATEDBY',
        value: filtersValue.CREATEDBY
      })
    }
    setVariables({
      ...variables,
      filters: newFilter
    })
  }, [filtersValue])

  const contendTable = () => {
    if (error) {
      return (
        <tr>
          <td colSpan={5}>
            <div className='d-flex justify-content-center p-2 m-2'>
              No Data
            </div>
          </td>
        </tr>
      )
    }

    if (loading) {
      return (
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
      )
    }

    if (!loading && data) {
      if (data.projects.docs.length === 0) {
        return (
          <tr>
            <td colSpan={5}>
              <div className='d-flex justify-content-center p-2 m-2'>
                No Data
              </div>
            </td>
          </tr>
        )
      }

      return (
        data.projects.docs.map((value, index) => (
          <tr key={index}>
            <td className='text-center'>{value.siteName}</td>
            <td className='text-center'>{value.domain}</td>
            <td className='text-center'>{value.createdBy.fullName}</td>
            <td className='text-center'>{moment(value.createdAt).format('MMMM DD YYYY')}</td>
            <td className='text-center'>{value.accountUsername}</td>
            <td className='text-center'>
              <Button
                className='btn-link btn-icon'
                color='primary'
                id={`ViewButton_${index}`}
              >
                <i className='fas fa-eye' />
              </Button>
              <UncontrolledTooltip
                delay={0}
                target={`ViewButton_${index}`}
              >
                View Poject
              </UncontrolledTooltip>
              <Button
                className='btn-link btn-icon'
                color='warning'
                id={`agregateButton_${index}`}
              >
                <i className='fas fa-edit' />
              </Button>
              <UncontrolledTooltip
                delay={0}
                target={`agregateButton_${index}`}
              >
                Agregate Landing
              </UncontrolledTooltip>
              <Button
                className='btn-link btn-icon'
                color='danger'
                id={`deleteButton_${index}`}
                size='sm'
              >
                <i className='tim-icons icon-simple-remove' />
              </Button>
              <UncontrolledTooltip
                delay={0}
                target={`deleteButton_${index}`}
              >
                Delete Project
              </UncontrolledTooltip>
            </td>
          </tr>
        )))
    }
  }

  return (
    <Card className='w-100'>
      <CardHeader>
        <CardTitle tag='h4'>Project list</CardTitle>
        <Row>
          <Col className='col-2'>
            <Button
              onClick={(e) => props.setOpenModal(true)}
              className='btn-simple'
              color='success'
            >
              <i className='fas fa-plus-circle mr-2' />
                Add Project
            </Button>
          </Col>
          {
            (ShowUserFilter) && (
              <Col className='col-10'>
                <div className='d-flex justify-content-end align-items-center'>
                  <div>
                    <label htmlFor='SelectUser'>filter by User</label>
                  </div>
                  <div className='ml-3 mw-75'>
                    <Select
                      className='react-select success selectUser'
                      classNamePrefix='react-select'
                      name='singleSelect'
                      value={userSelect}
                      id='SelectUser'
                      styles={stylesSelect}
                      isDisabled={reqUser.loading || reqUser.error}
                      onInputChange={(e) => {
                        const inputValue = e.replace(/\W/g, '')
                        setInputFilterSelect(inputValue)
                      }}
                      onChange={value => {
                        setUserSelect(value)
                        console.log(value.value)
                        setFiltersValue({
                          ...filtersValue,
                          CREATEDBY: value.value
                        })
                      }}
                      options={
                        (reqUser.data)
                          ? reqUser.data.users.docs.map((value, index) => (
                            { value: value.id, label: value.fullName }
                          )) : []
                      }
                      placeholder='filter By User'
                    />
                  </div>
                </div>
              </Col>
            )
          }
        </Row>
      </CardHeader>
      <CardBody>
        <Table responsive className='table'>
          <thead className='text-primary'>
            <tr>
              <th scope='col' style={{ maxWidth: '255px', width: '255px' }}>
                <Row>
                  <Col style={{ paddingTop: '0.6rem' }} className='text-center col-4'>
                      Site Name
                  </Col>
                  <Col className='col-8' style={{ paddingTop: '0.6rem' }}>
                    <InputGroup
                      size='sm'
                      className={`text-left ${classnames({
                          'input-group-focus': focusInput.inputSiteName.focus
                        })}`}
                    >
                      <InputGroupAddon addonType='prepend'>
                        <InputGroupText><i className='fas fa-search' /></InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type='text'
                        placeholder='Site Name'
                        bsSize='sm'
                        onChange={(e) => {
                          e.preventDefault()
                          setFiltersValue({
                            ...filtersValue,
                            SITENAME: e.target.value
                          })
                          // updateFilter(e.target.value, 'SITENAME')
                        }}
                        onFocus={(e) => setFocusInput({
                          ...focusInput,
                          inputSiteName: {
                            focus: true
                          }
                        })}
                        onBlur={(e) => setFocusInput({
                          ...focusInput,
                          inputSiteName: {
                            focus: false
                          }
                        })}
                      />
                    </InputGroup>
                  </Col>
                </Row>
              </th>
              <th scope='col' style={{ maxWidth: '255px', width: '255px' }}>
                <Row>
                  <Col style={{ paddingTop: '1rem' }} className='text-center col-4'>
                      Domain
                  </Col>
                  <Col className='col-8' style={{ paddingTop: '0.6rem' }}>
                    <InputGroup
                      size='sm'
                      className={`text-left ${classnames({
                          'input-group-focus': focusInput.inputDomain.focus
                        })}`}
                    >
                      <InputGroupAddon addonType='prepend'>
                        <InputGroupText><i className='fas fa-search' /></InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type='text'
                        placeholder='Domain'
                        bsSize='sm'
                        onChange={(e) => {
                          e.preventDefault()
                          setFiltersValue({
                            ...filtersValue,
                            DOMAIN: e.target.value
                          })
                        }}
                        onFocus={(e) => setFocusInput({
                          ...focusInput,
                          inputDomain: {
                            focus: true
                          }
                        })}
                        onBlur={(e) => setFocusInput({
                          ...focusInput,
                          inputDomain: {
                            focus: false
                          }
                        })}
                      />
                    </InputGroup>
                  </Col>
                </Row>
              </th>
              <th scope='col' className='text-center'>Created By</th>
              <th scope='col' className='text-center'>Created At</th>
              <th scope='col' className='text-center'>Account User name</th>
              <th scope='col' className='text-center'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contendTable()}
          </tbody>
        </Table>
      </CardBody>
      <CardFooter>
        <Row>
          <Col>
            <FormGroup>
              <Row>
                <Col className='col-2'>
                  <Label for='inputState'>Page</Label>
                </Col>
                <Col>
                  <Select
                    className='react-select primary'
                    classNamePrefix='react-select'
                    name='singleSelect'
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
            </FormGroup>
          </Col>
          <Col className='col-8'>
            {
              (error) ? null
                : (data && data.projects.docs.length !== 0) &&
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
                        [...Array(data.projects.pages)].map((pagina, index) => (
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
                        disabled={!((loading) || data.projects.pages !== variables.page)}
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

  )
}

export default TableProyects
