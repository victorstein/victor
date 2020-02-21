import React, { useEffect, createContext, useState } from 'react'
import { Row, Col } from 'reactstrap'
import { DragDropContext } from 'react-beautiful-dnd'
import LandingTable from './landingTable'
import Sections from './sectionsSelector'
import LandingComposer from './landingComposer'
import initialDragObject from './initalDragObject'
import './styles.css'
import 'animate.css'
import 'react-block-ui/style.css'

export const LandingContext = createContext()

const LandingCreator = props => {
  const [idSite, setIdSite] = useState(null)
  const [dragListObject, setDragListObject] = useState(initialDragObject)
  const [listLanding, setListLanding] = useState([]) 
  const [listFinalLandingCreator, setListFinalLandingCreator] = useState({})
  const [isDraggingActive, setIsDraggingActive] = useState(false)
  const [idLandingSelected, setIdLandingSelected] = useState(null)

  useEffect(() => {
    setIdSite(props.id)
  }, [])
  useEffect(() => {
    setIdSite(props.id)
  }, [props.id])

  const dragEnd = result => {

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
        columns: { ...dragListObject.columns, [source.droppableId]: column },
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

      let newListFinalLandingCreator = {...listFinalLandingCreator}
      if(source.droppableId === 'column-landing-composer') {
        newListFinalLandingCreator[idLandingSelected] = {
          ...currentLanding,
          listIdSections: startTaskIds
        }
      } else {
        newListFinalLandingCreator[idLandingSelected] = {
          ...currentLanding,
          listIdSections: finishTaskIds
        }
      }
        
      setListFinalLandingCreator(newListFinalLandingCreator)

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
                listFinalLandingCreator: listFinalLandingCreator,
                setListFinalLandingCreator: value => {
                  setListFinalLandingCreator(value)
                },
                isDraggingActive: isDraggingActive, // el estado del DragDropContext
                id: idSite, // la id del proyecto
                listLanding: listLanding, // el array de landings
                idLandingSelected: idLandingSelected, // la id del landing seleccionado
                selectLanding: id => {
                  // guardar el id de un landing a seleccionar
                  if(id !== idLandingSelected) {
                    console.log(' selectLanding ', id)
                    setIdLandingSelected(id)
                    const newDragListObject = {...dragListObject}
                    newDragListObject.columns['column-landing-composer'].taskIds = []
                    const taskIdsSelectLanding = listFinalLandingCreator[id]
                    console.log('taskIdsSelectLanding ', taskIdsSelectLanding)
                    if(taskIdsSelectLanding) {
                      console.log(' taskIdsSelectLanding.taskIds ', taskIdsSelectLanding.listIdSections)
                      newDragListObject.columns['column-landing-composer'].taskIds = taskIdsSelectLanding.listIdSections
                    }
                    setDragListObject(newDragListObject)
                  }    
                },
                addNewLanding: newLanding => {
                  // agregar al final un nuevo landing
                  const newList = [...listLanding]
                  newList.push({ name: newLanding, id: newList.length, title: '', listIdSections: [] })
                  setListLanding(newList)
                },
                deleteLanding: indexDelete => {
                  // eliminar un landing del array, segun el index
                  const newLandingList = [...listLanding]
                  const filtered = newLandingList.filter(
                    (value, index, arr) => {
                      return index !== indexDelete
                    }
                  )
                  // reordenar las ids/index
                  filtered.forEach((value, index) => {
                    filtered[index].id = index
                  })
                  // si el Landing a eliminar es el que ya esta seleccionado en la tabla
                  // set null la IdLandingSelect
                  // eliminar las taskIds del landingComposer
                  console.log(' indexDelete ', indexDelete)
                  console.log(' idLandingSelected ', idLandingSelected)
                  if(indexDelete === idLandingSelected) {
                    const newDragListObject = {...dragListObject}
                    newDragListObject.columns['column-landing-composer'].taskIds = []
                    setDragListObject(newDragListObject)
                    setIdLandingSelected(null)
                  } 
                  if(indexDelete < idLandingSelected) {
                    setIdLandingSelected(idLandingSelected - 1)
                  }
                  const newListFinalLandingCreator = {...listFinalLandingCreator}
                  newListFinalLandingCreator[indexDelete] = undefined
                  setListFinalLandingCreator(newListFinalLandingCreator)
                  setListLanding(filtered)
                },
                editLanding: (index, newValue) => {
                  // desde la modal de agregar/editar
                  // editar el name de un landing
                  let landingEdit = listLanding[index]
                  if (landingEdit) {
                    landingEdit = {
                      ...landingEdit,
                      name: newValue
                    }
                    const newListLanding = [...listLanding]
                    newListLanding[index] = landingEdit
                    setListLanding(newListLanding)
                  }
                },
                manageLandingContent: (newValue) => {
                  setListFinalLandingCreator(newValue)
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
                        <Col xs={12}>
                          <Sections />
                        </Col>
                      </Row>
                    </div>
                  </Col>
                  <Col xs={12} md={7} lg={7} className='scrollerLandingCreator' style={{ maxHeight: '1500px', overflowY: 'auto', overflowX: 'hidden' }}>
                    <div className='d-flex flex-row mt-3 mb-3'>
                      <h3 className='text-left mb-0'>Landing Composer</h3>
                    </div>
                    <div
                      className='w-100'
                    >
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
