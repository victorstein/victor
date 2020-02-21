import React, { useContext, useEffect, useState } from 'react'
import { Row, Col, Button, UncontrolledTooltip } from 'reactstrap'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { useLazyQuery } from '@apollo/react-hooks'
import styled from 'styled-components'
import { componentsSectionsGql as GET_COMPONENTS } from '../../../utils/Graphql/Queries'
import { LandingContext } from '../index'
import BlockUi from 'react-block-ui'
import BeatLoader from 'react-spinners/BeatLoader'
import CustomAlert from '../../../components/AlertGlobal'
import '../styles.css'

const componentsSelector = () => {
  const { listLanding, idLandingSelected } = useContext(
    LandingContext
  )
  const empty =
    listLanding.length === 0 ||
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
          {empty ? <WarningComponent /> : <MainComponent />}
        </div>
      </BlockUi>
    </div>
  )
}

const stringCut = value => {
  if (value) {
    if (value.length > 40) {
      return value.substring(0, 39) + ' ...'
    }
  }
  return value
}

const MainComponent = () => {
  const {
    listLanding,
    idLandingSelected,
    dragListObject,
    setDragListObject,
    manageLandingContent,
    listFinalLandingCreator
  } = useContext(LandingContext)
  const [loadComponents, { error, loading, data }] = useLazyQuery(
    GET_COMPONENTS('total pages docs { id title image }'),
    { fetchPolicy: 'no-cache' }
  )

  const tasks = dragListObject.columns['column-section'].taskIds.map( (taskId) => {
      return dragListObject.tasks[taskId]
    }
  )

  const [pagination, setPagination] = useState({ perPage: 10, page: 1 })
  const [filters, setFilters] = useState(null)

  useEffect(() => {
    loadComponents({ variables: pagination })
  }, [])

  useEffect(() => {
    if (data && !error && !loading) {
      let newDragObject = { ...dragListObject }
      const currentTask = []
      // obtener las task actuales en el objeto "dragListObject"
      // guardarlas en currentTask
      for (let [key, value] of Object.entries(newDragObject.tasks)) {
        //console.log(`${key}: ${value}`)
        currentTask.push({
          id: value.id,
          image: value.image,
          title: value.title,
        })
      }
      let queryIds = []
      console.log(' currentTask ', currentTask)
      console.log(' Query ',  data.components.docs)
      // si currentTask esta vacio
      // agregar directamente toda la data que viene de la query "components" a las task, tambien a la columna "Column-Section"
      if (currentTask.length < 1) {
        data.components.docs.forEach(valueDocs => {
          currentTask.push(valueDocs)
          queryIds.push(valueDocs.id)
        })
        newDragObject.columns['column-section'].taskIds = [...queryIds]
      } else {
        // si actualmente ya hay tasks entonces comparar con las que vienen en la query "components"
        // solo agregar aquellas que no estan en las tasks actuales
        // esto se hace, porque la query component es paginada y filtrada, entonces puede venir data repetida
        const newData = []
        data.components.docs.forEach(valueDocs => {
          if (!newDragObject.tasks[valueDocs.id]) {
            newData.push(valueDocs)
          }
          queryIds.push(valueDocs.id)
        })
        console.log(' new Data', newData)
        currentTask.concat(newData)
      }

      // el objeto de tasks no es un array de objetos
      // guardar en formato:
      /*
        tasks: {
          '1a': { id: '1a', content: '1' },
          '2a': { id: '2a', content: '2' },
          '3a': { id: '3a', content: '3' }
        }
      */
      
      let idsCurrentTask = [] // para luego ver la diferencia con las ids de la query
      newDragObject.tasks = {}
      currentTask.forEach((value, index) => {
        newDragObject.tasks = {
          ...newDragObject.tasks,
          [value.id]: value
        }
        idsCurrentTask.push(value.id)
      })

      // Obtener las task que estan en LandingComposer
      // Las ids que obtengamos, seran ids que no se van a agregar a column-section
      // porque son ids que ya fueron Drag a la otra columna column-landing-composer
      const listTasksLandingComposer = dragListObject.columns['column-landing-composer'].taskIds.map(
        taskId => dragListObject.tasks[taskId]
      )

      console.log(' tasksLandingComposer ', listTasksLandingComposer)
      // Ahora hay que agregar la data que viene de la query "component" a la columna de sections
      // esta columna es la draggable, entonces siempre que no existan filtros hacer un push de la nueva data
      // si hay filtros sobrescribir con la data de la query
      if (filters) {
      } else {
        
          console.log(' idsCurrentTask ', idsCurrentTask)
          // Buscar las ids de la query que aun no estan en CurrentTask
          const difference_with_query = queryIds.filter(x => !idsCurrentTask.includes(x))
          console.log(' difference_with_query ', difference_with_query)

          idsCurrentTask.concat(difference_with_query)

          // Buscar las ids actuales que no estan en la columna de "Landing-Composer"
          const difference_with_column_composer = queryIds.filter(x => !listTasksLandingComposer.includes(x))

          console.log('difference_with_column_composer ', difference_with_column_composer)

          newDragObject.columns['column-section'].taskIds = difference_with_column_composer

      }
      console.log(' newDragObject ', newDragObject)
      setDragListObject(newDragObject)
    }
  }, [data])

  const addToLandingComposer = (index, draggableId) => {

    let currentLanding = null
    const newListLanding = [...listLanding]
    newListLanding.forEach((value, indexLanding) => {
      if(value.id === indexLanding) {
        currentLanding = value
      }
    })

    // si no encuentra el landing no hacer nada mas
    if(!currentLanding) {
      return null
    }

    let draggingDiv = document.getElementById('draggingDiv_' + index)
    draggingDiv.classList.add('animated')
    draggingDiv.classList.add('fadeOut')

    console.log('idLandingSelected ', idLandingSelected)
    console.log('draggableId ', draggableId)
    console.log('index ', index)
    console.log('listLanding ', listLanding)

    setTimeout(() => {
      const start = dragListObject.columns['column-section']
      const finish = dragListObject.columns['column-landing-composer']
      const startTaskIds = Array.from(start.taskIds)
        startTaskIds.splice(index, 1)
        const newStart = {
          ...start,
          taskIds: startTaskIds
        }
        const finishTaskIds = Array.from(finish.taskIds)
        finishTaskIds.push(draggableId)
        const newFinish = {
          ...finish,
          taskIds: finishTaskIds
        }
        setDragListObject({
          ...dragListObject,
          columns: {
            ...dragListObject.columns,
            [newStart.id]: newStart,
            [newFinish.id]: newFinish
          }
        })
        
        let newListFinalLandingCreator = {...listFinalLandingCreator}
        newListFinalLandingCreator[idLandingSelected] = {
          ...currentLanding,
          listIdSections: finishTaskIds
        }
        manageLandingContent(newListFinalLandingCreator)
    }, 700)
    
    
  }

  return (
    <BlockUi
      tag='div'
      blocking={loading}
      id='normalLandingChildren'
      loader={<BeatLoader size={15} loading color='#00f2c3' />}
    >
      {/*<CustomAlert message={error} />*/}
      <div
        style={{ height: loading ? '350px' : 'auto', width: '100%', minHeight: '350px' }}
        className='d-flex justify-content-center col-12'
      >
        <Droppable droppableId={dragListObject.columns['column-section'].id}>
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(providedDraggable) => (
                    <div
                      {...providedDraggable.draggableProps}
                      {...providedDraggable.dragHandleProps}
                      ref={providedDraggable.innerRef}
                      //isDragging={snapshot.isDragging}
                      className='mb-2 mr-1'
                      //style={{ backgroundColor: `${props => (props.isDragging ? 'red' : 'blue')}` }}
                    >
                      <Row className='rowDraggable p-2 bg-default' id={'draggingDiv_'+index}>
                        <Col
                          xs={12}
                          md={7}
                          className='d-flex justify-content-center align-items-center'
                        >
                          <img src={task.image} style={{ maxHeight: '80px' }} />
                        </Col>

                        <Col xs={12} md={5}>
                          <Row>
                            <Col
                              xs={12}
                              className='p-0 m-0 d-flex justify-content-start'
                            >
                              <p
                                className='text-white mr-1 mb-0'
                                id={'title_' + index}
                              >
                                {stringCut(task.title)}
                              </p>
                              <UncontrolledTooltip
                                placement='top'
                                target={'title_' + index}
                                delay={0}
                              >
                                {task.title}
                              </UncontrolledTooltip>
                              <Button
                                className='btn-icon btn-simple m-0 animation-on-hover ml-auto'
                                id={'btnDragg_' + index}
                                color='info'
                                size='sm'
                                onClick={() => addToLandingComposer(index, task.id)}
                              >
                                <i className='fa fa-plus'></i>
                              </Button>
                              <UncontrolledTooltip
                                placement='top'
                                target={'btnDragg_' + index}
                                delay={0}
                              >
                                Add Section to Landing Composer
                              </UncontrolledTooltip>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </div>
    </BlockUi>
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
