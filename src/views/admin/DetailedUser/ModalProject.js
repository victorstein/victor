import React, { useEffect } from 'react'
import UseContex from './ContexStore'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import ModalDetailProject from '../../../components/ModalDetailProject'

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

const ModalProject = (props) => {
  const STORE = React.useContext(UseContex.contextStore)

  const { loading, error, data } = useQuery(projectByid, { variables: { id: STORE.state.idProject } })

  const ButtonClouse = () => {
    STORE.setState({
      ...STORE.state,
      idProject: '',
      modalVisible: false
    })
  }

  useEffect(() => {
    if (STORE.state.modalVisible) {
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
        STORE.actions.alertSwow(options)
      }
    }
  }, [error, STORE.state.modalVisible])

  const swoAlertGlobal = (options) => {
    STORE.actions.alertSwow(options)
  }

  return (
    <div>
      {
        (STORE.state.modalVisible) &&
          <ModalDetailProject
            swoAlertGlobal={swoAlertGlobal}
            data={data}
            error={error}
            loading={loading}
            ButtonClouse={ButtonClouse}
            modalVisible={STORE.state.modalVisible}
          />
      }
    </div>
  )
}

export default ModalProject
