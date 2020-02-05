import React, { useContext } from 'react'
import useToken from './useToken'
import useRefreshToken from './useRefreshToken'

import { SET_INITIAL_STATE } from '../../store/actions'
import { GlobalContext }  from '../../index'

export default () => {
  const { dispatch } = useContext(GlobalContext)
  const [tokenLocal, setToken] = useToken()
  const [refreshTokenLocal, setRefreshToken] = useRefreshToken()

  const login = (token, refreshToken, navigation) => {
    localStorage.clear()
    if(dispatch) {
      dispatch({ type: SET_INITIAL_STATE })
    }
    setToken(token)
    setRefreshToken(refreshToken)
    navigation.push('/admin/dashboard')
  }
  return { login }
}
