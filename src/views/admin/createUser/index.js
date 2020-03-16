import React, { useState, useRef } from 'react'
import TableUser from './TableUser'
import ModalUser from './ModalCreateUser'
import './stylesUser.scss'
import AlertGlobal from '../../../components/AlertGlobal'

const CreateUserIndex = (props) => {
  const [openModal, setOpenModal] = useState(false)
  const myInputAlert = useRef()

  const actionsAlertGloval = (options) => {
    myInputAlert.current.showAlert(options)
  }

  // console.log(errorAlert)
  return (
    <div className='content'>
      <AlertGlobal ref={myInputAlert} />
      {
        openModal && <ModalUser actionsAlertGloval={actionsAlertGloval} openModal={openModal} setOpenModal={setOpenModal} />
      }

      <h1 className='mb-0'>Create User</h1>
      <div className='container p-2 m-2'>
        <TableUser actionsAlertGloval={actionsAlertGloval} setOpenModal={setOpenModal} />
      </div>
    </div>
  )
}

export default CreateUserIndex
