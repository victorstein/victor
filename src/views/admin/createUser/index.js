import React, { useState } from 'react'
import TableUser from './TableUser'
import ModalUser from './ModalUser'
import './stylesUser.scss'

const CreateUserIndex = () => {
  const [openModal, setOpenModal] = useState(false)
  return (
    <div className='content'>
      {
        openModal && <ModalUser openModal={openModal} setOpenModal={setOpenModal} />
      }
      <h1 className='mb-0'>Create User</h1>
      <div className='container p-2 m-2'>
        <TableUser setOpenModal={setOpenModal} />
      </div>
    </div>
  )
}

export default CreateUserIndex
