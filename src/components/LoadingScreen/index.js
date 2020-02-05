import React from 'react'
import Lottie from 'react-lottie'
import animationData from '../../assets/img/loading_Cir_stripe.json'
import './styles.css'

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
}

const LoadingScreen = (props) => {
    return (
        <div id="loader-wrapper" className='d-flex align-items-center'>
            <Lottie
              isClickToPauseDisabled
              options={defaultOptions}
              height='60%'
              width='60%'
            />
        </div>
    )
}

export default LoadingScreen
