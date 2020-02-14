import React, { useState, useEffect } from 'react'
import ReactBSAlert from 'react-bootstrap-sweetalert'
import Select from 'react-select'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Row, Col, UncontrolledCollapse, Button, CardBody, Card } from 'reactstrap'
import { ClipLoader } from 'react-spinners'
import './stylesUser.scss'

const userByid = gql`
query userByid( $id : String!){
    userById(id :  $id ){
        id
        fullName
        email
        role{
            id
            name
        }
        permissions{
            id
            name
    }
  }
}
`

const allRoles = gql`
query roles(
  $perPage : Float!
  $page : Float!
  $filters : IntOrStr!
){
  roles(
    perPage : $perPage ,
    page :  $page,
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

const BSAlertAddPermissions = (props) => {
  const [singleSelect, setSingleSelect] = useState({
    label: '',
    value: ''
  })

  const [optionSelectRoles, setOptionSelectRoles] = useState([])

  const [stateReqRoles, setStateReqRoles] = useState({
    perPage: 25,
    page: 1,
    filters: ''
  })

  const { loading, error, data } = useQuery(userByid, { variables: { id: props.User.id } })

  const reqRoles = useQuery(allRoles, { stateReqRoles, fetchPolicy: 'no-cache' })

  useEffect(() => {
    if (data) {
      setSingleSelect({
        label: data.userById.role.name,
        value: data.userById.role.id
      })
    }
  }, [data])

  if (reqRoles.data) {
    console.log(reqRoles.data)
  }

  // console.log('User', props.User)

  // if (data) {
  //   console.log('data', data)
  // }

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
      if (data) {
        return (
          <div>
            <Row>
              <Col className='col-4'>
                <h4 className='text-left' style={{ color: 'black' }}>User Name :</h4>
              </Col>
              <Col className='col-8'>
                <p className='text-left' style={{ color: 'black' }}>
                  {
                    data.userById.fullName
                  }
                </p>
              </Col>
              <Col className='col-4'>
                <h4 className='text-left' style={{ color: 'black' }}>Role :</h4>
              </Col>
              <Col className='col-8'>
                <p className='text-left' style={{ color: 'black' }}>
                  {
                    data.userById.role.name
                  }
                </p>
              </Col>
              <Col className='col-12'>
                <h3 style={{ color: 'black' }}>Add</h3>
              </Col>
              <Col className='col-12 text-left'>
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
                  options={[
                    { value: '1', label: 'Foobar' },
                    { value: '2', label: 'Foobar' },
                    { value: '3', label: 'Is great' },
                    { value: '4', label: 'Foobar' },
                    { value: '5', label: 'Is great' },
                    { value: '6', label: 'Foobar' },
                    { value: '7', label: 'Is great' },
                    { value: '8', label: 'Is great' }
                  ]}
                  placeholder='Single Select'
                />
              </Col>
              <Col className='col-12 text-left'>
                <label htmlFor='SelectRole'>Permissions</label>
                <Select
                  className='react-select info'
                  classNamePrefix='react-select'
                  placeholder='Choose City'
                  name='multipleSelect'
                  closeMenuOnSelect={false}
                  isMulti
                  // value={this.state.multipleSelect}
                  // onChange={value =>
                  //   this.setState({ multipleSelect: value })
                  // }
                  options={[
                    {
                      value: '',
                      label: ' Multiple Options',
                      isDisabled: true
                    },
                    { value: '2', label: 'Paris ' },
                    { value: '3', label: 'Bucharest' },
                    { value: '4', label: 'Rome' },
                    { value: '5', label: 'New York' },
                    { value: '6', label: 'Miami ' },
                    { value: '7', label: 'Piatra Neamt' },
                    { value: '8', label: 'Paris ' },
                    { value: '9', label: 'Bucharest' },
                    { value: '10', label: 'Rome' },
                    { value: '11', label: 'New York' },
                    { value: '12', label: 'Miami ' },
                    { value: '13', label: 'Piatra Neamt' },
                    { value: '14', label: 'Paris ' },
                    { value: '15', label: 'Bucharest' },
                    { value: '16', label: 'Rome' },
                    { value: '17', label: 'New York' },
                    { value: '18', label: 'Miami ' },
                    { value: '19', label: 'Piatra Neamt' }
                  ]}
                />
              </Col>
            </Row>
          </div>
        )
      }
    }
  }

  return (
    <div>
      <ReactBSAlert
        style={{ overflow: 'visible' }}
        showCancel
        confirmBtnText='Update'
        confirmBtnBsStyle='success'
        cancelBtnBsStyle='danger'
        title='Permissions and Roles'
        disabled={loading || error}
        onConfirm={(e) => console.log('sadas')}
        onCancel={(e) => props.setAddPermissions({
          visible: false,
          user: {}
        })}
        focusCancelBtn
      >
        {conted()}
      </ReactBSAlert>
    </div>
  )
}

export default BSAlertAddPermissions
