import React, { useState, useEffect } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
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
import { Bar } from 'react-chartjs-2'
import UseContex from './ContexStore'
import ModalProject from './ModalProject'
import AlertGlobal from '../../../components/AlertGlobal'
import Lottie from 'react-lottie'
import animationServerError from '../../../assets/lottie/serverError.json'

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

const getLastThreeMonths = gql`
  query getLastThreeMonths(
    $id : String!
){
  getLastThreeMonths(id : $id){
    labels
    data
  }
}
`

const DetailIndex = (props) => {
  const { idUser } = props.location.state
  const [store, setStore] = useState({
    idUser: idUser,
    idProject: '',
    modalVisible: false
  })

  const myInputAlert = React.useRef()
  const { loading, error, data } = useQuery(userByid, { variables: { id: idUser }, fetchPolicy: 'no-cache' })

  const reqChart = useQuery(getLastThreeMonths, { variables: { id: idUser } })

  if (error) {
    console.log(error)
  }

  const chartExample7 = () => {
    const suggestedMaxValue = reqChart.data.getLastThreeMonths.data.sort()[0]

    return {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: 'nearest',
        intersect: 0,
        position: 'nearest'
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            gridLines: {
              drawBorder: false,
              color: 'rgba(253,93,147,0.1)',
              zeroLineColor: 'transparent'
            },
            ticks: {
              suggestedMin: 10,
              suggestedMax: suggestedMaxValue,
              padding: 10,
              fontColor: '#9e9e9e'
            }
          }
        ],
        xAxes: [
          {
            gridLines: {
              drawBorder: false,
              color: 'rgba(253,93,147,0.1)',
              zeroLineColor: 'transparent'
            },
            ticks: {
              padding: 20,
              fontColor: '#9e9e9e'
            }
          }
        ]
      }
    }
  }

  const DataCharBar = (canvas) => {
    const ctx = canvas.getContext('2d')
    var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50)
    gradientStroke.addColorStop(1, 'rgba(253,93,147,0.8)')
    gradientStroke.addColorStop(0, 'rgba(253,93,147,0)') // blue colors

    return {
      labels: (reqChart.data) ? reqChart.data.getLastThreeMonths.labels : [],
      datasets: [
        {
          label: 'Projects',
          fill: true,
          backgroundColor: gradientStroke,
          hoverBackgroundColor: gradientStroke,
          borderColor: '#ff5991',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          data: (reqChart.data) ? reqChart.data.getLastThreeMonths.data : []
        }
      ]
    }
  }

  const contedCardUser = () => {
    let contenAvatar = null
    let contenChart = null
    if (!loading && data) {
      if (error) {
        contenAvatar = (
          <div>
            <img
              alt='...'
              className='avatar'
              src={require('assets/img/default-avatar.jpg')}
            />
            <h5 className='title'>User Not Found</h5>
          </div>
        )
      } else {
        contenAvatar = (
          <div>
            <Avatar
              className='avatar'
              name={`${data.userById.firstName} ${data.userById.lastName}`}
              size='124' email={data.userById.email} round
            />
            <h5 className='title'>{`${data.userById.firstName} ${data.userById.lastName}`}</h5>
            <p className='description'><strong>{data.userById.role.name}</strong></p>
          </div>
        )
      }
    } else {
      contenAvatar = (
        <div>
          <img
            alt='...'
            className='avatar'
            src={require('assets/img/default-avatar.jpg')}
          />
          <BeatLoader
            color='#4A90E2'
            size={40}
            loading
          />
        </div>
      )
    }

    if (!reqChart.loading && reqChart.data) {
      if (reqChart.error) {
        const defaultOptions = {
          loop: true,
          autoplay: true,
          animationData: animationServerError,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
          }
        }
        contenChart = (
          <div>
            <div className='d-flex justify-content-center p-2 m-2'>
              <Lottie
                isClickToPauseDisabled
                options={defaultOptions}
                height='70%'
                width='70%'
              />
            </div>
            <p>Server Error</p>
          </div>
        )
      } else {
        contenChart = (
          <div className='card-description'>
            <h6 className='text-center'>Last Project</h6>
            <div className='chart-area'>
              <Bar
                data={DataCharBar}
                options={() => chartExample7()}
              />
            </div>
          </div>
        )
      }
    } else {
      contenChart = (
        <div style={{ paddingTop: '35%' }} className='d-flex justify-content-center  m-2'>
          <BeatLoader
            color='#4A90E2'
            size={40}
            loading
          />
        </div>
      )
    }

    return (
      <div>
        {contenAvatar}
        {contenChart}
      </div>
    )
  }

  useEffect(() => {
    try {
      if (error) {
        let messageError = ''
        if (Array.isArray(error.graphQLErrors)) {
          if (error.graphQLErrors.length === 0) {
            messageError = error
          } else {
            messageError = error.graphQLErrors[0].message
          }
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
        myInputAlert.current.showAlert(options)
      }
    } catch (e) {
      console.log(e)
    }
  }, [error])

  const alertSwow = (options) => {
    myInputAlert.current.showAlert(options)
  }

  return (
    <UseContex.Provider value={{
      state: store,
      setState: (params) => {
        setStore(params)
      },
      actions: {
        alertSwow
      }
    }}
    >
      <AlertGlobal ref={myInputAlert} />
      <ModalProject />
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
              <div className='author'>
                <div className='block block-one' />
                <div className='block block-two' />
                <div className='block block-three' />
                <div className='block block-four' />
                {contedCardUser()}
              </div>
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
    </UseContex.Provider>
  )
}

export default DetailIndex
