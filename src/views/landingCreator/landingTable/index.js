import React, { useState, useContext } from 'react'
import {
  Button,
  Table,
  UncontrolledTooltip
} from 'reactstrap'
import ModalLanding from './modalLanding'
import ModalCode from './modalCode'
import Lottie from 'react-lottie'
import EmptyBox from '../../../assets/lottie/emptyBox.json'
import { LandingContext } from '../index'
import {objectToArray} from '../utils'
import 'animate.css'
import './styles.css'



const LandingTable = () => {
  const {
    listLanding,
    selectLanding,
    deleteLanding,
    idLandingSelected
  } = useContext(LandingContext)
  const [openModal, setOpenModal] = useState({
    open: false,
    type: 'add'
  })
  const [openModalCode, setOpenModalCode] = useState(false)
  const [landingEditing, setLandingEditing] = useState(null)

  const closeModal = () => {
    setLandingEditing(null)
    setOpenModal({ open: false, type: 'add' })
  }

  const closeModalCode = () => {
    setOpenModalCode(false)
  }

  const mapLandings = objectToArray(listLanding)
  
  return (
    <div className='w-100'>
      {openModal.open && (
        <ModalLanding
          closeModal={closeModal}
          isNewLanding={openModal.type === 'add'}
          landingEditing={landingEditing}
        />
      )}
      {
        openModalCode && (
          <ModalCode
          closeModal={closeModalCode}
        />
        )
      }
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
          <Button
            className='btn-round animation-on-hover'
            color='info'
            size='sm'
            onClick={() => setOpenModalCode(true)}
          >
            Code
          </Button>
        </h3>
      </div>

      <br />

      <div style={{ minHeight: '300px' }} className='d-flex align-items-center'>
      {mapLandings.length > 0 ? (
        <Table responsive className='fixed_header_landing' style={{ minHeight: '300px' }}>
          <thead>
            <tr>
              <th className='text-center'>#</th>
              <th>Name</th>
              <th>Sections</th>
              <th className='text-right'>Actions</th>
            </tr>
          </thead>
          <tbody>
            <RenderBodyTable data={mapLandings} // el array de landings
            idLandingSelected={idLandingSelected}
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

const RenderBodyTable = ({ data, idLandingSelected, erase, setLandingEditing, setSelectLanding, setOpenModal }) => {
  return data.map((value, index) => {
    return (
      <tr className={' animated fadeInDown ' + (value.id === idLandingSelected ? 'bg-default' : '')} key={index}>
        <td className='text-center'>{index + 1}</td>
        <td className='text-white'>{value.title}</td>
        <td className='text-white'>{value.composer.length}</td>
        <td className='text-right'>
          <Button className='btn-icon btn-simple animation-on-hover' color='info' size='sm' id={'tdbtnselect' + index} 
            onClick = {() => {
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
            setLandingEditing(value)
            setOpenModal({ open: true, type: 'edit' })
           }}>
            <i className='fa fa-edit'></i>
          </Button>
          <UncontrolledTooltip placement='top' target={'tdbtnedit'+index}>
            Edit Landing Name
          </UncontrolledTooltip>
          {` `}
          <Button className='btn-icon btn-simple animation-on-hover' id={'tdbtnerase'+index} color='danger' size='sm' onClick={ () => {
             if(value.id === idLandingSelected) {
              setSelectLanding(null)
            }
            erase(value.id)
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
