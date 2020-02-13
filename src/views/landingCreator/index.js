import React, { useEffect, createContext, useState } from 'react'
import { Row, Col } from 'reactstrap'
import { DragDropContext } from 'react-beautiful-dnd'
import LandingTable from './landingTable'
import Sections from './sectionsSelector'
import PageCreator from './pageCreator'
import initialDragObject from './initalDragObject'
import 'animate.css'
import 'react-block-ui/style.css'

export const LandingContext = createContext()

const LandingCreator = props => {
  const [idSite, setIdSite] = useState(null)
  const [dragListObject, setDragListObject] = useState(initialDragObject)
  const [listLanding, setListLanding] = useState([])
  //const [indexLandingSelected, setIndexLandingSelected] = useState(null)
  const [idLandingSelected, setIdLandingSelected] = useState(null)

  useEffect(() => {
    setIdSite(props.id)
  }, [])
  useEffect(() => {
    setIdSite(props.id)
  }, [props.id])

  const dragEnd = (result) => {

  }

  return (
    <div className="content">
          <Row>
            <Col xs="12">
            <DragDropContext onDragEnd={dragEnd}>
            <LandingContext.Provider
              value={{
                dragListObject: dragListObject, // Objeto con la configuracion necesaria para el Drag an Drop de las columnas Sectios y Landing Selected
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
                  // reordenar las ids
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
                    <div className='p-3'>
                      <PageCreator />
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
