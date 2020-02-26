import React, { useContext } from 'react'
import { Button } from 'reactstrap'
import BlockUi from 'react-block-ui'
import { LandingContext } from '../index'

const Empty = (props) => {
  const { listLanding, idLandingSelected, dragListObject } = useContext(
    LandingContext
  )
  const empty =
  (Object.keys(listLanding).length < 1) ||
  idLandingSelected === null ||
  idLandingSelected === undefined

  const tasks = dragListObject.columns['column-landing-composer'].taskIds.map(
    taskId => dragListObject.tasks[taskId]
  )
  let border = ''
  if(empty) {
    border = ' border border-danger '
  } else if(tasks.length < 1 && !empty){
    border = ' border border-warning '
  }

  const Loader = empty ? <div></div> : <div>Loader</div>

  return (
    <div className='w-100 h-100'>
      <BlockUi
        tag='div'
        blocking={empty}
        id={empty || tasks.length < 1 ? 'landingCreatorBlock' : 'normalLanding'}
        loader={Loader}
        className='h-100'
      >
        <div className={border + ' w-100 p-2 h-100'} style={{ minHeight: '150px' }}>
          <div className='d-flex flex-row'>
            {empty && <WarningComponentEmpty />}
            {tasks.length < 1 && !empty && <WarningComponentSection />}
          </div>
        </div>
      </BlockUi>
    </div>
  )
}

const WarningComponentEmpty = () => {
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

const WarningComponentSection = () => {
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

export default Empty

