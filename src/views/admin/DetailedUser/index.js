import React from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardText,
  Row,
  Col,
  Button
} from 'reactstrap'
import DetailData from './DetailData'
import './stylesDetaildUser.scss'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { BeatLoader } from 'react-spinners'
import Avatar from 'react-avatar'
import { Link } from 'react-router-dom'

const userByid = gql`
query userByid(
  $id : String!
){
  userById(id :  $id ){
    id
    email
    firstName
    lastName
    createdAt
    updatedAt
    verified
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

const DetailIndex = (props) => {
  const { idUser } = props.location.state

  const { loading, error, data } = useQuery(userByid, { variables: { id: idUser } })

  if (error) {
    console.log(error.graphQLErrors)
  }

  return (
    <div>
      <Link
        to='/admin/user/createUser'
      >
        <Button className='btn-link p-2 m-2' size='lg' color='primary'>
          <i className='tim-icons icon-double-left' />
          Back
        </Button>
      </Link>

      <Row>
        <Col md='3'>
          <Card className='card-user h-100'>
            <CardBody>
              <CardText />
              <div className='author'>
                <div className='block block-one' />
                <div className='block block-two' />
                <div className='block block-three' />
                <div className='block block-four' />
                {
                  (loading) ? (
                    <img
                      alt='...'
                      className='avatar'
                      src={require('assets/img/default-avatar.jpg')}
                    />
                  )
                    : (
                      <Avatar
                        className='avatar'
                        name={`${data.userById.firstName} ${data.userById.lastName}`}
                        size='124' email={data.userById.email} round
                      />
                    )
                }
                {
                  (!loading)
                    ? (
                      <div>
                        <h5 className='title'>{`${data.userById.firstName} ${data.userById.lastName}`}</h5>
                        <p className='description'><strong>{data.userById.role.name}</strong></p>
                      </div>
                    )
                    : null
                }
              </div>
              {
                (loading) ? (
                  <div className='d-flex justify-content-center p-2 m-2'>
                    <BeatLoader
                      color='#4A90E2'
                      size={40}
                      loading
                    />
                  </div>
                )
                  : (
                    <div className='card-description'>
                      <h5>Description</h5>
                      <p>
                        Do not be scared of the truth because we need to restart the
                        human foundation in truth And I love you like Kanye loves
                        Kanye I love Rick Owens’ bed design but the back is...
                      </p>
                    </div>
                  )
              }
            </CardBody>
          </Card>
        </Col>
        <Col md='9'>
          <Card className='h-100'>
            <CardHeader>
              <h3 className='title'>User Information</h3>
            </CardHeader>
            <CardBody>
              <DetailData loading={loading} error={error} user={data} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default DetailIndex
