import React, { useState } from 'react'
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
import { Bar } from 'react-chartjs-2'
import UseContex from './ContexStore'
import ModalProject from './ModalProject'

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

  const { loading, error, data } = useQuery(userByid, { variables: { id: idUser }, fetchPolicy: 'no-cache' })

  const reqChart = useQuery(getLastThreeMonths, { variables: { id: idUser } })

  if (error) {
    console.log(error.graphQLErrors)
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
    // console.log(reqChart.data)
    gradientStroke.addColorStop(1, 'rgba(253,93,147,0.8)')
    gradientStroke.addColorStop(0, 'rgba(253,93,147,0)') // blue colors

    return {
      labels: reqChart.data.getLastThreeMonths.labels,
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
          data: reqChart.data.getLastThreeMonths.data
        }
      ]
    }
  }

  return (
    <UseContex.Provider value={{
      state: store,
      setState: (params) => {
        setStore(params)
      }
    }}
    >
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
                (reqChart.loading) ? (
                  <div style={{ paddingTop: '35%' }} className='d-flex justify-content-center  m-2'>
                    <BeatLoader
                      color='#4A90E2'
                      size={40}
                      loading
                    />
                  </div>
                )
                  : (
                    <div className='card-description'>
                      <h6 className='text-center'>Last Project</h6>
                      <div className='chart-area'>
                        <Bar
                          data={DataCharBar}
                          options={chartExample7}
                        />
                      </div>
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
    </UseContex.Provider>
  )
}

export default DetailIndex
