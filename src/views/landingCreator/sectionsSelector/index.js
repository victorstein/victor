import React, { useContext, useEffect, useState } from 'react'
import { Row, Col, Button } from 'reactstrap'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { LandingContext } from '../index'
import BlockUi from 'react-block-ui'
import '../styles.css'

const componentsSelector = () => {
  const { listLanding, idLandingSelected, dragListObject } = useContext(LandingContext)
  //const [listSections, setListSections] = useState([])
  const empty = listLanding.length === 0 || idLandingSelected === null || idLandingSelected === undefined

  const tasks = dragListObject.columns['column-section'].taskIds.map( taskId => dragListObject.tasks[taskId] )
  console.log('tasks Sections', tasks)
  const Loader = empty ? <div></div> : <div>Loader</div>

  return (
    <div className='w-100'>
      <div className='d-flex flex-row'>
        <h3 className='text-left mb-0'>Sections</h3>
      </div>

      <BlockUi
        tag='div'
        blocking={empty}
        id={ (empty) ? 'landingCreatorBlock' : 'normalLanding' }
        loader={Loader}
      >
      <div 
        style={{ minHeight: '350px', width: '100%' }}
      >
        { empty ? <WarningComponent /> :
          <Droppable droppableId={dragListObject.columns['column-section'].id} >
            {
              provided => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                   {
                    tasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                      { (providedDraggable, snapshot) => (
                        <div
                          ref={providedDraggable.innerRef}
                          {...providedDraggable.draggableProps}
                          {...providedDraggable.dragHandleProps}
                          className='border p-3 mb-3'
                        >
                         <h1>{task.content}</h1>
                        </div>
                      )}
                      </Draggable>
                    ))
                   }
                </div>
              )
            }
          </Droppable>
        }
      </div>
        
      </BlockUi>

    </div>
  )
}

const MainComponent = () => {
  return (
    <Row>
      <Col>
      </Col>
    </Row>
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
