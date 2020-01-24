import React, { useState, useEffect, useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { meGQL as ME } from '../../utils/Graphql/Queries'
import LoadingScreen from '../../components/LoadingScreen'
import AdminContent from './Admin.jsx'
import logout from '../../utils/Auth/logout'
import { SET_USER } from '../../store/actions'
import { GlobalContext } from '../../index'
import routes from '../../routes'

const DEFAULT_ROUTE_USER = '/admin/dashboard'
const DEFAULT_ROUTE_ADMIN = '/admin/dashboard'


const AdminLayout = props => {
  const { state, dispatch } = useContext(GlobalContext)
  const [verifyLogin, setVerifyLogin] = useState(false)
  const { loading, error, data } = useQuery(
    ME('fullName verified firstName permissions { name } role { name }'),
    { fetchPolicy: 'no-cache' }
  )

  useEffect(() => {
    if (data && !loading) {
      if (data.me) {
        setVerifyLogin(true)
        dispatch({ type: SET_USER, payload: { ...data.me } })
      } else {
        logout(props.history)
      }
    } else if (error) {
      logout(props.history)
    }
  }, [data, error])

  useEffect(() => {
    if (!state.user && verifyLogin) {
      logout(props.history)
    } else if (props.location.pathname && verifyLogin) {
      const userRol = state.user.role.name
      let isValidRoute = false
      routes.forEach((value, index) => {
        if (
          props.location.pathname === value.layout + value.path &&
          (value.role.indexOf(userRol) > -1 || value.role.length === 0)
        ) {
          isValidRoute = true
        }
      })
      if (!isValidRoute) {
        switch (userRol) {
          case 'User':
            props.history(DEFAULT_ROUTE_USER)
            break
          case 'Admin':
            props.history(DEFAULT_ROUTE_ADMIN)
            break
          default:
            logout(props.history)
        }
        props.history()
      }
    }
  }, [props.location])

  return verifyLogin ? <AdminContent routerProps={props} /> : <LoadingScreen />
}

export default AdminLayout