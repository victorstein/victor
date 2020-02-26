import React, { useContext } from 'react'
import { Row, Col, Button, UncontrolledTooltip } from 'reactstrap'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { LandingContext } from '../index'
import EmptyComponent from './empty'

const LandingComposer = props => {
  const {
    dragListObject,
    idLandingSelected,
    setDragListObject,
    listLanding,
  } = useContext(LandingContext)

  const tasks = dragListObject.columns['column-landing-composer'].taskIds.map(
    taskId => dragListObject.tasks[taskId],
  )

  const showEmpty =
    Object.keys(listLanding).length < 1 ||
    idLandingSelected === null ||
    idLandingSelected === undefined ||
    tasks.length < 1

  const removeItemLandingComposer = (index, taskId) => {
    // si no encuentra el landing no hacer nada mas
    if (!listLanding[idLandingSelected]) {
      return null
    }

    const composerDiv = document.getElementById('composerDiv_' + index)
    composerDiv.classList.add('animated')
    composerDiv.classList.add('fadeOut') 
    composerDiv.classList.add('faster')

    setTimeout(() => {
      const start = dragListObject.columns['column-landing-composer']
      const finish = dragListObject.columns['column-section']
      const startTaskIds = Array.from(start.taskIds)
      startTaskIds.splice(index, 1)
      const newStart = {
        ...start,
        taskIds: startTaskIds,
      }
      const finishTaskIds = Array.from(finish.taskIds)
      finishTaskIds.unshift(taskId)
      const newFinish = {
        ...finish,
        taskIds: finishTaskIds,
      }
      setDragListObject({
        ...dragListObject,
        columns: {
          ...dragListObject.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
      })

      // setListLanding
      setListLanding({
        ...listLanding,
        [idLandingSelected]: {
          ...listLanding[idLandingSelected],
          composer: finishTaskIds,
        },
      })
    }, 400)
  }

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
                        <div
                          id={'composerDiv_' + index}
                          className=' p-2 bg-default animated fadeInDown faster'
                        >
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
                            <Col xs={12} md={4} className='d-flex flex-column'>
                              <Button
                                className='btn-icon btn-simple m-0 animation-on-hover ml-auto'
                                id={'btnComposer_' + index}
                                color='danger'
                                size='sm'
                                onClick={() =>
                                  removeItemLandingComposer(index, task.id)
                                }
                              >
                                <i className='fa fa-times' />
                              </Button>
                              <UncontrolledTooltip
                                placement='top'
                                target={'btnComposer_' + index}
                                delay={0}
                              >
                                Remove from composer
                              </UncontrolledTooltip>
                              <p className='mt-2 mb-0'>{task.title}</p>
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
