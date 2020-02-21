import React, { useState } from 'react'
import TableUser from './TableUser'
import ModalUser from './ModalCreateUser'
import './stylesUser.scss'
import AlertGlobal from '../../../components/AlertGlobal'

const CreateUserIndex = () => {
  const [openModal, setOpenModal] = useState(false)
  const [errorAlert, setErrorAlert] = useState({
    visible: false,
    error: null
  })

  console.log(errorAlert)
  return (
    <div className='content'>
      {
        openModal && <ModalUser errorAlert={errorAlert} setErrorAlert={setErrorAlert} openModal={openModal} setOpenModal={setOpenModal} />
      }
      {
        (errorAlert.visible) &&
          <AlertGlobal
            type='danger'
            icon='icon-alert-circle-exc'
            message={errorAlert.error[0].message}
          />

      }
      <h1 className='mb-0'>Create User</h1>
      <div className='container p-2 m-2'>
        <TableUser setOpenModal={setOpenModal} />
      </div>
    </div>
  )
}

export default CreateUserIndex
