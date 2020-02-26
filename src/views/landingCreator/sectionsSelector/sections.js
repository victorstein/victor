import React, { useContext, useEffect, useState } from 'react'
import { Row, Col, Button, UncontrolledTooltip } from 'reactstrap'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { useLazyQuery } from '@apollo/react-hooks'
import { componentsSectionsGql as GET_COMPONENTS } from '../../../utils/Graphql/Queries'
import { LandingContext } from '../index'
import BlockUi from 'react-block-ui'
import BeatLoader from 'react-spinners/BeatLoader'
import FiltersSections from './filtersSections'
import ServerError from '../serverError'
import CustomAlert from '../../../components/AlertGlobal'
import '../styles.css'

const stringCut = value => {
  if (value) {
    if (value.length > 40) {
      return value.substring(0, 39) + ' ...'
    }
  }
  return value
}

const Sections = () => {
  const {
    listLanding,
    idLandingSelected,
    dragListObject,
    setDragListObject,
    setListLanding,
  } = useContext(LandingContext)
  const [loadComponents, { error, loading, data }] = useLazyQuery(
    GET_COMPONENTS('total pages docs { id title image }'),
    { fetchPolicy: 'no-cache' },
  )

  const tasks = dragListObject.columns['column-section'].taskIds.map(taskId => {
    return dragListObject.tasks[taskId]
  })

  const [pagination, setPagination] = useState({ perPage: 10, page: 1 })
  const [filters, setFilters] = useState(null)
  const [totalData, setTotalData] = useState(0)

  // Lanzar query al montar el componente
  useEffect(() => {
    loadComponents({ variables: { ...pagination, filters: filters } })
  }, [])

  // Lanzar query al cambiar el landing seleccionado
  // reset la paginacion
  useEffect(() => {
    if (!loading) {
      setPagination({ perPage: 10, page: 1 })
      if (!idLandingSelected) {
        setFilters(null)
      }
      if (idLandingSelected) {
        loadComponents({
          variables: { perPage: 10, page: 1, filters: filters },
        })
      }
    }
  }, [idLandingSelected])

  useEffect(() => {
    if (data && !error && !loading) {
      setTotalData(data.components.total)
      reorderDragList(data)
    }
  }, [data, loading])

  const submitFilter = () => {
    // reset paginacion
    setPagination({ perPage: 10, page: 1 })
    loadComponents({ variables: { perPage: 10, page: 1, filters: filters } })
  }

  const reorderDragList = data => {
    const { page } = pagination
    let newDragObject = { ...dragListObject }

    let queryIds = []
    data.components.docs.forEach(valueDocs => {
      newDragObject.tasks = {
        ...newDragObject.tasks,
        [valueDocs.id]: valueDocs,
      }
      queryIds.push(valueDocs.id)
    })

    const listTasksComposer = newDragObject.columns[
      'column-landing-composer'
    ].taskIds.map(taskId => newDragObject.tasks[taskId].id)

    // si estamos en una pagina superior a 1
    // entonces nos interesa sumar la data actual de column-section y la data de la query
    if (page > 1) {
      console.log('page ', page)
      const listTasksSection = dragListObject.columns[
        'column-section'
      ].taskIds.map(taskId => {
        return newDragObject.tasks[taskId].id
      })

      const differencePrevPage = listTasksSection.filter(
        x => !queryIds.includes(x),
      )
      if (differencePrevPage.length > 0) {
        queryIds = queryIds.concat(differencePrevPage)
      }
    }

    // Buscar las ids actuales que no estan en la columna de "Landing-Composer"
    const difference = queryIds.filter(x => !listTasksComposer.includes(x))

    newDragObject.columns['column-section'].taskIds = difference

    setDragListObject(newDragObject)
  }

  const addToLandingComposer = (index, draggableId) => {
    // si no encuentra el landing no hacer nada mas
    if (!listLanding[idLandingSelected]) {
      return null
    }

    const draggingDiv = document.getElementById('draggingDiv_' + index)
    draggingDiv.classList.add('animated')
    draggingDiv.classList.add('fadeOut')

    setTimeout(() => {
      const start = dragListObject.columns['column-section']
      const finish = dragListObject.columns['column-landing-composer']
      const startTaskIds = Array.from(start.taskIds)
      startTaskIds.splice(index, 1)
      const newStart = {
        ...start,
        taskIds: startTaskIds,
      }
      const finishTaskIds = Array.from(finish.taskIds)
      finishTaskIds.push(draggableId)
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

  const setValueFilters = newValue => {
    setPagination({ perPage: 10, page: 1 })
    setFilters(newValue)
  }

  const getMoreSections = () => {
    const totalPages = Math.ceil(totalData / 10)
    const nextPage = pagination.page + 1
    if (nextPage <= totalPages) {
      const newPagination = { perPage: 10, page: nextPage }
      setPagination(newPagination)
      loadComponents({ variables: { ...newPagination, filters: filters } })
    }
  }

  if (error) {
    return <ServerError />
  }

  return (
    <React.Fragment>
      {totalData > 0 && (
        <FiltersSections
          getMoreSections={getMoreSections}
          setFilter={setValueFilters}
          submitFilter={submitFilter}
          loading={loading}
        />
      )}
      <div
        style={{
          minHeight: '350px',
          width: '100%',
          maxHeight: '600px',
          overflow: 'auto',
        }}
        className='scrollerLandingCreator'
      >
        <BlockUi
          tag='div'
          blocking={loading}
          id='normalLandingChildren'
          loader={<BeatLoader size={15} loading color='#00f2c3' />}
        >
          {/*<CustomAlert message={error} />*/}

          <div
            style={{
              height: loading ? '350px' : 'auto',
              width: '100%',
              minHeight: '350px',
            }}
            className='d-flex justify-content-center col-12'
          >
            <Droppable
              droppableId={dragListObject.columns['column-section'].id}
            >
              {provided => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {tasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {providedDraggable => (
                        <div
                          {...providedDraggable.draggableProps}
                          {...providedDraggable.dragHandleProps}
                          ref={providedDraggable.innerRef}
                          className='mb-2 mr-1'
                        >
                          <Row
                            className='rowDraggable p-2 bg-default'
                            id={'draggingDiv_' + index}
                          >
                            <Col
                              xs={12}
                              md={7}
                              className='d-flex justify-content-center align-items-center'
                            >
                              <img
                                src={task.image}
                                style={{ maxHeight: '80px' }}
                              />
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
                                    onClick={() =>
                                      addToLandingComposer(index, task.id)
                                    }
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
      </div>
    </React.Fragment>
  )
}

export default Sections
