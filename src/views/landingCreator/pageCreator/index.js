import React, { useState, useContext } from 'react'
import { Row, Col, Button, Table } from 'reactstrap'
import BlockUi from 'react-block-ui'
import Lottie from 'react-lottie'
import NotepadLoading from '../../../assets/lottie/notepadLoading.json'
import { LandingContext } from '../index'

const LandingName = () => {
  const { listLanding, idLandingSelected, dragListObject } = useContext(LandingContext)
  const empty = listLanding.length === 0 || idLandingSelected === null || idLandingSelected === undefined

  const tasks = dragListObject.columns['column-landing'].taskIds.map( taskId => dragListObject.tasks[taskId] )
  console.log('tasks Landing', tasks)
  let border = empty ? ' border border-danger ' : ' border border-success '
  if(tasks.length < 1 && !empty) {
    border = ' border border-warning '
  }
  const Loader = empty ? <div></div> : <div>Loader</div>

  return (
    <div className='w-100'>
    <BlockUi
        tag='div'
        blocking={empty}
        id={ (empty) ? 'landingCreatorBlock' : 'normalLanding' }
        loader={Loader}
      >
      <div className={border + ' w-100 p-2'} style={{ minHeight: '150px' }}>
      <div className='d-flex flex-row'>
        <h3 className='text-left mb-0'>{}</h3>
        {empty && <WarningComponentEmpty /> 
        }
        { (tasks.length < 1 && !empty) && <WarningComponentSection /> 
        }
      </div>
      <br />
      </div>
      
      
      </BlockUi>
    </div>
  )
}

const WarningComponentEmpty = ({taskLength}) => {
  return (
    <div
      style={{ height: '250px', width: '100%' }}
      className='d-flex align-items-center justify-content-center'
    >
      <Button className='btn-round' color='danger' size='sm'>
        <i className='tim-icons icon-alert-circle-exc' /> Firts select one
        landing page
      </Button>
    </div>
  )
}

const WarningComponentSection = ({taskLength}) => {
  return (
    <div
      style={{ height: '250px', width: '100%' }}
      className='d-flex align-items-center justify-content-center'
    >
      <Button className='btn-round' color='warning' size='sm'>
        <i className='tim-icons icon-alert-circle-exc' /> Select Sections
      </Button>
    </div>
  )
}

const EmptyComponent = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: NotepadLoading,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    }
  }
  return (
    <div className='d-flex align-items-center'>
      <div className='d-flex flex-column'>
        <Lottie
          isClickToPauseDisabled
          options={defaultOptions}
          height='80%'
          speed={0.75}
          width='80%'
        />
        <div
          className='d-flex align-items-center justify-content-center'
          style={{
            position: 'absolute',
            left: '42%',
            top: '10%',
            marginLeft: '-50px'
          }}
        >
          <Button className='btn-round' color='warning' size='sm'>
            <i className='tim-icons icon-alert-circle-exc' /> Firts select one
            landing page
          </Button>
        </div>
      </div>
    </div>
  )
}

export default LandingName
