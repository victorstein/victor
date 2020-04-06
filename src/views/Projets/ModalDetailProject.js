import React, { useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Modal from './../../components/ModalDetailProject'
import AlertGlobal from '../../components/AlertGlobal'

const projectByid = gql`
  query projectByid( $id : String!){
  projectById(id : $id){
    createdAt
    updatedAt
    lastUpdatedBy{
      id
      fullName
    }
    id
    siteName
    domain
    accountUsername
    accountPassword
    databaseName
    databaseUser
    databasePassword
    wordpressLanguage
    wordpressPassword
    wordpressUser
    developerName
  }
}
`

const ModalDetailProject = (props) => {
  const myInputAlert = React.useRef()
  const { loading, error, data } = useQuery(projectByid, { variables: { id: props.idProject } })

  const ButtonClouse = () => {
    props.setIdProject(null)
    props.setmodalDetailProject(false)
  }

  useEffect(() => {
    if (props.modalDetailProject) {
      if (error) {
        let messageError = ''
        if (Array.isArray(error.graphQLErrors)) {
          messageError = error.graphQLErrors[0].message
        } else {
          messageError = error.graphQLErrors
        }
        console.log('messageError', error.graphQLErrors)
        const options = {
          message: (Array.isArray(messageError)) ? messageError[0] : messageError,
          options: {
            icon: 'icon-alert-circle-exc',
            type: 'danger',
            autoDismiss: 4,
            place: 'tr'
          }
        }
        myInputAlert.current.showAlert(options)
      }
    }
  }, [error, props.modalDetailProject])

  const swoAlertGlobal = (options) => {
    myInputAlert.current.showAlert(options)
  }

  return (
    <div>
      <AlertGlobal ref={myInputAlert} />
      {
        (props.modalDetailProject) &&
          <Modal
            swoAlertGlobal={swoAlertGlobal}
            data={data}
            error={error}
            loading={loading}
            ButtonClouse={ButtonClouse}
            modalVisible={props.modalDetailProject}
          />
      }
    </div>
  )
}

export default ModalDetailProject
