import React from 'react'
import { Button } from 'reactstrap'
import Lottie from 'react-lottie'
import ServerErrorLottie from '../../assets/lottie/serverError.json'

const ServerError = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: ServerErrorLottie,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }
  return (
    <div
      style={{ height: '350px', width: '100%' }}
      className='d-flex flex-column align-items-center justify-content-center'
    >
      <Button
        className='btn-round mb-3 d-block mt-3'
        disabled
        color='danger'
        size='sm'
      >
        <i className='tim-icons icon-alert-circle-exc' /> SERVER ERROR
      </Button>
      <Lottie
        isClickToPauseDisabled
        options={defaultOptions}
        height='100%'
        width='70%'
      />
    </div>
  )
}

export default ServerError
