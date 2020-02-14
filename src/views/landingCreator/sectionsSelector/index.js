import React, { useContext, useEffect, useState } from 'react'
import { Row, Col, Button } from 'reactstrap'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { useLazyQuery } from "@apollo/react-hooks"
import { componentsSectionsGql as GET_COMPONENTS } from '../../../utils/Graphql/Queries'
import { LandingContext } from '../index'
import BlockUi from 'react-block-ui'
import BeatLoader from 'react-spinners/BeatLoader'
import '../styles.css'

const componentsSelector = () => {
  const { listLanding, idLandingSelected, dragListObject } = useContext(
    LandingContext,
  )
  //const [listSections, setListSections] = useState([])
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
        <div style={{ minHeight: '350px', width: '100%' }}>
          {empty ? <WarningComponent /> : <MainComponent />}
        </div>
      </BlockUi>
    </div>
  )
}

const MainComponent = () => {
  const { listLanding, idLandingSelected, dragListObject, setDragListObject } = useContext(
    LandingContext
  )
  const [loadComponents, { error, loading, data }] = useLazyQuery(
    GET_COMPONENTS('total pages docs { id title image }'), { fetchPolicy: 'no-cache' }
  )
  const tasks = dragListObject.columns['column-section'].taskIds.map(
    taskId => dragListObject.tasks[taskId]
  )

  const [filters, setFilters] = useState(null)

  useEffect(() => {
    loadComponents({ variables: { perPage: 10, page: 1 } })
  }, [])

  useEffect(() => {
    if(data && !error && !loading) {
      let newDragObject = {...dragListObject}
      const currentTask = []
      // obtener las task actuales en el objeto "dragListObject"
      // guardarlas en currentTask
      for (let [key, value] of Object.entries(newDragObject.tasks)) {
        //console.log(`${key}: ${value}`)
        currentTask.push({
          id: value.id,
          //content: value.content,
          image: value.image,
          title: value.title
        })
      }
      // si currentTask esta vacio
      // agregar directamente tada la data que viene de la query "components"
      if (currentTask.length < 1) {
        data.components.docs.forEach(element => {
          currentTask.push(element)
        })
      } else {
        // si actualmente ya hay tasks entonces comparar con las que vienen en la query "components"
        // solo agregar aquellas que no estan en las tasks actuales
        // esto se hace, porque la query component es paginada y filtrada, entonces puede venir data repetida
        const newData = []
        currentTask.forEach((valueCurrent) => {
          data.components.docs.forEach(valueDocs => {
            if (valueCurrent.id !== valueDocs.id) {
              newData.push(valueDocs)
            }
          })
        })
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
      newDragObject.tasks = {}
      currentTask.forEach((value, index) => {
        newDragObject.tasks = {
          ...newDragObject.tasks,
          [value.id]: value
        }
      })
      // Ahora hay que agregar la data que viene de la query "component" a la columna de sections
      // esta columna es la draggable, entonces siempre que no existan filtros hacer un push de la nueva data
      // si hay filtros sobrescribir con la data de la query
      if(filters) {

      } else {
        const newIds = data.components.docs.map((value) => {
          return value.id
        })
        newDragObject.columns['column-section'].taskIds = [...newDragObject.columns['column-section'].taskIds].concat(newIds)
      }
      setDragListObject(newDragObject)
    } 
  }, [data])

  return (
    <BlockUi
      tag='div'
      blocking={loading}
      id='normalLandingChildren'
      loader={<BeatLoader size={15} loading color='#00f2c3' />}
    >
    <div
      style={{ height: (loading) ? '350px' : 'auto', width: '100%' }}
      className='d-flex align-items-center justify-content-center'
    >
    <Droppable droppableId={dragListObject.columns['column-section'].id}>
    {provided => (
      <div {...provided.droppableProps} ref={provided.innerRef}>
        {tasks.map((task, index) => (
          <Draggable key={task.id} draggableId={task.id} index={index}>
            {(providedDraggable, snapshot) => (
              <div
                ref={providedDraggable.innerRef}
                {...providedDraggable.draggableProps}
                {...providedDraggable.dragHandleProps}
                className='mb-2'
              >
              <Row className='rowDraggable p-2 bg-black'>

                <Col xs={12} md={8} className='d-flex justify-content-center align-items-center'>
                  <img src={task.image} style={{ maxHeight: '80px' }} />
                </Col>
                
                <Col xs={12} md={4}>
                  <Row>
                    <Col xs={12} className='m-0 d-flex justify-content-end'>
                      <Button className='btn-icon btn-simple m-0 animation-on-hover' id={'btnDragg ' + index} color='info' size='sm'>
                        <i className='fa fa-plus'></i>
                      </Button>
                    </Col>
                    <Col xs={12}>
                      <p>
                      {
                        tasks.title
                      }
                      </p>
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
