import React, { useEffect } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { BeatLoader } from 'react-spinners'
import { Bar } from 'react-chartjs-2'
import Lottie from 'react-lottie'
import animationServerError from '../../assets/lottie/serverError.json'

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

const ChartProfile = (props) => {
  const { data, loading, error } = useQuery(getLastThreeMonths, { variables: { id: props.id } })

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
      props.actionsAlertGloval(options)
    }
  }, [error])

  const chartExample7 = () => {
    const suggestedMaxValue = data.getLastThreeMonths.data.sort()[0]

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

    const optionsChact = {
      labels: (data) ? data.getLastThreeMonths.labels : [],
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
          data: (data) ? data.getLastThreeMonths.data : []
        }
      ]
    }

    return (optionsChact)
  }

  const conted = () => {
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
          <div>
            <div className='pt-4 d-flex justify-content-center'>
              <Lottie
                isClickToPauseDisabled
                options={defaultOptions}
                height='50%'
                width='50%'
              />
            </div>
            <p className='text-center'>Server Error</p>
          </div>
        )
      }

      return (
        <div className='card-description'>
          <h6 className='text-center'>Last Project</h6>
          <div className='chart-area'>
            <Bar
              data={(e) => DataCharBar(e)}
              options={() => chartExample7()}
            />
          </div>
        </div>
      )
    } else {
      return (
        <div style={{ paddingTop: '5%' }} className='d-flex justify-content-center pl-2 pr-2 m-2 '>
          <BeatLoader
            color='#4A90E2'
            size={20}
            loading
          />
        </div>
      )
    }
  }

  return (
    <div>
      {conted()}
    </div>
  )
}

export default ChartProfile
