import React, { useEffect, createContext, useState } from 'react'
import { Row, Col } from 'reactstrap'
import { DragDropContext } from 'react-beautiful-dnd'
import LandingTable from './landingTable'
import Sections from './sectionsSelector'
import LandingComposer from './landingComposer'
import initialDragObject from './initalDragObject'
import { randomId } from './utils'
import './styles.css'
import 'animate.css'
import 'react-block-ui/style.css'

export const LandingContext = createContext()

const LandingCreator = props => {
  const [dragListObject, setDragListObject] = useState(initialDragObject)
  const [listLanding, setListLanding] = useState({})
  const [isDraggingActive, setIsDraggingActive] = useState(false)
  const [idLandingSelected, setIdLandingSelected] = useState(null)

  const dragEnd = result => {

    // si no encuentra el landing no hacer nada mas
    if (!listLanding[idLandingSelected]) {
      return null
    }

    const { destination, source, draggableId } = result
    console.log('draggableId ', draggableId)
    console.log('destination ', destination)
    console.log('source ', source)

    if (!destination) {
      setIsDraggingActive(false)
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      setIsDraggingActive(false)
      return
    }

    const start = dragListObject.columns[source.droppableId]
    const finish = dragListObject.columns[destination.droppableId]

    if (start === finish) {
      const data2 = { ...dragListObject }
      const column = data2.columns[source.droppableId]
      const newTaskIds = Array.from(column.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)

      column.taskIds = newTaskIds
      setDragListObject({
        ...dragListObject,
        columns: { ...dragListObject.columns, [source.droppableId]: column }
      })
    } else {
      const startTaskIds = Array.from(start.taskIds)
      startTaskIds.splice(source.index, 1)
      const newStart = {
        ...start,
        taskIds: startTaskIds
      }

      const finishTaskIds = Array.from(finish.taskIds)
      finishTaskIds.splice(destination.index, 0, draggableId)
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

      // setListLanding
      // 'column-landing-composer'
      // dragListObject, setDragListObject]
      setListLanding({
        ...listLanding,
        [idLandingSelected]: {
          ...listLanding[idLandingSelected],
          composer: (source.droppableId === 'column-landing-composer') ? startTaskIds : finishTaskIds
        }
      })
    }
    setIsDraggingActive(false)
  }

  const onDragStart = () => {
    setIsDraggingActive(true)
  }

  return (
    <div className='content'>
      <Row>
        <Col xs='12'>
          <DragDropContext onDragEnd={dragEnd} onDragStart={onDragStart}>
            <LandingContext.Provider
              value={{
                dragListObject: dragListObject, // Objeto con la configuracion necesaria para el Drag an Drop de las columnas Sectios y Landing Selected
                setDragListObject: newValue => {
                  setDragListObject(newValue) // nuevo objecto actualizado desde SectionsSelector, se actualiza por peticiones de la query "component" y sus filtros
                },
                isDraggingActive: isDraggingActive, // el estado del DragDropContext
                listLanding: listLanding, // el array de landings
                idLandingSelected: idLandingSelected, // la id del landing seleccionado
                selectLanding: id => {
                  // dragListObject, setDragListObject
                  setDragListObject({
                    ...dragListObject,
                    columns: {
                      ...dragListObject.columns,
                      'column-landing-composer': {
                        ...dragListObject.columns['column-landing-composer'],
                        taskIds: (listLanding[id]) ? listLanding[id].composer : []
                      }
                    }
                  })
                  setIdLandingSelected(id)
                },
                addNewLanding: newLanding => {
                  // setListLanding
                  console.log(' newLanding ', newLanding)
                  setListLanding({
                    ...listLanding,
                    [newLanding.id]: newLanding
                  })
                },
                deleteLanding: idDelete => {
                  let copyLandings = {...listLanding}
                  delete copyLandings[idDelete]
                  setListLanding({
                    ...copyLandings
                  })
                },
                editLanding: (id, newValue) => {
                  setListLanding({
                    ...listLanding,
                    [id]: newValue
                  })
                }
              }}
            >
              <div className='w-100 px-3'>
                <Row>
                  <Col
                    xs={12}
                    md={5}
                    lg={5}
                    className=''
                    //style={{ minHeight: '100vh' }}
                  >
                    <div className='p-3'>
                      <Row>
                        <Col xs={12} className=''>
                          <LandingTable />
                        </Col>
                        <Col xs={12}><Sections /></Col>
                      </Row>
                    </div>
                  </Col>
                  <Col
                    xs={12}
                    md={7}
                    lg={7}
                    className='scrollerLandingCreator'
                    style={{
                      maxHeight: '1500px',
                      overflowY: 'auto',
                      overflowX: 'hidden',
                    }}
                  >
                    <div className='d-flex flex-row mt-3 mb-3'>
                      <h3 className='text-left mb-0'>Landing Composer</h3>
                    </div>
                    <div className='w-100'>
                      <div
                        className={
                          isDraggingActive ? ' landingComposerContainer ' : '  '
                        }
                      >
                        <LandingComposer />
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </LandingContext.Provider>
          </DragDropContext>
        </Col>
      </Row>
    </div>
  )
}

export default LandingCreator
