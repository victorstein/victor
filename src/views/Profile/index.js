import React, { useEffect, useState } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import Avatar from 'react-avatar'
import moment from 'moment'
import Lottie from 'react-lottie'
import animationServerError from '../../assets/lottie/serverError.json'
import { BeatLoader } from 'react-spinners'
import ChartProfile from './ChartProfile'
import AlertGlobal from '../../components/AlertGlobal'
import ModalEdit from './ModalEdit'
// import { Bar } from 'react-chartjs-2'
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  CardTitle,
  CardFooter,
  Button,
  Badge
} from 'reactstrap'

const me = gql` 
 query me{
  me{
     id
     firstName
     lastName
     email
     createdAt
     createdBy{
      fullName
     }
    role{
      id
      name
    }
    permissions{
      id
      name
    }
    verified
  }
}

`

const ProfileView = (props) => {
  const [openModal, setOpenModal] = useState(false)
  const { loading, error, data } = useQuery(me)

  const myInputAlert = React.useRef()

  const actionsAlertGloval = (options) => {
    myInputAlert.current.showAlert(options)
  }

  useEffect(() => {
    let messageError = ''
    if (error) {
      if (Array.isArray(error.graphQLErrors)) {
        messageError = error.graphQLErrors[0].message
      } else {
        messageError = error.graphQLErrors
      }
      console.log('messageError', error.graphQLErrors)
      const options = {
        message: (Array.isArray(messageError)) ? messageError[0] : messageError,
        options: {
          icon: 'icon-alert-circle-exc',
          type: 'danger',
          autoDismiss: 4,
          place: 'tr'
        }
      }
      actionsAlertGloval(options)
    }
  }, [error])

  const contedCardAvatar = () => {
    if (!loading && data) {
      if (error) {
        const defaultOptions = {
          loop: true,
          autoplay: true,
          animationData: animationServerError,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
          }
        }
        return (
          <CardBody>
            <div style={{ height: '400px', maxHeight: '400px', overflow: 'auto' }}>
              <div className='d-flex justify-content-center'>
                <Lottie
                  isClickToPauseDisabled
                  options={defaultOptions}
                  height='35%'
                  width='35%'
                />
              </div>
              <p className='text-center'>Server Error</p>
            </div>
          </CardBody>
        )
      }

      return (
        <CardBody>
          <Row>
            <Col style={{ borderRight: '1px solid #453c56c4' }} className='col-4'>
              <div className='d-flex justify-content-center'>
                <Avatar
                  className='avatar'
                  name={`${data.me.firstName} ${data.me.lastName}`}
                  size='124' email={data.me.email} round
                />
              </div>
              <h5 className='text-center'>
                {`${data.me.firstName} ${data.me.lastName}`}
              </h5>
              <div className='pt-4 container d-flex justify-content-center'>{}
                <ChartProfile
                  actionsAlertGloval={actionsAlertGloval}
                  id={(data) ? data.me.id : null}
                />
              </div>
            </Col>
            <Col style={{ height: '400px', maxHeight: '400px', overflow: 'auto' }} className='col-8'>
              <Row>
                <Col className='col-4'>
                  <p>First Name</p>
                  <p style={{ color: '#e14eca' }}>{data.me.firstName}</p>
                </Col>
                <Col className='col-4'>
                  <p>Last Name</p>
                  <p style={{ color: '#e14eca' }}>{data.me.lastName}</p>
                </Col>
                <Col className='col-4'>
                  <p>Email</p>
                  <p style={{ color: '#e14eca' }}>{data.me.email}</p>
                </Col>
              </Row>
              <Row className='pt-4'>
                <Col className='col-4'>
                  <p>Profile Created</p>
                  <p style={{ color: '#e14eca' }}>{moment(data.me.createdAt).format('MMMM DD YYYY')}</p>
                </Col>
                <Col className='col-4'>
                  <p>created By</p>
                  <p style={{ color: '#e14eca' }}>{(data.me.createdBy === null) ? 'null' : data.me.createdBy}</p>
                </Col>
                <Col className='col-4'>
                  <p>Role</p>
                  <p style={{ color: '#e14eca' }}>{data.me.role.name}</p>
                </Col>
              </Row>
              <Row className='pt-4'>
                <Col className='col-4'>
                  <p>Verified</p>
                  <Badge
                    color={(data.me.verified) ? 'success' : 'danger'}
                  >
                    {(data.me.verified) ? 'True' : 'False'}
                  </Badge>
                </Col>
              </Row>
              <Row className='pt-4'>
                <Col className='col-12'>
                  <p>permissions</p>
                </Col>
                {
                  data.me.permissions.map((value) => (
                    <Col className='w-100 pr-0 flex-grow-0' key={value.id}>
                      <Badge color='primary'>{value.name}</Badge>
                    </Col>
                  ))
                }
              </Row>
            </Col>
          </Row>
        </CardBody>
      )
    } else {
      return (
        <CardBody>
          <div style={{ paddingTop: '10%' }} className='d-flex justify-content-center pl-2 pr-2 m-2 '>
            <BeatLoader
              color='#4A90E2'
              size={50}
              loading
            />
          </div>
        </CardBody>
      )
    }
  }

  return (
    <div className='content'>
      {
        (openModal) && (
          <ModalEdit
            id={(data) ? data.me.id : null}
            defaultData={{
              firstName: data.me.firstName,
              lastName: data.me.lastName
            }}
            actionsAlertGloval={actionsAlertGloval}
            openModal={openModal}
            setOpenModal={setOpenModal}
          />
        )
      }
      <AlertGlobal ref={myInputAlert} />
      <Row>
        <Col xs='12'>
          <h1 className='mb-0'>My Profile</h1>
        </Col>
        <Col className='col-12'>
          <div className='p-2 m-2 w-100'>
            <Card>
              <CardHeader>
                <CardTitle tag='h4'>User Information</CardTitle>
              </CardHeader>
              {contedCardAvatar()}
              <CardFooter>
                <div className='d-flex flex-row-reverse bd-highlight'>
                  <Button
                    onClick={(e) => setOpenModal(true)}
                    className='btn-round btn-simple' color='warning'
                    disabled={loading || error}
                  >
                    Edit
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </Col>
        {
          // <Col lg='3' md='6'>
          //   <div className='p-2 pt-0 m-2'>
          //     <Card className='card-stats'>
          //       <CardBody>
          //         <Row>
          //           <Col xs='5'>
          //             <div className='info-icon text-center icon-warning'>
          //               <i className='tim-icons icon-chat-33' />
          //             </div>
          //           </Col>
          //           <Col xs='7'>
          //             <div className='numbers'>
          //               <p className='card-category'>Number</p>
          //               <CardTitle tag='h3'>150GB</CardTitle>
          //             </div>
          //           </Col>
          //         </Row>
          //       </CardBody>
          //       <CardFooter>
          //         <hr />
          //         <div className='stats'>
          //           <i className='tim-icons icon-refresh-01' /> Update Now
          //         </div>
          //       </CardFooter>
          //     </Card>
          //   </div>
          // </Col>
        }
      </Row>
    </div>
  )
}

export default ProfileView
