import React, { useContext, useEffect, useState } from 'react'
import { Row, Col } from 'reactstrap'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { LandingContext } from '../index'
import EmptyComponent from './empty'

const LandingComposer = props => {
  const {
    dragListObject,
    idLandingSelected,
    setDragListObject,
    listLanding
  } = useContext(LandingContext)

  const tasks = dragListObject.columns['column-landing-composer'].taskIds.map(
    taskId => dragListObject.tasks[taskId]
  )

  const showEmpty =
    (Object.keys(listLanding).length < 1) ||
    idLandingSelected === null ||
    idLandingSelected === undefined ||
    tasks.length < 1

  useEffect(() => {
    //loadComponents({ variables: { perPage: 10, page: 1 } })
  }, [])

  return (
    <>
      <div className='h-100'>
        <div
          style={{ minHeight: '250px', width: '100%' }}
          className={(showEmpty ? ' ' : ' pb-5 ') + ' h-100'}
        >
          <Droppable
            droppableId={dragListObject.columns['column-landing-composer'].id}
          >
            {provided => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {showEmpty && <EmptyComponent />}
                {tasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(providedDraggable, snapshot) => (
                      <div
                        {...providedDraggable.draggableProps}
                        {...providedDraggable.dragHandleProps}
                        ref={providedDraggable.innerRef}
                        className='mb-2'
                      >
                        <div className=' p-2 bg-default animated fadeInDown'>
                          <Row>
                            <Col
                              xs={12}
                              md={8}
                              className='d-flex justify-content-start align-items-center'
                            >
                              <img
                                src={task.image}
                                style={{ maxHeight: '250px' }}
                              />
                            </Col>
                          </Row>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </>
  )
}

export default LandingComposer
