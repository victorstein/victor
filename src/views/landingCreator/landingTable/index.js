import React, { useState, useContext } from 'react'
import {
  Button,
  Table,
  UncontrolledTooltip
} from 'reactstrap'
import ModalLanding from './modalLanding'
import Lottie from 'react-lottie'
import EmptyBox from '../../../assets/lottie/emptyBox.json'
import { LandingContext } from '../index'
import 'animate.css'
import './styles.css'

const LandingTable = () => {
  const {
    listLanding,
    selectLanding,
    deleteLanding
  } = useContext(LandingContext)
  const [openModal, setOpenModal] = useState({
    open: false,
    type: 'add'
  })
  const [landingEditing, setLandingEditing] = useState(null)
  const [indexSelected, setIndexSelected] = useState(null)

  //const empty = listLanding.length === 0 || idLandingSelected === null || idLandingSelected === undefined

  const closeModal = () => {
    setLandingEditing(null)
    setOpenModal({ open: false, type: 'add' })
  }

  return (
    <div className='w-100'>
      {openModal.open && (
        <ModalLanding
          closeModal={closeModal}
          isNewLanding={openModal.type === 'add'}
          landingEditing={landingEditing}
        />
      )}
      <div className='d-flex flex-row'>
        <h3 className='text-left mb-0'>Landings</h3>
        <h3 className='ml-auto mb-0'>
          <Button
            className='btn-round animation-on-hover'
            color='info'
            size='sm'
            onClick={() => setOpenModal({ open: true, type: 'add' })}
          >
            <i className='tim-icons icon-simple-add' /> Add
          </Button>
        </h3>
      </div>

      <br />

      <div style={{ minHeight: '300px' }} className='d-flex align-items-center'>
      {listLanding.length > 0 ? (
        <Table responsive className='fixed_header_landing' style={{ minHeight: '300px' }}>
          <thead>
            <tr>
              <th className='text-center landingIndex'>#</th>
              <th>Name</th>
              <th className='text-right'>Actions</th>
            </tr>
          </thead>
          <tbody>
            <RenderBodyTable data={listLanding} // el array de landings
            indexSelected={indexSelected} // el index de la tabla seleccionado
            setIndexSelected={setIndexSelected} // seleccionar un index de la tabla
            erase={deleteLanding} // eliminar un landing , (context function)
            setSelectLanding={selectLanding} // seleccionar un landing, guardar el id, (context function)
            setLandingEditing={setLandingEditing} // editar un landing, (context function)
            setOpenModal={setOpenModal} // abrir la modal, se usara en el boton de editar
            />
          </tbody>
        </Table>
      ) : (
        <EmptyTable />
      )}
      </div>
      
    </div>
  )
}

const RenderBodyTable = ({ data, indexSelected, setIndexSelected, erase, setLandingEditing, setSelectLanding, setOpenModal }) => {
  return data.map((value, index) => {
    return (
      <tr className={' animated fadeInDown ' + (index === indexSelected ? 'bg-default' : '')} key={index}>
        <td className='text-center landingIndex'>{index + 1}</td>
        <td className='text-white'>{value.name}</td>
        <td className='text-right'>
          <Button className='btn-icon btn-simple animation-on-hover' color='info' size='sm' id={'tdbtnselect' + index} 
            onClick = { () => {
              setIndexSelected(index) // el index del row seleccionado
              setSelectLanding(value.id) // la id del landing seleccionado
            }}
          >
            <i className='fa fa-user'></i>
          </Button>
          <UncontrolledTooltip placement='top' target={'tdbtnselect'+index}>
            Select Landing
          </UncontrolledTooltip>
          {` `}
          <Button className='btn-icon btn-simple animation-on-hover' id={'tdbtnedit'+index} color='success' size='sm' onClick={ ()=> {
            setLandingEditing({
              index: index,
              value: value
            })
            setOpenModal({ open: true, type: 'edit' }) 
           }}>
            <i className='fa fa-edit'></i>
          </Button>
          <UncontrolledTooltip placement='top' target={'tdbtnedit'+index}>
            Edit Landing Name
          </UncontrolledTooltip>
          {` `}
          <Button className='btn-icon btn-simple animation-on-hover' id={'tdbtnerase'+index} color='danger' size='sm' onClick={ () => {
            if(index === indexSelected) {
              setIndexSelected(null)
              setSelectLanding(null)
            }
            erase(index)
          }}>
            <i className='fa fa-times' />
          </Button>
          <UncontrolledTooltip placement='top' target={'tdbtnerase' + index}>
            <p className='text-danger'> Delete Landing</p>
          </UncontrolledTooltip>
        </td>
      </tr>
    )
  })
}

const EmptyTable = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: EmptyBox,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }
  return (
      <Lottie
        isClickToPauseDisabled
        options={defaultOptions}
        height='70%'
        width='70%'
      />
  )
}

export default LandingTable
