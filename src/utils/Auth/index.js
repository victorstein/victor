import useToken from './useToken'
import useRefreshToken from './useRefreshToken'

export default (props) => {
  const [tokenLocal, setToken] = useToken()
  const [refreshTokenLocal, setRefreshToken] = useRefreshToken()

  const login = (token, refreshToken, navigation) => {
    localStorage.clear()
    setToken(token)
    setRefreshToken(refreshToken)
    navigation.push('/admin/dashboard')
  }
  return { login }
}
