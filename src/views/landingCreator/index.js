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
  const [isDraggingActive, setIsDraggingActive] = useState(false)
  const [idLandingSelected, setIdLandingSelected] = useState(null)

  useEffect(() => {
    setIdSite(props.id)
  }, [])
  useEffect(() => {
    setIdSite(props.id)
  }, [props.id])

  const dragEnd = (result) => {
    const { destination, source, draggableId } = result
        console.log('draggableId ',draggableId)
        console.log('destination ',destination)
        console.log('source ',source)

        if(!destination) {
            return;
        }

        if(destination.droppableId === source.droppableId
            && destination.index === source.index
            ) {
            return;
        }

        const start = dragListObject.columns[source.droppableId]
        const finish = dragListObject.columns[destination.droppableId]

        if(start === finish) {
            const data2 = {...dragListObject}
            const column = data2.columns[source.droppableId]
            const newTaskIds = Array.from(column.taskIds)
            newTaskIds.splice(source.index,1)
            newTaskIds.splice(destination.index, 0, draggableId)
    
            column.taskIds = newTaskIds
            setDragListObject({...dragListObject, columns: { ...dragListObject.columns, [source.droppableId]: column } })
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
        }
        setIsDraggingActive(false)
  }

  const onDragStart = () => {
    setIsDraggingActive(true)
  }

  return (
    <div className="content">
          <Row>
            <Col xs="12">
            <DragDropContext onDragEnd={dragEnd} onDragStart={onDragStart} >
            <LandingContext.Provider
              value={{
                dragListObject: dragListObject, // Objeto con la configuracion necesaria para el Drag an Drop de las columnas Sectios y Landing Selected
                setDragListObject: (newValue) => { setDragListObject(newValue) }, // nuevo objecto actualizado desde SectionsSelector, se actualiza por peticiones de la query "component" y sus filtros
                isDraggingActive: isDraggingActive, // el estado del DragDropContext
                id: idSite, // la id del proyecto
                listLanding: listLanding, // el array de landings
                idLandingSelected: idLandingSelected, // la id del landing seleccionado
                selectLanding: id => {
                  // guardar el id de un landing a seleccionar
                  setIdLandingSelected(id)
                },
                addNewLanding: newLanding => {
                  // agregar al final un nuevo landing
                  const newList = [...listLanding]
                  newList.push({ name: newLanding, id: newList.length + 1 })
                  setListLanding(newList)
                },
                deleteLanding: indexDelete => {
                  // eliminar un landing del array, segun el index
                  const newLandingList = [...listLanding]
                  const filtered = newLandingList.filter((value, index, arr) => {
                    return index !== indexDelete
                  })
                  // reordenar las ids/index
                  filtered.forEach((value, index) => {
                    filtered[index].id = index
                  })
                  setListLanding(filtered)
                },
                editLanding: (index, newValue) => {
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
                }
              }}
            >
              <div className='w-100 px-3'>
                <Row>
                  <Col
                    xs={12}
                    md={5}
                    lg={4}
                    className=''
                    //style={{ minHeight: '100vh' }}
                  >
                    <div className='p-3'>
                      <Row>
                        <Col xs={12} className=''>
                          <LandingTable />
                        </Col>
                        <Col
                          xs={12}
                          className=''
                          //style={{ minHeight: '65vh' }}
                        >
                          <Sections />
                        </Col>
                      </Row>
                    </div>
                  </Col>
                  <Col
                    xs={12}
                    md={7}
                    lg={8}
                    className=''
                    //style={{ minHeight: '100vh' }}
                  >
                  <div className='d-flex flex-row'>
                  <h3 className='text-left mb-0'>Landing Composer</h3>
                  </div>
                    <div className={((isDraggingActive) ? ' landingComposerContainer ' : '')}>
                      <LandingComposer />
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
