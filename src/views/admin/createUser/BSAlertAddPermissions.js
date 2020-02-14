import React from 'react'
import ReactBSAlert from 'react-bootstrap-sweetalert'
import Select from 'react-select'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Row, Col, UncontrolledCollapse, Button, CardBody, Card } from 'reactstrap'
import { ClipLoader } from 'react-spinners'

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

const BSAlertAddPermissions = (props) => {
  const { loading, error, data } = useQuery(userByid, { variables: { id: props.User.id } })

  // console.log('User', props.User)

  if (data) {
    console.log('data', data)
  }

  const conted = () => {
    if (loading) {
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
                    // props.User.role.name
                  }
                </p>
              </Col>
              <Col className='col-12'>
                <h3 className='text-center' style={{ color: 'black' }}>Add</h3>
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
        showCancel
        confirmBtnText='Update'
        confirmBtnBsStyle='success'
        cancelBtnBsStyle='danger'
        title='Permissions and Roles'
        disabled={loading || error}
        // onConfirm={this.deleteFile}
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
