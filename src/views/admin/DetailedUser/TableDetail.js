import React, { useState } from 'react'
import {
  Input,
  Table,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  FormGroup,
  Pagination, PaginationItem, PaginationLink
} from 'reactstrap'
import classnames from 'classnames'
import Select from 'react-select'
import UseContex from './ContexStore'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { BeatLoader } from 'react-spinners'
import moment from 'moment'

const projects = gql`
   query projects(
  $perPage : Float!
  $page : Float!
  $siteNameFilters : IntOrStrOrBool!
  $domainFilters  : IntOrStrOrBool!
  $idUser : IntOrStrOrBool!
){
  projects(
    perPage : $perPage
    page :  $page
    filters : [
      {
        field : SITENAME
        value : $siteNameFilters
      },
      {
        field : DOMAIN
        value : $domainFilters
      },
      {
        field : CREATEDBY
        value : $idUser
      }
    ]
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

const TableDetail = () => {
  // const idUSer = React.useContext(UseContex.contextStore)
  const [focusInput, setFocusInput] = useState({
    inputSiteName: {
      focus: false
    },
    inputAccontName: {
      focus: false
    }
  })
  const [singleSelect, setSingleSelect] = useState({
    label: '5',
    value: '5'
  })
  const [variables, setVariables] = useState({
    perPage: 5,
    page: 1,
    domainFilters: '',
    siteNameFilters: '',
    idUser: React.useContext(UseContex.contextStore)
  })

  const { loading, error, data } = useQuery(projects, { variables })

  // console.log('idTienda', React.useContext(UseContex.contextStore))

  if (data) {
    console.log(data)
  }

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
      if (data.projects.docs.length === 0) {
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
        data.projects.docs.map((value, index) => (
          <tbody key={index}>
            <tr>
              <td className='text-left'>{value.siteName}</td>
              <td className='text-left'>{value.accountUsername}</td>
              <td className='text-left'>{moment(value.createdAt).format('MM / DD / YYYY')}</td>
              <td className='text-left'>{value.domain}</td>
            </tr>
          </tbody>
        ))
      )
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

  return (
    <div>
      <Row>
        <Col>
          <label htmlFor='FilterBySite'>Filter by Site Name</label>
          <InputGroup
            size='sm'
            className={`text-left ${classnames({ 'input-group-focus': focusInput.inputSiteName.focus })}`}
          >
            <InputGroupAddon addonType='prepend'>
              <InputGroupText><i className='fas fa-search' /></InputGroupText>
            </InputGroupAddon>
            <Input
              id='FilterBySite'
              type='text'
              placeholder='Site Name'
              bsSize='sm'
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
        <Col>
          <label htmlFor='FilterByAccont'>Filter by Accont Name</label>
          <InputGroup
            size='sm'
            className={`text-left ${classnames({ 'input-group-focus': focusInput.inputAccontName.focus })}`}
          >
            <InputGroupAddon addonType='prepend'>
              <InputGroupText><i className='fas fa-search' /></InputGroupText>
            </InputGroupAddon>
            <Input
              id='FilterByAccont'
              type='text'
              placeholder='Accont Name'
              bsSize='sm'
              onFocus={(e) => setFocusInput({
                ...focusInput,
                inputAccontName: {
                  focus: true
                }
              })}
              onBlur={(e) => setFocusInput({
                ...focusInput,
                inputAccontName: {
                  focus: false
                }
              })}
            />
          </InputGroup>
        </Col>
      </Row>

      <Table>
        <thead className='text-primary'>
          <tr>
            <th scope='col'>Site Name</th>
            <th scope='col'>Account Name</th>
            <th scope='col' className='text-center'>Created At</th>
            <th scope='col' className='text-center'>Domain</th>
          </tr>
        </thead>
        {contendTable()}
      </Table>
      <Row className='p-2'>
        <Col className='col-4'>
          <FormGroup>
            <Row>
              <Col className='col-4'>
                <Label for='inputState'>Per Page</Label>
              </Col>
              <Col>
                <Select
                  className='react-select primary'
                  classNamePrefix='react-select'
                  name='singleSelect'
                  value={singleSelect}
                  onChange={(value) => {
                    setSingleSelect(value)
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
          <div className='maxPaginatio'>
            <Pagination>
              <PaginationItem>
                <PaginationLink>
                      Previous
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink>
                    1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink>
                      Next
                </PaginationLink>
              </PaginationItem>
            </Pagination>
          </div>
        </Col>
      </Row>

    </div>
  )
}

export default TableDetail
