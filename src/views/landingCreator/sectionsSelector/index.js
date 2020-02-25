import React, { useContext } from 'react'
import { Button } from 'reactstrap'
import { LandingContext } from '../index'
import BlockUi from 'react-block-ui'
import { objectToArray } from '../utils'
import Sections from './sections'
import '../styles.css'

const componentsSelector = () => {
  const { listLanding, idLandingSelected } = useContext(
    LandingContext
  )
  const mapLandings = objectToArray(listLanding)
  const empty =
    mapLandings.length === 0 ||
    idLandingSelected === null ||
    idLandingSelected === undefined

  const Loader = empty ? <div></div> : <div>Loader</div>

  return (
    <div className='w-100'>
      <div className='d-flex flex-row mb-3'>
        <h3 className='text-left mb-0'>Sections</h3>
      </div>

      <BlockUi
        tag='div'
        blocking={empty}
        id={empty ? 'landingCreatorBlock' : 'normalLanding'}
        loader={Loader}
      >
        <div
          style={{
            minHeight: '350px',
            width: '100%',
            maxHeight: '600px',
            overflow: 'auto'
          }}
          className='scrollerLandingCreator'
        >
          {empty ? <WarningComponent /> : <Sections />}
        </div>
      </BlockUi>
    </div>
  )
}

const WarningComponent = () => {
  return (
    <div
      style={{ height: '350px', width: '100%' }}
      className='d-flex align-items-center justify-content-center'
    >
      <Button className='btn-round' color='danger' size='sm'>
        <i className='tim-icons icon-alert-circle-exc' /> Firts select one
        landing page
      </Button>
    </div>
  )
}

export default componentsSelector
